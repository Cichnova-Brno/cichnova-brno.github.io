## render_images.js

JavaScriptový kód uložený v adresáři /vesnice. Je importován ve všech HTML souborech.

# load_data_from_json()

První asynchronní funkce load_data_from_json() zjistí jméno vesnice pomocí tagu title. Toto jméno použije k vyhledání a otevření příslušného souboru JSON, které jsou uloženy v /podklady/jmeno_vesnice. Pokud se soubor nenašel nebo se jej nepodařilo otevřít, vypíše se chyba do konzole. Na konec vrací přečtený JSON objekt, který obsahuje popisy jednotlivých fotografií rozdělené do tematických sekcí.

# check()

Další funkce check(path) je volaná při načtení HTML tagu body. Funkce nejdříve zkontroluje, zda se galerie nenačítá ze stejné cesty jako při předchozím volání. Pokud ano, funkce se ukončí. V opačném případě se uloží nová cesta k obrázkům. Pokud ještě nebyla načtena data z JSON souboru, zavolá se funkce load_data_from_json(). Poté se pokusí načíst element galerie z DOM ( je do div s id #gallery). Pokud existuje, zavolá se asynchronní funkce fill_gallery(), která galerii naplní obrázky ze zadané cesty. Následně se vyhledají tlačítka galerie a zavolá se funkce find_active_button(). Nakonec se načtou obrázky galerie a zavolá se funkce find_active_image(), která nastaví reakci na kliknutí na obrázek.

# fill_gallery()

Funkce fill_gallery(path) slouží k naplnění galerie obrázky ze zadané složky. Funkce postupně kontroluje jestli existují obrázky, které se jmenujé podle čísel 1.jpg, 2.jpg, 3.jpg atd. až do předem definovaného limitu. Kontrola probíhá pomocí HTTP požadavku typu HEAD. Pokud se obrázek podaří najít, je jeho index uložen do seznamu existujících obrázků. Po dokončení kontroly se galerie naplní pouze těmi obrázky, které skutečně existují. Pokud se nepodaří najít žádný obrázek, zobrazí se uživateli zpráva informující, že zatím nejsou k dispozici žádné fotografie ani dokumenty.

# find_active_image()

Funkce find_active_image() přidá ke každému náhledovému obrázku v galerii event na kliknutí. Po kliknutí na obrázek se zobrazí popup okno se zvětšenou verzí obrázku. Zároveň se nastaví index aktuálně zobrazeného obrázku a zavolá se funkce show_image(), která vykreslí obrázek a jeho popisek.

# find_active_button()

Funkce find_active_button() přidá navigačním tlačítkům galerii event na kliknutí. Po kliknutí se odebere třída gallery_active_button z předchozího tlačítka a přidá se tlačítku, na které uživatel kliknul. Zároveň se podle textu tlačítka nastaví proměnná desc_section, která určuje, z jaké sekce JSON souboru se budou načítat popisy fotografií.

# close_popup()

Funkce close_popup() zavře popup okno se zvětšeným obrázkem. Odstraní obsah elementu se zvětšeným obrázkem a odebere třídu, která popup zobrazuje.

# show_image()

Funkce show_image(index) vykreslí vybraný obrázek ve zvětšeném zobrazení. Funkce nejprve zkontroluje, zda index nepřesahuje rozsah obrázků v galerii. Pokud ano, nastaví index na začátek nebo konec seznamu, čímž umožní cyklické procházení galerie. Poté vloží zvětšený obrázek do popup okna a zobrazí jeho textový popisek z načteného JSON souboru. Pokud pro se popisek nenajde nebo není, zobrazí se výchozí zpráva vyzývající uživatele k doplnění informací.

# next_image()

Funkce next_image() zobrazí následující obrázek v galerii. Pouze zavolá funkci show_image() s indexem následujícího obrázku.

# prev_image()

Funkce prev_image() zobrazí předchozí obrázek v galerii. Stejně jako předchozí funkce využívá funkci show_image(), tentokrát s indexem předchozího obrázku.