import React, { useState } from "react";
import { Grid, Layout, theme } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LocalStorage from "../managers/LocalStorage";
import { SideBar, Navbar, Login, Home, CreateCar, NotFound } from "../views";

const { Content } = Layout;

const Routing = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();
  const [open, setOpne] = useState(true);

  const isSmallScreen = xs;

  // Protected Routes ..
  const AuthenticatedRoute = ({ children }) => {
    const isAuthenticated = LocalStorage.isLoggedIn();
    const location = useLocation();
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  };

  // if user logged in then not navigate to login and singup page ..
  const Authenticated = ({ children }) => {
    const isAuthenticated = LocalStorage.isLoggedIn();
    const location = useLocation();
    if (isAuthenticated) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
  };

  const toggleSidebar = () => {
    setOpne(!open);
  };

  return (
    <Router>
      <Layout
        style={{
          height: "100vh",
          backgroundColor: "white",
          marginLeft: "-8px",
          marginTop: "-8px",
        }}
      >
        {/* Navbar */}
        <Navbar open={open} toggleSidebar={toggleSidebar} />
        <Layout style={{ marginTop: 64 }}>
          {/* Side bar */}
          <SideBar
            open={open}
            setOpen={setOpne}
            isSmallScreen={isSmallScreen}
          />
          {/*Main Content */}
          <Content
            style={{
              padding: open ? 5 : 10,
              marginLeft: open ? 0 : 200,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              {/* Login */}
              <Route
                path="/login"
                element={
                  <Authenticated>
                    <Login />
                  </Authenticated>
                }
              />
              {/* Home Page*/}
              <Route
                path="/"
                element={
                  <AuthenticatedRoute>
                    <Home />
                  </AuthenticatedRoute>
                }
              />
              {/* Create Car */}
              <Route
                path="/car/create"
                element={
                  <AuthenticatedRoute>
                    <CreateCar />
                  </AuthenticatedRoute>
                }
              />

              {/* Page Not found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Routing;
