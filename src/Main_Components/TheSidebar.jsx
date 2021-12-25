import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { LineChartOutlined } from "@ant-design/icons";
import {
  ShopOutlined,
  UploadOutlined,
  PlusCircleOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const { Sider } = Layout;

const TheSidebar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const userPermission = currentUser.level;

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (path) => {
    history.push(`/${path}`);
  };

  if (userPermission === "basic")
    return (
      <Sider
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
        }}
        collapsible
        onCollapse={toggle}
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu theme="light" mode="inline">
          <Menu.Item
            key="1"
            icon={<LineChartOutlined />}
            onClick={() => handleClick("user-dashboard")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<ShopOutlined />}
            onClick={() => handleClick("explore")}
          >
            Explore
          </Menu.Item>

          <Menu.Item
            key="3"
            icon={<UploadOutlined />}
            onClick={() => handleClick("playground")}
          >
            Playground
          </Menu.Item>
        </Menu>
      </Sider>
    );
  if (userPermission === "company")
    return (
      <Sider
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
        }}
        collapsible
        onCollapse={toggle}
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu theme="light" mode="inline">
          <Menu.Item
            key="1"
            icon={<LineChartOutlined />}
            onClick={() => handleClick("company-dashboard")}
          >
            Dashboard
          </Menu.Item>
          {/* <Menu.Item
            key="2"
            icon={<ShopOutlined />}
            onClick={() => handleClick("Explore")}
          >
            Explore
          </Menu.Item> */}

          <Menu.Item
            key="4"
            icon={<DashboardOutlined />}
            onClick={() => handleClick("campaigns")}
          >
            Campaigns
          </Menu.Item>

          <Menu.Item
            key="3"
            icon={<PlusCircleOutlined />}
            onClick={() => handleClick("compose")}
          >
            Compose
          </Menu.Item>
        </Menu>
      </Sider>
    );
};

export default TheSidebar;
