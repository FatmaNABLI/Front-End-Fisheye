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
    //Affichchage de la partie photographe
    const photographerSection = document.querySelector(".photograph-header");
    const contact_button = document.querySelector(".contact_button");
    
    const photographerModel = photographerFactoryBase(photographer);
    const article = document.createElement("article");
    article.setAttribute('id', 'photograph-infos');
    const h1 = document.createElement( 'h1' );
    h1.textContent = photographerModel.name;
    const p1 = document.createElement('p');
    p1.textContent = photographerModel.city + ", " + photographerModel.country;
    const p2 = document.createElement('p');
    p2.textContent = photographerModel.tagline;

    article.appendChild(h1);
    article.appendChild(p1);
    article.appendChild(p2);
    photographerSection.insertBefore(article, contact_button );


    const divImg = document.createElement('div');
    divImg.setAttribute('id', 'photograph-img')
    const img = document.createElement( 'img' );
    img.setAttribute("src", photographerModel.picture);
    img.setAttribute("alt", photographerModel.name);
    divImg.appendChild(img);
    photographerSection.appendChild(divImg);
    //const userCardDOM = photographerModel.getUserCardDOM();
    //photographerSection.appendChild(userCardDOM);  

    //Affichage des réalisations du photographe
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
  
    const spanTotalLikes = document.getElementById("total");
    spanTotalLikes.textContent = await photographerModel.getTotalLikes();

    const spanPrice = document.getElementById("price-photogtapher");
    spanPrice.textContent = `${photographerModel.price}€/jour`;

    //document.querySelectorAll(".media-card img").forEach((img,index) => img.addEventListener("click", openLighBox));
};

const byTitle = (a,b) => {
    aTitle = a.firstChild.getAttribute('alt');
    bTitle = b.firstChild.getAttribute('alt');
    console.log(bTitle);
    return (aTitle.localeCompare(bTitle));
};

const byPopularity = (a,b) =>{
    aLikes = a.firstChild.getAttribute('data-likes');
    bLikes = b.firstChild.getAttribute('data-likes');
    return (bLikes - aLikes);
};

const byDate = (a,b) =>{
    aDate = new Date (a.firstChild.getAttribute('data-date')).getTime();
    bDate = new Date (b.firstChild.getAttribute('data-date')).getTime();
    console.log(aDate);
    console.log(bDate);
    console.log(aDate - bDate);

    return (aDate-bDate);
};


function sortMediaCards(nbCriteria){
    if(nbCriteria == 1){
        criteria = byPopularity;
    }else if(nbCriteria == 2){
        criteria = byDate;
    }else if(nbCriteria == 3){
        criteria = byTitle;
    }
    const elements = document.querySelectorAll(".media-card");
    const items = Array.from(elements);
    items.sort(criteria);
    /*items.forEach(elt => {
        console.log(elt.firstChild.getAttribute('data-date'));
    });*/
    console.log(items);
    const mediasSection = document.querySelector(".media");
    items.forEach(elt => {
        mediasSection.appendChild(elt);

    });
}

async function init() {
    // Récupère les datas des photographes
    const  photographer  = await getPhotographer(id);
    displayData(photographer);
};


init();
