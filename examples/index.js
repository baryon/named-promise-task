
const PromiseTask = require( '../src' )

const sleep = ( ms ) => new Promise( ( resolve, _ ) => setTimeout( () => resolve(), ms ) )

const that = 'outer'
const fetch = async ( p1 ) => {
  await sleep( 2000 )
  console.log( 'fetch', p1, this, that )
  return 'fetch result'
}

async function fetch2 ( p1, p2 ) {
  await sleep( 1000 )
  // "this" is context
  console.log( 'fetch2', p1, p2, that )
  return Promise.resolve('fetch2 result')
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

  manager.on( 'start', () => {
    console.log( 'start' )
  } )
  manager.on( 'stop', () => {
    console.log( 'stop' )
  } )

  console.log( 'isRunning', manager.isRunning, manager.currentTaskName )

  let result = await manager.addTask( 'fetch', 1 ).then( ( ...results ) => {
    console.log( ...results )
    return results
  } ).finally( () => {
    console.log( manager.size )
  } )
  console.log('result:', result)

  result = await manager.addTask( 'fetch2', 2, 'str' ).then( ( ...results ) => {
    console.log( ...results )
    return results
  } ).finally( () => {
    console.log( manager.size, manager.currentTaskName )
  } )
  console.log('result:', result)

  manager.addTask( 'error', 3, 'str', { options: 3 } )
    .then( console.log )
    .catch( ( e ) => {
      console.error( 'error', e )
    } )
    .finally( () => {
      console.log( manager.size, manager.currentTaskName )
    } )
  manager.addTask( 'upload', 4, 'str', { options: 4 } ).finally( () => {
    console.log( manager.size )
  } )
  await sleep( 1000 )
  manager.addTask( 'fetch', 5, 'str', { options: 5 } ).finally( () => {
    console.log( manager.size )
  } )
  console.log( 'isRunning', manager.isRunning, manager.currentTaskName )

  const items = [ 11, 22, 33, 44, 55, 66 ]
  items.forEach( item => {
    manager.addTask( 'fetch', item ).finally( () => {
      console.log( manager.size )
      console.log( 'isRunning', manager.isRunning, manager.currentTaskName )
    } )
  } )

  console.log( 'isRunning', manager.isRunning, manager.currentTaskName )
}

test()
