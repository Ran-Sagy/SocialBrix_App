import React from "react";
import { Card, Avatar } from "antd";
import { Collapse } from "antd";

function SideDrawerOpportunity({
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
  fullDescription,
  reference,
  id,
}) {
  const { Meta } = Card;
  const { Panel } = Collapse;

  return (
    <div key={id} className="opportunity sideBar">
      <Card hoverable loading={fetching}>
        <Meta
          avatar={<Avatar src={companyAvatar} size={28} round={false} />}
          title={title}
          description={description}
        />
        <Collapse>
          <Panel header="More about this opportunity" key="1">
            <p>{fullDescription}</p>
          </Panel>
          <Panel header="Reference" key="2">
            <p>{reference}</p>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
}

export default SideDrawerOpportunity;
