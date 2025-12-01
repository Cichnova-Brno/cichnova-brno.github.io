import fs from 'node:fs'

export class other{

    // read data from json file
    read_json_file(name){
        let data = fs.readFileSync(name, 'utf8')
        return JSON.parse(data)
    }

    // looking for files in certain path
    check_path(path_to_file){
        if(!fs.existsSync(path_to_file)){
            console.log(`Folder or file ${path_to_file} does not exist \n`)
            return false
        }else{
            console.log(`File ${path_to_file} exists\n`)
            return true
        }
    }

    // read names of all directories
    get_names(dir_name){
        let villages_names = fs.readdirSync(dir_name)
        return villages_names
    }


    write_into_html(json_obj){

        let speakers = ''
        if(!(json_obj.speaker.length === 0) && !(json_obj.speaker[0] === '')){
            let temp = ''
            for(let i = 0; i < json_obj.speaker.length; i++){
                temp += `${json_obj.speaker[i]}<br>`
            }
            speakers += `<section>${temp}</section>`
        }else{
            speakers = `<h5>Je nám líto, ale nejsou žádní pamětníci pro tuto vesnici</h5>`
        }

        let max = Math.max(...json_obj.l_residents)
        let step = Math.round(max / 5)


        let html_code = `<!DOCTYPE html>
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
    <title>${json_obj.name}</title>
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
    <h1>${json_obj.name}</h1>
    <h5></h5>
    <a href="">${json_obj.phase}, ${json_obj.district}</a>
    </header>

    <div id="zoom_curtain">
        <div id="zoom_div_container" class="top_padding">
            <div onclick="close_popup()" class="hamburger"><i class="fa fa-times"></i></div>
      
            <div id="zoom" >
                <div class="row">
                    <div class="arrow left" onclick="prev_image()">&#10094;</div>
                    <div id="zoom_image"></div>
                    <div class="arrow right" onclick="next_image()">&#10095;</div>
                </div>
                <div>
                    <p id="image_desc"></p>
                </div>
            </div>
        </div>
    </div>

    <main>
        <section>
            <h2>Charakteristika obce</h2>
            <div>
                <p>${json_obj.paragraph_one}</p>
                <div class="image">
                <img src="../podklady/${json_obj.name}/znak.jpg" alt="the first picture">
                <h5>${json_obj.name}</h5>
                </div>
            </div>    
        </section>

        <section>    
            <h2>Počet obyvatel</h2>
            <canvas id="data">
            </canvas>
            <script>
                print_graph([${json_obj.l_year}], [${json_obj.l_residents}], ${max}, ${step})
            </script>
        </section>
        <h2>Pamětníci</h2>
        ${speakers}
        <section>
            <h2>Průběh vystěhováni</h2>
            <div>
                <div>
                    <p>${json_obj.paragraph_two}</p>
                    <table id="table">
                        <tr><th>Etapa</th><th>Domů</th><th>Rodin</th><th>Osob</th></tr>
                        <tr><td>${json_obj.phase}</td><td>${json_obj.houses}</td><td>${json_obj.families}</td><td>${json_obj.residents}</td></tr>
                    </table>
                </div>
                <div class="image">
                <img src="../podklady/${json_obj.name}/1.jpg" alt="the second picture">
                <h5>${json_obj.titles}</h5>
                </div>
            </div>
        </section>


        <section>    
            <h2>Galerie</h2>

            <div id="gallery_nav_bar">
                <button class="gallery_active_button gallery_nav_button" onclick="check('../podklady/${json_obj.name}/galerie/1-pred-vystehovanim')">před vystěhováním</button>
                <button class="gallery_nav_button" onclick="check('../podklady/${json_obj.name}/galerie/2-stehovani')">stěhování</button>
                <button class="gallery_nav_button" onclick="check('../podklady/${json_obj.name}/galerie/3-po-vystehovani-navratu')">po vystěhování/návratu</button>
                <button class="gallery_nav_button" onclick="check('../podklady/${json_obj.name}/galerie/4-soucasnost')">současnost</button>
                <button class="gallery_nav_button" onclick="check('../podklady/${json_obj.name}/galerie/6-dokumenty')">dokumenty</button>
                <button class="gallery_nav_button" onclick="check('../podklady/${json_obj.name}/galerie/5-pribeh-basne')">lidová slovesnost</button>
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
</html>`

        function slugify(text) {
            return text
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/\s+/g, "_")
                .replace(/[^a-z0-9\.\-]/g, "")
        }

        try{
            fs.writeFileSync(`../vesnice/${slugify(json_obj.name)}.html`, html_code)
        }catch(err){
            console.log(err)
            return null
        }finally{
            console.log(`File /vesnice/${slugify(json_obj.name)}.html was successfully created\n`)
        }
    }
}