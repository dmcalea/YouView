$(document).ready( function(){

  $("#collapse").on("click", function(){

    if($(".sidebar").hasClass("hide"))
    {
      $(".sidebar").removeClass("hide");
      $(".content").addClass("full");
    }
    else
    {
      $(".sidebar").addClass("hide");
      $(".content").removeClass("full");
    }

  });

  $("#item-toggle").on("click", function(){

    if(!$("#item-toggle").hasClass("show-more"))
    {

      $(this).empty();
      $(this).append(
        $("<img>")
          .attr("src", "img/more.svg")
          .addClass("item-img"),
        $("<span>")
          .text("Show more")
      );

      $(".item-visible").each(function(){

        $(this).addClass("item-hidden");
        $(this).removeClass("item-visible");

      });

      $("#item-toggle").addClass("show-more");
      $("#item-toggle").removeClass("show-less");
    }
    else
    {

      $(this).empty();
      $(this).append(
        $("<img>")
          .attr("src", "img/less.svg")
          .addClass("item-img"),
        $("<span>")
          .text("Show less")
      );

      $(".item-hidden").each(function(){

        $(this).addClass("item-visible");
        $(this).removeClass("item-hidden");

      });

      $("#item-toggle").addClass("show-less");
      $("#item-toggle").removeClass("show-more");
    }

  });

});
