Session.setDefault('onPomodoro', null);

Template.timer.events({
 'click .timer-toggle' : function(event) {
    var $this = $(event.target);
    if(Session.get('onPomodoro')) {
      $.APP.pauseTimer();
      Session.set('onPomodoro', null);
      $('.wrapper').removeClass('on-pomodoro');
    } else {
      $.APP.startTimer('timer');
      Session.set('onPomodoro', true);
      $('.wrapper').addClass('on-pomodoro');
    }
 }
});
