import { other } from "./others_functions.mjs"

let path = '../podklady'
let villages_names = new Array()
let village_text = new Array()
let skip

function main(){

    const others_fnc = new other()
    others_fnc.check_path(path)
    villages_names = others_fnc.get_names(path)
    villages_names.pop()
    villages_names.pop()
    for(let i = 0; i < villages_names.length;i++){
        skip = others_fnc.check_path(`${path}/${villages_names[i]}/${villages_names[i]}.json`)
        if(skip === true){
            village_text.push(others_fnc.read_json_file(`${path}/${villages_names[i]}/${villages_names[i]}.json`))
        }
    }
    others_fnc.speakers_page(village_text)

}

main()
