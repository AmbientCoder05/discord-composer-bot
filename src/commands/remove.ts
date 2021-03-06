import { Arg, Command } from "utils/commands";
import Midi from "data/midi";

export const remove = Command({
    name: "remove",
    description: "Removes a note",
    args: {
        track: Arg<number>({
            type: Number,
            required: true,
            example: 3
        }),
        note: Arg<number>({
            type: Number,
            required: true,
            example: 2
        })
    },
    run: (msg, { track, note }) => {
        const selectedTrack = Midi[track - 1];
        // Throw an error if track does not exist.
        if (!selectedTrack) {
            msg.reply("this track does not exist!");
            return;
        }

        const noteIndex = note - 1;
        // Throw an error if note does not exist.
        if (!selectedTrack[noteIndex]) {
            msg.reply("this note does not exist!");
            return;
        }

        selectedTrack.splice(noteIndex, 1);
        msg.reply(`Successfully removed note number ${note} from track number ${track}!`);
    }
});
