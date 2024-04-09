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

  // type IDaa = {
  //   [x: string]: IIndicators;
  // };
  // type IMeasures = "lbs" | "height_cm" | "reach_cm";
  // type IIndicators = [IMeasures, number][];
  // const daa: IDaa = {
  //   [userInfo.lastName]: [
  //     ["lbs", Math.round(+userInfo.weight * 2.2)],
  //     ["height_cm", +userInfo.height],
  //     ["reach_cm", +userInfo.reach],
  //   ],
  // };

  // const daa2: IDaa = {
  //   [userInfo.lastName]: [
  //     ["lbs", Math.round(+userInfo.weight * 2.2) + 10],
  //     ["height_cm", +userInfo.height - 10],
  //     ["reach_cm", +userInfo.reach - 10],
  //   ],
  // };

  // const indicators = {
  //   lbs: {
  //     name: "Weight",
  //     color: "#FE2371",
  //   },
  //   height_cm: {
  //     name: "Height",
  //     color: "#2CAFFE",
  //   },
  //   reach_cm: {
  //     name: "Reach",
  //     color: "#FE6A35",
  //   },
  // };

  // // Add upper case country code
  // //   for (const [key, value] of Object.entries(countries)) {
  // //     value.ucCode = key.toUpperCase();
  // //   }

  // const getData = (data: IIndicators) => {
  //   const newdara = data.map((point) => ({
  //     name: point[0],
  //     y: point[1],
  //     color: indicators[point[0]].color,
  //   }));
  //   return newdara;
  // };

  // const options = {
  //   chart: {
  //     type: "column",
  //     height: "50vw",
  //   },
  //   // Custom option for templates
  //   indicators,
  //   title: {
  //     text: "Comparing",
  //     align: "center",
  //   },
  //   subtitle: {
  //     align: "left",
  //   },
  //   plotOptions: {
  //     series: {
  //       grouping: false,
  //       borderWidth: 0,
  //     },
  //   },
  //   legend: {
  //     enabled: false,
  //     title: {
  //       text: [userInfo.lastName],
  //     },
  //   },
  //   tooltip: {
  //     shared: false,
  //     headerFormat:
  //       '<span style="font-size: 15px">' +
  //       "<b>{series.chart.options.indicators.(point.key).name}:</b>" +
  //       "</span><br/>",
  //     pointFormat:
  //       '<span style="color:{point.color}">\u25CF</span> ' +
  //       "<b>{series.name}</b>: {point.y} {point.name}<br/>",
  //   },
  //   xAxis: {
  //     type: "category",
  //     width: "100%",
  //     categories: ["Weight", "Height", "Reach", "Age"],
  //     accessibility: {
  //       description: "Countries",
  //     },
  //     max: 2,
  //     labels: {
  //       useHTML: true,
  //       animate: true,
  //       format:
  //         "{chart.options.indicators.(value)}<br>" +
  //         '<span class="f32">' +
  //         '<span style="display:inline-block;height:32px;vertical-align:text-top;" ' +
  //         'class="flag {value}"></span></span>',
  //       style: {
  //         textAlign: "center",
  //       },
  //     },
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   yAxis: [
  //     {
  //       enabled: false,
  //       title: {
  //         // text: [userInfo.lastName],
  //       },
  //       showFirstLabel: false,
  //     },
  //   ],
  //   series: [
  //     {
  //       color: "rgba(158, 159, 163, 0.5)",
  //       pointPlacement: -0.2,
  //       linkedTo: "main",
  //       dataLabels: [
  //         {
  //           enabled: true,
  //           inside: false,
  //           style: {
  //             fontSize: "16px",
  //           },
  //         },
  //       ],
  //       data: daa2[userInfo.lastName],
  //       name: [userInfo.lastName],
  //     },
  //     {
  //       name: [userInfo.lastName],
  //       id: "main",
  //       dataSorting: {
  //         enabled: true,
  //         matchByName: true,
  //       },
  //       dataLabels: [
  //         {
  //           enabled: true,
  //           inside: true,
  //           style: {
  //             fontSize: "16px",
  //           },
  //         },
  //       ],
  //       data: getData(daa[userInfo.lastName]).slice(),
  //     },
  //   ],
  //   exporting: {
  //     allowHTML: true,
  //   },
  // };

  const playerToCompare = [
    Math.round(+userToCompare.weight * 2.2),
    +userToCompare.height,
    +userToCompare.reach,
  ];
  const currentUser = [Math.round(+userInfo.weight * 2.2), +userInfo.height, +userInfo.reach];

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
      categories: ["Weight (lbs)", "Height (cm)", "Reach (cm)"],
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
    tooltip: {
      // valueSuffix: " %",
    },
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
