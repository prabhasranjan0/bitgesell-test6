import "./LoadingSpinner.css";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-spinner__container">
      <div className="loading-spinner__circle" />
      <p className="loading-spinner__message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
