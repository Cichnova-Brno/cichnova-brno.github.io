# script.js

Jedná se o skript napsaný v jazyce JavaScript určený pro běh v prohlížeči. Slouží k obsluze navigace, mapy vystěhovaných obcí, zoomování mapy a práci s dynamickými prvky stránky.

Soubor neobsahuje exporty ani importy. Je připojen přímo do HTML pomocí tagu `<script>`.


# Globální proměnné

Na začátku souboru jsou deklarovány globální proměnné, které slouží pro práci s DOM prvky a řízení chování mapy.

let regions
let zoom_svg
let zoom_div
let zoom_curtain
let close_btn
let zoom_names
let phase_year
let map_vilage_name_click
let names_of_villages

Dále je definována proměnná:

wtd = 0

Ta slouží jako přepínač stavu navigačního menu (0 = zavřeno, 1 = otevřeno).


# Custom element navigation-menu

Je definována třída navigationMenu, která dědí z HTMLElement.

Slouží k vytvoření vlastního HTML elementu `<navigation-menu>`, aby nebylo nutné definovat navigaci na každé stránce zvlášť.

Metoda render() nastaví obsah elementu pomocí innerHTML a vloží strukturu navigace `<nav>` s odkazy.

Metoda connectedCallback() zajistí, že se navigace vykreslí pouze jednou při připojení elementu do DOM.

Element je zaregistrován pomocí:

customElements.define("navigation-menu", navigationMenu);


# Custom element custom-footer

Podobně jako navigace je vytvořen i vlastní element `<custom-footer>` pomocí třídy customFooter.

Metoda render() vloží HTML strukturu patičky stránky, která obsahuje:

* loga partnerů,
* obrázek pozadí,
* text s autorskými právy.

Element je zaregistrován pomocí:

customElements.define("custom-footer", customFooter);


# Funkce menu

Funkce menu() slouží k otevření a zavření navigačního menu po kliknutí na tzv. hamburger tlačítko.

Pokud je wtd rovno 0:

* navigace se zobrazí (display: flex),
* ikona se změní na křížek,
* wtd se nastaví na 1.

Pokud je wtd rovno 1:

* navigace se skryje (display: none),
* ikona se změní zpět na seznam,
* wtd se nastaví na 0.


# Funkce goBack

Funkce goBack() slouží k návratu na předchozí stránku.

Pokud historie prohlížeče obsahuje více než jeden záznam, použije se history.back().
Pokud ne, uživatel je přesměrován na hlavní stránku 'https://vystehovanedrahansko.eu/'.

POZOR!!! jestli se někdy bude měnit doména stránky, tak se to bude muset změnit i tady.


# DOMContentLoaded

Po načtení stránky (DOMContentLoaded) se:

* načtou všechny regiony mapy (class="region"),
* získají reference na SVG element pro zoom,
* získají reference na další prvky potřebné pro zobrazení overlay okna.

## Klikání na názvy vesnic v mapě

Vyhledají se všechny `<text>` elementy v SVG mapě.

Každému je přidán event listener na kliknutí.

Pokud text neobsahuje řetězce „Etapa“ nebo „Vyberte etapu na mapě“, otevře se stránka konkrétní vesnice:

/vesnice/<slug>/index.html

K vytvoření správného názvu souboru se použije funkce slugify.


# Kliknutí na region mapy

Každý region (část mapy) má přidán event listener na kliknutí.

Po kliknutí:

1. Zjistí se bounding box (bbox) daného SVG prvku.
2. Vytvoří se jeho klon.
3. Pokud má region atribut name = "Vojenský prostor", otevře se stránka:
   /vesnice/puvodnivojenskyprostor/index.html
4. Jinak:

   * nastaví se název etapy do elementu .phase_name,
   * nastaví se barva pozadí podle fáze,
   * zobrazí se překryvná vrstva (zoom_curtain),
   * nastaví se viewBox SVG podle velikosti regionu,
   * zobrazí se rok dané etapy pomocí switch konstrukce.

Etapy jsou:

ETAPA Ia → 1. 4. 1941
ETAPA Ib → 1. 11. 1941
ETAPA II → 1. 12. 1942
ETAPA IIIa → 1. 11. 1943
ETAPA IIIb → 1. 5. 1944 / 1. 7. 1944 / 1. 9. 1944


# Výpis vesnic v regionu

Po kliknutí na region:

1. Získají se všechny názvy vesnic podle CSS třídy.
2. Pole je rozděleno a připraveno k výpisu.
3. Názvy se seřadí pomocí vnořeného cyklu.
4. Pro každý název se vytvoří:

   * element `<a>`
   * uvnitř `<h3>` s názvem obce
   * odkaz na /vesnice/<slug>.html

Tyto odkazy jsou vloženy do elementu zoom_names.

Pokud region neobsahuje žádné vesnice, zobrazí se hláška:

"Vojenský prostor neobsahuje žádné vesnice."


# Zavření zoom okna

Po kliknutí na close_btn:

* odstraní se třída zoom_active,
* skryje se overlay,
* vymaže se obsah zoom_svg,
* vymaže se obsah zoom_names,
* znovu se povolí klikání na region.


# Funkce get_class_name_of_region

Funkce rozdělí název třídy regionu podle mezery a vrátí druhou část doplněnou o příponu "_text".

Používá se pro získání správné třídy názvů vesnic v mapě.


# Funkce slugify

Funkce slugify(text) slouží k převodu názvu vesnice do formátu vhodného pro URL a název souboru.

Provádí:

* odstranění diakritiky (normalize + regex),
* převod na malá písmena,
* nahrazení mezer podtržítkem,
* odstranění nepovolených znaků.

Výsledkem je řetězec použitelný jako název HTML souboru.


# Používání

Soubor script.js je připojen ke stránkám projektu a zajišťuje:

* funkčnost navigace,
* vykreslení a ovládání interaktivní mapy,
* zobrazování seznamu obcí podle etap,
* přesměrování na konkrétní stránky vesnic,
* zobrazení a zavření zoom okna.

Bez tohoto souboru by mapa ani navigace nebyly interaktivní.
