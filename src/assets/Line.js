//Line类
import PF from "pathfinding";
import * as d3 from "d3";
var _width = 0;
var _height = 0;

function Line(r1, r2, origins, offset, svg, width, height) { //start end为图形对象 origin为鼠标经过方向 offset为{start:{x:1,y:1},end:{x:1,y:1}}格式
    this.start = null;
    this.end = null;
    this.data = [];
    this.offset = {};
    this.origins = origins;
    this.svg = svg
    _width = width;
    _height = height;
    if (r1, r2) {
        this.start = r1;
        this.end = r2;
        this.offset.start = offset.start;
        this.offset.end = offset.end;
        //创建点
        // console.log(svg)
        pathfinding.call(this, this.svg);
    }
}

Line.prototype.draw = function(g) {
    //画线
    this.path = g
        .append("path")
        .attr("d", () => {
            return this.line()(this.data);
        })
        .attr("fill", "none")
        .attr("stroke", "#000");
}
Line.prototype.update = function() {
    pathfinding.call(this, this.svg);
    this
        .path
        .attr("d", () => {
            return this.line()(this.data);
        });
}
Line.prototype.setDate = function(arr) { //arr为[{x,y},{x,y}...]
    this.data = arr;
}
Line.prototype.line = function() {
    //画线函数
    var type = d3.curveStep;
    if (this.origins.start == "down" && this.origins.end == "left") {
        type = d3.curveStepBefore
    } else if (this.origins.start == "down" && this.origins.end == "right") {
        type = d3.curveStepAfter
    } else if (this.origins.start == "right" && this.origins.end == "left") {
        type = d3.curveStepBefore
    } else if (this.origins.start == "right" && this.origins.end == "right") {
        type = d3.curveStepAfter
    }
    // var line = d3.line().x((d, i) => {     return d.x }).y((d, i) => {     return
    // d.y; }).curve(d3.curveStep); var line = d3.line().x((d, i) => {     return
    // d[0]; }).y((d, i) => {     return d[1]; }).curve(d3.curveStep); return line;
    var line = d3
        .line()
        .x((d, i) => {
            return d[0];
        })
        .y((d, i) => {
            return d[1];
        });
    return line;
}

