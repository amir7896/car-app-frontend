import React from "react";
import { Layout, Menu, theme } from "antd";
import { CarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = (props) => {
  const { open, setOpen, isSmallScreen } = props;
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [{ label: "Cars", key: "Cars", icon: <CarOutlined /> }];

  const handleMenuClick = (key) => {
    switch (key) {
      case "Cars":
        navigate("/");
        break;
      default:
        break;
    }
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
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
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
