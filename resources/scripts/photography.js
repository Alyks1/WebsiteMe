fetch('https://api.github.com/repos/Alyks1/WebsiteMe/photos/highlights')
    .then(res => res.json())
    .then(files => {
        let imagesToDisplay = getImagesToDisplay();
        imagesToDisplay.forEach(f => {
            const img = document.createElement('img');
            img.src = f.download_url;
            document.getElementById('gallery').appendChild(img);   
        });
    });


function getImagesToDisplay(files) {
    let images = files.filter(f => f.name.match(/\.(jpg|png|gif|webp)$/i));
    if (images.length < 5) return images;
    return images.sort(() => 0.5 - Math.random()).slice(0, 5);
}