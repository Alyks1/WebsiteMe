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

    images.forEach(f => {
        const img = document.createElement('img');
        img.classList.add('highlight-image');
        img.src = f.download_url;
        document.getElementById('highlights').appendChild(img);
    });
}

async function loadGallery(htmlFile, folderName) {
    const images = await loadImages(folderName);
    const response = await fetch(htmlFile);
    const html = await response.text();
    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#gallery').appendChild(div);

    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        document.querySelector(`#${folderName}Images`).appendChild(img);
    });
}

loadHighlights();
loadGallery('subpages/classicNegative.html', 'classicNegative');