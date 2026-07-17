import { Footer, Header, ProductPhoto } from "../components/chrome";
export const metadata={title:"Gallery — AVELUNE"};
const images=[
  ["/images/avelune/gallery-fireplace.jpg","Keepsake in a quiet room"],
  ["/images/avelune/product-open-light.jpg","The open interior"],
  ["/images/avelune/gallery-bookshelf.jpg","A familiar place at home"],
  ["/images/avelune/product-angle.jpg","Portrait engraving"],
  ["/images/avelune/gallery-flowers.jpg","A thoughtful gesture"],
  ["/images/avelune/product-angle.jpg","Solid beech profile"],
  ["/images/avelune/gallery-window.jpg","Light across the grain"],
  ["/images/avelune/hero-keepsake.jpg","The original keepsake box"],
] as const;
export default function Gallery(){return <><Header/><main><section className="page-hero wrap"><p className="eyebrow">Gallery</p><h1>Small details.<br/>Lasting presence.</h1><p className="gallery-note">Product and lifestyle concept imagery. Final personalisation is made for each keepsake.</p></section><section className="gallery wrap">{images.map(([src,caption],i)=><figure key={caption}><ProductPhoto src={src} alt={`AVELUNE ${caption.toLowerCase()}`}/><figcaption>{String(i+1).padStart(2,"0")} — {caption}</figcaption></figure>)}</section></main><Footer/></>}
