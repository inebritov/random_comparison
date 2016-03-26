$(document).ready(function() {
    var $chart = $('#container'),
        $N = $('#N'),
        $precision = $('#precision'),
        $steps = $('#steps'),
        $avg = $('#avg'),
        $vrn = $('#vrn'),
        $min = $('#min'),
        $max = $('#max'),
        iteration = 0,
        mt = new MersenneTwister(),

        getMethod = function() {
            return $('input[name=method]:checked').attr('id');
        },

        getN = function() {
            return Math.abs(parseInt($N.val()));
        },

        getPrecision = function() {
            return Math.abs(parseInt($precision.val()));
        },

        getStepSize = function() {
            return 1 / Math.abs(parseInt($steps.val()));
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
                j = iteration++;

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
                avg = 0, vrn = 0, min = n, max = 0,
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
                vrn += val*val;

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
            vrn = vrn/n - avg*avg;
            iteration = 0;

            $avg.html(avg.toPrecision(4));
            $vrn.html(vrn.toPrecision(4));
            $min.html(min);
            $max.html(max);

            return [{
                showInLegend: false,
                data: result
            }];
        },

        redraw = function() {
            $chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
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
    $('body').on('change', '.option', redraw);
});
