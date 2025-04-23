import { useState, useEffect } from "react";
import "./ProgressBar.css";
import Swal from "sweetalert2";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((count) => Math.min(count + 1, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (progress === 100 && !alertShown) {
      Swal.fire({
        title: "Complete",
        text: "Progress is complete!",
        icon: "success",
      });
      setAlertShown(true);
    }
  }, [progress, alertShown]);

  return (
    <div className="progress-wrapper">
      <div className="container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
      <p className="progress-text">
        {progress < 100 ? "Loading... " : "Complete"}
      </p>
    </div>
  );
}
