import fs from 'node:fs'
import { json } from 'node:stream/consumers'

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

    check_graph(years, residents){
        if((years.length === 0 || residents.length === 0) || (isNaN(years[0]) || isNaN(residents[0]))) return false
        for(let i = 0; i < residents.length; i++){
            if(isNaN(residents[i]) || residents[i] === 0) {
                years.splice(i, 1)
                residents.splice(i, 1)
            }
        }
        if(years.length === 0 || residents.length === 0) return false
        return {y: years, r: residents}
    }

    write_into_html(json_obj){

        let speakers = ''
        if(!(json_obj.speaker.length === 0) && !(json_obj.speaker[0] === '')){
            let temp = ''
            for(let i = 0; i < json_obj.speaker.length; i++){
                temp += `<a style="background: transparent;" href="/speakers.html#${json_obj.speaker[i].replace(/ /g, '_')}">${json_obj.speaker[i]}</a><br>`
            }
            speakers += `${temp}`
        }else{
            speakers = `<h5>Pamatujete si tuto událost? Kontaktujte nás.</h5>`
        }

        let max = Math.max(...json_obj.l_residents)
        let step = Math.round(max / 5)

        let znak_image = `
                <div class="image">
                
                <img src="../podklady/${json_obj.name}/znak.jpg" alt="">
                <h5>Znak obce ${json_obj.name}</h5>
                </div>
                `
        if(!this.check_path(`../podklady/${json_obj.name}/znak.jpg`)){
            znak_image="";
        }

        let graph, canvas
        let checked_graph = this.check_graph(json_obj.l_year, json_obj.l_residents)
        if(checked_graph === false){
            canvas = ''
            graph = ''
        }
        else{
            canvas = '<h2>Počet obyvatel</h2><canvas id="data"></canvas>'
            graph = `print_graph([${checked_graph.y}], [${checked_graph.r}], ${max}, ${step})`
        }
        

        let html_code = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles/villages.css">
    <link rel="stylesheet" href="/styles/common.css">
    <link rel="stylesheet" href="/styles/map.css">
    <link rel="stylesheet" href="/styles/gallery.css">
    <link rel="stylesheet" href="/styles/table.css">
    <link rel="stylesheet" href="/styles/graph.css">
    <link rel="stylesheet" href="/styles/bootstrap/bootstrap-icons.min.css">
    <script src="/script.js"></script>
    <script tyle="module" src="./render_images.js"></script>
    <script src="./Chart.min.js"></script>
    <script src="./graph.js"></script>
    <script src="/no_internet.js"></script>
    <title>${json_obj.name}</title>
    <style> :root {--eth: var(--${json_obj.phase.toUpperCase()})}</style>
</head>
<body onload="check('../podklady/${json_obj.name}/galerie/1-pred-vystehovanim')">
    <div onclick="goBack()" class="hamburger back"><i class="bi bi-arrow-left"></i></div>
    <div onclick="menu()" class="hamburger" id="hamb"><i class="bi bi-list"></i></div>
    <!--Custom navigation-menu element defined in script.js-->
    <navigation-menu></navigation-menu>

    <header> 
    <h1>${json_obj.name}</h1>
    <h5></h5>
    <a href="">${json_obj.phase}.</a>
    </header>

    <div id="zoom_curtain">
        <div id="zoom_div_container" class="top_padding">
            <div onclick="close_popup()" class="hamburger" style="display:block"><i class="bi bi-x"></i></div>
      
            <div id="zoom" >
                <div class="row">
                    <div class="bi bi-caret-left-fill arrow left" onclick="prev_image()"></div>
                    <div id="zoom_image"></div>
                    <div class="bi bi-caret-right-fill arrow right" onclick="next_image()"></div>
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
                ${znak_image}
            </div>    
        </section>

        <section>
            <h2>Průběh vystěhování</h2>
            <div>
                <div>
                    <p>${json_obj.paragraph_two}</p>
                    <table id="table">
                        <tr><th>Okres</th><th>Etapa</th><th>Domů</th><th>Rodin</th><th>Osob</th></tr>
                        <tr><td>${json_obj.district}</td><td>${json_obj.phase}.</td><td>${json_obj.houses}</td><td>${json_obj.families}</td><td>${json_obj.residents}</td></tr>
                    </table>
                </div>
                <div class="image">
                <img src="../podklady/${json_obj.name}/1.jpg" alt="the second picture">
                <h5>${json_obj.titles}</h5>
                </div>
            </div>
        </section>

        <section>
            <a style="background: transparent;" href="/speakers.html"><h2>Pamětníci</h2></a>
            ${speakers}
        </section>

        <section>    
                ${canvas}
            <script>
                ${graph}
            </script>
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

    <!--Custom custom-footer element defined in script.js-->
    <custom-footer></custom-footer>
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


    speakers_page(json_obj){
        let pek_code = ''

        for(let i = 0; i < json_obj.length; i++){
            let temp_json = json_obj[i]
            let speaker_count = ''

            if(temp_json['speaker'][0] != '' && temp_json['header'] && temp_json['speeche']){

                for(let k = 0; k < 10; k++){
                    let har = "header"+speaker_count
                    let par = "speeche"+speaker_count



                    if(temp_json[har]?.[0]??"" != ''){
                        let id = temp_json[har]?.[0].split(": ")
                        id[1] = id[1].replace(/ /g, '_')
                         if(temp_json.link){
                            if(temp_json.link[k] != '#') pek_code += `<section><h3 id="${id[1]}" style="margin-bottom:2rem;"><a href="${temp_json.link[k]}">${temp_json[har]?.[0]??""}</a></h3>\n`
                            else pek_code += `<section><h3 id="${id[1]}" style="margin-bottom:2rem;">${temp_json[har]?.[0]??""}</h3>\n`
                        }else{
                            pek_code += `<section><h3 id="${id[1]}" style="margin-bottom:2rem;">${temp_json[har]?.[0]??""}</h3>\n`
                        }
                    }

                    for(let j = 1; j <= 50; j++){
                        if(temp_json[har]?.[j]??"" != '') pek_code += `<h5 style="margin-top:2rem; font-size: 25px; color: black;">${temp_json[har]?.[j]??""}</h5>\n`
                        if(temp_json[par]?.[j]??"" != '') pek_code += `<p>${temp_json[par]?.[j]??""}</p>\n`
                    }

                    if(speaker_count === ''){
                        speaker_count = 2
                    }else{
                        speaker_count++
                    }

                    pek_code += `</section>\n`
                }

            }

            speaker_count = ''
        }
            

        let html_code = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/styles/villages.css">
                <link rel="stylesheet" href="/styles/common.css">
                <link rel="stylesheet" href="/styles/map.css">
                <link rel="stylesheet" href="/styles/gallery.css">
                <link rel="stylesheet" href="/styles/table.css">
                <link rel="stylesheet" href="/styles/graph.css">
                <link rel="stylesheet" href="/styles/bootstrap/bootstrap-icons.min.css">
                <script src="/script.js"></script>
                <script src="/no_internet.js"></script>
                <title>Vystěhované Drahansko</title>
                <style> :root {--eth: var(--IA) }</style>
            </head>
            <body>
                <div onclick="goBack()" class="hamburger back"><i class="bi bi-arrow-left"></i></div>
                <div onclick="menu()" class="hamburger" id="hamb"><i class="bi bi-list"></i></div>
                <!--Custom navigation-menu element defined in script.js-->
                <navigation-menu></navigation-menu>

                <header>
                </header>

                <main style="margin-top:5rem">
                    ${pek_code}
                </main>

                <hr>
                <!--Custom custom-footer element defined in script.js-->
                <custom-footer></custom-footer>
            </body>
            </html>`


        try{
            fs.writeFileSync(`../speakers.html`, html_code)
        }catch(err){
            console.log(err)
            return null
        }finally{
            console.log(`File /speakers.html was successfully created\n`)
        }

    }

}