$( document ).ready(function() {
	$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    }, 

	navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
	
})
});

// Video Script
$(function() {
    $("#playlist .item div").on("click", function() {
        $("#video-player").attr({
            "src": $(this).attr("movieurl"),
            "poster": "",
            "autoplay": "autoplay",
            "data-description": $(this).attr("data-description"),
            "title": $(this).attr("title")
        })
    })
     $("#playlist .item div").on("click", function() {
        $("#description").attr({
            "label": $(this).attr("label")
        }).text($(this).attr("label"))
    })
     $("#playlist .item div").on("click", function() {
        $("#title").attr({
            "title": $(this).attr("title")
        }).text($(this).attr("title"))
    })
    $("#video-player").attr({
        "src": $("#playlist .item div").eq(0).attr("movieurl"),
        "poster": $("#playlist .item div").eq(0).attr("moviesposter"),
        "data-description": $("#playlist .item div").eq(0).attr("data-description"),
        "title": $("#playlist .item div").eq(0).attr("title")    
    })
})
// GA script
document.addEventListener('DOMContentLoaded', init, false)
var videoId = document.getElementById('video-player');
var videoTitle = $('#videoplay').click(function () {
  $(this).data('description');
  console.log($(this).attr('data-description'));
});
console.log(videoTitle);
function init() {
  videoId.addEventListener('ended', videoEnd, false)
  videoId.addEventListener('timeupdate', videoTimeUpdate, false)
  videoId.addEventListener('play', videoPlay, false)
  videoId.addEventListener('pause', videoPause, false)
}
function setKeyFrames(duration) {
  var quarter = (duration / 4).toFixed(1)
  sessionStorage.setItem('one', quarter)
  sessionStorage.setItem('two', (quarter * 2).toFixed(1))
  sessionStorage.setItem('three', (quarter * 3).toFixed(1))
}
function videoTimeUpdate() {
  var curTime = videoId.currentTime.toFixed(1);
  var videoTitle = $(this).attr('data-description');
  switch (curTime) {
  case sessionStorage.getItem('one'):
    ga('send', 'event', 'video', '25% video played', videoTitle)
    sessionStorage.setItem('one', null)
  case sessionStorage.getItem('two'):
    ga('send', 'event', 'video', '50% video played', videoTitle)
    sessionStorage.setItem('two', null)
  case sessionStorage.getItem('three'):
    ga('send', 'event', 'video', '75% video played', videoTitle)
    sessionStorage.setItem('three', null)
  }
}
function videoEnd() {
  ga('send', 'event', 'video', '100% video played', $(this).attr('data-description'))
}
function videoPlay() {
  ga('send', 'event', 'video', 'video played', $(this).attr('data-description'))
  setKeyFrames(this.duration)
}
function videoPause() {
  ga('send', 'event', 'video', 'video paused', $(this).attr('data-description'))
}