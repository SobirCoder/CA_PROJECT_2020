class adjacentNode<TValue>
{
  constructor(public weight :number, public value :TValue) {}

  public static create<T>(weight :number, value :T)
  {
    return new adjacentNode(weight, value);
  }
}

class vertex<TValue>
{
  constructor(public value :TValue, public adjacentNodes :adjacentNode<TValue>[]) {}

  addAdjacentNode(weight :number, value :TValue)
  {
    this.adjacentNodes.push(adjacentNode.create(weight, value));
  }

  static create<T>(val :T, adjacentNodes :adjacentNode<T>[])
  {
    return new vertex(val, adjacentNodes || []);
  }
}

// function dfs<T>(vc :vertex<T>, vertices :vertex<T>[], visited? :boolean[]) {
//   if (!visited) visited = new Array<boolean>(vertices.length);

//   if (visited[Number(vc.value)]) return;
//   visited[Number(vc.value)] = true;

//   console.log(vc.value + ' ');

//   for (let v of vc.adjacentNodes)
//     dfs(vertices.find(t => t.value == v)!, vertices, visited);
// }

// function bfs<T>(vertices :vertex<T>[]) {
//   let visited :T[] = [],
//       childs :vertex<T>[] = [vertices[0]],
//       temp_childs :vertex<T>[],
//       vc :vertex<T>;

//   while (childs.length)
//   {
//     temp_childs = [];
//     visited.splice(visited.length, 0, ...childs.map(chd => chd.value));
//     for (let chd of childs)
//     {
//       console.log(chd.value);
//       temp_childs.splice(temp_childs.length, 0,
//           ...chd.adjacentNodes.filter(nd => !visited.some(v => v == nd))
//                               .map(nd => vertices.find(v => v.value == nd)!));
//     }

//     childs = temp_childs;
//   }
// }

function mst_prim<T>(vertices :vertex<T>[])
{
  let mst :vertex<T>[] = [],
    possibleEdges :[T, T, number][] = [], index;

  mst.push(vertex.create(vertices[0].value, []));

  possibleEdges.splice(possibleEdges.length, 0,
      ...vertices[0].adjacentNodes
          .map((nd) :[T, T, number] => [vertices[0].value, nd.value, nd.weight]));

  while (mst.length != vertices.length)
  {
    let aval_nodes = [...possibleEdges];

    while(true)
    {
      let next = aval_nodes.find(nd => nd[2] == Math.min(...aval_nodes.map(x => Number(x[2]))))!;

      if (mst.some(x => x.value == next[1]))
      {
        aval_nodes.splice(aval_nodes.findIndex(x => x[0] == next[0] && x[1] == next[1]), 1);
        continue;
      }

      if((index = possibleEdges.findIndex(x => x[0] == next[0] && x[1] == next[1])) != -1)
        possibleEdges.splice(index, 1);

      let nextNode = vertices.find(x => x.value == next[1])!,
          node = mst.find(x => x.value == next[0]);

      if (node)
        node.addAdjacentNode(Number(next[2]), nextNode.value);

      possibleEdges.splice(possibleEdges.length, 0,
        ...nextNode.adjacentNodes.map((nd) :[T, T, number] => [nextNode.value, nd.value, nd.weight]))
      mst.push(vertex.create(nextNode.value, []));
      break;
    }
  }
  return mst;
}

function findNearestPath<T>(from :vertex<T>, to :vertex<T>, vertices :vertex<T>[], path :adjacentNode<T>[])
{
  // console.log(from);
   if (from.value == to.value)
   {
    console.log('done', from.value);
    return;
   }

  if (from.adjacentNodes.every(x => path.some(v => v.value == x.value))) {
    return path.splice(0, path.length);
  }

  let paths :adjacentNode<T>[][] = [], newPath :adjacentNode<T>[];
  if (path.length == 0) path.push(adjacentNode.create(0, from.value));

  for (let nd of from.adjacentNodes.filter(a => !path.some(p => p.value == a.value)))
  {
    newPath = [...path, nd];

    findNearestPath<T>(vertices.find(x => x.value == nd.value)!, to, vertices, newPath);
    // console.log('nd', nd.value, 'newPath',newPath, 'from', from.value, 'path', path);
    if (newPath.length) paths.push(newPath.filter(p => !path.some(v => v.value == p.value)));
    // break;
  }
  // console.log('pre_path', paths, 'from', from.value);
  // paths = paths.filter(pt => !pt.some(p => !p));
  
  if (paths.length == 0) { console.log(path); path.splice(0, path.length);
   return; }

  let path_total_lengths :number[] = [];
  for (let ph of paths) {
    // console.log('ph', ph);
    path_total_lengths.push(ph.reduce((memo, x) => memo + x.weight, 0));
  }

  // console.log('path_total_lengths',path_total_lengths, 'paths', paths,'path', path, 'from', from.value);
  if (from.value == 'a')
    console.log('paths', paths, 'path', JSON.parse(JSON.stringify(path)));
    
  path.splice(path.length, 0,
    ...paths[path_total_lengths.findIndex(p => p == Math.min(...path_total_lengths))]);
}

export { adjacentNode, vertex, mst_prim, findNearestPath };