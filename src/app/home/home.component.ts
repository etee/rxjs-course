import { Component, OnInit } from '@angular/core';
import { noop, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Course } from '../model/course';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
    beginnersCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');
        const courses$: Observable<Course[]> = http$.pipe(
            tap(() => console.log('HTTP request executed')),
            map(res => Object.values(res['payload'] as Course[])),
            shareReplay(),
            catchError(err => of([]))
        );
        // courses$.subscribe(
        //     courses => {
        //         this.beginnersCourses = courses.filter(course => course.category === 'BEGINNER');
        //         this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
        //         console.log(courses),
        //         noop,
        //         () => console.log('completed')
        //     }
        // );
        this.beginnersCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category === 'BEGINNER'))
            );

        this.advancedCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category === 'ADVANCED'))
            );

    }

}
