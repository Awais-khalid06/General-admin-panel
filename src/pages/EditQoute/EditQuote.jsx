import React from "react";
import { useState } from "react";
import Input from "antd/es/input/Input";
import { Button, Typography } from "antd";
import { useLocation } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";

const EditQuote = () => {
  const location = useLocation();
  const [author, setAuthor] = useState(location?.state?.item?.author);
  const [quote, setQuote] = useState(location?.state?.item?.quote);
  const [isloading, setIsLoading] = useState(false);
  const id = location?.state?.item?._id;
  console.log(location?.state?.item?._id);

  const updateQuote = () => {
    let getRes = (res) => {
      console.log("res of updateQuote", res);
      GreenNotify("Quote is updated successfully");
    };

    let body = {
      author: author,
      quote: quote,
    };

    callApi(
      "PATCH",
      `${routes.updateQuote}/${id}`,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  return (
    <div style={{ marginBottom: "2rem", padding: "3rem", width: "50rem" }}>
      <Loader loading={isloading} />
      <h2>Edit Quote</h2>
      <Typography.Title level={5} style={{ marginTop: "2rem" }}>
        Author
      </Typography.Title>
      <Input
        style={{ marginTop: "1rem", height: "5rem" }}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <Typography.Title level={5} style={{ marginTop: "2rem" }}>
        Quote
      </Typography.Title>
      <Input
        style={{ marginTop: "1rem", height: "5rem" }}
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="Quote"
      />
      <Button
        type="primary"
        style={{ marginTop: "2rem" }}
        onClick={updateQuote}
      >
        Edit
      </Button>
    </div>
  );
};

export default EditQuote;
