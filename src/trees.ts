import { Node, NodeColor } from './elems.js';
//red-black tree
class red_black<T>
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
      if (node.parent?.color == NodeColor.RED)
      {
        // let uncle = this.findUncle(node);
        let grandParent = node.parent?.parent;
        let bigDaddy = grandParent?.parent;
        if (grandParent?.left_child == node.parent)
        {
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
              let parent_right_child = node.parent.right_child;
              node.parent.right_child = grandParent;
              grandParent.color = NodeColor.RED;
              if (parent_right_child != undefined)
                this.insert(parent_right_child!);
            }
            else
            {
              if (bigDaddy != undefined)
              {0
                if (bigDaddy.left_child == grandParent)
                  bigDaddy.left_child = node;
                else
                  bigDaddy.right_child = node;
              }
              grandParent.color = NodeColor.RED;
              node.right_child = grandParent;
              node.left_child = node.parent;
              node.parent.left_child = undefined;
              node.color = NodeColor.BLACK;
            }
          }
        }
        else
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
              node.right_child = node.parent;
              node.parent.left_child = undefined;
              node.color = NodeColor.BLACK;
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
              let parent_left_child = node.parent.left_child;
              node.parent.left_child = grandParent;
              grandParent!.color = NodeColor.RED;
              if (node.parent.left_child != undefined)
                this.insert(parent_left_child!);
            }
          }
        }
      }

  }

  insert(item :Node<T>)
  {
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

    }
  }

  delete(item :Node<T>)
  {

  }

}