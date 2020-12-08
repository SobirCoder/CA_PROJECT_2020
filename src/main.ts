import { redBlackTree } from './types/trees.js';
import { Node } from './types/elems.js';

let tr = new redBlackTree<number>();


tr.insert(Node.create(65));
tr.insert(Node.create(45));
tr.insert(Node.create(66));
tr.insert(Node.create(86));
tr.insert(Node.create(87));
tr.insert(Node.create(35));
tr.insert(Node.create(25));
tr.insert(Node.create(15));

tr.insert(Node.create(1));
tr.insert(Node.create(2));
tr.insert(Node.create(3));
tr.insert(Node.create(39));
tr.insert(Node.create(38));
tr.insert(Node.create(27));
tr.insert(Node.create(78));

console.log(tr.get());

tr.delete(78);

console.log(tr.get());

tr.delete(25);

console.log(tr.get());


// console.log('root: ' + root!.value);
// console.log('lc: ' + root!.left_child!.value);
// console.log('rc: ' + root!.right_child!.value);