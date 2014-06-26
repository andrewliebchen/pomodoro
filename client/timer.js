// Source http://jsfiddle.net/ezmilhouse/V2S9d/


(function($){
  var timerMinutes = 25;
  var timerTotal = (timerMinutes * 60) * 1000;

  $.extend({
    APP : {
      formatTimer : function(a) {
        if (a < 10) {
          a = '0' + a;
        }
        return a;
      },

      startTimer : function(dir) {
        var a;

        // save type
        $.APP.dir = dir;

        // get current date
        $.APP.d1 = new Date();

        switch($.APP.state) {
          case 'pause' :
            // resume timer
            // get current timestamp (for calculations) and
            // substract time difference between pause and now
            $.APP.t1 = $.APP.d1.getTime() - $.APP.td;

          break;

          default :
            // get current timestamp (for calculations)
            $.APP.t1 = $.APP.d1.getTime();

            // if countdown add ms based on seconds in textfield
            $.APP.t1 += timerTotal;

          break;
        }
        // reset state
        $.APP.state = 'alive';

        // start loop
        $.APP.loopTimer();
      },

      pauseTimer : function() {
        // save timestamp of pause
        $.APP.dp = new Date();
        $.APP.tp = $.APP.dp.getTime();

        // save elapsed time (until pause)
        $.APP.td = $.APP.tp - $.APP.t1;

        // set state
        $.APP.state = 'pause';
      },

      stopTimer : function() {
        // set state
        $.APP.state = 'stop';
      },

      resetTimer : function() {
        // set state
        $.APP.state = 'reset';
      },

      endTimer : function(callback) {
        // set end state
        $.APP.state = 'end';

        // invoke callback
        if (typeof callback === 'function') {
          callback();
        }
      },

      loopTimer : function() {
        var td;
        var d2,t2;
        var ms = 0;
        var s  = 0;
        var m  = 0;
        var h  = 0;

        if ($.APP.state === 'alive') {
          // get current date and convert it into
          // timestamp for calculations
          d2 = new Date();
          t2 = d2.getTime();
          td = $.APP.t1 - t2;
          if (td <= 0) {
            // if time difference is 0 end countdown
            $.APP.endTimer(function(){
              // Play sound
              var s = new buzz.sound('/sounds/done.mp3');
              s.play();

              Session.set('onPomodoro', null);

              $('.wrapper.on-pomodoro').removeClass('on-pomodoro');
              $.APP.t1 += timerTotal;

              $.APP.resetTimer();
            });
          }

          // calculate milliseconds
          ms = td%1000;
          if (ms < 1) {
            ms = 0;
          } else {
            // calculate seconds
            s = (td-ms)/1000;
            if (s < 1) {
              s = 0;
            } else {
              // calculate minutes
              var m = (s-(s%60))/60;
              if (m < 1) {
                m = 0;
              } else {
                // calculate hours
                var h = (m-(m%60))/60;
                if (h < 1) {
                  h = 0;
                }
              }
            }
          }

          // substract elapsed minutes & hours
          ms = Math.round(ms/100);
          s  = s-(m*60);
          m  = m-(h*60);

          mText = $.APP.formatTimer(m);
          sText = $.APP.formatTimer(s);

          // update display
          $('.' + $.APP.dir + '-s').html(sText);
          $('.' + $.APP.dir + '-m').html(mText);

          // update the title
          title = 'pomodoro'
          $(document).attr('title', title + ' ' + mText + ':' + sText );

          // loop
          $.APP.t = setTimeout($.APP.loopTimer,1);

        } else {
          // kill loop
          clearTimeout($.APP.t);
          return true;
        }
      }
    }
  });
})(jQuery);
