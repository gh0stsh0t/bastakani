import React, { useState } from "react";
import { Tabs, Table, Button, Row, Col } from "antd";
import { AdminUsers, AdminApplications } from "../components";
const { TabPane } = Tabs;

function Admin() {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="User verification" key="1">
        <AdminUsers />
      </TabPane>
      <TabPane tab="Applications" key="2">
        <AdminApplications />
      </TabPane>
    </Tabs>
  );
}

export default Admin;
