function photographerFactoryBase(data) {
    const {name, portrait, price,city , country, tagline } = data;

    const picture = `assets/photographers/${portrait}`;
    /*function getPhoto(){
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        return img;
    }*/

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h1 = document.createElement( 'h1' );
        h1.textContent = name;
        article.appendChild(h1);
        article.appendChild(img);
        return (article);
    }
    async function getRealisations(){
        // Récupération des media depuis le fichier JSON
        const reponse = await fetch('data/photographers.json');
        const datam = await reponse.json();
        const medias = datam.media;
        const realisations = medias.filter(media => media.photographerId == id); 
        //console.log(realisations);
        return ({
            realisations: [...realisations]})
   }

   async function getTotalLikes(){
        let totalLikes = 0;
        // Récupération des media depuis le fichier JSON
        const reponse = await fetch('data/photographers.json');
        const datam = await reponse.json();
        const medias = datam.media;
        const realisations = medias.filter(media => media.photographerId == id);  
        realisations.forEach(element => {
            totalLikes += element.likes;
        });

        return(totalLikes);
   }
   
    return { name , picture , price , city, country, tagline, getTotalLikes, getUserCardDOM , getRealisations }
}

function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a = document.createElement('a');
        //var url = new URL("photographer.html");
        //url.searchParams.append('id', id);
        let url = "photographer.html?id=" + id;
        a.setAttribute("href",url);
        a.setAttribute("alt", name);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt"," ");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        a.appendChild(img);
        a.appendChild(h2);
        const h3 = document.createElement('h3');
        h3.textContent = city+ ", "+country;
        const p = document.createElement('p');
        p.textContent = tagline;
        const span = document.createElement('span');
        span.textContent = `${price}€/jour`;
        //article.appendChild(img);
        //article.appendChild(h2);
        article.appendChild(a);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);
        return (article);
    }
    return { name,  id, city, country, tagline, price,picture, getUserCardDOM};
}