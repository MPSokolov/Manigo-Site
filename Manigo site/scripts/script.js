function LottieScrollTrigger(vars) {
	let playhead = {frame: 0},
		target = gsap.utils.toArray(vars.target)[0],
		speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"},
		st = {trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: 1},
		animation = lottie.loadAnimation({
			container: target,
			renderer: vars.renderer || "svg",
			loop: false,
			autoplay: false,
			path: vars.path
		});
	for (let p in vars) { 
		st[p] = vars[p];
	}
	animation.addEventListener("DOMLoaded", function() {
		gsap.to(playhead, {
			frame: animation.totalFrames - 1,
			ease: "none",
			onUpdate: () => animation.goToAndStop(playhead.frame, true),
			scrollTrigger: st
		});
	});
}

function animation() {
  
  const animationContainer = document.querySelector('.animationContainer')

  LottieScrollTrigger({
    target: animationContainer,
    path: 'resources\\funnelscroll.json',
    speed: 'medium',
    scrub: 1,
    onUpdate: (self) => {
      const features = document.querySelectorAll('.feature')
      console.log(self.progress)
      if(self.progress > 0.100) {
        features[0].classList.add('active')
      } else {
        features[0].classList.remove('active')
      }
    }
  })
  
}

function init() {

  animation()

}

document.addEventListener("DOMContentLoaded", function(e) {
    window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  
  window.onload = function() {
    
    window.requestAnimationFrame(function() {
  
      init();

    })
  }
})