
let all_text_elements = document.querySelectorAll('text')
    all_text_elements.forEach(e => {
        if(e.textContent.includes('Etapa')) e.style.cursor = 'default'
})
