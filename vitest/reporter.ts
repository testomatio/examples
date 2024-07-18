// import { Reporter } from 'vitest/reporters'
// const fs = require('fs');

// export class TestomatioReporter implements Reporter {
export class TestomatioReporter {
  // on run start
  onInit(ctx) {
    console.log('init')
  }

  // paths array to files with tests
  onPathsCollected(paths) {
    console.log('paths collected')
  }

  // files array with tests
  onCollected(files) {
    // file.filepath
    // file.name : test/basics.test.ts
    // file.tasks - array of tests
    console.log('collected')
  }

  onFinished(files, errors) {
    // files  - arra with results;
    // errors does not contain errors from tests; probably its testrunner errors
    console.log('finished')
  }

  // smth strange
  // onTaskUpdate(packs) {
  //   console.log('task update')
  // }

  onTestRemoved(trigger) {
    console.log('test removed')
  }

  onWatcherStart(files?, errors?) {
    console.log('watcher start')
  }

  onWatcherRerun(files, trigger?) {
    console.log('watcher rerun')
  }

  onServerRestart(reason?) {
    console.log('server restart')
  }

  // gathers console logs
  onUserConsoleLog(log) {
    // console.log('user console log')
  }

  onProcessTimeout() {
    console.log('process timeout')
  }
}

export default TestomatioReporter;