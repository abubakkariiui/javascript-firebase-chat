// adding new chat documents
// setting up a real-time listner to get new chats
// update the username
// update the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }
  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    const response = await this.chats.add(chat);
    return response;
  }

  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // update ui
            callback(change.doc.data());
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}

const chatroom = new Chatroom("general", "usman");

// chatroom
//   .addChat("hello world!")
//   .then(() => {
//     console.log("chat added");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

chatroom.getChats((data) => {
  console.log(data);
});

// setTimeout(() => {
//     chatroom.updateRoom('gaming');
//     chatroom.updateName('ali');
//     chatroom.getChats((data) => {
//         console.log(data);
//     })
//     chatroom.addChat('w salam')
// },3000)
