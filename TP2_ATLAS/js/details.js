const INFO_URL = `https://api.andromia.science/monsters/atlas`;
const GENERATE_URL = `https://api.andromia.science/monsters`;
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
    console.log(urlParams.href);
    const LIEN_MONSTRE = `${INFO_URL}/${urlParams.href}`;
    getMonstre(LIEN_MONSTRE);
    $('#btnGenerate').click(() => {
        addSpecimen();
    });
    $('#btnLocation').click(() => {
        addLocation();
    });

});

async function addLocation() {
    const LOCATION_URL = `${INFO_URL}/${urlParams.href}`;
    const response = await axios.get(LOCATION_URL);

    if (response.status === 200) {
        const specimens = response.data;



        console.log(specimens.locations);
        $('#location tbody').empty();
        specimens.locations.forEach(s => {
            let locationHTML = '<tr>';
            locationHTML += `<td>${s.position}</td>`;
            locationHTML += `<td>${s.time}</td>`;
            locationHTML += `<td><img width="40px" height="40px" src="./img/seasons/${s.season}.png"></td>`;
            locationHTML += `<td><img width="40px" height="40px" src="./img/rarities/${s.rates}.png"></td>`;
            locationHTML += '</tr>';
            $('#location tbody').append(locationHTML);
        });

    }
}


async function addSpecimen() {
    const ADD_SPECIMEN_URL = `${GENERATE_URL}/${urlParams.href}/actions?type=generate`

    const body = {};



    const response = await axios.post(ADD_SPECIMEN_URL, body);



    if (response.status === 201) {
        const SPECIMEN = response.data;
        console.log(SPECIMEN);
        displayOneSpecimens(SPECIMEN);
    } else {
        console.log(response);
    }
}



async function getMonstre(url) {
    const response = await axios.get(url);
    if (response.status === 200) {
        const monstre = response.data;
        //console.log(monstre);
        document.title = monstre.name;
        $('#imgIcon').attr('src', monstre.assets);
        $('#lblMonsterName').html(monstre.name);
        $('#lblAtlasNumber').html(monstre.atlasNumber);
        $('#lblHealth').html(`[${monstre.health.min} - ${monstre.health.max}]`);
        $('#lblDamage').html(`[${monstre.damage.min} - ${monstre.damage.max}]`);
        $('#lblCritical').html(`[${Math.round(monstre.critical.min * 100)} - ${Math.round(monstre.critical.max * 100)}]%`);
        $('#lblSpeed').html(`[${monstre.speed.min} - ${monstre.speed.max}]`);


        displaySpecimens(monstre.specimens);
    }



    function displaySpecimens(specimens) {


        specimens.forEach(s => {
            displayOneSpecimens(s);
        });


    }

    function displayOneSpecimens(s) {


        let monstreHtml = '<tr>';
        monstreHtml += `<td><img src="./img/affinities/${s.affinity}.png" alt="${s.affinity}" title="${s.affinity}"></td>"`;
        monstreHtml += `<td>${s.health}</td>`;
        monstreHtml += `<td>${s.damage}</td>`;
        monstreHtml += `<td>${s.speed}</td>`;
        monstreHtml += `<td>${Math.round(s.critical * 100)}%</td>`;
        monstreHtml += `<td><img src="./img/affinities/${s.talents[0]}.png" alt="${s.talents[0]}" title="${s.talents[0]}">
            <img src="./img/affinities/${s.talents[1]}.png" alt="${s.talents[1]}" title="${s.talents[1]}"></td>`;


        monstreHtml += `<td>
            <img src="./img/elements/${s.kernel[0]}.png" alt="${s.kernel[0]}" title="${s.kernel[0]}" width="30" height="30">
            <img src="./img/elements/${s.kernel[1]}.png" alt="${s.kernel[1]}" title="${s.kernel[1]}" width="30" height="30">
            <img src="./img/elements/${s.kernel[2]}.png" alt="${s.kernel[2]}" title="${s.kernel[2]}" width="30" height="30">
            <img src="./img/elements/${s.kernel[3]}.png" alt="${s.kernel[3]}" title="${s.kernel[3]}" width="30" height="30">
            <img src="./img/elements/${s.kernel[4]}.png" alt="${s.kernel[4]}" title="${s.kernel[4]}" width="30" height="30"></td>`;


        //console.log(s.hash);

        let couleur = s.hash;

        let tableauC = new Array();

        let debut = couleur.substr(0, 2);

        let fin = couleur.substr(-2);

        let groupeC = 0;

        monstreHtml += '<td>';
        monstreHtml += '<div class="colored-hash">';
        monstreHtml += `${debut}`;
        for (let i = 2; i < couleur.length - 2; i = i + 6) {
            //console.log(`${i} < ${couleur.length - 2}`);
            tableauC[groupeC] = couleur.substring(i, i + 6);
            //console.log(tableauC[groupeC]);
            monstreHtml += `<span class="block" style="color:#${tableauC[groupeC]}; background-color:#${tableauC[groupeC]};">${tableauC[groupeC]}</span>`;
            groupeC++
        }
        monstreHtml += `${fin}`;
        monstreHtml += `</div></td></tr>`;



        $('#stats tbody').append(monstreHtml);




    }
}