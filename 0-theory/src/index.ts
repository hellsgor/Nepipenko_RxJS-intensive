import '../../assets/css/style.css';
import {terminalLog} from '../../utils/log-in-terminal';
import {defer, from, iif, interval, Observable, of, timer} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";
import {pluck} from "rxjs/internal/operators/pluck";
import {tap} from "rxjs/internal/operators/tap";
import {map} from "rxjs/internal/operators/map";
import {filter} from "rxjs/internal/operators/filter";
import {skip} from "rxjs/internal/operators/skip";
import {take} from "rxjs/internal/operators/take";

terminalLog('Теория');


of(1, 2, 3, 4, 5).subscribe((v) => {
  console.log('of', v);
});

from([1, 2, 3, 4, 5,]).subscribe((v) => {
  console.log('from', v);
})

from(fetch('https://jsonplaceholder.typicode.com/users')
  .then((res) =>
    res.json()),
).subscribe((v) => {
  console.log('from', v);
})

ajax({
  url: 'https://jsonplaceholder.typicode.com/users',
  crossDomain: true,
  method: 'GET',
}).pipe(
  pluck('response'),
)
  .subscribe((v) => {
    console.log('ajax', v);
  });

timer(5000).subscribe((v) => {
  console.log('timer', v)
});

const random: number = Math.round(Math.random() * 10);
console.log('random', random);
iif(() => {
    return random > 5;
  },
  of('First sequence'),
  of('Second sequence')).subscribe((v) => {
  console.log('iif', v);
});
defer(() => {
  return random > 8
    ? of('First sequence')
    : random > 4
      ? of('Second sequence')
      : of('Third sequence')
}).subscribe((v) => {
  console.log('defer', v)
});


// =============================================================================

const sequence$: Observable<number> = interval(1000);

/*
  sequence$
      ---- 0---- 1---- 2---- 3---- 4---- 5---- 6---- 7---- 8---- 9----10----

    tap((x) => {
      console.log(x);
      return x;
    })
      ---- 0---- 1---- 2---- 3---- 4---- 5---- 6---- 7---- 8---- 9----10----

    map((x) => x * 2)
      ---- 0---- 2---- 4---- 6---- 8----10----12----14----16----18----20----

    filter((x) => x % 3 === 0)
      ---- 0---------------- 6----------------12----------------18----------

    skip(2)
      ----------------------------------------12----------------18----------

    take(1)
      ----------------------------------------12|
*/

sequence$
  .pipe(
    tap((v: number) => {
      console.log('sequence$Element', v);
      return v;
    }),
    map((v: number) => v * 2),
    filter((v: number) => v % 3 === 0),
    skip(2),
    take(1),
  ).subscribe((v: number) => {
  terminalLog(`sequence$: ${v}`);
  console.log('sequence$', v);
});

// =============================================================================



