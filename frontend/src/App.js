import "./App.css";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Home, Admin, Profile, Apply } from "./pages";

const { Header } = Layout;

function App() {
  return (
    <Router>
      <div className="App">
        <Layout className="layout">
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="1">
                <HashLink to="/#home">Home</HashLink>
              </Menu.Item>
              <Menu.Item key="2">
                <HashLink to="/#services">Services</HashLink>
              </Menu.Item>
              <Menu.Item key="3">
                <HashLink to="/#contact">Contact</HashLink>
              </Menu.Item>
            </Menu>
          </Header>
          <div style={{ marginTop: 70, padding: "0 50px" }}>
            <Switch>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/apply">
                <Apply />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
