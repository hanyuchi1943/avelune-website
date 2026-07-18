"use client";

import Link from "next/link";
import { useState } from "react";
const links = [["Product","/product"],["About","/about"],["Gallery","/gallery"],["FAQ","/faq"],["Contact","/contact"]] as const;
export function Header(){return <header className="header"><Link className="wordmark" href="/">AVELUNE</Link><nav aria-label="Main navigation">{links.map(([name,href])=><Link href={href} key={href}>{name}</Link>)}</nav><Link className="inquire" href="/contact">Enquire <span>↗</span></Link></header>}
export function Footer(){return <footer className="footer"><div><Link className="wordmark" href="/">AVELUNE</Link><p>A quiet place for their love to stay.</p></div><div className="footer-links">{links.map(([name,href])=><Link href={href} key={href}>{name}</Link>)}<a href="https://instagram.com" aria-label="Instagram placeholder">Instagram</a><a href="https://pinterest.com" aria-label="Pinterest placeholder">Pinterest</a></div><div className="footer-legal"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div><small>© {new Date().getFullYear()} AVELUNE</small></footer>}
export function ProductPhoto({src,alt,className="",priority=false,fallbackSrc}:{src?:string;alt:string;className?:string;priority?:boolean;fallbackSrc?:string}) {
  const [imageSrc,setImageSrc]=useState(src?.trim() || "");
  const [failed,setFailed]=useState(false);
  function handleError() {
    if (fallbackSrc && imageSrc !== fallbackSrc) setImageSrc(fallbackSrc); else setFailed(true);
  }
  return <div className={`product-photo ${className}${failed ? " image-unavailable" : ""}`} role={failed ? "img" : undefined} aria-label={failed ? alt : undefined}>
    {!failed && imageSrc ? <>
      {/* eslint-disable-next-line @next/next/no-img-element -- local assets intentionally bypass the unavailable runtime image optimizer. */}
      <img src={imageSrc} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} onError={handleError} />
    </> : <span className="neutral-image-fallback" aria-hidden="true" />}
  </div>;
}
