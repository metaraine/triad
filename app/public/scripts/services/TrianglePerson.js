(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('triad').factory('TrianglePerson', function() {
    var TrianglePerson;
    TrianglePerson = (function(_super) {
      __extends(TrianglePerson, _super);

      function TrianglePerson(x, y, size, rotation) {
        TrianglePerson.__super__.constructor.call(this);
        this.beginFill(0x6699ff);
        this.moveTo(0, -size / 2);
        this.lineTo(size / 2, size / 2);
        this.lineTo(-size / 2, size / 2);
        this.lineTo(0, -size / 2);
        this.endFill();
        this.position.x = x || 0;
        this.position.y = y || 0;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.rotation = rotation || 0;
      }

      TrianglePerson.prototype.animate = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += this.ax;
        return this.vy += this.ay;
      };

      TrianglePerson.prototype.face = function(x, y) {
        return this.rotation = Math.atan((this.position.y - y) / (this.position.x - x)) - Math.PI / 2;
      };

      return TrianglePerson;

    })(PIXI.Graphics);
    return TrianglePerson;
  });

}).call(this);
