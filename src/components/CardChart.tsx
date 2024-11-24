// import ReactApexChart from "react-apexcharts";
// import { COLORS } from "../constants.ts";
// import moment from "moment";
// import { customChartTooltip } from "../utils/helpers";
// import { ApexOptions } from "apexcharts";
// const options: ApexOptions = {
//   chart: {
//     toolbar: { show: false },
//     type: "line",
//     zoom: { enabled: false },
//   },
//   stroke: {
//     curve: "smooth",
//     width: 6,
//     lineCap: "round",
//     colors: [COLORS.primary],
//   },
//   grid: {
//     show: false,
//   },
//   yaxis: {
//     axisBorder: { show: false },
//     labels: { show: false },
//     axisTicks: { show: false },
//   },
//   tooltip: {
//     custom: ({ seriesIndex, dataPointIndex, w }) => {
//       const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
//       return customChartTooltip(data.y, 4);
//     },
//   },
//   xaxis: {
//     type: "numeric",
//     axisBorder: { show: false },
//     axisTicks: { show: false },
//     labels: {
//       show: false,
//       style: { colors: "#777" },
//       hideOverlappingLabels: true,
//       formatter: (value) => {
//         return moment.unix(+value).format("YYYY/MM/DD h:mm");
//       },
//     },
//   },
// };

// type Props = {
//   series: { x: number; y: number };
// };
// const CardChart = ({ series }: Props) => {
//   return (
//     <ReactApexChart
//       height={150}
//       width={250}
//       options={options}
//       series={[{ data: series }]}
//     />
//   );
// };

// export default CardChart;

//updated code:
import ReactApexChart from "react-apexcharts";
import { COLORS } from "../constants.ts";
import moment from "moment";
import { customChartTooltip } from "../utils/helpers";
import { ApexOptions } from "apexcharts";

const options: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "line",
    zoom: { enabled: false },
  },
  stroke: {
    curve: "smooth",
    width: 6,
    lineCap: "round",
    colors: [COLORS.primary],
  },
  grid: {
    show: false,
  },
  yaxis: {
    axisBorder: { show: false },
    labels: { show: false },
    axisTicks: { show: false },
  },
  tooltip: {
    custom: ({ seriesIndex, dataPointIndex, w }) => {
      const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
      return customChartTooltip(data.y, 4);
    },
  },
  xaxis: {
    type: "numeric",
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      show: false,
      style: { colors: "#777" },
      hideOverlappingLabels: true,
      formatter: (value) => {
        return moment.unix(+value).format("YYYY/MM/DD h:mm");
      },
    },
  },
};

type Props = {
  series: { x: number; y: number }[]; // Updated to array
};

const CardChart = ({ series }: Props) => {
  return (
    <ReactApexChart
      height={150}
      width={250}
      options={options}
      series={[{ name: "Series 1", data: series }]} // Corrected series format
    />
  );
};

export default CardChart;
