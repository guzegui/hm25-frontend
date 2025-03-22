import {Link} from 'react-router-dom'
import ConnectLink from '../qubic/connect/ConnectLink'
import logo from '../../assets/logo/HM25.svg'

const Header = () => {
    return (
        <div
            className="fixed h-[78px] flex w-full z-10 top-0 items-center border-b border-solid border-gray-70 bg-gray-90 justify-between px-6">
            <div className="flex items-center gap-8">
                <Link to="/">
                    <img src={logo} alt="msvault logo" className="h-14 w-auto"/>
                </Link>
                <Link to="/projects" className="text-white hover:text-gray-300">
                    Projects
                </Link>
            </div>
            <ConnectLink/>
        </div>
    )
}

export default Header
