let NUMBER_SCREEN = 1;
let SUBSCREEN_WIDTH = 2048;
let SUBSCREEN_HEIGHT = 1536;
let SCREEN_WIDTH = SUBSCREEN_WIDTH*NUMBER_SCREEN;
let SCREEN_HEIGHT = SUBSCREEN_HEIGHT;

function shuffle (array) {
    var i = 0
        , j = 0
        , temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

$(document).ready(function () {
    //Body size setup
   $("body").css({"width":SCREEN_WIDTH+"px","height":SCREEN_HEIGHT+"px"});

   let display = [];

   let vids = $.getJSON("../res/url.json",function (data) {
       $.each(data.urls,function (index,value) {
           display.push(value)
       });

       shuffle(display);

       let subIndexes = display.slice(0,NUMBER_SCREEN);

       for(var i=0;i<NUMBER_SCREEN;i++) {
           let left = i * SUBSCREEN_WIDTH;
           $("body").append("<video id='subscreen"+i+"' src='"+("../res/"+subIndexes[i])+"' class='subscreen' style='left:"+left+"px;' width='"+SUBSCREEN_WIDTH+"px' height='"+SUBSCREEN_HEIGHT+"px' autoplay muted>" +
               "            </video>");
       }


       //Setting automation
       $(".subscreen").each(function(){
            $(this).bind("ended",function(){
                let index = Math.floor(Math.random()*vids.responseJSON.urls.length);
                $(this).attr("src","../res/"+vids.responseJSON.urls[index]);
                this.play();
            })
       });

   });






});