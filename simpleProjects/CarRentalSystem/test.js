Promise.resolve([
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    }
  ])
  .then(function(results) { 
    return results.some(r => r.id === 2);
  })
  .then(function(foundResult) {
    console.log(foundResult);
  });