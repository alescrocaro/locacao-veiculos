import React from "react";
import { Button, Popconfirm, Table, notification } from "antd";
import { useToken } from "../../../context/AuthContext";
import moment from "moment";
import { api } from "../../../services/api";

const RentalRequestsTable = ({ rentalRequests, setRentalRequests, loading }) => {
  const handleAcceptRentalRequest = async (id) => {
    return await api.put(`/rental-request/${id}`, { accepted: true });
  }

  const handleRejectRentalRequest = async (id) => {
    console.log('handleRejectRentalRequest')
    return await api.delete(`/rental-request/${id}`);
  }

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
        return moment(rentalStart).format('DD/MM/YYYY HH:mm:ss')
      }
    },
    {
      title: 'Fim',
      dataIndex: 'rental_end',
      render: rentalEnd => {
        return moment(rentalEnd).format('DD/MM/YYYY HH:mm:ss')
      }
    },
    {
      title: 'Actions',
      render: record => {
        return [
          <Popconfirm 
            okText={'Yes'}
            cancelText={'No'}
            onConfirm={() => {
              handleAcceptRentalRequest(record.id)
                .then(() => {
                  notification.success({
                    message: 'Request accepted'
                  })
                  setRentalRequests(prevData => prevData.map(data => {
                    if (data.id === record.id) {
                      data.accepted = true;
                    }
                    return data;
                  }))
                })
                .catch(() => {
                  notification.error({
                    message: 'Error accepting request'
                  })
                })
            }}
            title={'Do you really want to accept the request?'}
            disabled={record.accepted}
          >
            <Button type='primary' disabled={record.accepted}>
              {
                record.accepted ? 'Pedido aceito' :'Aceitar'
              }
            </Button>
          </Popconfirm>,
          ' ',
          <>
            {!record.accepted && (
            <Popconfirm
              okText={'Yes'}
              cancelText={'No'}
              onConfirm={() => {
                handleRejectRentalRequest(record.id)
                  .then(() => {
                    notification.success({
                      message: 'Request rejected'
                    })
                    setRentalRequests(prevData => prevData.filter(data => data.id !== record.id))
                  })
                  .catch(() => {
                    notification.error({
                      message: 'Error rejecting request'
                    })
                  })
              }}
              title={'Do you really want to accept the request?'}
            >
              <Button type='primary' danger>
                Rejeitar
              </Button>
            </Popconfirm>
          )}
        </>
        ]
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