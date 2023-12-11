import React, { useState, useEffect } from "react";
import "./users.css";
import { Breadcrumb, Table, Image } from "antd";
import { crossIcon, homeIcon, redTrash, trueIcon } from "../../assets";
import { callApi } from "../../api/apiCaller";
import { routes } from "../../api/routes";
import Loader from "../../components/loader/loader";
import moment from "moment/moment";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [updateApi, setUpdateApi] = useState(false);
  const getAllUser = () => {
    let getRes = (res) => {
      console.log("res of user list", res);
      setUsers(res?.data?.data);
    };

    callApi("GET", routes, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };
  const deleteUser = (id) => {
    setUpdateApi(false);
    let getRes = (res) => {
      console.log("res of user list", res);
      setUpdateApi(true);
    };

    callApi(
      "DELETE",
      `${routes.DeleteUser}/${id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  useEffect(() => {
    getAllUser();
  }, [updateApi]);
  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      className: "role-name-column-header",
    },

    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      className: "type-name-column-header",
      width: 400,
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Profile Picture",
      dataIndex: "profilePicture",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      className: "action-column-header",
    },
  ];

  const data = users?.map((item, index) => {
    return {
      key: index,
      firstName: item?.name,
      email: item?.email,
      dob: moment(item?.dob).format("MM-DD-YYYY"),
      profilePicture: (
        <div className="product-list-image">
          <Image width={50} src={item?.image} alt="profile-image" />
        </div>
      ),
      verified: (
        <div className="server-roles-trash-btn">
          <img src={item?.verified ? trueIcon : crossIcon} alt="" />
        </div>
      ),
      subscription: (
        <p>
          {item?.subscriptionPlan === "free"
            ? "Free"
            : item.subscriptionPlan === "monthly"
            ? "Monthly"
            : "Yearly"}
        </p>
      ),
      delete: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => deleteUser(item?._id)}
        >
          <img src={redTrash} alt="" />
        </div>
      ),
    };
  });

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };
  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Users</h1>
      </div>
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={true}
        ></Table>
      </div>
    </div>
  );
};

export default Users;
