/*
 *  A Graph is a data structure that consists of a set of vertices and edges, where each edge connects two vertices.
 */
class Graph<T> {
  private readonly list: Map<T, Set<T>>;

  constructor() {
    this.list = new Map<T, Set<T>>();
  }

  // Complexity: O(1)
  addVertex(vertex: T) {
    if (!this.list.has(vertex)) {
      this.list.set(vertex, new Set<T>())
    }
  }

  // Complexity: O(1)
  addEdge(vertex1: T, vertex2: T, bilateral = false) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.list.get(vertex1).add(vertex2);

    if (bilateral) {
      this.list.get(vertex2).add(vertex1);
    }
  }

  // Complexity: O(v+e) vertex+edges
  removeVertex(vertex: T) {
    if (!this.list.has(vertex)) {
      return;
    }
    for (let v of this.list.get(vertex)) {
      this.removeEdge(vertex, v);
    }
    this.list.delete(vertex);
  }

  // Complexity: O(1)
  removeEdge(vertex1: T, vertex2: T) {
    if (!this.list.has(vertex1) || !this.list.has(vertex2)) {
      return;
    }
    this.list.get(vertex1).delete(vertex2);
    this.list.get(vertex2).delete(vertex1);
  }

  // Complexity: O(v)
  get getVertices(): Array<T> {
    return [...this.list.keys()];
  }

  // Complexity: O(v+e) vertex+edges
  get getEdges(): Array<[T, T]> {
    const edges = [];

    for (const [vertex, relations] of this.list) {
      for (const edge of relations) {
        edges.push([vertex, edge]);
      }
    }
    return edges;
  }

  // Complexity: O(1)
  hasVertex(vertex: T): boolean {
    return this.list.has(vertex);
  }

  // Complexity: O(1)
  hasEdge(vertex: T, edge: T): boolean {
    return this.list.get(vertex)?.has(edge);
  }

  // Complexity: O(1)
  getRelations(vertex: T): Array<T> {
    return [...this.list.get(vertex)];
  }

  isEmpty(): boolean {
    return this.list.size === 0;
  }

  clear() {
    this.list.clear();
  }

  get getSize() {
    return this.list.size;
  }

  // Complexity: O(v+e) vertex+edges
  depthSearch(startVertex: T, callback: (v: T) => void) {
    const visited = new Set<T>();

    const traverse = (vertex: T) => {
      visited.add(vertex);
      callback(vertex);

      for (const relation of this.list.get(vertex)) {
        if (!visited.has(relation)) {
          traverse.call(this, relation);
        }
      }
    }
    traverse.call(this, startVertex);
  }

  // Complexity: O(v+e) vertex+edges
  breadthSearch(startVertex: T,  callback: (v: T) => void) {
    const visited = new Set<T>();
    const queue = [startVertex];

    visited.add(startVertex);

    while (queue.length) {
      const currentVertex = queue.shift();
      callback(currentVertex);

      for (const relation of this.list.get(currentVertex)) {
        if (!visited.has(relation)) {
          visited.add(relation);
          queue.push(relation);
        }
      }
    }
  }
}

export default Graph;