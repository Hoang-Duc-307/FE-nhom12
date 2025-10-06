import React from "react";

import {BrowserRouter, Routes, Route, } from "react-router-dom";
import {routes} from "./routes/routes";
import MainLayout from "./components/MainLayout";
import AdminLayout from "./components/AdminLayout";


function App() {
  return (
      <BrowserRouter>
          <div className="App">

                  <Routes>
                      {/* Route riêng cho admin, không có header/footer */}
                      {routes.map((route, index) => {
                          const Page = route.page;
                          const Layout = route.layout === 'admin' ? AdminLayout : MainLayout;

                          return (
                              <Route
                                  key={index}
                                  path={route.path}
                                  element={
                                      <Layout>
                                          <Page />
                                      </Layout>
                                  }
                              />
                          );
                      })}
                  </Routes>
          </div>
      </BrowserRouter>

  );
}

export default App;
