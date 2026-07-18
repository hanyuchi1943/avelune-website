import type { Metadata } from "next";
import { Footer, Header } from "../components/chrome";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about AVELUNE personalized wooden pet memorial keepsakes, portraits, dimensions, inquiries, and international requests.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "AVELUNE FAQ", description: "Clear answers about personalized keepsakes and the inquiry process.", url: "/faq" },
};

const faqs = [
  ["What can be personalized?", "You can request a pet portrait, name, meaningful dates, or a short memorial message. We will confirm the personalization details with you before an order is accepted."],
  ["What can be stored inside?", "The keepsake is designed for photographs, collars, handwritten notes, tags, small toys, and other meaningful belongings."],
  ["What size is the keepsake box?", "The current sample is approximately 250 × 200 × 100 mm. Final dimensions are confirmed before an order is accepted."],
  ["Will the wood grain look exactly the same?", "No. Natural wood grain and final appearance may vary slightly from piece to piece, which is part of the character of a wooden keepsake."],
  ["How do I submit a pet photograph?", "Start with the inquiry form and tell us about the companion you are remembering. We will guide you through the next step for sharing a suitable photograph by email."],
  ["What happens after I submit the inquiry form?", "We review your request personally, then reply by email with the next steps and any details that need confirming before an order is accepted."],
  ["How long does AVELUNE take to reply?", "We usually reply within 24 hours."],
  ["Do you ship internationally?", "Worldwide enquiries are welcome. Shipping availability, timing, and costs are confirmed after reviewing your request."],
  ["Is this an urn?", "AVELUNE is designed as a memorial keepsake box for photographs, collars, notes, and other meaningful belongings. It is not currently marketed as a certified pet urn."],
  ["Can I enquire about gifting or wholesale?", "Yes. The inquiry form welcomes personal, gifting, wholesale, and private-label enquiries."],
];

export default function FAQ() {
  return <><Header/><main><section className="page-hero wrap"><p className="eyebrow">Questions, answered</p><h1>Made with care.<br/>Explained simply.</h1></section><section className="faq wrap">{faqs.map(([question, answer], index) => <details open={index === 0} key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</section></main><Footer/></>;
}
