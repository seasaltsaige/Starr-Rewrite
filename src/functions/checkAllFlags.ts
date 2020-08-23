import { validFlags } from "../resolvables/Resolvables";

export default function checkAllFlags(validatedFlags: string[]) {
    const checks: boolean[] = [];
    if (validatedFlags.length === 0) return false;
    for (const flag of validatedFlags) {
        if (!validFlags.includes(flag)) checks.push(false);
        else checks.push(true);
    };

    if (checks.length < validFlags.length) return false;
    else return true;
}