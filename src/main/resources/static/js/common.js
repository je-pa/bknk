const profileImgBtnElem = document.querySelector('.profileImgBtn');
const dropdownMenuElem = document.querySelector('.dropdown_menu');

let once = { once : true};

if(profileImgBtnElem){
    profileImgBtnElem.addEventListener('click',()=>{
        dropdownMenuElem.classList.toggle('active');
    });
}

function moveToProfile(nick){
    console.log(nick);
    location.href=`/${nick}/`;
}

