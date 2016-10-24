
export const messages: any = {
  CandidateAdjacentsNotPicked : "Please select at least one adjacent state",
  ObjectNotAnArray: "Object is not an array: ",
};

// local deployment
let webservice_ext: string = '.json'; // uses local json file
let deployment_context: string = ''; // deploy locally in dist folder
// let webservice_ext = ''; // uses server-side mongo db
// let deployment_context = '/state-geo-quiz-1.0.0'; // Java web service deployed in Tomcat

export const webservice_url: any = {
  states: `${deployment_context}/states${webservice_ext}`,
  adjacentStates: `${deployment_context}/adjacentStates${webservice_ext}`,
  users: `${deployment_context}/users${webservice_ext}`,
};

export const no_adjacent_states: string[] = [
  "Hawaii",
  "Alaska",
];


