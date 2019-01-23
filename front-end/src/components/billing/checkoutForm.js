import React, { Component } from 'react';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	injectStripe,
} from 'react-stripe-elements';

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		//render a message only if purchase is complete
		this.state = { complete: false };
		this.submit = this.submit.bind(this);
	}

	async submit(ev) {
		let { token } = await this.props.stripe.createToken(
			{ name: 'Name' }.then(({ token, error }) => {
				if (error) {
					console.log(error);
				} else {
					console.log(token);
				}
			}),
		);
		let response = await fetch('http://localhost:9000/charge', {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain' },
			body: token.id,
		});
		// if checkout is complete then message will be displayed
		if (response.ok) this.setState({ complete: true });
	}

	render() {
		if (this.state.complete) {
			return <h1>Purchase Complete!</h1>;
		}
		return (
			<div id="shop" className="checkout">
				<p>KWC Billing</p>
				<p>Would you like to complete your purchase?</p>
				<CardNumberElement />
				<CardExpiryElement />
				<CardCVCElement />
				<button id="buttonCheckout" onClick={this.submit}>
					Buy Now
				</button>
			</div>
		);
	}
}

export default injectStripe(CheckoutForm);
