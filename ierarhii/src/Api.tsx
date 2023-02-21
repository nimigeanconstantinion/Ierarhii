import {stringify} from "querystring";
import ResponseImpl from "./models/ResponseImpl";
import Persoana from "./models/Persoana";
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;
import {resolve} from "dns/promises";
import {Runtime} from "inspector";
import {constants} from "os";
import ErrorRest from "./models/ErrorRest";

import { Result, Err, Ok} from 'neverthrow';

type ResponseBody = {};

interface ResponseData {
    statusCode: number
    responseBody?: ResponseBody
};

export default class Api{

    api<T,U>(path:string,method="GET",body:U):Promise<ResponseImpl<T>>{

        const url=  path;

        const options:RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },


            body:body==null?null:JSON.stringify(body)
        }
        return fetch (url,options)
    }
    // api(path:string, method = 'GET', body:string|null){
    //
    //     const options={
    //         method,
    //         headers:{
    //             'Content-Type':'application/json;charset=utf-8'
    //         },
    //         body
    //     };
    //
    //     if(body !=null){
    //         options.body = JSON.stringify(body);
    //     }
    //
    //
    //     return fetch( path, options);
    // }


    getPersons = async ():Promise<ResponseImpl<Persoana[]>> => {
        try {

            let response = await this.api("http://localhost:8080/api/v1/ierarhii", "GET",null);

            let ret=await response.json();
            console.log("RET di api");
            console.log(ret);
            return ret;
        } catch (e) {

            console.log(e);
            throw new Error("nu am persoane");
        }


    }

    addPerson=async (newPers:any):Promise<ResponseImpl<Persoana>> =>{


             const response=await this.api("http://localhost:8080/api/v1/ierarhii/addnp", "POST",newPers);

             return response.json();


    }
    delPerson=async (pers:Persoana):Promise<void>=>{
        try {

            let response=await this.api("http://localhost:8080/api/v1/ierarhii/delP/"+pers.id, "DELETE",null);

        } catch (e) {

            console.log(e);


        }
    }
}
