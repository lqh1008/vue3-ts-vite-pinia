'use strict'
function e(e, t) {
  const n = Object.create(null),
    o = e.split(',')
  for (let s = 0; s < o.length; s++) n[o[s]] = !0
  return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e]
}
Object.defineProperties(exports, {
  __esModule: { value: !0 },
  [Symbol.toStringTag]: { value: 'Module' }
})
const t = e(
  'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly'
)
function n(e) {
  return !!e || '' === e
}
function o(e) {
  if (y(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = w(s) ? l(s) : o(s)
      if (r) for (const e in r) t[e] = r[e]
    }
    return t
  }
  return w(e) || S(e) ? e : void 0
}
const s = /;(?![^(]*\))/g,
  r = /:(.+)/
function l(e) {
  const t = {}
  return (
    e.split(s).forEach((e) => {
      if (e) {
        const n = e.split(r)
        n.length > 1 && (t[n[0].trim()] = n[1].trim())
      }
    }),
    t
  )
}
function i(e) {
  let t = ''
  if (w(e)) t = e
  else if (y(e))
    for (let n = 0; n < e.length; n++) {
      const o = i(e[n])
      o && (t += o + ' ')
    }
  else if (S(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const c = {},
  u = [],
  a = () => {},
  f = () => !1,
  p = /^on[^a-z]/,
  d = (e) => p.test(e),
  h = (e) => e.startsWith('onUpdate:'),
  v = Object.assign,
  g = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  _ = Object.prototype.hasOwnProperty,
  m = (e, t) => _.call(e, t),
  y = Array.isArray,
  b = (e) => '[object Map]' === P(e),
  x = (e) => 'function' == typeof e,
  w = (e) => 'string' == typeof e,
  C = (e) => 'symbol' == typeof e,
  S = (e) => null !== e && 'object' == typeof e,
  k = (e) => S(e) && x(e.then) && x(e.catch),
  O = Object.prototype.toString,
  P = (e) => O.call(e),
  E = (e) => w(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
  F = e(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  A = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  R = /-(\w)/g,
  j = A((e) => e.replace(R, (e, t) => (t ? t.toUpperCase() : ''))),
  M = /\B([A-Z])/g,
  T = A((e) => e.replace(M, '-$1').toLowerCase()),
  N = A((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  V = A((e) => (e ? `on${N(e)}` : '')),
  $ = (e, t) => !Object.is(e, t),
  U = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  I = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  L = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let B
let D
class W {
  constructor(e = !1) {
    ;(this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !e &&
        D &&
        ((this.parent = D),
        (this.index = (D.scopes || (D.scopes = [])).push(this) - 1))
  }
  run(e) {
    if (this.active)
      try {
        return (D = this), e()
      } finally {
        D = this.parent
      }
  }
  on() {
    D = this
  }
  off() {
    D = this.parent
  }
  stop(e) {
    if (this.active) {
      let t, n
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop()
      for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]()
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0)
      if (this.parent && !e) {
        const e = this.parent.scopes.pop()
        e &&
          e !== this &&
          ((this.parent.scopes[this.index] = e), (e.index = this.index))
      }
      this.active = !1
    }
  }
}
const z = (e) => {
    const t = new Set(e)
    return (t.w = 0), (t.n = 0), t
  },
  H = (e) => (e.w & G) > 0,
  K = (e) => (e.n & G) > 0,
  Y = new WeakMap()
let q = 0,
  G = 1
let X
const Z = Symbol(''),
  J = Symbol('')
class Q {
  constructor(e, t = null, n) {
    ;(this.fn = e),
      (this.scheduler = t),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      (function (e, t = D) {
        t && t.active && t.effects.push(e)
      })(this, n)
  }
  run() {
    if (!this.active) return this.fn()
    let e = X,
      t = te
    for (; e; ) {
      if (e === this) return
      e = e.parent
    }
    try {
      return (
        (this.parent = X),
        (X = this),
        (te = !0),
        (G = 1 << ++q),
        q <= 30
          ? (({ deps: e }) => {
              if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= G
            })(this)
          : ee(this),
        this.fn()
      )
    } finally {
      q <= 30 &&
        ((e) => {
          const { deps: t } = e
          if (t.length) {
            let n = 0
            for (let o = 0; o < t.length; o++) {
              const s = t[o]
              H(s) && !K(s) ? s.delete(e) : (t[n++] = s),
                (s.w &= ~G),
                (s.n &= ~G)
            }
            t.length = n
          }
        })(this),
        (G = 1 << --q),
        (X = this.parent),
        (te = t),
        (this.parent = void 0)
    }
  }
  stop() {
    this.active && (ee(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function ee(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let te = !0
const ne = []
function oe() {
  ne.push(te), (te = !1)
}
function se() {
  const e = ne.pop()
  te = void 0 === e || e
}
function re(e, t, n) {
  if (te && X) {
    let t = Y.get(e)
    t || Y.set(e, (t = new Map()))
    let o = t.get(n)
    o || t.set(n, (o = z())), le(o)
  }
}
function le(e, t) {
  let n = !1
  q <= 30 ? K(e) || ((e.n |= G), (n = !H(e))) : (n = !e.has(X)),
    n && (e.add(X), X.deps.push(e))
}
function ie(e, t, n, o, s, r) {
  const l = Y.get(e)
  if (!l) return
  let i = []
  if ('clear' === t) i = [...l.values()]
  else if ('length' === n && y(e))
    l.forEach((e, t) => {
      ;('length' === t || t >= o) && i.push(e)
    })
  else
    switch ((void 0 !== n && i.push(l.get(n)), t)) {
      case 'add':
        y(e)
          ? E(n) && i.push(l.get('length'))
          : (i.push(l.get(Z)), b(e) && i.push(l.get(J)))
        break
      case 'delete':
        y(e) || (i.push(l.get(Z)), b(e) && i.push(l.get(J)))
        break
      case 'set':
        b(e) && i.push(l.get(Z))
    }
  if (1 === i.length) i[0] && ce(i[0])
  else {
    const e = []
    for (const t of i) t && e.push(...t)
    ce(z(e))
  }
}
function ce(e, t) {
  for (const n of y(e) ? e : [...e])
    (n !== X || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run())
}
const ue = e('__proto__,__v_isRef,__isVue'),
  ae = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(C)
  ),
  fe = ge(),
  pe = ge(!1, !0),
  de = ge(!0),
  he = ve()
function ve() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...e) {
        const n = et(this)
        for (let t = 0, s = this.length; t < s; t++) re(n, 0, t + '')
        const o = n[t](...e)
        return -1 === o || !1 === o ? n[t](...e.map(et)) : o
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...e) {
        oe()
        const n = et(this)[t].apply(this, e)
        return se(), n
      }
    }),
    e
  )
}
function ge(e = !1, t = !1) {
  return function (n, o, s) {
    if ('__v_isReactive' === o) return !e
    if ('__v_isReadonly' === o) return e
    if ('__v_isShallow' === o) return t
    if ('__v_raw' === o && s === (e ? (t ? He : ze) : t ? We : De).get(n))
      return n
    const r = y(n)
    if (!e && r && m(he, o)) return Reflect.get(he, o, s)
    const l = Reflect.get(n, o, s)
    if (C(o) ? ae.has(o) : ue(o)) return l
    if ((e || re(n, 0, o), t)) return l
    if (lt(l)) {
      return !r || !E(o) ? l.value : l
    }
    return S(l) ? (e ? qe(l) : Ye(l)) : l
  }
}
function _e(e = !1) {
  return function (t, n, o, s) {
    let r = t[n]
    if (Ze(r) && lt(r) && !lt(o)) return !1
    if (
      !e &&
      !Ze(o) &&
      (Je(o) || ((o = et(o)), (r = et(r))), !y(t) && lt(r) && !lt(o))
    )
      return (r.value = o), !0
    const l = y(t) && E(n) ? Number(n) < t.length : m(t, n),
      i = Reflect.set(t, n, o, s)
    return (
      t === et(s) && (l ? $(o, r) && ie(t, 'set', n, o) : ie(t, 'add', n, o)), i
    )
  }
}
const me = {
    get: fe,
    set: _e(),
    deleteProperty: function (e, t) {
      const n = m(e, t)
      e[t]
      const o = Reflect.deleteProperty(e, t)
      return o && n && ie(e, 'delete', t, void 0), o
    },
    has: function (e, t) {
      const n = Reflect.has(e, t)
      return (C(t) && ae.has(t)) || re(e, 0, t), n
    },
    ownKeys: function (e) {
      return re(e, 0, y(e) ? 'length' : Z), Reflect.ownKeys(e)
    }
  },
  ye = { get: de, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
  be = v({}, me, { get: pe, set: _e(!0) }),
  xe = (e) => e,
  we = (e) => Reflect.getPrototypeOf(e)
function Ce(e, t, n = !1, o = !1) {
  const s = et((e = e.__v_raw)),
    r = et(t)
  t !== r && !n && re(s, 0, t), !n && re(s, 0, r)
  const { has: l } = we(s),
    i = o ? xe : n ? ot : nt
  return l.call(s, t)
    ? i(e.get(t))
    : l.call(s, r)
    ? i(e.get(r))
    : void (e !== s && e.get(t))
}
function Se(e, t = !1) {
  const n = this.__v_raw,
    o = et(n),
    s = et(e)
  return (
    e !== s && !t && re(o, 0, e),
    !t && re(o, 0, s),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  )
}
function ke(e, t = !1) {
  return (e = e.__v_raw), !t && re(et(e), 0, Z), Reflect.get(e, 'size', e)
}
function Oe(e) {
  e = et(e)
  const t = et(this)
  return we(t).has.call(t, e) || (t.add(e), ie(t, 'add', e, e)), this
}
function Pe(e, t) {
  t = et(t)
  const n = et(this),
    { has: o, get: s } = we(n)
  let r = o.call(n, e)
  r || ((e = et(e)), (r = o.call(n, e)))
  const l = s.call(n, e)
  return (
    n.set(e, t), r ? $(t, l) && ie(n, 'set', e, t) : ie(n, 'add', e, t), this
  )
}
function Ee(e) {
  const t = et(this),
    { has: n, get: o } = we(t)
  let s = n.call(t, e)
  s || ((e = et(e)), (s = n.call(t, e))), o && o.call(t, e)
  const r = t.delete(e)
  return s && ie(t, 'delete', e, void 0), r
}
function Fe() {
  const e = et(this),
    t = 0 !== e.size,
    n = e.clear()
  return t && ie(e, 'clear', void 0, void 0), n
}
function Ae(e, t) {
  return function (n, o) {
    const s = this,
      r = s.__v_raw,
      l = et(r),
      i = t ? xe : e ? ot : nt
    return !e && re(l, 0, Z), r.forEach((e, t) => n.call(o, i(e), i(t), s))
  }
}
function Re(e, t, n) {
  return function (...o) {
    const s = this.__v_raw,
      r = et(s),
      l = b(r),
      i = 'entries' === e || (e === Symbol.iterator && l),
      c = 'keys' === e && l,
      u = s[e](...o),
      a = n ? xe : t ? ot : nt
    return (
      !t && re(r, 0, c ? J : Z),
      {
        next() {
          const { value: e, done: t } = u.next()
          return t
            ? { value: e, done: t }
            : { value: i ? [a(e[0]), a(e[1])] : a(e), done: t }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function je(e) {
  return function (...t) {
    return 'delete' !== e && this
  }
}
function Me() {
  const e = {
      get(e) {
        return Ce(this, e)
      },
      get size() {
        return ke(this)
      },
      has: Se,
      add: Oe,
      set: Pe,
      delete: Ee,
      clear: Fe,
      forEach: Ae(!1, !1)
    },
    t = {
      get(e) {
        return Ce(this, e, !1, !0)
      },
      get size() {
        return ke(this)
      },
      has: Se,
      add: Oe,
      set: Pe,
      delete: Ee,
      clear: Fe,
      forEach: Ae(!1, !0)
    },
    n = {
      get(e) {
        return Ce(this, e, !0)
      },
      get size() {
        return ke(this, !0)
      },
      has(e) {
        return Se.call(this, e, !0)
      },
      add: je('add'),
      set: je('set'),
      delete: je('delete'),
      clear: je('clear'),
      forEach: Ae(!0, !1)
    },
    o = {
      get(e) {
        return Ce(this, e, !0, !0)
      },
      get size() {
        return ke(this, !0)
      },
      has(e) {
        return Se.call(this, e, !0)
      },
      add: je('add'),
      set: je('set'),
      delete: je('delete'),
      clear: je('clear'),
      forEach: Ae(!0, !0)
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
      ;(e[s] = Re(s, !1, !1)),
        (n[s] = Re(s, !0, !1)),
        (t[s] = Re(s, !1, !0)),
        (o[s] = Re(s, !0, !0))
    }),
    [e, n, t, o]
  )
}
const [Te, Ne, Ve, $e] = Me()
function Ue(e, t) {
  const n = t ? (e ? $e : Ve) : e ? Ne : Te
  return (t, o, s) =>
    '__v_isReactive' === o
      ? !e
      : '__v_isReadonly' === o
      ? e
      : '__v_raw' === o
      ? t
      : Reflect.get(m(n, o) && o in t ? n : t, o, s)
}
const Ie = { get: Ue(!1, !1) },
  Le = { get: Ue(!1, !0) },
  Be = { get: Ue(!0, !1) },
  De = new WeakMap(),
  We = new WeakMap(),
  ze = new WeakMap(),
  He = new WeakMap()
function Ke(e) {
  return e.__v_skip || !Object.isExtensible(e)
    ? 0
    : (function (e) {
        switch (e) {
          case 'Object':
          case 'Array':
            return 1
          case 'Map':
          case 'Set':
          case 'WeakMap':
          case 'WeakSet':
            return 2
          default:
            return 0
        }
      })(((e) => P(e).slice(8, -1))(e))
}
function Ye(e) {
  return Ze(e) ? e : Ge(e, !1, me, Ie, De)
}
function qe(e) {
  return Ge(e, !0, ye, Be, ze)
}
function Ge(e, t, n, o, s) {
  if (!S(e)) return e
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e
  const r = s.get(e)
  if (r) return r
  const l = Ke(e)
  if (0 === l) return e
  const i = new Proxy(e, 2 === l ? o : n)
  return s.set(e, i), i
}
function Xe(e) {
  return Ze(e) ? Xe(e.__v_raw) : !(!e || !e.__v_isReactive)
}
function Ze(e) {
  return !(!e || !e.__v_isReadonly)
}
function Je(e) {
  return !(!e || !e.__v_isShallow)
}
function Qe(e) {
  return Xe(e) || Ze(e)
}
function et(e) {
  const t = e && e.__v_raw
  return t ? et(t) : e
}
function tt(e) {
  return I(e, '__v_skip', !0), e
}
const nt = (e) => (S(e) ? Ye(e) : e),
  ot = (e) => (S(e) ? qe(e) : e)
function st(e) {
  te && X && le((e = et(e)).dep || (e.dep = z()))
}
function rt(e, t) {
  ;(e = et(e)).dep && ce(e.dep)
}
function lt(e) {
  return !(!e || !0 !== e.__v_isRef)
}
function it(e) {
  return (function (e, t) {
    if (lt(e)) return e
    return new ct(e, t)
  })(e, !1)
}
class ct {
  constructor(e, t) {
    ;(this.__v_isShallow = t),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = t ? e : et(e)),
      (this._value = t ? e : nt(e))
  }
  get value() {
    return st(this), this._value
  }
  set value(e) {
    ;(e = this.__v_isShallow ? e : et(e)),
      $(e, this._rawValue) &&
        ((this._rawValue = e),
        (this._value = this.__v_isShallow ? e : nt(e)),
        rt(this))
  }
}
const ut = {
  get: (e, t, n) => {
    return lt((o = Reflect.get(e, t, n))) ? o.value : o
    var o
  },
  set: (e, t, n, o) => {
    const s = e[t]
    return lt(s) && !lt(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, o)
  }
}
function at(e) {
  return Xe(e) ? e : new Proxy(e, ut)
}
class ft {
  constructor(e, t, n, o) {
    ;(this._setter = t),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new Q(e, () => {
        this._dirty || ((this._dirty = !0), rt(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = n)
  }
  get value() {
    const e = et(this)
    return (
      st(e),
      (!e._dirty && e._cacheable) ||
        ((e._dirty = !1), (e._value = e.effect.run())),
      e._value
    )
  }
  set value(e) {
    this._setter(e)
  }
}
function pt(e, t, n, o) {
  let s
  try {
    s = o ? e(...o) : e()
  } catch (r) {
    ht(r, t, n)
  }
  return s
}
function dt(e, t, n, o) {
  if (x(e)) {
    const s = pt(e, t, n, o)
    return (
      s &&
        k(s) &&
        s.catch((e) => {
          ht(e, t, n)
        }),
      s
    )
  }
  const s = []
  for (let r = 0; r < e.length; r++) s.push(dt(e[r], t, n, o))
  return s
}
function ht(e, t, n, o = !0) {
  t && t.vnode
  if (t) {
    let o = t.parent
    const s = t.proxy,
      r = n
    for (; o; ) {
      const t = o.ec
      if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, s, r)) return
      o = o.parent
    }
    const l = t.appContext.config.errorHandler
    if (l) return void pt(l, null, 10, [e, s, r])
  }
  !(function (e, t, n, o = !0) {
    console.error(e)
  })(e, 0, 0, o)
}
Promise.resolve()
let vt = !1,
  gt = !1
const _t = []
let mt = 0
const yt = []
let bt = null,
  xt = 0
const wt = []
let Ct = null,
  St = 0
const kt = Promise.resolve()
let Ot = null,
  Pt = null
function Et(e) {
  const t = Ot || kt
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Ft(e) {
  ;(_t.length && _t.includes(e, vt && e.allowRecurse ? mt + 1 : mt)) ||
    e === Pt ||
    (null == e.id
      ? _t.push(e)
      : _t.splice(
          (function (e) {
            let t = mt + 1,
              n = _t.length
            for (; t < n; ) {
              const o = (t + n) >>> 1
              Tt(_t[o]) < e ? (t = o + 1) : (n = o)
            }
            return t
          })(e.id),
          0,
          e
        ),
    At())
}
function At() {
  vt || gt || ((gt = !0), (Ot = kt.then(Nt)))
}
function Rt(e, t, n, o) {
  y(e)
    ? n.push(...e)
    : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) || n.push(e),
    At()
}
function jt(e, t = null) {
  if (yt.length) {
    for (
      Pt = t, bt = [...new Set(yt)], yt.length = 0, xt = 0;
      xt < bt.length;
      xt++
    )
      bt[xt]()
    ;(bt = null), (xt = 0), (Pt = null), jt(e, t)
  }
}
function Mt(e) {
  if (wt.length) {
    const e = [...new Set(wt)]
    if (((wt.length = 0), Ct)) return void Ct.push(...e)
    for (Ct = e, Ct.sort((e, t) => Tt(e) - Tt(t)), St = 0; St < Ct.length; St++)
      Ct[St]()
    ;(Ct = null), (St = 0)
  }
}
const Tt = (e) => (null == e.id ? 1 / 0 : e.id)
function Nt(e) {
  ;(gt = !1), (vt = !0), jt(e), _t.sort((e, t) => Tt(e) - Tt(t))
  try {
    for (mt = 0; mt < _t.length; mt++) {
      const e = _t[mt]
      e && !1 !== e.active && pt(e, null, 14)
    }
  } finally {
    ;(mt = 0),
      (_t.length = 0),
      Mt(),
      (vt = !1),
      (Ot = null),
      (_t.length || yt.length || wt.length) && Nt(e)
  }
}
function Vt(e, t, ...n) {
  const o = e.vnode.props || c
  let s = n
  const r = t.startsWith('update:'),
    l = r && t.slice(7)
  if (l && l in o) {
    const e = `${'modelValue' === l ? 'model' : l}Modifiers`,
      { number: t, trim: r } = o[e] || c
    r ? (s = n.map((e) => e.trim())) : t && (s = n.map(L))
  }
  let i,
    u = o[(i = V(t))] || o[(i = V(j(t)))]
  !u && r && (u = o[(i = V(T(t)))]), u && dt(u, e, 6, s)
  const a = o[i + 'Once']
  if (a) {
    if (e.emitted) {
      if (e.emitted[i]) return
    } else e.emitted = {}
    ;(e.emitted[i] = !0), dt(a, e, 6, s)
  }
}
function $t(e, t, n = !1) {
  const o = t.emitsCache,
    s = o.get(e)
  if (void 0 !== s) return s
  const r = e.emits
  let l = {},
    i = !1
  if (!x(e)) {
    const o = (e) => {
      const n = $t(e, t, !0)
      n && ((i = !0), v(l, n))
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  return r || i
    ? (y(r) ? r.forEach((e) => (l[e] = null)) : v(l, r), o.set(e, l), l)
    : (o.set(e, null), null)
}
function Ut(e, t) {
  return (
    !(!e || !d(t)) &&
    ((t = t.slice(2).replace(/Once$/, '')),
    m(e, t[0].toLowerCase() + t.slice(1)) || m(e, T(t)) || m(e, t))
  )
}
let It = null,
  Lt = null
function Bt(e) {
  const t = It
  return (It = e), (Lt = (e && e.type.__scopeId) || null), t
}
function Dt(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    props: r,
    propsOptions: [l],
    slots: i,
    attrs: c,
    emit: u,
    render: a,
    renderCache: f,
    data: p,
    setupState: d,
    ctx: v,
    inheritAttrs: g
  } = e
  let _, m
  const y = Bt(e)
  try {
    if (4 & n.shapeFlag) {
      const e = s || o
      ;(_ = Oo(a.call(e, e, f, r, d, p, v))), (m = c)
    } else {
      const e = t
      0,
        (_ = Oo(
          e.length > 1 ? e(r, { attrs: c, slots: i, emit: u }) : e(r, null)
        )),
        (m = t.props ? c : Wt(c))
    }
  } catch (x) {
    ;(ao.length = 0), ht(x, e, 1), (_ = Co(co))
  }
  let b = _
  if (m && !1 !== g) {
    const e = Object.keys(m),
      { shapeFlag: t } = b
    e.length && 7 & t && (l && e.some(h) && (m = zt(m, l)), (b = So(b, m)))
  }
  return (
    n.dirs && (b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs),
    n.transition && (b.transition = n.transition),
    (_ = b),
    Bt(y),
    _
  )
}
const Wt = (e) => {
    let t
    for (const n in e)
      ('class' === n || 'style' === n || d(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  zt = (e, t) => {
    const n = {}
    for (const o in e) (h(o) && o.slice(9) in t) || (n[o] = e[o])
    return n
  }
function Ht(e, t, n) {
  const o = Object.keys(t)
  if (o.length !== Object.keys(e).length) return !0
  for (let s = 0; s < o.length; s++) {
    const r = o[s]
    if (t[r] !== e[r] && !Ut(n, r)) return !0
  }
  return !1
}
function Kt(e, t, n = !1) {
  const o = No || It
  if (o) {
    const s =
      null == o.parent
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
    if (s && e in s) return s[e]
    if (arguments.length > 1) return n && x(t) ? t.call(o.proxy) : t
  }
}
const Yt = {}
function qt(e, t, n) {
  return Gt(e, t, n)
}
function Gt(
  e,
  t,
  { immediate: n, deep: o, flush: s, onTrack: r, onTrigger: l } = c
) {
  const i = No
  let u,
    f,
    p = !1,
    d = !1
  if (
    (lt(e)
      ? ((u = () => e.value), (p = Je(e)))
      : Xe(e)
      ? ((u = () => e), (o = !0))
      : y(e)
      ? ((d = !0),
        (p = e.some(Xe)),
        (u = () =>
          e.map((e) =>
            lt(e) ? e.value : Xe(e) ? Jt(e) : x(e) ? pt(e, i, 2) : void 0
          )))
      : (u = x(e)
          ? t
            ? () => pt(e, i, 2)
            : () => {
                if (!i || !i.isUnmounted) return f && f(), dt(e, i, 3, [h])
              }
          : a),
    t && o)
  ) {
    const e = u
    u = () => Jt(e())
  }
  let h = (e) => {
    f = b.onStop = () => {
      pt(e, i, 4)
    }
  }
  if (Lo)
    return (h = a), t ? n && dt(t, i, 3, [u(), d ? [] : void 0, h]) : u(), a
  let v = d ? [] : Yt
  const _ = () => {
    if (b.active)
      if (t) {
        const e = b.run()
        ;(o || p || (d ? e.some((e, t) => $(e, v[t])) : $(e, v))) &&
          (f && f(), dt(t, i, 3, [e, v === Yt ? void 0 : v, h]), (v = e))
      } else b.run()
  }
  let m
  ;(_.allowRecurse = !!t),
    (m =
      'sync' === s
        ? _
        : 'post' === s
        ? () => to(_, i && i.suspense)
        : () => {
            !i || i.isMounted
              ? (function (e) {
                  Rt(e, bt, yt, xt)
                })(_)
              : _()
          })
  const b = new Q(u, m)
  return (
    t
      ? n
        ? _()
        : (v = b.run())
      : 'post' === s
      ? to(b.run.bind(b), i && i.suspense)
      : b.run(),
    () => {
      b.stop(), i && i.scope && g(i.scope.effects, b)
    }
  )
}
function Xt(e, t, n) {
  const o = this.proxy,
    s = w(e) ? (e.includes('.') ? Zt(o, e) : () => o[e]) : e.bind(o, o)
  let r
  x(t) ? (r = t) : ((r = t.handler), (n = t))
  const l = No
  $o(this)
  const i = Gt(s, r.bind(o), n)
  return l ? $o(l) : Uo(), i
}
function Zt(e, t) {
  const n = t.split('.')
  return () => {
    let t = e
    for (let e = 0; e < n.length && t; e++) t = t[n[e]]
    return t
  }
}
function Jt(e, t) {
  if (!S(e) || e.__v_skip) return e
  if ((t = t || new Set()).has(e)) return e
  if ((t.add(e), lt(e))) Jt(e.value, t)
  else if (y(e)) for (let n = 0; n < e.length; n++) Jt(e[n], t)
  else if ('[object Set]' === P(e) || b(e))
    e.forEach((e) => {
      Jt(e, t)
    })
  else if (((e) => '[object Object]' === P(e))(e))
    for (const n in e) Jt(e[n], t)
  return e
}
const Qt = [Function, Array]
Boolean, Boolean
function en(e, t) {
  const { leavingVNodes: n } = e
  let o = n.get(t.type)
  return o || ((o = Object.create(null)), n.set(t.type, o)), o
}
function tn(e, t, n, o) {
  const {
      appear: s,
      mode: r,
      persisted: l = !1,
      onBeforeEnter: i,
      onEnter: c,
      onAfterEnter: u,
      onEnterCancelled: a,
      onBeforeLeave: f,
      onLeave: p,
      onAfterLeave: d,
      onLeaveCancelled: h,
      onBeforeAppear: v,
      onAppear: g,
      onAfterAppear: _,
      onAppearCancelled: m
    } = t,
    y = String(e.key),
    b = en(n, e),
    x = (e, t) => {
      e && dt(e, o, 9, t)
    },
    w = {
      mode: r,
      persisted: l,
      beforeEnter(t) {
        let o = i
        if (!n.isMounted) {
          if (!s) return
          o = v || i
        }
        t._leaveCb && t._leaveCb(!0)
        const r = b[y]
        r && mo(e, r) && r.el._leaveCb && r.el._leaveCb(), x(o, [t])
      },
      enter(e) {
        let t = c,
          o = u,
          r = a
        if (!n.isMounted) {
          if (!s) return
          ;(t = g || c), (o = _ || u), (r = m || a)
        }
        let l = !1
        const i = (e._enterCb = (t) => {
          l ||
            ((l = !0),
            x(t ? r : o, [e]),
            w.delayedLeave && w.delayedLeave(),
            (e._enterCb = void 0))
        })
        t ? (t(e, i), t.length <= 1 && i()) : i()
      },
      leave(t, o) {
        const s = String(e.key)
        if ((t._enterCb && t._enterCb(!0), n.isUnmounting)) return o()
        x(f, [t])
        let r = !1
        const l = (t._leaveCb = (n) => {
          r ||
            ((r = !0),
            o(),
            x(n ? h : d, [t]),
            (t._leaveCb = void 0),
            b[s] === e && delete b[s])
        })
        ;(b[s] = e), p ? (p(t, l), p.length <= 1 && l()) : l()
      },
      clone: (e) => tn(e, t, n, o)
    }
  return w
}
function nn(e) {
  if (un(e)) return ((e = So(e)).children = null), e
}
function on(e) {
  return un(e) ? (e.children ? e.children[0] : void 0) : e
}
function sn(e, t) {
  6 & e.shapeFlag && e.component
    ? sn(e.component.subTree, t)
    : 128 & e.shapeFlag
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t)
}
function rn(e, t = !1) {
  let n = [],
    o = 0
  for (let s = 0; s < e.length; s++) {
    const r = e[s]
    r.type === lo
      ? (128 & r.patchFlag && o++, (n = n.concat(rn(r.children, t))))
      : (t || r.type !== co) && n.push(r)
  }
  if (o > 1) for (let s = 0; s < n.length; s++) n[s].patchFlag = -2
  return n
}
function ln(e) {
  return x(e) ? { setup: e, name: e.name } : e
}
const cn = (e) => !!e.type.__asyncLoader,
  un = (e) => e.type.__isKeepAlive
function an(e, t) {
  pn(e, 'a', t)
}
function fn(e, t) {
  pn(e, 'da', t)
}
function pn(e, t, n = No) {
  const o =
    e.__wdc ||
    (e.__wdc = () => {
      let t = n
      for (; t; ) {
        if (t.isDeactivated) return
        t = t.parent
      }
      return e()
    })
  if ((hn(t, o, n), n)) {
    let e = n.parent
    for (; e && e.parent; ) un(e.parent.vnode) && dn(o, t, n, e), (e = e.parent)
  }
}
function dn(e, t, n, o) {
  const s = hn(t, e, o, !0)
  xn(() => {
    g(o[t], s)
  }, n)
}
function hn(e, t, n = No, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return
          oe(), $o(n)
          const s = dt(t, n, e, o)
          return Uo(), se(), s
        })
    return o ? s.unshift(r) : s.push(r), r
  }
}
const vn =
    (e) =>
    (t, n = No) =>
      (!Lo || 'sp' === e) && hn(e, t, n),
  gn = vn('bm'),
  _n = vn('m'),
  mn = vn('bu'),
  yn = vn('u'),
  bn = vn('bum'),
  xn = vn('um'),
  wn = vn('sp'),
  Cn = vn('rtg'),
  Sn = vn('rtc')
function kn(e, t = No) {
  hn('ec', e, t)
}
let On = !0
function Pn(e) {
  const t = An(e),
    n = e.proxy,
    o = e.ctx
  ;(On = !1), t.beforeCreate && En(t.beforeCreate, e, 'bc')
  const {
    data: s,
    computed: r,
    methods: l,
    watch: i,
    provide: c,
    inject: u,
    created: f,
    beforeMount: p,
    mounted: d,
    beforeUpdate: h,
    updated: v,
    activated: g,
    deactivated: _,
    beforeDestroy: m,
    beforeUnmount: b,
    destroyed: w,
    unmounted: C,
    render: k,
    renderTracked: O,
    renderTriggered: P,
    errorCaptured: E,
    serverPrefetch: F,
    expose: A,
    inheritAttrs: R,
    components: j,
    directives: M,
    filters: T
  } = t
  if (
    (u &&
      (function (e, t, n = a, o = !1) {
        y(e) && (e = Tn(e))
        for (const s in e) {
          const n = e[s]
          let r
          ;(r = S(n)
            ? 'default' in n
              ? Kt(n.from || s, n.default, !0)
              : Kt(n.from || s)
            : Kt(n)),
            lt(r) && o
              ? Object.defineProperty(t, s, {
                  enumerable: !0,
                  configurable: !0,
                  get: () => r.value,
                  set: (e) => (r.value = e)
                })
              : (t[s] = r)
        }
      })(u, o, null, e.appContext.config.unwrapInjectedRef),
    l)
  )
    for (const a in l) {
      const e = l[a]
      x(e) && (o[a] = e.bind(n))
    }
  if (s) {
    const t = s.call(n, n)
    S(t) && (e.data = Ye(t))
  }
  if (((On = !0), r))
    for (const y in r) {
      const e = r[y],
        t = x(e) ? e.bind(n, n) : x(e.get) ? e.get.bind(n, n) : a,
        s = !x(e) && x(e.set) ? e.set.bind(n) : a,
        l = zo({ get: t, set: s })
      Object.defineProperty(o, y, {
        enumerable: !0,
        configurable: !0,
        get: () => l.value,
        set: (e) => (l.value = e)
      })
    }
  if (i) for (const a in i) Fn(i[a], o, n, a)
  if (c) {
    const e = x(c) ? c.call(n) : c
    Reflect.ownKeys(e).forEach((t) => {
      !(function (e, t) {
        if (No) {
          let n = No.provides
          const o = No.parent && No.parent.provides
          o === n && (n = No.provides = Object.create(o)), (n[e] = t)
        }
      })(t, e[t])
    })
  }
  function N(e, t) {
    y(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n))
  }
  if (
    (f && En(f, e, 'c'),
    N(gn, p),
    N(_n, d),
    N(mn, h),
    N(yn, v),
    N(an, g),
    N(fn, _),
    N(kn, E),
    N(Sn, O),
    N(Cn, P),
    N(bn, b),
    N(xn, C),
    N(wn, F),
    y(A))
  )
    if (A.length) {
      const t = e.exposed || (e.exposed = {})
      A.forEach((e) => {
        Object.defineProperty(t, e, { get: () => n[e], set: (t) => (n[e] = t) })
      })
    } else e.exposed || (e.exposed = {})
  k && e.render === a && (e.render = k),
    null != R && (e.inheritAttrs = R),
    j && (e.components = j),
    M && (e.directives = M)
}
function En(e, t, n) {
  dt(y(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Fn(e, t, n, o) {
  const s = o.includes('.') ? Zt(n, o) : () => n[o]
  if (w(e)) {
    const n = t[e]
    x(n) && qt(s, n)
  } else if (x(e)) qt(s, e.bind(n))
  else if (S(e))
    if (y(e)) e.forEach((e) => Fn(e, t, n, o))
    else {
      const o = x(e.handler) ? e.handler.bind(n) : t[e.handler]
      x(o) && qt(s, o, e)
    }
}
function An(e) {
  const t = e.type,
    { mixins: n, extends: o } = t,
    {
      mixins: s,
      optionsCache: r,
      config: { optionMergeStrategies: l }
    } = e.appContext,
    i = r.get(t)
  let c
  return (
    i
      ? (c = i)
      : s.length || n || o
      ? ((c = {}), s.length && s.forEach((e) => Rn(c, e, l, !0)), Rn(c, t, l))
      : (c = t),
    r.set(t, c),
    c
  )
}
function Rn(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t
  r && Rn(e, r, n, !0), s && s.forEach((t) => Rn(e, t, n, !0))
  for (const l in t)
    if (o && 'expose' === l);
    else {
      const o = jn[l] || (n && n[l])
      e[l] = o ? o(e[l], t[l]) : t[l]
    }
  return e
}
const jn = {
  data: Mn,
  props: Vn,
  emits: Vn,
  methods: Vn,
  computed: Vn,
  beforeCreate: Nn,
  created: Nn,
  beforeMount: Nn,
  mounted: Nn,
  beforeUpdate: Nn,
  updated: Nn,
  beforeDestroy: Nn,
  beforeUnmount: Nn,
  destroyed: Nn,
  unmounted: Nn,
  activated: Nn,
  deactivated: Nn,
  errorCaptured: Nn,
  serverPrefetch: Nn,
  components: Vn,
  directives: Vn,
  watch: function (e, t) {
    if (!e) return t
    if (!t) return e
    const n = v(Object.create(null), e)
    for (const o in t) n[o] = Nn(e[o], t[o])
    return n
  },
  provide: Mn,
  inject: function (e, t) {
    return Vn(Tn(e), Tn(t))
  }
}
function Mn(e, t) {
  return t
    ? e
      ? function () {
          return v(x(e) ? e.call(this, this) : e, x(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function Tn(e) {
  if (y(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function Nn(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Vn(e, t) {
  return e ? v(v(Object.create(null), e), t) : t
}
function $n(e, t, n, o = !1) {
  const s = {},
    r = {}
  I(r, yo, 1), (e.propsDefaults = Object.create(null)), Un(e, t, s, r)
  for (const l in e.propsOptions[0]) l in s || (s[l] = void 0)
  n
    ? (e.props = o ? s : Ge(s, !1, be, Le, We))
    : e.type.props
    ? (e.props = s)
    : (e.props = r),
    (e.attrs = r)
}
function Un(e, t, n, o) {
  const [s, r] = e.propsOptions
  let l,
    i = !1
  if (t)
    for (let c in t) {
      if (F(c)) continue
      const u = t[c]
      let a
      s && m(s, (a = j(c)))
        ? r && r.includes(a)
          ? ((l || (l = {}))[a] = u)
          : (n[a] = u)
        : Ut(e.emitsOptions, c) ||
          (c in o && u === o[c]) ||
          ((o[c] = u), (i = !0))
    }
  if (r) {
    const t = et(n),
      o = l || c
    for (let l = 0; l < r.length; l++) {
      const i = r[l]
      n[i] = In(s, t, i, o[i], e, !m(o, i))
    }
  }
  return i
}
function In(e, t, n, o, s, r) {
  const l = e[n]
  if (null != l) {
    const e = m(l, 'default')
    if (e && void 0 === o) {
      const e = l.default
      if (l.type !== Function && x(e)) {
        const { propsDefaults: r } = s
        n in r ? (o = r[n]) : ($o(s), (o = r[n] = e.call(null, t)), Uo())
      } else o = e
    }
    l[0] && (r && !e ? (o = !1) : !l[1] || ('' !== o && o !== T(n)) || (o = !0))
  }
  return o
}
function Ln(e, t, n = !1) {
  const o = t.propsCache,
    s = o.get(e)
  if (s) return s
  const r = e.props,
    l = {},
    i = []
  let a = !1
  if (!x(e)) {
    const o = (e) => {
      a = !0
      const [n, o] = Ln(e, t, !0)
      v(l, n), o && i.push(...o)
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  if (!r && !a) return o.set(e, u), u
  if (y(r))
    for (let u = 0; u < r.length; u++) {
      const e = j(r[u])
      Bn(e) && (l[e] = c)
    }
  else if (r)
    for (const c in r) {
      const e = j(c)
      if (Bn(e)) {
        const t = r[c],
          n = (l[e] = y(t) || x(t) ? { type: t } : t)
        if (n) {
          const t = zn(Boolean, n.type),
            o = zn(String, n.type)
          ;(n[0] = t > -1),
            (n[1] = o < 0 || t < o),
            (t > -1 || m(n, 'default')) && i.push(e)
        }
      }
    }
  const f = [l, i]
  return o.set(e, f), f
}
function Bn(e) {
  return '$' !== e[0]
}
function Dn(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/)
  return t ? t[1] : null === e ? 'null' : ''
}
function Wn(e, t) {
  return Dn(e) === Dn(t)
}
function zn(e, t) {
  return y(t) ? t.findIndex((t) => Wn(t, e)) : x(t) && Wn(t, e) ? 0 : -1
}
const Hn = (e) => '_' === e[0] || '$stable' === e,
  Kn = (e) => (y(e) ? e.map(Oo) : [Oo(e)]),
  Yn = (e, t, n) => {
    const o = (function (e, t = It, n) {
      if (!t) return e
      if (e._n) return e
      const o = (...n) => {
        o._d && vo(-1)
        const s = Bt(t),
          r = e(...n)
        return Bt(s), o._d && vo(1), r
      }
      return (o._n = !0), (o._c = !0), (o._d = !0), o
    })((...e) => Kn(t(...e)), n)
    return (o._c = !1), o
  },
  qn = (e, t, n) => {
    const o = e._ctx
    for (const s in e) {
      if (Hn(s)) continue
      const n = e[s]
      if (x(n)) t[s] = Yn(0, n, o)
      else if (null != n) {
        const e = Kn(n)
        t[s] = () => e
      }
    }
  },
  Gn = (e, t) => {
    const n = Kn(t)
    e.slots.default = () => n
  }
function Xn(e, t, n, o) {
  const s = e.dirs,
    r = t && t.dirs
  for (let l = 0; l < s.length; l++) {
    const i = s[l]
    r && (i.oldValue = r[l].value)
    let c = i.dir[o]
    c && (oe(), dt(c, n, 8, [e.el, i, e, t]), se())
  }
}
function Zn() {
  return {
    app: null,
    config: {
      isNativeTag: f,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let Jn = 0
function Qn(e, t) {
  return function (n, o = null) {
    null == o || S(o) || (o = null)
    const s = Zn(),
      r = new Set()
    let l = !1
    const i = (s.app = {
      _uid: Jn++,
      _component: n,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Ho,
      get config() {
        return s.config
      },
      set config(e) {},
      use: (e, ...t) => (
        r.has(e) ||
          (e && x(e.install)
            ? (r.add(e), e.install(i, ...t))
            : x(e) && (r.add(e), e(i, ...t))),
        i
      ),
      mixin: (e) => (s.mixins.includes(e) || s.mixins.push(e), i),
      component: (e, t) => (t ? ((s.components[e] = t), i) : s.components[e]),
      directive: (e, t) => (t ? ((s.directives[e] = t), i) : s.directives[e]),
      mount(r, c, u) {
        if (!l) {
          const a = Co(n, o)
          return (
            (a.appContext = s),
            c && t ? t(a, r) : e(a, r, u),
            (l = !0),
            (i._container = r),
            (r.__vue_app__ = i),
            Wo(a.component) || a.component.proxy
          )
        }
      },
      unmount() {
        l && (e(null, i._container), delete i._container.__vue_app__)
      },
      provide: (e, t) => ((s.provides[e] = t), i)
    })
    return i
  }
}
function eo(e, t, n, o, s = !1) {
  if (y(e))
    return void e.forEach((e, r) => eo(e, t && (y(t) ? t[r] : t), n, o, s))
  if (cn(o) && !s) return
  const r = 4 & o.shapeFlag ? Wo(o.component) || o.component.proxy : o.el,
    l = s ? null : r,
    { i: i, r: u } = e,
    a = t && t.r,
    f = i.refs === c ? (i.refs = {}) : i.refs,
    p = i.setupState
  if (
    (null != a &&
      a !== u &&
      (w(a)
        ? ((f[a] = null), m(p, a) && (p[a] = null))
        : lt(a) && (a.value = null)),
    x(u))
  )
    pt(u, i, 12, [l, f])
  else {
    const t = w(u),
      o = lt(u)
    if (t || o) {
      const o = () => {
        if (e.f) {
          const n = t ? f[u] : u.value
          s
            ? y(n) && g(n, r)
            : y(n)
            ? n.includes(r) || n.push(r)
            : t
            ? (f[u] = [r])
            : ((u.value = [r]), e.k && (f[e.k] = u.value))
        } else
          t
            ? ((f[u] = l), m(p, u) && (p[u] = l))
            : lt(u) && ((u.value = l), e.k && (f[e.k] = l))
      }
      l ? ((o.id = -1), to(o, n)) : o()
    }
  }
}
const to = function (e, t) {
  t && t.pendingBranch
    ? y(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Rt(e, Ct, wt, St)
}
function no(e) {
  return (function (e, t) {
    ;(
      B ||
      (B =
        'undefined' != typeof globalThis
          ? globalThis
          : 'undefined' != typeof self
          ? self
          : 'undefined' != typeof window
          ? window
          : 'undefined' != typeof global
          ? global
          : {})
    ).__VUE__ = !0
    const {
        insert: n,
        remove: o,
        patchProp: s,
        createElement: r,
        createText: l,
        createComment: i,
        setText: f,
        setElementText: p,
        parentNode: d,
        nextSibling: h,
        setScopeId: g = a,
        cloneNode: _,
        insertStaticContent: y
      } = e,
      b = (
        e,
        t,
        n,
        o = null,
        s = null,
        r = null,
        l = !1,
        i = null,
        c = !!t.dynamicChildren
      ) => {
        if (e === t) return
        e && !mo(e, t) && ((o = le(e)), Z(e, s, r, !0), (e = null)),
          -2 === t.patchFlag && ((c = !1), (t.dynamicChildren = null))
        const { type: u, ref: a, shapeFlag: f } = t
        switch (u) {
          case io:
            x(e, t, n, o)
            break
          case co:
            w(e, t, n, o)
            break
          case uo:
            null == e && C(t, n, o, l)
            break
          case lo:
            $(e, t, n, o, s, r, l, i, c)
            break
          default:
            1 & f
              ? P(e, t, n, o, s, r, l, i, c)
              : 6 & f
              ? L(e, t, n, o, s, r, l, i, c)
              : (64 & f || 128 & f) && u.process(e, t, n, o, s, r, l, i, c, ue)
        }
        null != a && s && eo(a, e && e.ref, r, t || e, !t)
      },
      x = (e, t, o, s) => {
        if (null == e) n((t.el = l(t.children)), o, s)
        else {
          const n = (t.el = e.el)
          t.children !== e.children && f(n, t.children)
        }
      },
      w = (e, t, o, s) => {
        null == e ? n((t.el = i(t.children || '')), o, s) : (t.el = e.el)
      },
      C = (e, t, n, o) => {
        ;[e.el, e.anchor] = y(e.children, t, n, o, e.el, e.anchor)
      },
      S = ({ el: e, anchor: t }, o, s) => {
        let r
        for (; e && e !== t; ) (r = h(e)), n(e, o, s), (e = r)
        n(t, o, s)
      },
      O = ({ el: e, anchor: t }) => {
        let n
        for (; e && e !== t; ) (n = h(e)), o(e), (e = n)
        o(t)
      },
      P = (e, t, n, o, s, r, l, i, c) => {
        ;(l = l || 'svg' === t.type),
          null == e ? E(t, n, o, s, r, l, i, c) : M(e, t, s, r, l, i, c)
      },
      E = (e, t, o, l, i, c, u, a) => {
        let f, d
        const {
          type: h,
          props: v,
          shapeFlag: g,
          transition: m,
          patchFlag: y,
          dirs: b
        } = e
        if (e.el && void 0 !== _ && -1 === y) f = e.el = _(e.el)
        else {
          if (
            ((f = e.el = r(e.type, c, v && v.is, v)),
            8 & g
              ? p(f, e.children)
              : 16 & g &&
                R(e.children, f, null, l, i, c && 'foreignObject' !== h, u, a),
            b && Xn(e, null, l, 'created'),
            v)
          ) {
            for (const t in v)
              'value' === t ||
                F(t) ||
                s(f, t, null, v[t], c, e.children, l, i, ne)
            'value' in v && s(f, 'value', null, v.value),
              (d = v.onVnodeBeforeMount) && Fo(d, l, e)
          }
          A(f, e, e.scopeId, u, l)
        }
        b && Xn(e, null, l, 'beforeMount')
        const x = (!i || (i && !i.pendingBranch)) && m && !m.persisted
        x && m.beforeEnter(f),
          n(f, t, o),
          ((d = v && v.onVnodeMounted) || x || b) &&
            to(() => {
              d && Fo(d, l, e), x && m.enter(f), b && Xn(e, null, l, 'mounted')
            }, i)
      },
      A = (e, t, n, o, s) => {
        if ((n && g(e, n), o)) for (let r = 0; r < o.length; r++) g(e, o[r])
        if (s) {
          if (t === s.subTree) {
            const t = s.vnode
            A(e, t, t.scopeId, t.slotScopeIds, s.parent)
          }
        }
      },
      R = (e, t, n, o, s, r, l, i, c = 0) => {
        for (let u = c; u < e.length; u++) {
          const c = (e[u] = i ? Po(e[u]) : Oo(e[u]))
          b(null, c, t, n, o, s, r, l, i)
        }
      },
      M = (e, t, n, o, r, l, i) => {
        const u = (t.el = e.el)
        let { patchFlag: a, dynamicChildren: f, dirs: d } = t
        a |= 16 & e.patchFlag
        const h = e.props || c,
          v = t.props || c
        let g
        n && oo(n, !1),
          (g = v.onVnodeBeforeUpdate) && Fo(g, n, t, e),
          d && Xn(t, e, n, 'beforeUpdate'),
          n && oo(n, !0)
        const _ = r && 'foreignObject' !== t.type
        if (
          (f
            ? N(e.dynamicChildren, f, u, n, o, _, l)
            : i || Y(e, t, u, null, n, o, _, l, !1),
          a > 0)
        ) {
          if (16 & a) V(u, t, h, v, n, o, r)
          else if (
            (2 & a && h.class !== v.class && s(u, 'class', null, v.class, r),
            4 & a && s(u, 'style', h.style, v.style, r),
            8 & a)
          ) {
            const l = t.dynamicProps
            for (let t = 0; t < l.length; t++) {
              const i = l[t],
                c = h[i],
                a = v[i]
              ;(a === c && 'value' !== i) ||
                s(u, i, c, a, r, e.children, n, o, ne)
            }
          }
          1 & a && e.children !== t.children && p(u, t.children)
        } else i || null != f || V(u, t, h, v, n, o, r)
        ;((g = v.onVnodeUpdated) || d) &&
          to(() => {
            g && Fo(g, n, t, e), d && Xn(t, e, n, 'updated')
          }, o)
      },
      N = (e, t, n, o, s, r, l) => {
        for (let i = 0; i < t.length; i++) {
          const c = e[i],
            u = t[i],
            a =
              c.el && (c.type === lo || !mo(c, u) || 70 & c.shapeFlag)
                ? d(c.el)
                : n
          b(c, u, a, null, o, s, r, l, !0)
        }
      },
      V = (e, t, n, o, r, l, i) => {
        if (n !== o) {
          for (const c in o) {
            if (F(c)) continue
            const u = o[c],
              a = n[c]
            u !== a && 'value' !== c && s(e, c, a, u, i, t.children, r, l, ne)
          }
          if (n !== c)
            for (const c in n)
              F(c) || c in o || s(e, c, n[c], null, i, t.children, r, l, ne)
          'value' in o && s(e, 'value', n.value, o.value)
        }
      },
      $ = (e, t, o, s, r, i, c, u, a) => {
        const f = (t.el = e ? e.el : l('')),
          p = (t.anchor = e ? e.anchor : l(''))
        let { patchFlag: d, dynamicChildren: h, slotScopeIds: v } = t
        v && (u = u ? u.concat(v) : v),
          null == e
            ? (n(f, o, s), n(p, o, s), R(t.children, o, p, r, i, c, u, a))
            : d > 0 && 64 & d && h && e.dynamicChildren
            ? (N(e.dynamicChildren, h, o, r, i, c, u),
              (null != t.key || (r && t === r.subTree)) && so(e, t, !0))
            : Y(e, t, o, p, r, i, c, u, a)
      },
      L = (e, t, n, o, s, r, l, i, c) => {
        ;(t.slotScopeIds = i),
          null == e
            ? 512 & t.shapeFlag
              ? s.ctx.activate(t, n, o, l, c)
              : D(t, n, o, s, r, l, c)
            : z(e, t, c)
      },
      D = (e, t, n, o, s, r, l) => {
        const i = (e.component = (function (e, t, n) {
          const o = e.type,
            s = (t ? t.appContext : e.appContext) || Mo,
            r = {
              uid: To++,
              vnode: e,
              type: o,
              parent: t,
              appContext: s,
              root: null,
              next: null,
              subTree: null,
              effect: null,
              update: null,
              scope: new W(!0),
              render: null,
              proxy: null,
              exposed: null,
              exposeProxy: null,
              withProxy: null,
              provides: t ? t.provides : Object.create(s.provides),
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: Ln(o, s),
              emitsOptions: $t(o, s),
              emit: null,
              emitted: null,
              propsDefaults: c,
              inheritAttrs: o.inheritAttrs,
              ctx: c,
              data: c,
              props: c,
              attrs: c,
              slots: c,
              refs: c,
              setupState: c,
              setupContext: null,
              suspense: n,
              suspenseId: n ? n.pendingId : 0,
              asyncDep: null,
              asyncResolved: !1,
              isMounted: !1,
              isUnmounted: !1,
              isDeactivated: !1,
              bc: null,
              c: null,
              bm: null,
              m: null,
              bu: null,
              u: null,
              um: null,
              bum: null,
              da: null,
              a: null,
              rtg: null,
              rtc: null,
              ec: null,
              sp: null
            }
          ;(r.ctx = { _: r }),
            (r.root = t ? t.root : r),
            (r.emit = Vt.bind(null, r)),
            e.ce && e.ce(r)
          return r
        })(e, o, s))
        if (
          (un(e) && (i.ctx.renderer = ue),
          (function (e, t = !1) {
            Lo = t
            const { props: n, children: o } = e.vnode,
              s = Io(e)
            $n(e, n, s, t),
              ((e, t) => {
                if (32 & e.vnode.shapeFlag) {
                  const n = t._
                  n ? ((e.slots = et(t)), I(t, '_', n)) : qn(t, (e.slots = {}))
                } else (e.slots = {}), t && Gn(e, t)
                I(e.slots, yo, 1)
              })(e, o)
            const r = s
              ? (function (e, t) {
                  const n = e.type
                  ;(e.accessCache = Object.create(null)),
                    (e.proxy = tt(new Proxy(e.ctx, jo)))
                  const { setup: o } = n
                  if (o) {
                    const n = (e.setupContext =
                      o.length > 1
                        ? (function (e) {
                            const t = (t) => {
                              e.exposed = t || {}
                            }
                            let n
                            return {
                              get attrs() {
                                return (
                                  n ||
                                  (n = (function (e) {
                                    return new Proxy(e.attrs, {
                                      get: (t, n) => (re(e, 0, '$attrs'), t[n])
                                    })
                                  })(e))
                                )
                              },
                              slots: e.slots,
                              emit: e.emit,
                              expose: t
                            }
                          })(e)
                        : null)
                    $o(e), oe()
                    const s = pt(o, e, 0, [e.props, n])
                    if ((se(), Uo(), k(s))) {
                      if ((s.then(Uo, Uo), t))
                        return s
                          .then((n) => {
                            Bo(e, n, t)
                          })
                          .catch((t) => {
                            ht(t, e, 0)
                          })
                      e.asyncDep = s
                    } else Bo(e, s, t)
                  } else Do(e, t)
                })(e, t)
              : void 0
            Lo = !1
          })(i),
          i.asyncDep)
        ) {
          if ((s && s.registerDep(i, H), !e.el)) {
            const e = (i.subTree = Co(co))
            w(null, e, t, n)
          }
        } else H(i, e, t, n, s, r, l)
      },
      z = (e, t, n) => {
        const o = (t.component = e.component)
        if (
          (function (e, t, n) {
            const { props: o, children: s, component: r } = e,
              { props: l, children: i, patchFlag: c } = t,
              u = r.emitsOptions
            if (t.dirs || t.transition) return !0
            if (!(n && c >= 0))
              return (
                !((!s && !i) || (i && i.$stable)) ||
                (o !== l && (o ? !l || Ht(o, l, u) : !!l))
              )
            if (1024 & c) return !0
            if (16 & c) return o ? Ht(o, l, u) : !!l
            if (8 & c) {
              const e = t.dynamicProps
              for (let t = 0; t < e.length; t++) {
                const n = e[t]
                if (l[n] !== o[n] && !Ut(u, n)) return !0
              }
            }
            return !1
          })(e, t, n)
        ) {
          if (o.asyncDep && !o.asyncResolved) return void K(o, t, n)
          ;(o.next = t),
            (function (e) {
              const t = _t.indexOf(e)
              t > mt && _t.splice(t, 1)
            })(o.update),
            o.update()
        } else (t.component = e.component), (t.el = e.el), (o.vnode = t)
      },
      H = (e, t, n, o, s, r, l) => {
        const i = () => {
            if (e.isMounted) {
              let t,
                { next: n, bu: o, u: i, parent: c, vnode: u } = e,
                a = n
              oo(e, !1),
                n ? ((n.el = u.el), K(e, n, l)) : (n = u),
                o && U(o),
                (t = n.props && n.props.onVnodeBeforeUpdate) && Fo(t, c, n, u),
                oo(e, !0)
              const f = Dt(e),
                p = e.subTree
              ;(e.subTree = f),
                b(p, f, d(p.el), le(p), e, s, r),
                (n.el = f.el),
                null === a &&
                  (function ({ vnode: e, parent: t }, n) {
                    for (; t && t.subTree === e; )
                      ((e = t.vnode).el = n), (t = t.parent)
                  })(e, f.el),
                i && to(i, s),
                (t = n.props && n.props.onVnodeUpdated) &&
                  to(() => Fo(t, c, n, u), s)
            } else {
              let l
              const { el: i, props: c } = t,
                { bm: u, m: a, parent: f } = e,
                p = cn(t)
              if (
                (oo(e, !1),
                u && U(u),
                !p && (l = c && c.onVnodeBeforeMount) && Fo(l, f, t),
                oo(e, !0),
                i && fe)
              ) {
                const n = () => {
                  ;(e.subTree = Dt(e)), fe(i, e.subTree, e, s, null)
                }
                p
                  ? t.type.__asyncLoader().then(() => !e.isUnmounted && n())
                  : n()
              } else {
                const l = (e.subTree = Dt(e))
                b(null, l, n, o, e, s, r), (t.el = l.el)
              }
              if ((a && to(a, s), !p && (l = c && c.onVnodeMounted))) {
                const e = t
                to(() => Fo(l, f, e), s)
              }
              256 & t.shapeFlag && e.a && to(e.a, s),
                (e.isMounted = !0),
                (t = n = o = null)
            }
          },
          c = (e.effect = new Q(i, () => Ft(e.update), e.scope)),
          u = (e.update = c.run.bind(c))
        ;(u.id = e.uid), oo(e, !0), u()
      },
      K = (e, t, n) => {
        t.component = e
        const o = e.vnode.props
        ;(e.vnode = t),
          (e.next = null),
          (function (e, t, n, o) {
            const {
                props: s,
                attrs: r,
                vnode: { patchFlag: l }
              } = e,
              i = et(s),
              [c] = e.propsOptions
            let u = !1
            if (!(o || l > 0) || 16 & l) {
              let o
              Un(e, t, s, r) && (u = !0)
              for (const r in i)
                (t && (m(t, r) || ((o = T(r)) !== r && m(t, o)))) ||
                  (c
                    ? !n ||
                      (void 0 === n[r] && void 0 === n[o]) ||
                      (s[r] = In(c, i, r, void 0, e, !0))
                    : delete s[r])
              if (r !== i)
                for (const e in r) (t && m(t, e)) || (delete r[e], (u = !0))
            } else if (8 & l) {
              const n = e.vnode.dynamicProps
              for (let o = 0; o < n.length; o++) {
                let l = n[o]
                const a = t[l]
                if (c)
                  if (m(r, l)) a !== r[l] && ((r[l] = a), (u = !0))
                  else {
                    const t = j(l)
                    s[t] = In(c, i, t, a, e, !1)
                  }
                else a !== r[l] && ((r[l] = a), (u = !0))
              }
            }
            u && ie(e, 'set', '$attrs')
          })(e, t.props, o, n),
          ((e, t, n) => {
            const { vnode: o, slots: s } = e
            let r = !0,
              l = c
            if (32 & o.shapeFlag) {
              const e = t._
              e
                ? n && 1 === e
                  ? (r = !1)
                  : (v(s, t), n || 1 !== e || delete s._)
                : ((r = !t.$stable), qn(t, s)),
                (l = t)
            } else t && (Gn(e, t), (l = { default: 1 }))
            if (r) for (const i in s) Hn(i) || i in l || delete s[i]
          })(e, t.children, n),
          oe(),
          jt(void 0, e.update),
          se()
      },
      Y = (e, t, n, o, s, r, l, i, c = !1) => {
        const u = e && e.children,
          a = e ? e.shapeFlag : 0,
          f = t.children,
          { patchFlag: d, shapeFlag: h } = t
        if (d > 0) {
          if (128 & d) return void G(u, f, n, o, s, r, l, i, c)
          if (256 & d) return void q(u, f, n, o, s, r, l, i, c)
        }
        8 & h
          ? (16 & a && ne(u, s, r), f !== u && p(n, f))
          : 16 & a
          ? 16 & h
            ? G(u, f, n, o, s, r, l, i, c)
            : ne(u, s, r, !0)
          : (8 & a && p(n, ''), 16 & h && R(f, n, o, s, r, l, i, c))
      },
      q = (e, t, n, o, s, r, l, i, c) => {
        t = t || u
        const a = (e = e || u).length,
          f = t.length,
          p = Math.min(a, f)
        let d
        for (d = 0; d < p; d++) {
          const o = (t[d] = c ? Po(t[d]) : Oo(t[d]))
          b(e[d], o, n, null, s, r, l, i, c)
        }
        a > f ? ne(e, s, r, !0, !1, p) : R(t, n, o, s, r, l, i, c, p)
      },
      G = (e, t, n, o, s, r, l, i, c) => {
        let a = 0
        const f = t.length
        let p = e.length - 1,
          d = f - 1
        for (; a <= p && a <= d; ) {
          const o = e[a],
            u = (t[a] = c ? Po(t[a]) : Oo(t[a]))
          if (!mo(o, u)) break
          b(o, u, n, null, s, r, l, i, c), a++
        }
        for (; a <= p && a <= d; ) {
          const o = e[p],
            u = (t[d] = c ? Po(t[d]) : Oo(t[d]))
          if (!mo(o, u)) break
          b(o, u, n, null, s, r, l, i, c), p--, d--
        }
        if (a > p) {
          if (a <= d) {
            const e = d + 1,
              u = e < f ? t[e].el : o
            for (; a <= d; )
              b(null, (t[a] = c ? Po(t[a]) : Oo(t[a])), n, u, s, r, l, i, c),
                a++
          }
        } else if (a > d) for (; a <= p; ) Z(e[a], s, r, !0), a++
        else {
          const h = a,
            v = a,
            g = new Map()
          for (a = v; a <= d; a++) {
            const e = (t[a] = c ? Po(t[a]) : Oo(t[a]))
            null != e.key && g.set(e.key, a)
          }
          let _,
            m = 0
          const y = d - v + 1
          let x = !1,
            w = 0
          const C = new Array(y)
          for (a = 0; a < y; a++) C[a] = 0
          for (a = h; a <= p; a++) {
            const o = e[a]
            if (m >= y) {
              Z(o, s, r, !0)
              continue
            }
            let u
            if (null != o.key) u = g.get(o.key)
            else
              for (_ = v; _ <= d; _++)
                if (0 === C[_ - v] && mo(o, t[_])) {
                  u = _
                  break
                }
            void 0 === u
              ? Z(o, s, r, !0)
              : ((C[u - v] = a + 1),
                u >= w ? (w = u) : (x = !0),
                b(o, t[u], n, null, s, r, l, i, c),
                m++)
          }
          const S = x
            ? (function (e) {
                const t = e.slice(),
                  n = [0]
                let o, s, r, l, i
                const c = e.length
                for (o = 0; o < c; o++) {
                  const c = e[o]
                  if (0 !== c) {
                    if (((s = n[n.length - 1]), e[s] < c)) {
                      ;(t[o] = s), n.push(o)
                      continue
                    }
                    for (r = 0, l = n.length - 1; r < l; )
                      (i = (r + l) >> 1), e[n[i]] < c ? (r = i + 1) : (l = i)
                    c < e[n[r]] && (r > 0 && (t[o] = n[r - 1]), (n[r] = o))
                  }
                }
                ;(r = n.length), (l = n[r - 1])
                for (; r-- > 0; ) (n[r] = l), (l = t[l])
                return n
              })(C)
            : u
          for (_ = S.length - 1, a = y - 1; a >= 0; a--) {
            const e = v + a,
              u = t[e],
              p = e + 1 < f ? t[e + 1].el : o
            0 === C[a]
              ? b(null, u, n, p, s, r, l, i, c)
              : x && (_ < 0 || a !== S[_] ? X(u, n, p, 2) : _--)
          }
        }
      },
      X = (e, t, o, s, r = null) => {
        const { el: l, type: i, transition: c, children: u, shapeFlag: a } = e
        if (6 & a) return void X(e.component.subTree, t, o, s)
        if (128 & a) return void e.suspense.move(t, o, s)
        if (64 & a) return void i.move(e, t, o, ue)
        if (i === lo) {
          n(l, t, o)
          for (let e = 0; e < u.length; e++) X(u[e], t, o, s)
          return void n(e.anchor, t, o)
        }
        if (i === uo) return void S(e, t, o)
        if (2 !== s && 1 & a && c)
          if (0 === s) c.beforeEnter(l), n(l, t, o), to(() => c.enter(l), r)
          else {
            const { leave: e, delayLeave: s, afterLeave: r } = c,
              i = () => n(l, t, o),
              u = () => {
                e(l, () => {
                  i(), r && r()
                })
              }
            s ? s(l, i, u) : u()
          }
        else n(l, t, o)
      },
      Z = (e, t, n, o = !1, s = !1) => {
        const {
          type: r,
          props: l,
          ref: i,
          children: c,
          dynamicChildren: u,
          shapeFlag: a,
          patchFlag: f,
          dirs: p
        } = e
        if ((null != i && eo(i, null, n, e, !0), 256 & a))
          return void t.ctx.deactivate(e)
        const d = 1 & a && p,
          h = !cn(e)
        let v
        if ((h && (v = l && l.onVnodeBeforeUnmount) && Fo(v, t, e), 6 & a))
          te(e.component, n, o)
        else {
          if (128 & a) return void e.suspense.unmount(n, o)
          d && Xn(e, null, t, 'beforeUnmount'),
            64 & a
              ? e.type.remove(e, t, n, s, ue, o)
              : u && (r !== lo || (f > 0 && 64 & f))
              ? ne(u, t, n, !1, !0)
              : ((r === lo && 384 & f) || (!s && 16 & a)) && ne(c, t, n),
            o && J(e)
        }
        ;((h && (v = l && l.onVnodeUnmounted)) || d) &&
          to(() => {
            v && Fo(v, t, e), d && Xn(e, null, t, 'unmounted')
          }, n)
      },
      J = (e) => {
        const { type: t, el: n, anchor: s, transition: r } = e
        if (t === lo) return void ee(n, s)
        if (t === uo) return void O(e)
        const l = () => {
          o(n), r && !r.persisted && r.afterLeave && r.afterLeave()
        }
        if (1 & e.shapeFlag && r && !r.persisted) {
          const { leave: t, delayLeave: o } = r,
            s = () => t(n, l)
          o ? o(e.el, l, s) : s()
        } else l()
      },
      ee = (e, t) => {
        let n
        for (; e !== t; ) (n = h(e)), o(e), (e = n)
        o(t)
      },
      te = (e, t, n) => {
        const { bum: o, scope: s, update: r, subTree: l, um: i } = e
        o && U(o),
          s.stop(),
          r && ((r.active = !1), Z(l, e, t, n)),
          i && to(i, t),
          to(() => {
            e.isUnmounted = !0
          }, t),
          t &&
            t.pendingBranch &&
            !t.isUnmounted &&
            e.asyncDep &&
            !e.asyncResolved &&
            e.suspenseId === t.pendingId &&
            (t.deps--, 0 === t.deps && t.resolve())
      },
      ne = (e, t, n, o = !1, s = !1, r = 0) => {
        for (let l = r; l < e.length; l++) Z(e[l], t, n, o, s)
      },
      le = (e) =>
        6 & e.shapeFlag
          ? le(e.component.subTree)
          : 128 & e.shapeFlag
          ? e.suspense.next()
          : h(e.anchor || e.el),
      ce = (e, t, n) => {
        null == e
          ? t._vnode && Z(t._vnode, null, null, !0)
          : b(t._vnode || null, e, t, null, null, null, n),
          Mt(),
          (t._vnode = e)
      },
      ue = { p: b, um: Z, m: X, r: J, mt: D, mc: R, pc: Y, pbc: N, n: le, o: e }
    let ae, fe
    t && ([ae, fe] = t(ue))
    return { render: ce, hydrate: ae, createApp: Qn(ce, ae) }
  })(e)
}
function oo({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function so(e, t, n = !1) {
  const o = e.children,
    s = t.children
  if (y(o) && y(s))
    for (let r = 0; r < o.length; r++) {
      const e = o[r]
      let t = s[r]
      1 & t.shapeFlag &&
        !t.dynamicChildren &&
        ((t.patchFlag <= 0 || 32 === t.patchFlag) &&
          ((t = s[r] = Po(s[r])), (t.el = e.el)),
        n || so(e, t))
    }
}
const ro = Symbol(),
  lo = Symbol(void 0),
  io = Symbol(void 0),
  co = Symbol(void 0),
  uo = Symbol(void 0),
  ao = []
let fo = null
function po(e = !1) {
  ao.push((fo = e ? null : []))
}
let ho = 1
function vo(e) {
  ho += e
}
function go(e) {
  return (
    (e.dynamicChildren = ho > 0 ? fo || u : null),
    ao.pop(),
    (fo = ao[ao.length - 1] || null),
    ho > 0 && fo && fo.push(e),
    e
  )
}
function _o(e, t, n, o, s, r) {
  return go(wo(e, t, n, o, s, r, !0))
}
function mo(e, t) {
  return e.type === t.type && e.key === t.key
}
const yo = '__vInternal',
  bo = ({ key: e }) => (null != e ? e : null),
  xo = ({ ref: e, ref_key: t, ref_for: n }) =>
    null != e
      ? w(e) || lt(e) || x(e)
        ? { i: It, r: e, k: t, f: !!n }
        : e
      : null
function wo(
  e,
  t = null,
  n = null,
  o = 0,
  s = null,
  r = e === lo ? 0 : 1,
  l = !1,
  i = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && bo(t),
    ref: t && xo(t),
    scopeId: Lt,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null
  }
  return (
    i
      ? (Eo(c, n), 128 & r && e.normalize(c))
      : n && (c.shapeFlag |= w(n) ? 8 : 16),
    ho > 0 &&
      !l &&
      fo &&
      (c.patchFlag > 0 || 6 & r) &&
      32 !== c.patchFlag &&
      fo.push(c),
    c
  )
}
const Co = function (e, t = null, n = null, s = 0, r = null, l = !1) {
  ;(e && e !== ro) || (e = co)
  if (((c = e), c && !0 === c.__v_isVNode)) {
    const o = So(e, t, !0)
    return n && Eo(o, n), o
  }
  var c
  ;(function (e) {
    return x(e) && '__vccOpts' in e
  })(e) && (e = e.__vccOpts)
  if (t) {
    t = (function (e) {
      return e ? (Qe(e) || yo in e ? v({}, e) : e) : null
    })(t)
    let { class: e, style: n } = t
    e && !w(e) && (t.class = i(e)),
      S(n) && (Qe(n) && !y(n) && (n = v({}, n)), (t.style = o(n)))
  }
  const u = w(e)
    ? 1
    : ((e) => e.__isSuspense)(e)
    ? 128
    : ((e) => e.__isTeleport)(e)
    ? 64
    : S(e)
    ? 4
    : x(e)
    ? 2
    : 0
  return wo(e, t, n, s, r, u, l, !0)
}
function So(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: l, children: c } = e,
    u = t
      ? (function (...e) {
          const t = {}
          for (let n = 0; n < e.length; n++) {
            const s = e[n]
            for (const e in s)
              if ('class' === e)
                t.class !== s.class && (t.class = i([t.class, s.class]))
              else if ('style' === e) t.style = o([t.style, s.style])
              else if (d(e)) {
                const n = t[e],
                  o = s[e]
                !o ||
                  n === o ||
                  (y(n) && n.includes(o)) ||
                  (t[e] = n ? [].concat(n, o) : o)
              } else '' !== e && (t[e] = s[e])
          }
          return t
        })(s || {}, t)
      : s
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && bo(u),
    ref:
      t && t.ref ? (n && r ? (y(r) ? r.concat(xo(t)) : [r, xo(t)]) : xo(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: c,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== lo ? (-1 === l ? 16 : 16 | l) : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && So(e.ssContent),
    ssFallback: e.ssFallback && So(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  }
}
function ko(e = ' ', t = 0) {
  return Co(io, null, e, t)
}
function Oo(e) {
  return null == e || 'boolean' == typeof e
    ? Co(co)
    : y(e)
    ? Co(lo, null, e.slice())
    : 'object' == typeof e
    ? Po(e)
    : Co(io, null, String(e))
}
function Po(e) {
  return null === e.el || e.memo ? e : So(e)
}
function Eo(e, t) {
  let n = 0
  const { shapeFlag: o } = e
  if (null == t) t = null
  else if (y(t)) n = 16
  else if ('object' == typeof t) {
    if (65 & o) {
      const n = t.default
      return void (n && (n._c && (n._d = !1), Eo(e, n()), n._c && (n._d = !0)))
    }
    {
      n = 32
      const o = t._
      o || yo in t
        ? 3 === o &&
          It &&
          (1 === It.slots._ ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
        : (t._ctx = It)
    }
  } else
    x(t)
      ? ((t = { default: t, _ctx: It }), (n = 32))
      : ((t = String(t)), 64 & o ? ((n = 16), (t = [ko(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Fo(e, t, n, o = null) {
  dt(e, t, 7, [n, o])
}
const Ao = (e) => (e ? (Io(e) ? Wo(e) || e.proxy : Ao(e.parent)) : null),
  Ro = v(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ao(e.parent),
    $root: (e) => Ao(e.root),
    $emit: (e) => e.emit,
    $options: (e) => An(e),
    $forceUpdate: (e) => () => Ft(e.update),
    $nextTick: (e) => Et.bind(e.proxy),
    $watch: (e) => Xt.bind(e)
  }),
  jo = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: o,
        data: s,
        props: r,
        accessCache: l,
        type: i,
        appContext: u
      } = e
      let a
      if ('$' !== t[0]) {
        const i = l[t]
        if (void 0 !== i)
          switch (i) {
            case 1:
              return o[t]
            case 2:
              return s[t]
            case 4:
              return n[t]
            case 3:
              return r[t]
          }
        else {
          if (o !== c && m(o, t)) return (l[t] = 1), o[t]
          if (s !== c && m(s, t)) return (l[t] = 2), s[t]
          if ((a = e.propsOptions[0]) && m(a, t)) return (l[t] = 3), r[t]
          if (n !== c && m(n, t)) return (l[t] = 4), n[t]
          On && (l[t] = 0)
        }
      }
      const f = Ro[t]
      let p, d
      return f
        ? ('$attrs' === t && re(e, 0, t), f(e))
        : (p = i.__cssModules) && (p = p[t])
        ? p
        : n !== c && m(n, t)
        ? ((l[t] = 4), n[t])
        : ((d = u.config.globalProperties), m(d, t) ? d[t] : void 0)
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: s, ctx: r } = e
      return s !== c && m(s, t)
        ? ((s[t] = n), !0)
        : o !== c && m(o, t)
        ? ((o[t] = n), !0)
        : !m(e.props, t) &&
          ('$' !== t[0] || !(t.slice(1) in e)) &&
          ((r[t] = n), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: o,
          appContext: s,
          propsOptions: r
        }
      },
      l
    ) {
      let i
      return (
        !!n[l] ||
        (e !== c && m(e, l)) ||
        (t !== c && m(t, l)) ||
        ((i = r[0]) && m(i, l)) ||
        m(o, l) ||
        m(Ro, l) ||
        m(s.config.globalProperties, l)
      )
    },
    defineProperty(e, t, n) {
      return (
        null != n.get
          ? this.set(e, t, n.get(), null)
          : null != n.value && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    }
  },
  Mo = Zn()
let To = 0
let No = null
const Vo = () => No || It,
  $o = (e) => {
    ;(No = e), e.scope.on()
  },
  Uo = () => {
    No && No.scope.off(), (No = null)
  }
function Io(e) {
  return 4 & e.vnode.shapeFlag
}
let Lo = !1
function Bo(e, t, n) {
  x(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : S(t) && (e.setupState = at(t)),
    Do(e, n)
}
function Do(e, t, n) {
  const o = e.type
  e.render || (e.render = o.render || a), $o(e), oe(), Pn(e), se(), Uo()
}
function Wo(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(at(tt(e.exposed)), {
        get: (t, n) => (n in t ? t[n] : n in Ro ? Ro[n](e) : void 0)
      }))
    )
}
const zo = (e, t) =>
    (function (e, t, n = !1) {
      let o, s
      const r = x(e)
      return (
        r ? ((o = e), (s = a)) : ((o = e.get), (s = e.set)),
        new ft(o, s, r || !s, n)
      )
    })(e, 0, Lo),
  Ho = '3.2.31',
  Ko = 'undefined' != typeof document ? document : null,
  Yo = Ko && Ko.createElement('template'),
  qo = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, o) => {
      const s = t
        ? Ko.createElementNS('http://www.w3.org/2000/svg', e)
        : Ko.createElement(e, n ? { is: n } : void 0)
      return (
        'select' === e &&
          o &&
          null != o.multiple &&
          s.setAttribute('multiple', o.multiple),
        s
      )
    },
    createText: (e) => Ko.createTextNode(e),
    createComment: (e) => Ko.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ko.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    cloneNode(e) {
      const t = e.cloneNode(!0)
      return '_value' in e && (t._value = e._value), t
    },
    insertStaticContent(e, t, n, o, s, r) {
      const l = n ? n.previousSibling : t.lastChild
      if (s && (s === r || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n), s !== r && (s = s.nextSibling);

        );
      else {
        Yo.innerHTML = o ? `<svg>${e}</svg>` : e
        const s = Yo.content
        if (o) {
          const e = s.firstChild
          for (; e.firstChild; ) s.appendChild(e.firstChild)
          s.removeChild(e)
        }
        t.insertBefore(s, n)
      }
      return [
        l ? l.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild
      ]
    }
  }
const Go = /\s*!important$/
function Xo(e, t, n) {
  if (y(n)) n.forEach((n) => Xo(e, t, n))
  else if (t.startsWith('--')) e.setProperty(t, n)
  else {
    const o = (function (e, t) {
      const n = Jo[t]
      if (n) return n
      let o = j(t)
      if ('filter' !== o && o in e) return (Jo[t] = o)
      o = N(o)
      for (let s = 0; s < Zo.length; s++) {
        const n = Zo[s] + o
        if (n in e) return (Jo[t] = n)
      }
      return t
    })(e, t)
    Go.test(n)
      ? e.setProperty(T(o), n.replace(Go, ''), 'important')
      : (e[o] = n)
  }
}
const Zo = ['Webkit', 'Moz', 'ms'],
  Jo = {}
const Qo = 'http://www.w3.org/1999/xlink'
let es = Date.now,
  ts = !1
if ('undefined' != typeof window) {
  es() > document.createEvent('Event').timeStamp &&
    (es = () => performance.now())
  const e = navigator.userAgent.match(/firefox\/(\d+)/i)
  ts = !!(e && Number(e[1]) <= 53)
}
let ns = 0
const os = Promise.resolve(),
  ss = () => {
    ns = 0
  }
function rs(e, t, n, o, s = null) {
  const r = e._vei || (e._vei = {}),
    l = r[t]
  if (o && l) l.value = o
  else {
    const [n, i] = (function (e) {
      let t
      if (ls.test(e)) {
        let n
        for (t = {}; (n = e.match(ls)); )
          (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0)
      }
      return [T(e.slice(2)), t]
    })(t)
    if (o) {
      const l = (r[t] = (function (e, t) {
        const n = (e) => {
          const o = e.timeStamp || es()
          ;(ts || o >= n.attached - 1) &&
            dt(
              (function (e, t) {
                if (y(t)) {
                  const n = e.stopImmediatePropagation
                  return (
                    (e.stopImmediatePropagation = () => {
                      n.call(e), (e._stopped = !0)
                    }),
                    t.map((e) => (t) => !t._stopped && e && e(t))
                  )
                }
                return t
              })(e, n.value),
              t,
              5,
              [e]
            )
        }
        return (
          (n.value = e),
          (n.attached = (() => ns || (os.then(ss), (ns = es())))()),
          n
        )
      })(o, s))
      !(function (e, t, n, o) {
        e.addEventListener(t, n, o)
      })(e, n, l, i)
    } else
      l &&
        (!(function (e, t, n, o) {
          e.removeEventListener(t, n, o)
        })(e, n, l, i),
        (r[t] = void 0))
  }
}
const ls = /(?:Once|Passive|Capture)$/
const is = /^on[a-z]/
const cs = 'undefined' != typeof HTMLElement ? HTMLElement : class {}
class us extends cs {
  constructor(e, t = {}, n) {
    super(),
      (this._def = e),
      (this._props = t),
      (this._instance = null),
      (this._connected = !1),
      (this._resolved = !1),
      (this._numberProps = null),
      this.shadowRoot && n
        ? n(this._createVNode(), this.shadowRoot)
        : this.attachShadow({ mode: 'open' })
  }
  connectedCallback() {
    ;(this._connected = !0), this._instance || this._resolveDef()
  }
  disconnectedCallback() {
    ;(this._connected = !1),
      Et(() => {
        this._connected || (ps(null, this.shadowRoot), (this._instance = null))
      })
  }
  _resolveDef() {
    if (this._resolved) return
    this._resolved = !0
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name)
    new MutationObserver((e) => {
      for (const t of e) this._setAttr(t.attributeName)
    }).observe(this, { attributes: !0 })
    const e = (e) => {
        const { props: t, styles: n } = e,
          o = !y(t),
          s = t ? (o ? Object.keys(t) : t) : []
        let r
        if (o)
          for (const l in this._props) {
            const e = t[l]
            ;(e === Number || (e && e.type === Number)) &&
              ((this._props[l] = L(this._props[l])),
              ((r || (r = Object.create(null)))[l] = !0))
          }
        this._numberProps = r
        for (const l of Object.keys(this))
          '_' !== l[0] && this._setProp(l, this[l], !0, !1)
        for (const l of s.map(j))
          Object.defineProperty(this, l, {
            get() {
              return this._getProp(l)
            },
            set(e) {
              this._setProp(l, e)
            }
          })
        this._applyStyles(n), this._update()
      },
      t = this._def.__asyncLoader
    t ? t().then(e) : e(this._def)
  }
  _setAttr(e) {
    let t = this.getAttribute(e)
    this._numberProps && this._numberProps[e] && (t = L(t)),
      this._setProp(j(e), t, !1)
  }
  _getProp(e) {
    return this._props[e]
  }
  _setProp(e, t, n = !0, o = !0) {
    t !== this._props[e] &&
      ((this._props[e] = t),
      o && this._instance && this._update(),
      n &&
        (!0 === t
          ? this.setAttribute(T(e), '')
          : 'string' == typeof t || 'number' == typeof t
          ? this.setAttribute(T(e), t + '')
          : t || this.removeAttribute(T(e))))
  }
  _update() {
    ps(this._createVNode(), this.shadowRoot)
  }
  _createVNode() {
    const e = Co(this._def, v({}, this._props))
    return (
      this._instance ||
        (e.ce = (e) => {
          ;(this._instance = e),
            (e.isCE = !0),
            (e.emit = (e, ...t) => {
              this.dispatchEvent(new CustomEvent(e, { detail: t }))
            })
          let t = this
          for (; (t = t && (t.parentNode || t.host)); )
            if (t instanceof us) {
              e.parent = t._instance
              break
            }
        }),
      e
    )
  }
  _applyStyles(e) {
    e &&
      e.forEach((e) => {
        const t = document.createElement('style')
        ;(t.textContent = e), this.shadowRoot.appendChild(t)
      })
  }
}
Boolean
const as = v(
  {
    patchProp: (e, o, s, r, l = !1, i, c, u, a) => {
      'class' === o
        ? (function (e, t, n) {
            const o = e._vtc
            o && (t = (t ? [t, ...o] : [...o]).join(' ')),
              null == t
                ? e.removeAttribute('class')
                : n
                ? e.setAttribute('class', t)
                : (e.className = t)
          })(e, r, l)
        : 'style' === o
        ? (function (e, t, n) {
            const o = e.style,
              s = w(n)
            if (n && !s) {
              for (const e in n) Xo(o, e, n[e])
              if (t && !w(t)) for (const e in t) null == n[e] && Xo(o, e, '')
            } else {
              const r = o.display
              s ? t !== n && (o.cssText = n) : t && e.removeAttribute('style'),
                '_vod' in e && (o.display = r)
            }
          })(e, s, r)
        : d(o)
        ? h(o) || rs(e, o, 0, r, c)
        : (
            '.' === o[0]
              ? ((o = o.slice(1)), 1)
              : '^' === o[0]
              ? ((o = o.slice(1)), 0)
              : (function (e, t, n, o) {
                  if (o)
                    return (
                      'innerHTML' === t ||
                      'textContent' === t ||
                      !!(t in e && is.test(t) && x(n))
                    )
                  if ('spellcheck' === t || 'draggable' === t) return !1
                  if ('form' === t) return !1
                  if ('list' === t && 'INPUT' === e.tagName) return !1
                  if ('type' === t && 'TEXTAREA' === e.tagName) return !1
                  if (is.test(t) && w(n)) return !1
                  return t in e
                })(e, o, r, l)
          )
        ? (function (e, t, o, s, r, l, i) {
            if ('innerHTML' === t || 'textContent' === t)
              return s && i(s, r, l), void (e[t] = null == o ? '' : o)
            if (
              'value' === t &&
              'PROGRESS' !== e.tagName &&
              !e.tagName.includes('-')
            ) {
              e._value = o
              const n = null == o ? '' : o
              return (
                (e.value === n && 'OPTION' !== e.tagName) || (e.value = n),
                void (null == o && e.removeAttribute(t))
              )
            }
            if ('' === o || null == o) {
              const s = typeof e[t]
              if ('boolean' === s) return void (e[t] = n(o))
              if (null == o && 'string' === s)
                return (e[t] = ''), void e.removeAttribute(t)
              if ('number' === s) {
                try {
                  e[t] = 0
                } catch (c) {}
                return void e.removeAttribute(t)
              }
            }
            try {
              e[t] = o
            } catch (u) {}
          })(e, o, r, i, c, u, a)
        : ('true-value' === o
            ? (e._trueValue = r)
            : 'false-value' === o && (e._falseValue = r),
          (function (e, o, s, r, l) {
            if (r && o.startsWith('xlink:'))
              null == s
                ? e.removeAttributeNS(Qo, o.slice(6, o.length))
                : e.setAttributeNS(Qo, o, s)
            else {
              const r = t(o)
              null == s || (r && !n(s))
                ? e.removeAttribute(o)
                : e.setAttribute(o, r ? '' : s)
            }
          })(e, o, r, l))
    }
  },
  qo
)
let fs
const ps = (...e) => {
  ;(fs || (fs = no(as))).render(...e)
}
const ds = { key: 0 },
  hs = { key: 1 }
const vs = (function (e, t) {
  const n = ln(e)
  class o extends us {
    constructor(e) {
      super(n, e, t)
    }
  }
  return (o.def = n), o
})(
  ((e, t) => {
    const n = e.__vccOpts || e
    for (const [o, s] of t) n[o] = s
    return n
  })(
    ln({
      setup(e) {
        const t = it(!1)
        return (e, n) => (
          po(),
          _o(
            'button',
            { onClick: n[0] || (n[0] = (e) => (t.value = !t.value)) },
            [
              t.value
                ? (po(), _o('span', ds, '🌙'))
                : (po(), _o('span', hs, '🌞'))
            ]
          )
        )
      }
    }),
    [
      [
        'styles',
        [
          ':host{--color: #fbbf24;--bg-normal: #fAfAf9;--bg-active: #f5f5f4;--font-size: 24px}:host([dark]){--color: #fef3c7;--bg-normal: #262626;--bg-active: #2d2d2d}button{background-color:var(--bg-normal);border:none;border-radius:.5rem;color:var(--color);cursor:pointer;display:flex;font-size:var(--font-size);overflow:hidden;padding:.4em;transition:background-color .3s ease,color .3s cubic-bezier(.64,0,.78,0)}button:hover,button:focus{background-color:var(--bg-active);outline:none}.slide-enter-active,.slide-leave-active{transition:transform .3s ease-out}.slide-enter-from{transform:translateY(-150%)}.slide-enter-to,.slide-leave-from{transform:translateY(0)}.slide-leave-to{transform:translateY(150%)}\n'
        ]
      ]
    ]
  )
)
;(exports.DarkModeSwitch = vs),
  (exports.register = function (e = 'dark-mode-switch') {
    customElements.define(e, vs)
  })
