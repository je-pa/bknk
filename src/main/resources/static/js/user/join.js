const frmElem = document.querySelector('#joinFrm');
const pwElem = frmElem.pw;
const pwChkElem = frmElem.pwChk;
const chkPwResultElem = document.querySelector('#chkPwResult');
const loadingElem = document.querySelector('.loading');
function frmChk(){
    if(!(chkPwResultElem.textContent===''|| chkPwResultElem.textContent === null)){
        document.querySelector('#chkFrm').innerHTML='비밀번호를 확인해주세요';
        return false;
    }
    showLoading();
    return true;
}

pwElem.addEventListener('keyup',chkPw);
pwChkElem.addEventListener('keyup',chkPw);
function chkPw(){
    var space =/ /gi;
    if(pwElem.value !== pwChkElem.value){
        chkPwResultElem.innerHTML='비밀번호가 일치하지 않습니다.';
    }else if(space.test(pwElem.value)){
        chkPwResultElem.innerHTML='비밀번호는 공백 입력이 불가능합니다.';
    }else {
        chkPwResultElem.innerHTML='';
    }
}

function showLoading() { loadingElem.classList.remove('hide'); }