import { Article } from './article.model';

export class Tag {
    constructor(public tagID: number,
        public name: string,
        public color: string,
        public article?: Article,
    ) { }


}
