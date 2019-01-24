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
		this.state = {
			complete: false,
		};
		this.submit = this.submit.bind(this);
	}
	//initiating the radio button
	getInitialState = () => {
		return {
			selectedOption: '',
		};
	};
	//handle radio button
	handleOptionChange = event => {
		this.setState({ selectedOption: event.target.value });
	};

	async submit(ev) {
		let { token } = await this.props.stripe.createToken({ name: 'Name' });
		let response = await fetch('http://localhost:9000/charge', {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain' },
			body: token.id,
		});
		console.log(response);
		// if checkout is complete then message will be displayed
		if (response.ok) this.setState({ complete: true });
		console.log('Purchase Complete');
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
				<form className="options">
					<label>
						<input
							type="radio"
							name="100 credits - $299.99"
							value="unlimited jobs 1 month"
							checked={this.state.selectedOption === '100 credits'}
							onChange={this.handleOptionChange}
						/>
						100 credits - $299.99
					</label>
					<label>
						<input
							type="radio"
							name="50 credits - $99.99"
							value="post jobs 12"
							checked={this.state.selectedOption === '50 credits'}
							onChange={this.handleOptionChange}
						/>
						50 credits - $99.99
					</label>
					<label>
						<input
							type="radio"
							name="1 credit - $9.99"
							value="post a job"
							checked={this.state.selectedOption === '1 credit'}
							onChange={this.handleOptionChange}
						/>
						1 credit - $9.99
					</label>
				</form>
				<button id="buttonCheckout" onClick={this.submit}>
					Buy Now
				</button>
			</div>
		);
	}
}

export default injectStripe(CheckoutForm);
