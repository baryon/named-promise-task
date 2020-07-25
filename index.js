/**
 * A Named Promise Task 
 * Insipre from https://stackoverflow.com/questions/53540348/js-async-await-tasks-queue
 */
class PromiseTask {
  constructor ( namedWorkers ) {
    this.namedWorkers = namedWorkers
  }

  // task executor
  addTask = ( () => {
    let pending = Promise.resolve();

    const run = async ( name, data ) => {
      try {
        await pending;
      } finally {
        return this.namedWorkers[name](data);
      }
    }

    // update pending promise so that next task could await for it
    return ( name, data ) => ( pending = run( name, data ) )
  } )();
}

module.exports = PromiseTask
