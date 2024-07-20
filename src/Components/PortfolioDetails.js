import CustomHero from "./CustomHero"
import PortfolioContent from "./PortfolioContent";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import { forwardRef, useImperativeHandle } from 'react';
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const PortfolioDetails = forwardRef(({ onDeleteClick, onEditClick }, ref) => {
    useImperativeHandle(ref, () => ({
        childFunction
    }));

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    let workDetailsId = queryParams.get('workDetailsId');

    const { id } = useParams();
    console.log('details data id', id);
    const { data: details, refetch } = useFetch("http://localhost:8000/workDetails/" + workDetailsId);
    console.log('details data ', details);

    const childFunction = (newWorkDetailsId) => {
        console.log('newWorkDetailsId:', newWorkDetailsId);
        refetch();
    }

    return (
        <div className="work-details">
            <CustomHero heroTitle="Work Details" breadcrumbItem1="Home" breadcrumbItem2="Library" breadcrumbItem3="Portfolio Details" />
            {details && <PortfolioContent
                onDeleteClick={onDeleteClick}
                onEditClick={onEditClick}
                details={details}
            />}
        </div>
    );
})

export default PortfolioDetails;