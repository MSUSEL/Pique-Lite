// src/comment.ts
function addComments(node, type, comments) {
  const key = `${type}Comments`;
  if (node[key]) {
    if (type === "leading") {
      node[key] = comments.concat(node[key]);
    } else {
      node[key].push.apply(node[key], comments);
    }
  } else {
    node[key] = comments;
  }
  return node;
}
function addComment(node, type, comment) {
  return addComments(node, type, [comment]);
}

// src/is-node-type.ts
function is(type, node) {
  return node != null && node.type === type;
}

// src/assert-node-type.ts
function assert(type, node) {
  if (is(type, node)) {
    throw new Error(
      'Expected type "' + type + '" but instead got "' + node.type + '".'
    );
  }
}

// src/nodes/flow/expressions/typecast-expression.ts
var TYPE = "TypeCastExpression";
function typeCastExpression(expression, typeAnnotation2) {
  return {
    type: TYPE,
    expression,
    typeAnnotation: typeAnnotation2
  };
}
function isTypeCastExpression(node) {
  return is(TYPE, node);
}
function assertTypeCastExpression(node) {
  assert(TYPE, node);
}

// src/nodes/flow/misc/any-type-annotation.ts
var TYPE2 = "AnyTypeAnnotation";
function anyTypeAnnotation() {
  return {
    type: TYPE2
  };
}
function isAnyTypeAnnotation(node) {
  return is(TYPE2, node);
}
function assertAnyTypeAnnotation(node) {
  assert(TYPE2, node);
}

// src/nodes/flow/misc/array-type-annotation.ts
var TYPE3 = "ArrayTypeAnnotation";
function arrayTypeAnnotation(elementType) {
  return {
    type: TYPE3,
    elementType
  };
}
function isArrayTypeAnnotation(node) {
  return is(TYPE3, node);
}
function assertArrayTypeAnnotation(node) {
  assert(TYPE3, node);
}

// src/nodes/flow/misc/boolean-literal-type-annotation.ts
var TYPE4 = "BooleanLiteralTypeAnnotation";
function booleanLiteralTypeAnnotation(value) {
  return {
    type: TYPE4,
    value
  };
}
function isBooleanLiteralTypeAnnotation(node) {
  return is(TYPE4, node);
}
function assertBooleanLiteralTypeAnnotation(node) {
  assert(TYPE4, node);
}

// src/nodes/flow/misc/boolean-type-annotation.ts
var TYPE5 = "BooleanTypeAnnotation";
function booleanTypeAnnotation() {
  return {
    type: TYPE5
  };
}
function isBooleanTypeAnnotation(node) {
  return is(TYPE5, node);
}
function assertBooleanTypeAnnotation(node) {
  assert(TYPE5, node);
}

// src/nodes/flow/misc/empty-type-annotation.ts
var TYPE6 = "EmptyTypeAnnotation";
function emptyTypeAnnotation() {
  return {
    type: TYPE6
  };
}
function isEmptyTypeAnnotation(node) {
  return is(TYPE6, node);
}
function assertEmptyTypeAnnotation(node) {
  assert(TYPE6, node);
}

// src/nodes/flow/misc/enum-boolean-body.ts
var TYPE7 = "EnumBooleanBody";
function enumBooleanBody(members) {
  return {
    type: TYPE7,
    members,
    explicitType: false,
    hasUnknownMembers: false
  };
}
function isEnumBooleanBody(node) {
  return is(TYPE7, node);
}
function assertEnumBooleanBody(node) {
  assert(TYPE7, node);
}

// src/nodes/flow/misc/enum-boolean-member.ts
var TYPE8 = "EnumBooleanMember";
function enumBooleanMember(id) {
  return {
    type: TYPE8,
    id,
    init: null
  };
}
function isEnumBooleanMember(node) {
  return is(TYPE8, node);
}
function assertEnumBooleanMember(node) {
  assert(TYPE8, node);
}

// src/nodes/flow/misc/enum-defaulted-member.ts
var TYPE9 = "EnumDefaultedMember";
function enumDefaultedMember(id) {
  return {
    type: TYPE9,
    id
  };
}
function isEnumDefaultedMember(node) {
  return is(TYPE9, node);
}
function assertEnumDefaultedMember(node) {
  assert(TYPE9, node);
}

// src/nodes/flow/misc/enum-number-body.ts
var TYPE10 = "EnumNumberBody";
function enumNumberBody(members) {
  return {
    type: TYPE10,
    members,
    explicitType: false,
    hasUnknownMembers: false
  };
}
function isEnumNumberBody(node) {
  return is(TYPE10, node);
}
function assertEnumNumberBody(node) {
  assert(TYPE10, node);
}

// src/nodes/flow/misc/enum-number-member.ts
var TYPE11 = "EnumNumberMember";
function enumNumberMember(id, init) {
  return {
    type: TYPE11,
    id,
    init
  };
}
function isEnumNumberMember(node) {
  return is(TYPE11, node);
}
function assertEnumNumberMember(node) {
  assert(TYPE11, node);
}

// src/nodes/flow/misc/enum-string-body.ts
var TYPE12 = "EnumStringBody";
function enumStringBody(members) {
  return {
    type: TYPE12,
    members,
    explicitType: false,
    hasUnknownMembers: false
  };
}
function isEnumStringBody(node) {
  return is(TYPE12, node);
}
function assertEnumStringBody(node) {
  assert(TYPE12, node);
}

// src/nodes/flow/misc/enum-string-member.ts
var TYPE13 = "EnumStringMember";
function enumStringMember(id, init) {
  return {
    type: TYPE13,
    id,
    init
  };
}
function isEnumStringMember(node) {
  return is(TYPE13, node);
}
function assertEnumStringMember(node) {
  assert(TYPE13, node);
}

// src/nodes/flow/misc/enum-symbol-body.ts
var TYPE14 = "EnumSymbolBody";
function enumSymbolBody(members) {
  return {
    type: TYPE14,
    members,
    hasUnknownMembers: false
  };
}
function isEnumSymbolBody(node) {
  return is(TYPE14, node);
}
function assertEnumSymbolBody(node) {
  assert(TYPE14, node);
}

// src/nodes/flow/misc/exists-type-annotation.ts
var TYPE15 = "ExistsTypeAnnotation";
function existsTypeAnnotation() {
  return {
    type: TYPE15
  };
}
function isExistsTypeAnnotation(node) {
  return is(TYPE15, node);
}
function assertExistsTypeAnnotation(node) {
  assert(TYPE15, node);
}

// src/nodes/flow/misc/function-type-annotation.ts
var TYPE16 = "FunctionTypeAnnotation";
function functionTypeAnnotation(typeParameters, params, rest, returnType) {
  return {
    type: TYPE16,
    typeParameters,
    params,
    rest,
    returnType
  };
}
function isFunctionTypeAnnotation(node) {
  return is(TYPE16, node);
}
function assertFunctionTypeAnnotation(node) {
  assert(TYPE16, node);
}

// src/nodes/flow/misc/function-type-param.ts
var TYPE17 = "FunctionTypeParam";
function functionTypeParam(name, typeAnnotation2) {
  return {
    type: TYPE17,
    name,
    typeAnnotation: typeAnnotation2
  };
}
function isFunctionTypeParam(node) {
  return is(TYPE17, node);
}
function assertFunctionTypeParam(node) {
  assert(TYPE17, node);
}

// src/nodes/flow/misc/generic-type-annotation.ts
var TYPE18 = "GenericTypeAnnotation";
function genericTypeAnnotation(id, typeParameters = null) {
  return {
    type: TYPE18,
    id,
    typeParameters
  };
}
function isGenericTypeAnnotation(node) {
  return is(TYPE18, node);
}
function assertGenericTypeAnnotation(node) {
  assert(TYPE18, node);
}

// src/nodes/flow/misc/indexed-access-type.ts
var TYPE19 = "IndexedAccessType";
function indexedAccessType(objectType, indexType) {
  return {
    type: TYPE19,
    objectType,
    indexType
  };
}
function isIndexedAccessType(node) {
  return is(TYPE19, node);
}
function assertIndexedAccessType(node) {
  assert(TYPE19, node);
}

// src/nodes/flow/misc/interface-extends.ts
var TYPE20 = "InterfaceExtends";
function interfaceExtends(id, typeParameters = null) {
  return {
    type: TYPE20,
    id,
    typeParameters
  };
}
function isInterfaceExtends(node) {
  return is(TYPE20, node);
}
function assertInterfaceExtends(node) {
  assert(TYPE20, node);
}

// src/nodes/flow/misc/interface-type-annotation.ts
var TYPE21 = "InterfaceTypeAnnotation";
function interfaceTypeAnnotation(interfaceExtends2, body) {
  return {
    type: TYPE21,
    extends: interfaceExtends2,
    body
  };
}
function isInterfaceTypeAnnotation(node) {
  return is(TYPE21, node);
}
function assertInterfaceTypeAnnotation(node) {
  assert(TYPE21, node);
}

// src/nodes/flow/misc/intersection-type-annotation.ts
var TYPE22 = "IntersectionTypeAnnotation";
function intersectionTypeAnnotation(types) {
  return {
    type: TYPE22,
    types
  };
}
function isIntersectionTypeAnnotation(node) {
  return is(TYPE22, node);
}
function assertIntersectionTypeAnnotation(node) {
  assert(TYPE22, node);
}

// src/nodes/flow/misc/mixed-type-annotation.ts
var TYPE23 = "MixedTypeAnnotation";
function mixedTypeAnnotation() {
  return {
    type: TYPE23
  };
}
function isMixedTypeAnnotation(node) {
  return is(TYPE23, node);
}
function assertMixedTypeAnnotation(node) {
  assert(TYPE23, node);
}

// src/nodes/flow/misc/null-literal-type-annotation.ts
var TYPE24 = "NullLiteralTypeAnnotation";
function nullLiteralTypeAnnotation() {
  return {
    type: TYPE24
  };
}
function isNullLiteralTypeAnnotation(node) {
  return is(TYPE24, node);
}
function assertNullLiteralTypeAnnotation(node) {
  assert(TYPE24, node);
}

// src/nodes/flow/misc/nullable-type-annotation.ts
var TYPE25 = "NullableTypeAnnotation";
function nullableTypeAnnotation(typeAnnotation2) {
  return {
    type: TYPE25,
    typeAnnotation: typeAnnotation2
  };
}
function isNullableTypeAnnotation(node) {
  return is(TYPE25, node);
}
function assertNullableTypeAnnotation(node) {
  assert(TYPE25, node);
}

// src/nodes/flow/misc/number-literal-type-annotation.ts
var TYPE26 = "NumberLiteralTypeAnnotation";
function numberLiteralTypeAnnotation(value) {
  return {
    type: TYPE26,
    value
  };
}
function isNumberLiteralTypeAnnotation(node) {
  return is(TYPE26, node);
}
function assertNumberLiteralTypeAnnotation(node) {
  assert(TYPE26, node);
}

// src/nodes/flow/misc/number-type-annotation.ts
var TYPE27 = "NumberTypeAnnotation";
function numberTypeAnnotation() {
  return {
    type: TYPE27
  };
}
function isNumberTypeAnnotation(node) {
  return is(TYPE27, node);
}
function assertNumberTypeAnnotation(node) {
  assert(TYPE27, node);
}

// src/nodes/flow/misc/object-type-annotation.ts
var TYPE28 = "ObjectTypeAnnotation";
function objectTypeAnnotation(properties, indexers = [], callProperties = [], internalSlots = [], exact = false) {
  return {
    type: TYPE28,
    properties,
    indexers,
    callProperties,
    internalSlots,
    exact
  };
}
function isObjectTypeAnnotation(node) {
  return is(TYPE28, node);
}
function assertObjectTypeAnnotation(node) {
  assert(TYPE28, node);
}

// src/nodes/flow/misc/object-type-call-property.ts
var TYPE29 = "ObjectTypeCallProperty";
function objectTypeCallProperty(value) {
  return {
    type: TYPE29,
    value,
    static: false
  };
}
function isObjectTypeCallProperty(node) {
  return is(TYPE29, node);
}
function assertObjectTypeCallProperty(node) {
  assert(TYPE29, node);
}

// src/nodes/flow/misc/object-type-indexer.ts
var TYPE30 = "ObjectTypeIndexer";
function objectTypeIndexer(id, key, value, variance2 = null) {
  return {
    type: TYPE30,
    id,
    key,
    value,
    variance: variance2,
    static: false
  };
}
function isObjectTypeIndexer(node) {
  return is(TYPE30, node);
}
function assertObjectTypeIndexer(node) {
  assert(TYPE30, node);
}

// src/nodes/flow/misc/object-type-internal-slot.ts
var TYPE31 = "ObjectTypeInternalSlot";
function objectTypeInternalSlot(id, value, optional, isStatic, method) {
  return {
    type: TYPE31,
    id,
    value,
    optional,
    static: isStatic,
    method
  };
}
function isObjectTypeInternalSlot(node) {
  return is(TYPE31, node);
}
function assertObjectTypeInternalSlot(node) {
  assert(TYPE31, node);
}

// src/nodes/flow/misc/object-type-property.ts
var TYPE32 = "ObjectTypeProperty";
function objectTypeProperty(key, value, variance2 = null) {
  return {
    type: TYPE32,
    key,
    value,
    variance: variance2,
    kind: "init",
    method: false,
    optional: false,
    proto: false,
    static: false
  };
}
function isObjectTypeProperty(node) {
  return is(TYPE32, node);
}
function assertObjectTypeProperty(node) {
  assert(TYPE32, node);
}

// src/nodes/flow/misc/object-type-spread-property.ts
var TYPE33 = "ObjectTypeSpreadProperty";
function objectTypeSpreadProperty(argument) {
  return {
    type: TYPE33,
    argument
  };
}
function isObjectTypeSpreadProperty(node) {
  return is(TYPE33, node);
}
function assertObjectTypeSpreadProperty(node) {
  assert(TYPE33, node);
}

