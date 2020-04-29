const sqlite3 = require('sqlite3').verbose(); // O verbose é pra ajudar a ver algumas mensagens no terminal.
const db = new sqlite3.Database('./ws.db');

function createTables() {

    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `);

}

// serialize permite rodar várias funções após a outra.
db.serialize(() => {

    createTables();

    /*  const query = `
      INSERT INTO ideas(
          image,
          title,
          category,
          description,
          link
      ) VALUES (?, ?, ?, ?, ?);`;
  
      const values = [
  
          "https://image.flaticon.com/icons/svg/2729/2729007.svg",
          "Cursos de Programação",
          "Estudo",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque et, odit hic explicabo",
          "https://rocketseat.com.br"        
  
      ]; 
  
      db.run( query, values, function(err) { 
  
          if (err) return console.log(err);
  
          console.log(this);
  
      } ); */

    /* db.run(`DELETE FROM ideas WHERE id = 2`, function(err) {

        if (err) return console.log(err);

        console.log("DELETE CARAIO", this);

    } ); */

    /* db.all(`SELECT * FROM ideas`, function(err, rows) {
  
          if (err) return console.log(err);
  
          console.log(rows);
  
      } ); */

});

module.exports = db;