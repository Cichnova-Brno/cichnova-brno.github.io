
let all_text_elements = document.querySelectorAll('text')
    all_text_elements.forEach(e => {
        let child = e.children
        if(e.textContent.includes('Etapa')) e.style.cursor = 'default'
})
