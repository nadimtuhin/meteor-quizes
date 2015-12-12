// Define a collection to hold our answers
Answers = new Mongo.Collection("answers");

if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.subscribe("answers");

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}
if (Meteor.isServer) {
  Meteor.publish("answers", function () {
    return Answers.find({});
  });
}

Meteor.methods({
  answer(qid, answer){
    // Make sure the user is logged in before inserting a answer
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    let answered = Answers.findOne({qid});
    if (answered) {
      throw new Meteor.Error("This question is already answered");
    }

    let correct = quizesCollection.getIn([qid, 'correct']);

    let record = {
      qid,
      answer,
      correct: correct === answer,
      username: Meteor.user().username,
      createdAt: new Date(),
    };

    Answers.insert(record);
  },
});
