# Functional Requirements

## Gameplay

6 tries to guess a 5-letter word

## Pick a solution word

Store solution words in JSON object / array
When game is loaded, choose random item from array
Set solution to word

## Making a guess

Detect keypresses
x if keypress is a letter
    x update "letter" attribute
        x update tile markup based on "letters" value
x if keypress is backspace
    x delete last letter in "letters"
        x update tile markup based on "letters"

## Submit guess
- compare each letter with the corresponding letter in solution word
- update the state/color of the letter
- If all letters are "correct" / green,  game is won

Don't run update functions if "letters" length = 5

Enter will submit guess
- 

Guesses must be real word "in word list"

Guess colors (data-state):
- grey: "absent," letter not in word
- yellow: "present," letter in word, but in wrong position
- green: "present," letter in word, in wrong position

Hard Mode: present or correct letters must be used in correct guesses

Guesses are saved in local storage

## Design

Tiles 5x6
Virtual keyboard

## Interactions

When typing a letter:
- border of the tile changes to light gray
- blinking in animation with letter
- backspace will remove letter, border changes back to dark grey

When submitting a guess:
- Tiles will flip up and and background color will change based on guess