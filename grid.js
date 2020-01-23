class Grid {
    constructor(stepSize) {
        this.stepSize = stepSize;
        this.startPoint = createVector();
        this.redrawGrid = false;
        
        this.drawPoint = null;
    }

    xOffset() {
        return this.startPoint.x % this.stepSize;
    }

    yOffset() {
        return this.startPoint.y % this.stepSize;
    }

    draw() {
        background(255);
        strokeWeight(0.5);

        stroke(200);

        // Vertical Lines
        for (let i = 0; i - 1 <= Math.floor(width / this.stepSize); i++) {
            line(
                this.xOffset() + i * this.stepSize,
                this.yOffset() - this.stepSize,
                this.xOffset() + i * this.stepSize,
                this.yOffset() + height + this.stepSize
            );
        }

        // Horizontal Lines
        for (let i = 0; i - 1 <= Math.floor(height / this.stepSize); i++) {
            line(
                this.xOffset() - this.stepSize,
                this.yOffset() + i * this.stepSize,
                this.xOffset() + width + this.stepSize,
                this.yOffset() + i * this.stepSize
            );
        }

        // Point
        stroke(255, 0, 0);
        if (this.drawPoint) {
            line(this.drawPoint.x, this.drawPoint.y, this.selectMouseXOnGrid(), this.selectMouseYOnGrid());
        }
    }

    transform(amount) {
        this.startPoint.add(amount);

        if(this.drawPoint) {
            this.drawPoint.add(amount);
        }
    }

    drawOnGrid() {
        if (this.drawPoint) {
            console.log(`Drawing from ${this.drawPoint} to ${createVector(this.selectMouseXOnGrid(), this.selectMouseYOnGrid())}`);
            this.drawPoint = null;
        } else {
            this.drawPoint = this.selectPointOnGrid(mouseX, mouseY);
        }
    }
    
    stopDrawOnGrid() {
        if (this.drawPoint !== null) {
            this.drawPoint = null;
            grid.redrawGrid = true;
        }
    }

    selectPointOnGrid(x ,y) {
        let xOffset = x % this.stepSize;
        let yOffset = y % this.stepSize;
        let right = xOffset >= this.stepSize / 2;
        let bottom = yOffset >= this.stepSize / 2;
        return createVector(
            this.xOffset() - xOffset + x + (right ? this.stepSize : 0),
            this.yOffset() - yOffset + y + (bottom ? this.stepSize : 0)
        );
    }

    selectMouseXOnGrid() {
        let xOffset = mouseX % this.stepSize;
        let right = xOffset >= this.stepSize / 2;
        return this.xOffset() - xOffset + mouseX + (right ? this.stepSize : 0);
    }

    selectMouseYOnGrid() {
        let yOffset = mouseY % this.stepSize;
        let bottom = yOffset >= this.stepSize / 2;
        return this.yOffset() - yOffset + mouseY + (bottom ? this.stepSize : 0);
    }

    zoomIn() {
        this.stepSize++;

        if (this.drawPoint) {
            this.drawPoint = this.selectPointOnGrid(this.drawPoint.x, this.drawPoint.y);
        }
    }

    zoomOut() {
        if (this.stepSize > 1) {
            this.stepSize--;
            if (this.drawPoint) {
                this.drawPoint = this.selectPointOnGrid(this.drawPoint.x, this.drawPoint.y);
            }
        }
    }
}