//comparator interface

export interface IComparable
{
  compare(obj :IComparable) :number;
}

export interface IElement<T> extends IComparable
{
  value :T;
  swap?(other :IElement<T>) :void;
}

export enum NodeColor
{
    BLACK,
    RED
}

export class Node<T> implements IElement<T>
{
  public value :T;
  public right_child? :Node<T>;
  public left_child?  :Node<T>;
  public parent?  :Node<T>;
  public color? :NodeColor;

 constructor(val :T)
 {
   this.value = val;
 }

 compare(obj :Node<T>) :number
 {
   if (this.value > obj.value)
     return 1;
   else if (this.value < obj.value)
     return -1;
   else
     return 0;
 }
}

export class NumberItem implements IElement<number>
{
  constructor(public value :number){}

  compare(obj :IElement<number>) :number
  {
    if (this.value == obj.value) return 0;
    else if (this.value > obj.value) return 1;
    else if (this.value < obj.value) return -1;
    else throw new Error();
  }

  swap(other :IElement<number>)
  {
    let temp :number;
    temp = this.value;
    this.value = other.value;
    other.value = temp;
  }

  static create<T>(value :number) { return new NumberItem(value); }
}