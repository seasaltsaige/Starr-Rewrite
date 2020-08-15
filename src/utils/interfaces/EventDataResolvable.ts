export default interface EventDataResolvable {

    /**
     * The name of the event.
     * Any event that can be passed into client.on() is valid
     */
    name: string

    /**
     * The description of the event.
     * Used for data of why that event is being used.
     */
    description: string
}
