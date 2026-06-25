fetch('https://api.github.com/repos/Alyks1/WebsiteMe/contents/photos/highlights')
    .then(res => res.json())
    .then(files => {
        const images = files
            .filter(f => f.type === 'file' && f.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        images.forEach(f => {
            const img = document.createElement('img');
            img.style.width = '30%';
            img.src = f.download_url;
            document.getElementById('highlights').appendChild(img);
        });
    });