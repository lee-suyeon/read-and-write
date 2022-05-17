const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  
  // check change
  if(n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  const differentAttribute = Array
    .from(n1Attributes)
    .find(attribute => {
      const { name } = attribute;
      const attribute1 = node1.getAttribute(name);
      const atrribute2 = node2.getAttribute(name);

      return attribute1 !== atrribute2
    })
  
  if(differentAttribute) {
    return true;
  }

  if(
    node1.children.length === 0 && 
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
}

const applyDiff = (parentNode, realNode, virtualNode) => {
  // 1. remove the real node if the new node is not defined.
  if(realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  if(!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  // difference check
  if(isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  // apply the same diff algorithm for every child node
  const realChildren = Array.from(realNode.children)
  const virtualChildren = Array.from(virtualNode.children);
  
  const max = Math.max(realChildren.length, virtualChildren.length);
  for(let i = 0; i < max; i++) {
    applyDiff(
      realNode,
      realChildren[i],
      virtualChildren[i]
    )
  }
}

export default applyDiff;