import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar></Sidebar>
      <Map></Map>
    </div>
  );
}

export default AppLayout;
