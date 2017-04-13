
exports.seed = function(knex) {
  return knex('attendees').del()
    .then(function () {
      return knex('attendees').insert([
        {
          id: 1,
          preferred_name: 'Mike Hathaway',
          last_name: 'Mike', birthday: '1993-02-02',
          email: 'noneOfYourBusiness@gmail.com'
        },
        {
          id: 2,
          preferred_name: 'Elon Musk',
          last_name: 'Musk',
          birthday: '1971-06-28',
          email: 'wishIKnew@gmail.com'
        },
        {
          id: 3,
          preferred_name: 'Catherine The Great',
          last_name: 'Alekseyevna',
          birthday: '1729-05-02',
          email: 'definetlyDidntHaveAnEmail@gmail.com'
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('attendees_id_seq', (SELECT MAX(id) FROM attendees));"
      )
    })
};
