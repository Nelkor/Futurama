import Particle from './modules/Particle.js';

const lineLen = 200;

const init = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const randomX = () => Math.random() * canvas.width;
    const randomY = () => Math.random() * canvas.height;

    let particles = [];
    let timerParticles = null;

    const resize = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        particles.length = 0;

        const setParticles = () => {
            const square = canvas.width * canvas.height;
            const amount = Math.floor(square / 3e4);

            particles = new Array(amount).fill()
                .map(() => new Particle(randomX(), randomY()));
        };

        clearTimeout(timerParticles);

        timerParticles = setTimeout(setParticles, 500);
    };

    resize();

    const tick = () => {
        setTimeout(tick, 4);

        particles.forEach(p => p.move(canvas.width, canvas.height));
    };

    const hsla = (hue, opacity) => `hsla(${hue}, 100%, 30%, ${opacity})`;

    const render = () => {
        requestAnimationFrame(render);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const hue = (Date.now() / 20) % 360;

        for (let i = 0; i < (particles.length - 1); i++)
            for (let j = i + 1; j < particles.length; j++) {
                const distance = particles[i].distanceTo(particles[j]);

                if (distance >= lineLen) continue;

                const opacity = (lineLen - distance) / lineLen;

                ctx.strokeStyle = hsla(hue, opacity);

                ctx.beginPath();
                ctx.moveTo(...particles[i].point);
                ctx.lineTo(...particles[j].point);
                ctx.stroke();
            }
    };

    tick();
    render();

    window.addEventListener('resize', resize);
};

document.addEventListener('DOMContentLoaded', init);
