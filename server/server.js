Meteor.startup(function() {
  // Todos.remove({});
});

Meteor.methods({
  addTodo: function(options) {
    Todos.insert({
      title:    options.title,
      pomodoro: options.pomodoro,
      time:     options.time
    });
  },
});
