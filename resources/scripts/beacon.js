(function () {
    var params = new URLSearchParams({
        p: location.pathname,
        r: document.referrer || ''
    });
    var img = new Image();
    img.src = 'https://visitor-alert.gemaero.workers.dev/beacon?' + params.toString();
})();