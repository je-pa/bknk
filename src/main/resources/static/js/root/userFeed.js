
/********************* 구독취소 *************************/
const cancelSubModalElem = document.querySelector('#cancel_subscription-modal');
const btnCancelSubElem = document.querySelector('#cancel_subscription');
const cancelSubModalCloseElem = document.querySelector('#cancel_subscription-modal .modal_close');
//프로필이미지 삭제 모달창 띄우기 이벤트
if(btnCancelSubElem){
    btnCancelSubElem.addEventListener('click', clickHide);
}
function clickHide(){
    cancelSubModalElem.classList.remove('hide');
}

//프로필이미지 삭제 모달창 닫기
if(cancelSubModalCloseElem){
    cancelSubModalCloseElem.addEventListener('click', () => {
        cancelSubModalElem.classList.add('hide');
    })
}


const btnDelElem = document.querySelector('#btnDel');
if(btnDelElem){
    btnDelElem.addEventListener('click', () => {
        ajaxCancelSubscription();
    })
}
function ajaxCancelSubscription(feedIuser){
    fetch(`subscription?feedIuser=${feedIuser}`,{
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(myJson => {
            switch (myJson.result){
                case 0:
                    alert('구독 취소 실패');
                    break;
                case 1:

                    cancelSubModalElem.classList.add('hide');
                    if(btnCancelSubElem){
                        btnCancelSubElem.removeEventListener('click', clickHide);
                    }
                    break;
            }
        });
}