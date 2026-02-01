document.addEventListener('DOMContentLoaded', fetch_JSON_create_DOM)

 function fetch_JSON_create_DOM(){
    let referrer  = document.referrer
    if(referrer === '') return
    let fetch_promise = fetch(`/podklady/${referrer}/${referrer}.JSON`)
    .then(data => data.json())
    .then(parsed_data => {

        let container = document.getElementById('speakers_container')

        for(let i = 0; i < parsed_data.speakers.length; i++){
            let name = document.createElement('h2')
            let title = document.createElement('h3')
            let par = document.createElement('p')

            name.class = `name_${i}`
            title.class = `title_${i}`
            par.class = `par_${i}`

            document.appendChild(name)
            document.appendChild(title)
            document.appendChild(par)
        }

        for(let i = 0; i < parsed_data.speakers.length; i++){
            let name = document.createElement(`name_${i}`)
            let title = document.createElement(`name_${i}`)
            let par = document.createElement(`name_${i}`)

            name.textContent = parsed_data.speakers[i][0]
            title.textContent = parsed_data.speakers[i][1]
            par.textContent = parsed_data.speakers[i][2]
        }
    })
}