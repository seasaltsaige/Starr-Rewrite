import { BaseCommand } from "../BaseClasses/BaseCommand"
import { Message } from "discord.js"
import StarrClient from "../BaseClasses/StarrClient";

export default class Cooldown {

    private map: Map<string, BaseCommand> = new Map()
    private message: Message;
    private command: BaseCommand;
    private cooldownAddedAt: Date;
    private errMessages: Array<Message> = [];

    constructor(public time: number) { }


    public setTime(time: number): void { this.time = time }

    /**
     * Checks if the command can be ran or not.
     * @param message - The message that was sent.
     * @param command - The command the cooldown is on an the user is trying to run with the message.
     */
    public check(message: Message, command: BaseCommand, client: StarrClient): boolean {
        this.message = message
        this.command = command
        if (client.owners.includes(message.author.id)) return true

        const foundObj = this.map.get(message.author.id)
        if (!foundObj) {
            this.addUser()
            return true
        } else if (foundObj) {
            this.sendErrMessage()
            return false
        }
    }

    private sendErrMessage(): Promise<void> {
        const amount = this.calcSeconds()
        return this.message.channel.send(`Please wait \`${amount}s\` before using \`${this.command.name}\` again.`).then(m => {
            this.errMessages.push(m)
        })
    }

    private calcSeconds(): number {
        const canUseAgainAt = new Date(this.cooldownAddedAt.getTime() + this.time)
        return (canUseAgainAt.getTime() - Date.now()) / 1000
    }

    private addUser(): void {
        this.map.set(this.message.author.id, this.command)
        this.cooldownAddedAt = new Date()
        this.removeUser();
    }

    private removeUser(): void {
        setTimeout(() => {
            this.map.delete(this.message.author.id)
            this.deleteMessages()
        }, this.time)
    }

    private deleteMessages(): void {
        if (this.errMessages[0]) {
            //@ts-ignore
            this.errMessages[0].channel.bulkDelete(this.errMessages)
        }
    }
}