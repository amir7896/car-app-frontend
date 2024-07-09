import React from "react";
import { Button, Table, Space } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import CarApi from "../../services/apis/Car.Api";

const Home = () => {
  const navigate = useNavigate();

  const { data: carData } = useQuery("GET_CARS", () => CarApi.getCars());

  // Handle create car
  const handleCreateCar = () => {
    navigate("/car/create");
  };

  // Columns for the table
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Model",
      dataIndex: "carModel",
      key: "carModel",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    // Showing first picture of an array
    {
      title: "Picture",
      dataIndex: "pictures",
      key: "pictures",
      render: (pictures) =>
        pictures && pictures?.length > 0 ? (
          <img src={pictures[0].secure_url} alt="car" style={{ width: 100 }} />
        ) : (
          "No picture"
        ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EyeOutlined />} />
          <Button type="primary" icon={<EditOutlined />} />
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreateCar}
        style={{ marginBottom: "20px" }}
      >
        Create Car
      </Button>
      {carData && carData.length > 0 ? (
        <Table columns={columns} dataSource={carData} />
      ) : (
        <h1>No data exists</h1>
      )}
    </div>
  );
};

export default Home;
