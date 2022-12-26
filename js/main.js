

const mainURL = 'aenui.org/actas'

async function getInitialHTML() {
    let a = await fetch("http://ikasten.io:3000/https://aenui.org/actas/indice_i.html").then(r => r.text()).then(r => {
        //Get index.html from aenui.org

        //r = r.replace('<img src="', '<img src="https://aenui.org/actas/')

        document.getElementsByTagName("html")[0].innerHTML = r
        //Get the image from the index.html working
        //Add boostrap to the page
        let link = document.createElement('link');
        link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        link.rel = "stylesheet"
        let link2 = document.createElement("link")
        link2.href = "https://getbootstrap.com/docs/5.2/assets/css/docs.css"
        link2.rel = "stylesheet"
        document.head.appendChild(link);
        document.head.appendChild(link2);
    })
    return a;
}

async function getAllJs(scripts) {
    let elem = scripts.shift()
    let name = elem.src
    name = name.split("/")
    name[2] = mainURL
    name = name.join('/')
    await fetch(`http://ikasten.io:3000/${name}`).then(r => r.text())
        .then(r => {
            let script = document.createElement('script')
            if (name.split("/")[name.split("/").length - 1] == 'ui.js') {
                r = r.replace('var urlFicha = "fichas/" + articulos[indiz][0] + "_" + articulos[indiz][1] + "_" + num + ".html";',
                    `var urlFicha = "https://aenui.org/actas/fichas/" + articulos[indiz][0] + "_" + articulos[indiz][1] + "_" + num + ".html";`)

                r = r.replace("function amosarFicha(indiz) {", "function amosarFicha(indiz) { titleOnclick(indiz);")

                //r = r.replace('document.getElementById("ficha").innerHTML' ,'document.getElementById("ficha").innerHTML')
            } else if (name.split("/")[name.split("/").length - 1] == 'urlFiles.js') {
                r = r.replaceAll('return "', 'return "https://aenui.org/actas/')
            } else if (name.split("/")[name.split("/").length - 1] == 'search.js') {
                r = r.replace('temasBusqueda[i] = convertirPaBusqueda(articulos[i][2] + " " + articulos[i][3]);',
                    'temasBusqueda[i] = {titulo: convertirPaBusqueda(articulos[i][2]), autor: convertirPaBusqueda(articulos[i][3]), palabras: convertirPaBusqueda(articulos[i][5] + " " + articulos[i][6])}')
                console.log(r)

                r = r.replace('\x69\x66\x20\x28\x69\x74\x65\x6D\x2E\x69\x6E\x64\x65\x78\x4F\x66\x28\x73\x74\x72\x29\x20\x21\x3D\x20\x2D\x31\x29\x0A\x09\x09\x09\x09\x6C\x6C\x69\x73\x74\x61\x2E\x70\x75\x73\x68\x28\x69\x29\x3B',
                    'titulo = document.getElementById("checkbox3").checked; autor=document.getElementById("checkbox1").checked; palabras = document.getElementById("checkbox2").checked; if(!titulo && !autor && !palabras){titulo = true; autor = true; palabras = true;} addToList = false; if(titulo && item.titulo.indexOf(str) != -1){addToList = true;} if(autor && item.autor.indexOf(str) != -1){addToList = true;} if(palabras && item.palabras.indexOf(str) != -1){addToList = true;} if(addToList){llista.push(i);}')
            }
            script.innerHTML = r
            document.head.appendChild(script)
            if (scripts.length > 0) {
                getAllJs(scripts)
            } else {
                inicializar()
            }

        })
}

