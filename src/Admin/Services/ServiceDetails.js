const ServiceDetails = ({details}) => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    <tr>
                        <td>{details.title}</td>
                        <td>{details.description}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default ServiceDetails;