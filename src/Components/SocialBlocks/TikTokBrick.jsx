import React, { useEffect, useState } from "react";
import { Card, Badge, Skeleton } from "antd";
import Avatar from "react-avatar";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useQuery } from "react-query";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import Lottie from "react-lottie-player";
import analyzing from "../../assets/analyzing.json";
import { fetchInstagranData } from "../../Services/instagramService";
import { getGrowthByPersentage } from "../Utils/calculations";
import { assetTypeIcons } from "../Utils/socialIcons";
import { fetchTiktokData } from "../../Services/tiktokService";

function TikTokBrick({
  fetching = false,
  tiktok_username,
  id,
  assetType,
  db,
  user,
  fetchBlocksAgain,
  reFetchBricks,
}) {
  // const [readyTofetch, setReadyToFetch] = useState(true);
  console.log("tiktok_username", tiktok_username);

  const params = {
    username: tiktok_username,
    email: user?.email,
  };

  console.log("params", params);
  const { data: tiktokLiveData, status } = useQuery(
    ["tiktokLiveData", params],
    fetchTiktokData,
    {
      enabled: !!user?.email,
      staleTime: 60000 * 60 * 24, // 24 hours
      retry: 1,
      cacheTime: 60000 * 60 * 24,
      refetchOnMount: false,
    }
  );

  const { Meta } = Card;

  const blockData = tiktokLiveData?.data.data; // dev
  const graph = tiktokLiveData?.data?.graph;

  console.log("blockData", blockData);
  console.log("db", db);

  const growth = getGrowthByPersentage(
    db?.last_followers_count,
    blockData?.stats?.followerCount
  );

  console.log("db.graph", db.graph);
  let graphData = [];
  graph?.map((event) =>
    graphData.push({
      name: blockData?.user?.uniqueId,
      date: event.date,
      followers: event.followers,
    })
  );
  console.log("graphData", graphData);

  // useEffect(() => {
  //   fetchBlocksAgain(reFetchBricks + 1);
  // }, [blockData]);

  return (
    <div key={id} className="tiktok-brick socialBlock">
      <Badge.Ribbon text={assetTypeIcons[assetType]}>
        <Card
          hoverable
          loading={fetching || !blockData || !blockData?.user?.uniqueId}
          actions={[
            <div className="socialBlock-green">
              {!fetching && (
                <span className="socialBlock-green-green">
                  {blockData?.stats?.followerCount.toLocaleString()} Folowers
                </span>
              )}
            </div>,
            <div className="explore-deadline">
              {!fetching && (
                <span className="margin-left">
                  {blockData?.stats?.heart.toLocaleString()} Hearts
                </span>
              )}
            </div>,

            <div className="explore-deadline">
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
                src={blockData?.user?.avatarLarger}
                size={60}
                round={false}
              />
            }
            title={blockData?.user?.uniqueId}
            description={`${blockData?.user?.signature.substring(0, 40)}${
              blockData?.user?.signature.length > 40 ? "..." : ""
            }`}
          />
          <div className={"margin-top-2"}>
            {graphData.length > 1 ? (
              <ResponsiveContainer width="100%" height={75}>
                <LineChart width={300} height={100} data={graphData}>
                  <Line
                    type="monotone"
                    dataKey="followers"
                    stroke="#32c56e"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="engagment" stroke="#82ca9d" />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="graph-placeholder">
                <Lottie
                  loop
                  play
                  style={{
                    paddingTop: "10%",
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

export default TikTokBrick;
