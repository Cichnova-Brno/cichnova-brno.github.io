/*==============================
    nacteni elemntu do promenych
 ===============================*/

let regions;
let zoom_svg;
let zoom_div; 
let zoom_curtain; 
let close_btn;
let zoom_names; 

let names_of_villages

wtd = 0;

function menu()
{
    if(wtd===0) {
        document.getElementById("nav").style.display = 'flex';
        document.getElementById("hamb").innerHTML = '<i class="fa fa-times"></i>';
        wtd=1;
    } else {
        document.getElementById("nav").style.display = 'none';
        document.getElementById("hamb").innerHTML = '<i class="fa fa-bars"></i>';
        wtd=0;
    }
}

function goBack() {
    if(history.length > 1) {
        history.back();
    } else {
        window.location.href = '/'; // Replace with your landing page URL
    }
}

/*=======================================
    prevedeni listu s elementy region
    do pole. Prochazeni pole pres forEach
 =========================================*/

document.addEventListener('DOMContentLoaded', () => {
    regions = document.getElementsByClassName('region')   // cast mapy
    zoom_svg = document.getElementById('zoom_svg')    // svg element pro zvetsenou cast mapy
    zoom_div = document.getElementById('zoom_div_container')    // div ve obsahujici zoom_svg
    close_btn = document.getElementById('close')    
    zoom_names = document.getElementById('zoom_names')
    zoom_curtain = document.getElementById('zoom_curtain')


    Array.from(regions).forEach(region => {

        /*=====================
            cekani na kliknuti
        ======================*/

        region.addEventListener('click', (event) => {
            const regionGroup = event.target.closest('g')
            const bbox = regionGroup.getBBox()
            const clone = regionGroup.cloneNode(true)

            document.querySelector(".phase_name").textContent = region.getAttribute("name")
            document.querySelector(".phase_name").style = "background-color: var(--" + region.getAttribute("name").split(" ")[1].toUpperCase() + ");"
            region.style.pointerEvent = 'none'
            
            clone.setAttribute("transform", `translate(${-bbox.x}, ${-bbox.y})`)
            zoom_svg.innerHTML = ''
            zoom_svg.appendChild(clone)

            zoom_curtain.classList.add('zoom_active')
            zoom_svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`)
            zoom_svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
            //zoom_svg.setAttribute("width", 'auto')
            //zoom_svg.setAttribute("height", '100%')

            close_btn.classList.remove('hidden')
            close_btn.style.display = 'block';
            zoom_div.style.display = 'flex'
            document.body.classList.add('zoom_active')


            names_of_villages = document.getElementsByClassName(get_class_name_of_region(region.className.baseVal))
            let divide_names = Array.from(names_of_villages).slice(Math.ceil(names_of_villages.length / 2))

            for(let i = 0; i < divide_names.length; i++){
                for(let k = 0; k < divide_names.length; k++){
                    let prev = divide_names[i].textContent
                    if(prev < divide_names[k].textContent){
                        let temp = divide_names[i].textContent
                        divide_names[i].textContent = divide_names[k].textContent
                        divide_names[k].textContent = temp
                    } 
                }
            }

            let title = document.createElement('h4');
            let hr = document.createElement('hr');
            title.textContent = 'Zde vyberte vesnici';

            zoom_names.appendChild(title);
            zoom_names.appendChild(hr);


            divide_names.forEach(name => {
                let link = document.createElement('a')
                let h3 = document.createElement('h3')
                h3.textContent = name.textContent
                link.href = "/vesnice/" + slugify(`${name.textContent}.html`)
                link.appendChild(h3)
                zoom_names.appendChild(link)
            })
        })
    
        close_btn.addEventListener('click', () => {
            zoom_curtain.classList.remove('zoom_active')
            zoom_div.style.display = 'none'
            document.body.classList.remove('zoom_active')
            zoom_svg.innerHTML = ''
            zoom_svg.classList.add('hidden')
            close_btn.classList.add('hidden')
            region.style.pointerEvents = 'auto'
            zoom_names.innerHTML = ''
        })

    })
})


function get_class_name_of_region(name){

    let arr_name = name.split(" ")
    return arr_name[1] + '_text'

}

function slugify(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9\.\-]/g, "")
}
