import { createClient } from 'redis';

const client = createClient();

async function main(){
    await client.connect();
    console.log("Connected to redis");
    while(1){
        const response = await client.brPop("problems", 0); // 0 = wait forever until item appears   
        // actually run the users code docker exec

        await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate execution time
        // send it to the pub sub
        console.log("Processed submission: ", response);
    }
}

// while (true) {
//     const data = await client.brPop("problems", 0); 
//     // 0 = wait forever until item appears

//     if (data?.element) {
//         const { problemId, userId, code, language } = JSON.parse(data.element);

//         console.log(
//             `Processing submission for problem ${problemId} by user ${userId}`
//         );

//         // simulate execution
//         // await runCode(code, language);
//     }
// }