// src/nodes/flow/misc/optional-indexed-access-type.ts
var TYPE34 = "OptionalIndexedAccessType";
function optionalIndexedAccessType(objectType, indexType) {
  return {
    type: TYPE34,
    objectType,
    indexType,
    optional: false
  };
}
function isOptionalIndexedAccessType(node) {
  return is(TYPE34, node);
}
function assertOptionalIndexedAccessType(node) {
  assert(TYPE34, node);
}

// src/nodes/flow/misc/qualified-type-identifier.ts
var TYPE35 = "QualifiedTypeIdentifier";
function qualifiedTypeIdentifier(id, qualification) {
  return {
    type: TYPE35,
    id,
    qualification
  };
}
function isQualifiedTypeIdentifier(node) {
  return is(TYPE35, node);
}
function assertQualifiedTypeIdentifier(node) {
  assert(TYPE35, node);
}

// src/nodes/flow/misc/string-literal-type-annotation.ts
var TYPE36 = "StringLiteralTypeAnnotation";
function stringLiteralTypeAnnotation(value) {
  return {
    type: TYPE36,
    value
  };
}
function isStringLiteralTypeAnnotation(node) {
  return is(TYPE36, node);
}
function assertStringLiteralTypeAnnotation(node) {
  assert(TYPE36, node);
}

// src/nodes/flow/misc/string-type-annotation.ts
var TYPE37 = "StringTypeAnnotation";
function stringTypeAnnotation() {
  return {
    type: TYPE37
  };
}
function isStringTypeAnnotation(node) {
  return is(TYPE37, node);
}
function assertStringTypeAnnotation(node) {
  assert(TYPE37, node);
}

// src/nodes/flow/misc/symbol-type-annotation.ts
var TYPE38 = "SymbolTypeAnnotation";
function symbolTypeAnnotation() {
  return {
    type: TYPE38
  };
}
function isSymbolTypeAnnotation(node) {
  return is(TYPE38, node);
}
function assertSymbolTypeAnnotation(node) {
  assert(TYPE38, node);
}

// src/nodes/flow/misc/this-type-annotation.ts
var TYPE39 = "ThisTypeAnnotation";
function thisTypeAnnotation() {
  return {
    type: TYPE39
  };
}
function isThisTypeAnnotation(node) {
  return is(TYPE39, node);
}
function assertThisTypeAnnotation(node) {
  assert(TYPE39, node);
}

// src/nodes/flow/misc/tuple-type-annotation.ts
var TYPE40 = "TupleTypeAnnotation";
function tupleTypeAnnotation(types) {
  return {
    type: TYPE40,
    types
  };
}
function isTupleTypeAnnotation(node) {
  return is(TYPE40, node);
}
function assertTupleTypeAnnotation(node) {
  assert(TYPE40, node);
}

// src/nodes/flow/misc/type-annotation.ts
var TYPE41 = "TypeAnnotation";
function typeAnnotation(typeAnnotation2) {
  return {
    type: TYPE41,
    typeAnnotation: typeAnnotation2
  };
}
function isTypeAnnotation(node) {
  return is(TYPE41, node);
}
function assertTypeAnnotation(node) {
  assert(TYPE41, node);
}

// src/nodes/flow/misc/typeof-type-annotation.ts
var TYPE42 = "TypeofTypeAnnotation";
function typeofTypeAnnotation(argument) {
  return {
    type: TYPE42,
    argument
  };
}
function isTypeofTypeAnnotation(node) {
  return is(TYPE42, node);
}
function assertTypeofTypeAnnotation(node) {
  assert(TYPE42, node);
}

// src/nodes/flow/misc/union-type-annotation.ts
var TYPE43 = "UnionTypeAnnotation";
function unionTypeAnnotation(types) {
  return {
    type: TYPE43,
    types
  };
}
function isUnionTypeAnnotation(node) {
  return is(TYPE43, node);
}
function assertUnionTypeAnnotation(node) {
  assert(TYPE43, node);
}

// src/nodes/flow/misc/variance.ts
var TYPE44 = "Variance";
function variance(kind) {
  return {
    type: TYPE44,
    kind
  };
}
function isVariance(node) {
  return is(TYPE44, node);
}
function assertVariance(node) {
  assert(TYPE44, node);
}

// src/nodes/flow/misc/void-type-annotation.ts
var TYPE45 = "VoidTypeAnnotation";
function voidTypeAnnotation() {
  return {
    type: TYPE45
  };
}
function isVoidTypeAnnotation(node) {
  return is(TYPE45, node);
}
function assertVoidTypeAnnotation(node) {
  assert(TYPE45, node);
}

// src/nodes/flow/statements/declare-class.ts
var TYPE46 = "DeclareClass";
function declareClass(id, typeParameters, interfaceExtends2, body) {
  return {
    type: TYPE46,
    id,
    typeParameters,
    extends: interfaceExtends2,
    body
  };
}
function isDeclareClass(node) {
  return is(TYPE46, node);
}
function assertDeclareClass(node) {
  assert(TYPE46, node);
}

// src/nodes/flow/statements/declare-export-all-declaration.ts
var TYPE47 = "DeclareExportAllDeclaration";
function declareExportAllDeclaration(source) {
  return {
    type: TYPE47,
    source
  };
}
function isDeclareExportAllDeclaration(node) {
  return is(TYPE47, node);
}
function assertDeclareExportAllDeclaration(node) {
  assert(TYPE47, node);
}

// src/nodes/flow/statements/declare-export-declaration.ts
var TYPE48 = "DeclareExportDeclaration";
function declareExportDeclaration(declaration, specifiers, source) {
  return {
    type: TYPE48,
    declaration,
    specifiers,
    source
  };
}
function isDeclareExportDeclaration(node) {
  return is(TYPE48, node);
}
function assertDeclareExportDeclaration(node) {
  assert(TYPE48, node);
}

// src/nodes/flow/statements/declare-function.ts
var TYPE49 = "DeclareFunction";
function declareFunction(id) {
  return {
    type: TYPE49,
    id
  };
}
function isDeclareFunction(node) {
  return is(TYPE49, node);
}
function assertDeclareFunction(node) {
  assert(TYPE49, node);
}

// src/nodes/flow/statements/declare-interface.ts
var TYPE50 = "DeclareInterface";
function declareInterface(id, typeParameters, interfaceExtends2, body) {
  return {
    type: TYPE50,
    id,
    typeParameters,
    extends: interfaceExtends2,
    body
  };
}
function isDeclareInterface(node) {
  return is(TYPE50, node);
}
function assertDeclareInterface(node) {
  assert(TYPE50, node);
}

// src/nodes/flow/statements/declare-module.ts
var TYPE51 = "DeclareModule";
function declareModule(id, body, kind) {
  return {
    type: TYPE51,
    id,
    body,
    kind
  };
}
function isDeclareModule(node) {
  return is(TYPE51, node);
}
function assertDeclareModule(node) {
  assert(TYPE51, node);
}

// src/nodes/flow/statements/declare-module-exports.ts
var TYPE52 = "DeclareModuleExports";
function declareModuleExports(typeAnnotation2) {
  return {
    type: TYPE52,
    typeAnnotation: typeAnnotation2
  };
}
function isDeclareModuleExports(node) {
  return is(TYPE52, node);
}
function assertDeclareModuleExports(node) {
  assert(TYPE52, node);
}

// src/nodes/flow/statements/declare-opaque-type.ts
var TYPE53 = "DeclareOpaqueType";
function declareOpaqueType(id, typeParameters, supertype) {
  return {
    type: TYPE53,
    id,
    typeParameters,
    supertype
  };
}
function isDeclareOpaqueType(node) {
  return is(TYPE53, node);
}
function assertDeclareOpaqueType(node) {
  assert(TYPE53, node);
}

// src/nodes/flow/statements/declare-type-alias.ts
var TYPE54 = "DeclareTypeAlias";
function declareTypeAlias(id, typeParameters, right) {
  return {
    type: TYPE54,
    id,
    typeParameters,
    right
  };
}
function isDeclareTypeAlias(node) {
  return is(TYPE54, node);
}
function assertDeclareTypeAlias(node) {
  assert(TYPE54, node);
}

// src/nodes/flow/statements/declare-variable.ts
var TYPE55 = "DeclareVariable";
function declareVariable(id) {
  return {
    type: TYPE55,
    id
  };
}
function isDeclareVariable(node) {
  return is(TYPE55, node);
}
function assertDeclareVariable(node) {
  assert(TYPE55, node);
}

// src/nodes/flow/statements/enum-declaration.ts
var TYPE56 = "EnumDeclaration";
function enumDeclaration(id, body) {
  return {
    type: TYPE56,
    id,
    body
  };
}
function isEnumDeclaration(node) {
  return is(TYPE56, node);
}
function assertEnumDeclaration(node) {
  assert(TYPE56, node);
}

// src/nodes/flow/statements/interface-declaration.ts
var TYPE57 = "InterfaceDeclaration";
function interfaceDeclaration(id, typeParameters, interfaceExtends2, body) {
  return {
    type: TYPE57,
    id,
    typeParameters,
    extends: interfaceExtends2,
    body
  };
}
function isInterfaceDeclaration(node) {
  return is(TYPE57, node);
}
function assertInterfaceDeclaration(node) {
  assert(TYPE57, node);
}

// src/nodes/flow/statements/opaque-type.ts
var TYPE58 = "OpaqueType";
function opaqueType(id, typeParameters, supertype, impltype) {
  return {
    type: TYPE58,
    id,
    typeParameters,
    supertype,
    impltype
  };
}
function isOpaqueType(node) {
  return is(TYPE58, node);
}
function assertOpaqueType(node) {
  assert(TYPE58, node);
}

// src/nodes/flow/statements/type-alias.ts
var TYPE59 = "TypeAlias";
function typeAlias(id, typeParameters, right) {
  return {
    type: TYPE59,
    id,
    typeParameters,
    right
  };
}
function isTypeAlias(node) {
  return is(TYPE59, node);
}
function assertTypeAlias(node) {
  assert(TYPE59, node);
}

// src/nodes/javascript/expressions/array-expression.ts
var TYPE60 = "ArrayExpression";
function arrayExpression(elements = []) {
  return {
    type: TYPE60,
    elements
  };
}
function isArrayExpression(node) {
  return is(TYPE60, node);
}
function assertArrayExpression(node) {
  assert(TYPE60, node);
}

// src/nodes/javascript/expressions/arrow-function-expression.ts
var TYPE61 = "ArrowFunctionExpression";
function arrowFunctionExpression(params, body, async = false) {
  return {
    type: TYPE61,
    params,
    body,
    async,
    expression: null
    // ??? originally they use null
  };
}
function isArrowFunctionExpression(node) {
  return is(TYPE61, node);
}
function assertArrowFunctionExpression(node) {
  assert(TYPE61, node);
}

// src/nodes/javascript/expressions/assignment-expression.ts
var TYPE62 = "AssignmentExpression";
function assignmentExpression(operator, left, right) {
  return {
    type: TYPE62,
    operator,
    left,
    right
  };
}
function isAssignmentExpression(node) {
  return is(TYPE62, node);
}
function assertAssignmentExpression(node) {
  assert(TYPE62, node);
}

// src/nodes/javascript/expressions/await-expression.ts
var TYPE63 = "AwaitExpression";
function awaitExpression(argument) {
  return {
    type: TYPE63,
    argument
  };
}
function isAwaitExpression(node) {
  return is(TYPE63, node);
}
function assertAwaitExpression(node) {
  assert(TYPE63, node);
}

// src/nodes/javascript/expressions/bigint-literal.ts
var TYPE64 = "BigIntLiteral";
function bigIntLiteral(value) {
  return {
    type: TYPE64,
    value
  };
}
function isBigIntLiteral(node) {
  return is(TYPE64, node);
}
function assertBigIntLiteral(node) {
  assert(TYPE64, node);
}

// src/nodes/javascript/expressions/binary-expression.ts
var TYPE65 = "BinaryExpression";
function binaryExpression(operator, left, right) {
  return {
    type: TYPE65,
    operator,
    left,
    right
  };
}
function isBinaryExpression(node) {
  return is(TYPE65, node);
}
function assertBinaryExpression(node) {
  assert(TYPE65, node);
}

// src/nodes/javascript/expressions/bind-expression.ts
var TYPE66 = "BindExpression";
function bindExpression(object, callee) {
  return {
    type: TYPE66,
    object,
    callee
  };
}
function isBindExpression(node) {
  return is(TYPE66, node);
}
function assertBindExpression(node) {
  assert(TYPE66, node);
}

// src/nodes/javascript/expressions/boolean-literal.ts
var TYPE67 = "BooleanLiteral";
function booleanLiteral(value) {
  return {
    type: TYPE67,
    value
  };
}
function isBooleanLiteral(node) {
  return is(TYPE67, node);
}
function assertBooleanLiteral(node) {
  assert(TYPE67, node);
}

// src/nodes/javascript/expressions/call-expression.ts
var TYPE68 = "CallExpression";
function callExpression(callee, args) {
  return {
    type: TYPE68,
    callee,
    arguments: args
  };
}
function isCallExpression(node) {
  return is(TYPE68, node);
}
function assertCallExpression(node) {
  assert(TYPE68, node);
}

// src/nodes/javascript/expressions/class-expression.ts
var TYPE69 = "ClassExpression";
function classExpression(id, superClass, body, decorators = null) {
  return {
    type: TYPE69,
    id,
    superClass,
    body,
    decorators
  };
}
function isClassExpression(node) {
  return is(TYPE69, node);
}
function assertClassExpression(node) {
  assert(TYPE69, node);
}

