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
    header.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'false');
    modalCloseBtn.focus();

}

//Function to close modal

function closeModal() {
    //const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    main.setAttribute('aria-hidden', 'false');
    header.setAttribute('aria-hidden', 'false');
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
