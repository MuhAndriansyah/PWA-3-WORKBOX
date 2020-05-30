document.addEventListener("DOMContentLoaded", function () {
    loadNav();

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".mobile__list").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".topnav a,.mobile__list a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    // Load pages content
    let page = window.location.hash.substr(1);
    if (page === "") page = "standings";
    loadPage(page);

    function loadPage(page) {
        if (page === 'standings') getAllStandings()
        if (page === 'teams') getAllTeams()
        if (page === 'matches') getAllMatches()
        if (page === 'favorites') getFavTeam()
        // if(page === 'fav-team') loadFavTeams()
    }

});