// src/nodes/javascript/expressions/conditional-expression.ts
var TYPE70 = "ConditionalExpression";
function conditionalExpression(test, consequent, alternate) {
  return {
    type: TYPE70,
    test,
    consequent,
    alternate
  };
}
function isConditionalExpression(node) {
  return is(TYPE70, node);
}
function assertConditionalExpression(node) {
  assert(TYPE70, node);
}

// src/nodes/javascript/expressions/decimal-literal.ts
var TYPE71 = "DecimalLiteral";
function decimalLiteral(value) {
  return {
    type: TYPE71,
    value
  };
}
function isDecimalLiteral(node) {
  return is(TYPE71, node);
}
function assertDecimalLiteral(node) {
  assert(TYPE71, node);
}

// src/nodes/javascript/expressions/do-expression.ts
var TYPE72 = "DoExpression";
function doExpression(body, async = false) {
  return {
    type: TYPE72,
    body,
    async
  };
}
function isDoExpression(node) {
  return is(TYPE72, node);
}
function assertDoExpression(node) {
  assert(TYPE72, node);
}

// src/nodes/javascript/expressions/function-expression.ts
var TYPE73 = "FunctionExpression";
function functionExpression(id, params, body, generator = false, async = false) {
  return {
    type: TYPE73,
    id,
    params,
    body,
    generator,
    async
  };
}
function isFunctionExpression(node) {
  return is(TYPE73, node);
}
function assertFunctionExpression(node) {
  assert(TYPE73, node);
}

// src/nodes/javascript/expressions/identifier.ts
var TYPE74 = "Identifier";
function identifier(name) {
  return {
    type: TYPE74,
    name
  };
}
function isIdentifier(node) {
  return is(TYPE74, node);
}
function assertIdentifier(node) {
  assert(TYPE74, node);
}

// src/nodes/javascript/expressions/import.ts
var TYPE75 = "Import";
function _import() {
  return {
    type: TYPE75
  };
}
function isImport(node) {
  return is(TYPE75, node);
}
function assertImport(node) {
  assert(TYPE75, node);
}

// src/nodes/javascript/expressions/import-expression.ts
var TYPE76 = "ImportExpression";
function importExpression(source, options = null) {
  return {
    type: TYPE76,
    source,
    options
  };
}
function isImportExpression(node) {
  return is(TYPE76, node);
}
function assertImportExpression(node) {
  assert(TYPE76, node);
}

// src/nodes/javascript/expressions/logical-expression.ts
var TYPE77 = "LogicalExpression";
function logicalExpression(operator, left, right) {
  return {
    type: TYPE77,
    operator,
    left,
    right
  };
}
function isLogicalExpression(node) {
  return is(TYPE77, node);
}
function assertLogicalExpression(node) {
  assert(TYPE77, node);
}

// src/nodes/javascript/expressions/member-expression.ts
var TYPE78 = "MemberExpression";
function memberExpression(object, property, computed = false, optional = false) {
  return {
    type: TYPE78,
    object,
    property,
    computed,
    optional
  };
}
function isMemberExpression(node) {
  return is(TYPE78, node);
}
function assertMemberExpression(node) {
  assert(TYPE78, node);
}

// src/nodes/javascript/expressions/meta-property.ts
var TYPE79 = "MetaProperty";
function metaProperty(meta, property) {
  return {
    type: TYPE79,
    meta,
    property
  };
}
function isMetaProperty(node) {
  return is(TYPE79, node);
}
function assertMetaProperty(node) {
  assert(TYPE79, node);
}

// src/nodes/javascript/expressions/module-expression.ts
var TYPE80 = "ModuleExpression";
function moduleExpression(body) {
  return {
    type: TYPE80,
    body
  };
}
function isModuleExpression(node) {
  return is(TYPE80, node);
}
function assertModuleExpression(node) {
  assert(TYPE80, node);
}

// src/nodes/javascript/expressions/new-expression.ts
var TYPE81 = "NewExpression";
function newExpression(callee, args) {
  return {
    type: TYPE81,
    callee,
    arguments: args
  };
}
function isNewExpression(node) {
  return is(TYPE81, node);
}
function assertNewExpression(node) {
  assert(TYPE81, node);
}

// src/nodes/javascript/expressions/null-literal.ts
var TYPE82 = "NullLiteral";
function nullLiteral() {
  return {
    type: TYPE82
  };
}
function isNullLiteral(node) {
  return is(TYPE82, node);
}
function assertNullLiteral(node) {
  assert(TYPE82, node);
}

// src/nodes/javascript/expressions/numeric-literal.ts
var TYPE83 = "NumericLiteral";
function numericLiteral(value) {
  return {
    type: TYPE83,
    value
  };
}
function isNumericLiteral(node) {
  return is(TYPE83, node);
}
function assertNumericLiteral(node) {
  assert(TYPE83, node);
}

// src/nodes/javascript/expressions/object-expression.ts
var TYPE84 = "ObjectExpression";
function objectExpression(properties) {
  return {
    type: TYPE84,
    properties
  };
}
function isObjectExpression(node) {
  return is(TYPE84, node);
}
function assertObjectExpression(node) {
  assert(TYPE84, node);
}

// src/nodes/javascript/expressions/optional-call-expression.ts
var TYPE85 = "OptionalCallExpression";
function optionalCallExpression(callee, args, optional) {
  return {
    type: TYPE85,
    callee,
    arguments: args,
    optional
  };
}
function isOptionalCallExpression(node) {
  return is(TYPE85, node);
}
function assertOptionalCallExpression(node) {
  assert(TYPE85, node);
}

// src/nodes/javascript/expressions/optional-member-expression.ts
var TYPE86 = "OptionalMemberExpression";
function optionalMemberExpression(object, property, computed = false, optional = false) {
  return {
    type: TYPE86,
    object,
    property,
    computed,
    optional
  };
}
function isOptionalMemberExpression(node) {
  return is(TYPE86, node);
}
function assertOptionalMemberExpression(node) {
  assert(TYPE86, node);
}

// src/nodes/javascript/expressions/parenthesized-expression.ts
var TYPE87 = "ParenthesizedExpression";
function parenthesizedExpression(expression) {
  return {
    type: TYPE87,
    expression
  };
}
function isParenthesizedExpression(node) {
  return is(TYPE87, node);
}
function assertParenthesizedExpression(node) {
  assert(TYPE87, node);
}

// src/nodes/javascript/expressions/pipeline-bare-function.ts
var TYPE88 = "PipelineBareFunction";
function pipelineBareFunction(callee) {
  return {
    type: TYPE88,
    callee
  };
}
function isPipelineBareFunction(node) {
  return is(TYPE88, node);
}
function assertPipelineBareFunction(node) {
  assert(TYPE88, node);
}

// src/nodes/javascript/expressions/pipeline-primary-topic-reference.ts
var TYPE89 = "PipelinePrimaryTopicReference";
function pipelinePrimaryTopicReference() {
  return {
    type: TYPE89
  };
}
function isPipelinePrimaryTopicReference(node) {
  return is(TYPE89, node);
}
function assertPipelinePrimaryTopicReference(node) {
  assert(TYPE89, node);
}

// src/nodes/javascript/expressions/pipeline-topic-expression.ts
var TYPE90 = "PipelineTopicExpression";
function pipelineTopicExpression(expression) {
  return {
    type: TYPE90,
    expression
  };
}
function isPipelineTopicExpression(node) {
  return is(TYPE90, node);
}
function assertPipelineTopicExpression(node) {
  assert(TYPE90, node);
}

// src/nodes/javascript/expressions/record-expression.ts
var TYPE91 = "RecordExpression";
function recordExpression(properties) {
  return {
    type: TYPE91,
    properties
  };
}
function isRecordExpression(node) {
  return is(TYPE91, node);
}
function assertRecordExpression(node) {
  assert(TYPE91, node);
}

// src/nodes/javascript/expressions/regexp-literal.ts
var TYPE92 = "RegExpLiteral";
function regExpLiteral(pattern, flags = "") {
  return {
    type: TYPE92,
    pattern,
    flags
  };
}
function isRegExpLiteral(node) {
  return is(TYPE92, node);
}
function assertRegExpLiteral(node) {
  assert(TYPE92, node);
}

// src/nodes/javascript/expressions/sequence-expression.ts
var TYPE93 = "SequenceExpression";
function sequenceExpression(expressions) {
  return {
    type: TYPE93,
    expressions
  };
}
function isSequenceExpression(node) {
  return is(TYPE93, node);
}
function assertSequenceExpression(node) {
  assert(TYPE93, node);
}

// src/nodes/javascript/expressions/string-literal.ts
var TYPE94 = "StringLiteral";
function stringLiteral(value) {
  return {
    type: TYPE94,
    value
  };
}
function isStringLiteral(node) {
  return is(TYPE94, node);
}
function assertStringLiteral(node) {
  assert(TYPE94, node);
}

// src/nodes/javascript/expressions/super.ts
var TYPE95 = "Super";
function _super() {
  return {
    type: TYPE95
  };
}
function isSuper(node) {
  return is(TYPE95, node);
}
function assertSuper(node) {
  assert(TYPE95, node);
}

// src/nodes/javascript/expressions/tagged-template-expression.ts
var TYPE96 = "TaggedTemplateExpression";
function taggedTemplateExpression(tag, quasi) {
  return {
    type: TYPE96,
    tag,
    quasi
  };
}
function isTaggedTemplateExpression(node) {
  return is(TYPE96, node);
}
function assertTaggedTemplateExpression(node) {
  assert(TYPE96, node);
}

// src/nodes/javascript/expressions/template-literal.ts
var TYPE97 = "TemplateLiteral";
function templateLiteral(quasis, expressions) {
  return {
    type: TYPE97,
    quasis,
    expressions
  };
}
function isTemplateLiteral(node) {
  return is(TYPE97, node);
}
function assertTemplateLiteral(node) {
  assert(TYPE97, node);
}

// src/nodes/javascript/expressions/this-expression.ts
var TYPE98 = "ThisExpression";
function thisExpression() {
  return {
    type: TYPE98
  };
}
function isThisExpression(node) {
  return is(TYPE98, node);
}
function assertThisExpression(node) {
  assert(TYPE98, node);
}

// src/nodes/javascript/expressions/topic-reference.ts
var TYPE99 = "TopicReference";
function topicReference() {
  return {
    type: TYPE99
  };
}
function isTopicReference(node) {
  return is(TYPE99, node);
}
function assertTopicReference(node) {
  assert(TYPE99, node);
}

// src/nodes/javascript/expressions/tuple-expression.ts
var TYPE100 = "TupleExpression";
function tupleExpression(elements = []) {
  return {
    type: TYPE100,
    elements
  };
}
function isTupleExpression(node) {
  return is(TYPE100, node);
}
function assertTupleExpression(node) {
  assert(TYPE100, node);
}

// src/nodes/javascript/expressions/unary-expression.ts
var TYPE101 = "UnaryExpression";
function unaryExpression(operator, argument, prefix = true) {
  return {
    type: TYPE101,
    operator,
    argument,
    prefix
  };
}
function isUnaryExpression(node) {
  return is(TYPE101, node);
}
function assertUnaryExpression(node) {
  assert(TYPE101, node);
}

// src/nodes/javascript/expressions/update-expression.ts
var TYPE102 = "UpdateExpression";
function updateExpression(operator, argument, prefix = false) {
  return {
    type: TYPE102,
    operator,
    argument,
    prefix
  };
}
function isUpdateExpression(node) {
  return is(TYPE102, node);
}
function assertUpdateExpression(node) {
  assert(TYPE102, node);
}

// src/nodes/javascript/expressions/yield-expression.ts
var TYPE103 = "YieldExpression";
function yieldExpression(argument = null, delegate = false) {
  return {
    type: TYPE103,
    argument,
    delegate
  };
}
function isYieldExpression(node) {
  return is(TYPE103, node);
}
function assertYieldExpression(node) {
  assert(TYPE103, node);
}

// src/nodes/javascript/misc/argument-placeholder.ts
var TYPE104 = "ArgumentPlaceholder";
function argumentPlaceholder() {
  return {
    type: TYPE104
  };
}
function isArgumentPlaceholder(node) {
  return is(TYPE104, node);
}
function assertArgumentPlaceholder(node) {
  assert(TYPE104, node);
}

// src/nodes/javascript/misc/array-pattern.ts
var TYPE105 = "ArrayPattern";
function arrayPattern(elements) {
  return {
    type: TYPE105,
    elements
  };
}
function isArrayPattern(node) {
  return is(TYPE105, node);
}
function assertArrayPattern(node) {
  assert(TYPE105, node);
}

// src/nodes/javascript/misc/assignment-pattern.ts
var TYPE106 = "AssignmentPattern";
function assignmentPattern(left, right) {
  return {
    type: TYPE106,
    left,
    right
  };
}
function isAssignmentPattern(node) {
  return is(TYPE106, node);
}
function assertAssignmentPattern(node) {
  assert(TYPE106, node);
}

// src/nodes/javascript/misc/catch-clause.ts
var TYPE107 = "CatchClause";
function catchClause(param, body) {
  return {
    type: TYPE107,
    param,
    body
  };
}
function isCatchClause(node) {
  return is(TYPE107, node);
}
function assertCatchClause(node) {
  assert(TYPE107, node);
}

// src/nodes/javascript/misc/class-accessor-property.ts
var TYPE108 = "ClassAccessorProperty";
function classAccessorProperty(key, value = null, typeAnnotation2 = null, decorators = null, computed = false, isStatic = false) {
  return {
    type: TYPE108,
    key,
    value,
    typeAnnotation: typeAnnotation2,
    decorators,
    computed,
    static: isStatic
  };
}
function isClassAccessorProperty(node) {
  return is(TYPE108, node);
}
function assertClassAccessorProperty(node) {
  assert(TYPE108, node);
}

