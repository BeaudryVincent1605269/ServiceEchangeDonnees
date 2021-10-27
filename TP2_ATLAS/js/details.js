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
    // $('#btnAddPortal').click(() => {
    //     addPortal();
    // });
    // $('#btnExtraction').click(() => {
    //     extractPlanet();
    //});
});



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


        // const response2 = await axios.post(url.monsters, body);
        // const MONSTRES = response2;



        displaySpecimens(monstre.specimens);
    }

    function displaySpecimens(monstres) {
        monstres.forEach(m => {
            let monstreHtml = '<tr>';
            monstreHtml += `<td><img src="./img/affinities/${m.affinity}.png" alt="${m.affinity}" title="${m.affinity}"></td>"`;
            monstreHtml += `<td>${m.health}</td>`;
            monstreHtml += `<td>${m.damage}</td>`;
            monstreHtml += `<td>${m.speed}</td>`;
            monstreHtml += `<td>${m.critical}</td>`;
            monstreHtml += `<td><img src="./img/affinities/${m.talents[0]}.png" alt="${m.talents[0]}" title="${m.talents[0]}">
            <img src="./img/affinities/${m.talents[1]}.png" alt="${m.talents[1]}" title="${m.talents[1]}"></td>`;
            //monstreHtml += '</tr>';
            $('#stats tbody').append(monstreHtml);


            kernelHtml += `<td>
            <img src="./img/elements/${m.kernel[0]}.png" alt="${m.kernel[0]}" title="${m.kernel[0]}" width="30" height="30">
            <img src="./img/elements/${m.kernel[1]}.png" alt="${m.kernel[1]}" title="${m.kernel[1]}" width="30" height="30">
            <img src="./img/elements/${m.kernel[2]}.png" alt="${m.kernel[2]}" title="${m.kernel[2]}" width="30" height="30">
            <img src="./img/elements/${m.kernel[3]}.png" alt="${m.kernel[3]}" title="${m.kernel[3]}" width="30" height="30">
            <img src="./img/elements/${m.kernel[4]}.png" alt="${m.kernel[4]}" title="${m.kernel[4]}" width="30" height="30"></td>`;



            $('#kernel tbody').append(kernelHtml);

            console.log(m.hash);

            // let couleur = m.hash;
            // let tableauC = new Array();


            // let debut = couleur.substr(0, 2);

            // let groupeC = 0;

            // for (let i = 0; i < couleur.length - 2; i + 6) {
            //     tableauC[groupeC] = couleur.substring(i, i + 6);
            //     groupeC++
            // }

            // let fin = couleur.substr(-2);

            // let hashHtml = '<td>';
            // hashHtml += '<div class="colored-hash">';
            // hashHtml += `${debut}`;
            // hashHtml += `<span class="block" style="background-color: #${tableauC[0]}"></span>`;
            // hashHtml += `<span class="block" style="background-color: #${tableauC[1]}"></span>`;
            // hashHtml += `<span class="block" style="background-color: #${tableauC[2]}"></span>`;
            // hashHtml += `<span class="block" style="background-color: #${tableauC[3]}"></span>`;
            // hashHtml += `<span class="block" style="background-color: #${tableauC[4]}"></span>`;
            // hashHtml += `<span class="block" style="background-color: #${tableauC[5]}"></span>`;
            // hashHtml += `<span class="block" style="background-color: #${tableauC[6]}"></span>`;
            // hashHtml += `<span class="block" style="background-color: #${tableauC[7]}"></span>`;
            // hashHtml += `<span class="block" style="background-color: #${tableauC[8]}"></span>`;
            // hashHtml += `<span class="block" style="background-color: #${tableauC[9]}"></span>`;
            // hashHtml += `${fin}`;
            // hashHtml += `</div></td></tr>`;

            // $('#hash tbody').append(hashHtml);



        });
    }
}