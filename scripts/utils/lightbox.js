//Global DOM variables
const lightbox= document.getElementById("lightbox");
const prevBtn = document.querySelector("prev");
const nextBtn = document.querySelector("next");
let cslideIndex = 0;

function closeLightbox() { 
    lightbox.style.display = "none";
    lightbox.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'false');
    header.setAttribute('aria-hidden', 'false');
}

function openLighBox(){
    initLightBox();
    lightbox.style.display = "block";
    lightbox.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'true');
}

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

// Close modal when espace key is pressed

document.addEventListener('keydown', (e) => {
    //console.log(e.target);
    var code = e.code;
    if (lightbox.getAttribute("aria-hidden") == "false"){

        if ( code === 'Escape') {
            closeLightbox();
        }
        if (code == 'ArrowRight'){
            nextSlide();
        }
        if(code == 'ArrowLeft'){
            previousSlide();
        }
       
    }
   
  }, false);


function initLightBox(){
    const carouselContent = document.querySelector(".carousel-content");
    document.querySelectorAll(".media-card-content").forEach(element=>{
        //console.log(element.tagName);
        let divImgCarousel  = document.createElement("div");
        divImgCarousel.setAttribute('class','carousel-item-img');
        if(element.tagName == 'IMG'){
            const img = document.createElement("img");
            img.setAttribute('src',element.getAttribute('src'));
            //img.setAttribute('class','carousel-item-img');
            img.setAttribute('alt',element.getAttribute('alt'));
            //carouselContent.appendChild (img);
            divImgCarousel.appendChild(img);
        } else{
            const video = document.createElement( 'video' );
            video.setAttribute("controls","controls");
            //video.setAttribute('class','carousel-item-img');
            video.setAttribute('alt',element.getAttribute('alt'));
            const source = document.createElement("source");
            source.setAttribute('src', element.firstChild.getAttribute('src'));
            video.appendChild(source);
            //carouselContent.appendChild (video);
            divImgCarousel.appendChild(video);
        }    
        const pTitre = document.createElement("p");
        pTitre.textContent = element.getAttribute('alt');
        divImgCarousel.appendChild(pTitre);
        carouselContent.appendChild(divImgCarousel);
    });
}
