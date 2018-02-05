//Rect类
import * as d3 from "d3";
import Line from "../assets/Line";
var _width = 0;
var _height = 0;

function getOrigin(x, y, W, H) {
    var k = (H / W);
    // console.log(k)
    if ((k * x) >= y && (H - k * x) >= y) { //这是判断从上方进入,这边简化处理不对等于情况做特别处理
        return "up";
    }
    if ((k * x) < y && (H - k * x) < y) {
        return "down";
    }
    if ((k * x) < y && (H - k * x) > y) {
        return "left";
    }
    if ((k * x) > y && (H - k * x) < y) {
        return "right";
    }
}

function Rect(width, height, g_lines, x, y, w, h) {
    this.g_lines = g_lines;
    this.x = x || width / 2;
    this.y = y || height / 2;
    this.width = w || 200;
    this.height = h || 300;
    this.center = this.getCenter();
    this.start = {};
    this.end = {};
    this.element = null;
    this.isDrag = false;
    _width = width;
    _height = height;
}
Rect.prototype.getCenter = function() {
    return {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
    }
}
Rect.prototype.getBound = function() {
    this.left = this.x;
    this.right = this.x + this.width;
    this.top = this.y;
    this.bottom = this.y + this.height;
}
Rect.prototype.draw = function(svg) {
    var This = this;
    this.getBound();
    this.g = svg.append("g").attr("transform", "translate(" + this.x + "," + this.y + ")")
        .on("mouseenter", function() {
            This.drag.style("opacity", 0.6);
            var x = d3.event.x - This.x;
            var y = d3.event.y - This.y;
            var W = This.width;
            var H = This.height;
            var origin = getOrigin(x, y, W, H);
            // console.log(origin)
        })
        .on("mousedown", function() {
            This.mousedown = true;
        })
        .on("mouseleave", function() {
            This.drag.style("opacity", 0);
            var x = d3.event.x - This.x;
            var y = d3.event.y - This.y;
            var W = This.width;
            var H = This.height;
            if (svg.mousedown) {
                var origin = getOrigin(x, y, W, H);
                This.start.origin = origin;
            }
            // console.log(origin)
        });
    this.element = this.g.append("rect").attr("width", this.width).attr("height", this.height).style("fill", "#ccc").style("stroke", "none");
    // this.element._groups[0][0].rect = this;
    this.element._groups[0][0].g = this.g;
    this.element._groups[0][0].g.rect = this;
    this.element.mousedown = false;
    this.element
        .on("mousedown", function() {
            this.mousedown = true;
            svg.startRect = this;
            svg.mousedown = true;
        })
        .on("mouseout", function() {
            if (svg.mousedown) {
                //拖出矩形时
                var x = d3.event.x;
                var y = d3.event.y;
                if (x < This.x) x = This.x;
                if (x > This.x + This.width) x = This.x + This.width;
                if (y < This.y) y = This.y;
                if (y > This.y + This.height) y = This.y + This.height;
                This.start.x = x;
                This.start.y = y;
                This.start.offset = {
                    x: x - This.x,
                    y: y - This.y
                }
            }
        })
        .on("mouseenter", function() {
            if (svg.mousedown) {
                //拖拽碰撞后
                svg.endRect = this;
                svg.mousedown = false;
                var x = d3.event.x;
                var y = d3.event.y;
                // if(this.origin=="up"){
                //     y= This.y;
                // }
                // if(this.origin=="right"){
                //     x=This.x+This.width;
                // }
                // if(this.origin=="bottom"){
                //     y=This.y+This.height;
                // }
                // if(this.origin=="left"){
                //     x=This.x;
                // }
                This.end.x = x;
                This.end.y = y;
                This.end.offset = {
                    x: x - This.x,
                    y: y - This.y
                }
                var origin = getOrigin(x - this.g.rect.x, y - this.g.rect.y, this.g.rect.width, this.g.rect.height);
                This.end.origin = origin;
                var offset = {
                    start: {
                        x: svg.startRect.g.rect.start.offset.x,
                        y: svg.startRect.g.rect.start.offset.y
                    },
                    end: {
                        x: svg.endRect.g.rect.end.offset.x,
                        y: svg.endRect.g.rect.end.offset.y
                    }
                }
                var origins = {
                    start: svg.startRect.g.rect.start.origin,
                    end: svg.endRect.g.rect.end.origin
                }
                var line = new Line(svg.startRect.g.rect, svg.endRect.g.rect, origins, offset, svg, _width, _height); //这两串就是r1,r2`
                line.draw(This.g_lines);
                svg.lines.push(line)
            }
        })
    this.g._groups[0][0].rect = this;
    this.drag = this.g.append("rect").attr("x", 0).attr("y", 0).attr("width", this.width / 2).attr("height", this.width / 2).attr("transform", "translate(" + this.width / 4 + "," + this.height / 4 + ")").style("opacity", "0");
    this.drag.on("mousedown", () => {
        this.isDrag = true;
    })
}
export default Rect;