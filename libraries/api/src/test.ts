import {getAllArticles} from "./api/Press";
import {initialize} from "./config";
import {getAllCryptos, getMarket} from "./api";


initialize({baseUrl: 'http://localhost:8079'});
getMarket().then(console.log);
