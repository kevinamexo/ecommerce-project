import React, { useState, useEffect } from "react";
import { RiAdminFill } from "react-icons/ri";
import "./Admin.css";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import ManageStock from "./ManageStock";

const Admin = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="admin-page">
      <div className="admin-page__section1">
        <div className="admin-page__navProfile">
          <span className="admin-page__navProfile-icon">
            <RiAdminFill />
          </span>
          <button>BUTTON</button>
        </div>
        <ul className="admin-page__navbar">
          <li className="admin-page__navItem">
            <Link to={`${url}/manage_stock`}>Manage Stock</Link>
          </li>
          <li className="admin-page__navItem">
            <Link to={`${url}/view_sales`}>View Sales</Link>
          </li>
        </ul>
      </div>
      <div className="admin-page__section2">
        <Switch>
          <Route path={`${url}/manage_stock`}>
            <ManageStock />
          </Route>
          <Route path={`${url}/view_sales`}>
            <p>View Sales</p>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
