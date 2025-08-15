import PropTypes from "prop-types";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useState } from "react";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({
  price,
  userName,
  userEmail,
  trainerName,
  slotName,
  packageName,
  slotId,
  trainerId,
  selectedClasses,
}) => {
  const [loading, setLoading] = useState(false)
  const stripe = useStripe();
  const navigate = useNavigate()
  const elements = useElements();
  const axiosSecure = useAxiosSecure()

  const classesId = selectedClasses.map(selectedClass => selectedClass.value)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!stripe || !elements) return;

    // Fetch Payment Intent from the backend
    const response = await axiosSecure.post("/api/create-payment-intent", {
      amount: price * 100,
    });

    const clientSecret = response.data.clientSecret;

    // Confirm Payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: userName, email: userEmail },
      },
    });

    if (result.error) {
      setLoading(false)
      Swal.fire("Error","Payment failed: " + result.error.message, "error");
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // Save payment info to the database
        const paymentInfo = {
          trainerName,
          trainerId,
          slotName,
          slotId,
          packageName,
          price,
          classesId,
          userName,
          userEmail,
          paymentId: result.paymentIntent.id,
        };
        const saveResult = await axiosSecure.post("/api/save-payment-info", paymentInfo);

        if(saveResult.status===200){
          setLoading(false)
          Swal.fire("Success!", "Successfully Booked The Trainer!", "success");
          navigate('/')
        } else {
          setLoading(false)
          Swal.fire("Error!", "Error Booking The Trainer!", "error");
        }   
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition"
      >
        {loading && <Spinner color="info" aria-label="Info spinner example" />}{" "}Pay ${price}
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  price: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  trainerName: PropTypes.string,
  slotName: PropTypes.string,
  packageName: PropTypes.string,
  selectedClasses: PropTypes.array,
  slotId: PropTypes.string,
  trainerId: PropTypes.string,
};

export default CheckoutForm;
