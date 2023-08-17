import { useContext, useState, useEffect } from "react"
import { levelContext } from "../contexts/UrlProvider"
import { UserContext } from "../contexts/UserProvider"
import FriendButton from "./Friend_Button"


export default function Recommend_Book_Button(){
    const {user} = useContext(UserContext)
    const [friendData, setFriendData] = useState(<></>)
    const URL  = useContext(levelContext)

    useEffect(() => {

        getFriendData()
    }, [user])


    async function getFriendData(){
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        }

        const response = await fetch(`${URL}api/all-friends`, request)

        if (response.ok){
            const data = await response.json()
            console.log(data)
            setFriendData(<>
            {data["friends"] && data["friends"].length > 0 && 
            data["friends"].map((friend:UserData) => (
                <div className = "Box">
                    <p>Username: {friend.username}</p>
                    <FriendButton string={friend.username}/>
                </div>

            ))}
            </>)
        }
    }

    return (<>
        {friendData}
        </>
    )

}