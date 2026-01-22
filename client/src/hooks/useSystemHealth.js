import { useState, useEffect } from "react";

const useSystemHealth = () => {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    const pollHealth = async () => {
      try {
        // Use the API URL from your environment variables
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/health`);
        const data = await response.json();
        setHealth(data);
      } catch (error) {
        console.error("Health check failed:", error);
      }
    };

    pollHealth();
    const intervalId = setInterval(pollHealth, 300000); // 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  return health;
};

export default useSystemHealth;
