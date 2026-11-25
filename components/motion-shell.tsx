"use client";
import { useEffect, useRef, useState } from "react";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const sequences:Record<string,string[]>={base:['sky'],claude:['sky'],gemini:['sky'],grok:['sky'],perplexity:['sky']};
export function MotionShell({layout,children,preview=false}:{layout:string;children:React.ReactNode;preview?:boolean}){
 const sequence=preview?sequences[layout].slice(0,1):sequences[layout];const refs=useRef<(HTMLVideoElement|null)[]>([]);const [active,setActive]=useState(0);const [playing,setPlaying]=useState(true);const [blocked,setBlocked]=useState(false);
 useEffect(()=>{let live=true;Promise.all(refs.current.map(v=>v?.play().catch(()=>undefined))).then(()=>{if(live&&refs.current.every(v=>v?.paused)) {setPlaying(false);setBlocked(true)}});return()=>{live=false}},[layout]);
 useEffect(()=>{if(!playing)return;const timer=window.setInterval(()=>setActive(i=>(i+1)%sequence.length),8000);return()=>window.clearInterval(timer)},[playing,sequence.length]);
 async function toggle(){if(playing){refs.current.forEach(v=>v?.pause());setPlaying(false)}else{try{await Promise.all(refs.current.map(v=>v?.play()));setBlocked(false);setPlaying(true)}catch{setBlocked(true)}}}
 return <div className={`motion-shell design-${layout}`}><div className="motion-stage" aria-hidden="true">{sequence.map((scene,i)=><video key={scene} ref={el=>{refs.current[i]=el}} className={`motion-video ${i===active?'is-active':''}`} autoPlay muted loop playsInline preload="auto"><source src={`${basePath}/motion/${scene}.mp4`} type="video/mp4"/></video>)}<div className="motion-shade"/></div><div className="motion-workspace">{children}</div><button className="motion-control" type="button" onClick={toggle} aria-label={playing?'Pause background motion':'Play background motion'}>{blocked?'PLAY BACKGROUND':playing?'Ⅱ':'▶'}</button><p className="motion-demo-note">Layout demo · Live responses require an OpenAI key</p><div className="motion-arthur-credit" aria-label="Arthur Best portfolio"><span>AB</span> ARTHUR BEST</div></div>
}
