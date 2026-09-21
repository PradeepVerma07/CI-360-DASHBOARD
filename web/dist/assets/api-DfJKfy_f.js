(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}})();const ot="/api";function U(){return localStorage.getItem("ci360_token")}function Z(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function nt(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function H(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function st(t){const i=U(),e=Z();return!i||!e?(window.location.href="/login.html",null):t&&e.role!==t&&e.role!=="superadmin"?(window.location.href=e.role==="superadmin"?"/admin.html":e.role==="employee"?"/employee.html":"/client.html",null):e}async function I(t,i={}){const e=U(),o=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(o.Authorization="Bearer "+e);const a=await fetch(ot+t,Object.assign({},i,{headers:o}));if(a.status===401)throw H(),window.location.href="/login.html",new Error("Session expired");let s=null;try{s=await a.json()}catch{}if(!a.ok)throw new Error(s&&s.error||"Server status "+a.status+" — Backend waking up, please retry in 10s.");return s}const q=t=>I(t,{method:"GET"}),O=(t,i)=>I(t,{method:"POST",body:JSON.stringify(i)}),D=(t,i)=>I(t,{method:"PUT",body:JSON.stringify(i)}),at=(t,i)=>I(t,{method:"PATCH",body:JSON.stringify(i)}),F=t=>I(t,{method:"DELETE"});function lt(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function rt(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function p(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function z(t){return t?new Date(t).toISOString().slice(0,10):"—"}function S(){return localStorage.getItem("ci360_theme")||"light"}function A(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(i=>{i.classList.toggle("active",i.dataset.theme===t)})}function ct(){const t=S();document.documentElement.setAttribute("data-theme",t)}function b(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function X(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function _(){H(),window.location.href="/login.html"}function tt(){return`
    <div class="notif-wrapper">
      <button id="notifBellBtn" type="button" class="notif-bell-btn" title="Notifications" aria-label="Notifications">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span id="notifBadge" class="notif-badge" style="display:none">0</span>
      </button>
      <div id="notifDropdown" class="notif-dropdown" style="display:none">
        <div class="notif-dropdown-header">
          <strong>🔔 Notifications <span id="notifUnreadBadge" style="font-size:11px;font-weight:700;color:var(--brand-500)"></span></strong>
          <div style="display:flex;gap:6px;align-items:center">
            <button id="markAllReadBtn" type="button" class="btn ghost small" style="font-size:10.5px;padding:2px 7px;">Mark Read</button>
            <button id="clearNotifBtn" type="button" class="btn ghost small" style="font-size:10.5px;padding:2px 7px;">Clear</button>
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
    </div>`}function et(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),o=document.getElementById("notifList"),a=document.getElementById("clearNotifBtn"),s=document.getElementById("markAllReadBtn"),n=document.getElementById("notifUnreadBadge");if(!t||!i)return;let r=[],m="all";function v(l){return l?l.startsWith("task_completed")?"🎉":l.startsWith("task_due")?"⚡":l.startsWith("task")?"✅":l.startsWith("target_completed")?"🎉":l.startsWith("target")?"🎯":l.startsWith("job_due")?"⏳":l.startsWith("job")?"📋":l.startsWith("ticket")?"🎫":l.startsWith("status")?"🔄":"🔔":"🔔"}function $(l){if(!l)return"";const d=new Date(l),x=Math.floor((new Date-d)/1e3);if(x<60)return"Just now";const M=Math.floor(x/60);if(M<60)return`${M}m ago`;const c=Math.floor(M/60);if(c<24)return`${c}h ago`;const g=Math.floor(c/24);return g===1?"Yesterday":g<7?`${g}d ago`:z(l)}function f(){if(!o)return;let l=r;if(m==="task"?l=r.filter(d=>(d.type||"").includes("task")):m==="target"?l=r.filter(d=>(d.type||"").includes("target")):m==="job"?l=r.filter(d=>(d.type||"").includes("job")):m==="ticket"&&(l=r.filter(d=>(d.type||"").includes("ticket"))),l.length===0){o.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${m==="all"?"":m+" "}notifications</div>`;return}o.innerHTML=l.map(d=>{const w=v(d.type);return`
        <div class="notif-item ${d.read?"":"unread"}" data-id="${d._id}" data-type="${p(d.type||"")}">
          <div class="notif-icon">${w}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${p(d.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${$(d.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${p(d.message)}</div>
          </div>
        </div>`}).join(""),o.querySelectorAll(".notif-item").forEach(d=>{d.onclick=async()=>{const w=d.dataset.id,x=d.dataset.type;if(w&&d.classList.contains("unread")){d.classList.remove("unread");try{await I(`/notifications/${w}/read`,{method:"PATCH"})}catch{}}x&&x.includes("task")&&typeof window.ci360NavTab=="function"&&(i.style.display="none",window.ci360NavTab("dailytasks"))}})}async function h(){try{const l=await q("/notifications");r=l.notifications||[];const d=l.unreadCount||0;e.textContent=d>99?"99+":d,e.style.display=d>0?"flex":"none",n&&(n.textContent=d>0?`(${d} new)`:""),f()}catch{o&&r.length===0&&(o.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}h();const k=setInterval(h,25e3);window.addEventListener("beforeunload",()=>clearInterval(k)),i.querySelectorAll(".notif-filter-btn").forEach(l=>{l.onclick=d=>{d.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(w=>w.classList.remove("active")),l.classList.add("active"),m=l.dataset.filter,f()}}),t.onclick=l=>{l.stopPropagation();const d=i.style.display==="block";i.style.display=d?"none":"block",d||h()},s&&(s.onclick=async l=>{l.stopPropagation();try{await I("/notifications/read",{method:"PATCH"}),e.style.display="none",n&&(n.textContent=""),r.forEach(d=>d.read=!0),f(),b("All notifications marked as read")}catch(d){b(d.message,!0)}}),document.addEventListener("click",l=>{!i.contains(l.target)&&l.target!==t&&(i.style.display="none")}),a&&(a.onclick=async l=>{l.stopPropagation();try{await F("/notifications"),r=[],o.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",n&&(n.textContent=""),b("Notifications cleared")}catch(d){b(d.message,!0)}})}function dt({user:t,currentRole:i,activeTab:e,tabs:o,title:a,subtitle:s}){const n=t&&t.name?t.name.charAt(0).toUpperCase():"U",r=t&&t.role==="superadmin"?"Super Admin":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",m=t&&t.name?t.name:"User",v=t&&t.email?t.email:t&&t.username?t.username:"",$=o&&o.some(l=>l.key==="logjob"),f=o&&o.find(l=>l.key===e),h=a||f&&f.label||"Dashboard";let k=[];return i==="superadmin"?k=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(e),isMore:!0}]:i==="employee"?k=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:e==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"tickets",label:"Tickets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>',active:e==="tickets"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:e==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","tickets","targets"].includes(e),isMore:!0}]:k=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"jobs",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:e==="jobs"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","team"].includes(e),isMore:!0}],`
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
          ${o.map(l=>`
            <button type="button" class="sidebar-item ${e===l.key?"active":""}" data-tab="${l.key}" aria-current="${e===l.key?"page":"false"}">
              <span class="icon">${l.icon||"📌"}</span>
              <span>${l.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${n}</div>
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

            <!-- Mobile Brand Title (Mockup Left: Cyan Checkmark Badge + CI360) -->
            <div class="mobile-brand-title">
              <div class="mobile-brand-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#06b6d4" stroke-width="2.5" />
                  <path d="M8 12.5l2.8 2.8 5.2-5.6" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="mobile-brand-text">CI360</span>
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
                <span class="topbar-crumb-active">${p(h)}</span>
              </div>
              <div class="topbar-title-row">
                <h1 class="page-heading-title">${p(h)}</h1>
                ${s?`<span class="topbar-subtitle-pill" title="${p(s)}">${p(s)}</span>`:""}
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

            ${$?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${S()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${S()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${tt()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${n}</span>
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
                    <div class="tud-avatar">${n}</div>
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
                      <span class="tud-icon">${S()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${S()==="dark"?"Light":"Dark"} Mode</span>
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
          ${k.map(l=>`
            <button type="button" class="mbn-item ${l.active?"active":""}" data-tab="${l.key}" ${l.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${l.iconSvg}</span>
              <span class="mbn-label">${p(l.label)}</span>
              ${l.active?'<span class="mbn-active-dot"></span>':""}
            </button>
          `).join("")}
        </nav>

        <!-- Mobile More Sheet Backdrop & Slide-up Drawer -->
        <div class="mobile-more-backdrop" id="mobileMoreBackdrop" aria-hidden="true">
          <div class="mobile-more-sheet" id="mobileMoreSheet" role="dialog" aria-modal="true" aria-label="All Navigation Items">
            <div class="mms-handle-wrap"><div class="mms-drag-handle"></div></div>
            <div class="mms-header">
              <div class="mms-title">Navigation & Actions</div>
              <button type="button" class="mms-close-btn" id="mmsCloseBtn" aria-label="Close menu">✕</button>
            </div>
            <div class="mms-grid">
              ${o.map(l=>`
                <button type="button" class="mms-card ${e===l.key?"active":""}" data-tab="${l.key}">
                  <span class="mms-card-icon">${l.icon||"📌"}</span>
                  <span class="mms-card-label">${p(l.label)}</span>
                </button>
              `).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${S()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
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
    </div>`}function pt(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),o=document.getElementById("sidebarOverlay");function a(){e&&e.classList.add("open"),o&&o.classList.add("open")}function s(){e&&e.classList.remove("open"),o&&o.classList.remove("open")}i&&(i.onclick=a),o&&(o.onclick=s);const n=document.getElementById("mobileMoreBackdrop"),r=document.getElementById("mobileMoreSheet"),m=document.getElementById("mmsCloseBtn"),v=document.getElementById("mobileMoreBtn");function $(){n&&n.classList.add("active"),r&&r.classList.add("active")}function f(){n&&n.classList.remove("active"),r&&r.classList.remove("active")}v&&(v.onclick=u=>{u.stopPropagation(),$()}),m&&(m.onclick=f),n&&(n.onclick=u=>{u.target===n&&f()}),document.querySelectorAll(".mbn-item").forEach(u=>{u.dataset.tab&&u.dataset.tab!=="__more__"&&(u.onclick=()=>{f(),t&&t(u.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(u=>{u.onclick=()=>{f(),t&&t(u.dataset.tab)}});const h=document.getElementById("mmsToggleThemeBtn");h&&(h.onclick=()=>{const u=S()==="dark"?"light":"dark";A(u);const y=h.querySelector("span");y&&(y.textContent=u==="dark"?"☀️ Light Mode":"🌙 Dark Mode")});const k=document.getElementById("mmsNotifsBtn");k&&(k.onclick=()=>{f();const u=document.getElementById("notifBellBtn");u&&u.click()});const l=document.getElementById("mmsLogoutBtn");l&&(l.onclick=_);const d=document.getElementById("mobileCalBtn");d&&(d.onclick=()=>{const u=document.querySelector(".period-row");u&&(u.scrollIntoView({behavior:"smooth",block:"center"}),u.classList.add("pulse-highlight"),setTimeout(()=>u.classList.remove("pulse-highlight"),1200))});const w=document.getElementById("tudMobileNotifsBtn");w&&(w.onclick=u=>{u.stopPropagation();const y=document.getElementById("topbarUserDropdown");y&&(y.style.display="none");const C=document.getElementById("notifBellBtn");C&&C.click()});const x=document.getElementById("tudMobileSettingsBtn");x&&(x.onclick=u=>{u.stopPropagation();const y=document.getElementById("topbarUserDropdown");y&&(y.style.display="none"),document.querySelector('[data-tab="manage"]')&&t?t("manage"):$()});const M=document.getElementById("tudMobileHelpBtn");M&&(M.onclick=u=>{u.stopPropagation();const y=document.getElementById("topbarUserDropdown");y&&(y.style.display="none"),document.querySelector('[data-tab="tickets"]')&&t?t("tickets"):X(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `)});const c=document.getElementById("logoutBtnMobile");c&&(c.onclick=_);const g=document.getElementById("topbarUserBtn"),E=document.getElementById("topbarUserDropdown");g&&E&&(g.onclick=u=>{u.stopPropagation();const y=E.style.display!=="none";E.style.display=y?"none":"block",g.setAttribute("aria-expanded",String(!y));const C=document.getElementById("notifDropdown");C&&(C.style.display="none")},document.addEventListener("click",u=>{!E.contains(u.target)&&!g.contains(u.target)&&(E.style.display="none",g.setAttribute("aria-expanded","false"))}));const N=document.getElementById("tudThemeToggleBtn");N&&(N.onclick=()=>{const u=S()==="dark"?"light":"dark";A(u);const y=N.querySelector(".tud-icon"),C=N.querySelector(".tud-label");y&&(y.textContent=u==="dark"?"☀️":"🌙"),C&&(C.textContent=`Switch to ${u==="dark"?"Light":"Dark"} Mode`)});const Q=document.getElementById("topbarQuickLogJobBtn");Q&&(Q.onclick=()=>{t&&t("logjob")});const G=document.getElementById("logoutBtn");G&&(G.onclick=_),et(),document.querySelectorAll(".sidebar-item").forEach(u=>{u.onclick=()=>{s(),t&&t(u.dataset.tab)}}),ut(t)}function ut(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),o=document.getElementById("cmdResultsList"),a=document.getElementById("topbarCmdTrigger"),s=document.getElementById("topbarCmdTriggerMobile"),n=document.getElementById("tudCmdBtn"),r=document.getElementById("cmdCloseKbd");if(!i||!e||!o)return;const m=Array.from(document.querySelectorAll(".sidebar-item")),v=m.map(c=>{var g,E;return{type:"tab",id:c.dataset.tab,label:((g=c.querySelector("span:last-child"))==null?void 0:g.textContent)||c.dataset.tab,icon:((E=c.querySelector(".icon"))==null?void 0:E.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(c.dataset.tab)}}});m.some(c=>c.dataset.tab==="logjob")&&v.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),v.push({type:"action",id:"toggle-theme",label:S()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{A(S()==="dark"?"light":"dark")}}),v.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const c=document.getElementById("notifBellBtn");c&&c.click()}}),v.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>_()});let f=0,h=[...v];function k(){if(!h.length){o.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}o.innerHTML=h.map((c,g)=>`
      <div class="cmd-result ${g===f?"selected":""}" data-idx="${g}">
        <div class="cmd-result-icon">${c.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${p(c.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${p(c.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),o.querySelectorAll(".cmd-result").forEach(c=>{c.onmouseenter=()=>{f=Number(c.dataset.idx),l()},c.onclick=()=>{d(Number(c.dataset.idx))}})}function l(){o.querySelectorAll(".cmd-result").forEach((c,g)=>{c.classList.toggle("selected",g===f)})}function d(c){const g=h[c];g&&g.action&&(x(),g.action())}function w(){const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),i.classList.add("open"),e.value="",h=[...v],f=0,k(),setTimeout(()=>e.focus(),50)}function x(){i.classList.remove("open"),e.blur()}a&&(a.onclick=w),s&&(s.onclick=w),n&&(n.onclick=()=>{const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),w()}),r&&(r.onclick=x),i.onclick=c=>{c.target===i&&x()},e.oninput=()=>{const c=e.value.trim().toLowerCase();c?h=v.filter(g=>g.label.toLowerCase().includes(c)||g.sub.toLowerCase().includes(c)):h=[...v],f=0,k()},e.onkeydown=c=>{if(c.key==="ArrowDown"){if(c.preventDefault(),h.length>0){f=(f+1)%h.length,l();const g=o.querySelector(".cmd-result.selected");g&&g.scrollIntoView({block:"nearest"})}}else if(c.key==="ArrowUp"){if(c.preventDefault(),h.length>0){f=(f-1+h.length)%h.length,l();const g=o.querySelector(".cmd-result.selected");g&&g.scrollIntoView({block:"nearest"})}}else c.key==="Enter"?(c.preventDefault(),d(f)):c.key==="Escape"&&(c.preventDefault(),x())};const M=c=>{(c.metaKey||c.ctrlKey)&&c.key.toLowerCase()==="k"?(c.preventDefault(),i.classList.contains("open")?x():w()):c.key==="Escape"&&i.classList.contains("open")&&x()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=M,window.addEventListener("keydown",M)}function mt(t=4){return`
    <div class="grid grid-${Math.min(t,4)}" style="margin-bottom:24px">
      ${Array(t).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function vt(t,i,e="📁",o=""){return`
    <div class="empty">
      <span class="empty-icon">${e}</span>
      <h3>${p(t)}</h3>
      <p>${p(i)}</p>
      ${o}
    </div>`}function gt(t,i,e="",o="📊",a=""){let s="";return a&&(s=`<span class="kpi-trend ${a.startsWith("+")||a.includes("↑")||a.toLowerCase().includes("up")?"up":"down"}">${p(a)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${p(t)}</span>
        <div class="kpi-icon">${o}</div>
      </div>
      <div class="kpi-value">${p(i)}</div>
      <div class="kpi-sub">${s}<span>${p(e)}</span></div>
    </div>`}function ft(t,i="gray"){return`<span class="badge ${i}">${p(t)}</span>`}function ht(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function bt(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,o])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${o}</button>`).join("")}</div>`}function yt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function Y(t){if(!t)return"";const i=new Date,e=new Date(t),o=Math.floor((i-e)/1e3);if(o<60)return"Just now";const a=Math.floor(o/60);if(a<60)return`${a}m ago`;const s=Math.floor(a/60);if(s<24)return`${s}h ago`;const n=Math.floor(s/24);return n<7?`${n}d ago`:z(t)}function j(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],o=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,o)).toFixed(1))+" "+e[o]}function T(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function kt(t){return t?T(t.name||t.filename||"",t.type||"").cls==="img":!1}function J(t){if(!t||!t.url)return;const i=T(t.name,t.type),e=i.cls==="img",o=i.cls==="pdf",a=p(t.name||"Attachment"),s=j(t.size),n=document.createElement("div");n.className="preview-modal-overlay",n.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${a}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${s})</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${t.url}" download="${a}" target="_blank" class="btn ghost small" style="font-size:12px;padding:4px 10px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
          <button type="button" class="btn ghost small preview-modal-close" style="padding:4px 8px;font-size:14px">✕</button>
        </div>
      </div>
      <div class="preview-modal-body">
        ${e?`
          <img src="${t.url}" alt="${a}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${t.url}','_blank')">
        `:o?`
          <iframe src="${t.url}" title="${a}"></iframe>
        `:`
          <div style="text-align:center;padding:40px 20px">
            <div style="font-size:48px;margin-bottom:12px">${i.icon}</div>
            <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${a}</div>
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${s}</div>
            <a href="${t.url}" download="${a}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `}
      </div>
    </div>
  `,n.onclick=r=>{(r.target===n||r.target.closest(".preview-modal-close"))&&n.remove()},document.body.appendChild(n)}function P(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${p(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((o,a)=>{const s=T(o.name,o.type),n=p(o.name||"File"),r=j(o.size);return`
            <div class="attachment-chip" data-idx="${a}" title="${n} (${r})">
              <span class="file-type-icon ${s.cls}" style="width:22px;height:22px;font-size:12px">${s.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${a}, this)">${n}</span>
              <span class="attachment-chip-size">${r}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${a}, this)">👁️</button>
                <a href="${o.url}" download="${n}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${e?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${a}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const B={};async function R(t){const i=Array.from(t||[]);if(!i.length)return[];const o=(await Promise.all(i.map(async a=>new Promise(s=>{const n=new FileReader;n.onload=()=>{s({name:a.name,type:a.type,size:a.size,base64:n.result,data:n.result})},n.onerror=()=>s(null),n.readAsDataURL(a)})))).filter(Boolean);if(!o.length)return[];try{const a=await O("/upload",{files:o});if(a&&a.files&&a.files.length)return a.files}catch(a){console.warn("Backend upload failed, fallback to base64 data URLs:",a)}return o.map(a=>({name:a.name,url:a.base64,size:a.size,type:a.type,uploadedAt:new Date}))}function V({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:o=!0,accept:a="*/*",maxFiles:s=10}={}){return`
    <div class="uploader-container" id="container-${t}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${p(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${t}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${t}">
        <input type="file" id="input-${t}" ${o?"multiple":""} accept="${a}" style="display:none">
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
  `}function K(t,i={}){const e=document.getElementById("zone-"+t),o=document.getElementById("input-"+t),a=document.getElementById("list-"+t),s=document.getElementById("count-"+t);B[t]=i.existing?[...i.existing]:[];function n(){const r=B[t]||[];if(s&&(s.textContent=`${r.length} file${r.length===1?"":"s"} attached`),!!a){if(!r.length){a.innerHTML="";return}a.innerHTML=r.map((m,v)=>{const $=T(m.name,m.type),f=p(m.name||"File"),h=j(m.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${$.cls}">${$.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${f}">${f}</div>
              <div class="uploader-file-size">${$.label} · ${h}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${v})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${v})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(r)}}window.__removeUploaderFile=(r,m)=>{if(B[r]){B[r].splice(m,1);const v=window[`__update_${r}`];v&&v()}},window.__previewUploaderFile=(r,m)=>{const v=(B[r]||[])[m];v&&J(v)},window[`__update_${t}`]=n,e&&o&&(e.onclick=r=>{r.target.tagName!=="BUTTON"&&!r.target.closest("button")&&o.click()},e.ondragover=r=>{r.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async r=>{if(r.preventDefault(),e.classList.remove("dragover"),r.dataTransfer&&r.dataTransfer.files&&r.dataTransfer.files.length){b("Uploading files… ⏳");const m=await R(r.dataTransfer.files);B[t]=[...B[t]||[],...m],n(),b("Files attached! ✓")}},o.onchange=async()=>{if(o.files&&o.files.length){b("Uploading files… ⏳");const r=await R(o.files);B[t]=[...B[t]||[],...r],n(),b("Files attached! ✓"),o.value=""}}),n()}function W(t){return B[t]||[]}function it(t,i=[]){B[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const o=i.closest(".attachment-chip");if(!o)return;const a=Number(o.dataset.idx),s=e.dataset.attachments;if(s)try{const n=JSON.parse(decodeURIComponent(s));n[a]&&J(n[a])}catch{}};function wt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
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
        ${V({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const xt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},$t={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function Bt(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),o=t.status==="Open",a=(t._id||"").slice(-4).toUpperCase(),s=yt(t.userName),n=encodeURIComponent(JSON.stringify(t.attachments||[])),r=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${a}</span>
            <span class="ticket-subject">${p(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${xt[t.status]||"gray"}">
            ${o?'<span class="pulse-dot"></span>':""} ${p(t.status)}
          </span>
          <span class="badge ${$t[t.priority]||"gray"}">${p(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${s}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${p(t.userName)}
            <span class="ticket-role-pill">${p(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${Y(t.createdAt)} · ${z(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${p(t.message)}</div>

      ${t.attachments&&t.attachments.length?`
        <div data-attachments="${n}">
          ${P(t.attachments,{title:"Ticket Attachments"})}
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
                ${P(t.adminAttachments,{title:"Support Attached Files"})}
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
            ${V({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function L(t,i,e){const o=document.getElementById("tklist-"+i),a=document.getElementById("tkcnt-"+i);if(o)try{const s=await q("/tickets/job/"+t);a&&(a.textContent=s.length),s.length?(o.innerHTML=s.map(n=>Bt(n,e)).join(""),St(t,i,e,o,s)):o.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{o.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function St(t,i,e,o,a){e&&(o.querySelectorAll(".tk-status-sel").forEach(s=>{s.onchange=async()=>{try{await D("/tickets/"+s.dataset.tkid,{status:s.value}),b("Status updated"),L(t,i,e)}catch(n){b(n.message,!0)}}}),o.querySelectorAll(".tk-quick-resolve-btn").forEach(s=>{s.onclick=async()=>{try{await D("/tickets/"+s.dataset.tkid,{status:"Resolved"}),b("Ticket marked as Resolved! 🎉"),L(t,i,e)}catch(n){b(n.message,!0)}}}),o.querySelectorAll(".ticket-template-btn").forEach(s=>{s.onclick=()=>{const n=document.getElementById("tkreplytxt-"+s.dataset.tkid);n&&(n.value=s.dataset.tpl,n.focus())}}),o.querySelectorAll(".tk-reply-toggle").forEach(s=>{s.onclick=()=>{const n=s.dataset.tkid,r=document.getElementById("tkreplyform-"+n);if(r){r.classList.toggle("show");const m=a.find(v=>v._id===n);K("tkreplyup-"+n,{existing:m?m.adminAttachments:[]})}}}),o.querySelectorAll(".tk-reply-cancel").forEach(s=>{s.onclick=()=>{const n=document.getElementById("tkreplyform-"+s.dataset.tkid);n&&n.classList.remove("show")}}),o.querySelectorAll(".tk-reply-save").forEach(s=>{s.onclick=async()=>{const n=s.dataset.tkid,r=document.getElementById("tkreplytxt-"+n);if(!r)return;const m=W("tkreplyup-"+n);try{await D("/tickets/"+n,{adminReply:r.value.trim(),adminAttachments:m}),b("Response saved! 🛡️"),L(t,i,e)}catch(v){b(v.message,!0)}}}),o.querySelectorAll(".tk-del-btn").forEach(s=>{s.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await F("/tickets/"+s.dataset.tkid),b("Ticket deleted"),L(t,i,e)}catch(n){b(n.message,!0)}}}))}function Mt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");L(t,e,i),K("tkup-"+e);const o=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);o&&(o.onclick=()=>{const n=document.getElementById("tkform-"+e);if(!n)return;const r=n.style.display==="block";n.style.display=r?"none":"block",o.textContent=r?"+ Raise Ticket":"✕ Cancel"});const a=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);a&&(a.onclick=()=>{const n=document.getElementById("tkform-"+e);n&&(n.style.display="none"),o&&(o.textContent="+ Raise Ticket")});const s=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);s&&(s.onclick=async()=>{var $,f;const n=($=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:$.trim(),r=(f=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:f.trim(),m=(document.getElementById("tkpri-"+e)||{}).value,v=W("tkup-"+e);if(!n){b("Please enter a subject",!0);return}if(!r){b("Please enter a message",!0);return}s.disabled=!0,s.textContent="Submitting…";try{await O("/tickets",{jobId:t,subject:n,message:r,priority:m,attachments:v}),b("Ticket submitted! 🎫");const h=document.getElementById("tkform-"+e);h&&(h.style.display="none"),o&&(o.textContent="+ Raise Ticket");const k=document.getElementById("tksub-"+e),l=document.getElementById("tkmsg-"+e);k&&(k.value=""),l&&(l.value=""),it("tkup-"+e,[]),L(t,e,i)}catch(h){b(h.message,!0)}finally{s.disabled=!1,s.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function Ct(){return""}function Et(){}window.__setTheme=function(t){A(t)};Object.assign(window,{getToken:U,getUser:Z,setSession:nt,clearSession:H,requireAuth:st,initTheme:ct,api:I,apiGet:q,apiPost:O,apiPut:D,apiPatch:at,apiDelete:F,fmtINR:lt,fmtHours:rt,escapeHtml:p,fmtDate:z,flashToast:b,openModal:X,logout:_,getTheme:S,setTheme:A,fmtFileSize:j,getFileCategory:T,isImageAttachment:kt,openFilePreviewModal:J,renderAttachmentChips:P,uploadFilesToServer:R,renderAttachmentUploader:V,bindAttachmentUploader:K,getUploaderAttachments:W,setUploaderAttachments:it,renderRoleSwitcher:Ct,bindRoleSwitcher:Et,renderNotificationBell:tt,initNotificationBell:et,renderAppShell:dt,bindAppShellEvents:pt,renderSkeletonCards:mt,renderEmptyState:vt,renderKpiCard:gt,renderBadge:ft,renderProgressBar:ht,renderPeriodPicker:bt,renderSupportTicketSection:wt,bindSupportTicketSection:Mt});export{U as a,O as b,Z as g,nt as s};
