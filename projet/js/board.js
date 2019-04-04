//Generate a random number between min to max
function randomNb(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Waiting DOM
$(function() {
  //start a new game
  var game = new Game();

  //Listen for click event & calling game.turnByTurn
  $('td').click(function() {
    $('#coordInfo > p').html(' ');
    clickX = $(this).attr('data-x');
    clickY = $(this).attr('data-y');
    game.turnByTurn(clickX, clickY);
  });

  //Button for hit or def in battle
  $('.battlePlayerHit').click(function() {
    game.battleFightTurnByTurn("hit");
  });
  $('.battlePlayerDef').click(function() {
    game.battleFightTurnByTurn("def");
  });
  $('.battlePlayerHeal').click(function() {
    game.battleFightTurnByTurn("heal");
  });

});
