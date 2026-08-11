# ReactDo

A simple todo list app built with React and Tailwind CSS. Add, edit, delete, and mark tasks as complete — all data is saved locally in the browser using `localStorage`.

# Features

- Add new todos
- Edit existing todos in place
- Delete todos
- Mark todos as complete/incomplete
- Toggle visibility of finished todos
- Data persists across page refreshes via `localStorage`

# Tech Stack

- **React** — UI library
- **Vite** — build tool and dev server
- **Tailwind CSS v4** — styling
- **react-icons** — edit/delete icons
- **uuid** — unique IDs for todo items

# Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/not-arshiya/ReactDo.git
cd ReactDo
npm install
```

Run the dev server:

```bash
npm run dev
```

Then open the local URL Vite gives you (usually `http://localhost:5173`).

# Project Structure

```
src/
├── components/
│   └── Navbar.jsx
├── App.jsx
├── main.jsx
└── index.css
```

# Notes

This is a front-end only project — there is no backend or database. Todos are stored in the browser's `localStorage`, so data is tied to a single browser and will not sync across devices.

# Live Demo

https://reactdo-by-arshiya.pages.dev/


# Author

Built by [Arshiya](https://github.com/not-arshiya).