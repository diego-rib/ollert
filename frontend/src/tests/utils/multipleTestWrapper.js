function multipleTestWrapper(test, timeout = 1) {
  setTimeout(() => {
    test();
  }, timeout);
}

export default multipleTestWrapper;
