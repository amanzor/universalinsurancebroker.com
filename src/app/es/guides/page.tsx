import GuidesIndex from "@/components/GuidesIndex";
import { GuidesIndexJsonLd, guidesIndexMetadata } from "@/lib/guideSeo";

export const metadata = guidesIndexMetadata("es");

export default function Page() {
  return (
    <>
      <GuidesIndexJsonLd lang="es" />
      <GuidesIndex />
    </>
  );
}
