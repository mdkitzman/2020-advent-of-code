export abstract class TreeNode<T extends TreeNode<T>> {
  children:T[];
  parent?:T

  constructor(children:T[] = [], parent?:T){
    this.children = children;
    this.parent = parent;
  }

  protected get thisNode():T {
    return this as unknown as T;
  }

  addChild(node:T) {
    this.children.push(node);
    node.parent = this.thisNode;
  }

  find(criteria:(node:T)=>boolean):T|undefined {
    if(criteria(this.thisNode))
      return this.thisNode;
    for(let child of this.children) {
      if(criteria(child))
        return child;
    }
  }
}