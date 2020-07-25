# A Named Promise Task 

Insipre from https://stackoverflow.com/a/53540586/314173

No Queue, Just a simple promise mechanics to help you run serial tasks.

When you need a Javascript task manager, but no want callback like [async.serrial](http://caolan.github.io/async/v3/)

This package support named tasks, Please read example.js.

## Install 
``` 
npm install --save PromiseTask
```



## Usage
``` Javascript


const PromiseTask = require('promise-task')

const sleep = ( ms ) => new Promise( ( resolve, _ ) => setTimeout( () => resolve(), ms ) )

const that = 'outer' 
const fetch = async ( data ) => {
   await sleep(1000)
   console.log ( 'fetch', data, that )
}

const error = async ( data ) => {
  await sleep(1000)
  console.log ( 'error', data, that )
  throw 'error'
}


async function test() {
  const that = 'inner' 

  const upload = async ( data ) => {
    await sleep(1000)
    console.log ( 'upload', data, that )
  }

  const manager = new PromiseTask( {
    fetch: fetch,
    upload: upload,
    error: error
  } )
  
  manager.addTask('fetch', { options: 1 } )
  manager.addTask('error', { options: 2 } )
  manager.addTask('upload', { options: 3 } )
  await sleep(1000)
  manager.addTask('fetch', { options: 4 } )
}

test()

```