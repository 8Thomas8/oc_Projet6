class Game {
  //Game constructor
  constructor() {
    map = new Maps(mapWidth, mapHeight);
    map.renderMap();
    map.initArrayMap();
    map.fillWallInArrayMap();
    map.fillWallinArrayWall();
    map.renderWall();
    map.initObjects(objectsArray);
    this.nextToMove = map.arrayPlayers[0];
    this.nextToFight = null;
    this.gameOver = false;
    this.lastMoveSuccess = null;
    $('#' + this.nextToMove.name).addClass('playerCardActive');
    this.showPossibleMoves(this.nextToMove);

    //Write player's cards at the start
    $.each(map.arrayPlayers, function() {
      $('#' + this.name + 'Img').prepend('<img src="' + this.weapon.texture + '" alt="' + this.weapon.name + '" class="playerCardWeaponImg" id="' + this.name + "WeaponImg" + '"/>');
      $('#' + this.name + 'Img').prepend('<img src="' + this.texture + '" alt="' + this.name + "Img" + '" class="playerCardImg" id="' + this.name + "Img" + '"/>');
      $('#' + this.name + 'LifeProgressBar').val(this.life);
      $('#' + this.name + 'LifePercent').append(this.life + '/100');
      $('#' + this.name + 'Damage > p').append(' ' + this.weapon.damages);
      $('#' + this.name + 'Potions > p').append(' ' + this.numberOfPotions);
    });
  }
  //Update player's cards after move / loot
  updatePlayerCard(player) {
    $('#' + player.name + "WeaponImg").attr('src', player.weapon.texture);
    $('#' + player.name + 'Damage > p').html('');
    $('#' + player.name + 'Damage > p').append(' ' + player.weapon.damages);
    $('#' + player.name + 'Potions > p').html('');
    $('#' + player.name + 'Potions > p').append(' ' + player.numberOfPotions);
  }

  //Update next player to play
  updateplayerCardNextToPlay(player) {
    $('.playerCardActive').removeClass('playerCardActive');
    $('#' + player.name).addClass('playerCardActive');
  }

  /////////////////////
  //Movement section//
  ///////////////////
  //Movement function
  movement(player, clickX, clickY) {
    player.delRender();
    player.removeInArrayMap();
    player.coordX = clickX;
    player.coordY = clickY;
    player.fillArrayMap();
    player.render();
    if (this.isItAWeapon(clickX, clickY) === false) {
      player.renderWeapon();
    }
  }

  //Display where player can move
  showPossibleMoves(player) {
    $('.possibleDest').removeClass('possibleDest');

    let coordX = Number(player.coordX);
    let coordY = Number(player.coordY);

    for (let i = 0; i <= 3; i++) {
      let testX = coordX + i;

      if (i != 0) {
        if ($('[data-x="' + testX + '"][data-y="' + coordY + '"]').hasClass('wallClass') === true) {
          break;
        } else if ($('[data-x="' + testX + '"][data-y="' + coordY + '"]').hasClass('wallClass') === false) {
          $('[data-x="' + testX + '"][data-y="' + coordY + '"]').addClass('possibleDest');
        }
      }
    }

    for (let i = 0; i >= -3; i--) {
      let testX = coordX + i;

      if (i != 0) {
        if ($('[data-x="' + testX + '"][data-y="' + coordY + '"]').hasClass('wallClass') === true) {
          break;
        } else if ($('[data-x="' + testX + '"][data-y="' + coordY + '"]').hasClass('wallClass') === false) {
          $('[data-x="' + testX + '"][data-y="' + coordY + '"]').addClass('possibleDest');
        }
      }
    }

    for (let i = 0; i <= 3; i++) {
      let testY = coordY + i;

      if (i != 0) {
        if ($('[data-x="' + coordX + '"][data-y="' + testY + '"]').hasClass('wallClass') === true) {
          break;
        } else if ($('[data-x="' + coordX + '"][data-y="' + testY + '"]').hasClass('wallClass') === false) {
          $('[data-x="' + coordX + '"][data-y="' + testY + '"]').addClass('possibleDest');
        }
      }
    }

    for (let i = 0; i >= -3; i--) {
      let testY = coordY + i;

      if (i != 0) {
        if ($('[data-x="' + coordX + '"][data-y="' + testY + '"]').hasClass('wallClass') === true) {
          break;
        } else if ($('[data-x="' + coordX + '"][data-y="' + testY + '"]').hasClass('wallClass') === false) {
          $('[data-x="' + coordX + '"][data-y="' + testY + '"]').addClass('possibleDest');
        }
      }
    }
  }

  //Test if move is possible
  cantDoMove(player, clickX, clickY) {
    let cantDoThisMove;

    //Verify if destination is a wall
    $.each(map.arrayWall, function() {
      if (clickX == this.coordX) {
        if (clickY == this.coordY) {
          cantDoThisMove = true;
          return;
        }
      }
    });
    //Verify if destination is a player
    $.each(map.arrayPlayers, function() {
      if (clickX == this.coordX) {
        if (clickY == this.coordY) {
          cantDoThisMove = true;
          return;
        }
      }
    });

    //Verify is there is a wall between player & destination
    if ((clickY == player.coordY) && (clickX > player.coordX)) {
      for (let i = player.coordX; i < clickX; i++) {
        $.each(map.arrayWall, function() {
          if ((this.coordX == i) && (this.coordY == player.coordY) && (this.navigable === false)) {
            cantDoThisMove = true;
            return;
          }
        });
      }
    }
    if ((clickY == player.coordY) && (clickX < player.coordX)) {
      for (let i = player.coordX; i > clickX; i--) {
        $.each(map.arrayWall, function() {
          if ((this.coordX == i) && (this.coordY == player.coordY) && (this.navigable === false)) {
            cantDoThisMove = true;
            return;
          }
        });
      }
    }
    if ((clickX == player.coordX) && (clickY > player.coordY)) {
      for (let i = player.coordY; i < clickY; i++) {
        $.each(map.arrayWall, function() {
          if ((this.coordY == i) && (this.coordX == player.coordX) && (this.navigable === false)) {
            cantDoThisMove = true;
            return;
          }
        });
      }
    }
    if ((clickX == player.coordX) && (clickY < player.coordY)) {
      for (let i = player.coordY; i > clickY; i--) {
        $.each(map.arrayWall, function() {
          if ((this.coordY == i) && (this.coordX == player.coordX) && (this.navigable === false)) {
            cantDoThisMove = true;
            return;
          }
        });
      }
    }
    if (cantDoThisMove === true) {
      return true;
    } else {
      return false;
    }

  }

  //Test if there is a weapon at the destination
  isItAWeapon(clickX, clickY) {
    let thisIsWeapon;
    $.each(map.arrayWeapons, function() {
      if (clickX == this.coordX) {
        if (clickY == this.coordY) {
          thisIsWeapon = true;
        }
      }
    });

    if (thisIsWeapon === true) {
      return true;
    } else {
      return false;
    }
  }

  //Execute tests for destination, movement & move
  testMovement(player, clickX, clickY) {
    this.lastMoveSuccess = "";

    //Verify if destination isn't actual player pos or if destination isn't align with player
    if ((player.coordX != clickX) && (player.coordY != clickY)) {
      return;
    } else if ((player.coordX == clickX) && (player.coordY == clickY)) {
      return;
    }

    //Verify if there is an obstacle
    if (this.cantDoMove(player, clickX, clickY) === true) {
      //console.log("Il y a un obstacle !");
      return;
    }

    //Test of movement is +3 or -3, then execute movement
    if ((clickX - player.coordX <= 3) && (clickX - player.coordX >= -3) && (player.coordY == clickY)) {
      this.movement(player, clickX, clickY);
      this.lastMoveSuccess = true;
    } else if ((clickY - player.coordY <= 3) && (clickY - player.coordY >= -3) && (player.coordX == clickX)) {
      this.movement(player, clickX, clickY);
      this.lastMoveSuccess = true;
    } else {
      //console.log("C'est trop loin !");
    }
  }

  //Drop actual weapon & loot the new weapon
  lootWeapon(player) {
    let weaponOnMap = null;
    $.each(map.arrayWeapons, function() {
      if ((this.coordX == player.coordX) && (this.coordY == player.coordY)) {
        weaponOnMap = this;
      }
    });

    if (weaponOnMap != null) {
      let lastPlayerWeapon = player.weapon;
      player.weapon = weaponOnMap;

      weaponOnMap.delRender();
      weaponOnMap.coordX = null;
      weaponOnMap.coordY = null;

      lastPlayerWeapon.coordX = player.coordX;
      lastPlayerWeapon.coordY = player.coordY;

      player.fillArrayMap();
      player.renderWeapon();
      lastPlayerWeapon.fillArrayMap();
      lastPlayerWeapon.render();
    }
  }

  //Drop actual weapon & loot the new weapon
  lootPotion(player) {
    let potionOnMap = null;
    $.each(map.arrayPotions, function() {
      if ((this.coordX == player.coordX) && (this.coordY == player.coordY)) {
        potionOnMap = this;
      }
    });

    if (potionOnMap != null) {
      player.numberOfPotions += 1;

      potionOnMap.delRender();
      potionOnMap.coordX = null;
      potionOnMap.coordY = null;

      player.fillArrayMap();
    }
  }

  //Verify if there is a player at 1, & begin a battle.
  verifyBattle(player) {
    let otherPlayer;

    $.each(map.arrayPlayers, function() {
      if (player != this) {
        otherPlayer = this;
      }
    });

    if ((otherPlayer.coordY == player.coordY) && ((otherPlayer.coordX - player.coordX <= 1) && (otherPlayer.coordX - player.coordX >= -1))) {
      this.newBattle(player);
    } else if ((otherPlayer.coordX == player.coordX) && ((otherPlayer.coordY - player.coordY <= 1) && (otherPlayer.coordY - player.coordY >= -1))) {
      this.newBattle(player);
    }
  }

  //Movement actions method (move & loot/drop weapon) + verify if there is a battle
  action(player, clickX, clickY) {
    this.testMovement(player, clickX, clickY);
    if (this.lastMoveSuccess === true) {
      this.lootWeapon(player);
      this.lootPotion(player);
    }
    this.verifyBattle(player);
  }

  //Turn by turn method for movements
  turnByTurn(clickX, clickY) {
    let nextPlayer = this.nextToMove;
    this.action(nextPlayer, clickX, clickY);
    this.updatePlayerCard(this.nextToMove);
    if ((nextPlayer === map.arrayPlayers[0]) && (this.lastMoveSuccess === true)) {
      this.nextToMove = map.arrayPlayers[1];
    } else if ((nextPlayer === map.arrayPlayers[1]) && (this.lastMoveSuccess === true)) {
      this.nextToMove = map.arrayPlayers[0];
    }
    this.updateplayerCardNextToPlay(this.nextToMove);
    this.showPossibleMoves(this.nextToMove);
  }

  ////////////////////////////////////////////////////////////////////
  ////////////////////////////Battle//////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  //Verify if game is over
  verifyGameOver(player) {
    $.each(map.arrayPlayers, function() {
      if (this.life <= 0) {
        this.gameOver = true;
        $('#battleArea').css("display", "none");
        $('#gameOver').css("display", "block");
        $('#winnerImg').append('<img src="' + player.texture + '" alt="' + player.name + '" class="playerBattleCardImg"/>');
      }
    });
  }

  //Create new battle
  newBattle(player) {
    this.nextToFight = player;

    $('#game').css("display", "none");
    $('#battleArea').css("display", "flex");

    $.each(map.arrayPlayers, function() {
      let playerSelected = this;
      $('#battle' + this.name + 'Img').prepend('<img src="' + this.weapon.texture + '" alt="' + this.weapon.name + '" class="playerBattleCardWeaponImg"/>');
      $('#battle' + this.name + 'Img').prepend('<img src="' + this.texture + '" alt="' + this.name + '" class="playerBattleCardImg"/>');
      $('.battle' + this.name + 'LifeProgressBar').each(function() {
        $(this).val(playerSelected.life);
      });
      $('.battle' + this.name + 'LifePercent').each(function() {
        $(this).append(playerSelected.life + '/100');
      });
      $('#battle' + this.name + 'Damage > p').append(' ' + this.weapon.damages);
      $('#battle' + this.name + 'Potion > p').append(' ' + this.numberOfPotions);

      if (playerSelected.name !== player.name) {
        $('#battle' + this.name + 'Hit').prop('disabled', true);
        $('#battle' + this.name + 'Def').prop('disabled', true);
        $('#battle' + this.name + 'Heal').prop('disabled', true);
      } else if (playerSelected.name === player.name) {
        $('#battleCard' + this.name).addClass('battleCardActive');
        $('#battle' + this.name + 'Hit').addClass('battleButtonActive');
        $('#battle' + this.name + 'Def').addClass('battleButtonActive');
        if ((this.numberOfPotions > 0) && (this.life <= 85)) {
          $('#battle' + this.name + 'Heal').addClass('battleButtonActive');
          $('#battle' + this.name + 'Heal').prop('disabled', false);
        } else {
          $('#battle' + this.name + 'Heal').prop('disabled', true);
        }
      }

    });

  }

  //Update battlecard
  updateBattleCard() {
    $.each(map.arrayPlayers, function() {
      $('.battle' + this.name + 'LifeProgressBar').val(this.life);
      $('.battle' + this.name + 'LifePercent').html('');
      $('.battle' + this.name + 'LifePercent').append(this.life + '/100');
      if ((this.life <= 100) && (this.life > 50)) {
        $('#battle' + this.name + 'LifeBar1').css('display', 'block');
        $('#battle' + this.name + 'LifeBar2').css('display', 'none');
        $('#battle' + this.name + 'LifeBar3').css('display', 'none');
      } else if ((this.life <= 50) && (this.life > 25)) {
        $('#battle' + this.name + 'LifeBar1').css('display', 'none');
        $('#battle' + this.name + 'LifeBar2').css('display', 'block');
        $('#battle' + this.name + 'LifeBar3').css('display', 'none');
      } else if ((this.life <= 25) && (this.life > 0)) {
        $('#battle' + this.name + 'LifeBar1').css('display', 'none');
        $('#battle' + this.name + 'LifeBar2').css('display', 'none');
        $('#battle' + this.name + 'LifeBar3').css('display', 'block');
      }
      $('#battle' + this.name + 'Potion > p').html('');
      $('#battle' + this.name + 'Potion > p').append(' ' + this.numberOfPotions);
    });
  }

  //Update next player to fight at the end of the turn
  updateplayerCardNextToFight(player, otherPlayer) {
    $('.battleCardActive').removeClass('battleCardActive');
    $('.battleButtonActive').removeClass('battleButtonActive');
    let players = [player, otherPlayer];
    $.each(players, function() {
      let statue;
      if (this === player) {
        statue = false;
      } else {
        statue = true;
      }
      $('#battle' + this.name + 'Hit').prop('disabled', statue);
      $('#battle' + this.name + 'Def').prop('disabled', statue);
      if (this === otherPlayer) {
        $('#battle' + this.name + 'Heal').prop('disabled', true);
      } else if (this === player) {
        $('#battleCard' + this.name).addClass('battleCardActive');
        $('#battle' + this.name + 'Hit').addClass('battleButtonActive');
        $('#battle' + this.name + 'Def').addClass('battleButtonActive');
        if ((this.numberOfPotions > 0) && (this.life <= 85)) {
          $('#battle' + this.name + 'Heal').addClass('battleButtonActive');
          $('#battle' + this.name + 'Heal').prop('disabled', false);
        }
      }
    });
  }

  //Update each players
  updatePlayer(player, otherPlayer) {
    $.each(map.arrayPlayers, function() {
      let playerSelected = this;
      if (player.name === playerSelected.name) {
        playerSelected = player;
      } else if (otherPlayer.name === playerSelected.name) {
        playerSelected = otherPlayer;
      }
    });
  }

  //Attack in a battlefight
  battleFightHit(player, otherPlayer) {
    if (otherPlayer.defStatue === true) {
      otherPlayer.life -= player.weapon.damages / 2;
    } else {
      otherPlayer.life -= player.weapon.damages;
    }
  }

  //Defend in a battlefight
  battleFightDef(player) {
    player.defStatue = true;
  }

  //Heal in a battlefight
  battleFightHeal(player) {
    if (player.numberOfPotions > 0) {
      player.life += 15;
      player.numberOfPotions -= 1;
    }
  }

  //Turn by turn for battlefight
  battleFightTurnByTurn(action) {
    let player = this.nextToFight;
    let otherPlayer;
    if (player === map.arrayPlayers[0]) {
      otherPlayer = map.arrayPlayers[1];
    } else if (player === map.arrayPlayers[1]) {
      otherPlayer = map.arrayPlayers[0];
    }

    if (action === "hit") {
      player.defStatue = false;
      this.battleFightHit(player, otherPlayer);
    } else if (action === "def") {
      this.battleFightDef(player);
    } else if (action === "heal") {
      this.battleFightHeal(player);
    }

    this.updateBattleCard();
    this.updatePlayer(player, otherPlayer);
    this.verifyGameOver(player);

    if (this.gameOver === false) {
      let otherPlayer = this.nextToFight;
      if (this.nextToFight === map.arrayPlayers[0]) {
        this.nextToFight = map.arrayPlayers[1];
      } else if (this.nextToFight === map.arrayPlayers[1]) {
        this.nextToFight = map.arrayPlayers[0];
      }
      this.updateplayerCardNextToFight(this.nextToFight, otherPlayer);
    }
  }

}
