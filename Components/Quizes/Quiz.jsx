Quiz = React.createClass({
  answer(answer){
    let {qid} = this.props;

    console.log(`answering ${qid} ${answer}`);
    Meteor.call('answer', qid, answer);
  },

  renderMeta(answered){
    return <div className="label label-info">
      <span>Answered by {answered === Meteor.user().username ? "you" : answered}! </span>
    </div>;
  },

  renderOptions(options, answer, correct){
    return options.map((option, id)=> {
      let classes = cx({
        correct: answer && correct == id,
        incorrect: answer && answer == id && answer != correct
      });

      return <li className={classes} key={id} onClick={this.answer.bind(this, id)}>({id}) {option}</li>;
    })
  },

  render() {
    let {title, qid, options, answered, correct, answer} = this.props;

    return <div className={cx("col-xs-12 col-md-6", {clearboth: qid%2===0})}>
      <div className={cx("quiz",{answered})}>
        <h3>(Q {qid + 1}) {title}</h3>

        {answered ? this.renderMeta(answered) : null}

        <ul>
          {this.renderOptions(options, answer, correct)}
        </ul>
      </div>
    </div>
  }
});