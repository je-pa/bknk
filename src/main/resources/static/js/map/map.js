var markers = []
var location_map={
    1:[37.553132, 127.126838],
    2:[35.250222, 129.128369],
    3:[35.821438, 128.564264],
    4:[37.454054, 126.644563],
    5:[35.172874, 126.849318],
    6:[36.339538, 127.389326],
    7:[35.529799, 129.294610],
    8:[36.507783, 127.280078],
    9:[37.621737, 127.178289],
    10:[37.631029, 128.498181],
    11:[36.910725, 127.760086],
    12:[36.910725, 127.760086],
    13:[35.717372, 127.126331],
    14:[34.917385, 126.895309],
    15:[36.470681, 128.819077],
    16:[35.540609, 128.564807],
    17:[33.384002, 126.562287]
}

//----------지도----------------------------------------------------------------------
var locationValueasd=document.querySelector('#mapContainer').dataset.region
console.log('asd : '+location_map[locationValueasd][0])
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(location_map[locationValueasd][0],location_map[locationValueasd][1] ), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다


// 마커를 생성하고 지도위에 표시하는 함수입니다
function addMarker(position, place) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: position
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    markerAddEventOver(marker, place)
    marker.setMap(map);
    // 생성된 마커를 배열에 추가합니다
    // markers.push(marker);
}

// // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
// function setMarkers(map) {
//     for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(map);
//     }
// }

// // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
// function showMarkers() {
//     setMarkers(map)
// }
//
// // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
// function hideMarkers() {
//     setMarkers(null);
// }
// function markerAddEventOut(){
//     kakao.maps.event.addListener(marker, 'mouseout', function() {
//         var infowindow = new kakao.maps.InfoWindow({
//             content : iwContent
//         });
//         infowindow.open(map,marker)
//     });
// }
function markerAddEventOver(marker, place){

    var iwContent = `<div style="padding:5px;">${place}</div>`;
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent
    });
    kakao.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.open(map,marker)
    });
    kakao.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close()
    });
}

//----------------------------------------------------------------

function addPin(location_Y, location_X, place){
    var latlng = new kakao.maps.LatLng(location_Y, location_X);
    addMarker(latlng, place)

    // fetch('map3/'+selRegionElem.value)
    //     .then(res => res.json())
    //     .then(myJson =>{
    //         myJson.forEach(function(currentValue){
    //             var latlng = new kakao.maps.LatLng(currentValue.location_Y, currentValue.location_X);
    //             addMarker(latlng)
    //         })
    //     })
}

function removePin(markers){
    markers.forEach(function(currentValue){
        currentValue.setMap(null)
    })
    this.markers=[]
}