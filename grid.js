class Grid {
    constructor(cellSize) {
        this.cellSize = cellSize;
        this.zoom = 1;
        this.offset = createVector();

        this.lines = [];

        this.zoomFactor = 1.05;
    }

    draw() {
        let relativeCellSize = this.cellSize * this.zoom;
        let weight = (0.5 * this.zoom < 0.2 ? 0 : 0.5 * this.zoom);
        background(255);
        strokeWeight(weight);
        stroke(200);

        const edgeOffsetX = this.offset.x % relativeCellSize;
        const edgeOffsetY = this.offset.y % relativeCellSize;

        // Vertical Lines
        for (let i = -1; i <= width / relativeCellSize; i++) {
            line(
                edgeOffsetX + (i * relativeCellSize),
                -relativeCellSize,
                edgeOffsetX + (i * relativeCellSize),
                relativeCellSize + height
            );
        }

        // Horizontal Lines
        for (let i = -1; i <= height / relativeCellSize; i++) {
            line(
                -relativeCellSize,
                edgeOffsetY + (i * relativeCellSize),
                relativeCellSize + height,
                edgeOffsetY + (i * relativeCellSize)
            );
        }

        this.lines.forEach(line => {
            line.draw(this.offset, relativeCellSize, this.zoom);
        });
    }

    pan() {
        let pMousePos = createVector(pmouseX, pmouseY);
        let mousePos = createVector(mouseX, mouseY);
        let difference = pMousePos.sub(mousePos);
        this.offset.sub(difference);
    }

    zoomIn() {
        this.zoom *= this.zoomFactor;
        let offset = createVector(
            (mouseX - this.offset.x) * (this.zoomFactor - 1),
            (mouseY - this.offset.y) * (this.zoomFactor - 1)
        );
        this.offset.sub(offset);
        console.log(this.offset);
    }

    zoomOut() {
        if (this.cellSize * this.zoom >= 1) {
            this.zoom *= 2 - this.zoomFactor;
            let offset = createVector(
                (mouseX - this.offset.x) * (this.zoomFactor - 1),
                (mouseY - this.offset.y) * (this.zoomFactor - 1)
            );
            this.offset.add(offset);
            console.log(this.offset);
        }
    }
}