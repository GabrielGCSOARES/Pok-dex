const lista = document.getElementById("Lista");
const detalhes = document.getElementById("detalhes");
const API = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0";
const API_imagem = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

async function listarPokemons(){
    //Fazendo a requisição
    let requisicao = await fetch (API);
    //Pegando a resposta da API em formao JSON
    let dados = await requisicao.json();

    lista.innerHTML = '';

    //Percorrendo lista de Pokemons retornado
    dados.results.forEach(function(item, posicao){
        lista.innerHTML +=  `
         <div class="item" onclick="acessarPokemon('${item.url}')">
            <img src="${API_imagem}/${posicao+1}.png" alt="imagem">
            <span class="nome">${item.name}</span>
        </div>
        `;
    })
}


async function acessarPokemon(url){
    lista.style.display = "none";
    
    detalhes.style.display = "block";

    let requisicao = await fetch(url);
    let dados = await requisicao.json();
    // Acessando o elemento pelo seletor dele (o mesmo do css)
    // . para class
    // # para id
    document.querySelector(".numero").innerHTML = `#${dados.id}`;
    document.querySelector(".titulo").innerHTML = `${dados.name}`;

    let tipos = "";
    dados.types.forEach(element =>{
        tipos += element.type.name + "-";
    });
    
    
    document.querySelector(".tipo").innerHTML = tipos;

    if(dados.sprites.other.home.front_default){   
    document.querySelector(".capa img").setAttribute("src", 
    dados.sprites.other.home.front_default);
    }else{
        document.querySelector(".capa img").setAttribute("src", 
        dados.sprites.front_default);
    }
        
    document.querySelector(".altura").innerHTML = dados.height/10;
    document.querySelector(".peso").innerHTML = dados.weight/10;
}


function voltar(){
    lista.style.display = "flex";
    detalhes.style.display = "none";
}

listarPokemons();
//async fica executando em 2 plano