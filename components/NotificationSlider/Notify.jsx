import { FaRegCheckCircle } from "react-icons/fa";
import "./Notify.css";

const Notify = ({ message, isVisible }) => {
  return (
    <div className={`notification-sider ${isVisible ? "visible" : ""}`}>
      <div className="flex items-center justify-center gap-1">
        <FaRegCheckCircle className="text-green-600" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notify;
