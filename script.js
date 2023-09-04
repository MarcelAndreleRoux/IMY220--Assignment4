$(() => {
  $(".submit").on("click", function (event) {
    event.preventDefault();

    const buttonId = event.target.id;
    const newMessageDiv = $("<div></div>");

    if (buttonId === "left") {
      newMessageDiv.css("background-color", "#D1FFBD");
    } else {
      newMessageDiv.css("background-color");
    }

    const messageVal = $("#message").val();

    if (!messageVal.trim()) {
      return;
    }

    let urls = extractURLs(messageVal);

    newMessageDiv.addClass("col-4 offset-4 rounded mb-2").text(messageVal);

    urls.forEach((url) => {
      if (isYouTubeLink(url)) {
        const videoID = extractVideoID(url);
        const embedUrl = "https://www.youtube.com/embed/" + videoID;
        let iframe = `<iframe src="${embedUrl}" width="100%" height="315px" frameborder="0" allowfullscreen></iframe>`;

        const iframeWrapper = $("<div class='youtube_video_frame'></div>");
        iframeWrapper.html(iframe);

        newMessageDiv.append(iframeWrapper);
      }
    });

    $(".messages").append(newMessageDiv);
  });

  const isYouTubeLink = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com)\/.+$/;
    return pattern.test(url);
  };

  const extractVideoID = (url) => {
    let videoID;

    // For "https://www.youtube.com/watch?v=VIDEO_ID" format
    if (url.includes("youtube.com")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoID = urlParams.get("v");
    }

    return videoID;
  };

  const extractURLs = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.match(urlPattern) || [];
  };
});
