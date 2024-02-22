

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'splitComment' })
export class SplitCommentPipe implements PipeTransform {
  transform(commentText: string): { beforeTag: string, taggedUser: string, afterTag: string } {
    const match = commentText.match(/@(.*?)( |$)(.*)/);
    if (match) {
      return {
        beforeTag: commentText.substr(0, match.index),
        taggedUser: match[1],
        afterTag: match[3]
      };
    } else {
      return { beforeTag: commentText, taggedUser: '', afterTag: '' };
    }
  }
}