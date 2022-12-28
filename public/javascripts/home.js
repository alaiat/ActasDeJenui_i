window.onload = () => {
    let home1 = document.getElementById("home1")
    if(home1){
        home1.onclick = () => {
            window.location = "/session/index"
        }
    }

    let home2 = document.getElementById("home2")
    if(home2){
        home2.onclick = () => {
            window.location = "/"
        }
    }
}