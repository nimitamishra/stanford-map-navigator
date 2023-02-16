function setup() {
	document.getElementById('mapFrame').style.border = '20px solid pink';
	document.getElementById('map').src = 'map-s.gif';
	document.getElementById('mapFrame').style.overflow = 'hidden';
	document.getElementById('mapFrame').style.width = 0.8 * window.innerWidth + 'px';
	document.getElementById('mapFrame').style.height = 0.8 * window.innerHeight + 'px';
	document.getElementById('map').style.position = 'absolute';
	document.getElementById('mapFrame').style.position = 'relative';
}

let mapStack = ['map-s.gif', 'map-m.gif', 'map-l.gif', 'map-xl.gif'];
const imageSizes = mapStack.map((imageName) => {
	let img = new Image();
	img.src = imageName;
	console.log('image width is : ' + img.width);
	return img.width;
});
console.log('imageSizes', imageSizes);
window.onload = () => {
	console.log('window onload called');
	document.getElementById('map').style.width = document.getElementById('map').naturalWidth + 'px';
	document.getElementById('map').style.height = document.getElementById('map').naturalHeight + 'px';
	document.getElementById('map').style.left = '0px';
	document.getElementById('map').style.top = '0px';
	// console.log(document.getElementById('map').style.width);
};

setup();
document.addEventListener("mousedown", handleMouseDown, false);
document.addEventListener("mouseup", handleMouseUp, false);
document.addEventListener("mousemove", handleMouseMove, false);
document.addEventListener("dblclick", handleDblClick);
window.addEventListener("resize", handleResize, false);

// window.addEventListener("resize",resizeFrame);


/// INFORMATION RETRIEVAL FUNCTIONS
function getMapHeight() {
	var map = document.getElementById("map");
	return parseInt(map.style.height);
}

function getMapWidth() {
	var map = document.getElementById("map");
	return parseInt(map.style.width);
}

function getMapTop() {
	var map = document.getElementById("map");
	return parseInt(map.style.top);
}

function getMapLeft() {
	var map = document.getElementById("map");
	return parseInt(map.style.left);
}

function inMap(x, y) {
	console.log("x:", x, " y: ", y);
	console.log();
	const xMax = getMapLeft() + getMapWidth();
	const xMin = getMapLeft();
	const yMin = getMapTop();
	const yMax = getMapTop() + getMapHeight();
	console.log('xMax: ', xMax, " xMin :", xMin, " yMin: ", yMin, " yMax: ", yMax);
	return (x >= getMapLeft() && x <= (getMapLeft() + getMapWidth()) && y >= getMapTop() && y <= (getMapTop() + getMapHeight()));
}

/// DRAGGING FUNCTIONS
// for real dragging, you'll want to track the distance between where the
// mouse button is going down and the actual corner of the box

let isDragging = false;
let prevPosX = 0;
let prevPosY = 0;
function handleMouseDown(evt) {
	document.getElementById('map').style.cursor = 'move';
	evt.preventDefault();
	if (inMap(evt.clientX, evt.clientY)) {
		isDragging = true;
		prevPosX = evt.clientX;
		prevPosY = evt.clientY;
	}
	console.log(inMap(evt.clientX, evt.clientY));
	console.log("Handler on document<br />clientX = " + evt.clientX + "<br />" + "clientY = " + evt.clientY);
}

function handleMouseUp() {
	if (isDragging) {
		isDragging = false;
	}
}

function handleMouseMove(evt) {
	console.log('handling mouse move and isDragging is : ', isDragging);

	if (isDragging) {
		evt.preventDefault();
		let movementX = evt.clientX - prevPosX;
		let movementY = evt.clientY - prevPosY;
		var map = document.getElementById("map");

		const addX = getMapLeft() + movementX;
		const addY = getMapTop() + movementY;
		// console.log(addX, addY);
		map.style.left = addX + "px";
		map.style.top = addY + "px";
		prevPosX = evt.clientX;
		prevPosY = evt.clientY;

		// if (map.style.left > 650px)

		console.log(movementX, movementY);
		// console.log(map.style.left , map.style.top);
	}
}

