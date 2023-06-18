import logo from '../../assets/locarro.jpg';
import ProfileDropdown from './ProfileDropdown';
import './styles.css'

const Layout = ({ children }) => {
	
	return (
		<>
			<div className="header">
				<a href='/'>
					<img src={logo} alt="LOGO" width={80} />
				</a>
				<ProfileDropdown />
				
			</div>
			{children}
		</>
	)
}

export default Layout;