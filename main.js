(function () {
    /* Projects carousel */
    var track = document.getElementById('slides');
    if (track) {
        var slides = Array.prototype.slice.call(track.children);
        var n = slides.length;
        var dotsBox = document.getElementById('dots');
        var prev = document.getElementById('prev');
        var next = document.getElementById('next');
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var dots = [];

        function current() {
            return Math.min(n - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth)));
        }

        function go(i) {
            i = (i + n) % n;
            track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
        }

        function paint() {
            var c = current();
            dots.forEach(function (d, i) {
                if (i === c) d.setAttribute('aria-current', 'true');
                else d.removeAttribute('aria-current');
            });
        }

        slides.forEach(function (slide, i) {
            slide.setAttribute('aria-label', (i + 1) + ' of ' + n);
            var d = document.createElement('button');
            d.type = 'button';
            d.className = 'dot';
            d.setAttribute('aria-label', 'Show project ' + (i + 1) + ' of ' + n);
            d.addEventListener('click', function () { go(i); });
            dotsBox.appendChild(d);
            dots.push(d);
        });

        var ticking = false;
        track.addEventListener('scroll', function () {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () { paint(); ticking = false; });
        });

        prev.addEventListener('click', function () { go(current() - 1); });
        next.addEventListener('click', function () { go(current() + 1); });

        window.addEventListener('resize', function () {
            track.scrollTo({ left: current() * track.clientWidth, behavior: 'auto' });
            paint();
        });

        paint();
    }

    /* Footer year */
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();