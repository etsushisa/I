(function() {
    'use strict';

    var color = '#ecf0f1';
    var width = 900, height = 600;
    var d = 40, r = 5;
    var startX = 20, y = 300;
    var startYear = 1984;
    var endYear = 2014;

    var font = {leading: '1em'};

    var scrollStart = 15000, scrollPos = scrollStart;

    var draw = SVG('timeline');//.attr('preserveAspectRatio', 'xMidYMid meet');//.size(width, height);
    var box = draw.viewbox(0, 0, width, height);
    // bk
    // box.rect(width, height).fill('#259b24');
    var textG = box.group().fill(color).attr('font-size', 13).attr('text-anchor', 'middle');

    // animation switch
    var enableAnime = true;

    // drawBK();
    drawTimeline();
    drawEvent();

    function drawTimeline() {
        var dash = 40 + 5 * 2 * Math.PI + 20;
        var lineG = box.group()
                    .fill('none')
                    .stroke({color: color, width: 2});
        if (enableAnime) {
            lineG.attr('stroke-dasharray', dash).attr('stroke-dashoffset', dash);
        }

        var now = startYear;
        var i = 0;
        var path;
        do {
            if (i === 0) {
                path = lineG.path(
                    'M ' + (d + r * 2) * i + ' ' + y + ' ' +
                    'l ' + (d + startX) + ' 0 ' +
                    'a ' + r + ' ' + r + ' 0 1 1 ' + (r * 2) + ' 0 ' +
                    'a ' + r + ' ' + r + ' 0 1 1 -' + (r * 2) + ' 0');
            } else {
                path = lineG.path(
                    'm ' + (startX + (d + r * 2) * i) + ' ' + y + ' ' +
                    'l ' + d + ' 0 ' +
                    'a ' + r + ' ' + r + ' 0 1 1 ' + (r * 2) + ' 0 ' +
                    'a ' + r + ' ' + r + ' 0 1 1 -' + (r * 2) + ' 0');                
            }
            if (enableAnime) {
                path
                    .data(scrollPos, 'stroke-dashoffset:' + dash)
                    .data(scrollPos += 200, 'stroke-dashoffset:0');
            }

            var text = textG.text('' + now).x(startX + d + r + (d + r * 2) * i).y(y + 10);
            if (enableAnime) {
                text.attr('opacity', 0)
                    .data(scrollPos, 'opacity:0')
                    .data(scrollPos += 50, 'opacity:1');
            }

            i++;
            now += 2;
        } while(now <= endYear);

        path = lineG.path(
            'm ' + (startX + (d + r * 2) * i) + ' ' + y + '' +
            'L ' + width + ' ' + y);
        if (enableAnime) {
            path.data(scrollPos, 'stroke-dashoffset:' + dash)
                .data(scrollPos += 200, 'stroke-dashoffset:0');
        }        
    }

    function drawEvent() {
        events = [
            {text: ['First Macintosh', 'on sale'], x: 70, y: y - 130, pos: 260},   // 1984.1.24
            {text: ['Microsoft Windows', 'released'], x: 110, y: y - 70, pos: 490},    // 1985.11.20
            {text: ['The first website', 'goes online'], x: 240, y: y - 100, pos: 1250},  // 1991
            {text: ['PHP be created'], x: 320, y: y - 50, pos: 1600},   // 1994
            {text: ['First version', 'of JAVA', 'is released'], x: 370, y: y - 120, pos: 1800},  // 1996.1.23
            {text: ['Google is', 'founded'], x: 435, y: y - 150, pos: 2050},    // 1998.9.4
            {text: ['Windows XP', 'released'], x: 490, y: y - 60, pos: 2350},   // 2001.8.24
            {text: ['Facebook', 'launches'], x: 570, y: y - 120, pos: 2800},    // 2004.1.4
            {text: ['Twitter', 'launched publicly'], x: 620, y: y - 60, pos: 3000}, // 2006.3
            {text: ['The first', 'iPhone is', 'announced'], x: 650, y: y - 150, pos: 3050},  // 2007.6.29
            {text: ['The first', 'iPad is', 'released'], x: 725, y: y - 130, pos: 3500}, // 2010.4.3
            {text: ['Microsoft', 'launches', 'Windows 8'], x: 780, y: y - 70, pos: 3800},   // 2012.8.1

            {text: ['Born in', 'Tianjin'], x: 70, y: y + 60, pos: 290},  // 1984.3.19
            {text: ['Dragon Ball', 'Original run'], x: 90, y: y + 120, pos: 350},  // 1984.12.3
            // {text: ['1 years old'], x: 95, y: y + 100, pos: 160}, // 1985.3.19
            {text: ['Fall in love', 'with football'], x: 385, y: y + 100, pos: 1850}, // 1996.9
            {text: ['New Millennium'], x: 465, y: y + 60, pos: 2250},  // 2000.1.1
            {text: ['Start', 'programming'], x: 535, y: y + 100, pos: 2550}, // 2002.9
            {text: ['Get my', 'first PC'], x: 555, y: y + 150, pos: 2650}, // 2003.8
            {text: ['Graduate', 'from college'], x: 635, y: y + 60, pos: 3050},   // 2006.5
            {text: ['Move to', 'Japan'], x: 670, y: y + 120, pos: 3300},  // 2008.2
            {text: ['Become a', 'Web Deveploper'], x: 730, y: y + 60, pos: 3550},   // 2010.7.1
            {text: ['Get my first', 'MacBook Pro'], x: 750, y: y + 150, pos: 3600},  // 2011.6
            {text: ['30 years old'], x: 820, y: y + 100, pos: 4050},   // 2014.3.19
        ];

        events.forEach(function(item) {
            var text = textG.text(function(add) {
                item.text.forEach(function(t) {
                    add.tspan(t).newLine();
                });
            }).font(font).x(item.x).y(item.y);
            if (enableAnime) {
                text.attr('opacity', 0).data(scrollStart + item.pos, 'opacity:0').data(scrollStart + item.pos + 50, 'opacity:1');
            }
        });
    }

}());
