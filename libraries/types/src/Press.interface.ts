export interface Article {
    id: string;
    title: string;
    summary: string;
    url: string;
    date: string;
    source: string;
    imageUrl: string;
}

export interface GetArticlesResponse {
    articles: Article[];
}

export interface GetArticlesRequest {

}

