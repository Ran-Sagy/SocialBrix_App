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
import { fetchTwitterData } from "../../Services/twitterService";
import moment from "moment";
// import graphData from "../../mockData";

function TwitterBrick({
  fetching = false,
  twitter_username,
  id,
  assetType,
  db,
  user,
  expended = false,
}) {
  // const [readyTofetch, setReadyToFetch] = useState(true);
  console.log("twitter_username", twitter_username);

  const params = {
    username: twitter_username,
    email: user?.email,
  };

  console.log("params", params);
  const { data: twitterLiveData } = useQuery(
    ["twitterLiveData", params],
    fetchTwitterData,
    {
      enabled: !!user?.email,
      staleTime: 60000 * 60 * 24, // 24 hours
      retry: 1,
      cacheTime: 60000 * 60 * 24,
      refetchOnMount: false,
    }
  );

  const { Meta } = Card;

  const blockData = twitterLiveData?.data.data;
  const graph = twitterLiveData?.data?.graph;

  console.log("blockData", blockData);
  console.log("db", db);

  const growth = getGrowthByPersentage(
    db?.last_followers_count,
    blockData?.followers_count
  );
  console.log("growth", growth);

  console.log("db.graph", db.graph);
  let graphData = [];
  graph?.map((event) =>
    graphData.push({
      name: blockData?.name,
      date: moment(event.date).format("DD/MM/yyyy"),
      followers: event.followers,
    })
  );

  console.log("graphData", graphData);

  // useEffect(() => {
  //   fetchBlocksAgain(reFetchBricks + 1);
  // }, [blockData]);

  return (
    <div key={id} className="twitter-brick socialBlock">
      <Badge.Ribbon text={assetTypeIcons[assetType]}>
        <Card
          className={expended ? "expended" : ""}
          hoverable
          loading={fetching || !blockData || !blockData?.name}
          actions={[
            <div className="socialBlock-green">
              {!fetching && (
                <span className="socialBlock-grey-counter">
                  {blockData?.followers_count.toLocaleString()} Folowers
                </span>
              )}
            </div>,
            <div className="grey-counter">
              {!fetching && (
                <span className="margin-left">
                  {blockData?.friends_count.toLocaleString()} Following
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
                src={blockData?.profile_image_url_https}
                size={expended ? 80 : 60}
                round={false}
              />
            }
            title={blockData?.name}
            description={
              !expended
                ? `${blockData?.description.substring(0, 40)}${
                    blockData?.description.length > 40 ? "..." : ""
                  }`
                : blockData?.description
            }
          />
          <div className={"margin-top-2"}>
            {graphData.length > 1 ? (
              <ResponsiveContainer width="100%" height={expended ? 250 : 122}>
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

export default TwitterBrick;
