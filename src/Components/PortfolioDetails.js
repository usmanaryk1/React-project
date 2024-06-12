import { useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import CustomHero from "./CustomHero"
import PortfolioContent from "./PortfolioContent";
import { useEffect } from "react";

const PortfolioDetails = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "%PUBLIC_URL%/assets/js/main.js";
        console.log("PortfolioDetails");
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const { id } = useParams();
    const { data: work, error } = useFetch("http://localhost:8000/works/" + id);

    return (
        <div className="blog-details">
            {/* {isPending && <div className="loading"> Loading...</div>} */}
            {error && <div className="error">{error}</div>}
            {work && (
                <>
                    <CustomHero heroTitle="Portfolio Details" breadcrumbItem1="Home" breadcrumbItem2= "Library" breadcrumbItem3="Portfolio Details" />
                    <PortfolioContent work={work} />
                </>
            )}
        </div>
    );
}

export default PortfolioDetails;