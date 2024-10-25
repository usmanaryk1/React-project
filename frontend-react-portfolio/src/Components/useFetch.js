import { useEffect, useState } from "react";

const useFetch = (url) => {
  console.log("url in useFetch", url);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [fetchKey, setFetchKey] = useState(0); // Add fetch key

  useEffect(() => {
    const fetchData = async (data) => {
      console.log("fetching data", data);
      setIsPending(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Could not fetch data from that resource");
        }
        const result = await response.json();
        setData(result);
        console.log("fetched data: ", result);
        setError(null);
        setIsPending(false);
      } catch (err) {
        setError(err.message);
        setIsPending(false);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [url, fetchKey]);

  // useEffect(() => {
  //     fetchData();
  //     console.log('useEffect fetch:');
  // }, [fetchData]);

  const refetch = () => setFetchKey((prevKey) => prevKey + 1);

  return { data, isPending, error, setData, refetch };
};

export default useFetch;
