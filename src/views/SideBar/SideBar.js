import React, { useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { CarOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = (props) => {
  const { open, setOpen, isSmallScreen } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [{ label: "Cars", key: "/", icon: <CarOutlined /> }];

  const handleMenuClick = (key) => {
    navigate(key);
  };

  const handleListItemClick = () => {
    if (isSmallScreen) {
      setOpen(true);
    }
  };

  return (
    <Sider
      theme="dark"
      width={200}
      hidden={open}
      style={{
        background: colorBgContainer,
        height: "calc(100vh - 64px)",
        position: "fixed",
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        onClick={handleListItemClick}
      >
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => handleMenuClick(item.key)}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
