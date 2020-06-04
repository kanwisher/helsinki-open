import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const returnData = (res) => res.data

const getAll =  () => axios.get(BASE_URL).then(returnData)

const create = newObject => axios.post(BASE_URL, newObject).then(returnData)

const destroy = (id) => axios.delete(`${BASE_URL}/${id}`).then(returnData)

const update = (id, newObject) => axios.put(`${BASE_URL}/${id}`, newObject).then(returnData)

export default {
    getAll,
    create,
    destroy,
    update
}