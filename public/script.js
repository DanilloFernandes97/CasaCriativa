function onOffDivNovaIdeia() {

    document.querySelector("#modal")
    .classList
    .toggle("hide");

    document.querySelector("body")
    .classList
    .toggle("hidescroll");

    document.querySelector("#modal")
    .classList
    .toggle("addScroll");

}; 

function checkFields(event) {

    const valuesToCheck = [

        "title",
        "category",
        "image",        
        "description",
        "link",

    ];

    // Find faz um laço dentro da array e vai fazer a função até retornar o que passar ou então acabar retornar undefined.
    const isEmpty = valuesToCheck.find((value) => {

        if((typeof event.target[value].value === "string") && (!event.target[value].value.trim())) {
            return true;
        }

    });

    if (isEmpty) {

        // Para o envio de submissão (Não permite que aconteça o fluxo padrão).
        event.preventDefault();

        window.alert("Por favor, preencha todos os campos");
    }

    /* for(let value of valuesToCheck) {
        
        // target é referência do form, além de poder usar o [] eu posso usar assim por exemplo: event.target.title.
        event.target[value];

    } */

}