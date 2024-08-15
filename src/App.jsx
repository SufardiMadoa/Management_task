import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastProvider } from './components/ui/toast';
import { Toaster } from "./components/ui/toaster";
import routes from "./routes/routesConfig";
import React, { Suspense } from "react";
function AppContent() {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith("/dashboard");
  return (
    <>
      <div className="flex">
        {/* {isDashboardPage && <Sidebar />} */}
        {/* <Suspense fallback={<LoadingFallback />}> */}
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        {/* </Suspense> */}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <AppContent />
        <Toaster />
      </ToastProvider>
    </Router>
  );
}

export default App;
