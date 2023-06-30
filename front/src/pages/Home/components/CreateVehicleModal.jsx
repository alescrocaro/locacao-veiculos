import { Card, Col, Form, Input, Modal, Row, notification } from "antd";
import React, { useState } from "react";
import { api } from "../../../services/api";
import { useToken } from "../../../context/AuthContext";

const CreateVehicleModal = ({ isVisible, setIsVisible, setVehicles }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { user } = useToken();

  const createVehicle = async (data) => {
    return await api.post('/vehicles', data);
  }

  // Função para enviar requisição ao backend
  const handleSubmit = () => {
    const values = form.getFieldsValue();
    values['lessor_id'] = user.id;
    console.log(values);
    setIsLoading(true);
    createVehicle(values)
      .then(({ data: response }) => {
        console.log(response)
        const newVehicle = response.data[0];
        console.log(newVehicle)
        setVehicles(prevData => ([
          newVehicle,
          ...prevData,
        ]));
        handleClose();
      })
      .catch(err => {
        console.log(err);
        notification({
          message: 'Erro ao cadastrar veículo',
        })
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleClose = () => {
    console.log('handleClose')
    setIsVisible(false);
    form.resetFields();
  }

  return (
    <Modal
      open={isVisible}
      onCancel={handleClose}
      onOk={handleSubmit}
    >
      <Card title="Cadastrar veículo">
        <Form
          layout="vertical"
          form={form}
        >
          <Row gutter={[24]}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="name"
                rules={[
                  { 
                    required: true 
                  },
                ]}
                label="Nome"
              >
                <Input 
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="color"
                rules={[{ required: true }]}
                label="Cor"
              >
                <Input
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="plate"
                rules={[{ required: true }]}
                label="Placa"
              >
                <Input
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="price_per_day"
                rules={[{ required: true }]}
                label="Preço por dia"
              >
                <Input
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default CreateVehicleModal;
