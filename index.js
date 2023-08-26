$(document).ready(function(){

  /* ------------------------------------------------------------------------ *  
  4 states per letter: Transparent | Line | Block | Visible.
  These states are shuffled for a unique "decode" effect each time.
  * ------------------------------------------------------------------------ */

  var text = document.getElementsByClassName('decode-text')[0];
  // debug with
  // console.log(text, text.children.length);

  // assign the placeholder array its places
  var state = [];
  for(var i = 0, j = text.children.length; i < j; i++ ){
      text.children[i].classList.remove('state-1','state-2','state-3');
      state[i] = i;
  }

  // shuffle the array to get new sequences each time
  var shuffled = shuffle(state);

  for(var i = 0, j = shuffled.length; i < j; i++ ){
      var child = text.children[shuffled[i]];
      classes = child.classList;

      // fire the first one at random times
      var state1Time = Math.round( Math.random() * (3000 - 500) ) + 50;
      if(classes.contains('text-animation')){ 
          setTimeout(firstStages.bind(null, child), state1Time);
      }
  }

  // send the node for later .state changes
  function firstStages(child){
    if( child.classList.contains('state-2') ){   
        child.classList.add('state-3');
    } else if( child.classList.contains('state-1') ){
        child.classList.add('state-2')
    } else if( !child.classList.contains('state-1') ){
        child.classList.add('state-1');
        setTimeout(secondStages.bind(null, child), 100);
    }    
  }
  function secondStages(child){
    if( child.classList.contains('state-1') ){
        child.classList.add('state-2')
        setTimeout(thirdStages.bind(null, child), 100);
    } 
    else if( !child.classList.contains('state-1') )
    {
        child.classList.add('state-1')
    }
  }
  function thirdStages(child){
    if( child.classList.contains('state-2') ){
        child.classList.add('state-3')
    }
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }
});

$(document).ready(function(){

  function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, {scale: 1});
      var pad = padding || 0;
      var parentEl = el.parentNode;
      var elOffsetWidth = el.offsetWidth - pad;
      var parentOffsetWidth = parentEl.offsetWidth;
      var ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
    }
    resize();
    window.addEventListener('resize', resize);
  }
  
  var sphereAnimation = (function() {
  
    var sphereEl = document.querySelector('.sphere-animation');
    var spherePathEls = sphereEl.querySelectorAll('.sphere path');
    var pathLength = spherePathEls.length;
    var hasStarted = false;
    var aimations = [];
  
    fitElementToParent(sphereEl);
  
    var breathAnimation = anime({
      begin: function() {
        for (var i = 0; i < pathLength; i++) {
          aimations.push(anime({
            targets: spherePathEls[i],
            stroke: {value: ['rgba(255,75,75,1)', 'rgba(50,50,50,.35)'], duration: 500},
            translateX: [2, -4],
            translateY: [2, -4],
            easing: 'easeOutQuad',
            autoplay: false
          }));
        }
      },
      update: function(ins) {
        aimations.forEach(function(animation, i) {
          var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
          animation.seek(animation.duration * percent);
        });
      },
      duration: Infinity,
      autoplay: false
    });
  
    var introAnimation = anime.timeline({
      autoplay: false
    })
    .add({
      targets: spherePathEls,
      strokeDashoffset: {
        value: [anime.setDashoffset, 0],
        duration: 3900,
        easing: 'easeInOutCirc',
        delay: anime.stagger(190, {direction: 'reverse'})
      },
      duration: 2000,
      delay: anime.stagger(60, {direction: 'reverse'}),
      easing: 'linear'
    }, 0);
  
    var shadowAnimation = anime({
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: 30000,
        easing: 'easeOutQuint',
        autoplay: false
      }, 0);
  
    function init() {
      introAnimation.play();
      breathAnimation.play();
      shadowAnimation.play();
    }
    
    init();
  
  })();

});