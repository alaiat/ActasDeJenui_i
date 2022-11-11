async function getInitialHTML(){
    let a= await fetch("http://ikasten.io:3000/https://aenui.org/actas/indice_i.html").then(r=> r.text()).then(r=> {
        //Get index.html from aenui.org
        document.getElementsByTagName("html")[0].innerHTML=r
        //Get the image from the index.html working
        //Add boostrap to the page
        var link = document.createElement('link');
        link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        link.rel = "stylesheet"
        link.integrity = "sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        link.crossOrigin = "anonymous"
        document.head.appendChild(link);

    })
    console.log(a)
    return a;
}

hasieratu = function (e) {
    let html=getInitialHTML();
    console.log(html);
    document.querySelector("img[src='img/logoAenui.png']").src="https://aenui.org/actas/img/logoAenui.png"













}




window.onload=hasieratu;