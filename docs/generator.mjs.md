# generator.jms
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

Soubory typu JSON ukládají data potřebná ke generování statického obsahu stránek a načítání popisků v galerii u každé vesnice. Jejicj sintaxe:

{
   name
   paragraph_one
   paragraph_two
   phase
   district
   speaker
   header
   speeche
   residents
   houses
   families
   l_year
   l_houses
   l_residents
   titles
   before_move
   move
   after_move_return
   present
   stories_poems
   documents
}

name - název vesnice, typu string.
paragraph_one - první odstavec, typu string.
paragraph_two - druhý odstavec, typu string.
phase - fáze vystěhování vesnice, string.
district - okres ve, kterém se vesnice nachází.
speaker - pole stringů, kde každý index odpovídá jménu jednoho pamětníka.
header - pole stringů, kde každý index odpovídá jednomu nadpisu.
speeche - pole stringů, kde každý index odpovídá jednomu textu pamětníka.
residents - počet obyvatel ve vesnici, celé číslo, ale datového typu string.
houses - počet domů ve vesnici, celé číslo, ale datového typu string.
families - počet rodin ve vesnici, celé číslo, ale datového typu string.
l_year - pole celých čísel, kde každý index odpovídá jednomu roku.
l_houses - pole celých čísel, kde každý index odpovídá množství domů.
l_residents - pole celých čísel, kde každý index odpovídá množství obyvatel.
titles - pole stringu, obsahuje popisky k fotkám na stránce.
before_move - pole stringu, kde každý index odpovídá jednomu popisku v galerii pro obrázky z "před vystěhováním".
move - pole stringu, kde každý index odpovídá jednomu popisku v galerii pro obrázky z "průběh stěhování".
after_move_return - pole stringu, kde každý index odpovídá jednomu popisku v galerii pro obrázky z "po návratu".
present - pole stringu, kde každý index odpovídá jednomu popisku v galerii pro obrázky ze "současnost".
stories_poems - pole stringu, kde každý index odpovídá jednomu popisku v galerii pro obrázky z "básně".
documents - pole stringu, kde každý index odpovídá jednomu popisku v galerii pro obrázky z "dokumenty".