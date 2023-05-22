"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Admin_Pages_Gallery_Image_Gallery_List_js"],{

/***/ "./resources/js/components/Admin/Pages/Gallery_Image/Gallery_List.js":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Admin/Pages/Gallery_Image/Gallery_List.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GalleryList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _BreadCrumb_BreadCrumb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BreadCrumb/BreadCrumb */ "./resources/js/components/Admin/BreadCrumb/BreadCrumb.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../api */ "./resources/js/api.js");
/* harmony import */ var _Gallery_Image_Gallerry_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Gallery_Image/Gallerry.css */ "./resources/js/components/Admin/Pages/Gallery_Image/Gallerry.css");
/* harmony import */ var react_lightbox_gallery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-lightbox-gallery */ "./node_modules/react-lightbox-gallery/dist/index.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }













var GalleryList = /*#__PURE__*/function (_React$Component) {
  _inherits(GalleryList, _React$Component);
  var _super = _createSuper(GalleryList);
  function GalleryList(props) {
    var _this;
    _classCallCheck(this, GalleryList);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps, prevState) {
      if (prevProps.data !== _this.props.data) {
        //   var data = [];

        //   Object.entries(this.props.data).map(([ind, val])=>{

        //           data = [...data, {src:val.images, desc:ind, sub:val.title}]

        //   })

        //  this.setState({images:[...data]})

        _this.setState({
          images: _toConsumableArray(_this.props.data)
        });
      }
    });
    _this.state = {
      images: []
    };
    _this.apiCtrl = new _api__WEBPACK_IMPORTED_MODULE_3__["default"]();
    return _this;
  }
  _createClass(GalleryList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // var data = [];

      //     Object.entries(this.props.data).map(([ind, val])=>{

      //       data = [...data, {src:val.images, desc:val.title, sub:val.title}]

      //     })

      // this.setState({images:[...data]})
      this.setState({
        images: _toConsumableArray(this.props.data)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      console.log("state=>", this.state);
      console.log("props=>", this.props);
      var next = function next() {
        _this2.props.nextfunc({
          value: _this2.props.value
        });
      };
      var settings = {
        columnCount: {
          "default": 5,
          mobile: 1,
          tab: 2
        },
        mode: 'dark'
      };
      var deleteimage = function deleteimage(key, slug) {
        console.log("key=>", key);
        console.log("slug=>", slug);
        var arr = _this2.state.images;
        //console.log(index); // 👉️ 1

        arr[key] = {};
        console.log("arr=>", arr);
        _this2.apiCtrl.callAxios("gallery/delete", {
          slug: slug,
          is_active: '0'
        }).then(function (res) {
          if (res.success == true) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().fire({
              title: "Image",
              text: res.message,
              icon: "success",
              showConfirmButton: false
            });
            setTimeout(function () {
              sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().close();
              _this2.props.gallfunc();
              // location.reload("/admin/testimonial-list")
            }, 3000);
          } else {
            sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().fire({
              title: "Image",
              text: res.message,
              icon: "error",
              showConfirmButton: false
            });
            setTimeout(function () {
              sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().close();
              _this2.props.gallfunc();
              // location.reload("/admin/testimonial-list")
            }, 3000);
          }
        });
        _this2.setState(function (old) {
          return _objectSpread(_objectSpread({}, old), {}, {
            images: _toConsumableArray(arr)
          });
        });
        //console.log("stateAfterdel=>",this.state)
      };

      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "row",
          children: this.state.images.length > 0 && this.state.images.map(function (val, key) {
            if (Object.keys(_this2.state.images[key]).length > 0) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "col-md-3 profile-pic  mb-2 d-flex justify-content-between",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
                    href: val.images,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                      className: "gallery-img",
                      src: val.images
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    "class": "edit",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("button", {
                      type: "submit",
                      onClick: function onClick() {
                        return deleteimage(key, val.slug);
                      },
                      children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                        className: "fa fa-fw fa-trash"
                      })]
                    })
                  })]
                })
              });
            }
          })
        })
      });
    }
  }]);
  return GalleryList;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Admin/Pages/Gallery_Image/Gallerry.css":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Admin/Pages/Gallery_Image/Gallerry.css ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* .gallery-img{\r\n    width:70% !important;\r\n    margin-left:2px !important;\r\n     height:153px !important ;\r\n} */\r\n\r\n\r\n\r\n\r\n  .profile-pic {\r\n\tposition: relative;\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.profile-pic:hover .edit {\r\n\tdisplay: block;\r\n}\r\n\r\n.edit {\r\n\tpadding-top: 7px;\t\r\n\tpadding-right: 7px;\r\n\tposition: absolute;\r\n\tright: 0;\r\n\ttop: 0;\r\n\tdisplay: none;\r\n}\r\n\r\n.edit a {\r\n\tcolor: #000;\r\n}\r\n\r\n.gallery-img{\r\n    width: 100%;\r\n    height: 100% !important;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.styles_row__2gmnz {\r\n    -moz-column-count: 4;\r\n         column-count: 4;\r\n    transition: all .5s ease-in-out;\r\n    -moz-column-gap: 17px;\r\n         column-gap: 17px;\r\n    -moz-column-fill: initial;\r\n         column-fill: initial;\r\n}\r\n\r\n.styles_column__2r45X img {\r\n    vertical-align: middle;\r\n    width: 100%;\r\n    height: 146px !important;\r\n}\r\n\r\nimg.styles_lightroomimg__1r0lF{\r\n    width: 73% !important;\r\n    height: auto !important;\r\n}\r\n.styles_lightroomcontent__1SCaZ{\r\n    margin-top: 10rem !important;\r\n}\r\n\r\n.styles_topmenu__oGT_u{\r\n    top: 14% !important;\r\n    right: -37px !important;\r\n}\r\n\r\n\r\n.styles_carouselcontrolprev__Bmyua {\r\n    position: absolute;\r\n    left: 16% !important;\r\n    top: 66% !important;\r\n}\r\n.styles_carouselcontrolnext__DoQ9- {\r\n    position: absolute;\r\n    right: 5% !important;\r\n    top: 66% !important;\r\n}\r\n\r\n.styles_lightroomcontent__1SCaZ {\r\n    margin: auto;\r\n    height: 80% ;\r\n    width: 67vw ;\r\n    text-align: center;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    margin-left: 204px !important;\r\n}\r\n.styles_icon__1uWQb {\r\n    margin-left: 15px;\r\n    font-size: 20px;\r\n    cursor: pointer;\r\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/react-lightbox-gallery/dist/index.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-lightbox-gallery/dist/index.es.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".styles_row__2gmnz {\n  column-count: 4;\n  transition: all .5s ease-in-out;\n  column-gap: 10px;\n  column-fill: initial;\n}\n\n/* Create four equal columns that sits next to each other */\n\n.styles_column__2r45X {\n  margin-bottom: 10px;\n  display: inline-block;\n  vertical-align: top;\n}\n\n.styles_column__2r45X img {\n  vertical-align: middle;\n  width: 100%;\n}\n\n.styles_lightroom__1X2qE {\n  height: 100vh;\n  width: 100vw;\n  position: absolute;\n  z-index: 20;\n  top: 0;\n  left: 0;\n  background-color: #fff;\n  overflow-x: hidden;\n  transition: all 0.15s;\n  visibility: hidden;\n}\n\n.styles_carouselcontrolprev__Bmyua {\n  position: absolute;\n  left: 5%;\n  top: 45%;\n}\n\n.styles_carouselcontrolnext__DoQ9- {\n  position: absolute;\n  right: 5%;\n  top: 45%;\n}\n\n.styles_lightroomcontent__1SCaZ {\n  margin: auto;\n  height: 80%;\n  width: 80vw;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.styles_lightroomdesc__rNPED {\n  margin:auto;\n  height: 10%;\n  text-align: center;\n  width: 80vw;\n}\n\n.styles_lightroomimg__1r0lF {\n  max-width: 100%;\n  max-height: 80%;\n}\n\n.styles_topmenu__oGT_u {\n  position: absolute;\n  right: 5%;\n  top:1%;\n  font-size: medium;\n}\n.styles_sub__363ZQ{\n  font-style: italic;\n  font-size: 14px;\n}\n.styles_icon__1uWQb{\n  margin-left:15px;\n  font-size: 20px;\n}\n.styles_thumbpanel__1sa4E{\n  height:100vh;\n  width:0vw;\n  background: #fff;\n  position: fixed;\n  z-index: 20;\n  top: 0;\n  right: 0;\n  transition: 0.15s;\n  overflow-y:auto ;\n  padding-bottom: 10px;\n  text-align: center;\n}\n.styles_thumbnail__19ffY{\n  height:12vh;\n  margin-top:10px;\n  width:80%;\n  background: center center;\n  background-size: cover;\n  margin-left: auto;\n  margin-right:auto;\n}\n/* Responsive layout - makes a two column-layout instead of four columns */\n\n@media screen and (max-width: 800px) {\n  .styles_row__2gmnz {\n    column-count: 4 ;\n  }\n  .styles_carouselcontrolprev__Bmyua {\n    left: 4%;\n  }\n  .styles_carouselcontrolnext__DoQ9- {\n    right: 4%;\n  }\n}\n\n/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */\n\n@media screen and (max-width: 600px) {\n  .styles_row__2gmnz {\n    column-count: 2 ;\n  }\n  .styles_carouselcontrolprev__Bmyua {\n    left: 3%;\n  }\n  .styles_carouselcontrolnext__DoQ9- {\n    right: 3%;\n  }\n}";
var styles = { "row": "styles_row__2gmnz", "column": "styles_column__2r45X", "lightroom": "styles_lightroom__1X2qE", "carouselcontrolprev": "styles_carouselcontrolprev__Bmyua", "carouselcontrolnext": "styles_carouselcontrolnext__DoQ9-", "lightroomcontent": "styles_lightroomcontent__1SCaZ", "lightroomdesc": "styles_lightroomdesc__rNPED", "lightroomimg": "styles_lightroomimg__1r0lF", "topmenu": "styles_topmenu__oGT_u", "sub": "styles_sub__363ZQ", "icon": "styles_icon__1uWQb", "thumbpanel": "styles_thumbpanel__1sa4E", "thumbnail": "styles_thumbnail__19ffY" };
styleInject(css);

var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  d: "M18 6L6 18M6 6l12 12"
});

