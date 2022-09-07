// import { useLocation } from "react-router-dom";
import BlogList from "./blogComponent/BlogList";
import Loading from "./component/Loading";

const Home = ({ blogs, isPending }) => {
  // const location = useLocation();
  // console.log(location.state);

  return (
    <div className="home">
      {isPending && <Loading />}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
