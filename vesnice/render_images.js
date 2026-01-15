let gallery = null
let small_images = null
let zoom_image = null
let nav_buttons = null
let active_button = null
let image_desc = null
let desc_section = 'before_move'
let data = null
let current_index = 0
let is_loaded = false
let prev_path = "";


async function load_data_from_json() {
    const title = document.querySelector('title').textContent

    const response = await fetch(`/podklady/${title}/${title}.json`)
    if (!response.ok) {
        throw new Error(`Cannot find or open JSON file ${title}`)
    }

    data = await response.json()
}



// na body se da onload a zavola se tahle funkce. Do path se ulozi cesta k obrazkum
// tahle cesta se preda funkci fill_gallery.
// poznamka (pokud se nacita z aktualniho adresare jako argument se musi nastvit tecka)
async function check(path){
    if(path == prev_path) return;
    prev_path = path;
    if(is_loaded == false) await load_data_from_json()
    is_loaded = true
    // nacti galerii a pokud existuje tak ji napln
    gallery = document.getElementById('gallery')
    // fill_gallery je asynchrini funkce takze se pocka az se ukonci
    if(gallery) await fill_gallery(path)

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
async function fill_gallery(path) {
    gallery.innerHTML = '';

    const MAX_CHECK = 60;
    const promises = [];

    for (let i = 1; i <= MAX_CHECK; i++) {
        promises.push(
            fetch(`${path}/${i}.jpg`, { method: 'HEAD' })
                .then(r => ({ exists: r.ok, index: i }))
                .catch(() => ({ exists: false, index: i }))
        )
    }

    const results = await Promise.allSettled(promises);
    const existing = results
        .filter(r => r.status === 'fulfilled' && r.value.exists)
        .map(r => r.value.index)
        .sort((a, b) => a - b);

    if (existing.length === 0) {
        const msg = document.createElement('h5')
        msg.textContent = 'Zatím nemáme k dispozici žádné fotografie ani dokumenty. Máte-li nějaké ve svém archivu, ozvěte se nám.'
        gallery.appendChild(msg)
        return
    }

    const fragment = document.createDocumentFragment()
    for (const i of existing) {
        const img = new Image()
        img.loading = 'lazy'
        img.classList.add('small_image')
        img.src = `${path}/${i}.jpg`
        img.alt = `Obrázek ${i}`
        fragment.appendChild(img)
    }
    gallery.appendChild(fragment)
}

// hleda aktivni obrazek
function find_active_image(){

    let images_array = Array.from(small_images)

    images_array.forEach((event) => {
        event.addEventListener('click', () => {
            zoom_curtain.classList.add('zoom_active')
            zoom_div.style.display = 'flex'
            image_desc.textContent = ''
            //show_image((event.attributes.src.textContent.split('\\').pop().split('/').pop().split('.')[0])-1)
            show_image(images_array.indexOf(event))
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
            switch(event.textContent.replace(/\s+/, "")){
                case 'předvystěhováním':
                    desc_section = 'before_move'
                break
                case 'stěhování':
                    desc_section = 'move'
                break
                case 'povystěhování/návratu':
                    desc_section = 'after_move_return'
                break
                case 'současnost':
                    desc_section = 'present'
                break
                case 'dokumenty':
                    desc_section = 'documents'
                break
                case 'lidováslovesnost':
                    desc_section = 'stories_poems'
                break
            }
        })
    })
}

function close_popup(){
    zoom_image.innerHTML = ''
    zoom_curtain.classList.remove('zoom_active')
}

// funkce pro vykresleni dalsich obrazku v popupu
function show_image(index) {
    const decs = document.getElementById('image_desc')
    //let title = document.querySelector('title').textContent
    if (index < 0) index = small_images.length - 1
    if (index >= small_images.length) index = 0
    current_index = index
    const img_src = small_images[current_index].src
    zoom_image.innerHTML = ''
    const new_img = document.createElement('img')
    new_img.src = img_src
    zoom_image.appendChild(new_img)


    const section = data?.[desc_section]
    decs.innerHTML = section?.[index] || "Poznáváte tuto fotografii? Napište nám."

}

// zobrazi dalsi obrazek
function next_image() {
    show_image(current_index + 1)
}

// nacti predchozi obrazek
function prev_image() {
    show_image(current_index - 1)
}
