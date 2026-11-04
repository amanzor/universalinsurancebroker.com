import { RouteJsonLd, routeMetadata } from "@/lib/routeSeo";

export const metadata = routeMetadata("home-insurance", "en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteJsonLd route="home-insurance" lang="en" />
      {children}
    </>
  );
}
