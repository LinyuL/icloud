var list= [
	{
		id:1,
		title:"新列表1",
		color:'#6EDC30',
		list:[
			{title:'新事项1',done:false},
			{title:'新事项2',done:false},
			{title:'新事项3',done:false}
		]
	}
];
var colors=['#C970E2','#6EDC30','#41ACF9','#F2CB00','#A0845E','#F72368','#F89500'];
angular.module("icloud",[]).controller("todolist",["$scope","$rootScope",function($scope,$rootScope){
	$scope.colors=['#C970E2','#6EDC30','#41ACF9','#F2CB00','#A0845E','#F72368','#F89500'];
	(function(key){
		var list=null;
		if(localStorage.getItem(key)==null){
			$scope.list=[{id:1,title:'新列表1',color:'#62DA37',list:[]}];
			localStorage.setItem(key,JSON.stringify($scope.list));
		}else{
			$scope.list=JSON.parse(localStorage.getItem(key));
		}
	})('icloud');
	function save(){
		localStorage.setItem('icloud',JSON.stringify($scope.list))
	}
	$scope.bg=true;
	$scope.list=list;
	$rootScope.colorId=$scope.list.length%7;
	function getColor(){
		$rootScope.colorId++;
		if($rootScope.colorId>=7){
			$rootScope.colorId=0;
		}
		return $rootScope.colorId;
	}
	$scope.getInow=function(id){
		angular.forEach($scope.list,function(o,i){
			if(o.id==id){
				$scope.now=o;
				$scope.currentId=id;
				return false;
			}
		})
	}
	$scope.currentId=$scope.list[0].id;  //dangqiande id
	$scope.getInow($scope.currentId);
	$scope.add=function(){
		var o={};
		o.id=$scope.list[$scope.list.length-1].id+1;
		o.title="新列表"+o.id;
		o.color=$scope.colors[getColor()];
		o.list=[];
		$scope.list.push(o);
		
		$scope.currentId=o.id;  //当前id
		$scope.getInow($scope.currentId);save();
	}
	$scope.addlist=function(){
		$scope.now.list.push({title:'',done:false});
		angular.forEach($scope.list,function(o,i){
			if(o.id == $scope.now.id){
				$scope.list[i] = $scope.now;
			}
		})
		save();
	}
	$scope.change=function(a){
		angular.forEach($scope.list,function(o,i){
			if(o.id==$scope.now.id){
				$scope.list[i]=$scope.now;
				save();
			}
		})
	 }
}]).filter('done',function(){
	return function (arr,state){
		var newarr=[];
		angular.forEach(arr,function(o,i){
			if(o.done==state){
				newarr.push(o);
			}
		})
		return newarr;
	}
})