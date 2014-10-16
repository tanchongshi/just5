/*!
 * just5 JavaScript Library v@1.0
 * http://cocoscript.com/

 * author: Chongshi Tam
 *
 * Copyright 2014 just5 Foundation
 * Released under the MIT license
 * https://github.com/tanchongshi/just5/blob/master/LICENSE
 *
 * Date: @20141017
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['just5'] = factory();
  }
}(this, function () {


var core = function () {
  var doc = window.document;
  just5 = function (params, context) {
    return new just5.fn.init(params, context);
  };
  just5.fn = just5.prototype = {
    //原型指向构造函数
    constructor: just5,
    init: function (params, context) {
      /**
       * 设置上下文
       * @type {[type]}
       */
      var currentContext = doc;
      if (context) {
        if (context.nodeType) {
          //document 元素 或者 Element 元素
          currentContext = context;
        } else {
          //如果是字符 ，基于document选择该选择器
          currentContext = doc.querySelector(context);
        }
      }
      //如果没有传任何参数 返回this
      if (!params || just5.trim(params) === '') {
        this.length = 0;
        return this;
      }
      //如果传入的html标准标签
      if (typeof params === 'string' && /<(\S*?)[^>]*>.*?<\/\1>/.test(params)) {
        //动态生成div和docfrag，然后把div append到 docfrag,并且设置div的内容为传进来的html,然后获得div的元素结点
        var divElm = currentContext.createElement('div');
        divElm.className = 'doc-frag-wrapper';
        var docFrag = currentContext.createDocumentFragment();
        docFrag.appendChild(divElm);
        var queryDiv = docFrag.querySelector('div');
        queryDiv.innerHTML = params;
        var numberOfChildren = queryDiv.children.length;
        //遍历 nodelist 填充this
        for (var z = 0; z < numberOfChildren; z++) {
          this[z] = queryDiv.children[z];
        }
        this.length = numberOfChildren;
        return this;
      }
      //如果传进来的是dom结点
      if (typeof params === 'object' && params.nodeName) {
        this.length = 1;
        this[0] = params;
        return this;
      }
      //如果传进一个对象不是node结点，而是nodelist或者array,或者是选择器
      var nodes;
      if (typeof params !== 'string') {
        //nodelist or array
        nodes = params;
      } else {
        //string 选择器
        nodes = currentContext.querySelectorAll(just5.trim(params));
      }
      //遍历 array or nodelist填充this
      var nodeLength = nodes.length;
      for (var i = 0; i < nodeLength; i++) {
        this[i] = nodes[i];
      }
      this.length = nodeLength;
      return this;
    },
    //增加遍历方法	
    each: function (callback, args) {
      return just5.each(this, callback, args);
    }
  };
  //继承just5方法
  just5.fn.init.prototype = just5.fn;
  //扩展类方法，清空前后空格
  just5.trim = String.prototype.trim ? function (a) {
    return a.trim();
  } : function (a) {
    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
  };
  return just5;
}();
/*!
 * just5 JavaScript Library v@1.0
 * http://cocoscript.com/

 * author: Chongshi Tam
 *
 * Copyright 2014 just5 Foundation
 * Released under the MIT license
 * https://github.com/tanchongshi/just5/blob/master/LICENSE
 *
 * Date: @20141017
 */
var just5 = function (just5) {
  return just5;
}(core);


return just5;



}));