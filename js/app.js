(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })
    
    // Floating label headings for the contact form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });

        $(".skill-name").typed({
                strings: ["Web Developer. ", "Passionate Programmer. ", "User Interface Expert. "],
                typeSpeed: 50,
                loop: true
            });
    });
    function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
    }
    function PickColor(){
        var colors = ['#BA4C63','#1FA4B6', '#1D83C1','#CCB2A3', '#1037B5','#EFC84A','#E27C3E','#334D5C','#E05B49','#45B39C'], 
            index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }
    setInterval(function(){
        $('header').css('background', PickColor());
    }, 4000);

    //Chart
    var chart = AmCharts.makeChart("skills-chart", {
        "theme": "light",
        "type": "serial",
        "startDuration": 2,
        "dataProvider": [{
            "skill": "HTML5",
            "rating": 8,
            "color": "#FF0F00"
        }, {
            "skill": "CSS3",
            "rating": 8,
            "color": "#FF6600"
        }, {
            "skill": "JavaScript",
            "rating": 9,
            "color": "#FF9E01"
        }, {
            "skill": "Jquery",
            "rating": 9,
            "color": "#FCD202"
        }, {
            "skill": "Angular",
            "rating": 8,
            "color": "#F8FF01"
        }, {
            "skill": "BackboneJS",
            "rating": 9,
            "color": "#B0DE09"
        }, {
            "skill": "TypeScript",
            "rating": 8,
            "color": "#04D215"
        }, {
            "skill": "Bootstrap",
            "rating": 9,
            "color": "#0D8ECF"
        }, {
            "skill": "NodeJs",
            "rating": 6.5,
            "color": "#2A0CD0"
        }, {
            "skill": "Ionic",
            "rating": 7,
            "color": "#8A0CCF"
        }, {
            "skill": "Elastic",
            "rating": 7,
            "color": "#CD0D74"
        }, {
            "skill": "LESS/SCSS",
            "rating": 8,
            "color": "#754DEB"
        }, {
            "skill": "Python",
            "rating": 6,
            "color": "#333333"
        }, {
            "skill": "Gulp/Webpack",
            "rating": 8,
            "color": "#DDDDDD"
        }],
        "valueAxes": [{
            "position": "left",
            "axisAlpha": 0,
            "gridAlpha": 0
        }],
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "colorField": "color",
            "fillAlphas": 0.85,
            "lineAlpha": 0.1,
            "type": "column",
            "topRadius": 1,
            "valueField": "rating"
        }],
        "depth3D": 40,
        "angle": 30,
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "skill",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "gridAlpha": 0

        }

    }, 0);
})(jQuery); // End of use strict
