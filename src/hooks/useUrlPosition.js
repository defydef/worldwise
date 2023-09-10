import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams(); // get the current url
  const lat = searchParams.get("lat"); // get the query param "lat"
  const lng = searchParams.get("lng"); // get the query param "lat"

  return { lat, lng };
}
