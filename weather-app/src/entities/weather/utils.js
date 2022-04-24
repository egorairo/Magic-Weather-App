export function getElByDataSelector({node = document, selector = 'id', value}) {
  return node.querySelector(`[data-${selector}="${value}"]`);
}

export function replaceCharAtIndex({string, index, char}) {
  const strArray = string.split('');
  strArray[index] = char;
  return strArray.join('');
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
