const fs = require('fs');

const args = process.argv;

const cwd = args[1].slice(0, -8);


if (fs.existsSync(cwd +'\task.txt') === false) {
	let createStream = fs.createWriteStream('task.txt');
	createStream.end();
}
if (fs.existsSync(cwd +'\completed.txt') === false) {
	let createStream = fs.createWriteStream('completed.txt');
	createStream.end();
}

const InfoFunc = () => {
	const Usage = `Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage`+
    "\n$ ./task report               # Statistics";

	console.log(Usage);
};

const listFunc = () => {

	let data = [];
	const Data = fs.readFileSync(cwd +'/task.txt').toString();

	data = Data.split('\n');
	let filterData = data.filter(function(value) {
		return value !== '';
	});

	for (let i = 0; i < filterData.length; i++) {
		console.log((filterData.length - i) + '. ' +
			filterData[i]);
	}
};

const addFunc = () => {

	const newTask = args[3];
    const sent = args[4]
	if (newTask) {
		let data = [];
        const fileData = fs.readFileSync(cwd +'/task.txt').toString();
		fs.writeFile(cwd + '/task.txt',newTask + '\n' + fileData,

			function(err) {
				if (err) throw err;
				console.log('Added task: "' + sent + '"' + " with priority "+newTask);
			},
		);
	} 
    else { 
        console.log('Error: Missing tasks string. Nothing added!');
      }
};

const deleteFunc = () => {
	const deleteIndex = args[3];

	if (deleteIndex) {
		let data = [];

		const fileData = fs.readFileSync(cwd +'/task.txt').toString();

		data = fileData.split('\n');
		let filterData = data.filter(function(value) {
			return value !== '';
		});
		if (deleteIndex > filterData.length || deleteIndex <= 0) {
			console.log('Error: item with index ' + deleteIndex +' does not exist. Nothing deleted.',
			);

		} else {
			filterData.splice(filterData.length - deleteIndex, 1);
			const newData = filterData.join('\n');
			
			fs.writeFile(cwd + '/task.txt',newData,
				function(err) {
					if (err) throw err;
					console.log('Deleted task' + deleteIndex);
				},
			);
		}
	} else {
		console.log('Error: Missing NUMBER for deleting todo.');
	}
};

const doneFunc = () => {
	
	const doneIndex = args[3];
	if (doneIndex) {
		let data = [];
		
		let dateobj = new Date();
		
		let dateString = dateobj.toISOString().substring(0, 10);
		const fileData = fs.readFileSync(cwd+ '/task.txt').toString();
		const doneData = fs.readFileSync(cwd+ '/completed.txt').toString();
		data = fileData.split('\n');
	
		let filterData = data.filter(function(value) {
			return value !== '';
		});
		
		if (doneIndex > filterData.length || doneIndex <= 0) {
			console.log('Error: task #' + doneIndex	+ ' does not exist.');
			
		} else {
			
			const deleted = filterData.splice(filterData.length - doneIndex, 1);
			const newData = filterData.join('\n');
			
			fs.writeFile(cwd + '/task.txt',newData,				
				function(err) {
					if (err) throw err;
				},
			);
			fs.writeFile(cwd + '/completed.txt','x ' + dateString + ' ' + deleted+ '\n' + doneData,
				function(err) {
					if (err) throw err;
					console.log('Marked '+ doneIndex + ' as done.');
				},
			);
		}
	} else {
		// If argument was not passed
		console.log('Error: no incomplete item with index '+doneIndex+' exists.');
	}
};

const reportFunc = () => {
	let incomplete = [];
	let complete = [];
	let dateobj = new Date();
	let dateString = dateobj.toISOString().substring(0, 10);
	const todo = fs.readFileSync(cwd+ '/task.txt').toString();
	const done = fs.readFileSync(cwd+ '/completed.txt').toString();

	incomplete = todo.split('\n');
	complete = done.split('\n');
	let filterTodoData = incomplete.filter(function(value) {
		return value !== '';
	});
	let filterDoneData = complete.filter(function(value) {
		return value !== '';
	});
	console.log(dateString +' ' +'Pending : ' +filterTodoData.length +' Completed : ' +
		filterDoneData.length,
	);
};

switch (args[2]) {
	case 'add':
		{
			addFunc();
			break;
		}

	case 'ls':
		{
			listFunc();
			break;
		}

	case 'del':
		{
			deleteFunc();
			break;
		}

	case 'done':
		{
			doneFunc();
			break;
		}

	case 'help':
		{
			InfoFunc();
			break;
		}

	case 'report':
		{
			reportFunc();
			break;
		}

	default:
		{
			InfoFunc();
		}
}
