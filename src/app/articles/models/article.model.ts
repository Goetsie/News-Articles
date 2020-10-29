export class Article {
    constructor(public articleID: number, 
        public title: string, 
        public subTitle: string,
        public short_summary: string,
        public body: string,
        public tagID: number,
        // public tag: Tag,
        public userID: number,
        // public user: User, // The creator of an article
        public article_statusID: number,
        // public article_status: ArticleStatus
        ){ }

}
