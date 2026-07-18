import { ContactForm } from "../components/contact-form";
import { Footer, Header } from "../components/chrome";
export const metadata={title:"Contact — AVELUNE"};
export default function Contact(){return <><Header/><main><section className="contact wrap"><p className="eyebrow">Inquiry</p><h1>Let’s make space<br/>for what matters.</h1><p className="lede">Tell us a little about the companion you are remembering and the keepsake you have in mind.</p><div className="contact-layout"><div className="contact-context"><p>For product, gifting, wholesale or private-label enquiries, we would be glad to hear from you.</p><p>We usually reply within 24 hours.</p><p>Please use the inquiry form to contact us.</p></div><ContactForm/></div></section></main><Footer/></>}
