const { getClient } =require("../utils");

async function CreateUserTable(){
    const client=await getClient();
    const result=await client.query(`
        CREATE TABLE user4 (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `)
    console.log("Table Created Succesfully")
    await client.end()
}
async function CreateUserPurchaseTable(){
    const client=await getClient();
    const result=await client.query(`
        CREATE TABLE userPurchase (
            id SERIAL PRIMARY KEY,
            item_id INTEGER,
            mark BOOLEAN DEFAULT FALSE,
            user_id INTEGER REFERENCES user4(id)
        );
    `)
    console.log("Table Created Succesfully")
    await client.end()
}
async function insertUser(username,email,password){
  const client=await getClient();
  try{
    const insertUser='INSERT INTO user4 (username,email,password) VALUES ($1,$2,$3)';
    const userData=[username,email,password];
    const result=await client.query(insertUser,userData);
    console.log("Entry Created Successfully");

  }catch(error){
    console.error("Error in inserting user:", error);

  }finally{
    await client.end();
  }
  
}
async function getUser(){
    const client=await getClient()
    try{
      console.log("In get User")
      const getQuery='SELECT * FROM user4';
      const userRes = await client.query(getQuery);
      console.log("Users:");
      for (let user of userRes.rows) {
          console.log(`ID: ${user.id}, Email: ${user.email}`);
      }

    }catch(error){
      console.error("Error in getting all user:", error);

    }finally{
      await client.end();
    }
}
async function getUserWithName(name){
  client=await getClient()
  try{
    const searchQuery='SELECT id FROM user4 WHERE username=$1'
    const value=[name];
    console.log(`name is: ${name}`)
    let response=await client.query(searchQuery,value);
    console.log("Responsse is:")
    console.log(response.rows[0].id)
    await client.end()
    return response.rows[0].id
  }catch(error){
    console.error("Error in getting userId by name:", error);
    await client.end()
  }
}
async function getUserWithEmail(email){
    client=await getClient()
    try{
      const searchQuery='SELECT id FROM user4 WHERE email=$1'
      const value=[email];
      let response=await client.query(searchQuery,value);
      console.log("Responsse is:")
      console.log(response.rows[0].id)
      await client.end()
      return response.rows[0].id
    }catch(error){
      console.error("Error in getting userId by name:", error);
      await client.end()
    }
    
}
async function getItemWithName(itemsInList,name){
  console.log("In getItemWithName")
  const client=await getClient()
  try{
    console.log("In get Item")
    const userId=await getUserWithName(name)
    const getQuery='SELECT * FROM userPurchase WHERE user_id=$1';
    const itemRes = await client.query(getQuery,[userId]);
    console.log("Items:");
    const itemsArr=itemsInList;
     for(let itemInList of itemsArr){
       itemInList.mark=false
      
     }
    for (let item of itemRes.rows) {
        console.log(`ID: ${item.item_id},marked:${item.mark},userId:${item.user_id}`);
        // itemsArr.push({
        //   id:item.id,
        //   name:item.item_name,
        //   mark:item.mark
        // })
        console.log("In for loop")
        itemsArr[item.item_id-1].mark=item.mark
        console.log(`${itemsArr[item.item_id-1].name}:${itemsArr[item.item_id-1].mark}`)
    }
    //  console.log('After updating')
    //  console.log(`${itemsArr[0].name}`)
    //  for(let itemInList of itemsArr){
    //    console.log(`item name:${itemInList.name}:${itemInList.mark}`)
    //  }
    await client.end();
    return itemsArr;
  }catch(error){
    console.error("Error in getting user item by username",error)
    await client.end()
  }
    
}
async function updateUserMark(id,name){
  const client=await getClient();
  try{
    console.log('In update User')
    const userId=await getUserWithName(name);
    console.log(`item id is: ${id} and userId is:${userId}`)
    const getQuery='SELECT * FROM userPurchase WHERE user_id=$1 AND item_id=$2';
    const itemRes = await client.query(getQuery,[userId,id]);
    if(itemRes.rowCount==0){
      console.log("In inserting purchase item")
      const insertQuery='INSERT INTO userPurchase (item_id,user_id) VALUES ($1, $2)';
      await client.query(insertQuery,[id,userId]);
    }
    const query='UPDATE userPurchase SET mark = NOT mark WHERE item_id = $1 AND user_id = $2;'
    await client.query(query,[id,userId]);
    console.log('User Updated')
  }catch(error){
    console.error("Error in purchasing item",error)
  }finally{
    await client.end();
  }
}
module.exports={CreateUserTable,insertUser,getItemWithName,updateUserMark,CreateUserPurchaseTable}
