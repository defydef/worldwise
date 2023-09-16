import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import { CityProvider } from "../context/CityContext";
import { useAuth } from "../context/FakeAuthContext";
import User from "../components/User";
import Login from "./Login";

function AppLayout() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <CityProvider>
      <div className={styles.app}>
        <User />
        <Sidebar />
        <Map />
      </div>
    </CityProvider>
  ) : (
    <Login />
  );
}

export default AppLayout;
