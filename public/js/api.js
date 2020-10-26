let base_url = "https://api.football-data.org/v2/competitions/2021/teams";
let base_url_standings = "https://api.football-data.org/v2/competitions/2021/standings";
let base_url_team = "https://api.football-data.org/v2/teams";

// api list team
const loadContent = () => {
    fetch(base_url, {
        method: "GET",
        mode: "cors",
        headers: {
            'X-Auth-Token': 'd6f7eeae5b8f4bcca89e26a9e335c30a'
        }
    }).then(response => {
        return response.json()
    }).then(data => {
        let teams = data.teams

        let templateTeam = teams.map(team => {
            return (
                `<div class="col s12 m6 l4">
                    <div class="card">
                            <div class="card-image">
                                <img src="${team.crestUrl}">
                            </div>
                            <div class="card-content">
                                <h6>${team.name}</h6>
                            </div>
                            <a href="./detailTeam.html?id=${team.id}" class="waves-effect waves-light btn">See Detail</a>
                        </div>
                    </div>`
            )
        })
        document.getElementById("teams-list").innerHTML = templateTeam.join('');

    }).catch(error => {
        console.log(error)
    })
}

// api standing
const loadContentStandings = () => {
    fetch(base_url_standings, {
        method: "GET",
        mode: "cors",
        headers: {
            'X-Auth-Token': 'd6f7eeae5b8f4bcca89e26a9e335c30a'
        }
    }).then(response => {
        return response.json()
    }).then(data => {
        let teamss = data.standings[0].table
        console.log(teamss)

        let templateTeam = teamss.map(teams => {
            return (
                `
                        <tr>
                            <td>${teams.position}</td>
                            <td><img src="${teams.team.crestUrl}" alt=""></td>
                            <td>${teams.team.name}</td>
                            <td>${teams.points}</td>
                        </tr>  
                `
            )
        })
        document.getElementById("standings-list").innerHTML = templateTeam.join('');

    }).catch(error => {
        console.log(error)
    })
}

// mengambil detailTeam
function getTeamId() {
    return new Promise(function (resolve, reject) {

        // Ambil nilai query parameter (?id=)
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        console.log(idParam)

        if ("caches" in window) {
            caches.match(base_url_team + "/" + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        let teamDetail = `
                    <div class="card s12 m6 l6">
                            <div class="card-image">
                                    <img src="${data.crestUrl}">
                            </div>
                            <div class="card-content">
                                <h6>${data.name}</h6>
                                <p>Short Name : ${data.shortName}</p>
                                <p>Founded : ${data.founded}</p>
                                <p>Club Colors : ${data.clubColors}</p>
                                <p>Venue : ${data.venue}</p>
                                <p>Addess : ${data.address}</p>
                                <p>Phone : ${data.phone}</p>
                                <p>Email : ${data.email}</p>
                            </div>
                    </div>
            `;
                        document.getElementById("detail-team").innerHTML = teamDetail;
                        resolve(data)
                    });
                }
            });
        }

        fetch(base_url_team + "/" + idParam, {
            headers: {
                'X-Auth-Token': 'd6f7eeae5b8f4bcca89e26a9e335c30a'
            }
        }).then(response => {
            return response.json()
        }).then(function (data) {
            let teamDetail = `
                <div class="card s12 m6 l6">
                        <div class="card-image">
                                <img src="${data.crestUrl}">
                        </div>
                        <div class="card-content">
                            <h6>${data.name}</h6>
                            <p>Short Name : ${data.shortName}</p>
                            <p>Founded : ${data.founded}</p>
                            <p>Club Colors : ${data.clubColors}</p>
                            <p>Venue : ${data.venue}</p>
                            <p>Addess : ${data.address}</p>
                            <p>Phone : ${data.phone}</p>
                            <p>Email : ${data.email}</p>
                        </div>
                </div>
            `;
            document.getElementById("detail-team").innerHTML = teamDetail;
            resolve(data)

        }).catch(error => {
            console.log(error)
        })
    })
}


// menambahkan favorite team
function getFavoriteTeam() {
    getAll().then(function (team) {
        console.log(team);
        // Menyusun komponen card artikel secara dinamis
        let teamHTML = "";
        team.forEach(function (team) {
            teamHTML += `
            <div class="card s12 m6 l6">
                <div class="card-image">
                        <img src="${team.crestUrl}">
                </div>
                <div class="card-content">
                    <h6>${team.name}</h6>
                    <p>Short Name : ${team.shortName}</p>
                    <p>Founded : ${team.founded}</p>
                    <p>Club Colors : ${team.clubColors}</p>
                    <p>Venue : ${team.venue}</p>
                    <p>Addess : ${team.address}</p>
                    <p>Phone : ${team.phone}</p>
                    <p>Email : ${team.email}</p>

                    <i class="material-icons align-items-center" onclick="deleteFromFavorite(${team.id})">delete</i>
                </div>
            </div>
                    `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("favorite-teams").innerHTML = teamHTML;
    });
}
