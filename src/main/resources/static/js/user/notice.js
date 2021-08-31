const subscriptionCont_right_header_Const=document.querySelector('#subscriptionCont_right_header')
const subscriptionListCont = document.querySelector('#subscriptionListCont');
const contW935Elem = document.querySelector('.contW935');
let length = 0;
let currentPage = 1;
const limit = 10;

function getSubscriptionList(page){
    createLoading();
    fetch(`/connect/getNotice?page=${page}&limit=${limit}`)
        .then(res=>res.json())
        .then(myJson =>{
            console.log(myJson);
            setTimeout(()=>{
                length = myJson.length;
                removeLoading();
                makeSubscriptionList(myJson);
            },800);
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
            mainProfileImg.src=`/pic/user/${item.feedIuser}/${item.mainProfile}`;
        }
        mainProfileImg.addEventListener('click',()=>{moveToFeed(item.nick);})
        const nickDiv = document.createElement('div');
        const nickSpan = document.createElement('span');
        nickSpan.classList.add('pointer');
        nickSpan.innerHTML=`${item.nick}님이 새로운 게시글을 올렸습니다`;
        nickSpan.addEventListener('click',()=>{moveToIboard(item.iboard)})
        nickDiv.append(nickSpan);

        subscriptionItem_leftDiv.append(mainProfileImg);
        subscriptionItem_leftDiv.append(nickDiv);

        /////////////////오른쪽(구독버튼)///////////////////////////////
        const subscription_Button = document.createElement('button');
        subscription_Button.classList.add('subscriptionBtn','btn');

        subscription_Button.innerHTML = '보러가기';
        subscription_Button.addEventListener('click', ()=>moveToIboard(item.iboard));


        subscriptionItem_rightDiv.append(subscription_Button);

        subscriptionListCont.append(subscriptionItem_contDiv);
    }

}
const listCont = document.querySelector('#subscriptionListCont');

// function scrollInfinity(target){
//     target.addEventListener('scroll',()=>{
//         if(target.scrollTop + target.clientHeight >= target.scrollHeight - 5 && length === limit){
//             length = 0;
//             getSubscriptionList(++currentPage);
//         }
//     })
// }
function scrollInfinity2(target){
    target.addEventListener('scroll',()=>{
        //id: subscriptionListCont 에 class : loading
        const{
            scrollTop,
            clientHeight,
            scrollHeight
        } = target;

        if(scrollTop + clientHeight >= scrollHeight - 5 && length === limit){
            // createLoading();
            length = 0;
            getSubscriptionList(++currentPage);
        }
    })
}
const subscription_loading = document.createElement('div');

function createLoading(){
    subscription_loading.classList.add('subscription_loading');
    subscription_loading.innerHTML=`<img src="/img/loading.gif">`;
    subscriptionListCont.append(subscription_loading);
}
function removeLoading(){
    subscription_loading.remove();
}

getSubscriptionList(1);
// scrollInfinity(listCont);
scrollInfinity2(listCont);

const subscription_Button2 = document.createElement('button');
subscription_Button2.classList.add('subscriptionBtn','btn');
subscription_Button2.innerHTML = '전체삭제';
subscription_Button2.addEventListener('click', ()=>updLastLogin());
subscriptionCont_right_header_Const.append(subscription_Button2)