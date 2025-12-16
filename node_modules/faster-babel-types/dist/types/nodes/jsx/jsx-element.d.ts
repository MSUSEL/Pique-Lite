import type * as t from '@babel/types';
export declare function jsxElement(openingElement: t.JSXOpeningElement, closingElement: t.JSXClosingElement | null | undefined, children: Array<t.JSXText | t.JSXExpressionContainer | t.JSXSpreadChild | t.JSXElement | t.JSXFragment>, selfClosing?: boolean | null | undefined): t.JSXElement;
export declare function isJSXElement(node: t.Node | null | undefined): node is t.JSXElement;
export declare function assertJSXElement(node: t.Node | null | undefined): asserts node is t.JSXElement;
//# sourceMappingURL=jsx-element.d.ts.map