import React from 'react';
import {CardElement, StripeProvider, Elements, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const {token} = await this.props.stripe.createToken({name: 'Name'});
    // Send token to your server to process payment
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button>Pay</button>
      </form>
    );
  }
}

const InjectedCheckoutForm = injectStripe(CheckoutForm);

const App = () => {
  return (
    <StripeProvider apiKey="YOUR_API_KEY">
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    </StripeProvider>
  );
};

export default App;
