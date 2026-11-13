var ge=Object.defineProperty,o=(e,n)=>ge(e,"name",{value:n,configurable:!0}),G=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,t)=>(typeof require<"u"?require:n)[t]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),ye=(()=>{for(var e=new Uint8Array(128),n=0;n<64;n++)e[n<26?n+65:n<52?n+71:n<62?n-4:n*4-205]=n;return t=>{for(var l=t.length,a=new Uint8Array((l-(t[l-1]=="=")-(t[l-2]=="="))*3/4|0),r=0,s=0;r<l;){var i=e[t.charCodeAt(r++)],f=e[t.charCodeAt(r++)],d=e[t.charCodeAt(r++)],p=e[t.charCodeAt(r++)];a[s++]=i<<2|f>>4,a[s++]=f<<4|d>>2,a[s++]=d<<6|p}return a}})();function X(e){return!isNaN(parseFloat(e))&&isFinite(e)}o(X,"_isNumber");function _(e){return e.charAt(0).toUpperCase()+e.substring(1)}o(_,"_capitalize");function O(e){return function(){return this[e]}}o(O,"_getter");var w=["isConstructor","isEval","isNative","isToplevel"],z=["columnNumber","lineNumber"],k=["fileName","functionName","source"],be=["args"],ve=["evalOrigin"],F=w.concat(z,k,be,ve);function h(e){if(e)for(var n=0;n<F.length;n++)e[F[n]]!==void 0&&this["set"+_(F[n])](e[F[n]])}o(h,"StackFrame");h.prototype={getArgs:o(function(){return this.args},"getArgs"),setArgs:o(function(e){if(Object.prototype.toString.call(e)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=e},"setArgs"),getEvalOrigin:o(function(){return this.evalOrigin},"getEvalOrigin"),setEvalOrigin:o(function(e){if(e instanceof h)this.evalOrigin=e;else if(e instanceof Object)this.evalOrigin=new h(e);else throw new TypeError("Eval Origin must be an Object or StackFrame")},"setEvalOrigin"),toString:o(function(){var e=this.getFileName()||"",n=this.getLineNumber()||"",t=this.getColumnNumber()||"",l=this.getFunctionName()||"";return this.getIsEval()?e?"[eval] ("+e+":"+n+":"+t+")":"[eval]:"+n+":"+t:l?l+" ("+e+":"+n+":"+t+")":e+":"+n+":"+t},"toString")};h.fromString=o(function(e){var n=e.indexOf("("),t=e.lastIndexOf(")"),l=e.substring(0,n),a=e.substring(n+1,t).split(","),r=e.substring(t+1);if(r.indexOf("@")===0)var s=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(r,""),i=s[1],f=s[2],d=s[3];return new h({functionName:l,args:a||void 0,fileName:i,lineNumber:f||void 0,columnNumber:d||void 0})},"StackFrame$$fromString");for(y=0;y<w.length;y++)h.prototype["get"+_(w[y])]=O(w[y]),h.prototype["set"+_(w[y])]=(function(e){return function(n){this[e]=!!n}})(w[y]);var y;for(b=0;b<z.length;b++)h.prototype["get"+_(z[b])]=O(z[b]),h.prototype["set"+_(z[b])]=(function(e){return function(n){if(!X(n))throw new TypeError(e+" must be a Number");this[e]=Number(n)}})(z[b]);var b;for(v=0;v<k.length;v++)h.prototype["get"+_(k[v])]=O(k[v]),h.prototype["set"+_(k[v])]=(function(e){return function(n){this[e]=String(n)}})(k[v]);var v,L=h;function M(){var e=/^\s*at .*(\S+:\d+|\(native\))/m,n=/^(eval@)?(\[native code])?$/;return{parse:o(function(t){if(t.stack&&t.stack.match(e))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:o(function(t){if(t.indexOf(":")===-1)return[t];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,a=l.exec(t.replace(/[()]/g,""));return[a[1],a[2]||void 0,a[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:o(function(t){var l=t.stack.split(`
`).filter(function(a){return!!a.match(e)},this);return l.map(function(a){a.indexOf("(eval ")>-1&&(a=a.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var r=a.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),s=r.match(/ (\(.+\)$)/);r=s?r.replace(s[0],""):r;var i=this.extractLocation(s?s[1]:r),f=s&&r||void 0,d=["eval","<anonymous>"].indexOf(i[0])>-1?void 0:i[0];return new L({functionName:f,fileName:d,lineNumber:i[1],columnNumber:i[2],source:a})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:o(function(t){var l=t.stack.split(`
`).filter(function(a){return!a.match(n)},this);return l.map(function(a){if(a.indexOf(" > eval")>-1&&(a=a.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),a.indexOf("@")===-1&&a.indexOf(":")===-1)return new L({functionName:a});var r=/((.*".+"[^@]*)?[^@]*)(?:@)/,s=a.match(r),i=s&&s[1]?s[1]:void 0,f=this.extractLocation(a.replace(r,""));return new L({functionName:i,fileName:f[0],lineNumber:f[1],columnNumber:f[2],source:a})},this)},"ErrorStackParser$$parseFFOrSafari")}}o(M,"ErrorStackParser");var xe=new M,we=xe,m=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&!process.browser,H=m&&typeof module<"u"&&typeof module.exports<"u"&&typeof G<"u"&&typeof __dirname<"u",ze=m&&!H,ke=typeof Deno<"u",V=!m&&!ke,Se=V&&typeof window=="object"&&typeof document=="object"&&typeof document.createElement=="function"&&"sessionStorage"in window&&typeof importScripts!="function",Ce=V&&typeof importScripts=="function"&&typeof self=="object";typeof navigator=="object"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome")==-1&&navigator.userAgent.indexOf("Safari")>-1;var N=typeof read=="function"&&typeof load=="function",j,I,q,Y,B;async function U(){if(!m||(j=(await import("./__vite-browser-external-9wXp6ZBx.js")).default,Y=await import("./__vite-browser-external-9wXp6ZBx.js"),B=await import("./__vite-browser-external-9wXp6ZBx.js"),q=(await import("./__vite-browser-external-9wXp6ZBx.js")).default,I=await import("./__vite-browser-external-9wXp6ZBx.js"),D=I.sep,typeof G<"u"))return;let e=Y,n=await import("./__vite-browser-external-9wXp6ZBx.js"),t=await import("./__vite-browser-external-9wXp6ZBx.js"),l=await import("./__vite-browser-external-9wXp6ZBx.js"),a={fs:e,crypto:n,ws:t,child_process:l};globalThis.require=function(r){return a[r]}}o(U,"initNodeModules");function K(e,n){return I.resolve(n||".",e)}o(K,"node_resolvePath");function Q(e,n){return n===void 0&&(n=location),new URL(e,n).toString()}o(Q,"browser_resolvePath");var E;m?E=K:N?E=o(e=>e,"resolvePath"):E=Q;var D;m||(D="/");function $(e,n){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:fetch(e)}:{binary:B.readFile(e).then(t=>new Uint8Array(t.buffer,t.byteOffset,t.byteLength))}}o($,"node_getBinaryResponse");function Z(e,n){if(e.startsWith("file://")&&(e=e.slice(7)),e.includes("://"))throw new Error("Shell cannot fetch urls");return{binary:Promise.resolve(new Uint8Array(readbuffer(e)))}}o(Z,"shell_getBinaryResponse");function J(e,n){let t=new URL(e,location);return{response:fetch(t,n?{integrity:n}:{})}}o(J,"browser_getBinaryResponse");var T;m?T=$:N?T=Z:T=J;async function ee(e,n){let{response:t,binary:l}=T(e,n);if(l)return l;let a=await t;if(!a.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await a.arrayBuffer())}o(ee,"loadBinaryFile");var S;if(Se)S=o(async e=>await import(e),"loadScript");else if(Ce)S=o(async e=>{try{globalThis.importScripts(e)}catch(n){if(n instanceof TypeError)await import(e);else throw n}},"loadScript");else if(m)S=ne;else if(N)S=load;else throw new Error("Cannot determine runtime environment");async function ne(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?q.runInThisContext(await(await fetch(e)).text()):await import(j.pathToFileURL(e).href)}o(ne,"nodeLoadScript");async function te(e){if(m){await U();let n=await B.readFile(e,{encoding:"utf8"});return JSON.parse(n)}else if(N){let n=read(e);return JSON.parse(n)}else return await(await fetch(e)).json()}o(te,"loadLockFile");async function re(){if(H)return __dirname;let e;try{throw new Error}catch(l){e=l}let n=we.parse(e)[0].fileName;if(m&&!n.startsWith("file://")&&(n=`file://${n}`),ze){let l=await import("./__vite-browser-external-9wXp6ZBx.js");return(await import("./__vite-browser-external-9wXp6ZBx.js")).fileURLToPath(l.dirname(n))}let t=n.lastIndexOf(D);if(t===-1)throw new Error("Could not extract indexURL path from pyodide module location");return n.slice(0,t)}o(re,"calculateDirname");function se(e){return e.substring(0,e.lastIndexOf("/")+1)||globalThis.location?.toString()||"."}o(se,"calculateInstallBaseUrl");function ae(e){let n=e.FS,t=e.FS.filesystems.MEMFS,l=e.PATH,a={DIR_MODE:16895,FILE_MODE:33279,mount:o(function(r){if(!r.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return t.mount.apply(null,arguments)},"mount"),syncfs:o(async(r,s,i)=>{try{let f=a.getLocalSet(r),d=await a.getRemoteSet(r),p=s?d:f,u=s?f:d;await a.reconcile(r,p,u),i(null)}catch(f){i(f)}},"syncfs"),getLocalSet:o(r=>{let s=Object.create(null);function i(p){return p!=="."&&p!==".."}o(i,"isRealDir");function f(p){return u=>l.join2(p,u)}o(f,"toAbsolute");let d=n.readdir(r.mountpoint).filter(i).map(f(r.mountpoint));for(;d.length;){let p=d.pop(),u=n.stat(p);n.isDir(u.mode)&&d.push.apply(d,n.readdir(p).filter(i).map(f(p))),s[p]={timestamp:u.mtime,mode:u.mode}}return{type:"local",entries:s}},"getLocalSet"),getRemoteSet:o(async r=>{let s=Object.create(null),i=await Ee(r.opts.fileSystemHandle);for(let[f,d]of i)f!=="."&&(s[l.join2(r.mountpoint,f)]={timestamp:d.kind==="file"?new Date((await d.getFile()).lastModified):new Date,mode:d.kind==="file"?a.FILE_MODE:a.DIR_MODE});return{type:"remote",entries:s,handles:i}},"getRemoteSet"),loadLocalEntry:o(r=>{let s=n.lookupPath(r).node,i=n.stat(r);if(n.isDir(i.mode))return{timestamp:i.mtime,mode:i.mode};if(n.isFile(i.mode))return s.contents=t.getFileDataAsTypedArray(s),{timestamp:i.mtime,mode:i.mode,contents:s.contents};throw new Error("node type not supported")},"loadLocalEntry"),storeLocalEntry:o((r,s)=>{if(n.isDir(s.mode))n.mkdirTree(r,s.mode);else if(n.isFile(s.mode))n.writeFile(r,s.contents,{canOwn:!0});else throw new Error("node type not supported");n.chmod(r,s.mode),n.utime(r,s.timestamp,s.timestamp)},"storeLocalEntry"),removeLocalEntry:o(r=>{var s=n.stat(r);n.isDir(s.mode)?n.rmdir(r):n.isFile(s.mode)&&n.unlink(r)},"removeLocalEntry"),loadRemoteEntry:o(async r=>{if(r.kind==="file"){let s=await r.getFile();return{contents:new Uint8Array(await s.arrayBuffer()),mode:a.FILE_MODE,timestamp:new Date(s.lastModified)}}else{if(r.kind==="directory")return{mode:a.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+r.kind)}},"loadRemoteEntry"),storeRemoteEntry:o(async(r,s,i)=>{let f=r.get(l.dirname(s)),d=n.isFile(i.mode)?await f.getFileHandle(l.basename(s),{create:!0}):await f.getDirectoryHandle(l.basename(s),{create:!0});if(d.kind==="file"){let p=await d.createWritable();await p.write(i.contents),await p.close()}r.set(s,d)},"storeRemoteEntry"),removeRemoteEntry:o(async(r,s)=>{await r.get(l.dirname(s)).removeEntry(l.basename(s)),r.delete(s)},"removeRemoteEntry"),reconcile:o(async(r,s,i)=>{let f=0,d=[];Object.keys(s.entries).forEach(function(c){let g=s.entries[c],x=i.entries[c];(!x||n.isFile(g.mode)&&g.timestamp.getTime()>x.timestamp.getTime())&&(d.push(c),f++)}),d.sort();let p=[];if(Object.keys(i.entries).forEach(function(c){s.entries[c]||(p.push(c),f++)}),p.sort().reverse(),!f)return;let u=s.type==="remote"?s.handles:i.handles;for(let c of d){let g=l.normalize(c.replace(r.mountpoint,"/")).substring(1);if(i.type==="local"){let x=u.get(g),_e=await a.loadRemoteEntry(x);a.storeLocalEntry(c,_e)}else{let x=a.loadLocalEntry(c);await a.storeRemoteEntry(u,g,x)}}for(let c of p)if(i.type==="local")a.removeLocalEntry(c);else{let g=l.normalize(c.replace(r.mountpoint,"/")).substring(1);await a.removeRemoteEntry(u,g)}},"reconcile")};e.FS.filesystems.NATIVEFS_ASYNC=a}o(ae,"initializeNativeFS");var Ee=o(async e=>{let n=[];async function t(a){for await(let r of a.values())n.push(r),r.kind==="directory"&&await t(r)}o(t,"collect"),await t(e);let l=new Map;l.set(".",e);for(let a of n){let r=(await e.resolve(a)).join("/");l.set(r,a)}return l},"getFsHandles"),Te=ye("AGFzbQEAAAABDANfAGAAAW9gAW8BfwMDAgECByECD2NyZWF0ZV9zZW50aW5lbAAAC2lzX3NlbnRpbmVsAAEKEwIHAPsBAPsbCwkAIAD7GvsUAAs="),Fe=(async function(){if(!(globalThis.navigator&&(/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&typeof navigator.maxTouchPoints<"u"&&navigator.maxTouchPoints>1)))try{let e=await WebAssembly.compile(Te);return await WebAssembly.instantiate(e)}catch(e){if(e instanceof WebAssembly.CompileError)return;throw e}})();async function oe(){let e=await Fe;if(e)return e.exports;let n=Symbol("error marker");return{create_sentinel:o(()=>n,"create_sentinel"),is_sentinel:o(t=>t===n,"is_sentinel")}}o(oe,"getSentinelImport");function le(e){let n={noImageDecoding:!0,noAudioDecoding:!0,noWasmDecoding:!1,preRun:ce(e),print:e.stdout,printErr:e.stderr,onExit(t){n.exitCode=t},thisProgram:e._sysExecutable,arguments:e.args,API:{config:e},locateFile:o(t=>e.indexURL+t,"locateFile"),instantiateWasm:he(e.indexURL)};return n}o(le,"createSettings");function ie(e){return function(n){let t="/";try{n.FS.mkdirTree(e)}catch(l){console.error(`Error occurred while making a home directory '${e}':`),console.error(l),console.error(`Using '${t}' for a home directory instead`),e=t}n.FS.chdir(e)}}o(ie,"createHomeDirectory");function fe(e){return function(n){Object.assign(n.ENV,e)}}o(fe,"setEnvironment");function de(e){return e?[async n=>{n.addRunDependency("fsInitHook");try{await e(n.FS,{sitePackages:n.API.sitePackages})}finally{n.removeRunDependency("fsInitHook")}}]:[]}o(de,"callFsInitHook");function ue(e){let n=e.HEAPU32[e._Py_Version>>>2],t=n>>>24&255,l=n>>>16&255,a=n>>>8&255;return[t,l,a]}o(ue,"computeVersionTuple");function pe(e){let n=ee(e);return async t=>{t.API.pyVersionTuple=ue(t);let[l,a]=t.API.pyVersionTuple;t.FS.mkdirTree("/lib"),t.API.sitePackages=`/lib/python${l}.${a}/site-packages`,t.FS.mkdirTree(t.API.sitePackages),t.addRunDependency("install-stdlib");try{let r=await n;t.FS.writeFile(`/lib/python${l}${a}.zip`,r)}catch(r){console.error("Error occurred while installing the standard library:"),console.error(r)}finally{t.removeRunDependency("install-stdlib")}}}o(pe,"installStdlib");function ce(e){let n;return e.stdLibURL!=null?n=e.stdLibURL:n=e.indexURL+"python_stdlib.zip",[pe(n),ie(e.env.HOME),fe(e.env),ae,...de(e.fsInit)]}o(ce,"getFileSystemInitializationFuncs");function he(e){if(typeof WasmOffsetConverter<"u")return;let{binary:n,response:t}=T(e+"pyodide.asm.wasm"),l=oe();return function(a,r){return(async function(){a.sentinel=await l;try{let s;t?s=await WebAssembly.instantiateStreaming(t,a):s=await WebAssembly.instantiate(await n,a);let{instance:i,module:f}=s;r(i,f)}catch(s){console.warn("wasm instantiation failed!"),console.warn(s)}})(),{}}}o(he,"getInstantiateWasmFunc");var Re="0.28.3";function C(e){return e===void 0||e.endsWith("/")?e:e+"/"}o(C,"withTrailingSlash");var A=Re;async function me(e={}){if(e.lockFileContents&&e.lockFileURL)throw new Error("Can't pass both lockFileContents and lockFileURL");await U();let n=e.indexURL||await re();n=C(E(n));let t=e;if(t.packageBaseUrl=C(t.packageBaseUrl),t.cdnUrl=C(t.packageBaseUrl??`https://cdn.jsdelivr.net/pyodide/v${A}/full/`),!e.lockFileContents){let u=e.lockFileURL??n+"pyodide-lock.json";t.lockFileContents=te(u),t.packageBaseUrl??=se(u)}t.indexURL=n,t.packageCacheDir&&(t.packageCacheDir=C(E(t.packageCacheDir)));let l={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,args:[],env:{},packages:[],packageCacheDir:t.packageBaseUrl,enableRunUntilComplete:!0,checkAPIVersion:!0,BUILD_ID:"cc7a4bb4c6f36f12592fef0934292b5fddb0e313ca5dc4a5a9519bb7610c67e3"},a=Object.assign(l,t);a.env.HOME??="/home/pyodide",a.env.PYTHONINSPECT??="1";let r=le(a),s=r.API;if(s.lockFilePromise=Promise.resolve(t.lockFileContents),typeof _createPyodideModule!="function"){let u=`${a.indexURL}pyodide.asm.js`;await S(u)}let i;if(e._loadSnapshot){let u=await e._loadSnapshot;ArrayBuffer.isView(u)?i=u:i=new Uint8Array(u),r.noInitialRun=!0,r.INITIAL_MEMORY=i.length}let f=await _createPyodideModule(r);if(r.exitCode!==void 0)throw new f.ExitStatus(r.exitCode);if(e.pyproxyToStringRepr&&s.setPyProxyToStringMethod(!0),e.convertNullToNone&&s.setCompatNullToNone(!0),s.version!==A&&a.checkAPIVersion)throw new Error(`Pyodide version does not match: '${A}' <==> '${s.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);f.locateFile=u=>{throw u.endsWith(".so")?new Error(`Failed to find dynamic library "${u}"`):new Error(`Unexpected call to locateFile("${u}")`)};let d;i&&(d=s.restoreSnapshot(i));let p=s.finalizeBootstrap(d,e._snapshotDeserializer);return s.sys.path.insert(0,""),s._pyodide.set_excepthook(),await s.packageIndexReady,s.initializeStreams(a.stdin,a.stdout,a.stderr),p}o(me,"loadPyodide");var Oe={"browser.py":`"""twinky's engine in the simulator page, run by Pyodide in a worker when no twinky.py answers: the
rotation on the simulated cone as twinky --sim starts it, a frame at a time on the clock --sim plays
on, each frame as the server sends it, and the remote's commands. It and what it imports reach for no
device, socket, thread or TUI: those stay in device.py, server.py and twinky.py."""
import json
import time

import commands
from core import FRAME
from sim import SimLights
from wire import frame_message, layout_message, remote_state

class Engine:
    """twinky --sim's Blender on the lights, the cone if not given, that the page's worker steps: init
    once, then step a frame at a time, command between frames, and changed_state after each."""
    frame = FRAME

    def __init__(self, lights: SimLights | None=None):
        self.blender = commands.start(lights if lights is not None else SimLights())
        self.layout = layout_message(self.blender)
        self.number = 0
        self.sent = b""
        self.state: str | None = None  # the last state given
        self.blender.on_frame = self._sent

    def _sent(self, frame: bytes):
        self.sent = frame
        # the fake interfaces keep every frame, which an endless page can't
        for interface in self.blender.lights.interfaces:
            interface.frames.clear()

    def init(self, t: float | None=None):
        self.blender.init(time.time() if t is None else t)

    def step(self, t: float | None=None) -> bytes:
        """Renders and writes the frame at t, now if not given, and gives its message."""
        self.blender.write(self.blender.render(time.time() if t is None else t))
        message = frame_message(self.number, self.sent)
        self.number += 1
        return message

    def command(self, message: str):
        """Runs one of the remote's commands, the JSON it sends, between frames as twinky's queue does."""
        commands.remote_command(json.loads(message))(self.blender)

    def changed_state(self) -> str | None:
        """The state message, as the remote gets it, when it changed since the last one given."""
        state = json.dumps({"state": remote_state(self.blender)})
        if state == self.state:
            return None
        self.state = state
        return state
`,"colors.py":`from enum import Enum
import math
from typing import Callable, TypeAlias
from pytweening import easeInOutCubic
from xled_plus.ledcolor import hsl_color, set_color_style

from param import Param, Curve, getv, rand
from utils import coverage, mk_bump

set_color_style('8col')
# set_color_style('linear')

class Color:
    def __init__(self, w=0.0, h=0.0, s=1.0, l=-1.0):
        self._w = min(1.0, max(0.0, w))
        self._h = h % 1
        self._s = min(1.0, max(0.0, s))
        self._l = min(1.0, max(-1.0, l))

    @property
    def w(self):
        return self._w

    @w.setter
    def w(self, v: float):
        self._w = min(1.0, max(0.0, v))
    
    @property
    def h(self):
        return self._h

    @h.setter
    def h(self, v: float):
        self._h = v % 1

    @property
    def s(self):
        return self._s

    @s.setter
    def s(self, v: float):
        self._s = min(1.0, max(0.0, v))
    
    @property
    def l(self):
        return self._l

    @l.setter
    def l(self, v: float):
        self._l = min(1.0, max(-1.0, v))

    def reset(self):
        self.w, self.h, self.s, self.l = 0, 0, 1.0, -1.0

    def as_wrgb(self) -> tuple[float, int, int, int]:
        if self.l == -1.0:
            return (self.w * 255, 0, 0, 0)  # off, whatever its hue
        return (self.w * 255, *hsl_color(self.h, self.s, self.l))

    def __repr__(self):
        return f"{self.w} {self.h} {self.s} {self.l}"

# The soft edge of a Window or Split side, as a fraction of a turn round the trunk
EDGE = 0.05

# A light's color as layers, each (weight, Color, suppression strings), their weights summing to 1:
# a light on a soft edge is part one side, part the other, mixed as light once each is bytes.
# The suppression strings could move to an enum for better type safety
BaseColorValue: TypeAlias = list[tuple[float, Color, list[str]]]

# A base color is called for each light with its angle round the trunk (pixel_t, as spin and the
# topologies move it), its height, and its core.Pixel, which only an effect reads (effects.py)

class BaseColor:
    def __init__(self,
                 w: Param=0,
                 h: Param=0,
                 s: Param=1,
                 l: Param=-1,
                 suppress: list[str] | None=None,
                 blend: bool=True,
                 spread: bool=True):
        self.color_w = w
        self.color_h = h
        self.color_s = s
        self.color_l = l
        self.suppress = suppress if suppress is not None else []
        self.blend = blend
        self.spread = spread

    def __call__(self, t: float, blend: float, spread: float, pixel_t: float, pixel_y: float, pixel) -> BaseColorValue:
        color = Color(
            w=getv(self.color_w, t),
            h=(
                getv(self.color_h, t)
              + (blend if self.blend else 0)
              + ((spread * pixel_t) if self.spread else 0)
            ),
            s=getv(self.color_s, t),
            l=getv(self.color_l, t),
        )
        return [(1.0, color, self.suppress)]

    def frame(self, beats: float, dt: float):
        """Called once a frame, before the lights, with the frame's beats and seconds: a hint's
        modulators run on them (hints.py)."""

    def __repr__(self):
        return f"{self.__class__.__name__}({self.color_w},{self.color_h},{self.color_s},{self.color_l})"

BaseColorFuncs: TypeAlias = list[BaseColor]
BaseColorFuncsParam: TypeAlias = Callable[[float], BaseColorFuncs] | BaseColorFuncs

class WindowColor(BaseColor):
    def __init__(self,
                 ratio: Param,
                 funcs: BaseColorFuncsParam | None=None,
                 suppress: list[str] | None=None):
        super(WindowColor, self).__init__(suppress=suppress)
        self.ratio = ratio
        self.funcs = funcs
        
    def __call__(self, t: float, blend: float, spread: float, pixel_t: float, pixel_y: float, pixel) -> BaseColorValue:
        ratio = getv(self.ratio, t)
        iteration = 0
        if isinstance(self.ratio, Curve):
            iteration = int(t / self.ratio.length)

        if self.funcs:
            funcs = getv_funcs(self.funcs, t)
        else:
            funcs = [None, None]

        # int(pixel_t + ratio) % 2 picks the side: the first up to 1 - ratio, the second from there round to 1
        first = math.floor(ratio) % 2
        second_share = coverage(pixel_t % 1, 1 - (ratio % 1), 1, EDGE)
        layers = []
        for side, share in ((first, 1 - second_share), (1 - first, second_share)):
            if share <= 0:
                continue
            func = funcs[side]
            if func is None:
                color = Color(0, blend + ((side + iteration) * spread), 1, 0)
                layers.append((share, color, self.suppress))
            else:
                layers += [(share * w, c, s) for w, c, s in func(t, blend, spread, pixel_t, pixel_y, pixel)]
        return layers

    def __repr__(self):
        return f"Window({self.ratio}, {self.funcs})"

class SplitColor(BaseColor):
    def __init__(self,
                 count: Param,
                 funcs: BaseColorFuncsParam | None=None,
                 suppress: list[str] | None=None):
        super(SplitColor, self).__init__(suppress=suppress)
        self.count = count
        self.funcs: BaseColorFuncsParam = (
            funcs
            if funcs is not None else
            [BaseColor(l=0), BaseColor()]
        )

    def __call__(self, t: float, blend: float, spread: float, pixel_t: float, pixel_y: float, pixel) -> BaseColorValue:
        count = int(getv(self.count, t))
        x = pixel_t % 1
        side = int(x * count)
        funcs = getv_funcs(self.funcs, t)
        # a light near a boundary takes some of the side next to its own, round the wrap too
        layers = []
        for s in {(side - 1) % count, side, (side + 1) % count}:
            share = coverage(x, s / count, (s + 1) / count, EDGE)
            if share > 0:
                func = funcs[s]
                layers += [(share * w, c, sup) for w, c, sup in func(t, blend, spread, pixel_t, pixel_y, pixel)]
        return layers

    def __repr__(self):
        return f"Split({self.count}, {self.funcs})"

class FallingColor(BaseColor):
    def __init__(self,
                 num_colors: int=8,
                 skip: Param=3/8,
                 offset: float=0,
                 period: float=60,
                 suppress: list[str] | None=None,
                 fade_func: Curve | float=1,
                 hue_func: Curve | None=None):
        super(FallingColor, self).__init__(suppress=suppress)
        self._num_colors = num_colors
        self._skip = skip
        self._offset = offset
        self._period = period
        self._fade_func = (
            fade_func
            if isinstance(fade_func, Curve) else
            Curve(easeInOutCubic, mk_bump(1, -fade_func, 0))
        )
        self._hue_func = 0 if hue_func is None else hue_func

    def __call__(self, t: float, blend: float, spread: float, pixel_t: float, pixel_y: float, pixel) -> BaseColorValue:
        # the colors fall num_colors bands a period, with no wrap, so the pattern's clock can run on
        pixel_y += (t + self._offset) * self._num_colors / self._period
        l = getv(self._fade_func, pixel_y)
        l = ((l + 1) ** 2) - 1
        h = int(pixel_y) * getv(self._skip, t)
        h += blend
        h += getv(self._hue_func, t)

        return [(1.0, Color(
            w=0,
            h=h,
            s=1,
            l=l,
        ), self.suppress)]

def setcolor(w: float | None=None,
             h: float | None=None,
             s: float | None=None,
             l: float | None=None,
             make_white: bool=False) -> Callable[[Color], Color]:
    def func(color: Color) -> Color:
        if color.l != -1.0 and make_white:
            return Color(
                w=1,
                s=0.0,
                l=-0.75,
            )

        return Color(
            w=w if w is not None else color.w,
            h=color.h + (0 if h is None else h),
            s=s if s is not None else color.s,
            l=l if l is not None else color.l,
        )
    return func

class ColorFuncs(Enum):
    BASE = setcolor(l=0.0)
    BASE_WHITEN = setcolor(l=0.0, make_white=True)
    BLANK = setcolor(w=0, l=-1)
    INVERT = setcolor(h=0.5, l=0.0)
    INVERT_WHITEN = setcolor(h=0.5, l=0.0, make_white=True)
    WHITEN = setcolor(w=1, s=0.0, l=-0.75)
    RANDOM = lambda _: Color(h=rand()(0), l=0)

def getv_funcs(v: BaseColorFuncsParam, t: float) -> BaseColorFuncs:
    return v(t) if callable(v) else v

def periodic_choices(delay: float, choices: list[BaseColorFuncs]):
    def func(t: float) -> BaseColorFuncs:
        return choices[int(t / delay) % len(choices)]
    return func
`,"commands.py":`"""What twinky does to its Blender: the rotation it starts with, each with its save, and the commands the
TUI and the remote queue. Apart from the device, the server and the TUI, so the simulator page's own
engine (browser.py) runs them too."""
import json
import logging
import os

from control import (
    MusicFeature,
    WiredPattern,
    BasicBitch,
    CircusTent,
    CoiledSpring,
    Confetti,
    FallingSnow,
    Galaxus,
    Groovy,
    RainbowStorm,
    SlidingDoor,
    SpiralTop,
)
from core import Blender
from effects import EFFECTS, EffectPattern
from hints import HINTS
import look

log = logging.getLogger("twinky")

SAVES = os.path.join(os.path.dirname(os.path.abspath(__file__)), "saves")

def switch_pattern(idx):
    def func(a):
        a.start_transition(idx)
    return func

# The menu lists the Music feature after the pattern's own, so a feature index past them is Music's

def change_option(fidx, cidx, step):
    def func(a):
        if fidx < len(a.pattern.features):
            a.pattern.change(fidx, cidx, step)
        else:
            a.music.change(cidx, step)
        a.glide()

    return func

def set_option(fidx, cidx, oidx):
    def func(a):
        if fidx < len(a.pattern.features):
            a.pattern.set(fidx, cidx, oidx)
        else:
            a.music.set(cidx, oidx)
        a.glide()

    return func

def random_pattern(a):
    a.next_pattern = a._pick_next()
    idx = a.patterns.index(a.next_pattern)
    a.start_transition(idx)

def randomize_pattern(a):
    a.pattern.randomize()
    a.glide()

def randomize_feature(fidx):
    def func(a):
        if fidx < len(a.pattern.features):
            a.pattern.features[fidx].randomize()
            a.pattern.update()
        else:
            a.music.randomize()
        a.glide()
    return func

def pauseplay(a):
    a.pause_change = not a.pause_change

# the walk's: Pace and Reach stepped, Stay and a feature's pin flipped, Back and Nudge

def walk_pace(step):
    def func(a):
        a.walk.pace.change(step)
    return func

def walk_reach(step):
    def func(a):
        a.walk.reach.change(step)
    return func

def toggle_stay(a):
    a.walk.stay.change()

def toggle_pin(fidx):
    def func(a):
        # Music is no pattern's, so the walk never moves it
        if fidx < len(a.pattern.features):
            a.walk.pins ^= {fidx}
    return func

def walk_back(a):
    a.walk.back(a)

def nudge(a):
    # as the walk would: never while a change runs
    if not a.transitioning:
        a.walk.step(a)

def spin_ring(angle):
    def func(a):
        a.ring_angle = angle
    return func

def save_path(pattern: WiredPattern) -> str:
    return os.path.join(SAVES, f"{pattern.name.replace(' ', '_').lower()}.json")

def toggle_configured(a):
    a.pattern.configured = not a.pattern.configured
    os.makedirs(SAVES, exist_ok=True)
    with open(save_path(a.pattern), 'w', encoding='utf-8') as file:
        json.dump(a.pattern._to_dict(), file, indent=2, ensure_ascii=False)
        file.write("\\n")
    log.info("Saved %s", a.pattern.name)

def music_path() -> str:
    return os.path.join(SAVES, "music.json")

def save_music(a):
    # the same shape as a pattern's save, its one feature by name
    os.makedirs(SAVES, exist_ok=True)
    with open(music_path(), 'w', encoding='utf-8') as file:
        json.dump({a.music.name: a.music._to_dict()}, file, indent=2, ensure_ascii=False)
        file.write("\\n")
    log.info("Saved Music")

def load_music(music: MusicFeature):
    if not os.path.exists(music_path()):
        log.info("No configuration found for Music")
    else:
        with open(music_path(), encoding='utf-8') as file:
            music._from_dict(json.load(file).get(music.name, {}), music.name)
            log.info("Loaded saved config for Music")

def load_pattern(pattern: WiredPattern):
    fname = save_path(pattern)
    if not os.path.exists(fname):
        log.info("No configuration found for %s", pattern.name)
    else:
        with open(fname, encoding='utf-8') as file:
            pattern._from_dict(json.load(file))
            pattern.configured = True
            log.info("Loaded saved config for %s", pattern.name)
    return pattern

def start_patterns() -> list[WiredPattern]:
    """The rotation: the ten patterns, the three hints, the ten effects and a pattern for each look in
    looks/, each with its save."""
    return [load_pattern(pattern) for pattern in [
        BasicBitch(),
        CircusTent(),
        CoiledSpring(),
        Confetti(),
        FallingSnow(),
        Galaxus(),
        Groovy(),
        RainbowStorm(),
        SlidingDoor(),
        SpiralTop(),
        *(cls() for cls in HINTS),
        *(EffectPattern(cls()) for cls in EFFECTS),
        *look.load_looks(),
    ]]

def remote_command(message: dict):
    """The TUI's own command for a message from the remote page. The page's view may be a moment
    behind, so a command for a feature runs only while the page's pattern is on show and the control
    is still there."""
    command = message["command"]
    if command == "switch":
        return switch_pattern(message["to"])
    if command == "random":
        return random_pattern
    if command == "pause":
        return pauseplay
    if command == "save":
        return toggle_configured
    if command == "save music":
        return save_music
    if command == "spin":
        return spin_ring(message["angle"])
    if command == "pace":
        return walk_pace(message["step"])
    if command == "reach":
        return walk_reach(message["step"])
    if command == "stay":
        return toggle_stay
    if command == "back":
        return walk_back
    if command == "nudge":
        return nudge
    if command == "randomize" and "feature" not in message:
        return randomize_pattern
    pattern = message["pattern"]
    fidx = message["feature"]
    control = None  # change's and set's: the control's place and name
    if command == "randomize":
        func = randomize_feature(fidx)
    elif command == "pin":
        func = toggle_pin(fidx)
    elif command == "change":
        control = (message["control"], message["name"])
        func = change_option(fidx, message["control"], message["step"])
    elif command == "set":
        control = (message["control"], message["name"])
        func = set_option(fidx, message["control"], message["option"])
    else:
        raise ValueError(f"No command {command!r}")

    def shown(a):
        # the control by name too, as a switch flipped on or off moves the ones after it
        features = a.pattern.features + [a.music]
        on_show = a.pattern.name == pattern and fidx < len(features)
        if on_show and control is not None:
            cidx, name = control
            controls = [c.name for c in features[fidx].visible_controls()]
            on_show = cidx < len(controls) and controls[cidx] == name
        if on_show:
            func(a)
        else:
            log.info("Dropped the remote's %s, for %s as it was", command, pattern)
    return shown

def start(lights) -> Blender:
    """twinky's Blender as it starts on the lights: the rotation from its first pattern with the
    changes paused, that pattern shuffled, and Music's save."""
    animation = Blender(start_patterns(), lights, 0, True)
    animation.pattern.randomize()
    load_music(animation.music)
    return animation
`,"control.py":`from pytweening import (
    linear,
    easeInSine,
    easeOutSine,
    easeInOutSine,
    easeInBounce,
    easeOutBounce,
    easeInOutBounce,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
)
import logging
import random
from typing import Callable
from colors import (
    Color,
    ColorFuncs,
    BaseColor,
    SplitColor,
    WindowColor,
    FallingColor,
    periodic_choices,
)
from music import Sound
from param import (
    Curve,
    Param,
    const,
    rand,
    choice,
)
from streamer import (
    Direction,
    Spin,
    StreamerFunc,
    RandomColorStreamerFunc,
    StreamerValue,
    StreamerParam,
    StreamerChoices,
    CombinedChoices,
)
from topologies import (
    SpiralTopology,
    Topology,
    DistortTopology,
    MirrorTopology,
    RepeatTopology,
)
from utils import (mk_bounce, mk_bump)

log = logging.getLogger(__name__)

class Option:
    def __init__(self, name: str, value):
        self.name = name
        self.value = value

    def __repr__(self) -> str:
        return f"{self.name}:{self.value}"

ZERO = [Option("0", 0)]
FRACS = [Option(n, v) for n, v in [
    ("1/8", 1/8),
    ("1/6", 1/6),
    ("1/5", 1/5),
    ("1/4", 1/4),
    ("1/3", 1/3),
    ("1/2", 1/2),
    ("2/3", 2/3),
    ("3/4", 3/4),
    ("1",   1),
]]
INTS16 = [Option(str(v), v) for v in range(1, 7)]
INTS26 = INTS16[1:] 
INTS18 = [Option(str(v), v) for v in range(1, 9)]
INTS28 = INTS18[1:]
HALVES053 = [Option(str(v * 0.5), v * 0.5) for v in range(1, 7)]
HALVES056 = HALVES053 + [Option(str(v), v) for v in range(4, 7)]
DIRECTIONS = [Option("\\u21ba ", 1), Option("\\u21bb ", -1)]
PERIODS = [Option(str(v), v) for v in [3, 5, 6, 10, 12, 15, 20, 30, 60]]
CURVES = [Option(n, f) for n, f in [
    ("linear", linear),
    ("sineI", easeInSine),
    ("sineO", easeOutSine),
    ("sineIO", easeInOutSine),
    ("quadI", easeInQuad),
    ("quadO", easeOutQuad),
    ("quadIO", easeInOutQuad),
    ("bounceI", easeInBounce),
    ("bounceO", easeOutBounce),
    ("bounceIO", easeInOutBounce),
]]

class Control:
    def __init__(self, name: str, options: list[Option]):
        self.name = name
        self.options = options
        self.selected_idx = 0
        self.selected = options[0]

    def _to_dict(self):
        return self.selected_idx

    def set(self, idx: int):
        self.selected_idx = idx % len(self.options)
        self.selected = self.options[self.selected_idx]

    def change(self, step: int=1):
        self.set(self.selected_idx + step)

    def randomize(self):
        idx = random.randint(0, len(self.options) - 1)
        self.set(idx)

    @property
    def value(self):
        return self.selected.value

    def __repr__(self) -> str:
        return f"{self.name}({self.selected})"

class ToggleControl(Control):
    def __init__(self, name: str):
        super(ToggleControl, self).__init__(name, [Option("On", True), Option("Off", False)])

class Feature:
    def __init__(self, name: str, controls: list[Control]):
        self.name = name
        self.controls = controls

    @property
    def value(self) -> dict:
        return {}

    def visible_controls(self) -> list[Control]:
        return self.controls

    def randomize(self):
        for control in self.controls:
            control.randomize()

    def change(self, idx: int, step: int=1):
        try:
            self.visible_controls()[idx].change(step)
        except Exception as ex:
            log.error("No control %d of %d visible in %s", idx, len(self.visible_controls()), self.name)
            raise ex

    def fset(self, cidx: int, oidx: int):
        self.controls[cidx].set(oidx)

    def set(self, cidx: int, oidx: int):
        try:
            self.visible_controls()[cidx].set(oidx)
        except Exception:
            raise ValueError(f"{cidx}, {len(self.visible_controls())}")

    def _to_dict(self) -> dict:
        return {c.name: c.selected.name for c in self.controls}

    def _from_dict(self, saved: dict, owner: str):
        """Sets each control to its saved option, by name; owner names the feature's holder in a warning."""
        for c in self.controls:
            name = saved.get(c.name)
            names = [o.name for o in c.options]
            if name in names:
                c.set(names.index(name))
            elif name is not None:
                log.warning("%s: no option %r for %s %s, kept %s",
                            owner, name, self.name, c.name, c.selected.name)

class BumpFeature(Feature):
    def __init__(self,
                 name: str,
                 attr_name: str,
                 min_v: float=0,
                 max_v: float=1):
        vals = [o for o in ZERO + FRACS if min_v <= o.value <= max_v]
        self.attr_name = attr_name
        self._enabled = ToggleControl("Enabled")
        self._start = Control("Start", vals)
        self._end = Control("End", vals)
        self._curved = ToggleControl("Curved")
        self._curve = Control("Curve", CURVES)
        self._period = Control("Period", PERIODS)

        super(BumpFeature, self).__init__(name, [
            self._enabled,
            self._start,
            self._end,
            self._curved,
            self._curve,
            self._period,
        ])

    @property
    def value(self) -> dict:
        if not self._enabled.value:
            val = 0
        elif not self._curved.value:
            val = self._start.value
        else:
            val = Curve(self._curve.value, mk_bump(
                self._period.value,
                self._start.value,
                self._end.value,
            ))
        return {self.attr_name: val}

    def visible_controls(self) -> list[Control]:
        if not self._enabled.value:
            return self.controls[:1]
        if not self._curved.value:
            return [self._enabled, self._start, self._curved]
        else:
            return self.controls

class BounceFeature(Feature):
    def __init__(self,
                 name: str,
                 attr_name: str,
                 max_v: float=1):
        vals = [o for o in FRACS if o.value <= max_v]
        self.attr_name = attr_name
        self._enabled = ToggleControl("Enabled")
        self._curved = ToggleControl("Curved")
        self._curve = Control("Curve", CURVES)
        self._period = Control("Period", PERIODS)
        self._value = Control("Value", vals)

        super(BounceFeature, self).__init__(name, [
            self._enabled,
            self._value,
            self._curved,
            self._curve,
            self._period,
        ])

    @property
    def value(self) -> dict:
        if not self._enabled.value:
            val = 0
        elif not self._curved.value:
            val = self._value.value
        else:
            val = Curve(self._curve.value, mk_bounce(
                self._period.value,
                self._value.value,
            ))
        return {self.attr_name: val}

    def visible_controls(self):
        if not self._enabled.value:
            return self.controls[:1]
        if not self._curved.value:
            return [self._enabled, self._value, self._curved]
        else:
            return self.controls

class FlashFeature(BumpFeature):
    def __init__(self, min_v: float=0, max_v: float=1):
        super(FlashFeature, self).__init__("Flash", "flash", min_v, max_v)

class FlickerFeature(BumpFeature):
    def __init__(self, min_v: float=0, max_v: float=1):
        super(FlickerFeature, self).__init__("Flicker", "flicker", min_v, max_v)

class FlitterFeature(BumpFeature):
    def __init__(self, min_v: float=0, max_v: float=1):
        super(FlitterFeature, self).__init__("Flitter", "flitter", min_v, max_v)

class FluxFeature(BounceFeature):
    def __init__(self, max_v: float=1):
        super(FluxFeature, self).__init__("Flux", "flux", max_v)

class SparklesFeature(Feature):
    def _mk_sparkle(self,
                    w: float | None=None,
                    h: float | None=None,
                    s: float | None=None,
                    l: float | None=None,
                    make_white: bool=False):
        def func(color: Color) -> Color:
            if color.l != -1.0 and make_white:
                return Color(w=1, s=0.0, l=-0.75)
            return Color(
                w=w if w is not None else color.w,
                h=h if h is not None else color.h,
                s=s if s is not None else color.s,
                l=l if l is not None else color.l,
            )
        return func

    def random_sparkle(self, color: Color) -> Color:
        return Color(
            w=color.w,
            h=color.h + rand(-0.5, 0.5)(0),
            s=color.s,
            l=color.l,
        )

    def rainbow_sparkle(self, color: Color) -> Color:
        if self.rainbow is None:
            return color
        return Color(
            w=color.w,
            h=color.h + rand(-self.rainbow.value / 2, self.rainbow.value / 2)(0),
            s=color.s,
            l=color.l,
        )

    def flux_sparkle(self, color: Color) -> Color:
        if self.flux is None:
            return color
        return Color(
            w=color.w,
            h=color.h + rand(-self.flux._value.value / 2, self.flux._value.value / 2)(0),
            s=color.s,
            l=color.l,
        )

    def __init__(self, rainbow: Control | None=None, flux: FluxFeature | None=None):
        self.rainbow = rainbow
        self.flux = flux
        effects = [
            ("base", self._mk_sparkle(l=0)),
            ("base_whiten", self._mk_sparkle(l=0, make_white=True)),
            ("blank", self._mk_sparkle(l=-1)),
            ("invert", self._mk_sparkle(h=0.5, l=0)),
            ("invert_whiten", self._mk_sparkle(h=0.5, l=0, make_white=True)),
            ("whiten", self._mk_sparkle(w=1, s=0, l=-0.75)),
            ("random", self.random_sparkle),
        ]
        if self.rainbow is not None:
            effects.append(("Rainbow", self.rainbow_sparkle))
        if self.flux is not None:
            effects.append(("Flux", self.flux_sparkle))

        self._enabled = ToggleControl("Enabled")
        self._curved = ToggleControl("Curved")
        self._curve = Control("Curve", CURVES)
        self._period = Control("Period", PERIODS)
        self._start = Control("Start", ZERO + FRACS)
        self._end = Control("End", ZERO + FRACS)
        self._effect = Control("Effect", [Option(n, v) for n, v in effects]) 

        super(SparklesFeature, self).__init__("Sparkles", [
            self._enabled,
            self._start,
            self._end,
            self._curved,
            self._curve,
            self._period,
            self._effect,
        ])

    def visible_controls(self) -> list[Control]:
        if not self._enabled.value:
            return [self._enabled]
        if not self._curved.value:
            return [
                self._enabled,
                self._curved,
                self._start,
                self._effect,
            ]
        return self.controls

    @property
    def value(self) -> dict:
        if not self._enabled.value:
            sparkles = 0
        elif self._curved.value:
            sparkles = Curve(self._curve.value, mk_bump(
                self._period.value,
                self._start.value,
                self._end.value))
        else:
            sparkles = self._start.value
        return {
            "sparkles": sparkles,
            "sparkle_func": self._effect.value,
        }

    def randomize(self):
        for c in self.controls:
            c.randomize()

class SpiralFeature(Feature):
    def __init__(self):
        self._enabled = ToggleControl("Enabled")
        self._spirals = Control("Spirals", FRACS)
        self._direction = Control("Direction", DIRECTIONS)
        self._curve = Control("Curve", CURVES)
        self._period = Control("Period", PERIODS)
        
        super(SpiralFeature, self).__init__("Spiral", [
            self._enabled,
            self._spirals,
            self._direction,
            self._curve,
            self._period,
        ])

    @property
    def value(self):
        if not self._enabled.value:
            val = 0
        else:
            val = Curve(self._curve.value, mk_bounce(
                self._period.value,
                self._spirals.value * self._direction.value,
            ))
        return {"spiral": val}

    def visible_controls(self) -> list[Control]:
        if not self._enabled.value:
            return [self._enabled]
        else:
            return self.controls

class SpiralTopologyFeature(Feature):
    def __init__(self,
                 toggleable=True,
                 force_curve=False,
                 repeats: list[Option]=INTS26):
        self._repeats = Control("Repeats", repeats)
        self._mirrored = ToggleControl("Mirrored")
        self._enabled = ToggleControl("Enabled")
        self._value = Control("Twists", [Option(str(v), v) for v in [
            1, 1.5, 2, 3
        ]])
        self._direction = Control("Direction", DIRECTIONS + [Option("both", "both")])
        self._mid = Control("Mid", ZERO + FRACS)
        self._curved = ToggleControl("Curved")
        self._curve = Control("Curve", CURVES)
        self._period = Control("Period", PERIODS)
        self.force_curve = force_curve
        self.toggleable = toggleable
        features = [
            self._repeats,
            self._mirrored,
            self._enabled,
            self._value,
            self._direction,
            self._mid,
            self._curved,
            self._curve,
            self._period,
        ]
        if not toggleable:
            features.remove(self._enabled)
        if not force_curve:
            features.remove(self._curved)
        
        super(SpiralTopologyFeature, self).__init__("Spiral", features)

    @property
    def value_param(self):
        if not self._enabled.value and self.toggleable:
            return 0
        if not self._curved.value and not self.force_curve:
            return self._value.value
        if self._direction.value == "both":
            return Curve(self._curve.value, mk_bounce(
                self._period.value,
                self._value.value,
                -self._value.value,
            ))
        return Curve(self._curve.value, mk_bounce(
            self._period.value,
            self._value.value * self._direction.value,
        ))

    @property
    def value(self):
        Topology = MirrorTopology if self._mirrored.value else RepeatTopology
        return {"topologies": [
            Topology(self._repeats.value),
            SpiralTopology(self.value_param * 3, self._mid.value)
        ]}

    def visible_controls(self) -> list[Control]:
        if self.force_curve:
            curve = [self._value, self._direction, self._mid, self._curve, self._period]
        else:
            curve = [self._value, self._direction, self._mid, self._curved]
            if self._curved.value:
                curve += [self._curve, self._period]

        if self.toggleable:
            controls = [self._repeats, self._mirrored, self._enabled]
            if self._enabled.value:
                controls += curve
        else:
            controls = [self._repeats, self._mirrored] + curve

        return controls

class SpinFeature(Feature):
    def __init__(self):
        self._enabled = ToggleControl("Enabled")
        self._spin = Control("Spin", FRACS)
        self._direction = Control("Direction", DIRECTIONS + [Option("both", "both")])
        self._curve = Control("Curve", CURVES)
        self._period = Control("Period", PERIODS)
        
        super(SpinFeature, self).__init__("Spin", [
            self._enabled,
            self._spin,
            self._direction,
            self._curve,
            self._period,
        ])

    @property
    def value_param(self):
        if not self._enabled.value:
            return 0
        if self._direction.value == "both":
            return Curve(self._curve.value, mk_bounce(
                self._period.value,
                self._spin.value,
                -self._spin.value,
            ))
        return Curve(self._curve.value, mk_bounce(
            self._period.value,
            self._spin.value * self._direction.value,
        ))

    @property
    def value(self):
        return {"spin": self.value_param}

    def visible_controls(self) -> list[Control]:
        if not self._enabled.value:
            return [self._enabled]
        else:
            return self.controls

# 0 first, then later and later, then earliest round to just early
LATENCIES = [Option(f"{ms:+d} ms" if ms else "0 ms", ms / 1000)
             for ms in list(range(0, 151, 25)) + list(range(-150, 0, 25))]

class MusicFeature(Feature):
    """How the music the page hears drives the tree: one feature for the whole show, held by the
    Blender and in no pattern, so every pattern plays under it unchanged."""
    def __init__(self):
        self._on = ToggleControl("On")
        self._streamers = Control("Streamers", [Option(n, v) for n, v in [
            ("off", 0),
            ("every beat", 1),
            ("every 2 beats", 2),
            ("every bar", 4),
        ]])
        self._flash = Control("Flash", [Option(n, v) for n, v in [
            ("off", None),
            ("whole tree", "tree"),
            ("chasing sectors", "chase"),
        ]])
        self._sparkles = ToggleControl("Sparkle rate")
        self._palette = ToggleControl("Palette")
        self._feel = ToggleControl("Feel")
        self._spin = Control("Spin lock", [Option(n, v) for n, v in [
            ("off", 0),
            ("4 bars", 4),
            ("8 bars", 8),
        ]])
        self._latency = Control("Latency", LATENCIES)
        super(MusicFeature, self).__init__("Music", [
            self._on,
            self._streamers,
            self._flash,
            self._sparkles,
            self._palette,
            self._feel,
            self._spin,
            self._latency,
        ])
        # every link starts on, as the toggles do: a save keeps whichever he switches off
        for control in [self._streamers, self._flash, self._spin]:
            control.set(1)

    @property
    def value(self) -> dict:
        return {
            "on": self._on.value,
            "streamers": self._streamers.value,  # beats a launch, 0 off
            "flash": self._flash.value,
            "sparkles": self._sparkles.value,
            "palette": self._palette.value,
            "feel": self._feel.value,
            "spin": self._spin.value,  # bars a turn, 0 off
            "latency": self._latency.value,  # seconds
        }

    def visible_controls(self) -> list[Control]:
        if not self._on.value:
            return [self._on]
        return self.controls

    def randomize(self):
        # On and Latency stay as set
        for control in self.controls[1:-1]:
            control.randomize()

class Pattern:
    def __init__(self,
                 name: str,
                 base_color: BaseColor | None=None,
                 topologies: list[Topology] | None=None,
                 spread: Param=0,
                 flash: Param=0,
                 flicker: Param=0,
                 flitter: Param=0,
                 flux: Param=0,
                 spiral: Param=0,
                 spin: Param=0,
                 sparkles: Param=0,
                 sparkle_func: Callable[[Color], Color] | None=None,
                 streamers: StreamerParam | None=None,
                 transition: str="crossfade",
                 grain: str="smooth"):
        self.name = name
        self.base_color = base_color if base_color is not None else BaseColor()
        self.topologies = topologies if topologies is not None else []
        self.spread = spread
        self.flash = flash
        self.flicker = flicker
        self.flitter = flitter
        self.flux = flux
        self.spiral = spiral
        self.spin = spin
        self.sparkles = sparkles
        self.sparkle_func = sparkle_func if sparkle_func is not None else ColorFuncs.WHITEN
        self.streamers = streamers if streamers is not None else []
        self.transition = transition
        self.grain = grain

    def step(self, t: float, pixels: list, sound: Sound | None, beating: bool, beat: int | None, hue: float):
        """Called once a frame, before the lights, with the run's clock, every light (core.Pixel),
        what the page hears (None with Music off), whether its tempo is sure, the beat this frame
        takes (None between beats) and the base hue: an effect works out its lights here
        (effects.py). The other patterns need none of it."""

class WiredPattern(Pattern):
    def __init__(self, name, **kwargs):
        super(WiredPattern, self).__init__(name, **kwargs)
        self.features: list[Feature] = []
        self.configured = False
        self.dirty = False

    def _to_dict(self):
        return {f.name: f._to_dict() for f in self.features}

    def _from_dict(self, saved):
        if isinstance(saved, list):
            # an old save: option numbers by feature and control position
            for fidx, f in enumerate(saved):
                for cidx, oidx in enumerate(f):
                    self.features[fidx].fset(cidx, oidx)
        else:
            for f in self.features:
                f._from_dict(saved.get(f.name, {}), self.name)
        self.update(set_dirty=False)
                
    def update(self, set_dirty=True):
        for feature in self.features:
            for attr, val in feature.value.items():
                setattr(self, attr, val)
        if set_dirty:
            self.configured = False
            self.dirty = True

    def change(self, fidx: int, cidx: int, step: int=1):
        self.features[fidx].change(cidx, step)
        self.update()

    def set(self, fidx: int, cidx: int, oidx: int):
        try:
            self.features[fidx].set(cidx, oidx)
        except Exception:
            raise ValueError(f"{fidx},{cidx},{oidx}")
        self.update()

    def randomize(self):
        if self.configured:
            return
        for c in self.features:
            c.randomize()
        self.update()
    
class BlendFeature(Feature):
    """How the pattern comes in at a change, and the grain of its flicker, flitter, flux, flash and sparkles."""
    def __init__(self):
        self._transition = Control("Transition", [Option(n, v) for n, v in [
            ("crossfade", "crossfade"),
            ("sweep round", "sweep"),
            ("rise", "rise"),
            ("spiral in", "spiral"),
        ]])
        self._grain = Control("Grain", [Option(n, n) for n in ["smooth", "raw"]])
        super(BlendFeature, self).__init__("Blend", [
            self._transition,
            self._grain,
        ])

    @property
    def value(self):
        return {"transition": self._transition.value, "grain": self._grain.value}

    def randomize(self):
        # the grain stays as set: smooth unless raw is picked
        self._transition.randomize()

class RepeatTopologyFeature(Feature):
    def __init__(self):
        self._count = Control("Repeats", INTS16)
        self._mirrored = ToggleControl("Mirrored")
        super(RepeatTopologyFeature, self).__init__("Repeats", [
            self._count,
            self._mirrored,
        ])

    @property
    def value(self):
        Topology = RepeatTopology if self._mirrored.value else MirrorTopology
        return {"topologies": [Topology(self._count.value)]}

class BasicBitchFeature(Feature):
    def __init__(self):
        self._enabled = ToggleControl("Enabled")
        self._curve = Control("Curve", CURVES)
        self._period = Control("Period", PERIODS)
        self._intensity = Control("Intentsity", FRACS)

        super(BasicBitchFeature, self).__init__("Pulse", [
            self._enabled,
            self._intensity,
            self._curve,
            self._period,
        ])

    @property
    def value(self):
        if not self._enabled.value:
            val = BaseColor(l=0)
        else:
            val = BaseColor(l=Curve(self._curve.value, mk_bump(
                self._period.value,
                -self._intensity.value,
            )))
        return {"base_color": val}

    def visible_controls(self) -> list[Control]:
        if not self._enabled.value:
            return [self._enabled]
        return self.controls

class BasicBitch(WiredPattern):
    def __init__(self):
        self._flux = FluxFeature()
        super(BasicBitch, self).__init__("Basic Bitch")
        self.features = [
            BasicBitchFeature(),
            FlickerFeature(),
            FlitterFeature(),
            self._flux,
            SparklesFeature(flux=self._flux),
            BlendFeature(),
        ]

class CircusTentFeature(Feature):
    def __init__(self):
        self._delay = Control("Delay", [Option("0.25", 0.25)] + HALVES053)
        self._splits = Control("splits", [Option(str(v), v) for v in [2, 3, 4]])
        self._rainbow = Control("Rainbow", ZERO + FRACS)
        self._curved = ToggleControl("Rainbow Curved")
        self._curve = Control("Rainbow Curve", CURVES)
        self._period = Control("Rainbow Period", PERIODS)
        super(CircusTentFeature, self).__init__("Circus Tent", [
            self._delay,
            self._splits,
            self._rainbow,
            self._curved,
            self._curve,
            self._period,
        ])

    @property
    def value(self):
        if self._curved.value:
            rainbow = Curve(self._curve.value, mk_bounce(
                self._period.value,
                self._rainbow.value,
            ))
        else:
            rainbow = self._rainbow.value

        if self._splits.value == 2:
            fns = [[
                BaseColor(h=rainbow * 0.0, l=-1),
                BaseColor(h=rainbow * 0.5, l=0, suppress=["sparkles"]),
            ], [
                BaseColor(h=rainbow * 0.0, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.5, l=0, suppress=["sparkles"]),
            ], [
                BaseColor(h=rainbow * 0.0, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.5, l=-1),
            ], [
                BaseColor(h=rainbow * 0.0, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.5, l=0, suppress=["sparkles"]),
            ]]

        elif self._splits.value == 3:
            fns = [[
                BaseColor(h=rainbow * 1/3, l=-1),
                BaseColor(h=rainbow *   0, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 2/3, l=0, suppress=["sparkles"]),
            ], [
                BaseColor(h=rainbow * 1/3, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow *   0, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 2/3, l=0, suppress=["sparkles"]),
            ], [
                BaseColor(h=rainbow * 1/3, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow *   0, l=-1),
                BaseColor(h=rainbow * 2/3, l=0, suppress=["sparkles"]),
            ], [
                BaseColor(h=rainbow * 1/3, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow *   0, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 2/3, l=0, suppress=["sparkles"]),
            ], [
                BaseColor(h=rainbow * 1/3, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow *   0, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 2/3, l=-1),
            ], [
                BaseColor(h=rainbow * 1/3, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow *   0, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 2/3, l=0, suppress=["sparkles"]),
            ]]
        else:
            fns = [[
                BaseColor(h=rainbow * 0.00, l=-1),
                BaseColor(h=rainbow * 0.25, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.50, l=-1),
                BaseColor(h=rainbow * 0.75, l=0, suppress=["sparkles"]),
            ], [
                BaseColor(h=rainbow * 0.00, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.25, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.50, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.75, l=0, suppress=["sparkles"]),
            ], [
                BaseColor(h=rainbow * 0.00, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.25, l=-1),
                BaseColor(h=rainbow * 0.50, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.75, l=-1),
            ], [
                BaseColor(h=rainbow * 0.00, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.25, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.50, l=0, suppress=["sparkles"]),
                BaseColor(h=rainbow * 0.75, l=0, suppress=["sparkles"]),
            ]]
        return {
            "base_color": SplitColor(
                self._splits.value,
                periodic_choices(self._delay.value, fns),
            )}

    def visible_controls(self) -> list[Control]:
        r = [self._delay, self._splits, self._rainbow, self._curved]
        if self._curved.value:
            r += [self._curve, self._period]
        return r


class CircusTent(WiredPattern):
    def __init__(self):
        self._base = CircusTentFeature()
        self._flux = FluxFeature(max_v=1/2)
        super(CircusTent, self).__init__("Circus Tent")
        self.features = [
            self._base,
            SpiralTopologyFeature(),
            SpinFeature(),
            FlickerFeature(max_v=1/2),
            FlitterFeature(max_v=1/2),
            self._flux,
            SparklesFeature(rainbow=self._base._rainbow, flux=self._flux),
            BlendFeature(),
        ]

class CoiledSpringFeature(Feature):
    def __init__(self,
                 topology: SpiralTopologyFeature,
                 spin: SpinFeature):
        self.topology = topology
        self.spin = spin
        self._delay = Control("Delay", [Option(str(v), v) for v in [
            0.5, 1, 1.5, 2, 3
        ]])
        self._split = Control("Split", FRACS)
        self._split_curved = ToggleControl("Split Curved")
        self._split_curve = Control("Split Curve", CURVES)
        self._split_period = Control("Split Period", PERIODS)
        self._rainbow = Control("Rainbow", FRACS)
        self._rainbow_curved = ToggleControl("Rainbow Curved")
        self._rainbow_curve = Control("Rainbow Curve", CURVES)
        self._rainbow_period = Control("Rainbow Period", PERIODS)

        super(CoiledSpringFeature, self).__init__("Coiled Spring", [
            self._delay,
            self._split,
            self._split_curved,
            self._split_curve,
            self._split_period,
            self._rainbow,
            self._rainbow_curved,
            self._rainbow_curve,
            self._rainbow_period,
        ])
        self._streamers = StreamerChoices(self._delay.value, [])

    @property
    def value(self):
        if self._split_curved.value:
            split = Curve(self._split_curve.value, mk_bump(
                self._split_period.value,
                self._split.value))
        else:
            split = self._split.value
        if self._rainbow_curved.value:
            rainbow = Curve(self._rainbow_curve.value, mk_bump(
                self._rainbow_period.value,
                self._rainbow.value))
        else:
            rainbow = self._rainbow.value

        base_color = WindowColor(1 - split, [
            BaseColor(w=1, s=0, l=-0.75, suppress=["sparkles", "streamers"]),
            BaseColor(),
        ])
        self._streamers = StreamerChoices(self._delay.value, [[StreamerValue(
            move_dir=Direction.FROM_BOT,
            spin_dir=Spin.CLOCKWISE,
            angle=(i / self.topology._repeats.value) + self.spin.value_param,
            spin=self.topology.value_param,
            length=2.0,
            width=split / self.topology._value.value,
            lifetime=self._delay.value,
            func=StreamerFunc(
                h= (i + o) * (rainbow / self.topology._value.value),
                w=0,
                s=1,
                l=0.0,
            ),
        ) for i in range(int(self.topology._value.value))] for o in range(4)])

        return {
            "base_color": base_color,
            "streamers": self._streamers,
        }

    def visible_controls(self) -> list[Control]:
        r = [self._delay]
        r += [self._split, self._split_curved]
        if self._split_curved.value:
            r += [self._split_curve, self._split_period]
        r += [self._rainbow, self._rainbow_curved]
        if self._rainbow_curved.value:
            r += [self._rainbow_curve, self._rainbow_period]
        return r

class CoiledSpring(WiredPattern):
    def __init__(self):
        self._topology = SpiralTopologyFeature(toggleable=False, force_curve=True)
        self._spin = SpinFeature()
        super(CoiledSpring, self).__init__("Coiled Spring")
        self.features = [
            CoiledSpringFeature(self._topology, self._spin),
            self._topology,
            self._spin,
            FlickerFeature(max_v=1/2),
            FlitterFeature(max_v=1/2),
            FluxFeature(max_v=1/2),
            BlendFeature(),
        ]

class ConfettiFeature(Feature):
    def __init__(self):
        self._direction = Control("Direction", [Option(n, v) for n, v in [
            ("\\u2193 ", [Direction.FROM_TOP]),
            ("\\u2191 ", [Direction.FROM_BOT]),
            ("\\u21c5 ", [Direction.FROM_TOP, Direction.FROM_TOP]),
        ]])
        self._delay = Control("Delay", [Option(str(v), v) for v in [
            0.25, 0.5, 0.75, 1.0, 1.5
        ]])
        self._min = Control("Min Streamers", [Option(str(v), v) for v in range(2)])
        self._max = Control("Max Streamers", [Option(str(v), v) for v in range(1, 5)])
        self._rainbow = Control("Rainbow", ZERO + FRACS)
        self._rainbow_curved = ToggleControl("Rainbow Curved")
        self._rainbow_curve = Control("Rainbow Curve", CURVES)
        self._rainbow_period = Control("Rainbow Period", PERIODS)
        super(ConfettiFeature, self).__init__("Confetti", [
            self._direction,
            self._delay,
            self._min,
            self._max,
            self._rainbow,
            self._rainbow_curved,
            self._rainbow_curve,
            self._rainbow_period,
        ])

    @property
    def value(self):
        if self._rainbow_curved.value:
            rainbow = Curve(self._rainbow_curve.value, mk_bounce(
                self._rainbow_period.value,
                self._rainbow.value,
                -self._rainbow.value,
            ))
        else:
            rainbow = self._rainbow.value
        streamers = CombinedChoices([
            StreamerChoices(
                self._delay.value, [[
                    StreamerValue(
                        move_dir=move_dir,
                        spin_dir=spin_dir,
                        spin=spin,
                        width=width,
                        length=choice([0.25, 0.5]),
                        lifetime=rand(3, 6),
                        func=RandomColorStreamerFunc(-rainbow / 2, rainbow / 2, w=0, s=1, l=0),
                    )
                    for spin_dir in [Spin.CLOCKWISE, Spin.COUNTERCLOCKWISE]
                    for spin, width in [(0.5, 0.1), (1, 0.15), (1.5, 0.2)]
                    for _ in range(4)
                ]],
                choose=(self._min.value, self._max.value))
            for move_dir in self._direction.value
        ])
        return {"streamers": streamers}
        
class Confetti(WiredPattern):
    def __init__(self):
        self._base = ConfettiFeature()
        self._flux = FluxFeature()
        super(Confetti, self).__init__("Confetti")
        self.features = [
            self._base,
            FlickerFeature(),
            self._flux,
            SparklesFeature(
                rainbow=self._base._rainbow,
                flux=self._flux,
            ),
            BlendFeature(),
        ]

class FallingSnowFeature(Feature):
    def __init__(self):
        self._colors = Control("Colors", [Option(str(v), v) for v in [
            6, 8, 10, 12, 16,
        ]])
        self._skip = Control("Color Skip", [Option(n, v) for n, v in [
            ("1/8", 1/8),
            ("1/6", 1/6),
            ("1/4", 1/4),
            ("1/3", 1/3),
            ("3/8", 3/8),
            ("1/2", 1/2),
            ("2/3", 2/3),
            ("5/8", 5/8),
            ("3/4", 3/4),
            ("5/6", 5/6),
            ("7/8", 7/8),
        ]])
        self._fade = Control("Fade", ZERO + [Option("ramp", "linear")] + CURVES)
        self._fade_direction = Control("Fade Direction", [Option(n, v) for n, v in [
            ("\\u2193 ", 1),
            ("\\u2191 ", -1),
        ]])

        super(FallingSnowFeature, self).__init__("Falling Snow", [
            self._colors,
            self._skip,
            self._fade,
            self._fade_direction,
        ])

    @property
    def value(self):
        if self._fade.value == 0:
            fade = self._fade.value
        elif self._fade.value == "linear":
            if self._fade_direction.value == 1:
                fade = Curve(linear, [(0, 0), (1, -1)])
            else:
                fade = Curve(linear, [(0, -1), (1, 0)])
        else:
            if self._fade_direction.value == 1:
                fade = Curve(self._fade.value, mk_bump(1, 0, -1))
            else:
                fade = Curve(self._fade.value, mk_bump(1, -1, 0))

        return {"base_color": FallingColor(
            self._colors.value,
            self._skip.value,
            fade_func=fade,
        )}

class FallingSnow(WiredPattern):
    def __init__(self):
        self._flux = FluxFeature(max_v=1/2)
        super(FallingSnow, self).__init__("Falling Snow")
        self.features = [
            FallingSnowFeature(),
            FlickerFeature(),
            FlitterFeature(max_v=1/2),
            self._flux,
            SparklesFeature(flux=self._flux),
            BlendFeature(),
        ]

class GalaxusFeature(Feature):
    def __init__(self, spin: SpinFeature):
        self.spin = spin
        self._spirals = Control("Spirals", INTS26)
        self._delay = Control("Delay", HALVES056)
        self._width = Control("Width", FRACS)
        self._width_curved = ToggleControl("Width Curved")
        self._width_curve = Control("Width Curve", CURVES)
        self._width_period = Control("Width Period", PERIODS[1:-3])
        self._rainbow = Control("Rainbow", FRACS)
        self._rainbow_curved = ToggleControl("Rainbow Curved")
        self._rainbow_curve = Control("Rainbow Curve", CURVES)
        self._rainbow_period = Control("Rainbow Period", PERIODS)
        super(GalaxusFeature, self).__init__("Galaxus", [
            self._spirals,
            self._delay,
            self._width,
            self._width_curved,
            self._width_curve,
            self._width_period,
            self._rainbow,
            self._rainbow_curved,
            self._rainbow_curve,
            self._rainbow_period,
        ])

    @property
    def value(self):
        if self._width_curved.value:
            width = Curve(self._width_curve.value, mk_bump(
                self._width_period.value,
                self._width.value,
            ))
        else:
            width = self._width.value
        if self._rainbow_curved.value:
            rainbow = Curve(self._rainbow_curve.value, mk_bump(
                self._rainbow_period.value,
                self._rainbow.value,
            ))
        else:
            rainbow = self._rainbow.value

        streamers = [
            [
                [
                    StreamerValue(
                        func=StreamerFunc(
                            w=0,
                            h=x * rainbow * ((i + 1) / (self._spirals.value + 1)),
                            s=1,
                            l=0,
                            make_white=True,
                            ignore_color=True,
                        ),
                        move_dir=m,
                        spin_dir=Spin.CLOCKWISE,
                        angle=(i / self._spirals.value) + self.spin.value_param + (y / self._spirals.value),
                        spin=spin,
                        width=width / self._spirals.value,
                        length=1.0,
                        lifetime=self._delay.value,
                    ) for i in range(self._spirals.value)
                ] for spin in [0.5, -0.5]
            ] for x, y, m in zip(
                [0.5, -0.5],
                [0, 0.5],
                [Direction.FROM_BOT, Direction.FROM_TOP],
            )
        ]
        self._streamers = CombinedChoices([
            StreamerChoices(self._delay.value, streamers[0]),
            StreamerChoices(self._delay.value, streamers[1], delay_offset=self._delay.value/2),
        ])

        return {"streamers": self._streamers}

    def visible_controls(self) -> list[Control]:
        if not self._width_curved.value:
            width = [self._width, self._width_curved]
        else:
            width = [self._width, self._width_curved, self._width_curve, self._width_period]
        if not self._rainbow_curved.value:
            rainbow = [self._rainbow, self._rainbow_curved]
        else:
            rainbow = [self._rainbow, self._rainbow_curved, self._rainbow_curve, self._rainbow_period]

        return [self._spirals, self._delay] + width + rainbow

class Galaxus(WiredPattern):
    def __init__(self):
        self._spin = SpinFeature()
        self._base = GalaxusFeature(self._spin)
        self._flux = FluxFeature(max_v=1/2)
        super(Galaxus, self).__init__("Galaxus")
        self.features = [
            self._base,
            self._spin,
            FlickerFeature(max_v=1/2),
            self._flux,
            SparklesFeature(
                rainbow=self._base._rainbow,
                flux=self._flux,
            ),
            BlendFeature(),
        ]

class GroovyFeature(Feature):
    def __init__(self):
        self._distort = Control("Distort", FRACS[:-3])
        self._distort_curved = ToggleControl("Distort Curved")
        self._distort_curve = Control("Distort Curve", CURVES)
        self._distort_period = Control("Distort Period", PERIODS[3:])
        self._distort_mid = Control("Distort Mid", FRACS[:-3])
        self._distort_mid_curved = ToggleControl("Distort Mid Curved")
        self._distort_mid_curve = Control("Distort Mid Curve", CURVES)
        self._distort_mid_period = Control("Distort Mid Period", PERIODS[3:])
        self._rainbow = Control("Rainbow", FRACS)
        self._rainbow_curved = ToggleControl("Rainbow Curved")
        self._rainbow_curve = Control("Rainbow Curve", CURVES)
        self._rainbow_period = Control("Rainbow Period", PERIODS)

        super(GroovyFeature, self).__init__("Groovy", [
            self._distort,
            self._distort_curve,
            self._distort_period,
            self._distort_mid,
            self._distort_mid_curve,
            self._distort_mid_period,
            self._rainbow,
            self._rainbow_curved,
            self._rainbow_curve,
            self._rainbow_period,
        ])

    @property
    def value(self):
        distort = Curve(self._distort_curve.value, mk_bounce(
            self._distort_period.value,
            self._distort.value,
            -self._distort.value,
        ))
        distort_mid = Curve(self._distort_mid_curve.value, mk_bounce(
            self._distort_mid_period.value,
            -self._distort_mid.value,
        ))
        if self._rainbow_curved.value:
            rainbow = Curve(self._rainbow_curve.value, mk_bounce(
                self._rainbow_period.value,
                -self._rainbow.value,
            ))
        else:
            rainbow = self._rainbow.value
        return {
            "base_color": SplitColor(6, [
                BaseColor(h=-rainbow, l=0.0, spread=False, suppress=["sparkles"]),
                BaseColor(l=-1),
                BaseColor(l=0.0, spread=False, suppress=["sparkles"]),
                BaseColor(l=0.0, spread=False, suppress=["sparkles"]),
                BaseColor(l=-1),
                BaseColor(h=rainbow, l=0.0, spread=False, suppress=["sparkles"]),
            ]),
            "topologies": [
                DistortTopology(
                    self._distort_curve.value,
                    distort,
                    -distort,
                    distort_mid,
                ),
                MirrorTopology(2),
            ],
        }

    def visible_controls(self) -> list[Control]:
        if not self._rainbow_curved.value:
            return [
                self._distort,
                self._distort_curve,
                self._distort_period,
                self._distort_mid,
                self._distort_mid_curve,
                self._distort_mid_period,
            ] + [
                self._rainbow,
                self._rainbow_curved
            ]
        else:
            return self.controls

class Groovy(WiredPattern):
    def __init__(self):
        self._base = GroovyFeature() 
        self._flux = FluxFeature(max_v=1/2)
        super(Groovy, self).__init__("Groovy")
        self.features = [
            self._base,
            FlickerFeature(),
            FlitterFeature(max_v=1/2),
            self._flux,
            SparklesFeature(
                rainbow=self._base._rainbow,
                flux=self._flux,
            ),
            BlendFeature(),
        ]

class RainbowStormFeature(Feature):
    def __init__(self):
        self._fade = Control("Fade", ZERO + [Option("ramp", "linear")] + CURVES)
        self._fade_direction = Control("Fade Direction", [Option(n, v) for n, v in [
            ("\\u2193 ", 1),
            ("\\u2191 ", -1),
        ]])
        self._period0 = Control("Period0", PERIODS)
        self._period1 = Control("Period1", PERIODS)
        self._period2 = Control("Period2", PERIODS)
        self._period3 = Control("Period3", PERIODS)
        self._rainbow = Control("Rainbow", FRACS)
        self._rainbow_curved = ToggleControl("Rainbow Curved")
        self._rainbow_curve = Control("Rainbow Curve", CURVES)
        self._rainbow_period = Control("Rainbow Period", PERIODS)
        super(RainbowStormFeature, self).__init__("Rainbow Storm", [
            self._fade,
            self._fade_direction,
            self._period0,
            self._period1,
            self._period2,
            self._rainbow,
            self._rainbow_curved,
            self._rainbow_curve,
            self._rainbow_period,
        ])

    @property
    def value(self):
        if self._fade.value == 0:
            fade = self._fade.value
        elif self._fade.value == "linear":
            if self._fade_direction.value == 1:
                fade = Curve(linear, [(0, 0), (1, -1)])
            else:
                fade = Curve(linear, [(0, -1), (1, 0)])
        else:
            if self._fade_direction.value == 1:
                fade = Curve(self._fade.value, mk_bump(1, 0, -1))
            else:
                fade = Curve(self._fade.value, mk_bump(1, -1, 0))
            
        if self._rainbow_curved.value:
            rainbow = Curve(self._rainbow_curve.value, mk_bounce(
                self._rainbow_period.value,
                self._rainbow.value,
                -self._rainbow.value
            )) / 2
        else:
            rainbow = self._rainbow.value / 2
        return {
            "base_color": SplitColor(3, [
                FallingColor(8, 3/8, period=self._period0.value, fade_func=fade),
                FallingColor(12, 5/12, period=self._period1.value,
                             hue_func=rainbow,
                             fade_func=fade),
                FallingColor(16, 7/16, period=self._period2.value,
                             hue_func=-rainbow,
                             fade_func=fade),
            ])
        }

    def visible_controls(self) -> list[Control]:
        if not self._rainbow_curved.value:
            return self.controls[:-3]
        else:
            return self.controls
    
class RainbowStorm(WiredPattern):
    def __init__(self):
        self._base = RainbowStormFeature()
        self._flux = FluxFeature(max_v=1/2)
        super(RainbowStorm, self).__init__("Rainbow Storm")
        self.features = [
            self._base,
            SpiralTopologyFeature(),
            SpinFeature(),
            FlickerFeature(max_v=1/2),
            FlitterFeature(max_v=1/2),
            self._flux,
            SparklesFeature(
                rainbow=self._base._rainbow,
                flux=self._flux,
            ),
            BlendFeature(),
        ]

class SlidingDoorFeature(Feature):
    def __init__(self):
        self._window_curve = Control("Window Curve", CURVES)
        self._window_period = Control("Window Period", PERIODS)
        self._rainbow = Control("Rainbow", FRACS)
        self._rainbow_curved = ToggleControl("Rainbow Curved")
        self._rainbow_curve = Control("Rainbow Curve", CURVES)
        self._rainbow_period = Control("Rainbow Period", PERIODS)
        self._streamers = ToggleControl("Streamers")
        self._streamer_delay = Control("Streamer Delay", HALVES056)
        super(SlidingDoorFeature, self).__init__("Sliding Door", [
            self._window_curve,
            self._window_period,
            self._rainbow,
            self._rainbow_curved,
            self._rainbow_curve,
            self._rainbow_period,
            self._streamers,
            self._streamer_delay,
        ])

    @property
    def value(self):
        window = Curve(self._window_curve.value, mk_bump(
            self._window_period.value, 1))

        if self._rainbow_curved.value:
            rainbow = Curve(self._rainbow_curve.value, mk_bounce(
                self._rainbow_period.value,
                self._rainbow.value,
                -self._rainbow.value,
            ))
            spread = Curve(self._rainbow_curve.value, mk_bump(
                self._rainbow_period.value,
                self._rainbow.value / 2,
                -self._rainbow.value / 2,
            ))
        else:
            rainbow = self._rainbow.value
            spread = self._rainbow.value / 2
            
        if self._streamers.value:
            s = [
                [
                    [
                        StreamerValue(
                            move_dir=move_dir,
                            spin_dir=spin_dir,
                            spin=Curve(const, mk_bump(self._streamer_delay.value * 2, 1, 0.5)),
                            length=1.0,
                            width=Curve(const, mk_bump(self._streamer_delay.value * 2, 0.1, 0.15)),
                            lifetime=2 * self._streamer_delay.value,
                            func=func,
                        ) for spin_dir in [Spin.CLOCKWISE, Spin.COUNTERCLOCKWISE]
                    ] for move_dir in [Direction.FROM_BOT, Direction.FROM_TOP]
                ] for func in [
                    StreamerFunc(h=rainbow * 0.25, l=0, make_white=True),
                    StreamerFunc(h=-rainbow * 0.25, l=0.75, make_white=True),
                ]
            ]
            streamers = CombinedChoices([
                StreamerChoices(self._streamer_delay.value, s[0]),
                StreamerChoices(self._streamer_delay.value, s[1]),
            ])
        else:
            streamers = []
        
        return {
            "base_color": WindowColor(window, [
                BaseColor(spread=False),
                BaseColor(h=rainbow, l=0, suppress=["sparkles", "streamers"], spread=False),
            ]),
            "spread": spread,
            "streamers": streamers,
        }

    def visible_controls(self) -> list[Control]:
        window = [self._window_curve, self._window_period]
        if not self._rainbow_curved.value:
            rainbow = [
                self._rainbow,
                self._rainbow_curved,
                self._rainbow_curve,
                self._rainbow_period,
            ]
        else:
            rainbow = [
                self._rainbow,
                self._rainbow_curved,
                self._rainbow_curve,
                self._rainbow_period,
            ]
        if not self._streamers.value:
            streamers = [self._streamers]
        else:
            streamers = [self._streamers, self._streamer_delay]
        return window + rainbow + streamers

class SlidingDoor(WiredPattern):
    def __init__(self):
        self._base = SlidingDoorFeature()
        self._flux = FluxFeature()
        super(SlidingDoor, self).__init__("Sliding Door")
        self.features = [
            self._base,
            SpiralTopologyFeature(),
            SpinFeature(),
            FlickerFeature(max_v=1/2),
            FlitterFeature(max_v=1/2),
            self._flux,
            SparklesFeature(
                rainbow=self._base._rainbow,
                flux=self._flux,
            ),
            BlendFeature(),
        ]

class SpiralTopFeature(Feature):
    def __init__(self):
        self._window_period = Control("Window Period", PERIODS[:6])
        self._window_curve = Control("Window Curve", CURVES)
        self._spread = Control("Spread", FRACS[1:-1])
        super(SpiralTopFeature, self).__init__("Spiral Top", [
            self._window_period,
            self._window_curve,
            self._spread,
        ])

    @property
    def value(self):
        return {
            "base_color": WindowColor(Curve(self._window_curve.value, [
                (0, 0),
                (self._window_period.value, 1),
            ])),
            "spread": self._spread.value,
        }

class SpiralTop(WiredPattern):
    def __init__(self):
        self._base = SpiralTopFeature() 
        self._flux = FluxFeature(max_v=1/2)
        super(SpiralTop, self).__init__("Spiral Top")
        self.features = [
            self._base,
            SpiralTopologyFeature(toggleable=False, force_curve=True),
            SpinFeature(),
            FlickerFeature(max_v=1/2),
            FlitterFeature(max_v=1/2),
            self._flux,
            SparklesFeature(
                rainbow=self._base._spread,
                flux=self._flux,
            ),
            BlendFeature(),
        ]
`,"core.py":`import io
import math
from pytweening import linear, easeInOutCubic, easeInOutSine
import random
import time
from typing import Callable

from control import MusicFeature, WiredPattern
from layout import normalize
from music import BeatClock, Sound
from param import getv, Curve
from streamer import Streamer, StreamerValue, getv_streamers
from utils import coverage
from walk import Walk

# A light's color as it goes to the tree: W, R, G and B, each 0 to 255. Frames are mixed in these.
WRGB = tuple[float, float, float, float]

FRAME = 1/16

# The music links. A beat counts once the page is this sure of it
BEAT_CONFIDENCE = 0.3
# The base hue's anchors on xled_plus's 8col wheel, gliding from blue for dark music through
# violet and pink to orange for bright
COOL_HUE = 1.0
WARM_HUE = 0.5
PALETTE_GLIDE = 8.0
# A flash's decay, in seconds, from groove to drive, and the sectors that chase round the trunk
FLASH_DECAY = (0.4, 0.12)
SECTORS = 4
SECTOR_EDGE = 0.05
# With Feel: a control's glide from groove to drive, a change's length in groove, and in drive
# the bars a change lasts, from one bar line to another
FEEL_GLIDE = (2.0, 0.25)
GROOVE_CHANGE = 12.0
DRIVE_BARS = 2

def wrap(x: float) -> float:
    """x round a turn, the short way: from -0.5 to 0.5."""
    return ((x + 0.5) % 1) - 0.5

def wait_for(next_frame: float) -> float:
    """Sleeps until next_frame and gives the frame after it. Once more than a frame late, it
    counts again from now rather than rushing frames out to catch up."""
    delay = next_frame - time.time()
    if delay > 0:
        time.sleep(delay)
    elif delay < -FRAME:
        return time.time() + FRAME
    return next_frame + FRAME

class Pixel:
    def __init__(self, idx, x, y, z):
        self.idx = idx  # across every strand
        self.x = x
        self.y = y
        self.z = z
        self.t = ((math.atan2(z, x) / math.pi) + 1) / 2

class SmoothNoise:
    """For each light, a value from 0 to 1 easing between random targets at its own rate and phase."""
    targets = 32

    def __init__(self, count: int):
        self.rates = [random.uniform(1.0, 3.0) for _ in range(count)]
        self.phases = [random.uniform(0, self.targets) for _ in range(count)]
        self.values = [[random.random() for _ in range(self.targets)] for _ in range(count)]

    def __call__(self, idx: int, t: float) -> float:
        s = (t * self.rates[idx]) + self.phases[idx]
        k = math.floor(s)
        values = self.values[idx]
        a = values[k % self.targets]
        b = values[(k + 1) % self.targets]
        return a + ((b - a) * easeInOutSine(s - k))

class Run:
    """One turn of a pattern, from when it starts to fade in, with its own clock, sparkles and streamers."""
    def __init__(self, pattern: WiredPattern, start: float):
        self.pattern = pattern
        self.start = start
        self.sparkles: dict[int, float] = {}  # light index: when it lit, on the run's clock
        self.next_sparkle = 0.0
        self.streamers: list[Streamer] = []
        self.next_streamer = 0.0
        self.last_streamer_t: float | None = None

class Change:
    """A fade from a source (a live run or a frozen frame) to a run."""
    def __init__(self, source: Run | list[WRGB], run: Run, start: float, length: float, shape: str):
        self.source = source
        self.run = run
        self.start = start
        self.length = length
        self.shape = shape

class Blender:
    sparkle_delay = 0.25
    streamer_delay = 0.25
    pattern_length = 60.0
    transition_length = 6.0
    glide_length = 0.5
    # the soft edge of the sweep, rise and spiral transitions, as a share of their way across
    transition_edge = 0.25
    spiral_turns = 2

    def __init__(self,
                 patterns: list[WiredPattern],
                 lights,
                 start_idx: int | None=None,
                 pause_change: bool=False):
        self.lights = lights
        self.patterns = patterns
        self.pause_change = pause_change
        self._blend_func = Curve(linear, [(0, 0), (66, 1)])
        lights_layout = [light for interface in lights.interfaces for light in interface.layout]
        self.pixels = [Pixel(idx, **light) for idx, light in enumerate(normalize(lights_layout))]
        self.noise = {name: SmoothNoise(len(self.pixels)) for name in ["flash", "flicker", "flitter", "flux"]}
        self.running = False
        pattern = self.patterns[
            start_idx
            if start_idx is not None else
            random.randint(0, len(patterns) - 1)
        ]
        pattern.randomize()
        self.run = Run(pattern, 0.0)
        self.next_pattern = self._pick_next()
        # the autopilot, stopped by pause_change
        self.walk = Walk()
        self.change: Change | None = None
        self.frame: list[WRGB] | None = None
        self.glide_from: list[WRGB] | None = None
        self.glide_start = 0.0
        self._init_t = 0.0
        self._t = 0.0
        # called with each frame's bytes as write sends them, every strand's in turn
        self.on_frame: Callable[[bytes], None] | None = None

        # the music: its feature and beat clock, and what they give the frame on show
        self.music = MusicFeature()
        self.beat = BeatClock()
        self.links = self.music.value
        self.sound: Sound | None = None  # None with Music off or no page listening
        self.beating = False  # a tempo the page is sure of
        self.on_beat: tuple[int, float] | None = None  # the beat this frame is nearest, its number and time
        self._last_beat: int | None = None
        self._last_position: float | None = None
        self._flash: tuple[int, float] | None = None  # the last flash's beat and time
        self.dt = 0.0  # the seconds since the frame before, as _listen takes them
        self.sparkle_roll = self.sparkle_delay
        self.spin_angle = 0.0
        self.hue_shift = 0.0
        # the remote's spin ring: a turn it adds for every light, beside the spin lock's, kept
        # where the drag leaves it
        self.ring_angle = 0.0

    @property
    def pattern(self) -> WiredPattern:
        return self.run.pattern

    @property
    def transitioning(self) -> bool:
        return self.change is not None

    def _pick_next(self) -> WiredPattern:
        choice = random.choice([p for p in self.patterns if p.name != self.pattern.name])
        choice.randomize()
        return choice

    def init(self, t: float):
        for interface in self.lights.interfaces:
            interface.set_mode("rt")

        self._init_t = t
        self._t = t
        self.run = Run(self.pattern, t)
        self.change = None
        self.walk.last_step = t
        self.running = True

    def _listen(self, t: float):
        """Reads the beat clock for the frame at t: the sound, the beat the frame is nearest, and the
        sparkles' roll, spin and base hue the music sets."""
        dt = min(max(t - self._t, 0.0), 0.25)
        self.dt = dt
        links = self.music.value
        sound = self.beat.at(t, links["latency"]) if links["on"] else None
        self.links = links
        self.sound = sound
        self.beating = sound is not None and sound.bpm > 0 and sound.confidence >= BEAT_CONFIDENCE
        self.on_beat = None
        glide = 1 - math.exp(-3 * dt / PALETTE_GLIDE)
        locked = self.beating and links["spin"]
        if self.beating:
            # the frame nearest each beat takes it
            per_frame = FRAME * sound.bpm / 60
            n = math.floor(sound.beat + (per_frame / 2))
            if self._last_beat is not None and n > self._last_beat:
                self.on_beat = (n, t + ((n - sound.beat) * 60 / sound.bpm))
                if links["flash"]:
                    self._flash = self.on_beat
            if locked and self._last_position is not None:
                # one turn every so many bars at the beat's pace, a jump in the beat moving nothing,
                # drawn round to its place in the bars, a turn starting on every so many bar lines
                bars = 4 * links["spin"]
                step = sound.beat - self._last_position
                if abs(step) < 4 * per_frame:
                    self.spin_angle += step / bars
                self.spin_angle += wrap((sound.beat / bars) - self.spin_angle) * (1 - math.exp(-dt / 2))
            self._last_beat = n
            self._last_position = sound.beat
        else:
            self._last_beat = None
            self._last_position = None
        if not locked:
            # let go, the tree turns back home the short way
            self.spin_angle -= wrap(self.spin_angle) * glide

        self.sparkle_roll = self.sparkle_delay
        if sound is not None and links["sparkles"]:
            self.sparkle_roll += (FRAME - self.sparkle_delay) * sound.high

        # while the music pulls it, the base hue leaves its clock and glides toward the tone's anchor;
        # after, the shift from the clock glides away
        if sound is not None and links["palette"]:
            anchor = COOL_HUE + ((WARM_HUE - COOL_HUE) * sound.tone)
            hue = getv(self._blend_func, self._t - self._init_t) + self.hue_shift
            hue += wrap(anchor - hue) * glide
            self.hue_shift = hue - getv(self._blend_func, t - self._init_t)
        else:
            self.hue_shift -= wrap(self.hue_shift) * glide

    @property
    def feel(self) -> float | None:
        """The music's drive while Feel is on and the page listens, else None."""
        if self.sound is None or not self.links["feel"]:
            return None
        return self.sound.drive

    @property
    def lands_on_bars(self) -> bool:
        feel = self.feel
        return feel is not None and feel >= 0.5 and self.beating

    def _flash_at(self, t: float) -> float:
        """The flash's envelope at t: full on its beat's frame, decaying faster the more the drive."""
        if self._flash is None or self.sound is None or not self.links["flash"]:
            return 0.0
        slow, fast = FLASH_DECAY
        decay = slow + ((fast - slow) * self.sound.drive)
        since = max(0.0, t - self._flash[1])
        return max(0.0, 1 - (since / decay)) ** 2

    def _launch(self, run: Run, streamer_defs: list[StreamerValue], t: float, step: float | None=None):
        # a step turns each streamer round the trunk, putting one with no angle of its own at the step
        run.streamers.extend([
            Streamer(
                t,
                t,
                streamer_def.func,
                streamer_def.move_dir,
                streamer_def.spin_dir,
                streamer_def.angle if step is None else (
                    step if streamer_def.angle is None else streamer_def.angle + step),
                streamer_def.spin,
                streamer_def.length,
                streamer_def.width,
                streamer_def.lifetime,
            )
            for streamer_def in streamer_defs
        ])

    def _spawn(self, run: Run, t: float):
        pattern = run.pattern
        sound = self.sound
        if t >= run.next_sparkle:
            run.next_sparkle += self.sparkle_roll
            if pattern.grain == "raw":
                run.sparkles.clear()
            else:
                run.sparkles = {i: lit for i, lit in run.sparkles.items() if t - lit < 2 * self.sparkle_roll}
            count = len(self.pixels)
            share = getv(pattern.sparkles, t)
            if sound is not None and self.links["sparkles"]:
                # the highs make more of them, and each band's sit at its height: bass on the wide base,
                # treble at the narrow top
                weights = [
                    (sound.low * (1 - p.y) ** 2) + (sound.mid * 4 * p.y * (1 - p.y)) + (sound.high * p.y ** 2) + 0.01
                    for p in self.pixels
                ]
                k = int(count * share * (0.25 + (1.5 * sound.high)))
                picks = random.choices(range(count), weights=weights, k=k)
            else:
                picks = random.choices(range(count), k=int(count * share))
            for idx in picks:
                run.sparkles.setdefault(idx, t)

        every = self.links["streamers"] if self.beating else 0
        if every:
            # the pattern's own streamers, launched on the beat, each launch a quarter turn on
            run.next_streamer = t
            run.streamers = [streamer for streamer in run.streamers if streamer.alive(t)]
            if self.on_beat is not None and self.on_beat[0] % every == 0:
                n, at = self.on_beat
                self._launch(run, getv_streamers(pattern.streamers, t, None), at - run.start, ((n // every) % 4) / 4)
        elif t >= run.next_streamer:
            run.next_streamer += self.streamer_delay
            streamer_defs = getv_streamers(pattern.streamers, t, run.last_streamer_t)
            run.last_streamer_t = t
            run.streamers = [streamer for streamer in run.streamers if streamer.alive(t)]
            self._launch(run, streamer_defs, t)

    def _sparkle(self, run: Run, idx: int, t: float) -> float:
        # raw sparkles are on or off; smooth ones fade in and out over their life
        lit = run.sparkles.get(idx)
        if lit is None:
            return 0.0
        if run.pattern.grain == "raw":
            return 1.0
        age = min(1.0, (t - lit) / (2 * self.sparkle_roll))
        fade = math.sin(math.pi * age) ** 2
        feel = self.feel
        if feel is not None:
            # the drive snaps them on and lets them fall away
            fade += ((1 - age) ** 2 - fade) * feel
        return fade

    def _render(self, run: Run, now: float) -> list[WRGB]:
        pattern = run.pattern
        t = now - run.start
        self._spawn(run, t)
        clock = now - self._init_t
        blend_h = getv(self._blend_func, clock) + self.hue_shift
        spread_h = getv(pattern.spread, t)
        spin = getv(pattern.spin, t)
        spiral = getv(pattern.spiral, t)
        topologies = [topology(t) for topology in pattern.topologies]
        streamers = [(streamer, *streamer.place(t)) for streamer in run.streamers]
        smooth = pattern.grain != "raw"
        effects = {
            "flash": getv(pattern.flash, t),
            "flicker": getv(pattern.flicker, t),
            "flitter": getv(pattern.flitter, t),
            "flux": getv(pattern.flux, t),
        }

        # the frame's beats while the music's tempo is sure, else one a second
        pattern.base_color.frame(self.dt * (self.sound.bpm / 60 if self.beating else 1), self.dt)
        # an effect works out every light's layers once a frame, before the lights ask for them
        beat = self.on_beat[0] if self.on_beat is not None else None
        pattern.step(t, self.pixels, self.sound, self.beating, beat, blend_h)

        beat_flash = self._flash_at(now)
        chase = self.links["flash"] == "chase" and self._flash is not None
        sector = (self._flash[0] % SECTORS) / SECTORS if chase else 0.0

        def grain(name: str, idx: int) -> float:
            return effects[name] * (self.noise[name](idx, clock) if smooth else random.random())

        frame = []
        for pixel in self.pixels:
            pixel_t = (pixel.t + spin + self.spin_angle + self.ring_angle + (spiral * pixel.y)) % 1
            flash = beat_flash
            if flash and chase:
                flash *= coverage(pixel.t, sector, sector + (1 / SECTORS), SECTOR_EDGE)
            for topology in topologies:
                pixel_t = topology(pixel_t, pixel.y)

            sparkle = self._sparkle(run, pixel.idx, t)
            covering = []
            for streamer, miny, angle in streamers:
                c = streamer.coverage(pixel, miny, angle)
                if c > 0:
                    covering.append((streamer, c))

            w = r = g = b = 0.0
            for weight, color, suppress in pattern.base_color(t, blend_h, spread_h, pixel_t, pixel.y, pixel):
                if effects["flash"] and "flash" not in suppress and color.l != -1.0:
                    color.l -= grain("flash", pixel.idx)
                if flash and "flash" not in suppress and color.l != -1.0:
                    # the beat's flash lifts the light toward white
                    color.l += 0.8 * flash * (1 - color.l)
                if effects["flicker"] and "flicker" not in suppress:
                    color.w += grain("flicker", pixel.idx)
                if effects["flitter"] and "flitter" not in suppress and color.s != 0.0:
                    color.s -= grain("flitter", pixel.idx)
                if effects["flux"] and "flux" not in suppress:
                    color.h += grain("flux", pixel.idx) - (effects["flux"] / 2)

                # each soft sparkle or streamer edge splits the color into a part with and a part without
                parts = [(weight, color)]
                if sparkle and "sparkles" not in suppress:
                    parts = [(weight * (1 - sparkle), color), (weight * sparkle, pattern.sparkle_func(color))]
                if "streamers" not in suppress:
                    for streamer, c in covering:
                        split = []
                        for part_weight, part_color in parts:
                            split.append((part_weight * (1 - c), part_color))
                            split.append((part_weight * c, streamer.func(part_color, t, blend_h)))
                        parts = split

                for weight, color in parts:
                    if weight > 0:
                        cw, cr, cg, cb = color.as_wrgb()
                        w += weight * cw
                        r += weight * cr
                        g += weight * cg
                        b += weight * cb
            frame.append((w, r, g, b))

        return frame

    def _mix(self, a: list[WRGB], b: list[WRGB], progress: float, shape: str="crossfade") -> list[WRGB]:
        """a turning into b, progress (0 to 1) of the way, eased once a frame. Every shape but the
        crossfade turns each light over in its turn: by its angle, its height, or its place on a
        spiral winding up the tree."""
        mix = easeInOutCubic(min(1.0, max(0.0, progress)))
        edge = self.transition_edge
        frame = []
        for pixel, ca, cb in zip(self.pixels, a, b):
            if shape == "crossfade":
                m = mix
            else:
                if shape == "sweep":
                    key = pixel.t
                elif shape == "rise":
                    key = pixel.y
                else:
                    key = ((pixel.y * self.spiral_turns) + pixel.t) / (self.spiral_turns + 1)
                m = min(1.0, max(0.0, ((mix * (1 + edge)) - key) / edge))
            frame.append(tuple(x + ((y - x) * m) for x, y in zip(ca, cb)))
        return frame

    @property
    def mark(self) -> str:
        """? not saved, ! saved, * changed since."""
        pattern_state = "?"
        if self.pattern.configured:
            pattern_state = "!"
        if self.pattern.dirty:
            pattern_state = "*"
        return pattern_state

    @property
    def pattern_name(self) -> str:
        if self.change is not None:
            return f"{self.pattern.name}->{self.change.run.pattern.name}"
        else:
            return f"{self.pattern.name}{self.mark}"

    @property
    def time_str(self) -> str:
        if self.change is not None:
            left = self.change.start + self.change.length - self._t
        else:
            left = self.walk.left(self)
        if self.pause_change:
            if self.change is not None:
                return f"(PAUSED) -{left:.2f}"
            else:
                return f"(PAUSED) {(self._t - self._init_t):.2f}"
        return f"-{left:.2f}"

    def start_transition(self, next: int | None=None, bars: bool=False):
        """A change to the next pattern, or the one at next. With bars, it lasts whole bars, as an
        automatic change in drive does from the bar line it starts on."""
        if next is not None:
            self.next_pattern = self.patterns[next]
        self.next_pattern.randomize()
        self.walk.pins.clear()
        source: Run | list[WRGB] = self.run
        if self.frame is not None and (self.change is not None or self.next_pattern is self.pattern):
            # a switch in the middle of a change, or to the pattern on show: fade from the frame on
            # show, frozen, so nothing jumps back
            source = self.frame
            if self.change is not None:
                self.run = self.change.run
        self.change = Change(
            source,
            Run(self.next_pattern, self._t),
            self._t,
            DRIVE_BARS * 4 * 60 / self.sound.bpm if bars else self._change_length(),
            self.next_pattern.transition,
        )

    def _change_length(self) -> float:
        # with Feel, the more the groove, the longer the change
        feel = self.feel
        if feel is None:
            return self.transition_length
        return GROOVE_CHANGE + ((self.transition_length - GROOVE_CHANGE) * min(1.0, feel * 2))

    def glide(self):
        # eases the tree from the frame on show into the pattern's new settings
        if self.frame is not None:
            self.glide_from = self.frame
            self.glide_start = self._t

    def render(self, t: float) -> list[WRGB]:
        self._listen(t)
        self._t = t
        if self.change is None and not self.pause_change and self.walk.due(self):
            self.walk.step(self)
        if self.change is not None and t >= self.change.start + self.change.length:
            self.run = self.change.run
            self.change = None
            self.next_pattern = self._pick_next()
            # the pins were the last pattern's, and the walk's next step counts from here
            self.walk.pins.clear()
            self.walk.last_step = t

        if self.change is None:
            frame = self._render(self.run, t)
        else:
            change = self.change
            source = change.source if isinstance(change.source, list) else self._render(change.source, t)
            frame = self._mix(source, self._render(change.run, t), (t - change.start) / change.length, change.shape)

        if self.glide_from is not None:
            glide_length = self.glide_length
            feel = self.feel
            if feel is not None:
                groove, drive = FEEL_GLIDE
                glide_length = groove + ((drive - groove) * feel)
            progress = (t - self.glide_start) / glide_length
            if progress >= 1:
                self.glide_from = None
            else:
                frame = self._mix(self.glide_from, frame, progress)

        self.frame = frame
        return frame

    def write(self, frame: list[WRGB]):
        start = 0
        sent = []
        for interface in self.lights.interfaces:
            end = start + len(interface.layout)
            data = bytes(int(c + 0.5) for light in frame[start:end] for c in light)
            interface.set_rt_frame_socket(io.BytesIO(data), 3)
            sent.append(data)
            start = end
        if self.on_frame is not None:
            self.on_frame(b"".join(sent))

    def animate(self):
        start_time = time.time()
        self.init(start_time)
        next_frame = start_time + FRAME
        while self.running:
            colors = self.render(time.time())
            self.write(colors)
            next_frame = wait_for(next_frame)
`,"effects.py":`"""Ten effects in the tree's 3D space: Aurora, Fireflies, Fireworks, Ripples, Lava lamp, Comets,
Hearth, Lightning, Drips and Heartbeat.

Each is a WiredPattern whose base color is its Effect. Once a frame, before the lights, the Blender
calls the pattern's step with the run's clock, every light, the music and the base hue, and the
effect works out each light's layers from its x, y and z: (cover, (w, h, s, l)), how much of a shape
covers the light and its colour in Color's terms. Then the Blender asks for each light in turn, and
the effect gives it those layers and an off one making up the rest, mixed in light as WRGB the way
the other patterns' are, so transitions and glides work on them as they do.

Each develops over the minute rather than holding one look: one of its knobs sweeps as a Curved
knob of control.py's patterns does (a hint's Sweep), Curved, from its rest to its value and back each
Period of the run's clock, in seconds; Comets' and Ripples' look moves on through their own state.

Grain raw hardens the soft edges, a light in or out; only the rainbow palettes turn with the base
hue's 66 s clock. With Music on, a beat and the bands drive each effect's knobs as its notes say; off,
they play as set."""
import math
import random

from colors import BaseColor, Color
from control import BlendFeature, Control, Feature, Option, WiredPattern
from hints import HintFeature, Sweep
from param import getv
from utils import mk_ramp

# Hues on xled_plus's 8col circle: blue 0, cyan 1/8, green 2/8, yellow 3/8, orange 4/8, red 5/8,
# magenta 6/8, purple 7/8
BLUE, CYAN, GREEN, YELLOW, ORANGE, RED, MAGENTA, PURPLE = [i / 8 for i in range(8)]

# A layer's colour as (w, h, s, l), Color's own terms
FULL = lambda h: (0.0, h % 1, 1.0, 0.0)
WARM_WHITE = (1.0, 0.0, 0.0, -1.0)  # the W LEDs alone
COOL_WHITE = (0.6, CYAN, 0.25, -0.35)

# The palette that turns with the base hue, in every effect that has one
RAINBOW = "rainbow"
# With grain raw, a light more covered than this is in, the rest out
RAW_EDGE = 0.35
# The music: how quickly an effect follows the bands, in seconds, and a beat's swell, rising and
# falling away
BAND_GLIDE = 0.3
SWELL_RISE = 0.15
SWELL_FALL = 0.35
# A swept knob's Curve and Period as an effect starts: a sine in and out over about half a minute
SWEEP_CURVE = "sineIO"
SWEEP_PERIOD = "32"
# How far a swept share runs at its far end: Aurora's Surge, Fireworks' Build, the Lava lamp's Heat
# and Lightning's Storm
SHARES = [("1/2", 1/2), ("3/4", 3/4), ("1", 1)]


# --- shared pieces ---------------------------------------------------------------------------

def smoothstep(a, b, x):
    if x <= a:
        return 0.0
    if x >= b:
        return 1.0
    x = (x - a) / (b - a)
    return x * x * (3 - 2 * x)

def bump(d2, s2):
    """A soft round spot: 1 at its middle, 0 from size s out, d2 and s2 squared."""
    q = 1.0 - d2 / s2
    return q * q if q > 0 else 0.0

def lerp_h(a, b, m):
    """A hue m of the way from a to b, the short way round."""
    d = ((b - a + 0.5) % 1) - 0.5
    return (a + d * m) % 1

def mix(a, b, m):
    """A colour m of the way from a to b, its hue the short way round."""
    return (a[0] + (b[0] - a[0]) * m, lerp_h(a[1], b[1], m), a[2] + (b[2] - a[2]) * m, a[3] + (b[3] - a[3]) * m)

def turned(color, hue):
    """A colour turned round the wheel by hue."""
    w, h, s, l = color
    return (w, (h + hue) % 1, s, l)

def banded(value, band):
    """A knob's value as a band drives it: half at a quiet band, as set at a middling one, half as
    much again at a loud one."""
    return value * (0.5 + band)

def seg_dist2(p, a, b):
    """How far p is from the segment a to b, squared."""
    ax, ay, az = a
    dx, dy, dz = b[0] - ax, b[1] - ay, b[2] - az
    px, py, pz = p[0] - ax, p[1] - ay, p[2] - az
    den = dx * dx + dy * dy + dz * dz
    u = 0.0 if den == 0 else max(0.0, min(1.0, (px * dx + py * dy + pz * dz) / den))
    return (px - u * dx) ** 2 + (py - u * dy) ** 2 + (pz - u * dz) ** 2

class Noise3:
    """Smooth value noise in 3D, 0 to 1, and its sum over octaves."""
    def __init__(self):
        rnd = random.Random(random.random())
        perm = list(range(256))
        rnd.shuffle(perm)
        self.perm = perm + perm
        self.values = [rnd.random() for _ in range(256)]

    def __call__(self, x, y, z):
        p, v = self.perm, self.values
        xi, yi, zi = math.floor(x), math.floor(y), math.floor(z)
        xf, yf, zf = x - xi, y - yi, z - zi
        xi, yi, zi = xi & 255, yi & 255, zi & 255
        u = xf * xf * (3 - 2 * xf)
        w = yf * yf * (3 - 2 * yf)
        s = zf * zf * (3 - 2 * zf)
        a, b = p[xi] + yi, p[xi + 1] + yi
        aa, ab, ba, bb = p[a] + zi, p[a + 1] + zi, p[b] + zi, p[b + 1] + zi
        x00 = v[p[aa]] + u * (v[p[ba]] - v[p[aa]])
        x10 = v[p[ab]] + u * (v[p[bb]] - v[p[ab]])
        x01 = v[p[aa + 1]] + u * (v[p[ba + 1]] - v[p[aa + 1]])
        x11 = v[p[ab + 1]] + u * (v[p[bb + 1]] - v[p[ab + 1]])
        y0 = x00 + w * (x10 - x00)
        y1 = x01 + w * (x11 - x01)
        return y0 + s * (y1 - y0)

    def fbm(self, x, y, z, octaves=2):
        total, amp, norm = 0.0, 1.0, 0.0
        for _ in range(octaves):
            total += amp * self(x, y, z)
            norm += amp
            x, y, z, amp = x * 2.03, y * 2.03, z * 2.03, amp * 0.5
        return total / norm

class Grid:
    """The lights by cell, so a spot finds the lights near it without looking at all 800."""
    def __init__(self, points, cell=0.1):
        self.cell = cell
        self.cells = {}
        for i, (x, y, z) in enumerate(points):
            self.cells.setdefault(self._key(x, y, z), []).append(i)

    def _key(self, x, y, z):
        c = self.cell
        return (math.floor(x / c), math.floor(y / c), math.floor(z / c))

    def near(self, x, y, z, radius):
        kx, ky, kz = self._key(x, y, z)
        r = max(1, math.ceil(radius / self.cell))
        for dx in range(-r, r + 1):
            for dy in range(-r, r + 1):
                for dz in range(-r, r + 1):
                    yield from self.cells.get((kx + dx, ky + dy, kz + dz), ())

class Trail:
    """A fading glow on each light: what passed over it, and its colour."""
    def __init__(self, count, attack=None):
        self.cover = [0.0] * count
        self.color = [WARM_WHITE] * count
        # the most a light brightens in a frame, so a quick spot glides on rather than pops
        self.attack = attack
        self.start = list(self.cover)

    def deposit(self, i, c, color):
        old = self.cover[i]
        if c <= 0.002:
            return
        if old < 0.01:
            self.color[i] = color
        else:
            w0, h0, s0, l0 = self.color[i]
            w1, h1, s1, l1 = color
            m = c / (old + c)
            self.color[i] = (w0 + (w1 - w0) * m, lerp_h(h0, h1, m), s0 + (s1 - s0) * m, l0 + (l1 - l0) * m)
        if self.attack is not None:
            c = min(c, self.start[i] + self.attack)
        self.cover[i] = max(old, c)

    def fade(self, dt, tau):
        k = math.exp(-dt / tau) if tau > 0 else 0.0
        self.cover = [c * k if c > 0.004 else 0.0 for c in self.cover]
        # once a frame, before the frame's deposits: what the attack counts from
        self.start = list(self.cover)

    def layer(self, i):
        c = self.cover[i]
        return (c, self.color[i]) if c > 0.004 else None

def surface_radius(points, slices=10):
    """The tree's outer radius at a height: a line through each height slice's 90th percentile."""
    groups = {}
    for x, y, z in points:
        groups.setdefault(min(slices - 1, int(y * slices)), []).append(math.hypot(x, z))
    pts = []
    for k, rs in groups.items():
        rs.sort()
        pts.append(((k + 0.5) / slices, rs[int(len(rs) * 0.9)]))
    my = sum(y for y, _ in pts) / len(pts)
    mr = sum(r for _, r in pts) / len(pts)
    slope = sum((y - my) * (r - mr) for y, r in pts) / sum((y - my) ** 2 for y, _ in pts)
    return lambda y: max(0.02, mr + slope * (y - my))


# --- an effect, as a pattern -----------------------------------------------------------------

class Effect(BaseColor):
    """One effect's state and knobs, and the base color that hands each light its layers."""
    name = ""
    # (control name, [(option name, value)], the option it starts on), and for a knob that sweeps, its
    # rest and, unless mk_bump, its shape
    knobs: list = []

    def __init__(self):
        super(Effect, self).__init__()
        self.knob = {}
        self.last = None
        self.layers = []

    def step(self, t, pixels, sound, beating, beat, hue, grain):
        # a run starting again starts the effect again
        if self.last is None or t < self.last:
            self.points = [(p.x, p.y, p.z) for p in pixels]
            self.grid = Grid(self.points)
            self.surface = surface_radius(self.points)
            self.low = self.mid = self.high = 0.5
            self.beat_at = None
            self.reset()
            self.last = t
        dt = min(0.25, t - self.last)
        self.last = t
        self.t = t
        self.sound = sound
        self.beating = beating
        self.beat = beat
        self.hue = hue
        self.grain = grain
        if sound is not None:
            glide = 1 - math.exp(-dt / BAND_GLIDE)
            self.low += (sound.low - self.low) * glide
            self.mid += (sound.mid - self.mid) * glide
            self.high += (sound.high - self.high) * glide
        if beat is not None:
            self.beat_at = t
        self.layers = self.lights(t, dt)

    @property
    def level(self):
        """The bands together."""
        return (self.low + self.mid + self.high) / 3

    @property
    def swell(self):
        """The last beat's swell, 0 to 1, rising and falling away: 0 with Music off."""
        if self.sound is None or self.beat_at is None:
            return 0.0
        since = self.t - self.beat_at
        return smoothstep(0, SWELL_RISE, since) * math.exp(-since / SWELL_FALL)

    def due(self, at):
        """Whether a launch due at time at goes now: while the music's tempo is sure, it waits for a beat."""
        return self.t >= at and (not self.beating or self.beat is not None)

    def drifted(self, color):
        """A palette's colour, turned with the base hue while the palette is the rainbow."""
        return turned(color, self.hue) if self.knob.get("Palette") == RAINBOW else color

    def reset(self):
        pass

    def lights(self, t, dt):
        """Each light's layers for the frame at t, dt after the last: [(cover, (w, h, s, l))]."""
        raise NotImplementedError

    def on_surface(self, y, angle, depth=0.9):
        r = self.surface(y) * depth
        return (r * math.cos(angle), y, r * math.sin(angle))

    def __call__(self, t, blend, spread, pixel_t, pixel_y, pixel):
        out = []
        total = 0.0
        for cover, (w, h, s, l) in self.layers[pixel.idx]:
            if self.grain == "raw":
                cover = 1.0 if cover > RAW_EDGE else 0.0
            if cover > 0:
                out.append([min(1.0, cover), Color(w=w, h=h, s=s, l=l), []])
                total += out[-1][0]
        if total > 1.0:
            for layer in out:
                layer[0] /= total
            total = 1.0
        out = [tuple(layer) for layer in out]
        out.append((1.0 - total, Color(), []))
        return out

class EffectFeature(Feature):
    """An effect's knobs, each a control starting on its option, a swept one a Sweep's four."""
    def __init__(self, effect: Effect):
        self.effect = effect
        self.sweeps = []
        controls = []
        for name, options, start, *swept in effect.knobs:
            if swept:
                sweep = Sweep(name, [Option(n, v) for n, v in options], *swept)
                sweep.curve.set([o.name for o in sweep.curve.options].index(SWEEP_CURVE))
                sweep.period.set([o.name for o in sweep.period.options].index(SWEEP_PERIOD))
                self.sweeps.append(sweep)
                control = sweep.control
                controls += sweep.controls
            else:
                control = Control(name, [Option(n, v) for n, v in options])
                controls.append(control)
            control.set([n for n, _ in options].index(start))
        super(EffectFeature, self).__init__(effect.name, controls)

    # a sweep's Curve and Period only while it's Curved, as a hint's
    visible_controls = HintFeature.visible_controls

    @property
    def value(self):
        # a swept knob's value is its Sweep's, a Curve on the run's clock while it's Curved
        self.effect.knob = {c.name: c.value for c in self.controls} | {s.control.name: s.value for s in self.sweeps}
        return {"base_color": self.effect}

class EffectPattern(WiredPattern):
    def __init__(self, effect: Effect):
        super(EffectPattern, self).__init__(effect.name)
        self.effect = effect
        self.features = [EffectFeature(effect), BlendFeature()]
        self.update(set_dirty=False)

    def step(self, t, pixels, sound, beating, beat, hue):
        self.effect.step(t, pixels, sound, beating, beat, hue, self.grain)


# --- the ten ---------------------------------------------------------------------------------

AURORA_PALETTES = {
    "green-violet": (GREEN, PURPLE + 0.03),
    "teal-rose": (CYAN + 0.03, MAGENTA + 0.04),
    "ice": (CYAN, BLUE),
}

# The surge's curtains' lower edges, burning white-green
SURGE_EDGE = (0.8, GREEN, 0.4, -0.2)

class Aurora(Effect):
    """Curtains of green and violet that drift and fold up the tree, from 3D noise, in a substorm:
    faint, slow and wide at rest, they build to a surge of quick, fine, rippling folds, bright, their
    lower edges burning white-green, and calm again, as Surge sweeps. The beat swells the brightness;
    the low band drives Speed, the high band the violet share."""
    name = "Aurora"
    knobs = [
        ("Speed", [("slow", 0.05), ("gentle", 0.09), ("lively", 0.16)], "gentle"),
        ("Folds", [("wide", 2.2), ("medium", 3.4), ("fine", 5.0)], "medium"),
        ("Palette", [(n, n) for n in AURORA_PALETTES], "green-violet"),
        ("Softness", [("crisp", 0.22), ("soft", 0.38)], "soft"),
        ("Surge", SHARES, "1", 0.0),
    ]

    def reset(self):
        self.noise = Noise3()
        self.rays = Noise3()
        self.drift = 0.0

    def lights(self, t, dt):
        k = self.knob
        music = self.sound is not None
        # the surge comes on late in the build and passes quickly
        surge = getv(k["Surge"], t) ** 2
        self.drift += dt * (banded(k["Speed"], self.low) if music else k["Speed"]) * (0.45 + 5 * surge)
        d, f = self.drift, k["Folds"] * (0.75 + 0.9 * surge)
        lo, hi = AURORA_PALETTES[k["Palette"]]
        soft = k["Softness"] * (0.8 + 0.4 * surge)
        violet = 0.6 * (self.high - 0.5) if music else 0.0
        bright = 0.45 + 0.9 * surge + 0.3 * self.swell
        out = []
        for x, y, z in self.points:
            # out to the surface at every height alike, so the narrow top folds as much as the base
            spread = 0.38 / self.surface(y)
            x, z = x * spread, z * spread
            # sheets where the noise crosses its middle, leaning and folding as they go up
            n = self.noise.fbm(x * f + d * 0.6, y * 1.1 - d, z * f - d * 0.4 + y * 0.8)
            ridge = 1.0 - abs(2.0 * n - 1.0)
            sheet = smoothstep(1.0 - soft, 1.0, ridge)
            if sheet <= 0:
                out.append(())
                continue
            rays = self.rays(x * 7, y * 2.0 - d * 4, z * 7)
            cover = sheet * (0.45 + 0.55 * rays) * (0.6 + 0.4 * smoothstep(0.0, 0.35, y))
            m = min(1.0, max(0.0, 0.15 + 0.9 * y + 0.6 * (rays - 0.5) + violet))
            edge = surge * smoothstep(0.75, 1.0, ridge) * (1 - y)
            color = mix(FULL(lerp_h(lo, hi, m)), SURGE_EDGE, min(1.0, edge * 1.5))
            out.append(((min(1.0, cover * bright), color),))
        return out

FIREFLY_COLORS = {
    "meadow": (0.15, YELLOW - 0.06, 1.0, -0.05),
    "warm white": WARM_WHITE,
    "amber": (0.2, YELLOW + 0.07, 1.0, 0.0),
}

# The swarm: the flies at Count's rest, how many it takes to fall into step and to blink all as one
# wave, how hard a fly is pulled into step, a turn a second, and the share of its blink a fly is lit
FEW_FLIES = 4
STEP_FROM = 30
STEP_AT = 60
PULL = 2.0
BLINK = 0.45

class Fireflies(Effect):
    """A swarm of soft warm lights, each blinking in its own time and wandering a little: as Count
    sweeps it grows from a few to its Count, the flies falling into step until they blink together
    in a wave round the tree, and it scatters again. A firefly lights on the beat; the high band sets
    how many there are."""
    name = "Fireflies"
    knobs = [
        ("Count", [("some", 60), ("many", 90), ("swarm", 120)], "swarm", FEW_FLIES),
        ("Pace", [("lazy", 1.6), ("gentle", 1.0)], "gentle"),
        ("Colour", [(n, n) for n in FIREFLY_COLORS], "amber"),
        ("Size", [("small", 0.055), ("soft", 0.075)], "soft"),
    ]

    def reset(self):
        self.noise = Noise3()
        # enough for a swarm swelled by a loud high band, the first ones joining first
        self.flies = [{
            "y": random.uniform(0.05, 0.92),
            "angle": random.uniform(0, 2 * math.pi),
            "phase": random.random(),
            "own": random.uniform(0.8, 1.25),
            "seed": random.uniform(0, 100),
        } for _ in range(180)]
        self.wave = 0.0

    def lights(self, t, dt):
        k = self.knob
        count = getv(k["Count"], t)
        if self.sound is not None:
            count = banded(count, self.high)
        # alone a fly blinks at its own rate; the more there are, the harder each is pulled toward the
        # wave's phase at its angle
        blink = 1.6 * k["Pace"]
        self.wave += dt / blink
        pull = PULL * smoothstep(STEP_FROM, STEP_AT, count) * dt
        color = FIREFLY_COLORS[k["Colour"]]
        size, size2 = k["Size"], k["Size"] ** 2
        # a dark fly of the swarm lights on the beat
        dark = [f for f in self.flies[:int(count)] if f["phase"] >= BLINK]
        if self.beat is not None and dark:
            random.choice(dark)["phase"] = 0.0
        layers = [[] for _ in self.points]
        for j, f in enumerate(self.flies):
            target = self.wave + f["angle"] / (2 * math.pi)
            f["phase"] = (f["phase"] + dt / (blink * f["own"]) + pull * ((((target - f["phase"]) + 0.5) % 1) - 0.5)) % 1
            # a fly past the count fades out, so the swarm grows and thins smoothly
            joined = min(1.0, count - j)
            if joined <= 0 or f["phase"] >= BLINK:
                continue
            b = joined * math.sin(math.pi * f["phase"] / BLINK) ** 2
            if b <= 0.01:
                continue
            s = f["seed"]
            wy = f["y"] + 0.05 * (self.noise(s, t * 0.15, 0) - 0.5)
            wa = f["angle"] + 0.6 * (self.noise(0, s, t * 0.12) - 0.5)
            px, py, pz = self.on_surface(min(0.95, max(0.03, wy)), wa, 0.85)
            for i in self.grid.near(px, py, pz, size):
                x, y, z = self.points[i]
                c = b * bump((x - px) ** 2 + (y - py) ** 2 + (z - pz) ** 2, size2)
                if c > 0:
                    layers[i].append((c, color))
        return layers

FIREWORK_PALETTES = {
    RAINBOW: None,
    "gold": [(0.4, YELLOW + 0.05, 1.0, 0.0), (0.7, YELLOW, 0.6, -0.4)],
    "red-green": [FULL(RED), FULL(GREEN)],
    "blue-white": [FULL(BLUE), COOL_WHITE],
}

# The finale: its rockets all at once, the seconds of dark after it, and the warm flash a burst
# lights the whole tree with
VOLLEY = 7
PAUSE = 5.0
FLASH = (0.6, YELLOW, 0.3, -0.4)
# A spark's size
SPARK = 0.065

class Fireworks(Effect):
    """A spark climbs, bursts into a sphere of colour on the cone's surface, and falls with fading
    trails, each burst lighting the whole tree for a moment. As Build sweeps the show builds, the
    rockets coming quicker and bursting bigger, to a finale of many at once as the build ends, then a
    pause while the next starts. A rocket goes up on the beat, Rate the most there can be as the show starts; the
    low band sets the burst's Size."""
    name = "Fireworks"
    knobs = [
        ("Rate", [("rare", 4.0), ("some", 2.5), ("busy", 1.5)], "some"),
        ("Size", [("small", 0.18), ("medium", 0.25), ("large", 0.33)], "medium"),
        ("Palette", [(n, n) for n in FIREWORK_PALETTES], RAINBOW),
        ("Trails", [("short", 0.45), ("long", 0.9)], "short"),
        ("Build", SHARES, "1", 0.0, mk_ramp),
    ]

    def reset(self):
        # a finale's hundreds of sparks each look through cells their own size
        self.grid = Grid(self.points, cell=SPARK)
        self.trail = Trail(len(self.points), attack=0.45)
        self.rockets = []
        self.sparks = []
        self.next_launch = 0.3
        self.build = 0.0
        self.finale = False  # whether a finale is due, on the next beat with the music
        self.flash = 0.0

    def _colors(self):
        palette = FIREWORK_PALETTES[self.knob["Palette"]]
        if palette is None:
            h = random.random()
            palette = [FULL(h), FULL(h + 0.12)]
        return [self.drifted(color) for color in palette]

    def _clamp(self, x, y, z):
        # a spark leaving the cone slides along its surface, so the burst stays on the lights
        y = min(1.0, max(0.0, y))
        r = math.hypot(x, z)
        rmax = self.surface(y)
        if r > rmax:
            x, z = x * rmax / r, z * rmax / r
        return x, y, z

    def lights(self, t, dt):
        k = self.knob
        self.trail.fade(dt, k["Trails"])
        build = getv(k["Build"], t)
        # the build falling back to its rest ends the show: the finale, then the pause
        self.finale |= build < self.build / 2
        self.build = build
        if self.due(t if self.finale else self.next_launch):
            if self.finale:
                self.next_launch = t + PAUSE
            else:
                self.next_launch = t + k["Rate"] * (1 - 0.8 * build) * random.uniform(0.7, 1.3)
            for _ in range(VOLLEY if self.finale else 1):
                self.rockets.append({
                    "start": t,
                    "angle": random.uniform(0, 2 * math.pi),
                    "top": random.uniform(0.45, 0.8),
                    "climb": random.uniform(1.5, 1.9),
                })
            self.finale = False
        size = banded(k["Size"], self.low) if self.sound is not None else k["Size"]
        size *= 1 + 0.4 * build
        self.flash *= math.exp(-dt / 0.25)
        heads = []
        for rocket in list(self.rockets):
            age = (t - rocket["start"]) / rocket["climb"]
            if age >= 1:
                self.rockets.remove(rocket)
                self.flash = min(1.0, self.flash + 0.5)
                cx, cy, cz = self.on_surface(rocket["top"], rocket["angle"], 0.95)
                colors = self._colors()
                n = 40
                for j in range(n):
                    # an even spread of directions over the sphere
                    v = 1 - 2 * (j + 0.5) / n
                    a = j * 2.39996
                    rr = math.sqrt(1 - v * v)
                    speed = size * random.uniform(1.6, 2.0)
                    self.sparks.append({
                        "p": [cx, cy, cz],
                        "v": [rr * math.cos(a) * speed, v * speed, rr * math.sin(a) * speed],
                        "start": t,
                        "life": random.uniform(1.3, 1.8),
                        "color": colors[j % len(colors)],
                    })
                continue
            # it rises out of the dark at the bottom, quickest mid-climb, slowing to its burst
            e = 0.5 - 0.5 * math.cos(math.pi * age)
            y = 0.02 + (rocket["top"] - 0.02) * e
            b = 0.9 * smoothstep(0, 0.2, age)
            heads.append((self.on_surface(y, rocket["angle"] + 0.3 * e, 0.95), b, (0.8, YELLOW + 0.05, 0.5, -0.5)))
        for spark in list(self.sparks):
            age = t - spark["start"]
            if age > spark["life"]:
                self.sparks.remove(spark)
                continue
            p, v = spark["p"], spark["v"]
            drag = math.exp(-2.6 * dt)
            v[0] *= drag
            v[2] *= drag
            v[1] = v[1] * drag - 0.35 * dt
            p[0], p[1], p[2] = self._clamp(p[0] + v[0] * dt, p[1] + v[1] * dt, p[2] + v[2] * dt)
            # each spark comes up over a few frames from the burst, then fades as it falls
            fade = smoothstep(0, 0.12, age) * (1 - age / spark["life"]) ** 1.2
            heads.append((p, fade, spark["color"]))
        size2 = SPARK ** 2
        for (px, py, pz), b, color in heads:
            for i in self.grid.near(px, py, pz, SPARK):
                x, y, z = self.points[i]
                c = b * bump((x - px) ** 2 + (y - py) ** 2 + (z - pz) ** 2, size2)
                self.trail.deposit(i, c, color)
        flash = [(0.18 * self.flash, FLASH)] if self.flash > 0.02 else []
        return [[layer] + flash if (layer := self.trail.layer(i)) else flash for i in range(len(self.points))]

RIPPLE_PALETTES = {
    "water": [FULL(BLUE), FULL(CYAN), FULL(CYAN - 0.06), FULL(BLUE + 0.97)],
    RAINBOW: None,
    "moonlight": [COOL_WHITE, (0.3, BLUE, 0.6, -0.2), WARM_WHITE],
}

# How much of a light a ring's paint covers once the ring has passed it, and how quickly a ring
# repaints a light half its width behind its middle, in seconds
PAINT = 0.4
REPAINT = 0.1

class Ripples(Effect):
    """Rings spread through the tree from a random point, like drops on a pond, crossing and mixing,
    each repainting the tree behind it in its colour, so the tree's colour changes drop by drop. A
    drop falls on the beat; the bands' level sets the ring's Width."""
    name = "Ripples"
    knobs = [
        ("Rate", [("drizzle", 0.25), ("rain", 0.45), ("shower", 0.8)], "rain"),
        ("Speed", [("slow", 0.16), ("medium", 0.26)], "medium"),
        ("Width", [("fine", 0.06), ("soft", 0.1)], "soft"),
        ("Palette", [(n, n) for n in RIPPLE_PALETTES], "water"),
    ]
    # how far a ring spreads: right across the tree
    reach = 0.9

    def reset(self):
        self.drops = []
        self.next_drop = 0.0
        # each light's paint, and how much of it the paint covers
        self.paint = [WARM_WHITE] * len(self.points)
        self.painted = [0.0] * len(self.points)

    def lights(self, t, dt):
        k = self.knob
        reach = self.reach
        if self.due(self.next_drop):
            self.next_drop = t + random.expovariate(k["Rate"])
            palette = RIPPLE_PALETTES[k["Palette"]]
            color = self.drifted(FULL(random.random()) if palette is None else random.choice(palette))
            # a drop lands on the surface, where the lights are thickest
            place = self.on_surface(random.uniform(0.05, 0.85), random.uniform(0, 2 * math.pi), 0.85)
            self.drops.append((t, place, color))
        speed = k["Speed"]
        width = banded(k["Width"], self.level) if self.sound is not None else k["Width"]
        self.drops = [d for d in self.drops if (t - d[0]) * speed < reach + width]
        layers = [[] for _ in self.points]
        for start, (cx, cy, cz), color in self.drops:
            age = t - start
            front = age * speed
            # the ring comes up from nothing at the drop, and thins out as it spreads
            amp = smoothstep(0, 0.3, age) * (1 - min(1.0, front / reach)) ** 0.8
            lo, hi = max(0.0, front - width), front + width
            for i, (x, y, z) in enumerate(self.points):
                d = math.sqrt((x - cx) ** 2 + (y - cy) ** 2 + (z - cz) ** 2)
                if lo <= d <= hi:
                    if d < front:
                        # the ring repaints the tree behind its middle, however far it has spread
                        m = 1 - math.exp(-bump((d - front + width / 2) ** 2, width * width / 4) * dt / REPAINT)
                        self.paint[i] = color if self.painted[i] == 0 else mix(self.paint[i], color, m)
                        self.painted[i] += (PAINT - self.painted[i]) * m
                    ring = amp * bump((d - front) ** 2, width * width)
                    if ring > 0.003:
                        layers[i].append((ring, color))
        return [light + [(c, self.paint[i])] if (c := self.painted[i]) > 0.004 else light for i, light in enumerate(layers)]

# Each palette's wax, cool and hot, and the glow behind it
LAVA_PALETTES = {
    "lava": (RED, YELLOW - 0.02, FULL(PURPLE)),
    "plasma": (BLUE, MAGENTA, FULL(CYAN)),
    "ocean": (BLUE, GREEN - 0.04, FULL(BLUE + 0.95)),
    "sunset": (MAGENTA + 0.05, YELLOW, FULL(PURPLE)),
}

class LavaLamp(Effect):
    """Coloured blobs (3D metaballs) rise, merge and split, the lamp heating and cooling as Heat
    sweeps: cool, a few big slow blobs in the palette's deep colour merge and sink; hot, the wax rises
    fast and splits into many small ones, glowing in its bright colour. The beat swells the blobs; the
    low band drives Speed."""
    name = "Lava lamp"
    knobs = [
        ("Blobs", [("3", 3), ("5", 5), ("7", 7)], "7"),
        ("Speed", [("drowsy", 0.5), ("slow", 1.0), ("steady", 1.6)], "slow"),
        ("Palette", [(n, n) for n in LAVA_PALETTES], "lava"),
        ("Softness", [("firm", 0.3), ("soft", 0.55)], "soft"),
        ("Heat", SHARES, "1", 0.0),
    ]

    def reset(self):
        self.blobs = [{
            "phase": random.uniform(0, 2 * math.pi),
            "rate": random.uniform(0.03, 0.07),
            "angle": random.uniform(0, 2 * math.pi),
            "spin": random.uniform(-0.12, 0.12),
            "size": random.uniform(0.12, 0.17),
        } for _ in range(7)]
        self.clock = 0.0

    def lights(self, t, dt):
        k = self.knob
        heat = getv(k["Heat"], t)
        speed = banded(k["Speed"], self.low) if self.sound is not None else k["Speed"]
        self.clock += dt * speed * (0.5 + 2.5 * heat)
        cool, hot, background = LAVA_PALETTES[k["Palette"]]
        soft = k["Softness"]
        # Blobs of them hot, under half as many cool
        count = k["Blobs"] * (0.4 + 0.6 * heat)
        swell = 1 + 0.15 * self.swell
        centres = []
        for j, blob in enumerate(self.blobs):
            # a blob past the count shrinks away, so a split or a merge glides
            grow = 1 - smoothstep(count - 0.5, count + 0.5, j)
            if grow <= 0:
                continue
            # each blob rises and sinks the tree's height at its own rate, so they pass and meet
            y = 0.5 - 0.5 * math.cos(blob["phase"] + blob["rate"] * 2 * math.pi * self.clock)
            y = -0.05 + 1.1 * y
            a = blob["angle"] + blob["spin"] * self.clock * 2 * math.pi
            r = self.surface(min(1.0, max(0.0, y))) * 0.55
            # bigger cool, and smaller up where the tree is narrow
            size = swell * grow * blob["size"] * (1.5 - 0.8 * heat) * (0.55 + 0.45 * (1 - min(1.0, max(0.0, y))))
            # the hotter, the further toward the hot colour, some blobs further than others
            centres.append((r * math.cos(a), y, r * math.sin(a), size * size, heat * (0.6 + 0.4 * j / 6)))
        out = []
        for x, y, z in self.points:
            field = toward = 0.0
            for cx, cy, cz, s2, hotter in centres:
                f = s2 / ((x - cx) ** 2 + (y - cy) ** 2 + (z - cz) ** 2 + 1e-4)
                field += f
                toward += f * hotter
            cover = smoothstep(1 - soft, 1 + soft, field)
            layers = [(0.08 * (1 - cover), background)]
            if cover > 0:
                # the blobs' colours, all between cool and hot, mixed as one, each as much as it fills
                layers.append((cover, FULL(lerp_h(cool, hot, toward / field))))
            out.append(layers)
        return out

COMET_PALETTES = {
    "ice": [(0.4, CYAN, 0.6, 0.0), (0.3, BLUE, 0.8, 0.0), (0.4, CYAN - 0.04, 0.5, 0.0)],
    RAINBOW: [FULL(MAGENTA), FULL(CYAN), FULL(ORANGE), FULL(GREEN), FULL(BLUE), FULL(YELLOW), FULL(RED)],
    "ember": [FULL(ORANGE), FULL(YELLOW), FULL(RED)],
}
# Each comet's speed against Speed: one quick and the rest slow
COMET_RATES = (2.6, 0.7, 0.9, 1.1, 0.6, 1.4, 0.8)
# A head's size, squared
HEAD2 = 0.005

class Comets(Effect):
    """A storm of comets, up to seven at their own speeds, one quick and the rest slow, on tilted
    orbits round the cone whose heights drift, their bright heads leaving long tails that glitter as
    they fade. The beat gives the comets a push, a surge in Speed; the bands' level sets the Tail."""
    name = "Comets"
    knobs = [
        ("Comets", [(str(n), n) for n in (1, 2, 3, 5, 7)], "7"),
        ("Speed", [("slow", 0.1), ("medium", 0.16), ("quick", 0.24)], "medium"),
        ("Tail", [("short", 0.5), ("medium", 1.0), ("long", 1.8)], "long"),
        ("Palette", [(n, n) for n in COMET_PALETTES], RAINBOW),
    ]

    def reset(self):
        self.trail = Trail(len(self.points), attack=0.6)
        self.glitter = Noise3()
        self.orbits = [{
            "y": random.uniform(0.15, 0.8),
            "rate": rate,
            "angle": random.uniform(0, 2 * math.pi),
            "dir": random.choice([-1, 1]),
            "tilt": random.uniform(0.05, 0.2),
        } for rate in COMET_RATES]
        self.turned = [0.0] * len(self.orbits)

    def lights(self, t, dt):
        k = self.knob
        music = self.sound is not None
        self.trail.fade(dt, (banded(k["Tail"], self.level) if music else k["Tail"]) * 0.8)
        speed = k["Speed"] * (1 + self.swell)
        colors = [self.drifted(color) for color in COMET_PALETTES[k["Palette"]]]
        heads = []
        for j, orbit in enumerate(self.orbits[:k["Comets"]]):
            self.turned[j] += dt * speed * orbit["rate"] * 2 * math.pi
            a = orbit["angle"] + orbit["dir"] * self.turned[j]
            # tilted, so a comet climbs and dips as it goes round, and its orbit's height drifts
            y = orbit["y"] + 0.12 * math.sin(t * 0.07 + j) + orbit["tilt"] * math.sin(a)
            px, py, pz = self.on_surface(min(0.97, max(0.03, y)), a, 0.92)
            heads.append((px, py, pz))
            for i in self.grid.near(px, py, pz, 0.08):
                x, yy, z = self.points[i]
                self.trail.deposit(i, bump((x - px) ** 2 + (yy - py) ** 2 + (z - pz) ** 2, 0.08 ** 2), colors[j % len(colors)])
        out = []
        for i, (x, y, z) in enumerate(self.points):
            layers = []
            if (layer := self.trail.layer(i)):
                c, color = layer
                # the fading tail glitters, in specks finer than the lights are apart
                if c < 0.5:
                    c *= 0.4 + 0.6 * smoothstep(0.3, 0.5, self.glitter(x * 40, y * 40 + t * 8, z * 40))
                layers.append((c, color))
            # the head itself, whiter than its tail
            for px, py, pz in heads:
                d2 = (x - px) ** 2 + (y - py) ** 2 + (z - pz) ** 2
                if d2 < HEAD2:
                    layers.append((0.9 * bump(d2, HEAD2), (0.9, CYAN, 0.2, -0.3)))
            out.append(layers)
        return out

# The fire's life: its Height as embers alone and in a full blaze, how high a flare-up leaps at the
# blaze, and how long one takes to leap and to die down
EMBERS = 0.1
BLAZE = 0.85
FLARE = 0.5
FLARE_RISE = 0.25
FLARE_FALL = 0.6

class Hearth(Effect):
    """A warm candle and ember flicker, brightest at the bottom and cooling to the top, living a
    fire's life as Height sweeps: embers glowing alone, catching, a blaze with flare-ups every few
    seconds and many embers, then dying back. The beat flares the flames' Height; the low band sets
    Height, the high band the Embers."""
    name = "Hearth"
    knobs = [
        ("Height", [("low", 0.4), ("fire", 0.6), ("blaze", 0.85)], "blaze", EMBERS),
        ("Flicker", [("calm", 0.45), ("lively", 0.8)], "calm"),
        ("Embers", [("none", 0.0), ("few", 2.5), ("many", 7.0)], "many"),
    ]

    def reset(self):
        self.noise = Noise3()
        self.embers = []
        self.rise = 0.0
        self.flare_at = -math.inf
        self.flare = 0.0  # how high the last flare-up leapt
        self.next_flare = 2.0

    def lights(self, t, dt):
        k = self.knob
        height = getv(k["Height"], t)
        # 0 as embers, 1 at a blaze
        life = min(1.0, max(0.0, (height - EMBERS) / (BLAZE - EMBERS)))
        embers = k["Embers"] * (0.15 + 1.5 * life)
        if t >= self.next_flare:
            self.next_flare = t + random.uniform(2, 5)
            self.flare_at, self.flare = t, FLARE * life
        since = t - self.flare_at
        height += self.flare * (since / FLARE_RISE if since < FLARE_RISE else math.exp(-(since - FLARE_RISE) / FLARE_FALL))
        if self.sound is not None:
            height = banded(height, self.low) * (1 + 0.2 * self.swell)
            embers = banded(embers, self.high)
        self.rise += dt * k["Flicker"] * (0.75 + 1.5 * life)
        if random.random() < embers * dt:
            self.embers.append({
                "start": t,
                "angle": random.uniform(0, 2 * math.pi),
                "y": random.uniform(0.05, 0.25),
                "speed": random.uniform(0.08, 0.16),
                "life": random.uniform(2.5, 4.0),
                "drift": random.uniform(-0.5, 0.5),
            })
        self.embers = [e for e in self.embers if t - e["start"] < e["life"]]
        layers = []
        r = self.rise
        for x, y, z in self.points:
            # heat falls off with height, broken up by noise rising through the tree; the flames'
            # top rises and falls with a slower noise, in tongues, not a level line
            n = self.noise.fbm(x * 5, y * 3.5 - r, z * 5 + r * 0.25)
            top = height * (0.7 + 0.6 * self.noise(x * 3 + 40, y - r * 0.5, z * 3))
            base = max(0.0, 1.0 - y / top)
            heat = base ** 1.2 * (0.35 + 0.95 * n)
            # and a dim glow cooling up the rest of the tree
            heat = min(1.0, max(heat, 0.07 * (1 - y) * (0.5 + n)))
            if heat < 0.03:
                layers.append([])
                continue
            hue = lerp_h(RED + 0.02, YELLOW + 0.04, smoothstep(0.15, 0.9, heat))
            w = 0.6 * smoothstep(0.7, 1.0, heat)
            layers.append([(min(1.0, heat * 1.3), (w, hue, 1.0, 0.0))])
        size2 = 0.045 ** 2
        for e in self.embers:
            age = t - e["start"]
            b = smoothstep(0, 0.5, age) * (1 - smoothstep(e["life"] * 0.4, e["life"], age))
            py = e["y"] + age * e["speed"]
            px, py, pz = self.on_surface(min(1.0, py), e["angle"] + e["drift"] * age, 0.9)
            for i in self.grid.near(px, py, pz, 0.045):
                x, y, z = self.points[i]
                c = b * bump((x - px) ** 2 + (y - py) ** 2 + (z - pz) ** 2, size2)
                if c > 0.01:
                    layers[i] = layers[i] + [(c * 0.9, FULL(ORANGE - 0.03))]
        return layers

# The storm: a bolt's restrikes down its path after it, in seconds, how much a restrike brightens
# what's left of its glow, and a flicker of sheet lightning in the clouds, how long it lasts and fades
RESTRIKES = ((0.12, 0.3), (0.15,))
RESTRIKE = 2.5
SHEET_LIFE = 0.5
SHEET_FADE = 0.12
SHEET = (0.5, BLUE + 0.95, 0.4, -0.2)

class Lightning(Effect):
    """A dark storm with a sudden branching bolt down the tree, then an afterglow, building as Storm
    sweeps: the storm comes closer, strikes coming from every Interval to every few seconds, each bolt
    striking again down the same path, the clouds thickening and sheet lightning flickering in them,
    then it passes. A bolt strikes on a bar line, Interval the least time between while the storm is
    far; the low band lights the clouds."""
    name = "Lightning"
    knobs = [
        ("Interval", [("often", 4.5), ("sometimes", 8.0), ("rarely", 14.0)], "sometimes"),
        ("Branches", [("1", 1), ("2", 2), ("3", 3)], "2"),
        ("Afterglow", [("quick", 0.45), ("slow", 1.1)], "slow"),
        ("Sky", [("black", 0.0), ("clouds", 0.07)], "clouds"),
        ("Storm", SHARES, "1", 0.0),
    ]

    def reset(self):
        self.noise = Noise3()
        self.trail = Trail(len(self.points))
        self.next_strike = 1.5
        self.flash = 0.0
        self.struck = None  # when the last bolt struck, on the run's clock
        self.restrikes = []
        self.sheets = []

    def _path(self, y, angle, stop):
        """A jagged line down the surface from height y to stop."""
        points = [self.on_surface(y, angle, 0.8)]
        while y > stop:
            y -= random.uniform(0.04, 0.08)
            angle += random.uniform(-0.45, 0.45)
            points.append(self.on_surface(max(stop, y), angle, random.uniform(0.75, 1.0)))
        return points

    def _strike(self):
        top = self._path(1.0, random.uniform(0, 2 * math.pi), 0.0)
        paths = [top]
        for _ in range(self.knob["Branches"] - 1):
            j = random.randrange(2, max(3, len(top) // 2))
            y = top[j][1]
            angle = math.atan2(top[j][2], top[j][0])
            branch = self._path(y, angle + random.choice([-0.5, 0.5]), max(0.0, y - random.uniform(0.25, 0.45)))
            paths.append([top[j]] + branch[1:])
        width = 0.05
        for path in paths:
            for a, b in zip(path, path[1:]):
                middle = tuple((p + q) / 2 for p, q in zip(a, b))
                half = math.dist(a, b) / 2
                for i in self.grid.near(*middle, half + width):
                    self.trail.deposit(i, bump(seg_dist2(self.points[i], a, b), width * width), (1.0, BLUE, 0.35, -0.2))
        self.flash = 1.0

    def lights(self, t, dt):
        k = self.knob
        near = getv(k["Storm"], t)
        self.trail.fade(dt, k["Afterglow"])
        # the bolt's glow cools from blue-white to violet as it fades
        for i, c in enumerate(self.trail.cover):
            if c > 0.004:
                w, h, s, l = self.trail.color[i]
                self.trail.color[i] = (w * math.exp(-dt / 0.25), lerp_h(h, PURPLE, 1 - math.exp(-dt / 0.6)), min(1.0, s + dt * 1.5), l)
        if t >= self.next_strike and (not self.beating or (self.beat is not None and self.beat % 4 == 0)):
            self.next_strike = t + k["Interval"] * (1 - 0.8 * near) * random.uniform(0.8, 1.25)
            self.struck = t
            self._strike()
            # the nearer the storm, the likelier a bolt strikes twice more
            after = RESTRIKES[0] if random.random() < 0.5 + 0.5 * near else RESTRIKES[1]
            self.restrikes += [t + at for at in after]
        for at in [at for at in self.restrikes if t >= at]:
            self.restrikes.remove(at)
            self.trail.cover = [min(1.0, c * RESTRIKE) if c > 0.01 else c for c in self.trail.cover]
            self.flash = 0.8
        if random.random() < dt * (0.3 + 1.5 * near):
            self.sheets.append((t, random.uniform(0, 2 * math.pi), random.uniform(0.6, 0.9)))
        self.sheets = [sheet for sheet in self.sheets if t - sheet[0] < SHEET_LIFE]
        flash = self.flash
        self.flash *= math.exp(-dt / 0.12)
        sky = banded(k["Sky"], self.low) if self.sound is not None else k["Sky"]
        sky *= 0.6 + 0.9 * near
        out = []
        for i, (x, y, z) in enumerate(self.points):
            layers = []
            if (layer := self.trail.layer(i)):
                layers.append(layer)
            if sky or flash > 0.01:
                n = self.noise.fbm(x * 3 + t * 0.04, y * 2, z * 3 - t * 0.03) if sky else 0.5
                cloud = smoothstep(0.5, 0.8, n) * smoothstep(0.2, 0.9, y)
                c = sky * cloud + 0.12 * flash * (0.4 + 0.6 * cloud)
                if c > 0.004:
                    layers.append((c, (0.2, BLUE + 0.95, 0.5, -0.2)))
            # a sheet lights a patch of cloud round the trunk and fades
            sheet = 0.0
            for start, sa, sy in self.sheets:
                da = abs(((math.atan2(z, x) - sa + math.pi) % (2 * math.pi)) - math.pi)
                sheet += 0.35 * math.exp(-da * da / 0.4 - (y - sy) ** 2 / 0.02 - (t - start) / SHEET_FADE)
            if sheet > 0.01:
                layers.append((min(1.0, sheet), SHEET))
            out.append(layers)
        return out

DRIP_PALETTES = {
    "paint box": [FULL(RED), FULL(YELLOW), FULL(BLUE), FULL(GREEN), FULL(MAGENTA)],
    "candy": [FULL(MAGENTA + 0.04), FULL(CYAN), FULL(YELLOW)],
    "ocean": [FULL(BLUE), FULL(CYAN), FULL(GREEN - 0.03)],
}

# The pour: drips a second at Rate's rest, a trickle, how far each landing raises the pool, the
# highest it rises and how long it takes to drain back to Pool, in seconds
TRICKLE = 0.4
POOL_RISE = 0.012
POOL_FULL = 0.42
POOL_DRAIN = 9.0

class Drips(Effect):
    """Paint drips run down from the top, pooling and changing colour at the bottom, in pours as
    Rate sweeps: a trickle, then a rush of drips, the pool rising with them, then a trickle again
    while it drains. A drip starts on the beat; the bands' level sets Speed."""
    name = "Drips"
    knobs = [
        ("Rate", [("slow", 0.5), ("steady", 0.9), ("busy", 1.6), ("pour", 6.0)], "pour", TRICKLE),
        ("Speed", [("ooze", 0.09), ("run", 0.16)], "run"),
        ("Palette", [(n, n) for n in DRIP_PALETTES], "paint box"),
        ("Pool", [("shallow", 0.1), ("deep", 0.2)], "shallow"),
    ]

    def reset(self):
        self.trail = Trail(len(self.points), attack=0.35)
        self.drips = []
        self.next_drip = 0.0
        self.pool_top = self.knob["Pool"]
        first = DRIP_PALETTES[self.knob["Palette"]][0]
        self.pool = [0.35] * len(self.points)
        self.pool_color = [first] * len(self.points)
        self.pool_target = [first] * len(self.points)
        self.pool_lift = [0.35] * len(self.points)

    def lights(self, t, dt):
        k = self.knob
        palette = DRIP_PALETTES[k["Palette"]]
        # the pool drains back to Pool between landings
        self.pool_top += (k["Pool"] - self.pool_top) * (1 - math.exp(-dt / POOL_DRAIN))
        pool_top = self.pool_top
        speed = banded(k["Speed"], self.level) if self.sound is not None else k["Speed"]
        self.trail.fade(dt, 1.6)
        if self.due(self.next_drip):
            self.next_drip = t + random.expovariate(getv(k["Rate"], t))
            self.drips.append({
                "start": t,
                "y": random.uniform(0.88, 0.97),
                "angle": random.uniform(0, 2 * math.pi),
                "wobble": random.uniform(-0.3, 0.3),
                "color": random.choice(palette),
                "fallen": 0.0,
            })
        size2 = 0.05 ** 2
        for drip in list(self.drips):
            age = t - drip["start"]
            # a bead forms, then runs, picking up speed
            b = smoothstep(0, 0.6, age)
            run = age - 0.6
            if run > 0:
                drip["fallen"] += dt * speed * (0.3 + run if run < 1.4 else 1.0)
            y = drip["y"] - drip["fallen"]
            if y <= pool_top * 0.6:
                self.drips.remove(drip)
                self._land(drip, pool_top)
                continue
            px, py, pz = self.on_surface(y, drip["angle"] + drip["wobble"] * (drip["y"] - y), 0.9)
            for i in self.grid.near(px, py, pz, 0.05):
                x, yy, z = self.points[i]
                self.trail.deposit(i, b * bump((x - px) ** 2 + (yy - py) ** 2 + (z - pz) ** 2, size2), drip["color"])
        # the pool settles back to an even glow between drips
        settle = 1 - math.exp(-dt / 3.0)
        ease = 1 - math.exp(-dt / 0.5)
        out = []
        for i, (x, y, z) in enumerate(self.points):
            layers = []
            if (layer := self.trail.layer(i)):
                layers.append(layer)
            depth = 1 - smoothstep(pool_top * 0.6, pool_top, y)
            if depth > 0:
                # the pool eases toward where the last landing left it, then settles
                w0, h0, s0, l0 = self.pool_color[i]
                w1, h1, s1, l1 = self.pool_target[i]
                self.pool_color[i] = (w0 + (w1 - w0) * ease, lerp_h(h0, h1, ease), s0 + (s1 - s0) * ease, l0 + (l1 - l0) * ease)
                self.pool[i] += (self.pool_lift[i] - self.pool[i]) * ease
                self.pool_lift[i] += (0.35 - self.pool_lift[i]) * settle
                layers.append((depth * self.pool[i], self.pool_color[i]))
            out.append(layers)
        return out

    def _land(self, drip, pool_top):
        self.pool_top = min(POOL_FULL, self.pool_top + POOL_RISE)
        # the drip's colour spreads round the pool from where it lands
        ax, az = math.cos(drip["angle"]), math.sin(drip["angle"])
        w0, h0, s0, l0 = drip["color"]
        for i, (x, y, z) in enumerate(self.points):
            if y > pool_top:
                continue
            r = math.hypot(x, z) or 1.0
            near = (x / r) * ax + (z / r) * az  # cos of the angle between, so no seam
            m = 0.7 * smoothstep(0.55, 1.0, near)
            if m > 0:
                w1, h1, s1, l1 = self.pool_target[i]
                self.pool_target[i] = (w1 + (w0 - w1) * m, lerp_h(h1, h0, m), s1 + (s0 - s1) * m, l1 + (l0 - l1) * m)
                self.pool_lift[i] = max(self.pool_lift[i], 0.35 + 0.55 * m)

HEART_COLORS = {
    "red": FULL(RED),
    "rose": FULL(MAGENTA + 0.07),
    "violet": FULL(PURPLE),
    "warm white": (0.9, ORANGE, 0.6, -0.6),
}

# Exertion: the heart's rate resting and racing, and the colour it warms to as it quickens
RESTING = 54
RACING = 150
WARMED = FULL(ORANGE)

class Heartbeat(Effect):
    """A double pulse from the tree's core outwards at Rate, exerting itself as Rate sweeps: from
    resting it climbs to racing and back, the colour warming toward orange (violet through red) and
    the pulse reaching further as it quickens. While the music's tempo is sure the pulse fires on its
    beat in place of Rate, as hard as the tempo; the low band sets Reach."""
    name = "Heartbeat"
    knobs = [
        ("Rate", [("resting", RESTING), ("calm", 66), ("lively", 84), ("racing", RACING)], "racing", RESTING),
        ("Colour", [(n, n) for n in HEART_COLORS], "violet"),
        ("Reach", [("core", 0.35), ("half", 0.55), ("whole", 0.85)], "whole"),
        ("Softness", [("crisp", 0.14), ("soft", 0.2)], "soft"),
    ]

    def reset(self):
        self.phase = 0.0

    def lights(self, t, dt):
        k = self.knob
        rate = self.sound.bpm if self.beating else getv(k["Rate"], t)
        exertion = min(1.0, max(0.0, (rate - RESTING) / (RACING - RESTING)))
        # the phase runs at the rate, so a change of rate never jumps a pulse; a beat pulls it onto
        # the music's
        self.phase += dt * rate / 60
        if self.beat is not None:
            self.phase = round(self.phase)
        reach, width = k["Reach"] * (0.45 + 0.55 * exertion), k["Softness"]
        if self.sound is not None:
            reach = banded(reach, self.low)
        speed = reach / 1.2
        color = mix(HEART_COLORS[k["Colour"]], WARMED, exertion)
        beats = []
        n = math.floor(self.phase)
        for b in (n, n - 1):
            since = (self.phase - b) * 60 / rate
            # lub, then a softer dub
            beats.append((since, 1.0))
            beats.append((since - 0.32, 0.65))
        # each pulse swells at the core over a few frames, then thins as it spreads
        fronts = [(s * speed, amp * smoothstep(0, 0.2, s) * (1 - min(1.0, s * speed / (reach + width))) ** 2.2)
                  for s, amp in beats if s >= 0]
        cx, cy, cz = 0.0, 0.38, 0.0
        out = []
        for x, y, z in self.points:
            d = math.sqrt((x - cx) ** 2 + ((y - cy) * 0.8) ** 2 + (z - cz) ** 2)
            c = 0.04 * (1 - smoothstep(reach * 0.6, reach + width, d))
            for front, amp in fronts:
                if amp > 0 and abs(d - front) < width:
                    c += amp * bump((d - front) ** 2, width * width)
            out.append([(min(1.0, c), color)] if c > 0.003 else [])
        return out

EFFECTS = [Aurora, Fireflies, Fireworks, Ripples, LavaLamp, Comets, Hearth, Lightning, Drips, Heartbeat]
`,"hints.py":`"""Hints of Bermuda's looks on the tree: at about 800 lights it cannot show Bermuda's pictures, so
these are slow, soft-edged shapes in Bermuda's palettes (palette.py), moved by its modulators and
their timing (motion.py), most of them using the angle round the trunk. Each light's brightness is
how much of the shape covers it, so motion glides instead of stepping from light to light. Their
knobs sweep as the Curved knobs of control.py's patterns do, on the hint's clock, so a hint keeps
changing over the minute."""
import math

from pytweening import easeOutBack

from colors import BaseColor, Color
from control import (
    CURVES,
    DIRECTIONS,
    INTS16,
    BlendFeature,
    Control,
    Feature,
    FlickerFeature,
    FlitterFeature,
    FluxFeature,
    Option,
    SparklesFeature,
    SpinFeature,
    SpiralTopologyFeature,
    ToggleControl,
    WiredPattern,
)
from motion import Modulator, Running, Target, wave
from palette import COSINES, Palette, Vec3, oklch_to_linear, palette_at, stops_from_cosine
from param import Curve, Param, getv
from utils import coverage, mk_bounce, mk_bump

# The stops a cosine preset is sampled at
STOPS = 8
# A slice's share of its slot, the rest dark between
FILL = 0.5
# How far the wash dims at its wave's trough
DIP = 0.6
# The wash's tide: how fast its palette climbs the tree (with Axis round, drifts round it), in
# palettes a beat, how far it wobbles either way round the trunk (round, up the tree), as a share
# of the palette, the wobble turning once in WOBBLE_PERIOD beats, and with Axis round, the
# palette's turns round the trunk for a Span of 1
CLIMB = 1/20
WOBBLE = 0.3
WOBBLE_PERIOD = 9
ROUND = 2
# Slices: with Axis leaned, the arms' turns round the trunk up the tree before their lean; with
# Axis up, how far the rings tilt, in slots either way, for each slot of Lean; and how far the
# palette runs up each slice
TWIST = 1
TILT = 1/4
PALETTE_UP = 0.3
# The hidden field: a star's outer radius, as a share of the lattice's spacing, how deep its points
# are cut, its soft edge (of the base's radius), the share of Twinkles a light sparkles in and how
# sharp a sparkle is, hidden, the sharpness the stars stand solid at, the share of Twinkles a light
# fades in over as the share grows, and how much faster the field turns once revealed
STAR = 0.34
STAR_CUT = 0.45
STAR_EDGE = 0.08
SPARKLES = 0.25
SPARKLE = 4
SOLID = 1/2
SHARE_EDGE = 0.2
FASTER = 1
# The beat wave's harmonics, for a hint's Wave control
HARMONICS = (1, 2)
# How long a hint's clock takes to draw onto the music's beat, in seconds
LOCK = 1.0
# A tick's step, as a share of its beat
TICK = 0.35

PALETTES = [Option(name, name) for name in COSINES]
WAVES = [Option(name, name) for name in ["cos", "tri", "beat"]]
BEATS = [Option(str(v), v) for v in [16, 32, 64]]
# a swept knob's periods: in beats while music plays, so its turns land on bar lines, else seconds
SWEEPS = [Option(str(v), v) for v in [16, 32, 48, 64]]
# a soft edge's width, as a share of the lit part of a slot: at 1 a light is only full at its middle
SOFTNESS = [Option(n, v) for n, v in [("1/2", 1/2), ("3/4", 3/4), ("1", 1)]]

def preset(name: str) -> Palette:
    return Palette(stops_from_cosine(name, STOPS))

def slot(u: float, softness: float) -> tuple[float, int]:
    """For a light at u, counted in slots (slices round the trunk, up it or winding up it), how
    much of its slot's lit part covers it, its edges softness of it wide, and which slot it is in, the
    slots meeting halfway across the dark between."""
    k = math.floor(u + ((1 - FILL) / 2))
    return coverage(u - k, 0, FILL, softness * FILL, wrap=False), k

def tick(clock: float) -> float:
    """A clock that steps once a beat (a second without music) and holds: its whole beats, and the
    step on its way, taking TICK of the beat and overshooting as it lands."""
    n = math.floor(clock)
    return n + easeOutBack(min(1.0, (clock - n) / TICK))

class Sweep:
    """A hint's or an effect's knob as the Curved knobs of control.py's patterns are: its control's
    value, or Curved, a Curve each Period of its clock from rest to the value and back (as mk_bump),
    with mk_bounce and a rest of 0, to the value, back through 0 to its negative and back, or with
    mk_ramp, from rest to the value and straight back to rest."""
    def __init__(self, name: str, options: list[Option], rest: float=0.0, shape=mk_bump):
        self.control = Control(name, options)
        self.curved = ToggleControl(f"{name} Curved")
        self.curve = Control(f"{name} Curve", CURVES)
        self.period = Control(f"{name} Period", SWEEPS)
        self.controls = [self.control, self.curved, self.curve, self.period]
        self.rest = rest
        self.shape = shape

    @property
    def value(self) -> Param:
        if not self.curved.value:
            return self.control.value
        return Curve(self.curve.value, self.shape(self.period.value, self.rest, self.control.value))

class PaletteColor(Color):
    """A palette's colour as the tree takes it: OKLCh to linear R, G and B (the LEDs are linear PWM),
    never through the HSL wheel, which would lose the palette's even steps. Its l is a Color's: -1
    off, 0 the palette's colour, and on up to 1 white, as the beat flash lifts it."""
    def __init__(self, lch: tuple[float, float, float]):
        super(PaletteColor, self).__init__(l=0.0)
        self.lch = lch

    def as_wrgb(self) -> tuple[float, float, float, float]:
        if self.l == -1.0:
            return (self.w * 255, 0, 0, 0)
        L, C, h = self.lch
        rgb = oklch_to_linear((L, C * self.s, h + (360 * self.h)))
        if self.l < 0:
            rgb = [c * (1 + self.l) for c in rgb]
        else:
            rgb = [c + ((1 - c) * self.l) for c in rgb]
        return (self.w * 255, *(255 * c for c in rgb))

class Hint(BaseColor):
    """A hint's light, from its feature: each of its layers' palette colour, at the layer's
    lightness, as much as the layer covers the light, and off for the rest. The palette is the
    hint's own, off the base hue's clock as a BaseColor with blend off is, unless the hint rides it:
    then it turns with the base hue."""
    def __init__(self, feature: "HintFeature"):
        super(Hint, self).__init__()
        self.feature = feature

    def frame(self, beats: float, dt: float):
        self.feature.frame(beats, dt)

    def __call__(self, t: float, blend: float, spread: float, pixel_t: float, pixel_y: float, pixel):
        out = []
        total = 0.0
        for cover, lch, l in self.feature.layers(pixel_t % 1, pixel_y):
            if cover > 0:
                color = PaletteColor(lch)
                color.l = l
                if self.feature.ride:
                    color.h = blend
                out.append((cover, color, []))
                total += cover
        return out + [(1 - total, Color(), [])]

class HintFeature(Feature):
    """A hint's controls and its shape: layers gives, for a light at an angle round the trunk (0 to
    1) and a height, how much of each of the shape's layers covers it (their covers summing to 1 at
    most), its colour from the palette and its lightness; one layer, light's, unless the hint gives
    more. Its clock and its modulators run on each frame's beats: the beat clock's while music
    plays, else one a second, and its sweeps on its clock. Its value sets them from the controls and
    gives the same Hint each time, so their phases run on through a change of control, as
    Bermuda's do."""
    def __init__(self, name: str, controls: list[Control], runnings: list[Running], sweeps: list[Sweep] | None=None):
        super(HintFeature, self).__init__(name, controls)
        self.runnings = runnings
        self.sweeps = sweeps if sweeps is not None else []
        self.palette = Palette([])
        self.ride = False
        self.clock = 0.0
        self.dt = 0.0
        self.hint = Hint(self)

    def frame(self, beats: float, dt: float):
        self.clock += beats
        self.dt = dt
        for running in self.runnings:
            running.advance(beats, dt)

    def lock(self, beat: float):
        """Draws the clock onto the music's beat, its place in a bar, so a tick lands on a beat and a
        sweep turns on a bar line."""
        self.clock += (((beat - self.clock + 2) % 4) - 2) * (1 - math.exp(-self.dt / LOCK))

    def light(self, x: float, y: float) -> tuple[float, Vec3]:
        raise NotImplementedError

    def layers(self, x: float, y: float) -> list[tuple[float, Vec3, float]]:
        cover, lch = self.light(x, y)
        return [(cover, lch, 0.0)]

    def visible_controls(self) -> list[Control]:
        # a sweep's Curve and Period only while it's Curved
        hidden = [c for sweep in self.sweeps if not sweep.curved.value for c in (sweep.curve, sweep.period)]
        return [c for c in self.controls if c not in hidden]

    @property
    def value(self) -> dict:
        return {"base_color": self.hint}

class WashFeature(HintFeature):
    """The palette running up the tree (or with Axis round, round the trunk, as Palette Drift's did),
    a wave of brightness travelling across it, as a tide: its span and spread swept, the palette
    climbing and wobbling, and with Ride, turning with the base hue."""
    def __init__(self):
        self._palette = Control("Palette", PALETTES)
        self._axis = Control("Axis", [Option(n, n) for n in ["up", "round"]])
        self._period = Control("Period", BEATS)
        self._span = Sweep("Span", [Option(n, v) for n, v in [("1/4", 1/4), ("1/2", 1/2), ("1", 1)]], rest=3/2)
        self._wave = Control("Wave", WAVES)
        self._spread = Sweep("Spread", [Option(str(v), v) for v in [0, 1, 2, 3]], rest=3)
        self._ride = ToggleControl("Ride")
        self.span: Param = 0.0
        self.spread: Param = 0.0
        self.swept = (0.0, 0.0)
        self.running = Running(Modulator("wash", "cos", 16, harmonics=HARMONICS), Target("brightness", 1))
        super(WashFeature, self).__init__("Wash", [
            self._palette,
            self._axis,
            self._period,
            *self._span.controls,
            self._wave,
            *self._spread.controls,
            self._ride,
        ], [self.running], [self._span, self._spread])

    @property
    def value(self):
        self.palette = preset(self._palette.value)
        self.running.m.period = self._period.value
        self.running.m.wave = self._wave.value
        self.span = self._span.value
        self.spread = self._spread.value
        self.ride = self._ride.value
        return super(WashFeature, self).value

    def frame(self, beats, dt):
        super(WashFeature, self).frame(beats, dt)
        self.swept = (getv(self.span, self.clock), getv(self.spread, self.clock))

    def layers(self, x, y):
        span, spread = self.swept
        clock = self.clock
        phase = self.running.phase

        def dim(level: float) -> float:
            return 1 - (DIP * (1 - level))

        if self._axis.value == "round":
            # the palette round the trunk in whole turns, the two either side of its span's crossfaded
            # so angle 0 is no edge, the wave travelling up the tree
            turns = span * ROUND
            k = math.floor(turns)
            f = turns - k
            index = -phase - (clock * CLIMB) + (WOBBLE * math.sin(2 * math.pi * (y + (clock / WOBBLE_PERIOD))))
            brightness = dim(wave(self.running.m, phase + (spread * y)))
            return [
                (brightness * (1 - f), palette_at(self.palette, (k * x) + index), 0.0),
                (brightness * f, palette_at(self.palette, ((k + 1) * x) + index), 0.0),
            ]
        # the wave round the trunk in whole turns of its spread, the two either side crossfaded
        k = math.floor(spread)
        f = spread - k
        level = ((1 - f) * wave(self.running.m, phase + (k * x))) + (f * wave(self.running.m, phase + ((k + 1) * x)))
        index = (y * span) - phase - (clock * CLIMB) + (WOBBLE * math.sin(2 * math.pi * (x + (clock / WOBBLE_PERIOD))))
        return [(dim(level), palette_at(self.palette, index), 0.0)]

class SlicesFeature(HintFeature):
    """Soft slices of the palette, each its own colour: round the trunk (as sectors), up it (as
    rings) or leaned (as arms winding up), turning round it or climbing it, gliding or ticking a step
    a beat, and leaning, the rings tilting, one way and the other as they go."""
    def __init__(self):
        self._palette = Control("Palette", PALETTES)
        self._axis = Control("Axis", [Option(n, n) for n in ["around", "up", "leaned"]])
        self._count = Control("Count", [Option(str(v), v) for v in range(2, 7)])
        self._period = Control("Period", BEATS)
        self._direction = Control("Direction", DIRECTIONS)
        self._motion = Control("Motion", [Option(n, n) for n in ["glide", "tick"]])
        # slots of lean over the tree's height
        self._lean = Sweep("Lean", [Option(str(v), v) for v in [1, 2, 4]], shape=mk_bounce)
        self._softness = Control("Softness", SOFTNESS)
        self.lean: Param = 0.0
        self.turn = 0.0  # the turn round the trunk, or with Axis up the climb up the tree
        self.stepped = 0.0  # the clock as the turn last stepped on it, ticked or not
        self.swept = 0.0
        super(SlicesFeature, self).__init__("Slices", [
            self._palette,
            self._axis,
            self._count,
            self._period,
            self._direction,
            self._motion,
            *self._lean.controls,
            self._softness,
        ], [], [self._lean])

    @property
    def value(self):
        self.palette = preset(self._palette.value)
        self.lean = self._lean.value
        return super(SlicesFeature, self).value

    def frame(self, beats, dt):
        super(SlicesFeature, self).frame(beats, dt)
        # a whole turn each period, run on from where it is, so it moves on through a change of control
        stepped = tick(self.clock) if self._motion.value == "tick" else self.clock
        self.turn = (self.turn + ((stepped - self.stepped) * self._direction.value / self._period.value)) % 1
        self.stepped = stepped
        self.swept = getv(self.lean, self.clock)

    def light(self, x, y):
        turn, lean = self.turn, self.swept
        count = self._count.value
        axis = self._axis.value
        if axis == "up":
            u = (count * (y - turn)) + (lean * TILT * math.cos(2 * math.pi * x))
        else:
            twist = count * TWIST if axis == "leaned" else 0
            u = (((x - turn) % 1) * count) + ((twist + lean) * y)
        cover, k = slot(u, self._softness.value)
        return cover, palette_at(self.palette, ((k % count) / count) + (y * PALETTE_UP))

class HiddenFieldFeature(HintFeature):
    """Sparkles that trace a hidden field: a lattice of stars seen from above the treetop, turning
    slowly. As it's revealed the sparkles thicken and soften until the stars stand solid, turning
    faster, then dissolve back into sparse sparkles. A light's place seen from above is its angle and
    height on the cone, so the field has no seam and turns with the spin and the spin ring, and a
    light sparkles only where a star covers it."""
    def __init__(self):
        self._palette = Control("Palette", PALETTES)
        self._points = Control("Points", [Option(str(v), v) for v in [4, 5, 6]])
        self._lattice = Control("Lattice", [Option(n, v) for n, v in [("1/4", 1/4), ("1/3", 1/3), ("1/2", 1/2)]])
        self._period = Control("Period", [Option(str(v), v) for v in [128, 256, 512]])
        self._twinkle = Control("Twinkle", [Option(str(v), v) for v in [4, 6, 8]])
        # how far it's revealed at the sweep's far end: 1 the stars solid
        self._reveal = Sweep("Reveal", [Option(n, v) for n, v in [("1/2", 1/2), ("3/4", 3/4), ("1", 1)]])
        self.reveal: Param = 0.0
        self.share = SPARKLES
        self.sharp = SPARKLE
        self.running = Running(Modulator("turn", "ramp", 32), Target("turn", 1))
        super(HiddenFieldFeature, self).__init__("Hidden Field", [
            self._palette,
            self._points,
            self._lattice,
            self._period,
            self._twinkle,
            *self._reveal.controls,
        ], [self.running], [self._reveal])

    @property
    def value(self):
        self.palette = preset(self._palette.value)
        self.reveal = self._reveal.value
        return super(HiddenFieldFeature, self).value

    def frame(self, beats, dt):
        revealed = getv(self.reveal, self.clock)
        # past a share of 1 by its edge, so every light is fully on once revealed
        self.share = SPARKLES + ((1 + SHARE_EDGE - SPARKLES) * revealed)
        self.sharp = SPARKLE + ((SOLID - SPARKLE) * revealed)
        self.running.m.period = self._period.value / (1 + (FASTER * revealed))
        super(HiddenFieldFeature, self).frame(beats, dt)

    def light(self, x, y):
        # a light sparkles in some Twinkles, at a time in them its height picks, and is dark between;
        # as the share grows, a light fades in over SHARE_EDGE of it
        seed = (math.sin(y * 12345.678) * 43758.5453) % 1
        twinkle = (self.clock / self._twinkle.value) + seed
        pick = (math.sin((math.floor(twinkle) * 91.7) + (seed * 977.3)) * 43758.5453) % 1
        on = min(1.0, (self.share - pick) / SHARE_EDGE)
        if on <= 0:
            return 0.0, (0.0, 0.0, 0.0)
        sparkle = on * (math.sin(math.pi * (twinkle % 1)) ** self.sharp)
        a = 2 * math.pi * (x - self.running.at(0))
        px, pz = (1 - y) * math.cos(a), (1 - y) * math.sin(a)
        # the nearest point of a hexagonal lattice spacing apart, by its column and row
        spacing = self._lattice.value
        row = pz / (spacing * math.sqrt(3) / 2)
        col = (px / spacing) - (row / 2)

        def place(c: int, r: int) -> tuple[float, float]:
            return (c + (r / 2)) * spacing, r * spacing * math.sqrt(3) / 2

        c, r = min((
            (c, r)
            for r in (math.floor(row), math.floor(row) + 1)
            for c in (math.floor(col), math.floor(col) + 1)
        ), key=lambda q: math.hypot(px - place(*q)[0], pz - place(*q)[1]))
        qx, qz = place(c, r)
        dx, dz = px - qx, pz - qz
        rho = math.hypot(dx, dz) / spacing
        edge = STAR * (1 - (STAR_CUT * (0.5 - (0.5 * math.cos(self._points.value * math.atan2(dz, dx))))))
        inside = min(1.0, max(0.0, (((edge - rho) * spacing) / STAR_EDGE) + 0.5))
        # each star its own colour, the golden ratio's steps apart along the palette
        return inside * sparkle, palette_at(self.palette, ((c * 0.381966) + (r * 0.618034)) % 1)

class HintPattern(WiredPattern):
    """A hint, his layers as his patterns compose them (Spiral, Spin, Flicker, Flitter, Flux and
    Sparkles) and Blend. His layers start off, Spiral's Repeats at 1 and unmirrored, so the hint's
    own look is in charge until the walk or Random turns them up. While the music's tempo is sure,
    the hint's clock is drawn onto the beat."""
    def __init__(self, feature: HintFeature):
        super(HintPattern, self).__init__(feature.name)
        spiral = SpiralTopologyFeature(repeats=INTS16)
        spin = SpinFeature()
        flicker = FlickerFeature(max_v=1/2)
        flitter = FlitterFeature(max_v=1/2)
        flux = FluxFeature(max_v=1/2)
        sparkles = SparklesFeature(flux=flux)
        for toggle in [spiral._mirrored, spiral._enabled, spin._enabled, flicker._enabled, flitter._enabled,
                       flux._enabled, sparkles._enabled]:
            toggle.set(1)  # Off
        self.features = [feature, spiral, spin, flicker, flitter, flux, sparkles, BlendFeature()]

    def step(self, t, pixels, sound, beating, beat, hue):
        if beating:
            self.features[0].lock(sound.beat)

class Wash(HintPattern):
    def __init__(self):
        super(Wash, self).__init__(WashFeature())

class Slices(HintPattern):
    def __init__(self):
        super(Slices, self).__init__(SlicesFeature())

class HiddenField(HintPattern):
    def __init__(self):
        super(HiddenField, self).__init__(HiddenFieldFeature())

HINTS = [Wash, Slices, HiddenField]
`,"layout.py":`import json
import logging
import math
import os
import random
from statistics import median

log = logging.getLogger(__name__)

LAYOUTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "layouts")

# A layout is a list of strands, each a list of lights as the device gives them: {x, y, z}, y up

def load(path: str) -> list[list[dict]]:
    with open(path) as file:
        return json.load(file)

def save(path: str, strands: list[list[dict]]):
    with open(path, "w") as file:
        json.dump(strands, file)

def cone(strands: int=2,
         per_strand: int=400,
         turns: float=14,
         base: float=0.38,
         depth: tuple[float, float]=(0.55, 1.0),
         seed: int=1) -> list[list[dict]]:
    """A generic tree: each strand a helix from the bottom to the top, offset round the trunk from
    the others, each light depth[0] to depth[1] of the way out to the surface. base is the base
    radius over the height."""
    rnd = random.Random(seed)
    layout = []
    for strand in range(strands):
        lights = []
        for i in range(per_strand):
            y = (i + 0.5 + rnd.uniform(-0.3, 0.3)) / per_strand
            a = 2 * math.pi * ((turns * y) + (strand / strands)) + rnd.uniform(-0.08, 0.08)
            r = base * (1 - y) * rnd.uniform(*depth)
            lights.append({"x": r * math.cos(a), "y": y, "z": r * math.sin(a)})
        layout.append(lights)
    return layout

def _line(points: list[tuple[float, float]]):
    """The least-squares straight line through (y, v) points, as a function of y."""
    my = sum(y for y, _ in points) / len(points)
    mv = sum(v for _, v in points) / len(points)
    spread = sum((y - my) ** 2 for y, _ in points)
    slope = sum((y - my) * (v - mv) for y, v in points) / spread if spread else 0.0
    return lambda y: mv + (slope * (y - my))

def normalize(lights: list[dict], slices: int=10, stray: float=1.5) -> list[dict]:
    """Puts a layout the Twinkly app estimated where Pixel expects it, so angles round the trunk are
    true. A good layout comes through all but unchanged.

    The height is rescaled so the tree's lowest light is at 0 and its highest at 1. The tree runs
    out from its 1st and 99th percentile lights to the last light before a gap in height wider than
    a tenth of the span between them; a light past that gap is a stray, clamped to its end."""
    ys = sorted(light["y"] for light in lights)
    bottom, top = int(len(ys) * 0.01), int(len(ys) * 0.99)
    gap = 0.1 * (ys[top] - ys[bottom])
    while bottom > 0 and ys[bottom] - ys[bottom - 1] <= gap:
        bottom -= 1
    while top < len(ys) - 1 and ys[top + 1] - ys[top] <= gap:
        top += 1
    lo, hi = ys[bottom], ys[top]
    heights = [min(1.0, max(0.0, (light["y"] - lo) / (hi - lo))) for light in lights]

    # the trunk: a straight line through the median x and z of each height slice, which catches a lean
    groups: dict[int, list[int]] = {}
    for i, y in enumerate(heights):
        groups.setdefault(min(slices - 1, int(y * slices)), []).append(i)
    groups = {k: g for k, g in groups.items() if len(g) >= 3}

    def slice_medians(values):
        return [(median(heights[i] for i in g), median(values[i] for i in g)) for g in groups.values()]

    trunk_x = _line(slice_medians([light["x"] for light in lights]))
    trunk_z = _line(slice_medians([light["z"] for light in lights]))
    out = [
        {"x": light["x"] - trunk_x(y), "y": y, "z": light["z"] - trunk_z(y)}
        for light, y in zip(lights, heights)
    ]

    # a light past \`stray\` times the median radius at its height goes back in to the surface: the
    # median radius a line through the slices' (a tree tapers), kept above a tenth of the widest
    radii = [math.hypot(light["x"], light["z"]) for light in out]
    medians = slice_medians(radii)
    taper = _line(medians)
    floor = 0.1 * max(m for _, m in medians)
    expected = [max(floor, taper(y)) for y in heights]
    strays = [i for i, r in enumerate(radii) if r > stray * expected[i]]
    if strays:
        surface = max(r / e for r, e in zip(radii, expected) if r <= stray * e)
        for i in strays:
            pull = surface * expected[i] / radii[i]
            out[i]["x"] *= pull
            out[i]["z"] *= pull
        log.info("Pulled %d stray lights back to the surface: %s", len(strays), strays)
    return out

if __name__ == "__main__":
    # writes the generic cone the simulator plays when there's no tree.json
    save(os.path.join(LAYOUTS, "cone.json"), cone())
`,"look.py":`"""A Bermuda look on the tree: the importer that maps a look's JSON export (Bermuda's Bank, the whole
scene) to a tree pattern's values, and the pattern they make, a hint of the look and not its picture.
The look's palette stops (with its hue, contrast and time) become the pattern's palette; its star's
points the number of sectors round the trunk; its contour's rings and drift the bands and their
speed; and each modulator target moves the part its knob names, its phase spread laid round the
trunk."""
import json
import math
import os
import re

from control import BlendFeature, Control, WiredPattern
from hints import SOFTNESS, HintFeature, slot
from motion import Modulator, Running, Target
from palette import Palette, Stop, js_round, palette_at

LOOKS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "looks")

def read(scene: dict, path: str):
    """The value at path in the scene, as "levels[0].variants[0].shape.n.value", or an error naming
    the field the look is missing."""
    value = scene
    for key in re.findall(r"[^.[\\]]+", path):
        try:
            value = value[int(key)] if isinstance(value, list) else value[key]
        except (KeyError, IndexError, TypeError, ValueError):
            raise ValueError(f"The look has no {path}") from None
    return value

def part(knob: str) -> str:
    """The moving part a modulator's target drives: a turn the sectors' spin, a contour knob the bands,
    the palette's hue its hue (its depth in degrees), any other palette knob the palette's index, and
    any other knob the brightness."""
    if knob.split(".")[-1] == "turn":
        return "spin"
    if knob.startswith("contour"):
        return "bands"
    if knob == "palette.hue":
        return "hue"
    if knob.startswith("palette"):
        return "palette"
    return "brightness"

def mapped(scene: dict) -> dict:
    """A look's tree pattern, by name, from Bermuda's scene."""
    stops = read(scene, "palette.stops")
    timing = []
    for i in range(len(read(scene, "modulators"))):
        m = f"modulators[{i}]"
        wave = read(scene, f"{m}.wave")
        for j in range(len(read(scene, f"{m}.targets"))):
            target = read(scene, f"{m}.targets[{j}]")
            timing.append({
                "part": part(read(scene, f"{m}.targets[{j}].knob")),
                "wave": wave,
                "period": read(scene, f"{m}.period"),
                "phase": read(scene, f"{m}.phase"),
                "harmonics": read(scene, f"{m}.harmonics") if wave == "beat" else None,
                "steps": read(scene, f"{m}.steps") if wave == "steps" else None,
                "glide": read(scene, f"{m}.glide"),
                "depth": read(scene, f"{m}.targets[{j}].depth"),
                # whole turns round the trunk, as part of one would tear at angle 0
                "spread": js_round(target.get("phaseSpread", 0)),
            })
    return {
        "name": read(scene, "name"),
        "palette": {
            "stops": [{
                "at": read(scene, f"palette.stops[{i}].at"),
                "lch": [read(scene, f"palette.stops[{i}].lch[{c}].value") for c in range(3)],
                "mix": read(scene, f"palette.stops[{i}].mix"),
            } for i in range(len(stops))],
            "hue": read(scene, "palette.hue.value"),
            "contrast": read(scene, "palette.contrast.value"),
            "time": read(scene, "palette.time.value"),
        },
        "sectors": read(scene, "levels[0].variants[0].shape.n"),
        "bands": read(scene, "contour.rings.value"),
        "drift": read(scene, "contour.drift.value"),
        "timing": timing,
    }

def import_look(path: str) -> str:
    """Writes the tree pattern for the look exported to path into looks/, and gives its file."""
    with open(path, encoding="utf-8") as file:
        values = mapped(json.load(file))
    os.makedirs(LOOKS, exist_ok=True)
    # named as Bermuda's export names its file
    out = os.path.join(LOOKS, re.sub(r"[^\\w-]+", "-", values["name"], flags=re.ASCII) + ".json")
    with open(out, "w", encoding="utf-8") as file:
        json.dump(values, file, indent=2, ensure_ascii=False)
        file.write("\\n")
    return out

class LookFeature(HintFeature):
    """The look's sectors, their spin, the bands, the palette's index and hue and the brightness, each
    moved by the modulators that drive it."""
    def __init__(self, values: dict):
        palette = values["palette"]
        self.palette_time = palette["time"]
        self.sectors = values["sectors"]
        self.bands = values["bands"]
        self.drift_speed = values["drift"]  # radians a beat
        self.drift = 0.0
        self.colour = 0.0
        self.parts: dict[str, list[Running]] = {name: [] for name in ["spin", "bands", "palette", "hue", "brightness"]}
        for i, t in enumerate(values["timing"]):
            m = Modulator(str(i), t["wave"], t["period"], t["phase"], t["harmonics"], t["steps"], t["glide"])
            self.parts[t["part"]].append(Running(m, Target(t["part"], t["depth"], t["spread"])))
        self._softness = Control("Softness", SOFTNESS)
        super(LookFeature, self).__init__("Look", [self._softness], sum(self.parts.values(), []))
        self.palette = Palette([Stop(s["at"], tuple(s["lch"]), s["mix"]) for s in palette["stops"]],
                               palette["hue"], palette["contrast"])

    def frame(self, beats, dt):
        super(LookFeature, self).frame(beats, dt)
        # the contour's ring phase and the palette's running index, as motion.ts runs them
        self.drift = (self.drift + (self.drift_speed * beats)) % (2 * math.pi)
        self.colour = (self.colour + (self.palette_time * beats)) % 1

    def light(self, x, y):
        def moved(name: str) -> float:
            return sum(running.offset(x) for running in self.parts[name])

        softness = self._softness.value
        cover, k = slot(((x - moved("spin")) % 1) * self.sectors, softness)
        if self.bands:
            band, _ = slot((y * self.bands) - (self.drift / (2 * math.pi)) - moved("bands"), softness)
            cover *= band
        brightness = min(1.0, max(0.0, 1 + moved("brightness")))
        L, C, h = palette_at(self.palette, (k / self.sectors) + self.colour + moved("palette"))
        # palette_at adds the palette's hue to every hue it mixes, so a hue moved after is the same
        return cover * brightness, (L, C, h + moved("hue"))

class Look(WiredPattern):
    def __init__(self, values: dict):
        super(Look, self).__init__(values["name"])
        self.features = [LookFeature(values), BlendFeature()]

def load_looks() -> list[Look]:
    """A pattern for each look in looks/."""
    if not os.path.isdir(LOOKS):
        return []
    looks = []
    for name in sorted(n for n in os.listdir(LOOKS) if n.endswith(".json")):
        with open(os.path.join(LOOKS, name), encoding="utf-8") as file:
            looks.append(Look(json.load(file)))
    return looks
`,"motion.py":`"""Modulators, ported from Bermuda's src/motion.ts (a15fad7) with its names in snake_case and its
numbers: the waves, the phase that runs at a modulator's period in beats, the phase spread, the
depth and glide. On the tree a link group's member becomes a light's share of the spread: its angle
round the trunk or its height, 0 to 1, so the phase is a wave travelling round or up the tree."""
from dataclasses import dataclass
import math

# The shares of a spread a gliding target keeps its glided wave at, as Bermuda keeps one for each
# member of a link group; a light reads between the two nearest its own
MEMBERS = 128

@dataclass
class Target:
    knob: str  # the address of the knob it moves, as "levels[hexA].affine.turn"
    depth: float
    phase_spread: float = 0.0

@dataclass
class Modulator:
    id: str
    wave: str  # "cos", "tri", "beat", "ramp" or "steps"
    period: float  # in beats
    phase: float = 0.0  # in cycles
    harmonics: tuple[float, float] | None = None  # the beat wave's
    steps: list[float] | None = None  # the steps wave's
    glide: float = 0.0  # in seconds

def wave(m: Modulator, p: float) -> float:
    """A wave's value at phase p (cycles), 0 to 1; cos and tri start at 1 as the Tapestries' sinT and
    sawT did."""
    f = p - math.floor(p)
    if m.wave == "cos":
        return 0.5 + 0.5 * math.cos(2 * math.pi * f)
    if m.wave == "tri":
        return abs(f - 0.5) * 2
    if m.wave == "beat":
        a, b = m.harmonics
        return abs(math.cos(2 * math.pi * f * a) * math.cos(2 * math.pi * f * b) * 0.5 - 0.5)
    if m.wave == "ramp":
        return f
    if m.wave == "steps":
        steps = m.steps
        return steps[min(len(steps) - 1, math.floor(f * len(steps)))]

def follow(start: float | None, to: float, glide: float, dt: float) -> float:
    return to if start is None or glide <= 0 else to + (start - to) * math.exp(-dt / glide)

class Running:
    """One of a modulator's targets as it runs on the tree, motion.ts's advance for one target: the
    modulator's phase, run on by each frame's beats, and with a glide, the glided wave at MEMBERS + 1
    even shares of the spread."""
    def __init__(self, m: Modulator, target: Target):
        self.m = m
        self.target = target
        self.phase = 0.0
        self.smooth: list[float | None] = [None] * (MEMBERS + 1)

    def advance(self, beats: float, dt: float):
        m = self.m
        self.phase = (self.phase + beats / m.period) % 1
        if m.glide > 0:
            for member in range(MEMBERS + 1):
                self.smooth[member] = follow(self.smooth[member], self.raw(member / MEMBERS), m.glide, dt)

    def raw(self, share: float) -> float:
        m = self.m
        return wave(m, self.phase + m.phase + self.target.phase_spread * share)

    def at(self, share: float) -> float:
        """The glided wave at a light's share of the spread, 0 to 1."""
        if self.m.glide <= 0:
            return self.raw(share)
        x = min(1.0, max(0.0, share)) * MEMBERS
        k = min(MEMBERS - 1, math.floor(x))
        a, b = self.smooth[k], self.smooth[k + 1]
        return a + (b - a) * (x - k)

    def offset(self, share: float) -> float:
        """What it adds to its knob at a light's share: its depth either way of the knob's base."""
        return self.target.depth * (2 * self.at(share) - 1)
`,"music.py":`"""twinky's beat clock, kept from the music messages the page sends about 30 times a second as it
listens: each says where the beat was at a time on the Mac's clock, which twinky shares."""
from dataclasses import dataclass, replace

# How long after the last message the links let go, in seconds
LET_GO = 1.0

@dataclass(frozen=True)
class Sound:
    """What the page heard at a time: the fields of its music message."""
    time: float  # on the Mac's clock, seconds since 1970, as time.time() gives
    bpm: float  # 0 until the page finds a tempo
    beat: float  # beats counted at time, the fraction its phase: 0 on a beat
    bar: int  # whole bars counted at time, 4 beats a bar
    confidence: float  # how well the sound's onsets land on the beat, 0 to 1
    low: float  # the bands, each 0 to 1 of its own range over the last 10 s
    mid: float
    high: float
    tone: float  # 0 dark to 1 light
    drive: float  # 0 groove to 1 drive

class BeatClock:
    """The last message heard, extrapolated at its bpm to any time until the links let go."""
    def __init__(self):
        self.heard: Sound | None = None

    def hear(self, message: dict):
        """Takes a music message, from the server's thread."""
        self.heard = Sound(**message)

    def at(self, t: float, latency: float=0.0) -> Sound | None:
        """The sound at t, its beat extrapolated from the last message: with a latency, as it was that
        many seconds earlier (later, if negative), so the lights line up with what the room hears.
        None once no message has come for LET_GO seconds."""
        heard = self.heard
        if heard is None or t - heard.time > LET_GO:
            return None
        beat = heard.beat + ((t - latency - heard.time) * heard.bpm / 60)
        return replace(heard, time=t, beat=beat, bar=int(beat // 4))
`,"palette.py":`"""OKLCh palettes, ported from Bermuda's src/colour.ts (a15fad7) with its names in snake_case and
its numbers: iq's cosine presets, the sRGB and OKLCh conversions, palette stops filled from a preset,
and the palette at an index. The tree takes its colour as linear light, oklch_to_linear's values,
as its LEDs are linear PWM; oklch_to_srgb is those through to_gamma, as Bermuda's screen takes them."""
from dataclasses import dataclass
import math

Vec3 = tuple[float, float, float]

@dataclass
class Stop:
    """A palette stop: where it sits on the index (0 to 1), its L, C and h, and how it mixes into the
    next: "straight" in Lab, "short" or "long" round the hue circle."""
    at: float
    lch: Vec3
    mix: str

@dataclass
class Palette:
    """Bermuda's scene palette, the parts the tree reads: its stops, a hue added to each stop's in
    degrees, and the contrast its lightness is spread by round 0.5."""
    stops: list[Stop]
    hue: float = 0.0
    contrast: float = 1.0

# iq's cosine palettes, a + b·cos(2π(c·t + d)), as the Tapestries used them
COSINES: dict[str, tuple[Vec3, Vec3, Vec3, Vec3]] = {
    "rainbow": (
        (0.5, 0.5, 0.5),
        (0.5, 0.5, 0.5),
        (1, 1, 1),
        (0, 0.333, 0.667),
    ),
    "warm": (
        (0.6, 0.6, 0.6),
        (0.4, 0.3, 0.35),
        (2, 2, 2),
        (0.85, 0.55, 0.25),
    ),
    "dusk": (
        (0.744, 0.244, 0.577),
        (0.231, 0.395, 0.498),
        (0.759, 1.375, 0.932),
        (3.477, 6.066, 1.898),
    ),
    "ice": (
        (0.5, 0.5, 0.5),
        (0.5, 0.5, 0.5),
        (1, 1, 1),
        (0.3, 0.2, 0.2),
    ),
    "forest": (
        (0.5, 0.5, 0.5),
        (0.5, 0.5, 0.5),
        (1, 1, 0.5),
        (0.8, 0.9, 0.3),
    ),
    "ember": (
        (0.5, 0.5, 0.5),
        (0.5, 0.5, 0.5),
        (1, 0.7, 0.4),
        (0, 0.15, 0.2),
    ),
}

def cosine(abcd: tuple[Vec3, Vec3, Vec3, Vec3], t: float) -> Vec3:
    a, b, c, d = abcd
    return tuple(min(1, max(0, a[i] + b[i] * math.cos(2 * math.pi * (c[i] * t + d[i])))) for i in range(3))

def to_linear(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def to_gamma(c: float) -> float:
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055

def srgb_to_oklch(rgb: Vec3) -> Vec3:
    r, g, b = (to_linear(c) for c in rgb)
    l = math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
    m = math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
    s = math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
    L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
    A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
    B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    h = (math.atan2(B, A) * 180) / math.pi
    return (L, math.hypot(A, B), (h + 360) % 360)

def oklch_to_linear(lch: Vec3) -> Vec3:
    """oklchToSrgb's R, G and B before to_gamma: linear light, each kept to 0 to 1."""
    L, C, h = lch
    A = C * math.cos((h * math.pi) / 180)
    B = C * math.sin((h * math.pi) / 180)
    l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3
    m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3
    s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3
    return tuple(min(1, max(0, c)) for c in (
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ))

def oklch_to_srgb(lch: Vec3) -> Vec3:
    return tuple(to_gamma(c) for c in oklch_to_linear(lch))

def js_round(v: float) -> float:
    # JavaScript's Math.round: halves round up, where Python's round takes them to the even side
    return math.floor(v + 0.5)

def round3(v: float) -> float:
    return js_round(v * 1000) / 1000

def stops_from_cosine(name: str, count: int) -> list[Stop]:
    """Samples a cosine preset at evenly spaced stops, each segment mixing the short way round."""
    stops = []
    for i in range(count):
        L, C, h = srgb_to_oklch(cosine(COSINES[name], i / count))
        stops.append(Stop(i / count, (round3(L), round3(min(C, 0.37)), js_round(h)), "short"))
    return stops

def palette_at(palette: Palette, t: float) -> Vec3:
    """The palette at index t, as Bermuda's shader works it out: L, C and h."""
    stops = palette.stops
    t -= math.floor(t)
    k = len(stops) - 1
    for i, s in enumerate(stops):
        if s.at <= t:
            k = i
    k2 = 0 if k + 1 >= len(stops) else k + 1
    a = stops[k]
    b = stops[k2]
    a1 = b.at + 1 if k2 <= k else b.at
    f = min(1, max(0, ((t + 1 if t < a.at else t) - a.at) / max(a1 - a.at, 1e-5)))
    ha, hb = a.lch[2] + palette.hue, b.lch[2] + palette.hue
    L = a.lch[0] + (b.lch[0] - a.lch[0]) * f
    lightness = min(1, max(0, 0.5 + (L - 0.5) * palette.contrast))
    if a.mix == "straight":
        def lab(s: Stop, h: float) -> tuple[float, float]:
            return (s.lch[1] * math.cos((h * math.pi) / 180), s.lch[1] * math.sin((h * math.pi) / 180))
        xa, ya = lab(a, ha)
        xb, yb = lab(b, hb)
        x = xa + (xb - xa) * f
        y = ya + (yb - ya) * f
        return (lightness, math.hypot(x, y), (math.atan2(y, x) * 180) / math.pi)
    dh = ((((hb - ha + 180) % 360) + 360) % 360) - 180
    if a.mix == "long":
        # Math.sign: 0 at 0
        dh -= ((dh + 1e-6 > 0) - (dh + 1e-6 < 0)) * 360
    return (lightness, a.lch[1] + (b.lch[1] - a.lch[1]) * f, ha + dh * f)
`,"param.py":`import random
from typing import Any, Callable, TypeAlias

CurveFunc: TypeAlias = Callable[[float], float]
ControlPoint: TypeAlias = tuple[float, float]
ControlPoints: TypeAlias = list[ControlPoint]

class Curve:
    def __init__(self, shape_func: CurveFunc, control_points: ControlPoints):
        if len(control_points) < 2:
            raise ValueError("Need at least 2 control_points")
            
        self.shape_func = shape_func
        self.control_points = control_points
        self.length = self.control_points[-1][0]

    def _find_control_points(self, s) -> tuple[int, int]:
        bottom = None
        for i, [start, _] in enumerate(self.control_points):
            if start <= s:
                bottom = i

        if bottom is None:
            raise ValueError("Couldn't find the bottom")

        return (bottom, bottom + 1)

    def __call__(self, t: float) -> float:
        s = t % self.length
        bottom, top = self._find_control_points(s)
        start_t, start_v = self.control_points[bottom]
        end_t, end_v = self.control_points[top]
        ss = (s - start_t) / (end_t - start_t)
        return (self.shape_func(ss) * (end_v - start_v)) + start_v

    def __repr__(self):
        return f"{self.__class__.__name__}({self.control_points})"

    def __add__(self, y):
        return Curve(self.shape_func, [(t, v + y) for (t, v) in self.control_points])

    def __radd__(self, y):
        return self.__add__(y)

    def __sub__(self, y):
        return Curve(self.shape_func, [(t, v - y) for (t, v) in self.control_points])

    def __rsub__(self, y):
        return Curve(self.shape_func, [(t, y - v) for (t, v) in self.control_points])

    def __mul__(self, y):
        return Curve(self.shape_func, [(t, v * y) for (t, v) in self.control_points])

    def __rmul__(self, y):
        return self.__mul__(y)

    def __truediv__(self, y):
        return Curve(self.shape_func, [(t, v / y) for (t, v) in self.control_points])

    def __rtruediv__(self, y):
        return Curve(self.shape_func, [(t, y / v) for (t, v) in self.control_points])

    def __floordiv__(self, y):
        return Curve(self.shape_func, [(t, v // y) for (t, v) in self.control_points])

    def __floorrdiv__(self, y):
        return Curve(self.shape_func, [(t, y // v) for (t, v) in self.control_points])

    def __mod__(self, y):
        return Curve(self.shape_func, [(t, v % y) for (t, v) in self.control_points])

    def __rmod__(self, y):
        return Curve(self.shape_func, [(t, y % v) for (t, v) in self.control_points])

    def __neg__(self):
        return self.__mul__(-1)

Param: TypeAlias = CurveFunc | Curve | float

def getv(v: Param, t: float) -> float:
    return v(t) if callable(v) else v

def const(_: float) -> float:
    return 0

def rand(minv: float=0.0, maxv: float=1.0) -> CurveFunc:
    def func(_: float) -> float:
        s = random.random()
        return (s * (maxv - minv)) + minv
    return func

def choice(choices: Callable[[float], list[Param]] | list[Param]) -> CurveFunc:
    def func(t: float) -> Any:
        c = choices(t) if callable(choices) else choices
        pick = random.choice(c)
        return getv(pick, t)
    return func
`,"sim.py":`import os

import layout

class FakeInterface:
    """Takes Blender's calls in place of a device.Interface, and keeps every frame's bytes."""
    def __init__(self, strand_layout: list[dict]):
        self.layout = strand_layout
        self.host = "sim"
        self.mode = None
        self.frames: list[bytes] = []

    def set_mode(self, mode: str):
        self.mode = mode

    def set_rt_frame_socket(self, frame, version, leds_number=None):
        self.frames.append(frame.read())

class SimLights:
    """A tree with no network, on the generic cone or a layout dumped from the real tree
    (python device.py writes layouts/tree.json)."""
    def __init__(self, path: str=os.path.join(layout.LAYOUTS, "cone.json")):
        self.interfaces = [FakeInterface(strand) for strand in layout.load(path)]
`,"streamer.py":`from copy import deepcopy
from enum import Enum
import math
import random
from typing import TypeAlias

from colors import Color
from param import Param, getv, rand
from utils import coverage

# The soft edges of a streamer: across its width, as a fraction of a turn, and along its length
EDGE_T = 0.03
EDGE_Y = 0.05

class Direction(Enum):
    FROM_BOT = 0
    FROM_TOP = 1

class Spin(Enum):
    CLOCKWISE = 1
    COUNTERCLOCKWISE = -1

class StreamerFunc:
    def __init__(self,
                 w: Param | None=None,
                 h: Param | None=None,
                 s: Param | None=None,
                 l: Param | None=None,
                 make_white: bool=False,
                 ignore_color: bool=False):
        self.w = w
        self.h = h
        self.s = s
        self.l = l
        self.make_white = make_white
        self.ignore_color = ignore_color
        self._h = None

    def __call__(self, color: Color, t: float, blend: float) -> Color:
        if color.l != -1.0 and self.make_white:
            return Color(
                w=1,
                s=0.0,
                l=-0.75,
            )

        h = blend
        if self.h is not None and self._h is None:
            self._h = getv(self.h, t)
        h += self._h if self._h is not None else 0
        h += 0 if self.ignore_color else getv(color.h, t)

        return Color(
            w=getv(self.w, t) if self.w is not None else color.w,
            h=h,
            s=getv(self.s, t) if self.s is not None else color.s,
            l=getv(self.l, t) if self.l is not None else color.l,
        )

class RandomColorStreamerFunc(StreamerFunc):
    def __init__(self,
                 minh: Param=0.0,
                 maxh: Param=1.0,
                 w: Param | None=None,
                 s: Param | None=None,
                 l: Param | None=None):
        self.minh = minh
        self.maxh = maxh
        self.w = w
        self.s = s
        self.l = l

    def h(self, t: float) -> float:
        return rand(getv(self.minh, t), getv(self.maxh, t))(t)

    def __call__(self, color: Color, t: float, blend: float) -> Color:
        return Color(
            w=getv(self.w, t) if self.w is not None else color.w,
            h=self.h(t),
            s=getv(self.s, t) if self.s is not None else color.s,
            l=getv(self.l, t) if self.l is not None else color.l,
        )

class Streamer:
    def __init__(self,
                 initial_t: float,
                 norm_t: float,
                 func: StreamerFunc | None=None,
                 move_dir: Direction | None=None,
                 spin_dir: Spin | None=None,
                 angle: Param | None=None,
                 spin: Param | None=None,
                 length: Param | None=None,
                 width: Param | None=None,
                 lifetime: Param | None=None):
        self.initial_t = initial_t
        self.norm_t = norm_t
        move_dir = move_dir if move_dir is not None else Direction.FROM_BOT
        spin_dir = spin_dir if spin_dir is not None else Spin.CLOCKWISE
        angle = angle if angle is not None else random.random()
        spin = spin if spin is not None else 1.0
        length = length if length is not None else 1.0
        width = width if width is not None else 0.1
        lifetime = lifetime if lifetime is not None else 1.0

        self.reverse = move_dir != Direction.FROM_TOP
        self.func = deepcopy(func) if func is not None else StreamerFunc()
        self.move_dir = move_dir
        self.spin_dir = 1 if spin_dir == Spin.CLOCKWISE else -1
        self.angle = angle
        self.spin = getv(spin, norm_t)
        self.length = getv(length, norm_t)
        self.width = getv(width, norm_t)
        self.lifetime = getv(lifetime, norm_t)

    def alive(self, t):
        return t < self.initial_t + self.lifetime

    def place(self, t) -> tuple[float, float]:
        # once a frame: the bottom of its length, and its angle
        s = (t - self.initial_t) / self.lifetime
        if self.reverse:
            miny = -self.length + (s * (1 + self.length))
        else:
            miny = 1 - (s * (1 + self.length))
        return miny, getv(self.angle, t)

    def coverage(self, pixel, miny, angle) -> float:
        if not miny - EDGE_Y < pixel.y < miny + self.length + EDGE_Y:
            return 0.0
        along = coverage(pixel.y, miny, miny + self.length, EDGE_Y, wrap=False)
        mino = ((pixel.y * self.spin * self.spin_dir) + angle) % 1
        return along * coverage(pixel.t, mino, mino + self.width, EDGE_T)

    def __repr__(self):
        return f"Streamer({self.angle},{self.spin},{self.length},{self.width},{self.lifetime})"

class StreamerValue:
    def __init__(self,
                 func: StreamerFunc | None=None,
                 move_dir: Direction | None=None,
                 spin_dir: Spin | None=None,
                 angle: Param | None=None,
                 spin: Param | None=None,
                 length: Param | None=None,
                 width: Param | None=None,
                 lifetime: Param | None=None):
        self.func = func
        self.move_dir = move_dir
        self.spin_dir = spin_dir
        self.angle = angle
        self.spin = spin
        self.length = length
        self.width = width
        self.lifetime = lifetime

StreamerValues: TypeAlias = list[StreamerValue]

class StreamerChoices:
    def __init__(self,
                 delay: float,
                 choices: list[StreamerValues],
                 choose: tuple[int, int] | None=None,
                 delay_offset: float=0):
        self.choices = choices
        self.choose = choose
        self.delay = delay
        self.delay_offset = delay_offset

    def __call__(self, t: float, last_t: float | None) -> StreamerValues:
        # t and last_t (None at first) are the turn's clock, so a pattern starts each turn afresh
        trigger = math.floor((t - self.delay_offset) / self.delay)
        if trigger < 0 or (
            last_t is not None
            and trigger == math.floor((last_t - self.delay_offset) / self.delay)
        ):
            return []

        c = self.choices[(trigger + 1) % len(self.choices)]
        if self.choose:
            pick = (
                self.choose[0]
                if self.choose[0] == self.choose[1] else
                random.randint(*self.choose)
            )
            return random.choices(c, k=pick)
        return c

class CombinedChoices(StreamerChoices):
    def __init__(self, streamer_choices: list[StreamerChoices]):
        self.streamer_choices = streamer_choices

    def __call__(self, t: float, last_t: float | None) -> StreamerValues:
        r = []
        for sc in self.streamer_choices:
            r.extend(sc(t, last_t))
        return r

StreamerParam: TypeAlias = StreamerChoices | StreamerValues

def getv_streamers(v: StreamerParam, t: float, last_t: float | None) -> StreamerValues:
    return v(t, last_t) if isinstance(v, StreamerChoices) else v
`,"topologies.py":`from typing import Callable, TypeAlias

from param import Param, CurveFunc, Curve, getv

# A topology, once a frame, gives the function that moves each light's (pixel_t, pixel_y) to its new pixel_t
TopologyFunc: TypeAlias = Callable[[float, float], float]

class Topology:
    def __call__(self, t: float) -> TopologyFunc:
        return lambda pixel_t, pixel_y: pixel_t

class SpinTopology(Topology):
    def __init__(self, angle: Param):
        self.angle = angle

    def __call__(self, t: float) -> TopologyFunc:
        angle = getv(self.angle, t)
        return lambda pixel_t, pixel_y: (pixel_t + angle) % 1

class SpiralTopology(Topology):
    def __init__(self, turn: Param, mid: Param=0):
        self.turn = turn
        self.mid = mid

    def __call__(self, t: float) -> TopologyFunc:
        turn = getv(self.turn, t)
        mid = getv(self.mid, t)
        return lambda pixel_t, pixel_y: (pixel_t + ((pixel_y - mid) * turn)) % 1

class DistortTopology(Topology):
    def __init__(self,
                 shape_func: CurveFunc,
                 top_d: Param=0,
                 bot_d: Param=0,
                 mid: Param=0.5):
        self.shape_func = shape_func
        self.top_d = top_d
        self.bot_d = bot_d
        self.mid = mid

    def __call__(self, t: float) -> TopologyFunc:
        top_d = getv(self.top_d, t)
        bot_d = getv(self.bot_d, t)
        mid = getv(self.mid, t)
        distort_func = Curve(self.shape_func, [
            (0, 0),
            (mid/2, bot_d),
            (mid, 0),
            ((1+mid)/2, top_d),
            (1, 0),
        ])
        return lambda pixel_t, pixel_y: pixel_t + getv(distort_func, pixel_y)

class MirrorTopology(Topology):
    def __init__(self, count: Param):
        self.count = count

    def __call__(self, t: float) -> TopologyFunc:
        count = getv(self.count, t)

        def func(pixel_t: float, pixel_y: float) -> float:
            r = ((pixel_t * count) % 1) * 2
            return r if r < 1.0 else 2.0 - r
        return func

class RepeatTopology(Topology):
    def __init__(self, count: Param):
        self.count = count

    def __call__(self, t: float) -> TopologyFunc:
        count = getv(self.count, t)
        return lambda pixel_t, pixel_y: (pixel_t * count) % 1
`,"utils.py":`import random
from typing import Callable

def rand(minv=0.0, maxv=1.0) -> Callable[[], float]:
    def func() -> float:
        s = random.random()
        return (s * (maxv - minv)) + minv

    return func

def choice(choices: list[float]) -> Callable[[], float]:
    def func() -> float:
        return random.choice(choices)

    return func

def mk_bump(period, s, e=None):
    if e is None:
        e = s
        s = 0
    return [
        (0,            s),
        (period * 0.5, e),
        (period,       s),
    ]

def mk_bounce(period, s, e=None):
    if e is None:
        e = s
        s = 0
    return [
        (0,             s),
        (period * 0.25, e),
        (period * 0.5,  -s),
        (period * 0.75, -e),
        (period,        s),
    ]

def mk_ramp(period, s, e=None):
    if e is None:
        e = s
        s = 0
    return [
        (0,      s),
        (period, e),
    ]

def coverage(x, start, end, edge, wrap=True):
    """How much of a light at x, seen as a box \`edge\` wide, the span from start to end covers.
    With wrap, the span is an angle round the trunk."""
    lo, hi = x - edge / 2, x + edge / 2
    covered = 0.0
    for shift in (-1, 0, 1) if wrap else (0,):
        covered += max(0.0, min(hi, end + shift) - max(lo, start + shift))
    return min(1.0, covered / edge)
`,"walk.py":`"""The walk, the Blender's autopilot: every so often one control of one feature steps to an option near
its own and the tree glides there; now and then a whole feature rerolls, and rarely the pattern changes.
Its live controls are Pace, Reach, Stay, a pin on each of the pattern's features, Back and Nudge."""
from collections import deque
import math
import random

from control import Control, Feature, Option, ToggleControl, WiredPattern

# the seconds between steps, or while the music's beat is sure, the bars
PACES = [Option(n, v) for n, v in [
    ("slow", (8.0, 8)),
    ("easy", (4.0, 4)),
    ("brisk", (2.0, 2)),
    ("fast", (1.0, 1)),
]]
# how many options away a step may go; at jump, the old autopilot: a freshly randomized pattern every
# pattern_length seconds
REACHES = [Option(n, v) for n, v in [
    ("near", 1),
    ("far", 3),
    ("any", math.inf),
    ("jump", None),
]]
# the share of steps that reroll a whole feature, and that change the pattern
REROLL = 0.1
CHANGE = 0.03
# the steps Back can undo
BACK_STEPS = 10

def movable(feature: Feature) -> list[int]:
    """The feature's visible controls a step can move, by their index among the visible ones."""
    return [i for i, c in enumerate(feature.visible_controls()) if len(c.options) > 1]

class Walk:
    def __init__(self):
        self.pace = Control("Pace", PACES)
        self.pace.set(1)
        self.reach = Control("Reach", REACHES)
        self.stay = ToggleControl("Stay")
        self.stay.set(1)  # Off
        self.pins: set[int] = set()  # the pattern on show's features the walk holds still, by index
        # where each step left from: the pattern, its picks by name, whether it was saved and whether
        # changed since
        self.back_steps: deque[tuple[WiredPattern, dict, bool, bool]] = deque(maxlen=BACK_STEPS)
        self.last_step = 0.0

    @property
    def jumping(self) -> bool:
        return self.reach.value is None

    def due(self, b) -> bool:
        """Whether the walk steps on the Blender's frame now. At jump, as the old autopilot, a minute
        from the pattern's start, in drive from a bar line; else Pace's seconds from the last step, or
        while the beat is sure, on every so many bar lines."""
        if self.jumping:
            since = self.last_step if self.stay.value else b.run.start
            return (b._t >= since + b.pattern_length
                    and (not b.lands_on_bars or (b.on_beat is not None and b.on_beat[0] % 4 == 0)))
        seconds, bars = self.pace.value
        if b.beating:
            return b.on_beat is not None and b.on_beat[0] % (4 * bars) == 0
        return b._t >= self.last_step + seconds

    def left(self, b) -> float:
        """The seconds to the walk's next step."""
        if self.jumping:
            since = self.last_step if self.stay.value else b.run.start
            return since + b.pattern_length - b._t
        seconds, bars = self.pace.value
        if b.beating:
            beats = 4 * bars
            return (beats - (b.sound.beat % beats)) * 60 / b.sound.bpm
        return self.last_step + seconds - b._t

    def step(self, b):
        """One step on the Blender: the pattern's change, unless Stay is on; else on a pattern not
        saved, one control of one unpinned feature moved by Reach, or a share of the time the whole
        feature rerolled, gliding there. At jump, the pattern's change, or with Stay every unpinned
        feature rerolled."""
        self.last_step = b._t
        pattern = b.pattern
        roll = None if self.jumping else random.random()
        if not self.stay.value and (roll is None or roll < CHANGE):
            self.back_steps.append((pattern, pattern._to_dict(), pattern.configured, pattern.dirty))
            b.start_transition(bars=b.lands_on_bars)
            return
        if pattern.configured:
            return
        features = [fidx for fidx, f in enumerate(pattern.features) if fidx not in self.pins and movable(f)]
        if not features:
            return
        self.back_steps.append((pattern, pattern._to_dict(), pattern.configured, pattern.dirty))
        if roll is None:
            for fidx in features:
                pattern.features[fidx].randomize()
            pattern.update()
        elif CHANGE <= roll < CHANGE + REROLL:
            pattern.features[random.choice(features)].randomize()
            pattern.update()
        else:
            fidx = random.choice(features)
            cidx = random.choice(movable(pattern.features[fidx]))
            control = pattern.features[fidx].visible_controls()[cidx]
            now = control.selected_idx
            step = random.choice([k - now for k in range(len(control.options)) if 0 < abs(k - now) <= self.reach.value])
            pattern.change(fidx, cidx, step)
        b.glide()

    def back(self, b):
        """Undoes the last step kept: the pattern it left from, back on show if it isn't, with its
        controls and its mark as they were."""
        if not self.back_steps:
            return
        pattern, picks, configured, dirty = self.back_steps.pop()
        on_show = b.change.run.pattern if b.change is not None else b.pattern
        if pattern is not on_show:
            b.start_transition(b.patterns.index(pattern))
        pattern._from_dict(picks)
        pattern.configured = configured
        pattern.dirty = dirty
        if pattern is on_show:
            b.glide()
`,"wire.py":`"""What twinky sends a page, from the server or the page's own engine (browser.py) alike: the layout
as it connects, a message a frame, and the remote's state."""
import json
import struct

from control import Control, Feature, ToggleControl

# a feature's toggle by one of these names is its On switch, on the remote's card header
SWITCHES = ["Enabled", "On"]

def layout_message(blender) -> str:
    """Every light where Pixel has it, after normalizing: x, y (its height, 0 to 1) and z, its strand
    and index on the strand, and its angle round the trunk (0 to 1)."""
    places = [(strand, index)
              for strand, interface in enumerate(blender.lights.interfaces)
              for index in range(len(interface.layout))]
    return json.dumps({"layout": [
        {"x": pixel.x, "y": pixel.y, "z": pixel.z, "strand": strand, "index": index, "angle": pixel.t}
        for pixel, (strand, index) in zip(blender.pixels, places)
    ]})

def frame_message(number: int, frame: bytes) -> bytes:
    """A frame's bytes as a page gets them: its number (4 bytes, little-endian), then W, R, G, B a light."""
    return struct.pack("<I", number) + frame

def control_state(control: Control) -> dict:
    return {"name": control.name, "options": [o.name for o in control.options], "pick": control.selected_idx}

def feature_state(feature: Feature) -> dict:
    controls = feature.visible_controls()
    switches = [i for i, c in enumerate(controls) if isinstance(c, ToggleControl) and c.name in SWITCHES]
    return {
        "name": feature.name,
        "switch": switches[0] if switches else None,  # its index in controls
        "controls": [control_state(c) for c in controls],
    }

def remote_state(blender) -> dict:
    """What the remote shows: the patterns, the current one with its mark and the change running, its
    features with their visible controls and the Music feature after them, as the TUI lists them, the
    walk's knobs, the pause and the spin ring's angle."""
    return {
        "patterns": [p.name for p in blender.patterns],
        "pattern": blender.pattern.name,
        "mark": blender.mark,
        "to": blender.change.run.pattern.name if blender.change is not None else None,
        "features": [feature_state(f) for f in blender.pattern.features + [blender.music]],
        "walk": {
            "pace": control_state(blender.walk.pace),
            "reach": control_state(blender.walk.reach),
            "stay": blender.walk.stay.value,
            "pins": sorted(blender.walk.pins),  # the pinned features' indices in features
            "back": bool(blender.walk.back_steps),  # a step for Back to undo
        },
        "paused": blender.pause_change,
        "ring": blender.ring_angle,
    }
`,"layouts/cone.json":'[[{"x": 0.33703513532552326, "y": 0.0007015463661686018, "z": 0.039716764330916976}, {"x": 0.27243799703105565, "y": 0.0033826035386091326, "z": 0.08332631544033443}, {"x": 0.18249813395477046, "y": 0.006477389459084144, "z": 0.12918175824881756}, {"x": 0.2032528564416359, "y": 0.00804252121478301, "z": 0.19363880403049222}, {"x": 0.16519009459035944, "y": 0.011643420123686915, "z": 0.2283562096524276}, {"x": 0.13399685865756056, "y": 0.014082310048511173, "z": 0.33996755178139326}, {"x": 0.034144586886180675, "y": 0.016852141186417223, "z": 0.2069580874008154}, {"x": -0.041337957489861105, "y": 0.018812118709190244, "z": 0.26583300723685405}, {"x": -0.05154860854766769, "y": 0.020824899095695917, "z": 0.20306955936093357}, {"x": -0.13038172356921848, "y": 0.023332537499409552, "z": 0.2555952943797681}, {"x": -0.14717264890276296, "y": 0.02584962667538636, "z": 0.18963209187268718}, {"x": -0.16425240840912642, "y": 0.0286894051986066, "z": 0.12527427822186135}, {"x": -0.29112539204206467, "y": 0.03175636696349386, "z": 0.1026949473095952}, {"x": -0.34105042216944303, "y": 0.03327885939884208, "z": 0.04647096557180747}, {"x": -0.32037325210723844, "y": 0.03568133493970871, "z": 0.009507389830871023}, {"x": -0.25242186533979427, "y": 0.03906678765454292, "z": -0.09637843417359698}, {"x": -0.21210086272876758, "y": 0.041745053539911495, "z": -0.13231058273474908}, {"x": -0.24050848343431658, "y": 0.04388137090921534, "z": -0.237740734650871}, {"x": -0.12060188813110498, "y": 0.046257925730869405, "z": -0.16572561069656447}, {"x": -0.1062708895590872, "y": 0.0483641099603146, "z": -0.24419084787553652}, {"x": -0.07414496891959205, "y": 0.05075951110236858, "z": -0.3035858233645731}, {"x": 0.005020281900092364, "y": 0.05401172874575349, "z": -0.2686728362451972}, {"x": 0.07808807931864573, "y": 0.056262639732374976, "z": -0.27025429749383767}, {"x": 0.085796531011283, "y": 0.05858988264244634, "z": -0.18233908782872346}, {"x": 0.21377245830326025, "y": 0.06056523093553479, "z": -0.2825222009938431}, {"x": 0.17330914016940774, "y": 0.06388977559557009, "z": -0.1401974780554724}, {"x": 0.29570861629813394, "y": 0.06625335783765023, "z": -0.11745992888364534}, {"x": 0.22814221915714653, "y": 0.06880942617267466, "z": -0.03980733850385905}, {"x": 0.28537651795230445, "y": 0.07127065749478145, "z": 0.016714726932681924}, {"x": 0.2767345829203968, "y": 0.073688697597866, "z": 0.045197739181064046}, {"x": 0.29095939271200416, "y": 0.07693567442219033, "z": 0.1248524975757337}, {"x": 0.2265162053586573, "y": 0.07923072886788822, "z": 0.21022020768292524}, {"x": 0.1723963236821766, "y": 0.08171370985130873, "z": 0.2207233498081613}, {"x": 0.1762873122039896, "y": 0.08363913601953221, "z": 0.276418353586758}, {"x": 0.08123314114994117, "y": 0.08635499900081457, "z": 0.2572866607545286}, {"x": 0.017586962265198854, "y": 0.08872738766834161, "z": 0.2437508349630584}, {"x": -0.055973063316393394, "y": 0.09130771819360677, "z": 0.2795346033282587}, {"x": -0.06899328228065274, "y": 0.09368722020014958, "z": 0.21416459852927766}, {"x": -0.1774790806008533, "y": 0.09576581688840788, "z": 0.26881394193544444}, {"x": -0.24973492732232666, "y": 0.09919765841086614, "z": 0.19038629245546246}, {"x": -0.25629352385954207, "y": 0.10088294106013096, "z": 0.13867621015983592}, {"x": -0.17235146201020507, "y": 0.10312485120670585, "z": 0.07920505242481525}, {"x": -0.20270720552827046, "y": 0.1066333801628783, "z": 0.01724854630446168}, {"x": -0.1950874497959426, "y": 0.10893720312622872, "z": -0.026090102021583465}, {"x": -0.20064120163965785, "y": 0.11073943828704078, "z": -0.06665801031893642}, {"x": -0.2119454046943442, "y": 0.11340937165522803, "z": -0.14040570542611816}, {"x": -0.13475619494348368, "y": 0.11598300264958099, "z": -0.13156682747270734}, {"x": -0.11602458206619769, "y": 0.11857983565714221, "z": -0.1780996047389797}, {"x": -0.08132640284365526, "y": 0.12066314253866813, "z": -0.24746489350940887}, {"x": -0.04006620259688536, "y": 0.12331363648882766, "z": -0.30307574064767207}, {"x": -0.006223413996535614, "y": 0.12553122716276394, "z": -0.20457036480071009}, {"x": 0.08600131041494635, "y": 0.12907825320914268, "z": -0.2737674221463574}, {"x": 0.11750642997051278, "y": 0.13151726369291541, "z": -0.17918065341278724}, {"x": 0.1983706066268873, "y": 0.1344633917767268, "z": -0.1639570653203729}, {"x": 0.19803850120777194, "y": 0.13583479367037, "z": -0.13373578489316879}, {"x": 0.2534332736957276, "y": 0.1388637689441821, "z": -0.10118809111347057}, {"x": 0.3132504112439763, "y": 0.14058817767430973, "z": -0.07394437141384055}, {"x": 0.3030239164906868, "y": 0.14431330136635276, "z": 0.029520192837121022}, {"x": 0.2703296876237714, "y": 0.1459655454410297, "z": 0.0967571702625399}, {"x": 0.1599320742284508, "y": 0.14862425839414756, "z": 0.08077366037823047}, {"x": 0.22372963053128375, "y": 0.15181807684731327, "z": 0.19398556085630167}, {"x": 0.10367483775433683, "y": 0.15444330168777123, "z": 0.1728069954667027}, {"x": 0.07364473459394068, "y": 0.15680167159665248, "z": 0.26779771004489966}, {"x": 0.04288322059468766, "y": 0.15876331061911683, "z": 0.2216140772157742}, {"x": -0.008587934738325914, "y": 0.16080864263594205, "z": 0.23736477532700598}, {"x": -0.04394274432651973, "y": 0.16329117796747777, "z": 0.2665577290275319}, {"x": -0.09798950274848223, "y": 0.16594410900962472, "z": 0.19777566841528296}, {"x": -0.12879770903161397, "y": 0.16930743226113534, "z": 0.12021748316501704}, {"x": -0.23734740104828983, "y": 0.17080127951716115, "z": 0.2044445447033686}, {"x": -0.18567557250143785, "y": 0.17417405056359406, "z": 0.08126576668245798}, {"x": -0.30092727977709033, "y": 0.17651168260458566, "z": 0.03847122524594587}, {"x": -0.2677864132219113, "y": 0.17851577472218622, "z": -0.015088924597555713}, {"x": -0.19417460694863908, "y": 0.18122674808391875, "z": -0.06246835968429287}, {"x": -0.17741578660338736, "y": 0.18408819777936192, "z": -0.07898000703220558}, {"x": -0.2135684275900195, "y": 0.18686648167526212, "z": -0.17403171848004165}, {"x": -0.1259334353016595, "y": 0.1889003132451984, "z": -0.18109226119689487}, {"x": -0.14112257949458304, "y": 0.191010427852503, "z": -0.25228738826559993}, {"x": -0.04322591702968615, "y": 0.19390597379333754, "z": -0.28754524984302365}, {"x": -0.010144905503345177, "y": 0.19570301896609318, "z": -0.18215722630574296}, {"x": 0.021488775630053636, "y": 0.19805870669789538, "z": -0.28557775760530624}, {"x": 0.10504242043078806, "y": 0.20168217467308786, "z": -0.18573989169592967}, {"x": 0.14105795365334323, "y": 0.20392277904883854, "z": -0.16600588328467855}, {"x": 0.13047723549078125, "y": 0.20635617228839853, "z": -0.11955070001391195}, {"x": 0.2172226742430105, "y": 0.2084000854644726, "z": -0.10632825621844345}, {"x": 0.19730086589942525, "y": 0.2118876008031627, "z": -0.04364530679295544}, {"x": 0.16574536256851105, "y": 0.2141805219953405, "z": 0.007162948155755242}, {"x": 0.17766095015367805, "y": 0.21650561745853591, "z": 0.023216468571933702}, {"x": 0.1819503682760466, "y": 0.2193275901055695, "z": 0.07055307515348135}, {"x": 0.1401228612343047, "y": 0.22198223774790904, "z": 0.10973766314591452}, {"x": 0.19157645433370615, "y": 0.22325107515619197, "z": 0.17749451978944986}, {"x": 0.10254032359138378, "y": 0.22565425121897945, "z": 0.1854685771840535}, {"x": 0.03398242259751738, "y": 0.22945539605479234, "z": 0.19687396161770146}, {"x": 0.019913835237310294, "y": 0.2308801152040617, "z": 0.17277112960779958}, {"x": -0.014155007525334898, "y": 0.23397807529923412, "z": 0.160853164319994}, {"x": -0.09071594690590673, "y": 0.23697387543982568, "z": 0.21928830032532784}, {"x": -0.0866960002980607, "y": 0.23867476680194513, "z": 0.14310075886776094}, {"x": -0.22793894663829742, "y": 0.2418700880257489, "z": 0.16970142374264335}, {"x": -0.1900593454260488, "y": 0.24316704346519036, "z": 0.14347507966911816}, {"x": -0.2377528137832623, "y": 0.2469699293288351, "z": 0.06316408594507043}, {"x": -0.22468575880274405, "y": 0.24899275164331303, "z": 0.02872339728813852}, {"x": -0.16681006806220955, "y": 0.25096098167671876, "z": -0.007336587208291745}, {"x": -0.19814203315963066, "y": 0.25342118008534703, "z": -0.07874623332244618}, {"x": -0.22808349708752995, "y": 0.256478015801769, "z": -0.15363815397629005}, {"x": -0.14712605207091597, "y": 0.2585857178267084, "z": -0.13016955377254716}, {"x": -0.13971350101494587, "y": 0.26097510272032837, "z": -0.2279632652059955}, {"x": -0.08946021400184036, "y": 0.2634542139945088, "z": -0.20370446432038028}, {"x": -0.02123114153972482, "y": 0.2663684781544756, "z": -0.18284829191310206}, {"x": -0.0041709343976932085, "y": 0.26803056104266937, "z": -0.16198092590900734}, {"x": 0.03788432033922939, "y": 0.2713268071323733, "z": -0.15715224293537447}, {"x": 0.12050751824976462, "y": 0.27395307314034456, "z": -0.2191490683896371}, {"x": 0.1216537150800412, "y": 0.2762398915641252, "z": -0.11924208396424293}, {"x": 0.13532661436648633, "y": 0.27875214437892004, "z": -0.08583113549208857}, {"x": 0.22736139175607767, "y": 0.28192384192345943, "z": -0.09231880161424667}, {"x": 0.18836092170478225, "y": 0.28447734380671613, "z": -0.010816071731753217}, {"x": 0.26159757645133325, "y": 0.28566031660187235, "z": -0.0006409286625164323}, {"x": 0.15840571811596246, "y": 0.288440234241556, "z": 0.049485007701973185}, {"x": 0.1663953983175263, "y": 0.2918657225115891, "z": 0.08372722478009756}, {"x": 0.17740996576760648, "y": 0.29435463242557114, "z": 0.18586245482695563}, {"x": 0.1220592139406872, "y": 0.2967610777833701, "z": 0.1948258915720137}, {"x": 0.0760867220631947, "y": 0.2982672322984665, "z": 0.14709594551659483}, {"x": 0.026149925881895717, "y": 0.3015722366779532, "z": 0.17418612772559483}, {"x": -0.00783262006901755, "y": 0.30309662129002146, "z": 0.24184585440723796}, {"x": -0.060550740279142444, "y": 0.3063239048970888, "z": 0.23838766596819344}, {"x": -0.07737168279987933, "y": 0.3086799645164333, "z": 0.16751703375074997}, {"x": -0.11834684915338164, "y": 0.31088695363870766, "z": 0.18569334868487555}, {"x": -0.117691786876063, "y": 0.3136250258234476, "z": 0.09423031237972689}, {"x": -0.135761490361838, "y": 0.31603241516552943, "z": 0.08000983173004697}, {"x": -0.18448396859814847, "y": 0.31838866945337374, "z": 0.04024309343931114}, {"x": -0.16899079814735565, "y": 0.3211016232278813, "z": 0.0018198778634949933}, {"x": -0.19741819721993123, "y": 0.3230112157595632, "z": -0.028587850122655318}, {"x": -0.19946490255829513, "y": 0.32647325938851124, "z": -0.09241830284741422}, {"x": -0.15887980699508636, "y": 0.32909713292374165, "z": -0.11650037910756632}, {"x": -0.12790957174291936, "y": 0.33121824033137265, "z": -0.13630272520940898}, {"x": -0.0980310632383292, "y": 0.33384061115173197, "z": -0.2231857939144652}, {"x": -0.038934741812389505, "y": 0.33591283804519867, "z": -0.13891430549212272}, {"x": -0.02414717546745626, "y": 0.3381073270823418, "z": -0.23641564549823577}, {"x": 0.04025031636059541, "y": 0.3407392015961368, "z": -0.23389229941093978}, {"x": 0.09026740836335576, "y": 0.343467703047753, "z": -0.2142930475999256}, {"x": 0.12866021721865223, "y": 0.34605742149612134, "z": -0.17725060523504985}, {"x": 0.18508766834142365, "y": 0.34889186670726136, "z": -0.14627250669404196}, {"x": 0.13980164782968305, "y": 0.3519401182254473, "z": -0.06688812011292293}, {"x": 0.18423786123553013, "y": 0.3533758931133161, "z": -0.07284890553736652}, {"x": 0.20804106158814387, "y": 0.3566366251719997, "z": -0.024281483749163484}, {"x": 0.18838484156377802, "y": 0.35907572989505127, "z": 0.027643830253042807}, {"x": 0.1295013414075899, "y": 0.3607471972280467, "z": 0.04783568097959474}, {"x": 0.1546063729517691, "y": 0.36447183158722224, "z": 0.1286352196476271}, {"x": 0.15851194488822198, "y": 0.3659012893669707, "z": 0.17559705605157844}, {"x": 0.11718284023740251, "y": 0.36820868923853217, "z": 0.1897333360366686}, {"x": 0.04895679761224707, "y": 0.37148957603447097, "z": 0.17237407757262008}, {"x": -0.0036772298491506293, "y": 0.3743864617039374, "z": 0.17161796324929407}, {"x": -0.020506281551469753, "y": 0.37670406729620054, "z": 0.14639976231950796}, {"x": -0.055387340754707415, "y": 0.3784882009152859, "z": 0.21961413021492898}, {"x": -0.10061331352109996, "y": 0.3819391361200662, "z": 0.16430051134714022}, {"x": -0.10262282291394105, "y": 0.38361233614656287, "z": 0.12271340140798946}, {"x": -0.10810198039027201, "y": 0.38587232455662096, "z": 0.06997588556490694}, {"x": -0.11916630705624949, "y": 0.3882847580558996, "z": 0.05207760498849376}, {"x": -0.2128770885840897, "y": 0.3914412898828062, "z": 0.02300397372709515}, {"x": -0.18306003245875008, "y": 0.3933099087235278, "z": -0.0009871468659201422}, {"x": -0.1461497329767149, "y": 0.3959098385458194, "z": -0.04238180791878276}, {"x": -0.1735209603495456, "y": 0.39902529072887893, "z": -0.11596923378655032}, {"x": -0.12103837777440626, "y": 0.40196042416432476, "z": -0.12664404205419041}, {"x": -0.09115854747283107, "y": 0.40428354654969795, "z": -0.1582463295994606}, {"x": -0.057874408692219936, "y": 0.40607488457714935, "z": -0.12209054683558089}, {"x": -0.03822442109821302, "y": 0.40921132363405993, "z": -0.19526095623154732}, {"x": 0.025384219976645705, "y": 0.4113179306346522, "z": -0.19802662805277835}, {"x": 0.046233148038189266, "y": 0.4144602796768701, "z": -0.1661667177070415}, {"x": 0.07741529766846118, "y": 0.4163588674307482, "z": -0.1538003038467447}, {"x": 0.07764445270117123, "y": 0.41853522814540506, "z": -0.09359680658588718}, {"x": 0.119431212506092, "y": 0.4211634714981687, "z": -0.09263558880584676}, {"x": 0.17357393452796552, "y": 0.42359910412139484, "z": -0.07177377085049921}, {"x": 0.15437877866947824, "y": 0.4262384486993376, "z": -0.028346329836675822}, {"x": 0.1458510826584158, "y": 0.428305871075655, "z": -0.015037621626395301}, {"x": 0.18999684397293698, "y": 0.43139724629807047, "z": 0.06078538319579964}, {"x": 0.14026291700297397, "y": 0.43376644031180683, "z": 0.08310832910400517}, {"x": 0.14427525149204745, "y": 0.43675189022925026, "z": 0.12276607920632658}, {"x": 0.07995018828200677, "y": 0.439481387536834, "z": 0.10687804114663171}, {"x": 0.0636274529158446, "y": 0.4414300505630915, "z": 0.13701875600668328}, {"x": 0.04920934334918524, "y": 0.44300527886314556, "z": 0.14906163820511314}, {"x": -0.005062569268450795, "y": 0.4461078781076075, "z": 0.1710429720141234}, {"x": -0.05464408459080735, "y": 0.44910074618867973, "z": 0.17745228845972785}, {"x": -0.07798097780700489, "y": 0.45123905307785755, "z": 0.1564202361382014}, {"x": -0.09617249902330446, "y": 0.45397311815199504, "z": 0.11786329890867565}, {"x": -0.15751668780521869, "y": 0.45644389304693134, "z": 0.12438494365921651}, {"x": -0.16989398052021026, "y": 0.4591737105280562, "z": 0.07068576280530818}, {"x": -0.14153042168188512, "y": 0.4617229887929865, "z": 0.02995242185865932}, {"x": -0.1921483445285972, "y": 0.4633968748874772, "z": 0.00863387774781135}, {"x": -0.1861411214651803, "y": 0.46631637013670435, "z": -0.02300339833130043}, {"x": -0.10671250610018009, "y": 0.4687268146183672, "z": -0.043291463941188595}, {"x": -0.11810691983469648, "y": 0.47126542138418515, "z": -0.0903694944505776}, {"x": -0.07475240410333953, "y": 0.4735327659703828, "z": -0.08314628988287255}, {"x": -0.07389672823070176, "y": 0.4762607453954619, "z": -0.1545384617533407}, {"x": -0.04520447505920346, "y": 0.47860288559238584, "z": -0.15651539371321913}, {"x": -0.030506672008600386, "y": 0.4808133340872239, "z": -0.18466932062594274}, {"x": 0.007774340841790901, "y": 0.48340360381530845, "z": -0.18118231264471688}, {"x": 0.05125784713384704, "y": 0.48628479665136465, "z": -0.1434162854175361}, {"x": 0.0869412217801045, "y": 0.4891050885325269, "z": -0.13885893392926046}, {"x": 0.09994921304349333, "y": 0.49157015549759975, "z": -0.0826812939450325}, {"x": 0.1292416416528533, "y": 0.4939144994959963, "z": -0.08433748303778714}, {"x": 0.17059029073588017, "y": 0.4957585444578933, "z": -0.05780980428044748}, {"x": 0.18454230481867157, "y": 0.49849446534048075, "z": -0.03298329424261304}, {"x": 0.10480965356930601, "y": 0.5015600354698773, "z": 0.020399962258639576}, {"x": 0.12001385247880936, "y": 0.5043490899674792, "z": 0.05104664511049289}, {"x": 0.1415708408472404, "y": 0.5061476484343386, "z": 0.0932858776022356}, {"x": 0.08547075742800324, "y": 0.5082848513022722, "z": 0.07945127897585187}, {"x": 0.08975179670463344, "y": 0.5119595747468525, "z": 0.15395554247462076}, {"x": 0.0381095729980643, "y": 0.5140923717671803, "z": 0.11728692607004307}, {"x": 0.021877713861528838, "y": 0.5162898884843573, "z": 0.110370696781868}, {"x": -0.01374406453596317, "y": 0.5190736246493535, "z": 0.16172263400562953}, {"x": -0.04685539213864963, "y": 0.5208607404058706, "z": 0.15194663396890332}, {"x": -0.05497207072581957, "y": 0.5234582438215788, "z": 0.11995237553496074}, {"x": -0.07117473526046833, "y": 0.526238542250491, "z": 0.08923860638424118}, {"x": -0.13503389191008094, "y": 0.5280830145792232, "z": 0.10386875804390551}, {"x": -0.13527710093792317, "y": 0.5308248366864394, "z": 0.07470240694286191}, {"x": -0.14594876741891863, "y": 0.5342223658381845, "z": 0.0083246853665477}, {"x": -0.10599732127375179, "y": 0.5360136647484779, "z": -0.008539926684273242}, {"x": -0.12454770788637942, "y": 0.5390389554072844, "z": -0.028858725064160876}, {"x": -0.09743570149567692, "y": 0.5412425343221032, "z": -0.04909668813829864}, {"x": -0.09867576605016225, "y": 0.5433475759689034, "z": -0.08701490524900722}, {"x": -0.0944369504029088, "y": 0.5463698991170852, "z": -0.11688350994398487}, {"x": -0.0688421135499143, "y": 0.5484951758887209, "z": -0.14949419848272924}, {"x": -0.03249233575789156, "y": 0.551991590113329, "z": -0.15127523327648124}, {"x": 0.0041620686004478265, "y": 0.5542863817380413, "z": -0.12228571106303575}, {"x": 0.03791726206078461, "y": 0.5563703806395145, "z": -0.11707012702959509}, {"x": 0.05387707340505675, "y": 0.5593200452531601, "z": -0.08846142210197107}, {"x": 0.06219887282701699, "y": 0.5618705198805458, "z": -0.08140300730935293}, {"x": 0.08941938862824139, "y": 0.56399721681933, "z": -0.07915070498562359}, {"x": 0.13364062893171896, "y": 0.5656949682877904, "z": -0.07480425481525799}, {"x": 0.09139714249193057, "y": 0.5693591265270238, "z": -0.02395799039293423}, {"x": 0.10943107588369143, "y": 0.571760936053048, "z": -0.004808572656574936}, {"x": 0.09086696618889274, "y": 0.5731761550765393, "z": 0.008043694659027536}, {"x": 0.122547206378814, "y": 0.5764562695189973, "z": 0.0640172724868456}, {"x": 0.08751396572673464, "y": 0.5792684341578773, "z": 0.07609438945591077}, {"x": 0.07690349539179073, "y": 0.581446594535574, "z": 0.10900054696275115}, {"x": 0.08566920048689566, "y": 0.5833646376011382, "z": 0.12761349556215387}, {"x": 0.03561714167749207, "y": 0.5863857432474413, "z": 0.12425687722402785}, {"x": 0.0032130143938321138, "y": 0.5888403863940952, "z": 0.09015019104483969}, {"x": -0.013818412754357875, "y": 0.5910298413285642, "z": 0.09845234667585437}, {"x": -0.054585284085737304, "y": 0.5943201578468428, "z": 0.11879717835459683}, {"x": -0.08426855295485207, "y": 0.5965703196741688, "z": 0.10426873228270479}, {"x": -0.11081407615588502, "y": 0.5991283127524586, "z": 0.10215121421697604}, {"x": -0.12461085150325076, "y": 0.6007265146306758, "z": 0.06765955092265556}, {"x": -0.08426720824606712, "y": 0.60427824643677, "z": 0.028256201886452295}, {"x": -0.10700029229686049, "y": 0.6067195837033484, "z": 0.004514491340850586}, {"x": -0.1160953979234071, "y": 0.6094770312083441, "z": -0.015383925349245866}, {"x": -0.10291847546500386, "y": 0.6111650246642261, "z": -0.031197111017667475}, {"x": -0.06450958396742561, "y": 0.6140614711072158, "z": -0.051083166470053495}, {"x": -0.09811229183655493, "y": 0.6162867643379046, "z": -0.08936971030300783}, {"x": -0.06587678185718689, "y": 0.618128677919155, "z": -0.0816371381048038}, {"x": -0.028275501267667567, "y": 0.6215989092617594, "z": -0.08280335893562461}, {"x": -0.0029351653301243432, "y": 0.6241918583331277, "z": -0.13351192450397878}, {"x": 0.006755977561817492, "y": 0.6259556167098961, "z": -0.09362737726974081}, {"x": 0.030243124324782128, "y": 0.6288357662395248, "z": -0.09433884359934977}, {"x": 0.06977372895290444, "y": 0.6316754321276146, "z": -0.08986365025536881}, {"x": 0.0708234119907041, "y": 0.63315703189518, "z": -0.07726272257065404}, {"x": 0.11316088895283556, "y": 0.6369820458355394, "z": -0.05915744239840363}, {"x": 0.12377572972821159, "y": 0.6390519293902823, "z": -0.04226147281070603}, {"x": 0.08377073719987767, "y": 0.641747425597062, "z": -0.01103748943145616}, {"x": 0.08026356697986814, "y": 0.6435555278031815, "z": 0.0052088206737465085}, {"x": 0.07341973193638544, "y": 0.6460180689296838, "z": 0.021912144237176162}, {"x": 0.07685256517935167, "y": 0.6492224230147783, "z": 0.05080272101583565}, {"x": 0.07135094150671786, "y": 0.6509474814718827, "z": 0.05865879262604033}, {"x": 0.05663887399751171, "y": 0.6541227706654381, "z": 0.08651521171997449}, {"x": 0.033183135452979934, "y": 0.6557231347484564, "z": 0.0848638686236509}, {"x": 0.03361492842547964, "y": 0.6584913466785823, "z": 0.1240988716487204}, {"x": -0.013734871194209661, "y": 0.6612195467627139, "z": 0.12378366311823456}, {"x": -0.04565315169362927, "y": 0.6644546282147675, "z": 0.11446069609562898}, {"x": -0.043056602390276436, "y": 0.666883433985475, "z": 0.0641832308318938}, {"x": -0.0829072653985009, "y": 0.6687855675834288, "z": 0.0941313782978521}, {"x": -0.09281805251756094, "y": 0.6716759228249494, "z": 0.0600309514497332}, {"x": -0.09704358602897692, "y": 0.6735423666461251, "z": 0.03781940228444515}, {"x": -0.11894668224189296, "y": 0.676103861912795, "z": 0.02693959071517149}, {"x": -0.07523815404497836, "y": 0.6787981925961474, "z": 0.00249921571156024}, {"x": -0.11173115525691792, "y": 0.6815308632949866, "z": -0.030966964849366483}, {"x": -0.09729621571215348, "y": 0.683276900516074, "z": -0.041100899885085404}, {"x": -0.08093996956468452, "y": 0.6855751575508535, "z": -0.04984278292222486}, {"x": -0.05499973285892368, "y": 0.6883985938248931, "z": -0.05680605169038593}, {"x": -0.028850934141572013, "y": 0.6914482116316022, "z": -0.06227008057857426}, {"x": -0.022878740772831474, "y": 0.6931092171683261, "z": -0.09518531449442223}, {"x": -5.907173530763142e-05, "y": 0.6957600508873703, "z": -0.06472283725973635}, {"x": 0.02391312047013035, "y": 0.6985521571885797, "z": -0.09670293159878575}, {"x": 0.0411772708851901, "y": 0.700925628608688, "z": -0.0834912636619413}, {"x": 0.05710032525687189, "y": 0.7042982399787627, "z": -0.060669735285262344}, {"x": 0.08479600709668962, "y": 0.7065134005066063, "z": -0.06809184679574168}, {"x": 0.09280564128170098, "y": 0.7091972411142531, "z": -0.04049902605034445}, {"x": 0.0680956991378776, "y": 0.7119972399284278, "z": -0.016682555259074087}, {"x": 0.0848549401145341, "y": 0.7141201742201894, "z": 0.0024352869364642374}, {"x": 0.10090501610892794, "y": 0.7162306137205259, "z": 0.015837165799292664}, {"x": 0.05470318076019124, "y": 0.7191943478164631, "z": 0.026109715089855864}, {"x": 0.053384870387150354, "y": 0.7217767123913901, "z": 0.0407770911460814}, {"x": 0.03889675494754257, "y": 0.7234490314129293, "z": 0.043104033152894114}, {"x": 0.05587718826099007, "y": 0.7256800669709801, "z": 0.08166281867471095}, {"x": 0.015486793638579485, "y": 0.7291202906591693, "z": 0.0802871821822326}, {"x": 0.004880654026373705, "y": 0.7313579523413679, "z": 0.08014386549286164}, {"x": -0.01946905370478882, "y": 0.7338130608566809, "z": 0.09709580374780415}, {"x": -0.02496454945467995, "y": 0.7361124511540246, "z": 0.06436849072800933}, {"x": -0.04269463759448615, "y": 0.7384528655796976, "z": 0.06869771095512245}, {"x": -0.04737864966341911, "y": 0.741324991700491, "z": 0.03885232971601933}, {"x": -0.07711002371029956, "y": 0.743954996619481, "z": 0.03749799862498973}, {"x": -0.06636971873618634, "y": 0.7463488627713499, "z": 0.023644275070480742}, {"x": -0.08106641067985916, "y": 0.7494047846383489, "z": -0.0008832530158267818}, {"x": -0.08545403286422075, "y": 0.7518481218377927, "z": -0.020062177223628866}, {"x": -0.0810191758475873, "y": 0.75357512428912, "z": -0.02584396834775704}, {"x": -0.05971985012431893, "y": 0.7560589495446812, "z": -0.038520910107145354}, {"x": -0.04078411534846648, "y": 0.7585048119580946, "z": -0.03732235155537774}, {"x": -0.029201083560780144, "y": 0.7610317451336759, "z": -0.04142979022814454}, {"x": -0.036089701367442814, "y": 0.7632581109607299, "z": -0.07608305507208435}, {"x": -0.014444718589751151, "y": 0.766384365705246, "z": -0.08749884016268787}, {"x": 0.0037904175839724137, "y": 0.7683868809000297, "z": -0.07760393393138235}, {"x": 0.024053449958933715, "y": 0.7715369808108398, "z": -0.07430778640184312}, {"x": 0.034710260763230576, "y": 0.7737286911593615, "z": -0.05649174445941551}, {"x": 0.03714229797357062, "y": 0.7769572420276915, "z": -0.033623937749348035}, {"x": 0.045840747129755804, "y": 0.778194205189565, "z": -0.030484797328041532}, {"x": 0.056214792323361074, "y": 0.7805392040733612, "z": -0.030325129242631685}, {"x": 0.07112651063018462, "y": 0.7844282528433831, "z": -0.009245692093575161}, {"x": 0.06686010759312386, "y": 0.7867515437826849, "z": 0.0017058314570291696}, {"x": 0.05960737424603662, "y": 0.7894936765363538, "z": 0.02111134732956404}, {"x": 0.06725741099352422, "y": 0.7910200538081718, "z": 0.04014226617129794}, {"x": 0.04577206999491196, "y": 0.7931547547735407, "z": 0.035740878322169926}, {"x": 0.032644407737662, "y": 0.7965074692414081, "z": 0.04017130527390811}, {"x": 0.030628776928273073, "y": 0.7984181300682468, "z": 0.06235959011212179}, {"x": 0.007140189613018216, "y": 0.8017867712681853, "z": 0.06396931156837543}, {"x": 0.0035887437706749984, "y": 0.8031307891368836, "z": 0.06355602107360041}, {"x": -0.014696491687001514, "y": 0.8059413716720263, "z": 0.0690456342236802}, {"x": -0.019398423965532253, "y": 0.8081742355555979, "z": 0.03900562595808291}, {"x": -0.03050446615100734, "y": 0.8110795466521417, "z": 0.03440968300766048}, {"x": -0.05199249629220789, "y": 0.8137811139403762, "z": 0.042567040206023365}, {"x": -0.04890036829485297, "y": 0.8169880970441183, "z": 0.022097892364950952}, {"x": -0.043699411992021486, "y": 0.8193425077253231, "z": 0.007786493839522226}, {"x": -0.052097922484956316, "y": 0.821639493468667, "z": 0.00039136906309022155}, {"x": -0.05554151598415417, "y": 0.8230128428610911, "z": -0.012279951915775843}, {"x": -0.037473712158113626, "y": 0.826888719270585, "z": -0.02324893626190415}, {"x": -0.04654564105927295, "y": 0.8288108039642735, "z": -0.0346419077496095}, {"x": -0.02790814288847252, "y": 0.8317635784979994, "z": -0.03279202477649076}, {"x": -0.01751226594768146, "y": 0.8340593923208828, "z": -0.034147483303462935}, {"x": -0.014986325789506379, "y": 0.8357929658823577, "z": -0.04887881471143742}, {"x": 0.0009464553702231366, "y": 0.8394401073574099, "z": -0.05026812686936183}, {"x": 0.004599237958276095, "y": 0.8407232821316927, "z": -0.0406499615999145}, {"x": 0.014254153614403147, "y": 0.8440431342568897, "z": -0.03556241873683827}, {"x": 0.022872292861092255, "y": 0.8460515265978762, "z": -0.03412793112799102}, {"x": 0.03878908098966531, "y": 0.8489085982340453, "z": -0.03801582104253949}, {"x": 0.028722728674788155, "y": 0.8515412570474794, "z": -0.01521649013450376}, {"x": 0.04481511624306597, "y": 0.8534890099599416, "z": -0.013421833829996566}, {"x": 0.037660796450481544, "y": 0.8567179312667497, "z": 0.0009516246964687225}, {"x": 0.03240393272229508, "y": 0.8587405960241006, "z": 0.003688833926574398}, {"x": 0.030037062501757607, "y": 0.8607101756375098, "z": 0.008469494994733706}, {"x": 0.0338682396870701, "y": 0.8638082382995154, "z": 0.024116779677858434}, {"x": 0.023028525024505402, "y": 0.8665271501218841, "z": 0.022858148972944744}, {"x": 0.017009999152563557, "y": 0.8688513622730214, "z": 0.032722933203322334}, {"x": 0.015381218236154457, "y": 0.8705063549664668, "z": 0.030125165346838973}, {"x": 0.0050061964286752915, "y": 0.8739230613472343, "z": 0.03078595331075796}, {"x": -0.006926077481362442, "y": 0.8765210358309632, "z": 0.032274011639854015}, {"x": -0.008749723016591745, "y": 0.8789017084768277, "z": 0.02425869433457771}, {"x": -0.013566135464227119, "y": 0.8809947516174654, "z": 0.02673084496480558}, {"x": -0.018538728039253025, "y": 0.8841549714745203, "z": 0.016808595556161335}, {"x": -0.021382607265670612, "y": 0.8856160626831482, "z": 0.014659097930714342}, {"x": -0.0221262991374346, "y": 0.8884755299789714, "z": 0.009942971756910663}, {"x": -0.029321969513105464, "y": 0.890546754960846, "z": 0.00783126525970874}, {"x": -0.02611233563483037, "y": 0.894400558595211, "z": -0.0041579220187814726}, {"x": -0.029496363158195496, "y": 0.8965194662771614, "z": -0.008671704722063649}, {"x": -0.02306187820416328, "y": 0.8984827415305259, "z": -0.014672877659135046}, {"x": -0.024165723042246706, "y": 0.9017053442052488, "z": -0.024927771862551813}, {"x": -0.013733101008413007, "y": 0.9039092405579302, "z": -0.022944532864945487}, {"x": -0.009586271165242485, "y": 0.906518504037447, "z": -0.026279793771811413}, {"x": -0.003977303144267585, "y": 0.9088466599667675, "z": -0.024872850409406577}, {"x": 0.0032208074949853357, "y": 0.9118474790813705, "z": -0.026506438820670785}, {"x": 0.00432029837393333, "y": 0.9130809085845958, "z": -0.020315015871783998}, {"x": 0.010815190392499034, "y": 0.9158225348282296, "z": -0.023039636677927165}, {"x": 0.01455339163133334, "y": 0.9183756181993205, "z": -0.019658308907234523}, {"x": 0.014079953069959347, "y": 0.9212098511099004, "z": -0.010996090844812073}, {"x": 0.021119078898148538, "y": 0.9235602164797754, "z": -0.00933262836135513}, {"x": 0.024260212878886925, "y": 0.9263171290705594, "z": -0.003500176022459896}, {"x": 0.01856152607613378, "y": 0.9290268838619532, "z": -0.0006512173832962062}, {"x": 0.0244861756063774, "y": 0.9315236184798056, "z": 0.005081270782916374}, {"x": 0.014654908897001384, "y": 0.9332128898092726, "z": 0.007424729850016874}, {"x": 0.01201937263566865, "y": 0.9367623846322409, "z": 0.011800998331143514}, {"x": 0.013488296079108618, "y": 0.9393328885580489, "z": 0.01672742021210536}, {"x": 0.006244963207387157, "y": 0.941072601823134, "z": 0.011972618981119827}, {"x": 0.004643558815900689, "y": 0.943901507897062, "z": 0.01751681784915977}, {"x": -0.0004527717944359407, "y": 0.9466990819160515, "z": 0.01120534818441789}, {"x": -0.005242427200459064, "y": 0.9494285028577935, "z": 0.015253641501765275}, {"x": -0.007151738541773287, "y": 0.9510692595215179, "z": 0.01609583005993358}, {"x": -0.009104204853945431, "y": 0.9536892932060774, "z": 0.011181284799194027}, {"x": -0.009754200411099995, "y": 0.9561334188387848, "z": 0.00738060119676915}, {"x": -0.010175858456122096, "y": 0.9589086686834171, "z": 0.006161648366207063}, {"x": -0.007890480636609947, "y": 0.96055612135283, "z": 0.0024011922771866624}, {"x": -0.008477744788185955, "y": 0.9630630983505223, "z": 0.0014532276884091674}, {"x": -0.008516269927322571, "y": 0.9662621175471307, "z": -0.0012945975683244023}, {"x": -0.008493217784236198, "y": 0.9694754354085947, "z": -0.004884927317717095}, {"x": -0.005414062463935942, "y": 0.9717031304516708, "z": -0.00459383898900609}, {"x": -0.005301755658384299, "y": 0.9742124290908329, "z": -0.005815413026387758}, {"x": -0.004569459324385615, "y": 0.9760365755096673, "z": -0.006798831810883272}, {"x": -0.002001186549784984, "y": 0.9793745125014788, "z": -0.007138410603674804}, {"x": -0.0005294878166112387, "y": 0.9810193841411191, "z": -0.007179469917975544}, {"x": 0.0004757359730426257, "y": 0.984158106102596, "z": -0.004463730225915234}, {"x": 0.0014909866304408808, "y": 0.9860644548873464, "z": -0.004622869895933043}, {"x": 0.0020488567119717636, "y": 0.9886615302949942, "z": -0.0029610650732602734}, {"x": 0.0018903594618572658, "y": 0.9912784936779481, "z": -0.0021014030884497774}, {"x": 0.001539072297457652, "y": 0.9943370746282456, "z": -0.000944852543926207}, {"x": 0.0011670202424929044, "y": 0.9962311590227606, "z": -0.0004352333330702248}, {"x": 0.00019321307864068497, "y": 0.9994627984492047, "z": -2.404045226721628e-05}], [{"x": -0.23601152744517, "y": 0.0010748579609945695, "z": -0.03517859381129958}, {"x": -0.25388972099786067, "y": 0.004074887386275133, "z": -0.07698137928337297}, {"x": -0.27396941768151883, "y": 0.006954863019239699, "z": -0.20263980553121533}, {"x": -0.21070838755905294, "y": 0.008691958145160073, "z": -0.20025657970045743}, {"x": -0.11670773770277124, "y": 0.011659732937773814, "z": -0.20892371304227297}, {"x": -0.10724970486946195, "y": 0.01366090658752834, "z": -0.282875334189675}, {"x": -0.007080592812352392, "y": 0.0168901564136124, "z": -0.2305580599718378}, {"x": -7.753729402575286e-05, "y": 0.01856418107913379, "z": -0.2095210983080126}, {"x": 0.06340941217649053, "y": 0.02061187893831748, "z": -0.3268981022126603}, {"x": 0.13987629477340113, "y": 0.024000832134880575, "z": -0.20977631180337777}, {"x": 0.2371441753734544, "y": 0.025733266522969547, "z": -0.245367990876449}, {"x": 0.21698595717288988, "y": 0.029420173103972394, "z": -0.15842482054914572}, {"x": 0.3336611823963171, "y": 0.0314506973255949, "z": -0.11700545896406375}, {"x": 0.19934274553404308, "y": 0.033806597691351636, "z": -0.0373632013169666}, {"x": 0.34604568153671156, "y": 0.03670579486619094, "z": 0.057394873085617235}, {"x": 0.2318775964742891, "y": 0.038993402758751655, "z": 0.06249014808012214}, {"x": 0.29662073301933567, "y": 0.04166252953041001, "z": 0.19985387796172832}, {"x": 0.22116469671407835, "y": 0.04326341106789951, "z": 0.1780120295271138}, {"x": 0.20063319478541508, "y": 0.04614113776649158, "z": 0.289213722477599}, {"x": 0.11027735018273982, "y": 0.04908693723220645, "z": 0.29083355618329554}, {"x": 0.04223507914874569, "y": 0.05148033505676176, "z": 0.23468157057069594}, {"x": 0.002523469876883172, "y": 0.0541692155279027, "z": 0.30180866656824007}, {"x": -0.06866712002009914, "y": 0.05608048097144461, "z": 0.29287135731550684}, {"x": -0.11876241982500213, "y": 0.05871838529458247, "z": 0.2030462487580664}, {"x": -0.1557317776983657, "y": 0.0605182524996346, "z": 0.19104478223285823}, {"x": -0.21913862023975908, "y": 0.06341710886794631, "z": 0.19151643159087312}, {"x": -0.23018915516258956, "y": 0.06697917184861375, "z": 0.08616737189212742}, {"x": -0.26667175180413016, "y": 0.06880203241448665, "z": 0.06504786897285246}, {"x": -0.25613533694573754, "y": 0.07112641229726918, "z": 0.020472901837570622}, {"x": -0.3197980362215747, "y": 0.07358363364795271, "z": -0.045616002607509754}, {"x": -0.26554624922257597, "y": 0.07603998638609258, "z": -0.09689555744956141}, {"x": -0.215519163897007, "y": 0.07926726511689079, "z": -0.1945931444402837}, {"x": -0.13851871150040734, "y": 0.08159655701026905, "z": -0.16359165339505444}, {"x": -0.12166973420844336, "y": 0.08338251449077137, "z": -0.20143062423140007}, {"x": -0.06797150736503359, "y": 0.08620164210736903, "z": -0.20010956030738525}, {"x": -0.040371473755831895, "y": 0.08837908580034132, "z": -0.3129100142855614}, {"x": 0.03313556845852749, "y": 0.09130633523633808, "z": -0.25446322297186746}, {"x": 0.12068547770296945, "y": 0.0943078733485918, "z": -0.2471880621826719}, {"x": 0.1491758794823538, "y": 0.09608697710981437, "z": -0.24352823331235415}, {"x": 0.14464157319416962, "y": 0.09811572411082402, "z": -0.1342830061922905}, {"x": 0.2561235657597677, "y": 0.10161952096676886, "z": -0.14146708378192008}, {"x": 0.25383633125933963, "y": 0.1038865081064057, "z": -0.09144408912331296}, {"x": 0.24150478774509834, "y": 0.10561125132360455, "z": -0.042982152348512805}, {"x": 0.33354292882312, "y": 0.10842850675287558, "z": 0.04665424929452335}, {"x": 0.20293664898041597, "y": 0.11103529227244546, "z": 0.0849814054699212}, {"x": 0.22206955024118682, "y": 0.11406399633151071, "z": 0.14690964283270982}, {"x": 0.1509017582306983, "y": 0.11563287504219583, "z": 0.15512499093555118}, {"x": 0.16993919055631443, "y": 0.11869517912367622, "z": 0.25482536285498597}, {"x": 0.08755555517095143, "y": 0.12138889209296226, "z": 0.2838272265529915}, {"x": 0.06497836027026144, "y": 0.1233823448451425, "z": 0.30046917031913467}, {"x": -0.04401925570996703, "y": 0.12597340772479662, "z": 0.3226606558387877}, {"x": -0.08648570717740556, "y": 0.12894378687242283, "z": 0.2969131638870573}, {"x": -0.10677533191892155, "y": 0.13145014218523912, "z": 0.18361099870398165}, {"x": -0.2055285118947842, "y": 0.13376158197295093, "z": 0.23904053464493547}, {"x": -0.2077944453727744, "y": 0.1365617932887246, "z": 0.11424351203676988}, {"x": -0.26658329097143446, "y": 0.13938478695806986, "z": 0.1015655091783405}, {"x": -0.19102597896538276, "y": 0.14088190603694023, "z": 0.04942246768860241}, {"x": -0.23365812418274529, "y": 0.14330231606944813, "z": -0.01903712891310576}, {"x": -0.2068643369540453, "y": 0.1462230459624342, "z": -0.06723582573858974}, {"x": -0.2636255402055953, "y": 0.14895765037649616, "z": -0.16678219707433037}, {"x": -0.22246751254749875, "y": 0.15125430023185668, "z": -0.2270074350280805}, {"x": -0.1201946247175271, "y": 0.15415334312239623, "z": -0.17961503270908366}, {"x": -0.07471345999356985, "y": 0.15564659781756943, "z": -0.18031623800788296}, {"x": -0.031248190387636692, "y": 0.15883926934766626, "z": -0.17955442570188515}, {"x": 0.015428256069547635, "y": 0.16082150665365838, "z": -0.25221426064557934}, {"x": 0.07121107472351276, "y": 0.16438659193742555, "z": -0.17407646027220994}, {"x": 0.09927814364453956, "y": 0.16651717521711545, "z": -0.21238021303704618}, {"x": 0.1802883654501075, "y": 0.16866266241508118, "z": -0.1850833384195906}, {"x": 0.19176781778021557, "y": 0.1707850009111391, "z": -0.15614714048231085}, {"x": 0.2623858738474228, "y": 0.1732956118795952, "z": -0.13878550609406312}, {"x": 0.18025023584261432, "y": 0.17697220638868, "z": -0.01742584051483869}, {"x": 0.28799130344372625, "y": 0.17935881501121592, "z": 0.018056363543560265}, {"x": 0.29545545873473783, "y": 0.18076516980928864, "z": 0.040612463577834934}, {"x": 0.22569630382365102, "y": 0.18342828516068857, "z": 0.08344101892965898}, {"x": 0.15775949833780967, "y": 0.186985852687053, "z": 0.16044935962072412}, {"x": 0.1526809975826059, "y": 0.18948961012139853, "z": 0.24195953511847096}, {"x": 0.1288034129795094, "y": 0.19146916042977533, "z": 0.2645116588505298}, {"x": 0.0413788254767486, "y": 0.19370594383360099, "z": 0.24112481363918642}, {"x": -0.00786077195296998, "y": 0.19686478619879225, "z": 0.22633670831280764}, {"x": -0.03487270598148554, "y": 0.19888302347155976, "z": 0.1846351687800209}, {"x": -0.09677670256945532, "y": 0.201383998664719, "z": 0.18054268227906017}, {"x": -0.18292568344064183, "y": 0.2042975321181918, "z": 0.20109074684089182}, {"x": -0.21948466788580154, "y": 0.206122695279021, "z": 0.1628216183184003}, {"x": -0.20855174526079134, "y": 0.20886347319463344, "z": 0.12467318442289195}, {"x": -0.20301171460776055, "y": 0.21052157180124062, "z": 0.05547717335943299}, {"x": -0.24969827350741236, "y": 0.21355251729581823, "z": 0.014086428119631069}, {"x": -0.24470433375360764, "y": 0.21637409060158763, "z": -0.04485523648673626}, {"x": -0.20901325675046634, "y": 0.21927071339122492, "z": -0.09583180006607138}, {"x": -0.1545427764875975, "y": 0.22171552038055753, "z": -0.0999544276503088}, {"x": -0.2031605377104459, "y": 0.22348754490197656, "z": -0.19451650752671756}, {"x": -0.11967141937302167, "y": 0.2257223243332235, "z": -0.16499128251454528}, {"x": -0.07119493401047261, "y": 0.2287629611315674, "z": -0.2836996707839055}, {"x": -0.0024323513996850968, "y": 0.23177780452288435, "z": -0.16548017470518708}, {"x": 0.027985101161819664, "y": 0.2330951967362413, "z": -0.2663368427148588}, {"x": 0.09134836426551028, "y": 0.23589826860749646, "z": -0.21283661787528202}, {"x": 0.09670366516203824, "y": 0.23886065679921767, "z": -0.1383888953353483}, {"x": 0.14236595737722504, "y": 0.2407555822086081, "z": -0.13088079605097427}, {"x": 0.20232778392643855, "y": 0.24312493956602674, "z": -0.15050774354244845}, {"x": 0.17751464269017628, "y": 0.24589421285578816, "z": -0.0766202126286293}, {"x": 0.1951846061233795, "y": 0.2487206324269673, "z": -0.014574338203858415}, {"x": 0.2543289919454505, "y": 0.2518102644325509, "z": 0.06099468137064798}, {"x": 0.26619408043958503, "y": 0.2531126881564116, "z": 0.06635087219784336}, {"x": 0.18159453956870725, "y": 0.2567890765985419, "z": 0.1084878681451864}, {"x": 0.11148237670035184, "y": 0.2585459136307134, "z": 0.11281354562597536}, {"x": 0.14283618035406673, "y": 0.2609732154468167, "z": 0.22502880365005065}, {"x": 0.0942393421833632, "y": 0.26306093951732157, "z": 0.21816173030370412}, {"x": 0.028636699112184704, "y": 0.2668093752994299, "z": 0.27373971767048133}, {"x": 0.003894904320232312, "y": 0.26829613867662294, "z": 0.16915274125977076}, {"x": -0.04580030262546268, "y": 0.271380085667665, "z": 0.17975486951959072}, {"x": -0.1074988348510466, "y": 0.2732944524785289, "z": 0.24928280611398118}, {"x": -0.1712164354378768, "y": 0.27600238806300303, "z": 0.16939837000233252}, {"x": -0.1270967139685064, "y": 0.27832965385830716, "z": 0.0833385615101566}, {"x": -0.16658645632123556, "y": 0.28197248222852583, "z": 0.0712152497861239}, {"x": -0.23609583888167027, "y": 0.2838279357966766, "z": 0.05889476265053426}, {"x": -0.15344989969106532, "y": 0.28562698129032893, "z": -0.006610735180394927}, {"x": -0.17915931273158206, "y": 0.28879223656878156, "z": -0.040865770436677495}, {"x": -0.17485673086862225, "y": 0.2912357266192052, "z": -0.08774862651819475}, {"x": -0.13195231669690244, "y": 0.29398014571599823, "z": -0.10634330605233105}, {"x": -0.15734749804515677, "y": 0.29652659100990436, "z": -0.20604567772333354}, {"x": -0.0633498432334102, "y": 0.29863936013669146, "z": -0.1352633568275142}, {"x": -0.07176394071343778, "y": 0.3005309832907844, "z": -0.20904481278247497}, {"x": 0.021574353067838926, "y": 0.30399681511468923, "z": -0.19575037840481355}, {"x": 0.03623836153218857, "y": 0.30656150584946046, "z": -0.14937797336614397}, {"x": 0.11004798351249231, "y": 0.3086302781722914, "z": -0.21280419604144224}, {"x": 0.14899860829752157, "y": 0.31192797538834044, "z": -0.14815772593462395}, {"x": 0.1565044526523632, "y": 0.3138255489759874, "z": -0.12364054779617671}, {"x": 0.2219454620227115, "y": 0.3165207373247115, "z": -0.09900898568436735}, {"x": 0.23208629039308012, "y": 0.31867511123348463, "z": -0.05847559946322645}, {"x": 0.20716201506975215, "y": 0.3215134544017099, "z": 0.0023573684525656892}, {"x": 0.16535829018262307, "y": 0.3242085560679036, "z": 0.044293788426322644}, {"x": 0.13370327228403128, "y": 0.32596536481769384, "z": 0.059038159287939464}, {"x": 0.1275709722035417, "y": 0.32868636454035566, "z": 0.10769906592166181}, {"x": 0.1548946605310969, "y": 0.3311662340671846, "z": 0.19064367444694055}, {"x": 0.07805681500363694, "y": 0.3340444098337199, "z": 0.16540948876008654}, {"x": 0.044782153105860825, "y": 0.3361560389219327, "z": 0.17350586014221733}, {"x": 0.01965077068585282, "y": 0.3391773069305216, "z": 0.22215523275012153}, {"x": -0.024080299247650615, "y": 0.34161307013840264, "z": 0.1371898962150866}, {"x": -0.08483572571794346, "y": 0.3435072381605449, "z": 0.20898718687394313}, {"x": -0.08401454996751165, "y": 0.34680554932411467, "z": 0.11897353713563129}, {"x": -0.15784478496573484, "y": 0.34817982918029444, "z": 0.13572190927048425}, {"x": -0.20815728974814474, "y": 0.35069254726671856, "z": 0.12389348151634468}, {"x": -0.22856402994442948, "y": 0.3539111555927334, "z": 0.07753976390072122}, {"x": -0.21763265072556873, "y": 0.3565508300664608, "z": 0.02245176824655287}, {"x": -0.17207489673323997, "y": 0.3587562619606015, "z": -0.026670389314390405}, {"x": -0.18130702620145317, "y": 0.3609406272885727, "z": -0.06035281087267795}, {"x": -0.1135897481980963, "y": 0.3636921645195486, "z": -0.0836421526918062}, {"x": -0.13373854250465944, "y": 0.3657984839686123, "z": -0.14664276386700598}, {"x": -0.07769960184605822, "y": 0.36892629468337546, "z": -0.137770777291426}, {"x": -0.05620589860626607, "y": 0.3710920188320357, "z": -0.13668123067387133}, {"x": -0.0014285858338402189, "y": 0.37448426840043725, "z": -0.22476357279130502}, {"x": 0.012546366518630584, "y": 0.37550219484842573, "z": -0.1628497010048638}, {"x": 0.04661182620655365, "y": 0.37874686608654495, "z": -0.12473009830885846}, {"x": 0.11434494930119198, "y": 0.38105613897856694, "z": -0.1901739842557679}, {"x": 0.13006100363359752, "y": 0.3837698103877496, "z": -0.14179962946907412}, {"x": 0.15295271719533685, "y": 0.38637541788793156, "z": -0.10540492806473338}, {"x": 0.1430053356802288, "y": 0.38841418431806785, "z": -0.07246492573098204}, {"x": 0.1760975177697942, "y": 0.3906296462674294, "z": -0.035190691522490034}, {"x": 0.2013633100298525, "y": 0.3943053328984115, "z": 0.03395510241778991}, {"x": 0.15583411363556876, "y": 0.39698446663387393, "z": 0.05257856150932327}, {"x": 0.16327590952860366, "y": 0.39834583569378645, "z": 0.07275959369891245}, {"x": 0.17067314931167327, "y": 0.40126699260059445, "z": 0.1381650473143821}, {"x": 0.07235899794009842, "y": 0.40446775514130606, "z": 0.10166862944209754}, {"x": 0.08472568176175031, "y": 0.4055926959412874, "z": 0.19311612139746812}, {"x": 0.05410972719791978, "y": 0.4080992498925516, "z": 0.16973960765585971}, {"x": 0.006438406946179442, "y": 0.4109990670731494, "z": 0.12382016815972682}, {"x": -0.02740190353814519, "y": 0.41331703905540285, "z": 0.1497621733079055}, {"x": -0.06370179934766557, "y": 0.41632599863247777, "z": 0.1305857722240955}, {"x": -0.09696523055262689, "y": 0.4183161232813237, "z": 0.10821751812440411}, {"x": -0.12291353943824533, "y": 0.4213329952437492, "z": 0.09233954209600577}, {"x": -0.12079119681456967, "y": 0.4236101402467461, "z": 0.06817893201643002}, {"x": -0.13982671484395395, "y": 0.42646020859957123, "z": 0.0202574864750501}, {"x": -0.12895944927196798, "y": 0.42826479440522397, "z": -0.004894794667333934}, {"x": -0.12560004401273864, "y": 0.43169229065977627, "z": -0.043725952699195596}, {"x": -0.11057076589945276, "y": 0.43424946158874606, "z": -0.05252471931817353}, {"x": -0.14199293982567918, "y": 0.4359293501149317, "z": -0.10186997056903165}, {"x": -0.10759825183757799, "y": 0.4386637826398041, "z": -0.1457066169279769}, {"x": -0.09894808317557689, "y": 0.4406787909685535, "z": -0.16016442341964668}, {"x": -0.041101913124025925, "y": 0.44317390271001406, "z": -0.18923902291206063}, {"x": -0.012125406039861494, "y": 0.44582975487714704, "z": -0.13918656081928535}, {"x": 0.018120046917698182, "y": 0.44863426607703205, "z": -0.11688107520855907}, {"x": 0.04958268852297654, "y": 0.45087765077983916, "z": -0.1390486525778597}, {"x": 0.11296623800847208, "y": 0.4536813971373936, "z": -0.13469625870174814}, {"x": 0.12053852799842335, "y": 0.45642322334329544, "z": -0.08849641850260317}, {"x": 0.16319932521969882, "y": 0.45863914084730745, "z": -0.09729028602715209}, {"x": 0.166225181751025, "y": 0.4618160410450068, "z": -0.02537947091223855}, {"x": 0.18284475400268002, "y": 0.4631707573634355, "z": -0.030730713051352988}, {"x": 0.19028916120140302, "y": 0.46682819906186596, "z": 0.04431648564651414}, {"x": 0.12749172559093563, "y": 0.46939615933226464, "z": 0.06805144964145801}, {"x": 0.12215143568808276, "y": 0.47118451290984864, "z": 0.08058110514931725}, {"x": 0.0887456323995911, "y": 0.4737069730480526, "z": 0.08291993514902103}, {"x": 0.09834692305167511, "y": 0.4757520234916606, "z": 0.15987761454129504}, {"x": 0.048015414394675056, "y": 0.47906709371946943, "z": 0.1417329162001049}, {"x": 0.013833012595811454, "y": 0.481440956296238, "z": 0.11461338271666113}, {"x": -0.018716179394391696, "y": 0.48391805748552696, "z": 0.16372112950526846}, {"x": -0.04932809761247121, "y": 0.485757314662754, "z": 0.12535777277849314}, {"x": -0.10100282446315524, "y": 0.4886425382027852, "z": 0.1542518217997088}, {"x": -0.13092457842159363, "y": 0.4918745661389912, "z": 0.10152390401774047}, {"x": -0.12060452880711582, "y": 0.49310378168171387, "z": 0.09297273462744539}, {"x": -0.1184243853445548, "y": 0.496977691285836, "z": 0.027687403895505645}, {"x": -0.14812195503060843, "y": 0.4985339958153893, "z": 0.008149299382544247}, {"x": -0.1667515938955421, "y": 0.5018054773325693, "z": -0.03660616281512985}, {"x": -0.1235613022658676, "y": 0.5039405624100222, "z": -0.048375325116009726}, {"x": -0.08921737218192063, "y": 0.5056806227734458, "z": -0.05736990441008769}, {"x": -0.13355983845748853, "y": 0.5084063274400523, "z": -0.12635431001516403}, {"x": -0.1061613069009894, "y": 0.5108152518279371, "z": -0.13680935455242568}, {"x": -0.05120566441436577, "y": 0.5134905990797654, "z": -0.12123837080892044}, {"x": -0.020637617413389316, "y": 0.515574180125055, "z": -0.1576980905106842}, {"x": -0.005703295754090049, "y": 0.518010238854535, "z": -0.11175458756174678}, {"x": 0.03760818647991671, "y": 0.521053330125356, "z": -0.10511077465391745}, {"x": 0.061731947615385314, "y": 0.5233421147660396, "z": -0.12704331417640338}, {"x": 0.12308155910620953, "y": 0.526851634523529, "z": -0.12013561639522577}, {"x": 0.13749861461795412, "y": 0.5288128905459039, "z": -0.09773422119105583}, {"x": 0.12877907537344463, "y": 0.5313712528852197, "z": -0.05233962585616203}, {"x": 0.10129305620586013, "y": 0.5335334449618548, "z": -0.020801172728619362}, {"x": 0.10748351874391258, "y": 0.5358078245471671, "z": 0.005411798702243429}, {"x": 0.12323658271373937, "y": 0.5383123727331445, "z": 0.02175302630965086}, {"x": 0.13226874405330993, "y": 0.5405739322504031, "z": 0.05672383269699734}, {"x": 0.07191969505462972, "y": 0.5440169616680155, "z": 0.07245661194000452}, {"x": 0.07569932226933267, "y": 0.5464657342805265, "z": 0.09483815222034493}, {"x": 0.05145727753923667, "y": 0.5488626940253161, "z": 0.13665435205688786}, {"x": 0.025408144948886855, "y": 0.5519779483630824, "z": 0.11508135658975975}, {"x": 0.005938496647136504, "y": 0.5537205443443964, "z": 0.09708770896838921}, {"x": -0.023247986318539617, "y": 0.5560501584243025, "z": 0.10041720522975955}, {"x": -0.053602323770500206, "y": 0.5581024588366357, "z": 0.13836973557810098}, {"x": -0.09480397501306286, "y": 0.561350759469007, "z": 0.09899133865602326}, {"x": -0.10383319707553908, "y": 0.5643355936272112, "z": 0.07292216981787149}, {"x": -0.08201451498957636, "y": 0.5661233179813371, "z": 0.04863232439672608}, {"x": -0.09035671768260818, "y": 0.5689876103212588, "z": 0.014326925168812723}, {"x": -0.11227598375861515, "y": 0.5707703400355778, "z": 0.009623770229505819}, {"x": -0.10886058969790204, "y": 0.5742512944692835, "z": -0.023053041730628405}, {"x": -0.09673748963662161, "y": 0.5762313762204643, "z": -0.05217237537338375}, {"x": -0.09897090980550233, "y": 0.5789505565608752, "z": -0.06618690299239909}, {"x": -0.07234173551658864, "y": 0.5818908196271916, "z": -0.08663979445503042}, {"x": -0.056347627866574865, "y": 0.5839812171316034, "z": -0.11484814902753096}, {"x": -0.02433927161206674, "y": 0.5864128290666928, "z": -0.10651414117082057}, {"x": -0.010197192125903289, "y": 0.5885275742645704, "z": -0.12232601572115451}, {"x": 0.0270372749813808, "y": 0.5913505025025053, "z": -0.10978820432532387}, {"x": 0.06480411414250938, "y": 0.5936738715225836, "z": -0.13792899656883006}, {"x": 0.058651263530600406, "y": 0.5958643433493125, "z": -0.0829321191693442}, {"x": 0.08425441500173941, "y": 0.5991116804749204, "z": -0.08339881556600255}, {"x": 0.12953818610200063, "y": 0.6013549680428683, "z": -0.0669777698885034}, {"x": 0.11277289460389293, "y": 0.604192642921624, "z": -0.028726168155088196}, {"x": 0.11928724331072549, "y": 0.6055198393767999, "z": -0.016122345283094787}, {"x": 0.12017518305922877, "y": 0.6091131527660475, "z": 0.0144638147775613}, {"x": 0.1283889015962879, "y": 0.6105773738940141, "z": 0.04516466747843725}, {"x": 0.10254284438403234, "y": 0.6136566642363089, "z": 0.07060801624160357}, {"x": 0.09867901099388678, "y": 0.6159553978277519, "z": 0.08469925172776338}, {"x": 0.06333244073355151, "y": 0.6185356150812867, "z": 0.08818586330526473}, {"x": 0.024499003471728786, "y": 0.6217494116393297, "z": 0.113127965042077}, {"x": 0.011003112509719656, "y": 0.6244547845811569, "z": 0.10943090831130518}, {"x": -0.0003389956620938395, "y": 0.6255125657645161, "z": 0.13440004829708213}, {"x": -0.03217215386120546, "y": 0.6280890905049903, "z": 0.10533078029633271}, {"x": -0.054102067388408406, "y": 0.6319813655026293, "z": 0.0651407126717549}, {"x": -0.0709395478630041, "y": 0.6333931103326939, "z": 0.06660206072099953}, {"x": -0.09722063834095719, "y": 0.6357707179017974, "z": 0.060610441665559206}, {"x": -0.09478927251028232, "y": 0.6384622367050601, "z": 0.03762879337525698}, {"x": -0.08459025077051038, "y": 0.6411869773810035, "z": 0.011797757678958522}, {"x": -0.10893888622324317, "y": 0.6439234052431653, "z": -0.018321295742204886}, {"x": -0.07942939448556713, "y": 0.6466812495016313, "z": -0.02470898696013402}, {"x": -0.06964626275523003, "y": 0.6480096577496838, "z": -0.040830313471547704}, {"x": -0.08565297611058359, "y": 0.651070022274329, "z": -0.07934693847272686}, {"x": -0.06873533441997165, "y": 0.6539271988856135, "z": -0.0990410943071715}, {"x": -0.025494594173052023, "y": 0.6561635396781985, "z": -0.07057454998620395}, {"x": -0.019372586266496298, "y": 0.6590830156740618, "z": -0.09182386923119754}, {"x": -0.0010871742954032088, "y": 0.6611650812111478, "z": -0.09682280943648461}, {"x": 0.019279281441150726, "y": 0.6642793415888426, "z": -0.07897906012121014}, {"x": 0.04733116957867374, "y": 0.6669634232587042, "z": -0.07865725893048918}, {"x": 0.056906927097997786, "y": 0.6693689704166591, "z": -0.054669809178086066}, {"x": 0.08713674424352369, "y": 0.671396829097792, "z": -0.07078839261114814}, {"x": 0.06696029021396395, "y": 0.6738346491313788, "z": -0.02588630677024757}, {"x": 0.1124002596686182, "y": 0.6768920093538249, "z": -0.021728676076881868}, {"x": 0.07256538692454814, "y": 0.6786623962410013, "z": 0.005103787371465774}, {"x": 0.11585312138622995, "y": 0.6805806898632701, "z": 0.020086209304123134}, {"x": 0.0674523479309176, "y": 0.6836979708932109, "z": 0.032762222899887665}, {"x": 0.08877569780810611, "y": 0.6863115487381718, "z": 0.07021879354069534}, {"x": 0.04395251344892638, "y": 0.6891114268584857, "z": 0.058153044215795334}, {"x": 0.04013940929596937, "y": 0.6907189322972664, "z": 0.08825541811143359}, {"x": 0.016618504446849373, "y": 0.6933374587944197, "z": 0.0735721900183951}, {"x": -0.00265565987654653, "y": 0.696180991329062, "z": 0.06881903837690584}, {"x": -0.005683310955165373, "y": 0.698154427451177, "z": 0.0706878902308364}, {"x": -0.028416085042183705, "y": 0.701061797446313, "z": 0.07134692391307733}, {"x": -0.04625827704002249, "y": 0.7030212441390848, "z": 0.07093575700596953}, {"x": -0.0688143064328268, "y": 0.706611197505657, "z": 0.05874108501772202}, {"x": -0.062027780014027416, "y": 0.708469719147487, "z": 0.03159563957108738}, {"x": -0.07983740903256308, "y": 0.7112340259162305, "z": 0.02270851065541665}, {"x": -0.07524639570716438, "y": 0.7138071701689442, "z": 0.0027336126812524952}, {"x": -0.0827310325542497, "y": 0.7167361615876957, "z": -0.024489050983392324}, {"x": -0.0668475820034223, "y": 0.71895324394488, "z": -0.03199152630161747}, {"x": -0.06623251193460931, "y": 0.7213884356893494, "z": -0.04716435856201456}, {"x": -0.046228230266453264, "y": 0.7235912074240716, "z": -0.04997805861732502}, {"x": -0.048122456782495625, "y": 0.7258615345567826, "z": -0.07026373869098536}, {"x": -0.027988563979604215, "y": 0.7283679940259266, "z": -0.0947751280351975}, {"x": -0.00712132594904052, "y": 0.7316395903460108, "z": -0.09908895484172833}, {"x": 0.008159185752635459, "y": 0.7335164247940428, "z": -0.08241825667343886}, {"x": 0.03255617924351992, "y": 0.7364910153881405, "z": -0.08446341959050231}, {"x": 0.036102534656826425, "y": 0.7392802880778135, "z": -0.05345425677919326}, {"x": 0.06120780979798283, "y": 0.7410961601249367, "z": -0.05718644581471927}, {"x": 0.07641256946844403, "y": 0.7432634409033699, "z": -0.053450219753330856}, {"x": 0.08390012166885204, "y": 0.7469398574346694, "z": -0.021647519569481573}, {"x": 0.05489829292296761, "y": 0.7492597051958856, "z": -0.006039331183004403}, {"x": 0.08170336648721446, "y": 0.7514170378333358, "z": 0.008709650688752516}, {"x": 0.08198405935344316, "y": 0.7534405183765561, "z": 0.024650721119587923}, {"x": 0.05094339460928089, "y": 0.755639871598876, "z": 0.02661004865138794}, {"x": 0.0627417821696547, "y": 0.7588004210679701, "z": 0.06608833258100995}, {"x": 0.038448283419845616, "y": 0.7616302015335151, "z": 0.0556403055369196}, {"x": 0.025437803770654768, "y": 0.7638132836022001, "z": 0.07338480574325727}, {"x": 0.0004656540657022471, "y": 0.7669599605792446, "z": 0.05701457949614792}, {"x": -0.00594338909559566, "y": 0.7682375760618382, "z": 0.05447675711776903}, {"x": -0.02078614712354007, "y": 0.7719523386561873, "z": 0.06733757139782524}, {"x": -0.024107636748453, "y": 0.7731948242459218, "z": 0.05532534547485119}, {"x": -0.04255418064881306, "y": 0.7766906169436791, "z": 0.040559318668013676}, {"x": -0.04107632367603703, "y": 0.7782056322249106, "z": 0.03342902349034614}, {"x": -0.05832889595322495, "y": 0.7808525280247595, "z": 0.026620398087989862}, {"x": -0.06363505956773936, "y": 0.7843839183038256, "z": 0.011754845131698877}, {"x": -0.05782463784193389, "y": 0.7863472159504422, "z": 8.565925210148464e-05}, {"x": -0.05463702835622331, "y": 0.7882068055601423, "z": -0.01584348693966717}, {"x": -0.05711575053596992, "y": 0.7905972776232321, "z": -0.02588806572981766}, {"x": -0.035249991615776605, "y": 0.7943308363765144, "z": -0.035790406961745624}, {"x": -0.041368813655178756, "y": 0.7968625284149923, "z": -0.05228783816300163}, {"x": -0.02046981206310546, "y": 0.7980632366791401, "z": -0.044238607951355896}, {"x": -0.007746255494043096, "y": 0.8016959272187861, "z": -0.06716130117409967}, {"x": -0.002307593133751301, "y": 0.8031652249343735, "z": -0.04460617124020231}, {"x": 0.01943829720882981, "y": 0.8065779448888871, "z": -0.05434264977354295}, {"x": 0.021465773292224107, "y": 0.8089779469350306, "z": -0.03907788577851749}, {"x": 0.03777414084647684, "y": 0.811057192440868, "z": -0.05134238526153988}, {"x": 0.0428750262084736, "y": 0.8136170791920594, "z": -0.03672184285732199}, {"x": 0.03887193798009324, "y": 0.8158089121825506, "z": -0.024581598023002783}, {"x": 0.05032741495692786, "y": 0.8180312713188048, "z": -0.014022206285459906}, {"x": 0.03897481435105156, "y": 0.8214249745358615, "z": 0.0004101878156061341}, {"x": 0.03534930869148345, "y": 0.8242226136306727, "z": 0.010810862577162262}, {"x": 0.043612265713813055, "y": 0.8261452779641875, "z": 0.02164127898061444}, {"x": 0.04122249188026962, "y": 0.8292896803606565, "z": 0.03635464515354793}, {"x": 0.029710529235497447, "y": 0.8318586500705935, "z": 0.04262849363941756}, {"x": 0.02869569536057978, "y": 0.8330709518884083, "z": 0.04639024571065721}, {"x": 0.010902929886688706, "y": 0.8362847417298412, "z": 0.04262437873510576}, {"x": 0.002191293120467368, "y": 0.8392617877743603, "z": 0.05112586965099348}, {"x": -0.0036424008114272753, "y": 0.841155130166011, "z": 0.03351943383943116}, {"x": -0.013860533924511, "y": 0.8431948795521683, "z": 0.04327248022628203}, {"x": -0.024663920121518797, "y": 0.8455401474552201, "z": 0.04726982945990487}, {"x": -0.03370238844559133, "y": 0.8494703517175052, "z": 0.027586949534695045}, {"x": -0.03768697508599642, "y": 0.8514040419180092, "z": 0.0241196824841805}, {"x": -0.045598314492832644, "y": 0.854011026990117, "z": 0.009452612968889771}, {"x": -0.05223461397610177, "y": 0.8563173524471169, "z": 0.004555684087275048}, {"x": -0.04676508762141103, "y": 0.8587850246136619, "z": -0.006631586390561473}, {"x": -0.041346225327588894, "y": 0.8611567973395823, "z": -0.012061600340626706}, {"x": -0.025100566068800925, "y": 0.8642990211587137, "z": -0.017490228641877364}, {"x": -0.021027891914469868, "y": 0.8656585685076158, "z": -0.022270734805026247}, {"x": -0.02179644053114744, "y": 0.8689813022344285, "z": -0.03217422411755383}, {"x": -0.010481992988185375, "y": 0.8718667892623487, "z": -0.03183327966206923}, {"x": -0.0032058681979528062, "y": 0.8739170394397731, "z": -0.0383015064344218}, {"x": 0.0008569029321524543, "y": 0.8760880536022932, "z": -0.03850046024226489}, {"x": 0.010846889019055108, "y": 0.8784151497845604, "z": -0.03276665103996104}, {"x": 0.01771627748966635, "y": 0.8809029271704246, "z": -0.025975170146379643}, {"x": 0.025565547715772134, "y": 0.8844565717162471, "z": -0.023462009550654864}, {"x": 0.02963254263880037, "y": 0.8859033233170994, "z": -0.023182745342734144}, {"x": 0.025087210804215096, "y": 0.8886833155039217, "z": -0.009257807932740987}, {"x": 0.03661032038973561, "y": 0.8912649492022412, "z": -0.004216487907109862}, {"x": 0.034444906629799606, "y": 0.8939998210224424, "z": 0.0029946204957752324}, {"x": 0.03127939535844156, "y": 0.8963953073032026, "z": 0.009937556967852125}, {"x": 0.021692956903589983, "y": 0.8984595424683813, "z": 0.009763542975897955}, {"x": 0.02232421107123171, "y": 0.9019590795131924, "z": 0.026114149043132133}, {"x": 0.01849574411563509, "y": 0.9033887594622982, "z": 0.02761372072808518}, {"x": 0.008658523883212735, "y": 0.9063118158081092, "z": 0.019452351097664754}, {"x": 0.0008758518734613773, "y": 0.9094966815725486, "z": 0.032071987663766496}, {"x": -0.002482645750431316, "y": 0.9111686304562129, "z": 0.03230105715331352}, {"x": -0.0068366209964702265, "y": 0.9138129822951326, "z": 0.03167185337603452}, {"x": -0.013461833524835935, "y": 0.9163066002451052, "z": 0.022711103076012575}, {"x": -0.010369106384471725, "y": 0.9180971612198466, "z": 0.013829932743655704}, {"x": -0.021348204193097832, "y": 0.9208988500430234, "z": 0.014638635644873802}, {"x": -0.02206025538048159, "y": 0.9238485376805228, "z": 0.01141536570793911}, {"x": -0.02370314779356619, "y": 0.926408167927933, "z": 0.00402724640110013}, {"x": -0.022089386675537094, "y": 0.9293918440217606, "z": -0.0014100132555626879}, {"x": -0.021625137294298984, "y": 0.9312946413942845, "z": -0.005609194806557532}, {"x": -0.01438045789729775, "y": 0.9332819459010245, "z": -0.005139479788897638}, {"x": -0.013658303741142701, "y": 0.9355640647647973, "z": -0.009831830145349215}, {"x": -0.009107728463171821, "y": 0.9391769700259028, "z": -0.010990769218534339}, {"x": -0.00714063646431335, "y": 0.9417984101014284, "z": -0.013955450202078919}, {"x": -0.002838171171303632, "y": 0.9440350750964922, "z": -0.01396464294793871}, {"x": -0.0007023567806625685, "y": 0.9457020448403722, "z": -0.013633977369282917}, {"x": 0.00396164336455243, "y": 0.9492841360486598, "z": -0.018267171503333766}, {"x": 0.004706032299884614, "y": 0.9505326409462675, "z": -0.01182493389862925}, {"x": 0.009479290469018296, "y": 0.953711918850488, "z": -0.012986920280510458}, {"x": 0.0072319007058339315, "y": 0.9557778931619388, "z": -0.0061601436796542095}, {"x": 0.010598356154827846, "y": 0.9589551089031367, "z": -0.0046963309372927454}, {"x": 0.010003789247404252, "y": 0.9617736152270571, "z": -0.0024927843391553094}, {"x": 0.01221143305119118, "y": 0.9643662569017881, "z": 0.0010472256144521761}, {"x": 0.00907389845471299, "y": 0.9658441881441671, "z": 0.0019138220121245697}, {"x": 0.0069238419144962, "y": 0.9693014956054813, "z": 0.0030316674204011783}, {"x": 0.00897696707156399, "y": 0.9708865617307461, "z": 0.006290087725269348}, {"x": 0.006123269456663226, "y": 0.9737814288219225, "z": 0.005966576890383506}, {"x": 0.001979273859117549, "y": 0.9768478345602348, "z": 0.004423451762530351}, {"x": 0.0019503834362780328, "y": 0.9784682788617444, "z": 0.006808582619238781}, {"x": -0.0003148087296765644, "y": 0.9819941212681413, "z": 0.006212988644500025}, {"x": -0.0005036629229803464, "y": 0.9840343234386663, "z": 0.0033952380182268537}, {"x": -0.0018103260804181274, "y": 0.9866522471016185, "z": 0.004406648199260541}, {"x": -0.0020963213963275658, "y": 0.988197668938692, "z": 0.0031325811745792254}, {"x": -0.0017921492006251311, "y": 0.9918291906524007, "z": 0.0014687223529205042}, {"x": -0.0012764244804247583, "y": 0.9937740318700741, "z": 0.0008957844348038743}, {"x": -0.0009161597465262132, "y": 0.9963624129680835, "z": 0.000356962262608012}, {"x": -0.0003735140695942237, "y": 0.9989647679285233, "z": 2.8405873414066034e-05}]]',"saves/basic_bitch.json":`{
  "Pulse": {
    "Enabled": "On",
    "Intentsity": "1",
    "Curve": "quadO",
    "Period": "20"
  },
  "Flicker": {
    "Enabled": "On",
    "Start": "1/8",
    "End": "1/4",
    "Curved": "On",
    "Curve": "sineO",
    "Period": "12"
  },
  "Flitter": {
    "Enabled": "On",
    "Start": "1/3",
    "End": "1",
    "Curved": "On",
    "Curve": "sineI",
    "Period": "15"
  },
  "Flux": {
    "Enabled": "On",
    "Value": "1/2",
    "Curved": "On",
    "Curve": "sineIO",
    "Period": "5"
  },
  "Sparkles": {
    "Enabled": "On",
    "Start": "0",
    "End": "1/2",
    "Curved": "On",
    "Curve": "sineO",
    "Period": "6",
    "Effect": "blank"
  },
  "Blend": {
    "Transition": "crossfade",
    "Grain": "smooth"
  }
}
`,"saves/circus_tent.json":`{
  "Circus Tent": {
    "Delay": "3.0",
    "splits": "4",
    "Rainbow": "1/3",
    "Rainbow Curved": "On",
    "Rainbow Curve": "bounceIO",
    "Rainbow Period": "15"
  },
  "Spiral": {
    "Repeats": "2",
    "Mirrored": "On",
    "Enabled": "On",
    "Twists": "2",
    "Direction": "both",
    "Mid": "1",
    "Curve": "sineIO",
    "Period": "30"
  },
  "Spin": {
    "Enabled": "On",
    "Spin": "1",
    "Direction": "↺ ",
    "Curve": "bounceIO",
    "Period": "30"
  },
  "Flicker": {
    "Enabled": "On",
    "Start": "1/5",
    "End": "1/2",
    "Curved": "Off",
    "Curve": "sineIO",
    "Period": "6"
  },
  "Flitter": {
    "Enabled": "Off",
    "Start": "1/2",
    "End": "1/5",
    "Curved": "Off",
    "Curve": "quadI",
    "Period": "60"
  },
  "Flux": {
    "Enabled": "Off",
    "Value": "1/2",
    "Curved": "Off",
    "Curve": "sineO",
    "Period": "15"
  },
  "Sparkles": {
    "Enabled": "Off",
    "Start": "1/4",
    "End": "1/3",
    "Curved": "Off",
    "Curve": "sineIO",
    "Period": "12",
    "Effect": "base"
  },
  "Blend": {
    "Transition": "crossfade",
    "Grain": "smooth"
  }
}
`,"pytweening/__init__.py":`from __future__ import division\r
\r
import math\r
\r
try:\r
    from typing import List, Tuple, Union\r
except ImportError:\r
    pass  # This is fine; it happens on Python 2.6 and before, but type hints aren't supported there anyway.\r
\r
__version__ = '1.2.0'\r
\r
\r
# from http://www.roguebasin.com/index.php?title=Bresenham%27s_Line_Algorithm#Python\r
def getLine(x1, y1, x2, y2):  # type: (int, int, int, int) -> List[Tuple[int, int]]\r
    """Returns a list of (x, y) tuples of every point on a line between\r
    (x1, y1) and (x2, y2). The x and y values inside the tuple are integers.\r
\r
    Line generated with the Bresenham algorithm.\r
\r
    Args:\r
      x1 (int, float): The x coordinate of the line's start point.\r
      y1 (int, float): The y coordinate of the line's start point.\r
      x2 (int, float): The x coordinate of the line's end point.\r
      y2 (int, float): The y coordiante of the line's end point.\r
\r
    Returns:\r
      [(x1, y1), (x2, y2), (x3, y3), ...]\r
\r
    Example:\r
    >>> getLine(0, 0, 6, 6)\r
    [(0, 0), (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6)]\r
    >>> getLine(0, 0, 3, 6)\r
    [(0, 0), (0, 1), (1, 2), (1, 3), (2, 4), (2, 5), (3, 6)]\r
    >>> getLine(3, 3, -3, -3)\r
    [(3, 3), (2, 2), (1, 1), (0, 0), (-1, -1), (-2, -2), (-3, -3)]\r
    """\r
    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)\r
    points = []\r
    issteep = abs(y2 - y1) > abs(x2 - x1)\r
    if issteep:\r
        x1, y1 = y1, x1\r
        x2, y2 = y2, x2\r
    rev = False\r
    if x1 > x2:\r
        x1, x2 = x2, x1\r
        y1, y2 = y2, y1\r
        rev = True\r
    deltax = x2 - x1\r
    deltay = abs(y2 - y1)\r
    error = int(deltax / 2)\r
    y = y1\r
    ystep = None\r
    if y1 < y2:\r
        ystep = 1\r
    else:\r
        ystep = -1\r
    for x in range(x1, x2 + 1):\r
        if issteep:\r
            points.append((y, x))\r
        else:\r
            points.append((x, y))\r
        error -= deltay\r
        if error < 0:\r
            y += ystep\r
            error += deltax\r
    # Reverse the list if the coordinates were reversed\r
    if rev:\r
        points.reverse()\r
    return points\r
\r
\r
def getPointOnLine(\r
    startX, startY, endX, endY, n\r
):  # type: (Union[int, float], Union[int, float], Union[int, float], Union[int, float], Union[int, float]) -> Tuple[Union[int, float], Union[int, float]]\r
    """Returns the (x, y) tuple of the point that has progressed a proportion\r
    n along the line defined by the two x, y coordinates.\r
\r
    Args:\r
      startX (int, float): The x coordinate of the line's start point.\r
      startY (int, float): The y coordinate of the line's start point.\r
      endX (int, float): The x coordinate of the line's end point.\r
      endY (int, float): The y coordinate of the line's end point.\r
      n (int, float): Progress along the line. 0.0 is the start point, 1.0 is the end point. 0.5 is the midpoint. This value can be less than 0.0 or greater than 1.0.\r
\r
    Returns:\r
      Tuple of floats for the x, y coordinate of the point.\r
\r
    Example:\r
    >>> getPointOnLine(0, 0, 6, 6, 0)\r
    (0, 0)\r
    >>> getPointOnLine(0, 0, 6, 6, 1)\r
    (6, 6)\r
    >>> getPointOnLine(0, 0, 6, 6, 0.5)\r
    (3.0, 3.0)\r
    >>> getPointOnLine(0, 0, 6, 6, 0.75)\r
    (4.5, 4.5)\r
    >>> getPointOnLine(3, 3, -3, -3, 0.5)\r
    (0.0, 0.0)\r
    >>> getPointOnLine(3, 3, -3, -3, 0.25)\r
    (1.5, 1.5)\r
    >>> getPointOnLine(3, 3, -3, -3, 0.75)\r
    (-1.5, -1.5)\r
    """\r
    return (((endX - startX) * n) + startX, ((endY - startY) * n) + startY)\r
\r
\r
def _iterTween(startX, startY, endX, endY, intervalSize, tweeningFunc, *args):\r
    ti = tweeningFunc(0.0, *args)\r
    yield (((endX - startX) * ti) + startX, ((endY - startY) * ti) + startY)\r
\r
    n = intervalSize\r
\r
    # The weird number is to prevent 0.999999 from being used in addition to 1.0 at the end of the function (i.e. rounding error prevention):\r
    while n + 1.1102230246251565e-16 < 1.0:\r
        ti = tweeningFunc(n, *args)\r
        yield (((endX - startX) * ti) + startX, ((endY - startY) * ti) + startY)\r
        n += intervalSize\r
\r
    ti = tweeningFunc(1.0, *args)\r
    yield (((endX - startX) * ti) + startX, ((endY - startY) * ti) + startY)\r
\r
\r
def linear(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Constant speed tween function.\r
\r
    Example:\r
    >>> linear(0.0)\r
    0.0\r
    >>> linear(0.2)\r
    0.2\r
    >>> linear(0.4)\r
    0.4\r
    >>> linear(0.6)\r
    0.6\r
    >>> linear(0.8)\r
    0.8\r
    >>> linear(1.0)\r
    1.0\r
    """\r
    return n\r
\r
\r
def iterLinear(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a linear tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, linear))\r
\r
\r
def easeInQuad(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Start slow and accelerate (Quadratic function).\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return n**2\r
\r
\r
def iterEaseInQuad(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInQuad tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInQuad))\r
\r
\r
def easeOutQuad(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Starts fast and decelerates to stop. (Quadratic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return -n * (n - 2)\r
\r
\r
def iterEaseOutQuad(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeOutQuad tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutQuad))\r
\r
\r
def easeInOutQuad(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Accelerates, reaches the midpoint, and then decelerates. (Quadratic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    if n < 0.5:\r
        return 2 * n**2\r
    else:\r
        n = n * 2 - 1\r
        return -0.5 * (n * (n - 2) - 1)\r
\r
\r
def iterEaseInOutQuad(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInOutQuad tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutQuad))\r
\r
\r
def easeInCubic(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Starts fast and decelerates. (Cubic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return n**3\r
\r
\r
def iterEaseInCubic(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInCubic tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInCubic))\r
\r
\r
def easeOutCubic(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Starts fast and decelerates to stop. (Cubic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n -= 1\r
    return n**3 + 1\r
\r
\r
def iterEaseOutCubic(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeOutCubic tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutCubic))\r
\r
\r
def easeInOutCubic(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Accelerates, reaches the midpoint, and then decelerates. (Cubic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n *= 2\r
    if n < 1:\r
        return 0.5 * n**3\r
    else:\r
        n -= 2\r
        return 0.5 * (n**3 + 2)\r
\r
\r
def iterEaseInOutCubic(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInOutCubic tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutCubic))\r
\r
\r
def easeInQuart(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Starts fast and decelerates. (Quartic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return n**4\r
\r
\r
def iterEaseInQuart(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInQuart tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInQuart))\r
\r
\r
def easeOutQuart(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Starts fast and decelerates to stop. (Quartic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n -= 1\r
    return -(n**4 - 1)\r
\r
\r
def iterEaseOutQuart(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeOutQuart tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutQuart))\r
\r
\r
def easeInOutQuart(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Accelerates, reaches the midpoint, and then decelerates. (Quartic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n *= 2\r
    if n < 1:\r
        return 0.5 * n**4\r
    else:\r
        n -= 2\r
        return -0.5 * (n**4 - 2)\r
\r
\r
def iterEaseInOutQuart(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInOutQuart tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutQuart))\r
\r
\r
def easeInQuint(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Starts fast and decelerates. (Quintic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return n**5\r
\r
\r
def iterEaseInQuint(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInQuint tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInQuint))\r
\r
\r
def easeOutQuint(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Starts fast and decelerates to stop. (Quintic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n -= 1\r
    return n**5 + 1\r
\r
\r
def iterEaseOutQuint(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeOutQuint tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutQuint))\r
\r
\r
def easeInOutQuint(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """Accelerates, reaches the midpoint, and then decelerates. (Quintic function.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n *= 2\r
    if n < 1:\r
        return 0.5 * n**5\r
    else:\r
        n -= 2\r
        return 0.5 * (n**5 + 2)\r
\r
\r
def iterEaseInOutQuint(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInOutQuint tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutQuint))\r
\r
\r
def easeInPoly(n, degree=2):  # type: (Union[int, float], Union[int, float]) -> Union[int, float]\r
    """Starts fast and decelerates. (Polynomial function with custom degree.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
      degree (int, float): The degree of the polynomial function.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    if not isinstance(degree, (int, float)) or degree < 0:\r
        raise ValueError('degree argument must be a positive number.')\r
    return n**degree\r
\r
\r
def iterEaseInPoly(startX, startY, endX, endY, intervalSize, degree=2):\r
    """Returns an iterator of a easeInPoly tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInPoly, degree))\r
\r
\r
def easeOutPoly(n, degree=2):  # type: (Union[int, float], Union[int, float]) -> Union[int, float]\r
    """Starts fast and decelerates to stop. (Polynomial function with custom degree.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
      degree (int, float): The degree of the polynomial function.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    if not isinstance(degree, (int, float)) or degree < 0:\r
        raise ValueError('degree argument must be a positive number.')\r
    return 1 - abs((n - 1) ** degree)\r
\r
\r
def iterEaseOutPoly(startX, startY, endX, endY, intervalSize, degree=2):\r
    """Returns an iterator of a easeOutPoly tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutPoly, degree))\r
\r
\r
def easeInOutPoly(n, degree=2):  # type: (Union[int, float], Union[int, float]) -> Union[int, float]\r
    """Starts fast and decelerates to stop. (Polynomial function with custom degree.)\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
      degree (int, float): The degree of the polynomial function.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    if not isinstance(degree, (int, float)) or degree < 0:\r
        raise ValueError('degree argument must be a positive number.')\r
\r
    n *= 2\r
    if n < 1:\r
        return 0.5 * n**degree\r
    else:\r
        n -= 2\r
        return 1 - 0.5 * abs(n**degree)\r
\r
\r
def iterEaseInOutPoly(startX, startY, endX, endY, intervalSize, degree=2):\r
    """Returns an iterator of a easeInOutPoly tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutPoly, degree))\r
\r
\r
def easeInSine(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """A sinusoidal tween function that begins slow and then accelerates.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return -1 * math.cos(n * math.pi / 2) + 1\r
\r
\r
def iterEaseInSine(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInSine tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInSine))\r
\r
\r
def easeOutSine(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """A sinusoidal tween function that begins fast and then decelerates.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return math.sin(n * math.pi / 2)\r
\r
\r
def iterEaseOutSine(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeOutSine tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutSine))\r
\r
\r
def easeInOutSine(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """A sinusoidal tween function that accelerates, reaches the midpoint, and then decelerates.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return -0.5 * (math.cos(math.pi * n) - 1)\r
\r
\r
def iterEaseInOutSine(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInOutSine tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutSine))\r
\r
\r
def easeInExpo(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """An exponential tween function that begins slow and then accelerates.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    if n == 0:\r
        return 0\r
    else:\r
        return 2 ** (10 * (n - 1))\r
\r
\r
def iterEaseInExpo(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInExpo tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInExpo))\r
\r
\r
def easeOutExpo(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """An exponential tween function that begins fast and then decelerates.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    if n == 1:\r
        return 1\r
    else:\r
        return -(2 ** (-10 * n)) + 1\r
\r
\r
def iterEaseOutExpo(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeOutExpo tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutExpo))\r
\r
\r
def easeInOutExpo(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """An exponential tween function that accelerates, reaches the midpoint, and then decelerates.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    if n == 0:\r
        return 0\r
    elif n == 1:\r
        return 1\r
    else:\r
        n *= 2\r
        if n < 1:\r
            return 0.5 * 2 ** (10 * (n - 1))\r
        else:\r
            n -= 1\r
            # 0.5 * (-() + 2)\r
            return 0.5 * (-1 * (2 ** (-10 * n)) + 2)\r
\r
\r
def iterEaseInOutExpo(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInOutExpo tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutExpo))\r
\r
\r
def easeInCirc(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """A circular tween function that begins slow and then accelerates.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return -1 * (math.sqrt(1 - n * n) - 1)\r
\r
\r
def iterEaseInCirc(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInCirc tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInCirc))\r
\r
\r
def easeOutCirc(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """A circular tween function that begins fast and then decelerates.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n -= 1\r
    return math.sqrt(1 - (n * n))\r
\r
\r
def iterEaseOutCirc(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeOutCirc tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutCirc))\r
\r
\r
def easeInOutCirc(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """A circular tween function that accelerates, reaches the midpoint, and then decelerates.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n *= 2\r
    if n < 1:\r
        return -0.5 * (math.sqrt(1 - n**2) - 1)\r
    else:\r
        n -= 2\r
        return 0.5 * (math.sqrt(1 - n**2) + 1)\r
\r
\r
def iterEaseInOutCirc(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInOutCirc tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutCirc))\r
\r
\r
def easeInElastic(\r
    n, amplitude=1, period=0.3\r
):  # type: (Union[int, float], Union[int, float], Union[int, float]) -> Union[int, float]\r
    """An elastic tween function that begins with an increasing wobble and then snaps into the destination.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return 1 - easeOutElastic(1 - n, amplitude=amplitude, period=period)\r
\r
\r
def iterEaseInElastic(startX, startY, endX, endY, intervalSize, amplitude=1, period=0.3):\r
    """Returns an iterator of a easeInElastic tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInElastic, amplitude, period))\r
\r
\r
def easeOutElastic(\r
    n, amplitude=1, period=0.3\r
):  # type: (Union[int, float], Union[int, float], Union[int, float]) -> Union[int, float]\r
    """An elastic tween function that overshoots the destination and then "rubber bands" into the destination.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
\r
    if amplitude < 1:\r
        amplitude = 1\r
        s = period / 4\r
    else:\r
        s = period / (2 * math.pi) * math.asin(1 / amplitude)\r
\r
    return amplitude * 2 ** (-10 * n) * math.sin((n - s) * (2 * math.pi / period)) + 1\r
\r
\r
def iterEaseOutElastic(startX, startY, endX, endY, intervalSize, amplitude=1, period=0.3):\r
    """Returns an iterator of a easeOutElastic tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutElastic, amplitude, period))\r
\r
\r
def easeInOutElastic(\r
    n, amplitude=1, period=0.5\r
):  # type: (Union[int, float], Union[int, float], Union[int, float]) -> Union[int, float]\r
    """An elastic tween function wobbles towards the midpoint.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n *= 2\r
    if n < 1:\r
        return easeInElastic(n, amplitude=amplitude, period=period) / 2\r
    else:\r
        return easeOutElastic(n - 1, amplitude=amplitude, period=period) / 2 + 0.5\r
\r
\r
def iterEaseInOutElastic(startX, startY, endX, endY, intervalSize, amplitude=1, period=0.5):\r
    """Returns an iterator of a easeInOutElastic tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutElastic, amplitude, period))\r
\r
\r
def easeInBack(n, s=1.70158):  # type: (Union[int, float], Union[int, float]) -> Union[int, float]\r
    """A tween function that backs up first at the start and then goes to the destination.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return n * n * ((s + 1) * n - s)\r
\r
\r
def iterEaseInBack(startX, startY, endX, endY, intervalSize, s=1.70158):\r
    """Returns an iterator of a easeInBack tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInBack, s))\r
\r
\r
def easeOutBack(n, s=1.70158):  # type: (Union[int, float], Union[int, float]) -> Union[int, float]\r
    """A tween function that overshoots the destination a little and then backs into the destination.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n -= 1\r
    return n * n * ((s + 1) * n + s) + 1\r
\r
\r
def iterEaseOutBack(startX, startY, endX, endY, intervalSize, s=1.70158):\r
    """Returns an iterator of a easeOutBack tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutBack, s))\r
\r
\r
def easeInOutBack(n, s=1.70158):  # type: (Union[int, float], Union[int, float]) -> Union[int, float]\r
    """A "back-in" tween function that overshoots both the start and destination.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    n *= 2\r
    if n < 1:\r
        s *= 1.525\r
        return 0.5 * (n * n * ((s + 1) * n - s))\r
    else:\r
        n -= 2\r
        s *= 1.525\r
        return 0.5 * (n * n * ((s + 1) * n + s) + 2)\r
\r
\r
def iterEaseInOutBack(startX, startY, endX, endY, intervalSize, s=1.70158):\r
    """Returns an iterator of a easeInOutBack tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutBack, s))\r
\r
\r
def easeInBounce(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """A bouncing tween function that begins bouncing and then jumps to the destination.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    return 1 - easeOutBounce(1 - n)\r
\r
\r
def iterEaseInBounce(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInBounce tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInBounce))\r
\r
\r
def easeOutBounce(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """A bouncing tween function that hits the destination and then bounces to rest.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    if n < (1 / 2.75):\r
        return 7.5625 * n * n\r
    elif n < (2 / 2.75):\r
        n -= 1.5 / 2.75\r
        return 7.5625 * n * n + 0.75\r
    elif n < (2.5 / 2.75):\r
        n -= 2.25 / 2.75\r
        return 7.5625 * n * n + 0.9375\r
    else:\r
        n -= 2.65 / 2.75\r
        return 7.5625 * n * n + 0.984375\r
\r
\r
def iterEaseOutBounce(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeOutBounce tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeOutBounce))\r
\r
\r
def easeInOutBounce(n):  # type: (Union[int, float]) -> Union[int, float]\r
    """A bouncing tween function that bounces at the start and end.\r
\r
    Args:\r
      n (int, float): The time progress, starting at 0.0 and ending at 1.0.\r
\r
    Returns:\r
      (float) The line progress, starting at 0.0 and ending at 1.0. Suitable for passing to getPointOnLine().\r
    """\r
    if n < 0.5:\r
        return easeInBounce(n * 2) * 0.5\r
    else:\r
        return easeOutBounce(n * 2 - 1) * 0.5 + 0.5\r
\r
\r
def iterEaseInOutBounce(startX, startY, endX, endY, intervalSize):\r
    """Returns an iterator of a easeInOutBounce tween between the start and end points, incrementing the\r
    interpolation factor by intervalSize each time. Guaranteed to return the point for 0.0 first\r
    and 1.0 last no matter the intervalSize."""\r
    return iter(_iterTween(startX, startY, endX, endY, intervalSize, easeInOutBounce))\r
`,"xled_plus/__init__.py":"","xled_plus/ledcolor.py":`"""
xled_plus.ledcolor
~~~~~~~~~~~~~

Author: Anders Holst (anders.holst@ri.se), 2021

This module provides a color model adapted for the led lights.
It is based on HSL (Hue - Saturation - Lightness).

The main entry-point is hsl_color(h, s, l) which takes values for hue,
saturation and lightness, and returns a tuple of rgb values.
Hue is in the range 0.0 - 1.0 (where both ends represent blue).
Saturation is also in the range 0.0 - 1.0.
Lighness however is in the range -1.0 - +1.0, where -1.0 is black, +1.0
is white, and 0.0 represents the maximum chroma of the hue.

You can choose between 4 color circles and two lightness policies, with the
function set_color_style which understands the following tags:
"3col": Standard R-G-B color circle with the colors Blue-Cyan-Green-
        -Yelow-Red-Magenta at equal distances.
"4col": NCS-color circle with Blue-Green-Yellow-Red at equal distances.
        Not particularly useful here but included if someone prefers it.
"6col": The common paintbox color circle with Blue-Green-Yellow-Orange-
        -Red-Purple at equal distances
"8col": A combined color circle, with Blue-Cyan-Green-Yellow-Orange-Red-
        -Magenta-Purple at equal distances. This is the most "perceptually
        even" circle, and in addition happens to have complementary colors
        placed opposite to each other.
"linear": A traditional lightness policy, where the light increases
          linearly for each hue from black (-1) up to maximum chroma (0)
          and then linearly from there to white (1). However, different
          hues have then different lightness with this policy.
"equilight": A lightness policy enforcing that all hues at a given
             lightness have the same perceived brightness. Maximum
             chroma occurs at different lightness for different hues.
A standard HSL color model would have "3col" and "linear", whereas the
default setting here is "8col" and "equilight" because it is more intuitive
and easier to work with.

The RGB type led lights are originally not well white balanced. They
have a cold purplish tinge when fully lit. The provided color model
compensates for this by balancing the lights. With this model you
can easily select any white you want - neutral, warm, cold, pinkish
or greenish - without the need to go to RGBW.
"""

led_gamma = 1.0

led_brightness = [0.35, 0.50, 0.15]

led_balance = [0.9, 1.0, 0.6]

col_styles_dict = {
    "3col": [0.0, 1.0 / 6.0, 2.0 / 6.0, 3.0 / 6.0, 4.0 / 6.0, 5.0 / 6.0, 1.0],
    "4col": [0.0, 1.0 / 8.0, 1.0 / 4.0, 2.0 / 4.0, 3.0 / 4.0, 7.0 / 8.0, 1.0],
    "6col": [0.0, 1.0 / 12.0, 1.0 / 6.0, 1.0 / 3.0, 2.0 / 3.0, 3.0 / 4.0, 1.0],
    "8col": [0.0, 1.0 / 8.0, 2.0 / 8.0, 3.0 / 8.0, 5.0 / 8.0, 6.0 / 8.0, 1.0],
    "10col": [0.0, 2.0 / 10.0, 3.0 / 10.0, 4.0 / 10.0, 7.0 / 10.0, 8.0 / 10.0, 1.0],
}

col_style = ("8col", "equilight")


# Internal functions


def colorgamma(x):
    global led_gamma
    return x if led_gamma == 1.0 else pow(x, led_gamma)


def invcolorgamma(x):
    global led_gamma
    return x if led_gamma == 1.0 else pow(x, 1.0 / led_gamma)


def colorgamma_image(x):
    return (pow(x, 1.0 / 2.4) * 1.055 - 0.055) if x > 0.0031308 else x * 12.92


def invcolorgamma_image(x):
    return pow((x + 0.055) / 1.055, 2.4) if x > 0.04045 else x / 12.92


def color_brightness(r, g, b):
    return sum(map(lambda c, br: c * br, [r, g, b], led_brightness))


# Entry points


def set_color_style(style):
    """
    Set the color circle and lightness policy to use in the color model.
    Possible color circles are: "3col", "4col", "6col" and "8col".
    Possible lightness policies are: "linear" and "equilight".

    :param str style: color circle or lightness policy to use.
    :rtype: tuple
    """
    global col_style, col_styles_dict
    if style in ["linear", "equilight"]:
        col_style = (col_style[0], style)
        return col_style
    elif style in col_styles_dict:
        col_style = (style, col_style[1])
        return col_style
    else:
        return False


def get_color_style():
    """
    Return the currently used color circle and lightness policy as a tuple.

    :rtype: tuple
    """
    global col_style
    return col_style


def rgb_color(r, g, b):
    """
    Takes r, g and b values in the range 0.0 - 1.0, and converts it to an
    rgb tuple in the range 0-255, adjusted for white balance of the leds.

    :param float r: red component (0.0 - 1.0)
    :param float g: green component (0.0 - 1.0)
    :param float b: blue component (0.0 - 1.0)
    :rtype: tuple
    """
    global led_balance
    return tuple(
        map(
            lambda c, b: max(0, min(255, int(255 * b * colorgamma(c)))),
            [r, g, b],
            led_balance,
        )
    )


def image_to_led_rgb(r, g, b):
    """
    Converts rgb values for a computer image pixel into rgb values for a led,
    compensating for gamma correction in the image.
    The input values and the returned rgb values are all in the range 0-255.

    :param float r: red component (0 - 255)
    :param float g: green component (0 - 255)
    :param float b: blue component (0 - 255)
    :rtype: tuple
    """
    return tuple(
        map(
            lambda c, bal: max(
                0, min(255, int(255 * bal * colorgamma(invcolorgamma_image(c / 255.0))))
            ),
            [r, g, b],
            led_balance,
        )
    )


def led_to_image_rgb(r, g, b):
    """
    Converts rgb values for a led into rbg values for a computer image pixel,
    compensating for gamma correction in the image.
    The input values and the returned rgb values are all in the range 0-255.

    :param float r: red component (0 - 255)
    :param float g: green component (0 - 255)
    :param float b: blue component (0 - 255)
    :rtype: tuple
    """
    return tuple(
        map(
            lambda c, bal: max(
                0,
                min(255, int(255 * colorgamma_image(invcolorgamma(c / (bal * 255.0))))),
            ),
            [r, g, b],
            led_balance,
        )
    )


def hsl_color(h, s, l):
    """
    Takes hue (0.0 - 1.0), saturation (0.0 - 1.0), and lightness (-1.0 - 1.0)
    values and converts it to an rgb tuple in the range 0-255.

    :param float h: hue component (0.0 - 1.0)
    :param float s: saturation component (0.0 - 1.0)
    :param float l: lightness component (-1.0 - 1.0)
    :rtype: tuple
    """
    global col_style, col_styles_dict
    hramp = col_styles_dict[col_style[0]]
    ir = 1.0 / led_balance[0]
    ig = 1.0 / led_balance[1]
    ib = 1.0 / led_balance[2]
    irg = min(ir, ig)
    irb = min(ir, ib)
    igb = min(ig, ib)
    iramp = [
        (0, 0, ib),
        (0, igb / 2, igb / 2),
        (0, ig, 0),
        (irg / 2, irg / 2, 0),
        (ir, 0, 0),
        (irb / 2, 0, irb / 2),
        (0, 0, ib),
    ]
    i = 0
    while h > hramp[i + 1]:
        i += 1
    p = (h - hramp[i]) / (hramp[i + 1] - hramp[i])
    (r, g, b) = tuple(map(lambda x1, x2: p * (x2 - x1) + x1, iramp[i], iramp[i + 1]))
    nrm = max(r / ir, g / ig, b / ib)
    (r, g, b) = tuple(map(lambda x: x / nrm, (r, g, b)))
    ll = (l + 1.0) * 0.5
    if col_style[1] == "linear":
        if ll < 0.5:
            t1 = l + 1.0
            t2 = 0.0
        else:
            t1 = 1.0 - l
            t2 = l
    else:
        br = color_brightness(r, g, b)
        # make the hue get its maximum dynamic saturation, up till maximum green, then linearly decreasing
        e = max(r, g, b)
        p = min(
            1.0,
            (1.0 - ll / e) / (1.0 - br),
            (1.0 - ll * led_balance[1]) / (1.0 - led_brightness[1]),
        )
        t1 = ll * p / ((br - e) * p + e)
        t2 = max(0.0, ll - t1 * br)
    t1 = s * t1
    t2 = s * t2 + ll * (1.0 - s)
    return rgb_color(r * t1 + t2, g * t1 + t2, b * t1 + t2)
`};const P="/twinky";function Ne(e){for(const[n,t]of Object.entries(Oe)){const l=`${P}/${n}`;e.FS.mkdirTree(l.slice(0,l.lastIndexOf("/"))),e.FS.writeFile(l,t)}return e.runPython(`import os, sys
sys.path.insert(0, ${JSON.stringify(P)})
os.chdir(${JSON.stringify(P)})`),e.pyimport("browser")}function Le(e){const n=e.toJs();return e.destroy(),n.buffer}const R=e=>self.postMessage(e,{transfer:typeof e=="string"?[]:[e]}),W=e=>R(JSON.stringify({error:e.message}));try{const e=await me({indexURL:new URL("../pyodide/",self.location.href).href}),n=Ne(e).Engine();self.onmessage=r=>{try{n.command(r.data)}catch(s){console.error(s)}},R(n.layout);const t=n.frame;n.init();let l=Date.now()/1e3+t;const a=()=>{try{R(Le(n.step()));const i=n.changed_state();i!==void 0&&R(i)}catch(i){return W(i)}const r=Date.now()/1e3,s=l-r;l=s<-t?r+t:l+t,setTimeout(a,Math.max(s,0)*1e3)};a()}catch(e){W(e)}