// src/nodes/javascript/misc/class-body.ts
var TYPE109 = "ClassBody";
function classBody(body) {
  return {
    type: TYPE109,
    body
  };
}
function isClassBody(node) {
  return is(TYPE109, node);
}
function assertClassBody(node) {
  assert(TYPE109, node);
}

// src/nodes/javascript/misc/class-method.ts
var TYPE110 = "ClassMethod";
function classMethod(kind, key, params, body, computed = false, isStatic = false, generator = false, async = false) {
  return {
    type: TYPE110,
    kind,
    key,
    params,
    body,
    computed,
    static: isStatic,
    generator,
    async
  };
}
function isClassMethod(node) {
  return is(TYPE110, node);
}
function assertClassMethod(node) {
  assert(TYPE110, node);
}

// src/nodes/javascript/misc/class-private-method.ts
var TYPE111 = "ClassPrivateMethod";
function classPrivateMethod(kind, key, params, body, computed = false, isStatic = false, generator = false, async = false) {
  return {
    type: TYPE111,
    kind,
    key,
    params,
    body,
    computed,
    static: isStatic,
    generator,
    async
  };
}
function isClassPrivateMethod(node) {
  return is(TYPE111, node);
}
function assertClassPrivateMethod(node) {
  assert(TYPE111, node);
}

// src/nodes/javascript/misc/class-private-property.ts
var TYPE112 = "ClassPrivateProperty";
function classPrivateProperty(key, value, decorators, isStatic = false) {
  return {
    type: TYPE112,
    key,
    value,
    decorators,
    static: isStatic
  };
}
function isClassPrivateProperty(node) {
  return is(TYPE112, node);
}
function assertClassPrivateProperty(node) {
  assert(TYPE112, node);
}

// src/nodes/javascript/misc/class-property.ts
var TYPE113 = "ClassProperty";
function classProperty(key, value, typeAnnotation2, decorators, computed = false, isStatic = false) {
  return {
    type: TYPE113,
    key,
    value,
    typeAnnotation: typeAnnotation2,
    decorators,
    computed,
    static: isStatic
  };
}
function isClassProperty(node) {
  return is(TYPE113, node);
}
function assertClassProperty(node) {
  assert(TYPE113, node);
}

// src/nodes/javascript/misc/decorator.ts
var TYPE114 = "Decorator";
function decorator(expression) {
  return {
    type: TYPE114,
    expression
  };
}
function isDecorator(node) {
  return is(TYPE114, node);
}
function assertDecorator(node) {
  assert(TYPE114, node);
}

// src/nodes/javascript/misc/directive.ts
var TYPE115 = "Directive";
function directive(value) {
  return {
    type: TYPE115,
    value
  };
}
function isDirective(node) {
  return is(TYPE115, node);
}
function assertDirective(node) {
  assert(TYPE115, node);
}

// src/nodes/javascript/misc/directive-literal.ts
var TYPE116 = "DirectiveLiteral";
function directiveLiteral(value) {
  return {
    type: TYPE116,
    value
  };
}
function isDirectiveLiteral(node) {
  return is(TYPE116, node);
}
function assertDirectiveLiteral(node) {
  assert(TYPE116, node);
}

// src/nodes/javascript/misc/export-default-specifier.ts
var TYPE117 = "ExportDefaultSpecifier";
function exportDefaultSpecifier(exported) {
  return {
    type: TYPE117,
    exported
  };
}
function isExportDefaultSpecifier(node) {
  return is(TYPE117, node);
}
function assertExportDefaultSpecifier(node) {
  assert(TYPE117, node);
}

// src/nodes/javascript/misc/export-namespace-specifier.ts
var TYPE118 = "ExportNamespaceSpecifier";
function exportNamespaceSpecifier(exported) {
  return {
    type: TYPE118,
    exported
  };
}
function isExportNamespaceSpecifier(node) {
  return is(TYPE118, node);
}
function assertExportNamespaceSpecifier(node) {
  assert(TYPE118, node);
}

// src/nodes/javascript/misc/export-specifier.ts
var TYPE119 = "ExportSpecifier";
function exportSpecifier(local, exported) {
  return {
    type: TYPE119,
    local,
    exported
  };
}
function isExportSpecifier(node) {
  return is(TYPE119, node);
}
function assertExportSpecifier(node) {
  assert(TYPE119, node);
}

// src/nodes/javascript/misc/import-default-specifier.ts
var TYPE120 = "ImportDefaultSpecifier";
function importDefaultSpecifier(local) {
  return {
    type: TYPE120,
    local
  };
}
function isImportDefaultSpecifier(node) {
  return is(TYPE120, node);
}
function assertImportDefaultSpecifier(node) {
  assert(TYPE120, node);
}

// src/nodes/javascript/misc/import-namespace-specifier.ts
var TYPE121 = "ImportNamespaceSpecifier";
function importNamespaceSpecifier(local) {
  return {
    type: TYPE121,
    local
  };
}
function isImportNamespaceSpecifier(node) {
  return is(TYPE121, node);
}
function assertImportNamespaceSpecifier(node) {
  assert(TYPE121, node);
}

// src/nodes/javascript/misc/import-specifier.ts
var TYPE122 = "ImportSpecifier";
function importSpecifier(local, imported) {
  return {
    type: TYPE122,
    local,
    imported
  };
}
function isImportSpecifier(node) {
  return is(TYPE122, node);
}
function assertImportSpecifier(node) {
  assert(TYPE122, node);
}

// src/nodes/javascript/misc/object-method.ts
var TYPE123 = "ObjectMethod";
function objectMethod(kind, key, params, body, computed = false, generator = false, async = false) {
  return {
    type: TYPE123,
    kind,
    key,
    params,
    body,
    computed,
    generator,
    async
  };
}
function isObjectMethod(node) {
  return is(TYPE123, node);
}
function assertObjectMethod(node) {
  assert(TYPE123, node);
}

// src/nodes/javascript/misc/object-pattern.ts
var TYPE124 = "ObjectPattern";
function objectPattern(properties) {
  return {
    type: TYPE124,
    properties
  };
}
function isObjectPattern(node) {
  return is(TYPE124, node);
}
function assertObjectPattern(node) {
  assert(TYPE124, node);
}

// src/nodes/javascript/misc/object-property.ts
var TYPE125 = "ObjectProperty";
function objectProperty(key, value, computed = false, shorthand = false, decorators = null) {
  return {
    type: TYPE125,
    key,
    value,
    computed,
    shorthand,
    decorators
  };
}
function isObjectProperty(node) {
  return is(TYPE125, node);
}
function assertObjectProperty(node) {
  assert(TYPE125, node);
}

// src/nodes/javascript/misc/private-name.ts
var TYPE126 = "PrivateName";
function privateName(id) {
  return {
    type: TYPE126,
    id
  };
}
function isPrivateName(node) {
  return is(TYPE126, node);
}
function assertPrivateName(node) {
  assert(TYPE126, node);
}

// src/nodes/javascript/misc/rest-element.ts
var TYPE127 = "RestElement";
function restElement(argument) {
  return {
    type: TYPE127,
    argument
  };
}
function isRestElement(node) {
  return is(TYPE127, node);
}
function assertRestElement(node) {
  assert(TYPE127, node);
}

// src/nodes/javascript/misc/spread-element.ts
var TYPE128 = "SpreadElement";
function spreadElement(argument) {
  return {
    type: TYPE128,
    argument
  };
}
function isSpreadElement(node) {
  return is(TYPE128, node);
}
function assertSpreadElement(node) {
  assert(TYPE128, node);
}

// src/nodes/javascript/misc/static-block.ts
var TYPE129 = "StaticBlock";
function staticBlock(body) {
  return {
    type: TYPE129,
    body
  };
}
function isStaticBlock(node) {
  return is(TYPE129, node);
}
function assertStaticBlock(node) {
  assert(TYPE129, node);
}

// src/nodes/javascript/misc/switch-case.ts
var TYPE130 = "SwitchCase";
function switchCase(test, consequent) {
  return {
    type: TYPE130,
    test,
    consequent
  };
}
function isSwitchCase(node) {
  return is(TYPE130, node);
}
function assertSwitchCase(node) {
  assert(TYPE130, node);
}

// src/nodes/javascript/misc/template-element.ts
var TYPE131 = "TemplateElement";
function templateElement(value, tail = false) {
  return {
    type: TYPE131,
    value,
    tail
  };
}
function isTemplateElement(node) {
  return is(TYPE131, node);
}
function assertTemplateElement(node) {
  assert(TYPE131, node);
}

// src/nodes/javascript/misc/v8-intrinsic-identifier.ts
var TYPE132 = "V8IntrinsicIdentifier";
function v8IntrinsicIdentifier(name) {
  return {
    type: TYPE132,
    name
  };
}
function isV8IntrinsicIdentifier(node) {
  return is(TYPE132, node);
}
function assertV8IntrinsicIdentifier(node) {
  assert(TYPE132, node);
}

// src/nodes/javascript/misc/variable-declarator.ts
var TYPE133 = "VariableDeclarator";
function variableDeclarator(id, init = null) {
  return {
    type: TYPE133,
    id,
    init
  };
}
function isVariableDeclarator(node) {
  return is(TYPE133, node);
}
function assertVariableDeclarator(node) {
  assert(TYPE133, node);
}

// src/nodes/javascript/statements/block-statement.ts
var TYPE134 = "BlockStatement";
function blockStatement(body, directives = []) {
  return {
    type: TYPE134,
    body,
    directives
  };
}
function isBlockStatement(node) {
  return is(TYPE134, node);
}
function assertBlockStatement(node) {
  assert(TYPE134, node);
}

// src/nodes/javascript/statements/break-statement.ts
var TYPE135 = "BreakStatement";
function breakStatement(label = null) {
  return {
    type: TYPE135,
    label
  };
}
function isBreakStatement(node) {
  return is(TYPE135, node);
}
function assertBreakStatement(node) {
  assert(TYPE135, node);
}

// src/nodes/javascript/statements/class-declaration.ts
var TYPE136 = "ClassDeclaration";
function classDeclaration(id, superClass, body, decorators = null) {
  return {
    type: TYPE136,
    id,
    superClass,
    body,
    decorators
  };
}
function isClassDeclaration(node) {
  return is(TYPE136, node);
}
function assertClassDeclaration(node) {
  assert(TYPE136, node);
}

// src/nodes/javascript/statements/continue-statement.ts
var TYPE137 = "ContinueStatement";
function continueStatement(label = null) {
  return {
    type: TYPE137,
    label
  };
}
function isContinueStatement(node) {
  return is(TYPE137, node);
}
function assertContinueStatement(node) {
  assert(TYPE137, node);
}

// src/nodes/javascript/statements/debugger-statement.ts
var TYPE138 = "DebuggerStatement";
function debuggerStatement() {
  return {
    type: TYPE138
  };
}
function isDebuggerStatement(node) {
  return is(TYPE138, node);
}
function assertDebuggerStatement(node) {
  assert(TYPE138, node);
}

// src/nodes/javascript/statements/do-while-statement.ts
var TYPE139 = "DoWhileStatement";
function doWhileStatement(test, body) {
  return {
    type: TYPE139,
    test,
    body
  };
}
function isDoWhileStatement(node) {
  return is(TYPE139, node);
}
function assertDoWhileStatement(node) {
  assert(TYPE139, node);
}

// src/nodes/javascript/statements/empty-statement.ts
var TYPE140 = "EmptyStatement";
function emptyStatement() {
  return {
    type: TYPE140
  };
}
function isEmptyStatement(node) {
  return is(TYPE140, node);
}
function assertEmptyStatement(node) {
  assert(TYPE140, node);
}

// src/nodes/javascript/statements/export-all-declaration.ts
var TYPE141 = "ExportAllDeclaration";
function exportAllDeclaration(source) {
  return {
    type: TYPE141,
    source
  };
}
function isExportAllDeclaration(node) {
  return is(TYPE141, node);
}
function assertExportAllDeclaration(node) {
  assert(TYPE141, node);
}

// src/nodes/javascript/statements/export-named-declaration.ts
var TYPE142 = "ExportNamedDeclaration";
function exportNamedDeclaration(declaration = null, specifiers = [], source = null) {
  return {
    type: TYPE142,
    declaration,
    specifiers,
    source
  };
}
function isExportNamedDeclaration(node) {
  return is(TYPE142, node);
}
function assertExportNamedDeclaration(node) {
  assert(TYPE142, node);
}

// src/nodes/javascript/statements/expression-statement.ts
var TYPE143 = "ExpressionStatement";
function expressionStatement(expression) {
  return {
    type: TYPE143,
    expression
  };
}
function isExpressionStatement(node) {
  return is(TYPE143, node);
}
function assertExpressionStatement(node) {
  assert(TYPE143, node);
}

// src/nodes/javascript/statements/for-in-statement.ts
var TYPE144 = "ForInStatement";
function forInStatement(left, right, body) {
  return {
    type: TYPE144,
    left,
    right,
    body
  };
}
function isForInStatement(node) {
  return is(TYPE144, node);
}
function assertForInStatement(node) {
  assert(TYPE144, node);
}

// src/nodes/javascript/statements/for-of-statement.ts
var TYPE145 = "ForOfStatement";
function forOfStatement(left, right, body, isAwait) {
  return {
    type: TYPE145,
    left,
    right,
    body,
    await: isAwait
  };
}
function isForOfStatement(node) {
  return is(TYPE145, node);
}
function assertForOfStatement(node) {
  assert(TYPE145, node);
}

// src/nodes/javascript/statements/for-statement.ts
var TYPE146 = "ForStatement";
function forStatement(init, test, update, body) {
  return {
    type: TYPE146,
    init,
    test,
    update,
    body
  };
}
function isForStatement(node) {
  return is(TYPE146, node);
}
function assertForStatement(node) {
  assert(TYPE146, node);
}

