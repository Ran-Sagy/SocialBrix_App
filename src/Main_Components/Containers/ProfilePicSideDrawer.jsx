import React, { useEffect, useState } from "react";
import { Drawer, Button, Space, Avatar } from "antd";
import { getSingleProposal } from "../../Services/proposals";
import { useDispatch, useSelector } from "react-redux";
import { setFetchingStage } from "../../actions/fetching.actions";
import SkeletonPlaceholder from "../../Components/Utils/Skeleton";
import { uploadFileTrack } from "../../Services/fileUploadService";
import SideDrawerOpportunity from "../../Components/Submit/SideDrawerOpportunity";
import UploadFileInput from "../../Components/Submit/UploadFileInput";
import SubmittionForm from "../../Components/Submit/SubmittionForm";
import UploadPictureInput from "../../Components/Profile/UploadPictureInput";
import { Result } from "antd";
import Success from "../../assets/sucsess";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

function ProfilePicSideDrawer({ onClose, visible, placement = "right" }) {
  const dispatch = useDispatch();
  //   const fetching = useSelector((state) => state.fetching);
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("uploadTrack");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  console.log("loading", loading);
  return (
    <Drawer
      title={loading ? "Loading..." : "Selecte profile picture"}
      placement={placement}
      width={"20vw"}
      onClose={onClose}
      visible={visible}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      }
    >
      {submissionStatus === "uploadTrack" ? (
        <UploadPictureInput
          setSubmissionStatus={setSubmissionStatus}
          setFileName={setFileName}
          setFileUrl={setFileUrl}
          setLoading={setLoading}
        />
      ) : submissionStatus === "form" ? (
        <SubmittionForm
          selectedProposalId={""}
          fileName={fileName}
          fileUrl={fileUrl}
          setSubmissionStatus={setSubmissionStatus}
        />
      ) : submissionStatus === "done" ? (
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
              subTitle="New image is ready"
              extra={[
                <Button onClick={onClose} type="primary" key="console">
                  Cool
                </Button>,
              ]}
            />
          </motion.div>
        </div>
      ) : null}
    </Drawer>
  );
}

export default ProfilePicSideDrawer;
