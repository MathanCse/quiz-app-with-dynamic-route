import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormComponent extends Component {
  @service router;
  @tracked mat = '';
  @tracked error = '';
  
  constructor() {
    super(...arguments);
    const questions = [
      {
        id: '1',
        question: 'Which of the following is not input device',
        a: 'Touch Pad',
        b: 'Mouse',
        c: 'Scanner',
        d: 'Printer',
        correct: 'd',
        weight: '2',
        mark: '0',
      },
      {
        id: '2',
        question: 'Most popular programing language',
        a: 'Java',
        b: 'C',
        c: 'C++',
        d: 'Python',
        correct: 'a',
        weight: '2',
        mark: '0',
      },
      {
        id: '3',
        question: 'Brain of a computer',
        a: 'Mouse',
        b: 'Mother bord',
        c: 'Monitor',
        d: 'CPU',
        correct: 'd',
        weight: '3',
        mark: '0',
      },
      {
        id: '4',
        question: 'Ember latest Stable release',
        a: 'June 2022',
        b: 'April 2022',
        c: 'May 2022',
        d: 'March 2022',
        correct: 'd',
        weight: '3',
        mark: '0',
      },
      {
        id: '5',
        question: 'User friendly Operating System for PC',
        a: 'Mac Os',
        b: 'Linux',
        c: 'Windows',
        d: 'Non of the above',
        correct: 'c',
        weight: '2',
        mark: '0',
      },
      {
        id: '6',
        question: 'Which of the following is valid storage type?',
        a: 'CPU',
        b: 'Pen Drive',
        c: 'Track Ball',
        d: 'Non of the above',
        correct: 'b',
        weight: '3',
        mark: '0',
      },
      {
        id: '7',
        question: 'The list of code instructions is called?',
        a: 'Computer Program',
        b: 'Algoritham',
        c: 'Flow Chart',
        d: 'Utility Program',
        correct: 'a',
        weight: '2',
        mark: '0',
      },
      {
        id: '8',
        question: 'Which of the Following is system softwere?',
        a: 'Tally',
        b: 'Word',
        c: 'Excel',
        d: 'linux',
        correct: 'd',
        weight: '3',
        mark: '0',
      },
    ];
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  //Register Button (on Click)----------------------
  @action
  buttonClickValu() {
    this.mat = document.getElementById('name').value; // get the input feild value
    localStorage.setItem('name', this.mat); // assign the input value to localstorage

    if (!this.mat) { //check the input value is not present
      this.error = 'Please Enter Your name';
      this.route = 'index';
    } else {
      this.error = '';
      this.router.transitionTo('question', '1');
    }
  }
}
