# no_internet.js

Script napsaný v jazyce Javascript, který zkontroluje stav připojení k síti. Pokud síť není dostupná, tedy navigator.online vráti false otevře se statická stránka disconnected.html, která je iložená v kořeni projektu.

if(!navigator.onLine) open('/disconnect.html', '_self')

Nová stránka se načte ve stávajícím okně.