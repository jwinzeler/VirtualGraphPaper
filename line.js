class Line {
    constructor(x1, y1, x2, y2, color, weight) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.weight = weight;
    }

    draw(offset, cellSize, zoom) {
        stroke(this.color);
        strokeWeight(this.weight * zoom);
        line(
            this.x1 * cellSize + offset.x,
            this.y1 * cellSize + offset.y,
            this.x2 * cellSize + offset.x,
            this.y2 * cellSize + offset.y
        );
    }
}