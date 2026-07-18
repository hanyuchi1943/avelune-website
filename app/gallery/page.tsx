import type { Metadata } from "next";
import Image from "next/image";
import fireplaceImage from "../../public/images/avelune/gallery-fireplace.jpg";
import flowersImage from "../../public/images/avelune/gallery-flowers.jpg";
import bookshelfImage from "../../public/images/avelune/gallery-bookshelf.jpg";
import { Footer, Header } from "../components/chrome";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore AVELUNE personalized wooden keepsakes, portrait details, interiors, and calm home settings.",
  alternates: { canonical: "/gallery" },
  openGraph: { title: "AVELUNE Gallery", description: "Details made to feel personal, considered, and at home.", url: "/gallery" },
};

const images = [
  [fireplaceImage, "Home setting", "An understated presence within a familiar room.", "AVELUNE keepsake box beside a framed pet portrait"],
  [flowersImage, "Gifting", "A thoughtful gesture, prepared with care.", "AVELUNE keepsake box beside white flowers"],
  [bookshelfImage, "Home setting", "Made to live naturally among the things you love.", "AVELUNE keepsake box on a bookshelf"],
] as const;

export default function Gallery() {
  return <><Header/><main>
    <section className="page-hero wrap"><p className="eyebrow">Gallery</p><h1>Small details.<br/>Lasting presence.</h1><p className="gallery-note">Details made to feel personal, considered, and at home.</p></section>
    <section className="gallery wrap">{images.map(([src, category, caption, alt], index) => <figure key={src.src}><div className="product-photo"><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 55vw" quality={88}/></div><figcaption>{String(index + 1).padStart(2, "0")} — {category}<span>{caption}</span></figcaption></figure>)}</section>
  </main><Footer/></>;
}
