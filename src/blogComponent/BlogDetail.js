import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../util/useFetch";
import useScrollTop from "../util/useScrollTop";

const BlogDetails = ({ data, setData }) => {
  const [isLike, setIsLike] = useState(true);
  let navigate = useNavigate();
  let { id } = useParams();
  useScrollTop();

  /* 현재는 개별 블로그 내용으로 진입해도 내용이 보이지 않습니다. */
  /* id를 이용하여 개별 블로그의 내용이 보일 수 있게 해봅시다. */
  const { blogs, setBlogs, isPending, error } = useFetch(
    `http://localhost:3001/blogs/${id}`
  );

  const handleDeleteClick = () => {
    /* delete 버튼을 누르면 다시 home으로 리다이렉트 되어야 합니다. */
    /* useNavigate()를 이용하여 로직을 작성해주세요. */
    fetch(`http://localhost:3001/blogs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const deleted = data.filter((el) => String(el.id) !== id);
        setData(deleted); // 새로고침없이 상태갱신
        navigate("/");
      })
      .catch((err) => console.log("Error", err.message));
  };

  const handleLikeClick = () => {
    /* 하트를 누르면 home에서 새로고침을 했을 때 숫자가 올라가야 합니다. */
    /* isLike와 blog.likes를 이용하여 handleLikeClick의 로직을 작성해주세요. */
    setIsLike(!isLike);
    let result = blogs.likes;
    if (isLike === true) {
      result = blogs.likes + 1;
    } else {
      if (blogs.likes > 0) {
        result = blogs.likes - 1;
      }
      result = blogs.likes;
    }

    let putData = {
      id: blogs.id,
      title: blogs.title,
      body: blogs.body,
      author: blogs.author,
      likes: result,
    };

    fetch(`http://localhost:3001/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-type": "applicaton/json" },
      body: JSON.stringify(putData),
    })
      .then(() => {
        console.log(putData);
        navigate(`/blogs/${id}`);
      })
      .catch((err) => console.log("Error", err.message));
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blogs && (
        <article>
          <h2>{blogs.title}</h2>
          <p>Written by {blogs.author}</p>
          <div>{blogs.body}</div>
          <button onClick={handleLikeClick}>
            {/* isLike에 의해 조건부 렌더링으로 빨간 하트(❤️)와 하얀 하트(🤍)가 번갈아 보여야 합니다. */}
            {isLike === false ? "❤️" : "🤍"}
          </button>
          <button onClick={handleDeleteClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
