import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const NoutFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleBack}>
          <HomeOutlined />
          Back Home
        </Button>
      }
    />
  );
};

export default NoutFound;
