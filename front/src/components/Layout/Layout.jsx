import logo from '../../assets/locarro.jpg';
import ProfileDropdown from './ProfileDropdown';
import './styles.css'

const Layout = ({ children }) => {
	
	return (
		<>
			<div className="header">
				<a href='/home'>
					<img src={logo} alt="LOGO" width={80} />
				</a>
				<div style={{
					display: 'flex'
				}}>
					<ProfileDropdown />
				</div>
				
			</div>
			<div
				style={{
					margin: '50px'
				}}
			>
				{children}
			</div>
		</>
	)
}

export default Layout;
