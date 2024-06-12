import { useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import CustomHero from "./CustomHero"
import BlogsContent from "./BlogsContent";
import { useEffect } from "react";

const BlogDetails = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "%PUBLIC_URL%/assets/js/main.js";
        console.log("blogdetails");
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const { id } = useParams();
    const { data: blog, error } = useFetch("http://localhost:8000/blogs/" + id);

    return (
        <div className="blog-details">
            {/* {isPending && <div className="loading"> Loading...</div>} */}
            {error && <div className="error">{error}</div>}
            {blog && (
                <>
                    <CustomHero heroTitle="Blog Details" breadcrumbItem1="Home" breadcrumbItem2="Library" breadcrumbItem3="Data" />
                    <BlogsContent blog={blog} />
                </>
            )}
        </div>
    );
}

export default BlogDetails;