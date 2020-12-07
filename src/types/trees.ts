import { Node, NodeColor, NodeSide } from './elems.js';
//red-black tree
class redBlackTree<T>
{
  private root? :Node<T>;

  constructor(){}

  private findUncle(node :Node<T>)
  {
    let grandParent = node.parent?.parent;
    if (grandParent?.left_child == node.parent)
      return grandParent?.right_child;
    else
      return grandParent?.left_child;
  }

  private check(node :Node<T>)
  {
    // console.log(node.value);
    if (node.parent?.color == NodeColor.RED)
    {
      let grandParent = node.parent?.parent;
      let bigDaddy = grandParent?.parent;
      //parent in the left
      if (grandParent?.left_child == node.parent)
      {
        // console.log('left_child', node.parent.value);
        let uncle = grandParent?.right_child;
        if (uncle == undefined || uncle.color == NodeColor.BLACK)
        {
          if (node.parent?.left_child == node)
          {
            if (bigDaddy != undefined)
            {
              if (bigDaddy.left_child == grandParent)
                bigDaddy.left_child = node.parent;
              else
                bigDaddy.right_child = node.parent;
            }
            node.parent.color = NodeColor.BLACK;
            if (grandParent!.left_child = node.parent.right_child)
              grandParent!.left_child.parent = grandParent;
            node.parent.right_child = grandParent;
            grandParent.parent = node.parent;
            node.parent.parent = bigDaddy;
            grandParent.color = NodeColor.RED;
            if (grandParent == this.root) this.root = node.parent;
          }
          else
          {
            if (bigDaddy != undefined)
            {
              if (bigDaddy.left_child == grandParent)
                bigDaddy.left_child = node;
              else
                bigDaddy.right_child = node;
            }
            grandParent.color = NodeColor.RED;
            node.right_child = grandParent;
            grandParent.parent = node;
            node.parent = bigDaddy;;
            node.left_child = node.parent;
            node.parent!.left_child = undefined;
            node.color = NodeColor.BLACK;
            grandParent!.left_child = undefined;
          }

        } else {
          uncle.color = NodeColor.BLACK;
          node.parent.color = NodeColor.BLACK;
          if (grandParent != this.root) grandParent.color = NodeColor.RED;
          console.log('check grandParent', grandParent!.value, grandParent!.color);
          this.check(grandParent!);
        }
      } else//parent in the right
      {
        let uncle = grandParent?.left_child;
        if (uncle == undefined || uncle.color == NodeColor.BLACK)
        {
          if (node.parent?.left_child == node)
          {
            if (bigDaddy != undefined)
            {
              if (bigDaddy.left_child == grandParent)
                bigDaddy.left_child = node;
              else
                bigDaddy.right_child = node;
            }
            grandParent!.color = NodeColor.RED;
            node.left_child = grandParent;
            node.parent = bigDaddy;
            grandParent!.parent = node;
            node.right_child = node.parent;
            node.parent!.left_child = undefined;
            node.color = NodeColor.BLACK;
            grandParent!.right_child = undefined;
          }
          else
          {
            if (bigDaddy != undefined)
            {
              if (bigDaddy.left_child == grandParent)
                bigDaddy.left_child = node.parent;
              else
                bigDaddy.right_child = node.parent;
            }
            node.parent.color = NodeColor.BLACK;
            if (grandParent!.right_child = node.parent.left_child)
              grandParent!.right_child!.parent = grandParent;
            node.parent.left_child = grandParent;
            node.parent.parent = bigDaddy;
            grandParent!.parent = node.parent;
            grandParent!.color = NodeColor.RED;
          }

        } else {
          uncle.color = NodeColor.BLACK;
          node.parent.color = NodeColor.BLACK;
          if (grandParent != this.root) grandParent!.color = NodeColor.RED;
          console.log('check grandParent rr', grandParent!.value);
          this.check(grandParent!);
        }
      }
    }
  }

