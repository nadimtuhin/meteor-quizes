LeaderBoard = React.createClass({
  render() {
    let {answers} = this.props;
    let users = _.groupBy(answers, 'username');

    users = _.map(users, function (answers, username) {
      let correct = answers.reduceRight(function (sum, answer) {
        sum = sum + (answer.correct ? 1 : 0);

        return sum;
      }, 0);

      return {username, correct};
    });

    return (
      <div className="leaderboard">
        <h3 className="text-muted">Leaderboard</h3>
        <ul>
          {users.map(user=><li>{user.username}: {user.correct}</li>)}
        </ul>
      </div>
    );
  }
});