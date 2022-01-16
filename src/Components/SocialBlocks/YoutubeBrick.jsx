import React from "react";
import { Card, Badge } from "antd";
import Avatar from "react-avatar";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useQuery } from "react-query";
import {
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
} from "recharts";
import Lottie from "react-lottie-player";
import analyzing from "../../assets/analyzing.json";
// import { fetchInstagranData } from "../../Services/instagramService";
import { getGrowthByPersentage } from "../Utils/calculations";
import { assetTypeIcons } from "../Utils/socialIcons";
// import { fetchTiktokData } from "../../Services/tiktokService";
import { fetchYoutubeData } from "../../Services/youtubeService";
import moment from "moment";

function YoutubeBrick({
  fetching = false,
  youtube_channel_id,
  id,
  assetType,
  db,
  user,
  expended = false,
}) {
  const params = {
    youtube_channel_id: youtube_channel_id,
    email: user?.email,
  };

  console.log("params", params);
  const { data: youtubeLiveData } = useQuery(
    ["youtubeLiveData", params],
    fetchYoutubeData,
    {
      enabled: !!user?.email,
      staleTime: 60000 * 60 * 24, // 24 hours
      retry: 1,
      cacheTime: 60000 * 60 * 24,
      refetchOnMount: false,
    }
  );

  const { Meta } = Card;

  const blockData = youtubeLiveData?.data?.data;
  const graph = youtubeLiveData?.data?.graph;

  console.log("blockData-youtube", blockData);
  console.log("db", db);

  const growth = getGrowthByPersentage(
    db?.last_subscribers_count,
    blockData?.statistics?.subscriberCount
  );

  console.log("db.graph youtube", db.graph);
  let graphData = [];
  graph?.map((event) =>
    graphData.push({
      name: blockData?.user?.uniqueId,
      date: moment(event.date).format("MM/yyyy"),
      subscribers: event.subscribers,
    })
  );
  console.log("graphData", graphData);

  // useEffect(() => {
  //   fetchBlocksAgain(reFetchBricks + 1);
  // }, [blockData]);

  return (
    <div
      key={id}
      className={`${expended ? "expended" : ""} youtube-brick socialBlock`}
    >
      <Badge.Ribbon text={assetTypeIcons[assetType]}>
        <Card
          hoverable
          loading={fetching || !blockData || !blockData?.snippet?.title}
          actions={[
            <div className="socialBlock-green">
              {!fetching && (
                <span className="socialBlock-grey-counter">
                  {Number(
                    blockData?.statistics?.subscriberCount
                  ).toLocaleString()}{" "}
                  {blockData?.statistics?.subscriberCount < 99999999
                    ? "Subscribers"
                    : "Subs"}
                </span>
              )}
            </div>,
            <div className="grey-counter">
              {!fetching && (
                <span className="margin-left">
                  {Number(blockData?.statistics?.viewCount).toLocaleString()}{" "}
                  Views
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
                src={blockData?.snippet?.thumbnails?.default?.url}
                size={expended ? 80 : 60}
                round={false}
              />
            }
            title={blockData?.snippet?.title}
            description={
              !expended
                ? `${blockData?.snippet?.description.substring(0, 40)}${
                    blockData?.snippet?.description.length > 40 ? "..." : ""
                  }`
                : blockData?.snippet?.description
            }
          />
          <div className={"margin-top-2"}>
            {graphData.length > 1 ? (
              <ResponsiveContainer width="100%" height={122}>
                <AreaChart width={300} height={100} data={graphData}>
                  <Area
                    type="linear"
                    dataKey="subscribers"
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

export default YoutubeBrick;
