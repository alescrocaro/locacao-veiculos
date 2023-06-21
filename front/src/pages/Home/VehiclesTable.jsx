import React from "react";
import { Button, Table } from "antd";
import { useToken } from "../../context/AuthContext";

const VehiclesTable = ({ vehicles, loading }) => {

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
      title: 'Câmbio',
      dataIndex: 'automatic',
      render: automatic => {
        return automatic ? 'Automático' : 'Manual';
      }
    },
    {
      title: 'Disponibilidade',
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
          href={`/veiculo/${record.id}`}
        >
          {available ? 'Fazer pedido' : 'Alugado'}
        </Button>;
      }
    },
    {
      title: 'Placa',
      dataIndex: 'plate'
    },
  ]


  return (
    <Table
      dataSource={vehicles}
      columns={columns}
      scroll={{ x: true }}
      loading={loading}
    />
  )
}

export default VehiclesTable;