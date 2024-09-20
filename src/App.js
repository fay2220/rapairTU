import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import { FormProduct } from './components/FormProduct';
import { FormEditProduct } from './components/FormEditProduct';

function App() {
//  ตรงนี้คือส่วนของ javascript

  return ( //ส่งออกไป ให้มองเป็น html แต่ return ส่งได้แค่ 1 element ถ้า div อีกรอบนึงมันจะ error
  <BrowserRouter>
    <div className="App"> {/* ที่อยู่ตรงกลาง เพราะใช้class ของ App*/}
      {/*HTML*/}
      <h1>RepairTU</h1> 
      
      {/*ปีกกาแล้วตามด้วยตัวแปรได้เลย*/}
      <Routes>
        <Route path='/' element = { <FormProduct />}/>
        <Route path='/edit/:id' element = { <FormEditProduct />} />

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
