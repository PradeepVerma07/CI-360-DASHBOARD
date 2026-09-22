(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=e(a);fetch(a.href,o)}})();const gt="/api";function Q(){return localStorage.getItem("ci360_token")}function at(){try{return JSON.parse(localStorage.getItem("ci360_user"))}catch{return null}}function ft(t,i){localStorage.setItem("ci360_token",t),localStorage.setItem("ci360_user",JSON.stringify(i))}function Y(){localStorage.removeItem("ci360_token"),localStorage.removeItem("ci360_user")}function vt(t){const i=Q(),e=at();return!i||!e?(window.location.href="/login.html",null):t&&e.role!==t&&e.role!=="superadmin"?(window.location.href=e.role==="superadmin"?"/admin.html":e.role==="employee"?"/employee.html":"/client.html",null):e}async function E(t,i={}){const e=Q(),n=Object.assign({"Content-Type":"application/json"},i.headers||{});e&&(n.Authorization="Bearer "+e);const a=await fetch(gt+t,Object.assign({},i,{headers:n}));if(a.status===401)throw Y(),window.location.href="/login.html",new Error("Session expired");let o=null;try{o=await a.json()}catch{}if(!a.ok)throw new Error(o&&o.error||"Server status "+a.status+" — Backend waking up, please retry in 10s.");return o}const Z=t=>E(t,{method:"GET"}),H=(t,i)=>E(t,{method:"POST",body:JSON.stringify(i)}),q=(t,i)=>E(t,{method:"PUT",body:JSON.stringify(i)}),ht=(t,i)=>E(t,{method:"PATCH",body:JSON.stringify(i)}),X=t=>E(t,{method:"DELETE"});function bt(t){return t=Number(t)||0,"₹"+t.toLocaleString("en-IN",{maximumFractionDigits:0})}function yt(t){return(Number(t)||0).toLocaleString("en-IN",{maximumFractionDigits:1})+" hrs"}function p(t){return t==null?"":String(t).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function O(t){return t?new Date(t).toISOString().slice(0,10):"—"}function B(){return localStorage.getItem("ci360_theme")||"light"}function _(t){localStorage.setItem("ci360_theme",t),document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),s=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),s&&(s.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const a=document.getElementById("mmsToggleThemeBtn");if(a){const o=a.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}function lt(){const t=B();document.documentElement.setAttribute("data-theme",t),document.querySelectorAll(".theme-btn").forEach(o=>{o.classList.toggle("active",o.dataset.theme===t)});const i=document.getElementById("tudThemeToggleBtn");if(i){const o=i.querySelector(".tud-icon"),s=i.querySelector(".tud-label");o&&(o.textContent=t==="dark"?"☀️":"🌙"),s&&(s.textContent=`Switch to ${t==="dark"?"Light":"Dark"} Mode`)}const e=document.getElementById("tudMobileThemeIcon"),n=document.getElementById("tudMobileThemeText");e&&(e.textContent=t==="dark"?"☀️":"🌙"),n&&(n.textContent=t==="dark"?"Light Mode":"Dark Mode");const a=document.getElementById("mmsToggleThemeBtn");if(a){const o=a.querySelector("span");o&&(o.textContent=t==="dark"?"☀️ Light Mode":"🌙 Dark Mode")}}try{lt()}catch{}function y(t,i){const e=document.createElement("div");e.className="toast",e.style.borderLeftColor=i?"var(--red-500)":"var(--green-500)",e.textContent=(i?"⚠️  ":"✓  ")+t,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>e.remove(),200)},2800)}function rt(t){const i=document.createElement("div");return i.className="modal-bg",i.innerHTML=`<div class="modal">${t}</div>`,i.onclick=e=>{e.target===i&&i.remove()},document.body.appendChild(i),i}function D(){Y(),window.location.href="/login.html"}let P=null;async function tt(){if("serviceWorker"in navigator)try{P=await navigator.serviceWorker.register("/sw.js",{scope:"/"}),console.log("CI360 Service Worker active:",P.scope)}catch(t){console.warn("CI360 Service Worker registration notice:",t)}}try{tt()}catch{}function ct(){try{const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const i=new t;i.state==="suspended"&&i.resume();const e=i.currentTime,n=i.createOscillator(),a=i.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,e),a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(.2,e+.02),a.gain.exponentialRampToValueAtTime(.001,e+.35),n.connect(a),a.connect(i.destination),n.start(e),n.stop(e+.35);const o=i.createOscillator(),s=i.createGain();o.type="sine",o.frequency.setValueAtTime(880,e+.12),s.gain.setValueAtTime(0,e+.12),s.gain.linearRampToValueAtTime(.22,e+.14),s.gain.exponentialRampToValueAtTime(.001,e+.55),o.connect(s),s.connect(i.destination),o.start(e+.12),o.stop(e+.55)}catch{}}function dt(){try{"vibrate"in navigator&&navigator.vibrate([150,80,150])}catch{}}async function W(){if(!("Notification"in window))return y("Your browser does not support notifications.",!0),!1;try{const t=await Notification.requestPermission(),i=document.getElementById("notifPermissionBanner");return t==="granted"?(i&&(i.style.display="none"),y("Notifications enabled for this device!"),await j({title:"CI360 Notifications Active 🔔",message:"You will now receive instant alerts on this phone & browser for jobs and tasks.",tag:"ci360-active"}),!0):(i&&(i.style.display="flex"),y("Notification permission was declined.",!0),!1)}catch(t){console.error("Notification permission request error:",t)}return!1}async function j({title:t,message:i,type:e,id:n,url:a}){var s;if(ct(),dt(),!("Notification"in window)||Notification.permission!=="granted")return;const o={body:i||"You have a new update in CI360.",icon:"/logo.png",badge:"/logo.png",tag:n||"ci360-"+Date.now(),renotify:!0,vibrate:[150,80,150],data:{url:a||window.location.href,type:e||"general"}};try{if(P&&P.showNotification){await P.showNotification(t,o);return}const r=await((s=navigator.serviceWorker)==null?void 0:s.ready);if(r&&r.showNotification){await r.showNotification(t,o);return}}catch(r){console.warn("Service Worker notification dispatch:",r)}try{const r=new Notification(t,o);r.onclick=()=>{window.focus(),r.close()}}catch(r){console.warn("Window Notification fallback notice:",r)}}function pt(){return`
    <div class="notif-wrapper">
      <button id="notifBellBtn" type="button" class="notif-bell-btn" title="Notifications" aria-label="Notifications">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span id="notifBadge" class="notif-badge" style="display:none">0</span>
      </button>
      <div id="notifBackdrop" class="notif-backdrop" style="display:none"></div>
      <div id="notifDropdown" class="notif-dropdown" style="display:none">
        <div class="notif-dropdown-header">
          <div class="notif-header-title">
            <span class="notif-header-bell">🔔</span>
            <span class="notif-header-heading">Notifications</span>
            <span id="notifUnreadBadge" class="notif-header-count" style="display:none"></span>
          </div>
          <div class="notif-header-actions">
            <button id="testNotifBtn" type="button" class="btn ghost small notif-action-btn" title="Test notification delivery on this phone/browser">🧪 Test</button>
            <button id="markAllReadBtn" type="button" class="btn ghost small notif-action-btn">Mark Read</button>
            <button id="clearNotifBtn" type="button" class="btn ghost small notif-action-btn">Clear</button>
            <button id="notifCloseBtn" type="button" class="notif-mobile-close" aria-label="Close notifications">✕</button>
          </div>
        </div>

        <div id="notifPermissionBanner" class="notif-perm-banner" style="display:none">
          <div class="npb-content">
            <span class="npb-icon">🔔</span>
            <div class="npb-text">
              <strong>Enable Phone & Browser Alerts</strong>
              <span>Get notified on this device when jobs or tasks are updated.</span>
            </div>
          </div>
          <button type="button" class="btn primary small npb-btn" id="notifEnableBtn">Enable</button>
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
    </div>`}function ut(){const t=document.getElementById("notifBellBtn"),i=document.getElementById("notifDropdown"),e=document.getElementById("notifBadge"),n=document.getElementById("notifList"),a=document.getElementById("clearNotifBtn"),o=document.getElementById("markAllReadBtn"),s=document.getElementById("testNotifBtn"),r=document.getElementById("notifEnableBtn"),v=document.getElementById("notifPermissionBanner"),u=document.getElementById("notifUnreadBadge");if(!t||!i)return;tt();function w(){"Notification"in window&&(Notification.permission==="default"&&v?v.style.display="flex":v&&(v.style.display="none"))}w(),r&&(r.onclick=async c=>{c.stopPropagation(),await W(),w()});let h=new Set;try{const c=localStorage.getItem("ci360_seen_notif_ids");c&&(h=new Set(JSON.parse(c)))}catch{}let b=!localStorage.getItem("ci360_notifs_initialized"),k=[],m="all";function L(c){return c?c.startsWith("task_completed")?"🎉":c.startsWith("task_due")?"⚡":c.startsWith("task")?"✅":c.startsWith("target_completed")?"🎉":c.startsWith("target")?"🎯":c.startsWith("job_due")?"⏳":c.startsWith("job")?"📋":c.startsWith("ticket")?"🎫":c.startsWith("status")?"🔄":c.startsWith("test")?"🧪":"🔔":"🔔"}function T(c){if(!c)return"";const l=new Date(c),x=Math.floor((new Date-l)/1e3);if(x<60)return"Just now";const U=Math.floor(x/60);if(U<60)return`${U}m ago`;const V=Math.floor(U/60);if(V<24)return`${V}h ago`;const J=Math.floor(V/24);return J===1?"Yesterday":J<7?`${J}d ago`:O(c)}function $(){if(!n)return;let c=k;if(m==="task"?c=k.filter(l=>(l.type||"").includes("task")):m==="target"?c=k.filter(l=>(l.type||"").includes("target")):m==="job"?c=k.filter(l=>(l.type||"").includes("job")):m==="ticket"&&(c=k.filter(l=>(l.type||"").includes("ticket"))),c.length===0){n.innerHTML=`<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${m==="all"?"":m+" "}notifications</div>`;return}n.innerHTML=c.map(l=>{const g=L(l.type);return`
        <div class="notif-item ${l.read?"":"unread"}" data-id="${l._id}" data-type="${p(l.type||"")}">
          <div class="notif-icon">${g}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${p(l.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${T(l.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${p(l.message)}</div>
          </div>
        </div>`}).join(""),n.querySelectorAll(".notif-item").forEach(l=>{l.onclick=async()=>{const g=l.dataset.id,x=l.dataset.type;if(g&&l.classList.contains("unread")){l.classList.remove("unread");try{await E(`/notifications/${g}/read`,{method:"PATCH"})}catch{}}S(),x&&x.includes("task")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("dailytasks"):x&&x.includes("job")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("jobs"):x&&x.includes("ticket")&&typeof window.ci360NavTab=="function"?window.ci360NavTab("tickets"):x&&x.includes("target")&&typeof window.ci360NavTab=="function"&&window.ci360NavTab("targets")}})}async function M(){try{const c=await Z("/notifications");k=c.notifications||[];const l=c.unreadCount||0;e.textContent=l>99?"99+":l,e.style.display=l>0?"flex":"none",u&&(u.textContent=l>0?`${l} new`:"",u.style.display=l>0?"inline-block":"none"),b?(k.forEach(g=>h.add(String(g._id))),b=!1,localStorage.setItem("ci360_notifs_initialized","1")):k.forEach(g=>{!g.read&&!h.has(String(g._id))&&(h.add(String(g._id)),j({title:g.title||"CI360 Alert",message:g.message||"",type:g.type,id:g._id}))});try{localStorage.setItem("ci360_seen_notif_ids",JSON.stringify(Array.from(h).slice(-100)))}catch{}$()}catch{n&&k.length===0&&(n.innerHTML='<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>')}}M();const d=setInterval(M,15e3);window.addEventListener("beforeunload",()=>clearInterval(d)),s&&(s.onclick=async c=>{if(c.stopPropagation(),!("Notification"in window&&Notification.permission!=="granted"&&!await W()))try{s.disabled=!0,s.textContent="…";const g=(await H("/notifications/test",{})).notification||{title:"🔔 CI360 Alert Test",message:`Test alert delivered at ${new Date().toLocaleTimeString()}!`};await j({title:g.title,message:g.message,type:"test_alert",id:g._id||Date.now()}),y("✓ Test notification delivered to your device!"),await M()}catch{await j({title:"🔔 CI360 Alert Test",message:`Local test notification delivered at ${new Date().toLocaleTimeString()}!`}),y("✓ Local test notification delivered!")}finally{s.disabled=!1,s.textContent="🧪 Test"}}),i.querySelectorAll(".notif-filter-btn").forEach(c=>{c.onclick=l=>{l.stopPropagation(),i.querySelectorAll(".notif-filter-btn").forEach(g=>g.classList.remove("active")),c.classList.add("active"),m=c.dataset.filter,$()}});const f=document.getElementById("notifBackdrop");function I(){i.style.display="flex",i.classList.add("open"),f&&(f.style.display="block",f.classList.add("open")),t.setAttribute("aria-expanded","true"),w();const c=document.getElementById("topbarUserDropdown");c&&(c.style.display="none"),M()}function S(){i.style.display="none",i.classList.remove("open"),f&&(f.style.display="none",f.classList.remove("open")),t.setAttribute("aria-expanded","false")}function R(){i.classList.contains("open")||i.style.display==="flex"||i.style.display==="block"?S():I()}window.ci360CloseNotifications=S;const A=document.getElementById("notifCloseBtn");A&&(A.onclick=c=>{c.stopPropagation(),S()}),f&&(f.onclick=c=>{c.stopPropagation(),S()}),t.onclick=c=>{c.stopPropagation(),R()},o&&(o.onclick=async c=>{c.stopPropagation();try{await E("/notifications/read",{method:"PATCH"}),e.style.display="none",u&&(u.textContent="",u.style.display="none"),k.forEach(l=>l.read=!0),$(),y("All notifications marked as read")}catch(l){y(l.message,!0)}}),document.addEventListener("click",c=>{!i.contains(c.target)&&c.target!==t&&(i.style.display="none")}),a&&(a.onclick=async c=>{c.stopPropagation();try{await X("/notifications"),k=[],n.innerHTML='<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>',e.style.display="none",u&&(u.textContent="",u.style.display="none"),y("Notifications cleared")}catch(l){y(l.message,!0)}})}function kt({user:t,currentRole:i,activeTab:e,tabs:n,title:a,subtitle:o}){const s=t&&t.name?t.name.charAt(0).toUpperCase():"U",r=t&&t.role==="superadmin"?"Super Admin":t&&t.role==="employee"?"Employee":t&&t.role==="client"?"Client":t&&t.role?t.role.toUpperCase():"User",v=t&&t.name?t.name:"User",u=t&&t.email?t.email:t&&t.username?t.username:"",w=n&&n.some(m=>m.key==="logjob"),h=n&&n.find(m=>m.key===e),b=a||h&&h.label||"Dashboard";let k=[];return i==="superadmin"?k=[{key:"dashboard",label:"Dashboard",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',active:e==="dashboard"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"logjob",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"byclient",label:"Clients",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="byclient"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["dashboard","dailytasks","logjob","byclient"].includes(e),isMore:!0}]:i==="employee"?k=[{key:"myjobs",label:"Jobs",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',active:e==="myjobs"},{key:"dailytasks",label:"Tasks",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',active:e==="dailytasks"},{key:"tickets",label:"Tickets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>',active:e==="tickets"},{key:"targets",label:"Targets",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',active:e==="targets"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["myjobs","dailytasks","tickets","targets"].includes(e),isMore:!0}]:k=[{key:"logjob",label:"Log Job",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',active:e==="logjob"},{key:"jobs",label:"Delivered",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',active:e==="jobs"},{key:"team",label:"Team",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',active:e==="team"},{key:"__more__",label:"More",iconSvg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>',active:!["logjob","jobs","team"].includes(e),isMore:!0}],`
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
          ${n.map(m=>`
            <button type="button" class="sidebar-item ${e===m.key?"active":""}" data-tab="${m.key}" aria-current="${e===m.key?"page":"false"}">
              <span class="icon">${m.icon||"📌"}</span>
              <span>${m.label}</span>
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
                <span class="topbar-crumb-active">${p(b)}</span>
              </div>
              <div class="topbar-title-row">
                <h1 class="page-heading-title">${p(b)}</h1>
                ${o?`<span class="topbar-subtitle-pill" title="${p(o)}">${p(o)}</span>`:""}
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
              <button class="theme-btn ${B()==="light"?"active":""}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${B()==="dark"?"active":""}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${pt()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${s}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${p(v)}</span>
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
                      <div class="tud-name">${p(v)}</div>
                      ${u?`<div class="tud-email">${p(u)}</div>`:""}
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
                      <span class="tud-icon">${B()==="dark"?"☀️":"🌙"}</span>
                      <span class="tud-label">Switch to ${B()==="dark"?"Light":"Dark"} Mode</span>
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
                        <span style="font-size:16px" id="tudMobileThemeIcon">${B()==="dark"?"☀️":"🌙"}</span>
                        <span id="tudMobileThemeText">${B()==="dark"?"Light Mode":"Dark Mode"}</span>
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
          ${k.map(m=>`
            <button type="button" class="mbn-item ${m.active?"active":""}" data-tab="${m.key}" ${m.isMore?'id="mobileMoreBtn"':""}>
              <span class="mbn-icon">${m.iconSvg}</span>
              <span class="mbn-label">${p(m.label)}</span>
              ${m.active?'<span class="mbn-active-dot"></span>':""}
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
              ${n.map(m=>`
                <button type="button" class="mms-card ${e===m.key?"active":""}" data-tab="${m.key}">
                  <span class="mms-card-icon">${m.icon||"📌"}</span>
                  <span class="mms-card-label">${p(m.label)}</span>
                </button>
              `).join("")}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${B()==="dark"?"☀️ Light Mode":"🌙 Dark Mode"}</span>
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
    </div>`}function wt(t){const i=document.getElementById("mobileNavToggle"),e=document.getElementById("appSidebar"),n=document.getElementById("sidebarOverlay");function a(){e&&e.classList.add("open"),n&&n.classList.add("open")}function o(){e&&e.classList.remove("open"),n&&n.classList.remove("open")}i&&(i.onclick=a),n&&(n.onclick=o);const s=document.getElementById("mobileMoreBackdrop"),r=document.getElementById("mobileMoreSheet"),v=document.getElementById("mmsCloseBtn"),u=document.getElementById("mobileMoreBtn");function w(){s&&s.classList.add("active"),r&&r.classList.add("active")}function h(){s&&s.classList.remove("active"),r&&r.classList.remove("active")}u&&(u.onclick=l=>{l.stopPropagation(),w()}),v&&(v.onclick=h),s&&(s.onclick=l=>{l.target===s&&h()}),document.querySelectorAll(".mbn-item").forEach(l=>{l.dataset.tab&&l.dataset.tab!=="__more__"&&(l.onclick=()=>{h(),t&&t(l.dataset.tab)})}),document.querySelectorAll(".mms-card").forEach(l=>{l.onclick=()=>{h(),t&&t(l.dataset.tab)}});const b=document.getElementById("mmsToggleThemeBtn");b&&(b.onclick=()=>{_(B()==="dark"?"light":"dark")});const k=document.getElementById("mmsNotifsBtn");k&&(k.onclick=()=>{h();const l=document.getElementById("notifBellBtn");l&&l.click()});const m=document.getElementById("mmsLogoutBtn");m&&(m.onclick=D);const L=document.getElementById("mobileCalBtn");L&&(L.onclick=()=>{const l=document.querySelector(".period-row");l&&(l.scrollIntoView({behavior:"smooth",block:"center"}),l.classList.add("pulse-highlight"),setTimeout(()=>l.classList.remove("pulse-highlight"),1200))});const T=document.getElementById("tudMobileThemeBtn");T&&(T.onclick=l=>{l.stopPropagation(),_(B()==="dark"?"light":"dark")});const $=document.getElementById("tudMobileNotifsBtn");$&&($.onclick=l=>{l.stopPropagation();const g=document.getElementById("topbarUserDropdown");g&&(g.style.display="none");const x=document.getElementById("notifBellBtn");x&&x.click()});const M=document.getElementById("tudMobileSettingsBtn");M&&(M.onclick=l=>{l.stopPropagation();const g=document.getElementById("topbarUserDropdown");g&&(g.style.display="none"),document.querySelector('[data-tab="manage"]')&&t?t("manage"):w()});const d=document.getElementById("tudMobileHelpBtn");d&&(d.onclick=l=>{l.stopPropagation();const g=document.getElementById("topbarUserDropdown");g&&(g.style.display="none"),document.querySelector('[data-tab="tickets"]')&&t?t("tickets"):rt(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `)});const f=document.getElementById("logoutBtnMobile");f&&(f.onclick=D);const I=document.getElementById("topbarUserBtn"),S=document.getElementById("topbarUserDropdown");I&&S&&(I.onclick=l=>{l.stopPropagation();const g=S.style.display!=="none";S.style.display=g?"none":"block",I.setAttribute("aria-expanded",String(!g)),typeof window.ci360CloseNotifications=="function"&&window.ci360CloseNotifications()},document.addEventListener("click",l=>{!S.contains(l.target)&&!I.contains(l.target)&&(S.style.display="none",I.setAttribute("aria-expanded","false"))}));const R=document.getElementById("tudThemeToggleBtn");R&&(R.onclick=()=>{_(B()==="dark"?"light":"dark")});const A=document.getElementById("topbarQuickLogJobBtn");A&&(A.onclick=()=>{t&&t("logjob")});const c=document.getElementById("logoutBtn");c&&(c.onclick=D),ut(),document.querySelectorAll(".sidebar-item").forEach(l=>{l.onclick=()=>{o(),t&&t(l.dataset.tab)}}),xt(t)}function xt(t){const i=document.getElementById("cmdPaletteBackdrop"),e=document.getElementById("cmdSearchInput"),n=document.getElementById("cmdResultsList"),a=document.getElementById("topbarCmdTrigger"),o=document.getElementById("topbarCmdTriggerMobile"),s=document.getElementById("tudCmdBtn"),r=document.getElementById("cmdCloseKbd");if(!i||!e||!n)return;const v=Array.from(document.querySelectorAll(".sidebar-item")),u=v.map(d=>{var f,I;return{type:"tab",id:d.dataset.tab,label:((f=d.querySelector("span:last-child"))==null?void 0:f.textContent)||d.dataset.tab,icon:((I=d.querySelector(".icon"))==null?void 0:I.textContent)||"📌",sub:"Navigate to section",action:()=>{t&&t(d.dataset.tab)}}});v.some(d=>d.dataset.tab==="logjob")&&u.unshift({type:"action",id:"quick-logjob",label:"Log a New Job",icon:"➕",sub:"Create & submit work delivery",action:()=>{t&&t("logjob")}}),u.push({type:"action",id:"toggle-theme",label:B()==="dark"?"Switch to Light Mode":"Switch to Dark Mode",icon:"🌓",sub:"Change interface appearance",action:()=>{_(B()==="dark"?"light":"dark")}}),u.push({type:"action",id:"notifs",label:"View Notifications",icon:"🔔",sub:"Pending alerts and notices",action:()=>{const d=document.getElementById("notifBellBtn");d&&d.click()}}),u.push({type:"action",id:"logout",label:"Sign out of CI360",icon:"🚪",sub:"End current authenticated session",action:()=>D()});let h=0,b=[...u];function k(){if(!b.length){n.innerHTML='<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>';return}n.innerHTML=b.map((d,f)=>`
      <div class="cmd-result ${f===h?"selected":""}" data-idx="${f}">
        <div class="cmd-result-icon">${d.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${p(d.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${p(d.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join(""),n.querySelectorAll(".cmd-result").forEach(d=>{d.onmouseenter=()=>{h=Number(d.dataset.idx),m()},d.onclick=()=>{L(Number(d.dataset.idx))}})}function m(){n.querySelectorAll(".cmd-result").forEach((d,f)=>{d.classList.toggle("selected",f===h)})}function L(d){const f=b[d];f&&f.action&&($(),f.action())}function T(){const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none"),i.classList.add("open"),e.value="",b=[...u],h=0,k(),setTimeout(()=>e.focus(),50)}function $(){i.classList.remove("open"),e.blur()}a&&(a.onclick=T),o&&(o.onclick=T),s&&(s.onclick=()=>{const d=document.getElementById("topbarUserDropdown");d&&(d.style.display="none"),T()}),r&&(r.onclick=$),i.onclick=d=>{d.target===i&&$()},e.oninput=()=>{const d=e.value.trim().toLowerCase();d?b=u.filter(f=>f.label.toLowerCase().includes(d)||f.sub.toLowerCase().includes(d)):b=[...u],h=0,k()},e.onkeydown=d=>{if(d.key==="ArrowDown"){if(d.preventDefault(),b.length>0){h=(h+1)%b.length,m();const f=n.querySelector(".cmd-result.selected");f&&f.scrollIntoView({block:"nearest"})}}else if(d.key==="ArrowUp"){if(d.preventDefault(),b.length>0){h=(h-1+b.length)%b.length,m();const f=n.querySelector(".cmd-result.selected");f&&f.scrollIntoView({block:"nearest"})}}else d.key==="Enter"?(d.preventDefault(),L(h)):d.key==="Escape"&&(d.preventDefault(),$())};const M=d=>{(d.metaKey||d.ctrlKey)&&d.key.toLowerCase()==="k"?(d.preventDefault(),i.classList.contains("open")?$():T()):d.key==="Escape"&&i.classList.contains("open")&&$()};window.__ci360CmdKeyHandler&&window.removeEventListener("keydown",window.__ci360CmdKeyHandler),window.__ci360CmdKeyHandler=M,window.addEventListener("keydown",M)}function Bt(t=4){return`
    <div class="grid grid-${Math.min(t,4)}" style="margin-bottom:24px">
      ${Array(t).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join("")}
    </div>`}function $t(t,i,e="📁",n=""){return`
    <div class="empty">
      <span class="empty-icon">${e}</span>
      <h3>${p(t)}</h3>
      <p>${p(i)}</p>
      ${n}
    </div>`}function St(t,i,e="",n="📊",a=""){let o="";return a&&(o=`<span class="kpi-trend ${a.startsWith("+")||a.includes("↑")||a.toLowerCase().includes("up")?"up":"down"}">${p(a)}</span>`),`
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${p(t)}</span>
        <div class="kpi-icon">${n}</div>
      </div>
      <div class="kpi-value">${p(i)}</div>
      <div class="kpi-sub">${o}<span>${p(e)}</span></div>
    </div>`}function Ct(t,i="gray"){return`<span class="badge ${i}">${p(t)}</span>`}function Mt(t,i="indigo"){const e=Math.min(100,Math.max(0,Number(t)||0));return`
    <div class="progress-bar-wrap" title="${e.toFixed(0)}%">
      <div class="progress-bar-fill ${i}" style="width:${e}%"></div>
    </div>`}function It(t){return`<div class="period-row">${[["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"],["quarter","This Quarter"]].map(([e,n])=>`<button class="pchip ${t===e?"active":""}" data-period="${e}">${n}</button>`).join("")}</div>`}function Tt(t){if(!t)return"U";const i=t.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function st(t){if(!t)return"";const i=new Date,e=new Date(t),n=Math.floor((i-e)/1e3);if(n<60)return"Just now";const a=Math.floor(n/60);if(a<60)return`${a}m ago`;const o=Math.floor(a/60);if(o<24)return`${o}h ago`;const s=Math.floor(o/24);return s<7?`${s}d ago`:O(t)}function F(t){if(t=Number(t)||0,t===0)return"0 B";const i=1024,e=["B","KB","MB","GB"],n=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,n)).toFixed(1))+" "+e[n]}function z(t="",i=""){const e=(t.split(".").pop()||"").toLowerCase();return["png","jpg","jpeg","gif","webp","svg","bmp","ico"].includes(e)||i.startsWith("image/")?{icon:"🖼️",cls:"img",label:"Image"}:e==="pdf"||i==="application/pdf"?{icon:"📄",cls:"pdf",label:"PDF Document"}:["doc","docx","odt","txt","rtf"].includes(e)?{icon:"📝",cls:"doc",label:"Document"}:["xls","xlsx","csv","ods"].includes(e)?{icon:"📊",cls:"sheet",label:"Spreadsheet"}:["zip","rar","7z","tar","gz"].includes(e)?{icon:"📦",cls:"zip",label:"Archive"}:["mp4","mov","avi","mkv","webm"].includes(e)||i.startsWith("video/")?{icon:"🎬",cls:"video",label:"Video"}:["mp3","wav","ogg","m4a"].includes(e)||i.startsWith("audio/")?{icon:"🎵",cls:"audio",label:"Audio"}:{icon:"📎",cls:"other",label:"File"}}function Et(t){return t?z(t.name||t.filename||"",t.type||"").cls==="img":!1}function et(t){if(!t||!t.url)return;const i=z(t.name,t.type),e=i.cls==="img",n=i.cls==="pdf",a=p(t.name||"Attachment"),o=F(t.size),s=document.createElement("div");s.className="preview-modal-overlay",s.innerHTML=`
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${i.icon}</span>
          <span>${a}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${o})</span>
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
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${i.label} · ${o}</div>
            <a href="${t.url}" download="${a}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `}
      </div>
    </div>
  `,s.onclick=r=>{(r.target===s||r.target.closest(".preview-modal-close"))&&s.remove()},document.body.appendChild(s)}function K(t=[],i={}){if(!t||!t.length)return"";const e=!!i.canDelete;return`
    <div class="attachment-chips-wrap">
      ${i.title?`<div class="attachment-chips-header">📎 ${p(i.title)} <span style="font-weight:500;color:var(--text-4)">(${t.length})</span></div>`:""}
      <div class="attachment-chips-list">
        ${t.map((n,a)=>{const o=z(n.name,n.type),s=p(n.name||"File"),r=F(n.size);return`
            <div class="attachment-chip" data-idx="${a}" title="${s} (${r})">
              <span class="file-type-icon ${o.cls}" style="width:22px;height:22px;font-size:12px">${o.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${a}, this)">${s}</span>
              <span class="attachment-chip-size">${r}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${a}, this)">👁️</button>
                <a href="${n.url}" download="${s}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${e?`<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${a}, this)">✕</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}const C={};async function G(t){const i=Array.from(t||[]);if(!i.length)return[];const n=(await Promise.all(i.map(async a=>new Promise(o=>{const s=new FileReader;s.onload=()=>{o({name:a.name,type:a.type,size:a.size,base64:s.result,data:s.result})},s.onerror=()=>o(null),s.readAsDataURL(a)})))).filter(Boolean);if(!n.length)return[];try{const a=await H("/upload",{files:n});if(a&&a.files&&a.files.length)return a.files}catch(a){console.warn("Backend upload failed, fallback to base64 data URLs:",a)}return n.map(a=>({name:a.name,url:a.base64,size:a.size,type:a.type,uploadedAt:new Date}))}function it({id:t="uploader",label:i="Attachments & Files",subtitle:e="Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets",multiple:n=!0,accept:a="*/*",maxFiles:o=10}={}){return`
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
  `}function ot(t,i={}){const e=document.getElementById("zone-"+t),n=document.getElementById("input-"+t),a=document.getElementById("list-"+t),o=document.getElementById("count-"+t);C[t]=i.existing?[...i.existing]:[];function s(){const r=C[t]||[];if(o&&(o.textContent=`${r.length} file${r.length===1?"":"s"} attached`),!!a){if(!r.length){a.innerHTML="";return}a.innerHTML=r.map((v,u)=>{const w=z(v.name,v.type),h=p(v.name||"File"),b=F(v.size);return`
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${w.cls}">${w.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${h}">${h}</div>
              <div class="uploader-file-size">${w.label} · ${b}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${t}', ${u})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${t}', ${u})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(""),i.onChange&&i.onChange(r)}}window.__removeUploaderFile=(r,v)=>{if(C[r]){C[r].splice(v,1);const u=window[`__update_${r}`];u&&u()}},window.__previewUploaderFile=(r,v)=>{const u=(C[r]||[])[v];u&&et(u)},window[`__update_${t}`]=s,e&&n&&(e.onclick=r=>{r.target.tagName!=="BUTTON"&&!r.target.closest("button")&&n.click()},e.ondragover=r=>{r.preventDefault(),e.classList.add("dragover")},e.ondragleave=()=>e.classList.remove("dragover"),e.ondrop=async r=>{if(r.preventDefault(),e.classList.remove("dragover"),r.dataTransfer&&r.dataTransfer.files&&r.dataTransfer.files.length){y("Uploading files… ⏳");const v=await G(r.dataTransfer.files);C[t]=[...C[t]||[],...v],s(),y("Files attached! ✓")}},n.onchange=async()=>{if(n.files&&n.files.length){y("Uploading files… ⏳");const r=await G(n.files);C[t]=[...C[t]||[],...r],s(),y("Files attached! ✓"),n.value=""}}),s()}function nt(t){return C[t]||[]}function mt(t,i=[]){C[t]=[...i];const e=window[`__update_${t}`];e&&e()}window.__openPreview=(t,i)=>{const e=i.closest(".attachment-chips-wrap");if(!e)return;const n=i.closest(".attachment-chip");if(!n)return;const a=Number(n.dataset.idx),o=e.dataset.attachments;if(o)try{const s=JSON.parse(decodeURIComponent(o));s[a]&&et(s[a])}catch{}};function Lt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");return`
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
        ${it({id:"tkup-"+e,label:"Attach Screenshots or Reference Files",subtitle:"Upload screenshots, mockups, briefs, or error logs"})}
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
    </div>`}const Nt={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},_t={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function At(t,i){const e=(t.status||"Open").toLowerCase().replace(" ","-"),n=t.status==="Open",a=(t._id||"").slice(-4).toUpperCase(),o=Tt(t.userName),s=encodeURIComponent(JSON.stringify(t.attachments||[])),r=encodeURIComponent(JSON.stringify(t.adminAttachments||[]));return`
    <div class="ticket-card status-${e}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${a}</span>
            <span class="ticket-subject">${p(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${Nt[t.status]||"gray"}">
            ${n?'<span class="pulse-dot"></span>':""} ${p(t.status)}
          </span>
          <span class="badge ${_t[t.priority]||"gray"}">${p(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${o}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${p(t.userName)}
            <span class="ticket-role-pill">${p(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${st(t.createdAt)} · ${O(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${p(t.message)}</div>

      ${t.attachments&&t.attachments.length?`
        <div data-attachments="${s}">
          ${K(t.attachments,{title:"Ticket Attachments"})}
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
              ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${st(t.repliedAt)}</span>`:""}
            </div>
            <div class="ticket-admin-reply-text">${p(t.adminReply)}</div>
            ${t.adminAttachments&&t.adminAttachments.length?`
              <div data-attachments="${r}">
                ${K(t.adminAttachments,{title:"Support Attached Files"})}
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
            ${it({id:"tkreplyup-"+t._id,label:"Attach Response Files / Deliverables",subtitle:"Upload updated files, receipts, or resolution proofs"})}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>`:""}
    </div>`}async function N(t,i,e){const n=document.getElementById("tklist-"+i),a=document.getElementById("tkcnt-"+i);if(n)try{const o=await Z("/tickets/job/"+t);a&&(a.textContent=o.length),o.length?(n.innerHTML=o.map(s=>At(s,e)).join(""),Dt(t,i,e,n,o)):n.innerHTML='<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>'}catch{n.innerHTML='<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>'}}function Dt(t,i,e,n,a){e&&(n.querySelectorAll(".tk-status-sel").forEach(o=>{o.onchange=async()=>{try{await q("/tickets/"+o.dataset.tkid,{status:o.value}),y("Status updated"),N(t,i,e)}catch(s){y(s.message,!0)}}}),n.querySelectorAll(".tk-quick-resolve-btn").forEach(o=>{o.onclick=async()=>{try{await q("/tickets/"+o.dataset.tkid,{status:"Resolved"}),y("Ticket marked as Resolved! 🎉"),N(t,i,e)}catch(s){y(s.message,!0)}}}),n.querySelectorAll(".ticket-template-btn").forEach(o=>{o.onclick=()=>{const s=document.getElementById("tkreplytxt-"+o.dataset.tkid);s&&(s.value=o.dataset.tpl,s.focus())}}),n.querySelectorAll(".tk-reply-toggle").forEach(o=>{o.onclick=()=>{const s=o.dataset.tkid,r=document.getElementById("tkreplyform-"+s);if(r){r.classList.toggle("show");const v=a.find(u=>u._id===s);ot("tkreplyup-"+s,{existing:v?v.adminAttachments:[]})}}}),n.querySelectorAll(".tk-reply-cancel").forEach(o=>{o.onclick=()=>{const s=document.getElementById("tkreplyform-"+o.dataset.tkid);s&&s.classList.remove("show")}}),n.querySelectorAll(".tk-reply-save").forEach(o=>{o.onclick=async()=>{const s=o.dataset.tkid,r=document.getElementById("tkreplytxt-"+s);if(!r)return;const v=nt("tkreplyup-"+s);try{await q("/tickets/"+s,{adminReply:r.value.trim(),adminAttachments:v}),y("Response saved! 🛡️"),N(t,i,e)}catch(u){y(u.message,!0)}}}),n.querySelectorAll(".tk-del-btn").forEach(o=>{o.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await X("/tickets/"+o.dataset.tkid),y("Ticket deleted"),N(t,i,e)}catch(s){y(s.message,!0)}}}))}function Pt(t,i=!1){const e=t.replace(/[^a-z0-9]/gi,"");N(t,e,i),ot("tkup-"+e);const n=document.querySelector(`[data-jobid="${t}"].ticket-toggle-btn`);n&&(n.onclick=()=>{const s=document.getElementById("tkform-"+e);if(!s)return;const r=s.style.display==="block";s.style.display=r?"none":"block",n.textContent=r?"+ Raise Ticket":"✕ Cancel"});const a=document.querySelector(`.tk-cancel-btn[data-safeid="${e}"]`);a&&(a.onclick=()=>{const s=document.getElementById("tkform-"+e);s&&(s.style.display="none"),n&&(n.textContent="+ Raise Ticket")});const o=document.querySelector(`.tk-submit-btn[data-safeid="${e}"]`);o&&(o.onclick=async()=>{var w,h;const s=(w=(document.getElementById("tksub-"+e)||{}).value)==null?void 0:w.trim(),r=(h=(document.getElementById("tkmsg-"+e)||{}).value)==null?void 0:h.trim(),v=(document.getElementById("tkpri-"+e)||{}).value,u=nt("tkup-"+e);if(!s){y("Please enter a subject",!0);return}if(!r){y("Please enter a message",!0);return}o.disabled=!0,o.textContent="Submitting…";try{await H("/tickets",{jobId:t,subject:s,message:r,priority:v,attachments:u}),y("Ticket submitted! 🎫");const b=document.getElementById("tkform-"+e);b&&(b.style.display="none"),n&&(n.textContent="+ Raise Ticket");const k=document.getElementById("tksub-"+e),m=document.getElementById("tkmsg-"+e);k&&(k.value=""),m&&(m.value=""),mt("tkup-"+e,[]),N(t,e,i)}catch(b){y(b.message,!0)}finally{o.disabled=!1,o.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket'}})}function jt(){return""}function zt(){}window.__setTheme=function(t){_(t)};Object.assign(window,{getToken:Q,getUser:at,setSession:ft,clearSession:Y,requireAuth:vt,initTheme:lt,api:E,apiGet:Z,apiPost:H,apiPut:q,apiPatch:ht,apiDelete:X,fmtINR:bt,fmtHours:yt,escapeHtml:p,fmtDate:O,flashToast:y,openModal:rt,logout:D,getTheme:B,setTheme:_,initServiceWorker:tt,playNotificationChime:ct,triggerPhoneVibration:dt,requestNotificationPermission:W,triggerSystemNotification:j,fmtFileSize:F,getFileCategory:z,isImageAttachment:Et,openFilePreviewModal:et,renderAttachmentChips:K,uploadFilesToServer:G,renderAttachmentUploader:it,bindAttachmentUploader:ot,getUploaderAttachments:nt,setUploaderAttachments:mt,renderRoleSwitcher:jt,bindRoleSwitcher:zt,renderNotificationBell:pt,initNotificationBell:ut,renderAppShell:kt,bindAppShellEvents:wt,renderSkeletonCards:Bt,renderEmptyState:$t,renderKpiCard:St,renderBadge:Ct,renderProgressBar:Mt,renderPeriodPicker:It,renderSupportTicketSection:Lt,bindSupportTicketSection:Pt});export{Q as a,H as b,at as g,ft as s};
