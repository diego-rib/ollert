function generateTestMessage(object) {
  return `test: ${JSON.stringify(object, null, '')}`;
}

export default generateTestMessage;
