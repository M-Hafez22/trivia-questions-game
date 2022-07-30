# Trivia Questions game

## Project Structure

### Welcome Screen 

- [x] Get userName from User
- [x] Get difficulty level from User
- [x] Link to Catgories

### Categories

- [x] Fetch the Categories API
- [x] Display the Categories
- [x] Get the selectedCategories from User
- [x] Save selectedCategories into an Array
- [x] Show not chosen Categories only
- [ ] Link to
    - If RemainCategories:
        - [x] Question with (CategoryID, qIndex)
    - else
        - [x] Score
         
### Questions

- [x] Receive (CategoryID, qIndex)
- [x] Fetch Question API
- [x] Display incorrect_answers
- [x] Check the user answer
- [ ] timeout
    - [x] set time out
    - [x] Skip when time out
    - [x] Update the score
    - [x] set the timeout depending on the difficulty level
- [x] Calculate
    - [x] Asked Questions
    - [x] Correct
    - [x] fail
    - [x] skip 
- [x] Link to
    - if nextQuestion
        - [x] next question
    - else
        - [x] Back to Categories
### Score

- Display
    - [ ] Total Question
    - [ ] Correct
    - [ ] Fail
    - [ ] Skip
