(function () {
    'use strict';

    var color = '#ecf0f1';
    var bgColor = '#8e44ad';
    var width = 300, height = 300;
    var r = 100;
    var center = {x: width / 2, y: height / 2};

    var scrollStart = 20000, scrollPos = scrollStart + 200;

    var draw = SVG('pie');
    var box = draw.viewbox(0, 0, width, height);
    var textG = box.group().attr('font-size', 14);

    var enableAnime = true;

    var techs = [
        {label: 'JavaScript', arc: 260, color: '#f39c12'},
        {label: 'LESS', arc: 70, color: '#3498db'},
        {label: 'CoffeeScript', arc: 30, color: '#e74c3c'}
    ];
    var arc = 0;
    var points = [];
    for (var i = 0; i < techs.length; i++) {
        arc += techs[i].arc;
        points.push({
            x: center.x + r * Math.sin(Math.PI * arc / 180),
            y: center.y - r * Math.cos(Math.PI * arc / 180)
        });
    }

    for (var j = 0; j < techs.length; j++) {
        var point1 = points[j - 1 < 0? techs.length - 1 : j - 1];
        var point2 = points[j];

        var sweep = ' 0 0 1 ';
        if (techs[j].arc > 180) {
            sweep = ' 0 1 1 ';
        }
        box.path(' M ' + center.x + ' ' + center.y + ' L ' + point1.x + ' ' + point1.y + ' A ' + r + ' ' + r + sweep + point2.x + ' ' + point2.y + ' L ' + center.x + ' ' + center.y).stroke({color: color, width: 3}).fill(techs[j].color).attr('stroke-linejoin', 'miter');
    }

    if (enableAnime) {
        var clipR = box.rect(width / 2, height).x(width / 2).y(0).data(scrollPos, 'transform:rotate(0deg); transform-origin:' + center.x + ' ' + center.y).data(scrollPos += 200, 'transform:rotate(180deg); transform-origin:' + center.x + ' ' + center.y);
        var clipL = box.rect(width / 2, height).x(0).y(0).data(scrollPos, 'transform:rotate(0deg); transform-origin:' + center.x + ' ' + center.y).data(scrollPos += 200, 'transform:rotate(180deg); transform-origin:' + center.x + ' ' + center.y);
        var rectL = box.rect(width / 2, height).x(0).y(0).fill(bgColor).clipWith(clipL);
        var rectR = box.rect(width / 2, height).x(width / 2).y(0).fill(bgColor).clipWith(clipR);
    }

    arc = 0;
    var cArc = 0;
    for (var k = 0; k < techs.length; k++) {
        cArc = arc + techs[k].arc / 2;
        var cX = center.x + r * Math.sin(Math.PI * cArc / 180);
        var cY = center.y - r * Math.cos(Math.PI * cArc / 180);
        var text = textG.text(techs[k].label).fill(techs[k].color);

        if (cArc > 180) {
            text.attr('text-anchor', 'end');
            if (cArc > 315) {
                text.x(cX - 10).y(cY - 14);
            } else if (cArc > 220) {
                text.x(cX - 10).y(cY);
            } else {
                text.x(cX - 10).y(cY);
            }
        } else {
            text.x(cX).y(cY);
        }
        if (enableAnime) {
            text.attr('opacity', 0)
                .data(scrollPos, 'opacity:0')
                .data(scrollPos + 100, 'opacity:1');
        }
        arc += techs[k].arc;
    }
}());
