
//const axios = require('axios');
const database = require('./../database');
const { DATABASE: { name: databaseName } } = require('./../config');
const helper =require('../utils/helper');
const uuidv1 = require('uuidv1')
const API_URL = 'https://api.nomics.com/v1/currencies/ticker?key=7e69217413100117711004501a2a5e57&ids='

const { userRequests,priceData } = database;

const getPriceDataById= async (uuid) =>{
  try
  {
   
    
    const data = await userRequests.findOne({
      where: {
        uuid: uuid
      }
    });
    if (data) {
      const { dataValues :{uuid,coin_name} } = data;
      if(uuid)
      { 
        // console.log(uuid,'data')
        let response = await helper.getRequest({url:`${API_URL}${coin_name}`})
        // let response = [];
        if(response){
          console.log(`${API_URL}${coin_name}`)
          console.log(response)
           const {currency,price,price_timestamp} = response.data[0]
           response.uuid = uuid
           const data1 = await priceData.create({ 
             price: price, uuid: uuidv1(),currency:currency,coin_id:uuid
            // createdAt: Date.now(), updatedAt:Date.now() 
          })
          if(data1)
          {
            const data3 = await userRequests.update({
              status: 'processed'
            },{
              where: {uuid: uuid},
            }
            )
            return response
          }
          
        }
        else
        {
          return null
        }

      }
     
      // version = name;
    }
   
  }
  catch(error)
  {
    console.log(error)
    return error;
  }

}
const createRequest = async (data) =>{
  try
  {
    console.log('userRequest',userRequests,data)

    const row =  await userRequests.create({ coin_name: data, uuid: uuidv1(), status: "Pending",
    price_timestamp:Date.now() })
    const {dataValues} = row
    if(dataValues)
    {
      return dataValues;
    }
    return null;
  }
  catch(error)
  {
    console.log(error)
    return error;
  }
}

module.exports = {
    createRequest,
    getPriceDataById
};