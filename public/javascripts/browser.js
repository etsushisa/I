(function() {
    'use strict';

    var width = 900, height = 600;
    var headerW = width, headerH = 40;
    var bodyW = width, bodyH = height - headerH;

    var scrollStart = 11500, scrollPos = scrollStart;

    var draw = SVG('browser').size(width, height);
    var box = draw.viewbox(0, 0, width, height);

    // animation switch
    var enableAnime = true;

    drawBrowser();
    drawKeywords();

    function drawBrowser() {
        var clip = box.rect(headerW, headerH + 10).radius(5, 5);
        var header = box.rect(headerW, headerH).x(0).y(0).fill('#fff');
        header.clipWith(clip);

        box.rect(bodyW, bodyH).x(0).y(headerH).fill('none').stroke({color: '#fff', width: 3});
        box.rect(740, 30).x(100).y(5).fill('#000');

        var controlG = box.group();
        controlG.circle(13).cx(20).cy(headerH / 2).fill('#e74c3c');
        controlG.circle(13).cx(40).cy(headerH / 2).fill('#f1c40f');
        controlG.circle(13).cx(60).cy(headerH / 2).fill('#2ecc71');
    }

    function drawKeywords() {
            // color
        var fill = d3.scale.category20();
        // direction
        var scale = d3.scale.linear();
        // direction type count
        var count = 5;
        // size
        var w = width, h = height - headerH;

        // scroll
        var distance = 100;

        var words = [
                // TOP
                {word: 'JAVA', size: 7, sort: 5},
                {word: 'PHP', size: 6, sort: 13},
                {word: 'Android', size: 6, sort: 16},

                // Normal
                {word: 'MySQL', size: 5, sort: 9},
                {word: 'Linux', size: 5, sort: 8},
                {word: 'Git', size: 5, sort: 21},
                {word: 'Objective-C', size: 5, sort: 19},

                {word: 'Web', size: 4, sort: 10},
                {word: 'App', size: 4, sort: 6},
                {word: 'GitHub', size: 4, sort: 21},
                {word: 'Xcode', size: 4, sort: 18},
                {word: 'Laravel', size: 4, sort: 27},
                {word: 'Node.js', size: 4, sort: 23},
                {word: 'JavaScrip', size: 4, sort: 11},
                {word: 'CoffeeScript', size: 4, sort: 25},
                {word: 'Express.js', size: 4, sort: 23},
                {word: 'Sublime Text', size: 4, sort: 25},

                {word: 'Facebook', size: 3, sort: 14},
                {word: 'MVC', size: 3, sort: 15},
                {word: 'Jade', size: 3, sort: 25},
                {word: 'LESS', size: 3, sort: 25},
                {word: 'Mac', size: 3, sort: 19},
                {word: 'iPhone', size: 3, sort: 14},
                {word: 'PhpStorm', size: 3, sort: 27},
                {word: 'Heroku', size: 3, sort: 24},
                {word: 'MongoDB', size: 3, sort: 24},
                {word: 'jQuery', size: 3, sort: 20},
                {word: 'Brackets', size: 3, sort: 26},
                {word: 'Grunt.js', size: 3, sort: 25},
                {word: 'HTML', size: 3, sort: 10},
                {word: 'CSS', size: 3, sort: 10},
                {word: 'Bootstrap', size: 3, sort: 20},
                {word: 'JSON', size: 3, sort: 12},
                {word: 'SQL', size: 3, sort: 4},
                {word: 'C++', size: 3, sort: 2},

                {word: 'Eclipse', size: 3, sort: 5},
                {word: 'Mocha', size: 2, sort: 29},
                {word: 'Chai', size: 2, sort: 29},
                {word: 'SVG', size: 2, sort: 30},
                {word: 'Twitter', size: 2, sort: 14},
                {word: 'Ubuntu', size: 2, sort: 12},
                {word: 'Sails.js', size: 2, sort: 24},
                {word: 'Npm', size: 2, sort: 23},
                {word: 'Ember.js', size: 2, sort: 28},
                {word: 'CodeIgniter', size: 2, sort: 20},
                {word: 'Scala', size: 2, sort: 29},
                {word: 'Swift', size: 2, sort: 31},
                {word: 'BitBucket', size: 2, sort: 22},
                {word: 'Bower', size: 2, sort: 26},
                {word: 'Apache', size: 2, sort: 8},
                {word: 'SQLite', size: 2, sort: 17},
                {word: 'Smarty', size: 2, sort: 18},
                {word: 'Markdown', size: 2, sort: 27},
                {word: 'D3.js', size: 2, sort: 30},
                {word: 'NoSQL', size: 2, sort: 24},

                // +
                {word: 'SVN', size: 1, sort: 15},   
                {word: 'DB', size: 1, sort: 4},   
                {word: 'Oracle', size: 1, sort: 15},      
                {word: 'YAML', size: 1, sort: 18},
                {word: 'C', size: 1, sort: 1},
                {word: 'EJS', size: 1, sort: 24},
                {word: 'Handlebars.js', size: 1, sort: 28},
                {word: 'Angular.js', size: 1, sort: 26},
                {word: 'Yeoman', size: 1, sort: 26},
                {word: 'Photoshop', size: 1, sort: 22},
                {word: 'Visual Studio', size: 1, sort: 7},
                
                // -
                {word: 'Wordpress', size: 1, sort: 20},
                {word: 'XML', size: 1, sort: 11},
                {word: 'Vsiual C++', size: 1, sort: 2},
                {word: 'RSS', size: 1, sort: 17},
                {word: 'CentOS', size: 1, sort: 8},
                {word: 'CakePHP', size: 1, sort: 15},
                {word: 'Windows', size: 1, sort: 0}
        ];

        scale.domain([0, count - 1]).range([-60, 60]);

        d3.layout.cloud()
            // .timeInterval(10)
            .size([w, h])
            .words(words)
            .padding(5)
            .rotate(function() { return scale(~~(Math.random() * count)); })
            .text(function(d) { return d.word;} )
            .font('Impact')
            .fontSize(function(d) { return d.size * 16; })
            .spiral('archimedean')
            .on('word', progress)
            .on('end', paint)
            .start();

        function progress(d) {
        // nothing to do
        }
        function paint(words, bounds) {
            d3.select('#browser').select('svg')
                // .attr('width', w)
                // .attr('height', h)
                // .attr('preserveAspectRatio', 'xMaxYMin meet')
            .append('g')
                .attr('transform', 'translate(' + (w / 2) + ', ' + (h / 2 + headerH + 8) + ')')
            .selectAll('text')
                .data(words)
            .enter().append('text')
                .style('font-size', function(d) { return d.size + 'px'; })
                .style('font-family', 'Impact')
                .style('fill', function(d) {return fill(d.text.toLowerCase()); })
                .attr('text-anchor', 'middle')
                .attr('transform', function(d) {
                    return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
                })
                .attr('opacity', enableAnime?0:1)
            .each(function(d) {
                if (enableAnime) {
                    var me = d3.select(this);
                    me.attr('data-' + (scrollPos + d.sort * 50), 'opacity:0');
                    me.attr('data-' + (scrollPos + d.sort * 50 + distance), 'opacity:0.8');
                }
            })
            .text(function(d) { return d.word; });
        }
    }
}());
