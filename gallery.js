// "use strict";
// add support for window resize!!!
var photoArray = [
    {
        filename: "memchu.jpg",
        caption: "Stanford Memorial Church - the church used to have an 80' bell tower, which fell in the 1906 earthquake."
    },
    {
        filename: "quad.jpg",
        caption: "The Stanford Quad"
    },
    {
        filename: "hoop.jpg",
        caption: "The <i>Red Hoop Fountain</i> with Green Library in the background."
    },
    {
        filename: "memorial-court.jpg",
        caption: "Memorial Court (in the front of the Quad) with Rodin's <i>Burghers of Calais</i> statues."
    },
    {
        filename: "gates.jpg",
        caption: "The Gates Building - home of Stanford Computer Science."
    },
    {
        filename: "stone-river.jpg",
        caption: "The Stone River statue near the Cantor Arts Center (Stanford's own art museum)."
    },
];

function setup() {
    document.body.style.margin = '0px';

    let photoDIV = document.getElementById('photoSection');
    photoDIV.style.display = 'flex';
    
    photoDIV.style.marginTop = "100px";
    photoDIV.style.width = '800px';
    // photoDIV.style.justifyContent = 'right';
    
    // photoDIV.style.marginLeft = 0.1*window.innerWidth + 'px';
    // photoDIV.marginRight = "10%"

    // let imageDiv = document.getElementById('photoAndOverlays');
    // imageDiv.style.display = 'flex';
    // imageDiv.style.justifyContent = 'center';
    // document.getElementById('forwardOverlay').style.float = 'right';
    // imageDiv.style.flexBasis = "800px";

    // const margin = (window.innerWidth - 800) / 2;
    // console.log(margin.toLocaleString() + 'px');
    // photoDIV.style.marginLeft = margin + 'px';
    // photoDIV.style.marginRight = margin + 'px';

    photoDIV.style.position = 'relative';
    document.getElementById('caption').style.position = 'absolute';
    document.getElementById('caption').style.bottom = '0px';
    document.getElementById('caption').style.width = '800px';
    
    document.getElementById('backwardOverlay').style.position = 'absolute';
    document.getElementById('backwardOverlay').style.width = '100px';
    document.getElementById('backwardOverlay').style.height = '600px';
    document.getElementById('backwardOverlay').style.top = '0px';
    document.getElementById('backwardOverlay').style.left = '0';

    document.getElementById('forwardOverlay').style.position = 'absolute';
    document.getElementById('forwardOverlay').style.width = '100px';
    document.getElementById('forwardOverlay').style.height = '600px';
    document.getElementById('forwardOverlay').style.top = '0px';
    document.getElementById('forwardOverlay').style.right = '0px';
    
   
}
setup();
document.getElementById('forwardOverlay').addEventListener('click', moveForward, false);
document.getElementById('backwardOverlay').addEventListener('click', moveBackward, false);
// window.addEventListener('resize', handleResize, false);

// function handleResize() {
//     const width
// }


function moveForward() {
    console.log('move forward has been called');
    const currentPhotoFilename = document.getElementById('photo').src.split('/').at(-1);
    const indexOfCurrentPhotoInPhotoArray = photoArray.findIndex((elm) => elm.filename === currentPhotoFilename);
    const nextIndex = (indexOfCurrentPhotoInPhotoArray + 1) % photoArray.length;
    document.getElementById('photo').src = photoArray[nextIndex].filename;
    document.getElementById('caption').innerHTML = photoArray[nextIndex].caption;
}

function moveBackward() {
    console.log('move backward has been called');
    const currentPhotoFilename = document.getElementById('photo').src.split('/').at(-1);
    const indexOfCurrentPhotoInPhotoArray = photoArray.findIndex((elm) => elm.filename === currentPhotoFilename);
    const prevIndex = (indexOfCurrentPhotoInPhotoArray - 1 + photoArray.length) % photoArray.length;
    document.getElementById('photo').src = photoArray[prevIndex].filename;
    document.getElementById('caption').innerHTML = photoArray[prevIndex].caption;
}

