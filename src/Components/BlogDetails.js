import { useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import BlogsHero from "./BlogsHero"
import BlogsContent from "./BlogsContent";

const BlogDetails = () => {

    const { id } = useParams();
    const { data: blog } = useFetch("http://localhost:8000/blogs/" + id);

    return (
        <div className="blog-details">
            {blog && <BlogsHero />}
            {blog && <BlogsContent />}
        </div>
        
    );
}

export default BlogDetails;