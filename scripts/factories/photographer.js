function photographerFactoryBase(data) {
    const {name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    async function getRealisations(){
        // Récupération des media depuis le fichier JSON
        const reponse = await fetch('data/photographers.json');
        const datam = await reponse.json();
        const medias = datam.media;
        const realisations = medias.filter(media => media.photographerId == id); 
        console.log(realisations);
        return ({
            realisations: [...realisations]})
   }


    return { name, picture, getUserCardDOM , getRealisations }
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
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        a.appendChild(img);
        a.appendChild(h2);
        const h3 = document.createElement('h3');
        h3.textContent = city;
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