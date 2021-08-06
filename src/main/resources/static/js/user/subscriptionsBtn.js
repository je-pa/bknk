/****************** 구독취소 모달창 **********************/
const cancelSubModalElem = document.querySelector('.cancel_subscription-modal');
const cancelSubModalCloseElem = document.querySelector('.cancel_subscription-modal .modal_close');

function createCancelSubscriptionModal(subscriptionBtn, iuser, cont){
    // <div className="cancel_subscription-modal modal hide">
    //     <div>
    //         <div className="modal_close_parent">
    //             <div>구독을 취소하시겠습니까?</div>
    //             <i className="modal_close fas fa-times"></i></div>
    //         <input type="button" className="btnCancel btn pointer" value="네">
    //     </div>
    // </div>
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('cancel_subscription-modal','modal');

    const div = document.createElement('div');
    modalDiv.append(div);

    //상단) 구독을 취소하겠습니까?   x버튼
    const modal_close_parentDiv = document.createElement('div');
    modal_close_parentDiv.classList.add('modal_close_parent');
    const modal_closeElem = document.createElement('i');
    modal_closeElem.classList.add('modal_close','fas','fa-times');

    modal_close_parentDiv.innerHTML='<div>구독을 취소하시겠습니까?</div>';
    modal_close_parentDiv.append(modal_closeElem);

    //하단) '네' 버튼
    const btnCancelInput = document.createElement('input');
    btnCancelInput.type='button';
    btnCancelInput.classList.add('btnCancel','btn','pointer');
    btnCancelInput.value='네';

    div.append(modal_close_parentDiv);
    div.append(btnCancelInput);

    cont.append(modalDiv);

    modal_closeElem.addEventListener('click',()=>close(modalDiv, subscriptionBtn, iuser, cont));
    btnCancelInput.addEventListener('click',()=>ajaxCancelSubscription(subscriptionBtn,iuser,modalDiv,cont));
}

function close(modalDiv, subscriptionBtn, iuser, cont){
    modalDiv.remove();
    subscriptionBtn.addEventListener('click',()=>createCancelSubscriptionModal(subscriptionBtn, iuser, cont), once);
}

// 구독취소 모달창 제거
if(cancelSubModalCloseElem){
    cancelSubModalCloseElem.addEventListener('click', () => {
        cancelSubModalElem.remove();
    })
}

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
                        subscriptionBtn.addEventListener('click',()=>createCancelSubscriptionModal(subscriptionBtn, iuser, cont), once);
                        subscriptionBtn.innerText='구독중';
                        subscriptionBtn.classList.remove('DoSubscriptionBtn');
                    }

                    break;
            }
        });
}

/********************* 구독취소 AJAX *************************/
function ajaxCancelSubscription(subscriptionBtn,iuser, modalDiv,cont){
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
                    modalDiv.remove();
                    // cancelSubModalElem.classList.add('hide');
                    if(subscriptionBtn){
                        // subscriptionElem.removeEventListener('click', clickHide);
                        subscriptionBtn.addEventListener('click',()=>ajaxSubscription(subscriptionBtn,iuser,cont), once);
                        subscriptionBtn.innerText='구독하기';
                        subscriptionBtn.classList.add('DoSubscriptionBtn');
                    }
                    break;
            }
        });
}