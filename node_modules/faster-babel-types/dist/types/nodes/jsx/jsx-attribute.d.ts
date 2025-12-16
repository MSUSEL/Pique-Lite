import type * as t from '@babel/types';
export declare function jsxAttribute(name: t.JSXIdentifier | t.JSXNamespacedName, value?: t.JSXElement | t.JSXFragment | t.StringLiteral | t.JSXExpressionContainer | null): t.JSXAttribute;
export declare function isJSXAttribute(node: t.Node | null | undefined): node is t.JSXAttribute;
export declare function assertJSXAttribute(node: t.Node | null | undefined): asserts node is t.JSXAttribute;
//# sourceMappingURL=jsx-attribute.d.ts.map