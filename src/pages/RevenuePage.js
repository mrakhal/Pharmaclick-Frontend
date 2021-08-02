import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../assets/css/SidebarComp.css'
import { Calendar } from 'primereact/calendar';

class RevenuePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ''
        }
    }

    render() {
        return (
            <div className="main-content">
                <main>
                    <h3>Revenue Overview</h3>
                    <Calendar value={this.state.date} onChange={(e) => this.setState({ date: e.value })} inline showWeek selectionMode="range" readOnlyInput />
                </main>
            </div>
        );
    }
}

export default RevenuePage;