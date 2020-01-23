class Grid {
    constructor(stepSize) {
        this.stepSize = stepSize;
        this.startPoint = createVector();
    }

    draw() {
        if (this.stepSize <= 0) {
            this.stepSize = 1;
        }

        background(255);
        stroke(200);
        strokeWeight(0.5)
        let xOffset = this.startPoint.x % this.stepSize;
        let yOffset = this.startPoint.y % this.stepSize;

        // Vertical Lines
        for (let i = 0; i - 1 <= Math.floor(width / this.stepSize); i++) {
            if(i === 14) {
                stroke(0);
            } else {
                stroke(200);
            }
            line(
                xOffset + i * this.stepSize,
                yOffset - this.stepSize,
                xOffset + i * this.stepSize,
                yOffset + height + this.stepSize
            );
        }

        // Horizontal Lines
        for (let i = 0; i - 1 <= Math.floor(height / this.stepSize); i++) {
            if(i === 13) {
                stroke(0);
            } else {
                stroke(200);
            }
            line(
                xOffset - this.stepSize,
                yOffset + i * this.stepSize,
                xOffset + width + this.stepSize,
                yOffset + i * this.stepSize
            );
        }
    }

    zoomIn() {
        grid.stepSize++;
        let offset = createVector(
            Math.floor(width / this.stepSize) * (mouseX / width) + this.startPoint.x,
            Math.floor(height / this.stepSize) * (mouseY / height) + this.startPoint.y
        );
        console.log(offset, this.startPoint);
        this.startPoint.sub(offset);
        console.log(offset, this.startPoint);
    }

    zoomOut() {
        grid.stepSize--;
        let offset = createVector(
            Math.floor(width / this.stepSize) * (mouseX / width),
            Math.floor(height / this.stepSize) * (mouseY / height)
        );
        console.log(offset, this.startPoint);
        this.startPoint.add(offset);
        console.log(offset, this.startPoint);
    }
}