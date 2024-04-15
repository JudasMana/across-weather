# across-weather

L'applicazione ha l'obbiettivo di restituire una dashboard con dati e grafici sul meteo in una data città.

Il flusso inizia con la barra di ricerca, nella quale l'utente ha la possibilità di selezionare una città tra quelle proposte. Le città proposte sono filtrate da un database locale con tutte le città del mondo (https://github.com/lutangar/cities.json) e selezionandola si ricavano latitudine e longitudine della città, necessarie per reperire i dati sul meteo.
Un possibile upgrade sarebbe integrare le API di GoogleMaps per fornire dati sui luoghi più dettagliati (come informazioni sul paese della città, fuso orario, ecc...) che permetterebbe ad esempio di integrare filtri aggiuntivi di ricerca oltre al testo nella barra di ricerca.

Una volta selezionata la città, verrà fatta una chiamata alle API del meteo (https://openweathermap.org/api) tramite longitudine e latitudine. Tale chiamata restituirà due Json:

1. i dati sul meteo attuale nelle coordinate specificate
2. le previsioni meteo per i prossimi 5 giorni (solo a intervalli di 3 ore) nelle coordinate specificate

Tali limitazioni rendono l'efficacia dell'app ridotta, tuttavia informazioni orarie, passate e oltre ai 5 giorni sono disponibili solo tramite le API a pagamento.

Una volta reperiti i dati dall'API verrà mostrata la dashboard che contiene le seguenti sezione:

1. filtri: possibilità di filtrare sull'orizzonte temporale (oggi, domani o dopodomani) e sul dato da approfondire nel grafico a barre successivo (a scelta tra temperatura, temperature massim e minime, umidità e velocità del vento)
2. tabella meteo: indica meteo e temperatura per fascia di 3 ore nel giorno selezionato
3. grafico a barre: indica il valore della misura indicata nel filtro precedente a intervalli di 3 ore, nella giornata selezionata
4. grafico a torta: indica la distribuzione del meteo nella giornata indicata

### CONFIG:

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
