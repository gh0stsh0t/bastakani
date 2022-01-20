import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Row, Form, Input, Button, Typography } from "antd";

import { config } from "../utils";
const { Title } = Typography;

const UserProfile = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  useEffect(() => {
    retrieveUser();
  }, []);
  const retrieveUser = async () => {
    try {
      let res = await axios.get(
        (process.env.REACT_APP_BASE_URL || "") + "/api/users/profile",
        config()
      );
      form.setFieldsValue(res.data);
    } catch (err) {
      if (err.response.status === 401) {
        history.push("/");
      }
      console.log(err);
    }
  };
  const onFinish = async (body) => {
    let bodyTrimmed = Object.keys(body)
      .filter((k) => body[k] != null)
      .reduce((a, k) => ({ ...a, [k]: body[k] }), {});
    await axios.put(
      (process.env.REACT_APP_BASE_URL || "") + "/api/users/profile",
      bodyTrimmed,
      config()
    );
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 4,
      },
    },
  };
  return (
    <>
      <Row style={{ justifyContent: "center" }}>
        <Title>Edit Profile</Title>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Form
          style={{ width: "100%" }}
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="firstName" label="First name">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last name">
            <Input />
          </Form.Item>
          <Form.Item name="contactNumber" label="Contact Number">
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
};

export default UserProfile;
