import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h2>WorldWise</h2>
      <Link to="/app">Go to the app</Link>
    </div>
  );
}

export default Homepage;
