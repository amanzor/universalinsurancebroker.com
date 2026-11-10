import GuidesIndex from "@/components/GuidesIndex";
import { GuidesIndexJsonLd, guidesIndexMetadata } from "@/lib/guideSeo";

export const metadata = guidesIndexMetadata("en");

export default function Page() {
  return (
    <>
      <GuidesIndexJsonLd lang="en" />
      <GuidesIndex />
    </>
  );
}
