
/********************* 프로필 사진 변경 *************************/
let fileList = [];
const selProfileImgElem = document.querySelector('#selProfileImg');
const btnUploadElem = document.querySelector('#btnUpload');
const mainProfileImgElemList = document.querySelectorAll('.mainProfileImg');

selProfileImgElem.addEventListener('change', () => {
    const files = selProfileImgElem.files;
    fileList = [];
    for(let i=0; i<files.length; i++) {
        fileList.push(files[i]); //추가
    }
    toggleBtnUpload();
});

//등록버튼 활성화/비활성화 결정
function toggleBtnUpload(){
    btnUploadElem.disabled=true;
    if(fileList.length > 0){
        btnUploadElem.disabled = false;
    }
}

btnUploadElem.addEventListener('click', () => {
    const data = new FormData();
    if(fileList.length>0){ //FileReader는 뭐지
        for(let i=0;i<fileList.length;i++){
            data.append('profileImg',fileList[i]);
            // console.log(fileList[i]);
        }
    }
    ajaxUpdMainProfile(data);
})
function ajaxUpdMainProfile(data){
    fetch('updMainProfile',{
        method: 'POST',
        body: data
    })  .then(res => res.json())
        .then(myJson => {
            console.log(myJson);
            switch (myJson.result){
                case 0:
                    alert('메인프로필 변경 실패');
                    break;
                case 1:
                    mainProfileImgElemList.forEach(item=>{
                        item.src=`/pic/user/${myJson.loginUser.iuser}/${myJson.loginUser.mainProfile}`;
                    })
                    btn = document.querySelector('.mainProfileImg.profile.wh200');
                    btn.addEventListener('click', clickHide);
                    btn.classList.add('pointer');
                    break;
            }
        });
}

/********************* 프로필 사진 삭제 *************************/
const profileImgModalElem = document.querySelector('#profileImg-modal');
const btnMainImgDelElem = document.querySelector('#btnMainImgDel');
const profileImgModalCloseElem = document.querySelector('#profileImg-modal .modal_close');
//프로필이미지 삭제 모달창 띄우기 이벤트
if(btnMainImgDelElem){
    btnMainImgDelElem.addEventListener('click', clickHide);
}
function clickHide(){
    profileImgModalElem.classList.remove('hide');
}

//프로필이미지 삭제 모달창 닫기
if(profileImgModalCloseElem){
    profileImgModalCloseElem.addEventListener('click', () => {
        profileImgModalElem.classList.add('hide');
    })
}

const btnDelElem = document.querySelector('#btnDel');
if(btnDelElem){
    btnDelElem.addEventListener('click', () => {
        ajaxDelMainProfile();
    })
}
function ajaxDelMainProfile(){
    fetch('delMainProfile')
        .then(res => res.json())
        .then(myJson => {
            switch (myJson.result){
                case 0:
                    alert('메인프로필 삭제 실패');
                    break;
                case 1:
                    mainProfileImgElemList.forEach(item=>{
                        item.src='/img/profile.png';
                    })
                    profileImgModalElem.classList.add('hide');
                    if(btnMainImgDelElem){
                        btnMainImgDelElem.classList.remove('pointer');
                        btnMainImgDelElem.removeEventListener('click', clickHide);
                    }
                    break;
            }
        });
}
/********************* 프로필 정보 변경 *************************/
const frmElem = document.querySelector('#editFrm');
const nickElem = frmElem.nick;
const chkNickElem = document.querySelector('#chkNick');
const chkProfileFrmElem = document.querySelector('#chkProfileFrm');

function profileFrmChk(){
    if(chkNickElem.textContent===''|| chkNickElem.textContent === null){
        chkProfileFrmElem.innerHTML='';
        return true;
    }else{
        chkProfileFrmElem.innerHTML='닉네임을 확인해주세요.';
        return false;
    }
}
nickElem.addEventListener('keyup',(e)=>{
    // console.log(nickElem.value);
    // console.log(chkUserNickAjaxElem.textContent);
    chkNick(nickElem.value)
})

function chkNick(nick){
    var regExp =/[~!@#$%^&*()+ |<>?:;{}`\-\=\\\,.'"\[\]/]/gi;
    if(nick===''){
        chkNickElem.innerHTML='닉네임을 작성해 주세요.';
    }else if(regExp.test(nick)){
        chkNickElem.innerHTML='특수문자는 입력하실 수 없습니다.';
    }else{
        ajaxChkNick(nick);
    }
}

// 사용할 수 없는 닉네임입니다. 다른 닉네임을 사용하세요.
function ajaxChkNick(nick){
    fetch(`chkUser?nick=${nick}`)
        .then(res => res.json())
        .then(myJson => {
            // console.log(myJson.result);
            switch (myJson.result) {
                case 0:
                    chkNickElem.innerHTML='사용할 수 없는 닉네임입니다. 다른 닉네임을 사용하세요.';
                    break;
                case 1:
                    chkNickElem.innerHTML='';
                    break;
            }
        })

}

/********************* 비밀번호 변경 *************************/
const pwEditFrmElem = document.querySelector('#pwEditFrm');
const oldPwElem = pwEditFrmElem.oldPw;
const pwElem =  pwEditFrmElem.pw;

const chkOldPwElem = document.querySelector('#chkOldPw');

const passwordModalElem = document.querySelector('#password-modal');
const passwordElem = document.querySelector('#modProfileCont .password');
const passwordModalCloseElem = document.querySelector('#password-modal .modal_close');

//비밀번호 모달창 띄우기 이벤트
passwordElem.addEventListener('click', () => {
    passwordModalElem.classList.remove('hide');
});

//비밀번호 모달창 닫기
if(passwordModalCloseElem){
    passwordModalCloseElem.addEventListener('click', () => {
        passwordModalElem.classList.add('hide');
        //  location.reload();
    })
}

function pwFrmChk(){
    console.log(pw.value);
    // console.log(oldPwElem.value);
    // console.log(pwEditFrmElem.oldPw.value);
    // console.log(pwEditFrmElem.pw);
    // console.log(pwEditFrmElem.pw.value);
    // console.log(pwEditFrmElem.pwChk.value);
    // ajaxChkOldPw(pwEditFrmElem.oldPw.value);
    return false;
    // if(chkOldPwElem.textContent===''|| chkOldPwElem.textContent === null){
    //     return false;
    // }else {
    //     chkOldPwElem.innerHTML = '.';
    //     return false;
    // }
}

function ajaxChkOldPw(oldPw){
    fetch(`chkUser?pw=${oldPw}`)
        .then(res => res.json())
        .then(myJson => {
            // console.log(myJson.result);
            switch (myJson.result) {
                case 0:
                    chkOldPwElem.innerHTML='이전 비밀번호가 맞지 않습니다.';
                    break;
                case 2:
                    chkOldPwElem.innerHTML='';
                    break;
            }
        })

}