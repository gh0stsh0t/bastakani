import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { config } from "../utils";

const AdminApplications = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [applications, setApplications] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const history = useHistory();

  useEffect(() => {
    retrieveApplications();
  }, []);

  const retrieveApplications = async () => {
    try {
      let res = await axios.get(
        (process.env.REACT_APP_BASE_URL || "") + "/api/applications",
        config()
      );
      setApplications(res.data);
    } catch (err) {
      if (err.response.status === 401) {
        history.push("/");
      }
      console.log(err);
    }
  };

  const approveApplications = async () => {
    try {
      let res = await axios.post(
        (process.env.REACT_APP_BASE_URL || "") + "/api/applications/approve",
        { id: selectedRowKeys },
        config()
      );
      await retrieveApplications();
    } catch (err) {
      if (err.response.status === 401) {
        history.push("/");
      }
      console.log(err);
    }
  };
  const denyApplications = async () => {
    try {
      let res = await axios.post(
        (process.env.REACT_APP_BASE_URL || "") + "/api/applications/decline",
        { id: selectedRowKeys },
        config()
      );
      await retrieveApplications();
    } catch (err) {
      if (err.response.status === 401) {
        history.push("/");
      }
      console.log(err);
    }
  };
  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "address",
      dataIndex: "address",
    },
    {
      title: "contactNumber",
      dataIndex: "contactNumber",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "nationality",
      dataIndex: "nationality",
    },
    {
      title: "sex",
      dataIndex: "sex",
    },
    {
      title: "birthdate",
      dataIndex: "birthdate",
    },
    {
      title: "height",
      dataIndex: "height",
    },
    {
      title: "weight",
      dataIndex: "weight",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: 16 }}>
        <Col>
          <Button type="primary" onClick={retrieveApplications}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </Col>
        <Col style={{ flex: 1 }} />
        <Col>
          <Button
            type="primary"
            onClick={approveApplications}
            disabled={!hasSelected}
          >
            Approve
          </Button>{" "}
          <Button
            type="danger"
            onClick={denyApplications}
            disabled={!hasSelected}
          >
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
        dataSource={applications.map((item) => ({ ...item, key: item.id }))}
      />
    </>
  );
};

export default AdminApplications;
