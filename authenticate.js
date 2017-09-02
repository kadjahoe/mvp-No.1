// fake authenticator
const ACCESS_LEVELS = {
    ORG_USER: 1,
    ORG_ADMIN: 2,
    DEVELOPER: 3
}

const users = [
    {
        username: 'stephon',
        password: 'basic',
        id: 1,
        accessLevel: ACCESS_LEVELS.DEVELOPER
    }
]

function authenticate({ username, password }) {
    if(!username || !password) throw new Error('username or password is missing')
    const user = users.find(user => username === user.username)
    if(!user) return null
    if(user.password !== password) return null
    const { accessLevel, id } = user
    return {
        username: user.username,
        id,
        accessLevel,
        access: {
            ORG_USER: accessLevel >= ACCESS_LEVELS.ORG_USER,
            ORG_ADMIN: accessLevel >= ACCESS_LEVELS.ORG_ADMIN,
            DEVELOPER: accessLevel >= ACCESS_LEVELS.DEVELOPER,
        }
    }
}

module.exports = { authenticate, ACCESS_LEVELS }