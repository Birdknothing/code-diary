(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{enumerable:!0,get:d})},b.r=function(a){'undefined'!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:'Module'}),Object.defineProperty(a,'__esModule',{value:!0})},b.t=function(a,c){if(1&c&&(a=b(a)),8&c)return a;if(4&c&&'object'==typeof a&&a&&a.__esModule)return a;var d=Object.create(null);if(b.r(d),Object.defineProperty(d,'default',{enumerable:!0,value:a}),2&c&&'string'!=typeof a)for(var e in a)b.d(d,e,function(b){return a[b]}.bind(null,e));return d},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=2)})([function(a){a.exports=React},function(a,b,c){var d=c(3);'string'==typeof d&&(d=[[a.i,d,'']]);c(5)(d,{insert:'head',singleton:!1});d.locals&&(a.exports=d.locals)},function(a,b,c){'use strict';c.r(b);var d=c(1),e=c.n(d),f=c(0),g=c.n(f);Object.assign(window,{M:(a)=>{const{test:b,testClick:c}=a;return g.a.createElement('div',{style:{width:500,height:500},className:e.a.test},g.a.createElement('img',{style:{width:'100%',height:'100%'},src:'./bg.jpg'}),g.a.createElement('br',null),b,g.a.createElement('br',null),g.a.createElement('button',{onClick:c}))}})},function(a,b,c){b=a.exports=c(4)(!1),b.push([a.i,'._1sge6TK9GAMKn0AHn89eS4{color:red}\n','']),b.locals={test:'_1sge6TK9GAMKn0AHn89eS4'}},function(a){'use strict';function b(a,b){var d=a[1]||'',e=a[3];if(!e)return d;if(b&&'function'==typeof btoa){var f=c(e),g=e.sources.map(function(a){return'/*# sourceURL='.concat(e.sourceRoot).concat(a,' */')});return[d].concat(g).concat([f]).join('\n')}return[d].join('\n')}function c(a){var b=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c='sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(b);return'/*# '.concat(c,' */')}a.exports=function(a){var c=[];return c.toString=function(){return this.map(function(c){var d=b(c,a);return c[2]?'@media '.concat(c[2],'{').concat(d,'}'):d}).join('')},c.i=function(a,b){'string'==typeof a&&(a=[[null,a,'']]);for(var d,e={},f=0;f<this.length;f++)d=this[f][0],null!=d&&(e[d]=!0);for(var g,h=0;h<a.length;h++)g=a[h],null!=g[0]&&e[g[0]]||(b&&!g[2]?g[2]=b:b&&(g[2]='('.concat(g[2],') and (').concat(b,')')),c.push(g))},c}},function(a,b,c){'use strict';function d(a,b){for(var c=[],d={},e=0;e<a.length;e++){var f=a[e],g=b.base?f[0]+b.base:f[0],h=f[1],i=f[2],j=f[3],k={css:h,media:i,sourceMap:j};d[g]?d[g].parts.push(k):c.push(d[g]={id:g,parts:[k]})}return c}function e(a,b){for(var c=0;c<a.length;c++){var d=a[c],e=l[d.id],f=0;if(e){for(e.refs++;f<e.parts.length;f++)e.parts[f](d.parts[f]);for(;f<d.parts.length;f++)e.parts.push(k(d.parts[f],b))}else{for(var g=[];f<d.parts.length;f++)g.push(k(d.parts[f],b));l[d.id]={id:d.id,refs:1,parts:g}}}}function f(a){var b=document.createElement('style');if('undefined'==typeof a.attributes.nonce){var d=c.nc;d&&(a.attributes.nonce=d)}if(Object.keys(a.attributes).forEach(function(c){b.setAttribute(c,a.attributes[c])}),'function'==typeof a.insert)a.insert(b);else{var e=m(a.insert||'head');if(!e)throw new Error('Couldn\'t find a style target. This probably means that the value for the \'insert\' parameter is invalid.');e.appendChild(b)}return b}function g(a){return null!==a.parentNode&&void a.parentNode.removeChild(a)}function h(a,b,c,d){var e=c?'':d.css;if(a.styleSheet)a.styleSheet.cssText=n(b,e);else{var f=document.createTextNode(e),g=a.childNodes;g[b]&&a.removeChild(g[b]),g.length?a.insertBefore(f,g[b]):a.appendChild(f)}}function i(a,b,c){var d=c.css,e=c.media,f=c.sourceMap;if(e&&a.setAttribute('media',e),f&&btoa&&(d+='\n/*# sourceMappingURL=data:application/json;base64,'.concat(btoa(unescape(encodeURIComponent(JSON.stringify(f)))),' */')),a.styleSheet)a.styleSheet.cssText=d;else{for(;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(document.createTextNode(d))}}function k(a,b){var c,d,e;if(b.singleton){var j=p++;c=o||(o=f(b)),d=h.bind(null,c,j,!1),e=h.bind(null,c,j,!0)}else c=f(b),d=i.bind(null,c,b),e=function(){g(c)};return d(a),function(b){if(b){if(b.css===a.css&&b.media===a.media&&b.sourceMap===a.sourceMap)return;d(a=b)}else e()}}var l={},j=function(){var a;return function(){return'undefined'==typeof a&&(a=!!(window&&document&&document.all&&!window.atob)),a}}(),m=function(){var a={};return function(b){if('undefined'==typeof a[b]){var c=document.querySelector(b);if(window.HTMLIFrameElement&&c instanceof window.HTMLIFrameElement)try{c=c.contentDocument.head}catch(a){c=null}a[b]=c}return a[b]}}(),n=function(){var a=[];return function(b,c){return a[b]=c,a.filter(Boolean).join('\n')}}(),o=null,p=0;a.exports=function(a,b){b=b||{},b.attributes='object'==typeof b.attributes?b.attributes:{},b.singleton||'boolean'==typeof b.singleton||(b.singleton=j());var c=d(a,b);return e(c,b),function(a){for(var f=[],g=0;g<c.length;g++){var h=c[g],i=l[h.id];i&&(i.refs--,f.push(i))}if(a){var k=d(a,b);e(k,b)}for(var m,n=0;n<f.length;n++)if(m=f[n],0===m.refs){for(var o=0;o<m.parts.length;o++)m.parts[o]();delete l[m.id]}}}}]);
//# sourceMappingURL=bundle.js.map