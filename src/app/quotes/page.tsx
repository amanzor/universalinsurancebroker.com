import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Quote | Universal Insurance Brokers",
  description:
    "Get instant quotes from 100+ insurance carriers in under 10 minutes. No commitment required.",
};

export default function QuotesPage() {
  return <QuoteForm />;
}
