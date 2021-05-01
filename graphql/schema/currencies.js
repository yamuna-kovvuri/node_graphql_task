module.exports=`

    type USER_DATA {
        uuid: String
        coin_name: String
        status: String
        timestamp:String
    }

    type PRICE_DATA {
        uuid: Int
        coin_id: Int
        currency: String
        price_timestamp: String
        price_date:String
        request_id:Int
    }

    type Mutation {
        createRequest(id: String!): USER_DATA
        updatePriceStatus(request_id: Int!): PRICE_DATA
    }

    type Query {
        getPriceDataById(uuid: String!): USER_DATA
    }
`

