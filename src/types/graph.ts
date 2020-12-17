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

  while (mst.length != vertices.length)
  {
    let node = mst[mst.length - 1];
    let curr_node = vertices.find(vx => vx.value == node.value)!;
    let aval_nodes = [...possibleEdges,
      ...curr_node.adjacentNodes.map(nd => [curr_node.value, nd.value, nd.weight])];

    while(true)
    {
      let next = aval_nodes.find(nd => nd[2] == Math.min(...aval_nodes.map(x => Number(x[2]))))!;

      if (mst.find(x => x.value == next[1]))
      {
        aval_nodes.splice(aval_nodes.findIndex(x => x[0] == next[0] && x[1] == next[1]), 1);
        continue;
      }

      next = aval_nodes.find(nd => nd[2] == Math.min(...aval_nodes.map(x => Number(x[2]))))!;

      if((index = possibleEdges.findIndex(x => x[0] == next[0] && x[1] == next[1])) != -1)
        possibleEdges.splice(index, 1);

      let nextNode = vertices.find(x => x.value == next[1])!;
      node.addAdjacentNode(Number(next[2]), nextNode.value);
      possibleEdges.splice(possibleEdges.length, 0,
        ...nextNode.adjacentNodes.map(nd => [nextNode.value, nd.value, nd.weight]))
      mst.push(vertex.create(nextNode.value, []));
      break;
    }
  }

  console.log(mst);
}

export { vertex, adjacentNode, mst_prim };