function max1020(a, b) {
  let temp1, temp2;

  if (a >= 10 && a <= 20) {
    temp1 = a;
  } else {
    temp1 = 0;
  }
  if (b >= 10 && b <= 20) {
    temp2 = b;
  } else {
    temp2 = 0;
  }

  return Math.max(temp1, temp2);
}
