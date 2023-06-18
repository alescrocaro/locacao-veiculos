import { Dropdown, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useToken } from '../../context/AuthContext';


const ProfileDropdown = () => {
  const { handleLogout } = useToken();
  
  const items = [
    {
      label: <a onClick={handleLogout}>Sair</a>,
      key: '0',
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <UserOutlined 
        style={{ 
          fontSize: '40px', 
          marginRight: '1rem', 
          cursor: 'pointer'
        }}
      />
    </Dropdown>
)};

export default ProfileDropdown;