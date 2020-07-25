// this file is entirely for addons.. like things I've come up with for either, if I've not been able to addinto the mainframe... or
// just some features that will not be on the main. Besides you don't need to do anything complex, just do the usual
// source: https://cdn.jsdelivr.net/gh/Krorenshima/Pen@master/Pen.js
// source: https://cdn.jsdelivr.net/gh/Krorenshima/Pen@master/addons.js
// Of course you can add your own addons as well, just do this format:
/*
by: [your name]
optional: addons: [list of addon(s) name(s) here] (name, [optional] temp|perm (temporary|permanent), [optional] short description)
optional: date & time: mm-dd-yy / hh:mm(optional, ss)
(the code)
end
*/

/* addons:
  by: Krorenshima, includes:
     pen.fn["<event>"], perm, adds events like 'click' and so on to the proto like in jQuery
     pen["<element>"], perm, adds elements like in the original pen addon, which Pen was inspried by
     sort've lazy implementation for these two ^
     eq (equal to), perm, compares the current element, to another element if they're the same
     childify, give an array of children and it'll "render" it as html
*/
(function () {
  let events, elements, attributes, preops, usuals;
  preops = {};
  // add more if you can please, it'd help a lot.
  elements = [
    'p','span','div','a','button','input',
    'h1','h2','h3','h4','h5','h6','hr','b',
    'i','u','img','style','link','meta','br',
    'table','tr','tb','li','ul','template',
    'textarea','video'
  ];
  events = [
    'click','dblclick','error','mouseover','mousemove','mouseup','mousedown','keydown','keyup','keypress','load',
    'mousein','mouseout','dragin','dragout','dragdrop','dragover'
  ];
  attributes = ([
    'style','title','encoding','href','src','rel','target','cols','width','height','align','class','id','type','placeholder'
  ]).concat(events.map(ev => 'on'+ev));

  events.forEach(ev => {
    if (p.fn[ev] != null) {console.warn(`${ev} already exists`); return}
    p.fn[ev] = function (fn, ...args) {return p.fn.on.call(this, ev, fn, ...args)}
    p.fn[ev].remove = function (fn, ...args) {return p.fn.off.call(this, ev, fn, ...args)}
    p.fn[ev].trigger = function (...args) {return p.fn.fire.call(this, ...args)}
  });
  attributes.forEach(atr => {
    preops[atr] = atr;
    if (p.fn[atr] != null) {console.warn(`${atr} already exists`); return}
    p.fn[atr] = function (value) {
      if (value == null) {return p.fn.attr.call(this, atr)}
      p.fn.attr.call(this, atr, value);
      return this
    }
  });
  usuals = {
    opler (ops, el) {
      if (ops.init != null) {
        el = ops.init.call(el, el, ops);
        if (el == null) {return}
        delete ops.init;
      }
      for (let pref in preops) {
        if (ops[pref] != null) {
          el.attr(pref, ops[pref]);
          delete ops[pref];
        }
      }
      if (ops['src'] != null && el.tag === 'img') {el.attr('src', ops.src); delete ops.src;}
      if (ops['attrs'] != null) {el.attr(ops.attrs); delete ops.attrs}
      if (ops['text'] != null) {el.html(ops.text); delete ops.text}
      if ((ops['name'] && ops['parent']) != null) {ops.parent[ops.name] = el;delete ops.name}
      if (ops['parent'] != null && el.parent == null) {
        el.appendTo(ops.parent); delete ops.parent
      }
      for (let prof in ops) {
        if (prof === 'returnEl') {continue}
        if ((ops[prof] != null) && p.type(ops[prof], 'array')) {
          el.on(prof, ...ops[prof]);
        }
      }
      return this;
    },
    handleChildren (it, children) {
      let child, type, comeback;
      children.forEach(child => {
        type = p.type(child);
        if (type !== 'function') {throw new TypeError('Not a function.')}
        comeback = child.call(it, it);
        if (comeback == null || !(comeback instanceof p)) {throw new TypeError('Return must be a child and instance of p')}
        if (comeback.parent == null) {comeback.appendTo(it)}
      });
    }, handleChildify (child, parent) {
      let tg, el;
      tg = child.tag || child.el;
      tg = `${!tg.startsWith('<') ? '<' : ''}${tg}${!tg.endsWith('>') ? '>' : ''}`;
      el = parent != null ? parent.create(tg, 'child') : p(tg);
      if (child['attrs'] != null) {el.attr(child.attrs)}
      if ((child['text'] || child['html']) != null) {el.html(child.text || child.html)}
      if ((child['events'] != null) && p.type(child.events, 'object')) {for (let eventl in child.events) {el.on(eventl, ...child.events[eventl])}}
      if (child.children) {el.childify(child.children)}
      return el;
    }
  }
  p._define = function () {
    let ops1, el, args;
    args = [].slice.call(arguments);
    ops1 = args[0]; el = args[1];

    if (ops1 == null) {throw new ReferenceError('Arg #1 must be defined.')}
    if (!p.type(ops1, 'object')) {throw new ReferenceError('Arg #1 is not an object')}
    let def, olp, zul;
    def = {}, olp;
    if (ops1['onlyDefineIn'] == null) {ops1.onlyDefineIn = !1}
    if (!ops1.onlyDefineIn && ops1['defineIn'] != null) {
      throw new Error('Conflicting arguments, \'defineIn\' can\'t be defined if \'onlyDefineIn\' is false')
    }

    if (!ops1.onlyDefineIn) {
      if (p[el] == null) {
        p[el] = function () {
          let args1 = [].slice.call(arguments);
          if (p.type(args1[0],'array') && p.type(args1[0][0][0], 'object')) {
            for (let i = 0, len = args1[0].length; i < len; i++) {
              let arg = args1[0][i];
              this[el](...arg);
            }
          }
          let ops, childrn, oel, pel;
          if (p.type(args1[0], 'array')) {return this}
          oel = `<${el}>`; ops = args[0]; childrn = args1.slice(1); pel = p(oel);
          usuals.opler(ops, pel).handleChildren(pel, childrn);
          return pel
        }
      }
      if (p.fn[el] == null) {
        p.fn[el] = function () {
          let args1 = [].slice.call(arguments);
          if (p.type(args1[0],'array') && p.type(args1[0][0][0], 'object')) {
            for (let i = 0, len = args1[0].length; i < len; i++) {
              let arg = args1[0][i];
              this[el](...arg);
            }
          }
          let ops, childrn, oel, pel;
          if (p.type(args1[0], 'array')) {return this}
          oel = `<${el}>`; ops = args1[0]; childrn = args1.slice(1); pel = this.create(oel, 'child');
          ops.parent = ops.parent != null ? ops.parent : this;
          usuals.opler(ops, pel).handleChildren(pel, childrn);
          return (ops.returnEl != null) && ops.returnEl ? pel : this;
        }
      }
    }
    if (p.type(args[3], 'number')) {
      return p.define(...args);
    }
  }
  p.define = function () {
    let args = [].slice.call(arguments);
    if (p.type(args[1],'array')) {
      let pos; pos = 0;
      p.define(args[0], args[1][pos], args[1], pos);
      pos += 1;
      return this;
    }
    if (p.type(args[3], 'number')) {
      if (args[3] >= args[2].length) {return this}
      let pos, oar;
      ([oar, pos] = args.slice(-2));
      pos += 1;
      p._define(args[0], oar[pos], oar, pos);
      return;
    }
  }
  p.define.isDefined = function (def) {return p[def] != null && p.fn[def] != null}
  p.define({}, elements);
  p.fn.childify = function (children) {children.forEach(child => {usuals.handleChildify(child, this)}); return this}
  p.childify = function (children) {let res; res = children.map(child => usuals.handleChildify(child)); return res.length > 1 ? res : res.pop()}
  p.fn.eqto = function (typ, el) {
    el = p.inst(el);
    switch (typ) {
      case 'this': return this.el === el;
      case 'parent': return this.parent === el;
      default:
        console.warn(`Unknown type: ${typ}\nResolving to ${this}`);
        return this.el === el;
    }
  }
})();
// end
