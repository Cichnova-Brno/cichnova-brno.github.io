import mammoth from 'mammoth'
import fs from 'node:fs'
import exit from 'node:process'

////////////////////////////
////// global variables ///
//////////////////////////

let text = null
let messages = null
let names = new Array()
let temp_text = new Array()

////////// path where all files are stored ///////

const path = '../podklady'

/////////// check if filder podklady exists ///////
// if not print error message and exit program
if(!fs.existsSync(path)){
    console.log('Folder podklady does not exist\n')
    exit()
}
// else read all directories
else names = fs.readdirSync(path)


//////////////////////////////////////////////////////////////////
/////// open directories one by one and look for docx files /////
////////////////////////////////////////////////////////////////

for(let i = 0; i < names.length; i++){
    if(!fs.existsSync(`${path}/${names[i]}/${names[i]}.docx`)){
        console.log(`File or folder ${names[i]} does not exist\n`)
        exit()
    }
    // if file exists call read_docx function
    else read_docx(`${path}/${names[i]}/${names[i]}.docx`, names[i])
}

///////////////////////////////////////////////////////////////////////
//// read_docx function read data from file and fulfill html code ////
/////////////////////////////////////////////////////////////////////

async function read_docx(path_to_docx, name){
    await mammoth.extractRawText({path: path_to_docx})
    .then(function(result){
        // read text from docx
        text = result.value
        messages = result.messages

        temp_text = text.split('\n')

        // remove empty strings from array
        for(let i = 0; i < temp_text.length; i++){
            if(temp_text[i] === '') temp_text.splice(i, 1)
        }

        // convert name of village to lower case 
        let clear_text = slugify(name)
       if(!fs.existsSync(`../vesnice/${clear_text}.html`)) fs.writeFileSync(`../vesnice/${clear_text}.html`, `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles/villages.css">
    <link rel="stylesheet" href="/styles/common.css">
    <link rel="stylesheet" href="/styles/gallery.css">
    <link rel="stylesheet" href="/styles/map.css">
    <link rel="stylesheet" href="/styles/table.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/styles/graph.css">
    <script src="/script.js"></script>
    <script src="./render_images.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
    <script src="./Chart.min.js"></script>
    <script src="./graph.js"></script>
    <title>${name}</title>
    <style> :root {--eth: var(--IA) }</style>
</head>
<body onload="check('/pub/vesnice/rychtarov/1-před-vystěhováním')">
    <div onclick="goBack()" class="hamburger back"><i class="fa fa-arrow-left"></i></div>
    <div onclick="menu()" class="hamburger" id="hamb"><i class="fa fa-bars"></i></div>
    <nav id="nav">
        <a href="">O projektu</a>
        <a href="">Pro školy</a>
        <a href="">Akce</a>
        <a href="">Film</a>
    </nav> 

    <header>    
    <h1>${name}</h1>
    <h5></h5>
    <a href="">${temp_text[10]}</a>
    </header>

    <div id="zoom_curtain">
        <div id="zoom_div_container" class="top_padding">
            <div onclick="close_popup()" class="hamburger"><i class="fa fa-times"></i></div>
      
            <div id="zoom" >
                <div class="arrow left" onclick="prev_image()">&#10094;</div>
                <div id="zoom_image"></div>
                <div class="arrow right" onclick="next_image()">&#10095;</div>
            </div>
        </div>
    </div>

    <main>
        <section>
            <h2>Charakteristika obce</h2>
            <div>
                <p>${temp_text[0]}</p>
                <div class="image">
                <img src="../podklady/${name}/znak.jpg" alt="the first picture">
                <h5>Obec ${name} v současnosti.</h5>
                </div>
            </div>    
        </section>

        <section>    
            <h2>Počet obyvatel</h2>
            <canvas id="data">
            </canvas>
            <script>
                print_graph(["1869", "1900", "1921", "1930", "1950", "1961", "1991", "2021"], [672, 723, 691, 757, 457, 582, 561, 538], 800, 200)
            </script>
        </section>

        <section>
            <h2>Průběh vystěhováni</h2>
            <div>
                <div>
                    <p>${temp_text[1]}</p>
                    <table id="table">
                        <tr><th>Etapa</th><th>Domů</th><th>Rodin</th><th>Osob</th></tr>
                        <tr><td>${temp_text[10]}</td><td></td><td></td><td></td></tr>
                    </table>
                </div>
                <div class="image">
                <img src="../podklady/${name}/1.jpg" alt="the second picture">
                </div>
            </div>
        </section>


        <section>    
            <h2>Galerie</h2>

            <div id="gallery_nav_bar">
                <button class="gallery_active_button gallery_nav_button" onclick="check('../podklady/${name}/galerie/1-pred-vystehovanim')">před vystěhováním</button>
                <button class="gallery_nav_button" onclick="check('../podklady/${name}/galerie/2-stehovani')">stěhování</button>
                <button class="gallery_nav_button" onclick="check('../podklady/${name}/galerie/3-po-vystehovani-navratu')">po vystěhování/návratu</button>
                <button class="gallery_nav_button" onclick="check('../podklady/${name}/galerie/4-soucasnost')">současnost</button>
                <button class="gallery_nav_button" onclick="check('../podklady/${name}/galerie/6-dokumenty')">dokumenty</button>
                <button class="gallery_nav_button" onclick="check('../podklady/${name}/galerie/5-pribeh-basne')">lidová slovesnost</button>
            </div>
            <div id="gallery">

            </div>
        </section>
    </main>

    <footer>
        <hr>
        <div class="sponsors">
            <a href="https://www.mzm.cz"><img src="/pub/mzm.jpg" alt="moravske zemske muzeum"></a>
            <a href="https://muzeum-vyskovska.cz"><img src="/pub/vys.png" alt="muzeum vyskova"></a>
            <a href="https://barvinek.net"><img src="/pub/barv.png" alt="barvinek"></a>
            <a href="https://jmk.cz"><img src="/pub/jmk.jpg" alt="jihomoravsky kraj"></a>
            <a href="https://cichnovabrno.cz"><img src="/pub/cich.png" alt="cichnova brno"></a>
        </div>
        <img src="/pub/backdrop.png" alt="tyden ve filmu" class="wof-bg">
        <div class="copy">
            <p>&copy; 2025 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, suscipit!
            </p>
        </div>
    </footer>
</body>
</html>
`, (err) => {
        // print error messsage and exit program when something is wrong
        if(err) console.log(err)
            exit()
        })
        else console.log(`File ${name} already exists \n`)
    })
    .catch(function(error) {
        console.error(error)
    })
}

function slugify(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9\.\-]/g, "")
}