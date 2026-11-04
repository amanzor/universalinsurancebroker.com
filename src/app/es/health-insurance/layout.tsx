import { RouteJsonLd, routeMetadata } from "@/lib/routeSeo";

export const metadata = routeMetadata("health-insurance", "es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteJsonLd route="health-insurance" lang="es" />
      {children}
    </>
  );
}
