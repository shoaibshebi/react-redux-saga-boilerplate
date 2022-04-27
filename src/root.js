import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

/** User side and Admin side */
import UserLayout from "./User/layout/Index";
import AdminLayout from "./Admin/layout/Index";

import Users from "./Admin/pages/Index";
import Auth from "./User/pages/Auth/index";

//Global Style
//Best for the cusomization of interhtml or any kind of HTML throughout the website
//like example below, But you can change it if you want at the component level

export default function root() {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!userToken && !adminToken) {
      navigate("/auth/login");
    }
  }, []);

  useEffect(() => {
    const logout = () => {
      localStorage.getItem("userToken") && localStorage.removeItem("userToken");
      localStorage.getItem("adminToken") &&
        localStorage.removeItem("adminToken");
      window.location.replace("/auth/login");
    };

    const user = localStorage.getItem("userToken")
      ? localStorage.getItem("userToken")
      : localStorage.getItem("adminToken");

    if (user) {
      let decodedJwt = jwt_decode(user);
      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
      }
    }
  }, [location]);

  const pathsControl = () => {
    return (
      <>
        {/* To control UserSid and Admin side */}
        {/* show auth/login when both are signedout, if either one is signedin dont show it */}
        {userToken && (
          <UserLayout>
            <Routes>
              <Route path="/auth/login" element={<Auth />} />
            </Routes>
          </UserLayout>
        )}

        {adminToken && (
          <AdminLayout>
            <Routes>
              <Route path="/admin/users" element={<Users />} />
            </Routes>
          </AdminLayout>
        )}
      </>
    );
  };

  return <div>{pathsControl()}</div>;
}
