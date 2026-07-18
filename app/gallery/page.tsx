import type { Metadata } from "next";
import { Footer, Header, ProductPhoto } from "../components/chrome";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore AVELUNE personalized wooden keepsakes, portrait details, interiors, and calm home settings.",
  alternates: { canonical: "/gallery" },
  openGraph: { title: "AVELUNE Gallery", description: "Details made to feel personal, considered, and at home.", url: "/gallery" },
};

const images = [
  ["/images/avelune/gallery-fireplace.jpg", "Home setting", "An understated presence within a familiar room."],
  ["/images/avelune/gallery-flowers.jpg", "Gifting", "A thoughtful gesture, prepared with care."],
  ["/images/avelune/gallery-bookshelf.jpg", "Home setting", "Made to live naturally among the things you love."],
] as const;

export default function Gallery() {
  return <><Header/><main>
    <section className="page-hero wrap"><p className="eyebrow">Gallery</p><h1>Small details.<br/>Lasting presence.</h1><p className="gallery-note">Details made to feel personal, considered, and at home.</p></section>
    <section className="gallery wrap">{images.map(([src, category, caption], index) => <figure key={src}><ProductPhoto src={src} alt={`AVELUNE ${category.toLowerCase()}`}/><figcaption>{String(index + 1).padStart(2, "0")} — {category}<span>{caption}</span></figcaption></figure>)}</section>
  </main><Footer/></>;
}
