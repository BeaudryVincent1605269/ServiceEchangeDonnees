const INFO_URL = `https://api.andromia.science/monsters/atlas`;
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
    const ADD_LOCATION_URL = `${INFO_URL}/${urlParams.href}/locations`

    const body = {
        position: "1A2C",
        time: "Night",
        season: "Summer",
        rates: "Rare"
    };

    const response = await axios.post(ADD_LOCATION_URL, body);
    if (response.status === 201) {
        const LOCATION = response.data;
        displayOneSpecimens(LOCATION);
    }

}


async function addSpecimen() {
    const ADD_SPECIMEN_URL = `${INFO_URL}/${urlParams.href}/actions?type=generate`

    const body = {};



    const response = await axios.post(ADD_SPECIMEN_URL, body);
    if (response.status === 201) {
        const SPECIMEN = response2.data;
        displayOneSpecimens(SPECIMEN);
    }


}



async function getMonstre(url) {
    const response = await axios.get(url);
    if (response.status === 200) {
        const monstre = response.data;
        console.log(monstre);
        document.title = monstre.name;
        $('#imgIcon').attr('src', monstre.assets); //1 params fait le get si y'en a ça fait le get
        $('#lblMonsterName').html(monstre.name);
        $('#lblAtlasNumber').html(monstre.atlasNumber);
        $('#lblHealth').html(`[${monstre.health.min} - ${monstre.health.max}]`);
        $('#lblDamage').html(`[${monstre.damage.min} - ${monstre.damage.max}]`);
        $('#lblCritical').html(`[${monstre.critical.min * 100} - ${monstre.critical.max * 100}]%`);
        $('#lblSpeed').html(`[${monstre.speed.min} - ${monstre.speed.max}]`);


        displaySpecimens(monstre.specimens);
    }



    function displaySpecimens(monstre) {


        monstre.forEach(m => {
            displayOneSpecimens(m);
        });


    }

    function displayOneSpecimens(m) {


        let monstreHtml = '<tr>';
        monstreHtml += `<td><img src="./img/affinities/${m.affinity}.png" alt="${m.affinity}" title="${m.affinity}"></td>"`;
        monstreHtml += `<td>${m.health}</td>`;
        monstreHtml += `<td>${m.damage}</td>`;
        monstreHtml += `<td>${m.speed}</td>`;
        monstreHtml += `<td>${m.critical}</td>`;
        monstreHtml += `<td><img src="./img/affinities/${m.talents[0]}.png" alt="${m.talents[0]}" title="${m.talents[0]}">
            <img src="./img/affinities/${m.talents[1]}.png" alt="${m.talents[1]}" title="${m.talents[1]}"></td>`;




        monstreHtml += `<td>
            <img src="./img/elements/${m.kernel[0]}.png" alt="${m.kernel[0]}" title="${m.kernel[0]}" width="30" height="30">
            <img src="./img/elements/${m.kernel[1]}.png" alt="${m.kernel[1]}" title="${m.kernel[1]}" width="30" height="30">
            <img src="./img/elements/${m.kernel[2]}.png" alt="${m.kernel[2]}" title="${m.kernel[2]}" width="30" height="30">
            <img src="./img/elements/${m.kernel[3]}.png" alt="${m.kernel[3]}" title="${m.kernel[3]}" width="30" height="30">
            <img src="./img/elements/${m.kernel[4]}.png" alt="${m.kernel[4]}" title="${m.kernel[4]}" width="30" height="30"></td>`;





        console.log(m.hash);

        let couleur = m.hash;

        let tableauC = new Array();

        let debut = couleur.substr(0, 2);

        let fin = couleur.substr(-2);

        let groupeC = 0;

        monstreHtml = '<td>';
        monstreHtml += '<div class="colored-hash">';
        monstreHtml += `${debut}`;
        for (let i = 2; i < couleur.length - 2; i += 6) {
            //console.log(`${i} < ${couleur.length - 2}`);
            tableauC[groupeC] = couleur.substring(i, i + 6);
            console.log(tableauC[groupeC]);
            monstreHtml += `<span class="block" style="background-color:#${tableauC[groupeC]}"> </span>`;
            groupeC++
        }
        monstreHtml += `${fin}`;
        monstreHtml += `</div></td></tr>`;

        // monstreHtml += `<span class="block" style="background-color: #${tableauC[0]}"></span>`;
        // monstreHtml += `<span class="block" style="background-color: #${tableauC[1]}"></span>`;
        // monstreHtml += `<span class="block" style="background-color: #${tableauC[2]}"></span>`;
        // monstreHtml += `<span class="block" style="background-color: #${tableauC[3]}"></span>`;
        // monstreHtml += `<span class="block" style="background-color: #${tableauC[4]}"></span>`;
        // monstreHtml += `<span class="block" style="background-color: #${tableauC[5]}"></span>`;
        // monstreHtml += `<span class="block" style="background-color: #${tableauC[6]}"></span>`;
        // monstreHtml += `<span class="block" style="background-color: #${tableauC[7]}"></span>`;
        // monstreHtml += `<span class="block" style="background-color: #${tableauC[8]}"></span>`;
        // monstreHtml += `<span class="block" style="background-color: #${tableauC[9]}"></span>`;

        $('#stats tbody').append(monstreHtml);




    }
}