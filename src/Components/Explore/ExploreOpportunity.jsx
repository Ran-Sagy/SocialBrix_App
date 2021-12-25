import React from "react";
import { Card, Badge } from "antd";
import Avatar from "react-avatar";
import {
  CheckCircleOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  SendOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useSelector } from "react-redux";

function ExploreOppprtunity({
  fetching,
  flag = "off",
  flagText,
  flagColor,
  payoutAmount,
  deadLine,
  submitted,
  companyAvatar,
  title,
  description,
  handleSubmitTrack,
  id,
}) {
  const { Meta } = Card;
  const userData = useSelector((state) => state.currentUserData);

  return (
    <div key={id} className="opportunity">
      <Badge.Ribbon className={flag} text={flagText} color={flagColor}>
        <Card
          hoverable
          actions={[
            <div className="socialBlock-green">
              {/* <DollarCircleOutlined /> */}
              <span className="socialBlock-green-green">${payoutAmount}</span>
            </div>,
            <div className="explore-deadline">
              <FieldTimeOutlined />
              <span className="margin-left">
                {moment(deadLine, "YYYYMMDD").fromNow()}
              </span>
            </div>,
            submitted ? (
              <div className="explore-deadline">
                <CheckCircleOutlined />
                <span className="margin-left">Track Submitted!</span>
              </div>
            ) : (
              <div
                onClick={() => handleSubmitTrack(id)}
                className="explore-deadline"
              >
                <SendOutlined />
                <span className="margin-left">Submit Track</span>
              </div>
            ),
          ]}
          loading={fetching}
        >
          <Meta
            avatar={<Avatar src={companyAvatar} size={28} round={false} />}
            title={title}
            description={description}
          />
        </Card>
      </Badge.Ribbon>
    </div>
  );
}

export default ExploreOppprtunity;
