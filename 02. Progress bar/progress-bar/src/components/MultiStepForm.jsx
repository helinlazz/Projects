import React, { useState } from 'react'
import Alert from './Alert'
import './MultiStepForm.css'

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    address: '',
    zipCode: '',
    province: '',
    packages: [],
    paymentMethod: '',
    cardNumber: '',
  })
  const [showAlert, setShowAlert] = useState(false)

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === 'checkbox'
          ? checked
            ? [...prevData[name], value]
            : prevData[name].filter((item) => item !== value)
          : value,
    }))
  }

  const calculateTotalPrice = () => {
    const sushiMenuCost = 20
    const pizzaMenuCost = 15
    const hamburgerMenuCost = 10

    const total = formData.packages.reduce((acc, packageOption) => {
      switch (packageOption) {
        case 'Sushi menu':
          return acc + sushiMenuCost
        case 'Pizza menu':
          return acc + pizzaMenuCost
        case 'Hamburger menu':
          return acc + hamburgerMenuCost
        default:
          return acc
      }
    }, 0)

    return total
  }

  const handleSubmit = () => {
    console.log('Resume', formData)
    console.log('Total Price:', calculateTotalPrice())
    setShowAlert(true)
  }

  const handleAlertClose = () => {
    setShowAlert(false)
  }

  const renderFormStep = (step) => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Step 1: Login</h2>
            <form>
              <label>Email:</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              <label>Password:</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
            </form>
          </div>
        )
      case 2:
        return (
          <div>
            <h2>Step 2: Address Information</h2>
            <form>
              <label>Address:</label>
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
              />
              <label>ZIP Code:</label>
              <input
                type='text'
                pattern='[0-9]*'
                name='zipCode'
                value={formData.zipCode}
                onChange={handleChange}
              />
              <label>Province:</label>
              <input
                type='text'
                name='province'
                value={formData.province}
                onChange={handleChange}
              />
            </form>
          </div>
        )
      case 3:
        return (
          <div>
            <h2>Step 3: Choose your menu</h2>
            <form>
              <label>
                <input
                  type='checkbox'
                  name='packages'
                  value='Sushi menu'
                  checked={formData.packages.includes('Sushi menu')}
                  onChange={handleChange}
                />
                Sushi Menu - 20$
              </label>
              <label>
                <input
                  type='checkbox'
                  name='packages'
                  value='Pizza menu'
                  checked={formData.packages.includes('Pizza menu')}
                  onChange={handleChange}
                />
                Pizza Menu - 15$
              </label>
              <label>
                <input
                  type='checkbox'
                  name='packages'
                  value='Hamburger menu'
                  checked={formData.packages.includes('Hamburger menu')}
                  onChange={handleChange}
                />
                Hamburger Menu - 10$
              </label>
            </form>
          </div>
        )
      case 4:
        return (
          <div>
            <h2>Step 4: Payment Information</h2>
            <form action='#' method='post'>
              <section>
                <label>Card number</label>
                <input
                  type='text'
                  name='cardNumber'
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
              </section>

              <section>
                <label>Name on card</label>
                <input
                  type='text'
                  name='nameOnCard'
                  value={formData.nameOnCard}
                  onChange={handleChange}
                />
              </section>

              <section id='cc-exp-csc'>
                <div>
                  <label>CVV</label>
                  <input
                    type='text'
                    name='CVV'
                    value={formData.CVV}
                    onChange={handleChange}
                  />
                </div>
              </section>
            </form>
          </div>
        )
      case 5:
        return (
          <div>
            <h2>Step 5: Confirmation</h2>
            <div>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Address:</strong> {formData.address}, {formData.zipCode}
                , {formData.province}
              </p>
              <p>
                <strong>Packages:</strong> {formData.packages.join(', ')}
              </p>
              <p>
                <strong>Payment Method:</strong> {formData.paymentMethod}
              </p>
              <p>
                <strong>Card Number:</strong> {formData.cardNumber}
              </p>
              <p>
                <strong>Total Price:</strong> ${calculateTotalPrice()}
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const calculateProgress = () => {
    return ((currentStep - 1) / (totalSteps - 1)) * 100
  }

  return (
    <div className='multi-step-form-container'>
      <div className='progress-bar-container'>
        <div
          className='progress-bar'
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
      <div className='form-step'>{renderFormStep(currentStep)}</div>
      <div className='button-container'>
        {currentStep > 1 && <button onClick={handlePrevStep}>Previous</button>}
        {currentStep < totalSteps ? (
          <button onClick={handleNextStep}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
      {showAlert && (
        <Alert
          message='Thank you for your purchase!'
          onClose={handleAlertClose}
        />
      )}
    </div>
  )
}

export default MultiStepForm
