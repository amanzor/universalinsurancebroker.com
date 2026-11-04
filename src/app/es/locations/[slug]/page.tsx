import LocationView from "@/components/LocationView";
import { LocationJsonLd, locationMetadata, officeSlugs } from "@/lib/locationSeo";

export const dynamicParams = false;
export const generateStaticParams = officeSlugs;

export function generateMetadata({ params }: { params: { slug: string } }) {
  return locationMetadata(params.slug, "es");
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <LocationJsonLd slug={params.slug} lang="es" />
      <LocationView slug={params.slug} />
    </>
  );
}
