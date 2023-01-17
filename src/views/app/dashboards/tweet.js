import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import StatistikChart from "./Chart";
import { ThemeColors } from "../../../helpers/ThemeColors";
// import { getStatisticRequest } from "../../../redux/actions";
import { get } from "lodash";

const colors = ThemeColors();

const TweetDashboard = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.statistic" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    </>
  );
};
export default TweetDashboard;
