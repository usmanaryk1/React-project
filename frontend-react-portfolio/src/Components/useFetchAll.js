// import { useState, useEffect, useMemo } from "react";

// const useFetchAll = (API_URL, endpoints) => {
//   const [data, setData] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true; // Prevents setting state on unmounted component

//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         // Fetch all endpoints in parallel
//         const responses = await Promise.all(
//           endpoints.map((endpoint) =>
//             fetch(`${API_URL}/api/${endpoint}`).then((res) => {
//               if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
//               return res.json();
//             })
//           )
//         );

//         // Map fetched data to corresponding endpoint keys
//         const results = endpoints.reduce((acc, key, index) => {
//           acc[key] = responses[index];
//           return acc;
//         }, {});

//         if (isMounted) {
//           setData(results);
//           setIsLoading(false);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message);
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, [API_URL, endpoints]);

//   return useMemo(() => ({ data, isLoading, error }), [data, isLoading, error]);
// };

// export default useFetchAll;

import { useState, useEffect, useMemo } from "react";

const useFetchAll = (API_URL, endpoints) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent memory leaks

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const responses = await Promise.all(
          endpoints.map(async (endpoint) => {
            const res = await fetch(`${API_URL}/api/${endpoint}`);
            if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
            return [endpoint, await res.json()]; // Return key-value pairs
          })
        );

        // Convert response array to object format { "hero": data, "about": data, ... }
        const results = Object.fromEntries(responses);
console.log("results",results);

        if (isMounted) {
          setData(results);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [API_URL, endpoints]);

  return useMemo(() => ({ data, isLoading, error }), [data, isLoading, error]);
};

export default useFetchAll;
