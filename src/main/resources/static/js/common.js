const profileImgBtnElem = document.querySelector('.profileImgBtn');
const dropdownMenuElem = document.querySelector('.dropdown_menu');

let once = { once : true};

if(profileImgBtnElem){
    profileImgBtnElem.addEventListener('click',()=>{
        dropdownMenuElem.classList.toggle('active');
    });
}

function moveToFeed(nick){
    console.log(nick);
    location.href=`/${nick}/`;
}

function moveToIboard(iboard){
    location.href=`/b/reg?iboard=${iboard}`
}
//------------경욱의 추가부분---------------------------------------
function updLastLogin(){
    fetch('/connect/updLastLogin',{
        method:'PUT',
        headers:{'Content-Type':'application/json; charset=utf-8'}
    })
        .then(res => res.json())
        .then(myJson => {
            location.reload()
        })
}

const globalConstElem2=document.querySelector('#globalConst')
if(globalConstElem2){

    getNotice()
    setInterval(getNotice, 180000);
}

function getNotice(){
    console.log('여기야')
    if(document.querySelector('.fa-circle')){
        return
    }else{
        fetch('/connect/getNotice')
            .then(res => res.json())
            .then(myJson => {
                if(myJson.length){
                    const iconElem=document.querySelector('.fa-bell')
                    const ITAG=document.createElement('i')
                    ITAG.classList='fas fa-circle'
                    iconElem.parentNode.append(ITAG)
                }
            })
    }
}