var closeIconLight = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-x%22%3E%3Cline%20x1%3D%2218%22%20y1%3D%226%22%20x2%3D%226%22%20y2%3D%2218%22%3E%3C%2Fline%3E%3Cline%20x1%3D%226%22%20y1%3D%226%22%20x2%3D%2218%22%20y2%3D%2218%22%3E%3C%2Fline%3E%3C%2Fsvg%3E";

var _ref$1 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  d: "M18 6L6 18M6 6l12 12"
});

var closeIconDark = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-x%22%3E%3Cline%20x1%3D%2218%22%20y1%3D%226%22%20x2%3D%226%22%20y2%3D%2218%22%3E%3C%2Fline%3E%3Cline%20x1%3D%226%22%20y1%3D%226%22%20x2%3D%2218%22%20y2%3D%2218%22%3E%3C%2Fline%3E%3C%2Fsvg%3E";

var _ref$2 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  d: "M21 10H3M21 6H3M21 14H3M21 18H3"
});

var thumbnailLight = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-align-justify%22%3E%3Cline%20x1%3D%2221%22%20y1%3D%2210%22%20x2%3D%223%22%20y2%3D%2210%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2221%22%20y1%3D%226%22%20x2%3D%223%22%20y2%3D%226%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2221%22%20y1%3D%2214%22%20x2%3D%223%22%20y2%3D%2214%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2221%22%20y1%3D%2218%22%20x2%3D%223%22%20y2%3D%2218%22%3E%3C%2Fline%3E%3C%2Fsvg%3E";

