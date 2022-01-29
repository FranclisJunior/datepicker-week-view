(function () {
    'user strict';

    angular.module('dtp-week-view', [])
        .constant('moment', moment)
        .constant('DEFAULT_NUM_WEEKS', 1)
        .constant('DEFAULT_MAX_DAYS', 7)
        .constant('DEFAULT_MIN_DATE', new Date(2000, 0, 1))
        .constant('DEFAULT_MAX_DATE', new Date(3000, 0, 1))
        .constant('DEFAULT_INVALID_DATES', []);

    angular.module('dtp-week-view')
        .directive('dtpWeekView', dtpWeekView);


    function dtpWeekView() {
        var directive = {
            restrict: 'E',
            template:
            '<div id="week-view">' +
            '    <div class="center">' +
            '        <h4 class="month-year text-capitalize">{{month}} {{year}}</h4>' +
            '    </div>' +
            '    <ul class="center">' +
            '        <a class="btn border-out prev" ng-click="previousDays()">' +
            '            <i class="fa fa-chevron-left"></i>' +
            '        </a>' +
            '        <div class="week-container">' +
            '            <div class="week center" ng-repeat="week in weeks">' +
            '                <li class="center" ng-repeat="date in week.dates" ng-class="{\'active\': date.active}" ng-click="setSelectDay(date)">' +
            '                    <a ng-disabled="{{date.disabled}}" ng-class="{\'isDisabled\': date.disabled}">' +
            '                        <strong class="text-capitalize" ng-if="$parent.$index === 0">{{date.dayName}}</strong>' +
            '                        <br ng-if="$parent.$index === 0">' +
            '                        <span class="badge big">{{date.day}}</span>' +
            '                    </a>' +
            '                </li>' +
            '            </div>' +
            '        </div>' +
            '        <a class="btn border-out next" ng-click="nextDays()">' +
            '            <i class="fa fa-chevron-right"></i>' +
            '        </a>' +
            '    </ul>' +
            '</div>',
            controller: WeekViewController,
            require: '?ngModel',
            link: link,
            scope: {
                numWeeks: '@?',
                startDate: '=?',
                minDate: '=?',
                maxDate: '=?',
                invalidDates: '=?',
                model: '=ngModel'
            }
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            if (!attrs.ngModel) {
                throw 'The directive ng-model is required.';
            }

            scope.setSelectDay = function (date) {
                if (date.disabled) {
                    return false;
                }
                scope.selectedDay = date.value;
                ngModel.$setViewValue(date.value);
                angular.forEach(scope.weeks, function (week) {
                    angular.forEach(week.dates, function (dt) {
                        dt.active = moment(dt.value).isSame(moment(date.value), 'day');
                    })
                });
            };
        }

        function WeekViewController($scope, DEFAULT_NUM_WEEKS, DEFAULT_MAX_DAYS, DEFAULT_MIN_DATE, DEFAULT_MAX_DATE, DEFAULT_INVALID_DATES) {
            $scope.numWeeks = $scope.numWeeks ? $scope.numWeeks : DEFAULT_NUM_WEEKS;
            $scope.maxDays = $scope.numWeeks * DEFAULT_MAX_DAYS;
            $scope.minDate = $scope.minDate ? $scope.minDate : DEFAULT_MIN_DATE;
            $scope.maxDate = $scope.maxDate ? $scope.maxDate : DEFAULT_MAX_DATE;
            $scope.invalidDates = $scope.invalidDates ? $scope.invalidDates : DEFAULT_INVALID_DATES;

            $scope.selectedDay = angular.copy($scope.model);
            $scope.firstDay = $scope.startDate ? $scope.startDate : $scope.selectedDay ? $scope.selectedDay : new Date();
            $scope.lastDay = moment($scope.firstDay).add($scope.maxDays - 1, 'days');

            $scope.$watch('week-view', function () {
                buildDates();
            });

            $scope.nextDays = function () {
                $scope.firstDay = moment($scope.lastDay).add(1, 'days');
                $scope.lastDay = moment($scope.firstDay).add($scope.maxDays - 1, 'days');
                buildDates();
            };

            $scope.previousDays = function () {
                $scope.firstDay = moment($scope.firstDay).subtract($scope.maxDays, 'days');
                $scope.lastDay = moment($scope.firstDay).subtract(1, 'days');
                buildDates();
            };

            function buildDates() {
                $scope.month = moment($scope.firstDay).format('MMMM');
                $scope.year = moment($scope.firstDay).format('YYYY');
                $scope.weeks = [];

                var index = 0;
                var dates = [];
                do {
                    var dateAux = moment($scope.firstDay).add(index, 'days');
                    var date = {
                        dayName: dateAux.format('ddd'),
                        day: dateAux.format('D').length === 1 ? '0' + dateAux.format('D') : dateAux.format('D'),
                        value: dateAux.toDate(),
                        active: $scope.selectedDay && dateAux.isSame(moment($scope.selectedDay), 'day'),
                        disabled: dateAux.isBefore(moment($scope.minDate), 'day') || 
                            dateAux.isAfter(moment($scope.maxDate)) || 
                            $scope.invalidDates.indexOf(dateAux.format("YYYY-MM-DD")) !== -1
                    };
                    dates.push(date);
                    index++;
                    if (index % 7 === 0) {
                        $scope.weeks.push({dates: angular.copy(dates)});
                        dates = [];
                    }
                } while (index < $scope.maxDays);
            }
        }
    }
})();