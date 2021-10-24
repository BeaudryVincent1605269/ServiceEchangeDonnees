const INFO_URL = `https://api.andromia.science/monsters/atlas/${urlParams.href}`;
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
    getMonstre(INFO_URL);
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
        $('#lblCritical').html(`[${monstre.critical.min} - ${monstre.critical.max}]%`);
        $('#lblSpeed').html(`[${monstre.speed.min} - ${monstre.speed.max}]`);
    }

}