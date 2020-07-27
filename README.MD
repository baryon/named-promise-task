# A Named Promise Task 

Insipre from https://stackoverflow.com/a/53540586/314173

No Queue, Just a simple promise mechanics to help you run serial tasks.

When you need a Javascript task manager, but no want callback like [async.serrial](http://caolan.github.io/async/v3/)

This package support named tasks, Please read example.js.

## Install 
``` 
npm install --save named-promise-task
```



## Usage

### Method
```
addTask: Add a named task with parameters
```

### Properties
```
size: the running task numbers
```

```
isRunning: true/false of having running task
```

### Events
```
start: one or more tasks is running
```

```
stop: all task completed
```

### Promise methods
```
then: the task's result
```

```
catch: an exception from task
```

### Examples
``` Javascript


const PromiseTask = require('named-promise-task')

const sleep = ( ms ) => new Promise( ( resolve, _ ) => setTimeout( () => resolve(), ms ) )

const that = 'outer'
const fetch = async ( p1 ) => {
  await sleep( 1000 )
  console.log( 'fetch', p1, this, that )
  return 'fetch result'
}

async function fetch2 ( p1, p2 ) {
  await sleep( 1000 )
  //"this" is context
  console.log( 'fetch2', p1, p2 )
}


const error = async ( ...values ) => {
  await sleep( 1000 )
  throw 'error'
}

async function test () {
  const that = 'inner'

  const upload = async ( p1, p2, p3 ) => {
    await sleep( 1000 )
    console.log( 'upload', p1, p2, p3 )
  }

  const manager = new PromiseTask( this, {
    fetch: fetch,
    fetch2: fetch2,
    upload: upload,
    error: error
  } )

  manager.on('start', () =>{
    console.log('start')
  })
  manager.on('stop', () =>{
    console.log('stop')
  })

  manager.addTask( 'fetch', 1 ).then( console.log )
  manager.addTask( 'fetch2', 2, "str" )
  manager.addTask( 'error', 3, "str", { options: 3 } ).then( console.log ).catch( console.error )
  manager.addTask( 'upload', 4, "str", { options: 4 } )
  await sleep( 1000 )
  manager.addTask( 'fetch', 5, "str", { options: 5 } )
}

test()


```