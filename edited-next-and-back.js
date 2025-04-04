"use strict";
(() => {
    var F = Object.create;
    var I = Object.defineProperty;
    var H = Object.getOwnPropertyDescriptor;
    var X = Object.getOwnPropertyNames;
    var Y = Object.getPrototypeOf,
        j = Object.prototype.hasOwnProperty;
    var q = (e, t, r) => t in e ? I(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[t] = r;
    var G = (e => typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(e, {
        get: (t, r) => (typeof require != "undefined" ? require : t)[r]
    }) : e)(function(e) {
        if (typeof require != "undefined") return require.apply(this, arguments);
        throw new Error('Dynamic require of "' + e + '" is not supported')
    });
    var z = (e, t, r, s) => {
        if (t && typeof t == "object" || typeof t == "function")
            for (let o of X(t)) !j.call(e, o) && o !== r && I(e, o, {
                get: () => t[o],
                enumerable: !(s = H(t, o)) || s.enumerable
            });
        return e
    };
    var W = (e, t, r) => (r = e != null ? F(Y(e)) : {}, z(t || !e || !e.__esModule ? I(r, "default", {
        value: e,
        enumerable: !0
    }) : r, e));
    var g = (e, t, r) => (q(e, typeof t != "symbol" ? t + "" : t, r), r);
    var d = "fs-attributes";
    var C = "cmsattribute";
    var E = "cmsprevnext";
    var h = async (...e) => {
        var r;
        let t = [];
        for (let s of e) {
            let o = await ((r = window.fsAttributes[s]) == null ? void 0 : r.loading);
            t.push(o)
        }
        return t
    };
    var A = class {
        static activateAlerts() {
            this.alertsActivated = !0
        }
        static alert(t, r) {
            if (this.alertsActivated && window.alert(t), r === "error") throw new Error(t)
        }
    };
    g(A, "alertsActivated", !1);
    var v = () => {};
    var y = e => e.replace(/\/+$/, "");

    function B(e, t, r) {
        var o;
        let s = window.fsAttributes[e];
        return s.destroy = r || v, (o = s.resolve) == null || o.call(s, t), t
    }
    var P = async () => {
        let {
            fsAttributes: e
        } = window;
        e.cmscore || (e.cmscore = {});
        let {
            cmscore: t
        } = e;
        if (t.import) return t.import;
        try {
            return t.import = import("https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmscore@1/cmscore.js"), t.import.then(r => {
                r && (t.version || (t.version = r.version))
            }), t.import
        } catch (r) {
            A.alert(`${r}`, "error");
            return
        }
    };
    var Q = `${d}-support`,
        J = "https://cdn.jsdelivr.net/npm/@finsweet/attributes-support@1/support.js",
        M = async () => {
            let {
                fsAttributes: e,
                location: t
            } = window, {
                host: r,
                searchParams: s
            } = new URL(t.href);
            e.support || (e.support = {});
            let {
                support: o
            } = e;
            if (!r.includes("webflow.io") || !s.has(Q)) return !1;
            if (o.import) return o.import;
            try {
                o.import = new Promise((n, i) => {
                    let c = document.createElement("script");
                    c.src = J, c.onload = () => n(!0), c.onerror = i, document.head.append(c)
                })
            } catch (n) {
                return !1
            }
            return o.import
        };
    var _ = e => {
        let t = (s, o, n) => {
            let i = e[s],
                {
                    key: c,
                    values: l
                } = i,
                a;
            if (!o) return `[${c}]`;
            let f = l == null ? void 0 : l[o];
            typeof f == "string" ? a = f : a = f(n && "instanceIndex" in n ? n.instanceIndex : void 0);
            let T = n && "caseInsensitive" in n && n.caseInsensitive ? "i" : "";
            if (!(n != null && n.operator)) return `[${c}="${a}"${T}]`;
            switch (n.operator) {
                case "prefixed":
                    return `[${c}^="${a}"${T}]`;
                case "suffixed":
                    return `[${c}$="${a}"${T}]`;
                case "contains":
                    return `[${c}*="${a}"${T}]`
            }
        };

        function r(s, o) {
            let n = t("element", s, o),
                i = (o == null ? void 0 : o.scope) || document;
            return o != null && o.all ? [...i.querySelectorAll(n)] : i.querySelector(n)
        }
        return [t, r]
    };
    var b = {
            preventLoad: {
                key: `${d}-preventload`
            },
            debugMode: {
                key: `${d}-debug`
            },
            src: {
                key: "src",
                values: {
                    finsweet: "@finsweet/attributes"
                }
            },
            dev: {
                key: `${d}-dev`
            }
        },
        [w, Bt] = _(b);
    var L = e => {
        let {
            currentScript: t
        } = document, r = {};
        if (!t) return {
            attributes: r,
            preventsLoad: !1
        };
        let o = {
            preventsLoad: typeof t.getAttribute(b.preventLoad.key) == "string",
            attributes: r
        };
        for (let n in e) {
            let i = t.getAttribute(e[n]);
            o.attributes[n] = i
        }
        return o
    };
    var K = ({
            scriptAttributes: e,
            attributeKey: t,
            version: r,
            init: s
        }) => {
            var c;
            Z(), (c = window.fsAttributes)[t] || (c[t] = {});
            let {
                preventsLoad: o,
                attributes: n
            } = L(e), i = window.fsAttributes[t];
            i.version = r, i.init = s, o || (window.Webflow || (window.Webflow = []), window.Webflow.push(() => s(n)))
        },
        Z = () => {
            let e = tt();
            if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
                V(window.fsAttributes, e);
                return
            }
            let t = {
                cms: {},
                push(...r) {
                    var s, o;
                    for (let [n, i] of r)(o = (s = this[n]) == null ? void 0 : s.loading) == null || o.then(i)
                },
                destroy() {
                    var r, s;
                    for (let o of e)(s = (r = window.fsAttributes[o]) == null ? void 0 : r.destroy) == null || s.call(r)
                }
            };
            V(t, e), et(t), window.fsAttributes = t, window.FsAttributes = window.fsAttributes, M()
        },
        tt = () => {
            let e = w("src", "finsweet", {
                    operator: "contains"
                }),
                t = w("dev");
            return [...document.querySelectorAll(`script${e}, script${t}`)].reduce((o, n) => {
                var c;
                let i = n.getAttribute(b.dev.key) || ((c = n.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : c[0]);
                return i && !o.includes(i) && o.push(i), o
            }, [])
        },
        V = (e, t) => {
            for (let r of t) {
                if (e[r]) continue;
                e[r] = {};
                let s = e[r];
                s.loading = new Promise(o => {
                    s.resolve = n => {
                        o(n), delete s.resolve
                    }
                })
            }
        },
        et = e => {
            let t = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
            e.push(...t)
        };
    var N = "1.6.0";
    var ot = `fs-${E}`,
        st = "list",
        nt = "previous",
        it = "previous-empty",
        ct = "next",
        at = "next-empty",
        lt = {
            element: {
                key: `${ot}-element`,
                values: {
                    list: st,
                    previous: nt,
                    previousEmpty: it,
                    next: ct,
                    nextEmpty: at
                }
            }
        },
        [O, x] = _(lt);
    var $ = () => {
        let e = x("previous", {
                operator: "prefixed"
            }),
            t = x("next", {
                operator: "prefixed"
            });
        if (!e && !t) return;
        let r = x("previousEmpty", {
            operator: "prefixed"
        });
        r == null || r.remove();
        let s = x("nextEmpty", {
            operator: "prefixed"
        });
        return s == null || s.remove(), {
            previousPlaceholder: e,
            nextPlaceholder: t,
            previousEmptyElement: r,
            nextEmptyElement: s
        }
    };
    var k = async () => {
        let e = await P();
        if (!e) return [];
        await h(C);
        let t = !1,
            r = !1,
            s = e.createCMSListInstances([O("element", "list", {
                operator: "prefixed"
            })]),
            o = () => B(E, s, () => {
                var u;
                for (let m of s)(u = m.destroy) == null || u.call(m)
            }),
            n = $();
        if (!n) return o();
        let {
            previousPlaceholder: i,
            nextPlaceholder: c,
            previousEmptyElement: l,
            nextEmptyElement: a
        } = n, {
            origin: f,
            pathname: T
        } = window.location, D = f + T, U = () => (!i || i && t) && (!c || c && r);
        for (let u of s) {
            if (U()) break;
            let m = R => {
              if (U()) {
                u.off("additems", m);
                u.wrapper.remove();
                return;
              }
              let S = R.findIndex(({ href: p }) => p && y(p) === y(D));
              if (!(S < 0)) {
if (i) {
  let prevItem = R[S - 1];
  if (prevItem && !t) {
    let anchor = prevItem.element.querySelector("a");
    let newHref = anchor ? anchor.getAttribute("href") : null;
    if (newHref) {
      let targetLink = i.tagName.toLowerCase() === "a" ? i : i.querySelector("a");
      if (targetLink) {
        targetLink.setAttribute("href", newHref);
      }
    }
    if (l) l.remove();
    t = true;
  } else if (l) {
    let anchor = l.querySelector("a");
    let newHref = anchor ? anchor.getAttribute("href") : "#";
    let targetLink = i.tagName.toLowerCase() === "a" ? i : i.querySelector("a");
    if (targetLink) {
      targetLink.setAttribute("href", newHref);
    }
    i.appendChild(l);
  }
}

                if (c) {
                  let nextItem = R[S + 1];
                  if (nextItem && !r) {
                    let newHref = nextItem.element.getAttribute("href");
                    let targetLink = c.tagName.toLowerCase() === "a" ? c : c.querySelector("a");
                    if (targetLink) {
                      targetLink.setAttribute("href", newHref);
                    }
                    if (a) a.remove();
                    r = true;
                  } else if (a) {
                    let newHref =
                      a.tagName.toLowerCase() === "a"
                        ? a.getAttribute("href")
                        : (a.querySelector("a") ? a.querySelector("a").getAttribute("href") : "#");
                    let targetLink = c.tagName.toLowerCase() === "a" ? c : c.querySelector("a");
                    if (targetLink) {
                      targetLink.setAttribute("href", newHref);
                    }
                    c.appendChild(a);
                  }
                }
              }
            };
            u.on("additems", m);
            m(u.items);
            u.wrapper.style.display = "none";
        }          
        return o()
    };
    K({
        init: k,
        version: N,
        attributeKey: E
    });
})();
