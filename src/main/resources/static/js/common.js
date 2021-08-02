const profileImgBtnElem = document.querySelector('.profileImgBtn');
const dropdownMenuElem = document.querySelector('.dropdown_menu');
if(profileImgBtnElem){
    profileImgBtnElem.addEventListener('click',()=>{
        dropdownMenuElem.classList.toggle('active');
    });
}