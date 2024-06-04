import { useState, useEffect } from "react";
import { token } from "../config.js";
const useFetchData = (url) => {

  // initialising states data, loading and error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // whenever url dependency changes, useffect performs the actions
  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);

      try {
        // fetch the information
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        }); 

        // save it in result after parsing it in json format
        const result = await res.json();

        // throw error (error handling 200-299 range)
        if (!res.ok) {
          throw new Error(result.message);
        }

        // setdata and setloading 
        setData(result.data);
        setLoading(false);

      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);
  return {
    data,
    loading,
    error,
  }; // returning data, loading and error states
};

export default useFetchData;
