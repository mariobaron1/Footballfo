let dbPromised = idb.open("team_favorite", 1, function (upgradeDb) {
    let teamsObjectStore = upgradeDb.createObjectStore("Teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("team_name", "team_name", { unique: false });
});

function saveForLater(team) {
    dbPromised.then(function (db) {
        let tx = db.transaction("Teams", "readwrite");
        let store = tx.objectStore("Teams");
        console.log(team);
        store.add(team);
        return tx.complete;
    })
        .then(function () {
            M.toast({
                html: "Berhasil ditambah ke favorite",
            });
        });
}

// tombol back
function back() {
    window.history.back();
}


function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("Teams", "readonly");
                let store = tx.objectStore("Teams");
                return store.getAll();
            })
            .then(function (team) {
                resolve(team);
            });
    });
}

function deleteFromFavorite(id) {

    dbPromised.then(function (db) {
        let tx = db.transaction("Teams", "readwrite");
        let store = tx.objectStore("Teams");

        store.delete(id);
        return tx.complete;
    })
        .then(function () {
            M.toast({
                html: "Berhasil dihapus",
            });
        });
    location.reload();
}
