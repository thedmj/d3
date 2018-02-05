<template>
    <div class="d3-test">
        <div id="container1" class="container">
        </div>
    </div>
</template>

<script>
    import * as d3 from "d3";
    // import PF from "pathfinding";
    import Rect from "../assets/Rect";
    var PF = require('pathfinding');
    export default {
        name: 'name',
        data: function() {
            return {}
        },
        methods: {
            angle(d) {
                var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                return a > 90 ? a - 180 : a;
            }
        },
        mounted() {
            var width = document.body.clientWidth;
            var height = document.body.clientHeight;
            //初始化svg
            var svg = d3.select("#container1").append("svg").attr("width", width).attr("height", height);
            var g_lines = svg.append("g");
            svg.lines = [];
            svg.on("mouseup", function() {

            })
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
          
            svg.rects = [];
            var r1 = new Rect(width,height,g_lines,50, 10);
            var r2 = new Rect(width,height,g_lines);
            var r3 = new Rect(width,height,g_lines,160, 360);
            svg.rects.push(r1, r2, r3);
            // console.log(svg.rects)
            // var line1 = new Line(r1, r2);
            // line1.draw(svg);
            r1.draw(svg);
            r2.draw(svg);
            r3.draw(svg);
            // 拖拽函数
            var drag = d3.drag().on("start", rect_start).on("drag", rect_drag).on("end", rect_end);
            r1.g.call(drag);
            r2.g.call(drag);
            r3.g.call(drag);
            function rect_start() {
                this.offsetX = d3.event.x - this.rect.x;
                this.offsetY = d3.event.y - this.rect.y;
            }
            function rect_drag() {
                if (!this.rect.isDrag) return;
                var x = d3.event.x - this.offsetX;
                var y = d3.event.y - this.offsetY;
                d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
                this.rect.x = x;
                this.rect.y = y;
                svg.lines.forEach(function(line) {
                    line.update();
                });
            }
            function rect_end() {
                this.rect.isDrag = false;
                svg.mousedown = false;
                svg.lines.forEach(function(line) {
                    // console.log("line")
                    line.update();
                });
            }
            function render() {}
        },
    }
</script>

<style lang="less">
    html,
    body {
        width: 100%;
        height: 100%;
    }
    #box {
        width: 60px;
        height: 60px;
        background: red;
    }
    .gridline {
        stroke: #000;
    }
    .d3-test {
        .container {
            display: inline-block;
            vertical-align: top;
        }
        #container4 {
            svg {
                text {
                    pointer-events: none;
                }
            }
        }
    }
    .links line {
        stroke: #aaa;
    }
    .nodes circle {
        pointer-events: all; //用all可以使笔画也被探测到 stroke设为none可以隐藏笔画 更改stroke-width可以使被点击区域增大
        stroke: none;
        stroke-width: 40;
    }
</style>
