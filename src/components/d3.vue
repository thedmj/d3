<template>
<div class="d3-test">
    <div id="container1" class="container">
    </div>
    <div id="container2" class="container"></div>
    <div id="container3" class="container"></div>
    <div id="container4" class="container">
        <h2>可以拖拽</h2>
    </div>
    <div id="container5"></div>
</div>
</template>

<script>
import * as d3 from "d3";
export default {
    name: 'name',
    data: function() {
        return {
            data: [30, 30, 10, 10, 60, 50]
        }
    },
    methods: {
        angle(d) {
            var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
            return a > 90 ? a - 180 : a;
        }
    },
    mounted() {
        var svg = d3.select("#container1").append("svg:svg").attr("width", 500).attr("height", 250);
        var g = svg.append("g").attr("transform", "translate(50,30)");
        var scale_x = d3.scaleLinear().domain([0, this.data.length - 1]).range([0, 300]); //线性缩放 domain是输入值 range是输出值
        var scale_y = d3.scaleLinear().domain([0, d3.max(this.data)]).range([200, 0]);
        // // 第一种添加网格方法
        // //竖线
        // var grid_x = svg.selectAll(".grid")
        //     .data(scale_x.ticks(this.data.length)) //生成刻度 参数是几个就生成几个刻度
        //     .enter().append("g")
        //     .attr("transform", "translate(50,30)")
        //     .attr("stroke-width", 0.5)
        //     .attr("stroke","#333");
        // grid_x.append("line")
        //     .attr("x1", (d)=>{return scale_x(d)})
        //     .attr("x2", (d)=>{return scale_x(d)})
        //     .attr("y1", 0)
        //     .attr("y2", 200);
        // //横线
        // var grid_y = svg.selectAll(".grid")
        //     .data(scale_y.ticks(d3.max(this.data)/5)) //生成刻度 参数是几个就生成几个刻度
        //     .enter().append("g")
        //     .attr("transform", "translate(50,30)")
        //     .attr("stroke-width", 0.5)
        //     .attr("stroke","#333");
        // grid_y.append("line")
        //     .attr("y1", (d)=>{console.log(d);return scale_y(d)})
        //     .attr("y2", (d)=>{return scale_y(d)})
        //     .attr("x1", 0)
        //     .attr("x2", 300);
        //第二种添加网格方法
        //定义横轴网格线
        var xInner = d3.axisBottom(scale_x).tickSize(200, 0, 0).ticks(this.data.length)
        //定义纵轴网格线
        var yInner = d3.axisRight(scale_y).tickSize(300, 0, 0).tickFormat("").ticks(d3.max(this.data) / 5);
        //添加网格
        var xBar = svg.append("g")
            .attr("transform", "translate(50,30)")
            .call(xInner)
            .selectAll("text")
            .text("");
        var yBar = svg.append("g")
            .attr("transform", "translate(50,30)")
            .call(yInner);
        //生成线条
        var area = d3.area().x((d, i) => {
            return scale_x(i);
        }).y0(200).y1((d) => {
            return scale_y(d);
        }).curve(d3.curveCardinal);
        //创建渐变色
        var a = d3.rgb(255, 0, 0); //红色
        var b = d3.rgb(255, 0, 0); //绿色
        //生成渐变色对象用来给area填充
        var linearGradient = svg.append("linearGradient")
            .attr("id", "linearColor")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");
        //stop对象
        var stop1 = linearGradient.append("stop")
            .attr("offset", "0%")
            .style("stop-color", a.toString());
        var stop2 = linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-opacity", "0.1")
            .style("stop-color", b.toString());
        //创建剪切层
        var clip = g.append("clipPath").attr("id", "clipPath");
        clip.append("rect").attr("x", 0).attr("y", -60).attr("height", 300).attr("width", 0).transition().duration(3000).attr("width", 300);
        //插入线条
        var path = g.append("path").attr("d", area(this.data)).attr("class", "dataline").attr("stroke", "steelblue").attr("fill", "url(#linearColor)").attr("stroke-width", "2").style("clip-path", "url(#clipPath)");
        //插入坐标轴
        var axisY = g.append("g").call(d3.axisLeft(scale_y).tickSize(0, 0, 0).ticks(this.data.length)).append("text").text("Price($)").attr("fill", "red").attr("transform", "rotate(-90)").attr("text-anchor", "end").attr("dy", "1em").style("font-size", "16"); //新建一个g做轴用
        var axisX = g.append("g").attr("transform", "translate(0,200)").call(d3.axisBottom(scale_x).ticks(this.data.length));
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        var rect_h = 50;
        var rect_padding = 15;
        var svg_width = 500;
        var svg_height = (rect_h + rect_padding) * this.data.length;
        var svg = d3.select("#container2").style("height", svg_height + "px").append("svg");
        svg.attr("width", svg_width).attr("height", svg_height).style("transform", "translate(50px,0)");
        //比例尺
        var scale_width = d3.scaleLinear().domain([0, d3.max(this.data)]).range([0, 500]);
        //画方块
        var bar = svg.selectAll("g").data(this.data).enter().append("g").attr("transform", (d, i) => {
            return "translate(0," + (rect_h + rect_padding) * i + ")";
        });
        var a = bar.append("rect").style("fill", "steelblue").attr("width", 0).transition().delay(function(d, i) {
            return i * 200
        }).duration(1000).attr("width", (d) => {
            return scale_width(d);
        }).attr("height", rect_h).selection();
        //画文字
        bar.append("text").text((d) => {
            return d;
        }).attr("x", 0).transition().delay(function(d, i) {
            return i * 200
        }).duration(1000).attr("x", (d) => {
            return scale_width(d);
        }).attr("y", rect_h / 2).attr("text-anchor", "end");
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        var data = [{
            name: "小妮",
            money: 3000
        }, {
            name: "ryan",
            money: 6000
        }, {
            name: "star",
            money: 9000
        }, {
            name: "song",
            money: 9000
        }, {
            name: "think",
            money: 3000
        }];
        var sum_money = d3.sum(data, function(d) {
            return d.money;
        });
        var sum_delay = 0;
        data.forEach((d, i) => {
            var p = d.money / sum_money;
            d.duration = p * 1000;
            d.delay = sum_delay;
            sum_delay += d.duration;
        });
        var svg_width = 500;
        var svg_height = 500;
        var svg = d3.select("#container3").append("svg").attr("width", 500).attr("height", 500).style("transform", "translate(50px,0)");
        var This = this;
        //画圆的方法
        // var arc = d3.arc().innerRadius(0).outerRadius(100).startAngle(0).endAngle(120*Math.PI/180);
        var arc = d3.arc().innerRadius(50).outerRadius(100).padAngle(0.03);
        var bigArc = d3.arc().innerRadius(50).outerRadius(200);

        //生成区块数据 绑定data 如果想使用对象属性 可以用value方法指定对象里的属性
        var angle_data = d3.pie().value(function(d) {
            return d.money;
        }).sort(null)(data);
        //生成颜色
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        //画
        var arc_g = svg.append("g").attr("transform", "translate(150,150)");
        //画区块
        arc_g.selectAll("path").data(angle_data).enter().append("path").attr("fill", function(d, i) {
                return color(i);
            }).transition().ease(d3.easeLinear).duration(function(d, i) {
                return d.data.duration;
            }).delay((d) => {
                return d.data.delay;
            })
            .attrTween("d", (d) => {
                var i_angle = d3.interpolate({
                    startAngle: d.startAngle,
                    endAngle: d.startAngle
                }, d);
                return function(i) {
                    return arc(i_angle(i));
                }
            });
        //画文字
        arc_g.selectAll("text").data(angle_data).enter().append("text").text(function(d) {
                return d.data.name;
            }).attr("transform", function(d) {
                return "translate(" + bigArc.centroid(d) + ") rotate(" + This.angle(d) + ")"; //arc.centroid可以根据数据计算出每个区块的中心点 arc是上面画圆的实例
            })
            .attr("dy", "0.35em")
            .attr("alignment-baseline", "middle")
            .attr("text-anchor", "middle")
            .attr("opacity", 0)
            .transition()
            .duration(200)
            .delay((d) => {
                return d.data.delay;
            })
            .attr("opacity", 1);


        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        var width = 600;
        var height = 600;
        var svg = d3.select("#container4").append("svg").attr("width", width).attr("height", height);

        //定义力学模型
        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) {
                console.log(d);
                return d.index;
            })) //连线作用力 用id()指定根据links里的值是对应nodes里的哪个属性
            .force("charge", d3.forceManyBody()) //节点间的作用力
            .force("center", d3.forceCenter(width / 2, height / 2)); //重力，布局有一个参考位置，不会跑偏

        //声明颜色
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        //载入数据
        var graph = require("../../static/data2.json");
        //绑定links数据 插入
        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line");

        //绑定nodes数据 插入
        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("r", 50)
            .attr("fill", (d, i) => {
                return color(i);
            })
            .style("opacity", "0.6")
            .call(d3.drag() //给nodes绑定事件
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        //插入文字
        var text = svg.append("g")
            .selectAll("text")
            .data(graph.nodes)
            .enter()
            .append("text")
            .text((d) => {
                return d.id;
            })
            .attr("alignment-baseline", "middle")
            .attr("text-anchor", "middle");

        node.append("title") //给nodes插入标题
            .text(function(d) {
                return d.id;
            });

        //开启模型nodes力学
        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        //开启模型links力学
        simulation.force("link")
            .links(graph.links)
            .distance(() => {
                return 299;
            });

        //更新视图方法 画圆 画线 画文字全在这里
        function ticked() {
            link
                .attr("x1", function(d) {
                    return d.source.x;
                })
                .attr("y1", function(d) {
                    return d.source.y;
                })
                .attr("x2", function(d) {
                    return d.target.x;
                })
                .attr("y2", function(d) {
                    return d.target.y;
                });

            node
                .attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                });
            text.attr("x", (d) => {
                return d.x;
            }).attr("y", (d) => {
                return d.y;
            })
        }

        // 点击方法
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        // 拖拽方法
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        // 按起方法
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }



    },
}
</script>

<style lang="less">
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
