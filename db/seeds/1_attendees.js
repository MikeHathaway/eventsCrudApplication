
exports.seed = function(knex) {
  return knex('attendees').del()
    .then(function () {
      return knex('attendees').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
