import { Footer, Header, ProductPhoto } from "../components/chrome";

export const metadata = { title: "Gallery — AVELUNE" };

const images = [
  ["/images/avelune/product-angle.jpg", "Portrait detail", "A close view of the personalized portrait and meaningful details."],
  ["/images/avelune/hero-keepsake.jpg", "Personalization", "A keepsake made individual to one companion."],
  ["/images/avelune/product-open-dark.jpg", "Interior and storage", "A quiet place for the objects that hold a story."],
  ["/images/avelune/gallery-fireplace.jpg", "Home setting", "An understated presence within a familiar room."],
  ["/images/avelune/product-open-light.jpg", "Materials and finish", "Wooden form and considered interior detail."],
  ["/images/avelune/gallery-flowers.jpg", "Gifting", "A thoughtful gesture, prepared with care."],
  ["/images/avelune/gallery-bookshelf.jpg", "Home setting", "Made to live naturally among the things you love."],
  ["/images/avelune/gallery-window.jpg", "Materials and finish", "Light moving softly across the wooden surface."],
] as const;

export default function Gallery() {
  return <><Header/><main>
    <section className="page-hero wrap"><p className="eyebrow">Gallery</p><h1>Small details.<br/>Lasting presence.</h1><p className="gallery-note">Details made to feel personal, considered, and at home.</p></section>
    <section className="gallery wrap">{images.map(([src, category, caption], index) => <figure key={src}><ProductPhoto src={src} alt={`AVELUNE ${category.toLowerCase()}`}/><figcaption>{String(index + 1).padStart(2, "0")} — {category}<span>{caption}</span></figcaption></figure>)}</section>
  </main><Footer/></>;
}
