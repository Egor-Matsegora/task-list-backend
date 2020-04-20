const moment = require('moment');
const Note = require('../models/Note.model');
const Task = require('../models/Task.model');
const errorHandler = require('../helpers/error-handler.helper');

const dateFormat = 'DD.MM.YYYY';

module.exports.getUserStat = async function (req, res) {
  try {
    const allNotes = await Note.find({
      user: req.user.id,
    });

    const notesStat = getNotesStat(allNotes);
    const allNotesNumber = allNotes.length;

    const allTasks = await Task.find({
      user: req.user.id,
    });

    const tasksStat = getTasksStat(allTasks);
    const allTasksNumber = allTasks.length;
    const allDoneTasksNumber = allTasks.filter((task) => task.done).length;

    const result = {
      notes: { notesStat, allNotesNumber },
      tasks: { tasksStat, allTasksNumber, allDoneTasksNumber },
    };
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
};

function getNotesStat(notes = []) {
  const daysNotes = [];

  notes.forEach((note) => {
    const date = moment(note.date).format(dateFormat);
    const dayStat = daysNotes.find((item) => item.date === date);
    if (!dayStat) {
      const stat = {
        date: date,
        notesNumber: 1,
      };
      daysNotes.push(stat);
    } else {
      const index = daysNotes.indexOf(dayStat);
      index !== -1 && daysNotes[index].notesNumber++;
    }
  });

  return daysNotes;
}

function getTasksStat(tasks = []) {
  const daysTasks = [];

  tasks.forEach((task) => {
    const date = moment(task.date).format(dateFormat);
    const dayStat = daysTasks.find((item) => item.date === date);
    if (!dayStat) {
      const stat = {
        date: date,
        tasksNumber: 1,
        doneTasksNumber: 0,
      };
      daysTasks.push(stat);
    } else {
      const index = daysTasks.indexOf(dayStat);
      index !== -1 && daysTasks[index].tasksNumber++;
      index !== -1 && task.done && daysTasks[index].doneTasksNumber++;
    }
  });
  console.log(daysTasks);
  return daysTasks;
}
