import React from "react";
import { Button, Popconfirm, Table, notification } from "antd";
import { useToken } from "../../../context/AuthContext";
import { api } from "../../../services/api";
import moment from 'moment';

const VehiclesTable = ({ vehicles, setRentalRequests, loading }) => {
  const { user } = useToken();
  const handleMakeRentalRequest = async (record) => {
    const data = {
      vehicle_id: record.id,
      lessee_id: user?.id,
      lessor_id: record.lessor_id,
      rental_start: moment(),
      rental_end: moment().add(1, 'w')
    }
    return await api.post(`/rental-request`, data);
  }

  const columns = [
    {
      title: 'Preço/dia',
      dataIndex: 'price_per_day'
    },
    {
      title: 'Nome',
      dataIndex: 'name'
    },
    {
      title: 'Cor',
      dataIndex: 'color'
    },
    {
      title: 'Bancos',
      dataIndex: 'seats'
    },
    {
      title: 'Transmission',
      dataIndex: 'automatic',
      render: automatic => {
        return automatic ? 'Automatic' : 'Manual';
      }
    },
    {
      title: 'Availability',
      dataIndex: 'available',
      render: (available, record) => {
        return <Button 
          style={{ 
            backgroundColor: available ? '#2ECC71' : '#C0392B',
            fontWeight: 'bold',
            color: 'black',
            width: '100%',
          }} 
          disabled={!available}
          size='small'
          onClick={() => {
            if (user.type === 'LESSEE') {
              // setRentalRequestVehicleId(record.id);
              // setIsRentalRequestModalVisible(true);
            }
          }}
        >
          {available 
            ? 
              user.type === 'LESSEE' 
                ? 
                  <Popconfirm 
                    okText={'Yes'}
                    cancelText={'No'}
                    onConfirm={() => {
                      handleMakeRentalRequest(record)
                        .then(({ data }) => {
                          notification.success({
                            message: 'Request made, await for the response'
                          })
                          setRentalRequests(prevData => [data, ...prevData])
                        })
                        .catch(() => {
                          notification.error({
                            message: 'Error making request'
                          })
                        })
                    }}
                    title={'Do you really want to make the request?'}
                  >
                    Make request
                  </Popconfirm>
                : 'Available' 
            : 'Rented'
          }
        </Button>;
      }
    },
    {
      title: 'Plate',
      dataIndex: 'plate'
    },
  ]


  return (
    <>
      <Table
        dataSource={vehicles}
        columns={columns}
        scroll={{ x: true }}
        loading={loading}
        rowKey={row => row.id}
      />
    </>
  )
}

export default VehiclesTable;