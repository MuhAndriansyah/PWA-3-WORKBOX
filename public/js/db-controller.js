const dbPromised = idb.open("teams_database", 1, (upgradeDb) => {
  if (!upgradeDb.objectStoreNames.contains("teams")) {
    upgradeDb.createObjectStore("teams", {
      keyPath: "id",
    });
  }
});



const dbGetAllTeamFav = () => {
  return dbPromised
    .then(db => {
      let tx = db.transaction("teams", "readonly");
      let store = tx.objectStore("teams");
      // console.log(store)
      return store.getAll();
    });
}

const dbInsertTeam = (team) => {
  dbPromised
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.put(team);
      return tx.complete;
    })
    .then(() => {
      M.toast({
        html: "Berhasil menambahkan team favorite",
      });
    });
};

const dbDeleteTeam = idteam => {
  dbPromised.then(db => {
    let tx = db.transaction('teams', 'readwrite');
    let store = tx.objectStore('teams');
    store.delete(idteam);
    return tx.complete;
  }).then(() => {
    M.toast({
      html: 'Berhasil menghapus team favorite'
    });
    location.reload();
  }).catch(err => {
    M.toast({
      html: `Error: ${err}`
    })
  });
}