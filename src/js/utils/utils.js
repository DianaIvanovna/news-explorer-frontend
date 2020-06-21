function calcTimeForRequest() {
  const date = new Date();
  const dateFrom = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  date.setDate(date.getDate() - 7);
  const dateTo = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  return { dateFrom, dateTo };
}
export { calcTimeForRequest };
