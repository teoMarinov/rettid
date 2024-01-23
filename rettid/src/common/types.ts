export type User = {
    username: string,
    nickname: string,
    password: string,
    email: string,
    post_karma: number,
    comment_karma: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile_picture: any,
    is_admin: boolean,
    is_banned: boolean
}