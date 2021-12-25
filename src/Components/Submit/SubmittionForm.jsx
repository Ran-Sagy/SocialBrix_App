import React from "react";
import { Form, Input, Button, Row, Avatar } from "antd";
import { newSubmission } from "../../Services/submissionsService";

function SubmittionForm({
  fileName,
  fileUrl,
  selectedProposalId,
  setSubmissionStatus,
}) {
  const onSubmit = async (values) => {
    const submission = {
      fileUrl: fileUrl,
      fileName: fileName,
      pitch: values.pitch,
      selectedProposalId: selectedProposalId,
    };
    const response = await newSubmission(submission);
    console.log(response);
    if (response.status === 200) {
      setSubmissionStatus("done");
    }
  };

  return (
    <>
      <div className="margin-top-2 ">
        <div className="flex-row">
          <Avatar
            src={"https://i.pravatar.cc/300"}
            color={"#2FA5FE"}
            shape={"square"}
            size={30}
          />
          <h2 className="margin-left-2 medium-title">{fileName}</h2>
        </div>
        <Form
          name="proposal-form"
          className="proposal-form"
          onFinish={onSubmit}
        >
          <Form.Item
            name="pitch"
            rules={[
              {
                required: false,
                min: 0,
                max: 500,
                message: "500 characters Max",
              },
            ]}
          >
            <Input.TextArea placeholder="Say somthing / let the music talk." />
          </Form.Item>

          <Form.Item>
            <Row>
              {false ? (
                <Button type="primary" loading>
                  Loading
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  shape="round"
                >
                  Submit!
                </Button>
              )}
            </Row>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default SubmittionForm;
