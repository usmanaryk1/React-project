const PortfolioDetails = ({ details }) => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Link</th>
                        <th scope="col">Category</th>
                        <th scope="col">Project Image</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    <tr>
                        <td>{details.title}</td>
                        <td>{details.link}</td>
                        <td>{details.category}</td>
                        <td>{details.file ? details.file.name : "No File Uploaded"}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default PortfolioDetails;