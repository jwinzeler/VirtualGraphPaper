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
    return '#' + hex(color.levels[0],2) + hex(color.levels[1],2) + hex(color.levels[2],2);
}

function download() {
    let element = document.createElement('a')
    element.setAttribute(
        'href',
        `data:text/plain;charset=utf-8, ${grid.save()}`
    )
    element.setAttribute(
        'download',
        `VGPDrawing_${new Date().valueOf()}.json`
    );
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Controls
function setControlValues() {
    document.querySelector('.control-color input').value = colorToHex(grid.color);
    document.querySelector('.control-weight input').value = grid.weight;
    document.querySelector('.control-snap input').checked = grid.snap;
}

// Save
document.querySelector('.control-cluster #saveAll').addEventListener('click', e => {
    download();
})

// Load
document.querySelector('.control-cluster #loadOverlay').addEventListener('click', e => {
    document.querySelector('.control-cluster #load').click();
});
document.querySelector('.control-cluster #load').addEventListener('change', e => {
    if (confirm('This will remove every drawn line on the grid and replace it with the loaded file. Make sure to save your progress first. Are you sure you want to continue?')) {
        let fileReader = new FileReader();
        fileReader.onload = function () {
            grid.load(fileReader.result);
        }
        fileReader.readAsText(e.target.files[0]);
        document.querySelector('.control-cluster #load').value = '';
    } else {
        document.querySelector('.control-cluster #load').value = '';
    }
})

// Clear
document.querySelector('.control-cluster #clearAll').addEventListener('click', e => {
    if (confirm('This will remove every drawn line on the grid. Are you sure?')) {
        grid.clear();
    }
})

// Color
document.querySelector('.control-color input').addEventListener('input', e => {
    grid.setColor(e.target.value);
});

// Weight
document.querySelector('.control-weight input').addEventListener('input', e => {
    grid.setWeight(e.target.value);
});

// Snap
document.querySelector('.control-snap input').addEventListener('click', e => {
    grid.setSnap(e.target.checked);
});