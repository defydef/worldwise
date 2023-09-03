import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams(); // get the current url
  const lat = searchParams.get("lat"); // get the query param "lat"
  const lng = searchParams.get("lng"); // get the query param "lat"

  const navigate = useNavigate();

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 25, lng: 50 });
        }}
      >
        Change position
      </button>
    </div>
  );
}

export default Map;
