import React, { useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants';

const SosRegister = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !phone) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/sos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId: email, phone: phone }),
      });

      if (response.ok) {
        setSuccess('Registration successful');
        setError('');
        setTimeout(() => navigate('/sos-homepage'), 2000); // Redirect after 2 seconds
      } else {
        setError('Registration failed');
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-[#dbeafe] p-8 rounded-lg shadow-lg max-w-xs sm:max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#1e40af] mb-8">SOS Registration</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4  border-[#1e40af] py-3"
        />
        <Input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-4  border-[#1e40af] py-3"
        />
        <Button color="green" className="w-full bg-[#1e40af]" onClick={handleRegister}>
          Register
        </Button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default SosRegister;
