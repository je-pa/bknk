/****************** 구독취소 모달창 **********************/
const cancelSubModalElem = document.querySelector('.cancel_subscription-modal');
const cancelSubModalCloseElem = document.querySelector('.cancel_subscription-modal .modal_close');

function clickHide(){
    cancelSubModalElem.classList.remove('hide');
}

function createCancelSubscriptionModal(iuser, cont){
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('cancel_subscription-modal','modal');

    const div = document.createElement('div');
    const btnCancelInput = document.createElement('input');
    btnCancelInput.type='button';
    btnCancelInput.classList.add('btnCancel','btn','pointer');
    btnCancelInput.value='네';

    div.innerHTML = `<div class="modal_close_parent"><div>구독을 취소하시겠습니까?</div><i class="modal_close fas fa-times"></i></div>`;
    div.append(btnCancelInput);

    modalDiv.append(div);
    cont.append(modalDiv);
}

// 구독취소 모달창 제거
if(cancelSubModalCloseElem){
    cancelSubModalCloseElem.addEventListener('click', () => {
        cancelSubModalElem.remove();
    })
}

//구독취소 모달창 hide
// if(cancelSubModalCloseElem){
//     cancelSubModalCloseElem.addEventListener('click', () => {
//         cancelSubModalElem.classList.add('hide');
//     })
// }

/********************* 구독 AJAX *************************/
function ajaxSubscription(subscriptionBtn,iuser,cont){
    fetch(`/user/subscription?feedIuser=${iuser}`,{
        method: 'POST',
    })
        .then(res => res.json())
        .then(myJson => {
            switch (myJson.result){
                case 0:
                    alert('구독 실패');
                    break;
                case 1:
                    if(subscriptionBtn){
                        // subscriptionElem.removeEventListener('click', ajaxSubscription);
                        subscriptionBtn.addEventListener('click',()=>createCancelSubscriptionModal(iuser, cont), once);
                        subscriptionBtn.innerText='구독중';
                        subscriptionBtn.classList.remove('DoSubscriptionBtn');
                    }

                    break;
            }
        });
}

/********************* 구독취소 AJAX *************************/
function ajaxCancelSubscription(subscriptionBtn,iuser){
    fetch(`/user/subscription?feedIuser=${iuser}`,{
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
                    if(subscriptionBtn){
                        // subscriptionElem.removeEventListener('click', clickHide);
                        subscriptionBtn.addEventListener('click',()=>ajaxSubscription(subscriptionBtn,iuser), once);
                        subscriptionBtn.innerText='구독하기';
                        subscriptionBtn.classList.add('DoSubscriptionBtn');
                    }

                    break;
            }
        });
}