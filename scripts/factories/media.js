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
    function getMediaCardDOM(index) {
        const article = document.createElement( 'article' );
        article.setAttribute('class', 'media-card');
        if (type == 'image'){
            const img = document.createElement( 'img' );
            img.setAttribute('class','media-card-content');
            img.setAttribute("src", chemin);
            img.setAttribute('alt',title);
            img.setAttribute('data-likes',likes);
            img.setAttribute('data-date' , date);
            img.addEventListener('click',function(){
                openLighBox();
                currentSlide(index);
            });
            article.appendChild(img);
        }else {
            const video = document.createElement( 'video' );
            video.setAttribute("controls","controls");
            video.setAttribute('class','media-card-content');
            video.setAttribute('alt',title);
            video.setAttribute('data-likes',likes);
            video.setAttribute('data-date' , date);
            video.addEventListener('click',function(){
                openLighBox();
                currentSlide(index);
            });
            const source = document.createElement("source");
            source.setAttribute('src', chemin);
            video.appendChild(source);
            article.appendChild(video);

        }
        const div = document.createElement('div');
        div.setAttribute('class','media-card-infos');
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        const divLikes = document.createElement("div");
        const span =  document.createElement('span');
        span.setAttribute('class', 'number-likes');
        const i = document.createElement('i');
        i.setAttribute("class", "fa-solid fa-heart");
        i.setAttribute("data-liked",false);
        i.addEventListener("click" ,function(e){
            let nbLikes = Number(e.target.previousSibling.textContent) ;
            let dataLiked =  e.target.getAttribute('data-liked');
            let spanTotalLikes = document.getElementById("total");
        
           if(dataLiked == "true"){
                e.target.previousSibling.textContent = nbLikes - 1;
                e.target.setAttribute('data-liked',false);
                spanTotalLikes.textContent = Number(spanTotalLikes.textContent) - 1;
            }else{
                e.target.previousSibling.textContent = nbLikes + 1;
                e.target.setAttribute('data-liked',true);
                spanTotalLikes.textContent = Number(spanTotalLikes.textContent) + 1;
            }
           
        });
        span.textContent = likes + " ";
        divLikes.appendChild(span);
        divLikes.appendChild(i);
        div.appendChild(h2);
        div.appendChild(divLikes);

        article.appendChild(div);
        
        return (article);
    }
    return { id,title, getMediaCardDOM }
}