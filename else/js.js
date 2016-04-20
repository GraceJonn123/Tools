var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;
var cards = [];
var scores = [];

var Source = "#cardsBoard";

var ImgSource = [
  "data:image/gif;base64,R0lGODlhUABkAIAAAOY7OwAAACH5BAAAAAAALAAAAABQAGQAAAJkhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGBhYAAA7", "data:image/gif;base64,R0lGODlhUABkAIAAAObgOwAAACH5BAAAAAAALAAAAABQAGQAAAJkhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGBhYAAA7",
  "data:image/gif;base64,R0lGODlhUABkAIAAAE/mOwAAACH5BAAAAAAALAAAAABQAGQAAAJkhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGBhYAAA7", "data:image/gif;base64,R0lGODlhUABkAIAAADvmxAAAACH5BAAAAAAALAAAAABQAGQAAAJkhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGBhYAAA7", "data:image/gif;base64,R0lGODlhUABkAIAAADuP5gAAACH5BAAAAAAALAAAAABQAGQAAAJkhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGBhYAAA7", "data:image/gif;base64,R0lGODlhUABkAIAAAG875gAAACH5BAAAAAAALAAAAABQAGQAAAJkhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGBhYAAA7", "data:image/gif;base64,R0lGODlhUABkAIAAAP8A3gAAACH5BAAAAAAALAAAAABQAGQAAAJkhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGBhYAAA7", "data:image/gif;base64,R0lGODlhUABkAIAAAP9aAAAAACH5BAAAAAAALAAAAABQAGQAAAJkhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGBhYAAA7"
];

function ShuffleCards(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function ResetGame() {
  ShuffleCards(cards);
  $(Source).html(cards);
  Counter = 0;
  $(Source + " div").click(OpenCard);
  $(Source + " div").click(function() {
    $(this).addClass("is-fliped");
  });
  $("#success").remove();
  $("#counter").html("" + Counter);
  BoxOpened = "";
  ImgOpened = "";
  ImgFound = 0;
  return false;
}

function OpenCard() {
  var id = $(this).attr("id");

  if ($("#" + id + " img").is(":hidden")) {
    $(Source + " div").unbind("click", OpenCard);

    $("#" + id + " img").show();

    if (ImgOpened == "") {
      BoxOpened = id;
      ImgOpened = $("#" + id + " img").attr("src");
      setTimeout(function() {
        $(Source + " div").bind("click", OpenCard)
      }, 300);
    } else {
      CurrentOpened = $("#" + id + " img").attr("src");
      if (ImgOpened != CurrentOpened) {
        setTimeout(function() {
          $("#" + id + " img").hide();
          $("#" + BoxOpened + " img").hide();
          BoxOpened = "";
          ImgOpened = "";
        }, 400);
      } else {
        $("#" + id + " img").parent().css("visibility", "hidden");
        $("#" + BoxOpened + " img").parent().css("visibility", "hidden");
        ImgFound++;
        BoxOpened = "";
        ImgOpened = "";
      }
      setTimeout(function() {
        $(Source + " div").bind("click", OpenCard).removeClass("is-fliped");
      }, 400);
    }
    Counter++;
    $("#counter").html("" + Counter);

    if (ImgFound == ImgSource.length) {
      $("#counter").prepend('<span id="success">You Found All Pictues With </span>');
      addScore(Counter);
    }
  }
}

$(function() {
  for (var y = 1; y < 3; y++) {
    $.each(ImgSource, function(i, val) {
      if (cards.length > 0) {
        cards.push("<div id=card" + y + i + "><img src=" + val + " />");
      } else {
        cards = ["<div id=card" + y + i + "><img src=" + val + " />"];
      }
    });
  }
  ShuffleCards(cards);
  $(Source).html(cards);
  $(Source + " div").click(OpenCard);
  $(Source + " div").click(function() {
    $(this).addClass("is-fliped");
  });
  restoreScores();
  restoreLastScore();
  showScores();
});

function restoreScores() {
  try {
    scores = typeof $.cookie("ranking") != "undefined" ? JSON.parse($.cookie("ranking")) : [];
  } catch (e) {}
}

function restoreLastScore() {
  try {
    if (typeof $.cookie("lastScore") != "undefined") {
      $("#lastScore").html("Ultima puntuacion: " + $.cookie("lastScore"));
    }
  } catch (e) {}
}

function showScores() {
  var scoresList = "Ranking:<br>";
  if (typeof scores != "undefined" && scores.length > 0) {
    if (scores.length > 1) {
      scores.sort(function(a, b) {
        return a.Points - b.Points
      });
    }

    for (var i = 0; i < scores.length; i++) {
      scoresList = scoresList + (i + 1) + ". " + scores[i].Name + " - " + scores[i].Points + "<br>"
    }
    $("#ranking").html(scoresList);
    $.cookie("ranking", JSON.stringify(scores), {
      expires: 300
    });
  }
}

function addScore(points) {
  if (scores.length == 0 || points < scores[scores.length - 1].Points) {
    var name = prompt("Enter your name", "");
    if (scores.length > 9) { //Max 10 puntuaciones
      scores.shift();
    }
    if (scores.length > 0) {
      scores.push({
        Name: name,
        Points: points
      });
    } else {
      scores = [{
        Name: name,
        Points: points
      }];
    }
    showScores();
  }
  $("#lastScore").html("Ultima puntuacion: " + points);
  $.cookie("lastScore", points, {
    expires: 300
  });

}