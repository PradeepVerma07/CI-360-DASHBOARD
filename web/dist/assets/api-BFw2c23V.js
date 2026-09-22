(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(l){if(l.ep)return;l.ep=!0;const a=e(l);fetch(l.href,a)}})();const ot="/api";function q(){return localStorage.getItem("ci360_token")}function Z(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function nt(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function O(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function st(t){const i=q(),e=Z();return!i||!e?(window.location.href="/login.html",null):t&&e.role!==t&&e.role!=="superadmin"?(window.location.href=e.role==="superadmin"?"/admin.html":e.role==="employee"?"/employee.html":"/client.html",null):e}async function I(t,i={}){const e=q(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(n.Authorization="Bearer "+e);const l=await fetch(ot+t,Object.assign({},i,{headers:n}));if(l.status===401)throw O(),window.location.href="/login.html",new Error("Session expired");let a=null;try{a=await l.json()}catch{}if(!l.ok)throw new Error(a&&a.error||"Server status "+l.status+" — Backend waking up, please retry in 10s.");return a}const F=t=>I(t,{method:"GET"}),J=(t,i)=>I(t,{method:"POST",body:JSON.stringify(i)}),j=(t,i)=>I(t,{method:"PUT",body:JSON.stringify(i)}),at=(t,i)=>I(t,{method:"PATCH",body:JSON.stringify(i)}),V=t=>I(t,{method:"DELETE"});function lt(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function rt(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function p(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function P(t){return t?new Date(t).toISOString().slice(0,10):"—"}function C(){return localStorage.getItem("ci360_theme")||"light"}function D(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(i=>{i.classList.toggle("active",i.dataset.theme===t)})}function ct(){const t=C();document.documentElement.setAttribute("data-theme",t)}function h(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function X(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function N(){O(),window.location.href="/login.html"}function tt(){return`
    <div class="notif-wrapper">
      <button id="notifBellBtn" type="button" class="notif-bell-btn" title="Notifications" aria-label="Notifications">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span id="notifBadge" class="notif-badge" style="display:none">0</span>
      </button>
      <div id="notifBackdrop" class="notif-backdrop" style="display:none"></div>
      <div id="notifDropdown" class="notif-dropdown" style="display:none">
        <div class="notif-dropdown-header">
          <strong>🔔 Notifications <span id="notifUnreadBadge" style="font-size:11px;font-weight:700;color:var(--brand-500)"></span></strong>
          <div style="display:flex;gap:6px;align-items:center">
            <button id="markAllReadBtn" type="button" class="btn ghost small" style="font-size:10.5px;padding:2px 7px;">Mark Read</button>
            <button id="clearNotifBtn" type="button" class="btn ghost small" style="font-size:10.5px;padding:2px 7px;">Clear</button>
            <button id="notifCloseBtn" type="button" class="notif-mobile-close" aria-label="Close notifications">✕</button>
          </div>
        </div>
        <div class="notif-filters">
          <button type="button" class="notif-filter-btn active" data-filter="all">All</button>
          <button type="button" class="notif-filter-btn" data-filter="task">✅ Tasks</button>
          <button type="button" class="notif-filter-btn" data-filter="target">🎯 Targets</button>
          <button type="button" class="notif-filter-btn" data-filter="job">📋 Jobs</button>
          <button type="button" class="notif-filter-btn" data-filter="ticket">🎫 Tickets</button>
        </div>
        <div class="notif-list" id="notifList">
          <div class="empty" style="padding:24px 16px;font-size:12.5px;">Loading notifications…</div>
        </div>
      </div>
    </div>`}function et(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),n=document.getElementById("notifList"),l=document.getElementById("clearNotifBtn"),a=document.getElementById("markAllReadBtn"),s=document.getElementById("notifUnreadBadge");if(!t||!i)return;let r=[],m="all";function v(o){return o?o.startsWith("task_completed")?"🎉":o.startsWith("task_due")?"⚡":o.startsWith("task")?"✅":o.startsWith("target_completed")?"🎉":o.startsWith("target")?"🎯":o.startsWith("job_due")?"⏳":o.startsWith("job")?"📋":o.startsWith("ticket")?"🎫":o.startsWith("status")?"🔄":"🔔":"🔔"}function x(o){if(!o)return"";const c=new Date(o),k=Math.floor((new Date-c)/1e3);if(k<60)return"Just now";const L=Math.floor(k/60);if(L<60)return`${L}m ago`;const T=Math.floor(L/60);if(T<24)return`${T}h ago`;const d=Math.floor(T/24);return d===1?"Yesterday":d<7?`${d}d ago`:P(o)}function g(){if(!n)return;let o=r;if(m==="task"?o=r.filter(c=>(c.type||"").includes("task")):m==="target"?o=r.filter(c=>(c.type||"").includes("target")):m==="job"?o=r.filter(c=>(c.type||"").includes("job")):m==="ticket"&&(o=r.filter(c=>(c.type||"").includes("ticket"))),o.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${m==="all"?"":m+" "}notifications</div>`;return}n.innerHTML=o.map(c=>{const y=v(c.type);return`
        <div class="notif-item ${c.read?"":"unread"}" data-id="${c._id}" data-type="${p(c.type||"")}">
          <div class="notif-icon">${y}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${p(c.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${x(c.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${p(c.message)}</div>
          </div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(c=>{c.onclick=async()=>{const y=c.dataset.id,k=c.dataset.type;if(y&&c.classList.contains("unread")){c.classList.remove("unread");try{await I(`/notifications/${y}/read`,{method:"PATCH"})}catch{}}B(),k&&k.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):k&&k.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("jobs"):k&&k.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):k&&k.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}})}async function f(){try{const o=await F("/notifications");r=o.notifications||[];const c=o.unreadCount||0;e.textContent=c>99?"99+":c,e.style.display=c>0?"flex":"none",s&&(s.textContent=c>0?`(${c} new)`:""),g()}catch{n&&r.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}f();const w=setInterval(f,25e3);window.addEventListener("beforeunload",()=>clearInterval(w)),i.querySelectorAll(".notif-filter-btn").forEach(o=>{o.onclick=c=>{c.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(y=>y.classList.remove("active")),o.classList.add("active"),m=o.dataset.filter,g()}});const u=document.getElementById("notifBackdrop");function E(){i.style.display="flex",i.classList.add("open"),u&&(u.style.display="block",u.classList.add("open")),t.setAttribute("aria-expanded","true");const o=document.getElementById("topbarUserDropdown");o&&(o.style.display="none"),f()}function B(){i.style.display="none",i.classList.remove("open"),u&&(u.style.display="none",u.classList.remove("open")),t.setAttribute("aria-expanded","false")}function $(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?B():E()}window.ci360CloseNotifications=B;const M=document.getElementById("notifCloseBtn");M&&(M.onclick=o=>{o.stopPropagation(),B()}),u&&(u.onclick=o=>{o.stopPropagation(),B()}),t.onclick=o=>{o.stopPropagation(),$()},a&&(a.onclick=async o=>{o.stopPropagation();try{await I("/notifications/read",{method:"PATCH"}),e.style.display="none",s&&(s.textContent=""),r.forEach(c=>c.read=!0),g(),h("All notifications marked as read")}catch(c){h(c.message,!0)}}),document.addEventListener("click",o=>{!i.contains(o.target)&&o.target!==t&&(i.style.display="none")}),l&&(l.onclick=async o=>{o.stopPropagation();try{await V("/notifications"),r=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",s&&(s.textContent=""),h("Notifications cleared")}catch(c){h(c.message,!0)}})}function dt({user:t,currentRole:i,activeTab:e,tabs:n,title:l,subtitle:a}){const s=t&&t.name?t.name.charAt(0).toUpperCase():"U",r=t&&t.role==="superadmin"?"Super Admin":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",m=t&&t.name?t.name:"User",v=t&&t.email?t.email:t&&t.username?t.username:"",x=n&&n.some(u=>u.key==="logjob"),g=n&&n.find(u=>u.key===e),f=l||g&&g.label||"Dashboard";let w=[];return i==="superadmin"?w=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(e),isMore:!0}]:i==="employee"?w=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:e==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"tickets",label:"Tickets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>',active:e==="tickets"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:e==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","tickets","targets"].includes(e),isMore:!0}]:w=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"jobs",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:e==="jobs"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","team"].includes(e),isMore:!0}],`
    <div class="app-shell">
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
      <aside class="app-sidebar" id="appSidebar">
        <div class="sidebar-brand">
          <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img">
          <div class="brand-info">
            <h1>CI360</h1>
            <div class="tag">Intelligence Suite</div>
          </div>
        </div>
        <nav class="sidebar-nav" role="navigation" aria-label="Main navigation">
          <div class="nav-group-label">Navigation</div>
          ${n.map(u=>`
            <button type="button" class="sidebar-item ${e===u.key?"active":""}" data-tab="${u.key}" aria-current="${e===u.key?"page":"false"}">
              <span class="icon">${u.icon||"📌"}</span>
              <span>${u.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${s}</div>
          <div class="user-details">
            <div class="name">${p(t?t.name:"User")}</div>
            <div class="role">${p(r)}</div>
          </div>
        </div>
      </aside>

      <main class="app-main" role="main">
        <header class="app-topbar">
          <!-- Left: Mobile Toggle & Mobile Brand & Breadcrumbs -->
          <div class="topbar-left">
            <button type="button" class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open navigation">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>

            <!-- Mobile Brand Title (Same Logo as Desktop) -->
            <div class="mobile-brand-title">
              <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img mobile-brand-logo-img">
              <div class="mobile-brand-info">
                <span class="mobile-brand-text">CI360</span>
                <span class="mobile-brand-tag">Intelligence</span>
              </div>
            </div>

            <div class="topbar-breadcrumb-wrap">
              <div class="topbar-breadcrumbs">
                <span class="topbar-crumb-app">
                  <span class="status-indicator-dot"></span>
                  CI360
                </span>
                <span class="topbar-crumb-sep">/</span>
                <span class="topbar-crumb-portal">${p(r)}</span>
                <span class="topbar-crumb-sep">/</span>
                <span class="topbar-crumb-active">${p(f)}</span>
              </div>
              <div class="topbar-title-row">
                <h1 class="page-heading-title">${p(f)}</h1>
                ${a?`<span class="topbar-subtitle-pill" title="${p(a)}">${p(a)}</span>`:""}
              </div>
            </div>
          </div>

          <!-- Center: Command Palette Trigger -->
          <div class="topbar-center">
            <button type="button" class="cmd-trigger" id="topbarCmdTrigger" aria-label="Search and command palette">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span class="cmd-trigger-text">Search commands, tabs…</span>
              <kbd class="cmd-kbd">⌘K</kbd>
            </button>
          </div>

          <!-- Right: Actions, Theme, Notifications & User Menu -->
          <div class="topbar-right">
            <!-- Mobile Calendar Button (Mockup Right Item 1) -->
            <button type="button" class="mobile-topbar-btn" id="mobileCalBtn" aria-label="Select Period" title="Select Period">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </button>

            <button type="button" class="cmd-trigger-mobile" id="topbarCmdTriggerMobile" title="Quick Search (⌘K)" aria-label="Quick Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>

            ${x?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${C()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${C()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${tt()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${s}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${p(m)}</span>
                  <span class="topbar-user-role-badge">${p(r)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${s}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${p(m)}</div>
                      ${v?`<div class="tud-email">${p(v)}</div>`:""}
                      <span class="tud-role-chip">${p(r)}</span>
                    </div>
                  </div>
                  <div class="tud-divider"></div>
                  <div class="tud-items">
                    <button type="button" class="tud-item" id="tudCmdBtn" role="menuitem">
                      <span class="tud-icon">⚡</span>
                      <span class="tud-label">Command Palette</span>
                      <kbd class="tud-kbd">⌘K</kbd>
                    </button>
                    <button type="button" class="tud-item" id="tudThemeToggleBtn" role="menuitem">
                      <span class="tud-icon">${C()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${C()==="dark"?"Light":"Dark"} Mode</span>
                    </button>
                    <div class="tud-item-static">
                      <span class="tud-icon">🛡️</span>
                      <span class="tud-label">Session: Verified</span>
                    </div>
                  </div>
                  <div class="tud-divider"></div>
                  <div class="tud-items">
                    <button type="button" class="tud-item danger" id="logoutBtn" role="menuitem">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      <span class="tud-label">Sign out</span>
                    </button>
                  </div>
                </div>

                <!-- Mobile Dropdown Popover matching User Mockup -->
                <div class="tud-mobile-only">
                  <div class="tud-mobile-list">
                    <button type="button" class="tud-mobile-item" id="tudMobileNotifsBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                        <span>Notifications</span>
                      </div>
                      <div class="tmi-right">
                        <span class="tmi-badge" id="tudMobileNotifBadge">3</span>
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    <button type="button" class="tud-mobile-item" id="tudMobileSettingsBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        <span>Settings</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    <button type="button" class="tud-mobile-item" id="tudMobileHelpBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <span>Help & Support</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    <button type="button" class="tud-mobile-item danger" id="logoutBtnMobile" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span>Logout</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Global Command Palette Modal -->
        <div id="cmdPaletteBackdrop" class="cmd-backdrop" aria-hidden="true">
          <div class="cmd-dialog" role="dialog" aria-modal="true" aria-label="Command Palette">
            <div class="cmd-input-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="cmdSearchInput" placeholder="Type a command or jump to tab..." autocomplete="off" spellcheck="false">
              <kbd class="cmd-kbd" id="cmdCloseKbd">ESC</kbd>
            </div>
            <div class="cmd-results" id="cmdResultsList"></div>
            <div class="cmd-footer">
              <span class="cmd-footer-hint"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span class="cmd-footer-hint"><kbd>↵</kbd> select</span>
              <span class="cmd-footer-hint"><kbd>esc</kbd> close</span>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="app-content">
          <div id="content"></div>
        </div>

        <!-- Mobile Bottom Navigation Dock (Matching Mockup 5 Tabs) -->
        <nav class="mobile-bottom-nav" id="mobileBottomNav" aria-label="Mobile Navigation">
          ${w.map(u=>`
            <button type="button" class="mbn-item ${u.active?"active":""}" data-tab="${u.key}" ${u.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${u.iconSvg}</span>
              <span class="mbn-label">${p(u.label)}</span>
              ${u.active?'<span class="mbn-active-dot"></span>':""}
            </button>
          `).join("")}
        </nav>

        <!-- Mobile More Sheet Backdrop & Slide-up Drawer -->
        <div class="mobile-more-backdrop" id="mobileMoreBackdrop" aria-hidden="true">
          <div class="mobile-more-sheet" id="mobileMoreSheet" role="dialog" aria-modal="true" aria-label="All Navigation Items">
            <div class="mms-handle-wrap"><div class="mms-drag-handle"></div></div>
            <div class="mms-header">
              <div class="mms-brand">
                <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img mms-brand-logo-img">
                <div class="mms-brand-info">
                  <span class="mms-title">CI360</span>
                  <span class="mms-subtitle">Suite Navigation</span>
                </div>
              </div>
              <button type="button" class="mms-close-btn" id="mmsCloseBtn" aria-label="Close menu">✕</button>
            </div>
            <div class="mms-grid">
              ${n.map(u=>`
                <button type="button" class="mms-card ${e===u.key?"active":""}" data-tab="${u.key}">
                  <span class="mms-card-icon">${u.icon||"📌"}</span>
                  <span class="mms-card-label">${p(u.label)}</span>
                </button>
              `).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${C()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
              </button>
              <button type="button" class="btn ghost small mms-action-btn" id="mmsNotifsBtn">
                <span>🔔 Notifications</span>
              </button>
              <button type="button" class="btn ghost small danger mms-action-btn" id="mmsLogoutBtn">
                <span>🚪 Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>`}function pt(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function l(){e&&e.classList.add("open"),n&&n.classList.add("open")}function a(){e&&e.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=l),n&&(n.onclick=a);const s=document.getElementById("mobileMoreBackdrop"),r=document.getElementById("mobileMoreSheet"),m=document.getElementById("mmsCloseBtn"),v=document.getElementById("mobileMoreBtn");function x(){s&&s.classList.add("active"),r&&r.classList.add("active")}function g(){s&&s.classList.remove("active"),r&&r.classList.remove("active")}v&&(v.onclick=d=>{d.stopPropagation(),x()}),m&&(m.onclick=g),s&&(s.onclick=d=>{d.target===s&&g()}),document.querySelectorAll(".mbn-item").forEach(d=>{d.dataset.tab&&d.dataset.tab!=="__more__"&&(d.onclick=()=>{g(),t&&t(d.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(d=>{d.onclick=()=>{g(),t&&t(d.dataset.tab)}});const f=document.getElementById("mmsToggleThemeBtn");f&&(f.onclick=()=>{const d=C()==="dark"?"light":"dark";D(d);const b=f.querySelector("span");b&&(b.textContent=d==="dark"?"☀️ Light Mode":"🌙 Dark Mode")});const w=document.getElementById("mmsNotifsBtn");w&&(w.onclick=()=>{g();const d=document.getElementById("notifBellBtn");d&&d.click()});const u=document.getElementById("mmsLogoutBtn");u&&(u.onclick=N);const E=document.getElementById("mobileCalBtn");E&&(E.onclick=()=>{const d=document.querySelector(".period-row");d&&(d.scrollIntoView({behavior:"smooth",block:"center"}),d.classList.add("pulse-highlight"),setTimeout(()=>d.classList.remove("pulse-highlight"),1200))});const B=document.getElementById("tudMobileNotifsBtn");B&&(B.onclick=d=>{d.stopPropagation();const b=document.getElementById("topbarUserDropdown");b&&(b.style.display="none");const _=document.getElementById("notifBellBtn");_&&_.click()});const $=document.getElementById("tudMobileSettingsBtn");$&&($.onclick=d=>{d.stopPropagation();const b=document.getElementById("topbarUserDropdown");b&&(b.style.display="none"),document.querySelector('[data-tab="manage"]')&&t?t("manage"):x()});const M=document.getElementById("tudMobileHelpBtn");M&&(M.onclick=d=>{d.stopPropagation();const b=document.getElementById("topbarUserDropdown");b&&(b.style.display="none"),document.querySelector('[data-tab="tickets"]')&&t?t("tickets"):X(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `)});const o=document.getElementById("logoutBtnMobile");o&&(o.onclick=N);const c=document.getElementById("topbarUserBtn"),y=document.getElementById("topbarUserDropdown");c&&y&&(c.onclick=d=>{d.stopPropagation();const b=y.style.display!=="none";y.style.display=b?"none":"block",c.setAttribute("aria-expanded",String(!b)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",d=>{!y.contains(d.target)&&!c.contains(d.target)&&(y.style.display="none",c.setAttribute("aria-expanded","false"))}));const k=document.getElementById("tudThemeToggleBtn");k&&(k.onclick=()=>{const d=C()==="dark"?"light":"dark";D(d);const b=k.querySelector(".tud-icon"),_=k.querySelector(".tud-label");b&&(b.textContent=d==="dark"?"☀️":"🌙"),_&&(_.textContent=`Switch to ${d==="dark"?"Light":"Dark"} Mode`)});const L=document.getElementById("topbarQuickLogJobBtn");L&&(L.onclick=()=>{t&&t("logjob")});const T=document.getElementById("logoutBtn");T&&(T.onclick=N),et(),document.querySelectorAll(".sidebar-item").forEach(d=>{d.onclick=()=>{a(),t&&t(d.dataset.tab)}}),ut(t)}function ut(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),l=document.getElementById("topbarCmdTrigger"),a=document.getElementById("topbarCmdTriggerMobile"),s=document.getElementById("tudCmdBtn"),r=document.getElementById("cmdCloseKbd");if(!i||!e||!n)return;const m=Array.from(document.querySelectorAll(".sidebar-item")),v=m.map(o=>{var c,y;return{type:"tab",id:o.dataset.tab,label:((c=o.querySelector("span:last-child"))==null?void 0:c.textContent)||o.dataset.tab,icon:((y=o.querySelector(".icon"))==null?void 0:y.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(o.dataset.tab)}}});m.some(o=>o.dataset.tab==="logjob")&&v.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),v.push({type:"action",id:"toggle-theme",label:C()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{D(C()==="dark"?"light":"dark")}}),v.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const o=document.getElementById("notifBellBtn");o&&o.click()}}),v.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>N()});let g=0,f=[...v];function w(){if(!f.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=f.map((o,c)=>`
      <div class="cmd-result ${c===g?"selected":""}" data-idx="${c}">
        <div class="cmd-result-icon">${o.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${p(o.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${p(o.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(o=>{o.onmouseenter=()=>{g=Number(o.dataset.idx),u()},o.onclick=()=>{E(Number(o.dataset.idx))}})}function u(){n.querySelectorAll(".cmd-result").forEach((o,c)=>{o.classList.toggle("selected",c===g)})}function E(o){const c=f[o];c&&c.action&&($(),c.action())}function B(){const o=document.getElementById("topbarUserDropdown");o&&(o.style.display="none"),i.classList.add("open"),e.value="",f=[...v],g=0,w(),setTimeout(()=>e.focus(),50)}function $(){i.classList.remove("open"),e.blur()}l&&(l.onclick=B),a&&(a.onclick=B),s&&(s.onclick=()=>{const o=document.getElementById("topbarUserDropdown");o&&(o.style.display="none"),B()}),r&&(r.onclick=$),i.onclick=o=>{o.target===i&&$()},e.oninput=()=>{const o=e.value.trim().toLowerCase();o?f=v.filter(c=>c.label.toLowerCase().includes(o)||c.sub.toLowerCase().includes(o)):f=[...v],g=0,w()},e.onkeydown=o=>{if(o.key==="ArrowDown"){if(o.preventDefault(),f.length>0){g=(g+1)%f.length,u();const c=n.querySelector(".cmd-result.selected");c&&c.scrollIntoView({block:"nearest"})}}else if(o.key==="ArrowUp"){if(o.preventDefault(),f.length>0){g=(g-1+f.length)%f.length,u();const c=n.querySelector(".cmd-result.selected");c&&c.scrollIntoView({block:"nearest"})}}else o.key==="Enter"?(o.preventDefault(),E(g)):o.key==="Escape"&&(o.preventDefault(),$())};const M=o=>{(o.metaKey||o.ctrlKey)&&o.key.toLowerCase()==="k"?(o.preventDefault(),i.classList.contains("open")?$():B()):o.key==="Escape"&&i.classList.contains("open")&&$()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=M,window.addEventListener("keydown",M)}function mt(t=4){return`
    <div class="grid grid-${Math.min(t,4)}" style="margin-bottom:24px">
      ${Array(t).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function vt(t,i,e="📁",n=""){return`
    <div class="empty">
      <span class="empty-icon">${e}</span>
      <h3>${p(t)}</h3>
      <p>${p(i)}</p>
      ${n}
    </div>`}function gt(t,i,e="",n="📊",l=""){let a="";return l&&(a=`<span class="kpi-trend ${l.startsWith("+")||l.includes("↑")||l.toLowerCase().includes("up")?"up":"down"}">${p(l)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${p(t)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${p(i)}</div>
      <div class="kpi-sub">${a}<span>${p(e)}</span></div>
    </div>`}function ft(t,i="gray"){return`<span class="badge ${i}">${p(t)}</span>`}function ht(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function bt(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,n])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${n}</button>`).join("")}</div>`}function yt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function Y(t){if(!t)return"";const i=new Date,e=new Date(t),n=Math.floor((i-e)/1e3);if(n<60)return"Just now";const l=Math.floor(n/60);if(l<60)return`${l}m ago`;const a=Math.floor(l/60);if(a<24)return`${a}h ago`;const s=Math.floor(a/24);return s<7?`${s}d ago`:P(t)}function U(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],n=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,n)).toFixed(1))+" "+e[n]}function z(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function kt(t){return t?z(t.name||t.filename||"",t.type||"").cls==="img":!1}function K(t){if(!t||!t.url)return;const i=z(t.name,t.type),e=i.cls==="img",n=i.cls==="pdf",l=p(t.name||"Attachment"),a=U(t.size),s=document.createElement("div");s.className="preview-modal-overlay",s.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${l}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${a})</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${t.url}" download="${l}" target="_blank" class="btn ghost small" style="font-size:12px;padding:4px 10px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
          <button type="button" class="btn ghost small preview-modal-close" style="padding:4px 8px;font-size:14px">✕</button>
        </div>
      </div>
      <div class="preview-modal-body">
        ${e?`
          <img src="${t.url}" alt="${l}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${t.url}','_blank')">
        `:n?`
          <iframe src="${t.url}" title="${l}"></iframe>
        `:`
          <div style="text-align:center;padding:40px 20px">
            <div style="font-size:48px;margin-bottom:12px">${i.icon}</div>
            <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${l}</div>
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${a}</div>
            <a href="${t.url}" download="${l}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `}
      </div>
    </div>
  `,s.onclick=r=>{(r.target===s||r.target.closest(".preview-modal-close"))&&s.remove()},document.body.appendChild(s)}function R(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${p(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((n,l)=>{const a=z(n.name,n.type),s=p(n.name||"File"),r=U(n.size);return`
            <div class="attachment-chip" data-idx="${l}" title="${s} (${r})">
              <span class="file-type-icon ${a.cls}" style="width:22px;height:22px;font-size:12px">${a.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${l}, this)">${s}</span>
              <span class="attachment-chip-size">${r}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${l}, this)">👁️</button>
                <a href="${n.url}" download="${s}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${e?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${l}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const S={};async function H(t){const i=Array.from(t||[]);if(!i.length)return[];const n=(await Promise.all(i.map(async l=>new Promise(a=>{const s=new FileReader;s.onload=()=>{a({name:l.name,type:l.type,size:l.size,base64:s.result,data:s.result})},s.onerror=()=>a(null),s.readAsDataURL(l)})))).filter(Boolean);if(!n.length)return[];try{const l=await J("/upload",{files:n});if(l&&l.files&&l.files.length)return l.files}catch(l){console.warn("Backend upload failed, fallback to base64 data URLs:",l)}return n.map(l=>({name:l.name,url:l.base64,size:l.size,type:l.type,uploadedAt:new Date}))}function W({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:n=!0,accept:l="*/*",maxFiles:a=10}={}){return`
    <div class="uploader-container" id="container-${t}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${p(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${t}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${t}">
        <input type="file" id="input-${t}" ${n?"multiple":""} accept="${l}" style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${p(e)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${t}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${t}"></div>
    </div>
  `}function Q(t,i={}){const e=document.getElementById("zone-"+t),n=document.getElementById("input-"+t),l=document.getElementById("list-"+t),a=document.getElementById("count-"+t);S[t]=i.existing?[...i.existing]:[];function s(){const r=S[t]||[];if(a&&(a.textContent=`${r.length} file${r.length===1?"":"s"} attached`),!!l){if(!r.length){l.innerHTML="";return}l.innerHTML=r.map((m,v)=>{const x=z(m.name,m.type),g=p(m.name||"File"),f=U(m.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${x.cls}">${x.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${g}">${g}</div>
              <div class="uploader-file-size">${x.label} · ${f}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${v})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${v})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(r)}}window.__removeUploaderFile=(r,m)=>{if(S[r]){S[r].splice(m,1);const v=window[`__update_${r}`];v&&v()}},window.__previewUploaderFile=(r,m)=>{const v=(S[r]||[])[m];v&&K(v)},window[`__update_${t}`]=s,e&&n&&(e.onclick=r=>{r.target.tagName!=="BUTTON"&&!r.target.closest("button")&&n.click()},e.ondragover=r=>{r.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async r=>{if(r.preventDefault(),e.classList.remove("dragover"),r.dataTransfer&&r.dataTransfer.files&&r.dataTransfer.files.length){h("Uploading files… ⏳");const m=await H(r.dataTransfer.files);S[t]=[...S[t]||[],...m],s(),h("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){h("Uploading files… ⏳");const r=await H(n.files);S[t]=[...S[t]||[],...r],s(),h("Files attached! ✓"),n.value=""}}),s()}function G(t){return S[t]||[]}function it(t,i=[]){S[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const n=i.closest(".attachment-chip");if(!n)return;const l=Number(n.dataset.idx),a=e.dataset.attachments;if(a)try{const s=JSON.parse(decodeURIComponent(a));s[l]&&K(s[l])}catch{}};function wt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
    <div class="ticket-section" id="tksec-${e}">
      <div class="ticket-section-header">
        <div class="ticket-section-title">
          <span style="font-size:14px">🎫</span>
          <span>Support &amp; Feedback</span>
          <span class="ticket-count-pill" id="tkcnt-${e}">0</span>
        </div>
        <button type="button" class="btn ghost small ticket-toggle-btn" data-jobid="${t}" data-safeid="${e}">
          + Raise Ticket
        </button>
      </div>

      <div class="ticket-create-form" id="tkform-${e}">
        <div class="form-grid-2">
          <div class="field">
            <label>Subject / Issue *</label>
            <input type="text" id="tksub-${e}" placeholder="e.g. Revision required for Instagram Reel" />
          </div>
          <div class="field">
            <label>Priority</label>
            <select id="tkpri-${e}">
              <option value="Medium" selected>🟡 Medium</option>
              <option value="Low">🟢 Low</option>
              <option value="High">🟠 High</option>
              <option value="Urgent">🔴 Urgent</option>
            </select>
          </div>
        </div>
        <div class="field" style="margin-bottom:10px">
          <label>Detailed Description *</label>
          <textarea id="tkmsg-${e}" rows="3" placeholder="Provide full details, feedback, or blockers so the team can resolve it quickly…"></textarea>
        </div>
        ${W({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
          <button type="button" class="btn ghost small tk-cancel-btn" data-safeid="${e}">Cancel</button>
          <button type="button" class="btn gold small tk-submit-btn" data-jobid="${t}" data-safeid="${e}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Ticket
          </button>
        </div>
      </div>

      <div class="ticket-list" id="tklist-${e}">
        <div style="font-size:12px;color:var(--text-4);padding:8px 0;display:flex;align-items:center;gap:6px">
          <span class="pulse-dot"></span> Loading tickets…
        </div>
      </div>
    </div>`}const xt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},Bt={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function $t(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),n=t.status==="Open",l=(t._id||"").slice(-4).toUpperCase(),a=yt(t.userName),s=encodeURIComponent(JSON.stringify(t.attachments||[])),r=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${l}</span>
            <span class="ticket-subject">${p(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${xt[t.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${p(t.status)}
          </span>
          <span class="badge ${Bt[t.priority]||"gray"}">${p(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${a}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${p(t.userName)}
            <span class="ticket-role-pill">${p(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${Y(t.createdAt)} · ${P(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${p(t.message)}</div>

      ${t.attachments&&t.attachments.length?`
        <div data-attachments="${s}">
          ${R(t.attachments,{title:"Ticket Attachments"})}
        </div>
      `:""}

      ${t.adminReply?`
        <div class="ticket-thread-wrap">
          <div class="ticket-admin-reply-card">
            <div class="ticket-admin-reply-header">
              <span class="ticket-shield-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Support Team Response
              </span>
              ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${Y(t.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${p(t.adminReply)}</div>
            ${t.adminAttachments&&t.adminAttachments.length?`
              <div data-attachments="${r}">
                ${R(t.adminAttachments,{title:"Support Attached Files"})}
              </div>
            `:""}
          </div>
        </div>`:""}

      ${i?`
        <div class="ticket-toolbar">
          <label style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Status:</label>
          <select class="tk-status-sel" data-tkid="${t._id}" style="font-size:12px;padding:5px 8px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1)">
            <option value="Open" ${t.status==="Open"?"selected":""}>🔴 Open</option>
            <option value="In Review" ${t.status==="In Review"?"selected":""}>🟡 In Review</option>
            <option value="Resolved" ${t.status==="Resolved"?"selected":""}>🟢 Resolved</option>
            <option value="Closed" ${t.status==="Closed"?"selected":""}>⚪ Closed</option>
          </select>

          <button class="btn ghost small tk-reply-toggle" data-tkid="${t._id}" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ${t.adminReply?"Edit Reply":"💬 Reply"}
          </button>

          ${t.status!=="Resolved"?`
            <button class="btn ghost small tk-quick-resolve-btn" data-tkid="${t._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
              ✓ Quick Resolve
            </button>`:""}

          <button class="btn danger small tk-del-btn" data-tkid="${t._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>

          <div class="ticket-reply-form" id="tkreplyform-${t._id}">
            <div class="ticket-templates-bar">
              <span style="font-size:10px;font-weight:700;color:var(--text-4);text-transform:uppercase;align-self:center">Quick:</span>
              <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="We are actively investigating this and will update you shortly.">🔍 Investigating</button>
              <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="This issue has been resolved and the updates have been saved.">✅ Resolved</button>
              <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="Could you please provide more details so we can assist further?">ℹ️ Need Info</button>
            </div>
            <textarea id="tkreplytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${p(t.adminReply||"")}</textarea>
            ${W({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function A(t,i,e){const n=document.getElementById("tklist-"+i),l=document.getElementById("tkcnt-"+i);if(n)try{const a=await F("/tickets/job/"+t);l&&(l.textContent=a.length),a.length?(n.innerHTML=a.map(s=>$t(s,e)).join(""),St(t,i,e,n,a)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function St(t,i,e,n,l){e&&(n.querySelectorAll(".tk-status-sel").forEach(a=>{a.onchange=async()=>{try{await j("/tickets/"+a.dataset.tkid,{status:a.value}),h("Status updated"),A(t,i,e)}catch(s){h(s.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(a=>{a.onclick=async()=>{try{await j("/tickets/"+a.dataset.tkid,{status:"Resolved"}),h("Ticket marked as Resolved! 🎉"),A(t,i,e)}catch(s){h(s.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(a=>{a.onclick=()=>{const s=document.getElementById("tkreplytxt-"+a.dataset.tkid);s&&(s.value=a.dataset.tpl,s.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(a=>{a.onclick=()=>{const s=a.dataset.tkid,r=document.getElementById("tkreplyform-"+s);if(r){r.classList.toggle("show");const m=l.find(v=>v._id===s);Q("tkreplyup-"+s,{existing:m?m.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(a=>{a.onclick=()=>{const s=document.getElementById("tkreplyform-"+a.dataset.tkid);s&&s.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(a=>{a.onclick=async()=>{const s=a.dataset.tkid,r=document.getElementById("tkreplytxt-"+s);if(!r)return;const m=G("tkreplyup-"+s);try{await j("/tickets/"+s,{adminReply:r.value.trim(),adminAttachments:m}),h("Response saved! 🛡️"),A(t,i,e)}catch(v){h(v.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(a=>{a.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await V("/tickets/"+a.dataset.tkid),h("Ticket deleted"),A(t,i,e)}catch(s){h(s.message,!0)}}}))}function Ct(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");A(t,e,i),Q("tkup-"+e);const n=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const s=document.getElementById("tkform-"+e);if(!s)return;const r=s.style.display==="block";s.style.display=r?"none":"block",n.textContent=r?"+ Raise Ticket":"✕ Cancel"});const l=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);l&&(l.onclick=()=>{const s=document.getElementById("tkform-"+e);s&&(s.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const a=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);a&&(a.onclick=async()=>{var x,g;const s=(x=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:x.trim(),r=(g=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:g.trim(),m=(document.getElementById("tkpri-"+e)||{}).value,v=G("tkup-"+e);if(!s){h("Please enter a subject",!0);return}if(!r){h("Please enter a message",!0);return}a.disabled=!0,a.textContent="Submitting…";try{await J("/tickets",{jobId:t,subject:s,message:r,priority:m,attachments:v}),h("Ticket submitted! 🎫");const f=document.getElementById("tkform-"+e);f&&(f.style.display="none"),n&&(n.textContent="+ Raise Ticket");const w=document.getElementById("tksub-"+e),u=document.getElementById("tkmsg-"+e);w&&(w.value=""),u&&(u.value=""),it("tkup-"+e,[]),A(t,e,i)}catch(f){h(f.message,!0)}finally{a.disabled=!1,a.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function Mt(){return""}function It(){}window.__setTheme=function(t){D(t)};Object.assign(window,{getToken:q,getUser:Z,setSession:nt,clearSession:O,requireAuth:st,initTheme:ct,api:I,apiGet:F,apiPost:J,apiPut:j,apiPatch:at,apiDelete:V,fmtINR:lt,fmtHours:rt,escapeHtml:p,fmtDate:P,flashToast:h,openModal:X,logout:N,getTheme:C,setTheme:D,fmtFileSize:U,getFileCategory:z,isImageAttachment:kt,openFilePreviewModal:K,renderAttachmentChips:R,uploadFilesToServer:H,renderAttachmentUploader:W,bindAttachmentUploader:Q,getUploaderAttachments:G,setUploaderAttachments:it,renderRoleSwitcher:Mt,bindRoleSwitcher:It,renderNotificationBell:tt,initNotificationBell:et,renderAppShell:dt,bindAppShellEvents:pt,renderSkeletonCards:mt,renderEmptyState:vt,renderKpiCard:gt,renderBadge:ft,renderProgressBar:ht,renderPeriodPicker:bt,renderSupportTicketSection:wt,bindSupportTicketSection:Ct});export{q as a,J as b,Z as g,nt as s};
