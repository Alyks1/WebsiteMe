function initLightbox() {
    const galleryImgs = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentIndex = 0;

    galleryImgs.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = (index + galleryImgs.length) % galleryImgs.length;
            lightboxImg.src = galleryImgs[currentIndex].src;
            lightbox.classList.add('active');
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
        currentIndex = (index + galleryImgs.length) % galleryImgs.length;
        lightboxImg.src = galleryImgs[currentIndex].src;
    }
}