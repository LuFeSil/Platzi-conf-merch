/** @format */

import React, { useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/Information.css'
import AppContext from '../context/AppContext'

const Information = ({ history }) => {
  const { state, addToBuyer } = useContext(AppContext)
  const form = useRef(null)

  const { cart } = state

  function handleSubmit() {
    const formData = new FormData(form.current)
    const buyer = Object.fromEntries(formData)
    addToBuyer(buyer)
    history.push('/checkout/payment')
  }

  return (
    <div className="Information">
      <div className="Information-content">
        <div className="Information-head">
          <h2>Informacion de contacto:</h2>
        </div>
        <div className="Information-form">
          <form ref={form}>
            <input type="text" placeholder="Nombre completo" name="name" />
            <input type="text" placeholder="Correo Electronico" name="email" />
            <input type="text" placeholder="Direccion" name="address" />
            <input type="text" placeholder="Apto" name="apto" />
            <input type="text" placeholder="Ciudad" name="city" />
            <input type="text" placeholder="Pais" name="country" />
            <input type="text" placeholder="Estado" name="state" />
            <input type="text" placeholder="Codigo postal" name="cp" />
            <input type="text" placeholder="Telefono" name="phone" />
          </form>
        </div>
        <div className="Information-buttons">
          <div className="Information-back">
            <Link to="/checkout">Regresar</Link>
          </div>
          <div className="Information-next">
            <button type="button" onClick={handleSubmit}>
              pagar
            </button>
          </div>
        </div>
      </div>
      <div className="Information-sidebar">
        <h3>Pedido:</h3>
        {cart.map((item, index) => (
          <div key={`${item.title}-${index.toString()}`} className="Information-item">
            <div className="Information-element">
              <h4>{item.title}</h4>
              <span>{`$ ${item.price}`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Information
