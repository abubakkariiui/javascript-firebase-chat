// dom queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");
const rooms = document.querySelector('.chat-rooms');

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatrooms
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => {
      console.log(err);
    });
});

// update username
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatrooms.updateName(newName);
  newNameForm.reset();

  updateMsg.innerText = `your name was updated to ${newName}`;
  setTimeout(() => (updateMsg.innerText = ""), 3000);
});

// update the chat room

rooms.addEventListener('click',e=>{
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatrooms.updateRoom(e.target.getAttribute('id'));
    chatrooms.getChats(chat => chatUI.render(chat));
  }
})


// check local storage for name
const username = localStorage.username ? localStorage.username : 'No Name';


// class instance
const chatUI = new ChatUI(chatList);
const chatrooms = new Chatroom("general", username);

// get chat and render
chatrooms.getChats((data) => {
  chatUI.render(data);
});