var _ref$3 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  d: "M21 10H3M21 6H3M21 14H3M21 18H3"
});

var thumbnailDark = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-align-justify%22%3E%3Cline%20x1%3D%2221%22%20y1%3D%2210%22%20x2%3D%223%22%20y2%3D%2210%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2221%22%20y1%3D%226%22%20x2%3D%223%22%20y2%3D%226%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2221%22%20y1%3D%2214%22%20x2%3D%223%22%20y2%3D%2214%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2221%22%20y1%3D%2218%22%20x2%3D%223%22%20y2%3D%2218%22%3E%3C%2Fline%3E%3C%2Fsvg%3E";

var _ref$4 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  d: "M19 12H5M12 19l-7-7 7-7"
});

var arrowLeftLight = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-arrow-left%22%3E%3Cline%20x1%3D%2219%22%20y1%3D%2212%22%20x2%3D%225%22%20y2%3D%2212%22%3E%3C%2Fline%3E%3Cpolyline%20points%3D%2212%2019%205%2012%2012%205%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E";

var _ref$5 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  d: "M19 12H5M12 19l-7-7 7-7"
});

var arrowLeftDark = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-arrow-left%22%3E%3Cline%20x1%3D%2219%22%20y1%3D%2212%22%20x2%3D%225%22%20y2%3D%2212%22%3E%3C%2Fline%3E%3Cpolyline%20points%3D%2212%2019%205%2012%2012%205%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E";

