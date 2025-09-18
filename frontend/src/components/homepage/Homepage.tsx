import Sidebar from "../sidebar/sidebar";
import s from "./homepage.module.scss";

const homepage = () => {
  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__sidebar-container"]}>
        <Sidebar />
      </div>
      <div className={s["main-container__home"]}>
        <div>Benvenuto/a!</div>
      </div>
    </div>
  );
};

export default homepage;
