class adjacenNode<TValue>
{
  constructor(public weight :number, public value :TValue) {}

  public static create<T>(weight :number, value :T)
  {
    return new adjacenNode(weight, value);
  }
}

class vertex<TValue>
{
  constructor(public value :TValue, public adjacentNodes :adjacenNode<TValue>[]) {}

  addAdjacentNode(weight :number, value :TValue)
  {
    this.adjacentNodes.push(adjacenNode.create(weight, value));
  }

  static create<T>(val :T, adjacentNodes :adjacenNode<T>[])
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
    possibleEdges :[T, T, number][];

  while (mst.length != vertices.length)
  {
    let node = mst[mst.length - 1] || vertices[0];
    let rnd = vertices.find(vx => vx.value == node.value)!;

    let nextNode = rnd.adjacentNodes.filter(vx => !mst.some(v => v.value == vx.value))
                      .push();
  }
}

export { vertex, adjacenNode };