var $ = function(selector) {
    return document.querySelector(selector);
};

var Settings = function () {
    var $randomsNumber = $('#rn'),
        $precision = $('#precision'),
        $steps = $('#steps');

    this.getRandomsNumber = function() {
        return Math.abs(parseInt($randomsNumber.value));
    };

    this.getPrecision = function() {
        return Math.abs(parseInt($precision.value));
    };

    this.getStepSize = function() {
        return 1 / Math.abs(parseInt($steps.value));
    };
};

var Statistics = function () {
    var self = this,
        $avg = $('#avg'),
        $dsp = $('#dsp'),
        $min = $('#min'),
        $max = $('#max'),
        map = {vonNeumannMethod: {}, mathRandom: {}, mersenneTwister: {}};

    var methods = document.querySelectorAll('input[name=method]');
    for (var m in methods) {
        methods[m].onchange = function () {
            self.show(self.getMethod());
        }
    }

    this.update = function(method, sum, squaresSum, randomsNumber, min, max) {
        var avg = sum / randomsNumber,
            dsp = squaresSum / randomsNumber - avg * avg;

        map[method].avg = avg;
        map[method].dsp = dsp;
        map[method].min = min;
        map[method].max = max;
    };

    this.show = function(method) {
        $avg.innerHTML = map[method].avg.toPrecision(4);
        $dsp.innerHTML = map[method].dsp.toPrecision(4);
        $min.innerHTML = map[method].min;
        $max.innerHTML = map[method].max;
    };

    this.getMethod = function() {
        return $('input[name=method]:checked').value;
    };
};

var PseudoRandomNumberGenerator = function () {
    var vonNeumannSeed = 0,
        mt = new MersenneTwister();

    this.resetVonNeumannSeed = function() {
        vonNeumannSeed = 0;
    };

    this.vonNeumannMethod = function() {
        var rnd = 0.123456789,
            res = rnd,
            j = vonNeumannSeed++;

        while (j-- > 0) {
            res*=res; res%=1;
            res = parseFloat('0.' + res.toString().slice(3, 9));
            var str = res.toString();
            for (var i = 3; i < 10; i++) {
                if (str[i] == '0') {
                    res += rnd;
                    break;
                }
            }
        }

        return res;
    };

    this.mathRandom = function() {
        return Math.random();
    };

    this.mersenneTwister = function() {
        return mt.real();
    };
};

var Chart = function() {
    var $chart = $('#chart'),
        settings = new Settings(),
        statistics = new Statistics(),
        random = new PseudoRandomNumberGenerator();

    var getIntervals = function() {
        var intervals = [],
            step = settings.getStepSize(),
            precision = settings.getPrecision();

        for (var i = 0; i + step < 1 && Math.abs(1 - i+step) > Math.pow(0.1, precision); i += step) {
            intervals.push({from: i, to: i + step});
        }

        intervals[intervals.length - 1].to = 1;

        return intervals;
    };

    var getCategories = function() {
        var categories = [],
            intervals = getIntervals(),
            precision = settings.getPrecision();

        for (var i = 0; i < intervals.length; i++) {
            categories.push(intervals[i].from.toPrecision(precision) + ' - ' +
                intervals[i].to.toPrecision(precision));
        }

        return categories;
    };

    var getSeries = function(method) {
        var randomsNumber = settings.getRandomsNumber(),
            sum = 0, squaresSum = 0, min = randomsNumber, max = 0,
            intervals = getIntervals(),
            result = [];

        for (var i = 0; i < intervals.length; i++) {
            result.push({y: 0});
        }

        for (i = 0; i < randomsNumber; i++) {
            var val = random[method].call(random);

            sum += val;
            squaresSum += val * val;

            for (var j = 0; j < intervals.length; j++) {
                if (intervals[j].from <= val && val < intervals[j].to) {
                    result[j].y++;
                }
            }
        }

        for (i = 0; i < result.length; i++) {
            if (result[i].y > max) {
                max = result[i].y;
            }

            if (result[i].y < min) {
                min = result[i].y;
            }
        }

        random.resetVonNeumannSeed();
        statistics.update(method, sum, squaresSum, randomsNumber, min, max);
        statistics.show(statistics.getMethod());
        console.log(statistics.getMethod());

        return result;
    };

    this.redraw = function() {
        $chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart',
                type: 'column'
            },
            title: {
                text: 'Simulation of random numbers',
                x: -20
            },
            subtitle: {
                text: 'Methods of research and modeling information processes',
                x: -20
            },
            xAxis: {
                title: {
                    text: 'Random number interval'
                },
                categories: getCategories()
            },
            yAxis: {
                title: {
                    text: 'Random numbers in the interval'
                },
                tickInterval: 1,
                min: 0
            },
            tooltip: {
                formatter: function () {
                    return this.series.name + ': <b>' + this.point.y + '</b><br/>';
                }
            },
            series: [
                {name: 'von Neumann method', data: getSeries('vonNeumannMethod')},
                {name: 'Math.random', data: getSeries('mathRandom')},
                {name: 'Mersenne twister', data: getSeries('mersenneTwister')}
            ]
        });
    };

    this.redraw();
};

document.addEventListener( 'DOMContentLoaded', function () {
    var chart = new Chart();

    $('#redraw').onclick = function () {
        chart.redraw();
    }
}, false);
