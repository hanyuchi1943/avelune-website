import Link from "next/link";
import { Footer, Header, ProductPhoto } from "./components/chrome";

const details = [
  ["/images/avelune/hero-keepsake.jpg", "Closed box", "A calm, minimal form designed to live quietly at home."],
  ["/images/avelune/product-open-dark.jpg", "Interior and storage", "A considered place for the mementos that matter."],
  ["/images/avelune/product-angle.jpg", "Wooden finish", "Warm material and clean lines in a refined home object."],
  ["/images/avelune/product-open-light.jpg", "Personalized portrait", "A portrait and meaningful details made personal to one companion."],
] as const;

const trustPoints = [
  "Personalized for one companion",
  "Portrait and inscription reviewed before production",
  "Thoughtfully prepared for gifting or remembrance",
  "Worldwide enquiries welcome",
] as const;

export default function Home() {
  return <><Header/><main>
    <section className="hero">
      <ProductPhoto className="hero-art" src="/images/avelune/hero-keepsake.jpg" alt="Personalized AVELUNE wooden pet keepsake" priority/>
      <div className="hero-copy">
        <p className="eyebrow">Personalized pet keepsakes</p>
        <h1>A quiet place for<br/>their love to stay.</h1>
        <p>Personalized wooden keepsakes, thoughtfully made to hold the memories that matter most.</p>
        <div className="hero-actions">
          <Link className="button light" href="/contact">Create Your Keepsake <span>↗</span></Link>
          <Link className="text-action" href="/about">Discover AVELUNE <span>→</span></Link>
        </div>
      </div>
    </section>

    <section className="intro wrap">
      <p className="eyebrow">The AVELUNE keepsake</p>
      <div>
        <h2>Made to be remembered.</h2>
        <p className="lede">For people who want a meaningful object at home: a place for the photographs, notes and small details that keep a companion close.</p>
        <Link className="text-action dark" href="/product">Meet the keepsake <span>→</span></Link>
      </div>
    </section>

    <section className="material-grid wrap">
      <article><span>01</span><h3>Wooden form</h3><p>A refined, understated object made to sit naturally within a considered home.</p></article>
      <article><span>02</span><h3>Personalized portrait</h3><p>A portrait, name and meaningful details that make the keepsake unmistakably theirs.</p></article>
      <article><span>03</span><h3>Meaningful storage</h3><p>A place for photographs, collars, tags, letters and the small objects that hold a story.</p></article>
    </section>

    <section className="process wrap">
      <p className="eyebrow">How it works</p>
      <div className="process-grid">
        <article><span>01</span><h3>Share their story</h3><p>Tell us about your companion and the keepsake you have in mind.</p></article>
        <article><span>02</span><h3>Review the design</h3><p>We prepare the portrait and personalization details for your approval.</p></article>
        <article><span>03</span><h3>Made with care</h3><p>Your keepsake is carefully produced and prepared for delivery.</p></article>
      </div>
    </section>

    <section className="trust wrap" aria-label="AVELUNE inquiry assurances">
      {trustPoints.map((point, index) => <p key={point}><span>{String(index + 1).padStart(2, "0")}</span>{point}</p>)}
    </section>

    <section className="lifestyle">
      <ProductPhoto src="/images/avelune/gallery-fireplace.jpg" alt="AVELUNE keepsake in a warm home setting"/>
      <div><p className="eyebrow">A gentle presence at home</p><h2>Made to sit beside the life you shared.</h2><Link className="text-action dark" href="/gallery">Explore the gallery <span>→</span></Link></div>
    </section>

    <section className="detail-preview wrap">
      <div className="detail-heading"><p className="eyebrow">Seen up close</p><h2>The details are<br/>the difference.</h2></div>
      <div className="detail-grid">{details.map(([src, title, copy]) => <article key={title}><ProductPhoto src={src} alt={`AVELUNE ${title.toLowerCase()}`}/><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="home-cta"><div className="wrap"><p className="eyebrow">Begin with a memory</p><h2>Create a quiet place for their story.</h2><Link className="button light" href="/contact">Start Your Inquiry <span>↗</span></Link></div></section>
  </main><Footer/></>;
}
