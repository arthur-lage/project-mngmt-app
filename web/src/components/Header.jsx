export function Header() {
  return (
    <header>
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
        </div>
      </nav>
    </header>
  );
}
