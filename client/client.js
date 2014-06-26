Session.setDefault('onPomodoro', null);
Session.setDefault('showTodos', null);

Template.todos.todo = function() {
  return Todos.find({}, {sort:{time: 1}});
}

Template.todos.todoClass = function(){
  return this.done ? 'done' : '';
}

Template.timer.events({
 'click .timer-toggle' : function() {
    if(Session.get('onPomodoro')) {
      $.APP.pauseTimer();
      Session.set('onPomodoro', null);
    } else {
      $.APP.startTimer('timer');
      Session.set('onPomodoro', true);
    };
    $('.wrapper').toggleClass('on-pomodoro');
  },

  'click .todos-toggle' : function() {
    $('.wrapper').toggleClass('show-todos');
  }
});

Template.todos.events({
  'keydown .todo-add' : function(event) {
    if (event.which == 13) {
      var $todo = $(event.target);
      var todoContent = $todo.val();
      if(todoContent != '') {
        Meteor.call('addTodo', {
          title: todoContent,
          time:  Date.now(),
          done:  false
        });
        $todo.val('');
      }
    }
  },

  'click .todo' : function(event) {
    var $this = $(event.target);
    $this.closest('.todo').toggleClass('is-done');
    Todos.update(this._id, {$set: {done: !this.done}});
  }
});
