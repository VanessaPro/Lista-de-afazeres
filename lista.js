(function() {
	'use strict';
	var tasker = {
		init: function() {
			this.cacheDom();
			this.bindEvents();
			this.evalTasklist();
		},

		cacheDom: function() {
			this.taskInput = document.getElementById("input-task");
			this.addBtn = document.getElementById("add-task-btn");
			this.tasklist = document.getElementById("tasks");
			this.tasklistChildren = this.tasklist.children;
			this.errorMessage = document.getElementById("error");
		},

		bindEvents: function() {
			this.addBtn.onclick = this.addTask.bind(this);
			this.taskInput.onkeypress = this.enterKey.bind(this);
		},

		evalTasklist: function() {
			var i, chkBox, delBtn;

			// ligando eleventos de clique a elementos
			for (i = 0; i < this.tasklistChildren.length; i += 1) {
				//adicionar evento de clique as caixas de verificação 
				chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
				chkBox.onclick = this.completeTask.bind(this, this.tasklistChildren[i], chkBox);
				//adicionar evento de clique para exluir botão
				delBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
				delBtn.onclick = this.delTask.bind(this, i);
			}
		},

		render: function() {
			var taskLi, taskChkbx, taskVal, taskBtn, taskTrsh;
			// html construir

			taskLi = document.createElement("li");
			taskLi.setAttribute("class", "task");
			//caixa de verificação 

			taskChkbx = document.createElement("input");
			taskChkbx.setAttribute("type", "checkbox");
			//tarefa do usuário

			taskVal = document.createTextNode(this.taskInput.value);
			//botão deletar

			taskBtn = document.createElement("button");
			//ícone do lixo

			taskTrsh = document.createElement("i");
			taskTrsh.setAttribute("class", "fa fa-trash");
			//inserir lixeira ao botão

			taskBtn.appendChild(taskTrsh);

			//anexar elementos ao task
			taskLi.appendChild(taskChkbx);
			taskLi.appendChild(taskVal);
			taskLi.appendChild(taskBtn);

			//adicionar tarefas à lista
			this.tasklist.appendChild(taskLi);

		},

		completeTask: function(i, chkBox) {
			if (chkBox.checked) {
				i.className = "task completed";
			} else {
				this.incompleteTask(i);
			}
		},

		incompleteTask: function(i) {
			i.className = "task";
		},

		enterKey: function(event) {
			if (event.keyCode === 13 || event.which === 13) {
				this.addTask();
			}
		},

		addTask: function() {
			var value = this.taskInput.value;
			this.errorMessage.style.display = "none";

			if (value === "") {
				this.error();
			} else {
				this.render();
				this.taskInput.value = "";
				this.evalTasklist();
			}
		},

		delTask: function(i) {
			this.tasklist.children[i].remove();
			this.evalTasklist();
		},

		error: function() {
			this.errorMessage.style.display = "block";
		}
	};


	tasker.init();
}());