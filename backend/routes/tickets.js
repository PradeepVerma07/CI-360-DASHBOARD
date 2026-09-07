const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const SupportTicket = require('../models/SupportTicket');
const Job = require('../models/Job');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Helper: Check if user is a primary manager (superadmin, Mansi, or Urna)
const isManager = (user) => {
  if (!user) return false;
  if (user.role === 'superadmin') return true;
  return /mansi/i.test(user.name) || /urna/i.test(user.name);
};

/* ── CREATE a support ticket for a job ── */
router.post('/', async (req, res) => {
  try {
    const { jobId, subject, message, priority, attachments } = req.body;
    if (!jobId || !subject || !message)
      return res.status(400).json({ error: 'jobId, subject, and message are required' });

    const ticket = await SupportTicket.create({
      jobId,
      userId:   req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      subject:  subject.trim(),
      message:  message.trim(),
      priority: priority || 'Medium',
      attachments: (attachments || []).map(att => ({
        name: att.name,
        url: att.url,
        size: Number(att.size) || 0,
        type: att.type || '',
        uploadedAt: att.uploadedAt || new Date()
      }))
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── GET tickets for a specific job (all roles) ── */
router.get('/job/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const filter = { jobId };

    // If manager, return all tickets for this job
    if (isManager(req.user)) {
      const tickets = await SupportTicket.find(filter).sort({ createdAt: -1 });
      return res.json(tickets);
    }

    // Check job assignments & client ownership
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const isAssignedEmp = req.user.personnelId && job.assignments.some(a => String(a.personId) === String(req.user.personnelId));
    const isOwnerClient = req.user.clientId && String(job.clientId) === String(req.user.clientId);

    if (isAssignedEmp || isOwnerClient) {
      // Show all tickets for this assigned job
      const tickets = await SupportTicket.find(filter).sort({ createdAt: -1 });
      return res.json(tickets);
    }

    // Fallback: only user's own tickets
    filter.userId = req.user._id;
    const tickets = await SupportTicket.find(filter).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── GET all tickets ── */
router.get('/', async (req, res) => {
  try {
    if (isManager(req.user)) {
      // Managers (Superadmin, Mansi, Urna) see all tickets by default
      const tickets = await SupportTicket.find()
        .populate('jobId', 'title')
        .sort({ createdAt: -1 });
      return res.json(tickets);
    }

    if (req.user.role === 'employee' && req.user.personnelId) {
      // Find all jobs where this employee is assigned
      const myJobs = await Job.find({ 'assignments.personId': req.user.personnelId }).select('_id');
      const jobIds = myJobs.map(j => j._id);
      const tickets = await SupportTicket.find({
        $or: [{ jobId: { $in: jobIds } }, { userId: req.user._id }]
      })
        .populate('jobId', 'title')
        .sort({ createdAt: -1 });
      return res.json(tickets);
    }

    if (req.user.role === 'client' && req.user.clientId) {
      const myJobs = await Job.find({ clientId: req.user.clientId }).select('_id');
      const jobIds = myJobs.map(j => j._id);
      const tickets = await SupportTicket.find({
        $or: [{ jobId: { $in: jobIds } }, { userId: req.user._id }]
      })
        .populate('jobId', 'title')
        .sort({ createdAt: -1 });
      return res.json(tickets);
    }

    const tickets = await SupportTicket.find({ userId: req.user._id })
      .populate('jobId', 'title')
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── REPLY / update ticket status ── */
router.put('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    // Check permission to respond
    const job = await Job.findById(ticket.jobId);
    const isAssigned = job && req.user.personnelId && job.assignments.some(a => String(a.personId) === String(req.user.personnelId));

    if (!isManager(req.user) && !isAssigned) {
      return res.status(403).json({ error: 'Only admins and assigned personnel (Mansi/Urna) can reply or change status' });
    }

    const { status, adminReply, adminAttachments, attachments } = req.body;
    const update = {};
    if (status) update.status = status;
    if (adminReply !== undefined) { update.adminReply = adminReply; update.repliedAt = new Date(); }
    if (adminAttachments !== undefined) update.adminAttachments = adminAttachments;
    if (attachments !== undefined) update.attachments = attachments;

    const updated = await SupportTicket.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── DELETE a ticket ── */
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    if (!isManager(req.user) && String(ticket.userId) !== String(req.user._id))
      return res.status(403).json({ error: 'Not allowed' });
    await ticket.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

