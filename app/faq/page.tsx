import { Footer, Header } from "../components/chrome";

export const metadata = { title: "FAQ — AVELUNE" };

const faqs = [
  ["What can I keep inside the box?", "The keepsake can hold photographs, collars, tags, letters, small toys and other meaningful mementos."],
  ["How does personalization work?", "Share the details that matter to you, such as a portrait, name, meaningful dates and an optional short inscription. We will guide you through the available options."],
  ["Can I request a portrait from my own photograph?", "Yes. A clear photograph of your companion helps us prepare a personalized portrait. We can offer guidance if you are unsure which image to choose."],
  ["Will I review the design before production?", "Yes. The portrait and personalization details are prepared for your approval before production."],
  ["Is this intended only as a pet urn?", "No. AVELUNE is presented as a versatile memorial keepsake for photographs, collars, tags, letters, toys and other mementos. It is not presented as an urn or described for ashes."],
  ["Can I enquire about gifting or wholesale?", "Yes. The inquiry form welcomes personal, gifting, wholesale and private-label enquiries."],
  ["Do you accept international enquiries?", "Yes. Worldwide enquiries are welcome. Final shipping availability and details are confirmed after reviewing your request."],
  ["What happens after I submit the inquiry form?", "We review your request personally, then reply by email with the next steps and any details that need confirming before an order is accepted."],
];

export default function FAQ() {
  return <><Header/><main><section className="page-hero wrap"><p className="eyebrow">Questions, answered</p><h1>Made with care.<br/>Explained simply.</h1></section><section className="faq wrap">{faqs.map(([question, answer], index) => <details open={index === 0} key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</section></main><Footer/></>;
}
