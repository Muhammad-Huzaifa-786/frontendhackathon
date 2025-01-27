import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseUrl } from '../../Functions/Url';
import './Welcome.css';
import QRCode from 'qrcode'; // Import QRCode from qrcode package
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import LoanCalculator from '../LoanCalculator/LoanCalculator';
const MySwal = withReactContent(Swal);

function Welcome() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [modal, setModal] = useState(false);
  const [modalSlip, setModalSlip] = useState(false);
  const [loanTypes, setLoantype] = useState('');
  const [id, setId] = useState('');
  const [qr, setQr] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cnic: '',
    city: '',
    gender: '',
    loanAmount: '', // Added loan amount
    returnTime: '', // Added return time in months
  });

  useEffect(() => {
    // check();
  }, []);

  function Click(e) {
    console.log(e);
    setLoantype(e);
    setModal(true);
  }
  useEffect(() => {
    const generateQrCode = async () => {
      const qr = `${window.location.origin}/user/${id}`; // Your QR code content

      try {
        // Generate the QR code as a data URL
        setQr(qr); // Set the QR code content to state
        const url = await QRCode.toDataURL(qr);
        setQrCodeUrl(url); // Set the generated URL to state
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };
    generateQrCode();
  }, [id]); // Dependency array
  const handleCopy = () => {
    navigator.clipboard.writeText(qr) // Copy URL to clipboard
      .then(() => {
        MySwal.fire('Saved!', 'Your url has been copy.', 'success');
      })
      .catch((err) => {
        console.error('Error copying URL:', err);
        toast.error('Failed to copy QR Code URL'); // Show error toast
      });
  };
  const submitDetail = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const { name, email, cnic, gender, loanAmount, returnTime ,city} = formData; // Destructure form data
    if (!name || !email || !cnic || !gender || !loanAmount || !returnTime || !city) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return; // Exit the function if validation fails
    }
    // Prepare data to send
    const dataToSend = {
      name,
      email,
      cnic,
      city,
      gender,
      loanAmount: Number(loanAmount), // Convert to number
      returnTime: Number(returnTime),
      loanType: loanTypes // Convert to number
    };

    console.log(dataToSend); // Log the data to send

    try {
      const response = await axios.post(`${BaseUrl}/api/auth/Adduser`, dataToSend);
      const userId = response.data.user._id;
      // Adjust according to your backend response structure
      console.log(userId, "User ID"); // Log the user ID
      setId(userId); // Set the user ID in state
      setModalSlip(true); // Open the slip modal
      setModal(false); // Close the modal after submission
      // alert('User added successfully'); // Notify the user
      MySwal.fire('Saved!', 'User Added Successfully.', 'success');
      setFormData({ // Reset form data
        name: '',
        email: '',
        cnic: '',
        gender: '',
        loanAmount: '',
        city: '',
        returnTime: '',
      });
    } catch (error) {
      console.error('Failed to add user:', error.response ? error.response.data : error.message); // Log the error response for debugging
        MySwal.fire('Oop!', 'Failed to add user', 'error');   
      // alert('Failed to add user'); // Notify the user of failure

      return
    }
  };



  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  const handleButtonClick = () => {
    const isLoggedInUserEmail = localStorage.getItem('isLoggedInUserEmail');
    if (isLoggedInUserEmail) {
      navigate(`/userdashboard/${isLoggedInUserEmail}`);
    } else {
      navigate('/user/login');
    }
  };
  const handleButtonClickAdmin = () => {
    const isLoggedInUserEmail = localStorage.getItem('isLoggedInUserAdmin');

    if (isLoggedInUserEmail) {
      navigate(`/admin`);
    } else {
      navigate('/admin/login');
    }
  };
  return (
    <div><div>

      <nav className="navbar">
        <div id='navbarimgheading'>
          <img src="https://saylaniwelfareusa.com/static/media/logo_saylaniwelfareusa.22bf709605809177256c.png" alt="Logo" className="logo" />
          <h2>Saylani Micro Finance App</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleButtonClick}>User</button>
          <button onClick={handleButtonClickAdmin}>Admin</button>
        </div>
      </nav>
    </div>
      <div id='WelcomeCard'>
        <div id='wedding' className='card' onClick={() => Click('Wedding')}>
          <h2 style={{ color: 'white' }}>Wedding</h2>
        </div>
        <div id='home' className='card' onClick={() => Click('Home')}>
          <h2 style={{ color: 'white' }}>Home</h2>
        </div>
        <div id='business' className='card' onClick={() => Click('Business')}>
          <h2 style={{ color: 'white' }}>Business</h2>
        </div>
        <div id='education' className='card' onClick={() => Click('Education')}>
          <h2 style={{ color: 'white' }}>Education</h2>
        </div>
      </div>

      {modalSlip && (
        <div id='Modalofslip'>
          <h3>Your User ID QR Code:</h3>
          {qrCodeUrl && <img src={qrCodeUrl} alt="Generated QR Code" />}
          <p>{qr}</p> {/* Show the URL */}
          <button id='btncopy' onClick={handleCopy}>Copy QR Code URL</button> {/* Button to copy URL */}
        </div>
      )}
      {modal && (
        <div id='Modal'>
          <div id='ModalContent'>
            <h1>Modal</h1>
            <h3>Please fill in the details below:</h3>
            <form onSubmit={submitDetail}>
              <label>Name</label>
              <input
                name='name'
                placeholder='Name'
                type='text'
                value={formData.name}
                onChange={handleChange}
              />
              <label>Email</label>
              <input
                name='email'
                placeholder='Email'
                type='email'
                value={formData.email}
                onChange={handleChange}
              />
              <label>CNIC</label>
              <input maxLength={13}
                name='cnic'
                placeholder='CNIC'
                type='number'
                value={formData.cnic}
                onChange={handleChange}
              /><label>City</label>
              <input
                name='city'
                placeholder='City'
                type='text'
                value={formData.city}
                onChange={handleChange}
              />
              <label>Gender</label>
              <select
                name='gender'
                value={formData.gender}
                onChange={handleChange}
              >
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
              <label>Loan Amount</label>
              <input
                name='loanAmount'
                placeholder='Loan Amount'
                type='number'
                value={formData.loanAmount}
                onChange={handleChange}
              />
              <label>Return Time (Months)</label>
              <input
                name='returnTime'
                placeholder='Return Time (Months)'
                type='number'
                value={formData.returnTime}
                onChange={handleChange}
              />
              <button id='submitbtn' type='submit'>Submit</button>
            </form>
            <br />
            <button onClick={() => setModal(false)}>Close</button>
          </div>
        </div>
      )}
      <LoanCalculator />
    </div>
  );
}

export default Welcome;
