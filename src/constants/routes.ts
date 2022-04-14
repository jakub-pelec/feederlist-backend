const createApiPath = (path: string) => `/api/v1/${path}`

export const ROUTES = {
    test: createApiPath('test'),
    version: createApiPath('version'),
    users: createApiPath('users'),
    user: createApiPath('user'),
    upvote: createApiPath('upvote'),
    downvote: createApiPath('downvote')
}