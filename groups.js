/* ==========================================
   RS Emon Tournament Maker
   groups.js
   Part 1 - Firebase Setup & Add Group
========================================== */


import { db } from "./firebase.js";


import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



/* ==========================================
   Firestore Reference
========================================== */


const groupsRef =
collection(db,"groups");



/* ==========================================
   HTML Elements
========================================== */


const groupForm =
document.getElementById("groupForm");


const groupName =
document.getElementById("groupName");


const addGroupBtn =
document.getElementById("addGroup");



/* ==========================================
   Add Group
========================================== */



async(e)=>{


    e.preventDefault();



    const name =
    groupName.value.trim();



    if(name === ""){


        alert(
            "Please enter group name"
        );


        return;

    }



    addGroupBtn.disabled = true;


    addGroupBtn.innerHTML =
    "Saving...";



    try{


        await addDoc(

            groupsRef,

            {

                groupName:name,

                createdAt:
                serverTimestamp()

            }

        );



        alert(
            "✅ Group Added Successfully"
        );



        groupForm.reset();



    }


    catch(error){


        console.error(error);


        alert(
            "❌ Failed to add group"
        );


    }



    finally{


        addGroupBtn.disabled = false;


        addGroupBtn.innerHTML =
        "➕ Add Group";


    }



});
/* ==========================================
   Load Groups
   Part 2
========================================== */


import {
    onSnapshot,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



/* ==========================================
   HTML Element
========================================== */


const groupList =
document.getElementById("groupList");



/* ==========================================
   Realtime Group Display
========================================== */


onSnapshot(groupsRef,(snapshot)=>{


    if(!groupList){

        return;

    }



    groupList.innerHTML = "";



    if(snapshot.empty){


        groupList.innerHTML = `


        <div class="empty-group">

            <h3>No Groups Found</h3>

            <p>
            Create your first tournament group.
            </p>

        </div>


        `;


        return;

    }



    snapshot.forEach((group)=>{


        const data =
        group.data();



        groupList.innerHTML += `


        <div class="group-item">


            <div>


                <div class="group-title">

                    📁 ${data.groupName}

                </div>



                <div class="group-count">

                    Tournament Group

                </div>


            </div>



            <div class="group-actions">


                <button

                class="delete-group"

                onclick="deleteGroup('${group.id}')">

                    Delete

                </button>


            </div>


        </div>


        `;



    });



});




/* ==========================================
   Delete Group
========================================== */


window.deleteGroup = async(id)=>{


    const confirmDelete =
    confirm(
        "Delete this group?"
    );



    if(!confirmDelete){

        return;

    }



    try{


        await deleteDoc(

            doc(db,"groups",id)

        );



        alert(
            "✅ Group Deleted"
        );


    }


    catch(error){


        console.error(error);


        alert(
            "❌ Delete Failed"
        );


    }



};
/* ==========================================
   Edit Group System
   Part 3
========================================== */


import {

    updateDoc,
    getDoc

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



/* ==========================================
   Edit Variables
========================================== */


let editMode = false;

let editGroupId = null;



/* ==========================================
   Update Form Button
========================================== */


function setEditMode(){


    editMode = true;


    addGroupBtn.innerHTML =
    "💾 Update Group";


}



/* ==========================================
   Edit Group
========================================== */


window.editGroup = async(id)=>{


    try{


        const groupRef =
        doc(db,"groups",id);



        const snapshot =
        await getDoc(groupRef);



        if(!snapshot.exists()){


            alert(
                "Group not found"
            );


            return;

        }



        const data =
        snapshot.data();



        groupName.value =
        data.groupName;



        editGroupId = id;



        setEditMode();



        window.scrollTo({

            top:0,

            behavior:"smooth"

        });



    }


    catch(error){


        console.error(error);


        alert(
            "Failed to load group"
        );


    }



};




/* ==========================================
   Duplicate Name Check
========================================== */


async function checkGroupName(name){


    const snapshot =
    await getDocs(groupsRef);



    let exists = false;



    snapshot.forEach((group)=>{


        const data =
        group.data();



        if(
            data.groupName
            .toLowerCase()
            ===
            name.toLowerCase()
        ){


            exists = true;


        }


    });



    return exists;


}
/* ==========================================
   Update Group Save System
   Part 4
========================================== */


groupForm.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();



    const name =
    groupName.value.trim();



    if(name === ""){


        alert(
            "Enter Group Name"
        );


        return;

    }




    try{


        /* ==========================
           Update Existing Group
        ========================== */


        if(editMode){



            await updateDoc(

                doc(
                    db,
                    "groups",
                    editGroupId
                ),

                {

                    groupName:name

                }

            );



            alert(
                "✅ Group Updated Successfully"
            );



        }



        /* ==========================
           Add New Group
        ========================== */


        else{


            const exists =
            await checkGroupName(name);



            if(exists){


                alert(
                    "Group already exists"
                );


                return;


            }




            await addDoc(

                groupsRef,

                {

                    groupName:name,

                    createdAt:
                    serverTimestamp()

                }

            );



            alert(
                "✅ Group Added Successfully"
            );


        }



        resetGroupForm();



    }



    catch(error){


        console.error(error);


        alert(
            "❌ Failed"
        );


    }



});




/* ==========================================
   Reset Group Form
========================================== */


function resetGroupForm(){


    groupForm.reset();


    editMode = false;


    editGroupId = null;


    addGroupBtn.innerHTML =
    "➕ Add Group";


}
/* ==========================================
   Group Module Final
   Part 5
========================================== */


/* ==========================================
   Group Counter
========================================== */


const groupCount =
document.getElementById("groupCount");



onSnapshot(groupsRef,(snapshot)=>{


    if(groupCount){


        groupCount.textContent =

        `${snapshot.size} Groups`;


    }



});



/* ==========================================
   Module Ready
========================================== */


window.addEventListener("load",()=>{


    console.log(
        "=============================="
    );


    console.log(
        "RS Emon Group Management Ready"
    );


    console.log(
        "Unlimited Groups Enabled"
    );


    console.log(
        "=============================="
    );


});
