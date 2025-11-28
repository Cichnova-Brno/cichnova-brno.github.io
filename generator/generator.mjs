import { other } from "./others_functions.mjs"

/////////////////// global variables ////////////
let village_text = null
let villages_names = new Array()
const path = '../podklady'
let skip = false 

////////////// main function ///////////////
function main(){

    const others_fnc = new other()

    others_fnc.check_path(path)
    villages_names = others_fnc.get_names(path)
    
    for(let i = 0; i < villages_names.length; i++){
        skip = others_fnc.check_path(`${path}/${villages_names[i]}/${villages_names[i]}.json`)
        if(skip === true){
            village_text = others_fnc.read_json_file(`${path}/${villages_names[i]}/${villages_names[i]}.json`)
            others_fnc.write_into_html(village_text)
        }
    }

}

main()