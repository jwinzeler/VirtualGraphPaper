let grid;
let pCenterMousedown = false;
let pLeftMouseDown = false;

/* Remove default rightclick functionality to allow our own function */
document.addEventListener('contextmenu', event => event.preventDefault());

function setup() {
    createCanvas(windowWidth, windowHeight);
    grid = new Grid(16);
    grid.draw();
}

function draw() {
    moveGrid();
    drawOnGrid();


    if (grid.drawPoint) {
        grid.redrawGrid = true;
    }
    if (grid.redrawGrid) {
        grid.draw();
    }
    grid.redrawGrid = false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function drawOnGrid() {
    if (mouseIsPressed) {
        if (mouseButton === LEFT) {
            if (!pLeftMouseDown) {
                grid.drawOnGrid();
            }

            pLeftMouseDown = true;
        } else {
            pLeftMouseDown = false;
        }
        if (mouseButton === RIGHT) {
            grid.stopDrawOnGrid();
        }
    } else {
        pLeftMouseDown = false;
    }
}

function moveGrid() {
    if (mouseIsPressed) {
        if (mouseButton === CENTER) {
            if (pCenterMousedown) {
                let difference = createVector(mouseX - pmouseX, mouseY - pmouseY);
                grid.transform(difference);
                grid.redrawGrid = true;
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
    grid.redrawGrid = true;
}