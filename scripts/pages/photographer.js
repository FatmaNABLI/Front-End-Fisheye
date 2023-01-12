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
    const mediasSection = document.querySelector(".media");
    console.log(photographer);
    const photographerModel = photographerFactoryBase(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    const { realisations } = await photographerModel.getRealisations();

    photographerSection.appendChild(userCardDOM);       
    realisations.forEach(element =>  {
        const mediaModel = mediaFactory(element, photographer.name);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const  photographer  = await getPhotographer(id);
    displayData(photographer);
};

init();