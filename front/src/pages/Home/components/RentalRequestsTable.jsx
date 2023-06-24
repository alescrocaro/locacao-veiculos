import React from "react";
import { Button, Table } from "antd";
import { useToken } from "../../../context/AuthContext";

const RentalRequestsTable = ({ rentalRequests, loading }) => {

  const columns = [
    {
      title: 'Vehicle',
      dataIndex: 'vehicle'
    },
    {
      title: 'Locador',
      dataIndex: 'lessor_name'
    },
    {
      title: 'Locatário',
      dataIndex: 'lessee_name'
    },
    {
      title: 'Início',
      dataIndex: 'rental_start',
      render: rentalStart => {
        //moment
        return rentalStart
      }
    },
    {
      title: 'Fim',
      dataIndex: 'rental_end',
      render: rentalEnd => {
        return rentalEnd
      }
    },
  ]


  return (
    <Table
      dataSource={rentalRequests}
      columns={columns}
      scroll={{ x: true }}
      loading={loading}
      rowKey={row => row.id}
    />
  )
}

export default RentalRequestsTable;