import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
axios.defaults.baseURL = "process.env.REACT_APP_API_URL/"
const item1={
  "id":12,
  "name":"name",
  "isComplate":true
}
export default {
  getTasks: async () => {
    return await axios.get(`items`)
    .then(x => {
      console.log("API Response:", x.data);
      return x.data || [];  
    })   
    .catch(err => {
      console.log("eror" + err.message);
      return []; // החזירי מערך ריק במקום item1
    });
  },
  // getTasks: async () => {
  //   return await axios.get(`items`)
  //   .then(x=>x.data || [])   
  //   .catch(err=>{
  //     console.log("eror"+err.message)
  //     return [item1];
  //   });
  // },

  addTask: async(name)=>{
    const item={
      // "id":Math.floor(Math.random() * 1000000),
      "name":name,
      "isComplate":false
    }
    return await axios.post(`items`,item)
    .then(()=>
      console.log('addTask', name , uuidv4())
    )   
    .catch(err=>{
      console.log("eror"+err.message ,uuidv4())
    });
  },

  setCompleted: async(id, isComplate)=>{
    const item={
      "isComplate":isComplate
    }
    return await axios.put(`items/${id}`,item)
    .then(()=>
      console.log('setCompleted', {id, isComplate})
    )   
    .catch(err=>{
      console.log("eror"+err.message)
    });
  },

  deleteTask:async(id)=>{
    return await axios.delete(`items/${id}`)
    .then(()=>
      console.log('deleteTask')
    )   
    .catch(err=>{
      console.log("eror"+err.message)
    })
  }
};
