let fileList = [];
const selProfileImgElem = document.querySelector('#selProfileImg');
const btnUploadElem = document.querySelector('#btnUpload');
const mainProfileImgElemList = document.querySelectorAll('.mainProfileImg');

/********************* 프로필 사진 변경 *************************/
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
                    break;
            }
        });
}

/********************* 프로필 사진 삭제 *************************/
const profileImgModalElem = document.querySelector('#profileImg-modal');
const btnMainImgDelElem = document.querySelector('#btnMainImgDel');
const profileImgModalCloseElem = document.querySelector('#profileImg-modal .modal_close');
//프로필이미지 삭제 모달창 띄우기 이벤트
btnMainImgDelElem.addEventListener('click', () => {
    profileImgModalElem.classList.remove('hide');
});
//프로필이미지 삭제 모달창 닫기
if(profileImgModalCloseElem){
    profileImgModalCloseElem.addEventListener('click', () => {
        profileImgModalElem.classList.add('hide');
    })
}

const btnDelElem = document.querySelector('#btnDel');

btnDelElem.addEventListener('click', () => {
    ajaxDelMainProfile();
})
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
                    break;
            }
        });
}
/********************* 프로필 정보 변경 *************************/
const frmElem = document.querySelector('#editFrm');
const nickElem = frmElem.nick;
const chkNickAjaxElem = document.querySelector('#chkNickAjax');

nickElem.addEventListener('keyup',(e)=>{
    console.log(nickElem.value);
    console.log(chkNickAjaxElem.textContent);
    ajaxChkNick(nickElem.value);

})
// 사용할 수 없는 닉네임입니다. 다른 닉네임을 사용하세요.
function ajaxChkNick(nick){
    fetch(`chkNick?nick=${nick}`)
        .then(res => res.json())
        .then(myJson => {
            console.log(myJson.result);
        })

}

/********************* 비밀번호 변경 *************************/
const passwordModalElem = document.querySelector('#password-modal');
const passwordElem = document.querySelector('#modProfileCont .password');
const passwordmodalCloseElem = document.querySelector('#password-modal .modal_close');

//비밀번호 모달창 띄우기 이벤트
passwordElem.addEventListener('click', () => {
    passwordModalElem.classList.remove('hide');
});

//비밀번호 모달창 닫기
if(passwordmodalCloseElem){
    passwordmodalCloseElem.addEventListener('click', () => {
        passwordModalElem.classList.add('hide');
        //  location.reload();
    })
}
