import React, { useState } from "react";
import "../App.css";
import { Layout, Menu, Button, Row, Col, Image, Typography } from "antd";
import { Map, Marker } from "pigeon-maps";
import { DefaultImage, Signin, Signup } from "../components";

const { Title } = Typography;
const { Header, Footer } = Layout;
const Home = () => {
  const [modalOpen, setModalOpen] = useState("");

  const showSignIn = () => {
    setModalOpen("signin");
  };
  const showSignUp = () => {
    setModalOpen("signup");
  };
  const handleOk = () => {
    setModalOpen("");
  };

  const handleCancel = () => {
    setModalOpen("");
  };
  return (
    <>
      <Row
        style={{ padding: "0 50px", height: "90vh", alignItems: "center" }}
        id="home"
      >
        <Col span={3} offset={4}>
          <Row>
            <Title>Licensing of</Title>
          </Row>
          <Row>
            <Title>vehicle for</Title>
          </Row>
          <Row>
            <Title>everyone</Title>
          </Row>
          <Row>
            <Title level={3} style={{ textAlign: "left" }}>
              Learn from the experts
            </Title>
          </Row>
          <Row className="row-text" style={{ justifyContent: "space-between" }}>
            <Button type="primary" shape="round" onClick={showSignIn}>
              Sign In
            </Button>
            <Button type="primary" shape="round" onClick={showSignUp}>
              Sign Up
            </Button>
          </Row>
        </Col>
      </Row>
      <Row
        style={{ padding: "0 50px", height: "90vh", alignItems: "center" }}
        id="services"
      >
        <Col span={24}>
          <Row className="row-text">
            <Title>Services Offered</Title>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-around">
            <Col span={4}>
              <DefaultImage />
            </Col>
            <Col span={4}>
              <DefaultImage />
            </Col>
            <Col span={4}>
              <DefaultImage />
            </Col>
            <Col span={4}>
              <DefaultImage />
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer id="contact">
        <Row style={{ justifyContent: "center" }}>
          <div style={{ flex: 0.8, display: "flex", justifyContent: "left" }}>
            <div className="logo" />
          </div>
          <div style={{ flex: 1, display: "flex" }}>
            Ant Design ©2018 Created by Ant UED
          </div>
        </Row>
        <Row>
          <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
            <Marker width={50} anchor={[50.879, 4.6997]} />
          </Map>
        </Row>
      </Footer>
      <Signup
        isModalVisible={modalOpen === "signup"}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <Signin
        isModalVisible={modalOpen === "signin"}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default Home;
