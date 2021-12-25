let BASE_URL=''
const TIME_OUT=10000

if(process.env.NODE_ENV==='development'){
    BASE_URL='http://localhost:8888/admin'
}else{
    BASE_URL='http://local/admin/api/'
}
export {BASE_URL,TIME_OUT}