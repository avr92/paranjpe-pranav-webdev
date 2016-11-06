/**
 * Created by paran on 11/6/2016.
 */

(function () {
    angular
        .module("jga-directives",[])
        .directive("sortable",sortable);

    function sortable(){
        function linker(scope,element,attributes){
            var start=-1;
            var end=-1;
            element
                .sortable({
                    start:function(event,ui){
                        start=$(ui.item).index();
                    },
                    stop:function(event,ui){
                        end=$(ui.item).index();
                        scope.sortableController.sort(start,end)
                    }
                });
        }
        return {
            scope:{},
            link:linker,
            controller:sortableController,
            controllerAs:'sortableController'
        }
        console.log("nothing to do here");
    }

    function sortableController(WidgetService,$routeParams){
        var vm=this;
        vm.page_Id=$routeParams.pid;
        var a=vm.page_Id
        vm.sort=sort;
        function sort(start,end,a){
            WidgetService.sort(start,end);
            console.log([start,end]);
        }
    }
})();