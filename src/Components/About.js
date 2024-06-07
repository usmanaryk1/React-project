const About = ({about}) => {

    // console.log("About name:", about.aboutName);
    // console.log("About profile:", about.aboutProfile)

    return (
        <>
            {/* ======= About Section ======= */}
            <section id="about" className="about-mf sect-pt4 route">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="box-shadow-full">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-5">
                                                <div className="about-img">
                                                    <img src={about.aboutImg} className="img-fluid rounded b-shadow-a" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-7">
                                                <div className="about-info">
                                                    <p><span className="title-s">Name: </span> <span> {about.aboutName} </span></p>
                                                    <p><span className="title-s">Profile: </span> <span> {about.aboutProfile} </span></p>
                                                    <p><span className="title-s">Email: </span> <span> {about.aboutEmail} </span></p>
                                                    <p><span className="title-s">Phone: </span> <span> {about.aboutPhone} </span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-mf">
                                            <p className="title-s">Skill</p>
                                            <span>HTML</span> <span className="pull-right">85%</span>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{ width: '85%' }} aria-valuenow={85} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                            <span>CSS3</span> <span className="pull-right">75%</span>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                            <span>PHP</span> <span className="pull-right">50%</span>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                            <span>JAVASCRIPT</span> <span className="pull-right">90%</span>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{ width: '90%' }} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="about-me pt-4 pt-md-0">
                                            <div className="title-box-2">
                                                <h5 className="title-left">
                                                    {about.aboutTitle}
                                                </h5>
                                            </div>
                                            <p className="lead">
                                                {about.aboutDesc1}
                                            </p>
                                            <p className="lead">
                                                {about.aboutDesc2}
                                            </p>
                                            <p className="lead">
                                                {about.aboutDesc3}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>{/* End About Section */}
        </>
    );
}

export default About;