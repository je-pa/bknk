const subscriptionListCont = document.querySelector('#subscriptionListCont');
const contW935Elem = document.querySelector('.contW935');

function getSubscriptionList(){
    fetch('subscriptionList')
        .then(res=>res.json())
        .then(myJson =>{
            console.log(myJson);
            makeSubscriptionList(myJson);
        })
}

function makeSubscriptionList(data){
    if(data.length == 0 ){return;}
    for(let i=0; i<data.length;i++){
        const item = data[i];
            // <div className="subscriptionItemCont">
            //     <div className="subscriptionItem_left">
            //         <img th:unless="${auth.mainProfile == null || auth.mainProfile == ''}"
            //              className="pointer mainProfileImg profile wh50"
            //              th:src="@{/pic/user/{iuser}/{img}(iuser=${auth.iuser},img=${auth.mainProfile})}">
            //             <img th:if="${auth.mainProfile == null || auth.mainProfile == ''}"
            //                  className="pointer mainProfileImg profile wh50" th:src="@{/img/profile.png}">
            //                 <div><span th:text="${auth.nick}" className="pointer"></span></div>
            //     </div>
            //     <div className="subscriptionItem_right">
            //         <button className="subscriptionBtn btn">구독버튼</button>
            //     </div>
            // </div>
        /******************** Item시작 ************************/
        const subscriptionItem_contDiv = document.createElement('div');
        subscriptionItem_contDiv.classList.add('subscriptionItemCont');

        //////////////왼쪽(내가 구독한사람 표시)/오른쪽(구독버튼) 구역 나눔/////////////////////
        const subscriptionItem_leftDiv = document.createElement('div');
        subscriptionItem_leftDiv.classList.add('subscriptionItem_left');
        const subscriptionItem_rightDiv = document.createElement('div');
        subscriptionItem_rightDiv.classList.add('subscriptionItem_right');

        subscriptionItem_contDiv.append(subscriptionItem_leftDiv); //왼쪽
        subscriptionItem_contDiv.append(subscriptionItem_rightDiv); //오른쪽

        /////////////////왼쪽(프로필이미지,닉네임)///////////////////////////////
        const mainProfileImg = document.createElement('img');
        mainProfileImg.classList.add('pointer','mainProfileImg','profile','wh50');
        if(item.mainProfile == null || item.mainProfile == ''){
            mainProfileImg.src=`/img/profile.png`;
        }else{
            mainProfileImg.src=`/pic/user/${item.iuser}/${item.mainProfile}`;
        }
        mainProfileImg.addEventListener('click',()=>{moveToFeed(item.nick);})
        const nickDiv = document.createElement('div');
        const nickSpan = document.createElement('span');
        nickSpan.classList.add('pointer');
        nickSpan.innerHTML=`${item.nick}`;
        nickSpan.addEventListener('click',()=>{moveToFeed(item.nick);})
        nickDiv.append(nickSpan);

        subscriptionItem_leftDiv.append(mainProfileImg);
        subscriptionItem_leftDiv.append(nickDiv);

        /////////////////오른쪽(구독버튼)///////////////////////////////
        const subscription_Button = document.createElement('button');
        subscription_Button.classList.add('subscriptionBtn','btn');
        if(item.subscriber == 1) {
            subscription_Button.innerHTML = '구독중';
            subscription_Button.addEventListener('click', ()=>createCancelSubscriptionModal(subscription_Button, item.iuser, contW935Elem), once);
        }else{
            subscription_Button.innerHTML = '구독하기';
            subscription_Button.classList.add('DoSubscriptionBtn');
            subscription_Button.addEventListener('click',()=>ajaxSubscription(subscription_Button,item.iuser,contW935Elem), once);
        }

        subscriptionItem_rightDiv.append(subscription_Button);

        subscriptionListCont.append(subscriptionItem_contDiv);
    }

}

getSubscriptionList();
