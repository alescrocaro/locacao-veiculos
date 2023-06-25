import { useEffect, useState } from "react";
import { Button, Card, Menu, Popover, notification } from "antd";
import { CarOutlined, ContainerOutlined } from '@ant-design/icons';
import Layout from "../../components/Layout/Layout";
import { useToken } from "../../context/AuthContext";
import VehiclesTable from "./components/VehiclesTable";
import { api } from "../../services/api";
import CreateVehicleModal from "./components/CreateVehicleModal";
import RentalRequestsTable from "./components/RentalRequestsTable";

const items = [
  {
    label: 'Vehicles',
    icon: <CarOutlined />,
		key: 'vehicles'
  },
  {
    label: 'Rental requests',
    icon: <ContainerOutlined />,
		key: 'rental-requests'
  },
];


const Home = () => {
	const [vehicles, setVehicles] = useState([]);
	const [rentalRequests, setRentalRequests] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	const [itemKey, setItemKey] = useState('vehicles');
	const [isCreateVehicleModalVisible, setIsCreateVehicleModalVisible] = useState(false);
	const { user } = useToken();

	const onMenuClick = (e) => { 
		setItemKey(e.key);
	}

	useEffect(() => {
		const fetchVehicles = async () => {
			return await api.get('/vehicles',  {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
		}
		setIsLoading(true);
		fetchVehicles()
			.then(({ data }) => {
				setVehicles(data.data);
			})
			.catch(err => {
				notification.error({
					message: 'Erro ao listar veículos',
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		const fetchRentalRequests = async () => {
			return await api.get('/rental-request',  {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
		}
		setIsLoading(true);
		fetchRentalRequests()
			.then(({ data }) => {
				setRentalRequests(data.data);
			})
			.catch(err => {
				notification.error({
					message: 'Erro ao listar pedidos',
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			<Layout>
				{user?.type === "LESSOR" && (
					<Menu onClick={onMenuClick} selectedKeys={[itemKey]} mode="horizontal" items={items}></Menu>
				)} 
				{itemKey === 'vehicles' && (
					<Card 
						title="Veículos" 
						extra={<>
							{user?.type === 'LESSOR' &&(
							<Button
								type="primary"		
								onClick={() => {
									setIsCreateVehicleModalVisible(true);
								}}
							>
								Novo carro
							</Button>)}</>
						}
					>
						<VehiclesTable vehicles={vehicles} loading={isLoading} />
					</Card>
				)}
				{itemKey === 'rental-requests' && user?.type === 'LESSOR' && (
					<Card title="Pedidos de aluguel">
						<RentalRequestsTable 
							rentalRequests={rentalRequests}
							setRentalRequests={setRentalRequests}
							loading={isLoading} 
						/>
					</Card>
				)}
			</Layout>
			{user?.type === 'LESSOR' &&
				<CreateVehicleModal 
					isVisible={isCreateVehicleModalVisible} 
					setIsVisible={setIsCreateVehicleModalVisible} 
					setVehicles={setVehicles}	
				/>
			}
		</>
	)
}

export default Home;