let hasieratu = async function (e) {
    let html = await getInitialHTML();
    document.querySelector("img[src='img/logoAenui.png']").src = "https://aenui.org/actas/img/logoAenui.png"
    document.getElementById("botonesEdiciones").style = "display: none;"
    let botones = document.getElementById("botonesEdiciones").getElementsByClassName("botonEdicion")
    setTimeout(() => {
        Array.from(botones).forEach((elem) => {
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
    changeFichaName()

    //Este tiene que ir último
    addScripts()
}

function centerTitle() {
    let buscador = document.getElementById("buscaor")

    let buscadorRow = document.createElement("div")
    buscadorRow.setAttribute("class", "row")

    let imageCol = document.createElement("div")
    imageCol.setAttribute("class", "col-sm-2 col-12")
    document.getElementById("alrodiu").setAttribute("class", "d-flex justify-content-center justify-content-sm-end")
    imageCol.appendChild(document.getElementById("alrodiu"))

    let buscadorCol = document.createElement("div")
    buscadorCol.setAttribute("class", "col-sm-8 col-10 offset-1 offset-sm-0")
    buscadorCol.setAttribute("id", "buscadorCol")
    let buscadorTd = buscador.children.item(0).children.item(0).children.item(0).children.item(1)
    Array.from(buscadorTd.children).forEach(elem => {
        if (elem.tagName != "input") {
            elem.setAttribute("class", "text-center")
        }
        buscadorCol.appendChild(elem)
    })

    buscadorRow.appendChild(imageCol)
    buscadorRow.appendChild(buscadorCol)

    buscador.remove()

    let buscadorContainer = document.createElement("div")
    buscadorContainer.setAttribute("class", "container-fluid")
    buscadorContainer.appendChild(buscadorRow)
    document.body.appendChild(buscadorContainer)

    document.getElementById("caxaBuscar").setAttribute("class", "form-control")

    //Quitar los resultados y ponerlos otra vez para que estén al final de todo

    let resultaos = document.getElementById("resultaos")
    document.getElementById("resultaos").remove()
    document.body.appendChild(resultaos)
}

function addNav() {
    let style = document.createElement("style")
    style.innerHTML = "body {padding-top: 60px;}.offcanvas-size-sm {--bs-offcanvas-width: 150px !important;} .login-button {margin-bottom: 6px; margin-right: 0px;} @media only screen and (min-width: 576px) {.login-button {margin-bottom: 0px;margin-right: 6px;}}.bolded { font-weight: bold; }"
    document.head.appendChild(style)
    let navBar = document.createElement("header")
    navBar.setAttribute("class", "navbar navbar-light fixed-top navbar-default navbar-expand-sm")
    navBar.setAttribute("style", 'background-color: #008DD5;')

    let edicionesButton = document.createElement("button")
    let edicionesCol = document.createElement("div")
    edicionesButton.setAttribute("class", "btn btn-outline-dark bolded")
    edicionesButton.setAttribute("type", "button")
    edicionesButton.innerHTML = "Ediciones"
    edicionesButton.onclick = document.getElementsByClassName("botonEdiciones").item(0).onclick
    edicionesButton.setAttribute("style", "background-color: #F7B529")
    edicionesCol.setAttribute("class", "col")

    let loginButton = document.createElement("button")
    let loginRegisterCol = document.createElement("div")
    loginButton.setAttribute("class", "btn btn-outline-dark btn-block login-button bolded")
    loginButton.setAttribute("type", "button")
    loginButton.innerHTML = "Login"
    loginButton.onclick = document.getElementsByClassName("botonEdiciones").item(0).onclick
    loginButton.setAttribute("style", "background-color: #F7B529")


    let registerButton = document.createElement("button")
    registerButton.setAttribute("class", "btn btn-outline-dark bolded")
    registerButton.setAttribute("type", "button")
    registerButton.innerHTML = "Register"
    registerButton.onclick = document.getElementsByClassName("botonEdiciones").item(0).onclick
    registerButton.setAttribute("style", "background-color: #F7B529")

    loginRegisterCol.setAttribute("class", "col text-end")
    let menuButton = document.createElement("button")
    menuButton.setAttribute("class", "btn d-sm-none btn-outline-dark")
    menuButton.setAttribute("type", "button")
    menuButton.setAttribute("data-bs-toggle", "offcanvas")
    menuButton.setAttribute("data-bs-target", "#menu")
    menuButton.setAttribute("aria-controls", "menu")
    menuButton.setAttribute("style", "background-color: #F7B529;")
    let icon = document.createElement("span")
    icon.setAttribute("class", "navbar-toggler-icon")
    menuButton.appendChild(icon)
    let bodyCol = document.createElement("div")
    bodyCol.setAttribute("class", "d-grid d-sm-inline text-sm-end text-start")
    bodyCol.appendChild(loginButton)
    bodyCol.appendChild(registerButton)
    let menuBody = document.createElement("div")
    menuBody.setAttribute("class", "offcanvas-body py-0 col justify-content-sm-end")
    menuBody.appendChild(bodyCol)
    let menuHead = document.createElement("div")
    menuHead.setAttribute("class", "offcanvas-header bolded")
    let offLabel = document.createElement("h2")
    offLabel.setAttribute("id", "offLabel")
    offLabel.setAttribute("class", "offcanvas-title")
    offLabel.innerHTML = "Menu"
    let offCloseButton = document.createElement("button")
    offCloseButton.setAttribute("class", "btn-close")
    offCloseButton.setAttribute("type", "button")
    offCloseButton.setAttribute("data-bs-dismiss", "offcanvas")
    offCloseButton.setAttribute("aria-label", "Close")
    menuHead.appendChild(offLabel)
    menuHead.appendChild(offCloseButton)
    let menu = document.createElement("div")
    menu.setAttribute("class", "offcanvas offcanvas-end offcanvas-size-sm")
    menu.setAttribute("id", "menu")
    menu.setAttribute("data-bs-scroll", "true")
    menu.setAttribute("tabindex", "-1")
    menu.setAttribute("aria-labelledby", "offLabel")
    menu.setAttribute("style", "background-color: #008DD5")
    menu.appendChild(menuHead)
    menu.appendChild(menuBody)

    let containerNav = document.createElement("div")
    containerNav.setAttribute("class", "container-fluid")
    edicionesCol.appendChild(edicionesButton)
    containerNav.appendChild(edicionesCol)
    loginRegisterCol.appendChild(menuButton)
    loginRegisterCol.appendChild(menu)
    containerNav.appendChild(loginRegisterCol)
    navBar.appendChild(containerNav)
    document.body.appendChild(navBar)
    document.getElementsByClassName("botonEdiciones").item(0).remove()
}

function addScripts() {

    let bootstrapScript = document.createElement("script")
    bootstrapScript.setAttribute("src", "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js")
    document.head.appendChild(bootstrapScript)
}

//Activa otra vez el amosar resultados para actualizar busqueda cuando cambias los filtros
function reSerch() {
    amosarResultaosPorTestu(document.getElementById("caxaBuscar").value, false)
}

function addFiltros() {

    let checkbox1 = document.createElement("input")
    checkbox1.setAttribute("type", "checkbox")
    checkbox1.setAttribute("class", "form-check-input")
    checkbox1.setAttribute("id", "checkbox1")
    checkbox1.setAttribute("style", "margin-right: 3px")
    checkbox1.onclick = reSerch

    let label1 = document.createElement("label")
    label1.setAttribute("class", "form-check-label")
    label1.setAttribute("for", "checkbox1")
    label1.setAttribute("style", "margin-right: 12px")
    label1.innerHTML = "Autoreak"

    let col1 = document.createElement("div")
    col1.setAttribute("class", "col")
    col1.appendChild(checkbox1)
    col1.appendChild(label1)

    let checkbox2 = document.createElement("input")
    checkbox2.setAttribute("type", "checkbox")
    checkbox2.setAttribute("class", "form-check-input")
    checkbox2.setAttribute("id", "checkbox2")
    checkbox2.setAttribute("style", "margin-right: 3px")
    checkbox2.onclick = reSerch

    let label2 = document.createElement("label")
    label2.setAttribute("class", "form-check-label")
    label2.setAttribute("for", "checkbox2")
    label2.setAttribute("style", "margin-right: 12px")
    label2.innerHTML = "Hitz Klabeak"

    let col2 = document.createElement("div")
    col2.setAttribute("class", "col")
    col2.appendChild(checkbox2)
    col2.appendChild(label2)

    let checkbox3 = document.createElement("input")
    checkbox3.setAttribute("type", "checkbox")
    checkbox3.setAttribute("class", "form-check-input")
    checkbox3.setAttribute("id", "checkbox3")
    checkbox3.setAttribute("style", "margin-right: 3px")
    checkbox3.onclick = reSerch

    let label3 = document.createElement("label")
    label3.setAttribute("class", "form-check-label")
    label3.setAttribute("for", "checkbox3")
    label3.setAttribute("style", "margin-right: 12px")
    label3.innerHTML = "Tituluak"

    let col3 = document.createElement("div")
    col3.setAttribute("class", "col")
    col3.appendChild(checkbox3)
    col3.appendChild(label3)

    let buscadorCol = document.getElementById("buscadorCol")
    let row = document.createElement("div")
    row.setAttribute("class", "row row-cols-sm-auto row-cols-1")
    row.appendChild(col1)
    row.appendChild(col2)
    row.appendChild(col3)
    buscadorCol.appendChild(row)
}

function changeFichaName(){
    document.getElementById("ficha").setAttribute("id", "fich")
}

function titleOnclick(indiz){
    let titulu = document.getElementsByClassName("tituluPonencia")
    Array.from(titulu).forEach(elem =>{
        numberSplit = elem.getAttribute("onclick").split("(")[1].split('')
        numberSplit.pop()
        number = numberSplit.join('')
        if(number == indiz){
            let ficha = document.getElementById("fich").cloneNode(true)
            ficha.setAttribute("id", "ficha")
            elem.appendChild(ficha)
        }
    })
}

window.onload = hasieratu;