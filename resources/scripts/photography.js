let imageIndex = null;

async function getImageIndex() {
    if (!imageIndex) {
        const res = await fetch('index.json');
        imageIndex = await res.json();
    }
    return imageIndex;
}

async function loadImages(folderName) {
    const index = await getImageIndex();
    return index[folderName].map(name => `photos/${folderName}/${name}`);
}

function appendImages(container, images, { eagerCount = 0 } = {}) {
    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.classList.add('photos-image');
        if (i >= eagerCount) {
            img.loading = 'lazy';
        }
        img.src = src;
        container.appendChild(img);
    });
}

async function loadHighlights() {
    const images = await loadImages('highlights');
    appendImages(document.getElementById('highlights'), images, { eagerCount: 5 });
}

async function fetchGalleryData(fileName) {
    const [images, html] = await Promise.all([
        loadImages(fileName),
        fetch(`subpages/${fileName}.html`).then(r => r.text())
    ]);
    return { fileName, images, html };
}

function renderGallery({ fileName, images, html }) {
    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#gallery').appendChild(div);
    appendImages(document.querySelector(`#${fileName}Images`), images);
}

loadHighlights();

fetch('recipes.json')
    .then(res => res.json())
    .then(async files => {
        const dataList = await Promise.all(files.map(f => fetchGalleryData(f.name)));
        dataList.forEach(renderGallery);
    })
    .then(() => {
        initLightbox();
    });