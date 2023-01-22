//Global DOM variables
const lightbox= document.getElementById("lightbox");
const prevBtn = document.querySelector("prev");
const nextBtn = document.querySelector("next");
let currentItemPosition = 0;


//const main = document.getElementById("main");
//const modalCloseBtn = document.querySelector(".modal-close-btn");


function closeLightbox() { 
    lightbox.style.display = "none";
}

function openLighBox(){
    initLightBox();
    lightbox.style.display = "block";
}

var slideIndex = 1;
function currentSlide(index){
    showSlides(index);
}
function nextSlide(){
    slideIndex += 1;
    showSlides (slideIndex);
}
function previousSlide(){
    slideIndex -= 1;
    showSlides (slideIndex)
}

function showSlides(n) {
    var i;
    var slides =  document.querySelectorAll(".carousel-item-img");
    slideIndex = n;
    //var captionText = document.getElementById("caption");
    if (n == slides.length) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length-1}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
    //captionText.innerHTML = dots[slideIndex-1].alt;
  }

function initLightBox(){
    const carouselContent = document.querySelector(".carousel-content");
    document.querySelectorAll(".media-card-content").forEach(element=>{
        console.log(element.tagName);
        if(element.tagName == 'IMG'){
            const img = document.createElement("img");
            img.setAttribute('src',element.getAttribute('src'));
            img.setAttribute('class','carousel-item-img');
            carouselContent.appendChild (img);
        } else{
            const video = document.createElement( 'video' );
            video.setAttribute("controls","controls");
            video.setAttribute('class','carousel-item-img');
            const source = document.createElement("source");
            source.setAttribute('src', element.firstChild.getAttribute('src'));
            video.appendChild(source);
            carouselContent.appendChild (video);
        }    
    });
}
