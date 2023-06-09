import "./MyFavorite.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

const MyFavorite = () => {
  const [likedFoods, setLikedFoods] = useState([]);
  const [toggleLike] = useState(false);

  const jwtToken = localStorage.getItem("token");

  // Get All Foods
  const getFoodList = useCallback(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/like-foods`,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        setLikedFoods(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setLikedFoods, jwtToken]);

  // Like Button
  // const handleLikeButton = (food) => {
  //   const foodId = food.id;
  //   axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_BASEURL}/api/v1/like`,
  //     headers: {
  //       apiKey: `${process.env.REACT_APP_APIKEY}`,
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //     data: {
  //       foodId: foodId,
  //     },
  //   })
  //     .then(() => {
  //       setToggleLike((prevState) => !prevState);
  //     })
  //     .catch(() => {
  //       alert("You have to login to use this feature!");
  //     });
  // };
  
  // // onClick for food details
  const onClickDetails = (food) => {
    window.location.assign(`/detail?foodId=${food.id}`);
  };

  useEffect(() => {
    getFoodList();
  }, [getFoodList, toggleLike]);

  return (
    <>
      <div className="favorite-section " style={{ height: "100%", paddingBottom: "200px" }}>
        <Header />

        <Container className="pt-3 " style={{ height: "100%", minHeight: "420px", paddingBottom: "200px" }}>
          <h1 className="foodlist-title mb-5 pt-4">My Favorites</h1>
          {likedFoods.length > 0 ? (
            <Row className="foodlist-row g-1">
              {likedFoods.map((food, i) => {
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
                    <img src={food.imageUrl} alt={food.name} onClick={() => onClickDetails(food)} className="foodlist-img img-fluid" />
                    <p className="foodlist-text">{food.name}</p>
                    <div className="foodlist-rates mb-3">
                    </div>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <div className="favorite-error-page pt-3">
              <p className="favorite-text">Oops, there is nothing here!</p>
              <p className="favorite-text-2 mt-1 ">Go like some foods at our recipes page! </p>

              <Button className="btn-success  ps-4 pe-4 p-2" onClick={() => window.location.assign("/foods")}>
                Recipes
              </Button>
            </div>
          )}
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default MyFavorite;
