import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Row, Col, Container, InputGroup, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-section pt-4">
        <Container>
          <Row className="d-flex g-2 text-center text-md-start">
            <Col md={6} lg={4}>

              <h1 className="footer-copyright-text pt-4 text-center justify-content-start">Made by Ajeng Fitrihandini</h1>
              <ul className="d-flex gap-3 justify-content-center justify-content-md-start">
                <li className="footer-item">
                  <a href="https://github.com/149diajeng" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="footer-icon" />
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={12} lg={4} className="pt-3 pt-lg-0 ">
              <InputGroup className="mb-3">
                <Form.Control placeholder="Enter your email" aria-label="Enter your email" aria-describedby="basic-addon2" />
                <Button className="btn btn-warning" id="button-addon2">
                  Subscribe
                </Button>
              </InputGroup>
            </Col>
          </Row>
          
        </Container>
      </div>
    </>
  );
};

export default Footer;
