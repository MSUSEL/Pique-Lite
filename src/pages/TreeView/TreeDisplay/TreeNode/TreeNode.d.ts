// used to declare the types of the tree node for type safety
declare module "./TreeNode/TreeNode.jsx" {
  export default class TreeNode {
    constructor(info: any, rect: any, width: number, height: number, x: number, y: number);
    readonly json_data: any;
    _rect: any;
    readonly width: number;
    readonly height: number;
    _x: number;
    _y: number;
    _active: boolean;
    readonly children: TreeNode[];
    readonly node_center_x: number;
    readonly node_center_y: number;
    readonly name: string;
  }
}

export {};