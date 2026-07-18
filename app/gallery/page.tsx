import type { Metadata } from "next";
import Image from "next/image";
import realFrontImage from "../../public/images/avelune/fallback-front.jpg";
import realEngravingImage from "../../public/images/avelune/fallback-engraving.jpg";
import realInteriorImage from "../../public/images/avelune/fallback-interior.jpg";
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
  [realFrontImage, "Product form", "A clear view of the engraved wooden keepsake.", "Real product photograph of an engraved wooden keepsake box"],
  [fireplaceImage, "Editorial setting", "A quiet composition that places memory objects together.", "Wooden keepsake box beside a framed cat portrait"],
  [realEngravingImage, "Engraving detail", "Close detail of the engraving and natural beech grain.", "Real product photograph showing engraving detail on beech wood"],
  [flowersImage, "Editorial still life", "An understated composition of wood and white flowers.", "Wooden keepsake box beside white flowers"],
  [realInteriorImage, "Black lining", "A close look at the soft black flocked interior.", "Real product photograph of the keepsake box interior with black flocked lining"],
  [bookshelfImage, "Editorial shelf scene", "A calm arrangement within a considered interior.", "Wooden keepsake box on a bookshelf"],
] as const;

export default function Gallery() {
  return <><Header/><main>
    <section className="page-hero wrap"><p className="eyebrow">Gallery</p><h1>Small details.<br/>Lasting presence.</h1><p className="gallery-note">Details made to feel personal, considered, and at home.</p></section>
    <section className="gallery wrap">{images.map(([src, category, caption, alt], index) => <figure key={src.src}><div className="product-photo"><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 55vw" quality={88}/></div><figcaption>{String(index + 1).padStart(2, "0")} — {category}<span>{caption}</span></figcaption></figure>)}</section>
  </main><Footer/></>;
}
