Session.setDefault('onPomodoro', null);
Session.setDefault('showTodos', null);

Template.timer.events({
 'click .timer-toggle' : function() {
    if(Session.get('onPomodoro')) {
      $.APP.pauseTimer();
      Session.set('onPomodoro', null);
      $('.wrapper').removeClass('on-pomodoro');
    } else {
      $.APP.startTimer('timer');
      Session.set('onPomodoro', true);
      $('.wrapper').addClass('on-pomodoro');
    }
  },

  'click .todos-toggle' : function(event) {
    $('.wrapper').toggleClass('show-todos');
  }
});
