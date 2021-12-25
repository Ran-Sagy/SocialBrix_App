import React from "react";
import { Skeleton, Row, Col } from "antd";

function SkeletonPlaceholder() {
  return (
    <Row justify="space-around">
      <Col xs={20} sm={22} md={23} lg={23} xl={23}>
        <Skeleton active />
      </Col>
    </Row>
  );
}

export default SkeletonPlaceholder;
