/** @format */

import React, { useContext } from 'react'
import '../styles/components/Payment.css'
import { PayPalButton } from 'react-paypal-button-v2'
import AppContext from '../context/AppContext'

const Payment = ({ history }) => {
  const { state, addNewOrder } = useContext(AppContext)
  const { cart, buyer } = state

  const paypalOtions = {
    clientId: 'access_token$sandbox$zxkjc22984z3n44s$30c45b07fb3b12ba29ca26683bf22326',
    intent: 'capture',
    currency: 'USD',
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  }

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price
    const sum = cart.reduce(reducer, 0)
    return sum
  }

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: cart,
      }

      addNewOrder(newOrder)
      history.push('/checkout/success')
    }
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resument del pedido:</h3>
        {cart.map((item, index) => (
          <div key={`${item.title}+${index.toString()}`} className="Payment-item">
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>{`$ ${item.price}`}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOtions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onSuccess={(data) => handlePaymentSuccess(data)}
            onError={(error) => console.log(error)}
            onCancel={(data) => console.log(data)}
          />
        </div>
      </div>
      <div />
    </div>
  )
}

export default Payment
