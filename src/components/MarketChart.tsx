import React from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { COLORS } from "../constants.ts";
import { color } from "framer-motion";
import moment from "moment";
import { customChartTooltip } from "../utils/helpers";
type Props = {
  series: number[][];
};
const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    type: "line",
    zoom: { enabled: false },
    // you can enable zoom for zooming
  },
  stroke: {
    curve: "smooth",
    width: 3,
    lineCap: "round",
    colors: [COLORS.primary],
  },
  grid: {
    show: false,
  },
  yaxis: {
    labels: {
      offsetX: -10,
      style: { colors: "#777" },
      formatter: (value) => "$" + value.toLocaleString(),
    },
  },
  tooltip: {
    custom: ({ seriesIndex, dataPointIndex, w }) => {
      let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
      return customChartTooltip(data[1], 4);
    },
  },
  xaxis: {
    type: "numeric",
    axisTicks: { color: "#777" },
    axisBorder: { color: "#777" },
    labels: {
      style: { colors: "#777" },
      formatter: (value) => moment(value).format("YYYY/MM/DD h:mm"),
    },
  },
};
const MarketChart = ({ series }: Props) => {
  return (
    <ReactApexChart
      height={450}
      options={options}
      series={[
        {
          data: series,
        },
      ]}
    />
  );
};

export default MarketChart;
