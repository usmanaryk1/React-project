import { useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import BlogsHero from "./BlogsHero"
import BlogsContent from "./BlogsContent";

const BlogDetails = () => {

    const { id } = useParams();
    const { data: blog , isPending, error} = useFetch("http://localhost:8000/blogs/" + id);

    return (
        <div className="blog-details">
            {isPending && <div className="loading"> Loading...</div>}
            {error && <div className="error">{error}</div>}
            {blog && <BlogsHero blog={blog} bgImgSrc="url(assets/img/overlay-bg.jpg)" />}
            {blog && <BlogsContent blog={blog} />}
        </div> 
    );
}

export default BlogDetails;