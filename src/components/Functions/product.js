import axios from "axios";

export const remove = async (id) => {
    await axios.delete(process.env.REACT_APP_API + '/product/'+id)
}

export const create = async (data) => {
    await axios.post(process.env.REACT_APP_API + '/product',data)
}

export const getdata = async () => {
    return await axios.get(process.env.REACT_APP_API + '/product') //เป็นฟังก์ชัน ก็ต้องมี return ค่า
}

export const read = async (id) => {
    return await axios.get(process.env.REACT_APP_API + '/product/'+id)
}

export const update = async (id,data) => { //ส่งทั้ง id และ data
    return await axios.put(process.env.REACT_APP_API + '/product/'+id,data)
}

