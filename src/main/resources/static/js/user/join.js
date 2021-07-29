const frmElem = document.querySelector('#joinFrm');
const emailElem = frmElem.email;
const pwElem = frmElem.pw;
const pwChkElem = frmElem.pwChk;
const chkFrmResultElem = document.querySelector('#chkFrmResult');
const loadingElem = document.querySelector('.loading');
function frmChk(){
    showLoading();
    emailChkAjax(emailElem.value);
    return true;
}

function emailChkAjax(email){
    console.log(email);
}

// function hideLoading() { loadingElem.classList.add('hide');}
function showLoading() { loadingElem.classList.remove('hide'); }