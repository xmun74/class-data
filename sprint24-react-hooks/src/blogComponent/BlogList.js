import { useEffect } from "react";
import { Link } from "react-router-dom";
import useScrollTop from "../util/useScrollTop";

const BlogList = ({ blogs }) => {
  useScrollTop();

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </Link>
          🤍 {blog.likes}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
