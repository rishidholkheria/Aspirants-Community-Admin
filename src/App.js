import "./App.css";
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import Header from "./components/header/header";

function App() {
  // Determine if the Header should be shown
  // const showHeader = location.pathname !== '/';

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;

// {showHeader && <Header />}
// <Routes>
//   <Route path="/" element={<Login />} />
//   <Route path="/coaching" element={<Services type="coaching_centre" title="Coaching Centres" />} />
// <Route path="/tiffin" element={<Services type="tiffin_service" title="Tiffin Service" />} />
// <Route path="/library" element={<Services type="library" title="Library" />} />
// <Route path="/study-material" element={<Services type="study_material" title="Study Material" />} />
//   <Route path="/pg" element={<PGForm />} />
// </Routes>
