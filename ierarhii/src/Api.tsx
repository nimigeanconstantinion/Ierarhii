import {stringify} from "querystring";
import ResponseImpl from "./models/ResponseImpl";
import Persoana from "./models/Persoana";
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;
import {resolve} from "dns/promises";
import {Runtime} from "inspector";
import {constants} from "os";
import {ErrorREST} from "./models/ErrorRest";

import { Result, Err, Ok} from 'neverthrow';

type ResponseBody = {};

interface ResponseData {
    statusCode: number
    responseBody?: ResponseBody
};

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
            console.log("**************Raspuns din api");
            console.log(response);

            let ret=await response.json();
            console.log(ret);
            return ret;
        } catch (e) {

            console.log(e);
            throw new Error("nu am persoane");
        }


    }

    addPerson=async (newPers:any):Promise<void>=>{
        try {

             let response=await this.api("http://localhost:8080/api/v1/ierarhii/addp", "POST",newPers);

        } catch (e) {

        console.log(e);


        }
    }

}
