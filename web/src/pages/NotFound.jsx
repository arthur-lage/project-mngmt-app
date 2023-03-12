import { Link } from "react-router-dom";
import PageNotFound from "../assets/not-found.svg";

export function NotFound() {
  return (
    <div
      style={{ height: "100vh" }}
      className="gap-4 d-flex align-items-center justify-content-center flex-column"
    >
      <img
        style={{ width: "325px" }}
        src={PageNotFound}
        alt="Page not found - Illustration"
      />

      <h1 className="lg">404</h1>
      <h3>Oops... Unfortunately, this page does not exist.</h3>

      <Link className="" to="/">
        Click here to go back to the main page
      </Link>
    </div>
  );
}
