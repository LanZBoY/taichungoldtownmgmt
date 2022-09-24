import React  from "react";
import TopBar from './Components/TopBar'
import { Carousel } from "react-bootstrap";
import photo1 from './statics/IMG_0227.JPG'
import photo2 from './statics/IMG_0279.JPG'
import photo3 from './statics/IMG_E0245.JPG'
import 'bootstrap/dist/css/bootstrap.min.css';
const HomePage = () => {
    return(
        <>
           <TopBar currentKey={'homepage'}/>
           <Carousel interval={5000}>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={photo1}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>台中歌劇院</h3>
                    <p>位在市中心附近</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={photo2}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>逢甲大學圖書館</h3>
                    <p>很漂亮～</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={photo3}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>逢甲大學環境</h3>
                    <p>優閒的時光</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
};

export default HomePage;