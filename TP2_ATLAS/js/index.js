const SERVICE_URL = 'https://api.andromia.science/monsters/atlas';
$(document).ready(() => {
    getMonstres();
});
async function getMonstres() {
    try {
        const response = await axios.get(SERVICE_URL);
        if (response.status === 200) {
            const monstres = response.data;

            monstres.forEach(m => {
                $('#monstres').append(displayMonstre(m));
            });
        } else {
            console.log('erreur');
        }
    } catch (err) {
        console.log(err);
    }
}
function displayMonstre(monstre) {
    // let monstreHtml = '<div class="card col-2 mx-2 my-2">';
    // monstreHtml += `<a href="./details.html?href=${monstre.href}"> <img class="card-img-top" src="${monstre.assets}" alt="Image planeto"/></a>`;
    // monstreHtml += `<a href="./details.html?href=${monstre.href}"><h5 class="card-title">${monstre.name}</h5></a>`;
    // monstreHtml += '</div>';


    let monstreHtml = '';

    monstreHtml = `<tr> <td width="200" style="font-weight: bold">${monstre.atlasNumber} <img src="${monstre.assets}" alt="Image monstre" width="120" height="120"/></td>
     <td width="200"><a href="./details.html?href=${monstre.atlasNumber}">${monstre.name}</a></td>
     <td width="200">[${monstre.health.min} - ${monstre.health.max}]</td>
     <td width="200">[${monstre.damage.min} - ${monstre.damage.max}]</td>
     <td width="200">[${monstre.speed.min} - ${monstre.speed.max}]</td>
     <td width="200">[${Math.round(monstre.critical.min * 100)} - ${Math.round(monstre.critical.max * 100)}]%</td>
     </tr>`


    return monstreHtml;
}