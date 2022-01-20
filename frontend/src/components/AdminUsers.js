import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "antd";
import axios from "axios";
import { config } from "../utils";
import { useHistory } from "react-router-dom";

const AdminUsers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [users, setUsers] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const history = useHistory();

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
      if (err.response.status === 401) {
        history.push("/");
      }
      console.log(err);
    }
  };
  const approveUsers = async () => {
    try {
      let res = await axios.post(
        (process.env.REACT_APP_BASE_URL || "") + "/api/users/approve",
        { id: selectedRowKeys },
        config()
      );
      await retrieveUsers();
    } catch (err) {
      if (err.response.status === 401) {
        history.push("/");
      }
      console.log(err);
    }
  };
  const denyUsers = async () => {
    try {
      let res = await axios.post(
        (process.env.REACT_APP_BASE_URL || "") + "/api/users/decline",
        { id: selectedRowKeys },
        config()
      );
      await retrieveUsers();
    } catch (err) {
      if (err.response.status === 401) {
        history.push("/");
      }
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
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
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
          <Button type="primary" onClick={retrieveUsers}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </Col>
        <Col style={{ flex: 1 }} />
        <Col>
          <Button type="primary" onClick={approveUsers} disabled={!hasSelected}>
            Approve
          </Button>{" "}
          <Button type="danger" onClick={denyUsers} disabled={!hasSelected}>
            Decline
          </Button>
        </Col>
      </Row>
      <Table
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns}
        dataSource={users.map((item) => ({ ...item, key: item.id }))}
      />
    </>
  );
};

export default AdminUsers;
