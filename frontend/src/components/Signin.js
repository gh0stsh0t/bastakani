import React from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Signin = (props) => {
  const { isModalVisible, handleOk, handleCancel } = props;
  let history = useHistory();
  const onFinish = async (body) => {
    try {
      let res = await axios.post(
        (process.env.REACT_APP_BASE_URL || "") + "/api/auth/signin",
        body
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      if (res.data.roles.includes("ROLE_ADMIN")) {
        history.push("/admin");
      } else {
        history.push("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Signin;
