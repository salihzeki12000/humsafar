
/* [start] feature=taming */
var safeJSON=window.safeJSON;
var tamings___=window.tamings___||[];
var bridge___;
var caja___=window.caja___;
var ___=window.___;;

/* [end] feature=taming */

/* [start] feature=gapi-globals */
;
window.gapi=window.gapi||{};window.gapi.client=window.gapi&&window.gapi.client||{};
;

/* [end] feature=gapi-globals */

/* [start] feature=globals */
;
var gadgets=window.gadgets||{},shindig=window.shindig||{},osapi=window.osapi=window.osapi||{};window.google=window.google||{};
;

/* [end] feature=globals */

/* [start] feature=core.config.base */
window['___cfg'] = window['___cfg'] || window['___gcfg'];;
if(!window.gadgets["config"]){gadgets.config=function(){var f;
var h={};
var b={};
function c(j,l){for(var k in l){if(!l.hasOwnProperty(k)){continue
}if(typeof j[k]==="object"&&typeof l[k]==="object"){c(j[k],l[k])
}else{j[k]=l[k]
}}}function i(){var j=document.scripts||document.getElementsByTagName("script");
if(!j||j.length==0){return null
}var m;
if(f.u){for(var k=0;
!m&&k<j.length;
++k){var l=j[k];
if(l.src&&l.src.indexOf(f.u)==0){m=l
}}}if(!m){m=j[j.length-1]
}if(!m.src){return null
}return m
}function a(j){var k="";
if(j.nodeType==3||j.nodeType==4){k=j.nodeValue
}else{if(j.innerText){k=j.innerText
}else{if(j.innerHTML){k=j.innerHTML
}else{if(j.firstChild){var l=[];
for(var m=j.firstChild;
m;
m=m.nextSibling){l.push(a(m))
}k=l.join("")
}}}}return k
}function e(k){if(!k){return{}
}var j;
while(k.charCodeAt(k.length-1)==0){k=k.substring(0,k.length-1)
}try{j=(new Function("return ("+k+"\n)"))()
}catch(l){}if(typeof j==="object"){return j
}try{j=(new Function("return ({"+k+"\n})"))()
}catch(l){}return typeof j==="object"?j:{}
}function g(n){var p=window.___cfg;
if(p){c(n,p)
}var o=i();
if(!o){return
}var k=a(o);
var j=e(k);
if(f.f&&f.f.length==1){var m=f.f[0];
if(!j[m]){var l={};
l[f.f[0]]=j;
j=l
}}c(n,j)
}function d(o){for(var l in h){if(h.hasOwnProperty(l)){var n=h[l];
for(var m=0,k=n.length;
m<k;
++m){o(l,n[m])
}}}}return{register:function(l,k,j,m){var n=h[l];
if(!n){n=[];
h[l]=n
}n.push({validators:k||{},callback:j,callOnUpdate:m})
},get:function(j){if(j){return b[j]||{}
}return b
},init:function(k,j){f=window.___jsl||{};
c(b,k);
g(b);
var l=window.___config||{};
c(b,l);
d(function(q,p){var o=b[q];
if(o&&!j){var m=p.validators;
for(var n in m){if(m.hasOwnProperty(n)){if(!m[n](o[n])){throw new Error('Invalid config value "'+o[n]+'" for parameter "'+n+'" in component "'+q+'"')
}}}}if(p.callback){p.callback(b)
}})
},update:function(k,p){var o=(window.gapi&&window.gapi["config"]&&window.gapi["config"]["update"]);
if(!p&&o){o(k)
}var n=[];
d(function(q,j){if(k.hasOwnProperty(q)||(p&&b&&b[q])){if(j.callback&&j.callOnUpdate){n.push(j.callback)
}}});
b=p?{}:b||{};
c(b,k);
for(var m=0,l=n.length;
m<l;
++m){n[m](b)
}}}
}()
}else{gadgets.config=window.gadgets["config"];
gadgets.config.register=gadgets.config.register;
gadgets.config.get=gadgets.config.get;
gadgets.config.init=gadgets.config.init;
gadgets.config.update=gadgets.config.update
};;

/* [end] feature=core.config.base */

/* [start] feature=core.log */
gadgets.log=(function(){var e=1;
var a=2;
var f=3;
var c=4;
var d=function(i){b(e,i)
};
gadgets.warn=function(i){b(a,i)
};
gadgets.error=function(i){b(f,i)
};
gadgets.debug=function(i){};
gadgets.setLogLevel=function(i){h=i
};
function b(k,i){if(k<h||!g){return
}if(k===a&&g.warn){g.warn(i)
}else{if(k===f&&g.error){try{g.error(i)
}catch(j){}}else{if(g.log){g.log(i)
}}}}d.INFO=e;
d.WARNING=a;
d.NONE=c;
var h=e;
var g=window.console?window.console:window.opera?window.opera.postError:undefined;
return d
})();;
;

/* [end] feature=core.log */

/* [start] feature=core.config */
(function(){gadgets.config.EnumValidator=function(d){var c=[];
if(arguments.length>1){for(var b=0,a;
(a=arguments[b]);
++b){c.push(a)
}}else{c=d
}return function(f){for(var e=0,g;
(g=c[e]);
++e){if(f===c[e]){return true
}}return false
}
};
gadgets.config.RegExValidator=function(a){return function(b){return a.test(b)
}
};
gadgets.config.ExistsValidator=function(a){return typeof a!=="undefined"
};
gadgets.config.NonEmptyStringValidator=function(a){return typeof a==="string"&&a.length>0
};
gadgets.config.BooleanValidator=function(a){return typeof a==="boolean"
};
gadgets.config.LikeValidator=function(a){return function(c){for(var d in a){if(a.hasOwnProperty(d)){var b=a[d];
if(!b(c[d])){return false
}}}return true
}
}
})();;

/* [end] feature=core.config */

/* [start] feature=core.util.base */
gadgets.util=gadgets.util||{};
(function(){gadgets.util.makeClosure=function(d,f,e){var c=[];
for(var b=2,a=arguments.length;
b<a;
++b){c.push(arguments[b])
}return function(){var g=c.slice();
for(var k=0,h=arguments.length;
k<h;
++k){g.push(arguments[k])
}return f.apply(d,g)
}
};
gadgets.util.makeEnum=function(b){var c,a,d={};
for(c=0;
(a=b[c]);
++c){d[a]=a
}return d
}
})();;

/* [end] feature=core.util.base */

/* [start] feature=core.util.dom */
gadgets.util=gadgets.util||{};
(function(){var c="http://www.w3.org/1999/xhtml";
function b(f,e){var h=e||{};
for(var g in h){if(h.hasOwnProperty(g)){f[g]=h[g]
}}}function d(g,f){var e=["<",g];
var i=f||{};
for(var h in i){if(i.hasOwnProperty(h)){e.push(" ");
e.push(h);
e.push('="');
e.push(gadgets.util.escapeString(i[h]));
e.push('"')
}}e.push("></");
e.push(g);
e.push(">");
return e.join("")
}function a(f){var g="";
if(f.nodeType==3||f.nodeType==4){g=f.nodeValue
}else{if(f.innerText){g=f.innerText
}else{if(f.innerHTML){g=f.innerHTML
}else{if(f.firstChild){var e=[];
for(var h=f.firstChild;
h;
h=h.nextSibling){e.push(a(h))
}g=e.join("")
}}}}return g
}gadgets.util.createElement=function(f){var e;
if((!document.body)||document.body.namespaceURI){try{e=document.createElementNS(c,f)
}catch(g){}}return e||document.createElement(f)
};
gadgets.util.createIframeElement=function(g){var i=gadgets.util.createElement("iframe");
try{var e=d("iframe",g);
var f=gadgets.util.createElement(e);
if(f&&((!i)||((f.tagName==i.tagName)&&(f.namespaceURI==i.namespaceURI)))){i=f
}}catch(h){}b(i,g);
return i
};
gadgets.util.getBodyElement=function(){if(document.body){return document.body
}try{var f=document.getElementsByTagNameNS(c,"body");
if(f&&(f.length==1)){return f[0]
}}catch(e){}return document.documentElement||document
};
gadgets.util.getInnerText=function(e){return a(e)
}
})();;

/* [end] feature=core.util.dom */

/* [start] feature=core.util.event */
gadgets.util=gadgets.util||{};
(function(){gadgets.util.attachBrowserEvent=function(c,b,d,a){if(typeof c.addEventListener!="undefined"){c.addEventListener(b,d,a)
}else{if(typeof c.attachEvent!="undefined"){c.attachEvent("on"+b,d)
}else{gadgets.warn("cannot attachBrowserEvent: "+b)
}}};
gadgets.util.removeBrowserEvent=function(c,b,d,a){if(c.removeEventListener){c.removeEventListener(b,d,a)
}else{if(c.detachEvent){c.detachEvent("on"+b,d)
}else{gadgets.warn("cannot removeBrowserEvent: "+b)
}}}
})();;

/* [end] feature=core.util.event */

/* [start] feature=core.util.onload */
gadgets.util=gadgets.util||{};
(function(){var a=[];
gadgets.util.registerOnLoadHandler=function(b){a.push(b)
};
gadgets.util.runOnLoadHandlers=function(){for(var c=0,b=a.length;
c<b;
++c){a[c]()
}}
})();;

/* [end] feature=core.util.onload */

/* [start] feature=core.util.string */
gadgets.util=gadgets.util||{};
(function(){var a={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true,65282:true,65287:true,65308:true,65310:true,65340:true};
function b(c,d){return String.fromCharCode(d)
}gadgets.util.escape=function(c,g){if(!c){return c
}else{if(typeof c==="string"){return gadgets.util.escapeString(c)
}else{if(typeof c==="Array"){for(var f=0,d=c.length;
f<d;
++f){c[f]=gadgets.util.escape(c[f])
}}else{if(typeof c==="object"&&g){var e={};
for(var h in c){if(c.hasOwnProperty(h)){e[gadgets.util.escapeString(h)]=gadgets.util.escape(c[h],true)
}}return e
}}}}return c
};
gadgets.util.escapeString=function(g){if(!g){return g
}var d=[],f,h;
for(var e=0,c=g.length;
e<c;
++e){f=g.charCodeAt(e);
h=a[f];
if(h===true){d.push("&#",f,";")
}else{if(h!==false){d.push(g.charAt(e))
}}}return d.join("")
};
gadgets.util.unescapeString=function(c){if(!c){return c
}return c.replace(/&#([0-9]+);/g,b)
}
})();;

/* [end] feature=core.util.string */

/* [start] feature=core.util.urlparams */
gadgets.util=gadgets.util||{};
(function(){var a=null;
function b(e){var f;
var c=e.indexOf("?");
var d=e.indexOf("#");
if(d===-1){f=e.substr(c+1)
}else{f=[e.substr(c+1,d-c-1),"&",e.substr(d+1)].join("")
}return f.split("&")
}gadgets.util.getUrlParameters=function(p){var d=typeof p==="undefined";
if(a!==null&&d){return a
}var l={};
var f=b(p||window.location.href);
var n=window.decodeURIComponent?decodeURIComponent:unescape;
for(var h=0,g=f.length;
h<g;
++h){var m=f[h].indexOf("=");
if(m===-1){continue
}var c=f[h].substring(0,m);
var o=f[h].substring(m+1);
o=o.replace(/\+/g," ");
try{l[c]=n(o)
}catch(k){}}if(d){a=l
}return l
};
gadgets.util.getUrlParameters()
})();;

/* [end] feature=core.util.urlparams */

/* [start] feature=gapi.util-globals */
gapi.util=window.gapi&&window.gapi.util||{};
;

/* [end] feature=gapi.util-globals */

/* [start] feature=core.util */
gadgets.util=gadgets.util||{};
(function(){var b={};
var a={};
function c(d){b=d["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,c)
}gadgets.util.getFeatureParameters=function(d){return typeof b[d]==="undefined"?null:b[d]
};
gadgets.util.hasFeature=function(d){return typeof b[d]!=="undefined"
};
gadgets.util.getServices=function(){return a
}
})();;

/* [end] feature=core.util */

/* [start] feature=gapi.util.getOrigin */
gapi.util.getOrigin=function(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a)throw Error("Invalid URI scheme in origin");var c="",d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1),b=b.substring(0,d);if("http"===
a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c};
;

/* [end] feature=gapi.util.getOrigin */

/* [start] feature=core.json */
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json=(function(){var a=/___$/;
function b(d,e){var c=this[d];
return c
}return{parse:function(d){try{return window.JSON.parse(d)
}catch(c){return false
}},stringify:function(d){var h=window.JSON.stringify;
function f(e){return h.call(this,e,b)
}var g=(Array.prototype.toJSON&&h([{x:1}])==='"[{\\"x\\": 1}]"')?f:h;
try{return g(d,function(i,e){return !a.test(i)?e:void 0
})
}catch(c){return null
}}}
})()
};;
;
if(!(window.JSON&&window.JSON.parse&&window.JSON.stringify)){gadgets.json=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",f(this.getUTCMonth()+1),"-",f(this.getUTCDate()),"T",f(this.getUTCHours()),":",f(this.getUTCMinutes()),":",f(this.getUTCSeconds()),"Z"].join("")
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value){var a,i,k,l,r=/[\"\\\x00-\x1f\x7f-\x9f]/g,v;
switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c
}c=a.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}a=[];
if(typeof value.length==="number"&&!value.propertyIsEnumerable("length")){l=value.length;
for(i=0;
i<l;
i+=1){a.push(stringify(value[i])||"null")
}return"["+a.join(",")+"]"
}for(k in value){if(/___$/.test(k)){continue
}if(value.hasOwnProperty(k)){if(typeof k==="string"){v=stringify(value[k]);
if(v){a.push(stringify(k)+":"+v)
}}}}return"{"+a.join(",")+"}"
}return""
}return{stringify:stringify,parse:function(text){if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return eval("("+text+")")
}return false
}}
}()
};;
gadgets.json.flatten=function(c){var d={};
if(c===null||c===undefined){return d
}for(var a in c){if(c.hasOwnProperty(a)){var b=c[a];
if(null===b||undefined===b){continue
}d[a]=(typeof b==="string")?b:gadgets.json.stringify(b)
}}return d
};;

/* [end] feature=core.json */

/* [start] feature=shindig.auth */
shindig.Auth=function(){var authToken=null;
var trusted=null;
function addParamsToToken(urlParams){var args=authToken.split("&");
for(var i=0;
i<args.length;
i++){var nameAndValue=args[i].split("=");
if(nameAndValue.length===2){var name=nameAndValue[0];
var value=nameAndValue[1];
if(value==="$"){value=encodeURIComponent(urlParams[name]);
args[i]=name+"="+value
}}}authToken=args.join("&")
}function init(configuration){var urlParams=gadgets.util.getUrlParameters();
var config=configuration["shindig.auth"]||{};
if(config.authToken){authToken=config.authToken
}else{if(urlParams.st){authToken=urlParams.st
}}if(authToken!==null){addParamsToToken(urlParams)
}if(config.trustedJson){trusted=(eval("("+config.trustedJson+")"))
}}gadgets.config.register("shindig.auth",null,init);
return{getSecurityToken:function(){return authToken
},updateSecurityToken:function(newToken){authToken=newToken
},getTrustedData:function(){return trusted
}}
};;
shindig.auth=new shindig.Auth();;

/* [end] feature=shindig.auth */

/* [start] feature=rpc */
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.wpm){gadgets.rpctx.wpm=function(){var e,d;
var c=true;
function b(h,j,g){if(typeof window.addEventListener!="undefined"){window.addEventListener(h,j,g)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("on"+h,j)
}}if(h==="message"){window.___jsl=window.___jsl||{};
var i=window.___jsl;
i.RPMQ=i.RPMQ||[];
i.RPMQ.push(j)
}}function a(h,i,g){if(window.removeEventListener){window.removeEventListener(h,i,g)
}else{if(window.detachEvent){window.detachEvent("on"+h,i)
}}}function f(h){var i=gadgets.json.parse(h.data);
if(!i||!i.f){return
}gadgets.debug("gadgets.rpc.receive("+window.name+"): "+h.data);
var g=gadgets.rpc.getTargetOrigin(i.f);
if(c&&(typeof h.origin!=="undefined"?h.origin!==g:h.domain!==/^.+:\/\/([^:]+).*/.exec(g)[1])){gadgets.error("Invalid rpc message origin. "+g+" vs "+(h.origin||""));
return
}e(i,h.origin)
}return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(h,i){function g(k){var j=k&&k.rpc||{};
if(String(j.disableForceSecure)==="true"){c=false
}}gadgets.config.register("rpc",null,g);
e=h;
d=i;
b("message",f,false);
d("..",true);
return true
},setup:function(h,g){d(h,true);
return true
},call:function(h,k,j){var g=gadgets.rpc.getTargetOrigin(h);
var i=gadgets.rpc._getTargetWin(h);
if(g){window.setTimeout(function(){var l=gadgets.json.stringify(j);
gadgets.debug("gadgets.rpc.send("+window.name+"): "+l);
i.postMessage(l,g)
},0)
}else{if(h!=".."){gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message")
}}return true
}}
}()
};;

       gadgets.rpctx.ifpc = gadgets.rpctx.wpm;
    ;
