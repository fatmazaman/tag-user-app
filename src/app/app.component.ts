import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Comment {
  text: string;
  timestamp: Date;
}

interface User {
  userID: number;
  name: string;
}

@Pipe({ name: 'sanitizeHtml' })
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  comments: Comment[] = [];
  users: User[] = [
    { userID: 1, name: 'Kevin' },
    { userID: 2, name: 'Jeff' },
    { userID: 3, name: 'Bryan' },
    { userID: 4, name: 'Gabbey' }
  ];
  filteredUsers: User[] = [];
  newCommentText: string = '';
  showDropdown: boolean = false;
  selectedUser: User | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.filteredUsers = [];
    // Add click event listener to close the dropdown when clicking outside of it
    document.body.addEventListener('click', () => {
      this.showDropdown = false;
    });
  }

  onAddComment() {
    const newComment: Comment = {
      text: this.newCommentText,
      timestamp: new Date()
    };
    this.comments.push(newComment);
    this.newCommentText = '';
    this.showDropdown = false;
    if (this.selectedUser) {
      alert(`Tagged user: ${this.selectedUser.name}`);
      this.selectedUser = null;
    }
  }

  onInputKeyUp(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement).value;
    const lastWord = input.split(' ').pop();
    if (lastWord && lastWord.startsWith('@')) {
      this.showDropdown = true;
      this.filteredUsers = this.users.filter(user => user.name.toLowerCase().startsWith(lastWord.slice(1).toLowerCase()));
    } else {
      this.showDropdown = false;
    }
  }

  selectUser(user: User) {
    this.newCommentText = this.newCommentText.replace(/@\w*$/, `@${user.name}`);
    this.showDropdown = false;
    this.selectedUser = user;
    this.newCommentText = this.newCommentText.trim();
  }
}
