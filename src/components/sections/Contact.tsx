import { getSiteContent } from "@/lib/data/content";
import ContactForm from "./ContactForm";

export default async function Contact() {
  const content = await getSiteContent();

  const instagramUrl = content["social.instagram"] ?? "https://instagram.com/brasserie_gallicus";
  const instagramHandle =
    "@" + (instagramUrl.split("instagram.com/")[1]?.replace(/\/$/, "") ?? "brasserie_gallicus");

  return (
    <ContactForm
      address1={content["contact.address.line1"] ?? "670 rue Auguste-Mondoux #4"}
      address2={content["contact.address.line2"] ?? "Gatineau, QC, Canada"}
      email={content["contact.email"] ?? "info@gallicus.ca"}
      instagramUrl={instagramUrl}
      instagramHandle={instagramHandle}
    />
  );
}
