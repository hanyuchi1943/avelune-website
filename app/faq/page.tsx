import { Footer, Header } from "../components/chrome";
export const metadata={title:"FAQ — AVELUNE"};
const faqs=[
 ["What is the AVELUNE keepsake box designed for?","It is a personalised solid-wood box for photographs, a collar, notes, tags and other small mementoes that keep a companion close."],
 ["Is this a funeral urn?","No. AVELUNE is a keepsake box: a quiet, personal place for meaningful objects. It is not designed or positioned as a funeral urn."],
 ["What can be personalized?","You can personalise the box with a pet portrait, name, dates and an optional short message."],
 ["What type of photo should I provide?","Choose a clear, well-lit image in which your pet’s face and defining features are easy to see. We can offer guidance if you are unsure."],
 ["Can I approve the portrait before production?","Yes. The portrait artwork is shared for your approval before production begins."],
 ["What material is the box made from?","The exterior is solid light-beech wood, selected for its warm grain and timeless finish."],
 ["What is the interior like?","The interior is lined in black velvet to create a soft, protected place for the keepsakes you choose to place inside."],
 ["How long does production take?","Final production timing will be confirmed before production, once your personalisation has been approved."],
 ["Do you ship internationally?","International shipping availability and final shipping details will be confirmed before production."],
 ["How do I start an inquiry?","Use the inquiry form to share your pet photo, preferred personalisation and a little about the keepsake you have in mind."],
];
export default function FAQ(){return <><Header/><main><section className="page-hero wrap"><p className="eyebrow">Questions, answered</p><h1>Made with care.<br/>Explained simply.</h1></section><section className="faq wrap">{faqs.map(([q,a],i)=><details open={i===0} key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</section></main><Footer/></>}
