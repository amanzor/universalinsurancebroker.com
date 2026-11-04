import { RouteJsonLd, routeMetadata } from "@/lib/routeSeo";

export const metadata = routeMetadata("about", "es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteJsonLd route="about" lang="es" />
      {children}
    </>
  );
}
