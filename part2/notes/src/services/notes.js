import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const returnData = (res) => res.data

const getAll = () => {
  return axios.get(baseUrl).then(returnData)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(returnData)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(returnData)
}

export default { 
  getAll,
  create,
  update
}