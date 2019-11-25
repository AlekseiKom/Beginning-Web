$(document).ready(function(){
    $("#linkList").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
     });
     });

    /*  $(document).ready(function() {
        var freqSecs = 1.2;
        setInterval (blink, freqSecs*1000 );
       
        function blink() {
         var inout = (freqSecs*1000)/0.5;
         $("#hire").fadeIn(inout).fadeOut(inout);
        }
       });    */