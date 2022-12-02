 

const mainURL = 'aenui.org/actas'

async function getInitialHTML(){
    let a= await fetch("http://ikasten.io:3000/https://aenui.org/actas/indice_i.html").then(r=> r.text()).then(r=> {
        //Get index.html from aenui.org
        document.getElementsByTagName("html")[0].innerHTML=r
        //Get the image from the index.html working
        //Add boostrap to the page
        let link = document.createElement('link');
        link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        link.rel = "stylesheet"
        link.integrity = "sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        link.crossOrigin = "anonymous"
        document.head.appendChild(link);

    })
    console.log(a)
    return a;
}

async function getJs(name){
    name = name.split('/')
    name[2] = mainURL
    name = name.join('/')
    fetch(`http://ikasten.io:3000/${name}`).then(r=>r.text())
    .then(r=> {
        let script = document.createElement('script')
        script.innerHTML=r
        document.head.appendChild(script)
    })
}

let hasieratu = async function (e) {
    let html= await getInitialHTML();
    console.log(html);
    document.querySelector("img[src='img/logoAenui.png']").src="https://aenui.org/actas/img/logoAenui.png"
    document.querySelectorAll("script").forEach(elem => getJs(elem.src))
    iniciarTemasBusqueda()
}




window.onload=hasieratu;