import { BaseCommand } from "../BaseClasses/BaseCommand"
import { Message } from "discord.js"

export default class Cooldown {

    private map: Map<string, BaseCommand> = new Map()
    private message: Message;
    private command: BaseCommand;

    constructor(public time: number) { }

    /**
     * Sets the cooldown on the command.
     */
    public setTime(time: number): void { this.time = time }

    /**
     * Checks if the command can be ran or not.
     * @param message - The message that was sent.
     * @param command - The command the cooldown is on an the user is trying to run with the message.
     */
    public check(message: Message, command: BaseCommand): boolean {
        this.message = message
        this.command = command
        const foundObj = this.map.get(message.author.id)
        if (!foundObj) {
            this.handleNotFoundObj()
            return true
        } else if (foundObj) {
            this.sendErrMessage()
            return false
        }
    }

    private sendErrMessage(): Promise<Message> {
        const amount = this.calcSeconds()
        return this.message.channel.send(`You are on cooldown please wait ${amount}s.`)
    }

    private calcSeconds(): number {
        console.log("called", Date.now())
        const test = (this.time - Date.now()) / 1000
        console.log(test)
        return test
    }

    private handleNotFoundObj(): void {
        this.map.set(this.message.author.id, this.command)
        this.handleRemoveUser();
    }

    private handleRemoveUser(): void {
        setTimeout(() => {
            this.map.delete(this.message.author.id)
        }, this.time)
    }
}