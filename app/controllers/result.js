import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ResultController extends Controller {
  @service router;
  @tracked score = 0;
  @tracked totalMarks = 0;

  constructor() {
    super(...arguments);
    this.findAnsTOtalmark();
  }

  @action //--------Find the mark and total question wise mark (on load)
  findAnsTOtalmark() {
    let questions = JSON.parse(localStorage.getItem('questions'));
    questions.forEach((element) => {
      this.score += parseInt(element.mark);
      this.totalMarks += parseInt(element.weight);
    });
  }

  @action //----------------- exit funtion (on click )
  exitFunction() {
    let replay = confirm('Do you want to exit the Quiz');
    if (replay) {
      this.router.transitionTo('index');
      localStorage.setItem('name', '');
    }
  }

  @action //------------------ paly again function (on click )
  playagainButton() {
    let questions = JSON.parse(localStorage.getItem('questions'));
    questions.forEach((element) => {
      element.mark = '0';
    });
    localStorage.setItem('questions', JSON.stringify(questions));

    this.router.transitionTo('question', '1');
  }
}
