import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

import IntlMessages from "../../../helpers/IntlMessages";
import { DoughnutChart } from "../../../components/charts";

const StatistikChart = ({ title, data }) => {
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          <IntlMessages id={title} />
        </CardTitle>
        <div className="dashboard-donut-chart">
          <DoughnutChart shadow data={data} />
        </div>
      </CardBody>
    </Card>
  );
};

export default StatistikChart;
