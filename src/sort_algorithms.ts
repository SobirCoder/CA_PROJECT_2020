import { numbers } from './test_array.js';

//comparator interface
interface IComparable
{
  compare(obj :IComparable) :number;
}

interface IElement<T> extends IComparable
{
  value :T;
  swap(other :IElement<T>) :void;
}

class NumberItem implements IElement<number>
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

//QuickSort algorithm

function quickSort<T>(items :IElement<T>[], begin :number, end :number) :void
{
  if (begin >= end) return;
  let smi_index = begin, pivot = items[end];

  for (let i = begin; i < end; i++)
  {
    if (items[i].compare(pivot) === -1)
    {
      items[i].swap(items[smi_index]);
      smi_index++;
    }
  }
  pivot.swap(items[smi_index]);

  quickSort(items, begin, smi_index - 1);
  quickSort(items, smi_index + 1, end);
}

 function mergeSort<T>(items :IElement<T>[], begin :number, end :number) :IElement<T>[]
 {
   if (begin == end) return [items[begin]];
   let middle = begin + Math.floor( (end - begin) / 2);

   let front :IElement<T>[] = mergeSort(items, begin, middle);
   let rear  :IElement<T>[] = mergeSort(items, middle + 1, end);

   let newArr :IElement<T>[] = [], idx = 0;
  for (let i = 0; i < front.length; i++)
  {
    while (idx < rear.length && front[i].compare(rear[idx]) == 1)
      newArr.push(rear[idx++]);

    newArr.push(front[i]);
  }

  if (rear.length != idx)
    newArr.splice(newArr.length, 0, ...rear.slice(idx, rear.length));

  return newArr;
 }

let items :NumberItem[] = [];

for (let nm of numbers)
  items.push(NumberItem.create(nm));

console.time('merge sort');
console.log(JSON.parse(JSON.stringify(mergeSort(items, 0, items.length - 1))));
console.timeEnd('merge sort');

console.time('quick sort');
quickSort(items, 0, items.length - 1);
console.log(items);
console.timeEnd('quick sort');