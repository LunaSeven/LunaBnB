// navbar change class
$(window).scroll(function() {

    if ($("#mainNav").offset().top > 500) {
        $("#mainNav").addClass("navbar-inverse");

        if($(window).width()>1200){
          var height= $("header").css("height");
          height=parseInt(height)/1.5;
          $("#sidebar").css("position","fixed");
          $("#sidebar").css("margin-top","-"+height+"px");
          $("#sidebar").css("margin-right","190px");
        }
    } else {
      $("#mainNav").removeClass("navbar-inverse");
      $("#sidebar").css("position","inherit");
      $("#sidebar").css("margin-top","10px");
      $("#sidebar").css("margin-right","0px");

      //
      //
      //
    }
});