function handleDblClick(evt) {
	const clickLocationX = evt.clientX;
	const clickLocationY = evt.clientY;
	zoomIn(clickLocationX, clickLocationY);
}

/// SETUP FUNCTIONS


function zoomIn(centerX, centerY) {
	const map = document.getElementById("map");
	let currWidth = map.clientWidth;

	let currLeft = getMapLeft();
	let currTop = getMapTop();
	map.style.width = (currWidth * 1.2) + "px";
	map.style.height = (currWidth * 1.2 * 0.75) + "px";
	map.style.left = 1.2 * currLeft - 0.2 * centerX + "px";
	map.style.top = 1.2 * currTop - 0.2 * centerY + "px";
	changeImageMatchinResolutionZoomIn();

	console.log(map.style.left, map.style.top, map.style.width, map.style.height);
}

function zoomOut(centerX, centerY) {
	const map = document.getElementById("map");
	let currWidth = map.clientWidth;

	let currLeft = getMapLeft();
	let currTop = getMapTop();
	map.style.width = (currWidth * 0.8) + "px";
	map.style.height = (currWidth * 0.8 * 0.75) + "px";
	map.style.left = 0.8 * currLeft + 0.2 * centerX + "px";
	map.style.top = 0.8 * currTop + 0.2 * centerY + "px";
	changeImageMatchinResolutionZoomOut();
	console.log(map.style.left, map.style.top, map.style.width, map.style.height);
}

function changeImageMatchinResolutionZoomIn() {
	const map = document.getElementById("map");
	const currentMapName = map.src.split('/').at(-1);
	let currentMapIndex = mapStack.findIndex((elm) => {
		return elm === currentMapName;
	});
	if (currentMapIndex < (mapStack.length - 1) && getMapWidth() > imageSizes[currentMapIndex + 1]) {
		map.src = mapStack[currentMapIndex + 1];
	}
	console.log(imageSizes[currentMapIndex + 1], getMapWidth());
}

function changeImageMatchinResolutionZoomOut() {
	const map = document.getElementById("map");
	const currentMapName = map.src.split('/').at(-1);
	let currentMapIndex = mapStack.findIndex((elm) => {
		return elm === currentMapName;
	});
	if (currentMapIndex > 0 && getMapWidth() < imageSizes[currentMapIndex - 1]) {
		map.src = mapStack[currentMapIndex - 1];
	}
	console.log(imageSizes[currentMapIndex - 1], getMapWidth());
}


document.getElementById('plus').addEventListener('click', () => {
	const frameCenterX = document.getElementById('mapFrame').getBoundingClientRect().width / 2;
	const frameCenterY = document.getElementById('mapFrame').getBoundingClientRect().height / 2;
	zoomIn(frameCenterX, frameCenterY);
}, false);


document.getElementById('minus').addEventListener('click', () => {
	const frameCenterX = document.getElementById('mapFrame').getBoundingClientRect().width / 2;
	const frameCenterY = document.getElementById('mapFrame').getBoundingClientRect().height / 2;
	zoomOut(frameCenterX, frameCenterY);
}, false);


document.getElementById('right').addEventListener('click', () => {
	const map = document.getElementById('map');
	let addX = getMapLeft() - parseInt(document.getElementById('mapFrame').style.width) / 2;
	map.style.left = addX + 'px';

});

document.getElementById('left').addEventListener('click', () => {
	const map = document.getElementById('map');
	let addX = getMapLeft() + parseInt(document.getElementById('mapFrame').style.width) / 2;
	map.style.left = addX + 'px';
});

document.getElementById('up').addEventListener('click', () => {
	const map = document.getElementById('map');
	let addX = getMapTop() + parseInt(document.getElementById('mapFrame').style.height) / 2;
	map.style.top = addX + 'px';
});

document.getElementById('down').addEventListener('click', () => {
	const map = document.getElementById('map');
	let addX = getMapTop() - parseInt(document.getElementById('mapFrame').style.height) / 2;
	map.style.top = addX + 'px';
});

function handleResize() {
	document.getElementById('mapFrame').style.width = 0.8 * window.innerWidth + 'px';
	document.getElementById('mapFrame').style.height = 0.8 * window.innerHeight + 'px';
}


// make sure that the shown image changes when the width/ height exceeds that of the current image

