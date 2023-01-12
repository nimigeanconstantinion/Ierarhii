import {stringify} from "querystring";
import ResponseImpl from "./models/ResponseImpl";
import Persoana from "./models/Persoana";

export default class Api{
    api(path:string, method = 'GET', body:string|null){

        const options={
            method,
            headers:{
                'Content-Type':'application/json;charset=utf-8'
            },
            body
        };

        if(body !=null){
            options.body = JSON.stringify(body);
        }


        return fetch( path, options);
    }

    getPersons = async ():Promise<ResponseImpl<Persoana[]>> => {
        try {

            let response = await this.api("http://localhost:8080/api/v1/ierarhii", "GET",null);
            return response.json();
        } catch (e) {

            throw new Error("nu am persoane");
        }


    }

}
