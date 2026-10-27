# Sistema de votacions

Aquest projecte està separat en dues carpetes principals:

- `backend/`: servidor WebSocket que guarda els vots
- `frontend/`: aplicació Vue amb la interfície d'usuari

## Estructura

```text
sistema-votacions/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── votos.json
│   └── node_modules/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── node_modules/
├── README.md
└── .gitignore
```

## Executar el projecte

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

- El backend escolta al port 3000.
- El frontend s'executa amb Vite i es comunica amb el backend via WebSocket.
