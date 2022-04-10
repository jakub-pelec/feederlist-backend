export {};

declare global {
    interface UserData {
        name: string
        downvotes: number
        upvotes: number
    }
}
