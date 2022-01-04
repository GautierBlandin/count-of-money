import {Article, GetArticlesRequest, GetArticlesResponse} from "@gautierblandin/types/dist/Press.interface";
import {API} from "../config/config";

export async function getAllArticles(req: GetArticlesRequest): Promise<GetArticlesResponse>{
    const articles = await API.get('/articles');
    if(articles.data as Article[]){
        return {
            articles: articles.data as Article[]
        }
    } else {
        console.log("Error when fetching articles");
    }
    return {articles: []};
}

