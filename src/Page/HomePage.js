import React  from "react";
import TopBar from './Components/TopBar'
import mapNow from './statics/map_now.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'
const HomePage = () => {
    return(
        <>
           <TopBar currentKey={'homepage'}/>
           <img className="map" src={mapNow} alt='城中城地圖'></img>
        </>
    )
};

export default HomePage;