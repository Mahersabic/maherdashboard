import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'

import DoctorsMap from "../../components/DoctorsMap";

import  firebaseApp from "../../components/Firebase/firebase" // import firebase config setting


var UCRef = firebaseApp.database().ref(); // connection to firebase database.



const brandInfo = getStyle('--info')

// Card Chart 1
const cardChartData1 = {
  labels: [],
  datasets: [
    {
      label: 'Status',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [0],
    },
  ],
};

const cardChartOpts1 = {

  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: [],
  datasets: [
    {
      label: 'Quantity',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [0],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: 0,
          max: 0,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};


const cardChartOpts3 = {

  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: 0,
          max: 0,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};




// Card Chart 3
const cardChartData3 = {
  labels: [],
  datasets: [
    {
      label: 'No of Order',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [0],
    },
  ],
};




//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}



class Dashboard extends Component {



  componentDidMount() {

    UCRef.on('value', snapshot => {
      let datas = snapshot.val();
      const list1 = Object.keys(datas.data).map(key => ({      // get data from firebase
        ...datas.data[key],
        uid: key,
      }));

      const list2 = Object.keys(datas.data2).map(key => ({      // get data from firebase
        ...datas.data2[key],
        uid: key,
      }));


    const merged_list = [...list1, ...list2];



    this.setState({                // set state into firebase data
        doctors: merged_list,
        list1: list1,
        last_item: list1.slice(-1)[0]
    })
  });





  }




  state = {                       // define state and initialize for this component

    doctors: [
			{
        latitude: 25.333827,
        longitude: 49.597226,
        quantity: 1,
        status: 0,
        x: 1,
      },
    ],

    list1: [
			{
        latitude: 25.333827,
        longitude: 49.597226,
        quantity: 1,
        status: 0,
        x: 1,
      },
    ],

    last_item: {
      latitude: 25.333827,
      longitude: 49.597226,
      quantity: 1,
      status: 0,
      x: 1,
    },
	}


  componentDidUpdate(){           // initialize history data as empty array
    cardChartData2.labels = [];
    cardChartData2.datasets[0].data = [];
    cardChartData1.labels = [];
    cardChartData1.datasets[0].data = [];
    cardChartData3.labels = [];
    cardChartData3.datasets[0].data = [];
  }



   render() {

    const { doctors, list1, last_item } = this.state;    // get doctors object from state


    list1.forEach((item, index) => {   // setting chart for history data


      cardChartData2.labels.push(index);
      cardChartData2.datasets[0].data.push(parseInt(item.quantity))
      cardChartData1.labels.push(index);
      cardChartData1.datasets[0].data.push(parseInt(item.status))
      cardChartData3.labels.push(index);
      cardChartData3.datasets[0].data.push(parseInt(item.x))
  })

    let max_quantity = Math.max.apply(Math, cardChartData2.datasets[0].data);
    let min_quantity = Math.min.apply(Math, cardChartData2.datasets[0].data);
    cardChartOpts2.scales.yAxes[0].ticks.max = max_quantity;
    cardChartOpts2.scales.yAxes[0].ticks.min = min_quantity;

    let max_order = Math.max.apply(Math, cardChartData3.datasets[0].data);
    let min_order = Math.min.apply(Math, cardChartData3.datasets[0].data);
    cardChartOpts3.scales.yAxes[0].ticks.max = max_order;
    cardChartOpts3.scales.yAxes[0].ticks.min = min_order;


      return (
        <div className="animated fadeIn">
        <Row>
            <Col xs="12" sm="4" lg="4">
              <Card className="text-white bg-info">
                <CardBody className="pb-0">
                  <div className="text-value">{ last_item.quantity }</div>
                  <div>Quantity</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Line data={cardChartData2} options={cardChartOpts2} height={70} />
                </div>
              </Card>
            </Col>


         {last_item.status === '1'?<Col xs="12" sm="4" lg="4">
          <Card className="text-white  bg-success">
            <CardBody className="pb-0">
              <div className="text-value">{ last_item.status }</div>
              <div>Status</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <Line data={cardChartData1} options={cardChartOpts1} height={70} />
            </div>
          </Card>
        </Col>:<Col xs="12" sm="4" lg="4">
          <Card className="text-white  bg-danger">
            <CardBody className="pb-0">
              <div className="text-value">{ last_item.status }</div>
              <div>Status</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <Line data={cardChartData1} options={cardChartOpts1} height={70} />
            </div>
          </Card>
        </Col>

}



            <Col xs="12" sm="4" lg="4">
              <Card className="text-white bg-primary">
                <CardBody className="pb-0">
                  <div className="text-value">{ last_item.x }</div>
                  <div>No of Order</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Line data={cardChartData3} options={cardChartOpts3} height={70} />
                </div>
              </Card>
            </Col>

          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className="chart-wrapper" style={{ height: 500 + 'px', marginTop: 0 + 'px' }}>
                  <DoctorsMap
                    doctors={doctors}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA3EZ2UPRHRkyBCHHiNugjAIBps_LgGSOQ&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%`, width: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />


                </div>
                </CardBody>
                <CardFooter>
                  <Row className="text-center">

                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
      </div>
      );
  }
}



export default Dashboard
