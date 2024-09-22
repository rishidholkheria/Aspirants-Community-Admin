import "./App.css";
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import Header from "./components/header/header";
import useAuth from "./useAuth";

function App() {
  // Determine if the Header should be shown
  // const showHeader = location.pathname !== '/';
  const { user, loading } = useAuth();

  return(
  <>
    {user ? (
      <>
        <Header />
        <Outlet />
      </>
    ) : (
      <Outlet />
    )}
  </>)
}

export default App;
