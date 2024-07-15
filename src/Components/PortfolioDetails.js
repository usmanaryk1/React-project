import CustomHero from "./CustomHero"
import PortfolioContent from "./PortfolioContent";
import { useEffect } from "react";

const PortfolioDetails = ({onDelete, onEdit}) => {
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


    return (
        <div className="work-details">
            <CustomHero heroTitle="Work Details" breadcrumbItem1="Home" breadcrumbItem2="Library" breadcrumbItem3="Portfolio Details" />
            <PortfolioContent onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
}

export default PortfolioDetails;