var $ = function(selector) {
    return document.querySelector(selector);
};

document.addEventListener( 'DOMContentLoaded', function () {
    var $chart = $('#chart'),
        $N = $('#rn'),
        $precision = $('#precision'),
        $steps = $('#steps'),
        $avg = $('#avg'),
        $dsp = $('#dsp'),
        $min = $('#min'),
        $max = $('#max'),
        neumanSeed = 0,
        mt = new MersenneTwister(),

        getMethod = function() {
            return $('input[name=method]:checked').value;
        },

        getN = function() {
            return Math.abs(parseInt($N.value));
        },

        getPrecision = function() {
            return Math.abs(parseInt($precision.value));
        },

        getStepSize = function() {
            return 1 / Math.abs(parseInt($steps.value));
        },

        getIntervals = function() {
            var intervals = [],
                step = getStepSize();

            for (var i = 0; i+step < 1 && Math.abs(1 - i+step) > Math.pow(0.1, getPrecision()); i+=step) {
                intervals.push({from: i, to:i+step});
            }

            intervals[intervals.length-1].to = 1;

            return intervals;
        },

        getCategories = function() {
            var categories = [],
                intervals = getIntervals(),
                precision = getPrecision();

            for (var i = 0; i < intervals.length; i++) {
                categories.push(intervals[i].from.toPrecision(precision) + ' - ' +
                    intervals[i].to.toPrecision(precision));
            }

            return categories;
        },

        generateNeuman = function() {
            var rnd = 0.123456789,
                res = rnd,
                j = neumanSeed++;

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
        },

        generateRandom = function() {
            return Math.random();
        },

        generateMersenne = function() {
            return mt.real();
        },

        getSeries = function() {
            var n = getN(), method = getMethod(), result = [],
                avg = 0, dsp = 0, min = n, max = 0,
                intervals = getIntervals();

            switch (method) {
                case 'neuman': method = generateNeuman; break;
                case 'random': method = generateRandom; break;
                case 'mersenne': method = generateMersenne; break;
            }

            for (var i = 0; i < intervals.length; i++) {
                result.push({y:0});
            }

            for (i = 0; i < n; i++) {
                var val = method.call();
                avg += val;
                dsp += val*val;

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

            avg /= n;
            dsp = dsp/n - avg*avg;
            neumanSeed = 0;

            $avg.innerHTML = avg.toPrecision(4);
            $dsp.innerHTML = dsp.toPrecision(4);
            $min.innerHTML = min;
            $max.innerHTML = max;

            return [{
                showInLegend: false,
                data: result
            }];
        },

        redraw = function() {
            $chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart',
                    defaultSeriesType: 'column'
                },
                title: {
                    text: 'Моделирование случайных величин',
                    x: -20
                },
                subtitle: {
                    text: 'Методы исследования и моделирования информационных процессов',
                    x: -20
                },
                xAxis: {
                    title: {
                        text: 'Случайное число'
                    },
                    categories: getCategories()
                },
                yAxis: {
                    title: {
                        text: 'Количество повторений'
                    },
                    tickInterval: 1,
                    min: 0
                },
                tooltip: {
                    headerFormat: '<b>{point.y}</b>',
                    pointFormat: ''
                },
                series: getSeries()
            });
        };

    redraw();
    var options = document.querySelectorAll('.option');
    for (var o in options) {
        options[o].onchange = options[o].onkeyup = redraw;
    }
}, false );
