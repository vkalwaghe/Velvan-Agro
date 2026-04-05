import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { supabase, hasSupabaseConfig } from '../lib/supabaseClient'

export default function Order() {
  const { items, totalAmount, clearCart } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const formattedTotal = useMemo(
    () => totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
    [totalAmount],
  )

  useEffect(() => {
    if (success) {
      const timer = window.setTimeout(() => {
        setSuccess('')
        navigate('/')
      }, 3200)
      return () => window.clearTimeout(timer)
    }
  }, [success, navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Please fill in all fields.')
      return
    }

    if (!items.length) {
      setError('Your cart is empty.')
      return
    }

    setError('')
    setSaving(true)

    const order = {
      customer_name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items,
      total_amount: totalAmount,
      created_at: new Date().toISOString(),
    }

    try {
      if (hasSupabaseConfig()) {
        const { error } = await supabase.from('orders').insert([order])
        if (error) throw error
      }

      clearCart()
      setSuccess('Your order has been placed successfully!')
    } catch (err) {
      setError('Unable to submit order right now. Please try again later.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="order">
      <h1>Place Your Order</h1>
      <p className="section__lead">
        Complete your order details. Your request will be recorded and we will
        follow up to confirm pricing and delivery.
      </p>
      <div className="order__layout">
        <form onSubmit={handleSubmit} className="order__form">
          <label>
            Full name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Your full name"
            />
          </label>
          <label>
            Phone number
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              placeholder="Mobile number"
            />
          </label>
          <label>
            Delivery address
            <textarea
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
              placeholder="Shipping or delivery address"
            />
          </label>

          <div className="order__meta">
            <span>Total:</span>
            <strong>{formattedTotal}</strong>
          </div>

          <button type="submit" className="button" disabled={saving}>
            {saving ? 'Placing order…' : 'Submit order'}
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>

        <aside className="order__summary">
          <h2>Order summary</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="order__item">
                <div>
                  <strong>{item.name}</strong> × {item.quantity}
                </div>
                <div>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <p className="order__note">
        After submitting, our sales team will reach out to confirm order details,
        availability, and delivery timings.
      </p>
    </section>
  )
}
