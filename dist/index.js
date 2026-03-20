// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"3VwnP":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"8lqZg":[function(require,module,exports,__globalThis) {
var _initJs = require("./app/init.js");
window.Webflow ||= [];
window.Webflow.push(()=>{
    (0, _initJs.init)();
});

},{"./app/init.js":"hhKvX"}],"hhKvX":[function(require,module,exports,__globalThis) {
// src/app/init.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "init", ()=>init);
var _keyboardNavigationJs = require("./keyboardNavigation.js");
var _uiJs = require("./ui.js");
var _pluginsJs = require("./plugins.js");
var _syncJs = require("./sync.js");
var _eventsJs = require("./events.js");
var _stateJs = require("./state.js");
function init() {
    // Chart.js plugins (CDN globals)
    if (window.ChartDataLabels) Chart.register(ChartDataLabels);
    (0, _keyboardNavigationJs.KeyboardNavigation).init();
    (0, _uiJs.UI).syncChartTypeButtonsUI();
    (0, _uiJs.UI).syncActiveGroup("template", (0, _stateJs.State).templateId);
    (0, _pluginsJs.registerAnnotationPlugin)();
    (0, _syncJs.syncAndRender)();
    (0, _eventsJs.Events).init();
}

},{"./keyboardNavigation.js":"dkTNu","./ui.js":"25UgT","./plugins.js":"7FuiU","./sync.js":"d4J8u","./events.js":"Dz5Fa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./state.js":"eTxS5"}],"dkTNu":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "KeyboardNavigation", ()=>KeyboardNavigation);
var _domJs = require("./dom.js");
const KeyboardNavigation = {
    init () {
        (0, _domJs.DOM).table.addEventListener("keydown", (e)=>{
            const target = e.target;
            if (!(target instanceof HTMLInputElement)) return;
            const isScore = target.matches('input[data-role="score"]');
            const isItem = target.matches('input[data-role="item"]');
            if (!isScore && !isItem) return;
            const key = e.key;
            if ([
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                "Enter"
            ].includes(key)) {
                e.preventDefault();
                this.move(target, key, e.shiftKey);
            }
        });
    },
    move (input, key, shift) {
        const row = input.closest('.chart-row.is-data[data-row-type="data"]');
        if (!row) return;
        const body = (0, _domJs.DOM).table.querySelector(".chart-table_body");
        const rows = Array.from(body.querySelectorAll('.chart-row.is-data[data-row-type="data"]'));
        const currentRowIndex = rows.indexOf(row);
        const cells = Array.from(row.querySelectorAll("input[data-role]"));
        const currentCellIndex = cells.indexOf(input);
        let nextRowIndex = currentRowIndex;
        let nextCellIndex = currentCellIndex;
        switch(key){
            case "ArrowRight":
                nextCellIndex++;
                break;
            case "ArrowLeft":
                nextCellIndex--;
                break;
            case "ArrowDown":
                nextRowIndex++;
                break;
            case "ArrowUp":
                nextRowIndex--;
                break;
            case "Enter":
                nextRowIndex += shift ? -1 : 1;
                break;
        }
        const nextRow = rows[nextRowIndex];
        if (!nextRow) return;
        const nextInputs = Array.from(nextRow.querySelectorAll("input[data-role]"));
        const nextInput = nextInputs[nextCellIndex];
        if (nextInput) {
            nextInput.focus();
            nextInput.select?.();
        }
    }
};

},{"./dom.js":"hdBoh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hdBoh":[function(require,module,exports,__globalThis) {
// src/app/dom.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DOM", ()=>DOM);
const DOM = {
    get table () {
        return document.querySelector(".chart-table");
    },
    get settingsPanel () {
        return document.querySelector('[data-ui="settings-panel"]');
    },
    get canvas () {
        return document.querySelector("#chart-canvas");
    },
    get chartTitle () {
        return document.querySelector('[data-ui="chart-title"]');
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"25UgT":[function(require,module,exports,__globalThis) {
// src/app/ui.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UI", ()=>UI);
var _domJs = require("./dom.js");
var _stateJs = require("./state.js");
const UI = {
    toggleRespondentPickersDisabled (enabled) {
        const headerRow = (0, _domJs.DOM).table?.querySelector('.chart-row.is-header[data-row-type="head"]');
        if (!headerRow) return;
        const pickers = headerRow.querySelectorAll(".color-input-wrap");
        pickers.forEach((picker)=>{
            const input = picker.querySelector('input[data-role="respondent-color"]');
            const current = picker.querySelector(".color-current");
            const swatches = picker.querySelectorAll(".color-swatch");
            if (input) input.disabled = enabled;
            // classe utilitaire pour ton CSS Webflow si tu veux
            picker.classList.toggle("is-disabled", enabled);
            if (current) {
                current.style.opacity = enabled ? "0.5" : "";
                current.style.cursor = enabled ? "not-allowed" : "";
            }
            swatches.forEach((swatch)=>{
                swatch.style.opacity = enabled ? "0.5" : "";
                swatch.style.cursor = enabled ? "not-allowed" : "pointer";
            });
        });
    },
    syncRespondentColorPickers () {
        const headerRow = (0, _domJs.DOM).table?.querySelector('.chart-row.is-header[data-row-type="head"]');
        if (!headerRow) return;
        const pickers = headerRow.querySelectorAll(".color-input-wrap");
        pickers.forEach((picker)=>{
            const input = picker.querySelector('input[data-role="respondent-color"]');
            const current = picker.querySelector(".color-current");
            if (!input || !current) return;
            current.style.backgroundColor = input.value || "#000000";
        });
    },
    syncAllColorPickers (scope = document) {
        scope.querySelectorAll(".color-input-wrap").forEach((picker)=>{
            const input = picker.querySelector('input[data-role$="-color"], input[data-setting$="-color"]');
            const current = picker.querySelector(".color-current");
            if (!input || !current) return;
            current.style.backgroundColor = input.value || "#000000";
        });
    },
    syncChartTypeButtonsUI () {
        const buttons = (0, _domJs.DOM).settingsPanel.querySelectorAll('.chart-type-button[data-action="set-chart-type"]');
        buttons.forEach((btn)=>{
            const type = btn.getAttribute("data-chart-type");
            const isActive = type === (0, _stateJs.State).chartType;
            btn.classList.toggle("is-active", isActive);
            btn.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
    },
    syncActiveGroup (group, activeValue) {
        const els = (0, _domJs.DOM).settingsPanel.querySelectorAll(`[data-ui-group="${group}"]`);
        els.forEach((el)=>{
            const v = el.getAttribute("data-ui-value");
            const isActive = v === activeValue;
            el.classList.toggle("is-active", isActive);
            el.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
    }
};

},{"./dom.js":"hdBoh","./state.js":"eTxS5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eTxS5":[function(require,module,exports,__globalThis) {
// src/app/state.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "State", ()=>State);
const State = {
    // data
    respondents: [],
    rows: [],
    drawings: [],
    // settings
    chartType: "bar-vertical",
    templateId: null,
    scale: {
        auto: true,
        step: null,
        min: null,
        max: null
    },
    text: {
        showLegend: true,
        showTitle: false,
        showX: true,
        showY: true,
        showValues: false,
        title: ""
    },
    colors: {
        enabled: false,
        scheme: "calm"
    },
    layout: {
        mode: "standard"
    },
    // runtime
    chart: null
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7FuiU":[function(require,module,exports,__globalThis) {
// src/app/layout.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "registerAnnotationPlugin", ()=>registerAnnotationPlugin);
function registerAnnotationPlugin() {
    const plugins = Chart.registry?.plugins?.items;
    if (!plugins) {
        console.warn("[ChartApp] Chart registry not available.");
        return false;
    }
    // Si déjà enregistré, on ne fait rien
    if (plugins.annotation) return true;
    // Si le plugin existe globalement, on l'enregistre
    if (window.ChartAnnotation) {
        Chart.register(window.ChartAnnotation);
        return true;
    }
    console.warn("[ChartApp] Annotation plugin not found. Check script order/URL.");
    return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d4J8u":[function(require,module,exports,__globalThis) {
// src/app/sync.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "syncAndRender", ()=>syncAndRender);
var _stateJs = require("./state.js");
var _readersJs = require("./readers.js");
var _chartRendererJs = require("./chartRenderer.js");
var _uiJs = require("./ui.js");
var _drawingsJs = require("./drawings.js");
var _gridJs = require("./grid.js");
var _layoutJs = require("./layout.js");
var _domJs = require("./dom.js");
function syncAndRender() {
    (0, _stateJs.State).respondents = (0, _readersJs.Readers).readRespondentsFromHeader();
    (0, _stateJs.State).rows = (0, _readersJs.Readers).readRowsFromBody((0, _stateJs.State).respondents);
    (0, _stateJs.State).drawings = (0, _readersJs.Readers).readDrawings();
    const settings = (0, _readersJs.Readers).readSettings();
    console.log("settings.layout", settings.layout);
    console.log("checked radio", document.querySelector('[data-setting="layout-density"]:checked')?.value);
    (0, _stateJs.State).scale = settings.scale;
    (0, _stateJs.State).text = settings.text;
    if (settings.colors && typeof settings.colors === "object") (0, _stateJs.State).colors = settings.colors;
    if ((0, _domJs.DOM).chartTitle) {
        (0, _domJs.DOM).chartTitle.textContent = (0, _stateJs.State).text.title || "R\xe9sultats";
        (0, _domJs.DOM).chartTitle.style.display = (0, _stateJs.State).text.showTitle ? "" : "none";
    }
    (0, _stateJs.State).layout = settings.layout || (0, _stateJs.State).layout || {
        mode: "standard"
    };
    (0, _layoutJs.Layout).applyChartLayoutMode();
    (0, _uiJs.UI).toggleRespondentPickersDisabled((0, _stateJs.State).colors?.enabled);
    (0, _uiJs.UI).syncAllColorPickers();
    (0, _uiJs.UI).syncRespondentColorPickers();
    (0, _drawingsJs.applyDrawingRowVisibility)();
    (0, _gridJs.applyGridColumns)();
    (0, _chartRendererJs.ChartRenderer).render();
}

},{"./state.js":"eTxS5","./readers.js":"10h2b","./chartRenderer.js":"9eLeu","./ui.js":"25UgT","./drawings.js":"8eWms","./grid.js":"alXmK","./layout.js":"kkJAL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./dom.js":"hdBoh"}],"10h2b":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Readers", ()=>Readers);
var _domJs = require("./dom.js");
var _utilsJs = require("./utils.js");
const Readers = {
    readRespondentsFromHeader () {
        // On lit les cellules du header qui ont data-col="r1", "r2"...
        const headerRow = (0, _domJs.DOM).table.querySelector('.chart-row.is-header[data-row-type="head"]');
        if (!headerRow) return [];
        const respondentCells = (0, _utilsJs.Utils).qsa(headerRow, '.chart-cell[data-col]');
        return respondentCells.map((cell)=>{
            const colId = cell.getAttribute("data-col");
            const nameInput = cell.querySelector('input[data-role="respondent"]');
            const colorInput = cell.querySelector('input[data-role="respondent-color"]');
            return {
                colId,
                name: nameInput ? nameInput.value.trim() : colId,
                color: colorInput ? colorInput.value : "#000000"
            };
        });
    },
    readRowsFromBody (respondents) {
        const body = (0, _domJs.DOM).table.querySelector(".chart-table_body");
        if (!body) return [];
        const dataRows = (0, _utilsJs.Utils).qsa(body, '.chart-row.is-data[data-row-type="data"]');
        return dataRows.map((rowEl)=>{
            const id = rowEl.getAttribute("data-row-id") || (0, _utilsJs.Utils).uid("row");
            const itemInput = rowEl.querySelector('input[data-role="item"]');
            const item = itemInput ? itemInput.value.trim() : "";
            const scores = {};
            respondents.forEach((r)=>{
                const scoreCell = rowEl.querySelector(`.chart-cell[data-col="${r.colId}"]`);
                const scoreInput = scoreCell ? scoreCell.querySelector('input[data-role="score"]') : null;
                // NOTE: si vide, on garde 0 (tu pourras changer la logique plus tard)
                const value = scoreInput ? (0, _utilsJs.Utils).toNumber(scoreInput.value, 0) : 0;
                scores[r.colId] = value;
            });
            return {
                id,
                item,
                scores
            };
        });
    },
    readSettings () {
        const panel = (0, _domJs.DOM).settingsPanel;
        // chart type: bouton actif via click (on le stocke dans State)
        // Ici on lit juste la value actuelle dans State, mais on peut aussi
        // détecter un bouton "active" si tu as une classe.
        const scaleAuto = panel.querySelector('[data-setting="scale-auto"]');
        const step = panel.querySelector('[data-setting="step"]');
        const min = panel.querySelector('[data-setting="scale-min"]');
        const max = panel.querySelector('[data-setting="scale-max"]');
        const showLegend = panel.querySelector('[data-setting="show-legend"]');
        const showTitle = panel.querySelector('[data-setting="show-title"]');
        const showX = panel.querySelector('[data-setting="show-x"]');
        const showY = panel.querySelector('[data-setting="show-y"]');
        const showValues = panel.querySelector('[data-setting="show-values"]');
        const colorsEnabled = panel.querySelector('[data-setting="colors-enabled"]');
        const colorScheme = panel.querySelector('[data-setting="color-scheme"]');
        //const colorScheme = panel.querySelector('[data-setting="color-scheme"]:checked');
        const density = panel.querySelector('[data-setting="layout-density"]:checked');
        const chartTitle = panel.querySelector('[data-setting="chart-title"]');
        return {
            scale: {
                auto: scaleAuto ? !!scaleAuto.checked : true,
                step: step && step.value !== "" ? (0, _utilsJs.Utils).toNumber(step.value, null) : null,
                min: min && min.value !== "" ? (0, _utilsJs.Utils).toNumber(min.value, null) : null,
                max: max && max.value !== "" ? (0, _utilsJs.Utils).toNumber(max.value, null) : null
            },
            text: {
                showLegend: showLegend ? !!showLegend.checked : true,
                showTitle: showTitle ? !!showTitle.checked : false,
                showX: showX ? !!showX.checked : true,
                showY: showY ? !!showY.checked : true,
                title: chartTitle ? chartTitle.value.trim() : "",
                showValues: showValues ? !!showValues.checked : true
            },
            colors: {
                enabled: colorsEnabled ? !!colorsEnabled.checked : false,
                scheme: colorScheme ? colorScheme.value : "calm"
            },
            layout: {
                mode: density ? density.value : "standard"
            }
        };
    },
    readDrawings () {
        const rows = Array.from((0, _domJs.DOM).settingsPanel.querySelectorAll(".param-row[data-drawing-id]"));
        return rows.map((row)=>{
            const id = row.getAttribute("data-drawing-id");
            const type = row.querySelector('[data-setting="draw-type"]')?.value || "line";
            // champs zone
            const zoneMin = row.querySelector('[data-setting="zone-min"]')?.value ?? "";
            const zoneMax = row.querySelector('[data-setting="zone-max"]')?.value ?? "";
            // champs couleur pour lignes et zones
            const zoneColor = row.querySelector('[data-setting="zone-color"]')?.value || null;
            const lineColor = row.querySelector('[data-setting="line-color"]')?.value || null;
            // champs line
            const lineStyle = row.querySelector('[data-setting="line-style"]')?.value || "solid";
            const lineValue = row.querySelector('[data-setting="line-value"]')?.value ?? "";
            return {
                id,
                type,
                zone: {
                    min: zoneMin === "" ? null : (0, _utilsJs.Utils).toNumber(zoneMin, null),
                    max: zoneMax === "" ? null : (0, _utilsJs.Utils).toNumber(zoneMax, null),
                    color: zoneColor
                },
                line: {
                    style: lineStyle,
                    value: lineValue === "" ? null : (0, _utilsJs.Utils).toNumber(lineValue, null),
                    color: lineColor
                }
            };
        });
    }
};

},{"./dom.js":"hdBoh","./utils.js":"7YfrD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7YfrD":[function(require,module,exports,__globalThis) {
// src/app/utils.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Utils", ()=>Utils);
const Utils = {
    uid (prefix = "row") {
        return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    },
    toNumber (value, fallback = 0) {
        const n = Number(value);
        return Number.isFinite(n) ? n : fallback;
    },
    clamp (n, min, max) {
        return Math.min(max, Math.max(min, n));
    },
    qs (root, sel) {
        return root.querySelector(sel);
    },
    qsa (root, sel) {
        return Array.from(root.querySelectorAll(sel));
    },
    hexToRgba (hex, alpha = 0.12) {
        if (!hex || typeof hex !== "string") return null;
        const h = hex.replace("#", "").trim();
        if (h.length !== 6) return null;
        const r = parseInt(h.slice(0, 2), 16);
        const g = parseInt(h.slice(2, 4), 16);
        const b = parseInt(h.slice(4, 6), 16);
        if (![
            r,
            g,
            b
        ].every(Number.isFinite)) return null;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9eLeu":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChartRenderer", ()=>ChartRenderer);
var _stateJs = require("./state.js");
var _domJs = require("./dom.js");
var _colorsJs = require("./colors.js");
var _chartMapperJs = require("./ChartMapper.js");
const ChartRenderer = {
    render () {
        const ctx = (0, _domJs.DOM).canvas.getContext("2d");
        const data = (0, _chartMapperJs.ChartMapper).buildChartData();
        const { chartJsType, options } = (0, _chartMapperJs.ChartMapper).getChartJsTypeAndOptions();
        if ((0, _stateJs.State).chart) {
            (0, _stateJs.State).chart.destroy();
            (0, _stateJs.State).chart = null;
        }
        (0, _stateJs.State).chart = new Chart(ctx, {
            type: chartJsType,
            data,
            options
        });
        // ✅ Thème: ré-appliquer après CHAQUE new Chart()
        if ((0, _stateJs.State).colors?.enabled) (0, _colorsJs.Colors).applyScheme((0, _stateJs.State).chart, (0, _stateJs.State).colors.scheme, {
            fillAlpha: 0.18,
            borderWidth: 2,
            update: false
        });
        // ✅ un seul update final
        (0, _stateJs.State).chart.update();
    }
};

},{"./state.js":"eTxS5","./dom.js":"hdBoh","./colors.js":"4IS8c","./ChartMapper.js":"iVe8h","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4IS8c":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Colors", ()=>Colors);
var _utilsJs = require("./utils.js");
const SAULE_SCHEMES = {
    calm: [
        "#2F6B4F",
        "#3D8C6E",
        "#78C2A4",
        "#BFE9D7",
        "#E7F7F1"
    ],
    contrast: [
        "#1F6F8B",
        "#155368",
        "#99C7D6",
        "#6FAFC3",
        "#E6F2F5"
    ],
    neutral: [
        "#111827",
        "#374151",
        "#6B7280",
        "#9CA3AF",
        "#E5E7EB"
    ]
};
const Colors = {
    getScheme (name) {
        return SAULE_SCHEMES[name] || SAULE_SCHEMES.calm;
    },
    applyScheme (chart, schemeName, opts = {}) {
        if (!chart) return;
        const palette = Colors.getScheme(schemeName);
        const fillAlpha = typeof opts.fillAlpha === "number" ? opts.fillAlpha : 0.18;
        const borderWidth = typeof opts.borderWidth === "number" ? opts.borderWidth : 2;
        (chart.data.datasets || []).forEach((ds, i)=>{
            const c = palette[i % palette.length];
            ds.borderColor = c;
            ds.backgroundColor = (0, _utilsJs.Utils).hexToRgba(c, fillAlpha) || c;
            ds.borderWidth = borderWidth;
        });
        if (opts.update !== false) chart.update();
    }
};

},{"./utils.js":"7YfrD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iVe8h":[function(require,module,exports,__globalThis) {
// src/app/chartMapper.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChartMapper", ()=>ChartMapper);
var _utilsJs = require("./utils.js"); // seulement si ChartMapper utilise Utils
var _stateJs = require("./state.js"); // seulement si ChartMapper lit State directement
const ChartMapper = {
    // ----------------------------
    // A) Build Chart.js "data" from State
    // ----------------------------
    buildChartData () {
        const labels = (0, _stateJs.State).rows.map((r)=>r.item || "\u2014");
        const isBar = (0, _stateJs.State).chartType === "bar-vertical" || (0, _stateJs.State).chartType === "bar-horizontal";
        const isCompact = (0, _stateJs.State).layout?.mode === "compact";
        const datasets = (0, _stateJs.State).respondents.map((resp)=>({
                label: resp.name || resp.colId,
                data: (0, _stateJs.State).rows.map((row)=>(0, _utilsJs.Utils).toNumber(row.scores?.[resp.colId], 0)),
                borderColor: resp.color,
                backgroundColor: (0, _utilsJs.Utils).hexToRgba(resp.color, 0.95) || resp.color,
                fill: false,
                tension: 0.25,
                ...isBar ? {
                    categoryPercentage: isCompact ? 0.82 : 0.80,
                    barPercentage: isCompact ? 0.92 : 0.9,
                    maxBarThickness: isCompact ? 65 : 80
                } : {}
            }));
        // ✅ Debug (retire quand c'est stable)
        console.log("[ChartMapper] buildChartData()", {
            labels,
            datasets
        });
        return {
            labels,
            datasets
        };
    },
    // ----------------------------
    // B) Build Chart.js Annotations (plugin) from State.drawings
    // ----------------------------
    buildAnnotations () {
        const annotations = {};
        const isHorizontal = (0, _stateJs.State).chartType === "bar-horizontal";
        const valueAxis = isHorizontal ? "x" : "y";
        const drawings = Array.isArray((0, _stateJs.State).drawings) ? (0, _stateJs.State).drawings : [];
        drawings.forEach((d)=>{
            if (!d?.id) return;
            // ---- LINE
            if (d.type === "line" && d.line?.value !== null) {
                const color = d.line?.color || "rgba(0,0,0,0.6)";
                annotations[d.id] = {
                    type: "line",
                    scaleID: valueAxis,
                    value: d.line.value,
                    borderColor: color,
                    borderWidth: 2,
                    borderDash: d.line.style === "dash" ? [
                        6,
                        6
                    ] : undefined,
                    drawTime: "beforeDatasetsDraw"
                };
            }
            // ---- ZONE
            if (d.type === "zone" && d.zone?.min !== null && d.zone?.max !== null) {
                const color = d.zone.color ? (0, _utilsJs.Utils).hexToRgba(d.zone.color, 0.12) : "rgba(0,0,0,0.08)";
                annotations[d.id] = !isHorizontal ? {
                    type: "box",
                    yMin: d.zone.min,
                    yMax: d.zone.max,
                    backgroundColor: color,
                    borderWidth: 0,
                    drawTime: "beforeDatasetsDraw"
                } : {
                    type: "box",
                    xMin: d.zone.min,
                    xMax: d.zone.max,
                    backgroundColor: color,
                    borderWidth: 0,
                    drawTime: "beforeDatasetsDraw"
                };
            }
        });
        // ✅ Debug (retire quand c'est stable)
        console.log("[ChartMapper] buildAnnotations()", {
            annotations
        });
        return annotations;
    },
    // ----------------------------
    // C) Convert our app chartType + settings -> Chart.js type + options
    // ----------------------------
    getChartJsTypeAndOptions () {
        const isHorizontal = (0, _stateJs.State).chartType === "bar-horizontal";
        const isLine = (0, _stateJs.State).chartType === "line";
        const chartJsType = isLine ? "line" : "bar";
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 10,
                    bottom: 10
                }
            },
            plugins: {
                legend: {
                    display: (0, _stateJs.State).text.showLegend,
                    position: "top",
                    labels: {
                        color: "#334155",
                        font: {
                            size: 13,
                            weight: "500"
                        },
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 20
                    }
                },
                annotation: {
                    annotations: this.buildAnnotations()
                },
                datalabels: {
                    display: !!(0, _stateJs.State).text.showValues,
                    formatter: (v)=>v === 0 ? "" : v,
                    anchor: "end",
                    align: "end",
                    clamp: true
                },
                tooltip: {
                    backgroundColor: "#ffffff",
                    titleColor: "#0f172a",
                    bodyColor: "#334155",
                    borderColor: "#e2e8f0",
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                x: {
                    display: (0, _stateJs.State).text.showX,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "#64748b",
                        font: {
                            size: 12
                        }
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    display: (0, _stateJs.State).text.showY,
                    beginAtZero: true,
                    grid: {
                        color: "#e2e8f0",
                        drawBorder: false
                    },
                    ticks: {
                        color: "#64748b",
                        font: {
                            size: 12
                        },
                        stepSize: 10
                    },
                    border: {
                        display: false
                    }
                }
            },
            elements: {
                bar: {
                    borderRadius: 6
                },
                line: {
                    tension: 0.4,
                    borderWidth: 2
                },
                point: {
                    radius: 4,
                    hoverRadius: 6,
                    borderWidth: 2
                }
            }
        };
        // Bar horizontal (Chart.js) = indexAxis: 'y'
        if (!isLine) options.indexAxis = isHorizontal ? "y" : "x";
        // Scale logique: si auto ON => on n’impose rien
        if (!(0, _stateJs.State).scale.auto) {
            const targetAxis = isHorizontal ? "x" : "y"; // l’axe des valeurs
            const axis = options.scales[targetAxis];
            if ((0, _stateJs.State).scale.min !== null) axis.min = (0, _stateJs.State).scale.min;
            if ((0, _stateJs.State).scale.max !== null) axis.max = (0, _stateJs.State).scale.max;
            if ((0, _stateJs.State).scale.step !== null) {
                axis.ticks = axis.ticks || {};
                axis.ticks.stepSize = (0, _stateJs.State).scale.step;
            }
        }
        // ✅ Debug (retire quand c'est stable)
        console.log("[ChartMapper] getChartJsTypeAndOptions()", {
            chartJsType,
            options
        });
        return {
            chartJsType,
            options
        };
    }
};

},{"./utils.js":"7YfrD","./state.js":"eTxS5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8eWms":[function(require,module,exports,__globalThis) {
// src/app/drawings.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyDrawingRowVisibility", ()=>applyDrawingRowVisibility);
var _domJs = require("./dom.js");
function applyDrawingRowVisibility() {
    const rows = (0, _domJs.DOM).settingsPanel?.querySelectorAll(".param-row[data-drawing-id]");
    if (!rows) return;
    rows.forEach((row)=>{
        const typeSelect = row.querySelector('[data-setting="draw-type"]');
        const type = typeSelect ? typeSelect.value : "line";
        const zoneGroup = row.querySelector('[data-drawing-group="zone"]');
        const lineGroup = row.querySelector('[data-drawing-group="line"]');
        if (zoneGroup) zoneGroup.style.display = type === "zone" ? "" : "none";
        if (lineGroup) lineGroup.style.display = type === "line" ? "" : "none";
    });
}

},{"./dom.js":"hdBoh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"alXmK":[function(require,module,exports,__globalThis) {
// src/app/grid.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyGridColumns", ()=>applyGridColumns);
var _domJs = require("./dom.js");
function applyGridColumns() {
    // ✅ Prend le premier header VISIBLE
    const headers = Array.from(document.querySelectorAll(".chart-row.is-header"));
    const header = headers.find((h)=>h.offsetParent !== null) || headers[0];
    const table = header?.closest(".chart-table");
    const count = header ? header.querySelectorAll('[data-role="respondent"]').length : 0;
    const safe = Math.max(1, count);
    // Applique partout (robuste)
    table?.style.setProperty("--respondent-cols", String(safe));
    header?.style.setProperty("--respondent-cols", String(safe));
    document.querySelectorAll('.chart-row.is-data[data-row-type="data"]').forEach((row)=>row.style.setProperty("--respondent-cols", String(safe)));
    console.log("[grid] respondents count =", safe);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./dom.js":"hdBoh"}],"kkJAL":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Layout", ()=>Layout);
var _stateJs = require("./state.js");
var _domJs = require("./dom.js");
const Layout = {
    applyChartLayoutMode () {
        const mode = (0, _stateJs.State).layout?.mode || "standard";
        const wrap = (0, _domJs.DOM).canvas?.closest(".panel.is-chart");
        if (!wrap) return;
        wrap.classList.toggle("is-compact", mode === "compact");
        wrap.classList.toggle("is-standard", mode !== "compact");
        wrap.style.height = "";
    }
};

},{"./state.js":"eTxS5","./dom.js":"hdBoh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Dz5Fa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Events", ()=>Events);
var _stateJs = require("./state.js");
var _domJs = require("./dom.js");
var _uiJs = require("./ui.js");
var _exportJs = require("./export.js");
var _tableActionsJs = require("./tableActions.js");
var _drawingActionsJs = require("./drawingActions.js");
var _templateActionsJs = require("./templateActions.js");
var _syncJs = require("./sync.js");
function closeAllColorPickers(except = null) {
    document.querySelectorAll(".color-input-wrap.is-open").forEach((el)=>{
        if (el !== except) el.classList.remove("is-open");
    });
}
const Events = {
    init () {
        // 1) Live update: tableau
        (0, _domJs.DOM).table.addEventListener("input", (e)=>{
            const t = e.target;
            if (!(t instanceof Element)) return;
            if (t.matches('input[data-role="item"]') || t.matches('input[data-role="score"]') || t.matches('input[data-role="respondent"]') || t.matches('input[data-role="respondent-color"]')) (0, _syncJs.syncAndRender)();
        });
        // 2) Live update: settings panel (input)
        (0, _domJs.DOM).settingsPanel.addEventListener("input", (e)=>{
            const t = e.target;
            if (!(t instanceof Element)) return;
            if (t.matches("[data-setting]")) (0, _syncJs.syncAndRender)();
        });
        // 3a) Live update: settings panel (change)
        (0, _domJs.DOM).settingsPanel.addEventListener("change", (e)=>{
            const t = e.target;
            if (!(t instanceof Element)) return;
            // Bonus UX: si on choisit un scheme, on active le toggle
            if (t.matches('[data-setting="color-scheme"]')) {
                const toggle = (0, _domJs.DOM).settingsPanel.querySelector('[data-setting="colors-enabled"]');
                if (toggle && !toggle.checked) toggle.checked = true;
            }
            if (t.matches("[data-setting]")) (0, _syncJs.syncAndRender)();
        });
        // 3b) Open / close custom color picker in settings panel
        (0, _domJs.DOM).settingsPanel.addEventListener("click", (e)=>{
            const current = e.target.closest(".color-current");
            if (!current) return;
            const picker = current.closest(".color-input-wrap");
            if (!picker) return;
            const willOpen = !picker.classList.contains("is-open");
            document.querySelectorAll(".color-input-wrap.is-open").forEach((el)=>{
                el.classList.remove("is-open");
            });
            if (willOpen) picker.classList.add("is-open");
        });
        // 4a) Color swatches: respondent colors (custom picker)
        (0, _domJs.DOM).table.addEventListener("click", (e)=>{
            const swatch = e.target.closest(".color-swatch");
            if (!swatch) return;
            const picker = swatch.closest(".color-input-wrap");
            if (!picker) return;
            if (picker.classList.contains("is-disabled")) return;
            const input = picker.querySelector('input[data-role$="-color"], input[data-setting$="-color"]');
            const current = picker.querySelector(".color-current");
            const color = swatch.dataset.color;
            if (!input || !color || input.disabled) return;
            // update visuel
            if (current) current.style.backgroundColor = color;
            // update hidden input
            input.value = color;
            // ferme le picker après sélection
            picker.classList.remove("is-open");
            // déclenche le flow existant de l'app
            input.dispatchEvent(new Event("input", {
                bubbles: true
            }));
            input.dispatchEvent(new Event("change", {
                bubbles: true
            }));
        });
        (0, _domJs.DOM).settingsPanel.addEventListener("click", (e)=>{
            const swatch = e.target.closest(".color-swatch");
            if (!swatch) return;
            const picker = swatch.closest(".color-input-wrap");
            if (!picker) return;
            if (picker.classList.contains("is-disabled")) return;
            const input = picker.querySelector('input[data-role$="-color"], input[data-setting$="-color"]');
            const current = picker.querySelector(".color-current");
            const color = swatch.dataset.color;
            if (!input || !color || input.disabled) return;
            input.value = color;
            if (current) current.style.backgroundColor = color;
            picker.classList.remove("is-open");
            input.dispatchEvent(new Event("input", {
                bubbles: true
            }));
            input.dispatchEvent(new Event("change", {
                bubbles: true
            }));
        });
        // 4b) Open / close custom color picker
        (0, _domJs.DOM).table.addEventListener("click", (e)=>{
            const current = e.target.closest(".color-current");
            if (!current) return;
            const picker = current.closest(".color-input-wrap");
            if (!picker) return;
            // bloque l'ouverture si thème actif / picker désactivé
            if (picker.classList.contains("is-disabled")) return;
            // un seul picker ouvert à la fois
            const willOpen = !picker.classList.contains("is-open");
            closeAllColorPickers();
            if (willOpen) picker.classList.add("is-open");
        });
        // 4c) Close custom color pickers when clicking outside
        document.addEventListener("click", (e)=>{
            if (e.target.closest(".color-input-wrap")) return;
            closeAllColorPickers();
        });
        // 5) Actions: boutons
        document.addEventListener("click", (e)=>{
            const btn = e.target.closest("[data-action]");
            if (!btn) return;
            const action = btn.getAttribute("data-action");
            // chart type
            if (action === "set-chart-type") {
                const chartType = btn.getAttribute("data-chart-type");
                if (chartType === "bar-vertical" || chartType === "bar-horizontal" || chartType === "line") {
                    (0, _stateJs.State).chartType = chartType;
                    (0, _uiJs.UI).syncChartTypeButtonsUI();
                    (0, _syncJs.syncAndRender)();
                }
                return;
            }
            // templates
            if (action === "apply-template") {
                const templateId = btn.getAttribute("data-template-id");
                (0, _stateJs.State).templateId = templateId;
                (0, _uiJs.UI).syncActiveGroup("template", templateId);
                (0, _templateActionsJs.TemplateActions).apply(templateId);
                return;
            }
            if (action === "reset-chart") {
                const ok = confirm("R\xe9initialiser le graphique ?");
                if (!ok) return;
                (0, _templateActionsJs.TemplateActions).resetChart();
                (0, _uiJs.UI).syncActiveGroup("template", null);
                return;
            }
            if (action === "reset-template") {
                (0, _templateActionsJs.TemplateActions).reset();
                return;
            }
            // color schemes
            if (action === "set-color-scheme") {
                const scheme = btn.getAttribute("data-ui-value");
                const hidden = (0, _domJs.DOM).settingsPanel.querySelector('[data-setting="color-scheme"]');
                if (hidden) hidden.value = scheme;
                const toggle = (0, _domJs.DOM).settingsPanel.querySelector('[data-setting="colors-enabled"]');
                if (toggle && !toggle.checked) toggle.checked = true;
                (0, _syncJs.syncAndRender)();
                // re-force l'état actif après render
                (0, _uiJs.UI).syncActiveGroup("color-scheme", scheme);
                return;
            }
            // table
            if (action === "add-item") {
                (0, _tableActionsJs.TableActions).addRowToEnd();
                (0, _syncJs.syncAndRender)();
                return;
            }
            if (action === "reset-table") {
                (0, _tableActionsJs.TableActions).resetTable();
                (0, _syncJs.syncAndRender)();
                return;
            }
            if (action === "add-row-after") {
                const rowEl = btn.closest('.chart-row.is-data[data-row-type="data"]');
                if (!rowEl) return;
                (0, _tableActionsJs.TableActions).addRowAfter(rowEl);
                (0, _syncJs.syncAndRender)();
                return;
            }
            if (action === "delete-row") {
                const rowEl = btn.closest('.chart-row.is-data[data-row-type="data"]');
                if (!rowEl) return;
                (0, _tableActionsJs.TableActions).deleteRow(rowEl);
                (0, _syncJs.syncAndRender)();
                return;
            }
            if (action === "add-respondent") {
                (0, _tableActionsJs.TableActions).addRespondent();
                (0, _syncJs.syncAndRender)();
                return;
            }
            if (action === "delete-respondent") {
                const headerCell = btn.closest('.chart-cell[data-col]');
                const colId = headerCell?.getAttribute("data-col");
                if (!colId) return;
                (0, _tableActionsJs.TableActions).deleteRespondent(colId);
                (0, _syncJs.syncAndRender)();
                return;
            }
            // drawings
            if (action === "add-drawing-row") {
                (0, _drawingActionsJs.DrawingActions).addRow();
                (0, _syncJs.syncAndRender)();
                return;
            }
            if (action === "delete-drawing-row") {
                (0, _drawingActionsJs.DrawingActions).deleteRow(btn);
                (0, _syncJs.syncAndRender)();
                return;
            }
            // export
            if (action === "export-chart") (0, _exportJs.ExportActions).exportChartPng();
        });
    }
};

},{"./state.js":"eTxS5","./dom.js":"hdBoh","./ui.js":"25UgT","./export.js":"bJtdG","./tableActions.js":"7vnSG","./drawingActions.js":"djjqN","./templateActions.js":"loJQJ","./sync.js":"d4J8u","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bJtdG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ExportActions", ()=>ExportActions);
var _domJs = require("./dom.js");
const ExportActions = {
    exportChartPng () {
        // Récupère le chart à partir du canvas (robuste même si State est privé)
        const chart = Chart.getChart((0, _domJs.DOM).canvas);
        if (!chart) {
            console.warn("[ChartApp] No chart instance found to export.");
            return;
        }
        // Option: fond blanc (sinon transparent)
        const canvas = chart.canvas;
        const tmp = document.createElement("canvas");
        tmp.width = canvas.width;
        tmp.height = canvas.height;
        const ctx = tmp.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, tmp.width, tmp.height);
        ctx.drawImage(canvas, 0, 0);
        const url = tmp.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `graphique-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
};

},{"./dom.js":"hdBoh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7vnSG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TableActions", ()=>TableActions);
var _stateJs = require("./state.js");
var _domJs = require("./dom.js");
var _utilsJs = require("./utils.js");
const TableActions = {
    // ----------------------------
    // Helpers DOM
    // ----------------------------
    getBody () {
        return (0, _domJs.DOM).table.querySelector(".chart-table_body");
    },
    getHeaderRow () {
        return (0, _domJs.DOM).table.querySelector('.chart-row.is-header[data-row-type="head"]');
    },
    getDataRows () {
        const body = this.getBody();
        if (!body) return [];
        return Array.from(body.querySelectorAll('.chart-row.is-data[data-row-type="data"]'));
    },
    getTemplateRow () {
        // On clone toujours une vraie row existante (modèle)
        return this.getDataRows()[0] || null;
    },
    // ---- Helpers data
    getRespondentColIds () {
        return (0, _stateJs.State).respondents.map((r)=>r.colId);
    },
    getNextRespondentColId () {
        const existing = this.getRespondentColIds();
        let i = 1;
        while(existing.includes(`r${i}`))i++;
        return `r${i}`;
    },
    // ----------------------------
    // ROWS (ajout/suppression/reset)
    // ----------------------------
    createRowElementByCloning ({ rowId }) {
        const templateRow = this.getTemplateRow();
        if (!templateRow) {
            console.warn("[ChartApp] No template row to clone. Create at least 1 row in Webflow.");
            return null;
        }
        // Clone profond (tout le HTML interne + classes)
        const newRow = templateRow.cloneNode(true);
        // Id unique
        newRow.setAttribute("data-row-id", rowId);
        // Reset champs (item + scores)
        this.resetRow(newRow);
        return newRow;
    },
    addRowToEnd () {
        const body = this.getBody();
        if (!body) return;
        const rowId = (0, _utilsJs.Utils).uid("row");
        const newRow = this.createRowElementByCloning({
            rowId
        });
        if (!newRow) return;
        body.appendChild(newRow);
    },
    addRowAfter (existingRowEl) {
        const body = this.getBody();
        if (!body || !existingRowEl) return;
        const rowId = (0, _utilsJs.Utils).uid("row");
        const newRow = this.createRowElementByCloning({
            rowId
        });
        if (!newRow) return;
        if (existingRowEl.nextSibling) body.insertBefore(newRow, existingRowEl.nextSibling);
        else body.appendChild(newRow);
    },
    deleteRow (rowEl) {
        const body = this.getBody();
        if (!body || !rowEl) return;
        const rows = this.getDataRows();
        if (rows.length <= 1) {
            this.resetRow(rowEl);
            return;
        }
        rowEl.remove();
    },
    resetRow (rowEl) {
        if (!rowEl) return;
        // item
        const itemInput = rowEl.querySelector('input[data-role="item"]');
        if (itemInput) itemInput.value = "";
        // scores
        rowEl.querySelectorAll('input[data-role="score"]').forEach((inp)=>{
            inp.value = " ";
        });
    },
    resetTable () {
        this.getDataRows().forEach((r)=>this.resetRow(r));
    },
    // ----------------------------
    // RESPONDENTS (colonnes) - CLONE
    // ----------------------------
    getTemplateRespondentHeaderCell () {
        // On clone une cellule respondent existante (dans le header)
        const headerRow = this.getHeaderRow();
        if (!headerRow) return null;
        // Prend la première cellule respondent existante (data-col)
        // (on évite le corner qui n'a pas data-col)
        return headerRow.querySelector('.chart-cell[data-col]') || null;
    },
    getTemplateScoreCell () {
        // On clone une cellule score existante (dans une row body)
        const templateRow = this.getTemplateRow();
        if (!templateRow) return null;
        // Prend une cellule score existante (data-col)
        return templateRow.querySelector('.chart-cell[data-col]') || null;
    },
    addRespondent () {
        const headerRow = this.getHeaderRow();
        const body = this.getBody();
        if (!headerRow || !body) return;
        const colId = this.getNextRespondentColId();
        const headerTemplate = this.getTemplateRespondentHeaderCell();
        const scoreTemplate = this.getTemplateScoreCell();
        if (!headerTemplate || !scoreTemplate) {
            console.warn("[ChartApp] Missing template cells to clone. Need at least 1 respondent column (r1) in header and body.");
            return;
        }
        // 1) Header cell (clone)
        const newHeaderCell = headerTemplate.cloneNode(true);
        newHeaderCell.setAttribute("data-col", colId);
        // Reset name/color pour ne pas dupliquer les valeurs
        const nameInput = newHeaderCell.querySelector('input[data-role="respondent"]');
        if (nameInput) nameInput.value = "";
        const colorInput = newHeaderCell.querySelector('input[data-role="respondent-color"]');
        if (colorInput) colorInput.value = "#000000";
        headerRow.appendChild(newHeaderCell);
        // 2) Score cells (clone) pour chaque row
        const rows = this.getDataRows();
        rows.forEach((rowEl)=>{
            const newScoreCell = scoreTemplate.cloneNode(true);
            newScoreCell.setAttribute("data-col", colId);
            const scoreInput = newScoreCell.querySelector('input[data-role="score"]');
            if (scoreInput) scoreInput.value = " ";
            rowEl.appendChild(newScoreCell);
        });
    },
    deleteRespondent (colId) {
        if (!colId) return;
        const headerRow = this.getHeaderRow();
        const body = this.getBody();
        if (!headerRow || !body) return;
        // Empêcher de supprimer si c'est le dernier respondent (UX safe)
        const existing = this.getRespondentColIds();
        if (existing.length <= 1) return;
        // 1) Supprimer la cellule header correspondante
        const headerCell = headerRow.querySelector(`.chart-cell[data-col="${colId}"]`);
        if (headerCell) headerCell.remove();
        // 2) Supprimer toutes les cellules score correspondantes dans chaque row
        this.getDataRows().forEach((rowEl)=>{
            const scoreCell = rowEl.querySelector(`.chart-cell[data-col="${colId}"]`);
            if (scoreCell) scoreCell.remove();
        });
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./dom.js":"hdBoh","./state.js":"eTxS5","./utils.js":"7YfrD"}],"djjqN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DrawingActions", ()=>DrawingActions);
var _domJs = require("./dom.js");
const DrawingActions = {
    getContainer () {
        // Le parent qui contient toutes les param-row (à ajuster si tu as un wrapper dédié)
        return (0, _domJs.DOM).settingsPanel;
    },
    getRows () {
        return Array.from((0, _domJs.DOM).settingsPanel.querySelectorAll(".param-row[data-drawing-id]"));
    },
    getTemplateRow () {
        return this.getRows()[0] || null;
    },
    getNextId () {
        const rows = this.getRows();
        let i = 1;
        const existing = rows.map((r)=>r.getAttribute("data-drawing-id"));
        while(existing.includes(`drw${i}`))i++;
        return `drw${i}`;
    },
    resetRow (rowEl) {
        console.log("[resetRow] corrected version loaded");
        rowEl.querySelectorAll("input").forEach((inp)=>{
            if (inp.type === "checkbox") inp.checked = false;
            else if (inp.type === "color") {
                if (inp.matches('[data-setting="zone-color"]')) inp.value = "#22c55e";
                else if (inp.matches('[data-setting="line-color"]')) inp.value = "#0f172a";
                else inp.value = "#000000";
            } else inp.value = "";
        });
        rowEl.querySelectorAll("select").forEach((sel)=>{
            sel.selectedIndex = 0;
        });
    },
    addRow () {
        const container = this.getContainer();
        const template = this.getTemplateRow();
        if (!container || !template) {
            console.warn("[ChartApp] No drawing template row found (.param-row[data-drawing-id])");
            return;
        }
        const newRow = template.cloneNode(true);
        newRow.setAttribute("data-drawing-id", this.getNextId());
        this.resetRow(newRow);
        // Insère après la dernière row existante
        const rows = this.getRows();
        const last = rows[rows.length - 1];
        if (last && last.parentNode) last.parentNode.insertBefore(newRow, last.nextSibling);
        else container.appendChild(newRow);
    },
    deleteRow (btnEl) {
        const row = btnEl.closest('.param-row[data-drawing-id]');
        if (!row) return;
        const rows = this.getRows();
        if (rows.length <= 1) {
            // UX safe: on reset au lieu de supprimer la dernière
            this.resetRow(row);
            return;
        }
        row.remove();
    }
};

},{"./dom.js":"hdBoh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"loJQJ":[function(require,module,exports,__globalThis) {
// src/app/templateActions.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TemplateActions", ()=>TemplateActions);
var _stateJs = require("./state.js");
var _domJs = require("./dom.js");
var _drawingsJs = require("./drawings.js");
var _tableActionsJs = require("./tableActions.js");
var _drawingActionsJs = require("./drawingActions.js");
var _templatesJs = require("./templates.js");
var _uiJs = require("./ui.js");
var _syncJs = require("./sync.js");
const TemplateActions = {
    apply (templateId) {
        const tpl = (0, _templatesJs.Templates)[templateId];
        if (!tpl) return;
        // 1) Chart type
        (0, _stateJs.State).chartType = tpl.chartType || "bar-vertical";
        // 1) Chart layout
        (0, _stateJs.State).layout = tpl.layout || {
            mode: "standard"
        };
        //3) Scale settings
        this.setInput('[data-setting="scale-auto"]', tpl.scale?.auto ?? true, "checkbox");
        this.setInput('[data-setting="scale-min"]', tpl.scale?.min ?? "");
        this.setInput('[data-setting="scale-max"]', tpl.scale?.max ?? "");
        this.setInput('[data-setting="step"]', tpl.scale?.step ?? "");
        // 3) Text settings
        this.setInput('[data-setting="show-legend"]', tpl.text?.showLegend ?? true, "checkbox");
        this.setInput('[data-setting="show-title"]', tpl.text?.showTitle ?? false, "checkbox");
        this.setInput('[data-setting="show-x"]', tpl.text?.showX ?? true, "checkbox");
        this.setInput('[data-setting="show-y"]', tpl.text?.showY ?? true, "checkbox");
        this.setInput('[data-setting="show-values"]', tpl.text?.showValues ?? false, "checkbox");
        // 4) Colors settings
        this.setInput('[data-setting="colors-enabled"]', tpl.colors?.enabled ?? false, "checkbox");
        this.setInput('[data-setting="color-scheme"]', tpl.colors?.scheme ?? "calm");
        // 5) Layout settings
        this.setRadioInput('[data-setting="layout-density"]', tpl.layout?.mode ?? "standard");
        // 6) Rows / items
        this.ensureRowCount(Math.max(1, tpl.items?.length || 1));
        this.setItems(tpl.items || [
            ""
        ]);
        // 7) Respondents
        this.ensureRespondentCount(Math.max(1, tpl.respondents?.length || 1));
        this.setRespondentNames(tpl.respondents || [
            ""
        ]);
        this.resetRespondentColors();
        // 8) Drawings / annotations
        this.ensureDrawingRowCount(Math.max(1, tpl.drawings?.length || 1));
        if (tpl.drawings && tpl.drawings.length) this.setDrawings(tpl.drawings);
        else this.clearDrawings();
        // 9) UI sync
        (0, _uiJs.UI).syncChartTypeButtonsUI();
        (0, _drawingsJs.applyDrawingRowVisibility)();
        (0, _syncJs.syncAndRender)();
    },
    resetChart () {
        // type par défaut
        (0, _stateJs.State).chartType = "bar-vertical";
        (0, _stateJs.State).templateId = null;
        // settings
        this.setInput('[data-setting="scale-auto"]', true, "checkbox");
        this.setInput('[data-setting="scale-min"]', "");
        this.setInput('[data-setting="scale-max"]', "");
        this.setInput('[data-setting="step"]', "");
        this.setInput('[data-setting="show-legend"]', true, "checkbox");
        this.setInput('[data-setting="show-title"]', false, "checkbox");
        this.setInput('[data-setting="show-x"]', true, "checkbox");
        this.setInput('[data-setting="show-y"]', true, "checkbox");
        this.setInput('[data-setting="show-values"]', false, "checkbox");
        this.setInput('[data-setting="colors-enabled"]', false, "checkbox");
        this.setInput('[data-setting="color-scheme"]', "calm");
        this.setRadioInput('[data-setting="layout-density"]', "standard");
        // tableau: 1 ligne, 1 répondant
        this.ensureRowCount(3);
        this.ensureRespondentCount(3);
        this.setItems([
            ""
        ]);
        this.setRespondentNames([
            ""
        ]);
        this.resetRespondentColors();
        // remet tous les scores à 0
        const body = (0, _domJs.DOM).table.querySelector(".chart-table_body");
        if (body) {
            const scoreInputs = body.querySelectorAll('input[data-role="score"]');
            scoreInputs.forEach((input)=>{
                input.value = " ";
            });
        }
        // drawings
        this.ensureDrawingRowCount(1);
        this.clearDrawings();
        // UI + render
        (0, _uiJs.UI).syncChartTypeButtonsUI();
        (0, _drawingsJs.applyDrawingRowVisibility)();
        (0, _syncJs.syncAndRender)();
    },
    setInput (selector, value, kind = "text") {
        const el = (0, _domJs.DOM).settingsPanel.querySelector(selector);
        if (!el) return;
        if (kind === "checkbox") el.checked = !!value;
        else el.value = value ?? "";
    },
    setRadioInput (selector, value) {
        const radios = (0, _domJs.DOM).settingsPanel.querySelectorAll(selector);
        radios.forEach((radio)=>{
            radio.checked = radio.value === value;
        });
    },
    ensureRowCount (targetCount) {
        const body = (0, _domJs.DOM).table.querySelector(".chart-table_body");
        if (!body) return;
        let rows = Array.from(body.querySelectorAll('.chart-row.is-data[data-row-type="data"]'));
        while(rows.length < targetCount){
            (0, _tableActionsJs.TableActions).addRowToEnd();
            rows = Array.from(body.querySelectorAll('.chart-row.is-data[data-row-type="data"]'));
        }
        while(rows.length > targetCount){
            rows[rows.length - 1].remove();
            rows = Array.from(body.querySelectorAll('.chart-row.is-data[data-row-type="data"]'));
        }
    },
    setItems (items) {
        const body = (0, _domJs.DOM).table.querySelector(".chart-table_body");
        if (!body) return;
        const rows = Array.from(body.querySelectorAll('.chart-row.is-data[data-row-type="data"]'));
        rows.forEach((rowEl, i)=>{
            const itemInput = rowEl.querySelector('input[data-role="item"]');
            if (itemInput) itemInput.value = items[i] ?? "";
            rowEl.querySelectorAll('input[data-role="score"]').forEach((inp)=>{
                inp.value = " ";
            });
        });
    },
    ensureRespondentCount (targetCount) {
        (0, _syncJs.syncAndRender)();
        let current = (0, _stateJs.State).respondents.length;
        while(current < targetCount){
            (0, _tableActionsJs.TableActions).addRespondent();
            (0, _syncJs.syncAndRender)();
            current = (0, _stateJs.State).respondents.length;
        }
        while(current > targetCount){
            const last = (0, _stateJs.State).respondents[(0, _stateJs.State).respondents.length - 1];
            if (!last?.colId) break;
            (0, _tableActionsJs.TableActions).deleteRespondent(last.colId);
            (0, _syncJs.syncAndRender)();
            current = (0, _stateJs.State).respondents.length;
        }
    },
    setRespondentNames (names) {
        const headerRow = (0, _domJs.DOM).table.querySelector('.chart-row.is-header[data-row-type="head"]');
        if (!headerRow) return;
        const cells = Array.from(headerRow.querySelectorAll(".chart-cell[data-col]"));
        cells.forEach((cell, i)=>{
            const nameInput = cell.querySelector('input[data-role="respondent"]');
            if (nameInput) nameInput.value = names[i] ?? "";
        });
    },
    resetRespondentColors () {
        const headerRow = (0, _domJs.DOM).table.querySelector('.chart-row.is-header[data-row-type="head"]');
        if (!headerRow) return;
        const cells = Array.from(headerRow.querySelectorAll(".chart-cell[data-col]"));
        cells.forEach((cell)=>{
            const colorInput = cell.querySelector('input[data-role="respondent-color"]');
            if (colorInput) colorInput.value = "#000000";
        });
    },
    ensureDrawingRowCount (targetCount) {
        let rows = Array.from((0, _domJs.DOM).settingsPanel.querySelectorAll('.param-row[data-drawing-id]'));
        while(rows.length < targetCount){
            (0, _drawingActionsJs.DrawingActions).addRow();
            rows = Array.from((0, _domJs.DOM).settingsPanel.querySelectorAll('.param-row[data-drawing-id]'));
        }
        while(rows.length > targetCount){
            rows[rows.length - 1].remove();
            rows = Array.from((0, _domJs.DOM).settingsPanel.querySelectorAll('.param-row[data-drawing-id]'));
        }
    },
    clearDrawings () {
        const rows = Array.from((0, _domJs.DOM).settingsPanel.querySelectorAll('.param-row[data-drawing-id]'));
        rows.forEach((rowEl, index)=>{
            const typeSel = rowEl.querySelector('[data-setting="draw-type"]');
            const zMin = rowEl.querySelector('[data-setting="zone-min"]');
            const zMax = rowEl.querySelector('[data-setting="zone-max"]');
            const zCol = rowEl.querySelector('[data-setting="zone-color"]');
            const lVal = rowEl.querySelector('[data-setting="line-value"]');
            const lSty = rowEl.querySelector('[data-setting="line-style"]');
            const lCol = rowEl.querySelector('[data-setting="line-color"]');
            if (index === 0) {
                if (typeSel) typeSel.value = "line";
                if (zMin) zMin.value = "";
                if (zMax) zMax.value = "";
                if (zCol) zCol.value = "#22c55e";
                if (lVal) lVal.value = "";
                if (lSty) lSty.value = "solid";
                if (lCol) lCol.value = "#0f172a";
            } else rowEl.remove();
        });
    },
    setDrawings (drawings) {
        const rows = Array.from((0, _domJs.DOM).settingsPanel.querySelectorAll('.param-row[data-drawing-id]'));
        rows.forEach((rowEl, i)=>{
            const d = drawings[i];
            if (!d) return;
            const typeSel = rowEl.querySelector('[data-setting="draw-type"]');
            if (typeSel) typeSel.value = d.type;
            const zMin = rowEl.querySelector('[data-setting="zone-min"]');
            const zMax = rowEl.querySelector('[data-setting="zone-max"]');
            const zCol = rowEl.querySelector('[data-setting="zone-color"]');
            if (zMin) zMin.value = d.zone?.min ?? "";
            if (zMax) zMax.value = d.zone?.max ?? "";
            if (zCol) zCol.value = d.zone?.color ?? "#22c55e";
            const lVal = rowEl.querySelector('[data-setting="line-value"]');
            const lSty = rowEl.querySelector('[data-setting="line-style"]');
            const lCol = rowEl.querySelector('[data-setting="line-color"]');
            if (lVal) lVal.value = d.line?.value ?? "";
            if (lSty) lSty.value = d.line?.style ?? "solid";
            if (lCol) lCol.value = d.line?.color ?? "#0f172a";
        });
        (0, _drawingsJs.applyDrawingRowVisibility)();
    }
};

},{"./state.js":"eTxS5","./dom.js":"hdBoh","./drawings.js":"8eWms","./tableActions.js":"7vnSG","./drawingActions.js":"djjqN","./templates.js":"357Zg","./ui.js":"25UgT","./sync.js":"d4J8u","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"357Zg":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Templates", ()=>Templates);
const Templates = {
    reset: {
        id: "reset",
        label: "Reset",
        chartType: "bar-vertical",
        scale: {
            auto: true,
            min: null,
            max: null,
            step: null
        },
        items: [
            ""
        ],
        respondents: [
            ""
        ],
        drawings: [],
        text: {
            showLegend: true,
            showTitle: false,
            showX: true,
            showY: true,
            showValues: false
        },
        colors: {
            enabled: false,
            scheme: "calm"
        },
        layout: {
            density: "standard"
        }
    },
    qi: {
        id: "qi",
        label: "Template 1 \u2014 QI",
        layout: {
            mode: "compact"
        },
        chartType: "bar-vertical",
        scale: {
            auto: false,
            min: 0,
            max: 100,
            step: 10
        },
        items: [
            "Raisonnement Verbal (ICV)",
            "Raisonnement Visuospatial (IVS)",
            "Raisonnement Logique (IRF)",
            "M\xe9moire de Travail (IMT)",
            "Vitesse de Traitement (IVT)",
            "Potentiel Global (IAG)"
        ],
        // Respondents: laisse vide si tu veux garder ceux déjà présents
        respondents: [],
        drawings: [
            // Zone verte 25-50
            {
                type: "zone",
                zone: {
                    min: 25,
                    max: 50,
                    color: "#22c55e"
                }
            },
            // Ligne gras 50
            {
                type: "line",
                line: {
                    value: 50,
                    style: "solid",
                    color: "#0f172a"
                }
            },
            // Pointillées légères: 25 / 75 / 91 / 9
            {
                type: "line",
                line: {
                    value: 25,
                    style: "dash",
                    color: "#94a3b8"
                }
            },
            {
                type: "line",
                line: {
                    value: 75,
                    style: "dash",
                    color: "#94a3b8"
                }
            },
            {
                type: "line",
                line: {
                    value: 91,
                    style: "dash",
                    color: "#94a3b8"
                }
            },
            {
                type: "line",
                line: {
                    value: 9,
                    style: "dash",
                    color: "#94a3b8"
                }
            }
        ]
    },
    qidi: {
        id: "qidi",
        label: "Template 2 \u2014 QI-DI",
        layout: {
            mode: "compact"
        },
        chartType: "bar-vertical",
        scale: {
            auto: false,
            min: 10,
            max: 115,
            step: 5
        },
        items: [
            "Raisonnement Verbal (ICV)",
            "Raisonnement Visuospatial (IVS)",
            "Raisonnement Logique (IRF)",
            "M\xe9moire de Travail (IMT)",
            "Vitesse de Traitement (IVT)",
            "Potentiel Global (\xc9GQI)"
        ],
        respondents: [],
        drawings: [
            // Zone verte 90-110
            {
                type: "zone",
                zone: {
                    min: 90,
                    max: 110,
                    color: "#22c55e"
                }
            },
            // Ligne gras 100
            {
                type: "line",
                line: {
                    value: 100,
                    style: "solid",
                    color: "#0f172a"
                }
            },
            // Pointillées: 70 / 55 / 40
            {
                type: "line",
                line: {
                    value: 70,
                    style: "dash",
                    color: "#94a3b8"
                }
            },
            {
                type: "line",
                line: {
                    value: 55,
                    style: "dash",
                    color: "#94a3b8"
                }
            },
            {
                type: "line",
                line: {
                    value: 40,
                    style: "dash",
                    color: "#94a3b8"
                }
            }
        ]
    },
    attention: {
        id: "attention",
        label: "Template 3 \u2014 Attention",
        layout: {
            mode: "standard"
        },
        chartType: "bar-vertical",
        scale: {
            auto: false,
            min: 0,
            max: 100,
            step: 10
        },
        items: [
            "M\xe9moire de Travail",
            "Vitesse de Traitement",
            "Att. Visuelle S\xe9lective",
            "Att. Visuelle Soutenue",
            "Att. Auditive CT",
            "Att. Auditive Soutenue",
            "Att. Divis\xe9e",
            "Flexibilit\xe9 Att.",
            "Inhibition Motrice 1",
            "Inhibition Motrice 2",
            "Inhibition Verbale",
            "Planification"
        ],
        respondents: [],
        drawings: [
            {
                type: "zone",
                zone: {
                    min: 25,
                    max: 75,
                    color: "#22c55e"
                }
            },
            {
                type: "line",
                line: {
                    value: 50,
                    style: "solid",
                    color: "#0f172a"
                }
            },
            {
                type: "line",
                line: {
                    value: 25,
                    style: "dash",
                    color: "#94a3b8"
                }
            },
            {
                type: "line",
                line: {
                    value: 75,
                    style: "dash",
                    color: "#94a3b8"
                }
            },
            {
                type: "line",
                line: {
                    value: 91,
                    style: "dash",
                    color: "#94a3b8"
                }
            },
            {
                type: "line",
                line: {
                    value: 9,
                    style: "dash",
                    color: "#94a3b8"
                }
            }
        ]
    },
    basc3: {
        id: "basc3",
        label: "Template 4 \u2014 BASC-3",
        layout: {
            mode: "standard"
        },
        chartType: "bar-vertical",
        scale: {
            auto: false,
            min: 30,
            max: 90,
            step: 5
        },
        items: [
            "Hyperactivit\xe9/Impulsivit\xe9",
            "Agressivit\xe9",
            "Pb. de conduite",
            "Pb. d'externalisation",
            "Anxi\xe9t\xe9",
            "D\xe9pression",
            "Pb. d'internalisation",
            "Inattention",
            "Anomalie",
            "Retrait",
            "Sx. Comportementaux",
            "Adaptabilit\xe9",
            "Habilet\xe9s sociales",
            "Leadership",
            "Comm. fonctionnelle",
            "Activit\xe9 vie quotidienne",
            "Habilet\xe9s adaptatives"
        ],
        respondents: [
            "Parent 1",
            "Parent 2",
            "Enseignant"
        ],
        drawings: [
            // Zones (couleurs de base — on pourra faire un dégradé plus tard)
            {
                type: "zone",
                zone: {
                    min: 30,
                    max: 60,
                    color: "#22c55e"
                }
            },
            {
                type: "zone",
                zone: {
                    min: 60,
                    max: 70,
                    color: "#facc15"
                }
            },
            {
                type: "zone",
                zone: {
                    min: 70,
                    max: 80,
                    color: "#fb923c"
                }
            },
            {
                type: "zone",
                zone: {
                    min: 80,
                    max: 90,
                    color: "#ef4444"
                }
            },
            // Lignes pointillées
            {
                type: "line",
                line: {
                    value: 60,
                    style: "dash",
                    color: "#94a3b8"
                }
            },
            {
                type: "line",
                line: {
                    value: 70,
                    style: "dash",
                    color: "#94a3b8"
                }
            },
            {
                type: "line",
                line: {
                    value: 80,
                    style: "dash",
                    color: "#94a3b8"
                }
            }
        ]
    }
}; //ajout

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["3VwnP","8lqZg"], "8lqZg", "parcelRequire1c3b", {})

//# sourceMappingURL=index.js.map
