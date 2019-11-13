import { openDB, deleteDB, wrap, unwrap } from "idb";

function arrayBufferToBlob(buffer, type) {
  return new Blob([buffer], { type: type });
}

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
  const version = 1;

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

  // generate large json data, about 96MB
  const data = [];
  for (let n = 0; n < 1000000; n++) {
    const obj = {
      name: "name_" + n,
      family: "family_" + n,
      age: "age_" + n,
      address: "address_" + n
    };
    data.push(obj);
  }

  const type = "application/json";
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const arrBuffer = await blobToArrayBuffer(blob);

  console.time("large file write test");
  const tx = db.transaction(storeName, "readwrite");
  for (let i = 0; i < 20; i++) {
    tx.store.add({
      data: arrBuffer,
      type: type,
      createdAt: Date.now()
    });
  }
  await tx.done;
  console.timeEnd("large file write test");

  // console.time("large file read test");
  // const tx2 = db.transaction(storeName, "readwrite");
  // const keys = await tx2.store.getAllKeys();
  // keys.forEach(async key => {
  //   const item = await tx2.store.get(key);
  //   const blob = arrayBufferToBlob(item.data, item.type);
  //   const reader = new FileReader();
  //   reader.onload = function() {
  //     console.log(JSON.parse(this.result));
  //   };
  //   reader.readAsText(blob);
  // });
  // await tx2.done;
  // console.timeEnd("large file read test");
})();
