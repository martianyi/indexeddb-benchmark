/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/idb/build/esm/chunk.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/chunk.js ***!
  \*********************************************/
/*! exports provided: a, b, c, d, e */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return wrap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return addTraps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return instanceOfAny; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return reverseTransformCache; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"e\", function() { return unwrap; });\nconst instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);\n\nlet idbProxyableTypes;\r\nlet cursorAdvanceMethods;\r\n// This is a function to prevent it throwing up in node environments.\r\nfunction getIdbProxyableTypes() {\r\n    return (idbProxyableTypes ||\r\n        (idbProxyableTypes = [\r\n            IDBDatabase,\r\n            IDBObjectStore,\r\n            IDBIndex,\r\n            IDBCursor,\r\n            IDBTransaction,\r\n        ]));\r\n}\r\n// This is a function to prevent it throwing up in node environments.\r\nfunction getCursorAdvanceMethods() {\r\n    return (cursorAdvanceMethods ||\r\n        (cursorAdvanceMethods = [\r\n            IDBCursor.prototype.advance,\r\n            IDBCursor.prototype.continue,\r\n            IDBCursor.prototype.continuePrimaryKey,\r\n        ]));\r\n}\r\nconst cursorRequestMap = new WeakMap();\r\nconst transactionDoneMap = new WeakMap();\r\nconst transactionStoreNamesMap = new WeakMap();\r\nconst transformCache = new WeakMap();\r\nconst reverseTransformCache = new WeakMap();\r\nfunction promisifyRequest(request) {\r\n    const promise = new Promise((resolve, reject) => {\r\n        const unlisten = () => {\r\n            request.removeEventListener('success', success);\r\n            request.removeEventListener('error', error);\r\n        };\r\n        const success = () => {\r\n            resolve(wrap(request.result));\r\n            unlisten();\r\n        };\r\n        const error = () => {\r\n            reject(request.error);\r\n            unlisten();\r\n        };\r\n        request.addEventListener('success', success);\r\n        request.addEventListener('error', error);\r\n    });\r\n    promise\r\n        .then(value => {\r\n        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval\r\n        // (see wrapFunction).\r\n        if (value instanceof IDBCursor) {\r\n            cursorRequestMap.set(value, request);\r\n        }\r\n        // Catching to avoid \"Uncaught Promise exceptions\"\r\n    })\r\n        .catch(() => { });\r\n    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This\r\n    // is because we create many promises from a single IDBRequest.\r\n    reverseTransformCache.set(promise, request);\r\n    return promise;\r\n}\r\nfunction cacheDonePromiseForTransaction(tx) {\r\n    // Early bail if we've already created a done promise for this transaction.\r\n    if (transactionDoneMap.has(tx))\r\n        return;\r\n    const done = new Promise((resolve, reject) => {\r\n        const unlisten = () => {\r\n            tx.removeEventListener('complete', complete);\r\n            tx.removeEventListener('error', error);\r\n            tx.removeEventListener('abort', error);\r\n        };\r\n        const complete = () => {\r\n            resolve();\r\n            unlisten();\r\n        };\r\n        const error = () => {\r\n            reject(tx.error);\r\n            unlisten();\r\n        };\r\n        tx.addEventListener('complete', complete);\r\n        tx.addEventListener('error', error);\r\n        tx.addEventListener('abort', error);\r\n    });\r\n    // Cache it for later retrieval.\r\n    transactionDoneMap.set(tx, done);\r\n}\r\nlet idbProxyTraps = {\r\n    get(target, prop, receiver) {\r\n        if (target instanceof IDBTransaction) {\r\n            // Special handling for transaction.done.\r\n            if (prop === 'done')\r\n                return transactionDoneMap.get(target);\r\n            // Polyfill for objectStoreNames because of Edge.\r\n            if (prop === 'objectStoreNames') {\r\n                return target.objectStoreNames || transactionStoreNamesMap.get(target);\r\n            }\r\n            // Make tx.store return the only store in the transaction, or undefined if there are many.\r\n            if (prop === 'store') {\r\n                return receiver.objectStoreNames[1]\r\n                    ? undefined\r\n                    : receiver.objectStore(receiver.objectStoreNames[0]);\r\n            }\r\n        }\r\n        // Else transform whatever we get back.\r\n        return wrap(target[prop]);\r\n    },\r\n    has(target, prop) {\r\n        if (target instanceof IDBTransaction &&\r\n            (prop === 'done' || prop === 'store')) {\r\n            return true;\r\n        }\r\n        return prop in target;\r\n    },\r\n};\r\nfunction addTraps(callback) {\r\n    idbProxyTraps = callback(idbProxyTraps);\r\n}\r\nfunction wrapFunction(func) {\r\n    // Due to expected object equality (which is enforced by the caching in `wrap`), we\r\n    // only create one new func per func.\r\n    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.\r\n    if (func === IDBDatabase.prototype.transaction &&\r\n        !('objectStoreNames' in IDBTransaction.prototype)) {\r\n        return function (storeNames, ...args) {\r\n            const tx = func.call(unwrap(this), storeNames, ...args);\r\n            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);\r\n            return wrap(tx);\r\n        };\r\n    }\r\n    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In\r\n    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the\r\n    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense\r\n    // with real promises, so each advance methods returns a new promise for the cursor object, or\r\n    // undefined if the end of the cursor has been reached.\r\n    if (getCursorAdvanceMethods().includes(func)) {\r\n        return function (...args) {\r\n            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use\r\n            // the original object.\r\n            func.apply(unwrap(this), args);\r\n            return wrap(cursorRequestMap.get(this));\r\n        };\r\n    }\r\n    return function (...args) {\r\n        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use\r\n        // the original object.\r\n        return wrap(func.apply(unwrap(this), args));\r\n    };\r\n}\r\nfunction transformCachableValue(value) {\r\n    if (typeof value === 'function')\r\n        return wrapFunction(value);\r\n    // This doesn't return, it just creates a 'done' promise for the transaction,\r\n    // which is later returned for transaction.done (see idbObjectHandler).\r\n    if (value instanceof IDBTransaction)\r\n        cacheDonePromiseForTransaction(value);\r\n    if (instanceOfAny(value, getIdbProxyableTypes()))\r\n        return new Proxy(value, idbProxyTraps);\r\n    // Return the same value back if we're not going to transform it.\r\n    return value;\r\n}\r\nfunction wrap(value) {\r\n    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because\r\n    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.\r\n    if (value instanceof IDBRequest)\r\n        return promisifyRequest(value);\r\n    // If we've already transformed this value before, reuse the transformed value.\r\n    // This is faster, but it also provides object equality.\r\n    if (transformCache.has(value))\r\n        return transformCache.get(value);\r\n    const newValue = transformCachableValue(value);\r\n    // Not all types are transformed.\r\n    // These may be primitive types, so they can't be WeakMap keys.\r\n    if (newValue !== value) {\r\n        transformCache.set(value, newValue);\r\n        reverseTransformCache.set(newValue, value);\r\n    }\r\n    return newValue;\r\n}\r\nconst unwrap = (value) => reverseTransformCache.get(value);\n\n\n\n\n//# sourceURL=webpack:///./node_modules/idb/build/esm/chunk.js?");

