let grid;
let pCenterMousedown = false;
let redrawGrid;

/* Remove default rightclick functionality to allow our own function */
document.addEventListener('contextmenu', event => event.preventDefault());

function setup() {
    createCanvas(windowWidth, windowHeight);
    grid = new Grid(16);
    grid.draw();
}

function draw() {
    moveGrid();

    if (redrawGrid) {
        grid.draw();
    }
    redrawGrid = false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function moveGrid() {
    if (mouseIsPressed) {
        if (mouseButton === CENTER) {
            if (pCenterMousedown) {
                let difference = createVector(mouseX - pmouseX, mouseY - pmouseY);
                grid.currentPoint = grid.startPoint.add(difference);
                redrawGrid = true;
            }

            pCenterMousedown = true;
        } else if (!pCenterMousedown) {
            pCenterMousedown = false;
        }
    } else if (!pCenterMousedown) {
        pCenterMousedown = false;
    }
}

function mouseWheel(e) {
    if (e.deltaY > 0) {
        grid.zoomOut();
    } else {
        grid.zoomIn();
    }
    redrawGrid = true;
}