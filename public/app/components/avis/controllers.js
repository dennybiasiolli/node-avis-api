'use strict';

var avisCtrl = function($scope, $rootScope, $routeParams, $location, ngTableParams, uiGridConstants, DonatoriRest) {
    $rootScope.titolo = 'Donatori';

    $scope.id = $routeParams.id;
    $scope.searchKey = $routeParams.searchKey;
    $scope.filtri = {};
    //$scope.filtri.StatoDonatore = 'Attivo';
    //$scope.donatori = [];

    $scope.$watch('filtri', function(){
        $scope.aggiornaFiltro($scope.filtri);
    }, true);

    $scope.gridOptions = {
        showGridFooter: true,
        showColumnFooter: true,
        enableFiltering: true,
        columnDefs: [
            { field: 'NumTessera', name: 'Tess.', width: '85' },
            { name: 'Nominativo', cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope"><a ng-href="#/avis/donatore/{{row.entity.id}}">{{row.entity.Cognome}} {{row.entity.Nome}}</a></div>'},
            { field: 'Sesso', name: 'S.', width: '55'},
            { name: 'Nato/a il', width: '100', cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope">{{row.entity.DataNascita | date:\'dd/MM/yyyy\'}}</div>'},
            { field: 'age', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true},
            { name: 'ageMin', field: 'age', aggregationType: uiGridConstants.aggregationTypes.min, displayName: 'Age for min' },
            { name: 'ageMax', field: 'age', aggregationType: uiGridConstants.aggregationTypes.max, displayName: 'Age for max' },
            { name: 'customCellTemplate', field: 'age', footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color: Red;color: White">custom template</div>' },
            { name: 'registered', field: 'registered', cellFilter: 'date', footerCellFilter: 'date', aggregationType: uiGridConstants.aggregationTypes.max }
            /*
            <td data-title="'Tess.'" sorting="'number'" sortable="'NumTessera'">
                <a ng-href="#/avis/donatore/{{d.id}}">{{d.NumTessera}}</a>
            </td>
            <td data-title="'Nominativo'" sortable="'Nominativo'">
                <a ng-href="#/avis/donatore/{{d.id}}">{{d.Cognome}} {{d.Nome}}</a>
            </td>
            <td data-title="'S.'" sortable="'Sesso'">{{d.Sesso}}</td>
            <td data-title="'Nato/a il'" sortable="'DataNascita'">{{d.DataNascita | date:'dd/MM/yyyy'}}</td>
            <td data-title="'Indirizzo'">{{d.Indirizzo}}<br>{{d.Cap}} {{d.Comune}} {{d.Provincia}}<span ng-if="d.Frazione"> (Fraz.{{d.Frazione}})</span></td>
            <td data-title="'Contatti'"><span ng-if="d.Telefono">{{d.Telefono}} </span><span ng-if="d.Cellulare"> Cell. {{d.Cellulare}} </span><span ng-if="d.TelefonoLavoro"> Lav. {{d.TelefonoLavoro}} </span><span ng-if="d.Email"><br> <a ng-href="mailto:{{d.Email}}" target="_blank"><md-icon md-svg-icon="assets/img/icons/1432066501_common_email_envelope_mail.svg"></md-icon></a></span></td>
            <td data-title="'D.Iscr.'" sortable="'DataIscrizione'">{{d.DataIscrizione | date:'dd/MM/yy'}}</td>
            <td data-title="'Stato'">{{d.StatoDonatore}}</td>
            <td data-title="'Ult.Don.'" sortable="'UltimaDonazione'">{{d.UltimaDonazione | date:'dd/MM/yy'}}</td>
            <td data-title="'Ben.'" sortable="'NumBenemerenze'">{{d.NumBenemerenze}}</td>
            <td data-title="'Donazioni'" sortable="'DonazioniPregresse'">{{d.DonazioniPregresse}} + {{d.DonazioniRegistrate}} = {{d.DonazioniPregresse + d.DonazioniRegistrate}}</td>
            <td data-title="'Gr/Rh'" sortable="'GruppoSanguigno'">{{d.GruppoSanguigno}} Rh {{d.Rh}}</td>
            */
        ],
        data: null,
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
        }
    }

    //$scope.currentPage = 0;
    //$scope.pageSize = 20;
    //$scope.numberOfPages=function(){
    //    return Math.ceil($scope.donatori.length/$scope.pageSize);
    //}

    $scope.aggiornaFiltro = function(filtri){
        $scope.currentPage = 0;
        $scope.refreshDonatori(filtri);
    };

    $scope.refreshDonatori = function(filtri){
        DonatoriRest.getDonatori(filtri).
        success(function(data, status, headers, config) {
            if(filtri){
                data = data.filter(function(d){
                    var retVal = d;
                    if(filtri.id){
                        if(d.id != $scope.id)
                            return null;
                    }
                    if(filtri.searchKey){
                        var strNominativo = d.Cognome.toLowerCase() + " " + d.Nome.toLowerCase();
                        if(d.NumTessera != filtri.searchKey && strNominativo.indexOf(filtri.searchKey.toLowerCase()) == -1)
                            return null;
                    }
                    if(filtri.NumTessera){
                        if(d.NumTessera != filtri.NumTessera)
                            return null;
                    }
                    if(filtri.StatoDonatore){
                        if(d.StatoDonatore.toLowerCase() != filtri.StatoDonatore.toLowerCase())
                            return null;
                    }
                    if(filtri.Cognome){
                        if(d.Cognome.toLowerCase().indexOf(filtri.Cognome.toLowerCase()) == -1)
                            return null;
                    }
                    if(filtri.Nome){
                        if(d.Nome.toLowerCase().indexOf(filtri.Nome.toLowerCase()) == -1)
                            return null;
                    }
                    if(filtri.Sesso){
                        if(d.Sesso.toLowerCase() != filtri.Sesso.toLowerCase())
                            return null;
                    }
                    if(filtri.GruppoSanguigno){
                        if(d.GruppoSanguigno.toLowerCase() != filtri.GruppoSanguigno.toLowerCase())
                            return null;
                    }
                    if(filtri.Rh){
                        if(d.Rh.toLowerCase() != filtri.Rh.toLowerCase())
                            return null;
                    }
                    if(filtri.DaDataNascita){
                        var dataNascita = new Date(d.DataNascita);
                        if(dataNascita < filtri.DaDataNascita)
                            return null;
                    }
                    if(filtri.ADataNascita){
                        var dataNascita = new Date(d.DataNascita);
                        if(dataNascita > filtri.ADataNascita)
                            return null;
                    }
                    if(filtri.DaDataIscrizione){
                        var dataIscrizione = new Date(d.DataIscrizione);
                        if(dataIscrizione < filtri.DaDataIscrizione)
                            return null;
                    }
                    if(filtri.ADataIscrizione){
                        var dataIscrizione = new Date(d.DataIscrizione);
                        if(dataIscrizione > filtri.ADataIscrizione)
                            return null;
                    }
                    return retVal;
                });
            }
            //$scope.donatori = data;
            $scope.gridOptions.data = data;
        }).
        error(function(data, status, headers, config) {
            //$scope.donatori = null;
            $scope.gridOptions.data = null;
        });

        //$scope.tableParams = new ngTableParams({
        //    page: 1,            // show first page
        //    count: 5,           // count per page
        //    filtri: filtri      // serve per passare i filtri come parametro dentro la getData, altrimenti non li vede
        //}, {
        //    total: 0,
        //    getData: function ($defer, params) {
        //        DonatoriRest.getDonatori(filtri).
        //        success(function(data, status, headers, config) {
        //            if(filtri){
        //                data = data.filter(function(d){
        //                    var retVal = d;
        //                    if(filtri.id){
        //                        if(d.id != $scope.id)
        //                            return null;
        //                    }
        //                    if(filtri.searchKey){
        //                        var strNominativo = d.Cognome.toLowerCase() + " " + d.Nome.toLowerCase();
        //                        if(d.NumTessera != filtri.searchKey && strNominativo.indexOf(filtri.searchKey.toLowerCase()) == -1)
        //                            return null;
        //                    }
        //                    if(filtri.NumTessera){
        //                        if(d.NumTessera != filtri.NumTessera)
        //                            return null;
        //                    }
        //                    if(filtri.StatoDonatore){
        //                        if(d.StatoDonatore.toLowerCase() != filtri.StatoDonatore.toLowerCase())
        //                            return null;
        //                    }
        //                    if(filtri.Cognome){
        //                        if(d.Cognome.toLowerCase().indexOf(filtri.Cognome.toLowerCase()) == -1)
        //                            return null;
        //                    }
        //                    if(filtri.Nome){
        //                        if(d.Nome.toLowerCase().indexOf(filtri.Nome.toLowerCase()) == -1)
        //                            return null;
        //                    }
        //                    if(filtri.Sesso){
        //                        if(d.Sesso.toLowerCase() != filtri.Sesso.toLowerCase())
        //                            return null;
        //                    }
        //                    if(filtri.GruppoSanguigno){
        //                        if(d.GruppoSanguigno.toLowerCase() != filtri.GruppoSanguigno.toLowerCase())
        //                            return null;
        //                    }
        //                    if(filtri.Rh){
        //                        if(d.Rh.toLowerCase() != filtri.Rh.toLowerCase())
        //                            return null;
        //                    }
        //                    if(filtri.DaDataNascita){
        //                        var dataNascita = new Date(d.DataNascita);
        //                        if(dataNascita < filtri.DaDataNascita)
        //                            return null;
        //                    }
        //                    if(filtri.ADataNascita){
        //                        var dataNascita = new Date(d.DataNascita);
        //                        if(dataNascita > filtri.ADataNascita)
        //                            return null;
        //                    }
        //                    if(filtri.DaDataIscrizione){
        //                        var dataIscrizione = new Date(d.DataIscrizione);
        //                        if(dataIscrizione < filtri.DaDataIscrizione)
        //                            return null;
        //                    }
        //                    if(filtri.ADataIscrizione){
        //                        var dataIscrizione = new Date(d.DataIscrizione);
        //                        if(dataIscrizione > filtri.ADataIscrizione)
        //                            return null;
        //                    }
        //                    return retVal;
        //                });
        //            }
        //            params.total(data.length);
        //            //$scope.donatori = data;
        //            $scope.gridOptions.data = data;
        //            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        //        }).
        //        error(function(data, status, headers, config) {
        //            //$scope.donatori = null;
        //            params.total(0);
        //            $defer.resolve(null);
        //        });
//
        //    }
        //});
    };

    //$scope.editDonatore = function(donatore){
    //    if(donatore){
    //        if(!donatore.id)
    //            $scope.donatori.push(donatore);
    //    }
    //    $location.path('/avis/donatori/');
    //};
};

angular.module('myApp.avis')
    .controller('avisCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'ngTableParams', 'uiGridConstants', 'DonatoriRest', avisCtrl]);
