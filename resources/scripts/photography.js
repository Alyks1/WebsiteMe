let imageIndex = null;

async function loadImages(folderName) {
    if (!imageIndex) {
        const res = await fetch('index.json');
        imageIndex = await res.json();
    }

    return imageIndex[folderName].map(name => `photos/${folderName}/${name}`);
}

async function loadHighlights() {
    const images = await loadImages('highlights');

    images.forEach(image => {
            const img = document.createElement('img');
            img.classList.add('photos-image');
            img.src = image;
            document.getElementById('highlights').appendChild(img);
    });
}

async function loadGallery(fileName) {
    const images = await loadImages(fileName);
    const response = await fetch(`subpages/${fileName}.html`);
    const html = await response.text();
    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#gallery').appendChild(div);

    images.forEach(image => {
        const img = document.createElement('img');
        img.classList.add('photos-image');
        img.src = image;
        document.querySelector(`#${fileName}Images`).appendChild(img);
    });
}

loadHighlights();
fetch('recipes.json')
    .then(res => res.json())
    .then(files => {
        return Promise.all(files.map(f => loadGallery(f.name)));
    })
    .then(() => {
        initLightbox();
    });