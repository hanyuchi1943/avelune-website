import Link from "next/link";
import { Footer, Header, ProductPhoto } from "./components/chrome";

const details = [
  ["/images/avelune/hero-keepsake.jpg", "Closed box", "The calm, minimal exterior in light beech."],
  ["/images/avelune/product-open-dark.jpg", "Black velvet interior", "A soft place for the mementoes that matter."],
  ["/images/avelune/product-angle.jpg", "Side profile", "Solid wood, cleanly finished at every edge."],
  ["/images/avelune/product-angle.jpg", "Portrait engraving", "A fine, personal rendering made from your photo."],
] as const;

export default function Home() { return <><Header/><main>
  <section className="hero"><ProductPhoto className="hero-art" src="/images/avelune/hero-keepsake.jpg" alt="Personalised AVELUNE wooden pet keepsake box" priority/><div className="hero-copy"><p className="eyebrow">Personalised pet keepsakes</p><h1>A quiet place for<br/>their love to stay.</h1><p>Personalized wooden keepsake boxes, thoughtfully made to hold the memories that remain part of home.</p><div className="hero-actions"><Link className="button light" href="/contact">Create Your Keepsake <span>↗</span></Link><Link className="text-action" href="/about">Discover AVELUNE <span>→</span></Link></div></div><p className="hero-note">01 — The original keepsake box</p></section>
  <section className="intro wrap"><p className="eyebrow">The AVELUNE keepsake box</p><div><h2>Made to be remembered.</h2><p className="lede">Designed to live quietly at home—beautiful enough to keep in view, personal enough to hold a familiar story close.</p><Link className="text-action dark" href="/product">Meet the box <span>→</span></Link></div></section>
  <section className="material-grid wrap"><article><span>01</span><h3>Solid beech wood</h3><p>Natural warmth and a finely finished surface that feels at home in a considered space.</p></article><article><span>02</span><h3>Personalized portrait engraving</h3><p>A portrait, name, dates and optional words that make the piece unmistakably theirs.</p></article><article><span>03</span><h3>Black velvet interior</h3><p>A soft, dark lining for the small objects that deserve care.</p></article></section>
  <section className="process wrap"><p className="eyebrow">How it works</p><div className="process-grid"><article><span>01</span><h3>Share your pet photo</h3><p>Choose a clear, well-lit image that feels true to them.</p></article><article><span>02</span><h3>Approve the portrait artwork</h3><p>Review the personalised direction before production begins.</p></article><article><span>03</span><h3>Receive your personalized keepsake</h3><p>Your finished box is made with the details you have approved.</p></article></div></section>
  <section className="lifestyle"><ProductPhoto src="/images/avelune/gallery-fireplace.jpg" alt="AVELUNE keepsake box in a warm, quiet home setting"/><div><p className="eyebrow">A gentle presence at home</p><h2>Made to sit beside the life you shared.</h2><Link className="text-action dark" href="/gallery">Explore the gallery <span>→</span></Link></div></section>
  <section className="detail-preview wrap"><div className="detail-heading"><p className="eyebrow">Seen up close</p><h2>The details are<br/>the difference.</h2></div><div className="detail-grid">{details.map(([src,title,copy])=><article key={title}><ProductPhoto src={src} alt={`AVELUNE ${title.toLowerCase()}`}/><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
  <section className="home-cta"><div className="wrap"><p className="eyebrow">Begin with a memory</p><h2>Create a quiet place for their story.</h2><Link className="button light" href="/contact">Start Your Inquiry <span>↗</span></Link></div></section>
</main><Footer/></>; }
