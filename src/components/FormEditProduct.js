import React, { useEffect,useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { read,update } from '../components/Functions/product';

export const FormEditProduct = () => {

    const params = useParams() //ได้ id ของวัตถุมา
    const navigate = useNavigate() //คือการโหลดกลับไปหน้าเดิม

    const [data,setData] = useState({ //ทำเป็นค่าเริ่มต้นก่อน เพราะ เปิดมามันกำลังติดต่อกับฐานข้อมูลอยุ่
        name:'',
        detail:'',
        location:''
    })

    const [previousFile,setFile] = useState()

    useEffect(() =>{
        loadData(params.id) //รับ id จากการกดที่หน้าบ้าน
    },[])

    const loadData = async (id) => {
       read(id)
       .then((res) => {
        setData(res.data) //ส่งข้อมูลขึ้นไปเก็บที่ตัวแปร
        setFile(res.data.file)
       })
    }
    const handleChange = (dataFromUser) =>{ //เมื่อข้อมูลเปลี่ยนแปลงจะถูกส่งไปยัง form

      if(dataFromUser.target.name === 'file'){
        setData({
          ...data, //คือการ copy ค่าของ form มา
          [dataFromUser.target.name]:dataFromUser.target.files[0] //ถูกส่งไปเก็บใน form แล้ว
        })
      }
      else{
        setData({
          ...data, //คือการ copy ค่าของ form มา
          [dataFromUser.target.name]:dataFromUser.target.value
      })
    }
  }
    const submit_click = async (form) => { //บันทึกข้อมูล พร้อมส่งไปยังหลังบ้าน 
        form.preventDefault()

        console.log(data)
        console.log(previousFile)
        
        const formWithImageData = new FormData()
        for (const key in data){ 
        formWithImageData.append(key,data[key]) 
      }
      formWithImageData.append('previousFile',previousFile) 
         update(params.id,formWithImageData)//เมื่อส่งข้อมูลแล้ว ก็เรียกใช้ loaddata ด้วย เพื่อเอาข้อมูลมาแสดง)
         .then(res => {
           console.log(res)
           navigate('/')//ย้อนกลับไปหน้าแรก
         })
         .catch((err)=>console.log(err))
      }
      

  return (
    <div>FormEditProduct

      <form onSubmit={submit_click} encType='multipart/form-data'>
        <input 
            type='text' 
            name='name' 
            onChange={dataFromUser => handleChange(dataFromUser)}
            placeholder='name'
            value = {data.name}/>
           
        <br />
        <input 
            type='text' 
            name='detail' 
            onChange={dataFromUser => handleChange(dataFromUser)} 
            placeholder='detail'
            value = {data.detail}/>
        <br />
        <input 
            type='text' 
            name='location' 
            onChange={dataFromUser => handleChange(dataFromUser)} 
            placeholder='location'
            value = {data.location}/>
        <br />
        <input 
          type='file' 
          name='file' 
          onChange={dataFromUser => handleChange(dataFromUser)}
        /><br /> 
        <button>submit</button>
      </form>
    </div>
  )
}

export default FormEditProduct;