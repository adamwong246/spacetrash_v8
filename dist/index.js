var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@osjs/client/dist/main.js
var require_main = __commonJS({
  "node_modules/@osjs/client/dist/main.js"(exports, module) {
    !function(e2, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("osjsClient", [], t) : "object" == typeof exports ? exports.osjsClient = t() : e2.osjsClient = t();
    }(window, function() {
      return function(e2) {
        var t = {};
        function n(r) {
          if (t[r]) return t[r].exports;
          var o = t[r] = { i: r, l: false, exports: {} };
          return e2[r].call(o.exports, o, o.exports, n), o.l = true, o.exports;
        }
        return n.m = e2, n.c = t, n.d = function(e3, t2, r) {
          n.o(e3, t2) || Object.defineProperty(e3, t2, { enumerable: true, get: r });
        }, n.r = function(e3) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e3, "__esModule", { value: true });
        }, n.t = function(e3, t2) {
          if (1 & t2 && (e3 = n(e3)), 8 & t2) return e3;
          if (4 & t2 && "object" == typeof e3 && e3 && e3.__esModule) return e3;
          var r = /* @__PURE__ */ Object.create(null);
          if (n.r(r), Object.defineProperty(r, "default", { enumerable: true, value: e3 }), 2 & t2 && "string" != typeof e3) for (var o in e3) n.d(r, o, function(t3) {
            return e3[t3];
          }.bind(null, o));
          return r;
        }, n.n = function(e3) {
          var t2 = e3 && e3.__esModule ? function() {
            return e3.default;
          } : function() {
            return e3;
          };
          return n.d(t2, "a", t2), t2;
        }, n.o = function(e3, t2) {
          return Object.prototype.hasOwnProperty.call(e3, t2);
        }, n.p = "", n(n.s = 26);
      }([function(e2, t) {
        e2.exports = function(e3, t2, n) {
          return t2 in e3 ? Object.defineProperty(e3, t2, { value: n, enumerable: true, configurable: true, writable: true }) : e3[t2] = n, e3;
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        e2.exports = function(e3, t2) {
          if (!(e3 instanceof t2)) throw new TypeError("Cannot call a class as a function");
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        function n(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var r = t2[n2];
            r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e3, r.key, r);
          }
        }
        e2.exports = function(e3, t2, r) {
          return t2 && n(e3.prototype, t2), r && n(e3, r), Object.defineProperty(e3, "prototype", { writable: false }), e3;
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        function n(t2) {
          return e2.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e3) {
            return e3.__proto__ || Object.getPrototypeOf(e3);
          }, e2.exports.__esModule = true, e2.exports.default = e2.exports, n(t2);
        }
        e2.exports = n, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        var r = n(27), o = n(28), i = n(19), a = n(29);
        e2.exports = function(e3) {
          return r(e3) || o(e3) || i(e3) || a();
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        var r = n(20);
        e2.exports = function(e3, t2) {
          if ("function" != typeof t2 && null !== t2) throw new TypeError("Super expression must either be null or a function");
          e3.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e3, writable: true, configurable: true } }), Object.defineProperty(e3, "prototype", { writable: false }), t2 && r(e3, t2);
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        var r = n(16).default, o = n(13);
        e2.exports = function(e3, t2) {
          if (t2 && ("object" === r(t2) || "function" == typeof t2)) return t2;
          if (void 0 !== t2) throw new TypeError("Derived constructors may only return object or undefined");
          return o(e3);
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        (function(t2) {
          e2.exports = function(e3) {
            var t3 = {};
            function n2(r) {
              if (t3[r]) return t3[r].exports;
              var o = t3[r] = { i: r, l: false, exports: {} };
              return e3[r].call(o.exports, o, o.exports, n2), o.l = true, o.exports;
            }
            return n2.m = e3, n2.c = t3, n2.d = function(e4, t4, r) {
              n2.o(e4, t4) || Object.defineProperty(e4, t4, { enumerable: true, get: r });
            }, n2.r = function(e4) {
              "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e4, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e4, "__esModule", { value: true });
            }, n2.t = function(e4, t4) {
              if (1 & t4 && (e4 = n2(e4)), 8 & t4) return e4;
              if (4 & t4 && "object" == typeof e4 && e4 && e4.__esModule) return e4;
              var r = /* @__PURE__ */ Object.create(null);
              if (n2.r(r), Object.defineProperty(r, "default", { enumerable: true, value: e4 }), 2 & t4 && "string" != typeof e4) for (var o in e4) n2.d(r, o, function(t5) {
                return e4[t5];
              }.bind(null, o));
              return r;
            }, n2.n = function(e4) {
              var t4 = e4 && e4.__esModule ? function() {
                return e4.default;
              } : function() {
                return e4;
              };
              return n2.d(t4, "a", t4), t4;
            }, n2.o = function(e4, t4) {
              return Object.prototype.hasOwnProperty.call(e4, t4);
            }, n2.p = "", n2(n2.s = 2);
          }([function(e3, t3) {
            e3.exports = function(e4, t4) {
              if (!(e4 instanceof t4)) throw new TypeError("Cannot call a class as a function");
            };
          }, function(e3, t3) {
            function n2(e4, t4) {
              for (var n3 = 0; n3 < t4.length; n3++) {
                var r = t4[n3];
                r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e4, r.key, r);
              }
            }
            e3.exports = function(e4, t4, r) {
              return t4 && n2(e4.prototype, t4), r && n2(e4, r), e4;
            };
          }, function(e3, t3, n2) {
            e3.exports = n2(3);
          }, function(e3, t3, n2) {
            "use strict";
            n2.r(t3), n2.d(t3, "EventEmitter", function() {
              return c;
            });
            var r = n2(0), o = n2.n(r), i = n2(1), a = n2.n(i), s = function(e4) {
              return e4 instanceof Array ? e4 : String(e4).replace(/\s+/g, "").split(",");
            }, c = function() {
              function e4() {
                var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "undefined";
                o()(this, e4), this.name = t4, this.events = {};
              }
              return a()(e4, [{ key: "destroy", value: function() {
                this.events = {};
              } }, { key: "on", value: function(e5, t4) {
                var n3 = this, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                if (r2 = r2 || {}, "function" != typeof t4) throw new TypeError("Invalid callback");
                return s(e5).forEach(function(e6) {
                  n3.events[e6] || (n3.events[e6] = []), n3.events[e6].push({ callback: t4, options: r2 });
                }), this;
              } }, { key: "once", value: function(e5, t4) {
                return this.on(e5, t4, { once: true });
              } }, { key: "off", value: function(e5) {
                var t4 = this, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return s(e5).filter(function(e6) {
                  return !!t4.events[e6];
                }).forEach(function(e6) {
                  if (n3) for (var o2 = t4.events[e6].length; o2--; ) {
                    var i2 = t4.events[e6][o2];
                    (!i2.options.persist || r2) && i2.callback === n3 && t4.events[e6].splice(o2, 1);
                  }
                  else t4.events[e6] = r2 ? [] : t4.events[e6].filter(function(e7) {
                    return true === e7.options.persist;
                  });
                }), this;
              } }, { key: "emit", value: function(e5) {
                for (var t4 = this, n3 = arguments.length, r2 = new Array(n3 > 1 ? n3 - 1 : 0), o2 = 1; o2 < n3; o2++) r2[o2 - 1] = arguments[o2];
                return s(e5).forEach(function(e6) {
                  if (t4.events[e6]) for (var n4 = t4.events[e6].length; n4--; ) {
                    var o3 = t4.events[e6][n4], i2 = o3.options, a2 = o3.callback;
                    try {
                      a2.apply(void 0, r2);
                    } catch (e7) {
                      console.warn(e7);
                    }
                    i2 && i2.once && t4.events[e6].splice(n4, 1);
                  }
                }), this;
              } }]), e4;
            }();
          }]);
        }).call(this, n(21));
      }, function(e2, t, n) {
        var r = n(30);
        function o() {
          return "undefined" != typeof Reflect && Reflect.get ? (e2.exports = o = Reflect.get.bind(), e2.exports.__esModule = true, e2.exports.default = e2.exports) : (e2.exports = o = function(e3, t2, n2) {
            var o2 = r(e3, t2);
            if (o2) {
              var i = Object.getOwnPropertyDescriptor(o2, t2);
              return i.get ? i.get.call(arguments.length < 3 ? e3 : n2) : i.value;
            }
          }, e2.exports.__esModule = true, e2.exports.default = e2.exports), o.apply(this, arguments);
        }
        e2.exports = o, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        (function(e3) {
          !function(e4, t2) {
            for (var n2 in t2) e4[n2] = t2[n2];
          }(t, function(e4) {
            var t2 = {};
            function n2(r) {
              if (t2[r]) return t2[r].exports;
              var o = t2[r] = { i: r, l: false, exports: {} };
              return e4[r].call(o.exports, o, o.exports, n2), o.l = true, o.exports;
            }
            return n2.m = e4, n2.c = t2, n2.d = function(e5, t3, r) {
              n2.o(e5, t3) || Object.defineProperty(e5, t3, { enumerable: true, get: r });
            }, n2.r = function(e5) {
              "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e5, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e5, "__esModule", { value: true });
            }, n2.t = function(e5, t3) {
              if (1 & t3 && (e5 = n2(e5)), 8 & t3) return e5;
              if (4 & t3 && "object" == typeof e5 && e5 && e5.__esModule) return e5;
              var r = /* @__PURE__ */ Object.create(null);
              if (n2.r(r), Object.defineProperty(r, "default", { enumerable: true, value: e5 }), 2 & t3 && "string" != typeof e5) for (var o in e5) n2.d(r, o, function(t4) {
                return e5[t4];
              }.bind(null, o));
              return r;
            }, n2.n = function(e5) {
              var t3 = e5 && e5.__esModule ? function() {
                return e5.default;
              } : function() {
                return e5;
              };
              return n2.d(t3, "a", t3), t3;
            }, n2.o = function(e5, t3) {
              return Object.prototype.hasOwnProperty.call(e5, t3);
            }, n2.p = "", n2(n2.s = 16);
          }([function(e4, t2) {
            function n2(t3) {
              return e4.exports = n2 = Object.setPrototypeOf ? Object.getPrototypeOf : function(e5) {
                return e5.__proto__ || Object.getPrototypeOf(e5);
              }, n2(t3);
            }
            e4.exports = n2;
          }, function(e4, t2, n2) {
            e4.exports = function(e5) {
              var t3 = {};
              function n3(r) {
                if (t3[r]) return t3[r].exports;
                var o = t3[r] = { i: r, l: false, exports: {} };
                return e5[r].call(o.exports, o, o.exports, n3), o.l = true, o.exports;
              }
              return n3.m = e5, n3.c = t3, n3.d = function(e6, t4, r) {
                n3.o(e6, t4) || Object.defineProperty(e6, t4, { enumerable: true, get: r });
              }, n3.r = function(e6) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e6, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e6, "__esModule", { value: true });
              }, n3.t = function(e6, t4) {
                if (1 & t4 && (e6 = n3(e6)), 8 & t4) return e6;
                if (4 & t4 && "object" == typeof e6 && e6 && e6.__esModule) return e6;
                var r = /* @__PURE__ */ Object.create(null);
                if (n3.r(r), Object.defineProperty(r, "default", { enumerable: true, value: e6 }), 2 & t4 && "string" != typeof e6) for (var o in e6) n3.d(r, o, function(t5) {
                  return e6[t5];
                }.bind(null, o));
                return r;
              }, n3.n = function(e6) {
                var t4 = e6 && e6.__esModule ? function() {
                  return e6.default;
                } : function() {
                  return e6;
                };
                return n3.d(t4, "a", t4), t4;
              }, n3.o = function(e6, t4) {
                return Object.prototype.hasOwnProperty.call(e6, t4);
              }, n3.p = "", n3(n3.s = 2);
            }([function(e5, t3) {
              e5.exports = function(e6, t4) {
                if (!(e6 instanceof t4)) throw new TypeError("Cannot call a class as a function");
              };
            }, function(e5, t3) {
              function n3(e6, t4) {
                for (var n4 = 0; n4 < t4.length; n4++) {
                  var r = t4[n4];
                  r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e6, r.key, r);
                }
              }
              e5.exports = function(e6, t4, r) {
                return t4 && n3(e6.prototype, t4), r && n3(e6, r), e6;
              };
            }, function(e5, t3, n3) {
              e5.exports = n3(3);
            }, function(e5, t3, n3) {
              "use strict";
              n3.r(t3), n3.d(t3, "EventEmitter", function() {
                return c;
              });
              var r = n3(0), o = n3.n(r), i = n3(1), a = n3.n(i), s = function(e6) {
                return e6 instanceof Array ? e6 : String(e6).replace(/\s+/g, "").split(",");
              }, c = function() {
                function e6() {
                  var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "undefined";
                  o()(this, e6), this.name = t4, this.events = {};
                }
                return a()(e6, [{ key: "destroy", value: function() {
                  this.events = {};
                } }, { key: "on", value: function(e7, t4) {
                  var n4 = this, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                  if (r2 = r2 || {}, "function" != typeof t4) throw new TypeError("Invalid callback");
                  return s(e7).forEach(function(e8) {
                    n4.events[e8] || (n4.events[e8] = []), n4.events[e8].push({ callback: t4, options: r2 });
                  }), this;
                } }, { key: "once", value: function(e7, t4) {
                  return this.on(e7, t4, { once: true });
                } }, { key: "off", value: function(e7) {
                  var t4 = this, n4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                  return s(e7).filter(function(e8) {
                    return !!t4.events[e8];
                  }).forEach(function(e8) {
                    if (n4) for (var o2 = t4.events[e8].length; o2--; ) {
                      var i2 = t4.events[e8][o2];
                      (!i2.options.persist || r2) && i2.callback === n4 && t4.events[e8].splice(o2, 1);
                    }
                    else t4.events[e8] = r2 ? [] : t4.events[e8].filter(function(e9) {
                      return true === e9.options.persist;
                    });
                  }), this;
                } }, { key: "emit", value: function(e7) {
                  for (var t4 = this, n4 = arguments.length, r2 = new Array(n4 > 1 ? n4 - 1 : 0), o2 = 1; o2 < n4; o2++) r2[o2 - 1] = arguments[o2];
                  return s(e7).forEach(function(e8) {
                    if (t4.events[e8]) for (var n5 = t4.events[e8].length; n5--; ) {
                      var o3 = t4.events[e8][n5], i2 = o3.options, a2 = o3.callback;
                      try {
                        a2.apply(void 0, r2);
                      } catch (e9) {
                        console.warn(e9);
                      }
                      i2 && i2.once && t4.events[e8].splice(n5, 1);
                    }
                  }), this;
                } }]), e6;
              }();
            }]);
          }, function(e4, t2) {
            e4.exports = function(e5, t3) {
              if (!(e5 instanceof t3)) throw new TypeError("Cannot call a class as a function");
            };
          }, function(e4, t2) {
            function n2(e5, t3) {
              for (var n3 = 0; n3 < t3.length; n3++) {
                var r = t3[n3];
                r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e5, r.key, r);
              }
            }
            e4.exports = function(e5, t3, r) {
              return t3 && n2(e5.prototype, t3), r && n2(e5, r), e5;
            };
          }, function(e4, t2, n2) {
            "use strict";
            var r = function(e5) {
              return /* @__PURE__ */ function(e6) {
                return !!e6 && "object" == typeof e6;
              }(e5) && !function(e6) {
                var t3 = Object.prototype.toString.call(e6);
                return "[object RegExp]" === t3 || "[object Date]" === t3 || function(e7) {
                  return e7.$$typeof === o;
                }(e6);
              }(e5);
            }, o = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
            function i(e5, t3) {
              return false !== t3.clone && t3.isMergeableObject(e5) ? u((n3 = e5, Array.isArray(n3) ? [] : {}), e5, t3) : e5;
              var n3;
            }
            function a(e5, t3, n3) {
              return e5.concat(t3).map(function(e6) {
                return i(e6, n3);
              });
            }
            function s(e5) {
              return Object.keys(e5).concat(function(e6) {
                return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e6).filter(function(t3) {
                  return e6.propertyIsEnumerable(t3);
                }) : [];
              }(e5));
            }
            function c(e5, t3) {
              try {
                return t3 in e5;
              } catch (e6) {
                return false;
              }
            }
            function u(e5, t3, n3) {
              (n3 = n3 || {}).arrayMerge = n3.arrayMerge || a, n3.isMergeableObject = n3.isMergeableObject || r, n3.cloneUnlessOtherwiseSpecified = i;
              var o2 = Array.isArray(t3);
              return o2 === Array.isArray(e5) ? o2 ? n3.arrayMerge(e5, t3, n3) : function(e6, t4, n4) {
                var r2 = {};
                return n4.isMergeableObject(e6) && s(e6).forEach(function(t5) {
                  r2[t5] = i(e6[t5], n4);
                }), s(t4).forEach(function(o3) {
                  (function(e7, t5) {
                    return c(e7, t5) && !(Object.hasOwnProperty.call(e7, t5) && Object.propertyIsEnumerable.call(e7, t5));
                  })(e6, o3) || (c(e6, o3) && n4.isMergeableObject(t4[o3]) ? r2[o3] = function(e7, t5) {
                    if (!t5.customMerge) return u;
                    var n5 = t5.customMerge(e7);
                    return "function" == typeof n5 ? n5 : u;
                  }(o3, n4)(e6[o3], t4[o3], n4) : r2[o3] = i(t4[o3], n4));
                }), r2;
              }(e5, t3, n3) : i(t3, n3);
            }
            u.all = function(e5, t3) {
              if (!Array.isArray(e5)) throw new Error("first argument should be an array");
              return e5.reduce(function(e6, n3) {
                return u(e6, n3, t3);
              }, {});
            };
            var l = u;
            e4.exports = l;
          }, function(e4, t2) {
            e4.exports = function(e5) {
              if (void 0 === e5) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return e5;
            };
          }, function(e4, t2, n2) {
            var r = n2(20), o = n2(21), i = n2(22), a = n2(23);
            e4.exports = function(e5) {
              return r(e5) || o(e5) || i(e5) || a();
            };
          }, function(e4, t2, n2) {
            "use strict";
            Object.defineProperty(t2, "__esModule", { value: true }), function(e5) {
              for (var n3 in e5) t2.hasOwnProperty(n3) || (t2[n3] = e5[n3]);
            }(n2(24));
          }, function(e4, t2, n2) {
            e4.exports = n2(33);
          }, function(e4, t2) {
            e4.exports = function(e5, t3) {
              (null == t3 || t3 > e5.length) && (t3 = e5.length);
              for (var n2 = 0, r = new Array(t3); n2 < t3; n2++) r[n2] = e5[n2];
              return r;
            };
          }, function(e4, t2, n2) {
            "use strict";
            e4.exports = function(e5) {
              return null != e5 && "object" == typeof e5 && false === Array.isArray(e5);
            };
          }, function(e4, t2, n2) {
            var r = n2(17);
            function o(t3, n3, i) {
              return "undefined" != typeof Reflect && Reflect.get ? e4.exports = o = Reflect.get : e4.exports = o = function(e5, t4, n4) {
                var o2 = r(e5, t4);
                if (o2) {
                  var i2 = Object.getOwnPropertyDescriptor(o2, t4);
                  return i2.get ? i2.get.call(n4) : i2.value;
                }
              }, o(t3, n3, i || t3);
            }
            e4.exports = o;
          }, function(e4, t2, n2) {
            var r = n2(18);
            e4.exports = function(e5, t3) {
              if ("function" != typeof t3 && null !== t3) throw new TypeError("Super expression must either be null or a function");
              e5.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e5, writable: true, configurable: true } }), t3 && r(e5, t3);
            };
          }, function(e4, t2, n2) {
            var r = n2(19), o = n2(5);
            e4.exports = function(e5, t3) {
              return !t3 || "object" !== r(t3) && "function" != typeof t3 ? o(e5) : t3;
            };
          }, function(e4, t2, n2) {
            "use strict";
            var r = n2(26), o = n2(27);
            e4.exports = function e5(t3, n3) {
              if (void 0 === t3) return {};
              if (Array.isArray(t3)) {
                for (var i = 0; i < t3.length; i++) t3[i] = e5(t3[i], n3);
                return t3;
              }
              if (!r(t3)) return t3;
              if ("string" == typeof n3 && (n3 = [n3]), !Array.isArray(n3)) return t3;
              for (var a = 0; a < n3.length; a++) o(t3, n3[a]);
              for (var s in t3) t3.hasOwnProperty(s) && (t3[s] = e5(t3[s], n3));
              return t3;
            };
          }, function(e4, t2) {
            function n2(e5, t3, n3, r, o, i, a) {
              try {
                var s = e5[i](a), c = s.value;
              } catch (e6) {
                return void n3(e6);
              }
              s.done ? t3(c) : Promise.resolve(c).then(r, o);
            }
            e4.exports = function(e5) {
              return function() {
                var t3 = this, r = arguments;
                return new Promise(function(o, i) {
                  var a = e5.apply(t3, r);
                  function s(e6) {
                    n2(a, o, i, s, c, "next", e6);
                  }
                  function c(e6) {
                    n2(a, o, i, s, c, "throw", e6);
                  }
                  s(void 0);
                });
              };
            };
          }, function(e4, t2, n2) {
            e4.exports = n2(34);
          }, function(e4, t2, n2) {
            var r = n2(0);
            e4.exports = function(e5, t3) {
              for (; !Object.prototype.hasOwnProperty.call(e5, t3) && null !== (e5 = r(e5)); ) ;
              return e5;
            };
          }, function(e4, t2) {
            function n2(t3, r) {
              return e4.exports = n2 = Object.setPrototypeOf || function(e5, t4) {
                return e5.__proto__ = t4, e5;
              }, n2(t3, r);
            }
            e4.exports = n2;
          }, function(e4, t2) {
            function n2(t3) {
              return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? e4.exports = n2 = function(e5) {
                return typeof e5;
              } : e4.exports = n2 = function(e5) {
                return e5 && "function" == typeof Symbol && e5.constructor === Symbol && e5 !== Symbol.prototype ? "symbol" : typeof e5;
              }, n2(t3);
            }
            e4.exports = n2;
          }, function(e4, t2, n2) {
            var r = n2(9);
            e4.exports = function(e5) {
              if (Array.isArray(e5)) return r(e5);
            };
          }, function(e4, t2) {
            e4.exports = function(e5) {
              if ("undefined" != typeof Symbol && Symbol.iterator in Object(e5)) return Array.from(e5);
            };
          }, function(e4, t2, n2) {
            var r = n2(9);
            e4.exports = function(e5, t3) {
              if (e5) {
                if ("string" == typeof e5) return r(e5, t3);
                var n3 = Object.prototype.toString.call(e5).slice(8, -1);
                return "Object" === n3 && e5.constructor && (n3 = e5.constructor.name), "Map" === n3 || "Set" === n3 ? Array.from(e5) : "Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? r(e5, t3) : void 0;
              }
            };
          }, function(e4, t2) {
            e4.exports = function() {
              throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            };
          }, function(e4, t2, n2) {
            "use strict";
            Object.defineProperty(t2, "__esModule", { value: true });
            var r = n2(25), o = function() {
              function e5() {
                this.nodes = {}, this.outgoingEdges = {}, this.incomingEdges = {};
              }
              return e5.prototype.addNode = function(e6) {
                if (this.hasNode(e6.name)) throw new Error('A node with the name of "' + e6.name + '" already exists in the graph!');
                this.nodes[e6.name] = e6, this.outgoingEdges[e6.name] = [], this.incomingEdges[e6.name] = [];
              }, e5.prototype.removeNode = function(e6) {
                if (!this.hasNode(e6)) throw new Error('A node with the name of "' + e6 + '" does not exist in the graph!');
                for (var t3 in delete this.nodes[e6], delete this.outgoingEdges[e6], delete this.incomingEdges[e6], this.incomingEdges) this.incomingEdges[t3].includes(e6) && this.incomingEdges[t3].splice(t3.indexOf(e6), 1);
                for (var n3 in this.outgoingEdges) this.outgoingEdges[n3].includes(e6) && this.outgoingEdges[n3].splice(n3.indexOf(e6), 1);
              }, e5.prototype.hasNode = function(e6) {
                return this.nodes.hasOwnProperty(e6);
              }, Object.defineProperty(e5.prototype, "size", { get: function() {
                return Object.keys(this.nodes).length;
              }, enumerable: true, configurable: true }), e5.prototype.getNode = function(e6) {
                if (this.hasNode(e6)) return this.nodes[e6];
                throw new Error('Node "' + e6 + '" not found!');
              }, e5.prototype.addDependency = function(e6, t3) {
                if (!this.hasNode(e6)) throw new Error("Node does not exist: " + e6);
                if (!this.hasNode(t3)) throw new Error("Node does not exist: " + t3);
                if (e6 === t3) throw new Error("Cannot add self dependency: " + t3);
                this.outgoingEdges[e6].includes(t3) || this.outgoingEdges[e6].push(t3), this.incomingEdges[t3].includes(e6) || this.incomingEdges[t3].push(e6);
              }, e5.prototype.removeDependency = function(e6, t3) {
                if (console.warn("removeDependency() has not been tested."), !this.hasNode(e6)) throw new Error("Node does not exist: " + e6);
                if (!this.hasNode(t3)) throw new Error("Node does not exist: " + t3);
                if (e6 === t3) throw new Error("Cannot remove self dependency: " + t3);
                this.outgoingEdges[e6].includes(t3) || this.outgoingEdges[e6].splice(this.outgoingEdges[e6].indexOf(t3), 1), this.incomingEdges[t3].includes(e6) || this.incomingEdges[t3].splice(this.incomingEdges[t3].indexOf(t3), 1);
              }, e5.prototype.dependenciesOf = function(e6) {
                return this.outgoingEdges[e6];
              }, e5.prototype.dependentsOf = function(e6) {
                return this.incomingEdges[e6];
              }, e5.prototype.traverse = function() {
                var e6 = this;
                Object.keys(this.nodes).map(function(t4) {
                  return e6.getNode(t4).clearMutex();
                });
                var t3 = function(n4) {
                  return Promise.all(e6.dependenciesOf(n4.name).map(function(t4) {
                    return e6.nodes[t4].awaitData();
                  })).then(function() {
                    return n4.signalDependenciesReady(), e6.dependentsOf(n4.name).length > 0 ? Promise.all(e6.dependentsOf(n4.name).map(function(n5) {
                      return t3(e6.getNode(n5));
                    })) : n4.awaitData();
                  });
                }, n3 = Object.keys(this.nodes).filter(function(t4) {
                  return 0 === e6.dependenciesOf(t4).length;
                });
                return 0 === n3.length && Object.keys(this.nodes).length > 0 ? Promise.reject(new Error("The graph is circular. Cannot traverse graph due to no root node.")) : Promise.all(n3.map(function(n4) {
                  return t3(e6.nodes[n4]);
                }));
              }, e5.prototype.clearNodeAndDependents = function(e6) {
                var t3 = this, n3 = this.getNode(e6), r2 = function(e7) {
                  return e7.hasData() ? (e7.clearData(), Promise.all(t3.dependentsOf(e7.name).map(function(e8) {
                    return r2(t3.getNode(e8));
                  }))) : Promise.resolve();
                };
                return r2(n3);
              }, e5.prototype.reset = function() {
                for (var e6 in this.nodes) this.nodes[e6].reset();
              }, e5.prototype.ls = function() {
                for (var e6 in this.nodes) console.log(e6), console.log(this.dependentsOf(e6));
              }, e5;
            }();
            t2.Graph = o;
            var i = function() {
              function e5(e6, t3) {
                this.locked = false, this._name = e6, this._promise = t3;
              }
              return Object.defineProperty(e5.prototype, "name", { get: function() {
                return this._name;
              }, enumerable: true, configurable: true }), e5.prototype.awaitData = function() {
                var e6 = this;
                return this.mutex || (this.mutex = new r.Mutex(function() {
                  return void 0 !== e6._data;
                })), new Promise(function(t3, n3) {
                  e6.mutex.await(function(r2) {
                    if (r2) return n3(r2);
                    t3(e6._data);
                  });
                });
              }, e5.prototype.signalDependenciesReady = function() {
                var e6 = this;
                if (this.mutex || (this.mutex = new r.Mutex(function() {
                  return void 0 !== e6._data;
                })), void 0 === this._data) {
                  if (true === this.locked) return;
                  this.locked = true;
                  var t3 = this._promise();
                  if (void 0 === t3) throw new Error('Node "' + this._name + '" has undefined promise.');
                  t3.then(function(t4) {
                    e6._data = t4, e6.locked = false, e6.mutex.ready();
                  }).catch(function(t4) {
                    e6._data = null, e6.locked = false, e6.mutex.ready(t4);
                  });
                } else this.mutex.ready();
              }, e5.prototype.setData = function(e6) {
                this._data = e6, this.signalDependenciesReady();
              }, e5.prototype.reset = function() {
                this.clearData(), this.clearMutex();
              }, e5.prototype.clearMutex = function() {
                this.hasData() && (this.mutex = void 0);
              }, e5.prototype.hasData = function() {
                return void 0 !== this._data;
              }, e5.prototype.clearData = function() {
                this._data = void 0;
              }, e5;
            }();
            t2.Node = i;
          }, function(e4, t2, n2) {
            "use strict";
            Object.defineProperty(t2, "__esModule", { value: true });
            var r = function() {
              function e5(e6) {
                this.readyTest = e6;
              }
              return e5.prototype.await = function(e6) {
                true === this.readyTest() ? e6() : (this.waiting = this.waiting || [], this.waiting.push(e6));
              }, e5.prototype.ready = function(e6) {
                this.waiting && this.waiting.forEach(function(t3) {
                  return t3(e6);
                }), delete this.waiting;
              }, e5;
            }();
            t2.Mutex = r;
          }, function(e4, t2, n2) {
            "use strict";
            var r = n2(10);
            function o(e5) {
              return true === r(e5) && "[object Object]" === Object.prototype.toString.call(e5);
            }
            e4.exports = function(e5) {
              var t3, n3;
              return false !== o(e5) && "function" == typeof (t3 = e5.constructor) && false !== o(n3 = t3.prototype) && false !== n3.hasOwnProperty("isPrototypeOf");
            };
          }, function(e4, t2, n2) {
            "use strict";
            var r = n2(10), o = n2(28);
            e4.exports = function(e5, t3) {
              if (!r(e5)) throw new TypeError("expected an object.");
              if (e5.hasOwnProperty(t3)) return delete e5[t3], true;
              if (o(e5, t3)) {
                for (var n3 = t3.split("."), i = n3.pop(); n3.length && "\\" === n3[n3.length - 1].slice(-1); ) i = n3.pop().slice(0, -1) + "." + i;
                for (; n3.length; ) e5 = e5[t3 = n3.shift()];
                return delete e5[i];
              }
              return true;
            };
          }, function(e4, t2, n2) {
            "use strict";
            var r = n2(29), o = n2(31), i = n2(32);
            e4.exports = function(e5, t3, n3) {
              return r(e5) ? o(i(e5, t3), n3) : o(e5, t3);
            };
          }, function(e4, t2, n2) {
            "use strict";
            var r = n2(30);
            e4.exports = function(e5) {
              return null != e5 && "object" == typeof e5 && false === r(e5);
            };
          }, function(e4, t2) {
            var n2 = {}.toString;
            e4.exports = Array.isArray || function(e5) {
              return "[object Array]" == n2.call(e5);
            };
          }, function(e4, t2, n2) {
            "use strict";
            e4.exports = function(e5, t3) {
              if (null == e5) return false;
              if ("boolean" == typeof e5) return true;
              if ("number" == typeof e5) return 0 !== e5 || true !== t3;
              if (void 0 !== e5.length) return 0 !== e5.length;
              for (var n3 in e5) if (e5.hasOwnProperty(n3)) return true;
              return false;
            };
          }, function(e4, t2) {
            function n2(e5) {
              return e5 ? Array.isArray(e5) ? e5.join(".") : e5 : "";
            }
            e4.exports = function(e5, t3, r, o, i) {
              if (null === (a = e5) || "object" != typeof a && "function" != typeof a || !t3) return e5;
              var a;
              if (t3 = n2(t3), r && (t3 += "." + n2(r)), o && (t3 += "." + n2(o)), i && (t3 += "." + n2(i)), t3 in e5) return e5[t3];
              for (var s = t3.split("."), c = s.length, u = -1; e5 && ++u < c; ) {
                for (var l = s[u]; "\\" === l[l.length - 1]; ) l = l.slice(0, -1) + "." + s[++u];
                e5 = e5[l];
              }
              return e5;
            };
          }, function(e4, t2, n2) {
            var r = function(e5) {
              "use strict";
              var t3 = Object.prototype, n3 = t3.hasOwnProperty, r2 = "function" == typeof Symbol ? Symbol : {}, o = r2.iterator || "@@iterator", i = r2.asyncIterator || "@@asyncIterator", a = r2.toStringTag || "@@toStringTag";
              function s(e6, t4, n4) {
                return Object.defineProperty(e6, t4, { value: n4, enumerable: true, configurable: true, writable: true }), e6[t4];
              }
              try {
                s({}, "");
              } catch (e6) {
                s = function(e7, t4, n4) {
                  return e7[t4] = n4;
                };
              }
              function c(e6, t4, n4, r3) {
                var o2 = t4 && t4.prototype instanceof f ? t4 : f, i2 = Object.create(o2.prototype), a2 = new A(r3 || []);
                return i2._invoke = /* @__PURE__ */ function(e7, t5, n5) {
                  var r4 = "suspendedStart";
                  return function(o3, i3) {
                    if ("executing" === r4) throw new Error("Generator is already running");
                    if ("completed" === r4) {
                      if ("throw" === o3) throw i3;
                      return { value: void 0, done: true };
                    }
                    for (n5.method = o3, n5.arg = i3; ; ) {
                      var a3 = n5.delegate;
                      if (a3) {
                        var s2 = E(a3, n5);
                        if (s2) {
                          if (s2 === l) continue;
                          return s2;
                        }
                      }
                      if ("next" === n5.method) n5.sent = n5._sent = n5.arg;
                      else if ("throw" === n5.method) {
                        if ("suspendedStart" === r4) throw r4 = "completed", n5.arg;
                        n5.dispatchException(n5.arg);
                      } else "return" === n5.method && n5.abrupt("return", n5.arg);
                      r4 = "executing";
                      var c2 = u(e7, t5, n5);
                      if ("normal" === c2.type) {
                        if (r4 = n5.done ? "completed" : "suspendedYield", c2.arg === l) continue;
                        return { value: c2.arg, done: n5.done };
                      }
                      "throw" === c2.type && (r4 = "completed", n5.method = "throw", n5.arg = c2.arg);
                    }
                  };
                }(e6, n4, a2), i2;
              }
              function u(e6, t4, n4) {
                try {
                  return { type: "normal", arg: e6.call(t4, n4) };
                } catch (e7) {
                  return { type: "throw", arg: e7 };
                }
              }
              e5.wrap = c;
              var l = {};
              function f() {
              }
              function d() {
              }
              function p() {
              }
              var h2 = {};
              h2[o] = function() {
                return this;
              };
              var L = Object.getPrototypeOf, _ = L && L(L(B([])));
              _ && _ !== t3 && n3.call(_, o) && (h2 = _);
              var v = p.prototype = f.prototype = Object.create(h2);
              function m(e6) {
                ["next", "throw", "return"].forEach(function(t4) {
                  s(e6, t4, function(e7) {
                    return this._invoke(t4, e7);
                  });
                });
              }
              function y(e6, t4) {
                var r3;
                this._invoke = function(o2, i2) {
                  function a2() {
                    return new t4(function(r4, a3) {
                      !function r5(o3, i3, a4, s2) {
                        var c2 = u(e6[o3], e6, i3);
                        if ("throw" !== c2.type) {
                          var l2 = c2.arg, f2 = l2.value;
                          return f2 && "object" == typeof f2 && n3.call(f2, "__await") ? t4.resolve(f2.__await).then(function(e7) {
                            r5("next", e7, a4, s2);
                          }, function(e7) {
                            r5("throw", e7, a4, s2);
                          }) : t4.resolve(f2).then(function(e7) {
                            l2.value = e7, a4(l2);
                          }, function(e7) {
                            return r5("throw", e7, a4, s2);
                          });
                        }
                        s2(c2.arg);
                      }(o2, i2, r4, a3);
                    });
                  }
                  return r3 = r3 ? r3.then(a2, a2) : a2();
                };
              }
              function E(e6, t4) {
                var n4 = e6.iterator[t4.method];
                if (void 0 === n4) {
                  if (t4.delegate = null, "throw" === t4.method) {
                    if (e6.iterator.return && (t4.method = "return", t4.arg = void 0, E(e6, t4), "throw" === t4.method)) return l;
                    t4.method = "throw", t4.arg = new TypeError("The iterator does not provide a 'throw' method");
                  }
                  return l;
                }
                var r3 = u(n4, e6.iterator, t4.arg);
                if ("throw" === r3.type) return t4.method = "throw", t4.arg = r3.arg, t4.delegate = null, l;
                var o2 = r3.arg;
                return o2 ? o2.done ? (t4[e6.resultName] = o2.value, t4.next = e6.nextLoc, "return" !== t4.method && (t4.method = "next", t4.arg = void 0), t4.delegate = null, l) : o2 : (t4.method = "throw", t4.arg = new TypeError("iterator result is not an object"), t4.delegate = null, l);
              }
              function g(e6) {
                var t4 = { tryLoc: e6[0] };
                1 in e6 && (t4.catchLoc = e6[1]), 2 in e6 && (t4.finallyLoc = e6[2], t4.afterLoc = e6[3]), this.tryEntries.push(t4);
              }
              function O(e6) {
                var t4 = e6.completion || {};
                t4.type = "normal", delete t4.arg, e6.completion = t4;
              }
              function A(e6) {
                this.tryEntries = [{ tryLoc: "root" }], e6.forEach(g, this), this.reset(true);
              }
              function B(e6) {
                if (e6) {
                  var t4 = e6[o];
                  if (t4) return t4.call(e6);
                  if ("function" == typeof e6.next) return e6;
                  if (!isNaN(e6.length)) {
                    var r3 = -1, i2 = function t5() {
                      for (; ++r3 < e6.length; ) if (n3.call(e6, r3)) return t5.value = e6[r3], t5.done = false, t5;
                      return t5.value = void 0, t5.done = true, t5;
                    };
                    return i2.next = i2;
                  }
                }
                return { next: b };
              }
              function b() {
                return { value: void 0, done: true };
              }
              return d.prototype = v.constructor = p, p.constructor = d, d.displayName = s(p, a, "GeneratorFunction"), e5.isGeneratorFunction = function(e6) {
                var t4 = "function" == typeof e6 && e6.constructor;
                return !!t4 && (t4 === d || "GeneratorFunction" === (t4.displayName || t4.name));
              }, e5.mark = function(e6) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(e6, p) : (e6.__proto__ = p, s(e6, a, "GeneratorFunction")), e6.prototype = Object.create(v), e6;
              }, e5.awrap = function(e6) {
                return { __await: e6 };
              }, m(y.prototype), y.prototype[i] = function() {
                return this;
              }, e5.AsyncIterator = y, e5.async = function(t4, n4, r3, o2, i2) {
                void 0 === i2 && (i2 = Promise);
                var a2 = new y(c(t4, n4, r3, o2), i2);
                return e5.isGeneratorFunction(n4) ? a2 : a2.next().then(function(e6) {
                  return e6.done ? e6.value : a2.next();
                });
              }, m(v), s(v, a, "Generator"), v[o] = function() {
                return this;
              }, v.toString = function() {
                return "[object Generator]";
              }, e5.keys = function(e6) {
                var t4 = [];
                for (var n4 in e6) t4.push(n4);
                return t4.reverse(), function n5() {
                  for (; t4.length; ) {
                    var r3 = t4.pop();
                    if (r3 in e6) return n5.value = r3, n5.done = false, n5;
                  }
                  return n5.done = true, n5;
                };
              }, e5.values = B, A.prototype = { constructor: A, reset: function(e6) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(O), !e6) for (var t4 in this) "t" === t4.charAt(0) && n3.call(this, t4) && !isNaN(+t4.slice(1)) && (this[t4] = void 0);
              }, stop: function() {
                this.done = true;
                var e6 = this.tryEntries[0].completion;
                if ("throw" === e6.type) throw e6.arg;
                return this.rval;
              }, dispatchException: function(e6) {
                if (this.done) throw e6;
                var t4 = this;
                function r3(n4, r4) {
                  return a2.type = "throw", a2.arg = e6, t4.next = n4, r4 && (t4.method = "next", t4.arg = void 0), !!r4;
                }
                for (var o2 = this.tryEntries.length - 1; o2 >= 0; --o2) {
                  var i2 = this.tryEntries[o2], a2 = i2.completion;
                  if ("root" === i2.tryLoc) return r3("end");
                  if (i2.tryLoc <= this.prev) {
                    var s2 = n3.call(i2, "catchLoc"), c2 = n3.call(i2, "finallyLoc");
                    if (s2 && c2) {
                      if (this.prev < i2.catchLoc) return r3(i2.catchLoc, true);
                      if (this.prev < i2.finallyLoc) return r3(i2.finallyLoc);
                    } else if (s2) {
                      if (this.prev < i2.catchLoc) return r3(i2.catchLoc, true);
                    } else {
                      if (!c2) throw new Error("try statement without catch or finally");
                      if (this.prev < i2.finallyLoc) return r3(i2.finallyLoc);
                    }
                  }
                }
              }, abrupt: function(e6, t4) {
                for (var r3 = this.tryEntries.length - 1; r3 >= 0; --r3) {
                  var o2 = this.tryEntries[r3];
                  if (o2.tryLoc <= this.prev && n3.call(o2, "finallyLoc") && this.prev < o2.finallyLoc) {
                    var i2 = o2;
                    break;
                  }
                }
                i2 && ("break" === e6 || "continue" === e6) && i2.tryLoc <= t4 && t4 <= i2.finallyLoc && (i2 = null);
                var a2 = i2 ? i2.completion : {};
                return a2.type = e6, a2.arg = t4, i2 ? (this.method = "next", this.next = i2.finallyLoc, l) : this.complete(a2);
              }, complete: function(e6, t4) {
                if ("throw" === e6.type) throw e6.arg;
                return "break" === e6.type || "continue" === e6.type ? this.next = e6.arg : "return" === e6.type ? (this.rval = this.arg = e6.arg, this.method = "return", this.next = "end") : "normal" === e6.type && t4 && (this.next = t4), l;
              }, finish: function(e6) {
                for (var t4 = this.tryEntries.length - 1; t4 >= 0; --t4) {
                  var n4 = this.tryEntries[t4];
                  if (n4.finallyLoc === e6) return this.complete(n4.completion, n4.afterLoc), O(n4), l;
                }
              }, catch: function(e6) {
                for (var t4 = this.tryEntries.length - 1; t4 >= 0; --t4) {
                  var n4 = this.tryEntries[t4];
                  if (n4.tryLoc === e6) {
                    var r3 = n4.completion;
                    if ("throw" === r3.type) {
                      var o2 = r3.arg;
                      O(n4);
                    }
                    return o2;
                  }
                }
                throw new Error("illegal catch attempt");
              }, delegateYield: function(e6, t4, n4) {
                return this.delegate = { iterator: B(e6), resultName: t4, nextLoc: n4 }, "next" === this.method && (this.arg = void 0), l;
              } }, e5;
            }(e4.exports);
            try {
              regeneratorRuntime = r;
            } catch (e5) {
              Function("r", "regeneratorRuntime = r")(r);
            }
          }, function(e4, t2, n2) {
            "use strict";
            n2.r(t2), n2.d(t2, "CoreBase", function() {
              return b;
            }), n2.d(t2, "ServiceProvider", function() {
              return R;
            }), n2.d(t2, "EventEmitter", function() {
              return E.EventHandler;
            });
            var r = n2(2), o = n2.n(r), i = n2(3), a = n2.n(i), s = n2(5), c = n2.n(s), u = n2(11), l = n2.n(u), f = n2(12), d = n2.n(f), p = n2(13), h2 = n2.n(p), L = n2(0), _ = n2.n(L), v = n2(6), m = n2.n(v), y = n2(7), E = n2(1), g = n2(4), O = n2.n(g), A = n2(14), B = n2.n(A);
            var b = function(e5) {
              d()(n3, e5);
              var t3 = function(e6) {
                var t4 = function() {
                  if ("undefined" == typeof Reflect || !Reflect.construct) return false;
                  if (Reflect.construct.sham) return false;
                  if ("function" == typeof Proxy) return true;
                  try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
                    })), true;
                  } catch (e7) {
                    return false;
                  }
                }();
                return function() {
                  var n4, r2 = _()(e6);
                  if (t4) {
                    var o2 = _()(this).constructor;
                    n4 = Reflect.construct(r2, arguments, o2);
                  } else n4 = r2.apply(this, arguments);
                  return h2()(this, n4);
                };
              }(n3);
              function n3(e6, r2, i2) {
                var a2;
                o()(this, n3), a2 = t3.call(this, "Core");
                var s2 = O.a.default ? O.a.default : O.a, u2 = B()(e6, i2.omit || []);
                return a2.logger = console, a2.configuration = s2(u2, r2), a2.options = i2, a2.booted = false, a2.started = false, a2.destroyed = false, a2.providers = /* @__PURE__ */ function(e7) {
                  var t4 = {}, n4 = [], r3 = [], o2 = function(e8, t5) {
                    var n5 = new y.Graph(), r4 = e8.map(function(e9) {
                      return "function" == typeof e9.provider.provides ? e9.provider.provides() : [];
                    });
                    return e8.forEach(function(e9, r5) {
                      n5.addNode(new y.Node(String(r5), function() {
                        try {
                          return Promise.resolve(e9.provider[t5]());
                        } catch (e10) {
                          return Promise.reject(e10);
                        }
                      }));
                    }), e8.forEach(function(e9, t6) {
                      var o3, i3 = e9.options.depends instanceof Array ? e9.options.depends : [], a3 = "function" == typeof e9.provider.depends ? e9.provider.depends() : [], s3 = [].concat(m()(i3), m()(a3));
                      if (s3.length > 0) {
                        var c2 = (o3 = s3, r4.findIndex(function(e10) {
                          return e10.some(function(e11) {
                            return -1 !== o3.indexOf(e11);
                          });
                        }));
                        -1 !== c2 && n5.addDependency(String(t6), String(c2));
                      }
                    }), n5.traverse().catch(function(e9) {
                      return console.warn(e9);
                    });
                  };
                  return { register: function(t5, r4) {
                    try {
                      n4.push({ provider: new t5(e7, r4.args), options: r4 });
                    } catch (e8) {
                      console.error("Provider register error", e8);
                    }
                  }, init: function(e8) {
                    return t5 = e8 ? n4.filter(function(e9) {
                      return e9.options.before;
                    }) : n4.filter(function(e9) {
                      return !e9.options.before;
                    }), o2(t5, "init").then(function() {
                      return o2(t5, "start");
                    });
                    var t5;
                  }, bind: function(t5, n5, o3) {
                    e7.logger.info("Provider binding", t5), r3.push({ singleton: n5, name: t5, make: function() {
                      return o3.apply(void 0, arguments);
                    } });
                  }, has: function(e8) {
                    return -1 !== r3.findIndex(function(t5) {
                      return t5.name === e8;
                    });
                  }, make: function(e8) {
                    var n5 = r3.find(function(t5) {
                      return t5.name === e8;
                    });
                    if (!n5) throw new Error("Provider '".concat(e8, "' not found"));
                    for (var o3 = arguments.length, i3 = new Array(o3 > 1 ? o3 - 1 : 0), a3 = 1; a3 < o3; a3++) i3[a3 - 1] = arguments[a3];
                    return n5.singleton ? (t4[e8] || n5 && (t4[e8] = n5.make.apply(n5, i3)), t4[e8]) : n5.make.apply(n5, i3);
                  }, destroy: function() {
                    var e8, o3 = (e8 = n4, "destroy", Promise.all(e8.map(function(e9) {
                      try {
                        return e9.provider.destroy();
                      } catch (e10) {
                        return Promise.reject(e10);
                      }
                    })).catch(function(e9) {
                      return console.warn(e9);
                    }));
                    return t4 = {}, r3 = [], o3;
                  } };
                }(c()(a2)), a2;
              }
              return a()(n3, [{ key: "destroy", value: function() {
                if (this.destroyed) return false;
                this.booted = false, this.destroyed = true, this.started = false;
                var e6 = this.providers.destroy();
                return l()(_()(n3.prototype), "destroy", this).call(this), e6;
              } }, { key: "boot", value: function() {
                return this.booted ? Promise.resolve(true) : (this.started = false, this.destroyed = false, this.booted = true, this.providers.init(true).then(function() {
                  return true;
                }));
              } }, { key: "start", value: function() {
                return this.started ? Promise.resolve(true) : (this.started = true, this.providers.init(false).then(function() {
                  return true;
                }));
              } }, { key: "config", value: function(e6, t4) {
                return e6 ? function(e7, t5, n4) {
                  var r2;
                  try {
                    r2 = t5.split(/\./g).reduce(function(e8, t6) {
                      return e8[t6];
                    }, Object.assign({}, e7));
                  } catch (e8) {
                  }
                  return void 0 === r2 ? n4 : r2;
                }(this.configuration, e6, t4) : Object.assign({}, this.configuration);
              } }, { key: "register", value: function(e6) {
                var t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                this.providers.register(e6, t4);
              } }, { key: "instance", value: function(e6, t4) {
                this.providers.bind(e6, false, t4);
              } }, { key: "singleton", value: function(e6, t4) {
                this.providers.bind(e6, true, t4);
              } }, { key: "make", value: function(e6) {
                for (var t4, n4 = arguments.length, r2 = new Array(n4 > 1 ? n4 - 1 : 0), o2 = 1; o2 < n4; o2++) r2[o2 - 1] = arguments[o2];
                return (t4 = this.providers).make.apply(t4, [e6].concat(r2));
              } }, { key: "has", value: function(e6) {
                return this.providers.has(e6);
              } }]), n3;
            }(E.EventEmitter), S = n2(8), T = n2.n(S), P = n2(15), w = n2.n(P), R = function() {
              function e5(t4) {
                var n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                o()(this, e5), this.core = t4, this.options = n3;
              }
              var t3;
              return a()(e5, [{ key: "provides", value: function() {
                return [];
              } }, { key: "depends", value: function() {
                return [];
              } }, { key: "init", value: (t3 = w()(T.a.mark(function e6() {
                return T.a.wrap(function(e7) {
                  for (; ; ) switch (e7.prev = e7.next) {
                    case 0:
                    case "end":
                      return e7.stop();
                  }
                }, e6);
              })), function() {
                return t3.apply(this, arguments);
              }) }, { key: "start", value: function() {
              } }, { key: "destroy", value: function() {
              } }]), e5;
            }();
          }]));
        }).call(this, n(21));
      }, function(e2, t, n) {
        var r = n(31), o = n(32), i = n(19), a = n(33);
        e2.exports = function(e3, t2) {
          return r(e3) || o(e3, t2) || i(e3, t2) || a();
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        "use strict";
        var r = function(e3) {
          return /* @__PURE__ */ function(e4) {
            return !!e4 && "object" == typeof e4;
          }(e3) && !function(e4) {
            var t2 = Object.prototype.toString.call(e4);
            return "[object RegExp]" === t2 || "[object Date]" === t2 || function(e5) {
              return e5.$$typeof === o;
            }(e4);
          }(e3);
        };
        var o = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
        function i(e3, t2) {
          return false !== t2.clone && t2.isMergeableObject(e3) ? l((n2 = e3, Array.isArray(n2) ? [] : {}), e3, t2) : e3;
          var n2;
        }
        function a(e3, t2, n2) {
          return e3.concat(t2).map(function(e4) {
            return i(e4, n2);
          });
        }
        function s(e3) {
          return Object.keys(e3).concat(function(e4) {
            return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e4).filter(function(t2) {
              return e4.propertyIsEnumerable(t2);
            }) : [];
          }(e3));
        }
        function c(e3, t2) {
          try {
            return t2 in e3;
          } catch (e4) {
            return false;
          }
        }
        function u(e3, t2, n2) {
          var r2 = {};
          return n2.isMergeableObject(e3) && s(e3).forEach(function(t3) {
            r2[t3] = i(e3[t3], n2);
          }), s(t2).forEach(function(o2) {
            (function(e4, t3) {
              return c(e4, t3) && !(Object.hasOwnProperty.call(e4, t3) && Object.propertyIsEnumerable.call(e4, t3));
            })(e3, o2) || (c(e3, o2) && n2.isMergeableObject(t2[o2]) ? r2[o2] = function(e4, t3) {
              if (!t3.customMerge) return l;
              var n3 = t3.customMerge(e4);
              return "function" == typeof n3 ? n3 : l;
            }(o2, n2)(e3[o2], t2[o2], n2) : r2[o2] = i(t2[o2], n2));
          }), r2;
        }
        function l(e3, t2, n2) {
          (n2 = n2 || {}).arrayMerge = n2.arrayMerge || a, n2.isMergeableObject = n2.isMergeableObject || r, n2.cloneUnlessOtherwiseSpecified = i;
          var o2 = Array.isArray(t2);
          return o2 === Array.isArray(e3) ? o2 ? n2.arrayMerge(e3, t2, n2) : u(e3, t2, n2) : i(t2, n2);
        }
        l.all = function(e3, t2) {
          if (!Array.isArray(e3)) throw new Error("first argument should be an array");
          return e3.reduce(function(e4, n2) {
            return l(e4, n2, t2);
          }, {});
        };
        var f = l;
        e2.exports = f;
      }, function(e2, t, n) {
        var r = n(34)();
        e2.exports = r;
        try {
          regeneratorRuntime = r;
        } catch (e3) {
          "object" == typeof globalThis ? globalThis.regeneratorRuntime = r : Function("r", "regeneratorRuntime = r")(r);
        }
      }, function(e2, t) {
        e2.exports = function(e3) {
          if (void 0 === e3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e3;
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        function n(e3, t2, n2, r, o, i, a) {
          try {
            var s = e3[i](a), c = s.value;
          } catch (e4) {
            return void n2(e4);
          }
          s.done ? t2(c) : Promise.resolve(c).then(r, o);
        }
        e2.exports = function(e3) {
          return function() {
            var t2 = this, r = arguments;
            return new Promise(function(o, i) {
              var a = e3.apply(t2, r);
              function s(e4) {
                n(a, o, i, s, c, "next", e4);
              }
              function c(e4) {
                n(a, o, i, s, c, "throw", e4);
              }
              s(void 0);
            });
          };
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        var r, o;
        !function(i) {
          if (void 0 === (o = "function" == typeof (r = i) ? r.call(t, n, t, e2) : r) || (e2.exports = o), true, e2.exports = i(), false) {
            var a = window.Cookies, s = window.Cookies = i();
            s.noConflict = function() {
              return window.Cookies = a, s;
            };
          }
        }(function() {
          function e3() {
            for (var e4 = 0, t3 = {}; e4 < arguments.length; e4++) {
              var n2 = arguments[e4];
              for (var r2 in n2) t3[r2] = n2[r2];
            }
            return t3;
          }
          function t2(e4) {
            return e4.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
          }
          return function n2(r2) {
            function o2() {
            }
            function i(t3, n3, i2) {
              if ("undefined" != typeof document) {
                "number" == typeof (i2 = e3({ path: "/" }, o2.defaults, i2)).expires && (i2.expires = new Date(1 * /* @__PURE__ */ new Date() + 864e5 * i2.expires)), i2.expires = i2.expires ? i2.expires.toUTCString() : "";
                try {
                  var a2 = JSON.stringify(n3);
                  /^[\{\[]/.test(a2) && (n3 = a2);
                } catch (e4) {
                }
                n3 = r2.write ? r2.write(n3, t3) : encodeURIComponent(String(n3)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t3 = encodeURIComponent(String(t3)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var s = "";
                for (var c in i2) i2[c] && (s += "; " + c, true !== i2[c] && (s += "=" + i2[c].split(";")[0]));
                return document.cookie = t3 + "=" + n3 + s;
              }
            }
            function a(e4, n3) {
              if ("undefined" != typeof document) {
                for (var o3 = {}, i2 = document.cookie ? document.cookie.split("; ") : [], a2 = 0; a2 < i2.length; a2++) {
                  var s = i2[a2].split("="), c = s.slice(1).join("=");
                  n3 || '"' !== c.charAt(0) || (c = c.slice(1, -1));
                  try {
                    var u = t2(s[0]);
                    if (c = (r2.read || r2)(c, u) || t2(c), n3) try {
                      c = JSON.parse(c);
                    } catch (e5) {
                    }
                    if (o3[u] = c, e4 === u) break;
                  } catch (e5) {
                  }
                }
                return e4 ? o3[e4] : o3;
              }
            }
            return o2.set = i, o2.get = function(e4) {
              return a(e4, false);
            }, o2.getJSON = function(e4) {
              return a(e4, true);
            }, o2.remove = function(t3, n3) {
              i(t3, "", e3(n3, { expires: -1 }));
            }, o2.defaults = {}, o2.withConverter = n2, o2;
          }(function() {
          });
        });
      }, function(e2, t) {
        function n(t2) {
          return e2.exports = n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          }, e2.exports.__esModule = true, e2.exports.default = e2.exports, n(t2);
        }
        e2.exports = n, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        window, e2.exports = function(e3) {
          var t2 = {};
          function n2(r) {
            if (t2[r]) return t2[r].exports;
            var o = t2[r] = { i: r, l: false, exports: {} };
            return e3[r].call(o.exports, o, o.exports, n2), o.l = true, o.exports;
          }
          return n2.m = e3, n2.c = t2, n2.d = function(e4, t3, r) {
            n2.o(e4, t3) || Object.defineProperty(e4, t3, { enumerable: true, get: r });
          }, n2.r = function(e4) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e4, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e4, "__esModule", { value: true });
          }, n2.t = function(e4, t3) {
            if (1 & t3 && (e4 = n2(e4)), 8 & t3) return e4;
            if (4 & t3 && "object" == typeof e4 && e4 && e4.__esModule) return e4;
            var r = /* @__PURE__ */ Object.create(null);
            if (n2.r(r), Object.defineProperty(r, "default", { enumerable: true, value: e4 }), 2 & t3 && "string" != typeof e4) for (var o in e4) n2.d(r, o, function(t4) {
              return e4[t4];
            }.bind(null, o));
            return r;
          }, n2.n = function(e4) {
            var t3 = e4 && e4.__esModule ? function() {
              return e4.default;
            } : function() {
              return e4;
            };
            return n2.d(t3, "a", t3), t3;
          }, n2.o = function(e4, t3) {
            return Object.prototype.hasOwnProperty.call(e4, t3);
          }, n2.p = "", n2(n2.s = 3);
        }([function(e3, t2) {
          function n2(e4) {
            return (n2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e5) {
              return typeof e5;
            } : function(e5) {
              return e5 && "function" == typeof Symbol && e5.constructor === Symbol && e5 !== Symbol.prototype ? "symbol" : typeof e5;
            })(e4);
          }
          function r(t3) {
            return "function" == typeof Symbol && "symbol" === n2(Symbol.iterator) ? e3.exports = r = function(e4) {
              return n2(e4);
            } : e3.exports = r = function(e4) {
              return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : n2(e4);
            }, r(t3);
          }
          e3.exports = r;
        }, function(e3, t2, n2) {
          var r = n2(5), o = n2(6), i = n2(7);
          e3.exports = function(e4, t3) {
            return r(e4) || o(e4, t3) || i();
          };
        }, function(e3, t2) {
          e3.exports = function(e4, t3, n2) {
            return t3 in e4 ? Object.defineProperty(e4, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e4[t3] = n2, e4;
          };
        }, function(e3, t2, n2) {
          e3.exports = n2(4);
        }, function(e3, t2, n2) {
          "use strict";
          n2.r(t2);
          var r = n2(1), o = n2.n(r), i = n2(2), a = n2.n(i), s = n2(0), c = n2.n(s), u = function(e4) {
            return void 0 === e4 ? e4 : JSON.parse(JSON.stringify(e4));
          }, l = function(e4) {
            return e4.split(/\./g);
          }, f = function(e4) {
            return null == e4;
          }, d = function(e4) {
            return !!e4 && "object" === c()(e4) && !Array.isArray(e4);
          }, p = function e4(t3, n3) {
            if (d(t3) && d(n3)) {
              for (var r2 in n3) d(n3[r2]) ? (t3[r2] && c()(t3[r2]) === c()(n3[r2]) || Object.assign(t3, a()({}, r2, {})), e4(t3[r2], n3[r2])) : Object.assign(t3, a()({}, r2, n3[r2]));
              return t3;
            }
            return n3;
          }, h2 = function(e4, t3, n3) {
            if (f(t3)) return e4;
            var r2;
            try {
              r2 = l(t3).reduce(function(e5, t4) {
                return e5[t4];
              }, Object.assign({}, e4));
            } catch (e5) {
            }
            return void 0 === r2 ? n3 : r2;
          }, L = function(e4, t3, n3) {
            var r2 = l(t3), o2 = r2.length;
            if (n3) for (var i2 = e4, a2 = 0; a2 < o2; a2++) {
              var s2 = r2[a2];
              void 0 === i2[s2] && (i2[s2] = {}), i2 = i2[s2];
            }
            var c2 = 1 === o2 ? r2[0] : r2.pop();
            return [1 === o2 ? e4 : h2(e4, r2.join(".")), c2];
          };
          t2.default = function(e4) {
            var t3, n3 = function(e5) {
              return t3 = u(e5);
            };
            return n3(e4), { get: function(e5, n4) {
              return u(h2(t3, e5, n4));
            }, set: function(e5, n4) {
              var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              return u(function(e6, t4, n5, r3) {
                if (false !== r3.parse) try {
                  n5 = void 0 === n5 ? n5 : JSON.parse(n5);
                } catch (e7) {
                }
                if (f(t4)) {
                  var i2 = false !== r3.merge ? p(e6, n5) : n5;
                  return Object.assign(e6, i2);
                }
                var a2 = L(e6, t4, true), s2 = o()(a2, 2), c2 = s2[0], u2 = s2[1];
                f(c2[u2]) && (c2[u2] = {});
                var l2 = false !== r3.merge ? p(c2[u2], n5) : n5;
                return c2[u2] = l2, l2;
              }(t3, e5, n4, r2));
            }, push: function(e5, n4) {
              return u(function(e6, t4, n5) {
                var r2 = h2(e6, t4);
                if (!Array.isArray(r2)) throw new Error("The key '".concat(t4, "' is not an array"));
                return r2.push(n5), r2;
              }(t3, e5, n4));
            }, remove: function(e5) {
              return u(function(e6, t4) {
                var n4 = L(e6, t4), r2 = o()(n4, 2), i2 = r2[0], a2 = r2[1];
                return void 0 !== i2[a2] && (i2 instanceof Array ? i2.splice(i2.indexOf(i2[a2]), 1) : delete i2[a2]), i2;
              }(t3, e5));
            }, reset: function(t4) {
              return u(n3(t4 || e4));
            }, toString: function() {
              return JSON.stringify(t3);
            } };
          };
        }, function(e3, t2) {
          e3.exports = function(e4) {
            if (Array.isArray(e4)) return e4;
          };
        }, function(e3, t2) {
          e3.exports = function(e4, t3) {
            var n2 = [], r = true, o = false, i = void 0;
            try {
              for (var a, s = e4[Symbol.iterator](); !(r = (a = s.next()).done) && (n2.push(a.value), !t3 || n2.length !== t3); r = true) ;
            } catch (e5) {
              o = true, i = e5;
            } finally {
              try {
                r || null == s.return || s.return();
              } finally {
                if (o) throw i;
              }
            }
            return n2;
          };
        }, function(e3, t2) {
          e3.exports = function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }]);
      }, function(e2, t) {
        e2.exports = function(e3, t2) {
          (null == t2 || t2 > e3.length) && (t2 = e3.length);
          for (var n = 0, r = new Array(t2); n < t2; n++) r[n] = e3[n];
          return r;
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        var r = n(18);
        e2.exports = function(e3, t2) {
          if (e3) {
            if ("string" == typeof e3) return r(e3, t2);
            var n2 = Object.prototype.toString.call(e3).slice(8, -1);
            return "Object" === n2 && e3.constructor && (n2 = e3.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(e3) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? r(e3, t2) : void 0;
          }
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        function n(t2, r) {
          return e2.exports = n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e3, t3) {
            return e3.__proto__ = t3, e3;
          }, e2.exports.__esModule = true, e2.exports.default = e2.exports, n(t2, r);
        }
        e2.exports = n, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        var n;
        n = /* @__PURE__ */ function() {
          return this;
        }();
        try {
          n = n || new Function("return this")();
        } catch (e3) {
          "object" == typeof window && (n = window);
        }
        e2.exports = n;
      }, function(e2, t, n) {
        "use strict";
        t.match = function(e3, t2) {
          return c(e3).some(function(e4) {
            var n2 = e4.inverse, r2 = "all" === e4.type || t2.type === e4.type;
            if (r2 && n2 || !r2 && !n2) return false;
            var o2 = e4.expressions.every(function(e5) {
              var n3 = e5.feature, r3 = e5.modifier, o3 = e5.value, i2 = t2[n3];
              if (!i2) return false;
              switch (n3) {
                case "orientation":
                case "scan":
                  return i2.toLowerCase() === o3.toLowerCase();
                case "width":
                case "height":
                case "device-width":
                case "device-height":
                  o3 = f(o3), i2 = f(i2);
                  break;
                case "resolution":
                  o3 = l(o3), i2 = l(i2);
                  break;
                case "aspect-ratio":
                case "device-aspect-ratio":
                case "device-pixel-ratio":
                  o3 = u(o3), i2 = u(i2);
                  break;
                case "grid":
                case "color":
                case "color-index":
                case "monochrome":
                  o3 = parseInt(o3, 10) || 1, i2 = parseInt(i2, 10) || 0;
              }
              switch (r3) {
                case "min":
                  return i2 >= o3;
                case "max":
                  return i2 <= o3;
                default:
                  return i2 === o3;
              }
            });
            return o2 && !n2 || !o2 && n2;
          });
        }, t.parse = c;
        var r = /(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i, o = /\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/, i = /^(?:(min|max)-)?(.+)/, a = /(em|rem|px|cm|mm|in|pt|pc)?$/, s = /(dpi|dpcm|dppx)?$/;
        function c(e3) {
          return e3.split(",").map(function(e4) {
            var t2 = (e4 = e4.trim()).match(r), n2 = t2[1], a2 = t2[2], s2 = t2[3] || "", c2 = {};
            return c2.inverse = !!n2 && "not" === n2.toLowerCase(), c2.type = a2 ? a2.toLowerCase() : "all", s2 = s2.match(/\([^\)]+\)/g) || [], c2.expressions = s2.map(function(e5) {
              var t3 = e5.match(o), n3 = t3[1].toLowerCase().match(i);
              return { modifier: n3[1], feature: n3[2], value: t3[2] };
            }), c2;
          });
        }
        function u(e3) {
          var t2, n2 = Number(e3);
          return n2 || (n2 = (t2 = e3.match(/^(\d+)\s*\/\s*(\d+)$/))[1] / t2[2]), n2;
        }
        function l(e3) {
          var t2 = parseFloat(e3);
          switch (String(e3).match(s)[1]) {
            case "dpcm":
              return t2 / 2.54;
            case "dppx":
              return 96 * t2;
            default:
              return t2;
          }
        }
        function f(e3) {
          var t2 = parseFloat(e3);
          switch (String(e3).match(a)[1]) {
            case "em":
            case "rem":
              return 16 * t2;
            case "cm":
              return 96 * t2 / 2.54;
            case "mm":
              return 96 * t2 / 2.54 / 10;
            case "in":
              return 96 * t2;
            case "pt":
              return 72 * t2;
            case "pc":
              return 72 * t2 / 12;
            default:
              return t2;
          }
        }
      }, function(e2, t, n) {
        var r;
        !function(o) {
          "use strict";
          var i, a, s, c = (i = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g, a = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, s = /[^-+\dA-Z]/g, function(e3, t2, n2, r2) {
            if (1 !== arguments.length || "string" !== d(e3) || /\d/.test(e3) || (t2 = e3, e3 = void 0), (e3 = e3 || /* @__PURE__ */ new Date()) instanceof Date || (e3 = new Date(e3)), isNaN(e3)) throw TypeError("Invalid date");
            var o2 = (t2 = String(c.masks[t2] || t2 || c.masks.default)).slice(0, 4);
            "UTC:" !== o2 && "GMT:" !== o2 || (t2 = t2.slice(4), n2 = true, "GMT:" === o2 && (r2 = true));
            var p = n2 ? "getUTC" : "get", h2 = e3[p + "Date"](), L = e3[p + "Day"](), _ = e3[p + "Month"](), v = e3[p + "FullYear"](), m = e3[p + "Hours"](), y = e3[p + "Minutes"](), E = e3[p + "Seconds"](), g = e3[p + "Milliseconds"](), O = n2 ? 0 : e3.getTimezoneOffset(), A = l(e3), B = f(e3), b = { d: h2, dd: u(h2), ddd: c.i18n.dayNames[L], dddd: c.i18n.dayNames[L + 7], m: _ + 1, mm: u(_ + 1), mmm: c.i18n.monthNames[_], mmmm: c.i18n.monthNames[_ + 12], yy: String(v).slice(2), yyyy: v, h: m % 12 || 12, hh: u(m % 12 || 12), H: m, HH: u(m), M: y, MM: u(y), s: E, ss: u(E), l: u(g, 3), L: u(Math.round(g / 10)), t: m < 12 ? c.i18n.timeNames[0] : c.i18n.timeNames[1], tt: m < 12 ? c.i18n.timeNames[2] : c.i18n.timeNames[3], T: m < 12 ? c.i18n.timeNames[4] : c.i18n.timeNames[5], TT: m < 12 ? c.i18n.timeNames[6] : c.i18n.timeNames[7], Z: r2 ? "GMT" : n2 ? "UTC" : (String(e3).match(a) || [""]).pop().replace(s, ""), o: (O > 0 ? "-" : "+") + u(100 * Math.floor(Math.abs(O) / 60) + Math.abs(O) % 60, 4), S: ["th", "st", "nd", "rd"][h2 % 10 > 3 ? 0 : (h2 % 100 - h2 % 10 != 10) * h2 % 10], W: A, N: B };
            return t2.replace(i, function(e4) {
              return e4 in b ? b[e4] : e4.slice(1, e4.length - 1);
            });
          });
          function u(e3, t2) {
            for (e3 = String(e3), t2 = t2 || 2; e3.length < t2; ) e3 = "0" + e3;
            return e3;
          }
          function l(e3) {
            var t2 = new Date(e3.getFullYear(), e3.getMonth(), e3.getDate());
            t2.setDate(t2.getDate() - (t2.getDay() + 6) % 7 + 3);
            var n2 = new Date(t2.getFullYear(), 0, 4);
            n2.setDate(n2.getDate() - (n2.getDay() + 6) % 7 + 3);
            var r2 = t2.getTimezoneOffset() - n2.getTimezoneOffset();
            t2.setHours(t2.getHours() - r2);
            var o2 = (t2 - n2) / 6048e5;
            return 1 + Math.floor(o2);
          }
          function f(e3) {
            var t2 = e3.getDay();
            return 0 === t2 && (t2 = 7), t2;
          }
          function d(e3) {
            return null === e3 ? "null" : void 0 === e3 ? "undefined" : "object" != typeof e3 ? typeof e3 : Array.isArray(e3) ? "array" : {}.toString.call(e3).slice(8, -1).toLowerCase();
          }
          c.masks = { default: "ddd mmm dd yyyy HH:MM:ss", shortDate: "m/d/yy", mediumDate: "mmm d, yyyy", longDate: "mmmm d, yyyy", fullDate: "dddd, mmmm d, yyyy", shortTime: "h:MM TT", mediumTime: "h:MM:ss TT", longTime: "h:MM:ss TT Z", isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:sso", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'", expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z" }, c.i18n = { dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"] }, void 0 === (r = function() {
            return c;
          }.call(t, n, t, e2)) || (e2.exports = r);
        }();
      }, function(e2, t, n) {
        var r = n(20), o = n(35);
        function i(t2, n2, a) {
          return o() ? (e2.exports = i = Reflect.construct.bind(), e2.exports.__esModule = true, e2.exports.default = e2.exports) : (e2.exports = i = function(e3, t3, n3) {
            var o2 = [null];
            o2.push.apply(o2, t3);
            var i2 = new (Function.bind.apply(e3, o2))();
            return n3 && r(i2, n3.prototype), i2;
          }, e2.exports.__esModule = true, e2.exports.default = e2.exports), i.apply(null, arguments);
        }
        e2.exports = i, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        var r = n(36);
        e2.exports = function(e3, t2) {
          if (null == e3) return {};
          var n2, o, i = r(e3, t2);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(e3);
            for (o = 0; o < a.length; o++) n2 = a[o], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e3, n2) && (i[n2] = e3[n2]);
          }
          return i;
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        e2.exports = n(37);
      }, function(e2, t, n) {
        var r = n(18);
        e2.exports = function(e3) {
          if (Array.isArray(e3)) return r(e3);
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        e2.exports = function(e3) {
          if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"]) return Array.from(e3);
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        e2.exports = function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        var r = n(3);
        e2.exports = function(e3, t2) {
          for (; !Object.prototype.hasOwnProperty.call(e3, t2) && null !== (e3 = r(e3)); ) ;
          return e3;
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        e2.exports = function(e3) {
          if (Array.isArray(e3)) return e3;
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        e2.exports = function(e3, t2) {
          var n = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
          if (null != n) {
            var r, o, i = [], a = true, s = false;
            try {
              for (n = n.call(e3); !(a = (r = n.next()).done) && (i.push(r.value), !t2 || i.length !== t2); a = true) ;
            } catch (e4) {
              s = true, o = e4;
            } finally {
              try {
                a || null == n.return || n.return();
              } finally {
                if (s) throw o;
              }
            }
            return i;
          }
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        e2.exports = function() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        var r = n(16).default;
        function o() {
          "use strict";
          e2.exports = o = function() {
            return t2;
          }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
          var t2 = {}, n2 = Object.prototype, i = n2.hasOwnProperty, a = "function" == typeof Symbol ? Symbol : {}, s = a.iterator || "@@iterator", c = a.asyncIterator || "@@asyncIterator", u = a.toStringTag || "@@toStringTag";
          function l(e3, t3, n3) {
            return Object.defineProperty(e3, t3, { value: n3, enumerable: true, configurable: true, writable: true }), e3[t3];
          }
          try {
            l({}, "");
          } catch (e3) {
            l = function(e4, t3, n3) {
              return e4[t3] = n3;
            };
          }
          function f(e3, t3, n3, r2) {
            var o2 = t3 && t3.prototype instanceof h2 ? t3 : h2, i2 = Object.create(o2.prototype), a2 = new S(r2 || []);
            return i2._invoke = /* @__PURE__ */ function(e4, t4, n4) {
              var r3 = "suspendedStart";
              return function(o3, i3) {
                if ("executing" === r3) throw new Error("Generator is already running");
                if ("completed" === r3) {
                  if ("throw" === o3) throw i3;
                  return P();
                }
                for (n4.method = o3, n4.arg = i3; ; ) {
                  var a3 = n4.delegate;
                  if (a3) {
                    var s2 = A(a3, n4);
                    if (s2) {
                      if (s2 === p) continue;
                      return s2;
                    }
                  }
                  if ("next" === n4.method) n4.sent = n4._sent = n4.arg;
                  else if ("throw" === n4.method) {
                    if ("suspendedStart" === r3) throw r3 = "completed", n4.arg;
                    n4.dispatchException(n4.arg);
                  } else "return" === n4.method && n4.abrupt("return", n4.arg);
                  r3 = "executing";
                  var c2 = d(e4, t4, n4);
                  if ("normal" === c2.type) {
                    if (r3 = n4.done ? "completed" : "suspendedYield", c2.arg === p) continue;
                    return { value: c2.arg, done: n4.done };
                  }
                  "throw" === c2.type && (r3 = "completed", n4.method = "throw", n4.arg = c2.arg);
                }
              };
            }(e3, n3, a2), i2;
          }
          function d(e3, t3, n3) {
            try {
              return { type: "normal", arg: e3.call(t3, n3) };
            } catch (e4) {
              return { type: "throw", arg: e4 };
            }
          }
          t2.wrap = f;
          var p = {};
          function h2() {
          }
          function L() {
          }
          function _() {
          }
          var v = {};
          l(v, s, function() {
            return this;
          });
          var m = Object.getPrototypeOf, y = m && m(m(T([])));
          y && y !== n2 && i.call(y, s) && (v = y);
          var E = _.prototype = h2.prototype = Object.create(v);
          function g(e3) {
            ["next", "throw", "return"].forEach(function(t3) {
              l(e3, t3, function(e4) {
                return this._invoke(t3, e4);
              });
            });
          }
          function O(e3, t3) {
            var n3;
            this._invoke = function(o2, a2) {
              function s2() {
                return new t3(function(n4, s3) {
                  !function n5(o3, a3, s4, c2) {
                    var u2 = d(e3[o3], e3, a3);
                    if ("throw" !== u2.type) {
                      var l2 = u2.arg, f2 = l2.value;
                      return f2 && "object" == r(f2) && i.call(f2, "__await") ? t3.resolve(f2.__await).then(function(e4) {
                        n5("next", e4, s4, c2);
                      }, function(e4) {
                        n5("throw", e4, s4, c2);
                      }) : t3.resolve(f2).then(function(e4) {
                        l2.value = e4, s4(l2);
                      }, function(e4) {
                        return n5("throw", e4, s4, c2);
                      });
                    }
                    c2(u2.arg);
                  }(o2, a2, n4, s3);
                });
              }
              return n3 = n3 ? n3.then(s2, s2) : s2();
            };
          }
          function A(e3, t3) {
            var n3 = e3.iterator[t3.method];
            if (void 0 === n3) {
              if (t3.delegate = null, "throw" === t3.method) {
                if (e3.iterator.return && (t3.method = "return", t3.arg = void 0, A(e3, t3), "throw" === t3.method)) return p;
                t3.method = "throw", t3.arg = new TypeError("The iterator does not provide a 'throw' method");
              }
              return p;
            }
            var r2 = d(n3, e3.iterator, t3.arg);
            if ("throw" === r2.type) return t3.method = "throw", t3.arg = r2.arg, t3.delegate = null, p;
            var o2 = r2.arg;
            return o2 ? o2.done ? (t3[e3.resultName] = o2.value, t3.next = e3.nextLoc, "return" !== t3.method && (t3.method = "next", t3.arg = void 0), t3.delegate = null, p) : o2 : (t3.method = "throw", t3.arg = new TypeError("iterator result is not an object"), t3.delegate = null, p);
          }
          function B(e3) {
            var t3 = { tryLoc: e3[0] };
            1 in e3 && (t3.catchLoc = e3[1]), 2 in e3 && (t3.finallyLoc = e3[2], t3.afterLoc = e3[3]), this.tryEntries.push(t3);
          }
          function b(e3) {
            var t3 = e3.completion || {};
            t3.type = "normal", delete t3.arg, e3.completion = t3;
          }
          function S(e3) {
            this.tryEntries = [{ tryLoc: "root" }], e3.forEach(B, this), this.reset(true);
          }
          function T(e3) {
            if (e3) {
              var t3 = e3[s];
              if (t3) return t3.call(e3);
              if ("function" == typeof e3.next) return e3;
              if (!isNaN(e3.length)) {
                var n3 = -1, r2 = function t4() {
                  for (; ++n3 < e3.length; ) if (i.call(e3, n3)) return t4.value = e3[n3], t4.done = false, t4;
                  return t4.value = void 0, t4.done = true, t4;
                };
                return r2.next = r2;
              }
            }
            return { next: P };
          }
          function P() {
            return { value: void 0, done: true };
          }
          return L.prototype = _, l(E, "constructor", _), l(_, "constructor", L), L.displayName = l(_, u, "GeneratorFunction"), t2.isGeneratorFunction = function(e3) {
            var t3 = "function" == typeof e3 && e3.constructor;
            return !!t3 && (t3 === L || "GeneratorFunction" === (t3.displayName || t3.name));
          }, t2.mark = function(e3) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e3, _) : (e3.__proto__ = _, l(e3, u, "GeneratorFunction")), e3.prototype = Object.create(E), e3;
          }, t2.awrap = function(e3) {
            return { __await: e3 };
          }, g(O.prototype), l(O.prototype, c, function() {
            return this;
          }), t2.AsyncIterator = O, t2.async = function(e3, n3, r2, o2, i2) {
            void 0 === i2 && (i2 = Promise);
            var a2 = new O(f(e3, n3, r2, o2), i2);
            return t2.isGeneratorFunction(n3) ? a2 : a2.next().then(function(e4) {
              return e4.done ? e4.value : a2.next();
            });
          }, g(E), l(E, u, "Generator"), l(E, s, function() {
            return this;
          }), l(E, "toString", function() {
            return "[object Generator]";
          }), t2.keys = function(e3) {
            var t3 = [];
            for (var n3 in e3) t3.push(n3);
            return t3.reverse(), function n4() {
              for (; t3.length; ) {
                var r2 = t3.pop();
                if (r2 in e3) return n4.value = r2, n4.done = false, n4;
              }
              return n4.done = true, n4;
            };
          }, t2.values = T, S.prototype = { constructor: S, reset: function(e3) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(b), !e3) for (var t3 in this) "t" === t3.charAt(0) && i.call(this, t3) && !isNaN(+t3.slice(1)) && (this[t3] = void 0);
          }, stop: function() {
            this.done = true;
            var e3 = this.tryEntries[0].completion;
            if ("throw" === e3.type) throw e3.arg;
            return this.rval;
          }, dispatchException: function(e3) {
            if (this.done) throw e3;
            var t3 = this;
            function n3(n4, r3) {
              return a2.type = "throw", a2.arg = e3, t3.next = n4, r3 && (t3.method = "next", t3.arg = void 0), !!r3;
            }
            for (var r2 = this.tryEntries.length - 1; r2 >= 0; --r2) {
              var o2 = this.tryEntries[r2], a2 = o2.completion;
              if ("root" === o2.tryLoc) return n3("end");
              if (o2.tryLoc <= this.prev) {
                var s2 = i.call(o2, "catchLoc"), c2 = i.call(o2, "finallyLoc");
                if (s2 && c2) {
                  if (this.prev < o2.catchLoc) return n3(o2.catchLoc, true);
                  if (this.prev < o2.finallyLoc) return n3(o2.finallyLoc);
                } else if (s2) {
                  if (this.prev < o2.catchLoc) return n3(o2.catchLoc, true);
                } else {
                  if (!c2) throw new Error("try statement without catch or finally");
                  if (this.prev < o2.finallyLoc) return n3(o2.finallyLoc);
                }
              }
            }
          }, abrupt: function(e3, t3) {
            for (var n3 = this.tryEntries.length - 1; n3 >= 0; --n3) {
              var r2 = this.tryEntries[n3];
              if (r2.tryLoc <= this.prev && i.call(r2, "finallyLoc") && this.prev < r2.finallyLoc) {
                var o2 = r2;
                break;
              }
            }
            o2 && ("break" === e3 || "continue" === e3) && o2.tryLoc <= t3 && t3 <= o2.finallyLoc && (o2 = null);
            var a2 = o2 ? o2.completion : {};
            return a2.type = e3, a2.arg = t3, o2 ? (this.method = "next", this.next = o2.finallyLoc, p) : this.complete(a2);
          }, complete: function(e3, t3) {
            if ("throw" === e3.type) throw e3.arg;
            return "break" === e3.type || "continue" === e3.type ? this.next = e3.arg : "return" === e3.type ? (this.rval = this.arg = e3.arg, this.method = "return", this.next = "end") : "normal" === e3.type && t3 && (this.next = t3), p;
          }, finish: function(e3) {
            for (var t3 = this.tryEntries.length - 1; t3 >= 0; --t3) {
              var n3 = this.tryEntries[t3];
              if (n3.finallyLoc === e3) return this.complete(n3.completion, n3.afterLoc), b(n3), p;
            }
          }, catch: function(e3) {
            for (var t3 = this.tryEntries.length - 1; t3 >= 0; --t3) {
              var n3 = this.tryEntries[t3];
              if (n3.tryLoc === e3) {
                var r2 = n3.completion;
                if ("throw" === r2.type) {
                  var o2 = r2.arg;
                  b(n3);
                }
                return o2;
              }
            }
            throw new Error("illegal catch attempt");
          }, delegateYield: function(e3, t3, n3) {
            return this.delegate = { iterator: T(e3), resultName: t3, nextLoc: n3 }, "next" === this.method && (this.arg = void 0), p;
          } }, t2;
        }
        e2.exports = o, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        e2.exports = function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if ("function" == typeof Proxy) return true;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), true;
          } catch (e3) {
            return false;
          }
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t) {
        e2.exports = function(e3, t2) {
          if (null == e3) return {};
          var n, r, o = {}, i = Object.keys(e3);
          for (r = 0; r < i.length; r++) n = i[r], t2.indexOf(n) >= 0 || (o[n] = e3[n]);
          return o;
        }, e2.exports.__esModule = true, e2.exports.default = e2.exports;
      }, function(e2, t, n) {
        "use strict";
        n.r(t), n.d(t, "Core", function() {
          return ht;
        }), n.d(t, "Window", function() {
          return Ae;
        }), n.d(t, "Desktop", function() {
          return dn;
        }), n.d(t, "Application", function() {
          return Ne;
        }), n.d(t, "Notification", function() {
          return Ln;
        }), n.d(t, "Notifications", function() {
          return vn;
        }), n.d(t, "WindowBehavior", function() {
          return An;
        }), n.d(t, "Auth", function() {
          return Fn;
        }), n.d(t, "Login", function() {
          return Cn;
        }), n.d(t, "Websocket", function() {
          return q;
        }), n.d(t, "CoreServiceProvider", function() {
          return Ar;
        }), n.d(t, "DesktopServiceProvider", function() {
          return br;
        }), n.d(t, "NotificationServiceProvider", function() {
          return Tr;
        }), n.d(t, "VFSServiceProvider", function() {
          return oo;
        }), n.d(t, "AuthServiceProvider", function() {
          return ao;
        }), n.d(t, "SettingsServiceProvider", function() {
          return mo;
        }), n.d(t, "logger", function() {
          return D;
        }), n.d(t, "Splash", function() {
          return je;
        }), n.d(t, "Settings", function() {
          return ho;
        }), n.d(t, "Tray", function() {
          return Jn;
        }), n.d(t, "Search", function() {
          return cn;
        }), n.d(t, "Packages", function() {
          return Xn;
        }), n.d(t, "Filesystem", function() {
          return no;
        }), n.d(t, "Clipboard", function() {
          return er;
        }), n.d(t, "Middleware", function() {
          return tr;
        }), n.d(t, "BasicApplication", function() {
          return Er;
        }), n.d(t, "configuration", function() {
          return qe;
        }), n.d(t, "icon", function() {
          return w;
        });
        var r = {};
        n.r(r), n.d(r, "draggable", function() {
          return ne;
        }), n.d(r, "droppable", function() {
          return re;
        });
        var o = {};
        n.r(o), n.d(o, "parentDirectory", function() {
          return Ot;
        }), n.d(o, "pathJoin", function() {
          return At;
        }), n.d(o, "humanFileSize", function() {
          return Nt;
        }), n.d(o, "transformReaddir", function() {
          return jt;
        }), n.d(o, "transformArrayBuffer", function() {
          return Ct;
        }), n.d(o, "getFileIcon", function() {
          return kt;
        }), n.d(o, "createFileIter", function() {
          return It;
        }), n.d(o, "basename", function() {
          return Dt;
        }), n.d(o, "pathname", function() {
          return Mt;
        }), n.d(o, "parseMountpointPrefix", function() {
          return xt;
        }), n.d(o, "filterMountByGroups", function() {
          return Ft;
        }), n.d(o, "createWatchEvents", function() {
          return Ut;
        });
        var i = {};
        n.r(i), n.d(i, "en_EN", function() {
          return nr;
        }), n.d(i, "fr_FR", function() {
          return rr;
        }), n.d(i, "nb_NO", function() {
          return or;
        }), n.d(i, "sl_SI", function() {
          return ir;
        }), n.d(i, "vi_VN", function() {
          return ar;
        }), n.d(i, "de_DE", function() {
          return sr;
        }), n.d(i, "zh_CN", function() {
          return cr;
        }), n.d(i, "fa_FA", function() {
          return ur;
        }), n.d(i, "pt_BR", function() {
          return lr;
        }), n.d(i, "ru_RU", function() {
          return fr;
        }), n.d(i, "tr_TR", function() {
          return dr;
        }), n.d(i, "sv_SE", function() {
          return pr;
        });
        var a = {};
        n.r(a), n.d(a, "capabilities", function() {
          return jr;
        }), n.d(a, "readdir", function() {
          return Cr;
        }), n.d(a, "readfile", function() {
          return kr;
        }), n.d(a, "writefile", function() {
          return Ir;
        }), n.d(a, "copy", function() {
          return Dr;
        }), n.d(a, "rename", function() {
          return Mr;
        }), n.d(a, "move", function() {
          return xr;
        }), n.d(a, "mkdir", function() {
          return Fr;
        }), n.d(a, "unlink", function() {
          return Ur;
        }), n.d(a, "exists", function() {
          return Hr;
        }), n.d(a, "stat", function() {
          return Gr;
        }), n.d(a, "url", function() {
          return Kr;
        }), n.d(a, "download", function() {
          return Wr;
        }), n.d(a, "search", function() {
          return Vr;
        }), n.d(a, "touch", function() {
          return $r;
        });
        var s = n(4), c = n.n(s), u = n(0), l = n.n(u), f = n(1), d = n.n(f), p = n(2), h2 = n.n(p), L = n(13), _ = n.n(L), v = n(8), m = n.n(v), y = n(5), E = n.n(y), g = n(6), O = n.n(g), A = n(3), B = n.n(A), b = n(11), S = n.n(b), T = n(7), P = n(22), w = n.p + "881c86876af63b732063d7bdd51bb226.png", R = ["debug", "log", "info", "warn", "error"], N = [], j = function(e3, t2) {
          return N.reduce(function(t3, n2) {
            return n2.apply(void 0, [e3].concat(c()(t3)));
          }, t2);
        }, C = function(e3) {
          var t2 = function(e4, t3) {
            return "function" == typeof t3[e4].bind ? t3[e4].bind(t3) : Function.prototype.bind.apply(t3[e4], t3);
          }(e3, console);
          return N.length > 0 ? function() {
            for (var n2 = arguments.length, r2 = new Array(n2), o2 = 0; o2 < n2; o2++) r2[o2] = arguments[o2];
            return t2.apply(void 0, c()(j(e3, r2)));
          } : t2;
        }, k = function(e3) {
          return R.forEach(function(t2) {
            return e3[t2] = C(t2);
          });
        }, I = { addMiddleware: function(e3) {
          N.push(e3), k(I);
        }, clearMiddleware: function() {
          N = [], k(I);
        } };
        k(I);
        var D = I;
        function M(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function x(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? M(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : M(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var F = function(e3) {
          return x({ classNames: [], modal: false, ontop: false, gravity: false, moveable: true, resizable: true, focusable: true, maximizable: true, minimizable: true, sessionable: true, closeable: true, header: true, controls: true, visibility: "global", shadowDOM: false, clamp: true, droppable: true, mediaQueries: { small: "screen and (max-width: 640px)", medium: "screen and (min-width: 640px) and (max-width: 1024px)", big: "screen and (min-width: 1024px)" }, minDimension: { width: 100, height: 100 }, maxDimension: { width: -1, height: -1 } }, e3);
        }, U = function(e3, t2, n2) {
          return x({ title: t2.title || t2.id, icon: t2.icon || w, media: null, moving: false, resizing: false, loading: false, focused: false, maximized: false, minimized: false, zIndex: 1, styles: {}, position: x({ left: null, top: null }, t2.position), dimension: x({ width: Math.max(n2.minDimension.width, 100), height: Math.max(n2.minDimension.height, 100) }, t2.dimension) }, e3);
        }, H = function(e3, t2) {
          var n2 = t2.dimension, r2 = t2.position, o2 = e3.width - n2.width, i2 = e3.height - n2.height + e3.top;
          return { left: Math.max(0, Math.min(o2, r2.left)), top: Math.max(0, Math.max(e3.top, Math.min(i2, r2.top))) };
        }, G = function(e3, t2) {
          if ("function" == typeof t2) {
            if (e3.attributes.shadowDOM) try {
              var n2 = "string" == typeof e3.attributes.shadowDOM ? e3.attributes.shadowDOM : "open";
              return void t2(e3.$content.attachShadow({ mode: n2 }), e3);
            } catch (e4) {
              D.warn("Shadow DOM not supported?", e4);
            }
            t2(e3.$content, e3);
          }
        }, K = function(e3, t2) {
          var n2 = function(e4) {
            var t3 = e4.attributes, n3 = t3.maxDimension, r3 = t3.minDimension, o3 = e4.state, i3 = o3.position, a3 = o3.dimension, s3 = { left: i3.left + a3.width - r3.width, top: i3.top + a3.height - r3.height }, c3 = function(e5, t4, n4) {
              var r4 = -1 === e5 ? n4 : Math.max(e5, n4);
              return -1 === t4 ? r4 : Math.min(t4, r4);
            };
            return function(e5, t4, o4, i4) {
              return { width: c3(r3.width, n3.width, e5), height: c3(r3.height, n3.height, t4), top: c3(-1, s3.top, o4), left: c3(-1, s3.left, i4) };
            };
          }(e3), r2 = e3.state, o2 = r2.position, i2 = r2.dimension, a2 = t2.getAttribute("data-direction").split(""), s2 = function(e4) {
            return -1 !== a2.indexOf(e4);
          }, c2 = s2("e") ? 1 : s2("w") ? -1 : 0, u2 = s2("s") ? 1 : s2("n") ? -1 : 0;
          return function(e4, t3) {
            var r3 = i2.width + e4 * c2, a3 = i2.height + t3 * u2, s3 = -1 === u2 ? o2.top + t3 : o2.top, l2 = -1 === c2 ? o2.left + e4 : o2.left;
            return n2(r3, a3, s3, l2);
          };
        }, W = function(e3) {
          return Object.keys(e3.attributes.mediaQueries).filter(function(t2) {
            return P.match(e3.attributes.mediaQueries[t2], { type: "screen", orientation: (n2 = window.screen, n2 && n2.orientation ? n2.orientation.type : window.matchMedia("(orientation: portrait)") ? "portrait" : "landscape"), width: e3.$element.offsetWidth || e3.state.dimension.width, height: e3.$element.offsetHeight || e3.state.dimension.height });
            var n2;
          }).pop();
        }, V = function(e3, t2, n2) {
          var r2 = function(e4, t3) {
            return t3 instanceof RegExp ? !!e4.match(t3) : e4 === t3;
          }, o2 = e3.find(function(e4) {
            var o3 = e4.application, i3 = e4.window;
            return !(!o3 && !i3) && (!(o3 && !r2(t2, o3)) && !(i3 && !r2(n2 || "", i3)));
          }), i2 = o2 && o2.options ? o2.options : {};
          return ["position", "dimension", "attributes"].reduce(function(e4, t3) {
            return i2[t3] ? x(x({}, e4), {}, l()({}, t3, i2[t3])) : e4;
          }, {});
        };
        function $(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function z(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? $(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : $(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        function Y(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var Z = ["open", "close", "message", "error"], q = function(e3) {
          E()(n2, e3);
          var t2 = Y(n2);
          function n2(e4, r2) {
            var o2, i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return d()(this, n2), D.debug("Websocket::constructor()", e4, r2), (o2 = t2.call(this, "Websocket@" + e4)).uri = r2, o2.closed = false, o2.connected = false, o2.connecting = false, o2.reconnecting = false, o2.connectfailed = false, o2.options = z({ reconnect: true, interval: 1e3, open: true }, i2), o2.connection = null, o2._attachEvents(), o2.options.open && o2.open(), o2;
          }
          return h2()(n2, [{ key: "_destroyConnection", value: function() {
            var e4 = this;
            this.connection && (Z.forEach(function(t3) {
              e4.connection["on".concat(t3)] = function() {
              };
            }), this.reconnecting = clearInterval(this.reconnecting), this.connection = null);
          } }, { key: "_attachEvents", value: function() {
            var e4 = this;
            this.on("open", function(t3) {
              var n3 = !!e4.reconnecting;
              e4.connected = true, e4.reconnecting = false, e4.connectfailed = false, e4.reconnecting = clearInterval(e4.reconnecting), e4.emit("connected", t3, n3);
            }), this.on("close", function(t3) {
              e4.connected || e4.connectfailed || (e4.emit("failed", t3), e4.connectfailed = true), clearInterval(e4.reconnecting), e4._destroyConnection(), e4.connected = false, e4.options.reconnect && (e4.reconnecting = setInterval(function() {
                e4.closed || e4.open();
              }, e4.options.interval)), e4.emit("disconnected", t3, e4.closed);
            });
          } }, { key: "open", value: function() {
            var e4 = this, t3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.connection && !t3 || (this._destroyConnection(), this.reconnecting = clearInterval(this.reconnecting), this.connection = new WebSocket(this.uri), this.closed = false, Z.forEach(function(t4) {
              e4.connection["on".concat(t4)] = function() {
                for (var n3 = arguments.length, r2 = new Array(n3), o2 = 0; o2 < n3; o2++) r2[o2] = arguments[o2];
                return e4.emit.apply(e4, [t4].concat(r2));
              };
            }));
          } }, { key: "send", value: function() {
            var e4;
            return (e4 = this.connection).send.apply(e4, arguments);
          } }, { key: "close", value: function() {
            var e4;
            return this.closed = true, (e4 = this.connection).close.apply(e4, arguments);
          } }]), n2;
        }(T.EventEmitter);
        function X(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function Q(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? X(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : X(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var J = function(e3) {
          try {
            for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++) n2[r2 - 1] = arguments[r2];
            var o2 = e3.apply(void 0, n2);
            if ("boolean" == typeof o2) return o2;
          } catch (e4) {
            D.warn("droppable value parsing error", e4);
          }
          return true;
        }, ee = function(e3, t2) {
          var n2, r2 = [];
          if (e3.dataTransfer) {
            r2 = e3.dataTransfer.files ? Array.from(e3.dataTransfer.files) : [];
            try {
              var o2 = e3.dataTransfer.getData(t2);
              try {
                n2 = "application/json" === t2 ? void 0 === o2 ? o2 : JSON.parse(o2) : o2;
              } catch (e4) {
                n2 = o2, D.warn("droppable dataTransfer parsing error", e4);
              }
            } catch (e4) {
              D.warn("droppable dataTransfer parsing error", e4);
            }
          }
          return { files: r2, data: n2 };
        }, te = function(e3, t2, n2, r2) {
          var o2 = "function" == typeof r2, i2 = "application/json" === e3 ? JSON.stringify(n2) : n2;
          return function(n3, a2, s2) {
            if (n3.dataTransfer) {
              if (n3.dataTransfer.setDragImage && o2) try {
                r2(n3, a2, s2);
              } catch (e4) {
                D.warn("draggable dragstart setDragImage error", e4);
              }
              try {
                n3.dataTransfer.effectAllowed = t2, n3.dataTransfer.setData(e3, i2);
              } catch (e4) {
                D.warn("draggable dragstart dataTransfer error", e4);
              }
            }
          };
        }, ne = function(e3) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = Q({ type: "application/json", effect: "move", ondragstart: function() {
            return true;
          }, ondragend: function() {
            return true;
          }, setDragImage: null }, t2), r2 = n2.type, o2 = n2.effect, i2 = n2.data, a2 = n2.ondragstart, s2 = n2.ondragend, c2 = n2.setDragImage, u2 = te(r2, o2, i2, c2), l2 = function(n3) {
            return e3.setAttribute("aria-grabbed", "true"), u2(n3, e3, t2), a2(n3);
          }, f2 = function(t3) {
            return e3.setAttribute("aria-grabbed", "false"), s2(t3);
          }, d2 = function() {
            e3.removeAttribute("draggable"), e3.removeAttribute("aria-grabbed"), e3.removeEventListener("dragstart", l2), e3.removeEventListener("dragend", f2), e3.classList.remove("osjs__draggable");
          };
          return e3.setAttribute("draggable", "true"), e3.setAttribute("aria-grabbed", "false"), e3.addEventListener("dragstart", l2), e3.addEventListener("dragend", f2), e3.classList.add("osjs__draggable"), { destroy: d2 };
        }, re = function(e3) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = Q({ type: "application/json", effect: "move", ondragenter: function() {
            return true;
          }, ondragover: function() {
            return true;
          }, ondragleave: function() {
            return true;
          }, ondrop: function() {
            return true;
          }, strict: false }, t2), r2 = n2.strict, o2 = n2.type, i2 = n2.effect, a2 = n2.ondragenter, s2 = n2.ondragover, c2 = n2.ondragleave, u2 = n2.ondrop, l2 = function(e4) {
            return a2(e4);
          }, f2 = function(t3) {
            return e3.classList.remove("osjs__drop"), J(c2, t3);
          }, d2 = function(t3) {
            return t3.preventDefault(), e3.contains(t3.target) ? (t3.stopPropagation(), t3.dataTransfer.dropEffect = i2, e3.classList.add("osjs__drop"), J(s2, t3)) : (e3.classList.remove("osjs__drop"), false);
          }, p2 = function(t3) {
            if (r2 && t3.target !== e3) return false;
            var n3 = ee(t3, o2), i3 = n3.files, a3 = n3.data;
            return t3.stopPropagation(), t3.preventDefault(), e3.classList.remove("osjs__drop"), J(u2, t3, a3, i3);
          }, h3 = function() {
            e3.removeAttribute("aria-dropeffect", i2), e3.removeEventListener("dragenter", l2), e3.removeEventListener("dragover", d2), e3.removeEventListener("dragleave", f2), e3.removeEventListener("drop", p2), e3.classList.remove("osjs__droppable");
          };
          return e3.setAttribute("aria-dropeffect", i2), e3.addEventListener("dragenter", l2), e3.addEventListener("dragover", d2), e3.addEventListener("dragleave", f2), e3.addEventListener("drop", p2), e3.classList.add("osjs__droppable"), { destroy: h3 };
        };
        function oe(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function ie(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? oe(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : oe(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var ae, se, ce = "Notification" in window, ue = function(e3, t2) {
          return new Promise(function(n2, r2) {
            var o2 = document.createElement("link");
            return o2.setAttribute("rel", "stylesheet"), o2.setAttribute("type", "text/css"), o2.onload = function() {
              return n2(o2);
            }, o2.onerror = function(e4) {
              return r2(e4);
            }, o2.setAttribute("href", t2), e3.appendChild(o2), o2;
          });
        }, le = function(e3, t2) {
          var n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return new Promise(function(r2, o2) {
            var i2 = ie(ie({ async: false, defer: false }, n2), {}, { src: t2, onerror: function(e4) {
              return o2(e4);
            }, onload: function() {
              return r2(a2);
            } }), a2 = document.createElement("script");
            return a2.onreadystatechange = function() {
              "complete" !== this.readyState && "loaded" !== this.readyState || r2(a2);
            }, Object.assign(a2, i2), e3.appendChild(a2), a2;
          });
        }, fe = function(e3) {
          return Object.keys(e3).map(function(e4) {
            return [e4, e4.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()];
          }).map(function(t2) {
            return "".concat(t2[1], ": ").concat(e3[t2[0]]);
          }).join(";");
        }, de = function() {
          var e3 = false;
          try {
            var t2 = Object.defineProperty({}, "passive", { get: function() {
              return e3 = true;
            } });
            window.addEventListener("testPassive", null, t2), window.removeEventListener("testPassive", null, t2);
          } catch (e4) {
          }
          return function() {
            return e3;
          };
        }(), pe = function(e3) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = ie({ volume: 1 }, t2), r2 = new Audio();
          r2.volume = n2.volume, r2.src = e3;
          try {
            var o2 = r2.play();
            if (o2 instanceof Promise) return o2.then(function() {
              return r2;
            }).catch(function(t3) {
              return D.warn("Failed to play sound", e3, t3);
            });
          } catch (t3) {
            D.warn("Failed to play sound", e3, t3);
          }
          return Promise.resolve(r2);
        }, he = (ae = document.createElement("div"), se = ["WebkitTransition", "MozTransition", "OTransition", "transition"].some(function(e3) {
          return void 0 !== ae.style[e3];
        }), function() {
          return se;
        });
        function Le(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function _e(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Le(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Le(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        function ve(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var me = [], ye = 0, Ee = 1, ge = null, Oe = '<div class="osjs-window-inner">\n  <div class="osjs-window-header">\n    <div class="osjs-window-icon">\n      <div></div>\n    </div>\n    <div class="osjs-window-title"></div>\n    <div class="osjs-window-button" data-action="minimize">\n      <div></div>\n    </div>\n    <div class="osjs-window-button" data-action="maximize">\n      <div></div>\n    </div>\n    <div class="osjs-window-button" data-action="close">\n      <div></div>\n    </div>\n  </div>\n  <div class="osjs-window-content">\n  </div>\n  <div class="osjs-window-resize" data-direction="n"></div>\n  <div class="osjs-window-resize" data-direction="nw"></div>\n  <div class="osjs-window-resize" data-direction="w"></div>\n  <div class="osjs-window-resize" data-direction="sw"></div>\n  <div class="osjs-window-resize" data-direction="s"></div>\n  <div class="osjs-window-resize" data-direction="se"></div>\n  <div class="osjs-window-resize" data-direction="e"></div>\n  <div class="osjs-window-resize" data-direction="ne"></div>\n</div>'.replace(/\n\s+/g, "").trim(), Ae = function(e3) {
          E()(n2, e3);
          var t2 = ve(n2);
          function n2(e4) {
            var r2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return d()(this, n2), o2 = _e({ id: null, title: null, parent: null, template: null, ondestroy: null, attributes: {}, position: {}, dimension: {}, state: {} }, o2), D.debug("Window::constructor()", o2), r2 = t2.call(this, "Window@" + o2.id), "string" == typeof o2.position && (o2.attributes.gravity = o2.position, o2.position = {}), r2.id = o2.id, r2.wid = ++ye, r2.parent = o2.parent, r2.children = [], r2.core = e4, r2.destroyed = false, r2.rendered = false, r2.inited = false, r2.attributes = F(o2.attributes), r2.state = U(o2.state, o2, r2.attributes), r2.$element = document.createElement("div"), r2.$content = null, r2.$header = null, r2.$icon = null, r2.$title = null, r2._preventDefaultPosition = false, r2._loadingDebounce = null, r2._template = o2.template, r2._ondestroy = o2.ondestroy || function() {
              return true;
            }, r2._lastCssText = "", r2._lastAttributes = {}, me.push(_()(r2)), r2;
          }
          return h2()(n2, [{ key: "destroy", value: function() {
            var e4 = this;
            if (!this.destroyed && ("function" != typeof this._ondestroy || false !== this._ondestroy())) {
              this.destroyed = true, D.debug("Window::destroy()"), this.emit("destroy", this), this.core.emit("osjs/window:destroy", this), this.children.forEach(function(e5) {
                return e5.destroy();
              }), this.$element && this.$element.remove(), ge === this && (ge = null);
              var t3 = me.findIndex(function(t4) {
                return t4 === e4;
              });
              -1 !== t3 && me.splice(t3, 1), this.children = [], this.parent = null, this.$element = null, this.$content = null, this.$header = null, this.$icon = null, this.$title = null, m()(B()(n2.prototype), "destroy", this).call(this);
            }
          } }, { key: "init", value: function() {
            var e4 = this;
            return this.inited || (this.parent && (this.on("destroy", function() {
              var t3 = e4.parent.children.findIndex(function(t4) {
                return t4 === e4;
              });
              -1 !== t3 && e4.parent.children.splice(t3, 1);
            }), this.parent.children.push(this)), this._initTemplate(), this._initBehavior(), this.inited = true, this.emit("init", this), this.core.emit("osjs/window:create", this)), this;
          } }, { key: "_initTemplate", value: function() {
            var e4 = this.core.config("windows.template") || Oe;
            this._template ? this.$element.innerHTML = "function" == typeof this._template ? this._template(this, e4) : this._template : this.$element.innerHTML = e4, this.$content = this.$element.querySelector(".osjs-window-content"), this.$header = this.$element.querySelector(".osjs-window-header"), this.$icon = this.$element.querySelector(".osjs-window-icon > div"), this.$title = this.$element.querySelector(".osjs-window-title");
          } }, { key: "_initBehavior", value: function() {
            var e4 = this;
            if (this.core.has("osjs/desktop")) {
              var t3 = function(e5, t4, n4) {
                var r3 = t4.width, o3 = t4.height, i3 = n4.top, a2 = n4.left, s2 = function(t5, n5) {
                  return isNaN(t5) || t5 > 1 && Number.isInteger(t5) ? t5 : Math.round(e5[n5] * parseFloat(t5));
                };
                return { dimension: { width: s2(r3, "width"), height: s2(o3, "height") }, position: { top: s2(i3, "height"), left: s2(a2, "width") } };
              }(this.core.make("osjs/desktop").getRect(), this.state.dimension, this.state.position), n3 = t3.dimension, r2 = t3.position;
              this.state.dimension = n3, this.state.position = r2;
            }
            var o2 = this.core.make("osjs/window-behavior");
            if (o2 && o2.init(this), this.attributes.droppable) {
              var i2 = re(this.$element, { ondragenter: function() {
                for (var t4 = arguments.length, n4 = new Array(t4), r3 = 0; r3 < t4; r3++) n4[r3] = arguments[r3];
                return e4.emit.apply(e4, ["dragenter"].concat(n4, [e4]));
              }, ondragover: function() {
                for (var t4 = arguments.length, n4 = new Array(t4), r3 = 0; r3 < t4; r3++) n4[r3] = arguments[r3];
                return e4.emit.apply(e4, ["dragover"].concat(n4, [e4]));
              }, ondragleave: function() {
                for (var t4 = arguments.length, n4 = new Array(t4), r3 = 0; r3 < t4; r3++) n4[r3] = arguments[r3];
                return e4.emit.apply(e4, ["dragleave"].concat(n4, [e4]));
              }, ondrop: function() {
                for (var t4 = arguments.length, n4 = new Array(t4), r3 = 0; r3 < t4; r3++) n4[r3] = arguments[r3];
                return e4.emit.apply(e4, ["drop"].concat(n4, [e4]));
              } });
              this.on("destroy", function() {
                return i2.destroy();
              });
            }
          } }, { key: "_checkModal", value: function() {
            var e4 = this;
            this.parent && (this.attributes.modal && (this.on("render", function() {
              return e4.parent.setState("loading", true);
            }), this.on("destroy", function() {
              return e4.parent.setState("loading", false);
            })), this.on("destroy", function() {
              return e4.parent.focus();
            }));
          } }, { key: "_setClassNames", value: function() {
            var e4 = this, t3 = ["osjs-window"].concat(c()(this.attributes.classNames));
            this.id && t3.push("Window_".concat(this.id)), t3.filter(function(e5) {
              return !!e5;
            }).forEach(function(t4) {
              return e4.$element.classList.add(t4);
            });
          } }, { key: "render", value: function() {
            var e4 = this, t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {
            };
            return this.rendered || (this.inited || this.init(), this._setClassNames(), this._updateButtons(), this._updateAttributes(), this._updateStyles(), this._updateTitle(), this._updateIconStyles(), this._updateHeaderStyles(), this._checkModal(), this._preventDefaultPosition || this.gravitate(this.attributes.gravity), this.attributes.clamp && this.clampToViewport(false), this.setNextZindex(true), this.core.$contents.appendChild(this.$element), G(this, t3), this.rendered = true, setTimeout(function() {
              e4.emit("render", e4), e4.core.emit("osjs/window:render", e4);
            }, 1)), this;
          } }, { key: "close", value: function() {
            return !this.destroyed && (this.emit("close", this), this.destroy(), true);
          } }, { key: "focus", value: function() {
            return !(this.state.minimized || !this._toggleState("focused", true, "focus")) && (this._focus(), true);
          } }, { key: "_focus", value: function() {
            ge && ge !== this && ge.blur(), ge = this, this.setNextZindex();
          } }, { key: "blur", value: function() {
            var e4 = function(e5) {
              if (e5) {
                var t3 = document.activeElement;
                return e5.contains(t3) ? t3 : null;
              }
              return null;
            }(this.$element);
            return e4 && e4.blur(), this._toggleState("focused", false, "blur");
          } }, { key: "minimize", value: function() {
            return !(!this.attributes.minimizable || !this._toggleState("minimized", true, "minimize")) && (this.blur(), true);
          } }, { key: "raise", value: function() {
            return this._toggleState("minimized", false, "raise");
          } }, { key: "maximize", value: function() {
            return !!this.attributes.maximizable && this._maximize(true);
          } }, { key: "restore", value: function() {
            return this._maximize(false);
          } }, { key: "_maximize", value: function(e4) {
            var t3 = this;
            if (this._toggleState("maximized", e4, e4 ? "maximize" : "restore")) {
              var n3 = function() {
                return t3.emit("resized", { width: t3.$element ? t3.$element.offsetWidth : -1, height: t3.$element ? t3.$element.offsetHeight : -1 }, t3);
              };
              return he() ? this.once("transitionend", n3) : n3(), true;
            }
            return false;
          } }, { key: "resizeFit", value: function(e4) {
            if (e4 = e4 || this.$content.firstChild) {
              var t3 = function(e5, t4, n4) {
                var r3 = (n4.parentNode.classList.contains("osjs-gui") ? n4.parentNode : n4).getBoundingClientRect(), o2 = e5.$content.getBoundingClientRect(), i2 = Math.ceil(o2.height - r3.height), a2 = Math.ceil(o2.width - r3.width), s2 = e5.$header.offsetHeight, c2 = e5.state.position, u2 = c2.left, l2 = c2.top, f2 = e5.attributes.minDimension, d2 = e5.attributes.maxDimension, p2 = Math.max(n4.offsetWidth + a2, f2.width), h3 = Math.max(n4.offsetHeight + i2 + s2, f2.height);
                return d2.width > 0 && (p2 = Math.min(p2, d2.width)), d2.height > 0 && (h3 = Math.min(h3, d2.height)), p2 = Math.max(p2, n4.offsetWidth), h3 = Math.max(h3, n4.offsetHeight), t4 && (p2 = Math.min(p2, t4.width - u2), h3 = Math.min(h3, t4.height - l2)), { width: p2, height: h3 };
              }(this, this.core.has("osjs/desktop") ? this.core.make("osjs/desktop").getRect() : null, e4), n3 = t3.width, r2 = t3.height;
              isNaN(n3) || isNaN(r2) || this.setDimension({ width: n3, height: r2 });
            }
          } }, { key: "clampToViewport", value: function() {
            var e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            if (this.core.has("osjs/desktop")) {
              var t3 = this.core.make("osjs/desktop").getRect();
              this.state.position = _e(_e({}, this.state.position), H(t3, this.state)), e4 && this._updateStyles();
            }
          } }, { key: "setIcon", value: function(e4) {
            this.state.icon = e4, this._updateIconStyles();
          } }, { key: "setTitle", value: function(e4) {
            this.state.title = e4 || "", this._updateTitle(), this.core.emit("osjs/window:change", this, "title", e4);
          } }, { key: "setDimension", value: function(e4) {
            var t3 = _e(_e({}, this.state.dimension), e4 || {}), n3 = t3.width, r2 = t3.height;
            this.state.dimension.width = n3, this.state.dimension.height = r2, this._updateStyles();
          } }, { key: "setPosition", value: function(e4) {
            var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n3 = _e(_e({}, this.state.position), e4 || {}), r2 = n3.left, o2 = n3.top;
            this.state.position.top = o2, this.state.position.left = r2, t3 && (this._preventDefaultPosition = true), this._updateStyles();
          } }, { key: "setZindex", value: function(e4) {
            this.state.zIndex = e4, D.debug("Window::setZindex()", e4), this._updateStyles();
          } }, { key: "setNextZindex", value: function(e4) {
            (e4 || this._checkNextZindex()) && (this.setZindex(Ee), Ee++);
          } }, { key: "setState", value: function(e4, t3) {
            var n3 = this, r2 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], o2 = function() {
              return n3._setState(e4, t3, r2);
            };
            "loading" === e4 && r2 && (clearTimeout(this._loadingDebounce), true === t3) ? this._loadingDebounce = setTimeout(function() {
              return o2();
            }, 250) : o2();
          } }, { key: "gravitate", value: function(e4) {
            if (this.core.has("osjs/desktop")) {
              var t3 = function(e5, t4, n3) {
                var r2 = e5.state.position, o2 = r2.left, i2 = r2.top;
                if ("center" === n3) o2 = t4.width / 2 - e5.state.dimension.width / 2, i2 = t4.height / 2 - e5.state.dimension.height / 2;
                else if (n3) {
                  var a2 = n3.match(/top|bottom/), s2 = n3.match(/left|rigth/);
                  n3.match(/top/) ? i2 = t4.top : n3.match(/bottom/) && (i2 = t4.height - e5.state.dimension.height + t4.top), n3.match(/left/) ? o2 = t4.left : n3.match(/right/) && (o2 = t4.width - e5.state.dimension.width), !a2 && n3.match(/center/) ? i2 = t4.height / 2 - e5.state.dimension.height / 2 : !s2 && n3.match(/center/) && (o2 = t4.width / 2 - e5.state.dimension.width / 2);
                }
                return { left: o2, top: i2 };
              }(this, this.core.make("osjs/desktop").getRect(), e4);
              this.setPosition(t3);
            }
          } }, { key: "getState", value: function(e4) {
            var t3 = this.state[e4];
            return -1 !== ["position", "dimension", "styles"].indexOf(e4) ? _e({}, t3) : t3;
          } }, { key: "getSession", value: function() {
            return false === this.attributes.sessionable ? null : { id: this.id, maximized: this.state.maximized, minimized: this.state.minimized, position: _e({}, this.state.position), dimension: _e({}, this.state.dimension) };
          } }, { key: "_setState", value: function(e4, t3) {
            var n3 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], r2 = this.state[e4];
            this.state[e4] = t3, n3 && (r2 !== t3 && D.debug("Window::_setState()", e4, t3), this._updateAttributes(), this._updateStyles());
          } }, { key: "_toggleState", value: function(e4, t3, n3) {
            var r2 = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            return this.state[e4] !== t3 && (D.debug("Window::_toggleState()", e4, t3, n3, r2), this.state[e4] = t3, this.emit(n3, this), this.core.emit("osjs/window:change", this, e4, t3), r2 && this._updateAttributes(), true);
          } }, { key: "_checkNextZindex", value: function() {
            var e4 = this, t3 = this.attributes.ontop, n3 = this.state.zIndex, r2 = me.filter(function(e5) {
              return e5.attributes.ontop === t3;
            }).filter(function(t4) {
              return t4.wid !== e4.wid;
            }).map(function(e5) {
              return e5.state.zIndex;
            });
            return n3 < (r2.length > 0 ? Math.max.apply(null, r2) : 0);
          } }, { key: "_updateDOM", value: function() {
            this._updateAttributes(), this._updateStyles();
          } }, { key: "_updateButtons", value: function() {
            var e4 = this, t3 = { maximizable: "maximize", minimizable: "minimize", closeable: "close" };
            this.attributes.controls ? Object.keys(t3).forEach(function(n3) {
              var r2;
              e4.attributes[n3] || (r2 = t3[n3], e4.$header.querySelector(".osjs-window-button[data-action=".concat(r2, "]")).style.display = "none");
            }) : Array.from(this.$header.querySelectorAll(".osjs-window-button")).forEach(function(e5) {
              return e5.style.display = "none";
            });
          } }, { key: "_updateTitle", value: function() {
            if (this.$title) {
              var e4 = (t3 = this.state.title, (n3 = document.createElement("div")).innerHTML = t3, n3.textContent);
              this.$title.innerHTML !== e4 && (this.$title.innerHTML = e4);
            }
            var t3, n3;
          } }, { key: "_updateIconStyles", value: function() {
            if (this.$icon) {
              var e4 = "url(".concat(this.state.icon, ")");
              this.$icon.style.backgroundImage !== e4 && (this.$icon.style.backgroundImage = e4);
            }
          } }, { key: "_updateHeaderStyles", value: function() {
            if (this.$header) {
              var e4 = this.attributes.header ? void 0 : "none";
              this.$header.style.display !== e4 && (this.$header.style.display = e4);
            }
          } }, { key: "_updateAttributes", value: function() {
            var e4, t3, n3, r2 = this;
            if (this.$element) {
              var o2 = (e4 = this.id, t3 = this.state, n3 = this.attributes, { id: e4, media: t3.media, moving: t3.moving, resizing: t3.resizing, loading: t3.loading, focused: t3.focused, maximized: t3.maximized, minimized: t3.minimized, modal: n3.modal, ontop: n3.ontop, resizable: n3.resizable, moveable: n3.moveable, maximizable: n3.maximizable, minimizable: n3.minimizable }), i2 = Object.keys(o2).filter(function(e5) {
                return o2[e5] !== r2._lastAttributes[e5];
              });
              i2.length > 0 && (i2.forEach(function(e5) {
                return r2.$element.setAttribute("data-".concat(e5), String(o2[e5]));
              }), this._lastAttributes = o2);
            }
          } }, { key: "_updateStyles", value: function() {
            if (this.$element) {
              var e4 = fe((t3 = this.state, n3 = this.attributes, r2 = t3.zIndex, o2 = t3.styles, i2 = t3.position, a2 = i2.top, s2 = i2.left, c2 = t3.dimension, u2 = c2.width, l2 = c2.height, f2 = n3.ontop, x({ top: String(a2) + "px", left: String(s2) + "px", height: String(l2) + "px", width: String(u2) + "px", zIndex: 10 + (f2 ? 8388635 : 0) + r2 }, o2)));
              e4 !== this._lastCssText && (this.$element.style.cssText = e4, this._lastCssText = e4);
            }
            var t3, n3, r2, o2, i2, a2, s2, c2, u2, l2, f2;
          } }], [{ key: "getWindows", value: function() {
            return me;
          } }, { key: "lastWindow", value: function() {
            return ge;
          } }]), n2;
        }(T.EventEmitter);
        function Be(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function be(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Be(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Be(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        function Se(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var Te, Pe = [], we = 0, Re = function(e3) {
          return "osjs/application/" + e3.name;
        }, Ne = function(e3) {
          E()(n2, e3);
          var t2 = Se(n2);
          function n2(e4, r2) {
            var o2;
            d()(this, n2), r2 = be({ args: {}, options: {}, metadata: {} }, r2), D.debug("Application::constructor()", r2);
            var i2 = r2.options.settings ? be({}, r2.options.settings) : {}, a2 = r2.metadata && r2.metadata.name ? "Application@" + r2.metadata.name : "Application" + String(we);
            return (o2 = t2.call(this, a2)).pid = we, o2.core = e4, o2.args = r2.args, o2.options = be({ sessionable: true, windowAutoFocus: true }, r2.options), o2.metadata = r2.metadata, o2.windows = [], o2.workers = [], o2.requestOptions = {}, o2.destroyed = false, o2.settings = e4.make("osjs/settings").get(Re(o2.metadata), null, i2), o2.started = /* @__PURE__ */ new Date(), o2.sockets = [], Pe.push(_()(o2)), we++, o2.core.emit("osjs/application:create", _()(o2)), o2;
          }
          return h2()(n2, [{ key: "destroy", value: function() {
            var e4 = this, t3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            if (!this.destroyed) {
              this.destroyed = true, this.emit("destroy"), this.core.emit("osjs/application:destroy", this);
              var r2 = function(e5, t4) {
                try {
                  e5.forEach(t4);
                } catch (e6) {
                  D.warn("Exception on application destruction", e6);
                }
                return [];
              };
              if (this.windows = r2(this.windows, function(e5) {
                return e5.destroy();
              }), this.sockets = r2(this.sockets, function(e5) {
                return e5.close();
              }), this.workers = r2(this.workers, function(e5) {
                return e5.terminate();
              }), t3) {
                var o2 = Pe.findIndex(function(t4) {
                  return t4 === e4;
                });
                -1 !== o2 && Pe.splice(o2, 1);
              }
              m()(B()(n2.prototype), "destroy", this).call(this);
            }
          } }, { key: "relaunch", value: function() {
            var e4 = this, t3 = this.windows.map(function(e5) {
              return e5.getSession();
            });
            this.destroy(), setTimeout(function() {
              e4.core.run(e4.metadata.name, be({}, e4.args), be(be({}, e4.options), {}, { forcePreload: e4.core.config("development"), restore: { windows: t3 } }));
            }, 1);
          } }, { key: "resource", value: function() {
            var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/", t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return this.core.url(e4, t3, this.metadata);
          } }, { key: "request", value: function() {
            var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/", t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "json", r2 = this.resource(e4);
            return this.core.request(r2, t3, n3);
          } }, { key: "socket", value: function() {
            var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/socket", t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            t3 = be({ socket: {} }, t3);
            var n3 = this.resource(e4, { type: "websocket" }), r2 = new q(this.metadata.name, n3, t3.socket);
            return this.sockets.push(r2), r2;
          } }, { key: "send", value: function() {
            for (var e4 = arguments.length, t3 = new Array(e4), n3 = 0; n3 < e4; n3++) t3[n3] = arguments[n3];
            this.core.send("osjs/application:socket:message", { pid: this.pid, name: this.metadata.name, args: t3 });
          } }, { key: "worker", value: function(e4) {
            var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = this.resource(e4), r2 = new Worker(n3, be({ credentials: "same-origin" }, t3));
            return this.workers.push(r2), r2;
          } }, { key: "createWindow", value: function() {
            var e4 = this, t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n3 = this.windows.find(function(e5) {
              return e5.id === t3.id;
            });
            if (n3) {
              var r2 = this.core.make("osjs/locale").translate("ERR_WINDOW_ID_EXISTS", t3.id);
              throw new Error(r2);
            }
            var o2 = this.core.config("application.windows", []), i2 = V(o2, this.metadata.name, t3.id), a2 = new Ae(this.core, S()(t3, i2));
            if (this.options.restore) {
              var s2 = this.options.restore.windows || [], c2 = s2.findIndex(function(e5) {
                return e5.id === a2.id;
              });
              if (-1 !== c2) {
                var u2 = s2[c2];
                a2.setPosition(u2.position, true), a2.setDimension(u2.dimension), u2.minimized ? a2.minimize() : u2.maximized && a2.maximize(), this.options.restore.windows.splice(c2, 1);
              }
            }
            return a2.init(), this.windows.push(a2), this.emit("create-window", a2), a2.on("destroy", function() {
              if (!e4.destroyed) {
                var t4 = e4.windows.findIndex(function(e5) {
                  return e5 === a2;
                });
                -1 !== t4 && e4.windows.splice(t4, 1);
              }
              e4.emit("destroy-window", a2);
            }), this.options.windowAutoFocus && a2.focus(), a2;
          } }, { key: "removeWindow", value: function(e4) {
            this.windows.filter(e4).forEach(function(e5) {
              return e5.destroy();
            });
          } }, { key: "getSession", value: function() {
            return { args: be({}, this.args), name: this.metadata.name, windows: this.windows.map(function(e4) {
              return e4.getSession();
            }).filter(function(e4) {
              return null !== e4;
            }) };
          } }, { key: "emitAll", value: function(e4) {
            var t3 = this;
            D.warn("Application#emitAll is deprecated. Use Core#broadcast instead");
            var n3 = function(e5) {
              return e5.pid !== t3.pid;
            }, r2 = "function" == typeof e4 ? e4 : "string" == typeof e4 ? function(t4) {
              return n3(t4) && t4.metadata.name === e4;
            } : n3;
            return function(e5) {
              for (var t4 = arguments.length, n4 = new Array(t4 > 1 ? t4 - 1 : 0), o2 = 1; o2 < t4; o2++) n4[o2 - 1] = arguments[o2];
              return Pe.filter(r2).map(function(t5) {
                return t5.emit.apply(t5, [e5].concat(n4));
              });
            };
          } }, { key: "saveSettings", value: function() {
            var e4 = this.core.make("osjs/settings"), t3 = Re(this.metadata);
            return e4.set(t3, null, this.settings), e4.save();
          } }], [{ key: "getApplications", value: function() {
            return Pe;
          } }, { key: "destroyAll", value: function() {
            Pe.forEach(function(e4) {
              try {
                e4.destroy(false);
              } catch (e5) {
                D.warn("Exception on destroyAll", e5);
              }
            }), Pe.splice(0, Pe.length);
          } }]), n2;
        }(T.EventEmitter), je = function() {
          function e3(t2) {
            var n2 = this;
            d()(this, e3), this.core = t2, this.$loading = document.createElement("div"), this.$loading.className = "osjs-boot-splash", t2.on("osjs/core:boot", function() {
              return n2.show();
            }), t2.on("osjs/core:booted", function() {
              return n2.destroy();
            }), t2.on("osjs/core:logged-in", function() {
              return n2.show();
            }), t2.on("osjs/core:started", function() {
              return n2.destroy();
            });
          }
          return h2()(e3, [{ key: "init", value: function() {
            this.$loading.appendChild(document.createTextNode("Loading..."));
          } }, { key: "show", value: function() {
            this.$loading.parentNode || this.core.$root.appendChild(this.$loading);
          } }, { key: "destroy", value: function() {
            this.$loading.parentNode && this.$loading.remove();
          } }]), e3;
        }(), Ce = n(9), ke = n(23), Ie = n.n(ke), De = { nb: "nb_NO" }, Me = /\{(\d+)\}/g, xe = function(e3) {
          return function(t2, n2) {
            return n2 in e3 ? e3[n2] : t2;
          };
        }, Fe = function(e3, t2) {
          var n2 = function(e4, t3) {
            return e4.config("locale." + t3);
          }(e3, t2);
          return { defaultLocale: n2, userLocale: function(e4, t3, n3) {
            return e4.make("osjs/settings").get("osjs/locale", t3, n3);
          }(e3, t2, n2) };
        }, Ue = function(e3, t2, n2, r2) {
          var o2 = e3.en_EN || {}, i2 = e3[t2] || e3[n2] || {};
          return void 0 === i2[r2] ? o2[r2] || r2 : i2[r2];
        }, He = function(e3, t2, n2, r2) {
          for (var o2 = Ue(e3, t2, n2, r2), i2 = arguments.length, a2 = new Array(i2 > 4 ? i2 - 4 : 0), s2 = 4; s2 < i2; s2++) a2[s2 - 4] = arguments[s2];
          return o2.replace(Me, xe(a2));
        }, Ge = function(e3) {
          return function(t2, n2) {
            var r2 = Fe(e3, "language"), o2 = r2.defaultLocale;
            return t2[r2.userLocale] || t2[o2] || t2.en_EN || n2;
          };
        }, Ke = function(e3) {
          return function(t2) {
            var n2 = Fe(e3, "language"), r2 = n2.defaultLocale, o2 = n2.userLocale;
            return function(e4) {
              for (var n3 = arguments.length, i2 = new Array(n3 > 1 ? n3 - 1 : 0), a2 = 1; a2 < n3; a2++) i2[a2 - 1] = arguments[a2];
              return He.apply(void 0, [t2, o2, r2, e4].concat(i2));
            };
          };
        }, We = (Te = function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = e3.userLanguage || e3.language || "", n2 = function(e4) {
            return De[e4] ? De[e4] : e4.match(/_/) ? e4 : e4 ? "".concat(e4, "_").concat(e4.toUpperCase()) : "";
          }, r2 = (e3.languages || [t2]).map(function(e4) {
            return n2(e4.replace("-", "_"));
          }).filter(function(e4) {
            return !!e4;
          });
          return r2[r2.length - 1];
        }(navigator), function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "en_EN", t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n2 = Te || e3;
          return t2.lenght > 0 && -1 === t2.indexOf(Te) ? e3 : n2;
        }), Ve = n.p + "f4cfc6708cf6bfc17d4b1e775f594ae2.png", $e = function(e3) {
          return e3.replace(/(index\.(html?|php))$/, "").replace(/\/?$/, "/");
        }, ze = $e(window.location.pathname), Ye = $e(window.location.href), Ze = { en_EN: "English", nb_NO: "Norwegian, Norsk (bokm\xE5l)", vi_VN: "Vietnamese, Vietnamese", fr_FR: "French", de_DE: "German", sl_SI: "Slovenian, Sloven\u0161\u010Dina", zh_CN: "Chinese (simplified)", fa_FA: "Persian", pt_BR: "Portugu\xEAs (Brasil)", ru_RU: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (Russian)", tr_TR: "T\xFCrk\xE7e (Turkish)", sv_SE: "Svenska (Swedish)" }, qe = { development: !"production".match(/^prod/i), standalone: false, languages: Ze, http: { ping: true, public: ze, uri: Ye }, ws: { connectInterval: 5e3, uri: Ye.replace(/^http/, "ws"), disabled: false }, packages: { manifest: "/metadata.json", metadata: [], hidden: [], permissions: {}, overrideMetadata: {} }, application: { pinned: [], autostart: [], categories: { development: { label: "LBL_APP_CAT_DEVELOPMENT", icon: "applications-development" }, science: { label: "LBL_APP_CAT_SCIENCE", icon: "applications-science" }, games: { label: "LBL_APP_CAT_GAMES", icon: "applications-games" }, graphics: { label: "LBL_APP_CAT_GRAPHICS", icon: "applications-graphics" }, network: { label: "LBL_APP_CAT_NETWORK", icon: "applications-internet" }, multimedia: { label: "LBL_APP_CAT_MULTIMEDIA", icon: "applications-multimedia" }, office: { label: "LBL_APP_CAT_OFFICE", icon: "applications-office" }, system: { label: "LBL_APP_CAT_SYSTEM", icon: "applications-system" }, utilities: { label: "LBL_APP_CAT_UTILITIES", icon: "applications-utilities" }, other: { label: "LBL_APP_CAT_OTHER", icon: "applications-other" } }, windows: [] }, auth: { ui: {}, cookie: { name: "osjs.auth", expires: 7, enabled: false, secure: false }, login: { username: null, password: null }, defaultUserData: { id: null, username: "osjs", groups: [] } }, settings: { lock: [], prefix: "osjs__", defaults: { "osjs/default-application": {}, "osjs/session": [], "osjs/desktop": {}, "osjs/locale": {} } }, search: { enabled: true }, notifications: { native: false }, desktop: { lock: false, contextmenu: { enabled: true, defaults: true }, settings: { font: "Roboto", theme: "StandardTheme", sounds: "FreedesktopSounds", icons: "GnomeIcons", animations: false, panels: [{ position: "top", items: [{ name: "menu" }, { name: "windows" }, { name: "tray" }, { name: "clock" }] }], widgets: [], keybindings: { "open-application-menu": "shift+alt+a", "close-window": "shift+alt+w" }, notifications: { position: "top-right" }, background: { src: Ve, color: "#572a79", style: "cover" }, iconview: { enabled: true, path: "home:/.desktop", fontColorStyle: "system", fontColor: "#ffffff" } } }, locale: { language: We("en_EN", Object.keys(Ze)), rtl: ["az", "fa", "he", "uz", "ar"], format: { shortDate: "yyyy-mm-dd", mediumDate: "dS mmm yyyy", longDate: "dS mmmm yyyy", fullDate: "dddd dS mmmm yyyy", shortTime: "HH:MM", longTime: "HH:MM:ss" } }, windows: { lofi: false, mobile: false, template: null, clampToViewport: true, moveKeybinding: "ctrl" }, vfs: { watch: true, defaultPath: "home:/", defaultAdapter: "system", adapters: {}, mountpoints: [{ name: "apps", label: "Applications", adapter: "apps", icon: w, attributes: { visibility: "restricted", readOnly: true } }, { name: "osjs", label: "OS.js", adapter: "system", icon: { name: "folder-publicshare" } }, { name: "home", label: "Home", adapter: "system", icon: { name: "user-home" } }], icons: { "^application/zip": { name: "package-x-generic" }, "^application/javascript": { name: "text-x-script" }, "^application/json": { name: "text-x-script" }, "^application/x-python": { name: "text-x-script" }, "^application/php": { name: "text-x-script" }, "^application/pdf": { name: "x-office-document" }, "^application/rtf": { name: "x-office-document" }, "^application/msword": { name: "x-office-document" }, "^application/(xz|tar|gzip)": { name: "package-x-generic" }, "^text/css": { name: "text-x-script" }, "^text/html": { name: "text-html" }, "^(application|text)/xml": { name: "text-html" }, "^application": { name: "application-x-executable" }, "^text": { name: "text-x-generic" }, "^audio": { name: "audio-x-generic" }, "^video": { name: "video-x-generic" }, "^image": { name: "image-x-generic" } } }, providers: { globalBlacklist: ["osjs/websocket", "osjs/clipboard", "osjs/gapi"], globalWhitelist: [] } }, Xe = n(16), Qe = n.n(Xe), Je = n(10), et = n.n(Je);
        function tt(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function nt(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? tt(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : tt(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var rt = function(e3) {
          return Object.entries(e3).filter(function(e4) {
            var t2 = et()(e4, 2)[1];
            return null != t2;
          }).map(function(e4) {
            var t2 = et()(e4, 2), n2 = t2[0], r2 = t2[1], o2 = "object" === Qe()(r2) ? JSON.stringify(r2) : r2;
            return "".concat(encodeURIComponent(n2), "=").concat(encodeURIComponent(o2));
          }).join("&");
        }, ot = [window.ArrayBuffer, window.ArrayBufferView, window.Blob, window.File, window.URLSearchParams, window.FormData].filter(function(e3) {
          return !!e3;
        }), it = function(e3, t2, n2) {
          var r2 = nt({ credentials: "same-origin", method: "get", headers: {} }, t2);
          "json" === n2 && (r2.headers = nt(nt({}, r2.headers), {}, { Accept: "application/json, text/plain, */*", "Content-Type": "application/json" })), r2.body && "get" === r2.method.toLowerCase() && ("" !== rt(r2.body) && (e3 += "?" + rt(r2.body)), delete r2.body);
          var o2 = void 0 !== r2.body, i2 = "string" == typeof r2.body;
          "json" === n2 && o2 && !i2 && (r2.body instanceof FormData || ot.find(function(e4) {
            return r2.body instanceof e4;
          }) || (r2.body = JSON.stringify(r2.body)));
          return [e3, r2];
        }, at = function(e3, t2) {
          return new Promise(function(n2, r2) {
            var o2 = new XMLHttpRequest(), i2 = function(e4) {
              return function(t3) {
                console.warn(e4, t3), r2(new Error(e4));
              };
            };
            "function" == typeof t2.onProgress && ("GET" === t2.method.toUpperCase() ? o2 : o2.upload).addEventListener("progress", function(e4) {
              if (e4.lengthComputable) {
                var n3 = Math.round(e4.loaded / e4.total * 100);
                t2.onProgress(e4, n3);
              }
            });
            o2.addEventListener("load", function() {
              n2({ status: o2.status, statusText: o2.statusText, ok: o2.status >= 200 && o2.status <= 299, headers: { get: function(e4) {
                return o2.getResponseHeader(e4);
              } }, text: function() {
                return Promise.resolve(JSON.responseText);
              }, json: function() {
                return Promise.resolve(JSON.parse(o2.responseText));
              }, arrayBuffer: function() {
                return Promise.resolve(o2.response);
              } });
            }), o2.addEventListener("error", i2("An error occured while performing XHR request")), o2.addEventListener("abort", i2("XHR request was aborted")), o2.open(t2.method, e3), Object.entries(t2.headers).forEach(function(e4) {
              var t3 = et()(e4, 2), n3 = t3[0], r3 = t3[1];
              return o2.setRequestHeader(n3, r3);
            }), o2.responseType = t2.responseType || "", o2.send(t2.body);
          });
        }, st = function(e3) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, r2 = it(e3, t2, n2), o2 = et()(r2, 2), i2 = o2[0], a2 = o2[1], s2 = function(e4, t3) {
            return Promise.reject(new Error(t3 || "".concat(e4.status, " (").concat(e4.statusText, ")")));
          }, c2 = t2.xhr ? at(i2, a2) : window.fetch(i2, a2);
          return c2.then(function(e4) {
            if (!e4.ok) {
              var t3 = e4.headers.get("content-type"), r3 = t3 && -1 !== t3.indexOf("application/json") ? "json" : "text";
              return e4[r3]().then(function(t4) {
                return s2(e4, t4.error);
              });
            }
            return "json" === n2 ? e4.json() : e4;
          });
        };
        function ct(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function ut(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? ct(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : ct(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var lt = function(e3) {
          var t2 = e3.http, n2 = e3.ws;
          return function() {
            var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/", r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if ("string" != typeof e4) return t2.public;
            if (e4.match(/^(http|ws|ftp)s?:/i)) return e4;
            var i2 = ut({ type: null, prefix: "websocket" === r2.type }, r2), a2 = i2.type, s2 = i2.prefix, c2 = "websocket" === a2 ? n2.uri : t2.uri, u2 = e4.replace(/^\/+/, "");
            if (o2.type) {
              var l2 = e4.replace(/^\/?/, "/"), f2 = "theme" === o2.type ? "themes" : "icons" === o2.type ? "icons" : "apps";
              u2 = "".concat(f2, "/").concat(o2.name).concat(l2);
            }
            return s2 ? c2.replace(/\/$/, "") + u2.replace(/^\/?/, "/") : t2.public.replace(/^\/?/, "/") + u2;
          };
        };
        function ft(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function dt(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? ft(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : ft(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        function pt(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var ht = function(e3) {
          E()(n2, e3);
          var t2 = pt(n2);
          function n2() {
            var e4, r2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            d()(this, n2), o2 = dt({ classNames: ["osjs-root"], root: document.body }, o2 || {}), e4 = t2.call(this, qe, r2, o2);
            var i2 = document.createElement("div");
            i2.className = "osjs-contents", e4.logger = D, e4.ws = null, e4.ping = null, e4.splash = o2.splash ? o2.splash(_()(e4)) : new je(_()(e4)), e4.$root = o2.root, e4.$contents = i2, e4.$resourceRoot = o2.resourceRoot || document.querySelector("head"), e4.requestOptions = {}, e4.urlResolver = lt(e4.configuration), e4.user = e4.config("auth.defaultUserData"), e4.options.classNames.forEach(function(t3) {
              return e4.$root.classList.add(t3);
            });
            var a2 = e4.configuration.ws.uri;
            if (!a2.match(/^wss?:/)) {
              var s2 = window.location, c2 = s2.protocol, u2 = s2.host;
              e4.configuration.ws.uri = c2.replace(/^http/, "ws") + "//" + u2 + a2.replace(/^\/+/, "/");
            }
            return e4.splash.init(), e4;
          }
          return h2()(n2, [{ key: "destroy", value: function() {
            return this.destroyed ? Promise.resolve() : (this.emit("osjs/core:destroy"), this.ping = clearInterval(this.ping), Ne.destroyAll(), this.ws && this.ws.close(), this.$contents && (this.$contents.remove(), this.$contents = void 0), this.user = this.config("auth.defaultUserData"), this.ws = null, this.ping = null, m()(B()(n2.prototype), "destroy", this).call(this));
          } }, { key: "boot", value: function() {
            var e4 = this, t3 = function(t4) {
              return t4 && D.error("Error while booting", t4), console.groupEnd(), e4.start();
            };
            return this.booted ? Promise.resolve(false) : (console.group("Core::boot()"), this.$root.appendChild(this.$contents), this._attachEvents(), this.emit("osjs/core:boot"), m()(B()(n2.prototype), "boot", this).call(this).then(function() {
              return e4.emit("osjs/core:booted"), e4.has("osjs/auth") ? e4.make("osjs/auth").show(function(n3) {
                var r2 = e4.config("auth.defaultUserData");
                e4.user = dt(dt({}, r2), n3), e4.has("osjs/settings") ? e4.make("osjs/settings").load().then(function() {
                  return t3();
                }).catch(function() {
                  return t3();
                }) : t3();
              }) : (D.debug("OS.js STARTED WITHOUT ANY AUTHENTICATION"), t3());
            }).catch(t3));
          } }, { key: "start", value: function() {
            var e4 = this, t3 = function(t4) {
              return e4.emit("osjs/core:started"), t4 && D.warn("Error while starting", t4), console.groupEnd(), !t4;
            };
            return this.started ? Promise.resolve(false) : (console.group("Core::start()"), this.emit("osjs/core:start"), this._createListeners(), m()(B()(n2.prototype), "start", this).call(this).then(function(n3) {
              return console.groupEnd(), !!n3 && new Promise(function(t4, n4) {
                try {
                  false === e4._createConnection(function(e5) {
                    return e5 ? n4(e5) : t4();
                  }) && t4();
                } catch (e5) {
                  n4(e5);
                }
              }).then(function() {
                return t3();
              }).catch(function(e5) {
                return t3(e5);
              });
            }).catch(t3));
          } }, { key: "_attachEvents", value: function() {
            var e4 = this;
            this.on("osjs/core:started", function() {
              e4.has("osjs/sounds") && e4.make("osjs/sounds").play("service-login");
            }), this.on("osjs/core:destroy", function() {
              e4.has("osjs/sounds") && e4.make("osjs/sounds").play("service-logout");
            }), this.on("osjs/application:socket:message", function(e5) {
              var t4 = e5.pid, n3 = e5.args, r2 = Ne.getApplications().find(function(e6) {
                return e6 && e6.pid === t4;
              });
              r2 && r2.emit.apply(r2, ["ws:message"].concat(c()(n3)));
            }), this.on("osjs/core:connected", function(t4) {
              var n3 = e4.config("http.ping");
              if (n3) {
                var r2 = "number" == typeof n3 ? n3 : 18e5;
                e4.ping = setInterval(function() {
                  e4.ws && e4.ws.connected && !e4.ws.reconnecting && e4.request("/ping").catch(function(e5) {
                    return D.warn("Error on ping", e5);
                  });
                }, r2);
              }
            });
            var t3 = function() {
              try {
                var t4 = e4.make("osjs/settings").get("osjs/locale", "language");
                e4.$root.setAttribute("data-locale", t4);
              } catch (e5) {
                console.warn(e5);
              }
            };
            this.on("osjs/locale:change", t3), this.on("osjs/settings:load", t3), this.on("osjs/settings:save", t3);
          } }, { key: "_createConnection", value: function(e4) {
            var t3 = this;
            if (this.configuration.standalone || this.configuration.ws.disabled) return false;
            var n3 = this.config("ws").uri, r2 = false;
            return D.debug("Creating websocket connection on", n3), this.ws = new q("CoreSocket", n3, { interval: this.config("ws.connectInterval", 1e3) }), this.ws.once("connected", function() {
              setTimeout(function() {
                r2 = true, e4();
              }, 100);
            }), this.ws.on("connected", function(e5, n4) {
              t3.emit("osjs/core:connect", e5, n4);
            }), this.ws.once("failed", function(n4) {
              r2 || (e4(new Error("Connection closed")), t3.emit("osjs/core:connection-failed", n4));
            }), this.ws.on("disconnected", function(e5) {
              t3.emit("osjs/core:disconnect", e5);
            }), this.ws.on("message", function(e5) {
              try {
                var n4 = JSON.parse(e5.data), r3 = n4.params || [];
                t3.emit.apply(t3, [n4.name].concat(c()(r3)));
              } catch (e6) {
                D.warn("Exception on websocket message", e6);
              }
            }), true;
          } }, { key: "_createListeners", value: function() {
            var e4 = function(e5) {
              var t3 = e5.pid, n3 = e5.wid, r2 = e5.args, o2 = Ne.getApplications().find(function(e6) {
                return e6.pid === t3;
              }), i2 = o2 ? o2.windows.find(function(e6) {
                return e6.wid === n3;
              }) : null;
              i2 && i2.emit.apply(i2, ["iframe:get"].concat(c()(r2 || [])));
            };
            window.addEventListener("message", function(t3) {
              var n3 = t3.data || {};
              n3 && "osjs/iframe:message" === n3.name && e4.apply(void 0, c()(n3.params || []));
            });
          } }, { key: "url", value: function() {
            var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/", t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return this.urlResolver(e4, t3, n3);
          } }, { key: "request", value: function(e4) {
            var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, r2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o2 = this.has("osjs/locale") ? this.make("osjs/locale").translate : function(e5) {
              return e5;
            };
            return this.config("standalone") && !r2 ? Promise.reject(new Error(o2("ERR_REQUEST_STANDALONE"))) : (e4.match(/^((http|ws|ftp)s?:)/i) || (e4 = this.url(e4), t3 = dt(dt({}, t3 || {}), this.requestOptions || {})), st(e4, t3, n3).catch(function(e5) {
              throw D.warn(e5), new Error(o2("ERR_REQUEST_NOT_OK", e5));
            }));
          } }, { key: "run", value: function(e4) {
            var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return D.debug("Core::run()", e4, t3, n3), this.make("osjs/packages").launch(e4, t3, n3);
          } }, { key: "open", value: function(e4) {
            var t3 = this, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if ("osjs/application" === e4.mime) return this.run(e4.path.split("/").pop());
            var r2 = function(r3) {
              return t3.run(r3, { file: e4 }, n3);
            }, o2 = this.make("osjs/packages").getCompatiblePackages(e4.mime);
            if (o2.length > 0) {
              if (o2.length > 1) try {
                return this._openApplicationDialog(n3, o2, e4, r2), true;
              } catch (e5) {
                D.warn("Exception on compability check", e5);
              }
              return r2(o2[0].name), Promise.resolve(true);
            }
            return Promise.resolve(false);
          } }, { key: "_openApplicationDialog", value: function(e4, t3, n3, r2) {
            var o2 = this, i2 = this.make("osjs/locale").translate, a2 = e4.useDefault && this.has("osjs/settings"), s2 = a2 ? this.make("osjs/settings").get("osjs/default-application", n3.mime) : null, c2 = a2 ? "defaultApplication" : "choice", u2 = { title: i2("LBL_LAUNCH_SELECT"), message: i2("LBL_LAUNCH_SELECT_MESSAGE", n3.path), choices: t3.reduce(function(e5, t4) {
              return dt(dt({}, e5), {}, l()({}, t4.name, t4.name));
            }, {}), value: s2 };
            s2 && !e4.forceDialog ? r2(s2) : this.make("osjs/dialog", c2, u2, function(e5, t4) {
              var i3;
              "ok" === e5 && ("defaultApplication" === c2 ? (a2 && (i3 = t4.checked ? t4.value : null, o2.make("osjs/settings").set("osjs/default-application", n3.mime, i3).save()), r2(t4.value)) : t4 && r2(t4));
            });
          } }, { key: "off", value: function(e4) {
            var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (e4.match(/^osjs\//) && "function" != typeof t3) throw new TypeError("The callback must be a function");
            return m()(B()(n2.prototype), "off", this).call(this, e4, t3, r2);
          } }, { key: "broadcast", value: function(e4, t3) {
            for (var n3 = arguments.length, r2 = new Array(n3 > 2 ? n3 - 2 : 0), o2 = 2; o2 < n3; o2++) r2[o2 - 2] = arguments[o2];
            var i2 = "function" == typeof e4 ? e4 : function(t4) {
              return t4.metadata.name === e4;
            }, a2 = Ne.getApplications().filter(i2);
            return a2.map(function(e5) {
              return e5.emit.apply(e5, [t3].concat(r2)), e5.name;
            });
          } }, { key: "send", value: function(e4) {
            for (var t3 = arguments.length, n3 = new Array(t3 > 1 ? t3 - 1 : 0), r2 = 1; r2 < t3; r2++) n3[r2 - 1] = arguments[r2];
            return this.ws.send(JSON.stringify({ name: e4, params: n3 }));
          } }, { key: "setRequestOptions", value: function(e4) {
            this.requestOptions = dt({}, e4);
          } }, { key: "getUser", value: function() {
            return dt({}, this.user);
          } }, { key: "middleware", value: function(e4, t3) {
            return this.make("osjs/middleware").add(e4, t3);
          } }, { key: "kill", value: function(e4) {
            var t3 = Ne.getApplications(), n3 = "number" == typeof e4 ? function(t4) {
              return t4.pid === e4;
            } : function(t4) {
              return t4.metadata.name === e4;
            };
            t3.filter(n3).forEach(function(e5) {
              return e5.destroy();
            });
          } }]), n2;
        }(Ce.CoreBase), Lt = ["ctrl", "shift", "alt", "meta"], _t = function(e3, t2) {
          var n2 = String(e3).toLowerCase().split("+"), r2 = String(t2.key).toLowerCase();
          return n2.every(function(e4) {
            return -1 !== Lt.indexOf(e4) ? t2[e4 + "Key"] : r2 === e4;
          });
        }, vt = function(e3) {
          var t2 = e3.clientX, n2 = e3.clientY, r2 = e3.target, o2 = e3.touches || e3.changedTouches || [];
          return o2.length && (t2 = o2[0].clientX, n2 = o2[0].clientY), { clientX: t2, clientY: n2, touch: o2.length > 0, target: r2 };
        };
        function mt(e3, t2) {
          for (var n2 = [], r2 = [], o2 = arguments.length; o2-- > 2; ) n2.push(arguments[o2]);
          for (; n2.length; ) {
            var i2 = n2.pop();
            if (i2 && i2.pop) for (o2 = i2.length; o2--; ) n2.push(i2[o2]);
            else null != i2 && true !== i2 && false !== i2 && r2.push(i2);
          }
          return "function" == typeof e3 ? e3(t2 || {}, r2) : { nodeName: e3, attributes: t2 || {}, children: r2, key: t2 && t2.key };
        }
        function yt(e3, t2, n2, r2) {
          var o2, i2 = [].map, a2 = r2 && r2.children[0] || null, s2 = a2 && function e4(t3) {
            return { nodeName: t3.nodeName.toLowerCase(), attributes: {}, children: i2.call(t3.childNodes, function(t4) {
              return 3 === t4.nodeType ? t4.nodeValue : e4(t4);
            }) };
          }(a2), c2 = [], u2 = true, l2 = L2(e3), f2 = function e4(t3, n3, r3) {
            for (var o3 in r3) "function" == typeof r3[o3] ? function(e5, o4) {
              r3[e5] = function(e6) {
                var i3 = o4(e6);
                return "function" == typeof i3 && (i3 = i3(v2(t3, l2), r3)), i3 && i3 !== (n3 = v2(t3, l2)) && !i3.then && h3(l2 = _2(t3, L2(n3, i3), l2)), i3;
              };
            }(o3, r3[o3]) : e4(t3.concat(o3), n3[o3] = L2(n3[o3]), r3[o3] = L2(r3[o3]));
            return r3;
          }([], l2, L2(t2));
          return h3(), f2;
          function d2(e4) {
            return "function" == typeof e4 ? d2(e4(l2, f2)) : null != e4 ? e4 : "";
          }
          function p2() {
            o2 = !o2;
            var e4 = d2(n2);
            for (r2 && !o2 && (a2 = function e5(t3, n3, r3, o3, i3) {
              if (o3 === r3) ;
              else if (null == r3 || r3.nodeName !== o3.nodeName) {
                var a3 = function e6(t4, n4) {
                  var r4 = "string" == typeof t4 || "number" == typeof t4 ? document.createTextNode(t4) : (n4 = n4 || "svg" === t4.nodeName) ? document.createElementNS("http://www.w3.org/2000/svg", t4.nodeName) : document.createElement(t4.nodeName), o4 = t4.attributes;
                  if (o4) {
                    o4.oncreate && c2.push(function() {
                      o4.oncreate(r4);
                    });
                    for (var i4 = 0; i4 < t4.children.length; i4++) r4.appendChild(e6(t4.children[i4] = d2(t4.children[i4]), n4));
                    for (var a4 in o4) E2(r4, a4, o4[a4], null, n4);
                  }
                  return r4;
                }(o3, i3);
                t3.insertBefore(a3, n3), null != r3 && g2(t3, n3, r3), n3 = a3;
              } else if (null == r3.nodeName) n3.nodeValue = o3;
              else {
                !function(e6, t4, n4, r4) {
                  for (var o4 in L2(t4, n4)) n4[o4] !== ("value" === o4 || "checked" === o4 ? e6[o4] : t4[o4]) && E2(e6, o4, n4[o4], t4[o4], r4);
                  var i4 = u2 ? n4.oncreate : n4.onupdate;
                  i4 && c2.push(function() {
                    i4(e6, t4);
                  });
                }(n3, r3.attributes, o3.attributes, i3 = i3 || "svg" === o3.nodeName);
                for (var s3 = {}, l3 = {}, f3 = [], p3 = r3.children, h4 = o3.children, _3 = 0; _3 < p3.length; _3++) {
                  f3[_3] = n3.childNodes[_3], null != (y3 = m2(p3[_3])) && (s3[y3] = [f3[_3], p3[_3]]);
                }
                _3 = 0;
                for (var v3 = 0; v3 < h4.length; ) {
                  var y3 = m2(p3[_3]), O2 = m2(h4[v3] = d2(h4[v3]));
                  if (l3[y3]) _3++;
                  else if (null == O2 || O2 !== m2(p3[_3 + 1])) if (null == O2 || u2) null == y3 && (e5(n3, f3[_3], p3[_3], h4[v3], i3), v3++), _3++;
                  else {
                    var A2 = s3[O2] || [];
                    y3 === O2 ? (e5(n3, A2[0], A2[1], h4[v3], i3), _3++) : A2[0] ? e5(n3, n3.insertBefore(A2[0], f3[_3]), A2[1], h4[v3], i3) : e5(n3, f3[_3], null, h4[v3], i3), l3[O2] = h4[v3], v3++;
                  }
                  else null == y3 && g2(n3, f3[_3], p3[_3]), _3++;
                }
                for (; _3 < p3.length; ) null == m2(p3[_3]) && g2(n3, f3[_3], p3[_3]), _3++;
                for (var _3 in s3) l3[_3] || g2(n3, s3[_3][0], s3[_3][1]);
              }
              return n3;
            }(r2, a2, s2, s2 = e4)), u2 = false; c2.length; ) c2.pop()();
          }
          function h3() {
            o2 || (o2 = true, setTimeout(p2));
          }
          function L2(e4, t3) {
            var n3 = {};
            for (var r3 in e4) n3[r3] = e4[r3];
            for (var r3 in t3) n3[r3] = t3[r3];
            return n3;
          }
          function _2(e4, t3, n3) {
            var r3 = {};
            return e4.length ? (r3[e4[0]] = e4.length > 1 ? _2(e4.slice(1), t3, n3[e4[0]]) : t3, L2(n3, r3)) : t3;
          }
          function v2(e4, t3) {
            for (var n3 = 0; n3 < e4.length; ) t3 = t3[e4[n3++]];
            return t3;
          }
          function m2(e4) {
            return e4 ? e4.key : null;
          }
          function y2(e4) {
            return e4.currentTarget.events[e4.type](e4);
          }
          function E2(e4, t3, n3, r3, o3) {
            if ("key" === t3) ;
            else if ("style" === t3) if ("string" == typeof n3) e4.style.cssText = n3;
            else for (var i3 in "string" == typeof r3 && (r3 = e4.style.cssText = ""), L2(r3, n3)) {
              var a3 = null == n3 || null == n3[i3] ? "" : n3[i3];
              "-" === i3[0] ? e4.style.setProperty(i3, a3) : e4.style[i3] = a3;
            }
            else "o" === t3[0] && "n" === t3[1] ? (t3 = t3.slice(2), e4.events ? r3 || (r3 = e4.events[t3]) : e4.events = {}, e4.events[t3] = n3, n3 ? r3 || e4.addEventListener(t3, y2) : e4.removeEventListener(t3, y2)) : t3 in e4 && "list" !== t3 && "type" !== t3 && "draggable" !== t3 && "spellcheck" !== t3 && "translate" !== t3 && !o3 ? e4[t3] = null == n3 ? "" : n3 : null != n3 && false !== n3 && e4.setAttribute(t3, n3), null != n3 && false !== n3 || e4.removeAttribute(t3);
          }
          function g2(e4, t3, n3) {
            function r3() {
              e4.removeChild(function e5(t4, n4) {
                var r4 = n4.attributes;
                if (r4) {
                  for (var o4 = 0; o4 < n4.children.length; o4++) e5(t4.childNodes[o4], n4.children[o4]);
                  r4.ondestroy && r4.ondestroy(t4);
                }
                return t4;
              }(t3, n3));
            }
            var o3 = n3.attributes && n3.attributes.onremove;
            o3 ? o3(t3, r3) : r3();
          }
        }
        function Et(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function gt(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Et(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Et(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var Ot = function(e3) {
          return e3.replace(/\/$/, "").split("/").filter(function(e4, t2, n2) {
            return t2 < n2.length - 1;
          }).join("/").replace(/(\/+)?$/, "/");
        }, At = function() {
          for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
          return t2.map(function(e4, t3) {
            return t3 > 0 && (e4 = e4.replace(/^\/?/, "")), e4.replace(/\/?$/, "");
          }).join("/");
        }, Bt = function(e3, t2) {
          return function(n2, r2) {
            return "asc" === t2 ? String(n2[e3]).localeCompare(r2[e3]) : String(r2[e3]).localeCompare(n2[e3]);
          };
        }, bt = function(e3, t2) {
          return function(n2, r2) {
            return "asc" === t2 ? new Date(n2[e3]) > new Date(r2[e3]) : new Date(r2[e3]) > new Date(n2[e3]);
          };
        }, St = function(e3, t2) {
          return function(n2, r2) {
            return n2[e3] < r2[e3] ? -1 : n2[e3] > r2[e3] ? "asc" === t2 ? 1 : 0 : "asc" === t2 ? 0 : 1;
          };
        }, Tt = function(e3) {
          return "string" === e3 ? Bt : "date" === e3 ? bt : St;
        }, Pt = { size: Tt("number"), mtime: Tt("date"), ctime: Tt("date"), atime: Tt("date") }, wt = function(e3) {
          var t2 = [];
          return "/" !== (e3.replace(/\/+/g, "/").replace(/^(\w+):/, "") || "/") && t2.push({ isDirectory: true, isFile: false, mime: null, size: 0, stat: {}, filename: "..", path: Ot(e3) || "/" }), t2;
        }, Rt = function(e3, t2, n2) {
          return new Promise(function(r2, o2) {
            var i2 = new Blob([t2], { type: n2 }), a2 = new FileReader();
            a2.onerror = function(e4) {
              return o2(e4);
            }, a2.onloadend = function() {
              return r2(a2.result);
            }, a2[e3](i2);
          });
        }, Nt = function(e3) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          (isNaN(e3) || "number" != typeof e3) && (e3 = 0);
          var n2 = t2 ? 1e3 : 1024, r2 = t2 ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
          if (e3 < n2) return e3 + " B";
          var o2 = -1;
          do {
            e3 /= n2, ++o2;
          } while (e3 >= n2);
          return "".concat(e3.toFixed(1), " ").concat(r2[o2]);
        }, jt = function(e3, t2) {
          var n2 = e3.path, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o2 = r2 = gt({ showHiddenFiles: false, sortBy: "filename", sortDir: "asc" }, r2), i2 = o2.sortDir, a2 = o2.sortBy, s2 = o2.filter;
          "function" != typeof s2 && (s2 = function() {
            return true;
          }), -1 === ["asc", "desc"].indexOf(i2) && (i2 = "asc");
          var u2 = r2.showHiddenFiles ? function() {
            return true;
          } : function(e4) {
            return "." !== e4.filename.substr(0, 1);
          }, l2 = Pt[a2] ? Pt[a2] : Tt("string"), f2 = function(e4) {
            return gt(gt({}, e4), {}, { humanSize: Nt(e4.size) });
          }, d2 = wt(n2).sort(l2(a2, i2)).map(f2), p2 = t2.filter(function(e4) {
            return e4.isDirectory;
          }).sort(l2(a2, i2)).filter(u2).filter(s2).map(f2), h3 = t2.filter(function(e4) {
            return !e4.isDirectory;
          }).sort(l2(a2, i2)).filter(u2).filter(s2).map(f2);
          return [].concat(c()(d2), c()(p2), c()(h3));
        }, Ct = function(e3, t2, n2) {
          return "string" === n2 ? Rt("readAsText", e3, t2) : "uri" === n2 ? Rt("readAsDataURL", e3, t2) : "blob" === n2 ? Promise.resolve(new Blob([e3], { type: t2 })) : Promise.resolve(e3);
        }, kt = function(e3) {
          return function(t2) {
            return t2.isDirectory ? { name: "folder" } : function(t3) {
              var n2 = Object.keys(e3).find(function(e4) {
                return new RegExp(e4).test(t3.mime);
              });
              return n2 ? e3[n2] : { name: "application-x-executable" };
            }(t2);
          };
        }, It = function(e3) {
          return gt({ isDirectory: false, isFile: true, mime: "application/octet-stream", icon: null, size: -1, path: null, filename: null, label: null, stat: {}, id: null, parent_id: null }, e3);
        }, Dt = function(e3) {
          return e3.split("/").reverse()[0];
        }, Mt = function(e3) {
          var t2 = e3.split("/");
          return 2 === t2.length ? t2[1] = "" : t2.splice(t2.length - 1, 1), t2.join("/");
        }, xt = function(e3) {
          var t2 = String(e3).replace(/\+/g, "/").match(/^([\w-_]+):+(.*)/), n2 = Array.from(t2 || []).slice(1);
          return et()(n2, 1)[0];
        }, Ft = function(e3) {
          return function(t2) {
            var n2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return !(t2 instanceof Array) || t2[n2 ? "every" : "some"](function(t3) {
              return -1 !== e3.indexOf(t3);
            });
          };
        }, Ut = function(e3, t2) {
          var n2 = [], r2 = t2[t2.length - 1] || {}, o2 = -1 !== ["move", "rename", "copy"].indexOf(e3), i2 = function(e4) {
            return "string" == typeof e4 ? e4 : e4.path;
          };
          if (!(-1 !== ["readdir", "download", "url", "exists", "readfile", "search", "stat"].indexOf(e3))) {
            var a2 = { method: e3, source: i2(t2[0]), pid: r2.pid };
            n2.push(["osjs/vfs:directoryChanged", gt(gt({}, a2), {}, { path: Mt(i2(t2[0])) })]), o2 && n2.push(["osjs/vfs:directoryChanged", gt(gt({}, a2), {}, { path: Mt(i2(t2[1])) })]);
          }
          return n2;
        }, Ht = ["image/png", "image/jpe?g", "image/webp", "image/gif", "image/svg(\\+xml)?"], Gt = function(e3) {
          return e3 && e3.path;
        }, Kt = function(e3) {
          return Gt(e3) && Ht.some(function(t2) {
            return !!e3.mime.match(t2);
          });
        }, Wt = function(e3, t2) {
          var n2 = { top: 0, left: 0, right: 0, bottom: 0 }, r2 = function(e4) {
            return n2[e4.options.position] = e4.$element.offsetHeight;
          };
          return t2.length > 0 ? t2.forEach(r2) : r2(e3), n2;
        }, Vt = function(e3) {
          return e3 && !e3.getState("minimized") && e3.getState("focused");
        }, $t = function(e3) {
          var t2, n2 = { audio: (t2 = function(e4, t3) {
            return Object.keys(e4).reduce(function(n3, r3) {
              return ie(l()({}, r3, "probably" === t3.canPlayType(e4[r3])), n3);
            }, {});
          })({ mp3: "audio/mpeg", mp4: "audio/mp4", oga: "audio/ogg" }, document.createElement("audio")), video: t2({ mp4: "video/mp4", ogv: "video/ogg" }, document.createElement("video")) }, r2 = function(t3) {
            var n3 = e3.config("desktop.settings." + t3);
            return e3.make("osjs/settings").get("osjs/desktop", t3, n3);
          }, o2 = function() {
            return r2("sounds");
          };
          return { themeResource: function(t3) {
            var n3 = r2("theme");
            return e3.url("themes/".concat(n3, "/").concat(t3));
          }, soundResource: function(t3) {
            if (!t3.match(/\.([a-z]+)$/)) {
              t3 += "." + (["oga", "mp3"].find(function(e4) {
                return true === n2.audio[e4];
              }) || "mp3");
            }
            var r3 = o2();
            return r3 ? e3.url("sounds/".concat(r3, "/").concat(t3)) : null;
          }, soundsEnabled: function() {
            return !!o2();
          }, icon: function(t3) {
            t3 = t3.replace(/\.(png|svg|gif)$/, "");
            var n3 = e3.make("osjs/packages").getMetadataFromName, o3 = r2("icons"), i2 = ((n3(o3) || {}).icons || {})[t3] || "png";
            return e3.url("icons/".concat(o3, "/icons/").concat(t3, ".").concat(i2));
          } };
        };
        function zt(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        function Yt(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function Zt(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Yt(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Yt(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var qt = function() {
          var e3, t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 250, n2 = false;
          return function(r2, o2) {
            return e3 = clearTimeout(e3), e3 = setTimeout(function() {
              return n2 = false;
            }, t2), n2 ? (r2.preventDefault(), o2(r2)) : (n2 = true, false);
          };
        }(), Xt = function(e3) {
          return function(t2, n2, r2) {
            var o2 = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            Gt(n2) ? e3.addEntry({ entry: n2, shortcut: o2 }) : r2.length > 0 && e3.uploadEntries(r2);
          };
        }, Qt = function(e3) {
          return function(t2) {
            var n2, r2, o2 = t2.filename, i2 = t2.mime, a2 = t2.label, s2 = "osjs/application" === i2 ? (n2 = function(e4) {
              return e4.name === o2;
            }, e3.make("osjs/packages").getPackages(n2)[0]) : null;
            return a2 || (s2 ? (r2 = s2.title, e3.make("osjs/locale").translatableFlat(r2)) : o2);
          };
        }, Jt = function(e3) {
          return e3.target && e3.target.classList.contains("osjs-desktop-iconview__wrapper");
        }, en = function(e3) {
          E()(n2, e3);
          var t2 = zt(n2);
          function n2(e4) {
            var r2;
            return d()(this, n2), (r2 = t2.call(this, "DesktopIconView")).core = e4, r2.$root = null, r2.iconview = null, r2.root = "home:/.desktop", r2;
          }
          return h2()(n2, [{ key: "destroy", value: function() {
            this.$root && this.$root.parentNode && this.$root.remove(), this.iconview = null, this.$root = null, this.emit("destroy"), m()(B()(n2.prototype), "destroy", this).call(this);
          } }, { key: "_render", value: function(e4) {
            var t3 = this.root;
            return e4 && (this.root = e4), !this.$root || (this.root !== t3 && this.iconview.reload(), false);
          } }, { key: "render", value: function(e4) {
            var t3 = this;
            if (this._render(e4)) {
              this.$root = document.createElement("div"), this.$root.className = "osjs-desktop-iconview", this.core.$contents.appendChild(this.$root);
              var n3 = this.core.make("osjs/dnd").droppable, r2 = this.core.make("osjs/fs").icon, o2 = this.core.make("osjs/theme").icon, i2 = this.core.make("osjs/vfs"), a2 = i2.copy, s2 = i2.readdir, u2 = i2.readfile, l2 = i2.writefile, f2 = i2.unlink, d2 = i2.mkdir, p2 = function(e5) {
                return console.error(e5);
              }, h3 = /* @__PURE__ */ function(e5, t4, n4) {
                var r3 = function() {
                  var n5 = At(e5, ".shortcuts.json");
                  return t4(n5).then(function(e6) {
                    return JSON.parse(e6);
                  }).catch(function(e6) {
                    return [];
                  });
                }, o3 = function(t5) {
                  var r4 = At(e5, ".shortcuts.json"), o4 = JSON.stringify(t5 || []);
                  return n4(r4, o4).catch(function() {
                    return 0;
                  });
                };
                return { read: r3, add: function(e6) {
                  return r3().then(function(t5) {
                    return [].concat(c()(t5), [e6]);
                  }).then(o3);
                }, remove: function(e6) {
                  return r3().then(function(t5) {
                    return t5.splice(e6, 1), t5;
                  }).then(o3);
                } };
              }(e4, u2, l2), L2 = /* @__PURE__ */ function(e5, t4, n4) {
                var r3 = function() {
                  return [];
                };
                return function() {
                  return Promise.all([n4.read().then(function(e6) {
                    return e6.map(function(e7, t5) {
                      return Zt({ shortcut: t5 }, e7);
                    });
                  }).catch(r3), t4(e5, { showHiddenFiles: false }).then(function(e6) {
                    return e6.map(function(e7) {
                      return Zt({ shortcut: false }, e7);
                    });
                  }).catch(r3)]).then(function(e6) {
                    var t5;
                    return (t5 = []).concat.apply(t5, c()(e6));
                  });
                };
              }(e4, s2, h3), _2 = Qt(this.core);
              this.iconview = yt({ selected: -1, entries: [] }, { setEntries: function(e5) {
                return { entries: e5 };
              }, openDropContextMenu: function(e5) {
                var n4 = e5.ev, r3 = e5.data, o3 = e5.files, i3 = e5.droppedImage;
                t3.createDropContextMenu(n4, r3, o3, i3);
              }, openContextMenu: function(e5) {
                var n4 = e5.ev, r3 = e5.entry, o3 = e5.index;
                return r3 ? (t3.createFileContextMenu(n4, r3), { selected: o3 }) : (t3.createRootContextMenu(n4), { selected: -1 });
              }, openEntry: function(e5) {
                var n4 = e5.entry, r3 = e5.forceDialog;
                return n4.isDirectory ? t3.core.run("FileManager", { path: n4 }) : "osjs/application" === n4.mime ? t3.core.run(n4.filename) : t3.core.open(n4, { useDefault: true, forceDialog: r3 }), { selected: -1 };
              }, selectEntry: function(e5) {
                return { selected: e5.index };
              }, uploadEntries: function(e5) {
              }, addEntry: function(t4) {
                var n4 = t4.entry, r3 = t4.shortcut;
                return function(t5, o3) {
                  var i3 = "".concat(e4, "/").concat(n4.filename);
                  return d2(e4).catch(function() {
                    return true;
                  }).then(function() {
                    return r3 || "osjs/application" === n4.mime ? h3.add(n4) : a2(n4, i3).then(function() {
                      return o3.reload(true);
                    }).catch(p2);
                  }).then(function() {
                    return o3.reload(true);
                  }), { selected: -1 };
                };
              }, removeEntry: function(e5) {
                return function(t4, n4) {
                  return false !== e5.shortcut ? h3.remove(e5.shortcut).then(function() {
                    return n4.reload(true);
                  }).catch(p2) : f2(e5).then(function() {
                    return n4.reload(true);
                  }).catch(p2), { selected: -1 };
                };
              }, reload: function(e5) {
                return function(n4, r3) {
                  e5 && t3.core.config("vfs.watch") || L2().then(function(e6) {
                    return e6.filter(function(e7) {
                      return ".." !== e7.filename;
                    });
                  }).then(function(e6) {
                    return r3.setEntries(e6);
                  });
                };
              } }, /* @__PURE__ */ function(e5, t4, n4, r3) {
                return function(o3, i3) {
                  return mt("div", { class: "osjs-desktop-iconview__wrapper", oncontextmenu: function(e6) {
                    Jt(e6) && i3.openContextMenu({ ev: e6 });
                  }, onclick: function(e6) {
                    Jt(e6) && i3.selectEntry({ index: -1 });
                  }, oncreate: function(e6) {
                    r3(e6, { ondrop: function(e7, t5, n5) {
                      Kt(t5) || e7.shiftKey && Gt(t5) ? i3.openDropContextMenu({ ev: e7, data: t5, files: n5 }) : Xt(i3)(e7, t5, n5);
                    } });
                  } }, o3.entries.map(function(r4, a3) {
                    return mt("div", { class: "osjs-desktop-iconview__entry" + (o3.selected === a3 ? " osjs-desktop-iconview__entry--selected" : ""), oncontextmenu: function(e6) {
                      return i3.openContextMenu({ ev: e6, entry: r4, index: a3 });
                    }, ontouchstart: function(e6) {
                      return qt(e6, function() {
                        return i3.openEntry({ ev: e6, entry: r4, index: a3 });
                      });
                    }, ondblclick: function(e6) {
                      return i3.openEntry({ ev: e6, entry: r4, index: a3 });
                    }, onclick: function(e6) {
                      return i3.selectEntry({ ev: e6, entry: r4, index: a3 });
                    } }, [mt("div", { class: "osjs-desktop-iconview__entry__inner" }, [mt("div", { class: "osjs-desktop-iconview__entry__icon" }, [mt("img", { src: r4.icon ? r4.icon : n4(t4(r4).name), class: "osjs-desktop-iconview__entry__icon__icon" }), false !== r4.shortcut ? mt("img", { src: n4("emblem-symbolic-link"), class: "osjs-desktop-iconview__entry__icon__shortcut" }) : null]), mt("div", { class: "osjs-desktop-iconview__entry__label" }, e5(r4))])]);
                  }));
                };
              }(_2, r2, o2, n3), this.$root), this.applySettings(), this.iconview.reload(), this._createWatcher(), this.core.on("osjs/settings:save", function() {
                return t3.iconview.reload();
              });
            }
          } }, { key: "createFileContextMenu", value: function(e4, t3) {
            var n3 = this, r2 = this.core.make("osjs/locale").translate;
            this.core.make("osjs/contextmenu", { position: e4, menu: [{ label: r2("LBL_OPEN"), onclick: function() {
              return n3.iconview.openEntry({ entry: t3, forceDialog: false });
            } }, { label: r2("LBL_OPEN_WITH"), onclick: function() {
              return n3.iconview.openEntry({ entry: t3, forceDialog: true });
            } }, { label: false !== t3.shortcut ? r2("LBL_REMOVE_SHORTCUT") : r2("LBL_DELETE"), onclick: function() {
              return n3.iconview.removeEntry(t3);
            } }] });
          } }, { key: "createDropContextMenu", value: function(e4, t3, n3) {
            var r2 = this, o2 = this.core.make("osjs/desktop"), i2 = this.core.make("osjs/locale").translate, a2 = function(o3) {
              return Xt(r2.iconview)(e4, t3, n3, o3);
            }, s2 = [{ label: i2("LBL_COPY"), onclick: function() {
              return a2(false);
            } }, { label: i2("LBL_CREATE_SHORTCUT"), onclick: function() {
              return a2(true);
            } }].concat(c()(o2.createDropContextMenu(t3)));
            this.core.make("osjs/contextmenu", { position: e4, menu: s2 });
          } }, { key: "createRootContextMenu", value: function(e4) {
            this.core.make("osjs/desktop").openContextMenu(e4);
          } }, { key: "_createWatcher", value: function() {
            var e4 = this, t3 = function(t4) {
              String(e4.root).replace(/\/$/, "") === String(t4.path).replace(/\/$/, "") && e4.iconview.reload();
            };
            this.core.on("osjs/vfs:directoryChanged", t3), this.on("destroy", function() {
              return e4.core.off("osjs/vfs:directoryChanged", t3);
            });
          } }, { key: "applySettings", value: function() {
            if (this.$root) {
              var e4, t3 = this.core.make("osjs/settings"), n3 = this.core.config("desktop.settings"), r2 = t3.get("osjs/desktop", "iconview.fontColorStyle", n3.iconview.fontColorStyle), o2 = t3.get("osjs/desktop", "iconview.fontColor", "#ffffff", n3.iconview.fontColor), i2 = t3.get("osjs/desktop", "background.color", n3.background.color), a2 = { system: "inherit", invert: (e4 = i2, "#" + e4.match(/[a-f0-9]{2}/gi).map(function(e5) {
                return (255 - parseInt(e5, 16) | 0).toString(16).replace(/^([a-f0-9])$/, "0$1");
              }).join("")), custom: o2 };
              this.$root.style.color = a2[r2];
            }
          } }]), n2;
        }(T.EventEmitter), tn = n(14), nn = n.n(tn), rn = n(12), on = n.n(rn), an = function(e3, t2) {
          var n2 = e3.make("osjs/locale").translate, r2 = /* @__PURE__ */ function(e4, t3, n3, r3) {
            var o3 = function(e5, r4) {
              var o4 = e5.results, i3 = e5.index;
              return o4.map(function(e6, o5) {
                return mt("li", { onclick: function() {
                  return r4.open(o5);
                }, onupdate: function(e7) {
                  o5 === i3 && e7.scrollIntoView();
                }, class: ["osjs-search-result", i3 === o5 ? "osjs__active" : ""].join(" ") }, [mt("img", { src: n3(t3.icon(e6).name) }), mt("span", {}, "".concat(e6.path, " (").concat(e6.mime, ")"))]);
              });
            };
            return function(e5, t4) {
              return mt("div", { class: "osjs-search-container osjs-notification", style: { display: e5.visible ? void 0 : "none" } }, [mt("input", { type: "text", placeholder: r3("LBL_SEARCH_PLACEHOLDER"), class: "osjs-search-input", value: e5.query, onblur: function() {
                e5.value || setTimeout(function() {
                  return t4.toggle(false);
                }, 300);
              }, oninput: function(e6) {
                return t4.setQuery(e6.target.value);
              }, onkeydown: function(n4) {
                38 === n4.keyCode ? t4.setPreviousIndex() : 40 === n4.keyCode ? t4.setNextIndex() : 27 === n4.keyCode && (t4.resetIndex(), -1 === e5.index && t4.hide());
              }, onkeypress: function(n4) {
                13 === n4.keyCode && (e5.index >= 0 ? t4.open(e5.index) : t4.search(e5.query.replace(/\*?$/, "*").replace(/^\*?/, "*")));
              } }), mt("div", { "data-error": !!e5.error, class: "osjs-search-message", style: { display: e5.error || e5.status ? "block" : "none" } }, e5.error || e5.status), mt("ol", { class: "osjs-search-results", style: { display: e5.results.length ? void 0 : "none" } }, o3(e5, t4))]);
            };
          }(0, e3.make("osjs/fs"), e3.make("osjs/theme").icon, n2), o2 = new T.EventEmitter("SearchUI"), i2 = yt({ query: "", index: -1, status: void 0, error: null, visible: false, results: [] }, { search: function(e4) {
            return o2.emit("search", e4), { status: n2("LBL_SEARCH_WAIT") };
          }, open: function(e4) {
            return function(t3, n3) {
              var r3 = t3.results[e4];
              r3 && o2.emit("open", r3), n3.toggle(false);
            };
          }, resetIndex: function() {
            return function() {
              return { index: -1 };
            };
          }, setNextIndex: function() {
            return function(e4) {
              return { index: (e4.index + 1) % e4.results.length };
            };
          }, setPreviousIndex: function() {
            return function(e4) {
              return { index: e4.index <= 0 ? e4.results.length - 1 : e4.index - 1 };
            };
          }, setError: function(e4) {
            return function() {
              return { error: e4, status: void 0, index: -1 };
            };
          }, setResults: function(e4) {
            return function() {
              return { results: e4, index: -1, status: n2("LBL_SEARCH_RESULT", e4.length) };
            };
          }, setQuery: function(e4) {
            return function() {
              return { query: e4 };
            };
          }, hide: function() {
            o2.emit("hide");
          }, toggle: function(e4) {
            return function(t3) {
              return { query: "", results: [], index: -1, status: void 0, error: null, visible: "boolean" == typeof e4 ? e4 : !t3.visible };
            };
          } }, r2, t2);
          return o2.on("error", function(e4) {
            return i2.setError(e4);
          }), o2.on("success", function(e4) {
            return i2.setResults(e4);
          }), o2.on("toggle", function(e4) {
            return i2.toggle(e4);
          }), o2.on("focus", function() {
            var e4 = t2.querySelector(".osjs-search-input");
            e4 && e4.focus();
          }), o2;
        }, sn = function() {
          function e3(t3) {
            d()(this, e3), this.core = t3;
          }
          var t2, n2;
          return h2()(e3, [{ key: "destroy", value: function() {
          } }, { key: "init", value: (n2 = nn()(on.a.mark(function e4() {
            return on.a.wrap(function(e5) {
              for (; ; ) switch (e5.prev = e5.next) {
                case 0:
                case "end":
                  return e5.stop();
              }
            }, e4);
          })), function() {
            return n2.apply(this, arguments);
          }) }, { key: "search", value: (t2 = nn()(on.a.mark(function e4(t3) {
            var n3, r2;
            return on.a.wrap(function(e5) {
              for (; ; ) switch (e5.prev = e5.next) {
                case 0:
                  return n3 = this.core.make("osjs/vfs"), r2 = this.core.make("osjs/fs").mountpoints().map(function(e6) {
                    return "".concat(e6.name, ":/");
                  }).map(function(e6) {
                    return n3.search({ path: e6 }, t3).catch(function(e7) {
                      return D.warn("Error while searching", e7), [];
                    });
                  }), e5.abrupt("return", Promise.all(r2).then(function(e6) {
                    var t4;
                    return (t4 = []).concat.apply(t4, c()(e6));
                  }));
                case 3:
                case "end":
                  return e5.stop();
              }
            }, e4, this);
          })), function(e4) {
            return t2.apply(this, arguments);
          }) }]), e3;
        }(), cn = function() {
          function e3(t3, n3) {
            d()(this, e3), this.core = t3, this.ui = null, this.focusLastWindow = null, this.$element = document.createElement("div");
            var r2 = n3.adapters || [], o2 = [sn].concat(c()(r2));
            this.adapters = o2.map(function(e4) {
              return new e4(t3);
            });
          }
          var t2, n2;
          return h2()(e3, [{ key: "destroy", value: function() {
            this.ui && this.ui.destroy();
          } }, { key: "init", value: (n2 = nn()(on.a.mark(function e4() {
            var t3, n3, r2, o2 = this;
            return on.a.wrap(function(e5) {
              for (; ; ) switch (e5.prev = e5.next) {
                case 0:
                  return t3 = this.core.make("osjs/theme"), n3 = t3.icon, r2 = this.core.make("osjs/locale").translate, this.$element.className = "osjs-search", this.core.$root.appendChild(this.$element), this.core.make("osjs/tray").create({ title: r2("LBL_SEARCH_TOOLTOP", "F3"), icon: n3("system-search") }, function() {
                    return o2.show();
                  }), this.ui = an(this.core, this.$element), this.ui.on("hide", function() {
                    return o2.hide();
                  }), this.ui.on("open", function(e6) {
                    return o2.core.open(e6);
                  }), this.ui.on("search", function(e6) {
                    o2.search(e6).then(function(e7) {
                      return o2.ui.emit("success", e7);
                    }).catch(function(e7) {
                      return o2.ui.emit("error", e7);
                    });
                  }), e5.next = 11, Promise.all(this.adapters.map(function(e6) {
                    return e6.init();
                  }));
                case 11:
                case "end":
                  return e5.stop();
              }
            }, e4, this);
          })), function() {
            return n2.apply(this, arguments);
          }) }, { key: "search", value: (t2 = nn()(on.a.mark(function e4(t3) {
            var n3;
            return on.a.wrap(function(e5) {
              for (; ; ) switch (e5.prev = e5.next) {
                case 0:
                  return e5.next = 2, Promise.all(this.adapters.map(function(e6) {
                    return e6.search(t3);
                  }));
                case 2:
                  return n3 = e5.sent, e5.abrupt("return", n3.flat(1));
                case 4:
                case "end":
                  return e5.stop();
              }
            }, e4, this);
          })), function(e4) {
            return t2.apply(this, arguments);
          }) }, { key: "focus", value: function() {
            this.ui && this.ui.emit("focus");
          } }, { key: "hide", value: function() {
            if (this.ui) {
              this.ui.emit("toggle", false);
              var e4 = Ae.lastWindow();
              this.focusLastWindow && e4 && e4.focus();
            }
          } }, { key: "show", value: function() {
            var e4 = this;
            if (this.ui) {
              var t3 = Ae.lastWindow();
              this.focusLastWindow = t3 && t3.blur(), this.ui.emit("toggle", true), setTimeout(function() {
                return e4.focus();
              }, 1);
            }
          } }]), e3;
        }();
        function un(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function ln(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? un(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : un(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        function fn(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var dn = function(e3) {
          E()(n2, e3);
          var t2 = fn(n2);
          function n2(e4) {
            var r2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return d()(this, n2), (r2 = t2.call(this, "Desktop")).core = e4, r2.options = ln({ contextmenu: [] }, o2), r2.$theme = [], r2.$icons = [], r2.contextmenuEntries = [], r2.search = e4.config("search.enabled") ? new cn(e4, o2.search || {}) : null, r2.iconview = new en(r2.core), r2.keyboardContext = null, r2.subtract = { left: 0, top: 0, right: 0, bottom: 0 }, r2;
          }
          return h2()(n2, [{ key: "destroy", value: function() {
            this.search && (this.search = this.search.destroy()), this.iconview && this.iconview.destroy(), this._removeIcons(), this._removeTheme(), m()(B()(n2.prototype), "destroy", this).call(this);
          } }, { key: "init", value: function() {
            this.initConnectionEvents(), this.initUIEvents(), this.initDragEvents(), this.initKeyboardEvents(), this.initGlobalKeyboardEvents(), this.initMouseEvents(), this.initBaseEvents(), this.initLocales(), this.initDeveloperTray();
          } }, { key: "initConnectionEvents", value: function() {
            var e4 = this;
            this.core.on("osjs/core:disconnect", function(t3) {
              D.warn("Connection closed", t3);
              var n3 = e4.core.make("osjs/locale").translate;
              e4.core.make("osjs/notification", { title: n3("LBL_CONNECTION_LOST"), message: n3("LBL_CONNECTION_LOST_MESSAGE") });
            }), this.core.on("osjs/core:connect", function(t3, n3) {
              if (D.debug("Connection opened"), n3) {
                var r2 = e4.core.make("osjs/locale").translate;
                e4.core.make("osjs/notification", { title: r2("LBL_CONNECTION_RESTORED"), message: r2("LBL_CONNECTION_RESTORED_MESSAGE") });
              }
            }), this.core.on("osjs/core:connection-failed", function(t3) {
              D.warn("Connection failed");
              var n3 = e4.core.make("osjs/locale").translate;
              e4.core.make("osjs/notification", { title: n3("LBL_CONNECTION_FAILED"), message: n3("LBL_CONNECTION_FAILED_MESSAGE") });
            });
          } }, { key: "initUIEvents", value: function() {
            var e4 = this;
            this.core.on(["osjs/panel:create", "osjs/panel:destroy"], function(t3) {
              var n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
              e4.subtract = Wt(t3, n3);
              try {
                e4._updateCSS(), e4._clampWindows();
              } catch (e5) {
                D.warn("Panel event error", e5);
              }
              e4.core.emit("osjs/desktop:transform", e4.getRect());
            }), this.core.on("osjs/window:transitionend", function() {
              for (var t3 = arguments.length, n3 = new Array(t3), r2 = 0; r2 < t3; r2++) n3[r2] = arguments[r2];
              e4.emit.apply(e4, ["theme:window:transitionend"].concat(n3));
            }), this.core.on("osjs/window:change", function() {
              for (var t3 = arguments.length, n3 = new Array(t3), r2 = 0; r2 < t3; r2++) n3[r2] = arguments[r2];
              e4.emit.apply(e4, ["theme:window:change"].concat(n3));
            });
          } }, { key: "initDeveloperTray", value: function() {
            var e4 = this;
            if (this.core.config("development")) {
              var t3 = this.core.make("osjs/tray").create({ title: "OS.js developer tools" }, function(t4) {
                return e4.onDeveloperMenu(t4);
              });
              this.core.on("destroy", function() {
                return t3.destroy();
              });
            }
          } }, { key: "initDragEvents", value: function() {
            var e4 = this;
            (0, this.core.make("osjs/dnd").droppable)(this.core.$contents, { strict: true, ondrop: function(t3, n3, r2) {
              Kt(n3) && e4.onDropContextMenu(t3, n3);
            } });
          } }, { key: "initKeyboardEvents", value: function() {
            var e4 = this, t3 = function(t4, n3) {
              return function(e5, t5) {
                return e5 && e5.$element.contains(t5);
              }(t4, n3) || function(t5) {
                return e4.keyboardContext && e4.keyboardContext.contains(t5);
              }(n3);
            };
            ["keydown", "keyup", "keypress"].forEach(function(t4) {
              e4.core.$root.addEventListener(t4, function(e5) {
                return function(e6, t5) {
                  var n3 = Ae.lastWindow();
                  Vt(n3) && n3.emit(e6, t5, n3);
                }(t4, e5);
              });
            }), this.core.$root.addEventListener("keydown", function(n3) {
              var r2, o2, i2, a2;
              if (n3.target) {
                if (114 === n3.keyCode) n3.preventDefault(), e4.search && e4.search.show();
                else if (9 === n3.keyCode) {
                  var s2 = n3.target.tagName, c2 = -1 !== ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].indexOf(s2), u2 = Ae.lastWindow();
                  t3(u2, n3.target) && c2 ? "TEXTAREA" === s2 && (r2 = n3.target, o2 = r2.selectionStart, i2 = r2.selectionEnd, a2 = r2.value, r2.value = a2.substring(0, o2) + "	" + a2.substring(i2, a2.length), o2++, r2.selectionStart = o2, r2.selectionEnd = o2) : n3.preventDefault();
                }
              }
            });
          } }, { key: "initGlobalKeyboardEvents", value: function() {
            var e4 = this, t3 = [], n3 = this.core.config("desktop.settings.keybindings", {}), r2 = function() {
              t3 = e4.core.make("osjs/settings").get("osjs/desktop", "keybindings", n3);
            };
            window.addEventListener("keydown", function(n4) {
              Object.keys(t3).some(function(r3) {
                var o2 = t3[r3];
                _t(o2, n4) && e4.core.emit("osjs/desktop:keybinding:" + r3, n4);
              });
            }), this.core.on("osjs/settings:load", r2), this.core.on("osjs/settings:save", r2), this.core.on("osjs/core:started", r2);
            this.core.on("osjs/desktop:keybinding:close-window", function() {
              var e5 = Ae.lastWindow();
              Vt(e5) && e5.close();
            });
          } }, { key: "initMouseEvents", value: function() {
            var e4 = this;
            this.core.$contents.addEventListener("contextmenu", function(t3) {
              t3.target === e4.core.$contents && e4.onContextMenu(t3);
            }), window.addEventListener("mousedown", function() {
              var t3 = false, n3 = function() {
                t3 || (t3 = true, e4.core.$root.setAttribute("data-mousemove", String(true)));
              };
              window.addEventListener("mousemove", n3), window.addEventListener("mouseup", function r2() {
                t3 = false, e4.core.$root.setAttribute("data-mousemove", String(false)), window.removeEventListener("mousemove", n3), window.removeEventListener("mouseup", r2);
              });
            });
          } }, { key: "initBaseEvents", value: function() {
            var e4, t3 = this;
            window.addEventListener("resize", function() {
              clearTimeout(e4), e4 = setTimeout(function() {
                t3._updateCSS(), t3._clampWindows(true);
              }, 200);
            }), history.pushState(null, null, document.URL), window.addEventListener("popstate", function() {
              history.pushState(null, null, document.URL);
            }), this.core.$root.addEventListener("touchmove", function(e5) {
              return e5.preventDefault();
            });
          } }, { key: "initLocales", value: function() {
            var e4 = this, t3 = this.core.config("locale.rtl"), n3 = function() {
              var n4 = e4.core.make("osjs/locale").getLocale().split("_")[0].toLowerCase(), r2 = -1 !== t3.indexOf(n4);
              e4.core.$root.setAttribute("data-dir", r2 ? "rtl" : "ltr");
            };
            this.core.on("osjs/settings:load", n3), this.core.on("osjs/settings:save", n3), this.core.on("osjs/core:started", n3);
          } }, { key: "start", value: function() {
            this.search && this.search.init(), this._updateCSS();
          } }, { key: "_updateCSS", value: function() {
            var e4 = this.core.config("windows.mobile"), t3 = !!e4 && this.core.$root.offsetWidth <= e4;
            this.core.$root.setAttribute("data-mobile", t3), this.core.$contents && (this.core.$contents.style.top = "".concat(this.subtract.top, "px"), this.core.$contents.style.left = "".concat(this.subtract.left, "px"), this.core.$contents.style.right = "".concat(this.subtract.right, "px"), this.core.$contents.style.bottom = "".concat(this.subtract.bottom, "px"));
          } }, { key: "_clampWindows", value: function(e4) {
            e4 && !this.core.config("windows.clampToViewport") || Ae.getWindows().forEach(function(e5) {
              return e5.clampToViewport();
            });
          } }, { key: "addContextMenu", value: function(e4) {
            this.contextmenuEntries = this.contextmenuEntries.concat(e4);
          } }, { key: "applySettings", value: function(e4) {
            var t3, n3 = this, r2 = this.core.config("desktop.lock"), o2 = this.core.config("desktop.settings");
            if (r2) t3 = o2;
            else {
              var i2 = e4 || this.core.make("osjs/settings").get("osjs/desktop");
              t3 = S()(o2, i2, { arrayMerge: function(e5, t4) {
                return t4;
              } });
            }
            var a2, s2, c2, u2 = function(e5, t4) {
              if (n3.core.has(e5)) {
                var r3 = n3.core.make(e5);
                r3.removeAll(), t4.forEach(function(e6) {
                  return r3.create(e6);
                });
              }
            };
            return s2 = (a2 = t3).font, c2 = a2.background, n3.core.$root.style.fontFamily = "".concat(s2, ", sans-serif"), function(e5, t4) {
              var n4 = e5.$root, r3 = { backgroundRepeat: "no-repeat", backgroundPosition: "50% 50%", backgroundSize: "auto", backgroundColor: t4.color, backgroundImage: "none" };
              "cover" === t4.style || "contain" === t4.style ? r3.backgroundSize = t4.style : "repeat" === t4.style && (r3.backgroundRepeat = "repeat"), "color" !== t4.style && (void 0 === t4.src ? r3.backgroundImage = void 0 : "string" == typeof t4.src ? r3.backgroundImage = "url(".concat(t4.src, ")") : t4.src && e5.make("osjs/vfs").url(t4.src).then(function(e6) {
                setTimeout(function() {
                  return n4.style.backgroundImage = "url(".concat(e6, ")");
                }, 1);
              }).catch(function(e6) {
                return D.warn("Error while setting wallpaper from VFS", e6);
              })), Object.keys(r3).forEach(function(e6) {
                return n4.style[e6] = r3[e6];
              });
            }(n3.core, c2), u2("osjs/panels", (t3.panels || []).slice(-1)), u2("osjs/widgets", t3.widgets), this.applyTheme(t3.theme), this.applyIcons(t3.icons), this.applyIconView(t3.iconview), this.core.emit("osjs/desktop:applySettings"), ln({}, t3);
          } }, { key: "_removeTheme", value: function() {
            this.emit("theme:destroy"), this.off(["theme:init", "theme:destroy", "theme:window:change", "theme:window:transitionend"]), this.$theme.forEach(function(e4) {
              e4 && e4.parentNode && e4.remove();
            }), this.$theme = [];
          } }, { key: "_removeIcons", value: function() {
            this.$icons.forEach(function(e4) {
              e4 && e4.parentNode && e4.remove();
            }), this.$icons = [];
          } }, { key: "applyIconView", value: function(e4) {
            this.iconview && (e4.enabled ? this.iconview.render(e4.path) : this.iconview.destroy());
          } }, { key: "applyIcons", value: function(e4) {
            var t3 = this;
            return e4 = e4 || this.core.config("desktop.icons"), this._applyTheme(e4).then(function(e5) {
              var n3 = e5.elements;
              e5.errors, e5.callback, e5.metadata;
              t3._removeIcons(), t3.$icons = Object.values(n3), t3.emit("icons:init");
            });
          } }, { key: "applyTheme", value: function(e4) {
            var t3 = this;
            return e4 = e4 || this.core.config("desktop.theme"), this._applyTheme(e4).then(function(e5) {
              var n3 = e5.elements, r2 = (e5.errors, e5.callback), o2 = e5.metadata;
              if (t3._removeTheme(), r2 && o2) try {
                r2(t3.core, t3, {}, o2);
              } catch (e6) {
                D.warn("Exception while calling theme callback", e6);
              }
              t3.$theme = Object.values(n3), t3.emit("theme:init");
            });
          } }, { key: "_applyTheme", value: function(e4) {
            return this.core.make("osjs/packages").launch(e4).then(function(e5) {
              return e5.errors.length && D.error(e5.errors), e5;
            });
          } }, { key: "_applySettingsByKey", value: function(e4, t3) {
            var n3 = this;
            return this.core.make("osjs/settings").set("osjs/desktop", e4, t3).save().then(function() {
              return n3.applySettings();
            });
          } }, { key: "createDropContextMenu", value: function(e4) {
            var t3 = this.core.make("osjs/locale").translate, n3 = this.core.make("osjs/settings"), r2 = this.core.make("osjs/desktop"), o2 = [];
            return Kt(e4) && o2.push({ label: t3("LBL_DESKTOP_SET_AS_WALLPAPER"), onclick: function() {
              return n3.set("osjs/desktop", "background.src", e4).save().then(function() {
                return r2.applySettings();
              });
            } }), o2;
          } }, { key: "onDeveloperMenu", value: function(e4) {
            var t3 = this, n3 = this.core.make("osjs/locale").translate, r2 = this.core.make("osjs/settings").get(), o2 = Object.keys(r2).map(function(e5) {
              return { label: e5, onclick: function() {
                t3.core.make("osjs/settings").clear(e5).then(function() {
                  return t3.applySettings();
                });
              } };
            });
            this.core.make("osjs/contextmenu").show({ position: e4, menu: [{ label: n3("LBL_KILL_ALL"), onclick: function() {
              return Ne.destroyAll();
            } }, { label: n3("LBL_APPLICATIONS"), items: Ne.getApplications().map(function(e5) {
              return { label: "".concat(e5.metadata.name, " (").concat(e5.pid, ")"), items: [{ label: n3("LBL_KILL"), onclick: function() {
                return e5.destroy();
              } }, { label: n3("LBL_RELOAD"), onclick: function() {
                return e5.relaunch();
              } }] };
            }) }, { label: "Clear Storage", items: o2 }] });
          } }, { key: "onDropContextMenu", value: function(e4, t3) {
            var n3 = this.createDropContextMenu(t3);
            this.core.make("osjs/contextmenu", { position: e4, menu: n3 });
          } }, { key: "onContextMenu", value: function(e4) {
            var t3, n3 = this, r2 = this.core.config("desktop.lock"), o2 = (t3 = []).concat.apply(t3, c()(this.contextmenuEntries.map(function(e5) {
              return "function" == typeof e5 ? e5() : e5;
            }))), i2 = this.core.config("desktop.contextmenu"), a2 = this.core.make("osjs/settings").get("osjs/desktop", "iconview.enabled");
            if (false !== i2 && false !== i2.enabled) {
              var s2 = true === i2 || i2.defaults, u2 = this.core.make("osjs/locale").translate, l2 = this.core.make("osjs/locale").translatableFlat, f2 = this.core.make("osjs/packages").getPackages(function(e5) {
                return "theme" === e5.type;
              }), d2 = r2 ? [] : [{ label: u2("LBL_DESKTOP_SELECT_WALLPAPER"), onclick: function() {
                n3.core.make("osjs/dialog", "file", { mime: ["^image"] }, function(e5, t4) {
                  "ok" === e5 && n3._applySettingsByKey("background.src", t4);
                });
              } }, { label: u2("LBL_DESKTOP_SELECT_THEME"), items: f2.map(function(e5) {
                return { label: l2(e5.title, e5.name), onclick: function() {
                  n3._applySettingsByKey("theme", e5.name);
                } };
              }) }];
              a2 && this.iconview && d2.push({ label: u2("LBL_REFRESH"), onclick: function() {
                return n3.iconview.iconview.reload();
              } });
              var p2 = "function" === s2 ? i2.defaults(this, d2) : s2 ? d2 : [], h3 = "function" == typeof this.options.contextmenu ? this.options.contextmenu(this, d2) : this.options.contextmenu || [], L2 = [].concat(c()(p2), c()(h3), c()(o2));
              L2.length && this.core.make("osjs/contextmenu").show({ menu: L2, position: e4 });
            }
          } }, { key: "setKeyboardContext", value: function(e4) {
            this.keyboardContext = e4;
          } }, { key: "getRect", value: function() {
            var e4 = this.core.$root, t3 = this.subtract, n3 = t3.left, r2 = t3.top, o2 = t3.right, i2 = t3.bottom;
            return { width: e4.offsetWidth - n3 - o2, height: e4.offsetHeight - r2 - i2, top: r2, bottom: i2, left: n3, right: o2 };
          } }]), n2;
        }(T.EventEmitter);
        function pn(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function hn(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? pn(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : pn(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var Ln = function() {
          function e3(t2, n2) {
            var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            d()(this, e3);
            var o2 = t2.make("osjs/locale").translate("LBL_NOTIFICATION");
            this.core = t2, this.$root = n2, this.$element = document.createElement("div"), this.destroyed = false, this.options = hn({ icon: null, title: o2, message: o2, timeout: 5e3, native: t2.config("notifications.native", false), sound: "message", className: "" }, r2), this.core.emit("osjs/notification:create", this);
          }
          return h2()(e3, [{ key: "destroy", value: function() {
            this.destroyed || (this.destroyed = true, this.core.emit("osjs/notification:destroy", this), this.$element.remove(), this.$element = null, this.$root = null);
          } }, { key: "render", value: function() {
            var e4 = this, t2 = function() {
              return e4.destroy();
            }, n2 = function() {
              return e4.$element.classList.add("osjs-notification"), e4.options.className && e4.$element.classList.add(e4.options.className), e4.options.timeout && setTimeout(function() {
                return e4.destroy();
              }, e4.options.timeout), e4.$element.addEventListener("click", t2), e4.$root.appendChild(e4.$element), yt(e4.options, {}, function(e5) {
                return mt("div", { class: "osjs-notification-wrapper", "data-has-icon": !!e5.icon, style: { backgroundImage: e5.icon ? "url(".concat(e5.icon, ")") : void 0 } }, [mt("div", { class: "osjs-notification-title" }, e5.title), mt("div", { class: "osjs-notification-message" }, e5.message)]);
              }, e4.$element), Promise.resolve(true);
            };
            return this.options.native ? function(e5, t3) {
              var n3 = window.Notification, r2 = function() {
                var r3 = new n3(e5.title, { body: e5.message, icon: e5.icon });
                return r3.onclick = t3, r3;
              };
              if (ce) {
                if ("granted" === n3.permission) return Promise.resolve(r2());
                if ("denied" !== n3.permission) return new Promise(function(e6, t4) {
                  n3.requestPermission(function(n4) {
                    return "granted" === n4 ? e6(true) : t4(n4);
                  });
                }).then(r2);
              }
              return Promise.reject("Unsupported");
            }(this.options, t2).catch(function(e5) {
              return D.warn("Error on native notification", e5), n2();
            }) : (this.options.sound && this.core.make("osjs/sounds").play(this.options.sound), n2());
          } }]), e3;
        }();
        function _n(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        var vn = function() {
          function e3(t2) {
            d()(this, e3), this.core = t2, this.$element = null;
          }
          return h2()(e3, [{ key: "destroy", value: function() {
            this.$element.remove(), this.$element = null;
          } }, { key: "init", value: function() {
            var e4 = this;
            this.$element = document.createElement("div"), this.$element.classList.add("osjs-notifications"), this.core.$root.appendChild(this.$element), this.core.on("osjs/desktop:applySettings", function() {
              e4.setElementStyles();
            }), this.setElementStyles();
          } }, { key: "create", value: function(e4) {
            if (!e4) throw new Error("Notification options not given");
            var t2 = new Ln(this.core, this.$element, e4);
            return t2.render(), t2;
          } }, { key: "setElementStyles", value: function() {
            var e4 = fe(this.createElementStyles());
            this.$element.style.cssText = e4;
          } }, { key: "createElementStyles", value: function() {
            var e4 = this.core.config("desktop.settings.notifications.position", "top-right"), t2 = this.core.make("osjs/settings").get("osjs/desktop", "notifications.position", e4);
            return 2 !== t2.split("-").length ? {} : ["left", "right", "top", "bottom"].reduce(function(e5, n2) {
              return function(e6) {
                for (var t3 = 1; t3 < arguments.length; t3++) {
                  var n3 = null != arguments[t3] ? arguments[t3] : {};
                  t3 % 2 ? _n(Object(n3), true).forEach(function(t4) {
                    l()(e6, t4, n3[t4]);
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(n3)) : _n(Object(n3)).forEach(function(t4) {
                    Object.defineProperty(e6, t4, Object.getOwnPropertyDescriptor(n3, t4));
                  });
                }
                return e6;
              }(l()({}, n2, -1 === t2.indexOf(n2) ? "auto" : "0"), e5);
            }, {});
          } }]), e3;
        }();
        function mn(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function yn(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? mn(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : mn(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var En = de(), gn = !!En && { passive: true }, On = { maximize: function(e3) {
          return e3.maximize() ? null : e3.restore();
        }, minimize: function(e3) {
          return e3.minimize();
        }, close: function(e3) {
          return e3.close();
        } }, An = function() {
          function e3(t2) {
            d()(this, e3), this.core = t2, this.lastAction = null, this.$lofi = document.createElement("div"), this.$lofi.className = "osjs-window-behavior-lofi";
          }
          return h2()(e3, [{ key: "init", value: function(e4) {
            var t2 = this, n2 = function(n3) {
              return t2.mousedown(n3, e4);
            }, r2 = function(n3) {
              return t2.mousedown(n3, e4);
            }, o2 = function(n3) {
              return t2.click(n3, e4);
            }, i2 = function(n3) {
              return t2.dblclick(n3, e4);
            }, a2 = function(n3) {
              n3.stopPropagation(), n3.preventDefault(), t2.iconDblclick(n3, e4);
            }, s2 = function(n3) {
              n3.stopPropagation(), n3.preventDefault(), t2.iconClick(n3, e4);
            }, c2 = function(n3) {
              e4 && e4.emit("transitionend"), t2.core.emit("osjs/window:transitionend", n3, e4);
            };
            e4.$element.addEventListener("touchstart", n2, gn), e4.$element.addEventListener("mousedown", r2), e4.$element.addEventListener("click", o2), e4.$element.addEventListener("dblclick", i2), e4.$element.addEventListener("transitionend", c2), e4.$icon && (e4.$icon.addEventListener("dblclick", a2), e4.$icon.addEventListener("click", s2)), e4.on("resized,rendered", function() {
              e4.setState("media", W(e4));
            }), e4.on("destroy", function() {
              e4.$element && (e4.$element.removeEventListener("touchstart", n2, gn), e4.$element.removeEventListener("mousedown", r2), e4.$element.removeEventListener("click", o2), e4.$element.removeEventListener("dblclick", i2), e4.$element.removeEventListener("transitionend", c2)), e4.$icon && (e4.$icon.removeEventListener("dblclick", a2), e4.$icon.removeEventListener("click", s2));
            });
            var u2 = function(e5, t3, n3) {
              var r3 = 10 + t3.left, o3 = 10 + t3.top, i3 = r3 + e5.wid % 20 * 10, a3 = function(e6, r4) {
                return "number" == typeof n3[e6] && Number.isInteger(n3[e6]) ? Math.max(t3[e6], n3[e6]) : r4;
              };
              return { top: a3("top", o3 + e5.wid % 20 * 10), left: a3("left", i3) };
            }(e4, { top: 0, left: 0 }, e4.state.position), l2 = u2.top, f2 = u2.left;
            e4.state.position.top = l2, e4.state.position.left = f2, e4.state.media = W(e4);
          } }, { key: "click", value: function(e4, t2) {
            if (!this.lastAction && e4.target.classList.contains("osjs-window-button")) {
              var n2 = e4.target.getAttribute("data-action");
              On[n2](t2);
            }
          } }, { key: "dblclick", value: function(e4, t2) {
            this.lastAction || e4.target.classList.contains("osjs-window-header") && (t2.state.maximized ? t2.restore() : t2.state.minimized ? t2.raise() : t2.maximize());
          } }, { key: "mousedown", value: function(e4, t2) {
            var n2, r2 = this, o2 = false, i2 = t2.attributes, a2 = i2.moveable, s2 = i2.resizable, c2 = t2.state.maximized, u2 = this.core.config("windows"), l2 = u2.lofi, f2 = u2.moveKeybinding, d2 = vt(e4), p2 = d2.clientX, h3 = d2.clientY, L2 = d2.touch, _2 = d2.target, v2 = _t(f2, e4) ? t2.$element.contains(_2) : _2.classList.contains("osjs-window-header"), m2 = this.core.has("osjs/desktop") ? this.core.make("osjs/desktop").getRect() : { top: 0, left: 0 }, y2 = _2.classList.contains("osjs-window-resize") ? K(t2, _2) : null, E2 = v2 ? function(e5, t3) {
              var n3 = e5.state.position;
              return function(e6, r3) {
                return { top: Math.max(n3.top + r3, t3.top), left: n3.left + e6 };
              };
            }(t2, { top: 0, left: 0 }) : null, g2 = function(e5) {
              if (En || e5.preventDefault(), !(c2 || !a2 && E2 || !s2 && y2)) {
                var i3 = vt(e5), u3 = y2 ? Math.max(m2.left, i3.clientX) : i3.clientX, f3 = y2 ? Math.max(m2.top, i3.clientY) : i3.clientY, d3 = u3 - p2, L3 = f3 - h3;
                if (y2) {
                  var _3 = y2(d3, L3), v3 = _3.width, g3 = _3.height, O3 = _3.top, A2 = _3.left;
                  n2 = function() {
                    t2._setState("dimension", { width: v3, height: g3 }, false), t2._setState("position", { top: O3, left: A2 }, false);
                  }, l2 ? (r2.$lofi.style.top = "".concat(O3, "px"), r2.$lofi.style.left = "".concat(A2, "px"), r2.$lofi.style.width = "".concat(v3, "px"), r2.$lofi.style.height = "".concat(g3, "px")) : n2(), r2.lastAction = "resize";
                } else if (E2) {
                  var B2 = E2(d3, L3);
                  n2 = function() {
                    t2._setState("position", B2, false);
                  }, l2 ? (r2.$lofi.style.top = "".concat(B2.top, "px"), r2.$lofi.style.left = "".concat(B2.left, "px")) : n2(), r2.lastAction = "move";
                }
                r2.lastAction && (t2._setState("move" === r2.lastAction ? "moving" : "resizing", true), o2 || (r2.core.$root.setAttribute("data-window-action", String(true)), o2 = true));
              }
            }, O2 = function e5() {
              L2 ? (document.removeEventListener("touchmove", g2, gn), document.removeEventListener("touchend", e5, gn)) : (document.removeEventListener("mousemove", g2), document.removeEventListener("mouseup", e5)), l2 && (r2.$lofi.remove(), n2 && n2(), n2 = void 0), "move" === r2.lastAction ? (t2.emit("moved", yn({}, t2.state.position), t2), t2._setState("moving", false)) : "resize" === r2.lastAction && (t2.emit("resized", yn({}, t2.state.dimension), t2), t2._setState("resizing", false)), r2.core.$root.setAttribute("data-window-action", String(false));
            };
            t2.focus() || t2.setNextZindex(), (E2 || y2) && (L2 ? (document.addEventListener("touchmove", g2, gn), document.addEventListener("touchend", O2, gn)) : (document.addEventListener("mousemove", g2), document.addEventListener("mouseup", O2))), this.lastAction = null, this.core.has("osjs/contextmenu") && this.core.make("osjs/contextmenu").hide(), l2 && (this.$lofi.style.zIndex = t2.state.zIndex + 1, this.$lofi.style.top = "".concat(t2.state.position.top, "px"), this.$lofi.style.left = "".concat(t2.state.position.left, "px"), this.$lofi.style.width = "".concat(t2.state.dimension.width, "px"), this.$lofi.style.height = "".concat(t2.state.dimension.height, "px"), this.$lofi.parentNode || document.body.appendChild(this.$lofi));
          } }, { key: "iconDblclick", value: function(e4, t2) {
            t2.close();
          } }, { key: "iconClick", value: function(e4, t2) {
            var n2 = t2.state, r2 = n2.minimized, o2 = n2.maximized, i2 = t2.attributes, a2 = i2.minimizable, s2 = i2.maximizable, c2 = i2.closeable, u2 = this.core.make("osjs/locale").translate;
            this.core.make("osjs/contextmenu", { position: e4, menu: [{ label: u2(r2 ? "LBL_RAISE" : "LBL_MINIMIZE"), disabled: !a2, onclick: function() {
              return r2 ? t2.raise() : t2.minimize();
            } }, { label: u2(o2 ? "LBL_RESTORE" : "LBL_MAXIMIZE"), disabled: !s2, onclick: function() {
              return o2 ? t2.restore() : t2.maximize();
            } }, { label: u2("LBL_CLOSE"), disabled: !c2, onclick: function() {
              return t2.close();
            } }] });
          } }]), e3;
        }(), Bn = n(15), bn = n.n(Bn);
        function Sn(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function Tn(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Sn(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Sn(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var Pn = function(e3, t2, n2) {
          return t2.map(function(t3) {
            return mt("div", { class: "osjs-login-field osjs-login-field-" + t3.tagName }, mt(t3.tagName, function(e4, t4, n3) {
              return n3 = n3 ? "disabled" : void 0, "input" === t4.tagName && "submit" !== t4.attributes.type ? Tn({ autocapitalize: "off", autocomplete: "new-" + t4.attributes.name, disabled: n3, oncreate: function(n4) {
                return n4.value = e4[t4.attributes.name] || t4.value || "";
              } }, t4.attributes) : Tn({ disabled: n3 }, t4.attributes);
            }(e3, t3, n2), function(e4) {
              return "select" === e4.tagName && e4.choices ? e4.choices.map(function(e5) {
                return mt("option", { current: e5.current ? "current" : void 0, value: e5.value }, e5.label);
              }) : e4.children || [];
            }(t3)));
          });
        }, wn = function(e3) {
          var t2 = e3.logo, n2 = t2.src, r2 = t2.position, o2 = function() {
            return mt("div", { class: "osjs-login-logo", "data-position": r2, style: { backgroundImage: "url('".concat(n2, "')") } });
          };
          return function(t3, i2) {
            var a2 = [];
            (e3.title && a2.push(mt("div", { class: "osjs-login-header" }, mt("span", {}, e3.title))), n2 && -1 !== ["top", "middle"].indexOf(r2)) && a2["top" === r2 ? "unshift" : "push"](o2());
            var s2 = function(e4) {
              return r2 === e4 ? mt("div", { "data-position": r2 }, o2()) : null;
            }, c2 = function(t4) {
              var i3 = Pn(t4, e3.fields, t4.loading);
              return n2 && "bottom" === r2 && i3.push(o2()), e3.stamp && i3.push(mt("div", { class: "osjs-login-stamp" }, e3.stamp)), i3;
            }(t3), u2 = [].concat(a2, [mt("div", { class: "osjs-login-error", style: { display: t3.error ? "block" : "none" } }, mt("span", {}, t3.error)), mt("form", { loading: false, method: "post", action: "#", autocomplete: "off", onsubmit: i2.submit }, c2)]);
            return mt("div", { class: "osjs-login", id: e3.id, style: { display: t3.hidden ? "none" : void 0 } }, [s2("left"), mt("div", { class: "osjs-login-content" }, u2), s2("right")].filter(function(e4) {
              return !!e4;
            }));
          };
        }, Rn = function(e3, t2, n2, r2) {
          var o2 = new T.EventEmitter("LoginUI"), i2 = wn(e3), a2 = yt(Tn({ hidden: n2 }, t2), { setLoading: function(e4) {
            return { loading: e4 };
          }, setError: function(e4) {
            return { error: e4, hidden: false };
          }, submit: function(e4) {
            return function(t3) {
              if (e4.preventDefault(), !t3.loading) {
                var n3 = Array.from(e4.target.elements).filter(function(e5) {
                  return "submit" !== e5.type;
                }).reduce(function(e5, t4) {
                  return Tn(Tn({}, e5), {}, l()({}, t4.name, t4.value));
                }, {});
                o2.emit("login:post", n3);
              }
            };
          } }, i2, r2);
          return o2.on("login:start", function() {
            return a2.setLoading(true);
          }), o2.on("login:stop", function() {
            return a2.setLoading(false);
          }), o2.on("login:error", function(e4) {
            return a2.setError(e4);
          }), o2;
        };
        function Nn(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function jn(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var Cn = function(e3) {
          E()(n2, e3);
          var t2 = jn(n2);
          function n2(e4, r2) {
            var o2;
            return d()(this, n2), (o2 = t2.call(this, "Login")).$container = null, o2.core = e4, o2.options = function(e5) {
              for (var t3 = 1; t3 < arguments.length; t3++) {
                var n3 = null != arguments[t3] ? arguments[t3] : {};
                t3 % 2 ? Nn(Object(n3), true).forEach(function(t4) {
                  l()(e5, t4, n3[t4]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e5, Object.getOwnPropertyDescriptors(n3)) : Nn(Object(n3)).forEach(function(t4) {
                  Object.defineProperty(e5, t4, Object.getOwnPropertyDescriptor(n3, t4));
                });
              }
              return e5;
            }({ id: "osjs-login", title: "Welcome to OS.js", stamp: e4.config("version"), logo: { position: "top", src: null }, fields: [{ tagName: "input", attributes: { name: "username", type: "text", placeholder: "Username" } }, { tagName: "input", attributes: { name: "password", type: "password", placeholder: "Password" } }, { tagName: "input", attributes: { type: "submit", value: "Login" } }] }, r2), o2;
          }
          return h2()(n2, [{ key: "init", value: function(e4) {
            this.$container = document.createElement("div"), this.$container.id = this.options.id, this.$container.className = "osjs-login-base", this.core.$root.classList.add("login"), this.core.$root.appendChild(this.$container), this.render(e4);
          } }, { key: "destroy", value: function() {
            this.core.$root.classList.remove("login"), this.$container && (this.$container.remove(), this.$container = null), m()(B()(n2.prototype), "destroy", this).call(this);
          } }, { key: "render", value: function(e4) {
            var t3 = this, n3 = this.core.config("auth.login", {}), r2 = Rn(this.options, n3, e4, this.$container);
            r2.on("register:post", function(e5) {
              return t3.emit("register:post", e5);
            }), r2.on("login:post", function(e5) {
              return t3.emit("login:post", e5);
            }), this.on("login:start", function() {
              return r2.emit("login:start");
            }), this.on("login:stop", function() {
              return r2.emit("login:stop");
            }), this.on("login:error", function(e5, t4) {
              return r2.emit("login:error", e5, t4);
            });
          } }]), n2;
        }(T.EventEmitter), kn = function(e3, t2) {
          return { login: function(e4) {
            return Promise.resolve(e4);
          } };
        };
        function In(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        var Dn = { server: function(e3, t2) {
          var n2 = function(t3) {
            var n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return e3.request(t3, { method: "POST", body: JSON.stringify(n3) }, "json");
          };
          return { register: function(e4) {
            return n2("/register", e4);
          }, login: function(e4) {
            return n2("/login", e4);
          }, logout: function() {
            return n2("/logout");
          } };
        }, localStorage: kn }, Mn = function(e3, t2) {
          var n2 = e3.config("auth.ui", {});
          return t2.login ? t2.login(e3, t2.config || {}) : new Cn(e3, t2.ui || n2);
        }, xn = function(e3, t2) {
          return function(e4) {
            for (var t3 = 1; t3 < arguments.length; t3++) {
              var n2 = null != arguments[t3] ? arguments[t3] : {};
              t3 % 2 ? In(Object(n2), true).forEach(function(t4) {
                l()(e4, t4, n2[t4]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(n2)) : In(Object(n2)).forEach(function(t4) {
                Object.defineProperty(e4, t4, Object.getOwnPropertyDescriptor(n2, t4));
              });
            }
            return e4;
          }({ login: function() {
            return Promise.reject(new Error("Not implemented"));
          }, logout: function() {
            return Promise.reject(new Error("Not implemented"));
          }, register: function() {
            return Promise.reject(new Error("Not implemented"));
          }, init: function() {
            return Promise.resolve(true);
          }, destroy: function() {
          } }, (e3.config("standalone") ? kn : "function" == typeof t2.adapter ? t2.adapter : Dn[t2.adapter || "server"])(e3, t2.config || {}));
        }, Fn = function() {
          function e3(t2) {
            var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            d()(this, e3), this.ui = Mn(t2, n2), this.adapter = xn(t2, n2), this.callback = function() {
            }, this.core = t2;
          }
          return h2()(e3, [{ key: "init", value: function() {
            var e4 = this;
            return this.ui.on("login:post", function(t2) {
              return e4.login(t2);
            }), this.ui.on("register:post", function(t2) {
              return e4.register(t2);
            }), this.adapter.init();
          } }, { key: "destroy", value: function() {
            this.ui.destroy();
          } }, { key: "shutdown", value: function(e4) {
            try {
              this.core.destroy();
            } catch (e5) {
              D.warn("Exception on destruction", e5);
            }
            this.core.emit("osjs/core:logged-out"), e4 && setTimeout(function() {
              window.location.reload();
            }, 1);
          } }, { key: "show", value: function(e4) {
            var t2 = this.core.config("auth.login", {}), n2 = t2.username && t2.password, r2 = this.core.config("auth.cookie");
            if (this.callback = e4, this.ui.init(n2), n2) return this.login(t2);
            if (r2.enabled) {
              var o2 = bn.a.get(r2.name);
              if (console.warn(o2), o2) return this.login(JSON.parse(o2));
            }
            return Promise.resolve(true);
          } }, { key: "login", value: function(e4) {
            var t2 = this;
            return this.ui.emit("login:start"), this.adapter.login(e4).then(function(n2) {
              if (n2) {
                var r2 = t2.core.config("auth.cookie");
                return r2.enabled ? bn.a.set(r2.name, JSON.stringify(e4), { expires: r2.expires, sameSite: "strict" }) : bn.a.remove(r2.name), t2.ui.destroy(), t2.callback(n2), t2.core.emit("osjs/core:logged-in"), t2.ui.emit("login:stop", n2), true;
              }
              return false;
            }).catch(function(e5) {
              return t2.core.config("development") && D.warn("Exception on login", e5), t2.ui.emit("login:error", "Login failed", e5), t2.ui.emit("login:stop"), false;
            });
          } }, { key: "logout", value: function() {
            var e4 = this, t2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return this.adapter.logout(t2).then(function(n2) {
              if (!n2) return false;
              var r2 = e4.core.config("auth.cookie");
              return bn.a.remove(r2.name), e4.shutdown(t2), true;
            });
          } }, { key: "register", value: function(e4) {
            var t2 = this;
            return this.ui.emit("register:start"), this.adapter.register(e4).then(function(e5) {
              return !!e5 && (t2.ui.emit("register:stop", e5), e5);
            }).catch(function(e5) {
              return t2.core.config("development") && D.warn("Exception on registration", e5), t2.ui.emit("register:error", "Registration failed"), t2.ui.emit("register:stop"), false;
            });
          } }]), e3;
        }(), Un = n(24), Hn = n.n(Un), Gn = function() {
          function e3(t2) {
            d()(this, e3), this.core = t2;
          }
          return h2()(e3, [{ key: "destroy", value: function() {
          } }, { key: "save", value: function() {
            var e4 = Ne.getApplications().filter(function(e5) {
              return false !== e5.options.sessionable;
            }).map(function(e5) {
              return e5.getSession();
            });
            return this.core.make("osjs/settings").set("osjs/session", null, e4).save();
          } }, { key: "load", value: function() {
            var e4 = this, t2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            t2 && Ne.destroyAll();
            var n2 = this.core.make("osjs/settings").get("osjs/session");
            return !n2 || n2 instanceof Array || (n2 = Object.values(n2)), n2 && (console.group("Session::load()"), n2.forEach(function(t3) {
              try {
                e4.core.run(t3.name, t3.args, { restore: { windows: t3.windows } });
              } catch (e5) {
                D.warn("Error while loading session entry", e5);
              }
            }), console.groupEnd()), Promise.resolve(true);
          } }]), e3;
        }();
        function Kn(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function Wn(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Kn(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Kn(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var Vn = function() {
          function e3(t2) {
            d()(this, e3), this.loaded = [], this.$root = t2;
          }
          return h2()(e3, [{ key: "destroy", value: function() {
            this.loaded = [];
          } }, { key: "load", value: function(e4) {
            var t2 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r2 = function(e5) {
              return !n2 && t2.loaded.find(function(t3) {
                return t3 === e5;
              });
            }, o2 = e4.filter(function(e5) {
              return !r2(e5);
            }).map(function(e5) {
              return D.debug("Packages::preload()", e5), (e5.match(/\.js$/) ? le(t2.$root, e5) : ue(t2.$root, e5)).then(function(t3) {
                return { success: true, entry: e5, el: t3 };
              }).catch(function(t3) {
                return { success: false, entry: e5, error: t3 };
              });
            });
            return Promise.all(o2).then(function(e5) {
              return t2._load(e5, r2);
            });
          } }, { key: "_load", value: function(e4, t2) {
            var n2 = this, r2 = e4.filter(function(e5) {
              return e5.success;
            });
            r2.forEach(function(e5) {
              t2(e5) || n2.loaded.push(e5);
            });
            var o2 = e4.filter(function(e5) {
              return !e5.success;
            });
            return o2.forEach(function(e5) {
              return D.warn("Failed loading", e5.entry, e5.error);
            }), { errors: o2.map(function(e5) {
              return e5.entry;
            }), elements: r2.reduce(function(e5, t3) {
              return Wn(Wn({}, e5), {}, l()({}, t3.entry, t3.el));
            }, {}) };
          } }]), e3;
        }();
        function $n(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function zn(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? $n(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : $n(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var Yn = function(e3) {
          var t2 = e3.getUser(), n2 = e3.config("packages.permissions", {}), r2 = [function(e4) {
            var n3 = false === e4.strictGroups ? "some" : "every";
            return !(e4.groups instanceof Array) || e4.groups[n3](function(e5) {
              return -1 !== t2.groups.indexOf(e5);
            });
          }, function(e4) {
            var r3 = n2[e4.name];
            if (r3 && r3.groups instanceof Array) {
              var o2 = false === r3.strictGroups ? "some" : "every";
              return r3.groups[o2](function(e5) {
                return -1 !== t2.groups.indexOf(e5);
              });
            }
            return true;
          }, function(e4) {
            return !(t2.blacklist instanceof Array) || -1 === t2.blacklist.indexOf(e4.name);
          }];
          return function(e4) {
            return r2.every(function(t3) {
              return t3(e4);
            });
          };
        };
        function Zn(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function qn(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Zn(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Zn(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var Xn = function() {
          function e3(t2) {
            d()(this, e3), this.core = t2, this.packages = [], this.metadata = [], this._running = [], this.preloader = new Vn(t2.$resourceRoot), this.inited = false;
          }
          return h2()(e3, [{ key: "destroy", value: function() {
            this.packages = [], this.metadata = [], this.preloader.destroy();
          } }, { key: "init", value: function() {
            var e4 = this;
            D.debug("Packages::init()"), this.inited || this.core.on("osjs/core:started", function() {
              return e4._autostart();
            }), this.metadata = this.core.config("packages.metadata", []).map(function(e5) {
              return qn({ type: "application" }, e5);
            }), this.inited = true;
            var t2 = this.core.config("packages.manifest");
            return t2 ? this.core.request(t2, {}, "json", true).then(function(t3) {
              return e4.addPackages(t3);
            }).then(function(t3) {
              return e4._preloadBackgroundFiles(t3);
            }).then(function() {
              return true;
            }).catch(function(e5) {
              return D.error(e5);
            }) : Promise.resolve(true);
          } }, { key: "launch", value: function(e4) {
            var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            D.debug("Packages::launch()", e4, t2, n2);
            var r2 = this.core.make("osjs/locale").translate, o2 = this.metadata.find(function(t3) {
              return t3.name === e4;
            });
            if (!o2) throw new Error(r2("ERR_PACKAGE_NOT_FOUND", e4));
            return -1 !== ["theme", "icons", "sounds"].indexOf(o2.type) ? this._launchTheme(e4, o2) : this._launchApplication(e4, o2, t2, n2);
          } }, { key: "_launchApplication", value: function(e4, t2, n2, r2) {
            var o2 = this, i2 = false;
            if (t2.singleton) {
              var a2 = Ne.getApplications().find(function(e5) {
                return e5.metadata.name === t2.name;
              });
              if (a2) return a2.emit("attention", n2, r2), i2 = true, Promise.resolve(a2);
              if (this._running.filter(function(t3) {
                return t3 === e4;
              }).length > 0) return new Promise(function(t3, a3) {
                o2.core.once("osjs/application:".concat(e4, ":launched"), function(e5) {
                  i2 || e5.emit("attention", n2, r2), t3(e5);
                });
              });
            }
            return this.core.emit("osjs/application:launch", e4, n2, r2), this._running.push(e4), this._launch(e4, t2, n2, r2);
          } }, { key: "_launchTheme", value: function(e4, t2) {
            var n2 = this, r2 = this._getPreloads(t2, "preload", "theme");
            return this.preloader.load(r2).then(function(t3) {
              return qn(qn({ elements: {} }, t3), n2.packages.find(function(t4) {
                return t4.metadata.name === e4;
              }) || {});
            });
          } }, { key: "_getPreloads", value: function(e4, t2, n2) {
            var r2, o2, i2 = this;
            return function(e5) {
              return (e5 || []).map(function(e6) {
                return e6.filename;
              });
            }((r2 = e4.files, o2 = t2, (r2 || []).filter(function(e5) {
              return e5.type === o2;
            }))).map(function(t3) {
              return i2.core.url(t3, {}, qn({ type: n2 }, e4));
            });
          } }, { key: "_launch", value: function(e4, t2, n2, r2) {
            var o2 = this, i2 = this.core.make("osjs/locale").translate, a2 = Yn(this.core), s2 = function(t3) {
              o2.core.has("osjs/dialog") ? o2.core.make("osjs/dialog", "alert", { type: "error", title: i2("ERR_PACKAGE_EXCEPTION", e4), message: i2("ERR_PACKAGE_EXCEPTION", e4), error: t3 }, function() {
              }) : alert("".concat(i2("ERR_PACKAGE_EXCEPTION", e4), ": ").concat(t3.stack || t3));
            }, c2 = function(t3) {
              throw o2.core.emit("osjs/application:launched", e4, false), o2.core.emit("osjs/application:".concat(e4, ":launched"), false), s2(t3), new Error(t3);
            }, u2 = this._getPreloads(t2, "preload", "apps");
            return a2(t2) || c2(i2("ERR_PACKAGE_PERMISSION_DENIED", e4)), this.preloader.load(u2, true === r2.forcePreload).then(function(t3) {
              var a3 = t3.errors;
              a3.length && c2(i2("ERR_PACKAGE_LOAD", e4, a3.join(", ")));
              var u3 = o2.packages.find(function(t4) {
                return t4.metadata.name === e4;
              });
              return u3 || c2(i2("ERR_PACKAGE_NO_RUNTIME", e4)), function(t4) {
                var i3;
                try {
                  console.group("Packages::_launch()"), (i3 = t4.callback(o2.core, n2, r2, t4.metadata)) instanceof Ne ? i3.on("destroy", function() {
                    var t5 = o2._running.findIndex(function(t6) {
                      return t6 === e4;
                    });
                    -1 !== t5 && o2._running.splice(t5, 1);
                  }) : D.warn("The application", e4, "did not return an Application instance from registration");
                } catch (t5) {
                  s2(t5), D.warn("Exception when launching", e4, t5);
                } finally {
                  o2.core.emit("osjs/application:launched", e4, i3), o2.core.emit("osjs/application:".concat(e4, ":launched"), i3), console.groupEnd();
                }
                return i3;
              }(u3);
            });
          } }, { key: "_autostart", value: function() {
            var e4 = this, t2 = this.metadata.filter(function(e5) {
              return true === e5.autostart;
            }), n2 = this.core.config("application.autostart", []).map(function(e5) {
              return "string" == typeof e5 ? { name: e5 } : e5;
            });
            [].concat(c()(t2), c()(n2)).forEach(function(t3) {
              var n3 = t3.name, r2 = t3.args;
              return e4.launch(n3, r2 || {});
            });
          } }, { key: "register", value: function(e4, t2) {
            D.debug("Packages::register()", e4);
            var n2 = this.core.make("osjs/locale").translate, r2 = this.metadata.find(function(t3) {
              return t3.name === e4;
            });
            if (!r2) throw new Error(n2("ERR_PACKAGE_NO_METADATA", e4));
            var o2 = this.packages.findIndex(function(t3) {
              return t3.metadata.name === e4;
            });
            -1 !== o2 && this.packages.splice(o2, 1), this.packages.push({ metadata: r2, callback: t2 });
          } }, { key: "addPackages", value: function(e4) {
            if (e4 instanceof Array) {
              var t2 = this.core.config("packages.overrideMetadata", {}), n2 = function(e5) {
                return e5.map(function(e6) {
                  return zn(zn({ type: "application" }, e6), {}, { files: (e6.files || []).map(function(e7) {
                    return "string" == typeof e7 ? { filename: e7, type: "preload" } : zn({ type: "preload" }, e7);
                  }) });
                });
              }(e4).map(function(e5) {
                return t2[e5.name] ? qn(qn({}, e5), t2[e5.name]) : e5;
              });
              this.metadata = [].concat(c()(this.metadata), c()(n2));
            }
            return this.getPackages();
          } }, { key: "getPackages", value: function(e4) {
            e4 = e4 || function() {
              return true;
            };
            var t2 = this.metadata.map(function(e5) {
              return qn({}, e5);
            }), n2 = this.core.config("packages.hidden", []), r2 = Yn(this.core);
            return t2.filter(r2).filter(function(e5) {
              return !(n2 instanceof Array) || -1 === n2.indexOf(e5.name);
            }).filter(e4);
          } }, { key: "getCompatiblePackages", value: function(e4) {
            return this.getPackages(function(t2) {
              return !(!t2.mimes || t2.hidden) && !!t2.mimes.find(function(t3) {
                try {
                  return new RegExp(t3).test(e4);
                } catch (e5) {
                  D.warn("Compability check failed", e5);
                }
                return t3 === e4;
              });
            });
          } }, { key: "_preloadBackgroundFiles", value: function(e4) {
            var t2 = this, n2 = e4.reduce(function(e5, n3) {
              return [].concat(c()(e5), c()(t2._getPreloads(n3, "background", "apps")));
            }, []);
            return this.preloader.load(n2).then(function(e5) {
              var t3 = e5.errors;
              (void 0 === t3 ? [] : t3).forEach(function(e6) {
                return D.error(e6);
              });
            });
          } }, { key: "running", value: function() {
            return this._running;
          } }, { key: "getMetadataFromName", value: function(e4) {
            var t2 = this.metadata.find(function(t3) {
              return t3.name === e4;
            });
            return t2 ? qn({}, t2) : null;
          } }]), e3;
        }();
        function Qn(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        var Jn = function() {
          function e3(t2) {
            d()(this, e3), this.core = t2, this.entries = [];
          }
          return h2()(e3, [{ key: "destroy", value: function() {
            this.entries = [];
          } }, { key: "create", value: function(e4, t2) {
            var n2 = this, r2 = this.core.make("osjs/locale").translate("LBL_TRAY"), o2 = function(e5) {
              for (var t3 = 1; t3 < arguments.length; t3++) {
                var n3 = null != arguments[t3] ? arguments[t3] : {};
                t3 % 2 ? Qn(Object(n3), true).forEach(function(t4) {
                  l()(e5, t4, n3[t4]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e5, Object.getOwnPropertyDescriptors(n3)) : Qn(Object(n3)).forEach(function(t4) {
                  Object.defineProperty(e5, t4, Object.getOwnPropertyDescriptor(n3, t4));
                });
              }
              return e5;
            }({ key: null, icon: w, title: r2, onclick: t2 = t2 || function() {
            }, oncontextmenu: t2, handler: t2 }, e4);
            return D.debug("Created new tray entry", o2), this.entries.push(o2), this.core.emit("osjs/tray:create", o2), this.core.emit("osjs/tray:update", this.entries), { entry: o2, update: function(e5) {
              Object.keys(e5).forEach(function(t3) {
                return o2[t3] = e5[t3];
              }), n2.core.emit("osjs/tray:update", n2.entries);
            }, destroy: function() {
              return n2.remove(o2);
            } };
          } }, { key: "remove", value: function(e4) {
            var t2 = this.entries.findIndex(function(t3) {
              return t3 === e4;
            });
            -1 !== t2 && (this.entries.splice(t2, 1), this.core.emit("osjs/tray:remove", e4), this.core.emit("osjs/tray:update", this.entries));
          } }, { key: "list", value: function() {
            return this.entries;
          } }, { key: "has", value: function(e4) {
            return -1 !== this.entries.findIndex(function(t2) {
              return t2.key === e4;
            });
          } }]), e3;
        }(), er = function() {
          function e3() {
            d()(this, e3), this.clipboard = void 0, this.clear();
          }
          return h2()(e3, [{ key: "destroy", value: function() {
            this.clear();
          } }, { key: "clear", value: function() {
            this.clipboard = { data: void 0, type: void 0 };
          } }, { key: "set", value: function(e4, t2) {
            this.clipboard = { data: e4, type: t2 };
          } }, { key: "has", value: function(e4) {
            return e4 instanceof RegExp ? "string" == typeof this.clipboard.type && !!this.clipboard.type.match(e4) : this.clipboard.type === e4;
          } }, { key: "get", value: function() {
            var e4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t2 = this.clipboard.data, n2 = "function" == typeof t2 ? t2() : t2;
            return e4 && this.clear(), Promise.resolve(n2);
          } }]), e3;
        }(), tr = function() {
          function e3() {
            d()(this, e3), this.middleware = {};
          }
          return h2()(e3, [{ key: "destroy", value: function() {
            this.clear();
          } }, { key: "clear", value: function() {
            this.middleware = {};
          } }, { key: "add", value: function(e4, t2) {
            this.middleware[e4] || (this.middleware[e4] = []), this.middleware[e4].push(t2);
          } }, { key: "remove", value: function(e4, t2) {
            this.middleware[e4] && (this.middleware[e4] = this.middleware[e4].filter(function(e5) {
              return e5 !== t2;
            }));
          } }, { key: "get", value: function(e4) {
            return this.middleware[e4] || [];
          } }]), e3;
        }(), nr = { ERR_REQUEST_STANDALONE: "Cannot make requests in standalone mode.", ERR_REQUEST_NOT_OK: "An error occured while performing a request: {0}", ERR_VFS_MOUNT_NOT_FOUND: "Filesystem '{0}' not found", ERR_VFS_MOUNT_NOT_FOUND_FOR: "Filesystem not found for '{0}'", ERR_VFS_MOUNT_NOT_MOUNTED: "Filesystem '{0}' not mounted", ERR_VFS_MOUNT_ALREADY_MOUNTED: "Filesystem '{0}' already mounted", ERR_VFS_PATH_FORMAT_INVALID: "Given path '{0}' does not match 'name:/path'", ERR_PACKAGE_PERMISSION_DENIED: "You are not permitted to run '{0}'", ERR_PACKAGE_NOT_FOUND: "Package Metadata '{0}' not found", ERR_PACKAGE_LOAD: "Package Loading '{0}' failed: {1}", ERR_PACKAGE_NO_RUNTIME: "Package Runtime '{0}' not found", ERR_PACKAGE_NO_METADATA: "Metadata not found for '{0}'. Is it in the manifest?", ERR_PACKAGE_EXCEPTION: "An exception occured in '{0}'", ERR_WINDOW_ID_EXISTS: "Window with ID '{0}' already exists", ERR_INVALID_LOCALE: "Invalid locale '{0}'", LBL_CONNECTION_LOST: "Connection Lost", LBL_CONNECTION_LOST_MESSAGE: "The connection to the OS.js was lost. Reconnecting....", LBL_CONNECTION_RESTORED: "Connection Restored", LBL_CONNECTION_RESTORED_MESSAGE: "The connection to the OS.js server was restored.", LBL_CONNECTION_FAILED: "Connection Failed", LBL_CONNECTION_FAILED_MESSAGE: "The connection to the OS.js could not be established. Some features might not work properly.", LBL_APP_CAT_DEVELOPMENT: "Development", LBL_APP_CAT_SCIENCE: "Science", LBL_APP_CAT_GAMES: "Games", LBL_APP_CAT_GRAPHICS: "Graphics", LBL_APP_CAT_NETWORK: "Network", LBL_APP_CAT_MULTIMEDIA: "Multimedia", LBL_APP_CAT_OFFICE: "Office", LBL_APP_CAT_SYSTEM: "System", LBL_APP_CAT_UTILITIES: "Utilities", LBL_APP_CAT_OTHER: "Other", LBL_LAUNCH_SELECT: "Select application", LBL_LAUNCH_SELECT_MESSAGE: "Select application for '{0}'", LBL_DESKTOP_SELECT_WALLPAPER: "Select wallpaper", LBL_DESKTOP_SELECT_THEME: "Select theme", LBL_SEARCH_TOOLTOP: "Search Filesystem ({0})", LBL_SEARCH_PLACEHOLDER: "Search filesystems...", LBL_SEARCH_WAIT: "Searching...", LBL_SEARCH_RESULT: "Showing {0} results", LBL_DESKTOP_SET_AS_WALLPAPER: "Set as wallpaper", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "KiB", LBL_FS_MIB: "MiB", LBL_FS_GIB: "GiB", LBL_TOP: "Top", LBL_LEFT: "Left", LBL_RIGHT: "Right", LBL_BOTTOM: "Bottom", LBL_MENU: "Menu", LBL_ERROR: "Error", LBL_INFO: "Info", LBL_MESSAGE: "Message", LBL_WARNINIG: "Warning", LBL_SUCCESS: "Success", LBL_FAILURE: "Failure", LBL_WINDOW: "Window", LBL_WINDOWS: "Windows", LBL_NOTIFICATION: "Notification", LBL_NOTIFICATIONS: "Notifications", LBL_TRAY: "Tray Entry", LBL_NAME: "Name", LBL_TYPE: "Type", LBL_SIZE: "Size", LBL_FILE: "File", LBL_NEW: "New", LBL_OPEN: "Open", LBL_OPEN_WITH: "Open with...", LBL_SAVE: "Save", LBL_SAVEAS: "Save As", LBL_OK: "OK", LBL_ABORT: "Abort", LBL_CANCEL: "Cancel", LBL_CLOSE: "Close", LBL_QUIT: "Quit", LBL_YES: "Yes", LBL_NO: "No", LBL_GO: "Go", LBL_MKDIR: "Create new directory", LBL_MKFILE: "Create new file", LBL_COPY: "Copy", LBL_PASTE: "Paste", LBL_CUT: "Cut", LBL_MOVE: "Move", LBL_RENAME: "Rename", LBL_DELETE: "Delete", LBL_DOWNLOAD: "Download", LBL_REFRESH: "Refresh", LBL_RELOAD: "Reload", LBL_HOME: "Home", LBL_VIEW: "View", LBL_HELP: "Help", LBL_ABOUT: "About", LBL_APPLICATION: "Application", LBL_APPLICATIONS: "Applications", LBL_KILL: "Kill", LBL_KILL_ALL: "Kill all", LBL_MINIMIZE: "Minimize", LBL_MAXIMIZE: "Maximize", LBL_RESTORE: "Restore", LBL_RAISE: "Raise", LBL_SHADE: "Shade", LBL_UNSHADE: "Unshade", LBL_ONTOP: "On top", LBL_RESIZE: "Resize", LBL_BACK: "Back", LBL_FORWARD: "Forward", LBL_UPLOAD: "Upload", LBL_IMAGE: "Image", LBL_CREATE_SHORTCUT: "Create shortcut", LBL_REMOVE_SHORTCUT: "Remove shortcut", LBL_EDIT: "Edit" }, rr = { ERR_REQUEST_STANDALONE: "Impossible d'effectuer des requ\xEAtes en mode autonome.", ERR_REQUEST_NOT_OK: "Une erreur s'est produite en ex\xE9cutant une requ\xEAte : {0}", ERR_VFS_MOUNT_NOT_FOUND: "Syst\xE8me de fichier '{0}' absent", ERR_VFS_MOUNT_NOT_FOUND_FOR: "Syst\xE8me de fichier pour '{0}' absent", ERR_VFS_MOUNT_NOT_MOUNTED: "Le syst\xE8me de fichier '{0}' n'est pas encore mont\xE9", ERR_VFS_MOUNT_ALREADY_MOUNTED: "Le syst\xE8me de fichier '{0}' est d\xE9j\xE0 mont\xE9", ERR_VFS_PATH_FORMAT_INVALID: "Le dossier '{0}' ne correspond pas 'name:/path'", ERR_PACKAGE_NOT_FOUND: "Les m\xE9tadonn\xE9es du paquet '{0}' n'ont pas \xE9t\xE9 touv\xE9es", ERR_PACKAGE_LOAD: "Le chargement du paquet '{0}' a \xE9chou\xE9: {1}", ERR_PACKAGE_NO_RUNTIME: "Dur\xE9e d'ex\xE9cution du paquet '{0}' absente", ERR_PACKAGE_NO_METADATA: "M\xE9tadonn\xE9es absentes pour '{0}'. Sont-elles dans le manifeste ?", ERR_PACKAGE_EXCEPTION: "Une exception s'est produite dans '{0}'", ERR_WINDOW_ID_EXISTS: "La f\xE9n\xEAtre avec l'identifiant '{0}' existe d\xE9j\xE0", ERR_INVALID_LOCALE: "Param\xE8tre de langue invalide '{0}'", LBL_CONNECTION_LOST: "Connexion perdue", LBL_CONNECTION_LOST_MESSAGE: "La connexion \xE0 OS.js a \xE9t\xE9 perdue. Reconnexion...", LBL_CONNECTION_RESTORED: "Connexion restaur\xE9e", LBL_CONNECTION_RESTORED_MESSAGE: "La connexion \xE0 OS.js a \xE9t\xE9 restaur\xE9e.", LBL_APP_CAT_DEVELOPMENT: "D\xE9veloppement", LBL_APP_CAT_SCIENCE: "Science", LBL_APP_CAT_GAMES: "Jeux", LBL_APP_CAT_GRAPHICS: "Graphisme", LBL_APP_CAT_NETWORK: "R\xE9seau", LBL_APP_CAT_MULTIMEDIA: "Multim\xE9dia", LBL_APP_CAT_OFFICE: "Bureautique", LBL_APP_CAT_SYSTEM: "Syst\xE8me", LBL_APP_CAT_UTILITIES: "Utilitaires", LBL_APP_CAT_OTHER: "Autre", LBL_LAUNCH_SELECT: "S\xE9lectionner l'application", LBL_LAUNCH_SELECT_MESSAGE: "S\xE9lectionner l'application pour '{0}'", LBL_DESKTOP_SELECT_WALLPAPER: "S\xE9lectionner le fond d'\xE9cran", LBL_DESKTOP_SELECT_THEME: "S\xE9lectionner le th\xE8me", LBL_SEARCH_TOOLTOP: "Recherche d'un syst\xE8me de fichier ({0})", LBL_SEARCH_PLACEHOLDER: "Recherche des syst\xE8mes de fichiers...", LBL_SEARCH_WAIT: "Recherche...", LBL_SEARCH_RESULT: "Affichage des r\xE9sultats {0}", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "KiB", LBL_FS_MIB: "MiB", LBL_FS_GIB: "GiB", LBL_TOP: "En Haut", LBL_LEFT: "\xC0 Gauche", LBL_RIGHT: "\xC0 Droite", LBL_BOTTOM: "En Bas", LBL_MENU: "Menu", LBL_ERROR: "Erreur", LBL_INFO: "Info", LBL_MESSAGE: "Message", LBL_WARNINIG: "Attention", LBL_SUCCESS: "Succ\xE8s", LBL_FAILURE: "\xC9chec", LBL_WINDOW: "Fen\xEAtre", LBL_WINDOWS: "Fen\xEAtres", LBL_NOTIFICATION: "Notification", LBL_NOTIFICATIONS: "Notifications", LBL_TRAY: "Acc\xE8s au plateau", LBL_NAME: "Nom", LBL_TYPE: "Type", LBL_SIZE: "Taille", LBL_FILE: "Fichier", LBL_NEW: "Nouveau", LBL_OPEN: "Ouvrir", LBL_SAVE: "Sauvegarder", LBL_SAVEAS: "Sauvegarder comme", LBL_OK: "OK", LBL_ABORT: "Abandonner", LBL_CANCEL: "Annuler", LBL_CLOSE: "Fermer", LBL_QUIT: "Quitter", LBL_YES: "Oui", LBL_NO: "Non", LBL_GO: "C'est parti !", LBL_MKDIR: "Cr\xE9er nouveau dossier", LBL_MKFILE: "Cr\xE9er nouveau fichier", LBL_COPY: "Copier", LBL_PASTE: "Coller", LBL_CUT: "Couper", LBL_MOVE: "D\xE9placer", LBL_RENAME: "Renommer", LBL_DELETE: "Supprimer", LBL_DOWNLOAD: "T\xE9l\xE9charger", LBL_REFRESH: "Rafra\xEEchir", LBL_RELOAD: "Recharger", LBL_HOME: "Accueil", LBL_VIEW: "Aper\xE7u", LBL_HELP: "Aide", LBL_ABOUT: "\xC0 propos", LBL_APPLICATION: "Application", LBL_APPLICATIONS: "Applications", LBL_KILL: "Tuer", LBL_KILL_ALL: "Tuer tout" }, or = { ERR_REQUEST_STANDALONE: "Kan ikke gj\xF8re sp\xF8rringer i standalone modus.", ERR_REQUEST_NOT_OK: "En feil oppstod under sp\xF8rring: {0}", ERR_VFS_MOUNT_NOT_FOUND: "Filsystem '{0}' ikke funnet", ERR_VFS_MOUNT_NOT_FOUND_FOR: "Filsystem ikke funnet for '{0}'", ERR_VFS_MOUNT_NOT_MOUNTED: "Filsystem '{0}' ikke montert", ERR_VFS_MOUNT_ALREADY_MOUNTED: "Filesystem '{0}' allerede montert", ERR_VFS_PATH_FORMAT_INVALID: "Angitt sti '{0}' tilfredstiller ikke format 'name:/path'", ERR_PACKAGE_NOT_FOUND: "Pakke Metadata '{0}' ikke funnet", ERR_PACKAGE_LOAD: "Pakke Lasting '{0}' feilet: {1}", ERR_PACKAGE_NO_RUNTIME: "Pakke Runtime '{0}' ikke funnet", ERR_PACKAGE_NO_METADATA: "Metadata ikke funnet for '{0}'. Er den i manifestet?", ERR_PACKAGE_EXCEPTION: "En unntaksfeil oppstod i '{0}'", ERR_WINDOW_ID_EXISTS: "Vindu med ID '{0}' eksisterer allerede", ERR_INVALID_LOCALE: "Ugyldig lokalisering '{0}'", LBL_CONNECTION_LOST: "Tilkobling tapt", LBL_CONNECTION_LOST_MESSAGE: "Tilkobling til OS.js var tapt. Kobler til p\xE5 nytt....", LBL_CONNECTION_RESTORED: "Tilkobling gjenopprettet", LBL_CONNECTION_RESTORED_MESSAGE: "Tilkobling til OS.js var gjenopprettet.", LBL_CONNECTION_FAILED: "Tilkobling feilet", LBL_CONNECTION_FAILED_MESSAGE: "Tilkobling til OS.js var ikke vellykket. Noen egenskaper er utilgjenglig.", LBL_APP_CAT_DEVELOPMENT: "Utvikling", LBL_APP_CAT_SCIENCE: "Vitenskap", LBL_APP_CAT_GAMES: "Spill", LBL_APP_CAT_GRAPHICS: "Grafikk", LBL_APP_CAT_NETWORK: "Nettverk", LBL_APP_CAT_MULTIMEDIA: "Multimedia", LBL_APP_CAT_OFFICE: "Kontor", LBL_APP_CAT_SYSTEM: "System", LBL_APP_CAT_UTILITIES: "Verkt\xF8y", LBL_APP_CAT_OTHER: "Andre", LBL_LAUNCH_SELECT: "Velg applikasjon", LBL_LAUNCH_SELECT_MESSAGE: "Velg applikasjon for '{0}'", LBL_DESKTOP_SELECT_WALLPAPER: "Velg bakgrunnsbilde", LBL_DESKTOP_SELECT_THEME: "Velg tema", LBL_SEARCH_TOOLTOP: "S\xF8k i filsystemer ({0})", LBL_SEARCH_PLACEHOLDER: "S\xF8ker filsystemer...", LBL_SEARCH_WAIT: "S\xF8ker...", LBL_SEARCH_RESULT: "Viser {0} resultater", LBL_DESKTOP_SET_AS_WALLPAPER: "Sett som bakgrunnsbilde", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "KiB", LBL_FS_MIB: "MiB", LBL_FS_GIB: "GiB", LBL_TOP: "Topp", LBL_LEFT: "Venstre", LBL_RIGHT: "H\xF8yre", LBL_BOTTOM: "Bunn", LBL_MENU: "Meny", LBL_ERROR: "Feil", LBL_INFO: "Info", LBL_MESSAGE: "Melding", LBL_WARNINIG: "Advarsel", LBL_SUCCESS: "Velykket", LBL_FAILURE: "Svikt", LBL_WINDOW: "Vindu", LBL_WINDOWS: "Vinduer", LBL_NOTIFICATION: "Notifikasjon", LBL_NOTIFICATIONS: "Notifikasjoner", LBL_TRAY: "Tray Oppf\xF8ring", LBL_NAME: "Navn", LBL_TYPE: "Type", LBL_SIZE: "St\xF8rrelse", LBL_FILE: "Fil", LBL_NEW: "Ny", LBL_OPEN: "\xC5pne", LBL_OPEN_WITH: "\xC5pne med...", LBL_SAVE: "Lagre", LBL_SAVEAS: "Lagre Som", LBL_OK: "OK", LBL_ABORT: "Abort", LBL_CANCEL: "Avbryt", LBL_CLOSE: "Lukk", LBL_QUIT: "Slutt", LBL_YES: "Ja", LBL_NO: "Nei", LBL_GO: "G\xE5", LBL_MKDIR: "Lag ny mappe", LBL_MKFILE: "Lag ny fil", LBL_COPY: "Kopier", LBL_PASTE: "Lim inn", LBL_CUT: "Kutt", LBL_MOVE: "Flytt", LBL_RENAME: "Navngi", LBL_DELETE: "Slett", LBL_DOWNLOAD: "Last ned", LBL_REFRESH: "Gjenoppfrisk", LBL_RELOAD: "Last p\xE5 nytt", LBL_HOME: "Hjem", LBL_VIEW: "Visning", LBL_HELP: "Hjelp", LBL_ABOUT: "Om", LBL_APPLICATION: "Applikasjon", LBL_APPLICATIONS: "Applikasjoner", LBL_KILL: "Drep", LBL_KILL_ALL: "Drep alle", LBL_MINIMIZE: "Minimis\xE8r", LBL_MAXIMIZE: "Maksimis\xE8r", LBL_RESTORE: "Gjenopprett", LBL_RAISE: "L\xF8ft", LBL_SHADE: "Rull opp", LBL_UNSHADE: "Rull ned", LBL_ONTOP: "Alltid \xF8verst", LBL_RESIZE: "Endre st\xF8rrelse", LBL_BACK: "Tilbake", LBL_FORWARD: "Frem", LBL_UPLOAD: "Last opp", LBL_IMAGE: "Bilde", LBL_CREATE_SHORTCUT: "Lag til snarvei", LBL_REMOVE_SHORTCUT: "Fjern snarvei", LBL_EDIT: "Rediger" }, ir = { ERR_REQUEST_STANDALONE: "Zahteve v samostojnem na\u010Dinu niso mogo\u010De.", ERR_REQUEST_NOT_OK: "Pri zahtevi je pri\u0161lo do napake: {0}", ERR_VFS_MOUNT_NOT_FOUND: "Datote\u010Dni sistem '{0}' ni najden", ERR_VFS_MOUNT_NOT_FOUND_FOR: "Datote\u010Dni sistem ni najden '{0}'", ERR_VFS_MOUNT_NOT_MOUNTED: "Datote\u010Dni sistem '{0}' ni name\u0161\u010Den", ERR_VFS_MOUNT_ALREADY_MOUNTED: "Datote\u010Dni sistem '{0}' \u017Ee name\u0161\u010Den", ERR_VFS_PATH_FORMAT_INVALID: "Podana pot '{0}' se ne ujema z 'name:/path'", ERR_PACKAGE_NOT_FOUND: "Metapodatki paketa '{0}' niso najdeni", ERR_PACKAGE_LOAD: "Pri nalaganju pageta '{0}' je pri\u0161lo do napake: {1}", ERR_PACKAGE_NO_RUNTIME: "Koda paketa '{0}' ni najdena", ERR_PACKAGE_NO_METADATA: "Metapodatki '{0}' niso najdeni. Ali so v datoteki manifest?", ERR_PACKAGE_EXCEPTION: "Spro\u017Eena je bila izjema v '{0}'", ERR_WINDOW_ID_EXISTS: "Okno z ID-jem '{0}' \u017Ee obstaja", ERR_INVALID_LOCALE: "Neveljaven prevod '{0}'", LBL_CONNECTION_LOST: "Izguba povezave", LBL_CONNECTION_LOST_MESSAGE: "Povezava do stre\u017Enika je bila izgubljena. Ponovno povezovanje ...", LBL_CONNECTION_RESTORED: "Vzpostavitev povezave", LBL_CONNECTION_RESTORED_MESSAGE: "Povezava do stre\u017Enika je bila ponovno vzpostavljena.", LBL_CONNECTION_FAILED: "Povezava ni uspela", LBL_CONNECTION_FAILED_MESSAGE: "Povezave z OS.js ni bilo mogo\u010De vzpostaviti. Nekatere funkcije morda ne bodo delovale pravilno.", LBL_APP_CAT_DEVELOPMENT: "Razvoj", LBL_APP_CAT_SCIENCE: "Znanost", LBL_APP_CAT_GAMES: "Igre", LBL_APP_CAT_GRAPHICS: "Grafika", LBL_APP_CAT_NETWORK: "Omre\u017Eje", LBL_APP_CAT_MULTIMEDIA: "Multimedija", LBL_APP_CAT_OFFICE: "Pisarna", LBL_APP_CAT_SYSTEM: "Sistem", LBL_APP_CAT_UTILITIES: "Orodja", LBL_APP_CAT_OTHER: "Drugo", LBL_LAUNCH_SELECT: "Izberite aplikacijo", LBL_LAUNCH_SELECT_MESSAGE: "Izberite aplikacijo za '{0}'", LBL_DESKTOP_SELECT_WALLPAPER: "Izberite ozadje", LBL_DESKTOP_SELECT_THEME: "Izberite temo", LBL_SEARCH_TOOLTOP: "I\u0161\u010Di datote\u010Dni sistem ({0})", LBL_SEARCH_PLACEHOLDER: "Iskanje po datote\u010Dnih sistemih ...", LBL_SEARCH_WAIT: "Iskanje ...", LBL_SEARCH_RESULT: "Prikaz {0} rezultatov", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "KiB", LBL_FS_MIB: "MiB", LBL_FS_GIB: "GiB", LBL_TOP: "Zgoraj", LBL_LEFT: "Levo", LBL_RIGHT: "Desno", LBL_BOTTOM: "Spodaj", LBL_MENU: "Meni", LBL_ERROR: "Napaka", LBL_INFO: "Informacije", LBL_MESSAGE: "Sporo\u010Dilo", LBL_WARNINIG: "Opozorilo", LBL_SUCCESS: "Uspeh", LBL_FAILURE: "Neuspeh", LBL_WINDOW: "Okno", LBL_WINDOWS: "Okna", LBL_NOTIFICATION: "Obvestilo", LBL_NOTIFICATIONS: "Obvestila", LBL_TRAY: "Element vrstice", LBL_NAME: "Ime", LBL_TYPE: "Vrsta", LBL_SIZE: "Velikost", LBL_FILE: "Datoteka", LBL_NEW: "Novo", LBL_OPEN: "Odpri", LBL_SAVE: "Shrani", LBL_SAVEAS: "Shrani kot", LBL_OK: "V redu", LBL_ABORT: "Prekini", LBL_CANCEL: "Prekli\u010Di", LBL_CLOSE: "Zapri", LBL_QUIT: "Izklopi", LBL_YES: "Da", LBL_NO: "Ne", LBL_GO: "Pojdi", LBL_MKDIR: "Ustvari novo mapo", LBL_MKFILE: "Ustvari novo datoteko", LBL_COPY: "Kopiraj", LBL_PASTE: "Prilepi", LBL_CUT: "Izre\u017Ei", LBL_MOVE: "Premakni", LBL_RENAME: "Preimenuj", LBL_DELETE: "Izbri\u0161i", LBL_DOWNLOAD: "Prenesi", LBL_REFRESH: "Osve\u017Ei", LBL_RELOAD: "Osve\u017Ei", LBL_HOME: "Domov", LBL_VIEW: "Pogled", LBL_HELP: "Pomo\u010D", LBL_ABOUT: "O programu", LBL_APPLICATION: "Aplikacija", LBL_APPLICATIONS: "Aplikacije", LBL_KILL: "Kon\u010Daj", LBL_KILL_ALL: "Kon\u010Daj vse", LBL_MINIMIZE: "Pomanj\u0161aj", LBL_MAXIMIZE: "Pove\u010Daj", LBL_RESTORE: "Obnovi", LBL_RAISE: "Dvigni", LBL_SHADE: "Zasen\u010Di", LBL_UNSHADE: "Odsen\u010Di", LBL_ONTOP: "Na vrhu", LBL_RESIZE: "Spremeni velikost", LBL_BACK: "Nazaj", LBL_FORWARD: "Naprej", LBL_UPLOAD: "Nalo\u017Ei", LBL_IMAGE: "Slika" }, ar = { ERR_REQUEST_STANDALONE: "Kh\xF4ng th\u1EC3 g\u1EEDi y\xEAu c\u1EA7u \u1EDF ch\u1EBF \u0111\u1ED9 \u0111\u1ED9c l\u1EADp.", ERR_REQUEST_NOT_OK: "\u0110\xE3 x\u1EA3y ra l\u1ED7i khi th\u1EF1c hi\u1EC7n y\xEAu c\u1EA7u: {0}", ERR_VFS_MOUNT_NOT_FOUND: "Kh\xF4ng t\xECm th\u1EA5y h\u1EC7 th\u1ED1ng t\u1EADp tin '{0}'", ERR_VFS_MOUNT_NOT_FOUND_FOR: "Kh\xF4ng t\xECm th\u1EA5y h\u1EC7 th\u1ED1ng t\u1EADp tin cho '{0}'", ERR_VFS_MOUNT_NOT_MOUNTED: "H\u1EC7 th\u1ED1ng t\u1EADp tin '{0}' kh\xF4ng \u0111\u01B0\u1EE3c g\u1EAFn k\u1EBFt", ERR_VFS_MOUNT_ALREADY_MOUNTED: "H\u1EC7 th\u1ED1ng t\u1EADp tin '{0}' \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EAFn k\u1EBFt", ERR_VFS_PATH_FORMAT_INVALID: "\u0110\u1ECBnh d\u1EA1ng \u0111\u01B0\u1EDDng d\u1EABn '{0}' kh\xF4ng kh\u1EDBp v\u1EDBi 'name:/path'", ERR_PACKAGE_NOT_FOUND: "Kh\xF4ng t\xECm th\u1EA5y si\xEAu d\u1EEF li\u1EC7u c\u1EE7a g\xF3i '{0}'", ERR_PACKAGE_LOAD: "T\u1EA3i g\xF3i '{0}' th\u1EA5t b\u1EA1i: {1}", ERR_PACKAGE_NO_RUNTIME: "Kh\xF4ng t\xECm th\u1EA5y Runtime c\u1EE7a g\xF3i '{0}'", ERR_PACKAGE_NO_METADATA: "Kh\xF4ng t\xECm th\u1EA5y si\xEAu d\u1EEF li\u1EC7u cho '{0}'. B\u1EA1n c\xF3 ch\u1EAFc n\xF3 \u0111\xE3 \u0111\u01B0\u1EE3c b\xE1o c\xE1o trong manifest kh\xF4ng?", ERR_PACKAGE_EXCEPTION: "\u0110\xE3 x\u1EA3y ra l\u1ED7i trong '{0}'", ERR_WINDOW_ID_EXISTS: "C\u1EEDa s\u1ED5 v\u1EDBi ID '{0}' \u0111\xE3 t\u1ED3n t\u1EA1i", ERR_INVALID_LOCALE: "Ng\xF4n ng\u1EEF kh\xF4ng h\u1EE3p l\u1EC7 '{0}'", LBL_CONNECTION_LOST: "M\u1EA5t k\u1EBFt n\u1ED1i", LBL_CONNECTION_LOST_MESSAGE: "K\u1EBFt n\u1ED1i v\u1EDBi OS.js \u0111\xE3 b\u1ECB m\u1EA5t. \u0110ang k\u1EBFt n\u1ED1i l\u1EA1i....", LBL_CONNECTION_RESTORED: "\u0110\xE3 kh\xF4i ph\u1EE5c k\u1EBFt n\u1ED1i", LBL_CONNECTION_RESTORED_MESSAGE: "K\u1EBFt n\u1ED1i v\u1EDBi m\xE1y ch\u1EE7 OS.js \u0111\xE3 \u0111\u01B0\u1EE3c kh\xF4i ph\u1EE5c.", LBL_CONNECTION_FAILED: "K\u1EBFt n\u1ED1i th\u1EA5t b\u1EA1i", LBL_CONNECTION_FAILED_MESSAGE: "Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i \u0111\u1EBFn m\xE1y ch\u1EE7 OS.js. M\u1ED9t s\u1ED1 t\xEDnh n\u0103ng c\xF3 th\u1EC3 kh\xF4ng ho\u1EA1t \u0111\u1ED9ng \u1ED5n \u0111\u1ECBnh.", LBL_APP_CAT_DEVELOPMENT: "Ph\xE1t tri\u1EC3n", LBL_APP_CAT_SCIENCE: "Khoa h\u1ECDc", LBL_APP_CAT_GAMES: "Tr\xF2 ch\u01A1i", LBL_APP_CAT_GRAPHICS: "\u0110\u1ED3 h\u1ECDa", LBL_APP_CAT_NETWORK: "M\u1EA1ng", LBL_APP_CAT_MULTIMEDIA: "\u0110a ph\u01B0\u01A1ng ti\u1EC7n", LBL_APP_CAT_OFFICE: "V\u0103n ph\xF2ng", LBL_APP_CAT_SYSTEM: "H\u1EC7 th\u1ED1ng", LBL_APP_CAT_UTILITIES: "Ti\u1EC7n \xEDch", LBL_APP_CAT_OTHER: "\u1EE8ng d\u1EE5ng kh\xE1c", LBL_LAUNCH_SELECT: "Ch\u1ECDn \u1EE9ng d\u1EE5ng", LBL_LAUNCH_SELECT_MESSAGE: "Ch\u1ECDn \u1EE9ng d\u1EE5ng \u0111\u1EC3 m\u1EDF t\u1EADp tin '{0}'", LBL_DESKTOP_SELECT_WALLPAPER: "Thay \u0111\u1ED5i h\xECnh n\u1EC1n", LBL_DESKTOP_SELECT_THEME: "Thay \u0111\u1ED5i ch\u1EE7 \u0111\u1EC1", LBL_SEARCH_TOOLTOP: "T\xECm ki\u1EBFm d\u1EEF li\u1EC7u ({0})", LBL_SEARCH_PLACEHOLDER: "T\xECm ki\u1EBFm...", LBL_SEARCH_WAIT: "\u0110ang t\xECm ki\u1EBFm...", LBL_SEARCH_RESULT: "\u0110ang hi\u1EC3n th\u1ECB {0} k\u1EBFt qu\u1EA3", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "KiB", LBL_FS_MIB: "MiB", LBL_FS_GIB: "GiB", LBL_TOP: "Ph\xEDa tr\xEAn", LBL_LEFT: "Tr\xE1i", LBL_RIGHT: "Ph\u1EA3i", LBL_BOTTOM: "Ph\xEDa d\u01B0\u1EDBi", LBL_MENU: "Menu", LBL_ERROR: "L\u1ED7i", LBL_INFO: "Th\xF4ng tin", LBL_MESSAGE: "Th\xF4ng b\xE1o", LBL_WARNINIG: "C\u1EA3nh b\xE1o", LBL_SUCCESS: "Th\xE0nh c\xF4ng", LBL_FAILURE: "Th\u1EA5t b\u1EA1i", LBL_WINDOW: "C\u1EEDa s\u1ED5", LBL_WINDOWS: "C\xE1c c\u1EEDa s\u1ED5", LBL_NOTIFICATION: "Th\xF4ng b\xE1o", LBL_NOTIFICATIONS: "C\xE1c th\xF4ng b\xE1o", LBL_TRAY: "M\u1EE5c khay h\u1EC7 th\u1ED1ng", LBL_NAME: "T\xEAn", LBL_TYPE: "Ki\u1EC3u", LBL_SIZE: "K\xEDch th\u01B0\u1EDBc", LBL_FILE: "T\u1EADp tin", LBL_NEW: "M\u1EDBi", LBL_OPEN: "M\u1EDF", LBL_SAVE: "L\u01B0u", LBL_SAVEAS: "L\u01B0u nh\u01B0", LBL_OK: "OK", LBL_ABORT: "H\u1EE7y thao t\xE1c", LBL_CANCEL: "H\u1EE7y b\u1ECF", LBL_CLOSE: "\u0110\xF3ng", LBL_QUIT: "Tho\xE1t", LBL_YES: "C\xF3", LBL_NO: "Kh\xF4ng", LBL_GO: "\u0110i", LBL_MKDIR: "T\u1EA1o th\u01B0 m\u1EE5c m\u1EDBi", LBL_MKFILE: "T\u1EA1o t\u1EC7p m\u1EDBi", LBL_COPY: "Sao ch\xE9p", LBL_PASTE: "D\xE1n", LBL_CUT: "C\u1EAFt", LBL_MOVE: "Di chuy\u1EC3n", LBL_RENAME: "\u0110\u1ED5i t\xEAn", LBL_DELETE: "X\xF3a", LBL_DOWNLOAD: "T\u1EA3i v\u1EC1", LBL_REFRESH: "L\xE0m m\u1EDBi", LBL_RELOAD: "T\u1EA3i l\u1EA1i", LBL_HOME: "Trang ch\u1EE7", LBL_VIEW: "Xem", LBL_HELP: "H\u01B0\u1EDBng d\u1EABn", LBL_ABOUT: "Th\xF4ng tin", LBL_APPLICATION: "\u1EE8ng d\u1EE5ng", LBL_APPLICATIONS: "C\xE1c \u1EE9ng d\u1EE5ng", LBL_KILL: "\u0110\xF3ng", LBL_KILL_ALL: "\u0110\xF3ng t\u1EA5t c\u1EA3", LBL_MINIMIZE: "Thu nh\u1ECF", LBL_MAXIMIZE: "T\u1ED1i \u0111a", LBL_RESTORE: "Ph\u1EE5c h\u1ED3i", LBL_RAISE: "N\xE2ng l\xEAn", LBL_SHADE: "L\xE0m m\u1EDF", LBL_UNSHADE: "B\u1ECF l\xE0m m\u1EDD", LBL_ONTOP: "\u1EDE tr\xEAn c\xF9ng", LBL_RESIZE: "Thay \u0111\u1ED5i k\xEDch th\u01B0\u1EDBc", LBL_BACK: "L\xF9i", LBL_FORWARD: "Ti\u1EBFn", LBL_UPLOAD: "T\u1EA3i l\xEAn", LBL_IMAGE: "\u1EA2nh" }, sr = { ERR_REQUEST_STANDALONE: "Im standalone modus k\xF6nnen keine Anfragen gemacht werden.", ERR_REQUEST_NOT_OK: "Beim Ausf\xFChren einer Anfrage ist der folgende Fehler aufgetreten: {0}", ERR_VFS_MOUNT_NOT_FOUND: "Filesystem '{0}' nicht gefunden", ERR_VFS_MOUNT_NOT_FOUND_FOR: "Filesystem f\xFCr '{0}' nicht gefunden", ERR_VFS_MOUNT_NOT_MOUNTED: "Filesystem '{0}' nicht gemountet", ERR_VFS_MOUNT_ALREADY_MOUNTED: "Filesystem '{0}' schon gemountet", ERR_VFS_PATH_FORMAT_INVALID: "Der gegebene Pfad '{0}' stimmt nicht mit 'name:/path' \xFCberein", ERR_PACKAGE_NOT_FOUND: "Paket-Metadaten  '{0}' nicht gefunden", ERR_PACKAGE_LOAD: "Paket Laden '{0}' ist fehlgeschlagen: {1}", ERR_PACKAGE_NO_RUNTIME: "Paketlaufzeit '{0}' nicht gefunden", ERR_PACKAGE_NO_METADATA: "Metadaten f\xFCr '{0}' nicht gefunden. Ist es in der Manifest?", ERR_PACKAGE_EXCEPTION: "Eine Ausnahme trat in '{0}' auf.", ERR_WINDOW_ID_EXISTS: "Fenster mit der ID '{0}' existiert schon", ERR_INVALID_LOCALE: "Invalide Sprache '{0}'", LBL_CONNECTION_LOST: "Verbindung unterbrochen", LBL_CONNECTION_LOST_MESSAGE: "Die Verbindung zu OS.js wurde unterbrochen. Wiederverbinden... ", LBL_CONNECTION_RESTORED: "Verbindung wiederhergestellt", LBL_CONNECTION_RESTORED_MESSAGE: "Die Verbindung zu dem OS.js wurde wieder hergestellt.", LBL_APP_CAT_DEVELOPMENT: "IT-Entwicklung", LBL_APP_CAT_SCIENCE: "Wissenschaft", LBL_APP_CAT_GAMES: "Spiele", LBL_APP_CAT_GRAPHICS: "Grafiken", LBL_APP_CAT_NETWORK: "Netzwerk", LBL_APP_CAT_MULTIMEDIA: "Multimedia", LBL_APP_CAT_OFFICE: "Office", LBL_APP_CAT_SYSTEM: "System", LBL_APP_CAT_UTILITIES: "Dienstprogramme", LBL_APP_CAT_OTHER: "Andere", LBL_LAUNCH_SELECT: "Applikation ausw\xE4hlen", LBL_LAUNCH_SELECT_MESSAGE: "Applikation f\xFCr '{0}' ausw\xE4hlen", LBL_DESKTOP_SELECT_WALLPAPER: "Hintergrundbild ausw\xE4hlen", LBL_DESKTOP_SELECT_THEME: "Theme ausw\xE4hlen", LBL_SEARCH_TOOLTOP: "Dateisysteme ({0}) finden", LBL_SEARCH_PLACEHOLDER: "Dateisysteme finden...", LBL_SEARCH_WAIT: "Suche...", LBL_SEARCH_RESULT: "Anzeige von {0} Ergebnissen", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "KiB", LBL_FS_MIB: "MiB", LBL_FS_GIB: "GiB", LBL_TOP: "Oben", LBL_LEFT: "Links", LBL_RIGHT: "Rechts", LBL_BOTTOM: "Unten", LBL_MENU: "Men\xFC", LBL_ERROR: "Error", LBL_INFO: "Info", LBL_MESSAGE: "Nachricht", LBL_WARNINIG: "Warnung", LBL_SUCCESS: "Success", LBL_FAILURE: "Fehler", LBL_WINDOW: "Fenster", LBL_WINDOWS: "Fenster", LBL_NOTIFICATION: "Benachrichtigung", LBL_NOTIFICATIONS: "Benachrichtigungen", LBL_TRAY: "Infobereich-Eintrag", LBL_NAME: "Name", LBL_TYPE: "Typ", LBL_SIZE: "Gr\xF6\xDFe", LBL_FILE: "Datei", LBL_NEW: "Neue", LBL_OPEN: "\xD6ffnen", LBL_SAVE: "Speichern", LBL_SAVEAS: "Speichern als", LBL_OK: "OK", LBL_ABORT: "Abbrechen", LBL_CANCEL: "Beenden", LBL_CLOSE: "Schlie\xDFen", LBL_QUIT: "Verlassen", LBL_YES: "Ja", LBL_NO: "Nein", LBL_GO: "Los", LBL_MKDIR: "Neues Verzeichnis erstellen", LBL_MKFILE: "Neue Datei erstellen", LBL_COPY: "Kopieren", LBL_PASTE: "Einf\xFCgen", LBL_CUT: "Ausschneiden", LBL_MOVE: "Verschieben", LBL_RENAME: "Umbenennen", LBL_DELETE: "L\xF6schen", LBL_DOWNLOAD: "Herunterladen", LBL_REFRESH: "Aktualisieren", LBL_RELOAD: "Neu laden", LBL_HOME: "Startseite", LBL_VIEW: "Ansicht", LBL_HELP: "Hilfe", LBL_ABOUT: "\xDCber", LBL_APPLICATION: "Anwendungsprogramme", LBL_APPLICATIONS: "Anwendungsprogrammen", LBL_KILL: "Beenden", LBL_KILL_ALL: "Alle benden" }, cr = { ERR_REQUEST_STANDALONE: "\u65E0\u6CD5\u5728\u72EC\u7ACB\u6A21\u5F0F\u4E0B\u53D1\u51FA\u8BF7\u6C42\u3002", ERR_REQUEST_NOT_OK: "\u6267\u884C\u8BF7\u6C42\u65F6\u53D1\u751F\u9519\u8BEF\uFF1A{0}", ERR_VFS_MOUNT_NOT_FOUND: "\u627E\u4E0D\u5230\u6587\u4EF6\u7CFB\u7EDF '{0}' ", ERR_VFS_MOUNT_NOT_FOUND_FOR: "\u627E\u4E0D\u5230'{0}'\u7684\u6587\u4EF6\u7CFB\u7EDF", ERR_VFS_MOUNT_NOT_MOUNTED: "\u6587\u4EF6\u7CFB\u7EDF '{0}' \u672A\u6302\u8F7D", ERR_VFS_MOUNT_ALREADY_MOUNTED: "\u6587\u4EF6\u7CFB\u7EDF '{0}' \u5DF2\u6302\u8F7D", ERR_VFS_PATH_FORMAT_INVALID: "\u7ED9\u5B9A\u8DEF\u5F84'{0}'\u4E0E'name:/path'\u4E0D\u5339\u914D", ERR_PACKAGE_NOT_FOUND: "\u672A\u627E\u5230\u5305\u7684\u5143\u6570\u636E'{0}'", ERR_PACKAGE_LOAD: "\u52A0\u8F7D\u5305 '{0}' \u5931\u8D25\uFF1A {1}", ERR_PACKAGE_NO_RUNTIME: "\u672A\u627E\u5230\u8FD0\u884C\u5305 '{0}' ", ERR_PACKAGE_NO_METADATA: "\u627E\u4E0D\u5230 '{0}' \u7684\u5143\u6570\u636E\u3002\u5B83\u5728\u6E05\u5355\uFF08manifest\uFF09\u4E2D\u5417\uFF1F", ERR_PACKAGE_EXCEPTION: "'{0}'\u53D1\u751F\u5F02\u5E38", ERR_WINDOW_ID_EXISTS: "ID\u4E3A'{0}'\u7684\u7A97\u53E3\u5DF2\u5B58\u5728", ERR_INVALID_LOCALE: "\u65E0\u6548\u7684\u533A\u57DF\u8BBE\u7F6E '{0}'", LBL_CONNECTION_LOST: "\u8FDE\u63A5\u4E22\u5931", LBL_CONNECTION_LOST_MESSAGE: "\u4E0EOS.js\u7684\u8FDE\u63A5\u4E22\u5931\u4E86\u3002\u91CD\u65B0\u8FDE\u63A5....", LBL_CONNECTION_RESTORED: "\u8FDE\u63A5\u5DF2\u6062\u590D", LBL_CONNECTION_RESTORED_MESSAGE: "\u5DF2\u6062\u590D\u4E0EOS.js\u670D\u52A1\u5668\u7684\u8FDE\u63A5\u3002", LBL_CONNECTION_FAILED: "\u8FDE\u63A5\u5931\u8D25", LBL_CONNECTION_FAILED_MESSAGE: "\u65E0\u6CD5\u5EFA\u7ACB\u4E0EOS.js\u7684\u8FDE\u63A5\u3002 \u67D0\u4E9B\u529F\u80FD\u53EF\u80FD\u65E0\u6CD5\u6B63\u5E38\u5DE5\u4F5C\u3002", LBL_APP_CAT_DEVELOPMENT: "\u5F00\u53D1", LBL_APP_CAT_SCIENCE: "\u79D1\u5B66", LBL_APP_CAT_GAMES: "\u6E38\u620F", LBL_APP_CAT_GRAPHICS: "\u56FE\u50CF", LBL_APP_CAT_NETWORK: "\u7F51\u7EDC", LBL_APP_CAT_MULTIMEDIA: "\u5A92\u4F53", LBL_APP_CAT_OFFICE: "\u529E\u516C", LBL_APP_CAT_SYSTEM: "\u7CFB\u7EDF", LBL_APP_CAT_UTILITIES: "\u5DE5\u5177", LBL_APP_CAT_OTHER: "\u5176\u4ED6", LBL_LAUNCH_SELECT: "\u9009\u62E9\u5E94\u7528\u7A0B\u5E8F", LBL_LAUNCH_SELECT_MESSAGE: "\u9009\u62E9'{0}'\u7684\u5E94\u7528\u7A0B\u5E8F", LBL_DESKTOP_SELECT_WALLPAPER: "\u9009\u62E9\u58C1\u7EB8", LBL_DESKTOP_SELECT_THEME: "\u9009\u62E9\u4E3B\u9898", LBL_SEARCH_TOOLTOP: "\u641C\u7D22\u6587\u4EF6\u7CFB\u7EDF ({0})", LBL_SEARCH_PLACEHOLDER: "\u641C\u7D22\u6587\u4EF6\u7CFB\u7EDF...", LBL_SEARCH_WAIT: "\u641C\u7D22...", LBL_SEARCH_RESULT: "\u663E\u793A{0}\u4E2A\u7ED3\u679C", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "KB", LBL_FS_MIB: "MB", LBL_FS_GIB: "GB", LBL_TOP: "\u4E0A", LBL_LEFT: "\u5DE6", LBL_RIGHT: "\u53F3", LBL_BOTTOM: "\u4E0B", LBL_MENU: "\u83DC\u5355", LBL_ERROR: "\u9519\u8BEF", LBL_INFO: "\u4FE1\u606F", LBL_MESSAGE: "\u6D88\u606F", LBL_WARNINIG: "\u8B66\u544A", LBL_SUCCESS: "\u6210\u529F", LBL_FAILURE: "\u5931\u8D25", LBL_WINDOW: "\u7A97\u53E3", LBL_WINDOWS: "\u7A97\u53E3", LBL_NOTIFICATION: "\u901A\u77E5", LBL_NOTIFICATIONS: "\u901A\u77E5", LBL_TRAY: "\u6258\u76D8", LBL_NAME: "\u540D\u79F0", LBL_TYPE: "\u7C7B\u578B", LBL_SIZE: "\u5927\u5C0F", LBL_FILE: "\u6587\u4EF6", LBL_NEW: "\u65B0\u5EFA", LBL_OPEN: "\u6253\u5F00", LBL_SAVE: "\u4FDD\u5B58", LBL_SAVEAS: "\u53E6\u5B58\u4E3A", LBL_OK: "\u786E\u5B9A", LBL_ABORT: "\u4E2D\u6B62", LBL_CANCEL: "\u53D6\u6D88", LBL_CLOSE: "\u5173\u95ED", LBL_QUIT: "\u9000\u51FA", LBL_YES: "\u662F", LBL_NO: "\u5426", LBL_GO: "\u8FDB\u884C", LBL_MKDIR: "\u521B\u5EFA\u65B0\u76EE\u5F55", LBL_MKFILE: "\u521B\u5EFA\u65B0\u6587\u4EF6", LBL_COPY: "\u590D\u5236", LBL_PASTE: "\u7C98\u8D34", LBL_CUT: "\u526A\u5207", LBL_MOVE: "\u79FB\u52A8", LBL_RENAME: "\u91CD\u547D\u540D", LBL_DELETE: "\u5220\u9664", LBL_DOWNLOAD: "\u4E0B\u8F7D", LBL_REFRESH: "\u5237\u65B0", LBL_RELOAD: "\u5237\u65B0", LBL_HOME: "\u4E3B\u9875", LBL_VIEW: "\u89C6\u56FE", LBL_HELP: "\u5E2E\u52A9", LBL_ABOUT: "\u5173\u4E8E", LBL_APPLICATION: "\u5E94\u7528\u7A0B\u5E8F", LBL_APPLICATIONS: "\u5E94\u7528\u7A0B\u5E8F", LBL_KILL: "\u6740\u6B7B", LBL_KILL_ALL: "\u5168\u90E8\u6740\u6B7B", LBL_MINIMIZE: "\u6700\u5C0F\u5316", LBL_MAXIMIZE: "\u6700\u5927\u5316", LBL_RESTORE: "\u6062\u590D", LBL_RAISE: "\u4E0A\u6D6E", LBL_SHADE: "\u7F6E\u540E", LBL_UNSHADE: "\u7F6E\u524D", LBL_ONTOP: "\u9876\u7AEF", LBL_RESIZE: "\u8C03\u6574", LBL_BACK: "\u540E\u9000", LBL_FORWARD: "\u524D\u8FDB", LBL_UPLOAD: "\u4E0A\u4F20", LBL_IMAGE: "\u56FE\u50CF" }, ur = { ERR_REQUEST_STANDALONE: "\u0627\u0645\u06A9\u0627\u0646 \u0627\u062C\u0631\u0627\u06CC \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062D\u0627\u0644\u062A \u0648\u0627\u062D\u062F \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.", ERR_REQUEST_NOT_OK: "\u062E\u0637\u0627\u06CC\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0627\u0646\u062C\u0627\u0645 \u0627\u06CC\u0646 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0631\u062E \u062F\u0627\u062F: {0}", ERR_VFS_MOUNT_NOT_FOUND: "\u0633\u06CC\u0633\u062A\u0645 \u0641\u0627\u06CC\u0644 '{0}' \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F", ERR_VFS_MOUNT_NOT_FOUND_FOR: "\u0633\u06CC\u0633\u062A\u0645 \u0641\u0627\u06CC\u0644 \u0628\u0631\u0627\u06CC '{0}' \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F", ERR_VFS_MOUNT_NOT_MOUNTED: "\u0633\u06CC\u0633\u062A\u0645 \u0641\u0627\u06CC\u0644 '{0}' \u0645\u062A\u0635\u0644 \u0646\u06CC\u0633\u062A", ERR_VFS_MOUNT_ALREADY_MOUNTED: "\u0633\u06CC\u0633\u062A\u0645 \u0641\u0627\u06CC\u0644 '{0}' \u0627\u0632 \u0642\u0628\u0644 \u0645\u062A\u0635\u0644 \u0634\u062F\u0647 \u0627\u0633\u062A", ERR_VFS_PATH_FORMAT_INVALID: "\u0622\u062F\u0631\u0633 '{0}' \u0628\u0627 \u0627\u0644\u06AF\u0648 \u0645\u0637\u0627\u0628\u0642\u062A \u0646\u062F\u0627\u0631\u062F 'name:/path'", ERR_PACKAGE_NOT_FOUND: "\u0641\u0631\u0627\u062F\u0627\u062F\u0647 \u0628\u0633\u062A\u0647 '{0}' \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F", ERR_PACKAGE_LOAD: "\u0628\u0627\u0631\u06AF\u0632\u0627\u0631\u06CC \u0628\u0633\u062A\u0647 '{0}' \u062F\u0686\u0627\u0631 \u062E\u0637\u0627 \u0634\u062F: {1}", ERR_PACKAGE_NO_RUNTIME: "\u0641\u0627\u06CC\u0644 \u0647\u0627\u06CC \u0627\u062C\u0631\u0627\u06CC\u06CC '{0}' \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F", ERR_PACKAGE_NO_METADATA: "\u0641\u0631\u0627\u062F\u0627\u062F\u0647 \u0628\u0631\u0627\u06CC '{0}' \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u0645\u06A9\u0646 \u0627\u0633\u062A \u062F\u0631 \u0645\u0627\u0646\u06CC\u0641\u0633\u062A \u0628\u0627\u0634\u062F\u061F?", ERR_PACKAGE_EXCEPTION: "\u0628\u0631\u0648\u0632 \u0634\u0631\u0627\u06CC\u0637 \u0627\u0633\u062A\u062B\u0646\u0627 '{0}'", ERR_WINDOW_ID_EXISTS: "\u067E\u0646\u062C\u0631\u0647 \u0628\u0627 \u0634\u0646\u0627\u0633\u0647 '{0}' \u0642\u0628\u0644\u0627 \u0648\u062C\u0648\u062F \u062F\u0627\u0631\u062F", ERR_INVALID_LOCALE: "\u0632\u0628\u0627\u0646 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 '{0}'", LBL_CONNECTION_LOST: "\u0627\u0632 \u062F\u0633\u062A \u0631\u0641\u062A\u0646 \u0627\u0631\u062A\u0628\u0627\u0637", LBL_CONNECTION_LOST_MESSAGE: "\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0642\u0637\u0639 \u0634\u062F. \u062F\u0631 \u062D\u0627\u0644 \u062A\u0644\u0627\u0634 ....", LBL_CONNECTION_RESTORED: "\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0634\u062F", LBL_CONNECTION_RESTORED_MESSAGE: "\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0645\u062C\u062F\u062F \u0628\u0631\u0642\u0631\u0627\u0631 \u0634\u062F.", LBL_CONNECTION_FAILED: "\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F", LBL_CONNECTION_FAILED_MESSAGE: "\u0627\u0631\u062A\u0628\u0627\u0637 \u0646\u0645\u06CC\u062A\u0648\u0627\u0646\u062F \u0628\u0627 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0634\u0648\u062F.", LBL_APP_CAT_DEVELOPMENT: "\u062A\u0648\u0633\u0639\u0647", LBL_APP_CAT_SCIENCE: "\u0639\u0644\u0645\u06CC", LBL_APP_CAT_GAMES: "\u0628\u0627\u0632\u06CC", LBL_APP_CAT_GRAPHICS: "\u06AF\u0631\u0627\u0641\u06CC\u06A9", LBL_APP_CAT_NETWORK: "\u0634\u0628\u06A9\u0647", LBL_APP_CAT_MULTIMEDIA: "\u0686\u0646\u062F\u0631\u0633\u0627\u0646\u0647 \u0627\u06CC", LBL_APP_CAT_OFFICE: "\u0627\u062F\u0627\u0631\u06CC", LBL_APP_CAT_SYSTEM: "\u0633\u06CC\u0633\u062A\u0645\u06CC", LBL_APP_CAT_UTILITIES: "\u0627\u0628\u0632\u0627\u0631\u0647\u0627", LBL_APP_CAT_OTHER: "\u0633\u0627\u06CC\u0631", LBL_LAUNCH_SELECT: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0628\u0631\u0646\u0627\u0645\u0647 \u06A9\u0627\u0631\u0628\u0631\u062F\u06CC", LBL_LAUNCH_SELECT_MESSAGE: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0628\u0631\u0646\u0627\u0645\u0647 \u06A9\u0627\u0631\u0628\u0631\u062F\u06CC \u0628\u0631\u0627\u06CC '{0}'", LBL_DESKTOP_SELECT_WALLPAPER: "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0627\u063A\u0630 \u062F\u06CC\u0648\u0627\u0631\u06CC", LBL_DESKTOP_SELECT_THEME: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0627\u0644\u06AF\u0648", LBL_SEARCH_TOOLTOP: "\u062C\u0633\u062A\u062C\u0648\u06CC \u0633\u06CC\u0633\u062A\u0645 \u0641\u0627\u06CC\u0644 ({0})", LBL_SEARCH_PLACEHOLDER: "\u062C\u0633\u062A\u062C\u0648\u06CC \u0633\u06CC\u0633\u062A\u0645 \u0641\u0627\u06CC\u0644...", LBL_SEARCH_WAIT: "\u062F\u0631 \u062C\u0627\u0644 \u062C\u0633\u062A\u062C\u0648...", LBL_SEARCH_RESULT: "\u0646\u0645\u0627\u06CC\u0634 {0} \u0646\u062A\u06CC\u062C\u0647", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "\u06A9\u06CC\u0644\u0648\u0628\u0627\u06CC\u062A", LBL_FS_MIB: "\u0645\u06AF\u0627\u0628\u0627\u06CC\u062A", LBL_FS_GIB: "\u06AF\u06CC\u06AF\u0627\u0628\u0627\u06CC\u062A", LBL_TOP: "\u0628\u0627\u0644\u0627", LBL_LEFT: "\u0686\u067E", LBL_RIGHT: "\u0631\u0627\u0633\u062A", LBL_BOTTOM: "\u067E\u0627\u06CC\u06CC\u0646", LBL_MENU: "\u0645\u0646\u0648\u06CC \u0627\u0635\u0644\u06CC", LBL_ERROR: "\u062E\u0637\u0627", LBL_INFO: "\u0646\u06A9\u062A\u0647", LBL_MESSAGE: "\u067E\u06CC\u0627\u0645", LBL_WARNINIG: "\u0647\u0634\u062F\u0627\u0631", LBL_SUCCESS: "\u0645\u0648\u0641\u0642", LBL_FAILURE: "\u0634\u06A9\u0633\u062A", LBL_WINDOW: "\u067E\u0646\u062C\u0631\u0647", LBL_WINDOWS: "\u067E\u0646\u062C\u0631\u0647 \u0647\u0627", LBL_NOTIFICATION: "\u0627\u0637\u0644\u0627\u0639\u06CC\u0647", LBL_NOTIFICATIONS: "\u0627\u0637\u0644\u0627\u0639\u06CC\u0647 \u0647\u0627", LBL_TRAY: "\u0633\u06CC\u0646\u06CC \u0627\u0628\u0632\u0627\u0631", LBL_NAME: "\u0646\u0627\u0645", LBL_TYPE: "\u0646\u0648\u0639", LBL_SIZE: "\u0627\u0646\u062F\u0627\u0632\u0647", LBL_FILE: "\u0641\u0627\u06CC\u0644", LBL_NEW: "\u062C\u062F\u06CC\u062F", LBL_OPEN: "\u0628\u0627\u0632\u06A9\u0631\u062F\u0646", LBL_OPEN_WITH: "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0628\u0627...", LBL_SAVE: "\u0630\u062E\u06CC\u0631\u0647", LBL_SAVEAS: "\u0630\u062E\u06CC\u0631\u0647 \u062C\u062F\u06CC\u062F", LBL_OK: "\u062A\u0627\u06CC\u06CC\u062F", LBL_ABORT: "\u0628\u06CC\u062E\u06CC\u0627\u0644", LBL_CANCEL: "\u0631\u062F", LBL_CLOSE: "\u0628\u0633\u062A\u0646", LBL_QUIT: "\u062E\u0631\u0648\u062C", LBL_YES: "\u0628\u0644\u0647", LBL_NO: "\u062E\u06CC\u0631", LBL_GO: "\u0628\u0631\u0648", LBL_MKDIR: "\u0627\u06CC\u062C\u0627\u062F \u067E\u0648\u0634\u0647 \u062C\u062F\u06CC\u062F", LBL_MKFILE: "\u0627\u06CC\u062C\u0627\u062F \u0641\u0627\u06CC\u0644 \u062C\u062F\u06CC\u062F", LBL_COPY: "\u06A9\u067E\u06CC", LBL_PASTE: "\u0627\u0644\u0635\u0627\u0642", LBL_CUT: "\u0628\u0631\u062F\u0627\u0634\u062A\u0646", LBL_MOVE: "\u0627\u0646\u062A\u0642\u0627\u0644", LBL_RENAME: "\u062A\u063A\u06CC\u06CC\u0631\u0646\u0627\u0645", LBL_DELETE: "\u062D\u0630\u0641", LBL_DOWNLOAD: "\u062F\u0627\u0646\u0644\u0648\u062F", LBL_REFRESH: "\u0646\u0648\u0633\u0627\u0632\u06CC", LBL_RELOAD: "\u0628\u0627\u0631\u06AF\u0632\u0627\u0631\u06CC \u0645\u062C\u062F\u062F", LBL_HOME: "\u062E\u0627\u0646\u0647", LBL_VIEW: "\u0646\u0645\u0627\u06CC\u0634", LBL_HELP: "\u06A9\u0645\u06A9", LBL_ABOUT: "\u062F\u0631\u0628\u0627\u0631\u0647", LBL_APPLICATION: "\u0628\u0631\u0646\u0627\u0645\u0647 \u06A9\u0627\u0631\u0628\u0631\u062F\u06CC", LBL_APPLICATIONS: "\u0628\u0631\u0646\u0627\u0645\u0647 \u0647\u0627\u06CC \u06A9\u0627\u0631\u0628\u0631\u062F\u06CC", LBL_KILL: "\u0627\u0632 \u0628\u06CC\u0646 \u0628\u0631\u062F\u0646", LBL_KILL_ALL: "\u0627\u0632 \u0628\u06CC\u0646 \u0628\u0631\u062F\u0646 \u0647\u0645\u0647", LBL_MINIMIZE: "\u06A9\u0645\u06CC\u0646\u0647", LBL_MAXIMIZE: "\u0628\u06CC\u0634\u06CC\u0646\u0647", LBL_RESTORE: "\u0639\u0627\u062F\u06CC", LBL_RAISE: "\u0634\u0646\u0627\u0648\u0631", LBL_SHADE: "\u0628\u0627\u0644\u0627 \u0628\u0631\u062F\u0646", LBL_UNSHADE: "\u067E\u0627\u06CC\u06CC\u0646 \u0622\u0648\u0631\u062F\u0646", LBL_ONTOP: "\u062F\u0631 \u0628\u0627\u0644\u0627", LBL_RESIZE: "\u062A\u063A\u06CC\u06CC\u0631\u0627\u0646\u062F\u0627\u0632\u0647", LBL_BACK: "\u0639\u0642\u0628", LBL_FORWARD: "\u062C\u0644\u0648", LBL_UPLOAD: "\u0622\u067E\u0644\u0648\u062F", LBL_IMAGE: "\u062A\u0635\u0648\u06CC\u0631", LBL_CREATE_SHORTCUT: "\u0627\u06CC\u062C\u0627\u062F \u0645\u06CC\u0627\u0646\u0628\u0631", LBL_REMOVE_SHORTCUT: "\u062D\u0630\u0641 \u0645\u06CC\u0627\u0646\u0628\u0631", LBL_EDIT: "\u0648\u06CC\u0631\u0627\u06CC\u0634" }, lr = { ERR_REQUEST_STANDALONE: "N\xE3o \xE9 poss\xEDvel fazer solicita\xE7\xF5es aut\xF4nomas.", ERR_REQUEST_NOT_OK: "Ocorreu um erro ao executar a solicita\xE7\xE3o: {0}", ERR_VFS_MOUNT_NOT_FOUND: "Sistema de arquivo '{0}' n\xE3o encontrado", ERR_VFS_MOUNT_NOT_FOUND_FOR: "Sistema de arquivo n\xE3o encontrado para '{0}'", ERR_VFS_MOUNT_NOT_MOUNTED: "Sistema de arquivo '{0}' n\xE3o montado", ERR_VFS_MOUNT_ALREADY_MOUNTED: "Sistema de arquivo '{0}' j\xE1 montado", ERR_VFS_PATH_FORMAT_INVALID: "O caminho especificado '{0}' n\xE3o corresponde 'name:/path'", ERR_PACKAGE_NOT_FOUND: "Metadados do pacote '{0}' n\xE3o encontrados", ERR_PACKAGE_LOAD: "Carregamento do pacote '{0}' falhou: {1}", ERR_PACKAGE_NO_RUNTIME: "Tempo de execu\xE7\xE3o do pacote '{0}' n\xE3o encontrado", ERR_PACKAGE_NO_METADATA: "Metadados n\xE3o encontrado para '{0}'. Est\xE1 no manifesto?", ERR_PACKAGE_EXCEPTION: "Ocorreu uma exce\xE7\xE3o em '{0}'", ERR_WINDOW_ID_EXISTS: "Janela com ID '{0}' J\xE1 existe", ERR_INVALID_LOCALE: "C\xF3digo de idioma inv\xE1lido '{0}'", LBL_CONNECTION_LOST: "Conex\xE3o perdida", LBL_CONNECTION_LOST_MESSAGE: "A conex\xE3o com OS.js foi perdida. Reconectando....", LBL_CONNECTION_RESTORED: "Conex\xE3o restaurada", LBL_CONNECTION_RESTORED_MESSAGE: "A conex\xE3o com o servidor OS.js foi restaurada.", LBL_CONNECTION_FAILED: "Falha na conex\xE3o", LBL_CONNECTION_FAILED_MESSAGE: "A conex\xE3o com OS.js n\xE3o pode ser estabelecida. Alguns recursos podem n\xE3o funcionar corretamente.", LBL_APP_CAT_DEVELOPMENT: "Desenvolvimento", LBL_APP_CAT_SCIENCE: "Ci\xEAncia", LBL_APP_CAT_GAMES: "Jogos", LBL_APP_CAT_GRAPHICS: "Gr\xE2fico", LBL_APP_CAT_NETWORK: "Rede", LBL_APP_CAT_MULTIMEDIA: "Multimedia", LBL_APP_CAT_OFFICE: "Escrit\xF3rio", LBL_APP_CAT_SYSTEM: "Sistema", LBL_APP_CAT_UTILITIES: "Utilidades", LBL_APP_CAT_OTHER: "Outros", LBL_LAUNCH_SELECT: "Selecionar aplicativo", LBL_LAUNCH_SELECT_MESSAGE: "Selecionar aplicativo para '{0}'", LBL_DESKTOP_SELECT_WALLPAPER: "Selecionar papel de parede", LBL_DESKTOP_SELECT_THEME: "Selecionar tema", LBL_SEARCH_TOOLTOP: "Pesquisar no sistema de arquivos ({0})", LBL_SEARCH_PLACEHOLDER: "Pesquisar...", LBL_SEARCH_WAIT: "Buscando...", LBL_SEARCH_RESULT: "Mostrando {0} resultados", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "KiB", LBL_FS_MIB: "MiB", LBL_FS_GIB: "GiB", LBL_TOP: "Topo", LBL_LEFT: "Esquerda", LBL_RIGHT: "Direita", LBL_BOTTOM: "Inferior", LBL_MENU: "Menu", LBL_ERROR: "Erro", LBL_INFO: "Informa\xE7\xE3o", LBL_MESSAGE: "Mensagem", LBL_WARNINIG: "Aten\xE7\xE3o", LBL_SUCCESS: "Sucesso", LBL_FAILURE: "Falha", LBL_WINDOW: "Janela", LBL_WINDOWS: "Janelas", LBL_NOTIFICATION: "Notifica\xE7\xE3o", LBL_NOTIFICATIONS: "Notifica\xE7\xF5es", LBL_TRAY: "Entrada", LBL_NAME: "Nome", LBL_TYPE: "Tipo", LBL_SIZE: "Tamanho", LBL_FILE: "Arquivo", LBL_NEW: "Novo", LBL_OPEN: "Abrir", LBL_OPEN_WITH: "Abrir com...", LBL_SAVE: "Salvar", LBL_SAVEAS: "Salvar como", LBL_OK: "OK", LBL_ABORT: "Abortar", LBL_CANCEL: "Cancelar", LBL_CLOSE: "Fechar", LBL_QUIT: "Sair", LBL_YES: "Sim", LBL_NO: "N\xE3o", LBL_GO: "Ir", LBL_MKDIR: "Criar novo diret\xF3rio", LBL_MKFILE: "Criar novo arquivo", LBL_COPY: "Copiar", LBL_PASTE: "Colar", LBL_CUT: "Recortar", LBL_MOVE: "Mover", LBL_RENAME: "Renomear", LBL_DELETE: "Deletar", LBL_DOWNLOAD: "Download", LBL_REFRESH: "Atualizar", LBL_RELOAD: "Recarregar", LBL_HOME: "Home", LBL_VIEW: "Visualiza\xE7\xE3o", LBL_HELP: "Ajuda", LBL_ABOUT: "Sobre", LBL_APPLICATION: "Aplicativo", LBL_APPLICATIONS: "Aplicativos", LBL_KILL: "Finalizar", LBL_KILL_ALL: "Finalizar tudo", LBL_MINIMIZE: "Minimizar", LBL_MAXIMIZE: "Maximizar", LBL_RESTORE: "Restaurar", LBL_RAISE: "Levantar", LBL_SHADE: "Sombra", LBL_UNSHADE: "Tirar sombra", LBL_ONTOP: "No topo", LBL_RESIZE: "Redimensionar", LBL_BACK: "Voltar", LBL_FORWARD: "Avan\xE7ar", LBL_UPLOAD: "Enviar", LBL_IMAGE: "Imagem", LBL_CREATE_SHORTCUT: "Criar atalho", LBL_REMOVE_SHORTCUT: "Remover atalho", LBL_EDIT: "Editar" }, fr = { ERR_REQUEST_STANDALONE: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u0432 \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435.", ERR_REQUEST_NOT_OK: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0435: {0}", ERR_VFS_MOUNT_NOT_FOUND: "\u0424\u0430\u0439\u043B\u043E\u0432\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 '{0}' \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430", ERR_VFS_MOUNT_NOT_FOUND_FOR: "\u0424\u0430\u0439\u043B\u043E\u0432\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0434\u043B\u044F '{0}'", ERR_VFS_MOUNT_NOT_MOUNTED: "\u0424\u0430\u0439\u043B\u043E\u0432\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 '{0}' \u043D\u0435 \u0432\u043C\u043E\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430", ERR_VFS_MOUNT_ALREADY_MOUNTED: "\u0424\u0430\u0439\u043B\u043E\u0432\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 '{0}' \u0443\u0436\u0435 \u0432\u043C\u043E\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430", ERR_VFS_PATH_FORMAT_INVALID: "\u0417\u0430\u0434\u0430\u043D\u043D\u044B\u0439 \u043F\u0443\u0442\u044C '{0}' \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0432\u0443\u0435\u0442 \u0444\u043E\u0440\u043C\u0430\u0442\u0443 '\u0438\u043C\u044F:/\u043F\u0443\u0442\u044C'", ERR_PACKAGE_NOT_FOUND: "\u041C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u0430\u043A\u0435\u0442\u0430 '{0}' \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B", ERR_PACKAGE_LOAD: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0430\u043A\u0435\u0442\u0430 '{0}': {1}", ERR_PACKAGE_NO_RUNTIME: "\u0420\u0430\u043D\u0442\u0430\u0439\u043C \u043F\u0430\u043A\u0435\u0442\u0430 '{0}' \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D", ERR_PACKAGE_NO_METADATA: "\u041C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B \u0434\u043B\u044F '{0}'. Is it in the manifest?", ERR_PACKAGE_EXCEPTION: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u043E \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0432 '{0}'", ERR_WINDOW_ID_EXISTS: "\u041E\u043A\u043D\u043E \u0441 ID '{0}' \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442", ERR_INVALID_LOCALE: "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430\u044F \u043B\u043E\u043A\u0430\u043B\u044C '{0}'", LBL_CONNECTION_LOST: "\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u041F\u043E\u0442\u0435\u0440\u044F\u043D\u043E", LBL_CONNECTION_LOST_MESSAGE: "\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0441 OS.js \u0431\u044B\u043B\u043E \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u043E. \u041F\u0435\u0440\u0435\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0435\u043C\u0441\u044F....", LBL_CONNECTION_RESTORED: "\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E", LBL_CONNECTION_RESTORED_MESSAGE: "\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C OS.js \u0431\u044B\u043B\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E.", LBL_CONNECTION_FAILED: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u044F", LBL_CONNECTION_FAILED_MESSAGE: "\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0441 OS.js \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E. \u041D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u043C\u043E\u0433\u0443\u0442 \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E.", LBL_APP_CAT_DEVELOPMENT: "\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430", LBL_APP_CAT_SCIENCE: "\u0412\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F", LBL_APP_CAT_GAMES: "\u0418\u0433\u0440\u044B", LBL_APP_CAT_GRAPHICS: "\u0413\u0440\u0430\u0444\u0438\u043A\u0430", LBL_APP_CAT_NETWORK: "\u0421\u0435\u0442\u044C", LBL_APP_CAT_MULTIMEDIA: "\u041C\u0443\u043B\u044C\u0442\u0438\u043C\u0435\u0434\u0438\u0430", LBL_APP_CAT_OFFICE: "\u041E\u0444\u0438\u0441", LBL_APP_CAT_SYSTEM: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430", LBL_APP_CAT_UTILITIES: "\u0423\u0442\u0438\u043B\u0438\u0442\u044B", LBL_APP_CAT_OTHER: "\u0414\u0440\u0443\u0433\u0438\u0435", LBL_LAUNCH_SELECT: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435", LBL_LAUNCH_SELECT_MESSAGE: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 '{0}'", LBL_DESKTOP_SELECT_WALLPAPER: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043E\u0438", LBL_DESKTOP_SELECT_THEME: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0435\u043C\u0443", LBL_SEARCH_TOOLTOP: "\u041F\u043E\u0438\u0441\u043A \u0444\u0430\u0439\u043B\u043E\u0432\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B ({0})", LBL_SEARCH_PLACEHOLDER: "\u041F\u043E\u0438\u0441\u043A \u0444\u0430\u0439\u043B\u043E\u0432\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B...", LBL_SEARCH_WAIT: "\u041F\u043E\u0438\u0441\u043A...", LBL_SEARCH_RESULT: "\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u043E {0} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432", LBL_FS_B: "\u0411", LBL_FS_M: "\u041C", LBL_FS_G: "\u0413", LBL_FS_KIB: "\u0413\u0438\u0411", LBL_FS_MIB: "\u041C\u0438\u0411", LBL_FS_GIB: "\u0413\u0438\u0411", LBL_TOP: "\u0412\u0432\u0435\u0440\u0445", LBL_LEFT: "\u041B\u0435\u0432\u043E", LBL_RIGHT: "\u041F\u0440\u0430\u0432\u043E", LBL_BOTTOM: "\u0412\u043D\u0438\u0437", LBL_MENU: "\u041C\u0435\u043D\u044E", LBL_ERROR: "\u041E\u0448\u0438\u0431\u043A\u0430", LBL_INFO: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F", LBL_MESSAGE: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435", LBL_WARNINIG: "\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435", LBL_SUCCESS: "\u0423\u0441\u043F\u0435\u0448\u043D\u043E", LBL_FAILURE: "\u041E\u0448\u0438\u0431\u043A\u0430", LBL_WINDOW: "\u041E\u043A\u043D\u043E", LBL_WINDOWS: "\u041E\u043A\u043D\u0430", LBL_NOTIFICATION: "\u041E\u043F\u043E\u0432\u0435\u0449\u0435\u043D\u0438\u0435", LBL_NOTIFICATIONS: "\u041E\u043F\u043E\u0432\u0435\u0449\u0435\u043D\u0438\u044F", LBL_TRAY: "\u0422\u0440\u044D\u0439", LBL_NAME: "\u0418\u043C\u044F", LBL_TYPE: "\u0422\u0438\u043F", LBL_SIZE: "\u0420\u0430\u0437\u043C\u0435\u0440", LBL_FILE: "\u0424\u0430\u0439\u043B", LBL_NEW: "\u041D\u043E\u0432\u044B\u0439", LBL_OPEN: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C", LBL_OPEN_WITH: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441...", LBL_SAVE: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", LBL_SAVEAS: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u0430\u043A", LBL_OK: "\u041E\u041A", LBL_ABORT: "\u041F\u0440\u0435\u0440\u0432\u0430\u0442\u044C", LBL_CANCEL: "\u041E\u0442\u043C\u0435\u043D\u0430", LBL_CLOSE: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", LBL_QUIT: "\u0412\u044B\u0439\u0442\u0438", LBL_YES: "\u0414\u0430", LBL_NO: "\u041D\u0435\u0442", LBL_GO: "\u0412\u043F\u0435\u0440\u0435\u0434", LBL_MKDIR: "\u041D\u043E\u0432\u0430\u044F \u043F\u0430\u043F\u043A\u0430", LBL_MKFILE: "\u041D\u043E\u0432\u044B\u0439 \u0444\u0430\u0439\u043B", LBL_COPY: "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C", LBL_PASTE: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C", LBL_CUT: "\u0412\u044B\u0440\u0435\u0437\u0430\u0442\u044C", LBL_MOVE: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C", LBL_RENAME: "\u041F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u0442\u044C", LBL_DELETE: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", LBL_DOWNLOAD: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C", LBL_REFRESH: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C", LBL_RELOAD: "\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C", LBL_HOME: "\u0414\u043E\u043C\u043E\u0439", LBL_VIEW: "\u0412\u0438\u0434", LBL_HELP: "\u041F\u043E\u043C\u043E\u0449\u044C", LBL_ABOUT: "\u041E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0435", LBL_APPLICATION: "\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435", LBL_APPLICATIONS: "\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F", LBL_KILL: "\u0423\u0431\u0438\u0442\u044C", LBL_KILL_ALL: "\u0423\u0431\u0438\u0442\u044C \u0432\u0441\u0435", LBL_MINIMIZE: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C", LBL_MAXIMIZE: "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C", LBL_RESTORE: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C", LBL_RAISE: "Raise", LBL_SHADE: "Shade", LBL_UNSHADE: "Unshade", LBL_ONTOP: "\u041F\u043E\u0432\u0435\u0440\u0445 \u043E\u043A\u043E\u043D", LBL_RESIZE: "\u0420\u0430\u0437\u043C\u0435\u0440", LBL_BACK: "\u041D\u0430\u0437\u0430\u0434", LBL_FORWARD: "\u0412\u043F\u0435\u0440\u0435\u0434", LBL_UPLOAD: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C", LBL_IMAGE: "\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430", LBL_CREATE_SHORTCUT: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u044F\u0440\u043B\u044B\u043A", LBL_REMOVE_SHORTCUT: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044F\u0440\u043B\u044B\u043A" }, dr = { ERR_REQUEST_STANDALONE: "Ba\u011F\u0131ms\u0131z modda talepde bulunulamaz.", ERR_REQUEST_NOT_OK: "Talep ger\xE7ekle\u015Ftirilirken bir hata olu\u015Ftu: {0}", ERR_VFS_MOUNT_NOT_FOUND: "'{0}' isimli dosya sistemi bulunamad\u0131", ERR_VFS_MOUNT_NOT_FOUND_FOR: "'{0}' i\xE7in dosya sistemi bulunamad\u0131", ERR_VFS_MOUNT_NOT_MOUNTED: "'{0}' isimli dosya sistemi \xE7\u0131kar\u0131lmad\u0131", ERR_VFS_MOUNT_ALREADY_MOUNTED: "'{0}' isimli dosya sistemi zaten \xE7\u0131kar\u0131ld\u0131", ERR_VFS_PATH_FORMAT_INVALID: "'{0}' olarak verilen yol, 'name:/path' ile e\u015Fle\u015Fmiyor", ERR_PACKAGE_PERMISSION_DENIED: "'{0}' dosyas\u0131n\u0131 \xE7al\u0131\u015Ft\u0131rmaya iznin yok", ERR_PACKAGE_NOT_FOUND: "'{0}' isimli paket meta verisi bulunamad\u0131", ERR_PACKAGE_LOAD: "'{0}' paketinin y\xFCklenmesi ba\u015Far\u0131s\u0131z: {1}", ERR_PACKAGE_NO_RUNTIME: "'{0}' paketinin runtime verisi bulunamad\u0131", ERR_PACKAGE_NO_METADATA: "'{0}' i\xE7in meta verisi bulunamad\u0131. Manifest'de olabilir mi?", ERR_PACKAGE_EXCEPTION: "'{0}' konumunda beklenmeyen bir durum ger\xE7ekle\u015Fti", ERR_WINDOW_ID_EXISTS: "'{0}' ID'sine sahip olan bir pencere zaten var", ERR_INVALID_LOCALE: "Ge\xE7ersiz yer '{0}'", LBL_CONNECTION_LOST: "Ba\u011Flant\u0131 Koptu", LBL_CONNECTION_LOST_MESSAGE: "OS.js'ye olan ba\u011Flant\u0131 koptu. Yeniden ba\u011Flan\u0131l\u0131yor....", LBL_CONNECTION_RESTORED: "Ba\u011Flant\u0131 Yenilendi", LBL_CONNECTION_RESTORED_MESSAGE: "OS.js'ye olan ba\u011Flant\u0131 yenilendi.", LBL_CONNECTION_FAILED: "Ba\u011Flant\u0131 Ba\u015Far\u0131s\u0131z", LBL_CONNECTION_FAILED_MESSAGE: "OS.js'ye ba\u011Flan\u0131lam\u0131yor. \xC7e\u015Fitli \xF6zellikler do\u011Fru \xE7al\u0131\u015Fmayabilir.", LBL_APP_CAT_DEVELOPMENT: "Geli\u015Ftirme", LBL_APP_CAT_SCIENCE: "Bilim", LBL_APP_CAT_GAMES: "Oyun", LBL_APP_CAT_GRAPHICS: "Grafik", LBL_APP_CAT_NETWORK: "A\u011F", LBL_APP_CAT_MULTIMEDIA: "Multimedya", LBL_APP_CAT_OFFICE: "Ofis", LBL_APP_CAT_SYSTEM: "Sistem", LBL_APP_CAT_UTILITIES: "Ara\xE7lar", LBL_APP_CAT_OTHER: "Di\u011Fer", LBL_LAUNCH_SELECT: "Uygulama se\xE7", LBL_LAUNCH_SELECT_MESSAGE: "'{0}' i\xE7in uygulama se\xE7", LBL_DESKTOP_SELECT_WALLPAPER: "Arkaplan se\xE7", LBL_DESKTOP_SELECT_THEME: "Tema se\xE7", LBL_SEARCH_TOOLTOP: "Dosya sistemi ({0}) ara", LBL_SEARCH_PLACEHOLDER: "Dosya sistemlerini ara...", LBL_SEARCH_WAIT: "Aran\u0131yor...", LBL_SEARCH_RESULT: "{0} kadar sonu\xE7 g\xF6steriliyor", LBL_DESKTOP_SET_AS_WALLPAPER: "Arkaplan olarak ayarla", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "KiB", LBL_FS_MIB: "MiB", LBL_FS_GIB: "GiB", LBL_TOP: "\xDCst", LBL_LEFT: "Sol", LBL_RIGHT: "Sa\u011F", LBL_BOTTOM: "Alt", LBL_MENU: "Men\xFC", LBL_ERROR: "Hata", LBL_INFO: "Bilgi", LBL_MESSAGE: "Mesaj", LBL_WARNINIG: "Uyar\u0131", LBL_SUCCESS: "Ba\u015Far\u0131", LBL_FAILURE: "Kusur", LBL_WINDOW: "Pencere", LBL_WINDOWS: "Pencereler", LBL_NOTIFICATION: "Bildiri", LBL_NOTIFICATIONS: "Bildiriler", LBL_TRAY: "Tray Giri\u015Fi", LBL_NAME: "\u0130sim", LBL_TYPE: "T\xFCr", LBL_SIZE: "Boyut", LBL_FILE: "Dosya", LBL_NEW: "Yeni", LBL_OPEN: "A\xE7", LBL_OPEN_WITH: "\u015Eununla a\xE7:", LBL_SAVE: "Kaydet", LBL_SAVEAS: "Farkl\u0131 Kaydet", LBL_OK: "Tamam", LBL_ABORT: "Durdur", LBL_CANCEL: "\u0130ptal", LBL_CLOSE: "Kapat", LBL_QUIT: "\xC7\u0131k", LBL_YES: "Evet", LBL_NO: "Hay\u0131r", LBL_GO: "Git", LBL_MKDIR: "Yeni dizin olu\u015Ftur", LBL_MKFILE: "Yeni dosya olu\u015Ftur", LBL_COPY: "Kopyala", LBL_PASTE: "Yap\u0131\u015Ft\u0131r", LBL_CUT: "Kes", LBL_MOVE: "Ta\u015F\u0131", LBL_RENAME: "Yeniden Adland\u0131r", LBL_DELETE: "Sil", LBL_DOWNLOAD: "\u0130ndir", LBL_REFRESH: "Yenile", LBL_RELOAD: "Yeniden Y\xFCkle", LBL_HOME: "Ev", LBL_VIEW: "G\xF6ster", LBL_HELP: "Yard\u0131m", LBL_ABOUT: "Hakk\u0131nda", LBL_APPLICATION: "Uygulama", LBL_APPLICATIONS: "Uygulamalar", LBL_KILL: "\xD6ld\xFCr", LBL_KILL_ALL: "Hepsini \xF6ld\xFCr", LBL_MINIMIZE: "K\xFC\xE7\xFClt", LBL_MAXIMIZE: "B\xFCy\xFCt", LBL_RESTORE: "Onar", LBL_RAISE: "Y\xFCkselt", LBL_SHADE: "\xD6rt", LBL_UNSHADE: "\xD6rtme", LBL_ONTOP: "Tepe", LBL_RESIZE: "Yeniden boyutland\u0131r", LBL_BACK: "Geri", LBL_FORWARD: "\u0130leri", LBL_UPLOAD: "Y\xFCkle", LBL_IMAGE: "\u0130mge", LBL_CREATE_SHORTCUT: "K\u0131sayol olu\u015Ftur", LBL_REMOVE_SHORTCUT: "K\u0131sayolu sil", LBL_EDIT: "D\xFCzenle" }, pr = { ERR_REQUEST_STANDALONE: "Det g\xE5r inte att g\xF6ra f\xF6rfr\xE5gningar i frist\xE5ende l\xE4ge.", ERR_REQUEST_NOT_OK: "Ett fel uppstod n\xE4r en beg\xE4ran utf\xF6rdes: {0}", ERR_VFS_MOUNT_NOT_FOUND: "Filsystemet '{0}' hittades inte", ERR_VFS_MOUNT_NOT_FOUND_FOR: "Filsystemet hittades inte f\xF6r '{0}'", ERR_VFS_MOUNT_NOT_MOUNTED: "Filsystemet '{0}' inte monterat", ERR_VFS_MOUNT_ALREADY_MOUNTED: "Filsystemet '{0}' redan monterat", ERR_VFS_PATH_FORMAT_INVALID: "Angiven v\xE4g '{0}' matchar inte 'name:/path'", ERR_PACKAGE_PERMISSION_DENIED: "Du har inte till\xE5telse att starta '{0}'", ERR_PACKAGE_NOT_FOUND: "Paketmetadata '{0}' hittades inte", ERR_PACKAGE_LOAD: "Paketladdning '{0}' misslyckades: {1}", ERR_PACKAGE_NO_RUNTIME: "Paketets k\xF6rtid '{0}' hittades inte", ERR_PACKAGE_NO_METADATA: "Metadata hittades inte f\xF6r '{0}'. \xC4r det i manifestet?", ERR_PACKAGE_EXCEPTION: "Ett undantag intr\xE4ffade i '{0}'", ERR_WINDOW_ID_EXISTS: "F\xF6nster med ID '{0}' existerar redan", ERR_INVALID_LOCALE: "Ogiltigt spr\xE5k '{0}'", LBL_CONNECTION_LOST: "Anslutning f\xF6rlorad", LBL_CONNECTION_LOST_MESSAGE: "Anslutningen till OS.js f\xF6rlorades. \xC5teransluter ....", LBL_CONNECTION_RESTORED: "Anslutning \xE5terst\xE4lld", LBL_CONNECTION_RESTORED_MESSAGE: "Anslutningen till OS.js-servern \xE5terst\xE4lldes.", LBL_CONNECTION_FAILED: "Anslutningen misslyckades", LBL_CONNECTION_FAILED_MESSAGE: "Anslutningen till OS.js kunde inte uppr\xE4ttas. Vissa funktioner kanske inte fungerar ordentligt.", LBL_APP_CAT_DEVELOPMENT: "Utveckling", LBL_APP_CAT_SCIENCE: "Vetenskap", LBL_APP_CAT_GAMES: "Spel", LBL_APP_CAT_GRAPHICS: "Grafik", LBL_APP_CAT_NETWORK: "N\xE4tverk", LBL_APP_CAT_MULTIMEDIA: "Multimedia", LBL_APP_CAT_OFFICE: "Kontor", LBL_APP_CAT_SYSTEM: "Systemet", LBL_APP_CAT_UTILITIES: "Verktyg", LBL_APP_CAT_OTHER: "\xD6vrigt", LBL_LAUNCH_SELECT: "V\xE4lj applikation", LBL_LAUNCH_SELECT_MESSAGE: "V\xE4lj applikation f\xF6r '{0}'", LBL_DESKTOP_SELECT_WALLPAPER: "V\xE4lj bakgrund", LBL_DESKTOP_SELECT_THEME: "V\xE4lj tema", LBL_SEARCH_TOOLTOP: "S\xF6k filsystem ({0})", LBL_SEARCH_PLACEHOLDER: "S\xF6k filsystemen...", LBL_SEARCH_WAIT: "S\xF6ker...", LBL_SEARCH_RESULT: "Visar {0} resultat", LBL_DESKTOP_SET_AS_WALLPAPER: "Anv\xE4nd som bakgrund", LBL_FS_B: "B", LBL_FS_M: "M", LBL_FS_G: "G", LBL_FS_KIB: "KiB", LBL_FS_MIB: "MiB", LBL_FS_GIB: "GiB", LBL_TOP: "Topp", LBL_LEFT: "V\xE4nster", LBL_RIGHT: "H\xF6ger", LBL_BOTTOM: "Botten", LBL_MENU: "Meny", LBL_ERROR: "Fel", LBL_INFO: "Info", LBL_MESSAGE: "Meddelande", LBL_WARNINIG: "Varning", LBL_SUCCESS: "Framg\xE5ng", LBL_FAILURE: "Fel", LBL_WINDOW: "F\xF6nster", LBL_WINDOWS: "F\xF6nster", LBL_NOTIFICATION: "Meddelande", LBL_NOTIFICATIONS: "Meddelanden", LBL_TRAY: "Fackinmatning", LBL_NAME: "Namn", LBL_TYPE: "Typ", LBL_SIZE: "Storlek", LBL_FILE: "Fil", LBL_NEW: "Ny", LBL_OPEN: "\xD6ppna", LBL_OPEN_WITH: "\xD6ppna med...", LBL_SAVE: "Spara", LBL_SAVEAS: "Spara som", LBL_OK: "OK", LBL_ABORT: "Avbryta", LBL_CANCEL: "Avbryt", LBL_CLOSE: "St\xE4ng", LBL_QUIT: "Sluta", LBL_YES: "Ja", LBL_NO: "Nej", LBL_GO: "G\xE5", LBL_MKDIR: "Skapa ny katalog", LBL_MKFILE: "Skapa ny fil", LBL_COPY: "Kopiera", LBL_PASTE: "Klistra in", LBL_CUT: "Klipp ut", LBL_MOVE: "Flytta", LBL_RENAME: "D\xF6p om", LBL_DELETE: "Radera", LBL_DOWNLOAD: "Ladda ner", LBL_REFRESH: "Uppdatera", LBL_RELOAD: "Ladda om", LBL_HOME: "Hem", LBL_VIEW: "Se", LBL_HELP: "Hj\xE4lp", LBL_ABOUT: "Om", LBL_APPLICATION: "Ans\xF6kan", LBL_APPLICATIONS: "Applikationer", LBL_KILL: "D\xF6da", LBL_KILL_ALL: "D\xF6da alla", LBL_MINIMIZE: "Minimera", LBL_MAXIMIZE: "Maximera", LBL_RESTORE: "\xC5terst\xE4ll", LBL_RAISE: "H\xF6j", LBL_SHADE: "Skugga", LBL_UNSHADE: "Avskugga", LBL_ONTOP: "\xD6verst", LBL_RESIZE: "\xC4ndra storlek", LBL_BACK: "Back", LBL_FORWARD: "Forward", LBL_UPLOAD: "Ladda upp", LBL_IMAGE: "Bild", LBL_CREATE_SHORTCUT: "Skapa genv\xE4g", LBL_REMOVE_SHORTCUT: "ta bort genv\xE4g", LBL_EDIT: "Redigera" }, hr = n(25), Lr = n.n(hr), _r = ["file"];
        function vr(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function mr(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? vr(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : vr(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        function yr(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var Er = function(e3) {
          E()(n2, e3);
          var t2 = yr(n2);
          function n2(e4, r2, o2) {
            var i2, a2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            return d()(this, n2), (i2 = t2.call(this, "BasicApplication<" + r2.name + ">")).core = e4, i2.proc = r2, i2.win = o2, i2.options = mr({ mimeTypes: r2.metadata.mimes || [], loadMimeTypes: [], saveMimeTypes: [], defaultFilename: "New File" }, a2), i2;
          }
          return h2()(n2, [{ key: "destroy", value: function() {
            this.off(), m()(B()(n2.prototype), "destroy", this).call(this);
          } }, { key: "init", value: function() {
            return this.proc.args.file ? this.open(this.proc.args.file) : this.create(), Promise.resolve(true);
          } }, { key: "getDialogOptions", value: function(e4) {
            var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = t3.file, r2 = Lr()(t3, _r), o2 = this.options, i2 = o2.defaultFilename, a2 = o2.mimeTypes, s2 = o2.loadMimeTypes, c2 = o2.saveMimeTypes, u2 = n3 || this.proc.args.file, l2 = this.core.config("vfs.defaultPath"), f2 = u2 ? u2.path : null, d2 = "open" === e4 ? s2 : c2;
            return d2.length || (d2 = a2), [mr({ type: e4, mime: d2, filename: f2 ? Dt(f2) : i2, path: f2 ? Mt(f2) : l2 }, r2), { parent: this.win, attributes: { modal: true } }];
          } }, { key: "updateWindowTitle", value: function() {
            if (this.win) {
              var e4 = (0, this.core.make("osjs/locale").translatableFlat)(this.proc.metadata.title), t3 = this._createTitle(e4);
              this.win.setTitle(t3);
            }
          } }, { key: "createDialog", value: function(e4, t3) {
            var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r2 = this.getDialogOptions(e4, n3), o2 = et()(r2, 2), i2 = o2[0], a2 = o2[1];
            this.core.has("osjs/dialog") && this.core.make("osjs/dialog", "file", i2, a2, function(e5, n4) {
              "ok" === e5 && t3(n4);
            });
          } }, { key: "open", value: function(e4) {
            this._setFile(e4, "open-file");
          } }, { key: "save", value: function(e4) {
            this._setFile(e4, "save-file");
          } }, { key: "create", value: function() {
            this.proc.args.file = null, this.emit("new-file"), this.updateWindowTitle();
          } }, { key: "createNew", value: function() {
            this.create();
          } }, { key: "createSaveDialog", value: function() {
            var e4 = this, t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.createDialog("save", function(t4) {
              return e4.save(t4);
            }, t3);
          } }, { key: "createOpenDialog", value: function() {
            var e4 = this, t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.createDialog("open", function(t4) {
              return e4.open(t4);
            }, t3);
          } }, { key: "_setFile", value: function(e4, t3) {
            this.proc.args.file = mr({}, e4), this.emit(t3, e4), this.updateWindowTitle();
          } }, { key: "_createTitle", value: function(e4) {
            var t3 = this.proc.args.file ? Dt(this.proc.args.file.path) : this.options.defaultFilename;
            return t3 ? "".concat(e4, " - ").concat(t3) : e4;
          } }]), n2;
        }(T.EventEmitter);
        function gr(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function Or(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var Ar = function(e3) {
          E()(n2, e3);
          var t2 = Or(n2);
          function n2(e4) {
            var r2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return d()(this, n2), (r2 = t2.call(this, e4, o2)).session = new Gn(e4), r2.tray = new Jn(e4), r2.pm = new Xn(e4), r2.clipboard = new er(), r2.middleware = new tr(), window.OSjs = r2.createGlobalApi(), r2;
          }
          return h2()(n2, [{ key: "provides", value: function() {
            return ["osjs/application", "osjs/basic-application", "osjs/window", "osjs/windows", "osjs/event-handler", "osjs/window-behaviour", "osjs/dnd", "osjs/dom", "osjs/clipboard", "osjs/middleware", "osjs/tray", "osjs/locale", "osjs/packages", "osjs/websocket", "osjs/session", "osjs/theme", "osjs/sounds"];
          } }, { key: "destroy", value: function() {
            this.tray.destroy(), this.pm.destroy(), this.clipboard.destroy(), this.middleware.destroy(), this.session.destroy(), m()(B()(n2.prototype), "destroy", this).call(this);
          } }, { key: "init", value: function() {
            var e4 = this;
            return this.registerContracts(), this.core.on("osjs/core:started", function() {
              e4.session.load();
            }), this.pm.init();
          } }, { key: "start", value: function() {
            var e4 = this;
            this.core.config("development") && (this.core.on("osjs/dist:changed", function(t3) {
              e4._onDistChanged(t3);
            }), this.core.on("osjs/packages:package:changed", function(t3) {
              e4._onPackageChanged(t3);
            })), this.core.on("osjs/packages:metadata:changed", function() {
              e4.pm.init();
            });
          } }, { key: "registerContracts", value: function() {
            var e4 = this;
            this.core.instance("osjs/window", function() {
              var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return new Ae(e4.core, t3);
            }), this.core.instance("osjs/application", function() {
              var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return new Ne(e4.core, t3);
            }), this.core.instance("osjs/basic-application", function(t3, n3) {
              var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              return new Er(e4.core, t3, n3, r2);
            }), this.core.instance("osjs/websocket", function(e5, t3) {
              var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              return new q(e5, t3, n3);
            }), this.core.instance("osjs/event-emitter", function(e5) {
              return new T.EventEmitter(e5);
            }), this.core.singleton("osjs/windows", function() {
              return e4.createWindowContract();
            }), this.core.singleton("osjs/locale", function() {
              return e4.createLocaleContract();
            }), this.core.singleton("osjs/dnd", function() {
              return e4.createDnDContract();
            }), this.core.singleton("osjs/dom", function() {
              return e4.createDOMContract();
            }), this.core.singleton("osjs/theme", function() {
              return e4.createThemeContract();
            }), this.core.singleton("osjs/sounds", function() {
              return e4.createSoundsContract();
            }), this.core.singleton("osjs/session", function() {
              return e4.createSessionContract();
            }), this.core.singleton("osjs/packages", function() {
              return e4.createPackagesContract();
            }), this.core.singleton("osjs/clipboard", function() {
              return e4.createClipboardContract();
            }), this.core.singleton("osjs/middleware", function() {
              return e4.createMiddlewareContract();
            }), this.core.instance("osjs/tray", function(t3, n3) {
              return void 0 !== t3 ? (D.warn("osjs/tray usage without .create() is deprecated"), e4.tray.create(t3, n3)) : e4.createTrayContract();
            }), this.core.singleton("osjs/window-behavior", function() {
              return "function" == typeof e4.options.windowBehavior ? e4.options.windowBehavior(e4.core) : new An(e4.core);
            }), this.core.instance("osjs/event-handler", function() {
              D.warn("osjs/event-handler is deprecated, use osjs/event-emitter");
              for (var e5 = arguments.length, t3 = new Array(e5), n3 = 0; n3 < e5; n3++) t3[n3] = arguments[n3];
              return Hn()(T.EventEmitter, t3);
            });
          } }, { key: "createGlobalApi", value: function() {
            var e4 = this, t3 = this.core.config("providers.globalBlacklist", []), n3 = this.core.config("providers.globalWhitelist", []);
            return Object.freeze({ make: function(r2) {
              var o2;
              if (e4.core.has(r2)) {
                var i2 = t3.length > 0 && -1 !== t3.indexOf(r2), a2 = n3.length > 0 && -1 === n3.indexOf(r2);
                if (i2 || a2) throw new Error("The provider '".concat(r2, "' cannot be used via global scope"));
              }
              for (var s2 = arguments.length, c2 = new Array(s2 > 1 ? s2 - 1 : 0), u2 = 1; u2 < s2; u2++) c2[u2 - 1] = arguments[u2];
              return (o2 = e4.core).make.apply(o2, [r2].concat(c2));
            }, register: function(t4, n4) {
              return e4.pm.register(t4, n4);
            }, url: function(t4, n4, r2) {
              return e4.core.url(t4, n4, r2);
            }, run: function(t4) {
              var n4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              return e4.core.run(t4, n4, r2);
            }, open: function(t4) {
              var n4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return e4.core.open(t4, n4);
            }, request: function(t4, n4, r2) {
              return e4.core.request(t4, n4, r2);
            }, middleware: function(t4, n4) {
              return e4.middleware.add(t4, n4);
            } });
          } }, { key: "_onDistChanged", value: function(e4) {
            var t3 = this.core.url(e4).replace(/^\//, ""), n3 = this.core.$resourceRoot.querySelectorAll("link[rel=stylesheet]"), r2 = Array.from(n3).reduce(function(e5, t4) {
              var n4 = t4.getAttribute("href").split("?")[0].replace(/^\//, "");
              return function(e6) {
                for (var t5 = 1; t5 < arguments.length; t5++) {
                  var n5 = null != arguments[t5] ? arguments[t5] : {};
                  t5 % 2 ? gr(Object(n5), true).forEach(function(t6) {
                    l()(e6, t6, n5[t6]);
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(n5)) : gr(Object(n5)).forEach(function(t6) {
                    Object.defineProperty(e6, t6, Object.getOwnPropertyDescriptor(n5, t6));
                  });
                }
                return e6;
              }(l()({}, n4, t4), e5);
            }, {});
            r2[t3] && (D.debug("Hot-reloading", t3), setTimeout(function() {
              r2[t3].setAttribute("href", t3);
            }, 100));
          } }, { key: "_onPackageChanged", value: function(e4) {
            Ne.getApplications().filter(function(t3) {
              return t3.metadata.name === e4;
            }).forEach(function(e5) {
              return e5.relaunch();
            });
          } }, { key: "createLocaleContract", value: function() {
            var e4, t3 = this, n3 = S()(i, this.options.locales || {}), r2 = Ke(this.core)(n3);
            return { format: (e4 = this.core, function(t4, n4) {
              var r3 = Fe(e4, "format." + n4), o2 = r3.defaultLocale, i2 = r3.userLocale || o2 || n4;
              return Ie()(t4, i2);
            }), translate: r2, translatable: Ke(this.core), translatableFlat: Ge(this.core), getLocale: function() {
              var e5 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "language", n4 = Fe(t3.core, e5);
              return n4.userLocale || n4.defaultLocale;
            }, setLocale: function(e5) {
              return e5 in n3 ? t3.core.make("osjs/settings").set("osjs/locale", "language", e5).save().then(function() {
                return t3.core.emit("osjs/locale:change", e5);
              }) : Promise.reject(r2("ERR_INVALID_LOCALE", e5));
            } };
          } }, { key: "createWindowContract", value: function() {
            var e4 = this;
            return { create: function() {
              var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return new Ae(e4.core, t3);
            }, list: function() {
              return Ae.getWindows();
            }, last: function() {
              return Ae.lastWindow();
            } };
          } }, { key: "createDnDContract", value: function() {
            return r;
          } }, { key: "createDOMContract", value: function() {
            return { script: le, style: ue };
          } }, { key: "createThemeContract", value: function() {
            var e4 = $t(this.core);
            return { resource: e4.themeResource, icon: e4.icon };
          } }, { key: "createSoundsContract", value: function() {
            var e4 = $t(this.core), t3 = e4.soundResource, n3 = e4.soundsEnabled;
            return { resource: t3, play: function(e5) {
              var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              if (n3()) {
                var o2 = e5.match(/^(\/|https?:)/) ? e5 : t3(e5);
                if (o2) return pe(o2, r2);
              }
              return false;
            } };
          } }, { key: "createSessionContract", value: function() {
            var e4 = this;
            return { save: function() {
              return e4.session.save();
            }, load: function() {
              var t3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              return e4.session.load(t3);
            } };
          } }, { key: "createPackagesContract", value: function() {
            var e4 = this;
            return { launch: function(t3) {
              var n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              return e4.pm.launch(t3, n3, r2);
            }, register: function(t3, n3) {
              return e4.pm.register(t3, n3);
            }, addPackages: function(t3) {
              return e4.pm.addPackages(t3);
            }, getPackages: function(t3) {
              return e4.pm.getPackages(t3);
            }, getCompatiblePackages: function(t3) {
              return e4.pm.getCompatiblePackages(t3);
            }, running: function() {
              return e4.pm.running();
            }, getMetadataFromName: function(t3) {
              return e4.pm.getMetadataFromName(t3);
            } };
          } }, { key: "createClipboardContract", value: function() {
            var e4 = this;
            return { clear: function() {
              return e4.clipboard.clear();
            }, set: function(t3, n3) {
              return e4.clipboard.set(t3, n3);
            }, has: function(t3) {
              return e4.clipboard.has(t3);
            }, get: function() {
              var t3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              return e4.clipboard.get(t3);
            } };
          } }, { key: "createMiddlewareContract", value: function() {
            var e4 = this;
            return { add: function(t3, n3) {
              return e4.middleware.add(t3, n3);
            }, get: function(t3) {
              return e4.middleware.get(t3);
            } };
          } }, { key: "createTrayContract", value: function() {
            var e4 = this;
            return { create: function(t3, n3) {
              return e4.tray.create(t3, n3);
            }, remove: function(t3) {
              return e4.tray.remove(t3);
            }, list: function() {
              return e4.tray.list();
            }, has: function(t3) {
              return e4.tray.has(t3);
            } };
          } }]), n2;
        }(Ce.ServiceProvider);
        function Br(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var br = function(e3) {
          E()(n2, e3);
          var t2 = Br(n2);
          function n2(e4) {
            var r2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return d()(this, n2), (r2 = t2.call(this, e4, o2 || {})).desktop = new dn(r2.core, r2.options), r2;
          }
          return h2()(n2, [{ key: "destroy", value: function() {
            this.desktop = this.desktop.destroy();
          } }, { key: "provides", value: function() {
            return ["osjs/desktop"];
          } }, { key: "init", value: function() {
            var e4 = this;
            this.desktop.init(), this.core.singleton("osjs/desktop", function() {
              return e4.createDesktopContract();
            }), this.core.on("osjs/core:started", function() {
              e4.desktop.applySettings();
            });
          } }, { key: "start", value: function() {
            this.desktop.start();
          } }, { key: "createDesktopContract", value: function() {
            var e4 = this;
            return { setKeyboardContext: function(t3) {
              return e4.desktop.setKeyboardContext(t3);
            }, openContextMenu: function(t3) {
              return e4.desktop.onContextMenu(t3);
            }, addContextMenuEntries: function(t3) {
              return e4.desktop.addContextMenu(t3);
            }, applySettings: function(t3) {
              return e4.desktop.applySettings(t3);
            }, createDropContextMenu: function(t3) {
              return e4.desktop.createDropContextMenu(t3);
            }, getRect: function() {
              return e4.desktop.getRect();
            } };
          } }]), n2;
        }(Ce.ServiceProvider);
        function Sr(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var Tr = function(e3) {
          E()(n2, e3);
          var t2 = Sr(n2);
          function n2(e4) {
            var r2;
            return d()(this, n2), (r2 = t2.call(this, e4)).notifications = new vn(e4), r2;
          }
          return h2()(n2, [{ key: "destroy", value: function() {
            this.notifications.destroy();
          } }, { key: "provides", value: function() {
            return ["osjs/notification"];
          } }, { key: "init", value: function() {
            var e4 = this;
            return this.core.instance("osjs/notification", function(t3) {
              return e4.notifications.create(t3);
            }), this.notifications.init();
          } }]), n2;
        }(Ce.ServiceProvider);
        function Pr(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        var wr = {}, Rr = function(e3) {
          return function(e4) {
            for (var t2 = 1; t2 < arguments.length; t2++) {
              var n2 = null != arguments[t2] ? arguments[t2] : {};
              t2 % 2 ? Pr(Object(n2), true).forEach(function(t3) {
                l()(e4, t3, n2[t3]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(n2)) : Pr(Object(n2)).forEach(function(t3) {
                Object.defineProperty(e4, t3, Object.getOwnPropertyDescriptor(n2, t3));
              });
            }
            return e4;
          }({ id: null }, "string" == typeof e3 ? { path: e3 } : e3);
        }, Nr = function(e3, t2) {
          return function(n2) {
            return Promise.resolve(n2.map(function(e4) {
              return It(e4);
            })).then(function(n3) {
              return jt(Rr(e3), n3, { showHiddenFiles: false !== t2.showHiddenFiles, filter: t2.filter });
            });
          };
        }, jr = function(e3, t2) {
          return function(n2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o2 = wr[t2.name];
            return o2 ? Promise.resolve(o2) : e3.capabilities(Rr(n2), r2, t2).then(function(e4) {
              return wr[t2.name] = e4, e4;
            });
          };
        }, Cr = function(e3, t2) {
          return function(n2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return e3.readdir(Rr(n2), r2, t2).then(Nr(n2, r2));
          };
        }, kr = function(e3, t2) {
          return function(n2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "string", o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return e3.readfile(Rr(n2), r2, o2, t2).then(function(e4) {
              return Ct(e4.body, e4.mime, r2);
            });
          };
        }, Ir = function(e3, t2) {
          return function(n2, r2) {
            var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i2 = r2 instanceof ArrayBuffer || r2 instanceof Blob ? r2 : new Blob([r2], { type: "application/octet-stream" });
            return e3.writefile(Rr(n2), i2, o2, t2);
          };
        }, Dr = function(e3, t2) {
          return function(n2, r2) {
            var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return e3.copy(Rr(n2), Rr(r2), o2, t2);
          };
        }, Mr = function(e3, t2) {
          return function(n2, r2) {
            var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return e3.rename(Rr(n2), Rr(r2), o2, t2);
          };
        }, xr = Mr, Fr = function(e3, t2) {
          return function(n2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return e3.mkdir(Rr(n2), r2, t2);
          };
        }, Ur = function(e3, t2) {
          return function(n2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return e3.unlink(Rr(n2), r2, t2);
          };
        }, Hr = function(e3, t2) {
          return function(n2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return e3.exists(Rr(n2), r2, t2);
          };
        }, Gr = function(e3, t2) {
          return function(n2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return e3.stat(Rr(n2), r2, t2).then(function(e4) {
              return It(e4);
            });
          };
        }, Kr = function(e3, t2) {
          return function(n2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return e3.url(Rr(n2), r2, t2);
          };
        }, Wr = function(e3, t2) {
          return function(n2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return "function" == typeof e3.download && true !== r2.readfile ? e3.download(Rr(n2), r2, t2) : kr(e3)(n2, "blob").then(function(e4) {
              var t3 = Rr(n2).path.split("/").splice(-1)[0], r3 = window.URL.createObjectURL(e4), o2 = document.createElement("a");
              o2.style.display = "none", o2.href = r3, o2.download = t3, document.body.appendChild(o2), o2.click(), setTimeout(function() {
                window.URL.revokeObjectURL(r3), o2.remove();
              }, 1);
            });
          };
        }, Vr = function(e3, t2) {
          return function(n2, r2) {
            var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return t2.attributes && false === t2.attributes.searchable ? Promise.resolve([]) : e3.search(Rr(n2), r2, o2, t2).then(Nr(n2, o2));
          };
        }, $r = function(e3, t2) {
          return function(n2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return e3.touch(Rr(n2), r2, t2);
          };
        }, zr = { capabilities: function(e3, t2) {
          return Promise.resolve({});
        }, readdir: function(e3, t2) {
          return Promise.resolve([]);
        }, readfile: function(e3, t2, n2) {
          return Promise.resolve({ body: new ArrayBuffer(), mime: "application/octet-stream" });
        }, writefile: function(e3, t2, n2) {
          return Promise.resolve(-1);
        }, copy: function(e3, t2, n2) {
          return Promise.resolve(false);
        }, rename: function(e3, t2, n2) {
          return Promise.resolve(false);
        }, mkdir: function(e3, t2) {
          return Promise.resolve(false);
        }, unlink: function(e3, t2) {
          return Promise.resolve(false);
        }, exists: function(e3, t2) {
          return Promise.resolve(false);
        }, stat: function(e3, t2) {
          return Promise.resolve({});
        }, url: function(e3, t2) {
          return Promise.resolve(null);
        }, mount: function(e3) {
          return Promise.resolve(true);
        }, unmount: function(e3) {
          return Promise.resolve(true);
        }, search: function(e3, t2, n2) {
          return Promise.resolve([]);
        }, touch: function(e3, t2) {
          return Promise.resolve(false);
        } };
        function Yr(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function Zr(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Yr(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Yr(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var qr = ["capabilities", "exists", "stat", "readdir", "readfile"], Xr = function(e3) {
          var t2 = /* @__PURE__ */ function(e4) {
            return function(t3, n2, r2) {
              var o2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
              return e4.request("/vfs/".concat(t3), Zr({ body: n2, method: -1 !== qr.indexOf(t3) ? "get" : "post" }, o2), r2).then(function(e5) {
                if ("json" === r2) return { mime: "application/json", body: e5 };
                if ("writefile" === t3) return e5.json();
                var n3 = e5.headers.get("content-type") || "application/octet-stream";
                return e5.arrayBuffer().then(function(e6) {
                  return { mime: n3, body: e6 };
                });
              });
            };
          }(e3);
          return function(e4, t3) {
            var n2 = function(e5) {
              return function(n3, r2) {
                var o2 = n3.path;
                return t3(e5, { path: o2, options: r2 }, "json").then(function(e6) {
                  return e6.body;
                });
              };
            };
            return { capabilities: n2("capabilities"), readdir: function(e5, n3) {
              var r2 = e5.path;
              return t3("readdir", { path: r2, options: n3 }, "json").then(function(e6) {
                return e6.body;
              });
            }, readfile: function(e5, n3, r2) {
              var o2 = e5.path;
              return t3("readfile", { path: o2, options: r2 });
            }, writefile: function(e5, n3) {
              var r2 = e5.path, o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i2 = new FormData();
              return i2.append("upload", n3), i2.append("path", r2), i2.append("options", o2), t3("writefile", i2, void 0, { onProgress: o2.onProgress, xhr: !!o2.onProgress });
            }, copy: function(e5, n3, r2) {
              return t3("copy", { from: e5.path, to: n3.path, options: r2 }, "json").then(function(e6) {
                return e6.body;
              });
            }, rename: function(e5, n3, r2) {
              return t3("rename", { from: e5.path, to: n3.path, options: r2 }, "json").then(function(e6) {
                return e6.body;
              });
            }, mkdir: n2("mkdir"), unlink: n2("unlink"), exists: n2("exists"), stat: n2("stat"), url: function(t4, n3) {
              var r2 = t4.path;
              return Promise.resolve(e4.url("/vfs/readfile?path=".concat(encodeURIComponent(r2))));
            }, search: function(e5, n3, r2) {
              var o2 = e5.path;
              return t3("search", { root: o2, pattern: n3, options: r2 }, "json").then(function(e6) {
                return e6.body;
              });
            }, touch: function(e5, n3) {
              var r2 = e5.path;
              return t3("touch", { path: r2, options: n3 }, "json").then(function(e6) {
                return e6.body;
              });
            }, download: function(e5) {
              var t4 = e5.path, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = encodeURIComponent(JSON.stringify({ download: true }));
              return Promise.resolve("/vfs/readfile?options=".concat(r2, "&path=") + encodeURIComponent(t4)).then(function(e6) {
                return (n3.target || window).open(e6);
              });
            } };
          }(e3, t2);
        }, Qr = function(e3) {
          var t2 = e3.make("osjs/packages");
          return { readdir: function(n2, r2) {
            var o2 = n2.path;
            return Promise.resolve(t2.getPackages()).then(function(t3) {
              return t3.map(function(t4) {
                return { isDirectory: false, isFile: true, filename: t4.name, mime: "osjs/application", path: "".concat(o2.replace(/(\/+)?$/, "/")).concat(t4.name), size: 0, stat: {}, icon: t4.icon ? e3.url(t4.icon, {}, t4) : null };
              });
            });
          } };
        };
        function Jr(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function eo(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Jr(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Jr(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        function to(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var no = function(e3) {
          E()(n2, e3);
          var t2 = to(n2);
          function n2(e4) {
            var r2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return d()(this, n2), o2 = eo({ adapters: {}, mounts: [] }, o2), (r2 = t2.call(this, "Filesystem")).core = e4, r2.adapters = eo(eo({ system: Xr, apps: Qr }, r2.core.config("vfs.adapters", {})), o2.adapters), r2.mounts = [], r2.options = {}, r2.proxy = Object.keys(a).reduce(function(e5, t3) {
              return eo(l()({}, t3, function() {
                for (var e6, n3 = arguments.length, o3 = new Array(n3), i2 = 0; i2 < n3; i2++) o3[i2] = arguments[i2];
                return (e6 = r2)._request.apply(e6, [t3].concat(o3));
              }), e5);
            }, {}), r2;
          }
          return h2()(n2, [{ key: "mountAll", value: function() {
            var e4 = this, t3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            this.mounts = this._getConfiguredMountpoints();
            var n3 = function(n4) {
              return t3 ? e4._mountpointAction(n4) : e4._mountpointAction(n4).catch(function(e5) {
                return D.warn("Error while mounting", n4, e5);
              });
            };
            return Promise.all(this.mounts.map(n3));
          } }, { key: "addMountpoint", value: function(e4) {
            var t3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n3 = this.createMountpoint(e4);
            return this.mounts.push(n3), t3 ? this.mount(n3.name) : Promise.resolve(true);
          } }, { key: "mount", value: function(e4) {
            return "string" == typeof e4 ? this._mountAction(e4, false) : this.addMountpoint(e4);
          } }, { key: "unmount", value: function(e4) {
            return this._mountAction(e4, true);
          } }, { key: "_mountpointAction", value: function(e4) {
            var t3 = this, n3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r2 = n3 ? "unmounted" : "mounted", o2 = n3 ? "unmount" : "mount";
            return e4._adapter[o2]({}, e4).then(function(i2) {
              return i2 && (e4.mounted = !n3, t3.emit(r2, e4), t3.core.emit("osjs/fs:" + o2)), i2;
            });
          } }, { key: "_mountAction", value: function(e4, t3) {
            var n3 = this;
            return Promise.resolve(this.mounts.find(function(t4) {
              return t4.name === e4;
            })).then(function(r2) {
              var o2 = n3.core.make("osjs/locale").translate;
              if (!r2) throw new Error(o2("ERR_VFS_MOUNT_NOT_FOUND", e4));
              if (t3 && !r2.mounted) throw new Error(o2("ERR_VFS_MOUNT_NOT_MOUNTED", e4));
              if (!t3 && r2.mounted) throw new Error(o2("ERR_VFS_MOUNT_ALREADY_MOUNTED", e4));
              return n3._mountpointAction(r2, t3);
            });
          } }, { key: "request", value: function() {
            return this.proxy;
          } }, { key: "_request", value: function(e4) {
            for (var t3, n3 = this, r2 = arguments.length, o2 = new Array(r2 > 1 ? r2 - 1 : 0), i2 = 1; i2 < r2; i2++) o2[i2 - 1] = arguments[i2];
            var a2 = "osjs/vfs:".concat(e4), s2 = function(t4) {
              var r3;
              ((r3 = n3.core).emit.apply(r3, ["".concat(a2, ":done")].concat(o2)), !t4 && n3.core.config("vfs.watch")) && Ut(e4, o2).forEach(function(e5) {
                var t5 = et()(e5, 2), r4 = t5[0], o3 = t5[1];
                return n3.core.emit(r4, o3);
              });
            };
            return (t3 = this.core).emit.apply(t3, [a2].concat(o2)), this._requestAction.apply(this, [e4].concat(o2)).then(function(e5) {
              return s2(), e5;
            }).catch(function(e5) {
              throw s2(e5), e5;
            });
          } }, { key: "_requestAction", value: function(e4) {
            for (var t3 = arguments.length, n3 = new Array(t3 > 1 ? t3 - 1 : 0), r2 = 1; r2 < t3; r2++) n3[r2 - 1] = arguments[r2];
            if (-1 !== ["rename", "move", "copy"].indexOf(e4)) {
              var o2 = n3[0], i2 = n3[1], s2 = this.getMountpointFromPath(o2), c2 = this.getMountpointFromPath(i2), u2 = s2.adapter === c2.adapter;
              if (!u2) return kr(s2._adapter, s2)(o2).then(function(e5) {
                return Ir(c2._adapter, c2)(i2, e5);
              }).then(function(t4) {
                return "rename" === e4 ? Ur(s2._adapter, s2)(o2).then(function() {
                  return t4;
                }) : t4;
              });
            }
            var l2 = n3[0], f2 = this.getMountpointFromPath(l2);
            return a[e4](f2._adapter, f2).apply(void 0, n3);
          } }, { key: "createMountpoint", value: function(e4) {
            var t3 = e4.adapter || this.core.config("vfs.defaultAdapter"), n3 = eo(eo({}, zr), this.adapters[t3](this.core)), r2 = S()({ enabled: true, mounted: false, adapter: t3, attributes: { visibility: "global", local: true, searchable: true, readOnly: false } }, e4);
            return eo({ _adapter: n3, label: t3, root: "".concat(r2.name || t3, ":/") }, r2);
          } }, { key: "getMountpointFromPath", value: function(e4) {
            var t3 = "string" == typeof e4 ? e4 : e4.path, n3 = xt(t3), r2 = this.core.make("osjs/locale").translate;
            if (!n3) throw new Error(r2("ERR_VFS_PATH_FORMAT_INVALID", t3));
            var o2 = this.mounts.find(function(e5) {
              return e5.name === n3;
            });
            if (!o2) throw new Error(r2("ERR_VFS_MOUNT_NOT_FOUND_FOR", "".concat(n3, ":")));
            return o2;
          } }, { key: "getMounts", value: function() {
            var e4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t3 = this.core.getUser(), n3 = this.core.make("osjs/theme"), r2 = function(e5) {
              return e5 ? "string" == typeof e5 ? e5 : n3.icon(e5.name) : n3.icon("drive-harddisk");
            };
            return this.mounts.filter(function(t4) {
              return e4 || t4.mounted;
            }).filter(function(e5) {
              return false !== e5.enabled;
            }).filter(function(e5) {
              var n4 = e5.attributes ? e5.attributes.groups : [], r3 = !e5.attributes || false !== e5.attributes.strictGroups;
              return Ft(t3.groups)(n4, r3);
            }).map(function(e5) {
              return { attributes: eo({}, e5.attributes), icon: r2(e5.icon), name: e5.name, label: e5.label, root: e5.root };
            });
          } }, { key: "_getConfiguredMountpoints", value: function() {
            var e4 = this;
            return [].concat(c()(this.core.config("vfs.mountpoints", [])), c()(this.options.mounts || [])).map(function(t3) {
              try {
                return e4.createMountpoint(t3);
              } catch (e5) {
                D.warn("Error while creating mountpoint", e5);
              }
              return null;
            }).filter(function(e5, t3, n3) {
              return n3.findIndex(function(t4) {
                return t4.label === e5.label || t4.root === e5.label;
              }) === t3 || (D.warn("Removed duplicate mountpoint", e5), false);
            }).filter(function(e5) {
              return null !== e5;
            });
          } }]), n2;
        }(T.EventEmitter);
        function ro(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var oo = function(e3) {
          E()(n2, e3);
          var t2 = ro(n2);
          function n2(e4) {
            var r2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return d()(this, n2), (r2 = t2.call(this, e4)).fs = new no(e4, { adapters: o2.adapters || {}, mounts: o2.mounts || [] }), r2;
          }
          return h2()(n2, [{ key: "provides", value: function() {
            return ["osjs/vfs", "osjs/fs"];
          } }, { key: "init", value: function() {
            var e4 = this;
            return this.core.singleton("osjs/vfs", function() {
              return e4.createVFSContract();
            }), this.core.singleton("osjs/fs", function() {
              return e4.createFilesystemContract();
            }), this.fs.mountAll(false);
          } }, { key: "createVFSContract", value: function() {
            return this.fs.request();
          } }, { key: "createFilesystemContract", value: function() {
            var e4 = this, t3 = this.core.config("vfs.icons", {});
            return { basename: function(e5) {
              return Dt(e5);
            }, pathname: function(e5) {
              return Mt(e5);
            }, pathJoin: function() {
              return At.apply(o, arguments);
            }, icon: kt(t3), mountpoints: function() {
              var t4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              return e4.fs.getMounts(t4);
            }, addMountpoint: function(t4) {
              var n3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              return e4.fs.addMountpoint(t4, n3);
            }, mount: function(t4) {
              return e4.fs.mount(t4);
            }, unmount: function(t4) {
              return e4.fs.unmount(t4);
            } };
          } }]), n2;
        }(Ce.ServiceProvider);
        function io(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var ao = function(e3) {
          E()(n2, e3);
          var t2 = io(n2);
          function n2(e4) {
            var r2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return d()(this, n2), (r2 = t2.call(this, e4)).auth = new Fn(e4, o2), r2;
          }
          return h2()(n2, [{ key: "init", value: function() {
            var e4 = this;
            return this.core.singleton("osjs/auth", function() {
              return e4.createAuthContract();
            }), this.auth.init();
          } }, { key: "destroy", value: function() {
            return this.auth.destroy(), m()(B()(n2.prototype), "destroy", this).call(this);
          } }, { key: "provides", value: function() {
            return ["osjs/auth"];
          } }, { key: "createAuthContract", value: function() {
            var e4 = this;
            return { show: function(t3) {
              return e4.auth.show(t3);
            }, login: function(t3) {
              return e4.auth.login(t3);
            }, logout: function(t3) {
              return e4.auth.logout(t3);
            }, user: function() {
              return e4.core.getUser();
            } };
          } }]), n2;
        }(Ce.ServiceProvider), so = n(17), co = n.n(so), uo = function(e3) {
          var t2 = e3.config("settings.prefix", "");
          return { clear: function(e4) {
            return e4 ? localStorage.removeItem(t2 + e4) : localStorage.clear(), Promise.resolve(true);
          }, save: function(e4) {
            return Object.keys(e4).forEach(function(n2) {
              localStorage.setItem(t2 + n2, JSON.stringify(e4[n2]));
            }), Promise.resolve(true);
          }, load: function() {
            var e4 = Object.keys(localStorage).filter(function(e5) {
              return !t2 || e5.startsWith(t2);
            }).map(function(e5) {
              var n2 = localStorage.getItem(e5), r2 = t2 ? e5.substr(t2.length) : e5;
              try {
                return [r2, JSON.parse(n2)];
              } catch (t3) {
                D.warn("localStorageAdapter parse failed for '".concat(e5, "'"), t3);
              }
              return [r2, n2];
            });
            return Promise.resolve(Object.fromEntries(e4));
          } };
        };
        function lo(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function fo(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? lo(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : lo(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        var po = { server: function(e3) {
          return { save: function(t2) {
            return e3.request(e3.url("/settings"), { method: "post", body: t2 }, "json");
          }, load: function() {
            return e3.request(e3.url("/settings"), { method: "get" }, "json");
          } };
        }, localStorage: uo }, ho = function() {
          function e3(t2, n2) {
            d()(this, e3), this.adapter = function(e4, t3) {
              return fo({ load: function() {
                return Promise.reject(new Error("Not implemented"));
              }, save: function() {
                return Promise.reject(new Error("Not implemented"));
              }, init: function() {
                return Promise.resolve(true);
              }, clear: function() {
                return Promise.resolve(true);
              }, destroy: function() {
              } }, (e4.config("standalone") ? uo : "function" == typeof t3.adapter ? t3.adapter : po[t3.adapter || "localStorage"])(e4, t3.config));
            }(t2, n2), this.debounce = null, this.settings = {}, this.core = t2;
          }
          return h2()(e3, [{ key: "init", value: function() {
            return this.adapter.init();
          } }, { key: "save", value: function() {
            var e4 = this;
            return new Promise(function(t2, n2) {
              if (e4.debounce) {
                var r2 = et()(e4.debounce, 2), o2 = r2[0], i2 = r2[1];
                o2.resolve(false), e4.debounce = clearTimeout(i2);
              }
              e4.debounce = [{ resolve: t2, reject: n2 }, setTimeout(function() {
                e4.adapter.save(e4.settings).then(function() {
                  e4.core.emit("osjs/settings:save"), t2.apply(void 0, arguments);
                }).catch(n2);
              }, 100)];
            });
          } }, { key: "load", value: function() {
            var e4 = this, t2 = this.core.config("settings.defaults", {});
            return this.adapter.load().then(function(n2) {
              return e4.settings = S()(t2, n2, { arrayMerge: function(e5, t3) {
                return t3;
              } }), e4.core.emit("osjs/settings:load"), true;
            }).catch(function(n2) {
              return D.warn("Failed to set settings", n2), e4.settings = t2, false;
            });
          } }, { key: "get", value: function(e4, t2, n2) {
            if (void 0 === e4) return fo({}, this.settings);
            if (void 0 === this.settings[e4]) return t2 ? n2 : n2 || {};
            var r2 = co()(this.settings[e4]);
            return t2 ? r2.get(t2, n2) : r2.get() || n2;
          } }, { key: "set", value: function(e4, t2, n2) {
            if (-1 !== this.core.config("settings.lock", []).indexOf(e4)) return this;
            if (void 0 === this.settings[e4] && (this.settings[e4] = {}), t2) try {
              var r2 = co()(this.settings[e4]);
              r2.set(t2, n2), this.settings[e4] = r2.get();
            } catch (e5) {
              D.warn("Error while setting settings for", t2, e5);
            }
            else this.settings[e4] = fo({}, n2);
            return this;
          } }, { key: "clear", value: function(e4) {
            var t2 = this;
            return this.adapter.clear(e4).then(function(n2) {
              return n2 && t2.settings[e4] && delete t2.settings[e4], n2;
            });
          } }]), e3;
        }();
        function Lo(e3, t2) {
          var n2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(e3);
            t2 && (r2 = r2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function _o(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? Lo(Object(n2), true).forEach(function(t3) {
              l()(e3, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Lo(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e3;
        }
        function vo(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = B()(e3);
            if (t2) {
              var o2 = B()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return O()(this, n2);
          };
        }
        var mo = function(e3) {
          E()(n2, e3);
          var t2 = vo(n2);
          function n2(e4) {
            var r2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return d()(this, n2), (r2 = t2.call(this, e4)).settings = new ho(e4, _o({ config: {} }, o2)), r2;
          }
          return h2()(n2, [{ key: "provides", value: function() {
            return ["osjs/settings"];
          } }, { key: "init", value: function() {
            var e4 = this;
            return this.core.singleton("osjs/settings", function() {
              return e4.createSettingsContract();
            }), this.settings.init();
          } }, { key: "createSettingsContract", value: function() {
            var e4 = this;
            return { save: function() {
              return e4.settings.save();
            }, load: function() {
              return e4.settings.load();
            }, clear: function(t3) {
              return e4.settings.clear(t3);
            }, get: function(t3, n3, r2) {
              return e4.settings.get(t3, n3, r2);
            }, set: function(t3, n3, r2) {
              return e4.settings.set(t3, n3, r2);
            } };
          } }]), n2;
        }(Ce.ServiceProvider);
      }]);
    });
  }
});

// node_modules/@osjs/panels/dist/main.js
var require_main2 = __commonJS({
  "node_modules/@osjs/panels/dist/main.js"(exports, module) {
    !function(t, e2) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e2() : "function" == typeof define && define.amd ? define("osjsPanels", [], e2) : "object" == typeof exports ? exports.osjsPanels = e2() : t.osjsPanels = e2();
    }(window, function() {
      return function(t) {
        var e2 = {};
        function n(r) {
          if (e2[r]) return e2[r].exports;
          var o = e2[r] = { i: r, l: false, exports: {} };
          return t[r].call(o.exports, o, o.exports, n), o.l = true, o.exports;
        }
        return n.m = t, n.c = e2, n.d = function(t2, e3, r) {
          n.o(t2, e3) || Object.defineProperty(t2, e3, { enumerable: true, get: r });
        }, n.r = function(t2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        }, n.t = function(t2, e3) {
          if (1 & e3 && (t2 = n(t2)), 8 & e3) return t2;
          if (4 & e3 && "object" == typeof t2 && t2 && t2.__esModule) return t2;
          var r = /* @__PURE__ */ Object.create(null);
          if (n.r(r), Object.defineProperty(r, "default", { enumerable: true, value: t2 }), 2 & e3 && "string" != typeof t2) for (var o in t2) n.d(r, o, function(e4) {
            return t2[e4];
          }.bind(null, o));
          return r;
        }, n.n = function(t2) {
          var e3 = t2 && t2.__esModule ? function() {
            return t2.default;
          } : function() {
            return t2;
          };
          return n.d(e3, "a", e3), e3;
        }, n.o = function(t2, e3) {
          return Object.prototype.hasOwnProperty.call(t2, e3);
        }, n.p = "", n(n.s = 12);
      }([function(t, e2) {
        function n(e3) {
          return t.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf : function(t2) {
            return t2.__proto__ || Object.getPrototypeOf(t2);
          }, n(e3);
        }
        t.exports = n;
      }, function(t, e2) {
        t.exports = function(t2, e3) {
          if (!(t2 instanceof e3)) throw new TypeError("Cannot call a class as a function");
        };
      }, function(t, e2) {
        function n(t2, e3) {
          for (var n2 = 0; n2 < e3.length; n2++) {
            var r = e3[n2];
            r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(t2, r.key, r);
          }
        }
        t.exports = function(t2, e3, r) {
          return e3 && n(t2.prototype, e3), r && n(t2, r), t2;
        };
      }, function(t, e2, n) {
        var r = n(14);
        t.exports = function(t2, e3) {
          if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
          t2.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t2, writable: true, configurable: true } }), e3 && r(t2, e3);
        };
      }, function(t, e2, n) {
        var r = n(15), o = n(10);
        t.exports = function(t2, e3) {
          return !e3 || "object" !== r(e3) && "function" != typeof e3 ? o(t2) : e3;
        };
      }, function(t, e2, n) {
        var r = n(21);
        function o(e3, n2, i) {
          return "undefined" != typeof Reflect && Reflect.get ? t.exports = o = Reflect.get : t.exports = o = function(t2, e4, n3) {
            var o2 = r(t2, e4);
            if (o2) {
              var i2 = Object.getOwnPropertyDescriptor(o2, e4);
              return i2.get ? i2.get.call(n3) : i2.value;
            }
          }, o(e3, n2, i || e3);
        }
        t.exports = o;
      }, function(t, e2, n) {
        var r = n(17), o = n(18), i = n(19), a = n(20);
        t.exports = function(t2) {
          return r(t2) || o(t2) || i(t2) || a();
        };
      }, function(t, e2, n) {
        t.exports = n(13);
      }, function(t, e2) {
        function n(t2, e3, n2, r, o, i, a) {
          try {
            var c = t2[i](a), u = c.value;
          } catch (t3) {
            return void n2(t3);
          }
          c.done ? e3(u) : Promise.resolve(u).then(r, o);
        }
        t.exports = function(t2) {
          return function() {
            var e3 = this, r = arguments;
            return new Promise(function(o, i) {
              var a = t2.apply(e3, r);
              function c(t3) {
                n(a, o, i, c, u, "next", t3);
              }
              function u(t3) {
                n(a, o, i, c, u, "throw", t3);
              }
              c(void 0);
            });
          };
        };
      }, function(t, e2, n) {
        (function(e3) {
          t.exports = function(t2) {
            var e4 = {};
            function n2(r) {
              if (e4[r]) return e4[r].exports;
              var o = e4[r] = { i: r, l: false, exports: {} };
              return t2[r].call(o.exports, o, o.exports, n2), o.l = true, o.exports;
            }
            return n2.m = t2, n2.c = e4, n2.d = function(t3, e5, r) {
              n2.o(t3, e5) || Object.defineProperty(t3, e5, { enumerable: true, get: r });
            }, n2.r = function(t3) {
              "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t3, "__esModule", { value: true });
            }, n2.t = function(t3, e5) {
              if (1 & e5 && (t3 = n2(t3)), 8 & e5) return t3;
              if (4 & e5 && "object" == typeof t3 && t3 && t3.__esModule) return t3;
              var r = /* @__PURE__ */ Object.create(null);
              if (n2.r(r), Object.defineProperty(r, "default", { enumerable: true, value: t3 }), 2 & e5 && "string" != typeof t3) for (var o in t3) n2.d(r, o, function(e6) {
                return t3[e6];
              }.bind(null, o));
              return r;
            }, n2.n = function(t3) {
              var e5 = t3 && t3.__esModule ? function() {
                return t3.default;
              } : function() {
                return t3;
              };
              return n2.d(e5, "a", e5), e5;
            }, n2.o = function(t3, e5) {
              return Object.prototype.hasOwnProperty.call(t3, e5);
            }, n2.p = "", n2(n2.s = 2);
          }([function(t2, e4) {
            t2.exports = function(t3, e5) {
              if (!(t3 instanceof e5)) throw new TypeError("Cannot call a class as a function");
            };
          }, function(t2, e4) {
            function n2(t3, e5) {
              for (var n3 = 0; n3 < e5.length; n3++) {
                var r = e5[n3];
                r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(t3, r.key, r);
              }
            }
            t2.exports = function(t3, e5, r) {
              return e5 && n2(t3.prototype, e5), r && n2(t3, r), t3;
            };
          }, function(t2, e4, n2) {
            t2.exports = n2(3);
          }, function(t2, e4, n2) {
            "use strict";
            n2.r(e4), n2.d(e4, "EventEmitter", function() {
              return u;
            });
            var r = n2(0), o = n2.n(r), i = n2(1), a = n2.n(i), c = function(t3) {
              return t3 instanceof Array ? t3 : String(t3).replace(/\s+/g, "").split(",");
            }, u = function() {
              function t3() {
                var e5 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "undefined";
                o()(this, t3), this.name = e5, this.events = {};
              }
              return a()(t3, [{ key: "destroy", value: function() {
                this.events = {};
              } }, { key: "on", value: function(t4, e5) {
                var n3 = this, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                if (r2 = r2 || {}, "function" != typeof e5) throw new TypeError("Invalid callback");
                return c(t4).forEach(function(t5) {
                  n3.events[t5] || (n3.events[t5] = []), n3.events[t5].push({ callback: e5, options: r2 });
                }), this;
              } }, { key: "once", value: function(t4, e5) {
                return this.on(t4, e5, { once: true });
              } }, { key: "off", value: function(t4) {
                var e5 = this, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return c(t4).filter(function(t5) {
                  return !!e5.events[t5];
                }).forEach(function(t5) {
                  if (n3) for (var o2 = e5.events[t5].length; o2--; ) {
                    var i2 = e5.events[t5][o2];
                    (!i2.options.persist || r2) && i2.callback === n3 && e5.events[t5].splice(o2, 1);
                  }
                  else e5.events[t5] = r2 ? [] : e5.events[t5].filter(function(t6) {
                    return true === t6.options.persist;
                  });
                }), this;
              } }, { key: "emit", value: function(t4) {
                for (var e5 = this, n3 = arguments.length, r2 = new Array(n3 > 1 ? n3 - 1 : 0), o2 = 1; o2 < n3; o2++) r2[o2 - 1] = arguments[o2];
                return c(t4).forEach(function(t5) {
                  if (e5.events[t5]) for (var n4 = e5.events[t5].length; n4--; ) {
                    var o3 = e5.events[t5][n4], i2 = o3.options, a2 = o3.callback;
                    try {
                      a2.apply(void 0, r2);
                    } catch (t6) {
                      console.warn(t6);
                    }
                    i2 && i2.once && e5.events[t5].splice(n4, 1);
                  }
                }), this;
              } }]), t3;
            }();
          }]);
        }).call(this, n(16));
      }, function(t, e2) {
        t.exports = function(t2) {
          if (void 0 === t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t2;
        };
      }, function(t, e2) {
        t.exports = function(t2, e3) {
          (null == e3 || e3 > t2.length) && (e3 = t2.length);
          for (var n = 0, r = new Array(e3); n < e3; n++) r[n] = t2[n];
          return r;
        };
      }, function(t, e2, n) {
        t.exports = n(22);
      }, function(t, e2, n) {
        var r = function(t2) {
          "use strict";
          var e3 = Object.prototype, n2 = e3.hasOwnProperty, r2 = "function" == typeof Symbol ? Symbol : {}, o = r2.iterator || "@@iterator", i = r2.asyncIterator || "@@asyncIterator", a = r2.toStringTag || "@@toStringTag";
          function c(t3, e4, n3) {
            return Object.defineProperty(t3, e4, { value: n3, enumerable: true, configurable: true, writable: true }), t3[e4];
          }
          try {
            c({}, "");
          } catch (t3) {
            c = function(t4, e4, n3) {
              return t4[e4] = n3;
            };
          }
          function u(t3, e4, n3, r3) {
            var o2 = e4 && e4.prototype instanceof f ? e4 : f, i2 = Object.create(o2.prototype), a2 = new O(r3 || []);
            return i2._invoke = /* @__PURE__ */ function(t4, e5, n4) {
              var r4 = "suspendedStart";
              return function(o3, i3) {
                if ("executing" === r4) throw new Error("Generator is already running");
                if ("completed" === r4) {
                  if ("throw" === o3) throw i3;
                  return P();
                }
                for (n4.method = o3, n4.arg = i3; ; ) {
                  var a3 = n4.delegate;
                  if (a3) {
                    var c2 = g(a3, n4);
                    if (c2) {
                      if (c2 === l) continue;
                      return c2;
                    }
                  }
                  if ("next" === n4.method) n4.sent = n4._sent = n4.arg;
                  else if ("throw" === n4.method) {
                    if ("suspendedStart" === r4) throw r4 = "completed", n4.arg;
                    n4.dispatchException(n4.arg);
                  } else "return" === n4.method && n4.abrupt("return", n4.arg);
                  r4 = "executing";
                  var u2 = s(t4, e5, n4);
                  if ("normal" === u2.type) {
                    if (r4 = n4.done ? "completed" : "suspendedYield", u2.arg === l) continue;
                    return { value: u2.arg, done: n4.done };
                  }
                  "throw" === u2.type && (r4 = "completed", n4.method = "throw", n4.arg = u2.arg);
                }
              };
            }(t3, n3, a2), i2;
          }
          function s(t3, e4, n3) {
            try {
              return { type: "normal", arg: t3.call(e4, n3) };
            } catch (t4) {
              return { type: "throw", arg: t4 };
            }
          }
          t2.wrap = u;
          var l = {};
          function f() {
          }
          function p() {
          }
          function h2() {
          }
          var d = {};
          d[o] = function() {
            return this;
          };
          var v = Object.getPrototypeOf, y = v && v(v(w([])));
          y && y !== e3 && n2.call(y, o) && (d = y);
          var m = h2.prototype = f.prototype = Object.create(d);
          function L(t3) {
            ["next", "throw", "return"].forEach(function(e4) {
              c(t3, e4, function(t4) {
                return this._invoke(e4, t4);
              });
            });
          }
          function _(t3, e4) {
            var r3;
            this._invoke = function(o2, i2) {
              function a2() {
                return new e4(function(r4, a3) {
                  !function r5(o3, i3, a4, c2) {
                    var u2 = s(t3[o3], t3, i3);
                    if ("throw" !== u2.type) {
                      var l2 = u2.arg, f2 = l2.value;
                      return f2 && "object" == typeof f2 && n2.call(f2, "__await") ? e4.resolve(f2.__await).then(function(t4) {
                        r5("next", t4, a4, c2);
                      }, function(t4) {
                        r5("throw", t4, a4, c2);
                      }) : e4.resolve(f2).then(function(t4) {
                        l2.value = t4, a4(l2);
                      }, function(t4) {
                        return r5("throw", t4, a4, c2);
                      });
                    }
                    c2(u2.arg);
                  }(o2, i2, r4, a3);
                });
              }
              return r3 = r3 ? r3.then(a2, a2) : a2();
            };
          }
          function g(t3, e4) {
            var n3 = t3.iterator[e4.method];
            if (void 0 === n3) {
              if (e4.delegate = null, "throw" === e4.method) {
                if (t3.iterator.return && (e4.method = "return", e4.arg = void 0, g(t3, e4), "throw" === e4.method)) return l;
                e4.method = "throw", e4.arg = new TypeError("The iterator does not provide a 'throw' method");
              }
              return l;
            }
            var r3 = s(n3, t3.iterator, e4.arg);
            if ("throw" === r3.type) return e4.method = "throw", e4.arg = r3.arg, e4.delegate = null, l;
            var o2 = r3.arg;
            return o2 ? o2.done ? (e4[t3.resultName] = o2.value, e4.next = t3.nextLoc, "return" !== e4.method && (e4.method = "next", e4.arg = void 0), e4.delegate = null, l) : o2 : (e4.method = "throw", e4.arg = new TypeError("iterator result is not an object"), e4.delegate = null, l);
          }
          function b(t3) {
            var e4 = { tryLoc: t3[0] };
            1 in t3 && (e4.catchLoc = t3[1]), 2 in t3 && (e4.finallyLoc = t3[2], e4.afterLoc = t3[3]), this.tryEntries.push(e4);
          }
          function E(t3) {
            var e4 = t3.completion || {};
            e4.type = "normal", delete e4.arg, t3.completion = e4;
          }
          function O(t3) {
            this.tryEntries = [{ tryLoc: "root" }], t3.forEach(b, this), this.reset(true);
          }
          function w(t3) {
            if (t3) {
              var e4 = t3[o];
              if (e4) return e4.call(t3);
              if ("function" == typeof t3.next) return t3;
              if (!isNaN(t3.length)) {
                var r3 = -1, i2 = function e5() {
                  for (; ++r3 < t3.length; ) if (n2.call(t3, r3)) return e5.value = t3[r3], e5.done = false, e5;
                  return e5.value = void 0, e5.done = true, e5;
                };
                return i2.next = i2;
              }
            }
            return { next: P };
          }
          function P() {
            return { value: void 0, done: true };
          }
          return p.prototype = m.constructor = h2, h2.constructor = p, p.displayName = c(h2, a, "GeneratorFunction"), t2.isGeneratorFunction = function(t3) {
            var e4 = "function" == typeof t3 && t3.constructor;
            return !!e4 && (e4 === p || "GeneratorFunction" === (e4.displayName || e4.name));
          }, t2.mark = function(t3) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t3, h2) : (t3.__proto__ = h2, c(t3, a, "GeneratorFunction")), t3.prototype = Object.create(m), t3;
          }, t2.awrap = function(t3) {
            return { __await: t3 };
          }, L(_.prototype), _.prototype[i] = function() {
            return this;
          }, t2.AsyncIterator = _, t2.async = function(e4, n3, r3, o2, i2) {
            void 0 === i2 && (i2 = Promise);
            var a2 = new _(u(e4, n3, r3, o2), i2);
            return t2.isGeneratorFunction(n3) ? a2 : a2.next().then(function(t3) {
              return t3.done ? t3.value : a2.next();
            });
          }, L(m), c(m, a, "Generator"), m[o] = function() {
            return this;
          }, m.toString = function() {
            return "[object Generator]";
          }, t2.keys = function(t3) {
            var e4 = [];
            for (var n3 in t3) e4.push(n3);
            return e4.reverse(), function n4() {
              for (; e4.length; ) {
                var r3 = e4.pop();
                if (r3 in t3) return n4.value = r3, n4.done = false, n4;
              }
              return n4.done = true, n4;
            };
          }, t2.values = w, O.prototype = { constructor: O, reset: function(t3) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(E), !t3) for (var e4 in this) "t" === e4.charAt(0) && n2.call(this, e4) && !isNaN(+e4.slice(1)) && (this[e4] = void 0);
          }, stop: function() {
            this.done = true;
            var t3 = this.tryEntries[0].completion;
            if ("throw" === t3.type) throw t3.arg;
            return this.rval;
          }, dispatchException: function(t3) {
            if (this.done) throw t3;
            var e4 = this;
            function r3(n3, r4) {
              return a2.type = "throw", a2.arg = t3, e4.next = n3, r4 && (e4.method = "next", e4.arg = void 0), !!r4;
            }
            for (var o2 = this.tryEntries.length - 1; o2 >= 0; --o2) {
              var i2 = this.tryEntries[o2], a2 = i2.completion;
              if ("root" === i2.tryLoc) return r3("end");
              if (i2.tryLoc <= this.prev) {
                var c2 = n2.call(i2, "catchLoc"), u2 = n2.call(i2, "finallyLoc");
                if (c2 && u2) {
                  if (this.prev < i2.catchLoc) return r3(i2.catchLoc, true);
                  if (this.prev < i2.finallyLoc) return r3(i2.finallyLoc);
                } else if (c2) {
                  if (this.prev < i2.catchLoc) return r3(i2.catchLoc, true);
                } else {
                  if (!u2) throw new Error("try statement without catch or finally");
                  if (this.prev < i2.finallyLoc) return r3(i2.finallyLoc);
                }
              }
            }
          }, abrupt: function(t3, e4) {
            for (var r3 = this.tryEntries.length - 1; r3 >= 0; --r3) {
              var o2 = this.tryEntries[r3];
              if (o2.tryLoc <= this.prev && n2.call(o2, "finallyLoc") && this.prev < o2.finallyLoc) {
                var i2 = o2;
                break;
              }
            }
            i2 && ("break" === t3 || "continue" === t3) && i2.tryLoc <= e4 && e4 <= i2.finallyLoc && (i2 = null);
            var a2 = i2 ? i2.completion : {};
            return a2.type = t3, a2.arg = e4, i2 ? (this.method = "next", this.next = i2.finallyLoc, l) : this.complete(a2);
          }, complete: function(t3, e4) {
            if ("throw" === t3.type) throw t3.arg;
            return "break" === t3.type || "continue" === t3.type ? this.next = t3.arg : "return" === t3.type ? (this.rval = this.arg = t3.arg, this.method = "return", this.next = "end") : "normal" === t3.type && e4 && (this.next = e4), l;
          }, finish: function(t3) {
            for (var e4 = this.tryEntries.length - 1; e4 >= 0; --e4) {
              var n3 = this.tryEntries[e4];
              if (n3.finallyLoc === t3) return this.complete(n3.completion, n3.afterLoc), E(n3), l;
            }
          }, catch: function(t3) {
            for (var e4 = this.tryEntries.length - 1; e4 >= 0; --e4) {
              var n3 = this.tryEntries[e4];
              if (n3.tryLoc === t3) {
                var r3 = n3.completion;
                if ("throw" === r3.type) {
                  var o2 = r3.arg;
                  E(n3);
                }
                return o2;
              }
            }
            throw new Error("illegal catch attempt");
          }, delegateYield: function(t3, e4, n3) {
            return this.delegate = { iterator: w(t3), resultName: e4, nextLoc: n3 }, "next" === this.method && (this.arg = void 0), l;
          } }, t2;
        }(t.exports);
        try {
          regeneratorRuntime = r;
        } catch (t2) {
          Function("r", "regeneratorRuntime = r")(r);
        }
      }, function(t, e2) {
        function n(e3, r) {
          return t.exports = n = Object.setPrototypeOf || function(t2, e4) {
            return t2.__proto__ = e4, t2;
          }, n(e3, r);
        }
        t.exports = n;
      }, function(t, e2) {
        function n(e3) {
          return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? t.exports = n = function(t2) {
            return typeof t2;
          } : t.exports = n = function(t2) {
            return t2 && "function" == typeof Symbol && t2.constructor === Symbol && t2 !== Symbol.prototype ? "symbol" : typeof t2;
          }, n(e3);
        }
        t.exports = n;
      }, function(t, e2) {
        var n;
        n = /* @__PURE__ */ function() {
          return this;
        }();
        try {
          n = n || new Function("return this")();
        } catch (t2) {
          "object" == typeof window && (n = window);
        }
        t.exports = n;
      }, function(t, e2, n) {
        var r = n(11);
        t.exports = function(t2) {
          if (Array.isArray(t2)) return r(t2);
        };
      }, function(t, e2) {
        t.exports = function(t2) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(t2)) return Array.from(t2);
        };
      }, function(t, e2, n) {
        var r = n(11);
        t.exports = function(t2, e3) {
          if (t2) {
            if ("string" == typeof t2) return r(t2, e3);
            var n2 = Object.prototype.toString.call(t2).slice(8, -1);
            return "Object" === n2 && t2.constructor && (n2 = t2.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(t2) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? r(t2, e3) : void 0;
          }
        };
      }, function(t, e2) {
        t.exports = function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        };
      }, function(t, e2, n) {
        var r = n(0);
        t.exports = function(t2, e3) {
          for (; !Object.prototype.hasOwnProperty.call(t2, e3) && null !== (t2 = r(t2)); ) ;
          return t2;
        };
      }, function(t, e2, n) {
        "use strict";
        n.r(e2), n.d(e2, "PanelServiceProvider", function() {
          return Q;
        }), n.d(e2, "WindowsPanelItem", function() {
          return C;
        }), n.d(e2, "TrayPanelItem", function() {
          return F;
        }), n.d(e2, "ClockPanelItem", function() {
          return Y;
        }), n.d(e2, "MenuPanelItem", function() {
          return J;
        }), n.d(e2, "PanelItem", function() {
          return w;
        }), n.d(e2, "Panel", function() {
          return R;
        });
        var r = {};
        n.r(r), n.d(r, "de_DE", function() {
          return P;
        }), n.d(r, "en_EN", function() {
          return A;
        }), n.d(r, "sv_SE", function() {
          return j;
        }), n.d(r, "fr_FR", function() {
          return N;
        }), n.d(r, "nb_NO", function() {
          return x;
        }), n.d(r, "sl_SI", function() {
          return k;
        }), n.d(r, "vi_VN", function() {
          return B;
        }), n.d(r, "pt_BR", function() {
          return T;
        }), n.d(r, "tr_TR", function() {
          return S;
        });
        var o = n(7), i = n.n(o), a = n(8), c = n.n(a), u = n(1), s = n.n(u), l = n(2), f = n.n(l), p = n(10), h2 = n.n(p), d = n(3), v = n.n(d), y = n(4), m = n.n(y), L = n(0), _ = n.n(L);
        function g(t2, e3) {
          for (var n2 = [], r2 = [], o2 = arguments.length; o2-- > 2; ) n2.push(arguments[o2]);
          for (; n2.length; ) {
            var i2 = n2.pop();
            if (i2 && i2.pop) for (o2 = i2.length; o2--; ) n2.push(i2[o2]);
            else null != i2 && true !== i2 && false !== i2 && r2.push(i2);
          }
          return "function" == typeof t2 ? t2(e3 || {}, r2) : { nodeName: t2, attributes: e3 || {}, children: r2, key: e3 && e3.key };
        }
        function b(t2, e3, n2, r2) {
          var o2, i2 = [].map, a2 = r2 && r2.children[0] || null, c2 = a2 && function t3(e4) {
            return { nodeName: e4.nodeName.toLowerCase(), attributes: {}, children: i2.call(e4.childNodes, function(e5) {
              return 3 === e5.nodeType ? e5.nodeValue : t3(e5);
            }) };
          }(a2), u2 = [], s2 = true, l2 = v2(t2), f2 = function t3(e4, n3, r3) {
            for (var o3 in r3) "function" == typeof r3[o3] ? function(t4, o4) {
              r3[t4] = function(t5) {
                var i3 = o4(t5);
                return "function" == typeof i3 && (i3 = i3(m2(e4, l2), r3)), i3 && i3 !== (n3 = m2(e4, l2)) && !i3.then && d2(l2 = y2(e4, v2(n3, i3), l2)), i3;
              };
            }(o3, r3[o3]) : t3(e4.concat(o3), n3[o3] = v2(n3[o3]), r3[o3] = v2(r3[o3]));
            return r3;
          }([], l2, v2(e3));
          return d2(), f2;
          function p2(t3) {
            return "function" == typeof t3 ? p2(t3(l2, f2)) : null != t3 ? t3 : "";
          }
          function h3() {
            o2 = !o2;
            var t3 = p2(n2);
            for (r2 && !o2 && (a2 = function t4(e4, n3, r3, o3, i3) {
              if (o3 === r3) ;
              else if (null == r3 || r3.nodeName !== o3.nodeName) {
                var a3 = function t5(e5, n4) {
                  var r4 = "string" == typeof e5 || "number" == typeof e5 ? document.createTextNode(e5) : (n4 = n4 || "svg" === e5.nodeName) ? document.createElementNS("http://www.w3.org/2000/svg", e5.nodeName) : document.createElement(e5.nodeName), o4 = e5.attributes;
                  if (o4) {
                    o4.oncreate && u2.push(function() {
                      o4.oncreate(r4);
                    });
                    for (var i4 = 0; i4 < e5.children.length; i4++) r4.appendChild(t5(e5.children[i4] = p2(e5.children[i4]), n4));
                    for (var a4 in o4) g2(r4, a4, o4[a4], null, n4);
                  }
                  return r4;
                }(o3, i3);
                e4.insertBefore(a3, n3), null != r3 && b2(e4, n3, r3), n3 = a3;
              } else if (null == r3.nodeName) n3.nodeValue = o3;
              else {
                !function(t5, e5, n4, r4) {
                  for (var o4 in v2(e5, n4)) n4[o4] !== ("value" === o4 || "checked" === o4 ? t5[o4] : e5[o4]) && g2(t5, o4, n4[o4], e5[o4], r4);
                  var i4 = s2 ? n4.oncreate : n4.onupdate;
                  i4 && u2.push(function() {
                    i4(t5, e5);
                  });
                }(n3, r3.attributes, o3.attributes, i3 = i3 || "svg" === o3.nodeName);
                for (var c3 = {}, l3 = {}, f3 = [], h4 = r3.children, d3 = o3.children, y3 = 0; y3 < h4.length; y3++) {
                  f3[y3] = n3.childNodes[y3], null != (_3 = L2(h4[y3])) && (c3[_3] = [f3[y3], h4[y3]]);
                }
                y3 = 0;
                for (var m3 = 0; m3 < d3.length; ) {
                  var _3 = L2(h4[y3]), E2 = L2(d3[m3] = p2(d3[m3]));
                  if (l3[_3]) y3++;
                  else if (null == E2 || E2 !== L2(h4[y3 + 1])) if (null == E2 || s2) null == _3 && (t4(n3, f3[y3], h4[y3], d3[m3], i3), m3++), y3++;
                  else {
                    var O2 = c3[E2] || [];
                    _3 === E2 ? (t4(n3, O2[0], O2[1], d3[m3], i3), y3++) : O2[0] ? t4(n3, n3.insertBefore(O2[0], f3[y3]), O2[1], d3[m3], i3) : t4(n3, f3[y3], null, d3[m3], i3), l3[E2] = d3[m3], m3++;
                  }
                  else null == _3 && b2(n3, f3[y3], h4[y3]), y3++;
                }
                for (; y3 < h4.length; ) null == L2(h4[y3]) && b2(n3, f3[y3], h4[y3]), y3++;
                for (var y3 in c3) l3[y3] || b2(n3, c3[y3][0], c3[y3][1]);
              }
              return n3;
            }(r2, a2, c2, c2 = t3)), s2 = false; u2.length; ) u2.pop()();
          }
          function d2() {
            o2 || (o2 = true, setTimeout(h3));
          }
          function v2(t3, e4) {
            var n3 = {};
            for (var r3 in t3) n3[r3] = t3[r3];
            for (var r3 in e4) n3[r3] = e4[r3];
            return n3;
          }
          function y2(t3, e4, n3) {
            var r3 = {};
            return t3.length ? (r3[t3[0]] = t3.length > 1 ? y2(t3.slice(1), e4, n3[t3[0]]) : e4, v2(n3, r3)) : e4;
          }
          function m2(t3, e4) {
            for (var n3 = 0; n3 < t3.length; ) e4 = e4[t3[n3++]];
            return e4;
          }
          function L2(t3) {
            return t3 ? t3.key : null;
          }
          function _2(t3) {
            return t3.currentTarget.events[t3.type](t3);
          }
          function g2(t3, e4, n3, r3, o3) {
            if ("key" === e4) ;
            else if ("style" === e4) if ("string" == typeof n3) t3.style.cssText = n3;
            else for (var i3 in "string" == typeof r3 && (r3 = t3.style.cssText = ""), v2(r3, n3)) {
              var a3 = null == n3 || null == n3[i3] ? "" : n3[i3];
              "-" === i3[0] ? t3.style.setProperty(i3, a3) : t3.style[i3] = a3;
            }
            else "o" === e4[0] && "n" === e4[1] ? (e4 = e4.slice(2), t3.events ? r3 || (r3 = t3.events[e4]) : t3.events = {}, t3.events[e4] = n3, n3 ? r3 || t3.addEventListener(e4, _2) : t3.removeEventListener(e4, _2)) : e4 in t3 && "list" !== e4 && "type" !== e4 && "draggable" !== e4 && "spellcheck" !== e4 && "translate" !== e4 && !o3 ? t3[e4] = null == n3 ? "" : n3 : null != n3 && false !== n3 && t3.setAttribute(e4, n3), null != n3 && false !== n3 || t3.removeAttribute(e4);
          }
          function b2(t3, e4, n3) {
            function r3() {
              t3.removeChild(function t4(e5, n4) {
                var r4 = n4.attributes;
                if (r4) {
                  for (var o4 = 0; o4 < n4.children.length; o4++) t4(e5.childNodes[o4], n4.children[o4]);
                  r4.ondestroy && r4.ondestroy(e5);
                }
                return e5;
              }(e4, n3));
            }
            var o3 = n3.attributes && n3.attributes.onremove;
            o3 ? o3(e4, r3) : r3();
          }
        }
        var E = n(9);
        function O(t2) {
          var e3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
              })), true;
            } catch (t3) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = _()(t2);
            if (e3) {
              var o2 = _()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return m()(this, n2);
          };
        }
        var w = function(t2) {
          v()(n2, t2);
          var e3 = O(n2);
          function n2(t3, r2) {
            var o2, i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return s()(this, n2), (o2 = e3.call(this, "Panel")).core = t3, o2.panel = r2, o2.options = i2, o2.state = {}, o2.actions = {}, o2.inited = false, o2;
          }
          return f()(n2, [{ key: "destroy", value: function() {
            this.emit("destroy", this);
          } }, { key: "init", value: function() {
            var t3 = this, e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return !this.inited && (this.inited = true, this.emit("init", this), b(e4, n3, function(e5, n4) {
              return t3.render(e5, n4);
            }, this.panel.$element));
          } }, { key: "render", value: function(t3) {
            var e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            return g("div", { className: "osjs-panel-item", "data-name": t3 }, e4);
          } }]), n2;
        }(E.EventEmitter), P = { LBL_PANEL_ALL: "Panel hinzuf\xFCgen", LBL_PANEL_REMOVE: "Panel entfernen", LBL_PANELITEM_ADD: "Panelelemente hinzuf\xFCgen", LBL_PANELITEM_REMOVE: "Panelelemente entfernen", LBL_PANEL_POSITION: "Panel-Position", LBL_SAVE_AND_LOG_OUT: "Session speichern & Abmelden", LBL_LOG_OUT: "Abmelden" }, A = { LBL_PANEL_ALL: "Add panel", LBL_PANEL_REMOVE: "Remove panel", LBL_PANELITEM_ADD: "Add panelitem", LBL_PANELITEM_REMOVE: "Remove panelitem", LBL_PANEL_POSITION: "Panel Position", LBL_SAVE_AND_LOG_OUT: "Save Session & Log Out", LBL_LOG_OUT: "Log Out", LBL_LAUNCHING: "Launching '{0}'" }, j = { LBL_PANEL_ALL: "L\xE4gg till panel", LBL_PANEL_REMOVE: "Ta bort panel", LBL_PANELITEM_ADD: "L\xE4gg till panelobjekt", LBL_PANELITEM_REMOVE: "Ta bort panelobjekt", LBL_PANEL_POSITION: "Panelposition", LBL_SAVE_AND_LOG_OUT: "Spara session och logga ut", LBL_LOG_OUT: "logga ut", LBL_LAUNCHING: "Startar '{0}'" }, N = { LBL_PANEL_ALL: "Ajouter le panneau", LBL_PANEL_REMOVE: "Supprimer le panneau", LBL_PANELITEM_ADD: "Ajouter des \xE9l\xE9ments au panneau", LBL_PANELITEM_REMOVE: "Supprimer des \xE9l\xE9ments au panneau", LBL_PANEL_POSITION: "La position du panneau", LBL_SAVE_AND_LOG_OUT: "Sauvegarder la session et se d\xE9connecter", LBL_LOG_OUT: "Se d\xE9connecter" }, x = { LBL_PANEL_ALL: "Legg til panel", LBL_PANEL_REMOVE: "Fjern panel", LBL_PANELITEM_ADD: "Legg til panelobjekt", LBL_PANELITEM_REMOVE: "Fjern panelobjekt", LBL_PANEL_POSITION: "Panelposisjon", LBL_SAVE_AND_LOG_OUT: "Lagre Sessjon & Logg Ut", LBL_LOG_OUT: "Logg Ut", LBL_LAUNCHING: "Laster '{0}'" }, k = { LBL_PANEL_ALL: "Dodaj plo\u0161\u010Do", LBL_PANEL_REMOVE: "Odstrani plo\u0161\u010Do", LBL_PANELITEM_ADD: "Dodaj element plo\u0161\u010De", LBL_PANELITEM_REMOVE: "Odstrani element plo\u0161\u010De", LBL_PANEL_POSITION: "Polo\u017Eaj plo\u0161\u010De", LBL_SAVE_AND_LOG_OUT: "Shranitev seje & Odjava", LBL_LOG_OUT: "Odjava" }, B = { LBL_PANEL_ALL: "Th\xEAm panel", LBL_PANEL_REMOVE: "X\xF3a panel", LBL_PANELITEM_ADD: "Th\xEAm m\u1EE5c panel", LBL_PANELITEM_REMOVE: "X\xF3a m\u1EE5c panel", LBL_PANEL_POSITION: "V\u1ECB tr\xED panel", LBL_SAVE_AND_LOG_OUT: "L\u01B0u phi\xEAn & \u0110\u0103ng xu\u1EA5t", LBL_LOG_OUT: "\u0110\u0103ng xu\u1EA5t", LBL_LAUNCHING: "\u0110ang kh\u1EDFi \u0111\u1ED9ng '{0}'" }, T = { LBL_PANEL_ALL: "Adicionar painel", LBL_PANEL_REMOVE: "Remover painel", LBL_PANELITEM_ADD: "Adicionar item ao painel", LBL_PANELITEM_REMOVE: "Remover item do painel", LBL_PANEL_POSITION: "Posi\xE7\xE3o do painel", LBL_SAVE_AND_LOG_OUT: "Salvar sess\xE3o & Sair", LBL_LOG_OUT: "Sair", LBL_LAUNCHING: "Lan\xE7amento '{0}'" }, S = { LBL_PANEL_ALL: "Panel ekle", LBL_PANEL_REMOVE: "Paneli sil", LBL_PANELITEM_ADD: "Panel nesnesi ekle", LBL_PANELITEM_REMOVE: "Panel nesnesini sil", LBL_PANEL_POSITION: "Panel Konumu", LBL_SAVE_AND_LOG_OUT: "Oturumu Kaydet & \xC7\u0131k\u0131\u015F Yap", LBL_LOG_OUT: "\xC7\u0131k\u0131\u015F Yap", LBL_LAUNCHING: "Ba\u015Flat\u0131l\u0131yor '{0}'" };
        function I(t2) {
          var e3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
              })), true;
            } catch (t3) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = _()(t2);
            if (e3) {
              var o2 = _()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return m()(this, n2);
          };
        }
        var R = function(t2) {
          v()(n2, t2);
          var e3 = I(n2);
          function n2(t3) {
            var r2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return s()(this, n2), (r2 = e3.call(this, "Panel")).core = t3, r2.options = Object.assign({}, { ontop: true, position: "top", contextmenu: true, items: [] }, o2), r2.items = [], r2.inited = false, r2.destroyed = false, r2.$element = null, r2.options.items.forEach(function(e4) {
              var n3 = e4.name, o3 = e4.options, i2 = t3.make("osjs/panels").get(n3);
              r2.addItem(new i2(r2.core, h2()(r2), o3 || {}));
            }), r2;
          }
          return f()(n2, [{ key: "destroy", value: function() {
            this.destroyed || (this.items = this.items.filter(function(t3) {
              try {
                t3.destroy();
              } catch (t4) {
                console.warn(t4);
              }
              return false;
            }), this.destroyed = true, this.inited = false, this.emit("destroy"), this.core.emit("osjs/panel:destroy", this), this.$element.remove(), this.$element = null);
          } }, { key: "init", value: function() {
            var t3 = this;
            if (!this.inited) {
              this.destroyed = false, this.inited = true;
              var e4 = this.core.make("osjs/locale").translate, n3 = this.core.make("osjs/locale").translatable(r);
              this.$element = document.createElement("div"), this.$element.classList.add("osjs-panel"), this.$element.classList.add("osjs__contextmenu"), this.$element.addEventListener("contextmenu", function(r2) {
                r2.preventDefault(), t3.core.config("desktop.lock") || t3.core.config("desktop.disablePanelContextMenu") || t3.core.make("osjs/contextmenu").show({ position: r2, menu: [{ label: n3("LBL_PANEL_POSITION"), items: [{ label: e4("LBL_TOP"), onclick: function() {
                  return t3.setPosition("top");
                } }, { label: e4("LBL_BOTTOM"), onclick: function() {
                  return t3.setPosition("bottom");
                } }] }] });
              }), this.$element.setAttribute("data-position", this.options.position), this.$element.setAttribute("data-ontop", String(this.options.ontop)), this.core.$root.appendChild(this.$element), this.items.forEach(function(t4) {
                return t4.init();
              }), this.emit("create");
            }
          } }, { key: "addItem", value: function(t3) {
            if (!(t3 instanceof w)) throw new TypeError("Invalid panel item specified");
            this.items.push(t3), this.inited && t3.init();
          } }, { key: "setPosition", value: function(t3) {
            var e4 = this;
            return this.options.position = t3, this.core.make("osjs/panels").save().then(function() {
              return e4.core.make("osjs/desktop").applySettings();
            });
          } }]), n2;
        }(E.EventEmitter), M = n(6), D = n.n(M), G = n(5), U = n.n(G);
        function V(t2) {
          var e3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
              })), true;
            } catch (t3) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = _()(t2);
            if (e3) {
              var o2 = _()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return m()(this, n2);
          };
        }
        var z = function(t2) {
          return { wid: t2.wid, icon: t2.state.icon, title: t2.state.title, focused: t2.state.focused, attributes: Object.assign({}, t2.attributes), state: Object.assign({}, t2.state), raise: function() {
            t2.raise(), t2.focus();
          }, restore: function() {
            return t2.restore();
          }, maximize: function() {
            return t2.maximize();
          }, minimize: function() {
            return t2.minimize();
          }, close: function() {
            return t2.close();
          } };
        }, C = function(t2) {
          v()(n2, t2);
          var e3 = V(n2);
          function n2() {
            return s()(this, n2), e3.apply(this, arguments);
          }
          return f()(n2, [{ key: "init", value: function() {
            var t3 = this;
            if (!this.inited) {
              var e4 = function(t4) {
                return void 0 === t4.attributes.visibility || "global" === t4.attributes.visibility;
              }, r2 = U()(_()(n2.prototype), "init", this).call(this, { launchers: [], windows: this.core.make("osjs/windows").list().filter(function(t4) {
                return t4.inited || t4.rendered;
              }).filter(e4).map(z) }, { add: function(t4) {
                return function(n3) {
                  return n3.windows.find(function(e5) {
                    return e5.wid === t4.wid;
                  }) ? n3 : { windows: n3.windows.concat([t4]).filter(function(t5) {
                    return !t5.inited || !t5.rendered;
                  }).filter(e4) };
                };
              }, remove: function(t4) {
                return function(e5) {
                  var n3 = e5.windows, r3 = n3.findIndex(function(e6) {
                    return e6.wid === t4.wid;
                  });
                  return -1 !== r3 ? (n3.splice(r3, 1), { windows: n3 }) : {};
                };
              }, change: function(t4) {
                return function(e5) {
                  var n3 = e5.windows, r3 = e5.windows.findIndex(function(e6) {
                    return e6.wid === t4.wid;
                  });
                  return -1 !== r3 && (n3[r3] = t4), { windows: n3 };
                };
              }, addLauncher: function(t4) {
                return function(e5) {
                  return { launchers: [].concat(D()(e5.launchers), [t4]) };
                };
              }, removeLauncher: function(t4) {
                return function(e5) {
                  var n3 = e5.launchers.findIndex(function(e6) {
                    return e6 === t4;
                  }), r3 = D()(e5.launchers);
                  return -1 !== n3 && r3.splice(n3, 1), { launchers: r3 };
                };
              } }), o2 = function(t4) {
                return r2.addLauncher(t4);
              }, i2 = function(t4) {
                return r2.removeLauncher(t4);
              }, a2 = function(t4) {
                return r2.remove(z(t4));
              }, c2 = function(t4) {
                return r2.add(z(t4));
              }, u2 = function(t4) {
                return r2.change(z(t4));
              };
              this.core.on("osjs/application:launch", o2), this.core.on("osjs/application:launched", i2), this.core.on("osjs/window:destroy", a2), this.core.on("osjs/window:render", c2), this.core.on("osjs/window:change", u2), this.on("destroy", function() {
                t3.core.off("osjs/application:launch", o2), t3.core.off("osjs/application:launched", i2), t3.core.off("osjs/window:destroy", a2), t3.core.off("osjs/window:render", c2), t3.core.off("osjs/window:change", u2);
              });
            }
          } }, { key: "render", value: function(t3, e4) {
            var o2 = this, i2 = this.core.has("osjs/locale") ? this.core.make("osjs/locale").translatable(r) : function(t4) {
              return t4;
            }, a2 = t3.windows.map(function(t4) {
              return g("div", { "data-has-image": !!t4.icon || void 0, "data-focused": t4.focused ? "true" : "false", "data-minimized": t4.state.minimized ? "true" : "false", onclick: function() {
                return t4.raise();
              }, oncontextmenu: function(e5) {
                var n3 = o2.core.make("osjs/locale").translate;
                e5.stopPropagation(), e5.preventDefault(), o2.core.make("osjs/contextmenu").show({ position: e5.target, menu: [{ label: t4.state.maximized ? n3("LBL_RESTORE") : n3("LBL_MAXIMIZE"), onclick: function() {
                  return t4.attributes.maximizable ? t4.state.maximized ? t4.restore() : t4.maximize() : null;
                }, disabled: !t4.attributes.maximizable }, { label: t4.state.minimized ? n3("LBL_RAISE") : n3("LBL_MINIMIZE"), onclick: function() {
                  return t4.attributes.minimizable ? t4.state.minimized ? t4.raise() : t4.minimize() : null;
                }, disabled: !t4.attributes.minimizable }, { type: "separator" }, { label: n3("LBL_CLOSE"), onclick: function() {
                  return t4.attributes.closeable ? t4.close() : null;
                }, disabled: !t4.attributes.closeable }] });
              }, className: "osjs-panel-item--clickable osjs-panel-item--icon" }, [g("img", { src: t4.icon, alt: t4.title || "(window)" }), g("span", {}, t4.title || "(window)")]);
            }), c2 = t3.launchers.map(function(t4) {
              return g("div", {}, g("span", {}, i2("LBL_LAUNCHING", t4)));
            }), u2 = [].concat(D()(a2), D()(c2));
            return U()(_()(n2.prototype), "render", this).call(this, "windows", u2);
          } }]), n2;
        }(w);
        function $(t2) {
          var e3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
              })), true;
            } catch (t3) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = _()(t2);
            if (e3) {
              var o2 = _()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return m()(this, n2);
          };
        }
        var F = function(t2) {
          v()(n2, t2);
          var e3 = $(n2);
          function n2() {
            return s()(this, n2), e3.apply(this, arguments);
          }
          return f()(n2, [{ key: "init", value: function() {
            if (!this.inited) {
              var t3 = U()(_()(n2.prototype), "init", this).call(this, { tray: this.core.make("osjs/tray").list() }, { setTray: function(t4) {
                return function(e4) {
                  return { tray: t4 };
                };
              } });
              this.core.on("osjs/tray:update", function(e4) {
                return t3.setTray(e4);
              });
            }
          } }, { key: "render", value: function(t3, e4) {
            return U()(_()(n2.prototype), "render", this).call(this, "tray", t3.tray.map(function(t4) {
              return g("div", { onclick: function(e5) {
                return t4.onclick(e5, t4);
              }, oncontextmenu: function(e5) {
                return t4.oncontextmenu(e5, t4);
              }, className: "osjs-panel-item--clickable osjs-panel-item--icon" }, g("img", { src: t4.icon, title: t4.title }));
            }));
          } }]), n2;
        }(w);
        function H(t2) {
          var e3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
              })), true;
            } catch (t3) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = _()(t2);
            if (e3) {
              var o2 = _()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return m()(this, n2);
          };
        }
        var Y = function(t2) {
          v()(n2, t2);
          var e3 = H(n2);
          function n2() {
            return s()(this, n2), e3.apply(this, arguments);
          }
          return f()(n2, [{ key: "init", value: function() {
            var t3 = this.core.make("osjs/locale").format, e4 = function() {
              return t3(/* @__PURE__ */ new Date(), "longTime");
            };
            if (!this.inited) {
              var r2 = U()(_()(n2.prototype), "init", this).call(this, { time: e4() }, { increment: function() {
                return function(t4) {
                  return { time: e4() };
                };
              } });
              this.interval = setInterval(function() {
                r2.increment();
              }, 1e3);
            }
          } }, { key: "destroy", value: function() {
            this.interval = clearInterval(this.interval), U()(_()(n2.prototype), "destroy", this).call(this);
          } }, { key: "render", value: function(t3, e4) {
            return U()(_()(n2.prototype), "render", this).call(this, "clock", [g("span", {}, t3.time)]);
          } }]), n2;
        }(w), X = n.p + "881c86876af63b732063d7bdd51bb226.png";
        function q(t2) {
          var e3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
              })), true;
            } catch (t3) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = _()(t2);
            if (e3) {
              var o2 = _()(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else n2 = r2.apply(this, arguments);
            return m()(this, n2);
          };
        }
        var K = function(t2) {
          return function(e3, n2) {
            return -(t2(e3) < t2(n2)) || +(t2(e3) > t2(n2));
          };
        }, Z = function(t2) {
          return String(t2.label).toLowerCase();
        }, W = function(t2, e3, n2) {
          var r2 = t2.config("application.categories"), o2 = t2.make("osjs/locale"), i2 = function(e4, n3) {
            return e4.icon ? e4.icon.match(/^(https?:)\//) ? e4.icon : t2.url(e4.icon, {}, e4) : n3;
          }, a2 = function(t3) {
            return { icon: i2(t3, e3), label: (n3 = t3, o2.translatableFlat(n3.title, n3.name)), data: { name: t3.name } };
            var n3;
          }, c2 = function(t3) {
            var n3 = {};
            t3.filter(function(t4) {
              return true !== t4.hidden;
            }).forEach(function(t4) {
              var i4 = Object.keys(r2).find(function(e4) {
                return e4 === t4.category;
              }) || "other", c3 = r2[i4];
              n3[i4] || (n3[i4] = function(t5) {
                return { icon: t5.icon ? { name: t5.icon } : e3, label: (n4 = t5.label, o2.translate(n4)), items: [] };
                var n4;
              }(c3)), n3[i4].items.push(a2(t4));
            }), Object.keys(n3).forEach(function(t4) {
              n3[t4].items.sort(K(Z));
            });
            var i3 = Object.values(n3);
            return i3.sort(K(Z)), i3;
          };
          return function(r3) {
            var o3 = c2(r3), i3 = function(e4) {
              var n3 = D()(t2.config("application.pinned", [])), r4 = e4.filter(function(t3) {
                return -1 !== n3.indexOf(t3.name);
              }).map(a2);
              return r4.length ? (r4.sort(K(Z)), [{ type: "separator" }].concat(D()(r4))) : [];
            }(r3), u2 = [{ type: "separator" }, { icon: e3, label: n2("LBL_SAVE_AND_LOG_OUT"), data: { action: "saveAndLogOut" } }, { icon: e3, label: n2("LBL_LOG_OUT"), data: { action: "logOut" } }];
            return [].concat(D()(o3), D()(i3), D()(u2));
          };
        }, J = function(t2) {
          v()(n2, t2);
          var e3 = q(n2);
          function n2() {
            return s()(this, n2), e3.apply(this, arguments);
          }
          return f()(n2, [{ key: "render", value: function(t3, e4) {
            var o2 = this, a2 = this.core.make("osjs/locale").translate, u2 = this.core.make("osjs/locale").translatable(r), s2 = this.options.icon || X, l2 = function() {
              var t4 = c()(i.a.mark(function t5(e5) {
                return i.a.wrap(function(t6) {
                  for (; ; ) switch (t6.prev = t6.next) {
                    case 0:
                      if (!e5) {
                        t6.next = 3;
                        break;
                      }
                      return t6.next = 3, o2.core.make("osjs/session").save();
                    case 3:
                      o2.core.make("osjs/auth").logout();
                    case 4:
                    case "end":
                      return t6.stop();
                  }
                }, t5);
              }));
              return function(e5) {
                return t4.apply(this, arguments);
              };
            }(), f2 = W(this.core, s2, u2), p2 = function() {
              Array.from(o2.panel.$element.querySelectorAll('.osjs-panel-item[data-name="menu"]')).forEach(function(t4) {
                return t4.querySelector(".osjs-panel-item--icon").click();
              });
            };
            return this.core.on("osjs/desktop:keybinding:open-application-menu", p2), this.on("destroy", function() {
              return o2.core.off("osjs/desktop:keybinding:open-application-menu", p2);
            }), U()(_()(n2.prototype), "render", this).call(this, "menu", [g("div", { onclick: function(t4) {
              var e5 = o2.core.make("osjs/packages").getPackages(function(t5) {
                return !t5.type || "application" === t5.type;
              });
              o2.core.make("osjs/contextmenu").show({ menu: f2([].concat(e5)), position: t4.target, callback: function(t5) {
                var e6 = t5.data || {}, n3 = e6.name, r2 = e6.action;
                n3 ? o2.core.run(n3) : "saveAndLogOut" === r2 ? l2(true) : "logOut" === r2 && l2(false);
              }, toggle: true });
            }, className: "osjs-panel-item--clickable osjs-panel-item--icon" }, [g("img", { src: s2, alt: a2("LBL_MENU") }), g("span", {}, a2("LBL_MENU"))])]);
          } }]), n2;
        }(w), Q = function() {
          function t2(e4) {
            var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            s()(this, t2), this.core = e4, this.panels = [], this.inited = false, this.registry = Object.assign({ menu: J, windows: C, tray: F, clock: Y }, n2.registry || {});
          }
          var e3;
          return f()(t2, [{ key: "destroy", value: function() {
            this.inited = false, this.panels.forEach(function(t3) {
              return t3.destroy();
            }), this.panels = [];
          } }, { key: "init", value: (e3 = c()(i.a.mark(function t3() {
            var e4 = this;
            return i.a.wrap(function(t4) {
              for (; ; ) switch (t4.prev = t4.next) {
                case 0:
                  this.core.singleton("osjs/panels", function() {
                    return { register: function(t5, n2) {
                      e4.registry[t5] && console.warn("Overwriting previously registered panel item", t5), e4.registry[t5] = n2;
                    }, removeAll: function() {
                      e4.panels.forEach(function(t5) {
                        return t5.destroy();
                      }), e4.panels = [];
                    }, remove: function(t5) {
                      var n2 = "number" == typeof t5 ? t5 : e4.panels.findIndex(function(e5) {
                        return e5 === t5;
                      });
                      n2 >= 0 && (e4.panels[n2].destroy(), e4.panels.splice(n2, 1));
                    }, create: function(t5) {
                      var n2 = new R(e4.core, t5);
                      e4.panels.push(n2), n2.on("destroy", function() {
                        return e4.core.emit("osjs/panel:destroy", n2, e4.panels);
                      }), n2.on("create", function() {
                        return setTimeout(function() {
                          e4.core.emit("osjs/panel:create", n2, e4.panels);
                        }, 1);
                      }), e4.inited && n2.init();
                    }, save: function() {
                      var t5 = e4.core.make("osjs/settings"), n2 = e4.panels.map(function(t6) {
                        return t6.options;
                      });
                      return Promise.resolve(t5.set("osjs/desktop", "panels", n2)).then(function() {
                        return t5.save();
                      });
                    }, get: function(t5) {
                      return e4.registry[t5];
                    } };
                  });
                case 1:
                case "end":
                  return t4.stop();
              }
            }, t3, this);
          })), function() {
            return e3.apply(this, arguments);
          }) }, { key: "start", value: function() {
            this.inited = true, this.panels.forEach(function(t3) {
              return t3.init();
            });
          } }]), t2;
        }();
      }]);
    });
  }
});

// src/index.tsx
var src_exports = {};
var import_client = __toESM(require_main(), 1);
__reExport(src_exports, __toESM(require_main(), 1));
var import_panels = __toESM(require_main2(), 1);

// node_modules/@osjs/gui/dist/esm.js
function unwrapExports(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2["default"] : e2;
}
function createCommonjsModule(e2, t) {
  return t = { exports: {} }, e2(t, t.exports), t.exports;
}
var arrayLikeToArray = createCommonjsModule(function(e2) {
  e2.exports = function(e3, t) {
    (null == t || t > e3.length) && (t = e3.length);
    for (var o = 0, n = Array(t); o < t; o++) n[o] = e3[o];
    return n;
  }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
unwrapExports(arrayLikeToArray);
var arrayWithoutHoles = createCommonjsModule(function(e2) {
  e2.exports = function(e3) {
    if (Array.isArray(e3)) return arrayLikeToArray(e3);
  }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
unwrapExports(arrayWithoutHoles);
var iterableToArray = createCommonjsModule(function(e2) {
  e2.exports = function(e3) {
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"]) return Array.from(e3);
  }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
unwrapExports(iterableToArray);
var unsupportedIterableToArray = createCommonjsModule(function(e2) {
  e2.exports = function(e3, t) {
    if (e3) {
      if ("string" == typeof e3) return arrayLikeToArray(e3, t);
      var o = Object.prototype.toString.call(e3).slice(8, -1);
      return "Object" === o && e3.constructor && (o = e3.constructor.name), "Map" === o || "Set" === o ? Array.from(e3) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? arrayLikeToArray(e3, t) : void 0;
    }
  }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
unwrapExports(unsupportedIterableToArray);
var nonIterableSpread = createCommonjsModule(function(e2) {
  e2.exports = function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
unwrapExports(nonIterableSpread);
var toConsumableArray = createCommonjsModule(function(e2) {
  e2.exports = function(e3) {
    return arrayWithoutHoles(e3) || iterableToArray(e3) || unsupportedIterableToArray(e3) || nonIterableSpread();
  }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
var _toConsumableArray = unwrapExports(toConsumableArray);
function h(e2, t) {
  for (var o = [], n = [], s = arguments.length; 2 < s--; ) o.push(arguments[s]);
  for (; o.length; ) {
    var a = o.pop();
    if (a && a.pop) for (s = a.length; s--; ) o.push(a[s]);
    else null != a && true !== a && false !== a && n.push(a);
  }
  return "function" == typeof e2 ? e2(t || {}, n) : { nodeName: e2, attributes: t || {}, children: n, key: t && t.key };
}
function app(e2, t, o, n) {
  function s(e3) {
    return { nodeName: e3.nodeName.toLowerCase(), attributes: {}, children: k.call(e3.childNodes, function(e4) {
      return 3 === e4.nodeType ? e4.nodeValue : s(e4);
    }) };
  }
  function a(e3) {
    return "function" == typeof e3 ? a(e3(I, E)) : null == e3 ? "" : e3;
  }
  function i() {
    b = !b;
    var e3 = a(o);
    for (n && !b && (j = f(n, j, w, w = e3)), L = false; _.length; ) _.pop()();
  }
  function l() {
    b || (b = true, setTimeout(i));
  }
  function r(e3, t2) {
    var o2 = {};
    for (var n2 in e3) o2[n2] = e3[n2];
    for (var n2 in t2) o2[n2] = t2[n2];
    return o2;
  }
  function c(e3, t2, o2) {
    var n2 = {};
    return e3.length ? (n2[e3[0]] = 1 < e3.length ? c(e3.slice(1), t2, o2[e3[0]]) : t2, r(o2, n2)) : t2;
  }
  function d(e3, t2) {
    for (var o2 = 0; o2 < e3.length; ) t2 = t2[e3[o2++]];
    return t2;
  }
  function p(e3, t2, o2) {
    for (var n2 in o2) "function" == typeof o2[n2] ? function(n3, s2) {
      o2[n3] = function(n4) {
        var a2 = s2(n4);
        return "function" == typeof a2 && (a2 = a2(d(e3, I), o2)), a2 && a2 !== (t2 = d(e3, I)) && !a2.then && l(I = c(e3, r(t2, a2), I)), a2;
      };
    }(n2, o2[n2]) : p(e3.concat(n2), t2[n2] = r(t2[n2]), o2[n2] = r(o2[n2]));
    return o2;
  }
  function u(e3) {
    return e3 ? e3.key : null;
  }
  function g(e3) {
    return e3.currentTarget.events[e3.type](e3);
  }
  function h2(e3, t2, o2, n2, s2) {
    if ("key" === t2) ;
    else if ("style" !== t2) "o" === t2[0] && "n" === t2[1] ? (t2 = t2.slice(2), e3.events ? !n2 && (n2 = e3.events[t2]) : e3.events = {}, e3.events[t2] = o2, o2 ? !n2 && e3.addEventListener(t2, g) : e3.removeEventListener(t2, g)) : t2 in e3 && "list" !== t2 && "type" !== t2 && "draggable" !== t2 && "spellcheck" !== t2 && "translate" !== t2 && !s2 ? e3[t2] = null == o2 ? "" : o2 : null != o2 && false !== o2 && e3.setAttribute(t2, o2), (null == o2 || false === o2) && e3.removeAttribute(t2);
    else if ("string" == typeof o2) e3.style.cssText = o2;
    else for (var a2 in "string" == typeof n2 && (n2 = e3.style.cssText = ""), r(n2, o2)) {
      var i2 = null == o2 || null == o2[a2] ? "" : o2[a2];
      "-" === a2[0] ? e3.style.setProperty(a2, i2) : e3.style[a2] = i2;
    }
  }
  function m(e3, t2) {
    var o2 = "string" == typeof e3 || "number" == typeof e3 ? document.createTextNode(e3) : (t2 = t2 || "svg" === e3.nodeName) ? document.createElementNS("http://www.w3.org/2000/svg", e3.nodeName) : document.createElement(e3.nodeName), n2 = e3.attributes;
    if (n2) {
      n2.oncreate && _.push(function() {
        n2.oncreate(o2);
      });
      for (var s2 = 0; s2 < e3.children.length; s2++) o2.appendChild(m(e3.children[s2] = a(e3.children[s2]), t2));
      for (var l2 in n2) h2(o2, l2, n2[l2], null, t2);
    }
    return o2;
  }
  function x(e3, t2, o2, n2) {
    for (var s2 in r(t2, o2)) o2[s2] !== ("value" == s2 || "checked" === s2 ? e3[s2] : t2[s2]) && h2(e3, s2, o2[s2], t2[s2], n2);
    var a2 = L ? o2.oncreate : o2.onupdate;
    a2 && _.push(function() {
      a2(e3, t2);
    });
  }
  function v(e3, t2) {
    var o2 = t2.attributes;
    if (o2) {
      for (var n2 = 0; n2 < t2.children.length; n2++) v(e3.childNodes[n2], t2.children[n2]);
      o2.ondestroy && o2.ondestroy(e3);
    }
    return e3;
  }
  function y(e3, t2, o2) {
    function n2() {
      e3.removeChild(v(t2, o2));
    }
    var s2 = o2.attributes && o2.attributes.onremove;
    s2 ? s2(t2, n2) : n2();
  }
  function f(e3, t2, o2, n2, s2) {
    if (n2 === o2) ;
    else if (null == o2 || o2.nodeName !== n2.nodeName) {
      var l2 = m(n2, s2);
      e3.insertBefore(l2, t2), null != o2 && y(e3, t2, o2), t2 = l2;
    } else if (null == o2.nodeName) t2.nodeValue = n2;
    else {
      x(t2, o2.attributes, n2.attributes, s2 = s2 || "svg" === n2.nodeName);
      for (var r2 = {}, c2 = {}, d2 = [], p2 = o2.children, g2 = n2.children, h3 = 0; h3 < p2.length; h3++) {
        d2[h3] = t2.childNodes[h3];
        var v2 = u(p2[h3]);
        null != v2 && (r2[v2] = [d2[h3], p2[h3]]);
      }
      for (var h3 = 0, b2 = 0; b2 < g2.length; ) {
        var v2 = u(p2[h3]), j2 = u(g2[b2] = a(g2[b2]));
        if (c2[v2]) {
          h3++;
          continue;
        }
        if (null != j2 && j2 === u(p2[h3 + 1])) {
          null == v2 && y(t2, d2[h3], p2[h3]), h3++;
          continue;
        }
        if (null == j2 || L) null == v2 && (f(t2, d2[h3], p2[h3], g2[b2], s2), b2++), h3++;
        else {
          var w2 = r2[j2] || [];
          v2 === j2 ? (f(t2, w2[0], w2[1], g2[b2], s2), h3++) : w2[0] ? f(t2, t2.insertBefore(w2[0], d2[h3]), w2[1], g2[b2], s2) : f(t2, d2[h3], null, g2[b2], s2), c2[j2] = g2[b2], b2++;
        }
      }
      for (; h3 < p2.length; ) null == u(p2[h3]) && y(t2, d2[h3], p2[h3]), h3++;
      for (var h3 in r2) c2[h3] || y(t2, r2[h3][0], r2[h3][1]);
    }
    return t2;
  }
  var b, k = [].map, j = n && n.children[0] || null, w = j && s(j), _ = [], L = true, I = r(e2), E = p([], I, r(t));
  return l(), E;
}
var unitValue = function(e2, t) {
  return "number" == typeof e2 ? "".concat(e2, "px") : false === e2 ? t : e2;
};
var boxPropNames = { grow: function(e2) {
  return { flexGrow: e2 };
}, shrink: function(e2) {
  return { flexShrink: e2 };
}, basis: function(e2) {
  return { flexBasis: unitValue(e2, "auto") };
}, align: function(e2) {
  return { alignItems: e2 };
}, justify: function(e2) {
  return { justifyContent: e2 };
}, padding: function(e2) {
  return { margin: unitValue(e2, "0") };
}, margin: function(e2) {
  return { margin: unitValue(e2, "0") };
} };
var Element$1 = function(e2) {
  var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : [], o = e2["class"] instanceof Array ? e2["class"] : [e2["class"]], n = ["osjs-gui"].concat(_toConsumableArray(o));
  e2.orientation && n.push("osjs-gui-" + e2.orientation);
  var s = "string" == typeof e2.style ? {} : Object.assign({}, e2.style || {}), a = Object.keys(e2).reduce(function(t2, o2) {
    var n2 = boxPropNames[o2] ? boxPropNames[o2](e2[o2]) : void 0;
    return Object.assign({}, t2, n2);
  }, s);
  return h("div", { oncreate: e2.oncreate, ondestroy: e2.ondestroy, class: n.filter(function(e3) {
    return !!e3;
  }).join(" "), style: a }, t);
};
var _typeof_1 = createCommonjsModule(function(e2) {
  function t(o) {
    "@babel/helpers - typeof";
    return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? (e2.exports = t = function(e3) {
      return typeof e3;
    }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true) : (e2.exports = t = function(e3) {
      return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
    }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true), t(o);
  }
  e2.exports = t, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
var _typeof = unwrapExports(_typeof_1);
var Icon = function(e2) {
  var t = e2 && "object" === _typeof(e2) ? e2.src : e2, o = e2 && "object" === _typeof(e2) ? e2.name : void 0;
  return h("i", { "data-icon": o, class: "osjs-icon", style: { backgroundImage: "string" == typeof e2 ? "url(".concat(t, ")") : void 0 } });
};
var defineProperty = createCommonjsModule(function(e2) {
  function t(e3, t2, o) {
    return t2 in e3 ? Object.defineProperty(e3, t2, { value: o, enumerable: true, configurable: true, writable: true }) : e3[t2] = o, e3;
  }
  e2.exports = t, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
var _defineProperty = unwrapExports(defineProperty);
var doubleTap = function() {
  var e2, t = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : 250, o = false;
  return function(n, s) {
    return (e2 = clearTimeout(e2), e2 = setTimeout(function() {
      return o = false;
    }, t), o) ? (n.preventDefault(), s(n)) : (o = true, false);
  };
};
var ul = function e(t) {
  var o = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : [], n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 0, s = function(e2) {
    var t2 = [];
    return "checkbox" === e2.type || "boolean" == typeof e2.checked ? t2.push(h("span", { class: "osjs-gui-menu-checkbox " + (e2.checked ? "active" : "") })) : e2.icon && t2.push(h(Icon, e2.icon)), t2.push(h("span", {}, e2.label)), t2;
  }, a = function(t2, o2) {
    if ("function" == typeof o2.element) return o2.element();
    var a2 = "separator" === o2.type ? "osjs-gui-menu-separator" : "osjs-gui-menu-label " + (o2.disabled ? "osjs__disabled" : ""), i = [h("span", { class: a2 }, s(o2))];
    return o2.items && i.push(e(t2, o2.items, n + 1)), i;
  };
  return h("ul", { class: "" }, o.map(function(e2) {
    return h("li", { class: "osjs-gui-menu-entry" }, [h("div", { class: "osjs-gui-menu-container", "data-has-image": !!e2.icon || void 0, "data-has-children": !!e2.items || void 0, onmouseover: e2.items ? t.onshow : void 0, ontouchend: e2.items ? t.onshow : void 0, onclick: function(o2) {
      e2.items || (e2.onclick && e2.onclick(e2, o2), t.onclick && t.onclick(e2, o2, e2));
    } }, a(t, e2))]);
  }));
};
var Menu = function(e2) {
  return h("div", { id: "osjs-context-menu", className: "osjs-gui osjs-gui-menu", oncreate: e2.oncreate, onupdate: e2.onupdate, style: { display: false === e2.visible ? "none" : "block", top: e2.position ? e2.position.top + "px" : 0, left: e2.position ? e2.position.left + "px" : 0 } }, ul(e2, e2.menu));
};
function nestable(e2, t, o, n) {
  return t._$r = function() {
    return {};
  }, function(s, a) {
    return h(n || "x-", { key: s.key, id: s.id, class: s.class, oncreate: function(n2) {
      var i = app(e2, t, function(e3, t2) {
        var s2 = o(e3, t2);
        return "function" == typeof s2 && (s2 = s2(n2._$p, n2._$c)), s2;
      }, n2);
      n2._$p = s, n2._$c = a, n2._$r = i._$r, n2._$u = i.uninit, i.init && i.init(s), s.oncreate && s.oncreate(n2);
    }, onupdate: function(e3) {
      e3._$p = s, e3._$c = a, e3._$r(), s.onupdate && s.onupdate(e3);
    }, ondestroy: function(e3) {
      e3._$u && e3._$u();
    }, onremove: function(e3, t2) {
      return s.onremove ? void s.onremove(e3, t2) : t2();
    } });
  };
}
var _onmousedown = function(e2, t, o) {
  var n = Math.min, s = e2.target, a = e2.clientX, i = e2.clientY, l = s.previousSibling, r = l.offsetWidth, c = l.offsetHeight, d = Array.from(s.parentNode.children).indexOf(l), p = 0.8 * l.parentNode.offsetWidth, u = 0.8 * l.parentNode.offsetHeight;
  if (!(0 > d)) {
    var g = function(e3) {
      e3.preventDefault();
      var s2 = "vertical" === o ? r : c;
      if ("vertical" === o) {
        var l2 = e3.clientX - a;
        s2 = n(p, s2 + l2);
      } else {
        var g2 = e3.clientY - i;
        s2 = n(u, s2 + g2);
      }
      t.setSize({ index: d, size: s2 });
    }, h2 = function e3(t2) {
      t2.preventDefault(), document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", e3);
    };
    e2.preventDefault(), document.addEventListener("mousemove", g), document.addEventListener("mouseup", h2);
  }
};
var panes = function(e2, t, o, n) {
  var s = Array(Math.ceil(o.length / 2)).fill(null).map(function() {
    return h("div", { class: "osjs-gui-panes-spacer", onmousedown: function(e3) {
      return _onmousedown(e3, t, n);
    } });
  });
  return o.map(function(t2, o2) {
    var n2 = e2.sizes[o2] ? e2.sizes[o2] + "px" : void 0;
    return h("div", { class: "osjs-gui-panes-pane", style: { flex: n2 ? "0 0 ".concat(n2) : n2 } }, t2);
  }).map(function(e3, t2) {
    return [e3, s[t2]];
  }).reduce(function(e3, t2) {
    return e3.concat(t2);
  }).filter(function(e3) {
    return "undefined" != typeof e3;
  });
};
var view = function(e2, t) {
  return function(o, n) {
    var s = o.orientation || "vertical";
    return h(Element$1, { orientation: s, class: "osjs-gui-panes-inner" }, panes(e2, t, n, s));
  };
};
var inner = nestable({ sizes: [] }, { init: function(e2) {
  return { sizes: e2.sizes || [150] };
}, setSize: function(e2) {
  var t = e2.index, o = e2.size;
  return function(e3) {
    var n = [].concat(e3.sizes);
    return n[t] = o, { sizes: n };
  };
} }, view, "div");
var tapper = doubleTap();
var tapper$1 = doubleTap();
var headers = function(e2, t, o) {
  var n = e2.labels, s = e2.onchange, a = e2.oncontextmenu;
  return (n || []).map(function(e3, n2) {
    return h("div", { class: t.selectedIndex === n2 ? "osjs__active" : "", oncontextmenu: function(t2) {
      (a || function() {
      })(t2, n2, e3);
    }, onclick: function(t2) {
      o.setSelectedIndex(n2), (s || function() {
      })(t2, n2, e3);
    } }, h("span", {}, e3));
  });
};
var panes$1 = function(e2, t) {
  return t.map(function(t2, o) {
    return h("div", { class: e2.selectedIndex === o ? "osjs__active" : "" }, t2);
  });
};
var view$1 = nestable({ selectedIndex: 0 }, { init: function(e2) {
  return { selectedIndex: e2.selectedIndex || 0 };
}, setSelectedIndex: function(e2) {
  return function() {
    return { selectedIndex: e2 };
  };
} }, function(e2, t) {
  return function(o, n) {
    return h("div", { class: "osjs-gui-tabs-wrapper" }, [h("div", { class: "osjs-gui-tabs-header" }, headers(o, e2, t)), h("div", { class: "osjs-gui-tabs-panes" }, panes$1(e2, n))]);
  };
}, "div");
var view$2 = function(e2, t) {
  return function(o, n) {
    return h(Element$1, Object.assign({}, o.box || {}, { class: ["osjs-gui-expander-wrapper"] }), [h("div", { class: "osjs-gui-expander-header", onclick: function(n2) {
      return t.ontoggle({ ev: n2, active: !e2.active, ontoggle: o.ontoggle });
    } }, [h("div", { class: "osjs-gui-expander-header-icon", "data-active": e2.active + "" }), h("div", { class: "osjs-gui-expander-header-label" }, o.label)]), h("div", { class: "osjs-gui-expander-content", style: { display: false === e2.active ? "none" : void 0 } }, n)]);
  };
};
var inner$1 = nestable({ active: true }, { init: function(e2) {
  return { ative: false !== e2.active };
}, ontoggle: function(e2) {
  var t = e2.ev, o = e2.active, n = e2.ontoggle;
  return (n || function() {
  })(t, o), { active: o };
} }, view$2, "div");
var asyncToGenerator = createCommonjsModule(function(e2) {
  function t(e3, t2, o, n, s, a, i) {
    try {
      var l = e3[a](i), r = l.value;
    } catch (e4) {
      return void o(e4);
    }
    l.done ? t2(r) : Promise.resolve(r).then(n, s);
  }
  e2.exports = function(e3) {
    return function() {
      var o = this, n = arguments;
      return new Promise(function(s, a) {
        function i(e4) {
          t(r, s, a, i, l, "next", e4);
        }
        function l(e4) {
          t(r, s, a, i, l, "throw", e4);
        }
        var r = e3.apply(o, n);
        i(void 0);
      });
    };
  }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
var _asyncToGenerator = unwrapExports(asyncToGenerator);
var classCallCheck = createCommonjsModule(function(e2) {
  e2.exports = function(e3, t) {
    if (!(e3 instanceof t)) throw new TypeError("Cannot call a class as a function");
  }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
var _classCallCheck = unwrapExports(classCallCheck);
var createClass = createCommonjsModule(function(e2) {
  function t(e3, t2) {
    for (var o, n = 0; n < t2.length; n++) o = t2[n], o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e3, o.key, o);
  }
  e2.exports = function(e3, o, n) {
    return o && t(e3.prototype, o), n && t(e3, n), e3;
  }, e2.exports["default"] = e2.exports, e2.exports.__esModule = true;
});
var _createClass = unwrapExports(createClass);
var runtime_1 = createCommonjsModule(function(e2) {
  var t = function(e3) {
    function t2(e4, t3, o2) {
      return Object.defineProperty(e4, t3, { value: o2, enumerable: true, configurable: true, writable: true }), e4[t3];
    }
    function o(e4, t3, o2, n2) {
      var a2 = t3 && t3.prototype instanceof s ? t3 : s, i2 = Object.create(a2.prototype), l2 = new g(n2 || []);
      return i2._invoke = c(e4, o2, l2), i2;
    }
    function n(e4, t3, o2) {
      try {
        return { type: "normal", arg: e4.call(t3, o2) };
      } catch (e5) {
        return { type: "throw", arg: e5 };
      }
    }
    function s() {
    }
    function a() {
    }
    function i() {
    }
    function l(e4) {
      ["next", "throw", "return"].forEach(function(o2) {
        t2(e4, o2, function(e5) {
          return this._invoke(o2, e5);
        });
      });
    }
    function r(e4, t3) {
      function o2(s3, a3, i2, l2) {
        var r2 = n(e4[s3], e4, a3);
        if ("throw" === r2.type) l2(r2.arg);
        else {
          var c2 = r2.arg, d2 = c2.value;
          return d2 && "object" == typeof d2 && y.call(d2, "__await") ? t3.resolve(d2.__await).then(function(e5) {
            o2("next", e5, i2, l2);
          }, function(e5) {
            o2("throw", e5, i2, l2);
          }) : t3.resolve(d2).then(function(e5) {
            c2.value = e5, i2(c2);
          }, function(e5) {
            return o2("throw", e5, i2, l2);
          });
        }
      }
      function s2(e5, n2) {
        function s3() {
          return new t3(function(t4, s4) {
            o2(e5, n2, t4, s4);
          });
        }
        return a2 = a2 ? a2.then(s3, s3) : s3();
      }
      var a2;
      this._invoke = s2;
    }
    function c(e4, t3, o2) {
      var s2 = "suspendedStart";
      return function(a2, i2) {
        if ("executing" === s2) throw new Error("Generator is already running");
        if ("completed" === s2) {
          if ("throw" === a2) throw i2;
          return m();
        }
        for (o2.method = a2, o2.arg = i2; ; ) {
          var l2 = o2.delegate;
          if (l2) {
            var r2 = d(l2, o2);
            if (r2) {
              if (r2 === w) continue;
              return r2;
            }
          }
          if ("next" === o2.method) o2.sent = o2._sent = o2.arg;
          else if ("throw" === o2.method) {
            if ("suspendedStart" === s2) throw s2 = "completed", o2.arg;
            o2.dispatchException(o2.arg);
          } else "return" === o2.method && o2.abrupt("return", o2.arg);
          s2 = "executing";
          var c2 = n(e4, t3, o2);
          if ("normal" === c2.type) {
            if (s2 = o2.done ? "completed" : "suspendedYield", c2.arg === w) continue;
            return { value: c2.arg, done: o2.done };
          }
          "throw" === c2.type && (s2 = "completed", o2.method = "throw", o2.arg = c2.arg);
        }
      };
    }
    function d(e4, t3) {
      var o2 = e4.iterator[t3.method];
      if (o2 === x) {
        if (t3.delegate = null, "throw" === t3.method) {
          if (e4.iterator["return"] && (t3.method = "return", t3.arg = x, d(e4, t3), "throw" === t3.method)) return w;
          t3.method = "throw", t3.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return w;
      }
      var s2 = n(o2, e4.iterator, t3.arg);
      if ("throw" === s2.type) return t3.method = "throw", t3.arg = s2.arg, t3.delegate = null, w;
      var a2 = s2.arg;
      if (!a2) return t3.method = "throw", t3.arg = new TypeError("iterator result is not an object"), t3.delegate = null, w;
      if (a2.done) t3[e4.resultName] = a2.value, t3.next = e4.nextLoc, "return" !== t3.method && (t3.method = "next", t3.arg = x);
      else return a2;
      return t3.delegate = null, w;
    }
    function p(e4) {
      var t3 = { tryLoc: e4[0] };
      1 in e4 && (t3.catchLoc = e4[1]), 2 in e4 && (t3.finallyLoc = e4[2], t3.afterLoc = e4[3]), this.tryEntries.push(t3);
    }
    function u(e4) {
      var t3 = e4.completion || {};
      t3.type = "normal", delete t3.arg, e4.completion = t3;
    }
    function g(e4) {
      this.tryEntries = [{ tryLoc: "root" }], e4.forEach(p, this), this.reset(true);
    }
    function h2(e4) {
      if (e4) {
        var t3 = e4[b];
        if (t3) return t3.call(e4);
        if ("function" == typeof e4.next) return e4;
        if (!isNaN(e4.length)) {
          var o2 = -1, n2 = function t4() {
            for (; ++o2 < e4.length; ) if (y.call(e4, o2)) return t4.value = e4[o2], t4.done = false, t4;
            return t4.value = x, t4.done = true, t4;
          };
          return n2.next = n2;
        }
      }
      return { next: m };
    }
    function m() {
      return { value: x, done: true };
    }
    var x, v = Object.prototype, y = v.hasOwnProperty, f = "function" == typeof Symbol ? Symbol : {}, b = f.iterator || "@@iterator", k = f.asyncIterator || "@@asyncIterator", j = f.toStringTag || "@@toStringTag";
    try {
      t2({}, "");
    } catch (e4) {
      t2 = function(e5, t3, o2) {
        return e5[t3] = o2;
      };
    }
    e3.wrap = o;
    var w = {}, _ = {};
    t2(_, b, function() {
      return this;
    });
    var L = Object.getPrototypeOf, I = L && L(L(h2([])));
    I && I !== v && y.call(I, b) && (_ = I);
    var E = i.prototype = s.prototype = Object.create(_);
    return a.prototype = i, t2(E, "constructor", i), t2(i, "constructor", a), a.displayName = t2(i, j, "GeneratorFunction"), e3.isGeneratorFunction = function(e4) {
      var t3 = "function" == typeof e4 && e4.constructor;
      return !!t3 && (t3 === a || "GeneratorFunction" === (t3.displayName || t3.name));
    }, e3.mark = function(e4) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e4, i) : (e4.__proto__ = i, t2(e4, j, "GeneratorFunction")), e4.prototype = Object.create(E), e4;
    }, e3.awrap = function(e4) {
      return { __await: e4 };
    }, l(r.prototype), t2(r.prototype, k, function() {
      return this;
    }), e3.AsyncIterator = r, e3.async = function(t3, n2, s2, a2, i2) {
      void 0 === i2 && (i2 = Promise);
      var l2 = new r(o(t3, n2, s2, a2), i2);
      return e3.isGeneratorFunction(n2) ? l2 : l2.next().then(function(e4) {
        return e4.done ? e4.value : l2.next();
      });
    }, l(E), t2(E, j, "Generator"), t2(E, b, function() {
      return this;
    }), t2(E, "toString", function() {
      return "[object Generator]";
    }), e3.keys = function(e4) {
      var t3 = [];
      for (var o2 in e4) t3.push(o2);
      return t3.reverse(), function o3() {
        for (; t3.length; ) {
          var n2 = t3.pop();
          if (n2 in e4) return o3.value = n2, o3.done = false, o3;
        }
        return o3.done = true, o3;
      };
    }, e3.values = h2, g.prototype = { constructor: g, reset: function(e4) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = x, this.done = false, this.delegate = null, this.method = "next", this.arg = x, this.tryEntries.forEach(u), !e4) for (var t3 in this) "t" === t3.charAt(0) && y.call(this, t3) && !isNaN(+t3.slice(1)) && (this[t3] = x);
    }, stop: function() {
      this.done = true;
      var e4 = this.tryEntries[0], t3 = e4.completion;
      if ("throw" === t3.type) throw t3.arg;
      return this.rval;
    }, dispatchException: function(e4) {
      function t3(t4, n3) {
        return a2.type = "throw", a2.arg = e4, o2.next = t4, n3 && (o2.method = "next", o2.arg = x), !!n3;
      }
      if (this.done) throw e4;
      for (var o2 = this, n2 = this.tryEntries.length - 1; 0 <= n2; --n2) {
        var s2 = this.tryEntries[n2], a2 = s2.completion;
        if ("root" === s2.tryLoc) return t3("end");
        if (s2.tryLoc <= this.prev) {
          var l2 = y.call(s2, "catchLoc"), r2 = y.call(s2, "finallyLoc");
          if (l2 && r2) {
            if (this.prev < s2.catchLoc) return t3(s2.catchLoc, true);
            if (this.prev < s2.finallyLoc) return t3(s2.finallyLoc);
          } else if (l2) {
            if (this.prev < s2.catchLoc) return t3(s2.catchLoc, true);
          } else if (!r2) throw new Error("try statement without catch or finally");
          else if (this.prev < s2.finallyLoc) return t3(s2.finallyLoc);
        }
      }
    }, abrupt: function(e4, t3) {
      for (var o2, n2 = this.tryEntries.length - 1; 0 <= n2; --n2) if (o2 = this.tryEntries[n2], o2.tryLoc <= this.prev && y.call(o2, "finallyLoc") && this.prev < o2.finallyLoc) {
        var s2 = o2;
        break;
      }
      s2 && ("break" === e4 || "continue" === e4) && s2.tryLoc <= t3 && t3 <= s2.finallyLoc && (s2 = null);
      var a2 = s2 ? s2.completion : {};
      return a2.type = e4, a2.arg = t3, s2 ? (this.method = "next", this.next = s2.finallyLoc, w) : this.complete(a2);
    }, complete: function(e4, t3) {
      if ("throw" === e4.type) throw e4.arg;
      return "break" === e4.type || "continue" === e4.type ? this.next = e4.arg : "return" === e4.type ? (this.rval = this.arg = e4.arg, this.method = "return", this.next = "end") : "normal" === e4.type && t3 && (this.next = t3), w;
    }, finish: function(e4) {
      for (var t3, o2 = this.tryEntries.length - 1; 0 <= o2; --o2) if (t3 = this.tryEntries[o2], t3.finallyLoc === e4) return this.complete(t3.completion, t3.afterLoc), u(t3), w;
    }, catch: function(e4) {
      for (var t3, o2 = this.tryEntries.length - 1; 0 <= o2; --o2) if (t3 = this.tryEntries[o2], t3.tryLoc === e4) {
        var n2 = t3.completion;
        if ("throw" === n2.type) {
          var s2 = n2.arg;
          u(t3);
        }
        return s2;
      }
      throw new Error("illegal catch attempt");
    }, delegateYield: function(e4, t3, o2) {
      return this.delegate = { iterator: h2(e4), resultName: t3, nextLoc: o2 }, "next" === this.method && (this.arg = x), w;
    } }, e3;
  }(e2.exports);
  try {
    regeneratorRuntime = t;
  } catch (e3) {
    "object" == typeof globalThis ? globalThis.regeneratorRuntime = t : Function("r", "regeneratorRuntime = r")(t);
  }
});
var regenerator = runtime_1;
var clampSubMenu = function(e2, t) {
  var o = t.target.querySelector("ul");
  if (o && (o.classList.contains("osjs-gui-menu-container") && (o = o.parentNode.parentNode), o && o.offsetParent)) {
    o.classList.remove("clamp-right");
    var n = o.getBoundingClientRect();
    n.right > e2.offsetWidth && o.classList.add("clamp-right");
  }
};
var clampMenu = function(e2, t, o) {
  var n = {}, s = o.top + t.offsetHeight, a = o.left + t.offsetWidth, i = e2.offsetHeight - o.top, l = e2.offsetWidth - o.left, r = a > e2.offsetWidth, c = s > e2.offsetHeight;
  return c && e2.offsetHeight > t.offsetHeight && (n.top = e2.offsetHeight - t.offsetHeight - i), r && (n.left = e2.offsetWidth - t.offsetWidth - l), c || r ? n : null;
};
var view$3 = function(e2) {
  return function(t, o) {
    return h(Menu, { position: t.position, visible: t.visible, menu: t.menu, onclick: e2, onshow: o.onshow });
  };
};
var timeout = function(e2) {
  return e2(), setTimeout(e2, 100);
};
var ContextMenu = function() {
  function e2(t) {
    _classCallCheck(this, e2), this.core = t, this.callback = function() {
    }, this.actions = null, this.$element = document.createElement("div");
  }
  return _createClass(e2, [{ key: "destroy", value: function() {
    this.callback = null, this.actions = null;
  } }, { key: "init", value: function() {
    var e3, t = this;
    this.$element.className = "osjs-system-context-menu", this.core.$root.appendChild(this.$element);
    var o = false;
    this.actions = app({ visible: false, menu: [], position: { top: 0, left: 0 } }, { clamp: function(o2) {
      return function(n) {
        if (o2 = o2 || document.querySelector("#osjs-context-menu"), clearTimeout(e3), o2) {
          var s = t.core.$root, a = clampMenu(s, o2, n.position);
          if (a) return { position: a };
        }
        return {};
      };
    }, onshow: function(o2) {
      return function() {
        e3 = timeout(function() {
          return clampSubMenu(t.core.$root, o2);
        });
      };
    }, show: function(e4) {
      return function(n, s) {
        var a = e4.menu, i = e4.position, l = e4.toggle;
        if (l && o) return s.hide();
        if (i instanceof Event) i = { left: i.clientX, top: i.clientY };
        else if (i instanceof Element) {
          var r = i.getBoundingClientRect();
          i = { left: r.left, top: r.top + r.height };
        }
        return t.callback = function(t2, o2, n2) {
          e4.callback && e4.callback(t2, o2), false !== n2.closeable && s.hide();
        }, o = true, t.onclose = e4.onclose, timeout(function() {
          return s.clamp();
        }), { visible: true, menu: a || [], position: i || { top: 0, left: 0 } };
      };
    }, hide: function() {
      return function() {
        return o && setTimeout(function() {
          return o = false;
        }, 0), t.onclose && t.onclose(), t.onclose = null, t.callback = null, { visible: false };
      };
    } }, view$3(function() {
      !t.core.destroyed && t.callback && t.callback.apply(t, arguments);
    }), this.$element);
  } }, { key: "show", value: function() {
    var e3;
    return this.actions ? (e3 = this.actions).show.apply(e3, arguments) : null;
  } }, { key: "hide", value: function() {
    var e3;
    return this.actions ? (e3 = this.actions).hide.apply(e3, arguments) : null;
  } }]), e2;
}();
var validContextMenuTarget = function(e2) {
  var t = e2.target, o = "TEXTAREA" === t.tagName;
  return o || "INPUT" !== t.tagName || (o = -1 !== ["text", "password", "number", "email"].indexOf(t.type)), o;
};
var GUIServiceProvider = function() {
  function e2(t) {
    _classCallCheck(this, e2), this.core = t, this.contextmenu = new ContextMenu(t);
  }
  return _createClass(e2, [{ key: "destroy", value: function() {
    var e3 = document.getElementById("osjs-context-menu");
    e3 && e3.remove(), this.contextmenu.destroy();
  } }, { key: "init", value: function() {
    var e3 = _asyncToGenerator(regenerator.mark(function e4() {
      var t, o = this;
      return regenerator.wrap(function(e5) {
        for (; ; ) switch (e5.prev = e5.next) {
          case 0:
            t = { show: function() {
              var e6;
              return (e6 = o.contextmenu).show.apply(e6, arguments);
            }, hide: function() {
              var e6;
              return (e6 = o.contextmenu).hide.apply(e6, arguments);
            } }, this.core.instance("osjs/contextmenu", function() {
              return arguments.length ? t.show.apply(t, arguments) : t;
            }), this.core.$root.addEventListener("contextmenu", function(e6) {
              validContextMenuTarget(e6) || (e6.stopPropagation(), e6.preventDefault());
            });
          case 3:
          case "end":
            return e5.stop();
        }
      }, e4, this);
    }));
    return function() {
      return e3.apply(this, arguments);
    };
  }() }, { key: "start", value: function() {
    var e3 = this, t = function(t2) {
      var o = document.getElementById("osjs-context-menu"), n = o && o.contains(t2.target);
      !n && e3.contextmenu && e3.contextmenu.hide();
    };
    this.core.$root.addEventListener("click", t, true), this.core.once("destroy", function() {
      e3.core.$root.removeEventListener("click", t, true);
    }), this.contextmenu.init();
  } }]), e2;
}();

// src/index.tsx
var ecs = new Worker("./worker.js");
function stringifyEvent(e2) {
  const obj = {};
  for (let k in e2) {
    obj[k] = e2[k];
  }
  return JSON.parse(JSON.stringify(obj, (k, v) => {
    if (v instanceof Node) return "Node";
    if (v instanceof Window) return "Window";
    return v;
  }, " "));
}
function inputEvent(e2) {
  ecs.postMessage(["inputEvent", stringifyEvent(e2)]);
}
document.addEventListener("DOMContentLoaded", async function(event) {
  const droneMData = await (await fetch("metadata.json")).json();
  const metadata = [droneMData];
  console.log("osjs", metadata);
  const packages = [{
    metadata,
    callback: (x) => {
      debugger;
    }
  }];
  const prs = metadata;
  const osjsCore = new import_client.Core({
    name: "my-core",
    standalone: true,
    packages: {
      metadata,
      // packages,
      manifest: "http://localhost:8000/metadata.json"
    }
  });
  const osjsDesktop = new import_client.Desktop(osjsCore);
  const osjsSettings = new import_client.Settings(osjsCore, {});
  const osjsPackages = new import_client.Packages(osjsCore);
  osjsCore.register(import_client.CoreServiceProvider, {});
  osjsCore.register(import_client.DesktopServiceProvider, {});
  osjsCore.register(import_client.VFSServiceProvider, {});
  osjsCore.register(import_panels.PanelServiceProvider, {});
  osjsCore.register(import_client.NotificationServiceProvider, {});
  osjsCore.register(import_client.SettingsServiceProvider, { before: true });
  osjsCore.register(GUIServiceProvider, {});
  osjsDesktop.initLocales();
  osjsSettings.init();
  await osjsPackages.init();
  await osjsCore.make("osjs/settings");
  osjsCore.once("osjs/core:start", async () => {
    await osjsCore.make("osjs/settings");
  });
  osjsCore.once("osjs/core:started", async () => {
    const win = osjsCore.make("osjs/window", {
      // classList: [],
      title: "Standalone Window Manager",
      position: {
        top: 10,
        left: 10
      },
      dimension: {
        width: 300,
        height: 300
      }
    }).render(($content) => {
      const canvas = document.createElement("canvas");
      $content.appendChild(canvas);
      canvas?.addEventListener("wheel", (event2) => {
        inputEvent(event2);
      });
      canvas?.addEventListener("keydown", function(event2) {
        debugger;
        inputEvent(event2);
      }, false);
      canvas?.addEventListener("mousedown", function(event2) {
        inputEvent(event2);
      });
      canvas?.addEventListener("mousedown", function(event2) {
        inputEvent(event2);
      });
      const offscreen = canvas.transferControlToOffscreen();
      ecs.postMessage(["canvas", offscreen], [offscreen]);
    });
    win.on("keypress", (...args) => console.log("mark4", ...args));
    return;
  });
  osjsCore.boot();
});
/*! Bundled license information:

@osjs/client/dist/main.js:
  (*!
     * isobject <https://github.com/jonschlinkert/isobject>
     *
     * Copyright (c) 2014-2017, Jon Schlinkert.
     * Released under the MIT License.
     *)
  (*!
     * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
     *
     * Copyright (c) 2014-2017, Jon Schlinkert.
     * Released under the MIT License.
     *)
  (*!
     * unset-value <https://github.com/jonschlinkert/unset-value>
     *
     * Copyright (c) 2015, 2017, Jon Schlinkert.
     * Released under the MIT License.
     *)
  (*!
     * has-value <https://github.com/jonschlinkert/has-value>
     *
     * Copyright (c) 2014-2016, Jon Schlinkert.
     * Licensed under the MIT License.
     *)
  (*!
     * isobject <https://github.com/jonschlinkert/isobject>
     *
     * Copyright (c) 2014-2015, Jon Schlinkert.
     * Licensed under the MIT License.
     *)
  (*!
     * has-values <https://github.com/jonschlinkert/has-values>
     *
     * Copyright (c) 2014-2015, Jon Schlinkert.
     * Licensed under the MIT License.
     *)
  (*!
     * get-value <https://github.com/jonschlinkert/get-value>
     *
     * Copyright (c) 2014-2015, Jon Schlinkert.
     * Licensed under the MIT License.
     *)
  (*!
   * JavaScript Cookie v2.2.1
   * https://github.com/js-cookie/js-cookie
   *
   * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
   * Released under the MIT license
   *)
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE *)
  (*
   * OS.js - JavaScript Cloud/Web Desktop Platform
   *
   * Copyright (c) Anders Evenrud <andersevenrud@gmail.com>
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice, this
   *    list of conditions and the following disclaimer
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   *    this list of conditions and the following disclaimer in the documentation
   *    and/or other materials provided with the distribution
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
   * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
   * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   * @author  Anders Evenrud <andersevenrud@gmail.com>
   * @license Simplified BSD License
   *)
  (**
   * OS.js - JavaScript Cloud/Web Desktop Platform
   *
   * Copyright (c) Anders Evenrud <andersevenrud@gmail.com>
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice, this
   *    list of conditions and the following disclaimer
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   *    this list of conditions and the following disclaimer in the documentation
   *    and/or other materials provided with the distribution
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
   * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
   * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   * @author Anders Evenrud <andersevenrud@gmail.com>
   * @license Simplified BSD License
   * @preserve Copyright (c) Anders Evenrud <andersevenrud@gmail.com>
   *)
*/
