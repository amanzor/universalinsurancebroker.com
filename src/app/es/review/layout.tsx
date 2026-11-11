import { routeMetadata } from "@/lib/routeSeo";

export const metadata = routeMetadata("review", "es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
