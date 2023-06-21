import { useEffect, useState } from "react";
import { Card, notification } from "antd";
import Layout from "../../components/Layout/Layout";
import { useToken } from "../../context/AuthContext";
import VehiclesTable from "./VehiclesTable";
import { api } from "../../services/api";


const Home = () => {
	const [vehicles, setVehicles] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	const { user } = useToken();
	console.log(user);

	useEffect(() => {
		const fetchVehicles = async () => {
			return await api.get('/vehicles');
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
		<Layout>
			<Card 
				title="Veículos"
			>
				<VehiclesTable vehicles={vehicles} loading={isLoading} />
			</Card>
		</Layout>
	)
}

export default Home;