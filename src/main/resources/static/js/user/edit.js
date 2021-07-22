let fileList = [];
const selProfileImgElem = document.querySelector('#selProfileImg');
const btnUploadElem = document.querySelector('#btnUpload');
// function frmProfileImg(){
//     // console.log(profileImgElem.value);
//     const formData = new FormData();
//     formData.append()
//     fetch('profile',{
//         method:'POST',
//         enctype: 'multipart/form-data',
//         processData: false,
//         contentType: false,
//         data: formDataElem
//     })
//         .then(res=>res.json())
//
//     return false;
// }

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
                    alert('메인프로필 변경 성공');
                    break;
            }
        });
})