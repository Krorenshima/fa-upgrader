!function(){let e,n,t,l={};n="p span div a button input h1 h2 h3 h4 h5 h6 hr b i u img style link meta br hr table tr tb li ul template textarea video".split(/ /),e="click dblclick error mouseover mousemove mouseup mousedown keydown keyup keypress load".split(/ /),t=(t="style title encoding href src rel target cols width height align class id type placeholder".split(/ /)).concat(e.map(e=>"on"+e));for(let n of e)null==pen.fn[n]&&(pen.fn[n]=function(e,...t){return pen.fn.on.call(this,n,e,...t)},pen.fn[n].remove=function(e,...t){return pen.fn.off.call(this,n,e,...t)},pen.fn[n].trigger=function(...e){return pen.fn.fire.call(this,...e)});for(let e of t)l[e]=e,null==pen.fn[e]&&(pen.fn[e]=function(n){return null==n?pen.fn.attr.call(this,e):(pen.fn.attr.call(this,e,n),this)});let r={opler(e,n){if(null!=e.init){if(null==(n=e.init.call(n,n,e)))return;delete e.init}for(let t in l)null!=e[t]&&(n.attr(t,e[t]),delete e[t]);null!=e.src&&"img"===n.tag&&(n.attr("src",e.src),delete e.src),null!=e.attrs&&(n.attr(e.attrs),delete e.attrs),null!=e.text&&(n.html(e.text),delete e.text),null!=e.name&&null!=e.parent&&(e.parent[e.name]=n,delete e.name),null!=e.parent&&null==n.parent&&(n.appendTo(e.parent),delete e.parent);for(let t in e)"returnEl"!==t&&null!=e[t]&&"array"===pen.type(e[t])&&n.on(t,...e[t])},handleChildren(e,n){let t,l,r;for(t of n){if("function"!==(l=pen.type(t)))throw new Error('a "child" must be a function');if(null==(r=t.call(e,e))||!(r instanceof pen))throw new Error("the child must return and must be an instance of pen");null==r.parent&&r.appendTo(e)}},handleChildify(e,n){let t=e.tag||e.el;t=t.startsWith("<")?t:"<"+t,t+=t.endsWith(">")?"":">";let l=null!=n?n.create(t,"child"):pen(t);if(null!=e.attrs&&l.attr(e.attrs),null==e.text&&null==e.html||l.html(e.text||e.html),null!=e.events&&"objects"===pen.type(e.events))for(let n in e.events)l.on(n,...e.events[n]);return e.children&&l.childify(e.children),l}};for(let e of n){let n="<"+e+">";null==pen[e]&&(pen[e]=function(t={},...l){return e=pen(n),r.opler(t,e),r.handleChildren(e,l),e}),null==pen.fn[e]&&(pen.fn[e]=function(t={},...l){return e=this.create(n,"child"),t.parent=null!=t.parent?t.parent:this,r.opler(t,e),r.handleChildren(e,l),null!=t.returnEl&&t.returnEl?e:this})}pen.define=function(e,...n){let t={},l=[];for(let e of n){null==pen[e]&&(pen[e]=function(t={},...l){return e=pen(n),r.opler(t,e),r.handleChildren(e,l),e}),null==pen.fn[e]&&(pen.fn[e]=function(t={},...l){return e=this.create(n,"child"),t.parent=this,r.opler(t,e),r.handleChildren(e,l),null!=t.returnEl&&t.returnEl?e:this});let n="<"+e+">";t[e]={writeable:!1,value(t,...l){let i=pen.insOf(this);return e=i?this.create(n,"child"):pen(n),t.parent=null!=t.parent?t.parent:i?this:null,r.opler(t,e),r.handleChildren(e,l),i?null!=t.returnEl&&t.returnEl?e:this:e}}}if(null!=e.defineIn){if("array"!==type(e.defineIn)&&e.defineIn instanceof pen)l=Object.defineProperties(e.defineIn,t);else for(let n of e.defineIn)l.push(Object.defineProperties(n,t));if(null!=e.onlyDefineIn&&e.onlyDefineIn)return l}},pen.define.isDefined=function(e){return null!=pen[e]&&null!=pen.fn[e]},pen.fn.childify=function(e){for(let n of e)r.handleChildify(n,this);return this},pen.childify=function(e){let n=[];for(let t of e)n.push(r.handleChildify(t));return n.length>1?n:n[0]},pen.fn.eqto=function(e,n){switch(n=n instanceof pen?n.el:n,e){case"this":return this.el===n;case"parent":return this.parent===n;default:return console.warn("Unknown type: "+e+"\nResolving to 'this'"),this.el===n}}}();
