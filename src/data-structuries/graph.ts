class Graph<T> {
  private readonly list: Map<T, Set<T>>;

  constructor() {
    this.list = new Map<T, Set<T>>();
  }

  addVertex(vertex: T) {
    if (!this.list.has(vertex)) {
      this.list.set(vertex, new Set<T>())
    }
  }

  addEdge(vertex1: T, vertex2: T, bilateral = false) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.list.get(vertex1).add(vertex2);

    if (bilateral) {
      this.list.get(vertex2).add(vertex1);
    }
  }

  removeVertex(vertex: T) {
    if (!this.list.has(vertex)) {
      return;
    }
    for (let v of this.list.get(vertex)) {
      this.removeEdge(vertex, v);
    }
    this.list.delete(vertex);
  }

  removeEdge(vertex1: T, vertex2: T) {
    if (!this.list.has(vertex1) || !this.list.has(vertex2)) {
      return;
    }
    this.list.get(vertex1).delete(vertex2);
    this.list.get(vertex2).delete(vertex1);
  }

  get getVertices(): Array<T> {
    return [...this.list.keys()];
  }

  get getEdges(): Array<[T, T]> {
    const edges = [];

    for (const [vertex, relations] of this.list) {
      for (const edge of relations) {
        edges.push([vertex, edge]);
      }
    }
    return edges;
  }

  hasVertex(vertex: T): boolean {
    return this.list.has(vertex);
  }

  hasEdge(vertex: T, edge: T): boolean {
    return this.list.get(vertex)?.has(edge);
  }

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