others_functions.mjs

Soubor obsahuje jednu třídu s názvem other. Importuje objekty z modulu Node.js, a to node:fs, na který je vytvořen alias fs. Druhý import je objekt json z modulu node:stream/consumers, který slouží pro práci s JSON streamy.

import fs from 'node:fs'
import { json } from 'node:stream/consumers'

Samotná třída je exportována, aby ji mohly používat ostatní soubory. V tomto případě generator.mjs a speaker_gen.mjs. Oba tyto soubory jsou podrobně popsány v části dokumentace generator.mjs.md a speaker_gen.mjs.md.

export class other

Třída nemá konstruktor, ke kterému by metody přistupovaly. Všechny metody pracují pouze s argumenty, které jsou jim předány při volání.

#read_json_file

První metoda je read_json_file a přijímá argument name. Tento argument je předán z funkcí main v souborech generator.mjs a speaker_gen.mjs.

Funkce pomocí synchronní metody readFileSync přečte obsah daného JSON souboru a uloží jej do lokální proměnné data.

let data = fs.readFileSync(name, 'utf8')

Následně je hodnota proměnné data předána vestavěné funkci JSON.parse(), která převede textový JSON na JavaScript objekt. Výsledek je vrácen zpět pomocí return.

return JSON.parse(data)

#check_path

Metoda slouží ke zjištění, zda daný soubor nebo složka existuje. Používá synchronní funkci existsSync, která vrací true, pokud cesta existuje, nebo false, pokud ne.

Metoda kromě návratové hodnoty vypisuje také informativní zprávu do konzole.

if(!fs.existsSync(path_to_file)){
console.log(Folder or file ${path_to_file} does not exist \n)
return false
}else{
console.log(File ${path_to_file} exists\n)
return true
}

Metoda tedy vrací booleovskou hodnotu true nebo false podle existence dané cesty.

#get_names

Metoda get_names slouží k načtení názvů všech souborů a složek v zadaném adresáři. Přijímá argument dir_name, což je cesta ke složce.

Pomocí synchronní metody readdirSync načte obsah adresáře a uloží jej do proměnné villages_names.

let villages_names = fs.readdirSync(dir_name)
return villages_names

Vrácená hodnota je pole řetězců obsahující názvy souborů nebo podsložek.

#check_graph

Metoda check_graph slouží ke kontrole a úpravě dat určených pro vykreslení grafu. Přijímá dvě pole: years (roky) a residents (počty obyvatel).

Nejprve kontroluje, zda pole nejsou prázdná a zda jejich první prvky jsou čísla. Pokud ne, vrací false.

if((years.length === 0 || residents.length === 0) || (isNaN(years[0]) || isNaN(residents[0]))) return false

Následně prochází pole residents a pokud narazí na hodnotu, která není číslo nebo je rovna nule, odstraní odpovídající prvek jak z pole years, tak z pole residents.

for(let i = 0; i < residents.length; i++){
if(isNaN(residents[i]) || residents[i] === 0) {
years.splice(i, 1)
residents.splice(i, 1)
}
}

Pokud po úpravě zůstanou pole prázdná, metoda vrací false.

V opačném případě vrací objekt obsahující očištěná data:

return {y: years, r: residents}

#write_into_html

Metoda write_into_html slouží ke generování HTML stránky konkrétní obce na základě dat uložených v objektu json_obj.

Zpracování pamětníků

Nejprve se vytváří HTML obsah pro sekci pamětníků. Pokud pole speaker není prázdné, vytvoří se seznam jmen oddělený značkou <br>.

Pokud pole neobsahuje žádná data, vloží se náhradní text:

<h5>Pamatujete si tuto událost? Kontaktujte nás.</h5>
Výpočet hodnot pro graf

Z pole l_residents se zjistí maximální hodnota a vypočítá se krok osy:

let max = Math.max(...json_obj.l_residents)
let step = Math.round(max / 5)

Následně je zavolána metoda check_graph, která zkontroluje validitu dat.

Pokud jsou data neplatná, graf se nevykreslí. Pokud jsou platná, vytvoří se element canvas a připraví se volání funkce print_graph().

Kontrola existence obrázku znaku

Pomocí metody check_path se ověří existence souboru znak.jpg. Pokud neexistuje, část HTML s obrázkem se nevloží.

Generování HTML kódu

V proměnné html_code je uložen kompletní HTML dokument jako textový řetězec. Obsahuje:

hlavičku s připojenými CSS styly,

navigaci,

sekci charakteristiky obce,

tabulku s údaji o vystěhování,

sekci pamětníků,

sekci grafu,

galerii obrázků.

Součástí metody je také vnořená funkce slugify, která převede název obce na formát vhodný pro název souboru (odstranění diakritiky, mezery nahrazené podtržítkem, pouze malá písmena).

Zápis souboru

Výsledný HTML soubor je uložen pomocí writeFileSync do složky ../vesnice/.

fs.writeFileSync(../vesnice/${slugify(json_obj.name)}.html, html_code)

Při chybě je vypsána chyba do konzole a vráceno null. V případě úspěchu je vypsána potvrzující zpráva.

#speakers_page

Metoda speakers_page generuje stránku speakers.html, která obsahuje výpovědi pamětníků ze všech obcí.

Parametrem je pole objektů json_obj, kde každý objekt reprezentuje jednu obec.

Generování obsahu

Metoda postupně prochází všechny objekty a kontroluje, zda obsahují data o pamětnících (speaker, header, speeche).

Pomocí vnořených cyklů vytváří jednotlivé section bloky, které obsahují:

nadpisy (h3),

podnadpisy (h5),

texty výpovědí (p).

Všechny tyto části jsou ukládány do proměnné pek_code.

Vytvoření HTML stránky

Stejně jako u předchozí metody je vytvořen kompletní HTML dokument jako textový řetězec, do kterého je vložen vygenerovaný obsah pek_code.

Zápis souboru

Výsledný soubor je uložen jako:

fs.writeFileSync(../speakers.html, html_code)

Při chybě je vypsána chyba a vráceno null. V případě úspěchu je do konzole vypsána potvrzující zpráva.

Třída other tedy zajišťuje:

práci se soubory (čtení a zápis),

kontrolu existence cest,

přípravu dat pro graf,

generování HTML stránek obcí,

generování stránky pamětníků.

Slouží jako pomocná třída pro generování statických HTML souborů na základě dat uložených v JSON formátu.