import { Node, NodeColor } from './elems.js';
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
        if (temp.value > item.value)
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

  delete(item :Node<T>)
  {
  }

  get()
  {
    return this.root;
  }
}

export { redBlackTree };