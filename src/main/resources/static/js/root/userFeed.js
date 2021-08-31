
const feedIuser =document.querySelector('#feedUserConst').dataset.iuser;
const subscriptionElem = document.querySelector('#subscription');
const FeedCont = document.querySelector('.contW935');
/********************* 구독하기 *************************/

if(subscriptionElem && subscriptionElem.textContent=='구독하기'){
    subscriptionElem.addEventListener('click',()=>ajaxSubscription(subscriptionElem,feedIuser, FeedCont), once);
}

/********************* 구독취소 *************************/
//구독취소 모달창 띄우기 이벤트
if(subscriptionElem && subscriptionElem.textContent=='구독중'){
    subscriptionElem.addEventListener('click', ()=>createCancelSubscriptionModal(subscriptionElem, feedIuser, FeedCont), once);
}

/******대비*******/
//
// const feedIuser =document.querySelector('#feedUserConst').dataset.iuser;
//
// const subscriptionElem = document.querySelector('#subscription');
//
// let once = { once : true};
// /********************* 구독하기 *************************/
//
// if(subscriptionElem && subscriptionElem.textContent=='구독하기'){
//     subscriptionElem.addEventListener('click',()=>ajaxSubscription(subscriptionElem), once);
// }
// function ajaxSubscription(subscriptionElem){
//     fetch(`/user/subscription?feedIuser=${feedIuser}`,{
//         method: 'POST',
//     })
//         .then(res => res.json())
//         .then(myJson => {
//             switch (myJson.result){
//                 case 0:
//                     alert('구독 실패');
//                     break;
//                 case 1:
//                     if(subscriptionElem){
//                         // subscriptionElem.removeEventListener('click', ajaxSubscription);
//                         subscriptionElem.addEventListener('click',clickHide, once);
//                         subscriptionElem.innerText='구독중';
//                         subscriptionElem.classList.remove('DoSubscriptionBtn');
//                     }
//
//                     break;
//             }
//         });
// }
//
// /********************* 구독취소 *************************/
// const cancelSubModalElem = document.querySelector('#cancel_subscription-modal');
// // const btnCancelSubElem = document.querySelector('#cancel_subscription');
// const cancelSubModalCloseElem = document.querySelector('#cancel_subscription-modal .modal_close');
// //프로필이미지 삭제 모달창 띄우기 이벤트
// if(subscriptionElem && subscriptionElem.textContent=='구독중'){
//     subscriptionElem.addEventListener('click', clickHide, once);
// }
// function clickHide(){
//     cancelSubModalElem.classList.remove('hide');
// }
//
// //프로필이미지 삭제 모달창 닫기
// if(cancelSubModalCloseElem){
//     cancelSubModalCloseElem.addEventListener('click', () => {
//         cancelSubModalElem.classList.add('hide');
//     })
// }
//
//
// const btnCancelElem = document.querySelector('#btnCancel');
// if(btnCancelElem){
//     btnCancelElem.addEventListener('click', ()=>ajaxCancelSubscription(subscriptionElem));
// }
// function ajaxCancelSubscription(subscriptionElem){
//     fetch(`/user/subscription?feedIuser=${feedIuser}`,{
//         method: 'DELETE',
//     })
//         .then(res => res.json())
//         .then(myJson => {
//             switch (myJson.result){
//                 case 0:
//                     alert('구독 취소 실패');
//                     break;
//                 case 1:
//                     cancelSubModalElem.classList.add('hide');
//                     if(subscriptionElem){
//                         // subscriptionElem.removeEventListener('click', clickHide);
//                         subscriptionElem.addEventListener('click',()=>ajaxSubscription(subscriptionElem), once);
//                         subscriptionElem.innerText='구독하기';
//                         subscriptionElem.classList.add('DoSubscriptionBtn');
//                     }
//
//                     break;
//             }
//         });


// ---경욱---------------------------------------------
feedListObj.url=`/b/userFeedList`
feedListObj.iuser=document.querySelector('#feedUserConst').dataset.iuser
console.log(feedListObj.iuser)
feedListObj.type=0
feedListObj.makeFeedList()
feedListObj.getFeedPage()