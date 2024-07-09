import React from "react";
import { Button, Layout, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const { Text } = Typography;
const { Header } = Layout;

const Navbar = (props) => {
  const { open, toggleSidebar } = props;
  // States for notification dialog
  const { isLoggedIn, user, signout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    signout();
    toggleSidebar();
    navigate("/login");
    toast.success("Logout successfully");
  };
  return (
    <>
      <Header
        theme="light"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1677ff",
          color: "white",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* Left side content */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {!isLoginPage && (
            <Button
              type="primary"
              icon={open ? <RightOutlined /> : <LeftOutlined />}
              onClick={toggleSidebar}
            />
          )}
          {/* Application name */}
          <Text
            style={{
              marginLeft: 16,
              fontSize: 17,
              fontWeight: "bold",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            Car App
          </Text>
        </div>
        {/* Right side content */}
        {isLoggedIn && (
          <div>
            <Text style={{ color: "#ffffff", marginRight: 10 }}>
              {`${user?.username}`}
            </Text>
            <Button type="primary" size="medium" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Header>
    </>
  );
};

export default Navbar;
