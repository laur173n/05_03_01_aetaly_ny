document.addEventListener("DOMContentLoaded", sidenVises);

let alleRetter = [];
let filter = "alle";

function sidenVises() {
    console.log("siden vises");
    // registrer klik på menuknap
    document.querySelector(".menu-button").addEventListener("click", toggleMenu);
}

function toggleMenu() {
    console.log("Toggle menu");
    document.querySelector("#menu").classList.toggle("hide");

    let erSkjult = document.querySelector("#menu").classList.contains("hide")

    if (erSkjult == true) {
        //menuen er skjult - ændr menuknap til lll
        document.querySelector(".menu-button img").src = "pics/burgermenu.png";
    } else {
        //menuen er nu vist - ændr menuknap til X
        document.querySelector(".menu-button img").src = "pics/cancel.png";
    }
}

start();
//BURGERMENU SLUT



//document.addEventListener("DOMContentLoaded", start);

function start() {
    let dest = document.querySelector("#liste");
    async function getJson() {
        let jsonData = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1zMhslY-hxnX8EoD2tUBJ1woH-8A27lzPwahnchvH2tQ");
        alleRetter = await jsonData.json();

        visRetter();

    }

    function visRetter() {
        dest.innerHTML = "";
        alleRetter.forEach(ret => {
            if (filter == "alle" || filter == ret.kategori) {
                let template = `
                    <article class="ret">
                        <img src="retter/${ret.billeder}.jpg">
                        <h2>${ret.navn}</h2>
                        <p>${ret.beskrivelse} <br> Pris: ${ret.pris},-</p>
                    </article>
`;
                dest.insertAdjacentHTML("beforeend", template);
                dest.lastElementChild.addEventListener("click", () => {
                    location.href = "singleview_nyside.html?id=" + ret.id;
                });

            }
        })
    }

    //funktionen visRetter slut
    document.querySelector("#tilbage button").addEventListener("click", () => {
        document.querySelector("#singleview").style.display = "none";


    })
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    });


    function filtrering() {
        filter = this.getAttribute("data-hold");
        document.querySelectorAll(".filter").forEach(elm => {
            elm.classList.remove("valgt");
        })
        this.classList.add("valgt");
        visRetter();
    }

    getJson();
}
