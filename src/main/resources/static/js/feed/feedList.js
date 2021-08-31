const feedContainerElem=document.querySelector('#feedContainer');
const pagingContainerElem=document.querySelector('#pagingContainer')
// try{const globalConstElem=document.querySelector('#globalConst')
//     var iuser=globalConstElem.dataset.iuser}catch (e){}


const feedListObj={
    iuser:0,
    limit:9,
    page:1,
    url:'',
    type:0,
    region : 0,
    makeFeedList: function() {
        console.log('limit : '+feedListObj.limit);
        feedContainerElem.innerHTML='';
        // feedContainerElem.innerHTML=`<div id="container1"></div>
        //                              <div id="container2"></div>
        //                              <div id="container3"></div>`
        fetch(`${feedListObj.url}?limit=${feedListObj.limit}&page=${feedListObj.page}&region=${feedListObj.region}&iuser=${feedListObj.iuser}`)
            .then(res => res.json())
            .then(myJson => {
                console.log(myJson)
                for(let i=0; i<myJson.length;i++){
                    const item = myJson[i]

                    const DIV=document.createElement('div')
                    const ATAG=document.createElement('a')
                    const SPANTAG=document.createElement('span')
                    const IMGTAG=document.createElement('img')
                    const IMGTAG2=document.createElement('img')
                    const TITLE=document.createElement('div')
                    const FAV=document.createElement('div')
                    try{
                        removePin(markers)

                        if(feedListObj.region != 0){
                            addPin(item.location_Y,item.location_X, item.place)
                            const marker = new kakao.maps.Marker({
                                position: new kakao.maps.LatLng(item.location_Y, item.location_X)
                            });
                            markers.push(marker)

                            SPANTAG.addEventListener('mouseover',)
                        }
                    }catch (e){
                        console.log(e)
                        console.log('함수에러')
                    }finally{
                        //console.log(markers)
                        var container;
                        // if(i<3){
                        //     container=feedContainerElem.firstChild
                        // }else if(i<6){
                        //     container=feedContainerElem.children[1]
                        // }else{
                        //     container=feedContainerElem.lastChild
                        // }x`




                        IMGTAG.src=`/pic/board/${item.iboard}/${item.img_addr}`
                        IMGTAG.onerror=function(){this.src='/img/spring.jpg'}

                        TITLE.innerText=item.title
                        TITLE.classList='title'

                        FAV.classList='favDiv'
                        console.log(item.mainProfile)
                        FAV.innerHTML=`<a href="/${item.writer}/">
                                    <img class="wh30 profile" src="/pic/user/${item.iuser}/${item.mainProfile}" onerror="this.src='/img/profile.png'">
                                    <div>${item.writer}</div>
                                    </a>`

                        // FAV.append(item.cntFav)
                        //로그인이 안 되어 있으면
                        const spanGlobal = document.querySelector('#globalConst');

                        if(spanGlobal != null && spanGlobal.iuser != '') {
                            const ITAG=document.createElement('i')
                            ITAG.dataset.iboard = item.iboard;
                            ITAG.classList=`fa-heart pointer`;
                            FAV.append(ITAG)

                            if(item.isFav) { //좋아요 되어 있으면
                                ITAG.classList.add('fas');
                                ITAG.addEventListener('click', this.delFav);
                            } else { //좋아요 안 되어 있으면
                                ITAG.classList.add('far');
                                ITAG.addEventListener('click', this.insFav);
                            }
                        }

                        SPANTAG.append(IMGTAG)
                        SPANTAG.append(TITLE)

                        ATAG.append(SPANTAG)
                        ATAG.href=`/b/reg?iboard=${item.iboard}`

                        // container.append(ATAG)
                        DIV.append(FAV)
                        DIV.append(ATAG)

                        feedContainerElem.append(DIV)

                    }
                }

            })
    },

    getFeedPage : function (){
        fetch(`/b/myfeedpage?limit=${feedListObj.limit}&type=${feedListObj.type}&region=${feedListObj.region}`)
            .then(res => res.json())
            .then(myJson => {

                for(var i=1; i<=myJson;i++){
                    const ATAG=document.createElement('a')
                    ATAG.innerText=i
                    ATAG.addEventListener('click',function(e){
                        feedListObj.page=e.target.innerText
                        console.log('페이지'+feedListObj.page)
                        feedListObj.makeFeedList()
                    })
                    pagingContainerElem.append(ATAG)
                }
            })
    },
    chkFav : function (iboard, i) {

        fetch(`/b/chFav?iboard=${iboard}`)
            .then(res => res.json())
            .then(myJson => {
                console.log(myJson)
                switch(myJson){
                    case 0:
                        i.classList=`far fa-heart pointer`;
                        i.dataset.iboard=iboard;
                        i.addEventListener('click',feedListObj.insFav);
                        break;
                    case 1:
                        i.classList='fas fa-heart pointer';
                        i.dataset.iboard=iboard;
                        i.addEventListener('click',feedListObj.delFav);
                        break;
                }
            })
    },
    insFav : function (e){
        iboard=e.target.dataset.iboard
        const i=e.target
        console.log('insFAV')
        fetch('/b/insFav',{
            method:'POST',
            headers:{'Content-Type':'application/json; charset=utf-8'},
            body:JSON.stringify({iboard:iboard})
        }).then(res => res.json())
            .then(myJson => {
                if(myJson == 1){
                    i.classList='fas fa-heart pointer'
                    // i.dataset.favcount=parseInt((iconFavElem.dataset.favcount))+1
                    // i.innerText=iconFavElem.dataset.favcount
                    i.removeEventListener('click',feedListObj.insFav)
                    i.addEventListener('click',feedListObj.delFav)
                }
            })
    },

    delFav : function (e){
        iboard=e.target.dataset.iboard
        const i=e.target;
        console.log('delFAV');

        fetch('/b/delFav',{
            method:'POST',
            headers:{'Content-Type':'application/json; charset=utf-8'},
            body:JSON.stringify({iboard:iboard})
        }).then(res => res.json())
            .then(myJson => {
                if(myJson==1){
                    i.classList='far fa-heart pointer'
                    // i.dataset.favcount=parseInt((iconFavElem.dataset.favcount))-1
                    // i.innerText=iconFavElem.dataset.favcount
                    i.removeEventListener('click',feedListObj.delFav)
                    i.addEventListener('click', feedListObj.insFav)
                }
            });
    }
}



