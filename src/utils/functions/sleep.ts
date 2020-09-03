export default function sleep (ms: number) {
    return new Promise((res, _) => setTimeout(res, ms));
}