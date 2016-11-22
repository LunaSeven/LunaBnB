// navbar change class
$(window).scroll(function() {
    if ($("#mainNav").offset().top > 500) {
        $("#mainNav").addClass("navbar-inverse");
    } else {
      $("#mainNav").removeClass("navbar-inverse");
    }
});
