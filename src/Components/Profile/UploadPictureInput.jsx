import React, { useState } from "react";
// import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { InboxOutlined } from "@ant-design/icons";
import {
  uploadFileProfilePic,
  uploadFileTrack,
} from "../../Services/fileUploadService";
import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Button } from "antd/lib/radio";
import { updateProfilePic } from "../../Services/userService";
import { useSelector } from "react-redux";

function UploadPictureInput({
  setSubmissionStatus,
  setFileName,
  setFileUrl,
  setLoading,
}) {
  const currentUser = useSelector((state) => state.currentUser);
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileForServer, setFileForServer] = useState("");

  //   const onChange = ({ fileList: newFileList }) => {
  //     setFileList(newFileList);
  //   };

  console.log("currentUser", currentUser);

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  //   const { Dragger } = Upload;

  // const handleFileUpload = async () => {
  //   console.log("Uploading file...");
  // };

  const handleUploadFile = async () => {
    setLoading(true);
    const file = fileForServer;
    try {
      const response = await uploadFileProfilePic(file);
      console.log(response);
      setFileUrl(response.data.path);
      const response2 = await updateProfilePic(currentUser._id, {
        url: response.data.path,
      });
      console.log(response2);
      setLoading(false);
      setSubmissionStatus("done");
    } catch (error) {
      console.log("File upload error: ", error);
    }
  };

  const onChange = async (info) => {
    console.log("info", info.file); // TODO remove this
    const fileType = beforeUpload(info.file);
    if (fileType) {
      const selectedFile = info.file;
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(info.file);
        reader.onload = () => resolve(reader.result);
      });
      setSelectedFile(src);
      const fd = new FormData();
      fd.append("file", selectedFile);
      setFileForServer(fd);
    }
  };

  const beforeUpload = (file) => {
    if (file.type !== "image/png") {
      message.error(`${file.name} is not a png/jpg file`);
    }
    return file.type === "image/png" ? true : false;
  };

  return (
    <div className={"uploader"}>
      <ImgCrop rotate>
        <Upload
          customRequest={onChange}
          listType="picture-card"
          fileList={fileList}
          onPreview={onPreview}
        >
          <div width="300px" className="ant-upload-drag-icon">
            {!selectedFile && "Selcet / Drag Your file here"}
            {selectedFile ? (
              <div>
                <img width="100px" src={selectedFile} alt={"profile_image"} />
              </div>
            ) : (
              ""
            )}
          </div>
        </Upload>
      </ImgCrop>

      {selectedFile && <Button onClick={handleUploadFile}>Upload!</Button>}
    </div>
  );
}

export default UploadPictureInput;
