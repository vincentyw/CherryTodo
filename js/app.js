(function(){
    var app = angular.module('todoApp', []);
    // 注册服务
	app.factory('todoService', function($http) {
	   return {
	        getLists: function() {
	        	// 发起AJAX [GET]请求，获取服务端的数据
	            return $http.get('/query.php')
                    .then(function(result) {
                        return result.data;
                    });
	        },

	        removeTodo: function(id) {
	        	// 发起AJAX [POST]请求，删除服务端的数据
	        	// 通常 POST类型的请求用于修改服务器端的数据
	        	// 而GET类型的请求用于向服务器获取数据
	        	return $http.post('/delete.php', 
	        			$.param({id: id}),
	        			{
                			headers : {
                    			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    		}
                		}
	        		)
	        		.then(function(result){
	        			return result.data;
	        		});
	        },

	        completeTodo: function(id) {
	        	return $http.post('/complete.php',
	        		   $.param({id: id}),
	        		   {
	        		   	    headers : {
	        		   	    	'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	        		   	    }
	        		   }
	        		);
	        },

	        startTodo: function(id) {
	        	return $http.post('/start.php',
	        		   $.param({id: id}),
	        		   {
	        		   	    headers : {
	        		   	    	'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	        		   	    }
	        		   }
	        		);
	        },

	        addTodo: function(task, order, status) {
	        	return $http.post('/add.php',
	        		   $.param({todo_task: task, todo_order: order, todo_status: status}),
	 	        		   {
	        		   	    headers : {
	        		   	    	'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	        		   	    }
	        		   }
	        		).then(function(result){
	        			return result.data;
	        		});
	        }
	   }
	});

	app.controller('TodoCtrl', function($scope, todoService){
		this.list = [
			//{task: "翠小作业", order: 0, status: "＃尚未开始"}
		];

		this.newTodo = function(taskId, task, order){
			this.id = taskId;
			this.task = task;
			this.order = order;
			this.status = "未完成";
		},

		this.addTodo = function(task, order) {
			var self = this;
			todoService.addTodo(task, order, '未完成').then(function(resp){
				// 将服务器端返回得任务id存到列表中
				var tmpTodo = new self.newTodo(resp.id, task, order);
				self.list.push(tmpTodo);
				$('#todoInput').val('');
			});
		},

		/**
		 * 删除todo数据
		 * @param order todo任务的序号
		 * @param id todo任务在数据库中的id
		 */
		this.removeTodo = function(order, id){
			this.list.splice(order, 1);

			for (var i=0; i<this.list.length; i++)
			{
				this.list[i].order = i;
			}

			// 请求数据库删除本条todo数据
			todoService.removeTodo(id).then(function(resp){
			});
		},

		this.completeTodo = function(order, id) {
			console.info(this.list);
			console.info(order);
			this.list[order].status = "已完成";

            // 请求数据库更新本条todo数据
            todoService.completeTodo(id).then(function(resp){});
		}

		this.startTodo = function(order, id) {
			console.info(this.list);
			console.info(order);
			this.list[order].status = "已开始";

            // 请求数据库更新本条todo数据
            todoService.startTodo(id).then(function(resp){});
		}

		// 调用获取任务列表的服务
		todoService.getLists().then(function(lists) {
			// 将输入插入到页面中
			for (var i = lists.length - 1; i >= 0; i--) {
				lists[i]['task'] = lists[i]["todo_task"];
				lists[i]['order'] = lists[i]["todo_order"];
				lists[i]['status'] = lists[i]["todo_status"];
			};

			// 添加列表
	        $scope.todos.list = lists;
	    });
	})

})();