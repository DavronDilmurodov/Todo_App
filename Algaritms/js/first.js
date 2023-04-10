function close10(a, b) {
  if (Math.abs(a - 10) < Math.abs(b - 10)) {
    return a;
  } else if (Math.abs(a - 10) > Math.abs(b - 10)) {
    return b;
  }
  return 0;
}
