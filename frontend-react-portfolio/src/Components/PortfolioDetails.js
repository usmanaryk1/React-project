import CustomHero from "./CustomHero";
import PortfolioContent from "./PortfolioContent";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import Loading from "./Loading/Loading";
import Error from "./Error/Error";

const PortfolioDetails = forwardRef(({ onDeleteClick, onEditClick }, ref) => {
  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let workDetailsId = queryParams.get("workDetailsId");

  const { id: workId } = useParams();
  // console.log("details data id", workId);
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const {
    data: details,
    refetch,
    isPending,
    error,
  } = useFetch(`${API_URL}/api/workDetails/${workDetailsId}`);
  // console.log("details data ", details);

  const childFunction = (newWorkDetailsId) => {
    console.log("newWorkDetailsId:", newWorkDetailsId);
    refetch();
  };

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <div className="work-details">
      <CustomHero
        heroTitle="Work Details"
        breadcrumbItem1="Home"
        breadcrumbItem2="Projects"
        breadcrumbItem3="Project Details"
      />
      {details && (
        <PortfolioContent
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
          details={details}
          workId={workId}
        />
      )}
    </div>
  );
});

export default PortfolioDetails;
