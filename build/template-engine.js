export default function(obj) {
  const dataObj = JSON.parse(obj);
  const result = document.createDocumentFragment();

  function getEntityClassList(entity) {
    const classList = [];

    if (entity.elem) {
      const elemClass = `${entity.block}__${entity.elem}`;
      const elemMods = entity.elemMods || [];

      classList.push(elemClass, ...Object.entries(elemMods).map(
        entry => `${elemClass}_${entry[0]}_${entry[1]}`
      ));

      return classList;
    }

    const blockClass = entity.block;
    const blockMods = entity.mods || [];

    classList.push(blockClass, ...Object.entries(blockMods).map(
      entry => `${blockClass}_${entry[0]}_${entry[1]}`
    ));

    return classList;
  }

  function getClassList(bemItem) {
    const classList = getEntityClassList(bemItem);

    if (bemItem.mix) {
      bemItem.mix.forEach(mixItem => classList.push(...getEntityClassList(mixItem)))
    }

    return classList;
  }

  function traverse(bemJson, context) {
    const content = bemJson.content;
    const htmlElement = document.createElement(bemJson.tag || 'div');
    const classList = getClassList(bemJson);

    htmlElement.classList.add(...classList);
    context.appendChild(htmlElement);

    if (content) {
      if (Array.isArray(content)) {
        content.forEach(child => traverse(child, htmlElement))
      } else {
        traverse(content, htmlElement)
      }
    }
  }

  traverse(dataObj, result);

  const tempDiv = document.createElement('div');
  tempDiv.appendChild(result);

  return tempDiv.innerHTML;
}
