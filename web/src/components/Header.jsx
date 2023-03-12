export function Header({ currentTab, setCurrentTab }) {
  return (
    <header className="py-4">
      <nav className="navbar bg-light mb-4 p-0">
        <div className="container">
          <a href="/" className="navbar-brand">
            <div className="d-flex align-items-center">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
                alt="GraphQL Logo"
              />

              <span className="ml-2">Project Management</span>
            </div>
          </a>

          <div className="d-flex align-items-center gap-4">
            <span role="button" className={`${currentTab === "clients" ? "active-tab" : ""}`} onClick={() => setCurrentTab("clients")}>Clients</span>
            <span role="button" className={`${currentTab === "projects" ? "active-tab" : ""}`} onClick={() => setCurrentTab("projects")}>Projects</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
