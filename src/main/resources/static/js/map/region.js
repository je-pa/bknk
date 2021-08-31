var mapContainerElem=document.querySelector('#mapContainer')
feedListObj.region=mapContainerElem.dataset.region
feedListObj.url='/map/mapFeedList'
feedListObj.limit=3
feedListObj.getFeedPage()
feedListObj.makeFeedList()

