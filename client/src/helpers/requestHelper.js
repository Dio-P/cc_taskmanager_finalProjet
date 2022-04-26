export const createRequestHelper = (accessToken) => {
    return {
        get: async function(url){
            console.log("get url", url);
            const response = await fetch(`http://localhost:8080/auth0/${url}`, { 
                method: "GET",
                headers: new Headers({
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                }),
            })
            return await response.json();
        },
        post: async function(url, body){
            console.log("post url and body", url, body);
            const response = await fetch(`http://localhost:8080/auth0/${url}`, { 
                method: "POST",
                body: JSON.stringify(body),
                headers: new Headers({
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                }),
            })
            return await response.json();
        },
        put: async function(url, body){
            console.log("put url and body", url, body);
            const response = await fetch(`http://localhost:8080/auth0/${url}`, { 
                method: "PUT",
                body: JSON.stringify(body),
                headers: new Headers({
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                })
            })
            return await response.json();
        },
        delete: async function(url){
            console.log("delete url", url);
            const response = await fetch(`http://localhost:8080/auth0/${url}`, { 
                method: "DELETE",
                headers: new Headers({
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                }),
            })
            return await response.json();
        }
    }
    
}










// class RequestHelper {
//     constructor(){
//         this.instance = null;

//     }

//     getInstance() {
//         if(this.instance === null){
//             this.instance = new RequestHelper();
//             delete this.instance.constructor;
//         }
//         return this.instance;
//     }
// }

// export default RequestHelper;