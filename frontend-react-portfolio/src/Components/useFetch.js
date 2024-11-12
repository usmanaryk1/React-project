import { useEffect, useState } from "react";

const useFetch = (url) => {
  console.log("url in useFetch", url);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [fetchKey, setFetchKey] = useState(0); // Add fetch key

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async (data) => {
      // console.log("fetching data", data);
      setIsPending(true);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error("Could not fetch data from that resource");
        }
        const result = await response.json();
        setData(result);
        // console.log("fetched data: ", result);
        setError(null);
        setIsPending(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          // Ignore abort errors
          setError(err.message);
        }
      } finally {
        setIsPending(false);
      }
    };
    fetchData();

    // Cleanup function to abort the fetch if the component unmounts or if url changes
    return () => controller.abort();
  }, [url, fetchKey]);

  const refetch = () => setFetchKey((prevKey) => prevKey + 1);

  return { data, isPending, error, setData, refetch };
};

export default useFetch;
