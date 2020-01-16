// const speed = .2;

export default class Particle {
    constructor(x, y, speed) {
        this.point = [x, y];
        this.speed = speed + Math.random() * speed;
        this.direction = Math.random() * Math.PI * 2;

        this.step = {
            x: Math.cos(this.direction) * this.speed,
            y: Math.sin(this.direction) * this.speed,
        };
    }

    distanceTo(particle) {
        const [x1, y1] = this.point;
        const [x2, y2] = particle.point;

        const dx = x1 - x2;
        const dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    }

    move(maxWidth, maxHeight) {
        this.point[0] += this.step.x;
        this.point[1] += this.step.y;

        if (this.point[0] < 0) {
            this.point[0] = 0;
            this.step.x *= -1;
        }

        if (this.point[0] > maxWidth) {
            this.point[0] = maxWidth;
            this.step.x *= -1;
        }

        if (this.point[1] < 0) {
            this.point[1] = 0;
            this.step.y *= -1;
        }

        if (this.point[1] > maxHeight) {
            this.point[1] = maxHeight;
            this.step.y *= -1;
        }
    }
}
