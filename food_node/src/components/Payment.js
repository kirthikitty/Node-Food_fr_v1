import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar  from './Navbar';

const Payment = () => {
  const navigate = useNavigate();
  const { totalPrice } = useParams();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Card Number validation
    if (!/^\d{16}$/.test(cardNumber)) {
      errors.cardNumber = 'Invalid card number. Must be 16 digits.';
    }

    // Expiry Date validation
    if (!/^\d{2}\/\d{4}$/.test(expiryDate)) {
      errors.expiryDate = 'Invalid expiry date. Must be in the format MM/YYYY.';
    }

    // CVV validation
    if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = 'Invalid CVV. Must be 3 digits.';
    }

    // Name validation
    if (name.trim() === '') {
      errors.name = 'Name on card is required.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors === null) {
      alert('Payment submitted');
      alert('Your order has been Placed');
      navigate("/");
    } else {
      // Notify the user about validation errors
      for (const field in validationErrors) {
        alert(validationErrors[field]);
      }
      setErrors(validationErrors);
    }
  };

  return (
    <div>
        <Navbar />
    <div className="container w-50">
      <br />
      <div className='text-center text-primary' style={{ fontWeight: 'bold', fontSize: '22px', fontStyle: 'italic' }}>Payment Details</div>
      <br />
      <div className='text-center border p-4' style={{ height: '550px', backgroundColor: '#e1eaef', borderRadius: "15px" }}>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">
            Card Number
          </label>
          <input className="form-control" id="cardNumber" value={cardNumber} type="tel" placeholder='0000 0000 0000 0000' pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}" onChange={(e) => setCardNumber(e.target.value)} required />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="expiryDate" className="form-label">
              Expiry Date
            </label>
            <input type="text" placeholder='mm/yyyy' className="form-control" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
          </div>
          <div className="col">
            <label htmlFor="cvv" className="form-label">
              CVV
            </label>
            <input type="text" placeholder='000' className="form-control" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name on Card
          </label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="totalAmount" className="form-label">
            Total Amount
          </label>
          <input type="text" className="form-control" id="totalAmount" value={`$${totalPrice}`} readOnly />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handlePaymentSubmit}>Submit Payment</button>
      </div>
    </div>
    </div>

  );
};

export default Payment;
