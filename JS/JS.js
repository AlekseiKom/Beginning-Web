$(document).ready(function () {
    $("#linkList").on("click", "a", function (event) {
        var id = $(this).attr('href');
        if (!id || id.charAt(0) !== '#') return;
        var target = $(id);
        if (!target.length) return;
        event.preventDefault();
        $('body,html').animate({ scrollTop: target.offset().top }, 1500);
    });
});
