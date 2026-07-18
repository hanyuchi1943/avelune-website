import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header, ProductPhoto } from "../components/chrome";

export const metadata: Metadata = {
  title: "Personalized Pet Keepsake Box",
  description: "A personalized beech wood pet memorial keepsake box for photographs, collars, handwritten notes, and meaningful details.",
  alternates: { canonical: "/product" },
  openGraph: { title: "Personalized Pet Keepsake Box", description: "A calm, personalized wooden keepsake for the details that matter most.", url: "/product" },
};

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
        <Link className="button" href="/contact">Create Your Keepsake <span>↗</span></Link>
      </div>
      <ProductPhoto className="product-art" src="/images/avelune/hero-keepsake.jpg" alt="Personalized AVELUNE wooden pet keepsake box" priority/>
    </section>

    <section className="product-gallery wrap">{gallery.map(([src, label]) => <figure key={label}><ProductPhoto src={src} alt={`AVELUNE ${label.toLowerCase()}`}/><figcaption>{label}</figcaption></figure>)}</section>

    <section className="intro wrap">
      <p className="eyebrow">A keepsake made personal</p>
      <div><h2>An everyday object<br/>with a deeper purpose.</h2><p className="lede">A refined wooden box created to hold photographs, collars, tags, letters, small toys and other meaningful mementos.</p></div>
    </section>

    <section className="product-info wrap">
      <div><p className="eyebrow">Specifications</p><h2>Meaningful details.<br/>Considered quietly.</h2></div>
      <div>
        <dl>
          <div><dt>Material</dt><dd>Beech wood</dd></div>
          <div><dt>Dimensions</dt><dd>Approx. 250 × 200 × 100 mm.</dd></div>
          <div><dt>Personalization</dt><dd>Pet portrait, name, dates, or a short memorial message</dd></div>
          <div><dt>Interior</dt><dd>Soft black flocked lining</dd></div>
          <div><dt>Purpose</dt><dd>Designed for photographs, collars, handwritten notes, and meaningful keepsakes</dd></div>
        </dl>
        <p className="product-confirmation">Final dimensions and production details will be confirmed before an order is accepted.</p>
        <p className="product-confirmation">Final appearance and natural wood grain may vary slightly from piece to piece.</p>
      </div>
    </section>

    <section className="product-process wrap">
      <p className="eyebrow">Inquiry-led ordering</p>
      <div>
        <article><span>01</span><h3>Share the details</h3><p>Tell us about your companion and the keepsake you have in mind.</p></article>
        <article><span>02</span><h3>Review the design</h3><p>We prepare the portrait and personalization details for your approval.</p></article>
        <article><span>03</span><h3>Confirm before ordering</h3><p>Final materials, dimensions, finishes, pricing and production details are confirmed before an order is accepted.</p></article>
      </div>
    </section>
  </main><Footer/></>;
}
