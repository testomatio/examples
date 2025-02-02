import Page from './page';

class ProgressPage extends Page {
  get startButton() {return $('#startButton');}
  get stopButton() { return $('#stopButton'); }
  get progressBar() { return $('#progressBar'); }

  open() {
    super.open('progressbar');
    // `return this;` in order to be able to chain in methods in test case.
    return this;
  }

  getProgress() {
    return this.progressBar.getText();
  }

  waitForProgress(progress, timeout) {
    browser.waitUntil(
      () => this.getProgress() === `${progress}%`, { timeout: timeout || 10000, timeoutMsg: `Expected ${progress} but got ${this.getProgress()}` }
    );
  }
}

export default new ProgressPage();
