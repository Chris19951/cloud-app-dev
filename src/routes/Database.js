import { db } from "../firebase";
import {ref,push,increment,update} from "firebase/database";


export  function pushPicture(path,name,tag,description) {
  
    push(ref(db, 'pictures/'), {
        picturePath:path,
        pictureName:name,
        pictureTag:tag,
        pictureDescription:description,
        pictureLikes:0
        });
}

export  function increateHeartDB(id) {
    update(ref(db, 'pictures/' + id), {
        pictureLikes:increment(1),
    });
}