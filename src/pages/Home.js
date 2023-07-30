import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import {Link} from "react-router-dom"

function Home() {
    return ( 
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
            <Link to="/admin">dkfjkdjdf</Link>
        </div>
     );
}

export default Home;