import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { faqs } from "@/lib/faqs";

const description =
  "Answers to common questions about auto, home, commercial and health insurance in Florida: quotes, rates, SR-22s, coverage and how working with a broker helps.";

export const metadata = pageMetadata({
  path: "/faq",
  title: "Insurance FAQ",
  description,
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((cat) =>
    cat.questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd("/faq", "FAQ"), faqJsonLd]} />
      {children}
    </>
  );
}
