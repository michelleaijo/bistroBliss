# 🌿 BistroBliss

BistroBliss is a modern **Angular 15** application for restaurant management.  
It provides authentication, dashboards, order management, and a clean modular architecture designed for easy extension.

---

## 🔑 Features

- Authentication (login / signup)
- Dashboard and admin views
- Order management
- Reusable component structure
- Mock REST API support via `json-server`

---


```markdown


## 📂 Project structure
src/
├─ app/
│  ├─ components/
│  │  ├─ auth/         # Authentication (login/signup)
│  │  ├─ carousel/     # Image carousel
│  │  ├─ dashboard/    # Dashboard view
│  │  ├─ dashnav/      # Dashboard navigation
│  │  ├─ landing/      # Landing page
│  │  └─ orders/       # Order management
│  ├─ resto/           # Restaurant-specific modules
│  ├─ models/          # TS interfaces and models
│  ├─ services/        # API calls and business logic
│  ├─ app-routing.module.ts
│  ├─ app.module.ts
│  └─ app.component.
├─ assets/             # Images, icons, static files
├─ index.html
├─ main.ts
├─ styles.css
├─ db.json             # Mock API data (json-server)
└─ README.md

```

---

## 🚀 Getting started (local)

### Prerequisites
- Node.js (LTS recommended)
- npm or Yarn
- Angular CLI (optional for convenience): `npm i -g @angular/cli`

### Clone & install
```bash
git clone https://github.com/michelleaijo/bistroBliss.git
cd bistroBliss
npm install
# or
yarn install
````

### Run dev server

```bash
ng serve
```

Open: [http://localhost:4200](http://localhost:4200) — the app reloads automatically on code changes.

---

## 🗄 Mock backend (json-server)

A simple mock API is included in `db.json`. Start it with:

```bash
npx json-server --watch db.json --port 3000
```

Mock API base: `http://localhost:3000/`

Adjust service endpoints in your Angular services if the base URL differs.

---

## 🧪 Scripts & useful commands

```bash
# start dev server
ng serve

# build production bundle
ng build --configuration production

# run unit tests (Karma + Jasmine)
ng test

# run e2e tests (if configured)
ng e2e

# lint (if configured)
ng lint

```

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make changes and commit with clear messages.
4. Push and open a Pull Request — describe the changes and any testing steps.

---

## 📝 Notes & tips

* Keep components small and focused; put shared logic in services.
* Use environment files for API base URLs (`src/environments/`).
* If you use `json-server`, remember it's for development only — replace with a real backend for production.
