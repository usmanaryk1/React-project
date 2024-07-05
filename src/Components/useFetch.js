import { useEffect, useState } from "react";


const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch data from that resource')
                    }
                    // console.log("Response: ",res);
                    return res.json();
                })
                .then(data => {
                    // console.log('Raw data:', data); // Inspect the raw data
                    // const about = data.about; // or whatever the key is
                    // console.log('About object:', about);
                    setData(data);
                    setError(null);
                    setIsPending(false);

                })
                .catch(err => {
                    setError(err.message);
                    setIsPending(false);
                })
        }, 5);
    }, [url])

    return { data, isPending, error, setData };
}

export default useFetch;