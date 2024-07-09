import React from "react";
import { Col, Row, Form, Input, Button, Divider } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../utils/validations";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const response = await signin(values);

    if (response.success) {
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "50vh" }}>
      <Col span={24} md={8}>
        <Divider orientation="center">Login</Divider>

        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: loginValidation.email },
              { type: "email", message: loginValidation.validEmail },
            ]}
          >
            <Input
              placeholder="Email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              size="medium"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: loginValidation.password }]}
          >
            <Input.Password
              placeholder="Password"
              size="medium"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
