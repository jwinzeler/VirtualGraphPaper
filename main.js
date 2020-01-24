let grid;
let pMouseCenterDown = false;

/* Remove default rightclick functionality to allow our own function */
document.addEventListener('contextmenu', event => event.preventDefault());

function setup() {
    createCanvas(windowWidth, windowHeight);
    grid = new Grid(16);
}

function draw() {
    pan()
    grid.draw();
}

function mousePressed() {
    if (mouseButton === LEFT) {
        grid.addPoint();
    }

    if (mouseButton === RIGHT) {
        grid.removePoint();
    }
}

function pan() {
    if (mouseIsPressed) {
        if (mouseButton === CENTER) {
            if (pMouseCenterDown) {
                grid.pan()
            }
            pMouseCenterDown = true;
        } else {
            pMouseCenterDown = false;
        }
    }
}

function mouseWheel(e) {
    if (e.deltaY > 0) {
        grid.zoomOut();
    } else {
        grid.zoomIn();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}