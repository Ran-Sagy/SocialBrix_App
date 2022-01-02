import React, { useEffect, useState } from "react";
import { Row, Col, Button, Dropdown, Menu, Empty } from "antd";
import * as text from "../../constants/dashboard.json";
import greet from "../../Utils/greeter";
import { useDispatch, useSelector } from "react-redux";
import InstagramBrick from "../SocialBlocks/InstagramBrick";
import {
  fetchInstagranUserName,
  instagramNewAcountApi,
} from "../../Services/instagramService";
import {
  fetchTiktokUserName,
  tiktokNewAcountApi,
} from "../../Services/tiktokService";
import { setFetchingStage } from "../../actions/fetching.actions";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { getUserBricks } from "../../Services/bricksService";
import { SiTiktok } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import TikTokBrick from "../SocialBlocks/TikTokBrick";
import {
  addYoutubeChannel,
  fetchYoutubeChannel,
} from "../../Services/youtubeService";
import YoutubeBrick from "../SocialBlocks/YoutubeBrick";

function Dashboard({ user }) {
  const dispatch = useDispatch();
  // const currentUserData = useSelector((state) => state.currentUserData);
  const fetching = useSelector((state) => state.fetching);
  const [userBricks, setUserBricks] = useState([]);
  const [reFetchBricks, setReFetchBricks] = useState(0);
  const [email, setEmail] = useState(null);

  console.log("user", user);

  useEffect(() => {
    const fetchUserBricks = async () => {
      dispatch(setFetchingStage(true));
      const userEmail = { email: user.email };
      const response = await getUserBricks(userEmail);
      console.log("user bricks: ", response);
      setUserBricks(response.data.Bricks);
      dispatch(setFetchingStage(false));
    };

    fetchUserBricks();
  }, [reFetchBricks]);

  // Drawer operators

  const searchInstagramAcount = async () => {
    Swal.fire({
      title: "Enter Instagram username",
      input: "text",
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (username) => {
        const params = { username: username, email: user?.email };
        try {
          const response = await fetchInstagranUserName(params);
          console.log(response);
          return response;
        } catch (error) {
          console.log("error fetching username", error);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const { profile_pic_url_proxy } = result.value.data;
        console.log("result-insta", profile_pic_url_proxy);
        const selectedAcount = result.value;
        Swal.fire({
          title: "Is this the acount you looking for?",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No, start again`,
          imageUrl: profile_pic_url_proxy,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Amazing!",
              "Were adding this acount to your dashboard",
              "success"
            );
            console.log("instagramUsername", selectedAcount.data);
            // Add acount to DB
            addInstagramAcount(selectedAcount.data);
          } else {
            searchInstagramAcount();
          }
        });
      }
    });
  };
  const searchTikTokAcount = async () => {
    Swal.fire({
      title: "Enter TikTok username",
      input: "text",
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (username) => {
        const params = { username: username, email: user?.email };
        try {
          const response = await fetchTiktokUserName(params);
          console.log(response);
          return response;
        } catch (error) {
          console.log("error fetching username", error);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("result", result);
        console.log("result.data.user", result?.value.data.user);
        const { avatarLarger } = result?.value.data.user;
        console.log("result-Tiktok", avatarLarger);
        const selectedAcount = result?.value;
        Swal.fire({
          title: "Is this the acount you looking for?",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No, start again`,
          imageUrl: avatarLarger,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Amazing!",
              "Were adding this acount to your dashboard",
              "success"
            );
            console.log("tiktokUsername", selectedAcount.data);
            // Add acount to DB
            addTiktokAcount(selectedAcount.data);
          } else {
            searchTikTokAcount();
          }
        });
      }
    });
  };

  const searchYoutubeAcount = async () => {
    Swal.fire({
      title:
        "Enter Youtube channel ID Or paste a url of one of the channel's videos",
      input: "text",
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (channel) => {
        const params = { channel: channel, email: user?.email };
        try {
          const response = await fetchYoutubeChannel(params);
          console.log(response);
          return response;
        } catch (error) {
          console.log("error fetching channel", error);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("result", result);
        const avatar =
          result?.value.data.items[0].snippet.thumbnails.default.url;
        console.log("result-youtube", avatar.url);
        const selectedAcount = result?.value.data.items[0];
        Swal.fire({
          title: "Is this the acount you looking for?",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No, start again`,
          imageUrl: avatar,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Amazing!",
              "Were adding this acount to your dashboard",
              "success"
            );
            console.log("youtube channel", selectedAcount);
            // Add acount to DB
            addYoutubeChannel(selectedAcount);
          } else {
            searchYoutubeAcount();
          }
        });
      }
    });
  };

  const addInstagramAcount = async (selectedAcount) => {
    dispatch(setFetchingStage(true));
    const response = await instagramNewAcountApi(selectedAcount);
    console.log(response);
    if (response.data === "brick_is_set") {
      Swal.fire("This acount is allready set", "success");
    }
    setReFetchBricks(reFetchBricks + 1);
    dispatch(setFetchingStage(false));
  };
  const addTiktokAcount = async (selectedAcount) => {
    dispatch(setFetchingStage(true));
    const response = await tiktokNewAcountApi(selectedAcount);
    console.log(response);
    if (response.data === "brick_is_set") {
      Swal.fire("This acount is allready set", "success");
    }
    setReFetchBricks(reFetchBricks + 1);
    dispatch(setFetchingStage(false));
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={searchInstagramAcount}>
          {" "}
          <FaInstagram /> Instagram
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={searchTikTokAcount}>
          <SiTiktok /> TikTok
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={searchYoutubeAcount}>
          <IoLogoYoutube /> Youtube
        </div>
      </Menu.Item>
    </Menu>
  );

  // if (fetching) {
  //   return (
  //     <div style={{ marginTop: "5rem" }}>
  //       <SkeletonPlaceholder />
  //       <SkeletonPlaceholder />
  //       <SkeletonPlaceholder />
  //       <SkeletonPlaceholder />
  //     </div>
  //   );
  // } else {
  return (
    <div className="site-card-wrapper dashboard-body">
      <Row>
        <Col xs={17} sm={18} md={20} lg={22} xl={22}>
          <div className="greeting">
            {greet(user ? user.name : "unknown", new Date().getHours())}
          </div>
          <div className="greeting-description">{text.greetingDescription}</div>
        </Col>
        <Col style={{ marginTop: "1rem" }} xs={7} sm={6} md={2} lg={2} xl={2}>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button type="button" size={"middle"}>
              Add Acount
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Row justify="space-around">
        {userBricks?.length === 0 && !fetching && (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 200,
            }}
            description={
              <span className="empty-dashboard-text">
                Connect you'r first asset!
              </span>
            }
          >
            <Dropdown overlay={menu} placement="bottomRight">
              <Button type="button" size={"middle"}>
                Connect Acount
              </Button>
            </Dropdown>
          </Empty>
        )}
        {userBricks.map((brick) => {
          if (brick.type === "instagram") {
            return (
              // <div>insta</div>
              <Col xs={8}>
                <InstagramBrick
                  assetType={brick.type}
                  db={brick}
                  instagram_username={brick.instagram_username}
                  user={user}
                  // reFetchBricks={reFetchBricks}
                  // fetchBlocksAgain={setReFetchBricks}
                />
              </Col>
            );
          } else if (brick.type === "tiktok") {
            return (
              // <div>tiktok</div>
              <Col xs={8}>
                <TikTokBrick
                  assetType={brick.type}
                  db={brick}
                  tiktok_username={brick.tiktok_username}
                  user={user}
                  // reFetchBricks={reFetchBricks}
                  // fetchBlocksAgain={setReFetchBricks}
                />
              </Col>
            );
          } else if (brick.type === "youtube") {
            return (
              <Col xs={8}>
                <YoutubeBrick
                  assetType={brick.type}
                  db={brick}
                  youtube_channel_id={brick.youtube_channel_id}
                  user={user}
                  // reFetchBricks={reFetchBricks}
                  // fetchBlocksAgain={setReFetchBricks}
                />
              </Col>
            );
          } else {
            return null;
          }
        })}
      </Row>
    </div>
  );
}

export default Dashboard;
