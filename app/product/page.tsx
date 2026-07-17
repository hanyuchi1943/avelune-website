import Link from "next/link";
import { Footer, Header, ProductPhoto } from "../components/chrome";
export const metadata={title:"Personalized Pet Keepsake Box — AVELUNE"};
const gallery=[
  ["/images/avelune/product-front.jpg","Closed front view"],
  ["/images/avelune/product-open-dark.jpg","Open black velvet interior"],
  ["/images/avelune/product-angle.jpg","Side and corner detail"],
  ["/images/avelune/product-angle.jpg","Engraving close-up"],
] as const;
export default function Product(){return <><Header/><main><section className="product-head"><div><p className="eyebrow">The signature piece</p><h1>Personalized Pet<br/>Keepsake Box</h1><p>A solid-wood place for photographs, collars, notes and the small rituals that make a memory feel close.</p><Link className="button" href="/contact">Personalize Yours <span>↗</span></Link></div><ProductPhoto className="product-art" src="/images/avelune/product-front.jpg" fallbackSrc="/images/avelune/hero-keepsake.jpg" alt="Personalized AVELUNE pet keepsake box in light beech wood" priority/></section>
<section className="product-gallery wrap">{gallery.map(([src,label])=><figure key={label}><ProductPhoto src={src} fallbackSrc="/images/avelune/hero-keepsake.jpg" alt={`AVELUNE ${label.toLowerCase()}`}/><figcaption>{label}</figcaption></figure>)}</section>
<section className="intro wrap"><p className="eyebrow">A personal place</p><div><h2>An everyday object<br/>with a deeper purpose.</h2><p className="lede">This is a keepsake box, not a funeral urn. It is a personal, beautiful place for the things that continue to hold meaning.</p></div></section>
<section className="product-info wrap"><div><p className="eyebrow">Made with care</p><h2>Simple materials.<br/>Lasting presence.</h2></div><dl><div><dt>Material</dt><dd>Solid light-beech wood</dd></div><div><dt>Interior</dt><dd>Black velvet lining</dd></div><div><dt>Personalization</dt><dd>Pet portrait, name, memorial dates, and optional short message</dd></div><div><dt>Closure</dt><dd>Hidden magnetic closure</dd></div><div><dt>External size</dt><dd>250 × 200 × 100 mm</dd></div><div><dt>Purpose</dt><dd>A keepsake box, not a funeral urn</dd></div></dl></section>
<section className="product-process wrap"><p className="eyebrow">How it works</p><div><article><span>01</span><h3>Share your pet photo</h3><p>Send a clear pet photo and the personal details you would like to include.</p></article><article><span>02</span><h3>Approve the portrait artwork</h3><p>Review the portrait direction before your box enters production.</p></article><article><span>03</span><h3>We create your personalized keepsake</h3><p>Final timing and shipping details are confirmed before production.</p></article></div></section>
<section className="closing wrap"><p className="eyebrow">Make it personal</p><h2>Begin with the story you want to keep.</h2><Link className="button" href="/contact">Create Your Keepsake <span>↗</span></Link></section></main><Footer/></>}
