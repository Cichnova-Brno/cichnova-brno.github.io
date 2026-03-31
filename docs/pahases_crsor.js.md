# phases_srsor.js
Krátký skript na stránce index.html v kořeni projektu.
Pomocí funkce querySelectorAll načítá z elementu svg všechny elementy text. Pokud obsah elementu (text) obsahuje slovo "Etapa", je tomuto elementu nastaven cursor default.
Na všechny ostatní elementy v svg je nastaven cursor pointer.

Styly kurzoru jsou nastaveny v css souboru map.css.
# Tento skript nepřepisuje hodnoty v souboru map.css, takže v případě odstranění defaultního kurzoru se to musí provádět ve skriptu phase_crsor.js