  insert(item :Node<T>)
  {
    item.color = NodeColor.RED;
    if (this.root == undefined)
    {
      this.root = item;
      this.root.color = NodeColor.BLACK;
    } else {
      let temp :any = this.root;
      while(true)
      {
        if (temp.value >= item.value)
        {
          if (temp.left_child == undefined)
          {
            temp.left_child = item;
            item.parent = temp;
            break;
          }
          temp = temp.left_child;
        }
        else
        {
          if (temp.right_child == undefined)
          {
            temp.right_child = item;
            item.parent = temp;
            break;
          }
          temp = temp.right_child;
        }
      }
      this.check(item);
    }
  }
  private del_node(dlt :Node<T>) {
    if (dlt.parent) {
      if (dlt == dlt.parent.left_child)
        return dlt.parent.left_child == undefined, NodeSide.LEFT;
      else
        return dlt.parent.right_child == undefined, NodeSide.RIGHT;
    } else {
      return this.root = undefined, null;
    }
  }

  private setChild(parent :Node<T>, child :Node<T>, childDir :NodeSide)
  {
    child.parent = parent;
    if (childDir == NodeSide.LEFT) parent.left_child = child;
    else if (childDir == NodeSide.RIGHT) parent.right_child = child;
  }

  private checkDelete(nx :Node<T>)
  {
    let nxSide :NodeSide;
    let nw;

    while(!(nx == this.root && nx.color == NodeColor.BLACK))
    {
      if (nx == nx.parent!.left_child)
        nxSide = NodeSide.LEFT;
      else
        nxSide = NodeSide.RIGHT;

      if (nxSide == NodeSide.LEFT) {
         nw = nx.parent!.right_child;
         if (!nw) continue;
         if (nw!.color == NodeColor.RED) {
           nw.color = NodeColor.BLACK;
           nw.parent!.color = NodeColor.RED;
           let gp = nw.parent!.parent!;
           this.setChild(nw.parent!, nw.left_child!, NodeSide.RIGHT);
           this.setChild(nw, nw.parent!, NodeSide.LEFT);
           this.setChild(gp, nw, gp.left_child == nw.parent ? NodeSide.LEFT : NodeSide.RIGHT);
           nw = nx.parent!.right_child;
         }
      } else if (nxSide == NodeSide.RIGHT) {
        nw = nx.parent!.left_child;
        if (!nw) continue;
        if (nw!.color == NodeColor.RED) {
           nw.color = NodeColor.BLACK;
           nw.parent!.color = NodeColor.RED;
           let gp = nw.parent!.parent!;
           this.setChild(nw.parent!, nw.right_child!, NodeSide.LEFT);
           this.setChild(nw, nw.parent!, NodeSide.RIGHT);
           this.setChild(gp, nw, gp.left_child == nw.parent ? NodeSide.LEFT : NodeSide.RIGHT);
           nw = nx.parent!.left_child;
        }
      }


    }
  }

  delete(value :T)
  {
    let deleted;
    if (!this.root || this.root.value == value)
    {
      deleted = this.root;
    } else {
      deleted = this.root!;
      while(deleted)
      {
        if (deleted.value > value) {
          if (!deleted.left_child || deleted.left_child.value == value)
              break;
          deleted = deleted.left_child!;
        }
        else {
          if (!deleted.right_child || deleted.right_child.value == value)
              break;
          deleted = deleted.right_child!;
        }
      }

      if (!deleted) return;

      let color = deleted.color;
      let delSideParent = this.del_node(deleted);
      let nx :Node<T>;
      if (deleted.left_child == null) {
        if (deleted.right_child) {
          nx = deleted.right_child;
          this.setChild(deleted.parent!, deleted.right_child, delSideParent!);
        }
      } else if (deleted.right_child == null) {
        if (deleted.left_child) {
          nx = deleted.left_child;
          this.setChild(deleted.parent!, deleted.left_child, delSideParent!);
        }
      } else {
        nx = deleted.right_child;
        while(nx.left_child)
          nx = nx.left_child;
        this.setChild(nx.parent!, nx.right_child!, 'left');
        this.setChild(deleted.parent!, nx, delSideParent!);
        nx.right_child = deleted.right_child;
        nx.left_child = deleted.left_child;
        nx.color = color;
      }

      if (color == NodeColor.BLACK)
        this.checkDelete(nx!);

    }
  }

  get()
  {
    return this.root;
  }
}

export { redBlackTree };