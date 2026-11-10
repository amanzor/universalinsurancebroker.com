import GuideView from "@/components/GuideView";
import { GuideJsonLd, guideMetadata, guideSlugs } from "@/lib/guideSeo";

export const dynamicParams = false;
export const generateStaticParams = guideSlugs;

export function generateMetadata({ params }: { params: { slug: string } }) {
  return guideMetadata(params.slug, "es");
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <GuideJsonLd slug={params.slug} lang="es" />
      <GuideView slug={params.slug} />
    </>
  );
}
