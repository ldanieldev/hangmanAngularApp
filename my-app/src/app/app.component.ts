import { Component } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  remainingTries: number = 5;
  pastGuesses = [];
  targetWord;
  lettersRemaining: number;

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    const wordList = [
      'happy',
      'lucky',
      'segmented',
      'macro',
      'piano',
      'football',
    ];

    this.targetWord = [
      ...wordList[Math.floor(Math.random() * wordList.length)],
    ];

    this.lettersRemaining = this.targetWord.length;
    this.remainingTries = 5;
    this.pastGuesses = [];

    console.log('target word', this.targetWord);

    document
      .querySelectorAll('#wordDisplay span')
      .forEach((element) => element.classList.add('hidden'));

    let inputElement = document.querySelector('input');
    inputElement.placeholder = 'Enter your guess here';
    inputElement.focus();
  }

  giveUp() {}

  processGuess(event) {
    let domElement = event.target;
    const newGuess = domElement.value;

    if (this.pastGuesses.findIndex((pastGuess) => pastGuess == newGuess) < 0) {
      this.pastGuesses.push(newGuess);
      domElement.placeholder = 'Enter your guess here';

      let foundLetterIndices = [];

      this.targetWord.forEach((letter: string, index: number) => {
        if (letter == newGuess) {
          foundLetterIndices.push(index);
        }
      });

      if (foundLetterIndices.length > 0) {
        this.lettersRemaining -= foundLetterIndices.length;

        foundLetterIndices.forEach((index) => {
          document
            .querySelector(`#wordDisplay span:nth-of-type(${index + 1})`)
            .classList.remove('hidden');
        });

        if (!this.lettersRemaining) {
          domElement.placeholder = 'Congratulations, you won!!!';
          this.lettersRemaining = 0;
        }
      } else {
        this.remainingTries--;
      }

      if (this.remainingTries < 1) {
        domElement.placeholder = 'You lost. Better luck next time';
      }
    } else {
      domElement.placeholder =
        "you've already tired that letter, enter a new one";
    }

    domElement.value = '';
  }
}
