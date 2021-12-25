import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Avatar } from "antd";
import SkeletonPlaceholder from "../Utils/Skeleton";
import PerfectScrollbar from "react-perfect-scrollbar";
import ProfilePicSideDrawer from "../../Main_Components/Containers/ProfilePicSideDrawer";
import { companyLogo } from "../../config.json";

function UserProfileCompany() {
  const currentUser = useSelector((state) => state.currentUser);
  const fetching = useSelector((state) => state.fetching);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userData = useSelector((state) => state.currentUserData);
  console.log("currentUser", currentUser);

  if (fetching) {
    return (
      <div style={{ marginTop: "5rem" }}>
        <SkeletonPlaceholder />
        <SkeletonPlaceholder />
        <SkeletonPlaceholder />
        <SkeletonPlaceholder />
      </div>
    );
  } else {
    return (
      <div className="site-card-wrapper profile">
        <Row justify="space-around">
          <Col xl={5} lg={0} md={0} sm={24} xs={0} mdjustify="space-around">
            <Row>
              <div className="explore-title">Profile</div>
            </Row>
            <Row>
              <div
                onClick={() => setDrawerOpen(true)}
                className="profile-avatar"
              >
                <Avatar
                  src={userData?.avatar || companyLogo}
                  color={"#2FA5FE"}
                  round={"true"}
                  size={200}
                />
              </div>
            </Row>
            <Row>
              <div className="explore-subtitle">
                {currentUser.name}, {currentUser.level}
              </div>
            </Row>
            <Row>
              {/* <div className="explore-subtitle-small">Limit payout amount</div> */}
            </Row>
          </Col>
          <Col xl={12} lg={12} md={23} sm={24} xs={24} justify="space-around">
            <div style={{ height: "82vh", marginTop: "1.2rem" }}>
              <PerfectScrollbar></PerfectScrollbar>
            </div>
          </Col>
          <Col
            className="explore-right-column"
            xl={6}
            lg={0}
            md={0}
            sm={0}
            xs={0}
            justify="space-around"
          >
            <Row>
              <div className="explore-title-right">Your Info</div>
            </Row>
            <Row>
              <div className="explore-subtitle-small">Some user info</div>
            </Row>
          </Col>
        </Row>
        <ProfilePicSideDrawer
          onClose={() => setDrawerOpen(false)}
          visible={drawerOpen}
        />
      </div>
    );
  }
}

export default UserProfileCompany;
