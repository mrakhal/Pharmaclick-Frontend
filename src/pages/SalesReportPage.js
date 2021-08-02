import React from 'react'
import '../assets/css/SidebarComp.css'
import { Chart } from 'primereact/chart';
import HTTP from '../service/HTTP';
import { Card } from 'primereact/card';
import "primeflex/primeflex.css";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

let monthly = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November']
let weekly = ['Week 1', 'Week 2', 'Week 3', 'Week 4']

const data = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: '',
            data: [],
            fill: true,
            borderColor: '#4bc0c0'
        }
    ]
};

const basicOptions = {
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero: true,
                max: 1000,
                min: 0
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: false,
                max: 8,
                min: -3
            }
        }]
    }
}

let filter = { selectedTime: 'Yearly', selectedDetailTime: '2021', year: '2021' }
class SalesReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesReport: { ...data },
            totalProductSold: null,
            totalQtySold: null,
            dateRange: null,
            filter: { ...filter }
        }

        this.time = [
            { name: 'Yearly', code: 'Yearly' }, { name: 'Monthly', code: 'Monthly' }];

        this.year = [
            { name: '2020', code: '2020' },
            { name: '2021', code: '2021' }
        ];

        this.month = [
            { name: 'January', code: 0 },
            { name: 'February', code: 1 },
            { name: 'March', code: 2 },
            { name: 'April', code: 3 },
            { name: 'May', code: 4 },
            { name: 'June', code: 5 },
            { name: 'July', code: 6 },
            { name: 'August', code: 7 },
            { name: 'September', code: 8 },
            { name: 'October', code: 9 },
            { name: 'November', code: 10 },
            { name: 'December', code: 11 }
        ]
        this.options = {
            scales: {
                y: {
                    max: 40,
                }
            }
        }
    }

    componentDidMount() {
        this.getSalesReport()
        // alert(this.state.filter.selectedTime)
    }
    getSalesReport = async () => {
        try {
            let res = await HTTP.get('/transaction/sales-report')
            console.log(res.data[0])
            let { detail } = res.data[0]
            let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            detail.forEach((item, index) => data[item.month - 1] += item.qty_buy)
            let datasets = [
                {
                    label: 'Product Sold Per-Month',
                    data: data,
                    fill: true,
                    borderColor: '#4bc0c0'
                }
            ]
            console.log(data)
            let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            console.log(this.state.salesReport)
            this.setState({
                salesReport: { ...this.state.salesReport, labels, datasets },
                totalProductSold: res.data[0].total_product,
                totalQtySold: res.data[0].total_qty
            })
        } catch (error) {
            console.log("error get sales report", error)
        }
    }

    onTimeChange = async (key, value) => {
        this.setState({
            filter: {
                ...this.state.filter,
                [key]: value
            }
        })
    }

    onBtnFilter = async () => {
        try {
            let { selectedTime, selectedDetailTime } = this.state.filter
            let url = `/transaction/sales-report`
            if (selectedTime.name == "Yearly") {
                if (selectedDetailTime.name == "2021") url += `?start=2021-01-01&end=2021-13-31`
                if (selectedDetailTime.name == "2020") url += `?start=2020-01-01&end=2020-13-31`
            }

            alert(url)
            let res = await HTTP.get(url)

            console.log("filter data", res.data[0])
            let { detail } = res.data[0]
            let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            detail.forEach((item, index) => data[item.month - 1] += item.qty_buy)
            let datasets = [
                {
                    label: 'Product Sold Per-Month',
                    data: data,
                    fill: true,
                    borderColor: '#4bc0c0'
                }
            ]
            console.log(data)
            let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            console.log(this.state.salesReport)
            this.setState({
                salesReport: { ...this.state.salesReport, labels, datasets },
                totalProductSold: res.data[0].total_product,
                totalQtySold: res.data[0].total_qty
            })
        } catch (error) {
            console.log("error filter", error)
        }
    }
    render() {
        let { salesReport, totalQtySold, totalProductSold, filter } = this.state
        console.log('filter', filter)
        return (
            <div className="main-content">
                <main>
                    {/* <hr /> */}
                    <div>
                        <div className="d-flex justify-content-between my-2">
                            <h2>Sales Chart</h2>
                            <div>
                                <Dropdown optionLabel="name" value={filter.selectedTime} options={this.time} onChange={(e) => this.onTimeChange("selectedTime", e.value)} placeholder="Select Time" />
                                <Dropdown optionLabel="name" value={filter.selectedDetailTime}
                                    options={filter.selectedTime.name == 'Yearly' ? this.year : this.month}
                                    onChange={(e) => this.onTimeChange("selectedDetailTime", e.value)} placeholder="Select Detail" className="mx-3" />
                                {
                                    filter.selectedTime.name == "Monthly"
                                    &&
                                    <Dropdown optionLabel="name" value={filter.year} options={this.year} onChange={(e) => this.onTimeChange("year", e.value)} placeholder="Select Time" className="mr-3" />
                                }
                                <Button label="Filter" className="p-button-raised h-100" onClick={this.onBtnFilter} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            {/* Cart */}
                            <div style={{ width: '65%' }}>
                                <Chart type="line" data={salesReport} options={this.options} />
                            </div>
                            <div style={{ width: '30%', margin: 'auto' }}>
                                <Card className="my-3 d-flex justify-content-center" style={{ textAlign: 'center' }}>
                                    <div className="d-flex">
                                        <i className="pi pi-check mx-1"></i>
                                        <h6>Total Product Sold:</h6>
                                    </div>
                                    <h2 style={{ color: 'blueviolet' }}>{totalProductSold} </h2>
                                    <h6>Product</h6>
                                </Card>
                                <Card className="my-3 d-flex justify-content-center" style={{ textAlign: 'center' }}>
                                    <div className="d-flex">
                                        <i className="pi pi-check mx-1"></i>
                                        <h6>Total Pieces Sold:</h6>
                                    </div>
                                    <h2 style={{ color: 'blueviolet' }}>{totalQtySold} </h2>
                                    <h6>Product</h6>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        );
    }
}

export default SalesReportPage;

// import React from 'react'
// import "../assets/css/SidebarComp.css";
// import { Chart } from 'primereact/chart';
// import { Button } from 'primereact/button';
// import HTTP from '../service/HTTP';



// class AdminTransactionPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             salesReport: { ...data }
//         }
//     }

//     componentDidMount() {
//         this.getSalesReport()
//     }
//     getSalesReport = async () =>{
//         try {
//             let res = await HTTP.get('/transaction/report')
//             console.log(res.data)
//         } catch (error) {
//             console.log("error get sales report", error)
//         }
//     }
//     getDataPerWeek = async () => {
//         try {
//             let labels = ['week 1', 'week 2', 'week 3', 'week 4']
//             this.setState({
//                 salesReport: {
//                     ...this.state.salesReport,
//                     labels
//                 }
//             })
//         } catch (error) {
//             console.log("", error)
//         }
//     }
//     getDataPerMonth = async () => {
//         try {
//             let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
//             this.setState({
//                 salesReport: {
//                     ...this.state.salesReport,
//                     labels
//                 }
//             })
//         } catch (error) {
//             console.log("", error)
//         }
//     }
//     render() {
//         let { salesReport } = this.state
//         return (
//             <div className="main-content">
//                 <main>
//                 <Button label="Week" onClick={this.getDataPerWeek}/>
//                 <Button label="Month" onClick={this.getDataPerMonth}/>
//                     <Chart type="line" data={salesReport} />
//                 </main>
//             </div>
//         );
//     }
// }

// export default AdminTransactionPage;