function pathfinding(svg) {
    var p0, p1, p2, p3, p4, p5;
    this.start.getBound();
    this.end.getBound();
    p0 = {
        x: this.start.x + this.offset.start.x,
        y: this.start.y + this.offset.start.y
    };
    // if (this.origins.start == "up") {     p1 = {         x: this.start.x +
    // this.offset.start.x,         y: this.start.y + this.offset.start.y - 10     }
    //     this.offset.start.y = 0; } if (this.origins.start == "right") {     p1 =
    // {         x: this.start.x + this.offset.start.x + 10,         y:
    // this.start.y + this.offset.start.y     }     this.offset.start.x =
    // this.start.width; } if (this.origins.start == "down") {     p1 = {         x:
    // this.start.x + this.offset.start.x,         y: this.start.y +
    // this.offset.start.y + 10     }     this.offset.start.y = this.start.height; }
    // if (this.origins.start == "left") {     p1 = {         x: this.start.x +
    // this.offset.start.x - 10,    y: this.start.y + this.offset.start.y     }
    // this.offset.start.x = 0; } if (this.origins.end == "up") {     p2 = {
    // x: this.end.x + this.offset.end.x,         y: this.end.y + this.offset.end.y
    // - 10     } this.offset.end.y = 0; } if (this.origins.end == "right") {     p2
    // = {  x: this.end.x + this.offset.end.x + 10,         y: this.end.y +
    // this.offset.end.y     }     this.offset.end.x = this.end.width; } if
    // (this.origins.end == "down") {     p2 = {         x: this.end.x +
    // this.offset.end.x,         y: this.end.y + this.offset.end.y + 10     }
    // this.offset.end.y = this.end.height; } if (this.origins.end == "left") { p2 =
    // {         x: this.end.x + this.offset.end.x - 10,         y: this.end.y +
    // this.offset.end.y     }     this.offset.end.x = 0; }
    if (this.origins.start == "up" && this.origins.end == "up") { //上对上
        if (this.start.top < this.end.top) {
            p1 = {
                x: this.start.x + this.offset.start.x,
                y: this.start.y - 30
            }
            p2 = {
                x: this.end.x + this.offset.end.x,
                y: this.start.y - 30
            }
        } else {
            p1 = {
                x: this.start.x + this.offset.start.x,
                y: this.end.y - 30
            }
            p2 = {
                x: this.end.x + this.offset.end.x,
                y: this.end.y - 30
            }
        }
        p3 = {
            x: this.end.x + this.offset.end.x,
            y: this.end.y + this.offset.end.y
        }
        this.setDate([
            [
                p0.x, p0.y
            ],
            [
                p1.x, p1.y
            ],
            [
                p2.x, p2.y
            ],
            [p3.x, p3.y]
        ]);
    }
    if (this.origins.start == "up" && this.origins.end == "right") { //上对右
        if (this.start.top < this.end.top) {
            p1 = {
                x: this.start.x + this.offset.start.x,
                y: this.start.y - 30
            }
            p2 = {
                x: this.end.right + 30,
                y: this.start.y - 30
            }
            p3 = {
                x: this.end.right + 30,
                y: this.end.y + this.offset.end.y
            }
            p4 = {
                x: this.end.right,
                y: this.end.y + this.offset.end.y
            }
        } else {
            p1 = {
                x: this.start.x + this.offset.start.x,
                y: this.end.y - 30
            }
            p2 = {
                x: this.end.right + 30,
                y: this.end.y - 30
            }
            p3 = {
                x: this.end.right + 30,
                y: this.end.y + this.offset.end.y
            }
            p4 = {
                x: this.end.right,
                y: this.end.y + this.offset.end.y
            }
        }
        this.setDate([
            [
                p0.x, p0.y
            ],
            [
                p1.x, p1.y
            ],
            [
                p2.x, p2.y
            ],
            [
                p3.x, p3.y
            ],
            [p4.x, p4.y]
        ]);
    }
    if (this.origins.start == "up" && this.origins.end == "down") { //上对下
        if (this.start.top < this.end.top) {
            p1 = {
                x: this.start.x + this.offset.start.x,
                y: this.start.y - 30
            }
            p2 = {
                x: this.end.right + 30,
                y: this.start.y - 30
            }


        } else {
            p1 = {
                x: this.start.x + this.offset.start.x,
                y: this.end.y - 30
            }
            p2 = {
                x: this.end.right + 30,
                y: this.end.y - 30
            }

        }
        if (this.end.x + this.offset.end.x > this.end.x + this.end.width / 2) { //判断撞击点是否过半
            p3 = {
                x: this.end.right + 30,
                y: this.end.bottom + 30
            }
            p4 = {
                x: this.end.x + this.offset.end.x,
                y: this.end.bottom + 30
            }
        } else {
            if (this.start.top < this.end.top) {
                p2 = {
                    x: this.start.right - (this.start.right - this.end.left) / 2,
                    y: this.start.top - 30
                }
            } else {
                p1 = {
                    x: this.start.x + this.offset.start.x,
                    y: this.start.y - 30
                }
                p2 = {
                    x: this.start.right - (this.start.right - this.end.left) / 2,
                    y: this.start.y - 30
                }
            }

            p3 = {
                x: this.start.right - (this.start.right - this.end.left) / 2,
                y: this.end.bottom + 30
            }
            p4 = {
                x: this.end.x + this.offset.end.x,
                y: this.end.bottom + 30
            }
        }
        p5 = {
            x: this.end.x + this.offset.end.x,
            y: this.end.y + this.offset.end.y
        }
        this.setDate([
            [p0.x, p0.y],
            [p1.x, p1.y],
            [p2.x, p2.y],
            [p3.x, p3.y],
            [p4.x, p4.y],
            [p5.x, p5.y]
        ]);
    }
    if (this.origins.start == "up" && this.origins.end == "left") { //上对左
        if (this.start.top < this.end.y + this.offset.end.y) {
            p1 = {
                x: this.start.x + this.offset.start.x,
                y: this.start.y - 30
            }
            p2 = {
                x: this.start.right - ((this.start.right - this.end.left) / 2),
                y: this.start.y - 30
            }
            p3 = {
                x: this.start.right - ((this.start.right - this.end.left) / 2),
                y: this.end.y + this.offset.end.y
            }
        } else {
            p1 = {
                x: this.start.x + this.offset.start.x,
                y: this.end.y + this.offset.end.y
            }
            p2 = {
                x: this.start.right - ((this.start.right - this.end.left) / 2),
                y: this.end.y + this.offset.end.y
            }
            p3 = {
                x: this.start.right - ((this.start.right - this.end.left) / 2),
                y: this.end.y + this.offset.end.y
            }
        }
        p4 = {
            x: this.end.left,
            y: this.end.y + this.offset.end.y
        }
        this.setDate([
            [p0.x, p0.y],
            [p1.x, p1.y],
            [p2.x, p2.y],
            [p3.x, p3.y],
            [p4.x, p4.y],
        ]);
    }
    if (this.origins.start == "right" && this.origins.end == "up") { //右对上


    }
    // 寻路 var grid = new PF.Grid(_width, _height); console.log(grid, _width,
    // _height) svg.rects.forEach((r) => {     for (var i = 0; i < _width; i++) {
    //   var row = [];         for (var j = 0; j < _height; j++) {             if (i
    // >= r.x - 0 && i <= r.x + r.width + 0 && j >= r.y - 0 && j <= r.y + r.height +
    // 0) {                 grid.setWalkableAt(i, j, false); }             if (i ==
    // p2.x && j == p2.y) { grid.setWalkableAt(i, j, true);             }         }
    //    } }); var finder = new PF.JumpPointFinder({     diagonalMovement:
    // PF.DiagonalMovement.Never }); var path = finder.findPath(~~p1.x, ~~p1.y,
    // ~~p2.x, ~~p2.y, grid); var newPath = PF.Util.smoothenPath(grid, path);
    // newPath.unshift([p0.x, p0.y]); newPath.push([p3.x, p3.y]);
    // this.setDate(newPath);

}
export default Line;