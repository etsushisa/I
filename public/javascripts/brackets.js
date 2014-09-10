(function () {
    'use strict';

    // customize animate
    // SVG.Anime = SVG.invent({
    //     create: 'animate',
    //     inherit: SVG.Element,
    //     construct: {
    //         addAnimate: function() {
    //             return this.put(new SVG.Anime());
    //         }
    //     }
    // });

    // colors
    var colorWhite = '#ffffff';
    var colorBlack = '#000000';
    var color1 = '#2D2E30';
    var color2 = '#3F4244';
    var color3 = '#5D5F60';
    var color4 = '#F8F8F8';

    // sizes
    var width = 900, height = 600;
    var header = 20, footer = header;
    var fileBarW = 150, fileBarH = 440;
    var toolBarW = header, toolBarH = height - header - footer;
    var editorW = (width - fileBarW - toolBarW) / 2;
    var editorH = height - header - footer;
    var previewW = editorW, previewH = editorH;

    var scrollStart = 2000, scrollPos = scrollStart;

    var font = {family: 'Source Code Pro', size: 13, leading: '1.6em'};

    var draw = SVG('brackets').size(width, height);
    var box = draw.viewbox(0, 0, width, height);

    // animation switch
    var enableAnime = true;

    drawBrackets();
    drawCode();
    drawRadar();

    function drawBrackets() {
        // mask
        var show = box.rect(width, height).x(0).y(0).fill(colorWhite);
        var hide = box.rect(previewW, previewH).x(fileBarW + editorW).y(header).fill(colorBlack);
        var mask = box.mask().add(show).add(hide);
        // bg
        box.rect(width, height).x(0).y(0).radius(5, 5).fill(color1).maskWith(mask);

        // editor
        box.rect(editorW, editorH).x(fileBarW).y(header).fill(color4);

        // file bar
        box.rect(fileBarW, fileBarH).x(0).y(height - footer - fileBarH).fill(color2);
        // tool bar
        box.rect(toolBarW, toolBarH).x(width - toolBarW).y(header).fill(color2);

        // working files
        box.rect().x(0).y();
        box.text('Working Files').font(font).fill(color3).x(10).y(20);
        box.text(function(add) {
            ['index.html', 'style.less', 'app.coffee'].forEach(function(item) {
                add.tspan(item).newLine();
            });
        }).font(font).fill(color4).x(40).y(50);

        // folder
        box.text('my-app').font(font).fill(color3).x(10).y(150);
        // files
        box.text(function(add) {
            ['.gitignore', 'app.coffee', 'Gruntfile.coffee', 'node_modules', 'package.json', 'public', 'README.md'].forEach(function(item) {
                add.tspan(item).newLine();
            });
        }).font(font).fill(color4).x(20).y(180);

        // controls
        var controlG = box.group();
        controlG.circle(10).cx(header).cy(header / 2).fill('#e74c3c');
        controlG.circle(10).cx(header + 20).cy(header / 2).fill('#f1c40f');
        controlG.circle(10).cx(header + 40).cy(header / 2).fill('#2ecc71');
    }

    function drawCode() {
        var colorDefault = color2;
        var colorComment = color3;
        var colorKeyword = '#e67e22';
        var colorVar = '#3498db';
        var colorString = '#27ae60';

        // line number
        // box.text(function(add) {
        //     for (var i = 1; i < 16; i++) {
        //         add.tspan(i).newLine();
        //     }            
        // }).font(font).fill(colorDefault).x(fileBarW + 30).y(header + 20).attr('text-anchor', 'end');

        // cursor
        // var cursorG = box.group();
        // var animate = cursorG.addAnimate().attr({
        //     'xlink:href': "#SvgjsRect1050",
        //     attributeType: "XML", 
        //     attributeName: "visibility", 
        //     dur: "1.5s", 
        //     repeatCount:"indefinite", 
        //     values:"hidden; visible;"
        // });
        // var cursor = cursorG.rect(1, 18).x(fileBarW + 50).y(header + 102).fill(colorDefault);
       // cursor.transform({cx: 0, cy: 0}).attr('data-' + (scrollPos - 1), 'transform:translate(0px, 0px)').attr('data-' + (scrollPos), 'transform:translate(' + 8 + 'px, 0px)');

        // code
        var code = [
            {text: '###', fill: colorComment, newline: true, anim: false},
            {text: '# hao-zuo.github.io', fill: colorComment, newline: true, anim: false},
            {text: '###', fill: colorComment, newline: true, anim: false},
            {text: ' ', newline: true, anim: true},

            {text: 'Hacker = ', newline: true, anim: true},
            {text: 'require ', fill: colorKeyword, newline: false, anim: true},
            {text: '"Hacker"', fill: colorString, newline: false, anim: true},
            {text: ' ', newline: true, anim: true},
            {text: 'me ', fill: colorVar, newline: true, anim: true},
            {text: '= ', newline: false, anim: true},
            {text: 'new ', fill: colorKeyword, newline: false, anim: true},
            {text: 'Hacker()', newline: false, anim: true},
            {text: ' ', fill: '', newline: true, anim: true},
            {text: 'if ', fill: colorKeyword, newline: true, anim: true},
            {text: 'me', fill: colorVar, newline: false, anim: true},
            {text: '.isAwake()', newline: false, anim: true},
            {text: ' # I am awake', fill: colorComment, newline: false, anim: true},            
            {text: 'me', fill: colorVar, newline: true, indent: 1, anim: true},
            {text: '.doStudying()', newline: false, anim: true},
            {text: 'me', fill: colorVar, newline: true, indent: 1, anim: true},
            {text: '.doCoding()', newline: false, anim: true},
            {text: 'me', fill: colorVar, newline: true, indent: 1, anim: true},
            {text: '.doSomethingElse()', newline: false, anim: true},
            {text: 'return', fill: colorKeyword, newline: true, indent: 1, anim: true},
            {text: ' ', newline: true, anim: true},
            {text: 'me', fill: colorVar, newline: true, anim: true},
            {text: '.showStatus()', newline: false, anim: true},
            {text: ' ', newline: true, anim: true}
        ];

        // line number
        var lines = [];
        var cnt = 0;
        box.text(function(add) {
            // var char_cnt = 0, y = -21;
            code.forEach(function(item) {
                if (item.newline) {
                    if (item.anim) {
                        lines.push({number: ++cnt, pos: scrollPos});
                    } else {
                        lines.push({number: ++cnt});
                    }
                }

                scrollPos += 50;
                var span;
                if (item.text.length > 0 && item.anim) {
                    // if (item.newline) {
                    //     y += 21;
                    //     if (item.indent) char_cnt = 4;
                    // }
                    span = add.tspan(function(more) {
                        for (var i = 0; i < item.text.length; i++) {
                            var s = more.tspan(item.text.charAt(i));
                            if (enableAnime) {
                                s.data(scrollPos, 'visibility:hidden').data(scrollPos += 30, 'visibility:visible');
                            }
                            // cursor.data(scrollPos - 1, 'transform:translate(' + (char_cnt * 8) + 'px, ' + y + 'px)').data(scrollPos, 'transform:translate(' + ((char_cnt + 1) * 8) + 'px, ' + y + 'px)');
                           // char_cnt++;
                        }

                    });
                } else {
                    span = add.tspan(item.text);
                }
                if (item.fill) span.fill(item.fill);
                if (item.indent) span.dx(item.indent * 30);
                if (item.newline) span.newLine();
            });
        }).font(font).fill(colorDefault).x(fileBarW + 50).y(header + 20);

        // line number
        box.text(function(add) {
            lines.forEach(function(item) {
                var number = add.tspan(item.number).newLine();
                if (enableAnime && item.pos) {
                    number.data(item.pos, 'visibility:hidden')
                        .data(item.pos + 1, 'visibility:visible');
                }
            });
        }).font(font).fill(colorDefault).x(fileBarW + 30).y(header + 20).attr('text-anchor', 'end');
    }

    function drawRadar() {
        var radarCX = fileBarW + editorW + previewW / 2, radarCY = height / 2;
        var minR = 30;
        var status = [
            {text: 'Web Back End', value: 135},
            {text: 'Android App', value: 75},
            {text: 'PC Application', value: 45},
            {text: 'Web Front End', value: 135},
            {text: 'iPhone App', value: 75}
        ];

        var radarG = box.group();

        var points;
        for (var i = 1; i <= 5; i++) {
            var r = minR * i;
            points = [
                [radarCX, radarCY - r],
                [radarCX + r * Math.sin(Math.PI * 72 / 180), radarCY - r * Math.sin(Math.PI * 18 / 180)],
                [radarCX + r * Math.sin(Math.PI * 36 / 180), radarCY + r * Math.sin(Math.PI * 54 / 180)],
                [radarCX - r * Math.sin(Math.PI * 36 / 180), radarCY + r * Math.sin(Math.PI * 54 / 180)],
                [radarCX - r * Math.sin(Math.PI * 72 / 180), radarCY - r * Math.sin(Math.PI * 18 / 180)],
            ];
                
            radarG.polygon(points).fill('none').stroke(color3);
        }
        
        for (var j = 0; j < status.length; j++) {
            radarG.line(radarCX, radarCY, points[j][0], points[j][1]).stroke(color3);            
        }

        if (enableAnime){
            radarG.opacity(0).data(scrollPos += 100, 'opacity:0').data(scrollPos += 500, 'opacity:1');
        }
        
        var valuesG = box.group();
        var values = valuesG.polygon([
            [radarCX, radarCY - status[0].value],
            [radarCX + status[1].value * Math.sin(Math.PI * 72 / 180), radarCY - status[1].value * Math.sin(Math.PI * 18 / 180)],
            [radarCX + status[2].value * Math.sin(Math.PI * 36 / 180), radarCY + status[2].value * Math.sin(Math.PI * 54 / 180)],
            [radarCX - status[3].value * Math.sin(Math.PI * 36 / 180), radarCY + status[3].value * Math.sin(Math.PI * 54 / 180)],
            [radarCX - status[4].value * Math.sin(Math.PI * 72 / 180), radarCY - status[4].value * Math.sin(Math.PI * 18 / 180)],
        ]).stroke(color4).opacity(0.5);
        if (enableAnime) {
            values
                .attr('transform', 'matrix(0, 0, 0, 0, ' + radarCX + ', ' + radarCY + ')')
                .data(scrollPos += 100, 'transform:matrix(0, 0, 0, 0, ' + radarCX + ', ' + radarCY + ')')
                .data(scrollPos += 500, 'transform:matrix(1, 0, 0, 1, 0, 0)');
        }
        radarG.add(valuesG);

        var textG = box.group().fill(color4).attr('font-size', 13).attr('text-anchor', 'middle');
        for (var k = 0; k < status.length; k++) {
            textG.text(status[k].text)
                .x(points[k][0]).y(points[k][1] - 10)
                .attr('opacity', 0)
                .data(scrollPos, 'opacity:0')
                .data(scrollPos + 100, 'opacity:1');
        }
        radarG.add(textG);
    }
}());
