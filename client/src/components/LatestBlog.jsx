
import Heading from './Heading';
import LatestBlogSlider from './LatestBlogSlider';

const LatestBlog = () => {
  return (
    <div>
     {/* title */}

     <Heading mainTitle={"LATES FROM BLOG"} smallTitle={"The freshest and most exciting news"}></Heading>

     {/* Blogs */}
     <LatestBlogSlider></LatestBlogSlider>


      
    </div>
  )
}

export default LatestBlog
