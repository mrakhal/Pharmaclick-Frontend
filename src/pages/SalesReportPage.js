import React from 'react'
import '../assets/css/SidebarComp.css'
import { Chart } from 'primereact/chart';
import HTTP from '../service/HTTP';
import { Card } from 'primereact/card';
import "primeflex/primeflex.css";

let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November']
class SalesReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionData: [],
            totalProductSold: null,
            totalQtySold: null
        }
    }

    componentDidMount() {
        this.getSalesReport()
    }
    getSalesReport = async () => {
        try {
            let res = await HTTP.get('/transaction/sales-report')
            console.log(res.data[0])
            this.setState({ transactionData: res.data[0].detail, totalProductSold: res.data[0].total_product, totalQtySold: res.data[0].total_qty })
        } catch (error) {
            console.log("error get sales report", error)
        }
    }

    getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }
    render() {
        return (
            <div className="main-content">
                <main>
                    <h1>Sales Report</h1>
                    <div className="d-flex justify-content-evenly">
                        <Card style={{ width: '40%' }}>
                            <span className="d-flex">
                                <i className="pi pi-check p-mr-2 mx-2"></i>
                                <h6>Total Product Sold:</h6>
                            </span>
                            <h2 style={{ textAlign: 'center' }}>{this.state.totalProductSold} </h2>
                            <h6 style={{ textAlign: 'center' }}>Product</h6>
                        </Card>
                        <Card style={{ width: '40%' }}>
                            <span className="d-flex">
                                <i className="pi pi-check p-mr-2 mx-2"></i>
                                <h6>Total Quantity Sold:</h6>
                            </span>
                            <h2 style={{ textAlign: 'center' }}>{this.state.totalQtySold} </h2>
                            <h6 style={{ textAlign: 'center' }}>Product</h6>
                        </Card>
                    </div>
                    {/* Cart */}
                    <Chart type="line" data={this.basicData} options={basicOptions} />
                    {/* All user Transactions */}
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Team</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div >
        );
    }
}

export default SalesReportPage;