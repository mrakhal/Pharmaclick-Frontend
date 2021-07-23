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

class DialogProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameEdit: '',
            stockEdit: '',
            error: false
        }

        this.category = [
            { name: 'Covid', id: 1 },
            { name: 'Mata', id: 2 },
            { name: 'Flu dan Batuk', id: 3 },
            { name: 'Vitamin dan Suplemen', id: 4 },
            { name: 'Demam', id: 5 },
            { name: 'Pencernaan', id: 6 },
            { name: 'Hipertensi', id: 7 },
            { name: 'Otot, tulang dan sendi', id: 8 },
            { name: 'Kulit', id: 9 },
            { name: 'Demam', id: 10 }
        ];
    }

    componentDidMount() {

    }

    printWarning = (trigger) => {
        console.log(trigger)
        if (trigger) {
            return <small className="p-error">Required.</small>
        } else {
            return null
        }
    }
    saveChanges = () => {
        let { product_name, brand, stock, price, descriprion, usage, dosage, indication, effect } = this.props.productDetail
        let checkField = [product_name, brand, stock, price, descriprion, usage, dosage, indication, effect]
        if (checkField.indexOf("") > -1) {
            this.setState({error: true})
            setTimeout(() => {
                this.setState({error: false})
            }, 3000)
        } else {
            // fumgsi edit ke API
        }
    }

    
    
    render() {
        let { productDialog, productDetail, hide, stockChange, inputChange } = this.props
        const productDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-danger p-button-text" onClick={hide} />
                <Button label="Save" icon="pi pi-check" className="p-button-success p-button-text" onClick={this.saveChanges} />
            </React.Fragment>
        );
        return (
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid " onHide={hide} footer={productDialogFooter}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    {
                        productDetail.images &&
                        <img src={productDetail.images[0]} alt={productDetail.images[0]} style={{ width: '200px' }} />
                    }

                    <div className="w-100">
                        <label style={{ fontWeight: 'bold' }}>Product Name</label>
                        <InputText value={productDetail.product_name} onChange={(e) => inputChange(e, 'product_name')} style={{border: productDetail.product_name == "" ? '1px solid red' : null}} />
                        {productDetail.product_name == "" ? <small className="p-error">Required.</small> : null}
                    </div>
                    <div className="w-100 my-2">
                        <label style={{ fontWeight: 'bold' }} >Brand</label>
                        <InputText value={productDetail.brand} onChange={(e) => inputChange(e, 'brand')} style={{border: productDetail.brand == "" ? '1px solid red' : null}} />
                        {productDetail.brand == "" ? <small className="p-error">Required.</small> : null}
                    </div>
                    <div>
                        <label htmlFor="minmax-buttons" style={{ fontWeight: 'bold' }}>Stok</label>
                        <div className="d-flex" style={{ fontSize: '15px' }}>
                            <span>
                                <label >Netto</label>
                                <InputNumber inputId="minmax-buttons" value={productDetail.stock && productDetail.netto} onValueChange={(e) => stockChange(e, 'netto')} mode="decimal" showButtons min={0} max={100} />
                            </span>
                            <span className="mx-3">
                                <label >Qty</label>
                                <InputNumber inputId="minmax-buttons" value={productDetail.stock && productDetail.stock[0].qty} onValueChange={(e) => stockChange(e, 'netto')} mode="decimal" showButtons min={0} max={100} />
                            </span>
                            <span>
                                <label >Type</label>
                                <InputText value={productDetail.stock && productDetail.stock[0].type} disabled/>
                            </span>
                        </div>
                    </div>
                    <div className="w-100 my-2">
                        <label htmlFor="minmax-buttons" style={{ fontWeight: 'bold' }}>Price</label>
                        <InputNumber inputId="minmax-buttons" value={productDetail.stock && productDetail.pack_price} mode="decimal" showButtons min={0} max={100} mode="currency" currency="IDR" />
                    </div>
                    <div className="w-100 my-2">
                        <label style={{ fontWeight: 'bold' }} >Description</label>
                        <InputTextarea value={productDetail.description} onChange={(e) => inputChange(e, 'description')} autoResize style={{border: productDetail.description == "" ? '1px solid red' : null}}/>
                        {productDetail.description == "" ? <small className="p-error">Required.</small> : null}
                    </div>
                    <div className="w-100 my-2">
                        <label style={{ fontWeight: 'bold' }}>Usage</label>
                        <InputTextarea value={productDetail.usage} onChange={(e) => inputChange(e, 'usage')} style={{border: productDetail.usage == "" ? '1px solid red' : null}}/>
                        {productDetail.usage == "" ? <small className="p-error">Required.</small> : null}
                    </div>

                    <div className="w-100 my-2">
                        <label htmlFor="minmax-buttons" style={{ fontWeight: 'bold' }}>Dosage</label>
                        <InputTextarea value={productDetail.dosage} autoResize onChange={(e) => inputChange(e, 'dosage')}  style={{border: productDetail.dosage == "" ? '1px solid red' : null}} />
                        {productDetail.dosage == "" ? <small className="p-error">Required.</small> : null}
                    </div>
                    <div className="w-100 my-2">
                        <label htmlFor="minmax-buttons" style={{ fontWeight: 'bold' }}>Indication</label>
                        <InputTextarea value={productDetail.indication} onChange={(e) => inputChange(e, 'indication')} autoResize  style={{border: productDetail.indication == "" ? '1px solid red' : null}}/>
                        {productDetail.indication == "" ? <small className="p-error">Required.</small> : null}
                    </div>
                    {this.state.error && <Message severity="error" text="Fill all the form!" />}
                </div>
            </Dialog>
        );
    }
}
export default DialogProduct;