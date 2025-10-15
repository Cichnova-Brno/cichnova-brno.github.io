let gallery = null
let small_images = null
let zoom_image = null

// na body se da onload a zavola se tahle funkce. Do path se ulozi cesta k obrazkum
// tahle cesta se preda funkci fill_gallery.
// poznamka (pokud se nacita z aktualniho adresare jako argument se musi nastvit tecka)
async function check(path){

    // nacti galerii a pokud existuje tak ji napln
    gallery = document.getElementById('gallery')
    // fill_gallery je asynchrini funkce takze se pocka az se ukonci
    if(gallery) await fill_galery(path)

    // nacti DOM obrazku v galerii a div ve kterem se zvetsi
    small_images = document.querySelectorAll('.small_image')
    zoom_image = document.getElementById('zoom_image')
    if(small_images && zoom_image) find_active_image()
    
}

// naplni galerii
async function fill_galery(path){

    let count = 1
    let exist = true

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
            zoom_image.appendChild(event)
        })
    })
}