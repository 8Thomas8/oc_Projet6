//Define Players prototype
class Players extends Objects {
  //Constructor for new instances
  constructor(name, texture) {
    super(name);
    this.life = 100;
    this.weapon = map.arrayWeapons[0];
    this.texture = texture;
    this.defStatue = false;
    this.numberOfPotions = 0;
  }

  //Select place for the players
  selectPlace(nb1, nb2) {
    super.selectPlace();

    let playerIndex = map.arrayPlayers.indexOf(this);
    //Verify for player two if he is not too close from player one.
    if (playerIndex == 1) {
      let otherPlayerIndex = 0;

      if ((map.arrayPlayers[otherPlayerIndex].coordY == map.arrayPlayers[playerIndex].coordY) && (map.arrayPlayers[otherPlayerIndex].coordX - map.arrayPlayers[playerIndex].coordX <= nb2) && (map.arrayPlayers[otherPlayerIndex].coordX - map.arrayPlayers[playerIndex].coordX >= nb1)) {
        this.selectPlace(nb1, nb2);
      } else if ((map.arrayPlayers[otherPlayerIndex].coordX == map.arrayPlayers[playerIndex].coordX) && (map.arrayPlayers[otherPlayerIndex].coordY - map.arrayPlayers[playerIndex].coordY <= nb2) && (map.arrayPlayers[otherPlayerIndex].coordY - map.arrayPlayers[playerIndex].coordY >= nb1)) {
        this.selectPlace(nb1, nb2);
      }
    }
  }

  //Fill the map array with players informations
  fillArrayMap() {
    let objectType = "player";
    super.fillArrayMap(objectType);
  }

  //Remove players info in the map array
  removeInArrayMap() {
    let objectType = "player";
    super.removeInArrayMap(objectType);
  }

  //Render players on the map
  render() {
    let objectType = "player";
    super.render(objectType);
  }

  renderWeapon() {
    let coordX = this.coordX;
    let coordY = this.coordY;
    let weaponTexture = this.weapon.texture;
    let playerAlt = this.name;
    let weaponAlt = this.weapon.name + "_" + playerAlt;
    let weaponClass = "weaponPlayer";
    //Display player's weapon
    $('td[data-x="' + coordX + '"][data-y="' + coordY + '"]').append('<img src="' + weaponTexture + '" alt="' + weaponAlt +
      '" class="' + weaponClass + '" />');
  }

  //Delete render of the player on the map
  delRender() {
    super.delRender();
    let playerAlt = this.name;
    let weaponAlt = this.weapon.name + "_" + playerAlt;
    $('img[alt="' + weaponAlt + '"]').remove('[alt="' + weaponAlt + '"]');
  }
}
