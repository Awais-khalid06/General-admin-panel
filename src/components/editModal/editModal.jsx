import React, { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import Loader from "../loader/loader";
import { Button, Row, Col, Typography } from "antd";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { GreenNotify } from "../../helper/helper";
import { useNavigate } from "react-router-dom";

const EditModal = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState([
    {
      author: "",
      quote: "",
    },
  ]);

  const getAllQuotes = () => {
    let getRes = (res) => {
      console.log("res of get response", res);
    };

    callApi("GET", routes.getAllQuotes, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };
  useEffect(() => {
    getAllQuotes();
  }, []);

  let body = quotes;

  const createQuote = () => {
    let getRes = (res) => {
      console.log("res of createQuote", res);
      GreenNotify("Quote is created successfully");
      navigate("/quotes");
    };

    callApi("POST", routes.createQuote, body, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  return (
    console.log("Quotes", quotes),
    (
      <>
        <div style={{ marginBottom: "2rem", padding: "3rem" }}>
          <Loader loading={isloading} />
          <h2>Create Quote</h2>
          {quotes.map((item, i) => (
            <Row gutter={216}>
              <Col span={8}>
                <Typography.Title level={5} style={{ marginTop: "2rem" }}>
                  Author
                </Typography.Title>
                <Input
                  style={{
                    marginTop: "1rem",
                    height: "5rem",
                    width: "50rem",
                    fontSize: "1.8rem",
                  }}
                  onChange={(e) => {
                    const newQuotes = [...quotes];
                    newQuotes[i] = { ...item, author: e.target.value };
                    setQuotes(newQuotes);
                  }}
                  placeholder="Author"
                />
              </Col>
              <Col span={8}>
                <Typography.Title level={5} style={{ marginTop: "2rem" }}>
                  Quote
                </Typography.Title>
                <Input
                  style={{
                    marginTop: "1rem",
                    height: "5rem",
                    width: "50rem",
                    fontSize: "1.8rem",
                  }}
                  onChange={(e) => {
                    const newQuotes = [...quotes];
                    newQuotes[i] = { ...item, quote: e.target.value };
                    setQuotes(newQuotes);
                  }}
                  placeholder="Quote"
                />
              </Col>
            </Row>
          ))}
          <Button
            onClick={() => setQuotes([...quotes, { author: "" }])}
            type="default"
            style={{ marginTop: "2rem" }}
          >
            Add More
          </Button>
        </div>
        <Button
          type="primary"
          style={{ marginLeft: "3rem" }}
          onClick={createQuote}
        >
          Create
        </Button>
      </>
    )
  );
};

export default EditModal;
