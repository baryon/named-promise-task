
const PromiseTask = require( '..' )

const sleep = ( ms ) => new Promise( ( resolve, _ ) => setTimeout( () => resolve(), ms ) )

const that = 'outer'
const fetch = async ( p1 ) => {
  await sleep( 2000 )
  console.log( 'fetch', p1, this, that )
  return 'fetch result'
}

async function fetch2 ( p1, p2 ) {
  await sleep( 1000 )
  //"this" is context
  console.log( 'fetch2', p1, p2, that )
}


const error = async ( ...values ) => {
  await sleep( 3000 )
  throw 'error'
}

async function test () {
  const that = 'inner'

  const upload = async ( p1, p2, p3 ) => {
    await sleep( 2000 )
    console.log( 'upload', p1, p2, p3, that )
  }

  const manager = new PromiseTask( this, {
    fetch: fetch,
    fetch2: fetch2,
    upload: upload,
    error: error
  } )

  manager.addTask( 'fetch', 1 ).then( console.log )
  manager.addTask( 'fetch2', 2, "str" )
  manager.addTask( 'error', 3, "str", { options: 3 } ).then( console.log ).catch( console.error )
  manager.addTask( 'upload', 4, "str", { options: 4 } )
  await sleep( 1000 )
  manager.addTask( 'fetch', 5, "str", { options: 5 } )

  const items = [11,22,33,44,55,66]
  items.forEach(item => {
    manager.addTask('fetch', item)
  });
}

test()