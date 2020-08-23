import { validFlags } from "../resolvables/Resolvables";

export default function validateFlags (flags: string[]) {
    for (const flag of flags) {
        if (!validFlags.some(f => f === flag)) flags.splice(flags.indexOf(flag), 1);
    }
    return flags;
}