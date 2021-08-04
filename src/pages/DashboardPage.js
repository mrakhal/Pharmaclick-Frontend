import React from 'react';
import HTTP from '../service/HTTP';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { ProgressBar } from 'primereact/progressbar';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalRevenue: 0,
            totaUserTrans: 0,
            usersList: []
        }
    }

    componentDidMount() {
        this.getRevenue()
        this.getUser()
    }
    getRevenue = async () => {
        try {
            let res = await HTTP.get('/transaction/revenue')
            console.log(res.data[0])
            this.setState({ totalRevenue: res.data[0].total_revenue, totalUserTrans: res.data[0].total_user })
        } catch (error) {
            console.log("error get revenue", error)
        }
    }

    getUser = async () => {
        try {
            let user = await HTTP.get('/user/get')
            console.log(user.data)
            this.setState({ usersList: user.data })
        } catch (error) {
            console.log("getuser", error)
        }
    }

    dateFormat = (value) => {
        return value.toLocaleDateString()
    }

    printCreatedDate = (rowData) => {
        return <span>{new Date(rowData.created_at).toLocaleDateString('id')}</span>
    }

    printLastUpdate = (rowData) => {
        return <span>{new Date(rowData.updated_at).toLocaleDateString('id')}</span>
    }
    render() {
        let { totalRevenue, totalUserTrans, usersList } = this.state
        return (
            <div class="main-content">
                <main>
                    <div className="my-3">
                        <h2 class="dash-title">Pharmaclick Dashboard</h2>
                        <span>Hello! You logged in as admin</span>
                    </div>
                    <div class="dash-cards">
                        <div class="card-single">
                            <div class="card-body">
                                <span class="ti-briefcase"></span>
                                <div>
                                    <h5>Account Balance</h5>
                                    <h4>IDR. {totalRevenue.toLocaleString()}</h4>
                                </div>
                            </div>
                            <div class="card-footer">
                                <a href="">View all</a>
                            </div>
                        </div>

                        <div class="card-single">
                            <div class="card-body">
                                <span class="ti-reload"></span>
                                <div>
                                    <h5>Total Registered User</h5>
                                    <h4>{totalUserTrans}</h4>
                                </div>
                            </div>
                            <div class="card-footer">
                                <a href="">View all</a>
                            </div>
                        </div>

                        <div class="card-single">
                            <div class="card-body">
                                <span class="ti-check-box"></span>
                                <div>
                                    <h5>Total User did Transactions</h5>
                                    <h4>{totalUserTrans}</h4>
                                </div>
                            </div>
                            <div class="card-footer">
                                <a href="">View all</a>
                            </div>
                        </div>
                    </div>


                    <section class="recent">
                        <div class="activity-grid">
                            <div class="activity-card">
                                <h3>List of Users</h3>
                                <DataTable value={this.state.usersList} paginator rows={5} emptyMessage="No customers found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[5, 10, 25, 50]}>
                                    <Column field="fullname" header="Name" sortable />
                                    <Column field="email" header="Email" style={{ width: '30%' }} sortable />
                                    <Column field="status" header="User Status" sortable />
                                    <Column field="created_at" body={this.printCreatedDate} header="Join Date" sortable />
                                    <Column field="updated_at" body={this.printLastUpdate} header="Last Update" sortable />
                                    {/* <Column field="10" header="Total Transactions" sortable /> */}
                                </DataTable>
                            </div>

                            <div class="summary">
                                <div class="summary-card">
                                    <div class="summary-single">
                                        <span class="ti-id-badge"></span>
                                        <div>
                                            <h5>196</h5>
                                            <small>Number of staff</small>
                                        </div>
                                    </div>
                                    <div class="summary-single">
                                        <span class="ti-calendar"></span>
                                        <div>
                                            <h5>16</h5>
                                            <small>Number of leave</small>
                                        </div>
                                    </div>
                                    <div class="summary-single">
                                        <span class="ti-face-smile"></span>
                                        <div>
                                            <h5>12</h5>
                                            <small>Profile update request</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="bday-card">
                                    <div class="bday-flex">
                                        <div class="bday-img"></div>
                                        <div class="bday-info">
                                            <h5>Dwayne F. Sanders</h5>
                                            <small>Birthday Today</small>
                                        </div>
                                    </div>

                                    <div class="text-center">
                                        <button>
                                            <span class="ti-gift"></span>
                                            Wish him
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default DashboardPage;