let grid;
let cnv;
let pMouseCenterDown = false;

/* Remove default rightclick functionality to allow our own function */
document.addEventListener('contextmenu', e => e.preventDefault());

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(handleInput);
    grid = new Grid(16);

    setControlValues();
}

function draw() {
    pan()
    grid.draw();
}

function handleInput() {
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

function colorToHex(color) {
    console.log(color);
    return '#' + hex(color.levels[0],2) + hex(color.levels[1],2) + hex(color.levels[2],2);
}

// Controls
function setControlValues() {
    document.querySelector('.control-color input').value = colorToHex(grid.color);
    document.querySelector('.control-weight input').value = grid.weight;
    document.querySelector('.control-snap input').checked = grid.snap;
}

document.querySelector('.control-color input').addEventListener('input', e => {
    grid.setColor(e.target.value);
});
document.querySelector('.control-weight input').addEventListener('input', e => {
    grid.setWeight(e.target.value);
});
document.querySelector('.control-snap input').addEventListener('click', e => {
    grid.setSnap(e.target.checked);
});