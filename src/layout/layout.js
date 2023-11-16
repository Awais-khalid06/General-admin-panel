import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  UploadIcon,
  homeIcon,
  logOutIcon,
  productIcon,
  productOrder,
  redTrash,
  reviewIcon,
  serviceIcon,
  serviceOrder,
  userIcon,
} from "../assets";
import "./layout.css";
import Header2 from "../components/header/header";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Products from "../pages/products/products";
import { useDispatch } from "react-redux";
import { accessToken, refreshToken, userData } from "../redux/userDataSlice";
import { useToken } from "antd/es/theme/internal";
// import Services from "../pages/services/services";
import AddNewService from "../pages/addNewService/addNewService";
import UpdateService from "../pages/updateService/updateService";
import UserList from "../pages/userList/userList";
import ProductOrder from "../pages/productOrder/productOrder";
import ServiceOrder from "../pages/serviceOrder/serviceOrder";
import { callApi } from "../api/apiCaller";
import routes from "../api/routes";
import { useState } from "react";
import Loader from "../components/loader/loader";
import { GreenNotify, RedNotify } from "../helper/helper";
import Dashboard from "../pages/dashboard/dashboard";
import Reviews from "../pages/Reviews/reviews";
import EditModal from "../components/editModal/editModal";
import EditQuote from "../pages/EditQoute/EditQuote";
import Quotes from "../pages/quotes/quotes";
import ExcelToJson from "../pages/exceltojson/ExcelToJson";

const { Header, Content, Footer, Sider } = Layout;
const LayoutDashboard = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    let getRes = (res) => {
      if (res.status == 200) {
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
          Motivational Quotes
        </div>
        <Menu
          style={{ marginTop: "7rem" }}
          inlineCollapsed={true}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          // items={itemsMain}
        >
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/quotes")}
            icon={<img className="side-bar-icon" src={serviceIcon} alt="" />}
            key="92"
          >
            Quotes
          </Menu.Item>

          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/user-list")}
            icon={<img className="side-bar-icon" src={userIcon} alt="" />}
            key="95"
          >
            Users
          </Menu.Item>
          {/* <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/services-order-list")}
            icon={<img className="side-bar-icon" src={serviceOrder} alt="" />}
            key="105"
          >
            Service Orders
          </Menu.Item> */}
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/ExcelToJson")}
            icon={<img className="side-bar-icon" src={UploadIcon} alt="" />}
            key="108"
          >
            Upload
          </Menu.Item>
          <Menu.Item
            style={{ marginTop: "5rem" }}
            icon={<img className="side-bar-icon" src={logOutIcon} alt="" />}
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
            <Route path="/products" element={<Products />}></Route>
            <Route path="/quotes" element={<Quotes />}></Route>
            <Route path="/new-service" element={<AddNewService />}></Route>
            <Route path="/update-service" element={<UpdateService />}></Route>
            <Route path="/user-list" element={<UserList />}></Route>
            <Route path="/ExcelToJson" element={<ExcelToJson />}></Route>
            <Route path="/editModal" element={<EditModal />}></Route>
            {/* <Route path="/editop" element={<EditOp />}></Route> */}
            <Route path="/editquote" element={<EditQuote />}></Route>
            <Route
              path="/products-order-list"
              element={<ProductOrder />}
            ></Route>
            <Route
              path="/services-order-list"
              element={<ServiceOrder />}
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;
