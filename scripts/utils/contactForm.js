//Global DOM variables
const modal = document.getElementById("contact_modal");
const header = document.getElementsByTagName("header")[0];
const main = document.getElementById("main");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const photographe = document.getElementsByTagName("h1")[0];

//Function to open modal
function displayModal() {
    //const modal = document.getElementById("contact_modal");
    initTitleModal();
	modal.style.display = "block";
    main.setAttribute('aria-hidden', 'true');
    main.style.opacity = 0.5;
    header.setAttribute('aria-hidden', 'true');
    header.style.opacity = 0.5;
    modal.setAttribute('aria-hidden', 'false');
    //modalCloseBtn.focus();
    document.getElementById("prenom").focus({focusVisible:true});
}

//Function to close modal

function closeModal() {
    //const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    main.setAttribute('aria-hidden', 'false');
    main.style.opacity = 1;
    header.setAttribute('aria-hidden', 'false');
    header.style.opacity = 1;
    modal.setAttribute('aria-hidden', 'true');
}

// Close modal when espace key is pressed

document.addEventListener('keydown', (e) => {
    var code = e.code;
    if (modal.getAttribute("aria-hidden") == "false" && code === 'Escape') {
        closeModal();
    }
  }, false);

function initTitleModal(){
    const photographe = document.getElementsByTagName("h1")[0].innerHTML;
    let modalTitle = document.getElementById("modal-title");
    modalTitle.innerHTML = "Contactez-moi<br>"+photographe;
}

//
document.querySelectorAll(".contact_button")[1].addEventListener("click", event => {
    event.preventDefault();
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    document.getElementById("nom").value = "";
    console.log("Nom & prenom: " + nom + " " + prenom);
    console.log("email :\t" + email );
    console.log("message : \t" + message);
    closeModal();
    alert("Votre message a été envoyé!")
});