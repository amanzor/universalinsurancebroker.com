import { RouteJsonLd, routeMetadata } from "@/lib/routeSeo";

export const metadata = routeMetadata("commercial-insurance", "en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteJsonLd route="commercial-insurance" lang="en" />
      {children}
    </>
  );
}
