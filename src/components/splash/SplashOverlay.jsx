import { useEffect, useState } from 'react'
export default function SplashOverlay() {
  const [active,setActive]=useState(()=>{try{return location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches}catch{return false}})
  useEffect(()=>{
    if(!active)return
    const timer=setTimeout(()=>setActive(false),1500)
    const skip=()=>setActive(false)
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');reduced.addEventListener('change',skip)
    window.addEventListener('keydown',skip);window.addEventListener('pointerdown',skip)
    return()=>{clearTimeout(timer);reduced.removeEventListener('change',skip);window.removeEventListener('keydown',skip);window.removeEventListener('pointerdown',skip)}
  },[active])
  if(!active)return null
  return <div className="splash-overlay" onAnimationEnd={event=>{if(event.animationName==='splash-exit')setActive(false)}} aria-label="Panta Signal introduction"><button className="button secondary splash-skip" onClick={()=>setActive(false)}>Skip intro</button><div className="splash-logo" aria-hidden="true"><span className="brand-mark"><i/><i/><i/></span><strong>Panta<span>Signal</span></strong></div><div className="splash-line" aria-hidden="true"/><p>Predict what’s next.</p></div>
}
