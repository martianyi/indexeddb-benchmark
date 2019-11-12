import { openDB, deleteDB, wrap, unwrap } from "idb";

function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", e => {
      resolve(reader.result);
    });
    reader.addEventListener("error", reject);
    reader.readAsArrayBuffer(blob);
  });
}

function sleep(time) {
  return new Promise(resolve => setTimeout(() => resolve(), time));
}

(async () => {
  const dbName = "indexedb_benchmark";
  const storeName = "store0";
  const version = 1; //versions start at 1

  const db = await openDB(dbName, version, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const store = db.createObjectStore(storeName, {
        // The 'id' property of the object will be the key.
        keyPath: "id",
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true
      });
    }
  });

  const resp = await fetch("/temp_96m_file");
  const blob = await resp.blob();
  const arrBuffer = await blobToArrayBuffer(blob);
  console.time("write");
  const tx = db.transaction(storeName, "readwrite");
  for (let i = 0; i < 10; i++) {
    tx.store.add({
      data: arrBuffer,
      createdAt: Date.now()
    });
  }
  await tx.done;
  console.timeEnd("write");
})().catch(e => console.log(e));
