import { routeMetadata } from "@/lib/routeSeo";

export const metadata = routeMetadata("review", "en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
