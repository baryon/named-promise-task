/**
 * A Named Promise Task
 * Inspire from https://stackoverflow.com/questions/53540348/js-async-await-tasks-queue
 */
import { EventEmitter } from 'events'

class PromiseTask extends EventEmitter {
  constructor (context, namedWorkers) {
    super()
    this._context = context
    this._namedWorkers = namedWorkers
    this._pending = Promise.resolve()
    this._size = 0
  }

  // task queue size
  get size () {
    return this._size
  }

  // checking is running
  get isRunning () {
    return this._size !== 0
  }

  // task executor
  addTask = (() => {
    let pending = Promise.resolve()

    const run = async (name, ...values) => {
      try {
        await pending
      } finally {
        return this._namedWorkers[name].call(this._context, ...values).finally(() => {
          this._size--
          if (this._size === 0) {
            this.emit('stop')
          }
        })
      }
    }

    // update pending promise so that next task could await for it
    return (name, ...values) => {
      this._size++
      if (this._size === 1) {
        this.emit('start')
      }
      return (pending = run(name, ...values))
    }
  })()
}

export default PromiseTask
