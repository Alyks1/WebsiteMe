function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    let currentGroup = [];
    let currentIndex = 0;

    document.querySelectorAll('.photo-group').forEach(group => {
        const imgs = group.querySelectorAll('img');
        imgs.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentGroup = Array.from(imgs);
                currentIndex = index;
                lightboxImg.src = currentGroup[currentIndex].src;
                lightbox.classList.add('active');
            });
        });
    });

    document.getElementById('close').addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    document.getElementById('next').addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    document.getElementById('prev').addEventListener('click', () => {
        showImage(currentIndex - 1);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });

    function showImage(index) {
        currentIndex = (index + currentGroup.length) % currentGroup.length;
        lightboxImg.src = currentGroup[currentIndex].src;
    }
}