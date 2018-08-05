/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array){
    this.htmlElements = array;
  }

  html(_string){
    if(!_string){
      this.htmlElements = this.htmlElements.map((htmlElement) => {
        htmlElement.innerHtml = _string;
      });
    }else{
      return this.htmlElements[0].innerHtml;
    }
  }
  empty(){
    for (let i = 0; i < this.htmlElements.length; i++) {
      this.htmlElements[i].innerHTML = '';
    }
  }

  append(element){
    if(typeof element === 'string'){
      for (let i = 0; i < this.htmlElements.length; i++) {
        this.htmlElements[i].innerHTML += element;
      }
    }else if (element instanceof HTMLElement) {
      for (let i = 0; i < this.htmlElements.length; i++) {
        this.htmlElements[i].innerHTML += element.outerHTML;
      }
    }else {
      for (let k = 0; k < this.htmlElements.length; k++) {
        for (let i = 0; i < element.length; i++) {
          this.htmlElements[k].innerHTML += element[i].outerHTML;
        }
      }
    }
  }

  attr(attribute, tag) {
   for (var i = 0; i < this.htmlElements.length; i++) {
     this.htmlElements[i][attribute] = tag;
   }
 }

 addClass(newClass) {
   for (var i = 0; i < this.htmlElements.length; i++) {
     if (this.htmlElements[i].className !== "") {
       this.htmlElements[i].className += ` ${newClass}`;
     } else {
       this.htmlElements[i].className += `${newClass}`;
     }
   }
 }

 removeClass(oldClass) {
   for (let i = 0; i < this.htmlElements.length; i++) {
     let newClassArr = [];
     let classes = this.htmlElements[i].className.split(" ");
     for (let i = 0; i < classes.length; i++) {
       if (classes[i] !== oldClass) {
         newClassArr.push(classes[i]);
       }
     }
     this.htmlElements[i].className = newClassArr.join(" ");
   }
 }

 children() {
   let childrenCollection = [];
   for (var i = 0; i < this.htmlElements.length; i++) {
     const child = new DOMNodeCollection(this.htmlElements[i].children);
     childrenCollection.push(child);
   }
   return childrenCollection;
 }

 parent() {
   let parentCollection = [];
   for (var i = 0; i < this.htmlElements.length; i++) {
     const parent = new DOMNodeCollection(this.htmlElements[i].parentElement);
     parentCollection.push(parent);
   }
   return parentCollection;
 }

 find(selector){
   let found = [];
   for (let i = 0; i < this.htmlElements.length; i++) {
   found = found.concat(this.htmlElements[i].querySelectorAll(selector));
   }
   for (let i = 0; i < found.length; i++) {
     found[i] = new DOMNodeCollection(found[i]);
   }
   return found[0];
 }

 remove() {
   for (var i = 0; i < this.htmlElements.length; i++) {
     this.htmlElements[i].remove();
   }
   this.htmlElements = [];
 }

 on(type, listener) {
   for (var i = 0; i < this.htmlElements.length; i++) {
     this.htmlElements[i].addEventListener(type, listener);
     this.htmlElements[i].eventListenerReference = listener;
   }
 }

 off(type) {
   for (var i = 0; i < this.htmlElements.length; i++) {
     this.htmlElements[i].removeEventListener(type, this.htmlElements[i].eventListenerReference);
     this.htmlElements[i].eventListenerReference = '';
   }
 }
// $square.htmlElements[0].dataset['pos']=[ i % 3 , Math.floor(i / 3) ];
 data(key,value){
   if(this.htmlElements[0].dataset[key]){
     return this.htmlElements[0].dataset[key];
   }else{
     this.htmlElements[0].dataset[key]=[value];
   }

   // if(this[key]){
   //   return this[key];
   // }else{
   // this[key] = value;
   // }
 }

}


module.exports = DOMNodeCollection;


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ "./lib/dom_node_collection.js");


window.$l = (input) =>{
  if (document.readyState !== "complete" && typeof input === "function" ) {
     functionQueue.push(input);
     return;
 }
 if (input instanceof HTMLElement) {
   return new DOMNodeCollection([input]);
 }
 let html = input;
 if (input.includes('</')) {
   let htmlElement = html.match(/<\w\S/g)[0].slice(1);
   let htmlDoc = new DOMParser().parseFromString(html, 'text/html');
   input = htmlDoc.querySelectorAll(htmlElement);
 }
  let nodeList;
  if(typeof input  === 'string'){
    nodeList = document.querySelectorAll(input);
    nodeList = Array.from(nodeList);
  }else if (typeof input === 'function') {
    return input();
  }else if (typeof input  === 'object') {
    return new DOMNodeCollection(input);
  }else{
    nodeList = [input];
  }
  return new DOMNodeCollection(nodeList);
};

$l.extend = (...objects) =>{
  let accumulator = objects[0];
  for (let i = 1; i < objects.length; i++) {
    const currentObj = objects[i];
    for(let key in currentObj){
      accumulator[key] = currentObj[key];
    }
  }
  return accumulator;
};

const functionQueue = [];

document.addEventListener('DOMContentLoaded',function(){
  for (let i = 0; i < functionQueue.length; i++) {
    functionQueue[i]();
  }
});


/***/ })

/******/ });
//# sourceMappingURL=jquery_lite.js.map