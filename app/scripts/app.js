$(document).ready(function() {

	$('#newTaskForm').hide();

	var listo = [];

	var Task = function (task) {
		this.task = task;
		this.id = 'new';
	}

	//loads the array back into listo from localStorage. Then adds the tasks on the page.
	var save = function() {
		localStorage.listo = JSON.stringify(listo);
	}

	// var load = function () {									//Refer to Jess' git hub page to get rest of code
	// 	listo = JSON.parse(localStorage.listo);

	// 	for(var i=0; i < listo.length; i++) {
	// 		if(listo[i].id === 'new') {}
	// 	}
	// }

	var addTask = function(task) {
		if(task) {
			task = new Task(task);
			listo.push(task);
			save();

			$('#newItemInput').val('');

			$('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-tight"><i class="glyphicon-arrow-right"></span></li></a>');
		}
	
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'Linear');
	};

	var advanceTask = function(task) {
    var modified = task.innerText.trim()
    for (var i = 0; i < listo.length; i++) {
        if (listo[i].task === modified) {
            if (listo[i].id === 'new') {
                listo[i].id = 'inProgress';
            } else if (listo[i].id === 'inProgress') {
                listo[i].id = 'archived';
            } else {
                listo.splice(i, 1);
            }
            save();
            break;
        }
    }
    task.remove();
	};

	$('#saveNewItem').on('click', function(e) {
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		addTask(task);
	});

	//Opens form
	$('#newListItem').on('click', function() {
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'Linear');
	});

	//Closes form
	$('#cancel').on('click', function() {
		e.preventDefault();
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'Linear');
	});

	$(document).on('click', '#item', function(e) {
		e.preventDefault();
		var task = this;
		advanceTask(task);
		this.id = 'inProgress';
		$('#currentList').append(this.outerHTML);

	});
	
	$(document).on('click', '#inProgress', function (e) {
		e.preventDefault();
		var task = this;
		task.id = "archived";
		var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
		advanceTask(task);
		$('#archivedList').append(changeIcon);
	});

	$(document).on('click', '#archived', function (e) {
	    e.preventDefault();
	    var task = this;
	    advanceTask(task);
	});






});