import { lazy } from "react";
import { ProtectedRoute } from "../protectedRoute";

// Lazy-loaded components
const Dashboard = lazy(() => import("@/pages/dashboard"));

// Non-lazy-loaded components
// import { Dashboard } from "@/pages/dashboard";
import { NotFound } from "@/pages/NotFound";
import LoginForm from "@/pages/login";
const routes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard/>
   </ProtectedRoute>
    ),
  },
  
  { path: "/admin/login", element: <LoginForm /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
