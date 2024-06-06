import { useEffect, useState } from "react";


const useFetch = (url) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setData(data);

                })
        }, 100);
    }, [url])

    return { data };
}

export default useFetch;