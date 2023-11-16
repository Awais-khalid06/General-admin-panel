import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Breadcrumb, Button, Select, Table, Image } from "antd";
import {
  homeIcon,
  orderIcon1,
  productIcon,
  productIcon1,
  redTrash,
  serviceIcon,
  serviceIcon1,
  userIcon1,
} from "../../assets";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import moment from "moment/moment";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
const Dashboard = () => {
  const [value, setValue] = useState(new Date());
  const [isloading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});

  const stateArr = [
    {
      title: "Total Users",
      count: stats?.users,
      icon: userIcon1,
    },
    {
      title: "Total Quotes",
      count: stats?.quotes,
      icon: productIcon1,
    },
    {
      title: "Total Reminders",
      count: stats?.reminders,
      icon: serviceIcon1,
    },
  ];

  // const getState = () => {
  //   let getRes = (res) => {
  //     setState(res?.data?.data);
  //     console.log("res of get state", res);
  //     // setShowModal(false);
  //   };

  //   callApi("GET", routes.getState, null, setIsLoading, getRes, (error) => {
  //     setState(error);
  //   });
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => setValue(new Date()), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    getStats();
  }, []);

  const getStats = () => {
    let getRes = (res) => {
      console.log("res of getStats", res);
      setStats(res);
    };

    callApi("GET", routes.getStats, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div className="dashboard-main-container">
        <div className="dashboard-state-container">
          {stateArr.map((item) => (
            <div className="dashboard-state-count-container">
              <div className="dashboard-state-icon">
                <img src={item.icon} alt="icon" />
              </div>
              <div className="dashboard-state">
                <h2>{item.title}</h2>
                <p>{item.count}</p>
              </div>
            </div>
          ))}

          {/* <div className="dashboard-state-count-container"></div> */}
        </div>
        <div className="dashboard-pie-chart-container">
          <Clock size={120} value={value} />
          <p>
            Current time:{" "}
            <span style={{ color: "red", fontWeight: "700" }}>
              {moment(new Date()).format("DD, MMM, YYYY , HH:mm A")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
