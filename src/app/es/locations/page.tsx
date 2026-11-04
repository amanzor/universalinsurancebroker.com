import LocationsIndex from "@/components/LocationsIndex";
import { LocationsIndexJsonLd, locationsIndexMetadata } from "@/lib/locationSeo";

export const metadata = locationsIndexMetadata("es");

export default function Page() {
  return (
    <>
      <LocationsIndexJsonLd lang="es" />
      <LocationsIndex />
    </>
  );
}
