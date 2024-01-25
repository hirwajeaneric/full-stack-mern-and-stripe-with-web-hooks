import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Return = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
  
    useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');
  
      axios.get(`http://localhost:4242/session-status?session_id=${sessionId}`)
      .then((response) => {
        setStatus(response.data.status);
        setCustomerEmail(response.data.customer_email);
      })
      .catch((error) => {
        console.log(error);
      })
    }, []);
  
    if (status === 'open') {
      return (
        <Navigate to="/checkout" />
      )
    }
  
    if (status === 'complete') {
      return (
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to {customerEmail}.
  
            If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
      )
    }
  
    return null;
  }

  export default Return;