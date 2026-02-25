import { describe, expect, test, jest } from '@jest/globals';
import Graph from './graph';

describe('Graph', () => {
  test('addVertex', () => {
    const graph = new Graph<string>();

    expect(graph.isEmpty()).toBeTruthy();
    expect(graph.getVertices).toEqual([]);
    graph.addVertex('A');
    expect(graph.getVertices).toEqual(['A']);
    graph.addVertex('B');
    graph.addVertex('B');
    graph.addVertex('C');
    expect(graph.getVertices).toEqual(['A', 'B', 'C']);
    expect(graph.getSize).toBe(3);
  });

  test('addEdge', () => {
    const graph = new Graph<number>();

    expect(graph.getVertices).toEqual([]);
    graph.addVertex(1);
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);

    expect(graph.hasEdge(1, 3)).toBeTruthy();
    expect(graph.getEdges).toEqual([[1,2], [1,3]]);
    graph.addEdge(1, 4, true);
    expect(graph.getEdges).toEqual([[1,2], [1,3], [1,4], [4,1]]);
  });

  test('removeVertex', () => {
    const graph = new Graph<string>();

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addEdge('A', 'B');
    expect(graph.getVertices).toEqual(['A', 'B', 'C', 'D']);

    graph.removeVertex('B');
    graph.removeVertex('F');
    expect(graph.hasVertex('B')).toBeFalsy();
    expect(graph.getVertices).toEqual(['A', 'C', 'D']);
    graph.removeVertex('A');
    graph.removeVertex('D');
    expect(graph.getVertices).toEqual(['C']);
  });

  test('removeEdge', () => {
    const graph = new Graph<number>();

    graph.addEdge(3, 5, true);
    graph.addEdge(3, 7, true);
    graph.addEdge(3, 9, true);
    graph.addEdge(3, 8, true);

    expect(graph.getRelations(3)).toEqual([5,7,9,8]);
    expect(graph.hasEdge(3, 7)).toBeTruthy();
    expect(graph.hasEdge(3, 9)).toBeTruthy();
    graph.removeEdge(3, 7);
    graph.removeEdge(3, 9);
    expect(graph.hasEdge(3, 7)).toBeFalsy();
    expect(graph.hasEdge(3, 9)).toBeFalsy();
    graph.clear();
    expect(graph.getSize).toBe(0);
  });

  test('depthSearch', () => {
    const graph = new Graph<string>();
    const callback = jest.fn();

    expect(graph.isEmpty()).toBeTruthy();

    graph.addEdge('A', 'C');
    graph.depthSearch('A', callback);
    expect(callback).toHaveBeenCalledWith('A');
    graph.addEdge('B', 'A');
    graph.addEdge('A', 'F');
    graph.addEdge('F', 'B');
    graph.addEdge('B', 'C');

    let path: Array<string> = [];
    graph.depthSearch('B', (edge) => {
      path.push(edge);
    });
    expect(path).toEqual(['B', 'A', 'C', 'F']);
    path = [];
    graph.depthSearch('A', (edge) => {
      path.push(edge);
    });
    expect(path).toEqual(['A', 'C', 'F', 'B']);
  });

  test('breadthSearch', () => {
    const graph = new Graph<string>();
    let path: Array<string> = [];

    expect(graph.isEmpty()).toBeTruthy();

    graph.addEdge('A', '1');
    graph.addEdge('1', '2', true);
    graph.addEdge('2', '3', true);
    graph.addEdge('3', 'F', true);
    graph.addEdge('3', 'J');
    graph.addEdge('J', 'K');

    graph.breadthSearch('A', (edge) => path.push(edge));
    expect(path).toEqual(['A','1','2','3','F','J','K']);
    path = [];
    graph.breadthSearch('3', (edge) => path.push(edge));
    expect(path).toEqual(['3','2','F','J', '1', 'K']);
  });
});