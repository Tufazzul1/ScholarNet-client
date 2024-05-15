import Banner from "../components/Banner";
import Categories from "../components/Categories";
import BestSelling from "./BestSelling";
import PopularWritter from "./PopularWritter";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <BestSelling></BestSelling>
            <PopularWritter></PopularWritter>
        </div>
    );
};

export default Home;