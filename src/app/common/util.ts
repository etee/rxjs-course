import { Observable } from "rxjs";
import { Course } from "../model/course";


const createHttpObservable = (url) => {
    return new Observable<Course>(observer => {
      fetch('/api/courses')
        .then(response => {
          if(response.ok) {
            return response.json()
          } else {
            observer.error('Request failed with status code: ' + response.status);
          }
          
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => observer.error(err));
    })
  }

export { createHttpObservable };