import "./App.css";
import { Layout, Menu, Button, Row, Col, Image, Typography } from "antd";

import Home from "./pages/home";

const { Title } = Typography;
const { Header, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout className="layout">
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>Home</Menu.Item>
            <Menu.Item>Services</Menu.Item>
            <Menu.Item>Contact</Menu.Item>
          </Menu>
        </Header>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
