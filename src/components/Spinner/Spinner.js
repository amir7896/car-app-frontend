import react from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./styles/style.css";
const Spinner = (props) => {
  const { loading } = props;

  const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
  const CustomSpinner = () => <Spin indicator={antIcon} />;

  return (
    <>
      {loading && (
        <div className="overlay">
          <div className="backdrop" />
          <CustomSpinner />
        </div>
      )}
    </>
  );
};

export default Spinner;
