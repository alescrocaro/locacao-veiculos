import { Card, Col, Form, Input, Modal, Row, notification } from "antd";
import React, { useState } from "react";
import { api } from "../../../services/api";

const CreateVehicleModal = ({ isVisible, setIsVisible, setVehicles }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const createVehicle = async (data) => {
    return await api.post('/vehicles', data);
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log(values);
    setIsLoading(true);
    createVehicle()
      .then(response => {
        const newVehicle = response.data;
        console.log(newVehicle);
        setVehicles(prevData => ({
          newVehicle,
          ...prevData,
        }));
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
    // handleLogin(values.email, values.password);
  }

  const handleClose = () => {
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
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default CreateVehicleModal;
