(function (fact) {
  let mw, b, n;
  if (this['process'] != null) {
    b = (x, y) => ({}).toString.call(x).toLowerCase().includes(y);
    mw = (name, t) => {if (!b(name, 'string')) {module.exports = name; return mw} module.exports[name] = t; return mw}
    n = !0;
  }
  if (this['window'] != null) {
    if (window['p'] != null) {b = p.type} else {b = (x, y) => ({}).toString.call(x).toLowerCase().includes(y)}
    mw = (name, t) => {window[name] = t; return mw}
    n = !1;
  }
  fact(mw, b, n);
})(function (mw, b, n) {
  let e;
  e = function Enum (arr) {
    if (!(this instanceof e)) {throw new TypeError("Constructor requires 'new'")}
    if (arr != null && b(arr, 'array')) {this(arr)}
    let m;
    m = function (name, value) {
      if (name == null) {
        return m.valueOf();
      }
      if (b(name, 'array') && name[0].length === 2) {
        name.forEach(n => {m(n[0], n[1])});
        return;
      }
      m.dt[m.dt[name] = value] = name;
      return m;
    }
    m.dt = {}
    m.valueOf = function () {return m.dt}
    m.constructor = e;
    m._enum = function (name, value) {
      this[this[name] = value] = name;
      return this;
    }
    return m
  }
  if (n) {mw(e); return}
  mw('Enum', e);
});
