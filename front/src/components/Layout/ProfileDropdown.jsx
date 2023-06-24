import { Dropdown, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useToken } from '../../context/AuthContext';




const ProfileDropdown = () => {
  const { user, handleLogout } = useToken();
  
  const items = [
    {
      label: 'Sair',
      key: '0',
      onClick: handleLogout

    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.6rem', color: 'white' }}>
        {user?.nick_name ?? ''}
        <UserOutlined 
          style={{ 
            fontSize: '40px', 
            marginRight: '1rem', 
            cursor: 'pointer',
          }}
        />
      </div>
    </Dropdown>
)};

export default ProfileDropdown;