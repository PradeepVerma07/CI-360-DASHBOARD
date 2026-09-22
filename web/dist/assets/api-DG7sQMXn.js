(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(l){if(l.ep)return;l.ep=!0;const o=e(l);fetch(l.href,o)}})();const st="/api";function O(){return localStorage.getItem("ci360_token")}function X(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function at(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function F(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function lt(t){const i=O(),e=X();return!i||!e?(window.location.href="/login.html",null):t&&e.role!==t&&e.role!=="superadmin"?(window.location.href=e.role==="superadmin"?"/admin.html":e.role==="employee"?"/employee.html":"/client.html",null):e}async function I(t,i={}){const e=O(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(n.Authorization="Bearer "+e);const l=await fetch(st+t,Object.assign({},i,{headers:n}));if(l.status===401)throw F(),window.location.href="/login.html",new Error("Session expired");let o=null;try{o=await l.json()}catch{}if(!l.ok)throw new Error(o&&o.error||"Server status "+l.status+" — Backend waking up, please retry in 10s.");return o}const J=t=>I(t,{method:"GET"}),V=(t,i)=>I(t,{method:"POST",body:JSON.stringify(i)}),P=(t,i)=>I(t,{method:"PUT",body:JSON.stringify(i)}),rt=(t,i)=>I(t,{method:"PATCH",body:JSON.stringify(i)}),K=t=>I(t,{method:"DELETE"});function ct(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function dt(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function d(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function U(t){return t?new Date(t).toISOString().slice(0,10):"—"}function x(){return localStorage.getItem("ci360_theme")||"light"}function N(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const l=document.getElementById("mmsToggleThemeBtn");if(l){const o=l.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function tt(){const t=x();document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),a=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),a&&(a.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const l=document.getElementById("mmsToggleThemeBtn");if(l){const o=l.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{tt()}catch{}function h(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function et(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function D(){F(),window.location.href="/login.html"}function it(){return`
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
    </div>`}function ot(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),n=document.getElementById("notifList"),l=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),a=document.getElementById("notifUnreadBadge");if(!t||!i)return;let r=[],m="all";function g(s){return s?s.startsWith("task_completed")?"🎉":s.startsWith("task_due")?"⚡":s.startsWith("task")?"✅":s.startsWith("target_completed")?"🎉":s.startsWith("target")?"🎯":s.startsWith("job_due")?"⏳":s.startsWith("job")?"📋":s.startsWith("ticket")?"🎫":s.startsWith("status")?"🔄":"🔔":"🔔"}function w(s){if(!s)return"";const c=new Date(s),b=Math.floor((new Date-c)/1e3);if(b<60)return"Just now";const L=Math.floor(b/60);if(L<60)return`${L}m ago`;const T=Math.floor(L/60);if(T<24)return`${T}h ago`;const _=Math.floor(T/24);return _===1?"Yesterday":_<7?`${_}d ago`:U(s)}function v(){if(!n)return;let s=r;if(m==="task"?s=r.filter(c=>(c.type||"").includes("task")):m==="target"?s=r.filter(c=>(c.type||"").includes("target")):m==="job"?s=r.filter(c=>(c.type||"").includes("job")):m==="ticket"&&(s=r.filter(c=>(c.type||"").includes("ticket"))),s.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${m==="all"?"":m+" "}notifications</div>`;return}n.innerHTML=s.map(c=>{const y=g(c.type);return`
        <div class="notif-item ${c.read?"":"unread"}" data-id="${c._id}" data-type="${d(c.type||"")}">
          <div class="notif-icon">${y}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${d(c.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${w(c.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${d(c.message)}</div>
          </div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(c=>{c.onclick=async()=>{const y=c.dataset.id,b=c.dataset.type;if(y&&c.classList.contains("unread")){c.classList.remove("unread");try{await I(`/notifications/${y}/read`,{method:"PATCH"})}catch{}}B(),b&&b.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):b&&b.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("jobs"):b&&b.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):b&&b.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}})}async function f(){try{const s=await J("/notifications");r=s.notifications||[];const c=s.unreadCount||0;e.textContent=c>99?"99+":c,e.style.display=c>0?"flex":"none",a&&(a.textContent=c>0?`(${c} new)`:""),v()}catch{n&&r.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}f();const k=setInterval(f,25e3);window.addEventListener("beforeunload",()=>clearInterval(k)),i.querySelectorAll(".notif-filter-btn").forEach(s=>{s.onclick=c=>{c.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(y=>y.classList.remove("active")),s.classList.add("active"),m=s.dataset.filter,v()}});const p=document.getElementById("notifBackdrop");function E(){i.style.display="flex",i.classList.add("open"),p&&(p.style.display="block",p.classList.add("open")),t.setAttribute("aria-expanded","true");const s=document.getElementById("topbarUserDropdown");s&&(s.style.display="none"),f()}function B(){i.style.display="none",i.classList.remove("open"),p&&(p.style.display="none",p.classList.remove("open")),t.setAttribute("aria-expanded","false")}function $(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?B():E()}window.ci360CloseNotifications=B;const C=document.getElementById("notifCloseBtn");C&&(C.onclick=s=>{s.stopPropagation(),B()}),p&&(p.onclick=s=>{s.stopPropagation(),B()}),t.onclick=s=>{s.stopPropagation(),$()},o&&(o.onclick=async s=>{s.stopPropagation();try{await I("/notifications/read",{method:"PATCH"}),e.style.display="none",a&&(a.textContent=""),r.forEach(c=>c.read=!0),v(),h("All notifications marked as read")}catch(c){h(c.message,!0)}}),document.addEventListener("click",s=>{!i.contains(s.target)&&s.target!==t&&(i.style.display="none")}),l&&(l.onclick=async s=>{s.stopPropagation();try{await K("/notifications"),r=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",a&&(a.textContent=""),h("Notifications cleared")}catch(c){h(c.message,!0)}})}function pt({user:t,currentRole:i,activeTab:e,tabs:n,title:l,subtitle:o}){const a=t&&t.name?t.name.charAt(0).toUpperCase():"U",r=t&&t.role==="superadmin"?"Super Admin":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",m=t&&t.name?t.name:"User",g=t&&t.email?t.email:t&&t.username?t.username:"",w=n&&n.some(p=>p.key==="logjob"),v=n&&n.find(p=>p.key===e),f=l||v&&v.label||"Dashboard";let k=[];return i==="superadmin"?k=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(e),isMore:!0}]:i==="employee"?k=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:e==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"tickets",label:"Tickets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>',active:e==="tickets"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:e==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","tickets","targets"].includes(e),isMore:!0}]:k=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"jobs",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:e==="jobs"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","team"].includes(e),isMore:!0}],`
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
          ${n.map(p=>`
            <button type="button" class="sidebar-item ${e===p.key?"active":""}" data-tab="${p.key}" aria-current="${e===p.key?"page":"false"}">
              <span class="icon">${p.icon||"📌"}</span>
              <span>${p.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${a}</div>
          <div class="user-details">
            <div class="name">${d(t?t.name:"User")}</div>
            <div class="role">${d(r)}</div>
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
                <span class="topbar-crumb-portal">${d(r)}</span>
                <span class="topbar-crumb-sep">/</span>
                <span class="topbar-crumb-active">${d(f)}</span>
              </div>
              <div class="topbar-title-row">
                <h1 class="page-heading-title">${d(f)}</h1>
                ${o?`<span class="topbar-subtitle-pill" title="${d(o)}">${d(o)}</span>`:""}
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

            ${w?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${x()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${x()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${it()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${a}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${d(m)}</span>
                  <span class="topbar-user-role-badge">${d(r)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${a}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${d(m)}</div>
                      ${g?`<div class="tud-email">${d(g)}</div>`:""}
                      <span class="tud-role-chip">${d(r)}</span>
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
                      <span class="tud-icon">${x()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${x()==="dark"?"Light":"Dark"} Mode</span>
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
                    <button type="button" class="tud-mobile-item" id="tudMobileThemeBtn" role="menuitem">
                      <div class="tmi-left">
                        <span style="font-size:16px" id="tudMobileThemeIcon">${x()==="dark"?"☀️":"🌙"}</span>
                        <span id="tudMobileThemeText">${x()==="dark"?"Light Mode":"Dark Mode"}</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

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
          ${k.map(p=>`
            <button type="button" class="mbn-item ${p.active?"active":""}" data-tab="${p.key}" ${p.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${p.iconSvg}</span>
              <span class="mbn-label">${d(p.label)}</span>
              ${p.active?'<span class="mbn-active-dot"></span>':""}
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
              ${n.map(p=>`
                <button type="button" class="mms-card ${e===p.key?"active":""}" data-tab="${p.key}">
                  <span class="mms-card-icon">${p.icon||"📌"}</span>
                  <span class="mms-card-label">${d(p.label)}</span>
                </button>
              `).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${x()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
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
    </div>`}function ut(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function l(){e&&e.classList.add("open"),n&&n.classList.add("open")}function o(){e&&e.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=l),n&&(n.onclick=o);const a=document.getElementById("mobileMoreBackdrop"),r=document.getElementById("mobileMoreSheet"),m=document.getElementById("mmsCloseBtn"),g=document.getElementById("mobileMoreBtn");function w(){a&&a.classList.add("active"),r&&r.classList.add("active")}function v(){a&&a.classList.remove("active"),r&&r.classList.remove("active")}g&&(g.onclick=u=>{u.stopPropagation(),w()}),m&&(m.onclick=v),a&&(a.onclick=u=>{u.target===a&&v()}),document.querySelectorAll(".mbn-item").forEach(u=>{u.dataset.tab&&u.dataset.tab!=="__more__"&&(u.onclick=()=>{v(),t&&t(u.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(u=>{u.onclick=()=>{v(),t&&t(u.dataset.tab)}});const f=document.getElementById("mmsToggleThemeBtn");f&&(f.onclick=()=>{N(x()==="dark"?"light":"dark")});const k=document.getElementById("mmsNotifsBtn");k&&(k.onclick=()=>{v();const u=document.getElementById("notifBellBtn");u&&u.click()});const p=document.getElementById("mmsLogoutBtn");p&&(p.onclick=D);const E=document.getElementById("mobileCalBtn");E&&(E.onclick=()=>{const u=document.querySelector(".period-row");u&&(u.scrollIntoView({behavior:"smooth",block:"center"}),u.classList.add("pulse-highlight"),setTimeout(()=>u.classList.remove("pulse-highlight"),1200))});const B=document.getElementById("tudMobileThemeBtn");B&&(B.onclick=u=>{u.stopPropagation(),N(x()==="dark"?"light":"dark")});const $=document.getElementById("tudMobileNotifsBtn");$&&($.onclick=u=>{u.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none");const j=document.getElementById("notifBellBtn");j&&j.click()});const C=document.getElementById("tudMobileSettingsBtn");C&&(C.onclick=u=>{u.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none"),document.querySelector('[data-tab="manage"]')&&t?t("manage"):w()});const s=document.getElementById("tudMobileHelpBtn");s&&(s.onclick=u=>{u.stopPropagation();const M=document.getElementById("topbarUserDropdown");M&&(M.style.display="none"),document.querySelector('[data-tab="tickets"]')&&t?t("tickets"):et(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `)});const c=document.getElementById("logoutBtnMobile");c&&(c.onclick=D);const y=document.getElementById("topbarUserBtn"),b=document.getElementById("topbarUserDropdown");y&&b&&(y.onclick=u=>{u.stopPropagation();const M=b.style.display!=="none";b.style.display=M?"none":"block",y.setAttribute("aria-expanded",String(!M)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",u=>{!b.contains(u.target)&&!y.contains(u.target)&&(b.style.display="none",y.setAttribute("aria-expanded","false"))}));const L=document.getElementById("tudThemeToggleBtn");L&&(L.onclick=()=>{N(x()==="dark"?"light":"dark")});const T=document.getElementById("topbarQuickLogJobBtn");T&&(T.onclick=()=>{t&&t("logjob")});const _=document.getElementById("logoutBtn");_&&(_.onclick=D),ot(),document.querySelectorAll(".sidebar-item").forEach(u=>{u.onclick=()=>{o(),t&&t(u.dataset.tab)}}),mt(t)}function mt(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),l=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),a=document.getElementById("tudCmdBtn"),r=document.getElementById("cmdCloseKbd");if(!i||!e||!n)return;const m=Array.from(document.querySelectorAll(".sidebar-item")),g=m.map(s=>{var c,y;return{type:"tab",id:s.dataset.tab,label:((c=s.querySelector("span:last-child"))==null?void 0:c.textContent)||s.dataset.tab,icon:((y=s.querySelector(".icon"))==null?void 0:y.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(s.dataset.tab)}}});m.some(s=>s.dataset.tab==="logjob")&&g.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),g.push({type:"action",id:"toggle-theme",label:x()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{N(x()==="dark"?"light":"dark")}}),g.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const s=document.getElementById("notifBellBtn");s&&s.click()}}),g.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>D()});let v=0,f=[...g];function k(){if(!f.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=f.map((s,c)=>`
      <div class="cmd-result ${c===v?"selected":""}" data-idx="${c}">
        <div class="cmd-result-icon">${s.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${d(s.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${d(s.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(s=>{s.onmouseenter=()=>{v=Number(s.dataset.idx),p()},s.onclick=()=>{E(Number(s.dataset.idx))}})}function p(){n.querySelectorAll(".cmd-result").forEach((s,c)=>{s.classList.toggle("selected",c===v)})}function E(s){const c=f[s];c&&c.action&&($(),c.action())}function B(){const s=document.getElementById("topbarUserDropdown");s&&(s.style.display="none"),i.classList.add("open"),e.value="",f=[...g],v=0,k(),setTimeout(()=>e.focus(),50)}function $(){i.classList.remove("open"),e.blur()}l&&(l.onclick=B),o&&(o.onclick=B),a&&(a.onclick=()=>{const s=document.getElementById("topbarUserDropdown");s&&(s.style.display="none"),B()}),r&&(r.onclick=$),i.onclick=s=>{s.target===i&&$()},e.oninput=()=>{const s=e.value.trim().toLowerCase();s?f=g.filter(c=>c.label.toLowerCase().includes(s)||c.sub.toLowerCase().includes(s)):f=[...g],v=0,k()},e.onkeydown=s=>{if(s.key==="ArrowDown"){if(s.preventDefault(),f.length>0){v=(v+1)%f.length,p();const c=n.querySelector(".cmd-result.selected");c&&c.scrollIntoView({block:"nearest"})}}else if(s.key==="ArrowUp"){if(s.preventDefault(),f.length>0){v=(v-1+f.length)%f.length,p();const c=n.querySelector(".cmd-result.selected");c&&c.scrollIntoView({block:"nearest"})}}else s.key==="Enter"?(s.preventDefault(),E(v)):s.key==="Escape"&&(s.preventDefault(),$())};const C=s=>{(s.metaKey||s.ctrlKey)&&s.key.toLowerCase()==="k"?(s.preventDefault(),i.classList.contains("open")?$():B()):s.key==="Escape"&&i.classList.contains("open")&&$()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=C,window.addEventListener("keydown",C)}function gt(t=4){return`
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
      <h3>${d(t)}</h3>
      <p>${d(i)}</p>
      ${n}
    </div>`}function ft(t,i,e="",n="📊",l=""){let o="";return l&&(o=`<span class="kpi-trend ${l.startsWith("+")||l.includes("↑")||l.toLowerCase().includes("up")?"up":"down"}">${d(l)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${d(t)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${d(i)}</div>
      <div class="kpi-sub">${o}<span>${d(e)}</span></div>
    </div>`}function ht(t,i="gray"){return`<span class="badge ${i}">${d(t)}</span>`}function bt(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function yt(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,n])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${n}</button>`).join("")}</div>`}function kt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function Z(t){if(!t)return"";const i=new Date,e=new Date(t),n=Math.floor((i-e)/1e3);if(n<60)return"Just now";const l=Math.floor(n/60);if(l<60)return`${l}m ago`;const o=Math.floor(l/60);if(o<24)return`${o}h ago`;const a=Math.floor(o/24);return a<7?`${a}d ago`:U(t)}function R(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],n=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,n)).toFixed(1))+" "+e[n]}function z(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function wt(t){return t?z(t.name||t.filename||"",t.type||"").cls==="img":!1}function W(t){if(!t||!t.url)return;const i=z(t.name,t.type),e=i.cls==="img",n=i.cls==="pdf",l=d(t.name||"Attachment"),o=R(t.size),a=document.createElement("div");a.className="preview-modal-overlay",a.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${l}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${o})</span>
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
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${o}</div>
            <a href="${t.url}" download="${l}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `}
      </div>
    </div>
  `,a.onclick=r=>{(r.target===a||r.target.closest(".preview-modal-close"))&&a.remove()},document.body.appendChild(a)}function H(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${d(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((n,l)=>{const o=z(n.name,n.type),a=d(n.name||"File"),r=R(n.size);return`
            <div class="attachment-chip" data-idx="${l}" title="${a} (${r})">
              <span class="file-type-icon ${o.cls}" style="width:22px;height:22px;font-size:12px">${o.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${l}, this)">${a}</span>
              <span class="attachment-chip-size">${r}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${l}, this)">👁️</button>
                <a href="${n.url}" download="${a}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${e?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${l}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const S={};async function q(t){const i=Array.from(t||[]);if(!i.length)return[];const n=(await Promise.all(i.map(async l=>new Promise(o=>{const a=new FileReader;a.onload=()=>{o({name:l.name,type:l.type,size:l.size,base64:a.result,data:a.result})},a.onerror=()=>o(null),a.readAsDataURL(l)})))).filter(Boolean);if(!n.length)return[];try{const l=await V("/upload",{files:n});if(l&&l.files&&l.files.length)return l.files}catch(l){console.warn("Backend upload failed, fallback to base64 data URLs:",l)}return n.map(l=>({name:l.name,url:l.base64,size:l.size,type:l.type,uploadedAt:new Date}))}function Q({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:n=!0,accept:l="*/*",maxFiles:o=10}={}){return`
    <div class="uploader-container" id="container-${t}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${d(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${t}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${t}">
        <input type="file" id="input-${t}" ${n?"multiple":""} accept="${l}" style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${d(e)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${t}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${t}"></div>
    </div>
  `}function G(t,i={}){const e=document.getElementById("zone-"+t),n=document.getElementById("input-"+t),l=document.getElementById("list-"+t),o=document.getElementById("count-"+t);S[t]=i.existing?[...i.existing]:[];function a(){const r=S[t]||[];if(o&&(o.textContent=`${r.length} file${r.length===1?"":"s"} attached`),!!l){if(!r.length){l.innerHTML="";return}l.innerHTML=r.map((m,g)=>{const w=z(m.name,m.type),v=d(m.name||"File"),f=R(m.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${w.cls}">${w.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${v}">${v}</div>
              <div class="uploader-file-size">${w.label} · ${f}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${g})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${g})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(r)}}window.__removeUploaderFile=(r,m)=>{if(S[r]){S[r].splice(m,1);const g=window[`__update_${r}`];g&&g()}},window.__previewUploaderFile=(r,m)=>{const g=(S[r]||[])[m];g&&W(g)},window[`__update_${t}`]=a,e&&n&&(e.onclick=r=>{r.target.tagName!=="BUTTON"&&!r.target.closest("button")&&n.click()},e.ondragover=r=>{r.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async r=>{if(r.preventDefault(),e.classList.remove("dragover"),r.dataTransfer&&r.dataTransfer.files&&r.dataTransfer.files.length){h("Uploading files… ⏳");const m=await q(r.dataTransfer.files);S[t]=[...S[t]||[],...m],a(),h("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){h("Uploading files… ⏳");const r=await q(n.files);S[t]=[...S[t]||[],...r],a(),h("Files attached! ✓"),n.value=""}}),a()}function Y(t){return S[t]||[]}function nt(t,i=[]){S[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const n=i.closest(".attachment-chip");if(!n)return;const l=Number(n.dataset.idx),o=e.dataset.attachments;if(o)try{const a=JSON.parse(decodeURIComponent(o));a[l]&&W(a[l])}catch{}};function xt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
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
        ${Q({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const Bt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},$t={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function Mt(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),n=t.status==="Open",l=(t._id||"").slice(-4).toUpperCase(),o=kt(t.userName),a=encodeURIComponent(JSON.stringify(t.attachments||[])),r=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${l}</span>
            <span class="ticket-subject">${d(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${Bt[t.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${d(t.status)}
          </span>
          <span class="badge ${$t[t.priority]||"gray"}">${d(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${d(t.userName)}
            <span class="ticket-role-pill">${d(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${Z(t.createdAt)} · ${U(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${d(t.message)}</div>

      ${t.attachments&&t.attachments.length?`
        <div data-attachments="${a}">
          ${H(t.attachments,{title:"Ticket Attachments"})}
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
              ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${Z(t.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${d(t.adminReply)}</div>
            ${t.adminAttachments&&t.adminAttachments.length?`
              <div data-attachments="${r}">
                ${H(t.adminAttachments,{title:"Support Attached Files"})}
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
            <textarea id="tkreplytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${d(t.adminReply||"")}</textarea>
            ${Q({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function A(t,i,e){const n=document.getElementById("tklist-"+i),l=document.getElementById("tkcnt-"+i);if(n)try{const o=await J("/tickets/job/"+t);l&&(l.textContent=o.length),o.length?(n.innerHTML=o.map(a=>Mt(a,e)).join(""),St(t,i,e,n,o)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function St(t,i,e,n,l){e&&(n.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await P("/tickets/"+o.dataset.tkid,{status:o.value}),h("Status updated"),A(t,i,e)}catch(a){h(a.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await P("/tickets/"+o.dataset.tkid,{status:"Resolved"}),h("Ticket marked as Resolved! 🎉"),A(t,i,e)}catch(a){h(a.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplytxt-"+o.dataset.tkid);a&&(a.value=o.dataset.tpl,a.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const a=o.dataset.tkid,r=document.getElementById("tkreplyform-"+a);if(r){r.classList.toggle("show");const m=l.find(g=>g._id===a);G("tkreplyup-"+a,{existing:m?m.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const a=document.getElementById("tkreplyform-"+o.dataset.tkid);a&&a.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const a=o.dataset.tkid,r=document.getElementById("tkreplytxt-"+a);if(!r)return;const m=Y("tkreplyup-"+a);try{await P("/tickets/"+a,{adminReply:r.value.trim(),adminAttachments:m}),h("Response saved! 🛡️"),A(t,i,e)}catch(g){h(g.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await K("/tickets/"+o.dataset.tkid),h("Ticket deleted"),A(t,i,e)}catch(a){h(a.message,!0)}}}))}function Ct(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");A(t,e,i),G("tkup-"+e);const n=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const a=document.getElementById("tkform-"+e);if(!a)return;const r=a.style.display==="block";a.style.display=r?"none":"block",n.textContent=r?"+ Raise Ticket":"✕ Cancel"});const l=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);l&&(l.onclick=()=>{const a=document.getElementById("tkform-"+e);a&&(a.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);o&&(o.onclick=async()=>{var w,v;const a=(w=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:w.trim(),r=(v=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:v.trim(),m=(document.getElementById("tkpri-"+e)||{}).value,g=Y("tkup-"+e);if(!a){h("Please enter a subject",!0);return}if(!r){h("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await V("/tickets",{jobId:t,subject:a,message:r,priority:m,attachments:g}),h("Ticket submitted! 🎫");const f=document.getElementById("tkform-"+e);f&&(f.style.display="none"),n&&(n.textContent="+ Raise Ticket");const k=document.getElementById("tksub-"+e),p=document.getElementById("tkmsg-"+e);k&&(k.value=""),p&&(p.value=""),nt("tkup-"+e,[]),A(t,e,i)}catch(f){h(f.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function It(){return""}function Et(){}window.__setTheme=function(t){N(t)};Object.assign(window,{getToken:O,getUser:X,setSession:at,clearSession:F,requireAuth:lt,initTheme:tt,api:I,apiGet:J,apiPost:V,apiPut:P,apiPatch:rt,apiDelete:K,fmtINR:ct,fmtHours:dt,escapeHtml:d,fmtDate:U,flashToast:h,openModal:et,logout:D,getTheme:x,setTheme:N,fmtFileSize:R,getFileCategory:z,isImageAttachment:wt,openFilePreviewModal:W,renderAttachmentChips:H,uploadFilesToServer:q,renderAttachmentUploader:Q,bindAttachmentUploader:G,getUploaderAttachments:Y,setUploaderAttachments:nt,renderRoleSwitcher:It,bindRoleSwitcher:Et,renderNotificationBell:it,initNotificationBell:ot,renderAppShell:pt,bindAppShellEvents:ut,renderSkeletonCards:gt,renderEmptyState:vt,renderKpiCard:ft,renderBadge:ht,renderProgressBar:bt,renderPeriodPicker:yt,renderSupportTicketSection:xt,bindSupportTicketSection:Ct});export{O as a,V as b,X as g,at as s};
