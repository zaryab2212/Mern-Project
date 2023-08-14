import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import {Link} from "react-router-dom"

function Home() {
    return ( 
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
            <Link to="/admin">why all of this in not loading</Link>
        </div>
     );
}

export default Home;