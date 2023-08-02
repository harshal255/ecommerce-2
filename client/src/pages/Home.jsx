import Leandingpage from '../components/Leandingpage'
import Leanding2 from '../components/Leanding2'
import Leanding3 from '../components/Leanding3'
import OurProducts from '../components/OurProducts'
import LatestBlog from '../components/LatestBlog'
import ImageGallary from '../components/ImageGallary'

const Home = () => {
    return (
        <div>
            <Leandingpage></Leandingpage>
            <Leanding3></Leanding3>
            <LatestBlog></LatestBlog>
            <ImageGallary></ImageGallary>
        </div>
    )
}

export default Home
