/**
 * A Named Promise Task
 * Inspire from https://stackoverflow.com/questions/53540348/js-async-await-tasks-queue
 */
import { EventEmitter } from 'eventemitter3'

export class PromiseTask extends EventEmitter {
  constructor (context, namedWorkers) {
    super()
    this._context = context
    this._namedWorkers = namedWorkers
    this._pending = Promise.resolve()
    this._size = 0
    this._name = null
  }

  // task queue size
  get size () {
    return this._size
  }

  // checking is running
  get isRunning () {
    return this._size !== 0
  }

  // current task name
  get currentTaskName () {
    return this._name
  }
  
  // task executor
  addTask = (() => {
    let pending = Promise.resolve()

    const run = async (name, ...values) => {
      try {
        await pending
      } finally {
        this._name = name
        return Promise.resolve(this._namedWorkers[name].call(this._context, ...values)).finally(() => {
          this._size--
          if (this._size === 0) {
            this._name = null
            this.emit('stop')
          }
        })
      }
    }

    // update pending promise so that next task could await for it
    return (name, ...values) => {
      this._size++
      if (this._size === 1) {
        this._name = name
        this.emit('start')
      }
      return (pending = run(name, ...values))
    }
  })()
}

