#generator.jms
Jedná se o skript napsaný v jazyce JavaScript a je spoustěn přes prostředí node js.

Soubor obsahuje import pro soubor other_functions.mjs, který je uložen ve stejném adresáři. Podrobněji je popsán zvlášť.

Je tam jedna funkce main, která vytváří objekt pro třídu other. Tato třída je v souboru other_functions.mjs. Ve funkce main je volaná metoda check_path, která se ptá jestli existuje předdefinovaná cesta ../podklady. Pokud cesta existuje je vrácena hodnota true jinak false. Dále je volaná funkce get_names. Tato funkce vrací seznam všech adresářů v této cestě a ukládá je do pole villages_names. Následuje cyklus for s řídící proměnou i. Cyklus má stejný počet opakovaní jaký má délka pole villages_names. V cyklu je opět funkce check_path, která hledná v cestě soubor s příponou .json a výsledek ukládá do proměné skip. Pokud soubor exstuje provede se podmínka vnořená v cyklu, jinak se tato část přeskočena. V podmínce je metoda read_json_file. Tato metoda přečte konkrétní jsou soubor a vrátí jeho obsah ve formě objektu a uloží do proměné village_text. Hodnota village_text je předána metodě write_into_html. Tato metoda dále spracovává obsah a zapíše do html souboru.

# používání

tento soubor se používá na generování obsahu ve složce /vesnice z podkladů ve složce /podklady. 
Soubor se zavolá z jeho složky, pomocí příkazu node generator.mjs spuštění zaviní, že se získají data z json souborů v /podklady a doplní se do statického html vzoru v souboru other_functions.mjs.
Doporučujeme přegenerovávat jenom při velkých změnách, nebo při přidání obsahu do /podklady

# Adresářová struktura

Validní adresářová struktura vesnic je:
podklady/
└── Baldovec/
    ├── 1.jpg
    ├── Baldovec.json
    ├── galerie/
    │   ├── 1-pred-vystehovanim/
    │   ├── 2-stehovani/
    │   ├── 3-po-vystehovani-navratu/
    │   ├── 4-soucasnost/
    │   └── 6-dokumenty/
    └── znak.jpg

Složka vesnice musí mít stejný název jako datový .json soubor. Ve složce musí být 1.jpg soubor, který se použije, jako první obrázek na stránce. Taky zde musí být znak.jpg, který se použije, jako znak vesnice hnedka vedle úvodního textu. Dále zde musí být složka galerie, která obsahuje dané podsložky, ať už jsou prázdné nebo ne. V nich je pak dataset obrázků očíslován od 1.jpg do 65.jpg omezení vyplívá z fungování souboru ????.js. Je dobré, aby všechny obrázky měli korespondující popis v .json data souboru.

# Datový soubor .json
...

