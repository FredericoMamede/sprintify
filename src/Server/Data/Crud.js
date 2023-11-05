const { ObjectId } = require("mongodb")
const { getMongoCollection } = require("./db")

// Manager!!!!!

// Sprints

  // create new sprint
  export async function createNewSprint(sprint) {
    const collection = await getMongoCollection("Sprintify", "Sprints");
    const result = await collection.insertOne(sprint);
    return result.insertedId;
  }


  // delete a sprint


  export async function deleteSprint(sprintId) {
    const collection = await getMongoCollection("Sprintify", "Sprints");
    const result = await collection.deleteOne({
      _id: new ObjectId(sprintId)
    });
    return result.deletedCount;
  }


  // sprints history
  export async function readAllSprints() {
    const collection = await getMongoCollection("Sprintify", "Sprints")
    const sprints = await collection.find().toArray()
    return sprints
  }


  // modify a sprint
  export async function updateSprint(sprintId, tasks, employees) {
    const collection = await getMongoCollection("Sprintify", "Sprints");
    console.log(sprintId);
    const result = await collection.updateOne(
      { _id: new ObjectId(sprintId) },
      {
        $push: {
          tasks: { $each: tasks },
          employees: { $each: employees },
        },
      }
    );
  
    return result.modifiedCount;
  } 

  // get sprint by id
  export async function getSprintById(sprintId) {
    const collection = await getMongoCollection("Sprintify", "Sprints");
  
    const sprint = await collection.findOne({ _id: new ObjectId(sprintId) });
  
    return sprint;
  }

  // find ongoing sprints 
export async function readOnGoingSprints() {
  const collection = await getMongoCollection('Sprintify', 'Sprints'); 
  const ongoingSprints = await collection.find({
  }).toArray();
  return ongoingSprints;
}



  // Tasks
 
export async function createNewTask(task) {
    const collection = await getMongoCollection("Sprintify", "Tasks")
    const result = await collection.insertOne(task)
    return result
  }

   export async function updateTask(taskId) {
    const collection = await getMongoCollection("Sprintify", "Tasks");
    const result = await collection.updateOne(
      { _id: taskId }, 
      { $set: { completed: true} } 
    );
    return result.upsertedTask;
  }

  export async function getAllTasks() {
    const collection = await getMongoCollection('Sprintify', 'Tasks');
    const tasks = await collection.find({}).toArray();
    return tasks;
  }

  // Daily Scrums

  export async function findDailyScrum(date) {
    const collection = await getMongoCollection("Sprintify", "DailyScrums")
    const result = await collection.findOne({date})
    return result
  }


  export async function deleteDailyScrum(date) {
    const collection = await getMongoCollection("Sprintify", "DailyScrums")
    const result = await collection.deleteOne({date})
    return result.deletedCount
  }


  export async function updateTime(date, newTime) {
    const collection = await getMongoCollection("Sprintify", "DailyScrums");
    const result = await collection.updateOne(
      { date },
      { $set: { time: newTime } } 
    );
    return result.upsertedTime;
  }

  /// get all users (nelma)
  export async function getAllUsers() {
    const collection = await getMongoCollection('Sprintify', 'Users');
    const users = await collection.find({}).toArray();
 
    return users;
    
  }


  /// get all departmens (nelma)
  export async function getAlldepartments() {
    const collection = await getMongoCollection('Sprintify', 'Departments');
    const departments = await collection.find({}).toArray();
 
    return departments;
    
  }


/// get all projects (nelma)
export async function getAllProjects() {
  const collection = await getMongoCollection('Sprintify', 'Projects');
  const projects = await collection.find({}).toArray();

  return projects;
  
}

//nelma 

export async function getLast4Alerts() {
  const collection = await getMongoCollection('Sprintify', 'Alerts'); 

  const last4Alerts = await collection
    .find()
    .sort({ timestamp: -1 }) 
    .limit(4) 
    .toArray();

  return last4Alerts;
}
  export async function deleteAlertByTaskDescription(description) {
    const collection = await getMongoCollection('Sprintify', 'Alerts'); 
    const result = await collection.deleteOne({ 'task.description': description });
  
    return result.deletedCount;
  }



  // Employee!!!!!



  // Find Assigned Sprint
export async function findSprintForEmployee(employeeName) {
  const collection = await getMongoCollection('Sprintify', 'Sprints'); 
  const sprint = await collection.findOne({ 'tasks.employee': employeeName }, { projection: { 'sprint.end_date': 1 } });

  return sprint;
}


// Find Assigned Tasks
export async function findAssignedTasks(sprintStartDate, employeeName) {
  const collection = await getMongoCollection('Sprintify', 'Sprints'); 
  const tasks = await collection
    .find({
      'sprint.start_date': sprintStartDate,
      'tasks.employee': employeeName,
    })
    .project({ 'tasks.description': 1 });

  return tasks.toArray();
}


/// get alerts

export async function getAlerts(projectId, type) {
  const collection = await getMongoCollection("Sprintify", "Alerts");
  const filter = {};
  
  if (projectId) {
    const projectName = await getProjectNameById(projectId);
    if (projectName) {
      filter["project"] = projectName;
    }
  }

  if (type) {
    filter["type"] = type;
  }

  const alerts = await collection.find(filter).toArray();
  return alerts;
}


export async function getProjectNameById(projectId) {
  const collection = await getMongoCollection("Sprintify", "Projects");
  const project = await collection.findOne({ "_id": projectId });
  console.log("Project Document:", project);
  return project ? project.name : null;
}


// Update assigned sprint - The task if === done, completed is set to true

export async function updateSprintTaskCompletionByDescription(sprintId, taskDescription) {
  console.log(sprintId,taskDescription)
  const collection = await getMongoCollection("Sprintify", "Sprints");
  const result = await collection.updateOne(
    {
      _id: new ObjectId(sprintId),
      "tasks.description": taskDescription, 
    },
    {
      $set: {
        "tasks.$.completed": true,
      },
    }
  );

  return result.modifiedCount > 0;
}


// Update the project global tasks 

export async function updateTaskByDescription(taskDescription) {
  const collection = await getMongoCollection("Sprintify", "Tasks");
  const result = await collection.updateOne(
    {
      description: taskDescription,
    },
    {
      $set: {
        completed: true,
      },
    }
  );

  return result.modifiedCount > 0;
}

export async function createAlert(alert) {
  const collection = await getMongoCollection("Sprintify", "Alerts");
  const result = await collection.insertOne(alert);
  return result;
}





