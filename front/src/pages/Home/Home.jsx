import { useEffect, useState } from "react";
import { Button, Card, notification } from "antd";
import Layout from "../../components/Layout/Layout";
import { useToken } from "../../context/AuthContext";
import VehiclesTable from "./components/VehiclesTable";
import { api } from "../../services/api";
import CreateVehicleModal from "./components/CreateVehicleModal";


const Home = () => {
	const [vehicles, setVehicles] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	const [isCreateVehicleModalVisible, setIsCreateVehicleModalVisible] = useState(false);
	const { user,  } = useToken();

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

	return (
		<>
			<Layout>
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