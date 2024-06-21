const AboutDetails = ({ details }) => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Profile</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Skills</th>
                        <th scope="col">Description</th>
                        <th scope="col">Profile Picture</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    <tr>
                    <td>{details.name}</td>
                    <td>{details.profile}</td>
                    <td>{details.email}</td>
                    <td>{details.phone}</td>
                    <td>{details.skill}</td>
                    <td>{details.desc}</td>
                    <td>{details.file ? details.file.name : "No File Uploaded"}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default AboutDetails