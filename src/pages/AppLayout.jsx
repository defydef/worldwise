import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import { CityProvider } from "../context/CityContext";

function AppLayout() {
  return (
    <CityProvider>
      <div className={styles.app}>
        <Sidebar />
        <Map />
      </div>
    </CityProvider>
  );
}

export default AppLayout;
