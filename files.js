/* Files App 0.7.0 - https://www.files.gallery/ */
!(function (e) {
  function t(e = _c.current_dir.path, t = _c.current_dir.basename, i) {
    var a = (_c.file_names || []).length;
    document.title = _c.config.title
      ? _c.config.title(e, t, i, a)
      : _c.title
          .replace("%name%", t || "/")
          .replace("%path%", e)
          .replace("%count%", a);
  }
  function i(e) {
    return e ? e.replace(/"/g, "&quot;") : "";
  }
  function a(e) {
    return e ? e.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
  }
  function n(e, t) {
    return '<span class="' + t + '">' + e + "</span>";
  }
  function o(e) {
    return J
      ? _c.script +
          "?download_dir_zip=" +
          encodeURIComponent(e.path) +
          "&" +
          e.mtime
      : "#";
  }
  (_c.config = Object.assign(
    {
      favicon:
        "<link rel=\"icon\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2337474F' d='M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z' /%3E%3C/svg%3E\" type=\"image/svg+xml\" />",
      title:
        ("%name% [%count%]" === _c.title || !_c.title) &&
        ((e, t, i, a) => (t || "/") + (i ? "" : " [" + a + "]")),
      panorama: {
        is_pano: (e, t) => {
          var i = e.dimensions[0],
            a = e.dimensions[1],
            n = t.max_texture_size;
          if (!(n < 2048 || i < 2048 || i / a != 2)) {
            if (!e.panorama_resized) return n >= i && s(e);
            var o = [i].concat(e.panorama_resized),
              l = o.pop(),
              r = screen.availWidth * t.pixel_ratio * 6;
            if (!(l > n)) {
              var c = o.find((e) => n >= e && e < r) || l;
              return c === i
                ? s(e)
                : e.url_path.replace(
                    e.basename,
                    "_files_" + c + "_" + e.basename
                  );
            }
          }
        },
      },
      history_scroll: !0,
      load_svg_max_filesize: 1e5,
    },
    _c.config || {}
  )),
    "isConnected" in Node.prototype ||
      Object.defineProperty(Node.prototype, "isConnected", {
        get() {
          return this.ownerDocument.contains(this);
        },
      });
  var l = {
    a: function (e, t, i) {
      return e
        ? '<a class="' +
            t +
            ' map-link" target="_blank" href="' +
            u(e) +
            '" data-lang="google maps"' +
            (i ? "" : ' title="' + K.get("google maps") + '"') +
            ">" +
            (i ? K.get("google maps") : F.get_svg_icon("marker")) +
            "</a>"
        : "";
    },
    span: function (e, t) {
      return e
        ? '<span class="' +
            t +
            ' map-link" data-href="' +
            u(e) +
            '"' +
            x("google maps") +
            ">" +
            F.get_svg_icon("marker") +
            "</span>"
        : "";
    },
  };
  function s(e, t) {
    var i = !!e.url_path && encodeURI(e.url_path).replace(/#/g, "%23");
    return e.is_dir
      ? i || "#"
      : !i ||
        (t && ["php", "htaccess"].includes(e.ext)) ||
        _c.load_files_proxy_php
      ? _c.script + (t ? "?download=" : "?file=") + encodeURIComponent(e.path)
      : i;
  }
  function r(e, t) {
    return e.url ? encodeURI(e.url) : e.is_dir ? c(e.path) : s(e, t);
  }
  function c(e) {
    return (
      location.pathname +
      (e ? "?" + encodeURIComponent(e).replace(/%2F/g, "/") : "")
    );
  }
  function p(e) {
    for (; e.firstChild; ) e.removeChild(e.firstChild);
  }
  function d(e, t) {
    e.length &&
      M(e, function (e) {
        (t || e.parentNode).removeChild(e);
      });
  }
  function m(e, t, i) {
    w(
      e,
      function (e) {
        var i = e.target.dataset.action;
        i && t(i, e);
      },
      "click",
      !1,
      i
    );
  }
  function u(e) {
    return Array.isArray(e)
      ? "https://www.google.com/maps/search/?api=1&query=" + e
      : "#";
  }
  function f(e, t) {
    return e
      ? '<span class="' + t + '">' + e[0] + " x " + e[1] + "</span>"
      : "";
  }
  function v(e, t) {
    return e.is_dir
      ? e.hasOwnProperty("dirsize")
        ? '<span class="' + t + '">' + filesize(e.dirsize) + "</span>"
        : ""
      : '<span class="' + t + '">' + filesize(e.filesize) + "</span>";
  }
  function g(e, t) {
    return _c.context_menu && e
      ? '<span class="context-button ' +
          t +
          '" data-action="context">' +
          F.get_svg_icon_multi("dots", "minus") +
          "</span>"
      : "";
  }
  function _(e, t, i, a) {
    if (!e || !e.iptc) return "";
    var n = Object.keys(e.iptc);
    if (!n.length) return "";
    var o = "",
      l = "",
      s = "";
    return (
      n.forEach(function (i) {
        var a = e.iptc[i];
        if (a) {
          if (["city", "sub-location", "province-state"].includes(i))
            return (l += '<span class="' + t + "-" + i + '">' + a + "</span>");
          if (["creator", "credit", "copyright"].includes(i))
            return (s += '<span class="' + t + "-" + i + '">' + a + "</span>");
          if ("keywords" === i && Array.isArray(a)) {
            var n = a.filter((e) => e);
            return (o += n.length
              ? '<div class="' + t + "-" + i + '">' + n.join(", ") + "</div>"
              : "");
          }
          return (o += '<div class="' + t + "-" + i + '">' + a + "</div>");
        }
      }),
      (o +=
        (l ? '<div class="' + t + '-location">' + l + "</div>" : "") +
        (s ? '<div class="' + t + '-owner">' + s + "</div>" : ""))
        ? i
          ? '<div class="' + t + '-iptc">' + o + "</div>"
          : o
        : ""
    );
  }
  function h(e, t, i) {
    if (!e || !e.exif) return "";
    var a = V(
      [
        "Model",
        "ApertureFNumber",
        "FocalLength",
        "ExposureTime",
        "ISOSpeedRatings",
        "gps",
      ],
      function (t) {
        var a = e.exif[t];
        if (!a) return "";
        if ("Model" === t)
          a =
            F.get_svg_icon(
              a.toLowerCase().indexOf("phone") > -1 ? "cellphone" : "camera"
            ) + a;
        else if ("FocalLength" === t) {
          var n = a.split("/");
          2 === n.length &&
            (a = (n[0] / n[1]).toFixed(1) + "<small>mm</small>");
        } else if ("gps" === t) return l[i || "a"](a, "exif-item exif-gps");
        return (
          '<span class="exif-item exif-' + t + '"' + x(t) + ">" + a + "</span>"
        );
      }
    );
    return a ? '<div class="' + t + '">' + a + "</div>" : "";
  }
  function x(e, t) {
    return e && B.is_pointer
      ? ' data-lang="' +
          e +
          '"' +
          (t ? ' data-tooltip="' : ' title="') +
          K.get(e, !t) +
          '"'
      : "";
  }
  function b(e) {
    if (navigator.clipboard) return navigator.clipboard.writeText(e);
    var t = document.createElement("span");
    (t.textContent = e),
      (t.style.whiteSpace = "pre"),
      document.body.appendChild(t);
    var i = window.getSelection(),
      a = window.document.createRange();
    i.removeAllRanges(), a.selectNode(t), i.addRange(a);
    var n = !1;
    try {
      n = window.document.execCommand("copy");
    } catch (e) {
      console.log("error", e);
    }
    return (
      i.removeAllRanges(),
      window.document.body.removeChild(t),
      n ? Promise.resolve() : Promise.reject()
    );
  }
  function y(e, t, i) {
    if (i || e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      var a = !!t && t.getAttribute("href");
      if (a && "#" !== a) return t.contains(e.target) || t.click(), !0;
    }
    e.preventDefault();
  }
  function w(e, t, i, a, n) {
    e.addEventListener(
      i || "click",
      (function (e, t) {
        return t
          ? function (a) {
              i ||
                (e.apply(this, arguments),
                (i = setTimeout(function () {
                  i = null;
                }, t)));
            }
          : e;
        var i;
      })(t, n)
    ),
      a && t();
  }
  function C(e, t) {
    var i;
    return function (a) {
      i && clearTimeout(i), (i = setTimeout(e, t || 1e3, a));
    };
  }
  function L(e, t, i, a) {
    return (
      a && (i = C(i, a)),
      e.addEventListener(t, i),
      {
        remove: function () {
          e.removeEventListener(t, i);
        },
      }
    );
  }
  function H(e, t, i) {
    var a = i ? "add" : "remove";
    M(k(e, t, !i), function (e) {
      e.classList[a](t);
    });
  }
  function k(e, t, i) {
    return e.filter(function (e) {
      return i == e.classList.contains(t);
    });
  }
  function M(e, t) {
    for (var i = e.length, a = 0; a < i; a++) t(e[a], a);
  }
  function V(e, t) {
    for (var i = "", a = e.length, n = 0; n < a; n++) i += t(e[n], n) || "";
    return i;
  }
  function z(e, t, i) {
    var a = new RegExp(
        "[" + (i ? "#" : "?") + "&]" + e + (t ? "=([^&]*)" : "($|&|=)")
      ),
      n = location[i ? "hash" : "search"].match(a);
    return !!n && (!t || n[1]);
  }
  function j(e) {
    _c.debug && console.log.apply(this, arguments);
  }
  function A(e, t) {
    e && !e.style.display != !t && (e.style.display = t ? "none" : null);
  }
  function E(e, t, i) {
    U.plugins.mousetrap.loaded &&
      Mousetrap[3 === arguments.length ? "bind" : "unbind"].apply(
        null,
        arguments
      );
  }
  (_id = document.getElementById.bind(document)),
    (_class = function (e, t) {
      return Array.from((t || document).getElementsByClassName(e));
    }),
    (_tag = function (e, t) {
      return Array.from((t || document).getElementsByTagName(e));
    }),
    (_query = function (e, t) {
      return (t || document).querySelector(e);
    }),
    (_querya = function (e, t) {
      return Array.from((t || document).querySelectorAll(e));
    });
  var I = (function () {
    function e(e) {
      return B.local_storage ? localStorage.getItem(e) : null;
    }
    function t(e, t) {
      "boolean" == typeof t && (t = t.toString());
      try {
        localStorage.setItem(e, t);
      } catch (e) {
        j("failed to write localstorage", e, "warn");
      }
    }
    return {
      get: function (t) {
        var i = e(t);
        return "true" === i || ("false" !== i && i);
      },
      get_json: function (t) {
        var i = e(t);
        if (i)
          try {
            return JSON.parse(i);
          } catch (e) {
            return null;
          }
        return null;
      },
      set: function (e, i, a, n) {
        return B.local_storage
          ? a && !i
            ? localStorage.removeItem(e)
            : n
            ? setTimeout(function () {
                t(e, i);
              }, n)
            : void t(e, i)
          : null;
      },
      remove: function (e) {
        if (B.local_storage) return localStorage.removeItem(e);
      },
    };
  })();
  function T(e) {
    var t = new XMLHttpRequest();
    return (
      (t.onreadystatechange = function () {
        if (4 == t.readyState)
          if ((e.always && e.always(t), 200 == t.status)) {
            var i = t.responseText,
              a = e.json_response,
              n = a
                ? (function () {
                    try {
                      return JSON.parse(i);
                    } catch (e) {
                      return (a = !1), i;
                    }
                  })()
                : i;
            if (a && n.error && "login" === n.error)
              oe.fire(K.get("login", !0) + "!").then((e) => {
                e.isConfirmed && location.reload();
              });
            else {
              e.complete && e.complete(n, i, a);
              var o = !e.url && t.getResponseHeader("files-msg");
              o && j("XHR: files-msg: " + o);
            }
          } else e.fail && e.fail(t);
      }),
      t.open(e.params ? "POST" : "GET", e.url || _c.script),
      e.params &&
        t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
      e.json_response && t.setRequestHeader("Accept", "application/json"),
      t.send(e.params || null),
      t
    );
  }
  function O(e) {
    return (
      _c.server_exif &&
      e &&
      e.exif &&
      e.exif.Orientation &&
      e.exif.Orientation > 4 &&
      e.exif.Orientation < 9
    );
  }
  function S(e) {
    return atob(e);
  }
  function R(e, t, i) {
    return Math.min(Math.max(i, e), t);
  }
  function Z() {
    if (B.scrollbar_width) {
      var e = document.documentElement,
        t =
          window.innerWidth > e.clientWidth
            ? e.getBoundingClientRect().width
            : 0;
      t
        ? t !== N.body_width && e.style.setProperty("--body-width", t + "px")
        : N.body_width && e.style.removeProperty("--body-width"),
        (N.body_width = t);
    }
  }
  var D = {
    store: function (e) {
      e.dataset.tooltipOriginal ||
        (e.dataset.tooltipOriginal = e.dataset.tooltip);
    },
    set: function (e, t, i) {
      D.store(e),
        (e.dataset.tooltip = K.get(t)),
        i && e.classList.add("show-tooltip");
    },
    timer: function (e, t, i, a) {
      t && D.store(e),
        t && (e.dataset.tooltip = K.get(t)),
        i && e.classList.add("tooltip-" + i),
        e.classList.add("show-tooltip"),
        setTimeout(function () {
          t && (e.dataset.tooltip = e.dataset.tooltipOriginal || ""),
            i && e.classList.remove("tooltip-" + i),
            e.classList.remove("show-tooltip");
        }, a || 1e3);
    },
  };
  function P(e) {
    if (
      !(
        e.is_dir &&
        e.is_readable &&
        _c.folder_preview_image &&
        _c.load_images &&
        _c.image_resize_enabled
      )
    )
      return "";
    var t = _c.dirs[e.path],
      i = !1;
    if (t && t.hasOwnProperty("preview")) {
      if (!t.preview) return "";
      t.files &&
        t.files[t.preview] &&
        (i =
          "?file=" +
          encodeURIComponent(e.path + "/" + t.preview) +
          "&resize=" +
          _c.image_resize_dimensions);
    }
    return (
      i || (i = "?preview=" + encodeURIComponent(e.path)),
      '<img data-src="' +
        _c.script +
        i +
        "&" +
        _c.image_cache_hash +
        "." +
        e.mtime +
        '" class="files-folder-preview files-lazy">'
    );
  }
  function q() {
    var e = Swal.getContainer(),
      t = getComputedStyle(e);
    (![t.top, t.right, t.bottom, t.left].every((e) => 0 == e || "0px" == e) ||
      e.offsetWidth < window.innerWidth - 100 ||
      e.offsetHeight < window.innerHeight - 100 ||
      1 != t.opacity ||
      "none" == t.pointerEvents ||
      "none" == t.display ||
      "fixed" != t.position ||
      "visible" != t.visibility) &&
      document.body.remove();
  }
  var _h = {
    popup: (e, t, i, a, n) => {
      e && e.preventDefault(),
        (t = Math.floor(Math.min(screen.width, t || 1e3))),
        (i = Math.floor(Math.min(screen.height, i || 99999)));
      var o = window.open(
        a,
        n || null,
        "toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,titlebar=no,width=" +
          t +
          ",height=" +
          i +
          ",top=" +
          Math.round(screen.height / 2 - i / 2) +
          ",left=" +
          Math.round(screen.width / 2 - t / 2)
      );
      return window.focus && o.focus(), o;
    },
  };
  (_c.debug = z("debug") || 0 === location.host.indexOf("files.test")),
    (_c.files = {}),
    j("_c", _c);
  var F = {},
    N = {},
    U = {},
    W = {
      main: _id("main"),
      topbar: _id("topbar"),
      files_container: _id("files-container"),
      files: _id("files"),
      topbar_info: _id("topbar-info"),
      filter_container: _id("search-container"),
      filter: _id("search"),
      modal: _id("files_modal"),
      modal_bg: _id("modal-bg"),
    },
    B = {};
  function X(e, t) {
    if (t.mime1 && t.mime0 === e)
      return (
        B.hasOwnProperty(e) ||
          (B[e] = (function () {
            if ("audio" === e && !window.Audio) return !1;
            var t =
              "audio" === e
                ? [
                    "mpeg",
                    "mp4",
                    "x-aiff",
                    "ogg",
                    "x-m4a",
                    "aac",
                    "webm",
                    "wave",
                    "wav",
                    "x-wav",
                    "x-pn-wav",
                    "flac",
                  ]
                : ["mp4", "webm", "ogg", "3gp", "m4v", "x-m4v"];
            try {
              var i = document.createElement(e);
              if (!i.canPlayType) return !1;
              var a = t.filter(function (t) {
                return i.canPlayType(e + "/" + t).replace(/no/, "");
              });
              return !!a.length && a;
            } catch (e) {
              return !1;
            }
          })()),
        !(!B[e] || !B[e].includes(t.mime1)) && t.mime1
      );
  }
  function Y(e) {
    return e[0].toUpperCase() + e.slice(1);
  }
  !(function () {
    var e = B,
      t = document,
      i = t.documentElement,
      a = navigator,
      n = window;
    e.explorer = /MSIE /.test(a.userAgent) || /Trident\//.test(a.userAgent);
    var o = !!((n.CSS && n.CSS.supports) || n.supportsCSS);
    (!e.explorer && o && CSS.supports("color", "var(--fake-var)")) ||
      ((t.body.innerHTML =
        '<div class="alert alert-danger" role="alert"><h4 class="alert-heading">' +
        (e.explorer ? "Internet Explorer" : "This browser is") +
        ' not supported.</h4>Please use a modern browser like <a href="https://www.microsoft.com/en-us/windows/microsoft-edge" class="alert-link">Edge</a>, <a href="https://www.google.com/chrome/" class="alert-link">Chrome</a>, <a href="https://www.mozilla.org/firefox/" class="alert-link">Firefox</a>, <a href="https://www.opera.com/" class="alert-link">Opera</a> or <a href="https://www.apple.com/safari/" class="alert-link">Safari</a>.</div>'),
      t.body.classList.remove("body-loading"),
      fail),
      (e.local_storage =
        !!n.localStorage &&
        (function () {
          try {
            var e = "_t";
            return (
              n.localStorage.setItem(e, e), n.localStorage.removeItem(e), !0
            );
          } catch (e) {
            return !1;
          }
        })()),
      (e.is_touch =
        "ontouchstart" in n ||
        a.maxTouchPoints > 0 ||
        a.msMaxTouchPoints > 0 ||
        (n.DocumentTouch && t instanceof DocumentTouch) ||
        n.matchMedia("(any-pointer: coarse)").matches),
      (e.is_pointer = !e.is_touch || matchMedia("(pointer:fine)").matches),
      (e.is_dual_input = e.is_touch && e.is_pointer),
      (e.only_touch = e.is_touch && !e.is_pointer),
      (e.only_pointer = !e.is_touch && e.is_pointer),
      (e.PointerEvent = !!n.PointerEvent || a.msPointerEnabled),
      (e.nav_langs =
        (!(!a.languages || !a.languages.length) && a.languages) ||
        (!!a.language && [a.language])),
      (e.pointer_events = !!("PointerEvent" in n) || a.msPointerEnabled),
      (e.is_mac = a.platform.toUpperCase().indexOf("MAC") >= 0),
      e.is_mac && i.style.setProperty("--mac-bold", "500"),
      (e.c_key = e.is_mac ? "⌘" : "ctrl-"),
      (e.scrollbar_width = e.is_pointer
        ? (function () {
            var e = n.innerWidth - i.clientWidth;
            if (e) return e;
            var a = t.createElement("div");
            t.body.appendChild(a),
              (a.style.cssText =
                "width: 100px;height: 100px;overflow: scroll;position: absolute;top: -9999px");
            var o = a.offsetWidth - a.clientWidth;
            return t.body.removeChild(a), o;
          })()
        : 0),
      e.scrollbar_width && i.classList.add("has-scrollbars"),
      (e.pixel_ratio = n.devicePixelRatio || 1),
      (e.download = "download" in t.createElement("a")),
      (e.clipboard = !(
        !t.queryCommandSupported || !t.queryCommandSupported("copy")
      )),
      (e.url = !("function" != typeof URL)),
      (e.fullscreen = screenfull.isEnabled),
      (e.image_orientation = CSS.supports("image-orientation", "from-image")),
      (e.browser_images = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "svg",
        "svg+xml",
        "ico",
        "vnd.microsoft.icon",
        "x-icon",
      ]);
    var l = new Image();
    (l.onload = l.onerror =
      function () {
        2 == l.height && e.browser_images.push("webp"),
          (e.webp = 2 == l.height);
      }),
      (l.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"),
      (e.history = !(!n.history || !history.pushState)),
      e.history || (_c.history = !1),
      (e.URLSearchParams = !!("URLSearchParams" in n)),
      location.search &&
        e.URLSearchParams &&
        new URLSearchParams(location.search).forEach(function (e, t) {
          e && t.startsWith("--") && i.style.setProperty(t, e);
        }),
      (e.max_texture_size =
        (function () {
          if (n.WebGLRenderingContext) {
            var e = document.createElement("canvas");
            if (e && e.getContext)
              try {
                var t =
                  e.getContext("webgl") || e.getContext("experimental-webgl");
                return !!t && t.getParameter(t.MAX_TEXTURE_SIZE);
              } catch (e) {
                return;
              }
          }
        })() || 0);
  })(),
    j("tests", B),
    (function () {
      if (B.local_storage) {
        var e = z("clearall", !0),
          t = !e && z("clear", !0),
          i = e || t;
        if (
          ((F.clean_localstorage = function () {
            if (!i) {
              var e = Object.keys(localStorage);
              e.length &&
                M(e, function (e) {
                  if (e.startsWith("files:menu:")) localStorage.removeItem(e);
                  else if (e.startsWith("files:dir:"))
                    if (e.startsWith("files:dir:" + _c.dirs_hash)) {
                      if (_c.exists) {
                        var t = e.split(":"),
                          i = t[3];
                        if (
                          _c.menu_max_depth &&
                          i.split("/").length >= _c.menu_max_depth
                        )
                          return;
                        var a = parseInt(t[4]);
                        (_c.dirs[i] && _c.dirs[i].mtime == a) ||
                          localStorage.removeItem(e);
                      }
                    } else localStorage.removeItem(e);
                });
            }
          }),
          i)
        ) {
          var a = 0;
          M(Object.keys(localStorage), function (t) {
            ((e && t.startsWith("files:")) ||
              t.startsWith("files:menu:") ||
              t.startsWith("files:dir:")) &&
              (localStorage.removeItem(t), a++);
          }),
            j(a + " localStorage items cleared");
        } else _c.menu_exists || F.clean_localstorage();
      }
    })(),
    (function () {
      B.local_storage &&
        "clear_storage" === z("action", !0) &&
        M(Object.keys(localStorage), function (e) {
          (e.startsWith("files:config:") || e.startsWith("files:interface:")) &&
            localStorage.removeItem(e);
        });
      var e = {},
        t = ["layout", "sort", "menu_show"];
      t.forEach(function (t) {
        e[t] = _c[t];
      }),
        (F.set_config = function (t, i) {
          if (e.hasOwnProperty(t)) {
            if (((_c[t] = i), e[t] === i)) return I.remove("files:config:" + t);
            I.set("files:config:" + t, i);
          }
        });
      var i = I.get_json("files:options:" + _c.location_hash);
      i &&
        (M(Object.keys(i), function (e) {
          F.set_config(e, i[e]);
        }),
        I.remove("files:options:" + _c.location_hash),
        I.remove("files:ls_options")),
        M(t, function (e) {
          var t = I.get("files:config:" + e);
          if (null !== t)
            return t === _c[e]
              ? I.remove("files:config:" + e)
              : void (_c[e] = t);
        });
    })();
  var K = (function () {
    var e = !1,
      t = !1,
      i = (_c.config && _c.config.lang) || {},
      a = {
        bg: null,
        cs: null,
        da: null,
        de: null,
        en: null,
        es: null,
        et: null,
        fr: null,
        hu: null,
        it: null,
        ja: null,
        ko: null,
        nl: null,
        no: null,
        pl: null,
        pt: null,
        ro: null,
        ru: null,
        sk: null,
        th: null,
        zh: null,
      },
      n = {
        cs: "cz",
        da: "dk",
        en: "gb",
        et: "ee",
        ja: "jp",
        ko: "kr",
        sv: "se",
        vi: "vn",
        zh: "cn",
      },
      o = "object" == typeof _c.lang_custom ? _c.lang_custom : {};
    "object" == typeof i.langs &&
      Object.keys(i.langs).forEach((e) => {
        o[e] = Object.assign(o[e] || {}, i.langs[e]);
      }),
      Object.keys(o).forEach((e) => {
        o[e].flag && (n[e] = o[e].flag), a.hasOwnProperty(e) || (a[e] = o[e]);
      });
    var l = Object.keys(a).sort();
    if (B.local_storage) {
      var s = I.get("files:version");
      s !== _c.version && I.set("files:version", _c.version),
        s &&
          s !== _c.version &&
          M(l, function (e) {
            I.remove("files:lang:" + e);
          });
    }
    var r = {},
      c = {
        get: function (e, t) {
          var i = r[e] || e;
          return t ? Y(i) : i;
        },
        set: function (e, t) {
          (e.dataset.lang = t), (e.textContent = this.get(t));
        },
        span: function (e, t) {
          return (
            '<span data-lang="' +
            e +
            '" class="no-pointer">' +
            this.get(e, t) +
            "</span>"
          );
        },
        dropdown: function () {
          var a = z("lang_menu", !0) || i.menu;
          if (a && "false" != a && "0" != a) {
            var o = Array.isArray(i.menu) ? i.menu : l;
            W.topbar_top.insertAdjacentHTML(
              "beforeend",
              '<div id="change-lang" class="dropdown' +
                (e ? " dropdown-lang-loading" : "") +
                '"><button type="button" class="btn-icon btn-topbar btn-lang" data-text="' +
                _.split("-")[0] +
                '"></button><div class="dropdown-menu dropdown-menu-topbar dropdown-menu-left"><h6 class="dropdown-header" data-lang="language">' +
                c.get("language") +
                '</h6><div class="dropdown-lang-items">' +
                V(o, function (e) {
                  return (
                    '<button class="dropdown-item-lang' +
                    (e === _ ? " dropdown-lang-active" : "") +
                    '" data-action="' +
                    e +
                    '"><img src="' +
                    _c.assets +
                    "flag-icons@6.6.4/flags/1x1/" +
                    (n[e] || e) +
                    '.svg" class="dropdown-lang-flag"></button>'
                  );
                }) +
                "</div></div>"
            );
            var s = (t = W.topbar_top.lastElementChild).firstElementChild,
              r = t.lastElementChild.lastElementChild,
              d = o.indexOf(_),
              u = d > -1 && r.children[d];
            F.dropdown(t, s),
              m(r, function (e, t) {
                e !== _ &&
                  ((_ = e),
                  p(e),
                  F.dayjs_locale(e),
                  U.uppy && F.uppy_locale(e),
                  I.set("files:lang:current", e),
                  (s.dataset.text = e.split("-")[0]),
                  u && u.classList.remove("dropdown-lang-active"),
                  (u = t.target).classList.add("dropdown-lang-active"));
              });
          }
        },
      };
    function p(e) {
      if ("en" === e) return u({}, e);
      var t = a[e] || I.get_json("files:lang:" + e);
      return t
        ? u(t, e)
        : (function (e) {
            d(!0),
              T({
                url:
                  _c.assets +
                  "files.photo.gallery@" +
                  _c.version +
                  "/lang/" +
                  e +
                  ".json",
                json_response: !0,
                complete: function (t, i, a) {
                  d(), t && i && a && (I.set("files:lang:" + e, i), u(t, e));
                },
                fail: function () {
                  d();
                },
              });
          })(e);
    }
    function d(i) {
      (e = !!i), t && t.classList.toggle("dropdown-lang-loading", e);
    }
    function u(e, t) {
      a[t] || (a[t] = Object.assign(e, o[t] || {})),
        (r = e),
        _querya("[data-lang]").forEach(function (e) {
          var t = c.get(e.dataset.lang);
          return e.dataset.tooltip
            ? (e.dataset.tooltip = t)
            : e.title
            ? (e.title = Y(t))
            : void (e.textContent = t);
        }),
        W.filter && (W.filter.placeholder = c.get("filter"));
    }
    function f(e) {
      if (e) return "nb" === e || "nn" === e ? "no" : !!l.includes(e) && e;
    }
    var v = z("lang", !0),
      g = f(v);
    "reset" === v && I.remove("files:lang:current"),
      g && I.set("files:lang:current", g);
    var _ =
      g ||
      f(I.get("files:lang:current")) ||
      (function () {
        if (_c.lang_auto && B.nav_langs)
          for (var e = 0; e < B.nav_langs.length; e++) {
            var t = B.nav_langs[e].toLowerCase().split("-");
            if ("tw" === t[1]) return;
            var i = f(t[0]);
            if (i) return i;
          }
      })() ||
      f(_c.lang_default) ||
      "en";
    return "en" === _ ? Object.assign(r, o.en || {}) : p(_), c;
  })();
  !(function () {
    var e = {
      codemirror: "codemirror@5.65.6",
      headroom: "headroom.js@0.12.0",
      mousetrap: "mousetrap@1.6.5",
      uppy: "uppy@2.13.3",
      pannellum: "pannellum@2.5.6",
    };
    function t(e) {
      (e.loading = !1),
        (e.loaded = !0),
        M(e.complete, function (e) {
          e();
        }),
        delete e.complete,
        delete e.src;
    }
    function i(e, t, i) {
      var a = 0;
      M(e, function (n) {
        !(function (e, t, i) {
          var a = "js" == i.type || "js" == e.slice(-2),
            n = document.createElement(a ? "script" : "link");
          (n[a ? "src" : "href"] = e.startsWith("http") ? e : _c.assets + e),
            t && (n.onload = t);
          i.error && (n.onerror = i.error);
          a
            ? document.body.appendChild(n)
            : ((n.type = "text/css"),
              (n.rel = "stylesheet"),
              document.head.insertBefore(n, _tag("link", document.head)[0]));
        })(
          n,
          function () {
            ++a === e.length && t && t();
          },
          i
        );
      });
    }
    (U.plugins = {
      codemirror: {
        src: [
          [
            e.codemirror + "/lib/codemirror.min.js",
            e.codemirror + "/lib/codemirror.css",
          ],
          [
            e.codemirror + "/mode/meta.js",
            e.codemirror + "/addon/mode/loadmode.js",
          ],
        ],
        complete: [
          function () {
            CodeMirror.modeURL = _c.assets + e.codemirror + "/mode/%N/%N.js";
          },
        ],
      },
      headroom: { src: [e.headroom + "/dist/headroom.min.js"] },
      mousetrap: { src: [e.mousetrap + "/mousetrap.min.js"] },
      pannellum: { src: [e.pannellum + "/build/pannellum.min.js"] },
      uppy: {
        src: [e.uppy + "/dist/uppy.min.js", e.uppy + "/dist/uppy.min.css"],
      },
    }),
      (F.load_plugin = function (e, a, n) {
        U.plugins[e] || (U.plugins[e] = {});
        var o = n ? Object.assign(U.plugins[e], n) : U.plugins[e];
        if (o.loaded) a && a();
        else if (o.loading) a && o.complete.push(a);
        else {
          (o.loading = !0),
            o.complete || (o.complete = []),
            a && o.complete.push(a);
          var l = o.src && Array.isArray(o.src[0]);
          i(
            l ? o.src[0] : o.src,
            function () {
              l
                ? i(
                    o.src[1],
                    function () {
                      t(o);
                    },
                    o
                  )
                : t(o);
            },
            o
          );
        }
      }),
      F.load_plugin("mousetrap", function () {
        Mousetrap.bind(["mod+f"], function (e) {
          e.preventDefault(), U.headroom.pin(), W.filter.focus();
        });
      }),
      "scroll" === _c.topbar_sticky &&
        getComputedStyle(W.topbar).position.match("sticky") &&
        F.load_plugin("headroom", function () {
          if (Headroom.cutsTheMustard) {
            var e = {
              tolerance: { down: 10, up: 20 },
              offset: W.topbar.clientHeight,
            };
            (U.headroom = new Headroom(W.topbar, e)), U.headroom.init();
          }
        });
  })();
  var G = _c.menu_exists ? 2 : 1,
    J = !0;
  function Q() {
    if (G--) return !G && setTimeout(Q, 1e3);
    var e = S("ZmlsZXM6cXJ4"),
      t = location.hostname,
      i = I.get(e);
    if (!i || (i != _c.qrx && S(i) != t)) {
      var a = _c.x3_path && !_c.qrx;
      if (!a || _c[S("dXNlcng=")] !== S("ZnA="))
        return _c.qrx || a || !t || t.includes(".")
          ? !_c.qrx ||
            ("string" == typeof _c.qrx && /^[a-f0-9]{32}$/.test(_c.qrx))
            ? void T({
                params:
                  (_c.qrx ? "key=" + _c.qrx + "&" : "") +
                  (a ? "app=1&domain=" : "app=2&host=") +
                  encodeURI(t),
                url: S("aHR0cHM6Ly9hdXRoLnBob3RvLmdhbGxlcnkv"),
                json_response: !0,
                complete: function (i, o, l) {
                  if (l && i && i.hasOwnProperty("status"))
                    return i.status && 301 != i.status
                      ? void (a || I.set(e, _c.qrx || btoa(t)))
                      : n(_c.qrx);
                },
              })
            : n(!0)
          : n();
    }
  !(function () {
    function e(e, t, i) {
      return (
        e.format(t) +
        (i ? '<span class="relative-time">' + e.fromNow() + "</span>" : "")
      );
    }
    function t(t) {
      dayjs.locale(t),
        W.main.style.setProperty(
          "--list-date-flex",
          dayjs().hour(22).date(22).format("L LT").length - 16
        ),
        M(_tag("time"), function (t) {
          if (t.dataset.time) {
            var i = dayjs.unix(t.dataset.time);
            (t.innerHTML = e(i, t.dataset.format, t.children[0])),
              t.dataset.titleFormat &&
                (t.title =
                  i.format(t.dataset.titleFormat) + " — " + i.fromNow());
          }
        }),
        _c.current_dir && (_c.current_dir.html = !1);
    }
    function i(e) {
      F.load_plugin(
        "dayjs_locale_" + e,
        function () {
          t(e);
        },
        { src: ["dayjs@1.11.5/locale/" + e + ".js"] }
      );
    }
    (F.get_time = function (t, i, a, n) {
      var o = dayjs.unix(t.mtime);
      return (
        '<time datetime="' +
        o.format() +
        '" data-time="' +
        t.mtime +
        '" data-format="' +
        i +
        '"' +
        (a && B.is_pointer
          ? ' title="' +
            o.format("LLLL") +
            " ~ " +
            o.fromNow() +
            '" data-title-format="LLLL"'
          : "") +
        ">" +
        e(o, i, n) +
        "</time>"
      );
    }),
      dayjs.extend(dayjs_plugin_localizedFormat),
      dayjs.extend(dayjs_plugin_relativeTime),
      (F.dayjs_locale = function (e) {
        if ("en" === e) return t(e);
        (e = n(e)) && i(e);
      });
    var a = [
      "af",
      "ar-dz",
      "am",
      "ar-iq",
      "ar-kw",
      "ar-ly",
      "ar-ma",
      "ar-sa",
      "ar-tn",
      "ar",
      "az",
      "be",
      "bg",
      "bm",
      "bi",
      "bn-bd",
      "bn",
      "bo",
      "br",
      "bs",
      "ca",
      "cs",
      "cv",
      "cy",
      "da",
      "de-at",
      "de-ch",
      "de",
      "dv",
      "el",
      "en-au",
      "en-ca",
      "en-gb",
      "en-ie",
      "en-il",
      "en-in",
      "en-nz",
      "en-sg",
      "en-tt",
      "eo",
      "en",
      "es-do",
      "es-mx",
      "es",
      "et",
      "eu",
      "fa",
      "fi",
      "fo",
      "fr-ca",
      "fr-ch",
      "fr",
      "fy",
      "ga",
      "gd",
      "gl",
      "gom-latn",
      "gu",
      "he",
      "hi",
      "hr",
      "ht",
      "hu",
      "hy-am",
      "id",
      "it-ch",
      "is",
      "ja",
      "it",
      "ka",
      "jv",
      "kk",
      "km",
      "ko",
      "kn",
      "ku",
      "ky",
      "lb",
      "lo",
      "lv",
      "lt",
      "me",
      "mi",
      "mk",
      "ml",
      "mn",
      "mr",
      "ms-my",
      "ms",
      "mt",
      "my",
      "nb",
      "ne",
      "nl-be",
      "nn",
      "nl",
      "pa-in",
      "oc-lnc",
      "pt-br",
      "pl",
      "pt",
      "rn",
      "ro",
      "ru",
      "es-us",
      "es-pr",
      "sd",
      "si",
      "sk",
      "sl",
      "sq",
      "sr-cyrl",
      "sr",
      "ss",
      "sv-fi",
      "sv",
      "sw",
      "te",
      "ta",
      "tet",
      "tg",
      "tk",
      "tl-ph",
      "tlh",
      "th",
      "tr",
      "tzl",
      "tzm-latn",
      "tzm",
      "ug-cn",
      "uk",
      "ur",
      "uz-latn",
      "uz",
      "vi",
      "x-pseudo",
      "yo",
      "zh-cn",
      "zh-hk",
      "zh-tw",
      "zh",
      "rw",
      "se",
    ];
    function n(e) {
      if (e) return "no" === e || "nn" === e ? "nb" : !!a.includes(e) && e;
    }
    var o =
      n(z("lang", !0)) ||
      n(I.get("files:lang:current")) ||
      (function () {
        if (_c.lang_auto && B.nav_langs)
          for (var e = 0; e < B.nav_langs.length; e++) {
            var t = B.nav_langs[e].toLowerCase(),
              i = n(t) || (!!t.includes("-") && n(t.split("-")[0]));
            if (i) return i;
          }
      })() ||
      n(_c.lang_default) ||
      "en";
    ["en", "en-us"].includes(o) || i(o);
  })(),
    (function () {
      var e = {
          bell: "M16,17H7V10.5C7,8 9,6 11.5,6C14,6 16,8 16,10.5M18,16V10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18M11.5,22A2,2 0 0,0 13.5,20H9.5A2,2 0 0,0 11.5,22Z",
          check: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
          close:
            "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
          dots: "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",
          expand:
            "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z",
          collapse:
            "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z",
          zoom_in:
            "M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z",
          zoom_out:
            "M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M7,9H12V10H7V9Z",
          chevron_left:
            "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
          chevron_right:
            "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
          arrow_left:
            "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",
          arrow_right:
            "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z",
          link: "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z",
          logout:
            "M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z",
          download: "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z",
          tray_arrow_down:
            "M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z",
          tray_arrow_up:
            "M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 2L6.46 7.46L7.88 8.88L11 5.75V15H13V5.75L16.13 8.88L17.55 7.45L12 2Z",
          content_copy:
            "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z",
          pencil_outline:
            "M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z",
          close_thick:
            "M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z",
          plus_circle_multiple_outline:
            "M16,8H14V11H11V13H14V16H16V13H19V11H16M2,12C2,9.21 3.64,6.8 6,5.68V3.5C2.5,4.76 0,8.09 0,12C0,15.91 2.5,19.24 6,20.5V18.32C3.64,17.2 2,14.79 2,12M15,3C10.04,3 6,7.04 6,12C6,16.96 10.04,21 15,21C19.96,21 24,16.96 24,12C24,7.04 19.96,3 15,3M15,19C11.14,19 8,15.86 8,12C8,8.14 11.14,5 15,5C18.86,5 22,8.14 22,12C22,15.86 18.86,19 15,19Z",
          upload: "M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z",
          clipboard:
            "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z",
          save_edit:
            "M10,19L10.14,18.86C8.9,18.5 8,17.36 8,16A3,3 0 0,1 11,13C12.36,13 13.5,13.9 13.86,15.14L20,9V7L16,3H4C2.89,3 2,3.9 2,5V19A2,2 0 0,0 4,21H10V19M4,5H14V9H4V5M20.04,12.13C19.9,12.13 19.76,12.19 19.65,12.3L18.65,13.3L20.7,15.35L21.7,14.35C21.92,14.14 21.92,13.79 21.7,13.58L20.42,12.3C20.31,12.19 20.18,12.13 20.04,12.13M18.07,13.88L12,19.94V22H14.06L20.12,15.93L18.07,13.88Z",
          marker:
            "M18.27 6C19.28 8.17 19.05 10.73 17.94 12.81C17 14.5 15.65 15.93 14.5 17.5C14 18.2 13.5 18.95 13.13 19.76C13 20.03 12.91 20.31 12.81 20.59C12.71 20.87 12.62 21.15 12.53 21.43C12.44 21.69 12.33 22 12 22H12C11.61 22 11.5 21.56 11.42 21.26C11.18 20.53 10.94 19.83 10.57 19.16C10.15 18.37 9.62 17.64 9.08 16.93L18.27 6M9.12 8.42L5.82 12.34C6.43 13.63 7.34 14.73 8.21 15.83C8.42 16.08 8.63 16.34 8.83 16.61L13 11.67L12.96 11.68C11.5 12.18 9.88 11.44 9.3 10C9.22 9.83 9.16 9.63 9.12 9.43C9.07 9.06 9.06 8.79 9.12 8.43L9.12 8.42M6.58 4.62L6.57 4.63C4.95 6.68 4.67 9.53 5.64 11.94L9.63 7.2L9.58 7.15L6.58 4.62M14.22 2.36L11 6.17L11.04 6.16C12.38 5.7 13.88 6.28 14.56 7.5C14.71 7.78 14.83 8.08 14.87 8.38C14.93 8.76 14.95 9.03 14.88 9.4L14.88 9.41L18.08 5.61C17.24 4.09 15.87 2.93 14.23 2.37L14.22 2.36M9.89 6.89L13.8 2.24L13.76 2.23C13.18 2.08 12.59 2 12 2C10.03 2 8.17 2.85 6.85 4.31L6.83 4.32L9.89 6.89Z",
          info: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",
          folder:
            "M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z",
          folder_plus: "M13 9h-2v3H8v2h3v3h2v-3h3v-2h-3z",
          folder_minus: "M7.874 12h8v2h-8z",
          folder_forbid:
            "M22 11.255a6.972 6.972 0 0 0-2-.965V7h-8.414l-2-2H4v14h7.29a6.96 6.96 0 0 0 .965 2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H21a1 1 0 0 1 1 1v5.255zM18 22a5 5 0 1 1 0-10a5 5 0 0 1 0 10zm-1.293-2.292a3 3 0 0 0 4.001-4.001l-4.001 4zm-1.415-1.415l4.001-4a3 3 0 0 0-4.001 4.001z",
          folder_link:
            "M22 13h-2V7h-8.414l-2-2H4v14h9v2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H21a1 1 0 0 1 1 1v7zm-4 4v-3.5l5 4.5l-5 4.5V19h-3v-2h3z",
          folder_wrench:
            "M13.03 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V17.5L20.96 16.44C20.97 16.3 21 16.15 21 16C21 13.24 18.76 11 16 11S11 13.24 11 16C11 17.64 11.8 19.09 13.03 20M22.87 21.19L18.76 17.08C19.17 16.04 18.94 14.82 18.08 13.97C17.18 13.06 15.83 12.88 14.74 13.38L16.68 15.32L15.33 16.68L13.34 14.73C12.8 15.82 13.05 17.17 13.93 18.08C14.79 18.94 16 19.16 17.05 18.76L21.16 22.86C21.34 23.05 21.61 23.05 21.79 22.86L22.83 21.83C23.05 21.65 23.05 21.33 22.87 21.19Z",
          folder_cog_outline:
            "M4 4C2.89 4 2 4.89 2 6V18C2 19.11 2.9 20 4 20H12V18H4V8H20V12H22V8C22 6.89 21.1 6 20 6H12L10 4M18 14C17.87 14 17.76 14.09 17.74 14.21L17.55 15.53C17.25 15.66 16.96 15.82 16.7 16L15.46 15.5C15.35 15.5 15.22 15.5 15.15 15.63L14.15 17.36C14.09 17.47 14.11 17.6 14.21 17.68L15.27 18.5C15.25 18.67 15.24 18.83 15.24 19C15.24 19.17 15.25 19.33 15.27 19.5L14.21 20.32C14.12 20.4 14.09 20.53 14.15 20.64L15.15 22.37C15.21 22.5 15.34 22.5 15.46 22.5L16.7 22C16.96 22.18 17.24 22.35 17.55 22.47L17.74 23.79C17.76 23.91 17.86 24 18 24H20C20.11 24 20.22 23.91 20.24 23.79L20.43 22.47C20.73 22.34 21 22.18 21.27 22L22.5 22.5C22.63 22.5 22.76 22.5 22.83 22.37L23.83 20.64C23.89 20.53 23.86 20.4 23.77 20.32L22.7 19.5C22.72 19.33 22.74 19.17 22.74 19C22.74 18.83 22.73 18.67 22.7 18.5L23.76 17.68C23.85 17.6 23.88 17.47 23.82 17.36L22.82 15.63C22.76 15.5 22.63 15.5 22.5 15.5L21.27 16C21 15.82 20.73 15.65 20.42 15.53L20.23 14.21C20.22 14.09 20.11 14 20 14M19 17.5C19.83 17.5 20.5 18.17 20.5 19C20.5 19.83 19.83 20.5 19 20.5C18.16 20.5 17.5 19.83 17.5 19C17.5 18.17 18.17 17.5 19 17.5Z",
          folder_open:
            "M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 5v14h16V7h-8.414l-2-2H4zm8 7V9l4 4l-4 4v-3H8v-2h4z",
          folder_move_outline:
            "M20 18H4V8H20V18M12 6L10 4H4C2.9 4 2 4.89 2 6V18C2 19.11 2.9 20 4 20H20C21.11 20 22 19.11 22 18V8C22 6.9 21.11 6 20 6H12M11 14V12H15V9L19 13L15 17V14H11Z",
          alert_circle_outline:
            "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",
          date: "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",
          camera:
            "M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z",
          cellphone:
            "M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z",
          plus: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
          minus: "M19,13H5V11H19V13Z",
          menu: "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",
          menu_back:
            "M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z",
          gif: "M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zM19 10.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z",
          rotate_right:
            "M16.89,15.5L18.31,16.89C19.21,15.73 19.76,14.39 19.93,13H17.91C17.77,13.87 17.43,14.72 16.89,15.5M13,17.9V19.92C14.39,19.75 15.74,19.21 16.9,18.31L15.46,16.87C14.71,17.41 13.87,17.76 13,17.9M19.93,11C19.76,9.61 19.21,8.27 18.31,7.11L16.89,8.53C17.43,9.28 17.77,10.13 17.91,11M15.55,5.55L11,1V4.07C7.06,4.56 4,7.92 4,12C4,16.08 7.05,19.44 11,19.93V17.91C8.16,17.43 6,14.97 6,12C6,9.03 8.16,6.57 11,6.09V10L15.55,5.55Z",
          motion_play_outline:
            "M10 16.5L16 12L10 7.5M22 12C22 6.46 17.54 2 12 2C10.83 2 9.7 2.19 8.62 2.56L9.32 4.5C10.17 4.16 11.06 3.97 12 3.97C16.41 3.97 20.03 7.59 20.03 12C20.03 16.41 16.41 20.03 12 20.03C7.59 20.03 3.97 16.41 3.97 12C3.97 11.06 4.16 10.12 4.5 9.28L2.56 8.62C2.19 9.7 2 10.83 2 12C2 17.54 6.46 22 12 22C17.54 22 22 17.54 22 12M5.47 3.97C6.32 3.97 7 4.68 7 5.47C7 6.32 6.32 7 5.47 7C4.68 7 3.97 6.32 3.97 5.47C3.97 4.68 4.68 3.97 5.47 3.97Z",
          motion_pause_outline:
            "M22 12C22 6.46 17.54 2 12 2C10.83 2 9.7 2.19 8.62 2.56L9.32 4.5C10.17 4.16 11.06 3.97 12 3.97C16.41 3.97 20.03 7.59 20.03 12C20.03 16.41 16.41 20.03 12 20.03C7.59 20.03 3.97 16.41 3.97 12C3.97 11.06 4.16 10.12 4.5 9.28L2.56 8.62C2.19 9.7 2 10.83 2 12C2 17.54 6.46 22 12 22C17.54 22 22 17.54 22 12M5.47 7C4.68 7 3.97 6.32 3.97 5.47C3.97 4.68 4.68 3.97 5.47 3.97C6.32 3.97 7 4.68 7 5.47C7 6.32 6.32 7 5.47 7M9 9H11V15H9M13 9H15V15H13",
          panorama_variant:
            "M20.7 4.1C18.7 4.8 15.9 5.5 12 5.5C8.1 5.5 5.1 4.7 3.3 4.1C2.7 3.8 2 4.3 2 5V19C2 19.7 2.7 20.2 3.3 20C5.4 19.3 8.1 18.5 12 18.5C15.9 18.5 18.7 19.3 20.7 20C21.4 20.2 22 19.7 22 19V5C22 4.3 21.3 3.8 20.7 4.1M12 15C9.7 15 7.5 15.1 5.5 15.4L9.2 11L11.2 13.4L14 10L18.5 15.4C16.5 15.1 14.3 15 12 15Z",
          sort_name_asc:
            "M9.25 5L12.5 1.75L15.75 5H9.25M8.89 14.3H6L5.28 17H2.91L6 7H9L12.13 17H9.67L8.89 14.3M6.33 12.68H8.56L7.93 10.56L7.67 9.59L7.42 8.63H7.39L7.17 9.6L6.93 10.58L6.33 12.68M13.05 17V15.74L17.8 8.97V8.91H13.5V7H20.73V8.34L16.09 15V15.08H20.8V17H13.05Z",
          sort_name_desc:
            "M15.75 19L12.5 22.25L9.25 19H15.75M8.89 14.3H6L5.28 17H2.91L6 7H9L12.13 17H9.67L8.89 14.3M6.33 12.68H8.56L7.93 10.56L7.67 9.59L7.42 8.63H7.39L7.17 9.6L6.93 10.58L6.33 12.68M13.05 17V15.74L17.8 8.97V8.91H13.5V7H20.73V8.34L16.09 15V15.08H20.8V17H13.05Z",
          sort_kind_asc: "M3 11H15V13H3M3 18V16H21V18M3 6H9V8H3Z",
          sort_kind_desc: "M3,13H15V11H3M3,6V8H21V6M3,18H9V16H3V18Z",
          sort_size_asc:
            "M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V7H1.5L5,3.5L8.5,7H6V17Z",
          sort_size_desc:
            "M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V7H1.5L5,3.5L8.5,7H6V17Z",
          sort_date_asc:
            "M7.78 7C9.08 7.04 10 7.53 10.57 8.46C11.13 9.4 11.41 10.56 11.39 11.95C11.4 13.5 11.09 14.73 10.5 15.62C9.88 16.5 8.95 16.97 7.71 17C6.45 16.96 5.54 16.5 4.96 15.56C4.38 14.63 4.09 13.45 4.09 12S4.39 9.36 5 8.44C5.59 7.5 6.5 7.04 7.78 7M7.75 8.63C7.31 8.63 6.96 8.9 6.7 9.46C6.44 10 6.32 10.87 6.32 12C6.31 13.15 6.44 14 6.69 14.54C6.95 15.1 7.31 15.37 7.77 15.37C8.69 15.37 9.16 14.24 9.17 12C9.17 9.77 8.7 8.65 7.75 8.63M13.33 17V15.22L13.76 15.24L14.3 15.22L15.34 15.03C15.68 14.92 16 14.78 16.26 14.58C16.59 14.35 16.86 14.08 17.07 13.76C17.29 13.45 17.44 13.12 17.53 12.78L17.5 12.77C17.05 13.19 16.38 13.4 15.47 13.41C14.62 13.4 13.91 13.15 13.34 12.65S12.5 11.43 12.46 10.5C12.47 9.5 12.81 8.69 13.47 8.03C14.14 7.37 15 7.03 16.12 7C17.37 7.04 18.29 7.45 18.88 8.24C19.47 9 19.76 10 19.76 11.19C19.75 12.15 19.61 13 19.32 13.76C19.03 14.5 18.64 15.13 18.12 15.64C17.66 16.06 17.11 16.38 16.47 16.61C15.83 16.83 15.12 16.96 14.34 17H13.33M16.06 8.63C15.65 8.64 15.32 8.8 15.06 9.11C14.81 9.42 14.68 9.84 14.68 10.36C14.68 10.8 14.8 11.16 15.03 11.46C15.27 11.77 15.63 11.92 16.11 11.93C16.43 11.93 16.7 11.86 16.92 11.74C17.14 11.61 17.3 11.46 17.41 11.28C17.5 11.17 17.53 10.97 17.53 10.71C17.54 10.16 17.43 9.69 17.2 9.28C16.97 8.87 16.59 8.65 16.06 8.63M9.25 5L12.5 1.75L15.75 5H9.25",
          sort_date_desc:
            "M7.78 7C9.08 7.04 10 7.53 10.57 8.46C11.13 9.4 11.41 10.56 11.39 11.95C11.4 13.5 11.09 14.73 10.5 15.62C9.88 16.5 8.95 16.97 7.71 17C6.45 16.96 5.54 16.5 4.96 15.56C4.38 14.63 4.09 13.45 4.09 12S4.39 9.36 5 8.44C5.59 7.5 6.5 7.04 7.78 7M7.75 8.63C7.31 8.63 6.96 8.9 6.7 9.46C6.44 10 6.32 10.87 6.32 12C6.31 13.15 6.44 14 6.69 14.54C6.95 15.1 7.31 15.37 7.77 15.37C8.69 15.37 9.16 14.24 9.17 12C9.17 9.77 8.7 8.65 7.75 8.63M13.33 17V15.22L13.76 15.24L14.3 15.22L15.34 15.03C15.68 14.92 16 14.78 16.26 14.58C16.59 14.35 16.86 14.08 17.07 13.76C17.29 13.45 17.44 13.12 17.53 12.78L17.5 12.77C17.05 13.19 16.38 13.4 15.47 13.41C14.62 13.4 13.91 13.15 13.34 12.65S12.5 11.43 12.46 10.5C12.47 9.5 12.81 8.69 13.47 8.03C14.14 7.37 15 7.03 16.12 7C17.37 7.04 18.29 7.45 18.88 8.24C19.47 9 19.76 10 19.76 11.19C19.75 12.15 19.61 13 19.32 13.76C19.03 14.5 18.64 15.13 18.12 15.64C17.66 16.06 17.11 16.38 16.47 16.61C15.83 16.83 15.12 16.96 14.34 17H13.33M16.06 8.63C15.65 8.64 15.32 8.8 15.06 9.11C14.81 9.42 14.68 9.84 14.68 10.36C14.68 10.8 14.8 11.16 15.03 11.46C15.27 11.77 15.63 11.92 16.11 11.93C16.43 11.93 16.7 11.86 16.92 11.74C17.14 11.61 17.3 11.46 17.41 11.28C17.5 11.17 17.53 10.97 17.53 10.71C17.54 10.16 17.43 9.69 17.2 9.28C16.97 8.87 16.59 8.65 16.06 8.63M15.75 19L12.5 22.25L9.25 19H15.75Z",
          filesize: "M3,13H15V11H3M3,6V8H21V6M3,18H9V16H3V18Z",
          layout_list:
            "M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z",
          layout_imagelist:
            "M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9",
          layout_blocks:
            "M2 14H8V20H2M16 8H10V10H16M2 10H8V4H2M10 4V6H22V4M10 20H16V18H10M10 16H22V14H10",
          layout_grid:
            "M3,9H7V5H3V9M3,14H7V10H3V14M8,14H12V10H8V14M13,14H17V10H13V14M8,9H12V5H8V9M13,5V9H17V5H13M18,14H22V10H18V14M3,19H7V15H3V19M8,19H12V15H8V19M13,19H17V15H13V19M18,19H22V15H18V19M18,5V9H22V5H18Z",
          layout_rows: "M3,19H9V12H3V19M10,19H22V12H10V19M3,5V11H22V5H3Z",
          layout_columns:
            "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z",
          lock_outline:
            "M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z",
          lock_open_outline:
            "M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17Z",
          open_in_new:
            "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z",
          play: "M8,5.14V19.14L19,12.14L8,5.14Z",
          pause: "M14,19H18V5H14M6,19H10V5H6V19Z",
          menu_down: "M7,13L12,18L17,13H7Z",
          menu_up: "M7,12L12,7L17,12H7Z",
          home: "M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6M17 13V17H15V14H13V17H11V13H9L14 9L19 13Z",
          image_search_outline:
            "M15.5,9C16.2,9 16.79,8.76 17.27,8.27C17.76,7.79 18,7.2 18,6.5C18,5.83 17.76,5.23 17.27,4.73C16.79,4.23 16.2,4 15.5,4C14.83,4 14.23,4.23 13.73,4.73C13.23,5.23 13,5.83 13,6.5C13,7.2 13.23,7.79 13.73,8.27C14.23,8.76 14.83,9 15.5,9M19.31,8.91L22.41,12L21,13.41L17.86,10.31C17.08,10.78 16.28,11 15.47,11C14.22,11 13.16,10.58 12.3,9.7C11.45,8.83 11,7.77 11,6.5C11,5.27 11.45,4.2 12.33,3.33C13.2,2.45 14.27,2 15.5,2C16.77,2 17.83,2.45 18.7,3.33C19.58,4.2 20,5.27 20,6.5C20,7.33 19.78,8.13 19.31,8.91M16.5,18H5.5L8.25,14.5L10.22,16.83L12.94,13.31L16.5,18M18,13L20,15V20C20,20.55 19.81,21 19.41,21.4C19,21.79 18.53,22 18,22H4C3.45,22 3,21.79 2.6,21.4C2.21,21 2,20.55 2,20V6C2,5.47 2.21,5 2.6,4.59C3,4.19 3.45,4 4,4H9.5C9.2,4.64 9.03,5.31 9,6H4V20H18V13Z",
          search:
            "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
          file_default:
            "M14,10H19.5L14,4.5V10M5,3H15L21,9V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3M5,5V19H19V12H12V5H5Z",
          application:
            "M19,4C20.11,4 21,4.9 21,6V18A2,2 0 0,1 19,20H5C3.89,20 3,19.1 3,18V6A2,2 0 0,1 5,4H19M19,18V8H5V18H19Z",
          archive:
            "M14,17H12V15H10V13H12V15H14M14,9H12V11H14V13H12V11H10V9H12V7H10V5H12V7H14M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
          audio:
            "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z",
          cd: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z",
          code: "M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z",
          excel:
            "M16.2,17H14.2L12,13.2L9.8,17H7.8L11,12L7.8,7H9.8L12,10.8L14.2,7H16.2L13,12M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
          font: "M17,8H20V20H21V21H17V20H18V17H14L12.5,20H14V21H10V20H11L17,8M18,9L14.5,16H18V9M5,3H10C11.11,3 12,3.89 12,5V16H9V11H6V16H3V5C3,3.89 3.89,3 5,3M6,5V9H9V5H6Z",
          image:
            "M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z",
          pdf: "M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19M10.59,10.08C10.57,10.13 10.3,11.84 8.5,14.77C8.5,14.77 5,16.58 5.83,17.94C6.5,19 8.15,17.9 9.56,15.27C9.56,15.27 11.38,14.63 13.79,14.45C13.79,14.45 17.65,16.19 18.17,14.34C18.69,12.5 15.12,12.9 14.5,13.09C14.5,13.09 12.46,11.75 12,9.89C12,9.89 13.13,5.95 11.38,6C9.63,6.05 10.29,9.12 10.59,10.08M11.4,11.13C11.43,11.13 11.87,12.33 13.29,13.58C13.29,13.58 10.96,14.04 9.9,14.5C9.9,14.5 10.9,12.75 11.4,11.13M15.32,13.84C15.9,13.69 17.64,14 17.58,14.32C17.5,14.65 15.32,13.84 15.32,13.84M8.26,15.7C7.73,16.91 6.83,17.68 6.6,17.67C6.37,17.66 7.3,16.07 8.26,15.7M11.4,8.76C11.39,8.71 11.03,6.57 11.4,6.61C11.94,6.67 11.4,8.71 11.4,8.76Z",
          powerpoint:
            "M9.8,13.4H12.3C13.8,13.4 14.46,13.12 15.1,12.58C15.74,12.03 16,11.25 16,10.23C16,9.26 15.75,8.5 15.1,7.88C14.45,7.29 13.83,7 12.3,7H8V17H9.8V13.4M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M9.8,12V8.4H12.1C12.76,8.4 13.27,8.65 13.6,9C13.93,9.35 14.1,9.72 14.1,10.24C14.1,10.8 13.92,11.19 13.6,11.5C13.28,11.81 12.9,12 12.22,12H9.8Z",
          text: "M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
          video:
            "M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z",
          word: "M15.5,17H14L12,9.5L10,17H8.5L6.1,7H7.8L9.34,14.5L11.3,7H12.7L14.67,14.5L16.2,7H17.9M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
          translate:
            "M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z",
          web: "M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
        },
        t = {
          application:
            '<path d="M35 14C36.11 14 37 14.9 37 16V28A2 2 0 0 1 35 30H21C19.89 30 19 29.1 19 28V16A2 2 0 0 1 21 14H35M35 28V18H21V28H35z"/>',
          archive:
            '<path d="M28.5,24v-2h2v-2h-2v-2h2v-2h-2v-2h2v-2h-2v-2h2V8h-2V6h-2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2 h-4v5c0,2.757,2.243,5,5,5s5-2.243,5-5v-5H28.5z M30.5,29c0,1.654-1.346,3-3,3s-3-1.346-3-3v-3h6V29z"/><path d="M26.5,30h2c0.552,0,1-0.447,1-1s-0.448-1-1-1h-2c-0.552,0-1,0.447-1,1S25.948,30,26.5,30z"/></g>',
          audio:
            '<path d="M35.67,14.986c-0.567-0.796-1.3-1.543-2.308-2.351c-3.914-3.131-4.757-6.277-4.862-6.738V5 c0-0.553-0.447-1-1-1s-1,0.447-1,1v1v8.359v9.053h-3.706c-3.882,0-6.294,1.961-6.294,5.117c0,3.466,2.24,5.706,5.706,5.706 c3.471,0,6.294-2.823,6.294-6.294V16.468l0.298,0.243c0.34,0.336,0.861,0.72,1.521,1.205c2.318,1.709,6.2,4.567,5.224,7.793 C35.514,25.807,35.5,25.904,35.5,26c0,0.43,0.278,0.826,0.71,0.957C36.307,26.986,36.404,27,36.5,27c0.43,0,0.826-0.278,0.957-0.71 C39.084,20.915,37.035,16.9,35.67,14.986z M26.5,27.941c0,2.368-1.926,4.294-4.294,4.294c-2.355,0-3.706-1.351-3.706-3.706 c0-2.576,2.335-3.117,4.294-3.117H26.5V27.941z M31.505,16.308c-0.571-0.422-1.065-0.785-1.371-1.081l-1.634-1.34v-3.473 c0.827,1.174,1.987,2.483,3.612,3.783c0.858,0.688,1.472,1.308,1.929,1.95c0.716,1.003,1.431,2.339,1.788,3.978 C34.502,18.515,32.745,17.221,31.505,16.308z"/>',
          cd: '<circle cx="27.5" cy="21" r="12"/><circle style="fill:#e9e9e0" cx="27.5" cy="21" r="3"/><path style="fill:#d3ccc9" d="M25.379,18.879c0.132-0.132,0.276-0.245,0.425-0.347l-2.361-8.813 c-1.615,0.579-3.134,1.503-4.427,2.796c-1.294,1.293-2.217,2.812-2.796,4.427l8.813,2.361 C25.134,19.155,25.247,19.011,25.379,18.879z"/><path style="fill:#d3ccc9" d="M30.071,23.486l2.273,8.483c1.32-0.582,2.56-1.402,3.641-2.484c1.253-1.253,2.16-2.717,2.743-4.275 l-8.188-2.194C30.255,22.939,29.994,23.2,30.071,23.486z"/>',
          code: '<path d="M15.5,24c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l6-6 c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-6,6C16.012,23.902,15.756,24,15.5,24z"/><path d="M21.5,30c-0.256,0-0.512-0.098-0.707-0.293l-6-6c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0l6,6c0.391,0.391,0.391,1.023,0,1.414C22.012,29.902,21.756,30,21.5,30z"/><path d="M33.5,30c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l6-6 c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-6,6C34.012,29.902,33.756,30,33.5,30z"/><path d="M39.5,24c-0.256,0-0.512-0.098-0.707-0.293l-6-6c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0l6,6c0.391,0.391,0.391,1.023,0,1.414C40.012,23.902,39.756,24,39.5,24z"/><path d="M24.5,32c-0.11,0-0.223-0.019-0.333-0.058c-0.521-0.184-0.794-0.755-0.61-1.276l6-17 c0.185-0.521,0.753-0.795,1.276-0.61c0.521,0.184,0.794,0.755,0.61,1.276l-6,17C25.298,31.744,24.912,32,24.5,32z"/>',
          open_in_new:
            '<path style="transform: translate(16px, 10px)" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />',
          font: '<path d="M33 18H36V30H37V31H33V30H34V27H30L28.5 30H30V31H26V30H27L33 18M34 19L30.5 26H34V19M21 13H26C27.11 13 28 13.89 28 15V26H25V21H22V26H19V15C19 13.89 19.89 13 21 13M22 15V19H25V15H22z"/>',
          excel:
            '<path style="fill:#c8bdb8" d="M23.5,16v-4h-12v4v2v2v2v2v2v2v2v4h10h2h21v-4v-2v-2v-2v-2v-2v-4H23.5z M13.5,14h8v2h-8V14z M13.5,18h8v2h-8V18z M13.5,22h8v2h-8V22z M13.5,26h8v2h-8V26z M21.5,32h-8v-2h8V32z M42.5,32h-19v-2h19V32z M42.5,28h-19v-2h19V28 z M42.5,24h-19v-2h19V24z M23.5,20v-2h19v2H23.5z"/>',
          image:
            '<circle style="fill:#f3d55b" cx="18.931" cy="14.431" r="4.569"/><polygon style="fill:#88c057" points="6.5,39 17.5,39 49.5,39 49.5,28 39.5,18.5 29,30 23.517,24.517"/>',
          pdf: '<path d="M19.514,33.324L19.514,33.324c-0.348,0-0.682-0.113-0.967-0.326 c-1.041-0.781-1.181-1.65-1.115-2.242c0.182-1.628,2.195-3.332,5.985-5.068c1.504-3.296,2.935-7.357,3.788-10.75 c-0.998-2.172-1.968-4.99-1.261-6.643c0.248-0.579,0.557-1.023,1.134-1.215c0.228-0.076,0.804-0.172,1.016-0.172 c0.504,0,0.947,0.649,1.261,1.049c0.295,0.376,0.964,1.173-0.373,6.802c1.348,2.784,3.258,5.62,5.088,7.562 c1.311-0.237,2.439-0.358,3.358-0.358c1.566,0,2.515,0.365,2.902,1.117c0.32,0.622,0.189,1.349-0.39,2.16 c-0.557,0.779-1.325,1.191-2.22,1.191c-1.216,0-2.632-0.768-4.211-2.285c-2.837,0.593-6.15,1.651-8.828,2.822 c-0.836,1.774-1.637,3.203-2.383,4.251C21.273,32.654,20.389,33.324,19.514,33.324z M22.176,28.198 c-2.137,1.201-3.008,2.188-3.071,2.744c-0.01,0.092-0.037,0.334,0.431,0.692C19.685,31.587,20.555,31.19,22.176,28.198z M35.813,23.756c0.815,0.627,1.014,0.944,1.547,0.944c0.234,0,0.901-0.01,1.21-0.441c0.149-0.209,0.207-0.343,0.23-0.415 c-0.123-0.065-0.286-0.197-1.175-0.197C37.12,23.648,36.485,23.67,35.813,23.756z M28.343,17.174 c-0.715,2.474-1.659,5.145-2.674,7.564c2.09-0.811,4.362-1.519,6.496-2.02C30.815,21.15,29.466,19.192,28.343,17.174z M27.736,8.712c-0.098,0.033-1.33,1.757,0.096,3.216C28.781,9.813,27.779,8.698,27.736,8.712z"/>',
          powerpoint:
            '<path style="fill:#c8bdb8" d="M39.5,30h-24V14h24V30z M17.5,28h20V16h-20V28z"/><path style="fill:#c8bdb8" d="M20.499,35c-0.175,0-0.353-0.046-0.514-0.143c-0.474-0.284-0.627-0.898-0.343-1.372l3-5 c0.284-0.474,0.898-0.627,1.372-0.343c0.474,0.284,0.627,0.898,0.343,1.372l-3,5C21.17,34.827,20.839,35,20.499,35z"/><path style="fill:#c8bdb8" d="M34.501,35c-0.34,0-0.671-0.173-0.858-0.485l-3-5c-0.284-0.474-0.131-1.088,0.343-1.372 c0.474-0.283,1.088-0.131,1.372,0.343l3,5c0.284,0.474,0.131,1.088-0.343,1.372C34.854,34.954,34.676,35,34.501,35z"/><path style="fill:#c8bdb8" d="M27.5,16c-0.552,0-1-0.447-1-1v-3c0-0.553,0.448-1,1-1s1,0.447,1,1v3C28.5,15.553,28.052,16,27.5,16 z"/><rect x="17.5" y="16" style="fill:#d3ccc9" width="20" height="12"/>',
          text: '<path d="M12.5,13h6c0.553,0,1-0.448,1-1s-0.447-1-1-1h-6c-0.553,0-1,0.448-1,1S11.947,13,12.5,13z"/><path d="M12.5,18h9c0.553,0,1-0.448,1-1s-0.447-1-1-1h-9c-0.553,0-1,0.448-1,1S11.947,18,12.5,18z"/><path d="M25.5,18c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.26-0.11-0.52-0.29-0.71 c-0.38-0.37-1.04-0.37-1.42,0c-0.181,0.19-0.29,0.44-0.29,0.71s0.109,0.52,0.29,0.71C24.979,17.89,25.24,18,25.5,18z"/><path d="M29.5,18h8c0.553,0,1-0.448,1-1s-0.447-1-1-1h-8c-0.553,0-1,0.448-1,1S28.947,18,29.5,18z"/><path d="M11.79,31.29c-0.181,0.19-0.29,0.44-0.29,0.71s0.109,0.52,0.29,0.71 C11.979,32.89,12.229,33,12.5,33c0.27,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.26-0.11-0.52-0.29-0.71 C12.84,30.92,12.16,30.92,11.79,31.29z"/><path d="M24.5,31h-8c-0.553,0-1,0.448-1,1s0.447,1,1,1h8c0.553,0,1-0.448,1-1S25.053,31,24.5,31z"/><path d="M41.5,18h2c0.553,0,1-0.448,1-1s-0.447-1-1-1h-2c-0.553,0-1,0.448-1,1S40.947,18,41.5,18z"/><path d="M12.5,23h22c0.553,0,1-0.448,1-1s-0.447-1-1-1h-22c-0.553,0-1,0.448-1,1S11.947,23,12.5,23z"/><path d="M43.5,21h-6c-0.553,0-1,0.448-1,1s0.447,1,1,1h6c0.553,0,1-0.448,1-1S44.053,21,43.5,21z"/><path d="M12.5,28h4c0.553,0,1-0.448,1-1s-0.447-1-1-1h-4c-0.553,0-1,0.448-1,1S11.947,28,12.5,28z"/><path d="M30.5,26h-10c-0.553,0-1,0.448-1,1s0.447,1,1,1h10c0.553,0,1-0.448,1-1S31.053,26,30.5,26z"/><path d="M43.5,26h-9c-0.553,0-1,0.448-1,1s0.447,1,1,1h9c0.553,0,1-0.448,1-1S44.053,26,43.5,26z"/>',
          video:
            '<path d="M24.5,28c-0.166,0-0.331-0.041-0.481-0.123C23.699,27.701,23.5,27.365,23.5,27V13 c0-0.365,0.199-0.701,0.519-0.877c0.321-0.175,0.71-0.162,1.019,0.033l11,7C36.325,19.34,36.5,19.658,36.5,20 s-0.175,0.66-0.463,0.844l-11,7C24.874,27.947,24.687,28,24.5,28z M25.5,14.821v10.357L33.637,20L25.5,14.821z"/><path d="M28.5,35c-8.271,0-15-6.729-15-15s6.729-15,15-15s15,6.729,15,15S36.771,35,28.5,35z M28.5,7 c-7.168,0-13,5.832-13,13s5.832,13,13,13s13-5.832,13-13S35.668,7,28.5,7z"/>',
        };
      function i(e, t, i) {
        return (
          '<svg viewBox="0 0 48 48" class="svg-folder ' +
          e +
          '"><path class="svg-folder-bg" d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"/><path class="svg-folder-fg" d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"/>' +
          (t
            ? '<path class="svg-folder-symlink" d="M 39.231 23.883 L 28.485 32.862 L 28.485 14.902 Z"/><path class="svg-folder-symlink" d="M 10.065 30.022 L 10.065 40 L 16.205 40 L 16.205 30.022 C 16.205 28.334 17.587 26.953 19.275 26.953 L 32.323 26.953 L 32.323 20.812 L 19.275 20.812 C 14.21 20.812 10.065 24.956 10.065 30.022 Z"/>'
            : "") +
          (i
            ? ""
            : '<path class="svg-folder-forbidden" d="M 34.441 26.211 C 34.441 31.711 29.941 36.211 24.441 36.211 C 18.941 36.211 14.441 31.711 14.441 26.211 C 14.441 20.711 18.941 16.211 24.441 16.211 C 29.941 16.211 34.441 20.711 34.441 26.211"/><path style="fill:#FFF;" d="M 22.941 19.211 L 25.941 19.211 L 25.941 28.211 L 22.941 28.211 Z M 22.941 19.211"/><path style="fill:#FFF;" d="M 22.941 30.211 L 25.941 30.211 L 25.941 33.211 L 22.941 33.211 Z M 22.941 30.211"/>') +
          "</svg>"
        );
      }
      t.word = t.text;
      var a = {
          application: ["app", "exe"],
          archive: [
            "gz",
            "zip",
            "7z",
            "7zip",
            "arj",
            "rar",
            "gzip",
            "bz2",
            "bzip2",
            "tar",
            "x-gzip",
          ],
          cd: [
            "dmg",
            "iso",
            "bin",
            "cd",
            "cdr",
            "cue",
            "disc",
            "disk",
            "dsk",
            "dvd",
            "dvdr",
            "hdd",
            "hdi",
            "hds",
            "hfs",
            "hfv",
            "ima",
            "image",
            "imd",
            "img",
            "mdf",
            "mdx",
            "nrg",
            "omg",
            "toast",
            "cso",
            "mds",
          ],
          code: [
            "php",
            "x-php",
            "js",
            "css",
            "xml",
            "json",
            "html",
            "htm",
            "py",
            "jsx",
            "scss",
            "clj",
            "less",
            "rb",
            "sql",
            "ts",
            "yml",
          ],
          excel: [
            "xls",
            "xlt",
            "xlm",
            "xlsx",
            "xlsm",
            "xltx",
            "xltm",
            "xlsb",
            "xla",
            "xlam",
            "xll",
            "xlw",
            "csv",
          ],
          font: ["ttf", "otf", "woff", "woff2", "eot", "ttc"],
          open_in_new: ["url"],
          image: [
            "wbmp",
            "tiff",
            "webp",
            "psd",
            "ai",
            "eps",
            "jpg",
            "jpeg",
            "webp",
            "png",
            "gif",
            "bmp",
          ],
          pdf: ["pdf"],
          powerpoint: [
            "ppt",
            "pot",
            "pps",
            "pptx",
            "pptm",
            "potx",
            "potm",
            "ppam",
            "ppsx",
            "ppsm",
            "sldx",
            "sldm",
          ],
          text: ["epub", "rtf"],
          word: [
            "doc",
            "dot",
            "docx",
            "docm",
            "dotx",
            "dotm",
            "docb",
            "odt",
            "wbk",
          ],
        },
        n = {};
      function o(e) {
        return e.hasOwnProperty("icon")
          ? e.icon
          : (e.icon = (function () {
              if (
                e.mime0 &&
                ["archive", "audio", "image", "video"].includes(e.mime0)
              )
                return e.mime0;
              var t = !!e.mime1 && n[e.mime1];
              if (t) return t;
              var i = !!e.ext && n[e.ext];
              return i || ("text" === e.mime0 && "text");
            })());
      }
      M(Object.keys(a), function (e) {
        M(a[e], function (t) {
          n[t] = e;
        });
      }),
        (F.get_svg_icon = function (t) {
          return (
            '<svg viewBox="0 0 24 24" class="svg-icon svg-' +
            t +
            '"><path class="svg-path-' +
            t +
            '" d="' +
            e[t] +
            '" /></svg>'
          );
        }),
        (F.get_svg_icon_class = function (t, i) {
          return (
            '<svg viewBox="0 0 24 24" class="' +
            i +
            '"><path class="svg-path-' +
            t +
            '" d="' +
            e[t] +
            '" /></svg>'
          );
        }),
        (F.get_svg_icon_multi = function () {
          for (var t = arguments, i = t.length, a = "", n = 0; n < i; n++)
            a += '<path class="svg-path-' + t[n] + '" d="' + e[t[n]] + '" />';
          return (
            '<svg viewBox="0 0 24 24" class="svg-icon svg-' +
            t[0] +
            '">' +
            a +
            "</svg>"
          );
        }),
        (F.get_svg_icon_multi_class = function (t) {
          for (var i = arguments, a = i.length, n = "", o = 1; o < a; o++)
            n += '<path class="svg-path-' + i[o] + '" d="' + e[i[o]] + '" />';
          return '<svg viewBox="0 0 24 24" class="' + t + '">' + n + "</svg>";
        }),
        (F.get_svg_icon_files = function (e) {
          return e.is_dir
            ? i("svg-icon", e.is_link, e.is_readable)
            : F.get_svg_icon(
                e.is_pano ? "panorama_variant" : o(e) || "file_default"
              );
        }),
        (F.get_svg_large = function (e, a) {
          if (e.is_dir) return i(a, e.is_link, e.is_readable);
          var n = o(e),
            l = e.ext && e.ext.length < 6 ? e.ext : "image" === n && e.mime1;
          return (
            '<svg viewBox="0 0 56 56" class="svg-file svg-' +
            (n || "none") +
            (a ? " " + a : "") +
            '"><path class="svg-file-bg" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074 c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"/><polygon  class="svg-file-flip" points="37.5,0.151 37.5,12 49.349,12"/>' +
            (n ? '<g class="svg-file-icon">' + t[n] + "</g>" : "") +
            (l
              ? '<path class="svg-file-text-bg" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"/><text class="svg-file-ext' +
                (l.length > 3 ? " f_" + (15 - l.length) : "") +
                '" x="28" y="51.5">' +
                l +
                "</text>"
              : "") +
            (e.is_readable
              ? ""
              : '<path class="svg-file-forbidden" d="M 40.691 24.958 C 40.691 31.936 34.982 37.645 28.003 37.645 C 21.026 37.645 15.317 31.936 15.317 24.958 C 15.317 17.98 21.026 12.271 28.003 12.271 C 34.982 12.271 40.691 17.98 40.691 24.958"/><path style="fill: #FFF;" d="M 26.101 16.077 L 29.907 16.077 L 29.907 27.495 L 26.101 27.495 Z M 26.101 16.077"/><path style="fill: #FFF;" d="M 26.101 30.033 L 29.907 30.033 L 29.907 33.839 L 26.101 33.839 Z M 26.101 30.033"/>') +
            "</svg>"
          );
        });
    })(),
    (function () {
      (W.topbar_breadcrumbs = _id("topbar-breadcrumbs")),
        (W.breadcrumbs_info = W.topbar_breadcrumbs.firstElementChild);
      var e = (function () {
        W.topbar_breadcrumbs.insertAdjacentHTML(
          "afterbegin",
          '<button id="folder-actions" class="context-button" style="display:none">' +
            F.get_svg_icon("folder_cog_outline") +
            "</button>"
        );
        var e = W.topbar_breadcrumbs.firstElementChild;
        return (
          w(e, (t) => F.create_contextmenu(t, "topbar", e, _c.current_dir)), e
        );
      })();
      function t(e, t) {
        return (
          '<span class="crumb"><a href="' +
          c(e) +
          '" data-path="' +
          i(e) +
          '" class="crumb-link">' +
          t +
          "</a></span>"
        );
      }
      (F.breadcrumbs_info = function () {
        var t = _c.current_dir,
          i = _c.files_count,
          a =
            i && t.images_count === i
              ? "images"
              : i && !t.files_count
              ? "folders"
              : "files";
        (W.breadcrumbs_info.innerHTML =
          i +
          ' <span data-lang="' +
          a +
          '" class="breadcrumbs-info-type">' +
          K.get(a) +
          "</span>" +
          (t.dirsize
            ? '<span class="breadcrumbs-info-size">' +
              filesize(t.dirsize) +
              "</span>"
            : "")),
          A(W.breadcrumbs_info),
          A(e);
      }),
        (W.breadcrumbs = _id("breadcrumbs"));
      var n = [],
        o = [];
      function l(e, t) {
        var i = {
          targets: e,
          translateX: t ? [0, -2] : [-2, 0],
          opacity: t ? [1, 0] : [0, 1],
          easing: "easeOutQuad",
          duration: 150,
          delay: anime.stagger(Math.round(100 / e.length)),
        };
        t &&
          (i.complete = function () {
            d(e, W.breadcrumbs), s();
          }),
          anime(i);
      }
      function s() {
        var e = "",
          i = [],
          s = "";
        n.length &&
          M(n, function (n, l) {
            (e += e ? "/" + n : n),
              (i.length || n !== o[l]) && ((s += t(e, a(n))), i.push(l + 1));
          }),
          i.length &&
            (W.breadcrumbs.insertAdjacentHTML("beforeend", s),
            l(
              (function (e, t) {
                for (var i = [], a = e.length, n = 0; n < a; n++) {
                  var o = t(e[n], n);
                  o && i.push(o);
                }
                return i;
              })(i, function (e) {
                return W.breadcrumbs.children[e];
              })
            )),
          (o = n.slice(0)),
          W.breadcrumbs.lastChild != W.breadcrumbs.firstChild &&
            W.breadcrumbs.lastChild.classList.add("crumb-active");
      }
      (W.breadcrumbs.innerHTML = t("", F.get_svg_icon("home"))),
        (F.set_breadcrumbs = function (t) {
          if (
            (A(e, !0),
            A(W.breadcrumbs_info, !0),
            (n = t.split("/").filter(Boolean)),
            o.length)
          ) {
            var i = [];
            M(o, function (e, t) {
              (i.length || e !== n[t]) &&
                i.unshift(W.breadcrumbs.children[t + 1]);
            }),
              i.length
                ? l(i, !0)
                : (W.breadcrumbs.lastChild.classList.remove("crumb-active"),
                  s());
          } else s();
        }),
        w(W.breadcrumbs, function (e) {
          "A" !== e.target.nodeName ||
            y(e, e.target) ||
            F.get_files(e.target.dataset.path, "push");
        });
    })();
  var $ = Swal.mixin({
    toast: !0,
    showConfirmButton: !1,
    position: "bottom-right",
    padding: ".5em .25em",
    timer: 9999999,
    width: "auto",
    customClass: { popup: "download-toast", title: "download-toast-title" },
  });
  _c.prevent_right_click &&
    (w(
      document,
      function (e) {
        ("IMG" === e.target.nodeName ||
          "VIDEO" === e.target.nodeName ||
          e.target.closest(".menu-li") ||
          e.target.closest(".files-a")) &&
          e.preventDefault();
      },
      "contextmenu"
    ),
    document.documentElement.style.setProperty("--touch-callout", "none")),
    (function () {
      var e = _c.config.contextmenu || {},
        t = (U.contextmenu = {}),
        n = (W.contextmenu = _id("contextmenu"));
      function c(e, t, i, a, n, o, l) {
        var s = o ? "a" : "button";
        return a
          ? "<" +
              s +
              (o
                ? ' href="' +
                  ("function" == typeof o ? o(l) : o) +
                  '" target="_blank"'
                : "") +
              ' class="dropdown-item' +
              (n ? " " + n : "") +
              '" data-action="' +
              i +
              '">' +
              (t ? F.get_svg_icon(t) : "") +
              K.span(e, !0) +
              "</" +
              s +
              ">"
          : "";
      }
      function p() {
        return ["swal2-timer-progress-bar", "swal-percent"].map(
          (e) => Swal.getContainer().getElementsByClassName(e)[0]
        );
      }
      function d(e, t, i) {
        (e.style.transform = "scaleX(" + i + ")"),
          (t.textContent = Math.round(100 * i) + "%");
      }
      function u(e) {
        return (
          f.use_filter && _c.current_dir === e
            ? U.list.matchingItems.map((e) => e._values)
            : ((t = e.files || (_c.dirs[e.path] || {}).files || {}),
              Object.values
                ? Object.values(t)
                : Object.keys(t).map((e) => t[e]))
        ).filter((e) => !e.is_dir && e.is_readable);
        var t;
      }
      var f = Object.assign(
        { javascript: !0, current_dir_only: !0, use_filter: !0 },
        _c.config && _c.config.download_dir ? _c.config.download_dir : {}
      );
      function v() {
        t.is_open && g();
      }
      function g(e) {
        if (e != t.is_open) {
          var i = (e ? "add" : "remove") + "EventListener";
          document.documentElement[i]("click", v),
            document[i]("contextmenu", v),
            document[i]("visibilitychange", v),
            window[i]("blur", v),
            window[i]("scroll", v),
            U.popup && U.popup.topbar && U.popup.topbar[i]("click", v),
            W.sidebar_menu && W.sidebar_menu[i]("scroll", v);
        }
        t.el.classList.toggle("cm-active", e),
          t.a && t.a.classList.toggle("cm-active", e),
          e != t.is_open &&
            (anime.remove(n),
            anime({
              targets: n,
              opacity: e ? [0, 1] : 0,
              easing: "easeOutQuart",
              duration: 150,
              complete: e
                ? null
                : function () {
                    n.style.cssText = null;
                  },
            })),
          (t.is_open = !!e);
      }
      (F.create_contextmenu = function (p, d, m, u, v) {
        if ((_c.context_menu || "topbar" === d) && m && u) {
          if (t.is_open) {
            if (m == t.el) return p.preventDefault();
            t.el && t.el.classList.remove("cm-active"),
              t.a && t.a.classList.remove("cm-active");
          }
          p.stopPropagation(),
            (m === t.el && u === t.item && "sidebar" !== d) ||
              (n.innerHTML =
                '<h6 class="dropdown-header" title="' +
                i(u.display_name || u.basename) +
                '">' +
                ("files" === d ? F.get_svg_icon_files(u) : "") +
                a(u.display_name || u.basename) +
                "</h6>" +
                c(
                  "zoom",
                  null,
                  "popup",
                  "popup" !== d && u.browser_image && u.is_readable
                ) +
                c(
                  "open",
                  null,
                  "folder",
                  "sidebar" !== d && u.is_dir && u !== _c.current_dir
                ) +
                c("show info", null, "modal", !["modal", "popup"].includes(d)) +
                (function (e, t) {
                  var i = !!e && r(e);
                  return i && "#" !== i
                    ? '<a class="' +
                        t +
                        '" href="' +
                        i +
                        '" target="_blank" data-lang="open in new tab">' +
                        K.get("open in new tab") +
                        "</a>"
                    : "";
                })(u, "dropdown-item") +
                c("copy link", null, "clipboard", B.url && B.clipboard) +
                (function (e, t) {
                  return B.download && !e.is_dir && e.is_readable
                    ? '<a href="' +
                        s(e, !0) +
                        '" class="' +
                        t +
                        '" data-lang="download" download>' +
                        K.get("download") +
                        "</a>"
                    : "";
                })(u, "dropdown-item") +
                l.a(u.gps, "dropdown-item", !0) +
                (function (e) {
                  if (
                    !(
                      B.download &&
                      ["browser", "zip", "files"].includes(_c.download_dir) &&
                      e.is_dir &&
                      e.is_readable
                    )
                  )
                    return "";
                  var t = e.hasOwnProperty("files_count") ? e : _c.dirs[e.path];
                  return !t ||
                    (f.current_dir_only && t !== _c.current_dir) ||
                    (["browser", "files"].includes(_c.download_dir) &&
                      !t.files_count) ||
                    ("files" === _c.download_dir && !B.is_pointer) ||
                    (t.hasOwnProperty("files_count") && !t.files_count)
                    ? ""
                    : "zip" !== _c.download_dir || f.javascript
                    ? '<button class="dropdown-item fm-action" data-action="download_dir">' +
                      F.get_svg_icon("tray_arrow_down") +
                      K.span("download", !0) +
                      '&nbsp;<span class="no-pointer">' +
                      ("files" === _c.download_dir ? K.get("files") : "zip") +
                      "</span></button>"
                    : '<a href="' +
                      o(t) +
                      '" class="dropdown-item fm-action" data-action="download_dir" download="' +
                      (J ? i(e.basename) + ".zip" : "") +
                      '">' +
                      F.get_svg_icon("tray_arrow_down") +
                      K.span("download", !0) +
                      '&nbsp;<span class="no-pointer">Zip</span></a>';
                })(u) +
                (function () {
                  if ("popup" === d || !u.is_writeable) return "";
                  var e =
                    c(
                      "delete",
                      "close_thick",
                      "delete",
                      _c.allow_delete && u.path,
                      "fm-action"
                    ) +
                    c(
                      "new folder",
                      "plus",
                      "new_folder",
                      _c.allow_new_folder && u.is_dir,
                      "fm-action"
                    ) +
                    c(
                      "new file",
                      "plus",
                      "new_file",
                      _c.allow_new_file && u.is_dir,
                      "fm-action"
                    ) +
                    c(
                      "rename",
                      "pencil_outline",
                      "rename",
                      _c.allow_rename && u.path,
                      "fm-action"
                    ) +
                    c(
                      "duplicate",
                      "plus_circle_multiple_outline",
                      "duplicate",
                      _c.allow_duplicate && !u.is_dir,
                      "fm-action"
                    ) +
                    c(
                      "upload",
                      "tray_arrow_up",
                      "upload",
                      U.uppy && u.is_dir,
                      "fm-action"
                    );
                  return e ? '<div class="context-fm">' + e + "</div>" : "";
                })() +
                V(Object.keys(e), (t) => {
                  var i = e[t];
                  return c(
                    i.text || t,
                    i.icon,
                    t,
                    !i.condition || i.condition(u),
                    i.class || "fm-action",
                    i.href,
                    u
                  );
                })),
            (n.style.display = "block");
          var _ = m.getBoundingClientRect(),
            h = (m.clientHeight > 50 ? p.clientY : _.top) - n.clientHeight - 10,
            x = m.clientHeight > 50 ? p.clientY + 20 : _.bottom + 10,
            b = h >= 0,
            y =
              !b && x + n.clientHeight <= document.documentElement.clientHeight;
          n.style.top = Math.round(y ? x : Math.max(0, h)) + "px";
          var w =
              (m.clientWidth > 100 ? p.clientX : _.left + m.offsetWidth / 2) -
              n.clientWidth / 2,
            C = Math.max(
              10,
              Math.min(
                document.documentElement.clientWidth - n.clientWidth - 10,
                w
              )
            );
          (n.style.left = Math.round(C) + "px"),
            n.style.setProperty(
              "--offset",
              Math.round(
                Math.max(
                  10,
                  Math.min(n.clientWidth - 10, n.clientWidth / 2 - C + w)
                )
              ) + "px"
            ),
            n.classList.toggle("cm-top", b),
            n.classList.toggle("cm-bottom", y),
            n.classList.toggle("cm-border", "sidebar" === d),
            (t.el = m),
            (t.item = u),
            (t.a = v || !1),
            g(!0),
            p.preventDefault();
        }
      }),
        m(n, function (i, a) {
          if (e[i]) !e[i].href && e[i].action && e[i].action(t.item);
          else if (le[i]) le[i](t.item);
          else if ("upload" === i)
            Z(),
              U.uppy.setMeta({ path: t.item.path }),
              U.uppy.getPlugin("Dashboard").openModal();
          else if ("popup" === i)
            _c.history && U.modal.open && U.modal.popstate.remove(),
              F.open_popup(t.item);
          else if ("folder" === i)
            U.modal.open && F.close_modal(), F.get_files(t.item.path, "push");
          else if ("modal" === i) F.open_modal(t.item, !0);
          else if ("clipboard" === i)
            (v = r(t.item)), (g = new URL(v, location)) && b(g.href);
          else if ("download_dir" === i) {
            if (J && "zip" === _c.download_dir && !f.javascript) return;
            if ((a.preventDefault(), !J)) return ne.fire();
            if ("browser" === _c.download_dir) {
              if (!(m = u(t.item)).length)
                return ae.fire({ title: "No files to download!" });
              var n = 0;
              m.forEach((e) => (n += e.filesize));
              var l =
                  t.item.basename ||
                  t.item.path.split("/").pop() ||
                  K.get("download"),
                c = $.fire({
                  title:
                    F.get_svg_icon_class(
                      "tray_arrow_down",
                      "svg-icon download-toast-icon"
                    ) +
                    l +
                    '.zip<span class="swal-percent">...</span>',
                  didOpen: () => {
                    var e,
                      t = new JSZip(),
                      i = [],
                      a = 0,
                      o = 0,
                      [r, u] = p();
                    m.forEach((p, f) => {
                      var v = new XMLHttpRequest();
                      (v.responseType = "arraybuffer"),
                        (v.onreadystatechange = (n) => {
                          if (
                            v.readyState === XMLHttpRequest.DONE &&
                            (v.status >= 200 &&
                              v.status < 400 &&
                              v.response &&
                              t.file(p.basename, v.response, { binary: !0 }) &&
                              o++,
                            e === p && (e = !1),
                            (i[f] = p.filesize),
                            !(++a < m.length))
                          )
                            return o
                              ? void t.generateAsync({ type: "blob" }).then(
                                  (e) => {
                                    c.close(), saveAs(e, l + ".zip");
                                  },
                                  (e) => ae.fire({ title: e })
                                )
                              : ae.fire({ title: "Failed to download files!" });
                        }),
                        (v.onprogress = (t) => {
                          if (((i[f] = t.loaded || 0), e || (e = p), e === p)) {
                            var a = 0;
                            i.forEach((e) => (a += e)), d(r, u, a / n);
                          }
                        }),
                        v.open("GET", s(p, !0), !0),
                        v.send();
                    });
                  },
                });
            } else if ("zip" === _c.download_dir)
              (l =
                t.item.basename ||
                t.item.path.split("/").pop() ||
                K.get("download")),
                (c = $.fire({
                  title:
                    F.get_svg_icon_class(
                      "tray_arrow_down",
                      "svg-icon download-toast-icon"
                    ) +
                    l +
                    '.zip<span class="swal-percent"><span class="download-toast-spinner"></span></span>',
                  didOpen: () => {
                    var [e, i] = p();
                    new jsFileDownloader({
                      url: o(t.item),
                      timeout: 6e5,
                      process: (t) => {
                        t.lengthComputable && d(e, i, t.loaded / t.total);
                      },
                      filename: l + ".zip",
                      forceDesktopMode: !0,
                      nativeFallbackOnError: !0,
                      contentTypeDetermination: "header",
                    })
                      .then(() => {
                        c.close();
                      })
                      .catch((e) => {
                        j("Download error", e),
                          ae.fire({ title: "No files to zip" });
                      });
                  },
                }));
            else if ("files" === _c.download_dir) {
              var m;
              if (!(m = u(t.item)).length)
                return ae.fire({ title: "No files to download!" });
              !(function e(t) {
                new jsFileDownloader({ url: s(m[t], !0) }).then(() => {
                  t < m.length - 1 && e(t + 1);
                });
              })(0);
            }
          }
          var v, g;
        });
    })(),
    (U.dropdown = {}),
    (function () {
      var e,
        t = B.pointer_events
          ? "pointerdown"
          : B.only_touch
          ? "touchstart"
          : "mousedown",
        i = B.pointer_events ? "pointerup" : "click";
      function a(i) {
        i.classList.contains("touch-open")
          ? e && e.remove()
          : (e = L(document, t, function (t) {
              t.target.closest(".dropdown") !== i &&
                (e.remove(),
                i.classList.remove("touch-open"),
                (W.files.style.pointerEvents = "none"),
                setTimeout(function () {
                  W.files.style.pointerEvents = null;
                }, 500));
            })),
          i.classList.toggle("touch-open");
      }
      B.is_touch && document.addEventListener("touchstart", function () {}, !0),
        (F.dropdown = function (e, t, n) {
          B.only_pointer
            ? n && w(t, n)
            : B.only_touch || !B.pointer_events
            ? w(
                t,
                function () {
                  a(e);
                },
                i
              )
            : w(
                t,
                function (t) {
                  "mouse" === t.pointerType ? n && n() : a(e);
                },
                "pointerup"
              ),
            B.is_dual_input
              ? B.pointer_events &&
                w(
                  t,
                  function (t) {
                    e.classList.toggle(
                      "mouse-hover",
                      "mouse" === t.pointerType
                    );
                  },
                  "pointerover"
                )
              : B.is_pointer && e.classList.add("mouse-hover");
        });
    })();
  var ee = Swal.mixin({
      input: "text",
      inputAttributes: {
        maxlength: 127,
        autocapitalize: "off",
        autocorrect: "off",
        autocomplete: "off",
        spellcheck: "false",
      },
      inputValidator: (e) => {
        var t = e.match(/[<>:"'/\\|?*#]|\.\.|\.$/g);
        if (t) return "Invalid characters " + t.join(" ");
      },
      scrollbarPadding: !1,
      closeButtonHtml: F.get_svg_icon("close"),
      showCloseButton: !0,
    }),
    te = Swal.mixin({
      toast: !0,
      showConfirmButton: !1,
      timerProgressBar: !0,
      didOpen: (e) => {
        e.addEventListener("mouseenter", Swal.stopTimer),
          e.addEventListener("mouseleave", Swal.resumeTimer),
          e.addEventListener("click", Swal.close);
      },
    }),
    ie = te.mixin({
      icon: "success",
      title: "Success",
      position: "bottom-right",
      timer: 2e3,
      customClass: { popup: "success-toast" },
    }),
    ae = te.mixin({
      icon: "error",
      title: "Error",
      timer: 3e3,
      customClass: { popup: "error-toast" },
    }),
    ne = ae.mixin({ title: S("TGljZW5zZSByZXF1aXJlZA==") }),
    oe = Swal.mixin({
      title: "Confirm?",
      showCloseButton: !0,
      showCancelButton: !0,
      scrollbarPadding: !1,
    }),
    le = (function () {
      function e(e, t, i, a) {
        if (!le[e]) return ae.fire({ title: e + " is not available" });
        if (!_c["allow_" + e]) return ae.fire({ title: e + " is not allowed" });
        if (_c.demo_mode) return ae.fire({ title: "Not allowed in demo mode" });
        if (!J) return ne.fire();
        if (
          !t.is_writeable &&
          ["delete", "rename", "new_folder", "new_file"].includes(e)
        )
          return ae.fire({ title: t.path + " is not writeable" });
        var l = !!_c.files[t.basename] && U.list.get("path", t.path)[0],
          s = !!l && n(l.elm),
          r =
            !(!t.is_dir || !W.sidebar_menu) &&
            ("" === t.path
              ? W.sidebar_menu
              : n(_query('[data-path="' + o(t.path) + '"]', W.sidebar_menu))),
          c = s
            ? _c.current_dir
            : _c.dirs[t.path.substring(0, t.path.lastIndexOf("/"))];
        T({
          params:
            "action=fm&task=" +
            e +
            (t.is_dir ? "&is_dir=1" : "") +
            "&path=" +
            encodeURIComponent(t.path) +
            (i || ""),
          json_response: !0,
          fail: function () {
            return ae.fire();
          },
          always: function () {
            s && s.classList.remove("fm-processing"),
              r && r.classList.remove("fm-processing"),
              W.files.parentElement.classList.remove("fm-processing");
          },
          complete: function (i, n, o) {
            return (
              j("fm:task:" + e, i, t),
              o && i && n
                ? i.error
                  ? ae.fire({ title: i.error })
                  : i.success
                  ? (U.contextmenu.item === t && delete U.contextmenu.el,
                    void (a && a(l, s, r, c, i)))
                  : ae.fire()
                : ae.fire()
            );
          },
        });
      }
      function n(e) {
        return (
          !!e &&
          (e.style.removeProperty("opacity"),
          e.classList.add("fm-processing"),
          e)
        );
      }
      function o(e) {
        return CSS.escape ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
      }
      function l(e, t) {
        return (
          "string" == typeof e &&
          ("" === e ? t : e + (e.endsWith("/") ? "" : "/") + t)
        );
      }
      function r(e) {
        if (!e) return "";
        var t = e.split("/"),
          i = t.pop("/");
        return (
          '<span class="swal-files-path">' +
          (t.length ? t.join("/") + "/" : "") +
          '<span class="swal-files-name' +
          (t.length ? " swal-files-has-path" : "") +
          '">' +
          i +
          "</span></span>"
        );
      }
      return {
        duplicate: function (t) {
          if (t.is_dir) return ae.fire({ title: "Can't duplicate folders" });
          ee.fire({
            title: K.get("Duplicate", !0),
            html: r(t.path),
            inputPlaceholder: K.get("Duplicate name", !0),
            inputValue: t.basename,
            inputValidator: (e) => {
              var t = e.match(/[<>:"'/\\|?*#]|\.\.|\.$/g);
              return t
                ? "Invalid characters " + t.join(" ")
                : _c.files[e]
                ? "File already exists"
                : void 0;
            },
          }).then((i) => {
            i.isConfirmed &&
              i.value &&
              i.value !== t.basename &&
              e(
                "duplicate",
                t,
                "&name=" + encodeURI(i.value),
                function (e, t, i, a) {
                  a &&
                    (delete a.files,
                    delete a.html,
                    delete a.json_cache,
                    I.remove(ce(a.path, a.mtime)),
                    a === _c.current_dir &&
                      F.get_files(_c.current_path, "replace", !0));
                }
              );
          });
        },
        rename: function (t) {
          ee.fire({
            title: K.get("rename", !0),
            html: r(t.path),
            inputPlaceholder: K.get("new name", !0),
            inputValue: t.basename,
            inputValidator: (e) => {
              if (e === t.basename) return !1;
              var i = e.match(/[<>:"'/\\|?*#]|\.\.|\.$/g);
              if (i) return "Invalid characters " + i.join(" ");
              if (
                _c.files[t.basename] &&
                _c.files[t.basename].path === t.path
              ) {
                if (_c.files[e])
                  return (t.is_dir ? "Folder" : "File") + " already exists";
              } else if (t.is_dir) {
                var a = t.path.split("/").slice(0, -1).join("/");
                if (_c.dirs[l(a, e)]) return "Folder already existsA";
              }
            },
          }).then((i) => {
            if (i.isConfirmed && i.value && i.value !== t.basename) {
              var a = i.value;
              e("rename", t, "&name=" + encodeURI(a), function (e, i, n, r) {
                ie.fire({ title: a });
                var c = t.basename,
                  p = t.path,
                  d = l(r ? r.path : p.split("/").slice(0, -1).join("/"), a),
                  m = !!r && l(r.url_path, a);
                if (r) {
                  if (r === _c.current_dir && r.files) {
                    var u = (r.files[a] = Object.assign(t, {
                      basename: a,
                      path: d,
                      url_path: m,
                    }));
                    if (i && i.isConnected) {
                      i.setAttribute("href", s(u, "download" === _c.click)),
                        (i.dataset.name = a),
                        (_class("name", i)[0].textContent = a);
                      var f = i.firstElementChild;
                      if (!t.is_dir && "IMG" === f.nodeName) {
                        var v =
                          _c.script +
                          "?file=" +
                          encodeURIComponent(u.path) +
                          "&resize=" +
                          (B.pixel_ratio >= 1.5 &&
                          _c.image_resize_dimensions_retina
                            ? _c.image_resize_dimensions_retina
                            : _c.image_resize_dimensions) +
                          "&" +
                          new Date().getTime();
                        (f.dataset.src = v),
                          f.hasAttribute("src") && f.setAttribute("src", v);
                      }
                      (e._values = u), F.set_sort();
                    }
                    delete u.popup_caption, delete r.files[c];
                  } else delete r.files;
                  if (r.preview === c) {
                    r.preview = a;
                    var g = r.path.split("/").slice(0, -1).join("/");
                    g && _c.dirs[g] && delete _c.dirs[g].html;
                  }
                  delete r.html,
                    delete r.json_cache,
                    I.remove(ce(r.path, r.mtime));
                }
                t.is_dir &&
                  (Object.keys(_c.dirs)
                    .filter((e) => e.startsWith(p))
                    .forEach(function (e) {
                      var t = e.split(p).slice(1).join("/"),
                        i = d + t,
                        n = (_c.dirs[i] = Object.assign(_c.dirs[e], {
                          path: i,
                          files: !1,
                          json_cache: !1,
                          html: !1,
                          url_path: !!m && m + t,
                        }));
                      if (
                        (e === p && (n.basename = a),
                        delete _c.dirs[e],
                        I.remove(ce(e, n.mtime)),
                        W.sidebar_menu)
                      ) {
                        var l = _query(
                          '[data-path="' + o(e) + '"]',
                          W.sidebar_menu
                        );
                        l &&
                          (e === p &&
                            (l.firstElementChild.lastChild.textContent = a),
                          (l.dataset.path = i),
                          l.firstElementChild.setAttribute("href", s(n)));
                      }
                    }),
                  _c.current_path &&
                    _c.current_path.startsWith(p) &&
                    F.get_files(_c.current_dir.path, "push"));
              });
            }
          });
        },
        new_folder: function (t) {
          if (!t.is_dir)
            return ae.fire({ title: t.basename + " is not a directory" });
          ee.fire({
            title: K.get("new folder", !0),
            html: r(t.path),
            inputPlaceholder: K.get("Folder name", !0),
            inputValidator: (e) => {
              var i = e.match(/[<>:"'/\\|?*#]|\.\.|\.$/g);
              return i
                ? "Invalid characters " + i.join(" ")
                : _c.dirs[l(t.path, e)] ||
                  (_c.dirs[t.path] &&
                    _c.dirs[t.path].files &&
                    _c.dirs[t.path].files[e])
                ? "Folder exists"
                : void 0;
            },
          }).then((n) => {
            if (n.isConfirmed && n.value) {
              var o = n.value;
              e(
                "new_folder",
                t,
                "&name=" + encodeURI(o),
                function (e, n, r, c) {
                  if (
                    (ie.fire({ title: o }), _c.menu_enabled && !_c.menu_exists)
                  )
                    return window.location.reload();
                  var p = _c.dirs[t.path];
                  if (p) {
                    if (
                      (delete p.files,
                      delete p.html,
                      delete p.json_cache,
                      I.remove(ce(p.path, p.mtime)),
                      r)
                    ) {
                      var d = l(p.path, o),
                        m = (_c.dirs[d] = {
                          basename: o,
                          path: d,
                          url_path: l(p.url_path, o),
                          is_dir: !0,
                          is_writeable: !0,
                          is_readable: !0,
                          filetype: "dir",
                          mime: "directory",
                          mtime: Date.now() / 1e3,
                          fileperms: p.fileperms,
                        }),
                        u =
                          "UL" === r.lastElementChild.nodeName &&
                          r.lastElementChild,
                        f = 1 * (r.dataset.level || 0),
                        v =
                          '<li data-level="' +
                          (f + 1) +
                          '" data-path="' +
                          i(d) +
                          '" class="menu-li"><a href="' +
                          s(m) +
                          '" class="menu-a">' +
                          F.get_svg_icon_class(
                            "folder",
                            "menu-icon menu-icon-folder"
                          ) +
                          a(o) +
                          "</a></li>";
                      u
                        ? u.insertAdjacentHTML("afterbegin", v)
                        : (r.firstElementChild.firstElementChild.remove(),
                          r.firstElementChild.insertAdjacentHTML(
                            "afterbegin",
                            F.get_svg_icon_multi_class(
                              "menu-icon menu-icon-toggle",
                              "plus",
                              "minus"
                            ) +
                              F.get_svg_icon_multi_class(
                                "menu-icon menu-icon-folder menu-icon-folder-toggle",
                                "folder",
                                "folder_plus",
                                "folder_minus"
                              )
                          ),
                          r.classList.add("has-ul"),
                          r.insertAdjacentHTML(
                            "beforeend",
                            '<ul style="--depth:' +
                              f +
                              '" class="menu-ul">' +
                              v +
                              "</ul>"
                          )),
                        (m.menu_li = r.lastElementChild.firstElementChild);
                    }
                    p === _c.current_dir &&
                      F.get_files(_c.current_path, "replace", !0);
                  }
                }
              );
            }
          });
        },
        new_file: function (t) {
          if (!t.is_dir)
            return ae.fire({ title: t.basename + " is not a directory" });
          ee.fire({
            title: K.get("new file", !0),
            html: r(t.path),
            inputPlaceholder: K.get("File name", !0),
            inputValue: "file.txt",
            inputValidator: (e) => {
              var i = e.match(/[<>:"'/\\|?*#]|\.\.|\.$/g);
              return i
                ? "Invalid characters " + i.join(" ")
                : _c.dirs[t.path] &&
                  _c.dirs[t.path].files &&
                  _c.dirs[t.path].files[e]
                ? "Filename exists"
                : void 0;
            },
          }).then((i) => {
            if (i.isConfirmed && i.value) {
              var a = i.value;
              e("new_file", t, "&name=" + encodeURI(a), function (e, i, n, o) {
                ie.fire({ title: a });
                var l = _c.dirs[t.path];
                l &&
                  (delete l.files,
                  delete l.html,
                  delete l.json_cache,
                  I.remove(ce(l.path, l.mtime)),
                  l === _c.current_dir &&
                    F.get_files(_c.current_path, "replace", !0));
              });
            }
          });
        },
        delete: function (i) {
          oe.fire({ title: K.get("delete", !0), html: r(i.path) }).then((a) => {
            a.isConfirmed &&
              e("delete", i, null, function (e, a, n, o, l) {
                if (l.fail)
                  return ae.fire({
                    title:
                      "Failed to delete " +
                      l.fail +
                      " items. Please refresh browser.",
                    timer: !1,
                  });
                if (
                  (ie.fire({ title: K.get("delete", !0) + " " + i.basename }),
                  o.files && delete o.files[i.basename],
                  delete o.html,
                  delete o.json_cache,
                  I.remove(ce(o.path, o.mtime)),
                  "image" === i.mime0 && o.images_count && o.images_count--,
                  !i.is_dir && o.files_count && o.files_count--,
                  o.dirsize && i.filesize && (o.dirsize -= i.filesize),
                  o.preview === i.basename && (delete o.preview, o.path))
                ) {
                  var s = o.path.split("/").slice(0, -1).join("/");
                  _c.dirs[s] && delete _c.dirs[s].html;
                }
                if (
                  (o === _c.current_dir &&
                    ((_c.file_names = Object.keys(_c.files)),
                    (_c.files_count = _c.file_names.length),
                    F.breadcrumbs_info(),
                    U.list.remove("path", i.path),
                    t()),
                  i.is_dir)
                ) {
                  if (
                    (Object.keys(_c.dirs).forEach((e) => {
                      if (!e.startsWith(i.path)) return !0;
                      var t = _c.dirs[e];
                      t && (I.remove(ce(t.path, t.mtime)), delete _c.dirs[e]);
                    }),
                    n && n.isConnected)
                  ) {
                    var r = n.parentElement;
                    if (
                      r.children.length > 1 ||
                      "LI" !== r.parentElement.tagName
                    )
                      n.remove();
                    else {
                      var c = r.parentElement;
                      r.remove(), c.classList.remove("has-ul", "menu-li-open");
                      var p = c.firstElementChild;
                      p.firstElementChild.remove();
                      var d = p.firstElementChild;
                      d.lastElementChild.remove(),
                        d.lastElementChild.remove(),
                        d.classList.remove("menu-icon-folder-toggle");
                    }
                  }
                  _c.current_path &&
                    _c.current_path.startsWith(i.path) &&
                    F.get_files(o.path, "replace");
                }
              });
          });
        },
      };
    })();
  function se(e, t) {
    try {
      var i = JSON.parse(e);
      return t ? i[t] : i;
    } catch (e) {
      return !1;
    }
  }
  _c.allow_upload &&
    F.load_plugin("uppy", function () {
      var e = { note: !0, DropTarget: !0, ImageEditor: !0 };
      _c.config && _c.config.uppy && Object.assign(e, _c.config.uppy);
      var t = (U.uppy = new Uppy.Core({
          restrictions: {
            maxFileSize: _c.upload_max_filesize || null,
            allowedFileTypes: _c.upload_allowed_file_types
              ? _c.upload_allowed_file_types
                  .split(",")
                  .map((e) => {
                    var t = e.trim();
                    return t.startsWith(".") ||
                      t.includes("/") ||
                      t.includes("*")
                      ? t
                      : "." + t;
                  })
                  .filter((e) => e)
              : null,
          },
          meta: { action: "fm", task: "upload", is_dir: !0 },
        })
          .use(Uppy.Dashboard, {
            trigger: "#fm-upload",
            thumbnailWidth: Math.round(160 * Math.min(B.pixel_ratio, 2)),
            doneButtonHandler: () => {
              d(!1), t.reset();
            },
            showLinkToFileUploadResult: !0,
            showProgressDetails: !0,
            showRemoveButtonAfterComplete: _c.allow_delete,
            metaFields: [
              {
                id: "name",
                name: K.get("name"),
                placeholder: K.get("name"),
                render: ({ value: e, onChange: t, fieldCSSClasses: i }, a) =>
                  a("input", {
                    class: i.text,
                    type: "text",
                    value: e,
                    maxlength: 128,
                    onChange: (e) => t(e.target.value.trim()),
                    onInput: (e) => {
                      e.target.value = e.target.value
                        .replace(/[#%&(){}\\<>*?/$!'":;\[\]@+`|=]/gi, "")
                        .replace("..", ".");
                    },
                    "data-uppy-super-focusable": !0,
                  }),
              },
            ],
            closeModalOnClickOutside: !0,
            animateOpenClose: !1,
            proudlyDisplayPoweredByUppy: !1,
            theme: "dark",
          })
          .use(Uppy.XHRUpload, {
            endpoint: _c.script,
            validateStatus: (e, t, i) => se(t, "success"),
            getResponseError: (e, t) => se(e, "error"),
          })
          .on("file-removed", (e, t) => {
            if (
              _c.allow_delete &&
              "removed-by-user" === t &&
              e.response &&
              e.response.body &&
              e.response.body.success &&
              e.progress &&
              e.progress.uploadComplete &&
              e.meta
            )
              T({
                params:
                  "action=fm&task=delete&path=" +
                  encodeURIComponent(e.meta.path + "/" + e.meta.name),
              });
          })
          .on("upload-success", (e, i) => {
            var a = i.body.filename;
            a && e.name !== a && t.setFileMeta(e.id, { name: a });
          })
          .on("complete", (e) => {
            e.successful &&
              e.successful.length &&
              e.successful.forEach(function (e) {
                e.uploadURL &&
                  (e.uploadURL = new URL(e.uploadURL, location.href).href);
              });
            var i = t.getState().meta.path,
              a = _c.dirs[i];
            a &&
              (delete a.files,
              delete a.html,
              delete a.json_cache,
              I.remove(ce(i, a.mtime))),
              delete U.contextmenu.el;
          })
          .on("dashboard:modal-open", () => {
            J || a.classList.add("uppy-nolicense"),
              e.note &&
                t
                  .getPlugin("Dashboard")
                  .setOptions({
                    note: ("string" == typeof e.note
                      ? e.note
                      : "%path% ≤ %upload_max_filesize%"
                    )
                      .replace(
                        "%upload_max_filesize%",
                        _c.upload_max_filesize
                          ? filesize(_c.upload_max_filesize)
                          : ""
                      )
                      .replace(
                        "%path%",
                        t.getState().meta.path || _c.current_path || "/"
                      ),
                  });
          })
          .on("dashboard:modal-closed", () => {
            var e = t.getState();
            if (100 === e.totalProgress) {
              var i = e.meta.path === _c.current_path;
              F.get_files(e.meta.path, i ? "replace" : "push", i), t.reset();
            }
          })),
        i = {
          ImageEditor: { target: Uppy.Dashboard, quality: 0.8 },
          DropTarget: {
            target: document.body,
            onDrop: (e) => d(!0, _c.current_path),
          },
          Webcam: { target: Uppy.Dashboard },
        };
      Object.keys(i).forEach((a) => {
        e[a] &&
          t.use(
            Uppy[a],
            "object" == typeof e[a] ? Object.assign(i[a], e[a]) : i[a]
          );
      });
      var a = _class("uppy-Root")[0];
      _c.demo_mode && a.classList.add("uppy-demo-mode"),
        _c.allow_delete && a.classList.add("uppy-allow-delete");
      var n,
        o,
        l =
          e.hasOwnProperty("Compressor") && !e.Compressor
            ? {}
            : Object.assign(
                {
                  interface: !0,
                  enabled: !1,
                  quality: 0.8,
                  maxWidth: 2e3,
                  maxHeight: 2e3,
                },
                e.Compressor || {}
              );
      if (l.interface) {
        var s = {};
        function r(e) {
          var i = [];
          if (
            (p.forEach((e) => {
              var t = e.id.replace("compressor-", ""),
                a =
                  "enabled" === t
                    ? e.checked
                      ? 1
                      : 0
                    : e.value.replace(",", ".");
              if (isNaN(a) || "" === a) return (e.value = l[t]);
              (a = +a),
                ["maxWidth", "maxHeight"].includes(t) &&
                  (e.value = a = a < 1 ? 1 : Math.round(a)),
                "quality" === t &&
                  (a < 0 || a > 1) &&
                  (e.value = a = a > 1 ? 1 : 0),
                a != s[t] && i.push(t + "=" + a),
                (l[t] = a);
            }),
            I.set("files:upload:compressor", i.join("&"), !0),
            "compressor-enabled" === e.target.id)
          )
            return (
              c.classList.toggle("compressor-enabled", e.target.checked),
              e.target.checked
                ? t.use(Uppy.Compressor, l)
                : t.removePlugin(t.getPlugin("Compressor"))
            );
          t.getPlugin("Compressor").setOptions(l);
        }
        ["enabled", "quality", "maxWidth", "maxHeight"].forEach(
          (e) => (s[e] = l[e])
        ),
          Object.assign(
            l,
            ((n = I.get("files:upload:compressor")),
            (o = {}),
            n &&
              n.split("&").forEach((e) => {
                var [t, i] = e.split("=");
                o[t] = isNaN(i) ? i : +i;
              }),
            o)
          ),
          _class("uppy-Dashboard-innerWrap", a)[0].insertAdjacentHTML(
            "beforeend",
            '<div class="compressor-container' +
              (l.enabled ? " compressor-enabled" : "") +
              '"><div class="compressor-toggle"><input type="checkbox" id="compressor-enabled"' +
              (l.enabled ? " checked" : "") +
              '><label for="compressor-enabled">' +
              K.span("resize and compress images", !0) +
              '</label></div><div class="compressor-options"><div class="compressor-option"><label for="compressor-maxWidth">' +
              K.span("width", !0) +
              '</label><input type="number" inputmode="numeric" pattern="[0-9]*" id="compressor-maxWidth" min="0" max="100000" step="10" value="' +
              l.maxWidth +
              '"></div><div class="compressor-option"><label for="compressor-maxHeight">' +
              K.span("height", !0) +
              '</label><input type="number" inputmode="numeric" pattern="[0-9]*" id="compressor-maxHeight" min="0" max="100000" step="10" value="' +
              l.maxHeight +
              '"></div><div class="compressor-option"><label for="compressor-quality">' +
              K.span("quality", !0) +
              "</label><input" +
              (B.is_pointer ? ' type="number"' : "") +
              ' pattern="[0-9]*" inputmode="decimal" id="compressor-quality" min="0" max="1" step="0.1" value="' +
              l.quality +
              '"></div></div></div>'
          );
        var c = _class("compressor-container")[0],
          p = _tag("input", c);
        p.forEach((e) => w(e, r, "change")),
          l.enabled &&
            !e.Compressor &&
            "none" === window.getComputedStyle(c).getPropertyValue("display") &&
            ((l.enabled = !1), I.remove("files:upload:compressor"));
      }
      function d(e, i) {
        var a = t.getPlugin("Dashboard");
        !!e !== a.isModalOpen() &&
          (a[e ? "openModal" : "closeModal"](), i && t.setMeta({ path: i }));
      }
      function m(e) {
        F.load_plugin(
          "uppy_locale_" + e,
          function () {
            U.uppy.setOptions({ locale: Uppy.locales[e] });
          },
          { src: ["@uppy/locales@2.1.1/dist/" + e + ".min.js"] }
        );
      }
      l.enabled && t.use(Uppy.Compressor, l),
        (F.uppy_locale = function (e) {
          var t = f(e) || f(_c.lang_default) || "en_US";
          t !== v && m((v = t));
        });
      var u = { no: "nb_NO", nn: "nb_NO" };
      function f(e) {
        return !!e && u[e];
      }
      [
        "ar_SA",
        "bg_BG",
        "cs_CZ",
        "da_DK",
        "de_DE",
        "el_GR",
        "en_US",
        "es_ES",
        "fa_IR",
        "fi_FI",
        "fr_FR",
        "gl_ES",
        "he_IL",
        "hr_HR",
        "hu_HU",
        "id_ID",
        "is_IS",
        "it_IT",
        "ja_JP",
        "ko_KR",
        "nb_NO",
        "nl_NL",
        "pl_PL",
        "pt_BR",
        "pt_PT",
        "ro_RO",
        "ru_RU",
        "sk_SK",
        "sr_RS_Cyrillic",
        "sr_RS_Latin",
        "sv_SE",
        "th_TH",
        "tr_TR",
        "uk_UA",
        "vi_VN",
        "zh_CN",
        "zh_TW",
      ].forEach(function (e) {
        u[e.replace("_", "-").toLowerCase()] = e;
        var t = e.split("_")[0];
        u[t] || (u[t] = e);
      });
      var v =
        f(z("lang", !0)) ||
        f(I.get("files:lang:current")) ||
        (!!e.locale && f(e.locale.replace("_", "-").toLowerCase())) ||
        (function () {
          if (_c.lang_auto && B.nav_langs)
            for (var e = 0; e < B.nav_langs.length; e++) {
              var t = B.nav_langs[e].toLowerCase(),
                i = f(t);
              if (i) return i;
              var a = !!t.includes("-") && f(t.split("-")[0]);
              if (a) return a;
            }
        })() ||
        f(_c.lang_default) ||
        "en_US";
      if (
        ("en_US" !== v && m(v),
        w(
          window,
          (e) => {
            t.reset(), d(!1);
          },
          "popstate"
        ),
        z("upload", !0))
      )
        var g = setInterval(() => {
          _c.hasOwnProperty("current_path") &&
            (d(!0, _c.current_path), clearTimeout(g));
        }, 300);
    });
  var re = (function () {
    var e,
      t = "",
      i = screen.width >= 768,
      a = _c.filter_live && B.is_pointer,
      n = (function () {
        if (!_c.filter_props || "string" != typeof _c.filter_props)
          return ["basename"];
        var e = [
            "basename",
            "filetype",
            "mime",
            "features",
            "title",
            "headline",
            "description",
            "creator",
            "credit",
            "copyright",
            "keywords",
            "city",
            "sub-location",
            "province-state",
          ],
          t = ["icon"];
        return (
          _c.filter_props.split(",").forEach(function (i) {
            var a = i.trim().toLowerCase();
            "name" === a && (a = "basename"),
              a && e.includes(a) && !t.includes(a) && t.push(a);
          }),
          t
        );
      })();
    function o(e) {
      i && (W.filter_container.dataset.input = e || "");
    }
    var l = {
      create: function () {
        (U.list = new List(W.files.parentElement, {})),
          M(_c.file_names, function (e, t) {
            U.list.items[t]._values = _c.files[e];
          });
      },
      empty: function () {
        U.list && U.list.clear(),
          p(W.files),
          window.scrollY && window.scroll({ top: 0 });
      },
      filter: function (e) {
        if (t !== W.filter.value && U.list) {
          t = W.filter.value;
          var i = U.list.search(t, n).length,
            a = t ? "filter-" + (i ? "" : "no") + "match" : "";
          W.filter.className !== a && (W.filter.className = a),
            F.topbar_info_search(t, i),
            !1 !== e &&
              history.replaceState(
                history.state || null,
                document.title,
                t
                  ? "#filter=" + encodeURIComponent(t)
                  : location.pathname + location.search
              ),
            window.scrollY && window.scrollTo({ top: 0 });
        }
      },
      hash: function (e) {
        var t = z("filter", !0, !0);
        t &&
          ((t = decodeURIComponent(t)),
          (W.filter.value = t),
          o(t),
          e && l.filter(!1));
      },
      clear: function (e) {
        if (t) {
          if (((W.filter.value = ""), o(), e)) return l.filter();
          (t = ""), (W.filter.className = "");
        }
      },
      disabled: function (e) {
        W.filter.disabled !== !!e && (W.filter.disabled = !!e);
      },
    };
    return (
      (i || a) &&
        w(
          W.filter,
          function (t) {
            o(W.filter.value),
              a &&
                (e && clearTimeout(e),
                (e = setTimeout(l.filter, R(250, 750, _c.files_count))));
          },
          "input"
        ),
      w(W.filter, l.filter, "change"),
      l
    );
  })();
  function ce(e, t) {
    return (
      "" === e && (e = "ROOT"),
      "files:dir:" +
        _c.dirs_hash +
        ":" +
        (e || _c.current_dir.path) +
        ":" +
        (t || _c.current_dir.mtime)
    );
  }
  !(function () {
    var e = !1,
      o =
        B.pixel_ratio >= 1.5 && _c.image_resize_dimensions_retina
          ? _c.image_resize_dimensions_retina
          : _c.image_resize_dimensions,
      s =
        !!_c.x3_path &&
        _c.x3_path +
          (_c.x3_path.endsWith("/") ? "" : "/") +
          "render/w" +
          (B.pixel_ratio >= 1.5 ? "480" : "320") +
          "/";
    function c(t, i) {
      if (e) return e.abort(), (e = !1), void (i && i());
      if (_c.transitions && _c.files_count)
        if ("list" !== _c.layout) {
          for (
            var a = W.files.children,
              n = a.length,
              o = [],
              l = window.innerHeight,
              s = 0;
            s < n;
            s++
          ) {
            var r = a[s],
              c = r.getBoundingClientRect();
            if (!(c.bottom < 0))
              if (c.top < l - 10) o.push(r);
              else if ("columns" !== _c.layout) break;
          }
          var p = Math.min(Math.round(200 / o.length), 30);
          d = {
            targets: o,
            opacity: t ? [0, 1] : [1, 0],
            easing: "easeOutQuint",
            duration: t ? 300 : 150,
            delay: anime.stagger(p),
          };
          i && (d.complete = i), anime(d);
        } else {
          anime.remove(W.files);
          var d = {
            targets: W.files,
            opacity: t ? [0, 1] : [1, 0],
            easing: "easeOutCubic",
            duration: t ? 300 : 150,
            complete: function () {
              t || W.files.style.removeProperty("opacity"), i && i();
            },
          };
          anime(d);
        }
      else i && i();
    }
    function p(e, i, a, n) {
      t(e, i, n),
        a &&
          _c.history &&
          history[a + "State"](
            { path: e },
            i,
            (function (e, t) {
              return d || "replace" !== e || (!_c.query_path && t)
                ? ((d = !0),
                  t
                    ? "?" +
                      encodeURI(t).replace(/&/g, "%26").replace(/#/g, "%23")
                    : "//" + location.host + location.pathname)
                : location.href;
            })(a, e)
          ),
        (document.body.dataset.currentPath = e || "/");
    }
    (image_load_errors = 0),
      (image_resize_min_ratio = Math.max(_c.image_resize_min_ratio, 1)),
      (image_resize_types =
        _c.image_resize_enabled && _c.image_resize_types
          ? _c.image_resize_types
              .split(",")
              .map(
                (e) =>
                  ({ jpeg: 2, jpg: 2, png: 3, gif: 1, webp: 18, bmp: 6 }[
                    e.toLowerCase().trim()
                  ])
              )
              .filter((e) => e)
          : []),
      (click_window =
        _c.click_window && !["download", "window"].includes(_c.click)
          ? _c.click_window
              .split(",")
              .map((e) => e.toLowerCase().trim())
              .filter((e) => e)
          : []);
    var d = !1;
    function u() {
      return (_c.current_dir.html = V(_c.file_names, function (e, t) {
        var c = _c.files[e];
        if (!c.is_dir && (!c.mime && c.ext && (c.mime = pe[c.ext]), c.mime)) {
          var p = c.mime.split("/");
          (c.mime0 = p[0]), p[1] && (c.mime1 = p[1]);
        }
        (c.display_name = c.url
          ? c.url.replace(/(^https?:\/\/|\/$)/gi, "")
          : c.basename),
          c.image &&
            (c.image.exif &&
              c.image.exif.gps &&
              Array.isArray(c.image.exif.gps) &&
              (c.gps = c.image.exif.gps),
            c.image.width &&
              c.image.height &&
              ((c.dimensions = [c.image.width, c.image.height]),
              (c.ratio = c.image.width / c.image.height)),
            c.image.iptc && Object.assign(c, c.image.iptc));
        var d,
          m = (function () {
            if (c.mime1) {
              if ("image" === c.mime0) {
                if (!B.browser_images.includes(c.mime1)) return;
                if (
                  ((c.browser_image = c.mime1),
                  (c.is_popup = !0),
                  J && c.dimensions && B.max_texture_size)
                ) {
                  var e = _c.config.panorama.is_pano(c, B);
                  e && ((c.is_pano = e), (_c.current_dir.has_pano = !0));
                }
                if (!_c.load_images || !c.is_readable) return;
                var t = !1,
                  i = "files-img files-img-placeholder files-lazy";
                if ("svg+xml" === c.browser_image || "svg" === c.ext) {
                  if (c.filesize > _c.config.load_svg_max_filesize) return;
                  i += " files-img-svg";
                } else {
                  if (
                    ((function (e) {
                      if (
                        _c.image_resize_enabled &&
                        e.dimensions &&
                        e.mime1 &&
                        e.image &&
                        _c.resize_image_types.includes(e.mime1)
                      ) {
                        var t = e.image,
                          i = Math.max(t.width, t.height) / o,
                          a = t.width * t.height;
                        if (
                          (!t.type || image_resize_types.includes(t.type)) &&
                          !(
                            (i < image_resize_min_ratio &&
                              e.filesize <= _c.load_images_max_filesize) ||
                            (_c.image_resize_max_pixels &&
                              a > _c.image_resize_max_pixels)
                          )
                        ) {
                          if (_c.image_resize_memory_limit) {
                            var n = t.width / i,
                              l = t.height / i;
                            if (
                              (a *
                                (t.bits ? t.bits / 8 : 1) *
                                (t.channels || 3) *
                                1.33 +
                                n * l * 4) /
                                1048576 >
                              _c.image_resize_memory_limit
                            )
                              return;
                          }
                          return !0;
                        }
                      }
                    })(c) && (t = c.resize = o),
                    !t && c.filesize > _c.load_images_max_filesize)
                  )
                    return;
                  "ico" === c.ext && (i += " files-img-ico"),
                    c.dimensions &&
                      ((c.preview_dimensions = t
                        ? c.ratio > 1
                          ? [t, Math.round(t / c.ratio)]
                          : [Math.round(t * c.ratio), t]
                        : [c.image.width, c.image.height]),
                      (c.preview_ratio =
                        c.preview_dimensions[0] / c.preview_dimensions[1]));
                }
                return (
                  '<img class="' +
                  i +
                  '" data-src="' +
                  (function () {
                    if (s && c.url_path) {
                      var e = c.url_path.match(/\/content\/(.+)/);
                      if (e) return s + encodeURI(e.pop());
                    }
                    if (t && c.image["resize" + t])
                      return encodeURI(c.image["resize" + t]);
                    if (!t && !_c.load_files_proxy_php && c.url_path)
                      return encodeURI(c.url_path).replace(/#/g, "%23");
                    var i = c.mtime + "." + c.filesize;
                    return (
                      _c.script +
                      "?file=" +
                      encodeURIComponent(c.path) +
                      (t
                        ? "&resize=" + t + "&" + _c.image_cache_hash + "." + i
                        : "&" + i)
                    );
                  })() +
                  '"' +
                  (c.preview_dimensions
                    ? ' width="' +
                      c.preview_dimensions[0] +
                      '" height="' +
                      c.preview_dimensions[1] +
                      '"'
                    : "") +
                  ">"
                );
              }
              return "video" === c.mime0 &&
                (X("video", c) &&
                  ((c.is_browser_video = !0),
                  _c.popup_video && (c.is_popup = !0)),
                _c.video_thumbs_enabled && c.is_readable)
                ? ((c.preview_dimensions = [480, 320]),
                  (c.preview_ratio = 1.5),
                  (c.is_browser_video ? F.get_svg_icon("play") : "") +
                    '<img class="files-img files-img-placeholder files-lazy" data-src="' +
                    _c.script +
                    "?file=" +
                    encodeURIComponent(c.path) +
                    "&resize=video&" +
                    _c.image_cache_hash +
                    "." +
                    c.mtime +
                    "." +
                    c.filesize +
                    '"' +
                    (c.preview_dimensions
                      ? ' width="' +
                        c.preview_dimensions[0] +
                        '" height="' +
                        c.preview_dimensions[1] +
                        '"'
                      : "") +
                    ">")
                : void 0;
            }
          })();
        return (
          (function (e) {
            var t = "dir" == e.filetype ? "folders" : "files",
              i = e.image;
            if (i) {
              t += ",image";
              var a = i.width,
                n = i.height,
                o = i.exif,
                l = i.iptc;
              a &&
                n &&
                (t +=
                  a === n
                    ? ",square"
                    : a > n
                    ? ",landscape,horizontal"
                    : ",portrait,vertical"),
                o &&
                  ((t += ",exif"),
                  o.gps && (t += ",gps,maps"),
                  (t += V(["Make", "Model", "Software"], function (e) {
                    if (o[e]) return "," + o[e];
                  }))),
                l &&
                  (t +=
                    ",iptc" +
                    V(
                      [
                        "title",
                        "headline",
                        "description",
                        "creator",
                        "credit",
                        "copyright",
                        "keywords",
                        "city",
                        "sub-location",
                        "province-state",
                      ],
                      function (e) {
                        if (l[e]) return "," + e;
                      }
                    ));
            }
            e.features = t;
          })(c),
          c.DateTimeOriginal && (c.mtime = c.DateTimeOriginal),
          '<a href="' +
            r(c, "download" === _c.click) +
            '" target="_blank" class="files-a files-a-' +
            (m ? "img" : "svg") +
            (c.url ? " files-a-url" : "") +
            '"' +
            (c.preview_ratio
              ? ' style="--ratio:' + c.preview_ratio + '"'
              : "") +
            ' data-name="' +
            i(c.basename) +
            '"' +
            (c.is_dir || "download" !== _c.click ? "" : " download") +
            ">" +
            (c.is_pano
              ? F.get_svg_icon_class(
                  "panorama_variant",
                  "svg-icon files-icon-overlay"
                )
              : "") +
            ("gif" !== c.browser_image || (!c.resize && m)
              ? ""
              : F.get_svg_icon_class("gif", "svg-icon files-icon-overlay")) +
            (m || F.get_svg_large(c, "files-svg")) +
            '<div class="files-data">' +
            l.span(c.gps, "gps") +
            '<span class="name" title="' +
            i(c.display_name) +
            '">' +
            a(c.display_name) +
            "</span>" +
            (c.image && c.image.iptc && c.image.iptc.title
              ? n(
                  -1 === (d = c.image.iptc.title).indexOf("<a")
                    ? d
                    : d
                        .replace(/<a\s/g, "<span ")
                        .replace(/<\/a>/g, "</span>")
                        .replace(/\shref\=/g, " data-href="),
                  "title"
                )
              : "") +
            n(F.get_svg_icon_files(c), "icon") +
            f(c.dimensions, "dimensions") +
            v(c, "size") +
            h(c.image, "exif", "span") +
            n(c.ext ? n(c.ext, "ext-inner") : "", "ext") +
            n(F.get_time(c, "L LT", !0, !1), "date") +
            '<span class="flex"></span></div>' +
            g("menu" !== _c.click || c.is_dir, "files-context") +
            P(c) +
            "</a>"
        );
      }));
    }
    function _(e, t, i) {
      Q(),
        (image_load_errors = 0),
        (_c.current_dir = _c.dirs[e]),
        (_c.files = _c.current_dir.files),
        j(i + " :", e, _c.current_dir),
        (_c.file_names = Object.keys(_c.files)),
        (_c.files_count = _c.file_names.length),
        p(e, _c.current_dir.basename, t),
        F.breadcrumbs_info(),
        _c.files_count ||
          F.topbar_info(
            F.get_svg_icon("alert_circle_outline") +
              '<span data-lang="directory is empty" class="f-inline-block">' +
              K.get("directory is empty") +
              "</span>",
            "warning"
          ),
        re.disabled(!_c.files_count),
        A(W.sortbar, !_c.files_count),
        _c.files_count &&
          ((W.files.innerHTML = _c.current_dir.html || u()),
          _c.current_dir.has_pano && F.load_plugin("pannellum"),
          re.create(),
          "push" !== t && re.hash(!0),
          F.set_sort(),
          !t &&
            _c.current_dir.scroll &&
            _c.current_dir.scroll.y &&
            _c.current_dir.scroll.h == document.body.scrollHeight &&
            window.scrollTo(0, _c.current_dir.scroll.y),
          ("replace" === t &&
            (function (e) {
              if (!_c.history || !location.hash) return;
              var t = z("pid", !0, !0),
                i = t || location.hash.replace("#", "");
              if (!i) return;
              var a = _c.files[decodeURIComponent(i)];
              if (!a) return;
              t && a.is_popup ? F.open_popup(a, !0) : F.open_modal(a);
              return !0;
            })()) ||
            c(!0));
    }
    function x(e, t) {
      return _c.dirs[e]
        ? t
          ? _c.dirs[e].mtime > t.mtime
            ? (_c.dirs[e] = Object.assign(t, _c.dirs[e]))
            : Object.assign(_c.dirs[e], t)
          : _c.dirs[e]
        : (_c.dirs[e] = t || {});
    }
    function b(e, t, i) {
      A(W.sortbar, !0),
        F.topbar_info(
          F.get_svg_icon("alert_circle_outline") +
            '<strong data-lang="error" class="f-inline-block">' +
            K.get("error") +
            "</strong>" +
            (e ? ": " + e : "."),
          "error"
        ),
        p(t, K.get("error") + (e ? ": " + e : "."), i, !0);
    }
    (F.get_files = function (t, i, a) {
      if (a || t !== _c.current_path) {
        (_c.current_path = t),
          _c.config.history_scroll &&
            _c.current_dir &&
            (_c.current_dir.scroll = {
              y: window.scrollY,
              h: document.body.scrollHeight,
            }),
          (W.topbar_info.className = "info-hidden"),
          re.clear(),
          a || F.set_breadcrumbs(t),
          !a && _c.menu_exists && F.set_menu_active(t);
        var n = _c.dirs[t];
        if (!a && n) {
          if (n.files)
            return c(!1, function () {
              re.empty(), _(t, i, "files from JS");
            });
          var o = I.get_json(ce(t, n.mtime));
          if (o)
            return (
              x(t, o),
              c(!1, function () {
                re.empty(), _(t, i, "files from localStorage");
              })
            );
        }
        re.disabled(!0),
          _c.menu_exists && F.menu_loading(!1, !0),
          W.topbar.classList.add("topbar-spinner");
        var l = 0,
          s = !(!n || !n.json_cache) && n.json_cache;
        c(!1, function () {
          re.empty(), r();
        }),
          (e = T({
            params: !s && "action=files&dir=" + encodeURIComponent(t),
            url: s,
            json_response: !0,
            fail: () => {
              b(t, t, i);
            },
            always: () => {
              (e = !1),
                _c.menu_exists && F.menu_loading(!1, !1),
                W.topbar.classList.remove("topbar-spinner");
            },
            complete: function (e, a, n) {
              return n
                ? e.error
                  ? b(e.error + " " + t, t, i)
                  : (x(t, e), I.set(ce(t, e.mtime), a, !1, 1e3), void r())
                : b(t, t, i);
            },
          }));
      }
      function r(e) {
        1 == l++ && _(t, i, s ? "files from JSON " + s : "files from xmlhttp");
      }
    }),
      (F.init_files = function () {
        if (_c.query_path)
          return _c.query_path_valid
            ? F.get_files(_c.query_path, "replace")
            : b("Invalid directory " + _c.query_path, _c.query_path, "replace");
        if (location.search) {
          var e = location.search.split("&")[0].replace("?", "");
          if (
            e &&
            "debug" !== e &&
            (-1 === e.indexOf("=") || e.indexOf("/") > -1)
          ) {
            _c.query_path = decodeURIComponent(e);
            var t =
              !(
                _c.dirs[_c.query_path] ||
                -1 !== e.indexOf("/") ||
                !_c.dirs[""] ||
                !_c.dirs[""].files
              ) && _c.dirs[""].files[_c.query_path];
            return (
              t && t.is_dir && x(_c.query_path, t),
              F.get_files(_c.query_path, "replace")
            );
          }
        }
        F.get_files(_c.init_path, "replace");
      }),
      m(W.topbar_info, function (e, t) {
        if ("reset" === e) return re.clear(!0);
      }),
      w(W.files, function (e) {
        var t = e.target;
        if (t !== W.files) {
          var i = t.closest(".files-a"),
            a = !!i && _c.files[i.dataset.name];
          if (a)
            return t.classList.contains("context-button")
              ? F.create_contextmenu(e, "files", t, a, i)
              : U.contextmenu.is_open && ("menu" !== _c.click || a.is_dir)
              ? e.preventDefault()
              : t.dataset.href
              ? (e.preventDefault(), window.open(t.dataset.href))
              : !a.is_dir &&
                ("window" === _c.click ||
                  (a.ext && click_window.includes(a.ext)))
              ? _c.click_window_popup
                ? _h.popup(e, 1e3, null, i.href, a.basename)
                : void 0
              : void (
                  a.url ||
                  ((a.is_dir || "download" !== _c.click) &&
                    (y(e, i) ||
                      (e.preventDefault(),
                      a.is_dir
                        ? (x(a.path, a), F.get_files(a.path, "push"))
                        : "menu" === _c.click
                        ? F.create_contextmenu(e, "files", i, a)
                        : "popup" === _c.click && a.is_popup && a.is_readable
                        ? F.open_popup(a)
                        : F.open_modal(a, !0))))
                );
        }
      }),
      (history.scrollRestoration = "manual");
  })(),
    (function () {
      var e = {
          list: {},
          imagelist: {},
          blocks: { contain: !0 },
          grid: { contain: !0, size: { default: 160, min: 80, max: 240 } },
          rows: { size: { default: 150, min: 80, max: 220 } },
          columns: { size: { default: 180, min: 120, max: 240 } },
        },
        t = Object.keys(e);
      t.includes(_c.layout) || (_c.layout = "rows"),
        W.files.className != "list files-" + _c.layout &&
          (W.files.className = "list files-" + _c.layout);
      var i =
          getComputedStyle(W.files)
            .getPropertyValue("--img-object-fit")
            .trim() || "cover",
        a = I.get("files:interface:img-object-fit") || i;
      function n() {
        W.files.style.setProperty("--imagelist-height", o ? "100px" : "100%"),
          W.files.style[(o ? "set" : "remove") + "Property"](
            "--imagelist-min-height",
            "auto"
          );
      }
      a != i && W.files.style.setProperty("--img-object-fit", a);
      var o = I.get("files:layout:imagelist-square");
      function l(i) {
        return { layout: i, ob: e[i], index: t.indexOf(i) };
      }
      null === o &&
        (o =
          "auto" !==
          getComputedStyle(W.files)
            .getPropertyValue("--imagelist-height")
            .trim()),
        n(),
        ["grid", "rows", "columns"].forEach(function (t) {
          var i,
            a = e[t].size,
            n = getComputedStyle(W.files).getPropertyValue("--" + t + "-size");
          n && (a.default = parseInt(n)),
            (a.current =
              !(i = I.get("files:layout:" + t + "-size")) ||
              isNaN(i) ||
              i == a.default
                ? a.default
                : ((i = R(a.min, a.max, i)),
                  W.files.style.setProperty("--" + t + "-size", i + "px"),
                  i)),
            (a.space = (function () {
              var e = I.get("files:layout:" + t + "-space-factor");
              return !e || isNaN(e) || 50 == e
                ? 50
                : ((e = R(0, 100, e)),
                  W.files.style.setProperty("--" + t + "-space-factor", e),
                  0 == e &&
                    W.files.style.setProperty("--" + t + "-border-radius", 0),
                  e);
            })());
        });
      var s = l(_c.layout);
      function r() {
        var e = s.ob;
        (v.style.display =
          "imagelist" === s.layout || e.size || e.contain ? "" : "none"),
          (g.style.display = e.size ? "" : "none"),
          (b.style.display = e.size ? "" : "none"),
          (L.style.display = e.contain ? "" : "none"),
          (k.style.display = "imagelist" === s.layout ? "" : "none"),
          e.size &&
            (e.size.min && (h.min = e.size.min),
            e.size.max && (h.max = e.size.max),
            e.size.default &&
              ((x.value = e.size.default),
              h.style.setProperty(
                "--range-default-pos",
                (e.size.default - e.size.min) / (e.size.max - e.size.min)
              )),
            K.set(_, s.layout),
            (h.value = e.size.current),
            K.set(y, s.layout),
            (C.value = e.size.space));
      }
      var c = _id("change-layout");
      c.innerHTML =
        '<button type="button" class="btn-icon btn-topbar">' +
        F.get_svg_icon("layout_" + s.layout) +
        '</button><div class="dropdown-menu dropdown-menu-topbar dropdown-menu-center"><h6 class="dropdown-header" data-lang="layout">' +
        K.get("layout") +
        "</h6><div>" +
        V(t, function (e) {
          return (
            '<button class="dropdown-item' +
            (e === s.layout ? " active" : "") +
            '" data-action="' +
            e +
            '">' +
            F.get_svg_icon("layout_" + e) +
            '<span class="dropdown-text" data-lang="' +
            e +
            '">' +
            K.get(e) +
            "<span></button>"
          );
        }) +
        '</div><div id="layout-options"><div id="layout-sizer"><label for="layout-sizer-range" class="form-label mb-0"><span data-lang="size">' +
        K.get("size") +
        '</span><span data-lang="' +
        s.layout +
        '" class="layout-label-type">' +
        K.get(s.layout) +
        '</span></label><input type="range" class="form-range" id="layout-sizer-range" value="200" min="100" max="300" list="layout-size-default"><datalist id="layout-size-default"><option value="200"></datalist></div><div id="layout-spacer"><label for="layout-spacer-range" class="form-label mb-0"><span data-lang="space">' +
        K.get("space") +
        '</span><span data-lang="' +
        s.layout +
        '" class="layout-label-type">' +
        K.get(s.layout) +
        '</span></label><input type="range" class="form-range" id="layout-spacer-range" value="50" min="0" max="100" list="layout-space-default"><datalist id="layout-space-default"><option value="50"></datalist></div><div id="cover-toggle"><div class="form-check"><input class="form-check-input" type="checkbox" id="covertoggle"' +
        ("cover" === a ? " checked" : "") +
        '><label class="form-check-label" for="covertoggle" data-lang="uniform">' +
        K.get("uniform") +
        '</label></div></div><div id="imagelist-square"><div class="form-check"><input class="form-check-input" type="checkbox" id="imagelistsquare"' +
        (o ? " checked" : "") +
        '><label class="form-check-label" for="imagelistsquare" data-lang="uniform">' +
        K.get("uniform") +
        "</label></div></div></div>";
      var p = c.firstElementChild,
        d = c.lastElementChild,
        u = d.children[1],
        f = u.children,
        v = d.children[2],
        g = v.firstElementChild,
        _ = g.firstElementChild.lastElementChild,
        h = g.children[1],
        x = g.children[2].lastElementChild,
        b = v.children[1],
        y = b.firstElementChild.lastElementChild,
        C = b.children[1],
        L = v.children[2],
        H = L.firstElementChild.firstElementChild,
        k = v.children[3],
        M = k.firstElementChild.firstElementChild;
      r();
      var z = B.is_pointer ? 200 : 100;
      function j(e) {
        s.layout !== e &&
          ((p.innerHTML = F.get_svg_icon("layout_" + e)),
          f[s.index].classList.remove("active"),
          (s = l(e)),
          f[s.index].classList.add("active"),
          r(),
          (W.files.className = "list files-" + e),
          (W.sortbar.className = "sortbar-" + e),
          F.set_config("layout", e));
      }
      w(
        h,
        function (e) {
          _c.files_count <= z &&
            W.files.style.setProperty(
              "--" + s.layout + "-size",
              h.value + "px"
            );
        },
        "input"
      ),
        w(
          h,
          function (e) {
            _c.files_count > z &&
              W.files.style.setProperty(
                "--" + s.layout + "-size",
                h.value + "px"
              ),
              (s.ob.size.current = h.value),
              I.set("files:layout:" + s.layout + "-size", h.value);
          },
          "change"
        ),
        w(
          C,
          function (e) {
            _c.files_count <= z &&
              W.files.style.setProperty(
                "--" + s.layout + "-space-factor",
                C.value
              );
          },
          "input"
        ),
        w(
          C,
          function (e) {
            var t = (s.ob.size.space = C.value);
            _c.files_count > z &&
              W.files.style.setProperty("--" + s.layout + "-space-factor", t),
              W.files.style[(t > 0 ? "remove" : "set") + "Property"](
                "--" + s.layout + "-border-radius",
                0
              ),
              I.set("files:layout:" + s.layout + "-space-factor", t);
          },
          "change"
        ),
        w(
          H,
          function () {
            (a = this.checked ? "cover" : "contain") == i
              ? (W.files.style.removeProperty("--img-object-fit"),
                I.remove("files:interface:img-object-fit"))
              : (W.files.style.setProperty("--img-object-fit", a),
                I.set("files:interface:img-object-fit", a));
          },
          "change"
        ),
        w(
          M,
          function () {
            (o = this.checked), n(), I.set("files:layout:imagelist-square", o);
          },
          "change"
        ),
        m(u, j),
        F.dropdown(c, p, function () {
          j(t[s.index >= t.length - 1 ? 0 : s.index + 1]);
        });
    })(),
    (function () {
      var e,
        t,
        i,
        n = (U.popup = {
          transitions: {
            glide: function (e) {
              return {
                translateX: [10 * e, 0],
                opacity: [0.1, 1],
                duration: 500,
                easing: "easeOutQuart",
              };
            },
            fade: function (e) {
              return {
                opacity: [0.1, 1],
                duration: 400,
                easing: "easeOutCubic",
              };
            },
            zoom: function (e) {
              return {
                scale: [1.05, 1],
                opacity: [0.1, 1],
                duration: 500,
                easing: "easeOutQuint",
              };
            },
            pop: function (e) {
              return {
                scale: {
                  value: [0.9, 1],
                  duration: 600,
                  easing: "easeOutElastic",
                },
                opacity: {
                  value: [0, 1],
                  duration: 400,
                  easing: "easeOutCubic",
                },
                duration: 600,
              };
            },
            elastic: function (e) {
              return {
                translateX: {
                  value: [50 * e, 0],
                  duration: 600,
                  easing: "easeOutElastic",
                },
                opacity: {
                  value: [0.1, 1],
                  duration: 500,
                  easing: "easeOutQuart",
                },
                duration: 600,
              };
            },
            wipe: function (e) {
              return {
                translateX: [10 * e, 0],
                opacity: [0.1, 1],
                clipPath: [
                  e > 0 ? "inset(0% 25% 0% 65%)" : "inset(0% 65% 0% 25%)",
                  "inset(0% 0% 0% 0%)",
                ],
                scale: [1.05, 1],
                duration: 500,
                easing: "easeOutQuint",
              };
            },
          },
          playing: !1,
          timer: !1,
        }),
        o = I.get("files:popup:locked_caption"),
        l = screen.width < 375 ? "ll" : screen.width < 414 ? "lll" : "llll",
        r = screen.width >= 576,
        c = {
          caption_hide: !0,
          caption_style: "block",
          caption_align: "center-left",
          click: "prev_next",
          downloadEl: !B.is_pointer,
          mapEl: !1,
          play_interval: 5e3, //!_c.hasOwnProperty('popup_interval') || isNaN(_c.popup_interval) ? 5000 : Math.max(_c.popup_interval, 1000),
          video_autoplay: !1,
          video_autoplay_clicked: !0,
          getDoubleTapZoom: function () {
            return n.toggle_play(!1), 1;
          },
          getThumbBoundsFn: function (t, i) {
            var a = e.items[t],
              n = U.modal.open
                ? U.modal.item === a.item && _class("modal-image", W.modal)[0]
                : a.img_el;
            if (!(a.w && a.h && a.msrc && n && n.offsetParent))
              return !!i && d(!0);
            var o = n.getBoundingClientRect();
            if (i) {
              if (o.bottom < 0 || o.top > window.innerHeight) return d(!0);
              d(!1);
            }
            var l = a.w / a.h,
              s = o.width / o.height,
              r = "cover" === getComputedStyle(n).objectFit ? l < s : l > s,
              c = r ? (n.clientWidth / l - n.clientHeight) / 2 : 0,
              p = r ? 0 : (n.clientHeight * l - n.clientWidth) / 2,
              m = n.offsetWidth - n.clientWidth,
              u = parseFloat(
                getComputedStyle(n).padding ||
                  getComputedStyle(n).paddingTop ||
                  0
              );
            return {
              x: o.left - p + m / 2 + u,
              y: o.top - c + window.pageYOffset + m / 2 + u,
              w: o.width + 2 * p - m - 2 * u,
            };
          },
          index: 0,
          addCaptionHTMLFn: function (e, i) {
            var o = e.item;
            if ("topbar" === c.caption_style)
              return (n.search.innerHTML = o.basename), !1;
            if (!W.filter.value) {
              if ("video" === e.type)
                return (n.search.innerHTML = o.basename), p(n.caption_center);
              p(n.search);
            }
            return (
              o.hasOwnProperty("popup_caption") ||
                (o.popup_caption =
                  g(B.PointerEvent, "popup-context") +
                  '<div class="popup-basename">' +
                  a(o.basename) +
                  "</div>" +
                  f(o.dimensions, "popup-dimensions") +
                  v(o, "popup-filesize") +
                  '<span class="popup-date">' +
                  F.get_time(o, l, "LLLL", r) +
                  "</span>" +
                  h(o.image, "popup-exif") +
                  _(o.image, "popup")),
              o.popup_caption
                ? (n.caption_transition_delay &&
                    ((n.caption.style.cssText = "transition: none; opacity: 0"),
                    t && clearTimeout(t),
                    (t = setTimeout(function () {
                      (n.caption.style.cssText =
                        "transition: opacity 333ms cubic-bezier(0.33, 1, 0.68, 1)"),
                        (t = setTimeout(function () {
                          n.caption.removeAttribute("style");
                        }, 333));
                    }, n.caption_transition_delay))),
                  (n.caption_center.innerHTML = o.popup_caption),
                  !0)
                : me.resetEl(n.caption_center)
            );
          },
        };
      function d(t) {
        t !== e.options.showHideOpacity &&
          ((e.options.showHideOpacity = t),
          me.toggle_class(n.pswp, "pswp--animate_opacity", t));
      }
      function m() {
        var t = e.currItem.container.firstElementChild;
        return !(!t || "VIDEO" != t.nodeName) && t;
      }
      function u() {
        var e = n.current_video;
        e &&
          e.currentTime > 0 &&
          !e.paused &&
          !e.ended &&
          e.readyState > 2 &&
          e.pause();
      }
      function b() {
        return (
          !e.options.loop &&
          e.getCurrentIndex() === e.options.getNumItemsFn() - 1
        );
      }
      function y() {
        n.pano_viewer && (n.pano_viewer.destroy(), (n.pano_viewer = !1));
      }
      _c.config &&
        _c.config.popup &&
        (Object.assign(c, _c.config.popup),
        c.play_transition || (c.play_transition = c.transition || "glide"),
        c.transitions && Object.assign(n.transitions, c.transitions)),
        (F.open_popup = function (t, o) {
          if (t && U.list.items.length && !n.is_open) {
            var l = { index: 0 };
            if (i === U.list.matchingItems) {
              for (var r = 0; r < n.slides.length; r++)
                if (n.slides[r].item === t) {
                  l.index = r;
                  break;
                }
            } else
              (i = U.list.matchingItems),
                (n.slides = []),
                i.forEach(function (e, i) {
                  var a = e._values;
                  if (a && a.is_readable && a.is_popup) {
                    var o = { pid: encodeURIComponent(a.basename), item: a };
                    if (J && a.is_pano)
                      Object.assign(o, {
                        type: "pano",
                        html:
                          '<div class="popup-pano-placeholder">' +
                          F.get_svg_icon("panorama_variant") +
                          "</div>",
                      });
                    else if (a.browser_image) {
                      var r = !!_c.load_images && e.elm.firstElementChild,
                        c = !B.image_orientation && O(a.image),
                        p = r && !c;
                      if (
                        (Object.assign(o, {
                          type: "image",
                          src: s(a),
                          w: a.image ? a.image.width : screen.availHeight,
                          h: a.image ? a.image.height : screen.availHeight,
                          img_el: r,
                          msrc: !(!p || !r.complete) && r.getAttribute("src"),
                        }),
                        c && ((o.w = a.image.height), (o.h = a.image.width)),
                        p &&
                          !o.msrc &&
                          (r.onload = function () {
                            o.msrc = this.getAttribute("src");
                          }),
                        "ico" === a.ext && o.w <= 16)
                      ) {
                        var d = 256 / o.w;
                        (o.w *= d), (o.h *= d);
                      }
                    } else
                      a.is_browser_video &&
                        Object.assign(o, {
                          type: "video",
                          html:
                            '<video class="popup-video" playsinline disablepictureinpicture controls controlsList="nodownload"><source src="' +
                            s(a) +
                            (B.only_touch ? "#t=0.001" : "") +
                            '" type="' +
                            a.mime +
                            '"></video>',
                        });
                    a === t && (l.index = n.slides.length), n.slides.push(o);
                  }
                });
            n.slides.length &&
              (Z(),
              document.documentElement.classList.add("popup-open"),
              (n.is_open = !0),
              (n.caption_transition_delay = 333),
              (n.container.style.cursor =
                n.slides.length > 1 ? "pointer" : "default"),
              "topbar" !== c.caption_style &&
                W.filter.value &&
                (n.search.innerHTML =
                  F.get_svg_icon("image_search_outline") +
                  '"' +
                  a(W.filter.value) +
                  '"'),
              n.slides.length < 3 && (l.playEl = !1),
              (e = new ue(
                n.pswp,
                de,
                n.slides,
                Object.assign({}, c, l, {
                  arrowEl:
                    n.slides.length > 1 &&
                    (!B.only_touch || _c.current_dir.has_pano),
                  arrowKeys: n.slides.length > 1,
                  counterEl: n.slides.length > 1,
                  showAnimationDuration: o ? 0 : 333,
                  showHideOpacity: !n.slides[l.index].msrc && !o,
                })
              )),
              B.is_touch &&
                e.listen("zoomGestureEnded", function () {
                  e.getZoomLevel() > e.currItem.initialZoomLevel &&
                    n.toggle_play(!1);
                }),
              e.listen("beforeChange", function () {
                u(), n.toggle_timer(!1);
              }),
              e.listen("afterChange", function () {
                var t = e.currItem.type;
                if (
                  (n.toggle_timer(!0),
                  ["video", "pano"].forEach((e) =>
                    n.ui.classList.toggle("popup-ui-" + e, t == e)
                  ),
                  (n.current_video = "video" === t && m()),
                  n.current_video && c.video_autoplay && n.current_video.play(),
                  (function (t) {
                    if (!!t == !!n.pano_viewer) return;
                    Object.assign(e.options, {
                      pinchToClose: !t,
                      closeOnScroll: !t,
                      closeOnVerticalDrag: !t,
                      arrowKeys: !t && n.slides.length > 1,
                    });
                  })("pano" == t),
                  y(),
                  "pano" == t)
                ) {
                  var i = e.currItem;
                  F.load_plugin("pannellum", () => {
                    i === e.currItem &&
                      (n.pano_viewer = pannellum.viewer(n.pano_container, {
                        type: "equirectangular",
                        panorama: i.item.is_pano,
                        autoLoad: !0,
                        autoRotate: n.pano_is_rotating ? -2 : 0,
                        autoRotateInactivityDelay: 3e3,
                        showControls: !1,
                        hfov: window.innerWidth > window.innerHeight ? 105 : 75,
                      }));
                  });
                }
              }),
              t.is_browser_video &&
                !c.video_autoplay &&
                c.video_autoplay_clicked &&
                e.listen("initialZoomInEnd", function () {
                  (n.current_video = m()),
                    n.current_video && n.current_video.play();
                }),
              e.listen("imageLoadComplete", function (t, i) {
                e.options.playEl &&
                  t === e.getCurrentIndex() &&
                  n.toggle_timer(!0);
              }),
              e.listen("close", function () {
                u(), (n.current_video = !1), n.toggle_play(!1);
              }),
              e.listen("destroy", function () {
                document.documentElement.classList.remove("popup-open"),
                  n.preloader.classList.remove("svg-preloader-active");
                for (var e = 0; e < n.items.length; e++) p(n.items[e]);
                y(), p(n.search), (n.is_open = !1);
              }),
              e.init());
          }
        }),
        (n.toggle_play = function (e) {
          e === n.playing ||
            (e && b()) ||
            ((n.playing = !!e),
            me.toggle_class(n.play_button, "is-playing", e),
            n.toggle_timer(e));
        }),
        (n.toggle_timer = function (t) {
          if (t && b()) return n.toggle_play(!1);
          if (
            (!t || (n.playing && (e.currItem.loaded || !e.currItem.src))) &&
            n.timer != t
          ) {
            (n.timer = !!t),
              t && (n.play_timer.style.opacity = 1),
              anime.remove(n.play_timer);
            var i = {
              targets: n.play_timer,
              duration: t ? e.options.play_interval : 333,
              easing: t ? "easeInOutCubic" : "easeOutQuad",
              scaleX: t ? [0, 1] : 0,
            };
            t
              ? ((i.begin = function () {
                  n.play_timer.style.display = "block";
                }),
                (i.complete = function () {
                  e.next(!0);
                }))
              : ((i.complete = function () {
                  n.play_timer.style.display = "none";
                }),
                (i.opacity = [1, 0])),
              anime(i);
          }
        }),
        (n.pano_is_rotating = !1 !== I.get("files:popup:pano:rotating")),
        document.body.insertAdjacentHTML(
          "beforeend",
          '\t\t<div class="pswp' +
            (B.is_touch ? " pswp--touch" : "") +
            (B.only_pointer ? " pswp--has_mouse" : "") +
            '" tabindex="-1" role="dialog" aria-hidden="true">\t    \t<div class="pswp__bg"></div>\t    \t<div class="pswp__scroll-wrap">\t    \t\t<div class="pswp__container' +
            (_c.server_exif ? " server-exif" : "") +
            '">\t\t        <div class="pswp__item"></div>\t\t        <div class="pswp__item"></div>\t\t        <div class="pswp__item"></div>\t        </div>\t        <div class="pswp__ui pswp__ui--hidden pswp__caption-align-' +
            c.caption_align +
            '">\t          <div class="pswp__top-bar">\t            <div class="pswp__counter"></div>\t            <div class="pswp__search"></div>\t            <div class="pswp__topbar-spacer"></div>\t            <svg viewBox="0 0 18 18" class="pswp__preloader svg-preloader"><circle cx="9" cy="9" r="8" pathLength="100" class="svg-preloader-circle"></svg>' +
            (c.downloadEl
              ? '<a type="button" class="pswp__button pswp__button--download"' +
                x(B.download ? "download" : "open in new tab") +
                ' target="_blank"' +
                (B.download ? " download" : "") +
                ">" +
                F.get_svg_icon(B.download ? "download" : "open_in_new") +
                "</a>"
              : g(!0, "pswp__button pswp__button--contextmenu")) +
            '\t\t\t\t\t\t\t<button class="pswp__button pswp__button--pano-rotate' +
            (n.pano_is_rotating ? " is-rotating" : "") +
            '">' +
            F.get_svg_icon_multi(
              "motion_play_outline",
              "motion_pause_outline"
            ) +
            "</button>" +
            (B.only_touch
              ? ""
              : '<button class="pswp__button pswp__button--zoom">' +
                F.get_svg_icon_multi("zoom_in", "zoom_out") +
                "</button>") +
            '\t            <button class="pswp__button pswp__button--play">' +
            F.get_svg_icon_multi("play", "pause") +
            "</button>\t            " +
            (B.fullscreen
              ? '<button class="pswp__button pswp__button--fs">' +
                F.get_svg_icon_multi("expand", "collapse") +
                "</button>"
              : "") +
            '\t            <button class="pswp__button pswp__button--close">' +
            F.get_svg_icon("close") +
            '</button>\t          </div>\t          <button class="pswp__button pswp__button--arrow--left">' +
            F.get_svg_icon("chevron_left") +
            '</button><button class="pswp__button pswp__button--arrow--right">' +
            F.get_svg_icon("chevron_right") +
            '</button>\t          <div class="pswp__timer"></div>\t          <div class="pswp__caption pswp__caption-style-' +
            c.caption_style +
            (c.caption_hide ? " pswp__caption-hide" : "") +
            (o ? " pswp__caption-locked" : "") +
            '">\t          \t' +
            (B.only_touch
              ? ""
              : '<button class="pswp__button pswp__button--lock-caption">' +
                F.get_svg_icon_multi("lock_outline", "lock_open_outline") +
                "</button>") +
            '\t          \t<div class="pswp__caption__center"></div>\t          </div>\t        </div>\t    \t</div>\t\t\t\t<div class="pswp__pano"></div>\t\t\t</div>'
        ),
        (n.pswp = document.body.lastElementChild),
        (n.bg = n.pswp.firstElementChild),
        (n.scrollwrap = n.pswp.children[1]),
        (n.pano_container = n.pswp.lastElementChild),
        (n.container = n.scrollwrap.firstElementChild),
        (n.items = n.container.children),
        (n.ui = n.scrollwrap.lastElementChild),
        (n.topbar = n.ui.firstElementChild),
        (n.caption = n.ui.lastElementChild),
        (n.caption_center = n.caption.lastElementChild),
        (n.play_timer = n.ui.children[3]),
        Array.from(n.topbar.children).forEach(function (e) {
          var t = e.classList;
          return t.contains("pswp__preloader")
            ? (n.preloader = e)
            : t.contains("pswp__button--play")
            ? (n.play_button = e)
            : t.contains("pswp__search")
            ? (n.search = e)
            : t.contains("pswp__button--contextmenu")
            ? (n.contextmenu_button = e)
            : t.contains("pswp__button--pano-rotate")
            ? (n.pano_rotate_button = e)
            : void 0;
        }),
        (n.toggle_pano_rotate = () => {
          if (n.pano_viewer) {
            if (
              ((n.pano_is_rotating = !n.pano_is_rotating),
              n.pano_viewer[
                (n.pano_is_rotating ? "start" : "stop") + "AutoRotate"
              ](),
              n.pano_is_rotating)
            ) {
              var e = n.pano_viewer.getConfig();
              (e.autoRotate = -2), (e.autoRotateInactivityDelay = 3e3);
            }
            I.set("files:popup:pano:rotating", !!n.pano_is_rotating),
              n.pano_rotate_button.classList.toggle(
                "is-rotating",
                n.pano_is_rotating
              );
          }
        }),
        n.caption.addEventListener("click", function (t) {
          return t.target.classList.contains("pswp__button--lock-caption")
            ? ((o = !o),
              me.toggle_class(n.caption, "pswp__caption-locked", o),
              I.set("files:popup:locked_caption", o, !0))
            : "context" == t.target.dataset.action
            ? F.create_contextmenu(t, "popup", t.target, e.currItem.item)
            : void (
                B.is_pointer &&
                0 === t.target.className.indexOf("pswp") &&
                ("right" === c.caption_align && t.pageX > this.clientWidth - 49
                  ? e.next()
                  : "left" === c.caption_align && t.pageX < 49 && e.prev())
              );
        }),
        B.is_pointer &&
          n.contextmenu_button &&
          w(n.contextmenu_button, function (t) {
            F.create_contextmenu(t, "popup", t.target, e.currItem.item);
          });
    })(),
    (function () {
      var e = document.body;
      function t(t) {
        (e.dataset.updated = t), (e.style.cursor = "pointer");
        var i = L(e, "click", function () {
          e.classList.remove("updated"),
            e.removeAttribute("data-updated"),
            e.style.removeProperty("cursor"),
            i.remove();
        });
      }
      _c.check_updates &&
        (I.get("files:updated")
          ? (I.remove("files:updated"),
            t("✓ Successfully updated to Files app version " + _c.version),
            e.classList.add("updated"))
          : T({
              json_response: !0,
              params: "action=check_updates",
              complete: function (i, a, n) {
                if (i && a && n && i.hasOwnProperty("success")) {
                  var o = i.success;
                  if (
                    (j(
                      o
                        ? "New version " + o + " available."
                        : "Already using latest version " + _c.version
                    ),
                    o)
                  ) {
                    _id("change-sort").insertAdjacentHTML(
                      "afterend",
                      '<div id="files-notifications" class="dropdown"><button type="button" class="btn-icon btn-topbar">' +
                        F.get_svg_icon("bell") +
                        '</button><div class="dropdown-menu dropdown-menu-topbar"><h6 class="dropdown-header">Files ' +
                        o +
                        "</h6>" +
                        (i.writeable
                          ? '<button class="dropdown-item">' +
                            F.get_svg_icon("rotate_right") +
                            '<span class="dropdown-text" data-lang="update">' +
                            K.get("update") +
                            "</span></button>"
                          : "") +
                        (B.download
                          ? '<a href="https://cdn.jsdelivr.net/npm/files.photo.gallery@' +
                            o +
                            '/index.php" class="dropdown-item" download>' +
                            F.get_svg_icon("download") +
                            '<span class="dropdown-text" data-lang="download">' +
                            K.get("download") +
                            "</span></a>"
                          : "") +
                        '<a href="https://files.photo.gallery/latest" class="dropdown-item" target="_blank">' +
                        F.get_svg_icon("info") +
                        '<span class="dropdown-text" data-lang="read more">' +
                        K.get("read more") +
                        "</span></a></div></div>"
                    );
                    var l = _id("files-notifications");
                    if ((F.dropdown(l, l.firstChild), !i.writeable)) return;
                    w(l.children[1].children[1], function () {
                      oe.fire("Update to Files app " + o + "?").then((i) => {
                        i.isConfirmed &&
                          (e.classList.add("updating"),
                          T({
                            params: "action=do_update&version=" + o,
                            json_response: !0,
                            complete: function (i, a, n) {
                              if (
                                (e.classList.add("updated"),
                                e.classList.remove("updating"),
                                i &&
                                  a &&
                                  n &&
                                  i.hasOwnProperty("success") &&
                                  i.success)
                              ) {
                                I.set("files:updated", !0);
                                try {
                                  (e.dataset.updated =
                                    "✓ Success! Reloading ..."),
                                    location.reload(!0);
                                } catch (t) {
                                  e.dataset.updated =
                                    "✓ Success! Please refresh ...";
                                }
                              } else t("✗ Failed to load update :(");
                            },
                          }));
                      });
                    });
                  }
                } else j("Failed to load external JSON check_updates.");
              },
            }));
    })(),
    (window.onpopstate = function (e) {
      _c.history &&
        e.state &&
        e.state.hasOwnProperty("path") &&
        F.get_files(e.state.path);
    });
  var pe = {
    123: "application/vnd.lotus-1-2-3",
    ez: "application/andrew-inset",
    aw: "application/applixware",
    atom: "application/atom+xml",
    atomcat: "application/atomcat+xml",
    atomdeleted: "application/atomdeleted+xml",
    atomsvc: "application/atomsvc+xml",
    dwd: "application/atsc-dwd+xml",
    held: "application/atsc-held+xml",
    rsat: "application/atsc-rsat+xml",
    bdoc: "application/x-bdoc",
    xcs: "application/calendar+xml",
    ccxml: "application/ccxml+xml",
    cdfx: "application/cdfx+xml",
    cdmia: "application/cdmi-capability",
    cdmic: "application/cdmi-container",
    cdmid: "application/cdmi-domain",
    cdmio: "application/cdmi-object",
    cdmiq: "application/cdmi-queue",
    cu: "application/cu-seeme",
    mpd: "application/dash+xml",
    davmount: "application/davmount+xml",
    dbk: "application/docbook+xml",
    dssc: "application/dssc+der",
    xdssc: "application/dssc+xml",
    ecma: "application/ecmascript",
    es: "application/ecmascript",
    emma: "application/emma+xml",
    emotionml: "application/emotionml+xml",
    epub: "application/epub+zip",
    exi: "application/exi",
    fdt: "application/fdt+xml",
    pfr: "application/font-tdpfr",
    geojson: "application/geo+json",
    gml: "application/gml+xml",
    gpx: "application/gpx+xml",
    gxf: "application/gxf",
    gz: "application/gzip",
    hjson: "application/hjson",
    stk: "application/hyperstudio",
    ink: "application/inkml+xml",
    inkml: "application/inkml+xml",
    ipfix: "application/ipfix",
    its: "application/its+xml",
    jar: "application/java-archive",
    war: "application/java-archive",
    ear: "application/java-archive",
    ser: "application/java-serialized-object",
    class: "application/java-vm",
    js: "application/javascript",
    mjs: "application/javascript",
    json: "application/json",
    map: "application/json",
    json5: "application/json5",
    jsonml: "application/jsonml+json",
    jsonld: "application/ld+json",
    lgr: "application/lgr+xml",
    lostxml: "application/lost+xml",
    hqx: "application/mac-binhex40",
    cpt: "application/mac-compactpro",
    mads: "application/mads+xml",
    webmanifest: "application/manifest+json",
    mrc: "application/marc",
    mrcx: "application/marcxml+xml",
    ma: "application/mathematica",
    nb: "application/mathematica",
    mb: "application/mathematica",
    mathml: "application/mathml+xml",
    mbox: "application/mbox",
    mscml: "application/mediaservercontrol+xml",
    metalink: "application/metalink+xml",
    meta4: "application/metalink4+xml",
    mets: "application/mets+xml",
    maei: "application/mmt-aei+xml",
    musd: "application/mmt-usd+xml",
    mods: "application/mods+xml",
    m21: "application/mp21",
    mp21: "application/mp21",
    mp4s: "application/mp4",
    m4p: "application/mp4",
    xdf: "application/xcap-diff+xml",
    doc: "application/msword",
    dot: "application/msword",
    mxf: "application/mxf",
    nq: "application/n-quads",
    nt: "application/n-triples",
    cjs: "application/node",
    bin: "application/octet-stream",
    dms: "application/octet-stream",
    lrf: "application/octet-stream",
    mar: "application/octet-stream",
    so: "application/octet-stream",
    dist: "application/octet-stream",
    distz: "application/octet-stream",
    pkg: "application/octet-stream",
    bpk: "application/octet-stream",
    dump: "application/octet-stream",
    elc: "application/octet-stream",
    deploy: "application/octet-stream",
    exe: "application/x-msdownload",
    dll: "application/x-msdownload",
    deb: "application/x-debian-package",
    dmg: "application/x-apple-diskimage",
    iso: "application/x-iso9660-image",
    img: "application/octet-stream",
    msi: "application/x-msdownload",
    msp: "application/octet-stream",
    msm: "application/octet-stream",
    buffer: "application/octet-stream",
    oda: "application/oda",
    opf: "application/oebps-package+xml",
    ogx: "application/ogg",
    omdoc: "application/omdoc+xml",
    onetoc: "application/onenote",
    onetoc2: "application/onenote",
    onetmp: "application/onenote",
    onepkg: "application/onenote",
    oxps: "application/oxps",
    relo: "application/p2p-overlay+xml",
    xer: "application/xcap-error+xml",
    pdf: "application/pdf",
    pgp: "application/pgp-encrypted",
    asc: "application/pgp-signature",
    sig: "application/pgp-signature",
    prf: "application/pics-rules",
    p10: "application/pkcs10",
    p7m: "application/pkcs7-mime",
    p7c: "application/pkcs7-mime",
    p7s: "application/pkcs7-signature",
    p8: "application/pkcs8",
    ac: "application/vnd.nokia.n-gage.ac+xml",
    cer: "application/pkix-cert",
    crl: "application/pkix-crl",
    pkipath: "application/pkix-pkipath",
    pki: "application/pkixcmp",
    pls: "application/pls+xml",
    ai: "application/postscript",
    eps: "application/postscript",
    ps: "application/postscript",
    provx: "application/provenance+xml",
    cww: "application/prs.cww",
    pskcxml: "application/pskc+xml",
    raml: "application/raml+yaml",
    rdf: "application/rdf+xml",
    owl: "application/rdf+xml",
    rif: "application/reginfo+xml",
    rnc: "application/relax-ng-compact-syntax",
    rl: "application/resource-lists+xml",
    rld: "application/resource-lists-diff+xml",
    rs: "application/rls-services+xml",
    rapd: "application/route-apd+xml",
    sls: "application/route-s-tsid+xml",
    rusd: "application/route-usd+xml",
    gbr: "application/rpki-ghostbusters",
    mft: "application/rpki-manifest",
    roa: "application/rpki-roa",
    rsd: "application/rsd+xml",
    rss: "application/rss+xml",
    rtf: "text/rtf",
    sbml: "application/sbml+xml",
    scq: "application/scvp-cv-request",
    scs: "application/scvp-cv-response",
    spq: "application/scvp-vp-request",
    spp: "application/scvp-vp-response",
    sdp: "application/sdp",
    senmlx: "application/senml+xml",
    sensmlx: "application/sensml+xml",
    setpay: "application/set-payment-initiation",
    setreg: "application/set-registration-initiation",
    shf: "application/shf+xml",
    siv: "application/sieve",
    sieve: "application/sieve",
    smi: "application/smil+xml",
    smil: "application/smil+xml",
    rq: "application/sparql-query",
    srx: "application/sparql-results+xml",
    gram: "application/srgs",
    grxml: "application/srgs+xml",
    sru: "application/sru+xml",
    ssdl: "application/ssdl+xml",
    ssml: "application/ssml+xml",
    swidtag: "application/swid+xml",
    tei: "application/tei+xml",
    teicorpus: "application/tei+xml",
    tfi: "application/thraud+xml",
    tsd: "application/timestamped-data",
    toml: "application/toml",
    ttml: "application/ttml+xml",
    rsheet: "application/urc-ressheet+xml",
    "1km": "application/vnd.1000minds.decision-model+xml",
    plb: "application/vnd.3gpp.pic-bw-large",
    psb: "application/vnd.3gpp.pic-bw-small",
    pvb: "application/vnd.3gpp.pic-bw-var",
    tcap: "application/vnd.3gpp2.tcap",
    pwn: "application/vnd.3m.post-it-notes",
    aso: "application/vnd.accpac.simply.aso",
    imp: "application/vnd.accpac.simply.imp",
    acu: "application/vnd.acucobol",
    atc: "application/vnd.acucorp",
    acutc: "application/vnd.acucorp",
    air: "application/vnd.adobe.air-application-installer-package+zip",
    fcdt: "application/vnd.adobe.formscentral.fcdt",
    fxp: "application/vnd.adobe.fxp",
    fxpl: "application/vnd.adobe.fxp",
    xdp: "application/vnd.adobe.xdp+xml",
    xfdf: "application/vnd.adobe.xfdf",
    ahead: "application/vnd.ahead.space",
    azf: "application/vnd.airzip.filesecure.azf",
    azs: "application/vnd.airzip.filesecure.azs",
    azw: "application/vnd.amazon.ebook",
    acc: "application/vnd.americandynamics.acc",
    ami: "application/vnd.amiga.ami",
    apk: "application/vnd.android.package-archive",
    cii: "application/vnd.anser-web-certificate-issue-initiation",
    fti: "application/vnd.anser-web-funds-transfer-initiation",
    atx: "application/vnd.antix.game-component",
    mpkg: "application/vnd.apple.installer+xml",
    keynote: "application/vnd.apple.keynote",
    m3u8: "application/vnd.apple.mpegurl",
    numbers: "application/vnd.apple.numbers",
    pages: "application/vnd.apple.pages",
    pkpass: "application/vnd.apple.pkpass",
    swi: "application/vnd.aristanetworks.swi",
    iota: "application/vnd.astraea-software.iota",
    aep: "application/vnd.audiograph",
    bmml: "application/vnd.balsamiq.bmml+xml",
    mpm: "application/vnd.blueice.multipass",
    bmi: "application/vnd.bmi",
    rep: "application/vnd.businessobjects",
    cdxml: "application/vnd.chemdraw+xml",
    mmd: "application/vnd.chipnuts.karaoke-mmd",
    cdy: "application/vnd.cinderella",
    csl: "application/vnd.citationstyles.style+xml",
    cla: "application/vnd.claymore",
    rp9: "application/vnd.cloanto.rp9",
    c4g: "application/vnd.clonk.c4group",
    c4d: "application/vnd.clonk.c4group",
    c4f: "application/vnd.clonk.c4group",
    c4p: "application/vnd.clonk.c4group",
    c4u: "application/vnd.clonk.c4group",
    c11amc: "application/vnd.cluetrust.cartomobile-config",
    c11amz: "application/vnd.cluetrust.cartomobile-config-pkg",
    csp: "application/vnd.commonspace",
    cdbcmsg: "application/vnd.contact.cmsg",
    cmc: "application/vnd.cosmocaller",
    clkx: "application/vnd.crick.clicker",
    clkk: "application/vnd.crick.clicker.keyboard",
    clkp: "application/vnd.crick.clicker.palette",
    clkt: "application/vnd.crick.clicker.template",
    clkw: "application/vnd.crick.clicker.wordbank",
    wbs: "application/vnd.criticaltools.wbs+xml",
    pml: "application/vnd.ctc-posml",
    ppd: "application/vnd.cups-ppd",
    car: "application/vnd.curl.car",
    pcurl: "application/vnd.curl.pcurl",
    dart: "application/vnd.dart",
    rdz: "application/vnd.data-vision.rdz",
    uvf: "application/vnd.dece.data",
    uvvf: "application/vnd.dece.data",
    uvd: "application/vnd.dece.data",
    uvvd: "application/vnd.dece.data",
    uvt: "application/vnd.dece.ttml+xml",
    uvvt: "application/vnd.dece.ttml+xml",
    uvx: "application/vnd.dece.unspecified",
    uvvx: "application/vnd.dece.unspecified",
    uvz: "application/vnd.dece.zip",
    uvvz: "application/vnd.dece.zip",
    fe_launch: "application/vnd.denovo.fcselayout-link",
    dna: "application/vnd.dna",
    mlp: "application/vnd.dolby.mlp",
    dpg: "application/vnd.dpgraph",
    dfac: "application/vnd.dreamfactory",
    kpxx: "application/vnd.ds-keypoint",
    ait: "application/vnd.dvb.ait",
    svc: "application/vnd.dvb.service",
    geo: "application/vnd.dynageo",
    mag: "application/vnd.ecowin.chart",
    nml: "application/vnd.enliven",
    esf: "application/vnd.epson.esf",
    msf: "application/vnd.epson.msf",
    qam: "application/vnd.epson.quickanime",
    slt: "application/vnd.epson.salt",
    ssf: "application/vnd.epson.ssf",
    es3: "application/vnd.eszigno3+xml",
    et3: "application/vnd.eszigno3+xml",
    ez2: "application/vnd.ezpix-album",
    ez3: "application/vnd.ezpix-package",
    fdf: "application/vnd.fdf",
    mseed: "application/vnd.fdsn.mseed",
    seed: "application/vnd.fdsn.seed",
    dataless: "application/vnd.fdsn.seed",
    gph: "application/vnd.flographit",
    ftc: "application/vnd.fluxtime.clip",
    fm: "application/vnd.framemaker",
    frame: "application/vnd.framemaker",
    maker: "application/vnd.framemaker",
    book: "application/vnd.framemaker",
    fnc: "application/vnd.frogans.fnc",
    ltf: "application/vnd.frogans.ltf",
    fsc: "application/vnd.fsc.weblaunch",
    oas: "application/vnd.fujitsu.oasys",
    oa2: "application/vnd.fujitsu.oasys2",
    oa3: "application/vnd.fujitsu.oasys3",
    fg5: "application/vnd.fujitsu.oasysgp",
    bh2: "application/vnd.fujitsu.oasysprs",
    ddd: "application/vnd.fujixerox.ddd",
    xdw: "application/vnd.fujixerox.docuworks",
    xbd: "application/vnd.fujixerox.docuworks.binder",
    fzs: "application/vnd.fuzzysheet",
    txd: "application/vnd.genomatix.tuxedo",
    ggb: "application/vnd.geogebra.file",
    ggt: "application/vnd.geogebra.tool",
    gex: "application/vnd.geometry-explorer",
    gre: "application/vnd.geometry-explorer",
    gxt: "application/vnd.geonext",
    g2w: "application/vnd.geoplan",
    g3w: "application/vnd.geospace",
    gmx: "application/vnd.gmx",
    gdoc: "application/vnd.google-apps.document",
    gslides: "application/vnd.google-apps.presentation",
    gsheet: "application/vnd.google-apps.spreadsheet",
    kml: "application/vnd.google-earth.kml+xml",
    kmz: "application/vnd.google-earth.kmz",
    gqf: "application/vnd.grafeq",
    gqs: "application/vnd.grafeq",
    gac: "application/vnd.groove-account",
    ghf: "application/vnd.groove-help",
    gim: "application/vnd.groove-identity-message",
    grv: "application/vnd.groove-injector",
    gtm: "application/vnd.groove-tool-message",
    tpl: "application/vnd.groove-tool-template",
    vcg: "application/vnd.groove-vcard",
    hal: "application/vnd.hal+xml",
    zmm: "application/vnd.handheld-entertainment+xml",
    hbci: "application/vnd.hbci",
    les: "application/vnd.hhe.lesson-player",
    hpgl: "application/vnd.hp-hpgl",
    hpid: "application/vnd.hp-hpid",
    hps: "application/vnd.hp-hps",
    jlt: "application/vnd.hp-jlyt",
    pcl: "application/vnd.hp-pcl",
    pclxl: "application/vnd.hp-pclxl",
    "sfd-hdstx": "application/vnd.hydrostatix.sof-data",
    mpy: "application/vnd.ibm.minipay",
    afp: "application/vnd.ibm.modcap",
    listafp: "application/vnd.ibm.modcap",
    list3820: "application/vnd.ibm.modcap",
    irm: "application/vnd.ibm.rights-management",
    sc: "application/vnd.ibm.secure-container",
    icc: "application/vnd.iccprofile",
    icm: "application/vnd.iccprofile",
    igl: "application/vnd.igloader",
    ivp: "application/vnd.immervision-ivp",
    ivu: "application/vnd.immervision-ivu",
    igm: "application/vnd.insors.igm",
    xpw: "application/vnd.intercon.formnet",
    xpx: "application/vnd.intercon.formnet",
    i2g: "application/vnd.intergeo",
    qbo: "application/vnd.intu.qbo",
    qfx: "application/vnd.intu.qfx",
    rcprofile: "application/vnd.ipunplugged.rcprofile",
    irp: "application/vnd.irepository.package+xml",
    xpr: "application/vnd.is-xpr",
    fcs: "application/vnd.isac.fcs",
    jam: "application/vnd.jam",
    rms: "application/vnd.jcp.javame.midlet-rms",
    jisp: "application/vnd.jisp",
    joda: "application/vnd.joost.joda-archive",
    ktz: "application/vnd.kahootz",
    ktr: "application/vnd.kahootz",
    karbon: "application/vnd.kde.karbon",
    chrt: "application/vnd.kde.kchart",
    kfo: "application/vnd.kde.kformula",
    flw: "application/vnd.kde.kivio",
    kon: "application/vnd.kde.kontour",
    kpr: "application/vnd.kde.kpresenter",
    kpt: "application/vnd.kde.kpresenter",
    ksp: "application/vnd.kde.kspread",
    kwd: "application/vnd.kde.kword",
    kwt: "application/vnd.kde.kword",
    htke: "application/vnd.kenameaapp",
    kia: "application/vnd.kidspiration",
    kne: "application/vnd.kinar",
    knp: "application/vnd.kinar",
    skp: "application/vnd.koan",
    skd: "application/vnd.koan",
    skt: "application/vnd.koan",
    skm: "application/vnd.koan",
    sse: "application/vnd.kodak-descriptor",
    lasxml: "application/vnd.las.las+xml",
    lbd: "application/vnd.llamagraphics.life-balance.desktop",
    lbe: "application/vnd.llamagraphics.life-balance.exchange+xml",
    apr: "application/vnd.lotus-approach",
    pre: "application/vnd.lotus-freelance",
    nsf: "application/vnd.lotus-notes",
    org: "text/x-org",
    scm: "application/vnd.lotus-screencam",
    lwp: "application/vnd.lotus-wordpro",
    portpkg: "application/vnd.macports.portpkg",
    mcd: "application/vnd.mcd",
    mc1: "application/vnd.medcalcdata",
    cdkey: "application/vnd.mediastation.cdkey",
    mwf: "application/vnd.mfer",
    mfm: "application/vnd.mfmp",
    flo: "application/vnd.micrografx.flo",
    igx: "application/vnd.micrografx.igx",
    mif: "application/vnd.mif",
    daf: "application/vnd.mobius.daf",
    dis: "application/vnd.mobius.dis",
    mbk: "application/vnd.mobius.mbk",
    mqy: "application/vnd.mobius.mqy",
    msl: "application/vnd.mobius.msl",
    plc: "application/vnd.mobius.plc",
    txf: "application/vnd.mobius.txf",
    mpn: "application/vnd.mophun.application",
    mpc: "application/vnd.mophun.certificate",
    xul: "application/vnd.mozilla.xul+xml",
    cil: "application/vnd.ms-artgalry",
    cab: "application/vnd.ms-cab-compressed",
    xls: "application/vnd.ms-excel",
    xlm: "application/vnd.ms-excel",
    xla: "application/vnd.ms-excel",
    xlc: "application/vnd.ms-excel",
    xlt: "application/vnd.ms-excel",
    xlw: "application/vnd.ms-excel",
    xlam: "application/vnd.ms-excel.addin.macroenabled.12",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
    xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
    xltm: "application/vnd.ms-excel.template.macroenabled.12",
    eot: "application/vnd.ms-fontobject",
    chm: "application/vnd.ms-htmlhelp",
    ims: "application/vnd.ms-ims",
    lrm: "application/vnd.ms-lrm",
    thmx: "application/vnd.ms-officetheme",
    msg: "application/vnd.ms-outlook",
    cat: "application/vnd.ms-pki.seccat",
    stl: "model/stl",
    ppt: "application/vnd.ms-powerpoint",
    pps: "application/vnd.ms-powerpoint",
    pot: "application/vnd.ms-powerpoint",
    ppam: "application/vnd.ms-powerpoint.addin.macroenabled.12",
    pptm: "application/vnd.ms-powerpoint.presentation.macroenabled.12",
    sldm: "application/vnd.ms-powerpoint.slide.macroenabled.12",
    ppsm: "application/vnd.ms-powerpoint.slideshow.macroenabled.12",
    potm: "application/vnd.ms-powerpoint.template.macroenabled.12",
    mpp: "application/vnd.ms-project",
    mpt: "application/vnd.ms-project",
    docm: "application/vnd.ms-word.document.macroenabled.12",
    dotm: "application/vnd.ms-word.template.macroenabled.12",
    wps: "application/vnd.ms-works",
    wks: "application/vnd.ms-works",
    wcm: "application/vnd.ms-works",
    wdb: "application/vnd.ms-works",
    wpl: "application/vnd.ms-wpl",
    xps: "application/vnd.ms-xpsdocument",
    mseq: "application/vnd.mseq",
    mus: "application/vnd.musician",
    msty: "application/vnd.muvee.style",
    taglet: "application/vnd.mynfc",
    nlu: "application/vnd.neurolanguage.nlu",
    ntf: "application/vnd.nitf",
    nitf: "application/vnd.nitf",
    nnd: "application/vnd.noblenet-directory",
    nns: "application/vnd.noblenet-sealer",
    nnw: "application/vnd.noblenet-web",
    ngdat: "application/vnd.nokia.n-gage.data",
    "n-gage": "application/vnd.nokia.n-gage.symbian.install",
    rpst: "application/vnd.nokia.radio-preset",
    rpss: "application/vnd.nokia.radio-presets",
    edm: "application/vnd.novadigm.edm",
    edx: "application/vnd.novadigm.edx",
    ext: "application/vnd.novadigm.ext",
    odc: "application/vnd.oasis.opendocument.chart",
    otc: "application/vnd.oasis.opendocument.chart-template",
    odb: "application/vnd.oasis.opendocument.database",
    odf: "application/vnd.oasis.opendocument.formula",
    odft: "application/vnd.oasis.opendocument.formula-template",
    odg: "application/vnd.oasis.opendocument.graphics",
    otg: "application/vnd.oasis.opendocument.graphics-template",
    odi: "application/vnd.oasis.opendocument.image",
    oti: "application/vnd.oasis.opendocument.image-template",
    odp: "application/vnd.oasis.opendocument.presentation",
    otp: "application/vnd.oasis.opendocument.presentation-template",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
    ots: "application/vnd.oasis.opendocument.spreadsheet-template",
    odt: "application/vnd.oasis.opendocument.text",
    odm: "application/vnd.oasis.opendocument.text-master",
    ott: "application/vnd.oasis.opendocument.text-template",
    oth: "application/vnd.oasis.opendocument.text-web",
    xo: "application/vnd.olpc-sugar",
    dd2: "application/vnd.oma.dd2+xml",
    obgx: "application/vnd.openblox.game+xml",
    oxt: "application/vnd.openofficeorg.extension",
    osm: "application/vnd.openstreetmap.data+xml",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    sldx: "application/vnd.openxmlformats-officedocument.presentationml.slide",
    ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    mgp: "application/vnd.osgeo.mapguide.package",
    dp: "application/vnd.osgi.dp",
    esa: "application/vnd.osgi.subsystem",
    pdb: "application/x-pilot",
    pqa: "application/vnd.palm",
    oprc: "application/vnd.palm",
    paw: "application/vnd.pawaafile",
    str: "application/vnd.pg.format",
    ei6: "application/vnd.pg.osasli",
    efif: "application/vnd.picsel",
    wg: "application/vnd.pmi.widget",
    plf: "application/vnd.pocketlearn",
    pbd: "application/vnd.powerbuilder6",
    box: "application/vnd.previewsystems.box",
    mgz: "application/vnd.proteus.magazine",
    qps: "application/vnd.publishare-delta-tree",
    ptid: "application/vnd.pvi.ptid1",
    qxd: "application/vnd.quark.quarkxpress",
    qxt: "application/vnd.quark.quarkxpress",
    qwd: "application/vnd.quark.quarkxpress",
    qwt: "application/vnd.quark.quarkxpress",
    qxl: "application/vnd.quark.quarkxpress",
    qxb: "application/vnd.quark.quarkxpress",
    bed: "application/vnd.realvnc.bed",
    mxl: "application/vnd.recordare.musicxml",
    musicxml: "application/vnd.recordare.musicxml+xml",
    cryptonote: "application/vnd.rig.cryptonote",
    cod: "application/vnd.rim.cod",
    rm: "application/vnd.rn-realmedia",
    rmvb: "application/vnd.rn-realmedia-vbr",
    link66: "application/vnd.route66.link66+xml",
    st: "application/vnd.sailingtracker.track",
    see: "application/vnd.seemail",
    sema: "application/vnd.sema",
    semd: "application/vnd.semd",
    semf: "application/vnd.semf",
    ifm: "application/vnd.shana.informed.formdata",
    itp: "application/vnd.shana.informed.formtemplate",
    iif: "application/vnd.shana.informed.interchange",
    ipk: "application/vnd.shana.informed.package",
    twd: "application/vnd.simtech-mindmapper",
    twds: "application/vnd.simtech-mindmapper",
    mmf: "application/vnd.smaf",
    teacher: "application/vnd.smart.teacher",
    fo: "application/vnd.software602.filler.form+xml",
    sdkm: "application/vnd.solent.sdkm+xml",
    sdkd: "application/vnd.solent.sdkm+xml",
    dxp: "application/vnd.spotfire.dxp",
    sfs: "application/vnd.spotfire.sfs",
    sdc: "application/vnd.stardivision.calc",
    sda: "application/vnd.stardivision.draw",
    sdd: "application/vnd.stardivision.impress",
    smf: "application/vnd.stardivision.math",
    sdw: "application/vnd.stardivision.writer",
    vor: "application/vnd.stardivision.writer",
    sgl: "application/vnd.stardivision.writer-global",
    smzip: "application/vnd.stepmania.package",
    sm: "application/vnd.stepmania.stepchart",
    wadl: "application/vnd.sun.wadl+xml",
    sxc: "application/vnd.sun.xml.calc",
    stc: "application/vnd.sun.xml.calc.template",
    sxd: "application/vnd.sun.xml.draw",
    std: "application/vnd.sun.xml.draw.template",
    sxi: "application/vnd.sun.xml.impress",
    sti: "application/vnd.sun.xml.impress.template",
    sxm: "application/vnd.sun.xml.math",
    sxw: "application/vnd.sun.xml.writer",
    sxg: "application/vnd.sun.xml.writer.global",
    stw: "application/vnd.sun.xml.writer.template",
    sus: "application/vnd.sus-calendar",
    susp: "application/vnd.sus-calendar",
    svd: "application/vnd.svd",
    sis: "application/vnd.symbian.install",
    sisx: "application/vnd.symbian.install",
    xsm: "application/vnd.syncml+xml",
    bdm: "application/vnd.syncml.dm+wbxml",
    xdm: "application/vnd.syncml.dm+xml",
    ddf: "application/vnd.syncml.dmddf+xml",
    tao: "application/vnd.tao.intent-module-archive",
    pcap: "application/vnd.tcpdump.pcap",
    cap: "application/vnd.tcpdump.pcap",
    dmp: "application/vnd.tcpdump.pcap",
    tmo: "application/vnd.tmobile-livetv",
    tpt: "application/vnd.trid.tpt",
    mxs: "application/vnd.triscape.mxs",
    tra: "application/vnd.trueapp",
    ufd: "application/vnd.ufdl",
    ufdl: "application/vnd.ufdl",
    utz: "application/vnd.uiq.theme",
    umj: "application/vnd.umajin",
    unityweb: "application/vnd.unity",
    uoml: "application/vnd.uoml+xml",
    vcx: "application/vnd.vcx",
    vsd: "application/vnd.visio",
    vst: "application/vnd.visio",
    vss: "application/vnd.visio",
    vsw: "application/vnd.visio",
    vis: "application/vnd.visionary",
    vsf: "application/vnd.vsf",
    wbxml: "application/vnd.wap.wbxml",
    wmlc: "application/vnd.wap.wmlc",
    wmlsc: "application/vnd.wap.wmlscriptc",
    wtb: "application/vnd.webturbo",
    nbp: "application/vnd.wolfram.player",
    wpd: "application/vnd.wordperfect",
    wqd: "application/vnd.wqd",
    stf: "application/vnd.wt.stf",
    xar: "application/vnd.xara",
    xfdl: "application/vnd.xfdl",
    hvd: "application/vnd.yamaha.hv-dic",
    hvs: "application/vnd.yamaha.hv-script",
    hvp: "application/vnd.yamaha.hv-voice",
    osf: "application/vnd.yamaha.openscoreformat",
    osfpvg: "application/vnd.yamaha.openscoreformat.osfpvg+xml",
    saf: "application/vnd.yamaha.smaf-audio",
    spf: "application/vnd.yamaha.smaf-phrase",
    cmp: "application/vnd.yellowriver-custom-menu",
    zir: "application/vnd.zul",
    zirz: "application/vnd.zul",
    zaz: "application/vnd.zzazz.deck+xml",
    vxml: "application/voicexml+xml",
    wasm: "application/wasm",
    wgt: "application/widget",
    hlp: "application/winhlp",
    wsdl: "application/wsdl+xml",
    wspolicy: "application/wspolicy+xml",
    "7z": "application/x-7z-compressed",
    abw: "application/x-abiword",
    ace: "application/x-ace-compressed",
    arj: "application/x-arj",
    aab: "application/x-authorware-bin",
    x32: "application/x-authorware-bin",
    u32: "application/x-authorware-bin",
    vox: "application/x-authorware-bin",
    aam: "application/x-authorware-map",
    aas: "application/x-authorware-seg",
    bcpio: "application/x-bcpio",
    torrent: "application/x-bittorrent",
    blb: "application/x-blorb",
    blorb: "application/x-blorb",
    bz: "application/x-bzip",
    bz2: "application/x-bzip2",
    boz: "application/x-bzip2",
    cbr: "application/x-cbr",
    cba: "application/x-cbr",
    cbt: "application/x-cbr",
    cbz: "application/x-cbr",
    cb7: "application/x-cbr",
    vcd: "application/x-cdlink",
    cfs: "application/x-cfs-compressed",
    chat: "application/x-chat",
    pgn: "application/x-chess-pgn",
    crx: "application/x-chrome-extension",
    cco: "application/x-cocoa",
    nsc: "application/x-conference",
    cpio: "application/x-cpio",
    csh: "application/x-csh",
    udeb: "application/x-debian-package",
    dgc: "application/x-dgc-compressed",
    dir: "application/x-director",
    dcr: "application/x-director",
    dxr: "application/x-director",
    cst: "application/x-director",
    cct: "application/x-director",
    cxt: "application/x-director",
    w3d: "application/x-director",
    fgd: "application/x-director",
    swa: "application/x-director",
    wad: "application/x-doom",
    ncx: "application/x-dtbncx+xml",
    dtb: "application/x-dtbook+xml",
    res: "application/x-dtbresource+xml",
    dvi: "application/x-dvi",
    evy: "application/x-envoy",
    eva: "application/x-eva",
    bdf: "application/x-font-bdf",
    gsf: "application/x-font-ghostscript",
    psf: "application/x-font-linux-psf",
    pcf: "application/x-font-pcf",
    snf: "application/x-font-snf",
    pfa: "application/x-font-type1",
    pfb: "application/x-font-type1",
    pfm: "application/x-font-type1",
    afm: "application/x-font-type1",
    arc: "application/x-freearc",
    spl: "application/x-futuresplash",
    gca: "application/x-gca-compressed",
    ulx: "application/x-glulx",
    gnumeric: "application/x-gnumeric",
    gramps: "application/x-gramps-xml",
    gtar: "application/x-gtar",
    hdf: "application/x-hdf",
    php: "application/x-httpd-php",
    install: "application/x-install-instructions",
    jardiff: "application/x-java-archive-diff",
    jnlp: "application/x-java-jnlp-file",
    kdbx: "application/x-keepass2",
    latex: "application/x-latex",
    luac: "application/x-lua-bytecode",
    lzh: "application/x-lzh-compressed",
    lha: "application/x-lzh-compressed",
    run: "application/x-makeself",
    mie: "application/x-mie",
    prc: "application/x-pilot",
    mobi: "application/x-mobipocket-ebook",
    application: "application/x-ms-application",
    lnk: "application/x-ms-shortcut",
    wmd: "application/x-ms-wmd",
    wmz: "application/x-msmetafile",
    xbap: "application/x-ms-xbap",
    mdb: "application/x-msaccess",
    obd: "application/x-msbinder",
    crd: "application/x-mscardfile",
    clp: "application/x-msclip",
    com: "application/x-msdownload",
    bat: "application/x-msdownload",
    mvb: "application/x-msmediaview",
    m13: "application/x-msmediaview",
    m14: "application/x-msmediaview",
    wmf: "image/wmf",
    emf: "image/emf",
    emz: "application/x-msmetafile",
    mny: "application/x-msmoney",
    pub: "application/x-mspublisher",
    scd: "application/x-msschedule",
    trm: "application/x-msterminal",
    wri: "application/x-mswrite",
    nc: "application/x-netcdf",
    cdf: "application/x-netcdf",
    pac: "application/x-ns-proxy-autoconfig",
    nzb: "application/x-nzb",
    pl: "application/x-perl",
    pm: "application/x-perl",
    p12: "application/x-pkcs12",
    pfx: "application/x-pkcs12",
    p7b: "application/x-pkcs7-certificates",
    spc: "application/x-pkcs7-certificates",
    p7r: "application/x-pkcs7-certreqresp",
    rar: "application/x-rar-compressed",
    rpm: "application/x-redhat-package-manager",
    ris: "application/x-research-info-systems",
    sea: "application/x-sea",
    sh: "application/x-sh",
    shar: "application/x-shar",
    swf: "application/x-shockwave-flash",
    xap: "application/x-silverlight-app",
    sql: "application/x-sql",
    sit: "application/x-stuffit",
    sitx: "application/x-stuffitx",
    srt: "application/x-subrip",
    sv4cpio: "application/x-sv4cpio",
    sv4crc: "application/x-sv4crc",
    t3: "application/x-t3vm-image",
    gam: "application/x-tads",
    tar: "application/x-tar",
    tcl: "application/x-tcl",
    tk: "application/x-tcl",
    tex: "application/x-tex",
    tfm: "application/x-tex-tfm",
    texinfo: "application/x-texinfo",
    texi: "application/x-texinfo",
    obj: "model/obj",
    ustar: "application/x-ustar",
    hdd: "application/x-virtualbox-hdd",
    ova: "application/x-virtualbox-ova",
    ovf: "application/x-virtualbox-ovf",
    vbox: "application/x-virtualbox-vbox",
    "vbox-extpack": "application/x-virtualbox-vbox-extpack",
    vdi: "application/x-virtualbox-vdi",
    vhd: "application/x-virtualbox-vhd",
    vmdk: "application/x-virtualbox-vmdk",
    src: "application/x-wais-source",
    webapp: "application/x-web-app-manifest+json",
    der: "application/x-x509-ca-cert",
    crt: "application/x-x509-ca-cert",
    pem: "application/x-x509-ca-cert",
    fig: "application/x-xfig",
    xlf: "application/xliff+xml",
    xpi: "application/x-xpinstall",
    xz: "application/x-xz",
    z1: "application/x-zmachine",
    z2: "application/x-zmachine",
    z3: "application/x-zmachine",
    z4: "application/x-zmachine",
    z5: "application/x-zmachine",
    z6: "application/x-zmachine",
    z7: "application/x-zmachine",
    z8: "application/x-zmachine",
    xaml: "application/xaml+xml",
    xav: "application/xcap-att+xml",
    xca: "application/xcap-caps+xml",
    xel: "application/xcap-el+xml",
    xns: "application/xcap-ns+xml",
    xenc: "application/xenc+xml",
    xhtml: "application/xhtml+xml",
    xht: "application/xhtml+xml",
    xml: "text/xml",
    xsl: "application/xml",
    xsd: "application/xml",
    rng: "application/xml",
    dtd: "application/xml-dtd",
    xop: "application/xop+xml",
    xpl: "application/xproc+xml",
    xslt: "application/xslt+xml",
    xspf: "application/xspf+xml",
    mxml: "application/xv+xml",
    xhvml: "application/xv+xml",
    xvml: "application/xv+xml",
    xvm: "application/xv+xml",
    yang: "application/yang",
    yin: "application/yin+xml",
    zip: "application/zip",
    "3gpp": "video/3gpp",
    adp: "audio/adpcm",
    au: "audio/basic",
    snd: "audio/basic",
    mid: "audio/midi",
    midi: "audio/midi",
    kar: "audio/midi",
    rmi: "audio/midi",
    mxmf: "audio/mobile-xmf",
    mp3: "audio/mpeg",
    m4a: "audio/x-m4a",
    mp4a: "audio/mp4",
    mpga: "audio/mpeg",
    mp2: "audio/mpeg",
    mp2a: "audio/mpeg",
    m2a: "audio/mpeg",
    m3a: "audio/mpeg",
    oga: "audio/ogg",
    ogg: "audio/ogg",
    spx: "audio/ogg",
    s3m: "audio/s3m",
    sil: "audio/silk",
    uva: "audio/vnd.dece.audio",
    uvva: "audio/vnd.dece.audio",
    eol: "audio/vnd.digital-winds",
    dra: "audio/vnd.dra",
    dts: "audio/vnd.dts",
    dtshd: "audio/vnd.dts.hd",
    lvp: "audio/vnd.lucent.voice",
    pya: "audio/vnd.ms-playready.media.pya",
    ecelp4800: "audio/vnd.nuera.ecelp4800",
    ecelp7470: "audio/vnd.nuera.ecelp7470",
    ecelp9600: "audio/vnd.nuera.ecelp9600",
    rip: "audio/vnd.rip",
    wav: "audio/x-wav",
    weba: "audio/webm",
    aac: "audio/x-aac",
    aif: "audio/x-aiff",
    aiff: "audio/x-aiff",
    aifc: "audio/x-aiff",
    caf: "audio/x-caf",
    flac: "audio/flac",
    mka: "audio/x-matroska",
    m3u: "audio/x-mpegurl",
    wax: "audio/x-ms-wax",
    wma: "audio/x-ms-wma",
    ram: "audio/x-pn-realaudio",
    ra: "audio/x-realaudio",
    rmp: "audio/x-pn-realaudio-plugin",
    xm: "audio/xm",
    cdx: "chemical/x-cdx",
    cif: "chemical/x-cif",
    cmdf: "chemical/x-cmdf",
    cml: "chemical/x-cml",
    csml: "chemical/x-csml",
    xyz: "chemical/x-xyz",
    ttc: "font/collection",
    otf: "font/otf",
    ttf: "font/ttf",
    woff: "font/woff",
    woff2: "font/woff2",
    exr: "image/aces",
    apng: "image/apng",
    bmp: "image/x-ms-bmp",
    cgm: "image/cgm",
    drle: "image/dicom-rle",
    fits: "image/fits",
    g3: "image/g3fax",
    gif: "image/gif",
    heic: "image/heic",
    heics: "image/heic-sequence",
    heif: "image/heif",
    heifs: "image/heif-sequence",
    hej2: "image/hej2k",
    hsj2: "image/hsj2",
    ief: "image/ief",
    jls: "image/jls",
    jp2: "image/jp2",
    jpg2: "image/jp2",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    jpe: "image/jpeg",
    jph: "image/jph",
    jhc: "image/jphc",
    jpm: "video/jpm",
    jpx: "image/jpx",
    jpf: "image/jpx",
    jxr: "image/jxr",
    jxra: "image/jxra",
    jxrs: "image/jxrs",
    jxs: "image/jxs",
    jxsc: "image/jxsc",
    jxsi: "image/jxsi",
    jxss: "image/jxss",
    ktx: "image/ktx",
    png: "image/png",
    btif: "image/prs.btif",
    pti: "image/prs.pti",
    sgi: "image/sgi",
    svg: "image/svg+xml",
    svgz: "image/svg+xml",
    t38: "image/t38",
    tif: "image/tiff",
    tiff: "image/tiff",
    tfx: "image/tiff-fx",
    psd: "image/vnd.adobe.photoshop",
    azv: "image/vnd.airzip.accelerator.azv",
    uvi: "image/vnd.dece.graphic",
    uvvi: "image/vnd.dece.graphic",
    uvg: "image/vnd.dece.graphic",
    uvvg: "image/vnd.dece.graphic",
    djvu: "image/vnd.djvu",
    djv: "image/vnd.djvu",
    sub: "text/vnd.dvb.subtitle",
    dwg: "image/vnd.dwg",
    dxf: "image/vnd.dxf",
    fbs: "image/vnd.fastbidsheet",
    fpx: "image/vnd.fpx",
    fst: "image/vnd.fst",
    mmr: "image/vnd.fujixerox.edmics-mmr",
    rlc: "image/vnd.fujixerox.edmics-rlc",
    ico: "image/x-icon",
    dds: "image/vnd.ms-dds",
    mdi: "image/vnd.ms-modi",
    wdp: "image/vnd.ms-photo",
    npx: "image/vnd.net-fpx",
    tap: "image/vnd.tencent.tap",
    vtf: "image/vnd.valve.source.texture",
    wbmp: "image/vnd.wap.wbmp",
    xif: "image/vnd.xiff",
    pcx: "image/x-pcx",
    webp: "image/webp",
    "3ds": "image/x-3ds",
    ras: "image/x-cmu-raster",
    cmx: "image/x-cmx",
    fh: "image/x-freehand",
    fhc: "image/x-freehand",
    fh4: "image/x-freehand",
    fh5: "image/x-freehand",
    fh7: "image/x-freehand",
    jng: "image/x-jng",
    sid: "image/x-mrsid-image",
    pic: "image/x-pict",
    pct: "image/x-pict",
    pnm: "image/x-portable-anymap",
    pbm: "image/x-portable-bitmap",
    pgm: "image/x-portable-graymap",
    ppm: "image/x-portable-pixmap",
    rgb: "image/x-rgb",
    tga: "image/x-tga",
    xbm: "image/x-xbitmap",
    xpm: "image/x-xpixmap",
    xwd: "image/x-xwindowdump",
    "disposition-notification": "message/disposition-notification",
    u8msg: "message/global",
    u8dsn: "message/global-delivery-status",
    u8mdn: "message/global-disposition-notification",
    u8hdr: "message/global-headers",
    eml: "message/rfc822",
    mime: "message/rfc822",
    wsc: "message/vnd.wfa.wsc",
    "3mf": "model/3mf",
    gltf: "model/gltf+json",
    glb: "model/gltf-binary",
    igs: "model/iges",
    iges: "model/iges",
    msh: "model/mesh",
    mesh: "model/mesh",
    silo: "model/mesh",
    mtl: "model/mtl",
    dae: "model/vnd.collada+xml",
    dwf: "model/vnd.dwf",
    gdl: "model/vnd.gdl",
    gtw: "model/vnd.gtw",
    mts: "model/vnd.mts",
    ogex: "model/vnd.opengex",
    x_b: "model/vnd.parasolid.transmit.binary",
    x_t: "model/vnd.parasolid.transmit.text",
    usdz: "model/vnd.usdz+zip",
    bsp: "model/vnd.valve.source.compiled-map",
    vtu: "model/vnd.vtu",
    wrl: "model/vrml",
    vrml: "model/vrml",
    x3db: "model/x3d+fastinfoset",
    x3dbz: "model/x3d+binary",
    x3dv: "model/x3d-vrml",
    x3dvz: "model/x3d+vrml",
    x3d: "model/x3d+xml",
    x3dz: "model/x3d+xml",
    appcache: "text/cache-manifest",
    manifest: "text/cache-manifest",
    ics: "text/calendar",
    ifb: "text/calendar",
    coffee: "text/coffeescript",
    litcoffee: "text/coffeescript",
    css: "text/css",
    csv: "text/csv",
    html: "text/html",
    htm: "text/html",
    shtml: "text/html",
    jade: "text/jade",
    jsx: "text/jsx",
    less: "text/less",
    markdown: "text/markdown",
    md: "text/markdown",
    mml: "text/mathml",
    mdx: "text/mdx",
    n3: "text/n3",
    txt: "text/plain",
    text: "text/plain",
    conf: "text/plain",
    def: "text/plain",
    list: "text/plain",
    log: "text/plain",
    in: "text/plain",
    ini: "text/plain",
    url: "text/plain",
    dsc: "text/prs.lines.tag",
    rtx: "text/richtext",
    sgml: "text/sgml",
    sgm: "text/sgml",
    shex: "text/shex",
    slim: "text/slim",
    slm: "text/slim",
    stylus: "text/stylus",
    styl: "text/stylus",
    tsv: "text/tab-separated-values",
    t: "text/troff",
    tr: "text/troff",
    roff: "text/troff",
    man: "text/troff",
    me: "text/troff",
    ms: "text/troff",
    ttl: "text/turtle",
    uri: "text/uri-list",
    uris: "text/uri-list",
    urls: "text/uri-list",
    vcard: "text/vcard",
    curl: "text/vnd.curl",
    dcurl: "text/vnd.curl.dcurl",
    mcurl: "text/vnd.curl.mcurl",
    scurl: "text/vnd.curl.scurl",
    fly: "text/vnd.fly",
    flx: "text/vnd.fmi.flexstor",
    gv: "text/vnd.graphviz",
    "3dml": "text/vnd.in3d.3dml",
    spot: "text/vnd.in3d.spot",
    jad: "text/vnd.sun.j2me.app-descriptor",
    wml: "text/vnd.wap.wml",
    wmls: "text/vnd.wap.wmlscript",
    vtt: "text/vtt",
    s: "text/x-asm",
    asm: "text/x-asm",
    c: "text/x-c",
    cc: "text/x-c",
    cxx: "text/x-c",
    cpp: "text/x-c",
    h: "text/x-c",
    hh: "text/x-c",
    dic: "text/x-c",
    htc: "text/x-component",
    f: "text/x-fortran",
    for: "text/x-fortran",
    f77: "text/x-fortran",
    f90: "text/x-fortran",
    hbs: "text/x-handlebars-template",
    java: "text/x-java-source",
    lua: "text/x-lua",
    mkd: "text/x-markdown",
    nfo: "text/x-nfo",
    opml: "text/x-opml",
    p: "text/x-pascal",
    pas: "text/x-pascal",
    pde: "text/x-processing",
    sass: "text/x-sass",
    scss: "text/x-scss",
    etx: "text/x-setext",
    sfv: "text/x-sfv",
    ymp: "text/x-suse-ymp",
    uu: "text/x-uuencode",
    vcs: "text/x-vcalendar",
    vcf: "text/x-vcard",
    yaml: "text/yaml",
    yml: "text/yaml",
    "3gp": "video/3gpp",
    "3g2": "video/3gpp2",
    h261: "video/h261",
    h263: "video/h263",
    h264: "video/h264",
    jpgv: "video/jpeg",
    jpgm: "video/jpm",
    mj2: "video/mj2",
    mjp2: "video/mj2",
    ts: "video/mp2t",
    mp4: "video/mp4",
    mp4v: "video/mp4",
    mpg4: "video/mp4",
    mpeg: "video/mpeg",
    mpg: "video/mpeg",
    mpe: "video/mpeg",
    m1v: "video/mpeg",
    m2v: "video/mpeg",
    ogv: "video/ogg",
    qt: "video/quicktime",
    mov: "video/quicktime",
    uvh: "video/vnd.dece.hd",
    uvvh: "video/vnd.dece.hd",
    uvm: "video/vnd.dece.mobile",
    uvvm: "video/vnd.dece.mobile",
    uvp: "video/vnd.dece.pd",
    uvvp: "video/vnd.dece.pd",
    uvs: "video/vnd.dece.sd",
    uvvs: "video/vnd.dece.sd",
    uvv: "video/vnd.dece.video",
    uvvv: "video/vnd.dece.video",
    dvb: "video/vnd.dvb.file",
    fvt: "video/vnd.fvt",
    mxu: "video/vnd.mpegurl",
    m4u: "video/vnd.mpegurl",
    pyv: "video/vnd.ms-playready.media.pyv",
    uvu: "video/vnd.uvvu.mp4",
    uvvu: "video/vnd.uvvu.mp4",
    viv: "video/vnd.vivo",
    webm: "video/webm",
    f4v: "video/x-f4v",
    fli: "video/x-fli",
    flv: "video/x-flv",
    m4v: "video/x-m4v",
    mkv: "video/x-matroska",
    mk3d: "video/x-matroska",
    mks: "video/x-matroska",
    mng: "video/x-mng",
    asf: "video/x-ms-asf",
    asx: "video/x-ms-asf",
    vob: "video/x-ms-vob",
    wm: "video/x-ms-wm",
    wmv: "video/x-ms-wmv",
    wmx: "video/x-ms-wmx",
    wvx: "video/x-ms-wvx",
    avi: "video/x-msvideo",
    movie: "video/x-sgi-movie",
    smv: "video/x-smv",
    ice: "x-conference/x-cooltalk",
  };
  !(function () {
    var e = {};
    W.modal.innerHTML =
      '<div class="modal-dialog" role="document">\t  <div class="modal-content">\t    <div class="modal-header">\t      <h5 class="modal-title"></h5>\t      <div class="modal-buttons">\t      \t<div class="modal-code-buttons" style="display: none">' +
      (_c.allow_text_edit
        ? '<button type="button" class="btn btn-1 is-icon" data-action="save" data-tooltip="' +
          K.get("save") +
          '" data-lang="save">' +
          F.get_svg_icon("save_edit") +
          "</button>"
        : "") +
      '<button type="button" class="btn ' +
      'btn-1 is-icon" data-action="copy" data-tooltip="' +
      K.get("copy text") +
      '" data-lang="copy text">' +
      F.get_svg_icon("clipboard") +
      '</button><button type="button" class="btn ' +
      'btn-1 is-icon" data-action="fullscreen">' +
      F.get_svg_icon_multi("expand", "collapse") +
      '</button></div><button class="btn btn-1 is-icon" data-action="close"' +
      x("close") +
      ">" +
      F.get_svg_icon("close") +
      '</button>\t      </div>\t    </div>\t    <div class="modal-body"></div>\t  </div>\t</div>';
    var t = W.modal.children[0],
      i = t.children[0],
      n = i.children[0],
      o = n.children[0],
      l = n.children[1].children[0],
      c = (l.lastElementChild, !!_c.allow_text_edit && l.children[0]),
      u = i.children[1];
    U.modal = {};
    var w = C(function () {
      U.modal.code_mirror && U.modal.code_mirror.refresh();
    }, 500);
    function H(e) {
      (W.modal.style.display = e ? "block" : "none"),
        (W.modal_bg.style.display = e ? "block" : "none"),
        document.body.classList[e ? "add" : "remove"]("modal-open");
    }
    function k(e, t, i, a) {
      var n = { targets: e, opacity: t, easing: "easeOutQuint", duration: 250 };
      i && (n.scale = i), a && (n.complete = a), anime(n);
    }
    (F.open_modal = function (n, c) {
      var p = "",
        m = !1;
      if (
        (Object.assign(U.modal, {
          item: n,
          resize_listener: !1,
          type: n.is_dir ? "dir" : "file",
        }),
        !n.is_dir && n.is_readable)
      )
        if (n.browser_image)
          (U.modal.type = "image"),
            n.dimensions &&
              n.dimensions[0] > 800 &&
              n.ratio > 1 &&
              document.documentElement.clientWidth >= 1600 &&
              (m = !0),
            (p =
              '<img data-action="zoom" src="' +
              s(n) +
              '" class="modal-image files-img-placeholder' +
              ("ico" == n.ext ? " modal-image-ico" : "") +
              '"' +
              (!n.dimensions ||
              (!_c.server_exif && B.image_orientation) ||
              (!B.image_orientation && O(n.image))
                ? ""
                : ' width="' +
                  n.dimensions[0] +
                  '" height="' +
                  n.dimensions[1] +
                  '" style="--ratio:' +
                  n.ratio +
                  '"') +
              "></img>");
        else if (n.is_browser_video)
          (U.modal.type = "video"),
            (p =
              '<video src="' +
              s(n) +
              '" type="' +
              n.mime +
              '" class="modal-video" controls playsinline disablepictureinpicture controlslist="nodownload"' +
              (_c.video_autoplay ? " autoplay" : "") +
              "></video>");
        else if (
          _c.video_thumbs_enabled &&
          "video" === n.mime0 &&
          n.is_readable
        )
          (U.modal.type = "video-thumb"),
            (p =
              '<img src="' +
              _c.script +
              "?file=" +
              encodeURIComponent(n.path) +
              "&resize=video&" +
              _c.image_cache_hash +
              "." +
              n.mtime +
              "." +
              n.filesize +
              '" class="modal-image files-img-placeholder" width="' +
              n.preview_dimensions[0] +
              '" height="' +
              n.preview_dimensions[1] +
              '" style="--ratio:' +
              n.preview_ratio +
              '"></img>');
        else if (X("audio", n))
          (U.modal.type = "audio"),
            (p =
              F.get_svg_large(n, "modal-svg") +
              '<audio src="' +
              s(n) +
              '" type="' +
              n.mime +
              '" class="modal-audio" controls playsinline controlslist="nodownload"></audio>');
        else {
          if (!n.hasOwnProperty("code_mode")) {
            var x = (function (e) {
              if (e && !(e.filesize > _c.code_max_load)) {
                if (e.ext && "htaccess" === e.ext)
                  return CodeMirror.findModeByName("nginx");
                var t = !!e.mime && CodeMirror.findModeByMIME(e.mime);
                return (
                  (t && "null" !== t.mode) ||
                    !e.ext ||
                    (t = CodeMirror.findModeByExtension(e.ext) || t),
                  t
                );
              }
            })(n);
            n.code_mode = (x && x.mode) || !1;
          }
          n.code_mode &&
            ((U.modal.type = "code"),
            n.filesize > 1e3 && (m = !0),
            F.load_plugin("codemirror"),
            (p =
              '<div class="spinner-border modal-preview-spinner"></div>' +
              F.get_svg_large(n, "modal-svg")));
        }
      p || (p = F.get_svg_large(n, "modal-svg") + P(n));
      var b =
          ["image", "file"].includes(U.modal.type) ||
          ("dir" === U.modal.type && n.url_path)
            ? "a"
            : "div",
        y =
          "<" +
          ("a" === b
            ? 'a href="' +
              r(n) +
              '" target="_blank" title="' +
              K.get("image" === U.modal.type ? "zoom" : "open in new tab") +
              '"'
            : "div") +
          ' class="modal-preview modal-preview-' +
          U.modal.type +
          '">' +
          p +
          "</" +
          b +
          '><div class="modal-info">' +
          g(!0, "modal-info-context") +
          '<div class="modal-info-name">' +
          (n.url ? '<a href="' + r(n) + '" target="_blank">' : "") +
          a(n.display_name || n.basename) +
          (n.url ? "</a>" : "") +
          '</div>\t\t\t<div class="modal-info-meta">' +
          (n.mime
            ? '<span class="modal-info-mime">' +
              F.get_svg_icon_files(n) +
              n.mime +
              "</span>"
            : "") +
          f(n.dimensions, "modal-info-dimensions") +
          v(n, "modal-info-filesize") +
          (function (e, t) {
            var i = e.is_readable && e.is_writeable;
            return e.fileperms
              ? '<span class="' +
                  t +
                  (i ? " is-readwrite" : " not-readwrite") +
                  '">' +
                  F.get_svg_icon(i ? "lock_open_outline" : "lock_outline") +
                  e.fileperms +
                  "</span>"
              : "";
          })(n, "modal-info-permissions") +
          '</div>\t\t\t<div class="modal-info-date">' +
          F.get_svg_icon("date") +
          F.get_time(n, "llll", "LLLL", !0) +
          "</div>" +
          h(n.image, "modal-info-exif") +
          _(n.image, "modal-info", !0) +
          "</div>";
      t.classList.toggle("modal-lg", m),
        i.classList.add("modal-content-" + U.modal.type),
        (o.innerText = n.basename),
        B.is_pointer && (o.title = n.basename),
        (u.innerHTML = y);
      var C,
        M = !!n.browser_image && _class("files-img-placeholder", u)[0];
      M &&
        M.addEventListener("load", function () {
          this.classList.remove("files-img-placeholder");
        }),
        _c.history &&
          (c &&
            history.pushState(
              null,
              n.basename,
              "#" + encodeURIComponent(n.basename)
            ),
          (U.modal.popstate = L(window, "popstate", function () {
            F.close_modal();
          }))),
        (C = function () {
          if (n.code_mode) {
            var t = U.modal.open;
            e.file = T({
              params: "action=file&file=" + encodeURIComponent(n.path),
              complete: function (i) {
                (e.file = !1),
                  F.load_plugin("codemirror", function () {
                    if (U.modal.open === t) {
                      d(_class("modal-preview-spinner", u));
                      var e = _class("modal-preview-code", u)[0];
                      e &&
                        (d(_class("modal-svg", u)),
                        (U.modal.code_mirror = CodeMirror(e, {
                          value: i,
                          lineWrapping: !0,
                          lineNumbers: !0,
                          readOnly: !_c.allow_text_edit,
                          mode: n.code_mode,
                          viewportMargin: 1 / 0,
                          extraKeys: Object.assign(
                            { F11: j, Esc: j },
                            _c.allow_text_edit
                              ? { "Ctrl-S": z, "Cmd-S": z }
                              : {}
                          ),
                        })),
                        CodeMirror.autoLoadMode(
                          U.modal.code_mirror,
                          n.code_mode
                        ),
                        (U.modal.resize_listener = L(window, "resize", w)),
                        (l.style.display = ""));
                    }
                  });
              },
            });
          }
        }),
        (U.modal.open = Math.random()),
        E("esc", F.close_modal, "keyup"),
        Z(),
        H(!0),
        k(W.modal_bg, [0, 0.8]),
        k(i, [0, 1], [0.98, 1], C);
    }),
      (F.close_modal = function (t) {
        if (
          ((U.modal.open = !1),
          e.file && e.file.abort(),
          E("esc", "keyup"),
          U.modal.resize_listener && U.modal.resize_listener.remove(),
          k(W.modal_bg, [0.8, 0]),
          k(i, [1, 0], [1, 0.98], function () {
            (W.modal.scrollTop = 0),
              H(),
              p(u),
              p(o),
              W.modal.classList.remove("modal-code-fullscreen"),
              i.classList.remove("modal-content-" + U.modal.type),
              (U.modal.code_mirror = !1),
              "code" === U.modal.type && (l.style.display = "none");
          }),
          _c.history && U.modal.popstate)
        ) {
          if ((U.modal.popstate.remove(), !t)) return;
          history.state
            ? history.replaceState(
                { path: _c.current_path },
                _c.current_dir.basename || "/",
                location.pathname + location.search
              )
            : history.back();
        }
      });
    var M = !1;
    function V(e, t) {
      (M = !1),
        c.classList.remove("tooltip-loading"),
        D.timer(c, t, e ? "success" : "danger");
    }
    function z(e) {
      if (!M && !c.disabled) {
        if (_c.demo_mode) return ae.fire("Demo mode");
        if (!J) return ne.fire();
        if (!U.modal.item.is_writeable) return ae.fire("File is not writeable");
        (M = !0), c.classList.add("tooltip-loading");
        var t = _c.current_dir;
        T({
          params:
            "action=fm&task=text_edit&path=" +
            U.modal.item.path +
            "&text=" +
            encodeURIComponent(U.modal.code_mirror.getValue()),
          json_response: !0,
          fail: function () {
            V(!1, "fail"), ae.fire();
          },
          complete: function (e) {
            V(e.success, e.error),
              e.success
                ? (ie.fire(K.get("save", !0) + " " + U.modal.item.basename),
                  I.remove(ce(t.path, t.path.mtime)),
                  delete t.files,
                  delete t.html)
                : ae.fire(e.error);
          },
        });
      }
    }
    function j() {
      W.modal.classList.toggle("modal-code-fullscreen"), w();
    }
    m(W.modal, function (e, t) {
      if ("context" === e)
        F.create_contextmenu(t, "modal", t.target, U.modal.item);
      else if ("close" === e) F.close_modal(!0);
      else if ("zoom" === e) {
        if (U.contextmenu.is_open) return t.preventDefault();
        if (y(t, t.target.closest(".modal-preview"))) return;
        U.modal.popstate.remove(), F.open_popup(U.modal.item);
      } else if ("copy" === e) {
        var i = U.modal.code_mirror.getValue(),
          a = i && b(i);
        D.timer(t.target, !1, a ? "success" : "danger");
      } else "fullscreen" === e ? j() : "save" === e && z();
    });
  })();
  var de = function (e, t) {
      var i,
        a,
        n,
        o,
        l,
        r,
        c,
        p,
        d,
        m,
        f,
        v,
        g,
        _,
        h,
        x,
        b,
        y = this,
        w = !1,
        C = !0,
        L = {
          timeToIdle: 3e3,
          timeToIdleOutside: 1e3,
          loadingIndicatorDelay: 1e3,
          addCaptionHTMLFn: function (e, i) {
            return e.title
              ? (i.firstElementChild.innerHTML = e.title)
              : t.resetEl(i.firstElementChild);
          },
          closeEl: !0,
          captionEl: !0,
          fullscreenEl: B.fullscreen,
          zoomEl: !0,
          downloadEl: !1,
          mapEl: !0,
          playEl: !0,
          panoRotateEl: !0,
          counterEl: !0,
          arrowEl: !0,
          preloaderEl: !0,
          closeOnOutsideClick: !0,
          tapToClose: !1,
          clickToCloseNonZoomable: !1,
          clickToShowNextNonZoomable: !1,
          indexIndicatorSep: " / ",
          fitControlsWidth: 1200,
        },
        H = function (e) {
          if (h) return !0;
          (e = e || window.event), _.timeToIdle && _.mouseUsed && !p && j();
          for (var t, i, a = e.target || e.srcElement, n = 0; n < I.length; n++)
            (t = I[n]).onTap &&
              a.classList.contains("pswp__" + t.name) &&
              (t.onTap(), (i = !0));
          i &&
            (e.stopPropagation(),
            (h = !0),
            setTimeout(function () {
              h = !1;
            }, 30));
        },
        k = function (e) {
          32 === e.keyCode &&
            (B.is_dual_input && y.toggleControls(!1), y.setIdle(!p));
        },
        M = function (e, t, i) {
          e.classList[i ? "add" : "remove"]("pswp__" + t);
        },
        V = function () {
          var e = 1 === _.getNumItemsFn();
          e !== g && (M(i, "ui--one-slide", e), (g = e));
        },
        z = 0,
        j = function () {
          clearTimeout(b), (z = 0), p && y.setIdle(!1);
        },
        A = function (e) {
          var t = (e = e || window.event).relatedTarget || e.toElement;
          (t && "HTML" !== t.nodeName) ||
            (clearTimeout(b),
            (b = setTimeout(function () {
              y.setIdle(!0);
            }, _.timeToIdleOutside)));
        },
        E = function (e) {
          f !== e && (t.toggle_class(m, "svg-preloader-active", !e), (f = e));
        },
        I = [
          {
            name: "caption",
            option: "captionEl",
            onInit: function (e) {
              a = e;
            },
          },
          {
            name: "button--download",
            option: "downloadEl",
            onInit: function (e) {
              r = e;
            },
            onTap: function () {},
          },
          {
            name: "button--map",
            option: "mapEl",
            onInit: function (e) {
              c = e;
            },
            onTap: function () {},
          },
          {
            name: "button--zoom",
            option: "zoomEl",
            onTap: e.toggleDesktopZoom,
          },
          {
            name: "counter",
            option: "counterEl",
            onInit: function (e) {
              n = e;
            },
          },
          { name: "button--close", option: "closeEl", onTap: e.close },
          {
            name: "button--arrow--left",
            option: "arrowEl",
            onInit: function (e) {
              o = e;
            },
            onTap: function () {
              e.prev();
            },
          },
          {
            name: "button--arrow--right",
            option: "arrowEl",
            onInit: function (e) {
              l = e;
            },
            onTap: function () {
              e.next();
            },
          },
          {
            name: "button--fs",
            option: "fullscreenEl",
            onInit: function (e) {
              e;
            },
            onTap: function () {
              screenfull.toggle();
            },
          },
          {
            name: "preloader",
            option: "preloaderEl",
            onInit: function (e) {
              m = e;
            },
          },
          {
            name: "button--play",
            option: "playEl",
            onTap: function () {
              U.popup.toggle_play(!U.popup.playing);
            },
          },
          {
            name: "button--pano-rotate",
            option: "panoRotateEl",
            onTap: U.popup.toggle_pano_rotate,
          },
        ];
      (y.init = function () {
        var n, o, l, p;
        t.copy_unique(e.options, L),
          (_ = e.options),
          (i = U.popup.ui),
          (d = e.listen)("onVerticalDrag", function (e) {
            C && e < 0.95
              ? y.toggleControls()
              : !C && e >= 0.95 && y.toggleControls(!0);
          }),
          d("onPinchClose", function (e) {
            C && e < 0.9
              ? (y.toggleControls(), (n = !0))
              : n && !C && e > 0.9 && y.toggleControls(!0);
          }),
          d("zoomGestureEnded", function () {
            (n = !1) && !C && y.toggleControls(!0);
          }),
          d("beforeChange", y.update),
          _.downloadEl &&
            d("afterChange", function () {
              var t = s(e.currItem.item);
              r.setAttribute("href", t || "#"),
                (r.style.display = t ? "" : "none");
            }),
          _.mapEl &&
            d("afterChange", function () {
              var t = e.currItem.item,
                i = !!(t && t.image && t.image.exif) && t.image.exif.gps;
              (c.style.display = i ? "" : "none"),
                c.setAttribute("href", i ? u(i) : "#");
            }),
          d("doubleTap", function (t) {
            var i = e.currItem.initialZoomLevel;
            e.zoomTo(
              e.getZoomLevel() === i ? _.getDoubleTapZoom(!1, e.currItem) : i,
              t,
              250
            );
          }),
          d("preventDragEvent", function (e, t, i) {
            var a = e.target || e.srcElement;
            a &&
              a.getAttribute("class") &&
              e.type.indexOf("mouse") > -1 &&
              (a.getAttribute("class").indexOf("__caption") > 0 ||
                /(SMALL|STRONG|EM)/i.test(a.tagName)) &&
              ((i.prevent = !1), undefined());
          }),
          d("bindEvents", function () {
            t.bind(i, "pswpTap click", H),
              t.bind(U.popup.scrollwrap, "pswpTap", y.onGlobalTap),
              t.bind(document, "keydown", k);
          }),
          d("unbindEvents", function () {
            x && clearInterval(x),
              t.unbind(document, "mouseout", A),
              t.unbind(document, "mousemove", j),
              t.unbind(i, "pswpTap click", H),
              t.unbind(U.popup.scrollwrap, "pswpTap", y.onGlobalTap),
              t.unbind(document, "keydown", k);
          }),
          d("destroy", function () {
            _.captionEl && a.classList.remove("pswp__caption--empty"),
              i.classList.add("pswp__ui--hidden"),
              b && clearTimeout(b),
              y.setIdle(!1);
          }),
          _.showAnimationDuration || i.classList.remove("pswp__ui--hidden"),
          d("initialZoomIn", function () {
            _.showAnimationDuration && i.classList.remove("pswp__ui--hidden");
          }),
          d("initialZoomOut", function () {
            i.classList.add("pswp__ui--hidden");
          }),
          (p = function (e) {
            if (e)
              for (var t = e.length, i = 0; i < t; i++) {
                o = e[i];
                for (var a = 0; a < I.length; a++)
                  (l = I[a]),
                    o.classList.contains("pswp__" + l.name) &&
                      (_[l.option]
                        ? (o.classList.remove("pswp__element--disabled"),
                          l.onInit && l.onInit(o))
                        : o.classList.add("pswp__element--disabled"));
              }
          })(i.children),
          p(U.popup.topbar.children),
          V(),
          _.timeToIdle &&
            d("mouseUsed", function () {
              t.bind(document, "mousemove", j),
                t.bind(document, "mouseout", A),
                (x = setInterval(function () {
                  2 == ++z && y.setIdle(!0);
                }, _.timeToIdle / 2));
            }),
          _.preloaderEl &&
            (E(!0),
            d("beforeChange", function () {
              clearTimeout(v),
                (v = setTimeout(function () {
                  e.currItem && e.currItem.loading
                    ? e.currItem.img && !e.currItem.img.naturalWidth && E(!1)
                    : E(!0);
                }, _.loadingIndicatorDelay));
            }),
            d("imageLoadComplete", function (t, i) {
              e.currItem === i && E(!0);
            }));
      }),
        (y.setIdle = function (e) {
          (p = e), M(i, "ui--idle", e);
        }),
        (y.update = function () {
          if (C && e.currItem) {
            if ((y.updateIndexIndicator(), _.captionEl)) {
              var t = _.addCaptionHTMLFn(e.currItem, a);
              M(a, "caption--empty", !t);
            }
            w = !0;
          } else w = !1;
          V();
        }),
        (y.updateIndexIndicator = function () {
          _.counterEl &&
            (n.innerHTML =
              e.getCurrentIndex() +
              1 +
              _.indexIndicatorSep +
              _.getNumItemsFn()),
            !_.loop &&
              _.arrowEl &&
              _.getNumItemsFn() > 1 &&
              (t.toggle_class(
                o,
                "pswp__element--disabled",
                0 === e.getCurrentIndex()
              ),
              t.toggle_class(
                l,
                "pswp__element--disabled",
                e.getCurrentIndex() === _.getNumItemsFn() - 1
              ));
        }),
        (y.onGlobalTap = function (t) {
          var i = (t = t || window.event).target || t.srcElement;
          if (!h)
            if (t.detail && "mouse" === t.detail.pointerType) {
              if (!t.detail.rightClick)
                if (
                  ("zoom" == _.click ||
                    _.getNumItemsFn() < 2 ||
                    e.getZoomLevel() > e.currItem.fitRatio) &&
                  i.classList.contains("pswp__img")
                )
                  e.currItem.fitRatio < 1 &&
                    e.toggleDesktopZoom(t.detail.releasePoint);
                else if (0 === i.className.indexOf("pswp__")) {
                  var a =
                    (_.getNumItemsFn() > 2 || !e.getCurrentIndex()) &&
                    ("next" == _.click ||
                      t.detail.releasePoint.x > U.popup.pswp.clientWidth / 2)
                      ? "next"
                      : "prev";
                  e[a]();
                }
            } else
              B.is_dual_input
                ? B.legacy_ie || y.setIdle(!p)
                : y.toggleControls(!C);
        }),
        (y.toggleControls = function (e) {
          (C = e), e && !w && y.update(), M(i, "ui--hidden", !e);
        });
    },
    me = {
      bind: function (e, t, i, a) {
        var n = (a ? "remove" : "add") + "EventListener";
        t = t.split(" ");
        for (var o = 0; o < t.length; o++) t[o] && e[n](t[o], i, !1);
      },
      createEl: function (e, t) {
        var i = document.createElement(t || "div");
        return e && (i.className = e), i;
      },
      resetEl: function (e) {
        for (; e.firstChild; ) e.removeChild(e.firstChild);
      },
      getScrollY: function () {
        return window.pageYOffset;
      },
      unbind: function (e, t, i) {
        me.bind(e, t, i, !0);
      },
      toggle_class: function (e, t, i) {
        e.classList[i ? "add" : "remove"](t);
      },
      arraySearch: function (e, t, i) {
        for (var a = e.length; a--; ) if (e[a][i] === t) return a;
        return -1;
      },
      copy_unique: function (e, t) {
        Object.keys(t).forEach(function (i) {
          e.hasOwnProperty(i) || (e[i] = t[i]);
        });
      },
      easing: {
        sine: {
          out: function (e) {
            return Math.sin(e * (Math.PI / 2));
          },
          inOut: function (e) {
            return -(Math.cos(Math.PI * e) - 1) / 2;
          },
        },
        cubic: {
          out: function (e) {
            return --e * e * e + 1;
          },
        },
      },
      features: {
        touch: B.is_touch,
        raf: window.requestAnimationFrame,
        caf: window.cancelAnimationFrame,
        pointerEvent: !!window.PointerEvent || navigator.msPointerEnabled,
        is_mouse: B.only_pointer,
      },
    },
    ue = function (e, t, i, a) {
      var n = this,
        o = {
          allowPanToNext: !0,
          spacing: 0.12,
          bgOpacity: 1,
          mouseUsed: B.only_pointer,
          loop: !0,
          pinchToClose: !0,
          closeOnScroll: !0,
          closeOnVerticalDrag: !0,
          verticalDragRange: 0.75,
          hideAnimationDuration: 333,
          showAnimationDuration: 333,
          showHideOpacity: !1,
          focus: !0,
          escKey: !0,
          arrowKeys: !0,
          mainScrollEndFriction: 0.35,
          panEndFriction: 0.35,
          transition: "glide",
          play_transition: "glide",
          isClickableElement: function (e) {
            return "A" === e.tagName;
          },
          getDoubleTapZoom: function (e, t) {
            return e || t.initialZoomLevel < 0.7 ? 1 : 1.33;
          },
          maxSpreadZoom: 1,
        };
      Object.assign(o, a);
      var l,
        s,
        r,
        c,
        p,
        d,
        m,
        u,
        f,
        v,
        g,
        _,
        h,
        x,
        b,
        y,
        w,
        C,
        L,
        H,
        k,
        M,
        V,
        z,
        j,
        A,
        E,
        I,
        T,
        O,
        S,
        R,
        Z,
        D,
        P,
        q,
        F,
        N,
        W,
        X,
        Y,
        K,
        G,
        J,
        Q,
        $,
        ee,
        te,
        ie,
        ae,
        ne,
        oe = { x: 0, y: 0 },
        le = { x: 0, y: 0 },
        se = { x: 0, y: 0 },
        re = {},
        ce = 0,
        pe = {},
        de = { x: 0, y: 0 },
        ue = 0,
        fe = [],
        ve = !1,
        ge = function (e, t) {
          Object.assign(n, t.publicMethods), fe.push(e);
        },
        _e = function (e) {
          var t = Rt();
          return e > t - 1 ? e - t : e < 0 ? t + e : e;
        },
        he = {},
        xe = function (e, t) {
          return he[e] || (he[e] = []), he[e].push(t);
        },
        be = function (e) {
          var t = he[e];
          if (t) {
            var i = Array.prototype.slice.call(arguments);
            i.shift();
            for (var a = 0; a < t.length; a++) t[a].apply(n, i);
          }
        },
        ye = function () {
          return new Date().getTime();
        },
        we = function (e) {
          (ie = e), (U.popup.bg.style.opacity = e * o.bgOpacity);
        },
        Ce = function (e, t, i, a, o) {
          (!ve || (o && o !== n.currItem)) &&
            (a /= o ? o.fitRatio : n.currItem.fitRatio),
            (e.transform = _ + t + "px, " + i + "px, 0px) scale(" + a + ")");
        },
        Le = function (e) {
          J &&
            !n.currItem.loadError &&
            (e &&
              (v > n.currItem.fitRatio
                ? ve || (Bt(n.currItem, !1, !0), (ve = !0))
                : ve && (Bt(n.currItem), (ve = !1))),
            Ce(J, se.x, se.y, v));
        },
        He = function (e) {
          e.container &&
            Ce(
              e.container.style,
              e.initialPosition.x,
              e.initialPosition.y,
              e.initialZoomLevel,
              e
            );
        },
        ke = function (e, t) {
          t.transform = _ + e + "px, 0px, 0px)";
        },
        Me = function (e, t) {
          if (!o.loop && t) {
            var i = c + (de.x * ce - e) / de.x,
              a = Math.round(e - lt.x);
            ((i < 0 && a > 0) || (i >= Rt() - 1 && a < 0)) &&
              (e = lt.x + a * o.mainScrollEndFriction);
          }
          (lt.x = e), ke(e, p);
        },
        Ve = function (e, t) {
          var i = st[e] - pe[e];
          return le[e] + oe[e] + i - i * (t / g);
        },
        ze = function (e, t) {
          (e.x = t.x), (e.y = t.y), t.id && (e.id = t.id);
        },
        je = function (e) {
          (e.x = Math.round(e.x)), (e.y = Math.round(e.y));
        },
        Ae = function () {
          E.is_mouse ||
            (e.classList.add("pswp--has_mouse"),
            (z += " pswp--has_mouse"),
            (E.is_mouse = o.mouseUsed = !0)),
            be("mouseUsed");
        },
        Ee = null,
        Ie = function () {
          Ee && (me.unbind(document, "mousemove", Ie), Ae()),
            (Ee = setTimeout(function () {
              Ee = null;
            }, 100));
        },
        Te = function (e, t) {
          var i = Ft(n.currItem, re, e);
          return t && (G = i), i;
        },
        Oe = function (e) {
          return (e || n.currItem).initialZoomLevel;
        },
        Se = function (e) {
          return (e || n.currItem).w > 0 ? o.maxSpreadZoom : 1;
        },
        Re = function (e, t, i, a) {
          return a === n.currItem.initialZoomLevel
            ? ((i[e] = n.currItem.initialPosition[e]), !0)
            : ((i[e] = Ve(e, a)),
              i[e] > t.min[e]
                ? ((i[e] = t.min[e]), !0)
                : i[e] < t.max[e] && ((i[e] = t.max[e]), !0));
        },
        Ze = function (e) {
          var t = "";
          if (
            (o.escKey && 27 === e.keyCode
              ? (t = "close")
              : o.arrowKeys &&
                (37 === e.keyCode
                  ? (t = "prev")
                  : 39 === e.keyCode && (t = "next")),
            !t || e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)
          )
            return !1;
          e.preventDefault(), n[t]();
        },
        De = function (e) {
          e && (F || q || Q || Z) && (e.preventDefault(), e.stopPropagation());
        },
        Pe = function () {
          n.setScrollOffset(0, me.getScrollY());
        },
        qe = {},
        Fe = 0,
        Ne = function (e) {
          qe[e] && (qe[e].raf && V(qe[e].raf), Fe--, delete qe[e]);
        },
        Ue = function (e) {
          qe[e] && Ne(e), qe[e] || (Fe++, (qe[e] = {}));
        },
        We = function () {
          for (var e in qe) qe.hasOwnProperty(e) && Ne(e);
        },
        Be = function (e, t, i, a, n, o, l) {
          var s,
            r = ye();
          Ue(e);
          var c = function () {
            if (qe[e]) {
              if ((s = ye() - r) >= a) return Ne(e), o(i), void (l && l());
              o((i - t) * n(s / a) + t), (qe[e].raf = M(c));
            }
          };
          c();
        },
        Xe = {
          shout: be,
          listen: xe,
          viewportSize: re,
          options: o,
          isMainScrollAnimating: function () {
            return Q;
          },
          getZoomLevel: function () {
            return v;
          },
          getCurrentIndex: function () {
            return c;
          },
          isDragging: function () {
            return D;
          },
          isZooming: function () {
            return Y;
          },
          setScrollOffset: function (e, t) {
            (pe.x = e), (A = pe.y = t);
          },
          applyZoomPan: function (e, t, i, a) {
            (se.x = t), (se.y = i), (v = e), Le(a);
          },
          init: function () {
            if (!l && !s) {
              var i;
              for (
                n.framework = me,
                  n.template = e,
                  z = e.className,
                  l = !0,
                  E = me.features,
                  M = E.raf,
                  V = E.caf,
                  p = U.popup.container.style,
                  n.itemHolders = x =
                    [
                      { el: U.popup.items[0], wrap: 0, index: -1 },
                      { el: U.popup.items[1], wrap: 0, index: -1 },
                      { el: U.popup.items[2], wrap: 0, index: -1 },
                    ],
                  x[0].el.style.display = x[2].el.style.display = "none",
                  _ = "translate" + (k ? "(" : "3d("),
                  f = {
                    resize: n.updateSize,
                    orientationchange: function () {
                      clearTimeout(I),
                        (I = setTimeout(function () {
                          re.x !== U.popup.scrollwrap.clientWidth &&
                            n.updateSize();
                        }, 500));
                    },
                    scroll: Pe,
                    keydown: Ze,
                    click: De,
                  },
                  i = 0;
                i < fe.length;
                i++
              )
                n["init" + fe[i]]();
              if (t) (n.ui = new t(n, me)).init();
              be("firstUpdate"),
                (c = c || o.index || 0),
                (isNaN(c) || c < 0 || c >= Rt()) && (c = 0),
                (n.currItem = St(c)),
                e.setAttribute("aria-hidden", "false"),
                void 0 === A &&
                  (be("initialLayout"), (A = j = me.getScrollY()));
              var a =
                "pswp--open" +
                (o.showHideOpacity ? " pswp--animate_opacity" : "") +
                (B.is_pointer && ("zoom" == o.click || o.getNumItemsFn() < 2)
                  ? " pswp--zoom-cursor"
                  : "");
              for (
                DOMTokenList.prototype.add.apply(e.classList, a.split(" ")),
                  n.updateSize(),
                  d = -1,
                  ue = null,
                  i = 0;
                i < 3;
                i++
              )
                ke((i + d) * de.x, x[i].el.style);
              me.bind(U.popup.scrollwrap, u, n),
                xe("initialZoomInEnd", function () {
                  n.setContent(x[0], c - 1),
                    n.setContent(x[2], c + 1),
                    (x[0].el.style.display = x[2].el.style.display = "block"),
                    o.focus && e.focus(),
                    me.bind(document, "keydown", n),
                    me.bind(U.popup.scrollwrap, "click", n),
                    E.is_mouse
                      ? Ae()
                      : B.is_pointer && me.bind(document, "mousemove", Ie),
                    me.bind(window, "resize scroll orientationchange", n),
                    be("bindEvents");
                }),
                n.setContent(x[1], c),
                n.updateCurrItem(),
                e.classList.add("pswp--visible");
            }
          },
          close: function () {
            l &&
              ((l = !1),
              (s = !0),
              be("close"),
              setTimeout(function () {
                me.unbind(window, "resize scroll orientationchange", n);
              }, 400),
              me.unbind(window, "scroll", f.scroll),
              me.unbind(document, "keydown", n),
              B.is_pointer && me.unbind(document, "mousemove", Ie),
              me.unbind(U.popup.scrollwrap, "click", n),
              D && me.unbind(window, m, n),
              clearTimeout(I),
              be("unbindEvents"),
              Zt(n.currItem, null, !0, n.destroy));
          },
          destroy: function () {
            be("destroy"),
              Et && clearTimeout(Et),
              e.setAttribute("aria-hidden", "true"),
              (e.className = z),
              me.unbind(U.popup.scrollwrap, u, n),
              me.unbind(window, "scroll", n),
              pt(),
              We(),
              (he = {});
          },
          panTo: function (e, t, i) {
            i ||
              (e > G.min.x ? (e = G.min.x) : e < G.max.x && (e = G.max.x),
              t > G.min.y ? (t = G.min.y) : t < G.max.y && (t = G.max.y)),
              (e == se.x && t == se.y) || ((se.x = e), (se.y = t), Le());
          },
          handleEvent: function (e) {
            (e = e || window.event), f[e.type] && f[e.type](e);
          },
          goTo: function (e, t, i) {
            var a = i ? o.play_transition : o.transition;
            if ("slide" === a)
              zt("swipe", 80 * e, {
                lastFlickDist: { x: 80, y: 0 },
                lastFlickOffset: { x: 80 * e, y: 0 },
                lastFlickSpeed: { x: 2 * e, y: 0 },
              });
            else {
              var l = (e = _e(e)) - c;
              (ue = l),
                (c = e),
                (n.currItem = St(c)),
                (ce -= l),
                Me(de.x * ce),
                We(),
                (Q = !1),
                U.popup.image_anim &&
                  !U.popup.image_anim.paused &&
                  U.popup.image_anim.pause();
              var s =
                !!U.popup.transitions.hasOwnProperty(a) &&
                U.popup.transitions[a](t);
              if (
                ((U.popup.caption_transition_delay = (s && s.duration) || 0),
                n.updateCurrItem(),
                !s)
              )
                return;
              var r =
                !!n.currItem.container && n.currItem.container.lastElementChild;
              r &&
                (U.popup.image_timer
                  ? clearTimeout(U.popup.image_timer)
                  : (U.popup.image_anim = anime(
                      Object.assign({ targets: r }, s)
                    )),
                (U.popup.image_timer = setTimeout(function () {
                  U.popup.image_timer = !1;
                }, 300)));
            }
          },
          next: function (e) {
            if (o.loop || c !== Rt() - 1) {
              var t = e ? o.play_transition : o.transition;
              n.goTo("slide" === t ? -1 : parseInt(c) + 1, 1, e);
            }
          },
          prev: function () {
            (o.loop || 0 !== c) &&
              n.goTo("slide" === o.transition ? 1 : parseInt(c) - 1, -1);
          },
          updateCurrZoomItem: function (e) {
            e && be("beforeChange", 0);
            var t = x[1].el.children;
            (J =
              t.length && t[0].classList.contains("pswp__zoom-wrap")
                ? t[0].style
                : null),
              (G = n.currItem.bounds),
              (g = v = n.currItem.initialZoomLevel),
              (se.x = G.center.x),
              (se.y = G.center.y),
              e && be("afterChange");
          },
          invalidateCurrItems: function () {
            h = !0;
            for (var e = 0; e < 3; e++)
              x[e].item && (x[e].item.needsUpdate = !0);
          },
          updateCurrItem: function (e) {
            if (0 !== ue) {
              var t,
                i = Math.abs(ue);
              if (!(e && i < 2)) {
                (n.currItem = St(c)),
                  (ve = !1),
                  be("beforeChange", ue),
                  i >= 3 && ((d += ue + (ue > 0 ? -3 : 3)), (i = 3));
                for (var a = 0; a < i; a++)
                  ue > 0
                    ? ((t = x.shift()),
                      (x[2] = t),
                      d++,
                      ke((d + 2) * de.x, t.el.style),
                      n.setContent(t, c - i + a + 1 + 1))
                    : ((t = x.pop()),
                      x.unshift(t),
                      d--,
                      ke(d * de.x, t.el.style),
                      n.setContent(t, c + i - a - 1 - 1));
                if (J && 1 === Math.abs(ue)) {
                  var o = St(b);
                  o.initialZoomLevel !== v && (Ft(o, re), Bt(o), He(o));
                }
                (ue = 0), n.updateCurrZoomItem(), (b = c), be("afterChange");
              }
            }
          },
          updateSize: function (e) {
            if (
              ((re.x = U.popup.scrollwrap.clientWidth),
              (re.y = U.popup.scrollwrap.clientHeight),
              Pe(),
              (de.x = re.x + Math.round(re.x * o.spacing)),
              (de.y = re.y),
              Me(de.x * ce),
              be("beforeResize"),
              void 0 !== d)
            ) {
              for (var t, i, a, l = 0; l < 3; l++)
                (t = x[l]),
                  ke((l + d) * de.x, t.el.style),
                  (a = c + l - 1),
                  o.loop && Rt() > 2 && (a = _e(a)),
                  (i = St(a)) && (h || i.needsUpdate || !i.bounds)
                    ? (n.cleanSlide(i),
                      n.setContent(t, a),
                      1 === l && ((n.currItem = i), n.updateCurrZoomItem(!0)),
                      (i.needsUpdate = !1))
                    : -1 === t.index && a >= 0 && n.setContent(t, a),
                  i && i.container && (Ft(i, re), Bt(i), He(i));
              h = !1;
            }
            (g = v = n.currItem.initialZoomLevel),
              (G = n.currItem.bounds) &&
                ((se.x = G.center.x), (se.y = G.center.y), Le(!0)),
              be("resize");
          },
          zoomTo: function (e, t, i, a, n) {
            t &&
              ((g = v),
              (st.x = Math.abs(t.x) - se.x),
              (st.y = Math.abs(t.y) - se.y),
              ze(le, se));
            var o = Te(e, !1),
              l = {};
            Re("x", o, l, e), Re("y", o, l, e);
            var s = v,
              r = { x: se.x, y: se.y };
            je(l);
            var c = function (t) {
              1 === t
                ? ((v = e), (se.x = l.x), (se.y = l.y))
                : ((v = (e - s) * t + s),
                  (se.x = (l.x - r.x) * t + r.x),
                  (se.y = (l.y - r.y) * t + r.y)),
                n && n(t),
                Le(1 === t);
            };
            i
              ? Be("customZoomTo", 0, 1, i, a || me.easing.sine.inOut, c)
              : c(1);
          },
        },
        Ye = {},
        Ke = {},
        Ge = {},
        Je = {},
        Qe = {},
        $e = [],
        et = {},
        tt = [],
        it = {},
        at = 0,
        nt = { x: 0, y: 0 },
        ot = 0,
        lt = { x: 0, y: 0 },
        st = { x: 0, y: 0 },
        rt = { x: 0, y: 0 },
        ct = function (e, t) {
          return (
            (it.x = Math.abs(e.x - t.x)),
            (it.y = Math.abs(e.y - t.y)),
            Math.sqrt(it.x * it.x + it.y * it.y)
          );
        },
        pt = function () {
          N && (V(N), (N = null));
        },
        dt = function () {
          D && ((N = M(dt)), Ht());
        },
        mt = function (e, t) {
          return (
            !(!e || e === document || e === U.popup.scrollwrap) &&
            (t(e) ? e : mt(e.parentNode, t))
          );
        },
        ut = {},
        ft = function (e, t) {
          return (
            (ut.prevent = !mt(e.target, o.isClickableElement)),
            be("preventDragEvent", e, t, ut),
            ut.prevent
          );
        },
        vt = function (e, t) {
          return (t.x = e.pageX), (t.y = e.pageY), (t.id = e.identifier), t;
        },
        gt = function (e, t, i) {
          (i.x = 0.5 * (e.x + t.x)), (i.y = 0.5 * (e.y + t.y));
        },
        _t = function () {
          var e = se.y - n.currItem.initialPosition.y;
          return 1 - Math.abs(e / (re.y / 2));
        },
        ht = {},
        xt = {},
        bt = [],
        yt = function (e) {
          for (; bt.length > 0; ) bt.pop();
          return (
            H
              ? ((ne = 0),
                $e.forEach(function (e) {
                  0 === ne ? (bt[0] = e) : 1 === ne && (bt[1] = e), ne++;
                }))
              : e.type.indexOf("touch") > -1
              ? e.touches &&
                e.touches.length > 0 &&
                ((bt[0] = vt(e.touches[0], ht)),
                e.touches.length > 1 && (bt[1] = vt(e.touches[1], xt)))
              : ((ht.x = e.pageX),
                (ht.y = e.pageY),
                (ht.id = ""),
                (bt[0] = ht)),
            bt
          );
        },
        wt = function (e, t) {
          var i,
            a,
            l,
            s,
            r = se[e] + t[e],
            c = t[e] > 0,
            p = lt.x + t.x,
            d = lt.x - et.x;
          if (
            ((i = r > G.min[e] || r < G.max[e] ? o.panEndFriction : 1),
            (r = se[e] + t[e] * i),
            (o.allowPanToNext || v === n.currItem.initialZoomLevel) &&
              (J
                ? "h" !== $ ||
                  "x" !== e ||
                  q ||
                  (c
                    ? (r > G.min[e] &&
                        ((i = o.panEndFriction),
                        G.min[e] - r,
                        (a = G.min[e] - le[e])),
                      (a <= 0 || d < 0) && Rt() > 1
                        ? ((s = p), d < 0 && p > et.x && (s = et.x))
                        : G.min.x !== G.max.x && (l = r))
                    : (r < G.max[e] &&
                        ((i = o.panEndFriction),
                        r - G.max[e],
                        (a = le[e] - G.max[e])),
                      (a <= 0 || d > 0) && Rt() > 1
                        ? ((s = p), d > 0 && p < et.x && (s = et.x))
                        : G.min.x !== G.max.x && (l = r)))
                : (s = p),
              "x" === e))
          )
            return (
              void 0 !== s && (Me(s, !0), (W = s !== et.x)),
              G.min.x !== G.max.x &&
                (void 0 !== l ? (se.x = l) : W || (se.x += t.x * i)),
              void 0 !== s
            );
          !Q && !W && v > n.currItem.fitRatio && (se[e] += t[e] * i);
        },
        Ct = function (e) {
          if ("pointerdown" !== e.type || !(e.which > 1 || e.ctrlKey))
            if (Ot) e.preventDefault();
            else {
              if ((ft(e, !0) && e.preventDefault(), be("pointerDown"), H)) {
                var t = me.arraySearch($e, e.pointerId, "id");
                t < 0 && (t = $e.length),
                  ($e[t] = { x: e.pageX, y: e.pageY, id: e.pointerId });
              }
              var i = yt(e),
                a = i.length;
              (X = null),
                We(),
                (D && 1 !== a) ||
                  ((D = ee = !0),
                  me.bind(window, m, n),
                  (R = ae = te = Z = W = F = P = q = !1),
                  ($ = null),
                  be("firstTouchStart", i),
                  ze(le, se),
                  (oe.x = oe.y = 0),
                  ze(Je, i[0]),
                  ze(Qe, Je),
                  (et.x = de.x * ce),
                  (tt = [{ x: Je.x, y: Je.y }]),
                  (O = T = ye()),
                  Te(v, !0),
                  pt(),
                  dt()),
                !Y &&
                  a > 1 &&
                  !Q &&
                  !W &&
                  ((g = v),
                  (q = !1),
                  (Y = P = !0),
                  (oe.y = oe.x = 0),
                  ze(le, se),
                  ze(Ye, i[0]),
                  ze(Ke, i[1]),
                  gt(Ye, Ke, rt),
                  (st.x = Math.abs(rt.x) - se.x),
                  (st.y = Math.abs(rt.y) - se.y),
                  (K = ct(Ye, Ke)));
            }
        },
        Lt = function (e) {
          if ((e.preventDefault(), H)) {
            var t = me.arraySearch($e, e.pointerId, "id");
            if (t > -1) {
              var i = $e[t];
              (i.x = e.pageX), (i.y = e.pageY);
            }
          }
          if (D) {
            var a = yt(e);
            if ($ || F || Y) X = a;
            else if (lt.x !== de.x * ce) $ = "h";
            else {
              var n = Math.abs(a[0].x - Je.x) - Math.abs(a[0].y - Je.y);
              Math.abs(n) >= 10 && (($ = n > 0 ? "h" : "v"), (X = a));
            }
          }
        },
        Ht = function () {
          if (X) {
            var e = X.length;
            if (0 !== e)
              if (
                (ze(Ye, X[0]),
                (Ge.x = Ye.x - Je.x),
                (Ge.y = Ye.y - Je.y),
                Y && e > 1)
              ) {
                if (
                  ((Je.x = Ye.x),
                  (Je.y = Ye.y),
                  !Ge.x &&
                    !Ge.y &&
                    (function (e, t) {
                      return e.x === t.x && e.y === t.y;
                    })(X[1], Ke))
                )
                  return;
                ze(Ke, X[1]), q || (q = !0);
                var t = ct(Ye, Ke),
                  i = jt(t);
                i >
                  n.currItem.initialZoomLevel +
                    n.currItem.initialZoomLevel / 15 && (ae = !0);
                var a = 1,
                  l = Oe(),
                  s = Se();
                if (i < l)
                  if (
                    o.pinchToClose &&
                    !ae &&
                    g <= n.currItem.initialZoomLevel
                  ) {
                    var r = 1 - (l - i) / (l / 1.2);
                    we(r), be("onPinchClose", r), (te = !0);
                  } else
                    (a = (l - i) / l) > 1 && (a = 1), (i = l - a * (l / 3));
                else
                  i > s &&
                    ((a = (i - s) / (6 * l)) > 1 && (a = 1), (i = s + a * l));
                a < 0 && (a = 0),
                  t,
                  gt(Ye, Ke, nt),
                  (oe.x += nt.x - rt.x),
                  (oe.y += nt.y - rt.y),
                  ze(rt, nt),
                  (se.x = Ve("x", i)),
                  (se.y = Ve("y", i)),
                  (R = i > v),
                  (v = i),
                  Le();
              } else {
                if (!$) return;
                if (
                  (ee &&
                    ((ee = !1),
                    Math.abs(Ge.x) >= 10 && (Ge.x -= X[0].x - Qe.x),
                    Math.abs(Ge.y) >= 10 && (Ge.y -= X[0].y - Qe.y)),
                  (Je.x = Ye.x),
                  (Je.y = Ye.y),
                  0 === Ge.x && 0 === Ge.y)
                )
                  return;
                if (
                  "v" === $ &&
                  o.closeOnVerticalDrag &&
                  v === n.currItem.initialZoomLevel
                ) {
                  (oe.y += Ge.y), (se.y += Ge.y);
                  var c = _t();
                  return (Z = !0), be("onVerticalDrag", c), we(c), void Le();
                }
                !(function (e, t, i) {
                  if (e - O > 50) {
                    var a = tt.length > 2 ? tt.shift() : {};
                    (a.x = t), (a.y = i), tt.push(a), (O = e);
                  }
                })(ye(), Ye.x, Ye.y),
                  (F = !0),
                  (G = n.currItem.bounds),
                  wt("x", Ge) || (wt("y", Ge), je(se), Le());
              }
          }
        },
        kt = function (e) {
          var t;
          if ((be("pointerUp"), ft(e, !1) && e.preventDefault(), H)) {
            var i = me.arraySearch($e, e.pointerId, "id");
            if (i > -1)
              if (((t = $e.splice(i, 1)[0]), navigator.msPointerEnabled)) {
                (t.type = { 4: "mouse", 2: "touch", 3: "pen" }[e.pointerType]),
                  t.type || (t.type = e.pointerType || "mouse");
              } else t.type = e.pointerType || "mouse";
          }
          var a,
            l = yt(e),
            s = l.length;
          if (("mouseup" === e.type && (s = 0), 2 === s)) return (X = null), !0;
          1 === s && ze(Qe, l[0]),
            0 !== s ||
              $ ||
              Q ||
              (t ||
                ("mouseup" === e.type
                  ? (t = { x: e.pageX, y: e.pageY, type: "mouse" })
                  : e.changedTouches &&
                    e.changedTouches[0] &&
                    (t = {
                      x: e.changedTouches[0].pageX,
                      y: e.changedTouches[0].pageY,
                      type: "touch",
                    })),
              be("touchRelease", e, t));
          var r = -1;
          if (
            (0 === s &&
              ((D = !1),
              me.unbind(window, m, n),
              pt(),
              Y ? (r = 0) : -1 !== ot && (r = ye() - ot)),
            (ot = 1 === s ? ye() : -1),
            (a = -1 !== r && r < 150 ? "zoom" : "swipe"),
            Y &&
              s < 2 &&
              ((Y = !1),
              1 === s && (a = "zoomPointerUp"),
              be("zoomGestureEnded")),
            (X = null),
            F || q || Q || Z)
          )
            if ((We(), S || (S = Mt()), S.calculateSwipeSpeed("x"), Z)) {
              if (_t() < o.verticalDragRange) n.close();
              else {
                var c = se.y,
                  p = ie;
                Be(
                  "verticalDrag",
                  0,
                  1,
                  300,
                  me.easing.cubic.out,
                  function (e) {
                    (se.y = (n.currItem.initialPosition.y - c) * e + c),
                      we((1 - p) * e + p),
                      Le();
                  }
                ),
                  be("onVerticalDrag", 1);
              }
            } else {
              if ((W || Q) && 0 === s) {
                var d = Je.x - Qe.x;
                if (zt(a, d, S)) return;
                a = "zoomPointerUp";
              }
              Q ||
                ("swipe" === a ? !W && v > n.currItem.fitRatio && Vt(S) : At());
            }
        },
        Mt = function () {
          var e,
            t,
            i = {
              lastFlickOffset: {},
              lastFlickDist: {},
              lastFlickSpeed: {},
              slowDownRatio: {},
              slowDownRatioReverse: {},
              speedDecelerationRatio: {},
              speedDecelerationRatioAbs: {},
              distanceOffset: {},
              backAnimDestination: {},
              backAnimStarted: {},
              calculateSwipeSpeed: function (a) {
                tt.length > 1
                  ? ((e = ye() - O + 50), (t = tt[tt.length - 2][a]))
                  : ((e = ye() - T), (t = Qe[a])),
                  (i.lastFlickOffset[a] = Je[a] - t),
                  (i.lastFlickDist[a] = Math.abs(i.lastFlickOffset[a])),
                  i.lastFlickDist[a] > 20
                    ? (i.lastFlickSpeed[a] = i.lastFlickOffset[a] / e)
                    : (i.lastFlickSpeed[a] = 0),
                  Math.abs(i.lastFlickSpeed[a]) < 0.1 &&
                    (i.lastFlickSpeed[a] = 0),
                  (i.slowDownRatio[a] = 0.95),
                  (i.slowDownRatioReverse[a] = 1 - i.slowDownRatio[a]),
                  (i.speedDecelerationRatio[a] = 1);
              },
              calculateOverBoundsAnimOffset: function (e, t) {
                i.backAnimStarted[e] ||
                  (se[e] > G.min[e]
                    ? (i.backAnimDestination[e] = G.min[e])
                    : se[e] < G.max[e] && (i.backAnimDestination[e] = G.max[e]),
                  void 0 !== i.backAnimDestination[e] &&
                    ((i.slowDownRatio[e] = 0.7),
                    (i.slowDownRatioReverse[e] = 1 - i.slowDownRatio[e]),
                    i.speedDecelerationRatioAbs[e] < 0.05 &&
                      ((i.lastFlickSpeed[e] = 0),
                      (i.backAnimStarted[e] = !0),
                      Be(
                        "bounceZoomPan" + e,
                        se[e],
                        i.backAnimDestination[e],
                        t || 300,
                        me.easing.sine.out,
                        function (t) {
                          (se[e] = t), Le();
                        }
                      ))));
              },
              calculateAnimOffset: function (e) {
                i.backAnimStarted[e] ||
                  ((i.speedDecelerationRatio[e] =
                    i.speedDecelerationRatio[e] *
                    (i.slowDownRatio[e] +
                      i.slowDownRatioReverse[e] -
                      (i.slowDownRatioReverse[e] * i.timeDiff) / 10)),
                  (i.speedDecelerationRatioAbs[e] = Math.abs(
                    i.lastFlickSpeed[e] * i.speedDecelerationRatio[e]
                  )),
                  (i.distanceOffset[e] =
                    i.lastFlickSpeed[e] *
                    i.speedDecelerationRatio[e] *
                    i.timeDiff),
                  (se[e] += i.distanceOffset[e]));
              },
              panAnimLoop: function () {
                if (
                  qe.zoomPan &&
                  ((qe.zoomPan.raf = M(i.panAnimLoop)),
                  (i.now = ye()),
                  (i.timeDiff = i.now - i.lastNow),
                  (i.lastNow = i.now),
                  i.calculateAnimOffset("x"),
                  i.calculateAnimOffset("y"),
                  Le(),
                  i.calculateOverBoundsAnimOffset("x"),
                  i.calculateOverBoundsAnimOffset("y"),
                  i.speedDecelerationRatioAbs.x < 0.05 &&
                    i.speedDecelerationRatioAbs.y < 0.05)
                )
                  return (
                    (se.x = Math.round(se.x)),
                    (se.y = Math.round(se.y)),
                    Le(),
                    void Ne("zoomPan")
                  );
              },
            };
          return i;
        },
        Vt = function (e) {
          if (
            (e.calculateSwipeSpeed("y"),
            (G = n.currItem.bounds),
            (e.backAnimDestination = {}),
            (e.backAnimStarted = {}),
            Math.abs(e.lastFlickSpeed.x) <= 0.05 &&
              Math.abs(e.lastFlickSpeed.y) <= 0.05)
          )
            return (
              (e.speedDecelerationRatioAbs.x = e.speedDecelerationRatioAbs.y =
                0),
              e.calculateOverBoundsAnimOffset("x"),
              e.calculateOverBoundsAnimOffset("y"),
              !0
            );
          Ue("zoomPan"), (e.lastNow = ye()), e.panAnimLoop();
        },
        zt = function (e, t, i) {
          var a, l, s;
          if (
            ((U.popup.caption_transition_delay = 0),
            Q || (at = c),
            "swipe" === e)
          ) {
            var r = i.lastFlickDist.x < 10;
            t > 30 && (r || i.lastFlickOffset.x > 20)
              ? (l = -1)
              : t < -30 && (r || i.lastFlickOffset.x < -20) && (l = 1);
          }
          l &&
            ((c += l) < 0
              ? ((c = o.loop ? Rt() - 1 : 0), (s = !0))
              : c >= Rt() && ((c = o.loop ? 0 : Rt() - 1), (s = !0)),
            (s && !o.loop) || ((ue += l), (ce -= l), (a = !0)));
          var p,
            d = de.x * ce,
            m = Math.abs(d - lt.x);
          return (
            (p =
              (a || d > lt.x == i.lastFlickSpeed.x > 0) &&
              Math.abs(i.lastFlickSpeed.x) > 0
                ? Math.max(Math.min(m / Math.abs(i.lastFlickSpeed.x), 400), 250)
                : 333),
            at === c && (a = !1),
            (Q = !0),
            a && U.popup.toggle_timer(!1),
            Be("mainScroll", lt.x, d, p, me.easing.cubic.out, Me, function () {
              We(),
                (Q = !1),
                (at = -1),
                (a || at !== c) && n.updateCurrItem(),
                be("mainScrollAnimComplete");
            }),
            a && n.updateCurrItem(!0),
            a
          );
        },
        jt = function (e) {
          return (1 / K) * e * g;
        },
        At = function () {
          var e = v,
            t = Oe(),
            i = Se();
          v < t ? (e = t) : v > i && (e = i);
          var a,
            o = ie;
          return te && !R && !ae && v < t
            ? (n.close(), !0)
            : (te &&
                (a = function (e) {
                  we((1 - o) * e + o);
                }),
              n.zoomTo(e, 0, 200, me.easing.cubic.out, a),
              !0);
        };
      ge("Gestures", {
        publicMethods: {
          initGestures: function () {
            var e = function (e, t, i, a, n) {
              (y = e + t), (w = e + i), (C = e + a), (L = n ? e + n : "");
            };
            (H = E.pointerEvent) && E.touch && (E.touch = !1),
              H
                ? e("pointer", "down", "move", "up", "cancel")
                : E.touch
                ? (e("touch", "start", "move", "end", "cancel"), (k = !0))
                : e("mouse", "down", "move", "up"),
              (m = w + " " + C + " " + L),
              (u = y),
              H && !k && (k = B.is_touch),
              (n.likelyTouchDevice = k),
              (f[y] = Ct),
              (f[w] = Lt),
              (f[C] = kt),
              L && (f[L] = f[C]),
              E.dual_input &&
                ((u += " mousedown"),
                (m += " mousemove mouseup"),
                (f.mousedown = f[y]),
                (f.mousemove = f[w]),
                (f.mouseup = f[C])),
              k || (o.allowPanToNext = !1);
          },
        },
      });
      var Et,
        It,
        Tt,
        Ot,
        St,
        Rt,
        Zt = function (t, i, a, l) {
          var s;
          Et && clearTimeout(Et),
            (Ot = !0),
            (Tt = !0),
            t.initialLayout
              ? ((s = t.initialLayout), (t.initialLayout = null))
              : (s = o.getThumbBoundsFn && o.getThumbBoundsFn(c, a));
          var p = a ? o.hideAnimationDuration : o.showAnimationDuration,
            d = function () {
              Ne("initialZoom"),
                a
                  ? (n.template.removeAttribute("style"),
                    U.popup.bg.style.removeProperty("opacity"))
                  : (we(1),
                    i && (i.style.display = "block"),
                    e.classList.add("pswp--animated-in")),
                be("initialZoom" + (a ? "OutEnd" : "InEnd")),
                l && l(),
                (Ot = !1);
            };
          if (!p || !s || void 0 === s.x)
            return (
              be("initialZoom" + (a ? "Out" : "In")),
              a
                ? (e.style.opacity = 0)
                : ((v = t.initialZoomLevel),
                  ze(se, t.initialPosition),
                  Le(),
                  (e.style.opacity = 1),
                  we(1)),
              void (p
                ? setTimeout(function () {
                    d();
                  }, p)
                : d())
            );
          var m, u;
          (m = r),
            (u = !n.currItem.src || n.currItem.loadError || o.showHideOpacity),
            t.miniImg && (t.miniImg.style.webkitBackfaceVisibility = "hidden"),
            a ||
              ((v = s.w / t.w),
              (se.x = s.x),
              (se.y = s.y - j),
              (U.popup[u ? "pswp" : "bg"].style.opacity = 0.001),
              Le()),
            Ue("initialZoom"),
            a && !m && e.classList.remove("pswp--animated-in"),
            u &&
              (a
                ? me.toggle_class(e, "pswp--animate_opacity", !m)
                : setTimeout(function () {
                    e.classList.add("pswp--animate_opacity");
                  }, 30)),
            (Et = setTimeout(
              function () {
                if ((be("initialZoom" + (a ? "Out" : "In")), a)) {
                  var i = s.w / t.w,
                    n = { x: se.x, y: se.y },
                    o = v,
                    l = ie,
                    r = function (t) {
                      1 === t
                        ? ((v = i), (se.x = s.x), (se.y = s.y - A))
                        : ((v = (i - o) * t + o),
                          (se.x = (s.x - n.x) * t + n.x),
                          (se.y = (s.y - A - n.y) * t + n.y)),
                        Le(),
                        u ? (e.style.opacity = 1 - t) : we(l - t * l);
                    };
                  m
                    ? Be("initialZoom", 0, 1, p, me.easing.cubic.out, r, d)
                    : (r(1), (Et = setTimeout(d, p + 20)));
                } else
                  (v = t.initialZoomLevel),
                    ze(se, t.initialPosition),
                    Le(),
                    we(1),
                    u ? (e.style.opacity = 1) : we(1),
                    (Et = setTimeout(d, p + 20));
              },
              a ? 10 : 20
            ));
        },
        Dt = {},
        Pt = [],
        qt = {
          index: 0,
          errorMsg:
            '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
          preload: [1, 1],
          getNumItemsFn: function () {
            return It.length;
          },
        },
        Ft = function (e, t, i) {
          if (e.src && !e.loadError) {
            var a = !i;
            if (((Dt.x = t.x), (Dt.y = t.y), a)) {
              var n = Dt.x / e.w,
                o = Dt.y / e.h;
              (e.fitRatio = n < o ? n : o),
                (i = e.fitRatio) > 1 && (i = 1),
                (e.initialZoomLevel = i),
                e.bounds ||
                  (e.bounds = {
                    center: { x: 0, y: 0 },
                    max: { x: 0, y: 0 },
                    min: { x: 0, y: 0 },
                  });
            }
            if (!i) return;
            return (
              (function (e, t, i) {
                var a = e.bounds;
                (a.center.x = Math.round((Dt.x - t) / 2)),
                  (a.center.y = Math.round((Dt.y - i) / 2)),
                  (a.max.x = t > Dt.x ? Math.round(Dt.x - t) : a.center.x),
                  (a.max.y = i > Dt.y ? Math.round(Dt.y - i) : a.center.y),
                  (a.min.x = t > Dt.x ? 0 : a.center.x),
                  (a.min.y = i > Dt.y ? 0 : a.center.y);
              })(e, e.w * i, e.h * i),
              a &&
                i === e.initialZoomLevel &&
                (e.initialPosition = e.bounds.center),
              e.bounds
            );
          }
          return (
            (e.w = e.h = 0),
            (e.initialZoomLevel = e.fitRatio = 1),
            (e.bounds = {
              center: { x: 0, y: 0 },
              max: { x: 0, y: 0 },
              min: { x: 0, y: 0 },
            }),
            (e.initialPosition = e.bounds.center),
            e.bounds
          );
        },
        Nt = function (e, t, i, a, o, l) {
          t.loadError ||
            (a &&
              ((t.imageAppended = !0),
              Bt(t, a, t === n.currItem && ve),
              i.appendChild(a),
              l &&
                setTimeout(function () {
                  t &&
                    t.loaded &&
                    t.placeholder &&
                    ((t.placeholder.style.display = "none"),
                    (t.placeholder = null));
                }, 500)));
        },
        Ut = function (e) {
          (e.loading = !0), (e.loaded = !1);
          var t = (e.img = me.createEl("pswp__img", "img")),
            i = function () {
              (e.loading = !1),
                (e.loaded = !0),
                e.loadComplete ? e.loadComplete(e) : (e.img = null),
                (t.onload = t.onerror = null),
                (t = null);
            };
          return (
            (t.onload = i),
            (t.onerror = function () {
              (e.loadError = !0), i();
            }),
            (t.src = e.src),
            t
          );
        },
        Wt = function (e, t) {
          if (e.src && e.loadError && e.container)
            return (
              t && me.resetEl(e.container),
              (e.container.innerHTML = o.errorMsg.replace("%url%", e.src)),
              !0
            );
        },
        Bt = function (e, t, i) {
          if (e.src) {
            t || (t = e.container.lastElementChild);
            var a = i ? e.w : Math.round(e.w * e.fitRatio),
              n = i ? e.h : Math.round(e.h * e.fitRatio);
            e.placeholder &&
              !e.loaded &&
              ((e.placeholder.style.width = a + "px"),
              (e.placeholder.style.height = n + "px")),
              (t.style.width = a + "px"),
              (t.style.height = n + "px");
          }
        },
        Xt = function () {
          if (Pt.length) {
            for (var e, t = 0; t < Pt.length; t++)
              (e = Pt[t]).holder.index === e.index &&
                Nt(e.index, e.item, e.baseDiv, e.img, 0, e.clearPlaceholder);
            Pt = [];
          }
        };
      ge("Controller", {
        publicMethods: {
          lazyLoadItem: function (e) {
            e = _e(e);
            var t = St(e);
            t &&
              ((!t.loaded && !t.loading) || h) &&
              (be("gettingData", e, t), t.src && Ut(t));
          },
          initController: function () {
            me.copy_unique(o, qt),
              (n.items = It = i),
              (St = n.getItemAt),
              (Rt = o.getNumItemsFn),
              o.loop,
              Rt() < 3 && (o.loop = !1),
              xe("beforeChange", function (e) {
                var t,
                  i = o.preload,
                  a = null === e || e >= 0,
                  l = Math.min(i[0], Rt()),
                  s = Math.min(i[1], Rt());
                for (t = 1; t <= (a ? s : l); t++) n.lazyLoadItem(c + t);
                for (t = 1; t <= (a ? l : s); t++) n.lazyLoadItem(c - t);
              }),
              xe("initialLayout", function () {
                n.currItem.initialLayout =
                  o.getThumbBoundsFn && o.getThumbBoundsFn(c);
              }),
              xe("mainScrollAnimComplete", Xt),
              xe("initialZoomInEnd", Xt),
              xe("destroy", function () {
                for (var e, t = 0; t < It.length; t++)
                  (e = It[t]).container && (e.container = null),
                    e.placeholder && (e.placeholder = null),
                    e.img && (e.img = null),
                    e.preloader && (e.preloader = null),
                    e.loadError && (e.loaded = e.loadError = !1);
                Pt = null;
              });
          },
          getItemAt: function (e) {
            return e >= 0 && void 0 !== It[e] && It[e];
          },
          setContent: function (e, t) {
            o.loop && (t = _e(t));
            var i = n.getItemAt(e.index);
            i && (i.container = null);
            var a,
              s = n.getItemAt(t);
            if (s) {
              be("gettingData", t, s), (e.index = t), (e.item = s);
              var r = (s.container = me.createEl("pswp__zoom-wrap"));
              if (
                (!s.src &&
                  s.html &&
                  (s.html.tagName
                    ? r.appendChild(s.html)
                    : (r.innerHTML = s.html)),
                Wt(s),
                Ft(s, re),
                !s.src || s.loadError || s.loaded)
              )
                s.src &&
                  !s.loadError &&
                  (((a = me.createEl("pswp__img", "img")).style.opacity = 1),
                  (a.src = s.src),
                  Bt(s, a),
                  Nt(0, s, r, a));
              else {
                s.loadComplete = function (i) {
                  if (l) {
                    if (e && e.index === t) {
                      if (Wt(i, !0))
                        return (
                          (i.loadComplete = i.img = null),
                          Ft(i, re),
                          He(i),
                          void (e.index === c && n.updateCurrZoomItem())
                        );
                      i.imageAppended
                        ? !Ot &&
                          i.placeholder &&
                          ((i.placeholder.style.display = "none"),
                          (i.placeholder = null))
                        : Q || Ot
                        ? Pt.push({
                            item: i,
                            baseDiv: r,
                            img: i.img,
                            index: t,
                            holder: e,
                            clearPlaceholder: !0,
                          })
                        : Nt(0, i, r, i.img, 0, !0);
                    }
                    (i.loadComplete = null),
                      (i.img = null),
                      be("imageLoadComplete", t, i);
                  }
                };
                var p = s.msrc && (s.msrc !== s.src || !Tt),
                  d = me.createEl(
                    "pswp__img pswp__img--placeholder" +
                      (p ? "" : " pswp__img--placeholder--blank"),
                    p ? "img" : ""
                  );
                p && (d.src = s.msrc),
                  Bt(s, d),
                  r.appendChild(d),
                  (s.placeholder = d),
                  s.loading || Ut(s),
                  Tt
                    ? Nt(0, s, r, s.img, 0, !0)
                    : Pt.push({
                        item: s,
                        baseDiv: r,
                        img: s.img,
                        index: t,
                        holder: e,
                      });
              }
              Tt || t !== c ? He(s) : ((J = r.style), Zt(s, a || s.img)),
                me.resetEl(e.el),
                e.el.appendChild(r);
            } else me.resetEl(e.el);
          },
          cleanSlide: function (e) {
            e.img && (e.img.onload = e.img.onerror = null),
              (e.loaded = e.loading = e.img = e.imageAppended = !1);
          },
        },
      });
      var Yt,
        Kt,
        Gt = {},
        Jt = function (e, t, i) {
          var a = document.createEvent("CustomEvent"),
            n = {
              origEvent: e,
              pointerType: i || "touch",
              releasePoint: t,
              target: e.target,
              rightClick: "mouse" === i && 3 === e.which,
            };
          a.initCustomEvent("pswpTap", !0, !0, n), e.target.dispatchEvent(a);
        };
      ge("Tap", {
        publicMethods: {
          initTap: function () {
            xe("firstTouchStart", n.onTapStart),
              xe("touchRelease", n.onTapRelease),
              xe("destroy", function () {
                (Gt = {}), (Yt = null);
              });
          },
          onTapStart: function (e) {
            e.length > 1 && (clearTimeout(Yt), (Yt = null));
          },
          onTapRelease: function (e, t) {
            var i, a;
            if (
              t &&
              !F &&
              !P &&
              !Fe &&
              (!H || U.popup.container.contains(e.target))
            ) {
              var n = t;
              if (
                Yt &&
                (clearTimeout(Yt),
                (Yt = null),
                (i = n),
                (a = Gt),
                Math.abs(i.x - a.x) < 25 && Math.abs(i.y - a.y) < 25)
              )
                return void be("doubleTap", n);
              if ("mouse" === t.type) return void Jt(e, t, "mouse");
              if ("A" === e.target.tagName) return;
              if (
                "BUTTON" === e.target.tagName ||
                e.target.classList.contains("pswp__single-tap")
              )
                return void Jt(e, t);
              ze(Gt, n),
                (Yt = setTimeout(function () {
                  Jt(e, t), (Yt = null);
                }, 300));
            }
          },
        },
      }),
        ge("DesktopZoom", {
          publicMethods: {
            initDesktopZoom: function () {
              B.is_dual_input
                ? xe("mouseUsed", function () {
                    n.setupDesktopZoom();
                  })
                : B.is_pointer && n.setupDesktopZoom(!0);
            },
            setupDesktopZoom: function (t) {
              Kt = {};
              var i = "wheel mousewheel DOMMouseScroll";
              xe("bindEvents", function () {
                me.bind(e, i, n.handleMouseWheel);
              }),
                xe("unbindEvents", function () {
                  Kt && me.unbind(e, i, n.handleMouseWheel);
                }),
                (n.mouseZoomedIn = !1);
              var a,
                o = function () {
                  n.mouseZoomedIn &&
                    (e.classList.remove("pswp--zoomed-in"),
                    (n.mouseZoomedIn = !1)),
                    me.toggle_class(e, "pswp--zoom-allowed", v < 1),
                    l();
                },
                l = function () {
                  a && (e.classList.remove("pswp--dragging"), (a = !1));
                };
              xe("resize", o),
                xe("afterChange", o),
                xe("pointerDown", function () {
                  n.mouseZoomedIn &&
                    ((a = !0), e.classList.add("pswp--dragging"));
                }),
                xe("pointerUp", l),
                t || o();
            },
            handleMouseWheel: function (e) {
              if (v <= n.currItem.fitRatio)
                return (
                  !o.closeOnScroll || Fe || D
                    ? e.preventDefault()
                    : Math.abs(e.deltaY) > 2 && ((r = !0), n.close()),
                  !0
                );
              if ((e.stopPropagation(), (Kt.x = 0), "deltaX" in e))
                1 === e.deltaMode
                  ? ((Kt.x = 18 * e.deltaX), (Kt.y = 18 * e.deltaY))
                  : ((Kt.x = e.deltaX), (Kt.y = e.deltaY));
              else if ("wheelDelta" in e)
                e.wheelDeltaX && (Kt.x = -0.16 * e.wheelDeltaX),
                  e.wheelDeltaY
                    ? (Kt.y = -0.16 * e.wheelDeltaY)
                    : (Kt.y = -0.16 * e.wheelDelta);
              else {
                if (!("detail" in e)) return;
                Kt.y = e.detail;
              }
              Te(v, !0);
              var t = se.x - Kt.x,
                i = se.y - Kt.y;
              e.preventDefault(), n.panTo(t, i);
            },
            toggleDesktopZoom: function (t) {
              t = t || { x: re.x / 2 + pe.x, y: re.y / 2 + pe.y };
              var i = o.getDoubleTapZoom(!0, n.currItem),
                a = v === i;
              (n.mouseZoomedIn = !a),
                n.zoomTo(a ? n.currItem.initialZoomLevel : i, t, 333),
                me.toggle_class(e, "pswp--zoomed-in", !a);
            },
          },
        });
      var Qt,
        $t,
        ei,
        ti,
        ii,
        ai,
        ni,
        oi,
        li,
        si,
        ri = { history: !0 },
        ci = function () {
          return si.hash.substring(1);
        },
        pi = function () {
          Qt && clearTimeout(Qt), ei && clearTimeout(ei);
        },
        di = function () {
          if ((ei && clearTimeout(ei), Fe || D)) ei = setTimeout(di, 500);
          else {
            ti ? clearTimeout($t) : (ti = !0);
            var e = c + 1,
              t = St(c);
            t.hasOwnProperty("pid") && (e = t.pid);
            var i = (ai ? ai + "&" : "") + "pid=" + e;
            ni || (-1 === si.hash.indexOf(i) && (li = !0));
            var a = si.href.split("#")[0] + "#" + i;
            "#" + i !== window.location.hash &&
              history[ni ? "replaceState" : "pushState"]("", document.title, a),
              (ni = !0),
              ($t = setTimeout(function () {
                ti = !1;
              }, 60));
          }
        };
      ge("History", {
        publicMethods: {
          initHistory: function () {
            if ((me.copy_unique(o, ri), o.history)) {
              (si = window.location),
                (li = !1),
                (oi = !1),
                (ni = !1),
                (ai = ci()),
                xe("afterChange", n.updateURL),
                xe("unbindEvents", function () {
                  me.unbind(window, "hashchange", n.onHashChange);
                }),
                history.scrollRestoration &&
                  (history.scrollRestoration = "manual");
              var e = function () {
                (ii = !0),
                  oi ||
                    (li
                      ? history.back()
                      : ai
                      ? (si.hash = ai)
                      : history.pushState(
                          "",
                          document.title,
                          si.pathname + si.search
                        )),
                  pi(),
                  history.scrollRestoration &&
                    (history.scrollRestoration = "auto");
              };
              xe("unbindEvents", function () {
                r && e();
              }),
                xe("destroy", function () {
                  ii || e();
                });
              var t = ai.indexOf("pid=");
              t > -1 &&
                "&" === (ai = ai.substring(0, t)).slice(-1) &&
                (ai = ai.slice(0, -1)),
                setTimeout(function () {
                  l && me.bind(window, "hashchange", n.onHashChange);
                }, 40);
            }
          },
          onHashChange: function () {
            if (ci() === ai) return (oi = !0), void n.close();
          },
          updateURL: function () {
            pi(), ni ? (Qt = setTimeout(di, 800)) : di();
          },
        },
      }),
        Object.assign(n, Xe);
    };
  function fe() {
    function e(e) {
      setTimeout(function () {
        e && e.remove();
      }, 100);
    }
    [".modal-body", "#files"].forEach(function (t) {
      yall({
        observeChanges: !0,
        observeRootSelector: t,
        lazyClass: "files-lazy",
        threshold: 300,
        events: {
          load: function (t) {
            var i = t.target;
            if (i.classList.contains("files-folder-preview")) {
              var a = i.naturalWidth;
              return a && 1 === a ? e(i) : (i.style.opacity = 1);
            }
            i.classList.remove("files-img-placeholder"),
              i.parentElement.classList.add("files-a-loaded");
          },
          error: {
            listener: function (t) {
              var i = t.target;
              i.classList.contains("files-folder-preview") && e(i);
            },
          },
        },
      });
    }),
      _query(".preloader-body").remove(),
      document.body.classList.remove("body-loading"),
      !_c.prevent_right_click &&
        _c.context_menu &&
        (W.files_container &&
          W.files_container.addEventListener("contextmenu", function (e) {
            var t = e.target.closest(".files-a");
            F.create_contextmenu(
              e,
              "files",
              t || W.files_container,
              t ? _c.files[t.dataset.name] : _c.current_dir
            );
          }),
        W.sidebar_menu &&
          W.sidebar_menu.addEventListener("contextmenu", function (e) {
            var t = e.target.closest(".menu-li");
            F.create_contextmenu(
              e,
              "sidebar",
              t || W.sidebar_menu,
              _c.dirs[t ? t.dataset.path : ""]
            );
          })),
      anime({
        targets: document.body,
        opacity: [0, 1],
        duration: 500,
        easing: "easeOutQuad",
        complete: F.init_files,
      });
  }
  !(function () {
    if (_c.menu_exists) {
      (W.sidebar = _id("sidebar")),
        (W.sidebar_inner = _id("sidebar-inner")),
        (W.sidebar_menu = _id("sidebar-menu")),
        (W.sidebar_toggle = _id("sidebar-toggle")),
        (W.sidebar_modal = _id("sidebar-bg")),
        (W.sidebar_topbar = _id("sidebar-topbar"));
      var e,
        t,
        n,
        o,
        l,
        s = !1,
        c = !1,
        p = {},
        d = !1,
        m = I.get_json("files:interface:menu-expanded:" + _c.location_hash),
        u = _c.menu_show && matchMedia("(min-width: 992px)").matches;
      u || document.documentElement.classList.add("sidebar-closed"),
        (F.menu_loading = function (e, t) {
          e || (e = c), e && e.classList.toggle("menu-spinner", t);
        }),
        (F.set_menu_active = function (e) {
          var t = c,
            i = !!_c.dirs[e] && _c.dirs[e].menu_li;
          (c = !!i && i.firstChild) != t &&
            (t && F.menu_loading(t, !1), g(t, !1), g(c, !0));
        }),
        (W.sidebar_toggle.innerHTML = F.get_svg_icon_multi(
          "menu",
          "menu_back"
        )),
        w(W.sidebar_toggle, x, "click"),
        w(W.sidebar_modal, x, "click"),
        (F.create_menu = V);
      var f = I.get_json("files:menu:" + _c.menu_cache_hash),
        v = _c.menu_cache_validate || (_c.cache && !_c.menu_cache_file);
      !(
        !f ||
        (v &&
          !(function () {
            for (var e = f.length, t = 0; t < e; t++)
              if (f[t].path.includes("/")) return !1;
            return !0;
          })())
      )
        ? V(
            f,
            "menu from localstorage [" +
              (_c.menu_cache_validate
                ? "shallow menu"
                : "menu cache validation disabled") +
              "]"
          )
        : (W.sidebar_menu.classList.add("sidebar-spinner"),
          (W.sidebar_menu.dataset.title = K.get("loading")),
          T({
            params:
              !_c.menu_cache_file &&
              "action=dirs" +
                (_c.cache ? "&menu_cache_hash=" + _c.menu_cache_hash : "") +
                (f ? "&localstorage=1" : ""),
            url: _c.menu_cache_file,
            json_response: !0,
            complete: function (e, t, i) {
              if (
                (W.sidebar_menu.classList.remove("sidebar-spinner"),
                delete W.sidebar_menu.dataset.title,
                !i || !e || e.error || !Object.keys(e).length)
              )
                return Q(), void j("Error or no dirs!");
              e.localstorage
                ? V(f, "menu from localstorage")
                : (V(
                    e,
                    "menu from " +
                      (_c.menu_cache_file
                        ? "JSON cache: " + _c.menu_cache_file
                        : "xmlhttp")
                  ),
                  B.local_storage &&
                    setTimeout(function () {
                      F.clean_localstorage(),
                        I.set("files:menu:" + _c.menu_cache_hash, t);
                    }, 1e3));
            },
          }));
    }
    function g(e, t) {
      if (e && e.isConnected) {
        e.classList.toggle("menu-active", t);
        for (
          var i = e.parentElement.parentElement.parentElement;
          "LI" === i.nodeName;

        )
          i.classList.toggle("menu-active-ancestor", t),
            (i = i.parentElement.parentElement);
      }
    }
    function _(t, i) {
      if ("all" === t)
        i
          ? M(n, function (e) {
              p[e.dataset.path] = !0;
            })
          : (p = {});
      else {
        var a = t.dataset.path;
        i ? (p[a] = !0) : p[a] && delete p[a];
      }
      var o = Object.keys(p).length,
        l = o === n.length;
      d !== l &&
        ((d = l),
        B.is_pointer && (e.title = K.get(d ? "collapse menu" : "expand menu")),
        e.classList.toggle("is-expanded", d)),
        B.local_storage &&
          (s && clearTimeout(s),
          (s = setTimeout(function () {
            I.set(
              "files:interface:menu-expanded:" + _c.location_hash,
              !!o && JSON.stringify(p),
              !0
            );
          }, 1e3)));
    }
    function h(e, t, i) {
      var a = e.lastChild;
      (a.style.display = "block"), anime.remove(a);
      var n = {
        targets: a,
        translateY: t ? [-5, 0] : -5,
        height: [a.clientHeight + "px", t ? a.scrollHeight + "px" : 0],
        opacity: t ? 1 : 0,
        easing: "easeOutQuint",
        duration: 250,
        complete: function () {
          (a.style.cssText = "--depth:" + (e.dataset.level || 0)), i && i();
        },
      };
      anime(n), e.classList.toggle("menu-li-open", t);
    }
    function x(e) {
      F.set_config("menu_show", !_c.menu_show),
        document.documentElement.classList.toggle("sidebar-closed"),
        (u = !u);
    }
    function b(e, t) {
      for (var i = "", a = 0; a < t; a++) i += e;
      return i;
    }
    function L(e, t) {
      var n = "menu-li",
        o = "menu-a",
        l = e.path ? (e.path.match(/\//g) || []).length + 1 : 0,
        s = "folder" + (e.is_readable ? (e.is_link ? "_link" : "") : "_forbid");
      return (
        t
          ? ((n += " has-ul"),
            m && m[e.path] && ((n += " menu-li-open"), (p[e.path] = !0)))
          : e.is_readable || (o += " menu-a-forbidden"),
        '<li data-level="' +
          l +
          '" data-path="' +
          i(e.path) +
          '" class="' +
          n +
          '"><a href="' +
          r(e) +
          '" class="' +
          o +
          '">' +
          (t
            ? F.get_svg_icon_multi_class(
                "menu-icon menu-icon-toggle",
                "plus",
                "minus"
              )
            : "") +
          (t
            ? F.get_svg_icon_multi_class(
                "menu-icon menu-icon-folder menu-icon-folder-toggle",
                s,
                "folder_plus",
                "folder_minus"
              )
            : F.get_svg_icon_class(s, "menu-icon menu-icon-folder")) +
          a(e.basename) +
          "</a>"
      );
    }
    function V(i, a) {
      var s, r;
      if (
        (Q(),
        j(a, i),
        M(i, (e) => {
          _c.dirs[e.path] || (_c.dirs[e.path] = e);
        }),
        (function (e) {
          var t = "",
            i = 0,
            a = 0,
            n = !1;
          M(e, function (e, o) {
            var l = e.path;
            if (l) {
              var s = (l.match(/\//g) || []).length + 1,
                r = s - i;
              (i = s),
                (a += r),
                n && (t += L(n, r > 0)),
                (t +=
                  r > 0
                    ? '<ul style="--depth:' +
                      (a - 1) +
                      '" class="menu-' +
                      (n ? "ul" : "root") +
                      '">'
                    : "</li>" + b("</ul></li>", -r)),
                (n = _c.dirs[l]);
            }
          }),
            (t += L(n, !1) + b("</li></ul>", a)),
            (W.sidebar_menu.innerHTML = t);
        })(i),
        (t = W.sidebar_menu.firstChild),
        (n = _class("has-ul", t)),
        (o = n.length ? k(Array.from(t.children), "has-ul", !0) : []),
        (s = o),
        (l = n.filter(function (e) {
          return !s.includes(e);
        })),
        M(_class("menu-li", t), function (e) {
          var t = _c.dirs[e.dataset.path];
          t && (t.menu_li = e);
        }),
        F.set_menu_active(_c.current_path || _c.init_path),
        B.local_storage &&
          ((W.sidebar_menu.scrollTop =
            I.get("files:interface:menu_scroll:" + _c.location_hash) || 0),
          w(
            W.sidebar_menu,
            C(function () {
              I.set(
                "files:interface:menu_scroll:" + _c.location_hash,
                W.sidebar_menu.scrollTop,
                !0
              );
            }, 1e3),
            "scroll"
          )),
        n.length &&
          ((r = !1),
          (d = Object.keys(p).length === n.length),
          (W.sidebar_topbar.innerHTML =
            '<button id="menu-toggle" type="button" class="btn-icon' +
            (d ? " is-expanded" : "") +
            '">' +
            F.get_svg_icon_multi("plus", "minus") +
            "</button>"),
          w(
            (e = W.sidebar_topbar.lastElementChild),
            function (e) {
              if (d) {
                var t = [],
                  i = [],
                  a = !1,
                  s = window.innerHeight;
                M(o, function (e) {
                  if (e.classList.contains("menu-li-open"))
                    if (a) t.push(e);
                    else {
                      var n = e.getBoundingClientRect();
                      n.top > s || n.bottom - n.top > 2 * s
                        ? (t.push(e), (a = !0))
                        : i.push(e);
                    }
                }),
                  t.length &&
                    M(t, function (e) {
                      e.classList.remove("menu-li-open");
                    }),
                  i.length &&
                    M(i, function (e) {
                      h(e, !1);
                    }),
                  r && clearTimeout(r),
                  (r = setTimeout(
                    function () {
                      H(l, "menu-li-open", !1);
                    },
                    i.length ? 260 : 10
                  ));
              } else
                n.length > 100
                  ? H(n, "menu-li-open", !0)
                  : ((t = []),
                    (i = []),
                    (a = !1),
                    (s = window.innerHeight),
                    M(n, function (e) {
                      e.classList.contains("menu-li-open") ||
                        (a || !e.offsetParent
                          ? t.push(e)
                          : e.getBoundingClientRect().top > s ||
                            e.lastChild.childNodes.length > 50
                          ? ((a = !0), t.push(e))
                          : i.push(e));
                    }),
                    t.length &&
                      M(t, function (e) {
                        e.classList.add("menu-li-open");
                      }),
                    i.length &&
                      M(i, function (e) {
                        h(e, !0);
                      }));
              _("all", !d);
            },
            "click"
          )),
        _c.transitions && u)
      ) {
        var m = {
          targets: (function () {
            for (
              var e = [],
                i = t.children,
                a = i.length,
                n = W.sidebar_inner.clientHeight,
                o = 0;
              o < a;
              o++
            ) {
              var l = i[o];
              if (l.getBoundingClientRect().top < n) e.push(l);
              else if (e.length) break;
            }
            return e;
          })(),
          translateY: [-5, 0],
          opacity: [0, 1],
          easing: "easeOutCubic",
          duration: 100,
        };
        (m.delay = anime.stagger(
          R(20, 50, Math.round(200 / m.targets.length))
        )),
          anime(m);
      }
      w(t, function (e) {
        if (U.contextmenu.is_open) return e.preventDefault();
        if (e.target !== t) {
          var i,
            a,
            n,
            o,
            l = "A" === e.target.nodeName,
            s = l ? e.target.parentElement : e.target.closest(".menu-li"),
            r = l ? e.target : s.firstElementChild;
          if (!y(e, r))
            if (l && r !== c)
              F.get_files(s.dataset.path, "push"),
                matchMedia("(min-width: 992px)").matches
                  ? _c.menu_show ||
                    ((i = W.sidebar),
                    (a = "sidebar-clicked"),
                    (n = null),
                    (o = 1e3),
                    i.classList.add(a),
                    n && (i.disabled = n),
                    setTimeout(function () {
                      i.classList.remove([a]), n && (i.disabled = !1);
                    }, o || 2e3))
                  : x();
            else if (!l || s.classList.contains("has-ul")) {
              var p = !s.classList.contains("menu-li-open");
              _(s, p), h(s, p);
            }
        }
      });
    }
  })(),
    (function () {
      function e(e, t) {
        Object.assign(U.sort, {
          sort: e,
          order: t,
          multi: "asc" === t ? 1 : -1,
          index: U.sort.keys.indexOf(e),
          prop: U.sort.sorting[e].prop,
        });
      }
      (U.sort = {
        sorting: {
          name: { prop: "basename", order: "asc" },
          kind: { prop: "ext", order: "asc" },
          size: { prop: "filesize", order: "desc" },
          date: { prop: "mtime", order: "desc" },
        },
      }),
        (U.sort.keys = Object.keys(U.sort.sorting));
      var t = (_c.sort || "name_asc").split("_");
      U.sort.keys.includes(t[0]) || (t[0] = "name"),
        (t[1] && ["asc", "desc"].includes(t[1])) ||
          (t[1] = U.sort.sorting[t[0]].order),
        t.join("_") !== _c.sort && (_c.sort = t.join("_")),
        e(t[0], t[1]);
      var i = _id("change-sort");
      i.innerHTML =
        '<button type="button" class="btn-icon btn-topbar">' +
        F.get_svg_icon("sort_" + U.sort.sort + "_" + U.sort.order) +
        '</button><div class="dropdown-menu dropdown-menu-topbar dropdown-menu-center"><h6 class="dropdown-header" data-lang="sort">' +
        K.get("sort") +
        "</h6>" +
        V(U.sort.keys, function (e) {
          return (
            '<button class="dropdown-item' +
            (e === U.sort.sort ? " active sort-" + U.sort.order : "") +
            '" data-action="' +
            e +
            '">' +
            F.get_svg_icon_multi("menu_down", "menu_up") +
            F.get_svg_icon_multi("sort_" + e + "_asc", "sort_" + e + "_desc") +
            '<span class="dropdown-text" data-lang="' +
            e +
            '">' +
            K.get(e) +
            "</span></button>"
          );
        }) +
        "</div>";
      var a = i.firstChild,
        n = (i.children[1], i.lastChild),
        o = _class("dropdown-item", n);
      function l(e, t) {
        if (_c.sort_dirs_first && e._values.is_dir !== t._values.is_dir)
          return (t._values.is_dir ? 1 : -1) * U.sort.multi;
        var i = e._values[U.sort.prop],
          a = t._values[U.sort.prop];
        return "name" === U.sort.sort || i === a
          ? c(e._values.basename, t._values.basename)
          : i > a
          ? 1
          : -1;
      }
      var s = {
          locale: function (e, t) {
            return r.compare(e, t) || s.basic(e, t);
          },
          basic: function (e, t) {
            var i = e.toLowerCase(),
              a = t.toLowerCase();
            return i === a ? (e > t ? 1 : -1) : i > a ? 1 : -1;
          },
        },
        r = new Intl.Collator(
          _c.sort_function && !["basic", "locale"].includes(_c.sort_function)
            ? _c.sort_function.trim()
            : void 0,
          { numeric: !0, sensitivity: "base" }
        ),
        c = s["basic" === _c.sort_function ? "basic" : "locale"];
      function p(e, t, i) {
        var a = i ? "add" : "remove";
        e &&
          (o[U.sort.index].classList[a]("active"),
          d[U.sort.index].classList[a]("sortbar-active")),
          (e || t) &&
            (o[U.sort.index].classList[a]("sort-" + U.sort.order),
            d[U.sort.index].classList[a]("sort-" + U.sort.order));
      }
      (F.set_sort = function (t) {
        if (t) {
          var i = t !== U.sort.sort,
            n = i
              ? U.sort.sorting[t].order
              : "asc" === U.sort.order
              ? "desc"
              : "asc",
            o = n !== U.sort.order;
          p(i, o, !1),
            e(t, n),
            (a.innerHTML = F.get_svg_icon("sort_" + t + "_" + n)),
            p(i, o, !0),
            F.set_config("sort", U.sort.sort + "_" + U.sort.order);
        }
        _c.debug && console.time("sort"),
          U.list.sort(U.sort.prop, { order: U.sort.order, sortFunction: l }),
          _c.debug && console.timeEnd("sort");
      }),
        F.dropdown(i, a, function () {
          F.set_sort(
            U.sort.keys[
              U.sort.index >= U.sort.keys.length - 1 ? 0 : U.sort.index + 1
            ]
          );
        }),
        m(n, F.set_sort),
        (W.sortbar = _id("files-sortbar")),
        (W.sortbar.className = "sortbar-" + _c.layout),
        (W.sortbar.innerHTML =
          '<div class="sortbar-inner">' +
          V(U.sort.keys, function (e) {
            return (
              '<div class="sortbar-item sortbar-' +
              e +
              (e === U.sort.sort
                ? " sortbar-active sort-" + U.sort.order
                : "") +
              '" data-action="' +
              e +
              '"><span data-lang="' +
              e +
              '" class="sortbar-item-text">' +
              K.get(e) +
              "</span>" +
              F.get_svg_icon_multi("menu_down", "menu_up") +
              "</div>"
            );
          }) +
          "</div>");
      var d = W.sortbar.firstChild.children;
      w(W.sortbar, function (e) {
        var t = e.target.closest("[data-action]");
        t && F.set_sort(t.dataset.action, e);
      });
    })(),
    (function () {
      if (
        ((W.topbar_top = _id("topbar-top")),
        (U.topbar = { info: {} }),
        (W.filter.placeholder = K.get("filter")),
        (W.filter.title = B.c_key + "F"),
        re.hash(),
        W.filter.parentElement.insertAdjacentHTML(
          "beforeend",
          F.get_svg_icon("search")
        ),
        K.dropdown(),
        _c.has_login)
      ) {
        W.topbar_top.insertAdjacentHTML(
          "beforeend",
          '<a href="' +
            location.href.split("?")[0] +
            '?logout" class="btn-icon btn-topbar" id="logout"' +
            x("logout", !0) +
            ">" +
            F.get_svg_icon("logout") +
            "</a>"
        );
        var e = W.topbar_top.lastElementChild;
        w(e, function (t) {
          t.preventDefault(),
            oe.fire(K.get("logout", !0) + "?").then((t) => {
              t.isConfirmed && location.assign(e.href);
            });
        });
      }
      screenfull.isEnabled &&
        (W.topbar_top.insertAdjacentHTML(
          "beforeend",
          '<button class="btn-icon btn-topbar" id="topbar-fullscreen">' +
            F.get_svg_icon_multi("expand", "collapse") +
            "</button>"
        ),
        w(W.topbar_top.lastElementChild, function () {
          screenfull.toggle();
        }),
        screenfull.on("change", function () {
          document.documentElement.classList.toggle(
            "is-fullscreen",
            screenfull.isFullscreen
          );
        })),
        (F.topbar_info = function (e, t) {
          (W.topbar_info.className = "info-" + t),
            (W.topbar_info.innerHTML = e);
        }),
        (F.topbar_info_search = function (e, t) {
          if ((A(W.sortbar, !t), !e))
            return (W.topbar_info.className = "info-hidden");
          W.topbar_info.classList.contains("info-search")
            ? (W.topbar_info.classList.toggle("info-nomatch", !t),
              (W.topbar_info.children[0].textContent = t),
              (W.topbar_info.children[2].textContent = e))
            : F.topbar_info(
                '<span class="info-search-count">' +
                  t +
                  '</span><span class="info-search-lang"><span data-lang="matches found for">' +
                  K.get("matches found for") +
                  '</span></span><span class="info-search-phrase">' +
                  e +
                  '</span><button class="info-search-reset" data-action="reset">' +
                  F.get_svg_icon("close") +
                  "</button>",
                "search" + (t ? "" : " info-nomatch")
              );
        });
    })(),
    _c.config.favicon &&
      document.head.insertAdjacentHTML("beforeend", _c.config.favicon),
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
      ? fe()
      : F.load_plugin("intersection-observer", fe, {
          src: ["intersection-observer@0.12.2/intersection-observer.js"],
        });
})("undefined" == typeof files ? (files = {}) : files);
