// App component - represents the whole app
App = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    let currentUser = Meteor.user();
    let answers = Answers.find().fetch();

    return {
      currentUser,
      answers
    };
  },

  render() {
    return (
      <div className="container">
        <header className="masthead">
          <h3 className="text-muted pull-left">Meteor Meetup Quiz</h3>

          <div className="pull-left login-wrapper">
            <AccountsUIWrapper />
          </div>
        </header>

        <div className="row">
          <content className="col-md-10">
            { this.data.currentUser ?
              <Quizes answers={this.data.answers} quizes={quizesCollection}/> :
              <div className="alert alert-info">You need to login to attend this quiz</div>
            }
          </content>

          <aside className="col-md-2">
            <LeaderBoard answers={this.data.answers}/>
          </aside>
        </div>

      </div>
    );
  }
});
