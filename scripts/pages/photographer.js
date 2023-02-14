//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let id= parseInt(params.get('id')); 
//console.log(id);
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
    h1.tabIndex = 2;
    const p1 = document.createElement('p');
    p1.textContent = photographerModel.city + ", " + photographerModel.country;
    p1.tabIndex = 3;
    const p2 = document.createElement('p');
    p2.textContent = photographerModel.tagline;
    p2.tabIndex = 4;
    article.appendChild(h1);
    article.appendChild(p1);
    article.appendChild(p2);
    photographerSection.insertBefore(article, contact_button );


    const divImg = document.createElement('div');
    divImg.setAttribute('id', 'photograph-img')
    const img = document.createElement( 'img' );
    img.setAttribute("src", photographerModel.picture);
    img.setAttribute("alt", photographerModel.name);
    img.tabIndex = 6;
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
    sortMediaCards(1);
    const spanTotalLikes = document.getElementById("total");
    spanTotalLikes.textContent = await photographerModel.getTotalLikes();

    const spanPrice = document.getElementById("price-photogtapher");
    spanPrice.textContent = `${photographerModel.price}€/jour`;

    //document.querySelectorAll(".media-card img").forEach((img,index) => img.addEventListener("click", openLighBox));
}

const byTitle = (a,b) => {
    let aTitle = a.firstChild.getAttribute('alt');
    let bTitle = b.firstChild.getAttribute('alt');
    //console.log(bTitle);
    return (aTitle.localeCompare(bTitle));
};

const byPopularity = (a,b) =>{
    let aLikes = a.firstChild.getAttribute('data-likes');
    let bLikes = b.firstChild.getAttribute('data-likes');
    return (bLikes - aLikes);
};

const byDate = (a,b) =>{
    let aDate = new Date (a.firstChild.getAttribute('data-date')).getTime();
    let bDate = new Date (b.firstChild.getAttribute('data-date')).getTime();
    //console.log(aDate - bDate);
    return (aDate-bDate);
};


function sortMediaCards(nbCriteria){
    let criteria ;
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

    const mediasSection = document.querySelector(".media");
    items.forEach((elt,index) => {
        //elt.tabIndex = 9 + index;
        mediasSection.appendChild(elt);

    });
}

async function init() {
    // Récupère les datas des photographes
    const  photographer  = await getPhotographer(id);
    displayData(photographer);
}


init();
