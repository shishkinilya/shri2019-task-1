document.body.addEventListener('click', function (event) {
  let target = event.target;

  while (target !== this) {
    if (target.classList.contains('onoffswitch')) {
      const rootNode = document.querySelector('.theme');

      if (rootNode.classList.contains('theme_color_project-default')) {
        rootNode.classList.remove('theme_color_project-default');
        rootNode.classList.add('theme_color_project-inverse');
      } else if (rootNode.classList.contains('theme_color_project-inverse')) {
        rootNode.classList.remove('theme_color_project-inverse');
        rootNode.classList.add('theme_color_project-default');
      }
    }

    if (target.classList.contains('e-accordion') && !target.classList.contains('e-accordion__more')) {
      const accordionMore = target.querySelector('.e-accordion__more');

      if (accordionMore) {
        accordionMore.classList.toggle('e-accordion__more_view_default');
      }

      return;
    }

    target = target.parentNode;
  }
});
