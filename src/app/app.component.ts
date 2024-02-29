import { Component, OnInit } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { MatSnackBar } from '@angular/material/snack-bar'


interface Comment {
  text: string
  timestamp: Date
}

interface User {
  userID: number
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  comments: Comment[] = []
  users: User[] = [
    { userID: 1, name: 'Kevin' },
    { userID: 2, name: 'Jeff' },
    { userID: 3, name: 'Bryan' },
    { userID: 4, name: 'Gabbey' }
  ]
  filteredUsers: User[] = []
  newCommentText: string = ''
  showDropdown: boolean = false
  selectedUser: User | null = null

  constructor(private sanitizer: DomSanitizer, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.filteredUsers = []
    // Add click event listener to close the dropdown when clicking outside of it
    document.body.addEventListener('click', () => {
      this.showDropdown = false
    })
  }
  onAddComment() {
    const newComment: Comment = {
      text: this.newCommentText,
      timestamp: new Date()
    }
    this.comments.push(newComment)
    this.newCommentText = ''
    this.showDropdown = false
    const selectedUserName = this.selectedUser ? this.selectedUser.name : null
    this.selectedUser = null
   // Extract all mentioned usernames from the comment text
    const mentionedUsernames = newComment.text.match(/@(\w+)/g)?.map(u => u.slice(1)) || []

    // For each mentioned username, check if it corresponds to a user and show a snackbar
    mentionedUsernames.forEach((username, index) => {
      const user = this.users.find(u => u.name === username)
      if (user) {
        setTimeout(() => {
          this.snackBar.open(`you are mentioned in a comment: ${username}`, 'Close', {
            duration: 1000, // Snackbar will be automatically dismissed after 1 second
          })
        }, index * 1100); // Add a delay to each snackbar
      }
    })
  }

  onInputKeyUp(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement).value
    const lastWord = input.split(' ').pop()
    if (lastWord && lastWord.startsWith('@')) {
      this.showDropdown = true
      this.filteredUsers = this.users.filter(user => user.name.toLowerCase().startsWith(lastWord.slice(1).toLowerCase()))
    } else {
      this.showDropdown = false
    }
  }

  selectUser(user: User) {
    this.newCommentText = this.newCommentText.replace(/@\w*$/, `@${user.name}`)
    this.showDropdown = false
    this.selectedUser = user
    this.newCommentText = this.newCommentText.trim()
  }
  
  formatAndSanitizeCommentText(text: string): SafeHtml {
    // Use regular expression to replace tagged usernames with bold format
    const formattedText = text.replace(/@(\w+)/g, '<b>@$1</b>')
    // Sanitize the formatted text
    return this.sanitizer.bypassSecurityTrustHtml(formattedText)
  }
}


