import CustomHero from "./CustomHero"
import CertificationContent from "./CertificationContent";

const CertificationDetails = () => {
    
    
    return (
        <div className="certifications-details">
            {/* {isPending && <div className="loading"> Loading...</div>} */}
            {/* {error && <div className="error">{error}</div>} */}
                    <CustomHero heroTitle="Certification Details" breadcrumbItem1="Home" breadcrumbItem2="Library" breadcrumbItem3="Data" />
                    <CertificationContent />
        </div>
    );
}

export default CertificationDetails;