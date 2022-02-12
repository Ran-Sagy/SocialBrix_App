import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { Layout, Dropdown } from "antd";
// import { Avatar } from "antd";
import Avatar from "react-avatar";
import { Spin } from "antd";
import { Menu } from "antd";
import { logoutAndRemoveToken } from "../Services/userService";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { FiLogOut, FiUser } from "react-icons/fi";
import { CgLockUnlock } from "react-icons/cg";
import { SiGoogleanalytics } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
// import { IoAnalyticsSharp } from "react-icons/io5";
import { useHistory } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import { useAuth, AdminPortal, useTenantsState } from "@frontegg/react";

import { useSelector } from "react-redux";
// import SearchBox from "../Components/Search/SearchBox";

const { Header } = Layout;

function TheHeader({ userDetails }) {
  const { user } = useAuth();
  const tenantsState = useTenantsState();
  // const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const fetching = useSelector((state) => state.fetching);
  // const userData = useSelector((state) => state.currentUserData);
  const [selectedNavBarItem, setSelectedNavBarItem] = useState("dashboard");
  const history = useHistory();

  const handleLogOut = () => {
    logoutAndRemoveToken();
    setTimeout(() => {
      window.location = "/account/logout";
    }, 1000);
  };

  const setSelectedNavItem = (item) => {
    if (item !== selectedNavBarItem) {
      history.push(`/${item}`);
      setSelectedNavBarItem(item);
    }
  };

  // const loading = true;
  const avatarMenu = (
    <Menu>
      <Menu.Item key="1" icon={<FiUser />} title="Profile">
        <div onClick={() => AdminPortal.show()} className="menu-row">
          Profile
        </div>
      </Menu.Item>
      <Menu.Item key="3" icon={<CgLockUnlock />} title="Upgrade">
        <Link to="/upgrade">
          <div className="menu-row">Upgrade</div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" icon={<FiLogOut />} title="Log out">
        <div className="menu-row">
          <span href="/" onClick={handleLogOut}>
            Log out
          </span>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="header" style={{ padding: 0 }}>
      <Row>
        <Col
          style={{ borderRight: "1px solid rgba(222, 226, 228, 0.425)" }}
          lg={3}
          xl={3}
        >
          <div className="header-logo">
            <img
              style={{ padding: "5px" }}
              src="https://res.cloudinary.com/prodme-app-cloud-6/image/upload/v1644706686/Kaching/SocialBrix-2-removebg-preview_xyiy4t.png"
              alt="Logo"
              width="140px"
              // height="72px"
            />
          </div>
        </Col>
        {/* <Col lg={4} xl={4}></Col> */}
        <Col span={16}>
          <div className="header-menu">
            <div
              onClick={() => setSelectedNavItem("dashboard")}
              className={
                selectedNavBarItem === "dashboard"
                  ? "header-menu-item-selected"
                  : "header-menu-item"
              }
            >
              <span className="header-icon">
                <MdDashboard />
              </span>
              Dashboard
            </div>
            <div
              onClick={() => setSelectedNavItem("analytics")}
              className={
                selectedNavBarItem === "analytics"
                  ? "header-menu-item-selected"
                  : "header-menu-item"
              }
            >
              <span className="header-icon ml-2">
                <SiGoogleanalytics />
              </span>
              Analytics
            </div>
            <div
              onClick={() => setSelectedNavItem("settings")}
              className={
                selectedNavBarItem === "settings"
                  ? "header-menu-item-selected"
                  : "header-menu-item"
              }
            >
              <span className="header-icon">
                <CgOptions />
              </span>
              Settings
            </div>
          </div>
        </Col>
        <Col span={1}>{fetching && <Spin style={{ padding: "1rem" }} />}</Col>
        <Col className="sm-title-grey max-width-1" span={2}>
          {tenantsState?.tenants[0]?.name
            ? tenantsState?.tenants[0]?.name
            : user.name}
        </Col>
        <Col xs={3} sm={2} md={3} lg={2} xl={2}>
          <span className="header-user-dropdown">
            <Dropdown overlay={avatarMenu}>
              <Button type="text">
                <span className="header-user-avatar">
                  <Avatar
                    src={user?.profilePictureUrl}
                    name={user?.name}
                    size={28}
                    color={"#32c56e"}
                  />
                </span>

                {/* <span className="header-user-name">
                  {user.name.split(" ")[0]}
                </span> */}
                <DownOutlined />
              </Button>
            </Dropdown>
          </span>
        </Col>
      </Row>
    </Header>
  );
  // }
}

export default TheHeader;
