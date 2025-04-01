// Simple toast hook for demonstration
const useToast = () => {
  const toast = ({ title, description }) => {
    console.log(`${title}: ${description}`);
    // In a real app, you would use a toast library like react-hot-toast or react-toastify
    alert(`${title}: ${description}`);
  };

  return toast;
};

export default useToast;
