'use strict'
const BASE_URL = `https://developer.nps.gov/api/v1/parks?api_key=fFR6Y6WBqefDKcRql6KWVpOUy9uzfOEmN5JRxsxc`

function getParksData(stateCode, limit) {
    let searchURL = BASE_URL
    console.log(stateCode);
    if (stateCode) {
        searchURL += '&stateCode=' + stateCode
    }
    if (isNaN(limit)) {
        limit = 9;
    }
    if (limit) {
        searchURL += '&limit=' + limit
    }
    fetch(searchURL)
        .then(response => response.json())
        .then(obj => {
            return displayResults(obj)
        })
        .catch(e => {
            alert(`Error: ${e.toString()}`)
})
}
function displayResults(objArr) {
    console.log(`Response object is`, objArr)
    const $results = $('#results')
    $results.empty();
    $results.removeClass('hidden')
if(objArr.total===0){
    alert("Not Found, please update your search")
}
    for (let i = 0; i < objArr.data.length; i++) {

        const fullName = `<ul> Full Name: <li>${objArr.data[i].fullName}</li></ul>`
        $results.append(fullName)
        const description = `<ul> Description: <li>${objArr.data[i].description}</li></ul>`
        $results.append(description)
        const website = `<ul> Website: <li><a href="${objArr.data[i].url}">${objArr.data[i].fullName}</a></li></ul>`
        $results.append(website)
        /*let geocoder = new google.maps.Geocoder
        let strFind=/(-?\d+.\d+)/;
        let latLong=objArr.data[i].latLong
        let latLongArr=latLong.match(strFind);
        console.log(latLongArr);
        const latlong=objArr.data.latLong.replace()*/
    }
}
function setupSubmit() {
    $('#api-search').on('submit', e => {
        e.preventDefault()
        console.log(`The submit button was clicked`);
        const stateCode = $('[name="stateCode"]').val()
        console.log(`State Code is `, stateCode)
        const stateCodeNoSpace = stateCode.replace(/\s+/g, '');
        console.log(`State coding going in the URL is `, stateCodeNoSpace)
        const limit = $('[name="limit"]').val();
        const limitNumber = parseInt(limit) - 1;
        console.log(`The limit is`, limitNumber)
        console.log(`Limit is a`, typeof (limitNumber))
        $('#js-stateCode').val('')
        $('#js-limit').val('')
        getParksData(stateCodeNoSpace, limitNumber)

    })
}
setupSubmit();

