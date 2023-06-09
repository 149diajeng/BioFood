import "./FoodList.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaStar, FaHeart } from "react-icons/fa";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleLike, setToggleLike] = useState(false);

  const jwtToken = localStorage.getItem("token");

  // Get All Foods
  const getFoodList = useCallback(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/foods`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${jwtToken || process.env.REACT_APP_JWTTOKEN}`,
      },
    })
      .then((response) => {
        setFoods(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [jwtToken]);

  // Like Button
  const handleLikeButton = (food) => {
    const foodId = food.id;
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/like`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        foodId: foodId,
      },
    })
      .then(() => {
        setToggleLike((prevState) => !prevState);
      })
      .catch(() => {
        alert("You have to login to use this feature!");
      });
  };

  // Unlike Button
  const handleUnlikeButton = (food) => {
    const foodId = food.id;
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/unlike`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        foodId: foodId,
      },
    })
      .then(() => {
        setToggleLike((prevState) => !prevState);
      })
      .catch(() => {
        alert("You have to login to use this feature!");
      });
  };

  // onClick for food details
  const onClickDetails = (food) => {
    window.location.assign(`/detail?foodId=${food.id}`);
  };

  useEffect(() => {
    getFoodList();
  }, [getFoodList, toggleLike]);
  return (
    <>
      <div className="foodlist-section" style={!foods.length > 0 ? { height: "100vh" } : { height: "100%" }}>
        <Header />

        {/* Taken from LandingPage - Favorite Section */}
        <div className="pt-4 pb-5">
          <Container>
            <h1 className="foodlist-title mb-5 pt-3">Recipes</h1>

            <Row className="foodlist-row g-1">
              {!isLoading
                ? foods.map((food, i) => {
                    return (
                      <Col
                        key={i}
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={4}
                        xxl={3}
                        className="d-flex flex-column align-items-center
                 mb-md-4 mb-4 foodlist-col"
                      >
                        <img src={food.imageUrl} alt={food.name} onClick={() => onClickDetails(food)} className="foodlist-img " />
                        <p className="foodlist-text">{food.name}</p>
                        <div className="foodlist-rates mb-3">
                          <span className="foodlist-rates-text">
                            <Button className=" btn-light btn-foodlist">
                              <FaStar style={{ color: "gold" }} /> {food.rating}
                            </Button>
                            
                          </span>
                          <span className="foodlist-rates-text">
                            <Button className="btn-light btn-foodlist"> 
                              <FaHeart
                              className="foodlist-heart-icon"
                              style={!food.isLike ? { color: "grey" } : { color: "red" }}
                              onClick={() => {
                                food.isLike ? handleUnlikeButton(food) : handleLikeButton(food);
                              }}
                            />
                            {food.totalLikes}
                            </Button>
                            
                            
                          </span>
                        </div>
                      </Col>
                    );
                  })
                : null}
            </Row>
          </Container>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FoodList;
