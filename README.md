# ArcadeX – MongoDB CRUD Projekt

## 1. Kurzbeschreibung

ArcadeX ist ein kleiner Spiele-Launcher (ähnlich Steam/Epic Games) als Lernprojekt für
CRUD-Operationen mit MongoDB. Nutzer können im Store Spiele durchsuchen und kaufen,
gekaufte Spiele erscheinen danach in der Bibliothek. Über die Einstellungen lassen sich
neue Spiele im Store anlegen.

**Tech-Stack:**

- Frontend: React + TypeScript + Vite + MUI (Material UI)
- Backend: FastAPI (Python), Zugriff auf MongoDB über `pymongo` (Async-Client)
- Datenbank: MongoDB (Atlas, Cloud-gehostet)

## 2. How-To / Setup

### Voraussetzungen

- Node.js (für das Frontend)
- Python 3.x + pip (für das Backend)
- Ein MongoDB-Cluster mit Connection-String (z. B. MongoDB Atlas)

### Backend starten

```bash
cd backend
python -m venv venv          # einmalig, falls venv noch nicht existiert
source venv/bin/activate     # macOS/Linux
pip install -r requirements.txt
```

Datei `backend/.env` anlegen mit:

```
MONGO_CONNECTION=<dein MongoDB Connection String>
```

Server starten:

```bash
uvicorn main:app --reload --port 8000
```

Backend läuft dann auf `http://localhost:8000`, interaktive API-Doku unter
`http://localhost:8000/docs`.

### Frontend starten

```bash
cd frontend
npm install
npm run dev
```

Frontend läuft auf `http://localhost:5173`.

> Backend und Frontend müssen gleichzeitig laufen. CORS im Backend ist aktuell
> nur für `http://localhost:5173` freigegeben (siehe `backend/main.py`).

## 3. UI-Überblick

Die App hat vier funktionale Seiten, erreichbar über die Sidebar:

| Seite | Route | Funktion |
|---|---|---|
| Home | `/` | Vorstellung eines Spiels + Übersicht aller Spiele |
| Shop | `/shop` | Spiele durchsuchen, filtern, sortieren, kaufen |
| Bibliothek | `/library` | Zeigt nur gekaufte Spiele (`owned: true`) |
| Einstellungen | `/settings` | Formular zum Anlegen neuer Spiele |

*(Platz für Screenshots der einzelnen Seiten)*

## 4. Beispiel eines MongoDB-Dokuments

Collection `games` in der Datenbank `arcade_launcher`:

```json
{
  "_id": "ObjectId('...')",
  "id": "d3331be8-4567-41fd-be5c-674fb6c44ce3",
  "name": "Fortnite",
  "category": "Shooter",
  "price": 0.0,
  "stock": 99,
  "owned": true
}
```

- `_id` wird von MongoDB automatisch vergeben.
- `id` ist ein selbst erzeugtes, fachliches Feld (UUID), über das die API arbeitet.
- Die API blendet `_id` bewusst aus der Antwort aus (Projektion `{"_id": 0}`), da
  der Typ `ObjectId` sich nicht direkt in JSON serialisieren lässt.

## 5. Umsetzung von CRUD

| Operation | Endpoint | Beschreibung |
|---|---|---|
| **C**reate | `POST /create_games` | Legt ein neues Spiel an (Formular in den Einstellungen) |
| **R**ead | `GET /get_all_games`, `GET /read_games/{id}` | Liefert alle bzw. ein einzelnes Spiel |
| **U**pdate | `PATCH /change_games/{id}/price`, `POST /buy_games/{id}` | Preis ändern bzw. Spiel kaufen (`owned=true`, `stock -1`) |
| **D**elete | `DELETE /delete_games/{id}` | Löscht ein Spiel |

Die eigentliche Datenbank-Logik liegt in `backend/db.py` (MongoDB-Zugriffe über
`pymongo.AsyncMongoClient`), die HTTP-Schnittstelle inkl. Validierung über
Pydantic-Modelle in `backend/main.py`. Das Frontend spricht diese Endpoints über
`frontend/src/api/gamesApi.ts` an.

## 6. UML-Diagramme

Siehe [`docs/diagrams/`](docs/diagrams/):

- `use-case-diagram.drawio` – Anwendungsfälle aus Nutzersicht
- `sequence-diagram-kauf.drawio` – Ablauf beim Kauf eines Spiels
  (Frontend → Backend → MongoDB)

Dateien lassen sich unter [app.diagrams.net](https://app.diagrams.net) öffnen
(„Datei → Öffnen von → Gerät").
