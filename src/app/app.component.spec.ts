import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { DomSanitizer } from '@angular/platform-browser'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let sanitizerMock: jasmine.SpyObj<DomSanitizer>

  beforeEach(async () => {
    // Create a mock DomSanitizer
    sanitizerMock = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml'])

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
      providers: [{ provide: DomSanitizer, useValue: sanitizerMock }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should add a comment', () => {
    // Set up test data
    const commentText = 'Test comment'
    const initialCommentsLength = component.comments.length

    // Simulate adding a comment
    component.newCommentText = commentText
    component.onAddComment()

    // Check if the comment was added
    expect(component.comments.length).toEqual(initialCommentsLength + 1)
    expect(component.comments[initialCommentsLength].text).toEqual(commentText)
    expect(component.showDropdown).toBeFalse()
  })

  it('should select a user', () => {
    // Set up test data
    const user = { userID: 1, name: 'TestUser' }

    // Simulate selecting a user
    component.selectUser(user)

    // Check if the selected user is set
    expect(component.selectedUser).toEqual(user)
    expect(component.showDropdown).toBeFalse()
  })

  it('should handle keyup event', () => {
    // Set up test data
    const target = { value: 'test @user' }
    const keyboardEvent = new KeyboardEvent('keyup', { key: '@' })
    Object.defineProperty(keyboardEvent, 'target', { writable: false, value: target })
  
    // Simulate keyup event
    component.onInputKeyUp(keyboardEvent)
  
    // Check if dropdown is shown
    expect(component.showDropdown).toBeTrue()
  })
})
