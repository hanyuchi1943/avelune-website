import type { Metadata } from "next";
import { Footer, Header } from "../components/chrome";
export const metadata: Metadata={title:"Terms",description:"AVELUNE product, production, and shipping details are confirmed with each customer before an order is accepted.",alternates:{canonical:"/terms"},openGraph:{title:"AVELUNE Terms",description:"Final order details are confirmed before an order is accepted.",url:"/terms"}};
export default function Terms(){return <><Header/><main className="legal wrap"><p className="eyebrow">Terms</p><h1>Considered from<br/>first inquiry.</h1><p>Final product, production and shipping terms will be confirmed with each customer before production begins.</p></main><Footer/></>}