if(!window.gadgets||!window.gadgets["rpc"]){gadgets.rpc=function(){var M="__cb";
var S="";
var T="__ack";
var f=500;
var G=10;
var b="|";
var u="callback";
var g="origin";
var r="referer";
var s="legacy__";
var q={};
var W={};
var D={};
var B={};
var z=0;
var l={};
var m={};
var d={};
var n={};
var E={};
var e=null;
var p=null;
var A=(window.top!==window.self);
var v=window.name;
var J=function(){};
var P=0;
var Y=1;
var a=2;
var x=window.console;
var V=x&&x.log&&function(ae){x.log(ae)
}||function(){};
var R=(function(){function ae(af){return function(){V(af+": call ignored")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:ae("init"),setup:ae("setup"),call:ae("call")}
})();
if(gadgets.util){d=gadgets.util.getUrlParameters()
}function K(){if(d.rpctx=="flash"){return gadgets.rpctx.flash
}if(d.rpctx=="rmr"){return gadgets.rpctx.rmr
}var ae=typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?(gadgets.rpctx.flash?gadgets.rpctx.flash:(gadgets.rpctx.nix?gadgets.rpctx.nix:gadgets.rpctx.ifpc)):navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc;
if(!ae){ae=R
}return ae
}function k(aj,ah){if(n[aj]){return
}var af=H;
if(!ah){af=R
}n[aj]=af;
var ae=E[aj]||[];
for(var ag=0;
ag<ae.length;
++ag){var ai=ae[ag];
ai.t=F(aj);
af.call(aj,ai.f,ai)
}E[aj]=[]
}var I=false,U=false;
function N(){if(U){return
}function ae(){I=true
}if(typeof window.addEventListener!="undefined"){window.addEventListener("unload",ae,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onunload",ae)
}}U=true
}function j(ae,ai,af,ah,ag){if(!B[ai]||B[ai]!==af){gadgets.error("Invalid gadgets.rpc token. "+B[ai]+" vs "+af);
J(ai,a)
}ag.onunload=function(){if(m[ai]&&!I){J(ai,Y);
gadgets.rpc.removeReceiver(ai)
}};
N();
ah=gadgets.json.parse(decodeURIComponent(ah))
}function Z(ak,af){if(ak&&typeof ak.s==="string"&&typeof ak.f==="string"&&ak.a instanceof Array){if(B[ak.f]){if(B[ak.f]!==ak.t){gadgets.error("Invalid gadgets.rpc token. "+B[ak.f]+" vs "+ak.t);
J(ak.f,a)
}}if(ak.s===T){window.setTimeout(function(){k(ak.f,true)
},0);
return
}if(ak.c){ak[u]=function(al){var am=ak.g?s:"";
gadgets.rpc.call(ak.f,am+M,null,ak.c,al)
}
}if(af){var ag=t(af);
ak[g]=af;
var ah=ak.r,aj;
try{aj=t(ah)
}catch(ai){}if(!ah||aj!=ag){ah=af
}ak[r]=ah
}var ae=(q[ak.s]||q[S]).apply(ak,ak.a);
if(ak.c&&typeof ae!=="undefined"){gadgets.rpc.call(ak.f,M,null,ak.c,ae)
}}}function t(ag){if(!ag){return""
}ag=((ag.split("#"))[0].split("?"))[0];
ag=ag.toLowerCase();
if(ag.indexOf("//")==0){ag=window.location.protocol+ag
}if(ag.indexOf("://")==-1){ag=window.location.protocol+"//"+ag
}var ah=ag.substring(ag.indexOf("://")+3);
var ae=ah.indexOf("/");
if(ae!=-1){ah=ah.substring(0,ae)
}var aj=ag.substring(0,ag.indexOf("://"));
if(aj!=="http"&&aj!=="https"&&aj!=="chrome-extension"&&aj!=="file"){throw Error("Invalid URI scheme in origin")
}var ai="";
var ak=ah.indexOf(":");
if(ak!=-1){var af=ah.substring(ak+1);
ah=ah.substring(0,ak);
if((aj==="http"&&af!=="80")||(aj==="https"&&af!=="443")){ai=":"+af
}}return aj+"://"+ah+ai
}function C(af,ae){return"/"+af+(ae?b+ae:"")
}function y(ah){if(ah.charAt(0)=="/"){var af=ah.indexOf(b);
var ag=af>0?ah.substring(1,af):ah.substring(1);
var ae=af>0?ah.substring(af+1):null;
return{id:ag,origin:ae}
}else{return null
}}function ad(ag){if(typeof ag==="undefined"||ag===".."){return window.parent
}var af=y(ag);
if(af){return window.top.frames[af.id]
}ag=String(ag);
var ae=window.frames[ag];
if(ae){return ae
}ae=document.getElementById(ag);
if(ae&&ae.contentWindow){return ae.contentWindow
}return null
}function L(ah){var ag=null;
var ae=O(ah);
if(ae){ag=ae
}else{var af=y(ah);
if(af){ag=af.origin
}else{if(ah==".."){ag=d.parent
}else{ag=document.getElementById(ah).src
}}}return t(ag)
}var H=K();
q[S]=function(){V("Unknown RPC service: "+this["s"])
};
q[M]=function(af,ae){var ag=l[af];
if(ag){delete l[af];
ag.call(this,ae)
}};
function X(ag,ae){if(m[ag]===true){return
}if(typeof m[ag]==="undefined"){m[ag]=0
}var af=ad(ag);
if(ag===".."||af!=null){if(H.setup(ag,ae)===true){m[ag]=true;
return
}}if(m[ag]!==true&&m[ag]++<G){window.setTimeout(function(){X(ag,ae)
},f)
}else{n[ag]=R;
m[ag]=true
}}function O(af){var ae=W[af];
if(ae&&ae.substring(0,1)==="/"){if(ae.substring(1,2)==="/"){ae=document.location.protocol+ae
}else{ae=document.location.protocol+"//"+document.location.host+ae
}}return ae
}function ac(af,ae,ag){if(ae&&!/http(s)?:\/\/.+/.test(ae)){if(ae.indexOf("//")==0){ae=window.location.protocol+ae
}else{if(ae.charAt(0)=="/"){ae=window.location.protocol+"//"+window.location.host+ae
}else{if(ae.indexOf("://")==-1){ae=window.location.protocol+"//"+ae
}}}}W[af]=ae;
if(typeof ag!=="undefined"){D[af]=!!ag
}}function F(ae){return B[ae]
}function c(ae,af){af=af||"";
B[ae]=String(af);
X(ae,af)
}function ab(af){var ae=af.passReferrer||"";
var ag=ae.split(":",2);
e=ag[0]||"none";
p=ag[1]||"origin"
}function aa(ae){if(Q(ae)){H=gadgets.rpctx.ifpc||R;
H.init(Z,k)
}}function Q(ae){return String(ae.useLegacyProtocol)==="true"
}function h(af,ae){function ag(aj){var ai=aj&&aj.rpc||{};
ab(ai);
var ah=ai.parentRelayUrl||"";
ah=t(d.parent||ae)+ah;
ac("..",ah,Q(ai));
aa(ai);
c("..",af)
}if(!d.parent&&ae){ag({});
return
}gadgets.config.register("rpc",null,ag)
}function o(af,aj,al){var ai=null;
if(af.charAt(0)!="/"){if(!gadgets.util){return
}ai=document.getElementById(af);
if(!ai){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+af+", element not found.")
}}var ae=ai&&ai.src;
var ag=aj||gadgets.rpc.getOrigin(ae);
ac(af,ag);
var ak=gadgets.util.getUrlParameters(ae);
var ah=al||ak.rpctoken;
c(af,ah)
}function i(ae,ag,ah){if(ae===".."){var af=ah||d.rpctoken||d.ifpctok||"";
h(af,ag)
}else{o(ae,ag,ah)
}}function w(ag){if(e==="bidir"||(e==="c2p"&&ag==="..")||(e==="p2c"&&ag!=="..")){var af=window.location.href;
var ah="?";
if(p==="query"){ah="#"
}else{if(p==="hash"){return af
}}var ae=af.lastIndexOf(ah);
ae=ae===-1?af.length:ae;
return af.substring(0,ae)
}return null
}return{config:function(ae){if(typeof ae.securityCallback==="function"){J=ae.securityCallback
}},register:function(af,ae){if(af===M||af===T){throw new Error("Cannot overwrite callback/ack service")
}if(af===S){throw new Error("Cannot overwrite default service: use registerDefault")
}q[af]=ae
},unregister:function(ae){if(ae===M||ae===T){throw new Error("Cannot delete callback/ack service")
}if(ae===S){throw new Error("Cannot delete default service: use unregisterDefault")
}delete q[ae]
},registerDefault:function(ae){q[S]=ae
},unregisterDefault:function(){delete q[S]
},forceParentVerifiable:function(){if(!H.isParentVerifiable()){H=gadgets.rpctx.ifpc
}},call:function(ae,ag,al,aj){ae=ae||"..";
var ak="..";
if(ae===".."){ak=v
}else{if(ae.charAt(0)=="/"){ak=C(v,gadgets.rpc.getOrigin(window.location.href))
}}++z;
if(al){l[z]=al
}var ai={s:ag,f:ak,c:al?z:0,a:Array.prototype.slice.call(arguments,3),t:B[ae],l:!!D[ae]};
var af=w(ae);
if(af){ai.r=af
}if(ae!==".."&&y(ae)==null&&!document.getElementById(ae)){return
}var ah=n[ae];
if(!ah&&y(ae)!==null){ah=H
}if(ag.indexOf(s)===0){ah=H;
ai.s=ag.substring(s.length);
ai.c=ai.c?ai.c:z
}ai.g=true;
ai.r=ak;
if(!ah){if(!E[ae]){E[ae]=[ai]
}else{E[ae].push(ai)
}return
}if(D[ae]){ah=gadgets.rpctx.ifpc
}if(ah.call(ae,ak,ai)===false){n[ae]=R;
H.call(ae,ak,ai)
}},getRelayUrl:O,setRelayUrl:ac,setAuthToken:c,setupReceiver:i,getAuthToken:F,removeReceiver:function(ae){delete W[ae];
delete D[ae];
delete B[ae];
delete m[ae];
delete n[ae]
},getRelayChannel:function(){return H.getCode()
},receive:function(af,ae){if(af.length>4){H._receiveMessage(af,Z)
}else{j.apply(null,af.concat(ae))
}},receiveSameDomain:function(ae){ae.a=Array.prototype.slice.call(ae.a);
window.setTimeout(function(){Z(ae)
},0)
},getOrigin:t,getTargetOrigin:L,init:function(){if(H.init(Z,k)===false){H=R
}if(A){i("..")
}else{gadgets.config.register("rpc",null,function(af){var ae=af.rpc||{};
ab(ae);
aa(ae)
})
}},_getTargetWin:ad,_parseSiblingId:y,ACK:T,RPC_ID:v||"..",SEC_ERROR_LOAD_TIMEOUT:P,SEC_ERROR_FRAME_PHISH:Y,SEC_ERROR_FORGED_MSG:a}
}();
gadgets.rpc.init()
}else{if(typeof gadgets.rpc=="undefined"||!gadgets.rpc){gadgets.rpc=window.gadgets["rpc"];
gadgets.rpc.config=gadgets.rpc.config;
gadgets.rpc.register=gadgets.rpc.register;
gadgets.rpc.unregister=gadgets.rpc.unregister;
gadgets.rpc.registerDefault=gadgets.rpc.registerDefault;
gadgets.rpc.unregisterDefault=gadgets.rpc.unregisterDefault;
gadgets.rpc.forceParentVerifiable=gadgets.rpc.forceParentVerifiable;
gadgets.rpc.call=gadgets.rpc.call;
gadgets.rpc.getRelayUrl=gadgets.rpc.getRelayUrl;
gadgets.rpc.setRelayUrl=gadgets.rpc.setRelayUrl;
gadgets.rpc.setAuthToken=gadgets.rpc.setAuthToken;
gadgets.rpc.setupReceiver=gadgets.rpc.setupReceiver;
gadgets.rpc.getAuthToken=gadgets.rpc.getAuthToken;
gadgets.rpc.removeReceiver=gadgets.rpc.removeReceiver;
gadgets.rpc.getRelayChannel=gadgets.rpc.getRelayChannel;
gadgets.rpc.receive=gadgets.rpc.receive;
gadgets.rpc.receiveSameDomain=gadgets.rpc.receiveSameDomain;
gadgets.rpc.getOrigin=gadgets.rpc.getOrigin;
gadgets.rpc.getTargetOrigin=gadgets.rpc.getTargetOrigin;
gadgets.rpc._getTargetWin=gadgets.rpc._getTargetWin;
gadgets.rpc._parseSiblingId=gadgets.rpc._parseSiblingId
}};;

/* [end] feature=rpc */

