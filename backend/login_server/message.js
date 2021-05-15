const _ws = require("ws");

let console_ = {
  log: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  debug: () => {},
};
// console_ = console;

// class WebSocket {
//   constructor(url) {
//     console_.log('WebSocket started', url);
//     this.onopen = null;
//     this.onmessage = null;
//     this.onerror = null;
//     this.onclose = null;
//     this.ww = new _ws(url);
//     this.ww.on('open', () => {
//       console_.log('ws::open', this.onopen);
//       this.onopen && this.onopen();
//     });
//     this.ww.on('message', this.onmessage);
//     this.ww.on('error', this.onerror);
//     this.ww.on('close', this.onclose);
//   }
// }

// window = {
//   WebSocket
// };

!
function(t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Pike = e() : t.Pike = e()
} (this, (function() {
  return function(t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var o = e[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(o.exports, o, o.exports, n),
      o.l = !0,
      o.exports
    }
    return n.m = t,
    n.c = e,
    n.d = function(t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: r
      })
    },
    n.r = function(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }),
      Object.defineProperty(t, "__esModule", {
        value: !0
      })
    },
    n.t = function(t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var o in t) n.d(r, o,
      function(e) {
        return t[e]
      }.bind(null, o));
      return r
    },
    n.n = function(t) {
      var e = t && t.__esModule ?
      function() {
        return t.
      default
      }:
      function() {
        return t
      };
      return n.d(e, "a", e),
      e
    },
    n.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    },
    n.p = "//www.dpfile.com/app/pike-message-standalone/",
    n(n.s = 2)
  } ([function(t, e) {
    function n(t) {
      return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
      function(t) {
        return typeof t
      }: function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol": typeof t
      })(t)
    }
    var r;
    r = function() {
      return this
    } ();
    try {
      r = r || new Function("return this")()
    } catch(t) {
      "object" === ("undefined" == typeof window ? "undefined": n(window)) && (r = window)
    }
    t.exports = r
  },
  function(t, e, n) {
    "use strict"; (function(t, n) {
      var r = Math.ceil,
      o = Math.floor,
      i = function(t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? o: r)(t)
      },
      a = function(t) {
        if (null == t) throw TypeError("Can't call method on " + t);
        return t
      },
      s = function(t) {
        return function(e, n) {
          var r, o, s = String(a(e)),
          c = i(n),
          u = s.length;
          return c < 0 || c >= u ? t ? "": void 0 : (r = s.charCodeAt(c)) < 55296 || r > 56319 || c + 1 === u || (o = s.charCodeAt(c + 1)) < 56320 || o > 57343 ? t ? s.charAt(c) : r: t ? s.slice(c, c + 2) : o - 56320 + (r - 55296 << 10) + 65536
        }
      },
      c = {
        codeAt: s(!1),
        charAt: s(!0)
      };
      function u(t) {
        return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
        function(t) {
          return typeof t
        }: function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol": typeof t
        })(t)
      }
      var f = "undefined" != typeof globalThis ? globalThis: "undefined" != typeof window ? window: void 0 !== t ? t: "undefined" != typeof self ? self: {};
      function l(t, e, n) {
        return t(n = {
          path: e,
          exports: {},
          require: function(t, e) {
            return function() {
              throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
            } (null == e && n.path)
          }
        },
        n.exports),
        n.exports
      }
      var h = function(t) {
        return t && t.Math == Math && t
      },
      p = h("object" == ("undefined" == typeof globalThis ? "undefined": u(globalThis)) && globalThis) || h("object" == ("undefined" == typeof window ? "undefined": u(window)) && window) || h("object" == ("undefined" == typeof self ? "undefined": u(self)) && self) || h("object" == u(f) && f) ||
      function() {
        return this
      } () || Function("return this")(),
      d = function(t) {
        try {
          return !! t()
        } catch(t) {
          return ! 0
        }
      },
      y = !d((function() {
        return 7 != Object.defineProperty({},
        1, {
          get: function() {
            return 7
          }
        })[1]
      })),
      v = function(t) {
        return "object" === u(t) ? null !== t: "function" == typeof t
      },
      g = p.document,
      m = v(g) && v(g.createElement),
      b = function(t) {
        return m ? g.createElement(t) : {}
      },
      w = !y && !d((function() {
        return 7 != Object.defineProperty(b("div"), "a", {
          get: function() {
            return 7
          }
        }).a
      })),
      k = function(t) {
        if (!v(t)) throw TypeError(String(t) + " is not an object");
        return t
      },
      S = function(t, e) {
        if (!v(t)) return t;
        var n, r;
        if (e && "function" == typeof(n = t.toString) && !v(r = n.call(t))) return r;
        if ("function" == typeof(n = t.valueOf) && !v(r = n.call(t))) return r;
        if (!e && "function" == typeof(n = t.toString) && !v(r = n.call(t))) return r;
        throw TypeError("Can't convert object to primitive value")
      },
      E = Object.defineProperty,
      O = {
        f: y ? E: function(t, e, n) {
          if (k(t), e = S(e, !0), k(n), w) try {
            return E(t, e, n)
          } catch(t) {}
          if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
          return "value" in n && (t[e] = n.value),
          t
        }
      },
      P = function(t, e) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: e
        }
      },
      R = y ?
      function(t, e, n) {
        return O.f(t, e, P(1, n))
      }: function(t, e, n) {
        return t[e] = n,
        t
      },
      A = function(t, e) {
        try {
          R(p, t, e)
        } catch(n) {
          p[t] = e
        }
        return e
      },
      T = p["__core-js_shared__"] || A("__core-js_shared__", {}),
      x = Function.toString;
      "function" != typeof T.inspectSource && (T.inspectSource = function(t) {
        return x.call(t)
      });
      var _, I, C, N = T.inspectSource,
      L = p.WeakMap,
      M = "function" == typeof L && /native code/.test(N(L)),
      j = {}.hasOwnProperty,
      B = function(t, e) {
        return j.call(t, e)
      },
      D = l((function(t) { (t.exports = function(t, e) {
          return T[t] || (T[t] = void 0 !== e ? e: {})
        })("versions", []).push({
          version: "3.7.0",
          mode: "global",
          copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
        })
      })),
      U = 0,
      F = Math.random(),
      z = function(t) {
        return "Symbol(" + String(void 0 === t ? "": t) + ")_" + (++U + F).toString(36)
      },
      J = D("keys"),
      V = function(t) {
        return J[t] || (J[t] = z(t))
      },
      q = {},
      G = p.WeakMap;
      if (M) {
        var K = T.state || (T.state = new G),
        W = K.get,
        Y = K.has,
        H = K.set;
        _ = function(t, e) {
          return e.facade = t,
          H.call(K, t, e),
          e
        },
        I = function(t) {
          return W.call(K, t) || {}
        },
        C = function(t) {
          return Y.call(K, t)
        }
      } else {
        var Q = V("state");
        q[Q] = !0,
        _ = function(t, e) {
          return e.facade = t,
          R(t, Q, e),
          e
        },
        I = function(t) {
          return B(t, Q) ? t[Q] : {}
        },
        C = function(t) {
          return B(t, Q)
        }
      }
      var X, $, Z, tt = {
        set: _,
        get: I,
        has: C,
        enforce: function(t) {
          return C(t) ? I(t) : _(t, {})
        },
        getterFor: function(t) {
          return function(e) {
            var n;
            if (!v(e) || (n = I(e)).type !== t) throw TypeError("Incompatible receiver, " + t + " required");
            return n
          }
        }
      },
      et = {}.propertyIsEnumerable,
      nt = Object.getOwnPropertyDescriptor,
      rt = {
        f: nt && !et.call({
          1 : 2
        },
        1) ?
        function(t) {
          var e = nt(this, t);
          return !! e && e.enumerable
        }: et
      },
      ot = {}.toString,
      it = function(t) {
        return ot.call(t).slice(8, -1)
      },
      at = "".split,
      st = d((function() {
        return ! Object("z").propertyIsEnumerable(0)
      })) ?
      function(t) {
        return "String" == it(t) ? at.call(t, "") : Object(t)
      }: Object,
      ct = function(t) {
        return st(a(t))
      },
      ut = Object.getOwnPropertyDescriptor,
      ft = {
        f: y ? ut: function(t, e) {
          if (t = ct(t), e = S(e, !0), w) try {
            return ut(t, e)
          } catch(t) {}
          if (B(t, e)) return P(!rt.f.call(t, e), t[e])
        }
      },
      lt = l((function(t) {
        var e = tt.get,
        n = tt.enforce,
        r = String(String).split("String"); (t.exports = function(t, e, o, i) {
          var a, s = !!i && !!i.unsafe,
          c = !!i && !!i.enumerable,
          u = !!i && !!i.noTargetGet;
          "function" == typeof o && ("string" != typeof e || B(o, "name") || R(o, "name", e), (a = n(o)).source || (a.source = r.join("string" == typeof e ? e: ""))),
          t !== p ? (s ? !u && t[e] && (c = !0) : delete t[e], c ? t[e] = o: R(t, e, o)) : c ? t[e] = o: A(e, o)
        })(Function.prototype, "toString", (function() {
          return "function" == typeof this && e(this).source || N(this)
        }))
      })),
      ht = p,
      pt = function(t) {
        return "function" == typeof t ? t: void 0
      },
      dt = function(t, e) {
        return arguments.length < 2 ? pt(ht[t]) || pt(p[t]) : ht[t] && ht[t][e] || p[t] && p[t][e]
      },
      yt = Math.min,
      vt = function(t) {
        return t > 0 ? yt(i(t), 9007199254740991) : 0
      },
      gt = Math.max,
      mt = Math.min,
      bt = function(t) {
        return function(e, n, r) {
          var o, a = ct(e),
          s = vt(a.length),
          c = function(t, e) {
            var n = i(t);
            return n < 0 ? gt(n + e, 0) : mt(n, e)
          } (r, s);
          if (t && n != n) {
            for (; s > c;) if ((o = a[c++]) != o) return ! 0
          } else for (; s > c; c++) if ((t || c in a) && a[c] === n) return t || c || 0;
          return ! t && -1
        }
      },
      wt = {
        includes: bt(!0),
        indexOf: bt(!1)
      }.indexOf,
      kt = function(t, e) {
        var n, r = ct(t),
        o = 0,
        i = [];
        for (n in r) ! B(q, n) && B(r, n) && i.push(n);
        for (; e.length > o;) B(r, n = e[o++]) && (~wt(i, n) || i.push(n));
        return i
      },
      St = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
      Et = St.concat("length", "prototype"),
      Ot = {
        f: Object.getOwnPropertyNames ||
        function(t) {
          return kt(t, Et)
        }
      },
      Pt = {
        f: Object.getOwnPropertySymbols
      },
      Rt = dt("Reflect", "ownKeys") ||
      function(t) {
        var e = Ot.f(k(t)),
        n = Pt.f;
        return n ? e.concat(n(t)) : e
      },
      At = function(t, e) {
        for (var n = Rt(e), r = O.f, o = ft.f, i = 0; i < n.length; i++) {
          var a = n[i];
          B(t, a) || r(t, a, o(e, a))
        }
      },
      Tt = /#|\.prototype\./,
      xt = function(t, e) {
        var n = It[_t(t)];
        return n == Nt || n != Ct && ("function" == typeof e ? d(e) : !!e)
      },
      _t = xt.normalize = function(t) {
        return String(t).replace(Tt, ".").toLowerCase()
      },
      It = xt.data = {},
      Ct = xt.NATIVE = "N",
      Nt = xt.POLYFILL = "P",
      Lt = xt,
      Mt = ft.f,
      jt = function(t, e) {
        var n, r, o, i, a, s = t.target,
        c = t.global,
        f = t.stat;
        if (n = c ? p: f ? p[s] || A(s, {}) : (p[s] || {}).prototype) for (r in e) {
          if (i = e[r], o = t.noTargetGet ? (a = Mt(n, r)) && a.value: n[r], !Lt(c ? r: s + (f ? ".": "#") + r, t.forced) && void 0 !== o) {
            if (u(i) === u(o)) continue;
            At(i, o)
          } (t.sham || o && o.sham) && R(i, "sham", !0),
          lt(n, r, i, t)
        }
      },
      Bt = function(t) {
        return Object(a(t))
      },
      Dt = !d((function() {
        function t() {}
        return t.prototype.constructor = null,
        Object.getPrototypeOf(new t) !== t.prototype
      })),
      Ut = V("IE_PROTO"),
      Ft = Object.prototype,
      zt = Dt ? Object.getPrototypeOf: function(t) {
        return t = Bt(t),
        B(t, Ut) ? t[Ut] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype: t instanceof Object ? Ft: null
      },
      Jt = !!Object.getOwnPropertySymbols && !d((function() {
        return ! String(Symbol())
      })),
      Vt = Jt && !Symbol.sham && "symbol" == u(Symbol.iterator),
      qt = D("wks"),
      Gt = p.Symbol,
      Kt = Vt ? Gt: Gt && Gt.withoutSetter || z,
      Wt = function(t) {
        return B(qt, t) || (Jt && B(Gt, t) ? qt[t] = Gt[t] : qt[t] = Kt("Symbol." + t)),
        qt[t]
      },
      Yt = Wt("iterator"),
      Ht = !1; [].keys && ("next" in (Z = [].keys()) ? ($ = zt(zt(Z))) !== Object.prototype && (X = $) : Ht = !0),
      null == X && (X = {}),
      B(X, Yt) || R(X, Yt, (function() {
        return this
      }));
      var Qt, Xt = {
        IteratorPrototype: X,
        BUGGY_SAFARI_ITERATORS: Ht
      },
      $t = Object.keys ||
      function(t) {
        return kt(t, St)
      },
      Zt = y ? Object.defineProperties: function(t, e) {
        k(t);
        for (var n, r = $t(e), o = r.length, i = 0; o > i;) O.f(t, n = r[i++], e[n]);
        return t
      },
      te = dt("document", "documentElement"),
      ee = V("IE_PROTO"),
      ne = function() {},
      re = function(t) {
        return "<script>" + t + "<\/script>"
      },
      oe = function() {
        try {
          Qt = document.domain && new ActiveXObject("htmlfile")
        } catch(t) {}
        var t, e;
        oe = Qt ?
        function(t) {
          t.write(re("")),
          t.close();
          var e = t.parentWindow.Object;
          return t = null,
          e
        } (Qt) : ((e = b("iframe")).style.display = "none", te.appendChild(e), e.src = String("javascript:"), (t = e.contentWindow.document).open(), t.write(re("document.F=Object")), t.close(), t.F);
        for (var n = St.length; n--;) delete oe.prototype[St[n]];
        return oe()
      };
      q[ee] = !0;
      var ie = Object.create ||
      function(t, e) {
        var n;
        return null !== t ? (ne.prototype = k(t), n = new ne, ne.prototype = null, n[ee] = t) : n = oe(),
        void 0 === e ? n: Zt(n, e)
      },
      ae = O.f,
      se = Wt("toStringTag"),
      ce = function(t, e, n) {
        t && !B(t = n ? t: t.prototype, se) && ae(t, se, {
          configurable: !0,
          value: e
        })
      },
      ue = {},
      fe = Xt.IteratorPrototype,
      le = function() {
        return this
      },
      he = Object.setPrototypeOf || ("__proto__" in {} ?
      function() {
        var t, e = !1,
        n = {};
        try { (t = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []),
          e = n instanceof Array
        } catch(t) {}
        return function(n, r) {
          return k(n),
          function(t) {
            if (!v(t) && null !== t) throw TypeError("Can't set " + String(t) + " as a prototype")
          } (r),
          e ? t.call(n, r) : n.__proto__ = r,
          n
        }
      } () : void 0),
      pe = Xt.IteratorPrototype,
      de = Xt.BUGGY_SAFARI_ITERATORS,
      ye = Wt("iterator"),
      ve = function() {
        return this
      },
      ge = function(t, e, n, r, o, i, a) { !
        function(t, e, n) {
          var r = e + " Iterator";
          t.prototype = ie(fe, {
            next: P(1, n)
          }),
          ce(t, r, !1),
          ue[r] = le
        } (n, e, r);
        var s, c, u, f = function(t) {
          if (t === o && y) return y;
          if (!de && t in p) return p[t];
          switch (t) {
          case "keys":
          case "values":
          case "entries":
            return function() {
              return new n(this, t)
            }
          }
          return function() {
            return new n(this)
          }
        },
        l = e + " Iterator",
        h = !1,
        p = t.prototype,
        d = p[ye] || p["@@iterator"] || o && p[o],
        y = !de && d || f(o),
        v = "Array" == e && p.entries || d;
        if (v && (s = zt(v.call(new t)), pe !== Object.prototype && s.next && (zt(s) !== pe && (he ? he(s, pe) : "function" != typeof s[ye] && R(s, ye, ve)), ce(s, l, !0))), "values" == o && d && "values" !== d.name && (h = !0, y = function() {
          return d.call(this)
        }), p[ye] !== y && R(p, ye, y), ue[e] = y, o) if (c = {
          values: f("values"),
          keys: i ? y: f("keys"),
          entries: f("entries")
        },
        a) for (u in c)(de || h || !(u in p)) && lt(p, u, c[u]);
        else jt({
          target: e,
          proto: !0,
          forced: de || h
        },
        c);
        return c
      },
      me = c.charAt,
      be = tt.set,
      we = tt.getterFor("String Iterator");
      ge(String, "String", (function(t) {
        be(this, {
          type: "String Iterator",
          string: String(t),
          index: 0
        })
      }), (function() {
        var t, e = we(this),
        n = e.string,
        r = e.index;
        return r >= n.length ? {
          value: void 0,
          done: !0
        }: (t = me(n, r), e.index += t.length, {
          value: t,
          done: !1
        })
      }));
      var ke = function(t) {
        if ("function" != typeof t) throw TypeError(String(t) + " is not a function");
        return t
      },
      Se = function(t, e, n) {
        if (ke(t), void 0 === e) return t;
        switch (n) {
        case 0:
          return function() {
            return t.call(e)
          };
        case 1:
          return function(n) {
            return t.call(e, n)
          };
        case 2:
          return function(n, r) {
            return t.call(e, n, r)
          };
        case 3:
          return function(n, r, o) {
            return t.call(e, n, r, o)
          }
        }
        return function() {
          return t.apply(e, arguments)
        }
      },
      Ee = function(t) {
        var e = t.
        return;
        if (void 0 !== e) return k(e.call(t)).value
      },
      Oe = function(t, e, n, r) {
        try {
          return r ? e(k(n)[0], n[1]) : e(n)
        } catch(e) {
          throw Ee(t),
          e
        }
      },
      Pe = Wt("iterator"),
      Re = Array.prototype,
      Ae = function(t) {
        return void 0 !== t && (ue.Array === t || Re[Pe] === t)
      },
      Te = function(t, e, n) {
        var r = S(e);
        r in t ? O.f(t, r, P(0, n)) : t[r] = n
      },
      xe = {};
      xe[Wt("toStringTag")] = "z";
      var _e = "[object z]" === String(xe),
      Ie = Wt("toStringTag"),
      Ce = "Arguments" == it(function() {
        return arguments
      } ()),
      Ne = _e ? it: function(t) {
        var e, n, r;
        return void 0 === t ? "Undefined": null === t ? "Null": "string" == typeof(n = function(t, e) {
          try {
            return t[e]
          } catch(t) {}
        } (e = Object(t), Ie)) ? n: Ce ? it(e) : "Object" == (r = it(e)) && "function" == typeof e.callee ? "Arguments": r
      },
      Le = Wt("iterator"),
      Me = function(t) {
        if (null != t) return t[Le] || t["@@iterator"] || ue[Ne(t)]
      },
      je = Wt("iterator"),
      Be = !1;
      try {
        var De = 0,
        Ue = {
          next: function() {
            return {
              done: !!De++
            }
          },
          return: function() {
            Be = !0
          }
        };
        Ue[je] = function() {
          return this
        },
        Array.from(Ue, (function() {
          throw 2
        }))
      } catch(xc) {}
      var Fe = function(t, e) {
        if (!e && !Be) return ! 1;
        var n = !1;
        try {
          var r = {};
          r[je] = function() {
            return {
              next: function() {
                return {
                  done: n = !0
                }
              }
            }
          },
          t(r)
        } catch(t) {}
        return n
      },
      ze = !Fe((function(t) {
        Array.from(t)
      }));
      jt({
        target: "Array",
        stat: !0,
        forced: ze
      },
      {
        from: function(t) {
          var e, n, r, o, i, a, s = Bt(t),
          c = "function" == typeof this ? this: Array,
          u = arguments.length,
          f = u > 1 ? arguments[1] : void 0,
          l = void 0 !== f,
          h = Me(s),
          p = 0;
          if (l && (f = Se(f, u > 2 ? arguments[2] : void 0, 2)), null == h || c == Array && Ae(h)) for (n = new c(e = vt(s.length)); e > p; p++) a = l ? f(s[p], p) : s[p],
          Te(n, p, a);
          else for (i = (o = h.call(s)).next, n = new c; ! (r = i.call(o)).done; p++) a = l ? Oe(o, f, [r.value, p], !0) : r.value,
          Te(n, p, a);
          return n.length = p,
          n
        }
      });
      ht.Array.from;
      var Je = function(t, e) {
        this.stopped = t,
        this.result = e
      },
      Ve = function(t, e, n) {
        var r, o, i, a, s, c, f, l = n && n.that,
        h = !(!n || !n.AS_ENTRIES),
        p = !(!n || !n.IS_ITERATOR),
        d = !(!n || !n.INTERRUPTED),
        y = Se(e, l, 1 + h + d),
        v = function(t) {
          return r && Ee(r),
          new Je(!0, t)
        },
        g = function(t) {
          return h ? (k(t), d ? y(t[0], t[1], v) : y(t[0], t[1])) : d ? y(t, v) : y(t)
        };
        if (p) r = t;
        else {
          if ("function" != typeof(o = Me(t))) throw TypeError("Target is not iterable");
          if (Ae(o)) {
            for (i = 0, a = vt(t.length); a > i; i++) if ((s = g(t[i])) && s instanceof Je) return s;
            return new Je(!1)
          }
          r = o.call(t)
        }
        for (c = r.next; ! (f = c.call(r)).done;) {
          try {
            s = g(f.value)
          } catch(t) {
            throw Ee(r),
            t
          }
          if ("object" == u(s) && s && s instanceof Je) return s
        }
        return new Je(!1)
      },
      qe = function(t, e) {
        var n = this;
        if (! (n instanceof qe)) return new qe(t, e);
        he && (n = he(new Error(void 0), zt(n))),
        void 0 !== e && R(n, "message", String(e));
        var r = [];
        return Ve(t, r.push, {
          that: r
        }),
        R(n, "errors", r),
        n
      };
      qe.prototype = ie(Error.prototype, {
        constructor: P(5, qe),
        message: P(5, ""),
        name: P(5, "AggregateError")
      }),
      jt({
        global: !0
      },
      {
        AggregateError: qe
      });
      var Ge = _e ? {}.toString: function() {
        return "[object " + Ne(this) + "]"
      };
      _e || lt(Object.prototype, "toString", Ge, {
        unsafe: !0
      });
      var Ke, We, Ye, He = p.Promise,
      Qe = function(t, e, n) {
        for (var r in e) lt(t, r, e[r], n);
        return t
      },
      Xe = Wt("species"),
      $e = function(t) {
        var e = dt(t),
        n = O.f;
        y && e && !e[Xe] && n(e, Xe, {
          configurable: !0,
          get: function() {
            return this
          }
        })
      },
      Ze = function(t, e, n) {
        if (! (t instanceof e)) throw TypeError("Incorrect " + (n ? n + " ": "") + "invocation");
        return t
      },
      tn = Wt("species"),
      en = function(t, e) {
        var n, r = k(t).constructor;
        return void 0 === r || null == (n = k(r)[tn]) ? e: ke(n)
      },
      nn = dt("navigator", "userAgent") || "",
      rn = /(iphone|ipod|ipad).*applewebkit/i.test(nn),
      on = "process" == it(p.process),
      an = p.location,
      sn = p.setImmediate,
      cn = p.clearImmediate,
      un = p.process,
      fn = p.MessageChannel,
      ln = p.Dispatch,
      hn = 0,
      pn = {},
      dn = function(t) {
        if (pn.hasOwnProperty(t)) {
          var e = pn[t];
          delete pn[t],
          e()
        }
      },
      yn = function(t) {
        return function() {
          dn(t)
        }
      },
      vn = function(t) {
        dn(t.data)
      },
      gn = function(t) {
        p.postMessage(t + "", an.protocol + "//" + an.host)
      };
      sn && cn || (sn = function(t) {
        for (var e = [], n = 1; arguments.length > n;) e.push(arguments[n++]);
        return pn[++hn] = function() { ("function" == typeof t ? t: Function(t)).apply(void 0, e)
        },
        Ke(hn),
        hn
      },
      cn = function(t) {
        delete pn[t]
      },
      on ? Ke = function(t) {
        un.nextTick(yn(t))
      }: ln && ln.now ? Ke = function(t) {
        ln.now(yn(t))
      }: fn && !rn ? (Ye = (We = new fn).port2, We.port1.onmessage = vn, Ke = Se(Ye.postMessage, Ye, 1)) : p.addEventListener && "function" == typeof postMessage && !p.importScripts && an && "file:" !== an.protocol && !d(gn) ? (Ke = gn, p.addEventListener("message", vn, !1)) : Ke = "onreadystatechange" in b("script") ?
      function(t) {
        te.appendChild(b("script")).onreadystatechange = function() {
          te.removeChild(this),
          dn(t)
        }
      }: function(t) {
        setTimeout(yn(t), 0)
      });
      var mn, bn, wn, kn, Sn, En, On, Pn, Rn = {
        set: sn,
        clear: cn
      },
      An = ft.f,
      Tn = Rn.set,
      xn = p.MutationObserver || p.WebKitMutationObserver,
      _n = p.document,
      In = p.process,
      Cn = p.Promise,
      Nn = An(p, "queueMicrotask"),
      Ln = Nn && Nn.value;
      Ln || (mn = function() {
        var t, e;
        for (on && (t = In.domain) && t.exit(); bn;) {
          e = bn.fn,
          bn = bn.next;
          try {
            e()
          } catch(t) {
            throw bn ? kn() : wn = void 0,
            t
          }
        }
        wn = void 0,
        t && t.enter()
      },
      !rn && !on && xn && _n ? (Sn = !0, En = _n.createTextNode(""), new xn(mn).observe(En, {
        characterData: !0
      }), kn = function() {
        En.data = Sn = !Sn
      }) : Cn && Cn.resolve ? (On = Cn.resolve(void 0), Pn = On.then, kn = function() {
        Pn.call(On, mn)
      }) : kn = on ?
      function() {
        In.nextTick(mn)
      }: function() {
        Tn.call(p, mn)
      });
      var Mn, jn, Bn = Ln ||
      function(t) {
        var e = {
          fn: t,
          next: void 0
        };
        wn && (wn.next = e),
        bn || (bn = e, kn()),
        wn = e
      },
      Dn = function(t) {
        var e, n;
        this.promise = new t((function(t, r) {
          if (void 0 !== e || void 0 !== n) throw TypeError("Bad Promise constructor");
          e = t,
          n = r
        })),
        this.resolve = ke(e),
        this.reject = ke(n)
      },
      Un = {
        f: function(t) {
          return new Dn(t)
        }
      },
      Fn = function(t, e) {
        if (k(t), v(e) && e.constructor === t) return e;
        var n = Un.f(t);
        return (0, n.resolve)(e),
        n.promise
      },
      zn = function(t) {
        try {
          return {
            error: !1,
            value: t()
          }
        } catch(t) {
          return {
            error: !0,
            value: t
          }
        }
      },
      Jn = p.process,
      Vn = Jn && Jn.versions,
      qn = Vn && Vn.v8;
      qn ? jn = (Mn = qn.split("."))[0] + Mn[1] : nn && (!(Mn = nn.match(/Edge\/(\d+)/)) || Mn[1] >= 74) && (Mn = nn.match(/Chrome\/(\d+)/)) && (jn = Mn[1]);
      var Gn, Kn, Wn, Yn, Hn = jn && +jn,
      Qn = Rn.set,
      Xn = Wt("species"),
      $n = "Promise",
      Zn = tt.get,
      tr = tt.set,
      er = tt.getterFor($n),
      nr = He,
      rr = p.TypeError,
      or = p.document,
      ir = p.process,
      ar = dt("fetch"),
      sr = Un.f,
      cr = sr,
      ur = !!(or && or.createEvent && p.dispatchEvent),
      fr = "function" == typeof PromiseRejectionEvent,
      lr = Lt($n, (function() {
        if (! (N(nr) !== String(nr))) {
          if (66 === Hn) return ! 0;
          if (!on && !fr) return ! 0
        }
        if (Hn >= 51 && /native code/.test(nr)) return ! 1;
        var t = nr.resolve(1),
        e = function(t) {
          t((function() {}), (function() {}))
        };
        return (t.constructor = {})[Xn] = e,
        !(t.then((function() {})) instanceof e)
      })),
      hr = lr || !Fe((function(t) {
        nr.all(t).
        catch((function() {}))
      })),
      pr = function(t) {
        var e;
        return ! (!v(t) || "function" != typeof(e = t.then)) && e
      },
      dr = function(t, e) {
        if (!t.notified) {
          t.notified = !0;
          var n = t.reactions;
          Bn((function() {
            for (var r = t.value,
            o = 1 == t.state,
            i = 0; n.length > i;) {
              var a, s, c, u = n[i++],
              f = o ? u.ok: u.fail,
              l = u.resolve,
              h = u.reject,
              p = u.domain;
              try {
                f ? (o || (2 === t.rejection && mr(t), t.rejection = 1), !0 === f ? a = r: (p && p.enter(), a = f(r), p && (p.exit(), c = !0)), a === u.promise ? h(rr("Promise-chain cycle")) : (s = pr(a)) ? s.call(a, l, h) : l(a)) : h(r)
              } catch(t) {
                p && !c && p.exit(),
                h(t)
              }
            }
            t.reactions = [],
            t.notified = !1,
            e && !t.rejection && vr(t)
          }))
        }
      },
      yr = function(t, e, n) {
        var r, o;
        ur ? ((r = or.createEvent("Event")).promise = e, r.reason = n, r.initEvent(t, !1, !0), p.dispatchEvent(r)) : r = {
          promise: e,
          reason: n
        },
        !fr && (o = p["on" + t]) ? o(r) : "unhandledrejection" === t &&
        function(t, e) {
          var n = p.console_;
          n && n.error && (1 === arguments.length ? n.error(t) : n.error(t, e))
        } ("Unhandled promise rejection", n)
      },
      vr = function(t) {
        Qn.call(p, (function() {
          var e, n = t.facade,
          r = t.value;
          if (gr(t) && (e = zn((function() {
            on ? ir.emit("unhandledRejection", r, n) : yr("unhandledrejection", n, r)
          })), t.rejection = on || gr(t) ? 2 : 1, e.error)) throw e.value
        }))
      },
      gr = function(t) {
        return 1 !== t.rejection && !t.parent
      },
      mr = function(t) {
        Qn.call(p, (function() {
          var e = t.facade;
          on ? ir.emit("rejectionHandled", e) : yr("rejectionhandled", e, t.value)
        }))
      },
      br = function(t, e, n) {
        return function(r) {
          t(e, r, n)
        }
      },
      wr = function(t, e, n) {
        t.done || (t.done = !0, n && (t = n), t.value = e, t.state = 2, dr(t, !0))
      },
      kr = function t(e, n, r) {
        if (!e.done) {
          e.done = !0,
          r && (e = r);
          try {
            if (e.facade === n) throw rr("Promise can't be resolved itself");
            var o = pr(n);
            o ? Bn((function() {
              var r = {
                done: !1
              };
              try {
                o.call(n, br(t, r, e), br(wr, r, e))
              } catch(t) {
                wr(r, t, e)
              }
            })) : (e.value = n, e.state = 1, dr(e, !1))
          } catch(t) {
            wr({
              done: !1
            },
            t, e)
          }
        }
      };
      lr && (nr = function(t) {
        Ze(this, nr, $n),
        ke(t),
        Gn.call(this);
        var e = Zn(this);
        try {
          t(br(kr, e), br(wr, e))
        } catch(t) {
          wr(e, t)
        }
      },
      (Gn = function(t) {
        tr(this, {
          type: $n,
          done: !1,
          notified: !1,
          parent: !1,
          reactions: [],
          rejection: !1,
          state: 0,
          value: void 0
        })
      }).prototype = Qe(nr.prototype, {
        then: function(t, e) {
          var n = er(this),
          r = sr(en(this, nr));
          return r.ok = "function" != typeof t || t,
          r.fail = "function" == typeof e && e,
          r.domain = on ? ir.domain: void 0,
          n.parent = !0,
          n.reactions.push(r),
          0 != n.state && dr(n, !1),
          r.promise
        },
        catch: function(t) {
          return this.then(void 0, t)
        }
      }), Kn = function() {
        var t = new Gn,
        e = Zn(t);
        this.promise = t,
        this.resolve = br(kr, e),
        this.reject = br(wr, e)
      },
      Un.f = sr = function(t) {
        return t === nr || t === Wn ? new Kn(t) : cr(t)
      },
      "function" == typeof He && (Yn = He.prototype.then, lt(He.prototype, "then", (function(t, e) {
        var n = this;
        return new nr((function(t, e) {
          Yn.call(n, t, e)
        })).then(t, e)
      }), {
        unsafe: !0
      }), "function" == typeof ar && jt({
        global: !0,
        enumerable: !0,
        forced: !0
      },
      {
        fetch: function(t) {
          return Fn(nr, ar.apply(p, arguments))
        }
      }))),
      jt({
        global: !0,
        wrap: !0,
        forced: lr
      },
      {
        Promise: nr
      }),
      ce(nr, $n, !1),
      $e($n),
      Wn = dt($n),
      jt({
        target: $n,
        stat: !0,
        forced: lr
      },
      {
        reject: function(t) {
          var e = sr(this);
          return e.reject.call(void 0, t),
          e.promise
        }
      }),
      jt({
        target: $n,
        stat: !0,
        forced: lr
      },
      {
        resolve: function(t) {
          return Fn(this, t)
        }
      }),
      jt({
        target: $n,
        stat: !0,
        forced: hr
      },
      {
        all: function(t) {
          var e = this,
          n = sr(e),
          r = n.resolve,
          o = n.reject,
          i = zn((function() {
            var n = ke(e.resolve),
            i = [],
            a = 0,
            s = 1;
            Ve(t, (function(t) {
              var c = a++,
              u = !1;
              i.push(void 0),
              s++,
              n.call(e, t).then((function(t) {
                u || (u = !0, i[c] = t, --s || r(i))
              }), o)
            })),
            --s || r(i)
          }));
          return i.error && o(i.value),
          n.promise
        },
        race: function(t) {
          var e = this,
          n = sr(e),
          r = n.reject,
          o = zn((function() {
            var o = ke(e.resolve);
            Ve(t, (function(t) {
              o.call(e, t).then(n.resolve, r)
            }))
          }));
          return o.error && r(o.value),
          n.promise
        }
      }),
      jt({
        target: "Promise",
        stat: !0
      },
      {
        allSettled: function(t) {
          var e = this,
          n = Un.f(e),
          r = n.resolve,
          o = n.reject,
          i = zn((function() {
            var n = ke(e.resolve),
            o = [],
            i = 0,
            a = 1;
            Ve(t, (function(t) {
              var s = i++,
              c = !1;
              o.push(void 0),
              a++,
              n.call(e, t).then((function(t) {
                c || (c = !0, o[s] = {
                  status: "fulfilled",
                  value: t
                },
                --a || r(o))
              }), (function(t) {
                c || (c = !0, o[s] = {
                  status: "rejected",
                  reason: t
                },
                --a || r(o))
              }))
            })),
            --a || r(o)
          }));
          return i.error && o(i.value),
          n.promise
        }
      });
      jt({
        target: "Promise",
        stat: !0
      },
      {
        any: function(t) {
          var e = this,
          n = Un.f(e),
          r = n.resolve,
          o = n.reject,
          i = zn((function() {
            var n = ke(e.resolve),
            i = [],
            a = 0,
            s = 1,
            c = !1;
            Ve(t, (function(t) {
              var u = a++,
              f = !1;
              i.push(void 0),
              s++,
              n.call(e, t).then((function(t) {
                f || c || (c = !0, r(t))
              }), (function(t) {
                f || c || (f = !0, i[u] = t, --s || o(new(dt("AggregateError"))(i, "No one promise resolved")))
              }))
            })),
            --s || o(new(dt("AggregateError"))(i, "No one promise resolved"))
          }));
          return i.error && o(i.value),
          n.promise
        }
      });
      var Sr = !!He && d((function() {
        He.prototype.
        finally.call({
          then: function() {}
        },
        (function() {}))
      }));
      jt({
        target: "Promise",
        proto: !0,
        real: !0,
        forced: Sr
      },
      {
        finally: function(t) {
          var e = en(this, dt("Promise")),
          n = "function" == typeof t;
          return this.then(n ?
          function(n) {
            return Fn(e, t()).then((function() {
              return n
            }))
          }: t, n ?
          function(n) {
            return Fn(e, t()).then((function() {
              throw n
            }))
          }: t)
        }
      }),
      "function" != typeof He || He.prototype.
      finally || lt(He.prototype, "finally", dt("Promise").prototype.
      finally);
      var Er = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
      },
      Or = Wt("unscopables"),
      Pr = Array.prototype;
      null == Pr[Or] && O.f(Pr, Or, {
        configurable: !0,
        value: ie(null)
      });
      var Rr = function(t) {
        Pr[Or][t] = !0
      },
      Ar = tt.set,
      Tr = tt.getterFor("Array Iterator"),
      xr = ge(Array, "Array", (function(t, e) {
        Ar(this, {
          type: "Array Iterator",
          target: ct(t),
          index: 0,
          kind: e
        })
      }), (function() {
        var t = Tr(this),
        e = t.target,
        n = t.kind,
        r = t.index++;
        return ! e || r >= e.length ? (t.target = void 0, {
          value: void 0,
          done: !0
        }) : "keys" == n ? {
          value: r,
          done: !1
        }: "values" == n ? {
          value: e[r],
          done: !1
        }: {
          value: [r, e[r]],
          done: !1
        }
      }), "values");
      ue.Arguments = ue.Array,
      Rr("keys"),
      Rr("values"),
      Rr("entries");
      var _r = Wt("iterator"),
      Ir = Wt("toStringTag"),
      Cr = xr.values;
      for (var Nr in Er) {
        var Lr = p[Nr],
        Mr = Lr && Lr.prototype;
        if (Mr) {
          if (Mr[_r] !== Cr) try {
            R(Mr, _r, Cr)
          } catch(xc) {
            Mr[_r] = Cr
          }
          if (Mr[Ir] || R(Mr, Ir, Nr), Er[Nr]) for (var jr in xr) if (Mr[jr] !== xr[jr]) try {
            R(Mr, jr, xr[jr])
          } catch(xc) {
            Mr[jr] = xr[jr]
          }
        }
      }
      ht.Promise;
      var Br = !d((function() {
        return Object.isExtensible(Object.preventExtensions({}))
      })),
      Dr = l((function(t) {
        var e = O.f,
        n = z("meta"),
        r = 0,
        o = Object.isExtensible ||
        function() {
          return ! 0
        },
        i = function(t) {
          e(t, n, {
            value: {
              objectID: "O" + ++r,
              weakData: {}
            }
          })
        },
        a = t.exports = {
          REQUIRED: !1,
          fastKey: function(t, e) {
            if (!v(t)) return "symbol" == u(t) ? t: ("string" == typeof t ? "S": "P") + t;
            if (!B(t, n)) {
              if (!o(t)) return "F";
              if (!e) return "E";
              i(t)
            }
            return t[n].objectID
          },
          getWeakData: function(t, e) {
            if (!B(t, n)) {
              if (!o(t)) return ! 0;
              if (!e) return ! 1;
              i(t)
            }
            return t[n].weakData
          },
          onFreeze: function(t) {
            return Br && a.REQUIRED && o(t) && !B(t, n) && i(t),
            t
          }
        };
        q[n] = !0
      })),
      Ur = O.f,
      Fr = Dr.fastKey,
      zr = tt.set,
      Jr = tt.getterFor; (function(t, e, n) {
        var r = -1 !== t.indexOf("Map"),
        o = -1 !== t.indexOf("Weak"),
        i = r ? "set": "add",
        a = p[t],
        s = a && a.prototype,
        c = a,
        u = {},
        f = function(t) {
          var e = s[t];
          lt(s, t, "add" == t ?
          function(t) {
            return e.call(this, 0 === t ? 0 : t),
            this
          }: "delete" == t ?
          function(t) {
            return ! (o && !v(t)) && e.call(this, 0 === t ? 0 : t)
          }: "get" == t ?
          function(t) {
            return o && !v(t) ? void 0 : e.call(this, 0 === t ? 0 : t)
          }: "has" == t ?
          function(t) {
            return ! (o && !v(t)) && e.call(this, 0 === t ? 0 : t)
          }: function(t, n) {
            return e.call(this, 0 === t ? 0 : t, n),
            this
          })
        };
        if (Lt(t, "function" != typeof a || !(o || s.forEach && !d((function() { (new a).entries().next()
        }))))) c = n.getConstructor(e, t, r, i),
        Dr.REQUIRED = !0;
        else if (Lt(t, !0)) {
          var l = new c,
          h = l[i](o ? {}: -0, 1) != l,
          y = d((function() {
            l.has(1)
          })),
          g = Fe((function(t) {
            new a(t)
          })),
          m = !o && d((function() {
            for (var t = new a,
            e = 5; e--;) t[i](e, e);
            return ! t.has( - 0)
          }));
          g || ((c = e((function(e, n) {
            Ze(e, c, t);
            var o = function(t, e, n) {
              var r, o;
              return he && "function" == typeof(r = e.constructor) && r !== n && v(o = r.prototype) && o !== n.prototype && he(t, o),
              t
            } (new a, e, c);
            return null != n && Ve(n, o[i], {
              that: o,
              AS_ENTRIES: r
            }),
            o
          }))).prototype = s, s.constructor = c),
          (y || m) && (f("delete"), f("has"), r && f("get")),
          (m || h) && f(i),
          o && s.clear && delete s.clear
        }
        u[t] = c,
        jt({
          global: !0,
          forced: c != a
        },
        u),
        ce(c, t),
        o || n.setStrong(c, t, r)
      })("Map", (function(t) {
        return function() {
          return t(this, arguments.length ? arguments[0] : void 0)
        }
      }), {
        getConstructor: function(t, e, n, r) {
          var o = t((function(t, i) {
            Ze(t, o, e),
            zr(t, {
              type: e,
              index: ie(null),
              first: void 0,
              last: void 0,
              size: 0
            }),
            y || (t.size = 0),
            null != i && Ve(i, t[r], {
              that: t,
              AS_ENTRIES: n
            })
          })),
          i = Jr(e),
          a = function(t, e, n) {
            var r, o, a = i(t),
            c = s(t, e);
            return c ? c.value = n: (a.last = c = {
              index: o = Fr(e, !0),
              key: e,
              value: n,
              previous: r = a.last,
              next: void 0,
              removed: !1
            },
            a.first || (a.first = c), r && (r.next = c), y ? a.size++:t.size++, "F" !== o && (a.index[o] = c)),
            t
          },
          s = function(t, e) {
            var n, r = i(t),
            o = Fr(e);
            if ("F" !== o) return r.index[o];
            for (n = r.first; n; n = n.next) if (n.key == e) return n
          };
          return Qe(o.prototype, {
            clear: function() {
              for (var t = i(this), e = t.index, n = t.first; n;) n.removed = !0,
              n.previous && (n.previous = n.previous.next = void 0),
              delete e[n.index],
              n = n.next;
              t.first = t.last = void 0,
              y ? t.size = 0 : this.size = 0
            },
            delete: function(t) {
              var e = i(this),
              n = s(this, t);
              if (n) {
                var r = n.next,
                o = n.previous;
                delete e.index[n.index],
                n.removed = !0,
                o && (o.next = r),
                r && (r.previous = o),
                e.first == n && (e.first = r),
                e.last == n && (e.last = o),
                y ? e.size--:this.size--
              }
              return !! n
            },
            forEach: function(t) {
              for (var e, n = i(this), r = Se(t, arguments.length > 1 ? arguments[1] : void 0, 3); e = e ? e.next: n.first;) for (r(e.value, e.key, this); e && e.removed;) e = e.previous
            },
            has: function(t) {
              return !! s(this, t)
            }
          }),
          Qe(o.prototype, n ? {
            get: function(t) {
              var e = s(this, t);
              return e && e.value
            },
            set: function(t, e) {
              return a(this, 0 === t ? 0 : t, e)
            }
          }: {
            add: function(t) {
              return a(this, t = 0 === t ? 0 : t, t)
            }
          }),
          y && Ur(o.prototype, "size", {
            get: function() {
              return i(this).size
            }
          }),
          o
        },
        setStrong: function(t, e, n) {
          var r = e + " Iterator",
          o = Jr(e),
          i = Jr(r);
          ge(t, e, (function(t, e) {
            zr(this, {
              type: r,
              target: t,
              state: o(t),
              kind: e,
              last: void 0
            })
          }), (function() {
            for (var t = i(this), e = t.kind, n = t.last; n && n.removed;) n = n.previous;
            return t.target && (t.last = n = n ? n.next: t.state.first) ? "keys" == e ? {
              value: n.key,
              done: !1
            }: "values" == e ? {
              value: n.value,
              done: !1
            }: {
              value: [n.key, n.value],
              done: !1
            }: (t.target = void 0, {
              value: void 0,
              done: !0
            })
          }), n ? "entries": "values", !n, !0),
          $e(e)
        }
      }),
      ht.Map;
      "function" != typeof Object.values && (Object.values = function(t) {
        return void 0 === t || null == t ? [] : Object.keys(t).map((function(e) {
          return t[e]
        }))
      }),
      "function" != typeof Promise.prototype.
      finally && (Promise.prototype.
      finally = function(t) {
        var e = this;
        return this.then((function(n) {
          return e.constructor.resolve(t()).then((function() {
            return n
          }))
        })).
        catch((function(n) {
          return e.constructor.resolve(t()).then((function() {
            throw n
          }))
        }))
      }),
      function(t) {
        t.console_ || (t.console_ = {});
        for (var e, n, r = t.console_,
        o = function() {},
        i = ["memory"], a = "assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(","); e = i.pop();) r[e] || (r[e] = {});
        for (; n = a.pop();) r[n] || (r[n] = o)
      } ("undefined" == typeof window ? f: window),
      /**
 *
 *
 * @author Jerry Bendy <jerry@icewingcc.com>
 * @licence MIT
 *
 */
      function(t) {
        var e, n = function() {
          try {
            if (t.URLSearchParams && "bar" === new t.URLSearchParams("foo=bar").get("foo")) return t.URLSearchParams
          } catch(t) {}
          return null
        } (),
        r = n && "a=1" === new n({
          a: 1
        }).toString(),
        o = n && "+" === new n("s=%2B").get("s"),
        i = !n || ((e = new n).append("s", " &"), "s=+%26" === e.toString()),
        a = l.prototype,
        s = !(!t.Symbol || !t.Symbol.iterator);
        if (! (n && r && o && i)) {
          a.append = function(t, e) {
            v(this.__URLSearchParams__, t, e)
          },
          a.delete = function(t) {
            delete this.__URLSearchParams__[t]
          },
          a.get = function(t) {
            var e = this.__URLSearchParams__;
            return this.has(t) ? e[t][0] : null
          },
          a.getAll = function(t) {
            var e = this.__URLSearchParams__;
            return this.has(t) ? e[t].slice(0) : []
          },
          a.has = function(t) {
            return m(this.__URLSearchParams__, t)
          },
          a.set = function(t, e) {
            this.__URLSearchParams__[t] = ["" + e]
          },
          a.toString = function() {
            var t, e, n, r, o = this.__URLSearchParams__,
            i = [];
            for (e in o) for (n = h(e), t = 0, r = o[e]; t < r.length; t++) i.push(n + "=" + h(r[t]));
            return i.join("&")
          };
          var c = !!o && n && !r && t.Proxy;
          Object.defineProperty(t, "URLSearchParams", {
            value: c ? new Proxy(n, {
              construct: function(t, e) {
                return new t(new l(e[0]).toString())
              }
            }) : l
          });
          var f = t.URLSearchParams.prototype;
          f.polyfill = !0,
          f.forEach = f.forEach ||
          function(t, e) {
            var n = y(this.toString());
            Object.getOwnPropertyNames(n).forEach((function(r) {
              n[r].forEach((function(n) {
                t.call(e, n, r, this)
              }), this)
            }), this)
          },
          f.sort = f.sort ||
          function() {
            var t, e, n, r = y(this.toString()),
            o = [];
            for (t in r) o.push(t);
            for (o.sort(), e = 0; e < o.length; e++) this.delete(o[e]);
            for (e = 0; e < o.length; e++) {
              var i = o[e],
              a = r[i];
              for (n = 0; n < a.length; n++) this.append(i, a[n])
            }
          },
          f.keys = f.keys ||
          function() {
            var t = [];
            return this.forEach((function(e, n) {
              t.push(n)
            })),
            d(t)
          },
          f.values = f.values ||
          function() {
            var t = [];
            return this.forEach((function(e) {
              t.push(e)
            })),
            d(t)
          },
          f.entries = f.entries ||
          function() {
            var t = [];
            return this.forEach((function(e, n) {
              t.push([n, e])
            })),
            d(t)
          },
          s && (f[t.Symbol.iterator] = f[t.Symbol.iterator] || f.entries)
        }
        function l(t) { ((t = t || "") instanceof URLSearchParams || t instanceof l) && (t = t.toString()),
          this.__URLSearchParams__ = y(t)
        }
        function h(t) {
          var e = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+",
            "%00": "\0"
          };
          return encodeURIComponent(t).replace(/[!'\(\)~]|%20|%00/g, (function(t) {
            return e[t]
          }))
        }
        function p(t) {
          return t.replace(/[ +]/g, "%20").replace(/(%[a-f0-9]{2})+/gi, (function(t) {
            return decodeURIComponent(t)
          }))
        }
        function d(e) {
          var n = {
            next: function() {
              var t = e.shift();
              return {
                done: void 0 === t,
                value: t
              }
            }
          };
          return s && (n[t.Symbol.iterator] = function() {
            return n
          }),
          n
        }
        function y(t) {
          var e = {};
          if ("object" === u(t)) if (g(t)) for (var n = 0; n < t.length; n++) {
            var r = t[n];
            if (!g(r) || 2 !== r.length) throw new TypeError("Failed to construct 'URLSearchParams': Sequence initializer must only contain pair elements");
            v(e, r[0], r[1])
          } else for (var o in t) t.hasOwnProperty(o) && v(e, o, t[o]);
          else {
            0 === t.indexOf("?") && (t = t.slice(1));
            for (var i = t.split("&"), a = 0; a < i.length; a++) {
              var s = i[a],
              c = s.indexOf("="); - 1 < c ? v(e, p(s.slice(0, c)), p(s.slice(c + 1))) : s && v(e, p(s), "")
            }
          }
          return e
        }
        function v(t, e, n) {
          var r = "string" == typeof n ? n: null != n && "function" == typeof n.toString ? n.toString() : JSON.stringify(n);
          m(t, e) ? t[e].push(r) : t[e] = [r]
        }
        function g(t) {
          return !! t && "[object Array]" === Object.prototype.toString.call(t)
        }
        function m(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e)
        }
      } (void 0 !== f ? f: "undefined" != typeof window ? window: f);
      var Vr = "undefined" != typeof globalThis && globalThis || "undefined" != typeof self && self || void 0 !== Vr && Vr,
      qr = "URLSearchParams" in Vr,
      Gr = "Symbol" in Vr && "iterator" in Symbol,
      Kr = "FileReader" in Vr && "Blob" in Vr &&
      function() {
        try {
          return new Blob,
          !0
        } catch(t) {
          return ! 1
        }
      } (),
      Wr = "FormData" in Vr,
      Yr = "ArrayBuffer" in Vr;
      if (Yr) var Hr = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      Qr = ArrayBuffer.isView ||
      function(t) {
        return t && Hr.indexOf(Object.prototype.toString.call(t)) > -1
      };
      function Xr(t) {
        if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t) || "" === t) throw new TypeError("Invalid character in header field name");
        return t.toLowerCase()
      }
      function $r(t) {
        return "string" != typeof t && (t = String(t)),
        t
      }
      function Zr(t) {
        var e = {
          next: function() {
            var e = t.shift();
            return {
              done: void 0 === e,
              value: e
            }
          }
        };
        return Gr && (e[Symbol.iterator] = function() {
          return e
        }),
        e
      }
      function to(t) {
        this.map = {},
        t instanceof to ? t.forEach((function(t, e) {
          this.append(e, t)
        }), this) : Array.isArray(t) ? t.forEach((function(t) {
          this.append(t[0], t[1])
        }), this) : t && Object.getOwnPropertyNames(t).forEach((function(e) {
          this.append(e, t[e])
        }), this)
      }
      function eo(t) {
        if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
        t.bodyUsed = !0
      }
      function no(t) {
        return new Promise((function(e, n) {
          t.onload = function() {
            e(t.result)
          },
          t.onerror = function() {
            n(t.error)
          }
        }))
      }
      function ro(t) {
        var e = new FileReader,
        n = no(e);
        return e.readAsArrayBuffer(t),
        n
      }
      function oo(t) {
        if (t.slice) return t.slice(0);
        var e = new Uint8Array(t.byteLength);
        return e.set(new Uint8Array(t)),
        e.buffer
      }
      function io() {
        return this.bodyUsed = !1,
        this._initBody = function(t) {
          var e;
          this.bodyUsed = this.bodyUsed,
          this._bodyInit = t,
          t ? "string" == typeof t ? this._bodyText = t: Kr && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t: Wr && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t: qr && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : Yr && Kr && ((e = t) && DataView.prototype.isPrototypeOf(e)) ? (this._bodyArrayBuffer = oo(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : Yr && (ArrayBuffer.prototype.isPrototypeOf(t) || Qr(t)) ? this._bodyArrayBuffer = oo(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "",
          this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : qr && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
        },
        Kr && (this.blob = function() {
          var t = eo(this);
          if (t) return t;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData) throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]))
        },
        this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var t = eo(this);
            return t || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer))
          }
          return this.blob().then(ro)
        }),
        this.text = function() {
          var t = eo(this);
          if (t) return t;
          if (this._bodyBlob) return function(t) {
            var e = new FileReader,
            n = no(e);
            return e.readAsText(t),
            n
          } (this._bodyBlob);
          if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
            for (var e = new Uint8Array(t), n = new Array(e.length), r = 0; r < e.length; r++) n[r] = String.fromCharCode(e[r]);
            return n.join("")
          } (this._bodyArrayBuffer));
          if (this._bodyFormData) throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText)
        },
        Wr && (this.formData = function() {
          return this.text().then(co)
        }),
        this.json = function() {
          return this.text().then(JSON.parse)
        },
        this
      }
      to.prototype.append = function(t, e) {
        t = Xr(t),
        e = $r(e);
        var n = this.map[t];
        this.map[t] = n ? n + ", " + e: e
      },
      to.prototype.delete = function(t) {
        delete this.map[Xr(t)]
      },
      to.prototype.get = function(t) {
        return t = Xr(t),
        this.has(t) ? this.map[t] : null
      },
      to.prototype.has = function(t) {
        return this.map.hasOwnProperty(Xr(t))
      },
      to.prototype.set = function(t, e) {
        this.map[Xr(t)] = $r(e)
      },
      to.prototype.forEach = function(t, e) {
        for (var n in this.map) this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this)
      },
      to.prototype.keys = function() {
        var t = [];
        return this.forEach((function(e, n) {
          t.push(n)
        })),
        Zr(t)
      },
      to.prototype.values = function() {
        var t = [];
        return this.forEach((function(e) {
          t.push(e)
        })),
        Zr(t)
      },
      to.prototype.entries = function() {
        var t = [];
        return this.forEach((function(e, n) {
          t.push([n, e])
        })),
        Zr(t)
      },
      Gr && (to.prototype[Symbol.iterator] = to.prototype.entries);
      var ao = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function so(t, e) {
        if (! (this instanceof so)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        var n, r, o = (e = e || {}).body;
        if (t instanceof so) {
          if (t.bodyUsed) throw new TypeError("Already read");
          this.url = t.url,
          this.credentials = t.credentials,
          e.headers || (this.headers = new to(t.headers)),
          this.method = t.method,
          this.mode = t.mode,
          this.signal = t.signal,
          o || null == t._bodyInit || (o = t._bodyInit, t.bodyUsed = !0)
        } else this.url = String(t);
        if (this.credentials = e.credentials || this.credentials || "same-origin", !e.headers && this.headers || (this.headers = new to(e.headers)), this.method = (n = e.method || this.method || "GET", r = n.toUpperCase(), ao.indexOf(r) > -1 ? r: n), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o) throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(o), !("GET" !== this.method && "HEAD" !== this.method || "no-store" !== e.cache && "no-cache" !== e.cache)) {
          var i = /([?&])_=[^&]*/;
          if (i.test(this.url)) this.url = this.url.replace(i, "$1_=" + (new Date).getTime());
          else {
            this.url += (/\?/.test(this.url) ? "&": "?") + "_=" + (new Date).getTime()
          }
        }
      }
      function co(t) {
        var e = new FormData;
        return t.trim().split("&").forEach((function(t) {
          if (t) {
            var n = t.split("="),
            r = n.shift().replace(/\+/g, " "),
            o = n.join("=").replace(/\+/g, " ");
            e.append(decodeURIComponent(r), decodeURIComponent(o))
          }
        })),
        e
      }
      function uo(t, e) {
        if (! (this instanceof uo)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        e || (e = {}),
        this.type = "default",
        this.status = void 0 === e.status ? 200 : e.status,
        this.ok = this.status >= 200 && this.status < 300,
        this.statusText = "statusText" in e ? e.statusText: "",
        this.headers = new to(e.headers),
        this.url = e.url || "",
        this._initBody(t)
      }
      so.prototype.clone = function() {
        return new so(this, {
          body: this._bodyInit
        })
      },
      io.call(so.prototype),
      io.call(uo.prototype),
      uo.prototype.clone = function() {
        return new uo(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new to(this.headers),
          url: this.url
        })
      },
      uo.error = function() {
        var t = new uo(null, {
          status: 0,
          statusText: ""
        });
        return t.type = "error",
        t
      };
      var fo = [301, 302, 303, 307, 308];
      uo.redirect = function(t, e) {
        if ( - 1 === fo.indexOf(e)) throw new RangeError("Invalid status code");
        return new uo(null, {
          status: e,
          headers: {
            location: t
          }
        })
      };
      var lo = Vr.DOMException;
      try {
        new lo
      } catch(t) { (lo = function(t, e) {
          this.message = t,
          this.name = e;
          var n = Error(t);
          this.stack = n.stack
        }).prototype = Object.create(Error.prototype),
        lo.prototype.constructor = lo
      }
      function ho(t, e) {
        return new Promise((function(n, r) {
          var o = new so(t, e);
          if (o.signal && o.signal.aborted) return r(new lo("Aborted", "AbortError"));
          var i = new XMLHttpRequest;
          function a() {
            i.abort()
          }
          i.onload = function() {
            var t, e, r = {
              status: i.status,
              statusText: i.statusText,
              headers: (t = i.getAllResponseHeaders() || "", e = new to, t.replace(/\r?\n[\t ]+/g, " ").split("\r").map((function(t) {
                return 0 === t.indexOf("\n") ? t.substr(1, t.length) : t
              })).forEach((function(t) {
                var n = t.split(":"),
                r = n.shift().trim();
                if (r) {
                  var o = n.join(":").trim();
                  e.append(r, o)
                }
              })), e)
            };
            r.url = "responseURL" in i ? i.responseURL: r.headers.get("X-Request-URL");
            var o = "response" in i ? i.response: i.responseText;
            setTimeout((function() {
              n(new uo(o, r))
            }), 0)
          },
          i.onerror = function() {
            setTimeout((function() {
              r(new TypeError("Network request failed"))
            }), 0)
          },
          i.ontimeout = function() {
            setTimeout((function() {
              r(new TypeError("Network request failed"))
            }), 0)
          },
          i.onabort = function() {
            setTimeout((function() {
              r(new lo("Aborted", "AbortError"))
            }), 0)
          },
          i.open(o.method,
          function(t) {
            try {
              return "" === t && Vr.location.href ? Vr.location.href: t
            } catch(e) {
              return t
            }
          } (o.url), !0),
          "include" === o.credentials ? i.withCredentials = !0 : "omit" === o.credentials && (i.withCredentials = !1),
          "responseType" in i && (Kr ? i.responseType = "blob": Yr && o.headers.get("Content-Type") && -1 !== o.headers.get("Content-Type").indexOf("application/octet-stream") && (i.responseType = "arraybuffer")),
          !e || "object" !== u(e.headers) || e.headers instanceof to ? o.headers.forEach((function(t, e) {
            i.setRequestHeader(e, t)
          })) : Object.getOwnPropertyNames(e.headers).forEach((function(t) {
            i.setRequestHeader(t, $r(e.headers[t]))
          })),
          o.signal && (o.signal.addEventListener("abort", a), i.onreadystatechange = function() {
            4 === i.readyState && o.signal.removeEventListener("abort", a)
          }),
          i.send(void 0 === o._bodyInit ? null: o._bodyInit)
        }))
      }
      function po(t, e) {
        if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
      }
      function yo(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || !1,
          r.configurable = !0,
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r)
        }
      }
      function vo(t, e, n) {
        return e && yo(t.prototype, e),
        n && yo(t, n),
        t
      }
      function go(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      }
      function mo(t, e) {
        return (mo = Object.setPrototypeOf ||
        function(t, e) {
          return t.__proto__ = e,
          t
        })(t, e)
      }
      function bo(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }),
        e && mo(t, e)
      }
      function wo(t) {
        return (wo = Object.setPrototypeOf ? Object.getPrototypeOf: function(t) {
          return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
      }
      function ko() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return ! 1;
        if (Reflect.construct.sham) return ! 1;
        if ("function" == typeof Proxy) return ! 0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))),
          !0
        } catch(t) {
          return ! 1
        }
      }
      function So(t, e) {
        return ! e || "object" !== u(e) && "function" != typeof e ? go(t) : e
      }
      function Eo(t) {
        var e = ko();
        return function() {
          var n, r = wo(t);
          if (e) {
            var o = wo(this).constructor;
            n = Reflect.construct(r, arguments, o)
          } else n = r.apply(this, arguments);
          return So(this, n)
        }
      }
      function Oo(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : t[e] = n,
        t
      }
      ho.polyfill = !0,
      Vr.fetch || (Vr.fetch = ho, Vr.Headers = to, Vr.Request = so, Vr.Response = uo),
      function() {
        function t(t, e) {
          if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        function e(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value" in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r)
          }
        }
        function n(t, n, r) {
          return n && e(t.prototype, n),
          r && e(t, r),
          t
        }
        function r(t) {
          return (r = Object.setPrototypeOf ? Object.getPrototypeOf: function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
          })(t)
        }
        function o(t, e) {
          return (o = Object.setPrototypeOf ||
          function(t, e) {
            return t.__proto__ = e,
            t
          })(t, e)
        }
        function i(t) {
          if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t
        }
        function a(t, e) {
          return ! e || "object" !== u(e) && "function" != typeof e ? i(t) : e
        }
        function s(t) {
          var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return ! 1;
            if (Reflect.construct.sham) return ! 1;
            if ("function" == typeof Proxy) return ! 0;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))),
              !0
            } catch(t) {
              return ! 1
            }
          } ();
          return function() {
            var n, o = r(t);
            if (e) {
              var i = r(this).constructor;
              n = Reflect.construct(o, arguments, i)
            } else n = o.apply(this, arguments);
            return a(this, n)
          }
        }
        function c(t, e, n) {
          return (c = "undefined" != typeof Reflect && Reflect.get ? Reflect.get: function(t, e, n) {
            var o = function(t, e) {
              for (; ! Object.prototype.hasOwnProperty.call(t, e) && null !== (t = r(t)););
              return t
            } (t, e);
            if (o) {
              var i = Object.getOwnPropertyDescriptor(o, e);
              return i.get ? i.get.call(n) : i.value
            }
          })(t, e, n || t)
        }
        var l = function() {
          function e() {
            t(this, e),
            Object.defineProperty(this, "listeners", {
              value: {},
              writable: !0,
              configurable: !0
            })
          }
          return n(e, [{
            key: "addEventListener",
            value: function(t, e) {
              t in this.listeners || (this.listeners[t] = []),
              this.listeners[t].push(e)
            }
          },
          {
            key: "removeEventListener",
            value: function(t, e) {
              if (t in this.listeners) for (var n = this.listeners[t], r = 0, o = n.length; r < o; r++) if (n[r] === e) return void n.splice(r, 1)
            }
          },
          {
            key: "dispatchEvent",
            value: function(t) {
              var e = this;
              if (t.type in this.listeners) {
                for (var n = function(n) {
                  setTimeout((function() {
                    return n.call(e, t)
                  }))
                },
                r = this.listeners[t.type], o = 0, i = r.length; o < i; o++) n(r[o]);
                return ! t.defaultPrevented
              }
            }
          }]),
          e
        } (),
        h = function(e) { !
          function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: t,
                writable: !0,
                configurable: !0
              }
            }),
            e && o(t, e)
          } (u, e);
          var a = s(u);
          function u() {
            var e;
            return t(this, u),
            (e = a.call(this)).listeners || l.call(i(e)),
            Object.defineProperty(i(e), "aborted", {
              value: !1,
              writable: !0,
              configurable: !0
            }),
            Object.defineProperty(i(e), "onabort", {
              value: null,
              writable: !0,
              configurable: !0
            }),
            e
          }
          return n(u, [{
            key: "toString",
            value: function() {
              return "[object AbortSignal]"
            }
          },
          {
            key: "dispatchEvent",
            value: function(t) {
              "abort" === t.type && (this.aborted = !0, "function" == typeof this.onabort && this.onabort.call(this, t)),
              c(r(u.prototype), "dispatchEvent", this).call(this, t)
            }
          }]),
          u
        } (l),
        p = function() {
          function e() {
            t(this, e),
            Object.defineProperty(this, "signal", {
              value: new h,
              writable: !0,
              configurable: !0
            })
          }
          return n(e, [{
            key: "abort",
            value: function() {
              var t;
              try {
                t = new Event("abort")
              } catch(e) {
                "undefined" != typeof document ? document.createEvent ? (t = document.createEvent("Event")).initEvent("abort", !1, !1) : (t = document.createEventObject()).type = "abort": t = {
                  type: "abort",
                  bubbles: !1,
                  cancelable: !1
                }
              }
              this.signal.dispatchEvent(t)
            }
          },
          {
            key: "toString",
            value: function() {
              return "[object AbortController]"
            }
          }]),
          e
        } ();
        function d(t) {
          return t.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL ? (console_.log("__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill"), !0) : "function" == typeof t.Request && !t.Request.prototype.hasOwnProperty("signal") || !t.AbortController
        }
        "undefined" != typeof Symbol && Symbol.toStringTag && (p.prototype[Symbol.toStringTag] = "AbortController", h.prototype[Symbol.toStringTag] = "AbortSignal"),
        function(t) {
          if (d(t)) if (t.fetch) {
            var e = function(t) {
              "function" == typeof t && (t = {
                fetch: t
              });
              var e = t,
              n = e.fetch,
              r = e.Request,
              o = void 0 === r ? n.Request: r,
              i = e.AbortController,
              a = e.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL,
              s = void 0 !== a && a;
              if (!d({
                fetch: n,
                Request: o,
                AbortController: i,
                __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL: s
              })) return {
                fetch: n,
                Request: c
              };
              var c = o; (c && !c.prototype.hasOwnProperty("signal") || s) && ((c = function(t, e) {
                var n;
                e && e.signal && (n = e.signal, delete e.signal);
                var r = new o(t, e);
                return n && Object.defineProperty(r, "signal", {
                  writable: !1,
                  enumerable: !1,
                  configurable: !0,
                  value: n
                }),
                r
              }).prototype = o.prototype);
              var u = n;
              return {
                fetch: function(t, e) {
                  var n = c && c.prototype.isPrototypeOf(t) ? t.signal: e ? e.signal: void 0;
                  if (n) {
                    var r;
                    try {
                      r = new DOMException("Aborted", "AbortError")
                    } catch(t) { (r = new Error("Aborted")).name = "AbortError"
                    }
                    if (n.aborted) return Promise.reject(r);
                    var o = new Promise((function(t, e) {
                      n.addEventListener("abort", (function() {
                        return e(r)
                      }), {
                        once: !0
                      })
                    }));
                    return e && e.signal && delete e.signal,
                    Promise.race([o, u(t, e)])
                  }
                  return u(t, e)
                },
                Request: c
              }
            } (t),
            n = e.fetch,
            r = e.Request;
            t.fetch = n,
            t.Request = r,
            Object.defineProperty(t, "AbortController", {
              writable: !0,
              enumerable: !1,
              configurable: !0,
              value: p
            }),
            Object.defineProperty(t, "AbortSignal", {
              writable: !0,
              enumerable: !1,
              configurable: !0,
              value: h
            })
          } else console_.warn("fetch() is not available, cannot install abortcontroller-polyfill")
        } ("undefined" != typeof self ? self: f)
      } ();
      var Po = "object" == u(f) && f && f.Object === Object && f,
      Ro = "object" == ("undefined" == typeof self ? "undefined": u(self)) && self && self.Object === Object && self,
      Ao = (Po || Ro || Function("return this")()).Symbol,
      To = Object.prototype,
      xo = To.hasOwnProperty,
      _o = To.toString,
      Io = Ao ? Ao.toStringTag: void 0;
      var Co = function(t) {
        var e = xo.call(t, Io),
        n = t[Io];
        try {
          t[Io] = void 0;
          var r = !0
        } catch(t) {}
        var o = _o.call(t);
        return r && (e ? t[Io] = n: delete t[Io]),
        o
      },
      No = Object.prototype.toString;
      var Lo = function(t) {
        return No.call(t)
      },
      Mo = Ao ? Ao.toStringTag: void 0;
      var jo = function(t) {
        return null == t ? void 0 === t ? "[object Undefined]": "[object Null]": Mo && Mo in Object(t) ? Co(t) : Lo(t)
      };
      var Bo = function(t) {
        var e = u(t);
        return null != t && ("object" == e || "function" == e)
      };
      var Do = function(t) {
        if (!Bo(t)) return ! 1;
        var e = jo(t);
        return "[object Function]" == e || "[object GeneratorFunction]" == e || "[object AsyncFunction]" == e || "[object Proxy]" == e
      };
      var Uo = function(t) {
        return null != t && "object" == u(t)
      };
      var Fo = function(t) {
        return "number" == typeof t || Uo(t) && "[object Number]" == jo(t)
      };
      function zo(t, e) { (null == e || e > t.length) && (e = t.length);
        for (var n = 0,
        r = new Array(e); n < e; n++) r[n] = t[n];
        return r
      }
      function Jo(t, e) {
        if (t) {
          if ("string" == typeof t) return zo(t, e);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          return "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? zo(t, e) : void 0
        }
      }
      function Vo(t, e) {
        return function(t) {
          if (Array.isArray(t)) return t
        } (t) ||
        function(t, e) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
            var n = [],
            r = !0,
            o = !1,
            i = void 0;
            try {
              for (var a, s = t[Symbol.iterator](); ! (r = (a = s.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0);
            } catch(t) {
              o = !0,
              i = t
            } finally {
              try {
                r || null == s.
                return || s.
                return ()
              } finally {
                if (o) throw i
              }
            }
            return n
          }
        } (t, e) || Jo(t, e) ||
        function() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        } ()
      }
      function qo() {
        return "undefined" != typeof document && !!document.scripts
      }
      var Go = qo() ? document: {
        cookie: ""
      },
      Ko = "Intel Mac OS X 10_14_5",
      Wo = "AppleWebKit/534.36 (KHTML, like Gecko) NodeJS/v4.1.0 Chrome/76.0.3809.132 Safari/534.36",
      Yo = qo() ? navigator: {
        appCodeName: "Mozilla",
        appName: "Netscape",
        appVersion: "5.0 (Macintosh; " + Ko + ") " + Wo,
        cookieEnabled: !1,
        mimeTypes: [],
        onLine: !0,
        platform: "MacIntel",
        plugins: [],
        product: "MPike",
        productSub: "20030107",
        userAgent: "Mozilla/5.0 (Macintosh; " + Ko + ") " + Wo,
        vendor: "Joyent",
        vendorSub: "",
        connection: {}
      },
      Ho = qo() ? location: {
        href: "",
        search: "",
        protocol: "https:"
      },
      Qo = qo() ? window: {
        document: Go,
        navigator: Yo,
        location: Ho,
        self: Qo,
        console_: console_,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setInterval: setInterval,
        clearInterval: clearInterval
      },
      Xo = Array.isArray;
      var $o = function(t) {
        return "string" == typeof t || !Xo(t) && Uo(t) && "[object String]" == jo(t)
      };
      var Zo = function(t) {
        return null === t
      };
      var ti = function(t) {
        return void 0 === t
      };
      function ei(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          e && (r = r.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))),
          n.push.apply(n, r)
        }
        return n
      }
      function ni(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2 ? ei(Object(n), !0).forEach((function(e) {
            Oo(t, e, n[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ei(Object(n)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
          }))
        }
        return t
      }
      var ri = function(t, e) {
        return function(n) {
          return t(e(n))
        }
      } (Object.getPrototypeOf, Object),
      oi = Function.prototype,
      ii = Object.prototype,
      ai = oi.toString,
      si = ii.hasOwnProperty,
      ci = ai.call(Object);
      var ui = function(t) {
        if (!Uo(t) || "[object Object]" != jo(t)) return ! 1;
        var e = ri(t);
        if (null === e) return ! 0;
        var n = si.call(e, "constructor") && e.constructor;
        return "function" == typeof n && n instanceof n && ai.call(n) == ci
      };
      for (var fi = function(t) {
        return ! 0 === t || !1 === t || Uo(t) && "[object Boolean]" == jo(t)
      },
      li = function(t) {
        var e = wi(t),
        n = e[0],
        r = e[1];
        return 3 * (n + r) / 4 - r
      },
      hi = function(t) {
        var e, n, r = wi(t),
        o = r[0],
        i = r[1],
        a = new vi(function(t, e, n) {
          return 3 * (e + n) / 4 - n
        } (0, o, i)),
        s = 0,
        c = i > 0 ? o - 4 : o;
        for (n = 0; n < c; n += 4) e = yi[t.charCodeAt(n)] << 18 | yi[t.charCodeAt(n + 1)] << 12 | yi[t.charCodeAt(n + 2)] << 6 | yi[t.charCodeAt(n + 3)],
        a[s++] = e >> 16 & 255,
        a[s++] = e >> 8 & 255,
        a[s++] = 255 & e;
        2 === i && (e = yi[t.charCodeAt(n)] << 2 | yi[t.charCodeAt(n + 1)] >> 4, a[s++] = 255 & e);
        1 === i && (e = yi[t.charCodeAt(n)] << 10 | yi[t.charCodeAt(n + 1)] << 4 | yi[t.charCodeAt(n + 2)] >> 2, a[s++] = e >> 8 & 255, a[s++] = 255 & e);
        return a
      },
      pi = function(t) {
        for (var e, n = t.length,
        r = n % 3,
        o = [], i = 0, a = n - r; i < a; i += 16383) o.push(ki(t, i, i + 16383 > a ? a: i + 16383));
        1 === r ? (e = t[n - 1], o.push(di[e >> 2] + di[e << 4 & 63] + "==")) : 2 === r && (e = (t[n - 2] << 8) + t[n - 1], o.push(di[e >> 10] + di[e >> 4 & 63] + di[e << 2 & 63] + "="));
        return o.join("")
      },
      di = [], yi = [], vi = "undefined" != typeof Uint8Array ? Uint8Array: Array, gi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", mi = 0, bi = gi.length; mi < bi; ++mi) di[mi] = gi[mi],
      yi[gi.charCodeAt(mi)] = mi;
      function wi(t) {
        var e = t.length;
        if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var n = t.indexOf("=");
        return - 1 === n && (n = e),
        [n, n === e ? 0 : 4 - n % 4]
      }
      function ki(t, e, n) {
        for (var r, o, i = [], a = e; a < n; a += 3) r = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]),
        i.push(di[(o = r) >> 18 & 63] + di[o >> 12 & 63] + di[o >> 6 & 63] + di[63 & o]);
        return i.join("")
      }
      yi["-".charCodeAt(0)] = 62,
      yi["_".charCodeAt(0)] = 63;
      var Si = {
        byteLength: li,
        toByteArray: hi,
        fromByteArray: pi
      },
      Ei = function() {
        function t() {
          po(this, t),
          Oo(this, "head", null)
        }
        return vo(t, [{
          key: "insert",
          value: function(t) {
            var e = this.head;
            t.next = e,
            t.prev = null,
            null !== e && (e.prev = t),
            this.head = t
          }
        },
        {
          key: "append",
          value: function(t) {
            if (t.next = null, null === this.head) t.prev = null,
            this.head = t;
            else {
              for (var e = this.head; e.next;) e = e.next;
              e.next = t,
              t.prev = e
            }
          }
        },
        {
          key: "deleteNode",
          value: function(t) {
            var e = this.head;
            e && t && (e === t && (this.head = t.next), t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next))
          }
        },
        {
          key: "deleteNodeBy",
          value: function(t) {
            var e = this.find(t);
            return !! e && (this.deleteNode(e), !0)
          }
        },
        {
          key: "find",
          value: function(t) {
            var e = null;
            return this.forEach((function(n) {
              if (!0 === t(n)) return e = n,
              !1
            })),
            e
          }
        },
        {
          key: "forEach",
          value: function(t) {
            var e = this.head;
            if (e && Do(t)) for (var n = e; n && !1 !== t(n);) n = n.next
          }
        },
        {
          key: "size",
          value: function() {
            var t = 0;
            return this.forEach((function() {
              return t++
            })),
            t
          }
        },
        {
          key: "clear",
          value: function() {
            for (var t = this.head; t;) this.deleteNode(t),
            t = t.next;
            this.head = null
          }
        }]),
        t
      } (),
      Oi = function() {
        function t(e, n) {
          po(this, t),
          Oo(this, "accessOrder", !1),
          Oo(this, "maxSize", Number.MAX_VALUE),
          Oo(this, "linkedList", new Ei),
          Oo(this, "map", new Map),
          this.accessOrder = !!e,
          Fo(n) && (this.maxSize = Math.abs(n))
        }
        return vo(t, [{
          key: "has",
          value: function(t) {
            return this.map.has(t)
          }
        },
        {
          key: "set",
          value: function(t, e) {
            var n = this.map,
            r = this.linkedList,
            o = this.has(t),
            i = {
              key: t,
              value: e
            };
            n.set(t, i),
            o || (r.append(i), this.afterNodeInsertion())
          }
        },
        {
          key: "get",
          value: function(t) {
            var e = this.map,
            n = (this.linkedList, this.accessOrder),
            r = e.get(t);
            return r ? (n && this.afterNodeAccess(r), r.value) : null
          }
        },
        {
          key: "delete",
          value: function(t) {
            var e = this.map,
            n = this.linkedList,
            r = e.get(t);
            return !! r && (e.delete(t), n.deleteNode(r), this.afterNodeRemoval(r), !0)
          }
        },
        {
          key: "afterNodeRemoval",
          value: function(t) {}
        },
        {
          key: "afterNodeInsertion",
          value: function() {
            var t = this.map,
            e = this.linkedList,
            n = e.head;
            n && this.removeEldestEntry(n) && (t.delete(n.key), e.deleteNode(n))
          }
        },
        {
          key: "afterNodeAccess",
          value: function(t) {
            this.map;
            var e = this.linkedList,
            n = e.find((function(e) {
              return e.key === t.key
            }));
            n && (e.deleteNode(n), e.append(n))
          }
        },
        {
          key: "removeEldestEntry",
          value: function(t) {
            var e = this.maxSize,
            n = this.map;
            this.linkedList;
            return n.size > e
          }
        }]),
        t
      } (),
      Pi = function(t) {
        return ti(t) || Zo(t)
      },
      Ri = function() {
        function t() {
          po(this, t)
        }
        return vo(t, null, [{
          key: "isSecure",
          value: function(t) {
            return Pi(t) && (t = Ho.protocol),
            /^(ws|http)s:$/.test(t)
          }
        },
        {
          key: "parseUrl",
          value: function(t) {
            var e = {
              source: t
            };
            if ($o(t)) try {
              var n = Vo(/^(?:([A-Za-z]+:))?(\/{2})?([0-9.\-A-Za-z]*(?::\d+)?)(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.exec(t), 7),
              r = n[0],
              o = n[1],
              i = n[2],
              a = n[3],
              s = n[4],
              c = n[5],
              u = n[6],
              f = Vo(a.split(":"), 2),
              l = f[0],
              h = f[1];
              e = {
                source: t,
                href: r,
                protocol: o,
                slash: i,
                host: a,
                query: c,
                origin: "".concat(o || "").concat(i || "").concat(a || ""),
                hostname: l,
                port: h,
                pathname: "/".concat(s || ""),
                search: "?".concat(c || ""),
                hash: "#".concat(u || "")
              }
            } catch(t) {}
            return e
          }
        }]),
        t
      } (),
      Ai = function() {
        function e() {
          po(this, e)
        }
        return vo(e, null, [{
          key: "getUAInfo",
          value: function() {
            var e, n, r, o, i, a = Yo.userAgent,
            s = Ho.href;
            return a.match(/android/i) ? e = "android": a.match(/(ipad|iphone|ipod).*os\s([\d_]+)/i) && (e = "ios"),
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) && (n = !0),
            r = /dp\/com\.dianping/.test(a) ? "dpapp": /MeituanGroup/i.test(a) ? "mtgroup": /MicroMessenger/.test(a) ? "miniprogram" === t.__wxjs_environment || /[\?&]mina_name=([\w|-]+)/i.test(s) ? "mina": "weixin": /QQ\/([\d\.]+)/.test(a) ? "qq": "browser",
            /\.(dianping|dpfile)\.com/i.test(s) ? (o = "dianping", i = "product") : /\.51ping\.com/i.test(s) ? (o = "dianping", i = "test") : /test(.+)\.meituan\.(com|net)/i.test(s) ? (o = "meituan", i = "test") : /\.meituan\.(com|net)/i.test(s) && (o = "meituan", i = "product"),
            {
              platform: e,
              isMobile: n,
              system: r,
              brand: o,
              env: i
            }
          }
        }]),
        e
      } (),
      Ti = "$PIKE_",
      xi = Ti,
      _i = Ti,
      Ii = function() {
        return !! Yo.cookieEnabled
      };
      var Ci = Ti,
      Ni = 864e5;
      function Li(t, e, n, r, o) {
        if (ui(t) || (t = {}), ui(t[e]) || (t[e] = {}), ti(r)) return delete t[e][n],
        Object.keys(t[e]).length <= 0 && delete t[e],
        t;
        var i = {};
        return Fo(o) && (i.expires = o),
        t[e][n] = ni({
          value: r
        },
        i),
        t
      }
      function Mi(t, e) {
        return $o(t) ? 0 === t.indexOf(e) ? t: "".concat(e).concat(t.toUpperCase()) : null
      }
      var ji = function() {
        function t(e, n, r) {
          po(this, t),
          this.bizId = e,
          this.env = n,
          this.prefix = r || Ci
        }
        return vo(t, [{
          key: "validate",
          value: function(t, e, n) {
            var r = this.env,
            o = this.bizId;
            return function(t) {
              if (ui(t)) {
                var e = t.expires;
                if (Fo(e) && Date.now() > e) return ! 0
              }
              return ! 1
            } (e = (e = function(t) {
              try {
                $o(t) && (t = JSON.parse(t))
              } catch(t) {}
              return t
            } (e)) && e[o] && e[o][r]) ? (this.remove(t, n), null) : e ? e.value: null
          }
        },
        {
          key: "query",
          value: function(t, e) {
            var n = this,
            r = (this.env, this.bizId);
            if (!r || !this.isSupportStorage()) return e ? Promise.resolve(null) : null;
            var o = Mi(t, this.prefix);
            return Pi(o) ? e ? Promise.resolve(null) : null: e ? this.queryAsync(o).then((function(o) {
              return n.validate(t, o, r, e)
            })) : this.validate(t, this.querySync(o), r, e)
          }
        },
        {
          key: "remove",
          value: function(t, e) {
            this.update(t, void 0, e)
          }
        },
        {
          key: "clear",
          value: function(t, e) {
            var n = this,
            r = t.map((function(t) {
              return n.remove(t, e)
            }));
            return ! e || Promise.all(r).then((function() {
              return ! 0
            }))
          }
        },
        {
          key: "update",
          value: function(t, e, n, r) {
            var o = this,
            i = this.env,
            a = this.bizId;
            if (!a || !i || !this.isSupportStorage()) return n ? Promise.resolve(null) : null;
            var s = Mi(t, this.prefix);
            return Pi(s) ? n ? Promise.resolve(null) : null: (fi(r) && r ? r = Date.now() + Ni: Fo(r) && (r = Date.now() + r), n ? new Promise((function(t, n) {
              o.queryAsync(s).then((function(c) {
                o.updateAsync(s, Li(c, a, i, e, r)).then((function(e) {
                  return t(e)
                })).
                catch((function(t) {
                  return n(t)
                }))
              })).
              catch((function(t) {
                return n(t)
              }))
            })) : this.updateSync(s, Li(this.querySync(s), a, i, e, r)))
          }
        },
        {
          key: "isSupportStorage",
          value: function() {
            return ! 0
          }
        },
        {
          key: "querySync",
          value: function(t) {}
        },
        {
          key: "updateSync",
          value: function(t, e) {}
        },
        {
          key: "queryAsync",
          value: function(t) {
            return Promise.resolve(this.querySync(t))
          }
        },
        {
          key: "updateAsync",
          value: function(t, e) {
            return Promise.resolve(this.updateSync(t, e))
          }
        }]),
        t
      } ();
      var Bi = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          return po(this, n),
          e.apply(this, arguments)
        }
        return vo(n, [{
          key: "isSupportStorage",
          value: function() {
            return Yo.cookieEnabled
          }
        },
        {
          key: "querySync",
          value: function(t) {
            return e = t,
            n = Go.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)")),
            Pi(n) ? null: unescape(n[2]);
            var e, n
          }
        }, {
          key: "updateSync",
          value: function(t, e) {
            var n = e.value,
            r = e.expires;
            return delete e.expires,
            function(t, e, n) {
              var r = null;
              Fo(n) && (r = new Date(n)),
              Go.cookie = t + "=" + escape(e) + (r ? ";expires=" + r.toGMTString() : ";")
            } (t, JSON.stringify(n), r),
            n
          }
        }]),
        n
      } (ji),
      Di = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          var t;
          po(this, n);
          for (var r = arguments.length,
          o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
          return Oo(go(t = e.call.apply(e, [this].concat(o))), "data", {}),
          t
        }
        return vo(n, [{
          key: "isSupportStorage",
          value: function() {
            return ! 0
          }
        },
        {
          key: "querySync",
          value: function(t) {
            return this.data[t]
          }
        },
        {
          key: "updateSync",
          value: function(t, e) {
            return this.data[t] = e,
            e
          }
        }]),
        n
      } (ji),
      Ui = function(t) {
        return Array.isArray(t)
      },
      Fi = function() {
        function t() {
          po(this, t)
        }
        return vo(t, null, [{
          key: "encode",
          value: function(t) {
            return Si.fromByteArray(t)
          }
        },
        {
          key: "decode",
          value: function(t) {
            return Si.toByteArray(t)
          }
        }]),
        t
      } ();
      function zi(t) {
        return function(t) {
          for (var e = "",
          n = 0; n < 4 * t.length; n += 3) for (var r = (t[n >> 2] >> n % 4 * 8 & 255) << 16 | (t[n + 1 >> 2] >> (n + 1) % 4 * 8 & 255) << 8 | t[n + 2 >> 2] >> (n + 2) % 4 * 8 & 255, o = 0; o < 4; o++) 8 * n + 6 * o > 32 * t.length ? e += "=": e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(r >> 6 * (3 - o) & 63);
          return e
        } (function(t, e) {
          t[e >> 5] |= 128 << e % 32,
          t[14 + (e + 64 >>> 9 << 4)] = e;
          for (var n = 1732584193,
          r = -271733879,
          o = -1732584194,
          i = 271733878,
          a = 0; a < t.length; a += 16) {
            var s = n,
            c = r,
            u = o,
            f = i;
            n = Vi(n, r, o, i, t[a + 0], 7, -680876936),
            i = Vi(i, n, r, o, t[a + 1], 12, -389564586),
            o = Vi(o, i, n, r, t[a + 2], 17, 606105819),
            r = Vi(r, o, i, n, t[a + 3], 22, -1044525330),
            n = Vi(n, r, o, i, t[a + 4], 7, -176418897),
            i = Vi(i, n, r, o, t[a + 5], 12, 1200080426),
            o = Vi(o, i, n, r, t[a + 6], 17, -1473231341),
            r = Vi(r, o, i, n, t[a + 7], 22, -45705983),
            n = Vi(n, r, o, i, t[a + 8], 7, 1770035416),
            i = Vi(i, n, r, o, t[a + 9], 12, -1958414417),
            o = Vi(o, i, n, r, t[a + 10], 17, -42063),
            r = Vi(r, o, i, n, t[a + 11], 22, -1990404162),
            n = Vi(n, r, o, i, t[a + 12], 7, 1804603682),
            i = Vi(i, n, r, o, t[a + 13], 12, -40341101),
            o = Vi(o, i, n, r, t[a + 14], 17, -1502002290),
            r = Vi(r, o, i, n, t[a + 15], 22, 1236535329),
            n = qi(n, r, o, i, t[a + 1], 5, -165796510),
            i = qi(i, n, r, o, t[a + 6], 9, -1069501632),
            o = qi(o, i, n, r, t[a + 11], 14, 643717713),
            r = qi(r, o, i, n, t[a + 0], 20, -373897302),
            n = qi(n, r, o, i, t[a + 5], 5, -701558691),
            i = qi(i, n, r, o, t[a + 10], 9, 38016083),
            o = qi(o, i, n, r, t[a + 15], 14, -660478335),
            r = qi(r, o, i, n, t[a + 4], 20, -405537848),
            n = qi(n, r, o, i, t[a + 9], 5, 568446438),
            i = qi(i, n, r, o, t[a + 14], 9, -1019803690),
            o = qi(o, i, n, r, t[a + 3], 14, -187363961),
            r = qi(r, o, i, n, t[a + 8], 20, 1163531501),
            n = qi(n, r, o, i, t[a + 13], 5, -1444681467),
            i = qi(i, n, r, o, t[a + 2], 9, -51403784),
            o = qi(o, i, n, r, t[a + 7], 14, 1735328473),
            r = qi(r, o, i, n, t[a + 12], 20, -1926607734),
            n = Gi(n, r, o, i, t[a + 5], 4, -378558),
            i = Gi(i, n, r, o, t[a + 8], 11, -2022574463),
            o = Gi(o, i, n, r, t[a + 11], 16, 1839030562),
            r = Gi(r, o, i, n, t[a + 14], 23, -35309556),
            n = Gi(n, r, o, i, t[a + 1], 4, -1530992060),
            i = Gi(i, n, r, o, t[a + 4], 11, 1272893353),
            o = Gi(o, i, n, r, t[a + 7], 16, -155497632),
            r = Gi(r, o, i, n, t[a + 10], 23, -1094730640),
            n = Gi(n, r, o, i, t[a + 13], 4, 681279174),
            i = Gi(i, n, r, o, t[a + 0], 11, -358537222),
            o = Gi(o, i, n, r, t[a + 3], 16, -722521979),
            r = Gi(r, o, i, n, t[a + 6], 23, 76029189),
            n = Gi(n, r, o, i, t[a + 9], 4, -640364487),
            i = Gi(i, n, r, o, t[a + 12], 11, -421815835),
            o = Gi(o, i, n, r, t[a + 15], 16, 530742520),
            r = Gi(r, o, i, n, t[a + 2], 23, -995338651),
            n = Ki(n, r, o, i, t[a + 0], 6, -198630844),
            i = Ki(i, n, r, o, t[a + 7], 10, 1126891415),
            o = Ki(o, i, n, r, t[a + 14], 15, -1416354905),
            r = Ki(r, o, i, n, t[a + 5], 21, -57434055),
            n = Ki(n, r, o, i, t[a + 12], 6, 1700485571),
            i = Ki(i, n, r, o, t[a + 3], 10, -1894986606),
            o = Ki(o, i, n, r, t[a + 10], 15, -1051523),
            r = Ki(r, o, i, n, t[a + 1], 21, -2054922799),
            n = Ki(n, r, o, i, t[a + 8], 6, 1873313359),
            i = Ki(i, n, r, o, t[a + 15], 10, -30611744),
            o = Ki(o, i, n, r, t[a + 6], 15, -1560198380),
            r = Ki(r, o, i, n, t[a + 13], 21, 1309151649),
            n = Ki(n, r, o, i, t[a + 4], 6, -145523070),
            i = Ki(i, n, r, o, t[a + 11], 10, -1120210379),
            o = Ki(o, i, n, r, t[a + 2], 15, 718787259),
            r = Ki(r, o, i, n, t[a + 9], 21, -343485551),
            n = Wi(n, s),
            r = Wi(r, c),
            o = Wi(o, u),
            i = Wi(i, f)
          }
          return Array(n, r, o, i)
        } (function(t) {
          for (var e = Array(), n = 0; n < 8 * t.length; n += 8) e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << n % 32;
          return e
        } (t), 8 * t.length))
      }
      function Ji(t, e, n, r, o, i) {
        return Wi((a = Wi(Wi(e, t), Wi(r, i))) << (s = o) | a >>> 32 - s, n);
        var a, s
      }
      function Vi(t, e, n, r, o, i, a) {
        return Ji(e & n | ~e & r, t, e, o, i, a)
      }
      function qi(t, e, n, r, o, i, a) {
        return Ji(e & r | n & ~r, t, e, o, i, a)
      }
      function Gi(t, e, n, r, o, i, a) {
        return Ji(e ^ n ^ r, t, e, o, i, a)
      }
      function Ki(t, e, n, r, o, i, a) {
        return Ji(n ^ (e | ~r), t, e, o, i, a)
      }
      function Wi(t, e) {
        var n = (65535 & t) + (65535 & e);
        return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
      }
      var Yi = null,
      Hi = function() {
        function t() {
          po(this, t),
          Oo(this, "data", {}),
          this.sequence = 0,
          this.lastTime = 0,
          this.beginTime = 1514736e6,
          this.mask = [170, 251, 252, 253],
          this.lastToken = "",
          this.lastTokenBytes = []
        }
        return vo(t, [{
          key: "generate",
          value: function() {
            var t = Date.now();
            this.lastTime == t ? this.sequence++:this.sequence = 0,
            this.lastTime = t,
            t -= this.beginTime;
            var e = new Array(6);
            return e[0] |= t / 4294967296 & 127,
            e[1] |= t >> 24 & 255,
            e[2] |= t >> 16 & 255,
            e[3] |= t >> 8 & 255,
            e[4] |= 255 & t,
            e[5] |= 255 & this.sequence,
            Fi.encode(e)
          }
        },
        {
          key: "makeGlobalUnique",
          value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.seed;
            if (!e) return t;
            if (e != this.lastToken) {
              this.lastTokenBytes = Fi.decode(e.substring(0, 16));
              for (var n = 0; n < 12; n++) this.lastTokenBytes[n] ^= 255 & this.mask[n % 4];
              this.lastToken = e
            }
            return Fi.encode(this.lastTokenBytes) + t
          }
        },
        {
          key: "getShorthand",
          value: function(t) {
            return t ? t.substring(16) : t
          }
        },
        {
          key: "getGlobal",
          value: function(t, e) {
            if (e) {
              for (var n = Fi.decode(e.substring(0, 16)), r = 0; r < 12; r++) n[r] ^= 255 & this.mask[r % 4];
              return Fi.encode(n) + t
            }
            return t
          }
        },
        {
          key: "seed",
          set: function(t) {
            void 0 !== t && (this.data.seed = t)
          },
          get: function() {
            return this.data.seed || "".concat(Date.now()).concat(Math.random())
          }
        }], [{
          key: "getInstance",
          value: function() {
            return Yi || (Yi = new t),
            Yi
          }
        }]),
        t
      } (),
      Qi = "5d6db287-84b8-46a7-9bcf-14242de3c139",
      Xi = null,
      $i = function() {
        function t(e, n) {
          po(this, t),
          Oo(this, "options", {}),
          this.options = {
            identity: e,
            desc: n
          }
        }
        return vo(t, [{
          key: "generate",
          value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.identity,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.desc;
            if (!t) throw new Error("random should be not null.");
            return zi(e + n + t + Qi)
          }
        },
        {
          key: "identity",
          set: function(t) {
            if (void 0 !== t) return this.options.identity = t
          },
          get: function() {
            return this.options.identity
          }
        },
        {
          key: "desc",
          set: function(t) {
            if (void 0 !== t) return this.options.desc = t
          },
          get: function() {
            return this.options.desc
          }
        }], [{
          key: "getInstance",
          value: function() {
            return Xi || (Xi = new t),
            Xi
          }
        }]),
        t
      } ();
      function Zi(t) {
        if (t) return function(t) {
          for (var e in Zi.prototype) t[e] = Zi.prototype[e];
          return t
        } (t)
      }
      function ta(t) {
        return function(t) {
          if (Array.isArray(t)) return zo(t)
        } (t) ||
        function(t) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
        } (t) || Jo(t) ||
        function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        } ()
      }
      function ea() {
        return (ea = Object.assign ||
        function(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
          }
          return t
        }).apply(this, arguments)
      }
      function na(t, e, n) {
        return (na = ko() ? Reflect.construct: function(t, e, n) {
          var r = [null];
          r.push.apply(r, e);
          var o = new(Function.bind.apply(t, r));
          return n && mo(o, n.prototype),
          o
        }).apply(null, arguments)
      }
      function ra(t) {
        var e = "function" == typeof Map ? new Map: void 0;
        return (ra = function(t) {
          if (null === t || !
          function(t) {
            return - 1 !== Function.toString.call(t).indexOf("[native code]")
          } (t)) return t;
          if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
          if (void 0 !== e) {
            if (e.has(t)) return e.get(t);
            e.set(t, n)
          }
          function n() {
            return na(t, arguments, wo(this).constructor)
          }
          return n.prototype = Object.create(t.prototype, {
            constructor: {
              value: n,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }),
          mo(n, t)
        })(t)
      }
      function oa(t, e) {
        if (null == t) return {};
        var n, r, o = function(t, e) {
          if (null == t) return {};
          var n, r, o = {},
          i = Object.keys(t);
          for (r = 0; r < i.length; r++) n = i[r],
          e.indexOf(n) >= 0 || (o[n] = t[n]);
          return o
        } (t, e);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(t);
          for (r = 0; r < i.length; r++) n = i[r],
          e.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(t, n) && (o[n] = t[n])
        }
        return o
      }
      Zi.prototype.on = Zi.prototype.addEventListener = function(t, e) {
        return this._callbacks = this._callbacks || {},
        (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
        this
      },
      Zi.prototype.once = function(t, e) {
        function n() {
          this.off(t, n),
          e.apply(this, arguments)
        }
        return n.fn = e,
        this.on(t, n),
        this
      },
      Zi.prototype.off = Zi.prototype.removeListener = Zi.prototype.removeAllListeners = Zi.prototype.removeEventListener = function(t, e) {
        if (this._callbacks = this._callbacks || {},
        0 == arguments.length) return this._callbacks = {},
        this;
        var n, r = this._callbacks["$" + t];
        if (!r) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + t],
        this;
        for (var o = 0; o < r.length; o++) if ((n = r[o]) === e || n.fn === e) {
          r.splice(o, 1);
          break
        }
        return 0 === r.length && delete this._callbacks["$" + t],
        this
      },
      Zi.prototype.emit = function(t) {
        this._callbacks = this._callbacks || {};
        for (var e = new Array(arguments.length - 1), n = this._callbacks["$" + t], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        if (n) {
          r = 0;
          for (var o = (n = n.slice(0)).length; r < o; ++r) n[r].apply(this, e)
        }
        return this
      },
      Zi.prototype.listeners = function(t) {
        return this._callbacks = this._callbacks || {},
        this._callbacks["$" + t] || []
      },
      Zi.prototype.hasListeners = function(t) {
        return !! this.listeners(t).length
      };
      var ia = aa;
      function aa(t) {
        t = t || {},
        this.ms = t.min || 100,
        this.max = t.max || 1e4,
        this.factor = t.factor || 2,
        this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter: 0,
        this.attempts = 0
      }
      aa.prototype.duration = function() {
        var t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var e = Math.random(),
          n = Math.floor(e * this.jitter * t);
          t = 0 == (1 & Math.floor(10 * e)) ? t - n: t + n
        }
        return 0 | Math.min(t, this.max)
      },
      aa.prototype.reset = function() {
        this.attempts = 0
      },
      aa.prototype.setMin = function(t) {
        this.ms = t
      },
      aa.prototype.setMax = function(t) {
        this.max = t
      },
      aa.prototype.setJitter = function(t) {
        this.jitter = t
      };
      var sa = "initial",
      ca = "start",
      ua = "pending",
      fa = "routing",
      la = "connecting",
      ha = "routerFailed",
      pa = "connectFailed",
      da = "connected",
      ya = "ready",
      va = "closed",
      ga = "revoked",
      ma = "disconnected",
      ba = "restarting",
      wa = "reconnecting",
      ka = "sleep",
      Sa = "sleepEnd",
      Ea = "routingInRouterMachine",
      Oa = "routeContextInRouterMachine",
      Pa = "routeHookInRouterMachine",
      Ra = "routeStorageInRouterMachine",
      Aa = "routeLBInRouterMachine",
      Ta = "routeWhiteListInRouterMachine",
      xa = "routeFailedInRouterMachine",
      _a = "routedInRouterMachine",
      Ia = "closedInRouterMachine",
      Ca = "revokedInRouterMachine",
      Na = "openingInConnectionMachine",
      La = "openedInConnectionMachine",
      Ma = "openFailedInConnectionMachine",
      ja = "openTimeoutInConnectionMachine",
      Ba = "loginInConnectionMachine",
      Da = "loginFailedInConnectionMachine",
      Ua = "loginTimeoutInConnectionMachine",
      Fa = "loginDeniedInConnectionMachine",
      za = "readyInConnectionMachine",
      Ja = "restartedInConnectionMachine",
      Va = "disconnectedInConnectionMachine",
      qa = "closedInConnectionMachine",
      Ga = "revokedInConnectionMachine",
      Ka = "pendingInRoomMachine",
      Wa = "waitingInRoomMachine",
      Ya = "joiningInRoomMachine",
      Ha = "joinTimeoutInRoomMachine",
      Qa = "joinFailedInRoomMachine",
      Xa = "pullingInRoomMachine",
      $a = "pullTimeoutInRoomMachine",
      Za = "pullFailedInRoomMachine",
      ts = "sleepInRoomMachine",
      es = "quitingInRoomMachine",
      ns = "quitTimeoutInRoomMachine",
      rs = "quitFailedInRoomMachine",
      os = "closedInRoomMachine",
      is = "revokedInRoomMachine",
      as = "start",
      ss = "route",
      cs = "routed",
      us = "route_failed",
      fs = "compete",
      ls = "competed",
      hs = "compete_failed",
      ps = "login",
      ds = "login_timeout",
      ys = "login_deny",
      vs = "update",
      gs = "wakeup",
      ms = "disconnect",
      bs = "close",
      ws = "revoke",
      ks = "restart",
      Ss = "join",
      Es = "pull",
      Os = "quit",
      Ps = "roomWakeup",
      Rs = {
        pingInterval: 5e3,
        pingTimout: 11e3,
        timeout: 6e3,
        ackTimeout: 3e3,
        pollingTimeout: 1e3,
        coolingTimeOfRoom: 100,
        coolingTimeOfReconnection: 1,
        maxCoolingTimeOfReconnection: 3e3,
        maxRetriesOfReconnection: 1,
        maxRetriesOfMessage: 1,
        maxParallelSockets: 1,
        minAliveDuration: 3e3
      },
      As = function() {
        function t() {
          po(this, t),
          Oo(this, "logger", console_),
          Oo(this, "data", {})
        }
        return vo(t, [{
          key: "execute",
          value: function(t, e) {
            if ($o(t) && Do(this[t])) try {
              for (var n = arguments.length,
              r = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) r[o - 2] = arguments[o];
              return this[t].apply(this, [e].concat(r))
            } catch(t) {
              this.logger.error(t)
            }
            return null
          }
        },
        {
          key: "service",
          get: function() {
            return this.data.service
          },
          set: function(t) {
            this.data.service = t
          }
        }]),
        t
      } (),
      Ts = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          return po(this, n),
          e.apply(this, arguments)
        }
        return vo(n, [{
          key: "execute",
          value: function(t, e) {
            if ($o(t) && Do(this[t])) {
              var n = null;
              try {
                for (var r = arguments.length,
                o = new Array(r > 2 ? r - 2 : 0), i = 2; i < r; i++) o[i - 2] = arguments[i];
                n = this[t].apply(this, [e].concat(o))
              } catch(t) {
                return this.logger.error(t),
                Promise.reject(t)
              }
              return n instanceof Promise ? n: Promise.resolve(n)
            }
            return Promise.reject("")
          }
        }]),
        n
      } (As),
      xs = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          return po(this, n),
          e.apply(this, arguments)
        }
        return n
      } (As),
      _s = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 400),
          Oo(go(r), "message", "登录鉴权超时。"),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      Is = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t, r, o, i) {
          var a;
          return po(this, n),
          Oo(go(a = e.call(this, t, r, o)), "code", 403),
          Oo(go(a), "message", "登录鉴权被拒绝。"),
          Oo(go(a), "data", null),
          a.message = t,
          a.data = i,
          a
        }
        return n
      } (ra(Error)),
      Cs = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 20),
          Oo(go(r), "message", "超时。"),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      Ns = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 50),
          Oo(go(r), "message", "初始化失败。"),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      Ls = function() {
        return (Ls = Object.assign ||
        function(t) {
          for (var e, n = 1,
          r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t
        }).apply(this, arguments)
      };
      function Ms(t, e) {
        var n = {};
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
          var o = 0;
          for (r = Object.getOwnPropertySymbols(t); o < r.length; o++) e.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[o]) && (n[r[o]] = t[r[o]])
        }
        return n
      }
      function js(t) {
        var e = "function" == typeof Symbol && t[Symbol.iterator],
        n = 0;
        return e ? e.call(t) : {
          next: function() {
            return t && n >= t.length && (t = void 0),
            {
              value: t && t[n++],
              done: !t
            }
          }
        }
      }
      function Bs(t, e) {
        var n = "function" == typeof Symbol && t[Symbol.iterator];
        if (!n) return t;
        var r, o, i = n.call(t),
        a = [];
        try {
          for (; (void 0 === e || e-->0) && !(r = i.next()).done;) a.push(r.value)
        } catch(t) {
          o = {
            error: t
          }
        } finally {
          try {
            r && !r.done && (n = i.
            return) && n.call(i)
          } finally {
            if (o) throw o.error
          }
        }
        return a
      }
      function Ds() {
        for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(Bs(arguments[e]));
        return t
      }
      var Us = {};
      function Fs(t) {
        return Object.keys(t)
      }
      function zs(t, e, n) {
        void 0 === n && (n = ".");
        var r = qs(t, n),
        o = qs(e, n);
        return ic(o) ? !!ic(r) && o === r: ic(r) ? r in o: Fs(r).every((function(t) {
          return t in o && zs(r[t], o[t])
        }))
      }
      function Js(t) {
        try {
          return ic(t) || "number" == typeof t ? "" + t: t.type
        } catch(t) {
          throw new Error("Events must be strings or objects with a string event.type property.")
        }
      }
      function Vs(t, e) {
        try {
          return rc(t) ? t: t.toString().split(e)
        } catch(e) {
          throw new Error("'" + t + "' is not a valid state path.")
        }
      }
      function qs(t, e) {
        return "object" === u(n = t) && "value" in n && "context" in n && "event" in n && "_event" in n ? t.value: rc(t) ? Gs(t) : "string" != typeof t ? t: Gs(Vs(t, e));
        var n
      }
      function Gs(t) {
        if (1 === t.length) return t[0];
        for (var e = {},
        n = e,
        r = 0; r < t.length - 1; r++) r === t.length - 2 ? n[t[r]] = t[r + 1] : (n[t[r]] = {},
        n = n[t[r]]);
        return e
      }
      function Ks(t, e) {
        for (var n = {},
        r = Fs(t), o = 0; o < r.length; o++) {
          var i = r[o];
          n[i] = e(t[i], i, t, o)
        }
        return n
      }
      function Ws(t, e, n) {
        var r, o, i = {};
        try {
          for (var a = js(Fs(t)), s = a.next(); ! s.done; s = a.next()) {
            var c = s.value,
            u = t[c];
            n(u) && (i[c] = e(u, c, t))
          }
        } catch(t) {
          r = {
            error: t
          }
        } finally {
          try {
            s && !s.done && (o = a.
            return) && o.call(a)
          } finally {
            if (r) throw r.error
          }
        }
        return i
      }
      var Ys = function(t) {
        return function(e) {
          var n, r, o = e;
          try {
            for (var i = js(t), a = i.next(); ! a.done; a = i.next()) {
              o = o[a.value]
            }
          } catch(t) {
            n = {
              error: t
            }
          } finally {
            try {
              a && !a.done && (r = i.
              return) && r.call(i)
            } finally {
              if (n) throw n.error
            }
          }
          return o
        }
      };
      function Hs(t) {
        return t ? ic(t) ? [[t]] : Qs(Fs(t).map((function(e) {
          var n = t[e];
          return "string" == typeof n || n && Object.keys(n).length ? Hs(t[e]).map((function(t) {
            return [e].concat(t)
          })) : [[e]]
        }))) : [[]]
      }
      function Qs(t) {
        var e;
        return (e = []).concat.apply(e, Ds(t))
      }
      function Xs(t) {
        return rc(t) ? t: [t]
      }
      function $s(t) {
        return void 0 === t ? [] : Xs(t)
      }
      function Zs(t, e, n) {
        var r, o;
        if (oc(t)) return t(e, n.data);
        var i = {};
        try {
          for (var a = js(Object.keys(t)), s = a.next(); ! s.done; s = a.next()) {
            var c = s.value,
            u = t[c];
            oc(u) ? i[c] = u(e, n.data) : i[c] = u
          }
        } catch(t) {
          r = {
            error: t
          }
        } finally {
          try {
            s && !s.done && (o = a.
            return) && o.call(a)
          } finally {
            if (r) throw r.error
          }
        }
        return i
      }
      function tc(t) {
        return t instanceof Promise || !(null === t || !oc(t) && "object" !== u(t) || !oc(t.then))
      }
      function ec(t, e) {
        var n, r, o = Bs([[], []], 2),
        i = o[0],
        a = o[1];
        try {
          for (var s = js(t), c = s.next(); ! c.done; c = s.next()) {
            var u = c.value;
            e(u) ? i.push(u) : a.push(u)
          }
        } catch(t) {
          n = {
            error: t
          }
        } finally {
          try {
            c && !c.done && (r = s.
            return) && r.call(s)
          } finally {
            if (n) throw n.error
          }
        }
        return [i, a]
      }
      function nc(t, e) {
        return Ks(t.states, (function(t, n) {
          if (t) {
            var r = (ic(e) ? void 0 : e[n]) || (t ? t.current: void 0);
            if (r) return {
              current: r,
              states: nc(t, r)
            }
          }
        }))
      }
      function rc(t) {
        return Array.isArray(t)
      }
      function oc(t) {
        return "function" == typeof t
      }
      function ic(t) {
        return "string" == typeof t
      }
      function ac(t, e) {
        if (t) return ic(t) ? {
          type: "xstate.guard",
          name: t,
          predicate: e ? e[t] : void 0
        }: oc(t) ? {
          type: "xstate.guard",
          name: t.name,
          predicate: t
        }: t
      }
      function sc(t) {
        try {
          return "subscribe" in t && oc(t.subscribe)
        } catch(t) {
          return ! 1
        }
      }
      var cc = function() {
        return "function" == typeof Symbol && Symbol.observable || "@@observable"
      } ();
      function uc(t) {
        try {
          return "__xstatenode" in t
        } catch(t) {
          return ! 1
        }
      }
      var fc, lc, hc = function() {
        var t = 0;
        return function() {
          return (++t).toString(16)
        }
      } ();
      function pc(t, e) {
        return ic(t) || "number" == typeof t ? Ls({
          type: t
        },
        e) : t
      }
      function dc(t, e) {
        if (!ic(t) && "$$type" in t && "scxml" === t.$$type) return t;
        var n = pc(t);
        return Ls({
          name: n.type,
          data: n,
          $$type: "scxml",
          type: "external"
        },
        e)
      }
      function yc(t, e) {
        return Xs(e).map((function(e) {
          return void 0 === e || "string" == typeof e || uc(e) ? {
            target: e,
            event: t
          }: Ls(Ls({},
          e), {
            event: t
          })
        }))
      }
      function vc(t, e, n, r, o) {
        var i = t.options.guards,
        a = {
          state: o,
          cond: e,
          _event: r
        };
        if ("xstate.guard" === e.type) return e.predicate(n, r.data, a);
        var s = i[e.type];
        if (!s) throw new Error("Guard '" + e.type + "' is not implemented on machine '" + t.id + "'.");
        return s(n, r.data, a)
      }
      function gc(t) {
        return "string" == typeof t ? {
          type: t
        }: t
      } !
      function(t) {
        t.Start = "xstate.start",
        t.Stop = "xstate.stop",
        t.Raise = "xstate.raise",
        t.Send = "xstate.send",
        t.Cancel = "xstate.cancel",
        t.NullEvent = "",
        t.Assign = "xstate.assign",
        t.After = "xstate.after",
        t.DoneState = "done.state",
        t.DoneInvoke = "done.invoke",
        t.Log = "xstate.log",
        t.Init = "xstate.init",
        t.Invoke = "xstate.invoke",
        t.ErrorExecution = "error.execution",
        t.ErrorCommunication = "error.communication",
        t.ErrorPlatform = "error.platform",
        t.ErrorCustom = "xstate.error",
        t.Update = "xstate.update",
        t.Pure = "xstate.pure",
        t.Choose = "xstate.choose"
      } (fc || (fc = {})),
      function(t) {
        t.Parent = "#_parent",
        t.Internal = "#_internal"
      } (lc || (lc = {}));
      var mc = fc.Start,
      bc = fc.Stop,
      wc = fc.Raise,
      kc = fc.Send,
      Sc = fc.Cancel,
      Ec = fc.NullEvent,
      Oc = fc.Assign,
      Pc = (fc.After, fc.DoneState, fc.Log),
      Rc = fc.Init,
      Ac = fc.Invoke,
      Tc = (fc.ErrorExecution, fc.ErrorPlatform),
      xc = fc.ErrorCustom,
      _c = fc.Update,
      Ic = fc.Choose,
      Cc = fc.Pure,
      Nc = dc({
        type: Rc
      });
      function Lc(t, e) {
        return e && e[t] || void 0
      }
      function Mc(t, e) {
        var n;
        if (ic(t) || "number" == typeof t) {
          var r = Lc(t, e);
          n = oc(r) ? {
            type: t,
            exec: r
          }: r || {
            type: t,
            exec: void 0
          }
        } else if (oc(t)) n = {
          type: t.name || t.toString(),
          exec: t
        };
        else {
          if (oc(r = Lc(t.type, e))) n = Ls(Ls({},
          t), {
            exec: r
          });
          else if (r) {
            var o = r.type || t.type;
            n = Ls(Ls(Ls({},
            r), t), {
              type: o
            })
          } else n = t
        }
        return Object.defineProperty(n, "toString", {
          value: function() {
            return n.type
          },
          enumerable: !1,
          configurable: !0
        }),
        n
      }
      var jc = function(t, e) {
        return t ? (rc(t) ? t: [t]).map((function(t) {
          return Mc(t, e)
        })) : []
      };
      function Bc(t) {
        var e = Mc(t);
        return Ls(Ls({
          id: ic(t) ? t: e.id
        },
        e), {
          type: e.type
        })
      }
      function Dc(t) {
        return ic(t) ? {
          type: wc,
          event: t
        }: Uc(t, {
          to: lc.Internal
        })
      }
      function Uc(t, e) {
        return {
          to: e ? e.to: void 0,
          type: kc,
          event: oc(t) ? t: pc(t),
          delay: e ? e.delay: void 0,
          id: e && void 0 !== e.id ? e.id: oc(t) ? t.name: Js(t)
        }
      }
      function Fc(t, e) {
        return Uc(t, Ls(Ls({},
        e), {
          to: lc.Parent
        }))
      }
      var zc = function(t) {
        return {
          type: Oc,
          assignment: t
        }
      };
      function Jc(t, e) {
        var n = fc.DoneState + "." + t,
        r = {
          type: n,
          data: e,
          toString: function() {
            return n
          }
        };
        return r
      }
      function Vc(t, e) {
        var n = fc.DoneInvoke + "." + t,
        r = {
          type: n,
          data: e,
          toString: function() {
            return n
          }
        };
        return r
      }
      function qc(t, e) {
        var n = fc.ErrorPlatform + "." + t,
        r = {
          type: n,
          data: e,
          toString: function() {
            return n
          }
        };
        return r
      }
      function Gc(t, e, n, r, o) {
        var i = Bs(ec(o, (function(t) {
          return t.type === Oc
        })), 2),
        a = i[0],
        s = i[1],
        c = a.length ?
        function(t, e, n, r) {
          return t ? n.reduce((function(t, n) {
            var o, i, a = n.assignment,
            s = {
              state: r,
              action: n,
              _event: e
            },
            c = {};
            if (oc(a)) c = a(t, e.data, s);
            else try {
              for (var u = js(Fs(a)), f = u.next(); ! f.done; f = u.next()) {
                var l = f.value,
                h = a[l];
                c[l] = oc(h) ? h(t, e.data, s) : h
              }
            } catch(t) {
              o = {
                error: t
              }
            } finally {
              try {
                f && !f.done && (i = u.
                return) && i.call(u)
              } finally {
                if (o) throw o.error
              }
            }
            return ea({},
            t, c)
          }), t) : t
        } (n, r, a, e) : n;
        return [Qs(s.map((function(n) {
          var o;
          switch (n.type) {
          case wc:
            return {
              type:
              wc,
              _event: dc(n.event)
            };
          case kc:
            return function(t, e, n, r) {
              var o, i = {
                _event: n
              },
              a = dc(oc(t.event) ? t.event(e, n.data, i) : t.event);
              if (ic(t.delay)) {
                var s = r && r[t.delay];
                o = oc(s) ? s(e, n.data, i) : s
              } else o = oc(t.delay) ? t.delay(e, n.data, i) : t.delay;
              var c = oc(t.to) ? t.to(e, n.data, i) : t.to;
              return Ls(Ls({},
              t), {
                to: c,
                _event: a,
                event: a.data,
                delay: o
              })
            } (n, c, r, t.options.delays);
          case Pc:
            return function(t, e, n) {
              return Ls(Ls({},
              t), {
                value: ic(t.expr) ? t.expr: t.expr(e, n.data, {
                  _event: n
                })
              })
            } (n, c, r);
          case Ic:
            if (! (a = null === (o = n.conds.find((function(n) {
              var o = ac(n.cond, t.options.guards);
              return ! o || vc(t, o, c, r, e)
            }))) || void 0 === o ? void 0 : o.actions)) return [];
            var i = Gc(t, e, c, r, jc($s(a), t.options.actions));
            return c = i[1],
            i[0];
          case Cc:
            var a;
            if (! (a = n.get(c, r.data))) return [];
            i = Gc(t, e, c, r, jc($s(a), t.options.actions));
            return c = i[1],
            i[0];
          case bc:
            return function(t, e, n) {
              var r = oc(t.activity) ? t.activity(e, n.data) : t.activity,
              o = "string" == typeof r ? {
                id: r
              }: r;
              return {
                type: fc.Stop,
                activity: o
              }
            } (n, c, r);
          default:
            return Mc(n, t.options.actions)
          }
        }))), c]
      }
      var Kc = function(t) {
        return "atomic" === t.type || "final" === t.type
      };
      function Wc(t) {
        return Fs(t.states).map((function(e) {
          return t.states[e]
        }))
      }
      function Yc(t) {
        var e = [t];
        return Kc(t) ? e: e.concat(Qs(Wc(t).map(Yc)))
      }
      function Hc(t, e) {
        var n, r, o, i, a, s, c, u, f = Qc(new Set(t)),
        l = new Set(e);
        try {
          for (var h = js(l), p = h.next(); ! p.done; p = h.next()) for (var d = (E = p.value).parent; d && !l.has(d);) l.add(d),
          d = d.parent
        } catch(t) {
          n = {
            error: t
          }
        } finally {
          try {
            p && !p.done && (r = h.
            return) && r.call(h)
          } finally {
            if (n) throw n.error
          }
        }
        var y = Qc(l);
        try {
          for (var v = js(l), g = v.next(); ! g.done; g = v.next()) {
            if ("compound" !== (E = g.value).type || y.get(E) && y.get(E).length) {
              if ("parallel" === E.type) try {
                for (var m = (a = void 0, js(Wc(E))), b = m.next(); ! b.done; b = m.next()) {
                  var w = b.value;
                  "history" !== w.type && (l.has(w) || (l.add(w), f.get(w) ? f.get(w).forEach((function(t) {
                    return l.add(t)
                  })) : w.initialStateNodes.forEach((function(t) {
                    return l.add(t)
                  }))))
                }
              } catch(t) {
                a = {
                  error: t
                }
              } finally {
                try {
                  b && !b.done && (s = m.
                  return) && s.call(m)
                } finally {
                  if (a) throw a.error
                }
              }
            } else f.get(E) ? f.get(E).forEach((function(t) {
              return l.add(t)
            })) : E.initialStateNodes.forEach((function(t) {
              return l.add(t)
            }))
          }
        } catch(t) {
          o = {
            error: t
          }
        } finally {
          try {
            g && !g.done && (i = v.
            return) && i.call(v)
          } finally {
            if (o) throw o.error
          }
        }
        try {
          for (var k = js(l), S = k.next(); ! S.done; S = k.next()) {
            var E;
            for (d = (E = S.value).parent; d && !l.has(d);) l.add(d),
            d = d.parent
          }
        } catch(t) {
          c = {
            error: t
          }
        } finally {
          try {
            S && !S.done && (u = k.
            return) && u.call(k)
          } finally {
            if (c) throw c.error
          }
        }
        return l
      }
      function Qc(t) {
        var e, n, r = new Map;
        try {
          for (var o = js(t), i = o.next(); ! i.done; i = o.next()) {
            var a = i.value;
            r.has(a) || r.set(a, []),
            a.parent && (r.has(a.parent) || r.set(a.parent, []), r.get(a.parent).push(a))
          }
        } catch(t) {
          e = {
            error: t
          }
        } finally {
          try {
            i && !i.done && (n = o.
            return) && n.call(o)
          } finally {
            if (e) throw e.error
          }
        }
        return r
      }
      function Xc(t, e) {
        return function t(e, n) {
          var r = n.get(e);
          if (!r) return {};
          if ("compound" === e.type) {
            var o = r[0];
            if (!o) return {};
            if (Kc(o)) return o.key
          }
          var i = {};
          return r.forEach((function(e) {
            i[e.key] = t(e, n)
          })),
          i
        } (t, Qc(Hc([t], e)))
      }
      function $c(t, e) {
        return Array.isArray(t) ? t.some((function(t) {
          return t === e
        })) : t instanceof Set && t.has(e)
      }
      function Zc(t, e) {
        return "compound" === e.type ? Wc(e).some((function(e) {
          return "final" === e.type && $c(t, e)
        })) : "parallel" === e.type && Wc(e).every((function(e) {
          return Zc(t, e)
        }))
      }
      var tu = function() {
        function t(t) {
          var e = this;
          this.actions = [],
          this.activities = Us,
          this.meta = {},
          this.events = [],
          this.value = t.value,
          this.context = t.context,
          this._event = t._event,
          this._sessionid = t._sessionid,
          this.event = this._event.data,
          this.historyValue = t.historyValue,
          this.history = t.history,
          this.actions = t.actions || [],
          this.activities = t.activities || Us,
          this.meta = t.meta || {},
          this.events = t.events || [],
          this.matches = this.matches.bind(this),
          this.toStrings = this.toStrings.bind(this),
          this.configuration = t.configuration,
          this.transitions = t.transitions,
          this.children = t.children,
          this.done = !!t.done,
          Object.defineProperty(this, "nextEvents", {
            get: function() {
              return t = e.configuration,
              Qs(Ds(new Set(t.map((function(t) {
                return t.ownEvents
              })))));
              var t
            }
          })
        }
        return t.from = function(e, n) {
          return e instanceof t ? e.context !== n ? new t({
            value: e.value,
            context: n,
            _event: e._event,
            _sessionid: null,
            historyValue: e.historyValue,
            history: e.history,
            actions: [],
            activities: e.activities,
            meta: {},
            events: [],
            configuration: [],
            transitions: [],
            children: {}
          }) : e: new t({
            value: e,
            context: n,
            _event: Nc,
            _sessionid: null,
            historyValue: void 0,
            history: void 0,
            actions: [],
            activities: void 0,
            meta: void 0,
            events: [],
            configuration: [],
            transitions: [],
            children: {}
          })
        },
        t.create = function(e) {
          return new t(e)
        },
        t.inert = function(e, n) {
          if (e instanceof t) {
            if (!e.actions.length) return e;
            var r = Nc;
            return new t({
              value: e.value,
              context: n,
              _event: r,
              _sessionid: null,
              historyValue: e.historyValue,
              history: e.history,
              activities: e.activities,
              configuration: e.configuration,
              transitions: [],
              children: {}
            })
          }
          return t.from(e, n)
        },
        t.prototype.toStrings = function(t, e) {
          var n = this;
          if (void 0 === t && (t = this.value), void 0 === e && (e = "."), ic(t)) return [t];
          var r = Fs(t);
          return r.concat.apply(r, Ds(r.map((function(r) {
            return n.toStrings(t[r], e).map((function(t) {
              return r + e + t
            }))
          }))))
        },
        t.prototype.toJSON = function() {
          this.configuration,
          this.transitions;
          return Ms(this, ["configuration", "transitions"])
        },
        t.prototype.matches = function(t) {
          return zs(t, this.value)
        },
        t
      } (),
      eu = [],
      nu = function(t, e) {
        eu.push(t);
        var n = e(t);
        return eu.pop(),
        n
      };
      function ru(t) {
        return {
          id: t,
          send: function() {},
          subscribe: function() {
            return {
              unsubscribe: function() {}
            }
          },
          toJSON: function() {
            return {
              id: t
            }
          }
        }
      }
      function ou(t, e, n) {
        var r = ru(e);
        return r.deferred = !0,
        uc(t) && (r.state = nu(void 0, (function() {
          return (n ? t.withContext(n) : t).initialState
        }))),
        r
      }
      function iu(t) {
        try {
          return "function" == typeof t.send
        } catch(t) {
          return ! 1
        }
      }
      function au(t) {
        if ("string" == typeof t) {
          var e = {
            type: t,
            toString: function() {
              return t
            }
          };
          return e
        }
        return t
      }
      function su(t) {
        return Ls(Ls({
          type: Ac
        },
        t), {
          toJSON: function() {
            t.onDone,
            t.onError;
            var e = Ms(t, ["onDone", "onError"]);
            return Ls(Ls({},
            e), {
              type: Ac,
              src: au(t.src)
            })
          }
        })
      }
      var cu = {},
      uu = function(t) {
        return "#" === t[0]
      },
      fu = function() {
        function t(e, n, r) {
          var o = this;
          this.config = e,
          this.context = r,
          this.order = -1,
          this.__xstatenode = !0,
          this.__cache = {
            events: void 0,
            relativeValue: new Map,
            initialStateValue: void 0,
            initialState: void 0,
            on: void 0,
            transitions: void 0,
            candidates: {},
            delayedTransitions: void 0
          },
          this.idMap = {},
          this.options = ea({
            actions: {},
            guards: {},
            services: {},
            activities: {},
            delays: {}
          },
          n),
          this.parent = this.options._parent,
          this.key = this.config.key || this.options._key || this.config.id || "(machine)",
          this.machine = this.parent ? this.parent.machine: this,
          this.path = this.parent ? this.parent.path.concat(this.key) : [],
          this.delimiter = this.config.delimiter || (this.parent ? this.parent.delimiter: "."),
          this.id = this.config.id || Ds([this.machine.key], this.path).join(this.delimiter),
          this.version = this.parent ? this.parent.version: this.config.version,
          this.type = this.config.type || (this.config.parallel ? "parallel": this.config.states && Fs(this.config.states).length ? "compound": this.config.history ? "history": "atomic"),
          this.initial = this.config.initial,
          this.states = this.config.states ? Ks(this.config.states, (function(e, n) {
            var r, i = new t(e, {
              _parent: o,
              _key: n
            });
            return ea(o.idMap, Ls(((r = {})[i.id] = i, r), i.idMap)),
            i
          })) : cu;
          var i = 0; !
          function t(e) {
            var n, r;
            e.order = i++;
            try {
              for (var o = js(Wc(e)), a = o.next(); ! a.done; a = o.next()) {
                t(a.value)
              }
            } catch(t) {
              n = {
                error: t
              }
            } finally {
              try {
                a && !a.done && (r = o.
                return) && r.call(o)
              } finally {
                if (n) throw n.error
              }
            }
          } (this),
          this.history = !0 === this.config.history ? "shallow": this.config.history || !1,
          this._transient = !!this.config.always || !!this.config.on && (Array.isArray(this.config.on) ? this.config.on.some((function(t) {
            return "" === t.event
          })) : "" in this.config.on),
          this.strict = !!this.config.strict,
          this.onEntry = $s(this.config.entry || this.config.onEntry).map((function(t) {
            return Mc(t)
          })),
          this.onExit = $s(this.config.exit || this.config.onExit).map((function(t) {
            return Mc(t)
          })),
          this.meta = this.config.meta,
          this.doneData = "final" === this.type ? this.config.data: void 0,
          this.invoke = $s(this.config.invoke).map((function(t, e) {
            var n, r;
            if (uc(t)) return o.machine.options.services = Ls(((n = {})[t.id] = t, n), o.machine.options.services),
            su({
              src: t.id,
              id: t.id
            });
            if (ic(t.src)) return su(Ls(Ls({},
            t), {
              id: t.id || t.src,
              src: t.src
            }));
            if (uc(t.src) || oc(t.src)) {
              var i = o.id + ":invocation[" + e + "]";
              return o.machine.options.services = Ls(((r = {})[i] = t.src, r), o.machine.options.services),
              su(Ls(Ls({
                id: i
              },
              t), {
                src: i
              }))
            }
            var a = t.src;
            return su(Ls(Ls({
              id: a.type
            },
            t), {
              src: a
            }))
          })),
          this.activities = $s(this.config.activities).concat(this.invoke).map((function(t) {
            return Bc(t)
          })),
          this.transition = this.transition.bind(this)
        }
        return t.prototype._init = function() {
          this.__cache.transitions || Yc(this).forEach((function(t) {
            return t.on
          }))
        },
        t.prototype.withConfig = function(e, n) {
          void 0 === n && (n = this.context);
          var r = this.options,
          o = r.actions,
          i = r.activities,
          a = r.guards,
          s = r.services,
          c = r.delays;
          return new t(this.config, {
            actions: Ls(Ls({},
            o), e.actions),
            activities: Ls(Ls({},
            i), e.activities),
            guards: Ls(Ls({},
            a), e.guards),
            services: Ls(Ls({},
            s), e.services),
            delays: Ls(Ls({},
            c), e.delays)
          },
          n)
        },
        t.prototype.withContext = function(e) {
          return new t(this.config, this.options, e)
        },
        Object.defineProperty(t.prototype, "definition", {
          get: function() {
            return {
              id: this.id,
              key: this.key,
              version: this.version,
              context: this.context,
              type: this.type,
              initial: this.initial,
              history: this.history,
              states: Ks(this.states, (function(t) {
                return t.definition
              })),
              on: this.on,
              transitions: this.transitions,
              entry: this.onEntry,
              exit: this.onExit,
              activities: this.activities || [],
              meta: this.meta,
              order: this.order || -1,
              data: this.doneData,
              invoke: this.invoke
            }
          },
          enumerable: !1,
          configurable: !0
        }),
        t.prototype.toJSON = function() {
          return this.definition
        },
        Object.defineProperty(t.prototype, "on", {
          get: function() {
            if (this.__cache.on) return this.__cache.on;
            var t = this.transitions;
            return this.__cache.on = t.reduce((function(t, e) {
              return t[e.eventType] = t[e.eventType] || [],
              t[e.eventType].push(e),
              t
            }), {})
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(t.prototype, "after", {
          get: function() {
            return this.__cache.delayedTransitions || (this.__cache.delayedTransitions = this.getDelayedTransitions(), this.__cache.delayedTransitions)
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(t.prototype, "transitions", {
          get: function() {
            return this.__cache.transitions || (this.__cache.transitions = this.formatTransitions(), this.__cache.transitions)
          },
          enumerable: !1,
          configurable: !0
        }),
        t.prototype.getCandidates = function(t) {
          if (this.__cache.candidates[t]) return this.__cache.candidates[t];
          var e = "" === t,
          n = this.transitions.filter((function(n) {
            var r = n.eventType === t;
            return e ? r: r || "*" === n.eventType
          }));
          return this.__cache.candidates[t] = n,
          n
        },
        t.prototype.getDelayedTransitions = function() {
          var t = this,
          e = this.config.after;
          if (!e) return [];
          var n = function(e, n) {
            var r = function(t, e) {
              var n = e ? "#" + e: "";
              return fc.After + "(" + t + ")" + n
            } (oc(e) ? t.id + ":delay[" + n + "]": e, t.id);
            return t.onEntry.push(Uc(r, {
              delay: e
            })),
            t.onExit.push({
              type: Sc,
              sendId: r
            }),
            r
          };
          return (rc(e) ? e.map((function(t, e) {
            var r = n(t.delay, e);
            return Ls(Ls({},
            t), {
              event: r
            })
          })) : Qs(Fs(e).map((function(t, r) {
            var o = e[t],
            i = ic(o) ? {
              target: o
            }: o,
            a = isNaN( + t) ? t: +t,
            s = n(a, r);
            return $s(i).map((function(t) {
              return Ls(Ls({},
              t), {
                event: s,
                delay: a
              })
            }))
          })))).map((function(e) {
            var n = e.delay;
            return Ls(Ls({},
            t.formatTransition(e)), {
              delay: n
            })
          }))
        },
        t.prototype.getStateNodes = function(t) {
          var e, n = this;
          if (!t) return [];
          var r = t instanceof tu ? t.value: qs(t, this.delimiter);
          if (ic(r)) {
            var o = this.getStateNode(r).initial;
            return void 0 !== o ? this.getStateNodes(((e = {})[r] = o, e)) : [this.states[r]]
          }
          var i = Fs(r);
          return i.map((function(t) {
            return n.getStateNode(t)
          })).concat(i.reduce((function(t, e) {
            var o = n.getStateNode(e).getStateNodes(r[e]);
            return t.concat(o)
          }), []))
        },
        t.prototype.handles = function(t) {
          var e = Js(t);
          return this.events.includes(e)
        },
        t.prototype.resolveState = function(t) {
          var e = Array.from(Hc([], this.getStateNodes(t.value)));
          return new tu(Ls(Ls({},
          t), {
            value: this.resolve(t.value),
            configuration: e
          }))
        },
        t.prototype.transitionLeafNode = function(t, e, n) {
          var r = this.getStateNode(t).next(e, n);
          return r && r.transitions.length ? r: this.next(e, n)
        },
        t.prototype.transitionCompoundNode = function(t, e, n) {
          var r = Fs(t),
          o = this.getStateNode(r[0])._transition(t[r[0]], e, n);
          return o && o.transitions.length ? o: this.next(e, n)
        },
        t.prototype.transitionParallelNode = function(t, e, n) {
          var r, o, i = {};
          try {
            for (var a = js(Fs(t)), s = a.next(); ! s.done; s = a.next()) {
              var c = s.value,
              u = t[c];
              if (u) {
                var f = this.getStateNode(c)._transition(u, e, n);
                f && (i[c] = f)
              }
            }
          } catch(t) {
            r = {
              error: t
            }
          } finally {
            try {
              s && !s.done && (o = a.
              return) && o.call(a)
            } finally {
              if (r) throw r.error
            }
          }
          var l = Fs(i).map((function(t) {
            return i[t]
          })),
          h = Qs(l.map((function(t) {
            return t.transitions
          })));
          if (!l.some((function(t) {
            return t.transitions.length > 0
          }))) return this.next(e, n);
          var p = Qs(l.map((function(t) {
            return t.entrySet
          }))),
          d = Qs(Fs(i).map((function(t) {
            return i[t].configuration
          })));
          return {
            transitions: h,
            entrySet: p,
            exitSet: Qs(l.map((function(t) {
              return t.exitSet
            }))),
            configuration: d,
            source: e,
            actions: Qs(Fs(i).map((function(t) {
              return i[t].actions
            })))
          }
        },
        t.prototype._transition = function(t, e, n) {
          return ic(t) ? this.transitionLeafNode(t, e, n) : 1 === Fs(t).length ? this.transitionCompoundNode(t, e, n) : this.transitionParallelNode(t, e, n)
        },
        t.prototype.next = function(t, e) {
          var n, r, o, i = this,
          a = e.name,
          s = [],
          c = [];
          try {
            for (var u = js(this.getCandidates(a)), f = u.next(); ! f.done; f = u.next()) {
              var l = f.value,
              h = l.cond,
              p = l. in ,
              d = t.context,
              y = !p || (ic(p) && uu(p) ? t.matches(qs(this.getStateNodeById(p).path, this.delimiter)) : zs(qs(p, this.delimiter), Ys(this.path.slice(0, -2))(t.value))),
              v = !1;
              try {
                v = !h || vc(this.machine, h, d, e, t)
              } catch(t) {
                throw new Error("Unable to evaluate guard '" + (h.name || h.type) + "' in transition for event '" + a + "' in state node '" + this.id + "':\n" + t.message)
              }
              if (v && y) {
                void 0 !== l.target && (c = l.target),
                s.push.apply(s, Ds(l.actions)),
                o = l;
                break
              }
            }
          } catch(t) {
            n = {
              error: t
            }
          } finally {
            try {
              f && !f.done && (r = u.
              return) && r.call(u)
            } finally {
              if (n) throw n.error
            }
          }
          if (o) {
            if (!c.length) return {
              transitions: [o],
              entrySet: [],
              exitSet: [],
              configuration: t.value ? [this] : [],
              source: t,
              actions: s
            };
            var g = Qs(c.map((function(e) {
              return i.getRelativeStateNodes(e, t.historyValue)
            }))),
            m = !!o.internal;
            return {
              transitions: [o],
              entrySet: m ? [] : Qs(g.map((function(t) {
                return i.nodesFromChild(t)
              }))),
              exitSet: m ? [] : [this],
              configuration: g,
              source: t,
              actions: s
            }
          }
        },
        t.prototype.nodesFromChild = function(t) {
          if (t.escapes(this)) return [];
          for (var e = [], n = t; n && n !== this;) e.push(n),
          n = n.parent;
          return e.push(this),
          e
        },
        t.prototype.escapes = function(t) {
          if (this === t) return ! 1;
          for (var e = this.parent; e;) {
            if (e === t) return ! 1;
            e = e.parent
          }
          return ! 0
        },
        t.prototype.getActions = function(t, e, n, r) {
          var o, i, a, s, c = Hc([], r ? this.getStateNodes(r.value) : [this]),
          u = t.configuration.length ? Hc(c, t.configuration) : c;
          try {
            for (var f = js(u), l = f.next(); ! l.done; l = f.next()) {
              $c(c, d = l.value) || t.entrySet.push(d)
            }
          } catch(t) {
            o = {
              error: t
            }
          } finally {
            try {
              l && !l.done && (i = f.
              return) && i.call(f)
            } finally {
              if (o) throw o.error
            }
          }
          try {
            for (var h = js(c), p = h.next(); ! p.done; p = h.next()) {
              var d;
              $c(u, d = p.value) && !$c(t.exitSet, d.parent) || t.exitSet.push(d)
            }
          } catch(t) {
            a = {
              error: t
            }
          } finally {
            try {
              p && !p.done && (s = h.
              return) && s.call(h)
            } finally {
              if (a) throw a.error
            }
          }
          t.source || (t.exitSet = [], t.entrySet.push(this));
          var y = Qs(t.entrySet.map((function(r) {
            var o = [];
            if ("final" !== r.type) return o;
            var i = r.parent;
            if (!i.parent) return o;
            o.push(Jc(r.id, r.doneData), Jc(i.id, r.doneData ? Zs(r.doneData, e, n) : void 0));
            var a = i.parent;
            return "parallel" === a.type && Wc(a).every((function(e) {
              return Zc(t.configuration, e)
            })) && o.push(Jc(a.id)),
            o
          })));
          t.exitSet.sort((function(t, e) {
            return e.order - t.order
          })),
          t.entrySet.sort((function(t, e) {
            return t.order - e.order
          }));
          var v = new Set(t.entrySet),
          g = new Set(t.exitSet),
          m = Bs([Qs(Array.from(v).map((function(t) {
            return Ds(t.activities.map((function(t) {
              return function(t) {
                var e = Bc(t);
                return {
                  type: fc.Start,
                  activity: e,
                  exec: void 0
                }
              } (t)
            })), t.onEntry)
          }))).concat(y.map(Dc)), Qs(Array.from(g).map((function(t) {
            return Ds(t.onExit, t.activities.map((function(t) {
              return function(t) {
                var e = oc(t) ? t: Bc(t);
                return {
                  type: fc.Stop,
                  activity: e,
                  exec: void 0
                }
              } (t)
            })))
          })))], 2),
          b = m[0],
          w = m[1];
          return jc(w.concat(t.actions).concat(b), this.machine.options.actions)
        },
        t.prototype.transition = function(t, e, n) {
          void 0 === t && (t = this.initialState);
          var r, o, i = dc(e);
          if (t instanceof tu) r = void 0 === n ? t: this.resolveState(tu.from(t, n));
          else {
            var a = ic(t) ? this.resolve(Gs(this.getResolvedPath(t))) : this.resolve(t),
            s = n || this.machine.context;
            r = this.resolveState(tu.from(a, s))
          }
          if (this.strict && !this.events.includes(i.name) && (o = i.name, !/^(done|error)\./.test(o))) throw new Error("Machine '" + this.id + "' does not accept event '" + i.name + "'");
          var c = this._transition(r.value, r, i) || {
            transitions: [],
            configuration: [],
            entrySet: [],
            exitSet: [],
            source: r,
            actions: []
          },
          u = Hc([], this.getStateNodes(r.value)),
          f = c.configuration.length ? Hc(u, c.configuration) : u;
          return c.configuration = Ds(f),
          this.resolveTransition(c, r, i)
        },
        t.prototype.resolveRaisedTransition = function(t, e, n) {
          var r, o = t.actions;
          return (t = this.transition(t, e))._event = n,
          t.event = n.data,
          (r = t.actions).unshift.apply(r, Ds(o)),
          t
        },
        t.prototype.resolveTransition = function(t, e, n, r) {
          var o, i, a = this;
          void 0 === n && (n = Nc),
          void 0 === r && (r = this.machine.context);
          var s = t.configuration,
          c = !e || t.transitions.length > 0 ? Xc(this.machine, s) : void 0,
          f = e ? e.historyValue ? e.historyValue: t.source ? this.machine.historyValue(e.value) : void 0 : void 0,
          l = e ? e.context: r,
          h = this.getActions(t, l, n, e),
          p = e ? Ls({},
          e.activities) : {};
          try {
            for (var d = js(h), y = d.next(); ! y.done; y = d.next()) {
              var v = y.value;
              v.type === mc ? p[v.activity.id || v.activity.type] = v: v.type === bc && (p[v.activity.id || v.activity.type] = !1)
            }
          } catch(t) {
            o = {
              error: t
            }
          } finally {
            try {
              y && !y.done && (i = d.
              return) && i.call(d)
            } finally {
              if (o) throw o.error
            }
          }
          var g, m, b = Bs(Gc(this, e, l, n, h), 2),
          w = b[0],
          k = b[1],
          S = Bs(ec(w, (function(t) {
            return t.type === wc || t.type === kc && t.to === lc.Internal
          })), 2),
          E = S[0],
          O = S[1],
          P = w.filter((function(t) {
            var e;
            return t.type === mc && (null === (e = t.activity) || void 0 === e ? void 0 : e.type) === Ac
          })).reduce((function(t, e) {
            return t[e.activity.id] = function(t, e, n, r) {
              var o, i = gc(t.src),
              a = null === (o = null == e ? void 0 : e.options.services) || void 0 === o ? void 0 : o[i.type],
              s = t.data ? Zs(t.data, n, r) : void 0,
              c = a ? ou(a, t.id, s) : ru(t.id);
              return c.meta = t,
              c
            } (e.activity, a.machine, k, n),
            t
          }), e ? Ls({},
          e.children) : {}),
          R = c ? t.configuration: e ? e.configuration: [],
          A = R.reduce((function(t, e) {
            return void 0 !== e.meta && (t[e.id] = e.meta),
            t
          }), {}),
          T = Zc(R, this),
          x = new tu({
            value: c || e.value,
            context: k,
            _event: n,
            _sessionid: e ? e._sessionid: null,
            historyValue: c ? f ? (g = f, m = c, {
              current: m,
              states: nc(g, m)
            }) : void 0 : e ? e.historyValue: void 0,
            history: !c || t.source ? e: void 0,
            actions: c ? O: [],
            activities: c ? p: e ? e.activities: {},
            meta: c ? A: e ? e.meta: void 0,
            events: [],
            configuration: R,
            transitions: t.transitions,
            children: P,
            done: T
          }),
          _ = l !== k;
          x.changed = n.name === _c || _;
          var I = x.history;
          if (I && delete I.history, !c) return x;
          var C = x;
          if (!T) for ((this._transient || s.some((function(t) {
            return t._transient
          }))) && (C = this.resolveRaisedTransition(C, {
            type: Ec
          },
          n)); E.length;) {
            var N = E.shift();
            C = this.resolveRaisedTransition(C, N._event, n)
          }
          var L = C.changed || (I ? !!C.actions.length || _ || u(I.value) !== u(C.value) || !
          function t(e, n) {
            if (e === n) return ! 0;
            if (void 0 === e || void 0 === n) return ! 1;
            if (ic(e) || ic(n)) return e === n;
            var r = Fs(e),
            o = Fs(n);
            return r.length === o.length && r.every((function(r) {
              return t(e[r], n[r])
            }))
          } (C.value, I.value) : void 0);
          return C.changed = L,
          C.historyValue = x.historyValue,
          C.history = I,
          C
        },
        t.prototype.getStateNode = function(t) {
          if (uu(t)) return this.machine.getStateNodeById(t);
          if (!this.states) throw new Error("Unable to retrieve child state '" + t + "' from '" + this.id + "'; no child states exist.");
          var e = this.states[t];
          if (!e) throw new Error("Child state '" + t + "' does not exist on '" + this.id + "'");
          return e
        },
        t.prototype.getStateNodeById = function(t) {
          var e = uu(t) ? t.slice("#".length) : t;
          if (e === this.id) return this;
          var n = this.machine.idMap[e];
          if (!n) throw new Error("Child state node '#" + e + "' does not exist on machine '" + this.id + "'");
          return n
        },
        t.prototype.getStateNodeByPath = function(t) {
          if ("string" == typeof t && uu(t)) try {
            return this.getStateNodeById(t.slice(1))
          } catch(t) {}
          for (var e = Vs(t, this.delimiter).slice(), n = this; e.length;) {
            var r = e.shift();
            if (!r.length) break;
            n = n.getStateNode(r)
          }
          return n
        },
        t.prototype.resolve = function(t) {
          var e, n = this;
          if (!t) return this.initialStateValue || cu;
          switch (this.type) {
          case "parallel":
            return Ks(this.initialStateValue, (function(e, r) {
              return e ? n.getStateNode(r).resolve(t[r] || e) : cu
            }));
          case "compound":
            if (ic(t)) {
              var r = this.getStateNode(t);
              return "parallel" === r.type || "compound" === r.type ? ((e = {})[t] = r.initialStateValue, e) : t
            }
            return Fs(t).length ? Ks(t, (function(t, e) {
              return t ? n.getStateNode(e).resolve(t) : cu
            })) : this.initialStateValue || {};
          default:
            return t || cu
          }
        },
        t.prototype.getResolvedPath = function(t) {
          if (uu(t)) {
            var e = this.machine.idMap[t.slice("#".length)];
            if (!e) throw new Error("Unable to find state node '" + t + "'");
            return e.path
          }
          return Vs(t, this.delimiter)
        },
        Object.defineProperty(t.prototype, "initialStateValue", {
          get: function() {
            var t, e;
            if (this.__cache.initialStateValue) return this.__cache.initialStateValue;
            if ("parallel" === this.type) e = Ws(this.states, (function(t) {
              return t.initialStateValue || cu
            }), (function(t) {
              return ! ("history" === t.type)
            }));
            else if (void 0 !== this.initial) {
              if (!this.states[this.initial]) throw new Error("Initial state '" + this.initial + "' not found on '" + this.key + "'");
              e = Kc(this.states[this.initial]) ? this.initial: ((t = {})[this.initial] = this.states[this.initial].initialStateValue, t)
            }
            return this.__cache.initialStateValue = e,
            this.__cache.initialStateValue
          },
          enumerable: !1,
          configurable: !0
        }),
        t.prototype.getInitialState = function(t, e) {
          var n = this.getStateNodes(t);
          return this.resolveTransition({
            configuration: n,
            entrySet: n,
            exitSet: [],
            transitions: [],
            source: void 0,
            actions: []
          },
          void 0, void 0, e)
        },
        Object.defineProperty(t.prototype, "initialState", {
          get: function() {
            this._init();
            var t = this.initialStateValue;
            if (!t) throw new Error("Cannot retrieve initial state from simple state '" + this.id + "'.");
            return this.getInitialState(t)
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(t.prototype, "target", {
          get: function() {
            var t;
            if ("history" === this.type) {
              var e = this.config;
              t = ic(e.target) && uu(e.target) ? Gs(this.machine.getStateNodeById(e.target).path.slice(this.path.length - 1)) : e.target
            }
            return t
          },
          enumerable: !1,
          configurable: !0
        }),
        t.prototype.getRelativeStateNodes = function(t, e, n) {
          return void 0 === n && (n = !0),
          n ? "history" === t.type ? t.resolveHistory(e) : t.initialStateNodes: [t]
        },
        Object.defineProperty(t.prototype, "initialStateNodes", {
          get: function() {
            var t = this;
            return Kc(this) ? [this] : "compound" !== this.type || this.initial ? Qs(Hs(this.initialStateValue).map((function(e) {
              return t.getFromRelativePath(e)
            }))) : [this]
          },
          enumerable: !1,
          configurable: !0
        }),
        t.prototype.getFromRelativePath = function(t) {
          if (!t.length) return [this];
          var e = Bs(t),
          n = e[0],
          r = e.slice(1);
          if (!this.states) throw new Error("Cannot retrieve subPath '" + n + "' from node with no states");
          var o = this.getStateNode(n);
          if ("history" === o.type) return o.resolveHistory();
          if (!this.states[n]) throw new Error("Child state '" + n + "' does not exist on '" + this.id + "'");
          return this.states[n].getFromRelativePath(r)
        },
        t.prototype.historyValue = function(t) {
          if (Fs(this.states).length) return {
            current: t || this.initialStateValue,
            states: Ws(this.states, (function(e, n) {
              if (!t) return e.historyValue();
              var r = ic(t) ? void 0 : t[n];
              return e.historyValue(r || e.initialStateValue)
            }), (function(t) {
              return ! t.history
            }))
          }
        },
        t.prototype.resolveHistory = function(t) {
          var e = this;
          if ("history" !== this.type) return [this];
          var n = this.parent;
          if (!t) {
            var r = this.target;
            return r ? Qs(Hs(r).map((function(t) {
              return n.getFromRelativePath(t)
            }))) : n.initialStateNodes
          }
          var o, i, a = (o = n.path, i = "states",
          function(t) {
            var e, n, r = t;
            try {
              for (var a = js(o), s = a.next(); ! s.done; s = a.next()) {
                var c = s.value;
                r = r[i][c]
              }
            } catch(t) {
              e = {
                error: t
              }
            } finally {
              try {
                s && !s.done && (n = a.
                return) && n.call(a)
              } finally {
                if (e) throw e.error
              }
            }
            return r
          })(t).current;
          return ic(a) ? [n.getStateNode(a)] : Qs(Hs(a).map((function(t) {
            return "deep" === e.history ? n.getFromRelativePath(t) : [n.states[t[0]]]
          })))
        },
        Object.defineProperty(t.prototype, "stateIds", {
          get: function() {
            var t = this,
            e = Qs(Fs(this.states).map((function(e) {
              return t.states[e].stateIds
            })));
            return [this.id].concat(e)
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(t.prototype, "events", {
          get: function() {
            var t, e, n, r;
            if (this.__cache.events) return this.__cache.events;
            var o = this.states,
            i = new Set(this.ownEvents);
            if (o) try {
              for (var a = js(Fs(o)), s = a.next(); ! s.done; s = a.next()) {
                var c = o[s.value];
                if (c.states) try {
                  for (var u = (n = void 0, js(c.events)), f = u.next(); ! f.done; f = u.next()) {
                    var l = f.value;
                    i.add("" + l)
                  }
                } catch(t) {
                  n = {
                    error: t
                  }
                } finally {
                  try {
                    f && !f.done && (r = u.
                    return) && r.call(u)
                  } finally {
                    if (n) throw n.error
                  }
                }
              }
            } catch(e) {
              t = {
                error: e
              }
            } finally {
              try {
                s && !s.done && (e = a.
                return) && e.call(a)
              } finally {
                if (t) throw t.error
              }
            }
            return this.__cache.events = Array.from(i)
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(t.prototype, "ownEvents", {
          get: function() {
            var t = new Set(this.transitions.filter((function(t) {
              return ! (!t.target && !t.actions.length && t.internal)
            })).map((function(t) {
              return t.eventType
            })));
            return Array.from(t)
          },
          enumerable: !1,
          configurable: !0
        }),
        t.prototype.resolveTarget = function(t) {
          var e = this;
          if (void 0 !== t) return t.map((function(t) {
            if (!ic(t)) return t;
            var n = t[0] === e.delimiter;
            if (n && !e.parent) return e.getStateNodeByPath(t.slice(1));
            var r = n ? e.key + t: t;
            if (!e.parent) return e.getStateNodeByPath(r);
            try {
              return e.parent.getStateNodeByPath(r)
            } catch(t) {
              throw new Error("Invalid transition definition for state node '" + e.id + "':\n" + t.message)
            }
          }))
        },
        t.prototype.formatTransition = function(t) {
          var e = this,
          n = function(t) {
            if (void 0 !== t && "" !== t) return $s(t)
          } (t.target),
          r = "internal" in t ? t.internal: !n || n.some((function(t) {
            return ic(t) && t[0] === e.delimiter
          })),
          o = this.machine.options.guards,
          i = this.resolveTarget(n),
          a = Ls(Ls({},
          t), {
            actions: jc($s(t.actions)),
            cond: ac(t.cond, o),
            target: i,
            source: this,
            internal: r,
            eventType: t.event,
            toJSON: function() {
              return Ls(Ls({},
              a), {
                target: a.target ? a.target.map((function(t) {
                  return "#" + t.id
                })) : void 0,
                source: "#" + e.id
              })
            }
          });
          return a
        },
        t.prototype.formatTransitions = function() {
          var t, e, n, r = this;
          if (this.config.on) if (Array.isArray(this.config.on)) n = this.config.on;
          else {
            var o = this.config.on,
            i = o["*"],
            a = void 0 === i ? [] : i,
            s = Ms(o, [(u("*"), "*")]);
            n = Qs(Fs(s).map((function(t) {
              return yc(t, s[t])
            })).concat(yc("*", a)))
          } else n = [];
          var c = this.config.always ? yc("", this.config.always) : [],
          f = this.config.onDone ? yc(String(Jc(this.id)), this.config.onDone) : [],
          l = Qs(this.invoke.map((function(t) {
            var e = [];
            return t.onDone && e.push.apply(e, Ds(yc(String(Vc(t.id)), t.onDone))),
            t.onError && e.push.apply(e, Ds(yc(String(qc(t.id)), t.onError))),
            e
          }))),
          h = this.after,
          p = Qs(Ds(f, l, n, c).map((function(t) {
            return $s(t).map((function(t) {
              return r.formatTransition(t)
            }))
          })));
          try {
            for (var d = js(h), y = d.next(); ! y.done; y = d.next()) {
              var v = y.value;
              p.push(v)
            }
          } catch(e) {
            t = {
              error: e
            }
          } finally {
            try {
              y && !y.done && (e = d.
              return) && e.call(d)
            } finally {
              if (t) throw t.error
            }
          }
          return p
        },
        t
      } ();
      function lu(t, e, n) {
        void 0 === n && (n = t.context);
        var r = "function" == typeof n ? n() : n;
        return new fu(t, e, r)
      }
      var hu, pu = {
        deferEvents: !1
      },
      du = function() {
        function t(t) {
          this.processingEvent = !1,
          this.queue = [],
          this.initialized = !1,
          this.options = Ls(Ls({},
          pu), t)
        }
        return t.prototype.initialize = function(t) {
          if (this.initialized = !0, t) {
            if (!this.options.deferEvents) return void this.schedule(t);
            this.process(t)
          }
          this.flushEvents()
        },
        t.prototype.schedule = function(t) {
          if (this.initialized && !this.processingEvent) {
            if (0 !== this.queue.length) throw new Error("Event queue should be empty when it is not processing events");
            this.process(t),
            this.flushEvents()
          } else this.queue.push(t)
        },
        t.prototype.clear = function() {
          this.queue = []
        },
        t.prototype.flushEvents = function() {
          for (var t = this.queue.shift(); t;) this.process(t),
          t = this.queue.shift()
        },
        t.prototype.process = function(t) {
          this.processingEvent = !0;
          try {
            t()
          } catch(t) {
            throw this.clear(),
            t
          } finally {
            this.processingEvent = !1
          }
        },
        t
      } (),
      yu = new Map,
      vu = 0,
      gu = function() {
        return "x:" + vu++
      },
      mu = function(t, e) {
        return yu.set(t, e),
        t
      },
      bu = function(t) {
        return yu.get(t)
      },
      wu = function(t) {
        yu.delete(t)
      },
      ku = {
        sync: !1,
        autoForward: !1
      }; !
      function(t) {
        t[t.NotStarted = 0] = "NotStarted",
        t[t.Running = 1] = "Running",
        t[t.Stopped = 2] = "Stopped"
      } (hu || (hu = {}));
      var Su = function() {
        function e(t, n) {
          var r = this;
          void 0 === n && (n = e.defaultOptions),
          this.machine = t,
          this.scheduler = new du,
          this.delayedEventsMap = {},
          this.listeners = new Set,
          this.contextListeners = new Set,
          this.stopListeners = new Set,
          this.doneListeners = new Set,
          this.eventListeners = new Set,
          this.sendListeners = new Set,
          this.initialized = !1,
          this.status = hu.NotStarted,
          this.children = new Map,
          this.forwardTo = new Set,
          this.init = this.start,
          this.send = function(t, e) {
            if (rc(t)) return r.batch(t),
            r.state;
            var n = dc(pc(t, e));
            if (r.status === hu.Stopped) return r.state;
            if (r.status !== hu.Running && !r.options.deferEvents) throw new Error('Event "' + n.name + '" was sent to uninitialized service "' + r.machine.id + '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: ' + JSON.stringify(n.data));
            return r.scheduler.schedule((function() {
              r.forward(n);
              var t = r.nextState(n);
              r.update(t, n)
            })),
            r._state
          },
          this.sendTo = function(t, e) {
            var n = r.parent && (e === lc.Parent || r.parent.id === e),
            o = n ? r.parent: iu(e) ? e: r.children.get(e) || bu(e);
            if (o)"machine" in o ? o.send(Ls(Ls({},
            t), {
              name: t.name === xc ? "" + qc(r.id) : t.name,
              origin: r.sessionId
            })) : o.send(t.data);
            else if (!n) throw new Error("Unable to send event to child '" + e + "' from service '" + r.id + "'.")
          };
          var o = Ls(Ls({},
          e.defaultOptions), n),
          i = o.clock,
          a = o.logger,
          s = o.parent,
          c = o.id,
          u = void 0 !== c ? c: t.id;
          this.id = u,
          this.logger = a,
          this.clock = i,
          this.parent = s,
          this.options = o,
          this.scheduler = new du({
            deferEvents: this.options.deferEvents
          }),
          this.sessionId = gu()
        }
        return Object.defineProperty(e.prototype, "initialState", {
          get: function() {
            var t = this;
            return this._initialState ? this._initialState: nu(this, (function() {
              return t._initialState = t.machine.initialState,
              t._initialState
            }))
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, "state", {
          get: function() {
            return this._state
          },
          enumerable: !1,
          configurable: !0
        }),
        e.prototype.execute = function(t, e) {
          // if (t.actions.length == 0)
          //   console_.warn("executing", t.toStrings(), e);
          var n, r;
          try {
            for (var o = js(t.actions), i = o.next(); ! i.done; i = o.next()) {
              var a = i.value;
              this.exec(a, t, e)
            }
          } catch(t) {
            n = {
              error: t
            }
          } finally {
            try {
              i && !i.done && (r = o.
              return) && r.call(o)
            } finally {
              if (n) throw n.error
            }
          }
        },
        e.prototype.update = function(t, e) {
          var n, r, o, i, a, s, c, u, f = this;
          if (t._sessionid = this.sessionId, this._state = t, this.options.execute && this.execute(this.state), this.children.forEach((function(t) {
            f.state.children[t.id] = t
          })), this.devTools && this.devTools.send(e.data, t), t.event) try {
            for (var l = js(this.eventListeners), h = l.next(); ! h.done; h = l.next()) { (0, h.value)(t.event)
            }
          } catch(t) {
            n = {
              error: t
            }
          } finally {
            try {
              h && !h.done && (r = l.
              return) && r.call(l)
            } finally {
              if (n) throw n.error
            }
          }
          try {
            for (var p = js(this.listeners), d = p.next(); ! d.done; d = p.next()) { (0, d.value)(t, t.event)
            }
          } catch(t) {
            o = {
              error: t
            }
          } finally {
            try {
              d && !d.done && (i = p.
              return) && i.call(p)
            } finally {
              if (o) throw o.error
            }
          }
          try {
            for (var y = js(this.contextListeners), v = y.next(); ! v.done; v = y.next()) { (0, v.value)(this.state.context, this.state.history ? this.state.history.context: void 0)
            }
          } catch(t) {
            a = {
              error: t
            }
          } finally {
            try {
              v && !v.done && (s = y.
              return) && s.call(y)
            } finally {
              if (a) throw a.error
            }
          }
          var g = Zc(t.configuration || [], this.machine);
          if (this.state.configuration && g) {
            var m = t.configuration.find((function(t) {
              return "final" === t.type && t.parent === f.machine
            })),
            b = m && m.doneData ? Zs(m.doneData, t.context, e) : void 0;
            try {
              for (var w = js(this.doneListeners), k = w.next(); ! k.done; k = w.next()) { (0, k.value)(Vc(this.id, b))
              }
            } catch(t) {
              c = {
                error: t
              }
            } finally {
              try {
                k && !k.done && (u = w.
                return) && u.call(w)
              } finally {
                if (c) throw c.error
              }
            }
            this.stop()
          }
        },
        e.prototype.onTransition = function(t) {
          return this.listeners.add(t),
          this.status === hu.Running && t(this.state, this.state.event),
          this
        },
        e.prototype.subscribe = function(t, e, n) {
          var r, o = this;
          if (!t) return {
            unsubscribe: function() {}
          };
          var i = n;
          return "function" == typeof t ? r = t: (r = t.next.bind(t), i = t.complete.bind(t)),
          this.listeners.add(r),
          this.status === hu.Running && r(this.state),
          i && this.onDone(i),
          {
            unsubscribe: function() {
              r && o.listeners.delete(r),
              i && o.doneListeners.delete(i)
            }
          }
        },
        e.prototype.onEvent = function(t) {
          return this.eventListeners.add(t),
          this
        },
        e.prototype.onSend = function(t) {
          return this.sendListeners.add(t),
          this
        },
        e.prototype.onChange = function(t) {
          return this.contextListeners.add(t),
          this
        },
        e.prototype.onStop = function(t) {
          return this.stopListeners.add(t),
          this
        },
        e.prototype.onDone = function(t) {
          return this.doneListeners.add(t),
          this
        },
        e.prototype.off = function(t) {
          return this.listeners.delete(t),
          this.eventListeners.delete(t),
          this.sendListeners.delete(t),
          this.stopListeners.delete(t),
          this.doneListeners.delete(t),
          this.contextListeners.delete(t),
          this
        },
        e.prototype.start = function(t) {
          var e = this;
          if (this.status === hu.Running) return this;
          mu(this.sessionId, this),
          this.initialized = !0,
          this.status = hu.Running;
          var n = void 0 === t ? this.initialState: nu(this, (function() {
            return ! ic(n = t) && "value" in n && "history" in n ? e.machine.resolveState(t) : e.machine.resolveState(tu.from(t, e.machine.context));
            var n
          }));
          return this.options.devTools && this.attachDev(),
          this.scheduler.initialize((function() {
            e.update(n, Nc)
          })),
          this
        },
        e.prototype.stop = function() {
          var t, e, n, r, o, i, a, s, c, u, f = this;
          try {
            for (var l = js(this.listeners), h = l.next(); ! h.done; h = l.next()) {
              var p = h.value;
              this.listeners.delete(p)
            }
          } catch(e) {
            t = {
              error: e
            }
          } finally {
            try {
              h && !h.done && (e = l.
              return) && e.call(l)
            } finally {
              if (t) throw t.error
            }
          }
          try {
            for (var d = js(this.stopListeners), y = d.next(); ! y.done; y = d.next()) { (p = y.value)(),
              this.stopListeners.delete(p)
            }
          } catch(t) {
            n = {
              error: t
            }
          } finally {
            try {
              y && !y.done && (r = d.
              return) && r.call(d)
            } finally {
              if (n) throw n.error
            }
          }
          try {
            for (var v = js(this.contextListeners), g = v.next(); ! g.done; g = v.next()) {
              p = g.value;
              this.contextListeners.delete(p)
            }
          } catch(t) {
            o = {
              error: t
            }
          } finally {
            try {
              g && !g.done && (i = v.
              return) && i.call(v)
            } finally {
              if (o) throw o.error
            }
          }
          try {
            for (var m = js(this.doneListeners), b = m.next(); ! b.done; b = m.next()) {
              p = b.value;
              this.doneListeners.delete(p)
            }
          } catch(t) {
            a = {
              error: t
            }
          } finally {
            try {
              b && !b.done && (s = m.
              return) && s.call(m)
            } finally {
              if (a) throw a.error
            }
          }
          this.state.configuration.forEach((function(t) {
            var e, n;
            try {
              for (var r = js(t.definition.exit), o = r.next(); ! o.done; o = r.next()) {
                var i = o.value;
                f.exec(i, f.state)
              }
            } catch(t) {
              e = {
                error: t
              }
            } finally {
              try {
                o && !o.done && (n = r.
                return) && n.call(r)
              } finally {
                if (e) throw e.error
              }
            }
          })),
          this.children.forEach((function(t) {
            oc(t.stop) && t.stop()
          }));
          try {
            for (var w = js(Fs(this.delayedEventsMap)), k = w.next(); ! k.done; k = w.next()) {
              var S = k.value;
              this.clock.clearTimeout(this.delayedEventsMap[S])
            }
          } catch(t) {
            c = {
              error: t
            }
          } finally {
            try {
              k && !k.done && (u = w.
              return) && u.call(w)
            } finally {
              if (c) throw c.error
            }
          }
          return this.scheduler.clear(),
          this.initialized = !1,
          this.status = hu.Stopped,
          wu(this.sessionId),
          this
        },
        e.prototype.batch = function(t) {
          var e = this;
          if (this.status === hu.NotStarted && this.options.deferEvents);
          else if (this.status !== hu.Running) throw new Error(t.length + ' event(s) were sent to uninitialized service "' + this.machine.id + '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.');
          this.scheduler.schedule((function() {
            var n, r, o = e.state,
            i = !1,
            a = [],
            s = function(t) {
              var n = dc(t);
              e.forward(n),
              o = nu(e, (function() {
                return e.machine.transition(o, n)
              })),
              a.push.apply(a, Ds(o.actions.map((function(t) {
                return n = o,
                r = (e = t).exec,
                Ls(Ls({},
                e), {
                  exec: void 0 !== r ?
                  function() {
                    return r(n.context, n.event, {
                      action: e,
                      state: n,
                      _event: n._event
                    })
                  }: void 0
                });
                var e, n, r
              })))), i = i || !!o.changed
            };
            try {
              for (var c = js(t), u = c.next(); ! u.done; u = c.next()) {
                s(u.value)
              }
            } catch(t) {
              n = {
                error: t
              }
            } finally {
              try {
                u && !u.done && (r = c.
                return) && r.call(c)
              } finally {
                if (n) throw n.error
              }
            }
            o.changed = i,
            o.actions = a,
            e.update(o, dc(t[t.length - 1]))
          }))
        },
        e.prototype.sender = function(t) {
          return this.send.bind(this, t)
        },
        e.prototype.nextState = function(t) {
          var e = this,
          n = dc(t);
          if (0 === n.name.indexOf(Tc) && !this.state.nextEvents.some((function(t) {
            return 0 === t.indexOf(Tc)
          }))) throw n.data.data;
          return nu(this, (function() {
            return e.machine.transition(e.state, n)
          }))
        },
        e.prototype.forward = function(t) {
          var e, n;
          try {
            for (var r = js(this.forwardTo), o = r.next(); ! o.done; o = r.next()) {
              var i = o.value,
              a = this.children.get(i);
              if (!a) throw new Error("Unable to forward event '" + t + "' from interpreter '" + this.id + "' to nonexistant child '" + i + "'.");
              a.send(t)
            }
          } catch(t) {
            e = {
              error: t
            }
          } finally {
            try {
              o && !o.done && (n = r.
              return) && n.call(r)
            } finally {
              if (e) throw e.error
            }
          }
        },
        e.prototype.defer = function(t) {
          var e = this;
          this.delayedEventsMap[t.id] = this.clock.setTimeout((function() {
            t.to ? e.sendTo(t._event, t.to) : e.send(t._event)
          }), t.delay)
        },
        e.prototype.cancel = function(t) {
          this.clock.clearTimeout(this.delayedEventsMap[t]),
          delete this.delayedEventsMap[t]
        },
        e.prototype.exec = function(t, e, n) {
          void 0 === n && (n = this.machine.options.actions);
          var r = e.context,
          o = e._event,
          i = t.exec || Lc(t.type, n),
          a = oc(i) ? i: i ? i.exec: t.exec;
          if (a) try {
            return a(r, o.data, {
              action: t,
              state: this.state,
              _event: o
            })
          } catch(t) {
            throw this.parent && this.parent.send({
              type: "xstate.error",
              data: t
            }),
            t
          }
          switch (t.type) {
          case kc:
            var s = t;
            if ("number" == typeof s.delay) return void this.defer(s);
            s.to ? this.sendTo(s._event, s.to) : this.send(s._event);
            break;
          case Sc:
            this.cancel(t.sendId);
            break;
          case mc:
            var c = t.activity;
            if (!this.state.activities[c.id || c.type]) break;
            if (c.type === fc.Invoke) {
              var u = gc(c.src),
              f = this.machine.options.services ? this.machine.options.services[u.type] : void 0,
              l = c.id,
              h = c.data,
              p = "autoForward" in c ? c.autoForward: !!c.forward;
              if (!f) return;
              var d = h ? Zs(h, r, o) : void 0,
              y = oc(f) ? f(r, o.data, {
                data: d,
                src: u
              }) : f;
              tc(y) ? this.spawnPromise(Promise.resolve(y), l) : oc(y) ? this.spawnCallback(y, l) : sc(y) ? this.spawnObservable(y, l) : uc(y) && this.spawnMachine(d ? y.withContext(d) : y, {
                id: l,
                autoForward: p
              })
            } else this.spawnActivity(c);
            break;
          case bc:
            this.stopChild(t.activity.id);
            break;
          case Pc:
            var v = t.label,
            g = t.value;
            v ? this.logger(v, g) : this.logger(g)
          }
        },
        e.prototype.removeChild = function(t) {
          this.children.delete(t),
          this.forwardTo.delete(t),
          delete this.state.children[t]
        },
        e.prototype.stopChild = function(t) {
          var e = this.children.get(t);
          e && (this.removeChild(t), oc(e.stop) && e.stop())
        },
        e.prototype.spawn = function(t, e, n) {
          if (tc(t)) return this.spawnPromise(Promise.resolve(t), e);
          if (oc(t)) return this.spawnCallback(t, e);
          if (iu(t)) return this.spawnActor(t);
          if (sc(t)) return this.spawnObservable(t, e);
          if (uc(t)) return this.spawnMachine(t, Ls(Ls({},
          n), {
            id: e
          }));
          throw new Error('Unable to spawn entity "' + e + '" of type "' + u(t) + '".')
        },
        e.prototype.spawnMachine = function(t, n) {
          var r = this;
          void 0 === n && (n = {});
          var o = new e(t, Ls(Ls({},
          this.options), {
            parent: this,
            id: n.id || t.id
          })),
          i = Ls(Ls({},
          ku), n);
          i.sync && o.onTransition((function(t) {
            r.send(_c, {
              state: t,
              id: o.id
            })
          }));
          var a = o;
          return this.children.set(o.id, a),
          i.autoForward && this.forwardTo.add(o.id),
          o.onDone((function(t) {
            r.removeChild(o.id),
            r.send(dc(t, {
              origin: o.id
            }))
          })).start(),
          a
        },
        e.prototype.spawnPromise = function(t, e) {
          var n = this,
          r = !1;
          t.then((function(t) {
            r || (n.removeChild(e), n.send(dc(Vc(e, t), {
              origin: e
            })))
          }), (function(t) {
            if (!r) {
              n.removeChild(e);
              var o = qc(e, t);
              try {
                n.send(dc(o, {
                  origin: e
                }))
              } catch(t) {
                n.devTools && n.devTools.send(o, n.state),
                n.machine.strict && n.stop()
              }
            }
          }));
          var o = {
            id: e,
            send: function() {},
            subscribe: function(e, n, r) {
              var o = !1;
              return t.then((function(t) {
                o || (e && e(t), o || r && r())
              }), (function(t) {
                o || n(t)
              })),
              {
                unsubscribe: function() {
                  return o = !0
                }
              }
            },
            stop: function() {
              r = !0
            },
            toJSON: function() {
              return {
                id: e
              }
            }
          };
          return this.children.set(e, o),
          o
        },
        e.prototype.spawnCallback = function(t, e) {
          var n, r = this,
          o = !1,
          i = new Set,
          a = new Set;
          try {
            n = t((function(t) {
              a.forEach((function(e) {
                return e(t)
              })),
              o || r.send(t)
            }), (function(t) {
              i.add(t)
            }))
          } catch(t) {
            this.send(qc(e, t))
          }
          if (tc(n)) return this.spawnPromise(n, e);
          var s = {
            id: e,
            send: function(t) {
              return i.forEach((function(e) {
                return e(t)
              }))
            },
            subscribe: function(t) {
              return a.add(t),
              {
                unsubscribe: function() {
                  a.delete(t)
                }
              }
            },
            stop: function() {
              o = !0,
              oc(n) && n()
            },
            toJSON: function() {
              return {
                id: e
              }
            }
          };
          return this.children.set(e, s),
          s
        },
        e.prototype.spawnObservable = function(t, e) {
          var n = this,
          r = t.subscribe((function(t) {
            n.send(dc(t, {
              origin: e
            }))
          }), (function(t) {
            n.removeChild(e),
            n.send(dc(qc(e, t), {
              origin: e
            }))
          }), (function() {
            n.removeChild(e),
            n.send(dc(Vc(e), {
              origin: e
            }))
          })),
          o = {
            id: e,
            send: function() {},
            subscribe: function(e, n, r) {
              return t.subscribe(e, n, r)
            },
            stop: function() {
              return r.unsubscribe()
            },
            toJSON: function() {
              return {
                id: e
              }
            }
          };
          return this.children.set(e, o),
          o
        },
        e.prototype.spawnActor = function(t) {
          return this.children.set(t.id, t),
          t
        },
        e.prototype.spawnActivity = function(t) {
          var e = this.machine.options && this.machine.options.activities ? this.machine.options.activities[t.type] : void 0;
          if (e) {
            var n = e(this.state.context, t);
            this.spawnEffect(t.id, n)
          }
        },
        e.prototype.spawnEffect = function(t, e) {
          this.children.set(t, {
            id: t,
            send: function() {},
            subscribe: function() {
              return {
                unsubscribe: function() {}
              }
            },
            stop: e || void 0,
            toJSON: function() {
              return {
                id: t
              }
            }
          })
        },
        e.prototype.attachDev = function() {
          if (this.options.devTools && void 0 !== Qo && Qo.__REDUX_DEVTOOLS_EXTENSION__) {
            var t = "object" === u(this.options.devTools) ? this.options.devTools: void 0;
            this.devTools = Qo.__REDUX_DEVTOOLS_EXTENSION__.connect(Ls(Ls({
              name: this.id,
              autoPause: !0,
              stateSanitizer: function(t) {
                return {
                  value: t.value,
                  context: t.context,
                  actions: t.actions
                }
              }
            },
            t), {
              features: Ls({
                jump: !1,
                skip: !1
              },
              t ? t.features: void 0)
            }), this.machine),
            this.devTools.init(this.state)
          }
        },
        e.prototype.toJSON = function() {
          return {
            id: this.id
          }
        },
        e.prototype[cc] = function() {
          return this
        },
        e.defaultOptions = function(t) {
          return {
            execute: !0,
            deferEvents: !0,
            clock: {
              setTimeout: function(e, n) {
                return t.setTimeout.call(null, e, n)
              },
              clearTimeout: function(e) {
                return t.clearTimeout.call(null, e)
              }
            },
            logger: t.console_.log.bind(console_),
            devTools: !1
          }
        } (void 0 !== Qo ? Qo: t),
        e.interpret = Ou,
        e
      } ();
      function Eu(t, e) {
        var n = function(t) {
          return ic(t) ? Ls(Ls({},
          ku), {
            name: t
          }) : Ls(Ls(Ls({},
          ku), {
            name: hc()
          }), t)
        } (e);
        return function(t) {
          return t(eu[eu.length - 1])
        } ((function(e) {
          return e ? e.spawn(t, n.name, n) : ou(t, n.name)
        }))
      }
      function Ou(t, e) {
        return new Su(t, e)
      }
      function Pu(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = e.context,
        r = e.guards,
        o = e.actions,
        i = e.activities,
        a = e.services,
        s = e.delays,
        c = e.state,
        u = e.autoStart,
        f = void 0 === u || u,
        l = oa(e, ["context", "guards", "actions", "activities", "services", "delays", "state", "autoStart"]),
        h = {
          context: n,
          guards: r,
          actions: o,
          activities: i,
          services: a,
          delays: s
        },
        p = t.withConfig(h, ni(ni({},
        t.context), n)),
        d = Ou(p, l),
        y = d.initialized ? d.state || d.initialState: null;
        return d.onTransition((function(t) {
          t.changed && (y = t)
        })),
        f && setTimeout((function() {
          d.start(c ? tu.create(c) : void 0)
        }), 0),
        ea(d.machine.options.actions, o),
        ea(d.machine.options.services, a),
        [function() {
          return y
        },
        d.send, d]
      }
      var Ru = function(t) {
        var e = null;
        switch (t.initial || t.routerEntryState) {
        case Oa:
          e = Pa;
          break;
        case Pa:
          e = Ra;
          break;
        case Ra:
          e = Aa;
          break;
        case Aa:
          e = Ta;
          break;
        case Ta:
          e = xa;
          break;
        default:
          e = Ea
        }
        return e
      },
      Au = function(t, e) {
        var n = e.logger,
        r = e.hooks,
        o = e.actions,
        i = Eu(function(t, e) {
          var n = e.logger,
          r = e.hooks,
          o = e.actions;
          try {
            var i;
            return lu({
              id: "router",
              initial: Ru(t),
              context: ni({
                entryPoints: []
              },
              t),
              on: Oo({},
              ws, Ca),
              states: (i = {},
              Oo(i, Ea, {
                entry: ["onRouting"],
                always: [{
                  target: Pa,
                  cond: "isSkipRouteContext"
                },
                {
                  target: Oa
                }]
              }), Oo(i, Oa, {
                invoke: {
                  src: "routeContext",
                  onDone: {
                    target: _a,
                    actions: [zc({
                      state: function(t) {
                        return Oa
                      }
                    }), "onRouteSucc"]
                  },
                  onError: {
                    target: Pa,
                    actions: "onRouteErr"
                  }
                }
              }), Oo(i, Pa, {
                invoke: {
                  src: "routeHook",
                  onDone: {
                    target: _a,
                    actions: [zc({
                      state: function(t) {
                        return Pa
                      }
                    }), "onRouteSucc"]
                  },
                  onError: {
                    target: Ra,
                    actions: "onRouteErr"
                  }
                }
              }), Oo(i, Ra, {
                invoke: {
                  src: "routeStorage",
                  onDone: {
                    target: _a,
                    actions: [zc({
                      state: function(t) {
                        return Ra
                      }
                    }), "onRouteSucc"]
                  },
                  onError: {
                    target: Aa,
                    actions: "onRouteErr"
                  }
                }
              }), Oo(i, Aa, {
                invoke: {
                  src: "routeLB",
                  onDone: {
                    target: _a,
                    actions: [zc({
                      state: function(t) {
                        return Aa
                      }
                    }), "onRouteSucc"]
                  },
                  onError: {
                    target: Ta,
                    actions: "onRouteErr"
                  }
                }
              }), Oo(i, Ta, {
                invoke: {
                  src: "routeWhiteList",
                  onDone: {
                    target: _a,
                    actions: [zc({
                      state: function(t) {
                        return Ta
                      }
                    }), "onRouteSucc"]
                  },
                  onError: {
                    target: xa,
                    actions: "onRouteErr"
                  }
                }
              }), Oo(i, _a, {
                entry: ["onRoute"],
                always: {
                  actions: [Fc((function(t) {
                    return {
                      type: ss,
                      payload: {
                        state: _a,
                        entryState: t.state,
                        entryPoints: t.entryPoints.slice(0),
                        options: t.options
                      }
                    }
                  }))],
                  target: Ia
                }
              }), Oo(i, xa, {
                entry: ["onRouteFail"],
                always: {
                  actions: [Fc((function(t) {
                    return {
                      type: ss,
                      payload: {
                        state: xa,
                        entryState: t.state,
                        entryPoints: [],
                        options: t.options
                      }
                    }
                  }))],
                  target: Ia
                }
              }), Oo(i, Ca, {
                entry: ["onRouteRevoke"],
                always: {
                  actions: [],
                  target: Ia
                }
              }), Oo(i, Ia, {
                entry: [Fc((function(t) {
                  return {
                    type: ss,
                    payload: {
                      state: Ia
                    }
                  }
                })), "onRouteClose"],
                type: "final"
              }), i)
            },
            {
              actions: {
                onRouting: zc((function(t, e) {
                  console_.info("即将开始获取路由操作...", "Router State: ".concat(Ea, "，"), "Event: ".concat(e.type, "。"));
                  var o = r.execute("onRouting", t, e);
                  return ni(ni({},
                  t), o)
                })),
                onRouteSucc: zc((function(t, e) {
                  var n = e.data;
                  if (!n) return ni(ni({},
                  t), {},
                  {
                    routeErrors: null,
                    entryPoints: []
                  });
                  var o = r.execute("onRouteSucc", t, e);
                  return ni(ni(ni({},
                  t), o), {},
                  {
                    routeErrors: null,
                    entryPoints: n
                  })
                })),
                onRouteErr: zc((function(t, e) {
                  var n = r.execute("onRouteErr", t, e);
                  return ni(ni(ni({},
                  t), n), {},
                  {
                    routeErrors: e.data,
                    entryPoints: []
                  })
                })),
                onRoute: zc((function(t, e) {
                  console_.info("接入点路由表已获取。", "Router State: ".concat(_a, "，"), "Event: ".concat(JSON.stringify(e.data), "。"));
                  var o = r.execute("onRoute", t, e);
                  return ni(ni({},
                  t), o)
                })),
                onRouteFail: zc((function(t, e) {
                  console_.info("获取路由操作失败！", "Router State: ".concat(xa), "失败原因：".concat(e.data, "。"));
                  var o = r.execute("onRouteFail", t, e);
                  return ni(ni({},
                  t), o)
                })),
                onRouteRevoke: zc((function(t, e) {
                  console_.info("获取路由操作已终止。", "Router State: ".concat(Ca), "Event: ".concat(e.type, "。"));
                  var o = r.execute("onRouteRevoke", t, e);
                  return ni(ni({},
                  t), o)
                })),
                onRouteClose: zc((function(t, e) {
                  console_.info("获取路由操作已结束。", "Router State: ".concat(Ia), "Event: ".concat(e.type, "。"));
                  var o = r.execute("onRouteClose", t, e);
                  return ni(ni({},
                  t), o)
                }))
              },
              activities: {},
              guards: {
                isSkipRouteContext: function(t, e) {
                  var n = t.entryPoints;
                  return ! n || n.length <= 0
                }
              },
              services: {
                routeContext: function(t, e) {
                  console_.info("读取上下文中路由信息。", "Router State: ".concat(Oa, "，"), "Event: ".concat(e.type, "。"));
                  var r = t.entryPoints,
                  o = t.excludes;
                  return Tu(r, void 0 === o ? [] : o, n)
                },
                routeHook: function(t, e) {
                  return console_.info("执行用户注册的 beforeRoute 钩子函数，并将其返回值作为路由信息。", "Router State: ".concat(Pa, "，"), "Event: ".concat(e.type, "。")),
                  o.execute("routeHook", t, e).then((function(e) {
                    var r = t.excludes;
                    return Tu(e, void 0 === r ? [] : r, n)
                  }))
                },
                routeStorage: function(t, e) {
                  return console_.info("读取 storage 中缓存的值作为路由信息。", "Router State: ".concat(Ra, "，"), "Event: ".concat(e.type, "。")),
                  o.execute("routeStorage", t, e).then((function(e) {
                    var r = t.excludes;
                    return Tu(e, void 0 === r ? [] : r, n)
                  }))
                },
                routeLB: function(t, e) {
                  return console_.info("获取 lb 服务提供的路由信息。", "Router State: ".concat(Aa, "，"), "Event: ".concat(e.type, "。")),
                  o.execute("routeLB", t, e).then((function(e) {
                    var r = t.excludes;
                    return Tu(e, void 0 === r ? [] : r, n)
                  }))
                },
                routeWhiteList: function(t, e) {
                  return console_.info("读取路由白名单。", "Router State: ".concat(Ta, "，"), "Event: ".concat(e.type, "。")),
                  o.execute("routeWhiteList", t, e).then((function(e) {
                    var r = t.excludes;
                    return Tu(e, void 0 === r ? [] : r, n)
                  }))
                }
              }
            })
          } catch(t) {
            var a = new Ns(t.message);
            throw n.error(a),
            a
          }
        } (t, {
          logger: n,
          hooks: r,
          actions: o
        }));
        i.subscribe((function(t) { ! 1 !== t.changed && n.trace("Pike Router Machine,", "Current State: ".concat(t.value, "。"))
        })).unsubscribe;
        return i
      };
      function Tu(t, e, n) {
        Pi(t) && (t = []),
        Ui(t) || (t = [t]);
        var r = new Map,
        o = new Map;
        t.forEach((function(t) {
          e.find((function(e) {
            return e.domain === t.domain
          })) || r.set(t.domain, t),
          o.set(t.domain, t)
        }));
        var i = Array.from(o.values()),
        a = Array.from(r.values());
        return console_.info("对获取到的路由进行去重操作！", "validEntryPoints：".concat(JSON.stringify(a), "，"), "EntryPoints：".concat(JSON.stringify(i), "，"), "excludes： ".concat(JSON.stringify(e), "。")),
        a.length > 0 ? Promise.resolve(a) : Promise.reject(a)
      }
      var xu = function(t, e) {
        var n = e.logger,
        r = e.hooks,
        o = e.actions,
        i = null,
        a = t.options,
        s = oa(t, ["options"]),
        c = null;
        try {
          var u, f, l, h;
          c = lu({
            id: "connection",
            initial: Na,
            context: {
              options: {}
            },
            on: (u = {},
            Oo(u, ws, Ga), Oo(u, ms, Va), Oo(u, ks, Ja), u),
            states: (h = {},
            Oo(h, Na, {
              entry: ["beforeOpen"],
              after: [{
                delay: "getOpenDelayTime",
                target: ja
              }],
              invoke: {
                src: "open",
                onDone: {
                  target: La,
                  actions: "onOpenSucc"
                },
                onError: {
                  target: Ma,
                  actions: "onOpenErr"
                }
              }
            }), Oo(h, ja, {
              entry: ["onOpenTimeout"],
              always: {
                target: Ma
              }
            }), Oo(h, Ma, {
              entry: ["onOpenFail"],
              always: {
                target: Ga
              }
            }), Oo(h, La, {
              entry: ["onOpen", Fc((function(t) {
                return {
                  type: fs,
                  payload: {
                    state: La,
                    entryPoint: t.entryPoint
                  }
                }
              }))],
              on: (f = {},
              Oo(f, ps, [{
                target: Ba
              }]), Oo(f, bs, {
                target: qa
              }), f)
            }), Oo(h, Fa, {
              entry: ["onLoginDenied", Fc((function(t) {
                return {
                  type: fs,
                  payload: {
                    state: Fa,
                    entryPoint: t.entryPoint,
                    options: t.options
                  }
                }
              }))],
              always: [{
                target: qa
              }]
            }), Oo(h, Ua, {
              entry: ["onLoginTimeout"],
              always: [{
                target: Ba,
                cond: "isLoginNotExceeded"
              },
              {
                target: Da,
                actions: ["onLoginExceed"]
              }]
            }), Oo(h, Da, {
              entry: ["onLoginFail"],
              on: (l = {},
              Oo(l, ys, [{
                target: Fa
              }]), Oo(l, ds, [{
                target: Ua
              }]), l)
            }), Oo(h, Ba, {
              entry: ["beforeLogin"],
              after: [{
                delay: "getLoginDelayTime",
                target: Ua
              }],
              invoke: {
                src: "login",
                onDone: {
                  target: za,
                  actions: ["onLoginSucc", "onLogin"]
                },
                onError: {
                  target: Da,
                  actions: "onLoginErr"
                }
              }
            }), Oo(h, za, {
              entry: ["onConnectionReady", Fc((function(t) {
                return {
                  type: fs,
                  payload: {
                    state: za,
                    entryPoint: t.entryPoint,
                    options: t.options
                  }
                }
              }))],
              on: Oo({},
              bs, {
                target: Ga
              })
            }), Oo(h, Ga, {
              entry: ["onConnectionRevoke"],
              always: {
                target: qa
              }
            }), Oo(h, Va, {
              entry: ["onConnectionDisconnect", Fc((function(t) {
                return {
                  type: ms,
                  payload: {
                    state: Va,
                    entryPoint: t.entryPoint
                  }
                }
              }))],
              always: {
                target: qa
              }
            }), Oo(h, Ja, {
              entry: ["onConnectionRestart", Fc((function(t) {
                return {
                  type: ks,
                  payload: {
                    state: Ja,
                    entryPoint: t.entryPoint
                  }
                }
              }))],
              always: {
                target: qa
              }
            }), Oo(h, qa, {
              entry: ["onConnectionClose", Fc((function(t) {
                return {
                  type: fs,
                  payload: {
                    state: qa,
                    entryPoint: t.entryPoint
                  }
                }
              }))],
              type: "final"
            }), h)
          },
          {
            actions: {
              onOpenSucc: zc((function(t, e) {
                var o = t.entryPoint;
                console_.info("连接建立成功！", "EntryPoint：".concat(JSON.stringify(o), "。"));
                var i = r.execute("onOpenSucc", t, e);
                return ni(ni({},
                t), i)
              })),
              onOpenErr: zc((function(t, e) {
                var o = t.entryPoint;
                console_.warn("连接建立失败！", "EntryPoint：".concat(JSON.stringify(o), "。"));
                console_.warn("连接建立失败！", "EntryPoint：".concat(JSON.stringify(o), "。"));
                var i = r.execute("onOpenErr", t, e);
                return ni(ni({},
                t), i)
              })),
              beforeOpen: zc((function(t, e) {
                var o = t.entryPoint,
                i = r.execute("beforeOpen", t, e);
                return console_.info("执行用户注册的 beforeOpen 钩子函数。", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(Na, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), i)
              })),
              onOpen: zc((function(t, e) {
                var o = t.entryPoint,
                a = r.execute("onOpen", t, e, i);
                return console_.info("连接已建立！", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(La, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), a)
              })),
              onOpenTimeout: zc((function(t, e) {
                var o = t.entryPoint,
                i = t.options,
                a = r.execute("onOpenTimeout", t, e);
                return console_.info("连接建立超时！", "超时时间为：".concat(i.timeout, "，"), "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(ja, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), a)
              })),
              onOpenFail: zc((function(t, e) {
                var o = t.entryPoint,
                i = r.execute("onOpenFail", t, e);
                return console_.warn("连接无法建立！", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(Ma, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), i)
              })),
              onLoginSucc: zc((function(t, e) {
                var o = t.entryPoint,
                i = r.execute("onLoginSucc", t, e);
                return console_.info("连接鉴权成功！", "EntryPoint：".concat(JSON.stringify(o), "。")),
                ni(ni({},
                t), i)
              })),
              onLoginErr: zc((function(t, e) {
                var o = t.entryPoint,
                i = t.retriesOfMessage,
                a = null,
                s = e.data;
                return s instanceof _s || (s instanceof Is ? console_.warn("业务服务器拒绝建立连接！", "EntryPoint：".concat(JSON.stringify(o))) : (a = r.execute("onLoginErr", t, e), console_.warn("连接鉴权出错！", "EntryPoint：".concat(JSON.stringify(o)), "retriesOfMessage： ".concat(i, "。")))),
                ni(ni({},
                t), a)
              })),
              onLoginTimeout: zc((function(t, e) {
                var o = t.entryPoint,
                i = t.retriesOfMessage;
                console_.info("连接鉴权超时！", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(Ua, "，"), "Event: ".concat(e.type), "retriesOfMessage： ".concat(i, "。"));
                var a = r.execute("onLoginTimeout", t, e);
                return ni(ni({},
                t), a)
              })),
              beforeLogin: zc((function(t, e) {
                var o = t.entryPoint,
                i = r.execute("beforeLogin", t, e);
                return console_.info("执行用户注册的 beforeLogin 钩子函数。", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(Ba, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), i)
              })),
              onLogin: zc((function(t, e) {
                var o = t.entryPoint,
                i = r.execute("onLogin", t, e);
                return console_.info("连接鉴权已通过！", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(Ba, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), i)
              })),
              onLoginFail: zc((function(t, e) {
                var o = t.entryPoint,
                a = (t.options, t.retriesOfMessage),
                s = null,
                c = e.data;
                return c instanceof _s ? i.send(ds) : (s = r.execute("onLoginFail", t, e), c instanceof Is ? i.send(ys) : (console_.info("连接鉴权出错！", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(Da, "，"), "Event: ".concat(e.type), "retriesOfMessage： ".concat(a, "。")), i.send(ws))),
                ni(ni({},
                t), s)
              })),
              onLoginExceed: zc((function(t, e) {
                var n = r.execute("onLoginExceed", t, e);
                return ni(ni({},
                t), n)
              })),
              onLoginDenied: zc((function(t, e) {
                var o = t.entryPoint,
                i = r.execute("onLoginDenied", t, e);
                return console_.info("连接鉴权被拒绝！", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(Fa, "。")),
                ni(ni({},
                t), i)
              })),
              onConnectionReady: zc((function(t, e) {
                var o = t.entryPoint;
                console_.info("Connection is getting ready.", "EntryPoint：".concat(JSON.stringify(o), ","), "Connection State: ".concat(za, ","), "Event: ".concat(e.type, "。"));
                var i = r.execute("onConnectionReady", t, e);
                return ni(ni({},
                t), i)
              })),
              onConnectionRevoke: zc((function(t, e) {
                var o = t.entryPoint;
                console_.warn("连接已终止！", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(Ga, "，"), "Event: ".concat(e.type, "。"));
                var i = r.execute("onConnectionRevoke", t, e);
                return ni(ni({},
                t), i)
              })),
              onConnectionDisconnect: zc((function(t, e) {
                var o = t.entryPoint;
                console_.warn("连接已断开！", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(Va, "，"), "Event: ".concat(e.type, "。"));
                var i = r.execute("onConnectionDisconnect", t, e);
                return ni(ni({},
                t), i)
              })),
              onConnectionRestart: zc((function(t, e) {
                var o = t.entryPoint;
                console_.warn("服务端强制重新建连！", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(Ja, "，"), "Event: ".concat(e.type, "。"));
                var i = r.execute("onConnectionRestart", t, e);
                return ni(ni({},
                t), i)
              })),
              onConnectionClose: zc((function(t, e) {
                var o = t.entryPoint;
                console_.warn("连接已关闭！", "EntryPoint：".concat(JSON.stringify(o), "，"), "Connection State: ".concat(qa, "，"), "Event: ".concat(e.type, "。"));
                var i = r.execute("onConnectionClose", t, e);
                return ni(ni({},
                t), i)
              }))
            },
            activities: {},
            guards: {
              isLoginNotExceeded: function(t, e) {
                return t.retriesOfMessage <= t.options.maxRetriesOfMessage
              }
            },
            services: {
              open: function(t, e) {
                return o.execute("open", t, e, i).then((function(e, n) {
                  return ea(t, n),
                  e
                })).
                catch((function(t) {
                  throw console_.warn("打开连接失败，失败原因:", t),
                  t
                })).
                finally((function() {
                  i.state.value !== Na && (console_.warn("在与连接点握手建立连接的时收到REVOKE指令！需强行终止建连并准备回收资源..."), r.execute("onConnectionClose", t, e))
                }))
              },
              login: function(t, e) {
                return t.retriesOfMessage += 1,
                o.execute("login", t, e).
                catch((function(t) {
                  throw console_.warn("登录失败，失败原因:", t),
                  t
                }))
              }
            },
            delays: {
              getOpenDelayTime: function(t, e) {
                return t.options.timeout || Rs.timeout
              },
              getLoginDelayTime: function(t, e) {
                return t.options.ackTimeout || Rs.ackTimeout
              }
            }
          })
        } catch(t) {
          var p = new Ns(t.message);
          throw n.error(p),
          p
        } (i = Eu(c.withContext(ni({
          entryPoint: null,
          socket: null,
          retriesOfMessage: 0,
          analytics: {},
          options: ni({
            timeout: Rs.timeout,
            ackTimeout: Rs.ackTimeout,
            maxRetriesOfMessage: 1
          },
          a)
        },
        s)))).subscribe((function(t) { ! 1 !== t.changed && n.trace("Pike Connection Machine,", "Current State: ".concat(t.value, ","), "EntryPoint: ".concat(t.context.entryPoint))
        })).unsubscribe;
        return i
      },
      _u = function(t, e) {
        return t.options.coolingTimeOfRoom || Rs.coolingTimeOfRoom
      },
      Iu = function(t, e) {
        var n = e.logger,
        r = e.hooks,
        o = e.actions,
        i = null,
        a = t.options,
        s = oa(t, ["options"]),
        c = null;
        try {
          var u, f;
          c = lu({
            id: "room",
            initial: Ka,
            context: {
              options: {}
            },
            on: (u = {},
            Oo(u, Os, es), Oo(u, ws, is), Oo(u, vs, {
              actions: ["updateContext"]
            }), u),
            states: (f = {},
            Oo(f, Ka, {
              entry: ["onRoomPending"],
              always: [{
                target: Xa,
                cond: "hasJoinedRoom"
              },
              {
                target: Wa
              }]
            }), Oo(f, Wa, {
              entry: ["onWait"],
              on: Oo({},
              Ss, {
                target: Ya
              })
            }), Oo(f, Ya, {
              entry: ["beforeJoin"],
              after: [{
                delay: "getRoomDelayTime",
                target: Ha
              }],
              invoke: {
                src: "join",
                onDone: {
                  target: Xa,
                  actions: "onJoin"
                },
                onError: {
                  target: Qa
                }
              }
            }), Oo(f, Ha, {
              entry: ["onJoinTimeout"],
              always: {
                target: Qa
              }
            }), Oo(f, Qa, {
              entry: ["onJoinFail"],
              always: {
                target: Wa
              }
            }), Oo(f, Xa, {
              entry: ["beforePull"],
              after: [{
                delay: "getPullDelayTime",
                target: $a
              }],
              invoke: {
                src: "pull",
                onDone: {
                  target: ts,
                  actions: ["onPull"]
                },
                onError: {
                  target: Za
                }
              }
            }), Oo(f, $a, {
              entry: ["onPullTimeout"],
              always: [{
                target: Za
              }]
            }), Oo(f, Za, {
              entry: ["onPullFail"],
              on: Oo({},
              Es, [{
                target: Xa
              }])
            }), Oo(f, ts, {
              entry: ["onRoomSleep"],
              after: [{
                delay: "getCoolingDelayTime",
                target: Xa
              }],
              on: Oo({},
              Ps, [{
                target: Xa
              }])
            }), Oo(f, es, {
              entry: ["beforeQuit"],
              after: [{
                delay: "getRoomDelayTime",
                target: ns
              }],
              invoke: {
                src: "quit",
                onDone: {
                  target: Wa,
                  actions: "onQuit"
                },
                onError: {
                  target: rs
                }
              }
            }), Oo(f, ns, {
              entry: ["onQuitTimeout"],
              always: [{
                target: rs
              }]
            }), Oo(f, rs, {
              entry: ["onQuitFail"],
              always: [{
                target: Wa
              }]
            }), Oo(f, is, {
              entry: ["onRoomRevoke"],
              always: {
                target: os
              }
            }), Oo(f, os, {
              entry: ["onRoomClose"],
              type: "final"
            }), f)
          },
          {
            actions: {
              onRoomPending: zc((function(t, e) {
                var o = t.room,
                i = r.execute("onRoomPending", t, e);
                return console_.info("检测当前是否已加入房间...", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(Ka, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), i)
              })),
              onWait: zc((function(t, e) {
                var o = r.execute("onWait", t, e);
                return console_.info("等待加入房间...", "Room State: ".concat(Wa, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), o)
              })),
              beforeJoin: zc((function(t, e) {
                var o = t.room,
                i = r.execute("beforeJoin", t, e);
                return console_.info("执行用户注册的 beforeJoin 钩子函数。", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(Ya, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), i)
              })),
              onJoin: zc((function(t, e) {
                var o = t.room;
                console_.info("加入房间成功！", "room：".concat(JSON.stringify(o), "。"));
                var i = r.execute("onJoin", t, e);
                return ni(ni({},
                t), i)
              })),
              onJoinTimeout: zc((function(t, e) {
                var o = t.room,
                i = t.options,
                a = r.execute("onJoinTimeout", t, e);
                return console_.warn("加入房间操作超时！", "超时时间为：".concat(i.ackTimeout, "，"), "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(Ha, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), a)
              })),
              onJoinFail: zc((function(t, e) {
                var o = t.room,
                i = r.execute("onJoinFail", t, e);
                return console_.warn("加入房间操作失败！", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(Qa, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), i)
              })),
              beforePull: zc((function(t, e) {
                var o = t.room,
                i = t.roomCoolingTimer;
                i && clearTimeout(i);
                var a = r.execute("beforePull", t, e);
                return n.debug("执行用户注册的 beforePull 钩子函数。", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(Xa, "，"), "Event: ".concat(e.type, "。")),
                ni(ni(ni({},
                t), a), {},
                {
                  roomCoolingTimer: null
                })
              })),
              onPull: zc((function(t, e) {
                var o = t.room,
                i = r.execute("onPull", t, e);
                return n.debug("发起拉取数据请求成功！", "room：".concat(JSON.stringify(o), "。")),
                ni(ni({},
                t), i)
              })),
              onPullTimeout: zc((function(t, e) {
                var o = t.room;
                n.debug("拉取数据请求超时！", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat($a, "，"), "Event: ".concat(e.type, "。"));
                var a = r.execute("onPullTimeout", t, e, i);
                return ni(ni({},
                t), a)
              })),
              onPullFail: zc((function(t, e) {
                var o = t.room,
                a = r.execute("onPullFail", t, e);
                return r.execute("onPullFail2", t, e).
                finally((function() {
                  i.send(Es)
                })),
                n.debug("发起拉取数据请求失败！", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(Za, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), a)
              })),
              onRoomSleep: zc((function(t, e) {
                n.debug("开始休眠，休眠结束后会重新发起拉起数据请求...", "State: ".concat(ts, "，"), "Event: ".concat(e.type));
                var o = r.execute("onRoomSleep", t, e),
                a = setTimeout((function() {
                  n.debug("休眠结束！"),
                  i.send(Ps)
                }), _u(t));
                return ni(ni(ni({},
                t), o), {},
                {
                  roomCoolingTimer: a
                })
              })),
              beforeQuit: zc((function(t, e) {
                var o = t.room,
                i = r.execute("beforeQuit", t, e);
                return console_.info("执行用户注册的 beforeQuit 钩子函数。", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(Xa, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), i)
              })),
              onQuitTimeout: zc((function(t, e) {
                var o = t.room,
                i = r.execute("onQuitTimeout", t, e);
                return console_.info("退出房间操作超时！", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(ns, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), i)
              })),
              onQuitFail: zc((function(t, e) {
                var o = t.room,
                i = r.execute("onQuitFail", t, e);
                return console_.info("退出房间失败！", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(rs, "，"), "Event: ".concat(e.type, "。")),
                ni(ni({},
                t), i)
              })),
              onQuit: zc((function(t, e) {
                var o = t.room;
                console_.info("退出房间成功！", "room：".concat(JSON.stringify(o), "。"));
                var i = r.execute("onQuit", t, e);
                return ni(ni({},
                t), i)
              })),
              onRoomRevoke: zc((function(t, e) {
                var o = t.room;
                console_.warn("终止房间事件监听！", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(is, "，"), "Event: ".concat(e.type, "。"));
                var i = r.execute("onRoomRevoke", t, e);
                return ni(ni({},
                t), i)
              })),
              onRoomClose: zc((function(t, e) {
                var o = t.room;
                console_.warn("已关闭房间事件监听！", "room：".concat(JSON.stringify(o), "，"), "Room State: ".concat(os, "，"), "Event: ".concat(e.type, "。"));
                var i = r.execute("onRoomClose", t, e);
                return ni(ni({},
                t), i)
              })),
              updateContext: zc((function(t, e) {
                var n = e.payload,
                r = n.options,
                o = oa(n, ["options"]),
                i = t.options;
                return ni(ni(ni({},
                t), o), {},
                {
                  options: ni(ni({},
                  i), r)
                })
              }))
            },
            activities: {},
            guards: {
              hasJoinedRoom: function(t, e) {
                var n = t.room || {};
                n.offset;
                return !! n.roomId
              }
            },
            services: {
              join: function(t, e) {
                return o.execute("join", t, e)
              },
              pull: function(t, e) {
                return o.execute("pull", t, e)
              },
              quit: function(t, e) {
                return o.execute("quit", t, e)
              }
            },
            delays: {
              getRoomDelayTime: function(t, e) {
                return t.options.ackTimeout || Rs.ackTimeout
              },
              getPullDelayTime: function(t, e) {
                var n = t.room,
                r = t.options;
                return n.pollingTimeout || r.pollingTimeout || Rs.pollingTimeout
              },
              getCoolingDelayTime: _u
            }
          })
        } catch(t) {
          var l = new Ns(t.message);
          throw n.error(l),
          l
        } (i = Eu(c.withContext(ni({
          analytics: {},
          options: ni({
            ackTimeout: Rs.ackTimeout,
            pollingTimeout: Rs.pollingTimeout
          },
          a)
        },
        s)))).subscribe((function(t) { ! 1 !== t.changed && n.trace("Pike Room Machine,", "Current State: ".concat(t.value, ","), "room: ".concat(t.context.entryPoint))
        })).unsubscribe;
        return i
      },
      Cu = function(t) {
        return function(e, n) {
          var r = [];
          Ui(n) ? r = n: r.push(n),
          t.log.apply(t, [e].concat(ta(r)))
        }
      },
      Nu = function(t, e, n, r) {
        t.onChange((function(t, n) {
          try {
            e.trace("Pike Context：".concat(JSON.stringify(t), "，"), "Pike Previous Context：".concat(JSON.stringify(n), "。"))
          } catch(r) {
            e.trace("Pike Context：", t, ", Pike Previous Context：", n)
          }
        })).onTransition((function(t) {
          t.changed && e.trace("Pike Machine,", "Current State: ".concat(t.value, "。"))
        })),
        t.isRunning = function() {
          return t.initialized && t.state && !t.state.matches(va)
        },
        n.service = t,
        r.service = t
      },
      Lu = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        e = t.options,
        n = void 0 === e ? {}: e,
        r = oa(t, ["options"]);
        return ni({
          retriesOfReconnection: 0,
          connection: null,
          connections: [],
          routerEntryState: null,
          entryPoints: [],
          usedEntryPoints: [],
          allEntryPoints: [],
          isLoginDenied: !1,
          backoff: new ia({
            min: n.coolingTimeOfReconnection || Rs.coolingTimeOfReconnection,
            max: n.maxCoolingTimeOfReconnection || Rs.maxCoolingTimeOfReconnection,
            factor: 10,
            jitter: .1
          }),
          room: {},
          analytics: {},
          options: ni(ni({},
          Rs), n)
        },
        r)
      },
      Mu = function(t, e, n, r, o, i) {
        var a, s, c, u, f, l = t.bizId,
        h = t.env,
        p = t.deviceInfo,
        d = t.options;
        return [{
          initial: sa,
          context: Lu(t),
          on: (a = {},
          Oo(a, ws, ga), Oo(a, ks, ba), a),
          states: (f = {},
          Oo(f, sa, {
            entry: ["initial"],
            on: Oo({},
            as, {
              target: ca
            })
          }), Oo(f, ca, {
            entry: ["onStart"],
            always: {
              target: fa
            }
          }), Oo(f, ua, {
            entry: ["onPending"],
            always: {
              target: fa
            }
          }), Oo(f, fa, {
            entry: ["onRouting"],
            on: (s = {},
            Oo(s, ss, {
              actions: ["route"]
            }), Oo(s, cs, {
              target: la
            }), Oo(s, us, {
              target: ha
            }), s)
          }), Oo(f, la, {
            entry: ["onConnecting"],
            on: (c = {},
            Oo(c, fs, {
              actions: ["compete"]
            }), Oo(c, bs, {
              target: va
            }), Oo(c, ls, {
              actions: ["onCompete"],
              target: da
            }), Oo(c, hs, {
              actions: ["onCompeteFail"],
              target: fa
            }), c)
          }), Oo(f, ha, {
            entry: ["onRouteFail"],
            always: {
              target: pa
            }
          }), Oo(f, pa, {
            entry: ["onConnectFail"],
            always: {
              target: wa
            }
          }), Oo(f, da, {
            entry: ["onConnect"],
            always: {
              target: ya
            }
          }), Oo(f, ya, {
            entry: ["onReady"],
            exit: ["onReadyExit"],
            on: (u = {},
            Oo(u, vs, {
              actions: ["updateContext"]
            }), Oo(u, ms, {
              target: ma
            }), Oo(u, ks, ba), u)
          }), Oo(f, ma, {
            entry: ["onDisconnect"],
            always: {
              target: wa
            }
          }), Oo(f, wa, {
            entry: ["onReconnect"],
            always: [{
              target: ka,
              cond: "isNotExceeded"
            },
            {
              target: va,
              actions: ["onReconnectExceed"]
            }]
          }), Oo(f, ka, {
            entry: ["onSleep"],
            after: [{
              delay: "getDelayTime",
              target: Sa
            }],
            on: Oo({},
            gs, [{
              target: Sa
            }])
          }), Oo(f, Sa, {
            entry: ["onSleepEnd"],
            always: [{
              target: ua
            }]
          }), Oo(f, ba, {
            entry: ["onRestart"],
            always: {
              target: ua
            }
          }), Oo(f, ga, {
            entry: ["onRevoke"],
            always: {
              target: va
            }
          }), Oo(f, va, {
            entry: ["onClose"],
            type: "final"
          }), f)
        },
        {
          actions: {
            initial: function(t, e) {
              n.service.send(as)
            },
            onStart: zc((function(t, e) {
              console_.info("开始启动...", "State: ".concat(ca, "，"), "Event: ".concat(e.type));
              var n = r.execute("onStart", t, e);
              return ni(ni({},
              t), n)
            })),
            onPending: zc((function(t, e) {
              console_.info("准备开始...", "State: ".concat(ua, "，"), "Event: ".concat(e.type));
              var n = r.execute("onPending", t, e);
              return ni(ni({},
              t), n)
            })),
            onRouting: zc({
              ref: function(t, e) {
                var n = t.routerEntryState,
                a = t.entryPoints,
                s = t.usedEntryPoints,
                c = t.options;
                return console_.info("进入竞争态，即将开始获取路由跑马竞争。", "State: ".concat(fa, "，"), "Event: ".concat(e.type || "NONE", "，"), "routerEntryState: ".concat(n, "，"), "entryPoints：".concat(a, "。")),
                Au({
                  bizId: l,
                  env: h,
                  deviceInfo: p,
                  options: c,
                  initial: n,
                  entryPoints: a,
                  excludes: s
                },
                {
                  logger: i,
                  hooks: r,
                  actions: o
                })
              }
            }),
            route: zc((function(t, e) {
              var r = e.payload,
              o = r.state,
              i = r.entryState,
              a = r.entryPoints,
              s = r.options,
              c = ni(ni({},
              t), {},
              {
                options: ni(ni({},
                d), s),
                entryPoints: a || [],
                routerEntryState: i,
                isRouteFailed: o === xa
              });
              switch (o) {
              case xa:
              case _a:
                return c;
              case Ia:
                t.ref = null;
              case Ca:
              default:
                return t.isRouteFailed ? n.service.send(us) : n.service.send(cs),
                ni(ni({},
                t), {},
                {
                  isRouteFailed: !1
                })
              }
            })),
            onConnecting: zc((function(t, e) {
              var a = t.options,
              s = t.bizId,
              c = t.entryPoints,
              u = t.usedEntryPoints,
              f = t.allEntryPoints,
              l = t.routerEntryState,
              d = a.maxParallelSockets,
              y = [].concat(ta(u), ta(c)),
              v = new Map; [].concat(ta(f), ta(c)).forEach((function(t) {
                v.has(t.domain) || v.set(t.domain, t)
              }));
              var g = 1;
              l === Aa && Fo(d) && (g = Math.max(1, d)),
              console_.info("即将开始跑马建连...", "State: ".concat(la, "，"), "Event: ".concat(e.type || "NONE", "，"), "当前获取路由方式：".concat(l, "，"), "当前获得的接入点为：".concat(JSON.stringify(c)), "当前并发连接数为：".concat(g, "，"), "当前允许的最大并发连接数为：".concat(d, "。"));
              var m = c.splice(0, g);
              return m.length <= 0 ? (n.service.send(hs), ni(ni({},
              t), {},
              {
                routerEntryState: l,
                entryPoints: [],
                connections: []
              })) : ni(ni({},
              t), {},
              {
                routerEntryState: l,
                entryPoints: c,
                connections: m.map((function(t) {
                  return {
                    entryPoint: t,
                    ref: xu({
                      bizId: s,
                      env: h,
                      deviceInfo: p,
                      options: a,
                      entryPoint: t
                    },
                    {
                      logger: i,
                      hooks: r,
                      actions: o
                    })
                  }
                })),
                usedEntryPoints: y,
                allEntryPoints: Array.from(v.values())
              })
            })),
            compete: zc((function(t, e) {
              var a = e.payload,
              s = a.state,
              c = a.entryPoint,
              u = a.options,
              f = t.connections,
              d = t.routerEntryState,
              y = t.entryPoints,
              v = t.options,
              g = t.isLoginDenied,
              m = t.connection,
              b = -1,
              w = null,
              k = g;
              switch (i.debug("收到子连接发来的消息。", "Connection State: ".concat(s, "，"), "Event: ".concat(e.type || "NONE", "，"), "接入点为：".concat(JSON.stringify(c), "。")), s) {
              case Fa:
                f.forEach((function(t) {
                  t.ref && t.ref.send(ws)
                })),
                y.splice(0, y.length),
                k = !0;
                break;
              case qa:
              case Ga:
                if (m && c === m.entryPoint) {
                  m = null;
                  var S = f.find((function(t) {
                    return t.entryPoint !== c && t.ref.state.matches(La)
                  }));
                  S ? (m = S, S.ref.send(ps), i.debug("推选的优胜连接已关闭！我们已重新推选出优胜者，并通知其去进行登录鉴权操作!", "重新推选的优胜者的EntryPoint：".concat(JSON.stringify(S.ref._state.context.entryPoint), "，"), "connections：当前剩余在队列中的连接还有".concat(JSON.stringify(f), "。"))) : i.debug("推选的优胜连接已关闭！后续我们会重新推选!", "EntryPoint：".concat(JSON.stringify(c), "，"), "Connection State: ".concat(s, "，"), "Event: ".concat(e.type, "。")),
                  t.connection = m
                } (b = f.findIndex((function(t) {
                  return t.entryPoint === c
                }))) > -1 && f.splice(b, 1),
                i.debug("参与竞争的连接已关闭！", "剩余的全部接入点EntryPoints：".concat(JSON.stringify(y), "，"), "connections：当前剩余在队列中的连接还有".concat(JSON.stringify(f), "。")),
                (w = Vo(y.splice(0, 1), 1)[0]) && !k && (f.push({
                  entryPoint: w,
                  ref: xu({
                    bizId: l,
                    env: h,
                    deviceInfo: p,
                    options: v,
                    entryPoint: w
                  },
                  {
                    logger: i,
                    hooks: r,
                    actions: o
                  })
                }), i.debug("我们接着放马(".concat(JSON.stringify(w), ")进行竞赛！"), "剩余的全部接入点EntryPoints：".concat(JSON.stringify(y), "，"), "connections：当前剩余在队列中的连接还有".concat(JSON.stringify(f), "。")));
                break;
              case La:
                (b = f.findIndex((function(t) {
                  return t.entryPoint === c
                }))) > -1 ? m ? d === Aa ? i.debug("很遗憾在您之前我们已成功推选了优胜者！请您后续尽快进行连接关闭操作！", "EntryPoint：".concat(JSON.stringify(c), "，"), "Connection State: ".concat(s, "，"), "Event: ".concat(e.type, "，"), "当前环境支持Storage并且当前接入点是从LB中获取的。") : i.debug("很遗憾在您之前我们已成功推选了优胜者！请您先维持连接一段时间，如果后续优胜者鉴权失败或者连接断开的话您还有机会被重新推选为优胜者，一旦进入稳定态我们会通知您关闭连接！", "EntryPoint：".concat(JSON.stringify(c), "，"), "Connection State: ".concat(s, "，"), "Event: ".concat(e.type, "，"), "当前环境支持有可能不支持Storage或者当前接入点可能不是从LB中获取的。") : (m = f[b], t.connection = m, m.ref.send(ps), i.debug("当前竞争态中优胜者已产生！已通知其尽快进行登录鉴权操作！", "EntryPoint：".concat(JSON.stringify(c), "，"), "Connection State: ".concat(s, "，"), "Event: ".concat(e.type, "。"))) : console_.warn("您当前没有在我们维持的连接列表中，对于游离的连接我们会记录下您的信息！", "EntryPoint：".concat(JSON.stringify(c)), "Connection State: ".concat(s), "Event: ".concat(e.type));
                break;
              case za:
                (b = f.findIndex((function(t) {
                  return t.entryPoint === c
                }))) > -1 ? (m = f.splice(b, 1)[0], t.connection = m, f.forEach((function(t) {
                  t.ref && t.ref.send(ws)
                })), y.splice(0, y.length), i.debug("恭喜我们的优胜者通过鉴权，我们即将进入稳定态，在此之前我们已经通知了尚未关闭的连接进行关闭操作。", "EntryPoint：".concat(JSON.stringify(c), "，"), "Connection State: ".concat(s, "，"), "Event: ".concat(e.type))) : console_.warn("您当前没有在我们维持的连接列表中，对于游离的连接我们会记录下您的信息！", "EntryPoint：".concat(JSON.stringify(c)), "Connection State: ".concat(s), "Event: ".concat(e.type));
                break;
              default:
                i.debug("EntryPoint：".concat(JSON.stringify(c), "，"), "Connection State: ".concat(s, "，"), "Event: ".concat(e.type))
              }
              return i.debug("子连接发来的消息已处理完毕。", "Connection State: ".concat(s, "，"), "Event: ".concat(e.type || "NONE", "，"), "当前剩余的所有接入点为：".concat(JSON.stringify(y), "，"), "当前剩余的所有子连接为：".concat(JSON.stringify(f), "。")),
              y.length <= 0 && f.length <= 0 && (k ? n.service.send(bs) : m ? (n.service.send(ls), console_.info("跑马竞争结束！当前优胜者为".concat(JSON.stringify(m.entryPoint), "。"))) : (n.service.send(hs), console_.warn("跑马竞争结束！没有找到对应优胜者！"))),
              ni(ni({},
              t), {},
              {
                options: ni(ni({},
                v), u),
                isLoginDenied: k
              })
            })),
            onCompete: zc((function(t, e) {
              console_.info("跑马竞争结束，即将进入稳定态...", "State: ".concat(la, "，"), "Event: ".concat(e.type, "，"));
              var n = r.execute("onCompete", t, e);
              return ni(ni({},
              t), n)
            })),
            onCompeteFail: zc((function(t, e) {
              console_.warn("跑马竞争失败，即将重新获取路由跑马竞争。", "State: ".concat(la, "，"), "Event: ".concat(e.type, "，"));
              var n = r.execute("onCompeteFail", t, e);
              return ni(ni({},
              t), n)
            })),
            onRouteFail: zc((function(t, e) {
              console_.warn("获取路由表失败！", "State: ".concat(ha, "，"), "Event: ".concat(e.type));
              var n = r.execute("onRouteFail", t, e);
              return ni(ni({},
              t), n)
            })),
            onConnectFail: zc((function(t, e) {
              console_.warn("跑马建连失败！", "State: ".concat(pa, "，"), "Event: ".concat(e.type));
              var n = r.execute("onConnectFail", t, e);
              return ni(ni({},
              t), n)
            })),
            onConnect: zc((function(t, e) {
              var n = t.connection;
              console_.info("建连成功！", "State: ".concat(da, "，"), "Event: ".concat(e.type, "，"), "当前连接接入点：".concat(JSON.stringify(n)));
              var o = r.execute("onConnect", t, e);
              return ni(ni({},
              t), o)
            })),
            onReady: zc((function(t, e) {
              console_.info("进入稳定态...", "State: ".concat(ya, "，"), "Event: ".concat(e.type || "NONE", "，"));
              var n = t.backoff,
              o = t.options;
              t.room;
              n.reset();
              var a = r.execute("onReady", t, e);
              return ni(ni(ni({},
              t), a), {},
              {
                retriesOfReconnection: 0,
                backoff: new ia({
                  min: o.coolingTimeOfReconnection || Rs.coolingTimeOfReconnection,
                  max: o.maxCoolingTimeOfReconnection || Rs.maxCoolingTimeOfReconnection,
                  factor: 10,
                  jitter: .1
                })
              })
            })),
            updateContext: zc((function(t, e) {
              var n = e.payload,
              r = n.options,
              o = oa(n, ["options"]),
              i = t.options;
              return ni(ni(ni({},
              t), o), {},
              {
                options: ni(ni({},
                i), r)
              })
            })),
            onReadyExit: zc((function(t, e) {
              var n = r.execute("onReadyExit", t, e);
              return ni(ni({},
              t), n)
            })),
            onDisconnect: zc((function(t, e) {
              console_.info("当前连接已断开，等待重连...", "State: ".concat(ma, "，"), "Event: ".concat(e.type, "，"));
              var n = r.execute("onDisconnect", t, e);
              return ni(ni({},
              t), n)
            })),
            onReconnectExceed: zc((function(t, e) {
              var n = t.options,
              o = n.maxRetriesOfReconnection,
              a = n.minAliveDuration;
              console_.warn("超出允许的最大重试次数，即将退出此次重连流程并进入关闭流程，如果需要实现无限重连保活请手动设置 keepAlive 参数为 true 。", "State: ".concat(wa, "，"), "Event: ".concat(e.type, "，"), "最大允许重连次数: ".concat(o, "，"), "最小存活时间: ".concat(a, "。"));
              var s = r.execute("onReconnectExceed", t, e);
              return ni(ni(ni({},
              t), s), {},
              {
                allEntryPoints: []
              })
            })),
            onReconnect: zc((function(t, e) {
              var n = t.connection,
              o = t.retriesOfReconnection,
              a = t.options,
              s = a.maxRetriesOfReconnection,
              c = a.minAliveDuration,
              u = t.analytics,
              f = void 0 === u ? {}: u,
              l = (t.isLoginDenied, (f || {}).startTime),
              h = void 0 === l ? 0 : l;
              console_.info("开始进行重连...", "State: ".concat(wa, "，"), "Event: ".concat(e.type, "，"), "当前重连次数：".concat(o, "，"), "最大允许重连次数: ".concat(s, "，"), "当前存活时间：".concat(Date.now() - h, "，"), "最小存活时间: ".concat(c, "。"), JSON.stringify(f));
              var p = [];
              n && n.entryPoint && (p = [n.entryPoint]);
              var d = r.execute("onReconnect", t, e);
              return ni(ni(ni({},
              t), d), {},
              {
                entryPoints: p,
                routerEntryState: null,
                connection: null,
                isLoginDenied: !1,
                usedEntryPoints: [],
                retriesOfReconnection: o + 1
              })
            })),
            onSleep: zc((function(t, e) {
              console_.warn("开始休眠，进入冷却态，休眠结束后会重新开始建连...", "State: ".concat(ka, "，"), "Event: ".concat(e.type));
              var o = r.execute("onSleep", t, e),
              a = t.options.maxCoolingTimeOfReconnection,
              s = setTimeout((function() {
                n.service.send(gs),
                console_.warn("休眠结束！")
              }), 2 * a);
              return ni(ni(ni({},
              t), o), {},
              {
                coolingTimer: s
              })
            })),
            onSleepEnd: zc((function(t, e) {
              console_.info("休眠结束！", "State: ".concat(Sa, "，"), "Event: ".concat(e.type));
              var n = t.coolingTimer;
              return n && clearTimeout(n),
              ni(ni({},
              t), {},
              {
                coolingTimer: null
              })
            })),
            onRestart: zc((function(t, e) {
              console_.info("收到服务端强制重新建连指令开始重新建连...", "State: ".concat(ba, "，"), "Event: ".concat(e.type, "。"));
              var n = t.connection;
              n && n.ref.send(bs),
              t = Lu(ni(ni({},
              o), {}));
              var o = r.execute("onRestart", t, e);
              return ni(ni({},
              t), o)
            })),
            onRevoke: zc((function(t, e) {
              console_.info("强制退出并进入关闭流程...", "State: ".concat(ga, "，"), "Event: ".concat(e.type, "。"));
              var n = t.connections,
              o = t.entryPoints,
              a = t.ref;
              a && (a.send(ws), a.stop()),
              n && (n.forEach((function(t) {
                t.ref && (t.ref.send(ws), t.ref.stop())
              })), n.splice(0, n.length), o.splice(0, o.length));
              var s = r.execute("onRevoke", t, e);
              return ni(ni({},
              t), s)
            })),
            onClose: zc((function(t, e) {
              var n = t,
              o = n.connection,
              a = n.backoff;
              o && o.ref.send(bs),
              a.reset(),
              t = Lu(ni({},
              s));
              var s = r.execute("onClose", ni({},
              t), e);
              return console_.warn("成功关闭，进入关闭态...", "State: ".concat(va, "，"), "Event: ".concat(e.type, "。")),
              ni(ni({},
              t), s)
            }))
          },
          activities: {},
          guards: {
            isNotExceeded: function(t, e) {
              var n = t.retriesOfReconnection,
              r = t.analytics,
              o = r.startTime,
              i = void 0 === o ? 0 : o,
              a = (r.origin, t.options),
              s = a.maxRetriesOfReconnection,
              c = a.minAliveDuration;
              return a.keepAlive || n <= s || Date.now() - i <= c
            }
          },
          services: {},
          delays: {
            getDelayTime: function(t, e) {
              var n = t.backoff.duration();
              return console_.info("冷却时间为：".concat(n, "ms。"), "注：冷却时间是本次连接断开到下次开始进行重连之间的时间间隔。"),
              n
            }
          }
        }]
      },
      ju = function(t) {
        var e = t.logger,
        n = t.autoStart,
        r = t.hooks,
        o = t.actions;
        return e || (t.logger = console_),
        fi(n) || (t.autoStart = !0),
        r instanceof xs || (t.hooks = new xs),
        o instanceof Ts || (t.actions = new Ts),
        t
      },
      Bu = function(t, e) {
        var n = {},
        r = ju(e),
        o = r.logger,
        i = r.state,
        a = r.autoStart,
        s = r.hooks,
        c = r.actions,
        u = null;
        try {
          u = lu.apply(void 0, ta(Mu(t, 0, n, s, c, o)))
        } catch(t) {
          var f = new InitializeFailedException(t.message);
          throw o.error(f),
          f
        }
        var l = Vo(Pu(u, {
          context: t,
          state: i,
          logger: Cu(o),
          autoStart: a
        }), 3),
        h = l[0],
        p = l[1],
        d = l[2];
        return n.service = d,
        Nu(d, o, s, c),
        [h, p, d]
      },
      Du = function(t, e) {
        var n = {},
        r = ju(e),
        o = r.logger,
        i = r.state,
        a = r.autoStart,
        s = r.hooks,
        c = r.actions,
        u = null;
        try {
          u = lu.apply(void 0, ta(function(t, e, n, r, o, i) {
            var a, s = t.bizId,
            c = t.env,
            u = t.deviceInfo,
            f = (t.options, Vo(Mu(t, 0, n, r, o, i), 2)),
            l = f[0],
            h = f[1];
            return [l = ni(ni({},
            l), {},
            {
              states: ni(ni({},
              l.states), {},
              Oo({},
              ya, {
                entry: ["onReady"],
                exit: ["onReadyExit"],
                on: (a = {},
                Oo(a, vs, {
                  actions: ["updateContext"]
                }), Oo(a, Ss, {
                  actions: ["joinRoom"]
                }), Oo(a, Os, {
                  actions: ["quitRoom"]
                }), Oo(a, ms, {
                  target: ma
                }), Oo(a, ks, ba), a)
              }))
            }), h = ni(ni({},
            h), {},
            {
              actions: ni(ni({},
              h.actions), {},
              {
                onReady: zc((function(t, e) {
                  console_.info("进入稳定态...", "State: ".concat(ya, "，"), "Event: ".concat(e.type || "NONE", "，"));
                  var n = t.backoff,
                  a = t.options,
                  f = t.room,
                  l = void 0 === f ? {}: f;
                  n.reset();
                  var h = r.execute("onReady", t, e);
                  return ni(ni(ni({},
                  t), h), {},
                  {
                    retriesOfReconnection: 0,
                    backoff: new ia({
                      min: a.coolingTimeOfReconnection || Rs.coolingTimeOfReconnection,
                      max: a.maxCoolingTimeOfReconnection || Rs.maxCoolingTimeOfReconnection,
                      factor: 10,
                      jitter: .1
                    }),
                    roomRef: Iu({
                      bizId: s,
                      env: c,
                      deviceInfo: u,
                      options: a,
                      room: l
                    },
                    {
                      logger: i,
                      hooks: r,
                      actions: o
                    })
                  })
                })),
                updateContext: zc((function(t, e) {
                  var n = e.payload,
                  r = n.machine,
                  o = n.options,
                  i = oa(n, ["machine", "options"]),
                  a = t.options,
                  s = t.roomRef;
                  return "room" === r && s.send({
                    type: vs,
                    payload: ni({
                      options: o
                    },
                    i)
                  }),
                  ni(ni(ni({},
                  t), i), {},
                  {
                    options: ni(ni({},
                    a), o)
                  })
                })),
                joinRoom: function(t, e) {
                  var n = e.payload;
                  t.roomRef.send({
                    type: Ss,
                    payload: n
                  })
                },
                quitRoom: function(t, e) {
                  var n = e.payload;
                  t.roomRef.send({
                    type: Os,
                    payload: n
                  })
                },
                onReadyExit: zc((function(t, e) {
                  var n = r.execute("onReadyExit", t, e),
                  o = t.roomRef;
                  return o && (o.send(ws), o.stop(), t.roomRef = null),
                  ni(ni(ni({},
                  t), n), {},
                  {
                    roomRef: null
                  })
                })),
                onRevoke: zc((function(t, e) {
                  console_.info("强制退出并进入关闭流程...", "State: ".concat(ga, "，"), "Event: ".concat(e.type, "。"));
                  var n = t.connections,
                  o = t.entryPoints,
                  a = t.ref,
                  s = t.roomRef;
                  a && (a.send(ws), a.stop()),
                  n && (n.forEach((function(t) {
                    t.ref && (t.ref.send(ws), t.ref.stop())
                  })), n.splice(0, n.length), o.splice(0, o.length)),
                  s && (s.send(ws), s.stop());
                  var c = r.execute("onRevoke", t, e);
                  return ni(ni({},
                  t), c)
                }))
              })
            })]
          } (t, 0, n, s, c, o)))
        } catch(t) {
          var f = new InitializeFailedException(t.message);
          throw o.error(f),
          f
        }
        var l = Vo(Pu(u, {
          context: t,
          state: i,
          logger: Cu(o),
          autoStart: a
        }), 3),
        h = l[0],
        p = l[1],
        d = l[2];
        return n.service = d,
        Nu(d, o, s, c),
        [h, p, d]
      },
      Uu = ni(ni({
        NODE: "node",
        RN: "rn",
        WEB: "web"
      },
      {
        WEAPP: "weapp",
        SWAN: "swan",
        ALIPAY: "alipay",
        TT: "tt",
        QQ: "qq",
        JD: "jd",
        MT: "mt"
      }), {},
      {
        UNKNOWN: "unknown"
      }),
      Fu = ["wifi", "2g", "3g", "4g", "5g", "cellular", "unknown", "none"],
      zu = ["mobile", "ios", "android", "web", "minip", "rn", "electron", "node"],
      Ju = null;
      function Vu() {
        return Ju || (void 0 !== Qo ? Ju = Uu.WEB: Uu.UNKNOWN)
      }
      var qu = function() {
        function t() {
          po(this, t)
        }
        return vo(t, null, [{
          key: "getNetworkTypeSync",
          value: function() {
            var t = {onchange: null, effectiveType: "4g", rtt: 50, downlink: 10, saveData: false}, //navigator.connection || navigator.mozConnection || navigator.webkitConnection || {},
            e = t.type;
            return t.effectiveType || e || "unknown"
          }
        },
        {
          key: "getNetworkType",
          value: function() {
            return Promise.resolve(t.getNetworkTypeSync())
          }
        },
        {
          key: "onNetworkStatusChange",
          value: function(t) {
            var e = {onchange: null, effectiveType: "4g", rtt: 50, downlink: 10, saveData: false};//navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (!e) return {
              destroy: function() {}
            };
            var n = function(e) {
              if (e) {
                var n = e.target,
                r = n.type,
                o = n.effectiveType || r || "unkown",
                i = Fu.indexOf(o) + 1;
                t && t(i, o)
              }
            };
            return e.onchange = n,
            {
              destroy: function() {
                n = null
              }
            }
          }
        },
        {
          key: "offNetworkStatusChange",
          value: function() {}
        },
        {
          key: "getSystemInfoSync",
          value: function() {
            try {
              var t = Ai.getUAInfo(),
              e = t.platform,
              n = t.isMobile,
              r = t.system,
              o = t.brand,
              i = t.env,
              a = n ? /ios/i.test(e) ? 1 : /android/i.test(e) ? 2 : 0 : 3;
              return {
                platform: zu[a],
                SDKVersion: "",
                version: "",
                model: "",
                system: r,
                brand: o,
                env: i,
                platformType: a
              }
            } catch(t) {
              return {}
            }
          }
        },
        {
          key: "getDeviceInfoSync",
          value: function() {
            var e = t.getSystemInfoSync(),
            n = t.getNetworkTypeSync().toLocaleLowerCase();
            return ni(ni({},
            e), {},
            {
              network: n,
              networkType: Fu.indexOf(n) + 1
            })
          }
        }]),
        t
      } (),
      Gu = {
        getEnv: Vu,
        CONTAINER_ENVS: Uu,
        isMiniProgram: function() {
          return ! 1
        },
        isWeb: function() {
          return Vu() === Uu.WEB
        },
        isNode: function() {
          return ! 1
        },
        request: function(t) {
          var e = t.url,
          n = t.method,
          r = void 0 === n ? "GET": n,
          o = t.headers,
          i = t.header,
          a = t.credentials,
          s = void 0 === a ? "same-origin": a,
          c = t.mode,
          u = void 0 === c ? "cors": c,
          f = t.timeout,
          l = t.data,
          h = t.dataType,
          p = void 0 === h ? "json": h,
          d = t.fail,
          y = t.success,
          v = t.complete,
          g = oa(t, ["url", "method", "headers", "header", "credentials", "mode", "timeout", "data", "dataType", "fail", "success", "complete"]),
          m = new AbortController,
          b = m.signal,
          w = setTimeout((function() {
            m.abort()
          }), f),
          k = "GET" === r,
          S = "HEAD" === r,
          E = "".concat(new URLSearchParams(l));
          return new Promise((function(t, n) {
            fetch("".concat(e).concat((k || S) && E.length > 0 ? "?".concat(E) : ""), ni(ni({
              method: r,
              headers: o || i,
              credentials: s,
              mode: u,
              signal: b
            },
            k || S ? {}: {
              body: JSON.stringify(l)
            }), g)).then((function(t) {
              var e = t.ok,
              n = t.status,
              r = t.url;
              t.headers;
              if (e) return "json" === p ? t.json() : t.text();
              var o = new Error("The response from ", r, "was not ok. status code was: ", n);
              throw d && d(o),
              o
            })).then((function(e) {
              var n = {
                data: e,
                statusCode: 200
              };
              return y && y(n),
              t(n),
              n
            })).
            catch((function(t) {
              n(t)
            })).
            finally((function() {
              w && clearTimeout(w),
              v && v()
            }))
          }))
        },
        localStorage: Qo.localStorage,
        sessionStorage: Qo.sessionStorage,
        onNetworkStatusChange: qu.onNetworkStatusChange,
        offNetworkStatusChange: qu.offNetworkStatusChange,
        getNetworkTypeSync: qu.getNetworkTypeSync,
        getNetworkType: qu.getNetworkType,
        getSystemInfoSync: qu.getSystemInfoSync,
        getDeviceInfoSync: qu.getDeviceInfoSync
      },
      Ku = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        CRITICAL: 5,
        NONE: 6
      },
      Wu = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "CRITICAL", "NONE"];
      function Yu() {
        return (new Date).toLocaleString("en-GB", {
          timeZone: "UTC"
        })
      }
      var Hu = function() {
        function t(e) {
          po(this, t),
          Oo(this, "data", {}),
          this.loglevel = e
        }
        return vo(t, [{
          key: "trace",
          value: function() {
            if (this.loglevel <= Ku.TRACE) {
              for (var t, e = arguments.length,
              n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r]; (t = console_).debug.apply(t, ["[".concat(Yu(), "]"), "[TRACE]", "-"].concat(n))
            }
          }
        },
        {
          key: "debug",
          value: function() {
            if (this.loglevel <= Ku.DEBUG) {
              for (var t, e = arguments.length,
              n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r]; (t = console_).debug.apply(t, ["[".concat(Yu(), "]"), "[DEBUG]", "-"].concat(n))
            }
          }
        },
        {
          key: "info",
          value: function() {
            if (this.loglevel <= Ku.INFO) {
              for (var t, e = arguments.length,
              n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r]; (t = console_).info.apply(t, ["[".concat(Yu(), "]"), "[INFO]", "-"].concat(n))
            }
          }
        },
        {
          key: "warn",
          value: function() {
            if (this.loglevel <= Ku.WARN) {
              for (var t, e = arguments.length,
              n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r]; (t = console_).warn.apply(t, ["[".concat(Yu(), "]"), "[WARN]", "-"].concat(n))
            }
          }
        },
        {
          key: "error",
          value: function() {
            if (this.loglevel <= Ku.ERROR) {
              for (var t, e = arguments.length,
              n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r]; (t = console_).error.apply(t, ["[".concat(Yu(), "]"), "[ERROR]", "-"].concat(n))
            }
          }
        },
        {
          key: "critical",
          value: function() {
            if (this.loglevel <= Ku.CRITICAL) {
              for (var t, e = arguments.length,
              n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r]; (t = console_).error.apply(t, ["[".concat(Yu(), "]"), "[CRITICAL]", "-"].concat(n))
            }
          }
        },
        {
          key: "log",
          value: function(t) {
            for (var e = arguments.length,
            n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
            switch (t) {
            case Ku.TRACE:
              this.trace.apply(this, n);
              break;
            case Ku.DEBUG:
              this.debug.apply(this, n);
              break;
            case Ku.INFO:
              this.info.apply(this, n);
              break;
            case Ku.WARN:
              this.warn.apply(this, n);
              break;
            case Ku.ERROR:
              this.error.apply(this, n);
              break;
            case Ku.CRITICAL:
              this.critical.apply(this, n)
            }
          }
        },
        {
          key: "close",
          value: function() {}
        },
        {
          key: "loglevel",
          set: function(t) {
            var e = Ku.ERROR;
            t >= 0 && t < Wu.length && (e = t);
            var n = Wu.indexOf("".concat(t).toUpperCase());
            n >= 0 && (e = n),
            this.data.loglevel = e
          },
          get: function() {
            return this.data.loglevel
          }
        }]),
        t
      } (),
      Qu = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          return po(this, n),
          e.apply(this, arguments)
        }
        return vo(n, [{
          key: "reportLogs",
          value: function() {}
        },
        {
          key: "recordError",
          value: function(t) {
            this.error(t.message || t)
          }
        },
        {
          key: "recordMetric",
          value: function(t, e, n) {
            this.debug(t, e, n)
          }
        },
        {
          key: "recordApi",
          value: function(t, e, n, r, o) {
            this.debug(t, e, n, r, o)
          }
        }]),
        n
      } (Hu);
      function Xu(t) {
        return "number" == typeof t || t instanceof Number
      }
      function $u(t) {
        return ! t
      }
      var Zu = {
        "@dp/logan-web": "~2.1.2",
        "@dp/logan-wxapp": "~1.4.0",
        "@dp/owl": "~1.9.3",
        "@dp/owl-wxapp": "~1.1.13-0",
        "@dp/pike-common-api": "2.2.8",
        "@dp/pike-common-runtime": "2.2.8",
        log4js: "~6.3.0"
      },
      tf = [],
      ef = function(t) {
        return new Promise((function(e, n) {
          if (~tf.indexOf(t)) return e();
          // var r = Go.createElement("script");
          // r.src = t,
          // r.crossorigin = "anonymous",
          // r.onload = function() {
          //   return tf.push(t),
          //   e()
          // },
          // Go.getElementsByTagName("head")[0].appendChild(r)
          console_.warn("need to download:", t);
        }))
      },
      nf = function(e) {
        bo(r, e);
        var n = Eo(r);
        function r() {
          return po(this, r),
          n.apply(this, arguments)
        }
        return vo(r, [{
          key: "getLogan",
          value: function() {
            var e = this.options.Logan || t.Logan;
            if (e) return Promise.resolve(e);
            var n = ((void 0 === Zu ? {}: Zu)["@dp/logan-web"] || "2.1.2").match(/[\d.]+/),
            r = "//s3.meituan.net/v1/mss_eb9ea9cfff9840198c3ae909b17b4270/production/logan-websdk/logan_".concat(n, ".js");
            return ef(r).then((function() {
              return t.Logan
            }))
          }
        },
        {
          key: "getOwl",
          value: function() {
            var e = this.options.Owl || t.Owl;
            if (e) return Promise.resolve(e);
            var n = ((void 0 === Zu ? {}: Zu)["@dp/owl"] || "1.9.3").match(/[\d.]+/),
            r = "//www.dpfile.com/app/owl/static/owl_".concat(n, ".js");
            return ef(r).then((function() {
              return t.Owl
            }))
          }
        }]),
        r
      } (function(e) {
        bo(r, e);
        var n = Eo(r);
        function r(t, e) {
          var o;
          return po(this, r),
          Oo(go(o = n.call(this, t)), "logCache", []),
          Oo(go(o), "owlCache", []),
          o.loglevel = t,
          o.options = e || {},
          o.init(),
          o
        }
        return vo(r, [{
          key: "getLogan",
          value: function() {
            var e = this.options.Logan;
            return Promise.resolve(e || t.Logan)
          }
        },
        {
          key: "getOwl",
          value: function() {
            var e = this.options.Owl;
            return Promise.resolve(e || t.Owl)
          }
        },
        {
          key: "init",
          value: function() {
            var t = this,
            e = this.options,
            n = e.bizId,
            r = (e.isDebug, e.env),
            o = e.version,
            i = e.owl || {},
            a = i.metric,
            s = i.error,
            c = i.resource,
            u = i.delay,
            f = i.combo,
            l = void 0 === f || f,
            h = ni(ni({
              delay: u || 1e4
            },
            a), {},
            {
              combo: !1
            }),
            p = ni({
              combo: l,
              delay: u || 1e4
            },
            s),
            d = ni({
              combo: l,
              delay: u || 1e4
            },
            c),
            y = h.delay;
            Xu(y) || (y = 1e4);
            var v = p.delay;
            Xu(v) || (v = 1e4);
            var g = d.delay;
            Xu(g) || (g = 1e4);
            var m = Math.min(Math.max(y, 1e4), Math.max(v, 1e4), Math.max(g, 1e4), 36e5);
            h.delay = m,
            p.delay = m,
            d.delay = m;
            var b = "product" !== r;
            this.getLogan().then((function(e) {
              if ($u(e)) return console_.warn("缺失 Logan 实例"),
              t.logan = console_,
              void t.flushLogan();
              e.config({
                disableKNB: !0,
                devMode: b
              }),
              t.logan = e,
              t.flushLogan()
            })),
            this.getOwl().then((function(e) {
              if ($u(e)) console_.warn("缺失 Owl 实例");
              else {
                var r = new e.OWL({
                  project: "pike-sdk",
                  pageUrl: "message(2.0)",
                  devMode: b,
                  resource: ni(ni({},
                  d), {},
                  {
                    sampleApi: b ? 1 : .1,
                    sample: b ? 1 : .1
                  }),
                  metric: h,
                  error: p,
                  disableCache: !0
                });
                if (!b && r.SDKMetrics) {
                  r.SDKMetrics({
                    project: "pike-sdk",
                    userProject: n,
                    version: o,
                    tags: {},
                    url: ["https://www.dpfile.com/app/pike-message-standalone/pike_message_latest.js", "https://www.dpfile.com/app/pike-message-standalone/pike_message_" + o + ".js"],
                    pv: {
                      auto: !0,
                      sample: .01
                    },
                    resource: {
                      auto: !0,
                      sample: .01
                    }
                  })
                }
                var i = r.metricManager,
                a = r.newMetric,
                s = r.addApi,
                c = r.addError,
                u = r.resource,
                f = r.error;
                s || (r.addApi = u.addApi.bind(u)),
                c || (r.addError = f.addError.bind(f)),
                !i && a && (r.metricManager = new a),
                t.owl = r,
                setInterval((function() {
                  t.flushOwl()
                }), m)
              }
            }))
          }
        },
        {
          key: "trace",
          value: function() {
            if (this.loglevel <= Ku.TRACE) {
              for (var t = arguments.length,
              e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
              var r = ["[".concat(Yu(), "]"), "[TRACE]", "-"].concat(e);
              if (!this.cacheLogan.apply(this, [Ku.TRACE].concat(ta(r)))) try {
                var o; (o = this.logan).info.apply(o, ta(r))
              } catch(t) {}
            }
          }
        },
        {
          key: "debug",
          value: function() {
            if (this.loglevel <= Ku.DEBUG) {
              for (var t = arguments.length,
              e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
              var r = ["[".concat(Yu(), "]"), "[DEBUG]", "-"].concat(e);
              if (!this.cacheLogan.apply(this, [Ku.DEBUG].concat(ta(r)))) try {
                var o; (o = this.logan).info.apply(o, ta(r))
              } catch(t) {}
            }
          }
        },
        {
          key: "info",
          value: function() {
            if (this.loglevel <= Ku.INFO) {
              for (var t = arguments.length,
              e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
              var r = ["[".concat(Yu(), "]"), "[INFO]", "-"].concat(e);
              if (!this.cacheLogan.apply(this, [Ku.INFO].concat(ta(r)))) try {
                var o; (o = this.logan).info.apply(o, ta(r))
              } catch(t) {}
            }
          }
        },
        {
          key: "warn",
          value: function() {
            if (this.loglevel <= Ku.WARN) {
              for (var t = arguments.length,
              e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
              var r = ["[".concat(Yu(), "]"), "[WARN]", "-"].concat(e);
              if (!this.cacheLogan.apply(this, [Ku.WARN].concat(ta(r)))) try {
                var o; (o = this.logan).warn.apply(o, ta(r))
              } catch(t) {}
            }
          }
        },
        {
          key: "error",
          value: function() {
            if (this.loglevel <= Ku.ERROR) {
              for (var t = arguments.length,
              e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
              var r = ["[".concat(Yu(), "]"), "[ERROR]", "-"].concat(e);
              if (!this.cacheLogan.apply(this, [Ku.ERROR].concat(ta(r)))) try {
                var o; (o = this.logan).error.apply(o, ta(r))
              } catch(t) {}
              this.cacheError(e)
            }
          }
        },
        {
          key: "critical",
          value: function() {
            if (this.loglevel <= Ku.CRITICAL) {
              for (var t = arguments.length,
              e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
              var r = ["[".concat(Yu(), "]"), "[CRITICAL]", "-"].concat(e);
              if (!this.cacheLogan.apply(this, [Ku.CRITICAL].concat(ta(r)))) try {
                var o; (o = this.logan).error.apply(o, ta(r))
              } catch(t) {}
              this.cacheError(e)
            }
          }
        },
        {
          key: "cacheLogan",
          value: function(t) {
            if (!this.logan) {
              if (this.logCache.length <= 1e3) {
                for (var e = arguments.length,
                n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                this.logCache.push({
                  level: t,
                  data: n
                })
              }
              return ! 0
            }
            return ! 1
          }
        },
        {
          key: "cacheOwl",
          value: function(t) {
            if (this.owlCache.length <= 1e3) {
              for (var e = arguments.length,
              n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
              this.owlCache.push({
                level: t,
                data: n
              })
            } else {
              var o = this.owl;
              o && this.flushOwl()
            }
          }
        },
        {
          key: "flushOwl",
          value: function() {
            var t = this;
            this.owlCache.forEach((function(e) {
              var n = e.level,
              r = e.data;
              switch (n) {
              case "error":
                t.reportError.apply(t, ta(r));
                break;
              case "metric":
                t.reportMetric.apply(t, ta(r));
                break;
              case "api":
                t.reportApi.apply(t, ta(r))
              }
            }));
            var e = this.owl;
            if (e) {
              var n = e.metricManager;
              n && n.report()
            }
            this.owlCache = []
          }
        },
        {
          key: "reportError",
          value: function(t, e) {
            var n = this.owl;
            n && n.addError(t, e)
          }
        },
        {
          key: "reportMetric",
          value: function(t, e, n) {
            var r = this.owl;
            if (r) {
              var o = r.metricManager;
              o && (o.setMetric(t, e), o.setTags(n))
            }
          }
        },
        {
          key: "reportApi",
          value: function(t, e, n, r, o) {
            var i = this.owl;
            i && i.addApi({
              name: t,
              networkCode: n || 200,
              responseTime: e || 0,
              connectType: o,
              content: r && r.stack
            })
          }
        },
        {
          key: "recordError",
          value: function(t, e) {
            this.cacheOwl("error", t, e)
          }
        },
        {
          key: "recordMetric",
          value: function(t, e, n) {
            var r = this.options,
            o = r.env,
            i = (r.isDebug, "product" !== o);
            Math.random() > (i ? 1 : .1) || this.cacheOwl("metric", t, e, n)
          }
        },
        {
          key: "recordApi",
          value: function(t, e, n, r, o) {
            this.cacheOwl("api", t, e, n, r, o)
          }
        },
        {
          key: "flushLogan",
          value: function() {
            var t = this;
            this.logCache.forEach((function(e) {
              var n = e.level,
              r = e.data;
              t.log.apply(t, [n].concat(ta(r)))
            })),
            this.logCache = []
          }
        },
        {
          key: "reportLogs",
          value: function() {
            var t = this.options,
            e = t.deviceInfo,
            n = t.deviceId,
            r = e.system;
            try {
              this.logan.report(null, null, {
                unionId: "pike|".concat(n),
                environment: e || "",
                uploadSource: "pike",
                webSource: r || "browser"
              })
            } catch(t) {
              this.recordError(t, {
                level: "error",
                category: "jsError"
              })
            }
          }
        },
        {
          key: "cacheError",
          value: function(t) {
            var e = t.find((function(t) {
              return t instanceof Error
            })) || "unknown exception.",
            n = t.filter((function(t) {
              return t instanceof Error
            }));
            this.recordError(e, {
              level: "error",
              category: "jsError",
              tags: {
                message: n
              }
            })
          }
        }]),
        r
      } (Hu)),
      rf = null,
      of = function() {
        function t() {
          po(this, t)
        }
        return vo(t, null, [{
          key: "set",
          value: function(e, n) {
            t.loglevel = e,
            t.options = n
          }
        },
        {
          key: "getLogger",
          value: function() {
            var e = t.loglevel,
            n = void 0 === e ? Ku.ERROR: e,
            r = t.options,
            o = void 0 === r ? {
              isDebug: !1
            }: r,
            i = o.isDebug;
            return rf || (rf = i ? new Qu(n) : new nf(n, o)),
            rf
          }
        }]),
        t
      } ();
      var af = {}.toString,
      sf = Array.isArray ||
      function(t) {
        return "[object Array]" == af.call(t)
      },
      cf = function(t) {
        return uf && n.isBuffer(t) || ff && (t instanceof ArrayBuffer ||
        function(t) {
          return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer
        } (t))
      },
      uf = "function" == typeof n && "function" == typeof n.isBuffer,
      ff = "function" == typeof ArrayBuffer;
      var lf = Object.prototype.toString,
      hf = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === lf.call(Blob),
      pf = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === lf.call(File);
      var df = function(t) {
        var e = [],
        n = t.data,
        r = t;
        return r.data = function t(e, n) {
          if (!e) return e;
          if (cf(e)) {
            var r = {
              _placeholder: !0,
              num: n.length
            };
            return n.push(e),
            r
          }
          if (sf(e)) {
            for (var o = new Array(e.length), i = 0; i < e.length; i++) o[i] = t(e[i], n);
            return o
          }
          if ("object" === u(e) && !(e instanceof Date)) {
            o = {};
            for (var a in e) o[a] = t(e[a], n);
            return o
          }
          return e
        } (n, e),
        r.attachments = e.length,
        {
          packet: r,
          buffers: e
        }
      },
      yf = function(t, e) {
        return t.data = function t(e, n) {
          if (!e) return e;
          if (e && e._placeholder) return n[e.num];
          if (sf(e)) for (var r = 0; r < e.length; r++) e[r] = t(e[r], n);
          else if ("object" === u(e)) for (var o in e) e[o] = t(e[o], n);
          return e
        } (t.data, e),
        t.attachments = void 0,
        t
      },
      vf = function(t, e) {
        var n = 0,
        r = t; !
        function t(o, i, a) {
          if (!o) return o;
          if (hf && o instanceof Blob || pf && o instanceof File) {
            n++;
            var s = new FileReader;
            s.onload = function() {
              a ? a[i] = this.result: r = this.result,
              --n || e(r)
            },
            s.readAsArrayBuffer(o)
          } else if (sf(o)) for (var c = 0; c < o.length; c++) t(o[c], c, o);
          else if ("object" === u(o) && !cf(o)) for (var f in o) t(o[f], f, o)
        } (r),
        n || e(r)
      },
      gf = function(t, e, n) {
        return t(n = {
          path: e,
          exports: {},
          require: function(t, e) {
            return function() {
              throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
            } (null == e && n.path)
          }
        },
        n.exports),
        n.exports
      } ((function(t, e) {
        var n, r = (n = "socket.io-parser",
        function() {
          var t = of.getLogger(n);
          t.debug.apply(t, arguments)
        });
        function o() {}
        e.protocol = 4,
        e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"],
        e.CONNECT = 0,
        e.DISCONNECT = 1,
        e.EVENT = 2,
        e.ACK = 3,
        e.ERROR = 4,
        e.BINARY_EVENT = 5,
        e.BINARY_ACK = 6,
        e.Encoder = o,
        e.Decoder = s;
        var i = e.ERROR + '"encode error"';
        function a(t) {
          var n = "" + t.type;
          if (e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (n += t.attachments + "-"), t.nsp && "/" !== t.nsp && (n += t.nsp + ","), null != t.id && (n += t.id), null != t.data) {
            var o = function(t) {
              try {
                return JSON.stringify(t)
              } catch(t) {
                return ! 1
              }
            } (t.data);
            if (!1 === o) return i;
            n += o
          }
          return r("encoded %j as %s", t, n),
          n
        }
        function s() {
          this.reconstructor = null
        }
        function c(t) {
          this.reconPack = t,
          this.buffers = []
        }
        function u(t) {
          return {
            type: e.ERROR,
            data: "parser error: " + t
          }
        }
        o.prototype.encode = function(t, n) { (r("encoding packet %j", t), e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type) ?
          function(t, e) {
            vf(t, (function(t) {
              var n = df(t),
              r = a(n.packet),
              o = n.buffers;
              o.unshift(r),
              e(o)
            }))
          } (t, n) : n([a(t)])
        },
        Zi(s.prototype),
        s.prototype.add = function(t) {
          var n;
          if ("string" == typeof t) n = function(t) {
            var n = 0,
            o = {
              type: Number(t.charAt(0))
            };
            if (null == e.types[o.type]) return u("unknown packet type " + o.type);
            if (e.BINARY_EVENT === o.type || e.BINARY_ACK === o.type) {
              for (var i = n + 1;
              "-" !== t.charAt(++n) && n != t.length;);
              var a = t.substring(i, n);
              if (a != Number(a) || "-" !== t.charAt(n)) throw new Error("Illegal attachments");
              o.attachments = Number(a)
            }
            if ("/" === t.charAt(n + 1)) {
              for (i = n + 1; ++n;) {
                if ("," === (c = t.charAt(n))) break;
                if (n === t.length) break
              }
              o.nsp = t.substring(i, n)
            } else o.nsp = "/";
            var s = t.charAt(n + 1);
            if ("" !== s && Number(s) == s) {
              for (i = n + 1; ++n;) {
                var c;
                if (null == (c = t.charAt(n)) || Number(c) != c) {--n;
                  break
                }
                if (n === t.length) break
              }
              o.id = Number(t.substring(i, n + 1))
            }
            if (t.charAt(++n)) {
              var f = function(t) {
                try {
                  return JSON.parse(t)
                } catch(t) {
                  return ! 1
                }
              } (t.substr(n));
              if (! (!1 !== f && (o.type === e.ERROR || sf(f)))) return u("invalid payload");
              o.data = f
            }
            return r("decoded %s as %j", t, o),
            o
          } (t),
          e.BINARY_EVENT === n.type || e.BINARY_ACK === n.type ? (this.reconstructor = new c(n), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);
          else {
            if (!cf(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet"); (n = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, this.emit("decoded", n))
          }
        },
        s.prototype.destroy = function() {
          this.reconstructor && this.reconstructor.finishedReconstruction()
        },
        c.prototype.takeBinaryData = function(t) {
          if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
            var e = yf(this.reconPack, this.buffers);
            return this.finishedReconstruction(),
            e
          }
          return null
        },
        c.prototype.finishedReconstruction = function() {
          this.reconPack = null,
          this.buffers = []
        }
      })),
      mf = gf.ACK,
      bf = gf.BINARY_ACK,
      wf = gf.BINARY_EVENT,
      kf = gf.CONNECT,
      Sf = gf.DISCONNECT,
      Ef = gf.Decoder,
      Of = gf.ERROR,
      Pf = gf.EVENT,
      Rf = gf.Encoder,
      Af = (gf.protocol, gf.types, {}.toString),
      Tf = Array.isArray ||
      function(t) {
        return "[object Array]" == Af.call(t)
      },
      xf = Object.prototype.toString,
      _f = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === xf.call(Blob),
      If = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === xf.call(File),
      Cf = function t(e) {
        if (!e || "object" !== u(e)) return ! 1;
        if (Tf(e)) {
          for (var r = 0,
          o = e.length; r < o; r++) if (t(e[r])) return ! 0;
          return ! 1
        }
        if ("function" == typeof n && n.isBuffer && n.isBuffer(e) || "function" == typeof ArrayBuffer && e instanceof ArrayBuffer || _f && e instanceof Blob || If && e instanceof File) return ! 0;
        if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return t(e.toJSON(), !0);
        for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i) && t(e[i])) return ! 0;
        return ! 1
      };
      function Nf(t, e, n) {
        return (Nf = "undefined" != typeof Reflect && Reflect.get ? Reflect.get: function(t, e, n) {
          var r = function(t, e) {
            for (; ! Object.prototype.hasOwnProperty.call(t, e) && null !== (t = wo(t)););
            return t
          } (t, e);
          if (r) {
            var o = Object.getOwnPropertyDescriptor(r, e);
            return o.get ? o.get.call(n) : o.value
          }
        })(t, e, n || t)
      }
      var Lf = Object.keys ||
      function(t) {
        var e = [],
        n = Object.prototype.hasOwnProperty;
        for (var r in t) n.call(t, r) && e.push(r);
        return e
      },
      Mf = function(t, e, n) {
        var r = t.byteLength;
        if (e = e || 0, n = n || r, t.slice) return t.slice(e, n);
        if (e < 0 && (e += r), n < 0 && (n += r), n > r && (n = r), e >= r || e >= n || 0 === r) return new ArrayBuffer(0);
        for (var o = new Uint8Array(t), i = new Uint8Array(n - e), a = e, s = 0; a < n; a++, s++) i[s] = o[a];
        return i.buffer
      },
      jf = function(t, e, n) {
        var r = !1;
        return n = n || Bf,
        o.count = t,
        0 === t ? e() : o;
        function o(t, i) {
          if (o.count <= 0) throw new Error("after called too many times"); --o.count,
          t ? (r = !0, e(t), e = n) : 0 !== o.count || r || e(null, i)
        }
      };
      function Bf() {}
      /*! https://mths.be/utf8js v2.1.2 by @mathias */
      var Df, Uf, Ff, zf = String.fromCharCode;
      function Jf(t) {
        for (var e, n, r = [], o = 0, i = t.length; o < i;)(e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < i ? 56320 == (64512 & (n = t.charCodeAt(o++))) ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e), o--) : r.push(e);
        return r
      }
      function Vf(t, e) {
        if (t >= 55296 && t <= 57343) {
          if (e) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
          return ! 1
        }
        return ! 0
      }
      function qf(t, e) {
        return zf(t >> e & 63 | 128)
      }
      function Gf(t, e) {
        if (0 == (4294967168 & t)) return zf(t);
        var n = "";
        return 0 == (4294965248 & t) ? n = zf(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (Vf(t, e) || (t = 65533), n = zf(t >> 12 & 15 | 224), n += qf(t, 6)) : 0 == (4292870144 & t) && (n = zf(t >> 18 & 7 | 240), n += qf(t, 12), n += qf(t, 6)),
        n += zf(63 & t | 128)
      }
      function Kf() {
        if (Ff >= Uf) throw Error("Invalid byte index");
        var t = 255 & Df[Ff];
        if (Ff++, 128 == (192 & t)) return 63 & t;
        throw Error("Invalid continuation byte")
      }
      function Wf(t) {
        var e, n;
        if (Ff > Uf) throw Error("Invalid byte index");
        if (Ff == Uf) return ! 1;
        if (e = 255 & Df[Ff], Ff++, 0 == (128 & e)) return e;
        if (192 == (224 & e)) {
          if ((n = (31 & e) << 6 | Kf()) >= 128) return n;
          throw Error("Invalid continuation byte")
        }
        if (224 == (240 & e)) {
          if ((n = (15 & e) << 12 | Kf() << 6 | Kf()) >= 2048) return Vf(n, t) ? n: 65533;
          throw Error("Invalid continuation byte")
        }
        if (240 == (248 & e) && (n = (7 & e) << 18 | Kf() << 12 | Kf() << 6 | Kf()) >= 65536 && n <= 1114111) return n;
        throw Error("Invalid UTF-8 detected")
      }
      var Yf = {
        version: "2.1.2",
        encode: function(t, e) {
          for (var n = !1 !== (e = e || {}).strict, r = Jf(t), o = r.length, i = -1, a = ""; ++i < o;) a += Gf(r[i], n);
          return a
        },
        decode: function(t, e) {
          var n = !1 !== (e = e || {}).strict;
          Df = Jf(t),
          Uf = Df.length,
          Ff = 0;
          for (var r, o = []; ! 1 !== (r = Wf(n));) o.push(r);
          return function(t) {
            for (var e, n = t.length,
            r = -1,
            o = ""; ++r < n;)(e = t[r]) > 65535 && (o += zf((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e),
            o += zf(e);
            return o
          } (o)
        }
      },
      Hf = l((function(t, e) {
        var n;
        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        e.encode = function(t) {
          var e, r = new Uint8Array(t),
          o = r.length,
          i = "";
          for (e = 0; e < o; e += 3) i += n[r[e] >> 2],
          i += n[(3 & r[e]) << 4 | r[e + 1] >> 4],
          i += n[(15 & r[e + 1]) << 2 | r[e + 2] >> 6],
          i += n[63 & r[e + 2]];
          return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=": o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="),
          i
        },
        e.decode = function(t) {
          var e, r, o, i, a, s = .75 * t.length,
          c = t.length,
          u = 0;
          "=" === t[t.length - 1] && (s--, "=" === t[t.length - 2] && s--);
          var f = new ArrayBuffer(s),
          l = new Uint8Array(f);
          for (e = 0; e < c; e += 4) r = n.indexOf(t[e]),
          o = n.indexOf(t[e + 1]),
          i = n.indexOf(t[e + 2]),
          a = n.indexOf(t[e + 3]),
          l[u++] = r << 2 | o >> 4,
          l[u++] = (15 & o) << 4 | i >> 2,
          l[u++] = (3 & i) << 6 | 63 & a;
          return f
        }
      })),
      Qf = void 0 !== Qf ? Qf: "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder: "undefined" != typeof MSBlobBuilder ? MSBlobBuilder: "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
      Xf = function() {
        try {
          return 2 === new Blob(["hi"]).size
        } catch(t) {
          return ! 1
        }
      } (),
      $f = Xf &&
      function() {
        try {
          return 2 === new Blob([new Uint8Array([1, 2])]).size
        } catch(t) {
          return ! 1
        }
      } (),
      Zf = Qf && Qf.prototype.append && Qf.prototype.getBlob;
      function tl(t) {
        return t.map((function(t) {
          if (t.buffer instanceof ArrayBuffer) {
            var e = t.buffer;
            if (t.byteLength !== e.byteLength) {
              var n = new Uint8Array(t.byteLength);
              n.set(new Uint8Array(e, t.byteOffset, t.byteLength)),
              e = n.buffer
            }
            return e
          }
          return t
        }))
      }
      function el(t, e) {
        e = e || {};
        var n = new Qf;
        return tl(t).forEach((function(t) {
          n.append(t)
        })),
        e.type ? n.getBlob(e.type) : n.getBlob()
      }
      function nl(t, e) {
        return new Blob(tl(t), e || {})
      }
      "undefined" != typeof Blob && (el.prototype = Blob.prototype, nl.prototype = Blob.prototype);
      var rl = Xf ? $f ? Blob: nl: Zf ? el: void 0,
      ol = l((function(t, e) {
        var n;
        "undefined" != typeof ArrayBuffer && (n = Hf);
        var r = true, //"undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
        o = false, //"undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
        i = r || o;
        e.protocol = 3;
        var a = e.packets = {
          open: 0,
          close: 1,
          ping: 2,
          pong: 3,
          message: 4,
          upgrade: 5,
          noop: 6
        },
        s = Lf(a),
        c = {
          type: "error",
          data: "parser error"
        };
        function u(t, e, n) {
          for (var r = new Array(t.length), o = jf(t.length, n), i = function(t, n, o) {
            e(n, (function(e, n) {
              r[t] = n,
              o(e, r)
            }))
          },
          a = 0; a < t.length; a++) i(a, t[a], o)
        }
        e.encodePacket = function(t, n, r, o) {
          "function" == typeof n && (o = n, n = !1),
          "function" == typeof r && (o = r, r = null);
          var s = void 0 === t.data ? void 0 : t.data.buffer || t.data;
          if ("undefined" != typeof ArrayBuffer && s instanceof ArrayBuffer) return function(t, n, r) {
            if (!n) return e.encodeBase64Packet(t, r);
            var o = t.data,
            i = new Uint8Array(o),
            s = new Uint8Array(1 + o.byteLength);
            s[0] = a[t.type];
            for (var c = 0; c < i.length; c++) s[c + 1] = i[c];
            return r(s.buffer)
          } (t, n, o);
          if (void 0 !== rl && s instanceof rl) return function(t, n, r) {
            if (!n) return e.encodeBase64Packet(t, r);
            if (i) return function(t, n, r) {
              if (!n) return e.encodeBase64Packet(t, r);
              var o = new FileReader;
              return o.onload = function() {
                e.encodePacket({
                  type: t.type,
                  data: o.result
                },
                n, !0, r)
              },
              o.readAsArrayBuffer(t.data)
            } (t, n, r);
            var o = new Uint8Array(1);
            o[0] = a[t.type];
            var s = new rl([o.buffer, t.data]);
            return r(s)
          } (t, n, o);
          if (s && s.base64) return function(t, n) {
            var r = "b" + e.packets[t.type] + t.data.data;
            return n(r)
          } (t, o);
          var c = a[t.type];
          return void 0 !== t.data && (c += r ? Yf.encode(String(t.data), {
            strict: !1
          }) : String(t.data)),
          o("" + c)
        },
        e.encodeBase64Packet = function(t, n) {
          var r, o = "b" + e.packets[t.type];
          if (void 0 !== rl && t.data instanceof rl) {
            var i = new FileReader;
            return i.onload = function() {
              var t = i.result.split(",")[1];
              n(o + t)
            },
            i.readAsDataURL(t.data)
          }
          try {
            r = String.fromCharCode.apply(null, new Uint8Array(t.data))
          } catch(e) {
            for (var a = new Uint8Array(t.data), s = new Array(a.length), c = 0; c < a.length; c++) s[c] = a[c];
            r = String.fromCharCode.apply(null, s)
          }
          return o += btoa(r),
          n(o)
        },
        e.decodePacket = function(t, n, r) {
          if (void 0 === t) return c;
          if ("string" == typeof t) {
            if ("b" === t.charAt(0)) return e.decodeBase64Packet(t.substr(1), n);
            if (r && !1 === (t = function(t) {
              try {
                t = Yf.decode(t, {
                  strict: !1
                })
              } catch(t) {
                return ! 1
              }
              return t
            } (t))) return c;
            var o = t.charAt(0);
            return Number(o) == o && s[o] ? t.length > 1 ? {
              type: s[o],
              data: t.substring(1)
            }: {
              type: s[o]
            }: c
          }
          o = new Uint8Array(t)[0];
          var i = Mf(t, 1);
          return rl && "blob" === n && (i = new rl([i])),
          {
            type: s[o],
            data: i
          }
        },
        e.decodeBase64Packet = function(t, e) {
          var r = s[t.charAt(0)];
          if (!n) return {
            type: r,
            data: {
              base64: !0,
              data: t.substr(1)
            }
          };
          var o = n.decode(t.substr(1));
          return "blob" === e && rl && (o = new rl([o])),
          {
            type: r,
            data: o
          }
        },
        e.encodePayload = function(t, n, r) {
          "function" == typeof n && (r = n, n = null);
          var o = Cf(t);
          if (n && o) return rl && !i ? e.encodePayloadAsBlob(t, r) : e.encodePayloadAsArrayBuffer(t, r);
          if (!t.length) return r("0:");
          u(t, (function(t, r) {
            e.encodePacket(t, !!o && n, !1, (function(t) {
              r(null,
              function(t) {
                return t.length + ":" + t
              } (t))
            }))
          }), (function(t, e) {
            return r(e.join(""))
          }))
        },
        e.decodePayload = function(t, n, r) {
          if ("string" != typeof t) return e.decodePayloadAsBinary(t, n, r);
          var o;
          if ("function" == typeof n && (r = n, n = null), "" === t) return r(c, 0, 1);
          for (var i, a, s = "",
          u = 0,
          f = t.length; u < f; u++) {
            var l = t.charAt(u);
            if (":" === l) {
              if ("" === s || s != (i = Number(s))) return r(c, 0, 1);
              if (s != (a = t.substr(u + 1, i)).length) return r(c, 0, 1);
              if (a.length) {
                if (o = e.decodePacket(a, n, !1), c.type === o.type && c.data === o.data) return r(c, 0, 1);
                if (!1 === r(o, u + i, f)) return
              }
              u += i,
              s = ""
            } else s += l
          }
          return "" !== s ? r(c, 0, 1) : void 0
        },
        e.encodePayloadAsArrayBuffer = function(t, n) {
          if (!t.length) return n(new ArrayBuffer(0));
          u(t, (function(t, n) {
            e.encodePacket(t, !0, !0, (function(t) {
              return n(null, t)
            }))
          }), (function(t, e) {
            var r = e.reduce((function(t, e) {
              var n;
              return t + (n = "string" == typeof e ? e.length: e.byteLength).toString().length + n + 2
            }), 0),
            o = new Uint8Array(r),
            i = 0;
            return e.forEach((function(t) {
              var e = "string" == typeof t,
              n = t;
              if (e) {
                for (var r = new Uint8Array(t.length), a = 0; a < t.length; a++) r[a] = t.charCodeAt(a);
                n = r.buffer
              }
              o[i++] = e ? 0 : 1;
              var s = n.byteLength.toString();
              for (a = 0; a < s.length; a++) o[i++] = parseInt(s[a]);
              o[i++] = 255;
              for (r = new Uint8Array(n), a = 0; a < r.length; a++) o[i++] = r[a]
            })),
            n(o.buffer)
          }))
        },
        e.encodePayloadAsBlob = function(t, n) {
          u(t, (function(t, n) {
            e.encodePacket(t, !0, !0, (function(t) {
              var e = new Uint8Array(1);
              if (e[0] = 1, "string" == typeof t) {
                for (var r = new Uint8Array(t.length), o = 0; o < t.length; o++) r[o] = t.charCodeAt(o);
                t = r.buffer,
                e[0] = 0
              }
              var i = (t instanceof ArrayBuffer ? t.byteLength: t.size).toString(),
              a = new Uint8Array(i.length + 1);
              for (o = 0; o < i.length; o++) a[o] = parseInt(i[o]);
              if (a[i.length] = 255, rl) {
                var s = new rl([e.buffer, a.buffer, t]);
                n(null, s)
              }
            }))
          }), (function(t, e) {
            return n(new rl(e))
          }))
        },
        e.decodePayloadAsBinary = function(t, n, r) {
          "function" == typeof n && (r = n, n = null);
          for (var o = t,
          i = []; o.byteLength > 0;) {
            for (var a = new Uint8Array(o), s = 0 === a[0], u = "", f = 1; 255 !== a[f]; f++) {
              if (u.length > 310) return r(c, 0, 1);
              u += a[f]
            }
            o = Mf(o, 2 + u.length),
            u = parseInt(u);
            var l = Mf(o, 0, u);
            if (s) try {
              l = String.fromCharCode.apply(null, new Uint8Array(l))
            } catch(t) {
              var h = new Uint8Array(l);
              l = "";
              for (f = 0; f < h.length; f++) l += String.fromCharCode(h[f])
            }
            i.push(l),
            o = Mf(o, u)
          }
          var p = i.length;
          i.forEach((function(t, o) {
            r(e.decodePacket(t, n, !0), o, p)
          }))
        }
      })),
      il = "Pike_SDK_Version_V2",
      al = "Client_LocalStorage_Support_V2",
      sl = "Platforms_V2",
      cl = "Networks_V2",
      ul = "Pike_Create_Connect_V2",
      fl = "Pike_Continuted_Connect_V2",
      ll = "Pike_Server_Auth_V2",
      hl = "Pike_Message_V2",
      pl = "Pike_Message_E2E_V2",
      dl = function() {
        function t() {
          po(this, t)
        }
        return vo(t, null, [{
          key: "isAck",
          value: function(e) {
            var n = t.APP;
            return e === n.LOGIN_ACK || e === n.AUTH_ACK || e === n.SEND_ACK || e === n.RECEIVE_ACK || e === n.TAG_ACK || e === n.ALIAS_ACK
          }
        }]),
        t
      } ();
      Oo(dl, "CMD", {
        UPSTREAM: 1,
        DOWNSTREAM: 2,
        RELOAD: 3,
        CLOSE: 4,
        RECONNECT: 5,
        LOG: 6,
        LOG_ACK: 7,
        CLOCK: 8,
        CLOCK_ACK: 9
      }),
      Oo(dl, "APP", {
        LOGIN: 1,
        LOGIN_ACK: 2,
        AUTH: 3,
        AUTH_ACK: 4,
        SEND: 5,
        SEND_ACK: 6,
        RECEIVE: 7,
        RECEIVE_ACK: 8,
        TAG: 9,
        TAG_ACK: 10,
        ALIAS: 11,
        ALIAS_ACK: 12
      });
      var yl, vl = {
        path: "/pike",
        pingInterval: 5e3,
        pingTimout: 11e3,
        ackTimeout: 3e3,
        coolingTimeOfReconnection: 1,
        maxCoolingTimeOfReconnection: 3e3,
        maxRetriesOfReconnection: 3,
        maxRetriesOfMessage: 4,
        maxParallelSockets: 1,
        minAliveDuration: 15e3,
        fetchTimeout: 6e3
      },
      gl = {
        timeout: 6e3,
        transports: ["websocket"],
        autoConnect: !0,
        loglevel: Ku.ERROR
      },
      ml = {
        PROTOCOL_VERSION: 1,
        SDK_VERSION: "2.2.8",
        ENV: "product",
        VALID_ENVS: ["dev", "test", "ppe", "stage", "product"],
        MAX_SIZE_OF_MESSAGE_QUEUE: 1e3,
        NETWORKS: Fu,
        LOADBALANCE: "LOADBALANCE",
        DEVICEID: "DEVICEID",
        SESSIONID: "SESSIONID",
        ROUTE: "ROUTE",
        LINKLIST_WIN_SIZE: Number.MAX_VALUE
      },
      bl = "loadbalance",
      wl = "loadbalanceV2",
      kl = (Oo(yl = {},
      bl, {
        dev: "//pike-lb.inf.dev.sankuai.com/loadbalance",
        test: "//pike-lb.inf.test.sankuai.com/loadbalance",
        ppe: "//pike-lb-ppe.sankuai.com/loadbalance",
        stage: "//pike-lb.inf.st.sankuai.com/loadbalance",
        product: "//pike-lb.dianping.com/loadbalance"
      }), Oo(yl, wl, {
        dev: "//pike-lb.inf.dev.sankuai.com/loadbalanceV2",
        test: "//pike-lb.inf.test.sankuai.com/loadbalanceV2",
        ppe: "//pike-lb-ppe.sankuai.com/loadbalanceV2",
        stage: "//pike-lb.inf.st.sankuai.com/loadbalanceV2",
        product: "//pike-lb.dianping.com/loadbalanceV2"
      }), Oo(yl, "whiteListEntryPoints", {
        dev: [{
          domain: "http://pikem0.inf.dev.sankuai.com"
        }],
        test: [{
          domain: "http://pikem0.inf.test.sankuai.com"
        }],
        ppe: [{
          domain: "http://pikem0.inf.test.sankuai.com"
        }],
        stage: [{
          domain: "http://pikem0.inf.st.sankuai.com"
        }],
        product: [{
          domain: "https://pikem0-bj.sankuai.com"
        },
        {
          domain: "https://pikem0.sankuai.com"
        }]
      }), yl),
      Sl = function(t, e) {
        return "stage" !== e && "product" !== e || (t = "https:"),
        -1 === ["https:", "http:"].indexOf(t) && (t = "https:"),
        t
      },
      El = function() {
        function t(e, n) {
          po(this, t),
          Oo(this, "data", {
            defaultProtocol: "https:"
          }),
          Oo(this, "logger", of.getLogger()),
          this.data.env = n,
          this.bizId = e
        }
        return vo(t, [{
          key: "registry",
          value: function(t, e) {
            $o(t) && ui(e) && (kl[t] = e)
          }
        },
        {
          key: "query",
          value: function(t) {
            var e = this.logger,
            n = this.defaultProtocol,
            r = this.env;
            try {
              var o = Ho && Ho.protocol || n;
              o = Sl(o, r);
              var i = kl[t][r];
              return i && (i = /^https?:/.test(i) ? i.replace(/https?:/, o) : o + i),
              i
            } catch(n) {
              e.error("查询指定环境下对应key为 ".concat(t, " 的域名时出错！"), n)
            }
            return null
          }
        },
        {
          key: "validateProtocol",
          value: function(t, e) {
            if (Pi(t)) return t;
            Ui(t) || (t = [t]);
            var n = this.logger,
            r = this.defaultProtocol,
            o = this.env;
            try {
              return e = e || Ho && Ho.protocol || r,
              e = Sl(e, o),
              t.map((function(t) {
                var n = Ri.parseUrl(t.domain),
                r = n.protocol,
                o = n.href,
                i = n.slash;
                return r ? Gu.isNode() || Ri.isSecure(r) === Ri.isSecure(e) || (t.domain = o.replace(r, e)) : t.domain = i ? "".concat(e).concat(o) : [e, o].join("//"),
                t
              }))
            } catch(t) {
              n.error("校验接入点协议与当前站点域协议是否相同时出错!", t)
            }
            return t
          }
        },
        {
          key: "getEntryPointsFromLB",
          value: function(t) {
            var e = this;
            return new Promise((function(n, r) {
              e.getEntryPointsFromLBV2(t).then((function(t) {
                n(t)
              })).
              catch((function(o) {
                e.getEntryPointsFromLBV1(t).then((function(t) {
                  n(t)
                })).
                catch((function(t) {
                  r(t)
                }))
              }))
            }))
          }
        },
        {
          key: "getEntryPointsFromLBV1",
          value: function(t) {
            return this._getEntryPointsFromLB(t, "v1")
          }
        },
        {
          key: "getEntryPointsFromLBV2",
          value: function(t) {
            return this._getEntryPointsFromLB(t, "v2")
          }
        },
        {
          key: "_getEntryPointsFromLB",
          value: function(e, n) {
            var r = this,
            o = this.logger,
            i = e.bizId,
            a = e.token,
            s = e.deviceInfo,
            c = e.isOfficeNetwork,
            u = e.options,
            f = u.fetchTimeout,
            l = u.timeout,
            h = s.platformType,
            p = s.networkType,
            d = this.query("v2" === n ? t.LBV2: t.LB),
            y = Date.now(),
            v = y,
            g = "".concat(d),
            m = f || vl.fetchTimeout || l || gl.timeout;
            return Gu.request({
              url: g,
              method: "GET",
              header: {},
              credentials: "same-origin",
              mode: "cors",
              timeout: m,
              data: {
                bizId: i,
                businessId: i,
                token: a,
                network: p || "",
                platform: h || "",
                sdkVersion: ml.SDK_VERSION,
                isOfficeNetwork: !!c
              },
              dataType: "json"
            }).then((function(t) {
              var i = t.statusCode,
              a = t.data;
              v = Date.now();
              var s = a;
              "v2" === n && (s = a.routeInfos, e.options.maxParallelSockets = a.parallelNum || 1);
              var c = r.validateProtocol(s);
              return o.recordApi(g, v - y, i || 408, "", "pike loadbalance ".concat(n)),
              c
            })).
            catch((function(t) {
              throw o.recordApi(g, v - y, 408, t, "pike loadbalance ".concat(n)),
              t
            }))
          }
        },
        {
          key: "getEntryPointsFromWhiteList",
          value: function(e) {
            var n = this.env,
            r = kl[t.WHITELIST_ENTRYPOINTS][n];
            return this.validateProtocol(r)
          }
        },
        {
          key: "healthCheck",
          value: function(t, e) {
            var n = this.logger,
            r = (t.bizId, t.token, t.deviceInfo, t.isOfficeNetwork, t.options),
            o = r.fetchTimeout,
            i = r.timeout,
            a = Date.now(),
            s = a,
            c = "".concat(e, "/monitor/alive"),
            u = o || vl.fetchTimeout || i || gl.timeout;
            return Gu.request({
              url: c,
              method: "GET",
              header: {},
              credentials: "same-origin",
              mode: "cors",
              timeout: u,
              dataType: "text"
            }).then((function(t) {
              var e = t.statusCode,
              r = t.data;
              return n.recordApi(c, s - a, e || 408, "", "pike healthCheck"),
              r
            })).
            catch((function(t) {
              n.recordApi(c, s - a, 408, t, "pike healthCheck")
            }))
          }
        },
        {
          key: "env",
          set: function(t) {~ml.VALID_ENVS.indexOf(t) && (this.data.env = t)
          },
          get: function() {
            var t = ml.ENV;
            return this.data.env || t
          }
        },
        {
          key: "defaultProtocol",
          get: function() {
            return this.data.defaultProtocol
          }
        }]),
        t
      } ();
      Oo(El, "LB", bl),
      Oo(El, "LBV2", wl),
      Oo(El, "WHITELIST_ENTRYPOINTS", "whiteListEntryPoints");
      var Ol = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 501),
          Oo(go(r), "message", "此 message id 已使用。"),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      Pl = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 502),
          Oo(go(r), "message", "写冲突，请等待上一次绑定结束后再次进行绑定。"),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      Rl = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 415),
          Oo(go(r), "message", "此消息之前已发送过。"),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      Al = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 515),
          Oo(go(r), "message", "此消息之前已接收过。"),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      Tl = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 10),
          Oo(go(r), "message", "不符合协议。"),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      xl = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 503),
          Oo(go(r), "message", "参数类型不正确。"),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      _l = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 30),
          Oo(go(r), "message", ""),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      Il = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          po(this, n);
          for (var o = arguments.length,
          i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
          return Oo(go(r = e.call.apply(e, [this, t].concat(i))), "code", 60),
          Oo(go(r), "message", "超出阈值"),
          r.message = t,
          r
        }
        return n
      } (ra(Error)),
      Cl = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t) {
          var r;
          return po(this, n),
          Oo(go(r = e.call(this)), "winSize", 3),
          r.winSize = t,
          r
        }
        return vo(n, [{
          key: "isBlocked",
          value: function() {
            var t = this.head,
            e = this.cursor,
            n = this.winSize;
            if (!t || !e) return ! 1;
            for (var r = 0,
            o = t; o !== e;) r++,
            o = o.next;
            return r + 1 >= n
          }
        },
        {
          key: "forward",
          value: function() {
            this.isBlocked() || Nf(wo(n.prototype), "forward", this).call(this)
          }
        },
        {
          key: "getWinNodes",
          value: function() {
            var t = [],
            e = this.head,
            n = this.cursor;
            if (!e || !n) return t;
            for (var r = e; r !== n;) t.push(r),
            r = r.next;
            return t.push(r),
            t
          }
        },
        {
          key: "isInsideOfWin",
          value: function(t) {
            var e = this.head,
            n = this.cursor;
            if (!e || !n) return ! 1;
            for (var r = e; r !== n;) {
              if (r === t) return ! 0;
              r = r.next
            }
            return r === t
          }
        }]),
        n
      } (function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          var t;
          po(this, n);
          for (var r = arguments.length,
          o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
          return Oo(go(t = e.call.apply(e, [this].concat(o))), "head", null),
          Oo(go(t), "cursor", null),
          Oo(go(t), "logger", of.getLogger()),
          t
        }
        return vo(n, [{
          key: "insert",
          value: function(t) {
            Nf(wo(n.prototype), "insert", this).call(this, t),
            this.takeSnapshort()
          }
        },
        {
          key: "append",
          value: function(t) {
            Nf(wo(n.prototype), "append", this).call(this, t),
            this.takeSnapshort()
          }
        },
        {
          key: "deleteNode",
          value: function(t) {
            var e = this.head,
            r = this.cursor;
            e && t && (r === t && (this.cursor = t.prev), Nf(wo(n.prototype), "deleteNode", this).call(this, t), this.takeSnapshort())
          }
        },
        {
          key: "clear",
          value: function() {
            Nf(wo(n.prototype), "clear", this).call(this),
            this.reset()
          }
        },
        {
          key: "reset",
          value: function() {
            this.cursor = null,
            this.takeSnapshort()
          }
        },
        {
          key: "forward",
          value: function() {
            var t = this.cursor,
            e = this.head;
            if (e) {
              if (!t) return this.cursor = e,
              void this.takeSnapshort();
              t.next && (this.cursor = t.next),
              this.takeSnapshort()
            }
          }
        },
        {
          key: "isNextCursor",
          value: function(t) {
            var e = this.cursor,
            n = this.head;
            return !! n && (e ? t === e.next: t === n)
          }
        },
        {
          key: "getNext",
          value: function() {
            var t = this.cursor,
            e = this.head;
            return t ? t.next: e
          }
        },
        {
          key: "getCurrent",
          value: function() {
            return this.cursor
          }
        },
        {
          key: "takeSnapshort",
          value: function() {}
        }]),
        n
      } (Ei)),
      Nl = Hi.getInstance(),
      Ll = function() {
        function t(e) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          po(this, t),
          Oo(this, "data", {
            lock: !0,
            socket: null,
            compress: !0,
            binary: void 0,
            options: {},
            extra: {}
          }),
          Oo(this, "buffer", null),
          Oo(this, "records", []),
          Oo(this, "encoder", new Rf),
          Oo(this, "logger", of.getLogger()),
          this.socket = e,
          this.options = n;
          var r = n.winSize,
          o = void 0 === r ? ml.LINKLIST_WIN_SIZE: r;
          this.buffer = new Cl(Math.abs(o))
        }
        return vo(t, [{
          key: "lineUp",
          value: function(t) {
            var e = t.d,
            n = e.command,
            r = e.data,
            o = r.messageId,
            i = r.m;
            t.analytics = {
              startLineUpTime: Date.now(),
              command: n,
              times: 0,
              messageId: i || o
            },
            this.buffer.append(t),
            this.nextTick()
          }
        },
        {
          key: "isBlocked",
          value: function() {
            var t = this.buffer;
            return this.lock || t.isBlocked()
          }
        },
        {
          key: "isMessageBlocked",
          value: function(t) {
            var e = this.buffer;
            return this.isBlocked() && !e.isInsideOfWin(t)
          }
        },
        {
          key: "next",
          value: function() {
            if (!this.isBlocked()) {
              var t = this.buffer.getNext();
              if (t) {
                if ("sending" === t.status) return;
                "sended" === t.status ? this.nextTick() : this.send(t)
              }
            }
          }
        },
        {
          key: "nextTick",
          value: function() {
            this.next()
          }
        },
        {
          key: "flush",
          value: function() {
            this.buffer.reset(),
            this.buffer.forEach((function(t) {
              delete t.status,
              delete t.encodedPackets
            })),
            this.next()
          }
        },
        {
          key: "send",
          value: function(t, e) {
            var n = this,
            r = t.status,
            o = t.encodedPackets,
            i = t.analytics,
            a = t.d,
            s = a.command,
            c = a.data.token;
            "sended" !== r && (t.status = "sending"),
            (o ? Promise.resolve(o) : this.encode(this.pack(t))).then((function(r) {
              t.encodedPackets = r,
              s !== dl.APP.LOGIN && s !== dl.APP.AUTH && n.isMessageBlocked(t) || (i && (i.startSendTime = Date.now(), i.times += 1), n.write(r, e), n.sended(t), Pi(c) && n.extra.token && (t.d.data.token = n.extra.token))
            })).
            catch((function(t) {
              n.logger.warn("message encode error.", t)
            })).
            finally((function() {
              t.status = "sended",
              n.nextTick()
            }))
          }
        },
        {
          key: "pack",
          value: function(t) {
            var e = this.extra,
            n = t.v,
            r = t.c,
            o = t.d,
            i = o.command,
            a = o.data,
            s = (t.analytics, a.m),
            c = a.messageId,
            u = a.token,
            f = a.message,
            l = oa(a, ["message"]),
            h = {};
            dl.isAck(i) || (s && (h.m = Nl.makeGlobalUnique(s, u)), c && (h.messageId = Nl.makeGlobalUnique(c, u)));
            var p = {
              v: n,
              c: r,
              d: {
                command: i,
                data: ni(ni(ni({},
                l), e), h)
              }
            };
            return Cf(f) ? [ni(ni({},
            p), {},
            {
              d: JSON.stringify(p.d)
            }), f] : ni(ni({},
            p), {},
            {
              d: JSON.stringify(ni(ni({},
              p.d), {},
              {
                data: ni(ni({},
                p.d.data), {},
                {
                  message: f
                })
              }))
            })
          }
        },
        {
          key: "encode",
          value: function(t) {
            var e = this,
            n = t;
            Ui(n) || (n = [t]);
            var r = {
              type: (void 0 !== this.data.binary ? this.data.binary: Cf(n)) ? wf: Pf,
              data: ["pike"].concat(ta(n))
            };
            return r.query && 0 === r.type && (r.nsp += "?" + r.query),
            new Promise((function(t, n) {
              e.encoding ? n(new Error("encoder is busy!")) : (e.encoding = !0, e.encoder.encode(r, (function(n) {
                e.encoding = !1,
                t(n)
              })))
            }))
          }
        },
        {
          key: "write",
          value: function(t, e) {
            for (var n = {
              compress: this.compress
            },
            r = 0; r < t.length; r++)(e || this.socket).write(t[r], n)
          }
        },
        {
          key: "sended",
          value: function(t) {
            var e = t.d,
            n = e.command,
            r = e.data,
            o = r.messageId,
            i = r.m;
            if (n === dl.APP.SEND || n === dl.APP.ALIAS || n === dl.APP.TAG) this.buffer.isNextCursor(t) && this.buffer.forward();
            else {
              var a = this.buffer.find((function(t) {
                var e = t.d.data,
                n = e.messageId,
                r = e.m;
                return ! Pi(r) && r === i || !Pi(n) && n === o
              }));
              a && (this.buffer.deleteNode(a), delete a.encodedPackets)
            }
          }
        },
        {
          key: "take",
          value: function(t) {
            var e = this;
            return new Promise((function(n, r) {
              var o = e.find(t);
              if (o) {
                var i = e.buffer;
                i.head;
                i.deleteNode(o);
                var a = o.analytics;
                a && (a.endSendTime = Date.now())
              } else e.logger.warn("收到无效的ACK, messageId: ".concat(t));
              n(o),
              e.nextTick()
            }))
          }
        },
        {
          key: "takeCommand",
          value: function(t) {
            var e = this;
            return new Promise((function(n, r) {
              var o = e.buffer.deleteNodeBy((function(e) {
                return e.d.command === t
              }));
              o || e.logger.warn("收到无效的ACK, command: ".concat(t)),
              n(o),
              e.nextTick()
            }))
          }
        },
        {
          key: "find",
          value: function(t) {
            return this.buffer.find((function(e) {
              var n = e.d.data,
              r = n.messageId;
              return n.m === t || r === t
            }))
          }
        },
        {
          key: "patrol",
          value: function() {
            var t = this;
            return new Promise((function(e, n) {
              var r = t.lock,
              o = t.buffer,
              i = t.records,
              a = t.options,
              s = o.head,
              c = a.maxRetriesOfMessage,
              u = void 0 === c ? vl.maxRetriesOfMessage: c;
              if (r && s) e([]);
              else {
                var f = o.getWinNodes(),
                l = [];
                t.intersection(f, i).forEach((function(e) {
                  var n = e.analytics,
                  r = n.messageId,
                  o = (n.command, n.times),
                  i = e.d.data.token,
                  a = e.status;
                  o >= u ? l.push({
                    token: i,
                    messageId: r,
                    status: -2
                  }) : o > 0 && "sending" !== a && t.send(e)
                })),
                l.length > 0 ? e(l) : e([]),
                t.records = f
              }
            }))
          }
        },
        {
          key: "intersection",
          value: function(t, e) {
            var n = [];
            return t.forEach((function(t) {
              var r = t.d,
              o = r.command,
              i = r.data.messageId;
              if (!dl.isAck(o)) {
                var a = e.find((function(t) {
                  return t.d.data.messageId === i
                }));
                a && n.push(a)
              }
            })),
            n
          }
        },
        {
          key: "lock",
          set: function(t) {
            this.data.lock = t
          },
          get: function() {
            return this.data.lock
          }
        },
        {
          key: "socket",
          set: function(t) {
            this.data.socket = t
          },
          get: function() {
            return this.data.socket
          }
        },
        {
          key: "compress",
          set: function(t) {
            this.data.compress = t
          },
          get: function() {
            return this.data.compress
          }
        },
        {
          key: "binary",
          set: function(t) {
            this.data.binary = t
          },
          get: function() {
            return this.data.binary
          }
        },
        {
          key: "options",
          set: function(t) {
            this.data.options = t
          },
          get: function() {
            return this.data.options
          }
        },
        {
          key: "extra",
          set: function(t) {
            this.data.extra = t
          },
          get: function() {
            return this.data.extra
          }
        }]),
        t
      } (),
      Ml = function() {
        function t() {
          po(this, t),
          Oo(this, "decoder", new Ef),
          Oo(this, "logger", of.getLogger()),
          Oo(this, "nsp", "/")
        }
        return vo(t, [{
          key: "receive",
          value: function(t) {
            var e = this;
            return this.decode(t).then((function(t) {
              var n = t.nsp === e.nsp,
              r = t.type === Of && "/" === t.nsp;
              if (n || r) switch (t.type) {
              case kf:
                return e.onconnect(t);
              case Pf:
              case wf:
                return e.onevent(t);
              case mf:
              case bf:
                return e.onack(t);
              case Sf:
                return e.ondisconnect(t);
              case Of:
                return e.onerror(t);
              default:
                return t
              }
            }))
          }
        },
        {
          key: "decode",
          value: function(t) {
            var e = this;
            return new Promise((function(n, r) {
              e.decoder.once("decoded", (function(t) {
                try {
                  n(t)
                } catch(t) {
                  r(t)
                }
              })),
              e.decoder.add(t)
            }))
          }
        },
        {
          key: "onconnect",
          value: function(t) {
            return this.logger.info("收到服务端已建立连接的事件消息，状态码为 40 。"),
            t
          }
        },
        {
          key: "onevent",
          value: function(t) {
            try {
              var e = Vo(t.data, 3),
              n = (e[0], e[1]),
              r = (n.v, n.c),
              o = n.d,
              i = e[2];
              if (Pi(o)) return {
                type: r,
                data: null
              };
              var a = JSON.parse(o),
              s = !Pi(i) && Cf(i);
              return {
                type: r,
                data: ni(ni({},
                a), {},
                {
                  data: ni(ni({},
                  JSON.parse(a.data)), s ? {
                    message: i
                  }: {})
                })
              }
            } catch(t) {
              throw new Tl("解析下行数据出错: ".concat(t))
            }
          }
        },
        {
          key: "onack",
          value: function(t) {
            return t
          }
        },
        {
          key: "ondisconnect",
          value: function(t) {
            return this.logger.warn("收到服务端断连消息，状态码为 41 。"),
            t
          }
        },
        {
          key: "onerror",
          value: function(t) {
            return this.logger.error("收到服务端错误通知!", t),
            t
          }
        }]),
        t
      } (),
      jl = $i.getInstance(),
      Bl = Hi.getInstance(),
      Dl = function() {
        function t(e, n, r, o, i) {
          po(this, t),
          Oo(this, "senderMap", new Map),
          Oo(this, "commandMap", new Map),
          Oo(this, "receiverMap", new Oi(!1, 1e3)),
          Oo(this, "logger", of.getLogger()),
          Oo(this, "patrolTimer", null),
          Oo(this, "route", null),
          this.bizId = e,
          this.env = n,
          this.actions = o,
          this.hooks = i,
          this.deviceInfo = r;
          var a = vl.ackTimeout,
          s = vl.maxRetriesOfMessage;
          this.context = {
            options: {
              ackTimeout: a,
              maxRetriesOfMessage: s
            }
          },
          this.sender = new Ll,
          this.receiver = new Ml
        }
        return vo(t, [{
          key: "receive",
          value: function(t) {
            var e = this;
            return this.receiver.receive(t).then((function(t) {
              if (t) {
                var n = t.type,
                r = (e.receiverMap, e.commandMap, null),
                o = null;
                switch (n) {
                case dl.CMD.RELOAD:
                  e.actions.execute("reloadRouter");
                  break;
                case dl.CMD.CLOSE:
                  e.actions.execute("close");
                  break;
                case dl.CMD.RECONNECT:
                  e.actions.execute("restart");
                  break;
                case dl.CMD.LOG:
                  e.actions.execute("uploadLogs");
                  break;
                case dl.CMD.CLOCK:
                  e.actions.execute("clock");
                  break;
                case dl.CMD.DOWNSTREAM:
                  try {
                    switch (o = t.data.command, r = t.data.data, o) {
                    case dl.APP.LOGIN_ACK:
                    case dl.APP.AUTH_ACK:
                      e.onLogin(r);
                      break;
                    case dl.APP.SEND_ACK:
                      e.take(r, Bl.getShorthand(r.m || r.messageId));
                      break;
                    case dl.APP.RECEIVE:
                      e.onMessage(r);
                      break;
                    case dl.APP.TAG_ACK:
                      e.onTag(r);
                      break;
                    case dl.APP.ALIAS_ACK:
                      e.onAlias(r);
                      break;
                    case dl.APP.LOGIN:
                    case dl.APP.AUTH:
                    case dl.APP.SEND:
                    case dl.APP.RECEIVE_ACK:
                    case dl.APP.TAG:
                    case dl.APP.ALIAS:
                    }
                  } catch(t) {}
                  break;
                case dl.CMD.LOG_ACK:
                case dl.CMD.CLOCK_ACK:
                  break;
                case dl.CMD.UPSTREAM:
                }
              }
              return t
            }))
          }
        },
        {
          key: "onMessage",
          value: function(t) {
            try {
              var e = t.m || t.messageId,
              n = this.receiverMap;
              this.logger;
              if (!e) throw new Tl("接收的消息不符合协议");
              if (n.has(e)) {
                var r = this.sender.find(e);
                throw r ? r.d.data.status = 1 : this.ack({
                  messageId: e,
                  status: 1
                }),
                new Al
              }
              n.set(e, 1),
              this.hooks.execute("onMessage", t),
              this.ack({
                messageId: e,
                status: 0
              })
            } catch(e) {
              if (e instanceof Al) return logger.warn("此消息之前已接收过。", t);
              logger.error(e, t)
            }
          }
        },
        {
          key: "onLogin",
          value: function(t) {
            var e = this.commandMap;
            this.logger,
            this.bizId;
            if (e.has(dl.APP.LOGIN)) {
              var n = e.get(dl.APP.LOGIN),
              r = n.resolve,
              o = n.reject;
              0 === t.status ? r(t) : o(new Is("登录鉴权被拒绝。", null, null, t)),
              e.delete(dl.APP.LOGIN)
            }
          }
        },
        {
          key: "onTag",
          value: function(t) {
            var e = dl.APP.TAG;
            return this.takeCommand(e, t)
          }
        },
        {
          key: "onAlias",
          value: function(t) {
            var e = dl.APP.ALIAS;
            return this.takeCommand(e, t)
          }
        },
        {
          key: "takeCommand",
          value: function(t, e) {
            var n = this.commandMap;
            return this.sender.takeCommand(t).
            finally((function() {
              if (n.has(t)) {
                var r = n.get(t),
                o = r.resolve,
                i = r.reject,
                a = r.timer;
                if (a && clearTimeout(a), n.delete(t), e instanceof Error) i(e);
                else {
                  var s = e.status,
                  c = e.s;
                  Pi(c) ? 1 === s ? o(e) : i(e) : 0 === c ? o(e) : i(e)
                }
              }
            }))
          }
        },
        {
          key: "take",
          value: function(t, e) {
            var n = this.senderMap,
            r = this.sender,
            o = this.logger,
            i = this.bizId,
            a = this.deviceInfo;
            e || (e = t.m || t.messageId);
            var s = Pi(t.status) ? t.s: t.status,
            c = t.cc || 0,
            u = t.token || "";
            r.take(e).then((function(t) {
              if (t) {
                var e = t.analytics,
                n = e.startLineUpTime,
                r = e.startSendTime,
                u = e.endSendTime,
                f = e.command,
                l = e.times,
                h = a.network,
                p = a.networkType,
                d = a.platform,
                y = a.platformType,
                v = a.system,
                g = a.brand,
                m = -2 === s ? 516 : -1 === s ? 501 : 0 === s ? 200 : 201;
                f === dl.APP.SEND && (o.recordMetric(hl, 0 === s ? Math.max(0, u - r - c) : 0, {
                  status: m,
                  bizId: i,
                  network: h || p,
                  platform: d || y,
                  times: l,
                  system: v,
                  brand: g
                }), o.recordMetric(pl, 0 === s ? Math.max(0, u - n - c) : 0, {
                  status: m,
                  bizId: i,
                  network: h || p,
                  platform: d || y,
                  times: l,
                  system: v,
                  brand: g
                }))
              }
            })).
            finally((function() {
              if (n.has(e)) {
                var r = n.get(e),
                o = r.resolve,
                i = r.reject;
                if (0 === s) o(t);
                else {
                  var a = Bl.getGlobal(e, u);
                  i( - 2 === s ? new Il("消息【".concat(a, "】发送失败，Token【").concat(u, "】，失败原因: 发送次数超出预设的阈值仍未发送成功！")) : -1 === s ? new Cs("消息【".concat(a, "】发送失败，Token【").concat(u, "】，失败原因: 发送超时！")) : new Rl("消息【".concat(a, "】之前已发送成功！")))
                }
                n.delete(e)
              }
            }));
            var f = t.rt;
            this.updateRoute(f)
          }
        },
        {
          key: "send",
          value: function(t) {
            var e = this,
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return new Promise((function(r, o) {
              Pi(t) && o(new Error("待发送的消息体不能为空！"));
              var i = Vo(e.inspect(t, n), 2),
              a = i[0],
              s = i[1],
              c = e.sender,
              u = e.senderMap,
              f = e.commandMap,
              l = n.command;
              if (l && l !== dl.APP.SEND) {
                if (l === dl.APP.ALIAS || l === dl.APP.TAG) {
                  if (f.has(l)) throw new Pl;
                  f.set(l, {
                    resolve: r,
                    reject: o,
                    timer: setTimeout((function() {
                      e.takeCommand(l, new Cs)
                    }), vl.ackTimeout)
                  }),
                  c.lineUp(e.pack(s, n))
                }
              } else {
                if (u.has(a)) throw new Ol;
                u.set(a, {
                  resolve: r,
                  reject: o
                }),
                c.lineUp(e.pack(s, n))
              }
            }))
          }
        },
        {
          key: "login",
          value: function(t, e) {
            var n = this;
            return new Promise((function(r, o) {
              var i = n.sender,
              a = n.commandMap,
              s = n.route,
              c = t.bizId,
              u = (t.env, t.deviceId),
              f = t.deviceInfo,
              l = void 0 === f ? {}: f,
              h = (t.retriesOfMessage, t.sessionId),
              p = t.route,
              d = t.options,
              y = void 0 === d ? {}: d,
              v = l.system,
              g = l.platformType,
              m = l.networkType,
              b = y.extra,
              w = void 0 === b ? {}: b,
              k = y.swimlane,
              S = void 0 === k ? "": k,
              E = y.alias,
              O = void 0 === E ? "": E,
              P = y.stableToken,
              R = y.tags,
              A = Date.now(),
              T = dl.APP.LOGIN;
              a.set(dl.APP.LOGIN, {
                resolve: r,
                reject: o
              });
              var x = {
                bizId: c,
                businessId: c,
                random: A,
                stableToken: P,
                tags: R,
                appName: v,
                platform: g,
                network: m,
                deviceId: u,
                extra: w,
                swimlane: S,
                alias: O,
                sessionId: h,
                signature: jl.generate(A, c, v),
                rt: s || p
              };
              i.send(n.pack({
                command: T,
                data: x
              }), e)
            }))
          }
        },
        {
          key: "ack",
          value: function(t) {
            var e = this.sender,
            n = Vo(this.inspect(t, {
              command: dl.APP.RECEIVE_ACK
            }), 2),
            r = (n[0], n[1]);
            e.lineUp(this.pack(r))
          }
        },
        {
          key: "inspect",
          value: function(t, e) {
            if (Pi(t)) throw new xl("消息为空");
            var n = (e || {}).command,
            r = void 0 === n ? dl.APP.SEND: n,
            o = this.context,
            i = (o.token, o.sid, t.messageId);
            return r === dl.APP.ALIAS || r === dl.APP.ALIAS_ACK || r === dl.APP.TAG || r === dl.APP.TAG_ACK ? i = r: ui(t) && i || (t = {
              message: t,
              messageId: i = Bl.generate()
            }),
            [i, t = {
              command: r,
              data: t
            }]
          }
        },
        {
          key: "pack",
          value: function(t, e) {
            var n = e || {},
            r = n.v,
            o = void 0 === r ? 1 : r,
            i = n.c;
            return {
              v: o,
              c: void 0 === i ? dl.CMD.UPSTREAM: i,
              d: t
            }
          }
        },
        {
          key: "patrol",
          value: function() {
            var t = this;
            this.sender.patrol().then((function(e) {
              e.forEach((function(e) {
                t.take(e)
              }))
            }))
          }
        },
        {
          key: "lock",
          value: function() {
            var t = this.sender,
            e = this.patrolTimer;
            e && (clearInterval(e), this.patrolTimer = null),
            t.lock = !0,
            delete t.extra.token
          }
        },
        {
          key: "unlock",
          value: function() {
            var t = this,
            e = this.sender,
            n = this.patrolTimer,
            r = this.context.options,
            o = r.ackTimeout;
            r.maxRetriesOfMessage;
            n && clearInterval(n),
            e.lock = !1,
            e.flush(),
            this.patrolTimer = setInterval((function() {
              t.patrol()
            }), o || vl.ackTimeout)
          }
        },
        {
          key: "close",
          value: function() {
            var t = this.sender,
            e = this.senderMap,
            n = this.commandMap,
            r = this.logger,
            o = this.bizId,
            i = this.deviceInfo,
            a = i.network,
            s = i.networkType,
            c = i.platform,
            u = i.platformType,
            f = i.system,
            l = i.brand;
            t.buffer.forEach((function(t) {
              var i = t.analytics,
              h = i.messageId,
              p = i.command,
              d = i.times,
              y = (i.endSendTime, i.startLineUpTime, i.startSendTime, t.d.data.token),
              v = 0 === d ? 501 : 502;
              if (p === dl.APP.SEND) {
                if (r.recordMetric(hl, 0, {
                  status: v,
                  bizId: o,
                  network: a || s,
                  platform: c || u,
                  times: d,
                  system: f,
                  brand: l
                }), r.recordMetric(pl, 0, {
                  status: v,
                  bizId: o,
                  network: a || s,
                  platform: c || u,
                  times: d,
                  system: f,
                  brand: l
                }), e.has(h)) {
                  var g = Bl.getGlobal(h, y),
                  m = e.get(h);
                  m.resolve; (0, m.reject)(new _l("消息【".concat(g, "】发送失败，失败原因: Pike 已关闭。"))),
                  e.delete(h)
                }
              } else if ((p === dl.APP.TAG || p === dl.APP.ALIAS) && n.has(p)) {
                var b = Bl.getGlobal(h, y),
                w = n.get(p);
                w.resolve; (0, w.reject)(new _l("消息【".concat(b, "】发送失败，失败原因: Pike 已关闭。"))),
                n.delete(p)
              }
            })),
            t.buffer.clear(),
            e.clear(),
            n.clear()
          }
        },
        {
          key: "setContext",
          value: function(t) {
            this.context = t;
            var e = this.sender,
            n = t.token,
            r = t.stableToken,
            o = (t.sid, t.options);
            e.extra = {
              token: n,
              stableToken: r
            },
            Bl.seed = n,
            e.options = o;
            var i = o.winSize,
            a = o.rt;
            this.sender.buffer.winSize = Math.abs(i || ml.LINKLIST_WIN_SIZE),
            this.updateRoute(a)
          }
        },
        {
          key: "setSocket",
          value: function(t) {
            this.sender.socket = t
          }
        },
        {
          key: "updateRoute",
          value: function(t) {
            t && t !== this.route && (this.route = t, this.sender.extra.rt = t, this.actions.updateRoute(t))
          }
        }]),
        t
      } ();
      function Ul() {
        return !! Gu.isMiniProgram() || !!Gu.isWeb() &&
        function() {
          var t = "".concat(xi, "_local_test");
          try {
            localStorage.setItem(t, !0),
            localStorage.removeItem(t)
          } catch(t) {
            return ! 1
          }
          return ! 0
        } ()
      }
      var Fl = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          var t;
          po(this, n);
          for (var r = arguments.length,
          o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
          return Oo(go(t = e.call.apply(e, [this].concat(o))), "isSupport", Ul()),
          t
        }
        return vo(n, [{
          key: "isSupportStorage",
          value: function() {
            return this.isSupport
          }
        },
        {
          key: "querySync",
          value: function(t) {
            var e = Gu.localStorage.getItem(t);
            try {
              return JSON.parse(e)
            } catch(t) {
              return e
            }
          }
        },
        {
          key: "updateSync",
          value: function(t, e) {
            return Gu.localStorage.setItem(t, JSON.stringify(e)),
            e
          }
        }]),
        n
      } (ji);
      function zl() {
        return !! Gu.isWeb() &&
        function() {
          var t = "".concat(_i, "_session_test");
          try {
            sessionStorage.setItem(t, !0),
            sessionStorage.removeItem(t)
          } catch(t) {
            return ! 1
          }
          return ! 0
        } ()
      }
      var Jl = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          var t;
          po(this, n);
          for (var r = arguments.length,
          o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
          return Oo(go(t = e.call.apply(e, [this].concat(o))), "isSupport", zl()),
          Oo(go(t), "data", {}),
          t
        }
        return vo(n, [{
          key: "isSupportStorage",
          value: function() {
            return this.isSupport
          }
        },
        {
          key: "querySync",
          value: function(t) {
            var e = Gu.sessionStorage;
            if (!e) return this.data[t];
            var n = e.getItem(t);
            try {
              return JSON.parse(n)
            } catch(t) {
              return n
            }
          }
        },
        {
          key: "updateSync",
          value: function(t, e) {
            var n = Gu.sessionStorage;
            return n ? (n.setItem(t, JSON.stringify(e)), e) : (this.data[t] = e, e)
          }
        }]),
        n
      } (ji),
      Vl = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t, r, o, i) {
          var a;
          return po(this, n),
          Oo(go(a = e.call(this)), "logger", of.getLogger()),
          a.pike = t,
          a.storage = r,
          a.router = o,
          a.messageBroker = i,
          a
        }
        return vo(n, [{
          key: "onStart",
          value: function(t) {
            var e = this.logger,
            n = this.pike,
            r = t.bizId,
            o = (t.env, Gu.getDeviceInfoSync()),
            i = o.platform,
            a = o.platformType,
            s = o.system,
            c = o.brand,
            u = o.network,
            f = o.networkType;
            return e.recordMetric(il, 1, {
              bizId: r,
              version: ml.SDK_VERSION
            }),
            e.recordMetric(al, 1, {
              status: Ul() ? 200 : 500,
              bizId: r,
              system: s,
              brand: c,
              platform: i || platfromType,
              local: Ul() ? 200 : 500,
              session: zl() ? 200 : 500,
              cookie: Ii() ? 200 : 500
            }),
            e.recordMetric(sl, 1, {
              platform: i || a,
              system: s,
              brand: c,
              bizId: r
            }),
            e.recordMetric(cl, 1, {
              network: u || f,
              bizId: r
            }),
            t.analytics.origin = "start",
            t.analytics.startTime = Date.now(),
            n.invoke("start"),
            ni(ni({},
            t), {},
            {
              deviceInfo: o
            })
          }
        },
        {
          key: "onPending",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onRouting",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onRouteSucc",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onRouteErr",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onRoute",
          value: function(t, e) {
            var n = this.pike,
            r = e.data;
            return n.invoke("route", ta(r)),
            t
          }
        },
        {
          key: "onRouteFail",
          value: function(t, e) {
            var n = this.pike,
            r = e.data;
            return n.invoke("routeFail", r),
            t
          }
        },
        {
          key: "onRouteRevoke",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onRouteClose",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "beforeOpen",
          value: function(t, e) {
            var n = this.pike.invokeSync("beforeOpen"),
            r = t.options,
            o = t.bizId,
            i = n || {},
            a = i.headers,
            s = void 0 === a ? r.headers || {}: a,
            c = i.query,
            u = void 0 === c ? r.query || {}: c,
            f = i.perMessageDeflate,
            l = void 0 === f ? r.perMessageDeflate || !0 : f,
            h = i.protocols,
            p = void 0 === h ? r.protocols || [] : h,
            d = oa(i, ["headers", "query", "perMessageDeflate", "protocols"]);
            return ni(ni({},
            t), {},
            {
              options: ni(ni(ni({},
              t.options), d), {},
              {
                perMessageDeflate: l,
                query: ni(ni({},
                u), {},
                {
                  bizId: o
                }),
                protocols: p,
                extraHeaders: s
              })
            })
          }
        },
        {
          key: "onOpenSucc",
          value: function(t, e) {
            t.analytics.openStatus = 200,
            Gl(this.logger, t);
            var n = this.storage.local,
            r = t.deviceInfo.network,
            o = t.entryPoint,
            i = t.analytics,
            a = i.startOpenTime,
            s = i.endOpenTime;
            o.duration = s - a;
            var c = n.query("".concat(ml.LOADBALANCE, "_").concat(r));
            if (Ui(c)) {
              var u = c.findIndex((function(t) {
                return t && o && t.domain === o.domain
              }));
              u > -1 ? c[u] = o: c.push(o)
            } else c = [o];
            return c.sort((function(t, e) {
              return t.duration - e.duration
            })),
            n.update("".concat(ml.LOADBALANCE, "_").concat(r), c, !1, !0),
            t
          }
        },
        {
          key: "onOpenErr",
          value: function(t, e) {
            t.analytics.openStatus = 411,
            Gl(this.logger, t);
            var n = this.storage.local,
            r = t.deviceInfo.network,
            o = t.entryPoint,
            i = n.query("".concat(ml.LOADBALANCE, "_").concat(r));
            if (Ui(i)) {
              var a = i.findIndex((function(t) {
                return t && o && t.domain === o.domain
              }));
              a > -1 && i.splice(a, 1)
            } else i = null;
            return n.update("".concat(ml.LOADBALANCE, "_").concat(r), i, !1, !0),
            t
          }
        },
        {
          key: "onOpenTimeout",
          value: function(t, e) {
            return t.analytics.openStatus = 400,
            Gl(this.logger, t),
            t
          }
        },
        {
          key: "onOpenFail",
          value: function(t, e) {
            var n = this.pike,
            r = e.data;
            return n.invoke("openFail", r),
            t
          }
        },
        {
          key: "onOpen",
          value: function(t, e, n) {
            var r = this,
            o = this.logger,
            i = this.pike,
            a = t.socket,
            s = t.entryPoint,
            c = e.data;
            return a && (a.on("error", (function(t) {
              o.recordApi(s.domain, 0, 411, t, "pike socket error"),
              n.send({
                type: ms,
                payload: t
              })
            })), a.on("close", (function(t) {
              o.warn("socket close!", t, s, n),
              n.send({
                type: ms,
                payload: t
              })
            })), a.on("data", (function(t) {
              r.messageBroker.receive(t)
            }))),
            i.invoke("open", ni({},
            c)),
            t
          }
        },
        {
          key: "beforeLogin",
          value: function(t, e) {
            var n = this.pike.invokeSync("beforeLogin");
            return ni(ni({},
            t), {},
            {
              options: ni(ni({},
              t.options), n ? {
                extra: ni({},
                n)
              }: {})
            })
          }
        },
        {
          key: "onLoginSucc",
          value: function(t, e) {
            t.analytics.loginStatus = 200,
            ql(this.logger, t);
            var n = e.data,
            r = n.defaultTimeout,
            o = n.maxTimeout,
            i = (n.minTimeout, n.maxConnectRetry),
            a = n.maxMessageRetry,
            s = n.maxConnectInterval,
            c = (n.serverTime, n.token),
            u = n.stableToken,
            f = n.deviceId,
            l = n.sessionId,
            h = n.messageWindow,
            p = n.messageRetryInternal,
            d = n.rt,
            y = t.options,
            v = ni(ni({},
            oa(t, ["options"])), {},
            {
              options: ni(ni({},
              y), {},
              {
                timeout: r,
                ackTimeout: Math.min(p, vl.ackTimeout, o),
                coolingTimeOfReconnection: 1,
                maxCoolingTimeOfReconnection: s,
                maxRetriesOfReconnection: i,
                maxRetriesOfMessage: a,
                winSize: h,
                rt: d
              }),
              token: c,
              stableToken: u,
              deviceId: f,
              sessionId: l
            });
            return this.messageBroker.setContext(v),
            v
          }
        },
        {
          key: "onLoginErr",
          value: function(t, e) {
            return t.analytics.loginStatus = 517,
            ql(this.logger, t),
            t
          }
        },
        {
          key: "onLoginTimeout",
          value: function(t, e) {
            return t.analytics.loginStatus = 511,
            ql(this.logger, t),
            t
          }
        },
        {
          key: "onLoginDenied",
          value: function(t, e) {
            var n = this.logger;
            this.storage.session;
            return t.analytics.loginStatus = 512,
            ql(n, t),
            t
          }
        },
        {
          key: "onLoginFail",
          value: function(t, e) {
            var n = this.pike,
            r = e.data;
            return n.invoke("loginFail", r),
            t
          }
        },
        {
          key: "onLoginExceed",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onLogin",
          value: function(t, e) {
            var n = this.pike,
            r = e.data;
            n.invoke("login", ni({},
            r));
            var o = this.storage,
            i = o.session,
            a = o.local,
            s = r || t,
            c = s.deviceId,
            u = s.sessionId;
            return i.update("".concat(ml.SESSIONID), u, !1, !1),
            a.update("".concat(ml.DEVICEID), c, !1, !1),
            t
          }
        },
        {
          key: "onConnectionReady",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onConnectionRevoke",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onConnectionDisconnect",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onConnectionRestart",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onConnectionClose",
          value: function(t, e) {
            var n = t.socket,
            r = t.entryPoint;
            if (n) {
              delete t.socket;
              try {
                n.close()
              } catch(t) {
                this.logger.warn("关闭Socket连接出错!", t)
              }
              try {
                n.off("error"),
                n.off("close"),
                n.off("handshake"),
                n.off("open"),
                n.off("data"),
                n.off("ping"),
                n.off("pong"),
                n.off()
              } catch(t) {
                this.logger.warn("解除注册Socket事件出错!", t)
              }
              this.logger.warn("强制关闭连接并回收资源。", "EntryPoint：".concat(JSON.stringify(r), "。"))
            }
            return t
          }
        },
        {
          key: "onCompete",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onCompeteFail",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onConnectFail",
          value: function(t, e) {
            var n = this.pike;
            "ready" === t.analytics.origin && (t.analytics.startTime = Date.now(), t.analytics.endTime = null, t.analytics.origin = "start");
            var r = e.data;
            return n.invoke("connectFail", r),
            t
          }
        },
        {
          key: "onConnect",
          value: function(t, e) {
            var n = this.pike,
            r = e.data;
            return n.invoke("connect", ni({},
            r)),
            t
          }
        },
        {
          key: "onReady",
          value: function(t, e) {
            t.analytics.endTime = Date.now();
            var n = t.analytics,
            r = t.bizId,
            o = t.retriesOfReconnection,
            i = t.deviceInfo,
            a = i.network,
            s = i.networkType,
            c = i.platform,
            u = i.platfromType,
            f = i.system,
            l = i.brand,
            h = n.startTime,
            p = n.endTime,
            d = n.origin;
            this.logger.recordMetric(fl, p - h, {
              status: 200,
              bizId: r,
              times: ("start" === d ? 1 : 0) + o,
              network: a || s,
              system: f,
              brand: l,
              platform: c || u
            }),
            t.analytics.origin = "ready";
            var y = t.connection.ref._state.context.socket;
            return this.messageBroker.setSocket(y),
            this.messageBroker.unlock(),
            this.pike.invoke("ready"),
            t
          }
        },
        {
          key: "onReadyExit",
          value: function(t, e) {
            var n = this.pike;
            this.messageBroker.lock(),
            n.invoke("readyExit")
          }
        },
        {
          key: "onMessage",
          value: function(t) {
            var e = this.pike,
            n = t.message,
            r = t.messageId,
            o = t.token;
            oa(t, ["message", "messageId", "token"]);
            return e.invoke("message", n, {
              messageId: r,
              token: o
            })
          }
        },
        {
          key: "onDisconnect",
          value: function(t, e) {
            "ready" === t.analytics.origin && (t.analytics.startTime = Date.now(), t.analytics.endTime = null, t.analytics.origin = "start");
            var n = e.data;
            return this.pike.invoke("disconnect", ni({},
            n)),
            t
          }
        },
        {
          key: "onSleep",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onReconnectExceed",
          value: function(t, e) {
            t.analytics.endTime = Date.now();
            var n = t.analytics,
            r = t.bizId,
            o = t.retriesOfReconnection,
            i = t.deviceInfo,
            a = i.network,
            s = i.networkType,
            c = i.platform,
            u = i.platfromType,
            f = i.system,
            l = i.brand,
            h = t.options,
            p = h.maxRetriesOfReconnection,
            d = h.minAliveDuration,
            y = t.allEntryPoints,
            v = n.startTime,
            g = n.endTime,
            m = this.logger,
            b = this.pike;
            0 === p && 0 === d || m.recordMetric(fl, g - v, {
              status: 514,
              bizId: r,
              times: o,
              network: a || s,
              system: f,
              brand: l,
              platform: c || u
            });
            var w = b.router;
            w && y.length > 0 && y.forEach((function(e) {
              try {
                var n = e.domain;
                w.healthCheck(t, n).
                catch((function(t) {}))
              } catch(t) {}
            }));
            return b.invoke("exit", "超出最大重连次数或者超出最小存活时间进而导致关闭！"),
            t
          }
        },
        {
          key: "onReconnect",
          value: function(t, e) {
            return this.pike.invoke("reconnect"),
            t
          }
        },
        {
          key: "onRestart",
          value: function(t, e) {
            return this.pike.invoke("restart"),
            t
          }
        },
        {
          key: "onRevoke",
          value: function(t, e) {
            var n = this.pike,
            r = e.data;
            return n.invoke("revoke", ni({},
            r)),
            t
          }
        },
        {
          key: "onClose",
          value: function(t, e) {
            var n = this.pike,
            r = e.data;
            return n.invoke("close", ni({},
            r)),
            n.invoke("stop", ni({},
            r)),
            this.messageBroker.close(),
            t
          }
        }]),
        n
      } (xs);
      function ql(t, e) {
        e.analytics.endLoginTime = Date.now();
        var n = e.analytics,
        r = e.bizId,
        o = e.deviceInfo,
        i = o.network,
        a = o.networkType,
        s = o.platform,
        c = o.platfromType,
        u = o.system,
        f = o.brand,
        l = n.loginStatus,
        h = n.startLoginTime,
        p = n.endLoginTime,
        d = n.times;
        t.recordMetric(ll, p - h, {
          status: l,
          bizId: r,
          times: d,
          network: i || a,
          system: u,
          brand: f,
          platform: s || c
        })
      }
      function Gl(t, e) {
        e.analytics.endOpenTime = Date.now();
        var n = e.analytics,
        r = e.bizId,
        o = e.deviceInfo,
        i = o.network,
        a = o.networkType,
        s = o.platform,
        c = o.platfromType,
        u = o.system,
        f = o.brand,
        l = n.openStatus,
        h = n.startOpenTime,
        p = n.endOpenTime;
        t.recordMetric(ul, p - h, {
          status: l,
          bizId: r,
          network: i || a,
          system: u,
          brand: f,
          platform: s || c
        })
      }
      var Kl = Object.freeze({
        __proto__: null,
      default:
        function() {}
      }),
      // Wl = t.WebSocket || t.MozWebSocket;
      // Wl = WebSocket;
      Wl = _ws;
      function Yl(t) {
        return t && t.
      default || t
      }
      var Hl = Yl(Object.freeze({
        __proto__: null,
      default:
        Zi
      })),
      Ql = Xl;
      function Xl(t) {
        this.path = t.path,
        this.hostname = t.hostname,
        this.port = t.port,
        this.secure = t.secure,
        this.query = t.query,
        this.timestampParam = t.timestampParam,
        this.timestampRequests = t.timestampRequests,
        this.readyState = "",
        this.agent = t.agent || !1,
        this.socket = t.socket,
        this.enablesXDR = t.enablesXDR,
        this.withCredentials = t.withCredentials,
        this.pfx = t.pfx,
        this.key = t.key,
        this.passphrase = t.passphrase,
        this.cert = t.cert,
        this.ca = t.ca,
        this.ciphers = t.ciphers,
        this.rejectUnauthorized = t.rejectUnauthorized,
        this.forceNode = t.forceNode,
        this.isReactNative = t.isReactNative,
        this.extraHeaders = t.extraHeaders,
        this.localAddress = t.localAddress
      }
      Hl(Xl.prototype),
      Xl.prototype.onError = function(t, e) {
        var n = new Error(t);
        return n.type = "TransportError",
        n.description = e,
        this.emit("error", n),
        this
      },
      Xl.prototype.open = function() {
        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()),
        this
      },
      Xl.prototype.close = function() {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()),
        this
      },
      Xl.prototype.send = function(t) {
        if ("open" !== this.readyState) throw new Error("Transport not open");
        this.write(t)
      },
      Xl.prototype.onOpen = function() {
        this.readyState = "open",
        this.writable = !0,
        this.emit("open")
      },
      Xl.prototype.onData = function(t) {
        var e = ol.decodePacket(t, this.socket.binaryType);
        this.onPacket(e)
      },
      Xl.prototype.onPacket = function(t) {
        this.emit("packet", t)
      },
      Xl.prototype.onClose = function() {
        this.readyState = "closed",
        this.emit("close")
      };
      var $l, Zl = function(t) {
        var e = "";
        for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
        return e
      },
      th = function(t) {
        for (var e = {},
        n = t.split("&"), r = 0, o = n.length; r < o; r++) {
          var i = n[r].split("=");
          e[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
        }
        return e
      },
      eh = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
      nh = {},
      rh = 0,
      oh = 0;
      function ih(t) {
        var e = "";
        do {
          e = eh[t % 64] + e, t = Math.floor(t / 64)
        } while ( t > 0 );
        return e
      }
      function ah() {
        var t = ih( + new Date);
        return t !== $l ? (rh = 0, $l = t) : t + "." + ih(rh++)
      }
      for (; oh < 64; oh++) nh[eh[oh]] = oh;
      ah.encode = ih,
      ah.decode = function(t) {
        var e = 0;
        for (oh = 0; oh < t.length; oh++) e = 64 * e + nh[t.charAt(oh)];
        return e
      };
      var sh = ah;
      var ch, uh, fh = Yl(Object.freeze({
        __proto__: null,
      default:
        function(t) {
          return function() {
            var e = of.getLogger(t);
            e.debug.apply(e, arguments)
          }
        }
      })),
      lh = fh("engine.io-client:websocket");
      if (void 0 !== Wl ? ch = Wl: void 0 !== Qo && (ch = WebSocket), void 0 !== t) try {
        uh = null
      } catch(t) {}
      // WebSocket
      var hh = ch || uh,
      ph = dh;
      function dh(t) {
        t && t.forceBase64 && (this.supportsBinary = !1),
        this.perMessageDeflate = t.perMessageDeflate,
        this.usingBrowserWebSocket = ch && !t.forceNode,
        this.protocols = t.protocols,
        this.usingBrowserWebSocket || (hh = uh),
        Ql.call(this, t)
      } !
      function(t, e) {
        var n = function() {};
        n.prototype = e.prototype,
        t.prototype = new n,
        t.prototype.constructor = t
      } (dh, Ql),
      dh.prototype.name = "websocket",
      dh.prototype.supportsBinary = !0,
      dh.prototype.doOpen = function() {
        if (this.check()) {
          var t = this.uri(),
          e = this.protocols,
          n = {};
          this.isReactNative || (n.agent = this.agent, n.perMessageDeflate = this.perMessageDeflate, n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized),
          this.extraHeaders && (n.headers = this.extraHeaders),
          this.localAddress && (n.localAddress = this.localAddress);
          try {
            this.ws = new _ws(t);//this.usingBrowserWebSocket && !this.isReactNative ? e ? new hh(t, e) : new hh(t) : new hh(t, e, n)
            console_.log("addEventListeners")
            this.ws.on('open', () => {
              this.onOpen();
            })
            this.ws.on('close', () => {
              this.onClose();
            })
            this.ws.on('message', (e) => {
              // console.log('raw <==', e);
              this.onData(e);
            })
            this.ws.on('error', (e) => {
              this.onError(e);
            })
            // this.ws.send_ = this.ws.send;
            // this.ws.send = (e) => {
            //   conosole.log('raw ==>', e)
            //   this.ws.send_(e)
            // }

            // var tt = this;
            // this.ws.onopen = function() {
            //   tt.onOpen()
            // },
            // this.ws.onclose = function() {
            //   tt.onClose()
            // },
            // this.ws.onmessage = function(e) {
            //   tt.onData(e.data)
            // },
            // this.ws.onerror = function(e) {
            //   tt.onError("websocket error", e)
            // }
          } catch(t) {
            return this.emit("error", t)
          }
          void 0 === this.ws.binaryType && (this.supportsBinary = !1),
          this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer"
          // this.addEventListeners()
        }
      },
      dh.prototype.addEventListeners = function() {
        console_.log("addEventListeners")
        var t = this;
        this.ws.onopen = function() {
          t.onOpen()
        },
        this.ws.onclose = function() {
          t.onClose()
        },
        this.ws.onmessage = function(e) {
          t.onData(e.data)
        },
        this.ws.onerror = function(e) {
          t.onError("websocket error", e)
        }
      },
      dh.prototype.write = function(t) {
        var e = this;
        this.writable = !1;
        for (var r = t.length,
        o = 0,
        i = r; o < i; o++) !
        function(t) {
          ol.encodePacket(t, e.supportsBinary, (function(o) {
            if (!e.usingBrowserWebSocket) {
              var i = {};
              if (t.options && (i.compress = t.options.compress), e.perMessageDeflate)("string" == typeof o ? n.byteLength(o) : o.length) < e.perMessageDeflate.threshold && (i.compress = !1)
            }
            try {
              // e.usingBrowserWebSocket ? e.ws.send(o) : e.ws.send(o, i)
              e.ws.send(o);
              // console.log("raw ==>", o)
            } catch(t) {
              lh("websocket closed before onclose event")
            }--r || a()
          }))
        } (t[o]);
        function a() {
          e.emit("flush"),
          setTimeout((function() {
            e.writable = !0,
            e.emit("drain")
          }), 0)
        }
      },
      dh.prototype.onClose = function() {
        Ql.prototype.onClose.call(this)
      },
      dh.prototype.doClose = function() {
        void 0 !== this.ws && this.ws.close()
      },
      dh.prototype.uri = function() {
        var t = this.query || {},
        e = this.secure ? "wss": "ws",
        n = "";
        return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (n = ":" + this.port),
        this.timestampRequests && (t[this.timestampParam] = sh()),
        this.supportsBinary || (t.b64 = 1),
        (t = Zl(t)).length && (t = "?" + t),
        e + "://" + ( - 1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]": this.hostname) + n + this.path + t
      },
      dh.prototype.check = function() {
        return ! (!hh || "__initialize" in hh && this.name === dh.prototype.name)
      };
      var yh = Yl(Kl);
      var vh = {
        polling: function(t) {
          var e = !1,
          n = !1,
          r = !1 !== t.jsonp;
          if (void 0 !== Ho) {
            var o = "https:" === Ho.protocol,
            i = Ho.port;
            i || (i = o ? 443 : 80),
            e = t.hostname !== Ho.hostname || i !== t.port,
            n = t.secure !== o
          }
          if (t.xdomain = e, t.xscheme = n, "open" in new yh(t) && !t.forceJSONP) return new yh(t);
          if (!r) throw new Error("JSONP disabled");
          return new yh(t)
        },
        websocket: ph
      },
      gh = [].indexOf,
      mh = function(t, e) {
        if (gh) return t.indexOf(e);
        for (var n = 0; n < t.length; ++n) if (t[n] === e) return n;
        return - 1
      },
      bh = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
      wh = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
      kh = function(t) {
        var e = t,
        n = t.indexOf("["),
        r = t.indexOf("]"); - 1 != n && -1 != r && (t = t.substring(0, n) + t.substring(n, r).replace(/:/g, ";") + t.substring(r, t.length));
        for (var o = bh.exec(t || ""), i = {},
        a = 14; a--;) i[wh[a]] = o[a] || "";
        return - 1 != n && -1 != r && (i.source = e, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0),
        i.pathNames = function(t, e) {
          var n = e.replace(/\/{2,9}/g, "/").split("/");
          "/" != e.substr(0, 1) && 0 !== e.length || n.splice(0, 1);
          "/" == e.substr(e.length - 1, 1) && n.splice(n.length - 1, 1);
          return n
        } (0, i.path),
        i.queryKey = function(t, e) {
          var n = {};
          return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function(t, e, r) {
            e && (n[e] = r)
          })),
          n
        } (0, i.query),
        i
      };
      var Sh = fh("engine.io-client:socket"),
      Eh = Oh;
      function Oh(t, e) {
        if (! (this instanceof Oh)) return new Oh(t, e);
        e = e || {},
        t && "object" === u(t) && (e = t, t = null),
        t ? (t = kh(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = kh(e.host).host),
        this.secure = null != e.secure ? e.secure: void 0 !== Ho && "https:" === Ho.protocol,
        e.hostname && !e.port && (e.port = this.secure ? "443": "80"),
        this.agent = e.agent || !1,
        this.hostname = e.hostname || (void 0 !== Ho ? Ho.hostname: "localhost"),
        this.port = e.port || (void 0 !== Ho && Ho.port ? Ho.port: this.secure ? 443 : 80),
        this.query = e.query || {},
        "string" == typeof this.query && (this.query = th(this.query)),
        this.upgrade = !1 !== e.upgrade,
        this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/",
        this.forceJSONP = !!e.forceJSONP,
        this.jsonp = !1 !== e.jsonp,
        this.forceBase64 = !!e.forceBase64,
        this.enablesXDR = !!e.enablesXDR,
        this.withCredentials = !1 !== e.withCredentials,
        this.timestampParam = e.timestampParam || "t",
        this.timestampRequests = e.timestampRequests,
        this.transports = e.transports || ["polling", "websocket"],
        this.transportOptions = e.transportOptions || {},
        this.readyState = "",
        this.writeBuffer = [],
        this.prevBufferLen = 0,
        this.policyPort = e.policyPort || 843,
        this.rememberUpgrade = e.rememberUpgrade || !1,
        this.binaryType = null,
        this.onlyBinaryUpgrades = e.onlyBinaryUpgrades,
        this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}),
        !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
        this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
        this.pfx = e.pfx || null,
        this.key = e.key || null,
        this.passphrase = e.passphrase || null,
        this.cert = e.cert || null,
        this.ca = e.ca || null,
        this.ciphers = e.ciphers || null,
        this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized,
        this.forceNode = !!e.forceNode,
        this.isReactNative = void 0 !== Yo && "string" == typeof Yo.product && "reactnative" === Yo.product.toLowerCase(),
        (void 0 === Qo || this.isReactNative) && (e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders = e.extraHeaders), e.localAddress && (this.localAddress = e.localAddress)),
        this.id = null,
        this.upgrades = null,
        this.pingInterval = null,
        this.pingTimeout = null,
        this.pingIntervalTimer = null,
        this.pingTimeoutTimer = null,
        this.open()
      }
      Oh.priorWebsocketSuccess = !1,
      Hl(Oh.prototype),
      Oh.protocol = ol.protocol,
      Oh.Socket = Oh,
      Oh.Transport = Ql,
      Oh.transports = vh,
      Oh.parser = ol,
      Oh.prototype.createTransport = function(t) {
        Sh('creating transport "%s"', t);
        var e = function(t) {
          var e = {};
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          return e
        } (this.query);
        e.EIO = ol.protocol,
        e.transport = t;
        var n = this.transportOptions[t] || {};
        return this.id && (e.sid = this.id),
        new vh[t]({
          query: e,
          socket: this,
          agent: n.agent || this.agent,
          hostname: n.hostname || this.hostname,
          port: n.port || this.port,
          secure: n.secure || this.secure,
          path: n.path || this.path,
          forceJSONP: n.forceJSONP || this.forceJSONP,
          jsonp: n.jsonp || this.jsonp,
          forceBase64: n.forceBase64 || this.forceBase64,
          enablesXDR: n.enablesXDR || this.enablesXDR,
          withCredentials: n.withCredentials || this.withCredentials,
          timestampRequests: n.timestampRequests || this.timestampRequests,
          timestampParam: n.timestampParam || this.timestampParam,
          policyPort: n.policyPort || this.policyPort,
          pfx: n.pfx || this.pfx,
          key: n.key || this.key,
          passphrase: n.passphrase || this.passphrase,
          cert: n.cert || this.cert,
          ca: n.ca || this.ca,
          ciphers: n.ciphers || this.ciphers,
          rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
          perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
          extraHeaders: n.extraHeaders || this.extraHeaders,
          forceNode: n.forceNode || this.forceNode,
          localAddress: n.localAddress || this.localAddress,
          requestTimeout: n.requestTimeout || this.requestTimeout,
          protocols: n.protocols || void 0,
          isReactNative: this.isReactNative
        })
      },
      Oh.prototype.open = function() {
        var t;
        if (this.rememberUpgrade && Oh.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket";
        else {
          if (0 === this.transports.length) {
            var e = this;
            return void setTimeout((function() {
              e.emit("error", "No transports available")
            }), 0)
          }
          t = this.transports[0]
        }
        this.readyState = "opening";
        try {
          t = this.createTransport(t)
        } catch(t) {
          return this.transports.shift(),
          void this.open()
        }
        t.open(),
        this.setTransport(t)
      },
      Oh.prototype.setTransport = function(t) {
        Sh("setting transport %s", t.name);
        var e = this;
        this.transport && (Sh("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()),
        this.transport = t,
        t.on("drain", (function() {
          e.onDrain()
        })).on("packet", (function(t) {
          e.onPacket(t)
        })).on("error", (function(t) {
          e.onError(t)
        })).on("close", (function() {
          e.onClose("transport close")
        }))
      },
      Oh.prototype.probe = function(t) {
        Sh('probing transport "%s"', t);
        var e = this.createTransport(t, {
          probe: 1
        }),
        n = !1,
        r = this;
        function o() {
          if (r.onlyBinaryUpgrades) {
            var o = !this.supportsBinary && r.transport.supportsBinary;
            n = n || o
          }
          n || (Sh('probe transport "%s" opened', t), e.send([{
            type: "ping",
            data: "probe"
          }]), e.once("packet", (function(o) {
            if (!n) if ("pong" === o.type && "probe" === o.data) {
              if (Sh('probe transport "%s" pong', t), r.upgrading = !0, r.emit("upgrading", e), !e) return;
              Oh.priorWebsocketSuccess = "websocket" === e.name,
              Sh('pausing current transport "%s"', r.transport.name),
              r.transport.pause((function() {
                n || "closed" !== r.readyState && (Sh("changing transport and sending upgrade packet"), f(), r.setTransport(e), e.send([{
                  type: "upgrade"
                }]), r.emit("upgrade", e), e = null, r.upgrading = !1, r.flush())
              }))
            } else {
              Sh('probe transport "%s" failed', t);
              var i = new Error("probe error");
              i.transport = e.name,
              r.emit("upgradeError", i)
            }
          })))
        }
        function i() {
          n || (n = !0, f(), e.close(), e = null)
        }
        function a(n) {
          var o = new Error("probe error: " + n);
          o.transport = e.name,
          i(),
          Sh('probe transport "%s" failed because of error: %s', t, n),
          r.emit("upgradeError", o)
        }
        function s() {
          a("transport closed")
        }
        function c() {
          a("socket closed")
        }
        function u(t) {
          e && t.name !== e.name && (Sh('"%s" works - aborting "%s"', t.name, e.name), i())
        }
        function f() {
          e.removeListener("open", o),
          e.removeListener("error", a),
          e.removeListener("close", s),
          r.removeListener("close", c),
          r.removeListener("upgrading", u)
        }
        Oh.priorWebsocketSuccess = !1,
        e.once("open", o),
        e.once("error", a),
        e.once("close", s),
        this.once("close", c),
        this.once("upgrading", u),
        e.open()
      },
      Oh.prototype.onOpen = function() {
        if (Sh("socket open"), this.readyState = "open", Oh.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
          Sh("starting upgrade probes");
          for (var t = 0,
          e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t])
        }
      },
      Oh.prototype.onPacket = function(t) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (Sh('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "pong":
          this.setPing(),
          this.emit("pong");
          break;
        case "error":
          var e = new Error("server error");
          e.code = t.data,
          this.onError(e);
          break;
        case "message":
          this.setPing(),
          this.emit("pong"),
          this.emit("data", t.data),
          this.emit("message", t.data)
        } else Sh('packet received with socket readyState "%s"', this.readyState)
      },
      Oh.prototype.onHandshake = function(t) {
        this.emit("handshake", t),
        this.id = t.sid,
        this.transport.query.sid = t.sid,
        this.upgrades = this.filterUpgrades(t.upgrades),
        this.pingInterval = t.pingInterval,
        this.pingTimeout = t.pingTimeout,
        this.onOpen(),
        "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
      },
      Oh.prototype.onHeartbeat = function(t) {
        clearTimeout(this.pingTimeoutTimer);
        var e = this;
        e.pingTimeoutTimer = setTimeout((function() {
          "closed" !== e.readyState && e.onClose("ping timeout")
        }), t || e.pingInterval + e.pingTimeout)
      },
      Oh.prototype.setPing = function() {
        var t = this;
        clearTimeout(t.pingIntervalTimer),
        t.pingIntervalTimer = setTimeout((function() {
          Sh("writing ping packet - expecting pong within %sms", t.pingTimeout),
          t.ping(),
          t.onHeartbeat(t.pingTimeout)
        }), t.pingInterval)
      },
      Oh.prototype.ping = function() {
        var t = this;
        this.sendPacket("ping", (function() {
          t.emit("ping")
        }))
      },
      Oh.prototype.onDrain = function() {
        this.writeBuffer.splice(0, this.prevBufferLen),
        this.prevBufferLen = 0,
        0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
      },
      Oh.prototype.flush = function() {
        "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (Sh("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
      },
      Oh.prototype.write = Oh.prototype.send = function(t, e, n) {
        return this.sendPacket("message", t, e, n),
        this
      },
      Oh.prototype.sendPacket = function(t, e, n, r) {
        if ("function" == typeof e && (r = e, e = void 0), "function" == typeof n && (r = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) { (n = n || {}).compress = !1 !== n.compress;
          var o = {
            type: t,
            data: e,
            options: n
          };
          this.emit("packetCreate", o),
          this.writeBuffer.push(o),
          r && this.once("flush", r),
          this.flush()
        }
      },
      Oh.prototype.close = function() {
        if ("opening" === this.readyState || "open" === this.readyState) {
          this.readyState = "closing";
          var t = this;
          this.writeBuffer.length ? this.once("drain", (function() {
            this.upgrading ? r() : e()
          })) : this.upgrading ? r() : e()
        }
        function e() {
          t.onClose("forced close"),
          Sh("socket closing - telling transport to close"),
          t.transport.close()
        }
        function n() {
          t.removeListener("upgrade", n),
          t.removeListener("upgradeError", n),
          e()
        }
        function r() {
          t.once("upgrade", n),
          t.once("upgradeError", n)
        }
        return this
      },
      Oh.prototype.onError = function(t) {
        Sh("socket error %j", t),
        Oh.priorWebsocketSuccess = !1,
        this.emit("error", t),
        this.onClose("transport error", t)
      },
      Oh.prototype.onClose = function(t, e) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
          Sh('socket close with reason: "%s"', t);
          clearTimeout(this.pingIntervalTimer),
          clearTimeout(this.pingTimeoutTimer),
          this.transport.removeAllListeners("close"),
          this.transport.close(),
          this.transport.removeAllListeners(),
          this.readyState = "closed",
          this.id = null,
          this.emit("close", t, e),
          this.writeBuffer = [],
          this.prevBufferLen = 0
        }
      },
      Oh.prototype.filterUpgrades = function(t) {
        for (var e = [], n = 0, r = t.length; n < r; n++)~mh(this.transports, t[n]) && e.push(t[n]);
        return e
      };
      var Ph = Eh,
      Rh = ol;
      Ph.parser = Rh;
      var Ah = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t, r, o, i) {
          var a;
          return po(this, n),
          Oo(go(a = e.call(this)), "logger", of.getLogger()),
          a.pike = t,
          a.storage = r,
          a.router = o,
          a.messageBroker = i,
          a
        }
        return vo(n, [{
          key: "routeHook",
          value: function(t) {
            var e = this.router;
            return this.pike.invoke("beforeRoute").then((function(t) {
              return e.validateProtocol(t)
            }))
          }
        },
        {
          key: "routeStorage",
          value: function(t) {
            var e = this.storage.local,
            n = this.router,
            r = t.deviceInfo.network;
            return e.query("".concat(ml.LOADBALANCE, "_").concat(r), !0).then((function(t) {
              return n.validateProtocol(t)
            }))
          }
        },
        {
          key: "routeLB",
          value: function(t) {
            var e = this.router,
            n = this.storage.local,
            r = t.deviceInfo.network;
            return e.getEntryPointsFromLB(t).then((function(t) {
              var e = n.query("".concat(ml.LOADBALANCE, "_").concat(r));
              if (Ui(e)) {
                for (var o = function(n) {
                  var r = e[n];
                  t.findIndex((function(t) {
                    return t && r && t.domain === r.domain
                  })) <= -1 && e.splice(n, 1)
                },
                i = e.length - 1; i >= 0; i--) o(i);
                n.update("".concat(ml.LOADBALANCE, "_").concat(r), e, !1, !0)
              }
              return t
            }))
          }
        },
        {
          key: "routeWhiteList",
          value: function(t) {
            var e = this.router;
            return Promise.resolve(e.getEntryPointsFromWhiteList(t))
          }
        },
        {
          key: "open",
          value: function(t, e) {
            var n = this;
            return new Promise((function(e, r) {
              var o = n.logger,
              i = t.entryPoint.domain,
              a = t.options,
              s = a.timeout,
              c = ni(ni(ni({},
              {
                autoConnect: !0
              }), a), {
                forceNew: !0,
                reconnection: !1
              }),
              u = Date.now();
              t.analytics.startOpenTime = u,
              t.analytics.openStatus = null;
              var f = null;
              try {
                var l = setTimeout((function() {
                  var t = new Cs("连接超时，超时时间为".concat(s, "ms。"));
                  o.recordApi(i, Date.now() - u, 400, t, "pike open socket"),
                  r(t)
                }), s),
                h = Ph(i, c);
                t.socket = h,
                h.on("error", (function(t) {
                  o.recordApi(i, Date.now() - u, 411, t, "pike open socket"),
                  o.warn("socket error!", t, i),
                  l && clearTimeout(l),
                  r(t)
                })),
                h.on("close", (function(t) {
                  o.warn("socket close!", t, i),
                  l && clearTimeout(l),
                  r(new Error(t))
                })),
                h.on("handshake", (function(t) {
                  f = t
                })),
                h.on("open", (function() {
                  l && clearTimeout(l),
                  h.off("close"),
                  h.off("error"),
                  e(h, f)
                }))
              } catch(t) {
                o.error("打开连接失败，失败原因: ".concat(t.message), t),
                id && clearTimeout(id),
                r(t)
              }
            }))
          }
        },
        {
          key: "login",
          value: function(t) {
            var e = this,
            n = this.storage,
            r = n.local,
            o = n.session,
            i = t.bizId,
            a = t.env,
            s = t.deviceInfo,
            c = t.retriesOfMessage,
            u = t.options,
            f = t.socket,
            l = u.ackTimeout,
            h = r.query("".concat(ml.DEVICEID)),
            p = o.query("".concat(ml.SESSIONID)),
            d = o.query("".concat(ml.ROUTE));
            return t.analytics.startLoginTime = Date.now(),
            t.analytics.loginStatus = null,
            t.analytics.times = c,
            new Promise((function(t, n) {
              var r = setTimeout((function() {
                n(new _s)
              }), l);
              e.messageBroker.login({
                bizId: i,
                env: a,
                deviceId: h,
                deviceInfo: s,
                retriesOfMessage: c,
                sessionId: p,
                route: d,
                options: u
              },
              f).then((function(e) {
                t(e)
              })).
              catch((function(t) {
                n(t)
              })).
              finally((function() {
                r && clearTimeout(r)
              }))
            }))
          }
        },
        {
          key: "send",
          value: function(t) {
            return this.messageBroker.send(t)
          }
        },
        {
          key: "alias",
          value: function(t) {
            var e = this;
            return this.messageBroker.send({
              alias: t || ""
            },
            {
              command: dl.APP.ALIAS
            }).then((function(t) {
              return e.service.send({
                type: vs,
                payload: {
                  options: {
                    alias: t.alias
                  }
                }
              }),
              t
            }))
          }
        },
        {
          key: "subscribe",
          value: function(t) {
            var e = this,
            n = t;
            if (Pi(n)) return Promise.reject(new Error("待绑定的标签不能为空！"));
            if ($o(n) && (n = [n]), !Ui(n)) throw new xl;
            return this.messageBroker.send({
              eventType: 1,
              tags: n
            },
            {
              command: dl.APP.TAG
            }).then((function(t) {
              return e.service.send({
                type: vs,
                payload: {
                  options: {
                    tags: t.tags
                  }
                }
              }),
              t
            }))
          }
        },
        {
          key: "unsubscribe",
          value: function(t) {
            var e = this,
            n = t;
            if (Pi(n)) return Promise.reject(new Error("待解除绑定的标签不能为空！"));
            if ($o(n) && (n = [n]), !Ui(n)) throw new xl;
            return this.messageBroker.send({
              eventType: 2,
              tags: n
            },
            {
              command: dl.APP.TAG
            }).then((function(t) {
              return e.service.send({
                type: vs,
                payload: {
                  options: {
                    tags: t.tags
                  }
                }
              }),
              t
            }))
          }
        },
        {
          key: "restart",
          value: function() {
            var t = this.logger;
            return this.reloadRouter(),
            this.pike.restart(),
            t.warn("收到服务端重启信令，已完成重启操作！"),
            Promise.resolve()
          }
        },
        {
          key: "close",
          value: function() {
            var t = this.logger;
            return this.pike.stop(),
            t.warn("收到服务端关闭信令，已完成关闭操作！"),
            Promise.resolve()
          }
        },
        {
          key: "reloadRouter",
          value: function() {
            var t = this.storage.local,
            e = ml.NETWORKS,
            n = ml.LOADBALANCE,
            r = ["unknown"].concat(e),
            o = [];
            return r.forEach((function(t) {
              o.push("".concat(n, "_").concat(t))
            })),
            t.clear(o),
            Promise.resolve()
          }
        },
        {
          key: "uploadLogs",
          value: function() {
            return console_.log("uploadLogs"),
            Promise.resolve()
          }
        },
        {
          key: "clock",
          value: function(t) {
            return console_.log("clock"),
            Promise.resolve()
          }
        },
        {
          key: "updateRoute",
          value: function(t) {
            this.storage.session.update("".concat(ml.ROUTE), t, !1, !1)
          }
        }]),
        n
      } (Ts),
      Th = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t, r) {
          var o;
          if (po(this, n), Oo(go(o = e.call(this)), "data", {version: ml.SDK_VERSION}), !t) throw new xl("BizId must be not null.");
          return o.bizId = t,
          o.initialize(r),
          o
        }
        return vo(n, [{
          key: "getDefaultTransports",
          value: function() {
            return ["websocket"]
          }
        },
        {
          key: "initialize",
          value: function(t) {
            var e = this;
            this.createContext(t);
            var n = this.creatPlugins(),
            r = this.createHooks(n),
            o = this.createActions(n),
            i = n.logger,
            a = n.storage,
            s = n.router,
            c = n.messageBroker,
            u = n.visibility;
            c.hooks = r,
            c.actions = o;
            var f = Vo(this.createMachine(i, o, r, a), 3),
            l = (f[0], f[1], f[2]);
            r.service = l,
            o.service = l,
            this.hooks = r,
            this.actions = o,
            this.logger = i,
            this.storage = a,
            this.router = s,
            this.service = l,
            this.visibility = u,
            this.messageBroker = c,
            this.handlers = {},
            this.options.autoConnect && setTimeout((function() {
              e.start()
            }), 0)
          }
        },
        {
          key: "createContext",
          value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = this.bizId;
            this.options = ni(ni(ni(ni(ni(ni({},
            gl), t), vl), {
              extraHeaders: t.headers || {},
              query: ni(ni({},
              t.query), {},
              {
                bizId: e
              })
            }), {
              transports: this.getDefaultTransports()
            }), Gu.isNode() ? {
              forceNode: !0
            }: {});
            var n = Gu.getDeviceInfoSync();
            this.deviceInfo = n;
            var r = this.options.env || n.env;
            "develop" !== r && "development" !== r || (r = "dev"),
            "prod" !== r && "production" !== r || (r = "product"),
            "staging" === r && (r = "stage"),
            this.env = ~ml.VALID_ENVS.indexOf(r) ? r: ml.ENV
          }
        },
        {
          key: "creatPlugins",
          value: function() {
            return {
              logger: this.createLogger(),
              storage: this.createStorage(),
              router: this.createRouter(),
              messageBroker: this.createMessageBroker(),
              visibility: this.createVisibility()
            }
          }
        },
        {
          key: "createHooks",
          value: function(t) {
            t.logger;
            var e = t.storage,
            n = t.router,
            r = t.messageBroker;
            return new Vl(this, e, n, r)
          }
        },
        {
          key: "createActions",
          value: function(t) {
            t.logger;
            var e = t.storage,
            n = t.router,
            r = t.messageBroker;
            return new Ah(this, e, n, r)
          }
        },
        {
          key: "createMachine",
          value: function(t, e, n, r) {
            var o = this.bizId,
            i = this.env,
            a = this.deviceInfo,
            s = this.options;
            return Bu({
              options: s,
              bizId: o,
              env: i,
              deviceInfo: a
            },
            {
              logger: t,
              hooks: n,
              actions: e,
              storage: r,
              autoStart: !1
            })
          }
        },
        {
          key: "createLogger",
          value: function() {
            var t = this.options,
            e = this.bizId,
            n = this.env,
            r = this.version,
            o = t.loglevel,
            i = void 0 === o ? Ku.ERROR: o;
            return of.set(i, ni(ni({},
            t), {},
            {
              bizId: e,
              env: n,
              version: r
            })),
            of.getLogger()
          }
        },
        {
          key: "createStorage",
          value: function() {
            var t = this.bizId,
            e = this.env,
            n = {
              local: null,
              session: null
            };
            return Ul() ? n.local = new Fl(t, e) : n.local = new Di(t, e),
            zl() ? n.session = new Jl(t, e) : n.session = new Di(t, e),
            n
          }
        },
        {
          key: "createRouter",
          value: function() {
            var t = this.bizId,
            e = this.env;
            return new El(t, e)
          }
        },
        {
          key: "createMessageBroker",
          value: function() {
            var t = this.bizId,
            e = this.env,
            n = this.deviceInfo;
            return new Dl(t, e, n)
          }
        },
        {
          key: "createVisibility",
          value: function() {
            return null
          }
        },
        {
          key: "isRunning",
          value: function() {
            return this.service.isRunning()
          }
        },
        {
          key: "isReady",
          value: function() {
            return ! this.messageBroker.sender.lock
          }
        },
        {
          key: "start",
          value: function() {
            this.isRunning() ? this.logger.info("pike state machine has been already in progress.") : (this.visibility && this.visibility.start(), this.service.start())
          }
        },
        {
          key: "open",
          value: function() {
            this.start()
          }
        },
        {
          key: "stop",
          value: function() {
            this.isRunning() && (this.service.send(ws), this.service.stop()),
            this.visibility && this.visibility.stop()
          }
        },
        {
          key: "close",
          value: function() {
            this.stop()
          }
        },
        {
          key: "restart",
          value: function() {
            this.stop(),
            this.start()
          }
        },
        {
          key: "destroy",
          value: function() {
            this.stop(),
            this.off()
          }
        },
        {
          key: "send",
          value: function(t, e, n) {
            return this.actions.send(t).then((function(t) {
              return Do(e) && e(t),
              t
            })).
            catch((function(t) {
              throw Do(n) && n(t),
              t
            }))
          }
        },
        {
          key: "sendMessage",
          value: function(t, e, n) {
            return this.send(t, e, n)
          }
        },
        {
          key: "alias",
          value: function(t, e, n) {
            return this.actions.alias(t).then((function(t) {
              return Do(e) && e(t),
              t
            })).
            catch((function(t) {
              throw Do(n) && n(t),
              t
            }))
          }
        },
        {
          key: "addAlias",
          value: function(t, e, n) {
            return this.alias(t, e, n)
          }
        },
        {
          key: "bindTag",
          value: function(t, e, n) {
            if (!$o(t)) throw new xl;
            return this.subscribe(t, e, n)
          }
        },
        {
          key: "unbindTag",
          value: function(t, e, n) {
            if (!$o(t)) throw new xl;
            return this.unsubscribe(t, e, n)
          }
        },
        {
          key: "bindTags",
          value: function(t, e, n) {
            if (!Ui(t)) throw new xl;
            return this.subscribe(t, e, n)
          }
        },
        {
          key: "unbindTags",
          value: function(t, e, n) {
            if (!Ui(t)) throw new xl;
            return this.unsubscribe(t, e, n)
          }
        },
        {
          key: "subscribe",
          value: function(t, e, n) {
            return this.actions.subscribe(t).then((function(t) {
              return Do(e) && e(t),
              t
            })).
            catch((function(t) {
              throw Do(n) && n(t),
              t
            }))
          }
        },
        {
          key: "unsubscribe",
          value: function(t, e, n) {
            return this.actions.unsubscribe(t).then((function(t) {
              return Do(e) && e(t),
              t
            })).
            catch((function(t) {
              throw Do(n) && n(t),
              t
            }))
          }
        },
        {
          key: "onStart",
          value: function(t) {
            this.on("start", t)
          }
        },
        {
          key: "beforeRoute",
          value: function(t) {
            this.on("beforeRoute", t)
          }
        },
        {
          key: "onRoute",
          value: function(t) {
            this.on("route", t)
          }
        },
        {
          key: "onRouteFail",
          value: function(t) {
            this.on("routeFail", t)
          }
        },
        {
          key: "beforeOpen",
          value: function(t) {
            this.on("beforeOpen", t)
          }
        },
        {
          key: "onOpen",
          value: function(t) {
            this.on("open", t)
          }
        },
        {
          key: "onOpenFail",
          value: function(t) {
            this.on("openFail", t)
          }
        },
        {
          key: "beforeLogin",
          value: function(t) {
            this.on("beforeLogin", t)
          }
        },
        {
          key: "onLogin",
          value: function(t) {
            this.on("login", t)
          }
        },
        {
          key: "onLoginFail",
          value: function(t) {
            this.on("loginFail", t)
          }
        },
        {
          key: "onConnect",
          value: function(t) {
            this.on("connect", t)
          }
        },
        {
          key: "onConnectFail",
          value: function(t) {
            this.on("connectFail", t)
          }
        },
        {
          key: "onReady",
          value: function(t) {
            this.on("ready", t)
          }
        },
        {
          key: "onReadyExit",
          value: function(t) {
            this.on("readyExit", t)
          }
        },
        {
          key: "onRestart",
          value: function(t) {
            this.on("restart", t)
          }
        },
        {
          key: "onDisconnect",
          value: function(t) {
            this.on("disconnect", t)
          }
        },
        {
          key: "onReconnect",
          value: function(t) {
            this.on("reconnect", t)
          }
        },
        {
          key: "onExit",
          value: function(t) {
            this.on("exit", t)
          }
        },
        {
          key: "onRevoke",
          value: function(t) {
            this.on("revoke", t)
          }
        },
        {
          key: "onClose",
          value: function(t) {
            this.on("close", t)
          }
        },
        {
          key: "onMessage",
          value: function(t) {
            this.on("message", t)
          }
        },
        {
          key: "invokeSync",
          value: function(t) {
            for (var e = this._callbacks,
            n = arguments.length,
            r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
            return xh.apply(void 0, [!0, e, t].concat(r))
          }
        },
        {
          key: "invoke",
          value: function(t) {
            for (var e = this._callbacks,
            n = arguments.length,
            r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
            return xh.apply(void 0, [!1, e, t].concat(r))
          }
        },
        {
          key: "version",
          get: function() {
            return this.data.version
          }
        }]),
        n
      } (Zi);
      function xh(t, e, n) {
        for (var r = arguments.length,
        o = new Array(r > 3 ? r - 3 : 0), i = 3; i < r; i++) o[i - 3] = arguments[i];
        if (!e || !e["$" + n]) return t ? null: Promise.resolve();
        var a = e["$" + n].map((function(t) {
          if (Do(t)) return t.apply(void 0, o)
        })),
        s = function(t) {
          return t.reduce((function(t, e) {
            return Pi(e) ? t: Ui(e) ? [].concat(ta(t || []), ta(e)) : ui(e) ? ni(ni({},
            t), e) : e
          }), null)
        };
        return t ? s(a) : Promise.all(a).then(s)
      }
      var _h = function() {
        function t() {
          po(this, t),
          Oo(this, "logger", of.getLogger())
        }
        return vo(t, [{
          key: "start",
          value: function() {
            Do(Go.addEventListener) && Go.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this), !1)
          }
        },
        {
          key: "stop",
          value: function() {
            Do(Go.addEventListener) && Go.removeEventListener("visibilitychange", this.handleVisibilityChange.bind(this))
          }
        },
        {
          key: "handleVisibilityChange",
          value: function() {
            this.logger.debug("当前浏览器窗口".concat(Go.hidden ? "已失去": "获得了", "焦点。"))
          }
        }]),
        t
      } (),
      Ih = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          return po(this, n),
          e.apply(this, arguments)
        }
        return vo(n, [{
          key: "createStorage",
          value: function() {
            var t = this.bizId,
            e = this.env,
            n = {
              local: null,
              session: null
            };
            return Ul() ? n.local = new Fl(t, e) : Ii() ? n.local = new Bi(t, e) : n.local = new Di(t, e),
            zl() ? n.session = new Jl(t, e) : n.session = new Di(t, e),
            n
          }
        },
        {
          key: "createVisibility",
          value: function() {
            return new _h
          }
        }]),
        n
      } (Th),
      Ch = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          return po(this, n),
          e.apply(this, arguments)
        }
        return vo(n, null, [{
          key: "isAck",
          value: function(t) {
            var e = n.APP;
            return dl.isAck(t) || t === e.SEND_ROOM_MSG_ACK || t === e.JOIN_OR_QUIT_ROOM_ACK
          }
        }]),
        n
      } (dl);
      Oo(Ch, "CMD", ni({},
      dl.CMD)),
      Oo(Ch, "APP", ni(ni({},
      dl.APP), {},
      {
        SEND_ROOM_MSG: 13,
        SEND_ROOM_MSG_ACK: 14,
        PULL_ROOM_MSG: 15,
        RECEIVE_ROOM_MSG: 16,
        JOIN_OR_QUIT_ROOM: 17,
        JOIN_OR_QUIT_ROOM_ACK: 18
      }));
      var Nh = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          return po(this, n),
          e.apply(this, arguments)
        }
        return vo(n, [{
          key: "sended",
          value: function(t) {
            var e = t.d,
            r = e.command,
            o = e.data;
            o.messageId,
            o.m;
            if (r !== Ch.APP.SEND_ROOM_MSG && r !== Ch.APP.PULL_ROOM_MSG && r !== Ch.APP.JOIN_OR_QUIT_ROOM) return Nf(wo(n.prototype), "sended", this).call(this, t);
            this.buffer.isNextCursor(t) && this.buffer.forward()
          }
        },
        {
          key: "intersection",
          value: function(t, e) {
            var n = [];
            return t.forEach((function(t) {
              var r = t.d,
              o = r.command,
              i = r.data.messageId;
              if (!Ch.isAck(o) && o !== Ch.APP.PULL_ROOM_MSG) {
                var a = e.find((function(t) {
                  return t.d.data.messageId === i
                }));
                a && n.push(a)
              }
            })),
            n
          }
        }]),
        n
      } (Ll),
      Lh = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          return po(this, n),
          e.apply(this, arguments)
        }
        return n
      } (Ml),
      Mh = Hi.getInstance(),
      jh = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n(t, r, o, i) {
          var a;
          return po(this, n),
          (a = e.call(this, t, r, o, i)).sender = new Nh,
          a.receiver = new Lh,
          a
        }
        return vo(n, [{
          key: "receive",
          value: function(t) {
            var e = this;
            return Nf(wo(n.prototype), "receive", this).call(this, t).then((function(t) {
              if (t) {
                var r = t.type,
                o = (e.receiverMap, e.commandMap, null),
                i = null,
                a = null;
                switch (r) {
                case Ch.CMD.DOWNSTREAM:
                  try {
                    switch (i = t.data.command, a = t.data.data, (o = $o(a) ? JSON.parse(a) : a).messageId, i) {
                    case Ch.APP.SEND_ROOM_MSG_ACK:
                      Nf(wo(n.prototype), "take", e).call(e, o, Mh.getShorthand(o.m || o.messageId));
                      break;
                    case Ch.APP.RECEIVE_ROOM_MSG:
                      e.onRoomMessage(o);
                      break;
                    case Ch.APP.JOIN_OR_QUIT_ROOM_ACK:
                      e.onRoom(o);
                      break;
                    case Ch.APP.SEND_ROOM_MSG:
                    case Ch.APP.PULL_ROOM_MSG:
                    case Ch.APP.JOIN_OR_QUIT_ROOM:
                    }
                  } catch(t) {}
                }
              }
              return t
            }))
          }
        },
        {
          key: "onRoomMessage",
          value: function(t) {
            var e = this,
            n = t.ms || t.messages,
            r = this.receiverMap,
            o = this.logger;
            if (Ui(n)) {
              var i = n.map((function(t) {
                var n = t.m || t.messageId,
                i = t.c || t.message,
                a = null;
                try {
                  if (!n) throw new Tl("接收的消息不符合协议");
                  if (r.has(n)) throw new Al;
                  r.set(n, 1),
                  a = {
                    messageId: n,
                    message: i
                  },
                  e.hooks.execute("onRoomMessage", a)
                } catch(e) {
                  if (e instanceof Al) return o.warn("此消息之前已接收过。", t);
                  o.error(e, t)
                }
                return a
              })).filter((function(t) {
                return !! t
              }));
              this.hooks.execute("onRoomMessages", i)
            }
            var a = Ch.APP.PULL_ROOM_MSG;
            this.takeCommand(a, t)
          }
        },
        {
          key: "onRoom",
          value: function(t) {
            var e = Ch.APP.JOIN_OR_QUIT_ROOM;
            this.takeCommand(e, t)
          }
        },
        {
          key: "send",
          value: function(t) {
            var e = this,
            r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (Pi(t)) return Promise.reject(new Error("待发送的消息体不能为空！"));
            var o = this.inspect(t, r),
            i = Vo(o, 2),
            a = i[0],
            s = i[1],
            c = this.sender,
            u = this.senderMap,
            f = this.commandMap,
            l = r.command;
            return l === Ch.APP.JOIN_OR_QUIT_ROOM || l === Ch.APP.PULL_ROOM_MSG ? new Promise((function(t, n) {
              if (f.has(l)) throw new Pl;
              f.set(l, {
                resolve: t,
                reject: n
              }),
              c.lineUp(e.pack(s, r))
            })) : l === Ch.APP.SEND_ROOM_MSG ? new Promise((function(t, n) {
              if (u.has(a)) throw new Ol;
              u.set(a, {
                resolve: t,
                reject: n
              }),
              c.lineUp(e.pack(s, r))
            })) : Nf(wo(n.prototype), "send", this).call(this, t, r)
          }
        },
        {
          key: "inspect",
          value: function(t, e) {
            if (Pi(t)) throw new xl("消息为空");
            var r = (e || {}).command,
            o = void 0 === r ? Ch.APP.SEND: r,
            i = this.context,
            a = (i.token, i.sid, null);
            return o === Ch.APP.JOIN_OR_QUIT_ROOM || o === Ch.APP.PULL_ROOM_MSG ? [a = o, {
              command: o,
              data: t
            }] : o === Ch.APP.SEND_ROOM_MSG ? ((a = t.m) || (a = Mh.generate(), t.m = a), [a, {
              command: o,
              data: t
            }]) : Nf(wo(n.prototype), "inspect", this).call(this, t, e)
          }
        },
        {
          key: "takeCommand",
          value: function(t, e) {
            var r = this.commandMap,
            o = this.sender;
            return t === Ch.APP.PULL_ROOM_MSG ? o.takeCommand(t).
            finally((function() {
              if (r.has(t)) {
                var n = r.get(t),
                o = n.resolve,
                i = n.reject;
                r.delete(t),
                e instanceof Error ? i(e) : o(e)
              }
            })) : Nf(wo(n.prototype), "takeCommand", this).call(this, t, e)
          }
        },
        {
          key: "closeRoom",
          value: function() {
            var t = this.sender,
            e = this.senderMap,
            n = this.commandMap,
            r = this.logger,
            o = this.bizId,
            i = this.deviceInfo,
            a = i.network,
            s = i.networkType,
            c = i.platform,
            u = i.platformType,
            f = i.system,
            l = i.brand,
            h = [];
            t.buffer.forEach((function(t) {
              var i = t.analytics,
              p = i.messageId,
              d = i.command,
              y = i.times,
              v = (i.endSendTime, i.startLineUpTime, i.startSendTime, t.d.data.token),
              g = 0 === y ? 501 : 502;
              if (d === Ch.APP.SEND_ROOM_MSG) {
                if (r.recordMetric(SLA.SEND, 0, {
                  status: g,
                  bizId: o,
                  network: a || s,
                  platform: c || u,
                  times: y,
                  system: f,
                  brand: l
                }), r.recordMetric(SLA.SEND_E2E, 0, {
                  status: g,
                  bizId: o,
                  network: a || s,
                  platform: c || u,
                  times: y,
                  system: f,
                  brand: l
                }), e.has(p)) {
                  var m = Mh.getGlobal(p, v),
                  b = e.get(p);
                  b.resolve; (0, b.reject)(new _l("消息【".concat(m, "】发送失败，失败原因: Pike 已关闭。"))),
                  e.delete(p)
                }
                h.push(p)
              } else if (d === Ch.APP.PULL_ROOM_MSG || d === Ch.APP.JOIN_OR_QUIT_ROOM) {
                if (n.has(d)) {
                  var w = Mh.getGlobal(p, v),
                  k = n.get(d);
                  k.resolve; (0, k.reject)(new _l("消息【".concat(w, "】发送失败，失败原因: Pike 已关闭。"))),
                  n.delete(d)
                }
                h.push(d)
              }
            })),
            h.forEach((function(e) {
              t.buffer.deleteNodeBy((function(t) {
                return t.messageId === e
              }))
            }))
          }
        }]),
        n
      } (Dl),
      Bh = ni(ni({},
      ml), {},
      {
        SDK_VERSION: "2.2.8"
      }),
      Dh = ni(ni({},
      vl), {},
      {
        pollingTimeout: 1e3,
        coolingTimeOfRoom: 100
      }),
      Uh = (ni({},
      gl),
      function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          return po(this, n),
          e.apply(this, arguments)
        }
        return vo(n, [{
          key: "onRoomMessage",
          value: function(t) {
            var e = this.pike,
            n = t.message,
            r = t.messageId,
            o = t.token;
            oa(t, ["message", "messageId", "token"]);
            return e.invoke("roomMessage", n, {
              messageId: r,
              token: o
            })
          }
        },
        {
          key: "onRoomMessages",
          value: function(t) {
            return this.pike.invoke("roomMessages", t)
          }
        },
        {
          key: "onWait",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "beforeJoin",
          value: function(t, e) {
            return ni({},
            t)
          }
        },
        {
          key: "onJoinTimeout",
          value: function(t, e) {
            return ni({},
            t)
          }
        },
        {
          key: "onJoinFail",
          value: function(t, e) {
            var n = this.logger,
            r = this.messageBroker,
            o = e.data;
            return o instanceof Error && (r.takeCommand(Ch.APP.JOIN_OR_QUIT_ROOM, o), console_.warn(o)),
            t
          }
        },
        {
          key: "onJoin",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "beforePull",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onPullTimeout",
          value: function(t, e, n) {
            return t
          }
        },
        {
          key: "onPullFail2",
          value: function(t, e) {
            this.logger;
            var n = this.messageBroker,
            r = e.data;
            return r instanceof Error ? n.takeCommand(Ch.APP.PULL_ROOM_MSG, r) : Promise.resolve()
          }
        },
        {
          key: "onPullFail",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onPull",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onRoomSleep",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "beforeQuit",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onQuitTimeout",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onQuitFail",
          value: function(t, e) {
            var n = this.logger,
            r = this.messageBroker,
            o = e.data;
            return o instanceof Error && (r.takeCommand(Ch.APP.JOIN_OR_QUIT_ROOM, o), console_.warn(o)),
            t
          }
        },
        {
          key: "onQuit",
          value: function(t, e) {
            return this.messageBroker.closeRoom(),
            t
          }
        },
        {
          key: "onRoomRevoke",
          value: function(t, e) {
            return t
          }
        },
        {
          key: "onRoomClose",
          value: function(t, e) {
            return t
          }
        }]),
        n
      } (Vl)),
      Fh = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          return po(this, n),
          e.apply(this, arguments)
        }
        return vo(n, [{
          key: "join",
          value: function(t, e) {
            var n = this,
            r = e.payload,
            o = r.roomId,
            i = r.resolve,
            a = r.reject,
            s = t.options.ackTimeout || Dh.ackTimeout;
            return new Promise((function(t, e) {
              var r = setTimeout((function() {
                var t = new Cs("加入房间超时，超时时间为".concat(s, "ms。"));
                a(t),
                e(t)
              }), s);
              n.messageBroker.send({
                r: o,
                t: 1
              },
              {
                command: Ch.APP.JOIN_OR_QUIT_ROOM
              }).then((function(e) {
                return r && clearTimeout(r),
                n.service.send({
                  type: vs,
                  payload: {
                    machine: "room",
                    room: {
                      roomId: e.r,
                      offsets: [ - 1, -1],
                      pollingTimeout: Dh.pollingTimeout
                    }
                  }
                }),
                i(e),
                t(e),
                e
              })).
              catch((function(t) {
                r && clearTimeout(r),
                a(t),
                e(t)
              }))
            }))
          }
        },
        {
          key: "quit",
          value: function(t, e) {
            var n = this,
            r = e.payload,
            o = r.roomId,
            i = r.resolve,
            a = r.reject,
            s = t.options.ackTimeout || Dh.ackTimeout;
            return new Promise((function(t, e) {
              var r = setTimeout((function() {
                var t = new Cs("退出房间超时，超时时间为".concat(s, "ms。"));
                a(t),
                e(t)
              }), s);
              n.messageBroker.send({
                r: o,
                t: 0
              },
              {
                command: Ch.APP.JOIN_OR_QUIT_ROOM
              }).then((function(e) {
                return r && clearTimeout(r),
                n.service.send({
                  type: vs,
                  payload: {
                    machine: "room",
                    room: {
                      roomId: null,
                      offsets: [ - 1, -1],
                      pollingTimeout: Dh.pollingTimeout
                    }
                  }
                }),
                i(e),
                t(e),
                e
              })).
              catch((function(t) {
                r && clearTimeout(r),
                a(t),
                e(t)
              }))
            }))
          }
        },
        {
          key: "pull",
          value: function(t, e) {
            var n = this,
            r = t.room,
            o = r.roomId,
            i = r.offsets,
            a = r.pollingTimeout,
            s = t.options,
            c = a || s.pollingTimeout || Dh.pollingTimeout,
            u = Vo(i, 2),
            f = u[0],
            l = void 0 === f ? -1 : f,
            h = u[1],
            p = void 0 === h ? -1 : h;
            return new Promise((function(t, e) {
              var r = setTimeout((function() {
                e(new Cs("拉取超时，超时时间为".concat(c, "ms。")))
              }), c);
              n.messageBroker.send({
                r: o,
                lm: l,
                lt: p,
                c: 400
              },
              {
                command: Ch.APP.PULL_ROOM_MSG
              }).then((function(e) {
                r && clearTimeout(r);
                e.ms || e.messages;
                var i = e.lm || e.latestMessageId,
                a = e.lt || e.latestTimestamp,
                s = e.pt || e.pollingTimeout || e.nextPollingTimeout;
                Fo(s) ? s *= 1e3: s = Dh.pollingTimeout,
                n.service.send({
                  type: vs,
                  payload: {
                    machine: "room",
                    room: {
                      roomId: o,
                      offsets: [i, a],
                      pollingTimeout: s
                    }
                  }
                }),
                t(e)
              })).
              catch((function(t) {
                r && clearTimeout(r),
                e(t)
              }))
            }))
          }
        },
        {
          key: "sendRoomMessage",
          value: function(t, e, n) {
            var r = (n || {}).priority,
            o = void 0 === r ? 1 : r;
            return this.messageBroker.send({
              r: t,
              c: e,
              p: o
            },
            {
              command: Ch.APP.SEND_ROOM_MSG
            })
          }
        }]),
        n
      } (Ah),
      zh = function(t) {
        bo(n, t);
        var e = Eo(n);
        function n() {
          var t;
          po(this, n);
          for (var r = arguments.length,
          o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
          return Oo(go(t = e.call.apply(e, [this].concat(o))), "data", {
            version: Bh.SDK_VERSION
          }),
          t
        }
        return vo(n, [{
          key: "createHooks",
          value: function(t) {
            t.logger;
            var e = t.storage,
            n = t.router,
            r = t.messageBroker;
            return new Uh(this, e, n, r)
          }
        },
        {
          key: "createActions",
          value: function(t) {
            t.logger;
            var e = t.storage,
            n = t.router,
            r = t.messageBroker;
            return new Fh(this, e, n, r)
          }
        },
        {
          key: "createMachine",
          value: function(t, e, n, r) {
            var o = this.bizId,
            i = this.env,
            a = this.deviceInfo,
            s = this.options;
            return Du({
              options: s,
              bizId: o,
              env: i,
              deviceInfo: a
            },
            {
              logger: t,
              hooks: n,
              actions: e,
              storage: r,
              autoStart: !1
            })
          }
        },
        {
          key: "createMessageBroker",
          value: function() {
            var t = this.bizId,
            e = this.env,
            n = this.deviceInfo;
            return new jh(t, e, n)
          }
        },
        {
          key: "joinRoom",
          value: function(t, e, n) {
            var r = this;
            return new Promise((function(e, n) {
              r.service.send({
                type: Ss,
                payload: {
                  roomId: t,
                  resolve: e,
                  reject: n
                }
              })
            })).then((function(t) {
              return Do(e) && e(t),
              t
            })).
            catch((function(t) {
              throw Do(n) && n(t),
              t
            }))
          }
        },
        {
          key: "quitRoom",
          value: function(t, e, n) {
            var r = this;
            return new Promise((function(e, n) {
              r.service.send({
                type: Os,
                payload: {
                  roomId: t,
                  resolve: e,
                  reject: n
                }
              })
            })).then((function(t) {
              return Do(e) && e(t),
              t
            })).
            catch((function(t) {
              throw Do(n) && n(t),
              t
            }))
          }
        },
        {
          key: "sendRoomMessage",
          value: function(t, e, n, r, o) {
            return this.actions.sendRoomMessage(t, e, n).then((function(t) {
              return Do(r) && r(t),
              t
            })).
            catch((function(t) {
              throw Do(o) && o(t),
              t
            }))
          }
        },
        {
          key: "onRoomMessage",
          value: function(t) {
            return this.on("roomMessage", t)
          }
        },
        {
          key: "onRoomMessages",
          value: function(t) {
            return this.on("roomMessages", t)
          }
        },
        {
          key: "joinChatRoom",
          value: function() {
            return this.joinRoom.apply(this, arguments)
          }
        },
        {
          key: "quitChatRoom",
          value: function() {
            return this.quitRoom.apply(this, arguments)
          }
        },
        {
          key: "sendChatRoomMessage",
          value: function() {
            return this.sendRoomMessage.apply(this, arguments)
          }
        },
        {
          key: "onChatRoomMessage",
          value: function() {
            return this.onRoomMessage.apply(this, arguments)
          }
        },
        {
          key: "onChatRoomMessages",
          value: function() {
            return this.onRoomMessages.apply(this, arguments)
          }
        }]),
        n
      } (Ih);
      e.a = zh
    }).call(this, n(0), n(4).Buffer)
  },
  function(t, e, n) {
    t.exports = n(3)
  },
  function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1);
    e.
  default = r.a
  },
  function(t, e, n) {
    "use strict"; (function(t) {
      /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
      var r = n(5),
      o = n(6),
      i = n(7);
      function a() {
        return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
      }
      function s(t, e) {
        if (a() < e) throw new RangeError("Invalid typed array length");
        return c.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = c.prototype: (null === t && (t = new c(e)), t.length = e),
        t
      }
      function c(t, e, n) {
        if (! (c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, n);
        if ("number" == typeof t) {
          if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
          return l(this, t)
        }
        return u(this, t, e, n)
      }
      function u(t, e, n, r) {
        if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ?
        function(t, e, n, r) {
          if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
          if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
          e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
          c.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = c.prototype: t = h(t, e);
          return t
        } (t, e, n, r) : "string" == typeof e ?
        function(t, e, n) {
          "string" == typeof n && "" !== n || (n = "utf8");
          if (!c.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
          var r = 0 | d(e, n),
          o = (t = s(t, r)).write(e, n);
          o !== r && (t = t.slice(0, o));
          return t
        } (t, e, n) : function(t, e) {
          if (c.isBuffer(e)) {
            var n = 0 | p(e.length);
            return 0 === (t = s(t, n)).length || e.copy(t, 0, 0, n),
            t
          }
          if (e) {
            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? s(t, 0) : h(t, e);
            if ("Buffer" === e.type && i(e.data)) return h(t, e.data)
          }
          var r;
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        } (t, e)
      }
      function f(t) {
        if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative')
      }
      function l(t, e) {
        if (f(e), t = s(t, e < 0 ? 0 : 0 | p(e)), !c.TYPED_ARRAY_SUPPORT) for (var n = 0; n < e; ++n) t[n] = 0;
        return t
      }
      function h(t, e) {
        var n = e.length < 0 ? 0 : 0 | p(e.length);
        t = s(t, n);
        for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
        return t
      }
      function p(t) {
        if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
        return 0 | t
      }
      function d(t, e) {
        if (c.isBuffer(t)) return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var n = t.length;
        if (0 === n) return 0;
        for (var r = !1;;) switch (e) {
        case "ascii":
        case "latin1":
        case "binary":
          return n;
        case "utf8":
        case "utf-8":
        case void 0:
          return F(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * n;
        case "hex":
          return n >>> 1;
        case "base64":
          return z(t).length;
        default:
          if (r) return F(t).length;
          e = ("" + e).toLowerCase(),
          r = !0
        }
      }
      function y(t, e, n) {
        var r = !1;
        if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
        if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
        if ((n >>>= 0) <= (e >>>= 0)) return "";
        for (t || (t = "utf8");;) switch (t) {
        case "hex":
          return x(this, e, n);
        case "utf8":
        case "utf-8":
          return R(this, e, n);
        case "ascii":
          return A(this, e, n);
        case "latin1":
        case "binary":
          return T(this, e, n);
        case "base64":
          return P(this, e, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return _(this, e, n);
        default:
          if (r) throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(),
          r = !0
        }
      }
      function v(t, e, n) {
        var r = t[e];
        t[e] = t[n],
        t[n] = r
      }
      function g(t, e, n, r, o) {
        if (0 === t.length) return - 1;
        if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
          if (o) return - 1;
          n = t.length - 1
        } else if (n < 0) {
          if (!o) return - 1;
          n = 0
        }
        if ("string" == typeof e && (e = c.from(e, r)), c.isBuffer(e)) return 0 === e.length ? -1 : m(t, e, n, r, o);
        if ("number" == typeof e) return e &= 255,
        c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : m(t, [e], n, r, o);
        throw new TypeError("val must be string, number or Buffer")
      }
      function m(t, e, n, r, o) {
        var i, a = 1,
        s = t.length,
        c = e.length;
        if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
          if (t.length < 2 || e.length < 2) return - 1;
          a = 2,
          s /= 2,
          c /= 2,
          n /= 2
        }
        function u(t, e) {
          return 1 === a ? t[e] : t.readUInt16BE(e * a)
        }
        if (o) {
          var f = -1;
          for (i = n; i < s; i++) if (u(t, i) === u(e, -1 === f ? 0 : i - f)) {
            if ( - 1 === f && (f = i), i - f + 1 === c) return f * a
          } else - 1 !== f && (i -= i - f),
          f = -1
        } else for (n + c > s && (n = s - c), i = n; i >= 0; i--) {
          for (var l = !0,
          h = 0; h < c; h++) if (u(t, i + h) !== u(e, h)) {
            l = !1;
            break
          }
          if (l) return i
        }
        return - 1
      }
      function b(t, e, n, r) {
        n = Number(n) || 0;
        var o = t.length - n;
        r ? (r = Number(r)) > o && (r = o) : r = o;
        var i = e.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        r > i / 2 && (r = i / 2);
        for (var a = 0; a < r; ++a) {
          var s = parseInt(e.substr(2 * a, 2), 16);
          if (isNaN(s)) return a;
          t[n + a] = s
        }
        return a
      }
      function w(t, e, n, r) {
        return J(F(e, t.length - n), t, n, r)
      }
      function k(t, e, n, r) {
        return J(function(t) {
          for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
          return e
        } (e), t, n, r)
      }
      function S(t, e, n, r) {
        return k(t, e, n, r)
      }
      function E(t, e, n, r) {
        return J(z(e), t, n, r)
      }
      function O(t, e, n, r) {
        return J(function(t, e) {
          for (var n, r, o, i = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) n = t.charCodeAt(a),
          r = n >> 8,
          o = n % 256,
          i.push(o),
          i.push(r);
          return i
        } (e, t.length - n), t, n, r)
      }
      function P(t, e, n) {
        return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
      }
      function R(t, e, n) {
        n = Math.min(t.length, n);
        for (var r = [], o = e; o < n;) {
          var i, a, s, c, u = t[o],
          f = null,
          l = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
          if (o + l <= n) switch (l) {
          case 1:
            u < 128 && (f = u);
            break;
          case 2:
            128 == (192 & (i = t[o + 1])) && (c = (31 & u) << 6 | 63 & i) > 127 && (f = c);
            break;
          case 3:
            i = t[o + 1],
            a = t[o + 2],
            128 == (192 & i) && 128 == (192 & a) && (c = (15 & u) << 12 | (63 & i) << 6 | 63 & a) > 2047 && (c < 55296 || c > 57343) && (f = c);
            break;
          case 4:
            i = t[o + 1],
            a = t[o + 2],
            s = t[o + 3],
            128 == (192 & i) && 128 == (192 & a) && 128 == (192 & s) && (c = (15 & u) << 18 | (63 & i) << 12 | (63 & a) << 6 | 63 & s) > 65535 && c < 1114112 && (f = c)
          }
          null === f ? (f = 65533, l = 1) : f > 65535 && (f -= 65536, r.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f),
          r.push(f),
          o += l
        }
        return function(t) {
          var e = t.length;
          if (e <= 4096) return String.fromCharCode.apply(String, t);
          var n = "",
          r = 0;
          for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += 4096));
          return n
        } (r)
      }
      e.Buffer = c,
      e.SlowBuffer = function(t) { + t != t && (t = 0);
        return c.alloc( + t)
      },
      e.INSPECT_MAX_BYTES = 50,
      c.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT: function() {
        try {
          var t = new Uint8Array(1);
          return t.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
              return 42
            }
          },
          42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
        } catch(t) {
          return ! 1
        }
      } (),
      e.kMaxLength = a(),
      c.poolSize = 8192,
      c._augment = function(t) {
        return t.__proto__ = c.prototype,
        t
      },
      c.from = function(t, e, n) {
        return u(null, t, e, n)
      },
      c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
        value: null,
        configurable: !0
      })),
      c.alloc = function(t, e, n) {
        return function(t, e, n, r) {
          return f(e),
          e <= 0 ? s(t, e) : void 0 !== n ? "string" == typeof r ? s(t, e).fill(n, r) : s(t, e).fill(n) : s(t, e)
        } (null, t, e, n)
      },
      c.allocUnsafe = function(t) {
        return l(null, t)
      },
      c.allocUnsafeSlow = function(t) {
        return l(null, t)
      },
      c.isBuffer = function(t) {
        return ! (null == t || !t._isBuffer)
      },
      c.compare = function(t, e) {
        if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
        if (t === e) return 0;
        for (var n = t.length,
        r = e.length,
        o = 0,
        i = Math.min(n, r); o < i; ++o) if (t[o] !== e[o]) {
          n = t[o],
          r = e[o];
          break
        }
        return n < r ? -1 : r < n ? 1 : 0
      },
      c.isEncoding = function(t) {
        switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ! 0;
        default:
          return ! 1
        }
      },
      c.concat = function(t, e) {
        if (!i(t)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return c.alloc(0);
        var n;
        if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
        var r = c.allocUnsafe(e),
        o = 0;
        for (n = 0; n < t.length; ++n) {
          var a = t[n];
          if (!c.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
          a.copy(r, o),
          o += a.length
        }
        return r
      },
      c.byteLength = d,
      c.prototype._isBuffer = !0,
      c.prototype.swap16 = function() {
        var t = this.length;
        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2) v(this, e, e + 1);
        return this
      },
      c.prototype.swap32 = function() {
        var t = this.length;
        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4) v(this, e, e + 3),
        v(this, e + 1, e + 2);
        return this
      },
      c.prototype.swap64 = function() {
        var t = this.length;
        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8) v(this, e, e + 7),
        v(this, e + 1, e + 6),
        v(this, e + 2, e + 5),
        v(this, e + 3, e + 4);
        return this
      },
      c.prototype.toString = function() {
        var t = 0 | this.length;
        return 0 === t ? "": 0 === arguments.length ? R(this, 0, t) : y.apply(this, arguments)
      },
      c.prototype.equals = function(t) {
        if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === c.compare(this, t)
      },
      c.prototype.inspect = function() {
        var t = "",
        n = e.INSPECT_MAX_BYTES;
        return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")),
        "<Buffer " + t + ">"
      },
      c.prototype.compare = function(t, e, n, r, o) {
        if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length: 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || r < 0 || o > this.length) throw new RangeError("out of range index");
        if (r >= o && e >= n) return 0;
        if (r >= o) return - 1;
        if (e >= n) return 1;
        if (this === t) return 0;
        for (var i = (o >>>= 0) - (r >>>= 0), a = (n >>>= 0) - (e >>>= 0), s = Math.min(i, a), u = this.slice(r, o), f = t.slice(e, n), l = 0; l < s; ++l) if (u[l] !== f[l]) {
          i = u[l],
          a = f[l];
          break
        }
        return i < a ? -1 : a < i ? 1 : 0
      },
      c.prototype.includes = function(t, e, n) {
        return - 1 !== this.indexOf(t, e, n)
      },
      c.prototype.indexOf = function(t, e, n) {
        return g(this, t, e, n, !0)
      },
      c.prototype.lastIndexOf = function(t, e, n) {
        return g(this, t, e, n, !1)
      },
      c.prototype.write = function(t, e, n, r) {
        if (void 0 === e) r = "utf8",
        n = this.length,
        e = 0;
        else if (void 0 === n && "string" == typeof e) r = e,
        n = this.length,
        e = 0;
        else {
          if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          e |= 0,
          isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
        }
        var o = this.length - e;
        if ((void 0 === n || n > o) && (n = o), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        r || (r = "utf8");
        for (var i = !1;;) switch (r) {
        case "hex":
          return b(this, t, e, n);
        case "utf8":
        case "utf-8":
          return w(this, t, e, n);
        case "ascii":
          return k(this, t, e, n);
        case "latin1":
        case "binary":
          return S(this, t, e, n);
        case "base64":
          return E(this, t, e, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return O(this, t, e, n);
        default:
          if (i) throw new TypeError("Unknown encoding: " + r);
          r = ("" + r).toLowerCase(),
          i = !0
        }
      },
      c.prototype.toJSON = function() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        }
      };
      function A(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);
        for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
        return r
      }
      function T(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);
        for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
        return r
      }
      function x(t, e, n) {
        var r = t.length; (!e || e < 0) && (e = 0),
        (!n || n < 0 || n > r) && (n = r);
        for (var o = "",
        i = e; i < n; ++i) o += U(t[i]);
        return o
      }
      function _(t, e, n) {
        for (var r = t.slice(e, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);
        return o
      }
      function I(t, e, n) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
      }
      function C(t, e, n, r, o, i) {
        if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
        if (n + r > t.length) throw new RangeError("Index out of range")
      }
      function N(t, e, n, r) {
        e < 0 && (e = 65535 + e + 1);
        for (var o = 0,
        i = Math.min(t.length - n, 2); o < i; ++o) t[n + o] = (e & 255 << 8 * (r ? o: 1 - o)) >>> 8 * (r ? o: 1 - o)
      }
      function L(t, e, n, r) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var o = 0,
        i = Math.min(t.length - n, 4); o < i; ++o) t[n + o] = e >>> 8 * (r ? o: 3 - o) & 255
      }
      function M(t, e, n, r, o, i) {
        if (n + r > t.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range")
      }
      function j(t, e, n, r, i) {
        return i || M(t, 0, n, 4),
        o.write(t, e, n, r, 23, 4),
        n + 4
      }
      function B(t, e, n, r, i) {
        return i || M(t, 0, n, 8),
        o.write(t, e, n, r, 52, 8),
        n + 8
      }
      c.prototype.slice = function(t, e) {
        var n, r = this.length;
        if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r: ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), c.TYPED_ARRAY_SUPPORT)(n = this.subarray(t, e)).__proto__ = c.prototype;
        else {
          var o = e - t;
          n = new c(o, void 0);
          for (var i = 0; i < o; ++i) n[i] = this[i + t]
        }
        return n
      },
      c.prototype.readUIntLE = function(t, e, n) {
        t |= 0,
        e |= 0,
        n || I(t, e, this.length);
        for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;
        return r
      },
      c.prototype.readUIntBE = function(t, e, n) {
        t |= 0,
        e |= 0,
        n || I(t, e, this.length);
        for (var r = this[t + --e], o = 1; e > 0 && (o *= 256);) r += this[t + --e] * o;
        return r
      },
      c.prototype.readUInt8 = function(t, e) {
        return e || I(t, 1, this.length),
        this[t]
      },
      c.prototype.readUInt16LE = function(t, e) {
        return e || I(t, 2, this.length),
        this[t] | this[t + 1] << 8
      },
      c.prototype.readUInt16BE = function(t, e) {
        return e || I(t, 2, this.length),
        this[t] << 8 | this[t + 1]
      },
      c.prototype.readUInt32LE = function(t, e) {
        return e || I(t, 4, this.length),
        (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
      },
      c.prototype.readUInt32BE = function(t, e) {
        return e || I(t, 4, this.length),
        16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
      },
      c.prototype.readIntLE = function(t, e, n) {
        t |= 0,
        e |= 0,
        n || I(t, e, this.length);
        for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;
        return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)),
        r
      },
      c.prototype.readIntBE = function(t, e, n) {
        t |= 0,
        e |= 0,
        n || I(t, e, this.length);
        for (var r = e,
        o = 1,
        i = this[t + --r]; r > 0 && (o *= 256);) i += this[t + --r] * o;
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)),
        i
      },
      c.prototype.readInt8 = function(t, e) {
        return e || I(t, 1, this.length),
        128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
      },
      c.prototype.readInt16LE = function(t, e) {
        e || I(t, 2, this.length);
        var n = this[t] | this[t + 1] << 8;
        return 32768 & n ? 4294901760 | n: n
      },
      c.prototype.readInt16BE = function(t, e) {
        e || I(t, 2, this.length);
        var n = this[t + 1] | this[t] << 8;
        return 32768 & n ? 4294901760 | n: n
      },
      c.prototype.readInt32LE = function(t, e) {
        return e || I(t, 4, this.length),
        this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
      },
      c.prototype.readInt32BE = function(t, e) {
        return e || I(t, 4, this.length),
        this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
      },
      c.prototype.readFloatLE = function(t, e) {
        return e || I(t, 4, this.length),
        o.read(this, t, !0, 23, 4)
      },
      c.prototype.readFloatBE = function(t, e) {
        return e || I(t, 4, this.length),
        o.read(this, t, !1, 23, 4)
      },
      c.prototype.readDoubleLE = function(t, e) {
        return e || I(t, 8, this.length),
        o.read(this, t, !0, 52, 8)
      },
      c.prototype.readDoubleBE = function(t, e) {
        return e || I(t, 8, this.length),
        o.read(this, t, !1, 52, 8)
      },
      c.prototype.writeUIntLE = function(t, e, n, r) { (t = +t, e |= 0, n |= 0, r) || C(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
        var o = 1,
        i = 0;
        for (this[e] = 255 & t; ++i < n && (o *= 256);) this[e + i] = t / o & 255;
        return e + n
      },
      c.prototype.writeUIntBE = function(t, e, n, r) { (t = +t, e |= 0, n |= 0, r) || C(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
        var o = n - 1,
        i = 1;
        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) this[e + o] = t / i & 255;
        return e + n
      },
      c.prototype.writeUInt8 = function(t, e, n) {
        return t = +t,
        e |= 0,
        n || C(this, t, e, 1, 255, 0),
        c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        this[e] = 255 & t,
        e + 1
      },
      c.prototype.writeUInt16LE = function(t, e, n) {
        return t = +t,
        e |= 0,
        n || C(this, t, e, 2, 65535, 0),
        c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : N(this, t, e, !0),
        e + 2
      },
      c.prototype.writeUInt16BE = function(t, e, n) {
        return t = +t,
        e |= 0,
        n || C(this, t, e, 2, 65535, 0),
        c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : N(this, t, e, !1),
        e + 2
      },
      c.prototype.writeUInt32LE = function(t, e, n) {
        return t = +t,
        e |= 0,
        n || C(this, t, e, 4, 4294967295, 0),
        c.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : L(this, t, e, !0),
        e + 4
      },
      c.prototype.writeUInt32BE = function(t, e, n) {
        return t = +t,
        e |= 0,
        n || C(this, t, e, 4, 4294967295, 0),
        c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : L(this, t, e, !1),
        e + 4
      },
      c.prototype.writeIntLE = function(t, e, n, r) {
        if (t = +t, e |= 0, !r) {
          var o = Math.pow(2, 8 * n - 1);
          C(this, t, e, n, o - 1, -o)
        }
        var i = 0,
        a = 1,
        s = 0;
        for (this[e] = 255 & t; ++i < n && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1),
        this[e + i] = (t / a >> 0) - s & 255;
        return e + n
      },
      c.prototype.writeIntBE = function(t, e, n, r) {
        if (t = +t, e |= 0, !r) {
          var o = Math.pow(2, 8 * n - 1);
          C(this, t, e, n, o - 1, -o)
        }
        var i = n - 1,
        a = 1,
        s = 0;
        for (this[e + i] = 255 & t; --i >= 0 && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1),
        this[e + i] = (t / a >> 0) - s & 255;
        return e + n
      },
      c.prototype.writeInt8 = function(t, e, n) {
        return t = +t,
        e |= 0,
        n || C(this, t, e, 1, 127, -128),
        c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        t < 0 && (t = 255 + t + 1),
        this[e] = 255 & t,
        e + 1
      },
      c.prototype.writeInt16LE = function(t, e, n) {
        return t = +t,
        e |= 0,
        n || C(this, t, e, 2, 32767, -32768),
        c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : N(this, t, e, !0),
        e + 2
      },
      c.prototype.writeInt16BE = function(t, e, n) {
        return t = +t,
        e |= 0,
        n || C(this, t, e, 2, 32767, -32768),
        c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : N(this, t, e, !1),
        e + 2
      },
      c.prototype.writeInt32LE = function(t, e, n) {
        return t = +t,
        e |= 0,
        n || C(this, t, e, 4, 2147483647, -2147483648),
        c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : L(this, t, e, !0),
        e + 4
      },
      c.prototype.writeInt32BE = function(t, e, n) {
        return t = +t,
        e |= 0,
        n || C(this, t, e, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
        c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : L(this, t, e, !1),
        e + 4
      },
      c.prototype.writeFloatLE = function(t, e, n) {
        return j(this, t, e, !0, n)
      },
      c.prototype.writeFloatBE = function(t, e, n) {
        return j(this, t, e, !1, n)
      },
      c.prototype.writeDoubleLE = function(t, e, n) {
        return B(this, t, e, !0, n)
      },
      c.prototype.writeDoubleBE = function(t, e, n) {
        return B(this, t, e, !1, n)
      },
      c.prototype.copy = function(t, e, n, r) {
        if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError("targetStart out of bounds");
        if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
        if (r < 0) throw new RangeError("sourceEnd out of bounds");
        r > this.length && (r = this.length),
        t.length - e < r - n && (r = t.length - e + n);
        var o, i = r - n;
        if (this === t && n < e && e < r) for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n];
        else if (i < 1e3 || !c.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) t[o + e] = this[o + n];
        else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e);
        return i
      },
      c.prototype.fill = function(t, e, n, r) {
        if ("string" == typeof t) {
          if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
            var o = t.charCodeAt(0);
            o < 256 && (t = o)
          }
          if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
          if ("string" == typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
        } else "number" == typeof t && (t &= 255);
        if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
        if (n <= e) return this;
        var i;
        if (e >>>= 0, n = void 0 === n ? this.length: n >>> 0, t || (t = 0), "number" == typeof t) for (i = e; i < n; ++i) this[i] = t;
        else {
          var a = c.isBuffer(t) ? t: F(new c(t, r).toString()),
          s = a.length;
          for (i = 0; i < n - e; ++i) this[i + e] = a[i % s]
        }
        return this
      };
      var D = /[^+\/0-9A-Za-z-_]/g;
      function U(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16)
      }
      function F(t, e) {
        var n;
        e = e || 1 / 0;
        for (var r = t.length,
        o = null,
        i = [], a = 0; a < r; ++a) {
          if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
            if (!o) {
              if (n > 56319) { (e -= 3) > -1 && i.push(239, 191, 189);
                continue
              }
              if (a + 1 === r) { (e -= 3) > -1 && i.push(239, 191, 189);
                continue
              }
              o = n;
              continue
            }
            if (n < 56320) { (e -= 3) > -1 && i.push(239, 191, 189),
              o = n;
              continue
            }
            n = 65536 + (o - 55296 << 10 | n - 56320)
          } else o && (e -= 3) > -1 && i.push(239, 191, 189);
          if (o = null, n < 128) {
            if ((e -= 1) < 0) break;
            i.push(n)
          } else if (n < 2048) {
            if ((e -= 2) < 0) break;
            i.push(n >> 6 | 192, 63 & n | 128)
          } else if (n < 65536) {
            if ((e -= 3) < 0) break;
            i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
          } else {
            if (! (n < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
          }
        }
        return i
      }
      function z(t) {
        return r.toByteArray(function(t) {
          if ((t = function(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
          } (t).replace(D, "")).length < 2) return "";
          for (; t.length % 4 != 0;) t += "=";
          return t
        } (t))
      }
      function J(t, e, n, r) {
        for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) e[o + n] = t[o];
        return o
      }
    }).call(this, n(0))
  },
  function(t, e, n) {
    "use strict";
    e.byteLength = function(t) {
      var e = u(t),
      n = e[0],
      r = e[1];
      return 3 * (n + r) / 4 - r
    },
    e.toByteArray = function(t) {
      var e, n, r = u(t),
      a = r[0],
      s = r[1],
      c = new i(function(t, e, n) {
        return 3 * (e + n) / 4 - n
      } (0, a, s)),
      f = 0,
      l = s > 0 ? a - 4 : a;
      for (n = 0; n < l; n += 4) e = o[t.charCodeAt(n)] << 18 | o[t.charCodeAt(n + 1)] << 12 | o[t.charCodeAt(n + 2)] << 6 | o[t.charCodeAt(n + 3)],
      c[f++] = e >> 16 & 255,
      c[f++] = e >> 8 & 255,
      c[f++] = 255 & e;
      2 === s && (e = o[t.charCodeAt(n)] << 2 | o[t.charCodeAt(n + 1)] >> 4, c[f++] = 255 & e);
      1 === s && (e = o[t.charCodeAt(n)] << 10 | o[t.charCodeAt(n + 1)] << 4 | o[t.charCodeAt(n + 2)] >> 2, c[f++] = e >> 8 & 255, c[f++] = 255 & e);
      return c
    },
    e.fromByteArray = function(t) {
      for (var e, n = t.length,
      o = n % 3,
      i = [], a = 0, s = n - o; a < s; a += 16383) i.push(f(t, a, a + 16383 > s ? s: a + 16383));
      1 === o ? (e = t[n - 1], i.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1], i.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
      return i.join("")
    };
    for (var r = [], o = [], i = "undefined" != typeof Uint8Array ? Uint8Array: Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, c = a.length; s < c; ++s) r[s] = a[s],
    o[a.charCodeAt(s)] = s;
    function u(t) {
      var e = t.length;
      if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var n = t.indexOf("=");
      return - 1 === n && (n = e),
      [n, n === e ? 0 : 4 - n % 4]
    }
    function f(t, e, n) {
      for (var o, i, a = [], s = e; s < n; s += 3) o = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]),
      a.push(r[(i = o) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
      return a.join("")
    }
    o["-".charCodeAt(0)] = 62,
    o["_".charCodeAt(0)] = 63
  },
  function(t, e) {
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    e.read = function(t, e, n, r, o) {
      var i, a, s = 8 * o - r - 1,
      c = (1 << s) - 1,
      u = c >> 1,
      f = -7,
      l = n ? o - 1 : 0,
      h = n ? -1 : 1,
      p = t[e + l];
      for (l += h, i = p & (1 << -f) - 1, p >>= -f, f += s; f > 0; i = 256 * i + t[e + l], l += h, f -= 8);
      for (a = i & (1 << -f) - 1, i >>= -f, f += r; f > 0; a = 256 * a + t[e + l], l += h, f -= 8);
      if (0 === i) i = 1 - u;
      else {
        if (i === c) return a ? NaN: 1 / 0 * (p ? -1 : 1);
        a += Math.pow(2, r),
        i -= u
      }
      return (p ? -1 : 1) * a * Math.pow(2, i - r)
    },
    e.write = function(t, e, n, r, o, i) {
      var a, s, c, u = 8 * i - o - 1,
      f = (1 << u) - 1,
      l = f >> 1,
      h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      p = r ? 0 : i - 1,
      d = r ? 1 : -1,
      y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
      for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = f) : (a = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -a)) < 1 && (a--, c *= 2), (e += a + l >= 1 ? h / c: h * Math.pow(2, 1 - l)) * c >= 2 && (a++, c /= 2), a + l >= f ? (s = 0, a = f) : a + l >= 1 ? (s = (e * c - 1) * Math.pow(2, o), a += l) : (s = e * Math.pow(2, l - 1) * Math.pow(2, o), a = 0)); o >= 8; t[n + p] = 255 & s, p += d, s /= 256, o -= 8);
      for (a = a << o | s, u += o; u > 0; t[n + p] = 255 & a, p += d, a /= 256, u -= 8);
      t[n + p - d] |= 128 * y
    }
  },
  function(t, e) {
    var n = {}.toString;
    t.exports = Array.isArray ||
    function(t) {
      return "[object Array]" == n.call(t)
    }
  }]).
default
}));