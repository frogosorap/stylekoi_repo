import React, { Component } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

import { SANDBOX_CLIENT_ID, SERVER_HOST } from "../config/global_constants"
import PayPalMessage from "./PayPalMessage"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"

export default class BuyCar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToPayPalMessage: false,
            payPalMessageType: null,
            payPalOrderID: null
        }
    }

    createOrder = (data, actions) => {
        // Extract form details from localStorage
        const orderName = localStorage.getItem("orderName");
        const orderEmail = localStorage.getItem("orderEmail");
        const address = localStorage.getItem("address");
        const phone = localStorage.getItem("phone");
    
        // Prepare data to be sent to the server
        const formData = new FormData();
        formData.append("orderName", orderName);
        formData.append("orderEmail", orderEmail);
        formData.append("address", address);
        formData.append("phone", phone);
    
        // Create the order with item details and form details
        return actions.order.create({
            purchase_units: [{
                amount: { value: this.props.price },
                // Include form details in the custom_id field or any other field
                custom_id: JSON.stringify({ orderName, orderEmail, address, phone })
            }]
        });
    }

    onApprove = (paymentData) => {
        const formData = {
            orderName: localStorage.getItem("orderName"),
            orderEmail: localStorage.getItem("orderEmail"),
            address: localStorage.getItem("address"),
            phone: localStorage.getItem("phone")
        };
        axios.post(
            `${SERVER_HOST}/sales/${paymentData.orderID}/${this.props.carID}/${this.props.price}`,formData, { headers: { "authorization": localStorage.token, "Content-type": "multipart/form-data" } })
            .then(res => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.SUCCESS,
                    payPalOrderID: paymentData.orderID,
                    redirectToPayPalMessage: true
                })
            })
            .catch(errorData => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.ERROR,
                    redirectToPayPalMessage: true
                })
            })
    }


    onError = errorData => {
        this.setState({
            payPalMessageType: PayPalMessage.messageType.ERROR,
            redirectToPayPalMessage: true
        })
    }


    onCancel = cancelData => {
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        this.setState({
            payPalMessageType: PayPalMessage.messageType.CANCEL,
            redirectToPayPalMessage: true
        })
    }

    render() {
        return (
            <div className="paypal-button">
                {this.state.redirectToPayPalMessage ? <Redirect to={`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalOrderID}`} /> : null}

                <PayPalScriptProvider options={{ currency: "EUR", "client-id": SANDBOX_CLIENT_ID }}>
                    <PayPalButtons style={{ layout: "horizontal" }} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel} />
                </PayPalScriptProvider>
            </div>
        )
    }
}
