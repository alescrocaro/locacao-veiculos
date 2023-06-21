import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import { useToken } from '../../context/AuthContext';

const Login = () => {
  const { handleLogin, loading } = useToken();

  const handleSubmit = (values) => {
    console.log(values);
    handleLogin(values.email, values.password);
  }


  return (
    <div className='container'>
      <Form
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        className='form'
      >
        <h1> 
          Faça o login
        </h1>
        <Form.Item
          name="email"
          rules={[
            { 
              required: true 
            },
            {
              type: 'email',
              message: 'Insira um email válido',
            }
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Email"
            className="input"
            disabled={loading}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Senha"
            className="input"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item>
          <Button 
            htmlType="submit" 
            loading={loading}
          >
            Entrar
          </Button>
        </Form.Item>
        <div>
          <p>Não possui conta? <Button type='link'>Cadastre-se</Button></p>
        </div>
      </Form>
    </div>
  );
};

export default Login;