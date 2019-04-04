class Weapons extends Objects {
  //Constructor for new instance
  constructor(name, damages, texture) {
    super(name);
    this.damages = damages;
    this.texture = texture;
  }

  //Fill arrayMap with weapons informations
  fillArrayMap() {
    let objectType = "weapon";
    super.fillArrayMap(objectType);
  }

  //Render weapon on graphical map
  render() {
    let objectType = "weapon";
    super.render(objectType);
  }
}
