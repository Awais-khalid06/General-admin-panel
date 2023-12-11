import React from "react";
import { Layout, Menu } from "antd";
import { homeIcon, logOutIcon, userIcon } from "../assets";
import "./layout.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { accessToken, refreshToken, userData } from "../redux/userDataSlice";
import { callApi } from "../api/apiCaller";
import { routes } from "../api/routes";
import { useState } from "react";
import Loader from "../components/loader/loader";
import { GreenNotify, RedNotify } from "../helper/helper";
import Dashboard from "../pages/dashboard/dashboard";
import Home from "../pages/home/home";
import Users from "../pages/userlist/Users";

const { Content, Sider } = Layout;
const LayoutDashboard = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    let getRes = (res) => {
      if (res.status === 200) {
        GreenNotify(res.message);
        dispatch(userData(null));
        dispatch(accessToken(""));
        dispatch(refreshToken(""));
      } else {
        RedNotify(res.message);
      }
    };

    let body = {
      device: {
        id: localStorage.getItem("deviceId"),
        deviceToken: "xyz",
      },
    };

    callApi("POST", routes.logOut, body, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Loader loading={isloading} />
      <Sider style={{ background: "#0B1B2D" }} width={280}>
        <div
          onClick={() => navigate("/")}
          style={{
            paddingTop: "4rem",
            textAlign: "center",
            color: "white",
            fontSize: "2.3rem",
            cursor: "pointer",
          }}
        >
          Panel
        </div>
        <Menu
          style={{ marginTop: "7rem" }}
          inlineCollapsed={true}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
        >
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/home")}
            icon={<img className="side-bar-icon" src={homeIcon} alt="" />}
            key="92"
          >
            Home
          </Menu.Item>

          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/users")}
            icon={<img className="icon" src={userIcon} alt="" />}
            key="95"
          >
            Users
          </Menu.Item>
          <Menu.Item
            style={{ marginTop: "5rem" }}
            icon={<img className="log-out" src={logOutIcon} alt="" />}
            onClick={logOut}
            key="89"
          >
            Log Out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            background: "#fff",
            paddingTop: "2rem",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/users" element={<Users />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;
