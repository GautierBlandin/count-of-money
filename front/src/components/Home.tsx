import React, { useEffect } from 'react';
import {Link} from "react-router-dom";



const  Home: React.FC = () => {
    return<div>
        {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>

        <hr />
    </div>

}

export default Home;
