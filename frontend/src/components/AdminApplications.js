import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "antd";
import axios from "axios";

import { config } from "../utils/headers";

const AdminApplications = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [applications, setApplications] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = async () => {
    try {
      let res = await axios.get(
        (process.env.REACT_APP_BASE_URL || "") + "/api/applications",
        config()
      );
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: 16 }}>
        <Col>
          <Button type="primary" onClick={() => {}} disabled={!hasSelected}>
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
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
            setSelectedRowKeys(selectedRowKeys);
          },
          getCheckboxProps: (record) => ({
            name: record.name,
          }),
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default AdminApplications;
