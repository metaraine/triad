(function() {
  angular.module('triad').factory('PersonGraphic', function() {
    return function(x, y, size, rotation) {
      var person;
      person = new PIXI.Graphics();
      size = size || 20;
      person.beginFill(0x6699ff);
      person.moveTo(0, -size / 2);
      person.lineTo(size / 2, size / 2);
      person.lineTo(-size / 2, size / 2);
      person.lineTo(0, -size / 2);
      person.endFill();
      person.position.x = x || 0;
      person.position.y = y || 0;
      person.vx = 0;
      person.vy = 0;
      person.ax = 0;
      person.ay = 0;
      person.rotation = rotation || 0;
      person.animate = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += this.ax;
        return this.vy += this.ay;
      };
      person.face = function(x, y) {
        return this.rotation = Math.atan((this.position.y - y) / (this.position.x - x)) - Math.PI / 2;
      };
      return person;
    };
  });

}).call(this);
