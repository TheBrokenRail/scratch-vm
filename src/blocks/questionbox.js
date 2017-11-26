class QuestionBox {
    constructor () {
        this._answer = '';
        this._questionList = [];
        this.runtime = {
            emit: function (param1, param2) {
                console.warn('Runtime Not Attached');
            }
        };
    }
    _enqueueAsk (question, resolve, target, wasVisible) {
        this._questionList.push([question, resolve, target, wasVisible]);
    }
    _askNextQuestion () {
        if (this._questionList.length > 0) {
            const [question, _resolve, target, wasVisible] = this._questionList[0];
            // If the target is visible, emit a blank question and use the
            // say event to trigger a bubble.
            if (wasVisible) {
                this.runtime.emit('SAY', target, 'say', question);
                this.runtime.emit('QUESTION', '');
            } else {
                this.runtime.emit('QUESTION', question);
            }
        }
    }
    _clearAllQuestions () {
        this._questionList = [];
        this.runtime.emit('QUESTION', null);
    }
}
module.exports = new QuestionBox();
