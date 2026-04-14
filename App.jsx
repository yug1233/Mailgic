import { ContactPage } from "./Contact.jsx";
import { useState, useEffect, useRef, memo, useCallback } from "react";
import {
  Mail, Sparkles, Copy, Check, ChevronRight,
  User, LogOut, Menu, X, BarChart2, FileText, TrendingUp,
  Calendar, Eye, EyeOff, ArrowLeft, Loader2, Star,
  Zap, Shield, RefreshCw, Users, Headphones
} from "lucide-react";

/* ═══════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════ */
const SB_URL  = "https://lrvcliytsachlwrwjhpz.supabase.co";
const SB_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydmNsaXl0c2FjaGx3cndqaHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NjUxODUsImV4cCI6MjA4ODQ0MTE4NX0.dhqJ1NhqR3EQtXx7y8nrxSx6S7VifxbUUMiucAk1yGs";
const AUTH_PROXY = `${SB_URL}/functions/v1/auth-proxy`;

/* ═══════════════════════════════════════════
   SUPABASE HELPERS
═══════════════════════════════════════════ */
const sbH = (tok) => ({
  apikey: SB_ANON,
  Authorization: `Bearer ${tok || SB_ANON}`,
  "Content-Type": "application/json",
});
const sbAuth = {
  signUp: (email, password, fullName) =>
    fetch(AUTH_PROXY, { method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ action:"signup", email, password, fullName }) }).then(r=>r.json()),
  signIn: (email, password) =>
    fetch(AUTH_PROXY, { method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ action:"signin", email, password }) }).then(r=>r.json()),
  signOut: (tok) =>
    fetch(`${SB_URL}/auth/v1/logout`, { method:"POST", headers: sbH(tok) }).catch(()=>{}),
};
const sbDb = {
  insert: (tok, uid, topic, tone, length, output) =>
    fetch(`${SB_URL}/rest/v1/email_generations`, {
      method:"POST", headers:{ ...sbH(tok), Prefer:"return=minimal" },
      body: JSON.stringify({ user_id:uid, topic, tone, length, output })
    }),
  getAll: (tok) =>
    fetch(`${SB_URL}/rest/v1/email_generations?order=created_at.desc&limit=50`, { headers: sbH(tok) })
      .then(r=>r.json()),
};

