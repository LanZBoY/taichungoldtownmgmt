import React  from "react";
import TopBar from './Components/TopBar'
import { Carousel } from "react-bootstrap";
import photo1 from './statics/ZjKCJl2.png'
import photo2 from './statics/1592851764_100097.jpg'
import photo3 from './statics/08b202e9ea8181249c0b525f281a773b.jfif'
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
                    <h3>秋紅谷</h3>
                    <p>位在市中心</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={photo2}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>我不知道這是哪裡</h3>
                    <p>但是很漂亮</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={photo3}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>台中湖心亭</h3>
                    <p>
                        欣賞漂亮湖景
                    </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
};

export default HomePage;