import { useEffect, useState, useCallback } from "react";


const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    const fetchData = useCallback(() => {
        setIsPending(true);
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch data from that resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setError(null);
                setIsPending(false);
            })
            .catch(err => {
                setError(err.message);
                setIsPending(false);
            });
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [url, fetchData]);

    return { data, isPending, error, setData, refetch: fetchData };
}

export default useFetch;