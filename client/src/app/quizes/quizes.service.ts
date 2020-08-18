import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class QuizesService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  // *********************** Call  API to get quiz *****************************

  get_quizesData(data) {
    return this.http
      .post(this.serverLink + 'get/quiz/details', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to add quiz *****************************
  add_newQuiz(data) {
    return this.http
      .post(this.serverLink + 'add/quiz/details', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to get students to update marks *****************************
  get_students_quiz_details(data) {
    return this.http
      .post(this.serverLink + 'get/students/quiz_details', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

    // *********************** Call  API to get students to update marks *****************************
  upload_std_quiz_marks(data) {

    return this.http
    .post(this.serverLink + 'add/students/quiz_marks', data, {
      headers: this.headers
    })
    .map(response => response.json());
  }

  // *********************** upload Quiz images *****************************

  add_quiz_images(image_data) {
    return this.http
      .post(this.serverLink + 'upload/quiz', image_data, {

      })
      .map(response => response.json());
  }

}
