class Grid {
    constructor(cellSize) {
        this.cellSize = cellSize;
        this.zoom = 1;
        this.offset = createVector();

        this.lines = [];

        this.point = null;
        this.color = color(0);
        this.weight = 2;
        this.snap = true;

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
        for (let i = -1; i <= width / relativeCellSize + 1; i++) {
            line(
                edgeOffsetX + (i * relativeCellSize),
                -relativeCellSize,
                edgeOffsetX + (i * relativeCellSize),
                relativeCellSize + height
            );
        }

        // Horizontal Lines
        for (let i = -1; i <= height / relativeCellSize + 1; i++) {
            line(
                -relativeCellSize,
                edgeOffsetY + (i * relativeCellSize),
                relativeCellSize + width,
                edgeOffsetY + (i * relativeCellSize)
            );
        }

        // Drawn Lines
        this.lines.forEach(line => {
            line.draw(this.offset, relativeCellSize, this.zoom);
        });

        // Current Line
        let tempPos = this.getGridLocation(mouseX, mouseY);
        stroke(this.color);
        strokeWeight(this.weight * this.zoom);
        if (this.point) {
            line(
                this.point.x * (this.cellSize * this.zoom) + this.offset.x,
                this.point.y * (this.cellSize * this.zoom) + this.offset.y,
                tempPos.x * (this.cellSize * this.zoom) + this.offset.x,
                tempPos.y * (this.cellSize * this.zoom) + this.offset.y
            );
        } else {
            point(
                tempPos.x * (this.cellSize * this.zoom) + this.offset.x,
                tempPos.y * (this.cellSize * this.zoom) + this.offset.y
            );                
        }
        
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
    }

    zoomOut() {
        if (this.cellSize * this.zoom >= 1) {
            this.zoom *= 2 - this.zoomFactor;
            let offset = createVector(
                (mouseX - this.offset.x) * (this.zoomFactor - 1),
                (mouseY - this.offset.y) * (this.zoomFactor - 1)
            );
            this.offset.add(offset);
        }
    }

    addPoint() {
        if (this.point) {
            let p2 = this.getGridLocation(mouseX, mouseY);
            this.lines.push(new Line(this.point.x, this.point.y, p2.x, p2.y, this.color, this.weight));
            if (keyIsPressed) {
                if (keyCode === 16) {
                    this.point = p2;
                } else {
                    this.point = null;
                }
            } else {
                this.point = null;
            }
        } else {
            this.point = this.getGridLocation(mouseX, mouseY);
        }
    }

    removePoint() {
        if (this.point) {
            this.point = null;
        } else {
            console.log(mouseX, mouseY, "Remove Line");
        }
    }

    getGridLocation(x, y) {
        if (this.snap) {
            return createVector(
                Math.round((x - this.offset.x) / (this.cellSize * this.zoom)),
                Math.round((y - this.offset.y) / (this.cellSize * this.zoom))
            );
        } else {
            return createVector(
                (x - this.offset.x) / (this.cellSize * this.zoom),
                (y - this.offset.y) / (this.cellSize * this.zoom)
            )
        }
    }

    setWeight(weight) {
        weight = parseInt(weight);
        this.weight = weight;
    }

    setSnap(snap) {
        switch(snap) {
            case false:
                this.snap = false;
                break;
            case true:
            default:
                this.snap = true;
                break;
        }
    }

    setColor(c) {
        this.color = color(c);
    }

    clear() {
        this.lines = [];
        this.point = null;
    }

    save() {
        return JSON.stringify({color: this.color, weight: this.weight, snap: this.snap, lines: this.lines});
    }

    load(json) {
        let state = JSON.parse(json);
        if (state.color) {
            this.setColor(colorToHex(state.color));
        }

        if (state.weight) {
            this.setWeight(state.weight);
        }

        if (state.snap != undefined) {
            this.setSnap(state.snap);
        }

        if (state.lines) {
            this.lines = [];
            state.lines.forEach(e => {
                this.lines.push(new Line(e.x1, e.y1, e.x2, e.y2, color(colorToHex(e.color)), e.weight));
            });
        }

        setControlValues();
    }
}