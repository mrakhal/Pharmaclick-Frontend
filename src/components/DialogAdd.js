import React from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message'

class DialogAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUpload: '',
            productName: '',
            brand: '',
            stock: [],
            price: null,
            description: '',
            usage: '',
            dosage: '',
            netto: null,
            qty: null,
            price: null,
            description: '',
            usage: '',
            dosage: '',
            indication: '', 
            effect: ''
        }
    }

    onBtnAdd = () =>{
        let {productName, brand} = this.state
        alert(brand)
    }
    render() {
        let { stockChange, addDialog, hide, productName, brand, stock, price, description, usage, dosage, indication, effect, netto, qty } = this.props
        console.log("name", productName)
        const productDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-danger p-button-text" onClick={hide} />
                <Button label="Add" icon="pi pi-check" className="p-button-success p-button-text" onClick={this.onBtnAdd} />
            </React.Fragment>
        );
        return (
            <Dialog visible={addDialog} style={{ width: '450px' }} header="Add New Product" modal className="p-fluid " onHide={hide} footer={productDialogFooter}>

                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div style={{ width: '250px', height: '150px', border: '1px solid grey' }} className="d-flex align-items-center justify-content-center">
                        <img src={this.state.fileUpload ? URL.createObjectURL(this.state.fileUpload) : 'https://image.flaticon.com/icons/png/512/1837/1837526.png'}
                            style={{ height: this.state.fileUpload ? '110%' : '30px'}} />
                    </div>
                    <FileUpload mode="basic" auto name="upload" accept="image/*" maxFileSize={1000000} className="mt-3" onUpload={(e) => this.uploadImage(e)} 
                    onSelect={(e) => this.setState({fileUpload: e.files[0]})}/>

                    <div className="w-100">
                        <label style={{ fontWeight: 'bold' }}>Product Name</label>
                        <InputText onChange={(e) => this.setState({productName: e.target.value })}/>
                        { productName ? null : <small className="p-error">Required.</small>}

                    </div>
                    <div className="w-100 my-2">
                        <label style={{ fontWeight: 'bold' }} >Brand</label>
                        <InputText onChange={(e) => this.setState({brand: e.target.value })}/>
                        {brand && <small className="p-error">Required.</small>}

                    </div>
                    <div>
                        <label htmlFor="minmax-buttons" style={{ fontWeight: 'bold' }}>Stok</label>
                        <div className="d-flex" style={{ fontSize: '15px' }}>
                            <span>
                                <label >Netto</label>
                                <InputNumber inputId="minmax-buttons" mode="decimal" showButtons min={0} max={100} />
                                {!netto && <small className="p-error">Required.</small>}
                            </span>
                            <span className="mx-3">
                                <label >Qty</label>
                                <InputNumber inputId="minmax-buttons" mode="decimal" showButtons min={0} max={100} />
                                <small className="p-error">Required.</small>
                                {!qty && <small className="p-error">Required.</small>}
                            </span>
                            <span>
                                <label >Type</label>
                                <InputText disabled value="pack" />
                            </span>
                        </div>
                    </div>
                    <div className="w-100 my-2">
                        <label htmlFor="minmax-buttons" style={{ fontWeight: 'bold' }}>Price</label>
                        <InputNumber inputId="minmax-buttons" mode="decimal" showButtons min={0} mode="currency" currency="IDR" />
                        {!price && <small className="p-error">Required.</small>}
                    </div>
                    <div className="w-100 my-2">
                        <label style={{ fontWeight: 'bold' }} >Description</label>
                        <InputTextarea autoResize />
                        {!description && <small className="p-error">Required.</small>}
                    </div>
                    <div className="w-100 my-2">
                        <label style={{ fontWeight: 'bold' }}>Usage</label>
                        <InputTextarea />
                        {!usage && <small className="p-error">Required.</small>}
                    </div>
                    <div className="w-100 my-2">
                        <label htmlFor="minmax-buttons" style={{ fontWeight: 'bold' }}>Dosage</label>
                        <InputTextarea autoResize />
                        {!dosage && <small className="p-error">Required.</small>}
                    </div>
                    <div className="w-100 my-2">
                        <label htmlFor="minmax-buttons" style={{ fontWeight: 'bold' }}>Indication</label>
                        <InputTextarea autoResize />
                        {!indication && <small className="p-error">Required.</small>}
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default DialogAdd;