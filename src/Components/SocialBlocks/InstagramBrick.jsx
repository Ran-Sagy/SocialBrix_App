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

function InstagramBrick({
  fetching = false,
  instagram_username,
  id,
  assetType,
  db,
  currentUserData,
  fetchBlocksAgain,
  reFetchBricks,
}) {
  // const [readyTofetch, setReadyToFetch] = useState(true);
  console.log("instagram_username", instagram_username);

  const params = {
    username: instagram_username,
    email: currentUserData?.email,
  };

  console.log("params", params);
  const { data: instagramLiveData, status } = useQuery(
    ["instagramLiveData", params],
    fetchInstagranData,
    {
      enabled: !!currentUserData,
      staleTime: 60000 * 60 * 24, // 24 hours
      retry: 1,
      cacheTime: 60000 * 60 * 24,
      refetchOnMount: false,
    }
  );

  const { Meta } = Card;

  // const blockData = instagramLiveData?.data.data; // dev
  const blockData = instagramLiveData?.data; // prod

  console.log("blockData", blockData);
  console.log("db", db);

  const growth = getGrowthByPersentage(
    db?.last_followers_count,
    blockData?.followers
  );

  let graphData = [];
  db.graph.map((event) =>
    graphData.push({ date: event.date, followers: event.followers })
  );
  console.log("graphData", graphData);

  useEffect(() => {
    fetchBlocksAgain(reFetchBricks + 1);
  }, [blockData]);

  return (
    <div key={id} className="instagram-brick socialBlock">
      <Badge.Ribbon text={assetTypeIcons[assetType]}>
        <Card
          hoverable
          loading={fetching || !blockData || !blockData?.full_name}
          actions={[
            <div className="socialBlock-green">
              {!fetching && (
                <span className="socialBlock-green-green">
                  {blockData?.followers} Folowers
                </span>
              )}
            </div>,
            <div className="explore-deadline">
              {!fetching && (
                <span className="margin-left">
                  {blockData?.following} following
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
                src={blockData?.profile_pic_url_proxy}
                size={60}
                round={false}
              />
            }
            title={blockData?.full_name}
            description={`${blockData?.bio.substring(0, 40)}${
              blockData?.bio.length > 40 ? "..." : ""
            }`}
          />
          <div className={"margin-top-2"}>
            {graphData.length > 1 ? (
              <ResponsiveContainer width="100%" height={150}>
                <LineChart width={300} height={100} data={graphData}>
                  <Line
                    type="monotone"
                    dataKey="followers"
                    stroke="#32c56e"
                    strokeWidth={2}
                  />
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

export default InstagramBrick;
