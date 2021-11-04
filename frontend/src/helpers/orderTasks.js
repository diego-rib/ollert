function aphabeticalOrder(list) {
  return list.sort(({ info }, b) => {
    const change = -1;
    if (info > b.info) {
      return change;
    }
    if (b.info > info) {
      return 1;
    }
    return 0;
  });
}

function orderTasks(order, list) {
  switch (order) {
  case 'alphabetical':
    return aphabeticalOrder(list);
  default:
    return list;
  }
}

export default orderTasks;
