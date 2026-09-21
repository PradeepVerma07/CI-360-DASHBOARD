(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}})();const G="/api";function M(){return localStorage.getItem("ci360_token")}function K(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function Y(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function N(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function X(t){const i=M(),e=K();return!i||!e?(window.location.href="/login.html",null):t&&e.role!==t&&e.role!=="superadmin"?(window.location.href=e.role==="superadmin"?"/admin.html":e.role==="employee"?"/employee.html":"/client.html",null):e}async function B(t,i={}){const e=M(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(n.Authorization="Bearer "+e);const a=await fetch(G+t,Object.assign({},i,{headers:n}));if(a.status===401)throw N(),window.location.href="/login.html",new Error("Session expired");let s=null;try{s=await a.json()}catch{}if(!a.ok)throw new Error(s&&s.error||"Server status "+a.status+" — Backend waking up, please retry in 10s.");return s}const D=t=>B(t,{method:"GET"}),R=(t,i)=>B(t,{method:"POST",body:JSON.stringify(i)}),L=(t,i)=>B(t,{method:"PUT",body:JSON.stringify(i)}),Z=(t,i)=>B(t,{method:"PATCH",body:JSON.stringify(i)}),P=t=>B(t,{method:"DELETE"});function tt(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function et(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function p(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function T(t){return t?new Date(t).toISOString().slice(0,10):"—"}function $(){return localStorage.getItem("ci360_theme")||"light"}function I(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(i=>{i.classList.toggle("active",i.dataset.theme===t)})}function it(){const t=$();document.documentElement.setAttribute("data-theme",t)}function h(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function nt(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function U(){N(),window.location.href="/login.html"}function W(){return`
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
    </div>`}function V(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),n=document.getElementById("notifList"),a=document.getElementById("clearNotifBtn"),s=document.getElementById("markAllReadBtn"),o=document.getElementById("notifUnreadBadge");if(!t||!i)return;let l=[],u="all";function f(c){return c?c.startsWith("task_completed")?"🎉":c.startsWith("task_due")?"⚡":c.startsWith("task")?"✅":c.startsWith("target_completed")?"🎉":c.startsWith("target")?"🎯":c.startsWith("job_due")?"⏳":c.startsWith("job")?"📋":c.startsWith("ticket")?"🎫":c.startsWith("status")?"🔄":"🔔":"🔔"}function y(c){if(!c)return"";const d=new Date(c),w=Math.floor((new Date-d)/1e3);if(w<60)return"Just now";const S=Math.floor(w/60);if(S<60)return`${S}m ago`;const r=Math.floor(S/60);if(r<24)return`${r}h ago`;const g=Math.floor(r/24);return g===1?"Yesterday":g<7?`${g}d ago`:T(c)}function m(){if(!n)return;let c=l;if(u==="task"?c=l.filter(d=>(d.type||"").includes("task")):u==="target"?c=l.filter(d=>(d.type||"").includes("target")):u==="job"?c=l.filter(d=>(d.type||"").includes("job")):u==="ticket"&&(c=l.filter(d=>(d.type||"").includes("ticket"))),c.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${u==="all"?"":u+" "}notifications</div>`;return}n.innerHTML=c.map(d=>{const k=f(d.type);return`
        <div class="notif-item ${d.read?"":"unread"}" data-id="${d._id}" data-type="${p(d.type||"")}">
          <div class="notif-icon">${k}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${p(d.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${y(d.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${p(d.message)}</div>
          </div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(d=>{d.onclick=async()=>{const k=d.dataset.id,w=d.dataset.type;if(k&&d.classList.contains("unread")){d.classList.remove("unread");try{await B(`/notifications/${k}/read`,{method:"PATCH"})}catch{}}w&&w.includes("task")&&typeof window.ci360NavTab=="function"&&(i.style.display="none",window.ci360NavTab("dailytasks"))}})}async function v(){try{const c=await D("/notifications");l=c.notifications||[];const d=c.unreadCount||0;e.textContent=d>99?"99+":d,e.style.display=d>0?"flex":"none",o&&(o.textContent=d>0?`(${d} new)`:""),m()}catch{n&&l.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}v();const b=setInterval(v,25e3);window.addEventListener("beforeunload",()=>clearInterval(b)),i.querySelectorAll(".notif-filter-btn").forEach(c=>{c.onclick=d=>{d.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(k=>k.classList.remove("active")),c.classList.add("active"),u=c.dataset.filter,m()}}),t.onclick=c=>{c.stopPropagation();const d=i.style.display==="block";i.style.display=d?"none":"block",d||v()},s&&(s.onclick=async c=>{c.stopPropagation();try{await B("/notifications/read",{method:"PATCH"}),e.style.display="none",o&&(o.textContent=""),l.forEach(d=>d.read=!0),m(),h("All notifications marked as read")}catch(d){h(d.message,!0)}}),document.addEventListener("click",c=>{!i.contains(c.target)&&c.target!==t&&(i.style.display="none")}),a&&(a.onclick=async c=>{c.stopPropagation();try{await P("/notifications"),l=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",o&&(o.textContent=""),h("Notifications cleared")}catch(d){h(d.message,!0)}})}function st({user:t,currentRole:i,activeTab:e,tabs:n,title:a,subtitle:s}){const o=t&&t.name?t.name.charAt(0).toUpperCase():"U",l=t&&t.role==="superadmin"?"Super Admin":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",u=t&&t.name?t.name:"User",f=t&&t.email?t.email:t&&t.username?t.username:"",y=n&&n.some(b=>b.key==="logjob"),m=n&&n.find(b=>b.key===e),v=a||m&&m.label||"Dashboard";return`
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
          ${n.map(b=>`
            <button type="button" class="sidebar-item ${e===b.key?"active":""}" data-tab="${b.key}" aria-current="${e===b.key?"page":"false"}">
              <span class="icon">${b.icon||"📌"}</span>
              <span>${b.label}</span>
            </button>`).join("")}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${o}</div>
          <div class="user-details">
            <div class="name">${p(t?t.name:"User")}</div>
            <div class="role">${p(l)}</div>
          </div>
        </div>
      </aside>

      <main class="app-main" role="main">
        <header class="app-topbar">
          <!-- Left: Mobile Toggle & Breadcrumbs / Title -->
          <div class="topbar-left">
            <button type="button" class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open navigation">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div class="topbar-breadcrumb-wrap">
              <div class="topbar-breadcrumbs">
                <span class="topbar-crumb-app">
                  <span class="status-indicator-dot"></span>
                  CI360
                </span>
                <span class="topbar-crumb-sep">/</span>
                <span class="topbar-crumb-portal">${p(l)}</span>
                <span class="topbar-crumb-sep">/</span>
                <span class="topbar-crumb-active">${p(v)}</span>
              </div>
              <div class="topbar-title-row">
                <h1 class="page-heading-title">${p(v)}</h1>
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
            <button type="button" class="cmd-trigger-mobile" id="topbarCmdTriggerMobile" title="Quick Search (⌘K)" aria-label="Quick Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>

            ${y?`
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>`:""}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${$()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${$()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            ${W()}

            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${o}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${p(u)}</span>
                  <span class="topbar-user-role-badge">${p(l)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <div class="tud-header">
                  <div class="tud-avatar">${o}</div>
                  <div class="tud-meta">
                    <div class="tud-name">${p(u)}</div>
                    ${f?`<div class="tud-email">${p(f)}</div>`:""}
                    <span class="tud-role-chip">${p(l)}</span>
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
                    <span class="tud-icon">${$()==="dark"?"☀️":"🌙"}</span>
                    <span class="tud-label">Switch to ${$()==="dark"?"Light":"Dark"} Mode</span>
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

        <div class="app-content">
          <div id="content"></div>
        </div>
      </main>
    </div>`}function ot(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function a(){e&&e.classList.add("open"),n&&n.classList.add("open")}function s(){e&&e.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=a),n&&(n.onclick=s);const o=document.getElementById("topbarUserBtn"),l=document.getElementById("topbarUserDropdown");o&&l&&(o.onclick=m=>{m.stopPropagation();const v=l.style.display!=="none";l.style.display=v?"none":"block",o.setAttribute("aria-expanded",String(!v));const b=document.getElementById("notifDropdown");b&&(b.style.display="none")},document.addEventListener("click",m=>{!l.contains(m.target)&&!o.contains(m.target)&&(l.style.display="none",o.setAttribute("aria-expanded","false"))}));const u=document.getElementById("tudThemeToggleBtn");u&&(u.onclick=()=>{const m=$()==="dark"?"light":"dark";I(m);const v=u.querySelector(".tud-icon"),b=u.querySelector(".tud-label");v&&(v.textContent=m==="dark"?"☀️":"🌙"),b&&(b.textContent=`Switch to ${m==="dark"?"Light":"Dark"} Mode`)});const f=document.getElementById("topbarQuickLogJobBtn");f&&(f.onclick=()=>{t&&t("logjob")});const y=document.getElementById("logoutBtn");y&&(y.onclick=U),V(),document.querySelectorAll(".sidebar-item").forEach(m=>{m.onclick=()=>{s(),t&&t(m.dataset.tab)}}),at(t)}function at(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),a=document.getElementById("topbarCmdTrigger"),s=document.getElementById("topbarCmdTriggerMobile"),o=document.getElementById("tudCmdBtn"),l=document.getElementById("cmdCloseKbd");if(!i||!e||!n)return;const u=Array.from(document.querySelectorAll(".sidebar-item")),f=u.map(r=>{var g,F;return{type:"tab",id:r.dataset.tab,label:((g=r.querySelector("span:last-child"))==null?void 0:g.textContent)||r.dataset.tab,icon:((F=r.querySelector(".icon"))==null?void 0:F.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(r.dataset.tab)}}});u.some(r=>r.dataset.tab==="logjob")&&f.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),f.push({type:"action",id:"toggle-theme",label:$()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{I($()==="dark"?"light":"dark")}}),f.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const r=document.getElementById("notifBellBtn");r&&r.click()}}),f.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>U()});let m=0,v=[...f];function b(){if(!v.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=v.map((r,g)=>`
      <div class="cmd-result ${g===m?"selected":""}" data-idx="${g}">
        <div class="cmd-result-icon">${r.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${p(r.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${p(r.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(r=>{r.onmouseenter=()=>{m=Number(r.dataset.idx),c()},r.onclick=()=>{d(Number(r.dataset.idx))}})}function c(){n.querySelectorAll(".cmd-result").forEach((r,g)=>{r.classList.toggle("selected",g===m)})}function d(r){const g=v[r];g&&g.action&&(w(),g.action())}function k(){const r=document.getElementById("topbarUserDropdown");r&&(r.style.display="none"),i.classList.add("open"),e.value="",v=[...f],m=0,b(),setTimeout(()=>e.focus(),50)}function w(){i.classList.remove("open"),e.blur()}a&&(a.onclick=k),s&&(s.onclick=k),o&&(o.onclick=()=>{const r=document.getElementById("topbarUserDropdown");r&&(r.style.display="none"),k()}),l&&(l.onclick=w),i.onclick=r=>{r.target===i&&w()},e.oninput=()=>{const r=e.value.trim().toLowerCase();r?v=f.filter(g=>g.label.toLowerCase().includes(r)||g.sub.toLowerCase().includes(r)):v=[...f],m=0,b()},e.onkeydown=r=>{if(r.key==="ArrowDown"){if(r.preventDefault(),v.length>0){m=(m+1)%v.length,c();const g=n.querySelector(".cmd-result.selected");g&&g.scrollIntoView({block:"nearest"})}}else if(r.key==="ArrowUp"){if(r.preventDefault(),v.length>0){m=(m-1+v.length)%v.length,c();const g=n.querySelector(".cmd-result.selected");g&&g.scrollIntoView({block:"nearest"})}}else r.key==="Enter"?(r.preventDefault(),d(m)):r.key==="Escape"&&(r.preventDefault(),w())};const S=r=>{(r.metaKey||r.ctrlKey)&&r.key.toLowerCase()==="k"?(r.preventDefault(),i.classList.contains("open")?w():k()):r.key==="Escape"&&i.classList.contains("open")&&w()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=S,window.addEventListener("keydown",S)}function lt(t=4){return`
    <div class="grid grid-${Math.min(t,4)}" style="margin-bottom:24px">
      ${Array(t).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function rt(t,i,e="📁",n=""){return`
    <div class="empty">
      <span class="empty-icon">${e}</span>
      <h3>${p(t)}</h3>
      <p>${p(i)}</p>
      ${n}
    </div>`}function ct(t,i,e="",n="📊",a=""){let s="";return a&&(s=`<span class="kpi-trend ${a.startsWith("+")||a.includes("↑")||a.toLowerCase().includes("up")?"up":"down"}">${p(a)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${p(t)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${p(i)}</div>
      <div class="kpi-sub">${s}<span>${p(e)}</span></div>
    </div>`}function dt(t,i="gray"){return`<span class="badge ${i}">${p(t)}</span>`}function pt(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function ut(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,n])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${n}</button>`).join("")}</div>`}function mt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function J(t){if(!t)return"";const i=new Date,e=new Date(t),n=Math.floor((i-e)/1e3);if(n<60)return"Just now";const a=Math.floor(n/60);if(a<60)return`${a}m ago`;const s=Math.floor(a/60);if(s<24)return`${s}h ago`;const o=Math.floor(s/24);return o<7?`${o}d ago`:T(t)}function _(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],n=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,n)).toFixed(1))+" "+e[n]}function E(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function ft(t){return t?E(t.name||t.filename||"",t.type||"").cls==="img":!1}function j(t){if(!t||!t.url)return;const i=E(t.name,t.type),e=i.cls==="img",n=i.cls==="pdf",a=p(t.name||"Attachment"),s=_(t.size),o=document.createElement("div");o.className="preview-modal-overlay",o.innerHTML=`
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
        `:n?`
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
  `,o.onclick=l=>{(l.target===o||l.target.closest(".preview-modal-close"))&&o.remove()},document.body.appendChild(o)}function A(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${p(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((n,a)=>{const s=E(n.name,n.type),o=p(n.name||"File"),l=_(n.size);return`
            <div class="attachment-chip" data-idx="${a}" title="${o} (${l})">
              <span class="file-type-icon ${s.cls}" style="width:22px;height:22px;font-size:12px">${s.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${a}, this)">${o}</span>
              <span class="attachment-chip-size">${l}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${a}, this)">👁️</button>
                <a href="${n.url}" download="${o}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${e?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${a}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const x={};async function z(t){const i=Array.from(t||[]);if(!i.length)return[];const n=(await Promise.all(i.map(async a=>new Promise(s=>{const o=new FileReader;o.onload=()=>{s({name:a.name,type:a.type,size:a.size,base64:o.result,data:o.result})},o.onerror=()=>s(null),o.readAsDataURL(a)})))).filter(Boolean);if(!n.length)return[];try{const a=await R("/upload",{files:n});if(a&&a.files&&a.files.length)return a.files}catch(a){console.warn("Backend upload failed, fallback to base64 data URLs:",a)}return n.map(a=>({name:a.name,url:a.base64,size:a.size,type:a.type,uploadedAt:new Date}))}function q({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:n=!0,accept:a="*/*",maxFiles:s=10}={}){return`
    <div class="uploader-container" id="container-${t}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${p(i)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${t}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${t}">
        <input type="file" id="input-${t}" ${n?"multiple":""} accept="${a}" style="display:none">
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
  `}function H(t,i={}){const e=document.getElementById("zone-"+t),n=document.getElementById("input-"+t),a=document.getElementById("list-"+t),s=document.getElementById("count-"+t);x[t]=i.existing?[...i.existing]:[];function o(){const l=x[t]||[];if(s&&(s.textContent=`${l.length} file${l.length===1?"":"s"} attached`),!!a){if(!l.length){a.innerHTML="";return}a.innerHTML=l.map((u,f)=>{const y=E(u.name,u.type),m=p(u.name||"File"),v=_(u.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${y.cls}">${y.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${m}">${m}</div>
              <div class="uploader-file-size">${y.label} · ${v}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${f})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${f})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(l)}}window.__removeUploaderFile=(l,u)=>{if(x[l]){x[l].splice(u,1);const f=window[`__update_${l}`];f&&f()}},window.__previewUploaderFile=(l,u)=>{const f=(x[l]||[])[u];f&&j(f)},window[`__update_${t}`]=o,e&&n&&(e.onclick=l=>{l.target.tagName!=="BUTTON"&&!l.target.closest("button")&&n.click()},e.ondragover=l=>{l.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async l=>{if(l.preventDefault(),e.classList.remove("dragover"),l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files.length){h("Uploading files… ⏳");const u=await z(l.dataTransfer.files);x[t]=[...x[t]||[],...u],o(),h("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){h("Uploading files… ⏳");const l=await z(n.files);x[t]=[...x[t]||[],...l],o(),h("Files attached! ✓"),n.value=""}}),o()}function O(t){return x[t]||[]}function Q(t,i=[]){x[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const n=i.closest(".attachment-chip");if(!n)return;const a=Number(n.dataset.idx),s=e.dataset.attachments;if(s)try{const o=JSON.parse(decodeURIComponent(s));o[a]&&j(o[a])}catch{}};function vt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
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
        ${q({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const gt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},bt={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function ht(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),n=t.status==="Open",a=(t._id||"").slice(-4).toUpperCase(),s=mt(t.userName),o=encodeURIComponent(JSON.stringify(t.attachments||[])),l=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${a}</span>
            <span class="ticket-subject">${p(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${gt[t.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${p(t.status)}
          </span>
          <span class="badge ${bt[t.priority]||"gray"}">${p(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${s}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${p(t.userName)}
            <span class="ticket-role-pill">${p(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${J(t.createdAt)} · ${T(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${p(t.message)}</div>

      ${t.attachments&&t.attachments.length?`
        <div data-attachments="${o}">
          ${A(t.attachments,{title:"Ticket Attachments"})}
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
              ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${J(t.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${p(t.adminReply)}</div>
            ${t.adminAttachments&&t.adminAttachments.length?`
              <div data-attachments="${l}">
                ${A(t.adminAttachments,{title:"Support Attached Files"})}
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
            ${q({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function C(t,i,e){const n=document.getElementById("tklist-"+i),a=document.getElementById("tkcnt-"+i);if(n)try{const s=await D("/tickets/job/"+t);a&&(a.textContent=s.length),s.length?(n.innerHTML=s.map(o=>ht(o,e)).join(""),yt(t,i,e,n,s)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function yt(t,i,e,n,a){e&&(n.querySelectorAll(".tk-status-sel").forEach(s=>{s.onchange=async()=>{try{await L("/tickets/"+s.dataset.tkid,{status:s.value}),h("Status updated"),C(t,i,e)}catch(o){h(o.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(s=>{s.onclick=async()=>{try{await L("/tickets/"+s.dataset.tkid,{status:"Resolved"}),h("Ticket marked as Resolved! 🎉"),C(t,i,e)}catch(o){h(o.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(s=>{s.onclick=()=>{const o=document.getElementById("tkreplytxt-"+s.dataset.tkid);o&&(o.value=s.dataset.tpl,o.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(s=>{s.onclick=()=>{const o=s.dataset.tkid,l=document.getElementById("tkreplyform-"+o);if(l){l.classList.toggle("show");const u=a.find(f=>f._id===o);H("tkreplyup-"+o,{existing:u?u.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(s=>{s.onclick=()=>{const o=document.getElementById("tkreplyform-"+s.dataset.tkid);o&&o.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(s=>{s.onclick=async()=>{const o=s.dataset.tkid,l=document.getElementById("tkreplytxt-"+o);if(!l)return;const u=O("tkreplyup-"+o);try{await L("/tickets/"+o,{adminReply:l.value.trim(),adminAttachments:u}),h("Response saved! 🛡️"),C(t,i,e)}catch(f){h(f.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(s=>{s.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await P("/tickets/"+s.dataset.tkid),h("Ticket deleted"),C(t,i,e)}catch(o){h(o.message,!0)}}}))}function kt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");C(t,e,i),H("tkup-"+e);const n=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const o=document.getElementById("tkform-"+e);if(!o)return;const l=o.style.display==="block";o.style.display=l?"none":"block",n.textContent=l?"+ Raise Ticket":"✕ Cancel"});const a=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);a&&(a.onclick=()=>{const o=document.getElementById("tkform-"+e);o&&(o.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const s=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);s&&(s.onclick=async()=>{var y,m;const o=(y=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:y.trim(),l=(m=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:m.trim(),u=(document.getElementById("tkpri-"+e)||{}).value,f=O("tkup-"+e);if(!o){h("Please enter a subject",!0);return}if(!l){h("Please enter a message",!0);return}s.disabled=!0,s.textContent="Submitting…";try{await R("/tickets",{jobId:t,subject:o,message:l,priority:u,attachments:f}),h("Ticket submitted! 🎫");const v=document.getElementById("tkform-"+e);v&&(v.style.display="none"),n&&(n.textContent="+ Raise Ticket");const b=document.getElementById("tksub-"+e),c=document.getElementById("tkmsg-"+e);b&&(b.value=""),c&&(c.value=""),Q("tkup-"+e,[]),C(t,e,i)}catch(v){h(v.message,!0)}finally{s.disabled=!1,s.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function wt(){return""}function xt(){}window.__setTheme=function(t){I(t)};Object.assign(window,{getToken:M,getUser:K,setSession:Y,clearSession:N,requireAuth:X,initTheme:it,api:B,apiGet:D,apiPost:R,apiPut:L,apiPatch:Z,apiDelete:P,fmtINR:tt,fmtHours:et,escapeHtml:p,fmtDate:T,flashToast:h,openModal:nt,logout:U,getTheme:$,setTheme:I,fmtFileSize:_,getFileCategory:E,isImageAttachment:ft,openFilePreviewModal:j,renderAttachmentChips:A,uploadFilesToServer:z,renderAttachmentUploader:q,bindAttachmentUploader:H,getUploaderAttachments:O,setUploaderAttachments:Q,renderRoleSwitcher:wt,bindRoleSwitcher:xt,renderNotificationBell:W,initNotificationBell:V,renderAppShell:st,bindAppShellEvents:ot,renderSkeletonCards:lt,renderEmptyState:rt,renderKpiCard:ct,renderBadge:dt,renderProgressBar:pt,renderPeriodPicker:ut,renderSupportTicketSection:vt,bindSupportTicketSection:kt});export{M as a,R as b,K as g,Y as s};
