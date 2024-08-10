import { useEffect } from "react";

const Footer = () => {

    useEffect(() => {
        const toggleBacktotop = () => {
            const backtotop = document.querySelector('.back-to-top');
            if (backtotop) {
                if (window.scrollY > 100) {
                    backtotop.classList.add('active');
                } else {
                    backtotop.classList.remove('active');
                }
            }
        };

        window.addEventListener('load', toggleBacktotop);
        window.addEventListener('scroll', toggleBacktotop);

        return () => {
            window.removeEventListener('load', toggleBacktotop);
            window.removeEventListener('scroll', toggleBacktotop);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {/* ======= Footer ======= */}
            <footer id="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="copyright-box">
                                <p className="copyright">© Copyright <strong>DevFolio</strong>. All Rights Reserved</p>
                                <div className="credits">
                                    {/*
        All the links in the footer should remain intact.
        You can delete the links only if you purchased the pro version.
        Licensing information: https://bootstrapmade.com/license/
        Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=DevFolio
      */}
                                    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>{/* End  Footer */}
            {/* use this as future reference and use logic */}

            {/* <div id="preloader"></div> */}
            <a href="#home" className="back-to-top d-flex align-items-center justify-content-center" onClick={scrollToTop}><i className="bi bi-arrow-up-short"></i></a>
        </>
    );
}

export default Footer;
