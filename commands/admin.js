var command = {}
const child_process = require('child_process');

command.update = {
    "name": "update",
    "usage": "update",
    "description": "For Admins Only - Updates Bot",
    "process": function(bot, msg, env) {
        msg.channel.sendMessage("Preparing to update").then(function(e) {
            var evaled = eval("child_process.execSync('git pull origin').toString()");
            msg.channel.sendMessage(evaled).then(function(message) {
                if (evaled === "Already up-to-date.") {
                    e.edit("There was nothing to update")
                    message.edit("There was nothing to update")
                } else {
                    e.edit("I have downloaded all the new files but you will need to restart for it to take effect, I will now shut down").then(function(r) {
                        message.edit("I have downloaded all the new files but you will need to restart for it to take effect, I will now shut down").then(function(t) {
                            process.exit(0)
                        })
                    })
                }
            })
        })
    }
}

command.shutdown = {
    "name": "shutdown",
    "usage": "shutdown",
    "description": "Restarts bot",
    "process": function(bot, msg, env) {
		var reason = msg.content.split(" ").splice(1).join(" ");
        msg.channel.sendMessage("Shutdown initiated! Bot shutting down...\nReason: ${reason}").then(function(t) {
			process.exit(0)
        })
    }
}

command.eval = {
    "name": "eval",
    "usage": "eval <code>",
    "description": "Runs code",
    "process": function(bot, msg, env) {
		var evalcode = msg.content.split(" ").splice(1).join(" ");
		try {
			var evaled = eval(evalcode);
			if (typeof evaled !== 'string') {
				evaled = require('util').inspect(evaled);
			}
			msg.channel.sendMessage("Output:\n```js\n" + clean(evaled) + "```");
		}
		catch (err) {
			msg.channel.sendMessage("Error: " + clean(err));
		}
		
		function clean(text) {
			if (typeof(text) === "string") {
				return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
			}
			else {
				return text;
			}
		}
    }
}

module.exports = command