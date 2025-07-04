# WorldWise 🌍 (React + TypeScript + Vite)

**WorldWise** è un'applicazione web demo a scopo didattico realizzata in **React + TypeScript**.  
Consente il **tracking delle città visitate** tramite l'interazione con una mappa, specificando una data e permettendo di inserire una breve descrizione del viaggio

## ✨ Caratteristiche

- Single Page Application
- Lazy laoding
- Tracciamento delle città visitate
- Aggiunta di data e descrizione del viaggio tramite form
- Mappa interattiva
- Interfaccia semplice e funzionale

## 🎯 Focus Tecnologico

L'applicazione è progettata per approfondire alcuni concetti fondamentali di **React**:

- `useState`
- `useEffect`
- `useReducer`
- `useCallback`
- `Context API`
- `Custom Hooks`

## 📦 Librerie di Terze Parti Utilizzate

Per ampliare le funzionalità e semplificare la gestione di determinate funzionalità, WorldWise utilizza diverse librerie esterne:

### 📍 `react-router-dom`

**Cos'è:**  
Una libreria che permette di gestire il **routing client-side** nelle applicazioni React, consentendo di creare diverse "pagine" all'interno della stessa Single Page Application senza ricaricare il browser.

**Perché viene utilizzata:**  
Serve a gestire la navigazione tra le diverse schermate dell’applicazione, come la home, la mappa, e il form di inserimento città.

---

### 📡 `json-server`

**Cos'è:**  
Un server JSON RESTful fittizio che consente di simulare un backend API in locale.  
Permette di esporre un database semplice (un file `db.json`) come API REST.

**Perché viene utilizzata:**  
Per simulare le operazioni CRUD (Create, Read, Update, Delete) sui dati delle città visitate, senza la necessità di configurare un vero backend durante la fase di sviluppo didattico.

---

### 🗺️ `leaflet` e `react-leaflet`

**Cos'è:**

- **Leaflet** è una libreria open-source per la creazione di mappe interattive.
- **React-Leaflet** è un set di componenti React che semplifica l'integrazione di Leaflet in applicazioni React.

**Perché viene utilizzata:**  
Per visualizzare in maniera interattiva sulla mappa le città visitate. Gli utenti possono cliccare sui marker e vedere dettagli del viaggio associato.

---

### 📅 `react-datepicker`

**Cos'è:**  
Una libreria React per la gestione di **datepicker** (selettori di data) eleganti e facilmente integrabili.

**Perché viene utilizzata:**  
Per consentire all’utente di selezionare comodamente una data dal calendario quando registra un viaggio.

## 🎨 Styling con CSS Modules

**Cos'è:**  
I **CSS Modules** sono una metodologia di scrittura dei fogli di stile in cui ogni file CSS ha un **ambito locale per default**. Questo significa che le classi definite in un modulo CSS vengono generate con un identificativo univoco, evitando conflitti di nomi tra componenti diversi.

**Perché viene utilizzato:**

- Evita collisioni tra classi CSS in progetti React complessi
- Mantiene uno stile **modulare e facilmente manutenibile**
- Si integra perfettamente con il sistema di **componenti riutilizzabili** di React
- Semplifica l'organizzazione degli stili associando un file `.module.css` ad ogni componente

## 📚 Scopo

Il progetto ha finalità puramente didattiche ed è pensato come esercizio pratico per imparare e consolidare:

- La gestione dello stato in React
- L’integrazione di API esterne
- Il routing nelle SPA
- La manipolazione di dati remoti
- L’interazione con mappe geografiche

## ✅ Conclusione

WorldWise è un esempio concreto di come costruire una piccola applicazione moderna in React, utilizzando pattern corretti e librerie di supporto per semplificare e arricchire l’esperienza utente.
