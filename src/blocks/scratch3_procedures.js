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
};

Scratch3ProcedureBlocks.prototype.callNoReturn = function (args, util) {
    if (!util.stackFrame.executed) {
        var procedureName = args.mutation.name;
        util.stackFrame.executed = true;
        util.startProcedure(procedureName);
    }
};

Scratch3ProcedureBlocks.prototype.callReturn = function (args, util) {
    var proc = null;
    if (!util.stackFrame.executed) {
        var procedureName = args.mutation.name;
        util.stackFrame.executed = true;
        proc = util.startProcedure(procedureName);
    }
    if (proc.peekStackFrame() == null) {
        return false;
    } else {
        util.yieldFrame();
        console.log(proc.peekStackFrame());
    }
};

Scratch3ProcedureBlocks.prototype.report = function (args, util) {
    // No-op: execute the blocks.
    util.stackFrame.REPORT = args.VALUE;
};

module.exports = Scratch3ProcedureBlocks;