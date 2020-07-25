
const PromiseTask = require('./index')

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