/* ═══════════════════════════════════════════
   CSS — all styles, zero external deps
═══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
*,*::before,*::after{box-sizing:border-box;}
h1,h2,h3,h4,h5,h6,p{margin:0;}
body{margin:0;overflow-x:hidden;font-family:'Plus Jakarta Sans',sans-serif;}
button{cursor:pointer;border:none;background:none;font-family:inherit;}
input,textarea{font-family:inherit;}

@keyframes shimBg{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes gradBtn{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes colFwd{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
@keyframes colBwd{0%{transform:translateY(-50%)}100%{transform:translateY(0)}}
@keyframes spring{0%{transform:translateY(48px) scale(.95);opacity:0}55%{transform:translateY(-6px) scale(1.01);opacity:1}80%{transform:translateY(2px) scale(.995)}100%{transform:translateY(0) scale(1);opacity:1}}
@keyframes slideUp{from{transform:translateY(28px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes slideLeft{from{transform:translateX(-32px);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes slideRight{from{transform:translateX(32px);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pathDraw{from{stroke-dashoffset:1400}to{stroke-dashoffset:0}}
@keyframes textShimmer{0%{background-position:100% center}100%{background-position:0% center}}
@keyframes navDrop{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
@keyframes drawX{0%{transform:scaleX(0);opacity:0}60%{opacity:.9}100%{transform:scaleX(1);opacity:.6}}
@keyframes drawY{0%{transform:scaleY(0);opacity:0}60%{opacity:.9}100%{transform:scaleY(1);opacity:.6}}
@keyframes lineShimmer{0%{opacity:0}35%{opacity:.28}100%{opacity:0}}

.gbtn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:12px 26px;border-radius:11px;font-weight:700;font-size:14px;color:#fff;border:none;cursor:pointer;background:linear-gradient(135deg,#7C3AED,#6D28D9,#8B5CF6,#7C3AED);background-size:300% 300%;animation:gradBtn 4s ease infinite;transition:transform .2s,box-shadow .2s;font-family:'Plus Jakarta Sans',sans-serif;min-width:132px;}
.gbtn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(124,58,237,.32);}
.gbtn:active{transform:translateY(0);}
.gbtn:disabled{opacity:.55;cursor:not-allowed;transform:none!important;animation:none;background:linear-gradient(135deg,#7C3AED,#6D28D9);}

.obtn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:11px 24px;border-radius:11px;font-weight:600;font-size:14px;color:#7C3AED;border:1.5px solid rgba(124,58,237,.32);background:transparent;transition:all .2s;font-family:'Plus Jakarta Sans',sans-serif;}
.obtn:hover{background:rgba(124,58,237,.06);border-color:#7C3AED;transform:translateY(-1px);}

.wbtn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:11px 24px;border-radius:11px;font-weight:600;font-size:14px;color:#fff;border:1.5px solid rgba(255,255,255,.30);background:rgba(255,255,255,.06);backdrop-filter:blur(4px);transition:all .2s;font-family:'Plus Jakarta Sans',sans-serif;}
.wbtn:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.52);}

.card{background:#fff;border-radius:20px;border:1px solid rgba(124,58,237,.1);box-shadow:0 4px 24px rgba(124,58,237,.06);}

/* Feature card — border grid pattern from features.txt */
.fc{padding:30px 26px;position:relative;overflow:hidden;border-right:1px solid rgba(124,58,237,.11);border-bottom:1px solid rgba(124,58,237,.11);transition:background .22s;}
.fc::before{content:'';position:absolute;left:0;top:18px;bottom:18px;width:3px;background:linear-gradient(180deg,#7C3AED,#8B5CF6);border-radius:0 3px 3px 0;transform:scaleY(0);transform-origin:bottom;transition:transform .26s;}
.fc-ov{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .2s;}
.fc:hover .fc-ov{opacity:1;}
.fc:hover::before{transform:scaleY(1);}
.fc-ti{display:inline-block;transition:transform .2s;}
.fc:hover .fc-ti{transform:translateX(4px);}

.nl{background:none;border:none;color:#374151;font-size:14px;font-weight:500;padding:6px 11px;border-radius:8px;cursor:pointer;transition:all .18s;font-family:'Plus Jakarta Sans',sans-serif;}
.nl:hover{color:#7C3AED;background:rgba(124,58,237,.06);}

.tc{padding:7px 15px;border-radius:50px;border:1.5px solid rgba(124,58,237,.16);font-size:13px;font-weight:500;color:#374151;background:transparent;cursor:pointer;transition:all .18s;font-family:'Plus Jakarta Sans',sans-serif;}
.tc.sel{background:#7C3AED;color:#fff;border-color:#7C3AED;}
.tc:hover:not(.sel){border-color:rgba(124,58,237,.38);color:#7C3AED;background:rgba(124,58,237,.04);}

.ainput{width:100%;padding:12px 15px;border-radius:11px;border:1.5px solid rgba(124,58,237,.16);font-size:14px;color:#111827;background:#fff;outline:none;transition:border-color .18s,box-shadow .18s;font-family:'Plus Jakarta Sans',sans-serif;}
.ainput:focus{border-color:#7C3AED;box-shadow:0 0 0 3px rgba(124,58,237,.07);}
.ainput::placeholder{color:#6b7280;}

.eout{width:100%;padding:15px;border-radius:11px;border:1.5px solid rgba(124,58,237,.16);font-size:14px;color:#111827;background:#fafbff;outline:none;resize:vertical;line-height:1.75;min-height:240px;font-family:'Plus Jakarta Sans',sans-serif;transition:border-color .18s;}
.eout:focus{border-color:#7C3AED;}

/* Shimmer heading — "Magician" */
.shim{background:linear-gradient(90deg,#7C3AED,#fff,#c4b5fd,#7C3AED);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimBg 3.5s ease infinite;}

/* Text shimmer subtitle — from text_genration_.txt */
.tshim{display:inline-block;--sp:90px;background-image:linear-gradient(90deg,#0000 calc(50% - var(--sp)),#fff,#0000 calc(50% + var(--sp))),linear-gradient(rgba(255,255,255,.58),rgba(255,255,255,.58));background-size:250% 100%,auto;background-repeat:no-repeat,padding-box;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:textShimmer 2.6s linear infinite;}

.cfwd{animation:colFwd 26s linear infinite;will-change:transform;contain:layout style;}
.cbwd{animation:colBwd 30s linear infinite;will-change:transform;contain:layout style;}
.bp{stroke-dasharray:1400;animation:pathDraw 7s ease-out forwards;}

.su0{animation:slideUp .65s ease .05s both;}
.su1{animation:slideUp .65s ease .15s both;}
.su2{animation:slideUp .65s ease .25s both;}
.su3{animation:slideUp .65s ease .35s both;}
.su4{animation:slideUp .65s ease .45s both;}
.sl{animation:slideLeft .75s ease .1s both;}
.sr{animation:slideRight .75s ease .32s both;}
.sp0{animation:spring .9s ease .08s both;}
.sp1{animation:spring .9s ease .22s both;}
.sp2{animation:spring .9s ease .36s both;}
.flt{animation:floatY 4s ease-in-out infinite;}
.fi{animation:fadeIn .65s ease both;}

.bdg{display:inline-flex;align-items:center;gap:5px;padding:5px 13px;border-radius:50px;font-size:12px;font-weight:600;letter-spacing:.3px;background:rgba(124,58,237,.08);color:#7C3AED;border:1px solid rgba(124,58,237,.17);}
.pp{border:2px solid #7C3AED!important;box-shadow:0 0 0 4px rgba(124,58,237,.07),0 20px 50px rgba(124,58,237,.13)!important;}

/* Dashboard */
.dsb{width:254px;min-height:calc(100vh - 64px);background:#fff;border-right:1px solid rgba(124,58,237,.08);padding:22px 15px;flex-shrink:0;display:flex;flex-direction:column;}
.dbt{display:flex;align-items:center;gap:9px;width:100%;padding:10px 13px;border-radius:10px;font-size:13.5px;font-weight:500;color:#374151;background:transparent;border:none;cursor:pointer;transition:all .16s;font-family:'Plus Jakarta Sans',sans-serif;margin-bottom:3px;}
.dbt:hover{background:rgba(124,58,237,.06);color:#7C3AED;}
.dbt.active{background:#7C3AED;color:#fff;}

/* Auth grid lines — from log_in.txt */
.alines{position:absolute;inset:0;pointer-events:none;opacity:.6;}
.hl,.vl{position:absolute;background:rgba(124,58,237,.2);will-change:transform,opacity;}
.hl{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:drawX .85s cubic-bezier(.22,.61,.36,1) forwards;}
.vl{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:drawY .95s cubic-bezier(.22,.61,.36,1) forwards;}
.hl:nth-child(1){top:22%;animation-delay:.1s}
.hl:nth-child(2){top:50%;animation-delay:.22s}
.hl:nth-child(3){top:78%;animation-delay:.34s}
.vl:nth-child(4){left:20%;animation-delay:.46s}
.vl:nth-child(5){left:50%;animation-delay:.58s}
.vl:nth-child(6){left:80%;animation-delay:.7s}
.hl::after,.vl::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(139,92,246,.32),transparent);opacity:0;animation:lineShimmer .9s ease-out forwards;}
.hl:nth-child(1)::after{animation-delay:.1s}.hl:nth-child(2)::after{animation-delay:.22s}.hl:nth-child(3)::after{animation-delay:.34s}
.vl:nth-child(4)::after{animation-delay:.46s}.vl:nth-child(5)::after{animation-delay:.58s}.vl:nth-child(6)::after{animation-delay:.7s}

@media(max-width:1024px){.pg{grid-template-columns:1fr 1fr!important;}}
@media(max-width:768px){
  .pg{grid-template-columns:1fr!important;perspective:none!important;}
  .pg>div{transform:none!important;margin-top:0!important;}
  .featg{grid-template-columns:1fr 1fr!important;}
  .tg{grid-template-columns:1fr!important;}
  .footg{grid-template-columns:1fr!important;}
  .nav-d{display:none!important;}
  .nav-a{display:none!important;}
  .ham{display:flex!important;}
  .hbtns{flex-direction:column!important;}
  .hbtns>*{width:100%!important;justify-content:center!important;}
  .hcard{display:none!important;}
  .dsb{display:none!important;}
  .hstats{flex-direction:column;gap:14px;align-items:center;}
  .gen-card{padding:22px 18px!important;}
  .auth-card{padding:28px 20px!important;}
}
@media(max-width:480px){
  .featg{grid-template-columns:1fr!important;}
  .hstats{flex-direction:column;gap:12px;}
}
`;

/* ═══════════════════════════════════════════
   WEBGL SHADER — Hero only (from shader.txt)
   Imperative THREE.js load, zero React state
═══════════════════════════════════════════ */
function WebGLShader() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let animId=null, renderer, scene, camera, mesh, uniforms;
    const VS=`attribute vec3 position;void main(){gl_Position=vec4(position,1.0);}`;
    const FS=`precision highp float;uniform vec2 resolution;uniform float time;uniform float xScale;uniform float yScale;uniform float distortion;void main(){vec2 p=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);float d=length(p)*distortion;float rx=p.x*(1.0+d),gx=p.x,bx=p.x*(1.0-d);float r=0.05/abs(p.y+sin((rx+time)*xScale)*yScale);float g=0.05/abs(p.y+sin((gx+time)*xScale)*yScale);float b=0.05/abs(p.y+sin((bx+time)*xScale)*yScale);gl_FragColor=vec4(r,g,b,1.0);}`;
    const init=(T)=>{
      scene=new T.Scene(); renderer=new T.WebGLRenderer({canvas}); camera=new T.OrthographicCamera(-1,1,1,-1,0,-1);
      renderer.setPixelRatio(window.devicePixelRatio); renderer.setClearColor(new T.Color(0x000000));
      uniforms={resolution:{value:[window.innerWidth,window.innerHeight]},time:{value:0},xScale:{value:1},yScale:{value:.5},distortion:{value:.05}};
      const geo=new T.BufferGeometry();
      geo.setAttribute("position",new T.BufferAttribute(new Float32Array([-1,-1,0,1,-1,0,-1,1,0,1,-1,0,-1,1,0,1,1,0]),3));
      mesh=new T.Mesh(geo,new T.RawShaderMaterial({vertexShader:VS,fragmentShader:FS,uniforms,side:T.DoubleSide}));
      scene.add(mesh); resize();
      const loop=()=>{uniforms.time.value+=.01;renderer.render(scene,camera);animId=requestAnimationFrame(loop);};
      loop();
    };
    const resize=()=>{ if(!renderer||!uniforms)return; renderer.setSize(window.innerWidth,window.innerHeight,false); uniforms.resolution.value=[window.innerWidth,window.innerHeight]; };
    window.addEventListener("resize",resize);
   // Skip WebGL entirely on mobile — saves 117kb
if(window.innerWidth < 768) return;
const load=()=>{
  if(window.THREE){ init(window.THREE); return; }
  const ex=document.querySelector('[data-id="threejs"]');
  if(ex){ ex.addEventListener("load",()=>init(window.THREE)); return; }
  const s=document.createElement("script");
  s.src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  s.setAttribute("data-id","threejs");
  s.onload=()=>init(window.THREE);
  document.head.appendChild(s);
};
requestAnimationFrame(load);
    return()=>{ cancelAnimationFrame(animId); window.removeEventListener("resize",resize); mesh?.geometry.dispose(); mesh?.material.dispose(); renderer?.dispose(); };
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
}

/* ═══════════════════════════════════════════
   AUTH PARTICLES — canvas rain, super light
   From log_in.txt — used on auth pages only
═══════════════════════════════════════════ */
function AuthParticles() {
  const ref = useRef(null);
  useEffect(()=>{
    const c=ref.current, ctx=c?.getContext("2d");
    if(!c||!ctx) return;
    let raf=0, ps=[];
    const sz=()=>{ c.width=window.innerWidth; c.height=window.innerHeight; };
    const mk=()=>({x:Math.random()*c.width,y:Math.random()*c.height,v:Math.random()*.22+.04,o:Math.random()*.28+.08});
    const init=()=>{ ps=[]; const n=Math.floor((c.width*c.height)/9000); for(let i=0;i<n;i++)ps.push(mk()); };
    const draw=()=>{ ctx.clearRect(0,0,c.width,c.height); ps.forEach(p=>{ p.y-=p.v; if(p.y<0)Object.assign(p,mk(),{y:c.height+20}); ctx.fillStyle=`rgba(196,181,253,${p.o})`; ctx.fillRect(p.x,p.y,.7,2.2); }); raf=requestAnimationFrame(draw); };
    sz(); init(); draw();
    const onR=()=>{ sz(); init(); };
    window.addEventListener("resize",onR);
    return()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",onR); };
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:.48,mixBlendMode:"screen"}}/>;
}

/* ═══════════════════════════════════════════
   SECTION BG — subtle animated SVG paths
═══════════════════════════════════════════ */
const SectionBg = memo(()=>(
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",overflow:"hidden"}}
    viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
    {["M0,160 Q300,80 600,170 T1200,150","M0,300 Q400,200 700,310 T1200,280","M0,430 Q350,340 650,440 T1200,410","M100,60 Q450,190 800,110 T1200,160","M0,520 Q300,460 600,525 T1200,505","M50,370 Q500,280 900,375 T1200,345"]
    .map((d,i)=><path key={i} d={d} fill="none" stroke="#7C3AED" strokeWidth="1" strokeDasharray="1400"
      className="bp" style={{opacity:.28,animationDelay:`${i*.45}s`}}/>)}
  </svg>
));

/* ═══════════════════════════════════════════
   LOGO
═══════════════════════════════════════════ */
function Logo({ size=28, dark=false }) {
  const gic = dark ? "#fff" : "#1a1a2e";
  const sp  = dark ? "rgba(196,181,253,.9)" : "#6B3FE7";
  return (
    <div style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
      {/* Icon */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
        style={{flexShrink:0}}>
        <rect width="100" height="100" rx="22" fill="#6B3FE7"/>
        <path d="M12 30 L50 66 L88 30"
          stroke="white" strokeWidth="17"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      {/* Wordmark — fixed spacing, no SVG text tricks */}
      <div style={{
        display:"flex", alignItems:"baseline", gap:0,
        fontFamily:"Syne,sans-serif", fontWeight:800,
        fontSize: size * 0.82,
        lineHeight:1, flexShrink:0,
        whiteSpace:"nowrap"
      }}>
        <span style={{color:"#6B3FE7"}}>Mail</span>
        <span style={{color:gic}}>gic</span>
        <span style={{
          color:sp, fontSize: size * 0.35,
          alignSelf:"flex-start", marginTop: size * 0.05,
          marginLeft:1
        }}>✦</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════ */
function Navbar({ page, user, nav, logout }) {
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
 useEffect(()=>{
  let ticking=false;
  const fn=()=>{ if(!ticking){ requestAnimationFrame(()=>{ setScrolled(window.scrollY>40); ticking=false; }); ticking=true; } };
  window.addEventListener("scroll",fn,{passive:true});
  return()=>window.removeEventListener("scroll",fn);
},[]);
  useEffect(()=>setOpen(false),[page]);
  const isHome=page==="home", glass=isHome&&!scrolled;
 const links=[{id:"features",l:"Features"},{id:"generator",l:"Generator"},{id:"pricing",l:"Pricing"},{id:"testimonials",l:"Testimonials"},{id:"blog",l:"Blog"}];
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,height:66,display:"flex",alignItems:"center",padding:"0 28px",background:glass?"transparent":"rgba(255,255,255,.97)",backdropFilter:glass?"none":"blur(20px)",borderBottom:glass?"none":"1px solid rgba(124,58,237,.07)",transition:"all .3s"}}>
      <div style={{cursor:"pointer"}} onClick={()=>nav("home")}><Logo size={27} dark={glass}/></div>
      <div className="nav-d" style={{display:"flex",gap:2,margin:"0 auto"}}>
        {isHome&&links.map(l=><button key={l.id} className="nl" onClick={()=>nav(l.id)} style={{color:glass?"rgba(255,255,255,.84)":"#374151"}}>{l.l}</button>)}
      </div>
      <div className="nav-a" style={{display:"flex",gap:10,alignItems:"center",marginLeft:isHome?0:"auto"}}>
        {user?(
          <><button className="nl" onClick={()=>nav("dashboard")} style={{display:"flex",alignItems:"center",gap:5,color:glass?"rgba(255,255,255,.9)":"#7C3AED",fontWeight:600}}><User size={14}/>Dashboard</button>
          <button className="obtn" onClick={logout} style={{padding:"8px 18px"}}>Sign out</button></>
        ):(
          <><button className="nl" onClick={()=>nav("login")} style={{color:glass?"rgba(255,255,255,.82)":"#374151"}}>Log in</button>
          <button className="gbtn" onClick={()=>nav("signup")} style={{padding:"9px 20px",fontSize:13.5}}>Get Started</button></>
        )}
      </div>
    <button className="ham" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(o=>!o)} style={{display:"none",alignItems:"center",justifyContent:"center",marginLeft:"auto",padding:8,borderRadius:8,color:glass?"#fff":"#374151",background:"none",border:"none"}}>
  {open?<X size={21}/>:<Menu size={21}/>}
</button>
      {open&&(
        <div style={{position:"absolute",top:66,left:0,right:0,background:"rgba(255,255,255,.98)",borderTop:"1px solid rgba(124,58,237,.07)",padding:"14px 22px",boxShadow:"0 8px 32px rgba(0,0,0,.09)",animation:"navDrop .22s ease both",zIndex:199}}>
          {isHome&&links.map(l=><button key={l.id} className="nl" onClick={()=>{nav(l.id);setOpen(false);}} style={{display:"block",width:"100%",textAlign:"left",padding:"11px 8px",fontSize:15}}>{l.l}</button>)}
          <div style={{borderTop:"1px solid rgba(124,58,237,.07)",marginTop:10,paddingTop:10,display:"flex",flexDirection:"column",gap:7}}>
            {user?(<><button className="gbtn" onClick={()=>{nav("dashboard");setOpen(false);}} style={{width:"100%",justifyContent:"center"}}>Dashboard</button><button className="obtn" onClick={()=>{logout();setOpen(false);}} style={{width:"100%",justifyContent:"center"}}>Sign out</button></>)
            :(<><button className="gbtn" onClick={()=>{nav("signup");setOpen(false);}} style={{width:"100%",justifyContent:"center"}}>Get Started Free</button><button className="obtn" onClick={()=>{nav("login");setOpen(false);}} style={{width:"100%",justifyContent:"center"}}>Log in</button></>)}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO — WebGL shader + dark overlay
═══════════════════════════════════════════ */
function Hero({ nav, user }) {
  return (
    <section id="home" style={{minHeight:"100vh",position:"relative",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",padding:"90px 24px 60px",isolation:"isolate",overflow:"hidden"}}>
      {window.innerWidth>=768 && <WebGLShader/>}
<div style={{position:"absolute",inset:0,
  background: window.innerWidth<768
    ? "linear-gradient(135deg,#0f0a1e 0%,#1e0a3c 50%,#0a0516 100%)"
    : "rgba(0,0,0,.45)",
  zIndex:1}}/>
     <main style={{position:"relative",zIndex:2,maxWidth:820,width:"100%",textAlign:"center"}}>
        <div className="su0" style={{display:"flex",justifyContent:"center",marginBottom:22}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 15px",borderRadius:50,fontSize:12,fontWeight:600,letterSpacing:.4,background:"rgba(139,92,246,.14)",color:"rgba(196,181,253,.95)",border:"1px solid rgba(139,92,246,.26)"}}><Sparkles size={11}/>AI Email Generation</span>
        </div>
        <h1 className="su1" style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"#fff",fontSize:"clamp(38px,7vw,80px)",lineHeight:1.08,marginBottom:20}}>
          The <span className="shim">Magician</span> for Your Mail
        </h1>
        {/* Text shimmer subtitle — from text_genration_.txt */}
        <p className="su2 tshim" style={{fontSize:"clamp(15px,2.5vw,18px)",maxWidth:560,margin:"0 auto 36px",lineHeight:1.72}}>
          Generate perfectly crafted emails in seconds. Professional, friendly, persuasive — any tone, instantly.
        </p>
        <div className="su3 hbtns" style={{display:"flex",gap:12,justifyContent:"center",marginBottom:52,flexWrap:"wrap"}}>
          <button className="gbtn" onClick={()=>nav(user?"generator":"signup")} style={{fontSize:15,padding:"13px 30px"}}><Sparkles size={15}/>{user?"Generate Email":"Get Started Free"}</button>
          <button className="wbtn" onClick={()=>nav("features")} style={{fontSize:15,padding:"13px 30px"}}>See How It Works</button>
        </div>
        <div className="su4 hstats" style={{display:"flex",gap:36,justifyContent:"center"}}>
          {[["50k+","Emails Generated"],["4.9★","Average Rating"],["< 5s","Generation Time"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:26,fontWeight:800,fontFamily:"Syne,sans-serif",color:"rgba(196,181,253,.95)"}}>{n}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.48)",marginTop:2,letterSpacing:.3}}>{l}</div>
            </div>
          ))}
        </div>
        {/* Floating preview card */}
        <div className="hcard flt" style={{marginTop:52,maxWidth:450,margin:"52px auto 0",background:"#fff",borderRadius:18,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,.45)"}}>
          <div style={{background:"#f3f4f6",padding:"9px 14px",display:"flex",gap:5,alignItems:"center"}}>
            {["#ef4444","#f59e0b","#22c55e"].map(c=><div key={c} style={{width:9,height:9,borderRadius:"50%",background:c}}/>)}
            <span style={{fontSize:11,color:"#9ca3af",marginLeft:6,fontFamily:"monospace"}}>mailgic.app</span>
          </div>
          <div style={{padding:"16px 20px",textAlign:"left"}}>
            <div style={{display:"flex",gap:6,marginBottom:10}}>
              <span style={{padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:"rgba(124,58,237,.1)",color:"#7C3AED"}}>Professional</span>
              <span style={{padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:"rgba(5,150,105,.1)",color:"#059669"}}>✓ 3.2s</span>
            </div>
            <div style={{fontSize:12.5,color:"#374151",lineHeight:1.65}}>
              <div style={{fontWeight:700,color:"#111827",marginBottom:3}}>Subject: Q4 Partnership Opportunity</div>
              Hi Sarah,<br/><br/>I hope this finds you well. I'm reaching out regarding a partnership that aligns with your Q4 growth goals…
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURES — grid with border separators
   Hover: accent bar grows + text shifts
   Pattern from features.txt
═══════════════════════════════════════════ */
function Features() {
  const feats=[
    {icon:<Sparkles size={20}/>,t:"AI-Powered Writing",d:"Claude AI crafts natural, context-aware emails that sound genuinely human every time.",c:"#7C3AED"},
    {icon:<Zap size={20}/>,t:"Instant Generation",d:"Get a polished, ready-to-send email in under 5 seconds, guaranteed.",c:"#d97706"},
    {icon:<BarChart2 size={20}/>,t:"Tone Control",d:"Switch between 5 distinct tones — Professional, Friendly, Casual, Persuasive, Formal.",c:"#059669"},
    {icon:<Mail size={20}/>,t:"Works Everywhere",d:"Copy to Gmail, Outlook, Apple Mail — anywhere you write emails.",c:"#0284c7"},
    {icon:<RefreshCw size={20}/>,t:"One-Click Regenerate",d:"Not quite right? One click gives you a completely fresh take instantly.",c:"#7C3AED"},
    {icon:<Shield size={20}/>,t:"Private & Secure",d:"Your emails are yours. We never train on your data or share it.",c:"#dc2626"},
    {icon:<Users size={20}/>,t:"Team-Ready",d:"Upgrade to Team plan and collaborate with up to 10 teammates seamlessly.",c:"#059669"},
    {icon:<Headphones size={20}/>,t:"24/7 Support",d:"Our team is always here to help you get the most from Mailgic.",c:"#d97706"},
  ];
  return (
    <section id="features" style={{padding:"96px 0",background:"#fafbff",position:"relative",overflow:"hidden"}}>
      <SectionBg/>
      <div style={{maxWidth:1080,margin:"0 auto",padding:"0 24px",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:50}}>
          <div className="bdg" style={{marginBottom:14}}>✦ Why Mailgic</div>
          <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(26px,4vw,42px)",color:"#111827",marginBottom:12}}>Everything You Need</h2>
          <p style={{fontSize:16,color:"#6b7280",maxWidth:440,margin:"0 auto"}}>Powerful features designed to make email writing effortless.</p>
        </div>
        <div className="featg" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",border:"1px solid rgba(124,58,237,.11)",borderRadius:18,overflow:"hidden"}}>
          {feats.map((f,i)=>(
            <div key={i} className="fc" style={{borderRight:(i+1)%4===0?"none":undefined,borderBottom:i>=4?"none":undefined}}>
              <div className="fc-ov" style={{background:i<4?"linear-gradient(to top,rgba(124,58,237,.04),transparent)":"linear-gradient(to bottom,rgba(124,58,237,.04),transparent)"}}/>
              <div style={{width:38,height:38,borderRadius:9,background:`${f.c}12`,display:"flex",alignItems:"center",justifyContent:"center",color:f.c,marginBottom:13}}>{f.icon}</div>
              <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:14.5,color:"#111827",marginBottom:6}}>
                <span className="fc-ti">{f.t}</span>
              </h3>
              <p style={{fontSize:13,color:"#6b7280",lineHeight:1.65}}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
/*send notification*/
<form name="contact" method="POST" data-netlify="true">
  <p>
    <label>Name <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email <input type="email" name="email" /></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
/* ═══════════════════════════════════════════
   GENERATOR
═══════════════════════════════════════════ */
function Generator({ user, nav }) {
  const [topic,setTopic]=useState(""), [tone,setTone]=useState("Professional"), [len,setLen]=useState("Medium");
  const [loading,setLoading]=useState(false), [output,setOutput]=useState(""), [error,setError]=useState(""), [copied,setCopied]=useState(false);
  const tones=["Professional","Friendly","Casual","Request","Formal"];
  const lens=[{id:"Short",d:"less than 300 character"},{id:"Medium",d:"less than 550 and more than 300 character"},{id:"Detailed",d:"less than 760 and more than 550"}];
 const generate=async()=>{
  if(!topic.trim()) return;

// Frontend safety check — instant, no API call wasted
const BAD = [
  /\b(kill|murder|threaten|stalk|harm|attack|bomb|shoot|weapon|explosive)\b/i,
  /\b(rob|steal|fraud|scam|swindle|launder|extort|blackmail|bribe)\b/i,
  /\b(hack|phish|malware|ransomware|virus|exploit|crack password|ddos)\b/i,
  /\b(drug deal|cocaine|heroin|meth|fentanyl|sell pills|narco)\b/i,
  /\b(porn|nude|escort|sex work|prostitut|adult content|explicit)\b/i,
  /\b(terrorist|extremist|hate speech|jihad|white supremac)\b/i,
  /\b(suicide|self.harm|kill myself|end my life)\b/i,
  /\b(spam|fake identity|impersonat|pose as|pretend to be|fake review)\b/i,
  /\b(manipulat|gaslight|guilt trip|coerce|pressure someone)\b/i,
];
if(BAD.some(p => p.test(topic))){
  setError("Sorry, I can't help with that. Mailgic is for legitimate and professional emails only.");
  return;
}
  setLoading(true); setError(""); setOutput("");
  try{
    const r=await fetch(AUTH_PROXY,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({action:"generate",topic:topic.trim(),tone,length:len})
    });
    const d=await r.json();
    if(d.error){
      const msg=typeof d.error==="string"?d.error:d.error?.message||"Generation failed";
      throw new Error(msg);
    }
    const text=d.text||"";
    if(!text) throw new Error("Empty response — please try again.");
    setOutput(text);
    if(user) sbDb.insert(user.token,user.id,topic,tone,len,text).catch(()=>{});
  }catch(e){
    const m=e.message||"";
    setError(
      m.includes("fetch")||m.includes("Network")||m.includes("Load")
        ?"Network error — check your connection."
        :m
    );
  }finally{setLoading(false);}
};
  return (
    <section id="generator" style={{padding:"96px 24px",background:"#fff",position:"relative",overflow:"hidden"}}>
      <SectionBg/>
      <div style={{maxWidth:680,margin:"0 auto",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div className="bdg" style={{marginBottom:14}}>✦ Try It Now</div>
          <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(26px,4vw,42px)",color:"#111827",marginBottom:12}}>Generate Your Perfect Email</h2>
          <p style={{fontSize:15,color:"#6b7280",maxWidth:420,margin:"0 auto"}}>Describe your email, pick a tone, and let AI craft it in seconds.</p>
        </div>
        <div className="card gen-card" style={{padding:"34px 30px"}}>
          <div style={{marginBottom:18}}>
            <label style={{fontSize:12.5,fontWeight:600,color:"#374151",display:"block",marginBottom:7}}>What's your email about? *</label>
            <textarea className="ainput" rows={3} placeholder="e.g. Follow up with client about Q3 proposal…" value={topic} onChange={e=>setTopic(e.target.value)} style={{resize:"vertical",lineHeight:1.65}}/>
          </div>
          <div style={{marginBottom:18}}>
            <label style={{fontSize:12.5,fontWeight:600,color:"#374151",display:"block",marginBottom:9}}>Tone</label>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{tones.map(t=><button key={t} className={`tc ${tone===t?"sel":""}`} onClick={()=>setTone(t)}>{t}</button>)}</div>
          </div>
          <div style={{marginBottom:22}}>
            <label style={{fontSize:12.5,fontWeight:600,color:"#374151",display:"block",marginBottom:9}}>Length</label>
            <div style={{display:"flex",gap:7}}>{lens.map(l=><button key={l.id} className={`tc ${len===l.id?"sel":""}`} onClick={()=>setLen(l.id)} style={{flex:1}}>{l.id}</button>)}</div>
          </div>
          {error&&<div style={{padding:"11px 14px",borderRadius:10,marginBottom:14,background:"rgba(239,68,68,.05)",border:"1px solid rgba(239,68,68,.17)",color:"#dc2626",fontSize:13}}>{error}</div>}
          <button className="gbtn" disabled={!topic.trim()||loading} onClick={generate} style={{width:"100%",justifyContent:"center",fontSize:14.5,padding:"13px"}}>
            {loading?<><Loader2 size={15} style={{animation:"spin 1s linear infinite"}}/>Generating…</>:<><Sparkles size={15}/>Generate Email</>}
          </button>
          {!user&&<p style={{textAlign:"center",marginTop:10,fontSize:12.5,color:"#9ca3af"}}><button onClick={()=>nav("signup")} style={{color:"#7C3AED",fontWeight:600,cursor:"pointer",background:"none",border:"none"}}>Create free account</button> to save your emails</p>}
          {output&&(
            <div style={{marginTop:22}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
                <span style={{fontSize:12,color:"#9ca3af"}}>{output.length} chars</span>
                <div style={{display:"flex",gap:7}}>
                 <button className="obtn" aria-label="Regenerate email" onClick={generate} style={{padding:"9px 16px",fontSize:12.5,gap:5,minHeight:40,minWidth:44}}><RefreshCw size={12}/>Regen</button>
<button className="gbtn" aria-label="Copy email to clipboard" onClick={()=>{navigator.clipboard.writeText(output);setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{padding:"9px 16px",fontSize:12.5,gap:5,minHeight:40,minWidth:44}}>
  {copied?<><Check size={12}/>Copied!</>:<><Copy size={12}/>Copy</>}
             
                  </button>
                </div>
              </div>
            <textarea className="eout" value={output} onChange={e=>setOutput(e.target.value)}/>
<p style={{fontSize:12,color:"#9ca3af",marginTop:8,textAlign:"center",lineHeight:1.5}}>
  ⚠️ Mailgic is AI and it can make mistakes. Please double-check responses before sending.
</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
/* ═══════════════════════════════════════════
   TESTIMONIALS — CSS infinite scroll
   Pattern from testimonials.txt
═══════════════════════════════════════════ */
const TDATA=[
  {name:"Rahul K.",role:"Startup Founder",text:"Mailgic saves me 2+ hours daily. Every email comes out polished and professional.",seed:"SarahK",bg:"b6e3f4"},
  {name:"James T.",role:"Sales Director",text:"Our email response rates jumped 40% after switching to Mailgic. Absolute game changer.",seed:"JamesT",bg:"c0aede"},
  {name:"Priya N.",role:"Freelance Designer",text:"As a non-native speaker, Mailgic makes me sound fluent. My clients love my emails.",seed:"PriyaN",bg:"ffdfbf"},
  {name:"Pintu.",role:"Marketing Manager",text:"I've tried every AI writing tool. Nothing matches Mailgic's tone accuracy and speed.",seed:"MarcusL",bg:"d1d4f9"},
  {name:"Emma W.",role:"Product Manager",text:"The Professional tone is unbelievably good. Stakeholder emails have never been easier.",seed:"EmmaW",bg:"b6e3f4"},
  {name:"Raj P.",role:"Tech Lead",text:"Even for technical emails, Mailgic nails the context. Essential to my workflow now.",seed:"RajP",bg:"c0aede"},
  {name:"Lisa M.",role:"Business Owner",text:"I used to spend an hour per email. Now 30 seconds. The ROI is absolutely insane.",seed:"LisaM",bg:"ffdfbf"},
  {name:"Alex C.",role:"University Student",text:"From cover letters to professor emails — Mailgic makes me sound confident every time.",seed:"AlexC",bg:"d1d4f9"},
];
function TCol({ items, dir }) {
  const all=[...items,...items];
  return (
    <div style={{height:440,overflow:"hidden",position:"relative"}}>
      <div className={dir==="fwd"?"cfwd":"cbwd"} style={{display:"flex",flexDirection:"column",gap:12}}>
        {all.map((t,i)=>(
          <div key={i} style={{padding:"18px 20px",borderRadius:16,background:"#fff",border:"1px solid rgba(124,58,237,.08)",boxShadow:"0 3px 12px rgba(124,58,237,.04)"}}>
            <div style={{display:"flex",marginBottom:7}}>{[...Array(5)].map((_,s)=><Star key={s} size={11} fill="#f59e0b" color="#f59e0b"/>)}</div>
            <p style={{fontSize:13,color:"#374151",lineHeight:1.65,marginBottom:11}}>"{t.text}"</p>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.seed}&backgroundColor=${t.bg}`} alt={t.name} width={32} height={32} style={{width:32,height:32,borderRadius:"50%",background:`#${t.bg}`}}/>
              <div><div style={{fontSize:12.5,fontWeight:600,color:"#111827"}}>{t.name}</div><div style={{fontSize:11,color:"#9ca3af"}}>{t.role}</div></div>
            </div>
          </div>
        ))}
      </div>
      <div style={{position:"absolute",top:0,left:0,right:0,height:54,background:"linear-gradient(to bottom,#fff,transparent)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:54,background:"linear-gradient(to top,#fff,transparent)",pointerEvents:"none"}}/>
    </div>
  );
}
function Testimonials() {
  return (
    <section id="testimonials" style={{padding:"96px 24px",background:"#fff",position:"relative",overflow:"hidden"}}>
      <SectionBg/>
      <div style={{maxWidth:740,margin:"0 auto",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div className="bdg" style={{marginBottom:14}}>✦ Loved by Users</div>
          <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(26px,4vw,42px)",color:"#111827",marginBottom:12}}>What People Are Saying</h2>
          <p style={{fontSize:15,color:"#6b7280"}}>Join thousands of professionals who write better emails every day.</p>
        </div>
        <div className="tg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <TCol items={TDATA.slice(0,4)} dir="fwd"/>
          <TCol items={TDATA.slice(4,8)} dir="bwd"/>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PRICING — confetti on annual toggle
   Spring card animations, 3D perspective
   Pattern from pricing.txt
═══════════════════════════════════════════ */
function Pricing({ nav }) {
  const [annual,setAnnual]=useState(false);
  const switchRef=useRef(null);
  const fireConfetti=useCallback(()=>{
    const run=()=>{ if(!switchRef.current||typeof window.confetti!=="function")return; const r=switchRef.current.getBoundingClientRect(); window.confetti({particleCount:55,spread:65,origin:{x:(r.left+r.width/2)/window.innerWidth,y:(r.top+r.height/2)/window.innerHeight},colors:["#7C3AED","#8B5CF6","#6D28D9","#c4b5fd"],ticks:200,gravity:1.2,decay:.94,startVelocity:30,shapes:["circle"]}); };
    if(typeof window.confetti==="function") run();
    else { const s=document.createElement("script"); s.src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"; s.onload=run; document.head.appendChild(s); }
  },[]);
  const toggle=()=>{ const n=!annual; setAnnual(n); if(n) fireConfetti(); };
  const plans=[
    {name:"Starter",mo:0,yr:0,desc:"Perfect for occasional use",btn:"Start for Free",
     feats:["10 emails/month","3 tone options","Short & Medium length","Copy to clipboard","Email support"]},
    {name:"Pro",mo:249,yr:9,pop:true,desc:"For professionals who write daily",btn:"Start Pro Trial",
     feats:["Unlimited emails","All 5 tones","All length options","30-day email history","Priority support","API access (beta)"]},
    {name:"Team",mo:299,yr:23,desc:"For growing teams",btn:"Start Team Trial",
     feats:["Everything in Pro","Up to 10 seats","Custom templates","Analytics dashboard","Custom tone profiles","Dedicated account manager"]},
  ];
  return (
    <section id="pricing" style={{padding:"96px 24px",background:"#fafbff",position:"relative",overflow:"hidden"}}>
      <SectionBg/>
      <div style={{maxWidth:960,margin:"0 auto",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div className="bdg" style={{marginBottom:14}}>✦ Pricing</div>
          <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(26px,4vw,42px)",color:"#111827",marginBottom:12}}>Simple, Transparent Pricing</h2>
          <p style={{fontSize:15,color:"#6b7280",maxWidth:360,margin:"0 auto"}}>Start free, upgrade when you need more.</p>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:11,marginBottom:36}}>
          <span style={{fontSize:13.5,fontWeight:500,color:!annual?"#111827":"#9ca3af",transition:"color .2s"}}>Monthly</span>
          <button ref={switchRef} onClick={toggle} style={{width:50,height:26,borderRadius:50,background:annual?"#7C3AED":"#e5e7eb",position:"relative",border:"none",cursor:"pointer",transition:"background .28s"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:annual?27:3,transition:"left .28s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
          </button>
          <span style={{fontSize:13.5,fontWeight:500,color:annual?"#111827":"#9ca3af",transition:"color .2s"}}>Annual <span style={{color:"#059669",fontWeight:700}}>(Save 25%)</span></span>
        </div>
        <div className="pg" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:18,perspective:"1400px"}}>
          {plans.map((p,i)=>(
            <div key={i} className={`card sp${i} ${p.pop?"pp":""}`}
              style={{padding:"30px 26px",position:"relative",marginTop:p.pop?0:14,
                transform:p.pop?"none":`scale(0.96) ${i===0?"rotateY(3deg)":"rotateY(-3deg)"}`,
                transformOrigin:i===0?"right center":"left center",transition:"transform .28s"}}
              onMouseEnter={e=>{if(!p.pop)e.currentTarget.style.transform="scale(0.98)";}}
              onMouseLeave={e=>{if(!p.pop)e.currentTarget.style.transform=`scale(0.96) ${i===0?"rotateY(3deg)":"rotateY(-3deg)"}`;}}>
              {p.pop&&<div style={{position:"absolute",top:0,right:0,background:"#7C3AED",color:"#fff",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:"0 18px 0 11px",display:"flex",alignItems:"center",gap:4}}><Star size={9} fill="#fff"/>Most Popular</div>}
              <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:17,color:"#111827",marginBottom:3}}>{p.name}</h3>
              <p style={{fontSize:12,color:"#9ca3af",marginBottom:16}}>{p.desc}</p>
              <div style={{marginBottom:18}}>
                <span style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:38,color:"#111827"}}>₹{annual?p.yr:p.mo}</span>
                <span style={{fontSize:12.5,color:"#9ca3af"}}>/mo</span>
                {annual&&p.mo>0&&<div style={{fontSize:11,color:"#059669",fontWeight:600,marginTop:1}}>billed annually</div>}
              </div>
              <ul style={{listStyle:"none",padding:0,margin:"0 0 22px",display:"flex",flexDirection:"column",gap:7}}>
                {p.feats.map((f,fi)=><li key={fi} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,color:"#374151"}}><Check size={13} color="#7C3AED" style={{marginTop:2,flexShrink:0}}/>{f}</li>)}
              </ul>
              <button className={p.pop?"gbtn":"obtn"} onClick={()=>nav("signup")} style={{width:"100%",justifyContent:"center"}}>{p.btn}</button>
              {p.mo===0&&<p style={{textAlign:"center",fontSize:11,color:"#9ca3af",marginTop:8}}>No credit card required</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
function Footer({ nav }) {
const prod=[{id:"features",l:"Features"},{id:"generator",l:"AI Email Generator"},{id:"pricing",l:"Pricing"},{id:"contact", l:"Contact Us"},{id:"testimonials",l:"Testimonials"},{id:"blog",l:"Email Writing Blog"}];
  const legal=[{id:"privacy",l:"Privacy Policy"},{id:"terms",l:"Terms of Service"},{id:"security",l:"Security"},{id:"cookies",l:"Cookie Policy"}];
  const Lnk=({id,l})=>(<button onClick={()=>nav(id)} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",color:"rgba(255,255,255,.4)",fontSize:13,cursor:"pointer",padding:"3px 0",transition:"color .16s",fontFamily:"'Plus Jakarta Sans',sans-serif"}} onMouseEnter={e=>e.currentTarget.style.color="#8B5CF6"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.4)"}><ChevronRight size={12}/>{l}</button>);
  return (
    <footer style={{background:"#0f0a1e",padding:"52px 24px 26px"}}>
      <div style={{maxWidth:1040,margin:"0 auto"}}>
        <div className="footg" style={{display:"grid",gridTemplateColumns:"1.6fr 1fr 1fr",gap:36,marginBottom:34}}>
          <div><Logo size={25} dark/><p style={{color:"rgba(255,255,255,.36)",fontSize:13,marginTop:12,lineHeight:1.7,maxWidth:240}}>The AI-powered email generation platform. Magician for your mail.</p></div>
          <div><div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.26)",letterSpacing:1.4,textTransform:"uppercase",marginBottom:13}}>Product</div><div style={{display:"flex",flexDirection:"column",gap:1}}>{prod.map(l=><Lnk key={l.id} {...l}/>)}</div></div>
          <div><div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.26)",letterSpacing:1.4,textTransform:"uppercase",marginBottom:13}}>Legal</div><div style={{display:"flex",flexDirection:"column",gap:1}}>{legal.map(l=><Lnk key={l.id} {...l}/>)}</div></div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:18,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <span style={{fontSize:12,color:"rgba(255,255,255,.2)"}}>© {new Date().getFullYear()} Mailgic. All rights reserved.</span>
          <span style={{fontSize:12,color:"rgba(255,255,255,.2)"}}>Made with ♥ for better emails</span>
             <span style={{fontSize:12,color:"rgba(255,255,255,.2)"}}>Made in india</span>
          <span style={{fontSize:12,color:"rgba(255,255,255,.2)"}}>Connect to us at ma.ilgic@outlook.com</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   AUTH PAGE
   Background: dark purple + particle rain + animated grid lines
   Both visual effects from log_in.txt — much lighter than WebGL
   Card: glass-morphism with fade-up entrance
═══════════════════════════════════════════ */
function AuthPage({ mode, nav, onLogin }) {
  const [name,setName]=useState(""), [email,setEmail]=useState(""), [pass,setPass]=useState("");
  const [showP,setShowP]=useState(false), [loading,setLoading]=useState(false);
  const [err,setErr]=useState(""), [msg,setMsg]=useState("");
  const isSU=mode==="signup";
  const submit=async()=>{
    setErr(""); setMsg("");
    if(!email||!pass){setErr("Please fill in all fields.");return;}
    if(pass.length<6){setErr("Password must be at least 6 characters.");return;}
    if(isSU&&!name){setErr("Please enter your name.");return;}
    setLoading(true);
    try{
      // Helper: extract clean error message from any Supabase error shape
      const getErrMsg=(d)=>d?.error?.message||d?.error_description||d?.msg||d?.message||"";

      if(isSU){
        const d=await sbAuth.signUp(email,pass,name);
        // Success: got access_token + user
        const tok=d.access_token||d.session?.access_token;
        const usr=d.user||d; // signup returns user nested OR at root for repeated signup
        if(tok&&usr?.id){
          onLogin({id:usr.id,email:usr.email,token:tok,name:usr.user_metadata?.full_name||usr.raw_user_meta_data?.full_name||name});
          nav("dashboard");
        } else if(usr?.id&&!tok){
          // user_repeated_signup OR email not confirmed — try signing in directly
          try{
            const d2=await sbAuth.signIn(email,pass);
            if(d2.access_token&&d2.user){
              onLogin({id:d2.user.id,email:d2.user.email,token:d2.access_token,name:d2.user.user_metadata?.full_name||name});
              nav("dashboard"); return;
            }
          }catch{}
          setMsg("Account already exists — logging you in…");
          setTimeout(()=>nav("login"),1200);
        } else {
          const m=getErrMsg(d);
          if(m.toLowerCase().includes("weak")||m.toLowerCase().includes("password"))setErr("Password too weak — use 8+ characters with letters and numbers.");
          else if(m.toLowerCase().includes("email")||m.toLowerCase().includes("valid"))setErr("Please enter a valid email address.");
          else setErr(m||"Signup failed. Please try again.");
        }
      } else {
        // SIGN IN — /auth/v1/token?grant_type=password
        // Success shape: { access_token, token_type, refresh_token, user: {...} }
        // Error shape:   { error: "invalid_grant", error_description: "..." }
        const d=await sbAuth.signIn(email,pass);
        if(d.access_token&&d.user){
          onLogin({
            id:d.user.id,
            email:d.user.email,
            token:d.access_token,
            name:d.user.user_metadata?.full_name||d.user.raw_user_meta_data?.full_name||email.split("@")[0]
          });
          nav("dashboard");
        } else {
          const m=getErrMsg(d);
          const ml=m.toLowerCase();
          if(ml.includes("confirm")||ml.includes("not confirmed"))setErr("Please confirm your email first, then try again.");
          else if(ml.includes("invalid")||ml.includes("credentials")||ml.includes("grant"))setErr("Wrong email or password. Please try again.");
          else if(ml.includes("rate")||ml.includes("limit"))setErr("Too many attempts. Please wait a minute and try again.");
          else setErr(m||"Login failed — check your email and password.");
        }
      }
    }catch(e){
      const m=e.message||"";
      setErr(m.includes("fetch")||m.includes("Load")||m.includes("Network")||m.includes("Failed")
        ?"Network error — please check your connection and try again."
        :"Something went wrong. Please try again.");
    }finally{setLoading(false);}
  };
  return (
    <div style={{minHeight:"100vh",background:"#0a0516",position:"relative",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <AuthParticles/>
      {/* Radial purple glow */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(75% 55% at 50% 30%,rgba(124,58,237,.08),transparent 60%)"}}/>
      {/* Animated grid lines from log_in.txt */}
      <div className="alines">
        <div className="hl"/><div className="hl"/><div className="hl"/>
        <div className="vl"/><div className="vl"/><div className="vl"/>
      </div>
      {/* Top bar */}
      <div style={{position:"relative",zIndex:2,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"17px 28px",borderBottom:"1px solid rgba(124,58,237,.14)"}}>
        <Logo size={24} dark/>
        <button className="wbtn" onClick={()=>nav("home")} style={{padding:"7px 15px",fontSize:13,gap:5}}><ArrowLeft size={13}/>Back to home</button>
      </div>
      {/* Card */}
      <div style={{position:"relative",zIndex:2,flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 24px 44px"}}>
        <div className="fi auth-card" style={{background:"rgba(255,255,255,.97)",backdropFilter:"blur(20px)",borderRadius:22,padding:"36px 32px",width:"100%",maxWidth:404,boxShadow:"0 0 0 1px rgba(124,58,237,.11),0 28px 80px rgba(0,0,0,.38)"}}>
          <div style={{textAlign:"center",marginBottom:22}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:11}}><Logo size={27}/></div>
            <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:21,color:"#111827"}}>{isSU?"Create your account":"Welcome back"}</h2>
            <p style={{fontSize:12.5,color:"#9ca3af",marginTop:4}}>{isSU?"Start generating perfect emails today":"Sign in to continue to Mailgic"}</p>
          </div>
          {err&&<div style={{padding:"10px 13px",borderRadius:9,marginBottom:12,background:"rgba(239,68,68,.05)",border:"1px solid rgba(239,68,68,.15)",color:"#dc2626",fontSize:13}}>{err}</div>}
          {msg&&<div style={{padding:"10px 13px",borderRadius:9,marginBottom:12,background:"rgba(5,150,105,.05)",border:"1px solid rgba(5,150,105,.15)",color:"#059669",fontSize:13}}>{msg}</div>}
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {isSU&&<div><label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:5}}>Full Name</label><input className="ainput" type="text" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}/></div>}
            <div><label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:5}}>Email</label><input className="ainput" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <label style={{fontSize:12,fontWeight:600,color:"#374151"}}>Password</label>
                {!isSU&&<button onClick={()=>setMsg("Email support@mailgic.app for a password reset.")} style={{fontSize:11,color:"#7C3AED",background:"none",border:"none",cursor:"pointer"}}>Forgot?</button>}
              </div>
              <div style={{position:"relative"}}>
                <input className="ainput" type={showP?"text":"password"} placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} style={{paddingRight:42}}/>
               <button aria-label={showP?"Hide password":"Show password"} onClick={()=>setShowP(s=>!s)} style={{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#9ca3af",cursor:"pointer"}}>
                  {showP?<EyeOff size={15}/>:<Eye size={15}/>}
                </button>
              </div>
            </div>
          </div>
          <button className="gbtn" disabled={loading} onClick={submit} style={{width:"100%",justifyContent:"center",marginTop:18,fontSize:14.5,padding:"13px"}}>
            {loading?<><Loader2 size={15} style={{animation:"spin 1s linear infinite"}}/>Please wait…</>:(isSU?"Create Account":"Sign In")}
          </button>
          <div style={{borderTop:"1px solid rgba(124,58,237,.09)",marginTop:16,paddingTop:14,textAlign:"center",fontSize:13,color:"#6b7280"}}>
            {isSU?"Already have an account? ":"Don't have an account? "}
            <button onClick={()=>nav(isSU?"login":"signup")} style={{color:"#7C3AED",fontWeight:600,background:"none",border:"none",cursor:"pointer"}}>{isSU?"Log in":"Sign up free"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════ */
function Dashboard({ user, logout, nav }) {
  const [tab,setTab]=useState("overview"), [emails,setEmails]=useState([]), [loading,setLoading]=useState(true);
  const [sel,setSel]=useState(null), [copiedId,setCopiedId]=useState(null);
  useEffect(()=>{ sbDb.getAll(user.token).then(d=>{setEmails(Array.isArray(d)?d:[]);setLoading(false);}).catch(()=>setLoading(false)); },[user.token]);
  const doCopy=(id,txt)=>{ navigator.clipboard.writeText(txt); setCopiedId(id); setTimeout(()=>setCopiedId(null),2000); };
  const thisWeek=emails.filter(e=>Date.now()-new Date(e.created_at)<7*864e5).length;
  const topTone=emails.length?Object.entries(emails.reduce((a,e)=>({...a,[e.tone]:(a[e.tone]||0)+1}),{})).sort((a,b)=>b[1]-a[1])[0]?.[0]||"—":"—";
  const lastDate=emails[0]?.created_at?new Date(emails[0].created_at).toLocaleDateString():"—";
  const Stat=({icon,color,label,value})=>(
    <div style={{background:"#fff",borderRadius:14,padding:"18px 20px",border:"1px solid rgba(124,58,237,.08)",boxShadow:"0 2px 10px rgba(124,58,237,.04)"}}>
      <div style={{width:35,height:35,borderRadius:9,background:`${color}12`,display:"flex",alignItems:"center",justifyContent:"center",color,marginBottom:10}}>{icon}</div>
      <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:26,color:"#111827"}}>{value}</div>
      <div style={{fontSize:12,color:"#9ca3af",marginTop:2}}>{label}</div>
    </div>
  );
  return (
    <div style={{minHeight:"100vh",background:"#fafbff"}}>
      <div style={{height:64,background:"#fff",borderBottom:"1px solid rgba(124,58,237,.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 26px",position:"sticky",top:0,zIndex:100}}>
        <div style={{cursor:"pointer"}} onClick={()=>nav("home")}><Logo size={25}/></div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#7C3AED,#8B5CF6)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:14,fontFamily:"Syne,sans-serif"}}>{(user.name||user.email)[0].toUpperCase()}</div>
          <div style={{lineHeight:1.3}}><div style={{fontSize:13,fontWeight:600,color:"#111827"}}>{user.name||"User"}</div><div style={{fontSize:11,color:"#9ca3af"}}>{user.email}</div></div>
          <button className="obtn" onClick={logout} style={{padding:"7px 13px",fontSize:12.5,gap:5}}><LogOut size={12}/>Sign out</button>
        </div>
      </div>
      <div style={{display:"flex"}}>
        <div className="dsb">
          <div style={{fontSize:9.5,fontWeight:700,color:"#9ca3af",letterSpacing:1.5,textTransform:"uppercase",marginBottom:10}}>Menu</div>
          {[{id:"overview",icon:<BarChart2 size={15}/>,l:"Overview"},{id:"history",icon:<Mail size={15}/>,l:"Email History"}].map(item=>(
            <button key={item.id} className={`dbt ${tab===item.id?"active":""}`} onClick={()=>setTab(item.id)}>{item.icon}{item.l}</button>
          ))}
          <button className="dbt" onClick={()=>nav("generator")} style={{color:"#7C3AED"}}><Sparkles size={15}/>New Email</button>
          <div style={{marginTop:"auto",borderTop:"1px solid rgba(124,58,237,.07)",paddingTop:13}}>
            <button className="dbt" onClick={()=>nav("home")}><ArrowLeft size={15}/>Back to site</button>
          </div>
        </div>
        <div style={{flex:1,padding:"26px 22px",overflowY:"auto"}}>
          {tab==="overview"&&(
            <>
              <h1 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:23,color:"#111827",marginBottom:20}}>Good day, {user.name?.split(" ")[0]||"there"} 👋</h1>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(165px,1fr))",gap:13,marginBottom:22}}>
                <Stat icon={<FileText size={16}/>}  color="#7C3AED" label="Total Generated" value={loading?"…":emails.length}/>
                <Stat icon={<TrendingUp size={16}/>} color="#059669" label="This Week"       value={loading?"…":thisWeek}/>
                <Stat icon={<BarChart2 size={16}/>}  color="#d97706" label="Top Tone"        value={loading?"…":topTone}/>
                <Stat icon={<Calendar size={16}/>}   color="#0284c7" label="Last Generated"  value={loading?"…":lastDate}/>
              </div>
              <div style={{background:"linear-gradient(135deg,#7C3AED,#6D28D9)",borderRadius:15,padding:"22px 26px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:13}}>
                <div><h3 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:17,color:"#fff",marginBottom:3}}>Ready to write another email?</h3><p style={{fontSize:13,color:"rgba(255,255,255,.62)"}}>Generate a professional email in under 5 seconds.</p></div>
                <button className="gbtn" onClick={()=>nav("generator")} style={{background:"rgba(255,255,255,.12)",border:"1.5px solid rgba(255,255,255,.26)",backdropFilter:"blur(4px)"}}><Sparkles size={14}/>New Email</button>
              </div>
              {emails.length>0&&(<>
                <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:14.5,color:"#111827",marginBottom:11}}>Recent Emails</h3>
                {emails.slice(0,4).map(e=>(
                  <div key={e.id} onClick={()=>{setTab("history");setSel(e);}} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 15px",background:"#fff",borderRadius:11,marginBottom:6,border:"1px solid rgba(124,58,237,.08)",cursor:"pointer",transition:"all .16s"}}
                    onMouseEnter={el=>{el.currentTarget.style.borderColor="#7C3AED";el.currentTarget.style.transform="translateX(2px)";}}
                    onMouseLeave={el=>{el.currentTarget.style.borderColor="rgba(124,58,237,.08)";el.currentTarget.style.transform="";}}>
                    <div style={{width:31,height:31,borderRadius:8,flexShrink:0,background:"rgba(124,58,237,.08)",display:"flex",alignItems:"center",justifyContent:"center",color:"#7C3AED"}}><Mail size={13}/></div>
                    <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:"#111827",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e.topic}</div>
                      <div style={{display:"flex",gap:5,marginTop:2}}>
                        <span style={{padding:"1px 7px",borderRadius:20,fontSize:10.5,fontWeight:600,background:"rgba(124,58,237,.07)",color:"#7C3AED"}}>{e.tone}</span>
                        <span style={{padding:"1px 7px",borderRadius:20,fontSize:10.5,background:"rgba(17,24,39,.04)",color:"#6b7280"}}>{e.length}</span>
                      </div>
                    </div>
                    <div style={{fontSize:11,color:"#9ca3af",flexShrink:0}}>{new Date(e.created_at).toLocaleDateString()}</div>
                    <ChevronRight size={12} color="#9ca3af"/>
                  </div>
                ))}
              </>)}
            </>
          )}
          {tab==="history"&&(
            <>
              <div style={{marginBottom:17}}><h1 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:23,color:"#111827"}}>Email History</h1><p style={{fontSize:12.5,color:"#9ca3af",marginTop:3}}>{emails.length} email{emails.length!==1?"s":""} generated</p></div>
              {loading?(<div style={{textAlign:"center",padding:40,color:"#9ca3af"}}><Loader2 size={22} style={{animation:"spin 1s linear infinite",marginBottom:7}}/><div style={{fontSize:13}}>Loading…</div></div>)
              :emails.length===0?(<div style={{textAlign:"center",padding:"42px 24px",border:"2px dashed rgba(124,58,237,.12)",borderRadius:16,background:"#fff"}}><Mail size={29} color="rgba(124,58,237,.26)" style={{marginBottom:10}}/><h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:16,color:"#111827",marginBottom:7}}>No emails yet</h3><p style={{fontSize:13,color:"#9ca3af",marginBottom:14}}>Generate your first email to see it here.</p><button className="gbtn" onClick={()=>nav("generator")}><Sparkles size={14}/>Generate Email</button></div>)
              :(
                <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                  <div style={{flex:sel?"0 0 310px":1}}>
                    {emails.map(e=>(
                      <div key={e.id} onClick={()=>setSel(sel?.id===e.id?null:e)}
                        style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",background:"#fff",borderRadius:11,marginBottom:6,border:sel?.id===e.id?"1.5px solid #7C3AED":"1px solid rgba(124,58,237,.08)",cursor:"pointer",transition:"all .16s"}}>
                        <div style={{width:31,height:31,borderRadius:8,flexShrink:0,background:"rgba(124,58,237,.08)",display:"flex",alignItems:"center",justifyContent:"center",color:"#7C3AED"}}><Mail size={13}/></div>
                        <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:"#111827",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e.topic}</div>
                          <div style={{display:"flex",gap:5,marginTop:2}}>
                            <span style={{padding:"1px 6px",borderRadius:20,fontSize:10,fontWeight:600,background:"rgba(124,58,237,.07)",color:"#7C3AED"}}>{e.tone}</span>
                            <span style={{padding:"1px 6px",borderRadius:20,fontSize:10,background:"rgba(17,24,39,.04)",color:"#6b7280"}}>{e.length}</span>
                          </div>
                        </div>
                        <div style={{fontSize:11,color:"#9ca3af",flexShrink:0}}>{new Date(e.created_at).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                  {sel&&(
                    <div style={{flex:1,background:"#fff",borderRadius:14,border:"1px solid rgba(124,58,237,.12)",padding:"20px",position:"sticky",top:22}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                        <div><h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:14,color:"#111827",marginBottom:5}}>{sel.topic}</h3>
                          <div style={{display:"flex",gap:5}}>
                            <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,fontWeight:600,background:"rgba(124,58,237,.07)",color:"#7C3AED"}}>{sel.tone}</span>
                            <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(17,24,39,.04)",color:"#6b7280"}}>{sel.length}</span>
                            <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,color:"#9ca3af"}}>{new Date(sel.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button className="gbtn" onClick={()=>doCopy(sel.id,sel.output)} style={{padding:"6px 12px",fontSize:12,gap:4}}>
                          {copiedId===sel.id?<><Check size={11}/>Copied!</>:<><Copy size={11}/>Copy</>}
                        </button>
                      </div>
                      <div style={{background:"#fafbff",borderRadius:9,border:"1px solid rgba(124,58,237,.08)",padding:"13px",fontSize:13,lineHeight:1.8,color:"#374151",maxHeight:460,overflowY:"auto",whiteSpace:"pre-wrap"}}>{sel.output}</div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LEGAL PAGE
═══════════════════════════════════════════ */
const LEGAL={
  privacy:{title:"Privacy Policy",body:`<p style="margin-bottom:14px">At Mailgic, we take your privacy seriously.</p><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:16px;color:#111827;margin:20px 0 7px">Information We Collect</h3><p style="margin-bottom:12px;line-height:1.8">We collect email address, name, and generated email content solely to provide our service. We never sell your data.</p><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:16px;color:#111827;margin:20px 0 7px">How We Use It</h3><p style="margin-bottom:12px;line-height:1.8">Your data is used to provide the Mailgic service and improve reliability. We do not share it with third parties.</p><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:16px;color:#111827;margin:20px 0 7px">Contact</h3><p style="line-height:1.8">Email privacy@mailgic.app for any privacy inquiries.</p>`},
  terms:{title:"Terms of Service",body:`<p style="margin-bottom:14px">By using Mailgic you agree to these terms.</p><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:16px;color:#111827;margin:20px 0 7px">Acceptable Use</h3><p style="margin-bottom:12px;line-height:1.8">You may use Mailgic for lawful purposes only. No spam, harassment, or illegal activity.</p><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:16px;color:#111827;margin:20px 0 7px">Intellectual Property</h3><p style="line-height:1.8">Emails generated belong to you. The Mailgic platform and brand are our intellectual property.</p>`},
  security:{title:"Security",body:`<p style="margin-bottom:14px">Security is at the core of everything we build.</p><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:16px;color:#111827;margin:20px 0 7px">Encryption</h3><p style="margin-bottom:12px;line-height:1.8">All data in transit uses TLS 1.3. Data at rest is encrypted with AES-256.</p><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:16px;color:#111827;margin:20px 0 7px">Infrastructure</h3><p style="line-height:1.8">We run on Supabase's SOC 2 compliant platform with automatic backups.</p>`},
  cookies:{title:"Cookie Policy",body:`<p style="margin-bottom:14px">Mailgic uses minimal cookies.</p><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:16px;color:#111827;margin:20px 0 7px">Essential Cookies</h3><p style="margin-bottom:12px;line-height:1.8">Used only for authentication and session management. Cannot be disabled.</p><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:16px;color:#111827;margin:20px 0 7px">Managing Cookies</h3><p style="line-height:1.8">Control cookies through your browser settings. Disabling essentials may affect functionality.</p>`},
};
function LegalPage({ id, nav }) {
  const {title,body}=LEGAL[id]||{};
  useEffect(()=>window.scrollTo({top:0}),[id]);
  const others=Object.entries(LEGAL).filter(([k])=>k!==id);
  return (
    <div style={{minHeight:"100vh",background:"#fafbff"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,.97)",backdropFilter:"blur(18px)",borderBottom:"1px solid rgba(124,58,237,.07)",padding:"13px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Logo size={24}/><button className="obtn" onClick={()=>nav("home")} style={{padding:"7px 14px",fontSize:13,gap:5}}><ArrowLeft size={13}/>Back</button>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"44px 24px 80px"}}>
        <div className="bdg" style={{marginBottom:13}}>{title}</div>
        <h1 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(24px,4vw,38px)",color:"#111827",marginBottom:7}}>{title}</h1>
        <p style={{fontSize:12.5,color:"#9ca3af",marginBottom:30}}>Last updated: January 2025</p>
        <div style={{fontSize:15,color:"#374151"}} dangerouslySetInnerHTML={{__html:body}}/>
        <div style={{marginTop:36,padding:"20px",borderRadius:13,background:"rgba(124,58,237,.03)",border:"1px solid rgba(124,58,237,.08)"}}>
          <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:13,color:"#111827",marginBottom:10}}>Other Legal Documents</h3>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{others.map(([k,v])=><button key={k} className="obtn" onClick={()=>nav(k)} style={{padding:"6px 13px",fontSize:12.5}}>{v.title}</button>)}</div>
        </div>
      </div>
      <Footer nav={nav}/>
    </div>
  );
}


/* ═══════════════════════════════════════════
   HOME
═══════════════════════════════════════════ */
function Home({ nav, user }) {
  return (<><Hero nav={nav} user={user}/><Features/><Generator user={user} nav={nav}/><Testimonials/><Pricing nav={nav}/><Footer nav={nav}/></>);
}

/* ═══════════════════════════════════════════
   BLOG DATA
═══════════════════════════════════════════ */
const BLOG_POSTS=[
  {id:"how-to-write-professional-email",title:"How to Write a Professional Email (With Examples)",desc:"A complete guide to writing professional emails that get responses. Includes subject line tips, tone, structure, and real examples.",date:"March 20, 2025",readTime:"6 min read",category:"Email Tips",
  content:`<h2>Why Professional Emails Matter</h2><p>Every email you send is a reflection of your professionalism. Whether you're writing to a client, a colleague, or a hiring manager, the way you write shapes how people perceive you.</p><h2>The 5-Part Structure</h2><h3>1. Subject Line</h3><p>Your subject line determines whether your email gets opened. Keep it specific and under 50 characters.</p><ul><li>❌ "Quick question"</li><li>✅ "Follow-up: Project proposal from Monday's call"</li></ul><h3>2. Greeting</h3><p>Always use the recipient's name. "Hi Sarah," is warmer than "Dear Sir/Madam".</p><h3>3. Opening Line</h3><p>Get to the point in the first sentence. Don't start with "I hope this email finds you well" — it's filler.</p><h3>4. Body</h3><p>Keep your body concise — 3 to 5 sentences. Use short paragraphs and bullet points for multiple items.</p><h3>5. Closing</h3><p>End with a clear call to action. Then sign off: "Best regards," or "Kind regards,"</p><h2>Common Mistakes to Avoid</h2><ul><li><strong>Being too vague:</strong> Be specific about what you need and when.</li><li><strong>Burying the ask:</strong> Put your main request in the first paragraph.</li><li><strong>No proofreading:</strong> Typos undermine your credibility.</li></ul><h2>Real Example</h2><blockquote><strong>Subject:</strong> Following up on our Q2 proposal<br/><br/>Hi Marcus,<br/><br/>I wanted to follow up on the proposal I sent last Thursday. I'd love to jump on a 15-minute call this week. Would Tuesday or Wednesday work?<br/><br/>Best regards, Alex</blockquote><h2>Generate in Seconds</h2><p>Mailgic's AI generates professional emails instantly. Describe your email, pick a tone, and hit generate. Try it free.</p>`},
  {id:"best-ai-email-generators",title:"5 Best AI Email Generators in 2025 (Free & Paid)",desc:"Comparing the top AI email writing tools in 2025. Find out which is fastest, most accurate, and best for your use case.",date:"March 18, 2025",readTime:"7 min read",category:"Tools",
  content:`<h2>The Best AI Email Generators in 2025</h2><p>AI email generators save hours of writing time every week and improve email quality. Here's an honest comparison of the top options in 2025.</p><h2>1. Mailgic — Best Free AI Email Generator</h2><p>Mailgic is purpose-built for email generation with consistently high quality for email use cases.</p><ul><li>✅ Generates a complete email in under 5 seconds</li><li>✅ 5 tone options: Professional, Friendly, Casual, Persuasive, Formal</li><li>✅ Free plan: 10 emails/month, no credit card required</li><li>❌ No browser extension yet</li></ul><h2>2. ChatGPT — Most Flexible</h2><p>ChatGPT can write emails but requires detailed prompts every time. No dedicated email interface or tone picker.</p><ul><li>✅ Extremely capable and flexible</li><li>❌ Requires writing detailed prompts</li><li>❌ No dedicated email features</li></ul><h2>3. Lavender — Best for Sales Teams</h2><p>Built for sales outreach. Integrates with Gmail and Outlook and scores your emails in real time.</p><ul><li>✅ Real-time email scoring</li><li>❌ Paid-only for most features</li></ul><h2>4. Copy.ai — Best for Marketers</h2><p>Great for promotional emails and newsletters, less suited for professional one-to-one correspondence.</p><ul><li>✅ Large template library</li><li>❌ Outputs often feel like marketing copy</li></ul><h2>5. Rytr — Best Budget Option</h2><p>Budget AI writing tool with decent quality but limited tone control.</p><ul><li>✅ Very affordable</li><li>❌ Output quality inconsistent</li></ul><h2>Verdict</h2><p>For the best free AI email generator for everyday use, Mailgic is the clear winner. Try it free — no credit card needed.</p>`},
  {id:"how-to-write-follow-up-email",title:"How to Write a Follow-Up Email That Actually Gets a Reply",desc:"Learn how to write follow-up emails that get responses. Includes timing tips, subject lines, real templates, and what to avoid.",date:"March 15, 2025",readTime:"5 min read",category:"Email Tips",
  content:`<h2>Why Most Follow-Up Emails Fail</h2><p>The average professional receives over 120 emails per day. Emails get missed — not because the person is rude, but because inboxes are overwhelming. A well-crafted follow-up isn't pushy. It's a helpful nudge.</p><h2>When to Send a Follow-Up</h2><ul><li><strong>After sending a proposal:</strong> Follow up after 3–5 business days</li><li><strong>After a meeting:</strong> Follow up within 24 hours</li><li><strong>After no response:</strong> Follow up after 5–7 business days</li><li><strong>Stop at 3:</strong> Three follow-ups is the maximum.</li></ul><h2>The Perfect Structure</h2><h3>Subject Line</h3><ul><li>"Re: Project proposal — quick follow-up"</li><li>"Following up from Tuesday's call"</li></ul><h3>Opening Line</h3><ul><li>"I wanted to follow up on my email from last week."</li><li>"Just making sure this didn't get buried."</li></ul><h3>Clear Call to Action</h3><p>End with one specific ask — not multiple questions.</p><h2>Template: After Sending a Proposal</h2><blockquote><strong>Subject:</strong> Following up on the proposal I sent Thursday<br/><br/>Hi [Name],<br/><br/>I wanted to follow up on the proposal I sent last Thursday. Happy to walk you through the details on a quick call. Would later this week work?<br/><br/>Best, [Your Name]</blockquote><h2>Generate with AI</h2><p>Mailgic writes professional follow-up emails in seconds. Choose a tone and get a ready-to-send email instantly.</p>`},
  {id:"cold-email-templates",title:"10 Cold Email Templates That Actually Get Responses in 2025",desc:"Real cold email templates for sales, partnerships, networking, and job hunting. Tested and optimized for response rates.",date:"March 12, 2025",readTime:"8 min read",category:"Templates",
  content:`<h2>What Makes a Cold Email Work?</h2><p>You have about 3 seconds to earn someone's attention before they delete your email. The formula: show you know them, explain what you offer, make one clear ask.</p><h2>Template 1: Sales Outreach</h2><blockquote><strong>Subject:</strong> [Company] — a quick idea on [specific challenge]<br/><br/>Hi [First Name],<br/><br/>I noticed [specific thing about their company]. We've helped companies like [similar company] solve this by [brief solution]. The result was [specific outcome].<br/><br/>Would a 15-minute call be worth it?<br/><br/>Best, [Your Name]</blockquote><h2>Template 2: Partnership Request</h2><blockquote><strong>Subject:</strong> Partnership idea — [Your Company] x [Their Company]<br/><br/>Hi [First Name],<br/><br/>I've been following [Their Company] and really admire [specific thing]. I think there's a natural fit between what we do. [Brief idea for collaboration].<br/><br/>Open to a quick call this week?<br/><br/>Warm regards, [Your Name]</blockquote><h2>Template 3: Networking</h2><blockquote><strong>Subject:</strong> Quick question from a fellow [industry] professional<br/><br/>Hi [First Name],<br/><br/>I came across your work and have been really impressed by [specific thing]. I'd love to get 15 minutes of your time to ask about [specific topic].<br/><br/>Thanks, [Your Name]</blockquote><h2>Rules for All Cold Emails</h2><ul><li><strong>Keep it under 100 words:</strong> Shorter emails get more responses.</li><li><strong>One ask only:</strong> Multiple asks kill response rates.</li><li><strong>Personalize the first line:</strong> Generic openers get ignored.</li><li><strong>Send Tuesday–Thursday:</strong> Better open rates.</li></ul><h2>Generate Cold Emails Instantly</h2><p>Use Mailgic to create personalized cold emails in seconds. Choose "Persuasive" for sales, "Professional" for networking.</p>`},
  {id:"how-to-apologize-in-email",title:"How to Write an Apology Email (That Actually Sounds Sincere)",desc:"A step-by-step guide to writing apology emails that repair relationships. Real examples for professional and personal situations.",date:"March 8, 2025",readTime:"5 min read",category:"Email Tips",
  content:`<h2>Why Getting Apology Emails Right Matters</h2><p>A bad apology email can make things worse than saying nothing. A good one can repair a relationship and restore trust. The difference: take full responsibility, no excuses, be specific.</p><h2>The 5 Elements of a Genuine Apology</h2><h3>1. Acknowledge What Happened — Specifically</h3><ul><li>❌ "I'm sorry if you were upset."</li><li>✅ "I'm sorry that I missed the 3pm deadline we agreed on."</li></ul><h3>2. Take Full Responsibility</h3><ul><li>❌ "I'm sorry but I wasn't given all the information."</li><li>✅ "I should have asked for clarification earlier. That's on me."</li></ul><h3>3. Express Genuine Regret</h3><p>"I understand this caused delays on your end and I genuinely regret that."</p><h3>4. Explain What You'll Do Differently</h3><p>"Going forward, I'll set a reminder 24 hours before all deadlines."</p><h3>5. Offer to Make It Right</h3><p>"I can have the corrected report to you by end of day today."</p><h2>Example: Missing a Deadline</h2><blockquote><strong>Subject:</strong> Apology — the report I owed you today<br/><br/>Hi James,<br/><br/>I want to apologize sincerely for missing the report deadline. I know you were counting on it this morning, and I let you down. There's no excuse for it.<br/><br/>I have the completed report ready now and am attaching it to this email.<br/><br/>Best regards, Alex</blockquote><h2>What to Avoid</h2><ul><li><strong>"I'm sorry you feel that way"</strong> — This is not an apology.</li><li><strong>Over-explaining</strong> — Two sentences of context is enough.</li><li><strong>Passive voice</strong> — Say "I made a mistake," not "Mistakes were made."</li></ul><h2>Generate Your Apology Email</h2><p>Mailgic can help you find the right words — professional, sincere, appropriately toned. Generate one in seconds.</p>`},
];

const BLOG_CSS=`
.bc h2{font-family:Syne,sans-serif;font-weight:800;font-size:22px;color:#111827;margin:36px 0 12px}
.bc h3{font-family:Syne,sans-serif;font-weight:700;font-size:17px;color:#111827;margin:24px 0 10px}
.bc p{margin:0 0 16px;font-size:16px;color:#374151;line-height:1.82}
.bc ul{padding-left:22px;margin:12px 0 18px;display:flex;flex-direction:column;gap:7px}
.bc li{font-size:15px;color:#374151;line-height:1.7}
.bc strong{font-weight:600;color:#111827}
.bc blockquote{background:#fafbff;border-left:3px solid #7C3AED;border-radius:0 12px 12px 0;padding:18px 22px;margin:20px 0;font-size:14.5px;line-height:1.85;color:#374151}
`;

/* ═══════════════════════════════════════════
   BLOG LIST PAGE
═══════════════════════════════════════════ */
function BlogPage({ nav }) {
  useEffect(()=>window.scrollTo({top:0}),[]);
  return (
    <div style={{minHeight:"100vh",background:"#fafbff"}}>
      <style>{BLOG_CSS}</style>
      <div style={{background:"linear-gradient(135deg,#7C3AED,#6D28D9)",padding:"80px 24px 60px",textAlign:"center"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 14px",borderRadius:50,fontSize:12,fontWeight:600,background:"rgba(255,255,255,.15)",color:"#fff",border:"1px solid rgba(255,255,255,.25)",marginBottom:18}}>✦ Email Tips & Guides</span>
          <h1 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(28px,5vw,48px)",color:"#fff",marginBottom:14,lineHeight:1.1}}>The Email Writing Blog</h1>
          <p style={{fontSize:17,color:"rgba(255,255,255,.78)",maxWidth:480,margin:"0 auto",lineHeight:1.7}}>Practical guides on writing professional emails, cold outreach, follow-ups, and more.</p>
        </div>
      </div>
      <div style={{maxWidth:1020,margin:"0 auto",padding:"56px 24px 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:24}}>
          {BLOG_POSTS.map(post=>(
            <article key={post.id} onClick={()=>nav(`blog-${post.id}`)}
              style={{background:"#fff",borderRadius:18,border:"1px solid rgba(124,58,237,.1)",overflow:"hidden",cursor:"pointer",transition:"all .22s",boxShadow:"0 2px 12px rgba(124,58,237,.05)"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(124,58,237,.13)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 12px rgba(124,58,237,.05)";}}>
              <div style={{height:4,background:"linear-gradient(90deg,#7C3AED,#8B5CF6)"}}/>
              <div style={{padding:"22px 24px 26px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:"rgba(124,58,237,.08)",color:"#7C3AED"}}>{post.category}</span>
                  <span style={{fontSize:11,color:"#9ca3af"}}>{post.readTime}</span>
                </div>
                <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:17,color:"#111827",marginBottom:10,lineHeight:1.35}}>{post.title}</h2>
                <p style={{fontSize:13.5,color:"#6b7280",lineHeight:1.65,marginBottom:16}}>{post.desc}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:11.5,color:"#9ca3af"}}>{post.date}</span>
                  <span style={{fontSize:12.5,fontWeight:600,color:"#7C3AED",display:"flex",alignItems:"center",gap:4}}>Read more <ChevronRight size={13}/></span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{marginTop:52,background:"linear-gradient(135deg,#7C3AED,#6D28D9)",borderRadius:20,padding:"36px 32px",textAlign:"center"}}>
          <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:24,color:"#fff",marginBottom:10}}>Stop Writing Emails Manually</h2>
          <p style={{fontSize:15,color:"rgba(255,255,255,.75)",maxWidth:420,margin:"0 auto 22px",lineHeight:1.65}}>Use Mailgic's free AI email generator to write professional emails in seconds.</p>
          <button className="gbtn" onClick={()=>nav("generator")} style={{background:"rgba(255,255,255,.15)",border:"1.5px solid rgba(255,255,255,.3)"}}><Sparkles size={14}/>Try It Free</button>
        </div>
      </div>
      <Footer nav={nav}/>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BLOG POST PAGE
═══════════════════════════════════════════ */
function BlogPostPage({ postId, nav }) {
  const post=BLOG_POSTS.find(p=>p.id===postId);
  useEffect(()=>window.scrollTo({top:0}),[postId]);
  if(!post) return <NotFound nav={nav}/>;
  const others=BLOG_POSTS.filter(p=>p.id!==postId).slice(0,3);
  return (
    <div style={{minHeight:"100vh",background:"#fafbff"}}>
      <style>{BLOG_CSS}</style>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,.97)",backdropFilter:"blur(18px)",borderBottom:"1px solid rgba(124,58,237,.07)",padding:"13px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Logo size={24}/>
        <button className="obtn" onClick={()=>nav("blog")} style={{padding:"7px 14px",fontSize:13,gap:5}}><ArrowLeft size={13}/>All Articles</button>
      </div>
      <div style={{maxWidth:720,margin:"0 auto",padding:"48px 24px 80px"}}>
        <div style={{marginBottom:28}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <span style={{padding:"3px 11px",borderRadius:20,fontSize:12,fontWeight:600,background:"rgba(124,58,237,.08)",color:"#7C3AED"}}>{post.category}</span>
            <span style={{fontSize:12,color:"#9ca3af"}}>{post.readTime}</span>
            <span style={{fontSize:12,color:"#9ca3af"}}>·</span>
            <span style={{fontSize:12,color:"#9ca3af"}}>{post.date}</span>
          </div>
          <h1 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(24px,4vw,38px)",color:"#111827",lineHeight:1.2,marginBottom:16}}>{post.title}</h1>
          <p style={{fontSize:17,color:"#6b7280",lineHeight:1.75,borderLeft:"3px solid #7C3AED",paddingLeft:16}}>{post.desc}</p>
        </div>
        <div style={{background:"rgba(124,58,237,.04)",border:"1px solid rgba(124,58,237,.12)",borderRadius:14,padding:"18px 22px",marginBottom:36,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:13.5,fontWeight:600,color:"#111827",marginBottom:3}}>✦ Try Mailgic's Free AI Email Generator</div>
            <div style={{fontSize:12.5,color:"#6b7280"}}>Write professional emails in seconds. No login required.</div>
          </div>
          <button className="gbtn" onClick={()=>nav("generator")} style={{padding:"9px 20px",fontSize:13}}><Sparkles size={13}/>Generate Email</button>
        </div>
        <div className="bc" dangerouslySetInnerHTML={{__html:post.content}}/>
        <div style={{background:"linear-gradient(135deg,#7C3AED,#6D28D9)",borderRadius:18,padding:"32px 28px",textAlign:"center",marginTop:48}}>
          <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:21,color:"#fff",marginBottom:10}}>Generate This Email in Seconds</h3>
          <p style={{fontSize:14.5,color:"rgba(255,255,255,.75)",marginBottom:20}}>Use Mailgic's free AI email generator — no account needed.</p>
          <button className="gbtn" onClick={()=>nav("generator")} style={{background:"rgba(255,255,255,.15)",border:"1.5px solid rgba(255,255,255,.3)"}}><Sparkles size={14}/>Try Free Now</button>
        </div>
        {others.length>0&&(
          <div style={{marginTop:52}}>
            <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,color:"#111827",marginBottom:18}}>More Articles</h3>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {others.map(p=>(
                <div key={p.id} onClick={()=>nav(`blog-${p.id}`)}
                  style={{padding:"16px 20px",background:"#fff",borderRadius:12,border:"1px solid rgba(124,58,237,.09)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,transition:"all .18s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#7C3AED"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(124,58,237,.09)"}>
                  <div>
                    <div style={{fontSize:13.5,fontWeight:600,color:"#111827",marginBottom:3}}>{p.title}</div>
                    <div style={{fontSize:12,color:"#9ca3af"}}>{p.readTime} · {p.category}</div>
                  </div>
                  <ChevronRight size={15} color="#7C3AED" style={{flexShrink:0}}/>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer nav={nav}/>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════ */
export default function App() {
  const [page,setPage]=useState("home"), [user,setUser]=useState(null), [ready,setReady]=useState(false);
  useEffect(()=>{ setTimeout(()=>setReady(true),100); },[]);

  const nav=useCallback((target)=>{
    const secs=["features","generator","pricing","testimonials"];
    if(target==="home"){ if(page==="home")window.scrollTo({top:0,behavior:"smooth"}); else{setPage("home");window.scrollTo({top:0});} return; }
    if(secs.includes(target)){
      if(page==="home"){const el=document.getElementById(target);el&&el.scrollIntoView({behavior:"smooth"});}
      else{setPage("home");setTimeout(()=>{const el=document.getElementById(target);el&&el.scrollIntoView({behavior:"smooth"});},65);}
      return;
    }
    setPage(target); window.scrollTo({top:0});
  },[page]);

  const logout=useCallback(()=>{ if(user?.token)sbAuth.signOut(user.token); setUser(null); setPage("home"); window.scrollTo({top:0}); },[user]);

  if(!ready) return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18}}>
      <Logo size={34} dark/>
      <div style={{width:26,height:26,borderRadius:"50%",border:"2.5px solid rgba(124,58,237,.22)",borderTopColor:"#7C3AED",animation:"spin 1s linear infinite"}}/>
    </div>
  );

  const noNav=["dashboard","login","signup"].includes(page);
  const renderPage=()=>{
    if(page==="dashboard"){ if(!user){setPage("login");return null;} return <Dashboard user={user} logout={logout} nav={nav}/>; }
    if(page==="login"||page==="signup") return <AuthPage mode={page} nav={nav} onLogin={setUser}/>;
    if(LEGAL[page]) return <LegalPage id={page} nav={nav}/>;
    if(page==="blog") return <BlogPage nav={nav}/>;
    if(page.startsWith("blog-")) return <BlogPostPage postId={page.replace("blog-","")} nav={nav}/>;
    if(page==="contact") return <ContactPage nav={nav} Logo={Logo} Footer={Footer}/>;
    if(page!=="home") return <NotFound nav={nav}/>;
    return <Home nav={nav} user={user}/>;
  };

  return (<><style>{CSS}</style>{!noNav&&<Navbar page={page} user={user} nav={nav} logout={logout}/>}{renderPage()}</>);
}
