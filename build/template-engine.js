export default function(obj) {
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
      if (Array.isArray(bemItem.mix)) {
        bemItem.mix.forEach(mixItem => classList.push(...getEntityClassList(mixItem)))
      } else {
        classList.push(...getEntityClassList(bemItem.mix))
      }
    }

    return classList;
  }

  function traverse(bemJson, context) {
    if (bemJson) {
      const content = bemJson.content;
      const htmlElement = document.createElement(bemJson.tag || 'div');
      const classList = getClassList(bemJson);

      htmlElement.classList.add(...classList);
      context.appendChild(htmlElement);

      if (content) {
        if (content.html) {
          context.lastChild.innerHTML = content.html;
        } else {
          if (Array.isArray(content)) {
            content.forEach(child => traverse(child, htmlElement))
          } else {
            traverse(content, htmlElement)
          }
        }
      }
    }
  }

  traverse(obj, result);

  const tempDiv = document.createElement('div');
  tempDiv.appendChild(result);

  return tempDiv.innerHTML;
}