/***/ }),

/***/ "./node_modules/idb/build/esm/index.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/index.js ***!
  \*********************************************/
/*! exports provided: unwrap, wrap, openDB, deleteDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"openDB\", function() { return openDB; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteDB\", function() { return deleteDB; });\n/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk.js */ \"./node_modules/idb/build/esm/chunk.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unwrap\", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"e\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"wrap\", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"a\"]; });\n\n\n\n\n/**\r\n * Open a database.\r\n *\r\n * @param name Name of the database.\r\n * @param version Schema version.\r\n * @param callbacks Additional callbacks.\r\n */\r\nfunction openDB(name, version, { blocked, upgrade, blocking } = {}) {\r\n    const request = indexedDB.open(name, version);\r\n    const openPromise = Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"a\"])(request);\r\n    if (upgrade) {\r\n        request.addEventListener('upgradeneeded', event => {\r\n            upgrade(Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"a\"])(request.result), event.oldVersion, event.newVersion, Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"a\"])(request.transaction));\r\n        });\r\n    }\r\n    if (blocked)\r\n        request.addEventListener('blocked', () => blocked());\r\n    if (blocking) {\r\n        openPromise.then(db => db.addEventListener('versionchange', blocking)).catch(() => { });\r\n    }\r\n    return openPromise;\r\n}\r\n/**\r\n * Delete a database.\r\n *\r\n * @param name Name of the database.\r\n */\r\nfunction deleteDB(name, { blocked } = {}) {\r\n    const request = indexedDB.deleteDatabase(name);\r\n    if (blocked)\r\n        request.addEventListener('blocked', () => blocked());\r\n    return Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"a\"])(request).then(() => undefined);\r\n}\n\nconst readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];\r\nconst writeMethods = ['put', 'add', 'delete', 'clear'];\r\nconst cachedMethods = new Map();\r\nfunction getMethod(target, prop) {\r\n    if (!(target instanceof IDBDatabase &&\r\n        !(prop in target) &&\r\n        typeof prop === 'string')) {\r\n        return;\r\n    }\r\n    if (cachedMethods.get(prop))\r\n        return cachedMethods.get(prop);\r\n    const targetFuncName = prop.replace(/FromIndex$/, '');\r\n    const useIndex = prop !== targetFuncName;\r\n    const isWrite = writeMethods.includes(targetFuncName);\r\n    if (\r\n    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.\r\n    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||\r\n        !(isWrite || readMethods.includes(targetFuncName))) {\r\n        return;\r\n    }\r\n    const method = async function (storeName, ...args) {\r\n        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(\r\n        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');\r\n        let target = tx.store;\r\n        if (useIndex)\r\n            target = target.index(args.shift());\r\n        const returnVal = target[targetFuncName](...args);\r\n        if (isWrite)\r\n            await tx.done;\r\n        return returnVal;\r\n    };\r\n    cachedMethods.set(prop, method);\r\n    return method;\r\n}\r\nObject(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"b\"])(oldTraps => ({\r\n    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),\r\n    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),\r\n}));\n\n\n\n\n//# sourceURL=webpack:///./node_modules/idb/build/esm/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb */ \"./node_modules/idb/build/esm/index.js\");\n\n\nfunction arrayBufferToBlob(buffer, type) {\n  return new Blob([buffer], { type: type });\n}\n\nfunction blobToArrayBuffer(blob) {\n  return new Promise((resolve, reject) => {\n    const reader = new FileReader();\n    reader.addEventListener(\"loadend\", e => {\n      resolve(reader.result);\n    });\n    reader.addEventListener(\"error\", reject);\n    reader.readAsArrayBuffer(blob);\n  });\n}\n\nfunction sleep(time) {\n  return new Promise(resolve => setTimeout(() => resolve(), time));\n}\n\n(async () => {\n  const dbName = \"indexedb_benchmark\";\n  const storeName = \"store0\";\n  const version = 1; //versions start at 1\n\n  const db = await Object(idb__WEBPACK_IMPORTED_MODULE_0__[\"openDB\"])(dbName, version, {\n    upgrade(db, oldVersion, newVersion, transaction) {\n      const store = db.createObjectStore(storeName, {\n        // The 'id' property of the object will be the key.\n        keyPath: \"id\",\n        // If it isn't explicitly set, create a value by auto incrementing.\n        autoIncrement: true\n      });\n    }\n  });\n\n  const data = [];\n  // looping for 1000000\n  for (let n = 0; n < 1000000; n++) {\n    // creating object here\n    var obj = {\n      name: \"name_\" + n,\n      family: \"family_\" + n,\n      age: \"age_\" + n,\n      address: \"address_\" + n\n    };\n\n    // pushing each object here in array\n    data.push(obj);\n  }\n\n  //var html = sb.join('');\n  //document.body.innerHTML = html;\n  const type = \"application/json\";\n  let blob = new Blob([JSON.stringify(data)], { type: \"application/json\" });\n\n  const arrBuffer = await blobToArrayBuffer(blob);\n  console.time(\"large file write test\");\n  const tx = db.transaction(storeName, \"readwrite\");\n  for (let i = 0; i < 10; i++) {}\n  tx.store.add({\n    data: arrBuffer,\n    type: type,\n    createdAt: Date.now()\n  });\n  await tx.done;\n  console.timeEnd(\"large file write test\");\n\n  // console.time(\"large file read test\");\n  // const tx2 = db.transaction(storeName, \"readwrite\");\n  // const keys = await tx2.store.getAllKeys();\n  // keys.forEach(async key => {\n  //   const item = await tx2.store.get(key);\n  //   const blob = arrayBufferToBlob(item.data, item.type);\n  //   const fr = new FileReader();\n\n  //   fr.onload = function() {\n  //     console.log(JSON.parse(this.result));\n  //   };\n  //   fr.readAsText(blob);\n  // });\n  // await tx2.done;\n  // console.timeEnd(\"large file read test\");\n})();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });