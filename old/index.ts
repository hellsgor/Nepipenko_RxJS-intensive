import '../../assets/css/style.css';
import {terminalLog} from '../utils/log-in-terminal';
import {Observable, Subscriber, Subscription} from "rxjs";

terminalLog('Теория');


// Promise problem =============================================================

// const sequence = new Promise((res) => {
//   let count = 0;
//   setInterval(() => {
//     console.log(count);
//     res(count++);
//   }, 1000)
// });
//
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));


// Генераторы ==================================================================

// const sequence = function* iteratorFn() {
//   let item = 0;
//   while (true) {
//     yield item++;
//   }
// }()
//
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);


// Соединить два паттерна, Observer и Iterator = ReactiveX =====================

// interval(1000).subscribe((v) => {
//   console.log(v)
// })


// Что такое Promise
// Объект, который может находиться в нескольких состояниях и может их менять.


// Что такое Observable?=======================================================
// Это lazy push collection
// collection - то есть последовательность данных;
// push - потому что не нужно запрашивать новые данные, подписался и данные в тебя пушатся
// lazy - потому что Observable не будет пулять в тебя данные пока на него не подписаться

// const sequence$ = interval(1000);
//
// setTimeout(() => {
//   console.log('subscribe');
//   sequence$.subscribe((v) => {
//     console.log(v);
//   })
// }, 5000)

let count = 1;
const sequence$ = new Observable((subscriber: Subscriber<any>) => {
  terminalLog('START');
  const intervalId = setInterval(() => {
    console.log(count);
    if (count % 5 === 0) {
      subscriber.complete();
      return;
    }
    subscriber.next(count++);
  }, 1000)

  return () => {
    clearInterval(intervalId);
    terminalLog('ON UNSUBSCRIBE');
  }
})

const subscription: Subscription = sequence$.subscribe({
  next: (v) => {
    terminalLog(`Sub 1 ====> ${v}`);
  },
  complete: () => terminalLog('Complete'),
});

setTimeout(() => {
  sequence$.subscribe({
    next: (v) => {
      terminalLog(`Sub 2 ====> ${v}`);
    },
    complete: () => terminalLog('Complete'),
  })
}, 5000);

setTimeout(() => {
  subscription.unsubscribe();
}, 2000);
