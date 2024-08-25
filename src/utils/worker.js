// worker.js
self.onmessage = async function (e) {
  const url = e.data;
  try {
    const request = indexedDB.open("MyDatabase", 1);
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("MyDataStore")) {
        db.createObjectStore("MyDataStore", {
          keyPath: "id",
          autoIncrement: true,
        });
      } else {
        self.postMessage({
          message: "Data already exists, skipping storage",
        });
      }
    };
    request.onsuccess = async function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["MyDataStore"], "readonly");
      const objectStore = transaction.objectStore("MyDataStore");

      const countRequest = objectStore.count();
      countRequest.onsuccess = async function () {
        if (countRequest.result === 0) {
          const response = await fetch(url);
          const data = await response.json();

          const transaction = db.transaction(["MyDataStore"], "readwrite");
          const objectStore = transaction.objectStore("MyDataStore");
          data.forEach((item) => objectStore.add(item));
          transaction.oncomplete = function () {
            self.postMessage({ message: "Data stored" });
          };
        } else {
          self.postMessage({
            message: "Data already exists, skipping storage",
          });
        }
      };
    };

    request.onerror = function (event) {
      self.postMessage({ error: "Error opening IndexedDB" });
    };
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
