const TIMEOUT = 3000;
const NUMBER_TO_SHOW = 10;
var toAdd = 0;
var urls;
var indexes;
$(document).ready(function () {
  communicator.initialize();

  // You need to tell the communicator for which game it's working on.
  // This will change the state you get back from the server
  communicator.game = 'gifcorner';

  let owl = $('.owl-carousel').owlCarousel({
      loop:true,
      items:1,
      dots:true
  });

    function updateGIFs(nb,data){
        indexes = [];
        for(var i=0;i<nb;i++){
            var temp;
            do {
                temp = Math.floor(Math.random() * data.urls.length);
            }while($.inArray(temp,indexes,0)!==-1);
            indexes.push(temp)
        }


        for(var i=0;i<indexes.length;i++) {
            owl.trigger('add.owl.carousel', ["<img class='item' src='"+data.urls[indexes[i]]+"'/>", i+""]);
        }
        owl.trigger( 'refresh.owl.carousel' );
    }

  urls = $.getJSON("../res/url.json",function (data) {
      updateGIFs(NUMBER_TO_SHOW,data);

  });


    owl.on('changed.owl.carousel',function(p){
            if(p.page.index!==-1)
                toAdd =p.page.index;
    });

    //Send event
    var send = function () {
        let gif = {url:$($(".active.owl-item")[0]).html().split("\"")[3]};
        communicator.send(communicator.game+".addGIF",gif,function(e){});

        //Send config
        $("#send").css("pointer-events","none");
        $(".send_link").text("NO SPAM");
        $(".send_link").addClass("blue_inactive").removeClass("blue");

        setTimeout(function () {
            $("#send").css("pointer-events","auto");
            $(".send_link").addClass("blue").removeClass("blue_inactive");
            $(".send_link").text("Send GIF !");

        },TIMEOUT)

        //Refresh config
        $("#refresh").css("pointer-events","none");
        $(".refresh_link").addClass("blue_inactive").removeClass("blue");

        setTimeout(function () {
            $("#refresh").css("pointer-events","auto");
            $(".refresh_link").addClass("blue").removeClass("blue_inactive");
        },TIMEOUT)
    };

    $("#send").click(send);
    $("#refresh").click(function () {
        location.reload()
    })


});
