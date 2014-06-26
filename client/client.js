var pomodoroTime = (25 * 60) * 1000;
var shortBreak   = (5 * 60) * 1000;
var longBreak    = (10 * 60) * 1000;

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
      $.APP.startTimer('timer', pomodoroTime);
      Session.set('onPomodoro', true);
    };
    $('.wrapper').toggleClass('on-pomodoro');
  },

  'click .short-break' : function(event) {
    $this = $(event.target);
    $.APP.startTimer('timer', shortBreak);

    // Make this better
    $this.toggleClass('short-break').toggleClass('long-break').text('LB');
  },

  'click .long-break' : function(event) {
    $this = $(event.target);
     $.APP.startTimer('timer', longBreak);

     // Make this better
     $this.toggleClass('short-break').toggleClass('long-break').text('SB');
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
