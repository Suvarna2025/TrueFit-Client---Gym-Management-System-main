import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import ScrollToTop from "../../components/ScrollToTop";
import { Helmet } from "react-helmet-async";

// Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const trainerData = location.state.trainerData;
  const slot = location.state.slot;
  const selectedPackage = location.state.selectedPackage;

  return (
    <div className="max-w-xl mx-auto mt-6 border bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
      <ScrollToTop></ScrollToTop>
      <Helmet>
        <title>TrueFit - Please Pay To Book The Trainer.</title>
      </Helmet>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        Payment Page 💳
      </h1>
      <div className="mb-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-600 dark:text-gray-300">Trainer Name:</span>
          <span>{trainerData?.fullName || trainerData?.displayName}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2 mt-4">
          <span className="font-semibold text-gray-600 dark:text-gray-300">Slot Name:</span>
          <span>{slot?.slotName}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2 mt-4">
          <span className="font-semibold text-gray-600 dark:text-gray-300">Package Name:</span>
          <span>{selectedPackage?.name}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2 mt-4">
          <span className="font-semibold text-gray-600 dark:text-gray-300">Price:</span>
          <span>${selectedPackage?.price}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2 mt-4">
          <span className="font-semibold text-gray-600 dark:text-gray-300">Your Name:</span>
          <span>{user?.displayName}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2 mt-4">
          <span className="font-semibold text-gray-600 dark:text-gray-300">Email:</span>
          <span>{user?.email}</span>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          price={selectedPackage?.price}
          userName={user?.displayName}
          userEmail={user?.email}
          trainerName={trainerData?.fullName || trainerData?.displayName}
          slotName={slot?.slotName}
          packageName={selectedPackage?.name}
          slotId={slot._id}
          trainerId={trainerData._id}
          selectedClasses={slot.selectedClasses}
        />
      </Elements>
    </div>
  );
};

export default PaymentPage;
