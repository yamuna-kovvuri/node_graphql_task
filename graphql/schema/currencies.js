module.exports=`

    type USER_DATA {
        uuid: String
        coin_name: String
        status: String
        price_timestamp:String
    }

    type PRICE_DATA {
        request_uuid: String
        currency: String
        price_timestamp: String
        price_date:String
        request_id:Int
        status:String
    }

    type Mutation {
        createRequest(id: String!): USER_DATA
    }

    type Query {
        getPriceDataById(uuid: String!): PRICE_DATA
    }
`

