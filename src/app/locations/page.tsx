import LocationsIndex from "@/components/LocationsIndex";
import { LocationsIndexJsonLd, locationsIndexMetadata } from "@/lib/locationSeo";

export const metadata = locationsIndexMetadata("en");

export default function Page() {
  return (
    <>
      <LocationsIndexJsonLd lang="en" />
      <LocationsIndex />
    </>
  );
}
