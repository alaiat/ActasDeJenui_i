 

const mainURL = 'aenui.org/actas'

async function getInitialHTML(){
    let a= await fetch("http://ikasten.io:3000/https://aenui.org/actas/indice_i.html").then(r=> r.text()).then(r=> {
        //Get index.html from aenui.org

        //r = r.replace('<img src="', '<img src="https://aenui.org/actas/')

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
    return a;
}

async function getAllJs(scripts){
    let elem = scripts.shift()
    let name = elem.src
    name = name.split("/")
    name[2] = mainURL
    name = name.join('/')
    await fetch(`http://ikasten.io:3000/${name}`).then(r=>r.text())
    .then(r=> {
        let script = document.createElement('script')
        if(name.split("/")[name.split("/").length-1] == 'ui.js'){
            r = r.replace('var urlFicha = "fichas/" + articulos[indiz][0] + "_" + articulos[indiz][1] + "_" + num + ".html";',
             `var urlFicha = "https://aenui.org/actas/fichas/" + articulos[indiz][0] + "_" + articulos[indiz][1] + "_" + num + ".html";`)
        }else if(name.split("/")[name.split("/").length-1] == 'urlFiles.js'){
            r = r.replaceAll('return "', 'return "https://aenui.org/actas/')
        }
        script.innerHTML=r
        document.head.appendChild(script)
        if(scripts.length > 0){
            getAllJs(scripts)
        }else{
            inicializar()
        }
        
    })
}

let hasieratu = async function (e) {
    let html= await getInitialHTML();
    document.querySelector("img[src='img/logoAenui.png']").src="https://aenui.org/actas/img/logoAenui.png"
    document.getElementById("botonesEdiciones").style = "display: none;"
    let botones = document.getElementById("botonesEdiciones").getElementsByClassName("botonEdicion")
    setTimeout(()=>{
        Array.from(botones).forEach((elem)=>{
            let url = elem.children[0].src.split('/')
            url[2] = "aenui.org"
            url.splice(3, 0, "actas")
            elem.children[0].src = url.join('/')
        })
    }, 1000)
    
    let scripts = document.querySelectorAll("script")
    getAllJs(Array.from(scripts))
    //.then(r => inicializar())
    centerTitle()
    addNav()
    addFiltros()
}

function centerTitle(){
    let buscador = document.getElementById("buscaor")

    let buscadorRow = document.createElement("div")
    buscadorRow.setAttribute("class", "row")

    let imageCol = document.createElement("div")
    imageCol.setAttribute("class", "col-sm-2 col-12")
    document.getElementById("alrodiu").setAttribute("class", "d-flex justify-content-center justify-content-sm-end")
    imageCol.appendChild(document.getElementById("alrodiu"))

    let buscadorCol = document.createElement("div")
    buscadorCol.setAttribute("class", "col-sm-8 col-10 offset-1 offset-sm-0")
    let buscadorTd = buscador.children.item(0).children.item(0).children.item(0).children.item(1)
    Array.from(buscadorTd.children).forEach(elem => {
        if(elem.tagName != "input"){
            elem.setAttribute("class", "text-center")
        }
        buscadorCol.appendChild(elem)
    })

    buscadorRow.appendChild(imageCol)
    buscadorRow.appendChild(buscadorCol)

    buscador.remove()

    document.body.appendChild(buscadorRow)

    document.getElementById("caxaBuscar").setAttribute("class", "form-control")
}

function addNav(){
    let topMargin = document.createElement("style")
    topMargin.innerHTML= "body {padding-top: 60px;}"
    document.head.appendChild(topMargin)
    let navBar = document.createElement("header")
    navBar.setAttribute("class", "navbar navbar-light bg-primary fixed-top navbar-default")

    let edicionesButton = document.createElement("button")
    edicionesButton.setAttribute("class", "btn btn-light")
    edicionesButton.setAttribute("type", "button")
    edicionesButton.innerHTML = "Ediciones"
    edicionesButton.onclick = document.getElementsByClassName("botonEdiciones").item(0).onclick

    let loginButton = document.createElement("button")
    loginButton.setAttribute("class", "btn btn-light")
    loginButton.setAttribute("type", "button")
    loginButton.innerHTML = "Login"
    loginButton.onclick = document.getElementsByClassName("botonEdiciones").item(0).onclick
    loginButton.style.marginLeft = "auto"
    loginButton.style.marginRight = "10px"


    let RegisterButton = document.createElement("button")
    RegisterButton.setAttribute("class", "btn btn-light")
    RegisterButton.setAttribute("type", "button")
    RegisterButton.innerHTML = "Register"
    RegisterButton.onclick = document.getElementsByClassName("botonEdiciones").item(0).onclick

    let containerNav = document.createElement("div")
    containerNav.setAttribute("class", "container")
    containerNav.appendChild(edicionesButton)
    containerNav.appendChild(loginButton)
    containerNav.appendChild(RegisterButton)
    navBar.appendChild(containerNav)
    document.body.appendChild(navBar)
    document.getElementsByClassName("botonEdiciones").item(0).remove()
    
}

function addFiltros() {

    let checkbox1 = document.createElement("input")
    checkbox1.setAttribute("type", "checkbox")
    checkbox1.setAttribute("class", "form-check-input")
    checkbox1.setAttribute("id", "checkbox1")
  
    let label1 = document.createElement("label")
    label1.setAttribute("class", "form-check-label")
    label1.setAttribute("for", "checkbox1")
    label1.innerHTML = "Autoreak"
  
    let checkbox2 = document.createElement("input")
    checkbox2.setAttribute("type", "checkbox")
    checkbox2.setAttribute("class", "form-check-input")
    checkbox2.setAttribute("id", "checkbox2")
  
    let label2 = document.createElement("label")
    label2.setAttribute("class", "form-check-label")
    label2.setAttribute("for", "checkbox2")
    label2.innerHTML = "Hitz Klabeak"
  
    let checkbox3 = document.createElement("input")
    checkbox3.setAttribute("type", "checkbox")
    checkbox3.setAttribute("class", "form-check-input")
    checkbox3.setAttribute("id", "checkbox3")
  
    let label3 = document.createElement("label")
    label3.setAttribute("class", "form-check-label")
    label3.setAttribute("for", "checkbox3")
    label3.innerHTML = "Tituluak"
  
    document.body.appendChild(checkbox1)
    document.body.appendChild(label1)
    document.body.appendChild(checkbox2)
    document.body.appendChild(label2)
    document.body.appendChild(checkbox3)
    document.body.appendChild(label3)
  }
  
  
  

window.onload=hasieratu;