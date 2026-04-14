import Header from "./components/Header";

import "./styles/index.css";
function App() {
  return (
    <main className="app-shell">
      <Header />
      <section className="welcome-card">
        <h1>Game Backlog Tracker</h1>
        <p>Track your next playthroughs, wishlist titles, and completed games.</p>
      </section>
    </main>
  )
}

export default App
