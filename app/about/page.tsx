import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header, ProductPhoto } from "../components/chrome";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about AVELUNE’s quiet approach to personalized wooden pet memorial keepsakes for the home.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About AVELUNE", description: "Quiet, personal keepsakes for the companions who remain part of home.", url: "/about" },
};

export default function About() {
  return <><Header/><main>
    <section className="page-hero wrap"><p className="eyebrow">About AVELUNE</p><h1>For a love that<br/>stays present.</h1><p className="lede">Quiet, personal keepsakes for the companions who remain part of home.</p></section>
    <section className="two-column wrap">
      <div><p className="eyebrow">Our point of view</p><h2>Made with restraint.<br/>Held with feeling.</h2></div>
      <div>
        <p>AVELUNE was created from a simple belief: the objects we keep at home can help us stay close to the companions we have loved.</p>
        <p>We create personalized wooden keepsakes that feel calm, considered and at home in the spaces where memories continue to live.</p>
        <p>Our approach is intentionally quiet. Each piece begins with a story, then develops through portrait, name, dates and the details that made that bond unique.</p>
      </div>
    </section>
    <ProductPhoto className="wide-art" src="/images/avelune/gallery-bookshelf.jpg" alt="AVELUNE keepsake in a familiar home setting"/>
    <section className="closing wrap"><p className="eyebrow">AVELUNE</p><h2>A quiet place for their love to stay.</h2><Link href="/product" className="button">Discover the keepsake <span>↗</span></Link></section>
  </main><Footer/></>;
}
