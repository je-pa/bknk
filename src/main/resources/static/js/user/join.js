var frmElem = document.querySelector('#joinFrm');
var emailElem = frmElem.email;
var pwElem = frmElem.pw;
var pwChkElem = frmElem.pwChk;
var chkFrmResultElem = document.querySelector('#chkFrmResult');

function frmchk(){
    emailChkAjax(emailElem.value);

    return true;
}

function emailChkAjax(email){
    console.log(email);
}