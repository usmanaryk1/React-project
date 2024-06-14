import { useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import CustomHero from "./CustomHero"
import CertificationContent from "./CertificationContent";

const CertificationDetails = () => {
    
    const { id } = useParams();
    const { data: certification, error } = useFetch("http://localhost:8000/certifications/" + id);

    return (
        <div className="certifications-details">
            {/* {isPending && <div className="loading"> Loading...</div>} */}
            {error && <div className="error">{error}</div>}
            {certification && (
                <>
                    <CustomHero heroTitle="Certification Details" breadcrumbItem1="Home" breadcrumbItem2="Library" breadcrumbItem3="Data" />
                    <CertificationContent certification={certification} />
                </>
            )}
        </div>
    );
}

export default CertificationDetails;