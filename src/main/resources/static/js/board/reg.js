var globalConstElem=document.querySelector('#globalConst')
var mapModalElement=document.querySelector('#map_modal')
var infoSectionElem=document.querySelector('#infoSection')
var modCmtModalElem=document.modCmtForm
var modCmtContainerElem=document.querySelector('#modCmtContainer')

//모달창 띄우는 함수
function delClassHide(){
    var closeIcon=document.querySelector('.modal_close', '.fas' ,'.fa-times')
    mapModalElement.classList='openModal'
    closeIcon.addEventListener('click',()=>{
        onClassHide()
    })

    var map = new kakao.maps.Map(mapContainer, mapOption);
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    var placeLatLng=new kakao.maps.LatLng(dataY,dataX)
    locationPoint(placeLatLng,map)
}

function delClassHide2(){
    modCmtContainerElem.classList='hide'
}
//모달창 숨기기 함수
function onClassHide(){
    mapModalElement.classList='hide'
}

//지도 부분-----------------------------------------------------------------------
var dataX=mapModalElement.dataset.x
var dataY=mapModalElement.dataset.y
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(dataY, dataX), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다


// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
    infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다


//지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다

function locationPoint(LatLng,map){
    searchDetailAddrFromCoords(LatLng,function (result, status){
        if(status===kakao.maps.services.Status.OK){
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

            var content = '<div class="bAddr">' +
                '<span class="title">법정동 주소정보</span>' +
                detailAddr +
                '</div>';

            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(LatLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    })
}
// kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
//     searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
//         if (status === kakao.maps.services.Status.OK) {
//             var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
//             detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
//
//             var content = '<div class="bAddr">' +
//                 '<span class="title">법정동 주소정보</span>' +
//                 detailAddr +
//                 '</div>';
//
//             // 마커를 클릭한 위치에 표시합니다
//             marker.setPosition(mouseEvent.latLng);
//             marker.setMap(map);
//
//             // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
//             infowindow.setContent(content);
//             infowindow.open(map, marker);
//         }
//     });
// });

// // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
// kakao.maps.event.addListener(map, 'idle', function() {
//     searchAddrFromCoords(map.getCenter(), displayCenterInfo);
// });

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');

        for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                // infoDiv.innerHTML = result[i].address_name;
                break;
            }
        }
    }
}


//맵으로 인해
mapModalElement.className='hide'

//------------------------------swiper-------------------------------------------------------
const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

//---------------------댓글창 부분---------------------------------------------------------------
const formCmt=document.cmtWindow
const CMTCONTAINER=document.querySelector('#cmtContainer')
var iuser=globalConstElem.dataset.iuser
var iboard=infoSectionElem.dataset.iboard
makeComList()

//댓글 테이블 구현
function makeComList(){
    CMTCONTAINER.innerHTML=''
    fetch('/b/cmtLoad?iboard='+iboard)
        .then(res => res.json())
        .then(myJson => {

            myJson.forEach(function(currentValue){
                const DIVTAG=document.createElement('div')
                const PROFILEIMG=document.createElement('img')
                const ATAGWRITER1=document.createElement('a')
                const DIVTAGWRITER2=document.createElement('div')
                const CMTTDCMT=document.createElement('div')
                const CMTTDTIME=document.createElement('div')
                const CMTTDMOD=document.createElement('div')
                // const CMTTD4=document.createElement('td')

                if(iuser==currentValue.iuser){
                    const ICONTAG=document.createElement('i')
                    const ICONTAG2=document.createElement('i')
                    ICONTAG.classList='far fa-trash-alt pointer'
                    ICONTAG.dataset.icmt=currentValue.icmt
                    ICONTAG.addEventListener('click', delCmt)
                    ICONTAG2.classList='fas fa-pencil-alt'
                    ICONTAG2.dataset.icmt=currentValue.icmt
                    ICONTAG2.addEventListener('click', function (e){
                        modCmtContainerElem.classList=''
                        console.log(e.target.parentNode.previousSibling.firstChild.innerText)
                        modCmtModalElem.cmt.value=e.target.parentNode.previousSibling.firstChild.innerText
                        modCmtModalElem.icmt.value=e.target.dataset.icmt
                    })
                    CMTTDMOD.append(ICONTAG)
                    CMTTDMOD.append(ICONTAG2)
                }
                PROFILEIMG.src=`/pic/user/${currentValue.iuser}/${currentValue.mainProfile}`
                PROFILEIMG.classList='wh30 profile'
                ATAGWRITER1.append(PROFILEIMG)
                ATAGWRITER1.append(DIVTAGWRITER2)
                ATAGWRITER1.href='/'+currentValue.writer+'/'

                DIVTAGWRITER2.innerText=currentValue.writer
                CMTTDCMT.innerHTML=`<div>${currentValue.cmt}</div>`
                CMTTDTIME.innerText=getDateTimeInfo(currentValue.regdt)

                CMTTDCMT.append(CMTTDTIME)
                DIVTAG.append(ATAGWRITER1)
                DIVTAG.append(CMTTDCMT)
                DIVTAG.append(CMTTDMOD)
                CMTCONTAINER.append(DIVTAG)
            })


        })
}

