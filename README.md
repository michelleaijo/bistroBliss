```markdown
# 🌿 BistroBliss  

BistroBliss is a modern **Angular 15 application** built for restaurant management.  
It features authentication, dashboards, order handling, and a clean modular architecture.  

---

## 📂 Project Structure  

```

src/app
┣ components/          # Reusable UI components
┃ ┣ auth/              # Authentication (login/signup)
┃ ┣ carousel/          # Image carousel
┃ ┣ dashboard/         # Dashboard view
┃ ┣ dashnav/           # Dashboard navigation
┃ ┣ landing/           # Landing page
┃ ┗ orders/            # Order management
┣ resto/               # Restaurant-specific modules
┣ models/              # Data models & interfaces
┣ services/            # API and business logic
┣ app-routing.module.ts  # App routing
┣ app.module.ts          # Root Angular module
┗ app.component.\*        # Root Angular component

````

---

## 🚀 Getting Started  

### 1. Clone the repository  
```bash
git clone https://github.com/michelleaijo/bistroBliss.git
cd bistroBliss
````

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
ng serve
```

Navigate to 👉 [http://localhost:4200](http://localhost:4200).
The app will reload automatically when source files are updated.

---

## 🗄️ Mock Backend (json-server)

This project includes a `db.json` file for simulating a REST API.

Run:

```bash
npx json-server --watch db.json --port 3000
```

The mock API will be available at:
👉 `http://localhost:3000/`

---

## 🧪 Testing

### Unit tests

```bash
ng test
```

Runs unit tests via [Karma](https://karma-runner.github.io).

### End-to-end tests

```bash
ng e2e
```

Executes e2e tests using a chosen framework.

---

## 🛠️ Tech Stack

* **Angular 15 (CLI v15.2.11)**
* **TypeScript**
* **json-server** (mock REST API)
* **Karma & Jasmine** (testing)

---

## 📚 Resources

* [Angular Documentation](https://angular.io/docs)
* [Angular CLI Reference](https://angular.io/cli)
* [json-server](https://github.com/typicode/json-server)

---

✨ **BistroBliss** – A clean, modular Angular project for building scalable restaurant management solutions.
