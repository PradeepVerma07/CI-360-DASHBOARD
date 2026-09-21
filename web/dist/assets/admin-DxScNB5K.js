import"./api-BegXHxB0.js";let W=null,h={personnel:[],clients:[],services:[],salaryGrades:[],salaryAssignments:[]},R=null,S={tab:"dashboard",period:"month",jobsFilter:"all",ticketsFilter:"all"},g={title:"",clientId:"",serviceIds:[],date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",assignments:[{personId:"",percent:100,hours:""},{personId:"",percent:0,hours:""}]};async function me(){initTheme(),W=requireAuth("superadmin"),W&&(await z(),V())}async function z(){const[t,s,e]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);h.personnel=t,h.clients=s,h.services=e}function F(){const t=h.personnel.find(i=>/mansi/i.test(i.name)),s=h.personnel.find(i=>/urna/i.test(i.name)),e=[];return t&&e.push({personId:t._id,percent:"",hours:""}),s&&e.push({personId:s._id,percent:"",hours:""}),e.length===0&&e.push({personId:"",percent:"",hours:""}),e}function re(t){const s=h.personnel.find(e=>e._id===t);return s?s.name:"—"}function J(t){const s=h.clients.find(e=>e._id===t);return s?s.name:"—"}const G=[{key:"dashboard",label:"Dashboard",icon:"📊"},{key:"dailytasks",label:"Daily Tasks",icon:"✅"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs",icon:"📁"},{key:"tickets",label:"Support Tickets",icon:"🎫"},{key:"byclient",label:"By Client",icon:"💼"},{key:"byperson",label:"By Person",icon:"👥"},{key:"accounts",label:"Accounts",icon:"🏢"},{key:"targets",label:"Targets",icon:"🎯"},{key:"salaries",label:"Salaries",icon:"💰"},{key:"users",label:"Users",icon:"👤"},{key:"manage",label:"Manage",icon:"⚙️"}];function V(){const t=document.getElementById("app"),s=G.find(e=>e.key===S.tab)||G[0];t.innerHTML=renderAppShell({user:W,currentRole:"superadmin",activeTab:S.tab,tabs:G,title:s.label,subtitle:"Productivity & Revenue Intelligence"}),bindAppShellEvents(e=>{S.tab=e,V()}),x()}window.ci360NavTab=t=>{S.tab=t,V()};async function x(){const t=document.getElementById("content");if(t){t.innerHTML=renderSkeletonCards(4);try{S.tab==="dashboard"?await ue(t):S.tab==="dailytasks"?await pe(t):S.tab==="logjob"?_(t):S.tab==="jobs"?await fe(t):S.tab==="tickets"?await U(t):S.tab==="byclient"?await xe(t):S.tab==="byperson"?await de(t):S.tab==="accounts"?await ke(t):S.tab==="targets"?await $e(t):S.tab==="salaries"?await Se(t):S.tab==="settings"||S.tab==="manage"?Te(t):S.tab==="users"&&await ce(t)}catch(s){t.innerHTML=`<div class="empty"><h3>Something went wrong</h3>${escapeHtml(s.message)}</div>`}}}function Q(){return renderPeriodPicker(S.period)}function Y(){document.querySelectorAll("[data-period]").forEach(t=>{t.onclick=()=>{S.period=t.dataset.period,x()}})}async function ue(t){R=await apiGet("/dashboard/admin?period="+S.period);const s=R.overview;t.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;flex-wrap:wrap;gap:12px;">
      <div>
        <h2 style="font-size:22px;font-weight:700;color:var(--navy-900);margin:0 0 2px 0;">Dashboard Overview</h2>
        <p style="font-size:13px;color:var(--text-3);margin:0;">Real-time workload, capacity, and deliverable performance</p>
      </div>
      ${Q()}
    </div>

    <section class="block">
      <div class="grid grid-4">
        <div class="card kpi">
          <div class="label">Work Value Tracked <span>💼</span></div>
          <div class="value">${fmtINR(s.totalValue)}</div>
          <div class="sub">across ${s.activeClients} of ${s.totalClients} active clients</div>
        </div>
        <div class="card kpi">
          <div class="label">Jobs Logged <span>📋</span></div>
          <div class="value">${s.totalJobs}</div>
          <div class="sub">${fmtHours(s.totalHours)} of effort tracked</div>
        </div>
        <div class="card kpi">
          <div class="label">Overworked <span>⚠️</span></div>
          <div class="value" style="color:var(--red)">${s.overworked}</div>
          <div class="sub">team members above 115% capacity</div>
        </div>
        <div class="card kpi">
          <div class="label">Underused Capacity <span>📉</span></div>
          <div class="value" style="color:var(--blue)">${s.underused}</div>
          <div class="sub">team members below 55% capacity</div>
        </div>
      </div>
    </section>

    <section class="block">
      <h2>Roadmap Signals <span class="eyebrow">Auto-generated</span></h2>
      ${R.insights.length?R.insights.map(e=>`<div class="insight ${e.type}">${escapeHtml(e.text)}</div>`).join(""):'<div class="empty">Log a few jobs to start seeing workload signals here.</div>'}
    </section>

    <div class="grid grid-2">
      <section class="block">
        <h2>Work Value by Client</h2>
        <div class="card">${X(R.clients.slice(0,8).map(e=>[e.name,e.value]))}</div>
      </section>
      <section class="block">
        <h2>Work Value by Service</h2>
        <div class="card">${X(R.services.slice(0,8).map(e=>[e.name,e.value]),!0)}</div>
      </section>
    </div>

    <section class="block">
      <h2>Team Load at a Glance</h2>
      <div class="card">${R.personnel.filter(e=>e.status!=="inactive").map(ve).join("")||'<div class="empty">No personnel yet.</div>'}</div>
    </section>
  `,Y()}function X(t,s){if(!t.length)return'<div class="empty">No data yet.</div>';const e=Math.max(1,...t.map(i=>i[1]));return t.map(([i,n])=>`
    <div class="bar-row">
      <div>${escapeHtml(i)}</div>
      <div class="bar-track"><div class="bar-fill ${s?"gold":""}" style="width:${(n/e*100).toFixed(1)}%"></div></div>
      <div class="num">${fmtINR(n)}</div>
    </div>`).join("")}function ve(t){const s=Math.min(t.utilization,160);return`
    <div style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px;">
        <span><strong>${escapeHtml(t.name)}</strong> <span class="muted">${escapeHtml(t.duties||"")}</span></span>
        <span><span class="badge ${t.cls}">${t.label}</span> &nbsp; ${t.utilization.toFixed(0)}%</span>
      </div>
      <div class="gauge-track">
        <div class="gauge-zone" style="left:0;width:25%;background:var(--blue-bg);"></div>
        <div class="gauge-zone" style="left:25%;width:30%;background:var(--green-bg);"></div>
        <div class="gauge-zone" style="left:55%;width:35%;background:var(--amber-bg);"></div>
        <div class="gauge-zone" style="left:90%;width:10%;background:var(--red-bg);"></div>
        <div class="gauge-fill" style="left:${Math.min(s/1.6,99)}%;"></div>
      </div>
    </div>`}function _(t){(!g.assignments||g.assignments.every(e=>!e.personId))&&(g.assignments=F());const s=g.assignments.reduce((e,i)=>e+(Number(i.percent)||0),0);t.innerHTML=`
    <section class="block">
      <div style="margin-bottom:20px;">
        <h2 style="font-size:20px;font-weight:800;color:var(--text-1);margin-bottom:4px;border:none;padding:0;">Log New Job & Work Deliverable</h2>
        <p style="font-size:13px;color:var(--text-3);margin:0;">Record client deliverables, services provided, financial value, and team hour attributions.</p>
      </div>

      <div class="card log-job-card">
        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">1. Client & Timeline</h3>
          <div class="field" style="margin-bottom:16px;">
            <label>CLIENT *</label>
            <div class="select-with-btn">
              <select id="jClient">
                <option value="">Select client…</option>
                ${h.clients.map(e=>`<option value="${e._id}" ${e._id===g.clientId?"selected":""}>${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewClientBtn">+ New Client</button>
            </div>
          </div>

          <div class="log-job-row">
            <div class="field" style="margin-bottom:0;">
              <label>START DATE *</label>
              <input type="date" id="jDate" value="${g.date||new Date().toISOString().slice(0,10)}">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label>COMPLETION DATE (OPTIONAL)</label>
              <input type="date" id="jCompletion" value="${g.completion||""}" placeholder="dd.mm.yyyy">
            </div>
          </div>
        </div>

        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">2. Deliverable & Financials</h3>
          <div class="field" style="margin-bottom:16px;">
            <label>SERVICE(S) DELIVERED *</label>
            <div class="select-with-btn">
              <select id="jService">
                <option value="">Select service to add…</option>
                ${h.services.map(e=>`<option value="${e._id}">${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewServiceBtn">+ New Service</button>
            </div>
            ${g.serviceIds.length?`
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${g.serviceIds.map(e=>{const i=h.services.find(n=>n._id===e);return i?`
                    <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:12px;border-radius:20px;">
                      ${escapeHtml(i.name)}
                      <span class="remove-service-tag" data-id="${i._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
                    </span>
                  `:""}).join("")}
              </div>
            `:""}
          </div>

          <div class="field" style="margin-bottom:16px;">
            <label>JOB VALUE (₹ ATTRIBUTABLE VALUE)</label>
            <input type="number" id="jValue" value="${g.value||""}" placeholder="e.g. 25000" min="0">
          </div>

          <div class="field" style="margin-bottom:0;">
            <label>DELIVERABLE DESCRIPTION & SPECIFICS</label>
            <textarea id="jDesc" placeholder="Describe the scope of work, completed artifacts, or client notes..." style="height:90px;resize:vertical;">${escapeHtml(g.desc||"")}</textarea>
          </div>
        </div>

        <div style="margin-bottom:24px;">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">3. Team Work Allocation & Hours</h3>
          <div class="people-assigned-box">
            <div class="people-assigned-headers">
              <div>TEAM MEMBER</div>
              <div>% OF WORK</div>
              <div>HOURS SPENT</div>
              <div></div>
            </div>
            <div id="assignRows">
              ${g.assignments.map((e,i)=>ge(e,i)).join("")}
            </div>
            <button class="btn ghost small" id="addAssignRow" type="button" style="margin-top:10px;">+ Add Team Member</button>
            <div style="margin-top:14px;">
              <div class="assign-total ${s!==100?"warn":""}">
                <span>${s===100?"✓":"⚠️"}</span>
                <span>${s}% of work allocated ${s!==100?"— should total 100%":"(100% Complete)"}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">4. Briefs &amp; File Attachments</h3>
          ${renderAttachmentUploader({id:"jAttachments",label:"Briefs & Reference Assets",subtitle:"Upload briefs, design mockups, agreements, logos or source files"})}
        </div>

        <div class="form-actions">
          <button class="btn ghost" id="clearJobBtn" type="button">Reset Draft</button>
          <button class="btn gold" id="saveJobBtn" type="button" style="padding:10px 28px;font-size:14px;">Save Job & Dispatch Notifications</button>
        </div>
      </div>
    </section>
  `,be()}function ge(t,s){return`
    <div class="person-assign-row" data-idx="${s}">
      <div class="field">
        <select class="a-person">
          <option value="">Select…</option>
          ${h.personnel.map(e=>`<option value="${e._id}" ${e._id===t.personId?"selected":""}>${escapeHtml(e.name)}${e.duties?` (${escapeHtml(e.duties)})`:""}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <input type="number" class="a-percent" value="${t.percent!=null?t.percent:""}" placeholder="100" min="0" max="100">
      </div>
      <div class="field">
        <input type="number" class="a-hours" value="${t.hours||""}" placeholder="e.g. 3.5" min="0" step="0.5">
      </div>
      <div style="display:flex;justify-content:center;">
        <button class="btn-remove-person a-remove" type="button" title="Remove person">✕</button>
      </div>
    </div>
  `}function be(){const t=document.getElementById("jClient");t&&(t.onchange=v=>g.clientId=v.target.value);const s=document.getElementById("addNewClientBtn");s&&(s.onclick=()=>{const v=openModal(`
        <h3>Add New Client</h3>
        <div class="field">
          <label>Client Name *</label>
          <input type="text" id="newClientName" placeholder="e.g. Acme Corp">
        </div>
        <div class="field">
          <label>Notes (optional)</label>
          <input type="text" id="newClientNotes" placeholder="Notes...">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Client</button>
        </div>
      `);v.querySelector("#mCancel").onclick=()=>v.remove(),v.querySelector("#mSave").onclick=async()=>{const c=v.querySelector("#newClientName").value.trim(),k=v.querySelector("#newClientNotes").value.trim();if(!c){flashToast("Client name is required",!0);return}try{const f=await apiPost("/clients",{name:c,notes:k});await z(),g.clientId=f._id,flashToast("Client added"),v.remove(),_(document.getElementById("content"))}catch(f){flashToast(f.message,!0)}}});const e=document.getElementById("jDate");e&&(e.onchange=v=>g.date=v.target.value);const i=document.getElementById("jCompletion");i&&(i.onchange=v=>g.completion=v.target.value);const n=document.getElementById("jService");n&&(n.onchange=v=>{const c=v.target.value;c&&(g.serviceIds.includes(c)||g.serviceIds.push(c),_(document.getElementById("content")))}),document.querySelectorAll(".remove-service-tag").forEach(v=>{v.onclick=c=>{c.stopPropagation();const k=v.dataset.id;g.serviceIds=g.serviceIds.filter(f=>f!==k),_(document.getElementById("content"))}});const l=document.getElementById("addNewServiceBtn");l&&(l.onclick=()=>{const v=openModal(`
        <h3>Add New Service</h3>
        <div class="field">
          <label>Service Name *</label>
          <input type="text" id="newServiceName" placeholder="e.g. AR / VR Development">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Service</button>
        </div>
      `);v.querySelector("#mCancel").onclick=()=>v.remove(),v.querySelector("#mSave").onclick=async()=>{const c=v.querySelector("#newServiceName").value.trim();if(!c){flashToast("Service name is required",!0);return}try{const k=await apiPost("/services",{name:c});await z(),g.serviceIds.includes(k._id)||g.serviceIds.push(k._id),flashToast("Service added"),v.remove(),_(document.getElementById("content"))}catch(k){flashToast(k.message,!0)}}});const d=document.getElementById("jDesc");d&&(d.oninput=v=>g.desc=v.target.value);const u=document.getElementById("jValue");u&&(u.oninput=v=>g.value=v.target.value),document.querySelectorAll(".person-assign-row").forEach(v=>{const c=Number(v.dataset.idx),k=v.querySelector(".a-person");k&&(k.onchange=a=>g.assignments[c].personId=a.target.value);const f=v.querySelector(".a-percent");f&&(f.oninput=a=>{g.assignments[c].percent=a.target.value,ye()});const p=v.querySelector(".a-hours");p&&(p.oninput=a=>g.assignments[c].hours=a.target.value);const y=v.querySelector(".a-remove");y&&(y.onclick=()=>{g.assignments.length>1&&(g.assignments.splice(c,1),_(document.getElementById("content")))})});const b=document.getElementById("addAssignRow");b&&(b.onclick=()=>{g.assignments.push({personId:"",percent:0,hours:""}),_(document.getElementById("content"))}),bindAttachmentUploader("jAttachments",{existing:g.attachments||[]});const w=document.getElementById("clearJobBtn");w&&(w.onclick=()=>{g={title:"",assignments:F(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},setUploaderAttachments("jAttachments",[]),_(document.getElementById("content"))});const T=document.getElementById("saveJobBtn");T&&(T.onclick=async()=>{try{if(!g.clientId){flashToast("Please select a client",!0);return}if(!g.serviceIds||!g.serviceIds.length){flashToast("Please select at least one service",!0);return}const v=g.assignments.filter(a=>a.personId);if(!v.length){flashToast("Please assign at least one person",!0);return}for(const a of v)if(a.hours===""||a.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const c=h.clients.find(a=>a._id===g.clientId),f=h.services.filter(a=>g.serviceIds.includes(a._id)).map(a=>a.name).join(", "),p=g.title||(c?`${c.name} — ${f||"Deliverable"}`:f||"Untitled Job"),y=getUploaderAttachments("jAttachments");await apiPost("/jobs",{title:p,clientId:g.clientId,serviceIds:g.serviceIds,date:g.date||new Date().toISOString().slice(0,10),completionDate:g.completion||null,value:Number(g.value)||0,description:g.desc||"",assignments:v,attachments:y}),flashToast("Job saved successfully! 📁"),g={title:"",assignments:F(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},S.tab="jobs",x()}catch(v){flashToast(v.message,!0)}})}function ye(){const t=g.assignments.reduce((e,i)=>e+(Number(i.percent)||0),0),s=document.querySelector(".assign-total");s&&(s.textContent=`${t}% of work allocated ${t!==100?"— should total 100%":"✓"}`,s.classList.toggle("warn",t!==100))}async function fe(t){let s=await apiGet("/jobs");s.sort((e,i)=>new Date(i.date)-new Date(e.date)),S.jobsFilter==="progress"&&(s=s.filter(e=>!e.completionDate)),S.jobsFilter==="done"&&(s=s.filter(e=>e.completionDate)),t.innerHTML=`
    <section class="block">
      <h2>All Jobs <span class="eyebrow">${s.length} shown</span></h2>
      <div style="margin-bottom:12px;display:flex;gap:6px;">
        <button class="pchip ${S.jobsFilter==="all"?"active":""}" data-jf="all">All</button>
        <button class="pchip ${S.jobsFilter==="progress"?"active":""}" data-jf="progress">In Progress</button>
        <button class="pchip ${S.jobsFilter==="done"?"active":""}" data-jf="done">Completed</button>
      </div>
      ${s.length===0?'<div class="empty">No jobs logged yet.</div>':`
      <div class="card" style="overflow-x:auto;">
        <table>
          <thead><tr><th>Job Title</th><th>Files &amp; Artifacts</th><th>Start</th><th>Status &amp; Sign-Off</th><th>Client</th><th>Service(s)</th><th>Assigned Personnel</th><th class="num">Hours</th><th style="text-align:right;">Actions</th></tr></thead>
          <tbody>
          ${s.map(e=>{const i=e.status==="Completed",n=(e.assignments||[]).map(u=>`${escapeHtml(re(u.personId))} (${u.percent}%)`).join(", "),l=(e.attachments||[]).length,d=(e.deliverables||[]).length;return`<tr>
              <td><strong>${escapeHtml(e.title||"Untitled Job")}</strong></td>
              <td>
                <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                  ${l?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${l} Brief Attachments" style="padding:2px 6px;font-size:11px"><span class="badge blue" style="font-size:10.5px">📎 ${l} Brief</span></button>`:""}
                  ${d?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${d} Finished Deliverables" style="padding:2px 6px;font-size:11px"><span class="badge green" style="font-size:10.5px">📦 ${d} Work</span></button>`:""}
                  ${!l&&!d?'<span class="muted" style="font-size:11px">—</span>':""}
                </div>
              </td>
              <td>${fmtDate(e.date)}</td>
              <td>
                <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
                  <button class="btn ${i?"ghost":"gold"} small toggle-status-btn" data-id="${e._id}" data-done="${i}" style="padding:2px 7px;font-size:11px;cursor:pointer;">
                    <span class="badge ${i?"green":e.status==="Needs Revision"?"red":"amber"}">${i?"Completed":e.status==="Needs Revision"?"Needs Revision":"In Progress"}</span>
                  </button>
                  ${e.clientApproval&&e.clientApproval.status==="Approved"?`<span style="font-size:10px;font-weight:700;color:var(--green-500)">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:e.clientApproval&&e.clientApproval.status==="Revision Requested"?'<span style="font-size:10px;font-weight:700;color:var(--red-500)">↺ Revision Req.</span>':""}
                </div>
              </td>
              <td>${escapeHtml(J(e.clientId))}</td>
              <td>${(e.serviceNames||[]).map(u=>`<span class="badge gray">${escapeHtml(u)}</span>`).join(" ")}</td>
              <td class="assign-cell-click" data-id="${e._id}" style="cursor:pointer;" title="Click to assign or change personnel">
                ${n||'<span class="muted">Unassigned</span>'}
                <span style="font-size:11px;color:var(--gold-600);margin-left:4px;">✏️</span>
              </td>
              <td class="num">${fmtHours((e.assignments||[]).reduce((u,b)=>u+(Number(b.hours)||0),0))}</td>
              <td style="text-align:right;white-space:nowrap;">
                <button class="btn ghost small view-job-files" data-id="${e._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">📁 Files</button>
                <button class="btn ghost small view-job-tickets" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="margin-right:4px;padding:3px 8px;font-size:11px;">🎫 Tickets</button>
                <button class="btn ghost small edit-job" data-id="${e._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">Assign / Edit</button>
                <button class="btn danger small del-job" data-id="${e._id}" style="padding:3px 8px;font-size:11px;">Delete</button>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table>
      </div>`}
    </section>
  `,document.querySelectorAll("[data-jf]").forEach(e=>e.onclick=()=>{S.jobsFilter=e.dataset.jf,x()}),document.querySelectorAll(".view-job-files").forEach(e=>{e.onclick=()=>{const i=e.dataset.id,n=s.find(b=>b._id===i);if(!n)return;const l=encodeURIComponent(JSON.stringify(n.attachments||[])),d=encodeURIComponent(JSON.stringify(n.deliverables||[])),u=openModal(`
        <div style="margin-bottom:14px;border-bottom:1px solid var(--border-sm);padding-bottom:10px">
          <h3 style="margin-bottom:4px">📁 Job Files &amp; Artifacts</h3>
          <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(n.title||"Untitled Job")}</div>
        </div>

        <div style="margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📎 Briefs &amp; Initial Client Assets (${(n.attachments||[]).length})</h4>
          ${n.attachments&&n.attachments.length?`
            <div data-attachments="${l}">
              ${renderAttachmentChips(n.attachments)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No brief attachments uploaded.</div>'}
        </div>

        <div style="margin-bottom:20px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📦 Completed Deliverables &amp; Proofs (${(n.deliverables||[]).length})</h4>
          ${n.deliverables&&n.deliverables.length?`
            <div data-attachments="${d}">
              ${renderAttachmentChips(n.deliverables)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No completed deliverables attached yet.</div>'}
        </div>

        <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:14px;margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:6px">+ Upload Deliverables to Job</h4>
          <p style="font-size:11.5px;color:var(--text-3);margin-bottom:10px">Add completed artifacts, links, or finalized files for this job</p>
          <div class="field" style="margin-bottom:10px">
            <label>Deliverable Notes / Version description</label>
            <input type="text" id="mDelNote" placeholder="e.g. Final Video Cut v2 (color graded)" />
          </div>
          ${renderAttachmentUploader({id:"mDelUpload",label:"Upload Deliverable Files",subtitle:"Upload exported videos, PSDs, PDFs, spreadsheets, or images"})}
          <button type="button" class="btn gold small" id="mDelSaveBtn" style="margin-top:10px">Save Deliverables to Job</button>
        </div>

        <div class="modal-actions">
          <button class="btn ghost" id="mCloseFiles">Close</button>
        </div>
      `);bindAttachmentUploader("mDelUpload"),u.querySelector("#mDelSaveBtn").onclick=async()=>{const b=getUploaderAttachments("mDelUpload"),w=u.querySelector("#mDelNote").value.trim();if(!b.length){flashToast("Please select at least one deliverable file",!0);return}try{const T=b.map(v=>({...v,notes:w}));await apiPost(`/jobs/${i}/deliverables`,{deliverables:T}),flashToast("Deliverables added! 📦"),u.remove(),x()}catch(T){flashToast(T.message,!0)}},u.querySelector("#mCloseFiles").onclick=()=>u.remove()}}),document.querySelectorAll(".view-job-tickets").forEach(e=>{e.onclick=()=>{const i=e.dataset.id,n=e.dataset.title,l=openModal(`
        <div style="margin-bottom:12px">
          <h3 style="margin-bottom:4px">🎫 Support Tickets</h3>
          <div style="font-size:12px;color:var(--text-3)">${escapeHtml(n)}</div>
        </div>
        ${renderSupportTicketSection(i,!0)}
        <div class="modal-actions" style="margin-top:16px">
          <button class="btn ghost" id="mCloseTickets">Close</button>
        </div>
      `);bindSupportTicketSection(i,!0),l.querySelector("#mCloseTickets").onclick=()=>l.remove()}}),document.querySelectorAll(".edit-job, .assign-cell-click").forEach(e=>{e.onclick=()=>{const i=e.dataset.id,n=s.find(l=>l._id===i);n&&he(n,()=>x())}}),document.querySelectorAll(".toggle-status-btn").forEach(e=>e.onclick=async()=>{const i=e.dataset.id,n=e.dataset.done==="false",l=s.find(u=>u._id===i);let d=l?l.completionDate:null;n&&!d&&(d=new Date().toISOString().slice(0,10)),await apiPut("/jobs/"+i,{status:n?"Completed":"In Progress",completionDate:d}),flashToast(n?"Job marked as Completed!":"Job marked as In Progress"),x()}),document.querySelectorAll(".del-job").forEach(e=>e.onclick=async()=>{confirm("Delete this job?")&&(await apiDelete("/jobs/"+e.dataset.id),flashToast("Deleted"),x())})}let L="",j="all";async function U(t){let s=await apiGet("/tickets");s.sort((a,m)=>new Date(m.createdAt)-new Date(a.createdAt));const e=s.length,i=s.filter(a=>a.status==="Open").length,n=s.filter(a=>a.status==="In Review").length,l=s.filter(a=>a.status==="Resolved"||a.status==="Closed").length,d=e>0?Math.round(l/e*100):100,u=S.ticketsFilter||"all";let b=s;if(u==="open"?b=b.filter(a=>a.status==="Open"):u==="in-review"?b=b.filter(a=>a.status==="In Review"):u==="resolved"?b=b.filter(a=>a.status==="Resolved"):u==="closed"&&(b=b.filter(a=>a.status==="Closed")),j!=="all"&&(b=b.filter(a=>a.priority===j)),L){const a=L.toLowerCase();b=b.filter(m=>{const A=m.jobId&&m.jobId.title||"";return(m.subject||"").toLowerCase().includes(a)||(m.message||"").toLowerCase().includes(a)||(m.userName||"").toLowerCase().includes(a)||A.toLowerCase().includes(a)})}const w={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},T={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function v(a){if(!a)return"U";const m=a.trim().split(/\s+/);return m.length===1?m[0].slice(0,2).toUpperCase():(m[0][0]+m[m.length-1][0]).toUpperCase()}function c(a){if(!a)return"";const m=new Date,A=new Date(a),P=Math.floor((m-A)/1e3);if(P<60)return"Just now";const N=Math.floor(P/60);if(N<60)return`${N}m ago`;const q=Math.floor(N/60);if(q<24)return`${q}h ago`;const o=Math.floor(q/24);return o<7?`${o}d ago`:fmtDate(a)}t.innerHTML=`
    <section class="block">
      <!-- Top Metrics Hub -->
      <div class="ticket-hub-kpis">
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon blue">🎫</div>
          <div>
            <div class="ticket-kpi-val">${e}</div>
            <div class="ticket-kpi-lbl">Total Tickets</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon red">🔴</div>
          <div>
            <div class="ticket-kpi-val">${i}</div>
            <div class="ticket-kpi-lbl">Open Action Req.</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon amber">🟡</div>
          <div>
            <div class="ticket-kpi-val">${n}</div>
            <div class="ticket-kpi-lbl">In Review</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon green">⚡</div>
          <div>
            <div class="ticket-kpi-val">${d}%</div>
            <div class="ticket-kpi-lbl">Resolution Rate</div>
          </div>
        </div>
      </div>

      <!-- Controls & Search Bar -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <button class="pchip ${u==="all"?"active":""}" data-tf="all">All (${e})</button>
          <button class="pchip ${u==="open"?"active":""}" data-tf="open">🔴 Open (${i})</button>
          <button class="pchip ${u==="in-review"?"active":""}" data-tf="in-review">🟡 In Review (${n})</button>
          <button class="pchip ${u==="resolved"?"active":""}" data-tf="resolved">🟢 Resolved (${l})</button>
          <button class="pchip ${u==="closed"?"active":""}" data-tf="closed">⚪ Closed</button>
        </div>

        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <select id="admTkPriFilter" style="font-size:12.5px;padding:8px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-card);color:var(--text-1);outline:none">
            <option value="all" ${j==="all"?"selected":""}>All Priorities</option>
            <option value="Urgent" ${j==="Urgent"?"selected":""}>🔴 Urgent</option>
            <option value="High" ${j==="High"?"selected":""}>🟠 High</option>
            <option value="Medium" ${j==="Medium"?"selected":""}>🟡 Medium</option>
            <option value="Low" ${j==="Low"?"selected":""}>🟢 Low</option>
          </select>

          <div class="ticket-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="admTkSearch" placeholder="Search by subject, user, job…" value="${escapeHtml(L)}">
            ${L?'<button type="button" id="admClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:12px">✕</button>':""}
          </div>
          <button class="btn gold" id="admRaiseTicketGlobalBtn" type="button" style="display:flex;align-items:center;gap:6px;padding:8px 16px;font-size:13px;font-weight:700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            + Raise Ticket
          </button>
        </div>
      </div>

      <!-- Ticket Cards List -->
      ${b.length===0?renderEmptyState("No support tickets found","No tickets match the active filters or search criteria.","🎫"):`
      <div style="display:flex;flex-direction:column;gap:14px">
        ${b.map(a=>{const m=a.jobId?a.jobId.title||"Untitled Job":"General Workspace",A=(a.status||"Open").toLowerCase().replace(" ","-"),P=a.status==="Open",N=(a._id||"").slice(-4).toUpperCase(),q=v(a.userName);return`
          <div class="ticket-card status-${A}" id="adm-tk-${a._id}">
            <div class="ticket-card-header">
              <div>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">
                  <span class="ticket-id-tag">#TK-${N}</span>
                  <span class="ticket-subject">${escapeHtml(a.subject)}</span>
                </div>
                <div style="font-size:12px;color:var(--text-4);margin-top:2px">
                  📁 Job: <strong style="color:var(--text-2)">${escapeHtml(m)}</strong>
                </div>
              </div>
              <div class="ticket-meta-badges">
                <span class="badge ${w[a.status]||"gray"}">
                  ${P?'<span class="pulse-dot"></span>':""} ${escapeHtml(a.status)}
                </span>
                <span class="badge ${T[a.priority]||"gray"}">${escapeHtml(a.priority)}</span>
              </div>
            </div>

            <div class="ticket-author-row">
              <div class="ticket-avatar">${q}</div>
              <div class="ticket-author-meta">
                <div class="ticket-author-name">
                  ${escapeHtml(a.userName)}
                  <span class="ticket-role-pill">${escapeHtml(a.userRole)}</span>
                </div>
                <span class="ticket-time-ago">${c(a.createdAt)} · ${fmtDate(a.createdAt)}</span>
              </div>
            </div>

            <div class="ticket-message-box">
              ${escapeHtml(a.message)}
            </div>

            ${a.adminReply?`
              <div class="ticket-thread-wrap">
                <div class="ticket-admin-reply-card">
                  <div class="ticket-admin-reply-header">
                    <span class="ticket-shield-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Official Support Response
                    </span>
                    ${a.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${c(a.repliedAt)}</span>`:""}
                  </div>
                  <div class="ticket-admin-reply-text">${escapeHtml(a.adminReply)}</div>
                </div>
              </div>`:""}

            <div class="ticket-toolbar">
              <label style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Status:</label>
              <select class="adm-tk-status-sel" data-tkid="${a._id}" style="font-size:12px;padding:5px 8px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1)">
                <option value="Open" ${a.status==="Open"?"selected":""}>🔴 Open</option>
                <option value="In Review" ${a.status==="In Review"?"selected":""}>🟡 In Review</option>
                <option value="Resolved" ${a.status==="Resolved"?"selected":""}>🟢 Resolved</option>
                <option value="Closed" ${a.status==="Closed"?"selected":""}>⚪ Closed</option>
              </select>

              <button class="btn ghost small adm-tk-reply-toggle" data-tkid="${a._id}" type="button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                ${a.adminReply?"Edit Reply":"💬 Reply"}
              </button>

              ${a.status!=="Resolved"?`
                <button class="btn ghost small adm-tk-quick-resolve" data-tkid="${a._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
                  ✓ Quick Resolve
                </button>`:""}

              <button class="btn danger small adm-tk-del-btn" data-tkid="${a._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>

              <div class="ticket-reply-form" id="adm-tk-replyform-${a._id}">
                <div class="ticket-templates-bar">
                  <span style="font-size:10px;font-weight:700;color:var(--text-4);text-transform:uppercase;align-self:center">Quick:</span>
                  <button type="button" class="ticket-template-btn" data-tkid="${a._id}" data-tpl="We are actively investigating this and will update you shortly.">🔍 Investigating</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${a._id}" data-tpl="This issue has been resolved and the updates have been saved.">✅ Resolved</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${a._id}" data-tpl="Could you please provide more details so we can assist further?">ℹ️ Need Info</button>
                </div>
                <textarea id="adm-tk-replytxt-${a._id}" rows="2" placeholder="Write official response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${escapeHtml(a.adminReply||"")}</textarea>
                <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:6px">
                  <button class="btn ghost small adm-tk-reply-cancel" data-tkid="${a._id}" type="button">Cancel</button>
                  <button class="btn gold small adm-tk-reply-save" data-tkid="${a._id}" type="button">Save Response</button>
                </div>
              </div>
            </div>
          </div>`}).join("")}
      </div>`}
    </section>
  `,document.querySelectorAll("[data-tf]").forEach(a=>{a.onclick=()=>{S.ticketsFilter=a.dataset.tf,x()}});const k=document.getElementById("admTkSearch");k&&(k.oninput=a=>{L=a.target.value,U(t)});const f=document.getElementById("admClearSearch");f&&(f.onclick=()=>{L="",U(t)});const p=document.getElementById("admTkPriFilter");p&&(p.onchange=a=>{j=a.target.value,U(t)});const y=document.getElementById("admRaiseTicketGlobalBtn");y&&(y.onclick=async()=>{const a=await apiGet("/jobs");if(!a.length){flashToast("No jobs available to raise tickets against.",!0);return}const m=openModal(`
        <div style="margin-bottom:14px">
          <h3 style="margin-bottom:4px">🎫 Raise Support Ticket</h3>
          <div style="font-size:12.5px;color:var(--text-3)">Create a new support request, revision note, or blocker report.</div>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Select Job *</label>
          <select id="modalTkJob" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="">Choose a job…</option>
            ${a.map(A=>`<option value="${A._id}">${escapeHtml(A.title||"Untitled Job")} (${escapeHtml(J(A.clientId))})</option>`).join("")}
          </select>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Subject / Issue Title *</label>
          <input type="text" id="modalTkSub" placeholder="Brief summary of the issue…" maxlength="120" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);box-sizing:border-box">
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Priority Level</label>
          <select id="modalTkPri" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="Low">🟢 Low Priority</option>
            <option value="Medium" selected>🟡 Medium Priority</option>
            <option value="High">🟠 High Priority</option>
            <option value="Urgent">🔴 Urgent / Blocker</option>
          </select>
        </div>

        <div class="field" style="margin-bottom:16px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Detailed Description *</label>
          <textarea id="modalTkMsg" rows="4" placeholder="Provide full details, feedback, or blockers…" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);box-sizing:border-box;resize:vertical"></textarea>
        </div>

        <div class="modal-actions">
          <button class="btn ghost" id="mCancelTicket">Cancel</button>
          <button class="btn gold" id="mSubmitTicket">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Ticket
          </button>
        </div>
      `);m.querySelector("#mCancelTicket").onclick=()=>m.remove(),m.querySelector("#mSubmitTicket").onclick=async()=>{const A=m.querySelector("#modalTkJob").value,P=m.querySelector("#modalTkSub").value.trim(),N=m.querySelector("#modalTkPri").value,q=m.querySelector("#modalTkMsg").value.trim();if(!A){flashToast("Please select a job",!0);return}if(!P){flashToast("Please enter an issue subject",!0);return}if(!q){flashToast("Please enter description",!0);return}try{await apiPost("/tickets",{jobId:A,subject:P,message:q,priority:N}),flashToast("Support Ticket Raised! 🎫"),m.remove(),U(t)}catch(o){flashToast(o.message,!0)}}}),document.querySelectorAll(".adm-tk-quick-resolve").forEach(a=>{a.onclick=async()=>{try{await apiPut("/tickets/"+a.dataset.tkid,{status:"Resolved"}),flashToast("Ticket marked as Resolved! 🎉"),x()}catch(m){flashToast(m.message,!0)}}}),document.querySelectorAll(".ticket-template-btn").forEach(a=>{a.onclick=()=>{const m=document.getElementById("adm-tk-replytxt-"+a.dataset.tkid);m&&(m.value=a.dataset.tpl,m.focus())}}),document.querySelectorAll(".adm-tk-status-sel").forEach(a=>{a.onchange=async()=>{try{await apiPut("/tickets/"+a.dataset.tkid,{status:a.value}),flashToast("Status updated"),x()}catch(m){flashToast(m.message,!0)}}}),document.querySelectorAll(".adm-tk-reply-toggle").forEach(a=>{a.onclick=()=>{const m=document.getElementById("adm-tk-replyform-"+a.dataset.tkid);m&&m.classList.toggle("show")}}),document.querySelectorAll(".adm-tk-reply-cancel").forEach(a=>{a.onclick=()=>{const m=document.getElementById("adm-tk-replyform-"+a.dataset.tkid);m&&m.classList.remove("show")}}),document.querySelectorAll(".adm-tk-reply-save").forEach(a=>{a.onclick=async()=>{const m=document.getElementById("adm-tk-replytxt-"+a.dataset.tkid);if(m)try{await apiPut("/tickets/"+a.dataset.tkid,{adminReply:m.value.trim()}),flashToast("Response saved! 🛡️"),x()}catch(A){flashToast(A.message,!0)}}}),document.querySelectorAll(".adm-tk-del-btn").forEach(a=>{a.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await apiDelete("/tickets/"+a.dataset.tkid),flashToast("Ticket deleted"),x()}catch(m){flashToast(m.message,!0)}}})}function he(t,s){let e={title:t.title||"",clientId:t.clientId?t.clientId._id||t.clientId:"",serviceIds:t.serviceIds?t.serviceIds.map(o=>o._id||o):[],date:t.date?new Date(t.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),completionDate:t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",status:t.status||"In Progress",priority:t.priority||"Medium",value:t.value!=null?t.value:"",description:t.description||"",preferredPersonId:t.preferredPersonId?t.preferredPersonId._id||t.preferredPersonId:"",assignments:t.assignments&&t.assignments.length?t.assignments.map(o=>({personId:String(o.personId._id||o.personId),percent:o.percent!=null?o.percent:0,hours:o.hours!=null?o.hours:0})):F()};function i(){return e.serviceIds.length?e.serviceIds.map(o=>{const r=h.services.find($=>String($._id)===String(o));return r?`
        <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;font-size:12px;border-radius:20px;">
          ${escapeHtml(r.name)}
          <span class="m-remove-service" data-id="${r._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
        </span>
      `:""}).join(""):'<span class="muted" style="font-size:12px;">No services selected</span>'}function n(){return e.assignments.map((o,r)=>`
      <div class="m-person-assign-row" data-idx="${r}" style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;align-items:center;margin-bottom:8px;">
        <div class="field" style="margin-bottom:0;">
          <select class="m-a-person" style="padding:6px 8px;font-size:13px;width:100%;">
            <option value="">Select team member…</option>
            ${h.personnel.map($=>`<option value="${$._id}" ${String($._id)===String(o.personId)?"selected":""}>${escapeHtml($.name)}${$.duties?` (${escapeHtml($.duties)})`:""}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-percent" value="${o.percent!=null?o.percent:""}" placeholder="100" min="0" max="100" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-hours" value="${o.hours!=null?o.hours:""}" placeholder="0" min="0" step="0.5" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div style="display:flex;justify-content:center;">
          <button class="btn-remove-person m-a-remove" type="button" title="Remove person" style="cursor:pointer;background:none;border:none;color:var(--red);font-weight:bold;font-size:16px;">✕</button>
        </div>
      </div>
    `).join("")}const l=openModal(`
    <div style="max-height:85vh;overflow-y:auto;padding-right:4px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border-sm);padding-bottom:12px;">
        <div>
          <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">Assign Personnel & Edit Job</h3>
          <p style="margin:2px 0 0 0;font-size:12px;color:var(--text-3);">Assign or change assigned team members and update job details.</p>
        </div>
        <button type="button" class="btn ghost small" id="mCloseJobEdit" style="font-size:16px;line-height:1;padding:4px 8px;">✕</button>
      </div>

      <div class="field" style="margin-bottom:14px;">
        <label>JOB TITLE *</label>
        <input type="text" id="mEditTitle" value="${escapeHtml(e.title)}" placeholder="Job Title...">
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>CLIENT *</label>
          <select id="mEditClient">
            <option value="">Select client…</option>
            ${h.clients.map(o=>`<option value="${o._id}" ${String(o._id)===String(e.clientId)?"selected":""}>${escapeHtml(o.name)}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>STATUS</label>
          <select id="mEditStatus">
            <option value="In Progress" ${e.status==="In Progress"?"selected":""}>In Progress</option>
            <option value="Completed" ${e.status==="Completed"?"selected":""}>Completed</option>
          </select>
        </div>
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>START DATE *</label>
          <input type="date" id="mEditDate" value="${e.date}">
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>COMPLETION DATE</label>
          <input type="date" id="mEditCompletionDate" value="${e.completionDate}">
        </div>
      </div>

      <div class="field" style="margin-bottom:14px;">
        <label>SERVICE(S) DELIVERED *</label>
        <select id="mEditServiceSelect">
          <option value="">Select service to add…</option>
          ${h.services.map(o=>`<option value="${o._id}">${escapeHtml(o.name)}</option>`).join("")}
        </select>
        <div id="mEditServicesTags" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
          ${i()}
        </div>
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>PRIORITY</label>
          <select id="mEditPriority">
            <option value="Medium" ${e.priority==="Medium"?"selected":""}>Medium</option>
            <option value="High" ${e.priority==="High"?"selected":""}>High</option>
            <option value="Urgent" ${e.priority==="Urgent"?"selected":""}>Urgent</option>
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>JOB VALUE (₹)</label>
          <input type="number" id="mEditValue" value="${e.value}" placeholder="0" min="0">
        </div>
      </div>

      <div class="field" style="margin-bottom:16px;">
        <label>DESCRIPTION / SCOPE</label>
        <textarea id="mEditDesc" style="height:70px;resize:vertical;" placeholder="Deliverable details...">${escapeHtml(e.description)}</textarea>
      </div>

      <!-- FILE ATTACHMENTS & DELIVERABLES -->
      <div style="background:var(--bg-card);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:16px;">
        <h4 style="margin:0 0 12px 0;font-size:14px;font-weight:700;color:var(--text-1);">📎 Job Briefs &amp; Initial Assets</h4>
        ${renderAttachmentUploader({id:"mEditAttachments",label:"Brief Attachments",subtitle:"Upload briefs, design mockups, agreements or logos"})}
      </div>

      <div style="background:var(--bg-card);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:20px;">
        <h4 style="margin:0 0 12px 0;font-size:14px;font-weight:700;color:var(--text-1);">📦 Completed Deliverables &amp; Output Files</h4>
        ${renderAttachmentUploader({id:"mEditDeliverables",label:"Finished Deliverables",subtitle:"Upload completed exports, videos, PSDs, PDFs, or spreadsheets"})}
      </div>

      <!-- ASSIGN PERSONNEL SECTION -->
      <div style="background:var(--bg-elevated);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h4 style="margin:0;font-size:14px;font-weight:700;color:var(--navy-900);">👥 Assigned Personnel (Multiple Allowed)</h4>
          <span style="font-size:11px;color:var(--text-3);">Add or change team members assigned to this job</span>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;font-size:11px;font-weight:700;color:var(--text-3);margin-bottom:6px;text-transform:uppercase;">
          <div>Team Member</div>
          <div>% of Work</div>
          <div>Hours Spent</div>
          <div></div>
        </div>

        <div id="mEditAssignRows">
          ${n()}
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;flex-wrap:wrap;gap:8px;">
          <button type="button" class="btn ghost small" id="mAddAssignRow">+ Add Team Member</button>
          <div id="mAssignTotalInfo" class="assign-total" style="font-size:12px;font-weight:600;"></div>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:16px;">
        <button type="button" class="btn ghost" id="mEditCancel">Cancel</button>
        <button type="button" class="btn gold" id="mEditSave" style="padding:8px 20px;">Save & Update Assignments</button>
      </div>
    </div>
  `),d=l.querySelector(".modal");d&&(d.style.maxWidth="680px"),bindAttachmentUploader("mEditAttachments",{existing:t.attachments||[]}),bindAttachmentUploader("mEditDeliverables",{existing:t.deliverables||[]});const u=()=>{const o=e.assignments.reduce(($,E)=>$+(Number(E.percent)||0),0),r=l.querySelector("#mAssignTotalInfo");r&&(r.innerHTML=o===100?'<span style="color:var(--green, #10b981);">✓ 100% Allocated</span>':`<span style="color:var(--amber, #f59e0b);">⚠️ ${o}% Allocated (should be 100%)</span>`)},b=()=>{l.querySelectorAll(".m-remove-service").forEach(o=>{o.onclick=()=>{const r=o.dataset.id;e.serviceIds=e.serviceIds.filter($=>String($)!==String(r)),l.querySelector("#mEditServicesTags").innerHTML=i(),b()}})},w=()=>{l.querySelectorAll(".m-person-assign-row").forEach(o=>{const r=Number(o.dataset.idx),$=o.querySelector(".m-a-person");$&&($.onchange=C=>e.assignments[r].personId=C.target.value);const E=o.querySelector(".m-a-percent");E&&(E.oninput=C=>{e.assignments[r].percent=C.target.value,u()});const B=o.querySelector(".m-a-hours");B&&(B.oninput=C=>e.assignments[r].hours=C.target.value);const H=o.querySelector(".m-a-remove");H&&(H.onclick=()=>{e.assignments.length>1?(e.assignments.splice(r,1),l.querySelector("#mEditAssignRows").innerHTML=n(),w(),u()):flashToast("Job must have at least one team member row",!0)})})},T=l.querySelector("#mCloseJobEdit"),v=l.querySelector("#mEditCancel");T&&(T.onclick=()=>l.remove()),v&&(v.onclick=()=>l.remove());const c=l.querySelector("#mEditTitle");c&&(c.oninput=o=>e.title=o.target.value);const k=l.querySelector("#mEditClient");k&&(k.onchange=o=>e.clientId=o.target.value);const f=l.querySelector("#mEditStatus");f&&(f.onchange=o=>e.status=o.target.value);const p=l.querySelector("#mEditDate");p&&(p.onchange=o=>e.date=o.target.value);const y=l.querySelector("#mEditCompletionDate");y&&(y.onchange=o=>e.completionDate=o.target.value);const a=l.querySelector("#mEditPriority");a&&(a.onchange=o=>e.priority=o.target.value);const m=l.querySelector("#mEditValue");m&&(m.oninput=o=>e.value=o.target.value);const A=l.querySelector("#mEditDesc");A&&(A.oninput=o=>e.description=o.target.value);const P=l.querySelector("#mEditServiceSelect");P&&(P.onchange=o=>{const r=o.target.value;r&&!e.serviceIds.map(String).includes(String(r))&&(e.serviceIds.push(r),l.querySelector("#mEditServicesTags").innerHTML=i(),b()),P.value=""}),b(),w(),u();const N=l.querySelector("#mAddAssignRow");N&&(N.onclick=()=>{e.assignments.push({personId:"",percent:0,hours:0}),l.querySelector("#mEditAssignRows").innerHTML=n(),w(),u()});const q=l.querySelector("#mEditSave");q&&(q.onclick=async()=>{try{if(!e.clientId){flashToast("Client is required",!0);return}if(!e.serviceIds||!e.serviceIds.length){flashToast("At least one service is required",!0);return}const o=e.assignments.filter(D=>D.personId&&String(D.personId).trim()!=="");if(!o.length){flashToast("Please select at least one assigned team member",!0);return}for(const D of o)if(D.hours===""||D.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const r=h.clients.find(D=>String(D._id)===String(e.clientId)),E=h.services.filter(D=>e.serviceIds.map(String).includes(String(D._id))).map(D=>D.name).join(", "),B=e.title||(r?`${r.name} — ${E||"Deliverable"}`:E||"Untitled Job"),H=getUploaderAttachments("mEditAttachments"),C=getUploaderAttachments("mEditDeliverables");await apiPut("/jobs/"+t._id,{title:B,clientId:e.clientId,serviceIds:e.serviceIds,date:e.date,completionDate:e.completionDate||null,status:e.status,priority:e.priority,value:Number(e.value)||0,description:e.description||"",assignments:o,attachments:H,deliverables:C});const M=o.map(D=>re(D.personId)).join(", ");flashToast("Job updated & saved! 📁"),l.remove(),s&&s()}catch(o){flashToast(o.message,!0)}finally{q.disabled=!1,q.textContent="Save & Update Assignments"}})}async function xe(t){R=await apiGet("/dashboard/admin?period="+S.period),t.innerHTML=`${Q()}
    <section class="block"><h2>By Client</h2>
      <div class="grid grid-3">
        ${R.clients.map(s=>`
          <div class="card">
            <h3 style="font-size:17px;">${escapeHtml(s.name)}</h3>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Work Value</span><strong>${fmtINR(s.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Jobs</span><strong>${s.jobCount}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Effort</span><strong>${fmtHours(s.hours)}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">People Involved</span><strong>${s.peopleCount}</strong></div>
          </div>`).join("")||'<div class="empty">No clients yet.</div>'}
      </div>
    </section>`,Y()}async function de(t){R=await apiGet("/dashboard/admin?period="+S.period),t.innerHTML=`${Q()}
    <section class="block"><h2>By Person</h2>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Person</th><th>Duties</th><th>Status</th><th class="num">Hours</th><th class="num">Utilization</th><th class="num">Jobs</th><th class="num" style="padding-right:22px">Work Credit</th></tr></thead>
          <tbody>${R.personnel.map(s=>{const e=(s.status||"active").toLowerCase(),i=s.personId||s._id;return`<tr>
              <td style="padding-left:22px"><strong>${escapeHtml(s.name)}</strong></td><td class="muted">${escapeHtml(s.duties||"")}</td>
              <td>
                <select class="person-status-sel" data-id="${i}" style="padding:4px 10px;font-size:12.5px;font-weight:700;border-radius:6px;border:1px solid var(--border-sm);background:var(--bg-input);color:var(--text-1);cursor:pointer;">
                  <option value="active" ${e==="active"?"selected":""}>🟢 Active</option>
                  <option value="work from home" ${e==="work from home"||e==="wfh"?"selected":""}>🏠 Work From Home</option>
                  <option value="on leave" ${e==="on leave"||e==="pn leave"?"selected":""}>🏖️ On Leave</option>
                </select>
              </td>
              <td class="num">${fmtHours(s.hours)}</td>
              <td class="num"><span class="badge ${s.cls}">${s.label}</span> ${s.utilization.toFixed(0)}%</td>
              <td class="num">${s.jobCount}</td><td class="num" style="padding-right:22px">${fmtINR(s.revenue)}</td>
            </tr>`}).join("")}</tbody></table>
        </div>
      </div>
    </section>`,Y(),document.querySelectorAll(".person-status-sel").forEach(s=>{s.onchange=async e=>{const i=s.dataset.id,n=e.target.value;try{await apiPut("/personnel/"+i,{status:n}),await z(),flashToast("Status updated to "+n),de(t)}catch(l){flashToast(l.message,!0)}}})}const O=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","QC"]];async function ke(t){const s=await apiGet("/roster");t.innerHTML=`
    <section class="block">
      <h2>Accounts <span class="eyebrow">${s.length} accounts</span></h2>
      <div class="banner">Who owns which function on each account — separate from the job/hours log.</div>
      <div style="margin-bottom:14px;display:flex;gap:8px;"><button class="btn gold small" id="addAccountBtn">+ Add Account</button></div>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Client</th><th>Nature</th>${O.map(e=>`<th>${e[1]}</th>`).join("")}<th class="num">Difficulty</th><th class="num" style="padding-right:22px"></th></tr></thead>
          <tbody>${s.map(e=>`<tr>
            <td style="padding-left:22px"><strong>${escapeHtml(J(e.clientId))}</strong></td>
            <td><span class="badge ${e.nature==="Existing"?"green":"blue"}">${e.nature}</span></td>
            ${O.map(i=>`<td>${escapeHtml(e.roles[i[0]]||"—")}</td>`).join("")}
            <td class="num"><span class="badge ${e.difficulty>=9?"red":e.difficulty>=7?"amber":e.difficulty>=4?"blue":"green"}">${e.difficulty}</span></td>
            <td class="num" style="padding-right:22px"><button class="btn ghost small edit-roster" data-id="${e._id}">Edit</button></td>
          </tr>`).join("")||'<tr><td colspan="13"><div class="empty">No accounts yet.</div></td></tr>'}</tbody></table>
        </div>
      </div>
    </section>`,document.getElementById("addAccountBtn").onclick=()=>ee(null),document.querySelectorAll(".edit-roster").forEach(e=>e.onclick=()=>ee(s.find(i=>i._id===e.dataset.id)))}function ee(t){const s=!t,e=t||{_id:null,clientId:"",nature:"Existing",roles:{},difficulty:5,comments:""};O.forEach(n=>{e.roles[n[0]]==null&&(e.roles[n[0]]="")});const i=openModal(`
    <h3>${s?"Add Account":"Edit Account"}</h3>
    <div class="field-row">
      <div class="field"><label>Client</label>
        ${s?`<select id="rClient"><option value="">Select…</option>${h.clients.map(n=>`<option value="${n._id}">${escapeHtml(n.name)}</option>`).join("")}</select>`:`<input type="text" value="${escapeHtml(J(e.clientId))}" disabled>`}
      </div>
      <div class="field"><label>Nature</label><select id="rNature"><option value="Existing" ${e.nature==="Existing"?"selected":""}>Existing</option><option value="Prospect" ${e.nature==="Prospect"?"selected":""}>Prospect</option></select></div>
    </div>
    <div class="field-row">${O.slice(0,5).map(n=>`<div class="field"><label>${n[1]}</label><input type="text" class="r-role" data-key="${n[0]}" value="${escapeHtml(e.roles[n[0]])}"></div>`).join("")}</div>
    <div class="field-row">${O.slice(5,10).map(n=>`<div class="field"><label>${n[1]}</label><input type="text" class="r-role" data-key="${n[0]}" value="${escapeHtml(e.roles[n[0]])}"></div>`).join("")}</div>
    <div class="field-row">
      <div class="field"><label>Difficulty (1-10)</label><input id="rDifficulty" type="number" min="1" max="10" value="${e.difficulty}"></div>
    </div>
    <div class="field"><label>Comments</label><textarea id="rComments">${escapeHtml(e.comments||"")}</textarea></div>
    <div class="modal-actions">
      ${s?"":'<button class="btn danger" id="mDelete" style="margin-right:auto;">Remove</button>'}
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save</button>
    </div>`);i.querySelector("#mCancel").onclick=()=>i.remove(),s||(i.querySelector("#mDelete").onclick=async()=>{confirm("Remove this account?")&&(await apiDelete("/roster/"+e._id),i.remove(),x())}),i.querySelector("#mSave").onclick=async()=>{const n={};i.querySelectorAll(".r-role").forEach(d=>n[d.dataset.key]=d.value.trim());const l={nature:i.querySelector("#rNature").value,roles:n,difficulty:Number(i.querySelector("#rDifficulty").value)||1,comments:i.querySelector("#rComments").value.trim()};try{if(s){const d=i.querySelector("#rClient").value;if(!d){flashToast("Select a client",!0);return}await apiPost("/roster",Object.assign({clientId:d},l))}else await apiPut("/roster/"+e._id,l);i.remove(),x()}catch(d){flashToast(d.message,!0)}}}function we(t){if(!t)return"Deliverables";const s={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"};return s[t]?s[t]:t.charAt(0).toUpperCase()+t.slice(1)}async function $e(t){const s=await apiGet("/targets"),e={day:"Daily",week:"Weekly",month:"Monthly"};t.innerHTML=`
    <section class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
        <div>
          <h2 style="font-size:20px;font-weight:800;color:var(--text-1);margin-bottom:4px;border:none;padding:0;">Output & Productivity Targets</h2>
          <p style="font-size:13px;color:var(--text-3);margin:0;">Assign and track quotas for team members across reels, stories, posts, deliverables, hours, or any custom unit.</p>
        </div>
        <button class="btn gold small" id="addAdminTargetBtn" type="button">+ Add Target</button>
      </div>

      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table style="width:100%;border-collapse:collapse;table-layout:fixed;min-width:780px">
            <thead>
              <tr>
                <th style="width:16%;padding-left:22px">Personnel</th>
                <th style="width:24%">Service</th>
                <th style="width:10%">Target</th>
                <th style="width:13%">Measured In</th>
                <th style="width:10%">Frequency</th>
                <th style="width:15%">Live Output</th>
                <th class="num" style="width:12%;padding-right:22px;text-align:right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${s.map(i=>{var f,p;const n=((f=i.personId)==null?void 0:f.name)||"—",l=((p=i.serviceId)==null?void 0:p.name)||"—",d=we(i.unit),u=e[i.period]||(i.period?i.period.toUpperCase():"Daily"),b=i.actual||0,w=i.quantity>0?b/i.quantity:0,T=Math.round(w*100),v=w>=1?"green":w>=.6?"amber":"red",c=w>=1?"✓ Met":w>=.6?"Behind":"Off Pace",k=Math.min(T,100);return`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(n)}</strong></td>
                  <td><span class="badge blue" style="white-space:normal;line-height:1.3;display:inline-block;padding:4px 8px;font-size:12px">${escapeHtml(l)}</span></td>
                  <td><span style="font-size:14px;font-weight:700;color:var(--text-1)">${i.quantity}</span></td>
                  <td><span class="badge gray">${escapeHtml(d)}</span></td>
                  <td><span class="badge gray" style="font-weight:600">${u}</span></td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px">
                      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                        <span style="font-weight:700;color:var(--text-1)">${b} / ${i.quantity} <span style="font-weight:500;color:var(--text-3)">(${T}%)</span></span>
                        <span class="badge ${v}" style="font-size:10px;padding:1px 5px">${c}</span>
                      </div>
                      <div style="height:5px;width:100%;background:var(--bg-surface);border-radius:10px;overflow:hidden;border:1px solid var(--border-xs)">
                        <div style="width:${k}%;height:100%;background:var(--${v==="green"?"green":"amber"}-500);border-radius:10px;transition:width 0.6s ease"></div>
                      </div>
                    </div>
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap;text-align:right">
                    <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
                      <button class="btn ghost small edit-target" data-id="${i._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
                      <button class="btn danger small del-target" data-id="${i._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
                    </div>
                  </td>
                </tr>`}).join("")||'<tr><td colspan="7"><div class="empty" style="padding:32px 20px">No targets defined yet. Click "+ Add Target" to assign output quotas.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,document.getElementById("addAdminTargetBtn").onclick=()=>te(null),document.querySelectorAll(".edit-target").forEach(i=>{i.onclick=()=>te(s.find(n=>n._id===i.dataset.id))}),document.querySelectorAll(".del-target").forEach(i=>{i.onclick=async()=>{if(confirm("Remove this target?"))try{await apiDelete("/targets/"+i.dataset.id),flashToast("Target removed"),x()}catch(n){flashToast(n.message,!0)}}})}function te(t){var T,v,c,k;const s=!t;t=t||{personId:(T=h.personnel[0])==null?void 0:T._id,serviceId:(v=h.services[0])==null?void 0:v._id,quantity:5,unit:"reels",period:"day"};const e=((c=t.personId)==null?void 0:c._id)||t.personId||"",i=((k=t.serviceId)==null?void 0:k._id)||t.serviceId||"",l=["reels","stories","posts","count","hours"].includes(t.unit),d=openModal(`
    <h3>${s?"Assign New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Set output goals for reels, stories, posts, hours, or any custom deliverable.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Personnel Member *</label>
      <select id="mTgtPerson">
        ${h.personnel.map(f=>`<option value="${f._id}" ${String(f._id)===String(e)?"selected":""}>${escapeHtml(f.name)}</option>`).join("")}
      </select>
    </div>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Type *</label>
      <select id="mTgtService">
        ${h.services.map(f=>`<option value="${f._id}" ${String(f._id)===String(i)?"selected":""}>${escapeHtml(f.name)}</option>`).join("")}
      </select>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Target Quantity *</label>
        <input type="number" id="mTgtQty" min="0.5" step="0.5" value="${t.quantity||1}">
      </div>
      <div class="field" style="margin-bottom:0">
        <label>Measured In *</label>
        <select id="mTgtUnit">
          <option value="reels" ${l&&t.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${l&&t.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${l&&t.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${l&&t.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${l&&t.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${l?"":"selected"}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>
    </div>

    <div class="field" id="mTgtCustomUnitWrap" style="margin-bottom:12px;display:${l?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${l?"":escapeHtml(t.unit||"")}">
    </div>

    <div class="field" style="margin-bottom:16px">
      <label>Target Frequency / Period *</label>
      <select id="mTgtPeriod">
        <option value="day" ${t.period==="day"?"selected":""}>Per Day</option>
        <option value="week" ${t.period==="week"?"selected":""}>Per Week</option>
        <option value="month" ${t.period==="month"?"selected":""}>Per Month</option>
      </select>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mTgtAttachments",label:"Reference Assets & Proofs",subtitle:"Upload reference materials, scripts, guidelines or proof examples"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save Target</button>
    </div>
  `);bindAttachmentUploader("mTgtAttachments",{existing:t.attachments||[]});const u=d.querySelector("#mTgtUnit"),b=d.querySelector("#mTgtCustomUnitWrap"),w=d.querySelector("#mTgtCustomUnit");u.onchange=()=>{u.value==="custom"?(b.style.display="flex",w.focus()):b.style.display="none"},d.querySelector("#mCancel").onclick=()=>d.remove(),d.querySelector("#mSave").onclick=async()=>{let f=u.value;f==="custom"&&(f=w.value.trim()||"Deliverables");const p=getUploaderAttachments("mTgtAttachments"),y={personId:d.querySelector("#mTgtPerson").value,serviceId:d.querySelector("#mTgtService").value,quantity:Number(d.querySelector("#mTgtQty").value)||1,unit:f,period:d.querySelector("#mTgtPeriod").value,attachments:p};if(!y.personId||!y.serviceId){flashToast("Person and Service are required",!0);return}try{s?await apiPost("/targets",y):await apiPut("/targets/"+t._id,y),flashToast("Target saved successfully! 🎯"),d.remove(),x()}catch(a){flashToast(a.message,!0)}}}async function Se(t){const[s,e]=await Promise.all([apiGet("/salary/grades"),apiGet("/salary/assignments")]);h.salaryGrades=s,h.salaryAssignments=e;const i={};e.forEach(n=>i[n.personId]=n.gradeId),t.innerHTML=`
    <section class="block">
      <h2>Salary Grades <span class="eyebrow">Admin only</span></h2>
      <div class="banner">No individual's exact salary is ever entered — each person is placed in a grade band, and only the grade label appears anywhere else in the tool.</div>
      <div class="manage-list">${s.map(n=>`<div class="manage-item"><div><strong>${escapeHtml(n.label)}</strong><div class="muted">${fmtINR(n.min)} – ${fmtINR(n.max)} / month</div></div>
        <div><button class="btn ghost small edit-grade" data-id="${n._id}">Edit</button><button class="btn danger small del-grade" data-id="${n._id}">Remove</button></div></div>`).join("")||'<div style="padding:14px;">No grades yet.</div>'}</div>
      <div style="margin:10px 0 24px;"><button class="btn ghost small" id="addGradeBtn">+ Add Grade</button></div>
      <h3 style="font-size:15px;margin-bottom:8px;">Assign Grades</h3>
      <div class="card"><table><thead><tr><th>Person</th><th>Status</th><th class="num">Grade</th></tr></thead>
      <tbody>${h.personnel.map(n=>`<tr><td><strong>${escapeHtml(n.name)}</strong><div class="muted">${escapeHtml(n.duties||"")}</div></td>
        <td><span class="badge green">${n.status}</span></td>
        <td class="num"><select class="grade-select" data-id="${n._id}"><option value="">Not set</option>${s.map(l=>`<option value="${l._id}" ${i[n._id]===l._id?"selected":""}>${escapeHtml(l.label)}</option>`).join("")}</select></td>
      </tr>`).join("")}</tbody></table></div>
    </section>`,document.getElementById("addGradeBtn").onclick=()=>se(null),document.querySelectorAll(".edit-grade").forEach(n=>n.onclick=()=>se(s.find(l=>l._id===n.dataset.id))),document.querySelectorAll(".del-grade").forEach(n=>n.onclick=async()=>{confirm("Remove grade?")&&(await apiDelete("/salary/grades/"+n.dataset.id),x())}),document.querySelectorAll(".grade-select").forEach(n=>{n.onchange=async()=>{await apiPut("/salary/assignments/"+n.dataset.id,{gradeId:n.value||null}),flashToast("Saved")}})}function se(t){const s=!t;t=t||{label:"",min:0,max:0};const e=openModal(`<h3>${s?"Add":"Edit"} Grade</h3>
    <div class="field"><label>Label</label><input id="gLabel" type="text" value="${escapeHtml(t.label)}"></div>
    <div class="field-row"><div class="field"><label>Range Start (₹)</label><input id="gMin" type="number" value="${t.min}"></div><div class="field"><label>Range End (₹)</label><input id="gMax" type="number" value="${t.max}"></div></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const i={label:e.querySelector("#gLabel").value.trim(),min:Number(e.querySelector("#gMin").value)||0,max:Number(e.querySelector("#gMax").value)||0};if(!i.label){flashToast("Label required",!0);return}try{s?await apiPost("/salary/grades",i):await apiPut("/salary/grades/"+t._id,i),e.remove(),x()}catch(n){flashToast(n.message,!0)}}}function Ie(t){const s={active:"green","work from home":"blue",wfh:"blue","on leave":"amber",inactive:"gray"};t.innerHTML=`
    <section class="block">
      <!-- Personnel Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Team Personnel (${h.personnel.length})</h3>
            <div style="font-size:12px;color:var(--text-3)">Active team members, capacities, and working arrangements</div>
          </div>
          <button class="btn gold small" id="addPersonBtn" type="button">+ Add Person</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Personnel Name</th>
                <th>Duties & Responsibilities</th>
                <th class="num">Weekly Capacity</th>
                <th>Status</th>
                <th class="num">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${h.personnel.map(l=>`
                <tr>
                  <td><strong>${escapeHtml(l.name)}</strong></td>
                  <td>${escapeHtml(l.duties||"—")}</td>
                  <td class="num"><strong>${l.capacity||48} hrs</strong>/wk</td>
                  <td><span class="badge ${s[l.status]||"green"}">${escapeHtml(l.status||"active")}</span></td>
                  <td class="num">
                    <button class="btn ghost small edit-person" data-id="${l._id}">Edit</button>
                    <button class="btn danger small del-person" data-id="${l._id}">Remove</button>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="5"><div class="empty">No personnel added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Clients Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Client Accounts (${h.clients.length})</h3>
            <div style="font-size:12px;color:var(--text-3)">Corporate clients, account details, and brand specifications</div>
          </div>
          <button class="btn gold small" id="addClientBtn" type="button">+ Add Client</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Notes & Description</th>
                <th class="num">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${h.clients.map(l=>`
                <tr>
                  <td><strong>${escapeHtml(l.name)}</strong></td>
                  <td>${l.notes?escapeHtml(l.notes):'<span class="muted">—</span>'}</td>
                  <td class="num">
                    <button class="btn ghost small edit-client" data-id="${l._id}">Edit</button>
                    <button class="btn danger small del-client" data-id="${l._id}">Remove</button>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="3"><div class="empty">No clients added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Services Section -->
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Service Offerings (${h.services.length})</h3>
            <div style="font-size:12px;color:var(--text-3)">Standard deliverable offerings and reference effort hours</div>
          </div>
          <button class="btn gold small" id="addServiceBtn" type="button">+ Add Service</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th class="num">Reference Effort</th>
                <th class="num">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${h.services.map(l=>`
                <tr>
                  <td><strong>${escapeHtml(l.name)}</strong></td>
                  <td class="num"><strong>${l.hours||0} hrs</strong> baseline</td>
                  <td class="num">
                    <button class="btn ghost small edit-service" data-id="${l._id}">Edit</button>
                    <button class="btn danger small del-service" data-id="${l._id}">Remove</button>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="3"><div class="empty">No services added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;const e=document.getElementById("addPersonBtn");e&&(e.onclick=()=>ae(null)),document.querySelectorAll(".edit-person").forEach(l=>l.onclick=()=>ae(h.personnel.find(d=>d._id===l.dataset.id))),document.querySelectorAll(".del-person").forEach(l=>l.onclick=async()=>{confirm("Remove this person?")&&(await apiDelete("/personnel/"+l.dataset.id),await z(),x())});const i=document.getElementById("addClientBtn");i&&(i.onclick=()=>ie(null)),document.querySelectorAll(".edit-client").forEach(l=>l.onclick=()=>ie(h.clients.find(d=>d._id===l.dataset.id))),document.querySelectorAll(".del-client").forEach(l=>l.onclick=async()=>{confirm("Remove this client?")&&(await apiDelete("/clients/"+l.dataset.id),await z(),x())});const n=document.getElementById("addServiceBtn");n&&(n.onclick=()=>le(null)),document.querySelectorAll(".edit-service").forEach(l=>l.onclick=()=>le(h.services.find(d=>d._id===l.dataset.id))),document.querySelectorAll(".del-service").forEach(l=>l.onclick=async()=>{confirm("Remove this service?")&&(await apiDelete("/services/"+l.dataset.id),await z(),x())})}const Te=Ie;function ae(t){const s=!t;t=t||{name:"",duties:"",capacity:48,status:"active",attachments:[]};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Person</h3>
    <div class="field"><label>Full Name *</label><input id="mName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Shatayu Verma"></div>
    <div class="field"><label>Duties / Role</label><input id="mDuties" type="text" value="${escapeHtml(t.duties)}" placeholder="e.g. Lead Designer / Frontend"></div>
    <div class="log-job-row" style="margin-bottom:16px;">
      <div class="field" style="margin-bottom:0;"><label>Weekly Capacity (hrs)</label><input id="mCapacity" type="number" value="${t.capacity||48}"></div>
      <div class="field" style="margin-bottom:0;"><label>Status</label><select id="mStatus">
        <option value="active" ${t.status==="active"?"selected":""}>Active</option>
        <option value="work from home" ${t.status==="work from home"||t.status==="wfh"?"selected":""}>Work From Home</option>
        <option value="on leave" ${t.status==="on leave"||t.status==="pn leave"?"selected":""}>On Leave</option>
        <option value="inactive" ${t.status==="inactive"?"selected":""}>Inactive</option>
      </select></div>
    </div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mPersonFiles",label:"Documents & Contracts",subtitle:"Upload resumes, ID proofs, employment contracts or certificates"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Person</button></div>
  `);bindAttachmentUploader("mPersonFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const i=getUploaderAttachments("mPersonFiles"),n={name:e.querySelector("#mName").value.trim(),duties:e.querySelector("#mDuties").value.trim(),capacity:Number(e.querySelector("#mCapacity").value)||48,status:e.querySelector("#mStatus").value,attachments:i};if(!n.name){flashToast("Name is required",!0);return}try{s?await apiPost("/personnel",n):await apiPut("/personnel/"+t._id,n),await z(),flashToast("Person saved! 📁"),e.remove(),x()}catch(l){flashToast(l.message,!0)}}}function ie(t){const s=!t;t=t||{name:"",notes:"",attachments:[]};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Client</h3>
    <div class="field"><label>Client Name *</label><input id="mCName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Network 18"></div>
    <div class="field"><label>Notes / Contract Details</label><textarea id="mCNotes" placeholder="Client specific notes, contact terms...">${escapeHtml(t.notes||"")}</textarea></div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mClientFiles",label:"Brand Assets & Agreements",subtitle:"Upload brand guidelines, contracts, briefs or logos"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Client</button></div>
  `);bindAttachmentUploader("mClientFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const i=getUploaderAttachments("mClientFiles"),n={name:e.querySelector("#mCName").value.trim(),notes:e.querySelector("#mCNotes").value.trim(),attachments:i};if(!n.name){flashToast("Name is required",!0);return}try{s?await apiPost("/clients",n):await apiPut("/clients/"+t._id,n),await z(),flashToast("Client saved! 📁"),e.remove(),x()}catch(l){flashToast(l.message,!0)}}}function le(t){const s=!t;t=t||{name:"",hours:4};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Service</h3>
    <div class="field"><label>Service Name *</label><input id="mSName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. UI/UX Design"></div>
    <div class="field"><label>Reference Effort (hrs)</label><input id="mSHours" type="number" value="${t.hours||4}" min="0"></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Service</button></div>
  `);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const i={name:e.querySelector("#mSName").value.trim(),hours:Number(e.querySelector("#mSHours").value)||0};if(!i.name){flashToast("Name is required",!0);return}try{s?await apiPost("/services",i):await apiPut("/services/"+t._id,i),await z(),e.remove(),x()}catch(n){flashToast(n.message,!0)}}}async function ce(t){const s=await apiGet("/users");let e="all",i="role",n="";function l(){let c=[...s];if(n){const p=n.toLowerCase();c=c.filter(y=>y.name&&y.name.toLowerCase().includes(p)||y.email&&y.email.toLowerCase().includes(p)||y.role&&y.role.toLowerCase().includes(p))}e==="admin"?c=c.filter(p=>p.role==="superadmin"||p.role==="admin"):e==="employee"?c=c.filter(p=>p.role==="employee"):e==="client"&&(c=c.filter(p=>p.role==="client"));const k={superadmin:1,admin:1,employee:2,client:3};i==="role"?c.sort((p,y)=>{const a=k[p.role]||9,m=k[y.role]||9;return a!==m?a-m:(p.name||"").localeCompare(y.name||"")}):i==="role-desc"?c.sort((p,y)=>{const a=k[p.role]||9,m=k[y.role]||9;return a!==m?m-a:(p.name||"").localeCompare(y.name||"")}):i==="name-asc"?c.sort((p,y)=>(p.name||"").localeCompare(y.name||"")):i==="name-desc"?c.sort((p,y)=>(y.name||"").localeCompare(p.name||"")):i==="status"&&c.sort((p,y)=>(y.active?1:0)-(p.active?1:0));const f=t.querySelector("#userTableBody");if(f){if(c.length===0){f.innerHTML='<tr><td colspan="6"><div class="empty" style="padding:32px 16px">No users found matching the selected filters.</div></td></tr>';return}f.innerHTML=c.map(p=>{const y=p.role==="superadmin"||p.role==="admin",a=p.role==="employee",m=y?'<span class="badge gold" style="font-weight:700">👑 Admin</span>':a?'<span class="badge blue" style="font-weight:700">💼 Employee</span>':'<span class="badge green" style="font-weight:700">🤝 Client</span>',A=p.personnelId?escapeHtml(p.personnelId.name):p.clientId?escapeHtml(p.clientId.name):'<span class="muted">—</span>';return`
        <tr>
          <td style="padding-left:22px">
            <div style="font-weight:700;color:var(--text-1)">${escapeHtml(p.name)}</div>
          </td>
          <td><span style="color:var(--text-2);font-size:13px">${escapeHtml(p.email)}</span></td>
          <td>${m}</td>
          <td>${A}</td>
          <td><span class="badge ${p.active?"green":"gray"}">${p.active?"🟢 Active":"⚪ Disabled"}</span></td>
          <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
            <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
              <button class="btn ghost small edit-user" data-id="${p._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
              <button class="btn danger small del-user" data-id="${p._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
            </div>
          </td>
        </tr>`}).join(""),f.querySelectorAll(".edit-user").forEach(p=>p.onclick=()=>ne(s.find(y=>y._id===p.dataset.id))),f.querySelectorAll(".del-user").forEach(p=>p.onclick=async()=>{if(confirm("Permanently remove this user account?"))try{await apiDelete("/users/"+p.dataset.id),flashToast("User removed"),ce(t)}catch(y){flashToast(y.message,!0)}})}}const d=s.filter(c=>c.role==="superadmin"||c.role==="admin").length,u=s.filter(c=>c.role==="employee").length,b=s.filter(c=>c.role==="client").length;t.innerHTML=`
    <section class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:20px;font-weight:800;color:var(--text-1);margin-bottom:4px;border:none;padding:0">User Accounts</h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">Manage system login credentials for administrators, employees, and clients.</p>
        </div>
        <button class="btn gold small" id="addUserBtn" type="button">+ Add User</button>
      </div>

      <!-- Controls: Filter Chips, Search, Sort Dropdown -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <!-- Filter Tabs -->
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="pchip active user-role-filter" data-role="all">All (${s.length})</button>
          <button class="pchip user-role-filter" data-role="admin">👑 Admins (${d})</button>
          <button class="pchip user-role-filter" data-role="employee">💼 Employees (${u})</button>
          <button class="pchip user-role-filter" data-role="client">🤝 Clients (${b})</button>
        </div>

        <!-- Search & Sort Controls -->
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <input type="text" id="userSearchInp" placeholder="🔍 Search users..." style="width:170px;padding:6px 10px;font-size:12.5px;border-radius:var(--r-sm)">
          
          <div style="display:flex;align-items:center;gap:6px">
            <span style="font-size:12px;font-weight:700;color:var(--text-3);white-space:nowrap">Sort:</span>
            <select id="userSortSel" style="padding:6px 10px;font-size:12.5px;border-radius:var(--r-sm);width:auto">
              <option value="role" selected>Role (Admin → Employee → Client)</option>
              <option value="role-desc">Role (Client → Employee → Admin)</option>
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="status">Status (Active First)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table style="width:100%;border-collapse:collapse;min-width:700px">
            <thead>
              <tr>
                <th style="width:22%;padding-left:22px">Name</th>
                <th style="width:26%">Email / Login</th>
                <th style="width:16%">Role</th>
                <th style="width:18%">Linked Profile</th>
                <th style="width:10%">Status</th>
                <th class="num" style="width:8%;padding-right:22px;text-align:right">Actions</th>
              </tr>
            </thead>
            <tbody id="userTableBody"></tbody>
          </table>
        </div>
      </div>
    </section>`,l(),t.querySelectorAll(".user-role-filter").forEach(c=>{c.onclick=()=>{t.querySelectorAll(".user-role-filter").forEach(k=>k.classList.remove("active")),c.classList.add("active"),e=c.dataset.role,l()}});const w=t.querySelector("#userSortSel");w&&(w.onchange=()=>{i=w.value,l()});const T=t.querySelector("#userSearchInp");T&&(T.oninput=()=>{n=T.value.trim(),l()});const v=t.querySelector("#addUserBtn");v&&(v.onclick=()=>ne(null))}function ne(t){const s=!t;t=t||{name:"",email:"",role:"employee",personnelId:"",clientId:"",active:!0};const e=t.role,i=openModal(`<h3>${s?"Add":"Edit"} User</h3>
    <div class="field-row">
      <div class="field"><label>Name</label><input id="uName" type="text" value="${escapeHtml(t.name)}"></div>
      <div class="field"><label>Email</label><input id="uEmail" type="email" value="${escapeHtml(t.email)}"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Role</label><select id="uRole">
        <option value="superadmin" ${e==="superadmin"?"selected":""}>Admin</option>
        <option value="employee" ${e==="employee"?"selected":""}>Employee</option>
        <option value="client" ${e==="client"?"selected":""}>Client</option></select></div>
      <div class="field"><label>Password ${s?"":"(leave blank to keep current)"}</label><input id="uPassword" type="password"></div>
    </div>
    <div class="field" id="uLinkWrap"></div>
    <div class="field"><label><input type="checkbox" id="uActive" ${t.active?"checked":""}> Active</label></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);function n(){const l=i.querySelector("#uRole").value,d=i.querySelector("#uLinkWrap");l==="employee"?d.innerHTML=`<label>Linked Personnel</label><select id="uPersonnel"><option value="">Select…</option>${h.personnel.map(u=>`<option value="${u._id}" ${t.personnelId&&(t.personnelId._id||t.personnelId)===u._id?"selected":""}>${escapeHtml(u.name)}</option>`).join("")}</select>`:l==="client"?d.innerHTML=`<label>Linked Client</label><select id="uClient"><option value="">Select…</option>${h.clients.map(u=>`<option value="${u._id}" ${t.clientId&&(t.clientId._id||t.clientId)===u._id?"selected":""}>${escapeHtml(u.name)}</option>`).join("")}</select>`:d.innerHTML=""}i.querySelector("#uRole").onchange=n,n(),i.querySelector("#mCancel").onclick=()=>i.remove(),i.querySelector("#mSave").onclick=async()=>{var b,w;const l=i.querySelector("#uRole").value,d={name:i.querySelector("#uName").value.trim(),email:i.querySelector("#uEmail").value.trim(),role:l,active:i.querySelector("#uActive").checked,personnelId:l==="employee"&&((b=i.querySelector("#uPersonnel"))==null?void 0:b.value)||null,clientId:l==="client"&&((w=i.querySelector("#uClient"))==null?void 0:w.value)||null},u=i.querySelector("#uPassword").value;if(u&&(d.password=u),!d.name||!d.email){flashToast("Name and email required",!0);return}if(s&&!u){flashToast("Password required for a new user",!0);return}try{s?await apiPost("/users",d):await apiPut("/users/"+t._id,d),i.remove(),x()}catch(T){flashToast(T.message,!0)}}}let I={date:new Date().toISOString().slice(0,10),personnelId:"all",filter:"all",search:""};function oe(t,s){let e;if(!t||t==="all")e=new Date;else{const d=t.split("-");d.length===3?e=new Date(Number(d[0]),Number(d[1])-1,Number(d[2])):e=new Date}e.setDate(e.getDate()+s);const i=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${i}-${n}-${l}`}async function pe(t){const[s,e]=await Promise.all([apiGet("/tasks"),apiGet("/personnel").catch(()=>h.personnel||[])]),i=new Date,n=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`,l=I.date;let d=s;l!=="all"&&(d=s.filter(r=>r.dueDate?new Date(r.dueDate).toISOString().slice(0,10)===l:l===n));let u=d;I.personnelId!=="all"&&(u=u.filter(r=>{var E;const $=((E=r.personnelId)==null?void 0:E._id)||r.personnelId;return String($)===String(I.personnelId)}));const b=u.length,w=u.filter(r=>r.status==="Completed").length,T=b-w,v=b>0?Math.round(w/b*100):0;let c=u;if(I.filter==="active"?c=c.filter(r=>r.status!=="Completed"):I.filter==="completed"&&(c=c.filter(r=>r.status==="Completed")),I.search){const r=I.search.toLowerCase();c=c.filter($=>{var H,C;const E=(((H=$.personnelId)==null?void 0:H.name)||((C=$.userId)==null?void 0:C.name)||"").toLowerCase(),B=($.title||"").toLowerCase();return E.includes(r)||B.includes(r)})}const k={};c.forEach(r=>{var H,C,M,D,K,Z;const $=((H=r.personnelId)==null?void 0:H._id)||((C=r.userId)==null?void 0:C._id)||"unknown",E=((M=r.personnelId)==null?void 0:M.name)||((D=r.userId)==null?void 0:D.name)||"Unassigned Employee",B=((K=r.personnelId)==null?void 0:K.department)||((Z=r.personnelId)==null?void 0:Z.role)||"Team Member";k[$]||(k[$]={id:$,name:E,dept:B,tasks:[]}),k[$].tasks.push(r)});const f=Object.values(k),p=l===n;t.innerHTML=`
    <div class="block">
      <!-- Top Title & Navigation Bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:22px;font-weight:700;color:var(--navy-900);margin:0 0 2px 0;display:flex;align-items:center;gap:8px">
            <span>Employee Daily Tasks</span>
            <span class="eyebrow">${b} total tasks</span>
          </h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">Live employee daily checklist activity, real-time completion tracking, and submissions</p>
        </div>

        <!-- Date Navigation Bar -->
        <div class="daily-date-nav-bar">
          <button type="button" class="daily-nav-arrow" id="admDailyPrevDayBtn" title="Previous Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button type="button" class="btn ${p?"primary":"ghost"} small" id="admDailyTodayBtn" style="padding:4px 10px;font-size:12px;font-weight:700">
            📅 Today
          </button>

          <input type="date" id="admDailyDatePickerInp" class="daily-date-picker-inp" value="${l==="all"?n:l}">

          <button type="button" class="daily-nav-arrow" id="admDailyNextDayBtn" title="Next Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button type="button" class="btn ${l==="all"?"gold":"ghost"} small" id="admDailyAllDatesBtn" style="padding:4px 10px;font-size:12px">
            All Tasks
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-4" style="margin-bottom:20px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Total Daily Tasks</span><div class="kpi-icon">📝</div></div>
          <div class="kpi-value">${b}</div>
          <div class="kpi-sub">${l==="all"?"Across all dates":p?"Logged for today":l}</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Completed Tasks</span><div class="kpi-icon">✅</div></div>
          <div class="kpi-value" style="color:var(--green-600)">${w}</div>
          <div class="kpi-sub">${v}% achievement rate</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Pending / To Do</span><div class="kpi-icon">⏳</div></div>
          <div class="kpi-value" style="color:var(--amber-600)">${T}</div>
          <div class="kpi-sub">Items in progress</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Active Team Members</span><div class="kpi-icon">👥</div></div>
          <div class="kpi-value">${f.length}</div>
          <div class="kpi-sub">Employees with tasks</div>
        </div>
      </div>

      <!-- Controls & Filter Toolbar -->
      <div class="card" style="padding:14px 18px;margin-bottom:20px;background:var(--bg-card)">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <!-- Left: Filter Chips -->
          <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
            <button class="pchip ${I.filter==="all"?"active":""}" data-atf="all">All (${b})</button>
            <button class="pchip ${I.filter==="active"?"active":""}" data-atf="active">Pending (${T})</button>
            <button class="pchip ${I.filter==="completed"?"active":""}" data-atf="completed">✓ Completed (${w})</button>
          </div>

          <!-- Right: Employee Picker & Search -->
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:6px">
              <span style="font-size:12px;font-weight:700;color:var(--text-3)">Employee:</span>
              <select id="admTaskPersonFilter" style="font-size:12.5px;padding:6px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);outline:none">
                <option value="all" ${I.personnelId==="all"?"selected":""}>All Employees (${e.length})</option>
                ${e.map(r=>`
                  <option value="${r._id}" ${I.personnelId===r._id?"selected":""}>${escapeHtml(r.name)} (${r.role||r.department||"Staff"})</option>
                `).join("")}
              </select>
            </div>

            <div class="ticket-search-box" style="margin:0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="admTaskSearchInp" placeholder="Search tasks or employee…" value="${escapeHtml(I.search)}" style="font-size:12px;padding:5px 8px">
              ${I.search?'<button type="button" id="admTaskClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:11px">✕</button>':""}
            </div>

            ${w>0?`
              <button type="button" class="btn ghost small" onclick="adminClearCompletedTasks('all')" style="font-size:11.5px;color:var(--text-3);padding:5px 10px" title="Delete all completed tasks in this view">
                🗑️ Clear Completed (${w})
              </button>
            `:""}
          </div>
        </div>
      </div>

      <!-- Employee Task Groups List -->
      ${f.length===0?`
        <div class="card" style="text-align:center;padding:56px 20px">
          <div style="font-size:40px;margin-bottom:10px">📋</div>
          <div style="font-weight:700;font-size:16px;color:var(--text-1);margin-bottom:4px">No daily tasks found</div>
          <div style="font-size:13px;color:var(--text-3);max-width:380px;margin:0 auto">No tasks have been entered for this date. When employees add or update tasks on their checklist, they will appear here in real-time.</div>
        </div>
      `:`
        <div style="display:flex;flex-direction:column;gap:18px">
          ${f.map(r=>{const $=r.tasks.length,E=r.tasks.filter(C=>C.status==="Completed").length,B=$>0?Math.round(E/$*100):0,H=$>0&&E===$;return`
              <div class="daily-checklist-card">
                <!-- Employee Header Banner -->
                <div style="padding:16px 20px;background:var(--bg-surface);border-bottom:1px solid var(--border-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
                  <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:36px;height:36px;border-radius:50%;background:var(--brand-500);color:#FFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px">
                      ${r.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style="font-size:15px;font-weight:800;color:var(--text-1);line-height:1.2">${escapeHtml(r.name)}</div>
                      <div style="font-size:11.5px;color:var(--text-3)">${escapeHtml(r.dept)}</div>
                    </div>
                  </div>

                  <div style="display:flex;align-items:center;gap:12px">
                    <span style="font-size:12.5px;font-weight:700;color:${H?"var(--green-600)":"var(--text-2)"}">
                      ${E} of ${$} completed (${B}%)
                    </span>
                    <div style="width:120px;height:8px;background:var(--bg-elevated);border-radius:var(--r-full);overflow:hidden">
                      <div style="width:${B}%;height:100%;background:${H?"var(--green-500)":"var(--brand-500)"};transition:width 0.4s ease"></div>
                    </div>
                    ${E>0?`
                      <button type="button" class="btn ghost small" onclick="adminClearCompletedTasks('${r.id}')" style="font-size:11px;color:var(--text-3);padding:3px 7px" title="Delete completed tasks for this employee">
                        Clear Done (${E})
                      </button>
                    `:""}
                  </div>
                </div>

                <!-- Employee Checklist Items -->
                <div>
                  ${r.tasks.map(C=>{const M=C.status==="Completed",D=C.dueDate?new Date(C.dueDate).toISOString().slice(0,10):"";return`
                      <div class="daily-item-row ${M?"completed":""}" style="padding:12px 20px">
                        <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:0">
                          <button type="button" class="daily-circle-check ${M?"checked":""}" onclick="adminToggleTask('${C._id}')" title="${M?"Mark Incomplete":"Mark Complete"}">
                            ✓
                          </button>
                          <div style="flex:1">
                            <span class="daily-item-text" style="cursor:pointer" onclick="adminToggleTask('${C._id}')">
                              ${escapeHtml(C.title)}
                            </span>
                            ${C.description?`<div style="font-size:12px;color:var(--text-3);margin-top:2px">${escapeHtml(C.description)}</div>`:""}
                          </div>
                        </div>

                        <div class="daily-actions-hover" style="opacity:1">
                          ${D?`<span class="task-tag-pill" style="font-size:10.5px">📅 ${D===n?"Today":D}</span>`:""}
                          ${C.completedAt?'<span class="task-tag-pill" style="color:var(--green-600);background:rgba(16,185,129,0.1);font-size:10.5px">Done</span>':""}
                          <button type="button" class="btn ghost small" onclick="adminDeleteTask('${C._id}')" title="Delete this task" style="padding:3px 7px;font-size:11.5px;color:var(--red-500)">🗑️</button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `;const y=document.getElementById("admDailyPrevDayBtn");y&&(y.onclick=()=>{I.date=oe(I.date,-1),x()});const a=document.getElementById("admDailyNextDayBtn");a&&(a.onclick=()=>{I.date=oe(I.date,1),x()});const m=document.getElementById("admDailyTodayBtn");m&&(m.onclick=()=>{I.date=n,x()});const A=document.getElementById("admDailyAllDatesBtn");A&&(A.onclick=()=>{I.date=I.date==="all"?n:"all",x()});const P=document.getElementById("admDailyDatePickerInp");P&&(P.onchange=r=>{r.target.value&&(I.date=r.target.value,x())}),document.querySelectorAll("[data-atf]").forEach(r=>{r.onclick=()=>{I.filter=r.dataset.atf,x()}});const N=document.getElementById("admTaskPersonFilter");N&&(N.onchange=r=>{I.personnelId=r.target.value,x()});const q=document.getElementById("admTaskSearchInp");q&&(q.oninput=r=>{I.search=r.target.value,pe(t)});const o=document.getElementById("admTaskClearSearch");o&&(o.onclick=()=>{I.search="",x()})}window.adminToggleTask=async function(t){try{await apiPatch("/tasks/"+t+"/toggle",{}),flashToast("Task status updated"),x()}catch(s){flashToast(s.message,!0)}};window.adminDeleteTask=async function(t){if(confirm("Delete this task?"))try{await apiDelete("/tasks/"+t),flashToast("Task deleted"),x()}catch(s){flashToast(s.message,!0)}};window.adminClearCompletedTasks=async function(t){if(confirm("Delete completed tasks?"))try{const s={date:I.date};t&&t!=="all"?s.personnelId=t:I.personnelId&&I.personnelId!=="all"&&(s.personnelId=I.personnelId);const e=await apiPost("/tasks/clear-completed",s);flashToast(`Completed tasks deleted (${e.deletedCount||0} removed) 🗑️`),x()}catch(s){flashToast(s.message,!0)}};me();
