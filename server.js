const express = require("express");
const server = express();

const db = require("./db");

// Configura arquivos estáticos (css, scripts, imagens), assim ele vai olhar como uma pasta do diretório root.
server.use(express.static("public"));

// Habilita a visibildade dos campos passados como parâmetros em uma requisição (require.body).
server.use(express.urlencoded({ extended: true }));

// Configuração do pacote (nunjucks) que deixa o arquivo html dinâmico (permite usar variáveis, etc)
const nunjucks = require("nunjucks");

// 1º parâmetro, aonde será guardado os arquivos html, 2º Objeto de configuração, nele eu linko o express com a referência
// do objeto express.
nunjucks.configure("views", {
    express: server,
    noCache: true,
});

//

server.get("/", (require, response) => {

    db.all(`SELECT id, image, title, category, description, link FROM ideas`, function (err, rows) {

        if (!err) {

            // Usa essa constante pra não ficar dando reverse na array de ideias que já deu o reverse em outras requisições.
            // Se eu fizer reversedIdeas = ideasUser, reversedIdeas virá um ponteiro da array, é necessário especificar que quero
            // criar uma array com os valores de ideasUser.
            const reversedIdeas = [...rows].reverse();

            let lastIdeas = [];

            // reverse() -> Deixa os objetoss dentro da array "de trás pra frente", mostrando assim as ultimas ideias.
            for (ideaUser of reversedIdeas) {

                if (lastIdeas.length < 2) {

                    lastIdeas.push(ideaUser); // push add um novo item no fim da array e retorna o novo tamanho.

                }

            }

            return response.render("index.html", { ideas: lastIdeas });

        } else {

            console.log(err);

            return response.send("Erro no banco de dados, motivo: " + err);

        }

    })


});

server.post("/", (require, response) => {

    const query = `
      INSERT INTO ideas(
          image,
          title,
          category,
          description,
          link
      ) VALUES (?, ?, ?, ?, ?);`;

    const values = [

        require.body.image,
        require.body.title,
        require.body.category,        
        require.body.description,
        require.body.link

    ];

    db.run(query, values, function (err) {

        if (!err) {

            return response.redirect("/ideias");            

        } else {

            console.log(this);

            response.send("Erro no banco de dados, motivo: " + err);

        }

    });

});

server.get("/ideias", (require, response) => {



    db.all(`SELECT id, image, title, category, description, link FROM ideas`, function (err, rows) {

        if (!err) {

            return response.render("ideas.html", { ideas: [...rows].reverse() });

        } else {

            console.log(err);

            return response.send("Erro no banco de dados, motivo: " + err);

        }

    });

});

server.listen(3000);