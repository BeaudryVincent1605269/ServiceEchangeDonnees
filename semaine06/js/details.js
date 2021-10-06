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
});

async function getPlanet(href) {
    const response = await axios.get(href);
    if (response.status === 200) {
        const planet = response.data;
        console.log(planet);
        document.title = planet.name;

        $('#imgIcon').attr('src', planet.icon);
        $('lblName').html(planet.name);
        $('#lblDiscoveredBy').html(planet.discoveredBy);
        $('#lblDiscoveredDate').html(planet.discoveryDate);
        $('#lblTemperature').html(planet.temperature);
        $('#lblPosition').html(`(${planet.position.x.toFixed(3)} ; ${planet.position.y.toFixed(3)} ; ${planet.position.z.toFixed(3)} )`);
    }
}