import React from "react";
import { Form, Input, Button, Row, Select } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Result } from "antd";
import Success from "../../assets/sucsess";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

// import ExploreOppprtunity from "../Explore/ExploreOpportunity";

function SubmissionSentConfirmation({ onClose }) {
  const history = useHistory();
  const fetching = useSelector((state) => state.fetching);

  const goToCampaigns = () => {
    history.push("/campaigns");
  };

  return (
    <div className="proposal-done">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Result
          status="success"
          icon={<Success width={"200px"} />}
          title="Oh yes!"
          subTitle="The track is now avialble for listening at the publisher dashboard, he will listen to it and you'll be updated soon!"
          extra={[
            <Button onClick={onClose} type="primary" key="console">
              Cool
            </Button>,
          ]}
        />
      </motion.div>
    </div>
  );
}

export default SubmissionSentConfirmation;
