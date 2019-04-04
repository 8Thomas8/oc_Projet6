class Objects {
  constructor(name) {
    this.active = true;
    this.name = name;
  }

  //Select place for object
  selectPlace() {
    let objectPlace = map.arrayMap[randomNb(0, (mapWidth * mapHeight) - 1)];
    //Verify if there is not player/weapon/wall/potion on selected place
    if ((objectPlace.navigable === false) ||
      (objectPlace.player.active === true) ||
      (objectPlace.weapon.active === true) ||
      (objectPlace.potion.active === true)) {
      this.selectPlace();
    } else {
      this.coordX = objectPlace.coordX;
      this.coordY = objectPlace.coordY;
    }
  }

  //Fill the map array with objects informations
  fillArrayMap(objectType) {
    let object = this;
    let coordX = this.coordX;
    let coordY = this.coordY;
    $.each(map.arrayMap, function() {
      if ((coordX == this.coordX) &&
        (coordY == this.coordY)) {
        if (objectType === "potion") {
          this.potion = object;
        } else if (objectType === "weapon") {
          this.weapon = object;
        } else if (objectType === "player") {
          this.player = object;
        }
      }
    });
  }

  //Remove object info in the map array
  removeInArrayMap(objectType) {
    let object = this;
    let coordX = this.coordX;
    let coordY = this.coordY;
    $.each(map.arrayMap, function() {
      if ((coordX == this.coordX) &&
        (coordY == this.coordY)) {
        if (objectType === "potion") {
          this.potion = {
            active: false
          };
        } else if (objectType === "weapon") {
          this.weapon = {
            active: false
          };
        } else if (objectType === "player") {
          this.player = {
            active: false
          };
        }
      }
    });
  }

  //Render objects on graphical map
  render(objectType) {
    let coordX = this.coordX;
    let coordY = this.coordY;
    let objectTexture = this.texture;
    let objectAlt = this.name;
    let objectClass = objectType + "sMap";
    $('td').each(function() {
      let compX = $(this).attr('data-x');
      let compY = $(this).attr('data-y');
      if ((compX == coordX) && (compY == coordY)) {
        if (objectType !== "player") {
          $(this).append('<img src="' + objectTexture + '" alt="' + objectAlt +
            '" class="' + objectClass + '" />');
        } else {
          $(this).append('<img src="' + objectTexture + '" alt="' + objectAlt +
            '" class="' + objectClass + '" id="' + objectAlt + "ImgMap" + '" />');
        }
      }
    });
  }

  //Delete render of the object on the map
  delRender() {
    let objectAlt = this.name;
    $('img[alt="' + objectAlt + '"]').remove('[alt="' + objectAlt + '"]');
  }

}
