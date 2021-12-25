import React, { useState } from "react";
import { Row, Col } from "antd";
import { Avatar } from "antd";

// import SkeletonPlaceholder from "../Utils/Skeleton";
import SearchBox from "../Search/SearchBox";
import { searchSpotify } from "../../Services/spotifyService";

function Playground() {
  //   const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResult] = useState([]);

  const handleSearch = async (searchValue) => {
    const query = { searchValue: searchValue };
    setLoading(true);
    const data = await searchSpotify(query);
    console.log(data);
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Row justify="space-around">
        <Col xs={20} sm={16} md={12} lg={12} xl={12}>
          <SearchBox
            loading={loading}
            placeholder="Search for artist name or song"
            handleSearch={handleSearch}
          />
        </Col>
      </Row>

      <Row justify="space-around">
        {results &&
          results?.data?.Results.map((song) => (
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="song" key={song.name}>
                <span
                  className={`${
                    song.popularity < 30
                      ? "low"
                      : song.popularity < 60
                      ? "medium"
                      : "high"
                  }`}
                >
                  {" "}
                  {song.popularity}
                </span>
                <Avatar shape={"square"} src={song.album.images[1].url} />
                <span className="song-title">{song.name} | </span>
                <span className="artist-name"> {song.artists[0].name} | </span>
              </div>
            </Col>
          ))}
      </Row>
      <Row justify="space-around">
        <Col xs={23} sm={23} md={23} lg={23} xl={23}></Col>
      </Row>
    </div>
  );
}

export default Playground;
