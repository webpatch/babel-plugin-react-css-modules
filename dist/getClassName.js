'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


const isNamespacedStyleName = styleName => {
  return styleName.indexOf('.') !== -1;
};

const getClassNameForNamespacedStyleName = (styleName, styleModuleImportMap) => {
  // Note:
  // Do not use the desctructing syntax with Babel.
  // Desctructing adds _slicedToArray helper.
  const styleNameParts = styleName.split('.');
  const importName = styleNameParts[0];
  const moduleName = styleNameParts[1];

  if (!moduleName) {
    throw new Error('Invalid style name.');
  }

  if (!styleModuleImportMap[importName]) {
    throw new Error('CSS module import does not exist.');
  }

  if (!styleModuleImportMap[importName][moduleName]) {
    throw new Error('CSS module does not exist.');
  }

  return styleModuleImportMap[importName][moduleName];
};

exports.default = (styleNameValue, styleModuleImportMap) => {
  const styleModuleImportMapKeys = Object.keys(styleModuleImportMap);
  if (!styleNameValue) return '';
  return styleNameValue.split(' ').filter(styleName => {
    return styleName;
  }).map(styleName => {
    if (isNamespacedStyleName(styleName)) {
      return getClassNameForNamespacedStyleName(styleName, styleModuleImportMap);
    }

    if (styleModuleImportMapKeys.length === 0) {
      throw new Error('Cannot use styleName attribute without importing at least one stylesheet.');
    }

    if (styleModuleImportMapKeys.length > 1) {
      throw new Error('Cannot use anonymous style name with more than one stylesheet import.');
    }

    const styleModuleMap = styleModuleImportMap[styleModuleImportMapKeys[0]];

    if (!styleModuleMap[styleName]) {
      console.error('Could not resolve the styleName \'' + styleName + '\'.');
      return '';
    }

    return styleModuleMap[styleName];
  }).join(' ');
};
//# sourceMappingURL=getClassName.js.map