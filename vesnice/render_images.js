let gallery = null
let small_images = null
let zoom_image = null

window.onload = async () => {

    // nacti galerii a pokud existuje tak ji napln
    gallery = document.getElementById('gallery')
    // fill_gallery je asynchrini funkce takze se pocka az se ukonci
    if(gallery) await fill_galery()

    // nacti DOM obrazku v galerii a div ve kterem se zvetsi
    small_images = document.querySelectorAll('.small_image')
    zoom_image = document.getElementById('zoom_image')
    console.log(small_images)
    if(small_images && zoom_image) find_active_image()
}

// naplni galerii
async function fill_galery(){

    let count = 1
    let exist = true

    while (exist) {
        const image = new Image()
        image.src = `${count}.jpg`

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
        console.log(event)
        event.addEventListener('click', () => {
            console.log('click')        // jeste se musi dodelat
        })
    })
}