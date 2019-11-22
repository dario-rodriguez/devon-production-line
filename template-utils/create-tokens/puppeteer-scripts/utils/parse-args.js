"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseArgs(args) {
    const newArgs = args.slice(2);
    if (newArgs.length < 3) {
        console.log(`Invalid arguments. Usage: ${args[0]} ${args[1]} <url> <username> <password>`);
        process.exit();
    }
    return { url: newArgs[0], user: newArgs[1], pass: newArgs[2] };
}
exports.parseArgs = parseArgs;
