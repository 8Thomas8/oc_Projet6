//Define Potions prototype
class Potions extends Objects {

  //Constructor for new instances
  constructor(name) {
    super(name);
    this.texture = "./img/potions/potion.jpg";
  }

  //Fill the map array with potions informations
  fillArrayMap() {
    let objectType = "potion";
    super.fillArrayMap(objectType);
  }

  //Remove potions info in the map array
  removeInArrayMap() {
    let objectType = "potion";
    super.removeInArrayMap(objectType);
  }

  //Render potions on graphical map
  render() {
    let objectType = "potion";
    super.render(objectType);
  }
}