// src/nodes/javascript/statements/function-declaration.ts
var TYPE147 = "FunctionDeclaration";
function functionDeclaration(id, params, body, generator = false, async = false) {
  return {
    type: TYPE147,
    id,
    params,
    body,
    generator,
    async
  };
}
function isFunctionDeclaration(node) {
  return is(TYPE147, node);
}
function assertFunctionDeclaration(node) {
  assert(TYPE147, node);
}

// src/nodes/javascript/statements/if-statement.ts
var TYPE148 = "IfStatement";
function ifStatement(test, consequent, alternate = null) {
  return {
    type: TYPE148,
    test,
    consequent,
    alternate
  };
}
function isIfStatement(node) {
  return is(TYPE148, node);
}
function assertIfStatement(node) {
  assert(TYPE148, node);
}

// src/nodes/javascript/statements/import-declaration.ts
var TYPE149 = "ImportDeclaration";
function importDeclaration(specifiers, source) {
  return {
    type: TYPE149,
    specifiers,
    source
  };
}
function isImportDeclaration(node) {
  return is(TYPE149, node);
}
function assertImportDeclaration(node) {
  assert(TYPE149, node);
}

// src/nodes/javascript/statements/labeled-statement.ts
var TYPE150 = "LabeledStatement";
function labeledStatement(label, body) {
  return {
    type: TYPE150,
    label,
    body
  };
}
function isLabeledStatement(node) {
  return is(TYPE150, node);
}
function assertLabeledStatement(node) {
  assert(TYPE150, node);
}

// src/nodes/javascript/statements/return-statement.ts
var TYPE151 = "ReturnStatement";
function returnStatement(argument = null) {
  return {
    type: TYPE151,
    argument
  };
}
function isReturnStatement(node) {
  return is(TYPE151, node);
}
function assertReturnStatement(node) {
  assert(TYPE151, node);
}

// src/nodes/javascript/statements/switch-statement.ts
var TYPE152 = "SwitchStatement";
function switchStatement(discriminant, cases) {
  return {
    type: TYPE152,
    discriminant,
    cases
  };
}
function isSwitchStatement(node) {
  return is(TYPE152, node);
}
function assertSwitchStatement(node) {
  assert(TYPE152, node);
}

// src/nodes/javascript/statements/throw-statement.ts
var TYPE153 = "ThrowStatement";
function throwStatement(argument) {
  return {
    type: TYPE153,
    argument
  };
}
function isThrowStatement(node) {
  return is(TYPE153, node);
}
function assertThrowStatement(node) {
  assert(TYPE153, node);
}

// src/nodes/javascript/statements/try-statement.ts
var TYPE154 = "TryStatement";
function tryStatement(block, handler = null, finalizer = null) {
  return {
    type: TYPE154,
    block,
    handler,
    finalizer
  };
}
function isTryStatement(node) {
  return is(TYPE154, node);
}
function assertTryStatement(node) {
  assert(TYPE154, node);
}

// src/nodes/javascript/statements/variable-declaration.ts
var TYPE155 = "VariableDeclaration";
function variableDeclaration(kind, declarations) {
  return {
    type: TYPE155,
    kind,
    declarations
  };
}
function isVariableDeclaration(node) {
  return is(TYPE155, node);
}
function assertVariableDeclaration(node) {
  assert(TYPE155, node);
}

// src/nodes/javascript/statements/while-statement.ts
var TYPE156 = "WhileStatement";
function whileStatement(test, body) {
  return {
    type: TYPE156,
    test,
    body
  };
}
function isWhileStatement(node) {
  return is(TYPE156, node);
}
function assertWhileStatement(node) {
  assert(TYPE156, node);
}

// src/nodes/javascript/statements/with-statement.ts
var TYPE157 = "WithStatement";
function withStatement(object, body) {
  return {
    type: TYPE157,
    object,
    body
  };
}
function isWithStatement(node) {
  return is(TYPE157, node);
}
function assertWithStatement(node) {
  assert(TYPE157, node);
}

// src/nodes/jsx/jsx-attribute.ts
var TYPE158 = "JSXAttribute";
function jsxAttribute(name, value = null) {
  return {
    type: TYPE158,
    name,
    value
  };
}
function isJSXAttribute(node) {
  return is(TYPE158, node);
}
function assertJSXAttribute(node) {
  assert(TYPE158, node);
}

// src/nodes/jsx/jsx-closing-element.ts
var TYPE159 = "JSXClosingElement";
function jsxClosingElement(name) {
  return {
    type: TYPE159,
    name
  };
}
function isJSXClosingElement(node) {
  return is(TYPE159, node);
}
function assertJSXClosingElement(node) {
  assert(TYPE159, node);
}

// src/nodes/jsx/jsx-closing-fragment.ts
var TYPE160 = "JSXClosingFragment";
function jsxClosingFragment() {
  return {
    type: TYPE160
  };
}
function isJSXClosingFragment(node) {
  return is(TYPE160, node);
}
function assertJSXClosingFragment(node) {
  assert(TYPE160, node);
}

// src/nodes/jsx/jsx-element.ts
var TYPE161 = "JSXElement";
function jsxElement(openingElement, closingElement, children, selfClosing = null) {
  return {
    type: TYPE161,
    openingElement,
    closingElement,
    children,
    selfClosing
  };
}
function isJSXElement(node) {
  return is(TYPE161, node);
}
function assertJSXElement(node) {
  assert(TYPE161, node);
}

// src/nodes/jsx/jsx-empty-expression.ts
var TYPE162 = "JSXEmptyExpression";
function jsxEmptyExpression() {
  return {
    type: TYPE162
  };
}
function isJSXEmptyExpression(node) {
  return is(TYPE162, node);
}
function assertJSXEmptyExpression(node) {
  assert(TYPE162, node);
}

// src/nodes/jsx/jsx-expression-container.ts
var TYPE163 = "JSXExpressionContainer";
function jsxExpressionContainer(expression) {
  return {
    type: TYPE163,
    expression
  };
}
function isJSXExpressionContainer(node) {
  return is(TYPE163, node);
}
function assertJSXExpressionContainer(node) {
  assert(TYPE163, node);
}

// src/nodes/jsx/jsx-fragment.ts
var TYPE164 = "JSXFragment";
function jsxFragment(openingFragment, closingFragment, children) {
  return {
    type: TYPE164,
    openingFragment,
    closingFragment,
    children
  };
}
function isJSXFragment(node) {
  return is(TYPE164, node);
}
function assertJSXFragment(node) {
  assert(TYPE164, node);
}

// src/nodes/jsx/jsx-identifier.ts
var TYPE165 = "JSXIdentifier";
function jsxIdentifier(name) {
  return {
    type: TYPE165,
    name
  };
}
function isJSXIdentifier(node) {
  return is(TYPE165, node);
}
function assertJSXIdentifier(node) {
  assert(TYPE165, node);
}

// src/nodes/jsx/jsx-member-expression.ts
var TYPE166 = "JSXMemberExpression";
function jsxMemberExpression(object, property) {
  return {
    type: TYPE166,
    object,
    property
  };
}
function isJSXMemberExpression(node) {
  return is(TYPE166, node);
}
function assertJSXMemberExpression(node) {
  assert(TYPE166, node);
}

// src/nodes/jsx/jsx-namespaced-name.ts
var TYPE167 = "JSXNamespacedName";
function jsxNamespacedName(namespace, name) {
  return {
    type: TYPE167,
    namespace,
    name
  };
}
function isJSXNamespacedName(node) {
  return is(TYPE167, node);
}
function assertJSXNamespacedName(node) {
  assert(TYPE167, node);
}

// src/nodes/jsx/jsx-opening-element.ts
var TYPE168 = "JSXOpeningElement";
function jsxOpeningElement(name, attributes, selfClosing = false) {
  return {
    type: TYPE168,
    name,
    attributes,
    selfClosing
  };
}
function isJSXOpeningElement(node) {
  return is(TYPE168, node);
}
function assertJSXOpeningElement(node) {
  assert(TYPE168, node);
}

// src/nodes/jsx/jsx-opening-fragment.ts
var TYPE169 = "JSXOpeningFragment";
function jsxOpeningFragment() {
  return {
    type: TYPE169
  };
}
function isJSXOpeningFragment(node) {
  return is(TYPE169, node);
}
function assertJSXOpeningFragment(node) {
  assert(TYPE169, node);
}

// src/nodes/jsx/jsx-spread-attribute.ts
var TYPE170 = "JSXSpreadAttribute";
function jsxSpreadAttribute(argument) {
  return {
    type: TYPE170,
    argument
  };
}
function isJSXSpreadAttribute(node) {
  return is(TYPE170, node);
}
function assertJSXSpreadAttribute(node) {
  assert(TYPE170, node);
}

// src/nodes/jsx/jsx-spread-child.ts
var TYPE171 = "JSXSpreadChild";
function jsxSpreadChild(expression) {
  return {
    type: TYPE171,
    expression
  };
}
function isJSXSpreadChild(node) {
  return is(TYPE171, node);
}
function assertJSXSpreadChild(node) {
  assert(TYPE171, node);
}

// src/nodes/jsx/jsx-text.ts
var TYPE172 = "JSXText";
function jsxText(value) {
  return {
    type: TYPE172,
    value
  };
}
function isJSXText(node) {
  return is(TYPE172, node);
}
function assertJSXText(node) {
  assert(TYPE172, node);
}

// src/nodes/typescript/expressions/ts-as-expression.ts
var TYPE173 = "TSAsExpression";
function tsAsExpression(expression, typeAnnotation2) {
  return {
    type: TYPE173,
    expression,
    typeAnnotation: typeAnnotation2
  };
}
function isTSAsExpression(node) {
  return is(TYPE173, node);
}
function assertTSAsExpression(node) {
  assert(TYPE173, node);
}

// src/nodes/typescript/expressions/ts-instantiation-expression.ts
var TYPE174 = "TSInstantiationExpression";
function tsInstantiationExpression(expression, typeParameters = null) {
  return {
    type: TYPE174,
    expression,
    typeParameters
  };
}
function isTSInstantiationExpression(node) {
  return is(TYPE174, node);
}
function assertTSInstantiationExpression(node) {
  assert(TYPE174, node);
}

// src/nodes/typescript/expressions/ts-non-null-expression.ts
var TYPE175 = "TSNonNullExpression";
function tsNonNullExpression(expression) {
  return {
    type: TYPE175,
    expression
  };
}
function isTSNonNullExpression(node) {
  return is(TYPE175, node);
}
function assertTSNonNullExpression(node) {
  assert(TYPE175, node);
}

// src/nodes/typescript/expressions/ts-satisfies-expression.ts
var TYPE176 = "TSSatisfiesExpression";
function tsSatisfiesExpression(expression, typeAnnotation2) {
  return {
    type: TYPE176,
    expression,
    typeAnnotation: typeAnnotation2
  };
}
function isTSSatisfiesExpression(node) {
  return is(TYPE176, node);
}
function assertTSSatisfiesExpression(node) {
  assert(TYPE176, node);
}

// src/nodes/typescript/expressions/ts-type-assertion.ts
var TYPE177 = "TSTypeAssertion";
function tsTypeAssertion(typeAnnotation2, expression) {
  return {
    type: TYPE177,
    typeAnnotation: typeAnnotation2,
    expression
  };
}
function isTSTypeAssertion(node) {
  return is(TYPE177, node);
}
function assertTSTypeAssertion(node) {
  assert(TYPE177, node);
}

// src/nodes/typescript/misc/ts-any-keyword.ts
var TYPE178 = "TSAnyKeyword";
function tsAnyKeyword() {
  return {
    type: TYPE178
  };
}
function isTSAnyKeyword(node) {
  return is(TYPE178, node);
}
function assertTSAnyKeyword(node) {
  assert(TYPE178, node);
}

// src/nodes/typescript/misc/ts-array-type.ts
var TYPE179 = "TSArrayType";
function tsArrayType(elementType) {
  return {
    type: TYPE179,
    elementType
  };
}
function isTSArrayType(node) {
  return is(TYPE179, node);
}
function assertTSArrayType(node) {
  assert(TYPE179, node);
}

// src/nodes/typescript/misc/ts-bigint-keyword.ts
var TYPE180 = "TSBigIntKeyword";
function tsBigIntKeyword() {
  return {
    type: TYPE180
  };
}
function isTSBigIntKeyword(node) {
  return is(TYPE180, node);
}
function assertTSBigIntKeyword(node) {
  assert(TYPE180, node);
}

// src/nodes/typescript/misc/ts-boolean-keyword.ts
var TYPE181 = "TSBooleanKeyword";
function tsBooleanKeyword() {
  return {
    type: TYPE181
  };
}
function isTSBooleanKeyword(node) {
  return is(TYPE181, node);
}
function assertTSBooleanKeyword(node) {
  assert(TYPE181, node);
}

// src/nodes/typescript/misc/ts-call-signature-declaration.ts
var TYPE182 = "TSCallSignatureDeclaration";
function tsCallSignatureDeclaration(typeParameters, parameters, typeAnnotation2 = null) {
  return {
    type: TYPE182,
    typeParameters,
    parameters,
    typeAnnotation: typeAnnotation2
  };
}
function isTSCallSignatureDeclaration(node) {
  return is(TYPE182, node);
}
function assertTSCallSignatureDeclaration(node) {
  assert(TYPE182, node);
}

// src/nodes/typescript/misc/ts-conditional-type.ts
var TYPE183 = "TSConditionalType";
function tsConditionalType(checkType, extendsType, trueType, falseType) {
  return {
    type: TYPE183,
    checkType,
    extendsType,
    trueType,
    falseType
  };
}
function isTSConditionalType(node) {
  return is(TYPE183, node);
}
function assertTSConditionalType(node) {
  assert(TYPE183, node);
}

