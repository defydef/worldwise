import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import { CityProvider } from "../context/CityContext";
import User from "../components/User";

function AppLayout() {
  return (
    <CityProvider>
      <div className={styles.app}>
        <User />
        <Sidebar />
        <Map />
      </div>
    </CityProvider>
  );
}

export default AppLayout;
