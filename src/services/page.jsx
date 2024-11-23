import products from '@content/products.json'
import users from '@content/users.json'


const findUserByEmail = (email) => users.find(user => user.email === email)
const getProductByID = (id) => products.find(product => product.id == id)

export default getProductByID