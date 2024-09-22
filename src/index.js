import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import PGForm from "./components/forms/PG";
import Services from "./components/Services/Services";
import ProtectedRoute from "./components/ProtectedRoute"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />} />
      <Route
        path="/coaching"
        element={
          <ProtectedRoute
            element={
              <Services type="coaching_centre" title="Coaching Centres" />
            }
          />
        }
      />
      <Route
        path="/library"
        element={
          <ProtectedRoute
            element={<Services type="library" title="Library" />}
          />
        }
      />
      <Route
        path="/study-material"
        element={
          <ProtectedRoute
            element={<Services type="study_material" title="Study Material" />}
          />
        }
      />
      <Route path="/pg" element={<ProtectedRoute element={<PGForm />} />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
