function videoCreation(search, total)
{
  var id = search.replace(/\s+/g, '-').toLowerCase();

  $(".video-container")
    .append(
      $("<div>")
        .append(
          $("<div>")
            .addClass("content-title")
            .text(search),
          $("<div>")
            .addClass("video-list")
            .attr("id", id),
          $("<div>")
            .addClass("divider")
        )
    );

  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'id',
      maxResults: total,
      q: search,
      type: 'video',
      key: APIkey},

    function(data)
    {
      $.each(data.items, function(i, items)
      {

        var vidID = items.id.videoId;

        $.get(
          "https://www.googleapis.com/youtube/v3/videos",{
            id: vidID,
            part: 'id, snippet, statistics',
            key: APIkey},

          function(data)
          {

            /* Assigning vidoe data to variables. */

            //Video details
            var vidID = data.items[0].id;
            var videoTitle = data.items[0].snippet.title;
            var videoThumb = data.items[0].snippet.thumbnails.medium.url;
            var videoDate = data.items[0].snippet.publishedAt;
            var videoViews = data.items[0].statistics.viewCount;

            //Channel details
            var channelName = data.items[0].snippet.channelTitle;


            /* Changing formats of the video date and views. */

            //Video date format
            videoDate = moment(videoDate, "YYYYMMDD").fromNow();

            //Video views format
            if(videoViews > 999 && videoViews < 999999)
            {
              videoViews = Math.floor((videoViews / 1000).toFixed(1)) + "K";
            }
            else if (videoViews > 999999)
            {
              videoViews = (videoViews / 1000000).toFixed(1) + "M";
            }


            /* Creating HTML element with video data and appending it to a div container */

            $("#"+id)
            .append(
              $("<div>")
                .addClass("video")
                .append(
                  $("<a>")
                  .attr("href","https://www.youtube.com/watch?v=" + vidID)
                  .append(
                    $("<img>")
                      .addClass("video-thumbnail")
                      .attr("src", videoThumb)
                    ),
                  $("<div>")
                    .addClass("video-details")
                    .append(
                      $("<a>")
                      .attr("href","https://www.youtube.com/watch?v=" + vidID)
                      .append(
                        $("<h3>")
                          .text(videoTitle)
                          .addClass("video-title")
                      ),
                      $("<div>")
                        .text(channelName)
                        .addClass("video-channel"),
                      $("<div>")
                        .text(videoViews +" views \u2022 "+ videoDate)
                        .addClass("video-stats") ))
            );

          }
        );

      });
    }
  );
}

function videoResults(search, total)
{
    var id = search.replace(/\s+/g, '-').toLowerCase();

    $.get(
      "https://www.googleapis.com/youtube/v3/search",{
        part: 'snippet, id',
        maxResults: total,
        q: search,
        type: 'video',
        key: APIkey},

      function(data)
      {

        $(".video-container")
          .append(
            $("<div>")
              .addClass("results-control")
              .text("About " + data.pageInfo.totalResults.toLocaleString() + " results"),
            $("<div>")
              .addClass("results")
              .attr("id", "results")
          );

        console.log(data);

        $.each(data.items, function(i, items)
        {

          var vidID = items.id.videoId;

          $.get(
            "https://www.googleapis.com/youtube/v3/videos",{
              id: vidID,
              part: 'id, snippet, statistics',
              key: APIkey},

            function(data)
            {
              /* Assigning vidoe data to variables. */

              //Video details
              var videoTitle = data.items[0].snippet.title;
              var videoThumb = data.items[0].snippet.thumbnails.medium.url;
              var videoDate = data.items[0].snippet.publishedAt;
              var videoViews = data.items[0].statistics.viewCount;
              var videoDesc = data.items[0].snippet.description;

              //Channel details
              var channelName = data.items[0].snippet.channelTitle;


              /* Changing formats of the video date and views. */

              //Video date format
              videoDate = moment(videoDate, "YYYYMMDD").fromNow();

              //Video views format
              if(videoViews > 999 && videoViews < 999999)
              {
                videoViews = Math.floor((videoViews / 1000).toFixed(1)) + "K";
              }
              else if (videoViews > 999999)
              {
                videoViews = (videoViews / 1000000).toFixed(1) + "M";
              }

              $("#results").append(
                $("<div>")
                  .addClass("video")
                  .append(
                    $("<a>")
                    .attr("href","https://www.youtube.com/watch?v=" + vidID)
                    .append(
                      $("<img>")
                        .addClass("vid-thumb")
                        .attr("src", videoThumb)
                      ),
                    $("<div>")
                      .addClass("vid-content")
                      .append(
                        $("<a>")
                        .attr("href","https://www.youtube.com/watch?v=" + vidID)
                        .append(
                          $("<div>")
                            .text(videoTitle)
                            .addClass("vid-title")
                        ),
                        $("<div>")
                          .text(channelName + " \u2022 " + videoViews +" views \u2022 "+ videoDate)
                          .addClass("vid-stats"),
                        $("<div>")
                          .text(videoDesc)
                          .addClass("vid-desc")
              )));
            }
          );

        });
      }
    );
}
