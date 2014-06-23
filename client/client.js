Session.setDefault('currentPomodoro', null);
Session.setDefault('onPomodoro', null);

Template.pomodorosSection.pomodoro = function() {
  return Pomodoros.find({}, {time: -1});
};

Template.todosSection.todo = function() {
  return Todos.find({pomodoro: Session.get('currentPomodoro')}, {time: -1});
}

Template.timerSection.events({
  'click .pomodoros-toggle' : function(event) {
     $('.section.is-current').removeClass('is-current');
     $('.section.pomodoros').addClass('is-current');
  }
});

Template.timer.events({
 'click .timer-toggle' : function(event) {
    var $this = $(event.target);
    if(Session.get('onPomodoro')) {
      $.APP.pauseTimer();
      Session.set('onPomodoro', null);
      $this.closest('.section').removeClass('on-pomodoro');
    } else {
      $.APP.startTimer('timer');
      Session.set('onPomodoro', true);
      $this.closest('.section').addClass('on-pomodoro');
    }
 }
});

Template.pomodorosSection.events({
  'click #new_pomodoro' : function(event) {
    event.preventDefault();
    Pomodoros.insert({});
  },

  'click .pomodoro' : function(event) {
    event.preventDefault();
    var $this = $(event.target);
    Session.set('currentPomodoro', this._id);
    $('.section.is-current').removeClass('is-current');
    $('.section.todos').addClass('is-current');
  }
});

Template.todosSection.events({
  'keydown .todo-add' : function(event) {
    event.stopPropagation();
    if (event.which == 13) {
      var $todo = $(event.target);
      var todoContent = $todo.val();
      if(todoContent != '') {
        Meteor.call('addTodo', {
          title:     todoContent,
          pomodoro: Session.get('currentPomodoro'),
          time:     Date.now()
        });
        $todo.val('');
      }
    }
  },

  'click .todo input[type="checkbox"]' : function(event) {
    var $this = $(event.target);
    $this.closest('.todo').toggleClass('is-done');
  }
});
