


//app.controller('LayoutController', function ($scope, $http, $timeout) {
//    debugger;

//    $scope.clock = "loading clock..."; // initialise the time variable
//    $scope.tickInterval = 1000 //ms

//    var tick = function () {
//        $scope.clock = Date.now() // get the current time
//        $timeout(tick, $scope.tickInterval); // reset the timer
//    }

//    // Start the timer
//    $timeout(tick, $scope.tickInterval);




//    $scope.CartCount = 0;
   
//    $scope.getWorkStatus = function () {
//        debugger
//        $('#ModalWorkStatus').modal('show');
//    }

   
//});




app.controller('IndexController', function ($scope, $http) {
    debugger;
    $scope.AllEmployeeList = [];

    $scope.AddedDeleteList = [];

    $scope.emailFormat = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    $scope.CheckBoxAllModel = false;
    $scope.CheckBoxModel = false;


    $scope.EmployeeData = {
        Id: 0,
        EmployeeName: '',
        EmployeeEmail: '',
        EmployeeAddress: '',
        EmployeePhone: '',
    };


    $scope.AddEmployeeModalOpen = function () {
        debugger
        $scope.EmployeeData = {
            Id: 0,
            EmployeeName: '',
            EmployeeEmail: '',
            EmployeeAddress: '',
            EmployeePhone: '',
        };
        $scope.Submitted = false;
        $scope.f1.$setPristine();
        $scope.f1.$setUntouched();
        $scope.ButtonMessage = 'Add';
        $('#AddModel').modal('show');
    }


    $scope.Submitted = false;
    $scope.IsFormValid = false;

    $scope.$watch('f1.$valid', function (newVal) {
        debugger;
        $scope.IsFormValid = newVal;
    });

    
   


    $scope.SaveData = function () {
        debugger;
        $scope.Submitted = true;
        if ($scope.IsFormValid) {
            showModal()
            $http({
                url: '/Data/SubmitEmployeeMasterData',
                method: "POST",
                data: { 'ModelData': JSON.stringify($scope.EmployeeData) }
            })
                .then(function (response) {
                    debugger
                    if (response.data == true) {
                        $('#AddModel').modal('hide');
                        $scope.EmployeeData = {
                            Id: 0,
                            EmployeeName: '',
                            EmployeeEmail: '',
                            EmployeeAddress: '',
                            EmployeePhone: '',
                        };
                        $scope.Submitted = false;
                        $scope.f1.$setPristine();
                        $scope.f1.$setUntouched();
                        $scope.GetEmployeeList(1);
                    }
                    else {
                        $('body').loadingModal('hide');
                        $('body').loadingModal('destroy');

                        alertify.error('Something Went Wrong !!');
                    }

                });

        }
        
    }


    
    //======================== Get Employee List ===========================

  
    $scope.GetEmployeeList = function (Pageno) {
        debugger        
        showModal()
        $http({
            method: 'GET',
            url: '/Data/GetEmployeeList?Pageno=' + Pageno,
        }).then(function (response) {
            debugger
            $scope.CheckBoxAllModel = false;
            $scope.CheckBoxModel = false;
            if (response.data.TotalRecords > 0) {
                debugger
                $('body').loadingModal('hide');
                $('body').loadingModal('destroy');
                $scope.AllEmployeeList = response.data.EmployeeList;
                $scope.total_count = response.data.TotalRecords;                
            }
            else {
                $('body').loadingModal('hide');
                $('body').loadingModal('destroy');
                $scope.AllEmployeeList = [];
                alertify.error('No Data Found !!')
            }


        })
    }
    $scope.GetEmployeeList(1);



    //==================== Get Data For Edit Data ==================


    $scope.EditEmployeeData = function (Id) {
        showModal()
        debugger
        $http({
            method: 'GET',
            url: '/Data/EditEmployeeData?Id=' + Id,
        }).then(function (response) {
            debugger
            $('body').loadingModal('hide');
            $('body').loadingModal('destroy');
            $scope.EmployeeData = response.data;
            $scope.ButtonMessage = 'Save';
            $('#AddModel').modal('show');
        })
    }


    //==================== Delete Data ==================


    $scope.DeleteEmployeeData = function (Id) {

        alertify.confirm("Are you sure you want to delete this record ", function () {

            showModal()
            debugger
            $http({
                method: 'GET',
                url: '/Data/DeleteEmployeeData?Id=' + Id,
            }).then(function (response) {
                debugger
                $('body').loadingModal('hide');
                $('body').loadingModal('destroy');
                $scope.GetEmployeeList(1);
            })


        }
            , function () { }).setHeader('Delete Status');
       
    }

    $scope.DeleteMultipleEmployeeData = function () {
        debugger
        if ($scope.AddedDeleteList.length != 0) {
            alertify.confirm("Are you sure you want to delete this all records ", function () {
                showModal()
                $http({
                    method: 'GET',
                    url: '/Data/DeleteMultipleEmployeeData?DeleteList=' + JSON.stringify($scope.AddedDeleteList),
                }).then(function (response) {
                    debugger
                    $scope.AddedDeleteList = [];
                    $scope.GetEmployeeList(1);
                })
            }
                , function () { }).setHeader('Delete Status');

        }
        else {
            alertify.error('Please Select Checkbox For Delete Employees..');
        }
    }


    $scope.GetCheckBoxValue = function (d, d1) {
        if (d == true) {
            debugger
            $scope.AddItemID = {
                Id: '',                
            }
            $scope.AddItemID.Id = d1;           
            $scope.AddedDeleteList.push($scope.AddItemID);
        }
        else {
            var record = $scope.AddedDeleteList.find(function (item) { return item.Id == d1 });
            if (record != undefined) {
                var index = $scope.AddedDeleteList.indexOf(record);
                $scope.AddedDeleteList.splice(index, 1);
            }

        }
    }

    $scope.GetCheckBoxValueForMultiple = function (d) {
        if (d == true) {

            for (var i = 0; i < $scope.AllEmployeeList.length; i++) {
                debugger
                $scope.AddItemID = {
                    Id: '',
                }
                $scope.AddItemID.Id = $scope.AllEmployeeList[i].Id;
                $scope.AddedDeleteList.push($scope.AddItemID);
            }
            $scope.CheckBoxModel = true;
        }
        else {
            for (var i = 0; i < $scope.AllEmployeeList.length; i++) {
                debugger
                var record = $scope.AddedDeleteList.find(function (item) { return item.Id == $scope.AllEmployeeList[i].Id });
                if (record != undefined) {
                    var index = $scope.AddedDeleteList.indexOf(record);
                    $scope.AddedDeleteList.splice(index, 1);
                }
            }
            $scope.CheckBoxModel = false;
        }
    }


});

