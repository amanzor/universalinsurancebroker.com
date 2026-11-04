import { RouteJsonLd, routeMetadata } from "@/lib/routeSeo";

export const metadata = routeMetadata("home-insurance/form", "es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteJsonLd route="home-insurance/form" lang="es" />
      {children}
    </>
  );
}
