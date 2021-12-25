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
import SubmissionSentConfirmation from "../../Components/Submit/SubmissionSentConfirmation";
import moment from "moment";

function OpportunitySideDrawer({
  selectedProposalId,
  onClose,
  visible,
  placement = "right",
}) {
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.fetching);
  const [selectedProposal, setSelectedProposal] = useState({});
  const [loading, setLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState("uploadTrack");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchProposal = async () => {
      try {
        const response = await getSingleProposal(selectedProposalId);
        console.log(response);
        if (response.status === 200) {
          setSelectedProposal(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchProposal();
  }, []);

  console.log("selectedProposal", selectedProposal);
  console.log("loading", loading);
  return (
    <Drawer
      title={loading ? "Loading..." : "Submit to this proposal"}
      placement={placement}
      width={"35vw"}
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
      <SideDrawerOpportunity
        companyAvatar={
          selectedProposal.companyAvatar ||
          "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=612x612&w=0&h=8J3VgOZab_OiYoIuZfiMIvucFYB8vWYlKnSjKuKeYQM="
        }
        title={selectedProposal.title}
        description={`${selectedProposal.payout}$ |  ${moment(
          selectedProposal.deadline,
          "YYYYMMDD"
        ).fromNow()}`}
        fullDescription={selectedProposal.fullDescription}
        fetching={loading}
        reference={selectedProposal.reference}
      />
      {submissionStatus === "uploadTrack" ? (
        <UploadFileInput
          setSubmissionStatus={setSubmissionStatus}
          setFileName={setFileName}
          setFileUrl={setFileUrl}
        />
      ) : submissionStatus === "form" ? (
        <SubmittionForm
          selectedProposalId={selectedProposalId}
          fileName={fileName}
          fileUrl={fileUrl}
          setSubmissionStatus={setSubmissionStatus}
        />
      ) : submissionStatus === "done" ? (
        <SubmissionSentConfirmation onClose={onClose} />
      ) : null}
    </Drawer>
  );
}

export default OpportunitySideDrawer;
