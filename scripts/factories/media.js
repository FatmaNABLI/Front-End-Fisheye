function mediaFactory(data, photographerName) {
    
    const {id, title,image } = data;
    const first = photographerName.split(" ")[0];
    console.log(image);
    const picture = `assets/images/${first}/${image}`;
    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { id,title, picture, getMediaCardDOM }
}