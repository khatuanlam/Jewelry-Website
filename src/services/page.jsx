import users from '@content/users.json'

const findUserByEmail = (email) => users.find(user => user.email === email)


export default findUserByEmail