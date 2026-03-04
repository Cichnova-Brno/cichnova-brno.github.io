# graph.js
Soubor onsahuje jen jednu funkci a to print_graph().
Funkce příjmá argumenty xvalues, yvalues, max a jump.
Tahle funkce je volaná v HTML souborech v aresáři /vesnice.
xvalues - očekává pole s celými čísly, které jsou na ose X
yvalues - očekává pole s celými čísly, které jsou na ose Y
max - je to maximální hodnota na ose X
jump - skok mezi hodnotami na ose X. POkud je skok 100, tak pokud je jedna hodnota na X 200 tak další je 300.

...
data: {
    labels: xvalues,
    dataset: {
        backgoundColor: barColors,
        data: yvalues,
    }
}
...
yAxes: {
    max: max,
    stepSize: jump,
}
...

backgoundColor je proměnná, která obsahuje barevný kód #999999. Tuto barvu mají sloupce grafů.
ostatní barvy, tedy color a fontColor jsou nastaveny pevně na stringovou hodnotu black.