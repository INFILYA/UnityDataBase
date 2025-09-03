import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../states/slices/userInfoSlice";
import { useSetWidth } from "../../../utilities/useSetWidth";
import { selectuserToCompare } from "../../../states/slices/userToCompareSlice";

export default function Diagramm() {
  const userInfo = useSelector(selectUserInfo);
  const userToCompare = useSelector(selectuserToCompare);

  const small = useSetWidth() > 629;
  const average = useSetWidth() > 839;

  const playerToCompare = [
    +userToCompare.height,
    +userToCompare.standingVerticalJump,
  ];
  const currentUser = [+userInfo.height, +userInfo.standingVerticalJump];

  const options = {
    chart: {
      type: "column",
      width: average ? 530 : small ? 400 : 300,
    },
    title: {
      text: "",
      align: "center",
      fontSize: "16px",
    },
    subtitle: {
      align: "left",
    },
    xAxis: {
      categories: ["Height (cm)", "Reach (cm)"],
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
        align: "high",
      },
      labels: {
        overflow: "justify",
        fontSize: "16px",
      },
      gridLineWidth: 0,
    },
    tooltip: {},
    plotOptions: {
      bar: {
        borderRadius: "50%",
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
        fontSize: "16px",
      },
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "top",
      x: 60,
      y: 60,
      floating: true,
      borderWidth: 1,
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        dataLabels: [
          {
            enabled: true,
            inside: true,
            style: {
              fontSize: "16px",
              color: "lightgreen",
            },
          },
        ],
        name: userInfo.lastName,
        data: currentUser,
      },
      {
        dataLabels: [
          {
            enabled: true,
            inside: true,
            style: {
              fontSize: "16px",
              color: "orangered",
            },
          },
        ],
        name: userToCompare.lastName,
        data: playerToCompare,
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