var _ref$6 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  d: "M5 12h14M12 5l7 7-7 7"
});

var arrowRightLight = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-arrow-right%22%3E%3Cline%20x1%3D%225%22%20y1%3D%2212%22%20x2%3D%2219%22%20y2%3D%2212%22%3E%3C%2Fline%3E%3Cpolyline%20points%3D%2212%205%2019%2012%2012%2019%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E";

var _ref$7 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  d: "M5 12h14M12 5l7 7-7 7"
});

var arrowRightDark = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-arrow-right%22%3E%3Cline%20x1%3D%225%22%20y1%3D%2212%22%20x2%3D%2219%22%20y2%3D%2212%22%3E%3C%2Fline%3E%3Cpolyline%20points%3D%2212%205%2019%2012%2012%2019%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends$8 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var LightRoomComponent = function (_Component) {
  inherits(LightRoomComponent, _Component);

  function LightRoomComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, LightRoomComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = LightRoomComponent.__proto__ || Object.getPrototypeOf(LightRoomComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      length: 0,
      lightroomactive: false,
      thumbmenuactive: false,
      activeindex: 0,
      path: "",
      desc: "",
      sub: "",
      touchStart: 0,
      touchEnd: 0
    }, _this.size = 4, _this.mode = "light", _this.openlightroom = function (e) {
      _this.setState({
        lightroomactive: true
      });
      _this.getcontent(e.target.getAttribute("data-index"));
    }, _this.closelightroom = function () {
      _this.setState({
        lightroomactive: false,
        thumbmenuactive: false
      });
    }, _this.moveright = function () {
      var id = parseInt(_this.state.activeindex, 10);
      if (id == _this.state.length - 1) _this.setState({
        lightroomactive: false,
        thumbmenuactive: false
      });else _this.getcontent(++id);
    }, _this.moveleft = function () {
      var id = parseInt(_this.state.activeindex, 10);
      if (id == 0) _this.setState({
        lightroomactive: false,
        thumbmenuactive: false
      });else _this.getcontent(--id);
    }, _this.getcontent = function (id) {
      _this.setState({
        activeindex: id,
        path: _this.props.images[id].src,
        sub: _this.props.images[id].sub,
        desc: _this.props.images[id].desc
      });
    }, _this.thumbmenutoggle = function () {
      _this.setState({
        thumbmenuactive: !_this.state.thumbmenuactive
      });
    }, _this.calculateStyles = function () {
      var columncount = 4,
          lightroomBackground = "rgba(255,255,255,0.95)",
          textColor = "#000";
      if (_this.props.settings) {
        if (_this.props.settings.columnCount && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) != undefined) {
          if (window.outerWidth <= 600) columncount = _this.props.settings.columnCount.mobile ? _this.props.settings.columnCount.mobile : 2;else if (window.outerWidth <= 800) columncount = _this.props.settings.columnCount.tab ? _this.props.settings.columnCount.tab : 3;else columncount = _this.props.settings.columnCount.default ? _this.props.settings.columnCount.default : 5;
        }
        lightroomBackground = _this.props.settings.mode == "light" ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.95)";
        textColor = _this.props.settings.mode == "light" ? "#000" : "#fff";
        var lightroomwidth = _this.state.thumbmenuactive ? "85vw" : "100vw";
      }
      return {
        row: {
          columnCount: columncount
        },
        lightroom: {
          backgroundColor: lightroomBackground,
          color: textColor,
          width: lightroomwidth
        },
        thumbpanel: {
          width: _this.state.thumbmenuactive ? "15vw" : "0vw",
          background: _this.props.settings.mode == "light" ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.95)"
        }
      };
    }, _this.touchstart = function (e) {
      _this.setState({
        touchStart: e.touches[0].clientX
      });
    }, _this.touchmove = function (e) {
      _this.setState({
        touchEnd: e.touches[0].clientX
      });
    }, _this.touchend = function (e) {
      var _this$state = _this.state,
          touchStart = _this$state.touchStart,
          touchEnd = _this$state.touchEnd;

      if (touchStart - touchEnd > 150) _this.moveright();
      if (touchStart - touchEnd < -150) _this.moveleft();
    }, _temp), possibleConstructorReturn(_this, _ret);
  }
  // intial state

  // varibles to store props


  createClass(LightRoomComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        length: this.props.images.length
      });
    }
    // controlling lightbox activation


    //lightbox controls

    // get image at current active index

    // toggle thumb menu

    // Calculate styles - reponsible for changing style based on settings

    // Swipe Controls

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var runtimeStyles = this.calculateStyles();

      return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        'div',
        null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(
          'div',
          { className: styles.row, style: runtimeStyles.row },
          this.props.images.map(function (img, i) {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
              'div',
              { className: styles.column, key: i },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
                'data-index': i,
                src: img.src,
                onClick: _this2.openlightroom
              })
            );
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(
          'div',
          {
            className: styles.lightroom,
            style: _extends$8({
              visibility: this.state.lightroomactive ? "visible" : "hidden"
            }, runtimeStyles.lightroom)
          },
          react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'div',
            { className: styles.topmenu },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
              src: this.props.settings.mode == "light" ? thumbnailDark : thumbnailLight,
              className: styles.icon,
              onClick: this.thumbmenutoggle
            }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
              src: this.props.settings.mode == "light" ? closeIconDark : closeIconLight,
              className: styles.icon,
              onClick: this.closelightroom
            })
          ),
          react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'div',
            {
              className: styles.lightroomcontent,
              onTouchStart: this.touchstart,
              onTouchMove: this.touchmove,
              onTouchEnd: this.touchend
            },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
              className: styles.lightroomimg,
              src: this.state.path,
              style: { maxWidth: "100%" }
            })
          ),
          react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            'div',
            { className: styles.lightroomdesc },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(
              'h1',
              null,
              this.state.name
            ),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(
              'p',
              { className: styles.desc },
              this.state.desc
            ),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(
              'p',
              { className: styles.sub },
              this.state.sub
            )
          ),
          react__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
            src: this.props.settings.mode == "light" ? arrowLeftDark : arrowLeftLight,
            className: styles.carouselcontrolprev,
            role: 'button',
            onClick: this.moveleft
          }),
          react__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
            src: this.props.settings.mode == "light" ? arrowRightDark : arrowRightLight,
            className: styles.carouselcontrolnext,
            role: 'button',
            onClick: this.moveright
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(
          'div',
          {
            className: styles.thumbpanel,
            style: runtimeStyles.thumbpanel
          },
          this.props.images.map(function (img, i) {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
              className: styles.thumbnail,
              'data-index': i,
              key: i,
              onClick: _this2.openlightroom,
              style: {
                backgroundImage: 'url(' + img.src + ')'
              }
            });
          })
        )
      );
    }
  }]);
  return LightRoomComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LightRoomComponent);
//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./resources/js/components/Admin/Pages/Gallery_Image/Gallerry.css":
/*!************************************************************************!*\
  !*** ./resources/js/components/Admin/Pages/Gallery_Image/Gallerry.css ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Gallerry_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./Gallerry.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Admin/Pages/Gallery_Image/Gallerry.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Gallerry_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Gallerry_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);