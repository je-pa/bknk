const frmElem = document.querySelector('#joinFrm');
const emailElem = frmElem.email;
const pwElem = frmElem.pw;
const pwChkElem = frmElem.pwChk;
const chkFrmResultElem = document.querySelector('#chkFrmResult');

function frmchk(){
    emailChkAjax(emailElem.value);

    return true;
}

function emailChkAjax(email){
    console.log(email);
}