fetch('https://pokeapi.co/api/v2/pokemon/')
.then((res)=>{
    console.log(res);
    if (res.ok) { 
        return res.json();
    }else{
        console.log("Error");
    }
 })
 .then((data)=> console.log(data.results))
 .catch((err) => console.log(err))
