//Prototype map
class Maps {
  //Constructor for the new instance
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.arrayMap = [];
    this.arrayWall = [];
    this.arrayPlayers = [];
    this.arrayWeapons = [];
    this.arrayPotions = [];
  }

  //Creation of the graphical map
  renderMap() {
    $('#gameMap').append('<table></table>');
    for (let j = ((this.width - 1) / 2); j >= (-(this.width - 1) / 2); j--) {
      $('table').append('<tr></tr>');
      for (let i = (-(this.height - 1) / 2); i <= ((this.height - 1) / 2); i++) {
        $('tr:last').append('<td data-x="' + i + '" data-y="' + j +
          '" class="floorClass"></td>');
      }
    }
  }

  //Creation of the arrayMap
  initArrayMap() {
    for (let j = ((this.width - 1) / 2); j >= (-(this.width - 1) / 2); j--) {
      for (let i = (-(this.height - 1) / 2); i <= ((this.height - 1) / 2); i++) {
        this.arrayMap.push({
          coordX: i,
          coordY: j,
          navigable: true,
          player: {
            active: false
          },
          weapon: {
            active: false
          },
          potion: {
            active: false
          }
        });
      }
    }
  }

  //Append wall in arrayMap
  fillWallInArrayMap() {
    $.each(this.arrayMap, function() {
      let randNb = randomNb(0, 6);
      if (randNb === 6) {
        this.navigable = false;
      }
    });
  }

  //Fill the arrayWall
  fillWallinArrayWall() {
    var thisArrayWall = this.arrayWall;
    $.each(this.arrayMap, function() {
      var thisArrayMap = this;
      if (this.navigable === false) {
        thisArrayWall.push(thisArrayMap);
      }
    });
  }

  //Render wall on the graphical map
  renderWall() {
    $.each(this.arrayWall, function() {
      let arrayX = this.coordX;
      let arrayY = this.coordY;
      $('[data-x="' + arrayX + '"][data-y="' + arrayY + '"]').removeClass('floorClass').addClass('wallClass');
    });
  }

  initObjects(array, damages = 10) {
    let mapName = this;

    $.each(array, function() {
      let name = this.name;
      let objectName = name;
      let objectTexture = this.txt;
      let objectType = this.type;

      switch (objectType) {
        case "weapon":
          objectName = new Weapons(name, damages,
            objectTexture);
          mapName.arrayWeapons.push(objectName);
          if (name != "Knife") {
            objectName.selectPlace();
          }
          damages += 5;
          break;
        case "player":
          objectName = new Players(name, objectTexture);
          mapName.arrayPlayers.push(objectName);
          objectName.selectPlace(-1, 1);
          break;
        case "potion":
          objectName = new Potions(name);
          mapName.arrayPotions.push(objectName);
          objectName.selectPlace();
      }

      if ((objectType === "player") || (objectType === "potion") || ((objectType === "weapon") && (name != "Knife"))) {
        objectName.fillArrayMap();
        objectName.render();
        if (objectType === "player") {
          objectName.renderWeapon();
        }
      }

    });
  }

}
