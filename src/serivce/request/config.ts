let BASE_URL=''
const TIME_OUT=10000

if(process.env.NODE_ENV==='development'){
    BASE_URL='/api'
}else{
    BASE_URL='http://101.132.68.0:3000/admin/api/'
}
export {BASE_URL,TIME_OUT}