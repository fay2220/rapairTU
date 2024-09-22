//rafce
import React,{useState,useEffect} from 'react' 
import axios from 'axios' //import ธรรมดาต้องมีปีกกา แต่ถ้า import พวก module,defult ไม่ต้องมี
import { Link } from 'react-router-dom'
import { create,getdata,remove } from './Functions/product'

export const FormProduct = () => {
    //javascript
    
    const [data , setData] = useState([]) //สร้างตัวแปร พร้อมกับฟังก์ชัน setdata
    const [form , setForm] = useState({})

    useEffect(()=>{ //เวลามีการเรียกใช้ component จะมีการเรียกใช้ useEffect ก่อน
        loadData()
    },[])

    const loadData = async() => { //ดึงข้อมูลจากหลังบ้าน
        getdata()
        .then((res)=>  setData(res.data))//ส่งข้อมูลขึ้นไปเก็บ โดยใช้ setdata จาก usestate ให้ไปเก็บที่ data
        .catch((err) => console.log(err))//ถ้ามี err จะทำใน catch
    }
    
    const handleChange = (dataFromUser) =>{ //เมื่อข้อมูลเปลี่ยนแปลงจะถูกส่งไปยัง form

      if(dataFromUser.target.name === 'file'){
        setForm({
          ...form, //คือการ copy ค่าของ form มา
          [dataFromUser.target.name]:dataFromUser.target.files[0] //ถูกส่งไปเก็บใน form แล้ว
        })
      }
      else{
        setForm({
          ...form, //คือการ copy ค่าของ form มา
          [dataFromUser.target.name]:dataFromUser.target.value
      })
    }
  }
//CRTL+K --> CRTL+C = comment หลายบรรทัดพร้อมกัน
    const submit_click = async (Data) => { //บันทึกข้อมูล พร้อมส่งไปยังหลังบ้าน 
      

      const formWithImageData = new FormData()
      for (const key in form){ //เป็นการลูปเข้าไปใน key ของข้อมูล name,detail,location,file
        formWithImageData.append(key,form[key]) //การนำข้อมูลมาซ้อนต่อกันไปเรื่อยๆ
      }

      create(formWithImageData)//เมื่อส่งข้อมูลแล้ว ก็เรียกใช้ loaddata ด้วย เพื่อเอาข้อมูลมาแสดง)
       .then(res => {
        console.log(res.data)
        loadData()
       })
       .catch((err)=>console.log(err)) 
    }

    const removeData = async (id) => {
      remove(id)
      loadData()
      .then((res) => console.log(res))
      .catch((err)=> console.log(err))
    }

//------------------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      FormProduct

      <form onSubmit={submit_click} encType='multipart/form-data'>
        <input 
          type='text' 
          name='name' 
          onChange={dataFromUser => handleChange(dataFromUser)}
          placeholder='name'/>
        <br />
        <input 
          type='text' 
          name='detail' 
          onChange={dataFromUser => handleChange(dataFromUser)} 
          placeholder='detail'/>
        <br />
        <input 
          type='text' 
          name='location' 
          onChange={dataFromUser => handleChange(dataFromUser)} 
          placeholder='location'/>
        <br />
        <input 
          type='file' 
          name='file' 
          onChange={dataFromUser => handleChange(dataFromUser)}
        />
        <br />
        <button>submit</button>
      </form>
      <table className="table"> {/* copy จาก  bootstarp */}
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Detail</th>
        <th scope="col">Location</th>
        <th scope="col">File</th>
        <th scope="col">delete</th>
        <th scope="col">edit</th>
      </tr>
      </thead>
      <tbody>

      { //เป็นการสร้างเงื่อนไขของ javascript ถ้ามีข้อมูลจะดำเนินการ
        data? data.map((item,index) =>  //ส่งข้อมูล tr ตามจำนวน item
          <tr key={index}>
            <td>{index+1}</td>
            <td scope="row">{item.name}</td>
            <td>{item.detail}</td>
            <td>{item.location}</td>
            <td>{item.file}</td>
            <td onClick={()=>removeData(item._id)}>delete </td>
            <td><Link to={'/edit/'+item._id}>edit</Link></td>
            
          </tr>
        )
            : null
      }
      </tbody>
      </table> 
    </div>
    
  )
}

export default FormProduct