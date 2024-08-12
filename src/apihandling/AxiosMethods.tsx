import api from "./AxiosConfig";

const url = 'https://fakestoreapi.com/products';

export const getData = ()=>{
    api.get(url)
    .then((res) => {
        console.log([...res.data])
        console.log(JSON.stringify(res.data , null , 2))
    })
    .catch((err) => {
        console.log(err.message)
        console.log('Error : ' + err.message )
    })
};

export const sendData = () => {
    api.post(url , {
        postId: 1,
        name: 'Jack',
        email: 'jack@gmail.com',
        body: 'comment body'
    })
    .then((res) => {
        console.log(res.data)
        console.log(JSON.stringify(res.data , null , 2))
    })
    .catch((err) => {
        console.log(err.message)
        console.log('Error : ' + err.message)
    })
};

export const editData = () => {
    api.put(`${url}/1` , {
        name: 'Smith',
        email: 'abc@gmail.com',
        body: 'Some Shopping Items'
    })
    .then((res) => {
        console.log(res.data)
        console.log(JSON.stringify(res.data , null , 2))
    })
    .catch((err) => {
        console.log(err.message)
        console.log('Error : ' + err.message)
    })
};

// export const deleteData = (id: any) => {
//     api.delete(`${url}/2`)
//     .then((res) => {
//         console.log(res.data)
//         console.log(JSON.stringify(res.data , null , 2))
//     })
//     .catch((err) => {
//         console.log(err.message)
//         console.log('Error : ' + err.message)
//     })
// };

export const deleteData = (id:any) => {
    return api.delete(`/posts/${id}`);
  };