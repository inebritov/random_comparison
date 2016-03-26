$(document).ready(function() {
    var $chart = $('#container');
        $N = $('#N'),
        $precision = $('#precision'),
        $steps = $('#steps'),
        next = 1,
        max = 993989421568648,
        mt = new MersenneTwister(),

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

        generateNeuman = function(iteration) {
            var rnd = 0.123456789,
                res = rnd;

            while (iteration-->0){
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

        generateSelf = function() {
            return mt.real();
        },

        getSeries = function() {
            var n = getN(), neuman = [], random = [], self = [],
                avgN = 0, varN = 0, avgR = 0, varR = 0, avgS = 0, varS = 0,
                intervals = getIntervals();

            for (var i = 0; i < intervals.length; i++) {
                neuman.push({y:0});
                random.push({y:0});
                self.push({y:0});
            }

            for (var i = 0; i < n; i++) {
                var neumanVal = generateNeuman(i);
                var randomVal = generateRandom();
                var selfVal = generateSelf();

                for (var j = 0; j < intervals.length; j++) {
                    if (intervals[j].from <= neumanVal && neumanVal < intervals[j].to) {
                        avgN += neumanVal;
                        varN += neumanVal*neumanVal;
                        neuman[j].y++;
                    }
                    if (intervals[j].from <= randomVal && randomVal < intervals[j].to) {
                        avgR += randomVal;
                        varR += randomVal*randomVal;
                        random[j].y++;
                    }
                    if (intervals[j].from <= selfVal && selfVal < intervals[j].to) {
                        avgS += selfVal;
                        varS += selfVal*selfVal;
                        self[j].y++;
                    }
                }
            }

            varN -= (avgN*avgN/n)/(n-1);
            varR -= (avgN*avgN/n)/(n-1);
            varS -= (avgN*avgN/n)/(n-1);
            avgN /= n; avgR /= n; avgS /= n;

            $('#avg-neuman').html(avgN); $('#var-neuman').html(varN);
            $('#avg-random').html(avgR); $('#var-random').html(varR);
            $('#avg-self').html(avgS); $('#var-self').html(varS);

            return [{
                name: 'Метод фон Неймана',
                color: '#7cb5ec',
                gapSize: getStepSize().toPrecision(getPrecision()),
                data: neuman
            }, {
                name: 'Обычный Random',
                color: '#434348',
                gapSize: getStepSize().toPrecision(getPrecision()),
                data: random
            }, {
                name: 'Вихрь Мерсенна',
                color: '#90ed7d',
                gapSize: getStepSize().toPrecision(getPrecision()),
                data: self
            }];
        },


        redraw = function() {
            $chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
                    defaultSeriesType: 'line'
                },
                title: {
                    text: 'Моделирование случайных величин',
                    x: -20 //center
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
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br />',
                    pointFormat: '{point.y}'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: getSeries()
            });
        };

    redraw();
    $('body').on('change', '.option', redraw);
});
