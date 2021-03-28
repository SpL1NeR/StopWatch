import React from 'react';
import { Observable } from 'rxjs/Rx';
import App from './App';

function Create(){
setTimeout(() => {

        const init = 0
        const inc = acc => acc+1
        const reset = acc => init
        
        const startButton = document.querySelector('#start')
        const waitButton = document.querySelector('#wait')
        const stopButton = document.querySelector('#stop')
        const resetButton = document.querySelector('#reset')
        
        const start$ = Observable.fromEvent(startButton,'click')
        const wait$ = Observable.fromEvent(waitButton,'click')
        const stop$ = Observable.fromEvent(stopButton, 'click')
        const reset$ = Observable.fromEvent(resetButton,'click')
        
        let seconds = document.querySelector('#seconds')
        let minutes = document.querySelector('#minutes')
        let hour = document.querySelector('#hour')

      const toTime = (time) =>({
      
        seconds: Math.floor((time/100)%60),
        minutes: Math.floor(time/6000),
        hour: Math.floor(time/3600000)
        
      })
      
      const pad = (number) => number <= 9 ? ('0'+number):number.toString()
      
      const render = (time)=>{
        seconds.innerHTML = pad(time.seconds)
        minutes.innerHTML = pad(time.minutes)
        hour.innerHTML = pad(time.hour)
      }
      
      const intervals$ = Observable.interval(10)

      const waitOrStop$ = Observable.merge(
        stop$,
        wait$
      )
           
      const pausible$ = intervals$
                              .takeUntil(waitOrStop$)

      const incOrReset$ = Observable.merge(
        pausible$.mapTo(inc),    
        stop$.mapTo(reset),
        reset$.mapTo(reset))
        

      const add = async () => {
        await start$
        .switchMapTo(incOrReset$)
        .startWith(init)
        .scan((acc, currFunc)=> currFunc(acc))
        .map(toTime)
        .subscribe(val => render(val))
      }
      
      add()
      
      });
    
    return(<App/>)
}

export default Create