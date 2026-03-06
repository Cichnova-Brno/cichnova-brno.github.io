## substack_feed_embed.js

JavaScriptový skript pro zobrazení posledních příspěvků ze služby Substack přímo na webové stránce. Skript načítá RSS kanál Substacku, převádí jej pomocí služby rss2json na JSON a následně vykreslí jednotlivé příspěvky jako jednoduché karty.

Skript automaticky vyhledá HTML elementy se selektorem .substack-feed-embed nebo #substack-feed-embed. Do těchto elementů následně vloží obsah feedu.

Konfigurace widgetu se nastavuje pomocí atributů data-* přímo v HTML elementu. Pokud atribut není nastaven, použije se výchozí hodnota.

Možné atributy:

data-substack-url – adresa Substacku, ze kterého se bude načítat RSS feed

data-posts – počet zobrazených příspěvků

data-show-images – zda se mají zobrazovat obrázky příspěvků

data-show-dates – zda se má zobrazovat datum publikace

Je také možné nastavit globální výchozí hodnoty pomocí objektu window.SubstackFeedWidget.

Inicializace skriptu

Celý skript je uzavřen v IIFE funkci (Immediately Invoked Function Expression), která se spustí ihned po načtení skriptu. Díky tomu nedochází ke znečištění globálního jmenného prostoru.

Na začátku skript načte globální konfiguraci z objektu window.SubstackFeedWidget a spojí ji s výchozími hodnotami. Následně vyhledá všechny elementy na stránce, do kterých má být obsah feedu vložen. Pokud žádný takový element neexistuje, skript se ukončí.

Pomocné funkce
fmtDate(iso)

Funkce převádí datum ve formátu ISO na čitelný textový formát podle lokálního nastavení uživatele. Používá objekt Intl.DateTimeFormat, který automaticky přizpůsobí formát data jazyku a regionu prohlížeče.

normalizeUrl(u)

Funkce zajišťuje správný formát URL adresy Substacku. Pokud adresa neobsahuje protokol http nebo https, automaticky jej doplní.

extractFirstImg(html)

Funkce se pokusí z HTML obsahu příspěvku najít první obrázek. Pomocí regulárního výrazu vyhledá atribut src prvního tagu <img> a vrátí jeho adresu. Pokud obrázek nenajde, vrátí hodnotu null.

truncate(str, max)

Funkce zkrátí text na maximální délku. Pokud je text delší než zadaný limit, je zkrácen a na konec je přidána výpustka.

Vykreslení příspěvku
buildCard(post, opts)

Funkce vytvoří HTML strukturu reprezentující jeden příspěvek ze Substacku.

Každý příspěvek je vykreslen jako odkaz, který se po kliknutí otevře v novém panelu prohlížeče. Odkaz obsahuje:

náhledový obrázek (pokud je povolen a existuje),

název příspěvku,

datum publikace,

krátký popis.

HTML elementy jsou vytvářeny dynamicky pomocí document.createElement().

Načítání dat
fetchWithTimeout(url, ms)

Pomocná funkce pro načtení dat pomocí fetch. Funkce využívá AbortController, který umožňuje zrušit požadavek, pokud trvá déle než stanovený časový limit.

Tím se zabrání situaci, kdy by stránka čekala na odpověď serveru příliš dlouho.

Hlavní část skriptu

Pro každý nalezený kontejner se vytvoří konfigurační objekt z HTML atributů a výchozích hodnot.

Pokud není zadána adresa Substacku, zobrazí se chybová zpráva.

Následně skript sestaví adresu RSS feedu ve tvaru:

https://api.rss2json.com/v1/api.json?rss_url=SUBSTACK_URL/feed

Během načítání se v kontejneru zobrazí jednoduchý text Loading….

Po úspěšném načtení dat:

JSON odpověď se zkontroluje

vybere se požadovaný počet příspěvků

kontejner se vyčistí

jednotlivé příspěvky se vykreslí pomocí funkce buildCard()

Ošetření chyb

Pokud se feed nepodaří načíst nebo nastane chyba při zpracování dat, skript:

vypíše chybu do konzole

zobrazí uživateli zprávu, že příspěvky nelze načíst