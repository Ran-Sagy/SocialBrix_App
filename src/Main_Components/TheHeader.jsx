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
import { FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { CgLockUnlock } from "react-icons/cg";
import { MdDashboard, MdSettings } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { useSelector } from "react-redux";
import SearchBox from "../Components/Search/SearchBox";

const { Header } = Layout;

function TheHeader({ userDetails }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const fetching = useSelector((state) => state.fetching);
  const userData = useSelector((state) => state.currentUserData);
  const [selectedNavBarItem, setSelectedNavBarItem] = useState("dashboard");
  const history = useHistory();

  // console.log(user);
  // console.log("currentUser", userDetails);

  const handleLogOut = () => {
    logout();
    logoutAndRemoveToken();
    window.location = "/login";
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
        <Link to="/profile">
          <div className="menu-row">Profile</div>
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<CgLockUnlock />} title="Upgrade">
        <Link to="/profile">
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
              style={{ padding: "10px" }}
              src="https://res.cloudinary.com/prodme-app-cloud-6/image/upload/v1639859653/SocialBrix__1_-removebg-preview_sj1aza.png"
              alt="Logo"
              // width="140px"
              height="72px"
            />
          </div>
        </Col>
        {/* <Col lg={4} xl={4}></Col> */}
        <Col lg={18} xl={18}>
          <div className="header-menu">
            <div
              onClick={() => setSelectedNavItem("dashboard")}
              className={
                selectedNavBarItem === "dashboard"
                  ? "header-menu-item-selected"
                  : "header-menu-item"
              }
            >
              {/* <span style={{ marginRight: "0.3rem" }}>
                <MdDashboard />
              </span> */}
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
              {/* <span style={{ marginRight: "0.3rem" }}>
                <IoAnalyticsSharp />
              </span> */}
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
              {/* <span style={{ marginRight: "0.3rem" }}>
                <MdSettings />{" "}
              </span> */}
              Settings{" "}
            </div>
          </div>
        </Col>
        <Col xs={3} sm={2} md={2} lg={1} xl={1}>
          {fetching && <Spin style={{ padding: "1rem" }} />}
        </Col>
        <Col xs={3} sm={2} md={3} lg={2} xl={2}>
          <span className="header-user-dropdown">
            <Dropdown overlay={avatarMenu}>
              <Button type="text">
                <span className="header-user-avatar">
                  <Avatar
                    src={user?.picture}
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
