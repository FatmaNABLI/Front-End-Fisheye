//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let id= parseInt(params.get('id')); 
console.log(id);
async function getPhotographer(id) {
   
     // Récupération des photographers depuis le fichier JSON
     const reponse = await fetch('data/photographers.json');
     const data = await reponse.json();
     const photographers = data.photographers;
     const photographer = photographers.find(element => element.id == id);
     //console.log(photographer);
     return photographer;

 }
 async function displayData(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    const contact_button = document.querySelector(".contact_button");
    
    const photographerModel = photographerFactoryBase(photographer);
    const h1 = document.createElement( 'h1' );
    h1.textContent = photographerModel.name;
    photographerSection.insertBefore(h1, contact_button );

    const img = document.createElement( 'img' );
    img.setAttribute("src", photographerModel.picture)
    img.setAttribute("alt", photographerModel.name)
    photographerSection.appendChild(img);
    //const userCardDOM = photographerModel.getUserCardDOM();
    //photographerSection.appendChild(userCardDOM);  

    
    const mediasSection = document.querySelector(".media");
    const { realisations } = await photographerModel.getRealisations();
    realisations.forEach((element,index) =>  {
        //Le nom du photographe est nécessaire pour avoir le chemin de l'image
        let mediaModel={};
        if(element.hasOwnProperty('image')){
            mediaModel = mediaFactory(element, 'image', photographer.name);
        }else{
            mediaModel = mediaFactory(element, 'video', photographer.name);
        }
        const mediaCardDOM = mediaModel.getMediaCardDOM(index);
        mediasSection.appendChild(mediaCardDOM);
    });

    //document.querySelectorAll(".media-card img").forEach((img,index) => img.addEventListener("click", openLighBox));
};

async function init() {
    // Récupère les datas des photographes
    const  photographer  = await getPhotographer(id);
    displayData(photographer);
};

init();