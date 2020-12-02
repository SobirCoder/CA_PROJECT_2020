import { Node, NodeColor } from './elems.js';
//red-black tree
class red_black<T>
{

  private root? :Node<T>;

  constructor(){}

  insert(item :Node<T>)
  {
    if (this.root == undefined)
    {
      this.root = item;
      this.root.color = NodeColor.BLACK;
    } else {
      let temp :any = this.root;
      while(temp.left_child != undefined || temp.right_child != undefined)
      {
        if (temp.value > item.value) {
          temp = temp.left_child;
        }
        else {
          temp = temp.right_child;
        }
      }

    }
  }

  delete(item :Node<T>)
  {

  }

}