Session.setDefault('currentPomodoro', null);

Template.pomodoros.pomodoro = function() {
  return Pomodoros.find({}, {time: -1});
};

Template.todos.todo = function() {
  return Todos.find({pomodoro: Session.get('currentPomodoro')}, {time: -1});
}

Template.timer.events({
 'click #cd_start' : function() {
    $.APP.startTimer('cd');
 },
 'click #cd_stop' : function() {
    $.APP.stopTimer();
 },
 'click #cd_reset' : function() {
    $.APP.resetTimer();
 },
 'click #cd_pause' : function() {
    $.APP.pauseTimer();
 },
});

Template.pomodoros.events({
  'click #new_pomodoro' : function(event) {
    event.preventDefault();
    Pomodoros.insert({});
  },

  'click .pomodoro' : function(event) {
    event.preventDefault();
    var $this = $(event.target);
    Session.set('currentPomodoro', this._id);
    console.log(this._id + ' is the current pomodoro');

    $('.is-selected').removeClass('is-selected');
    $this.addClass('is-selected');
  }
});

Template.todos.events({
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
  }
});
