var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  
  if (matchFunc(startEl)) resultSet.push(startEl);

  for (var i = 0; i < startEl.children.length; i++) {
    var child = startEl.children[i];
    var collectedElements = traverseDomAndCollectElements(matchFunc, child);
    resultSet = [...resultSet, ...collectedElements];
  }
  
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí

  if (selector[0] === "#") return "id";
  else if (selector[0] === ".") return "class";
  else if (selector.split(".").length === 2) return "tag.class";
  else return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = element => "#" + element.id === selector;
  } else if (selectorType === "class") {
    matchFunction = element => {
      var classes = element.classList;
      for (var i = 0; i < classes.length; i++) {
        if ("." + classes[i] === selector) return true;
      }
      return false;
    }
  } else if (selectorType === "tag.class") {
    matchFunction = element => {
      let [t, c] = selector.split(".");
      return matchFunctionMaker(t)(element) && matchFunctionMaker("." + c)(element);
    }
  } else if (selectorType === "tag") {
    matchFunction = element => element.tagName === selector.toUpperCase();
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
