import { vertex, adjacentNode, mst_prim } from './types/graph.js';

let vxs :vertex<string>[] = [];



vxs.push(vertex.create('a', [adjacentNode.create(4, 'b'), adjacentNode.create(4, 'h')]));
vxs.push(vertex.create('b', [adjacentNode.create(4, 'a'), adjacentNode.create(11, 'h'),
                              adjacentNode.create(8, 'c')]));
vxs.push(vertex.create('h', [adjacentNode.create(8, 'a'), adjacentNode.create(11, 'b'),
                              adjacentNode.create(7, 'i'), adjacentNode.create(1, 'g')]));
vxs.push(vertex.create('c', [adjacentNode.create(8, 'b'), adjacentNode.create(2, 'i'),
                              adjacentNode.create(4, 'f'), adjacentNode.create(7, 'd')]));
vxs.push(vertex.create('i', [adjacentNode.create(7, 'h'), adjacentNode.create(6, 'g'),
                              adjacentNode.create(2, 'c')]));
vxs.push(vertex.create('g', [adjacentNode.create(1, 'h'), adjacentNode.create(6, 'i'),
                              adjacentNode.create(2, 'f')]));
vxs.push(vertex.create('d', [adjacentNode.create(7, 'c'), adjacentNode.create(14, 'f'),
                              adjacentNode.create(9, 'e')]));
vxs.push(vertex.create('f', [adjacentNode.create(4, 'c'), adjacentNode.create(14, 'd'),
                              adjacentNode.create(2, 'g'), adjacentNode.create(10, 'e')]));
vxs.push(vertex.create('e', [adjacentNode.create(9, 'd'), adjacentNode.create(10, 'e')]));

mst_prim(vxs);








// vxs.push(vertex.create(1, [2, 0]));
// vxs.push(vertex.create(0, [1, 2, 2]));
// vxs.push(vertex.create(2, [0, 1, 3]));
// vxs.push(vertex.create(3, [3, 2]));

// dfs(vxs[2], vxs, undefined);

// vxs.push(vertex.create(0, [1, 2]));
// vxs.push(vertex.create(1, [0, 2, 3]));
// vxs.push(vertex.create(2, [0, 1, 4, 7]));
// vxs.push(vertex.create(3, [1, 4]));
// vxs.push(vertex.create(4, [2, 3, 5, 7]));
// vxs.push(vertex.create(5, [4, 6]));
// vxs.push(vertex.create(6, [5]));
// vxs.push(vertex.create(7, [2, 4]));

//dfs(vxs[0], vxs, undefined);
// bfs(vxs);


// import { redBlackTree } from './types/trees.js';
// import { Node } from './types/elems.js';

// let tr = new redBlackTree<number>();


// tr.insert(Node.create(65));
// tr.insert(Node.create(45));
// tr.insert(Node.create(66));
// tr.insert(Node.create(86));
// tr.insert(Node.create(87));
// tr.insert(Node.create(35));
// tr.insert(Node.create(25));
// tr.insert(Node.create(15));

// tr.insert(Node.create(1));
// tr.insert(Node.create(2));
// tr.insert(Node.create(3));
// tr.insert(Node.create(39));
// tr.insert(Node.create(38));
// tr.insert(Node.create(27));
// tr.insert(Node.create(78));

// console.log(tr.get());

// tr.delete(78);

// console.log(tr.get());

// tr.delete(25);

// console.log(tr.get());


// console.log('root: ' + root!.value);
// console.log('lc: ' + root!.left_child!.value);
// console.log('rc: ' + root!.right_child!.value);