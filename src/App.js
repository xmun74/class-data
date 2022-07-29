import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Home";
// import Navbar from "./component/Navbar";
// import CreateBlog from "./blogComponent/CreateBlog";
// import BlogDetails from "./blogComponent/BlogDetail";
// import NotFound from "./component/NotFound";
// import Footer from "./component/Footer";
// import Loading from "./component/Loading";
import { lazy, Suspense } from "react";
import useFetch from "./util/useFetch";

/* react.lazy()와 suspense를 사용해 보세요. */
const Home = lazy(() => import("./Home"));
const Navbar = lazy(() => import("./component/Navbar"));
const Footer = lazy(() => import("./component/Footer"));
const CreateBlog = lazy(() => import("./blogComponent/CreateBlog"));
const BlogDetails = lazy(() => import("./blogComponent/BlogDetail"));
const NotFound = lazy(() => import("./component/NotFound"));
const Loading = lazy(() => import("./component/Loading"));

function App() {
  const { blogs, setBlogs, isPending, error } = useFetch(
    "http://localhost:3001/blogs"
  );

  // const [blogs, setBlogs] = useState(null);
  // const [isPending, setIsPending] = useState(true);
  // const [error, setError] = useState(null);

  /* get 메소드를 통해 데이터를 받아오는 useEffect hook은 컴포넌트 내 여기저기 존재하고 있습니다. */
  /* 해당 hook은 반복이 되는 부분이 있으므로 어떻게 custom hook으로 만들 수 있을 지 고민해봅시다. */
  /* util 폴더 내에 존재하는 useFetch에 여러분의 custom hook을 작성해주세요. */

  /*   useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:3001/blogs")
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setBlogs(data);
          // console.log(data);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, []); */

  return (
    <BrowserRouter>
      {error && <div>{error}</div>}
      <Suspense fallback={<Loading />}>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route
                exact
                path="/"
                element={<Home blogs={blogs} isPending={isPending} />}
              />
              <Route
                path="/create"
                element={<CreateBlog blogs={blogs} setBlogs={setBlogs} />}
              />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/blogs/:id" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
