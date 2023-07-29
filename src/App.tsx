import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard, LoginPage, Panel, UserInfo } from "./components";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
     <ScrollToTop />
      <Routes>
        {/* public routes */}
        <Route index element={<UserInfo />} />
        <Route path="login" element={<LoginPage />} />

        {/* protected routes */}
        <Route path="panel" element={<Panel />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
