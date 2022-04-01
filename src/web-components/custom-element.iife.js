/* eslint-disable @typescript-eslint/no-unused-vars */

var CustomElement = (function (e) {
  'use strict'
  function t(e, t) {
    const n = Object.create(null),
      o = e.split(',')
    for (let s = 0; s < o.length; s++) n[o[s]] = !0
    return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e]
  }
  const n = t(
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly'
  )
  function o(e) {
    return !!e || '' === e
  }
  function s(e) {
    if (b(e)) {
      const t = {}
      for (let n = 0; n < e.length; n++) {
        const o = e[n],
          r = C(o) ? i(o) : s(o)
        if (r) for (const e in r) t[e] = r[e]
      }
      return t
    }
    return C(e) || k(e) ? e : void 0
  }
  const r = /;(?![^(]*\))/g,
    l = /:(.+)/
  function i(e) {
    const t = {}
    return (
      e.split(r).forEach((e) => {
        if (e) {
          const n = e.split(l)
          n.length > 1 && (t[n[0].trim()] = n[1].trim())
        }
      }),
      t
    )
  }
  function c(e) {
    let t = ''
    if (C(e)) t = e
    else if (b(e))
      for (let n = 0; n < e.length; n++) {
        const o = c(e[n])
        o && (t += o + ' ')
      }
    else if (k(e)) for (const n in e) e[n] && (t += n + ' ')
    return t.trim()
  }
  const u = {},
    a = [],
    f = () => {},
    p = () => !1,
    d = /^on[^a-z]/,
    h = (e) => d.test(e),
    v = (e) => e.startsWith('onUpdate:'),
    g = Object.assign,
    _ = (e, t) => {
      const n = e.indexOf(t)
      n > -1 && e.splice(n, 1)
    },
    m = Object.prototype.hasOwnProperty,
    y = (e, t) => m.call(e, t),
    b = Array.isArray,
    x = (e) => '[object Map]' === E(e),
    w = (e) => 'function' == typeof e,
    C = (e) => 'string' == typeof e,
    S = (e) => 'symbol' == typeof e,
    k = (e) => null !== e && 'object' == typeof e,
    O = (e) => k(e) && w(e.then) && w(e.catch),
    P = Object.prototype.toString,
    E = (e) => P.call(e),
    F = (e) =>
      C(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
    A = t(
      ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
    ),
    R = (e) => {
      const t = Object.create(null)
      return (n) => t[n] || (t[n] = e(n))
    },
    j = /-(\w)/g,
    M = R((e) => e.replace(j, (e, t) => (t ? t.toUpperCase() : ''))),
    T = /\B([A-Z])/g,
    N = R((e) => e.replace(T, '-$1').toLowerCase()),
    V = R((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    $ = R((e) => (e ? `on${V(e)}` : '')),
    U = (e, t) => !Object.is(e, t),
    I = (e, t) => {
      for (let n = 0; n < e.length; n++) e[n](t)
    },
    L = (e, t, n) => {
      Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
      })
    },
    B = (e) => {
      const t = parseFloat(e)
      return isNaN(t) ? e : t
    }
  let D
  let W
  class z {
    constructor(e = !1) {
      ;(this.active = !0),
        (this.effects = []),
        (this.cleanups = []),
        !e &&
          W &&
          ((this.parent = W),
          (this.index = (W.scopes || (W.scopes = [])).push(this) - 1))
    }
    run(e) {
      if (this.active)
        try {
          return (W = this), e()
        } finally {
          W = this.parent
        }
    }
    on() {
      W = this
    }
    off() {
      W = this.parent
    }
    stop(e) {
      if (this.active) {
        let t, n
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop()
        for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]()
        if (this.scopes)
          for (t = 0, n = this.scopes.length; t < n; t++)
            this.scopes[t].stop(!0)
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
  const H = (e) => {
      const t = new Set(e)
      return (t.w = 0), (t.n = 0), t
    },
    K = (e) => (e.w & X) > 0,
    Y = (e) => (e.n & X) > 0,
    q = new WeakMap()
  let G = 0,
    X = 1
  let Z
  const J = Symbol(''),
    Q = Symbol('')
  class ee {
    constructor(e, t = null, n) {
      ;(this.fn = e),
        (this.scheduler = t),
        (this.active = !0),
        (this.deps = []),
        (this.parent = void 0),
        (function (e, t = W) {
          t && t.active && t.effects.push(e)
        })(this, n)
    }
    run() {
      if (!this.active) return this.fn()
      let e = Z,
        t = ne
      for (; e; ) {
        if (e === this) return
        e = e.parent
      }
      try {
        return (
          (this.parent = Z),
          (Z = this),
          (ne = !0),
          (X = 1 << ++G),
          G <= 30
            ? (({ deps: e }) => {
                if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= X
              })(this)
            : te(this),
          this.fn()
        )
      } finally {
        G <= 30 &&
          ((e) => {
            const { deps: t } = e
            if (t.length) {
              let n = 0
              for (let o = 0; o < t.length; o++) {
                const s = t[o]
                K(s) && !Y(s) ? s.delete(e) : (t[n++] = s),
                  (s.w &= ~X),
                  (s.n &= ~X)
              }
              t.length = n
            }
          })(this),
          (X = 1 << --G),
          (Z = this.parent),
          (ne = t),
          (this.parent = void 0)
      }
    }
    stop() {
      this.active &&
        (te(this), this.onStop && this.onStop(), (this.active = !1))
    }
  }
  function te(e) {
    const { deps: t } = e
    if (t.length) {
      for (let n = 0; n < t.length; n++) t[n].delete(e)
      t.length = 0
    }
  }
  let ne = !0
  const oe = []
  function se() {
    oe.push(ne), (ne = !1)
  }
  function re() {
    const e = oe.pop()
    ne = void 0 === e || e
  }
  function le(e, t, n) {
    if (ne && Z) {
      let t = q.get(e)
      t || q.set(e, (t = new Map()))
      let o = t.get(n)
      o || t.set(n, (o = H())), ie(o)
    }
  }
  function ie(e, t) {
    let n = !1
    G <= 30 ? Y(e) || ((e.n |= X), (n = !K(e))) : (n = !e.has(Z)),
      n && (e.add(Z), Z.deps.push(e))
  }
  function ce(e, t, n, o, s, r) {
    const l = q.get(e)
    if (!l) return
    let i = []
    if ('clear' === t) i = [...l.values()]
    else if ('length' === n && b(e))
      l.forEach((e, t) => {
        ;('length' === t || t >= o) && i.push(e)
      })
    else
      switch ((void 0 !== n && i.push(l.get(n)), t)) {
        case 'add':
          b(e)
            ? F(n) && i.push(l.get('length'))
            : (i.push(l.get(J)), x(e) && i.push(l.get(Q)))
          break
        case 'delete':
          b(e) || (i.push(l.get(J)), x(e) && i.push(l.get(Q)))
          break
        case 'set':
          x(e) && i.push(l.get(J))
      }
    if (1 === i.length) i[0] && ue(i[0])
    else {
      const e = []
      for (const t of i) t && e.push(...t)
      ue(H(e))
    }
  }
  function ue(e, t) {
    for (const n of b(e) ? e : [...e])
      (n !== Z || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run())
  }
  const ae = t('__proto__,__v_isRef,__isVue'),
    fe = new Set(
      Object.getOwnPropertyNames(Symbol)
        .map((e) => Symbol[e])
        .filter(S)
    ),
    pe = _e(),
    de = _e(!1, !0),
    he = _e(!0),
    ve = ge()
  function ge() {
    const e = {}
    return (
      ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
        e[t] = function (...e) {
          const n = tt(this)
          for (let t = 0, s = this.length; t < s; t++) le(n, 0, t + '')
          const o = n[t](...e)
          return -1 === o || !1 === o ? n[t](...e.map(tt)) : o
        }
      }),
      ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
        e[t] = function (...e) {
          se()
          const n = tt(this)[t].apply(this, e)
          return re(), n
        }
      }),
      e
    )
  }
  function _e(e = !1, t = !1) {
    return function (n, o, s) {
      if ('__v_isReactive' === o) return !e
      if ('__v_isReadonly' === o) return e
      if ('__v_isShallow' === o) return t
      if ('__v_raw' === o && s === (e ? (t ? Ke : He) : t ? ze : We).get(n))
        return n
      const r = b(n)
      if (!e && r && y(ve, o)) return Reflect.get(ve, o, s)
      const l = Reflect.get(n, o, s)
      if (S(o) ? fe.has(o) : ae(o)) return l
      if ((e || le(n, 0, o), t)) return l
      if (it(l)) {
        return !r || !F(o) ? l.value : l
      }
      return k(l) ? (e ? Ge(l) : qe(l)) : l
    }
  }
  function me(e = !1) {
    return function (t, n, o, s) {
      let r = t[n]
      if (Je(r) && it(r) && !it(o)) return !1
      if (
        !e &&
        !Je(o) &&
        (Qe(o) || ((o = tt(o)), (r = tt(r))), !b(t) && it(r) && !it(o))
      )
        return (r.value = o), !0
      const l = b(t) && F(n) ? Number(n) < t.length : y(t, n),
        i = Reflect.set(t, n, o, s)
      return (
        t === tt(s) && (l ? U(o, r) && ce(t, 'set', n, o) : ce(t, 'add', n, o)),
        i
      )
    }
  }
  const ye = {
      get: pe,
      set: me(),
      deleteProperty: function (e, t) {
        const n = y(e, t)
        e[t]
        const o = Reflect.deleteProperty(e, t)
        return o && n && ce(e, 'delete', t, void 0), o
      },
      has: function (e, t) {
        const n = Reflect.has(e, t)
        return (S(t) && fe.has(t)) || le(e, 0, t), n
      },
      ownKeys: function (e) {
        return le(e, 0, b(e) ? 'length' : J), Reflect.ownKeys(e)
      }
    },
    be = { get: he, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
    xe = g({}, ye, { get: de, set: me(!0) }),
    we = (e) => e,
    Ce = (e) => Reflect.getPrototypeOf(e)
  function Se(e, t, n = !1, o = !1) {
    const s = tt((e = e.__v_raw)),
      r = tt(t)
    t !== r && !n && le(s, 0, t), !n && le(s, 0, r)
    const { has: l } = Ce(s),
      i = o ? we : n ? st : ot
    return l.call(s, t)
      ? i(e.get(t))
      : l.call(s, r)
      ? i(e.get(r))
      : void (e !== s && e.get(t))
  }
  function ke(e, t = !1) {
    const n = this.__v_raw,
      o = tt(n),
      s = tt(e)
    return (
      e !== s && !t && le(o, 0, e),
      !t && le(o, 0, s),
      e === s ? n.has(e) : n.has(e) || n.has(s)
    )
  }
  function Oe(e, t = !1) {
    return (e = e.__v_raw), !t && le(tt(e), 0, J), Reflect.get(e, 'size', e)
  }
  function Pe(e) {
    e = tt(e)
    const t = tt(this)
    return Ce(t).has.call(t, e) || (t.add(e), ce(t, 'add', e, e)), this
  }
  function Ee(e, t) {
    t = tt(t)
    const n = tt(this),
      { has: o, get: s } = Ce(n)
    let r = o.call(n, e)
    r || ((e = tt(e)), (r = o.call(n, e)))
    const l = s.call(n, e)
    return (
      n.set(e, t), r ? U(t, l) && ce(n, 'set', e, t) : ce(n, 'add', e, t), this
    )
  }
  function Fe(e) {
    const t = tt(this),
      { has: n, get: o } = Ce(t)
    let s = n.call(t, e)
    s || ((e = tt(e)), (s = n.call(t, e))), o && o.call(t, e)
    const r = t.delete(e)
    return s && ce(t, 'delete', e, void 0), r
  }
  function Ae() {
    const e = tt(this),
      t = 0 !== e.size,
      n = e.clear()
    return t && ce(e, 'clear', void 0, void 0), n
  }
  function Re(e, t) {
    return function (n, o) {
      const s = this,
        r = s.__v_raw,
        l = tt(r),
        i = t ? we : e ? st : ot
      return !e && le(l, 0, J), r.forEach((e, t) => n.call(o, i(e), i(t), s))
    }
  }
  function je(e, t, n) {
    return function (...o) {
      const s = this.__v_raw,
        r = tt(s),
        l = x(r),
        i = 'entries' === e || (e === Symbol.iterator && l),
        c = 'keys' === e && l,
        u = s[e](...o),
        a = n ? we : t ? st : ot
      return (
        !t && le(r, 0, c ? Q : J),
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
  function Me(e) {
    return function (...t) {
      return 'delete' !== e && this
    }
  }
  function Te() {
    const e = {
        get(e) {
          return Se(this, e)
        },
        get size() {
          return Oe(this)
        },
        has: ke,
        add: Pe,
        set: Ee,
        delete: Fe,
        clear: Ae,
        forEach: Re(!1, !1)
      },
      t = {
        get(e) {
          return Se(this, e, !1, !0)
        },
        get size() {
          return Oe(this)
        },
        has: ke,
        add: Pe,
        set: Ee,
        delete: Fe,
        clear: Ae,
        forEach: Re(!1, !0)
      },
      n = {
        get(e) {
          return Se(this, e, !0)
        },
        get size() {
          return Oe(this, !0)
        },
        has(e) {
          return ke.call(this, e, !0)
        },
        add: Me('add'),
        set: Me('set'),
        delete: Me('delete'),
        clear: Me('clear'),
        forEach: Re(!0, !1)
      },
      o = {
        get(e) {
          return Se(this, e, !0, !0)
        },
        get size() {
          return Oe(this, !0)
        },
        has(e) {
          return ke.call(this, e, !0)
        },
        add: Me('add'),
        set: Me('set'),
        delete: Me('delete'),
        clear: Me('clear'),
        forEach: Re(!0, !0)
      }
    return (
      ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
        ;(e[s] = je(s, !1, !1)),
          (n[s] = je(s, !0, !1)),
          (t[s] = je(s, !1, !0)),
          (o[s] = je(s, !0, !0))
      }),
      [e, n, t, o]
    )
  }
  const [Ne, Ve, $e, Ue] = Te()
  function Ie(e, t) {
    const n = t ? (e ? Ue : $e) : e ? Ve : Ne
    return (t, o, s) =>
      '__v_isReactive' === o
        ? !e
        : '__v_isReadonly' === o
        ? e
        : '__v_raw' === o
        ? t
        : Reflect.get(y(n, o) && o in t ? n : t, o, s)
  }
  const Le = { get: Ie(!1, !1) },
    Be = { get: Ie(!1, !0) },
    De = { get: Ie(!0, !1) },
    We = new WeakMap(),
    ze = new WeakMap(),
    He = new WeakMap(),
    Ke = new WeakMap()
  function Ye(e) {
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
        })(((e) => E(e).slice(8, -1))(e))
  }
  function qe(e) {
    return Je(e) ? e : Xe(e, !1, ye, Le, We)
  }
  function Ge(e) {
    return Xe(e, !0, be, De, He)
  }
  function Xe(e, t, n, o, s) {
    if (!k(e)) return e
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e
    const r = s.get(e)
    if (r) return r
    const l = Ye(e)
    if (0 === l) return e
    const i = new Proxy(e, 2 === l ? o : n)
    return s.set(e, i), i
  }
  function Ze(e) {
    return Je(e) ? Ze(e.__v_raw) : !(!e || !e.__v_isReactive)
  }
  function Je(e) {
    return !(!e || !e.__v_isReadonly)
  }
  function Qe(e) {
    return !(!e || !e.__v_isShallow)
  }
  function et(e) {
    return Ze(e) || Je(e)
  }
  function tt(e) {
    const t = e && e.__v_raw
    return t ? tt(t) : e
  }
  function nt(e) {
    return L(e, '__v_skip', !0), e
  }
  const ot = (e) => (k(e) ? qe(e) : e),
    st = (e) => (k(e) ? Ge(e) : e)
  function rt(e) {
    ne && Z && ie((e = tt(e)).dep || (e.dep = H()))
  }
  function lt(e, t) {
    ;(e = tt(e)).dep && ue(e.dep)
  }
  function it(e) {
    return !(!e || !0 !== e.__v_isRef)
  }
  function ct(e) {
    return (function (e, t) {
      if (it(e)) return e
      return new ut(e, t)
    })(e, !1)
  }
  class ut {
    constructor(e, t) {
      ;(this.__v_isShallow = t),
        (this.dep = void 0),
        (this.__v_isRef = !0),
        (this._rawValue = t ? e : tt(e)),
        (this._value = t ? e : ot(e))
    }
    get value() {
      return rt(this), this._value
    }
    set value(e) {
      ;(e = this.__v_isShallow ? e : tt(e)),
        U(e, this._rawValue) &&
          ((this._rawValue = e),
          (this._value = this.__v_isShallow ? e : ot(e)),
          lt(this))
    }
  }
  const at = {
    get: (e, t, n) => {
      return it((o = Reflect.get(e, t, n))) ? o.value : o
      var o
    },
    set: (e, t, n, o) => {
      const s = e[t]
      return it(s) && !it(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, o)
    }
  }
  function ft(e) {
    return Ze(e) ? e : new Proxy(e, at)
  }
  class pt {
    constructor(e, t, n, o) {
      ;(this._setter = t),
        (this.dep = void 0),
        (this.__v_isRef = !0),
        (this._dirty = !0),
        (this.effect = new ee(e, () => {
          this._dirty || ((this._dirty = !0), lt(this))
        })),
        (this.effect.computed = this),
        (this.effect.active = this._cacheable = !o),
        (this.__v_isReadonly = n)
    }
    get value() {
      const e = tt(this)
      return (
        rt(e),
        (!e._dirty && e._cacheable) ||
          ((e._dirty = !1), (e._value = e.effect.run())),
        e._value
      )
    }
    set value(e) {
      this._setter(e)
    }
  }
  function dt(e, t, n, o) {
    let s
    try {
      s = o ? e(...o) : e()
    } catch (r) {
      vt(r, t, n)
    }
    return s
  }
  function ht(e, t, n, o) {
    if (w(e)) {
      const s = dt(e, t, n, o)
      return (
        s &&
          O(s) &&
          s.catch((e) => {
            vt(e, t, n)
          }),
        s
      )
    }
    const s = []
    for (let r = 0; r < e.length; r++) s.push(ht(e[r], t, n, o))
    return s
  }
  function vt(e, t, n, o = !0) {
    t && t.vnode
    if (t) {
      let o = t.parent
      const s = t.proxy,
        r = n
      for (; o; ) {
        const t = o.ec
        if (t)
          for (let n = 0; n < t.length; n++) if (!1 === t[n](e, s, r)) return
        o = o.parent
      }
      const l = t.appContext.config.errorHandler
      if (l) return void dt(l, null, 10, [e, s, r])
    }
    !(function (e, t, n, o = !0) {
      console.error(e)
    })(e, 0, 0, o)
  }
  Promise.resolve()
  let gt = !1,
    _t = !1
  const mt = []
  let yt = 0
  const bt = []
  let xt = null,
    wt = 0
  const Ct = []
  let St = null,
    kt = 0
  const Ot = Promise.resolve()
  let Pt = null,
    Et = null
  function Ft(e) {
    const t = Pt || Ot
    return e ? t.then(this ? e.bind(this) : e) : t
  }
  function At(e) {
    ;(mt.length && mt.includes(e, gt && e.allowRecurse ? yt + 1 : yt)) ||
      e === Et ||
      (null == e.id
        ? mt.push(e)
        : mt.splice(
            (function (e) {
              let t = yt + 1,
                n = mt.length
              for (; t < n; ) {
                const o = (t + n) >>> 1
                Nt(mt[o]) < e ? (t = o + 1) : (n = o)
              }
              return t
            })(e.id),
            0,
            e
          ),
      Rt())
  }
  function Rt() {
    gt || _t || ((_t = !0), (Pt = Ot.then(Vt)))
  }
  function jt(e, t, n, o) {
    b(e)
      ? n.push(...e)
      : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) || n.push(e),
      Rt()
  }
  function Mt(e, t = null) {
    if (bt.length) {
      for (
        Et = t, xt = [...new Set(bt)], bt.length = 0, wt = 0;
        wt < xt.length;
        wt++
      )
        xt[wt]()
      ;(xt = null), (wt = 0), (Et = null), Mt(e, t)
    }
  }
  function Tt(e) {
    if (Ct.length) {
      const e = [...new Set(Ct)]
      if (((Ct.length = 0), St)) return void St.push(...e)
      for (
        St = e, St.sort((e, t) => Nt(e) - Nt(t)), kt = 0;
        kt < St.length;
        kt++
      )
        St[kt]()
      ;(St = null), (kt = 0)
    }
  }
  const Nt = (e) => (null == e.id ? 1 / 0 : e.id)
  function Vt(e) {
    ;(_t = !1), (gt = !0), Mt(e), mt.sort((e, t) => Nt(e) - Nt(t))
    try {
      for (yt = 0; yt < mt.length; yt++) {
        const e = mt[yt]
        e && !1 !== e.active && dt(e, null, 14)
      }
    } finally {
      ;(yt = 0),
        (mt.length = 0),
        Tt(),
        (gt = !1),
        (Pt = null),
        (mt.length || bt.length || Ct.length) && Vt(e)
    }
  }
  function $t(e, t, ...n) {
    const o = e.vnode.props || u
    let s = n
    const r = t.startsWith('update:'),
      l = r && t.slice(7)
    if (l && l in o) {
      const e = `${'modelValue' === l ? 'model' : l}Modifiers`,
        { number: t, trim: r } = o[e] || u
      r ? (s = n.map((e) => e.trim())) : t && (s = n.map(B))
    }
    let i,
      c = o[(i = $(t))] || o[(i = $(M(t)))]
    !c && r && (c = o[(i = $(N(t)))]), c && ht(c, e, 6, s)
    const a = o[i + 'Once']
    if (a) {
      if (e.emitted) {
        if (e.emitted[i]) return
      } else e.emitted = {}
      ;(e.emitted[i] = !0), ht(a, e, 6, s)
    }
  }
  function Ut(e, t, n = !1) {
    const o = t.emitsCache,
      s = o.get(e)
    if (void 0 !== s) return s
    const r = e.emits
    let l = {},
      i = !1
    if (!w(e)) {
      const o = (e) => {
        const n = Ut(e, t, !0)
        n && ((i = !0), g(l, n))
      }
      !n && t.mixins.length && t.mixins.forEach(o),
        e.extends && o(e.extends),
        e.mixins && e.mixins.forEach(o)
    }
    return r || i
      ? (b(r) ? r.forEach((e) => (l[e] = null)) : g(l, r), o.set(e, l), l)
      : (o.set(e, null), null)
  }
  function It(e, t) {
    return (
      !(!e || !h(t)) &&
      ((t = t.slice(2).replace(/Once$/, '')),
      y(e, t[0].toLowerCase() + t.slice(1)) || y(e, N(t)) || y(e, t))
    )
  }
  let Lt = null,
    Bt = null
  function Dt(e) {
    const t = Lt
    return (Lt = e), (Bt = (e && e.type.__scopeId) || null), t
  }
  function Wt(e) {
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
      ctx: h,
      inheritAttrs: g
    } = e
    let _, m
    const y = Dt(e)
    try {
      if (4 & n.shapeFlag) {
        const e = s || o
        ;(_ = Po(a.call(e, e, f, r, d, p, h))), (m = c)
      } else {
        const e = t
        0,
          (_ = Po(
            e.length > 1 ? e(r, { attrs: c, slots: i, emit: u }) : e(r, null)
          )),
          (m = t.props ? c : zt(c))
      }
    } catch (x) {
      ;(fo.length = 0), vt(x, e, 1), (_ = So(uo))
    }
    let b = _
    if (m && !1 !== g) {
      const e = Object.keys(m),
        { shapeFlag: t } = b
      e.length && 7 & t && (l && e.some(v) && (m = Ht(m, l)), (b = ko(b, m)))
    }
    return (
      n.dirs && (b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs),
      n.transition && (b.transition = n.transition),
      (_ = b),
      Dt(y),
      _
    )
  }
  const zt = (e) => {
      let t
      for (const n in e)
        ('class' === n || 'style' === n || h(n)) && ((t || (t = {}))[n] = e[n])
      return t
    },
    Ht = (e, t) => {
      const n = {}
      for (const o in e) (v(o) && o.slice(9) in t) || (n[o] = e[o])
      return n
    }
  function Kt(e, t, n) {
    const o = Object.keys(t)
    if (o.length !== Object.keys(e).length) return !0
    for (let s = 0; s < o.length; s++) {
      const r = o[s]
      if (t[r] !== e[r] && !It(n, r)) return !0
    }
    return !1
  }
  function Yt(e, t, n = !1) {
    const o = Vo || Lt
    if (o) {
      const s =
        null == o.parent
          ? o.vnode.appContext && o.vnode.appContext.provides
          : o.parent.provides
      if (s && e in s) return s[e]
      if (arguments.length > 1) return n && w(t) ? t.call(o.proxy) : t
    }
  }
  const qt = {}
  function Gt(e, t, n) {
    return Xt(e, t, n)
  }
  function Xt(
    e,
    t,
    { immediate: n, deep: o, flush: s, onTrack: r, onTrigger: l } = u
  ) {
    const i = Vo
    let c,
      a,
      p = !1,
      d = !1
    if (
      (it(e)
        ? ((c = () => e.value), (p = Qe(e)))
        : Ze(e)
        ? ((c = () => e), (o = !0))
        : b(e)
        ? ((d = !0),
          (p = e.some(Ze)),
          (c = () =>
            e.map((e) =>
              it(e) ? e.value : Ze(e) ? Qt(e) : w(e) ? dt(e, i, 2) : void 0
            )))
        : (c = w(e)
            ? t
              ? () => dt(e, i, 2)
              : () => {
                  if (!i || !i.isUnmounted) return a && a(), ht(e, i, 3, [h])
                }
            : f),
      t && o)
    ) {
      const e = c
      c = () => Qt(e())
    }
    let h = (e) => {
      a = y.onStop = () => {
        dt(e, i, 4)
      }
    }
    if (Bo)
      return (h = f), t ? n && ht(t, i, 3, [c(), d ? [] : void 0, h]) : c(), f
    let v = d ? [] : qt
    const g = () => {
      if (y.active)
        if (t) {
          const e = y.run()
          ;(o || p || (d ? e.some((e, t) => U(e, v[t])) : U(e, v))) &&
            (a && a(), ht(t, i, 3, [e, v === qt ? void 0 : v, h]), (v = e))
        } else y.run()
    }
    let m
    ;(g.allowRecurse = !!t),
      (m =
        'sync' === s
          ? g
          : 'post' === s
          ? () => no(g, i && i.suspense)
          : () => {
              !i || i.isMounted
                ? (function (e) {
                    jt(e, xt, bt, wt)
                  })(g)
                : g()
            })
    const y = new ee(c, m)
    return (
      t
        ? n
          ? g()
          : (v = y.run())
        : 'post' === s
        ? no(y.run.bind(y), i && i.suspense)
        : y.run(),
      () => {
        y.stop(), i && i.scope && _(i.scope.effects, y)
      }
    )
  }
  function Zt(e, t, n) {
    const o = this.proxy,
      s = C(e) ? (e.includes('.') ? Jt(o, e) : () => o[e]) : e.bind(o, o)
    let r
    w(t) ? (r = t) : ((r = t.handler), (n = t))
    const l = Vo
    Uo(this)
    const i = Xt(s, r.bind(o), n)
    return l ? Uo(l) : Io(), i
  }
  function Jt(e, t) {
    const n = t.split('.')
    return () => {
      let t = e
      for (let e = 0; e < n.length && t; e++) t = t[n[e]]
      return t
    }
  }
  function Qt(e, t) {
    if (!k(e) || e.__v_skip) return e
    if ((t = t || new Set()).has(e)) return e
    if ((t.add(e), it(e))) Qt(e.value, t)
    else if (b(e)) for (let n = 0; n < e.length; n++) Qt(e[n], t)
    else if ('[object Set]' === E(e) || x(e))
      e.forEach((e) => {
        Qt(e, t)
      })
    else if (((e) => '[object Object]' === E(e))(e))
      for (const n in e) Qt(e[n], t)
    return e
  }
  const en = [Function, Array]
  Boolean, Boolean
  function tn(e, t) {
    const { leavingVNodes: n } = e
    let o = n.get(t.type)
    return o || ((o = Object.create(null)), n.set(t.type, o)), o
  }
  function nn(e, t, n, o) {
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
      b = tn(n, e),
      x = (e, t) => {
        e && ht(e, o, 9, t)
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
          r && yo(e, r) && r.el._leaveCb && r.el._leaveCb(), x(o, [t])
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
        clone: (e) => nn(e, t, n, o)
      }
    return w
  }
  function on(e) {
    if (an(e)) return ((e = ko(e)).children = null), e
  }
  function sn(e) {
    return an(e) ? (e.children ? e.children[0] : void 0) : e
  }
  function rn(e, t) {
    6 & e.shapeFlag && e.component
      ? rn(e.component.subTree, t)
      : 128 & e.shapeFlag
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t)
  }
  function ln(e, t = !1) {
    let n = [],
      o = 0
    for (let s = 0; s < e.length; s++) {
      const r = e[s]
      r.type === io
        ? (128 & r.patchFlag && o++, (n = n.concat(ln(r.children, t))))
        : (t || r.type !== uo) && n.push(r)
    }
    if (o > 1) for (let s = 0; s < n.length; s++) n[s].patchFlag = -2
    return n
  }
  function cn(e) {
    return w(e) ? { setup: e, name: e.name } : e
  }
  const un = (e) => !!e.type.__asyncLoader,
    an = (e) => e.type.__isKeepAlive
  function fn(e, t) {
    dn(e, 'a', t)
  }
  function pn(e, t) {
    dn(e, 'da', t)
  }
  function dn(e, t, n = Vo) {
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
    if ((vn(t, o, n), n)) {
      let e = n.parent
      for (; e && e.parent; )
        an(e.parent.vnode) && hn(o, t, n, e), (e = e.parent)
    }
  }
  function hn(e, t, n, o) {
    const s = vn(t, e, o, !0)
    wn(() => {
      _(o[t], s)
    }, n)
  }
  function vn(e, t, n = Vo, o = !1) {
    if (n) {
      const s = n[e] || (n[e] = []),
        r =
          t.__weh ||
          (t.__weh = (...o) => {
            if (n.isUnmounted) return
            se(), Uo(n)
            const s = ht(t, n, e, o)
            return Io(), re(), s
          })
      return o ? s.unshift(r) : s.push(r), r
    }
  }
  const gn =
      (e) =>
      (t, n = Vo) =>
        (!Bo || 'sp' === e) && vn(e, t, n),
    _n = gn('bm'),
    mn = gn('m'),
    yn = gn('bu'),
    bn = gn('u'),
    xn = gn('bum'),
    wn = gn('um'),
    Cn = gn('sp'),
    Sn = gn('rtg'),
    kn = gn('rtc')
  function On(e, t = Vo) {
    vn('ec', e, t)
  }
  let Pn = !0
  function En(e) {
    const t = Rn(e),
      n = e.proxy,
      o = e.ctx
    ;(Pn = !1), t.beforeCreate && Fn(t.beforeCreate, e, 'bc')
    const {
      data: s,
      computed: r,
      methods: l,
      watch: i,
      provide: c,
      inject: u,
      created: a,
      beforeMount: p,
      mounted: d,
      beforeUpdate: h,
      updated: v,
      activated: g,
      deactivated: _,
      beforeDestroy: m,
      beforeUnmount: y,
      destroyed: x,
      unmounted: C,
      render: S,
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
        (function (e, t, n = f, o = !1) {
          b(e) && (e = Nn(e))
          for (const s in e) {
            const n = e[s]
            let r
            ;(r = k(n)
              ? 'default' in n
                ? Yt(n.from || s, n.default, !0)
                : Yt(n.from || s)
              : Yt(n)),
              it(r) && o
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
      for (const f in l) {
        const e = l[f]
        w(e) && (o[f] = e.bind(n))
      }
    if (s) {
      const t = s.call(n, n)
      k(t) && (e.data = qe(t))
    }
    if (((Pn = !0), r))
      for (const b in r) {
        const e = r[b],
          t = w(e) ? e.bind(n, n) : w(e.get) ? e.get.bind(n, n) : f,
          s = !w(e) && w(e.set) ? e.set.bind(n) : f,
          l = Ho({ get: t, set: s })
        Object.defineProperty(o, b, {
          enumerable: !0,
          configurable: !0,
          get: () => l.value,
          set: (e) => (l.value = e)
        })
      }
    if (i) for (const f in i) An(i[f], o, n, f)
    if (c) {
      const e = w(c) ? c.call(n) : c
      Reflect.ownKeys(e).forEach((t) => {
        !(function (e, t) {
          if (Vo) {
            let n = Vo.provides
            const o = Vo.parent && Vo.parent.provides
            o === n && (n = Vo.provides = Object.create(o)), (n[e] = t)
          }
        })(t, e[t])
      })
    }
    function N(e, t) {
      b(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n))
    }
    if (
      (a && Fn(a, e, 'c'),
      N(_n, p),
      N(mn, d),
      N(yn, h),
      N(bn, v),
      N(fn, g),
      N(pn, _),
      N(On, E),
      N(kn, O),
      N(Sn, P),
      N(xn, y),
      N(wn, C),
      N(Cn, F),
      b(A))
    )
      if (A.length) {
        const t = e.exposed || (e.exposed = {})
        A.forEach((e) => {
          Object.defineProperty(t, e, {
            get: () => n[e],
            set: (t) => (n[e] = t)
          })
        })
      } else e.exposed || (e.exposed = {})
    S && e.render === f && (e.render = S),
      null != R && (e.inheritAttrs = R),
      j && (e.components = j),
      M && (e.directives = M)
  }
  function Fn(e, t, n) {
    ht(b(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n)
  }
  function An(e, t, n, o) {
    const s = o.includes('.') ? Jt(n, o) : () => n[o]
    if (C(e)) {
      const n = t[e]
      w(n) && Gt(s, n)
    } else if (w(e)) Gt(s, e.bind(n))
    else if (k(e))
      if (b(e)) e.forEach((e) => An(e, t, n, o))
      else {
        const o = w(e.handler) ? e.handler.bind(n) : t[e.handler]
        w(o) && Gt(s, o, e)
      }
  }
  function Rn(e) {
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
        ? ((c = {}), s.length && s.forEach((e) => jn(c, e, l, !0)), jn(c, t, l))
        : (c = t),
      r.set(t, c),
      c
    )
  }
  function jn(e, t, n, o = !1) {
    const { mixins: s, extends: r } = t
    r && jn(e, r, n, !0), s && s.forEach((t) => jn(e, t, n, !0))
    for (const l in t)
      if (o && 'expose' === l);
      else {
        const o = Mn[l] || (n && n[l])
        e[l] = o ? o(e[l], t[l]) : t[l]
      }
    return e
  }
  const Mn = {
    data: Tn,
    props: $n,
    emits: $n,
    methods: $n,
    computed: $n,
    beforeCreate: Vn,
    created: Vn,
    beforeMount: Vn,
    mounted: Vn,
    beforeUpdate: Vn,
    updated: Vn,
    beforeDestroy: Vn,
    beforeUnmount: Vn,
    destroyed: Vn,
    unmounted: Vn,
    activated: Vn,
    deactivated: Vn,
    errorCaptured: Vn,
    serverPrefetch: Vn,
    components: $n,
    directives: $n,
    watch: function (e, t) {
      if (!e) return t
      if (!t) return e
      const n = g(Object.create(null), e)
      for (const o in t) n[o] = Vn(e[o], t[o])
      return n
    },
    provide: Tn,
    inject: function (e, t) {
      return $n(Nn(e), Nn(t))
    }
  }
  function Tn(e, t) {
    return t
      ? e
        ? function () {
            return g(
              w(e) ? e.call(this, this) : e,
              w(t) ? t.call(this, this) : t
            )
          }
        : t
      : e
  }
  function Nn(e) {
    if (b(e)) {
      const t = {}
      for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
      return t
    }
    return e
  }
  function Vn(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
  }
  function $n(e, t) {
    return e ? g(g(Object.create(null), e), t) : t
  }
  function Un(e, t, n, o = !1) {
    const s = {},
      r = {}
    L(r, bo, 1), (e.propsDefaults = Object.create(null)), In(e, t, s, r)
    for (const l in e.propsOptions[0]) l in s || (s[l] = void 0)
    n
      ? (e.props = o ? s : Xe(s, !1, xe, Be, ze))
      : e.type.props
      ? (e.props = s)
      : (e.props = r),
      (e.attrs = r)
  }
  function In(e, t, n, o) {
    const [s, r] = e.propsOptions
    let l,
      i = !1
    if (t)
      for (let c in t) {
        if (A(c)) continue
        const u = t[c]
        let a
        s && y(s, (a = M(c)))
          ? r && r.includes(a)
            ? ((l || (l = {}))[a] = u)
            : (n[a] = u)
          : It(e.emitsOptions, c) ||
            (c in o && u === o[c]) ||
            ((o[c] = u), (i = !0))
      }
    if (r) {
      const t = tt(n),
        o = l || u
      for (let l = 0; l < r.length; l++) {
        const i = r[l]
        n[i] = Ln(s, t, i, o[i], e, !y(o, i))
      }
    }
    return i
  }
  function Ln(e, t, n, o, s, r) {
    const l = e[n]
    if (null != l) {
      const e = y(l, 'default')
      if (e && void 0 === o) {
        const e = l.default
        if (l.type !== Function && w(e)) {
          const { propsDefaults: r } = s
          n in r ? (o = r[n]) : (Uo(s), (o = r[n] = e.call(null, t)), Io())
        } else o = e
      }
      l[0] &&
        (r && !e ? (o = !1) : !l[1] || ('' !== o && o !== N(n)) || (o = !0))
    }
    return o
  }
  function Bn(e, t, n = !1) {
    const o = t.propsCache,
      s = o.get(e)
    if (s) return s
    const r = e.props,
      l = {},
      i = []
    let c = !1
    if (!w(e)) {
      const o = (e) => {
        c = !0
        const [n, o] = Bn(e, t, !0)
        g(l, n), o && i.push(...o)
      }
      !n && t.mixins.length && t.mixins.forEach(o),
        e.extends && o(e.extends),
        e.mixins && e.mixins.forEach(o)
    }
    if (!r && !c) return o.set(e, a), a
    if (b(r))
      for (let a = 0; a < r.length; a++) {
        const e = M(r[a])
        Dn(e) && (l[e] = u)
      }
    else if (r)
      for (const u in r) {
        const e = M(u)
        if (Dn(e)) {
          const t = r[u],
            n = (l[e] = b(t) || w(t) ? { type: t } : t)
          if (n) {
            const t = Hn(Boolean, n.type),
              o = Hn(String, n.type)
            ;(n[0] = t > -1),
              (n[1] = o < 0 || t < o),
              (t > -1 || y(n, 'default')) && i.push(e)
          }
        }
      }
    const f = [l, i]
    return o.set(e, f), f
  }
  function Dn(e) {
    return '$' !== e[0]
  }
  function Wn(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/)
    return t ? t[1] : null === e ? 'null' : ''
  }
  function zn(e, t) {
    return Wn(e) === Wn(t)
  }
  function Hn(e, t) {
    return b(t) ? t.findIndex((t) => zn(t, e)) : w(t) && zn(t, e) ? 0 : -1
  }
  const Kn = (e) => '_' === e[0] || '$stable' === e,
    Yn = (e) => (b(e) ? e.map(Po) : [Po(e)]),
    qn = (e, t, n) => {
      const o = (function (e, t = Lt, n) {
        if (!t) return e
        if (e._n) return e
        const o = (...n) => {
          o._d && go(-1)
          const s = Dt(t),
            r = e(...n)
          return Dt(s), o._d && go(1), r
        }
        return (o._n = !0), (o._c = !0), (o._d = !0), o
      })((...e) => Yn(t(...e)), n)
      return (o._c = !1), o
    },
    Gn = (e, t, n) => {
      const o = e._ctx
      for (const s in e) {
        if (Kn(s)) continue
        const n = e[s]
        if (w(n)) t[s] = qn(0, n, o)
        else if (null != n) {
          const e = Yn(n)
          t[s] = () => e
        }
      }
    },
    Xn = (e, t) => {
      const n = Yn(t)
      e.slots.default = () => n
    }
  function Zn(e, t, n, o) {
    const s = e.dirs,
      r = t && t.dirs
    for (let l = 0; l < s.length; l++) {
      const i = s[l]
      r && (i.oldValue = r[l].value)
      let c = i.dir[o]
      c && (se(), ht(c, n, 8, [e.el, i, e, t]), re())
    }
  }
  function Jn() {
    return {
      app: null,
      config: {
        isNativeTag: p,
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
  let Qn = 0
  function eo(e, t) {
    return function (n, o = null) {
      null == o || k(o) || (o = null)
      const s = Jn(),
        r = new Set()
      let l = !1
      const i = (s.app = {
        _uid: Qn++,
        _component: n,
        _props: o,
        _container: null,
        _context: s,
        _instance: null,
        version: Ko,
        get config() {
          return s.config
        },
        set config(e) {},
        use: (e, ...t) => (
          r.has(e) ||
            (e && w(e.install)
              ? (r.add(e), e.install(i, ...t))
              : w(e) && (r.add(e), e(i, ...t))),
          i
        ),
        mixin: (e) => (s.mixins.includes(e) || s.mixins.push(e), i),
        component: (e, t) => (t ? ((s.components[e] = t), i) : s.components[e]),
        directive: (e, t) => (t ? ((s.directives[e] = t), i) : s.directives[e]),
        mount(r, c, u) {
          if (!l) {
            const a = So(n, o)
            return (
              (a.appContext = s),
              c && t ? t(a, r) : e(a, r, u),
              (l = !0),
              (i._container = r),
              (r.__vue_app__ = i),
              zo(a.component) || a.component.proxy
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
  function to(e, t, n, o, s = !1) {
    if (b(e))
      return void e.forEach((e, r) => to(e, t && (b(t) ? t[r] : t), n, o, s))
    if (un(o) && !s) return
    const r = 4 & o.shapeFlag ? zo(o.component) || o.component.proxy : o.el,
      l = s ? null : r,
      { i: i, r: c } = e,
      a = t && t.r,
      f = i.refs === u ? (i.refs = {}) : i.refs,
      p = i.setupState
    if (
      (null != a &&
        a !== c &&
        (C(a)
          ? ((f[a] = null), y(p, a) && (p[a] = null))
          : it(a) && (a.value = null)),
      w(c))
    )
      dt(c, i, 12, [l, f])
    else {
      const t = C(c),
        o = it(c)
      if (t || o) {
        const o = () => {
          if (e.f) {
            const n = t ? f[c] : c.value
            s
              ? b(n) && _(n, r)
              : b(n)
              ? n.includes(r) || n.push(r)
              : t
              ? (f[c] = [r])
              : ((c.value = [r]), e.k && (f[e.k] = c.value))
          } else
            t
              ? ((f[c] = l), y(p, c) && (p[c] = l))
              : it(c) && ((c.value = l), e.k && (f[e.k] = l))
        }
        l ? ((o.id = -1), no(o, n)) : o()
      }
    }
  }
  const no = function (e, t) {
    t && t.pendingBranch
      ? b(e)
        ? t.effects.push(...e)
        : t.effects.push(e)
      : jt(e, St, Ct, kt)
  }
  function oo(e) {
    return (function (e, t) {
      ;(
        D ||
        (D =
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
          setText: c,
          setElementText: p,
          parentNode: d,
          nextSibling: h,
          setScopeId: v = f,
          cloneNode: _,
          insertStaticContent: m
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
          e && !yo(e, t) && ((o = oe(e)), Z(e, s, r, !0), (e = null)),
            -2 === t.patchFlag && ((c = !1), (t.dynamicChildren = null))
          const { type: u, ref: a, shapeFlag: f } = t
          switch (u) {
            case co:
              x(e, t, n, o)
              break
            case uo:
              w(e, t, n, o)
              break
            case ao:
              null == e && C(t, n, o, l)
              break
            case io:
              $(e, t, n, o, s, r, l, i, c)
              break
            default:
              1 & f
                ? P(e, t, n, o, s, r, l, i, c)
                : 6 & f
                ? U(e, t, n, o, s, r, l, i, c)
                : (64 & f || 128 & f) &&
                  u.process(e, t, n, o, s, r, l, i, c, ue)
          }
          null != a && s && to(a, e && e.ref, r, t || e, !t)
        },
        x = (e, t, o, s) => {
          if (null == e) n((t.el = l(t.children)), o, s)
          else {
            const n = (t.el = e.el)
            t.children !== e.children && c(n, t.children)
          }
        },
        w = (e, t, o, s) => {
          null == e ? n((t.el = i(t.children || '')), o, s) : (t.el = e.el)
        },
        C = (e, t, n, o) => {
          ;[e.el, e.anchor] = m(e.children, t, n, o, e.el, e.anchor)
        },
        S = ({ el: e, anchor: t }, o, s) => {
          let r
          for (; e && e !== t; ) (r = h(e)), n(e, o, s), (e = r)
          n(t, o, s)
        },
        k = ({ el: e, anchor: t }) => {
          let n
          for (; e && e !== t; ) (n = h(e)), o(e), (e = n)
          o(t)
        },
        P = (e, t, n, o, s, r, l, i, c) => {
          ;(l = l || 'svg' === t.type),
            null == e ? E(t, n, o, s, r, l, i, c) : j(e, t, s, r, l, i, c)
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
                  R(
                    e.children,
                    f,
                    null,
                    l,
                    i,
                    c && 'foreignObject' !== h,
                    u,
                    a
                  ),
              b && Zn(e, null, l, 'created'),
              v)
            ) {
              for (const t in v)
                'value' === t ||
                  A(t) ||
                  s(f, t, null, v[t], c, e.children, l, i, ne)
              'value' in v && s(f, 'value', null, v.value),
                (d = v.onVnodeBeforeMount) && Ao(d, l, e)
            }
            F(f, e, e.scopeId, u, l)
          }
          b && Zn(e, null, l, 'beforeMount')
          const x = (!i || (i && !i.pendingBranch)) && m && !m.persisted
          x && m.beforeEnter(f),
            n(f, t, o),
            ((d = v && v.onVnodeMounted) || x || b) &&
              no(() => {
                d && Ao(d, l, e),
                  x && m.enter(f),
                  b && Zn(e, null, l, 'mounted')
              }, i)
        },
        F = (e, t, n, o, s) => {
          if ((n && v(e, n), o)) for (let r = 0; r < o.length; r++) v(e, o[r])
          if (s) {
            if (t === s.subTree) {
              const t = s.vnode
              F(e, t, t.scopeId, t.slotScopeIds, s.parent)
            }
          }
        },
        R = (e, t, n, o, s, r, l, i, c = 0) => {
          for (let u = c; u < e.length; u++) {
            const c = (e[u] = i ? Eo(e[u]) : Po(e[u]))
            b(null, c, t, n, o, s, r, l, i)
          }
        },
        j = (e, t, n, o, r, l, i) => {
          const c = (t.el = e.el)
          let { patchFlag: a, dynamicChildren: f, dirs: d } = t
          a |= 16 & e.patchFlag
          const h = e.props || u,
            v = t.props || u
          let g
          n && so(n, !1),
            (g = v.onVnodeBeforeUpdate) && Ao(g, n, t, e),
            d && Zn(t, e, n, 'beforeUpdate'),
            n && so(n, !0)
          const _ = r && 'foreignObject' !== t.type
          if (
            (f
              ? T(e.dynamicChildren, f, c, n, o, _, l)
              : i || Y(e, t, c, null, n, o, _, l, !1),
            a > 0)
          ) {
            if (16 & a) V(c, t, h, v, n, o, r)
            else if (
              (2 & a && h.class !== v.class && s(c, 'class', null, v.class, r),
              4 & a && s(c, 'style', h.style, v.style, r),
              8 & a)
            ) {
              const l = t.dynamicProps
              for (let t = 0; t < l.length; t++) {
                const i = l[t],
                  u = h[i],
                  a = v[i]
                ;(a === u && 'value' !== i) ||
                  s(c, i, u, a, r, e.children, n, o, ne)
              }
            }
            1 & a && e.children !== t.children && p(c, t.children)
          } else i || null != f || V(c, t, h, v, n, o, r)
          ;((g = v.onVnodeUpdated) || d) &&
            no(() => {
              g && Ao(g, n, t, e), d && Zn(t, e, n, 'updated')
            }, o)
        },
        T = (e, t, n, o, s, r, l) => {
          for (let i = 0; i < t.length; i++) {
            const c = e[i],
              u = t[i],
              a =
                c.el && (c.type === io || !yo(c, u) || 70 & c.shapeFlag)
                  ? d(c.el)
                  : n
            b(c, u, a, null, o, s, r, l, !0)
          }
        },
        V = (e, t, n, o, r, l, i) => {
          if (n !== o) {
            for (const c in o) {
              if (A(c)) continue
              const u = o[c],
                a = n[c]
              u !== a && 'value' !== c && s(e, c, a, u, i, t.children, r, l, ne)
            }
            if (n !== u)
              for (const c in n)
                A(c) || c in o || s(e, c, n[c], null, i, t.children, r, l, ne)
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
              ? (T(e.dynamicChildren, h, o, r, i, c, u),
                (null != t.key || (r && t === r.subTree)) && ro(e, t, !0))
              : Y(e, t, o, p, r, i, c, u, a)
        },
        U = (e, t, n, o, s, r, l, i, c) => {
          ;(t.slotScopeIds = i),
            null == e
              ? 512 & t.shapeFlag
                ? s.ctx.activate(t, n, o, l, c)
                : B(t, n, o, s, r, l, c)
              : W(e, t, c)
        },
        B = (e, t, n, o, s, r, l) => {
          const i = (e.component = (function (e, t, n) {
            const o = e.type,
              s = (t ? t.appContext : e.appContext) || To,
              r = {
                uid: No++,
                vnode: e,
                type: o,
                parent: t,
                appContext: s,
                root: null,
                next: null,
                subTree: null,
                effect: null,
                update: null,
                scope: new z(!0),
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
                propsOptions: Bn(o, s),
                emitsOptions: Ut(o, s),
                emit: null,
                emitted: null,
                propsDefaults: u,
                inheritAttrs: o.inheritAttrs,
                ctx: u,
                data: u,
                props: u,
                attrs: u,
                slots: u,
                refs: u,
                setupState: u,
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
              (r.emit = $t.bind(null, r)),
              e.ce && e.ce(r)
            return r
          })(e, o, s))
          if (
            (an(e) && (i.ctx.renderer = ue),
            (function (e, t = !1) {
              Bo = t
              const { props: n, children: o } = e.vnode,
                s = Lo(e)
              Un(e, n, s, t),
                ((e, t) => {
                  if (32 & e.vnode.shapeFlag) {
                    const n = t._
                    n
                      ? ((e.slots = tt(t)), L(t, '_', n))
                      : Gn(t, (e.slots = {}))
                  } else (e.slots = {}), t && Xn(e, t)
                  L(e.slots, bo, 1)
                })(e, o)
              const r = s
                ? (function (e, t) {
                    const n = e.type
                    ;(e.accessCache = Object.create(null)),
                      (e.proxy = nt(new Proxy(e.ctx, Mo)))
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
                                        get: (t, n) => (
                                          le(e, 0, '$attrs'), t[n]
                                        )
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
                      Uo(e), se()
                      const s = dt(o, e, 0, [e.props, n])
                      if ((re(), Io(), O(s))) {
                        if ((s.then(Io, Io), t))
                          return s
                            .then((n) => {
                              Do(e, n, t)
                            })
                            .catch((t) => {
                              vt(t, e, 0)
                            })
                        e.asyncDep = s
                      } else Do(e, s, t)
                    } else Wo(e, t)
                  })(e, t)
                : void 0
              Bo = !1
            })(i),
            i.asyncDep)
          ) {
            if ((s && s.registerDep(i, H), !e.el)) {
              const e = (i.subTree = So(uo))
              w(null, e, t, n)
            }
          } else H(i, e, t, n, s, r, l)
        },
        W = (e, t, n) => {
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
                  (o !== l && (o ? !l || Kt(o, l, u) : !!l))
                )
              if (1024 & c) return !0
              if (16 & c) return o ? Kt(o, l, u) : !!l
              if (8 & c) {
                const e = t.dynamicProps
                for (let t = 0; t < e.length; t++) {
                  const n = e[t]
                  if (l[n] !== o[n] && !It(u, n)) return !0
                }
              }
              return !1
            })(e, t, n)
          ) {
            if (o.asyncDep && !o.asyncResolved) return void K(o, t, n)
            ;(o.next = t),
              (function (e) {
                const t = mt.indexOf(e)
                t > yt && mt.splice(t, 1)
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
                so(e, !1),
                  n ? ((n.el = u.el), K(e, n, l)) : (n = u),
                  o && I(o),
                  (t = n.props && n.props.onVnodeBeforeUpdate) &&
                    Ao(t, c, n, u),
                  so(e, !0)
                const f = Wt(e),
                  p = e.subTree
                ;(e.subTree = f),
                  b(p, f, d(p.el), oe(p), e, s, r),
                  (n.el = f.el),
                  null === a &&
                    (function ({ vnode: e, parent: t }, n) {
                      for (; t && t.subTree === e; )
                        ((e = t.vnode).el = n), (t = t.parent)
                    })(e, f.el),
                  i && no(i, s),
                  (t = n.props && n.props.onVnodeUpdated) &&
                    no(() => Ao(t, c, n, u), s)
              } else {
                let l
                const { el: i, props: c } = t,
                  { bm: u, m: a, parent: f } = e,
                  p = un(t)
                if (
                  (so(e, !1),
                  u && I(u),
                  !p && (l = c && c.onVnodeBeforeMount) && Ao(l, f, t),
                  so(e, !0),
                  i && fe)
                ) {
                  const n = () => {
                    ;(e.subTree = Wt(e)), fe(i, e.subTree, e, s, null)
                  }
                  p
                    ? t.type.__asyncLoader().then(() => !e.isUnmounted && n())
                    : n()
                } else {
                  const l = (e.subTree = Wt(e))
                  b(null, l, n, o, e, s, r), (t.el = l.el)
                }
                if ((a && no(a, s), !p && (l = c && c.onVnodeMounted))) {
                  const e = t
                  no(() => Ao(l, f, e), s)
                }
                256 & t.shapeFlag && e.a && no(e.a, s),
                  (e.isMounted = !0),
                  (t = n = o = null)
              }
            },
            c = (e.effect = new ee(i, () => At(e.update), e.scope)),
            u = (e.update = c.run.bind(c))
          ;(u.id = e.uid), so(e, !0), u()
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
                i = tt(s),
                [c] = e.propsOptions
              let u = !1
              if (!(o || l > 0) || 16 & l) {
                let o
                In(e, t, s, r) && (u = !0)
                for (const r in i)
                  (t && (y(t, r) || ((o = N(r)) !== r && y(t, o)))) ||
                    (c
                      ? !n ||
                        (void 0 === n[r] && void 0 === n[o]) ||
                        (s[r] = Ln(c, i, r, void 0, e, !0))
                      : delete s[r])
                if (r !== i)
                  for (const e in r) (t && y(t, e)) || (delete r[e], (u = !0))
              } else if (8 & l) {
                const n = e.vnode.dynamicProps
                for (let o = 0; o < n.length; o++) {
                  let l = n[o]
                  const a = t[l]
                  if (c)
                    if (y(r, l)) a !== r[l] && ((r[l] = a), (u = !0))
                    else {
                      const t = M(l)
                      s[t] = Ln(c, i, t, a, e, !1)
                    }
                  else a !== r[l] && ((r[l] = a), (u = !0))
                }
              }
              u && ce(e, 'set', '$attrs')
            })(e, t.props, o, n),
            ((e, t, n) => {
              const { vnode: o, slots: s } = e
              let r = !0,
                l = u
              if (32 & o.shapeFlag) {
                const e = t._
                e
                  ? n && 1 === e
                    ? (r = !1)
                    : (g(s, t), n || 1 !== e || delete s._)
                  : ((r = !t.$stable), Gn(t, s)),
                  (l = t)
              } else t && (Xn(e, t), (l = { default: 1 }))
              if (r) for (const i in s) Kn(i) || i in l || delete s[i]
            })(e, t.children, n),
            se(),
            Mt(void 0, e.update),
            re()
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
          t = t || a
          const u = (e = e || a).length,
            f = t.length,
            p = Math.min(u, f)
          let d
          for (d = 0; d < p; d++) {
            const o = (t[d] = c ? Eo(t[d]) : Po(t[d]))
            b(e[d], o, n, null, s, r, l, i, c)
          }
          u > f ? ne(e, s, r, !0, !1, p) : R(t, n, o, s, r, l, i, c, p)
        },
        G = (e, t, n, o, s, r, l, i, c) => {
          let u = 0
          const f = t.length
          let p = e.length - 1,
            d = f - 1
          for (; u <= p && u <= d; ) {
            const o = e[u],
              a = (t[u] = c ? Eo(t[u]) : Po(t[u]))
            if (!yo(o, a)) break
            b(o, a, n, null, s, r, l, i, c), u++
          }
          for (; u <= p && u <= d; ) {
            const o = e[p],
              u = (t[d] = c ? Eo(t[d]) : Po(t[d]))
            if (!yo(o, u)) break
            b(o, u, n, null, s, r, l, i, c), p--, d--
          }
          if (u > p) {
            if (u <= d) {
              const e = d + 1,
                a = e < f ? t[e].el : o
              for (; u <= d; )
                b(null, (t[u] = c ? Eo(t[u]) : Po(t[u])), n, a, s, r, l, i, c),
                  u++
            }
          } else if (u > d) for (; u <= p; ) Z(e[u], s, r, !0), u++
          else {
            const h = u,
              v = u,
              g = new Map()
            for (u = v; u <= d; u++) {
              const e = (t[u] = c ? Eo(t[u]) : Po(t[u]))
              null != e.key && g.set(e.key, u)
            }
            let _,
              m = 0
            const y = d - v + 1
            let x = !1,
              w = 0
            const C = new Array(y)
            for (u = 0; u < y; u++) C[u] = 0
            for (u = h; u <= p; u++) {
              const o = e[u]
              if (m >= y) {
                Z(o, s, r, !0)
                continue
              }
              let a
              if (null != o.key) a = g.get(o.key)
              else
                for (_ = v; _ <= d; _++)
                  if (0 === C[_ - v] && yo(o, t[_])) {
                    a = _
                    break
                  }
              void 0 === a
                ? Z(o, s, r, !0)
                : ((C[a - v] = u + 1),
                  a >= w ? (w = a) : (x = !0),
                  b(o, t[a], n, null, s, r, l, i, c),
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
              : a
            for (_ = S.length - 1, u = y - 1; u >= 0; u--) {
              const e = v + u,
                a = t[e],
                p = e + 1 < f ? t[e + 1].el : o
              0 === C[u]
                ? b(null, a, n, p, s, r, l, i, c)
                : x && (_ < 0 || u !== S[_] ? X(a, n, p, 2) : _--)
            }
          }
        },
        X = (e, t, o, s, r = null) => {
          const { el: l, type: i, transition: c, children: u, shapeFlag: a } = e
          if (6 & a) return void X(e.component.subTree, t, o, s)
          if (128 & a) return void e.suspense.move(t, o, s)
          if (64 & a) return void i.move(e, t, o, ue)
          if (i === io) {
            n(l, t, o)
            for (let e = 0; e < u.length; e++) X(u[e], t, o, s)
            return void n(e.anchor, t, o)
          }
          if (i === ao) return void S(e, t, o)
          if (2 !== s && 1 & a && c)
            if (0 === s) c.beforeEnter(l), n(l, t, o), no(() => c.enter(l), r)
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
          if ((null != i && to(i, null, n, e, !0), 256 & a))
            return void t.ctx.deactivate(e)
          const d = 1 & a && p,
            h = !un(e)
          let v
          if ((h && (v = l && l.onVnodeBeforeUnmount) && Ao(v, t, e), 6 & a))
            te(e.component, n, o)
          else {
            if (128 & a) return void e.suspense.unmount(n, o)
            d && Zn(e, null, t, 'beforeUnmount'),
              64 & a
                ? e.type.remove(e, t, n, s, ue, o)
                : u && (r !== io || (f > 0 && 64 & f))
                ? ne(u, t, n, !1, !0)
                : ((r === io && 384 & f) || (!s && 16 & a)) && ne(c, t, n),
              o && J(e)
          }
          ;((h && (v = l && l.onVnodeUnmounted)) || d) &&
            no(() => {
              v && Ao(v, t, e), d && Zn(e, null, t, 'unmounted')
            }, n)
        },
        J = (e) => {
          const { type: t, el: n, anchor: s, transition: r } = e
          if (t === io) return void Q(n, s)
          if (t === ao) return void k(e)
          const l = () => {
            o(n), r && !r.persisted && r.afterLeave && r.afterLeave()
          }
          if (1 & e.shapeFlag && r && !r.persisted) {
            const { leave: t, delayLeave: o } = r,
              s = () => t(n, l)
            o ? o(e.el, l, s) : s()
          } else l()
        },
        Q = (e, t) => {
          let n
          for (; e !== t; ) (n = h(e)), o(e), (e = n)
          o(t)
        },
        te = (e, t, n) => {
          const { bum: o, scope: s, update: r, subTree: l, um: i } = e
          o && I(o),
            s.stop(),
            r && ((r.active = !1), Z(l, e, t, n)),
            i && no(i, t),
            no(() => {
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
        oe = (e) =>
          6 & e.shapeFlag
            ? oe(e.component.subTree)
            : 128 & e.shapeFlag
            ? e.suspense.next()
            : h(e.anchor || e.el),
        ie = (e, t, n) => {
          null == e
            ? t._vnode && Z(t._vnode, null, null, !0)
            : b(t._vnode || null, e, t, null, null, null, n),
            Tt(),
            (t._vnode = e)
        },
        ue = {
          p: b,
          um: Z,
          m: X,
          r: J,
          mt: B,
          mc: R,
          pc: Y,
          pbc: T,
          n: oe,
          o: e
        }
      let ae, fe
      t && ([ae, fe] = t(ue))
      return { render: ie, hydrate: ae, createApp: eo(ie, ae) }
    })(e)
  }
  function so({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n
  }
  function ro(e, t, n = !1) {
    const o = e.children,
      s = t.children
    if (b(o) && b(s))
      for (let r = 0; r < o.length; r++) {
        const e = o[r]
        let t = s[r]
        1 & t.shapeFlag &&
          !t.dynamicChildren &&
          ((t.patchFlag <= 0 || 32 === t.patchFlag) &&
            ((t = s[r] = Eo(s[r])), (t.el = e.el)),
          n || ro(e, t))
      }
  }
  const lo = Symbol(),
    io = Symbol(void 0),
    co = Symbol(void 0),
    uo = Symbol(void 0),
    ao = Symbol(void 0),
    fo = []
  let po = null
  function ho(e = !1) {
    fo.push((po = e ? null : []))
  }
  let vo = 1
  function go(e) {
    vo += e
  }
  function _o(e) {
    return (
      (e.dynamicChildren = vo > 0 ? po || a : null),
      fo.pop(),
      (po = fo[fo.length - 1] || null),
      vo > 0 && po && po.push(e),
      e
    )
  }
  function mo(e, t, n, o, s, r) {
    return _o(Co(e, t, n, o, s, r, !0))
  }
  function yo(e, t) {
    return e.type === t.type && e.key === t.key
  }
  const bo = '__vInternal',
    xo = ({ key: e }) => (null != e ? e : null),
    wo = ({ ref: e, ref_key: t, ref_for: n }) =>
      null != e
        ? C(e) || it(e) || w(e)
          ? { i: Lt, r: e, k: t, f: !!n }
          : e
        : null
  function Co(
    e,
    t = null,
    n = null,
    o = 0,
    s = null,
    r = e === io ? 0 : 1,
    l = !1,
    i = !1
  ) {
    const c = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e,
      props: t,
      key: t && xo(t),
      ref: t && wo(t),
      scopeId: Bt,
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
        ? (Fo(c, n), 128 & r && e.normalize(c))
        : n && (c.shapeFlag |= C(n) ? 8 : 16),
      vo > 0 &&
        !l &&
        po &&
        (c.patchFlag > 0 || 6 & r) &&
        32 !== c.patchFlag &&
        po.push(c),
      c
    )
  }
  const So = function (e, t = null, n = null, o = 0, r = null, l = !1) {
    ;(e && e !== lo) || (e = uo)
    if (((i = e), i && !0 === i.__v_isVNode)) {
      const o = ko(e, t, !0)
      return n && Fo(o, n), o
    }
    var i
    ;(function (e) {
      return w(e) && '__vccOpts' in e
    })(e) && (e = e.__vccOpts)
    if (t) {
      t = (function (e) {
        return e ? (et(e) || bo in e ? g({}, e) : e) : null
      })(t)
      let { class: e, style: n } = t
      e && !C(e) && (t.class = c(e)),
        k(n) && (et(n) && !b(n) && (n = g({}, n)), (t.style = s(n)))
    }
    const u = C(e)
      ? 1
      : ((e) => e.__isSuspense)(e)
      ? 128
      : ((e) => e.__isTeleport)(e)
      ? 64
      : k(e)
      ? 4
      : w(e)
      ? 2
      : 0
    return Co(e, t, n, o, r, u, l, !0)
  }
  function ko(e, t, n = !1) {
    const { props: o, ref: r, patchFlag: l, children: i } = e,
      u = t
        ? (function (...e) {
            const t = {}
            for (let n = 0; n < e.length; n++) {
              const o = e[n]
              for (const e in o)
                if ('class' === e)
                  t.class !== o.class && (t.class = c([t.class, o.class]))
                else if ('style' === e) t.style = s([t.style, o.style])
                else if (h(e)) {
                  const n = t[e],
                    s = o[e]
                  !s ||
                    n === s ||
                    (b(n) && n.includes(s)) ||
                    (t[e] = n ? [].concat(n, s) : s)
                } else '' !== e && (t[e] = o[e])
            }
            return t
          })(o || {}, t)
        : o
    return {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: u,
      key: u && xo(u),
      ref:
        t && t.ref
          ? n && r
            ? b(r)
              ? r.concat(wo(t))
              : [r, wo(t)]
            : wo(t)
          : r,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: i,
      target: e.target,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== io ? (-1 === l ? 16 : 16 | l) : l,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: e.transition,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && ko(e.ssContent),
      ssFallback: e.ssFallback && ko(e.ssFallback),
      el: e.el,
      anchor: e.anchor
    }
  }
  function Oo(e = ' ', t = 0) {
    return So(co, null, e, t)
  }
  function Po(e) {
    return null == e || 'boolean' == typeof e
      ? So(uo)
      : b(e)
      ? So(io, null, e.slice())
      : 'object' == typeof e
      ? Eo(e)
      : So(co, null, String(e))
  }
  function Eo(e) {
    return null === e.el || e.memo ? e : ko(e)
  }
  function Fo(e, t) {
    let n = 0
    const { shapeFlag: o } = e
    if (null == t) t = null
    else if (b(t)) n = 16
    else if ('object' == typeof t) {
      if (65 & o) {
        const n = t.default
        return void (
          n && (n._c && (n._d = !1), Fo(e, n()), n._c && (n._d = !0))
        )
      }
      {
        n = 32
        const o = t._
        o || bo in t
          ? 3 === o &&
            Lt &&
            (1 === Lt.slots._ ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
          : (t._ctx = Lt)
      }
    } else
      w(t)
        ? ((t = { default: t, _ctx: Lt }), (n = 32))
        : ((t = String(t)), 64 & o ? ((n = 16), (t = [Oo(t)])) : (n = 8))
    ;(e.children = t), (e.shapeFlag |= n)
  }
  function Ao(e, t, n, o = null) {
    ht(e, t, 7, [n, o])
  }
  const Ro = (e) => (e ? (Lo(e) ? zo(e) || e.proxy : Ro(e.parent)) : null),
    jo = g(Object.create(null), {
      $: (e) => e,
      $el: (e) => e.vnode.el,
      $data: (e) => e.data,
      $props: (e) => e.props,
      $attrs: (e) => e.attrs,
      $slots: (e) => e.slots,
      $refs: (e) => e.refs,
      $parent: (e) => Ro(e.parent),
      $root: (e) => Ro(e.root),
      $emit: (e) => e.emit,
      $options: (e) => Rn(e),
      $forceUpdate: (e) => () => At(e.update),
      $nextTick: (e) => Ft.bind(e.proxy),
      $watch: (e) => Zt.bind(e)
    }),
    Mo = {
      get({ _: e }, t) {
        const {
          ctx: n,
          setupState: o,
          data: s,
          props: r,
          accessCache: l,
          type: i,
          appContext: c
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
            if (o !== u && y(o, t)) return (l[t] = 1), o[t]
            if (s !== u && y(s, t)) return (l[t] = 2), s[t]
            if ((a = e.propsOptions[0]) && y(a, t)) return (l[t] = 3), r[t]
            if (n !== u && y(n, t)) return (l[t] = 4), n[t]
            Pn && (l[t] = 0)
          }
        }
        const f = jo[t]
        let p, d
        return f
          ? ('$attrs' === t && le(e, 0, t), f(e))
          : (p = i.__cssModules) && (p = p[t])
          ? p
          : n !== u && y(n, t)
          ? ((l[t] = 4), n[t])
          : ((d = c.config.globalProperties), y(d, t) ? d[t] : void 0)
      },
      set({ _: e }, t, n) {
        const { data: o, setupState: s, ctx: r } = e
        return s !== u && y(s, t)
          ? ((s[t] = n), !0)
          : o !== u && y(o, t)
          ? ((o[t] = n), !0)
          : !y(e.props, t) &&
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
          (e !== u && y(e, l)) ||
          (t !== u && y(t, l)) ||
          ((i = r[0]) && y(i, l)) ||
          y(o, l) ||
          y(jo, l) ||
          y(s.config.globalProperties, l)
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
    To = Jn()
  let No = 0
  let Vo = null
  const $o = () => Vo || Lt,
    Uo = (e) => {
      ;(Vo = e), e.scope.on()
    },
    Io = () => {
      Vo && Vo.scope.off(), (Vo = null)
    }
  function Lo(e) {
    return 4 & e.vnode.shapeFlag
  }
  let Bo = !1
  function Do(e, t, n) {
    w(t)
      ? e.type.__ssrInlineRender
        ? (e.ssrRender = t)
        : (e.render = t)
      : k(t) && (e.setupState = ft(t)),
      Wo(e, n)
  }
  function Wo(e, t, n) {
    const o = e.type
    e.render || (e.render = o.render || f), Uo(e), se(), En(e), re(), Io()
  }
  function zo(e) {
    if (e.exposed)
      return (
        e.exposeProxy ||
        (e.exposeProxy = new Proxy(ft(nt(e.exposed)), {
          get: (t, n) => (n in t ? t[n] : n in jo ? jo[n](e) : void 0)
        }))
      )
  }
  const Ho = (e, t) =>
      (function (e, t, n = !1) {
        let o, s
        const r = w(e)
        return (
          r ? ((o = e), (s = f)) : ((o = e.get), (s = e.set)),
          new pt(o, s, r || !s, n)
        )
      })(e, 0, Bo),
    Ko = '3.2.31',
    Yo = 'undefined' != typeof document ? document : null,
    qo = Yo && Yo.createElement('template'),
    Go = {
      insert: (e, t, n) => {
        t.insertBefore(e, n || null)
      },
      remove: (e) => {
        const t = e.parentNode
        t && t.removeChild(e)
      },
      createElement: (e, t, n, o) => {
        const s = t
          ? Yo.createElementNS('http://www.w3.org/2000/svg', e)
          : Yo.createElement(e, n ? { is: n } : void 0)
        return (
          'select' === e &&
            o &&
            null != o.multiple &&
            s.setAttribute('multiple', o.multiple),
          s
        )
      },
      createText: (e) => Yo.createTextNode(e),
      createComment: (e) => Yo.createComment(e),
      setText: (e, t) => {
        e.nodeValue = t
      },
      setElementText: (e, t) => {
        e.textContent = t
      },
      parentNode: (e) => e.parentNode,
      nextSibling: (e) => e.nextSibling,
      querySelector: (e) => Yo.querySelector(e),
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
          qo.innerHTML = o ? `<svg>${e}</svg>` : e
          const s = qo.content
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
  const Xo = /\s*!important$/
  function Zo(e, t, n) {
    if (b(n)) n.forEach((n) => Zo(e, t, n))
    else if (t.startsWith('--')) e.setProperty(t, n)
    else {
      const o = (function (e, t) {
        const n = Qo[t]
        if (n) return n
        let o = M(t)
        if ('filter' !== o && o in e) return (Qo[t] = o)
        o = V(o)
        for (let s = 0; s < Jo.length; s++) {
          const n = Jo[s] + o
          if (n in e) return (Qo[t] = n)
        }
        return t
      })(e, t)
      Xo.test(n)
        ? e.setProperty(N(o), n.replace(Xo, ''), 'important')
        : (e[o] = n)
    }
  }
  const Jo = ['Webkit', 'Moz', 'ms'],
    Qo = {}
  const es = 'http://www.w3.org/1999/xlink'
  let ts = Date.now,
    ns = !1
  if ('undefined' != typeof window) {
    ts() > document.createEvent('Event').timeStamp &&
      (ts = () => performance.now())
    const e = navigator.userAgent.match(/firefox\/(\d+)/i)
    ns = !!(e && Number(e[1]) <= 53)
  }
  let os = 0
  const ss = Promise.resolve(),
    rs = () => {
      os = 0
    }
  function ls(e, t, n, o, s = null) {
    const r = e._vei || (e._vei = {}),
      l = r[t]
    if (o && l) l.value = o
    else {
      const [n, i] = (function (e) {
        let t
        if (is.test(e)) {
          let n
          for (t = {}; (n = e.match(is)); )
            (e = e.slice(0, e.length - n[0].length)),
              (t[n[0].toLowerCase()] = !0)
        }
        return [N(e.slice(2)), t]
      })(t)
      if (o) {
        const l = (r[t] = (function (e, t) {
          const n = (e) => {
            const o = e.timeStamp || ts()
            ;(ns || o >= n.attached - 1) &&
              ht(
                (function (e, t) {
                  if (b(t)) {
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
            (n.attached = (() => os || (ss.then(rs), (os = ts())))()),
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
  const is = /(?:Once|Passive|Capture)$/
  const cs = /^on[a-z]/
  const us = 'undefined' != typeof HTMLElement ? HTMLElement : class {}
  class as extends us {
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
        Ft(() => {
          this._connected ||
            (ds(null, this.shadowRoot), (this._instance = null))
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
            o = !b(t),
            s = t ? (o ? Object.keys(t) : t) : []
          let r
          if (o)
            for (const l in this._props) {
              const e = t[l]
              ;(e === Number || (e && e.type === Number)) &&
                ((this._props[l] = B(this._props[l])),
                ((r || (r = Object.create(null)))[l] = !0))
            }
          this._numberProps = r
          for (const l of Object.keys(this))
            '_' !== l[0] && this._setProp(l, this[l], !0, !1)
          for (const l of s.map(M))
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
      this._numberProps && this._numberProps[e] && (t = B(t)),
        this._setProp(M(e), t, !1)
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
            ? this.setAttribute(N(e), '')
            : 'string' == typeof t || 'number' == typeof t
            ? this.setAttribute(N(e), t + '')
            : t || this.removeAttribute(N(e))))
    }
    _update() {
      ds(this._createVNode(), this.shadowRoot)
    }
    _createVNode() {
      const e = So(this._def, g({}, this._props))
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
              if (t instanceof as) {
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
  const fs = g(
    {
      patchProp: (e, t, s, r, l = !1, i, c, u, a) => {
        'class' === t
          ? (function (e, t, n) {
              const o = e._vtc
              o && (t = (t ? [t, ...o] : [...o]).join(' ')),
                null == t
                  ? e.removeAttribute('class')
                  : n
                  ? e.setAttribute('class', t)
                  : (e.className = t)
            })(e, r, l)
          : 'style' === t
          ? (function (e, t, n) {
              const o = e.style,
                s = C(n)
              if (n && !s) {
                for (const e in n) Zo(o, e, n[e])
                if (t && !C(t)) for (const e in t) null == n[e] && Zo(o, e, '')
              } else {
                const r = o.display
                s
                  ? t !== n && (o.cssText = n)
                  : t && e.removeAttribute('style'),
                  '_vod' in e && (o.display = r)
              }
            })(e, s, r)
          : h(t)
          ? v(t) || ls(e, t, 0, r, c)
          : (
              '.' === t[0]
                ? ((t = t.slice(1)), 1)
                : '^' === t[0]
                ? ((t = t.slice(1)), 0)
                : (function (e, t, n, o) {
                    if (o)
                      return (
                        'innerHTML' === t ||
                        'textContent' === t ||
                        !!(t in e && cs.test(t) && w(n))
                      )
                    if ('spellcheck' === t || 'draggable' === t) return !1
                    if ('form' === t) return !1
                    if ('list' === t && 'INPUT' === e.tagName) return !1
                    if ('type' === t && 'TEXTAREA' === e.tagName) return !1
                    if (cs.test(t) && C(n)) return !1
                    return t in e
                  })(e, t, r, l)
            )
          ? (function (e, t, n, s, r, l, i) {
              if ('innerHTML' === t || 'textContent' === t)
                return s && i(s, r, l), void (e[t] = null == n ? '' : n)
              if (
                'value' === t &&
                'PROGRESS' !== e.tagName &&
                !e.tagName.includes('-')
              ) {
                e._value = n
                const o = null == n ? '' : n
                return (
                  (e.value === o && 'OPTION' !== e.tagName) || (e.value = o),
                  void (null == n && e.removeAttribute(t))
                )
              }
              if ('' === n || null == n) {
                const s = typeof e[t]
                if ('boolean' === s) return void (e[t] = o(n))
                if (null == n && 'string' === s)
                  return (e[t] = ''), void e.removeAttribute(t)
                if ('number' === s) {
                  try {
                    e[t] = 0
                  } catch (c) {}
                  return void e.removeAttribute(t)
                }
              }
              try {
                e[t] = n
              } catch (u) {}
            })(e, t, r, i, c, u, a)
          : ('true-value' === t
              ? (e._trueValue = r)
              : 'false-value' === t && (e._falseValue = r),
            (function (e, t, s, r, l) {
              if (r && t.startsWith('xlink:'))
                null == s
                  ? e.removeAttributeNS(es, t.slice(6, t.length))
                  : e.setAttributeNS(es, t, s)
              else {
                const r = n(t)
                null == s || (r && !o(s))
                  ? e.removeAttribute(t)
                  : e.setAttribute(t, r ? '' : s)
              }
            })(e, t, r, l))
      }
    },
    Go
  )
  let ps
  const ds = (...e) => {
    ;(ps || (ps = oo(fs))).render(...e)
  }
  const hs = { key: 0 },
    vs = { key: 1 }
  const gs = (function (e, t) {
    const n = cn(e)
    class o extends as {
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
      cn({
        setup(e) {
          const t = ct(!1)
          return (e, n) => (
            ho(),
            mo(
              'button',
              { onClick: n[0] || (n[0] = (e) => (t.value = !t.value)) },
              [
                t.value
                  ? (ho(), mo('span', hs, '🌙'))
                  : (ho(), mo('span', vs, '🌞'))
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
  return (
    (e.DarkModeSwitch = gs),
    (e.register = function (e = 'dark-mode-switch') {
      customElements.define(e, gs)
    }),
    Object.defineProperties(e, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' }
    }),
    e
  )
})({})
