import Route from '@ember/routing/route';

export default class QuestionRoute extends Route {
  model(params) {
    let { question_id } = params;

    localStorage.setItem('currentModel', question_id);

    const questions = JSON.parse(localStorage.getItem('questions'));

    localStorage.setItem('totalQuestionIn', questions.length);

    questions.forEach((element) => {
      if (question_id == element.id) {
        question_id = element;
      }
    });
    return question_id;
  }
}
