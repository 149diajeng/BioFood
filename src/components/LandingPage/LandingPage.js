import "./LandingPage.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Container, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import logo from "../../images/biofoodoke.png"
import create  from "../../images/create.jpg"
import healthy from "../../images/healthy.jpg"
import review from "../../images/review.jpg"

const LandingPage = () => {
  // const [mostFavorite, setMostFavorite] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // Get All Foods
  // const getFoodList = () => {
  //   axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_BASEURL}/api/v1/foods`,
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_JWTTOKEN}`,
  //       apiKey: `${process.env.REACT_APP_APIKEY}`,
  //     },
  //   })
      // .then((response) => {
        // console.log(response.data.data);
      //   setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
      //   setIsLoading(false);
      // })
      // .catch((error) => {
      //   console.log(error);
  //     });
  // };

  // onClick for food details
  // const onClickDetails = (food) => {
  //   window.location.assign(`/detail?foodId=${food.id}`);
  // };

  // useEffect(() => {
  //   getFoodList();
  // }, [isLoading]);

  return (
    <>
      {/* Intro Section */}
      <div className="intro-section" >
        <Header />
        <div className="intro-section-text-group">
          <Container>
            <div>
              <img className="logo-image" src={logo} alt="logo" />
            </div>
              
            {/* <p className="intro-text mb-5">Look, cook, and enjoy.</p> */}
            <p className="intro-text mb-4">proud present</p>

            <h2 className="intro-text mb-4">Healthy, Create and Review</h2>
            <Button
              onClick={() => {
                window.location.assign(`/foods`);
              }}
              className="btn" variant="outline-warning"
              style={{ fontSize: "18px" }}
            >
              Explore
            </Button>
            <br>
            </br>
            
            
          </Container>
          
        </div>
      </div>
      {/* End of Intro Section */}
      {/* Feature Section */}
      <div className="feature-section pt-5 pb-5">
        <Container>
          <h1 className="feature-title mb-5">
            <span className="feature-title-brand">
              <h1 className="favorite-title mb-5 pt-3">About Us</h1>
            </span>
          
          </h1>
          <Row>
            <Col md={12} lg={12} xl={4} className="d-flex flex-column align-items-center mb-md-4 mb-4">
              <img className="img-us" src={healthy} alt="logo" />
              <h1 className="feature-text">
                
                Healthy Recipes
              </h1>
            </Col>
            <Col sm={12} md={6} lg={6} xl={4} className="d-flex flex-column align-items-center mb-4">
              
              <h1 className="feature-text">
                <img className="img-us" src={create} alt="logo" />
                <br /> Create Recipes
              </h1>
            </Col>
            <Col sm={12} md={6} lg={6} xl={4} className="d-flex flex-column align-items-center">
              
              <h1 className="feature-text">
                <img className="img-us" src={review} alt="logo" />
                <br /> Review Recipes
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      {/* End of Feature Section */}

      {/* Footer Section */}
      <Footer />
      {/* End of Footer Section */}
    </>
  );
};

export default LandingPage;
