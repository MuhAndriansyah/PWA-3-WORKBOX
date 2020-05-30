const API_KEY = "16d85bf702974259b17e4dff4faeade4";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const STANDING_PL = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const MATCHES_PL = `${BASE_URL}competitions/${LEAGUE_ID}/matches?status=POSTPONED`;
const TEAMS_PL = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
let teamData;
const fetchAPI = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log(`Error: ${res.status}`);
        return Promise.reject(new Error(res.statusText));
      } else {
        return Promise.resolve(res);
      }
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

function getAllStandings() {
  if ("caches" in window) {
    caches.match(STANDING_PL).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showStanding(data);
        });
      }
    });
  }

  fetchAPI(STANDING_PL)
    .then((data) => {
      showStanding(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showStanding(data) {
  let standings = "";
  let standingElement = document.getElementById("main-content");

  data.standings[0].table.forEach(function (standing) {
    standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(
                      /^http:\/\//i,
                      "https://"
                    )}" class="img-width" alt="${standing.team.name}"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
  });

  standingElement.innerHTML = `
                <div class="card standing">
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                </div>
    `;
}

function getAllTeams() {
  if ("caches" in window) {
    caches.match(TEAMS_PL).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showTeam(data);
        });
      }
    });
  }

  fetchAPI(TEAMS_PL)
    .then((data) => {
      showTeam(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showTeam(data) {
  let teamContent = "";
  let teamElement = document.getElementById("main-content");
  teamData = data;
  teamContent += `<div class="row"  data-aos="zoom-in">`;
  data.teams.forEach((team) => {
    teamContent += `    

    <div class="col s12 m6 l6 mb-club">
      <div class="card">
        <div class="card-content">
          <div class="center"><img width="64" height="64" src="${team.crestUrl.replace(
            /^http:\/\//i,
            "https://"
          )}" alt="${team.name}"></div>
          <div class="center flow-text">${team.name}</div>
          <div class="center">${team.area.name}</div> 
          <div class="center">${team.address}</div> 
          <div class="center"><a href="${team.website}" target="_blank">${
      team.website
    }</a></div>
        </div>
        <div class="card-action right-align">
            <a class="waves-effect waves-light teal btn-small" onclick="insertTeam(${
              team.id
            })"><i class="material-icons left">favorite_border</i>Add To Favorite</a>
        </div>
      </div>
    </div>
     `;
  });
  teamContent += `</div>`;
  teamElement.innerHTML = teamContent;
}

function getAllMatches() {
  if ("caches" in window) {
    caches.match(MATCHES_PL).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(`Matches Data: ${data}`);
          showMatches(data);
        });
      }
    });
  }

  fetchAPI(MATCHES_PL)
    .then((data) => {
      showMatches(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showMatches(data) {
  let matchesContent = "";
  let matchElement = document.getElementById("main-content");
  matchesContent += `<div class="row"  data-aos="zoom-in">`;
  data.matches.forEach((match) => {
    matchesContent += `
    <div class="col s12 m6">
    <div class="card teal">
      <div class="card-content white-text">
        <span class="card-title">${dateToDMY(new Date(match.utcDate))}</span>
        <p>Matchday: ${match.matchday}</p>
        <p>${match.homeTeam.name} VS ${match.awayTeam.name}</p>

      </div>
      <div class="card-action">
      <span class="new badge red" data-badge-caption="${match.status}"></span>

      </div>
    </div>
  </div>`;
  });
  matchesContent += `</div>`;
  matchElement.innerHTML = matchesContent;
}

function getFavTeam() {
  let teams = dbGetAllTeamFav();
  teams.then((data) => {
    teamData = data;
    let favContent = "";
    favContent += '<div class="row">';
    data.forEach((team) => {
      favContent += `
      <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="center"><img width="64" height="64" src="${team.crestUrl.replace(
              /^http:\/\//i,
              "https://"
            )}" alt="${team.name}"></div>
            <div class="center flow-text">${team.name}</div>
            <div class="center">${team.area.name}</div>
            <div class="center"><a href="${team.website}" target="_blank">${
        team.website
      }</a></div>
          </div>
          <div class="card-action right-align">
              <a class="waves-effect waves-light btn-small red" onclick="deleteTeam(${
                team.id
              })"><i class="material-icons left">delete</i>Delete</a>
          </div>
        </div>
      </div>
    `;
    });

    if (data.length == 0)
      favContent += '<h6 class="center-align">No favorite team found!</6>';
    favContent += "</div>";
    document.getElementById("main-content").innerHTML = favContent;
  });
}

const dateToDMY = (date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

const insertTeam = (teamId) => {
  let team = teamData.teams.filter((el) => el.id === teamId)[0];
  dbInsertTeam(team);
};
const deleteTeam = (teamId) => {
  let deleteFavTeam = confirm("Delete this team?");
  if (deleteFavTeam === true) {
    dbDeleteTeam(teamId);
  }
};
