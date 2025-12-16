import type * as t from '@babel/types';
export declare function jsxOpeningElement(name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName, attributes: Array<t.JSXAttribute | t.JSXSpreadAttribute>, selfClosing?: boolean): t.JSXOpeningElement;
export declare function isJSXOpeningElement(node: t.Node | null | undefined): node is t.JSXOpeningElement;
export declare function assertJSXOpeningElement(node: t.Node | null | undefined): asserts node is t.JSXOpeningElement;
//# sourceMappingURL=jsx-opening-element.d.ts.map