// src/nodes/typescript/misc/ts-construct-signature-declaration.ts
var TYPE184 = "TSConstructSignatureDeclaration";
function tsConstructSignatureDeclaration(typeParameters, parameters, typeAnnotation2 = null) {
  return {
    type: TYPE184,
    typeParameters,
    parameters,
    typeAnnotation: typeAnnotation2
  };
}
function isTSConstructSignatureDeclaration(node) {
  return is(TYPE184, node);
}
function assertTSConstructSignatureDeclaration(node) {
  assert(TYPE184, node);
}

// src/nodes/typescript/misc/ts-constructor-type.ts
var TYPE185 = "TSConstructorType";
function tsConstructorType(typeParameters, parameters, typeAnnotation2 = null) {
  return {
    type: TYPE185,
    typeParameters,
    parameters,
    typeAnnotation: typeAnnotation2
  };
}
function isTSConstructorType(node) {
  return is(TYPE185, node);
}
function assertTSConstructorType(node) {
  assert(TYPE185, node);
}

// src/nodes/typescript/misc/ts-declare-method.ts
var TYPE186 = "TSDeclareMethod";
function tsDeclareMethod(decorators, key, typeParameters, params, returnType = null) {
  return {
    type: TYPE186,
    decorators,
    key,
    typeParameters,
    params,
    returnType
  };
}
function isTSDeclareMethod(node) {
  return is(TYPE186, node);
}
function assertTSDeclareMethod(node) {
  assert(TYPE186, node);
}

// src/nodes/typescript/misc/ts-expression-with-type-arguments.ts
var TYPE187 = "TSExpressionWithTypeArguments";
function tsExpressionWithTypeArguments(expression, typeParameters = null) {
  return {
    type: TYPE187,
    expression,
    typeParameters
  };
}
function isTSExpressionWithTypeArguments(node) {
  return is(TYPE187, node);
}
function assertTSExpressionWithTypeArguments(node) {
  assert(TYPE187, node);
}

// src/nodes/typescript/misc/ts-function-type.ts
var TYPE188 = "TSFunctionType";
function tsFunctionType(typeParameters, parameters, typeAnnotation2 = null) {
  return {
    type: TYPE188,
    typeParameters,
    parameters,
    typeAnnotation: typeAnnotation2
  };
}
function isTSFunctionType(node) {
  return is(TYPE188, node);
}
function assertTSFunctionType(node) {
  assert(TYPE188, node);
}

// src/nodes/typescript/misc/ts-import-type.ts
var TYPE189 = "TSImportType";
function tsImportType(argument, qualifier = null, typeParameters = null) {
  return {
    type: TYPE189,
    argument,
    qualifier,
    typeParameters
  };
}
function isTSImportType(node) {
  return is(TYPE189, node);
}
function assertTSImportType(node) {
  assert(TYPE189, node);
}

// src/nodes/typescript/misc/ts-index-signature.ts
var TYPE190 = "TSIndexSignature";
function tsIndexSignature(parameters, typeAnnotation2 = null) {
  return {
    type: TYPE190,
    parameters,
    typeAnnotation: typeAnnotation2
  };
}
function isTSIndexSignature(node) {
  return is(TYPE190, node);
}
function assertTSIndexSignature(node) {
  assert(TYPE190, node);
}

// src/nodes/typescript/misc/ts-indexed-access-type.ts
var TYPE191 = "TSIndexedAccessType";
function tsIndexedAccessType(objectType, indexType) {
  return {
    type: TYPE191,
    objectType,
    indexType
  };
}
function isTSIndexedAccessType(node) {
  return is(TYPE191, node);
}
function assertTSIndexedAccessType(node) {
  assert(TYPE191, node);
}

// src/nodes/typescript/misc/ts-infer-type.ts
var TYPE192 = "TSInferType";
function tsInferType(typeParameter) {
  return {
    type: TYPE192,
    typeParameter
  };
}
function isTSInferType(node) {
  return is(TYPE192, node);
}
function assertTSInferType(node) {
  assert(TYPE192, node);
}

// src/nodes/typescript/misc/ts-intersection-type.ts
var TYPE193 = "TSIntersectionType";
function tsIntersectionType(types) {
  return {
    type: TYPE193,
    types
  };
}
function isTSIntersectionType(node) {
  return is(TYPE193, node);
}
function assertTSIntersectionType(node) {
  assert(TYPE193, node);
}

// src/nodes/typescript/misc/ts-intrinsic-keyword.ts
var TYPE194 = "TSIntrinsicKeyword";
function tsIntrinsicKeyword() {
  return {
    type: TYPE194
  };
}
function isTSIntrinsicKeyword(node) {
  return is(TYPE194, node);
}
function assertTSIntrinsicKeyword(node) {
  assert(TYPE194, node);
}

// src/nodes/typescript/misc/ts-literal-type.ts
var TYPE195 = "TSLiteralType";
function tsLiteralType(literal) {
  return {
    type: TYPE195,
    literal
  };
}
function isTSLiteralType(node) {
  return is(TYPE195, node);
}
function assertTSLiteralType(node) {
  assert(TYPE195, node);
}

// src/nodes/typescript/misc/ts-mapped-type.ts
var TYPE196 = "TSMappedType";
function tsMappedType(typeParameter, typeAnnotation2 = null, nameType = null) {
  return {
    type: TYPE196,
    typeParameter,
    typeAnnotation: typeAnnotation2,
    nameType
  };
}
function isTSMappedType(node) {
  return is(TYPE196, node);
}
function assertTSMappedType(node) {
  assert(TYPE196, node);
}

// src/nodes/typescript/misc/ts-method-signature.ts
var TYPE197 = "TSMethodSignature";
function tsMethodSignature(key, typeParameters, parameters, typeAnnotation2 = null, kind = "method") {
  return {
    type: TYPE197,
    key,
    typeParameters,
    parameters,
    typeAnnotation: typeAnnotation2,
    kind
  };
}
function isTSMethodSignature(node) {
  return is(TYPE197, node);
}
function assertTSMethodSignature(node) {
  assert(TYPE197, node);
}

// src/nodes/typescript/misc/ts-module-block.ts
var TYPE198 = "TSModuleBlock";
function tsModuleBlock(body) {
  return {
    type: TYPE198,
    body
  };
}
function isTSModuleBlock(node) {
  return is(TYPE198, node);
}
function assertTSModuleBlock(node) {
  assert(TYPE198, node);
}

// src/nodes/typescript/misc/ts-named-tuple-member.ts
var TYPE199 = "TSNamedTupleMember";
function tsNamedTupleMember(label, elementType, optional = false) {
  return {
    type: TYPE199,
    label,
    elementType,
    optional
  };
}
function isTSNamedTupleMember(node) {
  return is(TYPE199, node);
}
function assertTSNamedTupleMember(node) {
  assert(TYPE199, node);
}

// src/nodes/typescript/misc/ts-never-keyword.ts
var TYPE200 = "TSNeverKeyword";
function tsNeverKeyword() {
  return {
    type: TYPE200
  };
}
function isTSNeverKeyword(node) {
  return is(TYPE200, node);
}
function assertTSNeverKeyword(node) {
  assert(TYPE200, node);
}

// src/nodes/typescript/misc/ts-null-keyword.ts
var TYPE201 = "TSNullKeyword";
function tsNullKeyword() {
  return {
    type: TYPE201
  };
}
function isTSNullKeyword(node) {
  return is(TYPE201, node);
}
function assertTSNullKeyword(node) {
  assert(TYPE201, node);
}

// src/nodes/typescript/misc/ts-number-keyword.ts
var TYPE202 = "TSNumberKeyword";
function tsNumberKeyword() {
  return {
    type: TYPE202
  };
}
function isTSNumberKeyword(node) {
  return is(TYPE202, node);
}
function assertTSNumberKeyword(node) {
  assert(TYPE202, node);
}

// src/nodes/typescript/misc/ts-object-keyword.ts
var TYPE203 = "TSObjectKeyword";
function tsObjectKeyword() {
  return {
    type: TYPE203
  };
}
function isTSObjectKeyword(node) {
  return is(TYPE203, node);
}
function assertTSObjectKeyword(node) {
  assert(TYPE203, node);
}

// src/nodes/typescript/misc/ts-optional-type.ts
var TYPE204 = "TSOptionalType";
function tsOptionalType(typeAnnotation2) {
  return {
    type: TYPE204,
    typeAnnotation: typeAnnotation2
  };
}
function isTSOptionalType(node) {
  return is(TYPE204, node);
}
function assertTSOptionalType(node) {
  assert(TYPE204, node);
}

// src/nodes/typescript/misc/ts-parameter-property.ts
var TYPE205 = "TSParameterProperty";
function tsParameterProperty(parameter) {
  return {
    type: TYPE205,
    parameter
  };
}
function isTSParameterProperty(node) {
  return is(TYPE205, node);
}
function assertTSParameterProperty(node) {
  assert(TYPE205, node);
}

// src/nodes/typescript/misc/ts-parenthesized-type.ts
var TYPE206 = "TSParenthesizedType";
function tsParenthesizedType(typeAnnotation2) {
  return {
    type: TYPE206,
    typeAnnotation: typeAnnotation2
  };
}
function isTSParenthesizedType(node) {
  return is(TYPE206, node);
}
function assertTSParenthesizedType(node) {
  assert(TYPE206, node);
}

// src/nodes/typescript/misc/ts-property-signature.ts
var TYPE207 = "TSPropertySignature";
function tsPropertySignature(key, typeAnnotation2 = null, kind = null) {
  return {
    type: TYPE207,
    key,
    typeAnnotation: typeAnnotation2,
    kind
    // no nulls lul,
  };
}
function isTSPropertySignature(node) {
  return is(TYPE207, node);
}
function assertTSPropertySignature(node) {
  assert(TYPE207, node);
}

// src/nodes/typescript/misc/ts-qualified-name.ts
var TYPE208 = "TSQualifiedName";
function tsQualifiedName(left, right) {
  return {
    type: TYPE208,
    left,
    right
  };
}
function isTSQualifiedName(node) {
  return is(TYPE208, node);
}
function assertTSQualifiedName(node) {
  assert(TYPE208, node);
}

// src/nodes/typescript/misc/ts-rest-type.ts
var TYPE209 = "TSRestType";
function tsRestType(typeAnnotation2) {
  return {
    type: TYPE209,
    typeAnnotation: typeAnnotation2
  };
}
function isTSRestType(node) {
  return is(TYPE209, node);
}
function assertTSRestType(node) {
  assert(TYPE209, node);
}

// src/nodes/typescript/misc/ts-string-keyword.ts
var TYPE210 = "TSStringKeyword";
function tsStringKeyword() {
  return {
    type: TYPE210
  };
}
function isTSStringKeyword(node) {
  return is(TYPE210, node);
}
function assertTSStringKeyword(node) {
  assert(TYPE210, node);
}

// src/nodes/typescript/misc/ts-symbol-keyword.ts
var TYPE211 = "TSSymbolKeyword";
function tsSymbolKeyword() {
  return {
    type: TYPE211
  };
}
function isTSSymbolKeyword(node) {
  return is(TYPE211, node);
}
function assertTSSymbolKeyword(node) {
  assert(TYPE211, node);
}

// src/nodes/typescript/misc/ts-this-type.ts
var TYPE212 = "TSThisType";
function tsThisType() {
  return {
    type: TYPE212
  };
}
function isTSThisType(node) {
  return is(TYPE212, node);
}
function assertTSThisType(node) {
  assert(TYPE212, node);
}

// src/nodes/typescript/misc/ts-tuple-type.ts
var TYPE213 = "TSTupleType";
function tsTupleType(elementTypes) {
  return {
    type: TYPE213,
    elementTypes
  };
}
function isTSTupleType(node) {
  return is(TYPE213, node);
}
function assertTSTupleType(node) {
  assert(TYPE213, node);
}

// src/nodes/typescript/misc/ts-type-annotation.ts
var TYPE214 = "TSTypeAnnotation";
function tsTypeAnnotation(typeAnnotation2) {
  return {
    type: TYPE214,
    typeAnnotation: typeAnnotation2
  };
}
function isTSTypeAnnotation(node) {
  return is(TYPE214, node);
}
function assertTSTypeAnnotation(node) {
  assert(TYPE214, node);
}

// src/nodes/typescript/misc/ts-type-literal.ts
var TYPE215 = "TSTypeLiteral";
function tsTypeLiteral(members) {
  return {
    type: TYPE215,
    members
  };
}
function isTSTypeLiteral(node) {
  return is(TYPE215, node);
}
function assertTSTypeLiteral(node) {
  assert(TYPE215, node);
}

// src/nodes/typescript/misc/ts-type-operator.ts
var TYPE216 = "TSTypeOperator";
function tsTypeOperator(typeAnnotation2, operator = "keyof") {
  return {
    type: TYPE216,
    typeAnnotation: typeAnnotation2,
    operator
  };
}
function isTSTypeOperator(node) {
  return is(TYPE216, node);
}
function assertTSTypeOperator(node) {
  assert(TYPE216, node);
}

// src/nodes/typescript/misc/ts-type-parameter.ts
var TYPE217 = "TSTypeParameter";
function tsTypeParameter(constraint, _default, name) {
  return {
    type: TYPE217,
    constraint,
    default: _default,
    name
  };
}
function isTSTypeParameter(node) {
  return is(TYPE217, node);
}
function assertTSTypeParameter(node) {
  assert(TYPE217, node);
}

// src/nodes/typescript/misc/ts-type-parameter-declaration.ts
var TYPE218 = "TSTypeParameterDeclaration";
function tsTypeParameterDeclaration(params) {
  return {
    type: TYPE218,
    params
  };
}
function isTSTypeParameterDeclaration(node) {
  return is(TYPE218, node);
}
function assertTSTypeParameterDeclaration(node) {
  assert(TYPE218, node);
}

