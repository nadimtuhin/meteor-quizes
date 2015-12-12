Quizes = React.createClass({
  render() {
    let {quizes, answers} = this.props;

    quizes = quizes.map(function (quiz, qid) {
      let answer = _.findWhere(answers, {qid});
      return quiz.set('answered', answer && answer.username).set('answer', answer && answer.answer);
    });

    return (
      <div className="row">
        {quizes.map((quiz, qid)=> {
          return <Quiz
            key={qid}
            qid={qid}
            correct={quiz.get('correct')}
            answer={quiz.get('answer')}
            answered={quiz.get('answered')}
            title={quiz.get('title')}
            options={quiz.get('options')}/>
        }) }
      </ div >
    );
  }
});

