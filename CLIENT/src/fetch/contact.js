
async function fetchContact () {
    const response = await fetch ("http://localhost:9000/api/v1/contact/list", {
     headers: {
         "Content-Type": "application/json",
     },
     credentials: "include",
 });
 
 const data = await response.json();
 return data;
    }
 
    export {fetchContact};
 