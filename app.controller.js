(function () {

    angular.module('sample')
        .controller('AppController', AppController);

    function AppController() {

        var vm = this;

        vm.minDate = new Date();
        vm.selectedDay1 = moment().add(1, 'days').toDate();
        vm.selectedDay2 = moment().add(2, 'days').toDate();
        vm.selectedDay3 = moment().add(3, 'days').toDate();

    }

})();

