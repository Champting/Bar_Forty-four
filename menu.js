const menuTabs = document.querySelector('.menu-tabs');
const tabs = Array.from(menuTabs.querySelectorAll('[role="tab"]'));

function selectTab(tab) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectTab(tabs[next]);
    tabs[next].focus();
  });
});

selectTab(tabs[0]);
menuTabs.hidden = false;

const lightbox = document.querySelector('.gallery-lightbox');
const fullImage = lightbox.querySelector('.gallery-full-image');
let galleryOpener;

document.querySelectorAll('.gallery-item').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (typeof lightbox.showModal !== 'function' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    galleryOpener = link;
    fullImage.src = link.href;
    fullImage.alt = link.querySelector('img').alt;
    lightbox.showModal();
    document.body.classList.add('gallery-open');
  });
});

lightbox.addEventListener('click', (event) => {
  if (event.target !== lightbox) return;
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
});

lightbox.addEventListener('close', () => {
  document.body.classList.remove('gallery-open');
  fullImage.removeAttribute('src');
  galleryOpener?.focus();
});
