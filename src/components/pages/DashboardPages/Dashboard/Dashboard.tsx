import React, { useState } from "react";
import { Row, Col, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
// import { useGetUsersDataQuery } from "../../../../features/users/usersApiSlice";

const Dashboard = () => {
//   const { data: userData } = useGetUsersDataQuery(1);
  const  userData: any  = [];

  console.log(userData);
  interface DataType {
    key: React.Key;
    date: any;
    name: string;
    email: any;
    phone: any;
    gender: any;
    age: any;
    voucher: any;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Age Bracket",
      dataIndex: "age",
    },
    {
      title: "Voucher",
      dataIndex: "voucher",
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < userData?.length; i++) {
    const date = new Date(userData[i]?.created_at);

    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    data.push({
      key: userData[i]?.id,
      date: formattedDate,
      name: `${userData[i]?.first_name} ${userData[i]?.last_name}`,
      email: userData[i]?.email,
      phone: userData[i]?.phone_number,
      gender: userData[i]?.gender,
      age: userData[i]?.age,
      voucher: userData[i]?.code,
    });
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return (
    <Row
      justify="center"
      style={{ minHeight: "91vh" }}
      className="gap_container"
    >
      <Col xs={22} sm={22} md={20} lg={20}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </Col>
    </Row>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
