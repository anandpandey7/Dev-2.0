import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import * as grpc from '@grpc/grpc-js';
import type { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js"
import * as protoLoader from '@grpc/proto-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  

const packageDefinition = protoLoader.loadSync(
  join(__dirname, '../src/a.proto')
);


const personProto = grpc.loadPackageDefinition(packageDefinition);

const PERSONS = [
    {
        name: "harkirat",
        age: 45
    },
    {
      name: "raman",
      age: 45
    },
];

//@ts-ignore
function addPerson(call, callback) {
  console.log(call)
    let person = {
      name: call.request.name,
      age: call.request.age
    }
    PERSONS.push(person);
    callback(null, person)
}

//@ts-ignore
function GetPersonByName(call, callback){
    const person = PERSONS.find(p => p.name == call.request.name);
    if(person){
        callback(null, person);
    }   
}

const server = new grpc.Server();

server.addService((personProto.AddressBookService as ServiceClientConstructor).service, {
     addPerson: addPerson,
     GetPersonByName: GetPersonByName
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});