import React, { useEffect, useState } from "react";
import { Card, Avatar, Badge, Slider, Button, Row, Col } from "antd";
import {
  PlayCircleOutlined,
  StarOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { updateScore } from "../../Services/submissionsService";

function Submission({
  fetching,
  flag = "off",
  flagText,
  flagColor,
  payoutAmount,
  deadLine,
  submitted,
  artistAvatar,
  fileName,
  pitch,
  handleSubmitTrack,
  id,
  fileUrl,
  initialScore,
  calculateLeaderboard,
  addSongToPlaylist,
  submission,
}) {
  const { Meta } = Card;
  const [soundwaveWidth, setSoundwaveWidth] = useState(window.innerWidth);
  const [rate, setRate] = useState(false);
  const [newScore, setNewScore] = useState(0);
  //   const [audioLists, setAudioLists] = useState([
  //     { musicSrc: fileUrl, name: fileName },
  //   ]);
  const trimedUrl = fileUrl.split("upload/")[1];

  useEffect(() => {
    handleSoundwaveWidth();
  }, [soundwaveWidth]);

  const handleSoundwaveWidth = () => {
    const width = window.innerWidth > 1600 ? 1000 : 500;
    setSoundwaveWidth(width);
  };

  const handleScoreChange = (e) => {
    setNewScore(e);
  };
  const handleNewScoreSave = async () => {
    if (newScore !== initialScore) {
      const newScoreobj = {
        score: newScore,
      };
      try {
        const response = await updateScore(id, newScoreobj);
        if (response.status === 200) {
          setNewScore(response.data.score);
          setRate(false);
          calculateLeaderboard();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div key={id} className="submission">
      <Badge.Ribbon className={flag} text={flagText} color={flagColor}>
        <Card
          hoverable
          actions={[
            <div className="explore-deadline">
              <PlayCircleOutlined />
              <span
                onClick={() => addSongToPlaylist(submission)}
                className="margin-left"
              >
                {"Play"}
              </span>{" "}
            </div>,
            <div className="explore-deadline">
              {rate ? (
                <>
                  <Row className="flex-row">
                    <Col xs={2}></Col>
                    <Col xs={18}>
                      <Slider
                        defaultValue={initialScore}
                        disabled={false}
                        onChange={handleScoreChange}
                      />
                    </Col>

                    <Col xs={4}>
                      <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        size="small"
                        onClick={handleNewScoreSave}
                      />
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  {" "}
                  <StarOutlined />
                  <span onClick={() => setRate(true)} className="margin-left">
                    {"Rate"}
                  </span>{" "}
                </>
              )}
            </div>,
          ]}
          loading={fetching}
        >
          <Meta
            avatar={<Avatar src={artistAvatar} size={30} shape={"square"} />}
            title={fileName}
            description={pitch}
          />
          {/* <ReactAudioPlayer src={fileUrl} controls /> */}
          <img
            className="soundwave"
            alt="soundwave"
            src={`https://res.cloudinary.com/prodme-app-cloud-6/video/upload/c_scale,h_10,w_${soundwaveWidth}/b_transparent/co_rgb:85D4A7/fl_waveform/${trimedUrl}`}
          />
          {/* <ReactJkMusicPlayer audioLists={audioLists} mode="full" /> */}
        </Card>
      </Badge.Ribbon>
    </div>
  );
}

export default Submission;
