const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;

let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
let count = 30;
const apiKey = 'o41BRnKHjY9MRLLF31N7nUWDHACwGSOs953QAmQ2sks';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
    //console.log('image loaded');
    imagesLoaded++;

    if(imagesLoaded ===  totalImages) {
        ready = true;
        loader.hidden = true;

        count = 30;
       // console.log('ready=', ready);
    }

}


//Helper function to set attributes
//DRY -> Don't Repeat Yourself

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

}


//Display Photos
function displayPhotos() {

    imagesLoaded = 0;

    totalImages = photosArray.length;
   // console.log('total images=', totalImages);
    photosArray.forEach((photo) => {
        //Create anchor element <a> to link with Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
       

        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src : photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, check when each has finished loading
        img.addEventListener('load', imageLoaded());
        

        //Put <img> inside <a> and put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);


    });
}
 
// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
       // console.log(photosArray);
        displayPhotos();
    }
    catch(error) {
        // Catch Error Here
    }
}

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        //console.log('load more');
        ready = false;
        getPhotos();
    }

});




// On Load
getPhotos();