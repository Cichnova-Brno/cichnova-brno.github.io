let gallery = null
let small_images = null
let zoom_image = null
let nav_buttons = null
let active_button = null
let image_desc = null

let current_index = 0

// na body se da onload a zavola se tahle funkce. Do path se ulozi cesta k obrazkum
// tahle cesta se preda funkci fill_gallery.
// poznamka (pokud se nacita z aktualniho adresare jako argument se musi nastvit tecka)
async function check(path){

    // nacti galerii a pokud existuje tak ji napln
    gallery = document.getElementById('gallery')
    // fill_gallery je asynchrini funkce takze se pocka az se ukonci
    if(gallery) await fill_galery(path)

    // hledani aktivniho tlacitka
    nav_buttons = document.querySelectorAll('.gallery_nav_button')
    active_button = document.querySelector('.gallery_active_button')
    if(nav_buttons) find_active_button()

    // nacti DOM obrazku v galerii a div ve kterem se zvetsi
    small_images = document.querySelectorAll('.small_image')
    zoom_image = document.getElementById('zoom_image')
    zoom_curtain = document.getElementById('zoom_curtain')
    image_desc = document.getElementById('image_desc')
    if(small_images && zoom_image) find_active_image()
    
}

// naplni galerii
async function fill_galery(path){

    let count = 1
    let exist = true

    gallery.textContent = ''

    while (exist) {
        const image = new Image()
        image.src = `${path}/${count}.jpg`

        exist = await new Promise(resolve => {
            image.onload = () => resolve(true)
            image.onerror = () => resolve(false)
        })

        if (exist) {
            image.classList.add('small_image')
            gallery.appendChild(image)
            count++
        }else{
            if(count === 1){
                let error_message = document.createElement('h3')
                error_message.textContent = 'Je nám líto, ale nepodařilo se načíst obrázky nebo nebyly vytvořeny.'
                gallery.appendChild(error_message)
            }
        }
    }
}

// hleda aktivni obrazek
function find_active_image(){

    let images_array = Array.from(small_images)

    images_array.forEach((event) => {
        event.addEventListener('click', () => {
            zoom_curtain.classList.add('zoom_active')
            let new_image = document.createElement('img')
            new_image.src = event.src
            zoom_image.appendChild(new_image)
            zoom_div.style.display = 'flex'
            image_desc.innerHTML = '';
        })
    })
}

// najdi tlacitko na ktere se kliklo a nastav mu tridu gallery_active_button
// aby se poznalo z jakeho obdobi jsou obrazky v galerii
function find_active_button(){
    let buttons_array = Array.from(nav_buttons)
    buttons_array.forEach((event) => {
        event.addEventListener('click', () => {
            active_button.classList.remove('gallery_active_button')
            event.classList.add('gallery_active_button')
        })
    })
}

function close_popup(){
    zoom_image.innerHTML = ''
    zoom_curtain.classList.remove('zoom_active')
}

// funkce pro vykresleni dalsich obrazku v popupu
function show_image(index) {
    let decs = document.getElementById('image_desc')
    let data = null
    let title = document.querySelector('title').textContent
    if (index < 0) index = small_images.length - 1
    if (index >= small_images.length) index = 0
    current_index = index
    const img_src = small_images[current_index].src
    zoom_image.innerHTML = ''
    const new_img = document.createElement('img')
    new_img.src = img_src
    zoom_image.appendChild(new_img)
    data = fetch(`../podklady/${title}/${title}.json`)
    .then(response => {
        if(!response.ok) console.log(`can not find or open JSON file ${title}`)
        data = response.json()
        decs = data.speaker[index]
    })
}

// zobrazi dalsi obrazek
function next_image() {
    show_image(current_index + 1)
}

// nacti predchozi obrazek
function prev_image() {
    show_image(current_index - 1)
}
