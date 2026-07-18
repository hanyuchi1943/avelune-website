import Link from "next/link";
import { Footer, Header, ProductPhoto } from "../components/chrome";

export const metadata = { title: "Personalized Pet Keepsake Box — AVELUNE" };

const gallery = [
  ["/images/avelune/hero-keepsake.jpg", "Closed wooden form"],
  ["/images/avelune/product-open-dark.jpg", "Interior and storage"],
  ["/images/avelune/product-open-light.jpg", "Open keepsake detail"],
  ["/images/avelune/product-angle.jpg", "Portrait and meaningful details"],
] as const;

export default function Product() {
  return <><Header/><main>
    <section className="product-head">
      <div>
        <p className="eyebrow">The signature piece</p>
        <h1>Personalized Pet<br/>Keepsake Box</h1>
        <p>A refined wooden keepsake for the photographs, collars, notes and small mementos that keep a companion close.</p>
        <Link className="button" href="/contact">Begin an Inquiry <span>↗</span></Link>
      </div>
      <ProductPhoto className="product-art" src="/images/avelune/hero-keepsake.jpg" alt="Personalized AVELUNE wooden pet keepsake" priority/>
    </section>

    <section className="product-gallery wrap">{gallery.map(([src, label]) => <figure key={label}><ProductPhoto src={src} alt={`AVELUNE ${label.toLowerCase()}`}/><figcaption>{label}</figcaption></figure>)}</section>

    <section className="intro wrap">
      <p className="eyebrow">A keepsake made personal</p>
      <div><h2>An everyday object<br/>with a deeper purpose.</h2><p className="lede">A refined wooden box created to hold photographs, collars, tags, letters, small toys and other meaningful mementos.</p></div>
    </section>

    <section className="product-info wrap">
      <div><p className="eyebrow">Personalization options</p><h2>Meaningful details.<br/>Considered quietly.</h2></div>
      <dl>
        <div><dt>Portrait</dt><dd>Custom pet portrait prepared from your photograph.</dd></div>
        <div><dt>Personalization</dt><dd>Name, meaningful dates and an optional short inscription.</dd></div>
        <div><dt>Storage</dt><dd>A place for photographs, collars, tags, letters, small toys and other mementos.</dd></div>
        <div><dt>Ordering</dt><dd>Each inquiry begins with your story and the details you would like to include.</dd></div>
      </dl>
    </section>

    <section className="product-process wrap">
      <p className="eyebrow">Inquiry-led ordering</p>
      <div>
        <article><span>01</span><h3>Share the details</h3><p>Tell us about your companion and the keepsake you have in mind.</p></article>
        <article><span>02</span><h3>Review the design</h3><p>We prepare the portrait and personalization details for your approval.</p></article>
        <article><span>03</span><h3>Confirm before ordering</h3><p>Final materials, dimensions, finishes, pricing and production details are confirmed before an order is accepted.</p></article>
      </div>
    </section>

    <section className="closing wrap"><p className="eyebrow">Make it personal</p><h2>Begin with the story you want to keep.</h2><Link className="button" href="/contact">Create Your Keepsake <span>↗</span></Link></section>
  </main><Footer/></>;
}
