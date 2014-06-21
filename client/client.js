Template.hello.greeting = function () {
  return "Welcome to pomodoro.";
};

Template.timer.events({
 'click #cd_start' : function(event) {
    $.APP.startTimer('cd');
 },
 'click #cd_stop' : function(event) {
    $.APP.stopTimer();
 },
 'click #cd_reset' : function(event) {
    $.APP.resetTimer();
 },
 'click #cd_pause' : function(event) {
    $.APP.pauseTimer();
 },
});
