const cep = document.querySelector('#cep')
const uf = document.querySelector("#uf")
const cidade = document.querySelector("#cidade")
const bairro = document.querySelector("#bairro")
const rua = document.querySelector("#rua")
const alerta = document.querySelector(".alerts")
const loader = document.querySelector(".loader")


const buscarCep = (e) => {
    let cepUser = e.target.value

    loader.style.display = "inline-block"

    if (!cepUser){
        loader.style.display = none
        return
    }

    const request = fetch(`https://viacep.com.br/ws/${cepUser}/json/`)

    request
     .then(transferJson) 
     .then((data) => {
        preecherDados(data)
     })
     .catch(erroHandler) 
     .finally(() => {
        setTimeout(() => {
            loader.style.display = "none"
        }, 1000);
     })

} 


const erroHandler = (error = "Algo deu errado !") => {
    alerta.classList.add("show-alert")
    alerta.textContent = `${error.message}`

    setTimeout(() => {
        alerta.classList.remove("show-alert")
    }, 5000);
}


const preecherDados = (dataUser) => {
    cep.value = dataUser.cep
    uf.value = dataUser.uf
    bairro.value = dataUser.bairro
    cidade.value = dataUser.localidade
    rua.value = dataUser.logradouro
    console.log(dataUser);
}


const transferJson = (response) => {
    if(!response.ok){
        throw new Error("Erro de conexão")
    }
    
    return (response = response.json())
        
}