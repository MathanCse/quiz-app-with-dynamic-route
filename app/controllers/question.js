import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
export default class QuestionController extends Controller {
  @service router;

  // Local storage get the values ----------------------
  @tracked sessionValue = localStorage.getItem('name');
  @tracked totalQuestionIn = localStorage.getItem('totalQuestionIn');

  // initail needed variables-------------------------
  @tracked answer = undefined;
  @tracked selected = undefined;
  @tracked startTime = 2;
  @tracked time = this.startTime * 60;
  @tracked score = 0;
  @tracked totalMarks = 0;

  //constructor section-------------------------
  constructor() {
    super(...arguments);
    this.initiateInterval();
  }

  //interval Init----------------------------------------
  @action
  initiateInterval() {
    this.stopInterval = setInterval(this.timerFunction, 1000); //loop the function
  }

  //timer section ----------------------------------------
  @action
  timerFunction() {
    const countDownEl = document.getElementById('time');
    this.minutes = Math.floor(this.time / 60);
    this.seconds = this.time % 60;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    countDownEl.innerHTML = this.minutes + ':' + this.seconds; // set the currect value to view page
    if (this.seconds == 0 && this.minutes == 0) { //check if the time is finished or not      
      this.minutes = 0;
      this.seconds = 0;
      this.router.transitionTo('result');
      clearInterval(this.stopInterval);
    } else if (!this.seconds == 0) {      
      this.time--; // time is not finished
    }
  }

  //radio Button click (on Click)---------------------------------
  @action
  radioButtonClick() {
    this.selected = this.answerOptionClick(); // get the selected radion button option
  }

  // Next button click function(on click)--------------------------
  @action
  checkfuntion() {
    this.deSelected(); // call the deselected funation on here
    this.modelValue = parseInt(localStorage.getItem('currentModel')); // get the localstorage values

    if (this.selected === this.model.correct) {
      //check the selected option is correct or not
      this.selected = '';
      let questions = JSON.parse(localStorage.getItem('questions'));
      questions.forEach((element) => {
        if (element.id == this.model.id) {
          element.mark = this.model.weight; // if is correct answer set the mark
        }
      });
      localStorage.setItem('questions', JSON.stringify(questions));
      this.selected = ''; // reset the selected option
    }
    if (this.modelValue < this.totalQuestionIn) {
      this.modelValue++;
      this.router.transitionTo('question', this.modelValue);
    } else if (this.modelValue == this.totalQuestionIn) {
      this.minutes = 0;
      this.seconds = 0;
      clearInterval(this.stopInterval);
      this.router.transitionTo('result');
    }
  }

  // Deselected the selected option---------------------------------
  @action
  deSelected() {
    const answerEls = document.querySelectorAll('.answer');
    answerEls.forEach((answerEl) => {
      answerEl.checked = false;
    });
  }

  // exit function (on Click)-------------------------------------
  @action
  exitFunction() {
    let replay = confirm('Do you want to exit the Quiz');
    if (replay) {
      this.router.transitionTo('index'); // redirect to index register page
      localStorage.setItem('name', ''); // reset the user name session
    }
  }


  //get the selected option---------------------------------
  @action
  answerOptionClick() {
    const answerEls = document.querySelectorAll('.answer');
    answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        this.answer = answerEl.id;
      }
    });
    return this.answer;
  }
}
