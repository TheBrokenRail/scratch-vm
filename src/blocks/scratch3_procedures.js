function Scratch3ProcedureBlocks(runtime) {
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    this.runtime = runtime;
}

/**
 * Retrieve the block primitives implemented by this package.
 * @return {Object.<string, Function>} Mapping of opcode to Function.
 */
Scratch3ProcedureBlocks.prototype.getPrimitives = function() {
    return {
        'procedures_defnoreturn': this.defNoReturn,
        'procedures_callnoreturn': this.callNoReturn,
        'procedures_defreturn': this.defReturn,
        'procedures_callreturn': this.callReturn,
        'procedures_report': this.report
    };
};
Scratch3ProcedureBlocks.prototype.defNoReturn = function () {
    // No-op: execute the blocks.
};

Scratch3ProcedureBlocks.prototype.defReturn = function (args, util) {
    // No-op: execute the blocks.
    util.stackFrame.REPORT = args.RETURN;
    util.done();
};

Scratch3ProcedureBlocks.prototype.callNoReturn = function (args, util) {
    if (!util.stackFrame.executed) {
        var procedureName = args.mutation.name;
        util.stackFrame.executed = true;
        util.startProcedure(procedureName);
    }
};

Scratch3ProcedureBlocks.prototype.callReturn = function (args, util) {
    if (!util.stackFrame.executed) {
        var procedureName = args.mutation.name;
        util.stackFrame.executed = true;
        util.stackFrame.proc = util.startProcedure(procedureName);
        util.stackFrame.stackFrameNum = 
            util.stackFrame.proc.stackFrames.length - 1;
        util.yieldFrame();
    } else if (util.stackFrame.proc.stackFrames[
            util.stackFrame.stackFrameNum
        ].executionContext.REPORT) {
        return util.stackFrame.proc.stackFrames[
            util.stackFrame.stackFrameNum
        ].executionContext.REPORT;
    } else {
        util.yieldFrame();
    }
};

Scratch3ProcedureBlocks.prototype.report = function (args, util) {
    // No-op: execute the blocks.
    var thread = util.getThread();
    var i = 0;
    for (; i < thread.stackFrames.length; i++) {
        if (thread.stackFrames[i - 1].executionContext.stackFrameNum) {
            thread.stackFrames[i].executionContext.REPORT = args.VALUE;
            util.done();
            return;
        }
    }
};

module.exports = Scratch3ProcedureBlocks;
