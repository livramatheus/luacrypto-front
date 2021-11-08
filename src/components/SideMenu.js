import MenuItem from './MenuItem';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import TrackChangesRoundedIcon from '@material-ui/icons/TrackChangesRounded';
import SpeedRoundedIcon from '@material-ui/icons/SpeedRounded';

import { Link } from 'react-router-dom';

export default function SideMenu() {

    const menuItems = [
        { destination: '/'               , img: <DashboardRoundedIcon/>   , name: "Home" },
        { destination: '/moeda'          , img: <TrackChangesRoundedIcon/>, name: "Lista de Interesse" },
        { destination: '/etf'            , img: <ShowChartRoundedIcon/>   , name: "ETFs" },
        { destination: '/medo-e-ganancia', img: <SpeedRoundedIcon/>       , name: "Medo e Ganância" }
    ];

    return (
        <nav id="menu">
            <Link to="/" id="logo" title="Lua Crypto" style={{backgroundImage: `url('/images/logo_light_horizontal.svg')`}}>

            </Link>

            <div className="menu-section">
                {
                    menuItems.map((item) => {
                        return (<MenuItem
                            destination={item.destination}
                            img={item.img}
                            name={item.name}
                            key={item.name}
                        />)
                    })
                }
            </div>
        </nav>
    );

}