//댓글 업로드
function uploadCmt(){
    var cmtData={
        iboard:infoSectionElem.dataset.iboard,
        cmt:formCmt.cmt.value
    }
    if(cmtData.cmt==''){
        alert('댓글을 입력하세요')
        return false
    }else if(cmtData.cmt.replace(/^\s+|\s+$/g,'')==''){
        alert('댓글창이 공백입니다')
        return false
    }
    fetch('/b/cmtUpload',{
        method: 'POST',
        headers:{"Content-Type":"application/json; charset=utf-8"},
        body: JSON.stringify(cmtData)
    }).then(res => res.json())
        .then(myJson =>{
            switch(myJson){
                case 0:
                    alert('댓글 입력에 실패')
                    break
                case 1:
                    alert('댓글 입력 성공')
                    location.reload()
                    break
            }
        })
    return false
}

//댓글 수정
function modCmt(){
    var icmt=modCmtModalElem.icmt.value
    var cmt=modCmtModalElem.cmt.value
    fetch('/b/modCmt',{
        method: 'POST',
        headers:{"Content-Type":"application/json; charset=utf-8"},
        body: JSON.stringify({icmt:icmt, cmt:cmt})
    })
        .then(res => res.json())
        .then(myJson => {
            console.log("결과"+myJson)
            switch (myJson){
                case 0:
                    alert('댓글 수정 실패하였습니다.')
                    break
                case 1:
                    alert('수정 되었습니다')
                    makeComList()
                    break
            }
        })
    modCmtContainerElem.classList='hide'
    return false
}

//댓글 삭제
function delCmt(){
    if(confirm('댓글을 삭제하시겠습니까?')){
        var icmt=this.dataset.icmt
        fetch('/b/delCmt',{
            method: 'POST',
            headers:{'Content-Type':'application/json; charset=utf-8'},
            body: JSON.stringify({icmt:icmt})
        }).then(res => res.json())
            .then(myJson =>{
                console.log(myJson)
                switch (myJson) {
                    case 1:
                        alert('삭제되었습니다')
                        location.reload()
                        break
                    case 0:
                        alert('삭제실패')
                        break
                }
            })
    }
}

//좋아요 부분
var iconFavElem=document.querySelector('#thumbs-up')
const ICONFAV=document.createElement('i')
if(iconFavElem.dataset.myfav==0){
    ICONFAV.classList='far fa-heart pointer'
    ICONFAV.addEventListener('click',insFav)
}else{
    ICONFAV.classList='fas fa-heart pointer'
    ICONFAV.addEventListener('click',delFav)
}
ICONFAV.innerText=iconFavElem.dataset.favcount
iconFavElem.append(ICONFAV)

function insFav(){
    fetch('/b/insFav',{
        method:'POST',
        headers:{'Content-Type':'application/json; charset=utf-8'},
        body:JSON.stringify({iboard:iboard})
    }).then(res => res.json())
        .then(myJson => {
            if(myJson==1){
                ICONFAV.classList='fas fa-heart pointer'
                iconFavElem.dataset.favcount=parseInt((iconFavElem.dataset.favcount))+1
                ICONFAV.innerText=iconFavElem.dataset.favcount
                ICONFAV.removeEventListener('click',insFav)
                ICONFAV.addEventListener('click',delFav)
            }
        })
}

function delFav(){
    fetch('/b/delFav',{
        method:'POST',
        headers:{'Content-Type':'application/json; charset=utf-8'},
        body:JSON.stringify({iboard:iboard})
    }).then(res => res.json())
        .then(myJson => {
            if(myJson==1){
                ICONFAV.classList='far fa-heart pointer'
                iconFavElem.dataset.favcount=parseInt((iconFavElem.dataset.favcount))-1
                ICONFAV.innerText=iconFavElem.dataset.favcount
                ICONFAV.removeEventListener('click',delFav)
                ICONFAV.addEventListener('click',insFav)
            }
        })
}

//----------------------------------------------------------------------------------------------
const fa_ellipsis_h_Elem=document.querySelector('.fa-ellipsis-h')
fa_ellipsis_h_Elem.addEventListener('click',function (){

})



function getDateTimeInfo(dt) {
    const nowDt = new Date();
    const targetDt = new Date(dt);

    const nowDtSec = parseInt(nowDt.getTime() / 1000);
    const targetDtSec = parseInt(targetDt.getTime() / 1000);

    const diffSec = nowDtSec - targetDtSec;
    if(diffSec < 120) {
        return '1분 전';
    } else if(diffSec < 3600) { //분 단위
        return `${parseInt(diffSec / 60)}분 전`;
    } else if(diffSec < 86400) { //시간 단위
        return `${parseInt(diffSec / 3600)}시간 전`;
    } else if(diffSec < 604800) { //일 단위
        return `${parseInt(diffSec / 86400)}일 전`;
    }
    return targetDt.toLocaleString();
}

function openMenuModal(){
    var modal=document.querySelector('#menuModal')
    modal.classList='flex'
}
//<i className="fas fa-thumbs-up"></i> 채워진거
//<i className="far fa-thumbs-up"></i>    안채워진거

function delboard(){
    console.log('asdasd')
    var writer=globalConstElem.dataset.writer
    fetch('/b/delBoard?iboard='+iboard)
        .then(res=>res.json())
        .then(myJson => {
            switch (myJson) {
                case 0:
                    alert('삭제 실패하였습니다')
                    break;
                case 1:
                    alert('삭제되었습니다')
                    history.back()
            }
        })
}