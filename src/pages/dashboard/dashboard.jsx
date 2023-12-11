import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Breadcrumb } from "antd";
import {
  dashboardUser,
  homeIcon,
  productIcon1,
  serviceIcon1,
} from "../../assets";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import moment from "moment/moment";
import { callApi } from "../../api/apiCaller";
import { routes } from "../../api/routes";
import Loader from "../../components/loader/loader";
const Dashboard = () => {
  // const [value, setValue] = useState(new Date());
  const [isloading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});

  const stateArr = [
    {
      title: "Total Users",
      count: stats?.users,
      icon: dashboardUser,
    },
    {
      title: "Total",
      count: stats?.quotes,
      icon: productIcon1,
    },
    {
      title: "Total",
      count: stats?.reminders,
      icon: serviceIcon1,
    },
  ];

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
        <div className="icon-dashboard">
          <img
            style={{
              width: "1.7rem",
              height: "1.7rem",
            }}
            src={homeIcon}
            alt="home-icon"
          />
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
        </div>
        <div className="dashboard-pie-chart-container">
          <Clock
            size={120}

            // value={value}
          />
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