/* [start] feature=opensocial-reference */
var opensocial=opensocial||{};
opensocial.requestSendMessage=function(a,d,b,c){return opensocial.Container.get().requestSendMessage(a,d,b,c)
};
opensocial.requestShareApp=function(a,d,b,c){opensocial.Container.get().requestShareApp(a,d,b,c)
};
opensocial.requestCreateActivity=function(c,b,a){if(!c||(!c.getField(opensocial.Activity.Field.TITLE)&&!c.getField(opensocial.Activity.Field.TITLE_ID))){if(a){window.setTimeout(function(){a(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.BAD_REQUEST,"You must pass in an activity with a title or title id."))
},0)
}return
}opensocial.Container.get().requestCreateActivity(c,b,a)
};
opensocial.CreateActivityPriority={HIGH:"HIGH",LOW:"LOW"};
opensocial.hasPermission=function(a){return opensocial.Container.get().hasPermission(a)
};
opensocial.requestPermission=function(b,c,a){opensocial.Container.get().requestPermission(b,c,a)
};
opensocial.Permission={VIEWER:"viewer"};
opensocial.getEnvironment=function(){return opensocial.Container.get().getEnvironment()
};
opensocial.newDataRequest=function(){return opensocial.Container.get().newDataRequest()
};
opensocial.newActivity=function(a){return opensocial.Container.get().newActivity(a)
};
opensocial.newAlbum=function(a){return opensocial.Container.get().newAlbum(a)
};
opensocial.newMediaItem=function(c,a,b){return opensocial.Container.get().newMediaItem(c,a,b)
};
opensocial.newMessage=function(a,b){return opensocial.Container.get().newMessage(a,b)
};
opensocial.EscapeType={HTML_ESCAPE:"htmlEscape",NONE:"none"};
opensocial.newIdSpec=function(a){return opensocial.Container.get().newIdSpec(a)
};
opensocial.newNavigationParameters=function(a){return opensocial.Container.get().newNavigationParameters(a)
};
opensocial.invalidateCache=function(){opensocial.Container.get().invalidateCache()
};
Function.prototype.inherits=function(a){function b(){}b.prototype=a.prototype;
this.superClass_=a.prototype;
this.prototype=new b();
this.prototype.constructor=this
};;
opensocial.Activity=function(a){this.fields_=a
};
opensocial.Activity.Field={TITLE_ID:"titleId",TITLE:"title",TEMPLATE_PARAMS:"templateParams",URL:"url",MEDIA_ITEMS:"mediaItems",BODY_ID:"bodyId",BODY:"body",EXTERNAL_ID:"externalId",STREAM_TITLE:"streamTitle",STREAM_URL:"streamUrl",STREAM_SOURCE_URL:"streamSourceUrl",STREAM_FAVICON_URL:"streamFaviconUrl",PRIORITY:"priority",ID:"id",USER_ID:"userId",APP_ID:"appId",POSTED_TIME:"postedTime"};
opensocial.Activity.prototype.getId=function(){return this.getField(opensocial.Activity.Field.ID)
};
opensocial.Activity.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};
opensocial.Activity.prototype.setField=function(a,b){return(this.fields_[a]=b)
};;
opensocial.Address=function(a){this.fields_=a||{}
};
opensocial.Address.Field={TYPE:"type",UNSTRUCTURED_ADDRESS:"unstructuredAddress",PO_BOX:"poBox",STREET_ADDRESS:"streetAddress",EXTENDED_ADDRESS:"extendedAddress",REGION:"region",LOCALITY:"locality",POSTAL_CODE:"postalCode",COUNTRY:"country",LATITUDE:"latitude",LONGITUDE:"longitude"};
opensocial.Address.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};;
opensocial.Album=function(a){this.fields_=a||{}
};
opensocial.Album.Field={DESCRIPTION:"description",ID:"id",LOCATION:"location",MEDIA_ITEM_COUNT:"mediaItemCount",MEDIA_MIME_TYPE:"mediaMimeType",MEDIA_TYPE:"mediaType",OWNER_ID:"ownerId",THUMBNAIL_URL:"thumbnailUrl",TITLE:"title"};
opensocial.Album.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};
opensocial.Album.prototype.setField=function(a,b){return this.fields_[a]=b
};;
opensocial.BodyType=function(a){this.fields_=a||{}
};
opensocial.BodyType.Field={BUILD:"build",HEIGHT:"height",WEIGHT:"weight",EYE_COLOR:"eyeColor",HAIR_COLOR:"hairColor"};
opensocial.BodyType.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};;
opensocial.Collection=function(c,b,a){this.array_=c||[];
this.offset_=b||0;
this.totalSize_=a||this.array_.length
};
opensocial.Collection.prototype.getById=function(c){for(var a=0;
a<this.size();
a++){var b=this.array_[a];
if(b.getId()===c){return b
}}return null
};
opensocial.Collection.prototype.size=function(){return this.array_.length
};
opensocial.Collection.prototype.each=function(b){for(var a=0;
a<this.size();
a++){b(this.array_[a])
}};
opensocial.Collection.prototype.asArray=function(){return this.array_
};
opensocial.Collection.prototype.getTotalSize=function(){return this.totalSize_
};
opensocial.Collection.prototype.getOffset=function(){return this.offset_
};;
opensocial.Container=function(){};
opensocial.Container.container_=null;
opensocial.Container.setContainer=function(a){opensocial.Container.container_=a
};
opensocial.Container.get=function(){return opensocial.Container.container_
};
opensocial.Container.prototype.getEnvironment=function(){};
opensocial.Container.prototype.requestSendMessage=function(a,d,b,c){gadgets.rpc.call(null,"requestSendMessage",b,a,d,b,c)
};
opensocial.Container.prototype.requestShareApp=function(a,d,b,c){if(b){window.setTimeout(function(){b(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
opensocial.Container.prototype.requestCreateActivity=function(c,b,a){if(a){window.setTimeout(function(){a(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
opensocial.Container.prototype.hasPermission=function(a){return false
};
opensocial.Container.prototype.requestPermission=function(b,c,a){if(a){window.setTimeout(function(){a(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
opensocial.Container.prototype.requestData=function(a,b){};
opensocial.Container.prototype.newCreateAlbumRequest=function(b,a){};
opensocial.Container.prototype.newCreateMediaItemRequest=function(a,c,b){};
opensocial.Container.prototype.newDeleteAlbumRequest=function(a,b){};
opensocial.Container.prototype.newFetchPersonRequest=function(b,a){};
opensocial.Container.prototype.newFetchPeopleRequest=function(a,b){};
opensocial.Container.prototype.newFetchPersonAppDataRequest=function(a,c,b){};
opensocial.Container.prototype.newUpdatePersonAppDataRequest=function(a,b){};
opensocial.Container.prototype.newRemovePersonAppDataRequest=function(a){};
opensocial.Container.prototype.newUpdateAlbumRequest=function(b,c,a){};
opensocial.Container.prototype.newUpdateMediaItemRequest=function(b,d,c,a){};
opensocial.Container.prototype.newFetchActivitiesRequest=function(a,b){};
opensocial.Container.prototype.newFetchAlbumsRequest=function(a,b){};
opensocial.Container.prototype.newFetchMediaItemsRequest=function(a,b){};
opensocial.Container.prototype.newFetchMessageCollectionsRequest=function(a,b){};
opensocial.Container.prototype.newFetchMessagesRequest=function(a,c,b){};
opensocial.Container.prototype.newCollection=function(c,b,a){return new opensocial.Collection(c,b,a)
};
opensocial.Container.prototype.newPerson=function(a,b,c){return new opensocial.Person(a,b,c)
};
opensocial.Container.prototype.newActivity=function(a){return new opensocial.Activity(a)
};
opensocial.Container.prototype.newAlbum=function(a){return new opensocial.Album(a)
};
opensocial.Container.prototype.newMediaItem=function(c,a,b){return new opensocial.MediaItem(c,a,b)
};
opensocial.Container.prototype.newMessage=function(a,b){return new opensocial.Message(a,b)
};
opensocial.Container.prototype.newIdSpec=function(a){return new opensocial.IdSpec(a)
};
opensocial.Container.prototype.newNavigationParameters=function(a){return new opensocial.NavigationParameters(a)
};
opensocial.Container.prototype.newResponseItem=function(a,c,b,d){return new opensocial.ResponseItem(a,c,b,d)
};
opensocial.Container.prototype.newDataResponse=function(a,b){return new opensocial.DataResponse(a,b)
};
opensocial.Container.prototype.newDataRequest=function(){return new opensocial.DataRequest()
};
opensocial.Container.prototype.newEnvironment=function(b,a){return new opensocial.Environment(b,a)
};
opensocial.Container.prototype.invalidateCache=function(){};
opensocial.Container.isArray=function(a){return a instanceof Array
};
opensocial.Container.getField=function(a,b,c){var d=a[b];
return opensocial.Container.escape(d,c,false)
};
opensocial.Container.escape=function(c,b,a){if(b&&b[opensocial.DataRequest.DataRequestFields.ESCAPE_TYPE]==opensocial.EscapeType.NONE){return c
}else{return gadgets.util.escape(c,a)
}};;
opensocial.DataRequest=function(){this.requestObjects_=[]
};
opensocial.DataRequest.prototype.requestObjects_=null;
opensocial.DataRequest.prototype.getRequestObjects=function(){return this.requestObjects_
};
opensocial.DataRequest.prototype.add=function(b,a){return this.requestObjects_.push({key:a,request:b})
};
opensocial.DataRequest.prototype.send=function(a){var b=a||function(){};
opensocial.Container.get().requestData(this,b)
};
opensocial.DataRequest.SortOrder={TOP_FRIENDS:"topFriends",NAME:"name"};
opensocial.DataRequest.FilterType={ALL:"all",HAS_APP:"hasApp",TOP_FRIENDS:"topFriends",IS_FRIENDS_WITH:"isFriendsWith"};
opensocial.DataRequest.PeopleRequestFields={PROFILE_DETAILS:"profileDetail",SORT_ORDER:"sortOrder",FILTER:"filter",FILTER_OPTIONS:"filterOptions",FIRST:"first",MAX:"max",APP_DATA:"appData",ESCAPE_TYPE:"escapeType"};
opensocial.DataRequest.prototype.addDefaultParam=function(c,b,a){c[b]=c[b]||a
};
opensocial.DataRequest.prototype.addDefaultProfileFields=function(b){var a=opensocial.DataRequest.PeopleRequestFields;
var c=b[a.PROFILE_DETAILS]||[];
b[a.PROFILE_DETAILS]=c.concat([opensocial.Person.Field.ID,opensocial.Person.Field.NAME,opensocial.Person.Field.THUMBNAIL_URL])
};
opensocial.DataRequest.prototype.asArray=function(a){if(opensocial.Container.isArray(a)){return a
}else{return[a]
}};
opensocial.DataRequest.prototype.newCreateAlbumRequest=function(b,a){return opensocial.Container.get().newCreateAlbumRequest(b,a)
};
opensocial.DataRequest.prototype.newCreateMediaItemRequest=function(a,c,b){return opensocial.Container.get().newCreateMediaItemRequest(a,c,b)
};
opensocial.DataRequest.prototype.newDeleteAlbumRequest=function(a,b){return opensocial.Container.get().newDeleteAlbumRequest(a,b)
};
opensocial.DataRequest.prototype.newFetchPersonRequest=function(b,a){a=a||{};
this.addDefaultProfileFields(a);
return opensocial.Container.get().newFetchPersonRequest(b,a)
};
opensocial.DataRequest.prototype.newFetchPeopleRequest=function(b,c){c=c||{};
var a=opensocial.DataRequest.PeopleRequestFields;
this.addDefaultProfileFields(c);
this.addDefaultParam(c,a.SORT_ORDER,opensocial.DataRequest.SortOrder.TOP_FRIENDS);
this.addDefaultParam(c,a.FILTER,opensocial.DataRequest.FilterType.ALL);
this.addDefaultParam(c,a.FIRST,0);
this.addDefaultParam(c,a.MAX,20);
return opensocial.Container.get().newFetchPeopleRequest(b,c)
};
opensocial.DataRequest.AlbumRequestFields={FIRST:"first",MAX:"max"};
opensocial.DataRequest.MediaItemRequestFields={FIRST:"first",MAX:"max"};
opensocial.DataRequest.DataRequestFields={ESCAPE_TYPE:"escapeType"};
opensocial.DataRequest.prototype.newFetchPersonAppDataRequest=function(a,c,b){return opensocial.Container.get().newFetchPersonAppDataRequest(a,this.asArray(c),b)
};
opensocial.DataRequest.prototype.newUpdateAlbumRequest=function(a,b,c){return opensocial.Container.get().newUpdateAlbumRequest(a,b,c)
};
opensocial.DataRequest.prototype.newUpdateMediaItemRequest=function(a,c,b,d){return opensocial.Container.get().newUpdateMediaItemRequest(a,c,b,d)
};
opensocial.DataRequest.prototype.newUpdatePersonAppDataRequest=function(a,b){return opensocial.Container.get().newUpdatePersonAppDataRequest(a,b)
};
opensocial.DataRequest.prototype.newRemovePersonAppDataRequest=function(a){return opensocial.Container.get().newRemovePersonAppDataRequest(a)
};
opensocial.DataRequest.ActivityRequestFields={APP_ID:"appId",FIRST:"first",MAX:"max"};
opensocial.DataRequest.prototype.newFetchActivitiesRequest=function(b,c){c=c||{};
var a=opensocial.DataRequest.ActivityRequestFields;
this.addDefaultParam(c,a.FIRST,0);
this.addDefaultParam(c,a.MAX,20);
return opensocial.Container.get().newFetchActivitiesRequest(b,c)
};
opensocial.DataRequest.prototype.newFetchAlbumsRequest=function(b,c){c=c||{};
var a=opensocial.DataRequest.AlbumRequestFields;
this.addDefaultParam(c,a.FIRST,0);
this.addDefaultParam(c,a.MAX,20);
return opensocial.Container.get().newFetchAlbumsRequest(b,c)
};
opensocial.DataRequest.prototype.newFetchMediaItemsRequest=function(b,c,d){d=d||{};
var a=opensocial.DataRequest.MediaItemRequestFields;
this.addDefaultParam(d,a.FIRST,0);
this.addDefaultParam(d,a.MAX,20);
return opensocial.Container.get().newFetchMediaItemsRequest(b,c,d)
};
opensocial.DataRequest.prototype.newFetchMessageCollectionsRequest=function(a,b){b=b||{};
return opensocial.Container.get().newFetchMessageCollectionsRequest(a,b)
};
opensocial.DataRequest.prototype.newFetchMessagesRequest=function(a,c,b){b=b||{};
return opensocial.Container.get().newFetchMessagesRequest(a,c,b)
};;
opensocial.DataResponse=function(a,b,c){this.responseItems_=a;
this.globalError_=b;
this.errorMessage_=c
};
opensocial.DataResponse.prototype.hadError=function(){return !!this.globalError_
};
opensocial.DataResponse.prototype.getErrorMessage=function(){return this.errorMessage_
};
opensocial.DataResponse.prototype.get=function(a){return this.responseItems_[a]
};;
opensocial.Email=function(a){this.fields_=a||{}
};
opensocial.Email.Field={TYPE:"type",ADDRESS:"address"};
opensocial.Email.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};;
opensocial.Enum=function(b,a){this.key=b;
this.displayValue=a
};
opensocial.Enum.prototype.getKey=function(){return gadgets.util.escape(this.key)
};
opensocial.Enum.prototype.getDisplayValue=function(){return gadgets.util.escape(this.displayValue)
};
opensocial.Enum.Smoker={NO:"NO",YES:"YES",SOCIALLY:"SOCIALLY",OCCASIONALLY:"OCCASIONALLY",REGULARLY:"REGULARLY",HEAVILY:"HEAVILY",QUITTING:"QUITTING",QUIT:"QUIT"};
opensocial.Enum.Drinker={NO:"NO",YES:"YES",SOCIALLY:"SOCIALLY",OCCASIONALLY:"OCCASIONALLY",REGULARLY:"REGULARLY",HEAVILY:"HEAVILY",QUITTING:"QUITTING",QUIT:"QUIT"};
opensocial.Enum.Gender={MALE:"MALE",FEMALE:"FEMALE"};
opensocial.Enum.LookingFor={DATING:"DATING",FRIENDS:"FRIENDS",RELATIONSHIP:"RELATIONSHIP",NETWORKING:"NETWORKING",ACTIVITY_PARTNERS:"ACTIVITY_PARTNERS",RANDOM:"RANDOM"};
opensocial.Enum.Presence={AWAY:"AWAY",CHAT:"CHAT",DND:"DND",OFFLINE:"OFFLINE",ONLINE:"ONLINE",XA:"XA"};;
opensocial.Environment=function(b,a){this.domain=b;
this.supportedFields=a
};
opensocial.Environment.prototype.getDomain=function(){return this.domain
};
opensocial.Environment.ObjectType={PERSON:"person",ADDRESS:"address",BODY_TYPE:"bodyType",EMAIL:"email",NAME:"name",ORGANIZATION:"organization",PHONE:"phone",URL:"url",ACTIVITY:"activity",MEDIA_ITEM:"mediaItem",MESSAGE:"message",MESSAGE_TYPE:"messageType",SORT_ORDER:"sortOrder",FILTER_TYPE:"filterType"};
opensocial.Environment.prototype.supportsField=function(a,c){var b=this.supportedFields[a]||[];
return !!b[c]
};;
opensocial.IdSpec=function(a){this.fields_=a||{}
};
opensocial.IdSpec.Field={USER_ID:"userId",GROUP_ID:"groupId",NETWORK_DISTANCE:"networkDistance"};
opensocial.IdSpec.PersonId={OWNER:"OWNER",VIEWER:"VIEWER"};
opensocial.IdSpec.GroupId={SELF:"SELF",FRIENDS:"FRIENDS",ALL:"ALL"};
opensocial.IdSpec.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};
opensocial.IdSpec.prototype.setField=function(a,b){return(this.fields_[a]=b)
};;
opensocial.MediaItem=function(d,b,c){this.fields_={};
if(c){for(var a in c){if(c.hasOwnProperty(a)){this.fields_[a]=c[a]
}}}this.fields_[opensocial.MediaItem.Field.MIME_TYPE]=d;
this.fields_[opensocial.MediaItem.Field.URL]=b
};
opensocial.MediaItem.Type={IMAGE:"image",VIDEO:"video",AUDIO:"audio"};
opensocial.MediaItem.Field={ALBUM_ID:"albumId",CREATED:"created",DESCRIPTION:"description",DURATION:"duration",FILE_SIZE:"fileSize",ID:"id",LANGUAGE:"language",LAST_UPDATED:"lastUpdated",LOCATION:"location",MIME_TYPE:"mimeType",NUM_COMMENTS:"numComments",NUM_VIEWS:"numViews",NUM_VOTES:"numVotes",RATING:"rating",START_TIME:"startTime",TAGGED_PEOPLE:"taggedPeople",TAGS:"tags",THUMBNAIL_URL:"thumbnailUrl",TITLE:"title",TYPE:"type",URL:"url"};
opensocial.MediaItem.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};
opensocial.MediaItem.prototype.setField=function(a,b){return(this.fields_[a]=b)
};;
opensocial.MessageCollection=function(a){this.fields_=a||{}
};
opensocial.MessageCollection.Field={ID:"id",TITLE:"title",TOTAL:"total",UNREAD:"unread",UPDATED:"updated",URLS:"urls"};
opensocial.MessageCollection.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};
opensocial.MessageCollection.prototype.setField=function(a,b){return this.fields_[a]=b
};;
opensocial.Message=function(a,b){if(typeof a=="string"){this.fields_=b||{};
this.fields_[opensocial.Message.Field.BODY]=a
}else{this.fields_=a||{}
}};
opensocial.Message.Field={APP_URL:"appUrl",BODY:"body",BODY_ID:"bodyId",COLLECTION_IDS:"collectionIds",ID:"id",PARENT_ID:"parentId",RECIPIENTS:"recipients",SENDER_ID:"senderId",STATUS:"status",TIME_SENT:"timeSent",TITLE:"title",TITLE_ID:"titleId",TYPE:"type",UPDATED:"updated",URLS:"urls"};
opensocial.Message.Type={EMAIL:"email",NOTIFICATION:"notification",PRIVATE_MESSAGE:"privateMessage",PUBLIC_MESSAGE:"publicMessage"};
opensocial.Message.Status={NEW:"new",DELETED:"deleted",FLAGGED:"flagged"};
opensocial.Message.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};
opensocial.Message.prototype.setField=function(a,b){return(this.fields_[a]=b)
};;
opensocial.Name=function(a){this.fields_=a||{}
};
opensocial.Name.Field={FAMILY_NAME:"familyName",GIVEN_NAME:"givenName",ADDITIONAL_NAME:"additionalName",HONORIFIC_PREFIX:"honorificPrefix",HONORIFIC_SUFFIX:"honorificSuffix",UNSTRUCTURED:"unstructured"};
opensocial.Name.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};;
opensocial.NavigationParameters=function(a){this.fields_=a||{}
};
opensocial.NavigationParameters.Field={VIEW:"view",OWNER:"owner",PARAMETERS:"parameters"};
opensocial.NavigationParameters.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};
opensocial.NavigationParameters.prototype.setField=function(a,b){return(this.fields_[a]=b)
};
opensocial.NavigationParameters.DestinationType={VIEWER_DESTINATION:"viewerDestination",RECIPIENT_DESTINATION:"recipientDestination"};;
opensocial.Organization=function(a){this.fields_=a||{}
};
opensocial.Organization.Field={NAME:"name",TITLE:"title",DESCRIPTION:"description",FIELD:"field",SUB_FIELD:"subField",START_DATE:"startDate",END_DATE:"endDate",SALARY:"salary",ADDRESS:"address",WEBPAGE:"webpage"};
opensocial.Organization.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};;
opensocial.Person=function(a,b,c){this.fields_=a||{};
this.isOwner_=b;
this.isViewer_=c
};
opensocial.Person.Field={ID:"id",NAME:"name",NICKNAME:"nickname",THUMBNAIL_URL:"thumbnailUrl",PROFILE_URL:"profileUrl",CURRENT_LOCATION:"currentLocation",ADDRESSES:"addresses",EMAILS:"emails",PHONE_NUMBERS:"phoneNumbers",ABOUT_ME:"aboutMe",STATUS:"status",PROFILE_SONG:"profileSong",PROFILE_VIDEO:"profileVideo",GENDER:"gender",SEXUAL_ORIENTATION:"sexualOrientation",RELATIONSHIP_STATUS:"relationshipStatus",AGE:"age",DATE_OF_BIRTH:"dateOfBirth",BODY_TYPE:"bodyType",ETHNICITY:"ethnicity",SMOKER:"smoker",DRINKER:"drinker",CHILDREN:"children",PETS:"pets",LIVING_ARRANGEMENT:"livingArrangement",TIME_ZONE:"timeZone",LANGUAGES_SPOKEN:"languagesSpoken",JOBS:"jobs",JOB_INTERESTS:"jobInterests",SCHOOLS:"schools",INTERESTS:"interests",URLS:"urls",MUSIC:"music",MOVIES:"movies",TV_SHOWS:"tvShows",BOOKS:"books",ACTIVITIES:"activities",SPORTS:"sports",HEROES:"heroes",QUOTES:"quotes",CARS:"cars",FOOD:"food",TURN_ONS:"turnOns",TURN_OFFS:"turnOffs",TAGS:"tags",ROMANCE:"romance",SCARED_OF:"scaredOf",HAPPIEST_WHEN:"happiestWhen",FASHION:"fashion",HUMOR:"humor",LOOKING_FOR:"lookingFor",RELIGION:"religion",POLITICAL_VIEWS:"politicalViews",HAS_APP:"hasApp",NETWORK_PRESENCE:"networkPresence"};
opensocial.Person.prototype.getId=function(){return this.getField(opensocial.Person.Field.ID)
};
var ORDERED_NAME_FIELDS_=[opensocial.Name.Field.HONORIFIC_PREFIX,opensocial.Name.Field.GIVEN_NAME,opensocial.Name.Field.FAMILY_NAME,opensocial.Name.Field.HONORIFIC_SUFFIX,opensocial.Name.Field.ADDITIONAL_NAME];
opensocial.Person.prototype.getDisplayName=function(){var b=this.getField(opensocial.Person.Field.NAME);
if(b){var e=b.getField(opensocial.Name.Field.UNSTRUCTURED);
if(e){return e
}var d="";
for(var c=0;
c<ORDERED_NAME_FIELDS_.length;
c++){var a=b.getField(ORDERED_NAME_FIELDS_[c]);
if(a){d+=a+" "
}}return d.replace(/^\s+|\s+$/g,"")
}return this.getField(opensocial.Person.Field.NICKNAME)
};
opensocial.Person.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};
opensocial.Person.prototype.getAppData=function(a){};
opensocial.Person.prototype.isViewer=function(){return !!this.isViewer_
};
opensocial.Person.prototype.isOwner=function(){return !!this.isOwner_
};;
opensocial.Phone=function(a){this.fields_=a||{}
};
opensocial.Phone.Field={TYPE:"type",NUMBER:"number"};
opensocial.Phone.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};;
opensocial.ResponseItem=function(a,c,b,d){this.originalDataRequest_=a;
this.data_=c;
this.errorCode_=b;
this.errorMessage_=d
};
opensocial.ResponseItem.prototype.hadError=function(){return !!this.errorCode_
};
opensocial.ResponseItem.Error={NOT_IMPLEMENTED:"notImplemented",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",BAD_REQUEST:"badRequest",INTERNAL_ERROR:"internalError",LIMIT_EXCEEDED:"limitExceeded"};
opensocial.ResponseItem.prototype.getErrorCode=function(){return this.errorCode_
};
opensocial.ResponseItem.prototype.getErrorMessage=function(){return this.errorMessage_
};
opensocial.ResponseItem.prototype.getOriginalDataRequest=function(){return this.originalDataRequest_
};
opensocial.ResponseItem.prototype.getData=function(){return this.data_
};;
opensocial.Url=function(a){this.fields_=a||{}
};
opensocial.Url.Field={TYPE:"type",LINK_TEXT:"linkText",ADDRESS:"address"};
opensocial.Url.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)
};;

/* [end] feature=opensocial-reference */

/* [start] feature=auth-refresh */
gadgets.rpc.register("update_security_token",function(a){shindig.auth.updateSecurityToken(a)
});;

/* [end] feature=auth-refresh */

/* [start] feature=core.prefs */
(function(){var i=null;
var j={};
var f=gadgets.util.escapeString;
var d={};
var h={};
var e="en";
var b="US";
var a=0;
function c(){var l=gadgets.util.getUrlParameters();
for(var k in l){if(l.hasOwnProperty(k)){if(k.indexOf("up_")===0&&k.length>3){j[k.substr(3)]=String(l[k])
}else{if(k==="country"){b=l[k]
}else{if(k==="lang"){e=l[k]
}else{if(k==="mid"){a=l[k]
}}}}}}}function g(){for(var k in h){if(typeof j[k]==="undefined"){j[k]=h[k]
}}}gadgets.Prefs=function(){if(!i){c();
g();
i=this
}return i
};
gadgets.Prefs.setInternal_=function(n,p){var o=false;
if(typeof n==="string"){if(!j.hasOwnProperty(n)||j[n]!==p){o=true
}j[n]=p
}else{for(var m in n){if(n.hasOwnProperty(m)){var l=n[m];
if(!j.hasOwnProperty(m)||j[m]!==l){o=true
}j[m]=l
}}}return o
};
gadgets.Prefs.setMessages_=function(k){d=k
};
gadgets.Prefs.setDefaultPrefs_=function(k){h=k
};
gadgets.Prefs.prototype.getString=function(k){if(k===".lang"){k="lang"
}return j[k]?f(j[k]):""
};
gadgets.Prefs.prototype.setDontEscape_=function(){f=function(l){return l
}
};
gadgets.Prefs.prototype.getInt=function(k){var l=parseInt(j[k],10);
return isNaN(l)?0:l
};
gadgets.Prefs.prototype.getFloat=function(k){var l=parseFloat(j[k]);
return isNaN(l)?0:l
};
gadgets.Prefs.prototype.getBool=function(k){var l=j[k];
if(l){return l==="true"||l===true||!!parseInt(l,10)
}return false
};
gadgets.Prefs.prototype.set=function(k,l){throw new Error("setprefs feature required to make this call.")
};
gadgets.Prefs.prototype.getArray=function(n){var o=j[n];
if(o){var k=o.split("|");
for(var m=0,l=k.length;
m<l;
++m){k[m]=f(k[m].replace(/%7C/g,"|"))
}return k
}return[]
};
gadgets.Prefs.prototype.setArray=function(k,l){throw new Error("setprefs feature required to make this call.")
};
gadgets.Prefs.prototype.getMsg=function(k){return d[k]||""
};
gadgets.Prefs.prototype.getCountry=function(){return b
};
gadgets.Prefs.prototype.getLang=function(){return e
};
gadgets.Prefs.prototype.getModuleId=function(){return a
}
})();;

/* [end] feature=core.prefs */

/* [start] feature=core.io */
gadgets.io=function(){var config={};
var oauthState;
function makeXhr(){var x;
var wrapperXhr=window.shindig&&window.shindig["xhrwrapper"]&&window.shindig["xhrwrapper"]["createXHR"];
if(wrapperXhr){return wrapperXhr()
}else{if(typeof ActiveXObject!="undefined"){x=new ActiveXObject("Msxml2.XMLHTTP");
if(!x){x=new ActiveXObject("Microsoft.XMLHTTP")
}return x
}else{if(typeof XMLHttpRequest!="undefined"||window.XMLHttpRequest){return new window.XMLHttpRequest()
}else{throw ("no xhr available")
}}}}function hadError(xobj,callback){if(xobj.readyState!==4){return true
}try{if(xobj.status!==200){var error=(""+xobj.status);
if(xobj.responseText){error=error+" "+xobj.responseText
}callback({errors:[error],rc:xobj.status,text:xobj.responseText});
return true
}}catch(e){callback({errors:[e.number+" Error not specified"],rc:e.number,text:e.description});
return true
}return false
}function processNonProxiedResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return
}var data={body:xobj.responseText};
callback(transformResponseData(params,data))
}var UNPARSEABLE_CRUFT="throw 1; < don't be evil' >";
function processResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return
}var txt=xobj.responseText;
var offset=txt.indexOf(UNPARSEABLE_CRUFT)+UNPARSEABLE_CRUFT.length;
if(offset<UNPARSEABLE_CRUFT.length){return
}txt=txt.substr(offset);
var data=eval("("+txt+")");
data=data[url];
if(data.oauthState){oauthState=data.oauthState
}if(data.st){shindig.auth.updateSecurityToken(data.st)
}callback(transformResponseData(params,data))
}function transformResponseData(params,data){var resp={text:data.body,rc:data.rc||200,headers:data.headers,oauthApprovalUrl:data.oauthApprovalUrl,oauthError:data.oauthError,oauthErrorText:data.oauthErrorText,errors:[]};
if(resp.rc<200||resp.rc>=400){resp.errors=[resp.rc+" Error"]
}else{if(resp.text){if(resp.rc>=300&&resp.rc<400){params.CONTENT_TYPE="TEXT"
}switch(params.CONTENT_TYPE){case"JSON":case"FEED":resp.data=gadgets.json.parse(resp.text);
if(!resp.data){resp.errors.push("500 Failed to parse JSON");
resp.rc=500;
resp.data=null
}break;
case"DOM":var dom;
if(typeof ActiveXObject!="undefined"){dom=new ActiveXObject("Microsoft.XMLDOM");
dom.async=false;
dom.validateOnParse=false;
dom.resolveExternals=false;
if(!dom.loadXML(resp.text)){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}else{var parser=new DOMParser();
dom=parser.parseFromString(resp.text,"text/xml");
if("parsererror"===dom.documentElement.nodeName){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}break;
default:resp.data=resp.text;
break
}}}return resp
}function makeXhrRequest(realUrl,proxyUrl,callback,paramData,method,params,processResponseFunction,opt_headers){var xhr=makeXhr();
if(proxyUrl.indexOf("//")==0){proxyUrl=document.location.protocol+proxyUrl
}xhr.open(method,proxyUrl,true);
if(callback){xhr.onreadystatechange=gadgets.util.makeClosure(null,processResponseFunction,realUrl,callback,params,xhr)
}if(paramData!==null){var contentTypeHeader="Content-Type";
var contentType="application/x-www-form-urlencoded";
if(typeof opt_headers==="string"){contentType=opt_headers;
opt_headers={}
}var headers=opt_headers||{};
if(!headers[contentTypeHeader]){headers[contentTypeHeader]=contentType
}for(var headerName in headers){xhr.setRequestHeader(headerName,headers[headerName])
}}xhr.send(paramData)
}function respondWithPreload(postData,params,callback){if(gadgets.io.preloaded_&&postData.httpMethod==="GET"){for(var i=0;
i<gadgets.io.preloaded_.length;
i++){var preload=gadgets.io.preloaded_[i];
if(preload&&(preload.id===postData.url)){delete gadgets.io.preloaded_[i];
if(preload.rc!==200){callback({rc:preload.rc,errors:[preload.rc+" Error"]})
}else{if(preload.oauthState){oauthState=preload.oauthState
}var resp={body:preload.body,rc:preload.rc,headers:preload.headers,oauthApprovalUrl:preload.oauthApprovalUrl,oauthError:preload.oauthError,oauthErrorText:preload.oauthErrorText,errors:[]};
callback(transformResponseData(params,resp))
}return true
}}}return false
}function init(configuration){config=configuration["core.io"]||{}
}gadgets.config.register("core.io",null,init);
return{makeRequest:function(url,callback,opt_params){var params=opt_params||{};
var httpMethod=params.METHOD||"GET";
var refreshInterval=params.REFRESH_INTERVAL;
var auth,st;
if(params.AUTHORIZATION&&params.AUTHORIZATION!=="NONE"){auth=params.AUTHORIZATION.toLowerCase();
st=shindig.auth.getSecurityToken()
}else{if(httpMethod==="GET"&&refreshInterval===undefined){refreshInterval=3600
}}var signOwner=true;
if(typeof params.OWNER_SIGNED!=="undefined"){signOwner=params.OWNER_SIGNED
}var signViewer=true;
if(typeof params.VIEWER_SIGNED!=="undefined"){signViewer=params.VIEWER_SIGNED
}var headers=params.HEADERS||{};
if(httpMethod==="POST"&&!headers["Content-Type"]){headers["Content-Type"]="application/x-www-form-urlencoded"
}var urlParams=gadgets.util.getUrlParameters();
var paramData={url:url,httpMethod:httpMethod,headers:gadgets.io.encodeValues(headers,false),postData:params.POST_DATA||"",authz:auth||"",st:st||"",contentType:params.CONTENT_TYPE||"TEXT",numEntries:params.NUM_ENTRIES||"3",getSummaries:!!params.GET_SUMMARIES,signOwner:signOwner,signViewer:signViewer,gadget:urlParams.url,container:urlParams.container||urlParams.synd||"default",bypassSpecCache:gadgets.util.getUrlParameters()["nocache"]||"",getFullHeaders:!!params.GET_FULL_HEADERS};
if(auth==="oauth"||auth==="signed"){if(gadgets.io.oauthReceivedCallbackUrl_){paramData.OAUTH_RECEIVED_CALLBACK=gadgets.io.oauthReceivedCallbackUrl_;
gadgets.io.oauthReceivedCallbackUrl_=null
}paramData.oauthState=oauthState||"";
for(var opt in params){if(params.hasOwnProperty(opt)){if(opt.indexOf("OAUTH_")===0){paramData[opt]=params[opt]
}}}}var proxyUrl=config.jsonProxyUrl.replace("%host%",document.location.host);
if(!respondWithPreload(paramData,params,callback)){if(httpMethod==="GET"&&refreshInterval>0){var extraparams="?refresh="+refreshInterval+"&"+gadgets.io.encodeValues(paramData);
makeXhrRequest(url,proxyUrl+extraparams,callback,null,"GET",params,processResponse)
}else{makeXhrRequest(url,proxyUrl,callback,gadgets.io.encodeValues(paramData),"POST",params,processResponse)
}}},makeNonProxiedRequest:function(relativeUrl,callback,opt_params,opt_headers){var params=opt_params||{};
makeXhrRequest(relativeUrl,relativeUrl,callback,params.POST_DATA,params.METHOD,params,processNonProxiedResponse,opt_headers)
},clearOAuthState:function(){oauthState=undefined
},encodeValues:function(fields,opt_noEscaping){var escape=!opt_noEscaping;
var buf=[];
var first=false;
for(var i in fields){if(fields.hasOwnProperty(i)&&!/___$/.test(i)){if(!first){first=true
}else{buf.push("&")
}buf.push(escape?encodeURIComponent(String(i)):i);
buf.push("=");
buf.push(escape?encodeURIComponent(String(fields[i])):fields[i])
}}return buf.join("")
},getProxyUrl:function(url,opt_params){var params=opt_params||{};
var refresh=params.REFRESH_INTERVAL;
if(refresh===undefined){refresh="3600"
}var urlParams=gadgets.util.getUrlParameters();
var rewriteMimeParam=params.rewriteMime?"&rewriteMime="+encodeURIComponent(String(params.rewriteMime)):"";
var ret=config.proxyUrl.replace("%url%",encodeURIComponent(url)).replace("%host%",document.location.host).replace("%rawurl%",url).replace("%refresh%",encodeURIComponent(String(refresh))).replace("%gadget%",encodeURIComponent(urlParams.url)).replace("%container%",encodeURIComponent(urlParams.container||urlParams.synd||"default")).replace("%rewriteMime%",rewriteMimeParam);
if(ret.indexOf("//")==0){ret=window.location.protocol+ret
}return ret
}}
}();
gadgets.io.RequestParameters=gadgets.util.makeEnum(["METHOD","CONTENT_TYPE","POST_DATA","HEADERS","AUTHORIZATION","NUM_ENTRIES","GET_SUMMARIES","GET_FULL_HEADERS","REFRESH_INTERVAL","OAUTH_SERVICE_NAME","OAUTH_USE_TOKEN","OAUTH_TOKEN_NAME","OAUTH_REQUEST_TOKEN","OAUTH_REQUEST_TOKEN_SECRET","OAUTH_RECEIVED_CALLBACK"]);
gadgets.io.MethodType=gadgets.util.makeEnum(["GET","POST","PUT","DELETE","HEAD"]);
gadgets.io.ContentType=gadgets.util.makeEnum(["TEXT","DOM","JSON","FEED"]);
gadgets.io.AuthorizationType=gadgets.util.makeEnum(["NONE","SIGNED","OAUTH"]);;

/* [end] feature=core.io */

/* [start] feature=opensocial-base */
window.FieldTranslations=(function(){function b(c){if(c){c.key=c.value
}}function a(c){if(c){c.address=c.value
}}return{translateEnumJson:b,translateUrlJson:a,translateServerPersonToJsPerson:function(l,d){if(l.emails){for(var g=0;
g<l.emails.length;
g++){l.emails[g].address=l.emails[g].value
}}if(l.phoneNumbers){for(var c=0;
c<l.phoneNumbers.length;
c++){l.phoneNumbers[c].number=l.phoneNumbers[c].value
}}if(l.birthday){l.dateOfBirth=l.birthday
}if(l.utcOffset){l.timeZone=l.utcOffset
}if(l.addresses){for(var f=0;
f<l.addresses.length;
f++){l.addresses[f].unstructuredAddress=l.addresses[f].formatted
}}if(l.gender){var h=l.gender=="male"?"MALE":(l.gender=="female")?"FEMALE":null;
l.gender={key:h,displayValue:l.gender}
}a(l.profileSong);
a(l.profileVideo);
if(l.urls){for(var k=0;
k<l.urls.length;
k++){a(l.urls[k])
}}b(l.drinker);
b(l.lookingFor);
b(l.networkPresence);
b(l.smoker);
if(l.organizations){l.jobs=[];
l.schools=[];
for(var e=0;
e<l.organizations.length;
e++){var m=l.organizations[e];
if(m.type=="job"){l.jobs.push(m)
}else{if(m.type=="school"){l.schools.push(m)
}}}}if(l.name){l.name.unstructured=l.name.formatted
}if(l.appData){l.appData=opensocial.Container.escape(l.appData,d,true)
}},translateJsPersonFieldsToServerFields:function(c){for(var d=0;
d<c.length;
d++){if(c[d]=="dateOfBirth"){c[d]="birthday"
}else{if(c[d]=="timeZone"){c[d]="utcOffset"
}else{if(c[d]=="jobs"){c[d]="organizations"
}else{if(c[d]=="schools"){c[d]="organizations"
}}}}}c.push("id");
c.push("displayName")
},translateIsoStringToDate:function(c){var f="([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
var i=c.match(new RegExp(f));
var h=0;
var e=new Date(i[1],0,1);
if(i[3]){e.setMonth(i[3]-1)
}if(i[5]){e.setDate(i[5])
}if(i[7]){e.setHours(i[7])
}if(i[8]){e.setMinutes(i[8])
}if(i[10]){e.setSeconds(i[10])
}if(i[12]){e.setMilliseconds(Number("0."+i[12])*1000)
}if(i[14]){h=(Number(i[16])*60)+Number(i[17]);
h*=((i[15]=="-")?1:-1)
}h-=e.getTimezoneOffset();
var g=(Number(e)+(h*60*1000));
return new Date(Number(g))
},addAppDataAsProfileFields:function(f){if(f){if(f.appData){var c=f.appData;
if(typeof c==="string"){c=[c]
}var e=f.profileDetail||[];
for(var d=0;
d<c.length;
d++){if(c[d]==="*"){e.push("appData")
}else{e.push("appData."+c[d])
}}f.appData=c
}}},translateStandardArguments:function(d,c){if(d.first){c.startIndex=d.first
}if(d.max){c.count=d.max
}if(d.sortOrder){c.sortBy=d.sortOrder
}if(d.filter){c.filterBy=d.filter
}if(d.filterOp){c.filterOp=d.filterOp
}if(d.filterValue){c.filterValue=d.filterValue
}if(d.fields){c.fields=d.fields
}},translateNetworkDistance:function(c,d){if(c.getField("networkDistance")){d.networkDistance=c.getField("networkDistance")
}}}
})();;
var JsonMediaItem=function(a){a=a||{};
opensocial.MediaItem.call(this,a.mimeType,a.url,a)
};
JsonMediaItem.inherits(opensocial.MediaItem);
JsonMediaItem.prototype.toJsonObject=function(){return JsonMediaItem.copyFields(this.fields_)
};
JsonMediaItem.copyFields=function(a){var b={};
for(var c in a){b[c]=a[c]
}return b
};;
var JsonAlbum=function(a){a=a||{};
JsonAlbum.constructObject(a,"location",opensocial.Address);
opensocial.Album.call(this,a)
};
JsonAlbum.inherits(opensocial.Album);
JsonAlbum.prototype.toJsonObject=function(){return JsonAlbum.copyFields(this.fields_)
};
JsonAlbum.constructObject=function(c,d,a){var b=c[d];
if(b){c[d]=new a(b)
}};
JsonAlbum.copyFields=function(a){var b={};
for(var c in a){b[c]=a[c]
}return b
};;
var JsonActivity=function(a,b){a=a||{};
if(!b){JsonActivity.constructArrayObject(a,"mediaItems",JsonMediaItem)
}opensocial.Activity.call(this,a)
};
JsonActivity.inherits(opensocial.Activity);
JsonActivity.prototype.toJsonObject=function(){var c=JsonActivity.copyFields(this.fields_);
var d=c.mediaItems||[];
var a=[];
for(var b=0;
b<d.length;
b++){a[b]=d[b].toJsonObject()
}c.mediaItems=a;
return c
};
JsonActivity.constructArrayObject=function(d,e,b){var c=d[e];
if(c){for(var a=0;
a<c.length;
a++){c[a]=new b(c[a])
}}};
JsonActivity.copyFields=function(a){var b={};
for(var c in a){b[c]=a[c]
}return b
};;
var JsonPerson=function(a){a=a||{};
JsonPerson.constructObject(a,"bodyType",opensocial.BodyType);
JsonPerson.constructObject(a,"currentLocation",opensocial.Address);
JsonPerson.constructObject(a,"name",opensocial.Name);
JsonPerson.constructObject(a,"profileSong",opensocial.Url);
JsonPerson.constructObject(a,"profileVideo",opensocial.Url);
JsonPerson.constructDate(a,"dateOfBirth");
JsonPerson.constructArrayObject(a,"addresses",opensocial.Address);
JsonPerson.constructArrayObject(a,"emails",opensocial.Email);
JsonPerson.constructArrayObject(a,"jobs",opensocial.Organization);
JsonPerson.constructArrayObject(a,"phoneNumbers",opensocial.Phone);
JsonPerson.constructArrayObject(a,"schools",opensocial.Organization);
JsonPerson.constructArrayObject(a,"urls",opensocial.Url);
JsonPerson.constructEnum(a,"gender");
JsonPerson.constructEnum(a,"smoker");
JsonPerson.constructEnum(a,"drinker");
JsonPerson.constructEnum(a,"networkPresence");
JsonPerson.constructEnumArray(a,"lookingFor");
opensocial.Person.call(this,a,a.isOwner,a.isViewer)
};
JsonPerson.inherits(opensocial.Person);
JsonPerson.constructEnum=function(b,c){var a=b[c];
if(a){b[c]=new opensocial.Enum(a.key,a.displayValue)
}};
JsonPerson.constructEnumArray=function(c,d){var b=c[d];
if(b){for(var a=0;
a<b.length;
a++){b[a]=new opensocial.Enum(b[a].key,b[a].displayValue)
}}};
JsonPerson.constructObject=function(c,d,a){var b=c[d];
if(b){c[d]=new a(b)
}};
JsonPerson.constructDate=function(b,c){var a=b[c];
if(a){b[c]=FieldTranslations.translateIsoStringToDate(a)
}};
JsonPerson.constructArrayObject=function(d,e,b){var c=d[e];
if(c){for(var a=0;
a<c.length;
a++){c[a]=new b(c[a])
}}};
JsonPerson.prototype.getDisplayName=function(){return this.getField("displayName")
};
JsonPerson.prototype.getAppData=function(b){var a=this.getField("appData");
return a&&a[b]
};;
var JsonMessageCollection=function(a){a=a||{};
opensocial.MessageCollection.call(this,a)
};
JsonMessageCollection.inherits(opensocial.MessageCollection);
JsonMessageCollection.prototype.toJsonObject=function(){return JsonMessageCollection.copyFields(this.fields_)
};
JsonMessageCollection.copyFields=function(a){var b={};
for(var c in a){b[c]=a[c]
}return b
};;
var JsonMessage=function(a,b){b=b||{};
opensocial.Message.call(this,a,b)
};
JsonMessage.inherits(opensocial.Message);
JsonMessage.prototype.toJsonObject=function(){return JsonMessage.copyFields(this.fields_)
};
JsonMessage.copyFields=function(a){var b={};
for(var c in a){b[c]=a[c]
}return b
};;

/* [end] feature=opensocial-base */

/* [start] feature=opensocial-jsonrpc */
var JsonRpcContainer=function(c){opensocial.Container.call(this);
var h=c.path;
this.path_=h.replace("%host%",document.location.host);
var f=c.invalidatePath;
this.invalidatePath_=f.replace("%host%",document.location.host);
var g=c.supportedFields;
var e={};
for(var b in g){if(g.hasOwnProperty(b)){e[b]={};
for(var d=0;
d<g[b].length;
d++){var a=g[b][d];
e[b][a]=true
}}}this.environment_=new opensocial.Environment(c.domain,e);
this.useOAuth2=c.useOAuth2;
this.securityToken_=shindig.auth.getSecurityToken();
gadgets.rpc.register("shindig.requestShareApp_callback",JsonRpcContainer.requestShareAppCallback_)
};
var JsonRpcRequestItem=function(b,a){this.rpc=b;
this.processData=a||function(c){return c
};
this.processResponse=function(c,f,e,d){var g=e?JsonRpcContainer.translateHttpError(e.code):null;
return new opensocial.ResponseItem(c,e?null:this.processData(f),g,d)
}
};
(function(){var a={};
JsonRpcContainer.inherits(opensocial.Container);
JsonRpcContainer.prototype.getEnvironment=function(){return this.environment_
};
JsonRpcContainer.prototype.requestShareApp=function(f,h,c,d){var e="cId_"+Math.random();
a[e]=c;
var b=gadgets.util.unescapeString(h.getField(opensocial.Message.Field.BODY));
if(!b||b.length===0){var g=gadgets.util.unescapeString(h.getField(opensocial.Message.Field.BODY_ID));
b=gadgets.Prefs.getMsg(g)
}gadgets.rpc.call("..","shindig.requestShareApp",null,e,f,b)
};
JsonRpcContainer.requestShareAppCallback_=function(f,g,c,e){callback=a[f];
if(callback){a[f]=null;
var d=null;
if(e){d={recipientIds:e}
}var b=new opensocial.ResponseItem(null,d,c);
callback(b)
}};
JsonRpcContainer.prototype.requestCreateActivity=function(e,c,b){b=b||function(){};
var d=opensocial.newDataRequest();
var f=opensocial.newIdSpec({userId:"VIEWER"});
d.add(this.newCreateActivityRequest(f,e),"key");
d.send(function(g){b(g.get("key"))
})
};
JsonRpcContainer.prototype.requestData=function(h,m){m=m||function(){};
var f=h.getRequestObjects();
var k=f.length;
if(k===0){window.setTimeout(function(){m(new opensocial.DataResponse({},true))
},0);
return
}var n=new Array(k);
for(var g=0;
g<k;
g++){var l=f[g];
n[g]=l.request.rpc;
if(l.key){n[g].id=l.key
}}var c=function(y){if(y.errors[0]){JsonRpcContainer.generateErrorResponse(y,f,m);
return
}y=y.result||y.data;
var o=false;
var x={};
for(var s=0;
s<y.length;
s++){y[y[s].id]=y[s]
}for(var p=0;
p<f.length;
p++){var r=f[p];
var q=y[p];
if(r.key&&q.id!==r.key){throw"Request key("+r.key+") and response id("+q.id+") do not match"
}var j=q.result||q.data;
var v=q.error;
var u="";
if(v){u=v.message
}var t=r.request.processResponse(r.request,j,v,u);
o=o||t.hadError();
if(r.key){x[r.key]=t
}}var w=new opensocial.DataResponse(x,o);
m(w)
};
var i={CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED",POST_DATA:gadgets.json.stringify(n)};
var d={"Content-Type":"application/json"};
var b=[this.path_];
var e=shindig.auth.getSecurityToken();
if(e){if(this.useOAuth2){d.Authorization="OAuth2 "+e
}else{b.push("?st=",encodeURIComponent(e))
}}this.sendRequest(b.join(""),c,i,d)
};
JsonRpcContainer.prototype.sendRequest=function(b,e,d,c){gadgets.io.makeNonProxiedRequest(b,e,d,c)
};
JsonRpcContainer.generateErrorResponse=function(b,e,g){var c=JsonRpcContainer.translateHttpError(b.rc||b.result.error||b.data.error)||opensocial.ResponseItem.Error.INTERNAL_ERROR;
var f={};
for(var d=0;
d<e.length;
d++){f[e[d].key]=new opensocial.ResponseItem(e[d].request,null,c)
}g(new opensocial.DataResponse(f,true))
};
JsonRpcContainer.translateHttpError=function(b){if(b==501){return opensocial.ResponseItem.Error.NOT_IMPLEMENTED
}else{if(b==401){return opensocial.ResponseItem.Error.UNAUTHORIZED
}else{if(b==403){return opensocial.ResponseItem.Error.FORBIDDEN
}else{if(b==400){return opensocial.ResponseItem.Error.BAD_REQUEST
}else{if(b==500){return opensocial.ResponseItem.Error.INTERNAL_ERROR
}else{if(b==404){return opensocial.ResponseItem.Error.BAD_REQUEST
}else{if(b==417){return opensocial.ResponseItem.Error.LIMIT_EXCEEDED
}}}}}}}};
JsonRpcContainer.prototype.makeIdSpec=function(b){return opensocial.newIdSpec({userId:b})
};
JsonRpcContainer.prototype.translateIdSpec=function(b){var e=b.getField("userId");
var d=b.getField("groupId");
if(!opensocial.Container.isArray(e)){e=[e]
}for(var c=0;
c<e.length;
c++){if(e[c]==="OWNER"){e[c]="@owner"
}else{if(e[c]==="VIEWER"){e[c]="@viewer"
}}}if(d==="FRIENDS"){d="@friends"
}else{if(d=="ALL"){d="@all"
}else{if(d==="SELF"||!d){d="@self"
}}}return{userId:e,groupId:d}
};
JsonRpcContainer.prototype.newFetchPersonRequest=function(e,d){var b=this.newFetchPeopleRequest(this.makeIdSpec(e),d);
var c=this;
return new JsonRpcRequestItem(b.rpc,function(f){return c.createPersonFromJson(f,d)
})
};
JsonRpcContainer.prototype.newFetchPeopleRequest=function(b,d){var e={method:"people.get"};
e.params=this.translateIdSpec(b);
FieldTranslations.addAppDataAsProfileFields(d);
FieldTranslations.translateStandardArguments(d,e.params);
FieldTranslations.translateNetworkDistance(b,e.params);
if(d.profileDetail){FieldTranslations.translateJsPersonFieldsToServerFields(d.profileDetail);
e.params.fields=d.profileDetail
}var c=this;
return new JsonRpcRequestItem(e,function(j){var h;
if(j.list){h=j.list
}else{h=[j]
}var g=[];
for(var f=0;
f<h.length;
f++){g.push(c.createPersonFromJson(h[f],d))
}return new opensocial.Collection(g,j.startIndex,j.totalResults)
})
};
JsonRpcContainer.prototype.createPersonFromJson=function(b,c){FieldTranslations.translateServerPersonToJsPerson(b,c);
return new JsonPerson(b)
};
JsonRpcContainer.prototype.getFieldsList=function(b){if(this.hasNoKeys(b)||this.isWildcardKey(b[0])){return[]
}else{return b
}};
JsonRpcContainer.prototype.hasNoKeys=function(b){return !b||b.length===0
};
JsonRpcContainer.prototype.isWildcardKey=function(b){return b==="*"
};
JsonRpcContainer.prototype.newFetchPersonAppDataRequest=function(b,d,c){var e={method:"appdata.get"};
e.params=this.translateIdSpec(b);
e.params.appId="@app";
e.params.fields=this.getFieldsList(d);
FieldTranslations.translateNetworkDistance(b,e.params);
return new JsonRpcRequestItem(e,function(f){return opensocial.Container.escape(f,c,true)
})
};
JsonRpcContainer.prototype.newUpdatePersonAppDataRequest=function(b,c){var d={method:"appdata.update"};
d.params={userId:["@viewer"],groupId:"@self"};
d.params.appId="@app";
d.params.data={};
d.params.data[b]=c;
d.params.fields=b;
return new JsonRpcRequestItem(d)
};
JsonRpcContainer.prototype.newRemovePersonAppDataRequest=function(b){var c={method:"appdata.delete"};
c.params={userId:["@viewer"],groupId:"@self"};
c.params.appId="@app";
c.params.fields=this.getFieldsList(b);
return new JsonRpcRequestItem(c)
};
JsonRpcContainer.prototype.newFetchActivitiesRequest=function(b,c){var d={method:"activities.get"};
d.params=this.translateIdSpec(b);
d.params.appId="@app";
FieldTranslations.translateStandardArguments(c,d.params);
FieldTranslations.translateNetworkDistance(b,d.params);
return new JsonRpcRequestItem(d,function(f){f=f.list;
var g=[];
for(var e=0;
e<f.length;
e++){g.push(new JsonActivity(f[e]))
}return new opensocial.Collection(g)
})
};
JsonRpcContainer.prototype.newActivity=function(b){return new JsonActivity(b,true)
};
JsonRpcContainer.prototype.newAlbum=function(b){return new JsonAlbum(b)
};
JsonRpcContainer.prototype.newMediaItem=function(d,b,c){c=c||{};
c.mimeType=d;
c.url=b;
return new JsonMediaItem(c)
};
JsonRpcContainer.prototype.newCreateActivityRequest=function(b,c){var d={method:"activities.create"};
d.params=this.translateIdSpec(b);
d.params.appId="@app";
FieldTranslations.translateNetworkDistance(b,d.params);
d.params.activity=c.toJsonObject();
return new JsonRpcRequestItem(d)
};
JsonRpcContainer.prototype.invalidateCache=function(){var g={method:"cache.invalidate"};
var c={invalidationKeys:["@viewer"]};
g.params=c;
var e={CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED",POST_DATA:gadgets.json.stringify(g)};
var f={"Content-Type":"application/json"};
var b=[this.invalidatePath_];
var d=shindig.auth.getSecurityToken();
if(d){if(this.useOAuth2){f.Authorization="OAuth2 "+d
}else{b.push("?st=",encodeURIComponent(d))
}}this.sendRequest(b.join(""),null,e,f)
}
})();
JsonRpcContainer.prototype.newMessage=function(a,b){return new JsonMessage(a,b)
};
JsonRpcContainer.prototype.newMessageCollection=function(a){return new JsonMessageCollection(a)
};
JsonRpcContainer.prototype.newFetchMessageCollectionsRequest=function(a,b){var c={method:"messages.get"};
c.params=this.translateIdSpec(a);
return new JsonRpcRequestItem(c,function(e){e=e.list;
var f=[];
for(var d=0;
d<e.length;
d++){f.push(new JsonMessageCollection(e[d]))
}return new opensocial.Collection(f)
})
};
JsonRpcContainer.prototype.newFetchMessagesRequest=function(a,c,b){var d={method:"messages.get"};
d.params=this.translateIdSpec(a);
d.params.msgCollId=c;
return new JsonRpcRequestItem(d,function(g){g=g.list;
var f=[];
for(var e=0;
e<g.length;
e++){f.push(new JsonMessage(g[e]))
}return new opensocial.Collection(f)
})
};
JsonRpcContainer.prototype.newCreateAlbumRequest=function(b,a){var c={method:"albums.create"};
c.params=this.translateIdSpec(b);
c.params.appId="@app";
c.params.album=a.toJsonObject();
return new JsonRpcRequestItem(c)
};
JsonRpcContainer.prototype.newDeleteAlbumRequest=function(a,b){var c={method:"albums.delete"};
c.params=this.translateIdSpec(a);
c.params.appId="@app";
c.params.albumId=b;
return new JsonRpcRequestItem(c)
};
JsonRpcContainer.prototype.newFetchAlbumsRequest=function(a,b){var c={method:"albums.get"};
c.params=this.translateIdSpec(a);
c.params.appId="@app";
return new JsonRpcRequestItem(c,function(f){f=f.list;
var d=[];
for(var e=0;
e<f.length;
e++){d.push(new JsonAlbum(f[e]))
}return new opensocial.Collection(d)
})
};
JsonRpcContainer.prototype.newCreateMediaItemRequest=function(a,c,b){var d={method:"mediaItems.create"};
d.params=this.translateIdSpec(a);
d.params.appId="@app";
d.params.albumId=c;
d.params.mediaItem=b.toJsonObject();
return new JsonRpcRequestItem(d)
};
JsonRpcContainer.prototype.newFetchMediaItemsRequest=function(a,b,c){var d={method:"mediaItems.get"};
d.params=this.translateIdSpec(a);
d.params.appId="@app";
d.params.albumId=b;
return new JsonRpcRequestItem(d,function(g){g=g.list;
var f=[];
for(var e=0;
e<g.length;
e++){f.push(new JsonMediaItem(g[e]))
}return new opensocial.Collection(f)
})
};;

/* [end] feature=opensocial-jsonrpc */

/* [start] feature=opensocial */

      var requiredConfig = {
        "path": gadgets.config.NonEmptyStringValidator,
        "domain": gadgets.config.NonEmptyStringValidator,
        "supportedFields": gadgets.config.ExistsValidator,
        "invalidatePath": gadgets.config.ExistsValidator
      };

      gadgets.config.register("opensocial", requiredConfig,
        function(config) {
          var configParams = config["opensocial"];
          opensocial.Container.setContainer(new JsonRpcContainer(configParams));
          if (window['caja']) {
            opensocial.Container.get().enableCaja();
          }
      });
    ;

/* [end] feature=opensocial */

/* [start] feature=core.legacy */
var JSON=window.JSON||gadgets.json;
var _IG_Prefs=(function(){var a=null;
var b=function(){if(!a){a=new gadgets.Prefs();
a.setDontEscape_()
}return a
};
b._parseURL=gadgets.Prefs.parseUrl;
return b
})();
function _IG_Fetch_wrapper(b,a){b(a.data?a.data:"")
}function _IG_FetchContent(b,g,c){var f=c||{};
if(f.refreshInterval){f.REFRESH_INTERVAL=f.refreshInterval
}else{f.REFRESH_INTERVAL=3600
}for(var e in f){var d=f[e];
delete f[e];
f[e.toUpperCase()]=d
}var a=gadgets.util.makeClosure(null,_IG_Fetch_wrapper,g);
gadgets.io.makeRequest(b,a,f)
}function _IG_FetchXmlContent(b,e,c){var d=c||{};
if(d.refreshInterval){d.REFRESH_INTERVAL=d.refreshInterval
}else{d.REFRESH_INTERVAL=3600
}d.CONTENT_TYPE="DOM";
var a=gadgets.util.makeClosure(null,_IG_Fetch_wrapper,e);
gadgets.io.makeRequest(b,a,d)
}function _IG_FetchFeedAsJSON(b,f,c,a,d){var e=d||{};
e.CONTENT_TYPE="FEED";
e.NUM_ENTRIES=c;
e.GET_SUMMARIES=a;
gadgets.io.makeRequest(b,function(j){j.data=j.data||{};
if(j.errors&&j.errors.length>0){j.data.ErrorMsg=j.errors[0]
}if(j.data.link){j.data.URL=b
}if(j.data.title){j.data.Title=j.data.title
}if(j.data.description){j.data.Description=j.data.description
}if(j.data.link){j.data.Link=j.data.link
}if(j.data.items&&j.data.items.length>0){j.data.Entry=j.data.items;
for(var h=0;
h<j.data.Entry.length;
++h){var i=j.data.Entry[h];
i.Title=i.title;
i.Link=i.link;
i.Summary=i.summary||i.description;
i.Date=i.pubDate
}}for(var g=0;
g<j.data.Entry.length;
++g){var i=j.data.Entry[g];
i.Date=(i.Date/1000)
}f(j.data)
},e)
}function _IG_GetCachedUrl(a,b){var c=b||{};
c.REFRESH_INTERVAL=3600;
if(c.refreshInterval){c.REFRESH_INTERVAL=c.refreshInterval
}return gadgets.io.getProxyUrl(a,c)
}function _IG_GetImageUrl(a,b){return _IG_GetCachedUrl(a,b)
}function _IG_GetImage(b){var a=document.createElement("img");
a.src=_IG_GetCachedUrl(b);
return a
}function _IG_RegisterOnloadHandler(a){gadgets.util.registerOnLoadHandler(a)
}function _IG_Callback(b,c){var a=arguments;
return function(){var d=Array.prototype.slice.call(arguments);
b.apply(null,d.concat(Array.prototype.slice.call(a,1)))
}
}var _args=gadgets.util.getUrlParameters;
function _gel(a){return document.getElementById?document.getElementById(a):null
}function _gelstn(a){if(a==="*"&&document.all){return document.all
}return document.getElementsByTagName?document.getElementsByTagName(a):[]
}function _gelsbyregex(d,f){var c=_gelstn(d);
var e=[];
for(var b=0,a=c.length;
b<a;
++b){if(f.test(c[b].id)){e.push(c[b])
}}return e
}function _esc(a){return window.encodeURIComponent?encodeURIComponent(a):escape(a)
}function _unesc(a){return window.decodeURIComponent?decodeURIComponent(a):unescape(a)
}function _hesc(a){return gadgets.util.escapeString(a)
}function _striptags(a){return a.replace(/<\/?[^>]+>/g,"")
}function _trim(a){return a.replace(/^\s+|\s+$/g,"")
}function _toggle(a){a=(typeof a==="string")?_gel(a):a;
if(a!==null){if(a.style.display.length===0||a.style.display==="block"){a.style.display="none"
}else{if(a.style.display==="none"){a.style.display="block"
}}}}var _uid=(function(){var a=0;
return function(){return a++
}
})();
function _min(d,c){return(d<c?d:c)
}function _max(d,c){return(d>c?d:c)
}function _exportSymbols(a,c){var m=window;
var f=a.split(".");
for(var h=0,g=f.length;
h<g;
h++){var b=f[h];
m[b]=m[b]||{};
m=m[b]
}for(var e=0,d=c.length;
e<d;
e+=2){m[c[e]]=c[e+1]
}}function _IG_AddDOMEventHandler(c,b,a){gadgets.warn("_IG_AddDOMEventHandler not implemented - see SHINDIG-198")
};;

/* [end] feature=core.legacy */

/* [start] feature=core.tracking */
(function(){function e(b,c,a){b={msg:b||"",line:a||0,jsUrl:0==window.location.href.indexOf(c)?"-top-":c,fullUrl:window.location};try{if(++window._varz_numerrors,gadgets&&!(3<f)){c={};c[gadgets.io.RequestParameters.METHOD]=gadgets.io.MethodType.GET;a=encodeURIComponent||escape;var d=gadgets.util.getUrlParameters(),e=d.container||d.synd,g=d.gadget||d.url,k=["/gadgets/evthdlr?t=err&gadget=",a(g),"&container=",a(e),"&jsurl=",a(b.jsUrl),"&line=",a(b.line),"&session=",h,"&count=",f,"&msg=",a(b.msg)];gadgets.io.makeNonProxiedRequest(k.join(""),
null,c);f++}}catch(l){}}window._varz_numerrors=0;var h=(new Date).getTime(),f=0;-1==window.location.href.indexOf("&debug=1")&&-1==window.location.href.indexOf("?debug=1")&&(window.onerror=e)})();
;

/* [end] feature=core.tracking */

/* [start] feature=core */
(function(){var l=null,p=function(){function e(a){a=(""+a).match(E);return!a?l:new b(q(a[1]),q(a[2]),q(a[3]),q(a[4]),q(a[5]),q(a[6]),q(a[7]))}function z(a,e){return"string"==typeof a?encodeURI(a).replace(e,B):l}function B(a){a=a.charCodeAt(0);return"%"+"0123456789ABCDEF".charAt(a>>4&15)+"0123456789ABCDEF".charAt(a&15)}function y(a){if(a===l)return l;for(var a=a.replace(/(^|\/)\.(?:\/|$)/g,"$1").replace(/\/{2,}/g,"/"),e=m,b;(b=a.replace(e,"$1"))!=a;a=b);return a}function A(a,e){var b=a.R(),g=e.K();g?b.fa(e.j):
g=e.V();g?b.ca(e.m):g=e.W();g?b.da(e.k):g=e.Y();var m=e.g,k=y(m);if(g)b.ba(e.T()),k=k&&k.replace(x,"");else if(g=!!m){if(47!==k.charCodeAt(0))var k=y(b.g||"").replace(x,""),s=k.lastIndexOf("/")+1,k=y((s?k.substring(0,s):"")+y(m)).replace(x,"")}else k=k&&k.replace(x,""),k!==m&&b.G(k);g?b.G(k):g=e.Z();g?b.M(e.l):g=e.X();g&&b.ea(e.n);return b}function b(a,e,b,g,m,k,s){this.j=a;this.m=e;this.k=b;this.h=g;this.g=m;this.l=k;this.n=s}function q(a){return"string"==typeof a&&0<a.length?a:l}var m=RegExp(/(\/|^)(?:[^./][^/]*|\.{2,}(?:[^./][^/]*)|\.{3,}[^/]*)\/\.\.(?:\/|$)/),
x=/^(?:\.\.\/)*(?:\.\.$)?/;b.prototype.toString=function(){var a=[];l!==this.j&&a.push(this.j,":");l!==this.k&&(a.push("//"),l!==this.m&&a.push(this.m,"@"),a.push(this.k),l!==this.h&&a.push(":",this.h.toString()));l!==this.g&&a.push(this.g);l!==this.l&&a.push("?",this.l);l!==this.n&&a.push("#",this.n);return a.join("")};b.prototype.R=function(){return new b(this.j,this.m,this.k,this.h,this.g,this.l,this.n)};b.prototype.U=function(){return this.j&&decodeURIComponent(this.j).toLowerCase()};b.prototype.fa=
function(a){this.j=a?a:l};b.prototype.K=function(){return l!==this.j};b.prototype.ca=function(a){this.m=a?a:l};b.prototype.V=function(){return l!==this.m};b.prototype.da=function(a){this.k=a?a:l;this.G(this.g)};b.prototype.W=function(){return l!==this.k};b.prototype.T=function(){return this.h&&decodeURIComponent(this.h)};b.prototype.ba=function(a){if(a){a=Number(a);if(a!==(a&65535))throw Error("Bad port number "+a);this.h=""+a}else this.h=l};b.prototype.Y=function(){return l!==this.h};b.prototype.S=
function(){return this.g&&decodeURIComponent(this.g)};b.prototype.G=function(a){a?(a=""+a,this.g=!this.k||/^\//.test(a)?a:"/"+a):this.g=l};b.prototype.M=function(a){this.l=a?a:l};b.prototype.Z=function(){return l!==this.l};b.prototype.aa=function(a){if("object"===typeof a&&!(a instanceof Array)&&(a instanceof Object||"[object Array]"!==Object.prototype.toString.call(a))){var e=[],b=-1,g;for(g in a){var m=a[g];"string"===typeof m&&(e[++b]=g,e[++b]=m)}a=e}for(var e=[],b="",k=0;k<a.length;)g=a[k++],
m=a[k++],e.push(b,encodeURIComponent(g.toString())),b="&",m&&e.push("=",encodeURIComponent(m.toString()));this.l=e.join("")};b.prototype.ea=function(a){this.n=a?a:l};b.prototype.X=function(){return l!==this.n};var E=/^(?:([^:/?#]+):)?(?:\/\/(?:([^/?#]*)@)?([^/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,D=/[#\/\?@]/g,F=/[\#\?]/g;b.parse=e;b.create=function(a,e,m,g,q,k,s){a=new b(z(a,D),z(e,D),"string"==typeof m?encodeURIComponent(m):l,0<g?g.toString():l,z(q,F),l,"string"==typeof s?encodeURIComponent(s):
l);k&&("string"===typeof k?a.M(k.replace(/[^?&=0-9A-Za-z_\-~.%]/g,B)):a.aa(k));return a};b.$=A;b.ja=y;b.ua={oa:function(a){return/\.html$/.test(e(a).S())?"text/html":"application/javascript"},$:function(a,b){return a?A(e(a),e(b)).toString():""+b}};return b}();"undefined"!==typeof window&&(window.URI=p);var L={e:{NONE:0,URI:1,URI_FRAGMENT:11,SCRIPT:2,STYLE:3,HTML:12,ID:4,IDREF:5,IDREFS:6,GLOBAL_NAME:7,LOCAL_NAME:8,CLASSES:9,FRAME_TARGET:10,MEDIA_QUERY:13}};L.atype=L.e;
L.w={"*::class":9,"*::dir":0,"*::draggable":0,"*::hidden":0,"*::id":4,"*::inert":0,"*::itemprop":0,"*::itemref":6,"*::itemscope":0,"*::lang":0,"*::onblur":2,"*::onchange":2,"*::onclick":2,"*::ondblclick":2,"*::onerror":2,"*::onfocus":2,"*::onkeydown":2,"*::onkeypress":2,"*::onkeyup":2,"*::onload":2,"*::onmousedown":2,"*::onmousemove":2,"*::onmouseout":2,"*::onmouseover":2,"*::onmouseup":2,"*::onreset":2,"*::onscroll":2,"*::onselect":2,"*::onsubmit":2,"*::ontouchcancel":2,"*::ontouchend":2,"*::ontouchenter":2,
"*::ontouchleave":2,"*::ontouchmove":2,"*::ontouchstart":2,"*::onunload":2,"*::spellcheck":0,"*::style":3,"*::title":0,"*::translate":0,"a::accesskey":0,"a::coords":0,"a::href":1,"a::hreflang":0,"a::name":7,"a::onblur":2,"a::onfocus":2,"a::shape":0,"a::tabindex":0,"a::target":10,"a::type":0,"area::accesskey":0,"area::alt":0,"area::coords":0,"area::href":1,"area::nohref":0,"area::onblur":2,"area::onfocus":2,"area::shape":0,"area::tabindex":0,"area::target":10,"audio::controls":0,"audio::loop":0,"audio::mediagroup":5,
"audio::muted":0,"audio::preload":0,"audio::src":1,"bdo::dir":0,"blockquote::cite":1,"br::clear":0,"button::accesskey":0,"button::disabled":0,"button::name":8,"button::onblur":2,"button::onfocus":2,"button::tabindex":0,"button::type":0,"button::value":0,"canvas::height":0,"canvas::width":0,"caption::align":0,"col::align":0,"col::char":0,"col::charoff":0,"col::span":0,"col::valign":0,"col::width":0,"colgroup::align":0,"colgroup::char":0,"colgroup::charoff":0,"colgroup::span":0,"colgroup::valign":0,
"colgroup::width":0,"command::checked":0,"command::command":5,"command::disabled":0,"command::icon":1,"command::label":0,"command::radiogroup":0,"command::type":0,"data::value":0,"del::cite":1,"del::datetime":0,"details::open":0,"dir::compact":0,"div::align":0,"dl::compact":0,"fieldset::disabled":0,"font::color":0,"font::face":0,"font::size":0,"form::accept":0,"form::action":1,"form::autocomplete":0,"form::enctype":0,"form::method":0,"form::name":7,"form::novalidate":0,"form::onreset":2,"form::onsubmit":2,
"form::target":10,"h1::align":0,"h2::align":0,"h3::align":0,"h4::align":0,"h5::align":0,"h6::align":0,"hr::align":0,"hr::noshade":0,"hr::size":0,"hr::width":0,"iframe::align":0,"iframe::frameborder":0,"iframe::height":0,"iframe::marginheight":0,"iframe::marginwidth":0,"iframe::width":0,"img::align":0,"img::alt":0,"img::border":0,"img::height":0,"img::hspace":0,"img::ismap":0,"img::name":7,"img::src":1,"img::usemap":11,"img::vspace":0,"img::width":0,"input::accept":0,"input::accesskey":0,"input::align":0,
"input::alt":0,"input::autocomplete":0,"input::checked":0,"input::disabled":0,"input::inputmode":0,"input::ismap":0,"input::list":5,"input::max":0,"input::maxlength":0,"input::min":0,"input::multiple":0,"input::name":8,"input::onblur":2,"input::onchange":2,"input::onfocus":2,"input::onselect":2,"input::placeholder":0,"input::readonly":0,"input::required":0,"input::size":0,"input::src":1,"input::step":0,"input::tabindex":0,"input::type":0,"input::usemap":11,"input::value":0,"ins::cite":1,"ins::datetime":0,
"label::accesskey":0,"label::for":5,"label::onblur":2,"label::onfocus":2,"legend::accesskey":0,"legend::align":0,"li::type":0,"li::value":0,"map::name":7,"menu::compact":0,"menu::label":0,"menu::type":0,"meter::high":0,"meter::low":0,"meter::max":0,"meter::min":0,"meter::value":0,"ol::compact":0,"ol::reversed":0,"ol::start":0,"ol::type":0,"optgroup::disabled":0,"optgroup::label":0,"option::disabled":0,"option::label":0,"option::selected":0,"option::value":0,"output::for":6,"output::name":8,"p::align":0,
"pre::width":0,"progress::max":0,"progress::min":0,"progress::value":0,"q::cite":1,"select::autocomplete":0,"select::disabled":0,"select::multiple":0,"select::name":8,"select::onblur":2,"select::onchange":2,"select::onfocus":2,"select::required":0,"select::size":0,"select::tabindex":0,"source::type":0,"table::align":0,"table::bgcolor":0,"table::border":0,"table::cellpadding":0,"table::cellspacing":0,"table::frame":0,"table::rules":0,"table::summary":0,"table::width":0,"tbody::align":0,"tbody::char":0,
"tbody::charoff":0,"tbody::valign":0,"td::abbr":0,"td::align":0,"td::axis":0,"td::bgcolor":0,"td::char":0,"td::charoff":0,"td::colspan":0,"td::headers":6,"td::height":0,"td::nowrap":0,"td::rowspan":0,"td::scope":0,"td::valign":0,"td::width":0,"textarea::accesskey":0,"textarea::autocomplete":0,"textarea::cols":0,"textarea::disabled":0,"textarea::inputmode":0,"textarea::name":8,"textarea::onblur":2,"textarea::onchange":2,"textarea::onfocus":2,"textarea::onselect":2,"textarea::placeholder":0,"textarea::readonly":0,
"textarea::required":0,"textarea::rows":0,"textarea::tabindex":0,"textarea::wrap":0,"tfoot::align":0,"tfoot::char":0,"tfoot::charoff":0,"tfoot::valign":0,"th::abbr":0,"th::align":0,"th::axis":0,"th::bgcolor":0,"th::char":0,"th::charoff":0,"th::colspan":0,"th::headers":6,"th::height":0,"th::nowrap":0,"th::rowspan":0,"th::scope":0,"th::valign":0,"th::width":0,"thead::align":0,"thead::char":0,"thead::charoff":0,"thead::valign":0,"tr::align":0,"tr::bgcolor":0,"tr::char":0,"tr::charoff":0,"tr::valign":0,
"track::default":0,"track::kind":0,"track::label":0,"track::srclang":0,"ul::compact":0,"ul::type":0,"video::controls":0,"video::height":0,"video::loop":0,"video::mediagroup":5,"video::muted":0,"video::poster":1,"video::preload":0,"video::src":1,"video::width":0};L.ATTRIBS=L.w;L.c={OPTIONAL_ENDTAG:1,EMPTY:2,CDATA:4,RCDATA:8,UNSAFE:16,FOLDABLE:32,SCRIPT:64,STYLE:128,VIRTUALIZED:256};L.eflags=L.c;
L.f={a:0,abbr:0,acronym:0,address:0,applet:272,area:2,article:0,aside:0,audio:0,b:0,base:274,basefont:274,bdi:0,bdo:0,big:0,blockquote:0,body:305,br:2,button:0,canvas:0,caption:0,center:0,cite:0,code:0,col:2,colgroup:1,command:2,data:0,datalist:0,dd:1,del:0,details:0,dfn:0,dialog:272,dir:0,div:0,dl:0,dt:1,em:0,fieldset:0,figcaption:0,figure:0,font:0,footer:0,form:0,frame:274,frameset:272,h1:0,h2:0,h3:0,h4:0,h5:0,h6:0,head:305,header:0,hgroup:0,hr:2,html:305,i:0,iframe:4,img:2,input:2,ins:0,isindex:274,
kbd:0,keygen:274,label:0,legend:0,li:1,link:274,map:0,mark:0,menu:0,meta:274,meter:0,nav:0,nobr:0,noembed:276,noframes:276,noscript:276,object:272,ol:0,optgroup:0,option:1,output:0,p:1,param:274,pre:0,progress:0,q:0,s:0,samp:0,script:84,section:0,select:0,small:0,source:2,span:0,strike:0,strong:0,style:148,sub:0,summary:0,sup:0,table:0,tbody:1,td:1,textarea:8,tfoot:1,th:1,thead:1,time:0,title:280,tr:1,track:2,tt:0,u:0,ul:0,"var":0,video:0,wbr:2};L.ELEMENTS=L.f;
L.O={a:"HTMLAnchorElement",abbr:"HTMLElement",acronym:"HTMLElement",address:"HTMLElement",applet:"HTMLAppletElement",area:"HTMLAreaElement",article:"HTMLElement",aside:"HTMLElement",audio:"HTMLAudioElement",b:"HTMLElement",base:"HTMLBaseElement",basefont:"HTMLBaseFontElement",bdi:"HTMLElement",bdo:"HTMLElement",big:"HTMLElement",blockquote:"HTMLQuoteElement",body:"HTMLBodyElement",br:"HTMLBRElement",button:"HTMLButtonElement",canvas:"HTMLCanvasElement",caption:"HTMLTableCaptionElement",center:"HTMLElement",
cite:"HTMLElement",code:"HTMLElement",col:"HTMLTableColElement",colgroup:"HTMLTableColElement",command:"HTMLCommandElement",data:"HTMLElement",datalist:"HTMLDataListElement",dd:"HTMLElement",del:"HTMLModElement",details:"HTMLDetailsElement",dfn:"HTMLElement",dialog:"HTMLDialogElement",dir:"HTMLDirectoryElement",div:"HTMLDivElement",dl:"HTMLDListElement",dt:"HTMLElement",em:"HTMLElement",fieldset:"HTMLFieldSetElement",figcaption:"HTMLElement",figure:"HTMLElement",font:"HTMLFontElement",footer:"HTMLElement",
form:"HTMLFormElement",frame:"HTMLFrameElement",frameset:"HTMLFrameSetElement",h1:"HTMLHeadingElement",h2:"HTMLHeadingElement",h3:"HTMLHeadingElement",h4:"HTMLHeadingElement",h5:"HTMLHeadingElement",h6:"HTMLHeadingElement",head:"HTMLHeadElement",header:"HTMLElement",hgroup:"HTMLElement",hr:"HTMLHRElement",html:"HTMLHtmlElement",i:"HTMLElement",iframe:"HTMLIFrameElement",img:"HTMLImageElement",input:"HTMLInputElement",ins:"HTMLModElement",isindex:"HTMLUnknownElement",kbd:"HTMLElement",keygen:"HTMLKeygenElement",
label:"HTMLLabelElement",legend:"HTMLLegendElement",li:"HTMLLIElement",link:"HTMLLinkElement",map:"HTMLMapElement",mark:"HTMLElement",menu:"HTMLMenuElement",meta:"HTMLMetaElement",meter:"HTMLMeterElement",nav:"HTMLElement",nobr:"HTMLElement",noembed:"HTMLElement",noframes:"HTMLElement",noscript:"HTMLElement",object:"HTMLObjectElement",ol:"HTMLOListElement",optgroup:"HTMLOptGroupElement",option:"HTMLOptionElement",output:"HTMLOutputElement",p:"HTMLParagraphElement",param:"HTMLParamElement",pre:"HTMLPreElement",
progress:"HTMLProgressElement",q:"HTMLQuoteElement",s:"HTMLElement",samp:"HTMLElement",script:"HTMLScriptElement",section:"HTMLElement",select:"HTMLSelectElement",small:"HTMLElement",source:"HTMLSourceElement",span:"HTMLSpanElement",strike:"HTMLElement",strong:"HTMLElement",style:"HTMLStyleElement",sub:"HTMLElement",summary:"HTMLElement",sup:"HTMLElement",table:"HTMLTableElement",tbody:"HTMLTableSectionElement",td:"HTMLTableDataCellElement",textarea:"HTMLTextAreaElement",tfoot:"HTMLTableSectionElement",
th:"HTMLTableHeaderCellElement",thead:"HTMLTableSectionElement",time:"HTMLTimeElement",title:"HTMLTitleElement",tr:"HTMLTableRowElement",track:"HTMLTrackElement",tt:"HTMLElement",u:"HTMLElement",ul:"HTMLUListElement","var":"HTMLElement",video:"HTMLVideoElement",wbr:"HTMLElement"};L.ELEMENT_DOM_INTERFACES=L.O;L.N={NOT_LOADED:0,SAME_DOCUMENT:1,NEW_DOCUMENT:2};L.ueffects=L.N;
L.J={"a::href":2,"area::href":2,"audio::src":1,"blockquote::cite":0,"command::icon":1,"del::cite":0,"form::action":2,"img::src":1,"input::src":1,"ins::cite":0,"q::cite":0,"video::poster":1,"video::src":1};L.URIEFFECTS=L.J;L.L={UNSANDBOXED:2,SANDBOXED:1,DATA:0};L.ltypes=L.L;L.I={"a::href":2,"area::href":2,"audio::src":2,"blockquote::cite":2,"command::icon":1,"del::cite":2,"form::action":2,"img::src":1,"input::src":1,"ins::cite":2,"q::cite":2,"video::poster":1,"video::src":2};L.LOADERTYPES=L.I;
"undefined"!==typeof window&&(window.html4=L);var Q=function(e){function z(f){if(G.hasOwnProperty(f))return G[f];var a=f.match(R);return a?String.fromCharCode(parseInt(a[1],10)):(a=f.match(S))?String.fromCharCode(parseInt(a[1],16)):H&&T.test(f)?(H.innerHTML="&"+f+";",a=H.textContent,G[f]=a):"&"+f+";"}function B(f,a){return z(a)}function y(f){return f.replace(U,B)}function A(f){return(""+f).replace(V,"&amp;").replace(M,"&lt;").replace(N,"&gt;").replace(W,"&#34;")}function b(f){return f.replace(X,"&amp;$1").replace(M,"&lt;").replace(N,"&gt;")}
function q(f){var a={z:f.z||f.cdata,A:f.A||f.comment,B:f.B||f.endDoc,r:f.r||f.endTag,d:f.d||f.pcdata,F:f.F||f.rcdata,H:f.H||f.startDoc,v:f.v||f.startTag};return function(f,e){var c;var b=/(<\/|<\!--|<[!?]|[&<>])/g;c=f+"";if(Y)c=c.split(b);else{for(var i=[],h=0,n;(n=b.exec(c))!==l;)i.push(c.substring(h,n.index)),i.push(n[0]),h=n.index+n[0].length;i.push(c.substring(h));c=i}x(a,c,0,{o:!1,C:!1},e)}}function m(f,a,d,e,c){return function(){x(f,a,d,e,c)}}function x(f,a,d,j,c){try{f.H&&0==d&&f.H(c);for(var b,
i,h,n=a.length;d<n;){var r=a[d++],k=a[d];switch(r){case "&":Z.test(k)?(f.d&&f.d("&"+k,c,t,m(f,a,d,j,c)),d++):f.d&&f.d("&amp;",c,t,m(f,a,d,j,c));break;case "</":if(b=/^([-\w:]+)[^\'\"]*/.exec(k))if(b[0].length===k.length&&">"===a[d+1])d+=2,h=b[1].toLowerCase(),f.r&&f.r(h,c,t,m(f,a,d,j,c));else{var g=a,o=d,q=f,s=c,v=t,y=j,x=D(g,o);x?(q.r&&q.r(x.name,s,v,m(q,g,o,y,s)),d=x.next):d=g.length}else f.d&&f.d("&lt;/",c,t,m(f,a,d,j,c));break;case "<":if(b=/^([-\w:]+)\s*\/?/.exec(k))if(b[0].length===k.length&&
">"===a[d+1]){d+=2;h=b[1].toLowerCase();f.v&&f.v(h,[],c,t,m(f,a,d,j,c));var z=e.f[h];z&O&&(d=E(a,{name:h,next:d,c:z},f,c,t,j))}else{var g=a,o=f,q=c,s=t,v=j,C=D(g,d);C?(o.v&&o.v(C.name,C.P,q,s,m(o,g,C.next,v,q)),d=C.c&O?E(g,C,o,q,s,v):C.next):d=g.length}else f.d&&f.d("&lt;",c,t,m(f,a,d,j,c));break;case "<\!--":if(!j.C){for(i=d+1;i<n&&!(">"===a[i]&&/--$/.test(a[i-1]));i++);if(i<n){if(f.A){var A=a.slice(d,i).join("");f.A(A.substr(0,A.length-2),c,t,m(f,a,i+1,j,c))}d=i+1}else j.C=!0}j.C&&f.d&&f.d("&lt;!--",
c,t,m(f,a,d,j,c));break;case "<!":if(/^\w/.test(k)){if(!j.o){for(i=d+1;i<n&&">"!==a[i];i++);i<n?d=i+1:j.o=!0}j.o&&f.d&&f.d("&lt;!",c,t,m(f,a,d,j,c))}else f.d&&f.d("&lt;!",c,t,m(f,a,d,j,c));break;case "<?":if(!j.o){for(i=d+1;i<n&&">"!==a[i];i++);i<n?d=i+1:j.o=!0}j.o&&f.d&&f.d("&lt;?",c,t,m(f,a,d,j,c));break;case ">":f.d&&f.d("&gt;",c,t,m(f,a,d,j,c));break;case "":break;default:f.d&&f.d(r,c,t,m(f,a,d,j,c))}}f.B&&f.B(c)}catch(B){if(B!==t)throw B;}}function E(a,w,d,j,c,u){var i=a.length;I.hasOwnProperty(w.name)||
(I[w.name]=RegExp("^"+w.name+"(?:[\\s\\/]|$)","i"));for(var h=I[w.name],n=w.next,r=w.next+1;r<i&&!("</"===a[r-1]&&h.test(a[r]));r++);r<i&&(r-=1);i=a.slice(n,r).join("");if(w.c&e.c.CDATA)d.z&&d.z(i,j,c,m(d,a,r,u,j));else if(w.c&e.c.RCDATA)d.F&&d.F(b(i),j,c,m(d,a,r,u,j));else throw Error("bug");return r}function D(a,b){var d=/^([-\w:]+)/.exec(a[b]),j={};j.name=d[1].toLowerCase();j.c=e.f[j.name];for(var c=a[b].substr(d[0].length),u=b+1,i=a.length;u<i&&">"!==a[u];u++)c+=a[u];if(!(i<=u)){for(var h=[];""!==
c;)if(d=$.exec(c))if(d[4]&&!d[5]||d[6]&&!d[7]){for(var d=d[4]||d[6],n=!1,c=[c,a[u++]];u<i;u++){if(n){if(">"===a[u])break}else 0<=a[u].indexOf(d)&&(n=!0);c.push(a[u])}if(i<=u)break;c=c.join("")}else{var n=d[1].toLowerCase(),r;if(d[2]){r=d[3];var g=r.charCodeAt(0);if(34===g||39===g)r=r.substr(1,r.length-2);r=y(r.replace(aa,""))}else r="";h.push(n,r);c=c.substr(d[0].length)}else c=c.replace(/^[\s\S][^a-z\s]*/,"");j.P=h;j.next=u+1;return j}}function F(a){function b(a,f){j||f.push(a)}var d,j;return q({startDoc:function(){d=
[];j=!1},startTag:function(c,b,i){if(!j&&e.f.hasOwnProperty(c)){var h=e.f[c];if(!(h&e.c.FOLDABLE)){var n=a(c,b);if(n){if("object"!==typeof n)throw Error("tagPolicy did not return object (old API?)");if("attribs"in n)b=n.attribs;else throw Error("tagPolicy gave no attribs");var g;"tagName"in n?(g=n.tagName,n=e.f[g]):(g=c,n=h);if(h&e.c.OPTIONAL_ENDTAG){var k=d[d.length-1];k&&k.D===c&&(k.t!==g||c!==g)&&i.push("</",k.t,">")}h&e.c.EMPTY||d.push({D:c,t:g});i.push("<",g);c=0;for(k=b.length;c<k;c+=2){var m=
b[c],w=b[c+1];w!==l&&void 0!==w&&i.push(" ",m,'="',A(w),'"')}i.push(">");h&e.c.EMPTY&&!(n&e.c.EMPTY)&&i.push("</",g,">")}else j=!(h&e.c.EMPTY)}}},endTag:function(a,f){if(j)j=!1;else if(e.f.hasOwnProperty(a)){var b=e.f[a];if(!(b&(e.c.EMPTY|e.c.FOLDABLE))){if(b&e.c.OPTIONAL_ENDTAG)for(b=d.length;0<=--b;){var h=d[b].D;if(h===a)break;if(!(e.f[h]&e.c.OPTIONAL_ENDTAG))return}else for(b=d.length;0<=--b&&d[b].D!==a;);if(!(0>b)){for(h=d.length;--h>b;){var g=d[h].t;e.f[g]&e.c.OPTIONAL_ENDTAG||f.push("</",g,
">")}b<d.length&&(a=d[b].t);d.length=b;f.push("</",a,">")}}}},pcdata:b,rcdata:b,cdata:b,endDoc:function(a){for(;d.length;d.length--)a.push("</",d[d.length-1].t,">")}})}function a(a,b,d,e,c){if(!c)return l;try{var g=p.parse(""+a);if(g&&(!g.K()||ba.test(g.U()))){var i=c(g,b,d,e);return i?i.toString():l}}catch(h){}return l}function v(a,b,d,e,c){d||a(b+" removed",{Q:"removed",tagName:b});if(e!==c){var g="changed";e&&!c?g="removed":!e&&c&&(g="added");a(b+"."+d+" "+g,{Q:g,tagName:b,ia:d,oldValue:e,newValue:c})}}
function J(a,b,d){b=b+"::"+d;if(a.hasOwnProperty(b))return a[b];b="*::"+d;if(a.hasOwnProperty(b))return a[b]}function g(b,g,d,j,c){for(var k=0;k<g.length;k+=2){var i=g[k],h=g[k+1],n=h,m=l,o;if((o=b+"::"+i,e.w.hasOwnProperty(o))||(o="*::"+i,e.w.hasOwnProperty(o)))m=e.w[o];if(m!==l)switch(m){case e.e.NONE:break;case e.e.SCRIPT:h=l;c&&v(c,b,i,n,h);break;case e.e.STYLE:if("undefined"===typeof s){h=l;c&&v(c,b,i,n,h);break}var q=[];s(h,{declaration:function(b,c){var f=b.toLowerCase();P(f,c,d?function(b){return a(b,
e.N.ga,e.L.ha,{TYPE:"CSS",CSS_PROP:f},d)}:l);c.length&&q.push(f+": "+c.join(" "))}});h=0<q.length?q.join(" ; "):l;c&&v(c,b,i,n,h);break;case e.e.ID:case e.e.IDREF:case e.e.IDREFS:case e.e.GLOBAL_NAME:case e.e.LOCAL_NAME:case e.e.CLASSES:h=j?j(h):h;c&&v(c,b,i,n,h);break;case e.e.URI:h=a(h,J(e.J,b,i),J(e.I,b,i),{TYPE:"MARKUP",XML_ATTR:i,XML_TAG:b},d);c&&v(c,b,i,n,h);break;case e.e.URI_FRAGMENT:h&&"#"===h.charAt(0)?(h=h.substring(1),h=j?j(h):h,h!==l&&void 0!==h&&(h="#"+h)):h=l;c&&v(c,b,i,n,h);break;
default:h=l,c&&v(c,b,i,n,h)}else h=l,c&&v(c,b,i,n,h);g[k+1]=h}return g}function K(a,b,d){return function(j,c){if(e.f[j]&e.c.UNSAFE)d&&v(d,j,void 0,void 0,void 0);else return{attribs:g(j,c,a,b,d)}}}function k(a,b){var d=[];F(b)(a,d);return d.join("")}var s,P;"undefined"!==typeof window&&(s=window.parseCssDeclarations,P=window.sanitizeCssProperty);var G={lt:"<",LT:"<",gt:">",GT:">",amp:"&",AMP:"&",quot:'"',apos:"'",nbsp:"\u00a0"},R=/^#(\d+)$/,S=/^#x([0-9A-Fa-f]+)$/,T=/^[A-Za-z][A-za-z0-9]+$/,H="undefined"!==
typeof window&&window.document?window.document.createElement("textarea"):l,aa=/\0/g,U=/&(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/g,Z=/^(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/,V=/&/g,X=/&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,M=/[<]/g,N=/>/g,W=/\"/g,$=/^\s*([-.:\w]+)(?:\s*(=)\s*((")[^"]*("|$)|(')[^']*('|$)|(?=[a-z][-\w]*\s*=)|[^"'\s]*))?/i,Y=3==="a,b".split(/(,)/).length,O=e.c.CDATA|e.c.RCDATA,t={},I={},ba=/^(?:https?|mailto)$/i,o={};o.ka=o.escapeAttrib=A;o.la=o.makeHtmlSanitizer=F;o.ma=o.makeSaxParser=
q;o.na=o.makeTagPolicy=K;o.pa=o.normalizeRCData=b;o.qa=o.sanitize=function(a,b,d,e){return k(a,K(b,d,e))};o.ra=o.sanitizeAttribs=g;o.sa=o.sanitizeWithPolicy=k;o.ta=o.unescapeEntities=y;return o}(L),ca=Q.sanitize;"undefined"!==typeof window&&(window.html=Q,window.html_sanitize=ca);})();
;

/* [end] feature=core */

/* [start] feature=osapi.base */
(function(){var a=function(){var c={};
var b=[];
var f=function(g,h){if(h&&g){b.push({key:g,request:h})
}return c
};
var e=function(h){var g={method:h.request["method"],id:h.key};
if(h.request["rpc"]){g.params=h.request["rpc"]
}return g
};
var d=function(g){var h={};
var q={};
var l=0;
var m=[];
for(var o=0;
o<b.length;
o++){var k=b[o]["request"]["transport"];
if(!q[k.name]){m.push(k);
l++
}q[k.name]=q[k.name]||[];
q[k.name].push(e(b[o]))
}var p=function(t){if(t.error){h.error=t.error
}for(var s=0;
s<b.length;
s++){var r=b[s]["key"];
var j=t[r];
if(j){if(j.error){h[r]=j
}else{h[r]=j.data||j.result
}}}l--;
if(l===0){g(h)
}};
for(var n=0;
n<m.length;
n++){m[n].execute(q[m[n]["name"]],p)
}if(l==0){window.setTimeout(function(){g(h)
},0)
}};
c.execute=d;
c.add=f;
return c
};
osapi.newBatch=a
})();;
osapi._registerMethod=function(f,e){if(f==="newBatch"){return
}var d=f.split(".");
var b=window.osapi;
for(var a=0;
a<d.length-1;
a++){b[d[a]]=b[d[a]]||{};
b=b[d[a]]
}var c=d[d.length-1];
if(b[c]){if(!b.__dupwarn){gadgets.warn("Skipping duplicate osapi method definition "+f+" on transport "+e.name+"; others may exist, but suppressing warnings")
}b.__dupwarn=true;
return
}b[c]=function(h){h=h||{};
h.userId=h.userId||"@viewer";
h.groupId=h.groupId||"@self";
var g=new osapi._BoundCall(f,e,h);
return g
};
if(typeof tamings___!=="undefined"){tamings___.push(function(){caja___.markTameAsFunction(b[c],f)
})
}};
osapi._BoundCall=function(c,b,a){this["method"]=c;
this["transport"]=b;
this["rpc"]=a
};
osapi._BoundCall.prototype.execute=function(e){var a=(typeof caja___!=="undefined"&&caja___.getUseless&&caja___.getUseless());
var d=a?caja___.getUseless():this;
var b=a?caja___.untame(e):e;
var c=osapi.newBatch();
c.add(this["method"],this);
c.execute(function(f){if(f.error){b.call(d,f.error)
}else{b.call(d,f[d.method])
}})
};;

/* [end] feature=osapi.base */

/* [start] feature=osapi */
(function(){var a;
function b(j,i){function g(l){if(l.errors[0]){i({error:{code:l.rc,message:l.text}})
}else{var m=l.result||l.data;
if(m.error){i(m)
}else{var k={};
for(var n=0;
n<m.length;
n++){k[m[n]["id"]]=m[n]
}i(k)
}}}var f={POST_DATA:gadgets.json.stringify(j),CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED"};
var h={"Content-Type":"application/json"};
var d=this.name;
var e=shindig.auth.getSecurityToken();
if(e){if(a){h.Authorization="OAuth2 "+e
}else{d+="?st=";
d+=encodeURIComponent(e)
}}gadgets.io.makeNonProxiedRequest(d,g,f,h)
}function c(g){var j=g["osapi.services"];
a=g["osapi.useOAuth2"];
if(j){for(var f in j){if(j.hasOwnProperty(f)){if(f.indexOf("http")==0||f.indexOf("//")==0){var d=f.replace("%host%",document.location.host);
var k={name:d,execute:b};
var e=j[f];
for(var h=0;
h<e.length;
h++){osapi._registerMethod(e[h],k)
}}}}}}osapi._init=function(d){c(d)
};
if(gadgets.config){gadgets.config.register("osapi.services",null,c)
}})();;
if(gadgets&&gadgets.rpc){(function(){function a(e,d){var c=function(g){if(!g){d({code:500,message:"Container refused the request"})
}else{if(g.error){d(g)
}else{var f={};
for(var h=0;
h<g.length;
h++){f[g[h]["id"]]=g[h]
}d(f)
}}};
gadgets.rpc.call("..","osapi._handleGadgetRpcMethod",c,e)
}function b(c){var f={name:"gadgets.rpc",execute:a};
var l=c["osapi.services"];
if(l){for(var d in l){if(l.hasOwnProperty(d)){if(d==="gadgets.rpc"){var e=l[d];
for(var h=0;
h<e.length;
h++){osapi._registerMethod(e[h],f)
}}}}}if(osapi.container&&osapi.container.listMethods){var g=gadgets.util.runOnLoadHandlers;
var j=2;
var k=function(){j--;
if(j==0){g()
}};
gadgets.util.runOnLoadHandlers=k;
osapi.container.listMethods({}).execute(function(m){if(!m.error){for(var n=0;
n<m.length;
n++){if(m[n]!="container.listMethods"){osapi._registerMethod(m[n],f)
}}}k()
});
window.setTimeout(k,500)
}}if(gadgets.config){gadgets.config.register("osapi.services",null,b)
}})()
};;
gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){osapi.people.getViewer=function(a){a=a||{};
a.userId="@viewer";
a.groupId="@self";
return osapi.people.get(a)
};
osapi.people.getViewerFriends=function(a){a=a||{};
a.userId="@viewer";
a.groupId="@friends";
return osapi.people.get(a)
};
osapi.people.getOwner=function(a){a=a||{};
a.userId="@owner";
a.groupId="@self";
return osapi.people.get(a)
};
osapi.people.getOwnerFriends=function(a){a=a||{};
a.userId="@owner";
a.groupId="@friends";
return osapi.people.get(a)
}
}});;

/* [end] feature=osapi */

/* [start] feature=dynamic-height.util */
gadgets.window=gadgets.window||{};
(function(){gadgets.window.getViewportDimensions=function(){var a=0;
var b=0;
if(self.innerHeight){a=self.innerWidth;
b=self.innerHeight
}else{if(document.documentElement&&document.documentElement.clientHeight){a=document.documentElement.clientWidth;
b=document.documentElement.clientHeight
}else{if(document.body){a=document.body.clientWidth;
b=document.body.clientHeight
}}}return{width:a,height:b}
}
})();;

/* [end] feature=dynamic-height.util */

/* [start] feature=dynamic-height.height */
gadgets.window=gadgets.window||{};
(function(){function a(e,c){var d=window.getComputedStyle(e,"");
var f=d.getPropertyValue(c);
f.match(/^([0-9]+)/);
return parseInt(RegExp.$1,10)
}function b(){var m=0;
var k=[document.body];
while(k.length>0){var f=k.shift();
var e=f.childNodes;
if(typeof f.style!=="undefined"){var g=f.style.overflowY;
if(!g){var j=document.defaultView.getComputedStyle(f,null);
g=j?j.overflowY:null
}if(g!="visible"&&g!="inherit"){var l=f.style.height;
if(!l){var j=document.defaultView.getComputedStyle(f,null);
l=j?j.height:""
}if(l.length>0&&l!="auto"){continue
}}}for(var h=0;
h<e.length;
h++){var d=e[h];
if(typeof d.offsetTop!=="undefined"&&typeof d.offsetHeight!=="undefined"){var c=d.offsetTop+d.offsetHeight+a(d,"margin-bottom");
m=Math.max(m,c)
}k.push(d)
}}return m+a(document.body,"border-bottom")+a(document.body,"margin-bottom")+a(document.body,"padding-bottom")
}gadgets.window.getHeight=function(){var g=gadgets.window.getViewportDimensions().height;
var c=document.body;
var f=document.documentElement;
if(document.compatMode==="CSS1Compat"&&f.scrollHeight){return f.scrollHeight!==g?f.scrollHeight:f.offsetHeight
}else{if(navigator.userAgent.indexOf("AppleWebKit")>=0){return b()
}else{if(c&&f){var d=f.scrollHeight;
var e=f.offsetHeight;
if(f.clientHeight!==e){d=c.scrollHeight;
e=c.offsetHeight
}if(d>g){return d>e?d:e
}else{return d<e?d:e
}}}}}
}());;

/* [end] feature=dynamic-height.height */

/* [start] feature=dynamic-height */
gadgets.window=gadgets.window||{};
(function(){var a;
gadgets.window.adjustHeight=function(d){var c=parseInt(d,10);
var b=false;
if(isNaN(c)){b=true;
c=gadgets.window.getHeight()
}if(c!==a&&!isNaN(c)&&!(b&&c===0)){a=c;
gadgets.rpc.call(null,"resize_iframe",null,c)
}}
}());
var _IG_AdjustIFrameHeight=gadgets.window.adjustHeight;;
tamings___.push(function(a){caja___.whitelistFuncs([[gadgets.window,"adjustHeight"]])
});;

/* [end] feature=dynamic-height */

/* [start] feature=google.contentmatch */
(function(){var e=this;Math.random();Math.random();var f,g,k,l,m=function(){return e.navigator?e.navigator.userAgent:null};l=k=g=f=!1;var n;if(n=m()){var p=e.navigator;f=0==n.lastIndexOf("Opera",0);g=!f&&(-1!=n.indexOf("MSIE")||-1!=n.indexOf("Trident"));k=!f&&-1!=n.indexOf("WebKit");l=!f&&!k&&!g&&"Gecko"==p.product}var q=f,r=g,t=l,u=k;var x;if(q&&e.opera){var y=e.opera.version;"function"==typeof y&&y()}else t?x=/rv\:([^\);]+)(\)|;)/:r?x=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:u&&(x=/WebKit\/(\S+)/),x&&x.exec(m());var z=null,A=null,B=t||u||q||"function"==typeof e.atob;var D=function(b){b=String(b);if(/^\s*$/.test(b)?0:/^[\],:{}\s\u2028\u2029]*$/.test(b.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+b+")")}catch(a){}throw Error("Invalid JSON string: "+b);};var E=function(b){if(window._debugCob)return window._debugCob;var a=gadgets.util.getUrlParameters().cob;if(a){a=decodeURIComponent(a);if("{"!=a.charAt(0))if(B)a=e.atob(a);else{if(!z){z={};A={};for(var c=0;65>c;c++)z[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c),A[z[c]]=c}for(var c=A,h=[],d=0;d<a.length;){var C=c[a.charAt(d++)],v=d<a.length?c[a.charAt(d)]:0;++d;var s=d<a.length?c[a.charAt(d)]:0;++d;var w=d<a.length?c[a.charAt(d)]:0;++d;if(null==C||null==v||null==
s||null==w)throw Error();h.push(C<<2|v>>4);64!=s&&(h.push(v<<4&240|s>>2),64!=w&&h.push(s<<6&192|w))}a=String.fromCharCode.apply(null,h)}a=D(a);if(b)return a[b];b=[];for(var I in a)b=b.concat(a[I]);return b}return[]},F=function(b){var a;if(gadgets.views&&gadgets.views.getParams()){a=gadgets.views.getParams();var c=!1,h;for(h in a){c=!0;break}a=c?"list"in a?a.list:[a]:null}else a=null;return a||E(b)},G=["google","contentmatch","getContentMatches"],H=e;G[0]in H||!H.execScript||H.execScript("var "+G[0]);
for(var J;G.length&&(J=G.shift());)G.length||void 0===F?H=H[J]?H[J]:H[J]={}:H[J]=F;})();
;

/* [end] feature=google.contentmatch */
(function(){var j=window['___jsl']=window['___jsl']||{};j['l']=(j['l']||[]).concat(['auth-refresh','core','dynamic-height','google.contentmatch','locked-domain','opensocial-0.9','osapi']);})();(function(){var j=window['___jsl']=window['___jsl']||{};if(j['c']){j['c']();delete j['c'];}})();