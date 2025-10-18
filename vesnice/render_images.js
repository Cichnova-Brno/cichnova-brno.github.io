let gallery = null
let small_images = null
let zoom_image = null
let nav_buttons = null
let active_button = null

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
        }
    }
}

// hleda aktivni obrazek
function find_active_image(){

    let images_array = Array.from(small_images)

    images_array.forEach((event) => {
        event.addEventListener('click', () => {
            zoom_image.classList.add('zoom_active')
            let new_image = document.createElement('img')
            new_image.src = event.src
            zoom_image.appendChild(new_image)
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