// src/nodes/typescript/misc/ts-type-parameter-instantiation.ts
var TYPE219 = "TSTypeParameterInstantiation";
function tsTypeParameterInstantiation(params) {
  return {
    type: TYPE219,
    params
  };
}
function isTSTypeParameterInstantiation(node) {
  return is(TYPE219, node);
}
function assertTSTypeParameterInstantiation(node) {
  assert(TYPE219, node);
}

// src/nodes/typescript/misc/ts-type-predicate.ts
var TYPE220 = "TSTypePredicate";
function tsTypePredicate(parameterName, typeAnnotation2 = null, asserts = null) {
  return {
    type: TYPE220,
    parameterName,
    typeAnnotation: typeAnnotation2,
    asserts
  };
}
function isTSTypePredicate(node) {
  return is(TYPE220, node);
}
function assertTSTypePredicate(node) {
  assert(TYPE220, node);
}

// src/nodes/typescript/misc/ts-type-query.ts
var TYPE221 = "TSTypeQuery";
function tsTypeQuery(exprName, typeParameters = null) {
  return {
    type: TYPE221,
    exprName,
    typeParameters
  };
}
function isTSTypeQuery(node) {
  return is(TYPE221, node);
}
function assertTSTypeQuery(node) {
  assert(TYPE221, node);
}

// src/nodes/typescript/misc/ts-type-reference.ts
var TYPE222 = "TSTypeReference";
function tsTypeReference(typeName, typeParameters = null) {
  return {
    type: TYPE222,
    typeName,
    typeParameters
  };
}
function isTSTypeReference(node) {
  return is(TYPE222, node);
}
function assertTSTypeReference(node) {
  assert(TYPE222, node);
}

// src/nodes/typescript/misc/ts-undefined-keyword.ts
var TYPE223 = "TSUndefinedKeyword";
function tsUndefinedKeyword() {
  return {
    type: TYPE223
  };
}
function isTSUndefinedKeyword(node) {
  return is(TYPE223, node);
}
function assertTSUndefinedKeyword(node) {
  assert(TYPE223, node);
}

// src/nodes/typescript/misc/ts-union-type.ts
var TYPE224 = "TSUnionType";
function tsUnionType(types) {
  return {
    type: TYPE224,
    types
  };
}
function isTSUnionType(node) {
  return is(TYPE224, node);
}
function assertTSUnionType(node) {
  assert(TYPE224, node);
}

// src/nodes/typescript/misc/ts-unknown-keyword.ts
var TYPE225 = "TSUnknownKeyword";
function tsUnknownKeyword() {
  return {
    type: TYPE225
  };
}
function isTSUnknownKeyword(node) {
  return is(TYPE225, node);
}
function assertTSUnknownKeyword(node) {
  assert(TYPE225, node);
}

// src/nodes/typescript/misc/ts-void-keyword.ts
var TYPE226 = "TSVoidKeyword";
function tsVoidKeyword() {
  return {
    type: TYPE226
  };
}
function isTSVoidKeyword(node) {
  return is(TYPE226, node);
}
function assertTSVoidKeyword(node) {
  assert(TYPE226, node);
}

// src/nodes/typescript/statements/ts-declare-function.ts
var TYPE227 = "TSDeclareFunction";
function tsDeclareFunction(id, typeParameters, params, returnType) {
  return {
    type: TYPE227,
    id,
    typeParameters,
    params,
    returnType
  };
}
function isTSDeclareFunction(node) {
  return is(TYPE227, node);
}
function assertTSDeclareFunction(node) {
  assert(TYPE227, node);
}

// src/nodes/typescript/statements/ts-enum-declaration.ts
var TYPE228 = "TSEnumDeclaration";
function tsEnumDeclaration(id, members) {
  return {
    type: TYPE228,
    id,
    members
  };
}
function isTSEnumDeclaration(node) {
  return is(TYPE228, node);
}
function assertTSEnumDeclaration(node) {
  assert(TYPE228, node);
}

// src/nodes/typescript/statements/ts-export-assignment.ts
var TYPE229 = "TSExportAssignment";
function tsExportAssignment(expression) {
  return {
    type: TYPE229,
    expression
  };
}
function isTSExportAssignment(node) {
  return is(TYPE229, node);
}
function assertTSExportAssignment(node) {
  assert(TYPE229, node);
}

// src/nodes/typescript/statements/ts-import-equals-declaration.ts
var TYPE230 = "TSImportEqualsDeclaration";
function tsImportEqualsDeclaration(id, moduleReference) {
  return {
    type: TYPE230,
    id,
    moduleReference,
    isExport: false
  };
}
function isTSImportEqualsDeclaration(node) {
  return is(TYPE230, node);
}
function assertTSImportEqualsDeclaration(node) {
  assert(TYPE230, node);
}

// src/nodes/typescript/statements/ts-interface-declaration.ts
var TYPE231 = "TSInterfaceDeclaration";
function tsInterfaceDeclaration(id, typeParameters, interfaceExtends2, body) {
  return {
    type: TYPE231,
    id,
    typeParameters,
    extends: interfaceExtends2,
    body
  };
}
function isTSInterfaceDeclaration(node) {
  return is(TYPE231, node);
}
function assertTSInterfaceDeclaration(node) {
  assert(TYPE231, node);
}

// src/nodes/typescript/statements/ts-module-declaration.ts
var TYPE232 = "TSModuleDeclaration";
function tsModuleDeclaration(id, body) {
  return {
    type: TYPE232,
    id,
    body
  };
}
function isTSModuleDeclaration(node) {
  return is(TYPE232, node);
}
function assertTSModuleDeclaration(node) {
  assert(TYPE232, node);
}

// src/nodes/typescript/statements/ts-namespace-export-declaration.ts
var TYPE233 = "TSNamespaceExportDeclaration";
function tsNamespaceExportDeclaration(id) {
  return {
    type: TYPE233,
    id
  };
}
function isTSNamespaceExportDeclaration(node) {
  return is(TYPE233, node);
}
function assertTSNamespaceExportDeclaration(node) {
  assert(TYPE233, node);
}

