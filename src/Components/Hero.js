import Swal from 'sweetalert2';
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import useFetch from './useFetch';
import { useAuth } from '../CMSAdmin/Auth/AuthContext';

const Hero = ({ onEdit, onDelete }) => {

    const { isAuthenticated, isAdminPage } = useAuth();

    console.log('hero auth: ', isAuthenticated);

    const { data: hero } = useFetch("http://localhost:8000/hero");
    /**
* Intro type effect
*/
    const typedRef = useRef(null);
    useEffect(() => {
        if (hero && hero.length > 0) {
            const typedElement = document.querySelector('.typed');
            if (typedElement) {
                let typed_strings = typedElement.getAttribute('data-typed-items');

                if (typed_strings) {
                    typed_strings = typed_strings.split(',');
                    // Initialize Typed.js and store the instance in the ref
                    typedRef.current = new Typed('.typed', {
                        strings: typed_strings,
                        loop: true,
                        typeSpeed: 100,
                        backSpeed: 50,
                        backDelay: 2000
                    });
                }
            }
            // Cleanup function to destroy the Typed instance
            return () => {
                if (typedRef.current) {
                    typedRef.current.destroy();
                }
            };
        }
    }, [hero]);

    const handleDeleteClick = (heroId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(heroId);
            }
        });
    };

    return (
        <>
            {/* ======= Hero Section ======= */}
            {hero && hero.length > 0 && (
                <div id="hero" className="hero route bg-image" style={{ backgroundImage: 'url(../assets/img/hero-bg.jpg)' }}>
                    <div className="overlay-itro" />
                    <div className="hero-content display-table">
                        <div className="table-cell">
                            {isAuthenticated && isAdminPage && (
                                <div className='admin-actions d-flex justify-content-end align-items-start'>
                                    {hero.map((heroItem) => (
                                        <div key={heroItem.id}>
                                            <button className='admin-btn me-1' aria-label="Edit" onClick={() => onEdit(heroItem)}>
                                                <i className="bi bi-pencil" />
                                            </button>
                                            <button className='admin-btn me-5' aria-label="Delete" onClick={() => handleDeleteClick(heroItem.id)}>
                                                <i className="bi bi-trash" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="container">
                                {/*<p class="display-6 color-d">Hello, world!</p>*/}
                                {hero.map((heroItem) => (
                                    <div key={heroItem.id}>
                                        <h1 className="hero-title mb-4">I am {heroItem.name}</h1>
                                        <p className="hero-subtitle">
                                            {heroItem.skills &&
                                                <span className="typed" data-typed-items={heroItem.skills} />
                                            }
                                        </p>
                                    </div>
                                ))}

                                {/* <p class="pt-3"><a class="btn btn-primary btn js-scroll px-4" href="#about" role="button">Learn More</a></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* End Hero Section */}
        </>
    );
}

export default Hero;