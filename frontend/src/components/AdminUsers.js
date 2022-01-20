import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "antd";
import axios from "axios";
import { config } from "../utils/headers";
config;

const AdminUsers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [users, setUsers] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = async () => {
    try {
      let res = await axios.get(
        (process.env.REACT_APP_BASE_URL || "") + "/api/users",
        config()
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "email",
      dataIndex: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: 16 }}>
        <Col>
          <Button
            type="primary"
            onClick={retrieveUsers}
            disabled={!hasSelected}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </Col>
        <Col style={{ flex: 1 }} />
        <Col>
          <Button type="primary" onClick={() => {}} disabled={!hasSelected}>
            Approve
          </Button>{" "}
          <Button type="danger" onClick={() => {}} disabled={!hasSelected}>
            Decline
          </Button>
        </Col>
      </Row>
      <Table
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: setSelectedRowKeys,
          getCheckboxProps: (record) => ({
            name: record.name,
          }),
        }}
        columns={columns}
        dataSource={users}
      />
    </>
  );
};

export default AdminUsers;
