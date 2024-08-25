import React, { useEffect, useState } from "react";
import DeliciousComponent from "./Delicious";
import "./app.scss";

function App() {
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    // create Web Worker
    const worker = new Worker(new URL("./utils/worker.js", import.meta.url));
    // listen Web Worker infomation
    worker.onmessage = function (e) {
      console.log(e.data);
      if (e.data.error) {
        console.error("Worker Error:", e.data.error);
      } else {
        setLoading(false);
      }
    };
    // send URL to Web Worker
    worker.postMessage("http://localhost:3001/csv");
    // clear worker
    return () => {
      worker.terminate();
    };
  }, []);
  return (
    <div className="container">
      {Loading ? <p>local database loading...</p> : <DeliciousComponent />}
    </div>
  );
}

export default App;
