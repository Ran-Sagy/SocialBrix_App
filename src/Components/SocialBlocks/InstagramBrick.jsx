import React from "react";
import { Card, Badge } from "antd";
import Avatar from "react-avatar";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useQuery } from "react-query";
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import Lottie from "react-lottie-player";
import analyzing from "../../assets/analyzing.json";
import { fetchInstagranData } from "../../Services/instagramService";
import { getGrowthByPersentage } from "../Utils/calculations";
import { assetTypeIcons } from "../Utils/socialIcons";

function InstagramBrick({
  fetching = false,
  instagram_username,
  id,
  assetType,
  db,
  user,
  expended = false,
  fetchBlocksAgain,
  reFetchBricks,
}) {
  const params = {
    username: instagram_username,
    email: user?.email,
  };

  console.log("params", params);
  const { data: instagramLiveData } = useQuery(
    ["instagramLiveData", params],
    fetchInstagranData,
    {
      enabled: !!user?.email,
      staleTime: 60000 * 60 * 24, // 24 hours
      retry: 1,
      cacheTime: 60000 * 60 * 24,
      refetchOnMount: false,
    }
  );

  const { Meta } = Card;

  const blockData = instagramLiveData?.data?.data;
  const graph = instagramLiveData?.data?.graph;

  console.log("blockData-insta", blockData);
  // console.log("graph123", graph);
  // console.log("db", db);

  const growth = getGrowthByPersentage(
    db?.last_followers_count,
    blockData?.followers
  );

  let graphData = [];
  graph?.map((event) =>
    graphData.push({ date: event.date, followers: event.followers })
  );
  console.log("graphData", graphData);

  return (
    <div key={id} className="instagram-brick socialBlock">
      <Badge.Ribbon text={assetTypeIcons[assetType]}>
        <Card
          hoverable
          loading={fetching || !blockData || !blockData?.full_name}
          actions={[
            <div className="socialBlock-green">
              {!fetching && (
                <span className="socialBlock-grey-counter">
                  {blockData?.followers?.toLocaleString()} Folowers
                </span>
              )}
            </div>,
            <div className="grey-counter">
              {!fetching && (
                <span className="margin-left">
                  {blockData?.following?.toLocaleString()} following
                </span>
              )}
            </div>,

            <div className="grey-counter">
              {growth > 0 && !fetching ? (
                <span className="socialBlock-green-green">
                  ({growth}%) <AiOutlineCaretUp />
                </span>
              ) : growth === 0 && !fetching ? (
                <span className="socialBlock-red">({growth}%)</span>
              ) : (
                !fetching && (
                  <span className="socialBlock-red">
                    ({growth}%) <AiOutlineCaretDown />
                  </span>
                )
              )}
            </div>,
          ]}
        >
          <Meta
            avatar={
              <Avatar
                src={blockData?.profile_pic_url_proxy}
                size={expended ? 80 : 60}
                round={false}
              />
            }
            title={blockData?.full_name}
            description={
              !expended
                ? `${blockData?.bio?.substring(0, 40)}${
                    blockData?.bio?.length > 40 ? "..." : ""
                  }`
                : blockData?.bio
            }
          />
          <div className={"margin-top-2"}>
            {graphData.length > 1 ? (
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart width={300} height={100} data={graphData}>
                  <Area
                    type="linear"
                    dataKey="followers"
                    stroke="#83B69F"
                    fill="rgba(50, 197, 110, 0.1)"
                    strokeWidth={3}
                  />
                  {/* <Line type="monotone" dataKey="engagment" stroke="#82ca9d" /> */}
                  {expended ? <CartesianGrid strokeDasharray="1 1" /> : null}
                  {expended ? <XAxis dataKey={"date"} /> : null}
                  {expended ? <YAxis /> : null}
                  <Tooltip />
                  {/* <Legend /> */}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="graph-placeholder">
                <Lottie
                  loop
                  play
                  style={{
                    // paddingTop: "10%",
                    margin: "auto",
                    width: 100,
                    height: 100,
                    align: "center",
                  }}
                  animationData={analyzing}
                />
                <span className="graph-placeholder-text">
                  Graph will apear when enough data is collected
                </span>
              </div>
            )}
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
}

export default InstagramBrick;
