import { useEffect, useState } from "react";
import { Button, Card, Menu, Popover, notification } from "antd";
import { CarOutlined, ContainerOutlined } from '@ant-design/icons';
import Layout from "../../components/Layout/Layout";
import { useToken } from "../../context/AuthContext";
import VehiclesTable from "./components/VehiclesTable";
import { api } from "../../services/api";
import CreateVehicleModal from "./components/CreateVehicleModal";
import RentalRequestsTable from "./components/RentalRequestsTable";
import { useRealtime, useSubscription } from "react-supabase";



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
	const [isLoading, setIsLoading] = useState([]);
	const [itemKey, setItemKey] = useState('vehicles');
	const [isCreateVehicleModalVisible, setIsCreateVehicleModalVisible] = useState(false);

	const [{ data: rentalRequestsRT, error, fetching }, reexecute] = useRealtime('RENTAL_REQUEST');
	const [rentalRequests, setRentalRequests] = useState([]);

	useEffect(() => {
		setRentalRequests(rentalRequestsRT);
		console.log('setting...')
	}, [rentalRequestsRT]);


	useSubscription(
    (payload) => {
      console.log('Change received!', payload)
      console.log(
        payload?.eventType === 'UPDATE' &&
        user.id === payload?.new?.lessee_id &&
        payload?.new?.accepted
      )
      console.log(payload?.eventType)
      console.log(user.id)
      console.log(payload?.new?.lessee_id)
      console.log(payload?.new?.accepted)
      if (
        payload?.eventType === 'UPDATE' &&
        user.id === payload.new?.lessee_id &&
        payload?.new?.accepted
      ) {
        console.log('entrou')
        notification.info({
          message: 'Rental request accepted'
        })
      } else if (
        payload?.eventType === 'DELETE'
      ) {
        // const userRequesterId = rentalRequestsRT?.map(request => {
        //   if (request.id === payload.old.id) {
        //     console.log('returned', request.lessee_id)
        //     return request.lessee_id;
        //   }
        // }).filter(val => val)[0];
				// console.log(userRequesterId)
        // reexecute();
          // .then(() => {
          //   if (user.id === userRequesterId){
          //     notification.info({
          //       message: 'Rental request rejected'
          //     })
          //   }
          // })
      } if (
        payload?.eventType === 'INSERT' && 
        user.id === payload.new.lessor_id
      ) {
        reexecute();
        notification.info({
          message: 'Rental request received'
        })
      }
    },
    {
      event: '*',
      table: 'RENTAL_REQUEST',
    },
  )

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
	}, [rentalRequestsRT]);

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
						<VehiclesTable vehicles={vehicles} setRentalRequests={setRentalRequests} loading={isLoading} />
					</Card>
				)}
				{itemKey === 'rental-requests' && user?.type === 'LESSOR' && (
					<Card title="Pedidos de aluguel">
						<RentalRequestsTable 
							rentalRequests={rentalRequests} 
							setRentalRequests={setRentalRequests} 
							setVehicles={setVehicles} 
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