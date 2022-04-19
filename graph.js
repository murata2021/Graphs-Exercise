class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach((vertex) => {
      this.nodes.add(vertex);
    });
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (!this.nodes.has(v1)) this.nodes.add(v1);
    if (!this.nodes.has(v2)) this.nodes.add(v2);

    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (!this.nodes.has(v1) || !this.nodes.has(v1)) return undefined;

    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (!this.nodes.has(vertex)) return undefined;

    vertex.adjacent.forEach((adjVertex) => {
      adjVertex.adjacent.delete(vertex);
    });

    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let result = [];
    let visited = {};
    let stack = [start];
    let currentVertex;

    visited[start.value] = true;

    while (stack.length !== 0) {
      currentVertex = stack.pop();
      result.push(currentVertex.value);

      currentVertex.adjacent.forEach((neighbor) => {
        if (!visited[neighbor.value]) {
          visited[neighbor.value] = true;
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {

    let result = [];
    let visited = {};
    let queue = [start];
    let currentVertex;

    visited[start.value] = true;

    while (queue.length !== 0) {
      currentVertex = queue.shift();
      result.push(currentVertex.value);

      currentVertex.adjacent.forEach((neighbor) => {
        if (!visited[neighbor.value]) {
          visited[neighbor.value] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

module.exports = { Graph, Node };
