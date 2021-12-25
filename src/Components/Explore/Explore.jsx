import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { FireOutlined } from "@ant-design/icons";
import SkeletonPlaceholder from "../Utils/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import ExploreOppprtunity from "./ExploreOpportunity";
import { setFetchingStage } from "../../actions/fetching.actions";
import { getProposals } from "../../Services/proposals";
import PerfectScrollbar from "react-perfect-scrollbar";
import { companyLogo } from "../../config.json";
import OpportunitySideDrawer from "../../Main_Components/Containers/OpportunitySideDrawer";
import moment from "moment";

function Explore() {
  const fetching = useSelector((state) => state.fetching);
  const [proposals, setProposals] = useState([]);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState("");

  const dispatch = useDispatch();

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSubmitTrack = (id) => {
    setSelectedProposalId(id);
    console.log("submit", id);
    showDrawer(id);
  };

  useEffect(() => {
    dispatch(setFetchingStage(true));
    let fetchProposals = async () => {
      let cred = {
        page: page,
      };
      try {
        const response = await getProposals(cred);
        console.log("getProposalsResponse", response);
        if (response.data.Proposals.length === 0) setLoadMore(false);
        setProposals((proposals) => [...proposals, ...response.data.Proposals]);
      } catch (err) {
        console.log(err);
      }
      dispatch(setFetchingStage(false));
    };
    fetchProposals();
  }, [page]);

  const showDrawer = () => {
    setSize("large");
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSelectedProposalId(null);
  };

  console.log("object of proposals: ", proposals);

  if (fetching) {
    return (
      <div style={{ marginTop: "5rem" }}>
        <SkeletonPlaceholder />
        <SkeletonPlaceholder />
        <SkeletonPlaceholder />
        <SkeletonPlaceholder />
      </div>
    );
  } else {
    return (
      <div className="site-card-wrapper explore-body">
        <Row justify="space-around">
          <Col xl={5} lg={0} md={0} sm={24} xs={0} mdjustify="space-around">
            <Row>
              <div className="explore-title">Explore</div>
            </Row>
            <Row>
              <div className="explore-subtitle">find your next opportunity</div>
            </Row>
            <Row>
              {/* <div className="explore-subtitle-small">Limit payout amount</div> */}
            </Row>
          </Col>
          <Col xl={12} lg={12} md={23} sm={24} xs={24} justify="space-around">
            <div style={{ height: "82vh", marginTop: "1.2rem" }}>
              <PerfectScrollbar>
                {/* <div className="explore-searchbox">
                  <SearchBox placeholder={"Search opportunities"} />
                </div> */}

                {proposals.map((proposal) => {
                  console.log(proposal);
                  console.log(moment(proposal.deadline, "YYYYMMDD").fromNow());

                  return (
                    <ExploreOppprtunity
                      flag={proposal.flag || "off"}
                      flagColor={"#f50"}
                      flagText={<FireOutlined />}
                      fetching={fetching}
                      payoutAmount={proposal.payout}
                      deadLine={proposal.deadline}
                      submitted={false}
                      companyAvatar={proposal.companyAvatar || companyLogo}
                      title={proposal.title}
                      description={proposal.brief}
                      id={proposal._id}
                      handleSubmitTrack={handleSubmitTrack}
                    />
                  );
                })}
              </PerfectScrollbar>
            </div>
          </Col>
          <Col
            className="explore-right-column"
            xl={6}
            lg={0}
            md={0}
            sm={0}
            xs={0}
            justify="space-around"
          >
            <Row>
              <div className="explore-title-right">Your last submission</div>
            </Row>
            <Row>
              <div className="explore-subtitle-small">
                You did not submit to any opportunities yet
              </div>
            </Row>
          </Col>
        </Row>
        {selectedProposalId && (
          <OpportunitySideDrawer
            onClose={onClose}
            visible={visible}
            size={size}
            selectedProposalId={selectedProposalId}
          />
        )}
      </div>
    );
  }
}

export default Explore;
