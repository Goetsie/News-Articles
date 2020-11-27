import { User } from 'src/app/security/models/user.model';
import { Tag } from './tag.model';
import { ArticleStatus } from './article-status.model';

export class Article {
    constructor(public articleID: number,
        public title: string,
        public subTitle: string,
        public shortSummary: string,
        public body: string,
        public imgPath: string,
        public tagID: number,
        public userID: number,
        public articleStatusID: number,
        public user?: User,
        public tag?: Tag,
        public articleStatus?: ArticleStatus
    ) { }

}
