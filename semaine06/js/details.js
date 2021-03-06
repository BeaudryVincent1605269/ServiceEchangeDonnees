const ELEMENT_IMG_URL = 'https://assets.andromia.science/elements'
const urlParams = {};
(window.onpopstate = function () {
    let match;
    const pl = /\+/g; // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
    };
    const query = window.location.search.substring(1);
    while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();
$(document).ready(() => {
    getPlanet(urlParams.href);
    $('#btnAddPortal').click(() => {
        addPortal();
    });
    $('#btnExtraction').click(() => {
        extractPlanet();
    });
});
async function extractPlanet() {
    //GET
    const MINING_URL = `${urlParams.href}/actions?type=mine`;
    const response = await axios.get(MINING_URL);
    if (response.status === 200) {
        const elements = response.data;
        console.log(elements);
        $('#extraction tbody').empty();
        elements.forEach(e => {
            let extractHTML = '<tr>';
            //extractHTML += `<td><img width="50px" height="50px" src="${ELEMENT_IMG_URL}/${e.element}.png"></td>"`;
            extractHTML += `<td><img width="50px" height="50px" src="${ELEMENT_IMG_URL}/${e.element}.png">${e.element}</td>`;
            extractHTML += `<td>${e.quantity}</td>`;
            extractHTML += '</tr>';
            $('#extraction tbody').append(extractHTML);
        });
    } else {
        console.log(response);
    }
}
async function addPortal() {
    const position = $('#txtPosition').val();
    const affinity = $('#cboAffinity').val();
    const isPositionValid = document.getElementById('txtPosition').checkValidity();
    if (isPositionValid) {
        const ADD_PORTAL_URL = `${urlParams.href}/portals`;
        const body = {
            position: position,
            affinity: affinity
        };
        const response = await axios.post(ADD_PORTAL_URL, body);
        if (response.status === 201) {
            const portals = [response.data];
            displayPortals(portals);
        } else {
            console.log(response);
        }
    } else {
        console.log('Portal dans un formatl invalide');
    }
}
async function getPlanet(href) {
    const response = await axios.get(href);
    if (response.status === 200) {
        const planet = response.data;
        console.log(planet);
        document.title = planet.name;
        $('#imgIcon').attr('src', planet.icon); //1 params fait le get si y'en a ??a fait le get
        $('#lblName').html(planet.name);
        $('#lblDiscoveredBy').html(planet.discoveredBy);
        $('#lblDiscoveryDate').html(planet.discoveryDate);
        $('#lblTemperature').html(planet.temperature);
        $('#lblPosition').html(`(${planet.position.x.toFixed(3)} ; ${planet.position.y.toFixed(3)} ; ${planet.position.z.toFixed(3)})`);
        //Satellites
        if (planet.satellites.length === 0) {
            $('#satellites').append(`<li>Aucun satellite</li>`);
        } else {
            planet.satellites.forEach(s => {
                $('#satellites').append(`<li>${s}</li>`);
            });
        }
        displayPortals(planet.portals);
    }
}
function displayPortals(portals) {
    portals.forEach(p => {
        let portalHtml = '<tr>';
        portalHtml += `<td>${p.position}</td>`;
        portalHtml += `<td><img src="./img/${p.affinity}.png" alt="${p.affinity}" title="${p.affinity}"></td>"`;
        portalHtml += '</tr>';
        $('#portals tbody').append(portalHtml);
    });
}