# Soubory HTML obecně
Soubory napsané ve značkovacím jazyce HTML jsou uložena v adresářové struktuře na dvou místech.
Soubory, jako jsou books.html, documentary.html, exhibition.html, index.html, more.html, project.html a speakers.html jsou uloženy v kořenovém adresáři.

Soubory vesnic, tedy Baldovec.html, Bousím.html ... jsou uložené v adresáři vesnice.

/web
|
|_ /vesnice
|_ /styles
      |_ /bootstrap

# Kaskádové styly
CSS soubory jsou v adresáři /styles v kořenovém adresáři.

Všechny stránky importují soubory village.css, common.css, map.css, gallery.css, table.css, graph.css a bootstrap-icons.min.css. Dále obsahují style tag style, který obsahuje :root {-eth: var(-- etapa )}, kde otapa je jiná podle toho, ve které etapě se vesnice nachází.

Etapa Ia  (Oranžová)
    Rychtářov
    Pařezovice
    Lhota
    Opatovice
    Hamiltony
    
Etapa Ib  (Fialová)
    Podivice
    Radslavičky
    Radslavice
    Zelená Hora

Etapa II  (Žlutá)
    Hartmanice (Niva)
    Otinoves
    Odrůvky
    Studnice

Etapa IIIa  (Růžová)
    Repechy
    Bousín
    Drahany
    Březina
    Rozstání
    Hamry
    Nové Sady

Etapa IIIb  (Hnědá)
    Housko
    Molenburk
    Baldovec
    Marinín
    Lipovec
    Kulířov
    Krásensko
    Rogendorf (Krasová)
    Kotvrdovice
    Senetářov
    Jedovnice
    Podomí
    Ruprechtov

# Skripty
JavaScriptové soubory, ktere stánky importují jsou script.js, render_image.js, Chart.js, graph.js a no_internet.js.
Každý skript je podrobněji vysvětlen v daném souboru.

Na stránkách vesnic jsou volány funkce check() v elemntu body, goBack() v hamburger nack a menu() v hamburgeru.
V nořeném divu s třídou hamburger je volaná funkce close_popup().
V divech vnořených v divu s id zoom jsou funkce prev_image() a next_image().
Dále je na stránkách element script, který volá funkci print_graph().
Poslední jsou elementy button, které volají opět funkci check().