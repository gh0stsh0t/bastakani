import React from "react";
import { Tabs } from "antd";
import { UserProfile, UserApplication } from "../components";
const { TabPane } = Tabs;

const Profile = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Tabs defaultActiveKey="1" style={{ width: "50%" }}>
        <TabPane tab="Edit User Details" key="1">
          <UserProfile />
        </TabPane>
        <TabPane tab="Apply" key="2">
          <UserApplication />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