// src/nodes/typescript/statements/ts-type-alias-declaration.ts
var TYPE234 = "TSTypeAliasDeclaration";
function tsTypeAliasDeclaration(id, typeParameters, typeAnnotation2) {
  return {
    type: TYPE234,
    id,
    typeParameters,
    typeAnnotation: typeAnnotation2
  };
}
function isTSTypeAliasDeclaration(node) {
  return is(TYPE234, node);
}
function assertTSTypeAliasDeclaration(node) {
  assert(TYPE234, node);
}
export {
  _import,
  _super,
  addComment,
  addComments,
  anyTypeAnnotation,
  argumentPlaceholder,
  arrayExpression,
  arrayPattern,
  arrayTypeAnnotation,
  arrowFunctionExpression,
  assertAnyTypeAnnotation,
  assertArgumentPlaceholder,
  assertArrayExpression,
  assertArrayPattern,
  assertArrayTypeAnnotation,
  assertArrowFunctionExpression,
  assertAssignmentExpression,
  assertAssignmentPattern,
  assertAwaitExpression,
  assertBigIntLiteral,
  assertBinaryExpression,
  assertBindExpression,
  assertBlockStatement,
  assertBooleanLiteral,
  assertBooleanLiteralTypeAnnotation,
  assertBooleanTypeAnnotation,
  assertBreakStatement,
  assertCallExpression,
  assertCatchClause,
  assertClassAccessorProperty,
  assertClassBody,
  assertClassDeclaration,
  assertClassExpression,
  assertClassMethod,
  assertClassPrivateMethod,
  assertClassPrivateProperty,
  assertClassProperty,
  assertConditionalExpression,
  assertContinueStatement,
  assertDebuggerStatement,
  assertDecimalLiteral,
  assertDeclareClass,
  assertDeclareExportAllDeclaration,
  assertDeclareExportDeclaration,
  assertDeclareFunction,
  assertDeclareInterface,
  assertDeclareModule,
  assertDeclareModuleExports,
  assertDeclareOpaqueType,
  assertDeclareTypeAlias,
  assertDeclareVariable,
  assertDecorator,
  assertDirective,
  assertDirectiveLiteral,
  assertDoExpression,
  assertDoWhileStatement,
  assertEmptyStatement,
  assertEmptyTypeAnnotation,
  assertEnumBooleanBody,
  assertEnumBooleanMember,
  assertEnumDeclaration,
  assertEnumDefaultedMember,
  assertEnumNumberBody,
  assertEnumNumberMember,
  assertEnumStringBody,
  assertEnumStringMember,
  assertEnumSymbolBody,
  assertExistsTypeAnnotation,
  assertExportAllDeclaration,
  assertExportDefaultSpecifier,
  assertExportNamedDeclaration,
  assertExportNamespaceSpecifier,
  assertExportSpecifier,
  assertExpressionStatement,
  assertForInStatement,
  assertForOfStatement,
  assertForStatement,
  assertFunctionDeclaration,
  assertFunctionExpression,
  assertFunctionTypeAnnotation,
  assertFunctionTypeParam,
  assertGenericTypeAnnotation,
  assertIdentifier,
  assertIfStatement,
  assertImport,
  assertImportDeclaration,
  assertImportDefaultSpecifier,
  assertImportExpression,
  assertImportNamespaceSpecifier,
  assertImportSpecifier,
  assertIndexedAccessType,
  assertInterfaceDeclaration,
  assertInterfaceExtends,
  assertInterfaceTypeAnnotation,
  assertIntersectionTypeAnnotation,
  assertJSXAttribute,
  assertJSXClosingElement,
  assertJSXClosingFragment,
  assertJSXElement,
  assertJSXEmptyExpression,
  assertJSXExpressionContainer,
  assertJSXFragment,
  assertJSXIdentifier,
  assertJSXMemberExpression,
  assertJSXNamespacedName,
  assertJSXOpeningElement,
  assertJSXOpeningFragment,
  assertJSXSpreadAttribute,
  assertJSXSpreadChild,
  assertJSXText,
  assertLabeledStatement,
  assertLogicalExpression,
  assertMemberExpression,
  assertMetaProperty,
  assertMixedTypeAnnotation,
  assertModuleExpression,
  assertNewExpression,
  assertNullLiteral,
  assertNullLiteralTypeAnnotation,
  assertNullableTypeAnnotation,
  assertNumberLiteralTypeAnnotation,
  assertNumberTypeAnnotation,
  assertNumericLiteral,
  assertObjectExpression,
  assertObjectMethod,
  assertObjectPattern,
  assertObjectProperty,
  assertObjectTypeAnnotation,
  assertObjectTypeCallProperty,
  assertObjectTypeIndexer,
  assertObjectTypeInternalSlot,
  assertObjectTypeProperty,
  assertObjectTypeSpreadProperty,
  assertOpaqueType,
  assertOptionalCallExpression,
  assertOptionalIndexedAccessType,
  assertOptionalMemberExpression,
  assertParenthesizedExpression,
  assertPipelineBareFunction,
  assertPipelinePrimaryTopicReference,
  assertPipelineTopicExpression,
  assertPrivateName,
  assertQualifiedTypeIdentifier,
  assertRecordExpression,
  assertRegExpLiteral,
  assertRestElement,
  assertReturnStatement,
  assertSequenceExpression,
  assertSpreadElement,
  assertStaticBlock,
  assertStringLiteral,
  assertStringLiteralTypeAnnotation,
  assertStringTypeAnnotation,
  assertSuper,
  assertSwitchCase,
  assertSwitchStatement,
  assertSymbolTypeAnnotation,
  assertTSAnyKeyword,
  assertTSArrayType,
  assertTSAsExpression,
  assertTSBigIntKeyword,
  assertTSBooleanKeyword,
  assertTSCallSignatureDeclaration,
  assertTSConditionalType,
  assertTSConstructSignatureDeclaration,
  assertTSConstructorType,
  assertTSDeclareFunction,
  assertTSDeclareMethod,
  assertTSEnumDeclaration,
  assertTSExportAssignment,
  assertTSExpressionWithTypeArguments,
  assertTSFunctionType,
  assertTSImportEqualsDeclaration,
  assertTSImportType,
  assertTSIndexSignature,
  assertTSIndexedAccessType,
  assertTSInferType,
  assertTSInstantiationExpression,
  assertTSInterfaceDeclaration,
  assertTSIntersectionType,
  assertTSIntrinsicKeyword,
  assertTSLiteralType,
  assertTSMappedType,
  assertTSMethodSignature,
  assertTSModuleBlock,
  assertTSModuleDeclaration,
  assertTSNamedTupleMember,
  assertTSNamespaceExportDeclaration,
  assertTSNeverKeyword,
  assertTSNonNullExpression,
  assertTSNullKeyword,
  assertTSNumberKeyword,
  assertTSObjectKeyword,
  assertTSOptionalType,
  assertTSParameterProperty,
  assertTSParenthesizedType,
  assertTSPropertySignature,
  assertTSQualifiedName,
  assertTSRestType,
  assertTSSatisfiesExpression,
  assertTSStringKeyword,
  assertTSSymbolKeyword,
  assertTSThisType,
  assertTSTupleType,
  assertTSTypeAliasDeclaration,
  assertTSTypeAnnotation,
  assertTSTypeAssertion,
  assertTSTypeLiteral,
  assertTSTypeOperator,
  assertTSTypeParameter,
  assertTSTypeParameterDeclaration,
  assertTSTypeParameterInstantiation,
  assertTSTypePredicate,
  assertTSTypeQuery,
  assertTSTypeReference,
  assertTSUndefinedKeyword,
  assertTSUnionType,
  assertTSUnknownKeyword,
  assertTSVoidKeyword,
  assertTaggedTemplateExpression,
  assertTemplateElement,
  assertTemplateLiteral,
  assertThisExpression,
  assertThisTypeAnnotation,
  assertThrowStatement,
  assertTopicReference,
  assertTryStatement,
  assertTupleExpression,
  assertTupleTypeAnnotation,
  assertTypeAlias,
  assertTypeAnnotation,
  assertTypeCastExpression,
  assertTypeofTypeAnnotation,
  assertUnaryExpression,
  assertUnionTypeAnnotation,
  assertUpdateExpression,
  assertV8IntrinsicIdentifier,
  assertVariableDeclaration,
  assertVariableDeclarator,
  assertVariance,
  assertVoidTypeAnnotation,
  assertWhileStatement,
  assertWithStatement,
  assertYieldExpression,
  assignmentExpression,
  assignmentPattern,
  awaitExpression,
  bigIntLiteral,
  binaryExpression,
  bindExpression,
  blockStatement,
  booleanLiteral,
  booleanLiteralTypeAnnotation,
  booleanTypeAnnotation,
  breakStatement,
  callExpression,
  catchClause,
  classAccessorProperty,
  classBody,
  classDeclaration,
  classExpression,
  classMethod,
  classPrivateMethod,
  classPrivateProperty,
  classProperty,
  conditionalExpression,
  continueStatement,
  debuggerStatement,
  decimalLiteral,
  declareClass,
  declareExportAllDeclaration,
  declareExportDeclaration,
  declareFunction,
  declareInterface,
  declareModule,
  declareModuleExports,
  declareOpaqueType,
  declareTypeAlias,
  declareVariable,
  decorator,
  directive,
  directiveLiteral,
  doExpression,
  doWhileStatement,
  emptyStatement,
  emptyTypeAnnotation,
  enumBooleanBody,
  enumBooleanMember,
  enumDeclaration,
  enumDefaultedMember,
  enumNumberBody,
  enumNumberMember,
  enumStringBody,
  enumStringMember,
  enumSymbolBody,
  existsTypeAnnotation,
  exportAllDeclaration,
  exportDefaultSpecifier,
  exportNamedDeclaration,
  exportNamespaceSpecifier,
  exportSpecifier,
  expressionStatement,
  forInStatement,
  forOfStatement,
  forStatement,
  functionDeclaration,
  functionExpression,
  functionTypeAnnotation,
  functionTypeParam,
  genericTypeAnnotation,
  identifier,
  ifStatement,
  importDeclaration,
  importDefaultSpecifier,
  importExpression,
  importNamespaceSpecifier,
  importSpecifier,
  indexedAccessType,
  interfaceDeclaration,
  interfaceExtends,
  interfaceTypeAnnotation,
  intersectionTypeAnnotation,
  isAnyTypeAnnotation,
  isArgumentPlaceholder,
  isArrayExpression,
  isArrayPattern,
  isArrayTypeAnnotation,
  isArrowFunctionExpression,
  isAssignmentExpression,
  isAssignmentPattern,
  isAwaitExpression,
  isBigIntLiteral,
  isBinaryExpression,
  isBindExpression,
  isBlockStatement,
  isBooleanLiteral,
  isBooleanLiteralTypeAnnotation,
  isBooleanTypeAnnotation,
  isBreakStatement,
  isCallExpression,
  isCatchClause,
  isClassAccessorProperty,
  isClassBody,
  isClassDeclaration,
  isClassExpression,
  isClassMethod,
  isClassPrivateMethod,
  isClassPrivateProperty,
  isClassProperty,
  isConditionalExpression,
  isContinueStatement,
  isDebuggerStatement,
  isDecimalLiteral,
  isDeclareClass,
  isDeclareExportAllDeclaration,
  isDeclareExportDeclaration,
  isDeclareFunction,
  isDeclareInterface,
  isDeclareModule,
  isDeclareModuleExports,
  isDeclareOpaqueType,
  isDeclareTypeAlias,
  isDeclareVariable,
  isDecorator,
  isDirective,
  isDirectiveLiteral,
  isDoExpression,
  isDoWhileStatement,
  isEmptyStatement,
  isEmptyTypeAnnotation,
  isEnumBooleanBody,
  isEnumBooleanMember,
  isEnumDeclaration,
  isEnumDefaultedMember,
  isEnumNumberBody,
  isEnumNumberMember,
  isEnumStringBody,
  isEnumStringMember,
  isEnumSymbolBody,
  isExistsTypeAnnotation,
  isExportAllDeclaration,
  isExportDefaultSpecifier,
  isExportNamedDeclaration,
  isExportNamespaceSpecifier,
  isExportSpecifier,
  isExpressionStatement,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isFunctionDeclaration,
  isFunctionExpression,
  isFunctionTypeAnnotation,
  isFunctionTypeParam,
  isGenericTypeAnnotation,
  isIdentifier,
  isIfStatement,
  isImport,
  isImportDeclaration,
  isImportDefaultSpecifier,
  isImportExpression,
  isImportNamespaceSpecifier,
  isImportSpecifier,
  isIndexedAccessType,
  isInterfaceDeclaration,
  isInterfaceExtends,
  isInterfaceTypeAnnotation,
  isIntersectionTypeAnnotation,
  isJSXAttribute,
  isJSXClosingElement,
  isJSXClosingFragment,
  isJSXElement,
  isJSXEmptyExpression,
  isJSXExpressionContainer,
  isJSXFragment,
  isJSXIdentifier,
  isJSXMemberExpression,
  isJSXNamespacedName,
  isJSXOpeningElement,
  isJSXOpeningFragment,
  isJSXSpreadAttribute,
  isJSXSpreadChild,
  isJSXText,
  isLabeledStatement,
  isLogicalExpression,
  isMemberExpression,
  isMetaProperty,
  isMixedTypeAnnotation,
  isModuleExpression,
  isNewExpression,
  isNullLiteral,
  isNullLiteralTypeAnnotation,
  isNullableTypeAnnotation,
  isNumberLiteralTypeAnnotation,
  isNumberTypeAnnotation,
  isNumericLiteral,
  isObjectExpression,
  isObjectMethod,
  isObjectPattern,
  isObjectProperty,
  isObjectTypeAnnotation,
  isObjectTypeCallProperty,
  isObjectTypeIndexer,
  isObjectTypeInternalSlot,
  isObjectTypeProperty,
  isObjectTypeSpreadProperty,
  isOpaqueType,
  isOptionalCallExpression,
  isOptionalIndexedAccessType,
  isOptionalMemberExpression,
  isParenthesizedExpression,
  isPipelineBareFunction,
  isPipelinePrimaryTopicReference,
  isPipelineTopicExpression,
  isPrivateName,
  isQualifiedTypeIdentifier,
  isRecordExpression,
  isRegExpLiteral,
  isRestElement,
  isReturnStatement,
  isSequenceExpression,
  isSpreadElement,
  isStaticBlock,
  isStringLiteral,
  isStringLiteralTypeAnnotation,
  isStringTypeAnnotation,
  isSuper,
  isSwitchCase,
  isSwitchStatement,
  isSymbolTypeAnnotation,
  isTSAnyKeyword,
  isTSArrayType,
  isTSAsExpression,
  isTSBigIntKeyword,
  isTSBooleanKeyword,
  isTSCallSignatureDeclaration,
  isTSConditionalType,
  isTSConstructSignatureDeclaration,
  isTSConstructorType,
  isTSDeclareFunction,
  isTSDeclareMethod,
  isTSEnumDeclaration,
  isTSExportAssignment,
  isTSExpressionWithTypeArguments,
  isTSFunctionType,
  isTSImportEqualsDeclaration,
  isTSImportType,
  isTSIndexSignature,
  isTSIndexedAccessType,
  isTSInferType,
  isTSInstantiationExpression,
  isTSInterfaceDeclaration,
  isTSIntersectionType,
  isTSIntrinsicKeyword,
  isTSLiteralType,
  isTSMappedType,
  isTSMethodSignature,
  isTSModuleBlock,
  isTSModuleDeclaration,
  isTSNamedTupleMember,
  isTSNamespaceExportDeclaration,
  isTSNeverKeyword,
  isTSNonNullExpression,
  isTSNullKeyword,
  isTSNumberKeyword,
  isTSObjectKeyword,
  isTSOptionalType,
  isTSParameterProperty,
  isTSParenthesizedType,
  isTSPropertySignature,
  isTSQualifiedName,
  isTSRestType,
  isTSSatisfiesExpression,
  isTSStringKeyword,
  isTSSymbolKeyword,
  isTSThisType,
  isTSTupleType,
  isTSTypeAliasDeclaration,
  isTSTypeAnnotation,
  isTSTypeAssertion,
  isTSTypeLiteral,
  isTSTypeOperator,
  isTSTypeParameter,
  isTSTypeParameterDeclaration,
  isTSTypeParameterInstantiation,
  isTSTypePredicate,
  isTSTypeQuery,
  isTSTypeReference,
  isTSUndefinedKeyword,
  isTSUnionType,
  isTSUnknownKeyword,
  isTSVoidKeyword,
  isTaggedTemplateExpression,
  isTemplateElement,
  isTemplateLiteral,
  isThisExpression,
  isThisTypeAnnotation,
  isThrowStatement,
  isTopicReference,
  isTryStatement,
  isTupleExpression,
  isTupleTypeAnnotation,
  isTypeAlias,
  isTypeAnnotation,
  isTypeCastExpression,
  isTypeofTypeAnnotation,
  isUnaryExpression,
  isUnionTypeAnnotation,
  isUpdateExpression,
  isV8IntrinsicIdentifier,
  isVariableDeclaration,
  isVariableDeclarator,
  isVariance,
  isVoidTypeAnnotation,
  isWhileStatement,
  isWithStatement,
  isYieldExpression,
  jsxAttribute,
  jsxClosingElement,
  jsxClosingFragment,
  jsxElement,
  jsxEmptyExpression,
  jsxExpressionContainer,
  jsxFragment,
  jsxIdentifier,
  jsxMemberExpression,
  jsxNamespacedName,
  jsxOpeningElement,
  jsxOpeningFragment,
  jsxSpreadAttribute,
  jsxSpreadChild,
  jsxText,
  labeledStatement,
  logicalExpression,
  memberExpression,
  metaProperty,
  mixedTypeAnnotation,
  moduleExpression,
  newExpression,
  nullLiteral,
  nullLiteralTypeAnnotation,
  nullableTypeAnnotation,
  numberLiteralTypeAnnotation,
  numberTypeAnnotation,
  numericLiteral,
  objectExpression,
  objectMethod,
  objectPattern,
  objectProperty,
  objectTypeAnnotation,
  objectTypeCallProperty,
  objectTypeIndexer,
  objectTypeInternalSlot,
  objectTypeProperty,
  objectTypeSpreadProperty,
  opaqueType,
  optionalCallExpression,
  optionalIndexedAccessType,
  optionalMemberExpression,
  parenthesizedExpression,
  pipelineBareFunction,
  pipelinePrimaryTopicReference,
  pipelineTopicExpression,
  privateName,
  qualifiedTypeIdentifier,
  recordExpression,
  regExpLiteral,
  restElement,
  returnStatement,
  sequenceExpression,
  spreadElement,
  staticBlock,
  stringLiteral,
  stringLiteralTypeAnnotation,
  stringTypeAnnotation,
  switchCase,
  switchStatement,
  symbolTypeAnnotation,
  taggedTemplateExpression,
  templateElement,
  templateLiteral,
  thisExpression,
  thisTypeAnnotation,
  throwStatement,
  topicReference,
  tryStatement,
  tsAnyKeyword,
  tsArrayType,
  tsAsExpression,
  tsBigIntKeyword,
  tsBooleanKeyword,
  tsCallSignatureDeclaration,
  tsConditionalType,
  tsConstructSignatureDeclaration,
  tsConstructorType,
  tsDeclareFunction,
  tsDeclareMethod,
  tsEnumDeclaration,
  tsExportAssignment,
  tsExpressionWithTypeArguments,
  tsFunctionType,
  tsImportEqualsDeclaration,
  tsImportType,
  tsIndexSignature,
  tsIndexedAccessType,
  tsInferType,
  tsInstantiationExpression,
  tsInterfaceDeclaration,
  tsIntersectionType,
  tsIntrinsicKeyword,
  tsLiteralType,
  tsMappedType,
  tsMethodSignature,
  tsModuleBlock,
  tsModuleDeclaration,
  tsNamedTupleMember,
  tsNamespaceExportDeclaration,
  tsNeverKeyword,
  tsNonNullExpression,
  tsNullKeyword,
  tsNumberKeyword,
  tsObjectKeyword,
  tsOptionalType,
  tsParameterProperty,
  tsParenthesizedType,
  tsPropertySignature,
  tsQualifiedName,
  tsRestType,
  tsSatisfiesExpression,
  tsStringKeyword,
  tsSymbolKeyword,
  tsThisType,
  tsTupleType,
  tsTypeAliasDeclaration,
  tsTypeAnnotation,
  tsTypeAssertion,
  tsTypeLiteral,
  tsTypeOperator,
  tsTypeParameter,
  tsTypeParameterDeclaration,
  tsTypeParameterInstantiation,
  tsTypePredicate,
  tsTypeQuery,
  tsTypeReference,
  tsUndefinedKeyword,
  tsUnionType,
  tsUnknownKeyword,
  tsVoidKeyword,
  tupleExpression,
  tupleTypeAnnotation,
  typeAlias,
  typeAnnotation,
  typeCastExpression,
  typeofTypeAnnotation,
  unaryExpression,
  unionTypeAnnotation,
  updateExpression,
  v8IntrinsicIdentifier,
  variableDeclaration,
  variableDeclarator,
  variance,
  voidTypeAnnotation,
  whileStatement,
  withStatement,
  yieldExpression
};
//# sourceMappingURL=index.mjs.map
