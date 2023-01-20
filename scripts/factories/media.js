function mediaFactory(data, type, photographerName) {
    
    const {id, title, likes, date, price } = data;
    const first = photographerName.split(" ")[0];
    //Le nom du dosssier contenant les images contient un espace comme Ellie-Rose -> Ellie Rose
    const newFirst = first.replace('-',' ');
    let chemin = "";
    if(type=="image"){
         chemin = `assets/images/${newFirst}/${data.image}`;
    }   
    else if(type == "video"){
         chemin = `assets/images/${newFirst}/${data.video}`
    }
    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute('class', 'media-card');
        if (type == 'image'){
            const img = document.createElement( 'img' );
            img.setAttribute("src", chemin);
            article.appendChild(img);
        }else {
            const video = document.createElement( 'video' );
            video.setAttribute("controls","controls");
            const source = document.createElement("source");
            source.setAttribute('src', chemin);
            video.appendChild(source);
            article.appendChild(video);

        }
        const div = document.createElement('div');
        div.setAttribute('class','media-card-infos');
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        const span =  document.createElement('span');
        span.setAttribute('id', 'number-likes');
        const i = document.createElement('i');
        i.setAttribute("class", "fa-solid fa-heart");
        span.textContent = likes + " ";
        span.appendChild(i);
        div.appendChild(h2);
        div.appendChild(span);

        article.appendChild(div);
        
        return (article);
    }
    return { id,title, getMediaCardDOM }
}