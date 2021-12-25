import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { InboxOutlined } from "@ant-design/icons";
import { uploadFileTrack } from "../../Services/fileUploadService";

function UploadFileInput({ setSubmissionStatus, setFileName, setFileUrl }) {
  const { Dragger } = Upload;

  const handleFileUpload = async () => {
    console.log("Uploading file...");
  };

  const beforeUpload = (file) => {
    if (file.type !== "audio/mpeg") {
      message.error(`${file.name} is not a mp3 file`);
    }
    return file.type === "audio/mpeg" ? true : Upload.LIST_IGNORE;
  };

  const onChange = async (info) => {
    if (info.fileList.length === 0) {
      console.log("remove");
      return;
    }

    const fileType = beforeUpload(info.fileList[0].originFileObj);
    if (fileType) {
      const selectedFile = info.fileList[0].originFileObj;
      const fd = new FormData();
      fd.append("file", selectedFile);

      try {
        const response = await uploadFileTrack(fd);
        console.log(response);
        setFileUrl(response.data.path);
        setFileName(info.fileList[0].name);
        setSubmissionStatus("form");
      } catch (error) {
        console.log("File upload error: ", error);
      }
    }
  };

  return (
    <div className={"uploader"}>
      <Dragger
        beforeUpload={beforeUpload}
        onChange={onChange}
        customRequest={handleFileUpload}
        maxCount={1}
        status={"success"}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          The only file type supported is mp3 files.
        </p>
      </Dragger>
    </div>
  );
}

export default UploadFileInput;
